import request from '@/utils/request'

// 1. 获取历史列表
export const getHisList = (telephone) => {
  return request.get('/CheckHistory/SelectAll', {
    params: {
      telephone
    }
  })
}

// 2. 删除全部历史记录
export const deleteAllHistory = (telephone) => {
  return request.delete('/CheckHistory/DeleteAll', {
    params: {
      telephone
    }
  })
}

// 3. 删除单条历史记录
export const deleteOneHistory = (telephone, articleId) => {
  return request.delete('/CheckHistory/DeleteOne', {
    params: {
      telephone,
      articleId
    }
  })
}

// 3. 删除单条历史记录
export const deleteMultiHistory = (telephone, articleId) => {
  return request.delete('/CheckHistory/', {
    params: {
      telephone,
      articleId
    }
  })
}