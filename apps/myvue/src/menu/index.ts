import menus from './menu.json'
import { h } from 'vue'
import type { VNode } from 'vue'



export type Route = {
  label: VNode | string
  name: string
  title?: string
  key?: string
  parentKey?: string
  parentKeyList?: string[]
  path?: string
  children?: Route[]
  icon?: VNode | string
  component?: () => Promise<string>
  loading?: boolean
  match?: boolean
  id?: string
  redirect?: { name: string }
}

export function addKeysToRoutes(
  routes: Route[],
  parentKey: string = '',
  parentPath: string = '',
): Route[] {
  return routes.map(({ name, label: rawLabel, children ,redirect}) => {
    const path = parentPath ? parentPath + '/' + name : '/' + name
    const key = path
    const title = rawLabel as string
    const label = h('span', { innerText: rawLabel, id: key })
    // const expandIcon = () => h(DownOutlined)
    const newRoute: Route = {
      name,
      key,
      parentKey,
      path,
      label,
      title,
      id: name,
      loading: false,
      redirect,
    }
    if (children) {
      newRoute.children = addKeysToRoutes(children, key, path)
    }
    return newRoute
  })
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

export function findMenuItemByName(name: string): Route | undefined {
  // 递归查找routesWithKeys中name等于传入name的项，找到则返回该项，否则返回undefined
  function findInRoutes(routes: Route[], name: string): Route | undefined {
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
  return findInRoutes(routesWithKeys, name)
}

export function reWashMenus(data: Route[], callback?: (i: Route) => void) {
  const cb = callback
    ? callback
    : (i: Route) => {
      i.label = h('span', { style: { color: 'black' }, innerText: i.title, id: i.key })
      i.match = false
    }
  const wash = (data: Route[]) => {
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
export function findMatchingLabels(routes: Route[], value: string): Keys {
  const result: {id?:string,path?:string}[] = []
  const newValue = value.toLocaleLowerCase()
  // 先重置菜单项的label（恢复默认颜色）和match状态
  reWashMenus(routes)
  function search(routes: Route[]) {
    for(const route of routes){
      let text:string|null = (route.title as string).toLocaleLowerCase()
      let id:string|null = route.id as string
      if (text?.includes(newValue)) {
        route.label = h('span', { style: { color: 'red' }, innerText: text, id})
        route.match = true
        result.push({ id:id, path:route.path})
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
    selectedKeys.push(r.id!)
    list.forEach(l => set.add(l))
  })
  const openKeys = Array.from(set)
  set.clear();
  result.length = 0;
  return { openKeys, selectedKeys }
}

//副作用
export const deleteChild = (routes: Route[], name: string) => {
  const recursion = (routes: Route[]) => {
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
export const addChild = (routes: Route[], name: string, child: Route[]) => {
  const recursion = (routes: Route[]) => {
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
export const changeLoading = (routes: Route[], name: string, loading: boolean) => {
  const recursion = (routes: Route[]) => {
    routes.forEach((route) => {
      if (route.name === name) {
        if (loading) {
          route.label = h('span', { innerText: (route.label as VNode).props?.innerText + '加载中' })
        } else {
          route.label = h('span', {
            innerText: (route.label as VNode).props?.innerText.replace('加载中', ''),
          })
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

const routesWithKeys = addKeysToRoutes(menus as Route[])

export default routesWithKeys
