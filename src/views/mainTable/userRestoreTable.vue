<template>
    <div>
        <!-- 页面路径 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 5px 0">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>借阅管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 查询框
    <div style="padding: 10px 0">
      <el-input style="width: 200px;margin-right: 5px" placeholder="条形码索书号"
                prefix-icon="el-icon-document-copy" v-model="bookID"></el-input>
      <el-button type="primary" @click="findOne" style="margin-right: 25px">精确搜索</el-button>

      <el-input style="width: 450px;margin-right: 5px" placeholder="支持 作品名 / 作者 / 出版商 / ISBN号 查询"
                prefix-icon="el-icon-search" @keyup.enter.native="fuzzySearch" v-model="bookInfo"></el-input>
      <el-button type="primary" @click="fuzzySearch"><i class="el-icon-search preIcon" />模糊搜索</el-button>
      <el-button type="primary" @click="load">重置</el-button>
    </div> -->

        <!-- 表格内容 -->
        <el-table :data="tableData" border stripe v-loading="loading">
            <el-table-column prop="record_id" label="借阅编号" width="140" />
            <el-table-column prop="u_id" label="借阅人ID" width="140" />
            <el-table-column prop="b_id" label="借出书籍索书号" />
            <el-table-column prop="start_time" label="借出日期" />
            <el-table-column prop="end_time" label="归还期限" />
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="primary" @click="infoId = scope.row.b_id; infoDialog = true;">详情</el-button>
                    <el-button type="success" @click="restore(scope.row)"><i
                            class="el-icon-reading preIcon" />归还</el-button>
                    <el-button type="warning" @click="renew(scope.row)">续借</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 表格底部分页栏 -->
        <div style="padding: 10px 0;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <book-detail :book-id.sync="infoId" :show.sync="infoDialog" />
    </div>
</template>

<script>
import bookDetail from "@/components/bookDetail.vue";

export default {
    name: "userRestoreTable",
    components: {
        bookDetail,
    },
    data() {
        return {
            tableData: [],
            userID: "",
            username: "",

            pageNum: 1,
            pageSize: 5,
            total: 0,

            infoDialog: false,//书籍详情：传入的对话触发标志
            infoId: '',//书籍详情：传入书籍id

            loading: false//目前仅有表格loading
        }
    },
    created() {
        this.username = this.$route.query
        this.load()
    },
    methods: {
        load() {//加载所有图书信息
            this.loading = true
            this.$axios.get('/findUserId?username=' + this.username['username']).then(data => data.data).then(data => {
                this.userID = data.data
                this.$axios.get('/BorrowBook/showBorrow?u_id=' + this.userID).then(res => res.data).then(res => {
                    this.tableData = res.data
                    this.total = res.data.length
                    this.loading = false
                })
            })
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
        },
        restore(row) {//点击归还时触发
            this.$confirm("确认归还该书?", "提示", {
                iconClass: "el-icon-question",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                showClose: true,
                type: "info"
            }).then(() => {
                // 确认操作
                console.log("restore", row);
                this.$axios.post('/BorrowBook/returnBorrow', row)
                    .then(() => {
                        this.load()
                    })
                    .catch((err) => {
                        // 捕获异常，输出错误信息
                        console.error("归还书籍失败：", err);
                    });
            }).catch(() => {
                // 取消操作
            });
        },
        renew(row) {
            let t = Date.parse(row.end_time)
            if (t < Date.parse(this.getTime().time)) {
                this.$message.error('未在规定时间内还书，无法续借！')
                return false
            } else {
                let y = new Date().getFullYear()
                let m = new Date().getMonth() + 2
                if (m === 12) {
                    y += 1
                    m = '0' + 1
                } else if (m < 10) {
                    m = '0' + m
                }
                let d = new Date().getDate()
                row.end_time = y + '-' + m + '-' + d
                this.$axios.post('/BorrowBook/renewBorrow', row).then(() => {
                    this.$message.success('续借成功！续借时长：1个月')
                    this.load()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        getTime() {
            //获取当前时间并打印
            let yy = new Date().getFullYear()
            let mm = new Date().getMonth() + 1
            if (mm < 10) mm = '0' + mm
            let dd = new Date().getDate()
            return {
                time: yy + '-' + mm + '-' + dd
            }
        }
    }
}
</script>

<style></style>