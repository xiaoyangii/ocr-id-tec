const multer = require('multer')
const path = require('path')
const iconv = require('iconv-lite')

const MAIN_PATH = '/public/upload'

/**
 * 封装 multer 配置，可指定上传目录
 * @param {string} uploadDir 上传目录
 * @returns {Object} multer 实例
 */
function createMulterUpload(uploadDir, realName = false) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 指定文件存储的目录
      cb(null, path.dirname(__dirname) + MAIN_PATH + uploadDir)
    },
    filename: function (req, file, cb) {
      if(!realName) {
        // 指定文件名，使用原文件名加上时间戳，避免文件名冲突
        console.log('mul', file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtension = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
      } else {
        // 将 originalname 从 7bit 编码转换为 UTF-8 编码
        const buffer = Buffer.from(file.originalname, 'binary')
        const decodedName = iconv.decode(buffer, 'utf-8')
        cb(null, decodedName)
      }
    }
  })

  return multer({ storage: storage })
}

module.exports = createMulterUpload