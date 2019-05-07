/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:41
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-01-14 17:41
*/

interface AppOption {
  text: string,
  value: string | number,
  _value?: string | number,
  disabled?: boolean,
}

type AppOptions = AppOption[];

// 产品相关
export const optionsPrdType: AppOptions = [
  { text: '单品', value: 'N' },
  { text: '套装', value: 'P' }
];
// 产品排序，此处比较特殊，综合排序与最新排序 值一样，做特殊处理
export const optionsProductReorder: AppOptions = [
  { text: '综合排序', value: '1', _value: '' },
  { text: '最新排序', value: '2', _value: '' },
  { text: '销量排序', value: '3', _value: 'saleCount|asc' },
  { text: '价格从低到高', value: '4', _value: 'saleCount|asc' },
  { text: '价格从高到低', value: '5', _value: 'salPrice|desc' }
];

// 性别
export const optionsGender: AppOptions = [
  { text: '男', value: 'M' },
  { text: '女', value: 'F' }
];

// 性别
export const optionsGrade: AppOptions = [
  { text: 'Welcome', value: 'CA01' },
  { text: 'VIP', value: 'CA02' },
  { text: 'VVIP', value: 'CA03' }
];

// 促销类型
export const optionsPromoteType: AppOptions = [
  { text: '满赠', value: 'FG' },
  { text: '满减', value: 'MNS' },
  { text: '满折', value: 'DSC' }
];