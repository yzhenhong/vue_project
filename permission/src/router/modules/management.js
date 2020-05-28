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
        path: '/management/permission-configuration',
        component: () => import('@/views/management/permission-configuration'),
        name: 'permission-configuration',
        meta: {
          keepAlive: false,
          title: '业务权限配置',
          show: true
        },
      },
      {
        path: '/management/website-configuration',
        component: () => import('@/views/management/website-configuration'),
        name: 'website-configuration',
        meta: {
          keepAlive: false,
          title: '站点配置',
          show: true
        }
      },
      {
        path: '/management/editor-website',
        component: () => import('@/views/management/editor-website'),
        name: 'editor-website',
        meta: {
          keepAlive: false,
          title: '站点配置 > 新增站点',
          show: false
        }
      },
    ]
  }
]

export default  managementRouterMap