export default [
  {
    path: '/state',
    name: 'state',
    meta: {
      title: 'vuex',
    },
    component: () => import('@/views/examples/state')
  },
  {
    path: '/swiper',
    name: 'swiper',
    meta: {
      title: 'swiper',
    },
    component: () => import('@/views/examples/swiper'),
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      title: 'upload',
    },
    component: () => import('@/views/examples/upload'),
  },
  {
    path: '/pay',
    name: 'pay',
    meta: {
      title: 'pay',
    },
    component: () => import('@/views/examples/pay'),
  },
]
