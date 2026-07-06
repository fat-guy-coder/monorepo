<template>
  <div class="dynamic-import-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 动态导入 import()</h1>
          <p class="text-sm text-slate-500 mt-1">按需加载 — 从网络拉取 JS 并执行，实现真正的代码分割</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/front/CoreSkills/JavaScript/ES/DynamicImport.vue" label="📝 编辑" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">ES2020</span>
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
          什么是动态导入？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>动态导入</strong> <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">import()</code>
          是 ES2020 引入的语法，它允许在<strong>运行时</strong>异步加载 JavaScript 模块。与静态 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">import</code> 不同，
          它返回一个 <strong>Promise</strong>，resolve 后得到模块对象。这是实现<strong>代码分割（Code Splitting）</strong>和<strong>按需加载（Lazy Loading）</strong>的核心基础。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">import()</code> ≈ <strong>Node.js 的 require()</strong>（但 import() 是异步的、返回 Promise）<br/>
          ≈ <strong>Vue 的异步组件</strong> <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">defineAsyncComponent(() => import('./X.vue'))</code><br/>
          ≈ <strong>React 的 React.lazy()</strong> <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">React.lazy(() => import('./X'))</code><br/>
          ≈ <strong>AMD/RequireJS</strong> 时代的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">require([...], callback)</code>（但 import() 是现代标准，语法更优雅）
          </p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">静态导入 vs 动态导入</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">静态 import</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">动态 import()</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">语法</td>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">import x from './m.js'</code></td>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">const x = await import('./m.js')</code></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">加载时机</td>
                <td class="px-4 py-2 border border-slate-200">编译时（模块图构建阶段）</td>
                <td class="px-4 py-2 border border-slate-200">运行时（代码执行到那一行时）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">执行方式</td>
                <td class="px-4 py-2 border border-slate-200">同步（在模块图中立即执行）</td>
                <td class="px-4 py-2 border border-slate-200">异步（返回 Promise）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">路径</td>
                <td class="px-4 py-2 border border-slate-200">必须是字符串字面量</td>
                <td class="px-4 py-2 border border-slate-200">可以是变量/表达式/模板字符串</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">位置限制</td>
                <td class="px-4 py-2 border border-slate-200">只能在模块顶层</td>
                <td class="px-4 py-2 border border-slate-200">任何位置（条件、循环、函数内）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">打包结果</td>
                <td class="px-4 py-2 border border-slate-200">打入主 bundle</td>
                <td class="px-4 py-2 border border-slate-200">单独拆分为 chunk</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div class="bg-cyan-50 rounded-lg p-3 text-center text-sm font-medium text-cyan-700">✂️ 代码分割</div>
          <div class="bg-cyan-50 rounded-lg p-3 text-center text-sm font-medium text-cyan-700">⏱️ 按需加载</div>
          <div class="bg-cyan-50 rounded-lg p-3 text-center text-sm font-medium text-cyan-700">🔄 异步模块</div>
          <div class="bg-cyan-50 rounded-lg p-3 text-center text-sm font-medium text-cyan-700">🚀 性能优化</div>
        </div>
      </section>

      <!-- 2. 底层原理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          底层原理：fetch → parse → execute
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">import()</code> 的底层原理确实<strong>并不复杂</strong>。
          核心流程就是：<strong>从网络拉取 JS 文件 → 解析 → 执行 → 返回模块导出</strong>。但它与普通的
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&lt;script&gt;</code> 标签加载有本质区别。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">完整执行流程</h3>
        <ol class="space-y-4 mb-6">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">
              <strong>构建工具识别</strong> — Webpack/Vite/Rollup 在打包时扫描到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">import('./X.js')</code>，
              将该模块及其依赖<strong>单独拆分为一个 chunk 文件</strong>（如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">chunk-abc123.js</code>），不打包进主 bundle。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">
              <strong>运行时触发</strong> — 代码执行到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">import()</code> 时，JS 引擎/运行时调用
              <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">HostImportModuleDynamically</code> 抽象操作。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600">
              <strong>网络请求（Fetch）</strong> — 浏览器/运行时发起 HTTP 请求获取 chunk 文件。如果该 chunk 已经被加载过（缓存在模块映射表
              <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Module Map</code> 中），则<strong>直接跳过此步骤</strong>，不会重复下载。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600">
              <strong>解析（Parse）</strong> — 下载完成后，将 JS 源码解析为 AST，编译为字节码。同时递归加载该模块的静态依赖（子模块也走同样的 load → parse 流程）。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600">
              <strong>链接（Link）</strong> — 解析所有 import/export 绑定。ES 模块是<strong>静态分析 + 动态绑定</strong>的——import 的变量是"活引用"（live binding），
              不是值的快照。这一步建立模块间的引用关系图。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
            <div class="text-slate-600">
              <strong>执行（Evaluate）</strong> — 按依赖顺序<strong>执行模块顶层代码</strong>（每个模块只执行一次）。执行结果（export 的值）被缓存在模块记录中。
            </div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">7</span>
            <div class="text-slate-600">
              <strong>Promise resolve</strong> — 返回一个 <strong>模块命名空间对象</strong>（Module Namespace Object），
              包含该模块的所有 export。调用方拿到这个对象后可以访问模块的导出。
            </div>
          </li>
        </ol>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 关键细节：模块缓存与去重</strong><br/>
          浏览器维护一个全局的 <strong>Module Map</strong>，以 URL 为 key。同一个 URL 的模块<strong>只会被下载和初始化一次</strong>。
          第二次 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">import('./foo.js')</code> 会立即 resolve 为缓存的模块对象，不会再次发网络请求。
          这就是为什么动态导入能安全地在多个地方<strong>重复调用同一个模块</strong>而不会重复加载。
          </p>
        </aside>

        <div class="mb-4">
          <Code language="js" :code="codePrincipleDemo" title="原理演示：手动模拟 import() 的行为" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 与 &lt;script&gt; 标签的关键区别：</strong><br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">&lt;script type="module"&gt;</code> 加载的模块<strong>在 HTML 解析阶段</strong>就被发现和加载（或 defer），
          而 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">import()</code> 是<strong>代码驱动</strong>的，完全由 JS 逻辑控制加载时机。<br/>
          更重要的区别：<strong>import() 可以传动态变量</strong>（如 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">import(\`./lang/\${locale}.js\`)</code>），
          而静态 import 只能是字符串字面量。这种动态性是运行时才能确定的，构建工具会为此生成"可能加载的模块集合"。
          </p>
        </aside>
      </section>

      <!-- 3. 基本使用 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          基本使用模式
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">3.1 Promise 链式调用</h3>
        <div class="mb-4">
          <Code language="js" :code="codePromiseStyle" title="Promise 风格" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">3.2 async/await 风格（推荐）</h3>
        <div class="mb-4">
          <Code language="js" :code="codeAsyncStyle" title="async/await 风格" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">3.3 动态路径（条件加载）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">根据变量动态构造模块路径，这是静态 import 做不到的：</p>
        <div class="mb-4">
          <Code language="js" :code="codeDynamicPath" title="动态路径与条件加载" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">3.4 处理 default 导出</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">import() 返回的模块命名空间对象中，default 导出在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.default</code> 属性上：</p>
        <div class="mb-4">
          <Code language="js" :code="codeDefaultExport" title="处理 default 导出" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>import() 返回的对象是<strong>只读的模块命名空间</strong>，
          不能修改其属性。尝试 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">module.foo = 123</code> 会抛出 TypeError。</p>
        </aside>
      </section>

      <!-- 4. 构建工具集成 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          构建工具集成与魔法注释
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Webpack、Vite、Rollup 等构建工具识别到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">import()</code> 后会自动做代码分割。
          通过<strong>魔法注释（Magic Comments）</strong>可以更精细地控制 chunk 的命名和加载策略。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Webpack 魔法注释</h3>
        <div class="mb-4">
          <Code language="js" :code="codeWebpackMagic" title="Webpack 魔法注释" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">Vite / Rollup 动态导入</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">Vite 基于 Rollup，也支持类似的代码分割，但魔法注释语法略有不同：</p>
        <div class="mb-4">
          <Code language="js" :code="codeViteChunk" title="Vite 代码分割" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">注释</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优先级</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">webpackChunkName: "name"</code></td>
                <td class="px-4 py-2 border border-slate-200">自定义 chunk 文件名</td>
                <td class="px-4 py-2 border border-slate-200">—</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">webpackPreload: true</code></td>
                <td class="px-4 py-2 border border-slate-200">预加载（并行下载，高优先级）</td>
                <td class="px-4 py-2 border border-slate-200">高（当前页面需要）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">webpackPrefetch: true</code></td>
                <td class="px-4 py-2 border border-slate-200">预取（浏览器空闲时下载，低优先级）</td>
                <td class="px-4 py-2 border border-slate-200">低（未来页面可能需要）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">webpackMode: "lazy"</code></td>
                <td class="px-4 py-2 border border-slate-200">默认模式，按需加载每个模块</td>
                <td class="px-4 py-2 border border-slate-200">—</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">webpackMode: "lazy-once"</code></td>
                <td class="px-4 py-2 border border-slate-200">所有匹配的模块打包到一个 chunk</td>
                <td class="px-4 py-2 border border-slate-200">—</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">webpackMode: "weak"</code></td>
                <td class="px-4 py-2 border border-slate-200">只加载已存在的 chunk，不发起网络请求</td>
                <td class="px-4 py-2 border border-slate-200">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 Preload vs Prefetch：</strong><br/>
          <strong>Preload（预加载）</strong>：<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">&lt;link rel="preload"&gt;</code> → 浏览器<strong>立即</strong>以高优先级下载，适合当前页面肯定要用的资源。<br/>
          <strong>Prefetch（预取）</strong>：<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">&lt;link rel="prefetch"&gt;</code> → 浏览器在<strong>空闲时</strong>低优先级下载，适合"用户可能会访问的下一个页面"的资源。<br/>
          <strong>经验法则：</strong>当前路由需要的 → preload；用户鼠标悬停的链接 → prefetch。
          </p>
        </aside>
      </section>

      <!-- 5. 实际应用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          实际应用场景
        </h2>

        <div class="space-y-4">
          <!-- 场景1 -->
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">📦 路由级代码分割（Route-level splitting）</h4>
            <p class="text-sm text-slate-600 mb-3">最常见的场景——每个路由对应一个独立的 chunk，用户只加载当前页面需要的代码：</p>
            <Code language="js" :code="codeRouteSplitting" title="Vue / React 路由懒加载" />
          </div>

          <!-- 场景2 -->
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">🖼️ 组件懒加载（Component lazy loading）</h4>
            <p class="text-sm text-slate-600 mb-3">非首屏的组件（模态框、图表、富文本编辑器等）延迟加载：</p>
            <Code language="js" :code="codeComponentLazy" title="组件懒加载" />
          </div>

          <!-- 场景3 -->
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">📊 按需加载第三方库</h4>
            <p class="text-sm text-slate-600 mb-3">大型库（图表、Excel 导出、代码编辑器等）只在需要时加载：</p>
            <Code language="js" :code="codeLibLazy" title="按需加载第三方库" />
          </div>

          <!-- 场景4 -->
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">🌐 国际化（i18n）按需加载语言包</h4>
            <p class="text-sm text-slate-600 mb-3">根据用户语言动态加载对应的翻译文件：</p>
            <Code language="js" :code="codeI18n" title="i18n 语言包懒加载" />
          </div>

          <!-- 场景5 -->
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">🔌 条件 polyfill / 特性检测</h4>
            <p class="text-sm text-slate-600 mb-3">只在浏览器不支持时才加载 polyfill：</p>
            <Code language="js" :code="codePolyfill" title="条件加载 polyfill" />
          </div>
        </div>
      </section>

      <!-- 6. 常见陷阱 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见陷阱与注意事项
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：忘记 import() 返回的是模块命名空间</strong><br/>
            如果模块是 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">export default</code>，
            需要访问 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">module.default</code>，而不是直接用 module。
            Vue/React 的懒加载语法帮你自动处理了 .default 的问题，但手动使用时要注意。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：过度拆分导致请求瀑布</strong><br/>
            如果 chunk A 加载完后又 import B，B 加载完后又 import C...会形成<strong>串行加载瀑布</strong>。
            对于相互依赖的模块，考虑使用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Promise.all()</code> 并行加载。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：动态路径的构建限制</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">import(\`./\${name}.js\`)</code> 这种写法会让构建工具<strong>无法静态分析</strong>。
            Webpack 会尝试导入 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">./</code> 目录下的所有 .js 文件（可能导致 chunk 膨胀）。
            尽量让动态路径的<strong>可变部分限定在一个已知集合</strong>内。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：忘记错误处理</strong><br/>
            网络可能失败（离线、CDN 挂了、文件不存在）。import() 返回的 Promise 会 reject，必须用
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">try/catch</code> 或 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">.catch()</code> 处理加载失败，并提供降级方案。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱五：模块已缓存，但副作用不会重复执行</strong><br/>
            模块顶层代码<strong>只执行一次</strong>。如果你期望每次 import() 都重新执行模块顶层代码（比如重新注册某些东西），
            这是不可能的——模块缓存机制会阻止这种行为。
            </p>
          </aside>
        </div>
      </section>

      <!-- 7. 浏览器支持 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          浏览器支持与兼容性
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-center">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-lg font-bold text-emerald-700">Chrome 63+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-lg font-bold text-emerald-700">Firefox 67+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-lg font-bold text-emerald-700">Safari 11.1+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-lg font-bold text-emerald-700">Edge 79+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div class="text-lg font-bold text-emerald-700">Node 13.2+</div>
            <div class="text-xs text-emerald-600 mt-1">✅ 支持</div>
          </div>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          对于需要兼容旧浏览器的项目，构建工具（Webpack/Rollup）会把 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs">import()</code>
          编译为 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs">__webpack_require__.e()</code> 等运行时方法，所以<strong>不需要 polyfill</strong>。
          Babel 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs">@babel/plugin-syntax-dynamic-import</code> 只是让 Babel 能<strong>解析</strong>这个语法，实际加载逻辑由打包工具提供。
        </p>

        <div class="mb-4">
          <Code language="js" :code="codeCompatibility" title="兼容性方案" />
        </div>
      </section>

      <!-- 8. 总结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          总结与最佳实践
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 class="font-semibold text-emerald-800 mb-3">✅ 推荐做法</h4>
            <ul class="space-y-2 text-sm text-emerald-700">
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>路由级别做代码分割（最重要的优化点）</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>重量级组件/库延迟加载（图表、编辑器等）</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>用 webpackChunkName 命名 chunk（方便调试）</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>未来可能访问的页面用 prefetch</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>提供加载状态和错误回退 UI</span></li>
              <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>核心功能（如布局、路由框架）保持静态导入</span></li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-4 border border-red-200">
            <h4 class="font-semibold text-red-800 mb-3">❌ 避免做法</h4>
            <ul class="space-y-2 text-sm text-red-700">
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>拆分过细（每个小组件一个 chunk）</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>首屏核心内容延迟加载（影响 LCP）</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>动态路径不做错误处理</span></li>
              <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span>import() 路径使用完全不可预测的变量</span></li>
            </ul>
          </div>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">import()</code>
          的原理就是 <strong>fetch 网络拉取 → parse 解析 → execute 执行 → 返回模块对象</strong>，本质上就是把"什么时候加载"的控制权从构建时交给了运行时。
          构建工具在此基础上叠加了代码分割、缓存、预加载等优化，让"按需加载"成为现代前端性能优化的基石。</p>
        </aside>
      </section>
    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <RouterLink to="/front/CoreSkills/JavaScript/ES/Modules" class="text-slate-500 hover:text-cyan-600 text-sm flex items-center gap-1 transition-colors">← 上一节：ES 模块化</RouterLink>
        <RouterLink to="/front/CoreSkills/JavaScript/ES/ImportMeta" class="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1 transition-colors">下一节：import.meta →</RouterLink>
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
  { id: "sec-1", name: "什么是动态导入" },
  { id: "sec-2", name: "底层原理" },
  { id: "sec-3", name: "基本使用模式" },
  { id: "sec-4", name: "构建工具与魔法注释" },
  { id: "sec-5", name: "实际应用场景" },
  { id: "sec-6", name: "常见陷阱" },
  { id: "sec-7", name: "浏览器支持" },
  { id: "sec-8", name: "总结与最佳实践" },
]

// ==================== 代码示例 ====================

const codePrincipleDemo = `// 🧪 手动模拟 import() 的核心流程（仅用于理解原理）
async function simulateDynamicImport(url) {
  // 1. 模拟模块缓存：已加载的模块直接返回
  if (simulateDynamicImport.cache.has(url)) {
    console.log('从缓存返回:', url)                    // 输出: 从缓存返回: ./foo.js
    return simulateDynamicImport.cache.get(url)
  }

  // 2. fetch：从网络获取 JS 源码
  console.log('fetch:', url)                           // 输出: fetch: ./foo.js
  const response = await fetch(url)
  const sourceCode = await response.text()

  // 3. evaluate：用 new Function 模拟执行模块代码
  //    (浏览器/Node 实际用的是更复杂的模块求值算法)
  const moduleExports = {}
  const moduleWrapper = new Function('exports', 'module', sourceCode)
  moduleWrapper(moduleExports, { exports: moduleExports })

  // 4. 缓存并返回
  simulateDynamicImport.cache.set(url, moduleExports)
  return moduleExports
}
simulateDynamicImport.cache = new Map()

// ⚠️ 这只是概念演示，真正的 import() 远比这复杂：
// - 处理 import/export 依赖图的递归解析
// - Live binding（活引用，不是值的快照）
// - CSP 安全策略
// - CORS 跨域
// - Source Map 映射
// - 构建工具的 chunk 管理`

const codePromiseStyle = `// 方式一：Promise 链式调用
import('./math.js')
  .then(module => {
    console.log(module.add(1, 2))  // 输出: 3
    return module.multiply(3, 4)
  })
  .then(result => {
    console.log(result)             // 输出: 12
  })
  .catch(err => {
    console.error('模块加载失败:', err)
  })`

const codeAsyncStyle = `// 方式二：async/await（推荐，代码更清晰）
async function loadMath() {
  try {
    const math = await import('./math.js')
    console.log(math.add(1, 2))      // 输出: 3
    console.log(math.multiply(3, 4)) // 输出: 12
    return math
  } catch (err) {
    console.error('模块加载失败:', err)
    // 降级方案
    return null
  }
}

// 并行加载多个独立模块
async function loadAll() {
  const [math, utils, constants] = await Promise.all([
    import('./math.js'),
    import('./utils.js'),
    import('./constants.js'),
  ])
  return { math, utils, constants }
}`

const codeDynamicPath = `// 根据用户角色加载不同的仪表盘模块
async function loadDashboard(userType) {
  const modulePath = \`./dashboards/\${userType}Dashboard.js\`

  try {
    const dashboard = await import(modulePath)
    return dashboard.default  // 获取 default 导出
  } catch (err) {
    console.error(\`无法加载 \${userType} 仪表盘:\`, err)
    // 加载默认仪表盘作为降级
    const fallback = await import('./dashboards/defaultDashboard.js')
    return fallback.default
  }
}

// 条件加载：根据特性支持选择不同实现
async function getImageProcessor() {
  if ('OffscreenCanvas' in window) {
    return import('./processors/webgl-processor.js')
  } else {
    return import('./processors/canvas-processor.js')
  }
}

// 语言包加载
const locale = navigator.language.split('-')[0]  // 'zh', 'en', 'ja'...
const messages = await import(\`./locales/\${locale}.js\`)`

const codeDefaultExport = `// 📄 math.js
export default {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
}

// 使用方
const mathModule = await import('./math.js')
const math = mathModule.default  // ← 注意 .default
console.log(math.add(2, 3))      // 输出: 5

// 简便写法：解构
const { default: math } = await import('./math.js')
console.log(math.add(2, 3))      // 输出: 5

// 如果模块同时有 default 和命名导出
// 📄 utils.js
// export default function greet(name) { return \`Hello \${name}\` }
// export const VERSION = '1.0'

const utils = await import('./utils.js')
console.log(utils.default('World'))  // 输出: Hello World
console.log(utils.VERSION)           // 输出: 1.0`

const codeWebpackMagic = `// 🎩 Webpack 魔法注释大全

// 1. 自定义 chunk 名称（最常用）
const dashboard = await import(
  /* webpackChunkName: "dashboard" */
  './views/Dashboard.vue'
)

// 2. 预加载（当前页面一定会用到，高优先级并行下载）
const editor = await import(
  /* webpackChunkName: "monaco-editor" */
  /* webpackPreload: true */
  'monaco-editor'
)

// 3. 预取（用户可能会用到，浏览器空闲时下载）
button.addEventListener('mouseenter', () => {
  import(
    /* webpackChunkName: "report" */
    /* webpackPrefetch: true */
    './views/Report.vue'
  )
})

// 4. 组合多个同级动态导入到同一个 chunk
import(
  /* webpackChunkName: "charts" */
  /* webpackMode: "lazy-once" */
  \`./charts/\${chartType}.js\`
)

// 5. 弱依赖（只使用已存在缓存，不发起新请求）
import(
  /* webpackMode: "weak" */
  './optional-feature.js'
).catch(() => {
  // 模块不可用时静默降级
})`

const codeViteChunk = `// Vite / Rollup 代码分割（基于 ES 模块，更简洁）

// Vite 自动识别动态导入并做代码分割
// 不需要魔法注释，但可以通过 output.manualChunks 配置

// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        // 手动指定哪些模块打包到一起
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-charts': ['chart.js', 'd3'],
          'editor': ['monaco-editor'],
        }
      }
    }
  }
}

// import() 在 Vite 开发模式下就是浏览器原生 import
// 生产构建时自动分割为独立的 .js 文件（带 hash）`

const codeRouteSplitting = `// 🛣️ Vue Router 路由级代码分割
const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),        // 首页 chunk
  },
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),   // 仪表盘 chunk
    children: [
      {
        path: 'analytics',
        component: () => import('./views/Analytics.vue'),// 分析页 chunk（嵌套路由也懒加载）
      },
    ],
  },
  {
    path: '/settings',
    // 带加载状态的异步路由
    component: () => ({
      component: import('./views/Settings.vue'),         // 设置页 chunk
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 200,   // 200ms 后才显示 loading
      timeout: 3000, // 3 秒超时
    }),
  },
]

// ⚛️ React Router 路由级代码分割
import { lazy, Suspense } from 'react'
const Home = lazy(() => import('./views/Home'))
const Dashboard = lazy(() => import('./views/Dashboard'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}`

const codeComponentLazy = `// 📦 Vue 3 异步组件
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('./components/HeavyChart.vue'),
  loadingComponent: ChartSkeleton,   // 加载中显示骨架屏
  errorComponent: ChartError,       // 加载失败显示错误提示
  delay: 200,                        // 延迟显示 loading
  timeout: 5000,                     // 超时时间
  onError(error, retry, fail, attempts) {
    // 重试逻辑：最多重试 3 次
    if (attempts <= 3) {
      retry()
    } else {
      fail()
    }
  },
})

// 条件加载组件
const ChartComponent = computed(() => {
  if (!supportsWebGL.value) {
    return defineAsyncComponent(() => import('./FallbackChart.vue'))
  }
  return HeavyChart
})`

const codeLibLazy = `// 📊 按需加载图表库（ECharts ~1MB gzipped）
async function renderChart(container, data) {
  // 只在需要时才加载 echarts（首屏不加载）
  const echarts = await import('echarts')

  const chart = echarts.init(container)
  chart.setOption(data)
  return chart
}

// 📝 按需加载富文本编辑器
let quillPromise = null
async function getQuill() {
  if (!quillPromise) {
    quillPromise = import('quill')  // 缓存 Promise，避免重复加载
  }
  const Quill = (await quillPromise).default
  return Quill
}

// 🖨️ 按需加载 Excel 导出库
async function exportToExcel(data) {
  showLoading('正在生成 Excel...')
  const XLSX = await import('xlsx')  // ~500KB gzipped

  const workbook = XLSX.utils.book_new()
  const sheet = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1')
  XLSX.writeFile(workbook, 'export.xlsx')

  hideLoading()
}`

const codeI18n = `// 🌐 按需加载语言包
const i18nMessages = {}

async function loadLocaleMessages(locale) {
  if (i18nMessages[locale]) {
    return i18nMessages[locale]  // 已缓存，直接返回
  }

  try {
    const messages = await import(\`./locales/\${locale}.js\`)
    i18nMessages[locale] = messages.default
    return messages.default
  } catch (err) {
    console.warn(\`语言包 \${locale} 不可用，回退到 en\`)
    return await loadLocaleMessages('en')  // 回退到英文
  }
}

// 切换语言
async function switchLanguage(locale) {
  const messages = await loadLocaleMessages(locale)
  i18n.global.setLocaleMessage(locale, messages)
  i18n.global.locale = locale
}`

const codePolyfill = `// 🔌 条件加载 polyfill（只在需要时才下载）
async function ensureFeature(feature) {
  switch (feature) {
    case 'dialog':
      if (!('showModal' in document.createElement('dialog'))) {
        await import('dialog-polyfill')
      }
      break

    case 'avif':
      // 检测 AVIF 图片格式支持
      const supportsAVIF = await new Promise(resolve => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWY...'
      })
      if (!supportsAVIF) {
        // 降级：使用 WebP polyfill 或服务端转码
        window.__useWebPFallback = true
      }
      break

    case 'intersectionObserver':
      if (!('IntersectionObserver' in window)) {
        await import('intersection-observer')
      }
      break
  }
}

// 使用
await ensureFeature('intersectionObserver')
const observer = new IntersectionObserver(callback)  // 现在安全了`

const codeCompatibility = `// 📄 babel.config.js — 只需要语法解析，实际加载由 Webpack 处理
module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import'  // 让 Babel 能解析 import()
  ]
}

// Webpack 编译后，import('./foo.js') 会变成类似：
// __webpack_require__.e(/*! import() */ "chunk-foo")
//   .then(__webpack_require__.bind(__webpack_require__, "./src/foo.js"))

// 好处：不需要 polyfill，Webpack 运行时自带实现`
</script>
