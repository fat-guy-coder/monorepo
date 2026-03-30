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
  isLeaf?: boolean; // 是否是叶子节点（控制树箭头显示）
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 当前项目标识
const PROJECT = "front_learning";

export function getRootMenus(params?: { project?: string; flat?: string; root?: string; search?: string }) {
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
