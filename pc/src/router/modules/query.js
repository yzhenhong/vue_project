import layout from '@/components/layout'

export default [
  {
    path: '/query',
    name: 'query',
    component: layout,
    meta: {
      title: '信息查询'
    },
    children: [
      {
        path: 'unitPay',
        name: 'query-unitPay',
        component: () => import('@/views/query/unitPay'),
        meta: {
          keepAlive: false,
          table: true,
          title: '单位缴费明细'
        }
      },
      {
        path: 'individualPay',
        name: 'query-individualPay',
        component: () => import('@/views/query/individualPay'),
        meta: {
          keepAlive: false,
          table: true,
          title: '个人缴费明细'
        }
      },
      {
        path: 'personnelChange',
        name: 'query-personnelChange',
        component: () => import('@/views/query/personnelChange'),
        meta: {
          keepAlive: false,
          table: true,
          title: '人员变更情况查询'
        }
      },
      {
        path: '/subsidyResult',
        name: 'query-subsidyResult',
        component: () => import('@/views/query/SubsidyResult'),
        meta: {
          keepAlive: false,
          title: '生育津贴申领结果'
        }
      },
      {
        path: '/subsidyDetail',
        name: 'query-subsidyDetail',
        component: () => import('@/views/query/SubsidyDetail'),
        meta: {
          keepAlive: false,
          title: '申领信息详情'
        }
      },
    ]
  }
]
