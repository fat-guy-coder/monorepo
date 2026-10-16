<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚡ Goroutine 与 GMP 调度模型</h1>
          <p class="text-sm text-slate-500 mt-1">Go 的轻量级并发 — 2KB 栈、百万并发、M:N 调度</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/concurrency/go-2-1-goroutine-gmp.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：GMP 三层调度模型
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          GMP 模型把<strong>N 个 goroutine（G）</strong>映射到<strong>M 个 OS 线程（M）</strong>上，由<strong>P 个逻辑处理器（P）</strong>调度。
          G 是被执行的代码，M 是真正干活的线程，P 是连接两者的"工作台"——P 持有 G 的本地队列，M 必须绑定 P 才能执行 G。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 340" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="gmp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 全局运行队列（顶部） -->
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">全局运行队列 runq（放溢出的 G，加锁访问）</text>
            <rect x="16" y="32" width="688" height="42" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="36" y="53" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">（通常为空——G 优先进 P 的本地队列）</text>

            <!-- P0 本地队列 -->
            <text x="16" y="102" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">P0（逻辑处理器）— 本地队列 runq（无锁）</text>
            <rect x="16" y="112" width="340" height="72" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <!-- 本地队列里的 G -->
            <rect x="32" y="126" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="58" y="146" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">G1</text>
            <rect x="96" y="126" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="122" y="146" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">G2</text>
            <rect x="160" y="126" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="186" y="146" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">G3</text>
            <!-- runnext 单槽缓存 -->
            <rect x="236" y="126" width="52" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 3" />
            <text x="262" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">G4</text>
            <text x="262" y="156" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#b45309">runnext</text>
            <text x="312" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">本地队列<tspan x="312" y="162">容量 256</tspan></text>

            <!-- P1 本地队列 -->
            <text x="380" y="102" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">P1（逻辑处理器）— 本地队列 runq（无锁）</text>
            <rect x="380" y="112" width="324" height="72" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <rect x="396" y="126" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="422" y="146" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">G5</text>
            <rect x="460" y="126" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="486" y="146" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">G6</text>
            <text x="560" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">本地队列<tspan x="560" y="162">容量 256</tspan></text>

            <!-- 箭头 P → M -->
            <line x1="186" y1="184" x2="186" y2="210" stroke="#94a3b8" stroke-width="2" marker-end="url(#gmp-arr)" />
            <line x1="542" y1="184" x2="542" y2="210" stroke="#94a3b8" stroke-width="2" marker-end="url(#gmp-arr)" />

            <!-- M0 -->
            <text x="16" y="228" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">M0（OS 线程）</text>
            <rect x="16" y="238" width="340" height="56" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="36" y="258" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">M0 — 绑定 P0</text>
            <text x="36" y="278" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b91c1c">正在执行 G1（curg）</text>

            <!-- M1 -->
            <text x="380" y="228" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">M1（OS 线程）</text>
            <rect x="380" y="238" width="324" height="56" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="400" y="258" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">M1 — 绑定 P1</text>
            <text x="400" y="278" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b91c1c">正在执行 G5（curg）</text>

            <!-- 图例 -->
            <text x="16" y="322" font-size="11" font-family="monospace" fill="#0891b2">G=goroutine（2KB 栈）· P=逻辑处理器（=CPU 核数）· M=OS 线程 · M 必须绑 P 才能执行 G</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：GMP 三层模型——每个 P 有本地 G 队列（含 runnext 单槽缓存），每个 M 绑定一个 P 执行 G，全局队列只在本地队列满时存放溢出的 G</figcaption>
        </figure>

        <!-- 操作示意图：工作窃取 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">工作窃取（Work Stealing）：空 P 从忙 P 偷一半 G</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">窃取前：P0 空，P1 忙（有 4 个 G）</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="40" width="150" height="44" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
              <text x="85" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">P0（空）</text>
              <rect x="180" y="40" width="150" height="44" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
              <rect x="190" y="52" width="28" height="22" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="204" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">G5</text>
              <rect x="224" y="52" width="28" height="22" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="238" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">G6</text>
              <rect x="258" y="52" width="28" height="22" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="272" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">G7</text>
              <rect x="292" y="52" width="28" height="22" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="306" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">G8</text>
              <text x="170" y="110" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">P0 队列空 → 触发工作窃取</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">窃取后：P0 从 P1 队尾偷了一半（G7、G8）</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="gmp-steal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              </defs>
              <rect x="10" y="40" width="150" height="44" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
              <rect x="22" y="52" width="28" height="22" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="36" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">G7</text>
              <rect x="56" y="52" width="28" height="22" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="70" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">G8</text>
              <text x="85" y="100" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#15803d">P0（偷到 G7 G8）</text>
              <rect x="180" y="40" width="150" height="44" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
              <rect x="190" y="52" width="28" height="22" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="204" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">G5</text>
              <rect x="224" y="52" width="28" height="22" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="238" y="63" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">G6</text>
              <text x="255" y="100" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0369a1">P1（剩 G5 G6）</text>
              <path d="M 306 63 Q 320 63 320 30 Q 320 10 70 10 Q 36 10 36 40" fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#gmp-steal)" />
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">从队尾偷一半（不是队头），减少与被偷 P 的锁竞争</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. goroutine = 用户态协程 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          goroutine = 用户态协程，不是 OS 线程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          goroutine 是 Go 运行时（runtime）自己管理的<strong>用户态协程</strong>。一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">go</code> 关键字就启动一个并发协程。
          它<strong>不是操作系统线程</strong>——一个 OS 线程上可以跑成百上千个 goroutine，调度由 Go runtime 完成，<strong>不劳烦内核</strong>。
          这一节把「为什么用户态切换这么轻」讲透。
        </p>

        <div class="mb-4"><Code language="go" :code="basicCode" title="goroutine_basic.go" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-purple-800"><strong>🔗 前端/跨语言类比：</strong><br/>
          JS: <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">await Promise.all([fetch1(), fetch2()])</code> — 两个请求并发<br/>
          Go: <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">go fetch1(); go fetch2()</code> — 写起来像同步代码，却是并发的<br/>
          <strong>关键差异：</strong>Node.js 线程栈默认几 MB；Go goroutine 初始栈仅 <strong>2KB</strong>，可轻松启动<strong>百万个</strong>。<br/>
          Python asyncio ≈ Go 的用户态并发模型（协程 + 事件循环），但 Go 有多个 P，能利用多核<strong>真正并行</strong>。
          </p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">1.1 先分清「用户态」和「内核态」—— 贵的是进内核</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          要理解 goroutine 为什么轻，得先知道「切换」贵在哪里。CPU 运行时分两种模式：
        </p>
        <div class="overflow-x-auto mb-3">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">模式</th><th class="px-4 py-2 border border-slate-200 font-semibold">由谁执行</th><th class="px-4 py-2 border border-slate-200 font-semibold">权限</th><th class="px-4 py-2 border border-slate-200 font-semibold">能否碰硬件/内核数据</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold text-slate-700">用户态 User Mode</td><td class="px-4 py-2 border">你的应用代码</td><td class="px-4 py-2 border">受限，不能执行特权指令</td><td class="px-4 py-2 border">❌</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold text-slate-700">内核态 Kernel Mode</td><td class="px-4 py-2 border">操作系统内核</td><td class="px-4 py-2 border">全权限，可访问所有资源</td><td class="px-4 py-2 border">✅</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          每次<strong>系统调用</strong>（读写文件、收发网络、创建线程……）都要从用户态<strong>陷入内核态</strong>再返回：CPU 切换特权级、保存/恢复一整套寄存器、可能切换页表导致 <strong>TLB / Cache 失效</strong>——光这一趟就有几百 ns ~ 几 μs 的开销。这正是「线程切换贵」的根本来源。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">1.2 内核线程切换：为什么一次要花几 μs</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">操作系统调度线程切换，大致做这几件事：</p>
        <ol class="space-y-2 mb-3 text-sm text-slate-600 leading-relaxed">
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><span><strong>时钟中断触发</strong>：CPU 每若干 ms 收到硬件中断，进内核态找调度器。</span></li>
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><span><strong>保存当前线程上下文</strong>：所有通用寄存器、PC、SP、内核栈指针等，写进该线程的内核控制块。</span></li>
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><span><strong>切换内存上下文</strong>：换页表，TLB 被冲刷，之后访问数据大概率 Cache 未命中——这是隐藏的大头成本。</span></li>
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><span><strong>恢复目标线程上下文</strong>：读它的寄存器、PC，返回用户态继续跑。</span></li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          所以线程切换 ≈ <strong>一次内核往返 + 页表切换 + Cache 冷启动</strong>，约 <strong>1~10 μs</strong>，而且是<strong>抢占式</strong>——你无法控制它何时发生。
        </p>

        <div class="bg-slate-50 border-l-4 border-slate-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-slate-600">
            🧵 想从根上补「线程」本身——进程 / 线程 / 协程的区别、线程的创建与调度？
            <Link :route="'cs-5-b-3-thread'" :text="'计算机基础：线程'" animation="none" size="small"
              class="p-0! text-sm! font-medium! text-cyan-700! hover:text-cyan-600! bg-transparent! border-none! inline!" />
          </p>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">1.3 goroutine 切换：上下文就存在自己的 g 里（gobuf）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          goroutine 把「切换需要的全部现场」——栈指针 SP、指令指针 PC、通用寄存器——保存在 runtime 内部的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">g.gobuf</code> 字段里。
          切换就是：<strong>把正在跑的 G1 的寄存器写进它的 gobuf，再从 G2 的 gobuf 读出来恢复</strong>，然后跳转执行。
          全程不触发系统调用、不进内核、不换页表——这是它比线程快 ~100 倍的根本原因。
        </p>

        <figure class="mb-4">
          <svg viewBox="0 0 560 268" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="uctx-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
            </defs>
            <rect x="150" y="8" width="240" height="44" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="270" y="36" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">M（OS 线程）正在执行 G1</text>
            <line x1="270" y1="52" x2="270" y2="80" stroke="#94a3b8" stroke-width="2" marker-end="url(#uctx-arr)" />
            <text x="282" y="72" font-size="10" font-family="monospace" fill="#64748b">① G1 执行 &lt;-ch，channel 空 → 阻塞</text>
            <rect x="150" y="82" width="240" height="66" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="270" y="102" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#0369a1">runtime：保存 G1 上下文到 gobuf</text>
            <text x="270" y="120" text-anchor="middle" font-size="10" font-family="monospace" fill="#0369a1">SP · PC · 寄存器 → G1.gobuf</text>
            <text x="270" y="137" text-anchor="middle" font-size="10" font-family="monospace" fill="#0369a1">状态 _Grunning → _Gwaiting</text>
            <line x1="270" y1="148" x2="270" y2="176" stroke="#94a3b8" stroke-width="2" marker-end="url(#uctx-arr)" />
            <text x="282" y="168" font-size="10" font-family="monospace" fill="#64748b">② 从 P 本地队列取下一个 G2</text>
            <rect x="150" y="178" width="240" height="66" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="270" y="198" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#0369a1">runtime：恢复 G2 上下文</text>
            <text x="270" y="216" text-anchor="middle" font-size="10" font-family="monospace" fill="#0369a1">从 G2.gobuf 读回 SP · PC</text>
            <text x="270" y="233" text-anchor="middle" font-size="10" font-family="monospace" fill="#0369a1">M 跳转 → 继续执行 G2</text>
            <rect x="414" y="82" width="132" height="122" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5" />
            <text x="480" y="104" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">✅ 全程用户态</text>
            <text x="480" y="124" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d">无系统调用</text>
            <text x="480" y="142" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d">不换页表 / 不失效 Cache</text>
            <text x="480" y="162" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d">切换 ~ 几十~上百 ns</text>
            <text x="480" y="182" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d">vs 线程 ~ μs（≈100 倍）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：一次用户态切换——G1 阻塞时把寄存器存进自己的 gobuf，再从 G2 的 gobuf 恢复，M 从头到尾没离开用户态</figcaption>
        </figure>

        <p class="text-slate-600 mb-2 leading-relaxed text-sm">把上图翻译成完整执行流程（以 G1 在 channel 上等待为例）：</p>
        <ol class="space-y-2 mb-4 text-sm text-slate-600 leading-relaxed">
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><span>G1 在 M 上执行到 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">&lt;-ch</code>，发现 channel 空，需要等待。</span></li>
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><span>runtime 调 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">gopark</code>：把 SP/PC/寄存器写进 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">G1.gobuf</code>，G1 状态 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">_Grunning → _Gwaiting</code>，挂到 ch 的等待队列。</span></li>
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><span>runtime 从 P 的本地队列取 G2（空则工作窃取），从 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">G2.gobuf</code> 恢复寄存器。</span></li>
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><span>M 跳转到 G2 的 PC，无缝继续执行——全程<strong>没有一次系统调用</strong>。</span></li>
          <li class="flex gap-2"><span class="shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><span>回头，别的 goroutine 往 ch 发了数据 → runtime 调 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">goready</code>，G1 变 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">_Grunnable</code> 放回队列，轮到它时再从 gobuf 恢复接着跑。</span></li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-3">1.4 协作式 + 抢占式：goroutine 比「严格协程」更抗饿</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          传统协程（Lua、Python generator）是<strong>协作式</strong>：只有在你主动 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">yield</code> 的点才会让出 CPU，一个协程死循环就能卡死整个线程。
          goroutine 是<strong>协作 + 抢占混合</strong>：
        </p>
        <ul class="space-y-2 mb-3 text-sm text-slate-600 leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>协作部分（让出点）</strong>：channel 收发、系统调用、锁竞争、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">time.Sleep</code>、GC、显式 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">runtime.Gosched()</code>——这些地方 runtime 主动调度别的 G。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>抢占部分（Go 1.14+）</strong>：基于信号<strong>异步抢占</strong>——goroutine 跑满 <strong>10ms</strong>，runtime 向它所在 M 发信号强制打断、保存上下文、换 G。所以 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">for {}</code> 死循环在 1.14+ 也饿不死别的 goroutine（会浪费 CPU，但不是死锁）。</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="goschedCode" title="user_mode_switch.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">1.5 对比总表：OS 线程 vs goroutine</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">OS 线程</th><th class="px-4 py-2 border border-slate-200 font-semibold">goroutine</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">栈</td><td class="px-4 py-2 border">固定 1~8 MB</td><td class="px-4 py-2 border">初始 2 KB，按需 2x 增长</td></tr>
              <tr><td class="px-4 py-2 border">谁调度</td><td class="px-4 py-2 border">操作系统内核（抢占式）</td><td class="px-4 py-2 border">Go runtime（用户态，协作 + 10ms 抢占）</td></tr>
              <tr><td class="px-4 py-2 border">切换开销</td><td class="px-4 py-2 border">~1~10 μs（进内核 + 页表切换 + Cache 冷启动）</td><td class="px-4 py-2 border">~几十~上百 ns（纯用户态，无 syscall）</td></tr>
              <tr><td class="px-4 py-2 border">创建开销</td><td class="px-4 py-2 border">~几十 μs</td><td class="px-4 py-2 border">~几百 ns（差 ~1000 倍）</td></tr>
              <tr><td class="px-4 py-2 border">上限数量</td><td class="px-4 py-2 border">几千个（受内存/内核限制）</td><td class="px-4 py-2 border">百万级</td></tr>
              <tr><td class="px-4 py-2 border">并行能力</td><td class="px-4 py-2 border">天然并行</td><td class="px-4 py-2 border">多核并行靠 P（=GOMAXPROCS）映射到线程</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>main 函数退出时，<strong>所有 goroutine 都会被强制终止</strong>。示例中用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">time.Sleep</code> 只是演示，实际项目用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sync.WaitGroup</code> 或 channel 来等待。</p>
        </aside>
      </section>

      <!-- 2. GMP 模型 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          GMP 调度模型 — goroutine 如何被执行
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go runtime 使用 <strong>GMP 模型</strong>将 N 个 goroutine 映射到 M 个 OS 线程上，由 P 个逻辑处理器调度。
          这是 Go 并发模型的<strong>核心</strong>，面试必问。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">组件</th><th class="px-4 py-2 border border-slate-200 font-semibold">全称</th><th class="px-4 py-2 border border-slate-200 font-semibold">职责</th><th class="px-4 py-2 border border-slate-200 font-semibold">类比</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">G</td><td class="px-4 py-2 border">Goroutine</td><td class="px-4 py-2 border">用户态执行单元 — 包含栈、PC、状态</td><td class="px-4 py-2 border">JS 的 Task/Callback</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">M</td><td class="px-4 py-2 border">Machine (OS Thread)</td><td class="px-4 py-2 border">操作系统线程 — 真正执行代码</td><td class="px-4 py-2 border">Worker Thread</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">P</td><td class="px-4 py-2 border">Processor</td><td class="px-4 py-2 border"><strong>逻辑处理器</strong> — 持有 G 本地队列。数量 = GOMAXPROCS（默认 CPU 核数）</td><td class="px-4 py-2 border">Event Loop 实例</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">调度流程（4 步核心）</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>本地队列取 G</strong> — 每个 P 有一个本地 goroutine 队列（容量 256），P 从队头取 G 交给 M 执行。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>阻塞时分离 M-P</strong> — G 执行系统调用阻塞时，M 和 P 分离。P 找新 M（或新建 M）继续执行其他 G。原 M 等系统调用返回后，G 被放回队列。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>工作窃取（Work Stealing）</strong> — P 的本地队列空了 → 从<strong>全局队列</strong>取，或从<strong>其他 P 的队尾偷一半</strong> G。这实现了动态负载均衡。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>抢占式调度（Go 1.14+）</strong> — 基于信号的异步抢占。goroutine 运行超过 10ms → 被抢占，避免一个死循环卡死整个 P。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="gmpCode" title="gmp_demo.go" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ GMP 核心优势：</strong>M:N 调度 — goroutine 切换仅在<strong>用户态</strong>（~几十 ns），不需内核态上下文切换（~几 μs，约 100 倍差距）。goroutine 阻塞时<strong>P 自动接管其他 G</strong>——I/O 等待期间 CPU 不闲着。</p>
        </aside>
      </section>

      <!-- 3. goroutine 栈 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          goroutine 的可增长栈 — 为什么能百万并发
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个 goroutine 初始只有 <strong>2KB 栈</strong>。栈不够时 runtime 自动分配一个更大的栈（2x），把旧栈数据<strong>复制过去</strong>，
          指针自动更新。OS 线程的栈是<strong>固定的 1~8MB</strong>——这就是为什么 OS 线程最多几千个，而 goroutine 可以百万个。
        </p>
        <div class="mb-4"><Code language="go" :code="stackCode" title="stack_demo.go" /></div>
      </section>

      <!-- 4. 闭包陷阱与 WaitGroup -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          闭包陷阱 & WaitGroup
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">循环变量闭包陷阱（Go &lt; 1.22 经典 bug）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          for 循环中，循环变量在迭代间<strong>复用同一地址</strong>。如果 goroutine 里用了闭包捕获循环变量，
          所有 goroutine 读到的都是循环结束后的值。Go 1.22+ 已自动修复——但面试还会考。
        </p>
        <div class="mb-4"><Code language="go" :code="closureCode" title="closure_trap.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">sync.WaitGroup — 等待一组 goroutine</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          用 WaitGroup 而不是 time.Sleep。三个方法：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Add(n)</code> 加计数、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Done()</code> 减计数（等价 Add(-1)）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Wait()</code> 阻塞到计数归零。
        </p>
        <div class="mb-4"><Code language="go" :code="wgCode" title="waitgroup.go" /></div>
      </section>

      <!-- 5. goroutine 泄漏 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          goroutine 泄漏 —— 隐形的内存泄漏
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          goroutine 不会自动结束——函数执行完才退出。如果 goroutine 在等待一个<strong>永远不会到来的 channel 消息</strong>，
          它就<strong>永远阻塞</strong>，占着栈内存不会被 GC——这就是 goroutine 泄漏。10 万个泄漏的 goroutine = ~200MB 内存浪费。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">❌ 泄漏</h4>
            <Code language="go" :code="leakBadCode" title="leak.go" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">✅ 正确：给退出路径</h4>
            <Code language="go" :code="leakGoodCode" title="no_leak.go" />
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-2 mt-4">检测泄漏</h3>
        <p class="text-slate-600 text-sm mb-2">
          用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">runtime.NumGoroutine()</code> 在测试前后对比 goroutine 数量。
          或使用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go.uber.org/goleak</code> 自动检测。
        </p>
        <div class="mb-4"><Code language="go" :code="leakDetectCode" title="leak_detect_test.go" /></div>
      </section>

      <!-- 6. 常见问题 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💬</span>
          面试常见问题
        </h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: goroutine 和 OS 线程的区别？</strong>
            <p class="mt-1">goroutine 是<strong>用户态</strong>，Go runtime 调度，2KB 可增长栈。线程是<strong>内核态</strong>，OS 调度，1-8MB 固定栈。goroutine 切换 ~几十~上百 ns，线程切换 ~1-10 μs（~100x 差距）。根本原因：goroutine 切 G 只读写用户态内存（gobuf），线程切换要进内核 + 换页表 + TLB/Cache 失效。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: goroutine 是协作式还是抢占式？</strong>
            <p class="mt-1"><strong>两者都有</strong>。协作部分：channel 收发、syscall、锁、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">time.Sleep</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">runtime.Gosched()</code> 这些「让出点」主动让出 CPU。抢占部分：Go 1.14+ 基于信号的<strong>异步抢占</strong>，goroutine 跑满 10ms 会被强制打断。所以死循环也饿不死其他 goroutine。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: GOMAXPROCS 设多少合适？</strong>
            <p class="mt-1">默认 = CPU 核数。I/O 密集场景可以设大（阻塞的 P 被替换用新线程），但不要超过核数的 2-4 倍。CPU 密集不需要改。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: main goroutine 退出了，其他 goroutine 会怎样？</strong>
            <p class="mt-1"><strong>全部强制终止</strong>。main 函数 return → 整个进程退出。所以需要 WaitGroup/channel/context 等主 goroutine。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: GMP 为什么能支持百万级 goroutine？</strong>
            <p class="mt-1">三个关键：① 2KB 初始栈（可增长），② 用户态调度（无内核开销），③ 工作窃取（负载均衡）。一个 OS 线程（~1MB 栈）能跑成千上万个 goroutine（~2KB 栈）。</p>
          </div>
        </div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：GMP 调度与工作窃取
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「调度」让 M 从 P 的本地队列取一个 G 执行（G 从队列移到 M 上，绿色高亮）。点「工作窃取」让空闲的 P0 从繁忙的 P1 队尾偷 G。
          观察 G 如何在 P 队列和 M 之间流转。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 P0 队列: {{ p0Len }} 个 G</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 P1 队列: {{ p1Len }} 个 G</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doSchedule" :disabled="busy || (p0Len + p1Len === 0)" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">调度一个 G</button>
          <button @mousedown="doSteal" :disabled="busy || p0Len > 0 || p1Len < 2" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">工作窃取</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- P0 区域 -->
              <v-rect :config="p0RectCfg" />
              <v-text :config="p0LabelCfg" />
              <v-rect v-for="(g,i) in p0" :key="'p0'+g.id" :config="gRectCfg(g, 0, i, p0)" />
              <v-text v-for="(g,i) in p0" :key="'p0t'+g.id" :config="gTextCfg(g, 0, i, p0)" />
              <!-- P1 区域 -->
              <v-rect :config="p1RectCfg" />
              <v-text :config="p1LabelCfg" />
              <v-rect v-for="(g,i) in p1" :key="'p1'+g.id" :config="gRectCfg(g, 1, i, p1)" />
              <v-text v-for="(g,i) in p1" :key="'p1t'+g.id" :config="gTextCfg(g, 1, i, p1)" />
              <!-- M 执行中的 G -->
              <v-text v-if="runningG" :config="runningCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go f()</code> 启动一个 goroutine — 初始 2KB 栈</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>用户态切换</strong>：goroutine 的现场存在自己的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">gobuf</code>，切 G 不进内核、无 syscall，~几十~上百 ns（vs 线程 ~μs，≈100 倍）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GMP = G（goroutine）+ M（OS 线程）+ P（逻辑处理器）</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>M:N 调度：N 个 goroutine → M 个 OS 线程，用户态切换极快</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工作窃取：</strong>空 P 从忙 P 偷 G，动态负载均衡</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>用 <strong>WaitGroup</strong> 等待 goroutine 完成，不要用 time.Sleep</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>goroutine 泄漏 = goroutine 永远阻塞 → 用 context/close(ch) 给退出信号</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-22-reflection" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：反射 reflect</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-2-channels" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Channel 通道 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
const userStore = useUserStore()

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "用户态协程" },
  { id: "sec-2", name: "GMP 调度模型" },
  { id: "sec-3", name: "可增长栈" },
  { id: "sec-4", name: "闭包陷阱 & WaitGroup" },
  { id: "sec-5", name: "goroutine 泄漏" },
  { id: "sec-6", name: "面试常见问题" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 GMP 调度动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(220), W = ref(700)
const PY0 = 40, PH = 70          // P 区域顶、高
const P0X = 20, P1X = 380        // 两个 P 的 x
const PW = 300                   // P 区域宽
const GW = 46, GH = 34, GG = 8   // G 方块宽高间距
const MY = 170                   // M 执行区 y
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref(''), nid = ref(100)
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GItem { id: number; name: string; color: string }
const p0 = reactive<GItem[]>([])
const p1 = reactive<GItem[]>([])
const runningG = ref<GItem | null>(null)

const p0Len = computed(() => p0.length)
const p1Len = computed(() => p1.length)

function init() {
  p0.length = 0; p1.length = 0
  p0.push({ id: 1, name: 'G1', color: C.cyan })
  p0.push({ id: 2, name: 'G2', color: C.cyan })
  p1.push({ id: 5, name: 'G5', color: C.cyan })
  p1.push({ id: 6, name: 'G6', color: C.cyan })
  p1.push({ id: 7, name: 'G7', color: C.cyan })
  p1.push({ id: 8, name: 'G8', color: C.cyan })
  runningG.value = null
  status.value = ''
}

const p0RectCfg = { x: P0X, y: PY0, width: PW, height: PH, fill: '#e0f2fe', cornerRadius: 8, stroke: '#0ea5e9', strokeWidth: 1.5 }
const p0LabelCfg = { x: P0X, y: PY0 + 8, width: PW, text: 'P0 — 本地队列', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0369a1', align: 'center' }
const p1RectCfg = { x: P1X, y: PY0, width: PW, height: PH, fill: '#e0f2fe', cornerRadius: 8, stroke: '#0ea5e9', strokeWidth: 1.5 }
const p1LabelCfg = { x: P1X, y: PY0 + 8, width: PW, text: 'P1 — 本地队列', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0369a1', align: 'center' }

function gRectCfg(g: GItem, pidx: number, idx: number, arr: GItem[]) {
  const px = pidx === 0 ? P0X : P1X
  const x = px + 16 + idx * (GW + GG)
  const y = PY0 + 32
  const s = g.name.startsWith('R') ? 1 : 1
  return { x: x + (GW * (1 - s)) / 2, y: y + (GH * (1 - s)) / 2, width: GW * s, height: GH * s,
    fill: g.color, cornerRadius: 6, stroke: '#0891b2', strokeWidth: 1.5 }
}
function gTextCfg(g: GItem, pidx: number, idx: number, arr: GItem[]) {
  const px = pidx === 0 ? P0X : P1X
  const x = px + 16 + idx * (GW + GG)
  const y = PY0 + 32
  return { x, y, width: GW, height: GH, text: g.name, fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }
}
const runningCfg = computed(() => ({
  x: P0X, y: MY, width: PW * 2 + 60, text: runningG.value ? `⚙️ M 正在执行 ${runningG.value.name}` : '⚙️ M 空闲',
  fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: runningG.value ? '#15803d' : C.muted, align: 'center',
}))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doSchedule() {
  act('调度 O(1)', async () => {
    // 优先从 P0 取，P0 空则从 P1 取
    const src = p0.length ? p0 : p1
    const g = src.shift()!
    status.value = `M 从 ${src === p0 ? 'P0' : 'P1'} 取 ${g.name}`
    await d(300)
    g.color = C.green
    runningG.value = g
    status.value = `${g.name} 正在 M 上执行`
    await d(600)
    runningG.value = null
  })
}

function doSteal() {
  act('工作窃取 O(1)', async () => {
    // P0 从 P1 队尾偷一半
    const stealCount = Math.ceil(p1.length / 2)
    status.value = `P0 从 P1 队尾偷 ${stealCount} 个 G`
    for (let i = 0; i < stealCount; i++) {
      const g = p1.pop()!
      g.color = C.green
      p0.push(g)
      await d(300)
    }
    p0.forEach(g => g.color = C.cyan)
    status.value = `P0 现有 ${p0.length} 个，P1 剩 ${p1.length} 个`
    await d(500)
  })
}

function doReset() { busy.value = false; init() }

let ro: ResizeObserver | null = null
onMounted(() => {
  init()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const basicCode = `package main

import (
    "fmt"
    "time"
)

func main() {
    go say("world")  // 启动 goroutine——不阻塞，立即返回
    say("hello")     // 主 goroutine 继续执行

    time.Sleep(100 * time.Millisecond) // 等 goroutine 完成（演示用）
}

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(50 * time.Millisecond)
        fmt.Println(s)
    }
}
// 输出（hello 和 world 交替）:
// hello
// world
// hello
// world
// ...`

const goschedCode = `// runtime.Gosched() — 显式让出 CPU（把执行权交还调度器）
// 演示「协作式切换点」：单 P 下，两个协程靠 Gosched 交替运行
package main

import (
    "fmt"
    "runtime"
    "time"
)

func worker(name string) {
    for i := 0; i < 3; i++ {
        fmt.Println(name, i)
        runtime.Gosched() // 让出执行权——单 P 下另一个协程才有机会跑
    }
}

func main() {
    runtime.GOMAXPROCS(1) // 强制单 P，保证是"切换"而不是"并行"

    go worker("A")
    go worker("B")

    time.Sleep(time.Millisecond) // 给协程执行的机会
}
// 输出（A/B 交替，谁先跑不固定——Gosched 就是协作式切换点）:
// B 0
// A 0
// B 1
// A 1
// B 2
// A 2
// 若把 Gosched 删掉：单 P 下第一个协程连续跑完 3 次才轮到第二个
// （1.14+ 有 10ms 抢占，但 3 次循环远不到 10ms，顺序基本固定）`

const gmpCode = `package main

import (
    "fmt"
    "runtime"
)

func main() {
    // GOMAXPROCS — 控制 P 的数量（即并行度）
    fmt.Println("CPU 核数:", runtime.NumCPU())
    fmt.Println("GOMAXPROCS:", runtime.GOMAXPROCS(0))

    // 查看当前 goroutine 数量
    fmt.Println("当前 goroutine 数:", runtime.NumGoroutine())

    // 演示：大量 goroutine 只占很少内存
    for i := 0; i < 10000; i++ {
        go func(n int) {
            // 每个 goroutine 只需 ~2KB 初始栈
            // 10000 个 ≈ 20MB 内存（vs 10000 线程 ≈ 10GB）
            _ = n
        }(i)
    }
    fmt.Println("10000 个 goroutine 已启动")
    fmt.Println("当前 goroutine 数:", runtime.NumGoroutine())
    // 输出: 10000 个 goroutine 已启动
    // 输出: 当前 goroutine 数: 10001（含 main）
}`

const stackCode = `// 演示 goroutine 栈的动态增长
func recursiveGrow(n int) {
    if n <= 0 { return }
    // 每次递归调用使栈增长
    // Go runtime 自动检测栈溢出 → 分配更大的栈（复制+更新指针）
    var data [1024]byte  // 每次分配 1KB 局部变量
    _ = data
    recursiveGrow(n - 1)
}

// 对比：OS 线程固定栈 ~1-8MB，goroutine 从 2KB 开始按需增长
// 1000 个 OS 线程 × 1MB = 1GB 栈内存
// 1000 个 goroutine × ~10KB 平均 = 10MB 栈内存（100x 差距！）`

const closureCode = `// ⚠️ Go < 1.22 经典 Bug
var wg sync.WaitGroup
for i := 0; i < 3; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("Bug版: i =", i)
        // Go < 1.22: 输出 3, 3, 3（全读最后一个值！）
        // Go >= 1.22: 输出 0, 1, 2（已修复）
    }()
}
wg.Wait()

// ✅ 修复方式一：传参（最可靠）
for i := 0; i < 3; i++ {
    wg.Add(1)
    go func(n int) {
        defer wg.Done()
        fmt.Println("传参: i =", n)  // 输出: 0, 1, 2
    }(i)  // ← 把 i 作为参数传入
}
wg.Wait()

// ✅ 修复方式二：局部副本（Go < 1.22 兼容）
for i := 0; i < 3; i++ {
    i := i  // 创建新变量，遮蔽外层 i
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("副本: i =", i)  // 输出: 0, 1, 2
    }()
}
wg.Wait()`

const wgCode = `// sync.WaitGroup — 等待一组 goroutine 完成
func main() {
    var wg sync.WaitGroup
    urls := []string{"url1", "url2", "url3", "url4", "url5"}

    for _, url := range urls {
        wg.Add(1)  // 计数器 +1（必须在 goroutine 外调用！）
        go func(u string) {
            defer wg.Done()  // 完成时 -1（defer 保证一定执行）
            fetch(u)          // 模拟请求
        }(url)
    }

    wg.Wait()  // 阻塞直到计数器归零
    fmt.Println("所有请求完成")
    // 输出:
    // 请求完成: url1
    // 请求完成: url5  (顺序随机)
    // ...
    // 所有请求完成
}`

const leakBadCode = `// ❌ goroutine 泄漏：永远等一个没人发的 channel
func leak() {
    ch := make(chan int)
    go func() {
        val := <-ch  // 永远阻塞——没人往 ch 发数据
        fmt.Println(val)
    }()
    // goroutine 永远不会结束，也不会被 GC 回收
    // 函数返回后，ch 和 goroutine 都泄漏了
}`

const leakGoodCode = `// ✅ 给 goroutine 一个退出路径
func noLeak(ctx context.Context) {
    ch := make(chan int)
    go func() {
        select {
        case val := <-ch:
            fmt.Println("收到:", val)
        case <-ctx.Done():
            fmt.Println("收到取消信号，退出")
            return
        }
    }()
}

// ✅ 或者用 close(ch) 广播退出信号
func noLeakWithClose() {
    ch := make(chan int)
    done := make(chan struct{})

    go func() {
        for {
            select {
            case v, ok := <-ch:
                if !ok {  // channel 已关闭
                    fmt.Println("channel 关闭，退出")
                    return
                }
                fmt.Println(v)
            case <-done:
                return
            }
        }
    }()
}`

const leakDetectCode = `// 用 runtime.NumGoroutine 检测泄漏
func TestNoLeak(t *testing.T) {
    before := runtime.NumGoroutine()
    // 执行业务逻辑...
    after := runtime.NumGoroutine()

    if after > before {
        t.Errorf("goroutine 泄漏: %d → %d", before, after)
    }
}

// 或用 goleak 库（推荐）
// import "go.uber.org/goleak"
func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)
}`
</script>
