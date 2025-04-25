const OSS = require('ali-oss')
const { accessKeyId, accessKeySecret, region, bucket } = require('./config.js')

// 配置阿里云 OSS 信息
const client = new OSS({
  authorizationV4: true,
  region,
  accessKeyId,
  accessKeySecret,
  bucket
})

module.exports = {
  client
}
