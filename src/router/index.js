import Vue from 'vue'
import VueRouter from 'vue-router'
import Customer from '../views/Customer.vue'
import AuthManage from '../views/AuthManage.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: '인증 장비 현황',
    component: Customer
  }, {
    path: '/permission',
    name: '인증 권한 관리',
    component: () => import(/* webpackChunkName: "about" */ '../views/Permission.vue')
  }, {
    path: '/auth',
    name: '인증 정보 관리',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthManage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
