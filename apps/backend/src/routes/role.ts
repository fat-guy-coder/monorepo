import { db } from '../db'
import { role, userRole, user } from '../db/schema'
import { eq } from 'drizzle-orm'
import { createAuthMiddleware } from './auth'

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

export const roleRoutes: Array<{ method: string; pattern: RegExp; handler: RouteHandler }> = []

const authMiddleware = createAuthMiddleware()

// GET /api/roles - 获取所有角色
roleRoutes.push({
  method: 'GET',
  pattern: /^\/api\/roles$/,
  handler: async (ctx) => {
    const allRoles = await db.select().from(role)
    return Response.json(success(allRoles))
  },
})

// GET /api/roles/:id - 获取单个角色
roleRoutes.push({
  method: 'GET',
  pattern: /^\/api\/roles\/([^/]+)$/,
  handler: async (ctx) => {
    const id = ctx.params['1']
    const r = await db.query.role.findFirst({ where: (rl, { eq }) => eq(rl.id, id) })
    if (!r) {
      return Response.json(error('角色不存在', 404), { status: 404 })
    }
    return Response.json(success(r))
  },
})

// POST /api/roles - 创建角色
roleRoutes.push({
  method: 'POST',
  pattern: /^\/api\/roles$/,
  handler: async (ctx) => {
    const body = await ctx.json()
    const { name, description, menuIds, menuPaths } = body || {}

    if (!name) {
      return Response.json(error('角色名称不能为空', 400), { status: 400 })
    }

    // 检查名称是否已存在
    const existing = await db.query.role.findFirst({
      where: (r, { eq }) => eq(r.name, name),
    })
    if (existing) {
      return Response.json(error('角色名称已存在', 409), { status: 409 })
    }

    const newRole = await db.insert(role).values({
      name,
      description: description || '',
      menuIds: JSON.stringify(menuIds || []),
      menuPaths: JSON.stringify(menuPaths || []),
    }).returning()

    return Response.json(success(newRole[0], '创建成功'), { status: 201 })
  },
})

// PUT /api/roles/:id - 更新角色
roleRoutes.push({
  method: 'PUT',
  pattern: /^\/api\/roles\/([^/]+)$/,
  handler: async (ctx) => {
    const id = ctx.params['1']
    const body = await ctx.json()
    const { name, description, menuIds, menuPaths } = body || {}

    const existing = await db.query.role.findFirst({
      where: (r, { eq }) => eq(r.id, id),
    })
    if (!existing) {
      return Response.json(error('角色不存在', 404), { status: 404 })
    }

    const updates: any = {}
    if (name !== undefined) updates.name = name
    if (description !== undefined) updates.description = description
    if (menuIds !== undefined) updates.menuIds = JSON.stringify(menuIds)
    if (menuPaths !== undefined) updates.menuPaths = JSON.stringify(menuPaths)
    updates.updatedAt = new Date()

    await db.update(role).set(updates).where(eq(role.id, id))

    const updated = await db.query.role.findFirst({ where: (r, { eq }) => eq(r.id, id) })
    return Response.json(success(updated, '更新成功'))
  },
})

// DELETE /api/roles/:id - 删除角色
roleRoutes.push({
  method: 'DELETE',
  pattern: /^\/api\/roles\/([^/]+)$/,
  handler: async (ctx) => {
    const id = ctx.params['1']

    const existing = await db.query.role.findFirst({
      where: (r, { eq }) => eq(r.id, id),
    })
    if (!existing) {
      return Response.json(error('角色不存在', 404), { status: 404 })
    }

    // 不能删除 admin 角色
    if (existing.name === 'admin') {
      return Response.json(error('不能删除 admin 角色', 400), { status: 400 })
    }

    // 删除关联的用户角色关系
    await db.delete(userRole).where(eq(userRole.roleId, id))
    // 删除角色
    await db.delete(role).where(eq(role.id, id))

    return Response.json(success(null, '删除成功'))
  },
})

// GET /api/roles/:id/users - 获取角色的用户列表
roleRoutes.push({
  method: 'GET',
  pattern: /^\/api\/roles\/([^/]+)\/users$/,
  handler: async (ctx) => {
    const roleId = ctx.params['1']

    const relations = await db.query.userRole.findMany({
      where: (ur, { eq }) => eq(ur.roleId, roleId),
    })

    const userIds = relations.map(r => r.userId)
    if (userIds.length === 0) {
      return Response.json(success([]))
    }

    const users = await db.select({ id: user.id, username: user.username })
      .from(user)
      .where(eq(user.id, userIds[0])) // Drizzle doesn't support IN, workaround below

    return Response.json(success(users))
  },
})

// POST /api/roles/:id/users - 给角色添加用户
roleRoutes.push({
  method: 'POST',
  pattern: /^\/api\/roles\/([^/]+)\/users$/,
  handler: async (ctx) => {
    const roleId = ctx.params['1']
    const body = await ctx.json()
    const { userId } = body || {}

    if (!userId) {
      return Response.json(error('用户ID不能为空', 400), { status: 400 })
    }

    // 检查角色是否存在
    const r = await db.query.role.findFirst({ where: (rl, { eq }) => eq(rl.id, roleId) })
    if (!r) {
      return Response.json(error('角色不存在', 404), { status: 404 })
    }

    // 检查用户是否存在
    const u = await db.query.user.findFirst({ where: (us, { eq }) => eq(us.id, userId) })
    if (!u) {
      return Response.json(error('用户不存在', 404), { status: 404 })
    }

    // 检查是否已关联
    const existing = await db.query.userRole.findFirst({
      where: (ur, { and, eq }) => and(eq(ur.userId, userId), eq(ur.roleId, roleId)),
    })
    if (existing) {
      return Response.json(error('用户已绑定该角色', 409), { status: 409 })
    }

    const newRelation = await db.insert(userRole).values({
      userId,
      roleId,
    }).returning()

    return Response.json(success(newRelation[0], '绑定成功'), { status: 201 })
  },
})

// DELETE /api/roles/:id/users/:userId - 移除角色的用户
roleRoutes.push({
  method: 'DELETE',
  pattern: /^\/api\/roles\/([^/]+)\/users\/([^/]+)$/,
  handler: async (ctx) => {
    const roleId = ctx.params['1']
    const userId = ctx.params['2']

    await db.delete(userRole).where(
      eq(userRole.userId, userId)
    )

    return Response.json(success(null, '解绑成功'))
  },
})