<template>
  <el-dialog
      v-bind="$attrs" v-on="$listeners"
      @open="onOpen" @close="onClose" :show-close=false
      :visible.sync="newStudentVisible" title="新增账号">
    <el-form :rules="rules" ref="elForm" :model="studentData" size="medium" label-width="100px">
      <el-form-item label="名称" prop="user_name">
        <el-input v-model="studentData.user_name" placeholder="请输入账号名称" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_pwd" >
        <el-input show-password v-model="studentData.user_pwd" placeholder="请输入账号登录密码" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="电话" prop="user_phone">
        <el-input v-model="studentData.user_phone" placeholder="请输入账号电话" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="user_email">
        <el-input v-model="studentData.user_email" placeholder="请输入账号邮箱" clearable :style="{width: '100%'}">
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
  name: "newStudent",
  props:{
    newStudentVisible: Boolean
  },
  data(){
    return{
      studentData:{
        user_id:null
      },
      rules:{
        user_name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        user_pwd:[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { required: true, min:6, message: '密码至少为6位', trigger: 'blur'}
        ],
        user_phone:[
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { len:11, required: true, message: '请输入正确的电话格式', trigger: 'blur' }
        ],
        user_email:[
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type:'email', required: true, message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
    handleConfirm(){
      this.$refs['elForm'].validate(valid=>{
        if(valid){
          this.$axios.get('/findUserName?username='+this.studentData.user_name).then(res=>{
            console.log(res.data)
            if(res.data.length>0) {
              this.$message.error('账号名称不唯一,请重新编辑账号名称')
            } else {
              this.$axios.post('/userRegisterAccount',this.studentData)
              this.$message.success('添加成功')
              this.$emit('load')
            }
          }).catch(err=>{
            console.log(err)
          })
        } else {
          this.$message.error('输入存在问题，请检查')
        }
      })
    },
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:newStudentVisible', false)
    },
  }
}
</script>

<style>

</style>