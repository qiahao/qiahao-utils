import * as options from './options';
/*
 * @Author: qiahao
 * @Date:  2020-07-20
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-07-20
*/


export const dictionaryGender = _getMapFromOptions(options.optionsGender); // 性别

/* eslint-disable no-unused-vars */

/**
 *
 * @description 工具函数
 * @param options
 */
function _getMapFromOptions(options: any) {
  return options.reduce((a: any, b: any) => {
    a[b.value] = b.text;
    return a;
  }, {});
}

/* eslint-enable no-unused-vars*/