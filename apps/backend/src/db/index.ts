import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/menu'

const client = postgres(connectionString)
export const db = drizzle(client, { schema })

// 用于执行原始 SQL 查询
export const rawQuery = client
