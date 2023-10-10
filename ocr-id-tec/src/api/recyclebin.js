import request from '@/utils/request'

// 1. 获取回收站列表
export const getRecyclebin = (telephone) => {
  return request.get('/RecycleBin/SelectAll', {
    params: {
      telephone
    }
  })
}

// 2. 删除全部回收站记录
export const deleteAllRecyclebin = (telephone) => {
  return request.delete('/RecycleBin/DeleteAllRecycleBin', {
    params: {
      telephone
    }
  })
}

// 3. 删除单条回收站记录
export const deleteOneRecyclebin = (telephone, articleId) => {
  return request.delete('/RecycleBin/DeleteRecycleBin', {
    params: {
      telephone,
      articleId
    }
  })
}

// 4. 删除多条回收站记录
export const deleteMultiRecyclebin = (telephone, articleId) => {
  return request.delete('/RecycleBin/DeleteMultiRecycleBin', {
    params: {
      telephone,
      articleId
    }
  })
}