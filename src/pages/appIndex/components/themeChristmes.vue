<template>
  <div class="ins-indexTheme ins-indexTheme--christmes"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 圣诞节主题
@Component({
  name: 'IndexThemeChristmes',
  components: {}
})
export default class App extends Vue {

}
</script>

<style lang="scss">
@include b(indexTheme){
  @include m(christmes){}
}

</style>