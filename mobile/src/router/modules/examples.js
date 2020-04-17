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
]
