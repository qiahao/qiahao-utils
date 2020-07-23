/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:16
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2020-03-09 16:18:31
*/

import Vue from 'vue';
import store from './store/src';
import RouterInstance from '@/router';
import './mainInit';
import App from './App.vue';


new Vue({
  store,
  router: RouterInstance,
  render: h => h(App)
}).$mount('#app');
