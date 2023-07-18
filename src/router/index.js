import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { MessageBox } from 'element-ui'

Vue.use(VueRouter)
Vue.prototype.$msgbox = MessageBox

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting 路由层代码分割
    // this generates a separate chunk (about.[hash].js) for this route 这将为该路由生成一个单独的块`(about.[hash].js)`。
    // which is lazy-loaded when the route is visited. 会在路由被访问时被 "懒加载"。
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
