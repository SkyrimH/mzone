<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
    import bus from './bus';
    export default {
        name: 'adminSidebar',
                data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'home',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'table',
                        title: '基础表格'
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'tabs',
                        title: 'tab选项卡'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '文件上传',
                        subs: [
                            {
                                index: 'videoupload',
                                title: '影视上传'
                            },
                            {
                                index: 'ebookupload',
                                title: '电子书上传'
                            },
                            {
                                index: 'gameupload',
                                title: '游戏上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'charts',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'drag',
                        title: '拖拽列表'
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'permission',
                        title: '权限测试'
                    },
                    {
                        icon: 'el-icon-error',
                        index: '404',
                        title: '404页面'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                console.log(this.$route.path);
                
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
