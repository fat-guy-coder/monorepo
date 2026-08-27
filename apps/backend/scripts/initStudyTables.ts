import { rawQuery } from '../src/db'

// 学习计时系统建表/加列：
//   1. menu 表加 suggested_minutes 列（建议学习时长，分钟，幂等）
//   2. 新建 study_session 表（一次学习一条记录，开始/结束/时长）
async function initStudyTables() {
  console.log('开始初始化学习计时表...')

  await rawQuery`
    ALTER TABLE menu ADD COLUMN IF NOT EXISTS suggested_minutes integer NOT NULL DEFAULT 0
  `
  console.log('menu.suggested_minutes 列已就绪')

  await rawQuery`
    CREATE TABLE IF NOT EXISTS "study_session" (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      menu_id          UUID NOT NULL REFERENCES "menu"(id),
      started_at       TIMESTAMP NOT NULL DEFAULT NOW(),
      ended_at         TIMESTAMP,
      duration_minutes INTEGER NOT NULL DEFAULT 0,
      created_at       TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `
  console.log('study_session 表已就绪')

  await rawQuery`
    CREATE INDEX IF NOT EXISTS idx_study_session_menu_id ON "study_session" (menu_id)
  `
  console.log('study_session 索引已就绪')

  console.log('学习计时表初始化完成!')
}

initStudyTables().catch(console.error)
