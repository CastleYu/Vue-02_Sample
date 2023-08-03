<template>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" :show-close=false
        :visible.sync="modifyStudentVisible" title="修改学生信息">
        <el-form :rules="rules" ref="elForm" :model="studentData" size="medium" label-width="100px">
            <el-form-item label="名称" prop="user_name">{{ uData.user_name }}
            </el-form-item>
            <el-form-item label="密码" prop="user_pwd">
                <el-input show-password v-model="uData.user_pwd" placeholder="请输入密码" clearable :style="{ width: '100%' }">
                </el-input>
            </el-form-item>
            <el-form-item label="ID" prop="user_id">{{ uData.user_id }}
            </el-form-item>
            <el-form-item label="电话" prop="user_phone">
                <el-input v-model="uData.user_phone" placeholder="请输入电话" clearable :style="{ width: '100%' }">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="user_email">
                <el-input v-model="uData.user_email" placeholder="请输入邮箱" clearable :style="{ width: '100%' }">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="info" @click="onClose" style="margin-right: 150px">重置</el-button>
            <el-button @click="close">关闭</el-button>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "modifyStudent",
    props: {
        modifyStudentVisible: Boolean,
        uData: Object
    },
    data() {
        return {
            studentData: {
                user_id: null
            },
            rules: {
                user_name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                user_pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { required: true, min: 6, message: '密码至少为6位', trigger: 'blur' }
                ],
                user_phone: [
                    { required: true, message: '电话不能为空', trigger: 'blur' },
                    { len: 11, required: true, message: '请输入正确的电话格式', trigger: 'blur' }
                ],
                user_email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', required: true, message: '请输入正确的邮箱格式', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        handleConfirm() {
            console.log(this.studentData)
            this.$axios.post('/modifyStudent', this.studentData).then(res => {
                this.$message.success('修改成功')
                this.$parent.load()
            }).catch(err => {
                console.log(err)
            })
        },
        onOpen() {
            this.studentData = this.uData
        },
        onClose() {
            this.$refs['elForm'].resetFields()
        },
        close() {
            this.$emit('update:modifyStudentVisible', false)
        },
    }
}
</script>

<style></style>