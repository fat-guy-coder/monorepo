/// <reference types="bun-types" />
import { routes } from './routes/menu'
import { userRoutes } from './routes/user'
import { roleRoutes } from './routes/role'

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'


const server = Bun.serve({
  port,
  hostname: host,
  async fetch(req) {
    const url = new URL(req.url)
    const pathname = url.pathname
    const method = req.method

    // CORS 预检请求 - 仅允许本地开发环境
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      })
    }

    // 匹配路由
    const allRoutes = [...routes, ...userRoutes, ...roleRoutes]
    for (const route of allRoutes) {
      if (route.method !== method) continue

      const match = pathname.match(route.pattern)
      if (match) {
        const params: Record<string, string> = {}
        // 从正则捕获组提取参数
        for (let i = 1; i < match.length; i++) {
          params[i.toString()] = match[i]
        }

        try {
          const ctx = {
            pathname,
            method,
            url,
            params,
            query: Object.fromEntries(url.searchParams),
            request: req,
            body: method !== 'GET' && method !== 'HEAD' ? await req.text() : undefined,
            async json() {
              if (this.body) {
                return JSON.parse(this.body)
              }
              return undefined
            }
          }

          const response = await route.handler(ctx)
          // 给响应加上 CORS 头
          response.headers.set('Access-Control-Allow-Origin', '*')
          return response
        } catch (err) {
          console.error(err)
          return Response.json({ code: 500, message: 'Internal server error', data: null }, { status: 500 })
        }
      }
    }

    // 404
    return Response.json(
      { code: 404, message: 'Not found', data: null },
      { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  },
})

console.log(`Server running at http://${host}:${port}`)
