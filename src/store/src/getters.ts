import state from './app/state';

export default {
  userInfo: state => state.app.userInfo, // 提供响应式数据
  login2route: state => state.app.login2route, // 登录成功 进入的页面路径
  requestLoading: state => state.app.requestLoading,
  orderStatus: state => state.order.orderStatus,
  bindFormData: state => state.app.bindFormData, // 第三方绑定的手机号、验证码
  thirdParty: state => state.app.thirdParty, // 第三方平台名字

  // product模块
  // 分类+格式化后的标签，用于渲染 产品分类 !important
  formatedCategoryList: state => {
    const categoryList = state.product.categoryList;
    const tagList = state.product.tagList;
    const S1 = 'user-category-';
    const S2 = 'user-tag-';
    // TODO
    categoryList.forEach((item, i) => item.cateCd = `${S1}${i}`);
    // important
    // 重构标签数据结构成，模拟成标签数据
    const formatedTagList = tagList.map(tag => {
      return {
        cateName: tag.title,
        cateCd: `${S2}${tag.seq}`,
        _isTag: true,
        ...tag
      };
    });

    return categoryList.concat(formatedTagList);
  },
  historyKeywordList: state => state.product.historyKeywordList,
  hotKeywordList: state => state.product.hotKeywordList
};
