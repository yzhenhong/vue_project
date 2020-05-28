import layout from '@/components/layout'
// 渠道管理
const  homeRouterMap = [
  {
    path: '/home',
    name: 'home',
    icon: 'icon-shouye',
    component: layout,
    meta: {
      title: '首页',
      show: true,
    },
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