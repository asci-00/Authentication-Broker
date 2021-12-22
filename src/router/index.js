import Api from '@/apis/Api';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const tokenCheck = () => (from, to, next) => {
  if (!Api.defaults.headers['X-Vault-Token']) next('/notfound');
  next();
};

export const routes = [
  {
    path: '/receiver/:token',
    props: true,
    component: () => import('../views/Receiver.vue'),
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/',
    name: '인증 장비 현황',
    beforeEnter: tokenCheck(),
    component: () => import('../views/EquipmentStatus.vue'),
  },
  {
    path: '/permission',
    name: '인증 권한 관리',
    beforeEnter: tokenCheck(),
    component: () => import('../views/Permission.vue'),
  },
  {
    path: '/auth',
    name: '인증 정보 관리',
    beforeEnter: tokenCheck(),
    component: () => import('../views/AuthManage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
