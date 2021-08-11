import Vue from 'vue'
import VueRouter from 'vue-router'
import Api from 'apis/Api'
Vue.use(VueRouter)

const tokenCheck = () => (from, to, next) => {
  if(Api.defaults.headers['X-Vault-Token'] === null) next('/notfound')
  next()
}

export const routes = [
  {
    path: '/receiver/:token',
    props: true,
    component: () => import('../views/Receiver.vue')
  }, {
    path: '*',
    component: () => import('../views/NotFound.vue')
  }, {
    path: '/',
    name: '인증 장비 현황',
    beforeEnter : tokenCheck(),
    component: () => import('../views/Equipment.vue')
  }, {
    path: '/permission',
    name: '인증 권한 관리',
    beforeEnter : tokenCheck(),
    component: () => import('../views/Permission.vue')
  }, {
    path: '/auth',
    name: '인증 정보 관리',
    beforeEnter : tokenCheck(),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AuthManage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/brokerAdmin/',
  routes
})

export default router
