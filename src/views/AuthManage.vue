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
          v-if="tree_data.length"
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
  </div>
</template>

<style scoped>
.container {
	 display: grid;
	 grid-template-columns: 1fr 1fr;
	 grid-gap: 0;
	 min-width: 960px;
}
 .container .half-container {
	 padding: 10px;
	 width: calc(100% - 20px);
}
 .container .half-container .head {
	 position: relative;
	 margin-bottom: 10px;
}
 .container .half-container .head .inner-box-title {
	 float: left;
}
 .container .half-container .head .filter {
	 position: relative;
	 float: right;
}
 .container .half-container .head:after {
	 content: " ";
	 display: block;
	 clear: both;
}
 .container .half-container .setting-box {
	 margin-bottom: 10px;
}
 .container .half-container .inner-box-title {
	 min-height: 35px;
	 line-height: 35px;
	 vertical-align: middle;
}
 .container .foot-box {
	 display: grid;
	 grid-template-columns: 1fr 3fr;
}
 .container .foot-box .info-text {
	 padding-top: 3px;
}
 .container .foot-box .button-box {
	 text-align: right;
}
 .container .tree-wrapper {
	 min-height: 400px;
	 height: calc(100% - 60px);
}


</style>

<script lang="ts">
import VJstree from "@/local-module/VTree";
import AuthCreate from "./popup/AuthCreate.vue";
import { objectToTree } from "@/modules/static/dataTransform";
import SearchBar from "@/components/SearchBar.vue";
import SettingCertiInfo from "@/components/SettingCertiInfo.vue";
import * as Api from '@/apis/equipment.js'

export default {
  components: { VJstree, SearchBar, AuthCreate, SettingCertiInfo },
  data() {
    return {
      tree_data : [],
      category: [
        { field: "all", label: "전체" },
        { field: "sub", label: "하위" },
      ],
      selectedCategory: "all",
      selectedItem: undefined,
      search: "",
      path: "",
      data_list: null,
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
    onApply(data) {
      Api.updateConnectionInfo(data.type, data.path, data.data).then(() => {
        this.tree_data = []
        Api.getTreeEquipList().then(res => { this.tree_data = objectToTree(res.data) })
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'))
        this.$alert('적용되었습니다.')
      })
      .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'))
      .then(() => { this.closePopup() })

    },
    onDelete() {
      const { protocol , customerIp, host } = this.selectedItem.model.info
      const host_name = host === '' ? 'default' : host
      this.$confirm('삭제하시겠습니까?').then(() => 
        Api.deleteConnectionInfo(protocol, customerIp, host_name)
        .then(() => this.init()).catch(() => this.$alert('관리자에게 문의해주세요', 'Error'))
      ).catch(()=>{})
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
    openPopup() { this.$modal.show("auth-manage-popup") },
    closePopup() { this.$modal.hide("auth-manage-popup") },
    init() {
      this.tree_data = []
      this.selectedItem = undefined
      this.data_list = null
      Api.getTreeEquipList().then(res => {
        this.tree_data = objectToTree(res.data)
      }).catch(() => this.$alert('관리자에게 문의해주세요', 'Error'))
    }
  },
  created() { this.init() },
  beforeDestroy() {
    this.model_data.forEach(item => { this.initModelData(item) })
    if(this.selectedItem) this.selectedItem.model.selected = false
  },
};
</script>

