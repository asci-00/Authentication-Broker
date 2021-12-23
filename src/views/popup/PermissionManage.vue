<template>
  <div class="wrapper">
    <div class="title">{{ title }}</div>
    <div class="guide-msg">{{ guideMessage }}</div>
    <section class="left-container">
      <div class="inner-container right-border">
        <div class="label-content">
          <label>{{ RESOURCE.POPUP.PERMISSION_NAME }}</label>
          <input type="text" placeholder="Input permission name" v-model="per_name" />
        </div>
        <div class="label-content">
          <div>
            <label>{{ RESOURCE.POPUP.PERMISSION_LIST }}</label>
            <i class="fa fa-plus icon" @click="init()"></i>
          </div>
          <div class="table-container">
            <ve-table
              :max-height="300"
              :columns="columns"
              :table-data="authRules"
              :event-custom-option="{
                bodyRowEvents: ({ row, rowIndex }) => ({ click: (event) => onRowClick(row, rowIndex) }),
              }"
              row-key-field-name="rowKey"
              :cell-selection-option="{ enable: true }"
              class="table-wrapper modal-table"
            />
          </div>
        </div>
      </div>
      <div class="inner-container">
        <div class="setting-box">
          <div class="head-box">
            <div class="tree-wrap">
              <h2 class="line-label">
                <span>{{ RESOURCE.POPUP.TREE.TITLE }}</span>
              </h2>
              <v-jstree
                :data="tree_data"
                allow-batch
                whole-row
                @item-click="onClickItem"
                class="tree-wrapper scroll-container modal-tree"
                v-if="tree_data.length"
              />
            </div>
            <div>
              <h2 class="line-label">
                <span>{{ RESOURCE.POPUP.TREE.PERMISSION }}</span>
              </h2>
              <v-check-list :list="perm_list" @change="permChange" :checked="checked" />
            </div>
          </div>
          <footer class="foot-box">
            <input type="text" v-model="path" placeholder="input path" />
            <input
              type="button"
              @click="onApply()"
              :value="RESOURCE.POPUP.BUTTONS.APPLY.label"
              :class="RESOURCE.POPUP.BUTTONS.APPLY.className"
            />
          </footer>
        </div>
      </div>
    </section>
    <footer class="button-box">
      <button :class="RESOURCE.POPUP.BUTTONS.SUBMIT.className" @click="onSubmit()">
        {{ RESOURCE.POPUP.BUTTONS.SUBMIT.label }}
      </button>
      <button :class="RESOURCE.POPUP.BUTTONS.CANCEL.className" @click="onExit()">
        {{ RESOURCE.POPUP.BUTTONS.CANCEL.label }}
      </button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 900px;
  & .guide-msg {
    padding-left: 10px;
    margin-bottom: 10px;
  }
}
.left-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0;
  border-bottom: 1px solid grey;

  & .inner-container {
    padding: 10px;
    &.right-border {
      border-right: 1px solid grey;
    }
    & .label-content {
      display: grid;
      grid-template-columns: 90px auto;
      margin-bottom: 20px;
      & .icon {
        display: inline-block;
        margin-left: 5px;
      }
    }
    & .head-box {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
    & .foot-box {
      display: grid;
      grid-template-columns: 6fr 2fr;
      grid-gap: 10px;
    }
  }
}
.table-wrapper {
  min-height: 310px;
  border-bottom: 1px solid grey;
}
</style>

<script>
import VJstree from 'vue-jstree';
import * as Api from '@/apis/equipment';
import { getPath } from '@/utils/tree.js';
import VCheckList from '@/components/CheckList';
import { setError } from '@/utils/errorHandling';
import { createButton } from '@/utils/dynamicElement';
import { permColumns, RESOURCE } from '@/constants/policy';
import { objectToTree, objectToHCL } from '@/utils/dataTransform';

export default {
  components: { VJstree, VCheckList },
  props: {
    title: String,
    guideMessage: String,
    name: String,
    rules: {
      type: Array,
      default: () => [],
    },
    isNew: Boolean,
  },
  data() {
    return {
      columns: permColumns,
      per_name: this.name,
      path: '',
      tree_data: [],
      perm_list: ['create', 'delete', 'update', 'read'],
      checked: [false, false, false, false],
      authRules: this.rules,
      selectedItem: null,
      selectedPathIdx: null,
      RESOURCE,
    };
  },
  methods: {
    requestEquipList() {
      Api.getTreeEquipList()
        .then((res) => (this.tree_data = objectToTree(res.data)))
        .catch(setError.bind(this));
    },
    onClickItem(item) {
      this.selectedItem = item;
      this.path = getPath(item);
    },
    onRowClick(rowData, idx) {
      this.selectedPathIdx = idx;
      this.checked = this.perm_list.map((item) => rowData.capabilities.includes(item));
      this.path = rowData.path;
    },
    permChange(data) {
      this.checked = data;
    },
    onApply() {
      if (this.path === '' || !this.checked.includes(true))
        this.$alert(RESOURCE.ALERT_MESSAGE.REQUIRE_CHECK, 'Warning');
      else if (this.selectedPathIdx) {
        this.authRules[this.selectedPathIdx] = {
          path: this.path,
          capabilities: this.perm_list.filter((i, idx) => this.checked[idx]),
        };
      } else {
        this.authRules.push({
          path: this.path.substr(1),
          capabilities: this.perm_list.filter((i, idx) => this.checked[idx]),
        });
      }
      this.init();
    },
    init() {
      this.checked = this.perm_list.map(() => false);
      if (this.selectedItem) this.selectedItem.model.selected = false;
      this.selectedItem = null;
      this.selectedPathIdx = null;
      this.path = '';
    },
    onSubmit() {
      if (this.per_name && this.authRules.length) {
        this.authRules = this.authRules.map((item) => ({
          path: item.path,
          capabilities:
            item.capabilities.includes('read') && !item.capabilities.includes('list')
              ? item.capabilities.concat('list')
              : item.capabilities,
        }));
        this.$emit('submit', { name: this.per_name, data: objectToHCL(this.authRules), isNew: this.isNew });
      } else this.$alert(undefined, undefined, undefined, { html: '권한명과 하나 이상의<br/> 권한이 필요합니다' });
    },
    onDelete(ev, idx) {
      ev.stopPropagation();
      this.authRules.splice(idx, 1);
    },
    onExit() {
      this.$confirm(RESOURCE.ALERT_MESSAGE.CENCEL_CHECK).then(() => this.$emit('close'));
    },

    setDynamicColumn() {
      this.columns[1].renderBodyCell = ({ rowIndex }, h) =>
        createButton({ h, ...RESOURCE.POPUP.TREE.BUTTON, onClick: (ev) => this.onDelete(ev, rowIndex) });
    },
  },
  created() {
    this.setDynamicColumn();
    this.requestEquipList();
  },
  beforeDestroy() {
    if (this.selectedItem) this.selectedItem.model.selected = false;
  },
};
</script>
