<template>
    <el-container style="min-height: 100vh; border: 1px solid #eee">
        <el-aside :width="sideWidth + 'px'"
            style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgb(0 21 41/35%)">
            <Aside :is-collapse="isCollapse" :logo-text-show="logoTextShow" :main-title="mainTitle"
                :aside-title_-i="asideTitle_I" :aside-title_-i-i="asideTitle_II" :username="username['username']" />
        </el-aside>

        <el-container>
            <el-header style="border-bottom: 1px solid #ccc;">
                <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse" :username="username['username']"
                    :is-user="false" />
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import newBook from "@/components/newBook";
import modifyBook from "@/components/modifyBook";
import bookDetail from "@/components/bookDetail.vue"
export default {
    name: 'adminHome',
    components: {
        Aside, Header, newBook, modifyBook, bookDetail,
    },
    data() {
        return {
            username: "",

            mainTitle: "图书管理系统",
            asideTitle_I: "书籍管理",
            asideTitle_II: "学生管理",

            newBookVisible: false,
            modifyBookVisible: false,
            tableData: [],
            collapseBtnClass: 'el-icon-s-fold',
            isCollapse: false,
            sideWidth: 200,
            logoTextShow: true,
            show3: true,
            showModal: false,
            iconClass: "el-icon-arrow-down",

            pageNum: 1,
            pageSize: 5,
            total: 0,

            bookID: '',
            bookInfo: '',

            infoDialog: false,//书籍详情：对话触发
            infoId: '',//书籍详情：传入书籍id

            loading: false//目前仅有表格loading
        }
    },
    created() {
        this.username = this.$route.query
        this.load()

    //设置该界面不可返回
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, document.URL);
    })
  },
  
  methods: {
    //点击收缩时触发
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {//收缩状态
        this.sideWidth = 64;
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {//展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
}
</script>

<style>
.preIcon {
    margin-right: 4px;
}

.el-button {
    padding: 7px 9px;
}
</style>