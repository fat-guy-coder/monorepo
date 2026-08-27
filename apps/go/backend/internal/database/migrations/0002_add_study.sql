-- 0002_add_study.sql — 学习计时系统
--   ① menu 表加 suggested_minutes 列（建议学习时长，分钟）
--   ② 新建 study_session 表（一次学习一条记录，开始/结束/时长）
-- 幂等：对已存在的表用 IF NOT EXISTS，迁移可重复执行

ALTER TABLE menu ADD COLUMN IF NOT EXISTS suggested_minutes integer NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS study_session (
    id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id          uuid        NOT NULL REFERENCES menu(id),
    started_at       timestamp   NOT NULL DEFAULT now(),
    ended_at         timestamp,
    duration_minutes integer     NOT NULL DEFAULT 0,
    created_at       timestamp   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_study_session_menu_id ON study_session (menu_id);
