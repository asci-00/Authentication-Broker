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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
