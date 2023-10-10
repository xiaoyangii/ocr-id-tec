import request from '@/utils/request'

// 1. 获取关注列表
export const getConcern = (telephone) => {
  return request.get('/ConcernLink/SelectAllByTelephone', {
    params: {
      telephone
    }
  })
}

// 2. 取消关注
export const deleteConcern = (concernedTelephone, concernTelephone) => {
  return request.delete('/ConcernLink/DeleteConcernLink', {
    params: {
      concernedTelephone,
      concernTelephone
    }
  })
}