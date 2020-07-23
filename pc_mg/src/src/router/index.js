import Layout from '../pages/layout'
const Login = () => import('@/pages/login')
const NotFound = () => import('@/pages/notfound')

const routes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    children: []
  },
  { path: '/login', name: 'login', component: Login },
  { path: '*', name: 'notfound', component: NotFound }
]

export default routes
