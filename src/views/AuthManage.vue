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
              <option v-for="(item, idx) in category" :key="idx" :value="item.field">
                {{ item.label }}
              </option>
            </select>
            <search-bar v-model="search" placeholder="Search" @onsearch="onSearch()" />
          </div>
        </div>
        <v-jstree
          :data="tree_data"
          v-if="tree_data.length"
          allow-batch
          whole-row
          @item-click="onClickItem"
          @init="initTreeData"
          class="tree-wrapper scroll-container"
        />
      </div>
      <div class="half-container">
        <div class="inner-box-title" :style="{ marginBottom: '10px' }">인증 정보 설정</div>
        <div class="setting-box"><setting-certi-info :info-list="autoInfo" @delete="onDelete()" /></div>
      </div>
    </section>
    <modal name="auth-manage-popup" :width="900" :height="475" :classes="['modal']">
      <auth-create @submit="createAuthFile" @close="closePopup()" />
    </modal>
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
        content: ' ';
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
import VJstree from '@/local-module/VTree';
import AuthCreate from './popup/AuthCreate.vue';
import { objectToTree } from '@/modules/static/dataTransform';
import SearchBar from '@/components/SearchBar.vue';
import SettingCertiInfo from '@/components/SettingCertiInfo.vue';
import * as Api from '@/apis/equipment.js';
import { getPath, searchItem } from '@/common/tree.js';

export default {
  components: { VJstree, SearchBar, AuthCreate, SettingCertiInfo },
  data() {
    return {
      tree_data: [],
      category: [
        { field: 'all', label: '전체' },
        { field: 'sub', label: '하위' },
      ],
      selectedCategory: 'all',
      selectedItem: undefined,
      search: '',
      path: '',
      autoInfo: null,
    };
  },
  methods: {
    init() {
      this.tree_data = [];
      this.selectedItem = undefined;
      this.autoInfo = null;
      this.setTreeData();
    },

    initModelData(model) {
      model.highlight = false;
      model.children.forEach((child) => this.initModelData(child));
    },

    // Server data response, request
    setTreeData() {
      Api.getTreeEquipList()
        .then((res) => {
          this.tree_data = objectToTree(res.data);
        })
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'));
    },
    createAuthFile(data) {
      Api.updateConnectionInfo(data.type, data.path, data.data)
        .then(() => {
          this.tree_data = [];
          this.setTreeData();
          this.$alert('적용되었습니다.');
        })
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'))
        .then(() => this.closePopup());
    },
    deleteAuthFile(...params) {
      Api.deleteConnectionInfo(...params)
        .then(() => this.init())
        .catch(() => this.$alert('관리자에게 문의해주세요', 'Error'));
    },

    // Tree Event Callback
    onClickItem(item) {
      this.selectedItem = item;
      this.autoInfo = item.model.info;
      this.path = getPath(item);
    },
    initTreeData(data) {
      this.model_data = data;
    },
    // Delete Button Click Callback
    onDelete() {
      const { protocol, customerIp, host } = this.selectedItem.model.info;
      const hostName = host || 'default';

      this.$confirm('삭제하시겠습니까?')
        .then(() => this.deleteAuthFile(protocol, customerIp, hostName))
        .catch(() => 0);
    },
    // Search Button Click Callback
    onSearch() {
      this.model_data.forEach((item) => this.initModelData(item));

      if (this.selectedCategory === 'all') this.model_data.forEach((item) => searchItem(item, this.search));
      else {
        const start = this.selectedItem;
        if (start === undefined) return;

        searchItem(start.model, this.search);
      }
    },

    // popup on,off
    openPopup: () => this.$modal.show('auth-manage-popup'),
    closePopup: () => this.$modal.hide('auth-manage-popup'),
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.model_data.forEach((item) => this.initModelData(item));
    if (this.selectedItem) this.selectedItem.model.selected = false;
  },
};
</script>
