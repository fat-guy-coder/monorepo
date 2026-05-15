import { db, rawQuery } from '../src/db'

async function initUserTable() {
  try {
    // 创建 user 表
    await rawQuery`
      CREATE TABLE IF NOT EXISTS "user" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `
    console.log('User table created successfully')
  } catch (e: any) {
    if (e.message?.includes('already exists')) {
      console.log('User table already exists')
    } else {
      console.error('Error:', e)
    }
  }

  // 验证表存在
  const tables = await rawQuery`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  console.log('Tables:', JSON.stringify(tables, null, 2))
}

initUserTable().catch(console.error)