<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">CPU 调度：FCFS / SJF / RR / CFS</h1><p class="text-sm text-slate-500 mt-1">谁先上 CPU、谁让位、轮到谁——调度器是操作系统的心脏</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-b-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：三种算法时间线对比 + Go GMP 队列</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">同一个三进程样例 <strong>P1(24ms) / P2(3ms) / P3(3ms)</strong>，交给三种调度器会跑出完全不同的时间线。先看甘特图直观感受差别，再看下方 Go 运行时真正的"调度长什么样"。</p>

        <!-- 结构图：FCFS / SJF / RR 甘特对比 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 330" class="w-full h-auto">
            <defs><marker id="arrow4" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- 行标签 -->
            <text x="6" y="62" font-size="12" font-weight="bold" fill="#b45309" font-family="monospace">FCFS</text>
            <text x="6" y="152" font-size="12" font-weight="bold" fill="#0e7490" font-family="monospace">SJF</text>
            <text x="6" y="242" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">RR q=4</text>
            <!-- FCFS 行 -->
            <rect x="40" y="68" width="528" height="30" rx="6" fill="#f59e0b"/>
            <text x="304" y="88" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <rect x="568" y="68" width="66" height="30" rx="6" fill="#06b6d4"/>
            <text x="601" y="88" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P2</text>
            <rect x="634" y="68" width="66" height="30" rx="6" fill="#94a3b8"/>
            <text x="667" y="88" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P3</text>
            <!-- SJF 行 -->
            <rect x="40" y="158" width="66" height="30" rx="6" fill="#06b6d4"/>
            <text x="73" y="178" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P2</text>
            <rect x="106" y="158" width="66" height="30" rx="6" fill="#94a3b8"/>
            <text x="139" y="178" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P3</text>
            <rect x="172" y="158" width="528" height="30" rx="6" fill="#f59e0b"/>
            <text x="436" y="178" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <!-- RR 行 -->
            <rect x="40" y="248" width="88" height="30" rx="6" fill="#f59e0b"/>
            <text x="84" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <rect x="128" y="248" width="66" height="30" rx="6" fill="#06b6d4"/>
            <text x="161" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P2</text>
            <rect x="194" y="248" width="66" height="30" rx="6" fill="#94a3b8"/>
            <text x="227" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P3</text>
            <rect x="260" y="248" width="88" height="30" rx="6" fill="#f59e0b"/>
            <text x="304" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <rect x="348" y="248" width="88" height="30" rx="6" fill="#f59e0b"/>
            <text x="392" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <rect x="436" y="248" width="88" height="30" rx="6" fill="#f59e0b"/>
            <text x="480" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <rect x="524" y="248" width="88" height="30" rx="6" fill="#f59e0b"/>
            <text x="568" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <rect x="612" y="248" width="88" height="30" rx="6" fill="#f59e0b"/>
            <text x="656" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">P1</text>
            <!-- 时间轴 -->
            <line x1="40" y1="296" x2="704" y2="296" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow4)"/>
            <g font-size="10" fill="#64748b" font-family="monospace" text-anchor="middle">
              <text x="40" y="312">0</text><text x="150" y="312">5</text><text x="260" y="312">10</text>
              <text x="370" y="312">15</text><text x="480" y="312">20</text><text x="590" y="312">25</text><text x="700" y="312">30</text>
            </g>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">平均周转时间（完成时刻 − 到达时刻，均 0 到达）：FCFS = (24+27+30)/3 = <strong>27ms</strong>；SJF = (3+6+30)/3 = <strong>13ms</strong>（最优）；RR(q=4) = (7+10+30)/3 ≈ <strong>15.7ms</strong></figcaption>
        </figure>

        <!-- 结构图：Go GMP 调度队列 -->
        <figure>
          <svg viewBox="0 0 760 240" class="w-full h-auto">
            <defs><marker id="arrow5" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker></defs>
            <!-- 三个 P -->
            <rect x="40" y="30" width="160" height="110" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="120" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">P0（处理器）</text>
            <rect x="60" y="60" width="120" height="26" rx="6" fill="#06b6d4"/>
            <text x="120" y="78" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">M0 · 正跑 G4</text>
            <text x="120" y="98" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">本地 runq（G）</text>
            <circle cx="75" cy="116" r="11" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="75" y="120" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1" font-family="monospace">G9</text>
            <circle cx="112" cy="116" r="11" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="112" y="120" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1" font-family="monospace">G2</text>
            <circle cx="149" cy="116" r="11" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="149" y="120" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1" font-family="monospace">G6</text>

            <rect x="260" y="30" width="160" height="110" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="340" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">P1（处理器）</text>
            <rect x="280" y="60" width="120" height="26" rx="6" fill="#06b6d4"/>
            <text x="340" y="78" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">M1 · 正跑 G7</text>
            <text x="340" y="98" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">本地 runq（空）</text>

            <rect x="480" y="30" width="160" height="110" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="560" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">P2（处理器）</text>
            <rect x="500" y="60" width="120" height="26" rx="6" fill="#06b6d4"/>
            <text x="560" y="78" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">M2 · 正跑 G3</text>
            <text x="560" y="98" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">本地 runq（G）</text>
            <circle cx="515" cy="116" r="11" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="515" y="120" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1" font-family="monospace">G8</text>
            <circle cx="552" cy="116" r="11" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="552" y="120" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1" font-family="monospace">G1</text>

            <!-- work stealing -->
            <line x1="424" y1="116" x2="474" y2="116" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow5)"/>
            <text x="449" y="106" text-anchor="middle" font-size="9" fill="#0e7490" font-family="monospace">偷走一半 G</text>

            <!-- 全局 runq -->
            <rect x="140" y="176" width="480" height="40" rx="10" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="380" y="201" text-anchor="middle" font-size="11" fill="#0e7490" font-family="monospace">全局 runq：新建 G / 阻塞恢复的 G 先进这里，等 P 来取</text>
            <line x1="340" y1="176" x2="340" y2="146" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#arrow5)"/>
            <text x="352" y="166" font-size="9" fill="#0e7490" font-family="monospace">取全局</text>

            <text x="20" y="232" font-size="10" fill="#64748b" font-family="monospace">M = 内核线程（由 OS 的 CFS 调度）；G = goroutine（由 Go 运行时调度，2KB 栈，不占内核资源）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">Go 的 GMP：多个 P（=GOMAXPROCS）各管一个 M（内核线程）+ 本地队列；本地空就取全局，全局也空就去"偷"邻居的——这就是"用户态调度器 + 内核调度的嵌套"</figcaption>
        </figure>
      </section>

      <!-- 1. 调度器的目标与矛盾 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>调度器要优化什么？——目标与不可调和的矛盾</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">CPU 很贵，进程很多。调度器的任务就是<strong>决定就绪队列里谁下一个用 CPU、用多久</strong>。但"最优"没有统一标准——要看你想讨好谁：批处理服务器要吞吐，交互终端要响应，实时系统要死线。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">定义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">谁在乎</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">CPU 利用率</td><td class="px-4 py-2 border">CPU 忙碌时间占比</td><td class="px-4 py-2 border">服务器运营（钱）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">吞吐量</td><td class="px-4 py-2 border">单位时间完成的进程数</td><td class="px-4 py-2 border">批处理系统</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">周转时间</td><td class="px-4 py-2 border">完成时刻 − 提交时刻（全程耗时）</td><td class="px-4 py-2 border">批处理用户</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">等待时间</td><td class="px-4 py-2 border">在就绪队列里等 CPU 的时间总和</td><td class="px-4 py-2 border">所有用户</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">响应时间</td><td class="px-4 py-2 border">首次获得 CPU − 提交时刻（第一反应）</td><td class="px-4 py-2 border">交互用户</td></tr>
            </tbody>
          </table>
        </div>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">公平 vs 吞吐 vs 响应 —— 三个目标互相打架</p>
          <p class="text-xs text-amber-600 text-center">FCFS 公平但响应差（长作业挡路）；SJF 吞吐/周转最优但长作业饥饿；RR 响应好但切换开销拖低吞吐。调度器的历史就是在这三极之间找平衡点</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这就像 <code class="bg-purple-100 px-1 rounded text-xs font-mono">requestAnimationFrame</code> 只保证"在下一帧绘制前执行"而不是"立即执行"——浏览器也在 CPU/GPU 带宽上做调度取舍：动画要响应（帧率优先），后台任务就降优先级（吞吐/省电优先）。</p>
        </aside>
      </section>

      <!-- 2. 抢占 vs 协作 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>抢占式 vs 协作式 + 上下文切换的代价</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-2">协作式（cooperative）</h3>
            <p class="text-xs text-slate-600 leading-relaxed">进程<strong>自觉</strong>让出 CPU（调 yield 或主动阻塞）。没有时钟强拆。缺点：某个进程死循环，整个系统跟着卡死——Windows 3.x / Mac OS 9 时代的"蓝屏自由落体"就是这么来的。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-2">抢占式（preemptive）</h3>
            <p class="text-xs text-slate-600 leading-relaxed">硬件<strong>时钟中断</strong>定时打断当前进程，OS 强制把 CPU 交给下一个。现代操作系统（含 Linux/Windows/macOS）全是抢占式——这也是"关掉电源也救不回来，但至少系统不会死循环"的底气。</p>
          </div>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">一次上下文切换的步骤</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600 text-sm">保存当前进程的<strong>寄存器现场</strong>（PC、栈指针、通用寄存器）到它的 PCB。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600 text-sm">调度器从就绪队列<strong>挑出下一个进程</strong>（用哪种算法，就是本篇主题）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600 text-sm">恢复新进程的现场，<strong>切换地址空间</strong>（页表/CR3 更新 → TLB 全部失效）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600 text-sm">从用户态跳回新进程的指令流，继续跑。</div></li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 代价不是"几个寄存器"这么简单：</strong>一次进程级上下文切换约 <strong>1~10μs</strong>，其中大头是<strong>页表切换 + TLB 失效 + cache 被污染</strong>——换出去的那个进程回来时，cache 里全是别人的东西，要重新暖。所以调度频率必须权衡：<strong>切换太勤，CPU 都在"换人"没在干活</strong>。</p>
        </aside>
      </section>

      <!-- 3. FCFS -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>FCFS 先来先服务：最公平，也最堵</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">规则一句话：<strong>就绪队列排成 FIFO，谁先到谁先完整跑完</strong>（非抢占）。像银行柜台——先来的先办，办完才叫下一位。看总览图：P1 需要 24ms，先到就先占着 CPU，P2/P3 只能干瞪眼到 24ms 以后。</p>
        <div class="bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-sm font-semibold text-cyan-800 mb-1 text-center font-mono">🚛 护航效应（Convoy Effect）：短进程被长进程"压车"</p>
          <p class="text-xs text-cyan-700 text-center">P1(24ms) 像一辆慢吞吞的卡车，P2/P3(各 3ms) 是小轿车，全堵在它后面。短作业的排队时间被长作业拉满——平均周转 27ms，是 SJF 的两倍还多。</p>
        </div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优点</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">缺点</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">实现极简（一个队列）</td><td class="px-4 py-2 border">护航效应，平均等待时间长</td></tr>
              <tr><td class="px-4 py-2 border">绝对公平（按到达顺序）</td><td class="px-4 py-2 border">交互进程响应极差（等长作业先跑完）</td></tr>
              <tr><td class="px-4 py-2 border">无饥饿（总会轮到）</td><td class="px-4 py-2 border">只适合批处理场景</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. SJF / SRTF -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>SJF / SRTF 短作业优先：理论最优，现实打脸</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">SJF 每次从就绪队列挑<strong>执行时间最短</strong>的进程先跑（非抢占）；抢占版叫 <strong>SRTF</strong>（最短剩余时间优先）——新来的进程剩余时间更短，就立刻抢走 CPU。看总览图：P2、P3 先各用 3ms 跑完，平均周转降到 13ms。<strong>数学上可证明 SJF 在所有非抢占算法里平均等待时间最小</strong>。</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>算它：</strong>把样例按 Burst 升序排 → P2(3) → P3(3) → P1(24)。</li>
          <li><strong>测它：</strong>完成时间 3 / 6 / 30，平均周转 (3+6+30)/3 = 13ms，完胜 FCFS 的 27ms。</li>
          <li><strong>打脸它：</strong>它需要<strong>预知每个进程的执行时间</strong>——现实里谁都不知道自己会跑多久。只能靠<strong>历史均值预测</strong>（指数平均法估算下一次爆发长度），预估值有误差，排序就不一定真最优。</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：SJF 最优？—— 前提是"你预知未来"。</strong>执行时间是上帝才知道的随机量，SJF 的最优性在现实世界是"理论上可证明、工程上不可用"。更狠的是 SRTF：只要不断有短作业插进来，<strong>长作业可能永远抢不到 CPU</strong>（饥饿）。饥饿的解法叫<strong>老化</strong>（aging）：每等一段时间，进程优先级就往上提，最终总会轮到你。</p>
        </aside>
      </section>

      <!-- 5. 优先级 + RR -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>优先级调度 + RR 时间片轮转：给调度加"参数"</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">优先级调度：进程分三六九等</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">每个进程带一个优先级，永远先跑优先级最高的。可做<strong>抢占版</strong>（高优先级一来就抢）和<strong>非抢占版</strong>。实时任务、前台交互进程优先级高；后台编译任务优先级低。死穴还是<strong>低优先级饥饿</strong>——同样用<strong>老化</strong>（等得越久优先级越高）兜底。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">RR 时间片轮转：人人有份，用光就换</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">把时间切成 <strong>q（时间片）</strong>，每个进程最多用 q 就<strong>换下一个</strong>（用完还没做完就排到队尾）。看总览图 RR 行：P1 吃 4ms 就被 P2 抢走，P2 用 3ms 跑完退场，P3 用 3ms 跑完……响应时间被锁死在 ≤ (n−1)q。Q 是唯一旋钮——但旋钮两端都是坑：</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-1">q 太大 → 退化成 FCFS</h3>
            <p class="text-xs text-slate-600 leading-relaxed">q = 100ms：每个进程都一口气跑完，轮转形同虚设——响应照样差，护航效应回归。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-1">q 太小 → 切换开销反噬</h3>
            <p class="text-xs text-slate-600 leading-relaxed">q = 1ms：CPU 每 1ms 就要做一次 10μs 级切换，约 1% 直接浪费在"换人"上；q = 0.1ms 时切换开销占比冲到 ~10%，吞吐断崖式下跌。</p>
          </div>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：时间片越短响应越好？—— 切换开销会反噬。</strong>响应时间公式 (n−1)q 看着像 q 越小越好，但 q 小到和切换时间一个数量级时，CPU 大半时间在切换而非执行。经验法则：<strong>q 取 10~100ms</strong>（切换 ~10μs 时开销可忽略），交互不差、吞吐不伤。</p>
        </aside>
      </section>

      <!-- 6. MLFQ -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>MLFQ 多级反馈队列：兼顾响应与吞吐的经典现代设计</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">RR 人人平等，优先级调度论资排辈——MLFQ 把两者缝合：<strong>多个队列，从高到低</strong>；越靠上的队列<strong>优先级越高、时间片越短</strong>；新任务永远进最高队列。Windows NT / macOS / 早期 Linux 都用的这套骨架。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600 text-sm"><strong>先服务高优先级队列</strong>：Q0 有任务，低队列一律排队（类似优先级调度）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600 text-sm">同一队列内 <strong>RR 轮转</strong>，队列越往下时间片越大（Q0=8ms → Q1=16ms → Q2=32ms…）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600 text-sm">一个进程<strong>用完整个时间片都没做完 → 降级</strong>到下一队列：它大概率是 CPU 密集型，去大时间片慢慢跑。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600 text-sm">进程在时间片内<strong>主动让出</strong>（等 I/O）→ <strong>不降级</strong>：它可能是交互型，留在高队列，下次回来立刻响应。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600 text-sm">周期性把全部进程<strong>提升回最高队列</strong>：防止长期降级的任务饿死。</div></li>
        </ol>
        <p class="text-sm text-slate-600 leading-relaxed mb-4">效果：I/O 密集任务（读键盘、等网络）反复主动让出，稳稳待在 Q0，响应飞快；CPU 密集任务主动降级去低队列，用大时间片闷头算，吞吐也不差。一套规则同时喂饱"响应"和"吞吐"。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>浏览器事件循环就是一座 MLFQ——<strong>微任务队列</strong>（Promise.then / queueMicrotask）优先级永远高于<strong>宏任务队列</strong>（setTimeout 回调），新宏任务永远排在当前帧后面；<code class="bg-purple-100 px-1 rounded text-xs font-mono">requestAnimationFrame</code> 则类似"固定时间片"：浏览器在每帧绘制前统一放行一批 rAF 回调。想明白"谁先谁后"，前端异步调度的心智模型就立起来了。</p>
        </aside>
      </section>

      <!-- 7. Linux CFS -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>Linux CFS 完全公平调度器：公平不是"轮流"，是"按比例"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Linux 2.6.23 起用 CFS 取代了老式时间片调度。核心思想：<strong>没有"时间片"概念</strong>，而是给每个进程记账虚拟运行时间 <code class="bg-slate-100 px-1 rounded text-xs font-mono">vruntime</code>，谁欠得最多谁上。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600 text-sm"><strong>记账：</strong><code class="bg-slate-100 px-1 rounded text-xs font-mono">vruntime += 实际运行时间 / 权重</code>。权重由 <code class="bg-slate-100 px-1 rounded text-xs font-mono">nice</code> 值换算：nice 越小权重越大，同样跑 1ms，nice=0 的 vruntime 涨 1，nice=10 的涨 ~11——它吃得多、账涨得快，很快就会被换下去。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600 text-sm"><strong>就绪队列用红黑树</strong>，key 就是 vruntime；每次取<strong>最左节点（vruntime 最小 = 吃得最少）</strong>的进程运行。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600 text-sm"><strong>自然抢占：</strong>当前进程 vruntime 一旦超过树中最左节点的 vruntime（超过一个调度粒度），就触发调度，让"最饿的"上。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600 text-sm"><strong>睡眠特权：</strong>sleep 期间 vruntime 不增长（不占 CPU 就不记账），醒来 vruntime 偏小，<strong>立即插到最左获得 CPU</strong>——交互任务响应因此飞快。</div></li>
        </ol>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">nice</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">权重</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono">-5</td><td class="px-4 py-2 border font-mono">3121</td><td class="px-4 py-2 border">优先级更高（多分 CPU）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">0</td><td class="px-4 py-2 border font-mono">1024</td><td class="px-4 py-2 border">默认</td></tr>
              <tr><td class="px-4 py-2 border font-mono">+10</td><td class="px-4 py-2 border font-mono">110</td><td class="px-4 py-2 border">优先级低（少分 CPU）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 CFS 不是"排队"，是"分账"：</strong>它保证的是长期公平——两个 nice=0 的进程，谁也别想长期霸占，谁也不能被饿死。nice 调的是<strong>权重（分账比例）</strong>，不是时间片长短。这也正是"完全公平"的含义：公平 ≠ 轮流，而是<strong>按权重共享</strong>。</p>
        </aside>
      </section>

      <!-- 8. 多核负载均衡 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>多核负载均衡：别让有的核忙死、有的核闲死</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">单核时代调度器只管"谁上 CPU"；多核时代多了个问题：<strong>8 个核怎么分配任务？</strong>每个核有自己的就绪队列，理想是每个核负载相当、同时忙碌。做法有 <strong>push migration</strong>（空闲核主动去别人那"拉任务"）和 <strong>pull migration</strong>（核太忙就把任务"推"给空闲核），加上<strong>处理器亲和性</strong>（尽量让进程在同一个核上跑，吃 cache 红利）。</p>
        <div class="mb-4"><Code language="go" :code="gomaxprocsCode" title="gomaxprocs.go" /></div>
        <p class="text-sm text-slate-600 leading-relaxed mb-4">Go 里的"核"由 <code class="bg-slate-100 px-1 rounded text-xs font-mono">runtime.GOMAXPROCS(n)</code> 决定：它<strong>限制同时并行执行 goroutine 的 OS 线程（P）数量</strong>。纯计算场景下 GOMAXPROCS=1 只能让所有 goroutine 轮流"穿"同一件 P 外套，总耗时 ≈ 单核跑满全部；设成核数才能并行起飞。</p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实践提醒：</strong>Go 1.5 起默认 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">GOMAXPROCS = NumCPU</code>，绝大多数情况不用手动调。但 <strong>IO 密集</strong>任务并行度不敏感，<strong>CPU 密集</strong>才吃满核；而 Docker 容器里若没设限额，Go 读到的核数可能是宿主机核数，反而多建线程。容器场景建议显式设 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">GOMAXPROCS</code> 或配合 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">automaxprocs</code> 库。</p>
        </aside>
      </section>

      <!-- 9. Go 模拟 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">9</span>动手：用 Go 模拟 FCFS / SJF / RR 三个调度器</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">用一个不到 80 行的 Go 程序把三种调度器各实现一遍，跑出总览图里的甘特数据。重点看三个函数的核心差异：FCFS <strong>不看长度只看顺序</strong>，SJF <strong>先排序再执行</strong>，RR <strong>用完时间片就排到队尾</strong>。</p>
        <div class="mb-4"><Code language="go" :code="schedulerCode" title="scheduler-sim.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 这段代码就是调度器的"上帝视角"：</strong>你在写 Go 并发时，<code class="bg-purple-100 px-1 rounded text-xs font-mono">runtime.GOMAXPROCS</code> 是 RR 里的"时间片旋钮"；goroutine 阻塞时的让位是 FCFS 的"主动让出"；而 Go 运行时内部用的其实是后面要讲的"本地队列 + work stealing"——比这三种经典算法都更现代。</p>
        </aside>
      </section>

      <!-- ⭐ 与 Go 底层实现的关系 -->
      <section id="sec-go" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⭐</span>与 Go 底层实现的关系：GMP 调度器</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你在写的 goroutine 并不直接面对 OS 调度器——中间隔着一层 Go 运行时自己写的<strong>用户态调度器</strong>。它叫 <strong>GMP</strong>：G（goroutine）= 轻量"线程"（2KB 栈起步），M（Machine）= 内核线程（OS 调度器眼里的线程），P（Processor）= 逻辑处理器，数量 = GOMAXPROCS，手里握着一个本地队列。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">Go 调度策略 ↔ 本篇算法对照</h3>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>本地 runq 优先</strong>：每个 P 先跑自己本地队列（容量 ~256），本地空才去看全局 runq——类似"多级队列"的局部性，减少锁竞争。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>work stealing（偷一半）</strong>：某 P 本地队列空了，全局也空，就从别的 P 队列"偷走一半"G 来跑——这正是上节讲的<strong>多核负载均衡</strong>的 pull 模式，总览图里的虚线箭头。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>spinning 自旋</strong>：空闲的 M 不立即休眠，而是自旋一小会等新 G 到来，省掉唤醒开销——等于调度器"守株待兔"换低延迟。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>抢占式</strong>：Go 1.14 起用 <strong>SIGURG 信号做异步抢占</strong>，专门收拾"goroutine 死循环不释放 P"的老大难——对应本篇"时钟中断强制抢占"。</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">阻塞时 G 往哪走？</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600 text-sm"><strong>channel / mutex 阻塞 → gopark：</strong>纯用户态切换，G 挂起、P 继续跑别的 G，代价 ~100ns——这就是 goroutine 便宜到"几百万个不心疼"的原因。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600 text-sm"><strong>系统调用阻塞 → 脱钩换马：</strong>G 连带 M 一起进内核等待，P 立即脱离并去绑定一个空闲 M（或新建）——保证并行度不掉。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600 text-sm">系统调用返回，M 上的 G 重新进入可运行队列，M 自己可能被 Go 回收或复用。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="goparkCode" title="gopark-switch.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">OS 调度器（CFS/RR）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 运行时调度器</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">调度对象</td><td class="px-4 py-2 border">进程 / 线程</td><td class="px-4 py-2 border">goroutine（更轻量）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">内核参与</td><td class="px-4 py-2 border">内核态，陷阱进内核切换</td><td class="px-4 py-2 border">用户态，运行时自管（系统调用才进内核）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">切换代价</td><td class="px-4 py-2 border">1~10μs（含页表/TLB/cache）</td><td class="px-4 py-2 border">~100ns（无页表切换）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">策略</td><td class="px-4 py-2 border">CFS（vruntime 红黑树）/ RR 时间片</td><td class="px-4 py-2 border">本地队列优先 + work stealing + 异步抢占</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">深度阅读：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go 调度器 GMP：M/P/G 模型与调度流程'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：以为 goroutine 与 OS 调度无关。</strong>goroutine 只是"不占内核资源"的调度对象，但 <strong>M 仍然是内核线程，仍被内核 CFS 调度</strong>。系统调用（文件/网络读写）依旧要进内核，阻塞时该占线程还占线程。<code class="bg-amber-100 px-1 rounded text-xs font-mono">runtime.NumGoroutine()</code> 显示再多的 G，OS 层面真正在跑的也只有 GOMAXPROCS 个线程。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>调度目标互相矛盾</strong>：公平（FCFS）、最优周转（SJF）、快速响应（RR）不可兼得，现代调度器用 MLFQ 缝合三者。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>FCFS</strong> 非抢占 + FIFO，护航效应拖垮平均周转；<strong>SJF/SRTF</strong> 理论最优但要预知执行时间、长作业会饥饿（老化可救）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>RR</strong> 用时间片 q 换响应，q 太大会退化成 FCFS、太小切换开销反噬；<strong>优先级</strong>快但低优先级会饿死。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>MLFQ</strong> 多队列 + 时间片降级 + 周期提升，是现代系统的经典骨架；<strong>CFS</strong> 用 vruntime 红黑树按权重"分账"，公平且防饿。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Go GMP</strong> = 用户态调度器骑在内核调度器上：本地队列 + work stealing 做负载均衡，gopark 廉价切换，SIGURG 异步抢占兜底。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>写 Go 并发时记住：<strong>GOMAXPROCS = 并行度上限</strong>；goroutine 再多，真正并行跑的线程也就那么几个。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go 调度器 GMP'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-3-thread'" :text="'线程模型（本篇前导）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-b-3-thread'" :text="'← 上一节：线程：用户态/内核态/轻量级进程'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-c-1-race'" :text="'下一节：竞态条件与临界区问题 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "目标与矛盾" },
  { id: "sec-2", name: "抢占 vs 协作" },
  { id: "sec-3", name: "FCFS 先来先服务" },
  { id: "sec-4", name: "SJF / SRTF" },
  { id: "sec-5", name: "优先级 + RR" },
  { id: "sec-6", name: "MLFQ 多级反馈队列" },
  { id: "sec-7", name: "Linux CFS" },
  { id: "sec-8", name: "多核负载均衡" },
  { id: "sec-9", name: "Go 模拟调度器" },
  { id: "sec-go", name: "⭐ 与 Go 底层实现" },
  { id: "sec-10", name: "小结" },
]

// ===== 代码示例 =====

// ① 用 Go 模拟三种经典调度算法
const schedulerCode = `// scheduler-sim.go —— 用 Go 模拟 FCFS / SJF / RR 三种调度器
// 输入：P1(24ms) P2(3ms) P3(3ms)，全部 0ms 到达
package main

import "fmt"

type Process struct {
    Name  string
    Burst int // 需要 CPU 的总时间
    Left  int // 剩余时间（RR 用）
}

// Slot 一段执行记录：谁在哪个 [Start, End) 区间跑
type Slot struct {
    Name       string
    Start, End int
}

// ---- 1. FCFS：就绪队列 FIFO，非抢占 ----
func fcfs(ps []Process) (int, []Slot) {
    t := 0
    var slots []Slot
    for _, p := range ps {          // 按到达顺序，一个一个跑完
        slots = append(slots, Slot{p.Name, t, t + p.Burst})
        t += p.Burst                // 当前进程跑完才轮到下一个
    }
    return t, slots
}

// ---- 2. SJF：每次选执行时间最短的（需预知 Burst，非抢占）----
func sjf(ps []Process) (int, []Slot) {
    q := append([]Process(nil), ps...)
    for i := 1; i < len(q); i++ {   // 插入排序：让最短的执行时间排最前
        for j := i; j > 0 && q[j].Burst < q[j-1].Burst; j-- {
            q[j], q[j-1] = q[j-1], q[j]
        }
    }
    t := 0
    var slots []Slot
    for _, p := range q {           // 按升序依次执行
        slots = append(slots, Slot{p.Name, t, t + p.Burst})
        t += p.Burst
    }
    return t, slots
}

// ---- 3. RR：时间片 q，用完没做完就排到队尾 ----
func rr(ps []Process, q int) (int, []Slot) {
    queue := append([]Process(nil), ps...)
    for i := range queue {
        queue[i].Left = queue[i].Burst // 初始化剩余时间
    }
    t := 0
    var slots []Slot
    for len(queue) > 0 {
        p := queue[0]
        queue = queue[1:]           // 出队
        run := q
        if p.Left < run {
            run = p.Left            // 剩余不足一个时间片，只跑剩余的
        }
        slots = append(slots, Slot{p.Name, t, t + run})
        t += run
        p.Left -= run
        if p.Left > 0 {
            queue = append(queue, p) // 关键：没做完 → 排到队尾
        }
    }
    return t, slots
}

func main() {
    ps := []Process{{"P1", 24, 0}, {"P2", 3, 0}, {"P3", 3, 0}}
    _, s1 := fcfs(ps)
    _, s2 := sjf(ps)
    _, s3 := rr(ps, 4)              // 时间片 q = 4ms
    fmt.Println("FCFS:", s1)        // 完成 24 / 27 / 30，平均周转 27
    fmt.Println("SJF :", s2)        // 完成 3  / 6  / 30，平均周转 13 ← 最优
    fmt.Println("RR  :", s3)        // 完成 7  / 10 / 30，平均周转 15.7
}`;

// ② GOMAXPROCS 对并行度的影响
const gomaxprocsCode = `// gomaxprocs.go —— 演示 GOMAXPROCS 决定"同时跑几个 P / 内核线程"
package main

import (
    "fmt"
    "runtime"
    "sync"
    "time"
)

// burn 纯 CPU 计算：不阻塞、不睡眠，一直占着当前线程
func burn(ms int) {
    end := time.Now().Add(time.Duration(ms) * time.Millisecond)
    for time.Now().Before(end) {
        _ = 1 + 1
    }
}

func main() {
    n := runtime.NumCPU()
    fmt.Println("本机逻辑核:", n)

    for _, gmp := range []int{1, n} { // 对比 GOMAXPROCS=1 和 =核数
        runtime.GOMAXPROCS(gmp)
        start := time.Now()
        var wg sync.WaitGroup
        for i := 0; i < n; i++ {    // 起 n 个纯计算 goroutine
            wg.Add(1)
            go func() { defer wg.Done(); burn(300) }()
        }
        wg.Wait()
        // GOMAXPROCS=1：n 个 goroutine 轮流穿同一件 P 外套 → ≈ 300*n ms
        // GOMAXPROCS=n：n 个 P 并行跑 → ≈ 300 ms
        fmt.Printf("GOMAXPROCS=%-2d 总耗时 %v\\n", gmp, time.Since(start))
    }
}`;

// ③ goroutine 阻塞时调度器如何切换
const goparkCode = `// gopark-switch.go —— 观察 goroutine 阻塞时调度器"换人"
// channel 发送端没人接收 → G 挂起（park），P 腾出 M 去跑其他 G
package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan int)
    fmt.Println("--- 主 goroutine 启动 ---")

    go func() { // G1：先发后收
        fmt.Println("G1 尝试发送 → 没人接收，G1 被 park，让出 P")
        ch <- 42 // ← 关键：此处阻塞，调度器切走 G1
        fmt.Println("G1 被唤醒，发送成功")
        <-ch
    }()

    go func() { // G2：睡一会儿再收，期间 G1 一直挂在 channel 上
        time.Sleep(3 * time.Millisecond)
        fmt.Println("G2 执行：G1 正阻塞，M 没闲着，正在跑 G2")
        <-ch // 接收 → 唤醒 G1
    }()

    time.Sleep(50 * time.Millisecond) // 主 goroutine 让出时间
    fmt.Println("--- 结束：G1、G2 都跑完了 ---")
}`;
</script>
