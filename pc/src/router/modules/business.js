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
        component: () => import('@/views/business/unitRegistered'),
        meta: {
          keepAlive: false,
          title: '单位参保登记'
        }
      },
      {
        path: 'protectRegistration',
        name: 'business-protectRegistration',
        component: () => import('@/views/business/protectRegistration'),
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
      {
        path: 'personalInfo',
        name: 'business-personalInfo',
        component: () => import('@/views/business/PersonalInfo/PersonalInfoList'),
        meta: {
          keepAlive: false,
          title: '个人信息变更'
        }
      },
      {
        path: 'personalEdit',
        name: 'business-personalEdit',
        component: () => import('@/views/business/PersonalInfo/PersonalInfoEdit'),
        meta: {
          keepAlive: false,
          title: '个人信息变更'
        }
      },
      {
        path: 'subsidies',
        name: 'business-subsidies',
        component: () => import('@/views/business/Subsidies'),
        meta: {
          keepAlive: false,
          title: '生育津贴申领'
        }
      },
      {
        path: 'payOff',
        name: 'business-payOff',
        component: () => import('@/views/business/PayOff'),
        meta: {
          keepAlive: false,
          title: '断缴补缴申报'
        }
      },
    ]
  }
]
