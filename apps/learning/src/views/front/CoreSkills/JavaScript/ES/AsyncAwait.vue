<template>
  <div class="async-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚡ Async/Await 深度解析</h1>
          <p class="text-sm text-slate-500 mt-1">现代 JavaScript 异步编程的核心技术 — 让异步代码像同步一样自然</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/front/CoreSkills/JavaScript/ES/AsyncAwait.vue" label="📝 编辑"
            :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">ES2017</span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是 Async/Await？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>Async/Await</strong> 是 ES2017 (ES8) 引入的异步编程语法糖，建立在 Promise 之上。
          它让开发者可以用<strong>同步代码的书写方式</strong>来处理异步操作，从根本上解决了回调地狱（Callback Hell）和
          Promise 链式调用的可读性问题。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br />
            <strong>async/await</strong> 之于 Promise，就像 <strong>async/await in C#</strong> 之于 Task，或
            <strong>Python 的 async/await</strong> 之于 coroutine。<br />
            如果你用过 <strong>React 的 Suspense</strong> 或 <strong>Vue 3 的
              &lt;Suspense&gt;</strong>，它们内部也是基于类似的"等待异步完成再渲染"的理念。<br />
            <strong>核心思想：</strong>把"等结果"这件事从回调模式变成线性书写模式。
          </p>
        </aside>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方案</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">出现时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">可读性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">错误处理</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">回调函数</td>
                <td class="px-4 py-2 border border-slate-200">ES3</td>
                <td class="px-4 py-2 border border-slate-200">❌ 回调地狱</td>
                <td class="px-4 py-2 border border-slate-200">每层单独处理</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">Promise</td>
                <td class="px-4 py-2 border border-slate-200">ES6 (2015)</td>
                <td class="px-4 py-2 border border-slate-200">⚠️ 链式调用</td>
                <td class="px-4 py-2 border border-slate-200">.catch() 统一捕获</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">Async/Await</td>
                <td class="px-4 py-2 border border-slate-200">ES2017</td>
                <td class="px-4 py-2 border border-slate-200">✅ 同步风格</td>
                <td class="px-4 py-2 border border-slate-200">try/catch 原生支持</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 基本语法 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          基本语法与核心概念
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">2.1 async 关键字</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">async</code> 用于声明一个异步函数。
          无论函数体内是否使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">await</code>，
          async 函数<strong>始终返回一个 Promise</strong>。
        </p>

        <div class="mb-4">
          <Code language="js" :code="codeAsyncSyntax" title="async 函数声明方式" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">2.2 await 关键字</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">await</code> 只能在 async
          函数内部使用，
          用于"等待"一个 Promise 完成并<strong>直接获取其 resolve 的值</strong>。在 await 等待期间，JavaScript 引擎可以处理其他任务。
        </p>

        <div class="mb-4">
          <Code language="js" :code="codeBasicUsage" title="基本 await 用法" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>await 后面不一定要跟 Promise。如果跟的是普通值，它会直接被包装成
            <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Promise.resolve(value)</code> 然后立即返回。
          </p>
        </aside>
      </section>

      <!-- 3. 执行顺序 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          执行顺序与事件循环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          理解 async/await 的执行顺序需要结合<strong>事件循环（Event Loop）</strong>和<strong>微任务队列（Microtask Queue）</strong>。
          await 之后的代码相当于被放入了 <code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.then()</code> 回调中。
        </p>

        <!-- 执行流程步骤 -->
        <ol class="space-y-4 mb-6">
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>进入 async 函数</strong> — 同步执行 await 之前的代码，就像普通函数一样。</div>
          </li>
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>遇到 await 表达式</strong> — 计算 await 后面的表达式。如果是 Promise，暂停 async
              函数执行，将控制权返回给调用者。引擎可以继续执行调用栈中的其他同步代码。</div>
          </li>
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>Promise resolve</strong> — 当 await 的 Promise 完成时，await
              之后的代码作为微任务（microtask）被排入微任务队列。</div>
          </li>
          <li class="flex gap-3">
            <span
              class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>恢复执行</strong> — 当前宏任务和同步代码执行完毕后，微任务队列被清空，async 函数从暂停处恢复执行。</div>
          </li>
        </ol>

        <div class="mb-4">
          <Code language="js" :code="codeExecutionOrder" title="执行顺序示例" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="executionOutput" title="📟 输出结果" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键理解：</strong>await 不会阻塞主线程！它只是暂停当前 async 函数的执行，
            让出控制权给事件循环。这与同步阻塞（如 <code
              class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">while(true)</code>）完全不同。</p>
        </aside>
      </section>

      <!-- 4. 返回值处理 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          返回值与异常处理机制
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          async 函数的返回值有<strong>三种情况</strong>，每种都会被自动包装为 Promise：
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">✅ 返回普通值</h4>
            <p class="text-sm text-slate-600 mb-2">自动包装为 <code
                class="bg-slate-200 text-cyan-700 px-1 py-0.5 rounded text-xs">Promise.resolve(value)</code></p>
            <Code language="js" :code="codeReturnNormal" title="普通返回值" />
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">❌ 抛出异常</h4>
            <p class="text-sm text-slate-600 mb-2">自动包装为 <code
                class="bg-slate-200 text-cyan-700 px-1 py-0.5 rounded text-xs">Promise.reject(error)</code></p>
            <Code language="js" :code="codeReturnError" title="异常返回值" />
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">🔄 返回 Promise</h4>
            <p class="text-sm text-slate-600 mb-2">直接作为 async 函数的返回值，不会二次包装</p>
            <Code language="js" :code="codeReturnPromise" title="Promise 返回值" />
          </div>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>async 函数的返回值总是一个 Promise。调用方总是可以用
            <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">.then()</code> /
            <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">.catch()</code>
            或 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">await</code> 来处理结果。
          </p>
        </aside>
      </section>

      <!-- 5. 错误处理 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          错误处理策略
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Async/await 提供了<strong>三种错误处理方式</strong>，比纯 Promise 更加灵活和直观：
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">方式一：try/catch（推荐用于函数内部）</h3>
        <div class="mb-4">
          <Code language="js" :code="codeTryCatch" title="try/catch 错误处理" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">方式二：.catch() 链式调用</h3>
        <div class="mb-4">
          <Code language="js" :code="codeCatchChain" title=".catch() 链式调用" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">方式三：Go 风格错误处理（推荐用于多个独立操作）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">用 <code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.catch()</code> 包装每个
          await，让错误不抛异常而是作为值返回，类似 Go 的 <code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">val, err := ...</code> 模式：</p>
        <div class="mb-4">
          <Code language="js" :code="codeGoStyle" title="Go 风格错误处理" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>忘记处理 await 的 rejection！如果 Promise 被 reject 且没有
            try/catch 包裹，
            会触发 <strong>UnhandledPromiseRejection</strong>，在 Node.js 中可能导致进程崩溃。</p>
        </aside>

        <div class="mb-4">
          <Code language="js" :code="codeErrorScenarios" title="三种错误场景对比" />
        </div>
      </section>

      <!-- 6. 底层原理 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          底层原理：Generator + Promise 的语法糖
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Async/Await <strong>本质上是 Generator 函数 + 自动执行器</strong>的封装。理解这一点有助于你真正掌握它的行为。
          下面是一个简化版的 async/await 实现（类似 <code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">co</code> 库的原理）：
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2 text-center">Generator 版本</h4>
            <Code language="js" :code="codeGeneratorImpl" title="Generator + 手动执行器" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2 text-center">Async/Await 等价版本</h4>
            <Code language="js" :code="codeAsyncEquivalent" title="async/await 写法" />
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">编译转换过程</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>Babel/TypeScript 将 async 函数转换为 Generator 函数</li>
          <li>将每个 await 替换为 yield</li>
          <li>包装一个自动执行器（类似 co 库），递归调用 next() 处理每个 yield 的 Promise</li>
          <li>最终返回一个 Promise 供外部使用</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 扩展理解：</strong><br />
            如果你了解 <strong>Redux Saga</strong> 中 Generator 的使用方式，你会发现 async/await 其实就是 Saga 的简化版——不需要 Middleware 来驱动
            Generator，而是语言级别内置了执行器。<br />
            同样，<strong>Python 的 asyncio</strong> 也是同样的模式：<code
              class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">async def</code> + <code
              class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">await</code>，底层是 coroutine + event loop。
          </p>
        </aside>
      </section>

      <!-- 7. 高级模式 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          高级使用模式
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">7.1 串行 vs 并行执行</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">当有多个独立的异步操作时，串行 await 会显著降低性能。理解何时用并行的 <code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Promise.all()</code> 至关重要：</p>
        <div class="mb-4">
          <Code language="js" :code="codeSerialVsParallel" title="串行 vs 并行性能对比" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 性能陷阱：</strong>在 <code
              class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">for</code> /
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">forEach</code> 循环中使用 await
            会导致<strong>所有请求串行执行</strong>。
            如果需要并行，先用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">map()</code> 创建 Promise
            数组，再用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Promise.all()</code>。
          </p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">7.2 带超时的 await</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">原生 await 不支持超时，但可以用 Promise.race() 轻松实现：</p>
        <div class="mb-4">
          <Code language="js" :code="codeTimeout" title="带超时的 await" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">7.3 并发限制（并发池模式）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">当需要并发执行大量请求但又不希望压垮服务器时，可以用并发池限制同时执行的数量：</p>
        <div class="mb-4">
          <Code language="js" :code="codeConcurrencyPool" title="并发池模式" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">7.4 Top-Level Await (ES2022)</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">在 ES 模块的顶层作用域可以直接使用 await，不需要包裹在 async 函数中：</p>
        <div class="mb-4">
          <Code language="js" :code="codeTopLevelAwait" title="顶层 await" />
        </div>
      </section>

      <!-- 8. 常见陷阱 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见陷阱与反模式
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：forEach 中的 async 不会等待</strong><br />
              <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">[1,2,3].forEach(async (i) => { await delay(1000); console.log(i); })</code><br />
              forEach 的回调是 async 的，但 forEach 本身不会等待 Promise。使用 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">for...of</code> 替代。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：忘记 await，拿到的是 Promise 对象</strong><br />
              <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">const data = fetch('/api')</code> →
              data 是 Promise，不是响应数据。
              应该是 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">const data = await fetch('/api')</code>。<br />
              好在 ESLint 的 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">no-floating-promises</code> 规则可以检测此类问题。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：过度串行化</strong><br />
              两个互不依赖的 await 应该用 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Promise.all()</code> 并行执行，
              否则总耗时等于各操作耗时的<strong>总和</strong>而非<strong>最大值</strong>。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：async 函数中混合使用 .then()</strong><br />
              在 async 函数中既用 await 又用 .then() 会导致代码逻辑混乱。统一用一种风格。<br />
              例外：Promise.all()、Promise.race() 等组合器仍然推荐使用。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱五：未捕获的 Promise rejection</strong><br />
              async 函数中未被 try/catch 捕获的异常会变成 rejected Promise。如果调用方也没有 catch，就会产生 UnhandledPromiseRejection。
            </p>
          </aside>
        </div>
      </section>

      <!-- 9. 总结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          总结与使用建议
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 class="font-semibold text-emerald-800 mb-3">✅ 推荐做法</h4>
            <ul class="space-y-2 text-sm text-emerald-700">
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>用 try/catch 处理 async
                  函数内的错误</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>独立操作用 Promise.all()
                  并行执行</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>复杂异步流程用 async/await
                  替代 Promise 链</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>用
                  Promise.allSettled() 处理部分失败场景</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>在调用链末端添加 .catch()
                  作为兜底</span></li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-4 border border-red-200">
            <h4 class="font-semibold text-red-800 mb-3">❌ 避免做法</h4>
            <ul class="space-y-2 text-sm text-red-700">
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>在 forEach 中使用
                  async/await</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>不相关的操作串行 await</span>
              </li>
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>async 函数中同时混用 await 和
                  .then()</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>忘记处理 await 的
                  rejection</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>在不需要顺序执行的场景使用 for...of +
                  await</span></li>
            </ul>
          </div>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong>Async/Await 是现代 JavaScript
            异步编程的<strong>首选方案</strong>。
            它让异步代码拥有了同步代码的可读性和错误处理能力，同时保留了非阻塞的特性。掌握它，你就掌握了现代 JS 开发的半壁江山。</p>
        </div>
      </section>
    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <RouterLink to="/front/CoreSkills/JavaScript/ES/PromiseAdvanced"
          class="text-slate-500 hover:text-cyan-600 text-sm flex items-center gap-1 transition-colors">← 上一节：Promise 进阶
        </RouterLink>
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
  { id: "sec-1", name: "什么是 Async/Await" },
  { id: "sec-2", name: "基本语法与核心概念" },
  { id: "sec-3", name: "执行顺序与事件循环" },
  { id: "sec-4", name: "返回值与异常处理机制" },
  { id: "sec-5", name: "错误处理策略" },
  { id: "sec-6", name: "底层原理" },
  { id: "sec-7", name: "高级使用模式" },
  { id: "sec-8", name: "常见陷阱与反模式" },
  { id: "sec-9", name: "总结与使用建议" },
]

// ==================== 代码示例 ====================

const codeAsyncSyntax = `// async 函数声明 — 四种形式
// 1. 函数声明
async function fetchData() {
  return 'data'
}

// 2. 函数表达式
const fetchData = async function() {
  return 'data'
}

// 3. 箭头函数
const fetchData = async () => {
  return 'data'
}

// 4. 对象方法
const api = {
  async fetchData() {
    return 'data'
  }
}

// 5. 类方法
class ApiClient {
  async fetchData() {
    return 'data'
  }
}`

const codeBasicUsage = `// 模拟异步请求
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Alice', age: 28 }) // 输出: 模拟 API 返回
    }, 1000)
  })
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]) // 输出: 模拟帖子列表
    }, 1000)
  })
}

async function loadUserPage(userId) {
  console.log('开始加载...')           // 输出: 开始加载...

  // await 暂停函数执行，等待 Promise resolve
  const user = await fetchUser(userId)
  console.log('用户:', user)          // 输出: 用户: { id: 1, name: 'Alice', age: 28 }

  // 使用上一步的结果
  const posts = await fetchPosts(user.id)
  console.log('帖子:', posts)         // 输出: 帖子: [{ id: 1, title: 'Post 1' }, ...]

  return { user, posts }
}

// 调用
loadUserPage(1).then(result => {
  console.log('最终结果:', result)    // 输出: 最终结果: { user: {...}, posts: [...] }
})`

const codeExecutionOrder = `async function demo() {
  console.log('2. async 函数开始（同步部分）')   // 输出: 2. async 函数开始（同步部分）

  // await 后的表达式立即执行（同步），但 await 暂停函数
  const result = await new Promise(resolve => {
    console.log('3. Promise 构造函数同步执行')   // 输出: 3. Promise 构造函数同步执行
    setTimeout(() => {
      console.log('5. setTimeout 回调（宏任务）')// 输出: 5. setTimeout 回调（宏任务）
      resolve('done')
    }, 0)
  })

  // await 之后 = 微任务
  console.log('6. await 恢复（微任务）:', result)// 输出: 6. await 恢复（微任务）: done
  return result
}

console.log('1. 同步代码开始')                   // 输出: 1. 同步代码开始
demo()
console.log('4. 同步代码继续（await 不阻塞）')   // 输出: 4. 同步代码继续（await 不阻塞）`

const executionOutput = `// 完整输出顺序：
// 1. 同步代码开始
// 2. async 函数开始（同步部分）
// 3. Promise 构造函数同步执行
// 4. 同步代码继续（await 不阻塞）
// 5. setTimeout 回调（宏任务）
// 6. await 恢复（微任务）: done`

const codeReturnNormal = `async function getNumber() {
  return 42
  // 等价于: return Promise.resolve(42)
}

getNumber().then(v => console.log(v)) // 输出: 42`

const codeReturnError = `async function mightFail() {
  throw new Error('出错了！')
  // 等价于: return Promise.reject(new Error('出错了！'))
}

mightFail().catch(err => console.error(err.message)) // 输出: 出错了！`

const codeReturnPromise = `async function proxyFetch(url) {
  // 直接返回 Promise，不会再包装一层
  return fetch(url)
}

// 等价于不使用 async：
function proxyFetch(url) {
  return fetch(url)
}

// 注意：如果 return await fetch(url)，会多等一个微任务（有细微差异）`

const codeTryCatch = `async function fetchUserSafe(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`)

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
    }

    const data = await response.json()
    return { success: true, data }

  } catch (error) {
    // 网络错误、JSON 解析错误、HTTP 错误都会到这里
    console.error('请求失败:', error.message)
    return { success: false, error: error.message }
  }
}`

const codeCatchChain = `async function fetchData(url) {
  const response = await fetch(url)
  return response.json()
}

// 在调用处处理错误
fetchData('/api/users')
  .then(data => console.log('成功:', data))
  .catch(err => console.error('失败:', err))
  .finally(() => console.log('请求结束'))`

const codeGoStyle = `// Go 风格：错误作为值返回 [result, error]
async function to(promise) {
  try {
    const data = await promise
    return [data, null]    // 输出: 成功时 error 为 null
  } catch (error) {
    return [null, error]   // 输出: 失败时 data 为 null
  }
}

// 使用
async function loadPage() {
  const [user, userErr] = await to(fetchUser(1))
  if (userErr) return console.error('用户加载失败:', userErr)

  const [posts, postsErr] = await to(fetchPosts(user.id))
  if (postsErr) return console.error('帖子加载失败:', postsErr)

  console.log('全部成功:', { user, posts })  // 输出: 全部成功: { user: {...}, posts: [...] }
}`

const codeErrorScenarios = `// 场景1: 单个操作 — try/catch 最简洁
async function singleOp() {
  try {
    const data = await fetch('/api/data').then(r => r.json())
    return data
  } catch (err) {
    console.error('失败:', err)
    return null  // 降级处理
  }
}

// 场景2: 多个独立操作 — Promise.allSettled（不会因一个失败而全部中断）
async function multiOps() {
  const results = await Promise.allSettled([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments'),
  ])

  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      console.log(\`请求\${i} 成功:\`, r.value)  // 输出: 请求0 成功: Response {...}
    } else {
      console.error(\`请求\${i} 失败:\`, r.reason)// 输出: 请求2 失败: TypeError: ...
    }
  })
}

// 场景3: 依赖操作 — 内层 try/catch 精确控制错误范围
async function dependentOps() {
  try {
    const user = await fetchUser(1)
    // 这一步失败不影响获取 user 的结果
    let posts = []
    try {
      posts = await fetchPosts(user.id)
    } catch (err) {
      console.warn('帖子加载失败，使用空列表:', err.message)
    }
    return { user, posts } // posts 可能是空数组
  } catch (err) {
    // 只有 fetchUser 失败才会到这里
    console.error('用户加载失败，无法继续:', err)
    return null
  }
}`

const codeGeneratorImpl = `// 手动实现 async/await 执行器（简化版 co 库）
function asyncToGenerator(generatorFunc) {
  return function(...args) {
    const gen = generatorFunc.apply(this, args)

    return new Promise((resolve, reject) => {
      // 递归驱动 Generator
      function step(key, arg) {
        let result
        try {
          result = gen[key](arg)  // next() 或 throw()
        } catch (error) {
          return reject(error)
        }

        const { value, done } = result

        if (done) {
          return resolve(value)  // Generator 完成
        }

        // 如果 yield 的是 Promise，等它完成再继续
        return Promise.resolve(value).then(
          val => step('next', val),  // 把值传回 Generator
          err => step('throw', err)  // 把错误抛回 Generator
        )
      }

      step('next')  // 启动
    })
  }
}

// 使用 Generator 函数
const fetchData = asyncToGenerator(function* () {
  const response = yield fetch('/api/data')
  const data = yield response.json()
  return data
})`

const codeAsyncEquivalent = `// async/await 版本（语言层面内置了上面的执行器）
async function fetchData() {
  const response = await fetch('/api/data')
  const data = await response.json()
  return data
}

// 两者行为完全一致！`

const codeSerialVsParallel = `// ❌ 串行执行：总耗时 = 300ms + 200ms + 100ms = 600ms
async function serial() {
  const user = await delay(300).then(() => '用户')      // 等待 300ms
  const posts = await delay(200).then(() => '帖子')     // 等待 200ms
  const comments = await delay(100).then(() => '评论')  // 等待 100ms
  return { user, posts, comments }
}

// ✅ 并行执行：总耗时 = max(300ms, 200ms, 100ms) = 300ms
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    delay(300).then(() => '用户'),
    delay(200).then(() => '帖子'),
    delay(100).then(() => '评论'),
  ])
  return { user, posts, comments }
}

// ✅ 部分依赖：先获取用户，再并行获取用户的帖子和评论
async function mixed() {
  const user = await fetchUser(1)     // 先等 300ms
  // 拿到 userId 后，帖子和评论可以并行
  const [posts, comments] = await Promise.all([
    fetchPosts(user.id),              // 200ms
    fetchComments(user.id),           // 150ms
  ])
  return { user, posts, comments }
  // 总耗时 = 300ms + max(200ms, 150ms) = 500ms
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}`

const codeTimeout = `// 给任何 Promise 加上超时限制
function withTimeout(promise, ms, errorMsg = '操作超时') {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(errorMsg)), ms)
  )
  return Promise.race([promise, timeout])
}

// 使用
async function fetchWithTimeout(url, timeoutMs = 5000) {
  try {
    const response = await withTimeout(
      fetch(url),
      timeoutMs,
      \`请求 \${url} 超时 (\${timeoutMs}ms)\`
    )
    return await response.json()
  } catch (err) {
    if (err.message.includes('超时')) {
      console.warn('请求超时，使用缓存数据')
      return getCachedData(url)
    }
    throw err
  }
}`

const codeConcurrencyPool = `// 并发池：限制同时执行的 Promise 数量
async function asyncPool(limit, items, fn) {
  const results = []
  const executing = new Set()

  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item))
    results.push(p)
    executing.add(p)

    const clean = () => executing.delete(p)
    p.then(clean, clean)  // 完成或失败后从 executing 中移除

    if (executing.size >= limit) {
      await Promise.race(executing)  // 等待任意一个完成
    }
  }

  return Promise.all(results)
}

// 使用：最多同时 3 个请求
const urls = ['url1', 'url2', 'url3', 'url4', 'url5']
const results = await asyncPool(3, urls, async (url) => {
  console.log(\`开始: \${url}\`)             // 输出: 开始: url1 (同时开始 url2, url3)
  const res = await fetch(url)
  console.log(\`完成: \${url}\`)             // 输出: 完成: url1 (然后开始 url4)
  return res.json()
})`

const codeTopLevelAwait = `// 📄 module.mjs (ES 模块)

// ✅ 顶层 await — 无需 async 函数包裹
const response = await fetch('https://api.example.com/config')
export const config = await response.json()

// ✅ 动态导入也可以用顶层 await
const { default: lodash } = await import('lodash')

// ✅ 条件导入
const lib = someCondition
  ? await import('./module-a.js')
  : await import('./module-b.js')

// ⚠️ 注意：
// 1. 只在 ES 模块 (.mjs 或 type="module") 中可用
// 2. 顶层 await 会阻塞模块的执行，直到 Promise resolve
// 3. 依赖该模块的其他模块也会等待
// 4. CommonJS 不支持顶层 await`
</script>
