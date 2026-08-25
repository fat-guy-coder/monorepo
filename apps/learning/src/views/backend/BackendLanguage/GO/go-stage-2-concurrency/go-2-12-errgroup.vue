<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🪢 errgroup 并发错误组</h1><p class="text-sm text-slate-500 mt-1">WaitGroup 的升级版——同时等多个 goroutine + 传错误 + 自动取消</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-12-errgroup.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-12</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：errgroup 扇出任务 · 聚合错误 · 出错即取消</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">main 把 N 个任务 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">g.Go(fn)</code> 交给 <strong>errgroup.Group</strong>，它并行启动这些 goroutine。<strong>错误传播</strong>——任意一个返回 error → <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Wait()</code> 返回第一个 error；<strong>自动取消</strong>（WithContext）——出错 → ctx 取消广播 → 其他 goroutine 收到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-ctx.Done()</code> 提前退出；<strong>并发控制</strong>——<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">SetLimit(N)</code> 限制同时运行的 goroutine 数。</p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 352" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="eg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="eg-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>

            <!-- 标题 -->
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">errgroup — 扇出任务 · 聚合错误 · 出错即取消</text>

            <!-- main goroutine -->
            <rect x="260" y="36" width="200" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="360" y="56" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#1e293b">main goroutine</text>
            <text x="360" y="78" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#475569">g := errgroup.Group{}</text>
            <text x="360" y="96" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#475569">g.Go(task1..3)</text>
            <text x="360" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f766e">err := g.Wait()</text>

            <!-- errgroup.Group -->
            <rect x="260" y="148" width="200" height="64" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="360" y="166" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">errgroup.Group</text>
            <text x="360" y="188" text-anchor="middle" dominant-baseline="central" font-size="10.5" font-family="monospace" fill="#0369a1">错误传播 · WithContext · SetLimit</text>

            <!-- 3 个 goroutine（G1 完成 / G2 出错 / G3 被取消） -->
            <rect x="50" y="250" width="170" height="56" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="135" y="272" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">G1 · fetch(url1)</text>
            <text x="135" y="292" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">return nil ✅ 完成</text>

            <rect x="275" y="250" width="170" height="56" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2" />
            <text x="360" y="272" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">G2 · fetch(url2)</text>
            <text x="360" y="292" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#dc2626">return err ⚠️ 出错</text>

            <rect x="500" y="250" width="170" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="585" y="272" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">G3 · fetch(url3)</text>
            <text x="585" y="292" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#d97706">&lt;-ctx.Done() 提前退出</text>

            <!-- 扇出：main → Group → 3 个 goroutine -->
            <line x1="360" y1="128" x2="360" y2="148" stroke="#94a3b8" stroke-width="2" marker-end="url(#eg-arr)" />
            <text x="368" y="140" font-size="9.5" font-family="monospace" fill="#64748b">提交任务</text>
            <line x1="360" y1="212" x2="135" y2="250" stroke="#94a3b8" stroke-width="2" marker-end="url(#eg-arr)" />
            <line x1="360" y1="212" x2="360" y2="250" stroke="#94a3b8" stroke-width="2" marker-end="url(#eg-arr)" />
            <line x1="360" y1="212" x2="585" y2="250" stroke="#94a3b8" stroke-width="2" marker-end="url(#eg-arr)" />
            <text x="375" y="228" font-size="10.5" font-family="monospace" font-weight="bold" fill="#64748b">Go(fn) 启动</text>

            <!-- 取消传播：G2 出错 → cancel → G3 收到 <-ctx.Done() -->
            <line x1="275" y1="278" x2="220" y2="278" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#eg-red)" />
            <line x1="445" y1="278" x2="500" y2="278" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#eg-red)" />
            <text x="472" y="266" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="#dc2626">cancel() → &lt;-ctx.Done()</text>

            <!-- Wait 聚合 -->
            <line x1="135" y1="306" x2="135" y2="316" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#eg-arr)" />
            <line x1="360" y1="306" x2="360" y2="316" stroke="#ef4444" stroke-width="2.5" marker-end="url(#eg-red)" />
            <line x1="585" y1="306" x2="585" y2="316" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#eg-arr)" />
            <rect x="40" y="316" width="640" height="32" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="360" y="332" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">err := g.Wait() → 等全部返回，拿到第一个 error（G2 的）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：errgroup 结构——main 派发 3 个任务，Group 并行启动 G1/G2/G3；G2 出错 → 自动取消 ctx → G3 收到 <code>&lt;-ctx.Done()</code> 提前退出（G1 已正常完成）；<code>Wait()</code> 聚合所有返回，取第一个 error</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>WaitGroup 做不到的三件事 — errgroup 全做成</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">WaitGroup 只能等——不知道哪个 goroutine 出错了，不能取消其他 goroutine，也不能控制并发数。<strong>errgroup 解决这三个痛点：</strong>① <strong>错误传播</strong>——任意 goroutine 返回 error→Wait() 返回第一个 error；② <strong>自动取消</strong>——WithContext 版本下，出错时 context 取消→其他 goroutine 收到信号提前退出；③ <strong>并发控制</strong>——SetLimit 限制同时运行的 goroutine 数。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>errgroup ≈ <strong>Promise.all() 的 fail-fast 模式</strong>——一个 reject 就整体失败。如果要"收集所有结果不管成败"，需要用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.allSettled()</code>——errgroup 默认是 fail-fast。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="errgroup_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>WithContext — 一个出错，全取消</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">如果你要并发请求 3 个微服务，其中 1 个返回错误——剩下 2 个还在白费力气等响应（浪费资源）。WithContext 返回一个带 context 的 Group：任何一个 goroutine 返回 error→context 自动 cancel→其他 goroutine 里的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-ctx.Done()</code> 立即返回→它们可以提前退出。</p>
        <div class="mb-4"><Code language="go" :code="withCtxCode" title="errgroup_withctx.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>SetLimit — 内置并发限流</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">有 1000 个 URL 要爬，但你不想同时启动 1000 个 goroutine 把网络打爆。SetLimit(N) 确保同时只有 N 个 goroutine 在运行——其余排队等。这比手动实现 Worker Pool + channel 简洁得多。</p>
        <div class="mb-4"><Code language="go" :code="limitCode" title="errgroup_limit.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>errgroup vs WaitGroup 速查</h2>
        <table class="w-full text-sm border-collapse mb-3">
          <thead>
            <tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border font-semibold">特性</th>
              <th class="px-4 py-2 border font-semibold">WaitGroup</th>
              <th class="px-4 py-2 border font-semibold">errgroup</th>
            </tr>
          </thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border">错误传播</td><td class="px-4 py-2 border">❌ 自己收集</td><td class="px-4 py-2 border text-emerald-600">✅ 返回第一个 error</td></tr>
            <tr><td class="px-4 py-2 border">取消其他 goroutine</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅ WithContext</td></tr>
            <tr><td class="px-4 py-2 border">并发控制</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅ SetLimit (1.21+)</td></tr>
            <tr><td class="px-4 py-2 border">标准库</td><td class="px-4 py-2 border text-emerald-600">✅ sync</td><td class="px-4 py-2 border">⚠️ golang.org/x/sync</td></tr>
            <tr><td class="px-4 py-2 border">Go 类型</td><td class="px-4 py-2 border">结构体</td><td class="px-4 py-2 border">结构体</td></tr>
          </tbody>
        </table>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 什么时候用 WaitGroup？</strong>简单的"等所有完成后继续"——不需要错误处理，不需要取消。一旦涉及<strong>错误</strong>或<strong>取消</strong>——直接上 errgroup。这个包虽然不在标准库，但 Go 官方维护（golang.org/x），生产环境大量使用。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>执行流程拆解 — errgroup fail-fast 错误传播全链路</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">光看 API 不够，得在脑子里把代码「跑」一遍。下面用贯穿全文的场景推演：<strong>main 并发请求 3 个上游服务 url1 / url2 / url3，其中 url2 返回了 500 错误</strong>——看看 errgroup 从派发任务到返回错误，中间每一步发生了什么。</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>派发任务</strong>：main 创建 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">g := errgroup.Group{}</code>，然后连续调用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">g.Go(fn1)</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">g.Go(fn2)</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">g.Go(fn3)</code>，每个 fn 对应一个上游请求。</li>
          <li><strong>Go 内部做了什么</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">g.Go(fn)</code> 把 fn 包进一个 goroutine 并启动，同时内部计数器 +1（等价于 WaitGroup 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Add(1)</code>）。此时 G1、G2、G3 三个 goroutine 并行跑起来。</li>
          <li><strong>G2 出错</strong>：fn2 请求 url2 收到 500 → 返回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">error</code>。errgroup 内部用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sync.Once</code> 只记录<strong>第一个</strong> error——后续错误全部忽略。</li>
          <li><strong>触发取消</strong>（WithContext 版本）：errgroup 内部拿到第一个 error 后立即调用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">cancel()</code>，整个 context 树被取消广播。</li>
          <li><strong>其余 goroutine 提前退出</strong>：G3 正在等 url3 响应，它监听的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">&lt;-ctx.Done()</code> 立即就绪 → G3 返回退出，不再傻等。G1 若已正常完成则返回 nil。</li>
          <li><strong>Wait 聚合</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">g.Wait()</code> 内部 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">wg.Wait()</code> 阻塞到计数器归零（所有 goroutine 都退出），然后返回记录的第一个 error。</li>
          <li><strong>main 拿到结果</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">err != nil</code> → 整体失败（url2 挂了），main 做日志 / 兜底 / 降级处理。</li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-blue-800"><strong>💡 关键点：</strong>步骤 5 成立的前提是任务函数<strong>真的监听了 ctx</strong>——<code class="bg-blue-100 px-1 rounded text-xs font-mono">select { case &lt;-ctx.Done(): ... }</code>。如果任务里只闷头 <code class="bg-blue-100 px-1 rounded text-xs font-mono">http.Get</code> 而不看 ctx，取消信号发了也白发，那个 goroutine 依然会等满超时。下面代码演示了这个「响应取消」的写法。</p></aside>
        <div class="mb-4"><Code language="go" :code="flowCode" title="errgroup_flow.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>前端类比 — Promise.all / allSettled / errgroup 对照</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">如果你写过 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Promise.all</code> 处理并发请求，那么 errgroup 的所有行为你都已经会了——只是换了个语法。核心记忆点：<strong>errgroup ≈ Promise.all 的 fail-fast</strong>。下面三列对照帮你快速迁移。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/><strong>Promise.all 失败即整体 reject</strong> ≈ <strong>errgroup.WithContext 失败即整体返回错误并取消</strong>——都是 fail-fast；<strong>Promise.allSettled 等全部 settle 再汇总</strong> ≈ 你需要「收集全部错误」时改用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">go.uber.org/errgroup</code>（见第 9 节）。<br/><strong>Promise</strong> 一旦启动无法被外部取消，<strong>errgroup</strong> 却能靠 context 取消还在运行的 goroutine——这是并发模型比 Promise 更强的一处。</p></aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Promise.all</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Promise.allSettled</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">errgroup (WithContext)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">失败时行为</td><td class="px-4 py-2 border border-slate-200">立即 reject，整体失败</td><td class="px-4 py-2 border border-slate-200">不 reject，等全部 settle</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">返回第一个 error，整体失败</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">拿第一个错误还是全部</td><td class="px-4 py-2 border border-slate-200">第一个 reject 的 reason</td><td class="px-4 py-2 border border-slate-200">全部结果（含 fulfilled/rejected）</td><td class="px-4 py-2 border border-slate-200">第一个 error（其余被丢弃）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">能否取消其他任务</td><td class="px-4 py-2 border border-slate-200">❌ 无法取消已开始的 promise</td><td class="px-4 py-2 border border-slate-200">❌ 无法取消</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅ ctx 自动取消其他 goroutine</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">返回结果形态</td><td class="px-4 py-2 border border-slate-200">全部成功的 value 数组</td><td class="px-4 py-2 border border-slate-200">每个 promise 的 {status, value/reason}</td><td class="px-4 py-2 border border-slate-200">只返回 error（nil = 全部成功）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">典型场景</td><td class="px-4 py-2 border border-slate-200">失败即停</td><td class="px-4 py-2 border border-slate-200">全部跑完再汇总</td><td class="px-4 py-2 border border-slate-200">失败即停 + 取消浪费的资源</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>想要 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">Promise.all</code> 的行为 → 用标准 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">x/sync/errgroup</code>；想要 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">allSettled</code> 的行为 → 用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go.uber.org/errgroup</code> 收集全部错误。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>常见错误与陷阱 — 5 个必踩的坑</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">errgroup 用起来只有几个 API，但踩坑率极高——下面的坑按「出现频率」排序，前两个几乎人人中招。</p>

        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 坑 ①：忘了 import errgroup —— 它不是标准库！</strong>errgroup 在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">golang.org/x/sync/errgroup</code>，需要先 <code class="bg-amber-100 px-1 rounded text-xs font-mono">go get</code>，否则编译直接报 <code class="bg-amber-100 px-1 rounded text-xs font-mono">undefined: errgroup</code>。</p></aside>
          <Code language="go" :code="pitImportCode" title="pit_import.go" :hiddenToolbar="true" />
        </div>

        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 坑 ②：g.Go 里循环变量闭包陷阱</strong>Go 1.22 之前，<code class="bg-amber-100 px-1 rounded text-xs font-mono">for _, url := range urls</code> 里的 url 每轮共享同一个变量——所有 goroutine 可能读到<strong>最后一个</strong> url。必须 <code class="bg-amber-100 px-1 rounded text-xs font-mono">url := url</code> 拷贝一份。</p></aside>
          <Code language="go" :code="pitClosureCode" title="pit_closure.go" :hiddenToolbar="true" />
        </div>

        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 坑 ③：复制 errgroup.Group</strong>和 <code class="bg-amber-100 px-1 rounded text-xs font-mono">sync.WaitGroup</code> 一样，Group 内部有计数器，按值拷贝会把状态拷贝飞——<code class="bg-amber-100 px-1 rounded text-xs font-mono">go vet</code> 会直接报错。传参用指针。</p></aside>
          <Code language="go" :code="pitCopyCode" title="pit_copy.go" :hiddenToolbar="true" />
        </div>

        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 坑 ④：Wait 之后复用 WithContext 的 ctx</strong>fail-fast 是有副作用的——出过错的 group，其 ctx 在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Wait()</code> 返回时可能已被 cancel。拿它去做后续请求，大概率立刻收到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">context canceled</code>。别复用，重新派生。</p></aside>
          <Code language="go" :code="pitCtxCode" title="pit_ctx.go" :hiddenToolbar="true" />
        </div>

        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 坑 ⑤：误解 SetLimit 的语义</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">SetLimit(3)</code> 只限制「同时运行」数，超出的任务<strong>排队等待</strong>而不是报错——全部任务最后都会执行完，只是并发上限是 3。</p></aside>
          <Code language="go" :code="pitLimitCode" title="pit_limit.go" :hiddenToolbar="true" />
        </div>
      </section>

      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>生产实战 — 并发请求上游 API，任一失败整体取消</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">把前面所有特性组合成一个真实 handler：<strong>带超时 context</strong>（5 秒内必须全部完成）+ <strong>SetLimit 限流</strong>（同时最多 5 个上游请求）+ <strong>重试一次</strong>（扛住网络抖动）。这是典型的 BFF / 网关层聚合接口写法。</p>
        <div class="mb-4"><Code language="go" :code="prodCode" title="errgroup_prod.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-blue-800"><strong>💡 生产要点：</strong>① <strong>超时也走 ctx 链路</strong>——外层的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">context.WithTimeout</code> 一旦到点，errgroup 派生出的 ctx 同样被取消，剩余任务全部提前退出，不会挂死；② <code class="bg-blue-100 px-1 rounded text-xs font-mono">results[i]</code> 每个任务写自己的专属槽位，天然无并发写冲突，不用加锁；③ 用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">fmt.Errorf("fetch %s: %w", url, err)</code> 包装错误，配合 <code class="bg-blue-100 px-1 rounded text-xs font-mono">errors.Is</code> / <code class="bg-blue-100 px-1 rounded text-xs font-mono">errors.As</code> 在调用方能精细判断错误类型。</p></aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这个 handler 约等于 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.all(urls.map(u =&gt; fetchWithTimeout(u, 5000)))</code> 外面再包一层 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.race</code>——任一 reject 整体失败，其余请求被取消，资源不空耗。</p></aside>
      </section>

      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>反模式与经验法则 — 什么时候用 errgroup</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">errgroup 不是万能并发工具——选错场景反而更别扭。下面是三条经验法则 + 常见反模式。</p>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-emerald-800"><strong>✅ 只需「等全部完成」、不需要错误/取消 → 用 WaitGroup（标准库）</strong>任务只返回 nil、也不关心谁出错，用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">sync.WaitGroup</code> 最简洁——少一个依赖、API 更简单。</p></aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-emerald-800"><strong>✅ 需要「收集全部错误」而非第一个 → 用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go.uber.org/errgroup</code></strong>标准 errgroup 只返回第一个 error（其余被 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">sync.Once</code> 丢弃）。批处理 / 健康检查希望「尽量全部跑完，最后汇总所有失败」时，用 Uber 的 fork——它的 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">Wait()</code> 聚合全部错误。</p></aside>
        <div class="mb-4"><Code language="go" :code="antiUberCode" title="errgroup_uber.go" :hiddenToolbar="true" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-emerald-800"><strong>✅ 需要「任一失败就整体取消」→ 用标准 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">errgroup.WithContext</code></strong>这正是第 2 节、第 5 节讲的场景——扇出多个请求，一个挂掉就取消剩余，别让资源白耗。这是 errgroup 的<strong>主场</strong>。</p></aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>❌ 反模式（别这么写）：</strong><br/>① 调了 <code class="bg-amber-100 px-1 rounded text-xs font-mono">g.Go</code> 却不检查 <code class="bg-amber-100 px-1 rounded text-xs font-mono">g.Wait()</code> 的返回值——错误全部静默丢失，等于白用；<br/>② 任务函数里不监听 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&lt;-ctx.Done()</code>——WithContext 的取消失效，失败后剩余任务照样跑满超时；<br/>③ 在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Wait()</code> 之后复用它的 ctx 做后续请求——大概率拿到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">context canceled</code>（就是坑 ④）；<br/>④ 明明只是「并行跑一堆不关心结果的任务」却硬套 errgroup——用 WaitGroup 更直接。</p></aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>🎯 小结：</strong>errgroup = <strong>WaitGroup + 错误传播 + 自动取消 + 可选限流</strong>。一句话选型——<em>并发等结果、失败要上报 → errgroup；要失败即取消 → WithContext；要限流 → SetLimit；要收集所有失败 → go.uber.org/errgroup；什么都不关心 → WaitGroup。</em></p></aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-11-sync-pool" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：sync.Pool</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-13-goroutine-leak" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：goroutine 泄漏 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"errgroup 基础"},{id:"sec-2",name:"WithContext"},{id:"sec-3",name:"SetLimit"},{id:"sec-4",name:"选型速查"},{id:"sec-5",name:"执行流程拆解"},{id:"sec-6",name:"前端类比 Promise"},{id:"sec-7",name:"常见错误与陷阱"},{id:"sec-8",name:"生产实战"},{id:"sec-9",name:"反模式与经验法则"}]
const basicCode = `import "golang.org/x/sync/errgroup"

// errgroup = WaitGroup + 错误传播
var g errgroup.Group
urls := []string{"url1", "url2", "url3"}
for _, url := range urls {
    url := url
    g.Go(func() error {
        resp, err := http.Get(url)
        if err != nil { return err }  // 👈 返回错误！WaitGroup 做不到
        defer resp.Body.Close()
        return process(resp)
    })
}
if err := g.Wait(); err != nil {  // 返回第一个 error
    log.Fatal("至少一个请求失败:", err)
}
fmt.Println("所有请求成功")`
const withCtxCode = `// WithContext — 一个出错 → 所有 goroutine 收到取消
g, ctx := errgroup.WithContext(context.Background())

g.Go(func() error {
    return fetchWithCtx(ctx, "url1")  // ctx 出错时被 cancel
})
g.Go(func() error {
    return fetchWithCtx(ctx, "url2")
})
// url1 返回 error → ctx 自动 cancel
// → url2 里的 <-ctx.Done() 立即返回 → url2 提前退出（不再傻等）
// → g.Wait() 返回 url1 的 error`
const limitCode = `// SetLimit: 最多同时 3 个 goroutine（Go 1.21+）
g := new(errgroup.Group)
g.SetLimit(3)  // 内置并发限流——不需要额外 pool 代码
for _, url := range hugeURLList {
    url := url
    g.Go(func() error {
        return fetch(url)  // 1000 个 URL，但同时只有 3 个在执行
    })
}
g.Wait()
// 等价于:
// sema := make(chan struct{}, 3) + WaitGroup + error collection
// 但 errgroup 三行搞定`
const flowCode = `// 关键：每个任务都要响应 <-ctx.Done()，fail-fast 才真正生效
g, ctx := errgroup.WithContext(context.Background())

for _, url := range []string{"url1", "url2", "url3"} {
    url := url
    g.Go(func() error {
        select {
        case <-ctx.Done():
            // 有兄弟任务出错 → ctx 被 cancel → 这里立即返回，不再发请求
            return ctx.Err()
        default:
            // ctx 还活着，正常发起请求
            resp, err := http.Get(url)
            if err != nil {
                // 👈 场景：url2 请求失败，G2 走到这一行
                return fmt.Errorf("fetch %s: %w", url, err)
            }
            defer resp.Body.Close()
            return nil
        }
    })
}

// 场景推演：url2 失败
// ① G2 return error → errgroup 内部立即 cancel()
// ② G3 的 <-ctx.Done() 变为就绪 → G3 提前退出（不再傻等 url3）
// ③ G1 若已成功则正常返回 nil
// ④ g.Wait() 等全部 goroutine 退出后，返回第一个 error:
err := g.Wait()
if err != nil {
    log.Printf("整体失败: %v", err)  // 输出: fetch url2: Get "url2": ... 500
}`
const pitImportCode = `// 先安装：go get golang.org/x/sync/errgroup
// ❌ 只 import 了 sync（标准库），没有 errgroup
import "sync"

var g errgroup.Group // ❌ 编译报错: undefined: errgroup

// ✅ 正确姿势：import 路径是 golang.org/x/sync/errgroup
import "golang.org/x/sync/errgroup"`
const pitClosureCode = `// ❌ Go 1.22 之前：循环变量共享，所有 goroutine 读到同一个 url
for _, url := range urls {
    g.Go(func() error { return fetch(url) })
}
// 结果：3 个 goroutine 可能全部请求最后一个 url

// ✅ 修复（Go 1.22 之前）：拷贝到局部变量，每个迭代一份
for _, url := range urls {
    url := url
    g.Go(func() error { return fetch(url) })
}

// Go 1.22+：for 循环变量每次迭代重新声明，不再需要这一行`
const pitCopyCode = `// ❌ 按值传参 = 拷贝 Group（和 sync.WaitGroup 一样禁止拷贝）
func addTask(g errgroup.Group) {  // 参数是值 → 内部拷贝
    g.Go(func() error { return nil })
}
// go vet 会报:
// copy of value containing errgroup.Group passed as func argument

// ✅ 用指针
func addTask(g *errgroup.Group) {
    g.Go(func() error { return nil })
}`
const pitCtxCode = `g, ctx := errgroup.WithContext(context.Background())
// ... 跑一堆任务 ...
err := g.Wait() // 返回了 error → 说明期间 cancel() 被调用过

// ❌ 坑：Wait 之后复用这个 ctx 做后续请求 → 立即 ctx canceled
fetchWithCtx(ctx, "后续请求") // 大概率马上返回 "context canceled"

// ✅ 对：重新基于 Background 派生新 context，别用旧的
newCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
fetchWithCtx(newCtx, "后续请求")`
const pitLimitCode = `g := new(errgroup.Group)
g.SetLimit(3) // 同时最多 3 个 goroutine

for i := 0; i < 10; i++ {
    i := i
    g.Go(func() error {
        // 第 4~10 个任务在这里排队等待，不是报错！
        return work(i)
    })
}
err := g.Wait() // 全部 10 个都会执行完，只是并发最多 3
// 若每个 work(i) 耗时 1s → 总耗时约 ceil(10/3)=4s，而不是 10s`
const prodCode = `// handler：并发请求多个上游 API —— 任一失败整体返回错误并取消剩余
// 特点：带超时 context + SetLimit 限流 + 重试一次
func fetchAll(ctx context.Context, urls []string) ([]string, error) {
    // ① 总超时：5 秒内必须全部完成（防挂死）
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel() // 兜底：函数返回时释放，防止 ctx 泄漏

    // ② WithContext：任一失败 → 自动 cancel 其余任务
    g, ctx := errgroup.WithContext(ctx)
    g.SetLimit(5) // ③ 限流：同时最多 5 个上游请求

    results := make([]string, len(urls))

    for i, url := range urls {
        i, url := i, url // 循环变量拷贝（Go 1.22 前必需，防闭包陷阱）
        g.Go(func() error {
            // ④ 每步先查 ctx：父级已出错/超时 → 立即退出，不发新请求
            select {
            case <-ctx.Done():
                return ctx.Err()
            default:
            }

            // ⑤ 请求上游，失败重试一次
            data, err := fetchWithRetry(ctx, url)
            if err != nil {
                // ⑥ 包装错误上下文，方便排查是哪个 url 挂了
                return fmt.Errorf("fetch %s: %w", url, err)
            }
            results[i] = data // 每个任务写自己专属槽位，无并发写冲突
            return nil
        })
    }

    // ⑦ 任一失败 → Wait() 返回第一个 error；ctx 已自动取消剩余任务
    if err := g.Wait(); err != nil {
        return nil, err
    }
    return results, nil
}

// 重试一次：网络抖动最常见，重试能显著提高成功率
func fetchWithRetry(ctx context.Context, url string) (string, error) {
    data, err := doHTTP(ctx, url)
    if err == nil {
        return data, nil
    }
    select {
    case <-ctx.Done():
        return "", ctx.Err() // 父级已取消/超时，不再重试
    case <-time.After(100 * time.Millisecond):
        return doHTTP(ctx, url) // 等 100ms 重试一次
    }
}`
const antiUberCode = `// 需要"收集全部错误"而非第一个 → go.uber.org/errgroup
// go get go.uber.org/errgroup
g, ctx := errgroup.WithContext(ctx) // 来自 go.uber.org/errgroup

for _, url := range urls {
    url := url
    g.Go(func() error {
        return fetch(ctx, url) // 每个失败都被收集，不会被第一个中断
    })
}

err := g.Wait()
// 这里返回的不是"第一个 error"，而是聚合了所有失败的多错误对象
// 适合：批处理/健康检查，希望尽量全部跑完，最后汇总所有失败`
</script>
