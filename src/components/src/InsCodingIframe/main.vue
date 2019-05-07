<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-03-20 11:23
* Desc:
*/
-->

<template>
  <div class="ins-codingIframe">
    <iframe
      :height="computedHeight"
      :name="iframeName"
      :scrolling="isScrolling"
      :src="src"
      @error="onIframeError"
      @load="onIframeLoad"
      frameborder="0"
      ref="iframe"
      v-if="!!src"
      width="100%"
    ></iframe>
    <transition name="fade">
      <div
        class="ins-codingIframe__loading"
        v-if="!isShowed && !isError"
      >
        <ins-icon icon="loading"></ins-icon>
        <div>加载中...</div>
      </div>
    </transition>
    <div
      class="ins-codingIframe__error"
      v-if="isError"
    >加载出错.</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';
import { InsIcon } from '@/components';

// 后期优化，
const CodingIframs = {};
const EVENT_CODING_IFRAME_UPDATE_HEIGHT = 'EVENT_CODING_IFRAME_UPDATE_HEIGHT';
const EVENT_CODING_IFRAME_ROUTER = 'EVENT_CODING_IFRAME_ROUTER';
const EVENT_NOTIFY_UPDATE_KEY = 'EVENT_NOTIFY_UPDATE_KEY';

// 添加message 事件
window.addEventListener(
  'message',
  function(event) {
    const data = event.data || {};
    // iframe子window 必传参数
    const { name, key, height, route } = data;
    const instance = key && CodingIframs[key];
    if (instance && name === EVENT_CODING_IFRAME_UPDATE_HEIGHT) {
      if (instance && instance.shouldUpdateHeight && instance.updateHeight) {
        instance.updateHeight(height);
        instance.hasConnect2SubWindow = true;
      }
    } else if (instance && name === EVENT_CODING_IFRAME_ROUTER && route) {
      instance.routerPush(route);
    }
  },
  false
);

@Component({
  name: 'InsCodingIframe',
  components: {
    InsIcon
  }
})
export default class App extends Vue {
  private docHeight: string = '0px'; // 默认
  private hasConnect2SubWindow = false; // 是否和子window建立链接，已建立 取消轮询
  private connectTimer = null;
  private isShowed = false; // frame在加载完后，第一次更新高度时设置为true，表示iframe 显示了
  private isError = false; // frame加载出错

  @Prop({ type: String }) src: string;
  @Prop({ type: String }) height: string; // 传入固定值，则不改变高度

  // 只做为标示，暂时没有用到
  get iframeName() {
    return this.$route.path + '_' + new Date().getTime();
  }
  get computedHeight() {
    return this.height !== undefined ? this.height : this.docHeight;
  }
  get isScrolling() {
    // 有配置高度时，不更新高度，使用局部滚动
    return !this.height;
  }

  // 提供iframe内脚本使用：是否需要轮询更新高度
  get shouldUpdateHeight() {
    return !this.height;
  }

  onIframeLoad() {
    // 在设置了固定height属性，不需要更新高度的情况下，直接判断onload
    if (!this.shouldUpdateHeight) {
      this.isShowed = true;
    }
  }
  onIframeError() {
    this.isError = true;
  }

  // 提供iframe内脚本使用：更新文档高度
  updateHeight(h) {
    this.docHeight = h ? `${h}px` : '0px';
    this.isShowed = true;
  }

  // 提供iframe内脚本使用：切换路由方法
  routerPush(path) {
    this.$router.push(path);
  }

  // 尝试通知contentWindow 当前组件uid
  tryPostMessage2ContentWidow() {
    const _this: any = this;
    clearInterval(this.connectTimer);
    connect();
    this.connectTimer = setInterval(connect, 1000);
    function connect() {
      const iframe: any = _this.$refs.iframe;
      if (iframe) {
        const contentWindow: any = iframe.contentWindow;
        // 通知子window
        contentWindow.postMessage({ name: EVENT_NOTIFY_UPDATE_KEY, key: _this._uid }, '*');
      }
    }
  }

  created() {
    // 初始化保存对象
    const _this: any = this;
    const key = _this._uid;
    CodingIframs[key] = _this;
  }
  destroyed() {
    // 注销时删除
    const _this: any = this;
    delete CodingIframs[_this._uid];
  }

  mounted() {
    this.$watch(
      'src',
      n => {
        if (n) {
          this.tryPostMessage2ContentWidow();
        }
      },
      { immediate: true }
    );
    this.tryPostMessage2ContentWidow();
  }
}
</script>
<style lang="scss">
@keyframes loadingRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(380deg);
  }
}

@include b(codingIframe) {
  $mh: 100px;
  min-height: $mh;

  &__loading,
  &__error {
    height: $mh;
    padding-top: $mh/4;
    text-align: center;

    font-size: 12px;
  }
  &__loading {
    .icon-loading,
    .icon-left {
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      font-size: 28px;
      transform: rotate(0deg);
      animation: loadingRotate 0.6s infinite linear;
    }
  }

  iframe {
    margin: 0;
  }
}
</style>
