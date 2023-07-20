<template>
    <div class="back" :style="{ background: background }">
        <div class="floatCard" style="margin: 20vh auto; 
            background-color: #fff;
            width: 410px; height: 400px;
            padding: 50px;">
            <div style="margin: 20px 0; text-align: center; font-size: 24px; font-family: HWZS; font-weight: 200;"><b>
                    图书管理系统 </b></div>

            <el-form :model="user" :rules="rules" ref="userForm" style="margin: 1em auto 1em;">
                <el-form-item prop="username">
                    <el-input size="medium" prefix-icon="el-icon-user" v-model="user.username"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input size="medium" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                </el-form-item>

                <el-form-item style="margin: 10px 0; text-align: right;">
                    <el-button type="warning" size="small" autocomplete="off"
                        @click="$router.push('/register')">注册</el-button>
                    <el-button type="primary" size="small" style="text-align: center;"  @click="$router.push('/front')">登录</el-button>
                    <el-button type="success" size="small" style="text-align: center;" @click="toggleBackground">按钮</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
import { setRoutes } from "@/router";

export default {
    name: "Login",
    data() {
        return {
            user: {},
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
            },

            background: 'linear-gradient(to bottom right, #FF8235, #30E8BF)'
        }
    },
    methods: {
        login() {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {  // 表单校验合法
                    this.request.post("/user/login", this.user).then(res => {
                        if (res.code === '200') {
                            localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
                            localStorage.setItem("menus", JSON.stringify(res.data.menus))  // 存储用户信息到浏览器
                            // 动态设置当前用户的路由
                            setRoutes()
                            this.$message.success("登录成功")

                            if (res.data.role === 'ROLE_STUDENT') {
                                this.$router.push("/front/home")
                            } else {
                                this.$router.push("/")
                            }
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            });
        },
        toggleBackground() {
            if (this.background === 'linear-gradient(to bottom right, #FF8235, #30E8BF)') {;
                this.background = 'linear-gradient(to bottom right, #007991, #78ffd6)';
            } else {
                this.background = 'linear-gradient(to bottom right, #FF8235, #30E8BF)'
            }
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
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom right, #FF8235, #30E8BF);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom right, #FF8235, #30E8BF);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.floatCard {
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
    /* 水平阴影的位置(+向右) | 垂直阴影的位置(+向下) | 模糊距离 | 阴影色彩 */
    border-radius: 10px
}
</style>
