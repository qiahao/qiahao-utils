<template>
  <div
    :class="computedClass"
    class="ins-appHeader clearfix"
  >
    <div
      @click.stop="onClickLeft"
      class="ins-appHeader__left"
    >
      <slot name="left">
        <ins-icon
          @click.native.stop="onClickBack"
          icon="left"
        ></ins-icon>
      </slot>
    </div>
    <div class="ins-appHeader__contain">
      <slot>{{title}}</slot>
    </div>
    <div class="ins-appHeader__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';
import { PATH_INDEX } from '@/router';

@Component({
  name: 'AppHeader',
  components: {}
})
export default class App extends Vue {
  // data
  // data end
  // props
  @Prop({ type: Boolean, default: true }) showLeft;
  @Prop({ type: Boolean, default: true }) showRight;
  @Prop({ type: String, default: '' }) title;
  @Prop({ type: String, default: 'absolute' }) position; // fixed, absolute, static
  @Inject('page')
  page;

  get computedClass() {
    return [`is-${this.position}`];
  }

  onClickLeft() {
    this.$emit('click-left');
  }
  onClickBack() {
    try {
      this.$router.back();
    } catch (e) {
      this.$router.push(PATH_INDEX);
    }
  }
  created() {
    if (this.page) {
      const headers = this.page.headers;
      if (!headers.includes(this)) {
        headers.push(this);
      }
      this.page.setHeader(this);
    }
  }
  mounted() {}
  beforeDestroy() {
    if (this.page) {
      const headers = this.page.headers;
      const i = headers.indexOf(this);
      if (i !== -1) {
        headers.splice(i, 1);
      }
      const l = headers.length;
      if (this.page.header === this) {
        this.page.header = l ? headers[l - 1] : null;
      }
    }
  }
}
</script>

<style lang="scss">
@include b(appHeader) {
  $left-min-width: 60px;
  $space: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  height: $--header-height;
  // line-height: $--header-height;
  top: 0;
  left: 0;
  z-index: $--header-zIndex;
  padding-left: $--header-left;
  padding-right: $--header-right;
  background-color: $--background-color-white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  color: $--color-text-regular;
  font-size: $--font-size-lg;
  @include when(static) {
    position: static;
  }
  @include when(absolute) {
    position: absolute;
  }
  @include when(fixed) {
    position: fixed;
  }
  @include e(left) {
    // float: left;
    min-width: $left-min-width;
    // padding-left: $space;
  }
  @include e(right) {
    // float: right;
    min-width: $left-min-width;
    // padding-right: $space;
    text-align: right;
  }

  @include e(contain) {
    padding-left: 20px;
    padding-right: 20px;
    font-size: $--font-size-lg;
    flex: 1;
    text-align: center;
    color: #024137;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ins-icon {
    font-size: 20px;
  }
  .icon-cart {
    font-size: 24px;
  }
}
</style>