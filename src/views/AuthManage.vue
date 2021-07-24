<template>
  <div class="wrapper">
    <div class="title">인증 디렉토리 구조</div>
    <section class="container">
      <div class="half-container">
        <div class="head">
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
          class="tree"/>
      </div>
      <div class="half-container">
        <span class="head">인증 정보 설정</span>
        <div class="setting-box"><item-add-remove/></div>
        <div class="foot-box">
          <div class="info-text">Filename</div>
          <div class="button-box">
            <button class="submit">확인</button>
            <button class="reset secondary">취소</button>
          </div>
        </div>
      </div>
    </section>
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
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          margin-bottom:10px;
          & .filter {
            display:grid;
            grid-template-columns: 1fr 2fr;
          }
        }
        & .setting-box {
          margin-bottom:10px;
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
.tree { min-height:300px;}
</style>

<script lang="ts">
import VJstree from 'vue-jstree'
import { tree_data } from '@/modules/static/permission'
import SearchBar from '@/components/SearchBar.vue'
import ItemAddRemove from '@/components/ItemAddRemove.vue'
export default {
  components : { VJstree, SearchBar, ItemAddRemove }, 
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
        console.log(item)
        let now = item, path = `/${item.model.text}`
        while(now.$parent.model) {
            now = now.$parent
            path = `/${now.model.text}${path}`
        }
        this.path = path
    },
    onSearch(search) { }
  },
  created() {
  }
}
</script>
