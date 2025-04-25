const { createRouter, jsonParser, connection } = require('../utils/common.js')
const path = require('path')
const createMulterUpload = require('../utils/multer.js')

const AVATAR_DIR = '/avatar'
const upload = createMulterUpload(AVATAR_DIR)

const router = createRouter()

// 通过telephone查询个人资料
router.get('/personal', (req, res) => {
  try {
    const telephone = req.query.telephone
    let sql = `SELECT * FROM user WHERE telephone = ?`
    connection.query(sql, [telephone], (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: err })
        return
      }
      const user = results[0]
      res.status(200).json(user)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 修改个人、主页资料
router.put('/personal', jsonParser, (req, res) => {
  try {
    const { telephone, ...updateData } = req.body
    const updateKeys = Object.keys(updateData)
    const updateValues = Object.values(updateData)
    const setClause = updateKeys.map(key => `${key} = ?`).join(', ')
    const sql = `UPDATE user SET ${setClause} WHERE telephone = ?`
    const values = [...updateValues, telephone]

    connection.query(sql, values, (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: err })
        return
      }
      if (results.affectedRows > 0) {
        res.status(200).json({ message: '个人资料修改成功' })
      } else {
        res.status(404).json({ message: '未找到该用户，修改失败' })
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 上传头像
router.post('/avatar', upload.single('files'), (req, res) => {
  try {
    const { telephone } = req.body
    const fullPath = req.file.path
    const avatarPath = fullPath.slice(fullPath.indexOf('upload'))
    
    const sql = `UPDATE user SET avatar = ? WHERE telephone = ?`
    
    connection.query(sql, [avatarPath, telephone], (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: err })
        return
      }
      if (results.affectedRows > 0) {
        const baseUrl = req.protocol + '://' + req.get('host')
        const avatarUrl = `${baseUrl}/upload${AVATAR_DIR}/${path.basename(avatarPath)}`
        res.status(200).json({ message: '头像上传成功', avatarUrl })
      } else {
        res.status(404).json({ message: '未找到该用户，头像上传失败' })
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

// 获取头像
router.get('/avatar', (req, res) => {
  try {
    const telephone = req.query.telephone
    const sql = `SELECT avatar FROM user WHERE telephone = ?`
    connection.query(sql, [telephone], (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: err })
        return
      }
      const user = results[0]
      if (!user.avatar) {
        res.status(404).json({ message: '未找到该用户的头像' })
        return
      }
      const baseUrl = req.protocol + '://' + req.get('host')
      const avatarUrl = `${baseUrl}/${user.avatar}`
      res.status(200).json({ avatarUrl })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router