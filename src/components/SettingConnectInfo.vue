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
          <select disabled>
            <option :value="item.key" selected>{{item.key}}</option>
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
    this.init(this.props)
  },
  props: { props: {
    type : Object,
    default : () => ({})
  }, },
  methods : {
    init(data) {
      if(data) {
        if(data.list) {
          const tr_data = Object.values(data.list)
          for(let i = 0; i < 3; i++) {
            this.key_values[i].key = tr_data[i] ? tr_data[i].key : 'none'
            this.key_values[i].value = tr_data[i] ? tr_data[i].value : ''
          }
        }
        if(data.connect) this.connect_type = data.connect
      }
    }
  },
  data() {
    return {
      modeList: ["ssh", "api", "hmac", "gui"],
      key_values : [
        {key : 'none', value : ''},
        {key : 'none', value : ''},
        {key : 'none', value : ''},
      ],
      connect_type : this.props.connect
    };
  },
  watch : {
    props(newProps) {
      this.init(newProps)
    }
  }
};
</script>

<style scoped>
.connect-info {
	 padding: 10px;
	 display: grid;
	 grid-template-columns: 2fr 3fr;
}
 .connect-info li:not(:last-child) {
	 margin-bottom: 10px;
}
 .connect-info .list-title {
	 margin-bottom: 15px;
}
 .connect-info .config-list li {
	 display: grid;
	 grid-gap: 5px;
	 grid-template-columns: 2fr 3fr;
}

</style>
