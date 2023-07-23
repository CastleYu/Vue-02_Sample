import Vue from 'vue'
import VueRouter from 'vue-router'
import { MessageBox } from 'element-ui'
import adminBookTable from "@/views/mainTable/adminBookTable";
import adminStudentTable from "@/views/mainTable/adminStudentTable";
import userBookTable from "@/views/mainTable/userBookTable";
import userRestoreTable from "@/views/mainTable/userRestoreTable";

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
        meta:{title:'首页'},
        children: [
            {
                path:'/',
                redirect:'userBookTable',
            },
            {
                path: 'userBookTable',
                meta:{title:'书籍借阅'},
                component: userBookTable
            },
            {
                path:'userRestoreTable',

                component: userRestoreTable
            }
        ],
        // redirect:'home/userBookTable'
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
        meta:{title:'管理员首页'},
        children:[
            {
                path:'/',
                redirect:'adminBookTable',
            },
            {
                path:"adminBookTable",
                component:adminBookTable
            },
            {
                path:"adminStudentTable",
                component:adminStudentTable
            }
        ],
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
