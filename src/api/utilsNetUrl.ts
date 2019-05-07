/**
 * @deprecated basicApi 接口
 * ========================================
 */
export const basic = {};

/**
 * @deprecated user 会员 接口
 * ========================================
 */
export const user = {
  LOGIN: '/api/user/general/login', // 账号密码登录
  LOGIN_SMS: '/api/user/sms/login', // 短信登录
  VALIDATE_CAPTCHA: '/api/activation/validate/captcha', // 图形验证码验证
  VALIDATE_SMS: '/api/activation/validate/sms', // 短信验证码验证
  ACTIVATION_SMS: '/api/activation/sms', // 发送短信 POST
  VALIDATE_EMAIL: '/api/user/validate/email', // 邮箱验证 POST
  USER: '/api/user/info', // 会员信息 POST
  REGISTER: '/api/register/user', // 会员注册 POST
  LOGOUT: '/api/user/logout', // 会员退出登陆 GET
  SMS_SEEK_PASSWORD: '/api/user/sms/seek/password', // 短信更新密码 POST
  CHANGEPASSOWRD: '/api/update/password/user', // 更新会员密码 Get
  GETCAPTCHA: '/api/captcha', // 图形验证码
  EMAIL_SEEK_PASSWORD: '/api/user/seek-password/email', // 邮箱找回密码 POST
  ACTIVATION_EMAIL: '/api/activation/email', // 发送邮件 POST
  VALIDATE_EMAIL_CODE: '/activation/validate/email', // 邮箱验证码验证 GET
  PUT_USER_INFO: '/api/update/user', // 修改会员信息
  THIRDLOGIN: (type) => `/api/oauth/${type}/login`, // 第三方登录 Get
  THIRDBIND: '/api/user/bind', // 第三方登录绑定手机号 POST
  GET_BIND_INFO: '/api/user/bind/info', // 获取第三方绑定信息
  PUT_UNBIND: type => `/api/user/${type}/unbind`, // 解除第三方绑定
  GET_EMAIL_CODE: '/api/activation/email', //  发送邮箱验证码
  GET_VALIDATE_EMAIL: '/activation/validate/email', // 邮箱验证码验证
  PUT_MOBILENO: '/api/user/modify-mobileno', // 会员修改手机号 POST
  PUT_EMAIL: '/api/user/modify-email' // 会员修改邮箱 POST
};
/**
 * @deprecated Cart 购物车 接口
 * ========================================
 */
export const Cart = {
  ADD_CART: '/api/cart/add', // 添加购物车 POST
  DELETE_CART: '/api/cart/remove', // 删除购物车 POST
  CART_LIST: '/api/carts', // 购物车列表 POST
  UPDATE_CART: '/api/cart/update', // 更新购物车商品数量 POST
  preview_order: '/api/order/preview', // 预览订单 post
  create_order: '/api/order/create', // 预览订单 post
  skucd_update: (cartSeq) => { return `/api/cart/${cartSeq}/update`; }
};

/**
 * @deprecated 订单 接口
 * ========================================
 */
export const Order = {
  orderlist: '/api/orders', // 订单列表 get
  orderDetail: '/api/order', // 订单详情 PSOT
  orderUpdate: '/api/update/order', // 订单状态更新 PSOT
  serverApply: '/api/claim', // 订单申请售后
  cancel: '/api/update/order/' // 取消订单
};


/**
 * @deprecated 收藏夹 接口
 * ========================================
 */
export const favorites = {
  ADD_FAVORITES: prdseq => `/data/api/create/favorites/${prdseq}`, // 加入收藏夹
  DELETE_FAVORITES: '/api/delete/fav-products', // 移出收藏夹
  FAVORITES_LIST: '/api/query/fav-products', // 收藏夹列表
  FAVORITES_SHOP_LIST: '/api/query/fav-stores', // 门店收藏列表
  DELETE_FAVORITES_SHOP_LIST: '/api/remove/fav-stores' // 收藏门店移除
};

/**
 * @deprecated user member 接口
 * ========================================
 */
export const Member = {
  ADD_ADDRESS: '/api/create/address', // 地址创建
  DELETE_ADDRESS: '/api/delete/address', // 地址删除
  ADDRESS_LIST: '/api/query/address/list', // 地址列表
  UPDATE_ADDRESS: '/api/update/address', // 地址更新
  GETREGION: '/api/query/region', // 查询区域列表
  PREELL_ORDERS: '/api/query/presell/orders', // 预售订单列表
  GREENPOINT_LIST: '/api/query/greenpoint/list', // 会员积分列表
  GET_GREENPOINT: '/api/query/greenpoint', // 会员积分详情
  GET_TRACK: '/api/recent/products', // 会员轨迹
  GET_GRADE: '/api/upgrade/user', // 会员升级条件
  GET_POINTSLIST: '/api/user/pointhistory', // 会员积分历史
  GET_REGULAR_PRODUCT: '/query/regular/products', // 会员常购产品
  GET_USER_AVATOR: cstmno => `/api/user/avatar/${cstmno}`, // 获取用户头像
  GET_QRCODE: '/api/user/qrcode', // 获取用户二维码
  GET_MY_EVENT: '/api/activities-my', // 我的活动列表
  GET_DICTIONATY: '/api/query/dictionary' // 用户补充信息
};

/**
 * @deprecated product 商品分类列表，悦好评价详情接口
 * ========================================
 */
export const product = {
  QUERY_PRODUCT: '/api/query/product', // 商品详情
  PRODUCT_CATEGORIES: '/api/query/categories', // 商品分类下拉列表
  PRODUCTS_LIST: '/data/api/query/products', // 商品列表
  PRODUCT_BASESELL: '/api/query/basesellproducts', // 畅销商品列表
  PRODUCT_NEW: '/api/query/newproducts', // 新品查询
  PRODUCT_RECOMMEND: '/api/query/recommendproducts', // 推荐商品查询
  QUERY_KEYWORDS: '/api/query/keywords', // 搜索关键字 POST
  CREATE_PRODUCTGROUP: '/api/adm/create/productgroup', // 新增产品分组 POST
  QUERY_PRODUCTGROUP: '/api/adm/query/productgroup', // 查询产品分组 POST
  UPDATE_PRODUCTGROUP: '/api/adm/update/productgroup', // 更新产品分组 POST
  CREATE_PRODUCTGROUPITEM: '/api/adm/create/productgroupitem', // 新增分组产品 POST
  QUERY_PRODUCTGROUPITEM: '/api/query/productgroupitem', // 查询分组产品 POST
  CREATE_PRODUCT_APPRAISE: '/api/product-remark/create', // 创建产品评价 POST
  QUERY_PRODUCT_APPRAISE: '/api/product-remarks', // 产品评价查询 GET
  PRODUCT_APPRAISE_SATISFYAUTHORITY: '/api/product/appraise/satisfyauthority', // 判断是否有权限产品评价 GET
  FIRST_SCREEN: '/api/query/firstscreen',  // 首页开屏
  FIRST_RECOMMEND: '/api/main-banner', // 首页banner
  PRODUCT_KOREA: '/api/query/pav-korea', // 首页韩国馆查询
  TAG_PRODUCT: '/api/query/tag-product',   // 查询产品标签
  POINT_RULE: '/api/query/pointrule',
  PROMOTS_SALES: '/api/promo/range-gifts' // 促销

};

/**
 * @deprecated search 搜索 接口
 * ========================================
 */
export const search = {
  ACTIVITY: '/api/query/activity/search', // 活动列表
  GOODS: '/api/query/product/search', // 商品列表
  BLOG: '/api/cms/articles/search', // 博客
  HOTKEYWORD: '/api/rank/keywords', // 热门搜索
  RECENT_KEYWORD: '/api/recent/keywords' // 最近搜索
};

/**
 * @deprecated message 站内信 接口
 * ========================================
 */
export const message = {
  CREATE: '/api/create/message', // 创建站内信
  SEARCH_RECEIVE: '/api/get/rec/messages', // 查询自己接收到的消息
  SEARCH_CREATE: '/api/get/create/myself/message', // 查询自己创建的站内信
  UPDATE_MESSAGE: '/api/update/message', // 更新站内信
  UPDATE_READ: '/api/change/read/message', // 更新消息已读
  MSG_DETAIL: '/api/get/detail/message', // 站内信详情
  MSG_INDEX: '/api/get/first/messages', // 消息中心首页数据
  EXPRESS_TRACK: '/api/order/logistics/track', // 物流追踪
  NOTICE_LIST: '/api/public-notice/query', // 公告列表查询
  NOTICE_DETAIL: '/api/public-notice/detail' // 公告详情
};

/**
 * @deprecated coupon 优惠券 接口
 * ========================================
 */
export const coupon = {
  COUPON_LIST: '/api/query/coupons' // 优惠券列表
};

/**
 * @deprecated 种草 接口
 * ========================================
 */
export const playGreen = {
  TOPICS: '/api/cms/topics', // 话题列表
  ARTICLE_TOPICS: topicId => `/api/cms/article/${topicId}/topics`, // 获得话题相关文章列表
  TOPICS_DETAIL: id => `/api/cms/topic/${id}/detail`, // 话题详情
  ARTICLES_LIST: '/api/cms/articles/list', // 获取种草文章列表
  ARTICLES: id => `/api/cms/articles/${id}`, // 获取种草文章内容
  ARTICLES_STAR: articleId => `/api/cms/articles/star/${articleId}`, // 对种草文章点赞或取消点赞
  ARTICLES_FAVORITE: articleId => `/api/cms/articles/favorite/${articleId}`, // 对种草文章收藏或取消收藏
  ARTICLES_COMMENTS: articleId => `/api/cms/article/${articleId}/comments`, // 获取文章的所有评论
  CREATE_ARTICLESCOMMENT: '/api/cms/article/comment', // 对种草文章进行评论
  ARTICLE_COMMENTREPLY: '/api/cms/article/commentReply', // 对评论进行评论
  COMMENT_STRA: commentId => `/api/cms/articles/comment/star/${commentId}`, // 对评论进行点赞或取消点赞
  CREATE_ARTICLES: '/api/cms/articles', // 创建种草文章
  WATCHES_TOP: '/api/cms/user/watches/top', // 关注tab页关注用户列表
  NEW_TOP: '/api/cms/user/unwatch/top' // 最新tab页用户列表
};
/**
 * @deprecated 个人主页 他人主页 接口
 * ========================================
 */
export const userInfo = {
  USER: userId => `/api/cms/user/${userId}`, // 获取用户信息
  GET_FANS: '/api/cms/user/fans', // 用户粉丝列表
  GET_WATCHES: '/api/cms/user/watches', // 用户关注列表
  WATCHSTATUS: watchUserId => `/api/cms/user/watchStatus/${watchUserId}`, // 判断用户是否已关注该用户
  UPDATE_WATCHES: watchUserId => `/api/cms/user/watch/${watchUserId}`,// 用户关注或取消关注他人
  PUBLISH_ARTICLES: '/api/cms/user/articles/list', // 用户发布的文章列表
  STAR_ARTICLES: '/api/cms/user/star/list', // 用户点赞的文章列表
  FAVORITE_ARTICLES: '/api/cms/user/favorite/list', // 用户收藏的文章列表
  DELETE_ARTICLES: id => `/api/cms/articles/${id}`, // 删除种草文章
  UPDATE_ARTICLES: id => `/api/cms/articles/${id}` // 更新种草文章
};

/**
 * @deprecated activity 接口
 * ========================================
 */
export const activity = {
  ACTIVITY_LIST: '/api/query/activity/search',// 活动列表
  ACTIVITY_DETAIL: '/api/activities/',// 线上活动详情
  OFFLINE_DETAIL: '/api/offline-activity/',// 线下活动详情
  ACTIVITY_ENROLL: '/api/offline-activity-enroll/create', // 线下活动报名
  ACTIVITY_REMARK: '/api/offline-activity-remark/create',// 线下活动评价
  ACTIVITY_REMARKLIST: '/api/offline-activity-remark', // 线下活动评价列表
  ACTIVITY_ENROLLUSER: '/api/offline-activity-enroll/user' // 线下活动报名人员列表
};

/**
 * @deprecated 首页 种草接口
 * ========================================
 */
export const articlesList = {
  ARTICLES_LIST: '/api/cms/articles/list'// 首页推荐种草列表
};

/**
 * @deprecated 电子发票接口
 * ========================================
 */
export const invoice = {
  INVOICE_LIST: '/api/query/receipts', // 电子发票列表
  INVOICE_DETAIL: rcptSeq => `/api/query/receipt/${rcptSeq}`, // 电子发票详情
  INVOICE_HEADER_QUERY: '/api/invoice-titles', // 会员发票抬头查询
  INVOICE_ADD: '/api/invoice-title/create', // 会员发票抬头新增
  INVOICE_DELETE: '/api/invoice-title/delete', // 会员发票抬头删除
  INVOICE_UPDATE: '/api/invoice-title/update' // 会员发票抬头更新
};

/**
 * @deprecated 门店接口
 * ========================================
 */
export const store = {
  SEARCH_STORE: '/api/query/stores', // 门店查询
  DEFAULT_STORE: '/api/update/default/store', // 设置默认门店
  REMOVE_STORE: '/api/remove/fav-stores', // 收藏门店移除
  COLLECTION_STORE_LIST: '/api/query/fav-stores', // 门店收藏列表
  COLLECTION_STORE: '/api/create/fav-stores', // 收藏门店
  CITY_LIST: '/api/district', // 城市列表
  PRODUCT_STOCKS: '/api/store/product-stocks' // 门店库存查询
};

/**
 * @deprecated area 地域 接口
 * ========================================
 */
export const City = {
  CITY_LIST: '/api/district', // 通过父节点获取行政区划列表
  TREE_LIST: '/api/district/level', // 树状获取行政区划列表
  SEARCH_LOCATION: '//restapi.amap.com/v3/geocode/geo' // 逆转查询经纬度
};

/**
 * @deprecated upload 上传 接口
 * ========================================
 */
export const Upload = {
  BASE64: '/upload/base64' // base64上传图片
};
/**
 * @deprecated upload 上传 接口
 * ========================================
 */
export const service = {
  GET_LIST: '/api/claims', // 售后订单列表
  GET_DETAIL: '/api/claim/', // 售后订单详情
  POST_CANCEL: '/api/claim/' // 取消售后
};
/**
 * @deprecated faq 相关接口
 * ========================================
 */
export const faq = {
  GET_FAQ_LIST: '/api/faq/query' // faq:列表
};

/**
 * @deprecated 支付相关接口
 * ========================================
 */
export const pay = {
  ORDER_PAY: '/api/order/${ordseq}/pay', // 正常订单
  PRE_PAY: '/api/presell/${ordseq}/prepay',  // 预售订金
  FINAL_PAY: '/api/presell/${ordseq}/finalpay',  // 预售尾款
  MERGE_PAY: '/api/presell/${ordseq}/merge'  // 预售尾款合并支付
};
