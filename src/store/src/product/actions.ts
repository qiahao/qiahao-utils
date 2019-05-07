/*
 * @Author: qiahao
 * @Date:  2019-11-28 10:54
 * @Last Modified by: qiahao
 * @Last Modified time: 2019-11-28 10:54
*/
'use strict';

import { product } from '../mutationType';
import { apiProduct, apiCart, apiSearch } from '@/api';
import codes from '@/api/utilsNetCode';
// import { getPureResponseData } from '@/utils';

export default {
  // renderCategoryList 包含分类和标签
  updateFormatedCategoryList({ dispatch }) {
    dispatch('updateCategoryList');
    dispatch('updateTagList');
  },
  // 更新分类
  updateCategoryList({ commit }) {
    const params = {
      paged: 1,
      pageSize: 1000,
      needChildren: 'yes'
    };
    apiProduct.getCategories(params).then(res => {
      commit(product.updateCategoryList, res.list || []);
    });
  },
  // 更新标签
  updateTagList({ commit }) {
    const pramas = {
      paged: 1,
      pageSize: 100
    };
    apiProduct.getTagProduct(pramas).then(res => {
      commit(product.updateTagList, res.list || []);
    });
  },
  // 更新购物车商品数量
  updateCartTotal({ commit }) {
    const params = { paged: 1, pageSize: 1 };
    const options = {
      preHandler(res) {
        if (res.code === codes.ERRCODE_2043) {
          return Promise.resolve(res);
        }
      }
    };
    apiCart.cartList(params, options).then(res => {
      if (res.code === 1000) {
        commit(product.updateCartTotal, res.total);
      } else {
        commit(product.updateCartTotal, undefined);
      }
    });
  },
  // 更新标签
  updatePointRate({ state, commit }) {
    // 只取一次
    if (state.pointRate) { return; }

    apiProduct.getPointRage().then(res => {
      commit(product.updatePointRate, res.pointRule || 0);
    });
  },
  // 更新历史搜索记录
  updateHistoryKeyword({ commit }) {
    const options = {
      preHandler(res) {
        if (res.code === codes.ERRCODE_2043) {
          return Promise.resolve(res);
        }
      }
    };
    apiSearch.postRecentKeyword({ num: '8' }, options).then(res => {
      commit(product.updateHistoryKeyword, res.list || []);
    });
  },
  // 更新热门搜索
  updateHotKeyword({ commit }) {
    apiProduct.getKeywords().then(res => {
      let _list = [];
      if (res.list && res.list.length) {
        _list = res.list.map(i => i.keyWord);
      }
      commit(product.updateHotKeyword, _list);
    });
  }
};
