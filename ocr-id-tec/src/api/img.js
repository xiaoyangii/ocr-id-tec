import request from '@/utils/request'

// 1. 获取图片列表
export const getImg = () => {
  return request.get('/Picture/SelectAll', {})
}

// 2. 图片详情
export const getImgDetail = (pictureId) => {
  return request.get('/Picture/SelectOneByPictureId', {
    params: {
      pictureId
    }
  })
}