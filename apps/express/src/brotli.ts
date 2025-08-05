import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import config from '../config/index'

const staticDir = config.static

export const brotli = (req:Request, res:Response, next:NextFunction) => {
  const acceptEncoding = req.headers['accept-encoding'];
  const filePath = path.join(staticDir, req.path);
  const brotliPath = `${filePath}.br`;

  // 检查客户端是否支持 Brotli
  if (acceptEncoding && acceptEncoding.includes('br') && 
      fs.existsSync(brotliPath)) {
      
      // 设置响应头
      res.set('Content-Encoding', 'br');
      
      // 根据文件类型设置 Content-Type
      const ext = path.extname(filePath);
      switch (ext) {
        case '.html': res.type('text/html'); break;
        case '.css': res.type('text/css'); break;
        case '.js': res.type('application/javascript'); break;
      }
      
      // 发送压缩文件
      res.sendFile(brotliPath);
  } else {
      // 不支持 Brotli 或文件不存在，继续处理
      next();
  }
}