import { db } from '../db'
import { user, role, userRole } from '../db/schema'
import { eq, and } from 'drizzle-orm'
import { JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, verifyToken, createAuthMiddleware } from './auth'

const success = (data: any, message = 'success') => ({ code: 200, message, data })
const error = (message: string, code = 500) => ({ code, message, data: null })

interface RouteContext {
  pathname: string
  method: string
  url: URL
  params: Record<string, string>
  query: Record<string, string>
  body: any
  request?: Request
  json: () => Promise<any>
}

type RouteHandler = (ctx: RouteContext) => Promise<Response>

export const userRoutes: Array<{ method: string; pattern: RegExp; handler: RouteHandler }> = []

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function createToken(payload: object, secret: string, expiresIn: number): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const data = { ...payload, iat: now, exp: now + expiresIn }

  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '')
  const encodedPayload = btoa(JSON.stringify(data)).replace(/=/g, '')
  const signatureInput = `${encodedHeader}.${encodedPayload}`

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signatureInput))
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g, '')

  return `${signatureInput}.${signatureBase64}`
}

const authMiddleware = createAuthMiddleware(JWT_SECRET)

// POST /api/user/register
userRoutes.push({
  method: 'POST',
  pattern: /^\/api\/user\/register$/,
  handler: async (ctx) => {
    const body = await ctx.json()
    const { username, password } = body || {}

    if (!username || !password) {
      return Response.json(error('用户名和密码不能为空', 400), { status: 400 })
    }

    if (username.length < 3 || password.length < 6) {
      return Response.json(error('用户名至少3位，密码至少6位', 400), { status: 400 })
    }

    // 检查用户名是否已存在
    const existing = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.username, username),
    })
    if (existing) {
      return Response.json(error('用户名已存在', 409), { status: 409 })
    }

    const hashedPassword = await hashPassword(password)
    const newUser = await db.insert(user).values({
      username,
      password: hashedPassword,
    }).returning()

    return Response.json(success({ id: newUser[0].id, username: newUser[0].username }, '注册成功'), { status: 201 })
  },
})

// POST /api/user/login
userRoutes.push({
  method: 'POST',
  pattern: /^\/api\/user\/login$/,
  handler: async (ctx) => {
    const body = await ctx.json()
    const { username, password } = body || {}

    if (!username || !password) {
      return Response.json(error('用户名和密码不能为空', 400), { status: 400 })
    }

    const existing = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.username, username),
    })
    if (!existing) {
      return Response.json(error('用户名或密码错误', 401), { status: 401 })
    }

    const hashedPassword = await hashPassword(password)
    if (hashedPassword !== existing.password) {
      return Response.json(error('用户名或密码错误', 401), { status: 401 })
    }

    // 生成 token
    const accessToken = await createToken(
      { userId: existing.id, username: existing.username },
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRY
    )
    const refreshToken = await createToken(
      { userId: existing.id, username: existing.username, type: 'refresh' },
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXPIRY
    )

    return Response.json(success({
      accessToken,
      refreshToken,
      user: { id: existing.id, username: existing.username }
    }, '登录成功'))
  },
})

// POST /api/user/refresh
userRoutes.push({
  method: 'POST',
  pattern: /^\/api\/user\/refresh$/,
  handler: async (ctx) => {
    const body = await ctx.json()
    const { refreshToken } = body || {}

    if (!refreshToken) {
      return Response.json(error('Refresh token 不能为空', 400), { status: 400 })
    }

    // 验证 refresh token
    const payload = await verifyToken(refreshToken, JWT_REFRESH_SECRET)
    if (!payload || payload.type !== 'refresh') {
      return Response.json(error('无效的 Refresh token', 401), { status: 401 })
    }

    // 生成新的 access token
    const accessToken = await createToken(
      { userId: payload.userId, username: payload.username },
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRY
    )
    const newRefreshToken = await createToken(
      { userId: payload.userId, username: payload.username, type: 'refresh' },
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXPIRY
    )

    return Response.json(success({ accessToken, refreshToken: newRefreshToken }))
  },
})

// GET /api/user/me
userRoutes.push({
  method: 'GET',
  pattern: /^\/api\/user\/me$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    // 查询用户角色
    const relations = await db.query.userRole.findMany({
      where: (ur, { eq }) => eq(ur.userId, auth.userId),
    })
    const roles: { id: string; name: string }[] = []
    for (const rel of relations) {
      const r = await db.query.role.findFirst({ where: (rl, { eq }) => eq(rl.id, rel.roleId) })
      if (r) roles.push({ id: r.id, name: r.name })
    }

    return Response.json(success({ id: auth.userId, username: auth.username, roles }))
  },
})

// PUT /api/user/password
userRoutes.push({
  method: 'PUT',
  pattern: /^\/api\/user\/password$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    const body = await ctx.json()
    const { currentPassword, newPassword } = body || {}

    if (!currentPassword || !newPassword) {
      return Response.json(error('当前密码和新密码不能为空', 400), { status: 400 })
    }
    if (newPassword.length < 6) {
      return Response.json(error('新密码至少6位', 400), { status: 400 })
    }

    // 查询用户并验证当前密码
    const existing = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.id, auth.userId),
    })
    if (!existing) {
      return Response.json(error('用户不存在', 404), { status: 404 })
    }

    const hashedCurrent = await hashPassword(currentPassword)
    if (hashedCurrent !== existing.password) {
      return Response.json(error('当前密码错误', 401), { status: 401 })
    }

    // 更新密码
    const hashedNew = await hashPassword(newPassword)
    await db.update(user)
      .set({ password: hashedNew, updatedAt: new Date() })
      .where(eq(user.id, auth.userId))

    return Response.json(success(null, '密码修改成功'))
  },
})

// POST /api/user/logout
userRoutes.push({
  method: 'POST',
  pattern: /^\/api\/user\/logout$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }
    return Response.json(success(null, '登出成功'))
  },
})

// ----- 用户管理 API -----

// GET /api/users - 获取所有用户（含角色信息）
userRoutes.push({
  method: 'GET',
  pattern: /^\/api\/users$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    const users = await db.select({ id: user.id, username: user.username, createdAt: user.createdAt }).from(user)

    // 为每个用户查询角色
    const result = await Promise.all(users.map(async (u) => {
      const relations = await db.query.userRole.findMany({
        where: (ur, { eq }) => eq(ur.userId, u.id),
      })
      const roleIds = relations.map(r => r.roleId)
      const roles = roleIds.length > 0
        ? await db.select().from(role).where(/* IN clause workaround */ eq(role.id, roleIds[0]))
        : []
      // 简单收集所有角色
      const allRoles: any[] = []
      for (const roleId of roleIds) {
        const r = await db.query.role.findFirst({ where: (rl, { eq }) => eq(rl.id, roleId) })
        if (r) allRoles.push({ id: r.id, name: r.name })
      }
      return { ...u, roles: allRoles }
    }))

    return Response.json(success(result))
  },
})

// PUT /api/users/:id - 更新用户
userRoutes.push({
  method: 'PUT',
  pattern: /^\/api\/users\/([^/]+)$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    const id = ctx.params['1']
    const body = await ctx.json()
    const { username, password } = body || {}

    const existing = await db.query.user.findFirst({ where: (u, { eq }) => eq(u.id, id) })
    if (!existing) {
      return Response.json(error('用户不存在', 404), { status: 404 })
    }

    const updates: any = { updatedAt: new Date() }
    if (username !== undefined) updates.username = username
    if (password !== undefined) updates.password = await hashPassword(password)

    await db.update(user).set(updates).where(eq(user.id, id))
    const updated = await db.query.user.findFirst({ where: (u, { eq }) => eq(u.id, id) })
    return Response.json(success({ id: updated!.id, username: updated!.username }, '更新成功'))
  },
})

// DELETE /api/users/:id - 删除用户
userRoutes.push({
  method: 'DELETE',
  pattern: /^\/api\/users\/([^/]+)$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    const id = ctx.params['1']
    const existing = await db.query.user.findFirst({ where: (u, { eq }) => eq(u.id, id) })
    if (!existing) {
      return Response.json(error('用户不存在', 404), { status: 404 })
    }

    // 删除用户角色关联
    await db.delete(userRole).where(eq(userRole.userId, id))
    // 删除用户
    await db.delete(user).where(eq(user.id, id))

    return Response.json(success(null, '删除成功'))
  },
})

// GET /api/users/:id/roles - 获取用户的角色
userRoutes.push({
  method: 'GET',
  pattern: /^\/api\/users\/([^/]+)\/roles$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    const userId = ctx.params['1']
    const relations = await db.query.userRole.findMany({
      where: (ur, { eq }) => eq(ur.userId, userId),
    })

    const roles: any[] = []
    for (const rel of relations) {
      const r = await db.query.role.findFirst({ where: (rl, { eq }) => eq(rl.id, rel.roleId) })
      if (r) roles.push({ id: r.id, name: r.name, description: r.description })
    }

    return Response.json(success(roles))
  },
})

// POST /api/users/:id/roles - 给用户绑定角色
userRoutes.push({
  method: 'POST',
  pattern: /^\/api\/users\/([^/]+)\/roles$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    const userId = ctx.params['1']
    const body = await ctx.json()
    const { roleId } = body || {}

    if (!roleId) {
      return Response.json(error('角色ID不能为空', 400), { status: 400 })
    }

    // 检查是否已关联
    const existing = await db.query.userRole.findFirst({
      where: (ur, { eq }) => and(eq(ur.userId, userId), eq(ur.roleId, roleId)),
    })
    if (existing) {
      return Response.json(error('用户已绑定该角色', 409), { status: 409 })
    }

    const newRelation = await db.insert(userRole).values({ userId, roleId }).returning()
    return Response.json(success(newRelation[0], '绑定成功'), { status: 201 })
  },
})

// DELETE /api/users/:id/roles/:roleId - 解除用户的角色
userRoutes.push({
  method: 'DELETE',
  pattern: /^\/api\/users\/([^/]+)\/roles\/([^/]+)$/,
  handler: async (ctx) => {
    const auth = await authMiddleware(ctx)
    if (!auth) {
      return Response.json(error('未授权，请先登录', 401), { status: 401 })
    }

    const userId = ctx.params['1']
    const roleId = ctx.params['2']

    await db.delete(userRole).where(
      and(eq(userRole.userId, userId), eq(userRole.roleId, roleId))
    )

    return Response.json(success(null, '解绑成功'))
  },
})