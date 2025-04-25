const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const authRouter = require('./routes/auth.js')
const personalRouter = require('./routes/personal.js')
const paperRouter = require('./routes/paper.js')
const spaceRouter = require('./routes/space.js')
const recyclebinRouter = require('./routes/recyclebin.js')
const downloadRouter = require('./routes/download.js')
const historyRouter = require('./routes/history.js')
const collectionRouter = require('./routes/collect.js')
const subscribeRouter = require('./routes/subscribe.js')

// 全局应用中间件
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(authRouter)
app.use(personalRouter)
app.use(paperRouter)
app.use(spaceRouter)
app.use(recyclebinRouter)
app.use(downloadRouter)
app.use(historyRouter)
app.use(collectionRouter)
app.use(subscribeRouter)

// 开启服务器
app.listen(3000, '127.0.0.1', () => {
  console.log('服务器在127.0.0.1:3000开启......')
})
