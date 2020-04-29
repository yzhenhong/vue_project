import layout from '@/components/layout'
// 渠道管理
const  managementRouterMap = [
  {
    path: '/management',
    component: layout,
    name: 'management',
    icon: 'icon-qudao',
    meta: {
      title: '渠道管理',
      show: true
    },
    children: [
      {
        path: '/management/configuration',
        component: () => import('@/views/management/configuration'),
        name: 'configuration',
        meta: {
          keepAlive: false,
          title: '渠道配置',
          show: true
        }
      },
      {
        path: '/management/service-authority',
        component: () => import('@/views/management/service-authority'),
        name: 'service-authority',
        meta: {
          keepAlive: false,
          title: '业务权限配置',
          show: true
        }
      },
    ]
  }
]

export default  managementRouterMap