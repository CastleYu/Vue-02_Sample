<template>
    <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden;" background-color="rgb(48,65,86)"
        text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false" :collapse="isCollapse">
        <div style="height: 60px;line-height: 60px;text-align: center">
            <img src="../assets/logo.png" alt=""
                style="width: 25px;position: relative;top:7px;margin-right: 4px;margin-left: 4px">
            <b style="color: wheat" v-show="logoTextShow">{{ mainTitle }}</b>
        </div>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">{{ asideTitle_I }}</span>
            </template>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ asideTitle_II }}</span>
            </template>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "Aside",
    props: {
        isCollapse: Boolean,
        logoTextShow: Boolean,
        mainTitle: String,
        asideTitle_I: String,
        asideTitle_II: String
    }
}
</script>

<style scoped></style>