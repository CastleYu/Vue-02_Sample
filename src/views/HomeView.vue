<template>
    <el-container style="min-height: 100vh; border: 1px solid #eee">

        <el-aside :width="sideWidth + 'px'"
            style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgb(0 21 41/35%); transition:width 0.5s;">
            <Aside :is-collapse="isCollapse" :logo-text-show="logoTextShow" style="transition:width 0.5s;" />
        </el-aside>

        <el-container>
            <el-header style="border-bottom: 1px solid #ccc;">
                <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse" :username="username['username']" />
            </el-header>

            <el-main>
                <!-- 分页栏 -->
                <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 5px 0">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>书籍借阅</el-breadcrumb-item>
                </el-breadcrumb>

                <!-- 查询框 -->
                <div style="padding: 10px 0">
                    <el-input style="width: 200px;margin-right: 5px" placeholder="条形码索书号"
                        prefix-icon="el-icon-document-copy" v-model="bookID"></el-input>
                    <el-button type="primary" @click="findOne" style="margin-right: 25px">精确搜索</el-button>

                    <el-input style="width: 450px;margin-right: 5px" placeholder="支持 作品名 / 作者 / 出版商 / ISBN号 查询"
                        v-model="bookInfo"></el-input>
                    <el-button type="primary" @click="fuzzySearch">模糊搜索</el-button>
                    <el-button type="primary" @click="load">重置</el-button>
                </div>

                <!-- 表格内容 -->
                <el-table :data="tableData" border stripe>
                    <el-table-column prop="book_name" label="书籍名称" width="140" />
                    <el-table-column prop="author" label="作者" width="120" />
                    <el-table-column prop="publisher" label="出版商" />
                    <el-table-column prop="isbn" label="ISBN号" />
                    <el-table-column prop="book_id" label="索书号" />
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button type="primary" @click="showDetail(scope.row);">详情</el-button>
                            <el-button type="success" @click="borrow"><i class="el-icon-reading" /> 借阅</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 表格底部分页栏 -->
                <div style="padding: 10px 0">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="pageNum" :page-sizes="[2, 5, 10, 20]" :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>

                <el-dialog title="书籍详情" :visible.sync="infoDialog" @close="clearDetail" width="27.5vw">
                    <el-descriptions class="margin-top" title="书籍详情" :column="1" border >
                        <el-descriptions-item label="书籍名称">{{ bookData.book_name }}</el-descriptions-item>
                        <el-descriptions-item label="作者">{{ bookData.author }}</el-descriptions-item>
                        <el-descriptions-item label="索书号">{{ bookData.book_id }}</el-descriptions-item>
                        <el-descriptions-item label="ISBN">{{ bookData.isbn }}</el-descriptions-item>
                        <el-descriptions-item label="价格">{{ bookData.price }}</el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions style="margin: 15px;">
                        <el-descriptions-item label="简介">{{ bookData.intro }}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-dialog>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
    name: 'HomeView',
    components: {
        Aside, Header
    },
    data() {
        return {
            username: "",

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

            bookData: {
                book_id: "",
                book_name: "",
                isbn: "",
                author: "",
                intro: "",
                publisher: "",
                price: ""
            },
            infoDialog: false,
        }
    },
    created() {
        this.username = this.$route.query
        this.load()
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
        load() {//进入界面时触发,加载所有图书信息
            this.$axios.get('/SearchBook/findAll').then(res => {
                this.tableData = res.data
                this.total = res.data.length

                this.bookInfo = ""
                this.bookID = ""
                console.log("载入log")
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
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.fuzzySearch()
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            this.fuzzySearch()
        },
        borrow() {//点击借阅时触发

            console.log("借阅log")
        },
        showDetail(row) {
            if (!row.book_id)console.log(row.book_id)
            this.$axios.get('/SearchBook/findOne?bookId=' + row.book_id).then(res => {
                this.bookData = res.data[0]
            })
            console.log("详情log")
            this.infoDialog = true;
        },
        clearDetail(){
            this.bookData={
                book_id: "",
                book_name: "",
                isbn: "",
                author: "",
                intro: "",
                publisher: "",
                price: ""
            }
        }
    }
}
</script>

<style></style>