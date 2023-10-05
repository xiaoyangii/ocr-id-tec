//import { changeCount, delSelect, getCartList } from '@/api/history'

export default {
  namespaced: true,
  state () {
    return {
      historyList: []
    }
  },
  mutations: {
    setHistoryList (state, newList) {
      state.historyList = newList
    },
  },
  actions: {

  },
  getters: {

  }
}
