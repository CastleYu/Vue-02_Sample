<template>
  <div>
    <el-descriptions class="margin-top" title="管理员详情" :column="3" border>
      <el-descriptions-item><template slot="label">名称</template>{{ user.user_name }}
      </el-descriptions-item>
      <el-descriptions-item><template slot="label">ID</template>{{ user.user_id }}
      </el-descriptions-item>
      <el-descriptions-item><template slot="label">电话号码</template>{{ user.user_phone }}
      </el-descriptions-item>
      <el-descriptions-item><template slot="label">邮箱</template>{{ user.user_email }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "adminInfo",
  data(){
    return {
      user: {
        user_id: 0,
        user_name: "",
        user_pwd: "",
        user_phone: "",
        user_email: ""
      }
    }
  },
  created() {
    let data=this.$route.query
    this.user.user_name=data.username['username']
    this.$axios.get('/findAdminId?username='+this.user.user_name).then(res=>res.data).then(res=>{
      this.user.user_id=res.data});
    this.$axios.get('/findAdminPhone?username='+this.user.user_name).then(res=>res.data).then(res=>{
      this.user.user_phone=res.data});
    this.$axios.get('/findAdminEmail?username='+this.user.user_name).then(res=>res.data).then(res=>{
      this.user.user_email=res.data});
  }
}
</script>

<style scoped>

</style>
