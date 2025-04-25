const { createRouter, jsonParser, queryDB } = require('../utils/common.js')
const { downloadFile, getDownloadUrl, copyObject, deleteMultiObject } = require('../utils/oss.js')
const path = require('path')
const moment = require('moment')

const router = createRouter()

// 加入回收站
router.post('/recyclebin', jsonParser, async (req, res) => {
  try {
    const { paper_arr, telephone } = req.body
    let sql = 'INSERT INTO recyclebin (telephone, articleName, deleteTime) VALUES ?'
    const values = []
    // const downloadPromises = []

    paper_arr.forEach(async (item) => {
      const articleName = path.basename(item.name)
      const deleteTime = moment().format('YYYY-MM-DD HH:mm:ss')
      values.push([telephone, articleName, deleteTime])

      copyObject(item.name, 'recycle/' + telephone + '/' + articleName)
      // const downloadPromise = getDownloadUrl(item.name)
      // .then(url => downloadFile(url, articleName))
      // downloadPromises.push(downloadPromise)
    })
    // await Promise.all(downloadPromises)

    const result = await queryDB(sql, [values])
    
    res.status(200).json({
      message: '加入回收站成功',
      data: {
        result,
        flag: true
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 获取回收站列表
router.get('/recyclebin', async (req, res) => {
  try {
    const telephone = req.query.telephone
    let sql = 'SELECT * FROM recyclebin WHERE telephone = ? ORDER BY deleteTime DESC'
    const result = await queryDB(sql, [telephone])
    res.status(200).json({
      message: '获取回收站列表成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 删除回收站记录
router.delete('/recyclebin', jsonParser, async (req, res) => {
  try {
    const { id_arr, name_arr, telephone } = req.query
    console.log(id_arr, name_arr, telephone)
    deleteMultiObject(name_arr.map(item => 'recycle/' + telephone + '/' + item))
    let sql = 'DELETE FROM recyclebin WHERE articleId IN (?)'
    const result = await queryDB(sql, [id_arr])
    res.status(200).json({
      message: '删除回收站记录成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 还原回收站记录
router.post('/recyclebin/recover', jsonParser, async (req, res) => {
  try {
    const { id_arr, name_arr, telephone } = req.body

    const recoverPromises = []
    name_arr.forEach(item => {
      const oldName = 'recycle/' + telephone + '/' + item
      const newName = telephone + '/' + item
      recoverPromises.push(copyObject(oldName, newName))
    })
    await Promise.all(recoverPromises)
    deleteMultiObject(name_arr.map(item => 'recycle/' + telephone + '/' + item))

    sql = 'DELETE FROM recyclebin WHERE articleId IN (?)'
    const deleteResult = await queryDB(sql, [id_arr])
    res.status(200).json({
      message: '还原回收站记录成功',
      data: deleteResult
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router

