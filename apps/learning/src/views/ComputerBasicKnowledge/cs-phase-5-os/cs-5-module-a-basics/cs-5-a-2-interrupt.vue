<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">中断与异常处理</h1><p class="text-sm text-slate-500 mt-1">CPU 的"事件驱动"——为什么不能轮询干等、中断从信号到处理的完整旅程，以及它如何撑起 Go 的抢占式调度与网络事件驱动</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-a-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：中断驱动模型 + 处理流程</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">CPU 不能预知外设何时来事，所以外部硬件用"主动通知"代替 CPU 的反复询问。整条链：<strong>中断源</strong>发出信号 → <strong>中断控制器</strong>仲裁 → <strong>CPU</strong> 响应并保存现场 → 查 <strong>中断向量表</strong> → 执行 <strong>中断处理程序</strong> → 恢复现场返回。下面两张图分别展示"谁来发、发给谁"的硬件模型，和"CPU 收到后干了什么"的软件流程。</p>

        <!-- 图①：中断驱动模型 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 260" class="w-full h-auto">
            <defs><marker id="in-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- 中断源 -->
            <text x="40" y="28" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">中断源</text>
            <rect x="40" y="44" width="150" height="58" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="115" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">外设（网卡/磁盘/键盘）</text>
            <text x="115" y="88" text-anchor="middle" font-size="10" fill="#a16207" font-family="monospace">IO 完成 → 发中断</text>
            <rect x="40" y="146" width="150" height="58" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="115" y="172" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">硬件时钟</text>
            <text x="115" y="190" text-anchor="middle" font-size="10" fill="#a16207" font-family="monospace">周期性 tick</text>
            <!-- 中断控制器 -->
            <rect x="290" y="96" width="170" height="60" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="375" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">中断控制器</text>
            <text x="375" y="140" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">PIC / APIC 仲裁</text>
            <!-- CPU -->
            <rect x="560" y="96" width="160" height="60" rx="8" fill="#06b6d4"/>
            <text x="640" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">CPU</text>
            <text x="640" y="140" text-anchor="middle" font-size="10" fill="#cffafe" font-family="monospace">响应 · 保存现场</text>
            <!-- 中断处理程序 -->
            <rect x="560" y="186" width="160" height="56" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="640" y="212" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">中断处理程序 ISR</text>
            <text x="640" y="230" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">查 IDT → 处理 → 恢复</text>
            <!-- 箭头 -->
            <line x1="190" y1="76" x2="286" y2="112" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-a)"/>
            <line x1="190" y1="172" x2="286" y2="140" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-a)"/>
            <line x1="460" y1="126" x2="556" y2="126" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-a)"/>
            <line x1="640" y1="156" x2="640" y2="182" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-a)"/>
            <!-- 返回用户代码（虚线） -->
            <path d="M 720 214 H 742 V 126 H 724" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#in-a)"/>
            <!-- 箭头标签 -->
            <text x="238" y="90" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">IRQ 请求</text>
            <text x="238" y="160" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">IRQ 请求</text>
            <text x="508" y="118" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">INTR</text>
            <text x="648" y="172" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">查表跳转</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">中断驱动模型：外设/时钟（amber）把信号交给中断控制器仲裁，CPU（cyan）响应后查表跳进内核的中断处理程序，处理完沿虚线返回被中断的代码——对用户程序完全透明</figcaption>
        </figure>

        <!-- 图②：中断处理流程时序 -->
        <figure class="bg-slate-50 rounded-xl p-4">
          <h3 class="text-sm font-semibold text-slate-700 mb-3">处理流程时序：一次中断的完整旅程</h3>
          <svg viewBox="0 0 760 400" class="w-full h-auto">
            <defs><marker id="in-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <circle cx="46" cy="42" r="15" fill="#06b6d4"/>
            <text x="46" y="47" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">1</text>
            <rect x="86" y="16" width="634" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
            <text x="102" y="38" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">外设 / 时钟发出中断信号</text>
            <text x="102" y="56" font-size="10" fill="#64748b" font-family="monospace">中断源置位 IRQ 线路，通知 CPU"我有事要你处理"</text>
            <line x1="46" y1="57" x2="46" y2="87" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-b)"/>

            <circle cx="46" cy="102" r="15" fill="#06b6d4"/>
            <text x="46" y="107" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">2</text>
            <rect x="86" y="76" width="634" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
            <text x="102" y="98" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">中断控制器仲裁（PIC / APIC）</text>
            <text x="102" y="116" font-size="10" fill="#64748b" font-family="monospace">聚合多条 IRQ、按优先级排队，向 CPU 发 INTR 通知</text>
            <line x1="46" y1="117" x2="46" y2="147" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-b)"/>

            <circle cx="46" cy="162" r="15" fill="#06b6d4"/>
            <text x="46" y="167" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">3</text>
            <rect x="86" y="136" width="634" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
            <text x="102" y="158" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">CPU 响应、保存现场</text>
            <text x="102" y="176" font-size="10" fill="#64748b" font-family="monospace">寄存器 / 程序计数器 PC / 状态字 PSW 压栈，记住被打断的位置</text>
            <line x1="46" y1="177" x2="46" y2="207" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-b)"/>

            <circle cx="46" cy="222" r="15" fill="#06b6d4"/>
            <text x="46" y="227" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">4</text>
            <rect x="86" y="196" width="634" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
            <text x="102" y="218" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">查中断向量表（IDT）</text>
            <text x="102" y="236" font-size="10" fill="#64748b" font-family="monospace">用中断号查表，得到对应处理程序的入口地址</text>
            <line x1="46" y1="237" x2="46" y2="267" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-b)"/>

            <circle cx="46" cy="282" r="15" fill="#06b6d4"/>
            <text x="46" y="287" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">5</text>
            <rect x="86" y="256" width="634" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
            <text x="102" y="278" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">执行中断处理程序</text>
            <text x="102" y="296" font-size="10" fill="#64748b" font-family="monospace">中断上下文：关中断、短小精悍、确认并处理事件（重活推给下半部）</text>
            <line x1="46" y1="297" x2="46" y2="327" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-b)"/>

            <circle cx="46" cy="342" r="15" fill="#06b6d4"/>
            <text x="46" y="347" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">6</text>
            <rect x="86" y="316" width="634" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
            <text x="102" y="338" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">恢复现场、返回原代码</text>
            <text x="102" y="356" font-size="10" fill="#64748b" font-family="monospace">弹栈还原寄存器 / PC / 状态字，从被打断的那条指令继续执行</text>
          </svg>
        </figure>
      </section>

      <!-- 1. 为什么要中断 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么要中断？CPU 不能干等外设</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">网卡什么时候收到包、磁盘什么时候读完数据、键盘什么时候被按下——这些事件<strong>CPU 完全无法预测</strong>。最笨的办法是<strong>轮询（polling）</strong>：CPU 隔一会儿就去读一遍外设状态寄存器，问它"你有事吗？"。但外设大多数时间无事发生，轮询就是在<strong>空转烧 CPU</strong>。中断（interrupt）的思路反过来：<strong>外设主动通知 CPU</strong>——"我有事了，你来处理"。CPU 平时该干嘛干嘛，只有在被通知时才停下来。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">轮询（Polling）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">中断（Interrupt）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">发起方</td><td class="px-4 py-2 border">CPU 主动去查外设</td><td class="px-4 py-2 border">外设主动通知 CPU</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">CPU 开销</td><td class="px-4 py-2 border">反复执行检查指令，无事也烧 CPU</td><td class="px-4 py-2 border">只有有事才被打断，无事零开销</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">响应延迟</td><td class="px-4 py-2 border">取决于轮询间隔，事件可能被发现得晚</td><td class="px-4 py-2 border">事件到达立刻通知，延迟低</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">适用场景</td><td class="px-4 py-2 border">状态变化极频繁、间隔可预测、必须极快拿到</td><td class="px-4 py-2 border">慢速 / 突发 / 不可预测事件（网络、磁盘、键盘）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">例子</td><td class="px-4 py-2 border">早期游戏手柄轮询、自旋等待锁</td><td class="px-4 py-2 border">网卡收包、磁盘完成、时钟 tick、按键</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>轮询 ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">setInterval</code> 每 10ms 去 <code class="bg-purple-100 px-1 rounded text-xs font-mono">fetch</code> 一次数据（大多数请求空跑）；中断 ≈ <strong>事件监听 / 回调</strong>——浏览器只在事件真正发生时执行处理函数。你写 <code class="bg-purple-100 px-1 rounded text-xs font-mono">addEventListener('click', fn)</code>，就是在注册"中断处理程序"。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>餐厅里<strong>前台广播</strong>"哪位客人需要加水？"就是轮询——服务员每隔一会儿就去问一圈，多数人没需求，白跑一趟；<strong>客人按铃叫服务员</strong>就是中断——客人真有需要才按，服务员放下手头的事过来处理，处理完继续做自己的事。</p>
        </aside>
      </section>

      <!-- 2. 中断的分类 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>中断的分类：外部中断 / 异常 / 软中断</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">"中断"是个总称，按<strong>来源和时机</strong>分三类：<strong>外部中断</strong>（硬件中断，异步）来自外设；<strong>异常</strong>（exception，同步）是 CPU 执行指令时自己发现的问题；<strong>软中断 / 陷阱</strong>（trap）是进程<strong>主动</strong>发起，请求内核干活（最典型的就是系统调用）。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>外部中断（硬件中断 / 异步）</strong>：IO 完成、时钟 tick、设备故障。由外设通过中断控制器发给 CPU，<strong>随时可能打断当前代码</strong>——你不知道它什么时候来。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>异常（exception / 内部 / 同步）</strong>：除零、缺页、段错误。是 CPU 在执行某条指令时<strong>自己发现</strong>的，与该指令同步发生。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>软中断 / 陷阱（trap）</strong>：系统调用（<code class="bg-slate-100 px-1 rounded text-xs font-mono">int 0x80</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> 指令）、断点（<code class="bg-slate-100 px-1 rounded text-xs font-mono">int 3</code>）、调试。是进程<strong>主动</strong>发起的"软件中断"，目的是陷入内核态请内核办事。</span></li>
        </ul>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">外部中断</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">异常</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">系统调用（trap）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">来源</td><td class="px-4 py-2 border">外设 / 硬件</td><td class="px-4 py-2 border">CPU 内部</td><td class="px-4 py-2 border">进程主动发起</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">是否同步</td><td class="px-4 py-2 border">异步（随时打断）</td><td class="px-4 py-2 border">同步（跟着指令走）</td><td class="px-4 py-2 border">同步（进程主动）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">谁发起</td><td class="px-4 py-2 border">外部硬件</td><td class="px-4 py-2 border">CPU 执行指令时</td><td class="px-4 py-2 border">用户态代码</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">方向</td><td class="px-4 py-2 border">外设 → CPU</td><td class="px-4 py-2 border">内核自省</td><td class="px-4 py-2 border">用户态 → 内核态</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">典型例</td><td class="px-4 py-2 border">网卡收包、时钟 tick、键盘</td><td class="px-4 py-2 border">除零、缺页、段错误</td><td class="px-4 py-2 border">read / write / open / fork</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>三类中断在 Go 里各有落点——<strong>外部中断</strong>（网络数据到达）→ 内核唤醒 netpoller 里的 goroutine；<strong>异常</strong>（除零/空指针）→ Go 的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">panic</code>；<strong>系统调用</strong>（<code class="bg-teal-100 px-1 rounded text-xs font-mono">os.Open</code>、<code class="bg-teal-100 px-1 rounded text-xs font-mono">fmt.Println</code> 底层 write）→ 每一次都是进程主动 trap 进内核。所以你的 Go 程序每秒钟都在和中断机制打交道，只是全部被运行时封装了。</p>
        </aside>
      </section>

      <!-- 3. 时钟中断 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>时钟中断：时间片轮转的发动机</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">硬件时钟（PIT / APIC timer / 高精度定时器）<strong>周期性</strong>发出一次中断，这就是<strong>时钟中断（timer interrupt）</strong>。它是最特殊的外部中断——不是"某件事发生了"的通知，而是"时间又走了一拍"的节拍器。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Hz（赫兹）</strong> = 每秒中断次数。<strong>jiffy</strong> = 两次时钟中断的间隔 = <code class="bg-slate-100 px-1 rounded text-xs font-mono">1 / Hz</code> 秒。Linux 内核把 Hz 编译进系统（桌面发行版常见 <code class="bg-slate-100 px-1 rounded text-xs font-mono">HZ=250</code> 或 <code class="bg-slate-100 px-1 rounded text-xs font-mono">HZ=1000</code>），HZ=1000 意味着<strong>每 1ms 一次时钟中断</strong>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>时间片轮转的基石</strong>：调度器（scheduler）把 CPU 时间切成一个个"时间片"，每次时钟中断就是一个"计时器到期"的信号。当前进程时间片用尽 → 中断处理里让出 CPU → 调度器选下一个进程。可以说：<strong>没有时钟中断，就没有"抢占式多任务"</strong>——进程只能靠自觉让出。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>时钟中断还负责</strong>：系统时间维护、延迟/定时任务、看门狗（让死循环的系统有救）、负载统计。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>时钟中断 ≈ 浏览器事件循环里的 <strong>定时器心跳</strong>。浏览器的宏任务循环每轮检查到期的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">setTimeout</code> 回调——你写 <code class="bg-purple-100 px-1 rounded text-xs font-mono">setTimeout(fn, 1000)</code> 后，<code class="bg-purple-100 px-1 rounded text-xs font-mono">fn</code> 不是在 1 秒后"被精确地"调用，而是<strong>在下一次心跳发现它到期时</strong>被调用。时钟中断就是内核的"心跳"。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 运行时有一个 <strong>sysmon（system monitor）后台线程</strong>，相当于"软件时钟"——它定期醒来检查：有没有 goroutine 长时间占用 P？有没有空闲的 P 需要分配？要不要触发 GC？Go 1.14 引入的<strong>抢占式调度</strong>，就是 sysmon 发现某 goroutine 跑太久后，借助 OS 的<strong>信号/时钟机制</strong>把它强制打断（详见第 9 节）。</p>
        </aside>
      </section>

      <!-- 4. 中断处理完整流程 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>中断处理完整流程（⭐ 六步）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">中断处理的核心难点：<strong>中断可能打断任意时刻、任意代码</strong>（包括内核自己的代码）。所以处理完必须<strong>原样恢复现场</strong>，让被打断的代码毫无感知——这是"中断对程序透明"的关键。</p>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>设备 / 时钟发出中断信号</strong>——中断源把 IRQ 线路置位（拉高/拉低电平，或写中断控制器寄存器）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>中断控制器仲裁</strong>——PIC（8259A）/ APIC 聚合多条 IRQ、按优先级排队，把最高优先级的那条转成 INTR 信号送给 CPU。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>CPU 响应、保存现场</strong>——<strong>寄存器、程序计数器 PC、状态字 PSW（标志寄存器）压栈</strong>。PC 是关键：它记着"我刚执行到哪一条指令"，恢复现场就是从这里继续。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>查中断向量表 IDT</strong>——CPU 拿到中断号（向量号），查表得到处理程序的入口地址，跳过去。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>执行中断处理程序</strong>——此刻处于<strong>中断上下文</strong>：自动关中断（防止被更高优先级再打断/重入），处理程序要短小精悍，确认中断、搬运数据、置标志；重活交给"下半部"（见第 7 节）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span><div class="text-slate-600"><strong>恢复现场、返回原代码</strong>——<strong>弹栈</strong>还原寄存器 / PC / 状态字，CPU 从被打断的那条指令继续执行（x86 用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">iret</code> 指令）。</div></li>
        </ol>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>你正读一本书，<strong>电话铃响了</strong>（中断）。你先<strong>合上书</strong>，记住读到哪一页（保存现场 = 保存书签/页码），接完电话再<strong>翻回那一页继续读</strong>（恢复现场）。如果接完电话从头读，就是"现场没保存好"——所以处理器会浪费宝贵时间把 PC 和寄存器压栈保存。中断处理的精髓就是：<strong>打扰你，但让你毫无察觉</strong>。</p>
        </aside>
      </section>

      <!-- 5. IDT -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>中断向量表 IDT：编号 → 处理函数的映射</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">中断号成千上万（时钟、网卡、键盘、各类异常……），CPU 怎么知道该调哪个函数？答案是<strong>查表</strong>：内存里有一张 <strong>中断向量表</strong>，每个条目 = 一个中断号对应的<strong>处理函数入口地址</strong>。CPU 拿到中断号，直接按下标取地址跳转，O(1) 完成查找。x86 上叫 <strong>IDT（Interrupt Descriptor Table）</strong>，早期 8086 实模式叫 <strong>IVT</strong>，ARM 上叫向量表——思想完全一样。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>为什么叫"<strong>向量</strong>"：处理程序地址被"编了号"，像一维数组的索引——<code class="bg-slate-100 px-1 rounded text-xs font-mono">entry = IDT[vector]</code>。和数学里的向量没关系，是"查表定位"的意思。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>这张表在<strong>内核里</strong>、地址固化，用户态程序不能随便改——否则改掉某号中断的处理函数，系统就乱了。</span></li>
        </ul>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">向量号</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">谁触发</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">0</td><td class="px-4 py-2 border font-semibold">Divide Error (#DE)</td><td class="px-4 py-2 border">CPU</td><td class="px-4 py-2 border">除零异常</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">14</td><td class="px-4 py-2 border font-semibold">Page Fault (#PF)</td><td class="px-4 py-2 border">CPU</td><td class="px-4 py-2 border">缺页异常——虚拟内存机制的核心</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">0x80（128）</td><td class="px-4 py-2 border font-semibold">Linux syscall</td><td class="px-4 py-2 border">进程</td><td class="px-4 py-2 border">int 0x80 / syscall 指令触发系统调用</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">32~255</td><td class="px-4 py-2 border font-semibold">IRQ0 ~ IRQ223</td><td class="px-4 py-2 border">外设</td><td class="px-4 py-2 border">外部硬件中断映射区（0~31 被 CPU 保留给异常）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>IDT ≈ <strong>路由表 / 分发器</strong>。你在 <code class="bg-teal-100 px-1 rounded text-xs font-mono">mux.HandleFunc("/users", handler)</code> 里注册的路由，就是"路径 → 处理函数"的表；HTTP 请求带着路径进来，路由器查表分发。IDT 是硬件版的路由表：中断号就是"URL"，处理函数就是"handler"。Go 的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">signal.Notify(ch, SIGINT)</code> 也类似——告诉内核"这个信号来了，往这个 channel 里塞"。</p>
        </aside>
      </section>

      <!-- 6. 可屏蔽 / NMI -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>可屏蔽中断 / 不可屏蔽中断（NMI）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">不是所有中断都"想来就能来"。CPU 有一个 <strong>IF 中断标志位</strong>（Interrupt Flag），置 0（<code class="bg-slate-100 px-1 rounded text-xs font-mono">cli</code> 关中断）时，<strong>外部中断会被忽略、挂起</strong>，等重新开中断（<code class="bg-slate-100 px-1 rounded text-xs font-mono">sti</code>）再处理。这保证了中断处理程序在执行关键步骤（比如操作共享的数据结构）时不被新中断打断，也防止同一中断<strong>重入</strong>。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>可屏蔽中断</strong>：绝大多数外部中断（键盘、网卡、磁盘、时钟）。IF=0 时被延迟。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>不可屏蔽中断 NMI</strong>（Non-Maskable）：内存奇偶校验错误、硬件故障、看门狗——<strong>IF 拦不住</strong>，CPU 必须立刻响应，因为这些是"系统已经快不行了"的紧急信号。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>异常不可屏蔽</strong>：除零、缺页这类 CPU 内部异常必须当场处理——CPU 都执行不下去了，没法"等会再说"。</span></li>
        </ul>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">能被 IF 拦截？</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">触发</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型例</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">可屏蔽中断</td><td class="px-4 py-2 border">✅ 可以（IF=0 延迟）</td><td class="px-4 py-2 border">外设</td><td class="px-4 py-2 border">键盘、网卡、磁盘、时钟 tick</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">不可屏蔽 NMI</td><td class="px-4 py-2 border">❌ 不可以</td><td class="px-4 py-2 border">硬件严重故障</td><td class="px-4 py-2 border">内存奇偶校验错、看门狗超时</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">异常</td><td class="px-4 py-2 border">❌ 不可以（必须处理）</td><td class="px-4 py-2 border">CPU 内部</td><td class="px-4 py-2 border">除零、缺页、段错误</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>关中断是双刃剑——<strong>关得越久，错过/挂起的外部中断越多</strong>。网卡中断被挂起太久可能让内核缓冲区溢出、直接丢包；磁盘中断挂起太久会让 IO 完成通知迟迟不到。所以内核保证"关中断只在极短的关键区内"（一条到几十条指令），这就是为什么中断处理程序必须"短小精悍"。</p>
        </aside>
      </section>

      <!-- 7. 中断上下文 / 上下半部 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>中断上下文 vs 进程上下文：上半部 / 下半部</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">中断处理程序跑在哪个"环境"里，决定它能干什么、不能干什么。内核里区分两种上下文——<strong>进程上下文</strong>和<strong>中断上下文</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">中断上下文</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进程上下文</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">属于谁</td><td class="px-4 py-2 border">不属于任何进程</td><td class="px-4 py-2 border">属于当前进程</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">页表 / 用户空间</td><td class="px-4 py-2 border">无，不能访问用户内存</td><td class="px-4 py-2 border">有，可访问用户空间</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">能否睡眠</td><td class="px-4 py-2 border">❌ 不能</td><td class="px-4 py-2 border">✅ 能</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">典型代码</td><td class="px-4 py-2 border">ISR：确认中断、搬运数据</td><td class="px-4 py-2 border">系统调用实现、普通内核线程</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">为什么中断上下文<strong>不能睡眠</strong>？睡眠意味着"挂起当前任务，调度另一个"，而调度依赖时钟中断、依赖任务表——中断上下文本身是"被打断的半路状态"，它睡眠就没人来唤醒它，容易死锁。所以内核定下铁律：<strong>中断处理要短</strong>。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">上半部 / 下半部：把重活推后</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">但很多中断（尤其网卡）带来的工作量很大——协议栈解析、复制到用户缓冲、唤醒进程……全在关中断的 ISR 里做完会拖垮系统。于是 Linux 把工作拆两半：<strong>上半部（top half / hardirq）</strong>立刻做，只确认中断、把数据从硬件拷进内存缓冲、置个标志；<strong>下半部（bottom half：softirq / tasklet / workqueue）</strong>在稍后、开中断的状态下做重活（解析协议栈、唤醒进程），期间还能被新的中断打断。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">部分</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时机</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特点</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">例</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">上半部 top half（hardirq）</td><td class="px-4 py-2 border">中断一进来立刻跑</td><td class="px-4 py-2 border">关中断、极短、只确认+搬运</td><td class="px-4 py-2 border">网卡把包拷进内存缓冲</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">下半部 bottom half（softirq/tasklet/workqueue）</td><td class="px-4 py-2 border">稍后、开中断</td><td class="px-4 py-2 border">可被新中断打断、做重活</td><td class="px-4 py-2 border">协议栈解析、唤醒等待的进程</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>上半部/下半部 ≈ <strong>事件回调里只做"快事"，重活丢给宏任务/microtask</strong>。DOM 事件回调里你绝不会同步做 3 秒的图片压缩——那会卡死页面；正确做法是回调里先同步更新一下 UI 状态（上半部），把压缩丢给 <code class="bg-purple-100 px-1 rounded text-xs font-mono">setTimeout</code>/Web Worker（下半部）。浏览器和内核一样，都在告诉你：<strong>回调要短平快，长活异步化</strong>。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 的网络模型就是一次成功的"上下半部"：<strong>内核硬中断把数据搬进 socket 缓冲（上半部）</strong> → <strong>netpoller 检测到就绪事件，把 goroutine 唤醒去消费（下半部）</strong>。你写的业务 goroutine 永远在"下半部"舒适区——不用碰硬件、不用关中断、随便 sleep。这也是 Go 把并发复杂度"藏进运行时"的体现。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>餐厅服务员<strong>接单（上半部）</strong>：快速记下客人点的菜，不占用长时间；<strong>后厨做菜（下半部）</strong>：重活慢活，厨房里慢慢做，期间前台的接待（新的中断）照常进行。如果服务员接了单还要自己进后厨把整桌菜做完才出来，其他客人全都得等——这就是"ISR 里做重活"的灾难。</p>
        </aside>
      </section>

      <!-- 8. 中断与系统调用 / 异常的关系 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>中断与系统调用 / 异常的关系：殊途同归的"陷入内核"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">三类事件看似无关，但<strong>都走同一条路径</strong>：让 CPU <strong>从用户态切到内核态</strong>（trap to kernel）。用户态代码没有特权，碰不到硬件、改不了页表——所有需要特权的操作都必须<strong>陷入内核</strong>。而"陷入内核"的入口只有这么几个：外部中断、异常、系统调用。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>系统调用本质 = 软件主动触发的中断（trap）</strong>：用户态执行 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> 指令（旧的是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">int 0x80</code>）→ CPU 硬件自动做一次"查 IDT + 切内核态 + 保存现场"，然后进内核执行 syscall 分发 → 办完事返回用户态。流程和硬件中断几乎一模一样，<strong>只是发起者从"硬件"换成了"一条指令"</strong>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>状态切换</strong>：中断 / 异常 / 系统调用是仅有的几个"用户态 → 内核态"入口。CPU 通过特权级（x86 的 CPL，0 环内核 / 3 环用户）检查权限，切到内核态才能访问特权资源。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>区别只在"主动/被动、同步/异步"</strong>：系统调用是进程<strong>主动、同步</strong>地求内核办事；外部中断是硬件<strong>被动、异步</strong>地打断；异常是 CPU<strong>被动、同步</strong>地自纠。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">相关阅读：<Link :route="'cs-5-a-1-kernel'" :text="'内核态 vs 用户态、系统调用机制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>你的 Go 程序每次 <code class="bg-teal-100 px-1 rounded text-xs font-mono">fmt.Println</code>、<code class="bg-teal-100 px-1 rounded text-xs font-mono">os.Open</code>、<code class="bg-teal-100 px-1 rounded text-xs font-mono">net.Conn.Read</code>，底层都是<strong>一次 trap 进内核</strong>的同步系统调用。用 <code class="bg-teal-100 px-1 rounded text-xs font-mono">strace</code> 看（第 10 节代码实战），你会看到自己的程序被"截获"进内核再放回来的完整轨迹——那正是中断/异常/系统调用共用硬件路径的证据。</p>
        </aside>
      </section>

      <!-- 9. 与 Go 底层实现的关系 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">9</span>与 Go 底层实现的关系：抢占调度 / netpoller / 信号</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你以为中断机制只属于操作系统？Go 的并发模型整个就<strong>建立在中断思维之上</strong>。三层对应关系：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内核/硬件概念</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 里的对应</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">时钟中断（强制抢占）</td><td class="px-4 py-2 border font-mono text-xs">sysmon + 抢占信号</td><td class="px-4 py-2 border">Go1.14+ 异步抢占：发现 goroutine 跑太久 → 发信号打断</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">网卡硬件中断</td><td class="px-4 py-2 border font-mono text-xs">epoll 就绪事件 → netpoller</td><td class="px-4 py-2 border">数据到达 → 内核中断收包 → epoll 就绪 → 唤醒 goroutine</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">进程阻塞让出 CPU</td><td class="px-4 py-2 border font-mono text-xs">channel / sleep 让出 P</td><td class="px-4 py-2 border">主动 trap 进内核让出，调度器换下一个 goroutine</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">信号（内核 → 进程）</td><td class="px-4 py-2 border font-mono text-xs">signal.Notify</td><td class="px-4 py-2 border">进程收到异步通知，可以注册自己的处理函数</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">Go1.14+ 抢占式调度 = "软件时钟中断"</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">Go 1.13 及以前，一个死循环 goroutine 会<strong>饿死</strong>同线程的其他 goroutine（协作式调度的缺陷）。Go 1.14 引入<strong>异步抢占</strong>：后台 <strong>sysmon 线程</strong>每隔一段时间醒来（≈ 软件时钟中断），若发现某 goroutine 运行超过 10ms 仍不让出，就向运行它的 OS 线程<strong>发送信号（Linux 上是 SIGURG）</strong>——信号处理函数会打断 goroutine 的执行流，把它<strong>抢占到安全点让出</strong>。这本质就是"用信号/时钟机制实现的内核式强制抢占"。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">netpoller：把硬件中断聚合成"事件"</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">网络 IO 的完整链路：网卡收到包 → <strong>硬件中断</strong> → 内核把数据搬进 socket 缓冲（上半部）→ 内核标记这个 fd 就绪 → <strong>epoll_wait 返回就绪 fd 列表</strong>（相当于<strong>把几十上百个硬件中断聚合一次上报</strong>）→ Go 的 netpoller 醒来 → 唤醒等待该 socket 的 goroutine 继续执行。你写的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">conn.Read()</code> 阻塞，其实是 goroutine 在等 netpoller 的通知——<strong>底层是中断驱动，上层是事件驱动</strong>。</p>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">深入阅读：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go 调度器 GMP 模型：goroutine 如何被调度'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>

      <!-- 10. 代码实战 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">10</span>代码实战：信号 / 崩溃 / 抢占 / 系统调用</h2>

        <h3 class="text-base font-semibold text-slate-700 mb-2">示例一：捕获 SIGINT/SIGTERM，优雅退出</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">"中断"在内核里打断 CPU，而"信号"是<strong>内核发给进程</strong>的通知。进程可以注册处理函数——这就是 Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">signal.Notify</code> 干的事。生产服务收到 SIGTERM（kill 默认、Docker stop、K8s 终止 Pod）时优雅退出，靠的就是这个。</p>
        <div class="mb-4"><Code language="go" :code="signalCode" title="graceful-exit.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">示例二：除零 / 空指针——Go panic vs 内核异常</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">同一件"错事"（除零），C 里走完整硬件链路：CPU 异常 → 内核 → 信号 SIGFPE → 进程（默认终止）；Go 里被运行时转成 <code class="bg-slate-100 px-1 rounded text-xs font-mono">panic</code>，可被 <code class="bg-slate-100 px-1 rounded text-xs font-mono">recover</code> 捕获——<strong>Go 把"异常"降级成了"可恢复的错误"</strong>。</p>
        <div class="mb-4"><Code language="go" :code="crashCode" title="crash.go" /></div>
        <div class="mb-4"><Code language="bash" :code="bashCode" title="📟 Terminal：内核视角的异常链路" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">示例三：感受时钟中断驱动的抢占式调度</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">把 GOMAXPROCS 压到 1，让 goroutine A 死循环占满唯一线程——主 goroutine 还能回来，证明 A 被<strong>强制抢占</strong>了（旧版 Go 会直接饿死主 goroutine）。</p>
        <div class="mb-4"><Code language="go" :code="preemptCode" title="preempt.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">示例四：strace 观察"系统调用 = 软件中断"</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">strace</code> 把 Go 程序每次<strong>陷入内核</strong>的 syscall 都记下来——这就是"trap"的直观证据。</p>
        <div class="mb-4"><Code language="bash" :code="syscallCode" title="📟 Terminal：strace 看 trap" /></div>
      </section>

      <!-- 11. 常见坑 -->
      <section id="sec-11" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">11</span>常见坑 ⚠️</h2>
        <div class="space-y-4 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：中断处理函数里做重活，会把整个系统拖垮。</strong><br/>中断处理（上半部）期间通常关中断，做重活 = 长时间不响应其他中断。网卡包没人收 → 缓冲区溢出丢包；时钟中断被压 → 调度错乱、系统时钟漂移。铁律：<strong>ISR 短小精悍，重活推给下半部</strong>。这正是 Go 里事件回调只做快速同步、重活异步化（channel + goroutine）的原因。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：以为"只有硬件才中断"——系统调用也是软件中断（trap）。</strong><br/>"中断"是个大类：外部中断来自硬件，但<strong>异常和系统调用同样借助中断机制陷入内核</strong>。你的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">fmt.Println</code> 每次都在"软中断"，只是运行时和内核把你彻底藏起来了。理解这一点，才能看懂 strace / 性能剖析里的系统调用开销。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：把"中断"和"信号（Signal）"混为一谈。</strong><br/>两者都叫"打断"，但对象完全不同：<strong>中断是发给 CPU 的</strong>（硬件事件，异步，中断上下文，不能睡眠）；<strong>信号是内核发给进程的</strong>（在进程上下文处理，可以睡眠，处理函数是你自己的代码）。CPU 的除零<strong>异常</strong>经内核处理后，才转成发给你进程的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">SIGFPE</code> <strong>信号</strong>。Go 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">signal.Notify</code> 捕获的是<strong>信号</strong>，不是中断——别看到示例一就觉得"Go 能处理中断"。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4（内核开发向）：在中断上下文里睡眠 / 抢锁，会死锁。</strong><br/>中断上下文不属于任何进程、不能调度。若在里面睡眠或等一个被其他进程持有的锁，而那个进程又指望你来唤醒它——死锁。这也是 Go 的 netpoller 设计得"不做任何阻塞操作、只把唤醒交给调度器"的根本原因。</p>
          </aside>
        </div>
      </section>

      <!-- 12. 小结 -->
      <section id="sec-12" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结 ✅</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>为什么中断</strong>：CPU 不能预测外设事件，轮询空转烧 CPU，中断让外设主动通知——无事零开销。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>三类中断</strong>：外部中断（硬件，异步）、异常（CPU 内部，同步）、系统调用/trap（进程主动，同步）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>时钟中断</strong> = 时间片轮转的发动机；<strong>Hz</strong> = 每秒 tick 数，jiffy = 1/Hz。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>处理六步</strong>：发信号 → 控制器仲裁 → 保存现场（寄存器/PC/PSW 压栈）→ 查 IDT → 执行 ISR → 恢复现场返回。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>IDT</strong> = 中断号 → 处理函数地址的映射表；可屏蔽（IF 标志）/ NMI / 异常三类屏蔽性不同。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>中断上下文不能睡眠</strong>，所以要上半部（快）/下半部（慢）拆活。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>连回 Go</strong>：Go1.14+ 抢占式调度靠 sysmon + 信号实现"软件时钟中断"；netpoller 靠 epoll 聚合硬件中断成事件；goroutine 阻塞 = 主动让出。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>别混概念</strong>：中断发给 CPU，信号发给进程；系统调用也是软件中断。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'cs-5-a-1-kernel'" :text="'内核态 vs 用户态、系统调用机制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-1-goroutine-gmp'" :text="'Go 调度器 GMP 模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-a-1-kernel'" :text="'← 上一节：内核态 vs 用户态、系统调用机制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-a-3-boot'" :text="'下一节：引导过程：BIOS→Bootloader→内核 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "为什么要中断" },
  { id: "sec-2", name: "中断的分类" },
  { id: "sec-3", name: "时钟中断" },
  { id: "sec-4", name: "处理流程" },
  { id: "sec-5", name: "IDT 中断向量表" },
  { id: "sec-6", name: "可屏蔽 / NMI" },
  { id: "sec-7", name: "中断上下文 / 上下半部" },
  { id: "sec-8", name: "与系统调用关系" },
  { id: "sec-9", name: "与 Go 底层实现" },
  { id: "sec-10", name: "代码实战" },
  { id: "sec-11", name: "常见坑" },
  { id: "sec-12", name: "小结" },
]

// ===== 示例一：捕获信号优雅退出 =====
const signalCode = `// graceful-exit.go —— os/signal 捕获"内核发来的信号"（注意：信号 ≠ 中断，见坑位）
package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	// 注册要捕获的信号：Ctrl+C(SIGINT)、kill 默认发的(SIGTERM)
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)

	// 模拟正在处理请求的 worker
	go func() {
		for i := 1; ; i++ {
			fmt.Printf("worker 处理第 %d 个请求...\\n", i)
			time.Sleep(500 * time.Millisecond)
		}
	}()

	sig := <-ch // 阻塞等待信号——被内核"异步通知"
	fmt.Printf("收到信号 %v，开始优雅退出（等存量请求收尾）\\n", sig)
	time.Sleep(1 * time.Second)
	fmt.Println("清理完毕，进程退出")
}

// 输出（运行后按 Ctrl+C）：
//   worker 处理第 1 个请求...
//   worker 处理第 2 个请求...
//   收到信号 interrupt，开始优雅退出（等存量请求收尾）
//   清理完毕，进程退出`;

// ===== 示例二：除零 / 空指针崩溃观察 =====
const crashCode = `// crash.go —— 除零 / 空指针：Go 的 panic vs 内核的异常
package main

import "fmt"

// safeDiv：b 为 0 时触发除零，用 recover 兜底（Go 把"异常"降级成"错误"）
func safeDiv(a, b int) (r int, err error) {
	defer func() {
		if p := recover(); p != nil {
			err = fmt.Errorf("捕获 panic: %v", p)
		}
	}()
	return a / b, nil // b == 0 → 运行时 panic: integer divide by zero
}

func main() {
	r, err := safeDiv(10, 0)
	if err != nil {
		fmt.Println("Go 里除零 = panic，可用 recover 捕获：", err)
	} else {
		fmt.Println("结果：", r)
	}

	// Go 里空指针解引用也是 panic（GC 让"野指针"很难出现）
	var p *int
	// _ = *p // 打开这行会 panic: invalid memory address
	fmt.Println("Go 空指针同样走 panic，而不是直接把进程送进内核段错误")

	// 关键区别：同样的除零在 C 里会走"CPU 异常 → 内核 → 信号 SIGFPE → 进程默认终止"
	// 那才是中断/异常机制的完整硬件链路（见下方 Terminal 的 dmesg 输出）
}

// 输出：
//   Go 里除零 = panic，可用 recover 捕获： 捕获 panic: runtime error: integer divide by zero
//   Go 空指针同样走 panic，而不是直接把进程送进内核段错误`;

const bashCode = `# 内核视角：同样的除零，在 C 里走"CPU 异常 → 内核 → 信号"完整链路
$ cat > crash.c <<'EOF'
int main(void) { int a = 1, b = 0; return a / b; }
EOF
$ gcc crash.c -o crash && ./crash
浮点例外 (core dumped)          # 内核给进程发了 SIGFPE 信号，默认终止

$ dmesg | tail -2                # Linux 内核日志能看到这次 CPU 异常
[12345.67] traps: crash[1234] trap divide error ip:55a1.. sp:7ffd.. error:0`;

// ===== 示例三：感受抢占式调度 =====
const preemptCode = `// preempt.go —— 观察 Go1.14+ 抢占式调度（底层 = 时钟中断 / 信号）
package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	runtime.GOMAXPROCS(1) // 只留 1 个 OS 线程，把抢占问题放到最极端

	stop := make(chan struct{})
	// goroutine A：纯死循环——不阻塞、不让出、不 sleep
	go func() {
		for {
			select {
			case <-stop:
				return
			default:
			}
		}
	}()

	time.Sleep(50 * time.Millisecond) // 让 A 先占满唯一线程
	fmt.Println("主 goroutine 回来了——A 明明在死循环，我却没被饿死")
	fmt.Println("→ Go1.14+ 异步抢占：sysmon 发现 A 跑太久 → 发信号(SIGURG)")
	fmt.Println("→ 信号处理强制打断 A 的执行流，主 goroutine 才得以醒来")

	close(stop)
	time.Sleep(10 * time.Millisecond)
}

// 输出：
//   主 goroutine 回来了——A 明明在死循环，我却没被饿死
//   → Go1.14+ 异步抢占：sysmon 发现 A 跑太久 → 发信号(SIGURG)
//   → 信号处理强制打断 A 的执行流，主 goroutine 才得以醒来`;

// ===== 示例四：strace 观察系统调用（trap）=====
const syscallCode = `# 系统调用 = 软件主动触发的中断（trap）——用 strace 观察"陷入内核"
$ cat > hello.go <<'EOF'
package main

import "fmt"

func main() { fmt.Println("hi") }
EOF
$ go build -o hello hello.go
$ strace -e trace=write ./hello
write(1, "hi\\n", 3) = 3      # fmt.Println 底层 → write 系统调用 → 陷入内核 → 返回
hello
# 用户态执行 syscall 指令 → CPU 切内核态 → 查 IDT → 内核处理 → 回用户态`;
</script>
