import fs from 'fs'

const config = {
  port: 8888,//端口
  static: "myvue",//静态文件目录
  key:fs.readFileSync('C:/Users/admin/Desktop/front-end-project/project/apps/express/config/denglie.asia.key', 'utf-8'), //测试
  cert:fs.readFileSync('C:/Users/admin/Desktop/front-end-project/project/apps/express/config/denglie.asia.pem', 'utf-8'), //测试 
}


export default config