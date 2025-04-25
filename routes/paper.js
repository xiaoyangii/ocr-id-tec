// routes/paper.js
const { search } = require("../elastic/api/paper.js")
const { createRouter, jsonParser, queryDB } = require('../utils/common.js')
const { getDownloadUrl, copyObject } = require('../utils/oss.js')

const router = createRouter()

// 获取全部论文
router.get('/papers', async (req, res) => {
  try {
    let id = req.query.scrollId
    let topic_name = req.query.topic_name
    console.log(topic_name)
    if(id == undefined) {
      id = null
    }
    const { results,  scrollId, hasMore } = await search('', '', topic_name, 20, id)
    res.status(200).json({
      message: '获取全部论文成功',
      data: results,
      scrollId: scrollId,
      hasMore
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误', data: [], scrollId: null, hasMore: false })
  }
})

// 检索
router.get('/search', async (req, res) => {
  try {
    const { keyWord, year, topic_name } = req.query
    let id = req.query.scrollId
    if(id == undefined) {
      id = null
    }
    const { results, scrollId, hasMore } = await search(keyWord, year, topic_name, 20, id)
    res.status(200).json({
      message: '检索成功',
      data: results,
      scrollId: scrollId,
      hasMore
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误', data: [], scrollId: null, hasMore: false })
  }
})

// 获取论文详情
router.get('/papers/:id', async (req, res) => {
  try {
    let sql = 'SELECT * FROM paper WHERE paper_id = ?'
    let id = req.params.id
    console.log(id)
    const result = await queryDB(sql, [id])
    res.status(200).json({
      message: '获取论文详情成功',
      data: result[0]
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误', data: [] })
  }
})

// 获取论文下载链接
router.get('/download', async (req, res) => {
  try {
    let { objKey } = req.query
    const url = await getDownloadUrl(objKey)
    res.status(200).json({
      message: '获取下载链接成功',
      data: url
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误', data: '' })
  }
})

// 获取文章评分
router.get('/score', async (req, res) => {
  try {
    let { paperId } = req.query
    let sql = 'SELECT content_score, click_score, like_score FROM paper WHERE paper_id = ?'
    const [result] = await queryDB(sql, [paperId])
    res.status(200).json({
      message: '获取评分成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误', data: {} })
  }
})

// 获取文章pdf
router.get('/pdf', async (req, res) => {
  try {
    let { paperId } = req.query
    let sql = 'SELECT paper_path FROM paper WHERE paper_id = ?'
    const [result] = await queryDB(sql, [paperId])
    res.status(200).json({
      message: '获取pdf成功',
      data: result.paper_path
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误', data: '' })
  }
})

// 获取主题类别
router.get('/topic', async (req, res) => {
  try {
    let sql = 'SELECT * FROM topic'
    const result = await queryDB(sql, [])
    res.status(200).json({
      message: '获取主题类别成功',
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误', data: [] })
  }
})

// 论文入库
router.post('/tostore', jsonParser, async (req, res) => {
  try {
    const { oriPath, nowPath } = req.body
    console.log(oriPath, nowPath)
    const result = await copyObject(oriPath, nowPath)
    if(!result) {
      res.status(500).json({ message: '论文入库失败' })
      return
    }
    res.status(200).json({
      message: '论文入库成功'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router