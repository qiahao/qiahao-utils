'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-04-15 18:48
* Desc:
*/

import * as febs from 'febs';

/**
* @desc: v-gio="'type'"
* @summary 传入指定类型的统计方式;
*/
export default {
  bind: function (el, binding, vnode) {
    if (binding.value) {
      let type = binding.value;
      el = $(el);

      switch (type) {
        case 'click':
          initElement_click(el);
          break;
      }
    }
  },
  inserted: function () {

  },
  update: function (el) {
    initElement_click(el);
  },
  componentUpdated: function () {

  },
  unbind: function (el) {
    $(el).off('click', onClick);
  }
};


/**
* @desc:  为元素添加点击操作埋点.
*/
function initElement_click(el) {
  // 绑定事件.
  el.off('click', onClick).on('click', onClick);
  // 添加属性.
  addAttr(el, 'gio-test', '');
}


/**
* @desc: 添加元素属性.
*/
function addAttr(el, attrName, attrValue) {
  el.attr(attrName, attrValue);
}

/**
* @desc: 点击元素事件.
*/
function onClick(ev) {
  console.log('click');
}