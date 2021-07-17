<template>
  <div class="home">
    <Table
      :category="category"
      :columns="columns"
      :buttons="buttons"
      :data="data"
    />
  </div>
</template>

<script lang="ts">
import Table from '@/components/Table.vue'; // @ is an alias to /src
import {category, columns, buttons, data} from '@/modules/static/permission'

export default {
  components: {
    Table,
  },
  data() {
    return {
      category, 
      columns, 
      buttons, 
      data
    }
  },
  created() {
    const last_idx = this.columns.length - 1
    this.columns[last_idx] = {
      ...this.columns[last_idx],
      renderBodyCell : ({row, column, index}, h)=> {
        return h('input', {
          attrs : {
            type : 'button',
            value : '변경'
          }
        }, [])
      }
    }
  }
}
</script>
