<template>
  <div class="table-wrapper">
    <div class="table-toolbar">
      <div class="filter">
        <select v-model="selected">
          <option v-for="(item, idx) in t_category" :key="idx" :value="item.field">{{item.label}}</option>
        </select>
        <search-bar 
          v-model="search" 
          placeholder="Search"
          @onsearch="onSearch(search)"
          :width="200"
        />
      </div>
      <hr/>
      <input 
        v-for="(button, idx) in buttons"
        type="button" 
        :value="button.label || '버튼'"
        :key="idx"/>
    </div>
    <ve-table 
      :columns="columns" 
      :table-data="tableData"
      />
    <div class="table-pagination">
      <ve-pagination
        :total="searchedData.length"
        :page-index="pageIndex"
        :page-size="pageSize"
        :layout="['prev', 'pager', 'next', 'sizer', 'jumper']"
        :pagingCount="2"
        @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  min-width:1080px;
}
.table-toolbar {
  text-align:left;
}
.table-pagination {
  margin-top: 20px;
  text-align: left;
}
.filter {
  width:300px;
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-gap:10px;
}
</style>

<script>
  import SearchBar from './SearchBar.vue'
  // Simulation table data from database

  const filteringData = (object, filter) => {
    for(const value of Object.values(object)) {
      if(typeof filter === typeof value /* value */ && value.includes(filter)) return true
    }
    return false
  }

  export default {
    components : { SearchBar, },
    props : {
      category : Array,
      columns : Array,
      buttons : Array,
      data : Array,
    },
    data() {
      return {
        search : '',
        searchedData : [],
        selected : '',
        t_category : [],
        pageIndex: 1, pageSize: 10, // page index / page size
      };
    },
    computed: {
      // table data
      tableData() {
        const { pageIndex, pageSize } = this;
        return this.searchedData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
      },
    },
    created() { 
      this.searchedData = this.data 
      this.t_category = [{label : "전체", field : "all"}, ...this.category]
      this.selected = "all"
    },
    methods: {
      // page number change
      pageNumberChange(pageIndex) {
        this.pageIndex = pageIndex;
      },
      // page size change
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
      },
      onSearch(search) {
        const { selected, data } = this
        this.pageIndex = 1
        if(selected !== "all") {
          const selected_category = this.category.find(item => item.field === selected)
          if(selected_category.filter_func) {
            this.searchedData = this.data.filter(item => selected_category.filter_func(item, search))
          }
          else this.searchedData = this.data.filter(item => item[selected].includes(search))
        } else this.searchedData = this.data.filter(item => filteringData(item, search))
      }
    }
  };
</script>