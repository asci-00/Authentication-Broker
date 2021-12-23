import Vue from 'vue';
import VueEasytable from 'vue-easytable';
import 'vue-easytable/libs/theme-default/index.css';
import VModal from 'vue-js-modal';
import VueSimpleAlert from 'vue-simple-alert';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueEasytable);
Vue.use(VueSimpleAlert, {
  customClass: {
    popup: 'wrapper',
    content: 'content primary',
    confirmButton: 'primary',
    cancelButton: 'secondary',
  },
  width: 300,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
});
Vue.use(VModal, { dynamicDefault: { draggable: false, resizable: false } });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
