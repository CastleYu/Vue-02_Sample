import Vue from 'vue'
import VueRouter from 'vue-router'
import { MessageBox } from 'element-ui'

Vue.use(VueRouter)
Vue.prototype.$msgbox = MessageBox

const routes = [
    {
        path: '/',
        redirect: 'login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/account/LoginView.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/info',
        name: 'info',
        component: () => import('../views/info.vue')
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('../views/userInfo.vue')
    },
    {
        path: '/userRegister',
        name: 'userRegister',
        component: () => import('../views/account/Register.vue')
    },
    {
        path: '/adminHome',
        name: 'adminHome',
        component: () => import('../views/adminHome.vue')
    },
    {
        path: '/adminLogin',
        name: 'adminLogin',
        component: () => import('../views/account/adminLogin.vue')
    },
    {
        path: '/adminInfo',
        name: 'adminInfo',
        component: () => import('../views/adminInfo.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
