import Vue from 'vue'
import VueRouter from 'vue-router'
import { MessageBox } from 'element-ui'

Vue.use(VueRouter)
Vue.prototype.$msgbox = MessageBox

const routes = [
  {
    path: '/',
    name:'login',
    component: () => import('../views/Login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/info')
  },
  {
    path:'/userInfo',
    name: 'userInfo',
    component: () => import('../views/userInfo')
  },
  {
    path: '/userRegister',
    name: 'userRegister',
    component: () => import('../views/userRegister')
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: () => import('../views/adminHome')
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import('../views/adminLogin')
  },
  {
    path: '/adminInfo',
    name: 'adminInfo',
    component: () => import('../views/adminInfo')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
