<template>
  <div
    :class="[currentPath === pathPlaygreen ? 'is-playGreen' : '']"
    class="ins-appFooter"
    v-if="isShow"
  >
    <div class="ins-appFooter__items ins-flex is-center">
      <div
        :class="{'is-active': currentPath === item.path}"
        :key="i"
        @click="onClickTabbar(item.path)"
        class="ins-appFooter__item ins-flex__1"
        v-for="(item, i) in tabbarList"
      >
        <ins-icon :icon="currentPath === item.path ? item.activeIcon : item.icon" />
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import bpui from 'bpui.js';
import { PATH_INDEX, PATH_USER_MESSAGE, PATH_MALL, PATH_PLAY_GREEN, PATH_USER_CENTER } from '@/router';

@Component({
  name: 'AppFooter',
  components: {}
})
export default class App extends Vue {
  // @Provide() isShow:boolean = true;
  private currentPath: string = '';
  private pathIndex: string = PATH_INDEX;
  private pathMessage: string = PATH_USER_MESSAGE;
  private pathMall: string = PATH_MALL;
  private pathPlaygreen: string = PATH_PLAY_GREEN;
  private pathUserCenter: string = PATH_USER_CENTER;
  private paths: string[] = [PATH_INDEX, PATH_USER_MESSAGE, PATH_MALL, PATH_PLAY_GREEN, PATH_USER_CENTER];
  private tabbarList: any[] = [
    { path: PATH_INDEX, icon: 'home', activeIcon: 'home_fill', title: '首页' },
    { path: PATH_USER_MESSAGE, icon: 'message', activeIcon: 'message_fill', title: '消息' },
    { path: PATH_MALL, icon: 'mall', activeIcon: 'mall_fill', title: '商城' },
    { path: PATH_PLAY_GREEN, icon: 'discover', activeIcon: 'dicover_fill', title: '发现' },
    { path: PATH_USER_CENTER, icon: 'person', activeIcon: 'person_fill', title: '我的' }
  ];

  @Watch('$route', {
    deep: true
  })
  routeWatch(n) {
    if (n) {
      this.currentPath = n.path;
    } else {
      this.currentPath = '';
    }
  }

  get isShow() {
    return this.paths.indexOf(this.currentPath) !== -1;
  }

  onClickTabbar(path) {
    if (path === this.currentPath) {
      return;
    } else {
      this.$router.replace({ path: path });
    }
  }
  routeChangeHandler(to, type) {
    this.currentPath = to.path;
  }

  created() {
    this.currentPath = this.$route.path;
    bpui.libs.router.on('routeChanged', this.routeChangeHandler);
  }
  destroyed() {
    bpui.libs.router.off('routeChanged', this.routeChangeHandler);
  }
}
</script>

<style lang="scss" scope>
@include b(appFooter) {
  width: 100%;
  background-color: rgba(250, 247, 250, 0.5);
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  @include when(playGreen) {
    background-color: rgba(209, 208, 206, 0.2);
  }
  @include e(items) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1999;
    width: 100%;
    border-radius: 27px 27px 0px 0px;
    background: $--background-color-white;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.16);
    padding-bottom: constant(safe-area-inset-bottom) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
  }
  @include e(item) {
    padding: 5px 0;
    text-align: center;
    color: $--text-color-regular;
    font-size: $--font-size-xs;
    line-height: 1;
    letter-spacing: 1px;
    opacity: 1;
    .ins-icon {
      font-size: 27px;
      color: #004438;
    }
  }
}
</style>