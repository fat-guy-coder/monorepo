import { request, type ApiResult } from '@/request'

/** 学习进度行（start/end/manual 的返回体；study_progress 一菜单单行） */
export interface StudyProgressRow {
  menuId: string
  totalMinutes: number
  startedAt?: string
  endedAt?: string
}

/** 章节学习统计（一菜单单行聚合）：建议时长 + 累计已学 + 最近起止 + 超出时长 */
export interface StudyAggregate {
  menuId: string
  label?: string
  suggestedMinutes?: number
  totalMinutes: number
  startedAt?: string
  endedAt?: string
  overtimeMinutes?: number
}

/** 开始学习（POST /api/menus/:id/study/start）——置 started_at；省略 startedAt 取服务器当前时间 */
export function postApiMenusIdStudyStart(menuId: string, startedAt?: string): ApiResult<StudyProgressRow> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(menuId))}/study/start`,
    method: 'post',
    data: startedAt ? { startedAt } : {},
  })
}

/** 结束学习（POST /api/menus/:id/study/end）——按 started_at→ended_at 累加 total_minutes */
export function postApiMenusIdStudyEnd(menuId: string, endedAt?: string): ApiResult<StudyProgressRow> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(menuId))}/study/end`,
    method: 'post',
    data: endedAt ? { endedAt } : {},
  })
}

/** 手动补录一段时长（POST /api/menus/:id/study/manual） */
export function postApiMenusIdStudyManual(menuId: string, startedAt: string, endedAt: string): ApiResult<StudyProgressRow> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(menuId))}/study/manual`,
    method: 'post',
    data: { startedAt, endedAt },
  })
}

/** 章节学习统计（GET /api/menus/:id/study）——建议时长 + 累计已学 + 最近起止 + 超出时长 */
export function getApiMenusIdStudy(id: string): ApiResult<StudyAggregate> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}/study`,
    method: 'get',
  })
}
