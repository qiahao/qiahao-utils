


import { apiMap, chanelTypeMap } from './config';
import { openWindow, os } from './utils';
import wxJSAPIPayment from './wxjsapi';

/**
 * @description Amorepay构造函数
 *  options配置信息
 */
class Amorepay {

  // 外面传入的配置
  private baseUrl = '';
  private orderHash = '';
  private platform = '';

  // 请求回来的数据
  private payInfo = null; // pay信息
  private payInfoSign = null; // pay信息 si
  private payInfoCharge = null; // pay信息 chg
  private payInfoQuery = null; // pay信息 query
  private chargeInfo = null; // charge信息

  // 请求回来处理生成的数据
  private platformSignInfoList = []; // 保存当前platform sign的信息，方便后面取值
  private payTypeList = []; // 保存当前platform付款方式，方便后面取值
  private payChannel = ''; // 用户选中支付方式后，将支付channel赋值回 amorepay对象，！！！important;
  private queryTimer = null; // 轮询timer

  static DURATION_PER_QUERY = 2000; // 每两秒轮询一次
  static DURATION_QUERY_STOP = 60 * 5 * 1000; // 轮询5分钟


  constructor(options: any) {

    const {
      baseUrl,
      orderHash,
      platform,
      requestPayInfo,
      requestChargeInfo,
      requestQuery,
      onPay,
      onPayQr,
      onOpenPayWindow,
      onPaySuccess,
      onPayFail,
      onQueryEnd
    } = options;

    this.baseUrl = baseUrl;
    this.orderHash = orderHash;
    this.platform = platform;

    this.onPay = onPay || null;
    this.onPayQr = onPayQr || null;
    this.onOpenPayWindow = onOpenPayWindow || null;
    this.onPaySuccess = onPaySuccess || null;
    this.onPayFail = onPayFail || null;
    this.onQueryEnd = onQueryEnd || null;

    // 通过配置信息requestPayInfo，生成requestPayInfo方法
    this.requestPayInfo = function () {
      const url = `${this.baseUrl}${apiMap.PAY}/${this.orderHash}/${this.platform}`;

      requestPayInfo(url).then(res => {
        const { code, status, si, chg, query } = res || {};
        if (code === 'ok' && status !== 'paid') {
          this.payInfoSign = si;
          this.payInfoCharge = chg;
          this.payInfoQuery = query;

          this.platformSignInfoList = si[this.platform] || [];
          this.payTypeList = this.platformSignInfoList.map(o => {
            return chanelTypeMap[o.channel] || {};
          });
        }
      }).catch(() => { });
    };

    // 通过配置信息requestChargeInfo，生成requestChargeInfo方法
    this.requestChargeInfo = function () {
      const url = `${this.baseUrl}${apiMap.CHARGE}`;
      const signList = this.platformSignInfoList || [];
      const channel = this.payChannel;
      let signInfo = null;
      if (!channel) {
        throw '请选择支付方式';
      }
      for (let i = 0, l = signList.length; i < l; i++) {
        if (signList[i].channel === channel) {
          signInfo = signList[i];
          break;
        }
      }

      if (!signInfo) {
        throw '无效的支付方式';
      }

      const params = Object.assign({}, this.payInfoCharge, {
        channel: signInfo.channel,
        sign: signInfo.cs,
        nonceStr: signInfo.cns
      });
      return requestChargeInfo(url, params).then(res => {
        const { code, status } = res || {};
        if (code === 1000 && status !== 'paid') {
          this.chargeInfo = res;
          return res;
        } else {
          throw '该订单已支付，请勿重复支付';
        }
      });
    };

    this.requestQuery = function () {
      const url = `${this.baseUrl}${apiMap.QUERY}`;
      const signList = this.platformSignInfoList || [];
      const channel = this.payChannel;
      let signInfo = null;
      if (!channel) {
        throw '请选择支付方式';
      }
      for (let i = 0, l = signList.length; i < l; i++) {
        if (signList[i].channel === channel) {
          signInfo = signList[i];
          break;
        }
      }
      if (!signInfo) {
        throw '无效的支付方式';
      }


      const params = Object.assign({}, this.payInfoQuery, {
        channel: signInfo.channel,
        sign: signInfo.qs,
        nonceStr: signInfo.qns
      });

      return requestQuery(url, params);

    };






    this.requestPayInfo();
  }
  // 接口
  /**
   * @description 获取支付方式和支付信息
   */
  requestPayInfo: () => void;

  /**
   * @description 点击支付，发起支付
   */
  requestChargeInfo: () => any;

  /**
   * @description 请求确认支付情况，同时用于轮询
   */
  requestQuery: () => any;

  /**
   * @description 支付过程，轮询支付结果
   */
  queryStatus() {
    const start = new Date().getTime();
    clearInterval(this.queryTimer);
    const _this = this;

    this.queryTimer = setInterval(query, Amorepay.DURATION_PER_QUERY);
    query();

    function query() {
      _this.requestQuery().then(res => {
        const { code, status, paid } = res;
        if (code === 1000 && status === 0 && paid) {
          clearInterval(_this.queryTimer);
          if (_this.onPaySuccess && typeof _this.onPaySuccess === 'function') {
            _this.onPaySuccess(res);
          }
        } else if (code === 1000 && status !== 0 && status !== 1) {
          clearInterval(_this.queryTimer);
          if (_this.onPayFail && typeof _this.onPayFail === 'function') {
            _this.onPayFail(res);
          }
        }
      });
      const now = new Date().getTime();
      // 轮询到时还未支付
      if (now - start >= Amorepay.DURATION_QUERY_STOP) {
        clearInterval(_this.queryTimer);
        _this.onQueryEnd();
      }
    }
  }

  /**
   * @description 停止轮询
   */
  stopQueryStatus() {
    clearInterval(this.queryTimer);
  }

  /**
   * @description 用户手动确认支付结果：支付中，点击中断queryStatus操作
   * @param type 0, 1
   * 0: 支付中点击取消，确认未支付
   * 1: 支付中点击已支付，确认已支付
   * 对不同结果使用不同回调
   */
  checkPayStatus(type) { }

  /**
   * @description 封装点击支付，可自定义支付逻辑，不使用该方法
   */
  doPay() {
    this.requestChargeInfo().then(res => {
      const { code, paid } = res || {};
      // 请求成功，未支付
      if (code === 1000 && !paid) {
        console.log('requestChargeInfo', res);
        this.queryStatus();
        try {
          if (this.onPay && typeof this.onPay === 'function') {
            this.onPay.call(this, res);
          } else {
            this.doPayDefault(res);
          }
        } catch (e) {
          this.stopQueryStatus();
        }
      }
    });
  }

  /**
   * @description 默认的支付方式：打开新的window
   * 如果是二维码扫码支付，还需要配置onPayQr()
   */
  doPayDefault(res) {
    // 判断平台，微信等
    const channel = this.payChannel;
    const chargeInfo = this.chargeInfo;
    // const payUrl = chargeInfo && chargeInfo.payUrl;
    const isWx = /^wx_/.test(channel);
    const isWap = /_wap$/.test(channel);
    const isPc = /_pc$/.test(channel);
    const isQr = /_qr$/.test(channel);
    const isJsapi = /_jsapi$/.test(channel); // 公众号支付

    // 微信、二维码、
    if (isJsapi) {
      if (isWx) {
        if (!os.isWechat) {
          alert('请在微信中打开');
          return;
        } else {
          wxJSAPIPayment(chargeInfo.jsObj);
        }
      } else {
        throw `未支持的jsapi方式${channel}`;
      }
    } else if (isQr) {
      try {
        // 手机端不会有二维码，防止程序报错
        this.onPayQr(chargeInfo);
      } catch (e) {
        this.stopQueryStatus();
        throw '打开二维码出错'; // important
      }
    } else if (isWap || isPc) {
      if (this.onOpenPayWindow && typeof this.onOpenPayWindow === 'function') {
        this.onOpenPayWindow();
      }
      setTimeout(() => {
        openWindow(chargeInfo.payUrl);
      }, 0);
    }
  }

  // 其他配置项
  /**
   * @description 定制 支付流程，改变默认的打开新的window的支付方式
   */
  onPay: (res) => void;
  /**
   * @description 定制 二维码扫码支付
   * 如果是二维码扫码支付，还需要配置onPayQr(charge)
   */
  onPayQr: (charge) => void;
  /**
   * @description 打开新窗口时执行
   */
  onOpenPayWindow: () => void;
  /**
   * @description 定制 轮询支付成功的回调
   */
  onPaySuccess: (res) => void;

  /**
   * @description 定制 支付失败
   */
  onPayFail: (res) => void;

  /**
   * @description 定制 轮询结束还未支付
   */
  onQueryEnd: () => void;





}


const AmorepayUtils = {
  // amorepay发起支付的dom交互
  payOpenWindow() { }
};



export default Amorepay;