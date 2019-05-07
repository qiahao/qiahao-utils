export function getPureResponseData(res) {
  const response = Object.assign({}, res);
  delete response.code;
  delete response.msg;
  return response;
}

// 设备判断
export const os = (function (): any {
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

// 获取支付平台信息
export const getPlatform = function () {
  // 'wx', 'alipay', 'qq', 'wap', 'pc'
  let platform = 'wap';
  if (os.isQQ) {
    platform = 'qq';
  } else if (os.isAlipay) {
    platform = 'isAlipay';
  } else if (os.isWechat) {
    platform = 'wx';
  } else if (os.isCellPhone) {
    platform = 'wap';
  } else if (os.isPc) {
    platform = 'pc';
  }

  return platform;
};