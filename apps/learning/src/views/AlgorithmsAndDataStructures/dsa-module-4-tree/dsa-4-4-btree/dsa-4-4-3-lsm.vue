<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗄️ LSM-Tree：写优化存储引擎</h1>
          <p class="text-sm text-slate-500 mt-1">把随机写变成顺序写 —— LevelDB / RocksDB / Cassandra 的底层核心</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-4-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：内存 MemTable + 磁盘 SSTable 分层
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          LSM-Tree（Log-Structured Merge-Tree）不是一棵「常规的树」，而是<strong>按层级组织的存储结构</strong>：
          写入先进入内存的 <strong>MemTable</strong>（有序），攒满后<strong>顺序刷盘</strong>成一个<strong>不可变的 SSTable</strong>；
          磁盘上的 SSTable 按层级堆积，靠 <strong>compaction</strong> 后台合并、去重、保持有序。
          它的核心思想只有一句话——<strong>把随机写变成顺序写</strong>。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 380" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="lsm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">写路径：随机写 → 顺序写；读路径：MemTable → L0 → L1 → L2 逐层查</text>

            <!-- 内存/磁盘 分界线 -->
            <line x1="16" y1="110" x2="704" y2="110" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="6 4" />
            <text x="16" y="104" font-size="10" font-family="monospace" fill="#64748b">▲ 内存（易失）</text>
            <text x="16" y="130" font-size="10" font-family="monospace" fill="#64748b">▼ 磁盘（持久）</text>

            <!-- MemTable -->
            <rect x="210" y="32" width="300" height="56" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="52" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#cffafe">MemTable（内存有序）</text>
            <text x="360" y="72" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3 · 7 · 12</text>
            <text x="520" y="46" text-anchor="start" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">写前先落 WAL 防丢失</text>

            <!-- flush 箭头 -->
            <line x1="360" y1="88" x2="360" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#lsm-arr)" />
            <text x="370" y="112" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">② 刷盘 flush（顺序写）</text>

            <!-- L0 -->
            <rect x="200" y="130" width="320" height="48" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="360" y="154" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">SSTable L0：[3,7,12]（不可变）</text>

            <!-- compaction 箭头 -->
            <line x1="360" y1="178" x2="360" y2="210" stroke="#94a3b8" stroke-width="2" marker-end="url(#lsm-arr)" />
            <text x="370" y="196" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">③ compaction 合并</text>

            <!-- L1 -->
            <rect x="150" y="214" width="420" height="48" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="238" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">SSTable L1：[3,7,12,25,40]（更大、更有序）</text>

            <line x1="360" y1="262" x2="360" y2="294" stroke="#94a3b8" stroke-width="2" marker-end="url(#lsm-arr)" />
            <text x="370" y="280" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">④ 继续合并到更深层</text>

            <!-- L2 -->
            <rect x="110" y="298" width="500" height="48" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4" />
            <text x="360" y="322" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">SSTable L2：[… 更多 …]（层级越深，段越大越少）</text>

            <!-- 读放大 图例 -->
            <text x="16" y="368" font-size="11" font-family="monospace" fill="#f59e0b">读放大：一次查找要查 MemTable + 各层 SSTable，层级越多读越慢</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：LSM-Tree 分层结构 —— 写走「内存→刷盘→合并」，读要「逐层查」，这是它写快读慢的根本原因</figcaption>
        </figure>

        <!-- 操作示意图：compaction 合并 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：compaction —— 把 L0 两个重叠 SSTable 合并去重到 L1</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">合并前：L0 有两个可能重叠的 SSTable</p>
            <svg viewBox="0 0 340 140" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="24" width="120" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="100" y="44" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">[1,3,5]</text>
              <rect x="180" y="24" width="120" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="240" y="44" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">[2,4,8]</text>
              <text x="16" y="100" font-size="11" font-family="monospace" fill="#64748b">两段各自有序，但段间范围重叠</text>
              <text x="16" y="118" font-size="11" font-family="monospace" fill="#64748b">（L0 允许重叠，L1+ 一般不允许）</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">合并后：多路归并去重，落成 L1 一个大段</p>
            <svg viewBox="0 0 340 140" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="60" y="24" width="220" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="170" y="44" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">[1,2,3,4,5,8]</text>
              <text x="16" y="100" font-size="11" font-family="monospace" fill="#16a34a">有序合并 = 多路归并（merge sort 的 merge）</text>
              <text x="16" y="118" font-size="11" font-family="monospace" fill="#16a34a">重复 key 保留最新版本（旧版可删）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">compaction 是 LSM 的「后台家务」：合并排序 + 去重 + 删除过期数据</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 为什么 LSM -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          为什么需要 LSM？—— 随机写 vs 顺序写
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          磁盘/SSD 上，<strong>顺序写</strong>（连续写一大块）比<strong>随机写</strong>（到处跳着写）快 1~2 个数量级。
          B+ 树为了维护有序结构，每次写入都可能要<strong>随机改写</strong>页（定位 + 可能分裂），
          于是出现了<strong>写优化</strong>的思路：<strong>先别急着在磁盘上排好序，把写全部攒成顺序写</strong>，读的代价以后再用后台合并慢慢还。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比项</th><th class="px-4 py-2 border border-slate-200 font-semibold">B+ 树（读优化）</th><th class="px-4 py-2 border border-slate-200 font-semibold">LSM-Tree（写优化）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">写入方式</td><td class="px-4 py-2 border font-mono text-red-600">随机写（定位页 + 分裂）</td><td class="px-4 py-2 border font-mono text-emerald-600">顺序写（批量刷盘）</td></tr>
              <tr><td class="px-4 py-2 border">写性能</td><td class="px-4 py-2 border font-mono text-amber-600">较慢</td><td class="px-4 py-2 border font-mono text-emerald-600">极快</td></tr>
              <tr><td class="px-4 py-2 border">读性能</td><td class="px-4 py-2 border font-mono text-emerald-600">快（单路径）</td><td class="px-4 py-2 border font-mono text-red-600">慢（查多层）</td></tr>
              <tr><td class="px-4 py-2 border">读放大</td><td class="px-4 py-2 border font-mono text-emerald-600">低（约 1 次 IO）</td><td class="px-4 py-2 border font-mono text-red-600">高（多层多段）</td></tr>
              <tr><td class="px-4 py-2 border">空间放大</td><td class="px-4 py-2 border font-mono text-emerald-600">低</td><td class="px-4 py-2 border font-mono text-amber-600">高（旧版本暂存）</td></tr>
              <tr><td class="px-4 py-2 border">代表系统</td><td class="px-4 py-2 border">MySQL InnoDB、PostgreSQL</td><td class="px-4 py-2 border">LevelDB、RocksDB、Cassandra、HBase</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="whyCode" title="why_lsm.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          LSM 就像浏览器的<strong>「写入缓冲 + 批量 flush」</strong>机制。<br/>
          <strong>MemTable</strong> ≈ 内存里的 <code>console.log</code> 缓冲区 / <code>localStorage</code> 前的待提交队列——先攒着；<br/>
          <strong>刷盘 SSTable</strong> ≈ <code>requestIdleCallback</code> 或定时器把缓冲区<strong>一次性批量写入</strong>（顺序写）；<br/>
          <strong>compaction</strong> ≈ <strong>GC 的「标记-整理」</strong>或 <strong>Vite 打包时的 minify/merge</strong>——把零散的中间产物合并成更紧凑的最终产物，顺手删掉没用的旧版本。
          </p>
        </aside>
      </section>

      <!-- 2. MemTable -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          MemTable —— 内存里的有序结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          MemTable 是 LSM 的「第一站」，常驻内存，要求<strong>按键有序</strong>。实现上一般用<strong>跳表</strong>（LevelDB/RocksDB）
          或<strong>红黑树</strong>。这里用一个<strong>有序数组 + 二分插入</strong>做最小可运行版，帮助理解「有序」这个不变式。
        </p>
        <div class="mb-4"><Code language="ts" :code="memtableCode" title="memtable.ts" /></div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">MemTable 只做两件事：有序地存 + 到阈值就整体刷盘</p>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 关键点：</strong>真实实现里 MemTable 满之前还会先写一条 <strong>WAL（Write-Ahead Log）</strong>到磁盘，防止进程崩溃丢数据——WAL 也是<strong>顺序写</strong>，所以不影响写性能。MemTable 是易失的，WAL 才是持久性的来源。</p>
        </aside>
      </section>

      <!-- 3. SSTable -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          SSTable —— 磁盘上的不可变有序段
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          MemTable 刷盘后冻结成一个 <strong>SSTable（Sorted String Table）</strong>：<strong>不可变</strong>、<strong>按键有序</strong>。
          因为不可变，它可以放心用<strong>二分查找</strong>和<strong>布隆过滤器</strong>加速读；因为有序，多个 SSTable 可以用<strong>多路归并</strong>高效合并。
        </p>
        <div class="mb-4"><Code language="ts" :code="sstableCode" title="sstable.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么「不可变」是优点：</strong>一旦落盘就不再修改，意味着<strong>没有随机写、没有锁、可以并发读</strong>。旧数据不会消失，只是被「新版本」盖过——这也是 LSM 天然支持<strong>MVCC/快照读</strong>的原因。</p>
        </aside>
      </section>

      <!-- 4. Compaction -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          Compaction —— 分层合并，把读的成本还掉
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          如果只写不合并，SSTable 会无限变多，读要查越来越多的段。Compaction 在后台把<strong>同层的多个段归并成一个更大的段</strong>，
          去重（保留最新版本）、删除过期数据（tombstone）。层级越深，段越大、数量越少，读放大被控制在可接受范围。
        </p>
        <div class="mb-4"><Code language="ts" :code="compactionCode" title="compaction.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Compaction 就像前端构建的 <strong>Tree Shaking + 压缩打包</strong>：源码里散落的模块（SSTable）经过打包器归并、去重、删掉未引用代码（旧版本），产出一个更紧凑的 bundle（更大的 SSTable）。<br/>
          也像 <strong>数据库的 VACUUM / 日志压缩</strong>——把「append-only」攒下来的垃圾在后台统一回收。
          </p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          读放大、写放大 与 常见错误
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          理解 LSM 有两个绕不开的指标：<strong>读放大</strong>（一次读要查多个段）和<strong>写放大</strong>（一次写入被 compaction 反复搬运多次）。
          它们是一对「跷跷板」——层级越少读越快但写放大越高，层级越多写放大低但读放大高。
        </p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：以为 LSM 是「树」</strong><br/>
          LSM-Tree 名字带 Tree，但它不是 BST/B 树那样的「指针树」。它是<strong>「内存有序结构 + 磁盘有序段的层级」</strong>的组合。
          拿「树高、旋转、叶子同层」这些 B 树概念套 LSM 会完全对不上。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：忘记 compaction，读越来越慢</strong><br/>
          只做「写内存 + 刷盘」，不做后台合并，SSTable 数量会线性增长，读放大到不可用。compaction 不是可选优化，是<strong>设计的另一半</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 3：用 LSM 做「频繁点查」的主存储</strong><br/>
          LSM 强在<strong>高写入吞吐</strong>（日志、时序、消息），弱在<strong>点查/范围查</strong>。需要大量随机读的场景（如在线交易）应优先选 B+ 树。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          ① 写多读少 → LSM（日志/监控/时序/消息队列）；读多写少 → B+ 树。<br/>
          ② 读优化靠 <strong>布隆过滤器</strong>（快速排除「不存在的 key」，省去无谓的多层查找）。<br/>
          ③ compaction 策略（size-tiered / leveled）是 LSM 调优的核心，决定了写放大与读放大的平衡点。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：写入 MemTable → 刷盘 SSTable → compaction 合并
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「下一步」走完 LSM 的写路径：内存有序写入 → 刷盘成 L0 的 SSTable → 两个 SSTable compaction 合并到 L1。青=MemTable，绿=L0，蓝=L1。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 内存键数: {{ memTable.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📀 L0 段数: {{ l0.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🗜️ L1 段数: {{ l1.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '点击「下一步」开始' }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doNext" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">▶ 下一步</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 区域框 -->
              <v-rect :config="memBox()" />
              <v-rect :config="l0Box()" />
              <v-rect :config="l1Box()" />
              <!-- 标签 -->
              <v-text :config="memLabel()" />
              <v-text :config="l0Label()" />
              <v-text :config="l1Label()" />
              <v-text :config="flushLabel()" />
              <v-text :config="compLabel()" />
              <!-- 箭头 -->
              <v-arrow :config="flushArrow()" />
              <v-arrow :config="compArrow()" />
              <!-- 格子 -->
              <v-rect v-for="c in cells" :key="'r'+c.id" :config="cellRect(c)" />
              <v-text v-for="c in cells" :key="'t'+c.id" :config="cellText(c)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心思想</strong>：把随机写变成顺序写——先写内存，批量刷盘</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三层结构</strong>：MemTable（内存有序）→ SSTable（磁盘不可变有序段）→ compaction（分层合并）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>写快读慢</strong>：写是顺序写（快），读要查多层多段（读放大）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>vs B+ 树</strong>：B+ 树读快写慢（随机写），LSM 写快读慢（顺序写）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>读放大/写放大</strong>是跷跷板，compaction 策略决定二者平衡</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用</strong>：LevelDB / RocksDB / Cassandra / HBase，适合日志、时序、消息等高写入场景</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-4-btree/dsa-4-4-2-b-plus" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：B+ 树</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-1-trie" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：字典树 Trie →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "为什么 LSM" },
  { id: "sec-2", name: "MemTable" },
  { id: "sec-3", name: "SSTable" },
  { id: "sec-4", name: "Compaction" },
  { id: "sec-5", name: "读/写放大与错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 LSM 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#0f172a', muted:'#64748b', ghost:'#e2e8f0', blue:'#60a5fa' }
const W = ref(700), H = ref(360)
const CW = 46, CH = 40, CGAP = 8, CELL_X0 = 28
const MEM_Y = 40, L0_Y = 158, L1_Y = 300
const busy = ref(false), status = ref('')
const step = ref(0)
const box = ref<HTMLDivElement>()

const memTable = reactive<number[]>([])
const l0 = reactive<number[][]>([])
const l1 = reactive<number[][]>([])

interface Cell { id: number; key: number; x: number; y: number; color: string }
const cells = reactive<Cell[]>([])
let cid = 100

const d = (ms: number) => new Promise(r => setTimeout(r, ms))

function mergeSorted(a: number[], b: number[]): number[] {
  const out: number[] = []
  let i = 0, j = 0
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) out.push(a[i++])
    else if (a[i] > b[j]) out.push(b[j++])
    else { out.push(a[i]); i++; j++ }   // 去重：重复 key 只留一个（最新版本）
  }
  while (i < a.length) out.push(a[i++])
  while (j < b.length) out.push(b[j++])
  return out
}

function layout() {
  cells.length = 0
  memTable.forEach((k, i) => cells.push({ id: cid++, key: k, x: CELL_X0 + i * (CW + CGAP), y: MEM_Y, color: C.cyan }))
  l0.forEach((sst, r) => sst.forEach((k, i) => cells.push({ id: cid++, key: k, x: CELL_X0 + i * (CW + CGAP), y: L0_Y + r * (CH + CGAP), color: C.green })))
  l1.forEach((sst, r) => sst.forEach((k, i) => cells.push({ id: cid++, key: k, x: CELL_X0 + i * (CW + CGAP), y: L1_Y + r * (CH + CGAP), color: C.blue })))
}

function memBox() { return { x: 16, y: 28, width: W.value - 32, height: 56, fill: 'transparent', stroke: '#0891b2', strokeWidth: 1.5, dash: [6, 4], cornerRadius: 8 } }
function l0Box() { return { x: 16, y: 146, width: W.value - 32, height: 92, fill: 'transparent', stroke: '#22c55e', strokeWidth: 1.5, dash: [6, 4], cornerRadius: 8 } }
function l1Box() { return { x: 16, y: 288, width: W.value - 32, height: 56, fill: 'transparent', stroke: '#3b82f6', strokeWidth: 1.5, dash: [6, 4], cornerRadius: 8 } }
function memLabel() { return { x: 20, y: 16, text: '① 内存 MemTable（有序）', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0891b2' } }
function l0Label() { return { x: 20, y: 136, text: '③ 磁盘 L0：不可变 SSTable', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#16a34a' } }
function l1Label() { return { x: 20, y: 278, text: '⑤ 磁盘 L1：compaction 合并后', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#2563eb' } }
function flushLabel() { return { x: W.value / 2 + 14, y: 102, text: '② 刷盘 flush（顺序写）', fontSize: 11, fontFamily: 'monospace', fill: C.muted } }
function compLabel() { return { x: W.value / 2 + 14, y: 250, text: '④ compaction 合并', fontSize: 11, fontFamily: 'monospace', fill: C.muted } }
function flushArrow() { return { points: [W.value / 2, 84, W.value / 2, 126], stroke: '#94a3b8', fill: '#94a3b8', strokeWidth: 2, pointerLength: 8, pointerWidth: 6 } }
function compArrow() { return { points: [W.value / 2, 238, W.value / 2, 270], stroke: '#94a3b8', fill: '#94a3b8', strokeWidth: 2, pointerLength: 8, pointerWidth: 6 } }
function cellRect(c: Cell) {
  return { x: c.x, y: c.y, width: CW, height: CH, fill: c.color, cornerRadius: 6, stroke: '#64748b', strokeWidth: 1.5, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 4, shadowOffsetY: 2 }
}
function cellText(c: Cell) {
  return { x: c.x, y: c.y, width: CW, height: CH, text: String(c.key), fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: c.color === C.green ? C.text : '#fff', align: 'center', verticalAlign: 'middle' }
}

async function doNext() {
  if (busy.value) return
  busy.value = true
  try {
    const s = step.value
    if (s === 0) {
      status.value = '写入 [3,1,5] 到 MemTable（自动有序）'
      memTable.length = 0
      ;[3, 1, 5].forEach(k => memTable.push(k))
      memTable.sort((a, b) => a - b)
      layout(); await d(700)
      status.value = 'MemTable 已有序：[1,3,5]'
    } else if (s === 1) {
      status.value = 'MemTable 满 → 刷盘成 SSTable（L0）'
      await d(500)
      l0.push([...memTable]); memTable.length = 0
      layout(); await d(700)
      status.value = 'L0 新增 1 个 SSTable，MemTable 清空'
    } else if (s === 2) {
      status.value = '继续写入 [2,4,8] 到 MemTable'
      ;[2, 4, 8].forEach(k => memTable.push(k))
      memTable.sort((a, b) => a - b)
      layout(); await d(700)
      status.value = 'MemTable 又满了'
    } else if (s === 3) {
      status.value = '再次刷盘 → L0 第 2 个 SSTable'
      await d(500)
      l0.push([...memTable]); memTable.length = 0
      layout(); await d(700)
      status.value = 'L0 现在有 2 个可能重叠的 SSTable'
    } else if (s === 4) {
      status.value = 'Compaction：合并 L0 → L1（去重+有序）'
      await d(500)
      const merged = mergeSorted(l0[0] ?? [], l0[1] ?? [])
      l1.length = 0; l1.push(merged); l0.length = 0
      layout(); await d(700)
      status.value = `L1 = [${merged.join(',')}]，L0 清空`
    } else {
      status.value = '✅ 演示完成：写快（顺序写）读慢（查多层）。点 ↺ 重置'
      return
    }
    step.value = s + 1
  } finally {
    await d(200); busy.value = false
  }
}

function doReset() {
  memTable.length = 0; l0.length = 0; l1.length = 0
  step.value = 0; status.value = ''
  layout()
}

let ro: ResizeObserver | null = null
onMounted(() => {
  doReset()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const whyCode = `// ===== 为什么「顺序写」比「随机写」快 =====
// 磁盘/SSD 的物理特性：
//   ★ 顺序写：磁头/闪存沿一条线连续写，速度极快（~100+ MB/s）
//   ★ 随机写：每次都要「寻道/定位」，速度慢 1~2 个数量级
//
// B+ 树的问题：为保持有序，每次插入都可能要
//   1) 随机定位到某个页（读盘）
//   2) 页满了还要分裂，改写多个页（随机写）
//   → 写入吞吐上不去，成为高写入场景（日志/时序）的瓶颈
//
// LSM 的答案：先别在磁盘上排好序！
//   1) 所有写入先进内存 MemTable（内存随机写极快）
//   2) MemTable 攒满，一次性顺序刷盘成 SSTable
//   3) 排序/去重的事，交给后台 compaction 慢慢做
//   → 前台写路径几乎全是「顺序写」，吞吐大幅提升

// 手动对比 100 万次写入（示意数量级，非精确基准）：
const RANDOM_IO_MS = 10        // 一次随机 IO ≈ 10ms
const SEQ_IO_MS = 0.1          // 顺序写摊到每次 ≈ 0.1ms（批量均摊）

const btreeWriteMs = 1_000_000 * RANDOM_IO_MS   // B+ 树：每次都要随机定位
const lsmWriteMs = 1_000_000 * SEQ_IO_MS        // LSM：批量顺序写均摊

console.log('B+ 树写入耗时 ≈', btreeWriteMs, 'ms')
console.log('LSM 写入耗时 ≈', lsmWriteMs, 'ms')
// 输出:
// B+ 树写入耗时 ≈ 10000000 ms
// LSM 写入耗时 ≈ 100000 ms
// 相差约 100 倍 —— 这就是「写优化」的由来（读的代价见下文）`

const memtableCode = `// ===== 简化版 MemTable：有序数组 + 二分插入 =====
// 真实实现用跳表/红黑树（O(log n) 插入且支持并发），
// 这里用有序数组演示「键有序」这个核心不变式。
class MemTable {
    private entries: { key: number; value: string }[] = []

    // 二分查找第一个 >= key 的位置，保证有序
    private lowerBound(key: number): number {
        let lo = 0, hi = this.entries.length
        while (lo < hi) {
            const mid = (lo + hi) >> 1
            if (this.entries[mid].key < key) lo = mid + 1
            else hi = mid
        }
        return lo
    }

    // 写入：找到位置插入（有重复就覆盖，保留最新版本）
    put(key: number, value: string): void {
        const i = this.lowerBound(key)
        if (i < this.entries.length && this.entries[i].key === key) {
            this.entries[i].value = value       // 覆盖旧值
        } else {
            this.entries.splice(i, 0, { key, value })
        }
    }

    // 查询（内存里 O(log n)）
    get(key: number): string | null {
        const i = this.lowerBound(key)
        return (i < this.entries.length && this.entries[i].key === key)
            ? this.entries[i].value : null
    }

    // 返回当前所有 key（刷盘时直接整体写出）
    keys(): number[] { return this.entries.map(e => e.key) }

    // 是否达到刷盘阈值（真实实现按内存大小，如 4MB）
    shouldFlush(threshold: number): boolean {
        return this.entries.length >= threshold
    }
}

// 演示
const mt = new MemTable()
;[3, 1, 5, 1].forEach((k, i) => mt.put(k, 'v' + i))
console.log(mt.keys())   // 输出: [1, 3, 5]  ← key=1 被覆盖，且整体有序`

const sstableCode = `// ===== SSTable：磁盘上的不可变有序段 =====
// 特点：
//   1) 不可变（immutable）—— 落盘后永不修改
//   2) 按键有序 —— 支持二分查找 + 多路归并
//   3) 可配布隆过滤器 —— 快速排除「一定不存在」的 key
class SSTable {
    // 这里用内存数组模拟磁盘上的有序段
    constructor(public readonly keys: number[], public readonly values: string[]) {}

    // 段内二分查找（真实实现还会先查布隆过滤器）
    lookup(key: number): string | null {
        let lo = 0, hi = this.keys.length - 1
        while (lo <= hi) {
            const mid = (lo + hi) >> 1
            if (this.keys[mid] === key) return this.values[mid]
            if (this.keys[mid] < key) lo = mid + 1
            else hi = mid - 1
        }
        return null
    }

    // 两个 SSTable 的合并（多路归并的核心单元）
    static merge(a: SSTable, b: SSTable): SSTable {
        const keys: number[] = [], values: string[] = []
        let i = 0, j = 0
        while (i < a.keys.length && j < b.keys.length) {
            if (a.keys[i] < b.keys[j]) { keys.push(a.keys[i]); values.push(a.values[i]); i++ }
            else if (a.keys[i] > b.keys[j]) { keys.push(b.keys[j]); values.push(b.values[j]); j++ }
            else { keys.push(a.keys[i]); values.push(a.values[i]); i++; j++ }  // 去重，保留较新的
        }
        while (i < a.keys.length) { keys.push(a.keys[i]); values.push(a.values[i]); i++ }
        while (j < b.keys.length) { keys.push(b.keys[j]); values.push(b.values[j]); j++ }
        return new SSTable(keys, values)
    }
}

// 演示：两个有序段合并去重
const s1 = new SSTable([1, 3, 5], ['a', 'c', 'e'])
const s2 = new SSTable([2, 3, 8], ['b', 'c2', 'h'])
const merged = SSTable.merge(s1, s2)
console.log(merged.keys)   // 输出: [1, 2, 3, 5, 8]  ← key=3 去重，保留 s1 的版本`

const compactionCode = `// ===== Compaction：分层合并 =====
// LSM 的层级（LevelDB 的 leveled 策略）：
//   L0: 刚刷盘的 SSTable，可能相互重叠，数量少
//   L1~Ln: 越深越「大且有序」，层内段之间不重叠
//
// compaction 做的事：
//   1) 取 L_{i} 的若干段 + L_{i+1} 中与之重叠的段
//   2) 多路归并成一个更大的有序段
//   3) 去重（保留最新版本）、丢弃 tombstone（删除标记）
//   4) 写回 L_{i+1}

type Level = SSTable[]   // 一层 = 多个 SSTable

// 把 L0 的两个段合并到 L1（简化：只演示归并去重）
function compact(level0: Level, level1: Level): { l0: Level; l1: Level } {
    // 1) 归并 L0 全部段
    let merged = level0.reduce((acc, s) => SSTable.merge(acc, s))
    // 2) 再与 L1 中重叠的段归并（这里简化为与 L1 全部归并）
    for (const s of level1) merged = SSTable.merge(merged, s)
    // 3) L0 清空，合并结果落到 L1
    return { l0: [], l1: [merged] }
}

// 演示
const l0: Level = [new SSTable([1, 3, 5], ['a', 'c', 'e']), new SSTable([2, 4, 8], ['b', 'd', 'h'])]
const l1: Level = [new SSTable([1, 2, 3, 4, 5, 8], ['a', 'b', 'c', 'd', 'e', 'h'])]
const after = compact(l0, l1)
console.log('L0 段数:', after.l0.length)        // 输出: 0
console.log('L1 keys:', after.l1[0].keys)       // 输出: [1, 2, 3, 4, 5, 8]  ← 去重合并

// 记忆点：
//   ★ 写放大 = 一个 key 被 compaction 反复搬运的次数
//   ★ 读放大 = 一次查询要遍历的段/层数量
//   ★ 层级越深，段越大越少 → 读放大可控，但写放大上升`

</script>
