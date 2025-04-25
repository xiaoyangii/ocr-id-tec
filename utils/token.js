const jwt = require('jsonwebtoken')
// 从环境变量中获取密钥，如果环境变量未设置，则使用默认值
const secretKey = process.env.JWT_SECRET || 'secret'

// 生成 token 的函数
const generateToken = (userInfo, expiresIn = '1h') => {
  return jwt.sign(userInfo, secretKey, {
    expiresIn
  })
}

// 验证 token 的函数
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = {
  generateToken,
  verifyToken
}