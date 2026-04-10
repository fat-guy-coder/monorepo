import { request, type ApiResult } from '@/request'
export interface MenuItem {
  id?: string
  name?: string
  label?: string
  path?: string
  icon?: string
  order?: number
  project?: string
  parentId?: string
  createdAt?: string
  updatedAt?: string
  hasChildren?: boolean
  isLeaf?: boolean
  /** 搜索时标记是否匹配搜索条件 */
  match?: boolean
}

export interface GetApiMenusParams {
  project?: string
  parentId?: string
  root?: 'true' | 'false'
  flat?: 'true' | 'false'
  tree?: 'true' | 'false'
  search?: string
}

export interface PostApiMenusRequest {
  name: string
  label: string
  path?: string
  icon?: string
  order?: number
  project?: string
  parentId?: string
}

export interface PutApiMenusIdRequest {
  name?: string
  label?: string
  path?: string
  icon?: string
  order?: number
  project?: string
  parentId?: string
}

/**
 * @param params - Query parameters
 */
export function getApiMenus(params?: GetApiMenusParams): ApiResult<Array<MenuItem>> {
  return request({
    url: `/api/menus`,
    method: 'get',
    params,
  })
}

/**
 * @param data - Request body
 */
export function postApiMenus(data: PostApiMenusRequest): ApiResult<MenuItem> {
  return request({
    url: `/api/menus`,
    method: 'post',
    data,
  })
}

/**
 */
export function getApiMenusId(id: string): ApiResult<MenuItem> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}`,
    method: 'get',
  })
}

/**
 * @param data - Request body
 */
export function putApiMenusId(id: string, data: PutApiMenusIdRequest): ApiResult<MenuItem> {
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
export function getApiMenusIdChildren(id: string): ApiResult<Array<MenuItem>> {
  return request({
    url: `/api/menus/${encodeURIComponent(String(id))}/children`,
    method: 'get',
  })
}

/**
 * 搜索菜单，返回匹配项及其父链
 */
export function getApiMenusSearch(params?: { project?: string; search?: string }): ApiResult<{
  matched: MenuItem[]
  openKeys: string[]
  selectedKeys: string[]
}> {
  return request({
    url: `/api/menus/search`,
    method: 'get',
    params,
  })
}
