import { getInstaller } from '@/utils';
export * from './src/filterDictionary';
import filterBrithdayDate from './src/filters';
import filterOrderCount from './src/filters';

// 全局注册
const filters = {
  ...filterBrithdayDate,
  ...filterOrderCount
};

export default getInstaller('filter', filters);