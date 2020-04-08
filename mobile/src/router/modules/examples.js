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
    // component: {
    //   template: '<router-view />'
    // },
    // redirect: {
    //   name: 'car-monitor-index'
    // },
    // name: 'car-monitor',
    // meta: {
    //   icon: 'carMonitor',
    //   badge: { value: store.state.monitor, key: 'carMonitorCount', max: 99 }
    // },
  },
]
