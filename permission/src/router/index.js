import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

// 公用路由(iframe中的路由、component!=layout的一级路由)
export const constantRouterMap = [
  // 通用页面
  { path: '/login', name: 'login', component: _import('login/login') },
  { path: '/401', name: '401',component: _import('error/401') },
  { path: '/404', name: '404',component: _import('error/404') },
  { path: '/',  name: 'default-name', redirect: '/home/index' },
];

const router = new Router({
  base: '/',
  mode: 'history',
  routes: constantRouterMap,
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