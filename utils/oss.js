const { client } = require('../config/oss.js')
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')
const headers = {
  // 指定Object的存储类型。
  'x-oss-storage-class': 'Standard',
  // 指定Object的访问权限。公共读写
  'x-oss-object-acl': 'public-read-write',
  // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
  // 'Content-Disposition': 'attachment; filename="example.txt"',
  // 设置Object的标签，可同时设置多个标签。
  // 'x-oss-tagging': 'Tag1=1&Tag2=2',
  // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  'x-oss-forbid-overwrite': 'true',
}

/**
 * 
 * @param {string} objectKey: 文件在oss的路径
 * @param {number} expiration: 过期时间，默认为 3600 秒
 * @returns {string} url: 文件的下载链接
 * @description 获取文件的下载链接
 */
// 定义获取下载链接的函数
async function getDownloadUrl(objectKey, expiration = 3600) {
  try {
    // 生成文件的下载链接
    const url = await client.signatureUrl(objectKey, {
      expires: expiration
    })
    return url
  } catch (error) {
    console.error('获取下载链接时出错:', error)
    throw error
  }
}

/**
 * @param {string} name: 文件夹名称, 也可以是文件路径, 以正斜线结尾
 * @param {object} options: 配置项, 默认为空, 用于判断受版本控制Bucket中指定versionId的Object是否存在
 * @returns {boolean} true: 文件夹存在, false: 文件夹不存在
 * @description 检查文件夹是否存在
 */
async function isExistObject(name, options = {}) {
  try {
    const { res } = await client.head(name, options)
    if(res.statusCode === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      return false
    }
  }
}

/**
 * 
 * @param {*} folder: 文件夹名称, 以正斜线结尾
 * @returns {boolean} true: 创建成功, false: 创建失败
 * @description 创建文件夹
 */
async function putBuffer(folder) {
  try {
    const isE = await isExistObject(folder)
    if(isE) {
      return { result: true, message: '文件夹已存在' }
    }
    const { res } = await client.put(folder, new Buffer(''))
    if(res.statusCode === 200) {
      return { result: true, message: '文件夹创建成功' }
    } else {
      return { result: false, message: '文件夹创建失败' }
    }
  } catch (e) {
    return { result: false, message: '文件夹创建失败' }
  }
}
// putBuffer('E:/pytest/ocr/医药卫生综合/解放军医学杂志')

/**
 * @params {string} spaceUri: oss文件路径
 * @params {string} fileUri: 本地文件路径
 * @returns
 * @description 上传文件
 */
async function put(spaceUri, fileUri) {
  try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const { res, name, url } = await client.put(spaceUri, fileUri, {headers})
    if(res.statusCode === 200) {
      let newUrl = url.replace('http://ocr-search.oss-cn-fuzhou.aliyuncs.com/', '')
      return {
        name,
        url: newUrl,
        isPut: true,
        message: '文件上传成功'
      }
    }
  } catch (e) {
    console.log(e)
    return {
      // name: e.params.object,
      url: '',
      isPut: false,
      // message: e.code,
    }
  }
}

// put('15860920147/中医杂志', 'E:/pytest/ocr/中医学/中医杂志')

/**
 * @param {string} name: 文件名称
 * @description 删除目录
 */
// 处理删除请求失败的情况, 防止promise中断
async function handleDel(name, options) {
  try {
    await client.delete(name)
  } catch (error) {
    error.failObjectName = name
    return error
  }
}
/**
 * @param {string} prefix: 文件夹名称, 以正斜线结尾
 * @returns {boolean} true: 删除成功, false: 删除失败
 * @description 删除指定的文件夹
 */
async function deletePrefix(prefix) {
  const list = await client.list({
    prefix
  })

  list.objects = list.objects || []
  const result = await Promise.all(list.objects.map((v) => handleDel(v.name)))
  if (result.every((v) => !v)) {
    return true
  } else {
    return false
  }
}

/**
 * @param {object} options: 配置项, 默认为空, 用于获取文件列表
 * @param {string} options.prefix: 指定文件名前缀
 * @param {string} options.delimiter: 对文件名称进行分组的字符
 * @param {string} options.max-keys: 指定最多返回的文件个数, 默认最多100
 * @param {boolean} options.fetch-owner: 是否在返回结果中包含owner信息
 * @param {string} options.continuation-token: 从此token开始获取文件列表, 用于分页获取文件
 * @return {array} objects: 文件列表
 * @returns {string} objects[].name: 文件名, 即文件路径
 * @returns {string} objects[].url: 文件大小
 * @description 获取文件列表
 */
async function list(options = {}) {
  const { res, objects } = await client.listV2(options)
  if(res.statusCode === 200) {
    return objects
  } else {
    return []
  }
}

// list(options)

/**
 * @param {string} oldName: 原文件名
 * @param {string} newName: 新文件名
 * @returns {boolean} true: 重命名成功, false: 重命名失败
 * @description 重命名文件/文件夹
 */
async function renameObject(oldName, newName) {
  try {
    // 将oldName拷贝至同一Bucket下的newName
    const r = await client.copy(newName, oldName)
    console.log('拷贝成功', r)
    // 删除oldName
    const deleteResult = await client.delete(oldName)
    console.log(deleteResult)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

/**
 * @param {string} path: 文件路径
 * @returns {boolean} true: 删除成功, false: 删除失败
 * @description 删除文件
 */
async function deleteObject(path) {
  try {
    const { res } = await client.delete(path)
    if(res.statusCode === 204) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * @param {array} paths: 文件路径数组
 * @returns {boolean} true: 删除成功, false: 删除失败
 * @description 删除多个文件
 */
async function deleteMultiObject(paths) {
  try {
    const { res } = await client.deleteMulti(paths, {quiet: true})
    if(res.statusCode === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * 
 * @param {String} oldName 原文件路径
 * @param {String} newName 现文件路径
 * @returns {Boolean} true: 拷贝成功, false: 拷贝失败
 * @description 拷贝文件，转移
 */
async function copyObject(oldName, newName) {
  try {
    const { res } = await client.copy(newName, oldName)
    if(res.statusCode === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
// copyObject('15860920147/test.jpg', 'recycle/15860920147/test.jpg')

// 定义 recycle 文件路径
const uploadFolder = path.join('E:/桌面/server/public/upload/', 'recycle')
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    console.log(url)
    const protocol = url.startsWith('https') ? https : http
    const filePath = path.join(uploadFolder, filename)

    const fileStream = fs.createWriteStream(filePath)
    protocol.get(url, (response) => {
      if (response.statusCode!== 200) {
        reject(new Error(`请求失败，状态码: ${response.statusCode}`))
        return
      }

      response.pipe(fileStream)

      fileStream.on('finish', () => {
        fileStream.close()
        resolve()
      })

      fileStream.on('error', (err) => {
        fs.unlinkSync(filePath)
        reject(err)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}
// downloadFile("http://ocr-search.oss-cn-fuzhou.aliyuncs.com/15860920147/B%E7%BB%86%E8%83%9E%E6%B7%8B%E5%B7%B4%E7%98%A4%E5%8F%91%E7%97%85%E5%85%B3%E9%94%AE%E6%9C%BA%E5%88%B6_...CR%E4%BF%A1%E5%8F%B7%E9%80%94%E5%BE%84%E6%BF%80%E6%B4%BB%E8%BF%9B%E5%B1%95%E5%8F%8A%E5%B1%95%E6%9C%9B_%E9%AB%98%E5%AD%90%E6%98%AD.pdf?OSSAccessKeyId=LTAI5tQsyxYUGZu87aYKEY7X&Expires=1742985414&Signature=cGgZgH4PJF9vbxbhY5YxtouVk9Q%3D", 'B细胞淋巴瘤发病关键机制_...CR信号途径激活进展及展望_高子昭.pdf')

module.exports = {
  getDownloadUrl,
  downloadFile,
  copyObject,
  putBuffer,
  put,
  isExistObject,
  list,
  renameObject,
  deleteObject,
  deleteMultiObject,
  deletePrefix
}