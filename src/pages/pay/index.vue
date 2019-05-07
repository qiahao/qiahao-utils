<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-07 18:31
* Desc:
*/
-->

<template>
  <AppPageView
    class="ins-pay"
    header-fixed
    title="支付"
  >
    <div>
      <template v-if="!isPaySuccess">
        <!-- payView -->
        <transition name="fade">
          <pay-view
            :base-url="baseUrl"
            :order-hash="orderHash"
            @click-cancel="onClickCancel"
            @pay-fail="onPayFail"
            @pay-success="onPaySuccess"
            @update-paying="onUpdatePaying"
            class="ins-pay__payView"
            v-if="!!orderHash"
            v-show="!isPaying"
          >
            <div
              class="ins-pay__status is-fail"
              slot="prefix"
            >
              <div
                class="ins-pay__fail"
                v-if="isPayFail"
              >
                <ins-icon
                  class="statusIconLarge"
                  icon="close_circle_2"
                ></ins-icon>
                <div class="statusTitle">支付失败</div>
                <div class="statusToast">支付遇到问题，请重新支付</div>
              </div>
              <div
                class="statusToast mb-lg"
                v-else
              >
                <ins-icon icon="time" />支付剩余时间 15:00
              </div>
            </div>

            <div
              class="ins-pay__status is-fail"
              slot="suffix"
              v-if="isPayFail"
            >
              <div class="statusToast">
                <span class="font-size-10">已支付成功？可能因为网络延迟未收到结果，请耐心等待</span>
              </div>
              <span
                @click="onClick2OrderList"
                class="font-size-xs color-success-light-1"
              >查看订单></span>
              <div class></div>
            </div>
          </pay-view>
        </transition>

        <!-- 支付中 -->
        <transition name="fade">
          <div
            class="ins-pay__paying"
            v-show="isPaying"
          >
            <img src="~@/assets/image/utils/pay_loading.png" />
            <div>支付中确认中...</div>
          </div>
        </transition>

        <!-- 无效的订单信息 -->
        <transition name="fade">
          <div
            class="ins-pay__invalidate text-center"
            v-if="invalidate"
          >
            <div class="ptb-xxl text-center">无效的订单信息</div>
          </div>
        </transition>
      </template>

      <template v-if="isPaySuccess">
        <div class="ins-pay__status is-success">
          <ins-icon
            class="statusIconLarge"
            icon="check_circle_2"
          ></ins-icon>
          <div class="statusTitle">支付成功</div>
          <div class="statusToast">我们将尽快为您发货</div>

          <ins-button
            @click="onClick2OrderList"
            circle
            size="large"
            type="success"
          >查看订单</ins-button>
          <ins-button
            @click="onClick2ProductList"
            circle
            size="large"
            type="success-light-2"
          >继续逛逛</ins-button>
        </div>
      </template>
    </div>
  </AppPageView>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';

import { alertToast } from '@/utils';
import { apiPay } from '@/api';
import payView from './components/payView.vue';
import { InsIcon, InsButton } from '@/components';
import { PATH_ORDER_LIST, PATH_PRODUCTS, PATH_USER_CENTER } from '../../router';
import * as febs from 'febs';
import { APP_PAY_BASEURL } from '@/config';

@Component({
  name: 'Pay',
  components: {
    payView,
    InsIcon,
    InsButton
  }
})
export default class App extends Vue {
  private orderInfo = null;
  private orderHash = '';
  private baseUrl = APP_PAY_BASEURL;
  private invalidate = false; // 无效到订单标示
  private isPaying = false; // 是否正在支付中，用于显示支付loading
  private isPayFail = false; // 是否支付失败
  private isPaySuccess = false; // 是否支付成功，用于显示成功组件

  get orderseq() {
    return this.$route.query.orderseq;
  }

  get type() {
    // 1: 正常销售产品支付; 2: 支付预售定金; 3: 支付预售尾款; 4: 支付预售尾款合并;
    return this.$route.query.type || '1';
  }
  // onClickPay() { }
  onClickCancel() {
    try {
      this.$router.back();
    } catch (e) {
      // 回退失败，跳到用户中心
      this.$router.replace({
        path: PATH_USER_CENTER
      });
    }
  }

  onPaySuccess() {
    this.isPaySuccess = true;
    this.isPayFail = false;
    this.isPaying = false;
  }
  onPayFail() {
    this.isPaySuccess = false;
    this.isPayFail = true;
    this.isPaying = false;
  }
  onUpdatePaying(flag) {
    this.isPaying = flag;
    if (!flag) {
      this.isPaySuccess = false;
      this.isPayFail = true;
    }
  }

  onClick2OrderList() {
    this.$router.push({
      path: PATH_ORDER_LIST,
      query: {
        status: ''
      }
    });
  }
  onClick2ProductList() {
    this.$router.push({
      path: PATH_PRODUCTS
    });
  }

  getOrderPayInfo() {
    apiPay.getOrderPayInfo(this.orderseq, this.type).then(res => {
      const { status } = res || {};
      // 支付成功
      if (status === 'PAID') {
        this.isPaySuccess = true;
      } else {
        this.orderInfo = res;
        this.orderHash = res.hash;
      }
    });
  }

  created() {
    if (!this.orderseq) {
      alertToast('无效的订单信息');

      this.invalidate = true;
      return;
    }

    this.getOrderPayInfo();
  }
  mounted() {}
}
</script>

<style lang="scss">
@keyframes payLoadingRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@include b(pay) {
  background: rgba(209, 208, 206, 0.15);
  @include e(status) {
    text-align: center;

    @include when(fail) {
      margin-bottom: 10px;
      .ins-icon.statusIconLarge,
      .statusTitle {
        color: #ddc172;
      }
    }
    @include when(success) {
      padding: 80px 30px 20px;
      .ins-icon.statusIconLarge,
      .statusTitle {
        color: $--color-success;
      }

      .ins-button {
        display: block;
        width: 75%;
        margin: 10px auto;
        &:first-of-type {
          margin-top: 80px;
        }
      }
    }
    .statusTitle {
      font-size: 20px;
    }
    .statusToast {
      color: $--text-color-secondary;
      font-size: 13px;
    }
    .ins-icon.statusIconLarge {
      font-size: 110px;
      line-height: 1;
      vertical-align: middle;
    }
  }
  @include e(payView) {
    position: relative;
    z-index: 1;
  }
  @include e(paid) {
    padding: 100px 20px 80px;
    color: $--text-color-secondary;
    text-align: center;
  }
  @include e(paying) {
    position: relative;
    z-index: 2;
    padding-top: 100px;
    padding-bottom: 80px;
    color: $--text-color-secondary;
    font-size: 13px;
    text-align: center;
    img {
      display: block;
      width: 86px;
      height: 86px;
      margin: 30px auto;
      transform: rotate(0deg);
      animation: payLoadingRotate 1.2s infinite linear;
    }
  }
}
</style>