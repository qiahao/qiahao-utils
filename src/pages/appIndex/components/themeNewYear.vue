<template>
  <div class="ins-indexTheme ins-indexTheme--newYear"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 新年主题
@Component({
  name: 'IndexThemeNewYear',
  components: {}
})
export default class App extends Vue {

}
</script>

<style lang="scss">
@include b(indexTheme){
  @include m(newYear){}
}

</style>