import Vue from 'vue'
import Vuex from 'vuex'

import { login, userInfo, logout } from '../api/user.js'
import { setToken, getToken, setUserInfo, getUserInfo } from '../utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    userInfo: getUserInfo() || '',
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      // console.log(state.userInfo);
      return state.userInfo
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    },
  },
  actions: {
    // 登录
    async login({ commit }, ruleForm) {
      try {
        // 调用登录接口
        const response = await login(ruleForm)
        commit('SET_TOKEN', response.token)
        return response.token
      } catch (error) {
        console.log(error.message)
      }
    },
    // 获取用户信息
    async handleUserInfo({ commit }) {
      try {
        // 调用用户信息接口
        const userinfo = await userInfo()
        commit('SET_USER_INFO', userinfo)
        return userinfo
      } catch (error) {
        console.log(error.message)
      }
    },

    // 退出登录
    async handleLogout({ commit }) {
      const response = await logout()
      commit('SET_TOKEN', '')
      commit('SET_USER_INFO', '')
      return response
    },

    // DIS_SET_TOKEN({ commit }, token) {
    //   commit('SET_TOKEN', token)
    // },
    // // 获取用户信息
    // DIS_SET_USER_INFO({commit},userInfo){
    //   commit('SET_USER_INFO',userInfo)
    // }
  },
  modules: {},
})
