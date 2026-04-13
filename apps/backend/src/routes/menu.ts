import { db, rawQuery } from '../db'
import { menu } from '../db/schema'
import { eq, isNull, or, asc, like } from 'drizzle-orm'

// 统一响应格式
const success = (data: any, message = 'success') => ({ code: 200, message, data })
const error = (message: string, code = 500) => ({ code, message, data: null })

// 辅助函数：构建树形结构
function buildMenuTree(allMenus: any[]) {
  const menuMap = new Map()
  allMenus.forEach(menu => {
    menuMap.set(menu.id, { ...menu, children: [] })
  })

  const menus: any[] = []
  for (const m of allMenus) {
    const menuWithChildren = menuMap.get(m.id)
    if (m.parentId) {
      const parent = menuMap.get(m.parentId)
      if (parent) {
        parent.children.push(menuWithChildren)
      }
    } else {
      menus.push(menuWithChildren)
    }
  }
  return menus
}

// 辅助函数：删除空 children
function removeEmptyChildren(items: any[]) {
  return items.map(item => {
    if (item.children && item.children.length > 0) {
      return { ...item, children: removeEmptyChildren(item.children) }
    } else {
      const { children, ...rest } = item
      return rest
    }
  })
}

// 辅助函数：递归扁平化
function flatten(items: any[]) {
  return items.reduce((acc: any[], item: any) => {
    const { children, ...rest } = item
    acc.push(rest)
    if (children && children.length > 0) {
      acc.push(...flatten(children))
    }
    return acc
  }, [])
}

interface RouteContext {
  pathname: string
  method: string
  url: URL
  params: Record<string, string>
  query: Record<string, string>
  body: any
  json: () => Promise<any>
}

type RouteHandler = (ctx: RouteContext) => Promise<Response>

const routes: Array<{ method: string; pattern: RegExp; handler: RouteHandler }> = []

// GET /menus
routes.push({
  method: 'GET',
  pattern: /^\/api\/menus$/,
  handler: async (ctx) => {
    const { project, parentId, root, flat, tree, search } = ctx.query

    // 如果指定了 tree=true，返回完整树结构
    if (tree === 'true') {
      try {
        let allMenus = await db.select().from(menu).where(project ? eq(menu.project, project) : undefined).orderBy(asc(menu.order))

        let result = buildMenuTree(allMenus)
        // 标记 isLeaf
        const markLeaf = (menus: any[]) => {
          return menus.map(m => {
            const hasChildren = m.children && m.children.length > 0
            return {
              ...m,
              isLeaf: !hasChildren,
              children: m.children ? markLeaf(m.children) : undefined
            }
          })
        }
        result = markLeaf(result)
        return Response.json(success(result))
      } catch (err: any) {
        console.error(err)
        return Response.json(error('查询失败: ' + err.message), { status: 500 })
      }
    }

    // 获取顶级菜单（parentId 为 null 或空字符串）
    if (root === 'true') {
      try {
        const menus = await db.select().from(menu).where(
          and(
            project ? eq(menu.project, project) : undefined,
            or(isNull(menu.parentId), eq(menu.parentId, ''))
          )
        ).orderBy(asc(menu.order))

        // 标记 isLeaf（是否有子菜单）
        const result = await Promise.all(menus.map(async (m) => {
          const childCount = await db.select().from(menu).where(eq(menu.parentId, m.id)).limit(1).then(r => r.length)
          return { ...m, isLeaf: childCount === 0 }
        }))
        return Response.json(success(result))
      } catch (err: any) {
        console.error(err)
        return Response.json(error('查询失败: ' + err.message), { status: 500 })
      }
    }

    // 如果指定了 parentId，直接返回子菜单
    if (parentId) {
      const menus = await db.select().from(menu).where(eq(menu.parentId, parentId)).orderBy(asc(menu.order))
      const result = await Promise.all(menus.map(async (m) => {
        const childCount = await db.select().from(menu).where(eq(menu.parentId, m.id)).limit(1).then(r => r.length)
        return { ...m, isLeaf: childCount === 0 }
      }))
      return Response.json(success(flat === 'true' ? flatten(result) : result))
    }

    // 构建 where 条件
    const allMenus = await db.select().from(menu).where(project ? eq(menu.project, project) : undefined).orderBy(asc(menu.order))

    let result = buildMenuTree(allMenus)
    result = removeEmptyChildren(result)

    // 如果 flat=true，返回扁平结构
    if (flat === 'true') {
      result = flatten(result)
      // 如果有搜索条件，对扁平结果进行过滤
      if (search) {
        const lowerSearch = search.toLowerCase()
        result = result.filter((menu: any) =>
          menu.label.toLowerCase().includes(lowerSearch) ||
          menu.name.toLowerCase().includes(lowerSearch)
        )
      }
    }

    return Response.json(success(result))
  }
})

// GET /menus/search - 搜索菜单，返回匹配项及其父链
routes.push({
  method: 'GET',
  pattern: /^\/api\/menus\/search$/,
  handler: async (ctx) => {
    const { project, search: searchTerm } = ctx.query

    try {
      // 获取所有菜单
      const allMenus = await db.select().from(menu).where(project ? eq(menu.project, project) : undefined)
      const lowerSearch = searchTerm?.toLowerCase()

      // 构建菜单映射
      const menuMap = new Map<string, any>()
      allMenus.forEach(m => {
        menuMap.set(m.id, { ...m, children: [] })
      })

      // 构建 id -> parentId 的映射
      const parentMap = new Map<string, string | null>()
      allMenus.forEach(m => parentMap.set(m.id, m.parentId))

      // 如果没有搜索词，返回根菜单
      if (!lowerSearch) {
        const rootMenus = allMenus.filter(m => !m.parentId)
        const result = rootMenus.map(m => {
          const node = menuMap.get(m.id)
          const children = allMenus.filter(c => c.parentId === m.id)
          return {
            ...node,
            isLeaf: children.length === 0,
            children: children.length > 0 ? children.map(c => ({
              ...c,
              isLeaf: !allMenus.some(child => child.parentId === c.id)
            })) : undefined
          }
        }).sort((a, b) => (a.order || 0) - (b.order || 0))

        return Response.json(success({ matched: result, openKeys: [], selectedKeys: [] }))
      }

      // 1. 查找所有匹配的菜单项
      const matchedMenus = allMenus.filter(m =>
        m.label.toLowerCase().includes(lowerSearch) ||
        m.name.toLowerCase().includes(lowerSearch)
      )

      if (matchedMenus.length === 0) {
        return Response.json(success({ matched: [], openKeys: [], selectedKeys: [] }))
      }

      // 2. 收集需要展示的节点ID
      // 规则：匹配项所在层级，显示该层级的所有子菜单（同级菜单全部展开）
      const visibleIds = new Set<string>()
      const openKeysSet = new Set<string>()  // 存储 paths
      const selectedKeys: string[] = []

      for (const matched of matchedMenus) {
        selectedKeys.push(matched.path as string)

        // 获取完整的祖先链（从根到当前匹配项）
        const ancestorIds: string[] = []
        let currentId: string | null = matched.id
        while (currentId) {
          ancestorIds.unshift(currentId)
          currentId = parentMap.get(currentId) || null
        }

        // 对每一层级的节点
        for (let i = 0; i < ancestorIds.length; i++) {
          const currentId = ancestorIds[i]
          const current = menuMap.get(currentId)
          if (!current) continue

          // 标记匹配项
          if (currentId === matched.id) {
            current.match = true
          }

          // 收集该节点的所有子菜单（同级菜单全部加入）
          const childrenOfCurrent = allMenus.filter(m => m.parentId === currentId)
          childrenOfCurrent.forEach(c => visibleIds.add(c.id))

          // 如果当前节点不是根节点，它的父级path加入openKeys
          if (i > 0) {
            const parentId = ancestorIds[i - 1]
            const parentNode = menuMap.get(parentId)
            if (parentNode) {
              openKeysSet.add(parentNode.path)
            }
          }
        }
      }

      // 3. 构建返回的菜单树
      // 获取所有顶级可见节点
      const rootVisibleIds = Array.from(visibleIds).filter(id => {
        const parentId = parentMap.get(id)
        return !parentId || !visibleIds.has(parentId)
      })

      // 递归构建子树
      function buildSubTree(parentId: string): any[] {
        const children = allMenus
          .filter(m => m.parentId === parentId && visibleIds.has(m.id))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(c => {
            const node = menuMap.get(c.id)
            const grandchildren = buildSubTree(c.id)
            return {
              ...node,
              isLeaf: grandchildren.length === 0,
              children: grandchildren.length > 0 ? grandchildren : undefined
            }
          })
        return children
      }

      // 构建结果：从每个根节点开始
      const result = rootVisibleIds
        .sort((a, b) => {
          const nodeA = menuMap.get(a)
          const nodeB = menuMap.get(b)
          return (nodeA?.order || 0) - (nodeB?.order || 0)
        })
        .map(rootId => {
          const rootNode = menuMap.get(rootId)
          const children = buildSubTree(rootId)
          return {
            ...rootNode,
            isLeaf: children.length === 0,
            children: children.length > 0 ? children : undefined
          }
        })

      return Response.json(success({
        matched: result,
        openKeys: Array.from(openKeysSet),
        selectedKeys
      }))
    } catch (err: any) {
      console.error(err)
      return Response.json(error('搜索失败: ' + err.message), { status: 500 })
    }
  }
})

// GET /menus/:id
routes.push({
  method: 'GET',
  pattern: /^\/api\/menus\/([^/]+)$/,
  handler: async (ctx) => {
    const id = ctx.params["1"]
    const allMenus = await db.select().from(menu)
    const menuItem = allMenus.find(m => m.id === id)

    if (!menuItem) {
      return Response.json(error('Menu not found', 404), { status: 404 })
    }

    // 获取子菜单
    const filteredChildren = allMenus.filter(m => m.parentId === id)
    const res: any = { ...menuItem }
    if (filteredChildren.length === 0) {
      delete res.children
    } else {
      res.children = filteredChildren
    }

    return Response.json(success(res))
  }
})

// GET /menus/:id/children
routes.push({
  method: 'GET',
  pattern: /^\/api\/menus\/([^/]+)\/children$/,
  handler: async (ctx) => {
    const id = ctx.params["1"]
    const allMenus = await db.select().from(menu)
    const menus = allMenus.filter(m => m.parentId === id).sort((a, b) => (a.order || 0) - (b.order || 0))

    // 添加 isLeaf 标记
    const result = menus.map(m => {
      const childCount = allMenus.filter(c => c.parentId === m.id).length
      return { ...m, isLeaf: childCount === 0 }
    })

    return Response.json(success(result))
  }
})

// POST /menus
routes.push({
  method: 'POST',
  pattern: /^\/api\/menus$/,
  handler: async (ctx) => {
    const body = await ctx.json()

    // 处理 parentId：空字符串、undefined、null 都转为 null
    const parentId = body.parentId && body.parentId.trim() !== '' ? body.parentId : null

    // 自动生成路径：父节点路径 + "/" + name
    let generatedPath: string | null = null
    if (parentId) {
      const allMenus = await db.select().from(menu)
      const parentMenu = allMenus.find(m => m.id === parentId)
      if (parentMenu) {
        generatedPath = parentMenu.path ? `${parentMenu.path}/${body.name}` : `/${body.name}`
      }
    } else {
      // 顶级菜单直接以 / 开头
      generatedPath = `/${body.name}`
    }

    // 获取同级菜单数量，用于计算 order
    const siblings = await db.select().from(menu).where(
      parentId ? eq(menu.parentId, parentId) : or(isNull(menu.parentId), eq(menu.parentId, ''))
    )
    const siblingCount = siblings.length

    // 如果指定了 order，则插入到该位置，后续菜单 order +1；否则放到最后
    let finalOrder: number
    if (body.order !== undefined && body.order !== null) {
      finalOrder = body.order
      // 将 >= 目标 order 的同级菜单 order +1
      for (const sibling of siblings) {
        const siblingOrder = sibling.order ?? 0
        if (siblingOrder >= finalOrder) {
          await rawQuery`UPDATE menu SET "order" = ${siblingOrder + 1} WHERE id = ${sibling.id}`
        }
      }
    } else {
      // 未指定 order，放到同级菜单末尾
      finalOrder = siblingCount
    }

    const [newMenu] = await db.insert(menu).values({
      name: body.name,
      label: body.label,
      path: generatedPath,
      icon: body.icon ?? null,
      order: finalOrder,
      project: body.project ?? 'default',
      parentId: parentId
    }).returning()

    // 新创建的菜单默认是叶子节点
    return Response.json(success({ ...newMenu, isLeaf: true }, '创建成功'), { status: 201 })
  }
})

// PUT /menus/:id
routes.push({
  method: 'PUT',
  pattern: /^\/api\/menus\/([^/]+)$/,
  handler: async (ctx) => {
    const id = ctx.params["1"]
    const body = await ctx.json()

    try {
      // 先检查菜单是否存在
      const allMenus = await db.select().from(menu)
      const existingMenu = allMenus.find(m => m.id === id)
      if (!existingMenu) {
        return Response.json(error('Menu not found', 404), { status: 404 })
      }

      // 处理 parentId：空字符串、undefined、null 都转为 null
      const parentId = (body.parentId === '' || body.parentId === undefined || body.parentId === null) ? null : body.parentId

      // 自动生成路径：父节点路径 + "/" + name（如果 name 或 parentId 变了）
      let generatedPath = existingMenu.path
      const parentIdChanged = body.parentId !== undefined && body.parentId !== (existingMenu.parentId || '')
      if (body.name !== undefined || parentIdChanged) {
        if (parentId) {
          // 有父级菜单
          const parentMenu = allMenus.find(m => m.id === parentId)
          if (parentMenu) {
            generatedPath = parentMenu.path ? `${parentMenu.path}/${body.name || existingMenu.name}` : `/${body.name || existingMenu.name}`
          }
        } else {
          // 顶级菜单（根目录）
          generatedPath = `/${body.name || existingMenu.name}`
        }
      }

      // 构建更新数据
      const name = body.name !== undefined ? body.name : existingMenu.name
      const label = body.label !== undefined ? body.label : existingMenu.label
      const icon = body.icon !== undefined ? (body.icon || null) : existingMenu.icon
      const order = body.order !== undefined ? body.order : existingMenu.order
      const project = body.project !== undefined ? body.project : existingMenu.project

      // 如果 order 改变了，处理 order 互换（同级菜单中如果已存在该 order，则互换）
      if (body.order !== undefined && body.order !== existingMenu.order) {
        const targetOrder = body.order
        // 找到同级菜单中拥有相同 order 的菜单
        const siblingWithSameOrder = allMenus.find(m =>
          m.id !== id &&
          m.parentId === (existingMenu.parentId || '') &&
          (m.order ?? 0) === targetOrder
        )
        if (siblingWithSameOrder) {
          // 互换 order
          await rawQuery`UPDATE menu SET "order" = ${targetOrder} WHERE id = ${id}`
          await rawQuery`UPDATE menu SET "order" = ${existingMenu.order ?? 0} WHERE id = ${siblingWithSameOrder.id}`
        } else {
          await rawQuery`UPDATE menu SET "order" = ${targetOrder} WHERE id = ${id}`
        }
      }

      const result = await rawQuery`UPDATE menu SET name = ${name}, label = ${label}, path = ${generatedPath}, icon = ${icon}, "order" = ${order}, project = ${project}, parent_id = ${parentId} WHERE id = ${id} RETURNING *`

      // 递归更新子菜单路径的函数
      const updateChildrenPaths = async (parentId: string, newParentPath: string) => {
        const children = allMenus.filter(m => m.parentId === parentId)
        for (const child of children) {
          const childNewPath = `${newParentPath}/${child.name}`
          await rawQuery`UPDATE menu SET path = ${childNewPath} WHERE id = ${child.id}`
          // 递归更新子菜单
          await updateChildrenPaths(child.id, childNewPath)
        }
      }

      // 如果 parentId 改变了，递归更新所有子菜单的路径
      if (parentIdChanged && generatedPath && generatedPath !== existingMenu.path) {
        await updateChildrenPaths(id, generatedPath)
      }

      // 如果 name 改变了，递归更新所有子菜单的路径
      if (body.name !== undefined && body.name !== existingMenu.name && generatedPath) {
        await updateChildrenPaths(id, generatedPath)
      }

      // 检查是否有子菜单，返回 isLeaf
      const childCount = allMenus.filter(m => m.parentId === id).length
      return Response.json(success({ ...(result as any[])[0], isLeaf: childCount === 0 }, '更新成功'))
    } catch (err: any) {
      console.error(err)
      return Response.json(error('更新失败: ' + err.message), { status: 500 })
    }
  }
})

// DELETE /menus/:id
routes.push({
  method: 'DELETE',
  pattern: /^\/api\/menus\/([^/]+)$/,
  handler: async (ctx) => {
    const id = ctx.params["1"]

    try {
      // 先删除所有子菜单
      await rawQuery`DELETE FROM menu WHERE parent_id = ${id}`
      const result = await rawQuery`DELETE FROM menu WHERE id = ${id} RETURNING id`
      if (!result || (result as any[]).length === 0) {
        return Response.json(error('Menu not found', 404), { status: 404 })
      }
      return Response.json(success(null, '删除成功'))
    } catch (err) {
      console.error(err)
      return Response.json(error('Menu not found', 404), { status: 404 })
    }
  }
})

// 导入 and 函数
import { and } from 'drizzle-orm'

export { routes }
