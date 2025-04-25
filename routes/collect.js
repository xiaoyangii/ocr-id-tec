const { createRouter, jsonParser, queryDB } = require('../utils/common.js')
const router = createRouter()

// 获取收藏列表
router.get('/collection', async (req, res) => {
  try {
    const telephone = req.query.telephone
    let sql = 'SELECT * FROM collectlink WHERE telephone = ?'
    const result = await queryDB(sql, [telephone])
    res.status(200).json({
      message: '获取收藏列表成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 添加收藏记录
router.post('/collection', jsonParser, async (req, res) => {
  try {
    const { telephone, articleName, articleId, description, author } = req.body
    let sql = 'INSERT INTO collectlink (telephone, articleName, author, articleId, description) VALUES (?, ?, ?, ?, ?)'
    await queryDB(sql, [telephone, articleName, author, articleId, description])
    res.status(200).json({
      message: '添加收藏记录成功'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 取消收藏
router.delete('/collection', jsonParser, async (req, res) => {
  try {
    const { articleId, telephone } = req.query
    let sql = 'DELETE FROM collectlink WHERE articleId = ? AND telephone = ?'
    const result = await queryDB(sql, [articleId, telephone])
    res.status(200).json({
      message: '取消收藏成功',
      data: result
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 查询是否收藏
router.get('/iscollect', jsonParser, async (req, res) => {
  try {
    const { telephone, articleId } = req.query
    let sql = 'SELECT COUNT(*) AS count FROM collectlink WHERE telephone = ? AND articleId = ?'
    const [result] = await queryDB(sql, [telephone, articleId])
    console.log(result)
    res.status(200).json({
      data: result
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router
