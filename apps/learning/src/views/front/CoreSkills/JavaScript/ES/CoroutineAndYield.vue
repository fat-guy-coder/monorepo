<template>
  <div class="coroutine-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔄 协程与 Yield 让权机制</h1>
          <p class="text-sm text-slate-500 mt-1">轻量级并发编程模型 — 理解"让出控制权"的核心思想</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/front/CoreSkills/JavaScript/ES/CoroutineAndYield.vue"
            label="📝 编辑" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">ES6</span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 协程概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是协程（Coroutine）？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>协程（Coroutine）</strong>是一种比线程更轻量级的并发编程模型。它的核心特征是<strong>协作式多任务</strong>：
          一个协程可以主动暂停自己（让出控制权），让其他协程运行，之后再从暂停的地方恢复执行。
          整个过程发生在<strong>单个线程</strong>内，不需要操作系统的线程切换。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端/跨语言类比：</strong><br />
            <strong>JavaScript Generator</strong> ≈ <strong>Python 的 generator</strong>（yield 语法几乎一样）≈ <strong>C# 的
              IEnumerator</strong><br />
            <strong>协程模型</strong> ≈ <strong>Redux Saga</strong> 的 saga 函数概念 — 生成器函数在执行到 yield 时"让出"控制权给 Saga
            Middleware<br />
            <strong>async/await</strong> 就是协程思想的语法糖 — 把 yield 替换为 await，把 next() 替换为自动驱动的执行器<br />
            <strong>关键区分：</strong>协程是"协作"而非"抢占"——你主动让，别人才能上。线程是 OS 抢占式调度，你控制不了。
          </p>
        </aside>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">协程（Coroutine）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">线程（Thread）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">调度方式</td>
                <td class="px-4 py-2 border border-slate-200">协作式（主动让出）</td>
                <td class="px-4 py-2 border border-slate-200">抢占式（OS 决定）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">上下文切换开销</td>
                <td class="px-4 py-2 border border-slate-200">极小（用户态）</td>
                <td class="px-4 py-2 border border-slate-200">较大（内核态，~1-10μs）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">并发数量</td>
                <td class="px-4 py-2 border border-slate-200">数十万级</td>
                <td class="px-4 py-2 border border-slate-200">数千级</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">内存占用</td>
                <td class="px-4 py-2 border border-slate-200">KB 级别（仅保存栈帧状态）</td>
                <td class="px-4 py-2 border border-slate-200">MB 级别（独立栈空间）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">同步机制</td>
                <td class="px-4 py-2 border border-slate-200">通常不需要锁</td>
                <td class="px-4 py-2 border border-slate-200">需要互斥锁、信号量等</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">适用场景</td>
                <td class="px-4 py-2 border border-slate-200">I/O 密集型、状态机、异步流程</td>
                <td class="px-4 py-2 border border-slate-200">CPU 密集型、真正的并行计算</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 让权机制 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          让权机制（Yield）深入理解
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>让权（Yield）</strong>是协程的核心操作。它不是"被挂起"，而是<strong>主动说"我暂时可以休息，别人先来"</strong>。
          让权发生时发生以下步骤：
        </p>

        <ol class="space-y-4 mb-6">
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>保存执行状态</strong> — 保存当前指令指针（代码执行位置）、词法环境（局部变量）、作用域链到堆内存中。</div>
          </li>
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>从调用栈弹出</strong> — 将协程的执行上下文从 JS 调用栈中移除（但不销毁！），控制权交还给调用者或调度器。</div>
          </li>
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>传递数据</strong> — yield 右侧的值作为 <code
                class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code> 的返回值 <code
                class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{ value, done }</code> 传出。
            </div>
          </li>
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>恢复执行</strong> — 调用 <code
                class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code>
              时，从堆中恢复执行上下文，重新推入调用栈，从上次 yield 的位置继续。</div>
          </li>
        </ol>

        <div class="mb-4">
          <Code language="js" :code="codeYieldFlow" title="让权与恢复的直观演示" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="yieldFlowOutput" title="📟 输出结果" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>协程的执行上下文保存在<strong>堆内存</strong>中（不随调用栈弹出而销毁），
            这意味着协程可以<strong>跨多个事件循环 tick</strong> 恢复执行。这正是它能在单线程中实现"并发"的根本原因。</p>
        </aside>
      </section>

      <!-- 3. Generator 函数 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          JavaScript Generator：协程的具体实现
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          JavaScript 通过 <strong>Generator 函数</strong>（<code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">function*</code>）
          实现了<strong>半协程（semi-coroutine）</strong>。它只能将控制权交还给调用者（而不能随意让给其他协程），但已经足够强大。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div class="text-2xl mb-2">⭐</div>
            <h4 class="font-semibold text-slate-700 mb-1">function* 语法</h4>
            <p class="text-sm text-slate-600">使用星号定义生成器函数。调用该函数<strong>不执行函数体</strong>，而是返回一个 Generator 对象。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div class="text-2xl mb-2">⬇️</div>
            <h4 class="font-semibold text-slate-700 mb-1">yield 关键字</h4>
            <p class="text-sm text-slate-600">暂停执行并将值传回调用者。一个 Generator 可以有<strong>多个</strong> yield 点。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div class="text-2xl mb-2">▶️</div>
            <h4 class="font-semibold text-slate-700 mb-1">next() / return() / throw()</h4>
            <p class="text-sm text-slate-600">next() 恢复执行，return() 提前终止，throw() 注入异常。</p>
          </div>
        </div>

        <div class="mb-4">
          <Code language="js" :code="codeGeneratorBasic" title="Generator 基本用法" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">Generator 的四种状态</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">状态</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内部槽位</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">触发条件</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">next() 行为</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">挂起（初始）</td>
                <td class="px-4 py-2 border border-slate-200">suspendedStart</td>
                <td class="px-4 py-2 border border-slate-200">创建后未调用 next()</td>
                <td class="px-4 py-2 border border-slate-200">开始执行函数体</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">执行中</td>
                <td class="px-4 py-2 border border-slate-200">executing</td>
                <td class="px-4 py-2 border border-slate-200">next() 调用后，遇 yield 前</td>
                <td class="px-4 py-2 border border-slate-200">❌ 报错（不能重入）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">挂起（yield）</td>
                <td class="px-4 py-2 border border-slate-200">suspendedYield</td>
                <td class="px-4 py-2 border border-slate-200">遇到 yield 表达式</td>
                <td class="px-4 py-2 border border-slate-200">从上次 yield 之后继续</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">完成</td>
                <td class="px-4 py-2 border border-slate-200">completed</td>
                <td class="px-4 py-2 border border-slate-200">函数 return 或执行完毕</td>
                <td class="px-4 py-2 border border-slate-200">返回 { value: undefined, done: true }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. 双向通信 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          yield 与 next() 的双向数据通道
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Generator 最精妙的设计是 <strong>yield 和 next() 之间的双向通信</strong>：yield 把数据<strong>传出去</strong>，
          next(arg) 把数据<strong>传进来</strong>。这种机制使得 Generator 可以作为<strong>状态机</strong>和<strong>对话式编程</strong>的基础。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div class="text-sm font-semibold text-blue-700 mb-2">📤 生成器 → 外部</div>
            <code class="text-sm font-mono text-blue-800">yield 返回值</code>
            <p class="text-sm text-blue-700 mt-2">yield 右侧表达式的值作为本次 next() 返回对象的 value 属性传出。</p>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-sm font-semibold text-emerald-700 mb-2">📥 外部 → 生成器</div>
            <code class="text-sm font-mono text-emerald-800">next(arg) 传入</code>
            <p class="text-sm text-emerald-700 mt-2">next(arg) 的参数会成为<strong>上一次</strong> yield 表达式的结果值。</p>
          </div>
        </div>

        <div class="mb-4">
          <Code language="js" :code="codeBidirectional" title="双向通信示例" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="bidirectionalOutput" title="📟 输出结果" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>第一次调用 <code
              class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">next()</code> 时传入的参数会被<strong>忽略</strong>，
            因为还没有 yield 表达式来接收它。如果需要初始参数，直接在调用 Generator 函数时传入。</p>
        </aside>
      </section>

      <!-- 5. yield* 委托 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          yield* 委托：组合 Generator
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">yield*</code>
          表达式可以将生成过程<strong>委托</strong>给另一个 Generator 或可迭代对象。
          它会自动处理内外 next()、return() 和 throw() 的转发，使得多个 Generator 可以组合成更复杂的流程。
        </p>

        <div class="mb-4">
          <Code language="js" :code="codeYieldStar" title="yield* 委托示例" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 实际应用：</strong>在 <strong>Redux Saga</strong> 中，
            <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">yield*</code> 的概念被用于 saga 组合。
            <strong>Koa 框架</strong>的早期版本也是基于 Generator + yield* 实现中间件洋葱模型（后来改为 async/await）。
          </p>
        </aside>
      </section>

      <!-- 6. Generator 高级应用 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          Generator 高级应用场景
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">6.1 异步流程控制（async/await 的雏形）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">通过手动驱动 Generator，在 yield 处等待 Promise，将结果传回 —— 这就是 async/await
          的底层模型：</p>
        <div class="mb-4">
          <Code language="js" :code="codeAsyncFlowControl" title="Generator 实现异步流程控制" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">6.2 无限序列与惰性求值</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">Generator 只在你调用 next() 时才计算下一个值，天然支持惰性求值和无限序列：</p>
        <div class="mb-4">
          <Code language="js" :code="codeLazyEval" title="无限斐波那契数列" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">6.3 ID 生成器</h3>
        <div class="mb-4">
          <Code language="js" :code="codeIdGenerator" title="可重置的 ID 生成器" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">6.4 游戏 AI 行为序列</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">这是协程在游戏开发中的经典应用——用 yield 实现 AI 行为树/状态序列：</p>
        <div class="mb-4">
          <Code language="js" :code="codeGameAI" title="游戏 AI 行为序列" />
        </div>
      </section>

      <!-- 7. 常见陷阱 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          常见陷阱与注意事项
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：忘记调用 next() 启动 Generator</strong><br />
              <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">const gen = myGenerator()</code>
              只是创建了 Generator 对象，函数体还没开始执行。
              必须调用一次 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">gen.next()</code> 才能启动。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：在 executing 状态调用 next()</strong><br />
              如果 Generator 正在执行中（executing 状态），再次调用 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">next()</code> 会抛出
              <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">TypeError</code>。Generator 不可重入。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：Generator 不能用于 CPU 密集任务的"分片"</strong><br />
              虽然 Generator 可以暂停/恢复，但它仍然运行在<strong>主线程</strong>上。yield 不会魔法般地让 CPU 密集计算不阻塞 UI。
              要真正避免阻塞，需要用 Web Worker 或 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">requestIdleCallback</code>。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：用完忘记清理</strong><br />
              Generator 对象如果不再使用，应调用 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">gen.return()</code> 或让它自然完成。
              否则其执行上下文（包括闭包中的变量）会一直保留在堆内存中，造成<strong>内存泄漏</strong>。
            </p>
          </aside>
        </div>
      </section>

      <!-- 8. 总结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          总结与延伸
        </h2>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 核心要点：</strong></p>
          <ul class="space-y-1 text-sm text-blue-800 mt-2">
            <li class="flex items-start gap-2"><span
                class="text-blue-500 mt-1">▸</span><span>协程的核心是<strong>协作式让权</strong>——主动暂停，而非被操作系统抢占</span></li>
            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>JS Generator
                是<strong>半协程</strong>实现，只能让权给调用者</span></li>
            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>yield 和 next()
                形成<strong>双向数据通道</strong>，这是 Generator 最强大的特性</span></li>
            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>async/await 本质上是 Generator
                + Promise + 自动执行器的语法糖</span></li>
            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>在现代 JS 中，async/await 已基本替代
                Generator 做异步流程控制，但 Generator
                在<strong>惰性求值</strong>、<strong>无限序列</strong>、<strong>可暂停的状态机</strong>等场景仍有独特优势</span></li>
          </ul>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 学习路径：</strong><br />
            理解了协程和让权机制后，建议按以下顺序深入学习：<br />
            1. <strong>Generator 底层原理</strong> — 理解 [[Generator]] 内部槽位和执行上下文栈<br />
            2. <strong>Async/Await</strong> — 看 Generator 如何被包装成 async 函数<br />
            3. <strong>异步迭代器</strong> — async generator + for await...of<br />
            4. <strong>Redux Saga</strong>（前端框架）— Generator 在状态管理中的高级应用
          </p>
        </aside>
      </section>
    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <RouterLink to="/front/CoreSkills/JavaScript/ES/Generator"
          class="text-slate-500 hover:text-cyan-600 text-sm flex items-center gap-1 transition-colors">← 上一节：Generator
          生成器</RouterLink>
        <RouterLink to="/front/CoreSkills/JavaScript/ES/AsyncIterator"
          class="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1 transition-colors">
          下一节：异步迭代器 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "什么是协程" },
  { id: "sec-2", name: "让权机制（Yield）" },
  { id: "sec-3", name: "Generator：协程的实现" },
  { id: "sec-4", name: "yield 与 next 双向通信" },
  { id: "sec-5", name: "yield* 委托" },
  { id: "sec-6", name: "高级应用场景" },
  { id: "sec-7", name: "常见陷阱" },
  { id: "sec-8", name: "总结与延伸" },
]

// ==================== 代码示例 ====================

const codeYieldFlow = `function* demoYield() {
  console.log('1. Generator 开始执行')        // 输出: 1. Generator 开始执行

  const a = yield '第一次让权'                 // 输出: yield 传出 '第一次让权'
  console.log('3. 恢复执行, 收到:', a)        // 输出: 3. 恢复执行, 收到: 传入的数据

  const b = yield '第二次让权'                 // 输出: yield 传出 '第二次让权'
  console.log('5. 再次恢复, 收到:', b)        // 输出: 5. 再次恢复, 收到: 第二次传入

  return '执行完毕'
}

const gen = demoYield()

console.log('0. 创建 Generator（函数体未执行）')// 输出: 0. 创建 Generator（函数体未执行）
const r1 = gen.next()                          // 输出: 1. Generator 开始执行
console.log('2. 外部收到:', r1.value)          // 输出: 2. 外部收到: 第一次让权

const r2 = gen.next('传入的数据')              // 输出: 3. 恢复执行, 收到: 传入的数据
console.log('4. 外部收到:', r2.value)          // 输出: 4. 外部收到: 第二次让权

const r3 = gen.next('第二次传入')              // 输出: 5. 再次恢复, 收到: 第二次传入
console.log('6. 最终结果:', r3)                // 输出: 6. 最终结果: { value: '执行完毕', done: true }`

const yieldFlowOutput = `// 完整输出：
// 0. 创建 Generator（函数体未执行）
// 1. Generator 开始执行
// 2. 外部收到: 第一次让权
// 3. 恢复执行, 收到: 传入的数据
// 4. 外部收到: 第二次让权
// 5. 再次恢复, 收到: 第二次传入
// 6. 最终结果: { value: '执行完毕', done: true }`

const codeGeneratorBasic = `// 基本 Generator：可控制的计数器
function* counter() {
  let i = 0
  while (true) {
    // yield 暂停并传出当前值
    const increment = yield i
    // 恢复时接收 next() 传入的增量
    i += increment || 1
  }
}

const gen = counter()
console.log(gen.next())      // { value: 0, done: false }
console.log(gen.next(3))     // { value: 3, done: false } — 传入了增量 3
console.log(gen.next(2))     // { value: 5, done: false }
console.log(gen.next())      // { value: 6, done: false } — 默认增量 1

// gen.return() 提前终止
console.log(gen.return(100)) // { value: 100, done: true }

// gen.throw() 注入异常
function* errorProne() {
  try {
    yield '正常操作'
  } catch (err) {
    console.log('捕获到:', err.message) // 输出: 捕获到: 外部注入的错误
    yield '已处理错误'
  }
}
const gen2 = errorProne()
gen2.next()                           // { value: '正常操作', done: false }
gen2.throw(new Error('外部注入的错误')) // { value: '已处理错误', done: false }`

const codeBidirectional = `// yield 传出去，next() 传进来 — 对话式编程
function* conversation() {
  // 第一次 yield：向外打招呼
  const name = yield '你好！请问你叫什么名字？'
  console.log(\`内部收到名字: \${name}\`)           // 输出: 内部收到名字: 小明

  // 第二次 yield：用收到的名字继续对话
  const age = yield \`\${name}，你多大了？\`
  console.log(\`内部收到年龄: \${age}\`)             // 输出: 内部收到年龄: 18

  // 第三次 yield：最终回复
  yield \`\${name}，你 \${age} 岁了，成年了！\`
}

const chat = conversation()

// 第一轮：启动，获取问候语
console.log('Bob:', chat.next().value)            // 输出: Bob: 你好！请问你叫什么名字？

// 第二轮：传入名字，获取年龄询问
console.log('Alice:', chat.next('小明').value)    // 输出: Alice: 小明，你多大了？

// 第三轮：传入年龄，获取最终回复
console.log('Bob:', chat.next(18).value)          // 输出: Bob: 小明，你 18 岁了，成年了！`

const bidirectionalOutput = `// 对话流程：
// Bob: 你好！请问你叫什么名字？
// (内部收到名字: 小明)
// Alice: 小明，你多大了？
// (内部收到年龄: 18)
// Bob: 小明，你 18 岁了，成年了！`

const codeYieldStar = `// yield* 将迭代委托给另一个 Generator
function* numbers() {
  yield 1
  yield 2
  yield 3
}

function* letters() {
  yield 'a'
  yield 'b'
  yield 'c'
}

// 组合两个 Generator
function* combined() {
  yield* numbers()    // 委托给 numbers，逐个产出 1, 2, 3
  yield '---'
  yield* letters()    // 委托给 letters，逐个产出 'a', 'b', 'c'
}

console.log([...combined()])  // 输出: [1, 2, 3, '---', 'a', 'b', 'c']

// yield* 也支持 return 值的捕获
function* inner() {
  yield 1
  yield 2
  return 'inner done'  // 这个值可以被 yield* 捕获
}

function* outer() {
  const result = yield* inner()
  console.log('inner 返回值:', result)  // 输出: inner 返回值: inner done
  yield 3
}

console.log([...outer()])  // 输出: [1, 2, 3]`

const codeAsyncFlowControl = `// 🧵 用 Generator + Promise 模拟 async/await
function runAsync(generatorFunc) {
  const gen = generatorFunc()

  function handle(result) {
    if (result.done) return Promise.resolve(result.value)

    // 将 yield 的值包装为 Promise，完成后传回 Generator
    return Promise.resolve(result.value).then(
      res  => handle(gen.next(res)),   // 成功：把值传回去
      err  => handle(gen.throw(err))   // 失败：把错误抛回去
    )
  }

  try {
    return handle(gen.next())
  } catch (err) {
    return Promise.reject(err)
  }
}

// 使用：
// 注意：这里用的是 Generator，不是 async 函数！
const fetchUserAndPosts = runAsync(function* () {
  const user = yield fetch('/api/user').then(r => r.json())
  console.log('用户:', user)                     // 输出: 用户: { id: 1, name: '...' }

  const posts = yield fetch(\`/api/posts?userId=\${user.id}\`).then(r => r.json())
  console.log('帖子:', posts)                    // 输出: 帖子: [...]

  return { user, posts }
})

// 这就是 async/await 的本质！async 函数 ≈ runAsync(Generator 函数)`

const codeLazyEval = `// 无限斐波那契数列 — 惰性求值，按需计算
function* fibonacci() {
  let [prev, curr] = [0, 1]
  while (true) {
    yield curr  // 只在这里才计算
    ;[prev, curr] = [curr, prev + curr]
  }
}

const fib = fibonacci()

// 只取需要的值
const first10 = Array.from({ length: 10 }, () => fib.next().value)
console.log(first10)  // 输出: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// 按需获取第 50 个斐波那契数（不会计算前 50 个，而是"走到"第 50 个）
function nthFibonacci(n) {
  const fib = fibonacci()
  for (let i = 1; i < n; i++) fib.next()
  return fib.next().value
}
console.log(nthFibonacci(50)) // 输出: 12586269025`

const codeIdGenerator = `// 可递增、可重置的 ID 生成器
function* idGenerator(prefix = 'id') {
  let counter = 0
  while (true) {
    const reset = yield \`\${prefix}-\${++counter}\`
    // 如果传入 true，重置计数器
    if (reset === true) counter = 0
  }
}

const genId = idGenerator('user')

console.log(genId.next().value)   // 输出: user-1
console.log(genId.next().value)   // 输出: user-2
console.log(genId.next().value)   // 输出: user-3
console.log(genId.next(true).value) // 输出: user-1 (重置了！)
console.log(genId.next().value)   // 输出: user-2`

const codeGameAI = `// 🎮 游戏敌人 AI：巡逻 → 发现玩家 → 追击 → 攻击 → 撤退
function* enemyAI() {
  while (true) {
    console.log('🔍 巡逻中...')
    yield 'patrol'     // 巡逻状态，每帧检查
    yield 'patrol'

    console.log('👀 发现玩家！')
    yield 'alert'      // 警觉状态

    console.log('🏃 追击！')
    yield 'chase'      // 追击状态
    yield 'chase'

    console.log('⚔️ 攻击！')
    yield 'attack'     // 攻击状态

    console.log('💨 撤退...')
    yield 'retreat'    // 撤退状态
    yield 'retreat'
    // 循环回到巡逻
  }
}

// 游戏主循环中驱动 AI
const ai = enemyAI()
function gameLoop() {
  const currentState = ai.next().value
  // 根据 currentState 决定敌人的行为动画 / 移动
  console.log(\`当前 AI 状态: \${currentState}\`)  // 输出: 当前 AI 状态: patrol (每帧一轮)

  requestAnimationFrame(gameLoop) // 下一帧
}
// gameLoop()  // 启动游戏循环`
</script>
