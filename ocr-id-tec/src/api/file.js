// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1. 上传pdf
export const uploadPdfFile = (data) => {
  return request({
    url: 'http://orcsystem.v2.idcfengye.com/Article/InsertArticle',
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
    url: 'http://orcsystem.v2.idcfengye.com/Picture/InsertPicture',
    method: "post",
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}