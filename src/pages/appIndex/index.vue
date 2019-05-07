<template>
  <div class="ins-appIndex">
    <div class="ins-appIndex__page">
      <div class="ins-appIndex__top">
        <div class="ins-appIndex__ImgList">
          <bp-swiper :options="optionsOne">
            <bp-swiper-item
              :key="i"
              style="margin-right:0px !important;"
              v-for="(item,i) in bannerList"
            >
              <img
                :src="item.imgName"
                :usemap="item.name"
                @click="onBannerJump(item.htmlMap)"
                alt
                onerror="this.src='/mobilestatic/images/mxlImg/bg.png';this.onerror=null"
              />
              <!-- <div v-html="item.htmlMap"></div> -->
            </bp-swiper-item>
          </bp-swiper>
          <div class="ins-appIndex-swiper__paginationOne bp-swiperPagination paginationOne"></div>
        </div>
        <div class="ins-appIndex__topInfo">
          <div class="ins-appIndex__log">
            <img
              alt="innisfree"
              class="ins-appIndex__logoImg"
              src="@/assets/image/logg_white.png"
            />
            <i style="letter-spacing:2px">欢迎来到悦诗风吟</i>
          </div>
          <div class="ins-appIndex__userInfo flex_c">
            <div
              class="ins-appIndex__login flex_r_n"
              v-if="userInfo"
            >
              <img
                :src="getAvatorUrl()"
                @click.self="$router.push('/userCenter')"
                alt
              />
              <span class="nickname">{{ userInfo.nickname}}</span>
              <span class="flex1"></span>
              <div class="detail">
                <div style="display:flex;align-items:center">
                  <span class="integral">积分</span>
                  <span class="line"></span>
                  <span class="count">{{userInfo.remainPoint}}</span>
                </div>
                <div style="display:flex;align-items:center">
                  <span style="margin-right:2vw">优惠券</span>
                  <insIcon
                    icon="right_light"
                    style="font-size:6px"
                  ></insIcon>
                  <span class="couponNum">{{ userInfo.couponNum }}</span>
                </div>
              </div>
              <div class="cart">
                <ins-icon-cart :showWidget="true"></ins-icon-cart>
              </div>
            </div>
            <div
              class="ins-appIndex__loginNo clearfix"
              style=" width: 91.2vw;"
              v-else
            >
              <div class="avant float-left">
                <img
                  alt
                  src="@/assets/image/unLogin.png"
                />
              </div>
              <div class="ins-appIndex__set float-left">
                <span>悦诗风吟</span>
                <span
                  @click="$router.push('/register')"
                  class="set"
                >会员招募中</span>
              </div>
              <div
                @click="$router.push('/login')"
                class="ins-appIndex__goLogin float-right"
                style="padding-right:10px"
              >已有会员？ 去登陆</div>
            </div>
          </div>
          <div
            @click="shopList"
            class="ins-appIndex__position"
          >
            <div class="ins-appIndex__positionIcon">
              <ins-icon icon="location_2"></ins-icon>
            </div>
            <!-- <div
              class="ins-appIndex__positionDes"
              v-if="userInfo"
            >{{userInfo.storeObject.shopName}}</div>-->
            <div
              class="ins-appIndex__positionDes ins-appIndex__top_i"
              style="color:#fff"
            >{{shopName?shopName:'附近暂无门店'}}</div>
          </div>
          <UIFlex
            @click.native="$router.push('/search')"
            align-items="center"
            class="ins-appIndex__search"
          >
            <ins-icon icon="search"></ins-icon>
            <div class="line"></div>
            <div class="ins-appIndex__keyword">{{defaultKeyword}}</div>
          </UIFlex>
        </div>
      </div>
      <!-- 新品上市 -->
      <div class="ins-appIndex__newProducts">
        <div class="ins-appIndex__newProducts--title ins-appIndex__title">
          <div class="flex_r_n">
            <span class="mTitle">新品上市</span>
            <p
              @click="$router.push('/products')"
              class="sTitle flex_r_n"
              style="height:100%;margin-bottom: -6px;"
            >
              NEW ARRIVALS
              <ins-icon
                class="ins-appIndex__rightCircle"
                icon="right_circle"
              />
            </p>
          </div>
        </div>
        <div class="ins-appIndex__newProductsList">
          <bp-swiper
            :options="optionsTow"
            class="ins-appIndex__newProducts--swiper"
          >
            <bp-swiper-item
              :key="i"
              class="ins-appIndex__newProducts--swiperItem"
              v-for="(item,i) in newProductList"
            >
              <div
                @click="goProductDetail(item)"
                class="ins-appIndex__newProductsList--Item"
              >
                <div class="bigImg">
                  <img
                    :src="item.mBgImageUrl"
                    alt
                    onerror="this.src='/mobilestatic/images/mxlImg/bb.png';this.onerror=null"
                  />
                </div>
                <div class="smallImg">
                  <img
                    :src="item.mProImageUrl"
                    alt
                  />
                </div>
              </div>
            </bp-swiper-item>
          </bp-swiper>
          <div class="ins-appIndex-swiper__paginationTwo bp-swiperPagination paginationTwo"></div>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="ins-appIndex__guessLove">
        <div class="ins-appIndex__guessLove--title ins-appIndex__title">
          <div class="flex_r_n">
            <span class="mTitle">猜你喜欢</span>
            <p
              class="sTitle flex_r_n"
              style="height:100%;margin-bottom: -6px;"
            >
              RECOMMANDED FOR YOU
              <ins-icon
                class="ins-appIndex__rightCircle"
                icon="right_circle"
              />
            </p>
          </div>
        </div>
        <div class="ins-appIndex__guessLove--List clearfix">
          <InsRecommend
            :list="recommendList"
            :show-title="false"
            class="ins-appIndex__recommend"
            is-swiper
            show-cart
            show-long
            type="2"
          ></InsRecommend>
        </div>
      </div>
      <!-- 种草推荐 -->
      <div
        class="ins-appIndex__plantGrass"
        v-if="articleList.length>0"
      >
        <div class="ins-appIndex__plantGrass--title ins-appIndex__title">
          <div class="flex_r_n">
            <span
              class="mTitle"
              style="flex-shrink: 0;"
            >种草推荐</span>
            <p
              @click="$router.push('/playGreen')"
              class="sTitle flex_r_n"
              style="height:100%;margin-bottom: -6px; flex-shrink: 0;"
            >
              KOLS PICKS
              <ins-icon
                class="ins-appIndex__rightCircle"
                icon="right_circle"
              />
            </p>
          </div>
        </div>
        <div class="ins-appIndex__plantGrass--list">
          <bp-swiper :options="optionsThree">
            <bp-swiper-item
              :key="i"
              class="ins-appIndex__plantGrass--swiperItem"
              v-for="(item,i) in articleList"
            >
              <div
                @click="goPlantDetail(item)"
                class="ins-appIndex__plantGrass--Item"
              >
                <div class="ins-appIndex__plantGrass--ListInfo">
                  <div class="ins-appIndex__plantGrass--ItemImg">
                    <img
                      :src="item.coverUrl"
                      alt
                    />
                  </div>
                  <div class="ins-appIndex__plantGrass--ItemInfo">
                    <div
                      class="title"
                      style="font-weight:400;letter-spacing:1px"
                    >{{item.title}}</div>
                    <div class="infoDetail">
                      <img
                        :src="item.avatarUrl"
                        alt
                      />
                      <span class="nickName">{{ item.nickname }}</span>
                      <div
                        class="float-right"
                        style="margin-right:4vw;"
                      >
                        <ins-icon
                          icon="heart"
                          style="font-size:19px;color:#fff;vertical-align:middle"
                        ></ins-icon>
                        <span class="count">{{ item.starCount }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </bp-swiper-item>
          </bp-swiper>
          <div class="ins-appIndex-swiper__paginationThree bp-swiperPagination paginationThree"></div>
        </div>
      </div>
      <!-- 热门活动 -->
      <div
        class="ins-appIndex__hotActivities"
        v-if="activityList.length>0"
      >
        <div class="ins-appIndex__hotActivities--top ins-appIndex__title">
          <div class="flex_r_n">
            <span class="mTitle">热门活动</span>
            <p
              class="sTitle flex_r_n"
              style="height:100%;margin-bottom: -6px;"
            >
              POPULAR EVENTS
              <ins-icon
                class="ins-appIndex__rightCircle"
                icon="right_circle"
              />
            </p>
          </div>
        </div>
        <div class="ins-appIndex__hotActivities--List">
          <div
            :key="item.activityseq"
            @click="goActivityDetail(item)"
            class="ins-appIndex__hotActivities--ListItem"
            v-for="item in activityList"
          >
            <div class="ins-appIndex__hotActivities--ItemImg">
              <img :src="item.mobileBanner" />
            </div>
            <div class="ins-appIndex__hotActivities--ItemInfo">
              <div
                class="title"
                style="font-weight:500;"
              >
                {{ item.title }}
                <ins-icon icon="right" />
              </div>
              <div class="tag inns-tag1">HOT ACTIVITY</div>
              <!-- <div class="tag">{{ item.subTitle }}</div> -->
            </div>
          </div>
        </div>
        <div class="text-center">
          <ins-tag
            @click.native="$router.push('/activities')"
            circle
            class="more"
            size="small"
            type="default"
          >
            更多活动
            <ins-icon
              class="more-i"
              icon="right"
            />
          </ins-tag>
        </div>
      </div>
      <!-- 韩国馆 -->
      <div
        class="ins-appIndex__koreaHouse"
        v-if="isKorea"
      >
        <div class="ins-appIndex__koreaHouse--top ins-appIndex__title">
          <div class="flex_r_n">
            <span
              @click="$router.push('/products')"
              class="mTitle"
            >韩国馆</span>
            <p
              class="sTitle flex_r_n"
              style="height:100%;margin-bottom: -6px;"
            >
              <span>KOREAN SHOPS</span>
              <ins-icon
                class="ins-appIndex__rightCircle"
                icon="right_circle"
              />
            </p>
          </div>
        </div>
        <div class="list">
          <img
            :src="koreaInfo.pictureUrl"
            :usemap="koreaInfo.name"
          />
          <div v-html="koreaInfo.htmlMap"></div>
        </div>

        <!-- 更多按钮 -->
        <div class="text-center mtb-lg">
          <ins-tag
            @click.native="$router.push('/products')"
            circle
            class="more"
            size="small"
            type="default"
          >
            更多
            <ins-icon
              class="more-i"
              icon="right"
            />
          </ins-tag>
        </div>
      </div>
    </div>
    <Map
      class="ins-appIndex__map"
      v-on:mapCenter="mapInfo"
    ></Map>
    <div
      @click="onBackTop"
      class="ins-appIndex__cornerMark is-scrollTop"
    >
      <InsIcon
        class="ins-appIndex__cornerMarkIcon"
        icon="scroll_top"
      />
    </div>

    <div class="ins-appIndex__cornerMark is-customer">
      <ins-icon-server class="ins-appIndex__serverLink" />
      <InsIcon
        class="ins-appIndex__cornerMarkIcon"
        icon="service"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { apiProduct, apiActivity, apiStore } from '@/api';
import {
  ItemProduct,
  InsIconLike,
  InsRecommend,
  InsIconCart,
  InsButton,
  UIFlex,
  InsTag,
  InsIcon,
  InsIconServer
} from '@/components';
import bpui from 'bpui.js';
import { Getter } from 'vuex-class';
import { Map } from '../userAddress/components/index';
import defaultImg from '~@/assets/image/user.png';
import { getPathAndParams } from '@/utils';
// 首页
@Component({
  name: 'appIndex',
  components: {
    ItemProduct,
    InsRecommend,
    InsButton,
    bpInput: bpui.bpInput,
    InsIconLike,
    InsIconCart,
    InsTag,
    UIFlex,
    InsIcon,
    InsIconServer,
    bpSwiper: bpui.bpSwiper,
    bpSwiperItem: bpui.bpSwiperItem,
    Map
  }
})
export default class App extends Vue {
  private activityList = []; // 活动列表
  private newProductList = []; // 新产品列表
  private recommendList = []; // 推荐列表
  private articleList = []; // 种草文章列表
  private bannerList = []; // 首推产品列表
  private isKorea = false; // 是否显示韩国馆
  private koreaInfo: any = {}; // 韩国馆信息
  private lng: any = ''; // 地图精度
  private lat: any = ''; // 地图纬度
  private shopName: any = ''; // 门店名称
  private screenData: any = {}; // 开屏数据
  // private defaultImg = 'require("@/assets/image/user.png")';
  private scrollTimer = null;
  private optionsOne = {
    pagination: {
      el: '.ins-appIndex-swiper__paginationOne',
      clickable: true
    },
    spaceBetween: 30,
    loop: true,
    autoplay: true,
    loopAdditionalSlides: 1
  };

  private optionsTow = {
    // slidesPerView: 'auto',
    // spaceBetween: 30,
    pagination: {
      el: '.ins-appIndex-swiper__paginationTwo'
    },
    loop: true,
    loopAdditionalSlides: 1
  };

  private optionsThree = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    pagination: {
      el: '.ins-appIndex-swiper__paginationThree'
    }
  };

  // 获取用户信息
  @Getter('userInfo') userInfo;
  @Getter('hotKeywordList') hotKeywordList;
  get defaultKeyword() {
    return (this.hotKeywordList.length && this.hotKeywordList[0]) || '白牡丹精华';
  }
  // 首页banner
  async getBannerList() {
    var params = {
      paged: 1,
      pageSize: 5,
      position: 'M1'
    };
    var res = await apiProduct.getBanner(params);
    this.bannerList = res.list;
    if (this.bannerList.length > 0) {
      this.bannerList.forEach(item => {
        if (item.htmlMap) {
          let reg = item.htmlMap.match(/name=".*?"/gi);
          reg = reg && reg[0];
          reg = reg && reg.split('"');
          item.name = reg ? reg[1] : null;
        }
        // item.name = item.htmlMap.match(/name=".*?"/gi)[0].split('"')[1];
      });
    }
  }

  // 新品上市列表
  async getProductNew() {
    var params = {
      paged: 1,
      pageSize: 5
    };
    var res = await apiProduct.getNewList(params);
    this.newProductList = res.list;
  }

  // 推荐产品列表/猜你喜欢
  async getProductRecommend() {
    var params = {
      paged: 1,
      pageSize: 20
    };
    var res = await apiProduct.getRecommendList(params);
    this.recommendList = res.list;
  }

  // 热门活动列表
  async getActivityList() {
    var params = {
      paged: 1,
      pageSize: 2,
      activityState: 'Y'
    };
    var res = await apiActivity.activitylist(params);
    this.activityList = res.list;
  }

  // 种草推荐
  async getArtclesList() {
    var params = { paged: 1, pageSize: 5, type: 3 };
    var res = await apiProduct.getArticlesList(params);
    this.articleList = res.list;
    console.log(this.userInfo);
  }

  getAvatorUrl() {
    return `/api/user/avatar/${this.userInfo.cstmno}`;
  }
  // 韩国馆
  async getKoreaList() {
    var res = await apiProduct.getKorea();
    if (res.pictureUrl) {
      this.isKorea = true;
      this.koreaInfo = res;
      this.koreaInfo.name = res.htmlMap.match(/name=".*?"/gi)[0].split('"')[1];
    } else {
      this.isKorea = false;
    }
  }

  // 去活动详情页
  goActivityDetail(val) {
    if (val.activityClass == 'ONLINE') {
      this.$router.push({
        path: '/activities/detail',
        query: { seq: val.activityseq, state: 'Y' }
      });
    } else {
      this.$router.push({
        path: '/activities/applyDetail',
        query: { seq: val.activityseq, state: 'Y' }
      });
    }
  }

  // 去种草详情页
  goPlantDetail(val) {
    this.$router.push({
      path: '/playGreen/detail',
      query: { id: val.id }
    });
  }

  // 去商品详情页
  goProductDetail(val) {
    this.$router.push({
      path: '/product/detail',
      query: { prdseq: val.prdseq }
    });
  }

  // 地图经纬度 门店名称
  async mapInfo(result) {
    this.lng = result.position.lng;
    this.lat = result.position.lat;
    let params = {
      longitude: this.lng,
      latitude: this.lat,
      distance: '10000'
    };
    let res = await apiStore.searchStore(params);
    this.shopName = res.list && res.list[0] ? res.list[0].shopName : '';
  }
  update() {
    this.shopName = this.$route.query.shopName;
    console.log(this.$route.query);
  }
  // 门店列表页面
  shopList() {
    this.$router.push('/shop');
  }
  // 回到顶部
  onBackTop() {
    this.scrollTimer = setInterval(() => {
      window.scrollBy({ top: -300 });
      if (document.body.scrollTop + document.documentElement.scrollTop <= 0) {
        clearInterval(this.scrollTimer);
      }
    }, 50);
  }
  onBannerJump(url) {
    if (!url) {
      return;
    }
    let _obj = getPathAndParams(url);
    this.$router.push(_obj);
  }
  created() {
    console.log(this.userInfo, '用户信息');
    this.getProductNew();
    this.getProductRecommend();
    this.getActivityList();
    this.getArtclesList();
    this.getBannerList();
    this.getKoreaList();
  }
  destroyed() {
    clearInterval(this.scrollTimer);
  }
}
</script>

<style lang="scss">
@include b(appIndex) {
  padding-bottom: 60px;
  .swiper-pagination-bullet {
    opacity: 1;
  }
  .more-button {
    border-color: #dcdcdc;
    color: #898587;
    padding-right: 5px;
    font-size: 12px;
    font-weight: 300;
    i {
      color: #cccccc;
    }
  }

  @include e(page) {
    position: relative;
    z-index: 1;
  }
  @include e(top) {
    font-size: 12px;
    color: #fff;
    position: relative;
  }
  @include e(ImgList) {
    width: 100%;
    min-height: 600px;
    position: relative;
    img {
      width: 100%;
      border-radius: 0 0 11vw 11vw;
    }
    .paginationOne {
      position: absolute;
      right: 6vw;
      bottom: 17px;
      z-index: 10;
    }
  }
  @include e(topInfo) {
    position: absolute;
    top: 4vw;
    left: 9vw;
    z-index: 10;
  }
  @include e(log) {
    margin-left: 9vw;
  }
  @include e(logoImg) {
    width: 35.1vw;
    height: 6.6vw;
    margin-right: 4vw;
  }
  @include e(userInfo) {
    // .ins-iconCart__widget {
    //   top: -15px;
    // }
    width: 91.2vw;
    height: 73px;
    // background-color: #fff;
    background-color: rgba(255, 255, 255, 0.7);

    border-radius: 60px 0 0 60px;
    margin-top: 9px;
  }
  @include e(login) {
    height: 100%;
    width: 91.2vw;
    padding-left: 7px;
    padding-right: 5vw;
    position: relative;
    img {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 3vw;
    }
    .nickname {
      width: 27vw;
      vertical-align: middle;
      color: #898587;
      font-size: 12px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .detail {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6vw;
      color: #898587;
      width: 20vw;
      .integral {
        display: inline-block;
        width: 9px;
        font-size: 9px;
        color: #004438;
        line-height: 10px;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 14px;
        margin-top: 3px;
        background-color: #004438;
        margin-right: 4px;
        margin-left: 6px;
      }
      .count {
        font-size: 23px;
        color: #004438;
        font-weight: 500;
        line-height: 27px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
      }
      .couponNum {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
        font-size: 13px;
        display: inline-block;
      }
    }
    .cart {
      float: right;
      .ins-icon {
        font-size: 27px;
        color: #898587;
      }
    }
  }
  @include e(loginNo) {
    padding: 7px;
    .avant {
      width: 62px;
      height: 62px;
      margin-right: 3vw;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  @include e(set) {
    margin-top: 24px;
    span {
      font-size: 12px;
      color: #898587;
    }
    .set {
      color: #024137;
      font-weight: 500;
    }
  }
  @include e(goLogin) {
    margin-top: 24px;
  }
  @include e(position) {
    padding-top: 10px;
    padding-left: 31px;
    margin-bottom: 3px;
  }
  @include e(positionIcon) {
    float: left;
    margin-right: 2.6vw;
    color: #fff;
    i {
      line-height: 1;
      font-size: 16px;
    }
  }
  @include e(positionDes) {
    font-size: 12px;
  }
  @include e(search) {
    position: absolute;
    left: -9vw;
    background-color: rgba(255, 255, 255, 0.23);
    border-radius: 0 15px 15px 0;
    width: 92.1vw;
    height: 32px;
    padding-left: 17.8vw;
    color: #898587;
    .icon-search {
      font-size: 16px;
    }
    .line {
      width: 1px;
      height: 15px;
      background-color: #898587;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  @include e(keyword) {
    font-size: 16px;
    font-weight: 300;
  }
  @include e(newProducts) {
    position: relative;
    padding-top: 72px;
    margin-top: 36px;
    margin-left: 7vw;
    @include m(title) {
      position: absolute;
      top: 0;
      left: 0;
      width: 77vw;
      height: 100%;
      border-radius: 11vw;
      padding: 26px 0 0 7vw;
      background: rgba(2, 65, 55, 1);
    }
    @include m(swiper) {
      width: 80vw;
    }
    @include m(swiperItem) {
      padding-right: 3vw;
    }
  }
  @include e(newProductsList) {
    width: 80vw;
    .swiper-slide-active {
      .ins-appIndex__newProductsList--Item {
        transform: scale(1);
      }
    }
    .ins-appIndex__newProductsList--Item {
      transition: all 0.3s;
      transform: scale(0.85);
    }
    // .swiper-slide-next {
    //   .ins-appIndex__newProductsList--Item {
    //     transform: scale(0.8);
    //   }
    // }
    .swiper-container {
      overflow: visible;
    }
    .paginationTwo {
      position: absolute;
      bottom: 3.6vw;
      right: 30vw;
      z-index: 10;
    }
    @include m(Item) {
      position: relative;
      .bigImg {
        width: 77vw;
        height: 95vw;
        img {
          width: 100%;
          height: 100%;
          border-radius: 11vw;
        }
      }
      .smallImg {
        width: 68vw;
        height: 65vw;
        background-color: #fff;
        border-radius: 11vw;
        position: absolute;
        top: 20.6vw;
        left: -4vw;
        img {
          width: 100%;
          height: 100%;
          border-radius: 11vw;
          box-shadow: 7px 6px 10px rgba(62, 65, 71, 0.4);
        }
      }
    }
  }
  @include e(guessLove) {
    width: 100%;
    border-radius: 11vw;
    background-color: #024137;
    margin-top: 10vw;
    color: #fff;
    @include m(title) {
      padding-top: 26px;
      padding-bottom: 6px;
      margin-left: 9vw;
      vertical-align: middle;
    }
    @include m(mainTitle) {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 3px;
    }
    @include m(subTitle) {
      margin-left: 3vw;
      font-size: 12px;
      font-weight: 300;
      color: #898587;
      letter-spacing: 2px;
    }
    @include m(List) {
      width: 100%;
      .swiper-slide-next {
        margin-left: 3vw;
      }
    }
    @include m(Item) {
      width: 100%;
      padding-left: 3vw;
      padding-right: 3vw;
      .listItem {
        margin-bottom: 3vw;
        margin-right: 0;
      }
      .listItem:nth-child(2n) {
        float: right;
      }
    }
  }
  @include e(plantGrass) {
    position: relative;
    padding-top: 70px;
    margin-top: 36px;
    margin-left: 3.3vw;
    @include m(title) {
      position: absolute;
      left: 0;
      top: 0;
      width: 64.4vw;
      border-radius: 11vw;
      background-color: #024137;
      height: 100%;
      padding: 22px 0px 0 9vw;
    }
    @include m(list) {
      width: 100%;
      .swiper-container {
        overflow: visible;
      }
      .paginationThree {
        position: absolute;
        top: 30px;
        margin-left: 68vw;
        z-index: 10;
      }
    }
    @include m(swiperItem) {
      width: 80vw;
      margin-right: 4vw !important;
      &:last-child {
        width: 100vw;
      }
    }
    @include m(ListInfo) {
      // border-radius: 11vw;
      // background-color: #41695e;
      display: inline-block;
    }
    @include m(ItemImg) {
      img {
        width: 80vw;
        height: 80vw;
        border-radius: 11vw;
      }
    }
    @include m(ItemInfo) {
      margin-top: -11vw;
      width: 80vw;
      padding: 5vw;
      padding-top: 16vw;
      background-color: #41695e;
      border-radius: 0 0 11vw 11vw;
      .title {
        color: #fff;
        font-size: 16px;
        margin-bottom: 5vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .infoDetail {
        img {
          width: 6vw;
          border-radius: 3vw;
          vertical-align: middle;
        }
        .nickName {
          display: inline-block;
          width: 26vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 2vw;
          font-size: 12px;
          font-weight: 300;
          color: #fff;
          vertical-align: middle;
        }
        .count {
          margin-left: 1vw;
          color: #fff;
          font-size: 12px;
          font-weight: 300;
        }
      }
    }
  }
  @include e(hotActivities) {
    position: relative;
    margin-top: 36px;
    padding-top: 19vw;
    padding-bottom: 25px;
    font-size: 0;
    @include m(top) {
      position: absolute;
      top: 0;
      right: 0;
      width: 89vw;
      height: 41vw;
      border-radius: 11vw 0 0 11vw;
      margin-left: auto;
      background-color: #024137;
      color: #fff;
      padding-top: 7vw;
      padding-left: 9vw;
      vertical-align: middle;
      .ins-icon {
        color: #898587;
      }
    }
    @include m(List) {
      position: relative;
      z-index: 1;
    }
    @include m(ListItem) {
      margin-bottom: 36px;
    }
    @include m(ItemImg) {
      img {
        width: 89vw;
        height: 49vw;
        border-radius: 0 11vw 11vw 0;
      }
    }
    @include m(ItemInfo) {
      padding-top: 15px;
      padding-left: 11.4vw;
      color: #898587;
      .title {
        font-weight: 500;
        font-size: 16px;
      }
      .tag {
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
  // 韩国馆
  @include e(koreaHouse) {
    position: relative;
    padding-top: 77px;
    margin-left: 3.3vw;
    margin-right: 3.3vw;
    @include m(top) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      color: #fff;
      background-color: #004438;
      border-radius: 11vw 11vw 0 0;
      padding: 30px 0 100px 10vw;
      vertical-align: middle;
    }
    .list {
      position: relative;
      z-index: 1;
      border-radius: 11vw;
      font-size: 0;
      img {
        width: 100%;
        border-radius: 11vw;
      }
    }
  }
  @include e(map) {
    display: none;
  }

  // 统一首页title样式
  @include e(title) {
    color: #808080;
    & > span {
      color: #808080;
      display: inline-block;
    }
    .mTitle {
      margin-right: 3vw;
      color: #fff;
      font-size: 16px;
      // vertical-align: middle;
      letter-spacing: 3px;
    }
    .sTitle {
      -webkit-text-size-adjust: none;
      font-size: 10px;
      margin-right: 3vw;
      // vertical-align: middle;
      letter-spacing: 2px;
      font-weight: 300;
    }
  }
  // 猜你喜欢样式重置
  @include e(recommend) {
    .ins-title {
      display: none;
    }
    &.ins-recommend.is-type2 {
      border-radius: 11vw;
    }
  }
  .more {
    padding-right: 0;
    color: #898587;
    .ins-icon {
      display: inline-block;
      font-size: 14px;
    }
    border-color: #898587;
  }
  @include e(rightCircle) {
    margin-left: 10px;
  }
  @include e(cornerMark) {
    box-sizing: border-box;
    position: fixed;
    width: 30px;
    height: 30px;
    background-color: $--color-theme;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.73);
    z-index: 10;
    color: #fff;
    &::after {
      content: '';
      position: absolute;
      bottom: -18px;
      left: 0;
      width: 100%;
      font-size: 12px;
      color: #3e4147;
      text-align: center;
    }
    @include when(scrollTop) {
      right: 12px;
      bottom: 170px;
      &::after {
        content: '顶部';
      }
      i {
      }
    }
    @include when(customer) {
      right: 12px;
      bottom: 110px;
      &::after {
        content: '客服';
      }
      i {
      }
    }
  }
  @include e(cornerMarkIcon) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @include e(serverLink) {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 2;
  }
  @media screen and (max-width: 320px) {
    .detail {
      .count {
        font-size: 18px;
        line-height: 18px;
      }
    }
  }
  // TODO: fixstyle
  @import './style/_index.scss';
}
</style>