import bpui from 'bpui.js';
import { PATH_LOGIN, PATH_INDEX } from './routesPath';
import store from '@/store/src/index';
import { mutationType } from '@/store';
const pathsOfUnUpdateRedirectUrl = []; // 从这些路由进来不更新 redirectUrl

export default function (router) {
  let from = bpui.libs.router.currentRoute; // 记录之前的路由
  router.on('routeChanged', function (to) {

    const fromPath = from && from.path ? from.path : PATH_INDEX;
    const toPath = to.path;
    if (fromPath !== PATH_LOGIN && toPath === PATH_LOGIN && !pathsOfUnUpdateRedirectUrl.includes(fromPath)) {
      let location = {
        path: fromPath,
        query: from && from.query ? from.query : {}
      };
      store.commit(`app/${mutationType.app.updateLogin2route}`, location);
    }
    from = to;
  });
}