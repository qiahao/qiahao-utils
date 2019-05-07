<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-14 13:35
* Desc:
*/
-->

<template>
  <div class="ins-devPay">
    <h3>devPay</h3>

    <div
      class="ins-devPayContent"
      v-if="payTypelist.length"
    >
      <slot :pay-type-list="payTypelist">
        <div
          :class="{'is-active': item === currentPayType}"
          :key="i"
          @click="onClickType(item)"
          class="ins-flex is-align-middle ins-devPay__typeItem"
          v-for="(item, i) in payTypelist"
        >
          <img
            :alt="item.label"
            :src="item.icon"
          />
          <div class="ins-flex__1 ellipsis">{{item.label}}</div>
          <ins-icon :icon="item === currentPayType ? 'check_circle_fill' : 'circle'"></ins-icon>
        </div>
      </slot>
      <div class="ins-devPay__btns">
        <ins-button
          @click="onClickPay"
          circle
          full
          size="large"
          type="success"
        >立即支付</ins-button>
        <ins-button
          circle
          full
          size="large"
          type="default"
        >取消</ins-button>
      </div>
    </div>

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
  name: 'DevPay',
  components: {
    InsIcon,
    InsButton,
    InsButtonGroup,
    InsTag,
    actionsheetBeforePay
  }
})
export default class App extends Vue {
  private orderseq = '';
  private amorepay = null;
  private currentPayType = null;
  private payActionsheetVisible = false;

  get payTypelist() {
    return this.amorepay && this.amorepay.payTypelist ? this.amorepay.payTypelist : [];
  }

  @Watch('payTypelist', { immediate: true })
  payTypelistWatcher(n) {
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
    this.payActionsheetVisible = true;
  }
  onAsCancel() {
    console.log('onCancel');
  }
  onAsOk() {
    console.log('onClickActionsheetPay');
    // TODO
    if (!this.currentPayType) {
      return alertToast('请选择支付方式');
    } else {
      // !!!important
      this.amorepay.payChannel = this.currentPayType.channel;
      this.amorepay.doPay();
    }
  }

  created() {
    const platform = getPlatform();
    this.amorepay = new Amorepay({
      // TODO: test data
      orderHash: 'e8183b8bea6991037adb80322198da64',
      baseUrl: '',
      // baseUrl: 'https://stgpay.amorepacific.com.cn',
      platform: platform, // 5个： pc 手机 微信内 支付宝内 qq
      // payInfo
      requestPayInfo(url) {
        return request
          .get(url, null, {
            preHandler(res) {
              return Promise.resolve(res);
            }
          })
          .then(res => {
            // 处理异常情况

            if (res.code !== 'ok') {
              alertToast('支付出错，请重试');
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
                alertToast('该订单已支付，请勿重复支付');
              }
              return res;
            }
          });
      },
      requestQuery(url, params) {
        return request
          .post(url, params, {
            preHandler(res) {
              return Promise.resolve(res);
            }
          }).then(res => {
            const { code, paid, detail, errmsg } = res || {};
            if (res.code === 1000) {
              return res;
            } else {
              return Promise.reject(res);
            }
          });
      },
      // 不传，使用默认端方式
      // onPay() { },
      // 手机端没有二维码支付
      // onPayQr() { console.log('onPayQr'); },
      // 轮询过程发现支付完成
      onPaySuccess() { },
      onPayFail() {
        console.log('onPayFail');
      },
      onQueryEnd() {
        alertToast('onQueryEnd');
      },
      // 打开新窗口支付时
      onOpenPayWindow() {

      }
    });
  }
  mounted() {}
}
</script>

<style lang="scss">
@include b(devPay) {
  @include e(typeItem) {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid $--border-color-base;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .ins-icon {
      font-size: 30px;
    }

    @include when(active) {
      .ins-icon {
        color: $--color-success;
      }
    }
  }

  @include e(btns) {
    width: 60%;
    max-width: 375px;
    margin-left: auto;
    margin-right: auto;
    .ins-button {
      margin-bottom: 10px;
    }
  }


}
</style>