<template>
  <div id="wrapper"></div>
</template>

<script>
export default {
  props : ['token'],
  created() {
    if(this.token) {
      sessionStorage.setItem('token', this.token)
      this.$router.push('/')
    } else this.$router.push('/notfound')
  }
}
</script>