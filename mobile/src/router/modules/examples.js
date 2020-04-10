export default [
  {
    path: '/state',
    name: 'state',
    component: () => import('@/views/state')
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import('@/views/swiper'),
  },
]
