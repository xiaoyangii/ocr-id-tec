const express = require('express')
const connection = require('../db/db.js')
const bodyParser = require('body-parser')

// 解析 JSON 格式的请求体的中间件
const jsonParser = bodyParser.json()
// 解析 querystring 格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 创建路由对象
function createRouter() {
  const router = express.Router()
  return router
}

// 封装connection.query为异步函数
function queryDB(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {
  express,
  connection,
  queryDB,
  jsonParser,
  urlencodedParser,
  createRouter
}