import { rawQuery } from '../src/db'

// 学习计时系统建表/加列：
//   1. menu 表加 suggested_minutes 列（建议学习时长，分钟，幂等）
//   2. 新建 study_progress 表（每菜单一行聚合：累计时长 + 最近起止）
//   3. 删除旧 study_session 表（旧「一菜单多段」存储已弃用，清空重来）
async function initStudyTables() {
  console.log('开始初始化学习计时表...')

  await rawQuery`
    ALTER TABLE menu ADD COLUMN IF NOT EXISTS suggested_minutes integer NOT NULL DEFAULT 0
  `
  console.log('menu.suggested_minutes 列已就绪')

  await rawQuery`
    CREATE TABLE IF NOT EXISTS "study_progress" (
      menu_id       UUID PRIMARY KEY REFERENCES "menu"(id),
      total_minutes INTEGER NOT NULL DEFAULT 0,
      started_at    TIMESTAMP,
      ended_at      TIMESTAMP,
      created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `
  console.log('study_progress 表已就绪')

  await rawQuery`
    DROP TABLE IF EXISTS "study_session"
  `
  console.log('旧 study_session 表已删除（旧多段存储弃用）')

  console.log('学习计时表初始化完成!')
}

initStudyTables().catch(console.error)
