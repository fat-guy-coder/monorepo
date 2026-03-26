const Layout = () => import("@/layout/index.vue");

export default {
  path: "/system",
  name: "System",
  component: Layout,
  redirect: "/system/menu",
  meta: {
    icon: "ep Setting",
    title: "系统管理",
    rank: 99
  },
  children: [
    {
      path: "/system/menu",
      name: "SystemMenu",
      component: () => import("@/views/system/menu/index.vue"),
      meta: {
        title: "菜单管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
