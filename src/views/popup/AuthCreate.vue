<template>
  <div class="wrapper">
    <div class="title">신규 등록</div>
    <div class="guide-box">
      <div>
        <input
          v-model="infos.type"
          id="set-internal"
          type="radio"
          name="type"
          value="internal"
        /><label for="set-internal">Internal</label>
      </div>
      <div>
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
                <input
                  :id="type"
                  :value="type"
                  type="radio"
                  name="connect-type"
                  v-model="infos.connect_type"
                /><label :for="type">{{type}}</label>
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
    <warning
      :submit="modal_reset"
      :reset="modal_submit"
      :name="modal_name"
      :message="`취소하시겠습니까?`"
      @click="modal_onSubmit()"
      @close="modal_onExit()"
    />
  </div>
</template>

<script>
import Warning from "@/components/Warning";

export default {
  components: { Warning },
  props: {
    //state : Object,
  },
  data() {
    return {
      modal_name: "auth-create-modal-depth-1",
      modal_reset: true,
      modal_submit: true,
      infos: {
        type: 'internal',
        required_info: [
          { key: "ip", value: "", label: "IP 주소" },
          { key: "equip", value: "", label: "장비 이름" },
          { key: "host", value: "", label: "호스트 이름" },
          { key: "model", value: "", label: "모델 이름" },
        ],
        connect_type : 'SSH',
        connect_info: [
          {key : 'none', value : ''},
          {key : 'none', value : ''},
          {key : 'none', value : ''}
        ],
        customer_name : '',
        path : ''
      },
      connection : ['SSH', 'API', 'HMAC', 'GUI'],
      connect_keys : ['ID', 'Password', 'key_MAC', 'token_MAC'],
    };
  },
  computed : {
  },
  methods: {
    isAvailable(type) {
      const [ip, equip] = this.infos.required_info, name = this.infos.customer_name

      if(type === 'internal' && (ip['value'] == '' || equip['value'] == '')) return false
      if(type === 'external' && (ip['value'] == '' || name == '')) return false
      return true
    },
    onsubmit() {
      //입력 유효성 검증
      if(this.isAvailable(this.infos.type)) {
        //path 생성
        if(this.infos.type === 'internal')  
          this.infos.path = this.infos.required_info[1]['value']
        else 
          this.infos.path = this.infos.customer_name + `/${this.infos.connect_type}:${this.infos.required_info[0]['value']}`
        //key-value 생성
        const reqData = {data : {}}
        this.infos.required_info.forEach(item => {
          if(item['value'] !== '') reqData['data'][item['key']] = item['value']
        })
        this.infos.connect_info.forEach(item => {
          if(item['key'] !== 'none' && item['value'] !== '') 
            reqData['data'][item['key']] = item['value']
        })
        this.$emit("submit", {...this.infos, reqData})
      }
      else {
        console.log('is not avail')
      }
    },
    onExit() {
      this.$modal.show(this.modal_name);
    },
    modal_onSubmit() {
      this.$modal.hide(this.modal_name);
      this.$emit("close");
    },
    modal_onExit() {
      this.$modal.hide(this.modal_name);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  & .inner-container {
    padding: 10px;
    & .wrapper {
      min-height: 300px;
    }
    & .info-list {
      padding: 10px;
      & li {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        & label {
          line-height: 37px;
          vertical-align: middle;
        }
      }
    }
    & .connect-info {
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
  }
}
</style>
