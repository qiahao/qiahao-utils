/*
 * @Author: qiahao
 * @Date:  2020-07-20
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-07-20
*/

import Vue from 'vue';
import Component from 'vue-class-component';
import globalComponents from '@/components/index';
import globalFilters from '@/filters/index';


import '@/styles/font.css';
import '@/styles/common.scss';

// __debug = process.env.NODE_ENV === 'development';
Vue.config.productionTip = false;

// 全局注册components
Vue.use(globalComponents);
Vue.use(globalFilters);

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);
