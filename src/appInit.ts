/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:21
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-01-14 17:21
*/


import Vue from 'vue';
import Component from 'vue-class-component';
import bpui from 'bpui.js';
import globalComponents from '@/components/index';
import globalFilters from '@/filters/index';
import globalDirectives from '@/directives/index';
import routes from './router/src/routes';
import permission from './router/src/permission';
import * as config from '../config';

import '@/styles/font.css';
import '@/styles/common.scss';
import 'amorepay/dist/style.css';

__debug = process.env.NODE_ENV === 'development';
Vue.config.productionTip = false;

bpui.registerApp({routePath: routes, basePath: config.publicPath}, Vue);
permission(bpui.libs.router);
// 全局注册components
Vue.use(globalComponents);
Vue.use(globalFilters);
Vue.use(globalDirectives);

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

// Vue.directive('gio',{
//   bind(el,bingind,vnode) {
//     el.addEventListener('click', () => {
//       const data = bingind.value;
//       data.vPlatform = 'M站';
//     }, false);
//   }
// });

// 全局方法添加
// Vue.prototype.xxx = xxx;
