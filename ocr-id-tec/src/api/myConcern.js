import request from '@/utils/request'

// 1. 获取关注列表
export const getConcern = (telephone) => {
  return request.post('/ConcernLink/SelectAllByTelephone', {
    form: {
      telephone
    }
  })
}