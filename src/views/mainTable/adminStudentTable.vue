<template>
    <div>
        <!-- 分页栏 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 5px 0">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 查询框 -->
        <div style="padding: 10px 0">
            <el-input style="width: 200px;margin-right: 5px" placeholder="学生姓名" prefix-icon="el-icon-document-copy"
                v-model="userName"></el-input>
            <el-button type="primary" @click="findOne" style="margin-right: 25px">精确搜索</el-button>

            <el-input style="width: 450px;margin-right: 5px" placeholder="学生其他信息" prefix-icon="el-icon-search"
                v-model="userInfo"></el-input>
            <el-button type="primary" @click="fuzzySearch">模糊搜索</el-button>
            <el-button type="primary" @click="load">重置</el-button>
        </div>

        <!-- 书籍操作栏 -->
        <div style="padding: 10px 0">
            <el-button type="success" @click="setNewStudentVisible">新增 <i
                    class="el-icon-circle-plus-outline"></i></el-button>
        </div>

        <!-- 新增书籍弹窗 -->
        <new-student :new-student-visible.sync="newStudentVisible"></new-student>
        <modify-student :modify-student-visible.sync="modifyStudentVisible" :u-data="cur_user"></modify-student>

        <!-- 表格内容 -->
        <el-table :data="tableData" border stripe>
            <el-table-column prop="user_id" label="学号"></el-table-column>
            <el-table-column prop="user_name" label="姓名" width="140"></el-table-column>
            <el-table-column prop="user_phone" label="电话" width="120"></el-table-column>
            <el-table-column prop="user_email" label="邮箱"></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="warning" @click="setModifyStudentVisible(scope.row)">修改</el-button>
                    <el-button type="danger" @click="deleteStudent(scope.row)">删除 <i
                            class="el-icon-reading"></i></el-button>
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
import newStudent from "@/components/newStudent";
import modifyStudent from "@/components/modifyStudent";

export default {
    name: "adminStudentTable",
    components: {
        newStudent, modifyStudent
    },
    data() {
        return {
            tableData: [],

            newStudentVisible: false,
            modifyStudentVisible: false,

            pageNum: 1,
            pageSize: 5,
            total: 0,

            userName: '',
            userInfo: '',
            cur_user: {}
        }
    },
    created() {
        this.load()
    },
    methods: {
        //进入界面时触发,加载所有学生信息
        load() {
            this.$axios.get('/findAllUser').then(res => res.data).then(res => {
                //this.tableData = res.data
                this.total = res.data.length
                this.userInfo = ""
                this.userName = ""
                this.handleCurrentChange(1)
                this.handleSizeChange(5)
            })
        },

        //根据学生ID完全匹配查询
        findOne() {
            this.$axios.get('/SearchUser/findOne?user_name=' + this.userName).then(res => {
                this.tableData = res.data
                this.total = res.data.length
            })
        },

        //根据学生相关信息模糊查询
        fuzzySearch() {
            this.$axios.get('/SearchUser/fuzzySearch?pageNum='
                + this.pageNum + '&pageSize=' + this.pageSize + '&searchCond=' + this.userInfo).then(res => {
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

        //变更新增学生弹窗的可见性
        setNewStudentVisible() {
            this.newStudentVisible = !this.newStudentVisible
        },

        //删除某条学生数据
        deleteStudent(row) {
            this.$confirm("确认删除该学生数据?", "提示", {
                iconClass: "el-icon-warning-outline",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                showClose: true,
                type: "warning",
            }).then(() => {
                // 确认操作
                console.log("delete", row.user_id);
                this.$axios.post('/deleteStudent?user_id=' + row.user_id)
                    .then((data) => {
                        // 学生删除成功，刷新表格
                        this.load();
                    })
                    .catch((err) => {
                        // 捕获异常，输出错误信息
                        console.error("删除学生信息失败：", err);
                    });
            }).catch(() => {
                // 取消操作
            });
        },

        //修改学生信息
        setModifyStudentVisible(row) {
            this.modifyStudentVisible = !this.modifyStudentVisible
            this.cur_user = row
        }
    }
}
</script>

<style></style>