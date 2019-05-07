<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: wuhongxiang
* Date: 2020-02-10 11:24
* Desc: 按钮组件
*/
 -->

<template>
  <button
    :class="computedClass"
    @click="handlerClick"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import clickMixin from '@/mixins/clickMixin';
@Component({
  name: 'InsButton',
  components: {},
  mixins: [clickMixin]
})
export default class extends Vue {
  @Prop({type: String , default: 'default' }) type: string; // default| primary| success| warning| danger | success-light
  @Prop({type: String , default: 'middle' }) size: string; // small|middle|large
  @Prop({type: Boolean, default: false }) full: boolean; // 宽度是否100% 默认否
  @Prop({type: Boolean, default: false }) circle: boolean; // 是否圆角 默认否

  get computedClass() {
    return [
      'ins-button',
      `is-${this.size}`,
      `is-${this.type}`,
      {
        'is-full': this.full,
        'is-circle': this.circle
      }
    ];
  }
  mounted() {}
}
</script>
<style lang="scss">
@mixin buttonType($borderColor, $bgColor: $borderColor, $fontColor: $--color-white) {
  &,
  &:disabled,
  &:disabled:hover,
  &:disabled:active,
  &:active {
    border-color: $borderColor;
    background-color: $bgColor;
    color: $fontColor;
  }
}

@include b(button) {
  $smHeight: 22px;
  $mdHeight: 32px;
  $lgHeight: 40px;

  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: $--radius-xs;
  border: 1px solid $--border-color-base;
  background-color: $--background-color-white;
  color: $--color-text-primary;
  font-size: $--font-size-md;
  transition: opacity 1s;
  vertical-align: middle;
  text-align: center;
  &:active {
    opacity: 0.8;
  }
  @include when(small) {
    line-height: $smHeight - 2;
    padding-left: $smHeight / 2;
    padding-right: $smHeight / 2;
    font-size: $--font-size-xs;
    @include when(circle) {
      border-radius: $smHeight / 2;
    }
  }
  @include when(middle) {
    line-height: $mdHeight - 2;
    padding-left: $mdHeight / 2;
    padding-right: $mdHeight / 2;
    font-size: $--font-size-md;
    @include when(circle) {
      border-radius: $mdHeight / 2;
    }
  }
  @include when(large) {
    line-height: $lgHeight - 2;
    padding-left: $lgHeight / 2;
    padding-right: $lgHeight / 2;
    font-size: 15px; // 设计要求15px
    @include when(circle) {
      border-radius: $lgHeight / 2;
    }
  }

  @include when(full) {
    width: 100%;
  }

  &:disabled {
    opacity: 0.8;
  }

  // color
  @include when(default) {
    @include buttonType($--border-color-base, $--color-white, $--text-color-primary);
  }

  @include when(primary) {
    @include buttonType($--color-primary);
  }
  @include when(success) {
    @include buttonType($--color-success);
  }
  @include when(success-light) {
    @include buttonType($--color-success-light-2);
  }
  @include when(success-light-1) {
    @include buttonType($--color-success-light-1);
  }
  @include when(success-light-2) {
    @include buttonType($--color-success-light-2);
  }
  @include when(warning) {
    @include buttonType($--color-warning);
  }
  @include when(danger) {
    @include buttonType($--color-danger);
  }

  @include when(primary-plain) {
    @include buttonType($--color-primary, $--color-white, $--color-primary);
  }
  @include when(success-plain) {
    @include buttonType($--color-success, $--color-white, $--color-success);
  }
  @include when(success-light-plain) {
    @include buttonType($--color-success-light-2, $--color-white, $--color-success-light-2);
  }
  @include when(success-light-1-plain) {
    @include buttonType($--color-success-light-1, $--color-white, $--color-success-light-1);
  }
  @include when(success-light-2-plain) {
    @include buttonType($--color-success-light-2, $--color-white, $--color-success-light-2);
  }
  @include when(warning-plain) {
    @include buttonType($--color-warning, $--color-white, $--color-warning);
  }
  @include when(danger-plain) {
    @include buttonType($--color-danger, $--color-white, $--color-danger);
  }
}
</style>
