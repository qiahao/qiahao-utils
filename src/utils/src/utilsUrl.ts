
/**
 * @des 获取url查询参数
 * @param url
 * @returns {Object}
 */
function getQueryParams(url: string) {

  const params = {};
  const index = url.indexOf('?');

  if (index !== -1) {
    const qsArray = url.substr(index + 1).split('&');
    const l = qsArray.length;
    for (let i = 0; i < l; i++) {
      const [key, value] = qsArray[i].split('=');
      params[key] = decodeURI(value);
    }
  }
  return params;
}
/**
 * @des 将对象解析成query字符串
 * @param obj
 * @returns {string}
 */
function getQueryString(obj: any) {
  const array = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      array.push(`${key}=${obj[key]}`);
    }
  }
  return array.join('&');
}

function getAnchorFromUrl(url) {
  let a = document.createElement('a');
  a.href = url;
  const o = {
    host: a.host,
    hostname: a.hostname,
    origin: a.origin,
    baseURI: a.baseURI,
    href: a.href,
    pathname: a.pathname,
    protocol: a.protocol,
    search: a.search
  };
  a = null;
  return o;
}


export {
  getQueryParams,
  getQueryString,
  getAnchorFromUrl
};