export default [
  {
    path: '/state',
    name: 'state',
    component: () => import('@/views/examples/state')
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import('@/views/examples/swiper'),
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/examples/upload'),
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/examples/pay'),
  },
]
