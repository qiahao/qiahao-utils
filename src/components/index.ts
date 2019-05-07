import { getInstaller } from '@/utils';

// src 组件：业务组件
import { AppPageView, AppPage, AppHeader, AppFooter } from './src/AppLayout';
import InsIcon from './src/InsIcon';
import InsIconCart from './src/InsIconCart';
import InsTag from './src/InsTag';
import InsButton from './src/InsButton';
import InsNumber from './src/InsNumber';
import InsFlex from './src/InsFlex';

// srcUI 组件：布局组件||第三方组件

export {
  InsIcon,
  InsIconCart,
  InsTag,
  InsButton,
  InsNumber,
  InsFlex,
};

// 全局注册
const components = {
  AppPageView,
  AppPage,
  AppHeader,
  InsIcon,
  AppFooter
  // 全局注册的srcUI 组件：布局组件||第三方组件
};

export default getInstaller('component', components);