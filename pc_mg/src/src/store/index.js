import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import user from './modules/user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const rootState = () => ({
  root: true
})

export default new Vuex.Store({
  state: rootState,
  actions,
  mutations,
  modules: {
    user
  },
  strict: debug
})
