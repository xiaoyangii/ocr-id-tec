import { getDownloadList, setDownloadList } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      downloadList: getDownloadList()
    }
  },
  mutations: {
    getDownloadList(state, newList) {
      state.downloadList = newList
      setDownloadList(newList)
    },
  },
  actions: {

  },
  getters: {

  }
}
