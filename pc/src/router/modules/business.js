import layout from '@/components/layout'

export default [
  {
    path: '/business',
    name: 'business',
    component: layout,
    meta: {
      title: '业务申报'
    },
    children: [
      {
        path: 'unitRegistered',
        name: 'business-unitRegistered',
        component: () => import('@/views/business/unit-registered'),
        meta: {
          keepAlive: false,
          title: '单位参保登记'
        }
      },
      {
        path: 'protectRegistration',
        name: 'business-protectRegistration',
        component: () => import('@/views/business/protect-registration'),
        meta: {
          keepAlive: false,
          title: '职工参保登记'
        }
      },
      {
        path: 'attrition',
        name: 'business-attrition',
        component: () => import('@/views/business/attrition'),
        meta: {
          keepAlive: false,
          title: '参保人员减员申报'
        }
      },
    ]
  }
]
