import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import prismaPlugin from './plugins/prisma.js'
import menuRoutes from './routes/menu.js'

const app = Fastify({ logger: true })

// 统一响应格式钩子
app.addHook('onSend', async (request, reply, payload) => {
  // 如果已经是标准格式或者不是对象，直接返回
  if (typeof payload !== 'object' || payload === null) return payload

  // 跳过 null 和字符串
  if (payload instanceof Buffer || typeof payload === 'string') return payload

  // 如果已经有 code 字段，说明已经是标准格式
  if (payload.code !== undefined) return payload

  // 包装响应：{ data } -> { code: 200, message: 'success', data }
  return {
    code: 200,
    message: 'success',
    data: payload
  }
})

// Plugins
await app.register(cors)
await app.register(helmet)
await app.register(prismaPlugin)

// 注册路由，添加 /api 前缀
await app.register(menuRoutes, { prefix: '/api' })

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

try {
  await app.listen({ port, host })
  app.log.info(`Server running at http://${host}:${port}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
