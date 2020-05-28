import layout from '@/components/layout'
// 渠道管理
const  businessRouterMap = [
  {
    path: '/business',
    component: layout,
    name: 'business',
    icon: 'icon-yewu-tianchong',
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
          title: '业务配置',
          show: true
        }
      },
      {
        path: '/business/service-configuration',
        component: () => import('@/views/business/service-configuration'),
        name: 'service-configuration',
        meta: {
          keepAlive: false,
          title: '服务配置',
          show: true
        }
      },
      {
        path: '/business/editor-service',
        component: () => import('@/views/business/editor-service'),
        name: 'editor-service',
        meta: {
          keepAlive: false,
          title: '服务配置 > 新增服务',
          show: false
        }
      },
    ]
  }
]

export default  businessRouterMap