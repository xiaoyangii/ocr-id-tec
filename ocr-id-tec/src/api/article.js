import request from '@/utils/request'

// 1. 获取文章列表
export const getArticle = () => {
  return request.get('/Article/SelectAll', {})
}

// 2. 获取文章详情
export const getArticleDetail = (articleId) => {
  return request.get('/Article/SelectArticleByArticleId', {
    params: {
      articleId
    }
  })
}

// 3. 删除文章
export const deleteArticle = (telephone, articleId) => {
  return request.delete('/Article/DeleteArticle', {
    params: {
      telephone,
      articleId
    }
  })
}

// 4. 下载文章
export const downloadArticle = (articleId) => {
  return request.post('/Article/Download', {
    params: {
      articleId
    }
  })
}