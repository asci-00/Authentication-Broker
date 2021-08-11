<template>
  <div id="app">
    <view-navigation/>
    <section id="wrapper">
      <router-view/>
    </section>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/common.scss';
@import '@/assets/styles/layout.scss';
@import '@/assets/styles/table.scss';
@import '@/assets/styles/tree.scss';
</style>
<script>
import { routes } from '@/router/'
import ViewNavigation from './views/Navigation.vue'
export default {
  components : { ViewNavigation },
  data() { return { routes,} },
}
</script>
