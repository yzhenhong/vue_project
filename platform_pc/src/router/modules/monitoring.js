import layout from '@/components/layout'
// 运行监测
const monitoringRouterMap = [
  {
    path: '/monitoring',
    component: layout,
    name: 'monitoring',
    meta: {
      title: '运行监测',
      show: true
    },
    children: [
      {
        path: '/monitoring/service',
        component: () => import('@/views/monitoring/service'),
        name: 'service',
        meta: {
          keepAlive: false,
          title: '服务监测',
          show: true
        }
      },
      {
        path: '/monitoring/quality',
        component: () => import('@/views/monitoring/quality'),
        name: 'quality',
        meta: {
          keepAlive: false,
          title: '服务质量监控',
          show: true
        }
      },
      {
        path: '/monitoring/report',
        component: () => import('@/views/monitoring/report'),
        name: 'report',
        meta: {
          keepAlive: false,
          title: '自助报表设计',
          show: true
        }
      },
    ]
  }
]

export default monitoringRouterMap