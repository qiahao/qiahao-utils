'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-03-11 15:23
* Desc:
*/

'use strict';

import { product } from '../mutationType';

const mutations = {
  [product.updateCategoryList](state, list) {
    state.categoryList = list || [];
  },
  [product.updateTagList](state, list) {
    state.tagList = list || [];
  },
  [product.updateCartTotal](state, total) {
    state.cartTotal = total;
  },
  [product.updatePointRate](state, rate) {
    state.pointRate = rate;
  },
  [product.updateHistoryKeyword](state, list) {
    state.historyKeywordList = list || [];
  },
  [product.updateHotKeyword](state, list) {
    state.hotKeywordList = list || [];
  }
};

export default mutations;
