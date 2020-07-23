var _toString = Object.prototype.toString;

function rawType(value: any) {
  return _toString.call(value).slice(8, -1);
}

function isObject(obj: null) {
  return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj: any) {
  return _toString.call(obj) === '[object Object]';
}

function isPrimitive(value: any) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  );
}

export {
  rawType,
  isObject,
  isPlainObject,
  isPrimitive
};