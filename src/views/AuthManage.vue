<template>
  <div class="wrapper">
    <div class="title">인증 권한 관리</div>
    <section class="container">
      <div class="half-container">
        <div class="head">
          <div class="inner-box-title">인증 디렉토리 구조 <i class="fa fa-plus icon" @click="openPopup()"></i></div>
          <div class="filter">
            <select v-model="selected">
              <option v-for="(item, idx) in category" :key="idx" :value="item.field">{{item.label}}</option>
            </select>
            <search-bar
              v-model="search"
              placeholder="Search"
              @onsearch="onSearch(search)"/>
          </div>
        </div>
        <v-jstree
          :data="tree_data"
          allow-batch whole-row
          @item-click="itemClick"
          class="tree-wrapper scroll-container"/>
      </div>
      <div class="half-container">
        <div class="inner-box-title" :style="{marginBottom:'10px'}">인증 정보 설정</div>
        <div class="setting-box"><item-add-remove/></div>
      </div>
    </section>
    <modal name="auth-manage-popup" :width="900" :height="542" :classes="['modal']">
      <auth-create
        @submit="onApply"
        @close="closePopup()"
      />
    </modal>
  </div>
</template>

<style lang="scss" scoped>
.container {
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap : 0;
    min-width:960px;
    & .half-container {
        padding:10px;
        width : calc(100% - 20px);
        & .head {
          position:relative;
          margin-bottom:10px;
          & .inner-box-title {
            float:left;
          }
          & .filter {
            position:relative;
            float:right;
          }
          &:after {
            content:" ";
            display:block;
            clear:both;
          }
        }
        & .setting-box {
          margin-bottom:10px;
        }
        & .inner-box-title {
          min-height:35px;
          line-height:35px;
          vertical-align: middle;
        }
    }
    & .foot-box {
      display:grid;
      grid-template-columns: 1fr 3fr;
      & .info-text {
        padding-top:3px;
      }
      & .button-box {
        text-align : right;
      }
    }
}
</style>

<script lang="ts">
import VJstree from 'vue-jstree'
import AuthCreate from './popup/AuthCreate.vue'
import ItemAddRemove from '@/components/ItemAddRemove.vue'
import { tree_data } from '@/modules/static/permission'
import SearchBar from '@/components/SearchBar.vue'

export default {
  components : { VJstree, SearchBar, ItemAddRemove, AuthCreate },
  data() {
    return {
      tree_data,
      category : [
        {field : 'all', label : '전체'},
        {field : 'sub', label : '하위'},
      ],
      selected : 'all', search : '',
      path : '',
    }
  },
  methods : {
    itemClick (item) {
        let now = item, path = `/${item.model.text}`
        while(now.$parent.model) {
            now = now.$parent
            path = `/${now.model.text}${path}`
        }
        console.log(item.model.custom)
        this.path = path
    },
    onApply(data) {

    },
    onSearch(search) { },
    openPopup() { this.$modal.show('auth-manage-popup') },
    closePopup() { this.$modal.hide('auth-manage-popup') }
  },
  created() {
  }
}
</script>
