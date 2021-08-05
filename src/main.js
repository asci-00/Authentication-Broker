import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSimpleAlert from "vue-simple-alert";

import VModal from 'vue-js-modal'
import VueEasytable from "vue-easytable";
import "vue-easytable/libs/theme-default/index.css";

Vue.config.productionTip = false
Vue.use(VueEasytable)
Vue.use(VueSimpleAlert, {
  customClass : {
    popup:'wrapper',
    content:'content primary',
    confirmButton:'primary',
    cancelButton:'secondary'
  },
  width:300,

  confirmButtonText : '확인',
  cancelButtonText:'취소',

});
Vue.use(VModal, { dynamicDefault: { draggable: false, resizable: false } })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
