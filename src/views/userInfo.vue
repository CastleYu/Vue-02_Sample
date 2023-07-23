<template>
    <div>
        <el-descriptions class="margin-top" title="用户详情" :column="3" border>
            <el-descriptions-item><template slot="label">用户名</template>{{ user.user_name }}
            </el-descriptions-item>
            <el-descriptions-item><template slot="label">用户ID</template>{{ user.user_id }}
            </el-descriptions-item>
            <el-descriptions-item><template slot="label">电话号码</template>{{ user.user_phone }}
            </el-descriptions-item>
            <el-descriptions-item><template slot="label">邮箱</template>{{ user.user_email }}
            </el-descriptions-item>
        </el-descriptions>
        <el-button @click="setModifyMenuVisible" type="success">修改个人信息</el-button>
        <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" :show-close=false
            :visible.sync="modifyMenuVisible" title="修改个人信息">
            <el-form :rules="rules" ref="userForm" :model="user" size="medium" label-width="100px">
                <el-form-item label="密码" prop="user_pwd">
                    <el-input show-password v-model="user.user_pwd" placeholder="请输入密码" clearable :style="{ width: '100%' }">
                    </el-input>
                </el-form-item>
                <el-form-item label="电话" prop="user_phone">
                    <el-input v-model="user.user_phone" placeholder="请输入电话号码" clearable :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="user_email">
                    <el-input v-model="user.user_email" placeholder="请输入邮箱" clearable :style="{ width: '100%' }">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button @click="onClose">重置</el-button>
            <el-button @click="close">关闭</el-button>
            <el-button @click="modifyInfo">确定</el-button>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "userInfo",
    data() {
        return {
            user: {
                user_id: 0,
                user_name: "",
                user_pwd: "",
                user_phone: "",
                user_email: ""
            },
            modifyMenuVisible: false,
            rules: {
                user_pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                user_phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { len: 11, message: '请输入正确的电话格式', trigger: 'blur' }
                ],
                user_email: [
                    { type: 'string', required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            let data = this.$route.query
            console.log(data)
            this.user.user_name = data.username
            this.$axios.get('/findUserId?username=' + this.user.user_name).then(res => res.data).then(res => {
                this.user.user_id = res.data
            });
            this.$axios.get('/findUserPhone?username=' + this.user.user_name).then(res => res.data).then(res => {
                this.user.user_phone = res.data
            });
            this.$axios.get('/findUserEmail?username=' + this.user.user_name).then(res => res.data).then(res => {
                this.user.user_email = res.data
            });
        },
        onOpen() {
            this.$axios.get('/findUserPwd?username=' + this.user.user_name).then(res => res.data).then((res => {
                this.user.user_pwd = res.data
            }))
        },
        onClose() {
            this.$refs['userForm'].resetFields()
        },
        close() {
            this.setModifyMenuVisible()
        },
        setModifyMenuVisible() {
            this.modifyMenuVisible = !this.modifyMenuVisible
        },
        modifyInfo() {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {  // 表单校验合法
                    this.$axios.post('/modifyStudent', this.user).then(res => {
                        console.log(res.data)
                        this.$message.success('修改成功')
                        this.setModifyMenuVisible()
                        this.load()
                    })
                } else {
                    this.$message.error('输入有误或格式不正确，请检查输入')
                }
            });
        }
    }
}
</script>

<style scoped></style>