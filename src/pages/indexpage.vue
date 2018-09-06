<template>
    <div>

        <h1>
            WELLCOME
        </h1>
        <img class="home-logo" src="static/logoblack.png">
        <el-footer>© 2018 SkyrimH</el-footer>

    </div>
</template>

<script>
    export default {
        name: 'indexPage',
    }
</script>

<style scoped>
    body {
        overflow-y: scroll !important
    }

    h1 {
        margin-top: 4rem;
        margin-bottom: -3rem;
        color: #303133;
        font-family: "bankgothic md bt";
    }

    .home-logo {
        text-align: center;
        width: 25rem;
        height: 25rem;
    }

    .el-footer {
        position: fixed;
        margin: 0 auto;
        font-size: 0.7rem;
        bottom: 0;
        width: 100%
    }
</style>