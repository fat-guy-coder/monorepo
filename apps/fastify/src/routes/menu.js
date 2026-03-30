// 菜单路由模块 - 支持项目隔离
export default async function menuRoutes (fastify, options) {
  // 统一响应格式
  const success = (data, message = 'success') => ({ code: 200, message, data })
  const error = (message, code = 500) => ({ code, message, data: null })

  // 通用响应 Schema
  const MenuItemSchema = {
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
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
      hasChildren: { type: 'boolean' },
      isLeaf: { type: 'boolean' },
      children: {
        type: 'array',
        items: { type: 'object' }
      }
    }
  }

  const ApiResponseSchema = {
    type: 'object',
    properties: {
      code: { type: 'number' },
      message: { type: 'string' },
      data: {}
    }
  }

  // 辅助函数：构建树形结构
  function buildTree (menus, parentId = null) {
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
  function removeEmptyChildren (items) {
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
  function flatten (items) {
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
  function buildMenuTree (allMenus) {
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

  // 辅助函数：获取菜单的所有祖先ID
  function getAncestorIds (menuId, menuMap) {
    const ancestors = []
    let current = menuMap.get(menuId)
    while (current && current.parentId) {
      ancestors.push(current.parentId)
      current = menuMap.get(current.parentId)
    }
    return ancestors
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

  // 注册 schema 到 swagger components - 使用 components 格式
  if (fastify.addSchema) {
    fastify.addSchema({
      $id: 'MenuItem',
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
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        hasChildren: { type: 'boolean' },
        isLeaf: { type: 'boolean' },
        children: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: true
          }
        }
      }
    })
  }

  const QuerySchema = {
    type: 'object',
    properties: {
      project: { type: 'string' },
      parentId: { type: 'string' },
      flat: { type: 'string', enum: ['true', 'false'] },
      tree: { type: 'string', enum: ['true', 'false'] },
      search: { type: 'string' }
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
          flat: { type: 'string', enum: ['true', 'false'] },
          tree: { type: 'string', enum: ['true', 'false'] },
          search: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            message: { type: 'string' },
            data: {
              type: 'array',
              items: { $ref: 'MenuItem' }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { project, parentId, root, flat, tree, search } = req.query

    // 如果指定了 tree=true，返回完整树结构
    if (tree === 'true') {
      try {
        const where = {}
        if (project) where.project = project
        let allMenus = await fastify.prisma.menu.findMany({
          where,
          orderBy: { order: 'asc' }
        })
        console.log('tree=true 查询到的菜单数量:', allMenus.length)

        // 如果 admin 项目没有菜单，则初始化默认菜单
        if (allMenus.length === 0 && project === 'admin') {
          console.log('admin 项目菜单为空，开始初始化...')
          // 创建父级菜单：系统管理
          const parentMenu = await fastify.prisma.menu.create({
            data: {
              name: 'System',
              label: '系统管理',
              path: '/system',
              icon: 'ep Setting',
              order: 1,
              project: 'admin',
              parentId: null
            }
          })
          console.log('创建父级菜单:', parentMenu)

          // 创建子级菜单：菜单管理
          const childMenu = await fastify.prisma.menu.create({
            data: {
              name: 'SystemMenu',
              label: '菜单管理',
              path: '/system/menu',
              icon: 'ep menu',
              order: 1,
              project: 'admin',
              parentId: parentMenu.id
            }
          })
          console.log('创建子级菜单:', childMenu)

          // 重新查询
          allMenus = await fastify.prisma.menu.findMany({
            where,
            orderBy: { order: 'asc' }
          })
          console.log('初始化后查询到的菜单数量:', allMenus.length)
        }

        console.log('第一个菜单:', JSON.stringify(allMenus[0]))
        let result = buildMenuTree(allMenus)
        console.log('构建树后的结果:', JSON.stringify(result))
        // 标记 isLeaf
        const markLeaf = (menus) => {
          return menus.map(menu => {
            const hasChildren = menu.children && menu.children.length > 0
            return {
              ...menu,
              isLeaf: !hasChildren,
              children: menu.children ? markLeaf(menu.children) : undefined
            }
          })
        }
        result = markLeaf(result)
        console.log('markLeaf后第一个菜单:', JSON.stringify(result[0]))
        return success(result)
      } catch (err) {
        fastify.log.error(err)
        return reply.code(500).send(error('查询失败: ' + err.message))
      }
    }

    // 获取顶级菜单（parentId 为 null 或空字符串）
    if (root === 'true') {
      try {
        // 先查看所有数据的情况
        const allMenus = await fastify.prisma.menu.findMany({ take: 5 })
        console.log('所有菜单示例:', JSON.stringify(allMenus))

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
        console.log('查询结果数量:', menus.length)
        // 标记 isLeaf（是否有子菜单）
        const result = await Promise.all(menus.map(async (menu) => {
          const childCount = await fastify.prisma.menu.count({
            where: { parentId: menu.id }
          })
          return { ...menu, isLeaf: childCount === 0 }
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
        return { ...menu, isLeaf: childCount === 0 }
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
      // 如果有搜索条件，对扁平结果进行过滤
      if (search) {
        const lowerSearch = search.toLowerCase()
        result = result.filter(menu =>
          menu.label.toLowerCase().includes(lowerSearch) ||
          menu.name.toLowerCase().includes(lowerSearch)
        )
      }
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
      },
      response: {
        200: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            message: { type: 'string' },
            data: { $ref: 'MenuItem' }
          }
        }
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
      },
      response: {
        200: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            message: { type: 'string' },
            data: {
              type: 'array',
              items: { $ref: 'MenuItem' }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { id } = req.params
    const menus = await fastify.prisma.menu.findMany({
      where: { parentId: id },
      orderBy: { order: 'asc' }
    })
    // 添加 isLeaf 标记
    const result = await Promise.all(menus.map(async (menu) => {
      const childCount = await fastify.prisma.menu.count({
        where: { parentId: menu.id }
      })
      return { ...menu, isLeaf: childCount === 0 }
    }))
    return success(result)
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
      },
      response: {
        201: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            message: { type: 'string' },
            data: { $ref: 'MenuItem' }
          }
        }
      }
    }
  }, async (req, reply) => {
    const body = req.body || {}

    // 自动生成路径：父节点路径 + "/" + name
    let generatedPath = null
    if (body.parentId) {
      const parentMenu = await fastify.prisma.menu.findUnique({
        where: { id: body.parentId }
      })
      if (parentMenu) {
        generatedPath = parentMenu.path ? `${parentMenu.path}/${body.name}` : `/${body.name}`
      }
    } else {
      // 顶级菜单直接以 / 开头
      generatedPath = `/${body.name}`
    }

    const menu = await fastify.prisma.menu.create({
      data: {
        name: body.name,
        label: body.label,
        path: generatedPath,
        icon: body.icon ?? null,
        order: body.order ?? 0,
        project: body.project ?? 'default',
        parentId: body.parentId ?? null
      }
    })
    // 新创建的菜单默认是叶子节点
    return reply.code(201).send(success({ ...menu, isLeaf: true }, '创建成功'))
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
      },
      response: {
        200: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            message: { type: 'string' },
            data: { $ref: 'MenuItem' }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { id } = req.params
    const body = req.body || {}

    try {
      // 先检查菜单是否存在
      const existingMenu = await fastify.prisma.menu.findUnique({ where: { id } })
      if (!existingMenu) {
        fastify.log.error('菜单不存在:', id)
        return reply.code(404).send(error('Menu not found', 404))
      }

      // 处理 parentId：空字符串转为 null
      const parentId = body.parentId === '' || body.parentId === undefined ? null : body.parentId;

      // 自动生成路径：父节点路径 + "/" + name（如果 name 或 parentId 变了）
      let generatedPath = existingMenu.path
      if (body.name !== undefined || body.parentId !== undefined) {
        if (parentId) {
          const parentMenu = await fastify.prisma.menu.findUnique({
            where: { id: parentId }
          })
          if (parentMenu) {
            generatedPath = parentMenu.path ? `${parentMenu.path}/${body.name || existingMenu.name}` : `/${body.name || existingMenu.name}`
          }
        } else {
          // 顶级菜单
          generatedPath = `/${body.name || existingMenu.name}`
        }
      }

      const menu = await fastify.prisma.menu.update({
        where: { id },
        data: {
          name: body.name,
          label: body.label,
          path: generatedPath,
          icon: body.icon || null,
          order: body.order,
          project: body.project,
          parentId: parentId
        }
      })

      // 检查是否有子菜单，返回 isLeaf
      const childCount = await fastify.prisma.menu.count({
        where: { parentId: id }
      })
      return success({ ...menu, isLeaf: childCount === 0 }, '更新成功')
    } catch (err) {
      fastify.log.error('更新菜单失败:', err)
      return reply.code(500).send(error('更新失败: ' + err.message))
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
      response: {
        200: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            message: { type: 'string' },
            data: { type: 'null' }
          }
        }
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
