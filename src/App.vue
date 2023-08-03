<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
document.title = "图书管理系统"
</script>

<style>
.el-table th {
    background-color: lightyellow !important;
}

#app {
    font-family: "MiSans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@font-face {
    font-family: 'MiSans';
    src: url('./assets/fonts/MiSans.ttf');
}

@font-face {
    font-family: 'HWZS';
    src: url('./assets/fonts/STZHONGS.TTF');
    font-weight: 300;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.el-textarea__inner {
    font-family: "MiSans" !important;
}
</style>