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
  src: url('./assets/fonts/MiSans.ttf');
}
@font-face {
  font-family: 'HWZS';
  src: url('./assets/fonts/STZHONGS.TTF');  /* 根据你的字体文件类型和位置调整 */
  font-weight: 300;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

</style>