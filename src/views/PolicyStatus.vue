<template>
  <div class="wrapper">
    <div class="title">
      {{ RESOURCE.TITLE }}
      <input type="button" :value="RESOURCE.BUTTON" class="right-button" @click="setCreatePopup()" />
    </div>
    <div class="container">
      <Table v-if="data.length" :category="category" :columns="columns" :data="data" />
    </div>
    <modal :name="RESOURCE.MODAL" :width="900" :height="546" :classes="['modal']">
      <permission-manage v-bind="popupProps" @submit="requestApply" @close="onModalClose(RESOURCE.MODAL)" />
    </modal>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
.modal {
  border: 1px solid #22c1d0 !important;
  border-radius: 5px;
  box-shadow: 0 5px 10px black;
}
</style>

<script lang="ts">
import * as Api from '@/apis/policy.js';
import Table from '@/components/Table.vue';
import { setError } from '@/utils/errorHandling';
import { createButton } from '@/utils/dynamicElement';
import { responseMiddleware } from '@/utils/dataTransform';
import PermissionManage from './popup/PermissionManage.vue';
import { category, columns, RESOURCE } from '@/constants/policy';

export default {
  components: {
    Table,
    PermissionManage,
  },
  data() {
    return {
      category,
      columns,
      data: [],
      resetButton: true,
      modal_message: '',
      selectedPolicy: null,
      popupProps: null,
      RESOURCE,
    };
  },
  methods: {
    init() {
      this.selectedPolicy = null;
      return Api.getPolicyList()
        .then((res) => {
          const list = res.data.policies;
          this.data = list.map((name) => ({ name }));
        })
        .catch(setError.bind(this));
    },

    setUpdatePopup(row) {
      Api.getPolicyInfo(row.name)
        .then((res) => {
          const rules = responseMiddleware.policyInfo(res.data);
          this.popupProps = { ...this.popupProps, name: row.name, rules, ...RESOURCE.POPUP.UPDATE };
          this.$modal.show(RESOURCE.MODAL);
        })
        .catch(setError.bind(this));
    },
    setCreatePopup() {
      this.popupProps = RESOURCE.POPUP.NEW;
      this.$modal.show(RESOURCE.MODAL);
    },
    requestApply({ name, data, isNew }) {
      Api.updatePolicyInfo(name, data, isNew)
        .then(() => {
          this.init();
          this.$alert(RESOURCE.ALERT_MESSAGE.SUCCESS).then(this.onModalClose.bind(this));
        })
        .catch(setError.bind(this));
    },
    onDelete(name) {
      Api.deletePolicy(name).then(this.init).catch(setError.bind(this));
    },
    onModalClose(name) {
      this.$modal.hide(name);
    },

    setDynamicColumn() {
      this.columns[1].renderBodyCell = ({ row }, h) =>
        h('div', { attrs: { class: 'button-group' } }, [
          createButton({
            h,
            ...RESOURCE.BUTTONS.CREATE,
            onClick: () => this.setUpdatePopup(row),
          }),
          createButton({
            h,
            ...RESOURCE.BUTTONS.DELETE,
            onClick: () =>
              this.$confirm(RESOURCE.ALERT_MESSAGE.DELETE_CHECK)
                .then(() => this.onDelete(row.name))
                .catch(),
          }),
        ]);
    },
  },
  created() {
    this.setDynamicColumn();
    this.init();
  },
};
</script>
