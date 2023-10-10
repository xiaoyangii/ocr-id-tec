// 此处用于存放所有个人资料相关的接口请求
import request from '@/utils/request'

// 1. 修改个人资料
export const userDetail = (name, realName, telephone, email, profession, race, birthDay, areaOfInterest) => {
  return request.get('/User/ChangeDetail', {
    params: {
      name,
      realName,
      telephone,
      email,
      profession,
      birthDay,
      race,
      areaOfInterest
    }
  })
}

// 2. 修改个人资料
export const homeDetail = (name, realName, telephone, email, profession, affiliatedInstitution, researchField, introduce) => {
  return request.get('/User/ChangeDetail', {
    params: {
      name,
      realName,
      telephone,
      email,
      profession,
      researchField,
      affiliatedInstitution,
      introduce
    }
  })
}

// 2. 修改个人资料
export const editAva = (data) => {
  return request.post('/User/ChangeDetail', {
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 3. 获取个人资料
export const getUserDetail = (telephone) => {
  return request.get('/User/SelectOneDetail', {
    params: {
      telephone
    }
  })
}

// 4. 获取头像
export const getUserAva = (telephone) => {
  return request.get('/User/SelectOnePicture', {
    params: {
      telephone
    }
  })
}