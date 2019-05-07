<template>
  <i
    :class="iconName"
    class="ins-icon"
    v-if="icon"
  />
  <UISvg
    :color="color"
    :height="height"
    :name="svg"
    :width="width"
    class="ins-icon"
    v-else-if="svg"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import UISvg from '../../srcUI/UISvg';
// 事件通过.native触发
@Component({
  name: 'InsIcon',
  components: {
    UISvg
  }
})
export default class App extends Vue {
  @Prop({ type: String }) icon; // 显示iconfont
  @Prop({ type: String }) svg; // 显示svg
  @Prop({ type: String }) color; // svg
  @Prop({ type: String }) width; // svg属性
  @Prop({ type: String }) height; // svg 属性

  get iconName() {
    return 'icon-' + this.icon;
  }

  created() {}
  mounted() {}
}
</script>
