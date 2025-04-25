//配置文件
require('dotenv').config()
module.exports = {
  DBHOST: 'localhost',
  DBPASSWORD: process.env.DB_PASSWORD,
  DBNAME: 'ocrdb',
  DBUSER: 'root',
  DBPORT: '3306',
  accessKeyId: process.env.ALICLOUD_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALICLOUD_ACCESS_KEY_SECRET,
  region: 'oss-cn-fuzhou',
  bucket: 'ocr-search',
  oss_root: 'ocr_paper_pdf'
}