import { http } from "@/utils/http";

export interface MenuItem {
  id: string;
  name: string;
  label: string;
  path?: string;
  icon?: string;
  order: number;
  project: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  children?: MenuItem[];
  hasChildren?: boolean; // 是否有子菜单（用于懒加载显示箭头）
  _loaded?: boolean; // 自定义属性，标记是否已加载子菜单
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 当前项目标识
const PROJECT = "front_learning";

export function getRootMenus(params?: { project?: string; flat?: string; root?: string }) {
  return http.request<ApiResponse<MenuItem[]>>("get", "/api/menus", {
    params: { project: PROJECT, ...params }
  });
}

export function getMenuById(id: string) {
  return http.request<ApiResponse<MenuItem[]>>("get", `/api/menus/${id}/children`);
}

export function createMenu(data: Partial<MenuItem>) {
  return http.request<ApiResponse<MenuItem>>("post", "/api/menus", {
    data: { ...data, project: PROJECT }
  });
}

export function updateMenu(id: string, data: Partial<MenuItem>) {
  return http.request<ApiResponse<MenuItem>>("put", `/api/menus/${id}`, { data });
}

export function deleteMenu(id: string) {
  return http.request<ApiResponse<null>>("delete", `/api/menus/${id}`);
}
