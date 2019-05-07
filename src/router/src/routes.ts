import {
  PATH_NOTFOUND,
  PATH_INDEX,
  PATH_DEV,
  PATH_PAY
} from './routesPath';

// 路由404
const routeNotFound: any = { path: PATH_NOTFOUND, component: () => import('@/pages/errorPage/notFound.vue') };
// 路由不匹配
const routeRest: any = { path: '*', component: () => import('@/pages/errorPage/notFound.vue') };

const publicRoutes: any = [
  { name: 'AppIndex', path: PATH_INDEX, component: () => import('@/pages/appIndex/index.vue') },
  { name: 'Pay', path: PATH_PAY, component: () => import('@/pages/pay/index.vue') }
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