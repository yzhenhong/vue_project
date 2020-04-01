import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vueX',
    name: 'vueX',
    component: () => import('@/views/vuex')
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import('@/views/swiper')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router