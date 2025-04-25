const { createRouter, jsonParser, queryDB } = require('../utils/common.js')
const moment = require('moment')
const router = createRouter()

// 获取下载记录列表
router.get('/history', async (req, res) => {
  try {
    const telephone = req.query.telephone
    let sql = 'SELECT * FROM checkhistory WHERE telephone = ? ORDER BY readTime DESC'
    const result = await queryDB(sql, [telephone])
    res.status(200).json({
      message: '获取下载列表成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 添加历史记录
router.post('/history', jsonParser, async (req, res) => {
  try {
    const { telephone, articleName, articleId } = req.body
    const readTime = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(articleName, readTime)
    let sql = 'INSERT INTO checkhistory (telephone, articleName, readTime, articleId) VALUES (?, ?, ?, ?)'
    await queryDB(sql, [telephone, articleName, readTime, articleId])
    res.status(200).json({
      message: '添加历史记录成功'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 删除下载记录
router.delete('/history', jsonParser, async (req, res) => {
  try {
    const { telephone, id_arr } = req.query
    console.log(telephone, id_arr)
    let sql = 'DELETE FROM checkhistory WHERE articleId IN (?)'
    const result = await queryDB(sql, [id_arr])
    res.status(200).json({
      message: '删除历史记录成功',
      data: result
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router