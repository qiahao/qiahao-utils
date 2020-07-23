import {
  PATH_NOTFOUND,
  PATH_INDEX,
  PATH_DEV
} from './routesPath';

// 路由404
const routeNotFound: any = { path: PATH_NOTFOUND, component: () => import('@/pages/common/notFound.vue') };
// 路由不匹配
const routeRest: any = { path: '*', component: () => import('@/pages/common/notFound.vue') };

const publicRoutes: any = [
  {
    name: 'Index',
    path: PATH_INDEX,
    redirect: PATH_DEV
  },
  {
    name: 'DevIndex',
    path: PATH_DEV,
    component: () => import('@/pages/dev/index.vue')
  }
];

const routes: any = [
  ...publicRoutes,
  routeNotFound,
  routeRest
];

if (process.env.NODE_ENV === 'development') {
  routes.push({ name: 'Dev', path: PATH_DEV, component: () => import('@/pages/dev/index.vue') });
}

export default routes;