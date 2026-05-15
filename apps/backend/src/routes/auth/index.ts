const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production'

const ACCESS_TOKEN_EXPIRY = 60 * 15 // 15 分钟
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7 // 7 天

interface RouteContext {
  request?: Request
  [key: string]: any
}

async function verifyToken(token: string, secret: string): Promise<any> {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.')
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const signatureInput = `${encodedHeader}.${encodedPayload}`
    const signatureBuffer = Uint8Array.from(atob(signature), c => c.charCodeAt(0))

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      encoder.encode(signatureInput)
    )

    if (!valid) return null

    const payload = JSON.parse(atob(encodedPayload))
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null

    return payload
  } catch {
    return null
  }
}

// Auth middleware 工厂函数
export function createAuthMiddleware(secret: string = JWT_SECRET) {
  return async (ctx: RouteContext): Promise<{ userId: string; username: string } | null> => {
    const authHeader = ctx.request?.headers?.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) return null
    const token = authHeader.slice(7)
    const payload = await verifyToken(token, secret)
    if (!payload || payload.type === 'refresh') return null
    return { userId: payload.userId, username: payload.username }
  }
}

export { JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, verifyToken }