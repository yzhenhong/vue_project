// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import axios from './utils/net'
import VueWechatTitle from 'vue-wechat-title'
import vant from 'vant'
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';

// import VueBus from '@/utils/vue-bus';
// Vue.use(VueBus);
import '@/global/components'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$net = axios

Vue.use(vant)
Vue.use(VueWechatTitle)


// 事件总线
Vue.prototype.$eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted () {
    // Important: 给vuex保持一个vue实例， 方便调用 $notify 等工具函数
    this.$store.dispatch('holdVm', this)
  }
})