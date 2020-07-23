/*
 * @Author: qiahao
 * @Date:  2020-07-20
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-07-20
*/

interface Option {
  text: string,
  value: string | number
}

type Options = Option[];

// 性别
export const optionsGender: Options = [
  { text: '男', value: 'M' },
  { text: '女', value: 'F' }
];
