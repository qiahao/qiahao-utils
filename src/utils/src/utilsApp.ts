/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:25
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-01-14 17:25
*/
import store from '@/store/src/index';
import store2 from '@/store/store2';
import CryptoJS from 'crypto-js';
import { APP_ENCRYPT_KEY, STORAGE_USER_INFO } from '@/config';
import { apiUser, apiCart } from '@/api';
import codes from '@/api/utilsNetCode';
import bpui from 'bpui.js';
import { alertConfirm, alertToast } from './utilsAlert';
import { PATH_LOGIN, PATH_CART, PATH_ACCOUNT } from '@/router';
import { mutationType } from '@/store';
// /**
//  * @description 存储token
//  * @param {String} token
//  */
// function appSetToken(token: string) {
//   store.dispatch('app/appUpdateToken', token);
//   store2.set(STORAGE_TOKEN, token);
// }
// /**
//  * @description 取token
//  */
// function appGetToken() {
//   return store.getters.token || store2.get(STORAGE_TOKEN);
// }
// /**
//  * @description 清除token
//  */
// function appRemoveToken(): void {
//   store.dispatch('app/appUpdateToken', null);
//   store2.remove(STORAGE_TOKEN);
// }

// ======== userInfo========
/**
 *
 * @description 存储userInfo
 * @param UserInfo
 */
function appSetUserInfo(UserInfo: any) {
  if (UserInfo === null) {
    appRemoveUserInfo();
  } else {
    store.dispatch('app/appUpdateUserInfo', UserInfo);
    store2.set(STORAGE_USER_INFO, UserInfo);
  }
}
/**
 * @description 取userInfo
 */
function appGetUserInfo() {
  return store.getters.userInfo || store2.get(STORAGE_USER_INFO);
}

/**
 * 清除userInfo
 */
function appRemoveUserInfo(): void {
  store.commit(`app/${mutationType.app.updateUserInfo}`, null);
  store2.remove(STORAGE_USER_INFO);
}


// ======== 登录业务逻辑 ========

/**
 * @description 登录业务逻辑
 * 1. 用户账号密码登录
 * 2. 获取code
 * 3. 获取token
 * 4. 存储token; 获取userInfo
 * 5. 存储userInfo;
 * @param {Object} params
 * @param {String} params.username
 * @param {String} params.password.md5
 *
 */
function appLogin(/* params: any */) {
  // const fakeRedirectUri = location.origin + '/'
  // return authApi.login(params).then(res => {
  //   return appAffterLoginHandler(res.access_token)
  // }).catch(e => {
  //   // 登录失败 清除token、userInfo
  //   // 注意增加管理员登录后是否需要清除
  //   appAffterLogoutHandler()
  //   throw e;
  // });
}

/**
 *
 * @description 登录成功后存储token、userInfo
 * @param {String} token 登录成功后获取的token
 */
function appAffterLoginHandler(/* token: string */) {
  // appSetToken(token);
  // return iamSelfApi.getUserInfo().then(res => {
  //   const fallbackPath = sessionStorage.getItem(APP_LOGIN_FALL_BACK)
  //   appSetUserInfo(res.result);
  //   return true
  // });
}
/**
 * @description 退出业务
 */
function appLogout() {
  // const token = appGetToken()
  // return authApi.logout(token).then(() => {
  //   return appAffterLogoutHandler()
  // })
}

/**
 * @description 退出后续业务
 * 退出后清除token、userInfo
 * 如token过期强制退出、登录失败、退出等
 */
function appAffterLogoutHandler() {
  appRemoveUserInfo();
  return Promise.resolve(true);
}

/**
 *
 * @description 确认是否登录
 */

function appCheckLogin() {
  const options = {
    preHandler(res) {
      const { code } = res;
      if (code === codes.CODE_1000 || (code === codes.ERRCODE_2043)) {
        return Promise.resolve(res);
      }
    }
  };

  return apiUser.getUserInfo(options).then(res => {
    const { code } = res;
    if (code === codes.CODE_1000) {
      return res;
    } else if (code === codes.ERRCODE_2043) {
      return false;
    } else {
      return false;
    }
  });
}

/**
 *
 * @description 路由前确认是否登录
 */


function appCheckLoginBeforeRouter() {
  return appCheckLogin().then(isLogin => {
    if (isLogin) {
      return isLogin;
    } else {
      alertConfirm({
        content: '未登录，现在前往登录',
        confirm() {
          bpui.libs.router.push(PATH_LOGIN);
        }
      }).catch(() => { });
      return false;
    }
  });
}


// ======== loading ========
/**
 * @description loading增加
 */
function appIncreaseRequestLoading(loading) {
  if (loading) {
    store.dispatch('app/appUpdateRequestLoading', 1);
  }
}

/**
 * @description loading增加
 */
function appDecreaseRequestLoading(loading) {
  if (loading) {
    store.dispatch('app/appUpdateRequestLoading', -1);
  }
}

/**
 * @description loading清除
 */
function appCleanRequestLoading() {
  store.dispatch('app/appUpdateRequestLoading', 0);
}

// ======== 加密方法 ========

/**
 * @description 加密方法
 * @param {string} word
 */
function appEncrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(APP_ENCRYPT_KEY);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}



// ======== 业务 ========
// 只支持单个产品加入购物车
/**
 *
 * @param product 产品
 * @param specs 选择的规格
 */
function appAdd2Cart(product: any, quantity: number, specs?: any, ) {
  product = product || {};
  const { prdseq, prdType } = product;
  const isPackage = prdType === 'P';

  let skucd;
  if (!prdseq) {
    alertToast('产品编号不能为空');
    return Promise.reject();
  }
  if (!isPackage) {
    if (!specs) {
      alertToast('请选择规格');
      return Promise.reject();
    } else {
      skucd = specs.skucd;
    }
  }

  if (!quantity) {
    alertToast('请选择购买数量');
    return Promise.reject();
  }

  const data = [
    {
      prdseq: prdseq, // 产品编号
      skucd: skucd, // 产品sku ， 套装服务端忽略， 单品必传
      prdType: prdType, // 产品类型， P套装 、N 单品
      quantity: quantity
    }
  ];

  return apiCart.addCart({ data: data }).then(() => {
    store.dispatch('product/updateCartTotal');
    alertConfirm('已加入购物车')
      .then(() => {
        bpui.libs.router.push(PATH_CART);
      })
      .catch(() => { });
  }).catch(() => {
    return Promise.reject();
  });
}


// 只支持单个产品的立即购买
/**
 *
 * @param product 产品
 * @param quantity 选择的数量
 * @param specs 选择的规格
 */

function appBuyNow($navbar, product: any, quantity: number, specs?: any) {
  product = product || {};
  const { prdseq, prdType } = product;
  const isPackage = prdType === 'P';

  return new Promise((r, j) => {

    let skucd;
    if (!prdseq) {
      alertToast('产品编号不能为空');
      return j();
    }
    // 单品需要验证规格
    if (!isPackage) {
      if (!specs) {
        alertToast('请选择规格');
        return j();
      } else {
        skucd = specs.skucd;
      }
    }

    if (!quantity) {
      alertToast('请选择购买数量');
      return j();
    }

    appCheckLoginBeforeRouter().then(isLogin => {
      if (isLogin) {
        // 模拟购物车到订单生成页数据，是个数组
        const cartItem = [
          {
            seq: '', // 模拟数据暂无
            ct: '', // 模拟数据暂无
            checked: true, // 模拟数据
            skucd: skucd, // 模拟数据, 套装没有
            oldPrice: product.stdPrice, // 模拟数据
            prdseq: prdseq,
            prdType: prdType,
            quantity: quantity,
            product: product
          }
        ];
        r();
        $navbar.push({
          path: PATH_ACCOUNT,
          query: {},
          animate: 'slide',
          data: { cartItem: cartItem }
        });
      } else {
        j();
      }
    });
  });
}


export {
  appSetUserInfo,
  appGetUserInfo,
  appRemoveUserInfo,
  appLogin,
  appAffterLoginHandler,
  appLogout,
  appCheckLoginBeforeRouter,
  appCheckLogin,
  appAffterLogoutHandler,
  appIncreaseRequestLoading,
  appDecreaseRequestLoading,
  appCleanRequestLoading,
  appEncrypt,
  // 业务
  appAdd2Cart,
  appBuyNow
};
