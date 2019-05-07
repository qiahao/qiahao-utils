/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:16
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2020-03-09 16:18:31
*/

import Vue from 'vue';
import store from './store/src';
import './appInit';
import App from './App.vue';
import AMap from 'vue-amap';


Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '9814d30b495c48bdc684d33b6ee5de31',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});

// 添加瀑布流布局控件
import waterfall from 'vue-waterfall2';
Vue.use(waterfall);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
