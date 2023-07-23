<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden;" background-color="rgb(48,65,86)"
    text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false" :collapse="isCollapse" :router="true">
    <div style="height: 60px;line-height: 60px;text-align: center">
        <img src="../assets/logo.png" alt=""
            style="width: 25px;position: relative;top:7px;margin-right: 4px;margin-left: 4px">
        <b style="color: wheat" v-show="logoTextShow">{{ mainTitle }}</b>
    </div>
    <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>
          <router-link :to="{path:this.path_I,query:{'username':username}}">{{ asideTitle_I }}</router-link>
        </template>
    </el-submenu>
    <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <router-link :to="{path:this.path_II,query:{'username':username}}">{{ asideTitle_II }}</router-link>
        </template>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    username:String,
    isCollapse: Boolean,
    logoTextShow: Boolean,
    mainTitle: String,
    asideTitle_I: String,
    asideTitle_II: String
  },
  data(){
    return{
      path_I:"",
      path_II:""
    }
  },
  created() {
    if(this.mainTitle==="图书管理系统"){
      this.path_I='/adminHome/adminBookTable'
      this.path_II='/adminHome/adminStudentTable'
    } else {
      this.path_I='/home/userBookTable'
      this.path_II='/home/userRestoreTable'
    }
  }
}
</script>

<style>
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
  display: none;
}

.el-submenu>.el-submenu__title .el-submenu__icon-arrow{
  display: none;
}
.router-link-active {
  text-decoration: none;
  color: orange;
}
a{
  text-decoration: none;
  color: grey;
}
</style>