<template>
  <div class="checked-wrapper">
    <div v-for="(item, idx) in list" class="check-item" :key="idx">
      <input
        type="checkbox"
        @change="onChange(idx)"
        :checked="isChecked[idx]"
        v-model="isChecked[idx]"
        :id="item"
      />
      <label :for="item">{{ item }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    checked: Array
  },
  data() {
    return { isChecked: this.checked };
  },
  methods: {
    onChange() { this.$emit("change", this.isChecked); }
  },
  watch: {
    checked(data) {
      this.isChecked = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.checked-wrapper {
  display:grid;
  grid-template-rows:repeat(5, 1fr);
  padding: 10px;
  margin: 5px 0;
  min-height: 300px;
  border: 1px solid #22C1D0;
  border-radius:3px;
  & .check-item {
    margin: 16px 0;
  }
}
</style>
