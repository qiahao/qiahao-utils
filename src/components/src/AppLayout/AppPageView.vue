<template>
  <app-page>
    <app-header
      :position="position"
      :show-left="showHeaderLeft"
      :show-right="showHeaderRight"
      @click-left="onClickLeft"
      v-if="showHeader"
    >
      <slot name="title">{{title}}</slot>
      <div
        slot="left"
        v-if="hasSlotLeft"
      >
        <slot name="headerLeft"></slot>
      </div>
      <div
        slot="right"
        v-if="hasSlotRight"
      >
        <slot name="headerRight"></slot>
      </div>
    </app-header>
    <slot></slot>
  </app-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'AppPageView',
  components: {}
})
export default class App extends Vue {
  @Prop({ type: String }) title: string;
  @Prop({ type: Boolean, default: true }) showHeader;
  @Prop({ type: String, default: 'absolute' }) position;
  @Prop({ type: Boolean, default: true }) showHeaderLeft;
  @Prop({ type: Boolean, default: true }) showHeaderRight;

  get hasSlotLeft() {
    return this.$slots.headerLeft;
  }
  get hasSlotRight() {
    return !!this.$slots.headerRight;
  }

  onClickLeft() {
    this.$emit('click-left');
  }
}
</script>

<style lang="scss">
@include b(appPageView) {
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>