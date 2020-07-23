'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-18 16:12
* Desc:
*/
exports.publicPath = '/';
exports.Host = '0.0.0.0';
exports.Port = 8083;


exports.Proxy = {
  '/api': {
    target: 'https://newdev.innisfree.cn',
    // target: 'https://new-stg.innisfree.cn',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api',
      '^/data/api': '/api'
    }
  }
};
