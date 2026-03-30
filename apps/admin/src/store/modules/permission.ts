import { defineStore } from "pinia";
import {
  type cacheType,
  store,
  ascending,
  getKeyList,
  filterTree,
  constantMenus,
  filterNoPermissionTree,
  formatFlatteningRoutes
} from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { getApiMenus } from "@/api/menu";

export const usePermissionStore = defineStore("pure-permission", {
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 缓存页面keepAlive
    cachePageList: []
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = filterNoPermissionTree(
        filterTree(ascending(this.constantMenus.concat(routes)))
      );
      this.flatteningRoutes = formatFlatteningRoutes(
        this.constantMenus.concat(routes) as any
      );
    },
    /** 从数据库加载菜单（用于 admin 项目） */
    async loadMenusFromDb(project: string = "admin") {
      try {
        const res = await getApiMenus({ project, tree: "true" });
        if (res.code === 200 && res.data) {
          // 将数据库菜单格式转换为路由格式
          const dbMenus = this.convertDbMenusToRoutes(res.data);
          this.wholeMenus = dbMenus;
        }
      } catch (e) {
        console.error("加载菜单失败:", e);
      }
    },
    /** 将数据库菜单格式转换为路由格式 */
    convertDbMenusToRoutes(menus: any[]): any[] {
      return menus.map(menu => ({
        path: menu.path,
        name: menu.name,
        meta: {
          title: menu.label,
          icon: menu.icon,
          rank: menu.order
        },
        children: menu.children && menu.children.length > 0
          ? this.convertDbMenusToRoutes(menu.children)
          : undefined
      }));
    },
    /** 监听缓存页面是否存在于标签页，不存在则删除 */
    clearCache() {
      let cacheLength = this.cachePageList.length;
      const nameList = getKeyList(useMultiTagsStoreHook().multiTags, "name");
      while (cacheLength > 0) {
        nameList.findIndex(v => v === this.cachePageList[cacheLength - 1]) ===
          -1 &&
          this.cachePageList.splice(
            this.cachePageList.indexOf(this.cachePageList[cacheLength - 1]),
            1
          );
        cacheLength--;
      }
    },
    cacheOperate({ mode, name }: cacheType) {
      const delIndex = this.cachePageList.findIndex(v => v === name);
      switch (mode) {
        case "refresh":
          this.cachePageList = this.cachePageList.filter(v => v !== name);
          this.clearCache();
          break;
        case "add":
          this.cachePageList.push(name);
          break;
        case "delete":
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          this.clearCache();
          break;
      }
    },
    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}