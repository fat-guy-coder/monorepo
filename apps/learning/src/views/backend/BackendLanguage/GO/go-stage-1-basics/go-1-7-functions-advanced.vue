<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">函数进阶 (defer / 闭包 / panic)</h1>
          <p class="text-sm text-slate-500 mt-1">Go 函数高级特性</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-7-functions-advanced.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-7</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔧</span>
          概述
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          掌握了函数的基本声明和调用后，本节深入 Go 函数的三个高级特性：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">defer</code>（延迟执行）、<strong>闭包</strong>（函数式编程）和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">panic/recover</code>（异常处理）。
        </p>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer：</strong>资源管理的基石，保证清理代码一定被执行</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>闭包：</strong>让函数携带状态，实现工厂模式、迭代器等设计</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>panic/recover：</strong>Go 的异常机制，处理不可恢复的运行时错误</span></li>
        </ul>
      </section>

      <!-- 1. defer 基础 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          defer 延迟执行
        </h2>

        <!-- 前端类比 -->
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          defer 就像 <code class="bg-purple-100 px-1 rounded text-xs font-mono">try {} finally {}</code> 里的 finally 块——无论 try 里是正常 return 还是 throw，finally 一定执行。<br/>
          也像 React 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">useEffect(() => { ... return () => { cleanup } }, [])</code> 里的 cleanup 函数——组件卸载时一定执行。<br/>
          还像 Express 中间件里 <code class="bg-purple-100 px-1 rounded text-xs font-mono">res.on('finish', cleanup)</code>——请求结束才清理。
          </p>
        </aside>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">defer</code> 将函数调用推迟到<strong>外层函数返回之前</strong>执行。无论函数是正常 return、执行到末尾、还是 panic，defer 都会执行。这是 Go 资源管理的<strong>核心基石</strong>——没有它你就必须记住在每个 return 分支手动清理。
        </p>

        <!-- 基本用法 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本用法</h3>
        <div class="mb-4"><Code language="go" :code="deferBasicCode" title="defer_basic.go" /></div>

        <!-- 执行时机：图解 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">defer 的执行时机</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          理解 defer 的精确执行时机：<strong>在函数 return 语句执行后、真正返回给调用方之前</strong>。具体说就是：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>函数执行到 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">return X</code></li>
          <li>Go 把返回值 X 赋给返回值变量</li>
          <li><strong>执行所有 defer（LIFO 顺序）</strong></li>
          <li>函数真正返回给调用方</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这就是 defer 能"修改命名返回值"的原因——defer 在 return 之后、函数返回之前执行，此时命名返回值 <strong>已经被赋值了</strong>，defer 可以读取甚至修改它。
        </p>

        <!-- 参数求值 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">参数求值时机</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          <strong>关键细节：</strong>defer 的参数在 defer <strong>声明时立即求值</strong>，而非在实际执行时。换句话说：
        </p>
        <div class="mb-4"><Code language="go" :code="deferEvalCode" title="defer_eval.go" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed">这个设计的<strong>好处</strong>：你可以用循环中每次迭代的当前值，而不是最终值。闭包（匿名函数）就没有这个问题，因为闭包捕获的是<strong>引用</strong>。</p>
        <div class="mb-4"><Code language="go" :code="deferEvalClosureCode" title="defer_eval_closure.go" /></div>

        <!-- LIFO -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">LIFO 执行顺序（后进先出）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          多个 defer 按<strong>栈（Stack）</strong>的顺序执行——最后一个声明的 defer 最先执行。这很符合直觉：<strong>最后获取的资源最先释放</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="deferLIFOCode" title="defer_lifo.go" /></div>
        <div class="mb-4"><Code language="go" :code="deferLIFOWhyCode" title="defer_lifo_why.go" /></div>
      </section>

      <!-- 2. defer 常用模式 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          defer 常用模式
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          defer 的威力在于<strong>模式</strong>——把获取和释放写在一起，让代码读起来像"配对"语法，再也不用到处找"这段资源在哪释放的"。
        </p>
        <div class="space-y-5">
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">🔒 互斥锁解锁</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">加锁后<strong>立即</strong> defer 解锁——这是 Go 并发编程里最常见的模式。无论函数有多少个 return 分支、甚至 panic，锁一定会释放。</p>
            <div class="mb-4"><Code language="go" :code="deferLockCode" title="defer_lock.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">📁 文件 / 数据库 / HTTP Body 关闭</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">任何实现了 io.Closer 接口的资源，打开后立即 defer Close()。注意：记得检查 Close 返回的 error（特别是写文件时，Close 才真正 flush 缓冲区）。</p>
            <div class="mb-4"><Code language="go" :code="deferFileCode" title="defer_file.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">⏱️ 函数计时</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">在函数开头获取时间，用 defer 计算总耗时。注意计时变量放在匿名函数外面——因为 defer 的参数<strong>声明时求值</strong>，匿名函数才能读取当前时间。</p>
            <div class="mb-4"><Code language="go" :code="deferTimerCode" title="defer_timer.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">↩️ 修改命名返回值</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">defer 在 return 之后、函数返回之前执行——此时命名返回值已被赋值，defer 可以读取甚至修改它。常用于：错误时返回降级值、defer 里记录错误日志并包装 error、recover 后设置安全返回值。</p>
            <div class="mb-4"><Code language="go" :code="deferReturnCode" title="defer_return.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">🔄 数据库事务回滚/提交</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">开启事务 → defer 回滚（如果没提交的话）→ 最后 commit 覆盖回滚。比 try-catch 优雅得多。</p>
            <div class="mb-4"><Code language="go" :code="deferTxCode" title="defer_tx.go" /></div>
          </div>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 核心原则：</strong>获取资源后<strong>立即</strong>写 defer 释放，不要等到函数末尾。代码读起来就像"打开 → defer 关闭 → 处理"的配对语法。</p>
        </aside>
      </section>

      <!-- 3. 闭包 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          闭包（Closures）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          闭包 = 函数 + 其引用的外部变量。匿名函数可以<strong>捕获并持有</strong>外层作用域的变量，即使外层函数已经返回。
        </p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本闭包</h3>
        <div class="mb-4"><Code language="go" :code="closureBasicCode" title="closure_basic.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">闭包工厂（独立计数器）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">每次调用工厂函数创建独立的闭包实例，互不影响。</p>
        <div class="mb-4"><Code language="go" :code="closureFactoryCode" title="closure_factory.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">Fibonacci 闭包</h3>
        <div class="mb-4"><Code language="go" :code="fibonacciCode" title="fibonacci_closure.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>闭包通过<strong>引用</strong>捕获变量。在循环中创建闭包时注意循环变量捕获问题（见 go-1-5 常见错误）。</p>
        </aside>
      </section>

      <!-- 4. panic / recover -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          panic 与 recover
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有 try-catch 也没有异常类层级。它把错误分成两类：<strong>可预期的</strong>（文件不存在、网络超时）用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">error</code> 返回值传递；<strong>不可恢复的</strong>（数组越界、空指针解引用、程序逻辑 Bug）用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">panic</code> 终止程序。
        </p>

        <!-- 前端类比 -->
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">error</code> 就像你在 try-catch 里有针对性处理的异常——网络请求失败给用户弹 toast，这是<strong>预期内的</strong>。<br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">panic</code> 就像 JS 里的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">throw new Error("unreachable")</code> 或者 Rust 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">unwrap()</code>——"这里不应该出错，出错就是 Bug"。<br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">recover</code> 类似 Express/Node 里最外层那个全局 error handler middleware——防止整个服务挂掉，打日志然后优雅降级。
          </p>
        </aside>

        <!-- panic 触发过程 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">panic 的执行流程</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          当 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">panic("xxx")</code> 被调用时，Go 做了三件事：
        </p>
        <ol class="list-decimal list-inside space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>立即停止当前函数的执行</strong>（后面的代码不会运行）</li>
          <li><strong>沿调用栈向上冒泡</strong>——每层函数退出前，<strong>执行该层的所有 defer 语句</strong></li>
          <li>如果某个 defer 中调用了 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">recover()</code>，panic <strong>被捕获</strong>，程序恢复正常执行</li>
          <li>如果一直冒泡到 goroutine 顶部都没有 recover，<strong>程序崩溃</strong>，打印调用栈</li>
        </ol>

        <!-- 基本用法 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本示例</h3>
        <div class="mb-4"><Code language="go" :code="panicRecoverCode" title="panic_recover.go" /></div>

        <!-- recover 为什么只能在 defer 里 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">为什么 recover 只能在 defer 中生效？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          理解 panic 的执行模型就明白了：panic 发生后<strong>正常代码不会再执行</strong>。如果你在非 defer 的位置调用 recover，panic 还没发生（返回 nil），或者 panic 已发生但你这段代码根本不会运行。defer 是唯一一个<strong>"无论函数怎么退出都会执行"</strong>的机制。
        </p>
        <div class="mb-4"><Code language="go" :code="recoverWhyDeferCode" title="recover_why_defer.go" /></div>

        <!-- recover 的返回值 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">recover 返回值详解</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">recover()</code> 返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">interface{}</code>（Go 1.18+ 就是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">any</code>）：<br/>
          • <strong>没有 panic 发生时</strong>，返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">nil</code><br/>
          • <strong>panic 被捕获时</strong>，返回传给 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">panic()</code> 的那个值——可以是 string、error、任何类型<br/>
          • <strong>可以多次 recover</strong>，但每次 panic 只能被捕获一次——被捕获后 panic 就结束了，不会继续冒泡
        </p>

        <!-- 实战 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">实战：编写健壮的 HTTP 服务</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          最常见的 recover 场景——HTTP Handler 中单个请求 panic 不应该导致整个服务挂掉：
        </p>
        <div class="mb-4"><Code language="go" :code="panicHTTPCode" title="panic_http.go" /></div>

        <div class="space-y-3 mt-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 关键规则：</strong><br/>
            1. recover <strong>只能在 defer 函数中生效</strong>，直接调用永远返回 nil<br/>
            2. <strong>每个 panic 只被捕获一次</strong>——被 recover 后不再冒泡<br/>
            3. <strong>不要在 recover 后"假装没事"</strong>——状态可能已经坏了（defer 中修改过的变量除外），最好打印堆栈后返回错误<br/>
            4. <strong>不要 panic 业务错误</strong>——用户输入校验失败用 error 返回，不要 panic
            </p>
          </aside>
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>💡 经验法则：</strong><br/>
            • HTTP Handler / gRPC 入口 → 加 recover middleware（框架通常自带）<br/>
            • goroutine 入口 → 加 defer recover，不然 panic 会让整个进程崩溃<br/>
            • 库代码 → <strong>不要 recover</strong>，把 panic 留给调用方处理<br/>
            • 业务逻辑 → <strong>永远不要 panic</strong>，用 error 返回
            </p>
          </aside>
        </div>
      </section>

      <!-- 5. 函数式选项模式 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          函数式选项模式（Functional Options）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有默认参数和函数重载。当构造函数有多个可选配置项时，<strong>函数式选项模式</strong>是最优雅的方案：不传 flag 参数、不传 config struct，而是传入<strong>一个个函数</strong>，每个函数修改一个配置项。
        </p>

        <!-- 前端类比 -->
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          这就像 <code class="bg-purple-100 px-1 rounded text-xs font-mono">axios.create({ baseURL, timeout, headers })</code> 里的配置对象，或者 Vue 3 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">createApp({ ... })</code>。<br/>
          区别是 Go 用<strong>函数</strong>而不是对象字面量来表达配置——因为 Go 的函数是一等公民，类型安全，而且可以包含逻辑（比如校验）。
          </p>
        </aside>

        <!-- 问题：不用模式之前 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">问题：参数爆炸</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">假设你要写一个 HTTP Server 构造函数，可选参数越来越多：</p>
        <div class="mb-4"><Code language="go" :code="funcOptProblemCode" title="the_problem.go" /></div>

        <!-- 完整方案 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">Functional Options 完整方案</h3>
        <div class="mb-4"><Code language="go" :code="funcOptCode" title="functional_options.go" /></div>

        <!-- 深入理解 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">深入理解：Option 为什么是 func(*Config)？</h3>
        <div class="space-y-3 text-slate-600 text-sm leading-relaxed mb-4">
          <p><strong>1. 核心类型：</strong><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">type Option func(*Config)</code>——把"修改配置"这个动作抽象成一个类型。每个 Option 是一个<strong>闭包</strong>，捕获了要设置的值。</p>
          <p><strong>2. 工厂函数：</strong><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">WithPort(3000)</code> 返回一个闭包，这个闭包记住了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">3000</code>，当被调用时就把 Config.Port 设为 3000。</p>
          <p><strong>3. 应用选项：</strong><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">for _, o := range opts { o(cfg) }</code>——遍历所有 Option，逐个应用到 Config 指针上。顺序<strong>后写的优先</strong>（后面的覆盖前面的）。</p>
          <p><strong>4. 零值即默认：</strong>New 函数先创建一个带<strong>合理默认值</strong>的 Config，然后用 Option 覆盖。没有传入的配置项保持默认值。</p>
        </div>

        <!-- 进阶：带校验的 Option -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">进阶：内聚校验的 Option</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          Option 不只是赋值，还可以做参数校验——把校验逻辑和配置封装在一起：
        </p>
        <div class="mb-4"><Code language="go" :code="funcOptValidateCode" title="option_with_validation.go" /></div>

        <!-- 嵌套配置 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">进阶：嵌套配置</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          对于复杂配置（如 TLS、连接池），可以嵌套 Option 类型：
        </p>
        <div class="mb-4"><Code language="go" :code="funcOptNestedCode" title="nested_options.go" /></div>

        <div class="space-y-3">
          <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
            <p class="text-sm text-emerald-800"><strong>✅ 何时使用：</strong>3 个以上可选参数 + 未来可能增加更多。gRPC、Uber Zap、Docker SDK、AWS SDK 都是用这个模式。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 何时不用：</strong>只有 1-2 个必选参数直接用普通函数参数；如果结构体本身就是配置载体且不频繁变动，直接暴露 Config struct 也很常见。</p>
          </aside>
        </div>
      </section>

      <!-- 6. 常见错误 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见错误
        </h2>
        <div class="space-y-5">
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">1. 循环中使用 defer 导致资源泄漏</h3>
            <p class="text-slate-600 mb-3 leading-relaxed">defer 在外层函数返回前才执行，循环中直接用 defer 会累积资源。</p>
            <div class="mb-4"><Code language="go" :code="deferLoopCode" title="defer_loop.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">2. defer 中忽略 error</h3>
            <div class="mb-4"><Code language="go" :code="deferErrorCode" title="defer_error.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">3. 滥用 panic 替代 error</h3>
            <p class="text-slate-600 leading-relaxed">可预期的错误用 error 返回值，真正不可恢复的才用 panic。把业务校验失败变成 panic 是反模式。</p>
          </div>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer 是资源管理利器：</strong>打开→defer关闭，加锁→defer解锁</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer 参数立即求值，LIFO 执行</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>闭包捕获引用：</strong>每个闭包实例有独立状态</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>panic 用于不可恢复错误，recover 只在 defer 中有效</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>函数式选项模式：</strong>3+ 可选参数时的推荐方案</span></li>
        </ul>
      </section>

    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-6-functions-basic"
          class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">
          ← 上一节：函数基础
        </RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-8-arrays-slices"
          class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">
          下一节：数组与切片 →
        </RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
import { RouterLink } from 'vue-router'

const navList = [
    { id: "sec-1", name: "概述" },
    { id: "sec-2", name: "defer 延迟执行" },
    { id: "sec-3", name: "defer 常用模式" },
    { id: "sec-4", name: "闭包（Closures）" },
    { id: "sec-5", name: "panic 与 recover" },
    { id: "sec-6", name: "函数式选项模式（Functional Options）" },
    { id: "sec-7", name: "常见错误" },
    { id: "sec-8", name: "小结" }
  ]
const deferBasicCode = `package main
import "fmt"
func main() {
    defer fmt.Println("3. 最后执行")
    fmt.Println("1. 第一步")
    fmt.Println("2. 第二步")
}
// 输出: 1, 2, 3`

const deferEvalCode = `func demo() {
    x := 1
    defer fmt.Println("defer x =", x) // 此时 x=1 已求值
    x = 2
    fmt.Println("返回前 x =", x)
}
// 输出: 返回前 x = 2, defer x = 1`

const deferLIFOCode = `func demo() {
    defer fmt.Println("1st")
    defer fmt.Println("2nd")
    defer fmt.Println("3rd")
}
// 输出: 3rd, 2nd, 1st（后进先出——栈）`

const deferEvalClosureCode = `// 参数 vs 闭包——关键区别
func demo() {
    for i := 0; i < 3; i++ {
        defer fmt.Print(i, " ")        // 参数立即求值 → 2 1 0
    }
}
func demo2() {
    for i := 0; i < 3; i++ {
        defer func() { fmt.Print(i, " ") }() // 闭包捕获引用 → 3 3 3
    }
}
// demo()  输出: 2 1 0   ← 每次声明时 i 的值被"冻结"
// demo2() 输出: 3 3 3   ← 闭包读的是循环结束后的 i`

const deferLIFOWhyCode = `// LIFO 很合理——想想资源的依赖关系
func processFile(path string) error {
    f, _ := os.Open(path)
    defer f.Close()        // ← 第2个 defer, 第1个执行

    reader := bufio.NewReader(f)
    defer reader.Flush()   // ← 第1个 defer, 第2个执行
    // 执行顺序: Flush → Close（先清理上层，再关闭底层）
    return nil
}`

const deferTxCode = `// 数据库事务：defer 回滚 + 最后 commit 覆盖
func Transfer(from, to string, amount int) error {
    tx, err := db.Begin()
    if err != nil { return err }
    defer tx.Rollback() // ← 默认回滚；如果 Commit 成功则无操作

    if err := deduct(tx, from, amount); err != nil { return err }
    if err := add(tx, to, amount); err != nil { return err }

    return tx.Commit() // ← 成功则覆盖掉 Rollback
}`

const deferLockCode = `var mu sync.Mutex
func critical() {
    mu.Lock()
    defer mu.Unlock() // 保证解锁
    // ... 即使 panic，defer 仍执行 ...
}`

const deferFileCode = `func process(name string) error {
    f, err := os.Open(name)
    if err != nil { return err }
    defer f.Close() // 自动关闭
    // ... 处理 ...
    return nil
}`

const deferTimerCode = `func timedOp() {
    start := time.Now()
    defer func() {
        fmt.Println("耗时:", time.Since(start))
    }()
    // ... 要计时的操作 ...
}`

const deferReturnCode = `// defer 修改命名返回值——实际场景：recover 后设置安全值
func safeDiv(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            result = 0          // 修改返回值！
            err = fmt.Errorf("panic: %v", r)
        }
    }()
    return a / b, nil  // return 后 defer 执行，result 可能被改
}
// safeDiv(10, 0) → result=0, err="panic: runtime error: integer divide by zero"
// safeDiv(10, 2) → result=5, err=nil

// 另外一个常用场景：defer 中记录错误日志并包装
func doWork() (err error) {
    defer func() {
        if err != nil {
            err = fmt.Errorf("doWork failed: %w", err) // 包装
        }
    }()
    // ...
    return someOperation()
}`

const closureBasicCode = `func main() {
    base := 100
    add := func(n int) int { return base + n }
    fmt.Println(add(5)) // 105
    base = 200
    fmt.Println(add(5)) // 205（引用！）
}`

const closureFactoryCode = `func newCounter() func() int {
    count := 0
    return func() int { count++; return count }
}
c1, c2 := newCounter(), newCounter()
c1() // 1, c1() // 2, c2() // 1（独立！）`

const fibonacciCode = `func fib() func() int {
    a, b := 0, 1
    return func() int { a, b = b, a+b; return a }
}
// f := fib()
// f()→1, f()→1, f()→2, f()→3, f()→5, f()→8`

const panicRecoverCode = `func safeDiv(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("恢复:", r)
            result = 0
        }
    }()
    if b == 0 { panic("除零") }
    return a / b
}
// safeDiv(10, 0) → 返回 0，不崩溃`

const recoverWhyDeferCode = `// ❌ 错误：直接调 recover——panic 还没发生，返回 nil
func wrong() {
    if r := recover(); r != nil { fmt.Println(r) }
    panic("boom") // recover 在上面的正常代码里，panic 发生后不会回头执行
}
// ❌ 错误：defer 了但没有在 defer 函数体里调 recover
func alsoWrong() {
    defer recover() // 没用的！recover 不是被 defer 的匿名函数直接调用
    panic("boom")
}
// ✅ 正确姿势
func correct() {
    defer func() {
        if r := recover(); r != nil { fmt.Println("捕获:", r) }
    }()
    panic("boom")
}
// 原理：panic → 正常代码不执行 → 执行 defer 链 → defer 里的 recover 拦截 panic`

const panicHTTPCode = `// HTTP 中间件：每个请求独立恢复，一个请求 panic 不影响其他
func Recovery(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                log.Printf("PANIC %s: %v\n%s", r.URL.Path, err, debug.Stack())
                http.Error(w, "Internal Server Error", 500)
            }
        }()
        next.ServeHTTP(w, r)
    })
}
// goroutine 入口必须加 recover——goroutine panic 直接 kill 整个进程
go func() {
    defer func() { if r := recover(); r != nil { log.Println("goroutine panic:", r) } }()
    riskyWork()
}()`

const funcOptProblemCode = `// 需求：HTTP Server 的配置，可选参数越来越多
type Server struct {
    Addr    string
    Port    int
    Timeout time.Duration
    MaxConn int
    TLS     *tls.Config
}

// ❌ 方案1：一长串参数——新增一个参数就要改所有调用方
func NewServer(addr string, port int, timeout time.Duration, maxConn int, tls *tls.Config) *Server { ... }

// ❌ 方案2：传 Config struct——零值无法区分"没传"和"传了默认值"
type Config struct { Addr string; Port int; Timeout time.Duration }
func NewServer(cfg Config) *Server { ... }
// 调用方：NewServer(Config{Port: 3000}) → Timeout=0 是没传还是故意设 0？
// Go 没有 undefined/null，零值无法表达"可选"语义`

const funcOptCode = `// ✅ Functional Options 模式
type Server struct {
    addr    string // 小写——不导出，通过 Option 设置
    port    int
    timeout time.Duration
    maxConn int
}
type Option func(*Server)

func WithPort(p int) Option {
    return func(s *Server) { s.port = p }
}
func WithTimeout(d time.Duration) Option {
    return func(s *Server) { s.timeout = d }
}
func WithMaxConn(n int) Option {
    return func(s *Server) { s.maxConn = n }
}

func NewServer(addr string, opts ...Option) *Server {
    s := &Server{  // 零值即默认值
        addr:    addr,
        port:    8080,
        timeout: 30 * time.Second,
        maxConn: 1000,
    }
    for _, o := range opts { o(s) }
    return s
}

// 调用：清爽、可扩展、自文档化
srv := NewServer("0.0.0.0",
    WithPort(3000),
    WithTimeout(10*time.Second),
)`

const funcOptValidateCode = `// Option 不仅仅是赋值——可以内聚校验逻辑
func WithPort(p int) Option {
    return func(s *Server) {
        if p < 1 || p > 65535 {
            panic("端口范围 1-65535") // 或返回 error（见下文 Option 变体）
        }
        s.port = p
    }
}

// 更安全：Option 可以返回 error
type Option func(*Server) error
func WithPort(p int) Option {
    return func(s *Server) error {
        if p < 1 || p > 65535 { return fmt.Errorf("invalid port: %d", p) }
        s.port = p
        return nil
    }
}
func NewServer(addr string, opts ...Option) (*Server, error) {
    s := &Server{addr: addr, port: 8080}
    for _, o := range opts {
        if err := o(s); err != nil { return nil, err }
    }
    return s, nil
}`

const funcOptNestedCode = `// 嵌套配置：TLS 有自己的 Option 类型
type TLSConfig struct {
    CertFile string
    KeyFile  string
    Insecure bool
}
type TLSOption func(*TLSConfig)

func WithTLS(opts ...TLSOption) Option {
    return func(s *Server) {
        cfg := &TLSConfig{}
        for _, o := range opts { o(cfg) }
        s.tls = cfg
    }
}
func WithCertFile(path string) TLSOption {
    return func(c *TLSConfig) { c.CertFile = path }
}

// 使用：层级清晰
srv, _ := NewServer("0.0.0.0",
    WithPort(443),
    WithTLS(
        WithCertFile("/etc/cert.pem"),
        WithKeyFile("/etc/key.pem"),
    ),
)`

const deferLoopCode = `// ❌ 循环中 defer 累积，不释放
for _, name := range files {
    f, _ := os.Open(name)
    defer f.Close() // 直到函数结束才关闭 → 泄漏！
}
// ✅ 提取为函数，每次迭代立即释放
for _, name := range files {
    func() {
        f, _ := os.Open(name)
        defer f.Close()
    }()
}`

const deferErrorCode = `// ❌ 忽略 Close 的错误
defer f.Close()
// ✅ 正确处理
defer func() {
    if err := f.Close(); err != nil {
        log.Println("close err:", err)
    }
}()`
</script>
