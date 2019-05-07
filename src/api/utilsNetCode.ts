const DEFAULT_ERROR_MESSGE = '服务器出错，请稍后再试';

const codes = {
  // 接口返回code值
  CODE_500: 500, // 系统错误时出现：系统错误，前端先显示未知错误
  CODE_9000: 9000, // invalid-request	服端严重错误
  CODE_4000: 4000, // system-error	主动拒绝访问
  CODE_3000: 3000, // bad-gateway	接口需要访问外部接口但外部接口故障，导致故障
  CODE_2000: 2000, // bad-request	因客户端参数问题导致接口失败
  CODE_1000: 1000, // success	成功

  // 接口返回errcode值
  ERRCODE_2000: 2000,  // br.param-missing	缺少必要参数
  ERRCODE_2001: 2001,  // br.param-invalid	参数格式不正确
  ERRCODE_2002: 2002,  // br.business-error	业务错误
  ERRCODE_2043: 2043,  // br.landing-error	未登陆
  ERRCODE_2080: 2080,  // br.landingfrequency-error	超过登陆次数
  ERRCODE_2081: 2081,  // br.landinguserpassword-error	账号或密码错误
  ERRCODE_2082: 2082,  // br.landinguserfrozen-error	会员被冻结
  ERRCODE_2083: 2083,  // br.landinguserfrozen-error	线下注册会员请先同意官网协议
  ERRCODE_2084: 2084,  // br.mobileatypism-error	发送短信手机号和登陆手机号不一致
  ERRCODE_2085: 2085,  // br.smsvcodeatypism-error	短信验证码不正确
  ERRCODE_2086: 2086,  // br.imgvcodeatypism-error	图片验证码不正确
  ERRCODE_2087: 2087,  // br.smsExceedingnumbe-error	验证次数过多，请重新获取短信验证码
  ERRCODE_2088: 2088,  // br.mobilenumberregistered-error	此手机号已注册
  ERRCODE_2089: 2089,  // br.mobilenumberunregistered-error	此手机号未注册
  ERRCODE_2090: 2090,  // br.emailregistered-error	此邮箱已注册
  ERRCODE_2091: 2091,  // br.realname-error	姓名不能为空或包含女士、小组、先生
  ERRCODE_2092: 2092,  // br.password-error	密码太简单(字母、符号、数字三选二，6-16字符)
  ERRCODE_3005: 3005,  // ex.config-missing	缺少外部接口配置
  ERRCODE_3006: 3006,  // ex.config-invalid	不正确的外部接口配置
  ERRCODE_3007: 3007,  // ex.error	外部接口调用错误
  ERRCODE_4000: 4000,  // rs.unimplemented	功能未实现
  ERRCODE_4001: 4001,  // rs.sign-missing	缺少请求签名
  ERRCODE_4002: 4002,  // rs.sign-invalid	请求签名错误
  ERRCODE_9000: 9000,  // fe.db-error	数据库异常
  ERRCODE_9001: 9001,  // fe.network-error	网络等错误
  ERRCODE_9002: 9002,  // fe.io-error	文件IO错误
  ERRCODE_9003: 9003  // fe.app-unknown-exception	未知异常
};

/**
 * 2000部分errcode 错误信息由前端提供，其他由接口详细信息提供
 * 3000，4000，9000错误，视为 服务器错误
 */

const message = {
  DEFAULT_ERROR: DEFAULT_ERROR_MESSGE,
  SERVER_ERROR: DEFAULT_ERROR_MESSGE,
  NET_ERROR: '网络错误，请稍后再试',
  UNLOGIN: '未登录，现在前往登录',
  [codes.CODE_500]: '系统错误，请稍后再试', // 额外的错误
  [codes.CODE_9000]: '服端严重错误', // invalid-request
  [codes.CODE_4000]: '主动拒绝访问', // system-error
  [codes.CODE_3000]: '接口需要访问外部接口但外部接口故障，导致故障', // bad-gateway
  [codes.CODE_2000]: '因客户端参数问题导致接口失败', // bad-request
  [codes.CODE_1000]: '成功', // success
  // [codes.ERRCODE_2000]: '缺少必要参数',  // br.param-missing
  // [codes.ERRCODE_2001]: '参数格式不正确',  // br.param-invalid
  // [codes.ERRCODE_2002]: '业务错误',  // br.business-error
  [codes.ERRCODE_2043]: '未登陆',  // br.landing-error
  [codes.ERRCODE_2080]: '超过登陆次数',  // br.landingfrequency-error
  [codes.ERRCODE_2081]: '账号或密码错误',  // br.landinguserpassword-error
  [codes.ERRCODE_2082]: '会员被冻结',  // br.landinguserfrozen-error
  [codes.ERRCODE_2083]: '线下注册会员请先同意官网协议',  // br.landinguserfrozen-error
  [codes.ERRCODE_2084]: '发送短信手机号和登陆手机号不一致',  // br.mobileatypism-error
  [codes.ERRCODE_2085]: '短信验证码不正确',  // br.smsvcodeatypism-error
  [codes.ERRCODE_2086]: '图片验证码不正确',  // br.imgvcodeatypism-error
  [codes.ERRCODE_2087]: '验证次数过多，请重新获取短信验证码',  // br.smsExceedingnumbe-error
  [codes.ERRCODE_2088]: '此手机号已注册',  // br.mobilenumberregistered-error
  [codes.ERRCODE_2089]: '此手机号未注册',  // br.mobilenumberunregistered-error
  [codes.ERRCODE_2090]: '此邮箱已注册',  // br.emailregistered-error
  [codes.ERRCODE_2091]: '姓名不能为空或包含女士、小组、先生',  // br.realname-error
  [codes.ERRCODE_2092]: '密码太简单(字母、符号、数字三选二，6-16字符)'  // br.password-error
};

export default codes;
export { codes, message };