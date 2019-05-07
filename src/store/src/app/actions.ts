/*
 * @Author: qiahao
 * @Date:  2019-11-28 10:54
 * @Last Modified by: qiahao
 * @Last Modified time: 2019-11-28 10:54
*/
'use strict';

import { app } from '../mutationType';
import { apiUser } from '@/api';
import { getPureResponseData } from '@/utils';

export default {
  appUpdateUserInfo({ commit }) {
    apiUser.getUserInfo().then((res) => {
      const userInfo = getPureResponseData(res);
      commit(app.updateUserInfo, userInfo);
    }).catch(() => {
      commit(app.updateUserInfo, null);
    });
  }
};
