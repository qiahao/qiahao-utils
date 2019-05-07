/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:26
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-01-14 17:26
*/

export * from './src/utilsApp';
export * from './src/utilsVue';
export * from './src/utilsAlert';
export * from './src/tools';

var _toString = Object.prototype.toString;

// 基础工具函数
export function isObject(obj: null) {
  return obj !== null && typeof obj === 'object';
}
export function toRawType(value: any) {
  return _toString.call(value).slice(8, -1);
}
export function isPlainObject(obj: any) {
  return _toString.call(obj) === '[object Object]';
}

export function isPrimitive(value: any) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  );
}
// 基础工具函数 end

export function removeArrayItem(arr: any[], item: any) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}


/**
 * @des :解析url
 * @param url
 * @returns params
 */
function getPathParams(url: string) {

  var theRequest = new Object();
  if (url.indexOf('?') != -1) {
    var str = url.substr(url.indexOf('?') * 1 + 1);
    let strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}
/**
 * @des :解析url
 * @param url
 * @returns params
 */
function parseObjectToQueryString(obj: any) {
  const array = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      array.push(`${key}=${obj[key]}`);
    }
  }
  return array.join('&');
}

function validate(fields: any[], callback: (arg0: boolean, arg1: any, arg2: any[]) => void) {
  const errs: any[] = [];
  fields.forEach((field: { validate: (arg0: null, arg1: (errMsg: any, formItem: any) => void) => void; }) => {
    field.validate(null, (errMsg: any, formItem: any) => {
      if (errMsg) {
        errs.push({ formItem, errMsg });
      }
    });
  });
  if (typeof callback === 'function') {
    const valid = !errs.length;
    callback(valid, errs[0], errs);
  }
}

function makeTree(arr: string | any[], rootId = '0', idKey = 'id', pIdKey = 'parentId', cKey = 'children', pKey = 'parent') {
  const root: any = { [cKey]: [], [idKey]: rootId, [pIdKey]: null, [pKey]: null };

  if (!(arr instanceof Array) || !arr.length) {
    return Object.assign({}, root);
  }

  root[cKey] = getChildren(arr, root);
  function getChildren(list: any[], parent: { [x: string]: any; }) {
    const children = list.filter((item: { [x: string]: any; }) => item[pIdKey] === parent[idKey]);
    const restList = list.filter((item: { [x: string]: any; }) => item[pIdKey] !== parent[idKey]);
    children.forEach((item: { [x: string]: any; }) => {
      item[pKey] = parent;
      item[cKey] = getChildren(restList, item);
    });
    return children;
  }
  return root;
}
/**
 * @description 获取设备宽度
 */
function getScreenWidth(): number {
  return document.documentElement.clientWidth;
}
/**
 * @description 获取设备高度
 */
function getScreenHeight(): number {
  return document.documentElement.clientHeight;
}

export function removeEmpty(obj: any) {
  if (!isPlainObject(obj) && toRawType(obj) != 'array') {
    return obj;
  }
  function rmEmpty(obj: any[]) {
    if (isPlainObject(obj)) {
      for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
          const v = obj[k];
          if (v == null) {
            delete obj[k];
          } else {
            obj[k] = rmEmpty(v);
          }
        }
      }
      return obj;
    } else if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        const v = rmEmpty(obj[i]);
        if (v == null) {
          obj.splice(i, 1);
          i--;
        } else {
          obj[i] = rmEmpty(v);
        }
      }
      return obj;
    } else {
      return obj;
    }
  }
  return rmEmpty(obj);
}

function getPathAndParams(url: string) {
  let _arr = url.split('?');
  let _path = _arr[0];
  let _query = _arr[1].split('&');
  let _result = {};
  _query.forEach(item => {
    let _goal = item.split('=');
    _result[_goal[0]] = _goal[1];
  });
  return { path: _path, query: _result };
}
// 以上为非业务方法

// 业务工具方法
export {
  getPathParams,
  parseObjectToQueryString,
  validate,
  makeTree,
  getScreenWidth,
  getScreenHeight,
  getPathAndParams
};
