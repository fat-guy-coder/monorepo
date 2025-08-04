import type { MenuItem } from '@/menu/menu'
import router from '@/router'
import notFound from '@/views/Other/notFound.vue'
import routes from './generatedRoutes'


const findComponent = (name: string) => {
  const len = routes.length
  for (let i = len - 1; i >= 0; i--) {
    const route = routes[i]
    if (route.name === name) {
      return route.component
    }
  }
  return notFound
}

export const generateRoutes = (menus: MenuItem[], father?: MenuItem) => {
  const routeRecord: any = {}
  menus.forEach((menu) => {
    routeRecord.path = menu.path as string
    routeRecord.name = menu.name
    routeRecord.children = menu.children
    if (!menu.children) {
      routeRecord.component = findComponent(menu.name)
    }
    if (father) {
      router.addRoute(father.name, routeRecord)
    } else {
      router.addRoute(routeRecord)
    }
  })
}
