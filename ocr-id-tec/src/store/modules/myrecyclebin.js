import { getrecyclebinList, setrecyclebinList } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      recyclebinList: getrecyclebinList()
    }
  },
  mutations: {
    setRecyclebin (state, newList) {
      state.recyclebinList = newList
      setrecyclebinList(newList)
    },
  },
  actions: {

  },
  getters: {

  }
}
