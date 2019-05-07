<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-11 11:07
* Desc:
*/
-->

<template>
  <div class="border-bottom">
    <h2>按钮：InsIcon</h2>
    <h3>逻辑图标</h3>
    <div>
      <span class="mr-xl">
        加入购物车:
        <ins-icon-cart :product="product"></ins-icon-cart>
      </span>
      <span class="mr-xl">
        进入购物车:
        <ins-icon-cart></ins-icon-cart>
        <ins-icon-cart show-widget></ins-icon-cart>
      </span>

      <span class="mr-xl">
        加入收藏:
        <ins-icon-like :product="product"></ins-icon-like>
      </span>

      <span class="mr-xl">
        客服:
        <ins-icon-server>
          <div slot="suffix">客服</div>
        </ins-icon-server>
      </span>
    </div>

    <h3>常规图标</h3>
    <div class="clearfix text-center">
      <span
        :key="i"
        class="icon float-left mtb-md"
        style="width: 100px;"
        v-for="(item, i) in icons"
      >
        <ins-icon
          :icon="item.name"
          class="font-size-xxxl"
        ></ins-icon>
        <div>{{item.name}}</div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';
import { InsIcon, InsIconServer, InsIconCart, InsIconLike } from '@/components';
@Component({
  name: 'DevInsIcon',
  components: {
    InsIcon,
    InsIconServer,
    InsIconCart,
    InsIconLike
  }
})
export default class App extends Vue {
  private product = {};
  private icons = [
    { name: 'about_us' },
    { name: 'bank_card' },
    { name: 'wait_2_send' },
    { name: 'train_1' },
    { name: 'message_wait' },
    { name: 'yen' },
    { name: 'favourite_setting' },
    { name: 'location' },
    { name: 'bill' },
    { name: 'myTracks' },
    { name: 'star_nest' },
    { name: 'earphone' },
    { name: 'help_center' },
    { name: 'check_circle' },
    { name: 'setting' },
    { name: 'allOrder_fill' },
    { name: 'profile_fill' },
    { name: 'profile' },
    { name: 'allOrder' },
    { name: 'heart_circle_fill' },
    { name: 'heart_circle' },
    { name: 'upload_img' },
    { name: 'coupon_fill' },
    { name: 'message_fill' },
    { name: 'plus' },
    { name: 'minus' },
    { name: 'innisfree' },
    { name: 'weixin' },
    { name: 'weibo' },
    { name: 'qq' },
    { name: 'coupon_birthday' },
    { name: 'user_center' },
    { name: 'preferential' },
    { name: 'wodeguanzhu' },
    { name: 'gift' },
    { name: 'mall' },
    { name: 'mall_fill' },
    { name: 'message_dashed' },
    { name: 'khouse' },
    { name: 'info' },
    { name: 'up_circle' },
    { name: 'message' },
    { name: 'person_add' },
    { name: 'upload' },
    { name: 'open_image' },
    { name: 'skin_care' },
    { name: 'person_harf_circle' },
    { name: 'new' },
    { name: 'home_fill' },
    { name: 'home' },
    { name: 'file_dashed' },
    { name: 'best_sale' },
    { name: 'earphone_fill' },
    { name: 'protect' },
    { name: 'zhifubao' },
    { name: 'train_fill' },
    { name: 'heart_fill' },
    { name: 'heart' },
    { name: 'start' },
    { name: 'start_fill' },
    { name: 'face' },
    { name: 'point' },
    { name: 'camera' },
    { name: 'tran_2' },
    { name: 'info_circle' },
    { name: 'menu' },
    { name: 'link' },
    { name: 'qrcode' },
    { name: 'vip_fill' },
    { name: 'vip' },
    { name: 'check' },
    { name: 'share' },
    { name: 'three' },
    { name: 'play' },
    { name: 'moneny' },
    { name: 'check_circle_2' },
    { name: 'right_circle' },
    { name: 'left_circle' },
    { name: 'location_2' },
    { name: 'close_circle' },
    { name: 'down_circle' },
    { name: 'search' },
    { name: 'edit' },
    { name: 'cart' },
    { name: 'right' },
    { name: 'left' },
    { name: 'up' },
    { name: 'down' },
    { name: 'person' },
    { name: 'person_fill' },
    { name: 'mall_point' },
    { name: 'coupon_new' },
    { name: 'file' },
    { name: 'lipstick' },
    { name: 'king' },
    { name: 'delete' },
    { name: 'dicover_fill' },
    { name: 'discover' }
  ];
  created() {}
  mounted() {}
}
</script>
