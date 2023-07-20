<template>
  <div style="font-size: 12px;line-height: 60px;display: flex">
    <div style="flex: 1;font-size:20px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
    </div>
    <el-dropdown trigger="click" v-model="infoMenuVisible" style="cursor: pointer;user-select: none" >
      <span>{{ this.username }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUserInfo">
          <i class="el-icon-warning-outline"></i>个人信息
        </el-dropdown-item>
        <el-dropdown-item @click.native="logOut">
          <i class="el-icon-switch-button"></i>登出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Head",
  data(){
    return{
      infoMenuVisible:true
    }
  },
  props:{
    collapseBtnClass: String,
    collapse: Function,
    username:String
  },
  created() {
    console.log(this.username)
  },
  methods:{
    toUserInfo(){
      this.$router.push({path:'/userInfo',query:{username:this.username}})
      console.log("个人详情log")
    },
    logOut(){
      this.$router.push('/')
      this.username=""
      console.log("退出登录log")
    }
  }
}
</script>

<style scoped>
</style>