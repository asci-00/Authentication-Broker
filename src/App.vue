<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="(nav, idx) in routes" :to="nav.path" :key="idx"> | {{nav.name}} | </router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { routes } from '@/router/'
export default {
  data() {
    return { routes,}
  },
  created() {
  }
}
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
