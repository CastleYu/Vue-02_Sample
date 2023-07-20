<template>
    <div class="back">
        <div
            style="margin: 200px auto; background-color: #fff; width: 350px; height: 280px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 20px"><b>图 书 借 阅 系 统</b></div>
            <el-form :model="form" ref="userForm">
                <el-form-item prop="username">
                    <el-input size="medium" prefix-icon="el-icon-user" v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" prefix-icon="el-icon-lock" show-password v-model="form.password"
                        placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: left">
                    <el-button style="margin-right: 128px;border: transparent;color:chocolate"
                        @click="$router.push('/adminLogin')">管理员登录</el-button>
                    <el-button style="border: transparent" size="small" autocomplete="off"
                        @click="$router.push('/userRegister')">注册</el-button>
                    <el-button type="primary" size="small" autocomplete="off" @click="handleSubmit">登录</el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import router from "@/router";

export default {
    name: 'loginView',
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
                + this.form.username + '&password=' + this.form.password).then(res => res.data).then(res => {
                    if (res.data === '登录成功') {
                        console.log('用户名:', this.form.username);
                        console.log('密码:', this.form.password);
                        alert("登录成功")
                        router.push({ path: '/home', query: { username: this.form.username } })
                    } else {
                        alert("登录失败，请检查用户名或密码是否正确")
                    }
                })
        }
    }
}
</script>
  
<style scoped>
.back {
    height: 100vh;
    /* background-image: linear-gradient(to top right, #007991, #78ffd6); */
    overflow: hidden;
    transition: background 2s;
    background: #30E8BF;
    background: -webkit-linear-gradient(to bottom right, #FF8235, #30E8BF);
    background: linear-gradient(to bottom right, #FF8235, #30E8BF);
}
</style>
  