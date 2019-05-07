'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-03-11 15:25
* Desc:
*/

// 按模块

// app
const app = {
  updateUserInfo: 'APP_UPDATE_USER_INFO',
  updateLogin2route: 'APP_UPDATE_LOGIN_2_ROUTE',
  setBindFormData: 'APP_SET_BIND_FORM_DATA',
  setThirdParty: 'APP_SET_THIRD_PARTY'
};
const product = {
  updateCategoryList: 'PRODUCT_UPDATE_CATEGORY_LIST',
  updateTagList: 'PRODUCT_UPDATE_TAG_LIST',
  updateCartTotal: 'PRODUCT_UPDATE_CART_TOTAL',
  updatePointRate: 'PRODUCT_UPDATE_POINT_RATE',
  updateHistoryKeyword: 'PRODUCT_UPDATE_HISTORY_KEYWORD',
  updateHotKeyword: 'PRODUCT_UPDATE_HOT_KEYWORD'
};
const order = {
  updateOrderStatus: 'ORDER_UPDATE_STATUS'
};

export default {
  app,
  product,
  order
};

export { app, product, order };