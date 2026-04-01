export default [
  {
    "name": "home",
    "path": "/home",
    "component": () => import('@/views/home.vue')
  },
  {
    "name": "system",
    "path": "/system",
    "children": [
      {
        "name": "menu",
        "path": "/system/menu",
        "component": () => import('@/views/system/menu.vue')
      }
    ]
  }
];
  