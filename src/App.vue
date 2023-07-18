<template>
    <div id="app">
        <router-view />
    </div>
</template>

<!-- 表格头部颜色 -->
<style>
.el-table th {
    background-color: lightyellow !important;
}

#app {
    font-family: "MiSans",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: 'MiSans';
  src: url('../src/assets/fonts/MiSans.ttf');
}

</style>