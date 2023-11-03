// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1. 上传pdf
export const uploadPdfFile = (data) => {
  return request({
    url: 'http://120.77.149.32:8999/Article/InsertArticle',
    method: "post",
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}
// 2. 上传图片
export const uploadImgFile = (data) => {
  return request({
    url: 'http://120.77.149.32:8999/Picture/InsertPicture',
    method: "post",
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}