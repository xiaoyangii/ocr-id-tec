// routes/auth.js
const { createRouter, jsonParser, connection } = require('../utils/common.js')
const { generateToken } = require('../utils/token.js')
const { verifyCode }  = require('../utils/verify.js')
const { sendCode } = require('../config/sms.js')

const router = createRouter()

// 密码登录
router.post('/loginpsw', jsonParser, (req, res) => {
  const { telephone, password } = req.body
  try {
    let sql = `SELECT * FROM user WHERE telephone = ? AND password = ?`
    connection.query(sql, [telephone, password], (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: '服务器错误' })
        return
      }
      if (results.length === 0) {
        res.status(401).json({ message: '用户名或密码错误' })
        return
      }
      const user = results[0]
      const token = generateToken({ userId: user.uid, telephone: user.telephone })

      res.status(200).json({ 
        message: '登录成功',
        token: token,
        loginId: user.telephone
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})


// 获取验证码
router.post('/sendcode', jsonParser, async (req, res) => {
  const { telephone } = req.body
  try{
    // 生成4位随机验证码
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    const now = Date.now()
    const expires = now + 5 * 60 * 1000 // 5分钟有效期

    // 存储验证码到数据库
    const sql = `
      INSERT INTO sms_codes (telephone, code, expires) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        code = VALUES(code), 
        expires = VALUES(expires),
        created_at = NOW()
    `
    await connection.query(sql, [telephone, code, expires])
    // 调用阿里云短信服务
    const result = await sendCode(telephone, code)
    
    console.log('短信发送', result)
    if (result.Code === 'OK') {
      res.json({ code: 200, message: '验证码发送成功' })
    } else {
      console.error('阿里云短信错误:', result)
      res.status(500).json({ code: 500, message: '验证码发送失败' })
    }
  } catch(err) {
    console.error('发送验证码异常:', err)
    
    // 处理数据库错误
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ code: 400, message: '请勿频繁发送验证码' })
    }
    
    // 处理阿里云服务错误
    if (err.name === 'ServerError') {
      return res.status(500).json({ 
        code: 500,
        message: `短信服务异常: ${err.message}`
      })
    }

    res.status(500).json({ code: 500, message: '服务器发送错误' })
  }
})

// 验证码登录
router.post('/logincode', jsonParser, async (req, res) => {
  const { telephone, code } = req.body
  const now = Date.now()

  // 验证验证码
  const { valid, message } = await verifyCode(telephone, code, now)
  if (!valid) {
    return res.status(400).json({ code: 400, message })
  }

  const sql = `SELECT * FROM user WHERE telephone = ?`
  connection.query(sql, [telephone], (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: '服务器错误' })
      return
    }
    if (results.length === 0) {
      res.status(404).json({ message: '用户不存在' })
      return
    }
    const user = results[0]
    const token = generateToken({ userId: user.uid, telephone: user.telephone })

    res.status(200).json({ 
      message: '登录成功',
      token: token,
      loginId: user.telephone
    })
  })
})

// 注册
router.post('/register', jsonParser, async (req, res) => {
  const { telephone, code, password } = req.body
  const now = Date.now()

  // 验证验证码
  const { valid, message } = await verifyCode(telephone, code, now);
  if (!valid) {
    return res.status(400).json({ code: 400, message })
  }

  // 插入用户
  const insertSql = `INSERT INTO user (telephone, password) VALUES (?, ?)`
  await connection.query(insertSql, [telephone, password], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ code: 500, message: '服务器错误, 注册失败' })
    }
  })

  // 注册成功
  res.json({ code: 200, message: '注册成功' })
})

// 重置密码
router.post('/reset', jsonParser, async (req, res) => {
  const { telephone, code, password } = req.body
  const now = Date.now()

  // 验证验证码
  const { valid, message } = await verifyCode(telephone, code, now)
  if (!valid) {
    return res.status(400).json({ code: 400, message })
  }

  // 更新密码
  const updateSql = `UPDATE user SET password = ? WHERE telephone = ?`
  await connection.query(updateSql, [password, telephone])

  // 重置成功
  res.json({ code: 200, message: '重置成功' })
})

module.exports = router