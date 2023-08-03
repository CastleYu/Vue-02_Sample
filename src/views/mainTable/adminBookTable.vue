<template>
    <div>
        <!-- 分页栏 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 5px 0">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 查询框 -->
        <div style="padding: 10px 0">
            <el-input style="width: 200px;margin-right: 5px" placeholder="条形码索书号" prefix-icon="el-icon-document-copy"
                v-model="bookID"></el-input>
            <el-button type="primary" @click="findOne" style="margin-right: 25px">精确搜索</el-button>

            <el-input style="width: 450px;margin-right: 5px" placeholder="支持 作品名 / 作者 / 出版商 / ISBN号 查询"
                prefix-icon="el-icon-search" v-model="bookInfo"></el-input>
            <el-button type="primary" @click="fuzzySearch">模糊搜索</el-button>
            <el-button type="primary" @click="load">重置</el-button>
        </div>

        <!-- 书籍操作栏 -->
        <div style="padding: 10px 0">
            <el-button type="success" @click="setNewBookVisible">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
        </div>

        <!-- 新增书籍弹窗 -->
        <new-book :new-book-visible.sync="newBookVisible"></new-book>
        <modify-book :modify-book-visible.sync="modifyBookVisible" :b-data="cur_book"></modify-book>

        <!-- 表格内容 -->
        <el-table :data="tableData" border stripe>
            <el-table-column prop="book_name" label="书籍名称" width="140">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="120">
            </el-table-column>
            <el-table-column prop="publisher" label="出版商">
            </el-table-column>
            <el-table-column prop="isbn" label="ISBN号"></el-table-column>
            <el-table-column prop="book_id" label="索书号"></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="warning" @click="setModifyBookVisible(scope.row)">修改</el-button>
                    <el-button type="danger" @click="deleteBook(scope.row)">删除 <i class="el-icon-reading"></i></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 表格底部分页栏 -->
        <div style="padding: 10px 0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

import newBook from "@/components/newBook";
import modifyBook from "@/components/modifyBook";

export default {
    name: "adminBookTable",
    components: {
        newBook, modifyBook
    },
    data() {
        return {
            tableData: [],

            newBookVisible: false,
            modifyBookVisible: false,

            pageNum: 1,
            pageSize: 5,
            total: 0,

            bookID: '',
            bookInfo: '',
            cur_book: {}
        }
    },
    created() {
        console.log(this.$route.query)
        this.load()
    },
    methods: {
        //进入界面时触发,加载所有图书信息
        load() {
            this.$axios.get('/SearchBook/findAll').then(res => {
                //this.tableData = res.data
                this.total = res.data.length
                this.bookInfo = ""
                this.bookID = ""
                this.handleCurrentChange(1)
                this.handleSizeChange(5)
            })
        },

        //根据条形码索书号完全匹配查询
        findOne() {
            this.$axios.get('/SearchBook/findOne?bookId=' + this.bookID).then(res => {
                this.tableData = res.data
                this.total = res.data.length
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

<style scoped></style>