<template>
  <div class="setting">
    <div class="certi-info" v-if="infoList && infoList.ip">
      <setting-essential-info :props="infoList" />
      <div class="div"></div>
      <setting-connect-info :props="infoList" />
      <div class="right-algin">
        <button class="reset secondary" @click="onDelete">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import SettingConnectInfo from "./SettingConnectInfo.vue";
import SettingEssentialInfo from "./SettingEssentialInfo.vue";

export default {
  props: { infoList: Object },

  components: { SettingConnectInfo, SettingEssentialInfo },

  methods: {
    onDelete() {
      this.$emit("delete");
    },
  },
};
</script>
<style scoped>
.right-algin {
  margin: 10px 0;
  text-align: right;
}
.div {
  margin: 10px 0;
}
</style>