import Vue from 'vue';
import Vuex from 'vuex';
import globalState from './state'
import globalGetters from './getters'
import globalMutations from './mutations'
import globalActions from './actions'
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  state: globalState,
  getters: globalGetters,
  mutations: globalMutations,
  actions: globalActions
});

export default store;
