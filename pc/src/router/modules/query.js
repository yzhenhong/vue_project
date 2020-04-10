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
        component: () => import('@/views/query/unit-pay'),
        meta: {
          keepAlive: false,
          table: true,
          title: '单位缴费明细'
        }
      },
      {
        path: 'individualPay',
        name: 'query-individualPay',
        component: () => import('@/views/query/individual-pay'),
        meta: {
          keepAlive: false,
          table: true,
          title: '个人缴费明细'
        }
      },
    ]
  }
]
