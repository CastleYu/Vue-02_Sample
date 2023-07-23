<template>
    <el-container style="min-height: 100vh;">

        <el-aside :width="sideWidth + 'px'"
            style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgb(0 21 41/35%);">
            <Aside :is-collapse="isCollapse" :logo-text-show="logoTextShow" :main-title="mainTitle"
                :aside-title_-i="asideTitle_I" :aside-title_-i-i="asideTitle_II" :username="username['username']"/>
        </el-aside>

        <el-container>

            <el-header style="border-bottom: 1px solid #ccc;">
                <Header
                    :collapse-btn-class="collapseBtnClass" :collapse="collapse"
                    :username="username['username']" :is-user="true" />
            </el-header>

            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import bookDetail from "@/components/bookDetail.vue"

export default {
    name: 'HomeView',
    components: {
        Aside, Header, bookDetail,
    },
    data() {
        return {
            username: "",

            mainTitle: "图书借阅系统",
            asideTitle_I: "书籍借阅",
            asideTitle_II: "借阅管理",
            tableData: [],
            collapseBtnClass: 'el-icon-s-fold',
            isCollapse: false,
            sideWidth: 200,
            logoTextShow: true,
            show3: true,
            showModal: false,
            iconClass: "el-icon-arrow-down",

      }
    },
    created() {
      this.username=this.$route.query
    },
    watch: { 
        pageNum(news) { load() }
    },
    watch: {
        pageNum(news) { load() }
    },
    methods: {
        collapse() {//点击收缩时触发
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
        },

        load() {//加载所有图书信息
            this.loading = true
            this.$axios.get('/SearchBook/findAll').then(res => {
                this.tableData = res.data
                this.total = res.data.length

                this.bookInfo = ""
                this.bookID = ""
                console.log("载入log")
                this.loading = false

            })
        },
        findOne() {//根据条形码索书号完全匹配查询
            this.$axios.get('/SearchBook/findOne?bookId=' + this.bookID).then(res => {
                this.tableData = res.data
                this.total = res.data.length
                console.log("精确查询log")
            })
        },
        fuzzySearch() {//根据图书相关信息模糊查询
            this.$axios.get('/SearchBook/fuzzySearch?pageNum='
                + this.pageNum + '&pageSize=' + this.pageSize + '&searchCond=' + this.bookInfo).then(res => {
                    this.tableData = res.data
                    console.log("模糊查询log")
                })
        },

        //同步更改一页包含的数据量
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.fuzzySearch()
        },

        //同步更改页码
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            this.fuzzySearch()
        },
        borrow() {//点击借阅时触发

            console.log(this.infoId)
            console.log("借阅log")
        },

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