'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: yourname
* Date: 2020-07-28
* Desc: 生日日期过滤
*/

export default {
  filterBrithdayDate,
  filterOrderCount
};

function filterBrithdayDate(date: any):string {
  let year = date.substring(0,4);
  let month = date.substring(4,6);
  let day = date.substring(6,8);
  return `${year}-${month}-${day}`;
}

function filterOrderCount(count: any):string {
  if (count > 99) {
    return '99+';
  }
  return count;
}