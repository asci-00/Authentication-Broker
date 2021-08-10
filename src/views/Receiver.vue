<template>
  <div id="wrapper"></div>
</template>

<script>
import { setToken } from '@/apis/Api'

export default {
  props : ['token'],
  created() {
    if(this.token) {
      sessionStorage.setItem('token', this.token)
      setToken(this.token)
      this.$router.push('/')
    } else this.$router.push('/notfound')
  }
}
</script>