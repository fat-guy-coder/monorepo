<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔄 一致性哈希（Consistent Hashing）</h1>
          <p class="text-sm text-slate-500 mt-1">把节点和 key 都映射到环上——加一台机器只迁移一小段 key</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-3-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：哈希环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一致性哈希把整个哈希空间 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[0, 2³²)</code> 首尾相连围成一个<strong>环</strong>。
          节点（服务器）和 key 都用同一个哈希函数映射到环上，<strong>key 沿顺时针方向找到的第一个节点</strong>就是它的归属。
          节点增删时，只有被影响的那一段弧上的 key 需要迁移。
        </p>

        <!-- 结构图：哈希环 -->
        <figure class="mb-6">
          <svg viewBox="0 0 640 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ch-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>

            <!-- 环 -->
            <circle cx="170" cy="160" r="110" fill="none" stroke="#cbd5e1" stroke-width="2" />
            <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">哈希空间 0 ~ 2³²（首尾相连）</text>

            <!-- 节点 A(0°) B(120°) C(240°)，用 rotate 定位 -->
            <g transform="rotate(0 170 160)">
              <circle cx="170" cy="50" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="170" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            </g>
            <g transform="rotate(120 170 160)">
              <circle cx="170" cy="50" r="16" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="170" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">B</text>
            </g>
            <g transform="rotate(240 170 160)">
              <circle cx="170" cy="50" r="16" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="170" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            </g>

            <!-- keys（白色小圆点，描边为归属节点颜色） -->
            <g transform="rotate(30 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#4ade80" stroke-width="2" />
            </g>
            <g transform="rotate(70 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#4ade80" stroke-width="2" />
            </g>
            <g transform="rotate(200 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#f59e0b" stroke-width="2" />
            </g>
            <g transform="rotate(310 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#06b6d4" stroke-width="2" />
            </g>

            <!-- 顺时针查找箭头：key(30°) → 节点 B(120°) -->
            <path d="M 217.5 77.7 A 95 95 0 0 1 252.3 207.5" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ch-arr)" />
            <text x="268" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#d97706">顺时针</text>
            <text x="268" y="156" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#d97706">找到 B</text>

            <!-- 图例 -->
            <g transform="translate(380 40)">
              <rect x="0" y="0" width="240" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
              <circle cx="20" cy="24" r="8" fill="#06b6d4" /><text x="36" y="28" font-size="11" font-family="monospace" fill="#64748b">节点（服务器）</text>
              <circle cx="20" cy="50" r="5" fill="#ffffff" stroke="#4ade80" stroke-width="2" /><text x="36" y="54" font-size="11" font-family="monospace" fill="#64748b">key（数据）</text>
              <line x1="8" y1="78" x2="36" y2="78" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" /><text x="44" y="82" font-size="11" font-family="monospace" fill="#64748b">顺时针归属查找</text>
              <text x="12" y="108" font-size="11" font-family="monospace" fill="#0891b2">key 落到顺时针第一个节点</text>
            </g>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：哈希环 —— 节点 A/B/C 与 key 都映射到环上，key 顺时针找第一个节点</figcaption>
        </figure>

        <!-- 操作示意图：取模哈希缺陷 vs 一致性哈希 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作对比：加节点时，取模哈希 vs 一致性哈希的 key 迁移</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">普通取模哈希：3 → 4 节点，3/6 key 迁移（实际约 75%）</p>
            <svg viewBox="0 0 340 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="18" font-size="10" font-family="monospace" fill="#64748b">扩容前 hash = key % 3</text>
              <g font-family="monospace" font-size="10">
                <rect x="10" y="26" width="100" height="36" rx="5" fill="#06b6d4" /><text x="60" y="48" text-anchor="middle" fill="#fff" font-weight="bold">k0→A  k3→A</text>
                <rect x="120" y="26" width="100" height="36" rx="5" fill="#06b6d4" /><text x="170" y="48" text-anchor="middle" fill="#fff" font-weight="bold">k1→B  k4→B</text>
                <rect x="230" y="26" width="100" height="36" rx="5" fill="#06b6d4" /><text x="280" y="48" text-anchor="middle" fill="#fff" font-weight="bold">k2→C  k5→C</text>
              </g>
              <text x="10" y="90" font-size="10" font-family="monospace" fill="#64748b">扩容后 hash = key % 4</text>
              <g font-family="monospace" font-size="10">
                <rect x="10" y="98" width="100" height="36" rx="5" fill="#06b6d4" /><text x="60" y="120" text-anchor="middle" fill="#fff" font-weight="bold">k0→A  k4→A</text>
                <rect x="120" y="98" width="100" height="36" rx="5" fill="#06b6d4" /><text x="170" y="120" text-anchor="middle" fill="#fff" font-weight="bold">k1→B  k5→B</text>
                <rect x="230" y="98" width="100" height="36" rx="5" fill="#f59e0b" /><text x="280" y="120" text-anchor="middle" fill="#fff" font-weight="bold">k2→C  k3→D</text>
              </g>
              <text x="10" y="144" font-size="10" font-family="monospace" fill="#d97706">k3/k4/k5 全部换节点 → 迁移 3/6</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">取模结果随节点数整体变化，绝大多数 key 换节点</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">一致性哈希：新增节点 D，只迁移一小段弧</p>
            <svg viewBox="0 0 340 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="80" r="62" fill="none" stroke="#cbd5e1" stroke-width="1.5" />
              <g>
                <circle cx="80" cy="18" r="12" fill="#06b6d4" /><text x="80" y="18" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">A</text>
                <circle cx="134" cy="111" r="12" fill="#4ade80" /><text x="134" y="111" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">B</text>
                <circle cx="26" cy="111" r="12" fill="#f59e0b" /><text x="26" y="111" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">C</text>
                <circle cx="80" cy="142" r="12" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="80" y="142" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">D</text>
                <circle cx="70" cy="28" r="5" fill="#fff" stroke="#06b6d4" stroke-width="2" />
                <circle cx="100" cy="30" r="5" fill="#fff" stroke="#06b6d4" stroke-width="2" />
                <circle cx="126" cy="80" r="5" fill="#ef4444" stroke="#ef4444" stroke-width="2" />
                <circle cx="124" cy="96" r="5" fill="#ef4444" stroke="#ef4444" stroke-width="2" />
              </g>
              <text x="200" y="40" font-size="10" font-family="monospace" fill="#64748b">新增节点 D 落在</text>
              <text x="200" y="54" font-size="10" font-family="monospace" fill="#64748b">A↔B 之间</text>
              <text x="200" y="78" font-size="10" font-family="monospace" fill="#d97706">只有原属 B 的</text>
              <text x="200" y="92" font-size="10" font-family="monospace" fill="#d97706">2 个 key 迁到 D</text>
              <text x="200" y="116" font-size="10" font-family="monospace" fill="#0891b2">其余 key 不动 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">新增节点只影响环上一小段弧（D 落点附近），迁移量 1/n</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          普通取模哈希的缺陷 —— 节点一变，天翻地覆
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          分布式缓存最常见的做法是：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">hash(key) % n</code>，
          把 key 分配到 n 台服务器。但问题在于——<strong>n 是分母</strong>。一旦加机器或某台机器宕机，n 变了，
          几乎所有 key 的取模结果都会变，数据需要在集群里大规模搬家。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">node = hash(key) % n</p>
          <p class="text-xs text-cyan-600 text-center">分母 n 变化 → 取模结果整体错位 → 大量 key 迁移</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="modHashCode" title="mod_hash.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 缓存雪崩：</strong>如果缓存层 3 台扩到 4 台，约 75% 的 key 会瞬间失效，
          请求像洪水一样砸向后端数据库，极可能把 DB 打挂。这就是分布式系统中臭名昭著的「缓存雪崩」诱因之一。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          取模哈希就像用 <code>index = hash(key) % columns</code> 把卡片分到固定列里——一旦列数从 3 变 4，
          所有卡片都被重新洗牌。而一致性哈希更像一个<strong>环形传送带</strong>：卡片和格子都贴在带上，
          只加一个格子时，只有它落点附近几张卡片会挪过去，其余原地不动。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          一致性哈希环 —— 把 key 和节点都摆到同一个圈上
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一致性哈希的思路是：<strong>不再对节点数取模</strong>，而是把 key 和节点都哈希到一个固定的大空间
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[0, 2³²)</code>（约 43 亿个位置），
          再把这个空间<strong>首尾相连卷成一个环</strong>。节点按其哈希值落在环上，key 也按其哈希值落在环上。
        </p>
        <div class="mb-4"><Code language="ts" :code="consistentHashCode" title="consistent_hash_ring.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>核心思想拆解：</strong></p>
          <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
            <li>选一个分布均匀的哈希函数，把节点和 key 都映射到 <code>0 ~ 2³²-1</code></li>
            <li>把数轴首尾相接，卷成一个环（0 和 2³²-1 相邻）</li>
            <li>每个节点占环上一个位置，key 也一样</li>
            <li>key 的归属 = <strong>顺时针走，遇到的第一个节点</strong></li>
          </ol>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么用 2³² 这么大的空间？</strong>空间越大，节点和 key 落点越稀疏，
          越不容易撞到同一个位置，分布也越均匀。用 32 位无符号整数（或 MD5/SHA 的 128/160 位）就是为了让哈希值充分摊开。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          顺时针查找 —— key 如何找到它的节点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把环上的节点按哈希值<strong>升序排列</strong>，查询某个 key 时：
          <strong>找到第一个哈希值 &gt;= key 哈希值的节点</strong>；如果 key 的哈希值比所有节点都大（越过了环尾），就<strong>绕回环头</strong>，归属第一个节点。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          查找可以用<strong>有序数组二分</strong>（O(log n)），生产环境用<strong>红黑树 / 跳表 / B+ 树</strong>维护有序节点，
          保证增删节点和查找都是 O(log n)。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">普通取模哈希</th><th class="px-4 py-2 border border-slate-200 font-semibold">一致性哈希</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">查找 key 归属</td><td class="px-4 py-2 border font-mono">hash % n → O(1)</td><td class="px-4 py-2 border font-mono">二分/树查找 → O(log n)</td></tr>
              <tr><td class="px-4 py-2 border">新增节点</td><td class="px-4 py-2 border font-mono text-red-600">约 (n-1)/n key 迁移</td><td class="px-4 py-2 border font-mono text-emerald-600">约 1/n key 迁移</td></tr>
              <tr><td class="px-4 py-2 border">删除节点</td><td class="px-4 py-2 border font-mono text-red-600">同样大规模迁移</td><td class="px-4 py-2 border font-mono text-emerald-600">只迁移该节点上的 key</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          顺时针查找就像在<strong>圆形色环</strong>上找颜色——给定一个角度，往右转到最近的那个「锚点色」。
          又像<strong>时间轮调度器</strong>（Timer Wheel）：任务按到期时间落在轮盘上，指针顺时针扫，扫到谁处理谁。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          迁移成本分析 —— 为什么加机器不慌了
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          假设环上均匀分布 n 个节点。新增第 n+1 个节点时，它落在任意两段弧之间的概率相等，
          只会「接走」它落点所在那段弧上的 key。平均而言，那段弧约占整个环的 <strong>1/n</strong>，
          所以只需迁移 <strong>1/n</strong> 的 key。n 越大，单次迁移越少。
        </p>
        <div class="bg-linear-to-r from-emerald-50 to-cyan-50 rounded-xl p-5 border border-emerald-200 mb-4">
          <p class="text-lg font-bold text-emerald-800 mb-2 text-center font-mono">迁移量 ≈ 1/n（一致性哈希） vs (n-1)/n（取模）</p>
          <p class="text-xs text-emerald-600 text-center">节点越多，一致性哈希的优势越明显</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="migrationCode" title="migration_cost.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>节点频繁上下线（弹性扩缩容、故障转移）的场景，
          一致性哈希把每次变更的成本从「全量搬迁」降到「局部搬迁」，是负载均衡和分布式缓存的标配方案。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          虚拟节点 —— 解决节点少时的分布不均
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一致性哈希有个隐藏问题：<strong>节点少时，节点在环上的落点可能挤在一起</strong>，导致某些节点分到的弧特别长、
          另一些特别短（数据倾斜，又称「哈希环热点」）。一台机器扛 80% 流量，其余机器闲着。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          解法是<strong>虚拟节点（Virtual Node）</strong>：给每个物理节点生成大量「分身」，
          比如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">node-A#0、node-A#1、node-A#2 ...</code>，
          每个分身独立哈希到环上不同位置。物理节点越强，分到的虚拟节点越多（可按权重分配）。
          这样所有物理节点在环上都被「摊开」，负载趋于均衡。
        </p>
        <div class="mb-4"><Code language="ts" :code="virtualNodeCode" title="virtual_nodes.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">虚拟节点数</th><th class="px-4 py-2 border border-slate-200 font-semibold">负载均衡度</th><th class="px-4 py-2 border border-slate-200 font-semibold">内存开销</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">少（如 10）</td><td class="px-4 py-2 border">标准差大，仍可能倾斜</td><td class="px-4 py-2 border">小</td></tr>
              <tr><td class="px-4 py-2 border font-mono">中等（如 100~150）</td><td class="px-4 py-2 border text-emerald-600">已经相当均匀</td><td class="px-4 py-2 border">适中（常用）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">多（如 1000+）</td><td class="px-4 py-2 border text-emerald-600">接近理想均匀</td><td class="px-4 py-2 border">大（需权衡）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          实战场景与常见陷阱
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一致性哈希的典型落地场景：<strong>Memcached / Redis Cluster 的分布式缓存</strong>、
          <strong>Nginx 负载均衡</strong>、<strong>CDN 边缘节点分发</strong>、<strong>分布式数据库分片</strong>（如 Cassandra、DynamoDB 的 ring）。
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缓存层扩缩容</strong>——加机器只失效一小部分缓存，避免雪崩</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>有状态服务分片</strong>——用户/订单按 id 路由到固定分片，扩容时局部迁移</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负载均衡</strong>——会话粘性（sticky session）场景下，节点下线只影响该节点的会话</span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          1. <strong>忘了虚拟节点</strong>——节点少时数据严重倾斜，一致性哈希直接失去意义<br/>
          2. <strong>哈希函数分布不均</strong>——用差的哈希函数，key 挤在某段弧上，节点再均匀也白搭<br/>
          3. <strong>节点删除时的数据丢失</strong>——一致性哈希只管「路由」，迁移数据仍需你手动做（先把数据搬到顺时针下一个节点，再下线）</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>用 <code>MD5/SHA1/CRC32</code> 等成熟哈希，每个物理节点配 100~150 个虚拟节点，
          节点列表用跳表/红黑树维护，增删查找 O(log n)，就能得到一套稳健的分布式路由层。</p>
        </aside>
      </section>

      <!-- 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：哈希环上的 key 定位与节点增删
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          环上彩色圆弧代表每个节点负责的区间。点「定位」看 key 顺时针落到哪个节点；点「加/删节点」观察只有局部 key 迁移。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点: {{ nodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔑 key: {{ keys.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <!-- 控制按钮 -->
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button v-for="btn in ctrlBtns" :key="btn.label" @mousedown="btn.action" :disabled="busy"
            :class="[btn.cls, 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                     'active:scale-95 active:shadow-inner',
                     'disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">{{ btn.label }}</button>
        </div>
        <!-- Canvas -->
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-arc v-for="a in arcs" :key="'a'+a.id" :config="{x:cx, y:cy, innerRadius:RING_R-7, outerRadius:RING_R+7, angle:a.sweep, rotation:a.rotation, fill:a.color, opacity:0.16}" />
              <v-circle :config="{x:cx, y:cy, radius:RING_R, stroke:'#cbd5e1', strokeWidth:2, fill:'#ffffff', opacity:0.01}" />
              <v-circle v-for="k in keys" :key="'k'+k.id" :config="keyCfg(k)" />
              <v-circle v-for="n in nodes" :key="'n'+n.id" :config="nodeCfg(n)" />
              <v-text v-for="n in nodes" :key="'t'+n.id" :config="nodeText(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>取模哈希的致命伤</strong>：节点数一改，约 (n-1)/n 的 key 全部迁移，引发缓存雪崩</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一致性哈希环</strong>：把节点和 key 哈希到 [0, 2³²) 再首尾相连成环</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>顺时针查找</strong>：key 归属第一个哈希值 &gt;= 它的节点，越过环尾绕回环头</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>迁移量从 O(全量) 降到约 1/n</strong>——节点增删只影响环上一小段</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>虚拟节点</strong>让物理节点在环上摊开，解决节点少时的数据倾斜</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>典型应用</strong>：分布式缓存、负载均衡、数据库分片</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-2-dedup" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：去重与分组</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-4-bloom" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：布隆过滤器 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 一致性哈希环动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(360), W = ref(700)
const PALETTE = ['#06b6d4', '#4ade80', '#f59e0b', '#a855f7', '#ec4899', '#3b82f6']
const RING_R = computed(() => Math.max(60, Math.min(W.value, H.value) / 2 - 40))
const cx = computed(() => W.value / 2)
const cy = computed(() => H.value / 2)

interface RingNode { id:number; name:string; angle:number; color:string; x:number; y:number; s:number; glow:boolean }
interface RingKey { id:number; angle:number; label:string; x:number; y:number; s:number; hl:boolean; owner:number; ownerColor:string }

const nodes = reactive<RingNode[]>([])
const keys = reactive<RingKey[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const migrated = ref<number[]>([])
let cursor = 0
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

function pos(angle:number, R:number, cxx:number, cyy:number) {
  const rad = (angle - 90) * Math.PI / 180
  return { x: cxx + R * Math.cos(rad), y: cyy + R * Math.sin(rad) }
}
function findOwner(angle:number): RingNode {
  const s = [...nodes].sort((a,b) => a.angle - b.angle)
  for (const n of s) if (n.angle >= angle) return n
  return s[0]
}
const sortedNodes = computed(() => [...nodes].sort((a,b) => a.angle - b.angle))
const arcs = computed(() => {
  const s = sortedNodes.value, n = s.length
  return s.map((nd, i) => {
    const next = s[(i+1) % n]
    const sweep = n === 1 ? 360 : (next.angle - nd.angle + 360) % 360
    return { id: nd.id, rotation: nd.angle, sweep, color: nd.color }
  })
})

function layout() {
  const R = RING_R.value, cxx = cx.value, cyy = cy.value
  nodes.forEach(n => { const p = pos(n.angle, R, cxx, cyy); n.x = p.x; n.y = p.y })
  keys.forEach(k => { const p = pos(k.angle, R, cxx, cyy); k.x = p.x; k.y = p.y })
}
function updateOwners(): number {
  let moved = 0; migrated.value = []
  for (const k of keys) {
    const o = findOwner(k.angle)
    if (k.owner !== o.id) { moved++; migrated.value.push(k.id) }
    k.owner = o.id; k.ownerColor = o.color
  }
  return moved
}
function highlightMoved() { keys.forEach(k => { if (migrated.value.includes(k.id)) { k.hl = true; k.s = 1.5 } }) }
function clearHighlight() { keys.forEach(k => { k.hl = false; k.s = 1 }) }

function nodeCfg(n:any) {
  return { x:n.x, y:n.y, radius:15 * (n.s ?? 1), fill:n.color, stroke:'#ffffff', strokeWidth:2,
    shadowColor:'rgba(0,0,0,.15)', shadowBlur: n.glow ? 14 : 4, shadowOffsetY:2 }
}
function nodeText(n:any) {
  return { x:n.x, y:n.y, text:n.name, fontSize:11, fontFamily:'monospace', fontStyle:'bold', fill:'#ffffff', align:'center', verticalAlign:'middle' }
}
function keyCfg(k:any) {
  return { x:k.x, y:k.y, radius:6 * (k.s ?? 1), fill: k.hl ? C.orange : '#ffffff', stroke: k.ownerColor, strokeWidth:2 }
}

function init() {
  nodes.length = 0; keys.length = 0; migrated.value = []; cursor = 0
  nodes.push({ id:1, name:'A', angle:0, color:PALETTE[0], x:0, y:0, s:1, glow:false })
  nodes.push({ id:2, name:'B', angle:120, color:PALETTE[1], x:0, y:0, s:1, glow:false })
  nodes.push({ id:3, name:'C', angle:240, color:PALETTE[2], x:0, y:0, s:1, glow:false })
  const demo = [30, 60, 150, 210, 300, 345]
  demo.forEach((a, i) => keys.push({ id:i+1, angle:a, label:'k'+(i+1), x:0, y:0, s:1, hl:false, owner:0, ownerColor:C.cyan }))
  keys.forEach(k => { const o = findOwner(k.angle); k.owner = o.id; k.ownerColor = o.color })
  layout()
}

async function act(msg:string, fn:() => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doLocate() {
  act('定位 key  O(log n)', async () => {
    const k = keys[cursor % keys.length]
    k.hl = true; k.s = 1.5
    const owner = findOwner(k.angle)
    owner.glow = true; owner.s = 1.35
    status.value = `${k.label} (hash=${k.angle}°) → 顺时针 → 节点 ${owner.name}`
    await d(900)
    k.hl = false; k.s = 1; owner.glow = false; owner.s = 1
    cursor++
  })
}
function doAddNode() {
  act('新增节点 迁移约 1/n 个 key', async () => {
    const angle = Math.floor(Math.random() * 360)
    const name = 'N' + (nodes.length + 1)
    const nb: RingNode = { id:nid.value++, name, angle, color:PALETTE[nodes.length % PALETTE.length], x:0, y:0, s:0, glow:false }
    nodes.push(nb); layout()
    await d(80); nb.s = 1; layout()
    const moved = updateOwners(); highlightMoved()
    status.value = `新增节点 ${name}：${moved} 个 key 迁移`
    await d(1000); clearHighlight()
  })
}
function doRemoveNode() {
  act('删除节点 迁移其 key', async () => {
    if (nodes.length <= 1) return
    const target = nodes[nodes.length - 1]
    target.color = C.red; await d(400)
    target.s = 0; layout(); await d(300)
    nodes.splice(nodes.length - 1, 1); layout()
    const moved = updateOwners(); highlightMoved()
    status.value = `删除节点：${moved} 个 key 迁移到顺时针下一个节点`
    await d(1000); clearHighlight()
  })
}
function doReset() { init(); status.value = '' }

const ctrlBtns = computed(() => [
  { label:'🎯 定位 key', action:doLocate, cls:'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm' },
  { label:'➕ 新增节点', action:doAddNode, cls:'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm' },
  { label:'➖ 删除节点', action:doRemoveNode, cls:'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm' },
  { label:'↺ Reset', action:doReset, cls:'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm' },
])

let ro: ResizeObserver|null = null
onMounted(() => {
  init()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "取模哈希的缺陷" },
  { id: "sec-2", name: "哈希环" },
  { id: "sec-3", name: "顺时针查找" },
  { id: "sec-4", name: "迁移成本" },
  { id: "sec-5", name: "虚拟节点" },
  { id: "sec-6", name: "场景与陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const modHashCode = `// ─── 普通取模哈希：node = hash(key) % n ───
// 问题：n 是分母，节点数一变，几乎所有 key 重新映射

interface Node { name: string }

function hash(key: string): number {
    let h = 0
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
    return h
}

function route(nodes: Node[], key: string): string {
    return nodes[hash(key) % nodes.length].name
}

const keys = ['user:1', 'user:2', 'user:3', 'user:4', 'user:5', 'user:6']

// 3 台节点
const n3: Node[] = [{ name:'A' }, { name:'B' }, { name:'C' }]
const before = keys.map(k => \`\${k} -> \${route(n3, k)}\`)

// 扩容到 4 台
const n4: Node[] = [{ name:'A' }, { name:'B' }, { name:'C' }, { name:'D' }]
const after = keys.map(k => \`\${k} -> \${route(n4, k)}\`)

console.log('扩容前:', before.join('  '))
console.log('扩容后:', after.join('  '))

// 迁移比例理论值 = (n-1)/n
// n=3 → 4 时：约 75% 的 key 换了节点
// 后果：缓存大面积失效 → 请求直冲数据库 → 缓存雪崩`

const consistentHashCode = `// ─── 一致性哈希环 ───
// hash 空间 [0, 2^32)，首尾相连成环
// 节点和 key 都 hash 到环上，key 顺时针找第一个节点

const RING_SIZE = 2 ** 32

function hashRing(key: string): number {
    let h = 0
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
    return h  // 32 位无符号整数，落在 [0, 2^32)
}

class ConsistentHash {
    // 有序节点列表（教学用数组，生产用红黑树/跳表 → O(log n)）
    private ring: { hash: number; node: string }[] = []

    addNode(node: string): void {
        this.ring.push({ hash: hashRing(node), node })
        this.ring.sort((a, b) => a.hash - b.hash)  // 按环上位置升序
    }

    // key 顺时针找第一个 hash >= keyHash 的节点
    getNode(key: string): string {
        const h = hashRing(key)
        for (const e of this.ring) {
            if (e.hash >= h) return e.node
        }
        return this.ring[0].node  // 越过环尾，绕回环头
    }
}

const ch = new ConsistentHash()
ch.addNode('node-A')
ch.addNode('node-B')
ch.addNode('node-C')

console.log(ch.getNode('user:1'))
// 新增节点只影响环上一小段弧上的 key，其余 key 的归属不变`

const migrationCode = `// ─── 迁移成本对比（模拟）───

function estimateMigration(totalKeys: number, totalNodes: number, addedNodes: number) {
    // 取模哈希：新增节点后，几乎每个 key 都要重新取模
    const modRatio = addedNodes / (totalNodes + addedNodes)

    // 一致性哈希：只迁移新节点落点那段弧，约 1/(总节点数)
    const ringRatio = addedNodes / (totalNodes + addedNodes) / totalNodes

    return {
        取模哈希迁移: Math.round(totalKeys * modRatio),
        一致性哈希迁移: Math.round(totalKeys * ringRatio),
    }
}

const result = estimateMigration(1_000_000, 3, 1)
console.log('100 万 key，3 节点 → 加 1 节点：', result)
// 输出（近似）:
// 取模哈希迁移: 250000   （25%，其实整体约 75% 会失效）
// 一致性哈希迁移: 83333   （约 8%，只迁落点附近一段）

// 结论：节点越多，一致性哈希每次迁移的绝对量越小
// 这也是它能支撑「弹性扩缩容」的根本原因`

const virtualNodeCode = `// ─── 虚拟节点：一个物理节点映射多个环上位置 ───

class ConsistentHashWithVNodes {
    private ring: { hash: number; node: string }[] = []
    private readonly vnodeCount = 150  // 每个物理节点 150 个分身

    addNode(node: string): void {
        for (let i = 0; i < this.vnodeCount; i++) {
            // 分身名 node#0、node#1 ... 各自哈希到不同位置
            const h = hashRing(\`\${node}#\${i}\`)
            this.ring.push({ hash: h, node })
        }
        this.ring.sort((a, b) => a.hash - b.hash)
    }

    // 支持按权重分配虚拟节点（强机器多分几个）
    addNodeWeighted(node: string, weight: number): void {
        const count = this.vnodeCount * weight
        for (let i = 0; i < count; i++) {
            this.ring.push({ hash: hashRing(\`\${node}#\${i}\`), node })
        }
        this.ring.sort((a, b) => a.hash - b.hash)
    }

    getNode(key: string): string {
        const h = hashRing(key)
        for (const e of this.ring) if (e.hash >= h) return e.node
        return this.ring[0].node
    }
}

// 虚拟节点让每个物理节点在环上「摊开」
// 节点少时也能得到接近均匀的分布，避免哈希环热点`

// hashRing 复用上一节的实现
function hashRing(key: string): number {
    let h = 0
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
    return h
}
</script>
