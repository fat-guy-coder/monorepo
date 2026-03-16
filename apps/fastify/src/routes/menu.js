// 菜单路由模块
export default async function menuRoutes(fastify, options) {
  // 统一响应格式
  const success = (data, message = 'success') => ({ code: 200, message, data })
  const error = (message, code = 500) => ({ code, message, data: null })

  // 辅助函数：构建树形结构
  function buildTree(menus, parentId = null) {
    return menus
      .filter(m => m.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map(m => ({
        ...m,
        children: buildTree(menus, m.id)
      }))
  }

  // 简单内存缓存
  const menuCache = new Map()
  const CACHE_TTL = 5 * 60 * 1000 // 5分钟

  function getCachedMenus(key) {
    const cached = menuCache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data
    }
    return null
  }

  function setCachedMenus(key, data) {
    menuCache.set(key, { data, timestamp: Date.now() })
  }

  function invalidateCache() {
    menuCache.clear()
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
      parentId: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      children: {
        type: 'array',
        items: { type: 'object' } // 简化嵌套类型
      }
    }
  }

  const MenuListSchema = {
    type: 'array',
    items: MenuSchema
  }

  const CreateMenuSchema = {
    type: 'object',
    required: ['name', 'label'],
    properties: {
      name: { type: 'string' },
      label: { type: 'string' },
      path: { type: 'string' },
      icon: { type: 'string' },
      order: { type: 'integer' },
      parentId: { type: 'string' }
    }
  }

  const UpdateMenuSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      label: { type: 'string' },
      path: { type: 'string' },
      icon: { type: 'string' },
      order: { type: 'integer' },
      parentId: { type: 'string' }
    }
  }

  const QuerySchema = {
    type: 'object',
    properties: {
      parentId: { type: 'string' },
      flat: { type: 'string', enum: ['true', 'false'] }
    }
  }

  // 统一响应 Schema - 不验证 data 内容
  const ResponseSchema = {
    type: 'object',
    properties: {
      code: { type: 'integer' },
      message: { type: 'string' }
    }
  }

  // GET /menus - 获取所有菜单（可递归树形，可按 parentId 查询）
  fastify.get('/menus', {
    schema: {
      querystring: QuerySchema
    }
  }, async (req, reply) => {
    const { parentId, flat } = req.query

    // 如果指定了 parentId，查询该父菜单的子菜单
    if (parentId) {
      const menus = await fastify.prisma.menu.findMany({
        where: { parentId },
        orderBy: { order: 'asc' },
        include: { children: true }
      })
      return success(menus)
    }

    // 缓存键（只有查询所有菜单时才缓存）
    const cacheKey = `menus_all_${flat || 'tree'}`
    // 暂时禁用缓存，避免返回空数据
    // const cached = getCachedMenus(cacheKey)
    // if (cached) {
    //   return success(cached)
    // }

    // 获取所有菜单
    const allMenus = await fastify.prisma.menu.findMany({
      orderBy: { order: 'asc' }
    })

    // 构建树形结构
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

    let result = menus
    // 如果 flat=true，返回扁平结构
    if (flat === 'true') {
      // 递归扁平化
      const flatten = (items) => {
        return items.reduce((acc, item) => {
          acc.push(item)
          if (item.children && item.children.length > 0) {
            acc.push(...flatten(item.children))
          }
          return acc
        }, [])
      }
      result = flatten(menus)
    }

    // 暂时禁用缓存
    // setCachedMenus(cacheKey, result)
    return success(result)
  })

  // GET /menus/root - 获取根菜单（顶级菜单）
  fastify.get('/menus/root', {
    schema: {}
  }, async (req, reply) => {
    const cacheKey = 'menus_root'
    const cached = getCachedMenus(cacheKey)
    if (cached) return success(cached)

    const menus = await fastify.prisma.menu.findMany({
      where: { parentId: null },
      orderBy: { order: 'asc' },
      include: { children: true }
    })

    const result = buildTree(menus, null)
    setCachedMenus(cacheKey, result)
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
      },
      response: {}
    }
  }, async (req, reply) => {
    const { id } = req.params
    const menu = await fastify.prisma.menu.findUnique({
      where: { id },
      include: { children: true, parent: true }
    })
    if (!menu) return reply.code(404).send(error('Menu not found', 404))
    return success(menu)
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
      },
      response: {}
    }
  }, async (req, reply) => {
    const { id } = req.params

    const menus = await fastify.prisma.menu.findMany({
      where: { parentId: id },
      orderBy: { order: 'asc' },
      include: { children: true }
    })

    return success(menus)
  })

  // POST /menus - 创建菜单
  fastify.post('/menus', {
    schema: {
      body: CreateMenuSchema,
      response: {}
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
        parentId: body.parentId ?? null
      }
    })
    invalidateCache()
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
      body: UpdateMenuSchema,
      response: {}
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
          parentId: body.parentId
        }
      })
      invalidateCache()
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
      },
      response: {}
    }
  }, async (req, reply) => {
    const { id } = req.params

    try {
      // 先删除所有子菜单
      await fastify.prisma.menu.deleteMany({ where: { parentId: id } })
      await fastify.prisma.menu.delete({ where: { id } })
      invalidateCache()
      return success(null, '删除成功')
    } catch (err) {
      return reply.code(404).send(error('Menu not found', 404))
    }
  })
}
