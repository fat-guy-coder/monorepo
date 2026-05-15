import { request, type ApiResult } from '@/request'

export interface RoleItem {
  id: string
  name: string
  description?: string
  menuIds?: string[]
  menuPaths?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface GetApiRolesParams {
  // Add filters if needed
}

/**
 * 获取所有角色
 */
export function getApiRoles(): ApiResult<RoleItem[]> {
  return request({
    url: `/api/roles`,
    method: 'get',
  })
}

/**
 * 获取单个角色
 */
export function getApiRolesId(id: string): ApiResult<RoleItem> {
  return request({
    url: `/api/roles/${encodeURIComponent(String(id))}`,
    method: 'get',
  })
}

/**
 * 创建角色
 */
export function postApiRoles(data: {
  name: string
  description?: string
  menuIds?: string[]
  menuPaths?: string[]
}): ApiResult<RoleItem> {
  return request({
    url: `/api/roles`,
    method: 'post',
    data,
  })
}

/**
 * 更新角色
 */
export function putApiRolesId(id: string, data: {
  name?: string
  description?: string
  menuIds?: string[]
  menuPaths?: string[]
}): ApiResult<RoleItem> {
  return request({
    url: `/api/roles/${encodeURIComponent(String(id))}`,
    method: 'put',
    data,
  })
}

/**
 * 删除角色
 */
export function deleteApiRolesId(id: string): ApiResult<null> {
  return request({
    url: `/api/roles/${encodeURIComponent(String(id))}`,
    method: 'delete',
  })
}

/**
 * 获取角色的用户列表
 */
export function getApiRolesIdUsers(id: string): ApiResult<{ id: string; username: string }[]> {
  return request({
    url: `/api/roles/${encodeURIComponent(String(id))}/users`,
    method: 'get',
  })
}

/**
 * 给角色添加用户
 */
export function postApiRolesIdUsers(id: string, data: { userId: string }): ApiResult<null> {
  return request({
    url: `/api/roles/${encodeURIComponent(String(id))}/users`,
    method: 'post',
    data,
  })
}

/**
 * 移除角色的用户
 */
export function deleteApiRolesIdUsers(id: string, userId: string): ApiResult<null> {
  return request({
    url: `/api/roles/${encodeURIComponent(String(id))}/users/${encodeURIComponent(String(userId))}`,
    method: 'delete',
  })
}