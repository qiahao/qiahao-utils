// /*
//  * @Author: qiahao
//  * @Date:  2019-11-28 10:23
//  * @Last Modified by: qiahao
//  * @Last Modified time: 2019-11-28 10:23
// */

// /**
//  * options
//  * options.loading
//  * options.removeEmpty
//  */
// 'use strict';

// import netHandle from './utilsNetHandle';
// import { message } from './utilsNetCode';
// import { APP_TIMEOUT, APP_API_PREFIX } from '@/config';
// import { removeEmpty, isPrimitive } from '@/utils';


// let ajaxMark: number = parseInt(Math.random() * 1000 + '');
// // const contentTypeFormUrlArray = [];

// /**
//  *
//  * @description 执行底层请求的
//  * @param {string} url： 请求地址
//  * @param {object} option：请求配置
//  */
// function _request(url: string, option: object) {
//   return febs.net
//     .fetch(url, option)
//     .then(res => res.json())
//     .catch(e => {
//       alertToast(message.NET_ERROR);
//       throw e;
//     });
// }

// /**
//  * @desc: 获取网络请求中的通过headers.
//  * @return: headers对象.
//  */

// // TODO
// function _getHeaders(url, options) {
//   let headers: any;
//   // if (contentTypeFormUrlArray.some(item => url.indexOf(item) >= 0)) {
//   if (options.method && options.method.toLowerCase() === 'post') {
//     if (options.contentType && options.contentType === 'uploadBase64') {
//       headers = {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       };
//     } else {
//       headers = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       };
//     }
//   } else {
//     headers = {
//       // 'Content-Type': 'application/json',
//       // 'X-HTTP-AUTHENTICATE': '1'
//     };
//   }
//   return headers;
// }

// function _getQueryStringUrl(url, params) {
//   if (params) {
//     const qsString = _getQueryString(params);
//     if (url.indexOf('?') >= 0) {
//       url += qsString;
//     } else {
//       url += '?' + qsString;
//     }
//   }
//   return url;
// }

// // function _getQueryString(params, isRemoveEmpty?) {
// //   for (const k in params) {
// //     const v = params[k];
// //     if (params.hasOwnProperty(k) && !isPrimitive(v)) {
// //       params[k] = JSON.stringify(params[k]);
// //     }
// //   }
// //   return qs.stringify(isRemoveEmpty ? removeEmpty(params) : params, { encode: true });
// // }

// function _getQueryString(params) {
//   let url = '';
//   for (let key in params) {
//     if (url.length > 0) {
//       url += '&';
//     }

//     url += encodeURIComponent(key) + '=';
//     if (params[key]) {
//       const v = params[key];
//       if (params.hasOwnProperty(key) && !isPrimitive(v)) {
//         url += encodeURIComponent(JSON.stringify(params[key]));
//       }
//       else {
//         url += encodeURIComponent(params[key]);
//       }
//     }
//     else {
//       url += params[key];
//     }
//   }
//   return url;
// }

// function _getRequestBody(params, options) {
//   const { isRemoveEmpty } = options;
//   let body = Object.assign({}, params, options.body || {});
//   body = _getQueryString(isRemoveEmpty ? removeEmpty(body) : body);
//   return body;
// }

// const defaultOption = {
//   timeout: APP_TIMEOUT
// };
// /**
//  * @description 请求
//  * @param {string} url
//  * @param {object} options
//  * @param {boolean} options.isQuery
//  * @param {boolean} options.isRemoveEmpty
//  * @param {function} options.preHandler
//  * @param {any} app
//  */
// function request(url, params, options, app) {
//   params = params || {};
//   options = options || {};
//   options.method = options.method || 'get';
//   const { method, isQuery, isRemoveEmpty } = options;
//   const methodLowerCase = method.toLowerCase();

//   // 处理url和参数
//   if (methodLowerCase === 'get' || isQuery) {
//     url = _getQueryStringUrl(url, isRemoveEmpty ? removeEmpty(params) : params);
//   } else if (methodLowerCase !== 'get') {
//     options.body = _getRequestBody(params, options);
//   }

//   let fullUrl = url;
//   // TODO: 生产环境请求待确认
//   if (process.env.NODE_ENV == 'production' && url.indexOf('http') !== 0) {
//     fullUrl = APP_API_PREFIX + url;
//   }

//   const preHandler = options.preHandler;
//   delete options.preHandler;
//   options = utils.mergeMap(
//     defaultOption,
//     options,
//     {
//       headers: _getHeaders(url, options)
//     }
//   );

//   return _request(fullUrl, options).then((res) => {
//     if (typeof preHandler === 'function') {
//       const preHandlerResult = preHandler(res, url, options, app);
//       if (preHandlerResult instanceof Promise) {
//         return preHandlerResult;
//       }
//     }
//     return netHandle.handleResponse(res);
//   });
// }

// /**
//  *
//  * @description get请求
//  * @param {string} url
//  * @param {?:any} params
//  * @param {?:object} option
//  * @param {?:any} app
//  */

// function get(url: string, params?: any, option?: any, app?: any) {
//   params = params || {};
//   params.ajaxMark = ajaxMark++;
//   return request(url, params, option, app);
// }

// /**
//  *
//  * @description post请求
//  * @param {string} url
//  * @param {?:any} params
//  * @param {?:object} option
//  * @param {?:any} app
//  */
// function post(url: string, params?: any, option?: any, app?: any) {
//   option = Object.assign({}, { method: 'post' }, option || {});
//   return request(url, params, option, app);
// }


// /**
//  *
//  * @description put请求
//  * @param {string} url
//  * @param {?:any} params
//  * @param {?:object} option
//  * @param {?:any} app
//  */
// function put(url: string, params?: any, option?: any, app?: any) {
//   option = Object.assign({}, { method: 'put' }, option || {});
//   return request(url, params, option, app);
// }

// /**
//  *
//  * @description delete请求
//  * @param {string} url
//  * @param {?:any} params
//  * @param {?:object} option
//  * @param {?:any} app
//  */
// function del(url: string, params?: any, option?: any, app?: any) {
//   option = Object.assign({}, { method: 'delete' }, option || {});
//   return request(url, params, option, app);
// }

// request.get = get;
// request.post = post;
// request.put = put;
// request.del = del;
// export default request;
export default {};
