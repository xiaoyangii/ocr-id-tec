import request from '@/utils/request'

// 1. 获取收藏列表
export const getColle = (telephone) => {
  return request.post('/CollectLink/SelectAllByTelephone', {
    form: {
      telephone
    }
  })
}