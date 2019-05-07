import wechatIcon from './assets/square_wechat.jpg';
import upacpIcon from './assets/square_upacp.jpg';
import alipayIcon from './assets/square_alipay.png';

// const platforms = ['wx', 'alipay', 'qq', 'wap', 'pc']; // 支持端platform

// api 请求地址，需拼接baseUrl
const apiMap = {
  PAY: '/api/pay',
  CHARGE: '/api/charge',
  QUERY: '/api/charge/query'
};



const chanelTypeMap = (function () {
  const typeMap = {
    wechat: { name: '微信', qrhow2use: 'how-to-use-wx_qr.png', label: '微信支付', icon: wechatIcon },
    alipay: { name: '支付宝', qrhow2use: 'how-to-use-wx_qr.png', label: '支付宝', icon: alipayIcon },
    qpay: { name: 'QQ', qrhow2use: 'how-to-use-wx_qr.png', label: 'QQ钱包', icon: upacpIcon },
    upacp: { name: '银联', label: '银联支付', icon: upacpIcon }
  };

  const channelMap = {
    wx_qr: 'wechat',
    wx_wap: 'wechat',
    wx_jsapi: 'wechat',
    ali_qr: 'alipay',
    ali_pc: 'alipay',
    ali_wap: 'alipay',
    qq_qr: 'qpay',
    qq_wap: 'qpay',
    upacp_pc: 'upacp',
    upacp_wap: 'upacp'
  };

  // const map = {
  //   wx_qr: {
  //     name: '微信',
  //     qrhow2use: 'how-to-use-wx_qr.png',
  //     label: '微信支付',
  //     icon: wechatIcon,
  //     type: 'wechat',
  //     channel: 'wx_qr'
  //   }
  // };
  const map = {};
  for (const channel in channelMap) {
    const type = channelMap[channel];
    const tmp = typeMap[type];
    map[channel] = Object.assign({}, { type, channel }, tmp);
  }
  return map;
})();

export {
  apiMap,
  chanelTypeMap
};
