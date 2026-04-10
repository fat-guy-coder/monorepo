import { db, rawQuery } from '../db'
import { menu } from '../db/schema'
import { eq, isNull, or, asc } from 'drizzle-orm'

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

    const [newMenu] = await db.insert(menu).values({
      name: body.name,
      label: body.label,
      path: generatedPath,
      icon: body.icon ?? null,
      order: body.order ?? 0,
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
      if (body.name !== undefined || body.parentId !== undefined) {
        if (parentId) {
          const parentMenu = allMenus.find(m => m.id === parentId)
          if (parentMenu) {
            generatedPath = parentMenu.path ? `${parentMenu.path}/${body.name || existingMenu.name}` : `/${body.name || existingMenu.name}`
          }
        } else {
          // 顶级菜单
          generatedPath = `/${body.name || existingMenu.name}`
        }
      }

      // 构建更新数据
      const name = body.name !== undefined ? body.name : existingMenu.name
      const label = body.label !== undefined ? body.label : existingMenu.label
      const icon = body.icon !== undefined ? (body.icon || null) : existingMenu.icon
      const order = body.order !== undefined ? body.order : existingMenu.order
      const project = body.project !== undefined ? body.project : existingMenu.project

      const result = await rawQuery`UPDATE menu SET name = ${name}, label = ${label}, path = ${generatedPath}, icon = ${icon}, "order" = ${order}, project = ${project}, parent_id = ${parentId} WHERE id = ${id} RETURNING *`

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
