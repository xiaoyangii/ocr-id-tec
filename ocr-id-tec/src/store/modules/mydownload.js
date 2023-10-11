import { getDownloadList, setDownloadList } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      downloadList: getDownloadList()
    }
  },
  mutations: {
    setDownList(state, newList) {
      state.downloadList = newList
      setDownloadList(newList)
    },
  },
  actions: {

  },
  getters: {

  }
}
