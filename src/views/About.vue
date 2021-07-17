<template>
    <div class="wrapper">
        <div class="title">신규 등록</div>
        <div class="guide-msg">Authentication Broker에서 사용할 권한을 {{state.label}}합니다.</div>
        <section class="container">
            <div class="half-container right-border">
                <div class="label-content">
                    <label>권한명</label>
                    <input type="text" placeholder="Input permission name" v-model="name"/>
                </div>
                <div class="label-content">
                    <div>
                        <label>권한 목록</label>
                        <i class="fa fa-plus icon" @click="init()"></i>
                    </div>
                    <div class="permission-list">
                        <ve-table
                            :max-height="300"                            
                            :columns="columns"
                            :table-data="roles"
                            :event-custom-option="{
                                bodyRowEvents : ({row, rowIndex}) => ({click : event => onRowClick(row)})
                            }"
                            row-key-field-name="rowKey"
                            :cell-selection-option="{enable:true}"
                            class="table-wrapper"
                        />
                    </div>
                </div>
            </div>
            <div class="half-container">
                <div class="setting-box">
                    <div class="head-box">
                      <div class="tree-wrap">
                        <h2 class="line-label"><span>권한 목록</span></h2>
                        <v-jstree 
                            :data="tree_data" 
                            allow-batch whole-row 
                            @item-click="itemClick"
                            class="tree"/>
                      </div>
                      <div>
                        <h2 class="line-label"><span>권한</span></h2>
                        <v-check-list :list="perm_list" @change="permChange" :checked="checked"/>
                      </div>
                    </div>
                    <div class="foot-box">
                        <input type="text" v-model="path"/>
                        <input type="button" @click="onApply()" value="적용"/>
                    </div>
                </div>
            </div>
        </section>
        <footer class="button-box">
            <button class="submit">확인</button>
            <button class="reset">취소</button>
        </footer>
    </div>
</template>

<script>
import VJstree from 'vue-jstree'
import VCheckList from '../components/CheckList'
import {permColumns, permission_data, tree_data} from '../modules/static/permission'

export default {
  components : { VJstree, VCheckList }, 
  props : {
    //state : Object,
  },
  data() {
      return {
          console,
          columns : permColumns,
          state : { label : '변경' },
          name : '', path : '',
          tree_data,
          perm_list : ['create', 'delete', 'update', 'read', 'list'],
          checked : [false, false, false, false, false],
          roles : []
      }
  },
  methods : {
    itemClick (item) { 
        this.init()
        let now = item, path = `/${item.model.text}`
        while(now.$parent.model) {
            now = now.$parent
            path = `/${now.model.text}${path}`
        }
        this.path = path
    },
    onRowClick(rowData) {
        this.checked = this.perm_list.map(item => rowData['permission'].includes(item))
        this.path = rowData['path']
    },
    permChange (data) { this.checked = data },
    onApply() {
        if(this.path === "" || !this.checked.includes(true)) {console.log('err')}//error open
        else this.roles.push({
            path : this.path,
            permission : this.perm_list.filter((i, idx) => this.checked[idx])
        })
    },
    init() {
        this.checked = this.perm_list.map(i => false)
        this.path = ""
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width:900px;
    & .guide-msg {
        padding-left:10px;
        margin-bottom:10px;
    }
    & .button-box {
        padding:10px;
        text-align:right;
    }
}
.container {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap : 0;
    border-bottom:1px solid grey;
    
    & .half-container {
        padding:10px;
        &.right-border { border-right:1px solid grey; }
        & .label-content {
            display:grid;
            grid-template-columns: 2fr 6fr;
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
            & .tree {
                margin:5px 0;
                border:1px solid grey;
                height:300px;
                overflow-y:scroll;
            }
        }
        & .foot-box {
            display:grid;
            grid-template-columns: 6fr 2fr;
            grid-gap:10px;
        }
    }   
}
.table-wrapper {
    min-height:300px;
    border:1px solid grey;
}
</style>
