import { request, type ApiResult } from '@/request'

export interface UserInfo {
  id: string
  username: string
  roles?: { id: string; name: string }[]
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: UserInfo
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

/**
 * 注册
 */
export function postApiUserRegister(data: RegisterRequest): ApiResult<{ id: string; username: string }> {
  return request({
    url: `/api/user/register`,
    method: 'post',
    data,
  })
}

/**
 * 登录
 */
export function postApiUserLogin(data: LoginRequest): ApiResult<LoginResponse> {
  return request({
    url: `/api/user/login`,
    method: 'post',
    data,
  })
}

/**
 * 刷新 Token
 */
export function postApiUserRefresh(data: { refreshToken: string }): ApiResult<RefreshResponse> {
  return request({
    url: `/api/user/refresh`,
    method: 'post',
    data,
  })
}

/**
 * 获取当前用户信息
 */
export function getApiUserMe(): ApiResult<UserInfo> {
  return request({
    url: `/api/user/me`,
    method: 'get',
  })
}

/**
 * 修改密码
 */
export function putApiUserPassword(data: { currentPassword: string; newPassword: string }): ApiResult<null> {
  return request({
    url: `/api/user/password`,
    method: 'put',
    data,
  })
}

/**
 * 登出
 */
export function postApiUserLogout(): ApiResult<null> {
  return request({
    url: `/api/user/logout`,
    method: 'post',
  })
}

// ----- 用户管理 API -----

export interface UserWithRoles {
  id: string
  username: string
  createdAt: string
  roles: { id: string; name: string }[]
}

/**
 * 获取所有用户（含角色）
 */
export function getApiUsers(): ApiResult<UserWithRoles[]> {
  return request({
    url: `/api/users`,
    method: 'get',
  })
}

/**
 * 更新用户
 */
export function putApiUsersId(id: string, data: { username?: string; password?: string }): ApiResult<null> {
  return request({
    url: `/api/users/${id}`,
    method: 'put',
    data,
  })
}

/**
 * 删除用户
 */
export function deleteApiUsersId(id: string): ApiResult<null> {
  return request({
    url: `/api/users/${id}`,
    method: 'delete',
  })
}

/**
 * 获取用户的角色
 */
export function getApiUsersIdRoles(id: string): ApiResult<{ id: string; name: string; description?: string }[]> {
  return request({
    url: `/api/users/${id}/roles`,
    method: 'get',
  })
}

/**
 * 给用户绑定角色
 */
export function postApiUsersIdRoles(id: string, roleId: string): ApiResult<null> {
  return request({
    url: `/api/users/${id}/roles`,
    method: 'post',
    data: { roleId },
  })
}

/**
 * 解除用户的角色
 */
export function deleteApiUsersIdRoles(id: string, roleId: string): ApiResult<null> {
  return request({
    url: `/api/users/${id}/roles/${roleId}`,
    method: 'delete',
  })
}