import { request, type ApiResult } from '@/request'

/** 一次学习记录（日志式：起止时间 + 服务端算出的时长） */
export interface StudySession {
  id: string
  menuId: string
  startedAt: string
  endedAt?: string
  durationMinutes: number
  createdAt?: string
}

/** 章节学习统计：建议时长 vs 累计已学 */
export interface StudyAggregate {
  menuId: string
  label?: string
  suggestedMinutes?: number
  totalMinutes: number
  sessions: StudySession[]
}

export interface PostApiStudySessionsRequest {
  menuId: string
  startedAt: string
  endedAt: string
}

/** 新增一条学习记录（POST /api/study-sessions）——日志式，一次填起止时间 */
export function postApiStudySessions(data: PostApiStudySessionsRequest): ApiResult<StudySession> {
  return request({
    url: `/api/study-sessions`,
    method: 'post',
    data,
  })
}

/** 章节学习统计（GET /api/menus/:id/study）——建议时长 + 累计已学 */
export function getApiMenusIdStudy(id: string): ApiResult<StudyAggregate> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}/study`,
    method: 'get',
  })
}
