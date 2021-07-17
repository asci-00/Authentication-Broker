<template>
  <div class="home">
    <Table
      :category="category"
      :columns="r_columns"
      :data="data"
    />
  </div>
</template>

<script lang="ts">
import Table from '@/components/Table.vue'; // @ is an alias to /src
import {category, columns, buttons, data} from '@/modules/static/equipment'

export default {
  components: {
    Table,
  },
  data() {
    return {
      category, 
      r_columns : [], 
      data
    }
  },
  created() {
    this.r_columns = columns.concat([{ key:'11', field : 'action', title : '동작', 
    renderBodyCell:({rowData}, h) => {
      return h('input', {
        attrs : {
          type : 'button',
          value : '변경'
        }
      })
    }}])
  }
}
</script>
