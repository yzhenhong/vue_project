import layout from '@/components/layout'
// 渠道管理
const  businessRouterMap = [
  {
    path: '/business',
    component: layout,
    name: 'business',
    meta: {
      title: '业务管理',
      show: true
    },
    children: [
      {
        path: '/business/business-configuration',
        component: () => import('@/views/business/business-configuration'),
        name: 'business-configuration',
        meta: {
          keepAlive: false,
          title: '渠道配置',
          show: true
        }
      },
    ]
  }
]

export default  businessRouterMap