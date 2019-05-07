import { getInstaller } from '@/utils';
import clickoutside from './src/clickoutside';
import gio from './src/gio';

export { clickoutside, gio };

// 全局注册
const directives = {
  gio
};

export default getInstaller('directive', directives);