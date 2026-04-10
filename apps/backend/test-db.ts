import postgres from 'postgres'

const sql = postgres('postgresql://jason:123456@postgres:5432/jason')

async function test() {
  try {
    const result = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`
    console.log('Tables:', JSON.stringify(result, null, 2))
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await sql.end()
  }
}

test()
