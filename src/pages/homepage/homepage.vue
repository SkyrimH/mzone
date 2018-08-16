<template>
    <div>
        <h1>
            WELLCOME
        </h1>
        <img class="home-logo" src="static/logoblack.png">
    </div>
</template>

<script>
    export default {
        name: 'homePage',
        components: {

        },
        methods: {
            orientate() {
                if (global.orientation === 0) {
                    alert('建议横屏浏览')                
                }
            }
        },
        mounted() {
            this.orientate()
        }
    }
</script>

<style scoped>
    h1 {
        margin-top: 80px;
        margin-bottom: -60px;
        color: #303133;
        font-family: "bankgothic md bt";
    }

    .home-logo {
        text-align: center;
    }
</style>