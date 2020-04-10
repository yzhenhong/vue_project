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
        path: 'element-form',
        name: 'examples-element-form',
        component: () => import('@/views/examples/element-form'),
        meta: {
          keepAlive: false,
          title: 'element-form'
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
