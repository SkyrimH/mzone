<template>
    <div>
        <main-header></main-header>
        <transition name="move" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import mainHeader from '@/common/header'
    export default {
        name: 'homePage',
        components: {
            mainHeader
        },
        // methods: {
        //     orientate() {
        //         if (global.orientation === 0) {
        //             alert('建议横屏浏览')                
        //         }
        //     }
        // },
        // mounted() {
        //     this.orientate()
        // }
    }
</script>

<style scoped>
</style>