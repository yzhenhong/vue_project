import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import businessRoutes from './modules/business'
import queryRoutes from './modules/query'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)


export const routes = [
  ...businessRoutes,
  ...queryRoutes,
  {
    path: '/',
    name: 'default',
    redirect: '/home/index',
  },
  {
    path: '/home',
    name: 'home',
    component: layout,
    children: [
      {
        path: 'index',
        name: '',
        component: _import('home/index')
      }
    ]
  },
]

const router = new Router({
  base: '/',
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    // 异步滚动操作
    return new Promise(resolve => {
      setTimeout(() => {
        document.querySelectorAll('body')[0].scrollTop = 0

        resolve({
          x: 0,
          y: 1
        })
      }, 0)
    })
  }
})



router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router