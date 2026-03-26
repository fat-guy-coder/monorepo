// 菜单路由模块 - 支持项目隔离
export default async function menuRoutes(fastify, options) {
  // 统一响应格式
  const success = (data, message = 'success') => ({ code: 200, message, data })
  const error = (message, code = 500) => ({ code, message, data: null })

  // 辅助函数：构建树形结构
  function buildTree(menus, parentId = null) {
    return menus
      .filter(m => m.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map(m => {
        const children = buildTree(menus, m.id)
        if (children.length === 0) {
          const { children: _, ...rest } = m
          return rest
        }
        return { ...m, children }
      })
  }

  // 辅助函数：删除空 children
  function removeEmptyChildren(items) {
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
  function flatten(items) {
    return items.reduce((acc, item) => {
      const { children, ...rest } = item
      acc.push(rest)
      if (children && children.length > 0) {
        acc.push(...flatten(children))
      }
      return acc
    }, [])
  }

  // 辅助函数：构建菜单树
  function buildMenuTree(allMenus) {
    const menuMap = new Map()
    allMenus.forEach(menu => {
      menuMap.set(menu.id, { ...menu, children: [] })
    })

    const menus = []
    for (const menu of allMenus) {
      const menuWithChildren = menuMap.get(menu.id)
      if (menu.parentId) {
        const parent = menuMap.get(menu.parentId)
        if (parent) {
          parent.children.push(menuWithChildren)
        }
      } else {
        menus.push(menuWithChildren)
      }
    }
    return menus
  }

  // Schema 定义
  const MenuSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      label: { type: 'string' },
      path: { type: 'string', nullable: true },
      icon: { type: 'string', nullable: true },
      order: { type: 'integer' },
      project: { type: 'string' },
      parentId: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  }

  const QuerySchema = {
    type: 'object',
    properties: {
      project: { type: 'string' },
      parentId: { type: 'string' },
      flat: { type: 'string', enum: ['true', 'false'] }
    }
  }

  // GET /menus - 获取菜单（按项目筛选，支持获取顶级菜单或子菜单）
  fastify.get('/menus', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          project: { type: 'string' },
          parentId: { type: 'string' },
          root: { type: 'string', enum: ['true', 'false'] },
          flat: { type: 'string', enum: ['true', 'false'] }
        }
      }
    }
  }, async (req, reply) => {
    const { project, parentId, root, flat } = req.query
    fastify.log.info('查询参数:', { project, parentId, root, flat })

    // 获取顶级菜单（parentId 为 null 或空字符串）
    if (root === 'true') {
      try {
        // 先查看所有数据的情况
        const allMenus = await fastify.prisma.menu.findMany({ take: 5 })
        fastify.log.info('所有菜单示例:', JSON.stringify(allMenus))

        const menus = await fastify.prisma.menu.findMany({
          where: {
            project,
            OR: [
              { parentId: null },
              { parentId: '' }
            ]
          },
          orderBy: { order: 'asc' }
        })
        fastify.log.info('查询结果数量:', menus.length)
        // 标记 hasChildren
        const result = await Promise.all(menus.map(async (menu) => {
          const childCount = await fastify.prisma.menu.count({
            where: { parentId: menu.id }
          })
          return { ...menu, hasChildren: childCount > 0 }
        }))
        return success(result)
      } catch (err) {
        fastify.log.error(err)
        return reply.code(500).send(error('查询失败: ' + err.message))
      }
    }

    // 如果指定了 parentId，直接返回子菜单
    if (parentId) {
      const menus = await fastify.prisma.menu.findMany({
        where: { project, parentId },
        orderBy: { order: 'asc' }
      })
      const result = await Promise.all(menus.map(async (menu) => {
        const childCount = await fastify.prisma.menu.count({
          where: { parentId: menu.id }
        })
        return { ...menu, hasChildren: childCount > 0 }
      }))
      return success(flat === 'true' ? flatten(result) : result)
    }

    // 构建 where 条件
    const where = {}
    if (project) where.project = project

    // 获取所有菜单（原有逻辑）
    const allMenus = await fastify.prisma.menu.findMany({
      where,
      orderBy: { order: 'asc' }
    })

    let result = buildMenuTree(allMenus)
    result = removeEmptyChildren(result)

    // 如果 flat=true，返回扁平结构
    if (flat === 'true') {
      result = flatten(result)
    }

    return success(result)
  })

  // GET /menus/:id - 获取单个菜单
  fastify.get('/menus/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      }
    }
  }, async (req, reply) => {
    const { id } = req.params
    const menu = await fastify.prisma.menu.findUnique({
      where: { id },
      include: { children: true, parent: true }
    })
    if (!menu) return reply.code(404).send(error('Menu not found', 404))
    const result = { ...menu }
    if (menu.children && menu.children.length === 0) {
      delete result.children
    }
    if (menu.parent) {
      result.parent = menu.parent
    }
    return success(result)
  })

  // GET /menus/:id/children - 获取子菜单
  fastify.get('/menus/:id/children', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      }
    }
  }, async (req, reply) => {
    const { id } = req.params
    const menus = await fastify.prisma.menu.findMany({
      where: { parentId: id },
      orderBy: { order: 'asc' }
    })
    return success(menus)
  })

  // POST /menus - 创建菜单
  fastify.post('/menus', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'label'],
        properties: {
          name: { type: 'string' },
          label: { type: 'string' },
          path: { type: 'string' },
          icon: { type: 'string' },
          order: { type: 'integer' },
          project: { type: 'string' },
          parentId: { type: 'string' }
        }
      }
    }
  }, async (req, reply) => {
    const body = req.body || {}
    const menu = await fastify.prisma.menu.create({
      data: {
        name: body.name,
        label: body.label,
        path: body.path ?? null,
        icon: body.icon ?? null,
        order: body.order ?? 0,
        project: body.project ?? 'default',
        parentId: body.parentId ?? null
      }
    })
    return reply.code(201).send(success(menu, '创建成功'))
  })

  // PUT /menus/:id - 更新菜单
  fastify.put('/menus/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          label: { type: 'string' },
          path: { type: 'string' },
          icon: { type: 'string' },
          order: { type: 'integer' },
          project: { type: 'string' },
          parentId: { type: 'string' }
        }
      }
    }
  }, async (req, reply) => {
    const { id } = req.params
    const body = req.body || {}

    try {
      const menu = await fastify.prisma.menu.update({
        where: { id },
        data: {
          name: body.name,
          label: body.label,
          path: body.path,
          icon: body.icon,
          order: body.order,
          project: body.project,
          parentId: body.parentId
        }
      })
      return success(menu, '更新成功')
    } catch (err) {
      return reply.code(404).send(error('Menu not found', 404))
    }
  })

  // DELETE /menus/:id - 删除菜单
  fastify.delete('/menus/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      }
    }
  }, async (req, reply) => {
    const { id } = req.params

    try {
      // 先删除所有子菜单
      await fastify.prisma.menu.deleteMany({ where: { parentId: id } })
      await fastify.prisma.menu.delete({ where: { id } })
      return success(null, '删除成功')
    } catch (err) {
      return reply.code(404).send(error('Menu not found', 404))
    }
  })
}
