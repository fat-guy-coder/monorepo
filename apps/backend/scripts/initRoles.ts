import { db, rawQuery } from '../src/db'
import { role, userRole, user, menu } from '../src/db/schema'
import { eq } from 'drizzle-orm'

async function initRoles() {
  console.log('开始初始化角色...')

  // 创建 role 表和 user_role 表（如果不存在）
  try {
    await rawQuery`
      CREATE TABLE IF NOT EXISTS "role" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) NOT NULL UNIQUE,
        description VARCHAR(255),
        menu_ids TEXT DEFAULT '[]',
        menu_paths TEXT DEFAULT '[]',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `
    console.log('Role table created or already exists')

    await rawQuery`
      CREATE TABLE IF NOT EXISTS "user_role" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES "user"(id),
        role_id UUID NOT NULL REFERENCES "role"(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
    console.log('User_role table created or already exists')
  } catch (e) {
    console.log('Tables might already exist:', e)
  }

  // 获取 admin 角色的所有菜单 ID 和路径
  // 查询所有角色
  const existingRoles = await db.select().from(role)
  console.log('Existing roles:', existingRoles.length)

  // 获取所有菜单用于构建权限
  const allMenus = await db.select().from(menu)
  console.log('Total menus:', allMenus.length)

  // 创建 admin 角色（如果不存在）
  let adminRole = await db.query.role.findFirst({
    where: (r, { eq }) => eq(r.name, 'admin'),
  })

  if (!adminRole) {
    const result = await db.insert(role).values({
      name: 'admin',
      description: '管理员角色，拥有所有权限',
      menuIds: JSON.stringify([]),
      menuPaths: JSON.stringify([]),
    }).returning()
    adminRole = result[0]
    console.log('Admin role created:', adminRole?.id)
  } else {
    console.log('Admin role already exists:', adminRole.id)
    await db.update(role).set({
      menuIds: JSON.stringify([]),
      menuPaths: JSON.stringify([]),
    }).where(eq(role.id, adminRole.id))
    console.log('Admin role updated with full permissions')
  }

  // 查找 admin 用户
  const adminUser = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.username, 'admin'),
  })

  if (!adminUser) {
    console.log('Admin user not found, please run user init script first')
    return
  }

  console.log('Admin user found:', adminUser.id)

  // 绑定 admin 用户到 admin 角色（如果未绑定）
  if (!adminRole) {
    console.log('Admin role not found, cannot bind user')
    return
  }

  const existingRelation = await db.query.userRole.findFirst({
    where: (ur, { and, eq }) => and(eq(ur.userId, adminUser.id), eq(ur.roleId, adminRole.id)),
  })

  if (!existingRelation) {
    await db.insert(userRole).values({
      userId: adminUser.id,
      roleId: adminRole.id,
    })
    console.log('Admin user bound to admin role')
  } else {
    console.log('Admin user already bound to admin role')
  }

  // 创建默认角色（普通用户 - 只有基础菜单）
  let defaultRole = await db.query.role.findFirst({
    where: (r, { eq }) => eq(r.name, 'default'),
  })

  if (!defaultRole) {
    const result = await db.insert(role).values({
      name: 'default',
      description: '默认角色，拥有除管理类菜单外的所有菜单权限',
      menuIds: JSON.stringify([]),
      menuPaths: JSON.stringify([]),
    }).returning()
    defaultRole = result[0]
    console.log('Default role created:', defaultRole?.id)
  }

  console.log('角色初始化完成!')
}

initRoles().catch(console.error)