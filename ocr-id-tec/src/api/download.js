import request from '@/utils/request'

// 1. 获取下载列表
export const getDownload = (telephone) => {
  return request.get('/DownLoad/SelectAll', {
    params: {
      telephone
    }
  })
}

// 2. 删除全部下载记录
export const deleteAllDownload = (telephone) => {
  return request.delete('/DownLoad/DeleteDownLoadAll', {
    params: {
      telephone
    }
  })
}

// 3. 删除单条下载记录
export const deleteOneDownload = (telephone, articleId) => {
  return request.delete('/DownLoad/DeleteDownLoad', {
    params: {
      telephone,
      articleId
    }
  })
}

// 4. 删除多条下载记录
export const deleteMultiDownload = (telephone, articleIds) => {
  return request.delete('/Download/DeleteDownLoadBySlect', {
    params: {
      telephone,
      articleIds
    }
  })
}