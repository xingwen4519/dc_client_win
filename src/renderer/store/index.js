import Vue from 'vue'
import Vuex from 'vuex'

import {
  createPersistedState,
  // createSharedMutations
} from 'vuex-electron'

Vue.use(Vuex);


export default new Vuex.Store({
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // // 用户登录信息
    // token: localStorage.getItem('token') || '',
    // userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    // //记住用户名密码
    // remUser: JSON.parse(localStorage.getItem('remUser')) || null,
    token: '',
    userInfo: null,
    remUser: null
  },
  mutations: {
    //记住密码
    setRemUser(state, remUser) {
      state.remUser = remUser;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    setRemUser({
      commit
    }, remUser) {
      localStorage.setItem('remUser', JSON.stringify(remUser));
      commit('setRemUser', remUser);
    },
    setUserInfo({
      commit
    }, userInfo) { 
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      commit('setUserInfo', userInfo);
    },
    setToken({
      commit
    }, token) {
      localStorage.setItem('token', token);
      commit('setToken', token);
    },
    setSignOut({
      commit
    }) {      
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      commit('setToken', '');
      commit('setUserInfo', '');
    },
  }
})