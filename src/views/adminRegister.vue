<template>
  <div class="wrapper">
    <div style="margin: 150px auto; background-color: #fff; width: 350px; height: 400px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>管 理 员 注 册</b></div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="admin_name">
          <el-input placeholder="请输入账号" size="medium" prefix-icon="el-icon-user" v-model="user.admin_name"></el-input>
        </el-form-item>
        <el-form-item prop="admin_pwd">
          <el-input placeholder="请输入密码" size="medium" prefix-icon="el-icon-lock" show-password v-model="user.admin_pwd"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="请确认密码" size="medium" prefix-icon="el-icon-lock" show-password v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item prop="admin_phone">
          <el-input placeholder="请输入电话号码" size="medium" prefix-icon="el-icon-phone" v-model="user.admin_phone"></el-input>
        </el-form-item>
        <el-form-item prop="admin_email">
          <el-input placeholder="请输入邮箱" size="medium" prefix-icon="el-icon-message" v-model="user.admin_email"></el-input>
        </el-form-item>
        <el-form-item style="margin: 5px 0; text-align: right">
          <el-button type="primary" size="small"  autocomplete="off" @click="login" style="margin-top: 10px">注册</el-button>
          <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/')">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminRegister",
  data() {
    return {
      user: {},
      rules: {
        admin_name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        admin_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        confirmPassword:[
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        admin_phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { len:11, message: '请输入正确的电话格式', trigger: 'blur' }
        ],
        admin_email: [
          { type:'string', required: true, message: '请输入邮箱', trigger: 'blur' },
          { type:'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if (this.user.admin_pwd !== this.user.confirmPassword) {
            this.$message.error("两次输入的密码不一致")
            return false
          }
          this.user.admin_id=null
          delete this.user['confirmPassword']
          this.$axios.post("/adminRegisterAccount",this.user).then(res => {
            this.$message.success("注册成功")
          }).catch(err=>{
            console.log(err)
          })
        }
      });
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
  overflow: hidden;
}
</style>
