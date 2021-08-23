<template>
  <div id="wrapper"></div>
</template>

<script>
import { setToken } from '@/apis/Api'
import { checkAuthentication } from '@/apis/auth'

export default {
  props : ['token'],
  async created() {
    if(this.token) {
      try {
        const res = await checkAuthentication(this.token)  
        setToken(res.data['token'])
        this.$router.push('/')
      } catch(e) { this.$router.push('/notfound') }
    } else this.$router.push('/notfound')
  }
}
</script>
