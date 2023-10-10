import request from '@/utils/request'

// 1. 获取订阅列表
export const getSubs = (telephone) => {
  return request.get('/SubscriptionLink/SelectAllByTelephone', {
    params: {
      telephone
    }
  })
}

// 2. 取消订阅
export const deleteSubs = (telephone, subscriptionName) => {
  return request.delete('/SubscriptionLink/DeleteSubscriptionLink', {
    params: {
      telephone,
      subscriptionName
    }
  })
}