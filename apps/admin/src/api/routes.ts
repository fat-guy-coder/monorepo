import { http } from "@/utils/http";

type MenuResponse = {
  code: number;
  message: string;
  data: Array<any>;
};

export const getAsyncRoutes = (project: string = "admin") => {
  return http.request<MenuResponse>("get", "/api/menus", { params: { project, tree: "true" } });
};
