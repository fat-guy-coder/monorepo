<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🛑 优雅停机</h1>
          <p class="text-sm text-slate-500 mt-1">Graceful Shutdown——不丢请求、不断连接，K8s 滚动更新的命根子</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-14-graceful-shutdown.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-14</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：优雅停机时序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          优雅停机的核心是<strong>把"立刻死"变成"慢慢退"</strong>：收到停止信号后，
          <strong>先关上新的大门</strong>（停止接收新连接），<strong>再让屋子里的人把事干完</strong>（在途请求处理完），
          <strong>最后等所有后台协程收尾</strong>，才真正退出。整个过程由一个<strong>带超时的 context</strong> 兜底——万一有人赖着不走，超时就强制清理，不会无限等待。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="gs-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="gs-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
            </defs>

            <!-- 信号源 -->
            <rect x="250" y="14" width="220" height="46" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="360" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">① 信号源</text>
            <text x="360" y="48" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#b45309">K8s 滚动更新发 SIGTERM / 手动 Ctrl+C(os.Interrupt)</text>

            <line x1="360" y1="60" x2="360" y2="88" stroke="#94a3b8" stroke-width="2" marker-end="url(#gs-arr)" />

            <!-- 五个阶段 -->
            <!-- ② 停止接收 -->
            <rect x="14" y="90" width="130" height="80" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="79" y="106" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">② 停止接收新连接</text>
            <text x="79" y="128" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">先关 Listener，</text>
            <text x="79" y="142" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">新连接一律拒绝</text>
            <text x="79" y="158" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">（不再有新请求进来）</text>

            <!-- ③ 在途请求完成 -->
            <rect x="152" y="90" width="130" height="80" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="217" y="106" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">③ 在途请求处理完</text>
            <text x="217" y="128" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">已经进来的请求</text>
            <text x="217" y="142" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">逐个正常返回 200</text>
            <text x="217" y="158" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">Shutdown(ctx) 阻塞等待</text>

            <!-- ④ 等后台 goroutine -->
            <rect x="290" y="90" width="130" height="80" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="355" y="106" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">④ 等后台 goroutine</text>
            <text x="355" y="128" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#075985">关链接/刷缓存/存日志</text>
            <text x="355" y="142" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#075985">WaitGroup.Wait()</text>
            <text x="355" y="158" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#075985">context 取消信号同步</text>

            <!-- ⑤ 超时强杀 -->
            <rect x="428" y="90" width="130" height="80" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="493" y="106" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">⑤ 超时强杀（兜底）</text>
            <text x="493" y="128" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#991b1b">10s 超时到了还没排空</text>
            <text x="493" y="142" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#991b1b">Shutdown 返回 ctx.Err()</text>
            <text x="493" y="158" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#991b1b">强制 Close 剩余连接</text>

            <!-- ⑥ 退出 -->
            <rect x="566" y="90" width="130" height="80" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" />
            <text x="631" y="106" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#475569">⑥ 进程退出</text>
            <text x="631" y="128" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">main 函数 return</text>
            <text x="631" y="142" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">进程正常结束</text>

            <!-- 箭头 -->
            <line x1="144" y1="130" x2="152" y2="130" stroke="#94a3b8" stroke-width="2" marker-end="url(#gs-arr)" />
            <line x1="282" y1="130" x2="290" y2="130" stroke="#94a3b8" stroke-width="2" marker-end="url(#gs-arr)" />
            <line x1="420" y1="130" x2="428" y2="130" stroke="#94a3b8" stroke-width="2" marker-end="url(#gs-red)" />
            <line x1="558" y1="130" x2="566" y2="130" stroke="#94a3b8" stroke-width="2" marker-end="url(#gs-arr)" />

            <!-- 说明 -->
            <text x="360" y="192" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">正常流量会在 ③④ 就排空退出；只有请求跑得比 10s 超时还久，才会触发 ⑤ 强杀</text>

            <!-- 排空过程示意 -->
            <text x="14" y="222" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">排空过程示意（请求在途时停机）：</text>
            <rect x="180" y="238" width="360" height="72" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="200" y="254" font-size="10" font-family="monospace" font-weight="bold" fill="#b45309">HTTP Server（排空中）</text>
            <!-- 在途请求 -->
            <rect x="200" y="266" width="90" height="26" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="245" y="279" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0f172a">req-1 ✓</text>
            <rect x="302" y="266" width="90" height="26" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="347" y="279" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0f172a">req-2 ✓</text>
            <rect x="404" y="266" width="90" height="26" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="1" />
            <text x="449" y="279" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0f172a">req-3 处理中</text>
            <!-- 新连接被拒 -->
            <text x="120" y="264" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ef4444">✗ 新连接被拒</text>
            <line x1="168" y1="232" x2="182" y2="248" stroke="#ef4444" stroke-width="2" />
            <line x1="150" y1="248" x2="136" y2="232" stroke="#ef4444" stroke-width="2" />

            <text x="14" y="330" font-size="10" font-family="monospace" fill="#64748b">关键：第 ② 步立即关掉"入口"，第 ③ 步用带 10s 超时的 ctx 兜底——绝不无限等，也绝不立刻杀</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：优雅停机时序——信号 → 停收新连接 → 排空在途请求 → 等后台协程 → （超时才强杀）→ 退出。绿色是正常路径，红色是超时兜底</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么需要优雅停机 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要优雅停机 — 不优雅的下场
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          想象 K8s 滚动更新：它先启动新 Pod，然后给旧 Pod 发 <strong>SIGTERM</strong>，默认等 30 秒（terminationGracePeriodSeconds）。
          如果你的服务收到信号就 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">os.Exit(0)</code> 或直接 return——
          <strong>正在处理的请求会被拦腰斩断</strong>：用户看到 502/连接重置、写了一半的订单没入库、支付回调没落库。
          发布越频繁（一天多次），丢的请求越多，这就是"发布即事故"的根源。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>不丢请求</strong>：已经进来的请求必须走完（订单、支付、写库），否则就是真金白银的损失。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>资源清理</strong>：数据库连接池、WebSocket 连接、消息队列订阅要优雅关闭，别让上游还在往一个死掉的 Pod 发数据。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>配合负载均衡</strong>：K8s 滚动更新的顺序是——先摘流量（Service 去掉该 Pod），再发 SIGTERM。优雅停机让"摘流量"和"进程退出"之间平滑过渡，实现<strong>零停机发布</strong>。</div>
          </li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          优雅停机 ≈ 前端部署时 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">beforeunload</code>/<code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">navigator.sendBeacon</code> 上报埋点——页面要关之前先把数据送出去；
          也 ≈ Node 里 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">process.on('SIGTERM', async () => { await server.close(); await cleanup(); process.exit(0) })</code>——
          <strong>收到停止信号后处理完手头的活再退出</strong>，而不是被直接 kill 掉。<br/>
          K8s 发 SIGTERM 后等 30s 的场景，就是 Node 里 shutdown hook 等所有清理完成的同款套路。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 先看反面教材：</strong>直接 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">http.ListenAndServe()</code> 的 main，Ctrl+C 会立刻把进程杀掉——
          Go 默认不会帮你等请求结束。不写优雅停机的服务，发布一次就丢一批请求。</p>
        </aside>
      </section>

      <!-- 2. 信号监听 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          signal.NotifyContext / signal.Notify — 监听停止信号
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          优雅停机的第一步是<strong>感知"要停了"</strong>。操作系统用信号通知进程：
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">SIGINT</code>（Ctrl+C）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">SIGTERM</code>（K8s/Docker 发）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">SIGHUP</code>（终端挂断）。
          Go 里两种写法：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">signal.Notify</code> 把信号接进一个 channel；
          <strong><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">signal.NotifyContext</code></strong> 更进一步，把信号直接变成 <strong>context 取消</strong>——
          所有用这个 context 的 goroutine 会一起收到取消信号，一次广播搞定全局停机。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">🔔 signal.Notify — channel 风格</h4>
            <Code language="go" :code="notifyCode" title="signal_notify.go" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">✅ signal.NotifyContext — context 风格（推荐）</h4>
            <Code language="go" :code="notifyCtxCode" title="signal_notify_context.go" />
          </div>
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">信号</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">来源</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 常量</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">SIGINT</td><td class="px-4 py-2 border border-slate-200">终端 Ctrl+C</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">os.Interrupt</td><td class="px-4 py-2 border border-slate-200">本地调试最常见</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">SIGTERM</td><td class="px-4 py-2 border border-slate-200">K8s / Docker / systemd</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">syscall.SIGTERM</td><td class="px-4 py-2 border border-slate-200"><strong>生产环境主角</strong>，必须监听</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">SIGHUP</td><td class="px-4 py-2 border border-slate-200">终端挂断 / 配置重载约定</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">syscall.SIGHUP</td><td class="px-4 py-2 border border-slate-200">常被用来触发配置热更新</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 3. Shutdown(ctx) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          http.Server.Shutdown(ctx) — 优雅关停 HTTP 服务
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">srv.Shutdown(ctx)</code> 做的事非常精确：
          <strong>① 立即关闭 Listener</strong>（不再 accept 新连接）；<strong>② 等待所有活跃连接的处理结束</strong>（等 handler 写完响应）；
          <strong>③ 如果 ctx 到期还没排空，直接返回 ctx 错误</strong>——这时你还有机会调用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">srv.Close()</code> 强制关闭剩余连接。
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">ctx</code> 就是"我愿意等多久"的承诺书——通常是 <strong>10s 或 30s</strong>。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>关 Listener</strong>：立刻停止 accept，新连接在 TCP 层面被拒绝（配合负载均衡摘流量，用户无感）。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>等活跃连接</strong>：正在处理的请求继续跑，写完响应才断开；空闲连接直接关掉。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>ctx 兜底</strong>：超时返回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ctx.Err()</code>（DeadlineExceeded），随后 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">srv.Close()</code> 强制断开剩余连接——绝不无限等。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="fullCode" title="graceful.go — 完整优雅停机（生产模板）" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：ctx 要新建，不要直接用 signal ctx。</strong>signal 的 ctx 是"没有超时的取消"——
          一旦信号触发它立刻 Done，用它给 Shutdown 当超时 ctx，等于"无限等待"或"立刻中断"都失控。
          <strong>永远用 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">context.WithTimeout(context.Background(), 10*time.Second)</code> 单独造一个带期限的 ctx 给 Shutdown。</strong></p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：ListenAndServe 不返回错误。</strong>shutdown 之后 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">ListenAndServe</code> 会返回 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">http.ErrServerClosed</code>——
          这不是真正的错误，别 log.Fatal 它。很多新手在关停时把这条"假错误"当成崩溃处理。</p>
        </aside>
      </section>

      <!-- 4. WaitGroup -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          WaitGroup 等待后台 goroutine — 只关 HTTP 还不够
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个服务不只有 HTTP handler，还有后台 goroutine：定时清理任务、消息队列消费者、指标上报、WebSocket hub。
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Shutdown</code> 只管 HTTP——<strong>其他 goroutine 需要你手动等</strong>。
          做法：每个后台任务持有 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">signal ctx</code>，收到信号后自己退出；
          主流程用 <strong>sync.WaitGroup</strong> 计数，等所有任务 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Done()</code> 才真正返回。
        </p>

        <div class="mb-4"><Code language="go" :code="wgCode" title="wg_cleanup.go — 后台任务收尾" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>context 取消 + WaitGroup ≈ 前端的 <strong>AbortController</strong> 信号 + <strong>Promise.all</strong>：
          一个 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">abortController.abort()</code> 能同时取消一批 fetch（对应 context 广播），
          <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">Promise.all</code> 等所有 Promise 结束（对应 WaitGroup.Wait）。
          都是"一个信号，全局配合，全部收尾后才算完"。
          </p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常见错误与反模式
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">❌ 错误 1：完全不做优雅停机</h3>
        <div class="mb-4"><Code language="go" :code="bad1Code" title="bad_1.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">❌ 错误 2：用 signal ctx 当 Shutdown 的超时 ctx</h3>
        <div class="mb-4"><Code language="go" :code="bad2Code" title="bad_2.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">❌ 错误 3：漏掉后台 goroutine / 超时设成 0</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>只等 HTTP 不等后台任务 → 消息队列消费者被强杀，消息丢失。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">context.WithTimeout(ctx, 0)</code> → 立即超时，等于没排空就强杀。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>超时设 2 分钟 → K8s 只等 30s 就 SIGKILL，白等还拖慢发布节奏。超时要比 K8s 的 terminationGracePeriod 短。</span></li>
        </ul>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>① 超时时间 < 容器 terminationGracePeriod（K8s 里通常是 30s，设置到 10~20s）；② Shutdown 失败返回后主动 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">srv.Close()</code> 收尾；③ 后台任务统一监听 signal ctx 退出；④ 停机前后打日志，方便排查"发布时是否丢请求"；⑤ 数据库连接池也要 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">db.Close()</code>。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：在途请求排空
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          先「启动服务」产生几个在途请求，观察它们推进；中途点「发送 SIGTERM」——
          服务从<strong>接受</strong>切换为<strong>排空</strong>：<strong>绿色请求继续走完</strong>，此时再来新请求会被<strong>红 X 拒绝</strong>。
          右上角倒计时是 10s 超时兜底。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 在途请求: {{ inflight }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📥 已完成: {{ completed }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">❌ 被拒: {{ rejected }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '空闲——服务未启动' }}</span>
          <span v-if="state === 'draining'" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 停机倒计时: {{ timeLeft }}s</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="start" :disabled="busy || state !== 'idle'" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 启动服务</button>
          <button @click="addReq" :disabled="busy || (state !== 'accepting' && state !== 'draining')" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">＋ 新请求</button>
          <button @click="drain" :disabled="busy || state !== 'accepting'" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">📴 发送 SIGTERM</button>
          <button @click="resetViz" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>

        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 服务器盒子 -->
              <v-rect :config="serverRectCfg" />
              <v-text :config="serverLabelCfg" />
              <v-text :config="serverStateCfg" />
              <!-- 在途请求条 -->
              <template v-for="(r, i) in reqs" :key="r.id">
                <v-rect :config="reqBarCfg(r, i)" />
                <v-text :config="reqLabelCfg(r, i)" />
              </template>
              <!-- 被拒的 X -->
              <template v-for="x in rejs" :key="x.id">
                <v-line :config="xCrossCfg(x, 1)" />
                <v-line :config="xCrossCfg(x, 2)" />
                <v-text :config="xLabelCfg(x)" />
              </template>
              <!-- 底部时间轴 -->
              <v-rect :config="timelineBgCfg" />
              <v-text :config="timelinePhase(0)" />
              <v-text :config="timelinePhase(1)" />
              <v-text :config="timelinePhase(2)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">直接退出（暴力）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优雅停机</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">在途请求</td><td class="px-4 py-2 border border-slate-200 text-red-600">被拦腰斩断（502/连接重置）</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">全部正常返回</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">新连接</td><td class="px-4 py-2 border border-slate-200">无感知，突然全挂</td><td class="px-4 py-2 border border-slate-200">先停止接收，负载均衡已摘流量</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">后台任务</td><td class="px-4 py-2 border border-slate-200">被强杀，可能丢数据</td><td class="px-4 py-2 border border-slate-200">WaitGroup 等收尾</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">用户感知</td><td class="px-4 py-2 border border-slate-200">刷新就报错</td><td class="px-4 py-2 border border-slate-200">无感（零停机发布）</td></tr>
            </tbody>
          </table>
        </div>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>signal.NotifyContext</strong>：把 SIGTERM/os.Interrupt 变成 context 取消，全局广播停机</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>http.Server.Shutdown(ctx)</strong>：关 Listener + 等活跃请求，ctx 到期强杀兜底</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>WaitGroup + signal ctx</strong>：让后台 goroutine 也优雅退出，一个都不能漏</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>超时比 K8s terminationGracePeriod 短</strong>（10~20s），拒绝 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">ListenAndServe</code> 直接裸奔</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>http.ErrServerClosed 不是错误</strong>，别误当崩溃；停机日志要留痕</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-13-websocket" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：WebSocket</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-15-template-embed" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：模板与embed →</RouterLink>
      </nav>
    </footer>
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
  { id: "sec-1", name: "为什么需要优雅停机" },
  { id: "sec-2", name: "信号监听" },
  { id: "sec-3", name: "Shutdown(ctx)" },
  { id: "sec-4", name: "WaitGroup 收尾" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 在途请求排空动画 =====
const C = { cyan: '#06b6d4', green: '#4ade80', orange: '#f59e0b', red: '#ef4444', text: '#1e293b', muted: '#64748b', ghost: '#e2e8f0' }
const H = ref(280), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const state = ref<'idle' | 'accepting' | 'draining' | 'stopped'>('idle')
const completed = ref(0), rejected = ref(0)
const timeLeft = ref(10)
const nid = ref(100)
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GsReq { id: number; name: string; p: number; color: string; dead?: boolean; hold: number }
const reqs = reactive<GsReq[]>([])
const rejs = reactive<{ id: number; t: number }[]>([])
let timer: number | null = null
let drainT = 0

const inflight = computed(() => reqs.filter(r => !r.dead).length)
const stateLabel = computed(() => {
  if (state.value === 'accepting') return '接受中'
  if (state.value === 'draining') return '排空中'
  if (state.value === 'stopped') return '已退出'
  return '未启动'
})

function ensureTimer() { if (timer == null) timer = window.setInterval(tick, 40) }
function stopTimer() { if (timer != null) { clearInterval(timer); timer = null } }
function tick() {
  let active = false
  const done: number[] = []
  reqs.forEach(r => {
    if (r.dead) { r.hold--; active = true; if (r.hold <= 0) done.push(r.id); return }
    if (r.p < 1) { r.p = Math.min(1, r.p + 0.02); active = true } else { completed.value++; done.push(r.id) }
  })
  if (done.length) for (let i = reqs.length - 1; i >= 0; i--) { if (done.includes(reqs[i].id)) reqs.splice(i, 1) }
  rejs.forEach(r => { r.t++; active = true })
  for (let i = rejs.length - 1; i >= 0; i--) { if (rejs[i].t > 16) rejs.splice(i, 1) }

  if (state.value === 'draining') {
    active = true
    drainT += 40
    if (drainT >= 1000) { drainT = 0; timeLeft.value-- }
    if (timeLeft.value <= 0) {
      reqs.forEach(r => { if (!r.dead) { r.dead = true; r.hold = 12; r.color = C.red } })
      state.value = 'stopped'
      status.value = '⏰ 10s 超时到 → Shutdown 返回错误，强制 Close 剩余连接'
    } else if (reqs.length === 0) {
      state.value = 'stopped'
      status.value = '✅ 在途请求全部完成，零丢请求优雅退出'
    }
  }
  if (!active) stopTimer()
}

function start() {
  if (busy.value) return
  stopTimer(); reqs.length = 0; rejs.length = 0
  completed.value = 0; rejected.value = 0; timeLeft.value = 10; drainT = 0
  state.value = 'accepting'
  status.value = '服务启动：接受新请求，已有 3 个在途'
  for (let i = 0; i < 3; i++) pushReq()
  ensureTimer()
}

function pushReq() {
  const n = reqs.length + 1
  reqs.push({ id: nid.value++, name: 'req-' + n, p: 0.05, color: C.green, hold: 0 })
}

function addReq() {
  if (busy.value) return
  if (state.value === 'draining') { rejectNew(); return }
  if (state.value !== 'accepting') return
  pushReq()
  status.value = `新请求 req-${reqs.length} 进入处理`
  ensureTimer()
}

function rejectNew() {
  rejs.push({ id: nid.value++, t: 0 })
  rejected.value++
  status.value = '❌ 新连接被拒（Listener 已关闭）'
}

function drain() {
  if (state.value !== 'accepting' || busy.value) return
  state.value = 'draining'; drainT = 0; timeLeft.value = 10
  status.value = '📴 收到 SIGTERM：停止接收，正在排空在途请求…'
}

function resetViz() { stopTimer(); reqs.length = 0; rejs.length = 0; completed.value = 0; rejected.value = 0; state.value = 'idle'; status.value = '' }

const serverRectCfg = computed(() => {
  let fill = '#f1f5f9', stroke = '#94a3b8'
  if (state.value === 'accepting') { fill = '#dcfce7'; stroke = '#22c55e' }
  else if (state.value === 'draining') { fill = '#fef3c7'; stroke = '#f59e0b' }
  else if (state.value === 'stopped') { fill = '#fee2e2'; stroke = '#ef4444' }
  return { x: 210, y: 46, width: Math.max(40, W.value - 280), height: 150, fill, cornerRadius: 10, stroke, strokeWidth: 2 }
})
const serverLabelCfg = computed(() => ({ x: 210, y: 58, width: Math.max(40, W.value - 280), text: 'HTTP Server', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#1e293b', align: 'center' }))
const serverStateCfg = computed(() => ({ x: 210, y: 74, width: Math.max(40, W.value - 280), text: `状态：${stateLabel.value}`, fontSize: 11, fontFamily: 'monospace', fill: '#64748b', align: 'center' }))

function reqBarCfg(r: GsReq, i: number) {
  const y = 96 + i * 30
  const maxW = Math.max(40, W.value - 300)
  const w = Math.max(8, maxW * r.p)
  return { x: 226, y, width: w, height: 20, fill: r.color, cornerRadius: 4, opacity: r.dead ? 0.6 : 1 }
}
function reqLabelCfg(r: GsReq, i: number) {
  const y = 96 + i * 30
  const maxW = Math.max(40, W.value - 300)
  const w = Math.max(8, maxW * r.p)
  return { x: 226, y: y + 20, width: w, text: `${r.name} ${r.dead ? '被强杀' : Math.round(r.p * 100) + '%'}`, fontSize: 9, fontFamily: 'monospace', fill: r.dead ? C.red : C.muted, align: 'center' }
}

function xCrossCfg(x: { id: number; t: number }, which: number) {
  const cx = 120, cy = 150
  const s = 8
  const fade = Math.max(0, 1 - x.t / 16)
  if (which === 1) return { points: [cx - s, cy - s, cx + s, cy + s], stroke: C.red, strokeWidth: 3, opacity: fade }
  return { points: [cx - s, cy + s, cx + s, cy - s], stroke: C.red, strokeWidth: 3, opacity: fade }
}
function xLabelCfg(x: { id: number; t: number }) {
  const fade = Math.max(0, 1 - x.t / 16)
  return { x: 60, y: 170, width: 120, text: '✗ 新连接被拒', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: C.red, align: 'center', opacity: fade }
}

const timelineBgCfg = computed(() => ({ x: 210, y: 216, width: Math.max(40, W.value - 280), height: 8, fill: '#e2e8f0', cornerRadius: 4 }))
function timelinePhase(i: number) {
  const w = Math.max(40, W.value - 280)
  const labels = ['接受中', '排空中', '已退出']
  const color = state.value === 'accepting' ? '#22c55e' : state.value === 'draining' ? '#d97706' : '#ef4444'
  return { x: 210 + w / 6 + (i * w) / 3, y: 234, width: w / 3, text: labels[i], fontSize: 10, fontFamily: 'monospace', fill: i === (state.value === 'accepting' ? 0 : state.value === 'draining' ? 1 : 2) ? color : C.muted, align: 'center' }
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) { }
  finally { await d(200); busy.value = false }
}

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => { ro?.disconnect(); stopTimer() })

// ===== 代码示例 =====
const notifyCode = `// signal_notify.go — channel 风格：把信号接进 channel
func main() {
    // 只监听我们关心的信号（默认会监听所有？不——要显式列出）
    sigCh := make(chan os.Signal, 1)
    signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
    defer signal.Stop(sigCh)

    srv := &http.Server{Addr: ":8080"}

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    <-sigCh                    // 阻塞等待信号
    log.Println("收到退出信号，开始优雅停机…")
    // ...后续走 shutdown 流程
}
// 输出: 收到退出信号，开始优雅停机…`

const notifyCtxCode = `// signal_notify_context.go — context 风格：信号 = 全局取消（推荐）
func main() {
    // 一收到 SIGTERM/os.Interrupt，ctx 就取消；第二个返回的 stop() 用于反注册
    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer stop()

    srv := &http.Server{Addr: ":8080"}

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    <-ctx.Done()               // 信号到达 → ctx 取消 → 这里解除阻塞
    log.Println("signal ctx 已取消，开始优雅停机…")
    // 把这个 ctx 传给所有后台任务，它们也会一起退出
}
// 输出: signal ctx 已取消，开始优雅停机…`

const fullCode = `// graceful.go — 生产级优雅停机完整模板
package main

import (
    "context"
    "errors"
    "log"
    "net/http"
    "os"
    "os/signal"
    "sync"
    "syscall"
    "time"
)

func main() {
    // ① 监听信号 → 变成全局取消的 context
    ctx, stop := signal.NotifyContext(context.Background(),
        os.Interrupt, syscall.SIGTERM)
    defer stop()

    srv := &http.Server{Addr: ":8080", Handler: nil}

    // ② 服务在独立 goroutine 里启动
    go func() {
        if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
            log.Fatalf("listen: %v", err)
        }
    }()
    log.Println("服务已启动 :8080")

    // ③ 后台任务（模拟），用 signal ctx 退出 + WaitGroup 等待
    var wg sync.WaitGroup
    wg.Add(1)
    go backgroundTask(ctx, &wg)

    // ④ 等信号
    <-ctx.Done()
    log.Println("收到停止信号，开始优雅停机…")

    // ⑤ 带超时的 ctx——"我愿意等 10s"
    shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    if err := srv.Shutdown(shutdownCtx); err != nil {
        // 超时了！强制关闭剩余连接
        log.Printf("shutdown 超时: %v → 强制关闭", err)
        _ = srv.Close()
    }
    // 注意：ListenAndServe 返回 http.ErrServerClosed 是正常的，不算错误

    // ⑥ 等后台任务收尾（再给点缓冲）
    wg.Wait()
    log.Println("所有工作收尾完成，进程退出")
}
// 输出:
// 服务已启动 :8080
// 收到停止信号，开始优雅停机…
// 后台任务收到取消信号，正在收尾…
// 所有工作收尾完成，进程退出`

const wgCode = `// wg_cleanup.go — 后台任务 + WaitGroup + ctx 取消
func backgroundTask(ctx context.Context, wg *sync.WaitGroup) {
    defer wg.Done()
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()
    for {
        select {
        case <-ticker.C:
            // 定时清理、消费队列、上报指标...
            log.Println("后台任务跑一轮")
        case <-ctx.Done():
            log.Println("后台任务收到取消信号，正在收尾…")
            // 这里做最后的资源清理：关 db、flush 日志、确认消费位置
            time.Sleep(200 * time.Millisecond)
            return
        }
    }
}

// main 里最后一行 wg.Wait() 保证：后台任务真退出了，进程才退出
// 输出: 后台任务收到取消信号，正在收尾…`

const bad1Code = `// bad_1.go — ❌ 最典型的错误：不做任何停机处理
func main() {
    // Ctrl+C 一按，进程立刻被杀——
    // 正在处理的请求全部 502，后台任务直接消失
    log.Fatal(http.ListenAndServe(":8080", nil))
}
// 行为: 按 Ctrl+C → 进程瞬间消失，请求丢失，无任何日志`

const bad2Code = `// bad_2.go — ❌ 把 signal ctx 直接当 Shutdown 的超时
func main() {
    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer stop()
    <-ctx.Done()

    // ❌ 问题：signal ctx 是"无期限取消"——信号一到它就 Done 了，
    // 用它做 Shutdown 的 ctx，Shutdown 会立刻认为超时，直接强杀，等于没排空！
    srv.Shutdown(ctx)

    // ✅ 正确：新建一个带期限的 ctx
    // shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    // defer cancel()
    // srv.Shutdown(shutdownCtx)
}`
</script>
