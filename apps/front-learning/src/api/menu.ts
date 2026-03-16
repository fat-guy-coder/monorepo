import { request, type ApiResult } from '@/request'
export interface GetApiMenusParams {
  parentId?: string
  flat?: 'true' | 'false'
}

export interface PostApiMenusRequest {
  name: string
  label: string
  path?: string
  icon?: string
  order?: number
  parentId?: string
}

export interface PutApiMenusIdRequest {
  name?: string
  label?: string
  path?: string
  icon?: string
  order?: number
  parentId?: string
}

/**
 * @param params - Query parameters
 */
export function getApiMenus(params?: GetApiMenusParams): ApiResult<unknown> {
  return request({
    url: `/api/menus`,
    method: 'get',
    params,
  })
}

/**
 * @param data - Request body
 */
export function postApiMenus(data: PostApiMenusRequest): ApiResult<unknown> {
  return request({
    url: `/api/menus`,
    method: 'post',
    data,
  })
}

/**
 */
export function getApiMenusRoot(): ApiResult<unknown> {
  return request({
    url: `/api/menus/root`,
    method: 'get',
  })
}

/**
 */
export function getApiMenusId(id: string): ApiResult<unknown> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}`,
    method: 'get',
  })
}

/**
 * @param data - Request body
 */
export function putApiMenusId(id: string, data: PutApiMenusIdRequest): ApiResult<unknown> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}`,
    method: 'put',
    data,
  })
}

/**
 */
export function deleteApiMenusId(id: string): ApiResult<unknown> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}`,
    method: 'delete',
  })
}

/**
 */
export function getApiMenusIdChildren(id: string): ApiResult<unknown> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}/children`,
    method: 'get',
  })
}
