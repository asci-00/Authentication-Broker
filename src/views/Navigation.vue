<template>
  <div id="header">
    <div id="navWrapper">
      <header id="nav">
        <div class="main-header">Authentication Broker</div>
        <router-link
        v-for="(nav, idx) in routes"
        :to="nav.path"
        :key="idx">{{nav.name}}</router-link>
      </header>
    </div>
    <div id="subNav">
      {{routeName}}
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/'
export default {
  data() { return { routes : routes.slice(2, routes.length) } },
  computed : {
    routeName() {
      const now = this.routes.find(route => route.path === this.$route.path)
      return now ? now['name'] : ''
    }
  },
  methods: {
  }
}
</script>