<template>
    <div class="wrapper">
        <div class="title">{{title}}</div>
        <div class="guide-msg">{{guideMessage}}</div>
        <section class="left-container">
            <div class="inner-container right-border">
                <div class="label-content">
                    <label>권한명</label>
                    <input type="text" placeholder="Input permission name" v-model="per_name"/>
                </div>
                <div class="label-content">
                    <div>
                        <label>권한 목록</label>
                        <i class="fa fa-plus icon" @click="init()"></i>
                    </div>
                    <div class="table-container">
                        <ve-table
                            :max-height="300"
                            :columns="columns"
                            :table-data="roles"
                            :event-custom-option="{
                                bodyRowEvents : ({row, rowIndex}) => ({click : event => onRowClick(row, rowIndex)})
                            }"
                            row-key-field-name="rowKey"
                            :cell-selection-option="{enable:true}"
                            class="table-wrapper modal-table"
                        />
                    </div>
                </div>
            </div>
            <div class="inner-container">
                <div class="setting-box">
                    <div class="head-box">
                      <div class="tree-wrap">
                        <h2 class="line-label"><span>인증 디렉토리</span></h2>
                        <v-jstree
                            :data="tree_data"
                            allow-batch whole-row
                            @item-click="itemClick"
                            class="tree-wrapper scroll-container modal-tree"
                            v-if="tree_data.length"
                            />
                      </div>
                      <div>
                        <h2 class="line-label"><span>권한</span></h2>
                        <v-check-list :list="perm_list" @change="permChange" :checked="checked"/>
                      </div>
                    </div>
                    <footer class="foot-box">
                        <input type="text" v-model="path" placeholder="input path"/>
                        <input type="button" @click="onApply()" value="적용" class="primary"/>
                    </footer>
                </div>
            </div>
        </section>
        <footer class="button-box">
            <button class="primary" @click="onsubmit()">확인</button>
            <button class="secondary" @click="onExit()">취소</button>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width:900px;
    & .guide-msg {
        padding-left:10px;
        margin-bottom:10px;
    }
}
.left-container {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap : 0;
    border-bottom:1px solid grey;

    & .inner-container {
        padding:10px;
        &.right-border { border-right:1px solid grey; }
        & .label-content {
            display:grid;
            grid-template-columns: 90px auto;
            margin-bottom:20px;
            & .icon {
                display:inline-block;
                margin-left:5px;
            }
        }
        & .head-box {
            display:grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap:10px;
        }
        & .foot-box {
            display:grid;
            grid-template-columns: 6fr 2fr;
            grid-gap:10px;
        }
    }
}
.table-wrapper { min-height:310px; border-bottom:1px solid grey; }
</style>

<script>
import VJstree from 'vue-jstree'
import VCheckList from '@/components/CheckList'
import { permColumns } from '@/modules/static/permission'
import { objectToTree, objectToHCL } from "@/modules/static/dataTransform";
import * as Api from '@/apis/equipment.js'

export default {
  components : { VJstree, VCheckList },
  props : {
    title : String,
    guideMessage : String,
    name : String,
    role : {
        type : Array,
        default : () => []
    },
    isNew : Boolean,
  },
  data() {
      return {
        columns : permColumns,
        per_name : this.name, path : '',
        tree_data : [],
        perm_list : ['create', 'delete', 'update', 'read'],
        checked : [false, false, false, false],
        roles : this.role,
        selectedItem : null,
        selectedPathIdx : null
      }
  },
  methods : {
    itemClick (node) {
        this.selectedItem = node
        let now = node, path = `/${node.model.text}`
        while(now.$parent.model) {
            now = now.$parent
            path = `/${now.model.text}${path}`
        }
        this.path = path
    },
    onRowClick(rowData, idx) {
        this.selectedPathIdx = idx
        this.checked = this.perm_list.map(item => rowData['capabilities'].includes(item))
        this.path = rowData['path']
    },
    permChange (data) { this.checked = data },
    onApply() {
        if(this.path === "" || !this.checked.includes(true)) this.$alert('필수항목을 입력해주십시오', 'Warning')
        else {
            if(this.selectedPathIdx) {
                this.roles[this.selectedPathIdx] = {
                    path : this.path,
                    capabilities : this.perm_list.filter((i, idx) => this.checked[idx])
                }
            } else {
                this.roles.push({
                    path : this.path.substr(1),
                    capabilities : this.perm_list.filter((i, idx) => this.checked[idx])
                })
            }
        }
        this.init()
    },
    init() {
        this.checked = this.perm_list.map(() => false)
        if(this.selectedItem) this.selectedItem.model.selected = false
        this.selectedItem = null
        this.selectedPathIdx = null
        this.path = ""
    },
    onsubmit() {
        if(this.per_name && this.roles.length) {
            this.roles = this.roles.map(item => ({
                path : item.path,
                capabilities : (item.capabilities.includes('read') && !item.capabilities.includes('list') ? 
                item.capabilities.concat('list') : item.capabilities)
            }))
            this.$emit('submit', {name : this.per_name, data : objectToHCL(this.roles), isNew: this.isNew})
        }
        else this.$alert(undefined,undefined,undefined, {html : '권한명과 하나 이상의<br/> 권한이 필요합니다'})
    },
    onDelete(idx) { this.roles.splice(idx, 1) },
    onExit() {
        this.$confirm('취소하시겠습니까?').then(() => this.$emit('close'))
    },
  },
  created() {
      const _vm = this

      this.columns = [...this.columns, {
      key : '2', field : 'buttons', title : '', align:'right', width: 20,
      renderBodyCell: ({ rowIndex }, h) => {
        return h( "input", {
                attrs: { type: "button", value: "X", class:'small secondary' },
                on: {
                  click: function(ev) {
                    ev.stopPropagation()
                    _vm.onDelete(rowIndex)
                  }
                }
              }, []
            )
      }
    }]

    Api.getTreeEquipList().then(res => {
      this.tree_data = objectToTree(res.data)
    }).catch((err) => {
        const message = (err.rt === 403 ? '세션이 유효하지 않습니다.' : '관리자에게 문의해주세요')
        this.$alert(message, 'Error')
    })
  },
  beforeDestroy() {
    if(this.selectedItem) this.selectedItem.model.selected = false
  }
}
</script>
