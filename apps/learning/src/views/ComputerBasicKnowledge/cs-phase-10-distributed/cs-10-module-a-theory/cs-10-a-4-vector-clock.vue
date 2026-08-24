<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">向量时钟（Vector Clock）</h1>
          <p class="text-sm text-slate-500 mt-1">因果排序与并发判定 —— 分布式系统判断"谁先发生"的标准工具</p>
        </div>
        <div class="flex items-center gap-3"><span
            class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">分布式理论 10-a-4</span></div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：进程各持一个
          N 维向量</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">N 个进程的系统里，每个进程维护一个 <strong>长度 N 的整数向量</strong>：第 i
          位记录"我已知的、进程 i 上的事件数"。发送消息时带上自己的向量；收到消息时<strong>逐分量取 max 再自增</strong>——这就是全部规则。</p>

        <!-- 结构图：两进程 + 各自向量 + 消息携带向量 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 250" class="w-full h-auto">
            <defs>
              <marker id="vc-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
              </marker>
            </defs>
            <!-- 进程 P0 -->
            <rect x="30" y="34" width="210" height="66" rx="10" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="135" y="62" text-anchor="middle" font-size="14" font-weight="bold" fill="#0369a1"
              font-family="monospace">进程 P0</text>
            <text x="135" y="84" text-anchor="middle" font-size="12" fill="#0f172a" font-family="monospace">本地事件 ·
              发送消息</text>
            <rect x="44" y="108" width="182" height="28" rx="6" fill="#06b6d4" />
            <text x="135" y="127" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff"
              font-family="monospace">V0 = [1, 0]</text>
            <!-- 进程 P1 -->
            <rect x="520" y="34" width="210" height="66" rx="10" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="625" y="62" text-anchor="middle" font-size="14" font-weight="bold" fill="#0369a1"
              font-family="monospace">进程 P1</text>
            <text x="625" y="84" text-anchor="middle" font-size="12" fill="#0f172a" font-family="monospace">接收消息 ·
              本地事件</text>
            <rect x="534" y="108" width="182" height="28" rx="6" fill="#06b6d4" />
            <text x="625" y="127" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff"
              font-family="monospace">V1 = [1, 2]</text>
            <!-- 消息 -->
            <line x1="240" y1="80" x2="520" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"
              marker-end="url(#vc-a)" />
            <rect x="282" y="62" width="196" height="28" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1" />
            <text x="380" y="81" text-anchor="middle" font-size="11" fill="#b45309" font-family="monospace">发送 (m, V0 =
              [1, 0])</text>
            <!-- 合并规则注记 -->
            <rect x="30" y="164" width="700" height="64" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
            <text x="50" y="190" font-size="12" fill="#475569" font-family="monospace">规则3 · 接收合并：P1 先逐分量取 max：V1[0] =
              max(V1[0]=0, V0[0]=1) = 1</text>
            <text x="50" y="212" font-size="12" fill="#0f766e" font-family="monospace"> 再自增自己分量 V1[1]++ → V1 = [1, 2]
              （于是 V1 完整记录了 P0 的消息因果）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">向量时钟的数据结构：每个进程一份 N 维向量；消息把发送方的向量一起带走，接收方用"逐分量 max + 自己
            +1"吸收它的因果</figcaption>
        </figure>

        <!-- 操作图：接收合并 before/after -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">操作示意 · 接收合并（规则3）</h3>
            <svg viewBox="0 0 340 150" class="w-full h-auto">
              <defs>
                <marker id="vc-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
                </marker>
              </defs>
              <rect x="20" y="30" width="300" height="52" rx="10" fill="#f0fdf4" stroke="#4ade80" stroke-width="1.5" />
              <text x="170" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534"
                font-family="monospace">P1 收到前：V1 = [0, 1]</text>
              <text x="170" y="70" text-anchor="middle" font-size="10" fill="#15803d" font-family="monospace">消息携带 V0 =
                [1, 0]</text>
              <line x1="170" y1="82" x2="170" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#vc-b)" />
              <rect x="20" y="112" width="300" height="30" rx="6" fill="#06b6d4" />
              <text x="170" y="131" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff"
                font-family="monospace">V1 = max 后 [1, 1] → V1[1]++ → [1, 2]</text>
            </svg>
          </figure>
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">因果判定 · 可比 vs 不可比</h3>
            <svg viewBox="0 0 340 150" class="w-full h-auto">
              <rect x="20" y="30" width="140" height="52" rx="10" fill="#fefce8" stroke="#facc15" stroke-width="1.5" />
              <text x="90" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e"
                font-family="monospace">V0 = [1, 0]</text>
              <text x="90" y="70" text-anchor="middle" font-size="10" fill="#a16207" font-family="monospace">V1 = [1,
                2]</text>
              <text x="180" y="60" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f766e"
                font-family="monospace">≤ 全分量成立 → P0 先于 P1</text>
              <rect x="20" y="96" width="140" height="52" rx="10" fill="#f0fdf4" stroke="#4ade80" stroke-width="1.5" />
              <text x="90" y="116" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534"
                font-family="monospace">V0 = [1, 2]</text>
              <text x="90" y="136" text-anchor="middle" font-size="10" fill="#15803d" font-family="monospace">V1 = [2,
                1]</text>
              <text x="180" y="130" text-anchor="middle" font-size="12" font-weight="bold" fill="#b91c1c"
                font-family="monospace">交叉大小 → 并发（不可比）</text>
            </svg>
          </figure>
        </div>
      </section>

      <!-- 1. Lamport 时钟的问题 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么
          Lamport 时钟不够？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Lamport 时钟给每个事件一个<strong>单调递增的整数</strong>，靠它只能得到：若 a → b（a 先于 b）则
          <code
            class="bg-slate-100 px-1 rounded text-xs font-mono">C(a) &lt; C(b)</code>。但反过来<strong>不成立</strong>——计数器更大的事件，未必真的因果后发生。两个完全无关的进程，计数器可以任意穿插。
        </p>

        <div class="mb-4"><Code language="go" :code="lamportCode" title="lamport-weakness.go" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Lamport 时钟就像<strong>全局递增的 commit
              编号</strong>——GitHub 的 issue
            编号越大不代表修改越多、也不代表包含别人的改动。只有"我知道你的最新提交"这种<strong>传递信息</strong>才是因果。向量时钟记录的就是这份"我已知各副本到哪了"的信息。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 一句话记忆：</strong>Lamport
            时钟回答"谁更靠后"，向量时钟回答"<strong>谁真的看见过谁</strong>"。判断因果需要的不是单个数字，而是一整列"每个进程到哪了"。</p>
        </aside>
      </section>

      <!-- 2. 三条规则 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>定义与三条规则
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">N 个进程，向量长度 N。第 i 个分量 = "该进程已知的、进程 i 已发生的事件数"。更新向量只有三条规则：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>本地事件：</strong>自己的分量 +1。例如 P0 干一件事 → V0[0]++。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>发送消息：</strong>先自己的分量 +1，然后把<strong>整个向量</strong>附在消息里一起发出。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>接收消息：</strong>逐分量取 <code
                class="bg-slate-100 px-1 rounded text-xs font-mono">max(本地, 消息里的)</code> 吸收对方的因果，最后自己的分量再 +1。</div>
          </li>
        </ol>
        <div class="mb-4"><Code language="go" :code="vcCode" title="vector-clock.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 直觉：</strong>规则 3 里的 <code
              class="bg-blue-100 px-1 rounded text-xs font-mono">max</code>
            就是"<strong>吸收别人见过的历史</strong>"。消息带来的向量告诉我：发消息前，对方已经知道了哪些进程的多少事件——我用 max 把这些一并记住，最后再标记"我也新发生了一件"。</p>
        </aside>
      </section>

      <!-- 3. 因果判断 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>因果判断：可比
          / 不可比</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">给定事件 a（在进程 P<sub>a</sub>，向量 V<sub>a</sub>）和事件 b（进程
          P<sub>b</sub>，向量 V<sub>b</sub>），判断规则只有一条：</p>
        <div class="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">Vₐ 的每个分量 ≤ V_b 的对应分量 且至少一个严格 &lt; → a
            先于 b（a → b）</p>
          <p class="text-xs text-amber-600 text-center">否则若存在分量交叉（一个比另一个大、另一个又比它大）→ 两者<strong>并发（不可比）</strong>，谁先谁后没有定论
          </p>
        </div>
        <div class="mb-4"><Code language="go" :code="judgeCode" title="judge.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">比较结果</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">例子</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border font-mono text-xs">[1,0] ≤ [1,2]</td>
                <td class="px-4 py-2 border"><strong>可比 · a 先于 b</strong>（b 的向量覆盖了 a 的全部历史）</td>
                <td class="px-4 py-2 border">同一消息链上的一前一后</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-xs">[1,2] vs [2,1]</td>
                <td class="px-4 py-2 border"><strong>并发（不可比）</strong>：分量交叉，两边互不知道</td>
                <td class="px-4 py-2 border">两个进程各发各的、互不通信</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-xs">[2,3] == [2,3]</td>
                <td class="px-4 py-2 border">同一事件（或完全同步的副本）</td>
                <td class="px-4 py-2 border">同一份状态的镜像</td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 并发 ≠
              同时发生：</strong>并发（concurrent）在分布式里指"<strong>没有任何因果链</strong>"，两个事件可能物理上先后发生，但系统无法判定顺序。此时任一顺序都是合法的——这正是最后写入获胜（LWW）冲突消解的理论依据。
          </p>
        </aside>
      </section>

      <!-- 4. 工程应用 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>工程应用：谁在用向量时钟？
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>因果一致性（Causal
                Consistency）</strong>——AP 系统里能给出的最强一致性：用户发的评论，一定在它的回复之前被看到（即使跨数据中心）。
              <Link :route="'cs-10-a-3-consistency'" :text="'一致性模型：线性/顺序/因果/最终'" animation="none" size="small"
                class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
            </span></li>
          <li class="flex items-start gap-2"><span
              class="text-amber-500 mt-1">▸</span><span><strong>冲突检测与合并</strong>——Dynamo / Riak 用 <strong>Version
                Vector</strong>（向量时钟的副本特化）检测同一键的并发写，返回冲突版本让客户端合并。</span></li>
          <li class="flex items-start gap-2"><span
              class="text-amber-500 mt-1">▸</span><span><strong>CRDT</strong>——Automerge、Yjs 等协同编辑库，每个副本记 <code
                class="bg-slate-100 px-1 rounded text-xs font-mono">{副本ID: 已应用操作数}</code>，本质就是向量时钟，用来给并发操作分配可交换的
              ID。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>调试工具</strong>——Go
              Race Detector 的 TSan 用向量时钟判断两个 goroutine 访问是否"并发"（见《影子内存》一文）。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>多人协作文档（Google Docs 式）里，光标旁标注"小红 已看到第 42 段"，而每个段落都带
            <code class="bg-purple-100 px-1 rounded text-xs font-mono">{编辑者ID: 该编辑者在此段落写的次数}</code> —— 判断"我看到的版本 vs
            他看到的版本"是不是包含关系，用的正是向量比较。</p>
        </aside>
      </section>

      <!-- 5. 局限与变体 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>局限与变体
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">向量时钟也不是万能的，工程上有一系列变体解决它的硬伤：</p>
        <ul class="space-y-3 mb-4 text-slate-600">
          <li class="flex gap-3"><span
              class="shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-md flex items-center justify-center text-xs font-bold">⚠️</span>
            <div><strong>维度 = 进程数：</strong>每加一个节点，所有向量都要加一维。动态伸缩的集群用<strong>稳定进程集 + Version
                Vector</strong>（只对存活的副本计数）缓解。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-md flex items-center justify-center text-xs font-bold">⚠️</span>
            <div><strong>向量会无限增长：</strong>长期运行的进程计数单调递增，溢出只是时间问题。用 <code
                class="bg-slate-100 px-1 rounded text-xs font-mono">Dotted Version Vector</code>
              记录"最后一个操作"以合并并发写、避免满向量爆炸。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-md flex items-center justify-center text-xs font-bold">⚠️</span>
            <div><strong>不能排序并发事件：</strong>两个并发事件谁先谁后没有答案。需要"线性顺序"的场合（如日志总序）仍要配合时间戳或随机 tie-break。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-md flex items-center justify-center text-xs font-bold">✅</span>
            <div><strong>Versions 与 GC：</strong>Riak 等系统对"已经确认合并"的旧版本做剪枝，控制向量列表长度。</div>
          </li>
        </ul>
      </section>

      <!-- 6. 常见误区 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>常见误区
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800 leading-relaxed"><strong>❌ 误区 1："向量比较就是看总和谁大。"</strong>不对！<code
              class="bg-amber-100 px-1 rounded text-xs font-mono">[2,0]</code> 总和比 <code
              class="bg-amber-100 px-1 rounded text-xs font-mono">[1,1]</code> 大，但两者<strong>不可比</strong>（[2,0] 的第二维 0 <
              1）。<strong>逐分量 ≤ 才是先于</strong>，不是比和、不是比字典序。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800 leading-relaxed"><strong>❌ 误区
              2："收到的向量直接覆盖本地的。"</strong>不能覆盖——那样会丢掉自己这侧已经发生过、而对方还不知道的事件。必须先 <code
              class="bg-amber-100 px-1 rounded text-xs font-mono">max</code>（取并集）再 +1，两条因果链才都保留。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800 leading-relaxed"><strong>✅ 经验法则：</strong>要"判断两个事件谁看见过谁"→ 向量时钟；只想要"一个全序的编号"→
            Lamport 时钟；要"给并发写分胜负"→ 再加时间戳/副本优先级做 tie-break。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：两进程的消息与向量演化
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「发消息」观察<strong>规则2（发送前自增）→ 规则3（接收时 max 合并再自增）</strong>的完整链条；
          点「内部事件」观察规则1。留意向量何时开始交叉——交叉出现就说明两边产生了<strong>并发</strong>事件。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 V0 = [{{ V[0][0] }}, {{ V[0][1] }}]</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 V1 = [{{ V[1][0] }}, {{ V[1][1] }}]</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doSend(0, 1)" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">P0
            → P1 发消息</button>
          <button @mousedown="doSend(1, 0)" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">P1
            → P0 发消息</button>
          <button @mousedown="doInternal(0)" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">P0
            内部事件</button>
          <button @mousedown="doInternal(1)" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">P1
            内部事件</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺
            Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{ height: H + 'px' }">
          <v-stage :config="{ width: W, height: H }">
            <v-layer>
              <v-rect :config="p0RectCfg" />
              <v-rect :config="p1RectCfg" />
              <v-text :config="p0NameCfg" />
              <v-text :config="p1NameCfg" />
              <v-rect :config="p0VecRectCfg" />
              <v-rect :config="p1VecRectCfg" />
              <v-text :config="p0VecTextCfg" />
              <v-text :config="p1VecTextCfg" />
              <v-line :config="chanCfg" />
              <template v-for="m in msgs" :key="'m' + m.id">
                <v-arrow :config="msgArrowCfg(m)" />
                <v-text :config="msgLabelCfg(m)" />
              </template>
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">试一试：让 P0 连发两条给 P1，再让 P1 内部事件——观察 V1 怎么追平 V0；再让两边各自发一条不经过对方的，观察向量交叉（并发）。
        </p>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>向量时钟 = 每个进程一份 <strong>N
                维向量</strong>，第 i 位记录"已知的进程 i 的事件数"。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>三条规则：本地 +1；发送前 +1
              并带上整个向量；接收时
              <strong>逐分量 max 再 +1</strong>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>因果判断：<strong>全分量 ≤ 且至少一个严格小
                →
                先于</strong>；分量交叉 → 并发。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>工程应用：因果一致性、Dynamo/Riak
              冲突检测、CRDT
              协同编辑、TSan 竞态判定。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>变体与局限：Version
              Vector（副本特化）、Dotted
              Version Vector（防爆炸）、动态节点要剪枝。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：
          <Link :route="'cs-10-a-3-consistency'" :text="'一致性模型'" animation="none" size="small"
            class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
          ·
          <Link :route="'go-2-10-race-detection'" :text="'Go 竞态检测（TSan 用向量时钟判并发）'" animation="none" size="small"
            class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
        </p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'cs-10-a-3-consistency'" :text="'← 上一节：一致性模型：线性/顺序/因果/最终'" animation="none" size="small"
          class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
        <span class="text-slate-300 cursor-default">已是本章最后一篇 →</span>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "Lamport 的不足" },
  { id: "sec-2", name: "三条规则" },
  { id: "sec-3", name: "因果判断" },
  { id: "sec-4", name: "工程应用" },
  { id: "sec-5", name: "局限与变体" },
  { id: "sec-6", name: "常见误区" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 向量时钟动画 =====
const d = (ms: number) => new Promise(r => setTimeout(r, ms))
const H = ref(280), W = ref(760)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref(''), nid = ref(1)
const V = reactive([[0, 0], [0, 0]])
const msgs = reactive<{ id: number; from: number; to: number; prog: number }[]>([])

const fmt = (a: number[]) => `[${a[0]}, ${a[1]}]`
const maxVec = (a: number[], b: number[]) => [Math.max(a[0], b[0]), Math.max(a[1], b[1])]

const P0X = 20, P0W = 300, P1X = 440, P1W = 300, PY = 40, PH = 100, CHY = 200
const p0RectCfg = { x: P0X, y: PY, width: P0W, height: PH, fill: '#e0f2fe', cornerRadius: 10, stroke: '#0ea5e9', strokeWidth: 1.5 }
const p1RectCfg = { x: P1X, y: PY, width: P1W, height: PH, fill: '#e0f2fe', cornerRadius: 10, stroke: '#0ea5e9', strokeWidth: 1.5 }
const p0NameCfg = { x: P0X, y: PY + 12, width: P0W, text: '进程 P0', fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0369a1', align: 'center' }
const p1NameCfg = { x: P1X, y: PY + 12, width: P1W, text: '进程 P1', fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0369a1', align: 'center' }
const p0VecRectCfg = computed(() => ({ x: P0X + 40, y: PY + 45, width: P0W - 80, height: 32, fill: '#06b6d4', cornerRadius: 6, stroke: '#0891b2', strokeWidth: 1.5 }))
const p1VecRectCfg = computed(() => ({ x: P1X + 40, y: PY + 45, width: P1W - 80, height: 32, fill: '#06b6d4', cornerRadius: 6, stroke: '#0891b2', strokeWidth: 1.5 }))
const p0VecTextCfg = computed(() => ({ x: P0X + 40, y: PY + 45, width: P0W - 80, height: 32, text: `V0 = ${fmt(V[0])}`, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }))
const p1VecTextCfg = computed(() => ({ x: P1X + 40, y: PY + 45, width: P1W - 80, height: 32, text: `V1 = ${fmt(V[1])}`, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }))
const chanCfg = { points: [185, CHY, 575, CHY], stroke: '#94a3b8', strokeWidth: 1.5, dash: [4, 4] }

function msgArrowCfg(m: { from: number; to: number; prog: number }) {
  const x = 185 + 390 * m.prog
  return { points: [185, CHY, x, CHY], stroke: '#f59e0b', strokeWidth: 2, pointerLength: 8, pointerWidth: 8 }
}
function msgLabelCfg(m: { id: number; prog: number }) {
  const x = 185 + 390 * m.prog
  return { x: x - 12, y: CHY - 24, text: `m${m.id}`, fontSize: 11, fontFamily: 'monospace', fill: '#b45309' }
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) { }
  finally { await d(200); busy.value = false; status.value = '' }
}

function doSend(frm: number, to: number) {
  act(`P${frm} → P${to} 发消息`, async () => {
    V[frm][frm]++
    status.value = `规则2：P${frm} 先自增 V${frm}[${frm}]++ → V${frm} = ${fmt(V[frm])}，带上向量发送`
    await d(450)
    const m = { id: nid.value++, from: frm, to, prog: 0 }
    msgs.push(m)
    await d(250)
    while (m.prog < 1) { m.prog = Math.min(1, m.prog + 0.06); await d(30) }
    msgs.splice(msgs.indexOf(m), 1)
    status.value = `规则3：P${to} 收到，逐分量取 max：V${to}[0] = max(${V[to][0]}, ${V[frm][0]})、V${to}[1] = max(${V[to][1]}, ${V[frm][1]})，再自增自己分量`
    await d(600)
    V[to] = maxVec(V[to], V[frm])
    V[to][to]++
    status.value = `合并完成 → V${to} = ${fmt(V[to])}（已吸收 P${frm} 的全部因果）`
    await d(500)
  })
}

function doInternal(p: number) {
  act(`P${p} 内部事件`, async () => {
    V[p][p]++
    status.value = `规则1：本地事件 → V${p}[${p}]++ → V${p} = ${fmt(V[p])}`
    await d(600)
  })
}

function doReset() {
  busy.value = false
  V[0][0] = 0; V[0][1] = 0; V[1][0] = 0; V[1][1] = 0
  msgs.length = 0
  status.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const lamportCode = `// Lamport 时钟的反例：计数器大 ≠ 因果后发生
// 三个进程，各自的 Lamport 计数器 C：
//   P0：本地事件 C0=1，发消息带上 C0=1
//   P1：收到消息 C1=max(1,1)+1=2
//   P2：什么都没做，只是它自己的计数器早已到 C2=5
// 结果：C2(5) > C1(2)，但 P2 与 P0→P1 这条链路毫无关系！
// ➜ 单值 Lamport 时钟无法分辨"无关事件" —— 这就是向量时钟要解决的`;
const vcCode = `// 向量时钟三条规则（N=2 示意，通用做法向量长度 = 进程数）
var V = [2]int{0, 0}   // 本进程持有的向量

func localEvent(pid int) {
    V[pid]++            // 规则1：本地事件，自己分量 +1
}

func send(pid int) [2]int {
    V[pid]++            // 规则2：发送前，自己分量 +1
    return V            // 整个向量随消息发出
}

func recv(pid int, remote [2]int) {
    for i := range V {
        V[i] = max(V[i], remote[i])   // 规则3a：逐分量取 max，吸收对方因果
    }
    V[pid]++            // 规则3b：自己的分量再 +1
}

func max(a, b int) int { if a > b { return a }; return b }`;
const judgeCode = `// 因果判断：a 先于 b ⇔ 逐分量 ≤ 且至少一个严格小于
func happensBefore(a, b [2]int) (bool, bool) {
    // 返回 (是否 a→b, 是否可比)
    le, lt := true, false
    for i := range a {
        if a[i] > b[i] { le = false }      // 有一维比对方大 → 不是全 ≤
        if a[i] < b[i] { lt = true }       // 有一维严格小
    }
    if le && lt { return true, true }      // [1,0] ≤ [1,2] → a 先于 b
    if le { return false, true }           // 完全相等 → 同一事件
    return false, false                    // 交叉如 [1,2] vs [2,1] → 并发`
</script>
