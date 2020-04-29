import layout from '@/components/layout'
// 渠道管理
const  appletRouterMap = [
  {
    path: '/applet',
    component: layout,
    name: 'applet',
    meta: {
      title: '小程序管理',
      show: true
    },
    children: [
      {
        path: '/applet/functional-configuration',
        component: () => import('@/views/applet/functional-configuration'),
        name: 'functional-configuration',
        meta: {
          keepAlive: false,
          title: '功能配置',
          show: true
        }
      },
    ]
  }
]

export default  appletRouterMap