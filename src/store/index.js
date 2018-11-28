import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  // 全局变量
  state: {
    user: undefined,
    isLogin: false
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    login (state, payload) {
      sessionStorage.setItem('user', payload)
      sessionStorage.setItem('isLogin', true)
      state.user = payload
      state.isLogin = true
    },
    logout (state) {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('isLogin')
      state.user = undefined
      state.isLogin = false
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    login (context, payload) {
      context.commit('login', payload)
    },
    logout (context) {
      context.commit('logout')
    }
  },
  getters: {
    isLogin (state) {
      if (!state.isLogin) {
        state.isLogin = sessionStorage.getItem('isLogin')
        state.user = sessionStorage.getItem('user')
      }
      return state.user
    }
  }
})
