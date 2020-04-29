import layout from '@/components/layout'
// 渠道管理
const  homeRouterMap = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      show: true,
    },
    component: layout,
    children: [
      {
        path: '/home/index',
        name: 'index',
        meta: {
          title: '首页',
          show: true,
        },
        component: () => import('@/views/home/index'),
      }
    ]
  },
]

export default  homeRouterMap