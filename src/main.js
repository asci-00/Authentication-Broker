import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueEasytable from "vue-easytable";
import "vue-easytable/libs/theme-default/index.css";
import "@/assets/styles/common.css"

Vue.config.productionTip = false
Vue.use(VueEasytable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
