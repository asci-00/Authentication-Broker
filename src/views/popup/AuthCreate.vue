<template>
  <div class="wrapper">
    <div class="title">신규 등록</div>
    <div class="guide-box">
      <div class="radio">
        <input
          v-model="infos.type"
          id="set-internal"
          type="radio"
          name="type"
          value="internal"
        /><label for="set-internal">Internal</label>
      </div>
      <div class="radio">
        <input
          v-model="infos.type"
          id="set-external"
          type="radio"
          name="type"
          value="external"
        /><label for="set-external">External</label>
      </div>
      <input type="text" name="customer" v-show="infos.type === 'external'" v-model="infos.customer_name" placeholder="고객사명"/>
    </div>
    <section class="container">
      <div class="inner-container">
        <div class="wrapper">
          <div class="title secondary">필수 정보</div>
          <ul class="list-box info-list">
            <li v-for="(info, idx) in infos.required_info" :key="idx">
              <label :for="info.key">{{info.label}}</label>
              <input :id="info.key" :placeholder="info.label" v-model="info.value" type="text"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="inner-container">
        <div class="wrapper">
          <div class="title secondary">접속 정보</div>
          <section class="connect-info">
            <ul class="list-box type-list">
              <li class="list-title">접속 방식</li>
              <li v-for="(type, idx) in connection" :key="idx">
                <div class="radio" @click="radioClick(type)">
                  <input
                    v-model="infos.connect_type"
                    :id="type"
                    :value="type"
                    type="radio"
                    name="connect-type"
                  /><label :for="type">{{type}}</label>
                </div>
              </li>
            </ul>
            <ul class="list-box config-list">
              <li class="list-title"><span>Key</span><span>Value</span></li>
              <li v-for="(connect, idx) in infos.connect_info" :key="idx">
                <select v-model="connect.key" value="none">
                  <option value="none">none</option>
                  <option
                    v-for="(key, idx) in connect_keys"
                    :value="key"
                    :disabled="infos.connect_info.map(item=>item.key).includes(key)"
                    :key="idx">{{key}}</option>
                </select>
                <input v-model="connect.value" type="text" placeholder="input value" :disabled="connect.key === 'none'"/>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
    <footer class="button-box">
      <button class="primary" @click="onsubmit()">확인</button>
      <button class="secondary" @click="onExit()">취소</button>
    </footer>
  </div>
</template>

<script>
import { connect_keys } from '@/modules/static/common'
import { getRequestParam } from '@/modules/static/dataTransform'
export default {
  data() {
    return {
      infos: {
        type: 'internal',
        required_info: [
          { key: "ip", value: "", label: "IP 주소" },
          { key: "equip", value: "", label: "장비 이름" },
          { key: "host", value: "", label: "호스트 이름" },
          { key: "model", value: "", label: "모델 이름" },
        ],
        connect_type : 'ssh',
        connect_info: [
          {key : 'none', value : ''},
          {key : 'none', value : ''},
          {key : 'none', value : ''}
        ],
        customer_name : '',
        path : ''
      },
      connection : ['ssh', 'api', 'hmac', 'gui'],
      connect_keys,
    };
  },
  methods: {
    isAvailable(type) {
      const [ip, equip] = this.infos.required_info, name = this.infos.customer_name

      if(type === 'internal' && (ip['value'] == '' || equip['value'] == '')) return false
      if(type === 'external' && (ip['value'] == '' || name == '')) return false
      return true
    },
    radioClick(type) { this.infos.connect_type = type },
    onsubmit() {
      //입력 유효성 검증
      if(this.isAvailable(this.infos.type)) {
        //path 생성
        this.$emit("submit", getRequestParam(this.infos))
      }
      else {
        const message = this.infos.type === 'internal' ? 
          'IP와 장비이름이<br/>유효하지 않습니다' :
          'IP와 고객사명이<br/>유효하지 않습니다.'
        this.$alert(undefined,undefined,undefined, {html : message})
      }
    },
    onExit() {
      this.$confirm('취소하시겠습니까?').then(() => this.$emit("close"))
    },
  },
};
</script>

<style scoped>
.guide-box {
	 margin: 10px;
	 height: 40px;
	 line-height: 40px;
	 vertical-align: middle;
	 display: grid;
	 grid-template-columns: repeat(3, 1fr);
	 width: 300px;
}
 .container {
	 display: grid;
	 grid-template-columns: 2fr 3fr;
	 grid-gap: 10px;
	 height: auto;
}
 .container .inner-container {
	 padding: 10px;
}
 .container .inner-container .wrapper {
	 min-height: 300px;
}
 .container .inner-container .info-list {
	 padding: 10px;
}
 .container .inner-container .info-list li {
	 display: grid;
	 grid-template-columns: repeat(2, 1fr);
}
 .container .inner-container .info-list li:not(:last-child) {
	 margin-bottom: 10px;
}
 .container .inner-container .info-list li label {
	 line-height: 37px;
	 vertical-align: middle;
}
 .container .inner-container .connect-info {
	 padding: 10px;
	 display: grid;
	 grid-template-columns: 2fr 3fr;
}
 .container .inner-container .connect-info li:not(:last-child) {
	 margin-bottom: 10px;
}
 .container .inner-container .connect-info .list-title {
	 margin-bottom: 15px;
}
 .container .inner-container .connect-info .config-list li {
	 display: grid;
	 grid-gap: 5px;
	 grid-template-columns: 2fr 3fr;
}

</style>
