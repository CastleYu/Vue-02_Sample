<template>
    <div class="back">
        <div class="floatCard"
            style="margin: 200px auto; background-color: #fff; width: 360px; height: 280px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 20px"><b>{{title}}</b></div>
            <el-form :model="form" ref="userForm">

                <el-form-item prop="username">
                    <el-input size="medium" prefix-icon="el-icon-user" v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input size="medium" prefix-icon="el-icon-lock" show-password v-model="form.password"
                        @keyup.enter.native="handleSubmit" placeholder="密码"></el-input>
                </el-form-item>

                <el-form-item style="margin: 10px 0;">
                    <el-button style="border: transparent;color:chocolate;float: left;"
                        @click="$router.push('/adminLogin')">管理员登录</el-button>
                    <el-button style="border: transparent;float: right" type="primary" size="small" autocomplete="off"
                        @click="handleSubmit">登录</el-button>
                    <el-button style="border: transparent;float: right" size="small" autocomplete="off"
                        @click="$router.push('/userRegister')">注册</el-button>
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
                username: "",
                password: "",
            },
            title:"图 书 借 阅 系 统",
        };
    },
    created() {
        //设置该界面禁止返回
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function () {
            history.pushState(null, null, document.URL);
        })
    },
    methods: {
        handleSubmit() {// 在这里添加登录逻辑
            this.$message("正在登录")
            this.$axios.get('/userLoginToSystem?username='
                + this.form.username + "&password=" + this.form.password).then(res => res.data).then(res => {
                    if (res.data === '登录成功') {
                        console.log('用户名:', this.form.username);
                        console.log('密码:', this.form.password);
                        this.$message.success("登录成功")
                        router.push({ path: '/home', query: { username: this.form.username } })
                    } else {
                        this.$message.error("登录失败，请检查用户名或密码是否正确")
                    }
                });
        },
    },
}
</script>
  
<style scoped>
.back {
    height: 100vh;
    overflow: hidden;
    background: #30E8BF;
    background: -webkit-linear-gradient(to bottom right, #FF8235, #30E8BF);
    background: linear-gradient(to bottom right, #FF8235, #30E8BF);
    margin: 0;
}

.floatCard {
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
    /* 水平阴影的位置(+向右) | 垂直阴影的位置(+向下) | 模糊距离 | 阴影色彩 */
    border-radius: 10px
}
</style>
  