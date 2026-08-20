<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧭 路由与 URL</h1>
          <p class="text-sm text-slate-500 mt-1">url.Parse · ServeMux pattern · 路径参数 {id} · 405 vs 404</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-3-routing-url.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：URL 组成 + ServeMux 匹配规则
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个 URL 有 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">scheme://host:port/path?query#fragment</code> 六个部分，
          Go 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">url.Parse</code> / <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.URL</code> 帮你全部分解好。
          ServeMux 路由则按「方法 + 路径」注册 pattern，用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">GET /api/users/{id}</code> 这样的规则把请求分发到正确的 Handler。
        </p>

        <figure class="mb-2">
          <svg viewBox="0 0 720 420" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ru-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="ru-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
              </marker>
              <marker id="ru-bad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>

            <!-- ① URL 组成 -->
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">① URL 组成解剖</text>
            <text x="16" y="46" font-size="11" font-family="monospace" fill="#64748b">https://api.example.com:8080/api/users/42?page=2&amp;size=10#sec</text>

            <rect x="16" y="56" width="58" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="45" y="74" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">https</text>
            <text x="80" y="74" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">://</text>

            <rect x="94" y="56" width="142" height="36" rx="6" fill="#0ea5e9" stroke="#0284c7" stroke-width="1.5" />
            <text x="165" y="74" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">api.example.com</text>
            <text x="240" y="74" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">:</text>

            <rect x="250" y="56" width="42" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="271" y="74" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8080</text>

            <rect x="302" y="56" width="170" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="387" y="74" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">/api/users/42</text>

            <rect x="486" y="56" width="136" height="36" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="554" y="74" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0369a1">?page=2&amp;size=10</text>

            <rect x="634" y="56" width="70" height="36" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="669" y="74" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#475569">#sec</text>

            <text x="45" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">scheme</text>
            <text x="165" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">host 主机</text>
            <text x="271" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">port</text>
            <text x="387" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#b45309" font-weight="bold">path 路径</text>
            <text x="554" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">query 查询</text>
            <text x="669" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">fragment</text>

            <text x="16" y="130" font-size="10" font-family="monospace" fill="#64748b">服务端 r.URL 是 *url.URL：Path→r.URL.Path · query→r.URL.Query() · {id}→r.PathValue("id")</text>

            <!-- ② ServeMux pattern -->
            <text x="16" y="164" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">② ServeMux 路由匹配规则（Go 1.22+）</text>
            <rect x="16" y="176" width="404" height="44" rx="8" fill="#ffffff" stroke="#0891b2" stroke-width="1.5" />
            <text x="32" y="198" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">METHOD  路径</text>
            <text x="120" y="198" font-size="13" font-family="monospace" fill="#94a3b8">|</text>
            <text x="136" y="198" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">GET</text>
            <text x="176" y="198" font-size="13" font-family="monospace" fill="#0f172a">/api/users/</text>
            <rect x="272" y="184" width="44" height="26" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="294" y="197" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">{id}</text>
            <text x="444" y="190" font-size="10" font-family="monospace" fill="#64748b">缺方法 = 匹配所有方法</text>
            <text x="444" y="206" font-size="10" font-family="monospace" fill="#64748b">{id} 匹配一段路径（不含 /）</text>

            <!-- ③ 匹配示例 -->
            <text x="16" y="246" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">③ 匹配示例</text>

            <!-- 示例 1：命中 -->
            <rect x="16" y="256" width="300" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
            <text x="30" y="271" font-size="11" font-family="monospace" fill="#0f172a">GET /api/users/42</text>
            <line x1="330" y1="271" x2="366" y2="271" stroke="#4ade80" stroke-width="2" marker-end="url(#ru-ok)" />
            <rect x="372" y="256" width="330" height="30" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="386" y="271" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">命中 {id} → PathValue("id") = "42"</text>

            <!-- 示例 2：精确 -->
            <rect x="16" y="294" width="300" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
            <text x="30" y="309" font-size="11" font-family="monospace" fill="#0f172a">GET /api/users</text>
            <line x1="330" y1="309" x2="366" y2="309" stroke="#4ade80" stroke-width="2" marker-end="url(#ru-ok)" />
            <rect x="372" y="294" width="330" height="30" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="386" y="309" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">精确 pattern 优先于通配</text>

            <!-- 示例 3：405 -->
            <rect x="16" y="332" width="300" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
            <text x="30" y="347" font-size="11" font-family="monospace" fill="#0f172a">DELETE /api/users/42</text>
            <line x1="330" y1="347" x2="366" y2="347" stroke="#ef4444" stroke-width="2" marker-end="url(#ru-bad)" />
            <rect x="372" y="332" width="330" height="30" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="386" y="347" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">路径命中但方法未注册 → 405</text>

            <!-- 示例 4：404 -->
            <rect x="16" y="370" width="300" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
            <text x="30" y="385" font-size="11" font-family="monospace" fill="#0f172a">GET /api/nothing</text>
            <line x1="330" y1="385" x2="366" y2="385" stroke="#ef4444" stroke-width="2" marker-end="url(#ru-bad)" />
            <rect x="372" y="370" width="330" height="30" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="386" y="385" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">路径未注册 → 404</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：URL 六段组成 + ServeMux「方法 + 路径」匹配规则（命中 / 精确优先 / 405 / 404）</figcaption>
        </figure>
      </section>

      <!-- 1. URL 解剖 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          url.Parse——把 URL 拆成六段
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          不管是解析<strong>客户端收到的请求 URL</strong>，还是<strong>自己构造请求</strong>，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">net/url</code> 包都是核心。
          一个 URL 可以拆成 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">scheme://host:port/path?query#fragment</code> 六个部分。
          在 HTTP Handler 里，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.URL</code> 就是已经解析好的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*url.URL</code>。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">url.Parse</code> ≈ 浏览器的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">new URL(str)</code>——都能把 URL 拆成 protocol / host / pathname / search / hash。<code class="bg-purple-100 px-1 rounded text-xs font-mono">r.URL.Query()</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">new URLSearchParams(search)</code>。
          </p>
        </aside>

        <div class="mb-4"><Code language="go" :code="urlParseCode" title="url_parse.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">URL 段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 字段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">scheme</td><td class="px-4 py-2 border font-mono text-xs">u.Scheme</td><td class="px-4 py-2 border font-mono text-xs">https</td></tr>
              <tr><td class="px-4 py-2 border">host:port</td><td class="px-4 py-2 border font-mono text-xs">u.Host / u.Hostname() / u.Port()</td><td class="px-4 py-2 border font-mono text-xs">api.example.com:8080</td></tr>
              <tr><td class="px-4 py-2 border">path</td><td class="px-4 py-2 border font-mono text-xs">u.Path</td><td class="px-4 py-2 border font-mono text-xs">/api/users/42</td></tr>
              <tr><td class="px-4 py-2 border">query</td><td class="px-4 py-2 border font-mono text-xs">u.RawQuery / u.Query()</td><td class="px-4 py-2 border font-mono text-xs">page=2&amp;size=10</td></tr>
              <tr><td class="px-4 py-2 border">fragment</td><td class="px-4 py-2 border font-mono text-xs">u.Fragment</td><td class="px-4 py-2 border font-mono text-xs">#sec</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 三种参数来源 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          三种参数来源——Path / Query / Form
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Web 开发中参数来自三个地方：<strong>路径参数</strong>（/users/<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">42</code>）、
          <strong>Query 参数</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?page=2</code>）、<strong>表单参数</strong>（POST Body 里的 name=xxx）。
          三者用途不同：路径参数标识资源，Query 参数做筛选/分页，表单参数传提交数据。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">r.PathValue("id")</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.params.id</code>（Express 路由参数）<br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">r.URL.Query().Get("page")</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.query.page</code><br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">r.FormValue("name")</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.body.name</code><br/>
          Go 1.22+ 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">{id}</code> 语法 ≈ Express 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">:id</code>。
          </p>
        </aside>

        <div class="mb-4"><Code language="go" :code="paramCode" title="params.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">来源</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 写法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型场景</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">路径</td><td class="px-4 py-2 border font-mono text-xs">r.PathValue("id")</td><td class="px-4 py-2 border">标识资源：/users/42</td></tr>
              <tr><td class="px-4 py-2 border">Query</td><td class="px-4 py-2 border font-mono text-xs">r.URL.Query().Get("page")</td><td class="px-4 py-2 border">筛选/分页：?page=2</td></tr>
              <tr><td class="px-4 py-2 border">表单</td><td class="px-4 py-2 border font-mono text-xs">r.FormValue("name")</td><td class="px-4 py-2 border">提交数据：登录表单</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 3. ServeMux pattern 语法 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          ServeMux pattern 语法（Go 1.22+）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 1.22 给 ServeMux 加了 <strong>方法匹配</strong> 和 <strong>路径通配符</strong>。pattern 格式：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[METHOD ]/path/{wildcard}</code>。
          方法可省略（省略则匹配所有方法）；通配符 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{name}</code> 匹配一段，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{name...}</code> 匹配多段。
        </p>
        <div class="mb-4"><Code language="go" :code="muxPatternCode" title="mux_pattern.go" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>精确路径</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"/about"</code> 只匹配 /about</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>尾斜杠子树</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"/api/"</code> 匹配 /api 及任意子路径</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>方法 + 路径</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"GET /api/users"</code> 只匹配 GET</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>单段通配</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"GET /api/users/{id}"</code>，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">{id}</code> 匹配任意一段（不含 /）</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>多段通配</strong>（Go 1.22.2+）：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"GET /files/{path...}"</code> 匹配 /files/a/b/c</div>
          </li>
        </ol>
      </section>

      <!-- 4. 优先级/最长匹配 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          优先级与最长匹配规则
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          多个 pattern 都可能匹配同一个路径时，ServeMux 用「<strong>最长匹配 + 具体优先</strong>」裁决：
          匹配到前缀越长的 pattern 越优先；前缀相同时，精确 pattern &gt; 通配 pattern &gt; 子树 pattern。
          精确比通配更「具体」，通配比子树更「具体」。
        </p>
        <div class="mb-4"><Code language="go" :code="priorityCode" title="priority.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优先级（高→低）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">pattern 形式</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">匹配范围</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">1 精确</td><td class="px-4 py-2 border font-mono text-xs">"/api/users"</td><td class="px-4 py-2 border">恰好等于该路径</td></tr>
              <tr><td class="px-4 py-2 border">2 单段通配</td><td class="px-4 py-2 border font-mono text-xs">"/api/users/{id}"</td><td class="px-4 py-2 border">多一个可变的段</td></tr>
              <tr><td class="px-4 py-2 border">3 多段通配</td><td class="px-4 py-2 border font-mono text-xs">"/files/{path...}"</td><td class="px-4 py-2 border">剩余任意多段</td></tr>
              <tr><td class="px-4 py-2 border">4 尾斜杠子树</td><td class="px-4 py-2 border font-mono text-xs">"/api/"</td><td class="px-4 py-2 border">该前缀下所有路径</td></tr>
              <tr><td class="px-4 py-2 border">5 根兜底</td><td class="px-4 py-2 border font-mono text-xs">"/"</td><td class="px-4 py-2 border">所有未被匹配的路径</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 5. 405 vs 404 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          405 vs 404——一个字的差别，语义完全不同
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 1.22+ 的 ServeMux 区分了这两种错误：<strong>405</strong> = 路径存在但方法不对，<strong>404</strong> = 路径本身没注册。
          正确区分能显著提升 API 的可调试性（客户端立刻知道是自己方法写错还是 URL 写错）。
        </p>
        <div class="mb-4"><Code language="go" :code="statusCode" title="405_vs_404.go" /></div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <aside class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
            <p class="text-sm text-red-800"><strong>405 Method Not Allowed</strong><br/>「资源存在，但你的方法它不接受」。通常伴随 <code class="bg-red-100 px-1 rounded text-xs font-mono">Allow: GET, POST</code> 响应头告诉客户端可用方法。</p>
          </aside>
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>404 Not Found</strong><br/>「这个 URL 根本不存在」。路径未注册、或通配符也没接住。</p>
          </aside>
        </div>
      </section>

      <!-- 6. Go 1.22 新特性 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          Go 1.22 路由增强——为什么不用装 Gin 了
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 1.22 之前，ServeMux 不能匹配方法、不能取路径参数，导致一堆小型项目不得不引入 gin/chi。
          1.22 之后标准库路由能力大幅提升，<strong>简单 API 完全够用</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="go122Code" title="go_1_22.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">能力</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 1.21 及以前</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 1.22+</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">方法匹配</td><td class="px-4 py-2 border">无——if r.Method 手动判断</td><td class="px-4 py-2 border">pattern 直接写 "GET /path"</td></tr>
              <tr><td class="px-4 py-2 border">路径参数</td><td class="px-4 py-2 border">无——要第三方库</td><td class="px-4 py-2 border">{id} + r.PathValue()</td></tr>
              <tr><td class="px-4 py-2 border">方法不匹配</td><td class="px-4 py-2 border">返回 404</td><td class="px-4 py-2 border">自动 405 + Allow 头</td></tr>
              <tr><td class="px-4 py-2 border">匹配优先级</td><td class="px-4 py-2 border">简单前缀</td><td class="px-4 py-2 border">最长匹配 + 具体优先</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 7. 常见坑 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          常见坑——路由相关的 5 个陷阱
        </h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：{id} 不匹配含 / 的路径。</strong><br/><code class="bg-slate-100 px-1 rounded text-xs font-mono">"GET /files/{path}"</code> 匹配 /files/a，但<strong>不匹配</strong> /files/a/b。要匹配多段必须用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">"{path...}"</code>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：通配符名冲突注册 panic。</strong><br/><code class="bg-slate-100 px-1 rounded text-xs font-mono">"GET /api/users/{id}"</code> 和 <code class="bg-slate-100 px-1 rounded text-xs font-mono">"GET /api/users/{name}"</code> 在同一位置有两个不同名的通配符，注册第二个时直接 panic。同名才可以共存。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：方法不匹配与 404 混为一谈。</strong><br/>旧代码习惯 <code class="bg-slate-100 px-1 rounded text-xs font-mono">if r.Method != "GET" { http.Error(w, "not found", 404) }</code>——应该返回 405。Go 1.22 用方法 pattern 会自动处理。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：Query 参数取不到是空串，不是报错。</strong><br/><code class="bg-slate-100 px-1 rounded text-xs font-mono">q.Get("page")</code> 在参数不存在时返回空字符串，没有错误。想要默认值用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">if v == "" { v = "1" }</code>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 5：url.Parse 不会校验 URL 合法性。</strong><br/><code class="bg-slate-100 px-1 rounded text-xs font-mono">url.Parse(":::bad")</code> 也可能不报错。真正要严格校验（如 OAuth 回调校验 redirect_uri）时，需再检查 <code class="bg-slate-100 px-1 rounded text-xs font-mono">u.Host</code> 是否为空、scheme 是否白名单。</p>
          </aside>
        </div>
      </section>

      <!-- 8. 最佳实践与对比 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          最佳实践与框架对比
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>小项目优先用标准库 ServeMux——零依赖、够用、升级 Go 1.22 就能白嫖路由增强</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>路径参数标识<strong>资源</strong>，Query 参数做<strong>筛选分页</strong>，不要混用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>RESTful 风格：GET 读 / POST 建 / PUT 改 / DELETE 删，配 405 语义更清晰</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>需要分组中间件、参数绑定、渲染模板时再上 Gin——别为 Hello World 上框架</span></li>
        </ul>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">ServeMux (Go 1.22+)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Gin</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Express (Node)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">路径参数</td><td class="px-4 py-2 border font-mono text-xs">/users/{id}</td><td class="px-4 py-2 border font-mono text-xs">/users/:id</td><td class="px-4 py-2 border font-mono text-xs">/users/:id</td></tr>
              <tr><td class="px-4 py-2 border">方法匹配</td><td class="px-4 py-2 border">✅ pattern 内置</td><td class="px-4 py-2 border">✅ r.GET/r.POST</td><td class="px-4 py-2 border">✅ app.get/post</td></tr>
              <tr><td class="px-4 py-2 border">405 自动</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">❌ 返回 404</td></tr>
              <tr><td class="px-4 py-2 border">参数绑定</td><td class="px-4 py-2 border">手写 Decode</td><td class="px-4 py-2 border">c.ShouldBindJSON</td><td class="px-4 py-2 border">body-parser</td></tr>
              <tr><td class="px-4 py-2 border">依赖</td><td class="px-4 py-2 border">零</td><td class="px-4 py-2 border">第三方</td><td class="px-4 py-2 border">第三方</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：ServeMux 路由匹配
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          左侧是<strong>一个真实请求</strong>，中间是<strong>已注册的 pattern 列表</strong>。点「命中」看 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{id}</code> 通配如何展开绑定到值；
          点「405」/「404」看方法不匹配与路径未注册两种失败的区别。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 已注册 {{ PATS.length }} 个 pattern</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 匹配 O(1) · 试 N 个候选</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doMatch" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🎯 命中 GET /api/users/42</button>
          <button @mousedown="do405" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">❌ POST 同路径 → 405</button>
          <button @mousedown="do404" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">❌ GET /api/posts/42 → 404</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 左侧请求 -->
              <v-rect :config="reqPanelCfg" />
              <v-text :config="reqTitleCfg" />
              <v-text :config="reqMethodCfg" />
              <v-text :config="reqPathCfg" />
              <!-- 中间 pattern 列表 -->
              <v-rect :config="patPanelCfg" />
              <v-text :config="patTitleCfg" />
              <v-rect v-for="(p, i) in PATS" :key="'pr'+i" :config="patRectCfg(i)" />
              <v-text v-for="(p, i) in PATS" :key="'pt'+i" :config="patTextCfg(i)" />
              <!-- 右侧结果 -->
              <v-rect v-if="result" :config="resultRectCfg" />
              <v-text v-if="result" :config="resultTitleCfg" />
              <v-text v-if="result" :config="resultTextCfg" />
              <v-text v-if="!result" :config="waitCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>URL 六段：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">scheme://host:port/path?query#fragment</code>，url.Parse 全部分解</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>三种参数：PathValue（路径）/ Query().Get（查询）/ FormValue（表单）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>ServeMux pattern：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">METHOD /path/{id}</code>，{id} 单段、{id...} 多段</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>匹配优先级：精确 &gt; 通配 &gt; 子树 &gt; "/" 兜底（最长匹配优先）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>405 = 路径命中方法不对 · 404 = 路径未注册——语义要分清</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-2-request-response" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：请求与响应</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-4-middleware" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：中间件 →</RouterLink>
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
  { id: "sec-1", name: "url.Parse URL 解剖" },
  { id: "sec-2", name: "三种参数来源" },
  { id: "sec-3", name: "ServeMux pattern 语法" },
  { id: "sec-4", name: "优先级/最长匹配" },
  { id: "sec-5", name: "405 vs 404" },
  { id: "sec-6", name: "Go 1.22 新特性" },
  { id: "sec-7", name: "常见坑" },
  { id: "sec-8", name: "最佳实践与对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-9", name: "小结" },
]

// ===== 🎬 ServeMux 路由匹配动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(260), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const PATS = ['GET /api/users/{id}', 'GET /api/users', 'POST /api/users', 'GET /api/posts']
const patState = ref<string[]>(['idle', 'idle', 'idle', 'idle'])
const urlMethod = ref('')
const urlPath = ref('')
const result = ref<{ title: string; text: string; color: string } | null>(null)

const RX = 16, RW = 200, RY = 44, RH = 88
const PX = 260, PW = 250, PT = 44
const SX = 546, SW = 138

const reqPanelCfg = { x: RX, y: RY, width: RW, height: RH, fill: '#f8fafc', cornerRadius: 10, stroke: '#0891b2', strokeWidth: 1.5 }
const reqTitleCfg = { x: RX + 12, y: RY + 6, text: '本次请求', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f172a' }
const reqMethodCfg = computed(() => ({ x: RX + 12, y: RY + 30, text: 'Method: ' + (urlMethod.value || '?'), fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: urlMethod.value ? '#0891b2' : C.muted }))
const reqPathCfg = computed(() => ({ x: RX + 12, y: RY + 54, text: 'Path: ' + (urlPath.value || '?'), fontSize: 12, fontFamily: 'monospace', fill: urlPath.value ? '#1e293b' : C.muted }))

const patPanelCfg = { x: PX, y: PT, width: PW, height: 168, fill: '#f8fafc', cornerRadius: 10, stroke: '#94a3b8', strokeWidth: 1.5 }
const patTitleCfg = { x: PX + 12, y: PT + 6, text: '已注册 pattern', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f172a' }

function patRectCfg(i: number) {
  const s = patState.value[i]
  const c = s === 'ok' ? C.green : s === 'bad' ? C.red : s === 'hl' ? C.orange : C.ghost
  return { x: PX + 12, y: PT + 30 + i * 32, width: PW - 24, height: 26, fill: c === C.ghost ? '#f1f5f9' : c,
    cornerRadius: 6, stroke: s === 'hl' ? '#d97706' : s === 'ok' ? '#22c55e' : s === 'bad' ? '#ef4444' : '#e2e8f0', strokeWidth: s === 'idle' ? 1 : 2 }
}
function patTextCfg(i: number) {
  const s = patState.value[i]
  const fg = s === 'idle' ? '#475569' : '#ffffff'
  return { x: PX + 12, y: PT + 30 + i * 32, width: PW - 24, height: 26, text: PATS[i], fontSize: 11, fontFamily: 'monospace',
    fontStyle: s === 'idle' ? 'normal' : 'bold', fill: fg, align: 'center', verticalAlign: 'middle' }
}

const resultRectCfg = computed(() => ({
  x: SX, y: PT, width: SW, height: 168, fill: result.value ? (result.value.color === C.red ? '#fef2f2' : '#f0fdf4') : '#f8fafc',
  cornerRadius: 10, stroke: result.value ? result.value.color : '#e2e8f0', strokeWidth: 1.5,
}))
const resultTitleCfg = computed(() => ({ x: SX + 10, y: PT + 8, width: SW - 20, text: result.value?.title || '', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: result.value?.color || C.muted, align: 'center' }))
const resultTextCfg = computed(() => ({ x: SX + 10, y: PT + 34, width: SW - 20, text: result.value?.text || '', fontSize: 10, fontFamily: 'monospace', fill: '#1e293b', align: 'center', lineHeight: 1.6 }))
const waitCfg = { x: SX + 6, y: PT + 60, width: SW - 12, text: '👆 选择左侧按钮\n观察匹配过程', fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center' }

function resetPat() { patState.value = ['idle', 'idle', 'idle', 'idle'] }

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(200); busy.value = false }
}

function doMatch() {
  act('🎯 匹配——GET /api/users/42', async () => {
    resetPat(); result.value = null
    urlMethod.value = 'GET'; urlPath.value = '/api/users/42'
    status.value = 'URL 进入 ServeMux，逐个检查 pattern'
    await d(450)
    patState.value[0] = 'hl'
    status.value = '候选: GET /api/users/{id}——路径前缀匹配，{id} 通配展开绑定 42'
    await d(700)
    patState.value[0] = 'ok'
    result.value = { title: '✅ 200 OK', text: '命中\nGET /api/users/{id}\n\nPathValue("id") = "42"', color: C.green }
    status.value = '✅ 命中——{id} 通配展开为 "42"'
    await d(700)
  })
}

function do405() {
  act('❌ 405——POST /api/users/42', async () => {
    resetPat(); result.value = null
    urlMethod.value = 'POST'; urlPath.value = '/api/users/42'
    status.value = 'URL 进入 ServeMux'
    await d(450)
    patState.value[0] = 'hl'
    status.value = '路径匹配 GET /api/users/{id}，但 POST 方法未注册'
    await d(700)
    patState.value[0] = 'bad'
    result.value = { title: '❌ 405', text: 'Method Not Allowed\n路径命中但该方法未注册\n\nAllow: GET', color: C.red }
    status.value = '405——路径存在，方法不对'
    await d(700)
  })
}

function do404() {
  act('❌ 404——GET /api/posts/42', async () => {
    resetPat(); result.value = null
    urlMethod.value = 'GET'; urlPath.value = '/api/posts/42'
    status.value = 'URL 进入 ServeMux'
    await d(450)
    patState.value[3] = 'hl'
    status.value = 'pattern 3 是精确 /api/posts（无通配），/api/posts/42 不等于它'
    await d(700)
    patState.value[3] = 'bad'
    result.value = { title: '❌ 404', text: 'Not Found\n没有任何 pattern 匹配该路径', color: C.red }
    status.value = '404——路径未注册'
    await d(700)
  })
}

function doReset() { busy.value = false; resetPat(); result.value = null; urlMethod.value = ''; urlPath.value = ''; status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) { W.value = box.value.clientWidth }
  ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
  ro.observe(box.value!)
})
onUnmounted(() => ro?.disconnect())

const _ = reactive // 保留 vue 响应式 API 引用

const urlParseCode = `package main

import (
    "fmt"
    "net/url"
)

func main() {
    u, err := url.Parse("https://api.example.com:8080/api/users/42?page=2&size=10#sec")
    if err != nil {
        panic(err)
    }

    fmt.Println("Scheme  :", u.Scheme)      // https
    fmt.Println("Host    :", u.Host)        // api.example.com:8080
    fmt.Println("Hostname:", u.Hostname())  // api.example.com
    fmt.Println("Port    :", u.Port())      // 8080
    fmt.Println("Path    :", u.Path)        // /api/users/42
    fmt.Println("RawQuery:", u.RawQuery)    // page=2&size=10
    fmt.Println("Fragment:", u.Fragment)    // sec

    q := u.Query()              // url.Values{page:[2], size:[10]}
    fmt.Println("Query page :", q.Get("page"))  // 2
    fmt.Println("Query size :", q.Get("size"))  // 10
}
// 输出:
// Scheme  : https
// Host    : api.example.com:8080
// Hostname: api.example.com
// Port    : 8080
// Path    : /api/users/42
// RawQuery: page=2&size=10
// Fragment: sec
// Query page : 2
// Query size : 10`

const paramCode = `func handler(w http.ResponseWriter, r *http.Request) {
    // 1. 路径参数——来自 ServeMux 的 {id}
    id := r.PathValue("id")            // /users/42 → "42"

    // 2. Query 参数——来自 URL 的 ?
    q := r.URL.Query()
    page := q.Get("page")              // "1"（不存在返回空串）
    size := q.Get("size")              // "10"
    if page == "" { page = "1" }       // 手动给默认值

    // 3. 表单参数——来自 POST 的 Body
    r.ParseForm()
    name := r.FormValue("name")        // "alice"

    fmt.Fprintf(w, "id=%s page=%s size=%s name=%s", id, page, size, name)
    // 请求: POST /users/42?page=2&size=10   Body: name=alice
    // 输出: id=42 page=2 size=10 name=alice
}`

const muxPatternCode = `mux := http.NewServeMux()

// 1. 精确路径——只匹配 /about 这一个路径
mux.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "about page")
})

// 2. 尾斜杠子树——匹配 /api 及所有子路径
mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "api subtree: %s", r.URL.Path)
})

// 3. 方法 + 路径——只有 GET 走这里
mux.HandleFunc("GET /api/users", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "list users")
})

// 4. 单段通配——{id} 匹配一段（不含 /）
mux.HandleFunc("GET /api/users/{id}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "get user %s", r.PathValue("id"))
})

// 5. 多段通配（Go 1.22.2+）——{path...} 匹配剩余所有段
mux.HandleFunc("GET /api/files/{path...}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "file: %s", r.PathValue("path"))
})

// 6. 同一路径、不同方法可以并存
mux.HandleFunc("POST /api/users", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "create user")
})
// $ curl localhost:8080/api/users/42        → get user 42
// $ curl localhost:8080/api/files/a/b.txt   → file: a/b.txt
// $ curl -X POST localhost:8080/api/users   → create user`

const priorityCode = `// 同时注册以下 pattern：
//   "/"                    （根兜底）
//   "/api/"                （子树）
//   "/api/users"           （精确）
//   "/api/users/{id}"      （单段通配）
//   "/api/files/{path...}" （多段通配）

mux.HandleFunc("/", rootHandler)
mux.HandleFunc("/api/", apiSubtreeHandler)
mux.HandleFunc("GET /api/users", listUsersHandler)
mux.HandleFunc("GET /api/users/{id}", getUserHandler)
mux.HandleFunc("GET /api/files/{path...}", fileHandler)

// 请求路径             → 命中的 pattern            → 原因
// "/"                  → "/"                       → 无更具体匹配
// "/api"               → "/api/" 子树              → 精确 /api/users 不等于 /api
// "/api/users"         → "/api/users"（精确）       → 精确优先于子树
// "/api/users/42"      → "/api/users/{id}"         → {id} 比子树更具体
// "/api/users/42/x"    → "/api/"（子树）            → {id} 只匹配一段，42/x 两段
// "/api/files/a/b"     → "/api/files/{path...}"    → 多段通配接住
// "/api/nothing"       → "/api/"（子树）            → 子树兜底
// "/other"             → "/"（根兜底）              → 根兜底`

const statusCode = `// Go 1.22+：方法 pattern 自动产生 405
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "GET user %s", r.PathValue("id"))
})
mux.HandleFunc("POST /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "POST user %s", r.PathValue("id"))
})
mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    http.NotFound(w, r)
})

// $ curl localhost:8080/users/42
//   输出: GET user 42
// $ curl -X POST localhost:8080/users/42
//   输出: POST user 42
// $ curl -X DELETE localhost:8080/users/42
//   输出: 405 Method Not Allowed（路径命中，方法未注册）
// $ curl localhost:8080/nothing
//   输出: 404 page not found（路径未注册）
//
// 一句话：405 = 找对了门但钥匙不对；404 = 根本没有这扇门`

const go122Code = `// Go 1.21 及以前——要手写方法判断 + 自己解析路径参数
http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
    if r.Method != "GET" {
        http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
        return
    }
    parts := strings.Split(r.URL.Path, "/")
    id := parts[2] // 手动切分，脆弱易错
    fmt.Fprintf(w, "user %s", id)
})

// Go 1.22+——标准库一步到位
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "user %s", r.PathValue("id"))
})

// 与 Gin 语法对照：
//   Gin:         r.GET("/users/:id", ...)  +  c.Param("id")
//   net/http:    mux.HandleFunc("GET /users/{id}", ...) + r.PathValue("id")
//   Express:     app.get("/users/:id", ...) +  req.params.id`
</script>
