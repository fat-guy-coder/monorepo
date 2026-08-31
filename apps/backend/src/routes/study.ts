import { db } from '../db'
import { menu, studyProgress } from '../db/schema'
import { eq, sql } from 'drizzle-orm'

// 学习计时系统路由（聚合式：每菜单一行 study_progress，start/end/manual 累加 total_minutes）
//   POST /api/menus/:id/study/start   { startedAt? }         开始学习（置 started_at，清 ended_at）
//   POST /api/menus/:id/study/end     { endedAt? }           结束学习（按 started_at→ended_at 累加 total_minutes）
//   POST /api/menus/:id/study/manual  { startedAt, endedAt } 手动补录一段时长
//   GET  /api/menus/:id/study         聚合：建议时长 + 累计已学 + 最近起止 + 超出时长

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

export const studyRoutes: Array<{ method: string; pattern: RegExp; handler: RouteHandler }> = []

function computeMinutes(start: Date, end: Date): number {
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000))
}

// study_progress 行的对外形状（menuId/totalMinutes/startedAt/endedAt）
function rowShape(p: { menuId: string; totalMinutes: number; startedAt: Date | null; endedAt: Date | null }) {
  return {
    menuId: p.menuId,
    totalMinutes: p.totalMinutes,
    startedAt: p.startedAt,
    endedAt: p.endedAt,
  }
}

// POST /api/menus/:id/study/start — 开始学习
studyRoutes.push({
  method: 'POST',
  pattern: /^\/api\/menus\/([^/]+)\/study\/start$/,
  handler: async (ctx) => {
    const id = ctx.params['1']
    const body = await ctx.json()
    const startedAt = body?.startedAt ? new Date(body.startedAt) : new Date()
    if (isNaN(startedAt.getTime())) {
      return Response.json(error('时间格式不正确', 400), { status: 400 })
    }

    const [menuItem] = await db.select({ id: menu.id }).from(menu).where(eq(menu.id, id)).limit(1)
    if (!menuItem) {
      return Response.json(error('菜单不存在', 404), { status: 404 })
    }

    const [row] = await db.insert(studyProgress).values({
      menuId: id,
      totalMinutes: 0,
      startedAt,
    }).onConflictDoUpdate({
      target: studyProgress.menuId,
      set: { startedAt, endedAt: null, updatedAt: new Date() },
    }).returning()

    return Response.json(success(rowShape(row)))
  },
})

// POST /api/menus/:id/study/end — 结束学习，按 started_at→ended_at 累加时长
studyRoutes.push({
  method: 'POST',
  pattern: /^\/api\/menus\/([^/]+)\/study\/end$/,
  handler: async (ctx) => {
    const id = ctx.params['1']
    const body = await ctx.json()
    const endedAt = body?.endedAt ? new Date(body.endedAt) : new Date()
    if (isNaN(endedAt.getTime())) {
      return Response.json(error('时间格式不正确', 400), { status: 400 })
    }

    const [row] = await db.select().from(studyProgress).where(eq(studyProgress.menuId, id)).limit(1)
    if (!row?.startedAt) {
      return Response.json(error('尚未开始学习', 400), { status: 400 })
    }

    const minutes = computeMinutes(new Date(row.startedAt), endedAt)
    const [updated] = await db.update(studyProgress)
      .set({ totalMinutes: row.totalMinutes + minutes, endedAt, updatedAt: new Date() })
      .where(eq(studyProgress.menuId, id))
      .returning()

    return Response.json(success(rowShape(updated)))
  },
})

// POST /api/menus/:id/study/manual — 手动补录一段时长（累加，不覆盖已有累计）
studyRoutes.push({
  method: 'POST',
  pattern: /^\/api\/menus\/([^/]+)\/study\/manual$/,
  handler: async (ctx) => {
    const id = ctx.params['1']
    const body = await ctx.json()
    const { startedAt, endedAt } = body || {}
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

    const [menuItem] = await db.select({ id: menu.id }).from(menu).where(eq(menu.id, id)).limit(1)
    if (!menuItem) {
      return Response.json(error('菜单不存在', 404), { status: 404 })
    }

    const minutes = computeMinutes(start, end)
    const [row] = await db.insert(studyProgress).values({
      menuId: id,
      totalMinutes: minutes,
      startedAt: start,
      endedAt: end,
    }).onConflictDoUpdate({
      target: studyProgress.menuId,
      set: { totalMinutes: sql`${studyProgress.totalMinutes} + ${minutes}`, startedAt: start, endedAt: end, updatedAt: new Date() },
    }).returning()

    return Response.json(success(rowShape(row)))
  },
})

// GET /api/menus/:id/study — 学习统计聚合（建议时长 + 累计已学 + 最近起止 + 超出时长）
studyRoutes.push({
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

    const [row] = await db.select().from(studyProgress).where(eq(studyProgress.menuId, id)).limit(1)
    const totalMinutes = row?.totalMinutes || 0
    const suggestedMinutes = menuItem.suggestedMinutes || 0
    const overtimeMinutes = Math.max(0, totalMinutes - suggestedMinutes)

    return Response.json(success({
      menuId: menuItem.menuId,
      label: menuItem.label,
      suggestedMinutes,
      totalMinutes,
      startedAt: row?.startedAt ?? null,
      endedAt: row?.endedAt ?? null,
      overtimeMinutes,
    }))
  },
})
