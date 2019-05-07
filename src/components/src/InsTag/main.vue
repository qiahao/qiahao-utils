<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-03-03 10:28
* Desc:
*/
-->

<template>
  <span :class="classes">
    <template v-if="size === 'xsmall'">
      <span class="font-size-8">
        <slot></slot>
      </span>
    </template>
    <template v-if="size !== 'xsmall'">
      <slot></slot>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  name: 'InsTag',
  components: {}
})
export default class extends Vue {
  @Prop({ type: String, default: 'default' }) type: string;
  @Prop({ type: String, default: 'middle' }) size: string;
  @Prop({ type: Boolean }) circle: boolean; // 是否圆角
  @Prop({ type: Boolean }) leaf: boolean; // 是否是叶形

  get classes() {
    return [
      'ins-tag',
      `is-${this.type}`,
      `is-${this.size}`,
      {
        'is-circle': this.circle,

        'is-leaf': this.leaf
      }
    ];
  }
}
</script>
<style lang="scss">
@mixin tagType($borderColor, $bgColor: $borderColor, $fontColor: $--color-white) {
  & {
    border-color: $borderColor;
    background-color: $bgColor;
    color: $fontColor;
  }
}

@include b(tag) {
  $xsmall: 14px;
  $small: 22px;
  $middle: 30px;
  $large: 40px;

  display: inline-block;
  border: 1px solid $--color-white;
  color: $--color-text-primary;
  background-color: $--background-color-light;
  vertical-align: middle;
  text-align: center;
  font-size: $--font-size-md;
  &:not(:last-of-type) {
    margin-right: 5px;
  }

  @include when(xsmall) {
    height: $xsmall;
    line-height: $xsmall - 3;
    padding: 0 2px;
  }
  @include when(small) {
    height: $small;
    line-height: $small - 2;
    padding: 0 $small/2;
    font-size: $--font-size-xs;
  }

  @include when(middle) {
    height: $middle;
    line-height: $middle - 2;
    padding: 0 $middle/2;
    font-size: $--font-size-md;
  }
  @include when(large) {
    height: $large;
    line-height: $large - 2;
    padding: 0 $large/2;
    font-size: $--font-size-md;
  }

  @include when(circle) {
    &.is-xsmall {
      border-radius: $xsmall / 2;
    }
    &.is-small {
      border-radius: $small / 2;
    }
    &.is-middle {
      border-radius: $middle / 2;
    }
    &.is-large {
      border-radius: $large / 2;
    }
  }
  @include when(leaf) {
    &.is-xsmall {
      border-radius: $xsmall / 2 0 $xsmall / 2 0;
    }
    &.is-small {
      border-radius: $small / 2 0 $small / 2 0;
    }
    &.is-middle {
      border-radius: $middle / 2 0 $middle / 2 0;
    }
    &.is-large {
      border-radius: $large / 2 0 $large / 2 0;
    }
  }

  // color
  @include when(default) {
    @include tagType(#818181, $--background-color-white, #818181);
  }
  @include when(primary) {
    @include tagType($--color-primary);
  }
  @include when(success) {
    @include tagType($--color-success);
  }
  @include when(success-light) {
    @include tagType($--color-success-light-2);
  }
  @include when(success-light-1) {
    @include tagType($--color-success-light-1);
  }
  @include when(success-light-2) {
    @include tagType($--color-success-light-2);
  }
  @include when(warning) {
    @include tagType($--color-warning);
  }
  @include when(danger) {
    @include tagType($--color-danger);
  }

  @include when(primary-plain) {
    @include tagType($--color-primary, $--color-white, $--color-primary);
  }
  @include when(success-light-plain) {
    @include tagType($--color-success-light-2, $--color-white, $--color-success-light-2);
  }
  @include when(success-light-1-plain) {
    @include tagType($--color-success-light-1, $--color-white, $--color-success-light-1);
  }
  @include when(success-light-2-plain) {
    @include tagType($--color-success-light-2, $--color-white, $--color-success-light-2);
  }
  @include when(success-plain) {
    @include tagType($--color-success, $--color-white, $--color-success);
  }
  @include when(warning-plain) {
    @include tagType($--color-warning, $--color-white, $--color-warning);
  }
  @include when(danger-plain) {
    @include tagType($--color-danger, $--color-white, $--color-danger);
  }
}
</style>
