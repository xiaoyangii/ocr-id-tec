import request from '@/utils/request'

// 1. 获取文章列表
export const getArticle = () => {
  return request.get('/Article/SelectAll', {})
}

// 2. 获取文章详情
export const getArticleDetail = (articleId) => {
  return request.get('/Article/SelectArticleByArticleId', {
    params: {
      articleId: localStorage.getItem('loginId') + '#' + articleId
      // articleId
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
  return request.get('/Article/Download', {
    params: {
      // articleId
      articleId: "17850966557" + "#" + 25
    },
    responseType: 'blob'
  })
}

// 5. 获取仓库文章
export const getRepoArticle = (telephone) => {
  return request.get('/Article/SelectAllBySelf', {
    params: {
      telephone
    }
  })
}

// 6. 查找图片关键词
export const searchImg = (keyWord) => {
  return request.get('/Article/SelectAllByKeyWord', {
    params: {
      keyWord
    }
  })
}

// 7.插入文章
export const insertArticle = (data) => {
  return request({
    url: 'http://120.77.149.32:8999/Article/InsertArticle',
    method: "post",
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 8. 仓库插入文章
export const insertRepoArticle = (data) => {
  return request({
    url: 'http://120.77.149.32:8999/Article/InsertArticle',
    method: "post",
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}