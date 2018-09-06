<template>
    <div>
        <el-container>
            <el-header style="">
                <img class="logo" src="static/logo.png">
                <div class="header-left">
                    <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" @select="handleSelect" background-color="#303133" text-color="#fff" active-text-color="#ffd04b" router>
                        <el-menu-item index="/"> 主页 </el-menu-item>
                        <el-menu-item index="/video"> 影视 </el-menu-item>
                        <el-menu-item index="/ebook">电子书</el-menu-item>
                        <el-menu-item index="/game"> 游戏 </el-menu-item>
                    </el-menu>
                </div>
            </el-header>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: 'mainHeader',
        data() {
            return {
                activeIndex: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            }
        }
    }
</script>
<style>
    .logo {
        position: absolute;
        z-index: 99;
        width: 3rem;
        height: 3rem;
        padding-left: 1rem
    }

    .el-menu-item {
        width: 4.5rem;
        height: 3rem !important;
        line-height: 3rem !important;
        text-align: center
    }

    .el-header {
        height: auto !important;
        background-color: #303133;
        text-align: left;
        font-size: 18px
    }

    .el-menu--horizontal {
        border-bottom: none;
    }

    .header-left {
        float: left;
        padding-left: 5rem
    }

    .el-menu-header {
        overflow: hidden;
        height: 3rem;
    }

    .header-right {
        float: right;
        padding-right: 5rem
    }
</style>