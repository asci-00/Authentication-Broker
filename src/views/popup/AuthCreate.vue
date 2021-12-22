<template>
  <div class="wrapper">
    <div class="title">신규 등록</div>
    <div class="guide-box">
      <div class="radio">
        <input v-model="infos.type" id="set-internal" type="radio" name="type" value="internal" /><label
          for="set-internal"
          >Internal</label
        >
      </div>
      <div class="radio">
        <input v-model="infos.type" id="set-external" type="radio" name="type" value="external" /><label
          for="set-external"
          >External</label
        >
      </div>
      <input
        type="text"
        name="customer"
        v-show="infos.type === 'external'"
        v-model="infos.customer_name"
        placeholder="고객사명"
      />
    </div>
    <section class="container">
      <div class="inner-container">
        <div class="wrapper">
          <div class="title secondary">필수 정보</div>
          <ul class="list-box info-list">
            <li v-for="(info, idx) in infos.attributes" :key="idx">
              <label :for="info.key">{{ info.label }}</label>
              <input :id="info.key" :placeholder="info.label" v-model="info.value" type="text" />
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
              <li v-for="(type, idx) in connectKey" :key="idx">
                <div class="radio" @click="radioClick(type)">
                  <input v-model="infos.connect_type" :id="type" :value="type" type="radio" name="connect-type" /><label
                    :for="type"
                    >{{ type }}</label
                  >
                </div>
              </li>
            </ul>
            <ul class="list-box config-list">
              <li class="list-title"><span>Key</span><span>Value</span></li>
              <li v-for="(connect, idx) in infos.options" :key="idx">
                <select v-model="connect.key" value="none" :disabled="idx >= key_list.length">
                  <option value="none">none</option>
                  <option
                    v-for="(key, idx) in key_list"
                    :value="key"
                    :disabled="infos.options.map((item) => item.key).includes(key)"
                    :key="idx"
                  >
                    {{ key }}
                  </option>
                </select>
                <input
                  v-model="connect.value"
                  type="text"
                  placeholder="input value"
                  :disabled="connect.key === 'none'"
                />
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
        ::not(:last-child) {
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

<script>
import { OPTION_ATTR_COUNT, connectKey, attributes, defaultValues } from '@/constants/common';
import { getRequestParam } from '@/utils/dataTransform';
import { isValidAuth } from '@/utils/validation';

export default {
  data() {
    return {
      infos: {
        ...defaultValues,
        options: new Array(OPTION_ATTR_COUNT).fill(0).map(() => ({ key: 'none', value: '' })),
        attributes: attributes.map((attr) => ({ ...attr, value: '' })),
      },
      connectKey,
    };
  },
  computed: {
    key_list() {
      return this.connectKey[this.infos.connect_type];
    },
  },
  methods: {
    radioClick(type) {
      this.infos.connect_type = type;
      this.keyInit();
    },
    onsubmit() {
      // 입력 유효성 검증
      if (isValidAuth(this.infos.type, this.infos)) this.$emit('submit', getRequestParam(this.infos));
      else {
        const message =
          this.infos.type === 'internal'
            ? 'IP와 장비이름이<br/>유효하지 않습니다'
            : 'IP와 고객사명이<br/>유효하지 않습니다.';
        this.$alert(undefined, undefined, undefined, { html: message });
      }
    },
    onExit() {
      this.$confirm('취소하시겠습니까?').then(() => this.$emit('close'));
    },
    keyInit() {
      this.infos.options = new Array(OPTION_ATTR_COUNT).fill(0).map(() => ({ key: 'none', value: '' }));
    },
  },
};
</script>
