import layout from '@/components/layout'
// 渠道管理
const  homeRouterMap = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'home',
      show: true,
    },
    component: layout,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: 'home-index',
          show: true,
        },
        component: () => import('@/views/home/index'),
      }
    ]
  },
]

export default  homeRouterMap