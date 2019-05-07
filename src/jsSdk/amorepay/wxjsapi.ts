
function wxJSAPIPayment(jsObj?, callback?) {
  function onBridgeReady() {
    if (typeof(jsObj) == 'string') {
      jsObj = JSON.parse(jsObj);
    }

    const WeixinJSBridge = (window as any).WeixinJSBridge;
    if (!WeixinJSBridge) {
      return;
    }
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', jsObj,
      function(res) {
        console.log('wx-jsapi-res', res);
        // if (res.err_msg == 'get_brand_wcpay_request:ok' ) { }
        if (typeof(callback) == 'function') {
          callback(res);
        }
      }
    );
  }

  const WeixinJSBridge = (window as any).WeixinJSBridge;
  if (typeof WeixinJSBridge == 'undefined') {
    if ( document.addEventListener ) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if ((document as any).attachEvent) {
      (document as any).attachEvent('WeixinJSBridgeReady', onBridgeReady);
      (document as any).attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  }
  else {
    onBridgeReady();
  }
}

export default wxJSAPIPayment;
