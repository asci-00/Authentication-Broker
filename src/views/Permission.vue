<template>
  <div class="wrapper">
    <div class="title">
      권한 관리
      <input type="button" value="생성" class="right-button" @click="onCreate()"/>
    </div>
    <div class="container">
      <Table
      :category="category"
      :columns="columns"
      :buttons="buttons"
      :data="data"
      />
    </div>
    <modal name="modal" :width="900" :height="550" :classes="['modal']">
      <permission-manage
        v-bind="props"
        @close="onModalClose()"
      />
    </modal>
  </div>
</template>

<style>
.container {
  padding:10px;
}
.modal {
  border:1px solid #22c1d0 !important;
  border-radius:5px;
  box-shadow: 0 5px 10px black;
}
</style>


<script lang="ts">
import Table from '@/components/Table.vue'; // @ is an alias to /src
import PermissionManage from '@/views/About.vue'
import {category, columns, buttons, data} from '@/modules/static/permission'

export default {
  components: {
    Table, PermissionManage
  },
  data() {
    return {
      category, 
      columns, 
      buttons, 
      data,

      props : {
        title : '',
        guideMessage : '',
        onSubmit : () => {},
        onClose : () => {},
        name : '',
        role : []
      }
    }
  },
  methods : {
    onUpdate(index) {
      this.props = {
        title : '권한 변경',
        guideMessage : 'Authentication Broker에서 사용할 권한을 변경합니다.'
      }
      this.$modal.show('modal') 
    },
    onCreate() { 
      this.props = {
        title : '권한 생성',
        guideMessage : 'Authentication Broker에서 사용할 권한을 생성합니다.'
      }
      this.$modal.show('modal') 
    },
    onModalClose() {
      this.$modal.hide('modal')
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
          },
          on : {
            click : function() { this.onUpdate(index) }
          }
        }, [])
      }
    }
  },
}
</script>
