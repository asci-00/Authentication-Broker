import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VModal from 'vue-js-modal'
import VueEasytable from "vue-easytable";
import "vue-easytable/libs/theme-default/index.css";
import "@/assets/styles/common.css"



Vue.config.productionTip = false
Vue.use(VueEasytable)
Vue.use(VModal, { dynamicDefault: { draggable: false, resizable: false } })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
