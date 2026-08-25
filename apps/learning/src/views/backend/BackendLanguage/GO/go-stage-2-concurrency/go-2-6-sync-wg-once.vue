<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🧩 WaitGroup / Once / Cond</h1><p class="text-sm text-slate-500 mt-1">goroutine 同步三件套 — 像等所有人到齐再开会、像全局初始化只做一次</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-6-sync-wg-once.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />
      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：WaitGroup 计数信号量</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">WaitGroup 内部是一个 <strong>int64 原子计数器 + 信号量（sema）</strong>。Add 增加计数，Done 减少计数（Add(-1)），Wait 阻塞直到计数归零——最后一个 Done 把计数减到 0 时，<strong>同时唤醒所有排队的 goroutine</strong>。</p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="wg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 计数器 -->
            <text x="16" y="30" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">计数器 counter = 3（还有 3 个 goroutine 未完成）</text>
            <rect x="300" y="44" width="120" height="60" rx="10" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
            <text x="360" y="74" text-anchor="middle" dominant-baseline="central" font-size="28" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>

            <!-- Add / Done 操作 -->
            <text x="16" y="120" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">Add(n)：计数 +n（goroutine 启动前）</text>
            <rect x="30" y="132" width="130" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="95" y="152" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">wg.Add(3)</text>
            <line x1="160" y1="152" x2="290" y2="90" stroke="#06b6d4" stroke-width="2" marker-end="url(#wg-arr)" />

            <text x="250" y="120" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">Done()：计数 -1（goroutine 完成时）</text>
            <rect x="260" y="132" width="130" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="325" y="152" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">wg.Done() ×3</text>
            <line x1="325" y1="132" x2="345" y2="106" stroke="#f59e0b" stroke-width="2" marker-end="url(#wg-arr)" />

            <!-- Wait 唤醒 -->
            <text x="470" y="30" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">Wait()：阻塞直到计数 = 0</text>
            <rect x="480" y="44" width="180" height="60" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="570" y="74" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">wg.Wait()</text>
            <text x="570" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">计数=0 时唤醒</text>
            <line x1="420" y1="74" x2="475" y2="74" stroke="#94a3b8" stroke-width="2" marker-end="url(#wg-arr)" />

            <text x="16" y="196" font-size="11" font-family="monospace" fill="#0891b2">Done 到 0 → sema 信号量释放 → 所有 Wait 排队的 goroutine 同时被唤醒（广播）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：WaitGroup 计数信号量——Add 加计数、Done 减计数、Wait 阻塞到计数归零后同时唤醒所有等待者</figcaption>
        </figure>
      </section>
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>sync.WaitGroup — "等大家干完活再继续"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你启动 5 个 goroutine 去并发下载文件，主 goroutine 需要<strong>等它们全完成</strong>才能继续。WaitGroup 就是干这个的——内部是一个<strong>计数器</strong>：Add(n) 加计数，Done() 减计数，Wait() 阻塞直到计数归零。</p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">底层实现：一个 int64 原子计数器 + 一个<strong>信号量</strong>（sema）。Wait 时如果计数 &gt; 0 → goroutine 排队挂在信号量上。最后一个 Done 把计数减到 0 → <strong>同时唤醒所有排队的 goroutine</strong>。所以 WaitGroup 可以<strong>复用</strong>——Wait 返回后可以重新 Add。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>WaitGroup ≈ <strong>Promise.all()</strong>——等所有任务完成再继续。但区别在于 Go 的 goroutine 没有"返回值"——数据通过 channel 或共享变量传递。</p></aside>
        <div class="mb-4"><Code language="go" :code="wgCode" title="waitgroup.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 三条铁律：</strong>① <strong>Add 必须在 goroutine 外</strong>——否则可能 Wait 在 Add 前返回。② <strong>Done = Add(-1)</strong>——两种写法等价。③ <strong>不能复制 WaitGroup</strong>——传参用指针。④ WaitGroup 可以<strong>复用</strong>——Wait 返回后可以重新 Add。</p></aside>
      </section>
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>WaitGroup + errgroup — 错误传播版 WaitGroup</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">WaitGroup 只管"等"，不管"有没有出错"。如果 goroutine 里返回了 error，WaitGroup 无法传递。这时候用 <strong>errgroup</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">golang.org/x/sync/errgroup</code>）——它和 WaitGroup 用法一样，但能收集第一个错误并取消其他 goroutine。</p>
        <div class="mb-4"><Code language="go" :code="errgroupCode" title="errgroup.go" /></div>
      </section>
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>sync.Once — "不管来多少人，只做一次"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">数据库连接、配置加载、全局初始化……这些操作<strong>只需要做一次</strong>，即使 100 个 goroutine 同时请求。Once 保证传入的函数<strong>全局只执行一次</strong>——第一个 goroutine 执行函数，其他全部阻塞等待完成。</p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">内部实现：<strong>Mutex + atomic 标志位</strong>。Do 先 atomic 检查 done 标志——如果已完成，直接返回（快路径，无锁）；如果未完成，拿 Mutex 再检查一次（双重检查锁定 Double-Checked Locking），执行函数，完成后 atomic 设 done=1。</p>
        <div class="mb-4"><Code language="go" :code="onceCode" title="once.go" /></div>
      </section>
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>sync.Cond — "条件满足了通知我"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">生产者-消费者场景中，消费者要等"队列不为空"才能消费。如果用 for+sleep 轮询 → 浪费 CPU。Cond 让 goroutine <strong>睡着等</strong>，条件满足时<strong>被唤醒</strong>。Wait 会自动释放锁并挂起，Signal 唤醒一个等待者，Broadcast 唤醒全部。</p>
        <div class="mb-4"><Code language="go" :code="condCode" title="cond.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 多数场景用 channel 更简洁。</strong>只有当你需要配合 Mutex 保护复杂状态时才需要 Cond。面试中问到 Cond 时记住：Wait 必须用 for（防虚假唤醒），Signal=唤醒一个，Broadcast=唤醒所有。</p></aside>
      </section>
      <!-- 🔄 执行流程拆解 -->
      <section id="sec-flow" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔄</span>执行流程拆解：在脑子里把代码跑一遍</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">这一节把 WaitGroup 和 sync.Once 的<strong>运行时行为</strong>逐步拆开——面试官最爱问"底层怎么实现的"，读完你就能把每一步讲清楚。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">① WaitGroup 完整工作流：计数 3→2→1→0 的广播</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-6 text-sm leading-relaxed">
          <li>主 goroutine 调 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">wg.Add(3)</code> —— 原子计数器从 0 → 3，记录"还有 3 个任务未完成"。</li>
          <li>启动 3 个 goroutine，每个内部第一行写 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">defer wg.Done()</code>（Done 等价 Add(-1)），defer 保证一定会减一。</li>
          <li>主 goroutine 调 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">wg.Wait()</code>：此刻计数器=3 ≠ 0 → <strong>阻塞</strong>，把自己挂到内部信号量（sema）的等待队列上。</li>
          <li>三个 goroutine 各自完成：goroutine 1 的 Done → 计数 3→2；goroutine 2 的 Done → 2→1；goroutine 3 的 Done → <strong>1→0</strong>。</li>
          <li><strong>最后一个 Done 把计数减到 0</strong> → 信号量释放 → <strong>广播</strong>唤醒所有 Wait 排队的 goroutine（同时全部，不是逐个）。</li>
          <li><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Wait()</code> 返回，主 goroutine 继续执行；此时计数已归零，WaitGroup <strong>可复用</strong>——重新 Add 进入下一轮。</li>
        </ol>
        <h3 class="text-base font-semibold text-slate-700 mb-3">② sync.Once 双重检查锁定（Double-Checked Locking）</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>goroutine A 调用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">once.Do(f)</code> → 先 <strong>atomic.Load</strong> 读 done 标志（无锁，O(1) 快路径判断）。</li>
          <li>读到 done=0（从未执行过）→ 走<strong>慢路径</strong>：获取 Mutex 锁（若被占用则阻塞等待）。</li>
          <li>拿到锁后 <strong>再检查一次 done</strong>（这就是"双重检查"：防止 A 等锁期间别的 goroutine 已完成）——仍为 0 → 进入临界区。</li>
          <li>执行函数 f——此刻只有 A 在临界区里，其余调用方都在等锁。</li>
          <li>f 返回后，Once 内部用 <strong>defer</strong> 保证 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Store(done=1)</code> <strong>一定执行</strong>——哪怕 f 里 panic。</li>
          <li>解锁，Do 返回。</li>
          <li>后续 goroutine B/C/D 调用 Do → atomic.Load 读到 done=1 → <strong>直接返回</strong>（快路径，无锁无阻塞，开销≈一次原子读）。</li>
          <li>对比：<strong>没有双重检查</strong>的话，A 持锁期间 B/C/D 全都在锁上串行排队；双重检查让"已完成"后的调用永远走无锁快路径。</li>
        </ol>
      </section>
      <!-- ⚠️ 常见错误与陷阱 -->
      <section id="sec-pitfalls" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误与陷阱</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">这五个坑是面试和线上事故的高发区。每个坑都配了错误写法和正确写法——记住"错在哪"比"怎么用"更能避免踩坑。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">坑 1：Add 放在 goroutine 内部（经典竞态）</h3>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 竞态：</strong>如果 <code class="font-mono">Add(1)</code> 写在 goroutine 里，主 goroutine 的 <code class="font-mono">Wait()</code> 可能在任何 Add 执行前就检查计数器——此刻计数还是 0 → <code class="font-mono">Wait()</code> 立即返回，等于<strong>根本没等</strong>。</p></aside>
        <div class="mb-6"><Code language="go" :code="pitfallAddCode" title="pitfall-add-inside.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">坑 2：复制 WaitGroup / Once（go vet 报 copylocks）</h3>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ copylocks：</strong>WaitGroup / Once / Mutex 内部有<strong>不能复制的状态</strong>（原子计数器、内部锁）。按值传参等于复制一份，主 goroutine 的计数器根本没被改到。<code class="font-mono">go vet</code> 会直接报错，<code class="font-mono">go build</code> 却放行——所以 CI 里一定要跑 vet。</p></aside>
        <div class="mb-6"><Code language="go" :code="pitfallCopyCode" title="pitfall-copylocks.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">坑 3：Done() 调得比 Add 多 → panic: negative WaitGroup counter</h3>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ panic：</strong>Done 每调一次计数减 1，减到负数直接 <code class="font-mono">panic: sync: negative WaitGroup counter</code>。给 Add 传负数（如 <code class="font-mono">wg.Add(-5)</code>）同样 panic。确保 Done 的次数 ≤ Add 的次数。</p></aside>
        <div class="mb-6"><Code language="go" :code="pitfallPanicCode" title="pitfall-negative-counter.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">坑 4：Once.Do 内的函数 panic → done 标志已置位，不会重试</h3>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 不重试：</strong>Once 内部用 defer 把 done 置位，<strong>即使函数 panic，标志也已经写 1</strong>。后续所有 Do 调用都走快路径直接返回，初始化函数<strong>永远不会再执行</strong>。想重试只能在 Do 内 recover，或换一个全新的 Once。</p></aside>
        <div class="mb-4"><Code language="go" :code="pitfallOncePanicCode" title="pitfall-once-panic.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">坑 5：以为 goroutine 会等 main——没 Wait 直接退出，打印全被跳过</h3>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 静默丢输出：</strong>goroutine 是异步的，<code class="font-mono">go func()</code> 只是把任务丢给调度器，<strong>main 不等它们</strong>。main 一 return 程序就退出，所有没跑完的 goroutine 被直接杀掉——连打印都没机会执行。这正是「为什么要用 WaitGroup」的根源：<strong>main 不会等你，你得主动等它</strong>。</p></aside>
        <div class="mb-6"><Code language="go" :code="pitfallMainExitCode" title="pitfall-main-exit.go" /></div>
      </section>
      <!-- 🧭 反模式与经验法则 -->
      <section id="sec-anti" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🧭</span>反模式与经验法则：什么时候用什么</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">同步原语不止一个，选错工具会让代码又慢又难读。下面这张表是"选型指南"。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">选谁</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">原因</th></tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">只等全部完成，不关心结果/错误</td><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">WaitGroup</td><td class="px-4 py-2 border border-slate-200">计数语义最直观</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">goroutine 之间要传数据/结果</td><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">channel</td><td class="px-4 py-2 border border-slate-200">goroutine 是生产者/消费者，靠通道交接数据</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">需要错误传播 + 第一个出错就取消</td><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">errgroup</td><td class="px-4 py-2 border border-slate-200">g.Wait() 返回第一个 error</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">要限制并发数 / 限流</td><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">信号量 channel / errgroup.SetLimit</td><td class="px-4 py-2 border border-slate-200">有界并发，不会一次全开</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>① <strong>Add 与 Wait 必须配对</strong>——在同一个 goroutine 里先 Add 再 go，Done 永远用 defer。② 只拿 WaitGroup 等"完成"，数据交换交给 channel，错误传播交给 errgroup。③ Once 做<strong>懒加载单例</strong>（按需只一次）；init() 做<strong>程序启动时</strong>的一次性初始化。④ Cond 只在"配合 Mutex 保护复杂共享状态"时才用，否则 channel 更简洁。</p></aside>
        <aside class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-red-800"><strong>❌ 反模式：</strong>① 用 WaitGroup 传数据（共享变量 + 手动加锁 → 该用 channel）。② 用 WaitGroup 做限流——<code class="font-mono">for i:=0;i&lt;1000;i++ { wg.Add(1); go work() }</code> 一口气开 1000 个 goroutine → 该用有界信号量。③ 滥用 Cond（一个 Signal 就够的队列通知用 channel 更好）。④ 把重量级初始化塞进 init() 但其实根本没用到 → 浪费启动时间，该用 Once 懒加载。</p></aside>
        <div class="bg-slate-50 rounded-xl p-4 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>sync.Once vs 包级 init()——都是"只执行一次"，但时机完全不同：</strong></p>
          <ul class="space-y-2 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>init()</strong>：程序启动时（main 执行前）<em>自动</em>执行，<strong>无论你是否需要它</strong>。适合：环境检查、注册表、静态配置。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Once.Do</strong>：<strong>懒加载</strong>，第一次真正调用时才执行。适合：数据库连接、重量级初始化——用不到就不执行。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>粒度</strong>：init 是包级的（一个包可有多个 init，按声明顺序执行）；Once 是变量级的，一个 struct 可以配多个 Once 管不同资源。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>共同点</strong>：两者 panic 后都不会重试——init 崩溃程序直接挂；Once 崩溃后 done 已置位，需换新 Once。</span></li>
          </ul>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 单例两种写法：</strong>饿汉式（包级变量直接初始化，等价 init）→ <code class="font-mono">var instance = &amp;DB{}</code>；懒加载（Once）→ <code class="font-mono">once.Do(func(){ instance = connect() })</code>。线上服务一般用<strong>懒加载 + 连接池</strong>（见下一节），启动快、按需建连。</p></aside>
      </section>
      <!-- 🏭 生产实战 -->
      <section id="sec-prod" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🏭</span>生产实战：就绪屏障 + 并发限流 + 关门模式</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">两个真实场景，把 WaitGroup 和 channel 组合起来用。至于 Once 的"连接池懒加载单例"，前面 sec-3 的 onceCode 就是完整范例。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">实战 1：等所有 worker「就绪」再开跑（channel + WaitGroup 组合）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">多 worker 服务启动时，通常要等每个 worker 都<strong>加载完配置、建好连接</strong>才统一开始派活。做法：每个 worker 就绪后向 ready 通道发一个空信号，主 goroutine <code class="font-mono">for 循环收 N 次</code> 精确等待，再用 <code class="font-mono">close(start)</code> <strong>广播开跑信号</strong>。</p>
        <div class="mb-6"><Code language="go" :code="readyWorkersCode" title="ready-barrier.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">实战 2：限制并发数的信号量（WaitGroup + buffered channel）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">海量任务不能一口气全开 goroutine（内存/连接会爆）。用<strong>容量为 N 的 buffered channel 当信号量</strong>：拿 <code class="font-mono">sem &lt;- struct{}{}</code>，放回 <code class="font-mono">&lt;-sem</code>，任意时刻最多 N 个 goroutine 在跑。</p>
        <div class="mb-4"><Code language="go" :code="semaphoreCode" title="semaphore-limit.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">实战 3：等所有发送者干完再关 channel（WaitGroup「关门」模式）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">生产-消费是 channel 最经典的场景：N 个 goroutine 往 channel 塞数据，主 goroutine <code class="font-mono">for v := range ch</code> 收。但 <strong>close 只能由发送方、且在确认没人再发之后调用</strong>——否则迟到的 <code class="font-mono">ch &lt;- v</code> 直接 <code class="font-mono">panic: send on closed channel</code>。所以用一个 WaitGroup 数发送者，在<strong>单独的「关门 goroutine」</strong>里 <code class="font-mono">wg.Wait()</code> 后再 close：</p>
        <div class="mb-4"><Code language="go" :code="closeSendersCode" title="close-senders.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>main 启动 N 个发送者，每个 <code class="font-mono">defer wg.Done()</code>——Done 只能由发送者自己调（「我发完了」），接收方别去调</li>
          <li>main 再启动「关门 goroutine」，它 <code class="font-mono">wg.Wait()</code> 阻塞到所有发送者完成</li>
          <li>计数归零 → 关门 goroutine 才执行 <code class="font-mono">close(ch)</code>——此刻<strong>绝无发送者</strong>，安全</li>
          <li>main 在 <code class="font-mono">range</code> 里收，收到「关闭 + 排空」信号后自动退出</li>
        </ol>
      </section>
      <!-- 🔗 前端类比 -->
      <section id="sec-analogy" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔗</span>前端类比：翻译成 JS 心智模型</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 WaitGroup ≈ Promise.all()</strong><br/><code class="font-mono">wg.Wait()</code> 等价 <code class="font-mono">await Promise.all(tasks)</code>——等所有任务完成再继续。区别：goroutine 没有返回值，数据靠 channel/共享变量传；JS 的 Promise 天生带着 resolve 出来的值。想"广播开跑信号"时，WaitGroup + close(channel) ≈ <code class="font-mono">Promise.resolve()</code> 后大家一起继续。</p></aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 sync.Once ≈ JS 惰性单例 / module cache</strong><br/><code class="font-mono">let db; export async function getDb() { db ??= await createDb(); return db; }</code>——第一次调用才初始化，后续直接返回缓存：这就是 <code class="font-mono">once.Do(初始化)</code>。而 Go 的<strong>包级 init() ≈ ES module 的 module cache</strong>：整个模块只加载/执行一次，后续 import 直接复用缓存。</p></aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 sync.Cond ≈ EventEmitter 的通知机制</strong><br/><code class="font-mono">cond.Signal()</code> ≈ <code class="font-mono">emitter.emit('wake')</code>（唤醒一个）；<code class="font-mono">cond.Broadcast()</code> ≈ <code class="font-mono">emitter.emit('wake')</code>（唤醒所有）；<code class="font-mono">cond.Wait()</code> ≈ <code class="font-mono">await new Promise(res =&gt; emitter.once('wake', res))</code>。但 Cond 要配 Mutex 还要 while 循环防虚假唤醒；JS 单线程没有数据竞争，用 Promise/EventEmitter 通知更省心——这也是 Go 里"多数场景用 channel 替代 Cond"的原因。</p></aside>
      </section>
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>WaitGroup</strong> = 等所有 goroutine 完成。Add 在 goroutine 外，Done 在 defer，计数归零广播唤醒所有 Wait</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>errgroup</strong> = WaitGroup + 错误传播 + 自动取消（详见 go-2-12）</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Once</strong> = 只做一次（双重检查锁定：atomic 快路径 + Mutex 慢路径 + 锁内再检查）。Do 中 panic → Once 认为已完成，不重试</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Cond</strong> = 条件变量。Wait 用 for 防虚假唤醒。多数场景 channel 更简洁</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型</strong>：等完成用 WaitGroup，传数据用 channel，错误传播用 errgroup，限流用信号量，懒加载单例用 Once</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Mutex</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Atomic →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [
  {id:"sec-overview",name:"📐 结构总览"},
  {id:"sec-1",name:"WaitGroup"},
  {id:"sec-2",name:"WaitGroup+errgroup"},
  {id:"sec-3",name:"sync.Once"},
  {id:"sec-4",name:"sync.Cond"},
  {id:"sec-flow",name:"🔄 执行流程拆解"},
  {id:"sec-pitfalls",name:"⚠️ 常见错误与陷阱"},
  {id:"sec-anti",name:"🧭 反模式与经验法则"},
  {id:"sec-prod",name:"🏭 生产实战"},
  {id:"sec-analogy",name:"🔗 前端类比"},
  {id:"sec-5",name:"小结"},
]
const wgCode = `var wg sync.WaitGroup
for i := 1; i <= 5; i++ {
    wg.Add(1)  // ⚠️ 必须在 goroutine 外！
    go func(id int) {
        defer wg.Done()  // 等价 wg.Add(-1)，defer 保证一定执行
        // 模拟工作...
        fmt.Printf("worker %d done\\n", id)
    }(i)  // 传参——避免闭包陷阱
}
wg.Wait()  // 阻塞直到计数器归零
fmt.Println("all workers done")
// 输出（顺序随机）:
// worker 3 done
// worker 1 done
// worker 5 done
// worker 2 done
// worker 4 done
// all workers done

// WaitGroup 可以复用！
wg.Add(2)
go func() { defer wg.Done(); fmt.Println("round 2: A") }()
go func() { defer wg.Done(); fmt.Println("round 2: B") }()
wg.Wait()
// 输出: round 2: A, round 2: B`
const errgroupCode = `// errgroup = WaitGroup + 错误传播（需要 import "golang.org/x/sync/errgroup"）
var g errgroup.Group
urls := []string{"url1", "url2", "url3"}
for _, url := range urls {
    url := url
    g.Go(func() error {  // Go 替代 go func，返回 error
        resp, err := http.Get(url)
        if err != nil { return err }  // 出错→Wait 返回这个 error
        defer resp.Body.Close()
        return process(resp)
    })
}
if err := g.Wait(); err != nil {
    log.Fatal("至少一个 goroutine 失败:", err)
}
fmt.Println("所有请求成功")
// 区别：Wait() 返回第一个错误（不是最后）`
const onceCode = `var once sync.Once
var instance *DB

func GetDB() *DB {
    once.Do(func() {     // 双检锁——只有第一次需要 Lock
        instance = connectDB(dsn)
        fmt.Println("DB 连接建立（全局只打印一次）")
    })
    return instance
}
// 100 个 goroutine 同时调用 GetDB():
// 只有第一个会执行 connectDB，其余 99 个在 Do 内部阻塞等待
// 等第一个完成后，其余 99 个直接拿到 instance（atomic 快路径）
// 输出: "DB 连接建立（全局只打印一次）"（只有一条！）

// ⚠️ 如果 Do 中的函数 panic，Once 不会重试——done 标志已设置
// 需要重试的话：在 Do 内部 recover，或创建新 Once`
const condCode = `var mu sync.Mutex
cond := sync.NewCond(&mu)
queue := make([]int, 0)  // 共享队列

// 消费者——等队列非空
go func() {
    mu.Lock()
    for len(queue) == 0 {  // ⚠️ 必须 for（防虚假唤醒）
        cond.Wait()         // Wait 自动释放锁+挂起，被唤醒后重新拿锁
    }
    item := queue[0]; queue = queue[1:]
    fmt.Println("consumed:", item)
    mu.Unlock()
}()

// 生产者——往队列放数据后通知
time.Sleep(time.Second)
mu.Lock()
queue = append(queue, 42)
mu.Unlock()
cond.Signal()  // 唤醒一个等待者（Broadcast 唤醒所有）
// 输出: consumed: 42`
const pitfallAddCode = `// ❌ 错误写法：Add 写在 goroutine 内部 —— 经典竞态
var wg sync.WaitGroup
go func() {
    wg.Add(1)      // 太晚了！主 goroutine 可能已经检查完计数器
    defer wg.Done()
    doWork()
}()
wg.Wait()          // 此刻计数器=0 → Wait 立即返回，等于没等！
fmt.Println("任务完成")  // 可能 worker 还没开始跑
// 竞态：Wait 有可能在 Add 执行之前就检查计数器并返回

// ✅ 正确写法：Add 必须在 go 语句之前
var wg2 sync.WaitGroup
wg2.Add(1)
go func() {
    defer wg2.Done()
    doWork()
}()
wg2.Wait()  // 计数器=1，会等到 Done 后才返回`
const pitfallCopyCode = `// ❌ 错误：值传递会复制 WaitGroup —— go vet 直接报 copylocks
func spawn(wg sync.WaitGroup) {  // 复制了一份！内部 state 被拷贝
    defer wg.Done()
    fmt.Println("work")
}
// 主 goroutine 的 wg 计数没变 → Wait 提前返回

// ✅ 正确：传指针
func spawn(wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Println("work")
}

var wg sync.WaitGroup
wg.Add(1)
go spawn(&wg)  // 传地址，操作同一个计数器
wg.Wait()
// 同理：sync.Once、sync.Mutex 都不能被复制`
const pitfallPanicCode = `var wg sync.WaitGroup
wg.Add(1)  // 计数 = 1
go func() {
    defer wg.Done()  // 计数 1 → 0 ✅
    defer wg.Done()  // ❌ 计数 0 → -1 → panic！
}()
wg.Wait()
// panic: sync: negative WaitGroup counter
// Done 不能比 Add 多！Add 传负数（如 wg.Add(-5)）同样会 panic
// 建议：Done 只用一次，且用 defer 保证一定调用`
const pitfallOncePanicCode = `var once sync.Once
once.Do(func() {
    panic("初始化失败")  // ❌ panic 了
})
// Once 内部用 defer 置 done=1 —— 即使 panic，标志也已被设置
once.Do(func() {
    fmt.Println("这段永远不会执行")  // 快路径直接返回
})

// ✅ 修复方案：在 Do 内 recover，或换一个全新的 Once
var once2 sync.Once
once2.Do(func() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("初始化失败，已记录:", r)
            // 想要重试只能换新 Once（once2 的 done 已置位）
        }
    }()
    initDB()  // 可能 panic
})`
const readyWorkersCode = `// 场景：启动 N 个 worker，等它们全部「就绪」（配置加载完、连接建好）再统一开跑
const workers = 4
ready := make(chan struct{}, workers)  // 就绪通道：worker 就绪时发一个空信号
start := make(chan struct{})           // 开始通道：close 后广播「开跑」
var wg sync.WaitGroup

for i := 1; i <= workers; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        loadConfig()                  // 模拟加载配置 / 建立连接
        fmt.Printf("worker %d 就绪\\n", id)
        ready <- struct{}{}           // 报告就绪（缓冲够，不会阻塞）
        <-start                       // 阻塞等待「开跑」信号
        fmt.Printf("worker %d 开始干活\\n", id)
    }(i)
}
for i := 1; i <= workers; i++ { <-ready }  // 主 goroutine 精确收 N 次就绪信号
fmt.Println("所有 worker 已就绪，发出开始信号")
close(start)  // 广播：所有等 start 的 goroutine 同时被唤醒
wg.Wait()     // 等全部 worker 干完
fmt.Println("全部 worker 完成")
// 输出（就绪顺序随机，先凑齐 N 条才发开始信号）:
// worker 2 就绪 / worker 1 就绪 / worker 4 就绪 / worker 3 就绪
// 所有 worker 已就绪，发出开始信号
// worker 3 开始干活 / ...（开跑顺序随机）
// 全部 worker 完成`
const semaphoreCode = `// 场景：一共 10 个任务，但最多同时 3 个 goroutine 在跑（并发限流）
const total = 10
const maxConcurrent = 3
sem := make(chan struct{}, maxConcurrent)  // 信号量：容量 3 的通道
var wg sync.WaitGroup

for i := 1; i <= total; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        sem <- struct{}{}         // 拿信号量：容量满则阻塞排队
        defer func() { <-sem }()  // 释放信号量
        fmt.Printf("处理任务 %d\\n", id)
        time.Sleep(100 * time.Millisecond)  // 模拟耗时
    }(i)
}
wg.Wait()
fmt.Println("全部任务完成，峰值并发 = 3")
// 任意时刻最多 3 个 goroutine 在执行；任务完成后并发自动回收`
const pitfallMainExitCode = `// ❌ 错误写法：启动 goroutine 后 main 直接结束——程序退出，打印全被跳过
nums := []int{1, 2, 3}
for i := range nums {
    go func(c int) {
        fmt.Println("序号", c) // 可能根本没机会执行！
    }(i)
}
// main 到这里就 return 了 → 进程退出，所有 goroutine 被强制终止

// ✅ 正确写法：wg.Wait() 等它们跑完再退出
var wg sync.WaitGroup
for i := range nums {
    wg.Add(1)
    go func(c int) {
        defer wg.Done()
        fmt.Println("序号", c)
    }(i)
}
wg.Wait() // main 在这里等，全部打印完才退出`
const closeSendersCode = `// 生产-消费：N 个发送者发数据，接收方 range 收。
// 关键：close 必须在「确认没人再发」之后 → wg.Wait() 后再关。
const n = 3
ch := make(chan int, n) // 缓冲容量 = 发送者数，发送不阻塞
var wg sync.WaitGroup

for i := range n {
    wg.Add(1)
    go func(c int) {
        defer wg.Done() // 发送者自己报告「我发完了」
        ch <- c
    }(i)
}

go func() { // 「关门 goroutine」：等所有发送者干完再关
    wg.Wait()
    close(ch) // ★此刻绝无发送者，安全
}()

for v := range ch { // 收到 0/1/2（顺序不定），通道关闭 + 排空后自动退出
    fmt.Println(v)
}
// 输出（顺序随机）:
// 0
// 1
// 2`
</script>
