import menus from './menu.json'
import type { VNode } from 'vue'



export type MenuItem = {
  id: string
  label: string
  name: string
  path: string
  icon: VNode | string
  parentKey?: string
  parentKeyList?: string[]
  children?: MenuItem[]
  loading?: boolean
  match?: boolean
  redirect?: { name: string, path: string }
}

export function findFatherKeysListByKey(key: string): string[] {
  const list = key.split('/')
  list.pop()
  return list.reduce<string[]>((acc, item, index) => {
    if (item) {
      const newItem = `${index > 1 ? acc[index - 2] : ''}/${item}`
      acc.push(newItem)
    }
    return acc
  }, [])
}

export function findMenuItemByName(name: string): MenuItem | undefined {
  // 递归查找routesWithKeys中name等于传入name的项，找到则返回该项，否则返回undefined
  function findInRoutes(routes: MenuItem[], name: string): MenuItem | undefined {
    for (const route of routes) {
      if (route.name === name) {
        return route
      }
      if (route.children) {
        const found = findInRoutes(route.children, name)
        if (found) return found
      }
    }
    return undefined
  }
  return findInRoutes(menus as MenuItem[], name)
}

export function reWashMenus(data: MenuItem[], callback?: (i: MenuItem) => void) {
  const cb = callback
    ? callback
    : (i: MenuItem) => {
      i.match = false
    }
  const wash = (data: MenuItem[]) => {
    for (const i of data) {
      if (i.match) {
        cb(i)
      }
      if (i.children) {
        wash(i.children)
      }
    }
  }
  wash(data)
}

type Keys = {
  selectedKeys: string[]
  openKeys: string[]
}

//副作用 找到匹配的项并改变菜单项的label 返回openKeys和selectedKeys
export function findMatchingLabels(routes: MenuItem[], value: string): Keys {
  const result: { id?: string, path?: string }[] = []
  const newValue = value.toLocaleLowerCase()
  // 先重置菜单项的label（恢复默认颜色）和match状态
  reWashMenus(routes)
  function search(routes: MenuItem[]) {
    for (const route of routes) {
      let text: string | null = route.label.toLocaleLowerCase()
      let id: string | null = route.id as string
      if (text?.includes(newValue)) {
        route.match = true
        result.push({ id: id, path: route.path })
        text = null
        id = null
      }
      if (route.children) {
        search(route.children)
      }
    }
  }
  search(routes)
  const set = new Set<string>()
  const selectedKeys: string[] = []
  result.forEach((r) => {
    const list = findFatherKeysListByKey(r.path!)
    selectedKeys.push(r.path!)
    list.forEach(l => set.add(l))
  })
  const openKeys = Array.from(set)
  set.clear();
  result.length = 0;
  return { openKeys, selectedKeys }
}

//副作用
export const deleteChild = (routes: MenuItem[], name: string) => {
  const recursion = (routes: MenuItem[]) => {
    return routes.forEach((route) => {
      if (route.name === name) {
        route.children = []
      } else {
        if (route.children) {
          recursion(route.children)
        }
      }
    })
  }
  recursion(routes)
}

//加子菜单  //副作用
export const addChild = (routes: MenuItem[], name: string, child: MenuItem[]) => {
  const recursion = (routes: MenuItem[]) => {
    routes.forEach((route) => {
      if (route.name === name) {
        route.children = child
      }
      if (route.children) {
        recursion(route.children)
      }
    })
  }
  recursion(routes)
}

//改变菜单单项加载状态 副作用
export const changeLoading = (routes: MenuItem[], name: string, loading: boolean) => {
  const recursion = (routes: MenuItem[]) => {
    routes.forEach((route) => {
      if (route.name === name) {
        if (loading) {
          route.label = route.label + '加载中'
        } else {
          route.label = route.label.replace('加载中', '')
        }

        return
      }
      if (route.children) {
        recursion(route.children)
      }
    })
  }
  recursion(routes)
}

