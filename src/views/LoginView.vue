<template>
    <el-container style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <el-card>
            <el-form ref="form" :model="form" label-width="120px"
                style="display: flex; flex-direction: column; align-items: center;">
                <el-form-item label="用户名" class="form-item">
                    <el-input v-model="form.username" class="form-input" />
                </el-form-item>
                <el-form-item label="密码" class="form-item">
                    <el-input type="password" v-model="form.password" class="form-input" />
                </el-form-item>
                <el-form-item class="form-item">
                    <div class="button-container">
                        <el-button type="primary" @click="handleSubmit">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>
</template>
  
<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            // 在这里添加登录逻辑
            console.log('用户名:', this.form.username);
            console.log('密码:', this.form.password);
        }
    }
}
</script>
  
<style scoped>
.el-container {
    background: #f5f7fa;
}

.form-item {
    width: 100%;
}

.form-input {
    width: 50%;
    margin: 10 auto;
}

.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
  