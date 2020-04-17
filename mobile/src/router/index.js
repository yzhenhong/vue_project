import VueRouter from 'vue-router'
import Vue from 'vue'
const _import = require('./_import_' + process.env.NODE_ENV)


import examplesRoutes from './modules/examples'

Vue.use(VueRouter)

const routes = [
  ...examplesRoutes,
  {
    path: '/',
    name: 'default',
    redirect: '/home/index',
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    component: {
      template: '<router-view />'
    },
    children: [
      {
        path: 'index',
        name: '',
        component: _import('home/index')
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
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

export default router