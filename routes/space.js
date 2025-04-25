// routes/paper.js
const { createRouter, jsonParser, queryDB } = require('../utils/common.js')
const { isExistObject, list, putBuffer, put, deleteMultiObject } = require('../utils/oss.js')
const path = require('path')
const fs = require('fs')
const createMulterUpload = require('../utils/multer.js')

const PDF_DIR = '/pdf'
const upload = createMulterUpload(PDF_DIR, true)

const router = createRouter()

// 查询是否存在 loginId 的文件夹
router.get('/space/exist', async (req, res) => {
  let loginId = req.query.loginId + '/'
  const result = await isExistObject(loginId)
  if(result === false) {
    res.status(200).json({
      message: '不存在该用户空间',
      data: result
    })
  } else {
    res.status(200).json({
      message: '存在该用户空间',
      data: result
    })
  }
})

// 获取 loginId 的文件夹下的所有文件
router.get('/space/list', async (req, res) => {
  let loginId = req.query.loginId
  if (!loginId.endsWith('/')) {
    loginId + '/'
  }
  let options = {
    prefix: loginId
  }
  let result = await list(options)
  result.shift()
  const sortedResult = result.sort((a, b) => {
    const dateA = new Date(a.lastModified)
    const dateB = new Date(b.lastModified)
    return dateB - dateA
  })
  res.status(200).json({
    message: '获取文件列表成功',
    data: sortedResult
  })
})

// 创建文件夹
router.post('/space/create', jsonParser, async (req, res) => {
  let folder = req.body.folder
  if (!folder.endsWith('/')) {
    folder + '/'
  }
  const { result, message } = await putBuffer(folder)
  if(result === true) {
    res.status(200).json({
      message,
      data: result
    })
  } else {
    res.status(200).json({
      message,
      data: result
    })
  }
})

// 上传文件
router.post('/space/upload', upload.single('files'), async (req, res) => {
  let { spaceUri, fileUri } = req.body
  console.log(req)
  const file = req.file
  let filePath = path.normalize(file.destination + '/' + file.filename)
  if (!spaceUri || !fileUri) {
    return res.status(400).json({
      message: '参数缺失',
      data: null
    })
  }
  // console.log(filePath)
  const result = await put(spaceUri + file.filename, filePath)
  if(result.message === 'FileAlreadyExists') {
    res.status(200).json({
      message: '文件已经存在',
      data: 'upload'
    })
  } else {
    res.status(200).json({
      message: '上传文件成功',
      data: 'upload'
    })
  }
  try {
    await fs.unlink(filePath, (err) => {
      if (err) {
        console.error('删除文件时出错:', err)
      }
    })
  } catch {
    res.status(200).json({
      message: '服务端错误',
      data: 'upload'
    })
  }
})

// 删除文件
router.delete('/space/delete', jsonParser, async (req, res) => {
  let paths = Object.values(req.query)
  const result = await deleteMultiObject(paths)
  if(result === true) {
    res.status(200).json({
      message: '删除文件成功',
      data: result
    })
  } else {
    res.status(200).json({
      message: '删除文件失败',
      data: result
    })
  }
})


module.exports = router