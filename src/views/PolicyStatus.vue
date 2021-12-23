<template>
  <div class="wrapper">
    <div class="title">
      권한 목록
      <input type="button" value="생성" class="right-button" @click="onCreate()" />
    </div>
    <div class="container">
      <Table v-if="data.length" :category="category" :columns="columns" :data="data" />
    </div>
    <modal name="modal" :width="900" :height="546" :classes="['modal']">
      <permission-manage v-bind="props" @submit="onApply" @close="onModalClose('modal')" />
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
import { responseMiddleware } from '@utils/dataTransform';
import Table from '@/components/Table.vue';
import PermissionManage from './popup/PermissionManage.vue';
import { category, columns } from '@/constants/permission';
import { createButton } from '@/utils/dynamicElement';
import * as Api from '@/apis/policy.js';
// import dataaa from '@/modules/static/dataTransform.js'

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
      props: {
        title: '권한 변경',
        guideMessage: 'Authentication Broker에서 사용할 권한을 변경합니다.',
        onSubmit: () => {},
        onClose: () => {},
        name: '',
        role: [],
        isNew: true,
      },
    };
  },
  methods: {
    onUpdate(row) {
      Api.getPolicyInfo(row.name)
        .then((res) => {
          const rules = responseMiddleware.policyInfo(res.data);
          this.props = { ...this.props, name: row.name, rules, isNew: false };
          this.$modal.show('modal');
        })
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'));
    },
    onCreate() {
      this.props = {
        title: '권한 생성',
        guideMessage: 'Authentication Broker에서 사용할 권한을 생성합니다.',
        isNew: true,
      };
      this.$modal.show('modal');
    },
    onApply({ name, data, isNew }) {
      Api.updatePolicyInfo(name, data, isNew)
        .then(() => {
          this.init();
          this.$alert('적용되었습니다.').then(() => this.$modal.hide('modal'));
        })
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'));
    },
    onDelete(name) {
      Api.deletePolicy(name)
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'))
        .then(this.init);
    },
    onModalClose(name) {
      this.$modal.hide(name);
    },
    init() {
      this.selectedPolicy = null;
      return Api.getPolicyList()
        .then((res) => {
          const list = res.data.policies;
          this.data = list.map((name) => ({ name }));
        })
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'));
    },
    setDinamicColumn() {
      this.columns[1].renderBodyCell = ({ row }, h) =>
        h('div', { attrs: { class: 'button-group' } }, [
          createButton({ h, label: '변경', className: 'primary', onClick: () => this.onUpdate(row) }),
          createButton({
            h,
            label: '삭제',
            className: 'secondary',
            onClick: () =>
              this.$confirm('삭제하시겠습니까?')
                .then(() => this.onDelete(row.name))
                .catch(),
          }),
        ]);
    },
  },
  created() {
    this.setDinamicColumn();
    this.init();
  },
};
</script>
