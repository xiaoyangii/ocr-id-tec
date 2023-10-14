import request from '@/utils/request'

// 1. 获取收藏列表
export const getColle = (telephone) => {
  return request.get('/CollectLink/SelectAllByTelephone', {
    params: {
      telephone
    }
  })
}

// 2. 取消收藏
export const deleteColle = (telephone, articleId) => {
  return request.delete('/CollectLink/DeleteCollectLink', {
    params: {
      telephone,
      articleId
    }
  })
}

// 3. 收藏
export const addColle = (telephone, articleId) => {
  return request.post('/CollectLink/InsertCollectLink', {
    data: {
      telephone,
      articleId
    }
  })
}