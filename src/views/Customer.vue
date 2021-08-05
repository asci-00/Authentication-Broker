<template>
  <div class="wrapper">
    <div class="title">
      장비 목록
      <input type="button" value="인증 정보 설정" class="right-button"  @click="buttonClick()"/>
    </div>
    <div class="container">
      <Table
      :category="category"
      :columns="columns"
      :data="data"
      v-if="data.length"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding:10px;
}
</style>

<script lang="ts">
import Table from '@/components/Table.vue'; // @ is an alias to /src
import {category, columns } from '@/modules/static/equipment'
import * as Api from '@/apis/equipment.js'

export default {
  components: { Table, },
  data() {
    return {
      data : [], category,
      columns
    }
  },
  methods : {
    buttonClick() { this.$router.push('/auth') }
  },
  created() {
    Api.getEquipList().then(res => {
      this.data = [...res.data['internal'], ...res.data['external']].map(item => ({...item, ...item['data']}))
      console.log(this.data)
    }).catch(err=>this.$alert('관리자에게 문의해주세요', 'Error'))
  }
}
</script>
