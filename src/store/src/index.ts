'use strict';

/**
 * Copyright (c) 2017 Copyright bp All Rights Reserved.
 * Author: lipengxiang
 * Date: 2019-06-14 17:32
 * Desc:
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import product from './product';
import order from './order';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  modules: {
    app,
    product,
    order
  },
  getters: getters
});

export default store;
