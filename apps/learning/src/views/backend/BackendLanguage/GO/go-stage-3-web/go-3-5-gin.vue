<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Gin 框架入门</h1><p class="text-sm text-slate-500 mt-1">Go 最流行的 HTTP 框架——高性能、轻量、路由强大</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/web/go-3-5-gin.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-5</span></div></div></header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：一次请求在 Gin 中如何流转</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个 HTTP 请求到达 Gin 服务后，会依次经历：<strong>Engine 引擎 → Radix Tree 路由匹配 → 中间件链 → Handler 业务处理 → c.JSON 响应</strong>。
          中间件链是<strong>洋葱模型</strong>——请求从外往里穿（绿），响应从里往外返（橙）。这正是本节最核心的心智模型。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="gin-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="gin-ret" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
            </defs>

            <!-- 顶层流程：请求 → 各环节 -->
            <text x="8" y="22" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">请求阶段（灰箭头 → 向右）</text>
            <rect x="8" y="50" width="94" height="56" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="55" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">HTTP</text>
            <text x="55" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">请求</text>

            <rect x="136" y="50" width="84" height="56" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="178" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">Engine</text>
            <text x="178" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">引擎</text>

            <rect x="254" y="50" width="112" height="56" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="310" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">Radix Tree</text>
            <text x="310" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">路由匹配</text>

            <rect x="400" y="50" width="136" height="56" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="468" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">中间件链</text>
            <text x="468" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">洋葱模型</text>

            <rect x="570" y="50" width="92" height="56" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="616" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#78350f">Handler</text>
            <text x="616" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#78350f">业务处理</text>

            <!-- 箭头 -->
            <line x1="102" y1="78" x2="136" y2="78" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-arr)" />
            <line x1="220" y1="78" x2="254" y2="78" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-arr)" />
            <line x1="366" y1="78" x2="400" y2="78" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-arr)" />
            <line x1="536" y1="78" x2="570" y2="78" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-arr)" />

            <!-- 步骤标注 -->
            <text x="119" y="42" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">① 建连/解析</text>
            <text x="237" y="42" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">② 路径匹配</text>
            <text x="383" y="42" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">③ 洋葱式穿过</text>
            <text x="553" y="42" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">④ 执行业务</text>

            <!-- 响应阶段 -->
            <line x1="616" y1="106" x2="616" y2="160" stroke="#4ade80" stroke-width="2" />
            <rect x="470" y="160" width="120" height="44" rx="6" fill="#ecfdf5" stroke="#4ade80" stroke-width="1.5" />
            <text x="530" y="175" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">⑤ c.JSON</text>
            <text x="530" y="192" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">序列化响应</text>

            <!-- 响应返回（绿色虚线） -->
            <path d="M 470 182 H 55 V 110" fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#gin-ret)" />
            <text x="250" y="198" font-size="10" font-family="monospace" fill="#15803d">⑥ 响应沿中间件链原路返回（从里到外）</text>

            <text x="8" y="236" font-size="11" font-family="monospace" fill="#64748b">灰箭头=请求 · 橙=Handler 业务 · 绿=JSON 响应返回 · 中间件链里的每个中间件都有机会在请求前和后各执行一次代码</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Gin 请求生命周期——请求沿灰箭头向右经过 Engine/路由/中间件到 Handler，响应沿绿色虚线原路返回，中间件链呈洋葱状</figcaption>
        </figure>

        <!-- Radix Tree 小图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Radix Tree：把路由路径按公共前缀压缩成一棵树</h3>
        <figure>
          <svg viewBox="0 0 720 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="gin-tr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
            </defs>
            <text x="8" y="16" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">路由表（前缀压缩，先按静态段再按参数段匹配）</text>
            <rect x="314" y="18" width="60" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="344" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">/</text>
            <rect x="60" y="110" width="92" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="106" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">/assets</text>
            <rect x="260" y="110" width="92" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="306" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">/static</text>
            <rect x="460" y="110" width="92" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="506" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#78350f">/user</text>
            <rect x="420" y="200" width="120" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="480" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">/user/:id</text>
            <rect x="580" y="200" width="120" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="640" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">/user/list</text>
            <line x1="344" y1="54" x2="106" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-tr)" />
            <line x1="344" y1="54" x2="306" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-tr)" />
            <line x1="344" y1="54" x2="506" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-tr)" />
            <line x1="506" y1="146" x2="480" y2="200" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-tr)" />
            <line x1="506" y1="146" x2="640" y2="200" stroke="#94a3b8" stroke-width="2" marker-end="url(#gin-tr)" />
            <text x="236" y="98" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">共享前缀 "/"</text>
            <text x="500" y="178" text-anchor="middle" font-size="9" font-family="monospace" fill="#b45309">前缀 /user 只存一次</text>
            <text x="8" y="240" font-size="10" font-family="monospace" fill="#64748b">:id 是动态参数段（匹配任意单段）；*path 是通配段（匹配剩余全部）。匹配时优先静态段，其次参数段</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：Radix Tree 前缀压缩——公共前缀 "/" 共享，/user 分支下挂 /:id 与 /list，无需为每条路径存完整字符串</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么用 Gin -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么用 Gin——以及 gin.New vs gin.Default</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
        Gin ≈ <strong>Express.js / Koa for Go</strong>——路由分组 ≈ Express Router、中间件链 ≈ Koa 洋葱模型、参数绑定 ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">express.json()</code> + Zod 校验。<br/>
        如果你写过 Express 或 Koa，Gin 的 API 会让你感觉很熟悉：<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">r.GET()</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">app.get()</code>，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">c.Next()</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">next()</code>。
        </p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 是 Go 生态<strong>最流行</strong>的 HTTP 框架（GitHub 80k+ stars）。它比标准库 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">net/http</code> 强在：<strong>Radix Tree 路由</strong>（不是正则匹配，快约 40 倍）、<strong>中间件</strong>、<strong>请求体绑定 + 参数校验</strong>、内置 JSON/HTML 渲染。它是纯 Go 实现，不依赖 CGO，单二进制部署。</p>
        <div class="mb-4"><Code language="go" :code="helloCode" title="gin_hello.go" /></div>
        <p class="text-slate-600 mb-3 text-sm">关键区别——<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gin.Default()</code> = <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gin.New()</code> + 自动挂上 <strong>Logger（日志）</strong> 和 <strong>Recovery（panic 恢复）</strong> 两个默认中间件。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">创建方式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">默认中间件</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">gin.New()</td><td class="px-4 py-2 border">无（完全空白）</td><td class="px-4 py-2 border">想精确控制中间件、或性能敏感场景</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">gin.Default()</td><td class="px-4 py-2 border">Logger + Recovery</td><td class="px-4 py-2 border">开发调试、大多数项目直接用</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>生产环境推荐 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">gin.New()</code> + 自定义 Logger/Recovery（用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">gin.ReleaseMode</code> 关闭调试日志），便于接入日志收集系统。</p></aside>
      </section>

      <!-- 2. 第一个应用与路由 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>第一个应用：路由注册 + r.Run 启动</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 注册路由的方式：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.GET/POST/PUT/DELETE(path, handler)</code>。路径里的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">:id</code> 是<strong>路径参数</strong>，用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Param("id")</code> 读取。最后 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.Run(":8080")</code> 启动 HTTP 服务器（默认监听 0.0.0.0:8080）。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gin.Default()</code> 创建引擎</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">为每个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">HTTP 方法 + 路径</code> 注册处理函数</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">调用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">r.Run(addr)</code> 监听端口并阻塞（等价于 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">http.ListenAndServe</code>）</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="routeCode" title="gin_routes.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 1：</strong>路径参数 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">:id</code> 匹配<strong>单段</strong>，不会跨 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">/</code>。想匹配剩余全部路径要用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">*filepath</code>。否则 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">/user/42/posts</code> 不会命中 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">/user/:id</code>。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 2：</strong>Gin 不允许在同一个路径上既注册 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">/user/new</code> 又注册 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">/user/:id</code>——<strong>静态段和参数段冲突</strong>会 panic（"conflicts with existing wildcard"）。给动态路由加前缀或用不同路径设计。</p></aside>
      </section>

      <!-- 3. Radix Tree 路由原理 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Radix Tree 路由原理——为什么 Gin 快</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 把注册的路由构建成一颗<strong>压缩前缀树（Radix Tree / Patricia Trie）</strong>：相同前缀的路径共用节点，匹配时<strong>逐段比较而不是遍历所有路由</strong>。标准库 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.ServeMux</code> 走线性查找 + 正则，路由多了就慢；Radix Tree 的时间复杂度是 <strong>O(路径长度)</strong>，与路由数量无关。</p>
        <div class="mb-4"><Code language="go" :code="radixCode" title="radix_tree.go" /></div>
        <p class="text-slate-600 mb-3 text-sm">匹配优先级规则：<strong>静态段 &gt; 参数段 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">:x</code> &gt; 通配段 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*x</code></strong>。比如同时存在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/user/new</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/user/:id</code> 时，请求 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/user/new</code> 会命中静态路由。</p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-blue-800"><strong>💡 类比：</strong>Radix Tree 就像 <strong>Vue Router 的嵌套路由匹配</strong>——把 URL 段逐级解析，而不是把每个路径都独立存一遍。区别在于 Vue Router 用正则+动态 import，Gin 用纯树形结构做前缀匹配，更快更省内存。</p></aside>
      </section>

      <!-- 4. 路由分组 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>路由分组——≈ Express Router / Vue Router children</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">路由分组让一组路由<strong>共享前缀</strong>，还能让中间件<strong>只作用在特定路径</strong>上——如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/admin</code> 需要认证、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/api</code> 需要 CORS、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/api/v1</code> 还需要版本控制。</p>
        <div class="mb-4"><Code language="go" :code="groupCode" title="gin_group.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>路由分组 ≈ <strong>Express 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">app.use('/admin', router)</code></strong>，也像 <strong>Nginx 的 location 块</strong>——一组路径共享一套规则。分组可以嵌套：<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">api.Group("/v1").Group("/users")</code>。</p></aside>
        <p class="text-slate-600 text-sm">分组返回的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*gin.RouterGroup</code> 还支持 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Use(...)</code> 方法给整组追加中间件，实现"前缀 + 中间件"双重作用域。</p>
      </section>

      <!-- 5. 参数绑定 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>参数绑定——ShouldBindJSON + binding 校验</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 自动将<strong>请求体 JSON / 表单 / Query 参数 / 路径参数</strong>绑定到 Go 结构体。用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">binding:"required"</code> 标签做参数校验，校验失败会返回具体错误信息。<strong>Binding 标签与 JSON tag 是两回事</strong>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json:"username"</code> 控制字段名映射，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">binding:"required,min=6"</code> 控制校验规则。</p>
        <div class="mb-4"><Code language="go" :code="bindCode" title="gin_binding.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">绑定方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数据来源</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">失败行为</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">ShouldBindJSON</td><td class="px-4 py-2 border">Body 里的 JSON</td><td class="px-4 py-2 border">返回 error，不会写响应</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">ShouldBindQuery</td><td class="px-4 py-2 border">URL 查询参数 ?a=1&amp;b=2</td><td class="px-4 py-2 border">返回 error，不会写响应</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">ShouldBindUri</td><td class="px-4 py-2 border">路径参数 /user/:id</td><td class="px-4 py-2 border">返回 error，不会写响应</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">ShouldBind</td><td class="px-4 py-2 border">按 Content-Type 自动选</td><td class="px-4 py-2 border">返回 error，不会写响应</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>Should* 系绑定失败只返回 error，<strong>不会</strong>自动写 400 响应，要自己 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">c.JSON(400, ...)</code>。而 Must* 系（如 MustBindWith）失败会直接终止请求——生产环境更常用 Should* + 显式处理。</p></aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>把校验错误包装成统一结构 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">{code:400, message: 字段+规则}</code>，前端才好统一提示。常用规则：<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">required / min / max / email / gte / lte / len / oneof</code>。</p></aside>
      </section>

      <!-- 6. 渲染响应 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>渲染响应——JSON / XML / HTML / String</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Handler 处理完业务后要写响应。Gin 提供一组渲染方法：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.JSON</code>（最常用）、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.String</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.HTML</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.File</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Data</code>。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gin.H</code> 是一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">map[string]any</code> 的别名，写响应时省去手写 map。</p>
        <div class="mb-4"><Code language="go" :code="renderCode" title="gin_render.go" /></div>
        <p class="text-slate-600 text-sm">第一个参数是 HTTP 状态码。Gin 会自动设置 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Content-Type</code>；JSON 响应返回的是<strong>紧凑格式</strong>（无空格），体积小、传输快。</p>
      </section>

      <!-- 7. 中间件 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>中间件——Gin 的洋葱模型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">中间件是一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gin.HandlerFunc</code>。核心是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Next()</code>——调用它表示"继续执行后续中间件和 Handler"；<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Next()</code> 之后的代码会在<strong>所有后续处理完成后</strong>才执行。因此每个中间件在请求前后各有一次执行机会，形成洋葱模型。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>进入阶段</strong>：请求按注册顺序穿过中间件，每个中间件在 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">c.Next()</code> 前先执行自己的"前置逻辑"（记时间、校验 Token）</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>Handler 执行</strong>：最内层是业务处理函数，写响应</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>返回阶段</strong>：响应沿原路<strong>倒序</strong>返回，每个中间件执行 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">c.Next()</code> 之后的"后置逻辑"（算耗时、加响应头）</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="middlewareCode" title="gin_middleware.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内置中间件</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类比</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">gin.Logger()</td><td class="px-4 py-2 border">记录每个请求的方法/状态码/耗时</td><td class="px-4 py-2 border">morgan（Express）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">gin.Recovery()</td><td class="px-4 py-2 border">捕获 panic，返回 500 而不是崩溃</td><td class="px-4 py-2 border">error middleware</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">gin.BasicAuth()</td><td class="px-4 py-2 border">HTTP Basic 认证</td><td class="px-4 py-2 border">passport.basic</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">gin.CORS()</td><td class="px-4 py-2 border">跨域（社区库 gin-contrib）</td><td class="px-4 py-2 border">cors 中间件</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑：</strong>中间件里调用了 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">c.JSON</code> 后<strong>必须 return</strong>，否则会继续执行 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">c.Next()</code> 让 Handler 再写一次响应——产生重复输出和 500 错误。不想继续执行用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">c.Abort()</code>。</p></aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>中间件只做<strong>横切关注点</strong>（认证、日志、限流、CORS、请求 ID），不要放业务逻辑。多个中间件按「越通用的越靠外」排序，比如 Recovery → Logger → CORS → Auth。</p></aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：中间件链的洋葱执行</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「▶ 发送请求」让请求（绿色圆点）依次穿过 Logger → Auth → CORS → Handler，再倒序返回（橙色圆点）。
          注意每个中间件在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Next()</code> 前后各执行一次——这正是洋葱模型的精髓。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">🧅 中间件层: {{ mws.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 进入 1→4 层 · 返回 4→1 层</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doSend" :disabled="busy || posIdx !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 发送请求（进出全走）</button>
          <button @mousedown="doEnter" :disabled="busy || posIdx !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">进入链（只看请求）</button>
          <button @mousedown="doReturn" :disabled="busy || posIdx !== mws.length - 1" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 hover:border-orange-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">返回链（只看响应）</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 中间件盒 -->
              <v-rect v-for="(m,i) in mws" :key="'mw'+i" :config="mwRectCfg(m,i)" />
              <v-text v-for="(m,i) in mws" :key="'mwt'+i" :config="mwTextCfg(m,i)" />
              <!-- 链间箭头 -->
              <v-arrow v-for="i in mws.length-1" :key="'mwa'+i" :config="chainArrowCfg(i)" />
              <!-- 移动的点 -->
              <v-circle v-if="moving" :config="dotCfg" />
              <v-text v-if="moving" :config="dotLabelCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Gin ≈ Express.js for Go</strong>——路由分组、中间件、参数绑定、内置渲染</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">gin.Default()</code> = New + Logger + Recovery；生产用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">gin.New()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Radix Tree</strong> 前缀树路由：O(路径长度)，比标准库快 40 倍</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>路径参数 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">:id</code> 单段、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">*path</code> 通配；静态段优先于参数段</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ShouldBindJSON</code> 自动绑定+校验，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">binding:"required,min=6"</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.Next()</code> ≈ Express 的 next()——中间件洋葱模型：请求进、响应返</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>渲染响应 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.JSON / c.String / c.HTML / c.File / c.Data</code></span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 下一步：</strong>本讲是 Gin 的地基。下一节「Gin 进阶」会深入 Context 传值、自定义校验器、c.Abort、静态文件、HTML 模板与错误处理——把 Gin 用到生产级。</p></aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-4-middleware" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：中间件</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-6-gin-advanced" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Gin 进阶 →</RouterLink></nav></footer>
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
  { id: "sec-1", name: "为什么用 Gin" },
  { id: "sec-2", name: "第一个应用" },
  { id: "sec-3", name: "Radix Tree 路由" },
  { id: "sec-4", name: "路由分组" },
  { id: "sec-5", name: "参数绑定" },
  { id: "sec-6", name: "渲染响应" },
  { id: "sec-7", name: "中间件" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 中间件洋葱动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(230), W = ref(700)
const MW = 130, MH = 54, MGAP = 36, MY = 120
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const mws = reactive([
  { name: 'Logger', sub: '记录开始 → Next' },
  { name: 'Auth', sub: '校验 Token → Next' },
  { name: 'CORS', sub: '设置响应头 → Next' },
  { name: 'Handler', sub: '执行业务逻辑', isH: true },
])

const posIdx = ref(0)
const moving = ref(true)
const dot = reactive({ x: 0, y: MY, color: C.green, label: '请求' })

function xOf(i: number): number {
  const total = mws.length * MW + (mws.length - 1) * MGAP
  const startX = Math.max(20, (W.value - total) / 2)
  if (i < 0) return startX - 60
  if (i >= mws.length) return startX + total + 60
  return startX + i * (MW + MGAP) + MW / 2
}
function centerX(): number { return W.value / 2 }

function mwRectCfg(m: any, i: number) {
  const total = mws.length * MW + (mws.length - 1) * MGAP
  const startX = Math.max(20, (W.value - total) / 2)
  const x = startX + i * (MW + MGAP)
  const isCur = posIdx.value === i || posIdx.value === (mws.length * 2 - i)   // 进入或返回时高亮
  const isH = !!m.isH
  return { x, y: MY - MH / 2, width: MW, height: MH, cornerRadius: 8,
    fill: isH ? '#fef3c7' : '#e0f2fe',
    stroke: isCur ? C.orange : (isH ? '#d97706' : '#0ea5e9'),
    strokeWidth: isCur ? 3 : 1.5,
    shadowColor: 'rgba(0,0,0,.1)', shadowBlur: isCur ? 8 : 3, shadowOffsetY: 2 }
}
function mwTextCfg(m: any, i: number) {
  const total = mws.length * MW + (mws.length - 1) * MGAP
  const startX = Math.max(20, (W.value - total) / 2)
  const x = startX + i * (MW + MGAP)
  const isH = !!m.isH
  return { x, y: MY - 16, width: MW, text: m.name, fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold',
    fill: isH ? '#b45309' : '#0369a1', align: 'center' }
}
function chainArrowCfg(i: number) {
  const total = mws.length * MW + (mws.length - 1) * MGAP
  const startX = Math.max(20, (W.value - total) / 2)
  const x1 = startX + i * (MW + MGAP) + MW
  const x2 = startX + (i + 1) * (MW + MGAP)
  return { points: [x1, MY, x2, MY], fill: '#94a3b8', stroke: '#94a3b8', strokeWidth: 2, pointerLength: 8, pointerWidth: 6 }
}
const dotCfg = computed(() => ({
  x: dot.x - 14, y: dot.y - 14, radius: 14, fill: dot.color,
  shadowColor: dot.color, shadowBlur: 12, stroke: '#0f172a', strokeWidth: 1.5,
}))
const dotLabelCfg = computed(() => ({
  x: dot.x - 40, y: dot.y - 44, width: 80, text: dot.label,
  fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: dot.color, align: 'center',
}))

async function moveTo(idx: number, ms = 60) {
  const ty = MY, tx = xOf(idx)
  const steps = 8
  for (let s = 1; s <= steps; s++) {
    dot.x += (tx - dot.x) / (steps - s + 1)
    dot.y += (ty - dot.y) / (steps - s + 1)
    await d(ms / steps)
  }
  dot.x = tx; dot.y = ty
}

async function runEnter() {
  dot.color = C.green; dot.label = '请求'
  moving.value = true
  for (let i = 0; i < mws.length; i++) {
    status.value = mws[i].isH ? `Handler 执行业务逻辑，准备响应` : `${mws[i].name}: 前置逻辑 → c.Next()`
    posIdx.value = i
    await moveTo(i)
    await d(320)
  }
}
async function runReturn() {
  dot.color = C.orange; dot.label = '响应'
  for (let j = mws.length - 2; j >= 0; j--) {
    status.value = `${mws[j].name}: c.Next() 之后的逻辑（返回阶段）`
    posIdx.value = j
    await moveTo(j)
    await d(320)
  }
  status.value = '响应已返回客户端'
  posIdx.value = -1
  await moveTo(-1)
  await d(200)
  moving.value = false
  posIdx.value = 0
  dot.x = xOf(0)
  status.value = ''
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false }
}

function doSend() { act('发送请求（进出全流程）', async () => { await runEnter(); await runReturn() }) }
function doEnter() { act('进入链（请求）', async () => { await runEnter() }) }
function doReturn() { act('返回链（响应）', async () => { await runReturn() }) }
function doReset() { busy.value = false; posIdx.value = 0; dot.x = xOf(-1); dot.y = MY; moving.value = false; dot.color = C.green; dot.label = '请求'; status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  dot.x = xOf(-1); dot.y = MY; moving.value = false
  if (box.value) {
    W.value = box.value.clientWidth
    dot.x = xOf(-1)
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; dot.x = xOf(-1) } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const helloCode = `package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.New()          // 空白引擎：没有默认中间件
    r.Use(gin.Logger())     // 手动加日志中间件
    r.Use(gin.Recovery())   // 手动加 panic 恢复中间件
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "pong"})
    })
    r.Run(":8080")          // 启动 HTTP 服务器，阻塞等待
}
// 启动后访问 http://localhost:8080/ping
// 响应: {"message":"pong"}
// 终端日志（Logger 输出）:
// [GIN] 2026/08/20 - 12:00:00 | 200 | 127.0.0.1 | GET "/ping"`

const routeCode = `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    // 方法路由——同一路径可以注册多个方法
    r.GET("/users", listUsers)
    r.POST("/users", createUser)
    r.PUT("/users/:id", updateUser)     // :id 路径参数（单段）
    r.DELETE("/users/:id", deleteUser)

    r.Run(":8080")
}

func listUsers(c *gin.Context) {
    c.JSON(200, gin.H{"list": []string{"alice", "bob"}})
}

func updateUser(c *gin.Context) {
    id := c.Param("id")      // 读取路径参数
    c.JSON(200, gin.H{"updated": id})
}

func createUser(c *gin.Context) {
    c.JSON(201, gin.H{"created": true})
}

func deleteUser(c *gin.Context) {
    c.JSON(200, gin.H{"deleted": c.Param("id")})
}
// curl http://localhost:8080/users
// 输出: {"list":["alice","bob"]}
// curl -X PUT http://localhost:8080/users/42
// 输出: {"updated":"42"}`

const radixCode = `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/", index)
    r.GET("/user", userList)
    r.GET("/user/:id", userDetail)        // 参数段：匹配单段
    r.GET("/user/:id/posts", userPosts)   // 多段路径
    r.GET("/static/*filepath", static)    // 通配段：匹配剩余全部
    r.Run(":8080")
}

func userDetail(c *gin.Context) {
    c.JSON(200, gin.H{"id": c.Param("id")})
}

func static(c *gin.Context) {
    c.String(200, "filepath="+c.Param("filepath"))
}
// curl http://localhost:8080/user/42
// 输出: {"id":"42"}
// curl http://localhost:8080/static/js/app.js
// 输出: filepath=/js/app.js
// 说明: 这些路由会被压缩成前缀树，匹配 O(路径长度)`

const groupCode = `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()

    // 公开路由
    r.GET("/health", func(c *gin.Context) { c.String(200, "ok") })

    // API 路由组——统一 /api 前缀
    api := r.Group("/api")
    {
        api.GET("/users", func(c *gin.Context) { c.JSON(200, gin.H{"list": []string{"alice"}}) })
        api.POST("/users", func(c *gin.Context) { c.JSON(201, gin.H{"created": true}) })
        api.GET("/users/:id", func(c *gin.Context) { c.JSON(200, gin.H{"id": c.Param("id")}) })
    }

    // Admin 路由组——挂认证中间件，只有这组需要登录
    admin := r.Group("/admin", authMiddleware())
    {
        admin.GET("/dashboard", func(c *gin.Context) { c.String(200, "secret dashboard") })
    }

    r.Run(":8080")
}

func authMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(401, gin.H{"error": "unauthorized"})
            c.Abort()       // 中断，不再执行后续 Handler
            return
        }
        c.Next()
    }
}
// curl http://localhost:8080/api/users
// 输出: {"list":["alice"]}
// curl http://localhost:8080/admin/dashboard
// 输出: {"error":"unauthorized"}（401，因为没带 Authorization）`

const bindCode = `package main

import "github.com/gin-gonic/gin"

type LoginRequest struct {
    Username string \`json:"username" binding:"required"\`
    Password string \`json:"password" binding:"required,min=6"\`
    Email    string \`json:"email" binding:"omitempty,email"\`
}

func main() {
    r := gin.Default()
    r.POST("/login", login)
    r.Run(":8080")
}

func login(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        // 校验失败：返回错误详情，前端可据此提示
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // 走到这里说明绑定 + 校验都通过了
    c.JSON(200, gin.H{"ok": true, "user": req.Username})
}
// curl -X POST /login -d '{"username":"alice","password":"123"}'
// 输出: {"error":"Key: 'LoginRequest.Password' Error:Field validation for 'Password' failed on the 'min' tag"}
// curl -X POST /login -d '{"username":"alice","password":"123456"}'
// 输出: {"ok":true,"user":"alice"}`

const renderCode = `package main

import "github.com/gin-gonic/gin"

type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func main() {
    r := gin.Default()
    r.LoadHTMLGlob("templates/*")   // 先加载 HTML 模板
    r.GET("/json", func(c *gin.Context) {
        c.JSON(200, User{Name: "Alice", Age: 25})
    })
    r.GET("/string", func(c *gin.Context) {
        c.String(200, "hello world")
    })
    r.GET("/html", func(c *gin.Context) {
        c.HTML(200, "index.tmpl", gin.H{"title": "首页"})
    })
    r.GET("/file", func(c *gin.Context) {
        c.File("./static/logo.png")
    })
    r.Run(":8080")
}
// curl /json     → {"name":"Alice","age":25}（紧凑格式，无空格）
// curl /string   → hello world
// curl /html     → <h1>首页</h1>（渲染后的 HTML）
// curl /file     → 文件字节流（浏览器直接下载/显示）`

const middlewareCode = `package main

import (
    "log"
    "time"
    "github.com/gin-gonic/gin"
)

// 自定义中间件——请求计时（洋葱模型示例）
func Timer() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()                                   // ← 执行后续中间件与 Handler
        elapsed := time.Since(start)               // ← c.Next() 返回后才执行
        log.Printf("%s %s took %v", c.Request.Method, c.Request.URL.Path, elapsed)
    }
}

func main() {
    r := gin.Default()   // 自带 Logger + Recovery
    r.Use(Timer())       // 追加自定义中间件
    r.GET("/hello", func(c *gin.Context) {
        time.Sleep(50 * time.Millisecond)  // 模拟业务耗时
        c.JSON(200, gin.H{"msg": "hi"})
    })
    r.Run(":8080")
}
// 请求 GET /hello，终端会依次输出:
// [GIN] 2026/08/20 ... | 200 | ... GET /hello（内置 Logger）
// GET /hello took 50.1ms（自定义 Timer——请求返回后打印）`
</script>
