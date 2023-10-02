// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1. 获取短信验证码
export const getMsgCode = (captchaKey, mobile) => {
  return request.post('', {
    form: {
      captchaKey,
      mobile
    }
  })
}

// 2. 验证码登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('', {
    form: {
      mobile,
      smsCode
    }
  })
}

// 3. 密码登录接口
export const passwordLogin = (mobile, password) => {
  return request.post('', {
    form: {
      mobile,
      password
    }
  })
}

// 4. 注册接口
export const codeRegistered = (mobile, smsCode) => {
  return request.post('', {
    form: {
      mobile,
      smsCode
    }
  })
}

// 5. 忘记密码接口
export const codeForgetPassword = (mobile, smsCode, password) => {
  return request.post('', {
    form: {
      mobile,
      smsCode,
      password
    }
  })
}
