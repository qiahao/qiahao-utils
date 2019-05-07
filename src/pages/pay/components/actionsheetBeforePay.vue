<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-14 16:20
* Desc:
*/
-->

<template>
  <ins-actionsheet
    :visible.sync="show"
    class="ins-payViewAs"
  >
    <div class="ins-payViewAs__asContent">
      <div class="asHeader">
        <ins-tag
          circle
          type="success-light-1"
        >{{currentPayType.label}}</ins-tag>
      </div>
      <div class="asCt">
        <img :src="currentPayType.icon" />
        <div>正在使用"{{currentPayType.label}}"</div>
      </div>
      <div class="asFooter ins-flex">
        <InsButtonGroup
          circle
          class="ins-payViewAs__asButtonGroup"
        >
          <ins-button
            @click="onClickCancel"
            class="ins-flex__1 mr-sm"
            size="large"
            type="success-light-2"
          >取消支付</ins-button>
          <ins-button
            @click="onClickOk"
            class="ins-flex__1 ml-sm"
            size="large"
            type="success"
          >马上支付</ins-button>
        </InsButtonGroup>
      </div>
    </div>
  </ins-actionsheet>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';

import { InsIcon, InsButton, InsButtonGroup, InsTag, InsActionsheet } from '@/components';

@Component({
  name: 'ActionsheetBeforePay',
  components: {
    InsIcon,
    InsButton,
    InsButtonGroup,
    InsTag,
    InsActionsheet
  }
})
export default class App extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  data;

  @PropSync('visible', { type: Boolean }) show;

  get currentPayType() {
    return this.data || {};
  }

  // 点击弹框取消
  onClickCancel() {
    this.$emit('cancel');
    this.show = false;
  }
  // 点击弹框支付
  onClickOk() {
    this.$emit('ok');
    this.show = false;
  }

  created() {}
  mounted() {}
}
</script>


<style lang="scss">
@include b(payViewAs) {
  @include e(asContent) {
    text-align: center;
    padding-bottom: 80px;
    .asHeader {
      .ins-tag {
        padding-left: 20px;
        padding-right: 20px;
        letter-spacing: 3px;
      }
    }
    .asCt {
      margin-top: 60px;
    }
    .asFooter {
      margin-top: 30px;
      .ins-buttonGroup {
        width: 75%;
        max-width: 375px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>