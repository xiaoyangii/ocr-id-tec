import request from '@/utils/request'

// 1. 获取订阅列表
export const getSubs = (telephone) => {
  return request.post('/SubscriptionLink/SelectAllByTelephone', {
    form: {
      telephone
    }
  })
}