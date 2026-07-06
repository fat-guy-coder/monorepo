<template>
  <div class="async-iter-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔄 异步迭代器（Async Iterator）</h1>
          <p class="text-sm text-slate-500 mt-1">处理异步数据流的现代解决方案 — for await...of 让你优雅地遍历异步序列</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/front/CoreSkills/JavaScript/ES/AsyncIterator.vue" label="📝 编辑"
            :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">ES2018</span>
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
          什么是异步迭代器？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>异步迭代器（Async Iterator）</strong>是 ES2018 引入的协议，它扩展了同步迭代器的概念到异步世界。
          每次调用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next()</code> 返回一个
          <strong>Promise</strong>，resolve 为 <code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{ value, done }</code> 对象。
          配合 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">for await...of</code>
          循环使用。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="text-2xl mb-2">🏷️</div>
            <h4 class="font-semibold text-slate-700 mb-1">Symbol.asyncIterator</h4>
            <p class="text-sm text-slate-600">知名符号，用于定义对象的异步迭代器方法。类似 Symbol.iterator 的异步版本。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="text-2xl mb-2">📋</div>
            <h4 class="font-semibold text-slate-700 mb-1">异步迭代器协议</h4>
            <p class="text-sm text-slate-600">对象必须实现 <code
                class="bg-slate-200 text-cyan-700 px-1 py-0.5 rounded text-xs">next()</code> 方法，返回 <code
                class="bg-slate-200 text-cyan-700 px-1 py-0.5 rounded text-xs">Promise&lt;{value, done}&gt;</code>。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="text-2xl mb-2">🔁</div>
            <h4 class="font-semibold text-slate-700 mb-1">for await...of</h4>
            <p class="text-sm text-slate-600">遍历异步可迭代对象的专用循环语法，自动等待每个 Promise resolve。</p>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br />
            <strong>异步迭代器</strong> ≈ <strong>Node.js Readable Stream</strong> 的 <code
              class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">for await (const chunk of stream)</code><br />
            ≈ <strong>RxJS Observable</strong> 的订阅模型（但迭代器是"拉"模式，Observable 是"推"模式）<br />
            ≈ <strong>Python 的 async for</strong>（<code
              class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">async for item in async_iterable</code>）<br />
            <strong>关键区别：</strong>同步迭代器立即拿到值；异步迭代器每次迭代返回一个 Promise，需要 await 才能拿到值。
          </p>
        </aside>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">同步迭代器</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">异步迭代器</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">知名符号</td>
                <td class="px-4 py-2 border border-slate-200"><code
                    class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">Symbol.iterator</code></td>
                <td class="px-4 py-2 border border-slate-200"><code
                    class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">Symbol.asyncIterator</code></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">next() 返回</td>
                <td class="px-4 py-2 border border-slate-200"><code
                    class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">{ value, done }</code></td>
                <td class="px-4 py-2 border border-slate-200"><code
                    class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">Promise&lt;{ value, done }&gt;</code>
                </td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">遍历语法</td>
                <td class="px-4 py-2 border border-slate-200"><code
                    class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">for...of</code></td>
                <td class="px-4 py-2 border border-slate-200"><code
                    class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">for await...of</code></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">适用场景</td>
                <td class="px-4 py-2 border border-slate-200">同步数据源（数组、Set、Map 等）</td>
                <td class="px-4 py-2 border border-slate-200">异步数据流（分页API、文件流、WebSocket等）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">规范版本</td>
                <td class="px-4 py-2 border border-slate-200">ES6 (2015)</td>
                <td class="px-4 py-2 border border-slate-200">ES2018</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 基本使用 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          创建与使用异步迭代器
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">方式一：手动实现 Symbol.asyncIterator</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">手动控制每个 next() 的返回值，适合需要<strong>精确控制</strong>迭代逻辑的场景：</p>
        <div class="mb-4">
          <Code language="js" :code="codeManualIterator" title="手动实现异步迭代器" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">方式二：async generator 函数（推荐）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">使用 <code
            class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">async function*</code>
          声明异步生成器，自动实现异步迭代器协议，代码更简洁：</p>
        <div class="mb-4">
          <Code language="js" :code="codeAsyncGenerator" title="async generator 函数" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>优先使用 <code
              class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">async function*</code> 而非手动实现
            Symbol.asyncIterator。
            自动生成器代码更少、更不易出错，且支持在函数内使用 <code
              class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">await</code> 和
            <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">try/catch</code>。
          </p>
        </aside>
      </section>

      <!-- 3. 实际应用场景 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          实际应用场景
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">3.1 API 分页数据遍历</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">对调用者来说，分页 API 变成了一个"无限流"，不用关心翻页逻辑：</p>
        <div class="mb-4">
          <Code language="js" :code="codePagination" title="分页 API 迭代" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">3.2 Node.js 流式文件读取</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">Node.js 的 Readable Stream 和 readline 本身就实现了异步迭代器协议：</p>
        <div class="mb-4">
          <Code language="js" :code="codeFileStream" title="流式文件处理" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">3.3 WebSocket / SSE 实时数据</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">将推送式的事件流包装为拉取式的异步迭代器：</p>
        <div class="mb-4">
          <Code language="js" :code="codeWebSocket" title="事件流转异步迭代器" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">3.4 数据库游标遍历</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">大量数据查询时，用游标 + 异步迭代器实现逐批读取，避免内存溢出：</p>
        <div class="mb-4">
          <Code language="js" :code="codeDbCursor" title="数据库游标遍历" />
        </div>
      </section>

      <!-- 4. 高级模式 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          高级组合模式
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">4.1 合并多个异步迭代器</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">将多个异步数据流串联为一个连续的流：</p>
        <div class="mb-4">
          <Code language="js" :code="codeMerge" title="合并异步迭代器" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">4.2 异步迭代器转换（map/filter）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">像数组一样对异步迭代器做 map、filter、take 等操作（类似 RxJS operators）：</p>
        <div class="mb-4">
          <Code language="js" :code="codeTransform" title="转换管道" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">4.3 带并发限制的异步迭代</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">在遍历的同时控制并发数，实现流水线处理：</p>
        <div class="mb-4">
          <Code language="js" :code="codeConcurrent" title="并发处理" />
        </div>
      </section>

      <!-- 5. 常见陷阱 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常见陷阱与注意事项
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：忘记 for await...of 只能在 async 函数中使用</strong><br />
              和 await 一样，<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">for await...of</code> 必须在
              async 函数内（或 ES 模块顶层）使用，否则会报语法错误。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：async generator 中的 await 是串行的</strong><br />
              <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">for await (const x of source)</code>
              每次迭代都会等待当前 Promise resolve 后再请求下一个，天然串行。
              如果需要并行处理，需要自己实现并发逻辑（见高级模式）。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：异步迭代器不能被展开运算符使用</strong><br />
              <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">[...asyncIterable]</code> 和
              <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Array.from(asyncIterable)</code>
              都<strong>不工作</strong>。
              必须用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">for await...of</code> 手动收集。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：提前退出需要手动处理清理逻辑</strong><br />
              在 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">for await...of</code> 中使用 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">break</code> 或 <code
                class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">return</code> 时，
              JS 引擎会调用迭代器的 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">return()</code>
              方法（如果实现了的话）。记得在 return() 中清理资源（关闭连接、删除监听器等）。
            </p>
          </aside>
        </div>

        <div class="mb-4 mt-4">
          <Code language="js" :code="codeCleanup" title="正确的清理逻辑" />
        </div>
      </section>

      <!-- 6. 兼容性与 Polyfill -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          兼容性与浏览器支持
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-xl font-bold text-emerald-700">Chrome 63+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-xl font-bold text-emerald-700">Firefox 57+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-xl font-bold text-emerald-700">Safari 11.1+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-xl font-bold text-emerald-700">Node.js 10+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 原生支持</div>
          </div>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          现代浏览器和 Node.js 都已经原生支持异步迭代器。对于需要兼容旧环境的场景，可以使用 Babel 转译或手动 Polyfill：
        </p>

        <div class="mb-4">
          <Code language="js" :code="codePolyfill" title="Symbol.asyncIterator Polyfill" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>Babel 的 <code
              class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">@babel/plugin-transform-async-generator-functions</code>
            和 <code
              class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">@babel/plugin-transform-for-of</code>（开启
            async 模式）可以转译异步迭代器到 ES5。
            TypeScript 从 2.3 开始支持，target 设为 ES2018 即可。</p>
        </aside>
      </section>

      <!-- 7. 总结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          总结与使用建议
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 class="font-semibold text-emerald-800 mb-3">✅ 适合使用异步迭代器的场景</h4>
            <ul class="space-y-2 text-sm text-emerald-700">
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>分页 API 数据的逐页遍历</span>
              </li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>逐行/分块读取大文件</span>
              </li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>WebSocket / SSE
                  实时事件流</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>数据库游标 /
                  大量查询结果遍历</span></li>
              <li class="flex items-start gap-2"><span
                  class="text-emerald-500 mt-1">▸</span><span>需要统一接口消费多种异步数据源</span></li>
            </ul>
          </div>
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 class="font-semibold text-blue-800 mb-3">🔑 核心要点</h4>
            <ul class="space-y-2 text-sm text-blue-700">
              <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>优先用 async
                    function*</strong> 而非手动实现协议</span></li>
              <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>异步迭代器是
                  <strong>拉取（pull）模式</strong>，由消费者控制节奏</span></li>
              <li class="flex items-start gap-2"><span
                  class="text-blue-500 mt-1">▸</span><span>天然支持<strong>背压（backpressure）</strong>——消费者慢时生产者也慢</span></li>
              <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>实现 <code
                    class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">return()</code>
                  方法以支持<strong>资源清理</strong></span></li>
              <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>和 RxJS Observable
                  互补：迭代器是"拉"，Observable 是"推"</span></li>
            </ul>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 学习路径延伸：</strong><br />
            异步迭代器是现代 JavaScript 异步编程体系的重要一环。建议按以下顺序学习：<br />
            <strong>Promise</strong> → <strong>Generator</strong> → <strong>Async/Await</strong> →
            <strong>异步迭代器（当前）</strong> → <strong>Node.js Streams</strong> →
            <strong>RxJS / Observable 模式</strong><br />
            掌握了异步迭代器，你就拥有了一种统一的、可组合的异步数据处理范式。
          </p>
        </aside>
      </section>
    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <RouterLink to="/front/CoreSkills/JavaScript/ES/AsyncAwait"
          class="text-slate-500 hover:text-cyan-600 text-sm flex items-center gap-1 transition-colors">← 上一节：Async/Await
          深度解析</RouterLink>
        <RouterLink to="/front/CoreSkills/JavaScript/ES/Iterator1"
          class="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1 transition-colors">
          下一节：迭代器 Iterator →</RouterLink>
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
  { id: "sec-1", name: "什么是异步迭代器" },
  { id: "sec-2", name: "创建与使用" },
  { id: "sec-3", name: "实际应用场景" },
  { id: "sec-4", name: "高级组合模式" },
  { id: "sec-5", name: "常见陷阱" },
  { id: "sec-6", name: "兼容性与浏览器支持" },
  { id: "sec-7", name: "总结与使用建议" },
]

// ==================== 代码示例 ====================

const codeManualIterator = `// 手动实现异步可迭代对象
const asyncIterable = {
  data: ['Alice', 'Bob', 'Charlie'],
  index: 0,

  // 实现异步迭代器协议
  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        // 模拟异步延迟
        await new Promise(resolve => setTimeout(resolve, 500))

        if (this.index < this.data.length) {
          return { value: this.data[this.index++], done: false }
        }
        return { value: undefined, done: true }
      }
    }
  }
}

// 使用 for await...of 遍历
;(async () => {
  for await (const name of asyncIterable) {
    console.log(name)
    // 输出（每次间隔 500ms）:
    // Alice
    // Bob
    // Charlie
  }
})()`

const codeAsyncGenerator = `// async function* — 定义异步生成器的最简方式
async function* fetchAllPages(baseUrl) {
  let page = 1
  let hasMore = true

  while (hasMore) {
    // 在生成器内部使用 await
    const response = await fetch(\`\${baseUrl}?page=\${page}&size=10\`)
    const data = await response.json()

    if (data.items.length === 0) {
      hasMore = false
    } else {
      yield data.items  // yield 产出当前页数据
      page++
    }
  }
}

// 消费异步生成器
;(async () => {
  for await (const items of fetchAllPages('/api/products')) {
    for (const item of items) {
      console.log(item.name)  // 输出: 每页的每个产品名
    }
  }
  console.log('所有页面已处理完毕')  // 输出: 所有页面已处理完毕
})()`

const codePagination = `// 🏗️ 通用分页迭代器工厂 — 封装所有翻页逻辑
async function* paginate(fetchPage, { startPage = 1, pageSize = 20 } = {}) {
  let page = startPage
  let hasMore = true

  while (hasMore) {
    const result = await fetchPage(page, pageSize)

    // yield 元数据 + 数据，让调用者知道上下文
    yield {
      items: result.items,
      page,
      total: result.total,
      hasMore: result.items.length === pageSize
    }

    hasMore = result.items.length === pageSize
    page++
  }
}

// 使用：Github Issues API 分页
async function* fetchGithubIssues(repo) {
  yield* paginate(async (page, size) => {
    const res = await fetch(
      \`https://api.github.com/repos/\${repo}/issues?page=\${page}&per_page=\${size}\`
    )
    const items = await res.json()
    return { items, total: null }  // GitHub API 不返回 total
  })
}

// 调用方完全不用关心分页细节
for await (const page of fetchGithubIssues('facebook/react')) {
  console.log(\`第 \${page.page} 页，共 \${page.items.length} 条\`)
  // 输出（每次迭代）: 第 1 页，共 20 条
  // 输出（每次迭代）: 第 2 页，共 20 条
  // ...
}`

const codeFileStream = `// Node.js: 逐行读取大文件（内存友好）
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

async function* readLines(filePath) {
  const stream = createReadStream(filePath, { encoding: 'utf-8' })
  const rl = createInterface({ input: stream, crlfDelay: Infinity })

  try {
    // readline.Interface 实现了 Symbol.asyncIterator！
    for await (const line of rl) {
      yield line
    }
  } finally {
    stream.destroy()  // 确保流被关闭
  }
}

// 使用：处理 10GB 日志文件，内存占用始终很低
for await (const line of readLines('/var/log/huge-app.log')) {
  if (line.includes('ERROR')) {
    console.log('发现错误行:', line)
  }
}`

const codeWebSocket = `// 🛰️ 将 WebSocket 消息流包装为异步迭代器
function createWebSocketStream(url) {
  let ws
  let messageQueue = []
  let resolveNext = null

  return {
    [Symbol.asyncIterator]() {
      // 连接 WebSocket
      ws = new WebSocket(url)

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (resolveNext) {
          // 有等待中的消费者，立即交付
          resolveNext({ value: data, done: false })
          resolveNext = null
        } else {
          // 消费者还没准备好，先缓存
          messageQueue.push(data)
        }
      }

      return {
        next: () => {
          if (messageQueue.length > 0) {
            const value = messageQueue.shift()
            return Promise.resolve({ value, done: false })
          }
          // 没有缓存的消息，返回一个 Promise 等待下一条消息
          return new Promise(resolve => {
            resolveNext = resolve
          })
        },

        // 支持清理：break / return 退出循环时调用
        return: () => {
          ws?.close()
          return Promise.resolve({ done: true })
        }
      }
    }
  }
}

// 使用 WebSocket 流
const stream = createWebSocketStream('wss://api.example.com/realtime')
for await (const event of stream) {
  console.log('收到实时事件:', event.type)

  if (event.type === 'GAME_OVER') {
    break  // 退出循环 → 自动调用 return() → 关闭 WebSocket
  }
}`

const codeDbCursor = `// 🗄️ 用异步迭代器封装数据库游标（避免一次加载全部数据）
async function* queryLargeDataset(db, sql, batchSize = 1000) {
  // 使用游标逐批读取
  const cursor = await db.query(sql).cursor({ batchSize })

  try {
    while (true) {
      const batch = await cursor.read(batchSize)
      if (batch.length === 0) break

      yield batch  // 逐批产出，不一次加载所有数据
    }
  } finally {
    await cursor.close()  // 无论是否 break，都确保释放游标
  }
}

// 使用：处理 1000 万条记录，内存占用始终很低
for await (const batch of queryLargeDataset(db, 'SELECT * FROM orders')) {
  // 每次只处理 1000 条
  await processOrderBatch(batch)
}`

const codeMerge = `// 串联多个异步迭代器
async function* mergeAsyncIterators(...iterables) {
  for (const iterable of iterables) {
    // yield* 也可以用于异步迭代器
    yield* iterable
  }
}

// 合并多个数据源
const allData = mergeAsyncIterators(
  fetchDataFromSource1(),
  fetchDataFromSource2(),
  fetchDataFromSource3(),
)

for await (const item of allData) {
  console.log(item)  // 输出: source1 数据 → source2 数据 → source3 数据
}`

const codeTransform = `// 🔧 异步迭代器的函数式转换管道

// 异步 map — 对每个元素做异步转换
async function* asyncMap(iterable, fn) {
  for await (const item of iterable) {
    yield await fn(item)
  }
}

// 异步 filter — 过滤满足条件的元素
async function* asyncFilter(iterable, predicate) {
  for await (const item of iterable) {
    if (await predicate(item)) {
      yield item
    }
  }
}

// take — 只取前 N 个（之后自动触发清理）
async function* asyncTake(iterable, n) {
  let count = 0
  for await (const item of iterable) {
    if (count++ >= n) return  // return 触发迭代器的 return() 清理
    yield item
  }
}

// 组合使用 — 函数式管道
const pipeline = asyncTake(
  asyncFilter(
    asyncMap(fetchAllPages('/api/products'), async (item) => ({
      ...item,
      priceInCNY: item.price * 7.2  // 异步汇率转换
    })),
    item => item.priceInCNY > 100    // 只保留 > 100 元
  ),
  50  // 只取前 50 个
)

for await (const product of pipeline) {
  console.log(\`\${product.name}: ¥\${product.priceInCNY}\`)  // 输出: xxx: ¥xxx
}`

const codeConcurrent = `// ⚡ 在异步迭代中保持并发处理能力
async function* asyncMapConcurrent(iterable, fn, concurrency = 3) {
  const pending = new Set()

  for await (const item of iterable) {
    const promise = (async () => {
      try {
        return { status: 'ok', value: await fn(item) }
      } catch (err) {
        return { status: 'error', error: err }
      }
    })()

    pending.add(promise)
    promise.then(() => pending.delete(promise))

    // 达到并发上限时，等待任意一个完成
    if (pending.size >= concurrency) {
      const result = await Promise.race(
        [...pending].map(async (p) => {
          const r = await p
          return { promise: p, result: r }
        })
      )
      pending.delete(result.promise)
      yield result.result
    }
  }

  // 等待剩余的完成
  for (const result of await Promise.all([...pending])) {
    yield result
  }
}

// 使用：同时处理 3 个，而非串行
for await (const result of asyncMapConcurrent(
  fetchAllPages('/api/products'),
  async (item) => {
    const enriched = await enrichProductWithExternalData(item)
    return enriched  // 最多同时跑 3 个 enrich 请求
  },
  3  // 并发数
)) {
  if (result.status === 'ok') {
    console.log('处理完成:', result.value.name)
  } else {
    console.error('处理失败:', result.error)
  }
}`

const codeCleanup = `// ✅ 正确实现资源清理的异步迭代器
async function* managedStream(url) {
  const controller = new AbortController()

  try {
    const response = await fetch(url, { signal: controller.signal })
    const reader = response.body.getReader()

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        yield value
      }
    } finally {
      reader.releaseLock()  // 内层清理：释放 reader
    }
  } finally {
    controller.abort()  // 外层清理：取消请求
    console.log('资源已清理')  // 输出: 资源已清理
  }
}

// 正常结束 → finally 执行
for await (const chunk of managedStream('/api/stream')) {
  console.log(chunk)
}
// finally → "资源已清理"

// 提前退出 → finally 也会执行
for await (const chunk of managedStream('/api/stream')) {
  if (someCondition) break
}
// finally → "资源已清理"  ✅ 即使 break 也会清理`

const codePolyfill = `// Symbol.asyncIterator Polyfill
if (!Symbol.asyncIterator) {
  ;(Symbol as any).asyncIterator = Symbol.for('Symbol.asyncIterator')
}

// 为不支持的环境提供基础支持
// 注意：这只是 Symbol 的 polyfill，实际 for await...of 需要 Babel 转译
`
</script>
