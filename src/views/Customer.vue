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
import {category, columns, data} from '@/modules/static/equipment'

export default {
  components: { Table, },
  data() {
    return {
      data, category, 
      columns
    }
  },
  methods : {
    buttonClick() { this.$router.push('/auth') }
  },
}
</script>
