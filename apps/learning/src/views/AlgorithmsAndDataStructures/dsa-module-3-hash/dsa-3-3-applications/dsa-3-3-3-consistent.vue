<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔄 一致性哈希（Consistent Hashing）</h1>
          <p class="text-sm text-slate-500 mt-1">从取模哈希的雪崩说起——把 key 和节点映射到同一个环上，节点增删只迁移约 1/n</p>
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
          结构总览：一致性哈希到底在干什么
        </h2>

        <!-- 一句话定义 -->
        <div class="bg-linear-to-r from-cyan-600 to-blue-600 rounded-xl p-5 mb-5 text-white">
          <p class="text-sm font-bold mb-1">💡 一句话定义</p>
          <p class="text-sm leading-relaxed">
            一致性哈希是一种特殊的哈希方法：<strong>把服务器节点和 key 用同一个哈希函数映射到一个「环形」哈希空间上，
            key 归属「顺时针遇到的第一个节点」</strong>。它的本领是——<strong>无论加机器还是减机器，
            都只有约 1/n 的 key 需要重新归属</strong>，其余 key 原地不动。
          </p>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          它要解决的是普通 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">hash(key) % n</code>
          的致命伤：<strong>节点数一变，几乎所有 key 都换主人</strong>，缓存瞬间大面积失效。
          下面这张图把「节点、key、顺时针归属」一次讲清；后面的章节再一步步推导出这个方案为什么有效。
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
            <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">哈希空间 [0, 2³²) 首尾相连成环</text>

            <!-- 节点 A(0°) B(120°) C(240°) -->
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

            <!-- keys（白色小圆点，描边 = 归属节点颜色） -->
            <g transform="rotate(30 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#4ade80" stroke-width="2" />
              <text x="170" y="34" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">k1</text>
            </g>
            <g transform="rotate(70 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#4ade80" stroke-width="2" />
              <text x="170" y="34" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">k2</text>
            </g>
            <g transform="rotate(200 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#f59e0b" stroke-width="2" />
              <text x="170" y="34" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">k3</text>
            </g>
            <g transform="rotate(310 170 160)">
              <circle cx="170" cy="50" r="7" fill="#ffffff" stroke="#06b6d4" stroke-width="2" />
              <text x="170" y="34" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">k4</text>
            </g>

            <!-- 顺时针查找箭头：key(30°) → 节点 B(120°) -->
            <path d="M 217.5 77.7 A 95 95 0 0 1 252.3 207.5" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ch-arr)" />
            <text x="272" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#d97706">顺时针</text>
            <text x="272" y="156" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#d97706">k1 → B</text>

            <!-- 图例 -->
            <g transform="translate(380 36)">
              <rect x="0" y="0" width="246" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
              <circle cx="20" cy="26" r="8" fill="#06b6d4" /><text x="36" y="30" font-size="11" font-family="monospace" fill="#64748b">节点（服务器）</text>
              <circle cx="20" cy="52" r="5" fill="#ffffff" stroke="#4ade80" stroke-width="2" /><text x="36" y="56" font-size="11" font-family="monospace" fill="#64748b">key（数据 / 缓存项）</text>
              <line x1="8" y1="82" x2="36" y2="82" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" /><text x="44" y="86" font-size="11" font-family="monospace" fill="#64748b">顺时针归属查找</text>
              <text x="12" y="112" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">key 落到顺时针第一个节点</text>
            </g>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：哈希环 —— 节点 A/B/C 与 key 都哈希到环上，key 顺时针找第一个节点（k1→B、k2→B、k3→C、k4→A）</figcaption>
        </figure>

        <!-- 三条主线 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="bg-cyan-50 border border-cyan-200 rounded-xl p-3">
            <p class="font-bold text-cyan-800 mb-1">🤔 为什么需要它</p>
            <p class="text-cyan-700 leading-relaxed">取模哈希在节点增删时几乎全量迁移，引发缓存雪崩（见 §1）</p>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p class="font-bold text-blue-800 mb-1">🔑 核心思想</p>
            <p class="text-blue-700 leading-relaxed">哈希空间固定为环，key 和节点都映射上去，顺时针找归属（见 §2~§4）</p>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <p class="font-bold text-emerald-800 mb-1">📈 为什么有效</p>
            <p class="text-emerald-700 leading-relaxed">节点增删只影响环上一小段弧，迁移量 O(1/n)，配合虚拟节点更均衡（见 §5~§7）</p>
          </div>
        </div>
      </section>

      <!-- sec-1 从取模哈希说起 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          从取模哈希说起 —— 节点一变，天翻地覆
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          想给一批 key（缓存项 / 用户数据）分到 n 台服务器，最直觉的做法就是<strong>取模</strong>：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">node = hash(key) % n</code>。
          它均匀、简单、O(1)，过去十几年分布式缓存几乎都这么干。但它的<strong>致命弱点藏在分母里</strong>——<strong>n 是节点数</strong>。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">node = hash(key) % n &nbsp;&nbsp;⟶&nbsp;&nbsp; n 一变，结果全变</p>
          <p class="text-xs text-cyan-600 text-center">n 从 3 变 4，几乎所有 key 的 hash(key)%n 都换了值 → 数据大规模搬家</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="modHashCode" title="mod_hash.ts" /></div>

        <!-- 雪崩机制图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">为什么说「天翻地覆」——缓存雪崩的连锁反应</h3>
        <figure class="mb-4">
          <svg viewBox="0 0 720 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="m-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <!-- 步骤 1 -->
            <rect x="10" y="60" width="150" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="85" y="84" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">① 加一台机器</text>
            <text x="85" y="102" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#dc2626">n: 3 → 4</text>
            <text x="85" y="116" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#dc2626">约 75% key 换节点</text>
            <line x1="160" y1="95" x2="196" y2="95" stroke="#94a3b8" stroke-width="2" marker-end="url(#m-arr)" />
            <!-- 步骤 2 -->
            <rect x="200" y="60" width="150" height="70" rx="8" fill="#ffedd5" stroke="#f59e0b" stroke-width="1.5" />
            <text x="275" y="84" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">② 缓存大量失效</text>
            <text x="275" y="102" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706">缓存 miss 激增</text>
            <text x="275" y="116" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706">读不到就查 DB</text>
            <line x1="350" y1="95" x2="386" y2="95" stroke="#94a3b8" stroke-width="2" marker-end="url(#m-arr)" />
            <!-- 步骤 3 -->
            <rect x="390" y="60" width="150" height="70" rx="8" fill="#ffedd5" stroke="#f59e0b" stroke-width="1.5" />
            <text x="465" y="84" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">③ 请求直冲数据库</text>
            <text x="465" y="102" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706">QPS 瞬间放大</text>
            <text x="465" y="116" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706">缓存扛不住 → 穿透</text>
            <line x1="540" y1="95" x2="576" y2="95" stroke="#94a3b8" stroke-width="2" marker-end="url(#m-arr)" />
            <!-- 步骤 4 -->
            <rect x="580" y="60" width="130" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="645" y="84" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">④ 数据库被打挂</text>
            <text x="645" y="102" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#dc2626">雪崩 · 服务不可用</text>
            <text x="360" y="30" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">缓存雪崩（Cache Avalanche）连锁反应</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：取模哈希在节点增删时引发「缓存雪崩」的完整链条 —— 一致性哈希正是为切断这一环而生</figcaption>
        </figure>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 缓存雪崩 vs 缓存击穿：</strong>「雪崩」是大批 key 同时失效（如这里节点扩容导致 75% 缓存 miss）；
          「击穿」是单个热点 key 过期瞬间被打穿。两者都会把流量压向 DB，但雪崩规模大得多，一致性哈希治的是「雪崩」。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          取模哈希就像用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">index = hash(key) % columns</code> 把卡片分到固定列里——
          一旦列数从 3 变 4，<strong>所有卡片被重新洗牌</strong>。而一致性哈希更像一个<strong>环形传送带</strong>：
          卡片和格子都贴在带上，只加一个格子时，只有它落点附近几张卡片会挪过去，其余原地不动。</p>
        </aside>
      </section>

      <!-- sec-2 核心思想 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          核心思想 —— 不对节点数取模，把哈希空间卷成一个环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          取模的问题出在「哈希结果还要除以节点数」。一致性哈希的关键转变是：<strong>抛弃节点数这个分母</strong>，
          让哈希空间 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[0, 2³²)</code>（约 43 亿个位置）<strong>固定不变</strong>，
          然后把它的<strong>首尾相接卷成一个环</strong>。节点按哈希值落在环上，key 也按哈希值落在环上，
          接下来 key 只和「环上的邻居」打交道，和节点总数无关。
        </p>

        <!-- 三步理解 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-3">三步理解一致性哈希</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-bold text-slate-700 mb-2"><span class="inline-flex w-6 h-6 rounded-full bg-cyan-600 text-white items-center justify-center text-xs font-bold mr-1">1</span>统一映射</p>
            <p class="text-xs text-slate-600 leading-relaxed">选一个分布均匀的哈希函数，把<strong>节点</strong>和<strong>key</strong>都映射到 <code class="font-mono bg-slate-100 px-1 rounded">0 ~ 2³²-1</code>，各占一个位置。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-bold text-slate-700 mb-2"><span class="inline-flex w-6 h-6 rounded-full bg-cyan-600 text-white items-center justify-center text-xs font-bold mr-1">2</span>卷成环</p>
            <p class="text-xs text-slate-600 leading-relaxed">把数轴<strong>首尾相接</strong>卷成环，0 和 2³²-1 变成邻居。环的形状固定，节点增删不改变环。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-bold text-slate-700 mb-2"><span class="inline-flex w-6 h-6 rounded-full bg-cyan-600 text-white items-center justify-center text-xs font-bold mr-1">3</span>顺时针归属</p>
            <p class="text-xs text-slate-600 leading-relaxed">key 从自己位置<strong>顺时针走，遇到的第一节点</strong>就是归属；走到头（超过 2³²-1）就绕回环头 0。</p>
          </div>
        </div>

        <div class="mb-4"><Code language="ts" :code="consistentHashCode" title="consistent_hash_ring.ts" /></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>💡 为什么用 2³² 这么大的空间？</strong>空间越大，节点和 key 的落点越稀疏，越不容易撞车，
            分布越均匀。实际常用 MD5 / SHA-1 / CRC32 这类输出位数高的哈希，<strong>截取低 32 位</strong>，
            落点接近理想随机 —— 这也把「一致性哈希」和上一篇「密码学哈希」串起来了：<strong>一致性哈希借密码学哈希的均匀性，但目的不是安全而是分布</strong>。</p>
          </aside>
          <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
            <p class="text-sm text-emerald-800"><strong>🔑 为什么「环」是关键？</strong>环让「哈希结果」变成「<strong>环上的位置</strong>」，
            而不是「服务器编号」。新增节点只是<strong>在环上插入一个新位置</strong>，它只「顶替」自己顺时针前方那一小段弧上的 key，
            其它 key 的归属一个都不用改 —— 这就是「一致」二字的含义。</p>
          </aside>
        </div>
      </section>

      <!-- sec-3 顺时针查找 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          顺时针查找 —— key 如何找到它的节点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把环上的节点按哈希值<strong>升序排成一圈</strong>。给定 key，查找规则只有一句话：
          <strong>找到第一个「哈希值 &gt;= key 哈希值」的节点</strong>；如果 key 的哈希值比所有节点都大（越过了环尾），
          就<strong>绕回环头</strong>归属哈希值最小的节点。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>三个边界情况（务必看清）：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm leading-relaxed">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>key 正好落在节点上</strong>：归属该节点自己（<code class="font-mono text-xs">hash &gt;= keyHash</code> 取等号）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>key 哈希值大于所有节点</strong>：顺时针转一圈回到环头，归属哈希值最小的节点（这就是「环」存在的意义）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>节点哈希值相同 / 撞车</strong>：实际中先到者胜或追加后缀，概率极低，一般用虚拟节点天然化解</span></li>
          </ul>
        </div>

        <!-- 查找规则示意 -->
        <figure class="mb-4">
          <svg viewBox="0 0 720 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="l-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="10" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">按哈希值升序排列的节点数组</text>
            <!-- 数轴 -->
            <line x1="30" y1="72" x2="690" y2="72" stroke="#cbd5e1" stroke-width="2" marker-end="url(#l-arr)" />
            <!-- 节点位置 -->
            <g font-family="monospace">
              <circle cx="60" cy="72" r="16" fill="#06b6d4" /><text x="60" y="72" text-anchor="middle" dominant-baseline="central" font-size="11" fill="#fff" font-weight="bold">A</text>
              <text x="60" y="100" text-anchor="middle" font-size="10" fill="#64748b">hash=0</text>
              <circle cx="340" cy="72" r="16" fill="#4ade80" /><text x="340" y="72" text-anchor="middle" dominant-baseline="central" font-size="11" fill="#0f172a" font-weight="bold">B</text>
              <text x="340" y="100" text-anchor="middle" font-size="10" fill="#64748b">hash=120°</text>
              <circle cx="600" cy="72" r="16" fill="#f59e0b" /><text x="600" y="72" text-anchor="middle" dominant-baseline="central" font-size="11" fill="#fff" font-weight="bold">C</text>
              <text x="600" y="100" text-anchor="middle" font-size="10" fill="#64748b">hash=240°</text>
            </g>
            <!-- key 30° -->
            <circle cx="180" cy="72" r="7" fill="#fff" stroke="#4ade80" stroke-width="2" />
            <text x="180" y="100" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">k=30°</text>
            <line x1="180" y1="52" x2="330" y2="52" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#l-arr)" />
            <text x="255" y="44" text-anchor="middle" font-size="10" font-family="monospace" fill="#d97706">≥30° 的第一个 → B</text>
            <!-- key 300° 绕回 -->
            <circle cx="650" cy="72" r="7" fill="#fff" stroke="#06b6d4" stroke-width="2" />
            <text x="650" y="100" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">k=300°</text>
            <path d="M 660 55 Q 690 20 70 45" fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#l-arr)" />
            <text x="360" y="18" text-anchor="middle" font-size="10" font-family="monospace" fill="#0891b2">无节点 ≥300° → 绕回环头 → A</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 3：查找规则 —— key(30°) 顺时针找到 B；key(300°) 越过所有节点，绕回环头找到 A</figcaption>
        </figure>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">普通取模哈希</th><th class="px-4 py-2 border border-slate-200 font-semibold">一致性哈希</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">查找 key 归属</td><td class="px-4 py-2 border font-mono">hash % n → O(1)</td><td class="px-4 py-2 border font-mono">二分 / 树查找 → O(log n)</td></tr>
              <tr><td class="px-4 py-2 border">新增节点迁移</td><td class="px-4 py-2 border font-mono text-red-600">约 (n-1)/n key 迁移</td><td class="px-4 py-2 border font-mono text-emerald-600">约 1/n key 迁移</td></tr>
              <tr><td class="px-4 py-2 border">删除节点迁移</td><td class="px-4 py-2 border font-mono text-red-600">同样大规模迁移</td><td class="px-4 py-2 border font-mono text-emerald-600">只迁移该节点负责的 key</td></tr>
              <tr><td class="px-4 py-2 border">数据结构的代价</td><td class="px-4 py-2 border font-mono">无（纯算术）</td><td class="px-4 py-2 border font-mono">需有序结构维护节点</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed mb-4">
          查找看似从 O(1) 涨到了 O(log n)，但 n 是<strong>节点数</strong>（成百上千级别），
          用<strong>有序数组二分、红黑树、跳表或 B+ 树</strong>维护节点列表，增删节点和查找都是 O(log n)，
          这个代价换来的是「节点变化时几乎不迁移」，非常划算。
        </p>
      </section>

      <!-- sec-4 完整走查 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          完整走查 —— 3 个节点 6 个 key，加一台机器看看发生了什么
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          理论看一百遍不如手算一遍。下面用「角度」代替真实哈希值（教学简化），节点 A=0°、B=120°、C=240°，
          6 个 key 落在环上的角度分别是 30°、60°、150°、210°、300°、330°。按「顺时针第一个 ≥ 自己」规则逐一归属。
        </p>

        <!-- 扩容前 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">扩容前：3 节点，6 个 key 分配</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">key</th><th class="px-4 py-2 border border-slate-200 font-semibold">哈希值</th><th class="px-4 py-2 border border-slate-200 font-semibold">顺时针第一个 ≥ 的节点</th><th class="px-4 py-2 border border-slate-200 font-semibold">归属</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">k1</td><td class="px-4 py-2 border font-mono">30°</td><td class="px-4 py-2 border">≥30° 的第一个节点是 B(120°)</td><td class="px-4 py-2 border font-mono text-emerald-600 font-bold">B</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k2</td><td class="px-4 py-2 border font-mono">60°</td><td class="px-4 py-2 border">≥60° 的第一个节点是 B(120°)</td><td class="px-4 py-2 border font-mono text-emerald-600 font-bold">B</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k3</td><td class="px-4 py-2 border font-mono">150°</td><td class="px-4 py-2 border">≥150° 的第一个节点是 C(240°)</td><td class="px-4 py-2 border font-mono text-emerald-600 font-bold">C</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k4</td><td class="px-4 py-2 border font-mono">210°</td><td class="px-4 py-2 border">≥210° 的第一个节点是 C(240°)</td><td class="px-4 py-2 border font-mono text-emerald-600 font-bold">C</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k5</td><td class="px-4 py-2 border font-mono">300°</td><td class="px-4 py-2 border">没有 ≥300° 的 → 绕回环头 A(0°)</td><td class="px-4 py-2 border font-mono text-emerald-600 font-bold">A</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k6</td><td class="px-4 py-2 border font-mono">330°</td><td class="px-4 py-2 border">没有 ≥330° 的 → 绕回环头 A(0°)</td><td class="px-4 py-2 border font-mono text-emerald-600 font-bold">A</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm mb-4">结果：A 管 2 个（k5、k6）、B 管 2 个（k1、k2）、C 管 2 个（k3、k4）——<strong>2:2:2 完美均衡</strong>。
        每台机器负责的其实是「前一个节点 → 自己」这段弧上的 key：A 负责 [240°,360°)、B 负责 [0°,120°)、C 负责 [120°,240°)。</p>

        <!-- 扩容后 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">扩容后：新增节点 D（哈希 90°，落在 A↔B 之间）</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">key</th><th class="px-4 py-2 border border-slate-200 font-semibold">扩容前归属</th><th class="px-4 py-2 border border-slate-200 font-semibold">扩容后归属</th><th class="px-4 py-2 border border-slate-200 font-semibold">是否迁移</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">k1</td><td class="px-4 py-2 border font-mono">B</td><td class="px-4 py-2 border font-mono text-amber-600 font-bold">D（90° 顶替 B 的位置）</td><td class="px-4 py-2 border font-mono text-red-600">🔁 迁移</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k2</td><td class="px-4 py-2 border font-mono">B</td><td class="px-4 py-2 border font-mono text-amber-600 font-bold">D（90° 顶替 B 的位置）</td><td class="px-4 py-2 border font-mono text-red-600">🔁 迁移</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k3</td><td class="px-4 py-2 border font-mono">C</td><td class="px-4 py-2 border font-mono">C</td><td class="px-4 py-2 border font-mono text-emerald-600">✓ 不变</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k4</td><td class="px-4 py-2 border font-mono">C</td><td class="px-4 py-2 border font-mono">C</td><td class="px-4 py-2 border font-mono text-emerald-600">✓ 不变</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k5</td><td class="px-4 py-2 border font-mono">A</td><td class="px-4 py-2 border font-mono">A</td><td class="px-4 py-2 border font-mono text-emerald-600">✓ 不变</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k6</td><td class="px-4 py-2 border font-mono">A</td><td class="px-4 py-2 border font-mono">A</td><td class="px-4 py-2 border font-mono text-emerald-600">✓ 不变</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm mb-4">
          新增 D 之后，<strong>只有落在 [A 的 0°, D 的 90°) 这段弧上的 k1、k2 换主人</strong>（从 B 变成 D），
          迁移比例 2/6 ≈ 1/3 —— 正好是 D 落点所在弧的长度占比。其余 4 个 key 归属一个没变。
          这就是一致性哈希和取模哈希最本质的区别：<strong>节点变化时，只有「局部」受影响。</strong>
        </p>

        <!-- 对比示意图 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">普通取模哈希：3 → 4 节点，约 75% key 换节点</p>
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
              <text x="10" y="144" font-size="10" font-family="monospace" fill="#d97706">k3/k4/k5 换节点 → 迁移约 3/6</text>
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
            <figcaption class="text-xs text-slate-400 mt-1">新增节点只影响环上一小段弧（D 落点附近），迁移量 ≈ 1/n</figcaption>
          </figure>
        </div>

        <div class="mb-4"><Code language="ts" :code="workedExampleCode" title="walkthrough.ts" /></div>
      </section>

      <!-- sec-5 迁移成本 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          迁移成本 —— 为什么只有 O(1/n)，而不是全量
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          关键直觉：新增节点只会<strong>「顶替」它顺时针前方那段弧</strong>。设环上均匀分布 n 个节点，
          它们把环切成 n 段弧；新节点等概率落在任意位置，只会接管它<strong>落点所在的那一段弧</strong>。
          那段弧平均占整个环的 <strong>1/n</strong>，所以平均迁移量就是 <strong>O(1/n)</strong>。
        </p>
        <div class="bg-linear-to-r from-emerald-50 to-cyan-50 rounded-xl p-5 border border-emerald-200 mb-4">
          <p class="text-lg font-bold text-emerald-800 mb-2 text-center font-mono">取模 ≈ (n-1)/n 全量 &nbsp;&nbsp;vs&nbsp;&nbsp; 一致性哈希 ≈ 1/n 局部</p>
          <p class="text-xs text-emerald-600 text-center">节点越多，一致性哈希的优势越明显 —— n=100 时每次加机器只迁移 1%，几乎无感</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="migrationCode" title="migration_cost.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>节点频繁上下线（弹性扩缩容、故障转移）的场景，
          一致性哈希把每次变更的成本从「全量搬迁」降到「局部搬迁」，是负载均衡、分布式缓存、数据分片的标配方案。</p>
        </aside>
      </section>

      <!-- sec-6 虚拟节点 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          虚拟节点 —— 解决节点少时的分布不均
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一致性哈希有个隐藏问题：<strong>节点少时，落点可能挤在一起</strong>。比如只有 2 台机器，
          哈希结果随机性导致它们可能都落在环的同一侧，其中一台就分到超长弧、扛下 90% 的流量，另一台闲置——
          这叫<strong>数据倾斜 / 哈希环热点</strong>。节点越多越均匀，但生产环境节点往往没那么密。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>解法：给每个物理节点生成「分身」。</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm leading-relaxed">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>每个物理节点复制出 K 个<strong>虚拟节点</strong>，命名如 <code class="font-mono text-xs">node-A#0、node-A#1、node-A#2...</code>，各自独立哈希到环上不同位置</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>物理节点越强，可分配越多的虚拟节点（<strong>按权重</strong>）——强机器多分身、多扛流量</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>效果：每个物理节点的「总弧长」趋于相等，负载被摊平；且某个物理节点下线时，它的 K 个虚拟节点一起消失，迁移仍是局部</span></li>
          </ul>
        </div>

        <div class="mb-4"><Code language="ts" :code="virtualNodeCode" title="virtual_nodes.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">每节点虚拟节点数</th><th class="px-4 py-2 border border-slate-200 font-semibold">负载均衡度</th><th class="px-4 py-2 border border-slate-200 font-semibold">内存/维护开销</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">少（如 10）</td><td class="px-4 py-2 border">标准差仍大，可能倾斜</td><td class="px-4 py-2 border">小</td></tr>
              <tr><td class="px-4 py-2 border font-mono">中等（如 100~150）</td><td class="px-4 py-2 border text-emerald-600">已经相当均匀</td><td class="px-4 py-2 border">适中（生产常用）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">多（如 1000+）</td><td class="px-4 py-2 border text-emerald-600">接近理想均匀</td><td class="px-4 py-2 border">大（需权衡）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- sec-7 增删流程 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          增删节点的完整流程 —— 记住「先搬数据，再下线」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一致性哈希解决的是<strong>路由</strong>问题，但它<strong>不会替你搬数据</strong>。
          真实系统里，增删节点都要配合数据迁移的显式步骤，顺序错了就会丢数据。下面两个流程是通用模板。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-green-50 border border-green-200 rounded-xl p-4">
            <p class="text-sm font-bold text-green-800 mb-2">🟢 新增节点 D</p>
            <ol class="list-decimal list-inside space-y-1.5 text-green-700 text-sm leading-relaxed">
              <li>计算 D 的哈希值，插入有序节点结构（红黑树/跳表，O(log n)）</li>
              <li>找到 D <strong>逆时针方向的前一个节点 P</strong>（D 顶替的是 P→D 这段弧）</li>
              <li>把「P → D」这段弧上的 key 从原节点<strong>复制/迁移</strong>到 D</li>
              <li>切换路由：这段弧上的读请求开始落到 D，完成扩容</li>
            </ol>
          </div>
          <div class="bg-red-50 border border-red-200 rounded-xl p-4">
            <p class="text-sm font-bold text-red-800 mb-2">🔴 删除节点 D</p>
            <ol class="list-decimal list-inside space-y-1.5 text-red-700 text-sm leading-relaxed">
              <li>先找到 D <strong>顺时针方向的下一个节点 N</strong></li>
              <li>把 D 负责的 key <strong>全部迁移到 N</strong>（必须等迁移完成）</li>
              <li>再从环上移除 D、更新路由结构</li>
              <li>之后 D 才能安全下线 —— <strong>顺序反了就会丢数据</strong></li>
            </ol>
          </div>
        </div>

        <div class="mb-4"><Code language="ts" :code="addRemoveFlowCode" title="add_remove_flow.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见误区：</strong>一致性哈希只回答「key 归谁管」，不回答「数据怎么搬」。
          很多分布式数据库（如 Cassandra）会<strong>先向新节点流式传输数据、再切换路由</strong>，期间读写走「协调节点 + 提示转移」保证一致性——
          你只要记住：<strong>删节点前先搬数据，加节点后先切路由</strong>，就不会丢。</p>
        </aside>
      </section>

      <!-- sec-8 场景与陷阱 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          实战场景与常见陷阱
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一致性哈希的典型落地：<strong>Memcached / Redis 客户端的分布式缓存</strong>（经典实现是 libketama）、
          <strong>Nginx 负载均衡</strong>、<strong>CDN 边缘节点分发</strong>、
          <strong>分布式存储分片</strong>（Cassandra、DynamoDB 的 ring + 虚拟节点）。
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缓存层扩缩容</strong>——加机器只失效一小部分缓存，避免雪崩</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>有状态服务分片</strong>——用户/订单按 id 路由到固定分片，扩容时局部迁移</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负载均衡粘性会话</strong>——节点下线只影响该节点上的会话，其余会话不动</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据冗余</strong>——让每个 key 顺时针归属「接下来的 N 个节点」存 N 份副本，任一节点挂了副本还在</span></li>
        </ul>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>🤔 那 Redis Cluster 用一致性哈希吗？</strong>不是。Redis Cluster 用的是「16384 个固定 slot」方案：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">slot = CRC16(key) % 16384</code>，
          slot 的数量固定，<strong>slot 和节点的映射表可以手动/自动调整</strong>。理念殊途同归——都是为了「节点变化时只迁移一部分数据」，
          但实现路径不同：一致性哈希是「无中心、纯哈希」，Redis Cluster 是「slot 映射表 + 集群协调」。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          1. <strong>忘了虚拟节点</strong>——节点少时数据严重倾斜，一致性哈希直接失去意义<br/>
          2. <strong>哈希函数分布不均</strong>——用差的哈希函数，key 挤在某段弧上，节点再均匀也白搭<br/>
          3. <strong>删节点不搬数据</strong>——一致性哈希只管路由，迁移必须显式做（先搬，再下线）<br/>
          4. <strong>误以为它保证均衡</strong>——它只保证「节点变化时迁移少」，不保证「任何时候都均衡」，均衡要依赖虚拟节点</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>用 <code>MD5/SHA1/CRC32</code> 等分布均匀的成熟哈希，
          每个物理节点配 100~150 个虚拟节点，节点列表用跳表/红黑树维护（增删查找 O(log n)），
          删节点严格「先迁移数据、后下线」，就能得到一套稳健的分布式路由层。</p>
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

      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>是什么</strong>：把节点和 key 用同一个哈希函数映射到环形空间 [0, 2³²)，key 顺时针找第一个节点作为归属</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么要有它</strong>：取模哈希节点数一改，约 (n-1)/n 的 key 全部迁移，引发缓存雪崩</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么有效</strong>：新增节点只「顶替」落点前方一小段弧，迁移量从 O(全量) 降到 O(1/n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>边界</strong>：key 哈希值比所有节点都大时，绕回环头归属最小节点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>虚拟节点</strong>：每个物理节点复制 K 个分身摊开落点，解决节点少时的数据倾斜</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>关键纪律</strong>：只负责路由，数据迁移要「先搬后下线」显式完成</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>典型应用</strong>：Memcached/Redis 客户端、Nginx 负载均衡、CDN、Cassandra/DynamoDB 分片</span></li>
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
  { id: "sec-1", name: "取模哈希的致命伤" },
  { id: "sec-2", name: "核心思想：哈希环" },
  { id: "sec-3", name: "顺时针查找" },
  { id: "sec-4", name: "完整走查示例" },
  { id: "sec-5", name: "迁移成本 O(1/n)" },
  { id: "sec-6", name: "虚拟节点" },
  { id: "sec-7", name: "增删流程" },
  { id: "sec-8", name: "场景与陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-9", name: "小结" },
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

// 扩容到 4 台 —— 分母 n 变了
const n4: Node[] = [{ name:'A' }, { name:'B' }, { name:'C' }, { name:'D' }]
const after = keys.map(k => \`\${k} -> \${route(n4, k)}\`)

console.log('扩容前:', before.join('  '))
console.log('扩容后:', after.join('  '))

// 迁移比例理论值 ≈ (n-1)/n（n 为新的节点数）
// n=3 → 4 时：约 75% 的 key 换了节点
// 后果：缓存大面积失效 → 请求直冲数据库 → 缓存雪崩`

const consistentHashCode = `// ─── 一致性哈希环（教学实现）───
// 哈希空间 [0, 2^32)，首尾相连成环
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

console.log(ch.getNode('user:1'))   // 顺时针第一个 hash >= 它的节点
// 新增节点只影响环上一小段弧上的 key，其余 key 的归属不变`

const workedExampleCode = `// ─── 完整走查：3 节点 → 4 节点的分配变化 ───
// 用「角度」代替真实哈希值（教学简化）：
//   A = 0°   B = 120°   C = 240°

const ring3 = [
  { node: 'A', hash: 0 },
  { node: 'B', hash: 120 },
  { node: 'C', hash: 240 },
]

const items = [
  { key: 'k1', hash: 30 },   // ≥30° 的第一个节点 → B
  { key: 'k2', hash: 60 },   // ≥60° 的第一个节点 → B
  { key: 'k3', hash: 150 },  // ≥150° 的第一个节点 → C
  { key: 'k4', hash: 210 },  // ≥210° 的第一个节点 → C
  { key: 'k5', hash: 300 },  // ≥300° 无 → 绕回环头 → A
  { key: 'k6', hash: 330 },  // ≥330° 无 → 绕回环头 → A
]

function ownerOf(ring: {node:string; hash:number}[], h: number): string {
  const s = [...ring].sort((a, b) => a.hash - b.hash)
  for (const e of s) if (e.hash >= h) return e.node
  return s[0].node   // 环尾绕回环头
}

console.log('扩容前 3 节点:')
items.forEach(i => console.log(\`  \${i.key} → \${ownerOf(ring3, i.hash)}\`))
// 输出: k1→B  k2→B  k3→C  k4→C  k5→A  k6→A   （2:2:2 均衡）

// 新增节点 D，hash = 90°（落在 A↔B 之间）
const ring4 = [...ring3, { node: 'D', hash: 90 }]
console.log('扩容后 4 节点:')
items.forEach(i => console.log(\`  \${i.key} → \${ownerOf(ring4, i.hash)}\`))
// 输出: k1→D  k2→D  k3→C  k4→C  k5→A  k6→A

// 只有 k1、k2 换了主人（原 B → 现 D），迁移 2/6 ≈ 1/3
// 恰好等于「D 落点所在弧 [A, D)」的长度占比 —— 局部迁移 ✓`

const migrationCode = `// ─── 迁移成本对比（模拟）───
// 取模哈希：n 从 3 变 4，几乎全量 key 重新映射
// 一致性哈希：只迁移「新节点落点所在弧」上的 key，O(1/n)

function estimateMigration(totalKeys: number, totalNodes: number) {
    // 取模哈希：迁移比例 ≈ (n-1)/n —— 几乎全量
    const modRatio = totalNodes / (totalNodes + 1)

    // 一致性哈希：迁移比例 ≈ 1/n —— 只动落点附近一段弧
    const ringRatio = 1 / totalNodes

    return {
        取模哈希迁移: Math.round(totalKeys * modRatio),
        一致性哈希迁移: Math.round(totalKeys * ringRatio),
    }
}

const result = estimateMigration(1_000_000, 3)
console.log('100 万 key，3 节点 → 加 1 节点：', result)
// 输出（近似）:
// 取模哈希迁移: 750000   （约 75% 全量失效）
// 一致性哈希迁移: 333333  （约 1/3，且节点越多越小）

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

const addRemoveFlowCode = `// ─── 增删节点的完整流程 ───
// 记住：一致性哈希只管「路由」，数据搬迁必须显式做

// ① 新增节点 D
function addNode(ring: {hash:number; node:string}[], node: string, hash: number) {
    // 1. 插入有序结构（生产：红黑树/跳表，O(log n)）
    ring.push({ hash, node })
    ring.sort((a, b) => a.hash - b.hash)

    // 2. 找到 D 逆时针方向的前一个节点 P
    const idx = ring.findIndex(e => e.hash === hash)
    const prev = ring[(idx - 1 + ring.length) % ring.length]

    // 3. 只迁移「P → D」这段弧上的 key（约 1/n 的比例）
    migrateKeysInRange(prev.hash, hash)
}

// ② 删除节点 D（顺序不可颠倒！）
function removeNode(ring: {hash:number; node:string}[], hash: number) {
    // 1. 先找出 D 顺时针方向的下一个节点 N
    const idx = ring.findIndex(e => e.hash === hash)
    const next = ring[(idx + 1) % ring.length]

    // 2. 把 D 负责的 key 全部迁移到 N —— 必须等迁移完成
    migrateKeysTo(next, hash)

    // 3. 最后才从环上移除 D，更新路由
    ring.splice(idx, 1)
}

// 先搬数据，再下线 —— 顺序反了就会丢数据`

// hashRing 复用
function hashRing(key: string): number {
    let h = 0
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
    return h
}
</script>
