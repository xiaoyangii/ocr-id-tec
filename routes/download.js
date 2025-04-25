const { createRouter, jsonParser, queryDB } = require('../utils/common.js')
const moment = require('moment')
const router = createRouter()

// 获取下载记录列表
router.get('/downloadrecord', async (req, res) => {
  try {
    const telephone = req.query.telephone
    let sql = 'SELECT * FROM download WHERE telephone = ? ORDER BY downloadTime DESC'
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

// 添加下载记录
router.post('/downloadrecord', jsonParser, async (req, res) => {
  try {
    const { telephone, articleName, downloadPath, objKey } = req.body
    const downloadTime = moment().format('YYYY-MM-DD HH:mm:ss')
    
    let sql = 'INSERT INTO download (telephone, articleName, downloadPath, downloadTime, objKey) VALUES (?, ?, ?, ?, ?)'
    await queryDB(sql, [telephone, articleName, downloadPath, downloadTime, objKey])
    res.status(200).json({
      message: '添加下载记录成功'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 删除下载记录
router.delete('/downloadrecord', jsonParser, async (req, res) => {
  try {
    const { telephone, id_arr } = req.query
    console.log(telephone, id_arr)
    let sql = 'DELETE FROM download WHERE articleId IN (?)'
    const result = await queryDB(sql, [id_arr])
    res.status(200).json({
      message: '删除下载记录成功',
      data: result
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router