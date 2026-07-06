<template>
  <div class="generator-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚙️ 生成器底层原理：执行上下文栈与协程调度</h1>
          <p class="text-sm text-slate-500 mt-1">深入 JS 引擎 — 理解 Generator 如何在调用栈中实现暂停与恢复</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/front/CoreSkills/JavaScript/ES/TheUnderlyingPrincipleOfCoroutines.vue" label="📝 编辑" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">深度原理</span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是生成器 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是生成器（Generator）？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>生成器函数</strong>（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">function*</code>）是 ES6 引入的一种<strong>可暂停和恢复</strong>的特殊函数。
          从实现角度看，生成器本质是一个<strong>携带状态的迭代器</strong>——每次调用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code> 方法，
          它都会从上次暂停的地方继续执行，直到遇见下一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">yield</code> 表达式或函数结束。
        </p>

        <div class="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800">
            <span class="inline-block bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mr-2">协程</span>
            生成器是 JavaScript 对<strong>半协程（semi-coroutine）</strong>的一种实现。它允许函数执行中途让出控制权，
            并在之后重新获取控制权，而整个过程发生在<strong>单线程</strong>内。
          </p>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 底层视角：</strong><br/>
          本文聚焦于<strong>JS 引擎内部</strong>的实现机制——执行上下文栈如何管理 Generator 的暂停和恢复，
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">[[GeneratorContext]]</code> 和 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">[[GeneratorState]]</code>
          内部槽位如何工作。<br/>
          如果你只想了解 Generator 的 API 用法，请先阅读 <strong>Generator 基础</strong>和<strong>协程与 Yield</strong> 文档。
          </p>
        </aside>
      </section>

      <!-- 2. 执行上下文栈深度解析 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          核心机制：执行上下文栈与 Generator 调度
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          要理解 Generator 的底层原理，必须先理解 <strong>JavaScript 执行上下文栈（Execution Context Stack / Call Stack）</strong>。
          普通函数调用会将新的执行上下文推入栈顶，函数返回时弹出。但 Generator 函数的行为截然不同。
        </p>

        <!-- 栈状态可视化 -->
        <div class="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200">
          <h4 class="font-semibold text-slate-700 mb-3 text-center">🖥️ 调用栈状态演示</h4>
          <div class="flex justify-center gap-3 mb-4">
            <button
              v-for="s in stackStates"
              :key="s.value"
              @click="stackState = s.value"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border',
                stackState === s.value
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-teal-50 hover:text-teal-600'
              ]"
            >
              {{ s.label }}
            </button>
          </div>
          <div class="flex flex-col-reverse gap-2 max-w-sm mx-auto">
            <div class="px-3 py-2 rounded-md border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500 text-center">
              全局执行上下文（栈底）
            </div>
            <div
              v-if="stackState === 'executing'"
              class="px-3 py-2 rounded-md border border-blue-300 bg-blue-50 text-sm text-blue-700 font-semibold text-center"
            >
              Generator 执行上下文 ⬆️ 栈顶（运行中）
            </div>
            <div
              v-else-if="stackState === 'suspended'"
              class="px-3 py-2 rounded-md border border-amber-300 bg-amber-50 text-sm text-amber-700 font-semibold text-center"
            >
              📦 Generator 上下文已保存到堆（不在栈中）
            </div>
            <div
              v-else
              class="px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-400 text-center"
            >
              Generator 上下文已销毁（completed）
            </div>
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-4">完整的 Generator 生命周期（5 步）</h3>
        <ol class="space-y-4 mb-6">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">
              <strong>创建 Generator 对象</strong> — 调用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">function*</code> 不会立即执行函数体。
              引擎创建一个 <strong>Generator 对象</strong>，其内部槽位 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorContext]]</code>
              保存了函数的执行上下文（包括代码位置、词法环境、变量状态），但该上下文<strong>不推入调用栈</strong>，处于 suspendedStart 状态。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">
              <strong>首次调用 next()</strong> — 引擎将 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorContext]]</code> 中保存的上下文重新推入调用栈栈顶，
              <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorState]]</code> 变为 executing。
              函数体开始执行，直到遇到第一个 yield。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600">
              <strong>遇到 yield 表达式</strong> — 引擎执行 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">GeneratorYield</code> 抽象操作：
              将当前执行上下文<strong>从栈顶移除</strong>，并把<strong>代码位置、词法环境、变量状态</strong>完整保存回
              <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorContext]]</code>（保存在堆内存中）。
              状态变为 suspendedYield。yield 右侧的值包装为 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{ value, done: false }</code> 返回给调用者。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600">
              <strong>再次调用 next(value)</strong> — 引擎从 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorContext]]</code> 恢复上下文并推入栈顶。
              next() 的参数 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">value</code> 作为<strong>上一次 yield 表达式的返回值</strong>在生成器内部可用。
              状态变回 executing，重复步骤 3-4。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600">
              <strong>函数 return 或执行完毕</strong> — <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorContext]]</code> 被销毁，
              <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorState]]</code> 变为 completed。
              此后所有 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code> 调用都返回
              <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{ value: undefined, done: true }</code>。
            </div>
          </li>
        </ol>

        <div class="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>💡 核心洞察：</strong>正是这种<strong>"保存执行上下文到堆 → 从栈弹出 → 从堆恢复 → 重新推入栈"</strong>的机制，
          让 Generator 函数可以跨越多个调用栈帧实现暂停与恢复。因为上下文保存在<strong>堆内存</strong>中而非栈中，Generator 可以<strong>跨多个事件循环 tick</strong> 恢复执行。</p>
        </div>

        <div class="mb-4">
          <Code language="js" :code="codeContextDemo" title="用代码追踪上下文切换" />
        </div>
      </section>

      <!-- 3. 内部状态机 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          生成器的内部状态机
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          ECMAScript 规范定义了 Generator 对象的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[[GeneratorState]]</code> 内部槽位，
          它严格遵循以下状态机。Generator <strong>在任何时刻只能处于其中一个状态</strong>。
        </p>

        <div class="overflow-x-auto mb-6">
          <div class="flex items-center flex-wrap gap-3 min-w-[600px] justify-center">
            <div class="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[110px]"
              :class="{ 'ring-2 ring-teal-500 bg-teal-50': genState === 'suspendedStart' }">
              <div class="font-semibold text-sm text-slate-700">suspendedStart</div>
              <div class="text-xs text-slate-500 mt-1">初始暂停</div>
            </div>
            <span class="text-teal-600 font-bold cursor-pointer hover:text-teal-800 text-sm" @click="genState = 'executing'">→ next() →</span>
            <div class="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[110px]"
              :class="{ 'ring-2 ring-teal-500 bg-teal-50': genState === 'executing' }">
              <div class="font-semibold text-sm text-slate-700">executing</div>
              <div class="text-xs text-slate-500 mt-1">正在执行</div>
            </div>
            <span class="text-teal-600 font-bold cursor-pointer hover:text-teal-800 text-sm" @click="genState = 'suspendedYield'">→ yield →</span>
            <div class="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[110px]"
              :class="{ 'ring-2 ring-teal-500 bg-teal-50': genState === 'suspendedYield' }">
              <div class="font-semibold text-sm text-slate-700">suspendedYield</div>
              <div class="text-xs text-slate-500 mt-1">yield 暂停</div>
            </div>
            <span class="text-teal-600 font-bold cursor-pointer hover:text-teal-800 text-sm" @click="genState = 'completed'">→ return →</span>
            <div class="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[110px]"
              :class="{ 'ring-2 ring-teal-500 bg-teal-50': genState === 'completed' }">
              <div class="font-semibold text-sm text-slate-700">completed</div>
              <div class="text-xs text-slate-500 mt-1">执行完毕</div>
            </div>
          </div>
        </div>
        <p class="text-xs text-slate-500 text-center">👆 点击箭头可切换状态</p>

        <div class="mb-4 mt-4">
          <Code language="js" :code="codeStateMachine" title="状态机实现示例：红绿灯" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 重要限制：</strong>Generator 处于 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">executing</code>
          状态时<strong>不可重入</strong>。如果此时再调用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">next()</code>，会抛出 TypeError。
          这保证了 Generator 在单线程中的执行安全性。</p>
        </aside>
      </section>

      <!-- 4. 双向数据通道 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          yield 与 next() 的双向数据通道
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Generator 最强大的特性之一是 <strong>yield 和 next() 之间的双向通信</strong>。这种双向通道使得 Generator 可以作为一种"对话式"编程模型。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div class="text-sm font-semibold text-blue-700 mb-2">📤 传出通道</div>
            <code class="text-sm font-mono text-blue-800 block mb-2">yield 表达式</code>
            <p class="text-sm text-blue-700">yield 右侧表达式的值 → 包装到 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">next()</code> 返回对象的 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">value</code> 传出</p>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-sm font-semibold text-emerald-700 mb-2">📥 传入通道</div>
            <code class="text-sm font-mono text-emerald-800 block mb-2">next(arg)</code>
            <p class="text-sm text-emerald-700">next() 的参数 → 成为<strong>上一次</strong> yield 表达式的结果值，在 Generator 内部恢复后可用</p>
          </div>
        </div>

        <div class="mb-4">
          <Code language="js" :code="codeBidirectionalDeep" title="双向数据通道详解" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆技巧：</strong>第一次 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">next()</code> 的参数会被<strong>忽略</strong>
          （还没有 yield 来接收它）。从第二次开始，<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">next(x)</code> 中的 x 会替换<strong>上一次 yield</strong> 的位置。</p>
        </aside>
      </section>

      <!-- 5. yield* 委托机制 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          yield* 委托与异常传播
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">yield*</code> 将迭代委托给另一个 Generator 或可迭代对象。
          底层会自动处理 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">return()</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">throw()</code> 的转发。
        </p>

        <div class="mb-4">
          <Code language="js" :code="codeYieldStarDeep" title="yield* 委托与异常传播" />
        </div>
      </section>

      <!-- 6. 实战：异步流程控制 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          实战：用 Generator 实现异步流程控制
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这是 Generator 最经典的应用——手动驱动 Generator，在 yield 处等待 Promise，将 resolve 的值传回。
          这就是 <strong>async/await 的底层模型</strong>。
        </p>

        <div class="mb-4">
          <Code language="js" :code="codeAsyncRunner" title="完整异步执行器（co 库简化版）" />
        </div>

        <div class="mb-4">
          <Code language="js" :code="codeAsyncUsage" title="使用方式（像 async/await 一样自然）" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 历史背景：</strong><br/>
          在 ES2017 之前，<strong>co 库</strong>（TJ Holowaychuk）就是基于这个原理让开发者用 Generator 写异步代码。
          <strong>Koa v1</strong> 的中间件洋葱模型也是基于 Generator + co。<br/>
          ES2017 的 async/await 把这个模式<strong>内置到了语言层面</strong>，性能更好（引擎直接优化），语义更清晰。
          </p>
        </aside>
      </section>

      <!-- 7. 惰性求值 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          惰性求值与无限序列
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Generator 只在调用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code> 时才计算下一个值。
          结合 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">while(true)</code> 和 yield，可以安全地表达<strong>无限序列</strong>而不会死循环。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">斐波那契数列（无限）</h4>
            <Code language="js" :code="codeFibonacci" title="惰性斐波那契" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">素数生成器（无限）</h4>
            <Code language="js" :code="codePrimes" title="惰性素数序列" />
          </div>
        </div>

        <div class="mb-4">
          <Code language="js" :code="codeLazyPipeline" title="函数式惰性管道" />
        </div>
      </section>

      <!-- 8. 关键要点 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          关键要点与注意事项
        </h2>

        <div class="space-y-3 mb-6">
          <div class="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span class="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
            <span class="text-sm text-amber-800">Generator 上下文保存在<strong>堆内存</strong>中，不会随调用栈弹出而销毁，因此可以<strong>跨多次事件循环恢复</strong>。</span>
          </div>
          <div class="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span class="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
            <span class="text-sm text-amber-800">Generator 是单线程模型下的<strong>协作式多任务</strong>，并非真正的并行。引擎绝不会抢占 Generator 的执行，只有显式 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">yield</code> 才能让出控制权。</span>
          </div>
          <div class="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span class="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
            <span class="text-sm text-amber-800"><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">yield*</code> 底层自动转发内外 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">next()</code>、<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">return()</code> 和 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">throw()</code>。</span>
          </div>
          <div class="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span class="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
            <span class="text-sm text-amber-800"><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">gen.return()</code> 和 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">gen.throw()</code> 可以提前终止 Generator 或向其内部注入异常，这是 Generator 完成清理工作的关键。</span>
          </div>
          <div class="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span class="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
            <span class="text-sm text-amber-800">避免在 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">finally</code> 块中使用 yield（会导致行为复杂难以预测）。如果确实需要，要确保异常处理路径的正确性。</span>
          </div>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong>Generator 的原理就是
          <strong>"把执行上下文从栈上搬到堆里，需要时再搬回来"</strong>。这个看似简单的机制，
          衍生出了惰性求值、无限序列、异步流程控制、状态机、双向通信等一系列强大的编程模式。</p>
        </div>
      </section>
    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <RouterLink to="/front/CoreSkills/JavaScript/ES/CoroutineAndYield" class="text-slate-500 hover:text-cyan-600 text-sm flex items-center gap-1 transition-colors">← 上一节：协程与 Yield 让权机制</RouterLink>
        <RouterLink to="/front/CoreSkills/JavaScript/ES/AsyncAwait" class="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1 transition-colors">下一节：Async/Await 深度解析 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "什么是生成器" },
  { id: "sec-2", name: "执行上下文栈与调度" },
  { id: "sec-3", name: "内部状态机" },
  { id: "sec-4", name: "双向数据通道" },
  { id: "sec-5", name: "yield* 委托与异常传播" },
  { id: "sec-6", name: "实战：异步流程控制" },
  { id: "sec-7", name: "惰性求值与无限序列" },
  { id: "sec-8", name: "关键要点与注意事项" },
]

// 栈状态演示
type StackView = 'executing' | 'suspended' | 'completed'
const stackState = ref<StackView>('suspended')
const stackStates = [
  { value: 'executing' as StackView, label: '▶ 执行中' },
  { value: 'suspended' as StackView, label: '⏸ 暂停' },
  { value: 'completed' as StackView, label: '⏹ 结束' },
]

// 状态机演示
type GenStateType = 'suspendedStart' | 'executing' | 'suspendedYield' | 'completed'
const genState = ref<GenStateType>('suspendedStart')

// ==================== 代码示例 ====================

const codeContextDemo = `// 🔬 追踪 Generator 的上下文切换
function* traceContext() {
  console.log('[Generator] 1. 进入函数体（上下文在栈顶）')     // 输出: [Generator] 1. 进入函数体

  const a = yield '第一次暂停'
  console.log('[Generator] 3. 恢复，a =', a)                  // 输出: [Generator] 3. 恢复，a = 100

  const b = yield '第二次暂停'
  console.log('[Generator] 5. 恢复，b =', b)                  // 输出: [Generator] 5. 恢复，b = 200

  return a + b  // 输出: return 300
}

console.log('[外部] 0. 创建 Generator（函数体未执行）')        // 输出: [外部] 0. 创建 Generator
const gen = traceContext()

console.log('[外部] 调用第一次 next()')
const r1 = gen.next() // 输出: [Generator] 1. 进入函数体
console.log('[外部] 2. 收到:', r1.value)                      // 输出: [外部] 2. 收到: 第一次暂停

console.log('[外部] 调用第二次 next(100)')
const r2 = gen.next(100) // 输出: [Generator] 3. 恢复，a = 100
console.log('[外部] 4. 收到:', r2.value)                      // 输出: [外部] 4. 收到: 第二次暂停

console.log('[外部] 调用第三次 next(200)')
const r3 = gen.next(200) // 输出: [Generator] 5. 恢复，b = 200
console.log('[外部] 6. 最终:', r3)                            // 输出: [外部] 6. 最终: { value: 300, done: true }`

const codeStateMachine = `// 🤖 Generator 天然适合实现状态机
function* trafficLight() {
  while (true) {
    yield '🔴 RED'    // 状态1 → 输出: 🔴 RED
    yield '🟡 YELLOW' // 状态2 → 输出: 🟡 YELLOW
    yield '🟢 GREEN'  // 状态3 → 输出: 🟢 GREEN
    // 自动循环回到 RED
  }
}

const light = trafficLight()
// 每调用一次 next()，状态前进一步
console.log(light.next().value) // 🔴 RED
console.log(light.next().value) // 🟡 YELLOW
console.log(light.next().value) // 🟢 GREEN
console.log(light.next().value) // 🔴 RED (循环！)
// while(true) 不会死循环，因为 yield 会暂停`

const codeBidirectionalDeep = `// 📡 双向通信：构建对话式流程
function* calculator() {
  // 第一次 yield：发送初始提示
  const a = yield '请输入第一个数字'
  console.log(\`[内部] 收到第一个数: \${a}\`)           // 输出: [内部] 收到第一个数: 10

  // 第二次 yield：发送操作符询问
  const op = yield \`已收到 \${a}，请输入运算符 (+, -, *, /)\`
  console.log(\`[内部] 收到运算符: \${op}\`)             // 输出: [内部] 收到运算符: *

  // 第三次 yield：发送第二个数询问
  const b = yield \`已收到 \${a} \${op} ?，请输入第二个数字\`
  console.log(\`[内部] 收到第二个数: \${b}\`)            // 输出: [内部] 收到第二个数: 5

  // 计算并返回结果
  let result
  switch (op) {
    case '+': result = a + b; break
    case '-': result = a - b; break
    case '*': result = a * b; break
    case '/': result = a / b; break
    default: throw new Error('无效运算符')
  }

  // 第四次 yield：发送结果
  yield \`\${a} \${op} \${b} = \${result}\`
  return result
}

const calc = calculator()

// 交互过程
console.log(calc.next().value)          // 输出: 请输入第一个数字
console.log(calc.next(10).value)        // 输出: 已收到 10，请输入运算符 (+, -, *, /)
console.log(calc.next('*').value)       // 输出: 已收到 10 * ?，请输入第二个数字
console.log(calc.next(5).value)         // 输出: 10 * 5 = 50`

const codeYieldStarDeep = `// yield* 委托与异常传播详解
function* innerGen() {
  try {
    yield 1
    yield 2
    return 'inner-result'
  } catch (err) {
    console.log('inner 捕获异常:', err.message)  // 输出: inner 捕获异常: 外部注入的错误
    yield 'error-handled'
  }
}

function* outerGen() {
  yield 'start'

  // yield* 委托 — 自动转发 next/return/throw
  const innerReturn = yield* innerGen()
  console.log('inner 返回值:', innerReturn)       // 输出: inner 返回值: inner-result

  yield 'end'
}

const outer = outerGen()
console.log(outer.next().value)   // 输出: start
console.log(outer.next().value)   // 输出: 1
console.log(outer.next().value)   // 输出: 2

// throw() — 异常会传播到内层 Generator
console.log(outer.throw(new Error('外部注入的错误')).value)
// 输出: inner 捕获异常: 外部注入的错误
// 输出: error-handled

console.log(outer.next().value)   // 输出: end
console.log(outer.next().done)    // 输出: true`

const codeAsyncRunner = `// 🧵 完整的 Generator → Promise 执行器（co 库的核心理念）
function co(generatorFunc) {
  const gen = generatorFunc()

  return new Promise((resolve, reject) => {
    function step(nextFunc) {
      let result
      try {
        result = nextFunc()
      } catch (err) {
        return reject(err)
      }

      const { value, done } = result

      if (done) {
        return resolve(value)
      }

      // 关键：yield 的值包装成 Promise，完成后继续
      Promise.resolve(value).then(
        val => step(() => gen.next(val)),   // 成功 → 传回 Generator
        err => step(() => gen.throw(err))   // 失败 → 抛回 Generator
      )
    }

    step(() => gen.next())  // 启动
  })
}`

const codeAsyncUsage = `// 使用 co 执行器 — 和 async/await 几乎一样
co(function* () {
  // 像 await 一样使用 yield
  const user = yield fetch('/api/user').then(r => r.json())
  console.log('用户:', user.name)               // 输出: 用户: Alice

  const posts = yield fetch(\`/api/posts?userId=\${user.id}\`).then(r => r.json())
  console.log('帖子数:', posts.length)           // 输出: 帖子数: 10

  // yield 同步值也可以（会被 Promise.resolve 包装）
  const computed = yield user.name.toUpperCase()
  console.log('大写:', computed)                 // 输出: 大写: ALICE

  // try/catch 也能正常工作
  try {
    yield Promise.reject(new Error('模拟错误'))
  } catch (err) {
    console.log('捕获到错误:', err.message)       // 输出: 捕获到错误: 模拟错误
  }

  return { user, posts }
}).then(result => {
  console.log('最终结果:', result)               // 输出: 最终结果: { user: {...}, posts: [...] }
}).catch(err => {
  console.error('未捕获的错误:', err)
})`

const codeFibonacci = `function* fibonacci() {
  let [prev, curr] = [0, 1]
  while (true) {
    yield curr
    ;[prev, curr] = [curr, prev + curr]
  }
}

const fib = fibonacci()
const first10 = Array.from({ length: 10 }, () => fib.next().value)
console.log(first10)  // 输出: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// 按需取第 77 个斐波那契数，前面的值不会占用内存
function nthFib(n) {
  const fib = fibonacci()
  for (let i = 1; i < n; i++) fib.next()
  return fib.next().value
}
console.log(nthFib(77))  // 输出: 5527939700884757`

const codePrimes = `// 无限素数序列（惰性求值）
function* primes() {
  yield 2
  const seen = [2]
  let candidate = 3

  while (true) {
    const sqrt = Math.sqrt(candidate)
    let isPrime = true

    for (const p of seen) {
      if (p > sqrt) break
      if (candidate % p === 0) { isPrime = false; break }
    }

    if (isPrime) {
      seen.push(candidate)
      yield candidate
    }
    candidate += 2 // 跳过偶数
  }
}

const p = primes()
console.log(p.next().value) // 2
console.log(p.next().value) // 3
console.log(p.next().value) // 5
console.log(p.next().value) // 7
// ... 可以无限取下去`

const codeLazyPipeline = `// 🔗 惰性管道：map → filter → take，全部惰性求值
function* map(iterable, fn) {
  for (const item of iterable) yield fn(item)
}

function* filter(iterable, predicate) {
  for (const item of iterable) if (predicate(item)) yield item
}

function* take(iterable, n) {
  let count = 0
  for (const item of iterable) {
    if (count++ >= n) return
    yield item
  }
}

// 组合管道 — 每个操作都是惰性的
// 只在 take 取够 N 个时才停止，不会计算不需要的值
const nums = function* () { let i = 0; while (true) yield i++ }
const pipeline = take(
  filter(
    map(nums(), x => x * x),  // 平方
    x => x % 2 === 0           // 只取偶数
  ),
  5  // 只取前 5 个
)

console.log([...pipeline])  // 输出: [0, 4, 16, 36, 64]
// 只计算了需要的值，nums() 是无限的但不会死循环`
</script>
