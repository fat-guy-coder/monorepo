import { pgTable, varchar, integer, timestamp, uuid } from 'drizzle-orm/pg-core'

export const menu = pgTable('menu', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  label: varchar('label', { length: 255 }).notNull(),
  path: varchar('path', { length: 255 }),
  icon: varchar('icon', { length: 255 }),
  order: integer('order').default(0),
  project: varchar('project', { length: 255 }).default('default'),
  parentId: varchar('parent_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type Menu = typeof menu.$inferSelect
export type NewMenu = typeof menu.$inferInsert
