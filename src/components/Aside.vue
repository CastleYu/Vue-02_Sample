<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
  >
    <div style="height: 60px;line-height: 60px;text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 25px;position: relative;top:7px;margin-right: 4px;margin-left: 4px">
      <b style="color: wheat" v-show="logoTextShow">图书管理系统</b>
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">书籍借阅</span>
      </template>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">书籍归还</span>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse: Boolean,
    logoTextShow: Boolean
  }
}
</script>

<style scoped>

</style>