const user = {
  namespaced:true,
  state: {
    userid: '',
    nickname: '',
    phone: '',
    token: '',
    avatar: ''
  },
  mutations: {
    SET_USERID: (state, id) => {
      state.userid = id;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    }
  },
  actions: {
    setPhone({commit}){
      commit('SET_PHONE', "18970931271")
    },
  }
};

export default user;
