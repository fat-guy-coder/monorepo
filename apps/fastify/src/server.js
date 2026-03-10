import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import prismaPlugin from './plugins/prisma.js'

const app = Fastify({ logger: true })

// Plugins
await app.register(cors)
await app.register(helmet)
await app.register(prismaPlugin)

// Routes
app.get('/health', async () => ({ status: 'ok' }))

app.get('/users', async (req, reply) => {
  const users = await app.prisma.user.findMany({ orderBy: { id: 'asc' } })
  return users
})

app.get('/users/:id', async (req, reply) => {
  const { id } = req.params
  const user = await app.prisma.user.findUnique({ where: { id: Number(id) } })
  if (!user) return reply.code(404).send({ message: 'Not found' })
  return user
})

app.post('/users', async (req, reply) => {
  const body = req.body || {}
  const user = await app.prisma.user.create({
    data: { email: body.email, name: body.name ?? null },
  })
  return reply.code(201).send(user)
})

app.delete('/users/:id', async (req, reply) => {
  const { id } = req.params
  await app.prisma.user.delete({ where: { id: Number(id) } })
  return reply.code(204).send()
})

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

try {
  await app.listen({ port, host })
  app.log.info(`Server running at http://${host}:${port}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

