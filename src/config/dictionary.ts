import * as options from './options';
/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:41
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-01-14 17:41
*/


/**
 *
 * @description 工具函数
 * @param options
 */
export function getMapFromOptions(options: any) {
  return options.reduce((a: any, b: any) => {
    a[b.value] = b.text;
    return a;
  }, {});
}


export const dictionaryPrdType = getMapFromOptions(options.optionsPrdType); // 产品类型，套装或单品
export const dictionaryProductReorder = getMapFromOptions(options.optionsProductReorder); // 产品排序选项
export const dictionaryGender = getMapFromOptions(options.optionsGender); // 性别
export const dictionaryGrade = getMapFromOptions(options.optionsGrade); // 等级
export const dictionaryPromoteType = getMapFromOptions(options.optionsPromoteType); // 促销类型

