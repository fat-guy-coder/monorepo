import type { Route } from '@/menu'
import { h } from 'vue'
import type { VNode } from 'vue'

export interface MenuItem {
  label: string
  name: string
  path?: string
  children?: MenuItem[]
}

const needLoadKeys = [
  'CoreSkills',
  'FrameworksAndEngineering',
  'AlgorithmsAndDataStructures',
  'AdvancedSkills',
  'ProjectsAndSoftSkills',
  'LearningAbility',
  'AI',
  'Tools',
  "ComputerBasicKnowledge",
  "NetworkBasic",
  "ProjectsAndSoftSkills",
  "Performance",
  "React",
  "Vue",
  "NodeJS",
  "JavaScript",
  "HTML_CSS"
]

export const getMainMenu = async () => {
  const { default: data } = await import('./subMenu/mainMenu.json')
  const keys: string[] = []
  const menus = data.map((item) => {
    keys.push(item.name)
    return {
      label: item.label,
      name: item.name,
      path: `/${item.name}`,
      children: item.children
    }
  })
  return { menus, needLoadKeys: keys.concat(needLoadKeys) }
}

export const getSubMenuByName = async (name: string) => {
  const { default: data } = await import(`./subMenu/${name}.json`)
  const keys: string[] = []
  const menus = data.map((item: MenuItem & { path: string }) => {
    keys.push(item.name)
    return {
      label: item.label,
      name: item.name,
      children: item.children
    }
  })
  return menus
}


//递归副作用回调函数
export const findMenuItemByNameAndCallback = (routes: Route[], name: string, callback: (route: Route) => Route | Route[] | void) => {
  const recursion = (routes: Route[]): Route | Route[] | void => {
    for (const route of routes) {
      if (route.name === name) {
        const result = callback(route)
        if (result) return result
      }
      if (route.children) {
        const result = recursion(route.children)
        if (result) return result
      }
    }
  }
  return recursion(routes)
}
//副作用 删除子菜单
export const deleteChild = (route: Route) => {
  route.children = []
}

//副作用 加子菜单
export const addChild = (route: Route, child: Route[]) => {
  route.children = child
  return route.children
}

//副作用 改变菜单单项加载状态
export const changeLoading = (route: Route, loading: boolean) => {
  if (loading) {
    route.label = h('span', { innerText: (route.label as VNode).props?.innerText + '加载中' })
  } else {
    route.label = h('span', {
      innerText: (route.label as VNode).props?.innerText.replace('加载中', ''),
    })
  }
  return route
}
