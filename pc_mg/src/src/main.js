import Vue from 'vue'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import routes from './router'
import Router from 'vue-router'
import SvgIcon from 'vue-svgicon'
import { injectRoutes, injectStore, routerBeforeEachHook } from 'develop-console'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Router)
// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

Vue.prototype.$net = Axios.create()

// 注入Console中的Routes
const router = new Router({ mode: 'history', routes: injectRoutes(routes, 'main') })
injectStore(store)
routerBeforeEachHook(router, store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
