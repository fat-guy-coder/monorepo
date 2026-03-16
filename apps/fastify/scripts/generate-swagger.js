import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import menuRoutes from '../src/routes/menu.js'

const app = Fastify({ logger: false })

// Swagger 配置
await app.register(swagger, {
  openapi: {
    info: {
      title: 'Menu API',
      description: '菜单管理 API 文档',
      version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:3000' }]
  }
})

// 注册路由
await app.register(menuRoutes, { prefix: '/api' })

// 等待路由初始化完成
await app.ready()

// 生成 OpenAPI 规范
const openapi = app.swagger()

// 使用 js-yaml 生成正确格式的 YAML
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 生成到 api/menu/swagger.yaml
const outputDir = path.join(__dirname, '../api/menu')
const outputPath = path.join(outputDir, 'swagger.yaml')

// 确保目录存在
fs.mkdirSync(outputDir, { recursive: true })

// 使用 js-yaml 正确生成 YAML
const yamlContent = yaml.dump(openapi, {
  indent: 2,
  lineWidth: -1,
  noRefs: true,
  sortKeys: false
})

fs.writeFileSync(outputPath, yamlContent)

console.log(`Swagger YAML 已生成: ${outputPath}`)
