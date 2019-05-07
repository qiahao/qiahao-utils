import dialog from '@bpui/dialog';

var _toString = Object.prototype.toString;

// 设备判断
const os = (function (): any {
  var ua: string = navigator.userAgent,
    isWindowsPhone: boolean = /(?:Windows Phone)/i.test(ua),
    isSymbian: boolean = /(?:SymbianOS)/i.test(ua) || isWindowsPhone,
    isAndroid: boolean = /(?:Android)/i.test(ua),
    isFireFox: boolean = /(?:Firefox)/i.test(ua),
    isChrome: boolean = /(?:Chrome|CriOS)/i.test(ua),
    isIPhone: boolean = /(?:iPhone)/i.test(ua) && !isTablet,
    isTablet: boolean = /(?:iPad|PlayBook)/i.test(ua) || (isAndroid && !/(?:Mobile)/i.test(ua)) || (isFireFox && /(?:Tablet)/i.test(ua)),
    isPc: boolean = !isIPhone && !isAndroid && !isSymbian,
    isCellPhone: boolean = isIPhone || isSymbian || isAndroid || isWindowsPhone,
    isWechat: boolean = top.hasOwnProperty('WeixinJSBridge') || /(?:micromessenger)/i.test(ua),
    isAlipay: boolean = /(?:alipayclient)/i.test(ua),
    isQQ: boolean = /(?:\sqq\/)/i.test(ua);

  return {
    ua: ua,
    isWindowsPhone: isWindowsPhone,
    isSymbian: isSymbian,
    isAndroid: isAndroid,
    isFireFox: isFireFox,
    isChrome: isChrome,
    isIPhone: isIPhone,
    isTablet: isTablet,
    isPc: isPc,
    isCellPhone: isCellPhone,
    isWechat: isWechat,
    isAlipay: isAlipay,
    isQQ: isQQ
  };
})();

// 打开窗口
function openWindow(url, target = '__blank') {
  var a = top.document.createElement('a');
  a.setAttribute('href', url);
  if (target == null) {
    target = '';
  }
  a.setAttribute('target', target);
  top.document.body.appendChild(a);
  if (a.click) {
    a.click();
  }
  else {
    try {
      var evt = top.document.createEvent('Event');
      evt.initEvent('click', true, true);
      a.dispatchEvent(evt);
    }
    catch (e) {
      top.open(url);
    }
  }
  top.document.body.removeChild(a);
}


function getDefaultPlatform() {
  if (os.isPc) {
    // TODO: 需确认platform有哪些可选值
    return 'web';
  } else if (os.isWechat) {
    return 'wx';
  } else {
    return 'wap';
  }
}


function getOrigin(src) {
  if (src.indexOf('//') === 0) {
    src = document.location.protocol + src;
  }
  else if (src.indexOf('/') === 0) {
    src = document.location.origin + src;
  }
  else if (src.indexOf('://') < 0) {
    var idx = document.location.href.lastIndexOf('/');
    if (idx <= document.location.href.indexOf('://') + 3) {
      idx = document.location.href.length;
      src = '/' + src;
    }
    src = document.location.href.substring(0, idx) + src;
  }
  return src.replace(/^(https?:\/\/[^/]+)(.*)$/i, '$1');
}

function toRawType(value: any) {
  return _toString.call(value).slice(8, -1);
}
function isPlainObject(obj: any) {
  return _toString.call(obj) === '[object Object]';
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

function removeEmpty(obj: any) {
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

/**
 * 全局使用的提示信息
 * @param {string} msg 提示信息
 * @param {?: object} option 配置信息
 */
function alertError(cfg: string | {
  content?: string,
  /** 持续时间 */
  durable?: number
}) {
  dialog.apiWidget.showToast(cfg);
}
/**
 * 全局使用的提示信息
 * @param {string} msg 提示信息
 * @param {?: object} option 配置信息
 */
function alertToast(cfg: string | {
  content?: string,
  /** 持续时间 */
  durable?: number
}) {
  dialog.apiWidget.showToast(cfg);
}


/**
 * 全局使用的提示信息
 * @param {string} msg 提示信息
 */
function alertConfirm(cfg: string | number | {
  title?: string,
  content: string,
  okText?: string,
  cancelText?: string,
  confirm?: () => any,
  cancel?: () => void,
}) {
  if (typeof cfg === 'string' || typeof cfg === 'number') {
    cfg = { content: cfg.toString() };
  }
  const { title, content, okText, cancelText, confirm, cancel } = cfg;
  return new Promise((resolve, reject) => {
    let config: any = {};
    config.title = !title && title !== null ? '提示' : title;
    config.content = content;
    config.okText = okText || '确认';
    config.cancelText = cancelText || '取消';
    config.confirm = function (id) {
      if (typeof confirm === 'function') {
        let r = confirm();
        if (r !== false) {
          dialog.apiWidget.hideConfirm(id);
          resolve();
        }
      } else {
        dialog.apiWidget.hideConfirm(id);
        resolve();
      }
    };
    config.cancel = function (id) {
      if (typeof cancel === 'function') {
        cancel();
      }
      reject();
      dialog.apiWidget.hideConfirm(id);
    };

    dialog.apiWidget.showConfirm(config);
  });
}

// showAlert(cfg:string|{
//   title?: string,
//   content: string,
//   okText?: string,
//   confirm?: (id:DialogID)=>void,
// }): DialogID;
function alertAlert(cfg: string | number | {
  title?: string,
  content: string,
  okText?: string,
  confirm?: () => any
}) {
  if (typeof cfg === 'string' || typeof cfg === 'number') {
    cfg = { content: cfg.toString() };
  }
  const { title, content, okText, confirm } = cfg;
  return new Promise((resolve, reject) => {
    let config: any = {};
    config.title = !title && title !== null ? '提示' : title;
    config.content = content;
    config.okText = okText || '确认';
    config.confirm = function (id) {
      if (typeof confirm === 'function') {
        let r = confirm();
        if (r !== false) {
          dialog.apiWidget.hideAlert(id);
          resolve();
        }
      }
    };
    dialog.apiWidget.showAlert(config);
  });
}

function hideAlert(id) {
  dialog.apiWidget.hideAlert(id);
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

function showLoading() {
  dialog.apiWidget.showLoading();
}
function hideLoading() {
  dialog.apiWidget.hideLoading();
}
export {
  os,
  openWindow,
  getDefaultPlatform,
  getOrigin,
  alertToast,
  alertError,
  alertConfirm,
  alertAlert,
  hideAlert,
  showLoading,
  hideLoading,
  parseObjectToQueryString,
  removeEmpty,
  isPrimitive
};