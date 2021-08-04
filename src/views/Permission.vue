<template>
  <div class="wrapper">
    <div class="title">
      권한 목록
      <input type="button" value="생성" class="right-button" @click="onCreate()"/>
    </div>
    <div class="container">
      <Table
        v-if="data.length"
        :category="category"
        :columns="columns"
        :data="data"
      />
    </div>
    <modal name="modal" :width="900" :height="546" :classes="['modal']">
      <permission-manage
        v-bind="props"
        @submit="onApply"
        @close="onModalClose('modal')"
      />
    </modal>
    <warning
      :name="modal_name"
      :submit="true"
      :reset="resetButton"
      :message="modal_message"
      @click="modal_onSubmit()"
      @close="modal_onExit()"
    />
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
import HCL from 'js-hcl-parser'
import Table from "@/components/Table.vue"; // @ is an alias to /src
import PermissionManage from "./popup/PermissionManage.vue";
import { category, columns } from "@/modules/static/permission";
import Warning from "@/components/Warning";
import * as Api from '@/apis/policy.js'
//import dataaa from '@/modules/static/dataTransform.js'

export default {
  components: {
    Table,
    PermissionManage,
    Warning
  },
  data() {
    return {
      category, columns,
      data : [],
      modal_name: "remove-modal",
      resetButton: true,
      modal_message: "",
      selectedPolicy : null,
      props: {
        title: "",
        guideMessage: "",
        onSubmit: () => {},
        onClose: () => {},
        name: "",
        role: []
      }
    };
  },
  methods: {
    onUpdate(row) {
      Api.getPolicyInfo(row['name']).then(res => {
        const hclString = res.data.policy.rules
        const jsonData = JSON.parse(HCL.parse(hclString))
        const rolesData = jsonData["path"] ? jsonData["path"].map(obj => Object.entries(obj)).map(arr => ({
            path : arr[0][0],
            capabilities : arr[0][1][0]['capabilities']
        })) : []

        this.props = {
          title: "권한 변경",
          guideMessage: "Authentication Broker에서 사용할 권한을 변경합니다.",
          name: row['name'],
          role : rolesData
        }
        this.$modal.show("modal");
      })
    },
    onCreate() {
      this.props = {
        title: "권한 생성",
        guideMessage: "Authentication Broker에서 사용할 권한을 생성합니다."
      };
      this.$modal.show("modal");
    },
    onApply({name, data}) {
      const res = HCL.stringify(JSON.stringify(data))
      Api.updatePolicyInfo(name, res).then(res => {
        this.init()
        this.resetButton = false;
        this.modal_message = "적용되었습니다.";
        this.$modal.show(this.modal_name);
        this.$modal.hide("modal");
      }).catch(err => console.log(err))
    },
    onDelete(name) { 
      Api.deletePolicy(name).catch(err=>console.log(err)).then(res => {this.init()})
    },
    onModalClose(name) {
      this.$modal.hide(name);
    },
    modal_onSubmit() {
      //삭제처리
      if(this.selectedPolicy) this.onDelete(this.selectedPolicy)
      this.modal_onExit();
    },
    modal_onExit() {
      this.$modal.hide(this.modal_name);
    },
    init() {
      this.selectedPolicy = null
      return Api.getPolicyList().then(res => {
        const list = res.data.policies
        this.data = list.map(name => ({name}))
      })
    }
  },
  created() {
    const last_idx = this.columns.length - 1;
    const _vm = this;
    this.columns[last_idx] = {
      ...this.columns[last_idx],
      renderBodyCell: ({ row, column, index }, h) => {
        return h( "div", { attrs: { class: "button-group" } },
          [
            h( "input", {
                attrs: { type: "button", value: "변경", class: "" },
                on: {
                  click: function() {
                    _vm.onUpdate(row);
                  }
                }
              }, []
            ), h( "input", {
                attrs: { type: "button", value: "삭제", class: "secondary" },
                on: {
                  click: function() {
                    _vm.selectedPolicy = row['name']
                    _vm.resetButton = true;
                    _vm.modal_message = "삭제 하시겠습니까?";
                    _vm.$modal.show(_vm.modal_name);
                  }
                }
              }, []
            )
          ]
        );
      }
    };

    this.init()
  }
};
</script>
