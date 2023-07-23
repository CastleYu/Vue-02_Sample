<template>
  <el-container style="min-height: 100vh; border: 1px solid #eee">
    <el-aside
      :width="sideWidth + 'px'"
      style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgb(0 21 41/35%)"
    >
      <Aside
        :is-collapse="isCollapse"
        :logo-text-show="logoTextShow"
        :main-title="mainTitle"
        :aside-title_-i="asideTitle_I"
        :aside-title_-i-i="asideTitle_II"
        :username="username['username']"
      />
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc;">
        <Header
          :collapse-btn-class="collapseBtnClass"
          :collapse="collapse"
          :username="username['username']"
          :is-user="false"
        />
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

        //根据图书相关信息模糊查询
        fuzzySearch() {
            this.$axios.get('/SearchBook/fuzzySearch?pageNum='
                + this.pageNum + '&pageSize=' + this.pageSize + '&searchCond=' + this.bookInfo).then(res => {
                    this.tableData = res.data
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

        //变更新增书籍弹窗的可见性
        setNewBookVisible() {
            this.newBookVisible = !this.newBookVisible
        },

        //删除某条书籍数据
        deleteBook(row) {
            this.$confirm("确认删除该书?", "提示", {
                iconClass: "el-icon-warning-outline",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                showClose: true,
                type: "warning",
            }).then(() => {
                // 确认操作
                console.log("delete", row.book_id);
                this.$axios.post('/deleteBook?book_id=' + row.book_id)
                    .then((data) => {
                        // 书籍删除成功，刷新表格
                        this.load();
                    })
                    .catch((err) => {
                        // 捕获异常，输出错误信息
                        console.error("删除书籍失败：", err);
                    });
            }).catch(() => {
                // 取消操作
            });
        },

        //修改书籍信息
        setModifyBookVisible(row) {
            this.modifyBookVisible = !this.modifyBookVisible
            this.cur_book = row
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