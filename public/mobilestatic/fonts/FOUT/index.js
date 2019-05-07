/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-16 10:20
* Desc:
*/

/**
* @desc: 从缓存中加载字体.
* @return:
*/
(function() {
  // font.
  if ( sessionStorage.fontsLoaded ) {
    document.documentElement.className += ' fonts-loaded';
    return;
  } else if ( 'fonts' in document ) {
    let fonts = (document).fonts;
    Promise.all([
      fonts.load('400 1em SourceHanSansCN'),
      fonts.load('200 1em SourceHanSansCN'),
      fonts.load('300 1em SourceHanSansCN'),
      fonts.load('500 1em SourceHanSansCN')
    ]).then(function () {
      document.documentElement.className += ' fonts-loaded';
      sessionStorage.fontsLoaded = true;
    });
  } else {
    // use fallback
    var ref = document.getElementsByTagName( 'script' )[ 0 ];
    var script = document.createElement( 'script' );
    script.src = '/mobilestatic/fonts/FOUT/font-method-FOUT.js';
    script.async = true;
    ref.parentNode.insertBefore( script, ref );
    /*
      * technically you could trigger the web font load here too and race it with
      * the polyfill load, this means creating an element with text content that
      * uses the font and attaching it to the document
      * <div style="font-family: Lato; font-weight: 400; font-style: italic">A</div>
      */
  }
}());
