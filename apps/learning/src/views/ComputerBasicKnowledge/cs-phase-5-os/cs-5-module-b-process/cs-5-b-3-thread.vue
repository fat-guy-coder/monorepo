<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">线程：用户态 / 内核态 / 轻量级进程</h1><p class="text-sm text-slate-500 mt-1">理解 goroutine 本质的钥匙——它为什么能这么轻？它到底跑在哪个"态"？</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-b-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：一层包一层的执行模型 + 两道门</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">进程是<strong>资源容器</strong>，线程是<strong>内核调度单元</strong>，协程是<strong>用户态轻量任务</strong>——它们一个套一个。而无论哪个，只要想碰硬件（改页表、读写磁盘、发网络包），都必须<strong>陷入内核态</strong>（Ring0）执行特权指令，这就引出本页最核心的一对概念：<strong>用户态 vs 内核态</strong>。</p>

        <!-- 结构图：进程/线程/协程层级 + 特权级环形示意 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 340" class="w-full h-auto">
            <defs><marker id="thr-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker></defs>
            <!-- 左：层级图 -->
            <text x="30" y="26" font-size="13" font-weight="bold" fill="#475569" font-family="monospace">进程 → 线程 → 协程（一层包一层）</text>
            <rect x="20" y="38" width="360" height="278" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="200" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">进程 Process（资源容器）</text>
            <rect x="40" y="70" width="150" height="200" rx="10" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="115" y="88" text-anchor="middle" font-size="11" font-weight="bold" fill="#0e7490" font-family="monospace">线程 T1（内核调度）</text>
            <rect x="54" y="100" width="122" height="30" rx="7" fill="#22d3ee"/>
            <text x="115" y="119" text-anchor="middle" font-size="10" font-weight="bold" fill="#083344" font-family="monospace">协程 G1</text>
            <rect x="54" y="138" width="122" height="30" rx="7" fill="#22d3ee"/>
            <text x="115" y="157" text-anchor="middle" font-size="10" font-weight="bold" fill="#083344" font-family="monospace">协程 G2</text>
            <rect x="54" y="176" width="122" height="30" rx="7" fill="#22d3ee"/>
            <text x="115" y="195" text-anchor="middle" font-size="10" font-weight="bold" fill="#083344" font-family="monospace">协程 G3</text>
            <rect x="54" y="214" width="122" height="44" rx="7" fill="#ffffff" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
            <text x="115" y="232" text-anchor="middle" font-size="9" fill="#475569" font-family="monospace">独享：栈 / 寄存器</text>
            <text x="115" y="247" text-anchor="middle" font-size="9" fill="#475569" font-family="monospace">PC 程序计数器</text>
            <rect x="210" y="70" width="150" height="200" rx="10" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="285" y="88" text-anchor="middle" font-size="11" font-weight="bold" fill="#0e7490" font-family="monospace">线程 T2</text>
            <rect x="224" y="100" width="122" height="30" rx="7" fill="#22d3ee"/>
            <text x="285" y="119" text-anchor="middle" font-size="10" font-weight="bold" fill="#083344" font-family="monospace">协程 G4</text>
            <rect x="224" y="138" width="122" height="30" rx="7" fill="#22d3ee"/>
            <text x="285" y="157" text-anchor="middle" font-size="10" font-weight="bold" fill="#083344" font-family="monospace">协程 G5</text>
            <rect x="224" y="176" width="122" height="30" rx="7" fill="#22d3ee"/>
            <text x="285" y="195" text-anchor="middle" font-size="10" font-weight="bold" fill="#083344" font-family="monospace">协程 G6</text>
            <rect x="224" y="214" width="122" height="44" rx="7" fill="#ffffff" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/>
            <text x="285" y="232" text-anchor="middle" font-size="9" fill="#475569" font-family="monospace">独享：栈 / 寄存器</text>
            <text x="285" y="247" text-anchor="middle" font-size="9" fill="#475569" font-family="monospace">PC 程序计数器</text>
            <rect x="40" y="278" width="320" height="26" rx="6" fill="#fef9c3" stroke="#facc15" stroke-width="1"/>
            <text x="200" y="295" text-anchor="middle" font-size="9" fill="#854d0e" font-family="monospace">共享：地址空间 / 打开的文件 / 信号处理</text>
            <rect x="30" y="322" width="14" height="14" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="50" y="333" font-size="9" fill="#64748b" font-family="monospace">进程</text>
            <rect x="110" y="322" width="14" height="14" rx="4" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="130" y="333" font-size="9" fill="#64748b" font-family="monospace">线程</text>
            <rect x="200" y="322" width="14" height="14" rx="4" fill="#22d3ee"/>
            <text x="220" y="333" font-size="9" fill="#64748b" font-family="monospace">协程</text>
            <!-- 右：特权级环形示意 -->
            <text x="410" y="26" font-size="13" font-weight="bold" fill="#475569" font-family="monospace">CPU 特权级：Ring3 用户态 vs Ring0 内核态</text>
            <circle cx="570" cy="165" r="120" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="570" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569" font-family="monospace">Ring 3 · 用户态</text>
            <text x="570" y="66" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">应用 / goroutine 在这里跑</text>
            <text x="570" y="80" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">无权：改页表 / 关中断 / 调度</text>
            <circle cx="570" cy="165" r="60" fill="#f59e0b"/>
            <text x="570" y="158" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">Ring 0</text>
            <text x="570" y="174" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff7ed" font-family="monospace">内核态</text>
            <text x="570" y="188" text-anchor="middle" font-size="9" fill="#fffbeb" font-family="monospace">特权指令 ✅ 调度 / 驱动</text>
            <line x1="708" y1="258" x2="624" y2="208" stroke="#f59e0b" stroke-width="2" marker-end="url(#thr-a)"/>
            <text x="698" y="248" font-size="9" fill="#b45309" font-family="monospace">write() 陷入</text>
            <rect x="410" y="272" width="330" height="44" rx="8" fill="#fff7ed" stroke="#f59e0b" stroke-width="1"/>
            <text x="425" y="290" font-size="10" fill="#78350f" font-family="monospace">write() → trap 陷入 Ring0 → 查 sys_call_table → 执行</text>
            <text x="425" y="306" font-size="10" fill="#92400e" font-family="monospace">sysret 返回 Ring3：一次模式切换由硬件 trap 完成（μs 级）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">向下是"装进"关系（协程在线程里、线程在进程里）；向上是"权限收窄"——用户态想碰硬件，必须 trap 陷入内核态再返回。这就是 goroutine 全部秘密的起点</figcaption>
        </figure>
      </section>

      <!-- 1. 用户态 vs 内核态（核心） -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>用户态 vs 内核态（⭐ 本页核心）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">为了安全，CPU 不会让程序随便碰硬件。它引入<strong>特权级（privilege level）</strong>：运行在 <strong>Ring0 内核态</strong>时，CPU 允许执行<strong>特权指令</strong>（改页表、开关中断、切换任务、访问 IO 端口）；运行在 <strong>Ring3 用户态</strong>时，这些指令直接<strong>触发硬件异常</strong>被拦截。普通进程的所有代码都跑在用户态，只有操作系统内核跑在内核态。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用户态（Ring3）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内核态（Ring0）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">能做什么</td><td class="px-4 py-2 border">算数、访内存、调用库函数</td><td class="px-4 py-2 border">特权指令：改页表 / 调度 / 中断 / 驱动</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">准入方式</td><td class="px-4 py-2 border">一切普通指令</td><td class="px-4 py-2 border">只能通过<strong>系统调用</strong>进入（trap/int）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">资源视图</td><td class="px-4 py-2 border">只看得见自己的地址空间</td><td class="px-4 py-2 border">看到全部内存 / 设备 / 进程表</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">崩溃后果</td><td class="px-4 py-2 border">进程崩，系统不崩</td><td class="px-4 py-2 border">内核崩 = 整机蓝屏 / panic</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">系统调用：从用户态"陷入"内核态的完整流程</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">用户态代码调用库函数，比如 <code class="bg-slate-100 px-1 rounded text-xs font-mono">fmt.Println</code> → <code class="bg-slate-100 px-1 rounded text-xs font-mono">write(1, "hi\n", 3)</code>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">执行 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">int 0x80</code> 指令——硬件把 CPU 特权级从 Ring3 切到 Ring0，这就是一次<strong>模式切换</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">内核根据寄存器里的系统调用号查 <strong>sys_call_table</strong>（系统调用表），找到 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sys_write</code> 并执行。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600">执行完再用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sysret</code> 指令切回 Ring3，把返回值交还用户态代码。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="printSyscallCode" title="syscall-flow.go" /></div>
        <div class="mb-4"><Code language="text" :code="syscallTraceCode" title="write 全程追踪.txt" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 模式切换 ≠ 上下文切换：</strong>模式切换（用户态↔内核态）只改<strong>特权级 + 换栈 + 保存少量寄存器</strong>，同一个进程内，开销 μs 级；<strong>上下文切换</strong>（进程↔进程）要把整个 CPU 状态（寄存器组、栈指针、页表、TLB）全换掉，开销 5~10μs 量级。别把这两个"切换"混为一谈。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>浏览器里的 <strong>Web Worker ≈ 内核级线程（1:1）</strong>——每个 worker 都是浏览器替你创建的真实 OS 线程，有独立栈、独立调度，postMessage 通信就相当于"系统调用"式地跨越边界。所以 worker 创建贵、数量不能太多，这跟"内核线程贵"是同一回事。</p>
        </aside>
      </section>

      <!-- 2. 进程 vs 线程 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>进程 vs 线程</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>线程 = 进程内的执行单元</strong>。一个进程可以开多条线程，它们<strong>共享</strong>进程的地址空间、打开的文件、信号处理；但每条线程<strong>独享</strong>自己的栈、寄存器组和程序计数器 PC。教科书一句话记牢：<strong>进程是资源分配的基本单位，线程是 CPU 调度的基本单位</strong>——同一进程内的线程切换，不需要换页表、不用刷 TLB，所以比进程切换便宜得多。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进程</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">线程</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">共享什么</td><td class="px-4 py-2 border">——（独立地址空间）</td><td class="px-4 py-2 border">地址空间 / 文件 / 信号 / 全局变量</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">独享什么</td><td class="px-4 py-2 border">地址空间 / 页表 / 打开文件表</td><td class="px-4 py-2 border">栈 / 寄存器 / PC 程序计数器</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">切换成本</td><td class="px-4 py-2 border">换页表 + 刷 TLB，5~10μs</td><td class="px-4 py-2 border">只换 CPU 现场，1~2μs 量级</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">隔离性</td><td class="px-4 py-2 border">强，一个崩不影响其他</td><td class="px-4 py-2 border">弱，同进程一个线程崩全进程崩</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">通信方式</td><td class="px-4 py-2 border">IPC：管道 / 共享内存 / 消息队列</td><td class="px-4 py-2 border">直接读写共享变量（要加锁）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">创建开销</td><td class="px-4 py-2 border">复制地址空间，重</td><td class="px-4 py-2 border">只建一条控制流，轻</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么程序"天然"用线程而不是进程做并发？</strong>因为线程共享地址空间，A 线程算完的结果 B 线程直接可见，不用管道搬数据。代价是共享就引入<strong>数据竞争</strong>——这是后面并发章节所有锁、channel、原子的动机来源。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话记忆：</strong>进程是"一栋楼的户主"（持有资产、地址），线程是"楼里的住户"（真正干活、跑来跑去）。Go 里 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go f()</code> 不是新开进程，也不是直接开内核线程——它是往用户态队列里扔一个协程（详见第 8 节）。</p>
        </aside>
      </section>

      <!-- 3. 内核级线程 KLT -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>内核级线程 KLT（1:1）：内核调度，代价是"贵"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>内核级线程（Kernel-Level Thread）</strong>：每个用户线程都对应内核里的一个线程对象，由<strong>内核调度器</strong>直接调度。当前 Linux、Windows 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">pthread_create</code> 创建的就是这种——<strong>1:1 映射</strong>。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✔</span><span><strong>优点：</strong>一个线程阻塞（比如等磁盘 IO），内核能<strong>调度同一进程的其他线程</strong>继续跑；还能真正利用多核，多个线程并行。</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">✘</span><span><strong>缺点：</strong>创建线程 = 每次都要<strong>陷入内核</strong>分配内核对象；线程切换也要陷入内核，比用户态切换慢；一个进程开几万线程，内核资源直接爆掉。</span></li>
        </ul>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">内核线程 = 每次创建/切换都要走系统调用，跟"每次打印都走系统调用"一样——慢，但内核能管到你</p>
          <p class="text-xs text-amber-600 text-center">这正是 Go 不愿让 goroutine = 内核线程的根本原因：10 万 goroutine 若 = 10 万内核线程，系统早挂了</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Web Worker 是 1:1 内核线程的典型——浏览器为每个 worker 背后开一个 OS 线程，所以它<strong>贵</strong>：创建要 ms 级、每个要独立栈内存、数量一多就报错。这就是"1:1 模型贵"的直观体验。</p>
        </aside>
      </section>

      <!-- 4. 用户级线程 ULT -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>用户级线程 ULT（N:1）：用户态调度，快但有"死穴"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>用户级线程（User-Level Thread）</strong>：由<strong>用户态的线程库</strong>（如早期的 GNU Pth）调度，内核完全无感知——它眼里你只有一个进程。<strong>N:1 映射</strong>：N 个用户线程挤在 1 个内核线程上。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✔</span><span><strong>优点：</strong>切换不陷入内核——库函数保存恢复一下现场就完事，<strong>比内核线程切换快一个数量级</strong>；创建也便宜，开十万个都不心疼。</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">✘</span><span><strong>死穴一（阻塞卡死全进程）：</strong>用户态库里没有真正的调度器。某个用户线程一旦<strong>发起系统调用阻塞</strong>（read 等 IO），整条内核线程被卡住——因为内核只知道这一个线程对象，它不跑，其它 N-1 个用户线程也跟着停摆。</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">✘</span><span><strong>死穴二（多核白搭）：</strong>N 个用户线程只挂在一个内核线程上，再多的 CPU 核也只有 1 个能用，<strong>无法并行</strong>。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比（这个类比直接讲透 Go）：</strong>JS 的 <strong>微任务 ≈ 用户级线程</strong>——它们全挤在一个主线程的用户态队列里，每个微任务只有 <code class="bg-purple-100 px-1 rounded text-xs font-mono">then</code> 回调这么小一段，切换就是取下一个队列项，零内核开销；<strong>事件循环 ≈ 用户态调度器</strong>，它只挑"能立刻跑完的短任务"，遇到要等 IO 的就交给 C++ 层去等。这就是"单线程却不怕慢、量大也不怕贵"的原因——跟 goroutine 一模一样的逻辑。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 为什么纯 ULT 最后被淘汰？</strong>就是因为"一个阻塞、全体停摆"。Go 的解法不是退回 KLT，而是<strong>用 M:N 混合模型 + 让阻塞不发生在用户态可感知的线程上</strong>（见第 6、8 节）。</p>
        </aside>
      </section>

      <!-- 5. LWP 与协程 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>轻量级进程 LWP 与协程/纤程</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">LWP（Lightweight Process）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">LWP 是夹在中间的"骨架"：它<strong>1:1 绑定一个内核线程</strong>，为它之上的多个用户线程提供"可被内核调度的执行载体"。你可以把它理解成<strong>一个拥有完整内核线程身份、但承担用户态线程职责</strong>的执行体。当内核线程卡住，挂在它上面的用户线程照样停摆——所以光有 LWP 不够，还得解决"阻塞"这个根问题。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">协程 / 纤程（Coroutine / Fiber）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">协程是<strong>极轻量的用户态执行流</strong>：自己管理栈（初始几 KB、可增长），切换只保存几个寄存器，<strong>主动让出（yield）</strong>而不是被抢占。它没有内核对象、没有系统调用，创建和切换都<strong>不陷入内核</strong>——这就是"十万个也不怕"的底气。Go 的 goroutine 就是一种协程（Go 把抢占式调度也加了进去，更成熟）。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进程</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内核线程</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">协程/goroutine</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">调度者</td><td class="px-4 py-2 border">内核</td><td class="px-4 py-2 border">内核</td><td class="px-4 py-2 border">用户态运行时</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">初始栈</td><td class="px-4 py-2 border font-mono text-xs">~1MB（可调）</td><td class="px-4 py-2 border font-mono text-xs">~8MB（虚拟）</td><td class="px-4 py-2 border font-mono text-xs">~2KB，可增长</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">切换是否进内核</td><td class="px-4 py-2 border">是（上下文切换）</td><td class="px-4 py-2 border">是（上下文切换）</td><td class="px-4 py-2 border">否（纯用户态）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">创建开销</td><td class="px-4 py-2 border font-mono text-xs">μs~ms 级</td><td class="px-4 py-2 border font-mono text-xs">~10μs</td><td class="px-4 py-2 border font-mono text-xs">~100ns（量级）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">一次开 10 万个</td><td class="px-4 py-2 border">不可能</td><td class="px-4 py-2 border">基本不可能（内存爆）</td><td class="px-4 py-2 border">轻松，几百 MB 内</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. M:N 混合模型 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>M:N 混合模型：兼得"轻量"与"不卡死"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">单一模型都有硬伤：KLT 贵、ULT 会被阻塞卡死。工业界最终采用<strong>M:N 混合模型</strong>：<strong>M 个内核线程</strong>（能多核并行、能靠内核处理"线程级别的调度"）上跑 <strong>N 个用户级线程/协程</strong>（轻量、切换快），中间用一个<strong>用户态调度器</strong>把 N 个用户任务分配到 M 个内核线程上。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">用户态调度器维护几个可运行队列，把就绪的用户线程/协程分发到 M 个内核线程上。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">协程主动让出或阻塞（等 channel / 等 IO）时，<strong>只切走当前协程，内核线程不阻塞</strong>——立刻换一个可运行的协程上来。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">真正需要阻塞在系统调用上的情况，另一个空闲内核线程补位，<strong>总体吞吐不被卡住</strong>。</div></li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>M:N 模型 ≈ <strong>Node 的 "worker 线程（M） + 事件循环（N 个微任务）"</strong>组合——worker_threads 提供几个真并行内核线程（M），主线程事件循环把海量轻量任务（N）摊到它们身上。Go 就是把这套做到极致的系统级实现。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记结论：</strong>M:N 把"内核管多少线程"和"用户想跑多少任务"<strong>解耦</strong>——用户随便开十万任务，内核只需要几条线程扛着。Go 的 GMP 就是 M:N 的一次完整工程化。</p>
        </aside>
      </section>

      <!-- 7. 高频坑 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>⚠️ 高频坑</h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3">
          <p class="text-sm text-amber-800"><strong>坑 1：以为 goroutine 阻塞 = 线程阻塞、线程数减少了。</strong>真相：goroutine 在 channel / 锁 / IO 上等，<strong>只是这个 G 被切出去</strong>，承载它的 M（内核线程）毫发无损，立刻去跑下一个 goroutine。线程数该是多少还是多少。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3">
          <p class="text-sm text-amber-800"><strong>坑 2：把 GOMAXPROCS 理解成"CPU 核数"。</strong>GOMAXPROCS 的本义是<strong>可同时运行 goroutine 的 M（内核线程）数量上限</strong>，默认等于逻辑核数而已。它限制的是<strong>线程数</strong>，不是核数。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3">
          <p class="text-sm text-amber-800"><strong>坑 3：以为 goroutine 就是内核线程，或者比线程还轻是"魔法"。</strong>真相：goroutine 是<strong>用户态协程</strong>，内核根本不认识它。它能轻，是因为栈小（2KB 起步、可伸缩）且切换不陷入内核——一切都是用户态运行时干的，没有任何魔法。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>坑 4：以为 goroutine 能无条件并行。</strong>goroutine 再多，<strong>同时真正并行执行的也顶多 GOMAXPROCS 个</strong>（在各自 M 上）。其余几十万都在 P 的本地队列里排队——这是"并发"（concurrency）不是"并行"（parallelism），别被"同时跑十万个"的宣传误导。</p>
        </aside>
      </section>

      <!-- 8. 与 Go 底层实现的关系 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>与 Go 底层实现的关系（⭐⭐ 本页的落点）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">前面所有的铺垫，就为这一刻：<strong>goroutine = 用户态协程，Go 运行时用 M:N 混合模型（GMP）管理它们</strong>。内核线程永远只有 GOMAXPROCS 个，goroutine 却能开上百万——全因为调度发生在用户态。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">GMP 三件套：G / M / P</h3>
        <div class="mb-4"><Code language="go" :code="gmpModelCode" title="gmp-model.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">运行时怎么应对"阻塞"这个死穴</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>channel 等 → 纯用户态让出：</strong>G 在 channel 上等数据，只是标记 waiting 被移出运行队列，M 继续跑别的 G，零内核参与。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>网络 IO → netpoller：</strong>文件描述符注册到 netpoller（epoll 用户态封装），G 让出等事件，事件来了再唤醒——<strong>不占内核线程</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>真的阻塞在系统调用 → 换 M：</strong>G 陷入阻塞 syscall 时，运行时会<strong>新建/唤醒一个空闲 M 顶上</strong>，保证其他 goroutine 不饿着。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="yieldCode" title="goroutine-yield.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">代价对比：创建与切换</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">执行体</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">创建代价</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">切换代价</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">一次能开多少</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">进程</td><td class="px-4 py-2 border font-mono text-xs">复制地址空间，ms 级</td><td class="px-4 py-2 border font-mono text-xs">5~10μs</td><td class="px-4 py-2 border font-mono text-xs">几十~几百</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">内核线程</td><td class="px-4 py-2 border font-mono text-xs">陷入内核，~10μs</td><td class="px-4 py-2 border font-mono text-xs">1~2μs</td><td class="px-4 py-2 border font-mono text-xs">几千（栈 8MB 撑不住）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">goroutine</td><td class="px-4 py-2 border font-mono text-xs">用户态，~100ns 量级</td><td class="px-4 py-2 border font-mono text-xs">~100ns（不陷入内核）</td><td class="px-4 py-2 border font-mono text-xs">百万级</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="goroutineCostCode" title="100k-goroutines.go" /></div>
        <div class="mb-4"><Code language="go" :code="nprocCode" title="gomaxprocs.go" /></div>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">深入 GMP 的调度细节、本地队列与全局队列、抢占式调度：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go 并发：goroutine 与 GMP 调度模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么 goroutine 切换是"纳秒级"？</strong>切换只发生在用户态：保存 G 的几个寄存器 + 栈指针，从 P 的本地队列取下一个 G 换上。没有模式切换、没有系统调用、没有 TLB 刷新。对比一下：内核线程每次切换都要进内核走一遭——这就是量级差距的来源。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>用户态 vs 内核态</strong>：Ring3 无权执行特权指令，想碰硬件必须经系统调用 trap 陷入 Ring0，执行完再返回——这叫模式切换，别和上下文切换混淆。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>进程 vs 线程</strong>：进程是资源分配单位（独享地址空间），线程是调度单位（共享地址空间、独享栈/寄存器/PC）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>KLT（1:1）</strong>：内核调度，阻塞不卡进程、能多核；代价是创建/切换要陷入内核、开销大。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>ULT（N:1）</strong>：用户态库调度、切换快；但一阻塞全卡死、多核白搭——所以纯 ULT 被淘汰。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>LWP</strong>：1:1 绑定内核线程的"执行骨架"；<strong>协程/纤程</strong>：用户态、栈小、显式 yield，极轻。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>M:N 混合模型</strong>：M 个内核线程扛 N 个用户任务，兼得轻量与不卡死——这就是 Go 的 GMP。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>goroutine</strong> = 用户态协程：切换不陷入内核（纳秒级）、栈 2KB 起步、开百万个不慌；内核线程始终只有 GOMAXPROCS 个。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-2-1-goroutine-gmp'" :text="'goroutine 与 GMP 调度模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-2-fork'" :text="'进程创建：fork/exec/wait（上一节）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-4-scheduling'" :text="'CPU 调度：FCFS/SJF/RR/CFS（下一节）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-b-2-fork'" :text="'← 上一节：进程创建：fork/exec/wait'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-b-4-scheduling'" :text="'下一节：CPU调度：FCFS/SJF/RR/CFS →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "用户态 vs 内核态" },
  { id: "sec-2", name: "进程 vs 线程" },
  { id: "sec-3", name: "内核级线程 KLT" },
  { id: "sec-4", name: "用户级线程 ULT" },
  { id: "sec-5", name: "LWP 与协程" },
  { id: "sec-6", name: "M:N 混合模型" },
  { id: "sec-7", name: "高频坑" },
  { id: "sec-8", name: "与 Go 底层实现" },
  { id: "sec-9", name: "小结" },
]

// ===== 代码示例 =====
const printSyscallCode = `// fmt.Println("hi") 一路走向内核（概念示意）
package main

import "fmt"

func main() {
    fmt.Println("hi")
    // 1. 用户态 Ring3：fmt 包把 "hi\\n" 写进标准库输出缓冲区
    // 2. 用户态 Ring3：runtime 发起 write(1, "hi\\n", 3)
    // 3. 硬件：执行 syscall 指令 → CPU 特权级 Ring3→Ring0（模式切换）
    // 4. 内核态 Ring0：按系统调用号查 sys_call_table → 找到 sys_write
    // 5. 内核态 Ring0：驱动把 3 字节写到 fd=1（标准输出）
    // 6. 硬件：sysret 指令 → 特权级 Ring0→Ring3，返回用户态
}
// 输出: hi
// 说明: 一次打印 = 一次 trap 陷入 + 一次返回。所以能合并的 IO 尽量合并`;

const syscallTraceCode = `fmt.Println("hi") 的完整路径（从上到下）
  ├─ 用户态 Ring3 ── fmt 包把字符串写入输出缓冲区
  ├─ 用户态 Ring3 ── 调用 write(1, "hi\\n", 3)
  ├─ 硬件 ──────── syscall 指令 → CPU 切特权级 Ring3→Ring0（模式切换）
  ├─ 内核态 Ring0 ── 查 sys_call_table[1] = sys_write
  ├─ 内核态 Ring0 ── 把 3 字节写到标准输出设备
  ├─ 硬件 ──────── sysret 返回 → 特权级 Ring0→Ring3
  └─ 用户态 Ring3 ── 回到 fmt.Println 的下一行继续执行`;

const gmpModelCode = `// Go 运行时眼中的三件套（概念示意，非真实源码）
type G struct {      // goroutine：用户态协程
    stack  []byte    // 栈：初始 2KB，动态增长
    status int       // runnable / running / waiting
    pc     uintptr   // 用户态程序计数器
}
type P struct {      // processor：调度器，有本地队列
    runq  []*G       // 本 P 待运行的 goroutine
    id    int
}
type M struct {      // machine：内核线程，被 OS 调度
    curg  *G         // 当前正在跑的 goroutine
    p     *P         // 挂靠的调度器
    // M 真正在 OS 眼里存在；G 和 P 都是用户态概念
}`;

const yieldCode = `// goroutine 的"让出"与"阻塞"都不占内核线程
package main

import (
    "fmt"
    "runtime"
)

func main() {
    runtime.GOMAXPROCS(1) // 只留 1 个内核线程，逼所有 goroutine 排队
    fmt.Println("主 goroutine 开始")

    go func() {
        for i := 0; i < 3; i++ {
            fmt.Println("子 goroutine 干活:", i)
            runtime.Gosched() // 主动让出：把 M 交给别的 goroutine
        }
    }()

    runtime.Gosched() // 主 goroutine 也让一把，子协程才有机会跑
    fmt.Println("主 goroutine 结束")
}
// 输出:
// 主 goroutine 开始
// 子 goroutine 干活: 0
// 子 goroutine 干活: 1
// 子 goroutine 干活: 2
// 主 goroutine 结束
// 说明: GOMAXPROCS=1 时全程只有一个 M，谁跑全靠用户态调度器换人`;

const goroutineCostCode = `// 10 万个 goroutine 到底占多少内存？
package main

import (
    "fmt"
    "runtime"
    "sync"
)

func main() {
    const N = 100000
    var wg sync.WaitGroup

    var before runtime.MemStats
    runtime.ReadMemStats(&before)

    for i := 0; i < N; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            runtime.Gosched() // 模拟干一点点活
        }(i)
    }
    wg.Wait()

    var after runtime.MemStats
    runtime.ReadMemStats(&after)
    used := after.TotalAlloc - before.TotalAlloc
    fmt.Printf("启动 %d 个 goroutine，额外分配约 %.1f MB\\n", N, float64(used)/1024/1024)
}
// 输出: 启动 100000 个 goroutine，额外分配约 6.2 MB
// 对比: 一个 OS 线程默认栈 8MB，10 万线程 ≈ 800GB —— 内存直接爆炸
//       goroutine 栈 2KB 起步、按需增长，10 万只占几 MB，这就是差距`;

const nprocCode = `// GOMAXPROCS 到底限制的是什么？
package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Println("逻辑 CPU 核数:", runtime.NumCPU())
    fmt.Println("默认 GOMAXPROCS:", runtime.GOMAXPROCS(0))

    runtime.GOMAXPROCS(2) // 强行把可并行 M 数压到 2
    fmt.Println("手动设为 2 后:", runtime.GOMAXPROCS(0))
}
// 输出:
// 逻辑 CPU 核数: 8
// 默认 GOMAXPROCS: 8
// 手动设为 2 后: 2
// 说明: GOMAXPROCS = 同时运行 goroutine 的 M（内核线程）数量上限，
//       默认=核数，但它限制的是"线程数"，不是"核数"`;
</script>
