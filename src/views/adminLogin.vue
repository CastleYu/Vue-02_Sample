<template>
  <div class="wrapper">
    <div
        style="margin: 200px auto; background-color: #fff; width: 350px; height: 280px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 20px"><b>图 书 管 理 系 统</b></div>
      <el-form :model="form" ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" prefix-icon="el-icon-user" v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" prefix-icon="el-icon-lock" show-password
                    v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: left">
          <el-button style="margin-right: 128px;border: transparent;color:darkcyan" @click="$router.push('/')">用户登录</el-button>
          <el-button style="border: transparent;margin-left: 23px" size="small" autocomplete="off" @click="$router.push('/adminRegister')">注册</el-button>
          <el-button type="primary" size="small" autocomplete="off" @click="handleSubmit">登录</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name:'adminLogin',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit() {// 在这里添加登录逻辑
      this.$axios.get('/adminLoginToSystem?adminname='
          +this.form.username+'&password='+this.form.password).then(res=>res.data).then(res=>{
        if(res.data==='登录成功') {
          console.log('用户名:', this.form.username);
          console.log('密码:', this.form.password);
          this.$message.success('登录成功')
          router.push({path:'/adminHome',query:{username:this.form.username}})
        }else{
          this.$message.error('登录失败，请检查名称或密码是否正确')
        }
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466F, #3F5EAA);
  overflow: hidden;
}
</style>
