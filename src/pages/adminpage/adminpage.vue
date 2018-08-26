<template>
    <div class="wrapper">
        <admin-header></admin-header>
        <admin-sidebar></admin-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import adminHeader from './adminheader'
    import adminSidebar from './adminsidebar'
    import bus from './bus';
    export default {
        name: 'adminPage',
        components: {
            adminHeader,
            adminSidebar
        },
        data() {
            return {
                tagsList: [],
                collapse: false
            }
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
<style scoped>
</style>