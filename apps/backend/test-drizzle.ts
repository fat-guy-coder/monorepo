import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { menu } from './src/db/schema'
import * as schema from './src/db/schema'

const sql = postgres('postgresql://jason:123456@postgres:5432/jason')
const db = drizzle(sql, { schema })

async function test() {
  try {
    const result = await db.select().from(menu).limit(1)
    console.log('Result:', JSON.stringify(result, null, 2))
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await sql.end()
  }
}

test()
