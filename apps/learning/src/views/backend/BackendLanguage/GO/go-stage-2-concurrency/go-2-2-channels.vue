<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">📡 Channel 通道</h1><p class="text-sm text-slate-500 mt-1">goroutine 之间通信的管道 — Go 并发编程的基石，底层是带锁的环形队列</p></div>
        <div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-2-channels.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-2</span></div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：channel = 环形队列 + 等待队列
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          每个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">make(chan T, N)</code> 底层是一个 <strong>hchan 结构体</strong>，
          核心是<strong>一个 N 容量的环形缓冲区（buf）</strong> + <strong>两个等待队列（sendq / recvq）</strong>。
          发送写到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sendx</code> 指向的位置，接收从 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">recvx</code> 读，两指针各自绕圈前进。
        </p>

        <!-- 结构图：环形队列 + 等待队列 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ch-ov-send" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
              <marker id="ch-ov-recv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
              </marker>
              <marker id="ch-ov-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">容量 5 的缓冲 channel（dataqsiz=5），已有 3 个元素（qcount=3）</text>

            <!-- 环形队列：6 个槽位弧形排列（含 1 个空槽用于展示 sendx） -->
            <!-- 槽 0 有数据（recvx 指向这里） -->
            <rect x="90" y="120" width="76" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="128" y="138" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <text x="128" y="158" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">buf[0]</text>
            <!-- 槽 1 有数据 -->
            <rect x="190" y="120" width="76" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="228" y="138" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <text x="228" y="158" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">buf[1]</text>
            <!-- 槽 2 有数据 -->
            <rect x="290" y="120" width="76" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="328" y="138" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="328" y="158" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">buf[2]</text>
            <!-- 槽 3 空（sendx 指向这里） -->
            <rect x="390" y="120" width="76" height="48" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5 3" />
            <text x="428" y="144" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#b45309">空</text>
            <text x="428" y="162" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">buf[3]</text>
            <!-- 槽 4 空 -->
            <rect x="490" y="120" width="76" height="48" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="528" y="144" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">空</text>
            <text x="528" y="162" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">buf[4]</text>

            <!-- 环形箭头：从 buf[4] 尾部绕回 buf[0] 头部（表示环形） -->
            <path d="M 566 144 Q 600 144 600 96 Q 600 60 540 60 Q 120 60 100 60 Q 80 60 80 90 Q 80 116 100 116" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#ch-ov-flow)" />

            <!-- recvx 指针（绿色，指向 buf[0]） -->
            <line x1="128" y1="76" x2="128" y2="112" stroke="#4ade80" stroke-width="2.5" marker-end="url(#ch-ov-recv)" />
            <rect x="74" y="52" width="108" height="22" rx="4" fill="#4ade80" />
            <text x="128" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">recvx = 0（读这里）</text>

            <!-- sendx 指针（橙色，指向 buf[3]） -->
            <line x1="428" y1="76" x2="428" y2="112" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#ch-ov-send)" />
            <rect x="374" y="52" width="108" height="22" rx="4" fill="#f59e0b" />
            <text x="428" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">sendx = 3（写这里）</text>

            <!-- 分隔线 -->
            <line x1="16" y1="210" x2="704" y2="210" stroke="#e2e8f0" stroke-width="1" />

            <!-- 等待队列 -->
            <text x="16" y="236" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">sendq（等待发送的 goroutine 队列，FIFO）</text>
            <rect x="30" y="250" width="140" height="40" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="100" y="270" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">（空 —— 缓冲未满）</text>

            <text x="360" y="236" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">recvq（等待接收的 goroutine 队列，FIFO）</text>
            <rect x="370" y="250" width="140" height="40" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="440" y="270" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">（空 —— 缓冲有数据）</text>

            <text x="16" y="308" font-size="11" font-family="monospace" fill="#0891b2">qcount=3 · dataqsiz=5 · sendx=3 · recvx=0 · 下一个 send 写到 buf[3]，下一个 recv 读 buf[0]</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：缓冲 channel 的环形队列——sendx 指向下一个写入位，recvx 指向下一个读取位，两指针各自绕圈（越界后回到 0）</figcaption>
        </figure>

        <!-- 操作示意图：send 和 recv -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：send 写入 buf[sendx]，recv 读取 buf[recvx]</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">发送 ch &lt;- "D"（写 buf[3]，sendx 前进到 4）</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ch-ov-s1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" /></marker>
              </defs>
              <rect x="30" y="40" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="56" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <rect x="98" y="40" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="124" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <rect x="166" y="40" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="192" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <rect x="234" y="40" width="52" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="260" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">D</text>
              <line x1="260" y1="20" x2="260" y2="36" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#ch-ov-s1)" />
              <text x="260" y="14" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#b45309">sendx→4</text>
              <text x="16" y="96" font-size="11" font-family="monospace" fill="#64748b">qcount 3→4，D 写入 buf[3]（绿色）</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">接收 v := &lt;-ch（读 buf[0]，recvx 前进到 1）</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ch-ov-r1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              </defs>
              <rect x="30" y="40" width="52" height="36" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="56" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <rect x="98" y="40" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="124" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <rect x="166" y="40" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="192" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <rect x="234" y="40" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="260" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <line x1="124" y1="20" x2="124" y2="36" stroke="#4ade80" stroke-width="2.5" marker-end="url(#ch-ov-r1)" />
              <text x="124" y="14" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#15803d">recvx→1</text>
              <text x="16" y="96" font-size="11" font-family="monospace" fill="#64748b">qcount 4→3，A 从 buf[0] 读出（红色），recvx 移到 buf[1]</text>
            </svg>
          </figure>
        </div>
      </section>

      <!-- 1. Channel 是什么？用来干嘛？ -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Channel 到底是什么？用来干嘛？</h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Channel 是 Go 语言内置的<strong>goroutine 间通信机制</strong>。你可以把它理解为<strong>一根类型安全的管道</strong>：
          一头往里写数据，另一头读出数据。写和读都会<strong>阻塞</strong>，直到对方就绪——这个阻塞特性恰恰是它强大之处。
        </p>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 新手心智模型——"水管"：</strong>想象两根水管，goroutine A 从一头倒水（ch &lt;- v），goroutine B 在另一头接水（v := &lt;-ch）。<br/>
          如果水管里已经有对象堵着（非缓冲），你倒水时必须有人同时在另一头接——这就是<strong>同步</strong>。<br/>
          如果水管中间有个水池（缓冲），你可以先倒几桶水进去，B 慢慢接——这就是<strong>异步</strong>。<br/>
          <strong>无需锁</strong>——水不会同时出现在两个地方，channel 内部帮你保证了这一点。</p>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 跨语言类比：</strong><br/>
          ≈ <strong>消息队列</strong>（RabbitMQ/Kafka）的<strong>进程内版本</strong> — 有缓冲、有阻塞、有生产-消费模式<br/>
          ≈ <strong>Node.js worker.postMessage()</strong> — 但类型安全且自带阻塞同步<br/>
          ≈ <strong>Unix 管道 pipe</strong>（<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">cmd1 | cmd2</code>）— 数据从一个流向另一个<br/>
          ≈ <strong>RxJS Subject</strong> — "推"模式的数据流，但 Channel 自带<strong>背压</strong>（消费慢时生产自动阻塞）<br/>
          <strong>关键区别：</strong>Channel 是语言内置的，不是库。编译器知道它，runtime 调度器知道它，GC 知道它。
          </p>
        </aside>

        <aside class="bg-cyan-50 border-l-4 border-cyan-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-cyan-800 font-semibold">💧 背压（Backpressure）是什么？——"消费跟不上，生产自动减速"</p>
          <p class="text-sm text-cyan-700 leading-relaxed mt-1">生产者塞得快、消费者接得慢时，<strong>系统让生产者自动停下来等</strong>，而不是让数据无限堆积——这就是<strong>背压</strong>。</p>
          <p class="text-sm text-cyan-700 leading-relaxed mt-1"><strong>Channel 天生自带背压</strong>：缓冲 channel 塞满时，<code class="bg-cyan-100 px-1 rounded text-xs font-mono">ch &lt;- v</code> 自动阻塞；非缓冲更是每个值都必须等接收方碰头。<strong>压力从下游传导回上游</strong>——消费者越慢，生产者卡得越久，但数据不丢、内存不涨。</p>
          <p class="text-sm text-cyan-700 leading-relaxed mt-1"><strong>生活类比：自助餐出餐口。</strong>厨房（生产者）一直出菜，取餐的人（消费者）吃得慢，出餐台（缓冲）摆满后，厨房就只能<strong>停下来等</strong>——绝不会把菜堆到地上（不会内存爆炸）。</p>
          <p class="text-sm text-cyan-700 leading-relaxed mt-1"><strong>为什么重要：</strong>没有背压的系统，消费者一慢 → 数据堆积 → 内存暴涨 → 崩。有背压的系统，压力自动传导回上游，<strong>全链路稳定</strong>。对比：Java 的 <code class="bg-cyan-100 px-1 rounded text-xs font-mono">BlockingQueue</code> 也有背压；而 RxJS Subject 默认<strong>没有</strong>——发太快没人消费，事件就无限堆积。</p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Channel 的四个核心用途</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">① 传递数据</h4>
            <p class="text-xs text-slate-500">goroutine A 计算结果，通过 channel 发给 goroutine B 使用。这是最常见的用法。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">② 同步信号</h4>
            <p class="text-xs text-slate-500">"我完成了，通知你"——done channel。不需要传具体值，<code class="bg-slate-200 px-1 rounded text-xs font-mono">chan struct{}{}</code> 零内存。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">③ 广播退出</h4>
            <p class="text-xs text-slate-500">close(channel) 会同时唤醒<strong>所有</strong>等待该 channel 的 goroutine——天然的广播机制。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">④ 并发控制（信号量）</h4>
            <p class="text-xs text-slate-500">缓冲 channel 天然是信号量——容量 N 就是最大并发数，满了自动阻塞。</p>
          </div>
        </div>

        <div class="mb-4"><Code language="go" :code="fourUseCasesCode" title="四大用途速览.go" /></div>
      </section>

      <!-- 2. 底层实现：hchan 结构体 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>底层实现：hchan 结构体深度剖析</h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          每一个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">make(chan T)</code> 调用，底层都创建了一个 <strong>runtime.hchan 结构体</strong>。
          Channel 变量本身只是一个指向这个结构体的指针。理解 hchan 的结构，就能理解 channel 的所有行为。
        </p>

        <div class="bg-slate-900 rounded-xl p-5 mb-4 font-mono text-sm">
          <div class="text-green-400 mb-1">// runtime/chan.go — Go 标准库源码中的 hchan</div>
          <div class="text-yellow-300">type</div><div class="text-white inline"> hchan </div><div class="text-yellow-300">struct</div><div class="text-white"> {</div>
          <div class="pl-4"><span class="text-cyan-300">qcount</span><span class="text-white">   </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ① 环形队列中当前缓存的元素个数</span></div>
          <div class="pl-4"><span class="text-cyan-300">dataqsiz</span><span class="text-white"> </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ② 环形队列的总容量（make(chan T, N) 的 N）</span></div>
          <div class="pl-4"><span class="text-cyan-300">buf</span><span class="text-white">      </span><span class="text-yellow-300">unsafe.Pointer</span><span class="text-slate-400">  // ③ 指向底层环形队列数组的指针</span></div>
          <div class="pl-4"><span class="text-cyan-300">elemsize</span><span class="text-white"> </span><span class="text-yellow-300">uint16</span><span class="text-slate-400">         // ④ 每个元素占用的字节数</span></div>
          <div class="pl-4"><span class="text-cyan-300">closed</span><span class="text-white">   </span><span class="text-yellow-300">uint32</span><span class="text-slate-400">         // ⑤ 是否已关闭（0=未关, 1=已关）</span></div>
          <div class="pl-4"><span class="text-cyan-300">sendx</span><span class="text-white">    </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ⑥ 发送索引——下一个写入 buf 的位置</span></div>
          <div class="pl-4"><span class="text-cyan-300">recvx</span><span class="text-white">    </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ⑦ 接收索引——下一个从 buf 读取的位置</span></div>
          <div class="pl-4"><span class="text-cyan-300">recvq</span><span class="text-white">    </span><span class="text-yellow-300">waitq</span><span class="text-slate-400">          // ⑧ 等待接收的 goroutine 队列（FIFO 链表）</span></div>
          <div class="pl-4"><span class="text-cyan-300">sendq</span><span class="text-white">    </span><span class="text-yellow-300">waitq</span><span class="text-slate-400">          // ⑨ 等待发送的 goroutine 队列（FIFO 链表）</span></div>
          <div class="pl-4"><span class="text-cyan-300">lock</span><span class="text-white">     </span><span class="text-yellow-300">mutex</span><span class="text-slate-400">          // ⑩ 保护整个 hchan 的互斥锁</span></div>
          <div class="text-white">}</div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">非缓冲 vs 缓冲：内存交互完全不同</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">非缓冲 channel (dataqsiz=0)</th><th class="px-4 py-2 border font-semibold">缓冲 channel (dataqsiz=N)</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-medium">buf</td><td class="px-4 py-2 border">nil（没有环形队列！）</td><td class="px-4 py-2 border">分配 N 个元素的数组</td></tr>
              <tr><td class="px-4 py-2 border font-medium">send 流程</td><td class="px-4 py-2 border">① 加锁 → ② 检查 recvq 有没有等待者<br/>→ ③ <strong>直接内存拷贝</strong>给等待的 recv G<br/>→ ④ 唤醒 recv G → ⑤ 解锁</td><td class="px-4 py-2 border">① 加锁 → ② qcount &lt; dataqsiz<br/>→ ③ <strong>拷贝到 buf[sendx]</strong><br/>→ ④ sendx++, qcount++ → ⑤ 解锁</td></tr>
              <tr><td class="px-4 py-2 border font-medium">recv 流程</td><td class="px-4 py-2 border">① 加锁 → ② 检查 sendq 有没有等待者<br/>→ ③ <strong>直接内存拷贝</strong>从等待的 send G<br/>→ ④ 唤醒 send G → ⑤ 解锁</td><td class="px-4 py-2 border">① 加锁 → ② qcount &gt; 0<br/>→ ③ <strong>从 buf[recvx] 拷贝</strong><br/>→ ④ recvx++, qcount-- → ⑤ 解锁</td></tr>
              <tr><td class="px-4 py-2 border font-medium">阻塞时</td><td class="px-4 py-2 border">当前 G 放入 sendq/recvq<br/>→ 调用 gopark() 挂起 G</td><td class="px-4 py-2 border">当前 G 放入 sendq/recvq<br/>→ 调用 gopark() 挂起 G</td></tr>
              <tr><td class="px-4 py-2 border font-medium">唤醒时</td><td class="px-4 py-2 border">对方 G 被调度器放入 runq<br/>→ 从暂停处继续执行</td><td class="px-4 py-2 border">同左</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">send 和 recv 的完整执行流程</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>加锁</strong> — <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">lock(&hchan.lock)</code>。所有 channel 操作都要先获取这把锁——这就是为什么 channel 是并发安全的。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>检查对方等待队列</strong> — 非缓冲 channel 优先检查有没有对方在等；缓冲 channel 优先操作 buf。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>内存拷贝</strong> — 数据从发送方的栈拷贝到接收方的栈（非缓冲，直接拷贝），或从发送方栈拷贝到 buf（缓冲，间接）。始终是<strong>值拷贝</strong>，没有引用。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>唤醒或阻塞</strong> — 对方在等 → 直接唤醒对方 G（goready）。对方不在等 → 把自己挂起（gopark），加入等待队列。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>解锁</strong> — <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">unlock(&hchan.lock)</code>。</div></li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">FIFO 保证：Channel 排队的三条规则</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          Channel 是<strong>队列（FIFO）</strong>，不是随便抓一把。这个性质有三层，<strong>面试爱考，并发写错也常错在这三层上</strong>：
        </p>
        <div class="space-y-2 mb-4 text-sm text-slate-600">
          <p>① <strong>值按发送顺序出队</strong> — 同一 goroutine 依次 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ch &lt;- 1; ch &lt;- 2; ch &lt;- 3</code>，接收方<strong>永远先读到 1</strong>（先到先出，环形队列天然保证）。</p>
          <p>② <strong>等待队列也是 FIFO</strong> — sendq / recvq 是 FIFO 链表，阻塞的 goroutine 按<strong>到达顺序排队</strong>，队头先被服务（Go runtime 的直通优化就是"把值直接交给队头"）。</p>
          <p>③ <strong>但多接收方竞争 ≠ 严格轮流</strong> — 「哪个 goroutine 抢到当前值」由<strong>调度器</strong>决定（谁先被唤醒、谁先跑到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">&lt;-ch</code>）。<strong>值本身仍然 FIFO</strong>，变的只是「谁拿到」。</p>
        </div>
        <div class="mb-4"><Code language="go" :code="fifoCode" title="fifo_order.go" /></div>
        <aside class="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-indigo-800"><strong>🎯 Worker Pool 实锤：</strong>多个 worker 从同一个 channel 抢任务时——<strong>job 永远按 1→5 的顺序出队</strong>（第 ① 条），但<strong>哪个 worker 抢到 job 3，每次运行都可能不同</strong>（第 ③ 条）。所以「任务处理顺序」要看 job 编号（确定），不能看 worker（随机）。</p></aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>Channel 本质就是一个<strong>带锁的、goroutine 感知的环形队列</strong>。"goroutine 感知"意味着它不只是存数据——当一个 G 阻塞在 channel 上时，runtime 会把这个 G 挂起（gopark），让 M 去执行其他 G。当数据到达时，runtime 再把 G 唤醒（goready）放回 P 的队列。这整个过程<strong>不需要你在代码里写任何锁或条件变量</strong>。</p>
        </aside>
      </section>

      <!-- 3. 缓冲 vs 非缓冲 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>非缓冲 vs 缓冲 channel</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold"></th><th class="px-4 py-2 border font-semibold">非缓冲 <code class="text-xs">make(chan int)</code></th><th class="px-4 py-2 border font-semibold">缓冲 <code class="text-xs">make(chan int, 3)</code></th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">发送阻塞</td><td class="px-4 py-2 border">直到有接收方读取</td><td class="px-4 py-2 border">缓冲满时才阻塞</td></tr><tr><td class="px-4 py-2 border">接收阻塞</td><td class="px-4 py-2 border">直到有发送方写入</td><td class="px-4 py-2 border">缓冲空时才阻塞</td></tr><tr><td class="px-4 py-2 border">同步性</td><td class="px-4 py-2 border"><strong>同步握手</strong></td><td class="px-4 py-2 border"><strong>异步解耦</strong></td></tr><tr><td class="px-4 py-2 border">用途</td><td class="px-4 py-2 border">同步信号、确认、done channel</td><td class="px-4 py-2 border">生产者-消费者、并发控制、队列</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="bufferCode" title="buffer_demo.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">nil channel — 永久阻塞的特殊语义</h3>
        <div class="mb-4"><Code language="go" :code="nilChannelCode" title="nil_channel.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ nil channel 三大规则：</strong>① send → 永久阻塞 ② recv → 永久阻塞 ③ close → panic。唯一合法用途是在 select 中<strong>动态禁用 case</strong>——把 channel 置为 nil，对应 case 永不选中。</p></aside>
      </section>

      <!-- 4. 关闭 channel -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>关闭 Channel：广播「结束状态」，不是发送消息</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong class="text-red-600">close(ch) 不会给任何 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">&lt;-ch</code> 发送数据。</strong>
          它把 channel 内部的 closed 标记置 1，然后<strong>一次性广播</strong>一个状态：「通道已终结，以后不会再有任何值了」。
          所有阻塞在接收上的 goroutine 被<strong>同时唤醒</strong>，拿到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">(零值, ok=false)</code>——不是业务数据。
          所以「广播」这个说法是对的，但广播的是<strong>「关闭」状态</strong>，而不是把某条消息复制给所有人。
        </p>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">send vs close —— 本质区别</h3>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold"></th><th class="px-4 py-2 border font-semibold"><code class="text-xs">ch &lt;- v</code>（发送）</th><th class="px-4 py-2 border font-semibold"><code class="text-xs">close(ch)</code>（关闭）</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">传的是什么</td><td class="px-4 py-2 border">一个具体的<strong>数据值</strong></td><td class="px-4 py-2 border">一个<strong>状态信号</strong>（无数据）</td></tr><tr><td class="px-4 py-2 border">谁收到</td><td class="px-4 py-2 border">只被<strong>一个</strong>接收方消费</td><td class="px-4 py-2 border"><strong>所有</strong>等待者同时看到</td></tr><tr><td class="px-4 py-2 border">接收方拿到</td><td class="px-4 py-2 border font-mono text-xs">v, ok=true</td><td class="px-4 py-2 border font-mono text-xs">零值, ok=false</td></tr><tr><td class="px-4 py-2 border">能否重复</td><td class="px-4 py-2 border">能，发 N 次</td><td class="px-4 py-2 border">只能一次，重复 close → panic</td></tr></tbody></table></div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">三种接收方的反应</h3>
        <div class="space-y-2 mb-3 text-sm text-slate-600">
          <p>① <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">v, ok := &lt;-ch</code> —— 当前阻塞的接收方<strong>被同时唤醒</strong>，拿到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">v=零值, ok=false</code>，用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">if !ok</code> 判断已关闭</p>
          <p>② <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for v := range ch</code> —— 先读光缓冲里剩下的值（FIFO），<strong>读空后自动退出循环</strong></p>
          <p>③ <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">select { case &lt;-ch }</code> —— 关闭后该 case 永久「就绪」，每次命中都返回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ok=false</code></p>
        </div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">for v := range ch —— 语法糖拆解（⭐ 最重要）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for v := range ch</code> 是「反复接收」的语法糖，等价于下面这段 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">v, ok := &lt;-ch</code> 循环：
        </p>
        <div class="mb-4"><Code language="go" :code="rangeChanCode" title="range-chan-sugar.go" /></div>
        <ul class="space-y-2 text-slate-600 text-sm mb-3">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>只要 ok=true</strong>（通道开着、有值）→ 继续收，执行循环体</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>ok=false</strong>（已 close 且缓冲排空）→ 自动退出循环</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>和 slice/map 的 range 不同：通道 range <strong>没有索引下标</strong>，循环体每次拿到的是一个<strong>值</strong>；<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for range ch</code>（不取值）则只关心「有没有值」——常用来<strong>纯等关闭信号</strong></span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 不 close 能不能用 range？</strong>能——通道开着 range 照样收值。但<strong>循环永远不会结束</strong>：range 一直阻塞等下一个值。在 main 里 → 死锁；在 goroutine 里 → 泄漏。<strong>所以 close 不是「用 range 的前提」，而是「让 range 正常退出的前提」。</strong></p>
        </aside>

        <div class="bg-slate-50 rounded-xl p-3 mb-4">
          <p class="text-sm text-slate-700"><strong>📌 close 跟缓冲区填满无关：</strong>发 0 个、发 2 个（容量 3）都能关——close 只是宣告「不再发送」，缓冲里已有的值照收不误。只有 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">close</code> 之后再 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ch &lt;- v</code> 才是 panic。「缓冲满」管发送阻塞，「关闭」管禁止新发送——<strong>两件事互不相干</strong>。</p>
        </div>
        <aside class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-red-800"><strong>⚠️ 空转陷阱：</strong><code class="bg-red-100 px-1 rounded text-xs font-mono">for { select { case &lt;-ch: } }</code> 遇到已关闭的 channel 会<strong>空转死循环</strong>（case 永远就绪）。退出必须靠 <code class="bg-red-100 px-1 rounded text-xs font-mono">v, ok := &lt;-ch</code> 判断 ok，或把 channel 置为 nil。</p></aside>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">内部机制：广播到底做了什么</h3>
        <div class="mb-4"><Code language="go" :code="closeMechanismCode" title="close_mechanism.go" /></div>

        <div class="mb-4"><Code language="go" :code="closeCode" title="channel_close.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ close 四条红线：</strong>① 只有<strong>发送方</strong>能 close（接收方关 → 发送方再 send 就 panic）② close 后不能再 send → panic ③ 不能 close 两次 → panic ④ 不能 close(nil) → panic</p></aside>
      </section>

      <!-- 5. 单向 channel + 实战模式 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>单向 Channel + 经典并发模式</h2>
        <h3 class="text-md font-semibold text-slate-700 mb-3">编译时方向约束</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">chan<- T</code> 只发、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-chan T</code> 只收。双向可隐式转单向，反之不行。在函数签名里用单向 channel 是 Go 的惯用法——告诉调用者这个参数是用来发还是收的。</p>
        <div class="mb-4"><Code language="go" :code="directionalCode" title="directional.go" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">生产者-消费者 + Semaphore 并发控制</h3>
        <div class="mb-4"><Code language="go" :code="patternCode" title="producer_consumer.go" /></div>
      </section>

      <!-- 6. 新手常见错误 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>新手最容易犯的 6 个错误</h2>
        <div class="space-y-3 text-sm">
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">① 无缓冲 channel：send 和 recv 必须"同时"存在</h4>
            <p class="text-amber-600">非缓冲 channel（make(chan int)）的 send 必须有 recv 同时就绪，否则<strong>永久阻塞</strong>。主 goroutine 直接 <code class="bg-amber-100 px-1 rounded text-xs">ch &lt;- 42</code> 而没有 goroutine 在接收 → 死锁！要么用缓冲 channel，要么确保有 goroutine 在另一端。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">② 向已关闭的 channel 发送 → panic</h4>
            <p class="text-amber-600">这是最常见的 panic。解决方案：<strong>发送方关闭 channel</strong>，且确保关闭后不再有任何 goroutine 向它发送。用 sync.Once 或 done channel 协调。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">③ for-range channel 没有 close → goroutine 永不退出</h4>
            <p class="text-amber-600"><code class="bg-amber-100 px-1 rounded text-xs">for v := range ch</code> 会一直循环直到 ch 被 close。如果你忘了 close → goroutine 泄漏。接收多个 goroutine 的完成信号时尤其要注意。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">④ 从空 channel 读和向满 channel 写都会阻塞</h4>
            <p class="text-amber-600">这是设计行为——不是 bug！阻塞 = 自动背压——消费慢时生产自动暂停（💧 背压详解见上文 <a href="#sec-1" class="text-amber-700 underline decoration-dotted underline-offset-2">sec-1</a>）。但如果你在主 goroutine 中操作而不希望阻塞，用 <code class="bg-amber-100 px-1 rounded text-xs">select + default</code> 做非阻塞读写。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">⑤ 接收方关闭 channel</h4>
            <p class="text-amber-600">接收方不知道发送方是否还要用这个 channel。接收方关闭后发送方再 send → panic。<strong>永远由发送方关闭。</strong>如果多个发送方→用 sync.Once 或专门的"关门 goroutine"来协调。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">⑥ select 读已关闭 channel 会空转</h4>
            <p class="text-amber-600"><code class="bg-amber-100 px-1 rounded text-xs">for { select { case &lt;-ch: } }</code> 遇到已关闭的 ch，case 会<strong>永久就绪</strong>——每次都立即返回 ok=false，循环<strong>空转死循环</strong>（CPU 打满）。退出必须改成 <code class="bg-amber-100 px-1 rounded text-xs">v, ok := &lt;-ch</code> 判断 ok，或把 channel 置为 nil 禁用该 case。</p>
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">一张图决定：用哪种 channel？</h3>
        <div class="overflow-x-auto mb-3"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">场景</th><th class="px-4 py-2 border font-semibold">用什么</th><th class="px-4 py-2 border font-semibold">原因</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">发信号"我完成了"</td><td class="px-4 py-2 border font-mono text-xs">make(chan struct{})</td><td class="px-4 py-2 border">非缓冲，同步等待。struct{} 零内存</td></tr><tr><td class="px-4 py-2 border">多 goroutine 同时退出</td><td class="px-4 py-2 border">close(channel)</td><td class="px-4 py-2 border">close 是广播——所有等待者同时被唤醒</td></tr><tr><td class="px-4 py-2 border">生产者-消费者解耦</td><td class="px-4 py-2 border font-mono text-xs">make(chan T, N)</td><td class="px-4 py-2 border">缓冲管道，生产快消费慢时有缓冲</td></tr><tr><td class="px-4 py-2 border">限流/并发控制</td><td class="px-4 py-2 border font-mono text-xs">make(chan struct{}, N)</td><td class="px-4 py-2 border">缓冲 channel 就是信号量——容量=最大并发数</td></tr></tbody></table></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：缓冲 channel 的环形队列
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「发送」往 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">sendx</code> 位置写入数据（sendx 前进），点「接收」从 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">recvx</code> 位置读出数据（recvx 前进）。
          指针到末尾会<strong>绕回开头</strong>——这就是「环形」。缓冲满时发送会阻塞（按钮禁用），缓冲空时接收会阻塞。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 qcount: {{ qcount }} / {{ CAP }}</span>
          <span class="bg-orange-50 text-orange-700 px-2 py-1 rounded-full font-mono">✏️ sendx = {{ sendx }}</span>
          <span class="bg-green-50 text-green-700 px-2 py-1 rounded-full font-mono">🔍 recvx = {{ recvx }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doSend" :disabled="busy || qcount >= CAP" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">发送 (ch &lt;- v)</button>
          <button @mousedown="doRecv" :disabled="busy || qcount <= 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">接收 (v := &lt;-ch)</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 环形回绕箭头（背景装饰） -->
              <v-arrow v-for="(a,i) in wrapArrows" :key="'wa'+i" :config="a" />
              <!-- 槽位 -->
              <v-rect v-for="(s,i) in slots" :key="'sr'+i" :config="slotRect(i)" />
              <v-text v-for="(s,i) in slots" :key="'st'+i" :config="slotText(i)" />
              <!-- sendx 指针 -->
              <v-text :config="sendPtrCfg" />
              <!-- recvx 指针 -->
              <v-text :config="recvPtrCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结 &amp; 面试要点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Channel = 带锁的环形队列 + goroutine 感知</strong>——hchan 结构体，make 返回指针</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>FIFO 保证</strong>——值按发送顺序出队（先到先出）；等待队列 sendq/recvq 也是 FIFO；但多接收方「谁抢到」由调度器决定（值仍有序，分配随机）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>非缓冲 channel：send 和 recv 直接内存拷贝（跳过 buf），同步握手</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>缓冲 channel：先写 buf 环形队列，buf 满/空时才阻塞，异步解耦</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>阻塞 = gopark() 挂起 G</strong>，<strong>唤醒 = goready() 放回 P 队列</strong>——由 runtime 调度器处理</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>发送方关闭 channel——close 是广播，所有等待者同时醒来。range 自动在 close 后退出</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>四大用途：<strong>传数据、发信号、广播退出、限流（Semaphore）</strong></span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：goroutine 与 GMP</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Select 多路复用 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
const userStore = useUserStore()

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "是什么？用来干嘛？" },
  { id: "sec-2", name: "底层实现 hchan" },
  { id: "sec-3", name: "非缓冲 vs 缓冲" },
  { id: "sec-4", name: "关闭 channel" },
  { id: "sec-5", name: "单向 + 实战模式" },
  { id: "sec-6", name: "新手常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结 & 面试要点" },
]

// ===== 🎬 环形队列动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(200), W = ref(700)
const CAP = 5                       // 容量 dataqsiz = 5
const SLOT = 76, GAP = 24           // 槽宽、间距
const Y = 70, SH = 52               // 槽顶、槽高
const BX0 = 60                      // 左偏移

interface Slot { id: number; val: string; fill: string }
const slots = reactive<Slot[]>([])
const qcount = ref(0)               // 当前元素数
const sendx = ref(0)                // 下一个写入位置
const recvx = ref(0)                // 下一个读取位置
const busy = ref(false), status = ref('')
const nid = ref(0)
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const sx = (i: number) => BX0 + i * (SLOT + GAP)

// 环形回绕箭头（从最后一个槽绕回第一个槽）
const wrapArrows = computed(() => {
  const lastX = sx(CAP - 1) + SLOT
  const firstY = Y + SH / 2
  return [{
    points: [lastX, firstY, lastX + 40, firstY, lastX + 40, -20, BX0 - 20, -20, BX0 - 20, firstY, BX0, firstY],
    stroke: '#94a3b8', strokeWidth: 1.5, dash: [6, 4], fill: 'transparent', pointerLength: 6, pointerWidth: 5,
  }]
})

function init() {
  slots.length = 0
  for (let i = 0; i < CAP; i++) slots.push({ id: i, val: '', fill: C.ghost })
  // 预置 3 个元素：A B C
  slots[0] = { id: 0, val: 'A', fill: C.cyan }
  slots[1] = { id: 1, val: 'B', fill: C.cyan }
  slots[2] = { id: 2, val: 'C', fill: C.cyan }
  qcount.value = 3
  sendx.value = 3
  recvx.value = 0
  status.value = ''
}

function slotRect(i: number) {
  const s = slots[i]
  const isSend = i === sendx.value
  const isRecv = i === recvx.value
  const active = (isSend && qcount.value < CAP) || (isRecv && qcount.value > 0)
  return {
    x: sx(i), y: Y, width: SLOT, height: SH, cornerRadius: 6,
    fill: s.val ? s.fill : (isSend ? '#fef3c7' : C.ghost),
    stroke: isSend ? C.orange : (isRecv ? C.green : '#94a3b8'),
    strokeWidth: (isSend || isRecv) ? 2.5 : 1.5,
    dash: s.val ? undefined : [5, 3],
    opacity: active || s.val ? 1 : 0.55,
  }
}
function slotText(i: number) {
  const s = slots[i]
  return {
    x: sx(i), y: Y + 14, width: SLOT, height: SH - 28,
    text: s.val || '空', fontSize: s.val ? 18 : 12,
    fontFamily: 'monospace', fontStyle: 'bold',
    fill: s.val ? '#ffffff' : (i === sendx.value ? '#b45309' : C.muted),
    align: 'center', verticalAlign: 'middle',
  }
}
const sendPtrCfg = computed(() => ({
  x: sx(sendx.value), y: Y - 22, width: SLOT, text: `✏️ sendx=${sendx.value}`,
  fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: '#b45309', align: 'center',
}))
const recvPtrCfg = computed(() => ({
  x: sx(recvx.value), y: Y + SH + 8, width: SLOT, text: `🔍 recvx=${recvx.value}`,
  fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: '#15803d', align: 'center',
}))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doSend() {
  if (qcount.value >= CAP) return
  act('发送  O(1)', async () => {
    status.value = `ch <- ${String.fromCharCode(65 + nid.value)}  写入 buf[${sendx.value}]`
    const ch = String.fromCharCode(65 + nid.value)
    nid.value++
    slots[sendx.value].val = ch
    slots[sendx.value].fill = C.green
    await d(350)
    slots[sendx.value].fill = C.cyan
    qcount.value++
    status.value = `sendx ${sendx.value} → ${(sendx.value + 1) % CAP}`
    sendx.value = (sendx.value + 1) % CAP
    await d(300)
  })
}

function doRecv() {
  if (qcount.value <= 0) return
  act('接收  O(1)', async () => {
    const v = slots[recvx.value].val
    status.value = `v := <-ch  读出 buf[${recvx.value}] 的 ${v}`
    slots[recvx.value].fill = C.red
    await d(350)
    slots[recvx.value].val = ''
    slots[recvx.value].fill = C.ghost
    qcount.value--
    status.value = `recvx ${recvx.value} → ${(recvx.value + 1) % CAP}`
    recvx.value = (recvx.value + 1) % CAP
    await d(300)
  })
}

function doReset() { busy.value = false; nid.value = 3; init() }

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

const fourUseCasesCode = `// ① 传递数据
ch := make(chan int)
go func() { ch <- heavyComputation() }()
result := <-ch  // 拿到计算结果

// ② 同步信号（done channel — struct{} 零内存）
done := make(chan struct{})
go func() { doWork(); done <- struct{}{} }()
<-done  // 等待完成

// ③ 广播退出（close channel → 所有等待者同时唤醒）
stop := make(chan struct{})
for i := 0; i < 5; i++ {
    go func() { <-stop; fmt.Println("退出") }()
}
close(stop)  // 5 个 goroutine 同时收到信号！

// ④ 并发控制（缓冲 channel 作为信号量）
sema := make(chan struct{}, 3)  // 最多 3 个并发
for _, url := range urls {
    sema <- struct{}{}  // 获取槽位
    go func(u string) {
        defer func() { <-sema }()  // 释放槽位
        fetch(u)
    }(url)
}`

const bufferCode = `// 非缓冲 — 同步握手（send 和 recv 同时发生，直接内存拷贝）
unbuf := make(chan int)
go func() { unbuf <- 1 }()  // 阻塞等待 recv
v := <-unbuf                // 唤醒 sender，数据从 sender 栈直接拷到 v
fmt.Println(v)              // 输出: 1

// 缓冲 — 异步队列（容量 3，环形队列）
buf := make(chan string, 3)
buf <- "a"; buf <- "b"; buf <- "c"  // 不阻塞（buf 未满）
// buf <- "d"                        // 阻塞！qcount == dataqsiz (3==3)
fmt.Println(<-buf, <-buf, <-buf)    // 输出: a b c
fmt.Println(len(buf), cap(buf))     // 输出: 0 3

// 缓冲 channel 用作 Semaphore（信号量）
sema := make(chan struct{}, 10)  // 最多 10 个并发
for _, job := range jobs {
    sema <- struct{}{}  // 获取槽位（满了就阻塞）
    go func(j Job) {
        defer func() { <-sema }()  // 释放槽位
        process(j)
    }(job)
}`

const fifoCode = `// ① 值按发送顺序出队（先到先出）—— 队列本质
ch := make(chan int, 5)
ch <- 1; ch <- 2; ch <- 3
fmt.Println(<-ch)  // 输出: 1  ← 永远先拿"最早进入"的值
fmt.Println(<-ch)  // 输出: 2
fmt.Println(<-ch)  // 输出: 3

// ② 阻塞的 goroutine 也按到达顺序排队（sendq / recvq 是 FIFO 链表）
// 先阻塞的先被服务——Go 会把值直接交给等待队列的"队头"

// ③ 但"谁抢到下一个值"由调度器决定：
//    值一定按 FIFO 出队（1 先于 2、2 先于 3…），
//    多接收方竞争时，"哪个 goroutine 拿到"是随机的 —— 别依赖它`

const nilChannelCode = `var nilCh chan int  // nilCh == nil

// nilCh <- 1        // 永久阻塞！不是 panic
// <-nilCh           // 永久阻塞！
// close(nilCh)      // panic!

// ✅ 唯一合法用途：在 select 中动态禁用 case
var timeoutCh <-chan time.Time = nil  // 默认不要超时
if someCondition {
    timeoutCh = time.After(5 * time.Second)  // 条件满足时才启用
}
select {
case <-timeoutCh:  // nil 时永不选中，非 nil 时正常
case <-workCh:
}`

const closeCode = `// 关键点：close 只是把 closed 置 1 —— 并不清空 buf！
ch := make(chan int, 3)
ch <- 1; ch <- 2; ch <- 3
close(ch)                 // ① 发送方关闭（此刻 buf 里还有 1、2、3）

// ② 关闭 ≠ 清空：buf 里剩下的值照样能读，只要还有值 ok 就是 true
v, ok := <-ch             // v=1, ok=true   ← 还能读到！
v, ok = <-ch              // v=2, ok=true
v, ok = <-ch              // v=3, ok=true

// ③ 直到「已关闭 且 buf 读空」，ok 才变成 false
v, ok = <-ch              // v=0, ok=false  ← 现在才真正"已关闭且空"
if !ok { fmt.Println("读空了，通道已关闭") }

// ④ for range 就是把 ②③ 自动做完：先读光 buf，读空后自动退出
ch2 := make(chan int, 3)
ch2 <- 1; ch2 <- 2; ch2 <- 3
close(ch2)
for v := range ch2 { fmt.Println(v) }  // 输出: 1 2 3（读完自动退出）

// ch <- 4                 // ❌ panic! send on closed channel（close 后不能再 send）`

const rangeChanCode = `// for v := range ch 是语法糖，等价于下面这段 v, ok := <-ch 循环：
ch := make(chan int, 3)
ch <- 10; ch <- 20; ch <- 30
close(ch) // 不 close → 下面的 range 永不退出（main 里死锁 / goroutine 里泄漏）

for v := range ch {   // 等价 ↓
    fmt.Println(v)    // 10, 20, 30（close 后先读光存量再退出）
}

// for v := range ch 的真实展开：
for {
    v, ok := <-ch
    if !ok { // 已关闭 且 缓冲排空
        break // 自动退出循环
    }
    fmt.Println(v)
}

// for range ch（不取值）→ 纯等关闭信号：
for range ch {
    // 通道没关就一直等；一 close 立即结束循环
}`
const closeMechanismCode = `// close 的底层行为（runtime closechan 的要点）：
// ① 置 closed = 1
// ② 唤醒接收队列所有阻塞 goroutine → 各拿 (零值, ok=false)
// ③ 唤醒发送队列所有阻塞 goroutine → 醒来后 panic（send on closed channel）
//
// 细节：
// - 缓冲 channel 关后还能读：buf 里已有的值按 FIFO 读完，读空后才返回 ok=false
// - 广播只对「当前正在阻塞」的接收方即时生效；没在等的，下次 <-ch 也会看到已关闭
// - close 只广播状态，不产生任何数据值
done := make(chan struct{})   // 经典广播退出
for i := 0; i < 5; i++ {
    go func(id int) { <-done; fmt.Printf("worker %d 退出\\n", id) }(i)
}
close(done)  // 一次 close，5 个 worker 同时被唤醒——send 做不到（一条消息只能被一个接收方拿走）`

const directionalCode = `// chan<- T = 只能发送
func produce(ch chan<- int) {
    for i := 0; i < 3; i++ { ch <- i }
    close(ch)              // 发送方关闭
}
// <-chan T = 只能接收
func consume(ch <-chan int) {
    for v := range ch { fmt.Println(v) }
}

func main() {
    ch := make(chan int, 3)
    go produce(ch)         // 双向 → 只发（自动转换）
    consume(ch)            // 双向 → 只收（自动转换）
}`

const patternCode = `// 🏭 生产者-消费者 + Semaphore 限流
func main() {
    const maxConcurrency = 5
    sema := make(chan struct{}, maxConcurrency) // 信号量
    jobs := make(chan string, 100)

    // 消费者池
    for w := 1; w <= 3; w++ {
        go func(id int) {
            for job := range jobs {
                sema <- struct{}{} // 获取并发槽
                fmt.Printf("worker %d: %s\\n", id, job)
                time.Sleep(100 * time.Millisecond)
                <-sema              // 释放并发槽
            }
        }(w)
    }

    // 生产者
    for _, url := range urls { jobs <- url }
    close(jobs)
}
// 3 个 worker 同时消费，但通过 sema 控制"真正在执行的并发数"不超过 5`
</script>
