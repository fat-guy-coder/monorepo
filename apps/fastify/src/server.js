import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import prismaPlugin from './plugins/prisma.js'
import menuRoutes from './routes/menu.js'

const app = Fastify({ logger: true })

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
