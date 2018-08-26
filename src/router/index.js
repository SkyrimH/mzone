import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/homepage/Homepage'
import videoPage from '@/pages/videoPage/videoPage'
import videoPlay from '@/pages/videoPage/player/videoPlay'
import ebookPage from '@/pages/ebookPage/ebookPage'
import gamePage from '@/pages/gamePage/gamePage'
import adminPage from '@/pages/adminPage/adminPage'
import adminLogin from '@/pages/adminPage/pages/adminLogin'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/video',
      name: 'videoPage',
      component: videoPage
    },
    {
      path: '/video/:id',
      name: 'videoPlay',
      component: videoPlay
    },
    {
      path: '/ebook',
      name: 'ebookPage',
      component: ebookPage
    },
    {
      path: '/game',
      name: 'gamePage',
      component: gamePage
    },
    {
      path: '/admin',
      redirect: '/admin/home'
    },
    {
      path: '/admin',
      name: 'adminPage',
      component: adminPage,
      children:[
        {
          path: '/admin/login',
          name: 'adminLogin',
          component: adminLogin
        },
        {
            path: '/admin/home',
            component: resolve => require(['../pages/adminPage/pages/adminhome'], resolve),
            meta: { title: '系统首页' }
        },
        // {
        //     path: '/table',
        //     component: resolve => require(['../components/page/BaseTable.vue'], resolve),
        //     meta: { title: '基础表格' }
        // },
        // {
        //     path: '/tabs',
        //     component: resolve => require(['../components/page/Tabs.vue'], resolve),
        //     meta: { title: 'tab选项卡' }
        // },
        // {
        //     path: '/form',
        //     component: resolve => require(['../components/page/BaseForm.vue'], resolve),
        //     meta: { title: '基本表单' }
        // },
        // {
        //     // 富文本编辑器组件
        //     path: '/editor',
        //     component: resolve => require(['../components/page/VueEditor.vue'], resolve),
        //     meta: { title: '富文本编辑器' }
        // },
        // {
        //     // markdown组件
        //     path: '/markdown',
        //     component: resolve => require(['../components/page/Markdown.vue'], resolve),
        //     meta: { title: 'markdown编辑器' }    
        // },
        {
            // 图片上传组件
            path: '/admin/ebookupload',
            component: resolve => require(['../pages/adminPage/pages/ebookupload.vue'], resolve),
            meta: { title: '电子书上传' }   
        },
        // {
        //     // vue-schart组件
        //     path: '/charts',
        //     component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
        //     meta: { title: 'schart图表' }
        // },
        // {
        //     // 拖拽列表组件
        //     path: '/drag',
        //     component: resolve => require(['../components/page/DragList.vue'], resolve),
        //     meta: { title: '拖拽列表' }
        // },
        // {
        //     // 权限页面
        //     path: '/permission',
        //     component: resolve => require(['../components/page/Permission.vue'], resolve),
        //     meta: { title: '权限测试', permission: true }
        // }
      ]
    },

  ]
})
