<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';

@Component({
  name: 'AppPage',
  components: {}
})
export default class App extends Vue {
  private header: Vue = null;
  private headers: Vue[] = [];

  @Provide()
  page = this;

  setHeader(header) {
    this.header = header;
  }

  render(h) {
    const property = {
      class: ['ins-appPage']
    };
    if (this.header) {
      property.class.push('ins-appPage--hasHeader');
    }
    return h('div', property, this.$slots.default);
  }
  mounted() {}
}
</script>

<style lang="scss">
.bp-navbarView .bp-navbarView_page > div.ins-appPage.ins-appPage--hasHeader {
  padding-top: $--header-height;
}
@include b(appPage) {
  position: relative;
  box-sizing: border-box;
  @include m(hasHeader) {
    padding-top: $--header-height;
  }
}
</style>