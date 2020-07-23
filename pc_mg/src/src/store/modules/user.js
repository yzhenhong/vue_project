import * as Api from '@/api/user'

const state = {
  userInfo: {
    mobile: '18888888888',
    email: 'xxx@shuame.com',
    userId: 1
  }
}

const actions = {
  async fetchUserInfo({ commit }) {
    let userInfo = await Api.getUserInfo()
    commit('changeUserInfo', userInfo)
  }
}

const mutations = {
  changeUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state, 
  actions,
  mutations
}