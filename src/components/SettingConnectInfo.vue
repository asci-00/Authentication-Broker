<template>
  <div class="wrapper secondary">
    <div class="title secondary">접속 정보</div>
    <section class="connect-info">
      <ul class="list-box type-list">
        <li class="list-title">접속 방식</li>
        <li v-for="(type, idx) in modeList" :key="idx">
          <input
            :id="type"
            type="radio"
            name="connect-type"
            :value="type"
            :checked="connect_type === type"
            disabled
          /><label :for="type">{{ type }}</label>
        </li>
      </ul>
      <ul class="list-box config-list">
        <li class="list-title"><span>Key</span><span>Value</span></li>
        <li v-for="(item, idx) in key_values" :key="idx">
          <select :value="item.key" disabled>
            <option :value="item.key">{{item.key}}</option>
          </select>
          <input type="text" placeholder="input value" :value="item.value" disabled/>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.props)
    this.key_values.forEach((item, idx) => {this.key_values[idx] = this.props.list[idx]} )
    console.log(this.key_values)
  },
  props: { props: Object, },
  data() {
    return {
      modeList: ["SSH", "API", "HMAC", "GUI"],
      key_values : [
        {key : 'none', value : ''},
        {key : 'none', value : ''},
        {key : 'none', value : ''},
      ],
      connect_type : this.props.connect
    };
  },
};
</script>

<style lang="scss" scoped>
.connect-info {
  padding: 10px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  & li:not(:last-child) {
    margin-bottom: 10px;
  }

  & .list-title {
    margin-bottom: 15px;
  }
  & .config-list li {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 2fr 3fr;
  }
}
</style>
