<template>
  <div class="tree-wrapper">
    <v-jstree :data="data" allow-batch whole-row @item-click="itemClick"/>
  </div>
</template>

<style lang="scss" scoped>
.tree-wrapper {
  width:300px;
  height:400px;
  border:1px solid grey;
  overflow-y:scroll;
}
</style>

<script>
import VJstree from 'vue-jstree'

export default {
  components : { VJstree }, 
  data() {
    return { 
    
    }
  },
  methods: {
    itemClick (node) {
      console.log(node.model.folder)
      // node.model.addChild({
      //   "text": "new item",
      //   "value" : 1,
      // })
    }
  }
}
</script>
