import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/HelloWorld')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router