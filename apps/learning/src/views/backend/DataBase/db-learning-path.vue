<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">数据库学习路线图</h1>
        <p class="mt-4 text-xl text-gray-500">从 SQL 到分布式 · 成为数据专家</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <span class="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">📝 SQL</span>
          <span class="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">⚙️ 内核</span>
          <span class="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">🐬 MySQL</span>
          <span class="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200">🔴 Redis</span>
          <span class="px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">🌍 NewSQL</span>
        </div>
      </div>

      <div class="relative">
        <div class="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <ul class="flex flex-col gap-12">
          <li v-for="(phase, pIdx) in phases" :key="phase.id" class="relative pl-12 sm:pl-16">
            <div class="absolute left-0 sm:left-2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white text-sm font-bold" :class="phase.color">
              {{ phase.icon }}
            </div>
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div class="p-6 sm:p-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 class="text-2xl font-bold text-gray-900">{{ phase.title }}</h2>
                  <span class="mt-2 sm:mt-0 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">⏱ {{ phase.period }}</span>
                </div>
                <p class="text-gray-600 mb-5 leading-relaxed">{{ phase.desc }}</p>
                <div v-for="mod in phase.modules" :key="mod.name" class="mb-4">
                  <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ mod.label }}</h3>
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <li v-for="t in mod.topics" :key="t.name" class="flex items-baseline gap-2 text-sm">
                      <span class="text-cyan-500 mt-1 shrink-0">▸</span>
                      <Link v-if="t.name" :route="t.name" :text="t.label" animation="none" size="small"
                        class="p-0! text-sm! font-normal! text-gray-700! hover:text-cyan-600! bg-transparent! border-none! inline!" />
                      <span v-else class="text-gray-700">{{ t.label }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-16 text-center text-sm text-gray-400">
        预计需 12-16 周 · SQL 为先 · 深入内核 · 实战为主
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link } from 'components'

interface Topic { name: string; label: string }
interface Module { name: string; label: string; topics: Topic[] }
interface Phase {
  id: number; icon: string; title: string; period: string; desc: string
  color: string; modules: Module[]
}

const phases: Phase[] = [
  {
    id: 1, icon: '📝', title: 'SQL 精通', period: '3-4 周',
    desc: 'SQL 是数据库领域的第一语言。从基础查询到窗口函数、递归 CTE，把 SQL 练到肌肉记忆。',
    color: 'bg-blue-500',
    modules: [
      { name: 'sql-foundation', label: 'SQL 基础巩固', topics: [
        { name: 'db-1-1-1-ddl', label: 'DDL：CREATE/ALTER/DROP' },
        { name: 'db-1-1-2-dml', label: 'DML：INSERT/UPDATE/DELETE' },
        { name: 'db-1-1-3-select', label: 'SELECT 完整语法' },
        { name: 'db-1-1-4-where', label: 'WHERE 条件与 NULL 陷阱' },
      ]},
      { name: 'join', label: 'JOIN 深入', topics: [
        { name: 'db-1-2-1-inner', label: 'INNER JOIN 优化' },
        { name: 'db-1-2-2-outer', label: 'LEFT/RIGHT/FULL OUTER' },
        { name: 'db-1-2-3-cross', label: 'CROSS JOIN 生成序列' },
        { name: 'db-1-2-4-self', label: 'SELF JOIN 层级查询' },
        { name: 'db-1-2-5-anti', label: '半连接/反连接' },
      ]},
      { name: 'agg', label: '聚合与窗口函数', topics: [
        { name: 'db-1-3-1-group', label: 'GROUP BY 与聚合函数' },
        { name: 'db-1-3-2-having', label: 'HAVING vs WHERE' },
        { name: 'db-1-3-3-rollup', label: 'ROLLUP/CUBE/GROUPING SETS' },
        { name: 'db-1-4-1-rank', label: 'ROW_NUMBER/RANK/DENSE_RANK' },
        { name: 'db-1-4-2-lag', label: 'LAG/LEAD 偏移分析' },
        { name: 'db-1-4-3-cumulative', label: '累计窗口函数' },
        { name: 'db-1-4-4-partition', label: 'PARTITION BY 与窗口帧' },
      ]},
      { name: 'cte', label: 'CTE 与递归', topics: [
        { name: 'db-1-5-1-basic-cte', label: 'CTE 基础' },
        { name: 'db-1-5-2-recursive', label: '递归 CTE 树形遍历' },
        { name: 'db-1-5-3-cte-vs-sub', label: 'CTE vs 子查询 vs 临时表' },
      ]},
    ]
  },
  {
    id: 2, icon: '⚙️', title: '数据库内核', period: '3-4 周',
    desc: '理解数据库底层如何存储数据、如何使用索引加速查询、优化器如何选择执行计划。这是性能调优的基础。',
    color: 'bg-purple-500',
    modules: [
      { name: 'storage', label: '存储引擎', topics: [
        { name: 'db-2-1-1-page', label: '数据页结构' },
        { name: 'db-2-1-2-btree', label: 'B+ 树：分裂/合并/填充因子' },
        { name: 'db-2-1-3-lsm', label: 'LSM-Tree：MemTable/SSTable' },
        { name: 'db-2-1-4-row-col', label: '行存 vs 列存' },
      ]},
      { name: 'index', label: '索引原理', topics: [
        { name: 'db-2-2-1-clustered', label: '聚簇索引 vs 二级索引' },
        { name: 'db-2-2-2-covering', label: '覆盖索引与 ICP' },
        { name: 'db-2-2-3-prefix', label: '联合索引与最左前缀' },
        { name: 'db-2-2-6-gist-gin', label: 'GIN/GiST/BRIN 特殊索引' },
        { name: 'db-2-2-7-partial', label: '部分索引/表达式索引' },
      ]},
      { name: 'optimizer', label: '查询优化器', topics: [
        { name: 'db-2-3-1-explain', label: 'EXPLAIN 输出解读' },
        { name: 'db-2-3-2-scan', label: '扫描方式：Seq/Index/Bitmap' },
        { name: 'db-2-3-3-join-algo', label: 'JOIN 算法：NL/Hash/Merge' },
        { name: 'db-2-3-4-stats', label: '统计信息与直方图' },
      ]},
      { name: 'tuning', label: 'SQL 调优实战', topics: [
        { name: 'db-2-4-1-slow-query', label: '慢查询定位' },
        { name: 'db-2-4-2-index-opt', label: '索引优化案例' },
        { name: 'db-2-4-3-rewrite', label: 'SQL 重写技巧' },
        { name: 'db-2-4-4-pagination', label: '深分页优化' },
        { name: 'db-2-4-5-count', label: '大表 COUNT 加速' },
      ]},
    ]
  },
  {
    id: 3, icon: '🔒', title: '事务与并发控制', period: '2-3 周',
    desc: '理解 ACID 在各数据库中的实现差异，MVCC 如何做到读写不阻塞，锁机制如何保证并发安全。',
    color: 'bg-amber-500',
    modules: [
      { name: 'acid', label: 'ACID 深入', topics: [
        { name: 'db-3-1-1-atomicity', label: '原子性：undo log/WAL' },
        { name: 'db-3-1-3-isolation', label: '隔离性：快照隔离实现' },
        { name: 'db-3-1-4-durability', label: '持久性：WAL/checkpoint' },
      ]},
      { name: 'mvcc', label: 'MVCC 深度', topics: [
        { name: 'db-3-2-1-version-chain', label: '版本链与 tuple header' },
        { name: 'db-3-2-2-snapshot', label: '快照读 vs 当前读' },
        { name: 'db-3-2-3-vacuum', label: 'VACUUM 与膨胀治理' },
      ]},
      { name: 'locks', label: '锁机制', topics: [
        { name: 'db-3-3-1-row-lock', label: '行锁：Record/Gap/Next-Key' },
        { name: 'db-3-3-3-deadlock', label: '死锁分析' },
        { name: 'db-3-3-4-opt-pessi', label: '乐观锁 vs 悲观锁' },
      ]},
      { name: 'isolation', label: '隔离级别实战', topics: [
        { name: 'db-3-4-2-rc', label: '读已提交' },
        { name: 'db-3-4-3-rr', label: '可重复读与 Gap Lock' },
        { name: 'db-3-4-4-serial', label: '可串行化：SSI vs 2PL' },
      ]},
    ]
  },
  {
    id: 4, icon: '🐬', title: 'MySQL 实战', period: '2-3 周',
    desc: '深入 InnoDB 引擎，掌握主从复制、备份恢复和高可用方案。',
    color: 'bg-teal-500',
    modules: [
      { name: 'arch', label: 'MySQL 架构', topics: [
        { name: 'db-4-1-1-arch', label: '连接器/分析器/优化器/执行器' },
        { name: 'db-4-1-2-innodb', label: 'InnoDB：缓冲池/change buffer' },
      ]},
      { name: 'config', label: '配置与运维', topics: [
        { name: 'db-4-2-1-my-cnf', label: '参数调优' },
        { name: 'db-4-2-2-backup', label: '备份：mysqldump/XtraBackup' },
        { name: 'db-4-2-3-recovery', label: '恢复：PITR 时间点恢复' },
        { name: 'db-4-2-4-monitor', label: '监控：QPS/TPS/复制延迟' },
      ]},
      { name: 'replication', label: '主从复制与高可用', topics: [
        { name: 'db-4-3-1-binlog', label: 'binlog 格式：ROW/STATEMENT' },
        { name: 'db-4-3-2-master-slave', label: '异步/半同步复制' },
        { name: 'db-4-3-3-gtid', label: 'GTID 复制与故障切换' },
        { name: 'db-4-3-4-mgr', label: 'MGR 组复制 vs MHA' },
      ]},
      { name: 'optimize', label: 'MySQL 优化实战', topics: [
        { name: 'db-4-4-1-schema', label: 'Schema 优化' },
        { name: 'db-4-4-2-query', label: '查询优化' },
        { name: 'db-4-4-3-locking', label: '锁优化' },
        { name: 'db-4-4-4-partition', label: '分区表' },
      ]},
    ]
  },
  {
    id: 5, icon: '🐘', title: 'PostgreSQL 实战', period: '2-3 周',
    desc: 'PostgreSQL 是最先进的开源关系型数据库。学习其丰富的扩展生态和高级特性。',
    color: 'bg-indigo-500',
    modules: [
      { name: 'pg-arch', label: 'PG 架构', topics: [
        { name: 'db-5-1-1-process', label: '进程模型 vs 线程模型' },
        { name: 'db-5-1-2-wal', label: 'WAL：LSN/checkpoint 调优' },
        { name: 'db-5-1-3-extensions', label: '扩展：pg_stat/postgis/pgvector' },
      ]},
      { name: 'pg-advanced', label: 'PG 高级特性', topics: [
        { name: 'db-5-2-1-json', label: 'JSON/JSONB 与 GIN 索引' },
        { name: 'db-5-2-2-array', label: '数组类型与索引' },
        { name: 'db-5-2-3-fulltext', label: '全文搜索：tsvector/tsquery' },
        { name: 'db-5-2-4-partition', label: '声明式分区' },
        { name: 'db-5-2-5-fdw', label: 'FDW 外部数据包装器' },
      ]},
      { name: 'pg-ha', label: 'PG 高可用', topics: [
        { name: 'db-5-3-1-streaming', label: '流复制' },
        { name: 'db-5-3-2-logical', label: '逻辑复制与解码' },
        { name: 'db-5-3-3-patroni', label: 'Patroni/etcd 故障切换' },
        { name: 'db-5-3-4-citus', label: 'Citus 分布式扩展' },
      ]},
    ]
  },
  {
    id: 6, icon: '🔴', title: 'Redis 深入', period: '2-3 周',
    desc: '从底层数据结构实现到集群运维，从缓存策略到分布式锁方案，全面掌握 Redis。',
    color: 'bg-red-500',
    modules: [
      { name: 'redis-structs', label: '数据结构实现', topics: [
        { name: 'db-6-1-1-sds', label: 'SDS 动态字符串' },
        { name: 'db-6-1-2-ziplist', label: 'ziplist/listpack/quicklist' },
        { name: 'db-6-1-3-dict', label: 'dict 哈希表与渐进 rehash' },
        { name: 'db-6-1-4-skiplist', label: 'zskiplist 跳表实现' },
      ]},
      { name: 'redis-core', label: '核心机制', topics: [
        { name: 'db-6-2-1-io-model', label: '单线程 IO 多路复用' },
        { name: 'db-6-2-2-persistence', label: 'RDB vs AOF vs 混合持久化' },
        { name: 'db-6-2-3-expire', label: '过期策略与 LRU/LFU' },
        { name: 'db-6-2-4-pubsub', label: 'Pub/Sub/Stream 消息队列' },
      ]},
      { name: 'redis-cluster', label: '集群与高可用', topics: [
        { name: 'db-6-3-1-sentinel', label: 'Sentinel 哨兵' },
        { name: 'db-6-3-2-cluster', label: 'Cluster：hash slot/重定向' },
        { name: 'db-6-3-3-scale', label: '水平扩展代理方案' },
      ]},
      { name: 'redis-patterns', label: '缓存模式实战', topics: [
        { name: 'db-6-4-1-cache-aside', label: 'Cache Aside：读穿/写穿/写回' },
        { name: 'db-6-4-2-consistency', label: '缓存一致性' },
        { name: 'db-6-4-3-hotspot', label: '热点 Key 与多级缓存' },
        { name: 'db-6-4-4-bigkey', label: 'Big Key 检测与拆分' },
        { name: 'db-6-4-5-bloom', label: '布隆过滤器防穿透' },
      ]},
    ]
  },
  {
    id: 7, icon: '🍃', title: 'MongoDB 实战', period: '1-2 周',
    desc: '理解文档数据库的设计哲学，掌握聚合管道、副本集和分片集群。',
    color: 'bg-green-500',
    modules: [
      { name: 'mongo-basics', label: '核心概念', topics: [
        { name: 'db-7-1-1-document', label: '文档模型 vs 关系模型' },
        { name: 'db-7-1-2-bson', label: 'BSON 与 ObjectId' },
        { name: 'db-7-1-3-crud', label: 'CRUD 操作' },
      ]},
      { name: 'mongo-query', label: '查询与聚合', topics: [
        { name: 'db-7-2-1-query-ops', label: '查询操作符' },
        { name: 'db-7-2-2-pipeline', label: '聚合管道：$match/$group/$lookup' },
        { name: 'db-7-2-3-unwind', label: '$unwind/$bucket/$facet' },
        { name: 'db-7-2-4-index-mongo', label: 'MongoDB 索引' },
      ]},
      { name: 'mongo-replica', label: '副本集与分片', topics: [
        { name: 'db-7-3-1-replica-set', label: '副本集选举与 oplog' },
        { name: 'db-7-3-2-sharding', label: '分片：shard key 选择' },
        { name: 'db-7-3-3-transactions', label: '多文档事务' },
      ]},
    ]
  },
  {
    id: 8, icon: '🌍', title: '分布式数据库与 NewSQL', period: '2-3 周',
    desc: '当单机扛不住时——学习 TiDB、CockroachDB 等分布式数据库的架构与原理。',
    color: 'bg-pink-500',
    modules: [
      { name: 'tidb', label: 'TiDB', topics: [
        { name: 'db-8-1-1-arch', label: 'TiDB/TiKV/PD 三层架构' },
        { name: 'db-8-1-2-raft', label: 'TiKV Raft/Region 分裂' },
        { name: 'db-8-1-3-sql-layer', label: 'SQL 层：优化器/协处理器' },
      ]},
      { name: 'crdb', label: 'CockroachDB', topics: [
        { name: 'db-8-2-1-arch', label: 'Range/Leaseholder/Follower Read' },
        { name: 'db-8-2-2-serializable', label: '可串行化与 HLC 时钟' },
      ]},
      { name: 'sharding', label: '分库分表中间件', topics: [
        { name: 'db-8-3-1-vitess', label: 'Vitess：VTgate/Vttablet' },
        { name: 'db-8-3-2-shardingsphere', label: 'ShardingSphere' },
      ]},
      { name: 'olap', label: 'OLAP 引擎', topics: [
        { name: 'db-8-4-1-arch', label: 'ClickHouse MergeTree/向量化' },
        { name: 'db-8-4-2-datalake', label: '数据湖：Iceberg/Hudi/Delta' },
      ]},
    ]
  },
  {
    id: 9, icon: '📐', title: '数据工程与治理', period: '2-3 周',
    desc: '学好数据建模、迁移策略和安全实践，成为靠谱的数据库工程师。',
    color: 'bg-cyan-500',
    modules: [
      { name: 'modeling', label: '数据建模', topics: [
        { name: 'db-9-1-1-er', label: 'ER 建模' },
        { name: 'db-9-1-2-dimensional', label: '维度建模：星型/雪花' },
        { name: 'db-9-1-3-scd', label: '缓慢变化维(SCD)' },
        { name: 'db-9-1-4-nosql-design', label: 'NoSQL 建模方法' },
      ]},
      { name: 'migration', label: '迁移与版本控制', topics: [
        { name: 'db-9-2-1-golang-migrate', label: 'golang-migrate/flyway' },
        { name: 'db-9-2-2-zero-downtime', label: '零停机迁移：gh-ost/pt-osc' },
        { name: 'db-9-2-3-rollback', label: '回滚策略' },
      ]},
      { name: 'security', label: '数据库安全', topics: [
        { name: 'db-9-3-1-sql-injection', label: 'SQL 注入防御' },
        { name: 'db-9-3-2-auth', label: 'RBAC/RLS 行级安全' },
        { name: 'db-9-3-3-encrypt', label: '传输加密(TLS)/静态加密(TDE)' },
        { name: 'db-9-3-4-audit', label: '审计日志与合规' },
      ]},
      { name: 'benchmark', label: '压测与容量规划', topics: [
        { name: 'db-9-4-1-sysbench', label: 'sysbench/pgbench' },
        { name: 'db-9-4-2-capacity', label: '容量估算' },
        { name: 'db-9-4-3-stress', label: '全链路压测' },
      ]},
    ]
  },
]
</script>
