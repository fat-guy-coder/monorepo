// import { Request, Response, NextFunction } from 'express'
import routes from '../routes/index'
import config from '../config/index'
// import menu from '../routes/menu'
// import cors from 'cors'

const express = require('express')
const https = require('https')
export  const app = express()

const router = express.Router()


//设置跨域 不用插件
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//   res.setHeader('Access-Control-Allow-Credentials', 'true') 
//   next()
// })



app.use(router)

app.use(express.static(config.static))

// app.use(menu)

app.use(routes)


// app.listen(config.port, function () {
//   console.log('服务启动');
// });

https.createServer(config, app).listen(config.port, function () {
  console.log('服务启动,端口:',config.port);
});

