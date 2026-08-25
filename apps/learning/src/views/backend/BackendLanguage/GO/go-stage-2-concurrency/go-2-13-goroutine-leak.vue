<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">💧 goroutine 泄漏排查</h1><p class="text-sm text-slate-500 mt-1">检测 · 排查 · 修复 — goroutine 泄漏像水龙头没关，慢慢耗尽你的内存</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-13-goroutine-leak.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-13</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：worker 阻塞在无人接收的 channel 上，GC 无法回收</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">main 启动一个 worker，worker 执行 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ch &lt;- 42</code>——但<strong>没有接收方</strong>，无缓冲 channel 的发送就<strong>永远阻塞</strong>。runtime 把 worker <strong>park 在 channel 的 sendq 等待队列</strong>（挂起不占 CPU）。因为 worker 的栈还被 sendq 引用着，<strong>GC 认为它不是垃圾 → 不回收 → 内存 + 资源悄悄泄漏</strong>。修复方向：给 worker 一个<strong>退出路径</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">&lt;-ctx.Done()</code> / done channel / close(ch)）。</p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 340" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="gl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="gl-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>

            <!-- 标题 -->
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">goroutine 泄漏 — 阻塞在 channel 上 · 栈被引用 · GC 无法回收</text>

            <!-- main goroutine -->
            <rect x="40" y="60" width="170" height="84" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="125" y="82" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#1e293b">main goroutine</text>
            <text x="125" y="104" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" fill="#475569">ch := make(chan int)</text>
            <text x="125" y="124" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" fill="#475569">go worker(ch)</text>
            <text x="125" y="138" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" fill="#94a3b8">// 无人接收</text>

            <!-- worker G（泄漏） -->
            <rect x="470" y="60" width="210" height="90" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2" />
            <text x="575" y="82" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">G worker（泄漏）</text>
            <text x="575" y="104" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">ch &lt;- 42</text>
            <text x="575" y="124" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" fill="#dc2626">状态: chan send（阻塞）</text>
            <text x="575" y="140" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" fill="#b91c1c">→ gopark 挂起，永不退出</text>

            <!-- 启动 -->
            <line x1="210" y1="100" x2="470" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#gl-arr)" />
            <text x="340" y="90" text-anchor="middle" font-size="10.5" font-family="monospace" font-weight="bold" fill="#64748b">go worker(ch)</text>

            <!-- channel ch -->
            <rect x="250" y="180" width="170" height="60" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="335" y="202" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">ch（无缓冲 channel）</text>
            <text x="335" y="222" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" fill="#0369a1">recvq: 空 · sendq: [worker]</text>

            <!-- 发送阻塞：worker → ch（红） -->
            <line x1="470" y1="150" x2="420" y2="210" stroke="#ef4444" stroke-width="2.5" marker-end="url(#gl-red)" />
            <text x="445" y="172" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="#dc2626">ch &lt;- 42 永远等不到接收方</text>

            <!-- GC 无法回收 -->
            <line x1="335" y1="240" x2="335" y2="300" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 3" marker-end="url(#gl-red)" />
            <text x="345" y="268" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="#dc2626">栈仍被 sendq 引用（非垃圾）</text>
            <rect x="250" y="300" width="240" height="34" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="370" y="317" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" font-weight="bold" fill="#b91c1c">GC: 不回收 → 内存悄悄增长</text>

            <!-- 检测 / 修复速查 -->
            <text x="520" y="302" font-size="10.5" font-family="monospace" fill="#64748b">🔍 检测: NumGoroutine / pprof / goleak</text>
            <text x="520" y="322" font-size="10.5" font-family="monospace" fill="#15803d">✅ 修复: 加 &lt;-ctx.Done() 退出路径</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：泄漏结构——worker 向无人接收的 channel 发送而永久阻塞，被 park 在 sendq 队列；GC 因栈仍被引用而不回收 → 内存悄悄泄漏。修复 = 给 goroutine 一个明确的退出路径</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>什么是 goroutine 泄漏？— "等一个永远不会来的消息"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">goroutine 不会自己结束——函数执行完才退出。如果 goroutine 在等一个<strong>永远不会到来的消息</strong>——channel、锁、网络连接——它就<strong>永远阻塞</strong>。每秒泄漏 1 个→一天 86400 个→一个月 ~250 万个≈ <strong>~5GB 无法回收的内存</strong>。GC 处理不了——因为 goroutine 还没退出，它的栈和变量不是垃圾。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>≈ <strong>没 remove 的 EventListener</strong>——页面都销毁了回调还在占着引用。≈ <strong>没 clearInterval 的定时器</strong>——程序退出前永远不会停。Go 的 goroutine 泄漏更隐蔽——不 crash 不报错，只是内存悄悄涨。</p></aside>
        <div class="bg-amber-50 rounded-xl p-4 border border-amber-200 text-sm mb-4"><strong class="text-amber-700">⚠️ 泄漏的代价：</strong>每个 goroutine ~2KB 启动栈 + 堆变量 + channel 缓冲区。100,000 个泄漏 goroutine ≈ 200MB+ 不可回收内存。更糟的是——可能还<strong>持有锁、占着文件描述符、占着数据库连接</strong>。</div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>三泄漏场景 + 修复</h2>
        <div class="space-y-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">❌ 场景1: Channel 无人配对——最经典</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak1BadCode" title="❌" /></div><div><Code language="go" :code="leak1FixCode" title="✅ 缓冲 channel / 确保有接收方" /></div></div></div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">❌ 场景2: for-select 没有退出条件</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak2BadCode" title="❌" /></div><div><Code language="go" :code="leak2FixCode" title="✅ done channel / context" /></div></div></div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">❌ 场景3: HTTP Response.Body 没关（资源泄漏）</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak3BadCode" title="❌" /></div><div><Code language="go" :code="leak3FixCode" title="✅ defer Close" /></div></div></div>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>如何发现泄漏？— 三件武器</h2>
        <div class="mb-4"><Code language="go" :code="detectCode" title="leak_detect.go" /></div>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>① NumGoroutine：</strong>测试前后对比——生产 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">/debug/pprof/goroutine</code> 实时查看</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>② goleak：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">goleak.VerifyTestMain(m)</code>——每个测试自动检查，CI 跑</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>③ pprof goroutine profile：</strong>运行时抓 goroutine 堆栈——看哪个函数阻塞了最多 goroutine</span></li></ul>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>修复口诀</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>每个 goroutine 一个退出路径</strong>——context、done channel、close(ch)</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>发送方关闭 channel</strong>，接收方用 range——自动退出</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer close / defer cancel / defer Body.Close()</strong>——资源清理铁三角</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>goleak + go test -race</strong>——CI 自动守住大门，不让泄漏上线</span></li></ul></section>

      <!-- 执行流程拆解 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>执行流程拆解：一个泄漏如何一步步发生</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">下面把泄漏的完整过程拆成 <strong>8 步</strong>——每一步都是 runtime 的真实行为。看完你就能在脑子里"跑"一遍：下次看到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">chan send</code> 卡住的 goroutine，立刻知道它卡在哪一步。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600 text-sm leading-relaxed"><strong>main 启动 worker：</strong>执行 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go worker(ch)</code>——runtime 为新函数分配一个 ~2KB 的栈，创建 G（goroutine 结构体）并排入运行队列。此刻一切正常。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600 text-sm leading-relaxed"><strong>worker 执行 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ch &lt;- 42</code>：</strong>无缓冲 channel 的发送必须等一个<strong>接收方</strong>同时就绪。此时没有任何 goroutine 在 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&lt;-ch</code> 等待。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600 text-sm leading-relaxed"><strong>runtime 检测无接收方：</strong>发送无法立即完成，runtime 判定这个 goroutine 需要"暂停并等待"。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600 text-sm leading-relaxed"><strong>调 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">gopark</code> 把 worker 挂起：</strong>worker 从运行队列摘除，<strong>不再占 CPU</strong>，状态变为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">chan send</code>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600 text-sm leading-relaxed"><strong>挂进 channel 的 sendq 等待队列：</strong>channel 内部维护一个 sendq 链表，把等待发送的 goroutine（含它的栈指针）链起来。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span><div class="text-slate-600 text-sm leading-relaxed"><strong>main 返回，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ch</code> 局部变量失去引用：</strong>main 的栈帧弹出，栈上变量 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ch</code> 不再被程序代码引用——但它仍被 sendq 内部持有。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">7</span><div class="text-slate-600 text-sm leading-relaxed"><strong>下一轮 GC：sendq 仍引用 worker 栈 → 判定不是垃圾：</strong>GC 从根对象扫描，顺着 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">channel → sendq → worker 栈</code> 这条引用链能到达，所以 worker 的栈和它引用的对象<strong>全部不回收</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">8</span><div class="text-slate-600 text-sm leading-relaxed"><strong>内存与资源悄悄累积：</strong>每秒泄漏 1 个 → 一天 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">86400</code> 个 → 一个月约 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">250 万</code> 个 ≈ <strong>~5GB 无法回收的内存</strong>。进程不 crash、不报错——直到 OOM。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="leakProcessCode" title="leak_process.go — 8 步对应代码注释" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>worker 卡在 <code class="bg-purple-100 px-1 rounded text-xs">ch &lt;- 42</code> 就像 <strong>一个永不 resolve 的 Promise</strong>——<code class="bg-purple-100 px-1 rounded text-xs">new Promise(() =&gt; {})</code> 永远不调用 resolve，<code class="bg-purple-100 px-1 rounded text-xs">await</code> 它的 async 函数就永远挂起。两者都是「死等一个永远不会来的消息」。区别：JS 里没人 await 的 Promise 还有可能被 GC 收走；Go 里被 park 的 goroutine 栈被 sendq 强引用，GC 只能眼睁睁看着内存涨。</p></aside>
      </section>

      <!-- 常见错误与陷阱 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>常见错误与陷阱：4 个必踩的坑</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">泄漏不止一种姿势。下面 4 个坑都是真实项目里高频出现的，每个都附 ⚠️ 陷阱说明和 ✅ 修复写法。</p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <h4 class="font-semibold text-slate-700 mb-2">① 无缓冲 channel 发送没人接收——最经典</h4>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱：</strong>无缓冲 channel 的发送<strong>必须配对接收</strong>。<code class="bg-amber-100 px-1 rounded text-xs">go func(){ ch &lt;- 42 }()</code> 若没有 goroutine 在 <code class="bg-amber-100 px-1 rounded text-xs">&lt;-ch</code>，发送永远阻塞、goroutine 被 park 进 sendq——和主图结构一模一样。</p></aside>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="trapNoRecvCode" title="❌" /></div><div><Code language="go" :code="trapNoRecvFixCode" title="✅ 缓冲 1 个即可" /></div></div>
        </div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <h4 class="font-semibold text-slate-700 mb-2">② time.NewTicker / time.NewTimer 忘记 Stop()</h4>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱：</strong><code class="bg-amber-100 px-1 rounded text-xs">NewTicker</code> 创建后<strong>不会自动停止</strong>——只要不调 <code class="bg-amber-100 px-1 rounded text-xs">Stop()</code>，ticker 就一直往 channel 发 tick，监听它的 goroutine 就永不退出。这也是泄漏，只是藏在「定时器」的外衣下。</p></aside>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="trapTickerCode" title="❌" /></div><div><Code language="go" :code="trapTickerFixCode" title="✅ defer ticker.Stop()" /></div></div>
        </div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <h4 class="font-semibold text-slate-700 mb-2">③ 用 sleep 掩盖泄漏——测试假绿</h4>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱：</strong>测试里 <code class="bg-amber-100 px-1 rounded text-xs">time.Sleep(...)</code> 只是「暂时等到了」，<strong>不能证明 goroutine 退出了</strong>——泄漏的 goroutine 可能比 sleep 活得更久。正确姿势：用 <strong>goleak 断言</strong>，让泄漏直接 fail，而不是靠运气。</p></aside>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="trapSleepCode" title="❌" /></div><div><Code language="go" :code="trapSleepFixCode" title="✅ goleak 断言" /></div></div>
        </div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h4 class="font-semibold text-slate-700 mb-2">④ 互斥锁死锁 = 逻辑泄漏</h4>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱：</strong>死锁的 goroutine 也<strong>永不退出</strong>，同样占着栈、同样 GC 不回收——只是它卡在锁上而不是 channel 上。锁的持有范围过大、持锁期间等待 channel，都容易写成死锁。</p></aside>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="trapMutexCode" title="❌" /></div><div><Code language="go" :code="trapMutexFixCode" title="✅ 缩小锁范围" /></div></div>
        </div>
      </section>

      <!-- 检测工具深度 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>检测工具深度：pprof 完整抓取流程 + goleak 正确姿势</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><strong>NumGoroutine</strong> 只能告诉你「有没有泄漏」；<strong>pprof</strong> 能告诉你「泄漏在哪」——每条 goroutine 的完整堆栈 + 阻塞时长。生产环境先跑 pprof 定位到函数，再用 goleak 在测试里把门守住。</p>

        <h4 class="font-semibold text-slate-700 mb-2">Step 1：程序里注册 pprof 路由</h4>
        <div class="mb-4"><Code language="go" :code="pprofSetupCode" title="pprof_server.go" /></div>

        <h4 class="font-semibold text-slate-700 mb-2">Step 2：抓 goroutine profile</h4>
        <div class="mb-4"><Code language="bash" :code="pprofCmdCode" title="📟 Terminal" /></div>

        <h4 class="font-semibold text-slate-700 mb-2">Step 3：goleak 在 TestMain 里的正确姿势</h4>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">一个 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">TestMain</code> 全局生效——所有测试跑完统一检查，任何泄漏直接 fail 并打印堆栈。推荐进 CI。</p>
        <div class="mb-4"><Code language="go" :code="goleakTestMainCode" title="main_test.go" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 实战组合拳：</strong>本机复现用 <code class="bg-emerald-100 px-1 rounded text-xs">/debug/pprof/goroutine?debug=1</code>；线上自动检测用 <code class="bg-emerald-100 px-1 rounded text-xs">goleak.VerifyTestMain</code>；两者结合，开发期就把泄漏拦住。</p></aside>
      </section>

      <!-- 反模式 + 经验法则 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>反模式 + 经验法则：发送方 vs 接收方谁负责退出</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">泄漏的根源是<strong>退出责任不清</strong>。记住一句总纲：<strong>每个 goroutine 都必须有退出路径</strong>。下面用代码 + 矩阵 + ✅/❌ 把正确写法和反模式摆开。</p>
        <div class="mb-4"><Code language="go" :code="sendRecvRuleCode" title="send_recv_rule.go — 发送方 close，接收方 range" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">谁负责退出</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">写法</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">正常生产/消费</td><td class="px-4 py-2 border border-slate-200"><strong>发送方 close(ch)</strong></td><td class="px-4 py-2 border border-slate-200">接收方 for-range 自动退出</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">需要随时取消</td><td class="px-4 py-2 border border-slate-200"><strong>select + &lt;-ctx.Done()</strong></td><td class="px-4 py-2 border border-slate-200">cancel() 触发所有监听者退出</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">并发多个发送方</td><td class="px-4 py-2 border border-slate-200"><strong>绝不能多个 close</strong></td><td class="px-4 py-2 border border-slate-200">只能单一发送方 close</td></tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>• 发送方 close(ch)，接收方 for-range 自动退出<br/>• 需要取消 → select + <code class="bg-emerald-100 px-1 rounded text-xs">&lt;-ctx.Done()</code><br/>• 资源一律 defer Close()<br/>• 每个 goroutine 必须有退出路径</p></aside>
          <aside class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4"><p class="text-sm text-red-800"><strong>❌ 反模式：</strong><br/>• 接收方 close 发送方还在写的 channel → <code class="bg-red-100 px-1 rounded text-xs">panic: send on closed channel</code><br/>• 多个发送方都 close → <code class="bg-red-100 px-1 rounded text-xs">panic: close of closed channel</code><br/>• 只 close 不消费 → 接收方可能饿死<br/>• close 是发送方职责，且只能执行一次</p></aside>
        </div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：errgroup</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-14-sync-map" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：sync.Map →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"什么是泄漏"},{id:"sec-2",name:"三场景+修复"},{id:"sec-3",name:"检测武器"},{id:"sec-4",name:"修复口诀"},{id:"sec-5",name:"泄漏如何发生"},{id:"sec-6",name:"常见错误与陷阱"},{id:"sec-7",name:"pprof 实战"},{id:"sec-8",name:"收发责任"}]
const leak1BadCode = `// ❌ goroutine 永远阻塞——没人接收
func leak() {
    ch := make(chan int)
    go func() { ch <- 42 }()  // 永远等 recv——泄漏！
    // 函数返回后 ch 无引用——但 goroutine 还活着，不会 GC
}`
const leak1FixCode = `// ✅ 缓冲 = 发送不阻塞
ch := make(chan int, 1)
go func() { ch <- 42 }()
// ✅ 或确保有 goroutine 在另一头接收`
const leak2BadCode = `// ❌ for-select 没有退出条件——永不退出
go func() {
    for { select { case v := <-ch: handle(v) } }
}()`
const leak2FixCode = `// ✅ 加 done channel 退出路径
go func() {
    for {
        select {
        case v := <-ch: handle(v)
        case <-ctx.Done(): return  // 退出！
        }
    }
}()`
const leak3BadCode = `resp, _ := http.Get(url)
// 忘了 resp.Body.Close()
// goroutine 泄漏——底层 TCP 连接不释放，文件描述符泄漏`
const leak3FixCode = `resp, err := http.Get(url)
if err != nil { return err }
defer resp.Body.Close()  // ✅ defer 铁律`
const detectCode = `// ① NumGoroutine——测试前后对比（最简单）
func TestNoLeak(t *testing.T) {
    before := runtime.NumGoroutine()
    doConcurrentWork()
    time.Sleep(100*time.Millisecond)  // 等 goroutine 退出
    after := runtime.NumGoroutine()
    if after > before {
        t.Errorf("泄漏 %d goroutines: %d → %d", after-before, before, after)
    }
}

// ② goleak——每个测试自动检测（推荐）
// import "go.uber.org/goleak"
func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)  // 任何测试多了 goroutine 就 fail
}

// ③ pprof——运行时抓 goroutine 堆栈
// http://localhost:6060/debug/pprof/goroutine?debug=1
// 输出: goroutine 123 [chan receive, 10 minutes]:
//        main.leakBug() at leak.go:42
// → 看到 "10 minutes" 就知道这个 goroutine 阻塞太久了`
const leakProcessCode = `// 泄漏现场还原：8 步对应代码注释
func leakProcess() {
    ch := make(chan int)          // ① 无缓冲 channel，必须收发配对
    go func() {                    // ② main 启动 worker，分配 ~2KB 栈
        ch <- 42                  // ③ 没有接收方 → 发送阻塞
        // ④ runtime 调 gopark：worker 挂起，不占 CPU
        // ⑤ 挂进 ch.sendq 等待队列（持有 worker 栈指针）
        fmt.Println("这行永不执行")
    }()
    // ⑥ main 返回：栈帧弹出，ch 局部变量失去程序引用
    // ⑦ GC 扫描：sendq 仍引用 worker 栈 → 判定非垃圾
} // ⑧ worker 永久驻留：每秒 1 个 → 一天 86400 → 月 ~250 万 ≈ 5GB`
const trapNoRecvCode = `// ❌ 坑 1：无缓冲 channel 发送没人接收
func trapNoRecv() {
    ch := make(chan int)
    go func() { ch <- 42 }()   // 无人 <-ch → gopark 挂死
    // main 不等结果直接返回 → worker 泄漏
}`
const trapNoRecvFixCode = `// ✅ 修复 1：缓冲 1 个 → 发送不阻塞
func trapNoRecvFix() {
    ch := make(chan int, 1)    // 缓冲 1
    go func() { ch <- 42 }()   // 直接写入缓冲，正常完成
    fmt.Println("worker 正常退出，无泄漏")
}`
const trapTickerCode = `// ❌ 坑 2：NewTicker 忘记 Stop()——定时器永不停止
func trapTicker() {
    ticker := time.NewTicker(time.Second)
    go func() {
        for range ticker.C {   // 永不退出
            doWork()
        }
    }()
    // 没有 ticker.Stop()：
    // ticker 持续发 tick + 监听 goroutine 不退出 → 双重泄漏
}`
const trapTickerFixCode = `// ✅ 修复 2：defer ticker.Stop() + 退出路径
func trapTickerFix() {
    ticker := time.NewTicker(time.Second)
    defer ticker.Stop()        // 函数返回自动停掉 ticker
    done := make(chan struct{})
    go func() {
        for {
            select {
            case <-ticker.C:
                doWork()
            case <-done:       // 退出路径
                return
            }
        }
    }()
    // 用完后 close(done)，goroutine 干净退出
}`
const trapSleepCode = `// ❌ 坑 3：测试里 sleep 掩盖泄漏——测试假绿
func TestLeaky(t *testing.T) {
    go leakyWorker()                // 泄漏 1 个 goroutine
    time.Sleep(200 * time.Millisecond)
    // 测试"看起来"通过了，但 worker 还在后台泄漏
    // 泄漏的 goroutine 可能比 sleep 活得更久 → 误判
}`
const trapSleepFixCode = `// ✅ 修复 3：用 goleak 断言，泄漏就 fail
import "go.uber.org/goleak"

func TestClean(t *testing.T) {
    defer goleak.VerifyNone(t)     // 测试结束时检查
    go leakyWorker()               // 泄漏 → 测试红
}`
const trapMutexCode = `// ❌ 坑 4：互斥锁死锁 = 逻辑泄漏
var mu sync.Mutex
var ready = make(chan int)

func trapDeadlock() {
    go func() {
        mu.Lock()                  // A 先抢到锁
        <-ready                    // 等 main 发数据（main 要锁才能走到发送）
        mu.Unlock()
    }()
    mu.Lock()                      // main 等锁——被 A 握着 → 永远等
    ready <- 1                     // 这行永远执行不到
    mu.Unlock()
    // 死锁环：main 等 A 的锁，A 等 main 的 ready → 双双挂死
}`
const trapMutexFixCode = `// ✅ 修复 4：锁的持有范围最小化 + 锁中不等待 channel
func trapDeadlockFix() {
    done := make(chan struct{})
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        defer wg.Done()
        mu.Lock()              // 锁内只做纯内存操作
        mu.Unlock()            // 立刻释放，不等待任何 channel
        close(done)            // 释放锁后再同步
    }()
    <-done                     // 同步走 channel，不与锁纠缠
    // 口诀：锁中无等待、无 channel、无网络调用
}`
const pprofSetupCode = `// Step 1: 注册 pprof 路由（副作用 import，_ 前缀）
import (
    "net/http"
    _ "net/http/pprof" // 空导入：触发注册 /debug/pprof 处理器
)

// main 里任选一个 goroutine 启动 HTTP 服务
go func() {
    // 只对内网监听，别暴露公网（pprof 信息很敏感）
    log.Println(http.ListenAndServe("localhost:6060", nil))
}()`
const pprofCmdCode = `# 方式 A：网页/curl 直接看全量堆栈（每条 goroutine + 阻塞时长）
curl -s "http://localhost:6060/debug/pprof/goroutine?debug=1" | head -100
#   输出里找这类行：
#   goroutine 42 [chan send, 15 minutes]:
#       main.leakWorker() at leak.go:32
#       created by main.main at leak.go:20
#   → 看到 "15 minutes" 就是泄漏铁证

# 方式 B：交互式分析（top 看谁阻塞最多）
go tool pprof http://localhost:6060/debug/pprof/goroutine
# 交互提示符里：
#   (pprof) top         → 占用最多的 goroutine 栈
#   (pprof) list main.leakWorker  → 看具体行号
#   (pprof) web         → 浏览器出火焰图`
const goleakTestMainCode = `// Step 3: TestMain 一劳永逸地守门
// 安装: go get go.uber.org/goleak
package leaky

import (
    "testing"

    "go.uber.org/goleak"
)

func TestMain(m *testing.M) {
    // 跑完所有测试后调用：
    // 1) 对比前后 goroutine 快照
    // 2) 有新增 → 打印堆栈 + 返回失败码 → go test 标红
    goleak.VerifyTestMain(m)
}

func TestWorker(t *testing.T) {
    startWorker()
    // 忘记关闭 worker 的话——
    // goleak 会在 TestMain 收尾时抓到并标红
}`
const sendRecvRuleCode = `// ✅ 黄金搭档 1：发送方 close，接收方 for-range 自动退出
func producer(out chan<- int) {
    defer close(out)           // 发送方负责 close
    for i := 0; i < 10; i++ {
        out <- i
    }
}
// 接收方 for-range：channel 一 close，循环立即结束
for v := range ch {
    fmt.Println(v)             // 输出: 0 1 2 ... 9
}

// ✅ 黄金搭档 2：需要取消 → select + <-ctx.Done()
for {
    select {
    case v := <-jobs:
        handle(v)
    case <-ctx.Done():         // 收到取消 → 退出，不泄漏
        return
    }
}`
</script>
