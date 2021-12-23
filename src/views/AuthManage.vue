<template>
  <div class="wrapper">
    <div class="title">{{ RESOURCE.TREE.TITLE }}</div>
    <section class="container">
      <div class="half-container">
        <div class="head">
          <div class="inner-box-title">
            {{ RESOURCE.TREE.STRUCTOR }}
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
        <div class="inner-box-title" :style="{ marginBottom: '10px' }">{{ RESOURCE.MANAGE_FILE }}</div>
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
import * as Api from '@/apis/equipment.js';
import VJstree from '@/local-module/VTree';
import AuthCreate from './popup/AuthCreate.vue';
import SearchBar from '@/components/SearchBar.vue';
import SettingCertiInfo from '@/components/SettingCertiInfo.vue';
import { setError } from '@/utils/errorHandling';
import { objectToTree } from '@/utils/dataTransform';
import { getPath, searchItem } from '@/utils/tree.js';
import { RESOURCE } from '@/constants/authmanage';

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
      RESOURCE,
    };
  },
  methods: {
    init() {
      this.tree_data = [];
      this.selectedItem = undefined;
      this.autoInfo = null;
      this.setTreeData();
    },
    initSearchResult(model) {
      model.highlight = false;
      model.children.forEach(this.initSearchResult);
    },
    initTreeData(data) {
      this.model_data = data;
    },

    setTreeData() {
      Api.getTreeEquipList()
        .then((res) => (this.tree_data = objectToTree(res.data)))
        .catch(setError.bind(this));
    },
    createAuthFile(data) {
      Api.updateConnectionInfo(data.type, data.path, data.data)
        .then(() => {
          this.tree_data = [];
          this.setTreeData();
          this.$alert(RESOURCE.ALERT_MESSAGE.SUCCESS);
        })
        .then(this.closePopup)
        .catch(setError.bind(this));
    },
    deleteAuthFile(...params) {
      Api.deleteConnectionInfo(...params)
        .then(this.init)
        .catch(setError.bind(this));
    },
    onClickItem(item) {
      this.selectedItem = item;
      this.autoInfo = item.model.info;
      this.path = getPath(item);
    },
    onDelete() {
      const { protocol, customerIp, host } = this.selectedItem.model.info;
      const hostName = host || 'default';

      this.$confirm(RESOURCE.ALERT_MESSAGE.DELETE_CHECK)
        .then(() => this.deleteAuthFile(protocol, customerIp, hostName))
        .catch();
    },
    onSearch() {
      this.model_data.forEach(this.initSearchResult); // 검색 초기화

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
    this.model_data.forEach(this.initSearchResult);
    if (this.selectedItem) this.selectedItem.model.selected = false;
  },
};
</script>
