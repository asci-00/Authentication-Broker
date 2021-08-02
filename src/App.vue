<template>
  <div id="app">
    <view-navigation/>
    <section id="wrapper">
      <router-view/>
    </section>
  </div>
</template>
<script>
import { routes } from '@/router/'
import ViewNavigation from './views/Navigation.vue'
export default {
  components : { ViewNavigation },
  data() { return { routes,} },
}
</script>