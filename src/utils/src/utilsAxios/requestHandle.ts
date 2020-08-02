import { codes, codeMessage } from './requestCode';

/**
 *
 * @description 处理返回结果
 * @param {object} response
 * @param {object} options
 * @returns Promise
 */

function handleResponse(response: any, options) {
  const { code } = response;
  const { preHandler } = options;
  // preHandler如果返回Promise，则可以自行决定该请求是resove或reject状态
  if (typeof preHandler === 'function') {
    const preHandlerResult = preHandler(response);
    if (preHandlerResult instanceof Promise) {
      return preHandlerResult;
    }
  }

  if (code === codes.ok) {
    return Promise.resolve(response);
  } else {
    _handleError(response);
    return Promise.reject(response);
  }
}

/**
 * @description 请求过程的严重错误
 * @param e
 */
function handleBlockError (e) {
  throw e;
}

// 对xss做简单处理
const xssRegExp = /<[\s\S]*>/;
function handleXSS(obj) {
  /* eslint-disable no-unused-vars */
  try {
    const objStr = JSON.stringify(obj);
    const xss = objStr.toLocaleLowerCase().match(xssRegExp) || null;
    return xss;
  } catch (e) {
    return null;
  }
  /* eslint-enable no-unused-vars */
}

/**
 * @description 接口出错的处理，如登录失效时清空认证信息；其他错误弹出提示信息等，其中提示信息可以前端自定义
 * @param response
 */
function _handleError(response) {
  const { code } = response;
  if (code === codes.ok) {
    return;
  }
  // 根据具体需要处理的情况增加不同判断分支
  if (code !== codes.ok) {
    console.log(codeMessage[code]);
    return;
  }
}

export {
  handleResponse,
  handleBlockError,
  handleXSS
};
