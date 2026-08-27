import { db } from '../db'
import { menu, studySession } from '../db/schema'
import { and, eq, isNotNull } from 'drizzle-orm'

// 学习计时系统路由（日志式：一次填开始/结束时间，服务端算时长）
//   POST /api/study-sessions   { menuId, startedAt, endedAt }  新增一条学习记录
//   GET  /api/menus/:id/study  聚合：建议时长 + 累计已学（只统计有结束时间的记录）

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

export const studySessionRoutes: Array<{ method: string; pattern: RegExp; handler: RouteHandler }> = []

function computeMinutes(start: Date, end: Date): number {
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000))
}

// POST /api/study-sessions — 新增一条学习记录（日志式，起止时间必填）
studySessionRoutes.push({
  method: 'POST',
  pattern: /^\/api\/study-sessions$/,
  handler: async (ctx) => {
    const body = await ctx.json()
    const { menuId, startedAt, endedAt } = body || {}

    if (!menuId) {
      return Response.json(error('menuId 必填', 400), { status: 400 })
    }
    if (!startedAt || !endedAt) {
      return Response.json(error('startedAt 和 endedAt 必填', 400), { status: 400 })
    }

    const start = new Date(startedAt)
    const end = new Date(endedAt)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return Response.json(error('时间格式不正确', 400), { status: 400 })
    }
    if (start >= end) {
      return Response.json(error('结束时间必须晚于开始时间', 400), { status: 400 })
    }

    const [menuItem] = await db.select().from(menu).where(eq(menu.id, menuId)).limit(1)
    if (!menuItem) {
      return Response.json(error('菜单不存在', 404), { status: 404 })
    }

    const durationMinutes = computeMinutes(start, end)
    const [session] = await db.insert(studySession).values({
      menuId,
      startedAt: start,
      endedAt: end,
      durationMinutes,
    }).returning()

    return Response.json(success(session, '记录成功'), { status: 201 })
  },
})

// GET /api/menus/:id/study — 某章节的学习统计（建议时长 + 累计已学）
studySessionRoutes.push({
  method: 'GET',
  pattern: /^\/api\/menus\/([^/]+)\/study$/,
  handler: async (ctx) => {
    const id = ctx.params['1']

    const [menuItem] = await db.select({
      menuId: menu.id,
      label: menu.label,
      suggestedMinutes: menu.suggestedMinutes,
    }).from(menu).where(eq(menu.id, id)).limit(1)
    if (!menuItem) {
      return Response.json(error('菜单不存在', 404), { status: 404 })
    }

    const sessions = await db.select().from(studySession)
      .where(and(eq(studySession.menuId, id), isNotNull(studySession.endedAt)))
      .orderBy(studySession.startedAt)

    const totalMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0)

    return Response.json(success({
      menuId: menuItem.menuId,
      label: menuItem.label,
      suggestedMinutes: menuItem.suggestedMinutes || 0,
      totalMinutes,
      sessions,
    }))
  },
})
