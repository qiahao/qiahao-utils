'use strict';

/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: qiahao
 * Date: 2020-07-28
 * Desc:
 */

import { codes, message } from './utilsNetCode';

// const SERVER_CODES = [codes.CODE_3000, codes.CODE_4000, codes.CODE_9000];

/**
 * @desc: 处理api错误.
 * @param err_msg: 使用err_msg来代替服务器的错误消息.
 * @return: data; 如果正确将返回data, 否则返回null.
 */
function handleError(response: any) {
  const { code, errmsg } = response;
  let msg;
    // 接口code修改，粗暴处理
  if (code >= 3000) {
    msg = message.SERVER_ERROR;
  } else if (code === codes.CODE_500) {
    msg = message[codes.CODE_500];
  } else {
    msg = message[code] || errmsg;
  }
}

/**
 *
 * @description 处理返回结果
 * @param {any} app
 * @param {objectx} response
 * @returns Promise
 */
function handleResponse(response: any) {
  const { code } = response;
  if (code === codes.CODE_1000) {
    return Promise.resolve(response);
  } else {
    handleError(response);
    return Promise.reject(response);
  }
}

export default {
  handleResponse
};
