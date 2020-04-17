import layout from '@/components/layout'

export default [
  {
    path: '/examples',
    name: 'examples',
    component: layout,
    meta: {
      title: '示例'
    },
    children: [
      {
        path: 'state',
        name: 'examples-state',
        component: () => import('@/views/examples/state'),
        meta: {
          keepAlive: false,
          title: 'vuex'
        }
      },
      {
        path: 'dynamic-form-demo',
        name: 'examples-dynamic-form-demo',
        component: () => import('@/views/examples/dynamic-form-demo'),
        meta: {
          keepAlive: false,
          title: 'dynamic-form-demo'
        }
      },
      {
        path: 'dynamic-list-demo',
        name: 'examples-dynamic-list-demo',
        component: () => import('@/views/examples/dynamic-list-demo'),
        meta: {
          keepAlive: false,
          title: 'dynamic-list-demo'
        }
      },
      {
        path: 'dynamic-info-demo',
        name: 'examples-dynamic-info-demo',
        component: () => import('@/views/examples/dynamic-info-demo'),
        meta: {
          keepAlive: false,
          title: 'dynamic-info-demo'
        }
      },
      {
        path: 'element-form',
        name: 'examples-element-form',
        component: () => import('@/views/examples/element-form'),
        meta: {
          keepAlive: false,
          title: 'element-list'
        }
      },
      {
        path: 'element-list',
        name: 'examples-element-list',
        component: () => import('@/views/examples/element-list'),
        meta: {
          keepAlive: false,
          title: 'element-list'
        }
      },
      {
        path: 'vue-easytable',
        name: 'examples-vue-easytable',
        component: () => import('@/views/examples/vue-easytable'),
        meta: {
          keepAlive: false,
          title: 'vue-easytable'
        }
      },
    ]
  }
]
