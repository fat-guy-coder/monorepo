import { http, type ApiResult } from "@/utils/http";
export interface MenuItem {
  id?: string;
  name?: string;
  label?: string;
  path?: string;
  icon?: string;
  order?: number;
  project?: string;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetApiMenusParams {
  project?: string;
  parentId?: string;
  root?: "true" | "false";
  flat?: "true" | "false";
  tree?: "true" | "false";
  search?: string;
}

export interface PostApiMenusRequest {
  name: string;
  label: string;
  path?: string;
  icon?: string;
  order?: number;
  project?: string;
  parentId?: string;
}

export interface PutApiMenusIdRequest {
  name?: string;
  label?: string;
  path?: string;
  icon?: string;
  order?: number;
  project?: string;
  parentId?: string;
}

/**
 * @param params - Query parameters
 */
export function getApiMenus(
  params?: GetApiMenusParams
): ApiResult<Array<MenuItem>> {
  return http.get(`/api/menus`, { params });
}

/**
 * @param data - Request body
 */
export function postApiMenus(data: PostApiMenusRequest): ApiResult<MenuItem> {
  return http.post(`/api/menus`, { data });
}

/**
 */
export function getApiMenusId(id: string): ApiResult<MenuItem> {
  return http.get(`/api/menus/${encodeURIComponent(String(id))}`);
}

/**
 * @param data - Request body
 */
export function putApiMenusId(
  id: string,
  data: PutApiMenusIdRequest
): ApiResult<MenuItem> {
  return http.put(`/api/menus/${encodeURIComponent(String(id))}`, { data });
}

/**
 */
export function deleteApiMenusId(id: string): ApiResult<unknown> {
  return http.delete(`/api/menus/${encodeURIComponent(String(id))}`);
}

/**
 */
export function getApiMenusIdChildren(id: string): ApiResult<Array<MenuItem>> {
  return http.get(`/api/menus/${encodeURIComponent(String(id))}/children`);
}
