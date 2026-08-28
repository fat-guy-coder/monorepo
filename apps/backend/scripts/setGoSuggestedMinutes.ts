import { rawQuery } from '../src/db'

// 批量设置 GO 菜单章节的建议学习时长（suggested_minutes，分钟）
//
// 规则（按阶段难度分层）：
//   阶段1 基础        30 分   —— 语法入门，单篇信息量适中
//   阶段2 并发        50 分   —— goroutine/channel/context 心智负担重
//   阶段3 Web         45 分   —— net/http/gin 等，概念多但套路化
//   阶段4 数据库      50 分   —— SQL/gorm/redis，动手量大
//   阶段5 微服务      65 分   —— rpc/grpc/分布式，最难的一档之一
//   阶段6 工程化      55 分   —— 测试/CI/工具链，偏实践
//   阶段7 进阶        70 分   —— 反射/unsafe/GC/GMP，难度峰值
//   顶层介绍页       25 分   —— IntroductionToGO / GOLearningRoadmap / GOLearningMethod
//
// 只改 GO 根菜单（48eef805-b727-4430-b7d6-6ae35bb8634b）子树内的菜单，
// 其余菜单（Python 等）保持不动（suggested_minutes = 0 / 原值）。
// 幂等：重复执行结果一致。
async function setGoSuggestedMinutes() {
  const goRootId = '48eef805-b727-4430-b7d6-6ae35bb8634b'

  console.log('开始批量设置 GO 章节建议学习时长...')

  const result = await rawQuery`
    WITH RECURSIVE go_tree AS (
      SELECT id FROM menu WHERE id = ${goRootId}
      UNION ALL
      SELECT m.id FROM menu m JOIN go_tree g ON m.parent_id = g.id::text
    )
    UPDATE menu SET suggested_minutes = CASE
      WHEN name LIKE 'go-1-%' THEN 30
      WHEN name LIKE 'go-2-%' THEN 50
      WHEN name LIKE 'go-3-%' THEN 45
      WHEN name LIKE 'go-4-%' THEN 50
      WHEN name LIKE 'go-5-%' THEN 65
      WHEN name LIKE 'go-6-%' THEN 55
      WHEN name LIKE 'go-7-%' THEN 70
      WHEN name IN ('IntroductionToGO', 'GOLearningRoadmap', 'GOLearningMethod') THEN 25
      ELSE suggested_minutes
    END
    WHERE id IN (SELECT id FROM go_tree)
  `

  const affected = result?.length ?? 0
  console.log(`已更新 ${affected} 行（仅 GO 子树内、name 命中章节规则的菜单）`)

  // 阶段二：非叶子章节（大章节/分类夹）建议时长 = 其叶子子孙建议时长之和
  // 思路：递归 CTE 从【所有顶级菜单】出发收集每个节点到根的祖先链；叶子节点的 suggested_minutes
  //       按链累加给所有祖先。覆盖全表（GO/Python/Godot 等所有菜单树，几千条也很快，一次聚合）。
  // 只更新「是某菜单父节点」的非叶子菜单（叶子保持自身值不变）；且仅当叶子之和 > 0 才覆盖，
  // 避免把手动设置过、但叶子暂时没数据的大章节刷成 0。幂等，重复执行结果一致。
  const parentResult = await rawQuery`
    WITH RECURSIVE all_tree AS (
      SELECT id, parent_id::text AS parent_id, suggested_minutes,
             ARRAY[id]::text[] AS chain
      FROM menu WHERE parent_id IS NULL
      UNION ALL
      SELECT m.id, m.parent_id::text, m.suggested_minutes,
             t.chain || m.id::text
      FROM menu m
      JOIN all_tree t ON m.parent_id = t.id::text
    ),
    leaves AS (
      SELECT id::text AS id, chain, suggested_minutes
      FROM all_tree
      WHERE id::text NOT IN (SELECT parent_id FROM menu WHERE parent_id IS NOT NULL)
    ),
    sums AS (
      SELECT t.ancestor AS node_id, SUM(l.suggested_minutes) AS total
      FROM leaves l
      CROSS JOIN LATERAL unnest(l.chain) AS t(ancestor)
      WHERE t.ancestor <> l.id
      GROUP BY t.ancestor
    )
    UPDATE menu m
    SET suggested_minutes = s.total
    FROM sums s
    WHERE m.id::text = s.node_id
      AND s.total > 0
      AND m.id::text IN (SELECT DISTINCT parent_id FROM menu WHERE parent_id IS NOT NULL)
    RETURNING m.id, m.name, m.suggested_minutes
  `
  const parentAffected = parentResult?.length ?? 0
  console.log(`已更新 ${parentAffected} 个非叶子章节（全表，建议时长 = 叶子子孙之和）`)

  // 校验：统计 GO 子树里设置了建议时长的菜单数，按阶段分布
  const stats = await rawQuery`
    WITH RECURSIVE go_tree AS (
      SELECT id FROM menu WHERE id = ${goRootId}
      UNION ALL
      SELECT m.id FROM menu m JOIN go_tree g ON m.parent_id = g.id::text
    )
    SELECT
      COUNT(*) FILTER (WHERE name LIKE 'go-1-%') AS stage1,
      COUNT(*) FILTER (WHERE name LIKE 'go-2-%') AS stage2,
      COUNT(*) FILTER (WHERE name LIKE 'go-3-%') AS stage3,
      COUNT(*) FILTER (WHERE name LIKE 'go-4-%') AS stage4,
      COUNT(*) FILTER (WHERE name LIKE 'go-5-%') AS stage5,
      COUNT(*) FILTER (WHERE name LIKE 'go-6-%') AS stage6,
      COUNT(*) FILTER (WHERE name LIKE 'go-7-%') AS stage7,
      COUNT(*) FILTER (WHERE name IN ('IntroductionToGO', 'GOLearningRoadmap', 'GOLearningMethod')) AS top_pages,
      COUNT(*) FILTER (WHERE suggested_minutes > 0) AS with_time,
      COUNT(*) AS total
    FROM menu WHERE id IN (SELECT id FROM go_tree)
  `
  console.log('GO 子树统计：', stats)

  console.log('GO 建议时长设置完成!')
}

setGoSuggestedMinutes().catch(console.error)
