<template>
  <div class="wrapper">
    <div class="title">인증 정보</div>
    <section class="container">
      <div class="half-container">
        <div class="head">
          <div class="inner-box-title">
            인증 디렉토리 구조
            <i class="fa fa-plus icon" @click="openPopup()"></i>
          </div>
          <div class="filter">
            <select v-model="selectedCategory">
              <option
                v-for="(item, idx) in category"
                :key="idx"
                :value="item.field"
                >{{ item.label }}</option
              >
            </select>
            <search-bar
              v-model="search"
              placeholder="Search"
              @onsearch="onSearch(search)"
            />
          </div>
        </div>
        <v-jstree
          :data="tree_data"
          allow-batch
          whole-row
          @item-click="itemClick"
          @init="setModelData"
          class="tree-wrapper scroll-container"
        />
      </div>
      <div class="half-container">
        <div class="inner-box-title" :style="{ marginBottom: '10px' }">
          인증 정보 설정
        </div>
        <div class="setting-box">
          <setting-certi-info :info-list="data_list" @delete="onDelete()" />
        </div>
      </div>
    </section>
    <modal
      name="auth-manage-popup"
      :width="900"
      :height="475"
      :classes="['modal']"
    >
      <auth-create @submit="onApply" @close="closePopup()" />
    </modal>
    <warning
      :name="modal_name"
      message="삭제하시겠습니까?"
      @click="modal_onSubmit()"
      @close="modal_onExit()"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0;
  min-width: 960px;
  & .half-container {
    padding: 10px;
    width: calc(100% - 20px);
    & .head {
      position: relative;
      margin-bottom: 10px;
      & .inner-box-title {
        float: left;
      }
      & .filter {
        position: relative;
        float: right;
      }
      &:after {
        content: " ";
        display: block;
        clear: both;
      }
    }
    & .setting-box {
      margin-bottom: 10px;
    }
    & .inner-box-title {
      min-height: 35px;
      line-height: 35px;
      vertical-align: middle;
    }
  }
  & .foot-box {
    display: grid;
    grid-template-columns: 1fr 3fr;
    & .info-text {
      padding-top: 3px;
    }
    & .button-box {
      text-align: right;
    }
  }
  & .tree-wrapper {
    min-height: 400px;
    height: calc(100% - 60px);
  }
}

</style>

<script lang="ts">
import VJstree from "@/local-module/VTree";
import AuthCreate from "./popup/AuthCreate.vue";
import { tree_data } from "@/modules/static/permission";
import SearchBar from "@/components/SearchBar.vue";
import SettingCertiInfo from "@/components/SettingCertiInfo.vue";
import Warning from "@/components/Warning";

export default {
  components: { VJstree, SearchBar, AuthCreate, SettingCertiInfo, Warning },
  data() {
    return {
      tree_data,
      category: [
        { field: "all", label: "전체" },
        { field: "sub", label: "하위" },
      ],
      selectedCategory: "all",
      selectedItem: undefined,
      search: "",
      path: "",
      data_list: {},
      modal_name: "auth-manage-modal",
      modal_data : {},
    };
  },
  methods: {
    itemClick(item) {
      this.selectedItem = item;
      let now = item,
        path = `/${item.model.text}`;
      while (now.$parent.model) {
        now = now.$parent;
        path = `/${now.model.text}${path}`;
      }
      this.data_list = item.model.info;
      this.path = path;
    },
    setModelData(data) { this.model_data = data },
    initModelData(model) {
      model.highlight = false
      model.children.forEach(child => this.initModelData(child))
    },
    onApply(data) {},
    onDelete() {
      this.$modal.show(this.modal_name);
    },
    onSearch(keyword) {
      this.model_data.forEach(item => { this.initModelData(item) })

      if(this.selectedCategory === 'all') this.model_data.forEach(item => { this.searchItem(item, keyword) })
      else {
        let start = this.selectedItem
        if(start === undefined) return
        if(start.model.folder === undefined) start = start.$parent

        if(this.searchItem(start.model, keyword)) start.model.opend = true
      }
    },
    searchItem(now, keyword) {
      if(now.text.includes(keyword)) now.highlight = true;
      if(now.folder && now.children.length) {
        now.children.forEach(child => {
          if(this.searchItem(child, keyword)) { now.opened = true }
        })
      }
      return now.highlight
    },
    openPopup() {
      this.$modal.show("auth-manage-popup");
    },
    closePopup() {
      this.$modal.hide("auth-manage-popup");
    },

    modal_onSubmit() {
      //삭제처리
      this.modal_onExit();
    },
    modal_onExit() {
      this.$modal.hide(this.modal_name);
    },
  },
  mounted() { },
  beforeDestroy() {
    this.model_data.forEach(item => { this.initModelData(item) })
    if(this.selectedItem) this.selectedItem.model.selected = false
  }
};
</script>
