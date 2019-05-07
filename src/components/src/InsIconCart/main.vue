<template>
  <span
    @click.stop="onClick"
    class="ins-iconCart"
  >
    <slot name="prefix"></slot>
    <slot>
      <ins-icon :icon="icon"></ins-icon>
    </slot>
    <slot name="suffix"></slot>
    <span
      class="ins-iconCart__widget"
      v-if="showTotal"
    >{{total}}</span>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InsIcon from '../InsIcon';
import { PATH_CART } from '@/router';
import { apiCart } from '@/api';
import { alertConfirm, appCheckLoginBeforeRouter, appAdd2Cart } from '@/utils';
import { State } from 'vuex-class';
@Component({
  name: 'InsIconCart',
  components: {
    InsIcon
  }
})
export default class App extends Vue {
  // 支持传入单个商品或者商品列表
  @Prop({ type: Object }) product; // 传入商品
  @Prop({ type: Object }) specs; // 传入收藏规格 可空，可则取第一个
  @Prop({ type: Number, default: 1 }) quantity; // 传入商品收藏数量
  @Prop({ type: String, default: 'cart' }) icon: string;
  @Prop({ type: Boolean, default: false }) showWidget: boolean; // 是否显示红色点

  @State(state => state.product.cartTotal) total;

  get showTotal() {
    return this.showWidget && this.total !== undefined;
  }

  onClick() {
    const product = this.product;
    if (product) {
      const specs = this.specs ? this.specs : product.skus && product.skus[0] ? product.skus[0] : null;
      appAdd2Cart(product, this.quantity, specs)
        .then(() => {
          this.$emit('success');
        })
        .catch(() => {});
    } else {
      appCheckLoginBeforeRouter().then(res => {
        if (res) {
          this.$router.push(PATH_CART);
        }
      });
    }
  }

  created() {
    if (this.showWidget) {
      this.$store.dispatch('product/updateCartTotal');
    }
  }
  mounted() { }
}
</script>

<style lang="scss">
@include b(iconCart) {
  $widgetSize: 16px;
  display: inline-block;
  position: relative;
  @include e(widget) {
    position: absolute;
    top: -8px;
    right: -8px;
    width: $widgetSize;
    height: $widgetSize;
    line-height: $widgetSize;
    color: $--color-white;
    border-radius: $widgetSize / 2;
    background-color: $--color-error;
    font-size: $--font-size-sm;
    text-align: center;
    @include utils-ellipsis;
  }
}
</style>