<template>
  <div class="wrapper secondary">
    <div class="title secondary">
      <label>필수 정보</label>
    </div>
    <div class="element">
      <div class="element-item" v-for="(item, index) in items" :key="index">
        <label :for="item.id">{{ item.label }}</label>
        <input type="text" :id="item.label" v-model="item.value" disabled />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.element {
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  & .element-item {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 2fr 3fr;
    & label {
      line-height: 37px;
      vertical-align: middle;
    }
  }
}
</style>

<script>
export default {
  created() {
    this.init(this.props);
  },
  props: {
    props: Object,
  },
  data() {
    return {
      items: [
        { label: 'IP 주소', id: 'ip', value: '' },
        { label: '호스트 이름', id: 'host', value: '' },
        { label: '장비 이름', id: 'equip', value: '' },
        { label: '모델 이름', id: 'model', value: '' },
      ],
    };
  },
  methods: {
    init(data) {
      this.items = this.items.map((item) => ({
        ...item,
        value: data[item.id],
      }));
    },
  },
  watch: {
    props: {
      immediate: true,
      handler(data) {
        this.init(data);
      },
    },
  },
};
</script>
