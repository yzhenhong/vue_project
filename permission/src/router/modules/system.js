import layout from '@/components/layout'
// 系统设置
const  systemRouterMap = [
  {
    path: '/system',
    component: layout,
    name: 'system',
    icon: 'icon-xitongshezhi',
    meta: {
      title: '系统设置',
      show: true
    },
    children: [
      {
        path: '/system/account-management',
        component: () => import('@/views/system/account-management'),
        name: 'account-management',
        meta: {
          keepAlive: false,
          title: '账号管理',
          show: true
        }
      },
    ]
  }
]

export default  systemRouterMap