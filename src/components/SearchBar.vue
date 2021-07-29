<template>
  <div class="search-form">
    <input type="text" :value="text" ref="input" @input="onUpdate" :placeholder="placeholder"/>
    <i class="fa fa-search search-icon" @click="onClick()"></i>
  </div>
</template>

<style scoped>
.search-icon {
  position:absolute;
  right:0px;
}
.search-icon:before {
  display:block;
  width:35px; height:35px;
  line-height:35px;
  vertical-align:middle;
  text-align: center;
}
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