<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

const COMPONENT_NAME = 'UIFlex';
const CLASS_NS = 'ins-flex';
const CLASS_FLEX = CLASS_NS;
const CLASS_FLEX_ITEM = `${CLASS_FLEX}__item`;
const STRING_NOWRAP = 'nowrap';
const ALIGN_OPTIONS = ['start', 'end', 'center'];
@Component({
  name: COMPONENT_NAME,
  components: {}
})
export default class App extends Vue {
  // data
  private isFlexContainer: boolean = false; // 是否是作为flex最外层包裹标签
  // data end
  // props
  /**
   * isFlexContainer = true 使用的 属性
   */
  /**
   * flex-direction flex-wrap 的缩写
   * 默认值 row nowrap
   * flex-direction: row | row-reverse | column | column-reverse
   * flex-wrap: nowrap | wrap | wrap-reverse;
   */
  @Prop({ type: String, default: '' })
  flexFlow;
  // flex-start | flex-end | center | space-between | space-around; 默认值 flex-start
  @Prop({ type: String, default: '' })
  justifyContent;
  // flex-start | flex-end | center | baseline | stretch; 默认值 flex-start
  @Prop({ type: String, default: '' })
  alignItems;
  // flex-start | flex-end | center | space-between | space-around | stretch; 默认值 flex-start
  @Prop({ type: String, default: '' })
  alignContent;
  // 用作包裹标签的自定义属性
  // 对齐，简化justifyContent和alignItems，可选值：center | start | end 或组合使用 'center start'
  @Prop({ type: String, default: '' })
  align;
  // 特殊情况下需要强制作为包裹函数flex box
  @Prop({ type: Boolean, default: false })
  box;

  /**
   * isFlexContainer = false 使用的 属性
   */
  @Prop({ type: [String, Number], default: 0 })
  order;
  // flex-grow | flex-shrink | flex-basis; 默认值： 0 1 auto
  @Prop({ type: String, default: '' })
  flex;
  // auto | flex-start | flex-end | center | baseline | stretch; 默认值： auto
  @Prop({ type: String, default: '' })
  alignSelf;

  // props end
  // filters
  // filters end
  // computed
  get flexContainerClass() {
    const classes = [CLASS_NS];
    let flexFlow = this.flexFlow;
    if (flexFlow) {
      flexFlow = flexFlow.split(' ');
    }
    if (!flexFlow.length || flexFlow.includes(STRING_NOWRAP)) {
      classes.push(`${CLASS_NS}--nowrap`);
    }
    return classes;
  }
  get flexContainerStyle() {
    const style = {};
    const { flexFlow, alignContent, align } = this;
    let { justifyContent, alignItems } = this;
    const aligns = align.trim() ? align.trim().split(/\s+/) : [];
    const aligns0 = aligns[0];
    const aligns1 = aligns[1];

    if (aligns1) {
      justifyContent = aligns0;
      alignItems = aligns1;
    } else if (aligns0) {
      if (ALIGN_OPTIONS.includes(aligns0)) {
        justifyContent = alignItems = aligns0;
      } else {
        justifyContent = aligns0;
        alignItems = ALIGN_OPTIONS[0];
      }
    }

    if (flexFlow) {
      style['flex-flow'] = flexFlow;
    }
    if (justifyContent) {
      style['justify-content'] = justifyContent;
    }
    if (alignItems) {
      style['align-items'] = alignItems;
    }
    if (alignContent) {
      style['align-content'] = alignContent;
    }

    return style;
  }
  get flexItemStyle() {
    const style = {};
    const { order, flex, alignSelf } = this;

    if (order) {
      style['order'] = order;
    }
    if (flex) {
      style['flex'] = flex;
    }
    if (alignSelf) {
      style['align-self'] = alignSelf;
    }
    return style;
  }
  // computed end
  // watch
  // watch end
  render(h) {
    const property = {
      class: [],
      style: {}
    };
    this.isFlexContainer = this.$parent.$options.name !== COMPONENT_NAME || this.box;
    if (this.isFlexContainer) {
      property.class = this.flexContainerClass;
      property.style = this.flexContainerStyle;
    } else {
      property.class = [CLASS_FLEX_ITEM];
      property.style = this.flexItemStyle;
    }
    return h('div', property, this.$slots.default);
  }
}
</script>

<style lang="scss">
@include b(flex) {
  -js-display: flex;
  display: flex;
  @include m(nowrap) {
    @include e(item) {
      overflow: hidden;
    }
  }
  @include e(item) {
    flex: 1;
  }
}
</style>