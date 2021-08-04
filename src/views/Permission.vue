<template>
  <div class="wrapper">
    <div class="title">
      권한 목록
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
import Table from "@/components/Table.vue"; // @ is an alias to /src
import PermissionManage from "./popup/PermissionManage.vue";
import { category, columns, buttons, data } from "@/modules/static/permission";
import Warning from "../components/Warning";

export default {
  components: {
    Table,
    PermissionManage,
    Warning
  },
  data() {
    return {
      category,
      columns,
      buttons,
      data,
      modal_name: "remove-modal",
      resetButton: true,
      modal_message: "",
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
    onUpdate(index) {
      this.props = {
        title: "권한 변경",
        guideMessage: "Authentication Broker에서 사용할 권한을 변경합니다."
      };
      this.$modal.show("modal");
    },
    onCreate() {
      this.props = {
        title: "권한 생성",
        guideMessage: "Authentication Broker에서 사용할 권한을 생성합니다."
      };
      this.$modal.show("modal");
    },
    onApply(data) {
      this.resetButton = false;
      this.modal_message = "적용되었습니다.";
      this.$modal.show(this.modal_name);
      this.$modal.hide("modal");
    },
    onModalClose(name) {
      this.$modal.hide(name);
    },
    modal_onSubmit() {
      //삭제처리
      this.modal_onExit();
    },
    modal_onExit() {
      this.$modal.hide(this.modal_name);
    }
  },
  created() {
    const last_idx = this.columns.length - 1;
    const _vm = this;
    this.columns[last_idx] = {
      ...this.columns[last_idx],
      renderBodyCell: ({ row, column, index }, h) => {
        return h(
          "div",
          {
            attrs: { class: "button-group" }
          },
          [
            h(
              "input",
              {
                attrs: { type: "button", value: "변경", class: "" },
                on: {
                  click: function() {
                    _vm.onUpdate(index);
                  }
                }
              },
              []
            ),
            h(
              "input",
              {
                attrs: { type: "button", value: "삭제", class: "secondary" },
                on: {
                  click: function() {
                    _vm.resetButton = true;
                    _vm.modal_message = "삭제 하시겠습니까?";
                    _vm.$modal.show(_vm.modal_name);
                  }
                }
              },
              []
            )
          ]
        );
      }
    };
  }
};
</script>
