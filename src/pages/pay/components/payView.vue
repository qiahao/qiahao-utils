<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-14 13:35
* Desc:
*/
-->

<template>
  <div class="ins-payView">
    <div
      class="ins-payView__content"
      v-if="payTypeList.length"
    >
      <slot name="prefix"></slot>
      <slot :pay-type-list="payTypeList">
        <div
          :class="{'is-active': item === currentPayType}"
          :key="i"
          @click="onClickType(item)"
          class="ins-flex is-align-middle ins-payView__typeItem"
          v-for="(item, i) in payTypeList"
        >
          <img
            :alt="item.label"
            :src="item.icon"
          />
          <div class="ins-flex__1 ellipsis">{{item.label}}</div>
          <ins-icon :icon="item === currentPayType ? 'check_circle_fill' : 'circle'"></ins-icon>
        </div>
      </slot>

      <div class="ins-payView__btns">
        <ins-button
          @click="onClickPay"
          circle
          full
          size="large"
          type="success"
        >确认支付</ins-button>
        <ins-button
          @click="onClickCancel"
          circle
          full
          size="large"
          type="success-light-2"
        >取消支付</ins-button>
      </div>
      <!-- slot: suffix -->
    </div>
    <slot name="suffix"></slot>

    <!-- 支付前弹框 -->
    <actionsheetBeforePay
      :data="currentPayType"
      :visible.sync="payActionsheetVisible"
      @cancel="onAsCancel"
      @ok="onAsOk"
    ></actionsheetBeforePay>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';
import { InsIcon, InsButton, InsButtonGroup, InsTag, InsActionsheet } from '@/components';
import { Amorepay } from '@/jsSdk/amorepay/index';
import request from '@/api/utilsNet';
import { alertToast, getPlatform } from '@/utils';
import actionsheetBeforePay from './actionsheetBeforePay.vue';
@Component({
  name: 'payView',
  components: {
    InsIcon,
    InsButton,
    InsButtonGroup,
    InsTag,
    actionsheetBeforePay
  }
})
export default class App extends Vue {

  private amorepay = null;
  private currentPayType = null;
  private payActionsheetVisible = false;

  @Prop({ type: String, required: true }) orderHash: string;
  @Prop({ type: String, required: true }) baseUrl: string;

  get payTypeList() {
    return this.amorepay && this.amorepay.payTypeList ? this.amorepay.payTypeList : [];
  }

  @Watch('payTypeList', { immediate: true })
  payTypeListWatcher(n) {
    if (n && n.length) {
      this.currentPayType = n[0];
    } else {
      this.currentPayType = null;
    }
  }

  // 改变付款方式
  onClickType(item) {
    this.currentPayType = item;
  }

  // 点击立即支付
  onClickPay() {
    if (!this.currentPayType) {
      return alertToast('请选择支付方式');
    }
    this.$emit('click-pay');
    this.payActionsheetVisible = true;
  }
  onClickCancel() {
    this.$emit('click-cancel');
  }
  onAsOk() {
    if (!this.currentPayType) {
      return alertToast('请选择支付方式');
    } else {
      // !!!important
      this.amorepay.payChannel = this.currentPayType.channel;
      this.amorepay.doPay();
    }
  }
  onAsCancel() {}

  created() {
    const platform = getPlatform();
    const _t = this;
    this.amorepay = new Amorepay({
      orderHash: this.orderHash,
      baseUrl: this.baseUrl,
      platform: platform, // 5个： pc 手机 微信内 支付宝内 qq
      // payInfo
      requestPayInfo(url) {
        return request
          .get(url, null, {
            mode: 'cors',
            preHandler(res) {
              return Promise.resolve(res);
            }
          })
          .then(res => {
            // 处理异常情况

            if (res.code !== 'ok') {
              alertToast('支付出错，请重试');
              return Promise.reject(res);
            } else if (res.status === 'paid') {
              _t.$emit('pay-success');
              // alertToast('该订单已支付，请勿重复支付');
              return Promise.reject(res);
            } else {
              return res;
            }
          });
      },
      // chargeInfo
      requestChargeInfo(url, params) {
        return request
          .post(url, params, {
            mode: 'cors',
            preHandler(res) {
              return Promise.resolve(res);
            }
          })
          .then(res => {
            // 处理异常情况
            const { code, paid, detail, errmsg } = res || {};
            if (code !== 1000) {
              alertToast(detail || errmsg || '支付出错，请重试');
              return Promise.reject(res);
            } else {
              if (paid) {
                _t.$emit('pay-success');
                // alertToast('该订单已支付，请勿重复支付');
              }
              return res;
            }
          });
      },
      // query
      requestQuery(url, params) {
        return request
          .post(url, params, {
            mode: 'cors',
            preHandler(res) {
              return Promise.resolve(res);
            }
          })
          .then(res => {
            const { code, paid, detail, errmsg } = res || {};
            if (res.code === 1000) {
              return res;
            } else {
              return Promise.reject(res);
            }
          });
      },
      // 不传，使用默认方式
      // onPay() { },
      // 手机端没有二维码支付
      // onPayQr() { console.log('onPayQr'); },
      // 轮询过程发现支付完成
      onPaySuccess() {
        _t.$emit('pay-success');
      },
      onPayFail() {
        alertToast('支付失败');
        _t.$emit('pay-fail');
      },
      onQueryEnd() {
        alertToast('支付超时，请到订单中心查看支付状态');
        _t.$emit('update-paying', false);
      },
      // 打开新窗口支付时 处理交互
      onOpenPayWindow() {
        _t.$emit('update-paying', true);
      }
    });
  }
  mounted() {}
}
</script>

<style lang="scss">
@include b(payView) {
  padding: 20px 0;
  @include e(content){
    padding-left: 30px;
    padding-right: 30px;
  }
  @include e(typeItem) {
    height: 58px;
    padding: 10px 15px 10px 20px;
    margin-bottom: 12px;
    border: 1px solid $--border-color-base;
    border-radius: 29px;
    background: #fff;
    @include box-shadow1;
    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    .ins-icon {
      font-size: 30px;
      color: $--text-color-secondary;
    }

    @include when(active) {
      .ins-icon {
        color: $--color-success;
      }
    }
  }

  @include e(btns) {
    width: 75%;
    max-width: 375px;
    margin: 40px auto 20px;
    .ins-button {
      margin-bottom: 7px;
    }
  }
}
</style>