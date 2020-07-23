import {
  isPlainObject,
  rawType
} from './utilsBase';


function removeItem(arr: any[], item: any) {
  var index = arr.indexOf(item);
  if (index > -1) {
    return arr.splice(index, 1);
  }
}

/**
 * @description 将数组构建成树形结构
 * @param array 数组
 * @param rootId 顶层元素的唯一标识值：默认'0'
 * @param idKey 唯一标识的key名称：默认'id'
 * @param parentIdKey 构建父子级关系的的 父标示key属性名称：默认'parent'
 * @param parentKey 构建成后 要添加的父属性名，支持自定义，用来向上查找父元素
 * @param childrenKey 为父元素添加的子级数组属性名
 */

function getTreeFromArray(
  array: any[],
  rootId = '0',
  idKey = 'id',
  parentIdKey = 'parentId',
  parentKey = 'parent',
  childrenKey = 'children'
) {
  const root: any = {};

  if (!(array instanceof Array) || !array.length) {
    return Object.assign({}, root);
  }

  const _array = array.slice(0);

  const idKeyMap = getIdKeyMap(_array, parentIdKey);

  function getIdKeyMap(list, pIdKey) {
    const _cacheMap = {};
    const l = list.length;
    for (let i = 0; i < l; i++) {
      const el = list[i];
      const pId = el[pIdKey];
      _cacheMap[pId] = _cacheMap[pId] || [];
      _cacheMap[pId].push(el);
    }

    return _cacheMap;
  }

  const rootList = idKeyMap[rootId] || [];

  setChildren(rootList, idKeyMap, idKey, parentKey, null);

  return rootList;

  function setChildren(list, idKeyMap, idKey, parentKey, parent) {
    const l = list.length;
    if (l > 0) {
      for (let i = 0; i < l; i++) {
        const el = list[i];
        const id = el[idKey];
        const children = idKeyMap[id] || [];
        el[parentKey] = parent;
        el[childrenKey] = children;
        if (children.length) {
          setChildren(children, idKeyMap, idKey, parentKey, el);
        }
      }
    }
  }
}

function removeEmpty(obj: any) {
  if (!isPlainObject(obj) && rawType(obj) != 'array') {
    return obj;
  }
  function _removeEmpty(obj: any[]) {
    if (isPlainObject(obj)) {
      for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
          const v = obj[k];
          if (v == null) {
            delete obj[k];
          } else {
            obj[k] = _removeEmpty(v);
          }
        }
      }
      return obj;
    } else if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        const v = _removeEmpty(obj[i]);
        if (v == null) {
          obj.splice(i, 1);
          i--;
        } else {
          obj[i] = _removeEmpty(v);
        }
      }
      return obj;
    } else {
      return obj;
    }
  }
  return _removeEmpty(obj);
}

export {
  removeItem,
  removeEmpty,
  getTreeFromArray
};