<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-11 10:44
* Desc:
*/
-->

<template>
  <div class="border-bottom">
    <h2>按钮: InsButton</h2>
    <!-- type -->
    <h3>按钮: type circle size</h3>
    <div>
      <ins-button type="default">default</ins-button>
      <ins-button type="primary">primary</ins-button>
      <ins-button type="success">success</ins-button>
      <ins-button type="success-light-1">success-light-1</ins-button>
      <ins-button type="success-light-2">success-light-2</ins-button>
      <ins-button type="warning">warning</ins-button>
      <ins-button type="danger">danger</ins-button>
      <br />
      <ins-button type="primary-plain">primary-plain</ins-button>
      <ins-button type="success-plain">success-plain</ins-button>
      <ins-button type="success-light-1-plain">success-light-1-plain</ins-button>
      <ins-button type="success-light-2-plain">success-light-2-plain</ins-button>
      <ins-button type="warning-plain">warning-plain</ins-button>
      <ins-button type="danger-plain">danger-plain</ins-button>
    </div>
    <!-- circle size -->
    <div>
      <ins-button
        circle
        type="success"
      >circle</ins-button>
      <ins-button
        circle
        type="success-light-1"
      >circle</ins-button>
      <ins-button
        circle
        type="success-light-2"
      >circle</ins-button>
      <ins-button
        size="small"
        type="success"
      >small</ins-button>
      <ins-button
        size="middle"
        type="success-light-1"
      >middle</ins-button>
      <ins-button
        size="large"
        type="success-light-2"
      >large</ins-button>
    </div>

    <!-- <H3>按钮组： InsButtonGroup</H3> -->
    <H3>按钮组： InsButtonGroup</H3>
    <ins-button-group
      class="mtb-md"
      style="width: 220px"
    >
      <ins-button type="success-light-1">加入购物车</ins-button>
      <ins-button type="success">立即购买</ins-button>
    </ins-button-group>
    <ins-button-group
      circle
      class="mtb-md"
      style="width: 220px"
    >
      <ins-button type="success-light-1">加入购物车</ins-button>
      <ins-button type="success">立即购买</ins-button>
    </ins-button-group>
    <ins-button-group
      circle
      class="mtb-md"
      style="width: 220px"
    >
      <ins-button
        size="large"
        type="success"
      >加入购物车</ins-button>
      <ins-button
        size="large"
        type="success-light-1"
      >加入收藏</ins-button>
      <ins-button
        size="large"
        type="success"
      >立即购买</ins-button>
    </ins-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';
import { InsIcon, InsButtonGroup, InsButton } from '@/components';

@Component({
  name: 'DevInsButton',
  components: {
    InsIcon,
    InsButtonGroup,
    InsButton
  }
})
export default class App extends Vue {
  created() {}
  mounted() {}
}
</script>
