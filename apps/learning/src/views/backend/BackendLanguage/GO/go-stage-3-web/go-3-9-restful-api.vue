<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">RESTful API 设计</h1>
          <p class="text-sm text-slate-500 mt-1">资源命名 · 状态码 · 版本控制——生产级 API 设计规范</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-9-restful-api.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-9</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：HTTP 方法 ↔ 资源 ↔ 状态码
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          REST 的核心一句话：<strong>用 HTTP 方法（动词）操作资源（名词），用状态码告诉前端结果</strong>。
          资源就是 URL 上的「名词」（如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/users</code>），
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">GET/POST/PUT/DELETE</code> 决定「做什么」，
          返回的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">200/201/404</code> 决定「成功还是失败」。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 470" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="rs-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="rs-life" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>

            <text x="360" y="26" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">HTTP 方法（动词）驱动资源（名词）的状态变化</text>

            <!-- 方法行 -->
            <rect x="40" y="40" width="130" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="105" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">GET 查</text>
            <text x="105" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#e0f2fe">读资源 · 幂等</text>

            <rect x="215" y="40" width="130" height="44" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="280" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">POST 增</text>
            <text x="280" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#166534">建资源 · 非幂等</text>

            <rect x="390" y="40" width="130" height="44" rx="8" fill="#60a5fa" stroke="#3b82f6" stroke-width="1.5" />
            <text x="455" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">PUT 改</text>
            <text x="455" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#eff6ff">改资源 · 幂等</text>

            <rect x="565" y="40" width="130" height="44" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
            <text x="630" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">DELETE 删</text>
            <text x="630" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#fee2e2">删资源 · 幂等</text>

            <!-- 方法 → 资源 箭头 -->
            <line x1="105" y1="84" x2="300" y2="138" stroke="#94a3b8" stroke-width="2" marker-end="url(#rs-arr)" />
            <line x1="280" y1="84" x2="360" y2="138" stroke="#94a3b8" stroke-width="2" marker-end="url(#rs-arr)" />
            <line x1="455" y1="84" x2="405" y2="138" stroke="#94a3b8" stroke-width="2" marker-end="url(#rs-arr)" />
            <line x1="630" y1="84" x2="445" y2="138" stroke="#94a3b8" stroke-width="2" marker-end="url(#rs-arr)" />

            <!-- 资源本体 -->
            <rect x="250" y="140" width="220" height="118" rx="10" fill="#e0f2fe" stroke="#06b6d4" stroke-width="2" />
            <text x="360" y="164" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0e7490">资源 /users/:id</text>
            <line x1="270" y1="176" x2="450" y2="176" stroke="#a5f3fc" stroke-width="1" />
            <text x="360" y="194" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">id: 42</text>
            <text x="360" y="212" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">name: "Alice"</text>
            <text x="360" y="230" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">status: 已存在</text>
            <text x="360" y="250" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0e7490">名词标识资源 · 方法决定动作</text>

            <!-- 资源 → 生命周期 箭头 -->
            <line x1="360" y1="258" x2="362" y2="292" stroke="#94a3b8" stroke-width="2" marker-end="url(#rs-arr)" />

            <!-- 生命周期行 -->
            <text x="360" y="288" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">资源状态生命周期（CRUD 驱动流转）</text>

            <rect x="35" y="296" width="115" height="60" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="92" y="318" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">不存在</text>
            <text x="92" y="338" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">404</text>

            <rect x="170" y="296" width="115" height="60" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="227" y="318" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">新建</text>
            <text x="227" y="338" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#166534">201</text>

            <rect x="305" y="296" width="115" height="60" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="362" y="318" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">已存在</text>
            <text x="362" y="338" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">200</text>

            <rect x="440" y="296" width="115" height="60" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="497" y="318" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">修改</text>
            <text x="497" y="338" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#fef3c7">200</text>

            <rect x="575" y="296" width="115" height="60" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
            <text x="632" y="318" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">删除</text>
            <text x="632" y="338" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#fee2e2">204</text>

            <line x1="150" y1="326" x2="168" y2="326" stroke="#64748b" stroke-width="2" marker-end="url(#rs-life)" />
            <line x1="285" y1="326" x2="303" y2="326" stroke="#64748b" stroke-width="2" marker-end="url(#rs-life)" />
            <line x1="420" y1="326" x2="438" y2="326" stroke="#64748b" stroke-width="2" marker-end="url(#rs-life)" />
            <line x1="555" y1="326" x2="573" y2="326" stroke="#64748b" stroke-width="2" marker-end="url(#rs-life)" />

            <!-- 状态码图例 -->
            <text x="360" y="392" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">常用状态码（2xx 成功 · 4xx 客户端错误 · 5xx 服务端错误）</text>

            <rect x="27" y="402" width="90" height="26" rx="13" fill="#ecfdf5" stroke="#4ade80" stroke-width="1" />
            <text x="72" y="415" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#15803d">200 OK</text>
            <rect x="123" y="402" width="90" height="26" rx="13" fill="#ecfdf5" stroke="#4ade80" stroke-width="1" />
            <text x="168" y="415" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#15803d">201 创建</text>
            <rect x="219" y="402" width="90" height="26" rx="13" fill="#ecfdf5" stroke="#4ade80" stroke-width="1" />
            <text x="264" y="415" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#15803d">204 无内容</text>
            <rect x="315" y="402" width="90" height="26" rx="13" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="360" y="415" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#b45309">400 参数错</text>
            <rect x="411" y="402" width="90" height="26" rx="13" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="456" y="415" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#b45309">404 不存在</text>
            <rect x="507" y="402" width="90" height="26" rx="13" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="552" y="415" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#b45309">409 冲突</text>
            <rect x="603" y="402" width="90" height="26" rx="13" fill="#fee2e2" stroke="#ef4444" stroke-width="1" />
            <text x="648" y="415" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#b91c1c">500 服务器错</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：HTTP 方法（GET/POST/PUT/DELETE）驱动资源 /users/:id 在 不存在 → 新建 → 已存在 → 修改 → 删除 之间流转，每种操作对应明确的状态码</figcaption>
        </figure>
      </section>

      <!-- 1. REST 设计原则 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          REST 设计原则 — 为什么用「名词 + 动词」而不用「动词 URL」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          REST（Representational State Transfer，表述性状态转移）是 Roy Fielding 2000 年博士论文提出的架构风格。
          它要求把后端能力抽象成<strong>资源（Resource）</strong>，用<strong>HTTP 方法</strong>表达对资源的操作，
          用<strong>状态码</strong>表达操作结果。相比「<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/getUser</code>、
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/deleteUser</code>」这种动词式接口，
          REST 的好处是<strong>一套 URL 就能承载增删改查</strong>，前端无需记忆一堆自定义动词。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2 text-sm">❌ 动词式（不推荐）</h4>
            <ul class="space-y-1 text-slate-600 text-xs font-mono">
              <li>GET  /getUser?id=42</li>
              <li>GET  /deleteUser?id=42</li>
              <li>GET  /addUser</li>
              <li>GET  /updateUser</li>
            </ul>
            <p class="text-xs text-slate-500 mt-2">用 GET 干删除的活，URL 一多就爆炸，语义全靠猜。</p>
          </div>
          <div class="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
            <h4 class="font-semibold text-cyan-800 mb-2 text-sm">✅ RESTful（推荐）</h4>
            <ul class="space-y-1 text-slate-600 text-xs font-mono">
              <li>GET    /users/42</li>
              <li>DELETE /users/42</li>
              <li>POST   /users</li>
              <li>PUT    /users/42</li>
            </ul>
            <p class="text-xs text-cyan-700 mt-2">同一个资源 URL，方法决定动作，语义一目了然。</p>
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">REST 核心约定</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一切皆资源</strong>——用户、订单、菜单都是资源，URL 用<strong>复数名词</strong>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/users</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/orders</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>方法表达动作</strong>——增删改查分别对应 POST / GET / PUT / DELETE</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无状态（Stateless）</strong>——每个请求自带全部信息，服务器不记忆「上一次请求是谁」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>统一接口</strong>——同样的 URL + 方法，返回格式一致，前端代码可预测</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分层嵌套</strong>——子资源用路径层级表达：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/users/42/orders</code> 表示「42 号用户的订单」</span></li>
        </ul>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          RESTful API ≈ <strong>前端的路由 + 状态管理约定</strong>——就像 Pinia store 里你写 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs font-mono">createUser() / fetchUsers()</code> 而不是给每个动作起一个独门 URL；
          也像 Vue Router 用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs font-mono">/users/:id</code> 动态路由，REST 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs font-mono">/users/:id</code> 是一回事。
          axios 里你会写 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs font-mono">api.get('/users')</code>——后端能统一成 REST 风格，前端才写得出整齐的 api 模块。
          </p>
        </aside>

        <div class="mb-4"><Code language="go" :code="respCode" title="response_format.go" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>所有接口返回<strong>统一结构</strong>（code + message + data），前端只需要一个 axios 响应拦截器就能统一处理错误——不必为每个接口单独写 try/catch 解析。</p>
        </aside>
      </section>

      <!-- 2. 资源命名与方法映射 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          资源命名与 HTTP 方法映射表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个资源集合（Collection）对应四个操作，<strong>集合用复数</strong>、<strong>单个资源加 /:id</strong>。
          下面这张表就是 REST 的「查询手册」——设计任何 API 前先对号入座。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">HTTP 方法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">URL</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">语义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">幂等</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 font-mono text-xs">
              <tr><td class="px-4 py-2 border">列表</td><td class="px-4 py-2 border text-cyan-600 font-bold">GET</td><td class="px-4 py-2 border">/users</td><td class="px-4 py-2 border">获取用户列表（可带 ?page、?search）</td><td class="px-4 py-2 border">✅</td></tr>
              <tr><td class="px-4 py-2 border">详情</td><td class="px-4 py-2 border text-cyan-600 font-bold">GET</td><td class="px-4 py-2 border">/users/:id</td><td class="px-4 py-2 border">获取单个用户</td><td class="px-4 py-2 border">✅</td></tr>
              <tr><td class="px-4 py-2 border">创建</td><td class="px-4 py-2 border text-emerald-600 font-bold">POST</td><td class="px-4 py-2 border">/users</td><td class="px-4 py-2 border">新建用户，成功返回 201 + 新资源</td><td class="px-4 py-2 border">❌</td></tr>
              <tr><td class="px-4 py-2 border">全量更新</td><td class="px-4 py-2 border text-blue-600 font-bold">PUT</td><td class="px-4 py-2 border">/users/:id</td><td class="px-4 py-2 border">整体替换，缺的字段会清空</td><td class="px-4 py-2 border">✅</td></tr>
              <tr><td class="px-4 py-2 border">部分更新</td><td class="px-4 py-2 border text-blue-600 font-bold">PATCH</td><td class="px-4 py-2 border">/users/:id</td><td class="px-4 py-2 border">只改传入的字段（更常用）</td><td class="px-4 py-2 border">✅</td></tr>
              <tr><td class="px-4 py-2 border">删除</td><td class="px-4 py-2 border text-red-600 font-bold">DELETE</td><td class="px-4 py-2 border">/users/:id</td><td class="px-4 py-2 border">删除用户，成功返回 204 无内容</td><td class="px-4 py-2 border">✅</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">一次 REST 请求的处理流程</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>路由匹配</strong>——请求 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">POST /api/v1/users</code> 命中「创建用户」处理器</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>解析入参</strong>——读 body 里的 JSON（gin 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ShouldBindJSON</code>），字段缺失/类型错 → 400</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>业务处理</strong>——写库成功 → 201；资源已存在起冲突 → 409；资源不存在 → 404</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>统一返回</strong>——<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{"code":0,"message":"ok","data":...}</code></div>
          </li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 1：</strong>别把动作写进 URL（<code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">/deleteUser</code>、<code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">/getUserList</code>）——这会把「一套 URL 四套动作」毁成「四套 URL 四套动作」，前端难记忆、后端难维护。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 2：</strong>别用 GET 做删除/修改——GET 是「读」，浏览器会缓存、会预取，还可能被搜索引擎/爬虫触发，用 GET 删数据可能造成误删。</p>
        </aside>

        <div class="mb-4"><Code language="go" :code="routeCode" title="rest_routes.go" /></div>
      </section>

      <!-- 3. 状态码语义与幂等性 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          HTTP 状态码语义表 & 幂等性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          状态码是 REST 的「交流语言」——前端拦截器根据状态码决定弹错还是跳登录。
          <strong>幂等（Idempotent）</strong>指：同一个请求重复执行 N 次，结果和只执行 1 次一样。
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">GET/PUT/DELETE</code> 天然幂等，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">POST</code> 不幂等——所以「提交订单」不能随便用 POST 重试，否则可能下两单。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">码</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">何时使用</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端反应</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">200</td><td class="px-4 py-2 border">OK</td><td class="px-4 py-2 border">GET/PUT 成功，带数据返回</td><td class="px-4 py-2 border">正常渲染</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">201</td><td class="px-4 py-2 border">Created</td><td class="px-4 py-2 border">POST 创建成功，返回新资源</td><td class="px-4 py-2 border">跳转详情/刷新列表</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">204</td><td class="px-4 py-2 border">No Content</td><td class="px-4 py-2 border">DELETE 成功，无返回体</td><td class="px-4 py-2 border">移除本地数据</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">400</td><td class="px-4 py-2 border">Bad Request</td><td class="px-4 py-2 border">参数校验失败、JSON 解析失败</td><td class="px-4 py-2 border">提示「参数错误」</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">401</td><td class="px-4 py-2 border">Unauthorized</td><td class="px-4 py-2 border">未登录 / token 过期</td><td class="px-4 py-2 border">跳登录 / 刷新 token</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">403</td><td class="px-4 py-2 border">Forbidden</td><td class="px-4 py-2 border">已登录但没权限</td><td class="px-4 py-2 border">提示「无权限」</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">404</td><td class="px-4 py-2 border">Not Found</td><td class="px-4 py-2 border">资源不存在 / 路由不存在</td><td class="px-4 py-2 border">提示「不存在」</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">409</td><td class="px-4 py-2 border">Conflict</td><td class="px-4 py-2 border">唯一键冲突（如用户名已存在）</td><td class="px-4 py-2 border">提示冲突原因</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">429</td><td class="px-4 py-2 border">Too Many Requests</td><td class="px-4 py-2 border">限流触发（见 go-3-12）</td><td class="px-4 py-2 border">退避重试</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">500</td><td class="px-4 py-2 border">Internal Server Error</td><td class="px-4 py-2 border">服务端 panic / 数据库挂了</td><td class="px-4 py-2 border">提示「服务器开小差」</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>所有请求一律返回 200、错误放在 body 里——这是最常见的老项目恶习。前端拦截器无法用状态码快速分流（401 跳登录、429 退避），日志排查也难。</p>
        </aside>

        <div class="mb-4"><Code language="go" :code="statusCode" title="status_idempotent.go" /></div>
      </section>

      <!-- 4. 版本化与真实后端对照 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          版本化 /api/v1 与 apps/backend 菜单 API 实战对照
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          API 一旦上线就会被前端、App、第三方引用，<strong>破坏性变更必须走版本号</strong>。
          最常用的是 <strong>URL 版本化</strong>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/api/v1/users</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">/api/v2/users</code>。
          v1 保持兼容、v2 随便改，老客户端不受影响。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <p class="text-2xl font-bold text-cyan-600 font-mono">v1</p>
            <p class="text-xs text-slate-500 mt-1">稳定版，只加不改不删，长期兼容</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <p class="text-2xl font-bold text-purple-600 font-mono">v2</p>
            <p class="text-xs text-slate-500 mt-1">新版，可以破坏字段，供新客户端</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <p class="text-2xl font-bold text-amber-600 font-mono">Deprecated</p>
            <p class="text-xs text-slate-500 mt-1">弃用期（保留 6~12 个月），响应头标 Warning</p>
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">对照：本项目 apps/backend 的菜单 API（真实 REST 例子）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          apps/backend 用 Bun + Drizzle + PostgreSQL，实现了一套典型 REST API。注意它的实际返回格式是
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{"code":200,"message":"success","data":...}</code>
          ——成功码用 200（本项目另有一处约定用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">code:0</code>，前端统一按「非错误码」判断即可）。
          「<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">?tree=true</code> / <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">?flat=true</code>」这类<strong>查询参数驱动同一接口返回不同形态</strong>，就是 REST 的「一接口多形态」实践。
        </p>

        <div class="mb-4"><Code language="bash" :code="menuCode" title="📟 Terminal — 调用 apps/backend 菜单 API" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Windows + curl 中文乱码：</strong>本项目的菜单 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">label</code> 是中文——Windows 命令行会把参数按 GBK 传给后端，后端按 UTF-8 解析就乱码。<strong>用 Python 脚本（UTF-8）</strong>或 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">curl --data-binary @文件.json</code> 传中文，不要在 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">-d '...'</code> 里直接拼中文。</p>
        </aside>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          前端 axios 里你会封装 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">api.js</code>，把 baseURL 设成 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">'/api/v1'</code>。
          后端升级 v2 时前端只需把 baseURL 改成 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">'/api/v2'</code>——版本化就是给「前后端协作」留的一条退路，避免一次性全量改造。
          </p>
        </aside>
      </section>

      <!-- 5. Go 实现 CRUD -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          完整 CRUD 的 Go 实现
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把上面所有原则落到代码：路由注册（gin）、参数校验、状态码、统一返回。
          注意每个 handler 的<strong>返回状态码和「资源存在性」判断</strong>——这就是 REST 的落地形态。
        </p>

        <div class="mb-4"><Code language="go" :code="crudCode" title="crud_example.go" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践清单：</strong>① 集合用复数名词，单个资源加 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">/:id</code>；② 永远用正确的状态码；③ PUT/PATCH/DELETE 保持幂等；④ 查询参数（page/search/tree/flat）只用于筛选和视图形态，不改变语义；⑤ 版本号从第一天就挂上 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">/api/v1</code>。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：资源 CRUD 生命周期
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击按钮让同一个资源走完 <strong>创建（绿）→ 查询（青）→ 修改（橙）→ 删除（红消失）</strong> 的完整生命周期，
          右侧实时显示当前请求的方法、URL 与状态码，以及该方法的幂等语义。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 状态: {{ res.visible ? res.note : '资源不存在' }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ reqTag }} · {{ reqCode }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ idemLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doCreate" :disabled="busy || res.visible" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🌱 创建资源</button>
          <button @mousedown="doRead" :disabled="busy || !res.visible" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🔍 查询资源</button>
          <button @mousedown="doUpdate" :disabled="busy || !res.visible" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">✏️ 更新资源</button>
          <button @mousedown="doDelete" :disabled="busy || !res.visible" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🗑️ 删除资源</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 请求标签 -->
              <v-text :config="reqCfg" />
              <!-- 资源占位 -->
              <v-rect v-if="!res.visible" :config="ghostCfg" />
              <v-text v-if="!res.visible" :config="ghostTextCfg" />
              <!-- 资源卡片 -->
              <v-rect v-if="res.visible" :config="resRectCfg" />
              <v-text v-if="res.visible" :config="resTitleCfg" />
              <v-text v-if="res.visible" :config="resNameCfg" />
              <v-text v-if="res.visible" :config="resStateCfg" />
              <!-- 日志 -->
              <v-text :config="logCfg" />
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
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>REST = 名词（资源）+ 动词（HTTP 方法）+ 状态码（结果）</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>集合用<strong>复数名词</strong>（/users），单个资源加 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">/:id</code>，方法决定动作</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>状态码语义要准确：200/201/204 成功，400/401/403/404/409/429 客户端错，500 服务端错</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GET/PUT/DELETE 幂等</strong>，POST 不幂等——重试与防重复提交要区分对待</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>版本化 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">/api/v1</code>，破坏性变更走 v2</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>统一返回格式 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">{code, message, data}</code>，前端一个拦截器通吃</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>对照真实案例：本项目 apps/backend 的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">/api/menus</code> 就是标准 REST</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-8-file-upload-download" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：文件上传下载</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-10-cookie-session" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Cookie/Session →</RouterLink>
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
  { id: "sec-1", name: "REST 设计原则" },
  { id: "sec-2", name: "资源命名与方法映射" },
  { id: "sec-3", name: "状态码语义与幂等性" },
  { id: "sec-4", name: "版本化 & 真实后端对照" },
  { id: "sec-5", name: "Go 实现 CRUD" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 资源 CRUD 生命周期动画 =====
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', orange: '#f59e0b', text: '#1e293b', muted: '#64748b', ghost: '#e2e8f0' }
const H = ref(300), W = ref(700)
const RW = 210, RH = 120
const busy = ref(false), status = ref(''), counter = ref(0)
const reqTag = ref('—'), reqCode = ref('')
const log = ref<string[]>([])
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface ResItem { visible: boolean; color: string; name: string; note: string; scale: number; opacity: number }
const res = reactive<ResItem>({ visible: false, color: C.cyan, name: 'user #42', note: '未创建', scale: 0, opacity: 0 })

const idemLabel = computed(() => {
  if (reqTag.value.startsWith('POST')) return 'POST 非幂等'
  if (reqTag.value.startsWith('GET')) return 'GET 幂等'
  if (reqTag.value.startsWith('PUT')) return 'PUT 幂等'
  if (reqTag.value.startsWith('DELETE')) return 'DELETE 幂等'
  return '幂等: —'
})

const reqCfg = computed(() => ({
  x: 20, y: 18, width: W.value - 40, text: '📨 ' + reqTag.value + '    HTTP ' + reqCode.value,
  fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text, align: 'center',
}))
const logCfg = computed(() => ({
  x: 20, y: 262, width: W.value - 40, text: log.value[0] ? '🪵 ' + log.value[0] : '🪵 点击上方按钮，观察资源生命周期',
  fontSize: 12, fontFamily: 'monospace', fill: C.muted, align: 'center',
}))
const ghostCfg = computed(() => {
  const cx = W.value / 2
  return { x: cx - RW / 2, y: 100, width: RW, height: RH, fill: '#f8fafc', cornerRadius: 10, stroke: C.muted, strokeWidth: 1.5, dash: [6, 4] }
})
const ghostTextCfg = computed(() => ({
  x: W.value / 2 - RW / 2, y: 148, width: RW, text: '资源不存在 (404)', fontSize: 12,
  fontFamily: 'monospace', fill: C.muted, align: 'center',
}))
const resRectCfg = computed(() => {
  const s = res.scale, cx = W.value / 2
  return {
    x: cx - (RW * s) / 2, y: 100 + (RH * (1 - s)) / 2, width: RW * s, height: RH * s,
    fill: res.color, cornerRadius: 10, stroke: '#0891b2', strokeWidth: 2, opacity: res.opacity,
    shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 8, shadowOffsetY: 3,
  }
})
const resTitleCfg = computed(() => {
  const cx = W.value / 2
  return { x: cx - RW / 2, y: 116, width: RW, text: '资源 /users/:id', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center' }
})
const resNameCfg = computed(() => {
  const cx = W.value / 2
  return { x: cx - RW / 2, y: 142, width: RW, text: res.name, fontSize: 12, fontFamily: 'monospace', fill: '#ffffff', align: 'center' }
})
const resStateCfg = computed(() => {
  const cx = W.value / 2
  return { x: cx - RW / 2, y: 168, width: RW, text: '状态: ' + res.note, fontSize: 12, fontFamily: 'monospace', fill: '#ffffff', align: 'center' }
})

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function doCreate() {
  act('POST /api/v1/users', async () => {
    counter.value++
    res.visible = true
    res.color = C.green
    res.name = 'user #' + counter.value + '（新建）'
    res.note = '已创建'
    res.opacity = 1
    res.scale = 0
    await d(80)
    res.scale = 1
    reqTag.value = 'POST /api/v1/users'
    reqCode.value = '201 Created'
    log.value.unshift(`[${counter.value}] POST /api/v1/users → 201 Created`)
    await d(500)
  })
}

async function doRead() {
  act('GET /api/v1/users/{id}', async () => {
    if (!res.visible) return
    counter.value++
    res.color = C.cyan
    res.note = '读取中…'
    await d(350)
    res.note = '已存在'
    reqTag.value = 'GET /api/v1/users/42'
    reqCode.value = '200 OK'
    log.value.unshift(`[${counter.value}] GET /api/v1/users/42 → 200 OK`)
    await d(400)
  })
}

async function doUpdate() {
  act('PUT /api/v1/users/{id}', async () => {
    if (!res.visible) return
    counter.value++
    res.color = C.orange
    res.name = res.name.replace('（新建）', '（已改）') + ' ✎'
    res.note = '已修改'
    reqTag.value = 'PUT /api/v1/users/42'
    reqCode.value = '200 OK'
    log.value.unshift(`[${counter.value}] PUT /api/v1/users/42 → 200 OK`)
    await d(500)
  })
}

async function doDelete() {
  act('DELETE /api/v1/users/{id}', async () => {
    if (!res.visible) return
    counter.value++
    res.color = C.red
    res.note = '已删除'
    reqTag.value = 'DELETE /api/v1/users/42'
    reqCode.value = '204 No Content'
    log.value.unshift(`[${counter.value}] DELETE /api/v1/users/42 → 204 No Content`)
    await d(450)
    res.scale = 0
    res.opacity = 0
    await d(350)
    res.visible = false
    reqTag.value = '资源不存在'
    await d(300)
  })
}

function doReset() {
  busy.value = false
  res.visible = false; res.color = C.cyan; res.name = 'user #42'; res.note = '未创建'; res.scale = 0; res.opacity = 0
  reqTag.value = '—'; reqCode.value = ''; log.value = []; counter.value = 0
  status.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  doReset()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const respCode = `package main

import (
    "encoding/json"
    "net/http"
)

// 统一响应格式——前端只判断 code，不猜接口结构
type Response struct {
    Code    int         \`json:"code"\`
    Message string      \`json:"message"\`
    Data    interface{} \`json:"data,omitempty"\`
}

func ok(w http.ResponseWriter, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK) // 200
    json.NewEncoder(w).Encode(Response{Code: 0, Message: "ok", Data: data})
}

func fail(w http.ResponseWriter, status int, msg string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status) // 400 / 404 / 409 / 500 ...
    json.NewEncoder(w).Encode(Response{Code: status, Message: msg})
}
// 输出示例:
//   ok(w, user)            → HTTP 200 {"code":0,"message":"ok","data":{...}}
//   fail(w, 404, "不存在") → HTTP 404 {"code":404,"message":"不存在"}`

const routeCode = `// gin 实现 REST 路由——方法 + 路径决定语义
func SetupUserRoutes(r *gin.Engine) {
    users := r.Group("/api/v1/users")
    {
        users.GET("", listUsers)          // GET    /api/v1/users     查列表 (200)
        users.GET("/:id", getUser)        // GET    /api/v1/users/42  查详情 (200)
        users.POST("", createUser)        // POST   /api/v1/users     创建   (201)
        users.PUT("/:id", updateUser)     // PUT    /api/v1/users/42  全量更新(200)
        users.DELETE("/:id", deleteUser)  // DELETE /api/v1/users/42  删除   (204)
    }
}

func listUsers(c *gin.Context) {
    users := db.FindAll()                          // 假想的存储
    c.JSON(200, gin.H{"code": 0, "message": "ok", "data": users})
    // 输出: {"code":0,"message":"ok","data":[{...},{...}]}
}

func createUser(c *gin.Context) {
    var u User
    if err := c.ShouldBindJSON(&u); err != nil {
        c.JSON(400, gin.H{"code": 400, "message": "参数错误: " + err.Error()})
        return
    }
    c.JSON(201, gin.H{"code": 0, "message": "ok", "data": u}) // 201 Created
    // 输出: HTTP 201 {"code":0,"message":"ok","data":{"id":7,...}}`

const statusCode = `// 状态码 + 幂等语义
func updateUser(c *gin.Context) {
    id := c.Param("id")
    var u User
    if err := c.ShouldBindJSON(&u); err != nil {
        c.JSON(400, gin.H{"code": 400, "message": "参数错误"}) // 400
        return
    }
    u.ID = id
    n, err := db.Update(&u)                          // UPDATE users SET ... WHERE id=?
    if err != nil {
        c.JSON(500, gin.H{"code": 500, "message": "服务器内部错误"}) // 500
        return
    }
    if n == 0 {
        c.JSON(404, gin.H{"code": 404, "message": "资源不存在"})   // 404
        return
    }
    c.JSON(200, gin.H{"code": 0, "message": "ok", "data": u})     // 200
}
// 幂等要点:
//   PUT/DELETE: 重复执行结果一致 → 前端可以放心重试
//   POST:       重复执行会创建多条 → 需要幂等键或前端防重复提交`

const crudCode = `func main() {
    r := gin.Default()
    SetupUserRoutes(r)   // 注册 /api/v1/users CRUD 路由
    r.Run(":8080")
}

func getUser(c *gin.Context) {
    id := c.Param("id")
    user, ok := db.FindByID(id)
    if !ok {
        c.JSON(404, gin.H{"code": 404, "message": "用户不存在"})
        return
    }
    c.JSON(200, gin.H{"code": 0, "message": "ok", "data": user})
    // 输出: {"code":0,"message":"ok","data":{"id":42,"name":"Alice"}}
}

func deleteUser(c *gin.Context) {
    id := c.Param("id")
    db.Delete(id)
    c.Status(204)   // 无返回体，成功删除
}`

const menuCode = `# 🎯 对照本项目 apps/backend 真实菜单 API（Bun + Drizzle + PostgreSQL，端口 3000）
# 返回格式: { "code": 200, "message": "success", "data": ... }

# 1) GET 查列表（默认返回树形，自动去掉空 children）
curl http://localhost:3000/api/menus

# 2) 查询参数驱动不同视图 —— 一接口多形态
curl "http://localhost:3000/api/menus?tree=true"    # 完整树（需登录，否则 401）
curl "http://localhost:3000/api/menus?flat=true"    # 扁平列表
curl "http://localhost:3000/api/menus?flat=true&search=jwt"  # 扁平 + 搜索
curl "http://localhost:3000/api/menus?root=true"    # 只看顶级菜单

# 3) GET 查单个资源
curl http://localhost:3000/api/menus/菜单ID

# 4) POST 创建（201）——用 --data-binary @file.json 避免 Windows 中文乱码
curl -X POST http://localhost:3000/api/menus \\
  -H "Content-Type: application/json" \\
  --data-binary @new-menu.json
# 输出: {"code":200,"message":"创建成功","data":{"isLeaf":true,...}}

# 5) PUT 更新 / DELETE 删除（DELETE 递归删除全部后代）
curl -X PUT    http://localhost:3000/api/menus/菜单ID \\
  -H "Content-Type: application/json" --data-binary @edit-menu.json
curl -X DELETE http://localhost:3000/api/menus/菜单ID
# 输出: {"code":200,"message":"已删除菜单及其 N 个后代","data":{...}}`
</script>
