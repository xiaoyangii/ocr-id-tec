const { connection } = require('../utils/common.js')

// 验证码验证逻辑
const verifyCode = async (telephone, code, now) => {
  // 查询验证码
  const sql = `SELECT * FROM sms_codes WHERE telephone = ?`
  connection.query(sql, [telephone], (err, rows) => {
    if (err) {
      console.log(err)
      return { valid: false, message: '服务器错误' }
    }

    const [sms] = rows
    // 验证码不存在
    if (!sms) {
      return { valid: false, message: '请先获取验证码' }
    }

    // 验证码过期
    if (sms.expires < now) {
      return { valid: false, message: '验证码已过期' }
    }

    // 验证码错误
    if (sms.code !== code) {
      return { valid: false, message: '验证码错误' }
    }
  })

  return { valid: true }
}

module.exports = {
  verifyCode
}