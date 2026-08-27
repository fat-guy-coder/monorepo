-- 0001_create_menu.sql (up) — 建 menu 表
-- 与 Bun backend（drizzle）的表结构保持一致：snake_case 列名 + uuid 主键
-- 幂等：IF NOT EXISTS，已存在的表不会被覆盖，可重复执行
CREATE TABLE IF NOT EXISTS menu (
    id          uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
    name        varchar(255) NOT NULL,
    label       varchar(255) NOT NULL,
    path        varchar(255),
    icon        varchar(255),
    "order"     integer      NOT NULL DEFAULT 0,
    project     varchar(255) NOT NULL DEFAULT 'default',
    parent_id   varchar(255),
    created_at  timestamp    NOT NULL DEFAULT now(),
    updated_at  timestamp    NOT NULL DEFAULT now()
);

-- parent_id 加索引：BuildTree 按 parent 分组、递归删除都要用它
CREATE INDEX IF NOT EXISTS idx_menu_parent_id ON menu (parent_id);
