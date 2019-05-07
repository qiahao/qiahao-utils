"use strict";

/**
 * Copyright (c) 2017 Copyright bp All Rights Reserved.
 * Author: lipengxiang
 * Date: 2019-06-14 17:18
 * Desc:
 */
const path = require("path");
const config = require("./config");

// process.env.NODE_ENV = 'production';

const assetsDir = 'mobilestatic';

function resolve(dir) {
  return path.join(__dirname, dir);
}

var configureWebpack = {
  optimization: {
    runtimeChunk: {
      name: assetsDir + '/js/manifest',
    },
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: true,
      maxSize: 512 * 1024,
      minSize: 20 * 1024,
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.(css|scss|sass|less|vue)$/,
        //   chunks: 'all',
        //   minChunks: 1,
        //   reuseExistingChunk: true,
        //   // enforce: true,
        //   priority: 30,
        // },
        // 处理入口chunk
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 10,
        },
        // 处理异步chunk
        'async-vendors': {
          name: 'async-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: 15,
        },
        febs: {
          name: "febs.dll",
          priority: 20,
          test: /[\\/]node_modules[\\/]febs.*[\\/]/
        },
        components: {
          name: "components.dll",
          priority: 25,
          test: /[\\/]src[\\/]components.*[\\/]/
        },
      },
    }
  }
};

if (process.env.NODE_ENV != 'development') {
  configureWebpack.output = {
    filename: '[name].[contenthash:7].js'
  }
}

module.exports = {
  outputDir: "dist",
  publicPath: config.publicPath,
  assetsDir: assetsDir,
  filenameHashing: true,
  productionSourceMap: process.env.NODE_ENV == 'development',
  devServer: {
    host: config.Host,
    port: config.Port,
    proxy: config.Proxy,
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        alias: {
          "@": resolve("./src")
        },
        prependData: `@import "~@/styles/index.scss"`
      },
      scss: {
        prependData: `@import "~@/styles/index.scss";`
      }
    }
  },
  transpileDependencies: [
    'febs-browser',
  ],

  chainWebpack: config => {
    config.resolve.alias
      .set("febs", "febs-browser")
      .set("assets", resolve("src/assets"))
      .set("@", resolve("./src"))
      .set("ext", resolve("./ext"))
      .set("bpui.js", resolve("./src/bpui/bpui.ts"))
      .set("bpui.js.src", resolve("./node_modules/bpui.js/src/index.ts"))


    // config.module.rules.delete("svg")
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/assets/svgs'))
      .end()
    // config.module.rule("svg").options({
    //   exclude: resolve('src/styles')
    // })
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/svgs')) //处理svg目录
      .end()
      .exclude
      .add(resolve('src/styles'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config
      .module
      .rule("images")
      .test(/\.(jpg|png|gif)$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        publicPath: '/' + assetsDir + '/images',
        outputPath: assetsDir + '/images',
        name: '[name]_[hash:7].[ext]',
        limit: 1024
      })
      .end();
  },

  configureWebpack,
};
