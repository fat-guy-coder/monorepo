<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">死锁：四必要条件、银行家算法、检测与恢复</h1><p class="text-sm text-slate-500 mt-1">互相等待对方的资源 → 谁也无法推进：从原理到 Go 的运行时死锁检测</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-c-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：循环等待 → 四条件 → 银行家算法</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">死锁的经典画面：<strong>进程A 握着资源1 等资源2，进程B 握着资源2 等资源1</strong>——箭头连起来成一个环，谁都不肯放手，谁都等不到新资源。要判断"会不会死锁"、怎么破局，先看三张图：资源分配图成环、四个必要条件、银行家算法的安全序列推演。</p>

        <!-- 结构图：资源分配图 + 四条件 + 银行家算法 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 470" class="w-full h-auto">
            <defs><marker id="dl-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- ① 循环等待资源分配图 -->
            <text x="40" y="26" font-size="13" font-weight="bold" fill="#334155" font-family="monospace">① 循环等待 · 资源分配图：互持资源、互等对方 → 箭头成环</text>
            <rect x="70" y="40" width="90" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="115" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">进程A</text>
            <text x="115" y="73" text-anchor="middle" font-size="9" fill="#b45309" font-family="monospace">持R1 · 等R2</text>
            <rect x="245" y="40" width="90" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="290" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1" font-family="monospace">资源1</text>
            <text x="290" y="73" text-anchor="middle" font-size="9" fill="#0c4a6e" font-family="monospace">被A持有</text>
            <rect x="245" y="150" width="90" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="290" y="168" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">进程B</text>
            <text x="290" y="183" text-anchor="middle" font-size="9" fill="#b45309" font-family="monospace">持R2 · 等R1</text>
            <rect x="70" y="150" width="90" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="115" y="168" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1" font-family="monospace">资源2</text>
            <text x="115" y="183" text-anchor="middle" font-size="9" fill="#0c4a6e" font-family="monospace">被B持有</text>
            <!-- 环：P1请求R2 / R2分配P2 / P2请求R1 / R1分配P1 -->
            <line x1="115" y1="80" x2="115" y2="150" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#dl-a)"/>
            <line x1="160" y1="170" x2="245" y2="170" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#dl-a)"/>
            <line x1="290" y1="150" x2="290" y2="80" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#dl-a)"/>
            <line x1="245" y1="60" x2="160" y2="60" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#dl-a)"/>
            <text x="128" y="120" font-size="9" fill="#64748b" font-family="monospace">请求</text>
            <text x="192" y="181" font-size="9" fill="#64748b" font-family="monospace">分配</text>
            <text x="298" y="120" font-size="9" fill="#64748b" font-family="monospace">请求</text>
            <text x="192" y="52" font-size="9" fill="#64748b" font-family="monospace">分配</text>
            <text x="40" y="210" font-size="11" fill="#b91c1c" font-family="monospace">循环：P1→R2→P2→R1→P1 🔴 四个条件同时满足，谁都推进不了</text>
            <!-- ② 四条件拆解 -->
            <text x="40" y="240" font-size="13" font-weight="bold" fill="#334155" font-family="monospace">② 四必要条件（Coffman 1971）：同时满足四者才「可能」死锁，破坏任一即可防</text>
            <rect x="40" y="250" width="165" height="44" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>
            <text x="122" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">① 互斥</text>
            <text x="122" y="286" text-anchor="middle" font-size="9" fill="#b45309" font-family="monospace">一次只能一个进程用</text>
            <rect x="213" y="250" width="165" height="44" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.2"/>
            <text x="295" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#0e7490" font-family="monospace">② 占有并等待</text>
            <text x="295" y="286" text-anchor="middle" font-size="9" fill="#155e75" font-family="monospace">持有一个又等另一个</text>
            <rect x="386" y="250" width="165" height="44" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>
            <text x="468" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">③ 不可剥夺</text>
            <text x="468" y="286" text-anchor="middle" font-size="9" fill="#b45309" font-family="monospace">不能强行抢走</text>
            <rect x="559" y="250" width="165" height="44" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="641" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569" font-family="monospace">④ 循环等待</text>
            <text x="641" y="286" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">资源分配图成环</text>
            <!-- ③ 银行家算法 -->
            <text x="40" y="322" font-size="13" font-weight="bold" fill="#334155" font-family="monospace">③ 银行家算法 · 安全序列推演（总资源 12，初始 Available=3）</text>
            <text x="55" y="352" font-size="11" font-weight="bold" fill="#64748b" font-family="monospace">进程</text>
            <text x="150" y="352" font-size="11" font-weight="bold" fill="#64748b" font-family="monospace">分配</text>
            <text x="240" y="352" font-size="11" font-weight="bold" fill="#64748b" font-family="monospace">需求</text>
            <line x1="55" y1="358" x2="270" y2="358" stroke="#cbd5e1" stroke-width="1"/>
            <text x="55" y="376" font-size="11" fill="#0f172a" font-family="monospace">P0</text><text x="150" y="376" font-size="11" fill="#0f172a" font-family="monospace">5</text><text x="240" y="376" font-size="11" fill="#0f172a" font-family="monospace">5</text>
            <text x="55" y="396" font-size="11" fill="#0f172a" font-family="monospace">P1</text><text x="150" y="396" font-size="11" fill="#0f172a" font-family="monospace">2</text><text x="240" y="396" font-size="11" fill="#0f172a" font-family="monospace">2</text>
            <text x="55" y="416" font-size="11" fill="#0f172a" font-family="monospace">P2</text><text x="150" y="416" font-size="11" fill="#0f172a" font-family="monospace">2</text><text x="240" y="416" font-size="11" fill="#0f172a" font-family="monospace">7</text>
            <text x="55" y="440" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">Available = 3（空闲）</text>
            <text x="430" y="352" font-size="11" fill="#0f766e" font-family="monospace">① P1：需求 2 ≤ 3 ✓ 完成 → Avail=5</text>
            <text x="430" y="380" font-size="11" fill="#0f766e" font-family="monospace">② P0：需求 5 ≤ 5 ✓ 完成 → Avail=10</text>
            <text x="430" y="408" font-size="11" fill="#0f766e" font-family="monospace">③ P2：需求 7 ≤ 10 ✓ 完成 → Avail=12</text>
            <text x="430" y="440" font-size="11" font-weight="bold" fill="#15803d" font-family="monospace">✅ 全部 Finish → 安全序列 P1→P0→P2</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">① 循环等待：P1 等 R2（被 P2 持），P2 等 R1（被 P1 持），箭头成环；② 死锁的必要条件必须同时满足；③ 银行家算法：只要还存在一个"能跑完"的安全序列就分配，否则拒绝</figcaption>
        </figure>
      </section>

      <!-- 1. 死锁是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>死锁是什么：互相等待、永远无法推进</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">死锁（deadlock）指<strong>两个及以上进程/线程，每个都持有一个资源、同时又在等对方手里的资源</strong>，结果谁都无法继续执行。它不同于一般的"慢"——不是排队等一会儿，而是<strong>永远等不到</strong>，除非外力干预。</p>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">死锁 = 每个参与者都在「等一个永远不会被释放的资源」</p>
          <p class="text-xs text-amber-600 text-center">关键特征：资源被占着不释放 + 等待关系成环 + 没有进程能主动打破局面</p>
        </div>
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200 mb-4">
          <p class="text-sm font-semibold text-blue-900 mb-1">先澄清两个高频误解</p>
          <p class="text-xs text-blue-700 leading-relaxed">① 死锁≠进程"卡住"。卡住可能是它自己在等慢 IO；死锁是<strong>互相</strong>等，是一个系统级状态。② 死锁不消耗 CPU——所有相关进程都在<strong>阻塞</strong>状态，什么都不做。这决定了后文"检测"的线索：资源怎么都分配不出去。</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>两个 async 函数<strong>互相 await</strong>——<code class="bg-purple-100 px-1 rounded text-xs font-mono">a()</code> 内部 <code class="bg-purple-100 px-1 rounded text-xs font-mono">await b()</code>，<code class="bg-purple-100 px-1 rounded text-xs font-mono">b()</code> 内部又 <code class="bg-purple-100 px-1 rounded text-xs font-mono">await a()</code>，两个 Promise 都永远 pending，谁也不会 resolve。数据库里两个事务互相等对方锁住的行也是同一回事——最终靠"超时回滚一方"来打破，这正是后文要讲的<strong>检测 + 恢复</strong>。</p>
        </aside>
      </section>

      <!-- 2. 四必要条件 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>四必要条件（Coffman, 1971）——死锁的必要而非充分条件</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Coffman 等人总结：死锁发生<strong>必须同时</strong>满足下面四个条件。它是"必要条件"不是"充分条件"——四者都满足只是<strong>可能</strong>死锁；但反过来，<strong>只要破坏其中任意一个，死锁就不可能发生</strong>。这给了我们第一个朴素的应对思路：从源头掐掉某个条件。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">条件</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">怎么破坏它</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go / 现实映射</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">① 互斥 Mutual Exclusion</td><td class="px-4 py-2 border">一个资源同一时刻只能被一个进程使用</td><td class="px-4 py-2 border">允许共享（读-读共享）——但很多资源天生互斥，很难破坏</td><td class="px-4 py-2 border">sync.Mutex 就是制造"互斥"的工具</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">② 占有并等待 Hold-and-Wait</td><td class="px-4 py-2 border">已握有一个资源，又去申请别的资源</td><td class="px-4 py-2 border">一次性申请全部所需资源（all-or-nothing），拿不全就全不拿</td><td class="px-4 py-2 border">一个函数里嵌套加多把锁，就是典型占有并等待</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">③ 不可剥夺 No-Preemption</td><td class="px-4 py-2 border">进程占有的资源不能被强行抢走</td><td class="px-4 py-2 border">允许抢占：申请不到就强制释放已持有的（实现复杂、可能引入饥饿）</td><td class="px-4 py-2 border">CPU 时间片轮转就是可剥夺；Go 的 Mutex 不可抢占</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">④ 循环等待 Circular Wait</td><td class="px-4 py-2 border">进程间的等待关系连成一个环</td><td class="px-4 py-2 border">给资源全局编号，所有进程按编号<b>升序</b>申请 → 环不可能出现</td><td class="px-4 py-2 border">Go 里的"统一锁顺序"就是在破这一条</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆锚点：</strong>把四条件连起来记——"独享、端着不撒手、抢不走、绕成一个圈"，四个齐了就死锁。<strong>破一个就没事</strong>，这是后文"预防"策略的全部依据。</p>
        </aside>
      </section>

      <!-- 3. 资源分配图与环检测 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>资源分配图与环检测</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">"循环等待"的图论表达就是<strong>资源分配图</strong>：节点分两类——<strong>进程</strong>（圆圈）和<strong>资源</strong>（方块）；边分两类——进程 → 资源 是<strong>请求边</strong>，资源 → 进程 是<strong>分配边</strong>。如果图中出现了<strong>环</strong>，就说明存在循环等待。检测死锁≈在资源分配图里找环（DFS/BFS 即可）。</p>
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200 mb-4">
          <p class="text-sm font-semibold text-blue-900 mb-1">环 = 一定死锁吗？关键看"同类资源有几个实例"</p>
          <p class="text-xs text-blue-700 leading-relaxed">每类资源<strong>只有 1 个实例</strong>时：有环必死锁（环上每个进程等的那份资源，一定在环内另一个进程手里）。但每类资源<strong>有多个实例</strong>时：环<strong>不一定</strong>死锁——比如环里 P 在等资源 R 的一个实例，而这个实例可能由<strong>环外</strong>的进程持有，那进程随时可能释放它，P 就能拿到而解脱。所以系统只在"每类单实例"时才用"有环即有死锁"的简化结论，通用情况要结合 Available 细算。</p>
        </div>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">画资源分配图：把"谁持有谁、谁在等谁"的请求边 / 分配边画出来。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">DFS 找环：从任意进程出发做深度优先遍历，只要再次回到已访问节点，就是找到环。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">判定：每类单实例 → 有环即死锁；多实例 → 有环还需进一步验算（用银行家算法思路）。</div></li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>资源分配图 ≈ 前端<strong>依赖图</strong>里画"谁等谁"的等待链。前端排查无限 loading 时，把 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.all</code> 的依赖链画出来，只要依赖指向自己（自环）或成环，就定位到了"循环依赖导致的死锁"。</p>
        </aside>
      </section>

      <!-- 4. 四类应对策略总览 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>四类应对策略总览</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">业界对付死锁有四条路线，从"不让它发生"到"发生了再说"。难度、开销、可用性依次递减，现实系统往往混用。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">策略</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时机</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">手段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">代价 / 局限</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">预防 Prevention</td><td class="px-4 py-2 border">设计期</td><td class="px-4 py-2 border">直接破坏四个必要条件之一（锁顺序、一次全申请）</td><td class="px-4 py-2 border">简单可靠，但资源利用率低、约束死板</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">避免 Avoidance</td><td class="px-4 py-2 border">每次分配前</td><td class="px-4 py-2 border">银行家算法：先演练，仅当仍保持安全才批准</td><td class="px-4 py-2 border">需预先知道每个进程的 Max，现实中几乎拿不到</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">检测 + 恢复 Detection &amp; Recovery</td><td class="px-4 py-2 border">运行期</td><td class="px-4 py-2 border">定时找环，发现后抢占 / 回滚 / 杀进程</td><td class="px-4 py-2 border">允许死锁短暂发生，靠恢复兜底，恢复本身有开销</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">鸵鸟策略 Ostrich</td><td class="px-4 py-2 border">全程</td><td class="px-4 py-2 border">假装没看见，死锁概率低 → 重启了事</td><td class="px-4 py-2 border">Linux / Windows 的默认态度，简单粗暴</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 现实取舍：</strong>纯"预防"太浪费资源，纯"鸵鸟"风险大。绝大多数操作系统走的是 <strong>鸵鸟为主 + 检测兜底</strong>：成本低、命中率低、真出问题就重启。而单机应用（数据库、Go 并发程序）因为控制面小，才敢用更激进的"避免"或严格的"预防"。</p>
        </aside>
      </section>

      <!-- 5. 预防 prevention -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>预防：直接破坏四条件之一</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>破坏②占有并等待</strong>——资源一次性全部申请：进程开工前一口气申请所有资源，<strong>要么全给、要么一个不给</strong>（all-or-nothing），拿到手之前不干活。代价：资源利用率低——进程可能为了后面才用到的资源提前占着。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>破坏④循环等待</strong>——资源全局编号、按序申请：给每把锁/资源一个全局唯一编号，任何代码只能<strong>从小编号往大编号</strong>申请。因为申请方向永远一致，环就组不起来。Go 里的"统一锁顺序"正是这招。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>破坏③不可剥夺</strong>——允许抢占：申请不到时强制释放已持有的（CPU 用时间片轮转实现）。缺点：实现复杂、频繁抢占会<strong>饿死</strong>低优先级进程，常用于 CPU 这类可中断资源，不常用于数据库行锁。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>破坏①互斥</strong>——最困难：让资源可共享（读写锁的读-读共享）。但像打印机、单写文件这类资源天然互斥，破坏不了，所以这条很少被当成"预防手段"。</span></li>
        </ul>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 什么时候值得用预防：</strong>锁的数量少、且你已经完全掌控加锁路径（比如自研并发库、内部工具）。约束越死，通常越难兼顾并发度——所以预防更适合"少数几把锁"的场合。</p>
        </aside>
      </section>

      <!-- 6. 避免：银行家算法 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>避免：银行家算法（Banker's Algorithm）⭐</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">预防太粗暴，避免更聪明：<strong>每次分配前先"演习"</strong>——假装把资源分出去，看看系统还能不能保证有一个"安全序列"。所谓<strong>安全状态</strong>，就是存在某个执行顺序，能让所有进程都能依次拿到资源、跑完、把资源交回来。<strong>只在不破坏安全状态的前提下才真的分配</strong>。名字来自银行放贷：银行不会因为一笔贷款把整个资金链搞死。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">四张表：Available / Max / Allocation / Need</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数据结构</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例（本文档用单类资源 12 单位）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">Available</td><td class="px-4 py-2 border">当前空闲资源数（每个资源类型一个值）</td><td class="px-4 py-2 border font-mono text-xs">Avail = 3</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Max</td><td class="px-4 py-2 border">每个进程声明的<b>最大</b>需求（⭐ 前提：进程必须预先申报）</td><td class="px-4 py-2 border font-mono text-xs">Max = [10, 4, 9]</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Allocation</td><td class="px-4 py-2 border">每个进程当前已分到的资源</td><td class="px-4 py-2 border font-mono text-xs">Alloc = [5, 2, 2]</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Need = Max − Allocation</td><td class="px-4 py-2 border">每个进程<b>还差多少</b>才能跑完</td><td class="px-4 py-2 border font-mono text-xs">Need = [5, 2, 7]</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">安全性算法：找安全序列</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>初始化</strong>：Work = Available，所有进程 Finish[i] = false。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>找候选</strong>：找一个 Finish=false 且 Need[i] ≤ Work 的进程 i；找不到就跳第 4 步。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>模拟完成</strong>：Work += Allocation[i]，Finish[i] = true，回到第 2 步继续找。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>判定</strong>：所有 Finish 都为 true → <strong>安全</strong>；否则 → <strong>不安全</strong>（这次分配会被拒绝）。</div></li>
        </ol>
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200 mb-4">
          <p class="text-sm font-semibold text-blue-900 mb-1">推演：初始 Avail=3，Need=[5,2,7]，Alloc=[5,2,2]</p>
          <p class="text-xs text-blue-700 leading-relaxed font-mono">Work=3 → P1（Need 2≤3）完成，Work=3+2=5 → P0（Need 5≤5）完成，Work=5+5=10 → P2（Need 7≤10）完成，Work=10+2=12。全部 Finish → <strong>安全，安全序列 P1→P0→P2</strong>。</p>
          <p class="text-xs text-red-700 leading-relaxed mt-2 font-mono">反例：假设这时 P2 再申请 1 个单位。演习：Avail 变 2，P2 的 Alloc=3、Need=6。再跑安全性算法：P1（Need 2≤2）完成，Work=4；此后 P0（Need 5&gt;4）、P2（Need 6&gt;4）都跑不完 → <strong>不安全，拒绝这次分配</strong>。</p>
        </div>
        <div class="mb-4"><Code language="go" :code="bankerCode" title="banker.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 为什么现实中几乎不用？</strong>银行家算法要求每个进程<strong>预先申报最大需求 Max</strong>——可真实程序通常不知道也不愿意说自己最多要多少资源。所以它在教材里是明星，在生产环境里是稀有动物；倒是"申请前先看看够不够、不行就等"的<strong>朴素思想</strong>到处在用。</p>
        </aside>
      </section>

      <!-- 7. 检测恢复 + 鸵鸟 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>检测 + 恢复，以及鸵鸟策略</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">既然"避免"太贵，那就允许死锁偶尔发生，但<strong>及时发现、及时解套</strong>——这就是"检测 + 恢复"。检测的核心是前面讲过的<strong>找环</strong>；恢复有三板斧。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">恢复三板斧</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>抢占（Preemption）</strong>：从死锁进程手里抢资源，分配给环里等着的人——前提是资源可剥夺，且要注意"被抢者"可能只做了一半，数据要能回退。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>回滚（Rollback + Checkpoint）</strong>：定期存检查点；死锁时把进程<strong>回滚到上一个检查点</strong>重新执行，而不是从零开始。数据库事务的"超时回滚"就是这一板斧。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>杀掉进程（Kill）</strong>：挑一个"牺牲者"终止，把它占的资源吐出来。选谁杀？看代价：优先级低、已运行时间短、占用资源多、还差一点就完成的先被牺牲。</div></li>
        </ol>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">鸵鸟策略：把头埋进沙子里</p>
          <p class="text-xs text-amber-600 text-center">死锁发生率极低、检测与恢复的成本却很高 → 默认"假装没发生"，真卡住了就<strong>重启了事</strong>。Linux、Windows 对大部分死锁就是这个态度。</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>前端的"杀掉进程" ≈ 页面白屏时<strong>强制刷新 / reload</strong>；数据库的"回滚" ≈ 事务超时后自动 <code class="bg-purple-100 px-1 rounded text-xs font-mono">ROLLBACK</code> 重新来过；"鸵鸟策略" ≈ 线上偶发卡死，先重启，攒够复现证据再深挖。</p>
        </aside>
      </section>

      <!-- 8. 活锁 / 饥饿 / 死锁 对比 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>死锁 vs 活锁 vs 饥饿</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">三个"卡住"的亲戚经常被混为一谈，但它们状态完全不同：死锁是<strong>阻塞不动</strong>，活锁是<strong>一直在动但没进展</strong>，饥饿是<strong>一直轮不到</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">死锁 Deadlock</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">活锁 Livelock</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">饥饿 Starvation</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">进程状态</td><td class="px-4 py-2 border">全部<strong>阻塞</strong>，什么都不做</td><td class="px-4 py-2 border">都在<strong>运行</strong>，状态来回变</td><td class="px-4 py-2 border">被"晾着"等待，别人在跑</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">消耗 CPU</td><td class="px-4 py-2 border">否（全睡着）</td><td class="px-4 py-2 border">是（空转还占 CPU）</td><td class="px-4 py-2 border">被饿死的进程不占；调度器在跑</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">能否自行解除</td><td class="px-4 py-2 border">不能，必须外力</td><td class="px-4 py-2 border">可能：加随机退避就能打破</td><td class="px-4 py-2 border">可能：公平调度/排队能缓解</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">经典例子</td><td class="px-4 py-2 border">A 等 B 的资源，B 等 A 的资源</td><td class="px-4 py-2 border">窄走廊两人互相让路，左让右右让左</td><td class="px-4 py-2 border">低优先级进程永远抢不到 CPU</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">应对</td><td class="px-4 py-2 border">预防/避免/检测恢复</td><td class="px-4 py-2 border">随机退避（退避时长加随机抖动）</td><td class="px-4 py-2 border">老化 aging、公平锁、队列</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 区分口诀：</strong>死锁<strong>不动</strong>（CPU 空闲）、活锁<strong>乱动</strong>（CPU 空转）、饥饿<strong>想动动不了</strong>（永远是别人在动）。排查时先看 CPU：不涨多半死锁，蹭蹭涨多半活锁。</p>
        </aside>
      </section>

      <!-- 9. Go 复现死锁 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">9</span>Go 复现死锁：双 Mutex + Channel</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">在 Go 里复现死锁非常容易：两个 goroutine 各拿一把锁、又各去等对方手里的另一把，加锁顺序<strong>相反</strong>即成环。跑起来你会看到 Go 运行时的招牌报错——<code class="bg-slate-100 px-1 rounded text-xs font-mono">fatal error: all goroutines are asleep - deadlock!</code>，这正是第 7 节"检测"策略在 Go 里的实现。</p>
        <div class="mb-4"><Code language="go" :code="deadlockMutexCode" title="deadlock-mutex.go" /></div>
        <div class="mb-4"><Code language="go" :code="channelDeadlockCode" title="channel-deadlock.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 怎么读懂那条报错：</strong>"all goroutines are asleep" = 所有 goroutine（包括 main）都阻塞了，且没有任何可被唤醒的未来事件——调度器断定世界已经静止，直接以 <code class="bg-blue-100 px-1 rounded text-xs font-mono">fatal error</code> 崩溃。这是 Go 帮你把"检测死锁"做了，而 C/C++ 可没这待遇——死锁只会让程序无声地卡死。</p>
        </aside>
      </section>

      <!-- 10. Go 解法示例 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">10</span>Go 解法：锁顺序、超时、一次只拿一个锁</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">回到第 5、6 节的理论：<strong>统一锁顺序</strong>是破坏"循环等待"的预防；<strong>select + timeout / context</strong> 是"避免 + 兜底"——等不到就撤离，绝不无限等待。三者都用上，才是健康的并发代码。</p>
        <div class="mb-4"><Code language="go" :code="fixLockOrderCode" title="fix-lock-order.go" /></div>
        <div class="mb-4"><Code language="go" :code="fixSelectTimeoutCode" title="fix-timeout.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一条务实的铁律：</strong>能<strong>一次只拿一把锁</strong>就别拿两把。嵌套多把锁是死锁的第一来源——很多场景把"全局状态"拆细、或改用 channel 传递，根本不需要同时锁两样东西。</p>
        </aside>
      </section>

      <!-- 11. 常见坑 -->
      <section id="sec-11" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">11</span>⚠️ 常见坑</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>以为死锁只发生在多核机器上</strong>——错。单核上两个 goroutine 通过时间片切换，照样能互相卡死。死锁是"资源等待关系"问题，与 CPU 数量无关。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>只记得加锁、不设计加锁顺序</strong>——死锁头号来源。两处代码顺序一不一致，就是死锁与不死的分界线；且死锁只在特定时序下触发，<strong>单测很难复现，线上偶发卡死</strong>，特别难查。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>用 timeout 掩盖逻辑 bug</strong>——超时后默默重试或吞错，看似"防死锁"，实则把死锁变成"偶发超时/偶发失败"，掩盖了锁顺序或共享状态设计上的真问题。超时是<strong>兜底</strong>，不是解药。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>把"channel 忘记关闭"误当成死锁</strong>——两者表现不同。发送方忘了 close，接收方 <code class="bg-slate-100 px-1 rounded text-xs font-mono">range ch</code> 会<strong>一直阻塞但不算死锁</strong>（因为还有别的 goroutine 在跑），这其实是<strong>goroutine 泄漏</strong>：内存悄悄涨、程序不报错。对照：死锁是"全部睡着"立刻崩溃，泄漏是"一个睡着"悄悄耗资源。</span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 记忆：</strong>"全睡着"是死锁（运行时会 fatal），"一个不醒"是泄漏（运行时不报）——报错的是死锁，不报错悄悄变坏的才是更阴险的坑。</p>
        </aside>
      </section>

      <!-- ⭐ 与 Go 底层实现的关系 -->
      <section id="sec-go" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⭐</span>与 Go 底层实现的关系</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Go 是把"死锁检测"做进<strong>运行时（runtime）</strong>的少数语言之一。调度器（G 与 M 的管理者）在每次调度循环里检查：如果<strong>所有 goroutine 都处于阻塞态、且没有任何网络/定时器/channel 事件可能在未来唤醒它们</strong>，就直接判定死锁，抛出 <code class="bg-slate-100 px-1 rounded text-xs font-mono">fatal error: all goroutines are asleep - deadlock!</code>。这正是操作系统的"检测 + 恢复"策略：检测到就终止（恢复 = 崩溃重启）。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>channel 死锁的典型场景</strong>：无缓冲 channel 发送但无人接收（本文第 9 节）；双向 channel 的收发顺序错位；<code class="bg-slate-100 px-1 rounded text-xs font-mono">WaitGroup</code> 计数与 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Done()</code> 对不上，主 goroutine 永远 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Wait()</code>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>锁死锁的高发姿势</strong>：两把以上 Mutex 嵌套 + 顺序不一致（对应"循环等待"条件）；同一个 goroutine 对同一个 Mutex 加两次锁（<strong>sync.Mutex 不可重入</strong>，会自锁）；<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Once</code> 的回调里又调用了同一个 Once，触发内部阻塞。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>Go 哲学天然降低死锁面</strong>：官方倡导"<strong>不共享内存，通过通信传递</strong>"——优先用 channel 而不是共享变量 + 多把锁。channel 每次只等一个通信、谁发谁收清晰，比"同时攥着 N 把锁"更容易推理、更少成环。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>对照 goroutine 泄漏</strong>：死锁 = <strong>全部</strong> goroutine 阻塞 → 运行时立刻崩溃；泄漏 = 只有<strong>个别</strong> goroutine 永远阻塞、其它还在跑 → 运行时<strong>不报错</strong>，内存悄悄涨。二者是"全睡"与"单睡"的区别。跳转阅读：<Link :route="'go-2-13-goroutine-leak'" :text="'goroutine 泄漏排查'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> · <Link :route="'go-2-2-channels'" :text="'channel 基础与收发配对'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>Go 里"避免 + 兜底"的具体落地</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">select</code> + <code class="bg-slate-100 px-1 rounded text-xs font-mono">time.After</code>（等不到就超时放弃，打破等待链）、<code class="bg-slate-100 px-1 rounded text-xs font-mono">context</code>（超时 + 取消，主动撤离并通知下游）、统一锁顺序（破坏循环等待）。</div></li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Go 运行时的死锁检测 ≈ 前端的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise</code> 引擎——它无法救你，但能告诉你"这个 Promise 永远不会 resolve"。两者的共同点：<strong>引擎负责发现，解决要靠写代码的人</strong>。</p>
        </aside>
      </section>

      <!-- 小结 -->
      <section id="sec-summary" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>死锁</strong> = 进程互相等对方持有的资源、永远无法推进；它是"等待关系成环"的资源问题，与 CPU 数量无关。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>四必要条件</strong>（互斥 / 占有并等待 / 不可剥夺 / 循环等待）同时满足才可能死锁；<strong>破坏任一即可预防</strong>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>资源分配图<strong>找环</strong>是检测核心；单实例有环必死锁，多实例有环还要进一步验算。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>银行家算法</strong>（避免）：分配前先演习安全序列，需预先知道 Max，现实中少用；<strong>检测 + 恢复</strong>（抢占/回滚/杀进程）和<strong>鸵鸟策略</strong>（默认重启）才是系统主力。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>死锁（全睡着、CPU 空）vs 活锁（乱动、CPU 空转）vs 饥饿（想动动不了）——看 CPU 先分辨。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>Go 运行时自带<strong>死锁检测</strong>（all goroutines are asleep）；落地手段：统一锁顺序、select+timeout、context、一次只拿一把锁。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-2-13-goroutine-leak'" :text="'goroutine 泄漏（对照死锁）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-2-channels'" :text="'channel 收发配对'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-c-3-semaphore'" :text="'← 上一节：信号量与条件变量'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-d-1-paging'" :text="'下一节：分页机制：页表、多级页表、TLB →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "死锁是什么" },
  { id: "sec-2", name: "四必要条件" },
  { id: "sec-3", name: "资源分配图与环" },
  { id: "sec-4", name: "四类应对策略" },
  { id: "sec-5", name: "预防 prevention" },
  { id: "sec-6", name: "避免：银行家算法" },
  { id: "sec-7", name: "检测恢复与鸵鸟" },
  { id: "sec-8", name: "活锁/饥饿/死锁对比" },
  { id: "sec-9", name: "Go 复现死锁" },
  { id: "sec-10", name: "Go 解法示例" },
  { id: "sec-11", name: "⚠️ 常见坑" },
  { id: "sec-go", name: "与 Go 底层的关系" },
  { id: "sec-summary", name: "📋 小结" },
]

// ===== 代码示例 =====
const deadlockMutexCode = `// go run deadlock-mutex.go —— 经典双锁死锁
// 目标：复现 Go 运行时死锁检测的招牌报错
package main

import (
	"fmt"
	"sync"
	"time"
)

var (
	muA, muB sync.Mutex
	wg       sync.WaitGroup
)

func main() {
	wg.Add(2)

	go func() { // G1：先拿 A，再拿 B
		defer wg.Done()
		muA.Lock()
		defer muA.Unlock()
		fmt.Println("G1: 拿到 muA，等 muB...")
		time.Sleep(50 * time.Millisecond) // 故意让出：给 G2 时间拿到 muB
		muB.Lock()                        // 卡死：muB 被 G2 占着
		defer muB.Unlock()
		fmt.Println("G1 完成")
	}()

	go func() { // G2：先拿 B，再拿 A —— 与 G1 顺序相反 → 循环等待
		defer wg.Done()
		muB.Lock()
		defer muB.Unlock()
		fmt.Println("G2: 拿到 muB，等 muA...")
		time.Sleep(50 * time.Millisecond)
		muA.Lock() // 卡死：muA 被 G1 占着
		defer muA.Unlock()
		fmt.Println("G2 完成")
	}()

	wg.Wait() // main 也阻塞 —— 三个 goroutine 全睡着
}
// 输出：
// G1: 拿到 muA，等 muB...
// G2: 拿到 muB，等 muA...
// fatal error: all goroutines are asleep - deadlock!`;
const channelDeadlockCode = `// go run channel-deadlock.go —— 无缓冲 channel 死锁
package main

import "fmt"

func main() {
	ch := make(chan int) // 无缓冲：发送必须有接收者配对才返回

	ch <- 1              // 阻塞：没有任何接收者，发送者永远等不到
	fmt.Println("这条不会打印出来")
}
// 输出：
// fatal error: all goroutines are asleep - deadlock!
// goroutine 1 [chan send]:
// main.main() .../channel-deadlock.go:10 +0x...`;
const fixLockOrderCode = `// 解法一：锁顺序全局一致（先 A 后 B）→ 破坏「循环等待」
// 只要所有 goroutine 都按同一顺序加锁，等待链就组不成环
func g1() {
	muA.Lock()
	defer muA.Unlock()
	muB.Lock() // 顺序固定：A 永远在 B 之前申请
	defer muB.Unlock()
}

func g2() {
	muA.Lock() // 与 g1 完全相同的顺序
	defer muA.Unlock()
	muB.Lock()
	defer muB.Unlock()
}
// 关键：给每把锁定义全局唯一编号，任何代码只能「从小到大」申请
// —— 这对应操作系统里的「资源编号、按序申请」，破坏循环等待`;
const fixSelectTimeoutCode = `// 解法二：select + time.After / context 超时 —— 绝不无限等待
// 拿不到资源就「撤离」，打破等待链（对应「避免 + 兜底」）

// ① 用缓冲 channel 当「可超时的锁」（信号量思想，size 为 1）
func tryLockWithTimeout(sem chan struct{}, d time.Duration) bool {
	select {
	case sem <- struct{}{}: // 拿锁成功
		return true
	case <-time.After(d):   // 超时放弃，绝不无限等
		return false
	}
}

// ② 等结果也可以用 context 超时 / 取消
func waitResult(ctx context.Context, workCh chan string) {
	select {
	case res := <-workCh:
		fmt.Println("拿到结果:", res)
	case <-ctx.Done(): // 外层 context 超时或取消
		fmt.Println("等太久，主动撤离，不无限等待")
	}
}`;
const bankerCode = `// 银行家算法：分配前先「演习」，只在仍保持安全状态时才批准
package main

import "fmt"

// 单类资源示例：总资源 12，3 个进程
var total = 12
var alloc = []int{5, 2, 2}   // 各进程已分配
var max   = []int{10, 4, 9}  // 各进程最大需求（进程必须预先申报）
var avail = 3                // 空闲资源

func need(i int) int { return max[i] - alloc[i] }

// 安全性算法：能排出安全序列则返回 true
func isSafe() bool {
	work := avail
	finish := []bool{false, false, false}
	seq := []int{}
	for {
		found := false
		for i := 0; i < len(alloc); i++ {
			if !finish[i] && need(i) <= work { // 找一个能跑完的
				work += alloc[i]               // 模拟回收它占的资源
				finish[i] = true
				seq = append(seq, i)
				found = true
			}
		}
		if !found {
			break // 一轮没找到新的可完成进程
		}
	}
	ok := finish[0] && finish[1] && finish[2]
	fmt.Printf("安全序列候选: %v，系统安全=%v\\n", seq, ok)
	return ok
}

func main() {
	fmt.Println("初始: Avail=", avail, "Alloc=", alloc,
		"Need=", []int{need(0), need(1), need(2)})
	isSafe()
}
// 输出：
// 初始: Avail= 3 Alloc= [5 2 2] Need= [5 2 7]
// 安全序列候选: [1 0 2]，系统安全=true`;
</script>
