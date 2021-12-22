<template>
  <div class="wrapper">
    <div class="title">
      {{ title }}
      <input type="button" :value="button.label" :class="button.className" @click="button.onClick" />
    </div>
    <div class="container">
      <Table :category="category" :columns="columns" :data="data" v-if="data.length" />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
}
</style>

<script lang="ts">
import Table from '@/components/Table.vue';
import { title, button, category, columns } from '@/constants/equipment.js';
import { responseMiddleware } from '@/utils/dataTransform';
import { setError } from '@/utils/errorHandling';
import * as Api from '@/apis/equipment.js';

export default {
  components: { Table },
  data() {
    return { data: [], category, columns, title, button };
  },
  methods: {
    buttonClick() {
      this.$router.push('/auth');
    },
    binding() {
      this.button.onClick = this.button.onClick.bind(this);
    },
    requestEquipmentStatus() {
      Api.getEquipList()
        .then((res) => (this.data = responseMiddleware.equipmentList(res.data)))
        .catch(setError.bind(this));
    },
  },
  created() {
    this.requestEquipmentStatus();
    this.binding();
  },
};
</script>
