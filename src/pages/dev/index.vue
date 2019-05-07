<template>
  <AppPageView
    @click-left="onClickLeft"
    header-fixed
    title="AppTitle"
  >
    <div slot="headerLeft">headerLeft</div>
    <div slot="headerRight">headerRight</div>
    <div class="ins-devPage main-contain">
      <!-- 支付 -->
      <dev-pay></dev-pay>

      <!-- 此处template 标签，用于隐藏其他标签，方便开发 -->
      <template v-if="false">
        <H3>InsCodingIframe</H3>
        <ins-coding-iframe :src="src"></ins-coding-iframe>

        <!-- 按钮 -->
        <dev-ins-button></dev-ins-button>
        <!-- 标题 -->
        <dev-ins-title></dev-ins-title>
        <!-- 图标 -->
        <dev-ins-icon></dev-ins-icon>

        <div class="mg-md">
          <h3>InsNumber</h3>
          <ins-number v-model="insNumber"></ins-number>
          <ins-number v-model="insNumber">
            <div slot="prefix">prefix</div>
            <div slot="suffix">suffix</div>
          </ins-number>
        </div>

        <div class="mg-md">
          <!-- UIFlex -->
          <h3>UIFlex</h3>
          <UIFlex align="center">
            <div>
              <div>aaa</div>
              <div>aaa</div>
              <div>aaa</div>
            </div>
            <UIFlex>
              <div>ddd</div>
              <div>ddd</div>
            </UIFlex>
            <UIFlex>dd</UIFlex>
          </UIFlex>

          <h3>提示框</h3>
          <div>
            <InsButton
              @click="onClickToast"
              class="mr-md"
            >提示信息</InsButton>
            <InsButton @click="onClickConfirm">confirm信息</InsButton>
          </div>
        </div>

        <!-- 产品 -->
        <h3>产品 ItemProduct</h3>
        <div class="ins-productList">
          <item-product
            :is-long="i == 3"
            :key="i"
            :product="item"
            show-cart
            show-like
            v-for="(item, i) in productList"
          />
        </div>
        <h3>活动 ItemActivity</h3>
        <div class="ins-activityList">
          <!-- :activity="item" -->
          <item-activity
            :key="i"
            v-for="(item, i) in 3"
          />
        </div>

        <!-- 猜你喜欢 -->
        <h3>猜你喜欢 InsRecommend</h3>
        <ins-recommend
          :limit="4"
          :list="productList"
          show-cart
          show-like
        ></ins-recommend>
        <!-- swiper -->
        <h3>swiper</h3>
        <bp-swiper class="ins-devPage__swiper">
          <bp-swiper-item
            :key="i"
            v-for="(item, i) in 5"
          >{{i}}</bp-swiper-item>
        </bp-swiper>

        <h3>支付</h3>
        <div>必传参数：baseUrl，orderHash，platform</div>
        <amorepay-view
          :base-url="baseUrl"
          :order-hash="orderHash"
          platform="wap"
        ></amorepay-view>
        <h3>title</h3>
        <ins-title
          sub-title="sub title"
          title="title"
          widget="(2)"
        >
          <div slot="right">more</div>
        </ins-title>

        <h3>未登录遮挡</h3>
        <ins-unlogin v-if="false"></ins-unlogin>

        <h3>bpActionsheet</h3>
        <ins-button @click="onClickOpenActionsheet">OpenActionsheet</ins-button>
        <bp-actionsheet :visible.sync="actionsheetVisible">
          <div class="bp-actionsheet__group">
            <div class="bp-actionsheet__cell">ddd</div>
            <div class="bp-actionsheet__cell">ddd</div>
            <div class="bp-actionsheet__cell">ddd</div>
          </div>
          <div class="bp-actionsheet__group">
            <div class="bp-actionsheet__cellWarn">ddd</div>
          </div>
        </bp-actionsheet>
        <h3>ins-actionsheet</h3>
        <ins-button @click="onClickOpenActionsheet2">OpenActionsheet</ins-button>
        <ins-actionsheet :visible.sync="actionsheetVisible2">
          <div slot="header">header</div>
          <div slot="footer">footer</div>
          <div
            :key="index"
            v-for="(item, index) in 20"
          >{{item}}</div>
        </ins-actionsheet>
      </template>
    </div>
    <AppFooter></AppFooter>
  </AppPageView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  InsIcon,
  InsIconCart,
  InsIconLike,
  InsIconServer,
  InsTitle,
  UIFlex,
  InsButtonGroup,
  InsButton,
  ItemProduct,
  ItemActivity,
  InsRecommend,
  InsActionsheet,
  InsNumber,
  InsCodingIframe,
  InsUnlogin
} from '@/components';
import { appEncrypt, alertToast, alertConfirm } from '@/utils';
import { apiUser, apiProduct, apiCart } from '@/api';

import request from '@/api/utilsNet';
import bpui from 'bpui.js';
import amorepay from 'amorepay';
import { Getter } from 'vuex-class';
import { filterGender } from '@/filters';
import devInsButton from './components/devInsButton.vue';
import devInsIcon from './components/devInsIcon.vue';
import devInsTitle from './components/devInsTitle.vue';
import devPay from './components/devPay/devPay.vue';

// 用户消息
@Component({
  name: 'Dev',
  components: {
    InsIcon,
    InsIconCart,
    InsIconLike,
    InsIconServer,
    InsTitle,
    UIFlex,
    InsButtonGroup,
    InsButton,
    InsRecommend,
    ItemProduct,
    ItemActivity,
    bpSwiper: bpui.bpSwiper,
    bpSwiperItem: bpui.bpSwiperItem,
    bpActionsheet: bpui.bpActionsheet,
    amorepayView: amorepay.Component,
    InsActionsheet,
    InsNumber,
    InsCodingIframe,
    InsUnlogin,

    devInsButton,
    devInsIcon,
    devInsTitle,
    devPay
  },
  filters: {
    filterGender: filterGender,
    filterSex(ipt) {
      return '男';
    }
  }
})
export default class App extends Vue {
  product = {
    prdseq: 1000000361,
    prdName: '橄榄油❗泡沫洁面乳 150ml-洗面奶 洗面乳玫瑰',
    basicDesc: '富含橄榄油成分的深层保湿高保湿泡沫洁面乳',
    salPrice: 55,
    stdPrice: 55,
    smallThumbnails: ['https://newdev.innisfree.cn/upload/product/1000000361_s.png'],
    mediumThumbnails: ['https://newdev.innisfree.cn/upload/product/1000000361_m.png'],
    largeThumbnails: ['https://newdev.innisfree.cn/upload/product/1000000361_l.png'],
    manufactArea: '中国',
    pointRate: 100.0,
    prdType: 'N',
    cate1: 'UB',
    cate1Name: '洁面与卸妆',
    cate2: 'UBAA',
    cate2Name: '洁面',
    stock: -2,
    saleCount: 0,
    saleStatus: '1',
    stkStatus: '1',
    cpnNotAllowed: 'N',
    skus: [
      {
        skucd: '290081139',
        name: '悦诗风吟橄榄油泡沫洁面乳 150ml',
        stdPrice: 55,
        salPrice: 55,
        stock: -2,
        stkStatus: '1',
        quantity: 1
      }
    ]
  };
  productList = new Array(5).fill(1).map(() => this.product); // 产品列表

  // 支付数据
  orderHash = '22443fbb338f4e2f3fd2965e58fd9533';
  baseUrl = window.location.origin;
  src = '';
  // insNumer
  private insNumber = 0;

  // actionsheetVisible
  actionsheetVisible = false;
  actionsheetVisible2 = false;
  @Getter('userInfo') userInfo;
  // get userInfo () {
  //   return this.$store.getters.userInfo;
  // }
  onClickLeft() {
    console.log('onClickLeft');
  }

  // 加入购物车成功
  onAddCartSuccess() {
    console.log('onAddCartSuccess');
  }
  // 收藏成功
  onLikeSuccess() {
    console.log('onLikeSuccess');
  }

  // 显示提示信息
  onClickToast() {
    alertToast('提示信息');
  }
  // 显示Confirm信息
  onClickConfirm() {
    alertConfirm({
      title: '提示信息',
      content: 'dd',
      confirm() {
        console.log('confirm');
      },
      cancel() {
        console.log('cancel');
      }
    })
      .then(() => {
        console.log('点击确认');
      })
      .catch(() => {
        console.log('点击取消');
      });
  }

  onClickOpenActionsheet() {
    this.actionsheetVisible = !this.actionsheetVisible;
  }
  onClickOpenActionsheet2() {
    this.actionsheetVisible2 = !this.actionsheetVisible2;
  }
  // 加密方法
  encrypt() {
    const password = appEncrypt('ins123456');
    console.log(password);
  }
  login() {
    const params = {
      account: 'qiahao',
      password: appEncrypt('ins123456') // 'Ok3u4Ey+5gpxHpeiCAVBCw=='
    };
    apiUser
      .login(params)
      .then(res => {
        console.log('login success', res);
      })
      .catch(e => {
        console.log('login faild', e);
      });
  }
  getUserInfo() {
    apiUser
      .getUserInfo({
        preHandler(res) {
          // 预处理response结果，非必须
          // 返回结果为Promise，则使用Promise作为结果
          // 返回结果不是Promise，则使用内置的handleResponse处理结果
          // 常用于需要使code !== 1000 返回resolve状态，或需要改变错误处理结果时
          if (res.code === 500) {
            return Promise.resolve(res);
          }
        }
      })
      .then(res => {
        console.log('getUserInfo success', res);
      })
      .catch(res => {
        console.log('getUserInfo fail', res);
      });
  }

  getProductList() {
    apiProduct.getList({ paged: 1, pageSize: 20 });
  }
  getTest() {
    // const url = 'api/query/activity/search';
    const url = '/api/query/stores';
    // const params = { paged: 1, pageSize: 15, activityState: 'Y' };
    const params = {
      longitude: 121.43776,
      latitude: 31.19499
    };
    request.get(url, params).then(res => {
      console.log(url, res);
    });
  }

  // 添加购物车
  addCart() {
    const params = {
      data: [
        {
          prdseq: 'dddd',
          skucd: 'dddd',
          prdType: 'dddd',
          quantity: 12
        }
      ]
    };
    apiCart
      .addCart(params)
      .then(res => {
        console.log('addCart fail', res);
      })
      .catch(res => {
        console.log('addCart fail', res);
      });
  }

  created() {
    // this.encrypt();
  }
  mounted() {
    // this.login();
    // this.getUserInfo();
    this.getTest();
    // this.addCart();
    // this.onClickConfirm;
    // this.$store.dispatch('app/appUpdateUserInfo');
    // console.log('userInfo', this.userInfo);
    // 测试跨域
    setTimeout(() => {
      this.src = '/coding_iframe_demo.html';
      // this.src = 'http://localhost:8084/coding_iframe_demo.html';
    }, 1110);
  }
}
</script>

<style lang="scss" scoped>
@include b(devPage) {
  h3 {
    font-family: SourceHanSansCN;
    font-weight: 500;
    margin: $--margin-md 0;
    border-bottom: 1px solid $--border-color-base;
  }
  @include e(header) {
  }
  @include e(productList) {
    padding: $--padding-sm;
  }
}

@include b(devPage__swiper) {
  width: 100%;
  height: 1rem;
}
</style>