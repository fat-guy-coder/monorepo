import { rawQuery } from '../src/db'

// 批量设置 DSA（算法与数据结构）菜单章节的建议学习时长（suggested_minutes，分钟）
//
// 评估思路：
//  - 每个章节按所属模块（1-13）定一个基础档位，反映模块整体难度与信息量；
//  - 难点章节（红黑树 / 网络流 / 后缀数组 / DP 优化 / 可持久化等）在基础档上叠加加分（封顶 90）；
//  - 顶层路线图页 dsa-learning-path 设 20 分（总览页，非算法正文）；
//  - 非叶子（子主题 / 模块 / 根）不手填，由阶段二「叶子子孙之和」自动汇总。
//
// 章节名规则：dsa-{模块}-{子主题}-{序号}-{英文名}（如 dsa-4-3-2-rb-tree），
// 模块号取第一个数字段；模块/子主题节点名不含三数字段，不会被阶段一命中。
// 幂等：重复执行结果一致。
async function setDsaSuggestedMinutes() {
  const dsaRootId = 'd1ff0e93-e469-46bc-85fa-a0f7853d357a'

  console.log('开始批量设置 DSA 章节建议学习时长...')

  // 阶段一：按章节名规则直接设值（叶子章节 + 顶层页）
  const rows = await rawQuery`SELECT id, name FROM menu WHERE name LIKE 'dsa-%'`

  let updated = 0
  for (const r of rows) {
    const minutes = minutesFor(r.name)
    if (minutes === null) continue
    await rawQuery`UPDATE menu SET suggested_minutes = ${minutes} WHERE id = ${r.id}`
    updated++
  }
  console.log(`阶段一：已设置 ${updated} 个章节（叶子 + 顶层页）`)

  // 阶段二：非叶子（子主题 / 模块 / 根）建议时长 = 叶子子孙之和
  // 通用 CTE：从所有顶级菜单出发收集祖先链，叶子值按链累加给所有祖先。
  // 只更新「是某菜单父节点」的非叶子；且仅当叶子之和 > 0 才覆盖。幂等。
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
  console.log(`阶段二：已汇总 ${parentResult?.length ?? 0} 个非叶子章节`)

  // 校验：DSA 子树统计
  const stats = await rawQuery`
    WITH RECURSIVE dsa_tree AS (
      SELECT id, name, suggested_minutes FROM menu WHERE id = ${dsaRootId}
      UNION ALL
      SELECT m.id, m.name, m.suggested_minutes
      FROM menu m JOIN dsa_tree d ON m.parent_id = d.id::text
    )
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE name LIKE 'dsa-module-%') AS modules,
      COUNT(*) FILTER (WHERE name = 'dsa-learning-path') AS top_page,
      COUNT(*) FILTER (WHERE name ~ '^dsa-\\d+-\\d+-\\d+-') AS chapters,
      COUNT(*) FILTER (WHERE suggested_minutes > 0) AS with_time
    FROM menu WHERE id IN (SELECT id FROM dsa_tree)
  `
  console.log('DSA 子树统计：', stats)

  console.log('DSA 建议时长设置完成!')
}

// 模块基础档位（分钟/章节）
const MODULE_BASE: Record<number, number> = {
  1: 35, // 复杂度
  2: 45, // 线性结构（数组/链表/栈/队列/跳表）
  3: 40, // 哈希
  4: 55, // 树（二叉树/BST/平衡/B树/线段树/并查集）
  5: 45, // 堆
  6: 65, // 图（遍历/最短路/MST/网络流/SCC）
  7: 40, // 排序
  8: 50, // 搜索（二分/回溯/分支限界）
  9: 65, // 动态规划
  10: 45, // 贪心
  11: 60, // 字符串（KMP/AC自动机/后缀数组/Manacher）
  12: 60, // 高级结构（伸展/可持久化/布谷鸟/无锁）
  13: 35, // 方法论/刷题/面试
}

// 难点章节加分（基础档上叠加，结果封顶 90；20 为下限）
const ADJUST: Record<string, number> = {
  // 线性
  'dsa-2-2-4-lru': 5,
  'dsa-2-5-1-principle': 10,
  'dsa-2-5-2-implement': 10,
  // 树
  'dsa-4-1-4-lca': 5,
  'dsa-4-3-2-rb-tree': 20,
  'dsa-4-4-1-b-tree': 10,
  'dsa-4-4-2-b-plus': 10,
  'dsa-4-4-3-lsm': 10,
  'dsa-4-5-2-segment': 10,
  'dsa-4-5-3-fenwick': 10,
  'dsa-4-5-4-union-find': 5,
  // 堆
  'dsa-5-3-1-leftist': 10,
  'dsa-5-3-2-fib-heap': 20,
  'dsa-5-3-3-pairing': 10,
  // 图
  'dsa-6-3-5-a-star': 5,
  'dsa-6-5-1-max-flow': 15,
  'dsa-6-5-2-min-cut': 15,
  'dsa-6-5-3-bipartite-match': 10,
  'dsa-6-6-1-scc': 10,
  'dsa-6-6-2-bridge-cut': 5,
  'dsa-6-6-3-euler': 5,
  // 搜索
  'dsa-8-2-3-n-queens': 5,
  'dsa-8-3-2-tsp': 10,
  // DP
  'dsa-9-2-4-matrix-chain': 10,
  'dsa-9-4-3-digit-dp': 10,
  'dsa-9-5-1-mono-queue': 15,
  'dsa-9-5-2-slope': 20,
  'dsa-9-5-3-quadrangle': 20,
  // 贪心
  'dsa-10-1-3-proof': 10,
  // 字符串
  'dsa-11-1-2-kmp': 10,
  'dsa-11-1-3-boyer-moore': 5,
  'dsa-11-1-4-z-algo': 5,
  'dsa-11-2-2-aho': 15,
  'dsa-11-3-1-suffix-array': 20,
  'dsa-11-3-2-lcp': 5,
  'dsa-11-3-3-suffix-tree': 15,
  'dsa-11-4-1-manacher': 10,
  // 高级
  'dsa-12-1-1-splay': 15,
  'dsa-12-1-2-scapegoat': 10,
  'dsa-12-2-1-persistent-seg': 20,
  'dsa-12-2-2-persistent-trie': 15,
  'dsa-12-3-1-cuckoo': 10,
  'dsa-12-4-1-lock-free': 15,
}

/** 返回某章节的建议时长（分钟）；模块/子主题节点返回 null，由阶段二汇总 */
function minutesFor(name: string): number | null {
  if (name === 'dsa-learning-path') return 20
  const m = name.match(/^dsa-(\d+)-\d+-\d+-/)
  if (!m) return null
  const mod = Number(m[1])
  const base = MODULE_BASE[mod]
  if (!base) return null
  return Math.min(90, Math.max(20, base + (ADJUST[name] ?? 0)))
}

setDsaSuggestedMinutes().catch(console.error)
