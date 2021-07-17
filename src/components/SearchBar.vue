<template>
  <div class="search-form">
    <input type="text" :value="text" ref="input" @input="onUpdate" :placeholder="placeholder"/>
    <i class="fa fa-search search-icon" @click="()=>{}"></i>
  </div>
</template>

<style scoped>
</style>

<script>
  export default {
      model : {
          prop : 'text',
          event : 'input'
      },
      props : {
          text : String,
          placeholder : String,
      },
      methods : {
          onUpdate() {
              this.$emit('input', this.$refs.input.value)
          },
          onClick() { this.$emit('onsearch') }
      }
  };
</script>