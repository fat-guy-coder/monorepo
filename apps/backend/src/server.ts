/// <reference types="bun-types" />
import { routes } from './routes/menu'

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

const server = Bun.serve({
  port,
  hostname: host,
  async fetch(req) {
    const url = new URL(req.url)
    const pathname = url.pathname
    const method = req.method

    // CORS 预检请求
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
    for (const route of routes) {
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
            body: method !== 'GET' && method !== 'HEAD' ? await req.text() : undefined,
            async json() {
              if (this.body) {
                return JSON.parse(this.body)
              }
              return undefined
            }
          }

          return await route.handler(ctx)
        } catch (err) {
          console.error(err)
          return Response.json({ code: 500, message: 'Internal server error', data: null }, { status: 500 })
        }
      }
    }

    // 404
    return Response.json({ code: 404, message: 'Not found', data: null }, { status: 404 })
  },
})

console.log(`Server running at http://${host}:${port}`)
