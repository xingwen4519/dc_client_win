import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户登录信息
    // token: wx.getStorageSync('token') || '',
    // userInfo: wx.getStorageSync('userInfo') ? JSON.parse(wx.getStorageSync('userInfo')) : null,
  },
  mutations: {
    // setUserInfo(state, value) {
    //   wx.setStorageSync('userInfo', JSON.stringify(value));
    //   state.userInfo = value;
    // },
    // setToken(state, value) {
    //   wx.setStorageSync('token', value);
    //   state.token = value;
    // },
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
