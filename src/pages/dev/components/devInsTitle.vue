<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-04-11 11:07
* Desc:
*/
-->

<template>
  <div class="border-bottom">
    <h2>标题：InsTitle</h2>
    <div class="ins-flex pb-xxl">
      <div class="ins-flex__1 mr-sm">
        <ins-title
          sub-title="sub title"
          title="title"
        ></ins-title>
      </div>
      <div class="ins-flex__1 mr-sm">
        <ins-title
          sub-title="sub title"
          title="title"
          widget="(2)"
        />
      </div>
      <div class="ins-flex__1 mr-sm">
        <ins-title
          sub-title="sub title"
          title="title"
          widget="(2)"
        >
          <div slot="right">more</div>
        </ins-title>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Mixins, Watch, Inject, Provide } from 'vue-property-decorator';
import { InsTitle } from '@/components';
@Component({
  name: 'DevInsTitle',
  components: {
    InsTitle
  }
})
export default class App extends Vue {
  created() {}
  mounted() {}
}
</script>
