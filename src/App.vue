<!--
/*
 * @Author: qiahao
 * @Date:  2020-01-14 17:22
 * @Last Modified by: qiahao
 * @Last Modified time: 2020-01-14 17:22
*/
 -->
<template>
  <div>
    <flashModel
      :screen="screenData"
      @changeflashState="changeflashState"
      v-if="showflash"
    ></flashModel>
    <bpNavbarView
      :bar-hidden="true"
      :root-page-path="rootPath"
      id="app"
      page-animation
      page-class="wrapper"
    />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TabBar from '@/pages/tabBar/tabBar.vue';
import bpui from 'bpui.js';
import { PATH_INDEX, PATH_BINDLOGIN } from './router/src/routesPath';
import { apiProduct } from '@/api';
import { appCheckLogin, appSetUserInfo, getPureResponseData, appRemoveUserInfo } from './utils';
import flashModel from '@/pages/flashPage/index.vue';
@Component({
  components: {
    TabBar,
    bpNavbarView: bpui.bpNavbarView,
    flashModel
  }
})
export default class App extends Vue {
  rootPath: string = PATH_INDEX;
  private screenData: any = {};
  private showflash = true;
  created() {
    this.init();
  }
  init() {
    this.judgeUserInfo();
    this.initAuthCb();
    this.judgeFirstScreen();
    this.initHotKeyword();
  }
  initAuthCb() {
    let _this = this;
    window['authCallback'] = function() {
      let res = arguments[0];
      // console.log(res, '回调参数');
      alert(res);
      _this.authCb(res);
      window['authWindow'].close();
    };
  }
  authCb(res) {
    if (res.state == 'bound') {
      this.$router.push(PATH_INDEX);
      this.$store.dispatch('app/appUpdateUserInfo');
    } else {
      this.$router.push(PATH_BINDLOGIN);
    }
  }
  judgeUserInfo() {
    appCheckLogin().then(res => {
      if (res) {
        let _userInfo = getPureResponseData(res);
        appSetUserInfo(_userInfo);
      } else {
        appRemoveUserInfo();
      }
    });
  }
  // 改变开屏状态
  changeflashState(val) {
    this.showflash = val;
  }
  // 获取开屏页数据
  async getFirstScreen() {
    this.screenData = await apiProduct.firstScreen();
    if (!this.screenData.mobileUrl) {
      this.showflash = false;
    }
    this.setFirstScreen();
  }
  // 设置开屏不再显示
  setFirstScreen() {
    sessionStorage.hideFirstScreen = true;
  }
  // 获取cookie
  judgeFirstScreen() {
    if (sessionStorage.hideFirstScreen && JSON.parse(sessionStorage.hideFirstScreen)) {
      this.showflash = false;
    } else {
      this.getFirstScreen();
    }
  }
  initHotKeyword() {
    this.$store.dispatch('product/updateHotKeyword');
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  min-height: 100%;
  position: relative;
}
</style>
