<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">竞态条件与临界区问题</h1><p class="text-sm text-slate-500 mt-1">共享数据被并发改写时，结果为什么"随机"？——读-改-写不是原子操作</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-c-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：临界区 + counter++ 竞态</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">当两个执行流要读、改、写同一份共享数据时，代码被划分出<strong>临界区</strong>（左图，琥珀色段）——同一时刻只允许一个执行流进去。可如果大家都"同时"进去，右图的悲剧就发生了：两个线程各自完成 <strong>读-改-写</strong>，但互相覆盖，最终丢了更新。</p>

        <!-- 结构图：临界区示意 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">① 临界区示意：共享变量 + 两个执行流</h3>
            <svg viewBox="0 0 560 290" class="w-full h-auto">
              <defs>
                <marker id="arrow5a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker>
                <marker id="arrow5b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#ef4444"/></marker>
              </defs>
              <!-- 共享变量 -->
              <rect x="200" y="16" width="160" height="44" rx="8" fill="#06b6d4"/>
              <text x="280" y="36" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">共享变量 x = 5</text>
              <text x="280" y="52" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">两个执行流都要读写它</text>
              <!-- P1 行 -->
              <text x="18" y="106" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">P1（执行流）</text>
              <rect x="18" y="116" width="122" height="38" rx="7" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="79" y="132" text-anchor="middle" font-size="10" fill="#0369a1" font-family="monospace">进入区 ①申请锁</text>
              <text x="79" y="146" text-anchor="middle" font-size="9" fill="#0ea5e9" font-family="monospace">LOCK</text>
              <rect x="152" y="116" width="120" height="38" rx="7" fill="#f59e0b"/>
              <text x="212" y="132" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">临界区 ②操作 x</text>
              <text x="212" y="146" text-anchor="middle" font-size="9" fill="#ffedd5" font-family="monospace">读-改-写 共享数据</text>
              <rect x="284" y="116" width="118" height="38" rx="7" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="343" y="132" text-anchor="middle" font-size="10" fill="#0369a1" font-family="monospace">退出区 ③释放锁</text>
              <text x="343" y="146" text-anchor="middle" font-size="9" fill="#0ea5e9" font-family="monospace">UNLOCK</text>
              <rect x="414" y="116" width="120" height="38" rx="7" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="474" y="137" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">其余代码</text>
              <!-- P1 流程箭头 -->
              <line x1="140" y1="135" x2="149" y2="135" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow5a)"/>
              <line x1="272" y1="135" x2="281" y2="135" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow5a)"/>
              <line x1="402" y1="135" x2="411" y2="135" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow5a)"/>
              <!-- P2 行 -->
              <text x="18" y="196" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">P2（执行流）</text>
              <rect x="18" y="206" width="122" height="38" rx="7" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
              <text x="79" y="222" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c" font-family="monospace">进入区 ⛔ 等待锁</text>
              <text x="79" y="236" text-anchor="middle" font-size="9" fill="#ef4444" font-family="monospace">被互斥挡住</text>
              <rect x="152" y="206" width="120" height="38" rx="7" fill="#fde68a" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>
              <text x="212" y="222" text-anchor="middle" font-size="10" fill="#92400e" font-family="monospace">临界区（暂不可进）</text>
              <text x="212" y="236" text-anchor="middle" font-size="9" fill="#a16207" font-family="monospace">等 P1 释放锁</text>
              <rect x="284" y="206" width="118" height="38" rx="7" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="343" y="222" text-anchor="middle" font-size="10" fill="#0369a1" font-family="monospace">退出区 ③释放锁</text>
              <text x="343" y="236" text-anchor="middle" font-size="9" fill="#0ea5e9" font-family="monospace">UNLOCK</text>
              <rect x="414" y="206" width="120" height="38" rx="7" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="474" y="227" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">其余代码</text>
              <!-- 等待箭头：P2 进入区 → 共享变量 -->
              <line x1="79" y1="206" x2="200" y2="62" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow5b)"/>
              <text x="72" y="90" font-size="9" fill="#b91c1c" font-family="monospace">想进去</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">P1 已持锁进入临界区操作 x；P2 在进入区被互斥挡住，必须等 P1 释放锁</figcaption>
          </figure>

          <!-- 操作图：counter++ 竞态时序 -->
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">② counter++ 竞态时序：交错丢更新</h3>
            <svg viewBox="0 0 560 470" class="w-full h-auto">
              <defs><marker id="arrow5c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
              <!-- 内存 -->
              <rect x="240" y="12" width="120" height="40" rx="8" fill="#06b6d4"/>
              <text x="300" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">内存 x = 5</text>
              <text x="300" y="45" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">共享变量</text>
              <!-- 列头 -->
              <text x="150" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">线程 A（核 0）</text>
              <text x="410" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">线程 B（核 1）</text>
              <!-- 时间指示 -->
              <text x="14" y="180" font-size="10" fill="#94a3b8" font-family="monospace">时</text>
              <text x="14" y="196" font-size="10" fill="#94a3b8" font-family="monospace">间</text>
              <text x="14" y="212" font-size="10" fill="#94a3b8" font-family="monospace">↓</text>
              <line x1="30" y1="96" x2="30" y2="380" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/>
              <!-- ① A LOAD -->
              <rect x="60" y="96" width="180" height="34" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="150" y="117" text-anchor="middle" font-size="11" font-family="monospace" fill="#0369a1">① LOAD：读 x → A 寄存器 = 5</text>
              <!-- ② B LOAD -->
              <rect x="320" y="150" width="180" height="34" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="410" y="171" text-anchor="middle" font-size="11" font-family="monospace" fill="#0369a1">② LOAD：读 x → B 寄存器 = 5</text>
              <!-- ③ A ADD -->
              <rect x="60" y="204" width="180" height="34" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="150" y="225" text-anchor="middle" font-size="11" font-family="monospace" fill="#92400e">③ A 寄存器 +1 → 6</text>
              <!-- ④ B ADD -->
              <rect x="320" y="258" width="180" height="34" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="410" y="279" text-anchor="middle" font-size="11" font-family="monospace" fill="#92400e">④ B 寄存器 +1 → 6</text>
              <!-- ⑤ A STORE -->
              <rect x="60" y="312" width="180" height="34" rx="6" fill="#bbf7d0" stroke="#22c55e" stroke-width="1.5"/>
              <text x="150" y="333" text-anchor="middle" font-size="11" font-family="monospace" fill="#15803d">⑤ STORE：写回 x = 6</text>
              <!-- ⑥ B STORE -->
              <rect x="320" y="366" width="180" height="34" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
              <text x="410" y="387" text-anchor="middle" font-size="11" font-family="monospace" fill="#b91c1c">⑥ STORE：写回 x = 6 ⚠ 覆盖</text>
              <!-- LOAD 箭头：内存 → 寄存器 -->
              <line x1="300" y1="52" x2="180" y2="94" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arrow5c)"/>
              <line x1="300" y1="52" x2="410" y2="148" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arrow5c)"/>
              <!-- STORE 箭头：寄存器 → 内存 -->
              <line x1="180" y1="346" x2="280" y2="54" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arrow5c)"/>
              <line x1="410" y1="400" x2="310" y2="54" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arrow5c)"/>
              <!-- 结果带 -->
              <rect x="60" y="416" width="440" height="38" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="280" y="439" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">结果 x = 6（期望 7）——丢了一次 +1！</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">A、B 都读到 x=5，各自 +1 后写回 6：后写的 B 覆盖了 A 的更新，两次自增只剩一次生效</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 竞态条件：定义与直觉 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>竞态条件（Race Condition）：定义与直觉</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>竞态条件</strong>：多个执行流同时访问共享数据，<strong>最终结果依赖它们的执行顺序</strong>（谁先谁后）——同一段代码，跑在不同时刻，结果却不一样。这不是"数据坏了"，而是<strong>结果不确定、不可复现</strong>。</p>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">竞态 = 结果由"运气"（执行时序）决定，而不是由逻辑决定</p>
          <p class="text-xs text-amber-600 text-center">时序对了，程序是对的；时序交错，程序就错了。同一个二进制文件，每次运行结果都可能在变</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">注意"同时"不一定是物理同时：多核上是<strong>真并行</strong>，单核上则是调度器把 CPU 在多个执行流间<strong>快速切换</strong>造成的"看起来同时"。两种情况下，只要两条指令在中间某个点交错，竞态就可能发生。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>想象 React 组件里两个异步回调都在 <code class="bg-purple-100 px-1 rounded text-xs font-mono">setUser(...)</code>，一个只带 <code class="bg-purple-100 px-1 rounded text-xs font-mono">name</code>，一个只带 <code class="bg-purple-100 px-1 rounded text-xs font-mono">age</code>——谁最后执行，谁就把对方写的字段覆盖掉。最终用户资料里是"老王+25"还是"小李+25"，全看请求返回顺序，这就是前端的竞态条件。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 直觉判断法：</strong>问自己一句——"如果我把两个执行流的操作顺序换个排列，结果会变吗？"会变，就有竞态风险。反过来，如果任何排列结果都一样，那它就是安全的（顺序无关）。</p>
        </aside>
      </section>

      <!-- 2. 数据竞争 vs 竞态条件 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>数据竞争（Data Race） vs 竞态条件（Race Condition）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">这两个词经常混用，但层次不同。<strong>数据竞争是"内存级"的</strong>，定义非常严格：<strong>至少两个执行流同时访问同一内存位置，且至少一个是写，且它们之间没有任何同步机制</strong>。<strong>竞态条件是"逻辑级"的</strong>，更宽泛：只要结果依赖时序，就算竞态。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数据竞争 Data Race</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">竞态条件 Race Condition</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">层次</td><td class="px-4 py-2 border">内存级（同一地址的并发访问）</td><td class="px-4 py-2 border">逻辑级（结果依赖时序）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">判定</td><td class="px-4 py-2 border">可被检测器查出（如 <code class="bg-slate-100 px-1 rounded text-xs font-mono">-race</code> / TSan）</td><td class="px-4 py-2 border">要靠人推理，检测器查不出</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">典型例</td><td class="px-4 py-2 border">两个 goroutine 同时 <code class="bg-slate-100 px-1 rounded text-xs font-mono">counter++</code></td><td class="px-4 py-2 border">先检查后执行（TOCTOU）、多个变量组合</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">关系</td><td class="px-4 py-2 border" colspan="2">数据竞争<b>几乎必然</b>导致竞态（交错一出错就错）；但竞态<b>不一定</b>来自数据竞争</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">为什么"竞态不一定来自数据竞争"？两个变量各自都有锁保护（没有数据竞争），但一个流程先读 A 再读 B，另一个先写 B 再写 A——组合顺序一变，业务结果就错了。这种逻辑级竞态，<strong>-race 检测不到</strong>，只能靠理解 happens-before 来推理。</p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 结论：</strong>修掉数据竞争（上锁/原子化）是<strong>底线</strong>，机器先保证不坏；但逻辑级竞态要靠<strong>设计</strong>（顺序、不可变、单一写者）来规避。先守住底线，再谈上层设计。</p>
        </aside>
      </section>

      <!-- 3. 临界区 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>临界区（Critical Section）：问题与三要求</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>临界区</strong>是访问<strong>共享资源（共享数据、文件、设备）</strong>的那段代码。并发安全的全部问题，就归结为：<strong>怎么保证同一时刻只有一个执行流在临界区里</strong>。操作系统教材把临界区问题拆成三条要求——缺一条就不算正确解法：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>互斥（Mutual Exclusion）</strong>：任何时刻，最多只有一个执行流处于临界区。这是<strong>底线</strong>——违反它就退化成裸奔，直接竞态。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>前进（Progress）</strong>：临界区空闲时，想进入的执行流必须能进入，<strong>不能被无限拖延</strong>。如果 A 一释放锁、B 就抢，但 C 一直在排队饿死，就违反了前进。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>有限等待（Bounded Waiting）</strong>：一个执行流在等待进入临界区的过程中，能进入的次数<strong>有上界</strong>——不能让它等到天荒地老（饿死 starvation）。</div></li>
        </ol>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">要求</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">违反的后果</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">互斥</td><td class="px-4 py-2 border">同时最多 1 个在临界区</td><td class="px-4 py-2 border">数据竞争，结果错乱</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">前进</td><td class="px-4 py-2 border">空闲时必须有人能进</td><td class="px-4 py-2 border">死锁（都进不去）或活锁</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">有限等待</td><td class="px-4 py-2 border">等待次数有上界</td><td class="px-4 py-2 border">饿死（个别执行流永远进不去）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>临界区是<strong>代码段</strong>，不是数据本身。同一份共享数据可能在多处被访问，<strong>每一处访问都要进临界区</strong>（同一把锁），漏掉任何一处，锁就形同虚设——"给数据上了锁"但别处绕过锁直接读写，等于没锁。</p>
        </aside>
      </section>

      <!-- 4. 原子性 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>原子性：为什么 counter++ 会丢更新</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>原子性</strong>指一个操作要么完整执行、要么完全没执行，<strong>中间状态不可见</strong>。问题是：<code class="bg-slate-100 px-1 rounded text-xs font-mono">counter++</code> 看着是一条语句，其实在 CPU 层面被拆成<strong>三条指令</strong>：</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>LOAD</strong>（读）：把内存里的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">counter</code> 读到寄存器；</li>
          <li><strong>ADD</strong>（改）：寄存器里 +1；</li>
          <li><strong>STORE</strong>（写）：把寄存器写回内存。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed">这三条指令之间<strong>不是原子的</strong>——上下文切换可以发生在任意两条指令之间。A 刚做完 LOAD（读到 5），还没写回，就被切走；B 把完整的 5→6 做完写回；A 再被切回来，基于自己寄存器里的 5 继续 +1 写回 6。<strong>B 的 +1 就这样丢了</strong>。用 1000 个 goroutine 同时跑，结果几乎必然小于 1000：</p>
        <div class="mb-4"><Code language="go" :code="raceCode" title="counter-race.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Redux 要求 reducer 是<strong>纯函数</strong>——同样的 state 和 action，永远算出同样的新 state，不读外部可变状态、不改外部数据。这本质就是<strong>原子性思想</strong>：reducer 的输入输出完全确定，不依赖"哪个 action 先 dispatch"之外的任何时序，并发派发才不会错乱。</p>
        </aside>
      </section>

      <!-- 5. 处理器层面 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>处理器层面：上下文切换与真并行</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">竞态不是"多核才有"的特权。理解两个机制，你就知道为什么处处可能交错：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>上下文切换（单核）</strong>：时钟中断触发后，操作系统保存当前执行流的寄存器状态、加载下一个执行流的——切换点<strong>可以在任意指令边界</strong>。于是"LOAD 完、ADD 前"被打断完全合法。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>多核真并行（多核）</strong>：两个核真的同时在执行各自的指令。它们各自有独立的寄存器，靠缓存一致性让内存只有一个"版本"——于是两个核可以同时完成 LOAD 读到同一个 5，再各自写回 6。</span></li>
        </ul>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">单核（并发 Concurrent）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">多核（并行 Parallel）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">指令执行</td><td class="px-4 py-2 border">同一时刻只跑一个执行流</td><td class="px-4 py-2 border">多个核同时执行各自指令</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">交错来源</td><td class="px-4 py-2 border">定时器中断 → 抢占式切换</td><td class="px-4 py-2 border">真的同时发生 + 缓存一致性合并写</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">会不会竞态</td><td class="px-4 py-2 border font-semibold text-red-600">照样会（抢占式调度交错）</td><td class="px-4 py-2 border font-semibold text-red-600">会（真并行）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>"我这是单核机器，不会竞态吧？"——<strong>错</strong>。只要操作系统是<strong>抢占式调度</strong>（现代操作系统全是），调度器随时可能把一个执行流切走再切回来，read-modify-write 照样被拆散。单核只是缩小了窗口，没消灭窗口。</p>
        </aside>
      </section>

      <!-- 6. 解决思路 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>解决思路：锁 / 信号量 / 原子指令 / TSL</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">目标只有一个：把"进临界区 → 操作共享数据 → 出临界区"变成<strong>不可分割</strong>的。四条经典路线：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>互斥锁（Mutex）</strong>：同一时刻只有持锁者能进临界区。拿不到锁就<strong>等待</strong>（休眠或自旋）。软件里的同步原语，由下层的原子指令实现。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>信号量（Semaphore）</strong>：一个计数器，P（wait）减一、V（signal）加一。允许"同时最多 N 个"进入——不只是 1。用于资源池限流、生产-消费同步。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>原子指令（CAS / 原子加）</strong>：硬件保证某一条指令<strong>不可中断</strong>。CAS（Compare-And-Swap）：值还是旧值才写入，否则重试；原子加直接完成"读-改-写"。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>TSL（Test-and-Set）</strong>：硬件层面<strong>一次性</strong>完成"读锁值 + 把锁设为 1"，原子地返回旧值。历史上最经典的锁原语，现代锁和原子指令都是它的进化。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="tslCode" title="tsl-cas.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方案</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">保护范围</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">等待方式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">互斥锁</td><td class="px-4 py-2 border">整段临界区代码</td><td class="px-4 py-2 border">阻塞/休眠（不烧 CPU）</td><td class="px-4 py-2 border">临界区较长、多语句</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">信号量</td><td class="px-4 py-2 border">资源池、同步计数</td><td class="px-4 py-2 border">阻塞或忙等</td><td class="px-4 py-2 border">允许多个并发、生产-消费</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">原子指令</td><td class="px-4 py-2 border">单个变量的读-改-写</td><td class="px-4 py-2 border">CAS 自旋重试</td><td class="px-4 py-2 border">简单计数器、无锁结构</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">TSL</td><td class="px-4 py-2 border">硬件锁标志位</td><td class="px-4 py-2 border">忙等（早期简单实现）</td><td class="px-4 py-2 border">教学/早期单核系统</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 链条：</strong>锁、信号量的内部，其实都是靠<strong>原子指令（TSL/CAS）</strong>来实现的——拿锁的"检查锁是否空闲 + 上锁"两步必须原子，否则两个线程会同时以为拿到了锁。所以原子指令是比锁更底层的硬件基石。</p>
        </aside>
      </section>

      <!-- 7. happens-before -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>happens-before（先于发生）：推理并发正确性的工具</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">光靠"上锁"不够，你还得<strong>说清楚操作之间有没有顺序</strong>。<strong>happens-before</strong> 定义：若 A happens-before B，则<strong>所有执行流都能观察到 A 先于 B 发生</strong>——A 写的东西对 B 一定可见。这个顺序不是靠"时间先后"（时钟可能不同步），而是由<strong>同步机制</strong>建立的：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>锁：<strong>Unlock happens-before 之后的 Lock</strong>——拿到锁的人一定看到上一个持锁者写的所有东西。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>Channel：<strong>发送 happens-before 接收</strong>——接收方必然看到发送方此前写的一切。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>原子指令：提供全序化的内存栅栏，原子操作之间保证顺序。</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="hbCode" title="happens-before.go" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>推理方法</strong>：如果两条访问共享数据的操作之间有一条 happens-before 边（比如经过了同一把锁、同一个 channel），它们就有确定的先后顺序，是安全的；如果<strong>没有任何同步边把它们串起来</strong>（不可比），它们就是<strong>并发</strong>的——这时要么有同步，要么就会竞态。检测器（-race）就是在帮你找"并发但没同步边"的访问对。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>两个并发请求都往 <code class="bg-purple-100 px-1 rounded text-xs font-mono">localStorage</code> 写同一个 key，最终值取决于谁后返回——<strong>没有 happens-before</strong>。前端常用解法是给请求带<strong>序号/版本号</strong>，只有"最新序号"的写才生效：序号就是一条手工建立的 happens-before 边，谁新谁赢。</p>
        </aside>
      </section>

      <!-- 8. 修复实战 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>修复实战：读 -race 报告 + Mutex / atomic 对照</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">把第 4 节的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">counter-race.go</code> 用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go run -race</code> 跑，Go 会打印出数据竞争报告。读报告的四个要点：</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>WARNING: DATA RACE</strong>：第一行，宣布抓到了。</li>
          <li><strong>Write at 0x... by goroutine N</strong>：哪个地址、哪个 goroutine 在写、写在哪一行。</li>
          <li><strong>Previous read at 0x... by goroutine M</strong>：另一个 goroutine 在写之前（或之后）的读——冲突双方都在报告里。</li>
          <li><strong>Goroutine N created at</strong>：栈帧底部还有 goroutine 的<strong>创建点</strong>，帮你定位是谁把它 new 出来的。</li>
        </ol>
        <div class="mb-4"><Code language="text" :code="reportCode" title="📟 go run -race 终端输出" /></div>
        <div class="mb-4"><Code language="go" :code="mutexCode" title="counter-fix.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 选型：</strong>只是<strong>单个变量的简单计数</strong>，用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">atomic.AddInt64</code>（快、无锁、可组合）；<strong>临界区里有多条语句 / 多个变量</strong>要一致更新，用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">sync.Mutex</code> 包住整段。原子解决不了"跨多个变量的复合操作"。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">-race</code> 是<strong>运行时检测</strong>，不是"加上就消除"——它只<strong>报告</strong>真实发生的交错，抓不到没发生过的交错。所以生产 CI 里常开 <code class="bg-amber-100 px-1 rounded text-xs font-mono">go test -race</code>，把竞态拦截在合代码之前。</p>
        </aside>
      </section>

      <!-- 9. ⭐ 与 Go 底层实现的关系 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⭐</span>与 Go 底层实现的关系</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Go 的并发模型把"线程"抽象成轻量的 <strong>goroutine</strong>，但<strong>共享变量的问题一点都没消失</strong>——goroutine 之间共享堆上的变量，照样有读-改-写交错，照样有数据竞争。Go 把本节的每一个概念都落成了具体机制：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>happens-before 规则内建</strong>：Go 内存模型（go.dev/ref/mem）明确规定——<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code> 的 Unlock 先于任何后续的 Lock；channel 的发送先于接收；<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync/atomic</code> 的操作保证全序。你在 Go 里写并发，推理顺序用的就是本节的 happens-before。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>-race = ThreadSanitizer（TSan）</strong>：编译期给每个内存读写插桩，用影子内存记录"哪个 goroutine 访问、读还是写、当时的向量时钟"；运行时发现<strong>不同 goroutine + 至少一个写 + 时钟不可比（无 happens-before 边）</strong>就报 DATA RACE——它实现的就是本节"找并发但无同步的访问对"。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>解法即本节工具</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code>（互斥锁）、<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync/atomic</code>（原子指令 CAS / AddInt64）、channel（happens-before 载体）。</div></li>
        </ol>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">跳转阅读：<Link :route="'go-2-10-race-detection'" :text="'Go 竞态检测：-race 原理与实战'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-5-sync-mutex'" :text="'sync.Mutex：互斥锁实战'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话总结：</strong>你在 Go 里用 Mutex / atomic / channel 时，做的正是 OS 教材里"解决临界区问题、建立 happens-before"这件事——本节讲透了原理，那三个工具就是它的 Go 实现。</p>
        </aside>
      </section>

      <!-- 10. 常见坑 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见坑</h2>
        <ul class="space-y-3 text-slate-600 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class=""><strong>"单核就不会竞态"</strong>——抢占式调度照样交错。定时器中断随时可能发生在 LOAD 和 STORE 之间，单核只是窗口更小，不是没有。<Link :route="'cs-5-b-4-scheduling'" :text="'进程调度（回到抢占式调度）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class=""><strong>TOCTOU（Time-of-Check to Time-of-Use）</strong>：先检查再执行。比如"先检查缓存里有没有 key，没有再去算"——检查和用之间，别的 goroutine 已经把 key 填进去了，你仍会白算一遍或覆盖别人。检查与使用必须作为一个整体加锁。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class=""><strong>"只在测试环境复现过，就不管了"</strong>——竞态依赖时序，可能跑一万次才中一次，测不出来不代表没有。bug 是真实的，只是概率低。正确姿势：CI 常开 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go test -race</code>，用检测器帮你提前现形。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class=""><strong>"给共享数据上了锁，就万事大吉"</strong>——锁是<strong>约定</strong>不是属性。访问同一份数据的代码必须<strong>全部</strong>用同一把锁：一处绕过、或用了两把不同的锁保护同一数据，竞态立刻回来。</div></li>
        </ul>
      </section>

      <!-- 11. 小结 -->
      <section id="sec-11" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结 ✅</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>竞态条件</strong> = 结果依赖执行时序；<strong>数据竞争</strong> = 严格的内存级定义（并发 + 至少一个写 + 无同步）。数据竞争几乎必然导致竞态，竞态未必来自数据竞争。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>临界区</strong>是访问共享资源的代码段，正确解法要同时满足<strong>互斥 / 前进 / 有限等待</strong>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">counter++</code> 是 <strong>LOAD-ADD-STORE</strong> 三条指令，非原子，可被上下文切换拆散——单核抢占式调度也会交错。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>解法四路：<strong>互斥锁 / 信号量 / 原子指令（CAS·原子加）/ TSL</strong>，锁的内部由原子指令实现。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>happens-before</strong> 由锁 / channel / 原子建立，是推理并发正确性的核心工具。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>Go 落地：<code class="bg-slate-100 px-1 rounded text-xs font-mono">-race</code>（TSan）找竞态，<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync/atomic</code> / channel 来修复与同步。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">下一篇进入同步工具的具体实现：<Link :route="'cs-5-c-2-locks'" :text="'互斥锁、自旋锁、读写锁'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-b-4-scheduling'" :text="'← 上一节：CPU调度：FCFS/SJF/RR/CFS'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-c-2-locks'" :text="'下一节：互斥锁、自旋锁、读写锁 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "竞态条件：定义" },
  { id: "sec-2", name: "数据竞争 vs 竞态条件" },
  { id: "sec-3", name: "临界区三要求" },
  { id: "sec-4", name: "原子性 & counter++" },
  { id: "sec-5", name: "处理器层面" },
  { id: "sec-6", name: "解决思路" },
  { id: "sec-7", name: "happens-before" },
  { id: "sec-8", name: "修复实战" },
  { id: "sec-9", name: "⭐ 与 Go 底层实现" },
  { id: "sec-10", name: "⚠️ 常见坑" },
  { id: "sec-11", name: "小结" },
]

// ===== ① 竞态复现：1000 个 goroutine 同时 counter++ =====
const raceCode = `// counter-race.go — 复现竞态：结果远小于 1000
// 跑法：go run counter-race.go         （结果随机）
//        go run -race counter-race.go  （打印 DATA RACE 报告）
package main

import (
    "fmt"
    "sync"
)

func main() {
    var counter int // 共享变量：所有 goroutine 都在改它
    const n = 1000

    var wg sync.WaitGroup
    wg.Add(n)
    for i := 0; i < n; i++ {
        go func() {
            defer wg.Done()
            counter++ // 读-改-写，不是一条原子指令！
        }()
    }
    wg.Wait() // 等全部 goroutine 结束

    fmt.Println("counter =", counter)
    // 输出: counter = 973     （每次运行结果都不同，通常远小于 1000）
    // 说明: 大量 goroutine 的 LOAD-ADD-STORE 交错，互相覆盖自增
}`;

// ===== ② -race 报告格式解读 =====
const reportCode = `==================
WARNING: DATA RACE
Write at 0x00c0000aa010 by goroutine 25:      ← ① 谁在写：goroutine 25 写这个地址
  main.main.func1()
      ./counter-race.go:18 +0x3d             ← 写发生在哪一行
  ...（更多调用栈帧）

Previous read at 0x00c0000aa010 by goroutine 26:  ← ② 之前谁在读：goroutine 26
  main.main.func1()
      ./counter-race.go:18 +0x3d

Goroutine 25 (running) created at:            ← ③ 创建点：谁启动了 goroutine 25
  main.main()
      ./counter-race.go:14 +0x4f
Goroutine 26 (running) created at:
  main.main()
      ./counter-race.go:14 +0x4f
==================
Found 1 data race(s)
// 解读：两个 goroutine 都没经过同步边就访问同一地址（一个写），
// 且至少一个写 —— 满足数据竞争四条件，TSan 报错。`;

// ===== ③ 修复对照：Mutex vs atomic =====
const mutexCode = `// counter-fix.go — 两种修复对照，结果都是 1000
package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

// 方案 A：互斥锁 —— 把"读-改-写"整段包进临界区
func withMutex(n int) int {
    var counter int
    var mu sync.Mutex
    var wg sync.WaitGroup
    wg.Add(n)
    for i := 0; i < n; i++ {
        go func() {
            defer wg.Done()
            mu.Lock()      // 进入临界区：同一时刻只有 1 个能进来
            counter++      // LOAD-ADD-STORE 不再被打断
            mu.Unlock()    // 退出临界区：释放锁
        }()
    }
    wg.Wait()
    return counter
}

// 方案 B：原子指令 —— 硬件保证一条指令不可分割
func withAtomic(n int) int64 {
    var counter int64
    var wg sync.WaitGroup
    wg.Add(n)
    for i := 0; i < n; i++ {
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1) // 读-改-写原子完成，不可中断
        }()
    }
    wg.Wait()
    return counter
}

func main() {
    fmt.Println("Mutex:", withMutex(1000))   // 输出: Mutex: 1000
    fmt.Println("Atomic:", withAtomic(1000))  // 输出: Atomic: 1000
}`;

// ===== TSL / CAS：硬件原子指令 =====
const tslCode = `// tsl-cas.go — 硬件原子指令的 Go 映射（概念示意）
package main

import "sync/atomic"

// TSL（Test-and-Set）：读旧值 + 把锁设为 1，原子地一步完成
// Go 里 atomic.SwapInt32 就是这个语义
func testAndSet(lock *int32) bool {
    old := atomic.SwapInt32(lock, 1) // 读旧值并写 1，一条不可中断的操作
    return old == 0                  // 旧值是 0 → 锁之前空闲 → 抢锁成功
}

// CAS（Compare-And-Swap）：只有值还是旧值时写入新值，否则失败
func addOne(p *int32) {
    for {
        old := atomic.LoadInt32(p)
        // 没人在这期间改动过才写回；被抢了就重试（自旋）
        if atomic.CompareAndSwapInt32(p, old, old+1) {
            return
        }
    }
}

// 现代锁（Go 的 sync.Mutex）内部就是用这类原子指令抢锁的：
// "检查锁是否空闲 + 上锁" 必须原子，否则两个 goroutine 会同时以为自己拿到锁`;

// ===== happens-before：channel 建立顺序 =====
const hbCode = `// happens-before.go — channel 收发建立顺序，读一定看到写
package main

import "fmt"

func main() {
    ch := make(chan struct{})
    x := 0

    go func() {
        x = 42      // ① 写共享变量
        close(ch)   // ② 发送同步信号（close 与接收之间也建立 happens-before）
    }()

    <-ch            // ③ 接收：与 ② 建立 happens-before
    fmt.Println(x)  // 输出: 42 —— 必然看到 G1 的写，不靠运气

    // 对比：如果去掉 channel，x 的读和写之间没有同步边，
    // 就是并发访问 —— go run -race 会报 DATA RACE
}`;
</script>
