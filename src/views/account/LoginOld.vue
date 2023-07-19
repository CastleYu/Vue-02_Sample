<template>
    <el-container style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <el-card class="floatCard" style="height: 77.5vh;width: 27.5vw;">
        

            <el-form ref="form" :model="form" label-width="120px"
                style="margin: 0 auto;display: flex; align-items: center;">
                <el-form-item label="用户名" class="form-item">
                    <el-input v-model="form.username" class="form-input" />
                </el-form-item>
                <el-form-item label="密码" class="form-item">
                    <el-input type="password" v-model="form.password" class="form-input" prefix-icon="el-icon-search" />
                </el-form-item>
                <el-form-item class="form-item">
                    <el-button type="primary" @click="handleSubmit" style="margin: 0 auto;width: 100%;">登录</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </el-container>
</template>
  
<script>
import router from "@/router";

export default {
    name:'loginView',
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    created() {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", function () {
        history.pushState(null, null, document.URL);
      })
    },
    methods: {
        handleSubmit() {// 在这里添加登录逻辑
            this.$axios.get('/userLoginToSystem?username='
                +this.form.username+'&password='+this.form.password).then(res=>res.data).then(res=>{
              if(res.data==='登录成功') {
                console.log('用户名:', this.form.username);
                console.log('密码:', this.form.password);
                alert("登录成功")
                router.push({path:'/home',query:{username:this.form.username}})
              }else{
                alert("登录失败，请检查用户名或密码是否正确")
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

.floatCard {
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
    /* 水平阴影的位置(+向右) | 垂直阴影的位置(+向下) | 模糊距离 | 阴影色彩 */
    border-radius: 0px
}
</style>
  