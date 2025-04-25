const Core = require('@alicloud/pop-core')
const { accessKeyId, accessKeySecret } = require('./config.js')


// 初始化阿里云客户端
const client = new Core({
  accessKeyId,
  accessKeySecret,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

// 阿里云短信服务参数
const smsParams = {
  SignName: "知医谷",
  TemplateCode: "SMS_479110531"
}

const sendCode = (telephone, code) => {
  return client.request('SendSms', {
    ...smsParams,
    PhoneNumbers: telephone,
    TemplateParam: JSON.stringify({ code })
  }, {
    timeout: 5000
  })
}

module.exports = {
  client,
  sendCode
}