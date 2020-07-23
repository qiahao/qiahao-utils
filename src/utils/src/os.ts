
// 设备判断
const os = (function (): any {

  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = (UA && UA.indexOf('android') > 0);
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFireFox = UA && UA.match(/firefox\/(\d+)/);
  var isWindowsPhone: boolean = /(?:Windows Phone)/i.test(UA);
  var isSymbian: boolean = /(?:SymbianOS)/i.test(UA) || isWindowsPhone;
  var isIPhone: boolean = /(?:iPhone)/i.test(UA) && !isTablet;
  var isTablet: boolean = /(?:iPad|PlayBook)/i.test(UA) || (isAndroid && !/(?:Mobile)/i.test(UA)) || (isFireFox && /(?:Tablet)/i.test(UA));
  var isPc: boolean = !isIPhone && !isAndroid && !isSymbian;
  var isCellPhone: boolean = isIPhone || isSymbian || isAndroid || isWindowsPhone;
  var isQQ: boolean = /(?:\sqq\/)/i.test(UA);
  var isAlipay: boolean = /(?:alipayclient)/i.test(UA);
  var isWechat: boolean = top.hasOwnProperty('WeixinJSBridge') || /(?:micromessenger)/i.test(UA);

  return {
    isIE,
    isIE9,
    isEdge,
    isAndroid,
    isIOS,
    isChrome,
    isPhantomJS,
    isFireFox,
    isWindowsPhone,
    isSymbian,
    isIPhone,
    isTablet,
    isPc,
    isCellPhone,
    isQQ,
    isAlipay,
    isWechat
  };
})();

export default os;