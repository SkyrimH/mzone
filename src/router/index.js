import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/homepage/Homepage'
import videoPage from '@/pages/videoPage/videoPage'
import ebookPage from '@/pages/ebookPage/ebookPage'
import gamePage from '@/pages/gamePage/gamePage'

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
      path: '/ebook',
      name: 'ebookPage',
      component: ebookPage
    },
    {
      path: '/game',
      name: 'gamePage',
      component: gamePage
    }
  ]
})
