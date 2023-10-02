import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import myhistory from './modules/myhistory'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    getters: {
      token (state) {
        return state.user.userInfo.token
      }
    },
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    myhistory,
    user
  }
})
