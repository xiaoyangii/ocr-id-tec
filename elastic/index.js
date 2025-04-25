const { Client } = require('@elastic/elasticsearch')
require('dotenv').config()

// 创建 Elasticsearch 客户端实例
const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: process.env.ELASTIC_PASSWORD
  }
})

async function connectionToEs() {
  try {
    const res = await client.ping()
    console.log('Connection success', res)
  } catch (err) {
    console.error('Wrong connection', err)
  }
}

connectionToEs()

module.exports = client