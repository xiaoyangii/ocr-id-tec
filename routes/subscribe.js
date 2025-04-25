const { createRouter, jsonParser, queryDB } = require('../utils/common.js')
const router = createRouter()

// 获取订阅列表
router.get('/subscribe', async (req, res) => {
  try {
    const telephone = req.query.telephone
    let sql = 'SELECT * FROM sublink WHERE telephone = ?'
    const [result] = await queryDB(sql, [telephone])
    res.status(200).json({
      message: '获取订阅列表成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 获取全部journal列表
router.get('/journal', async (req, res) => {
  try {
    let sql = 'SELECT * FROM journal'
    const result = await queryDB(sql)
    res.status(200).json({
      message: '获取所有期刊列表成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})


// 添加订阅
router.post('/subscribe', jsonParser, async (req, res) => {
  try {
    const { telephone, subId } = req.body
    let sql = 'UPDATE sublink SET subId = ? WHERE telephone = ?'
    const result = await queryDB(sql, [subId, telephone])
    res.status(200).json({
      message: '添加订阅成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 取消订阅
router.delete('/subscribe', jsonParser, async (req, res) => {
  try {
    const { subId, telephone } = req.query
    let sql = 'UPDATE sublink SET subId = ? WHERE telephone = ?'
    const result = await queryDB(sql, [subId, telephone])
    res.status(200).json({
      message: '取消订阅成功',
      data: result
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router