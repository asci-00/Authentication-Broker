<template>
  <div class="setting">
    <div class="certi-info" v-if="isFile">
      <setting-essential-info :props="data" />
      <div class="div"></div>
      <setting-connect-info :props="data" />
      <div class="right-algin">
        <button class="reset secondary" @click="onDelete">삭제</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.right-algin {
  margin: 10px 0;
  text-align: right;
}
.div {
  margin: 10px 0;
}
</style>

<script>
import SettingConnectInfo from './SettingConnectInfo.vue';
import SettingEssentialInfo from './SettingEssentialInfo.vue';

export default {
  props: { infoList: Object },

  components: { SettingConnectInfo, SettingEssentialInfo },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    onDelete() {
      this.$emit('delete');
    },
    init(data) {
      if (data && data.customerIp) {
        const { customerIp: ip, protocol: connect, model, host, equip } = data;
        const { ...list } = data.list;
        this.data = { ip, connect, model, host, equip, list };
      }
    },
  },
  computed: {
    isFile() {
      return this.infoList && this.infoList.customerIp;
    },
  },
  watch: {
    infoList: {
      immediate: true,
      handler(newData) {
        this.init(newData);
      },
    },
  },
  created() {
    this.init(this.infoList);
  },
};
</script>
