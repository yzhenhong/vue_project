import * as Api from '@/api/mp-info-api'

const state = () => ({
  mpInfo: {}
})

const getters = {
  mpInfo: state => state.mpInfo
}

const actions = {
  async fetchMpInfo ({ commit }) {
    try {
      const data = await Api.getMpInfo()
      const mpInfo = data.data
      commit('setMpInfo', mpInfo)
    } catch (error) {

    }
  }
}

const mutations = {
  setMpInfo (state, mpInfo) {
    state.mpInfo = mpInfo || {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
