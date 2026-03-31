export default [
  {
    "name": "welcome",
    "path": "/welcome",
    "component": () => import('@/views/welcome.vue')
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
  