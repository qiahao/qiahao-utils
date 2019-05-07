import store2 from '@/store/store2';
import { STORAGE_USER_INFO } from '@/config';
import { PATH_INDEX } from '@/router';

export default {
  userInfo: store2.get(STORAGE_USER_INFO) || null,
  login2route: { path: PATH_INDEX },
  redirectRoute: null,
  bindFormData: sessionStorage.bindFormData && JSON.parse(sessionStorage.bindFormData) || {}, // 第三方账号手机绑定的 手机号及验证码
  thirdParty: sessionStorage.thirdParty || '第三方账号'  // 用于绑定页显示的第三方平台名字
};
