import { pgTable, varchar, integer, timestamp, uuid, text, boolean } from 'drizzle-orm/pg-core'

export const menu = pgTable('menu', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  label: varchar('label', { length: 255 }).notNull(),
  path: varchar('path', { length: 255 }),
  icon: varchar('icon', { length: 255 }),
  order: integer('order').default(0),
  project: varchar('project', { length: 255 }).default('default'),
  suggestedMinutes: integer('suggested_minutes').default(0),
  parentId: varchar('parent_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type Menu = typeof menu.$inferSelect
export type NewMenu = typeof menu.$inferInsert

// 学习会话表 — 一次学习一条记录（开始/结束/时长），同章多次学可累计
export const studySession = pgTable('study_session', {
  id: uuid('id').primaryKey().defaultRandom(),
  menuId: uuid('menu_id').notNull().references(() => menu.id),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  endedAt: timestamp('ended_at'),
  durationMinutes: integer('duration_minutes').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

export type StudySession = typeof studySession.$inferSelect
export type NewStudySession = typeof studySession.$inferInsert

// 用户表
export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert

// 角色表
export const role = pgTable('role', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 255 }),
  // 菜单权限，存储菜单 ID 数组
  menuIds: text('menu_ids').default('[]'), // JSON array of menu IDs
  // 菜单路径权限（用于快速检查），存储路径数组
  menuPaths: text('menu_paths').default('[]'), // JSON array of menu paths
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type Role = typeof role.$inferSelect
export type NewRole = typeof role.$inferInsert

// 用户-角色关联表
export const userRole = pgTable('user_role', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  roleId: uuid('role_id').notNull().references(() => role.id),
  createdAt: timestamp('created_at').defaultNow(),
})

export type UserRole = typeof userRole.$inferSelect
export type NewUserRole = typeof userRole.$inferInsert