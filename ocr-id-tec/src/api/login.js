// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1. 获取短信验证码
export const getMsgCode = (telephone) => {
  return request.get('/User/SendMsg', {
    params: {
      telephone
    }
  })
}

// 2. 验证码登录接口
export const codeLogin = (telephone, code) => {
  return request.get('/User/LoginByCode', {
    params: {
      telephone,
      code
    }
  })
}

// 3. 密码登录接口
export const passwordLogin = (telephone, password) => {
  return request.get('/User/LoginByPassword', {
    params: {
      telephone,
      password
    }
  })
}

// 4. 注册接口
export const codeRegistered = (telephone, code, password) => {
  return request.get('/User/Enroll', {
    params: {
      telephone,
      code,
      password
    }
  })
}

// 5. 忘记密码接口
export const codeForgetPassword = (telephone, code, password) => {
  return request.get('/User/ChangePassword', {
    params: {
      telephone,
      code,
      password
    }
  })
}
