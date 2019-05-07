<template>
  <div class="ins-indexTheme ins-indexTheme--valentine"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 情人节主题
@Component({
  name: 'IndexThemeValentine',
  components: {}
})
export default class App extends Vue {

}
</script>

<style lang="scss">
@include b(indexTheme){
  @include m(valentine){}
}

</style>