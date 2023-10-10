import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      historyList: getHistoryList()
    }
  },
  mutations: {
    setHistory (state, newList) {
      state.historyList = newList
      setHistoryList(newList)
    },
  },
  actions: {

  },
  getters: {

  }
}
