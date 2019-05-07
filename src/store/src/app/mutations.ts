'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-03-11 15:23
* Desc:
*/

'use strict';

import { app } from '../mutationType';
import store2 from '@/store/store2';
import { STORAGE_USER_INFO } from '@/config/static';

const mutations = {
  [app.updateUserInfo](state, userInfo = null) {
    state.userInfo = userInfo;
    if (!userInfo) {
      store2.remove(STORAGE_USER_INFO);
    } else {
      store2.set(STORAGE_USER_INFO, userInfo);
    }
  },
  [app.updateLogin2route](state, route) {
    state.login2route = route;
  },
  [app.setBindFormData](state, info) {
    state.bindFormData = info;
    sessionStorage.bindFormData = JSON.stringify(info);
  },
  [app.setThirdParty](state, info) {
    state.thirdParty = info;
    sessionStorage.thirdParty = info;
  }
};

export default mutations;
