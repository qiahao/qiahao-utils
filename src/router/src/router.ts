import VueRouter from 'vue-router';
import RouterPermission from './permission';
import routes from './routes';

const RouterInstance = new VueRouter({
  mode: 'history', // 'hash'
  linkActiveClass: 'is-active',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: routes
});

// 路由权限
RouterPermission(RouterInstance);

export default RouterInstance;