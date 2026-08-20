<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧅 中间件</h1>
          <p class="text-sm text-slate-500 mt-1">Handler 嵌套 Handler——Go HTTP 的洋葱模型</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-4-middleware.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：洋葱模型——多层 Handler 嵌套包裹
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          中间件 = <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">func(http.Handler) http.Handler</code>——接受一个 Handler，返回一个<strong>包了一层逻辑的 Handler</strong>。
          多个中间件像<strong>洋葱</strong>一样层层嵌套：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Recovery(Logger(Auth(business)))</code>。
          请求从<strong>最外层进入</strong>（before），到最里层执行业务，再<strong>逐层返回</strong>（after）。
        </p>

        <figure class="mb-2">
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="mw-in" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
              </marker>
              <marker id="mw-out" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>

            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">洋葱模型：Recovery( Logger( Auth( 业务Handler ) ) )</text>

            <!-- Recovery 最外层 -->
            <rect x="190" y="80" width="340" height="220" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 3" />
            <text x="204" y="96" font-size="12" font-family="monospace" font-weight="bold" fill="#475569">Recovery 最外层——defer recover 兜住所有 panic</text>

            <!-- Logger -->
            <rect x="240" y="126" width="240" height="150" rx="10" fill="#f0f9ff" stroke="#38bdf8" stroke-width="1.5" />
            <text x="254" y="142" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">Logger——记录耗时</text>

            <!-- Auth -->
            <rect x="280" y="156" width="160" height="90" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="294" y="172" font-size="12" font-family="monospace" font-weight="bold" fill="#0c4a6e">Auth——校验 token</text>

            <!-- 业务 Handler -->
            <rect x="310" y="182" width="100" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="200" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">业务 Handler</text>

            <!-- 请求进入箭头 -->
            <line x1="70" y1="150" x2="190" y2="150" stroke="#4ade80" stroke-width="2.5" marker-end="url(#mw-in)" />
            <text x="120" y="138" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d" font-weight="bold">请求进入</text>

            <!-- 响应返回箭头 -->
            <line x1="190" y1="262" x2="70" y2="262" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#mw-out)" />
            <text x="120" y="276" text-anchor="middle" font-size="10" font-family="monospace" fill="#b45309" font-weight="bold">响应返回</text>

            <text x="16" y="318" font-size="11" font-family="monospace" fill="#0891b2">执行顺序（before/after）：Recovery→Logger→Auth→业务；返回逆序 Auth→Logger→Recovery</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：洋葱模型——请求从外向内穿过每层 before，核心执行后从内向外穿过每层 after</figcaption>
        </figure>
      </section>

      <!-- 1. 中间件本质 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          中间件本质——Handler 嵌套 Handler
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 中间件没有关键字、没有装饰器语法，它就是一个<strong>普通函数签名</strong>：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">func(http.Handler) http.Handler</code>。
          返回的 Handler 内部，在调用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next.ServeHTTP(w, r)</code> 之前写「before 逻辑」，之后写「after 逻辑」。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Go 中间件 ≈ <strong>Express / Koa 的中间件</strong>。<code class="bg-purple-100 px-1 rounded text-xs font-mono">next.ServeHTTP(w, r)</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">next()</code>。<br/>
          Koa 的「洋葱模型」就是 Go 中间件的执行方式：<code class="bg-purple-100 px-1 rounded text-xs font-mono">await next()</code> 前的代码进、之后的代码出。<br/>
          也 ≈ Vue Router 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">beforeEach</code> / <code class="bg-purple-100 px-1 rounded text-xs font-mono">afterEach</code>——路由守卫就是中间件。
          </p>
        </aside>

        <div class="mb-4"><Code language="go" :code="basicCode" title="middleware.go" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>签名固定：</strong>入参下一个 Handler，返回包了新逻辑的 Handler。类型系统保证中间件可以任意组合、任意复用。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>嵌套：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Recovery(Logger(Auth(handler)))</code>——从里到外写，执行从外到里。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>控制权：</strong>中间件可以「不放行」——Auth 校验失败直接 return 写 401，不调用 next，请求就在这里终止。</div>
          </li>
        </ol>
      </section>

      <!-- 2. http.HandlerFunc 转换 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          http.HandlerFunc——函数与接口的桥梁
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Handler</code> 是<strong>接口</strong>，而中间件里写的是<strong>匿名函数</strong>。
          函数不能直接当接口用，必须用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.HandlerFunc(fn)</code> 转换——
          这个类型实现了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ServeHTTP</code> 方法（内部就是调用 fn），于是函数变成了 Handler。
        </p>
        <div class="mb-4"><Code language="go" :code="handlerFuncCode" title="handler_func.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">写法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">是否合法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">http.HandleFunc("/x", fn)</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">HandleFunc 内部自动转 HandlerFunc</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">http.HandlerFunc(fn)</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">显式转换，中间件里必须这样</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">http.Handler(fn)</td><td class="px-4 py-2 border">❌ 编译错</td><td class="px-4 py-2 border">fn 没实现 ServeHTTP，转不了接口</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 3. 链式构造 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          链式构造——从里到外搭洋葱
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          组装时<strong>先造最里层业务，再一层层往外包</strong>。这样读代码的顺序 = 请求经过的顺序（外层先执行），心智负担最小。
        </p>
        <div class="mb-4"><Code language="go" :code="chainCode" title="chain.go" /></div>
      </section>

      <!-- 4. 常用中间件实例 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          三个实战中间件——Logging / Auth / Recovery
        </h2>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">Logging——记录请求与耗时</h3>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed">before 记录请求进来，after（next 返回后）打印耗时。这是最典型的 before/after 用法。</p>
        <div class="mb-4"><Code language="go" :code="loggingCode" title="middleware_logging.go" /></div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-6">Auth——校验失败直接拦下</h3>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed">校验不通过时不调用 next，直接写 401——这就是中间件「不放行」的能力。</p>
        <div class="mb-4"><Code language="go" :code="authCode" title="middleware_auth.go" /></div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-6">Recovery——panic 转 500</h3>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed">用 defer + recover 兜住业务里的 panic，让服务器不崩溃、客户端收到 500 而不是连接断开。</p>
        <div class="mb-4"><Code language="go" :code="recoveryCode" title="middleware_recovery.go" /></div>
      </section>

      <!-- 5. 执行顺序拆解 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          执行顺序拆解——7 步走完洋葱
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          以 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Recovery(Logger(Auth(business)))</code> 为例，一次请求的时间线：
        </p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>Recovery 进入：</strong>defer 注册 recover 函数，随后调用 next → Logger。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>Logger 进入：</strong>记录 start 时间，调用 next → Auth。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>Auth 进入：</strong>校验 token，通过后调用 next → business。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>业务执行：</strong>最里层 Handler 写响应，返回给 Auth。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>Auth 返回：</strong>Auth 的 next 调用返回，Auth 的 after 代码执行。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
            <div class="text-slate-600"><strong>Logger 返回：</strong>Logger 的 next 返回，打印耗时。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">7</span>
            <div class="text-slate-600"><strong>Recovery 返回：</strong>defer 检查无 panic，整个链完成，响应发给客户端。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">阶段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进入（before）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">返回（after）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">Recovery</td><td class="px-4 py-2 border">defer recover 挂起</td><td class="px-4 py-2 border">检查 panic，无则放行</td></tr>
              <tr><td class="px-4 py-2 border">Logger</td><td class="px-4 py-2 border">记录 start</td><td class="px-4 py-2 border">打印耗时</td></tr>
              <tr><td class="px-4 py-2 border">Auth</td><td class="px-4 py-2 border">校验 token</td><td class="px-4 py-2 border">（通常无 after）</td></tr>
              <tr><td class="px-4 py-2 border">业务</td><td class="px-4 py-2 border" colspan="2">执行核心逻辑、写响应</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. 常见坑 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          常见坑——中间件的 5 个陷阱
        </h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：忘了调用 next.ServeHTTP。</strong><br/>请求会在这里<strong>永久挂起</strong>，客户端等不到响应（直到超时）。这是中间件最常见的 bug。要么调用 next 放行，要么明确写响应 return——不能两者都不做。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：after 阶段再写 Header / WriteHeader。</strong><br/>业务 Handler 可能已经把响应头发出去了，外层中间件的 after 里再 <code class="bg-slate-100 px-1 rounded text-xs font-mono">w.Header().Set(...)</code> 不会生效，还会 log「superfluous response.WriteHeader」。Header 的设置应在 before 阶段做。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：Recovery 没放最外层。</strong><br/>如果 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Recovery(Logger(...))</code> 里 Logger 是外层、Recovery 是内层，Logger 里 panic 就兜不住了。Recovery 必须<strong>永远是最外层</strong>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：用全局变量传用户信息。</strong><br/>并发请求会互相覆盖。中间件间传递请求级数据要用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">r.WithContext(ctx)</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">r.Context()</code>，每个请求独立。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 5：中间件里启动 goroutine 操作共享对象。</strong><br/>请求结束 goroutine 还在跑，容易数据竞争。中间件应同步执行，异步任务交给队列/channel 统一处理。</p>
          </aside>
        </div>
      </section>

      <!-- 7. 最佳实践 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          最佳实践——顺序与原则
        </h2>
        <div class="mb-4"><Code language="go" :code="bestCode" title="middleware_order.go" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>顺序：</strong>Recovery（最外层）→ Logger → Auth → RateLimit → 业务（最内层）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单一职责：</strong>一个中间件只做一件事，可测试、可复用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>请求数据走 context：</strong>Auth 鉴权结果塞进 r.Context()，业务用 r.Context().Value() 取</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>错误用状态码表达：</strong>400 参数错 / 401 未认证 / 403 无权限 / 404 不存在 / 405 方法错</span></li>
        </ul>
      </section>

      <!-- 8. 为什么这样设计 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          Go 为什么这样设计中间件
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 刻意<strong>没有</strong>「装饰器」或「注解」语法，中间件就是普通函数组合。这个选择背后是三个设计哲学：
        </p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>显式优于魔法：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Recovery(Logger(Auth(handler)))</code> 一眼看懂执行顺序，不需要反射、不需要框架扫描注解。Python 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">@decorator</code>、Java 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">@Filter</code> 都要运行时才知道顺序。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>接口 + 函数组合：</strong>Handler 接口只约束一个方法，任何东西都能当 Handler——自定义 struct、函数、路由、中间件。类型系统强制你组合得对，编译期就抓住错误。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>Koa 洋葱天然同构：</strong>中间件的「进/出」就是函数调用栈的入栈/出栈，Go 的 next.ServeHTTP 显式表达了「在这里把控制权交给内层」——比回调地狱清晰得多。</div>
          </li>
        </ol>
      </section>

      <!-- 9. 对比 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          跨框架中间件对比
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go net/http</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Express (Node)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Koa (Node)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Gin (Go)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">中间件本质</td><td class="px-4 py-2 border">func(Handler) Handler</td><td class="px-4 py-2 border">回调链</td><td class="px-4 py-2 border">async 洋葱</td><td class="px-4 py-2 border">func(c *Context)</td></tr>
              <tr><td class="px-4 py-2 border">放行</td><td class="px-4 py-2 border font-mono text-xs">next.ServeHTTP(w,r)</td><td class="px-4 py-2 border font-mono text-xs">next()</td><td class="px-4 py-2 border font-mono text-xs">await next()</td><td class="px-4 py-2 border font-mono text-xs">c.Next()</td></tr>
              <tr><td class="px-4 py-2 border">是否支持洋葱</td><td class="px-4 py-2 border">✅ 完整</td><td class="px-4 py-2 border">❌ 线性（无 after）</td><td class="px-4 py-2 border">✅ 完整</td><td class="px-4 py-2 border">✅ 完整</td></tr>
              <tr><td class="px-4 py-2 border">依赖</td><td class="px-4 py-2 border">零</td><td class="px-4 py-2 border">npm</td><td class="px-4 py-2 border">npm</td><td class="px-4 py-2 border">第三方</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed">
          Express 的中间件是<strong>线性</strong>的——<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code> 之后的代码属于下一个中间件，不是自己。Koa 和 Go 才是真正的<strong>洋葱</strong>。Go 写 after 逻辑天然顺手。
        </p>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：洋葱模型执行顺序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「运行」，看请求从最外层 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Recovery</code> 依次进入（<strong class="text-emerald-600">绿色 = 进入阶段</strong>），
          到最里层业务 Handler 执行（<strong class="text-amber-600">橙色 = 核心 / 返回阶段</strong>），再逐层返回。右侧日志展示 before/after 的完整顺序。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 中间件 {{ layers.length }} 层 + 业务</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 全链穿越 O(n) · 7 步</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doRun" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶️ 运行洋葱</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 左侧层级条 -->
              <v-text :config="stageLabelCfg" />
              <v-rect v-for="(l, i) in layers" :key="'lr'+i" :config="layerRectCfg(i)" />
              <v-text v-for="(l, i) in layers" :key="'lt'+i" :config="layerNameCfg(i)" />
              <v-text v-for="(l, i) in layers" :key="'ls'+i" :config="layerDutyCfg(i)" />
              <v-circle v-if="ballIdx >= 0" :config="ballCfg" />
              <!-- 右侧日志 -->
              <v-rect :config="logPanelCfg" />
              <v-text :config="logTitleCfg" />
              <v-text v-for="(lg, i) in log" :key="'lg'+i" :config="logRowCfg(i, lg)" />
              <v-text v-if="log.length === 0" :config="logHintCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>中间件本质：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">func(http.Handler) http.Handler</code>——Handler 嵌套 Handler</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>next.ServeHTTP 之前的代码 = before（进），之后 = after（出）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>洋葱顺序：外层先进 → 核心执行 → 外层后返回（逆序）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Recovery 永远放最外层；中间件间数据走 context，不用全局变量</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>与 Koa 洋葱同构；Express 是线性中间件（无 after）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-3-routing-url" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：路由与URL</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-5-gin" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Gin 框架 →</RouterLink>
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
  { id: "sec-1", name: "中间件本质" },
  { id: "sec-2", name: "http.HandlerFunc 转换" },
  { id: "sec-3", name: "链式构造" },
  { id: "sec-4", name: "常用中间件实例" },
  { id: "sec-5", name: "执行顺序拆解" },
  { id: "sec-6", name: "常见坑" },
  { id: "sec-7", name: "最佳实践" },
  { id: "sec-8", name: "为什么这样设计" },
  { id: "sec-9", name: "跨框架对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-10", name: "小结" },
]

// ===== 🎬 洋葱模型执行顺序动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(320), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const layers = [
  { name: 'Recovery', duty: '最外层 · defer recover 兜底' },
  { name: 'Logger', duty: 'before 记 start / after 打耗时' },
  { name: 'Auth', duty: '校验 token，失败拦下 401' },
  { name: '业务 Handler', duty: '核心逻辑，写响应', core: true },
]
const barColors = ref<string[]>(['#f1f5f9', '#f1f5f9', '#f1f5f9', '#f1f5f9'])
const ballIdx = ref(-1)
const log = ref<string[]>([])

const LX = 16, LW = 300, LH = 50, LG = 14, LY = 52
function layerY(i: number) { return LY + i * (LH + LG) }
function barFill(i: number) { return barColors.value[i] }

const stageLabelCfg = { x: LX, y: 28, text: '洋葱层次（请求 上→下 进入，下→上 返回）', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted }
function layerRectCfg(i: number) {
  const c = barFill(i)
  const hl = ballIdx === i
  return { x: LX, y: layerY(i), width: LW, height: LH, fill: c === '#f1f5f9' ? '#f8fafc' : c, cornerRadius: 8,
    stroke: c === '#f1f5f9' ? '#e2e8f0' : c === C.green ? '#22c55e' : '#d97706', strokeWidth: hl ? 2.5 : 1.5,
    shadowColor: hl ? 'rgba(0,0,0,.12)' : 'transparent', shadowBlur: 5, shadowOffsetY: 2 }
}
function layerNameCfg(i: number) {
  const c = barFill(i)
  const dark = c === '#f1f5f9'
  return { x: LX + 14, y: layerY(i) + 6, text: layers[i].name, fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: dark ? '#334155' : '#ffffff' }
}
function layerDutyCfg(i: number) {
  const c = barFill(i)
  const dark = c === '#f1f5f9'
  return { x: LX + 14, y: layerY(i) + 28, text: layers[i].duty, fontSize: 10, fontFamily: 'monospace', fill: dark ? '#64748b' : (c === C.green ? '#f0fdf4' : '#fffbeb') }
}

const ballCfg = computed(() => {
  const i = ballIdx.value
  if (i < 0) return { x: 0, y: 0, radius: 0, fill: 'transparent' }
  const entering = barColors.value[i] === C.green
  return { x: LX + LW + 30, y: layerY(i) + LH / 2, radius: 10,
    fill: entering ? C.green : C.orange, stroke: entering ? '#22c55e' : '#d97706', strokeWidth: 2,
    shadowColor: entering ? 'rgba(74,222,128,.5)' : 'rgba(245,158,11,.5)', shadowBlur: 8, shadowOffsetY: 2 }
})

const PX = 380, PW = 304, PT = 30
const logPanelCfg = { x: PX, y: PT, width: PW, height: 272, fill: '#f8fafc', cornerRadius: 10, stroke: '#94a3b8', strokeWidth: 1.5 }
const logTitleCfg = { x: PX + 12, y: PT + 8, text: '执行顺序（before → 核心 → after）', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f172a' }
function logRowCfg(i: number, text: string) {
  const entering = text.includes('进入') || text.includes('执行')
  return { x: PX + 12, y: PT + 38 + i * 32, text, fontSize: 11, fontFamily: 'monospace',
    fontStyle: 'bold', fill: entering ? '#15803d' : '#b45309' }
}
const logHintCfg = { x: PX + 12, y: PT + 110, width: PW - 24, text: '👆 点「运行洋葱」\n看请求穿越每一层', fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center' }

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(200); busy.value = false }
}

function doRun() {
  act('▶️ 洋葱模型执行', async () => {
    barColors.value = ['#f1f5f9', '#f1f5f9', '#f1f5f9', '#f1f5f9']
    log.value = []; ballIdx.value = -1
    await d(300)

    // 进入阶段（绿色）
    barColors.value[0] = C.green; ballIdx.value = 0
    log.value.push('1. Recovery 进入'); status.value = 'Recovery 进入——defer recover 挂起'
    await d(600)

    barColors.value[1] = C.green; ballIdx.value = 1
    log.value.push('2. Logger 进入'); status.value = 'Logger 进入——记录 start 时间'
    await d(600)

    barColors.value[2] = C.green; ballIdx.value = 2
    log.value.push('3. Auth 进入'); status.value = 'Auth 进入——校验 token'
    await d(600)

    // 核心执行（橙色）
    barColors.value[3] = C.orange; ballIdx.value = 3
    log.value.push('4. 业务 Handler 执行（最里层）'); status.value = '核心——业务 Handler 执行业务逻辑、写响应'
    await d(700)

    // 返回阶段（橙色）
    barColors.value[3] = C.green
    barColors.value[2] = C.orange; ballIdx.value = 2
    log.value.push('5. Auth 返回'); status.value = 'Auth 返回——next() 调用栈回溯'
    await d(600)

    barColors.value[1] = C.orange; ballIdx.value = 1
    log.value.push('6. Logger 返回'); status.value = 'Logger 返回——after 打印耗时'
    await d(600)

    barColors.value[0] = C.orange; ballIdx.value = 0
    log.value.push('7. Recovery 返回'); status.value = 'Recovery 返回——检查无 panic，响应发给客户端'
    await d(600)

    ballIdx.value = -1
    barColors.value = [C.green, C.green, C.green, C.green]
    status.value = '✅ 完成——before 全进、核心执行、after 逆序返回'
    await d(600)
  })
}

function doReset() {
  busy.value = false
  barColors.value = ['#f1f5f9', '#f1f5f9', '#f1f5f9', '#f1f5f9']
  log.value = []; ballIdx.value = -1; status.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) { W.value = box.value.clientWidth }
  ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
  ro.observe(box.value!)
})
onUnmounted(() => ro?.disconnect())

const _ = reactive // 保留 vue 响应式 API 引用

const basicCode = `// 中间件签名：接受一个 Handler，返回一个"包了层逻辑"的 Handler
//   type Middleware func(http.Handler) http.Handler
func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()

        // before：请求进来时先执行
        next.ServeHTTP(w, r)   // ← 关键：把控制权交给下一层

        // after：下一层全部执行完才回到这里
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

// 使用——像搭积木一样嵌套
//   mux.Handle("/api/", Logger(apiHandler))
//
// 访问 /api/x 时日志：
// 输出: GET /api/x 1.2ms`

const handlerFuncCode = `// Handler 是接口；匿名函数不是接口。中间件里必须转换。
func hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "hello")
}

// 为什么中间件里总是写 http.HandlerFunc(...)？
func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // 匿名函数被 http.HandlerFunc 包装 → 变成 Handler
        // 因为 http.HandlerFunc 这个类型实现了 ServeHTTP 方法
        next.ServeHTTP(w, r)
    })
}

// 等价写法对比：
http.HandleFunc("/hello", hello)     // ✅ HandleFunc 内部自动转
http.HandlerFunc(hello)              // ✅ 显式转换
// http.Handler(hello)               // ❌ 编译错误：hello 没实现 ServeHTTP

// http.HandlerFunc 的定义（标准库）：
//   type HandlerFunc func(ResponseWriter, *Request)
//   func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) { f(w, r) }`

const chainCode = `func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/users", listUsers)

    // 组装：从里到外一层层包
    var handler http.Handler = mux        // 业务（最里层）
    handler = Auth(handler)               // 包 Auth
    handler = Logger(handler)             // 包 Logger
    handler = Recovery(handler)           // 包 Recovery（最外层）

    // 等价一行式（读的顺序 = 执行顺序，外层在前）：
    //   handler = Recovery(Logger(Auth(mux)))

    srv := &http.Server{Addr: ":8080", Handler: handler}
    log.Fatal(srv.ListenAndServe())
}

// 执行顺序（洋葱模型）：
//   Recovery 进入 → Logger 进入 → Auth 进入 → 业务执行
//   → Auth 返回 → Logger 返回 → Recovery 返回
// 输出:
//   2026/08/20 10:00:00 [logger] GET /api/users start
//   2026/08/20 10:00:00 [auth] token ok: u_123
//   2026/08/20 10:00:00 [logger] GET /api/users done in 1.2ms`

const loggingCode = `func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()

        // before：请求进来时
        log.Printf("[req ] %s %s", r.Method, r.URL.Path)

        next.ServeHTTP(w, r)   // ← 放行到下一层

        // after：下一层全部执行完才回到这里
        log.Printf("[resp] %s %s → %v", r.Method, r.URL.Path, time.Since(start))
    })
}
// 输出:
// [req ] GET /api/users
// [resp] GET /api/users → 1.2ms

// 状态码也想要？包一层记录状态的 ResponseWriter：
type statusWriter struct {
    http.ResponseWriter
    code int
}
func (sw *statusWriter) WriteHeader(code int) {
    sw.code = code
    sw.ResponseWriter.WriteHeader(code)
}`

const authCode = `func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")

        // 校验失败：不放行，直接 401
        if !strings.HasPrefix(token, "Bearer ") {
            w.WriteHeader(http.StatusUnauthorized)
            fmt.Fprintln(w, "{\\"error\\":\\"unauthorized\\"}")
            return // ← 终止链，不调用 next
        }

        // 校验通过：把用户信息塞进 context 传给后续层
        ctx := context.WithValue(r.Context(), "userID", "u_123")
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

// 业务侧取用户：
func getMe(w http.ResponseWriter, r *http.Request) {
    uid, _ := r.Context().Value("userID").(string)
    fmt.Fprintf(w, "current user: %s", uid)
    // 输出: current user: u_123
}`

const recoveryCode = `func Recovery(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                // 业务 panic 在这里被接住 → 转成 500，进程不退出
                log.Printf("panic recovered: %v", err)
                http.Error(w, "internal server error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

// 业务里 panic("boom") → 输出:
// panic recovered: boom
// 客户端收到: 500 internal server error

// ⚠️ Recovery 必须放最外层：
//   ✅ handler = Recovery(Logger(Auth(mux)))    // 兜住所有层
//   ❌ handler = Logger(Recovery(Auth(mux)))    // Logger 的 panic 兜不住`

const bestCode = `func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/users", listUsers)

    // 推荐的中间件顺序（从外到内）：
    //   1. Recovery    —— 最外层，兜所有 panic
    //   2. Logger      —— 记日志（before start / after 耗时）
    //   3. Auth        —— 鉴权，塞用户信息进 context
    //   4. RateLimit   —— 限流
    //   5. 业务 mux    —— 最内层
    handler := Recovery(Logger(Auth(RateLimit(mux))))

    srv := &http.Server{Addr: ":8080", Handler: handler}
    log.Fatal(srv.ListenAndServe())
}

// 数据传递规则：中间件之间用 context，绝不用全局变量
//   Auth 写入：  ctx := context.WithValue(r.Context(), "userID", uid)
//   Auth 放行：  next.ServeHTTP(w, r.WithContext(ctx))
//   业务读取：   uid, _ := r.Context().Value("userID").(string)`
</script>
