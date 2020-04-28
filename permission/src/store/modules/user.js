import { setToken, removeToken } from '@/utils/auth';
import * as api from '@/api'
const user = {
  state: {
    userid: '',
    token: '',
    menuList: [],
  },
  mutations: {
    SET_USERID: (state, userid) => {
      state.userid = userid;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_MENULIST: (state, data) => {
      state.menuList = data;
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        api.login(username, userInfo.password).then(res => {
          if(res.data) {
            commit('SET_TOKEN', res.data.token);
            setToken(res.data.token);
            resolve(res);
          } else {
            reject(res);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.getAdminInfo(state.token).then(res => {
          try {
            const menuList = res.data.menuList;
            commit('SET_USERID', res.data.userId);
            if (menuList) {
              commit('SET_MENULIST', menuList);
            }
            resolve(res);
          } catch (err) {
            reject(err);
          }
        }).catch(err => {
          reject(err);
        });
      });
    },
    userLogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
  }
};

export default user;
