/*
* @Author: qiahao
* @Date:  2020-01-14 17:22
* @Last Modified by: qiahao
* @Last Modified time: 2020-01-14 17:22
*/
'use strict';

/**
* @desc: 判断是否是否有效.
* @return:
*/
function isValidate(date: Date): boolean {
  if (!date || date.toString() == 'Invalid Date')
    return false;
  return true;
}

/**
* @desc: 比较date1, date2; 但是当其中一个为null时, 返回false.
* @return:
*/
function moreThen(date1: Date, date2: Date): boolean {
  if (!date1 || !date2) {
    return false;
  }

  return date1.getTime() > date2.getTime();
}

export default {
  isValidate,
  moreThen
};
