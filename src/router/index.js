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
        path: '/userRegister',
        name: 'userRegister',
        meta:{title:'用户注册'},
        component: () => import('../views/account/userRegister.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta:{title:'用户登录'},
        component: () => import('../views/account/LoginView.vue')
    },
    {
        path: '/home',
        name: 'home',
        meta:{title:'首页'},
        component: () => import('../views/HomeView.vue')
        
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        meta:{title:'用户信息'},
        component: () => import('../views/userInfo.vue')
    },
    {
        path: '/adminRegister',
        name: 'adminRegister',
        meta:{title:'管理员注册'},
        component: () => import('../views/account/adminRegister.vue')
    },
    {
        path: '/adminLogin',
        name: 'adminLogin',
        meta:{title:'管理员登录'},
        component: () => import('../views/account/adminLogin.vue')
    },
    {
        path: '/adminHome',
        name: 'adminHome',
        meta:{title:'管理员首页'},
        component: () => import('../views/adminHome.vue')
    },
    {
        path: '/adminInfo',
        name: 'adminInfo',
        meta:{title:'管理员信息'},
        component: () => import('../views/adminInfo.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
