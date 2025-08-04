


interface VNode {
  props: {
    innerText: string
    id: string
    style?: {
      color: string
    }
    label: string
  }
}


type Route = {
  label: VNode | string
  name: string
  title?: string
  key?: string
  parentPath?: string
  parentPathList: string[]
  path?: string
  children?: Route[]
  icon?: VNode | string
  component?: () => Promise<string>
  loading?: boolean
}

let h: any

self.onmessage = (event) => {
  h = new Function('a', 'b', 'c', event.data.render)
  console.log(event.data.menu)
  self.postMessage('menu')
}

function findFatherKeysListByKey(key: string): string[] {
  return key.split('/').filter(Boolean)
}

function findMatchingLabels(routes: Route[], value: string): { openKeys: string[], selectedKeys: string[] } {
  const result: Route[] = []
  reWashMenus(routes)
  function search(routes: Route[], parent: Route | null): Route[] {
    routes = routes.map((route) => {
      const text = (route.label as VNode).props?.innerText
      const label = text?.toLocaleLowerCase()
      const newValue = value.toLocaleLowerCase()
      const id = (route.label as VNode).props?.id
      if (label.includes(newValue)) {
        route.label = h('span', { style: { color: 'red' }, innerText: text, id })
        result.push(route)
      }
      if (route.children) {
        route.children = search(route.children, route)
      }
      return route
    })
    return routes
  }
  search(routes, null)
  const selectedKeys: string[] = []
  const openKeys = result.reduce((acc, r) => {
    const list = findFatherKeysListByKey(r.key!)
    selectedKeys.push(r.key!)
    acc = [...new Set([...acc, ...list])]
    return acc
  }, [] as string[])

  return { openKeys, selectedKeys }
}

function reWashMenus(data: Route[], callback?: (i: Route) => void) {
  const cb = callback
    ? callback
    : (i: Route) => {
      if ((i.label as VNode).props?.style) {
        i.label = h('span', {
          style: { color: 'black' },
          innerText: (i.label as VNode).props?.innerText,
          id: (i.label as VNode).props?.id,
        })
      }
    }
  const wash = (data: Route[]) => {
    return data.map((route) => {
      cb(route)
      if (route.children) {
        route.children = wash(route.children)
      }
      return route
    })
  }
  return wash(data)
}
