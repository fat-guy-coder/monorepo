<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📥 请求与响应</h1>
          <p class="text-sm text-slate-500 mt-1">*http.Request / http.ResponseWriter 详解——HTTP 报文的 Go 视角</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-2-request-response.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：http.Request 对象解剖 + 响应流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Go 会把浏览器发来的<strong>原始 HTTP 报文</strong>解析成 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*http.Request</code> 对象——请求行变成
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Method</code> / <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">URL</code>，
          Header 变成 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.Header</code>，Body 变成 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.Body</code>。
          响应侧由 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ResponseWriter</code> 按「Header → 状态码 → Body」写回。
        </p>

        <figure class="mb-2">
          <svg viewBox="0 0 720 390" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="rr-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="rr-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
              </marker>
            </defs>

            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">请求侧：原始报文 → http.Request 对象 → 业务读取 · 响应侧：ResponseWriter 写回</text>

            <!-- ① 原始报文 -->
            <text x="16" y="42" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">① HTTP 请求报文</text>
            <rect x="16" y="50" width="250" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="141" y="67" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">GET /users/42?page=2 HTTP/1.1</text>

            <rect x="16" y="92" width="250" height="56" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="36" y="110" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">Host: localhost:8080</text>
            <text x="36" y="132" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">Content-Type: application/json</text>

            <line x1="16" y1="156" x2="266" y2="156" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />

            <rect x="16" y="164" width="250" height="34" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="141" y="181" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">{"name":"alice"}</text>

            <!-- 路由 pattern -->
            <rect x="16" y="224" width="250" height="48" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="141" y="240" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">ServeMux pattern</text>
            <text x="141" y="258" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">GET /users/{id}</text>

            <!-- ② http.Request 对象 -->
            <text x="330" y="42" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">② http.Request 对象</text>
            <rect x="330" y="50" width="374" height="176" rx="8" fill="#ffffff" stroke="#0891b2" stroke-width="1.5" />
            <text x="346" y="68" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">type Request struct { ... }</text>
            <text x="346" y="94" font-size="11" font-family="monospace" fill="#1e293b">Method  string      →  <tspan fill="#0891b2">"GET"</tspan></text>
            <text x="346" y="118" font-size="11" font-family="monospace" fill="#1e293b">URL     *url.URL    →  <tspan fill="#0891b2">Path:/users/42 · Query:page=2</tspan></text>
            <text x="346" y="142" font-size="11" font-family="monospace" fill="#1e293b">Header  http.Header →  <tspan fill="#0891b2">Host / Content-Type</tspan></text>
            <text x="346" y="166" font-size="11" font-family="monospace" fill="#1e293b">Body    io.ReadCloser →  <tspan fill="#0891b2">请求体 JSON</tspan></text>
            <text x="346" y="190" font-size="11" font-family="monospace" fill="#1e293b">PathValue("id")     →  <tspan fill="#f59e0b">"42"（来自 {id}）</tspan></text>
            <text x="346" y="214" font-size="11" font-family="monospace" fill="#1e293b">Proto   string      →  <tspan fill="#0891b2">"HTTP/1.1"</tspan></text>

            <!-- 映射箭头 -->
            <line x1="266" y1="67" x2="330" y2="94" stroke="#94a3b8" stroke-width="2" marker-end="url(#rr-arr)" />
            <line x1="266" y1="120" x2="330" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#rr-arr)" />
            <line x1="266" y1="181" x2="330" y2="166" stroke="#94a3b8" stroke-width="2" marker-end="url(#rr-arr)" />
            <line x1="266" y1="248" x2="330" y2="190" stroke="#f59e0b" stroke-width="2" marker-end="url(#rr-arr)" />

            <!-- ③ 响应流程 -->
            <text x="16" y="306" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">③ 响应流程</text>
            <rect x="16" y="318" width="120" height="52" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="76" y="336" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">业务 Handler</text>
            <text x="76" y="354" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">读完 Request</text>

            <rect x="176" y="318" width="230" height="52" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="291" y="336" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">ResponseWriter</text>
            <text x="291" y="354" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#b45309">Header() → WriteHeader() → Write()</text>

            <rect x="446" y="318" width="258" height="52" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="575" y="336" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#15803d">HTTP/1.1 200 OK</text>
            <text x="575" y="354" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#15803d">Content-Type: application/json</text>

            <line x1="136" y1="344" x2="176" y2="344" stroke="#94a3b8" stroke-width="2" marker-end="url(#rr-arr)" />
            <line x1="406" y1="344" x2="446" y2="344" stroke="#4ade80" stroke-width="2" marker-end="url(#rr-ok)" />
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：报文各段被解析进 Request 的哪个字段；响应侧按固定顺序写回</figcaption>
        </figure>
      </section>

      <!-- 1. HTTP 报文与 Request -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          HTTP 报文长什么样——原始 vs Request 对象
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          任何 HTTP 请求在网络上都是一段<strong>纯文本报文</strong>。Go 的 net/http 把这段文本解析成结构化的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*http.Request</code>，
          你不再需要手写解析器。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">*http.Request</code> ≈ <strong>Express 的 req 对象</strong>——包含 URL、Header、Body、Query、Method。<code class="bg-purple-100 px-1 rounded text-xs font-mono">r.URL.Query()</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.query</code>，<code class="bg-purple-100 px-1 rounded text-xs font-mono">r.Header.Get()</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.get()</code>，<code class="bg-purple-100 px-1 rounded text-xs font-mono">r.Body</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.body</code>。<br/>
          <strong>关键差异：</strong>Node 会主动帮你解析 Body（express.json 中间件），Go 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">r.Body</code> 是<strong>原始字节流</strong>，JSON/表单都要你自己解码——更底层，也更可控。
          </p>
        </aside>

        <div class="mb-4"><Code language="go" :code="reqCode" title="request.go" /></div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-4">报文 → Request 字段映射</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">报文片段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Request 字段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">GET /users/42?page=2 HTTP/1.1</td><td class="px-4 py-2 border font-mono text-xs">r.Method / r.URL / r.Proto</td><td class="px-4 py-2 border">请求行——方法 + 目标 + 协议版本</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Host: localhost:8080</td><td class="px-4 py-2 border font-mono text-xs">r.Host</td><td class="px-4 py-2 border">目标主机</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Content-Type: ...</td><td class="px-4 py-2 border font-mono text-xs">r.Header</td><td class="px-4 py-2 border">请求头，map 可多值</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">(空行)</td><td class="px-4 py-2 border">—</td><td class="px-4 py-2 border">Header 与 Body 的分隔符</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">{"name":"alice"}</td><td class="px-4 py-2 border font-mono text-xs">r.Body</td><td class="px-4 py-2 border">请求体——io.ReadCloser 流</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 读取 Query / Header -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          读取 Query / Header——参数从哪来
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Query 参数挂在 URL 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">?</code> 后面（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?page=2&amp;size=10</code>），用
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.URL.Query()</code> 拿到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">url.Values</code>（本质是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">map[string][]string</code>）。
          Header 是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.Header</code>，用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Get(key)</code> 取单值（key 大小写不敏感）。
        </p>
        <div class="mb-4"><Code language="go" :code="queryHeaderCode" title="query_header.go" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 细节：</strong>同一个 query 参数可重复出现（<code class="bg-slate-100 px-1 rounded text-xs font-mono">?tag=a&amp;tag=b</code>），用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">q["tag"]</code> 拿整个切片。Header 同理（如 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Accept: text/html,text/plain</code>）。<code class="bg-slate-100 px-1 rounded text-xs font-mono">Get()</code> 只返回第一个值。</p>
        </aside>
      </section>

      <!-- 3. 读取 Body -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          读取 Body——JSON 解码、表单、文件
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.Body</code> 是一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">io.ReadCloser</code>——
          <strong>流式</strong>的、<strong>只能读一次</strong>、用完要 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Close()</code>。三种最常见读法：
        </p>

        <div class="mb-4"><Code language="go" :code="bodyCode" title="read_body.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">API</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">JSON API</td><td class="px-4 py-2 border font-mono text-xs">json.NewDecoder(r.Body).Decode(&v)</td><td class="px-4 py-2 border">流式解码，最推荐</td></tr>
              <tr><td class="px-4 py-2 border">表单（URL-encoded）</td><td class="px-4 py-2 border font-mono text-xs">r.ParseForm() → r.FormValue(k)</td><td class="px-4 py-2 border">同时解析 query + body</td></tr>
              <tr><td class="px-4 py-2 border">multipart 上传</td><td class="px-4 py-2 border font-mono text-xs">r.FormFile("avatar")</td><td class="px-4 py-2 border">返回文件句柄 + 头部</td></tr>
              <tr><td class="px-4 py-2 border">原始字节</td><td class="px-4 py-2 border font-mono text-xs">io.ReadAll(r.Body)</td><td class="px-4 py-2 border">一次读完，适合小请求体</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ r.Body 只能读一次！</strong>它是流，读到底之后 EOF，再读是空的。如果中间件想先读 Body 记录日志、Handler 又要读一次，必须 <code class="bg-slate-100 px-1 rounded text-xs font-mono">io.ReadAll</code> 读完后 <code class="bg-slate-100 px-1 rounded text-xs font-mono">r.Body = io.NopCloser(bytes.NewReader(body))</code> 重置回可读状态。</p>
        </aside>
      </section>

      <!-- 4. ResponseWriter 写响应 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          ResponseWriter——写 JSON / 文本 / 状态码
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          写响应固定三步：先设 Header、再写状态码、最后写 Body。生产 API 通常统一封装一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">writeJSON</code> 工具函数，保证所有接口的响应格式一致。
        </p>
        <div class="mb-4"><Code language="go" :code="respCode" title="response.go" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>写 JSON：</strong>先 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">w.Header().Set("Content-Type", "application/json")</code>，再 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.NewEncoder(w).Encode(v)</code> 序列化并写入。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>写状态码：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">w.WriteHeader(http.StatusCreated)</code>（201）。不调用默认 200。错误场景用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">http.Error(w, msg, code)</code> 快速返回纯文本错误。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>写文本：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fmt.Fprint(w, "hello")</code> 或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">w.Write([]byte(...))</code>。</div>
          </li>
        </ol>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>统一用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">json.NewEncoder</code> 而不是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">json.Marshal</code> + <code class="bg-slate-100 px-1 rounded text-xs font-mono">w.Write</code>——前者<strong>流式写入、自动处理错误、自动追加换行</strong>，还省一次中间字节切片的分配。</p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          常见错误——必踩的 4 个坑
        </h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：r.Body 只能读一次。</strong><br/>Body 是流，读完就 EOF。中间件和 Handler 都想读时，用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">io.ReadAll</code> + <code class="bg-slate-100 px-1 rounded text-xs font-mono">io.NopCloser(bytes.NewReader(body))</code> 重置。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：不 Close r.Body。</strong><br/>虽然 net/http 服务端会自动关闭，但显式 <code class="bg-slate-100 px-1 rounded text-xs font-mono">defer r.Body.Close()</code> 是明确约定，尤其当你把 Body 传给别处时。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：WriteHeader 之后再 Set Header 无效。</strong><br/>响应头一旦发送就定型。<code class="bg-slate-100 px-1 rounded text-xs font-mono">WriteHeader(201)</code> 后再 <code class="bg-slate-100 px-1 rounded text-xs font-mono">w.Header().Set(...)</code>，Header 不会出现在响应里（可能 log 一个 "superfluous WriteHeader" 警告）。Header 必须在 WriteHeader/Write 之前设置。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：不设 Body 大小限制。</strong><br/>恶意客户端能上传任意大的 Body 拖垮内存。用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">http.MaxBytesReader(w, r.Body, 1&lt;&lt;20)</code> 限制为 1MB，超限解码时报错。</p>
          </aside>
        </div>

        <div class="mb-4"><Code language="go" :code="limitCode" title="body_limit.go" /></div>
      </section>

      <!-- 6. 最佳实践 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          最佳实践——一个完整的 API Handler
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>统一响应结构（如 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">{code, data, msg}</code>），封装 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">writeJSON</code> 避免每个 Handler 重复写</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Body 解码错误立即返回 400，不要 panic</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">http.MaxBytesReader</code> 限制 Body 大小</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>解码时用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">dec.DisallowUnknownFields()</code> 拒绝多余字段，尽早暴露客户端拼写错误</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="fullCode" title="api_handler.go" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：HTTP 报文逐行解析
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          左侧是一段<strong>真实的 HTTP 请求报文</strong>，右侧是 Go 解析出的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*http.Request</code> 字段。
          按顺序点按钮，看每一行报文如何被「翻译」成 Request 对象里的字段。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 报文 {{ lines.length }} 行</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ O(n) 逐行解析</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doParseReq" :disabled="busy || step !== -1" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">① 解析请求行</button>
          <button @mousedown="doParseHdr" :disabled="busy || step !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">② 解析 Header</button>
          <button @mousedown="doParseBody" :disabled="busy || step !== 1" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">③ 解析 Body</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 左侧报文行 -->
              <v-text v-for="(l, i) in lines" :key="'lbl'+i" :config="lineLabelCfg(i)" />
              <v-rect v-for="(l, i) in lines" :key="'lr'+i" :config="lineRectCfg(i)" />
              <v-text v-for="(l, i) in lines" :key="'lt'+i" :config="lineTextCfg(i)" />
              <!-- 右侧 Request 字段面板 -->
              <v-rect :config="panelCfg" />
              <v-text :config="panelTitleCfg" />
              <template v-if="step >= 0">
                <v-text :config="fieldCfg('Method', 0)" />
                <v-text :config="fieldValCfg(fvMethod, 0)" />
                <v-text :config="fieldCfg('URL.Path', 1)" />
                <v-text :config="fieldValCfg(fvPath, 1)" />
                <v-text :config="fieldCfg('URL.Query(page)', 2)" />
                <v-text :config="fieldValCfg(fvQuery, 2)" />
                <v-text :config="fieldCfg('Proto', 3)" />
                <v-text :config="fieldValCfg(fvProto, 3)" />
              </template>
              <template v-if="step >= 1">
                <v-text :config="fieldCfg('Header Host', 4)" />
                <v-text :config="fieldValCfg(fvHost, 4)" />
                <v-text :config="fieldCfg('Header Content-Type', 5)" />
                <v-text :config="fieldValCfg(fvCType, 5)" />
              </template>
              <template v-if="step >= 2">
                <v-text :config="fieldCfg('Body', 6)" />
                <v-text :config="fieldValCfg(fvBody, 6, true)" />
              </template>
              <v-text v-if="step === -1" :config="hintCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>http.Request</strong> = 报文的结构化视图：Method / URL / Header / Body / PathValue / Proto</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Query 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">r.URL.Query().Get(k)</code>，Header 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">r.Header.Get(k)</code>，Body 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">json.NewDecoder(r.Body)</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>响应顺序固定：<strong>Header → WriteHeader → Write</strong>，JSON 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">json.NewEncoder(w).Encode()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Body 只读一次、用完 Close、限流用 MaxBytesReader——三个高频坑全记牢</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-1-net-http" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：net/http</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-3-routing-url" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：路由与URL →</RouterLink>
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
  { id: "sec-1", name: "HTTP 报文与 Request" },
  { id: "sec-2", name: "读取 Query / Header" },
  { id: "sec-3", name: "读取 Body" },
  { id: "sec-4", name: "ResponseWriter 写响应" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "最佳实践" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 HTTP 报文逐行解析动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(320), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const lines = [
  { text: 'GET /users/42?page=2 HTTP/1.1', kind: 'req' },
  { text: 'Host: localhost:8080', kind: 'hdr' },
  { text: 'Content-Type: application/json', kind: 'hdr' },
  { text: '', kind: 'blank' },
  { text: '{"name":"alice"}', kind: 'body' },
]
const step = ref(-1)   // -1 未开始 · 0 请求行已解析 · 1 Header 已解析 · 2 Body 已解析
const hl = ref<number[]>([])

// 解析出的字段值（含引号，用常量避免模板里引号冲突）
const fvMethod = 'GET'
const fvPath = '/users/42'
const fvQuery = '"2"'
const fvProto = '"HTTP/1.1"'
const fvHost = 'localhost:8080'
const fvCType = '"application/json"'
const fvBody = '{"name":"alice"}'

const LX = 16, LW = 320, LH = 34, LG = 10, LY = 34
function lineY(i: number) { return LY + i * (LH + LG) }
function lineColor(i: number) {
  if (hl.value.includes(i)) return C.orange
  if (step.value >= 1 && lines[i].kind === 'req') return C.green
  if (step.value >= 2 && lines[i].kind === 'hdr') return C.green
  if (step.value >= 2 && lines[i].kind === 'body') return C.green
  return C.cyan
}
function lineLabelCfg(i: number) {
  return { x: LX, y: lineY(i) - 16, width: LW, text: ['请求行', 'Header', 'Header', '空行(分隔)', 'Body'][i],
    fontSize: 9, fontFamily: 'monospace', fill: C.muted }
}
function lineRectCfg(i: number) {
  if (lines[i].kind === 'blank') return { x: LX, y: lineY(i), width: LW, height: 6, fill: '#e2e8f0', cornerRadius: 3, stroke: '#cbd5e1', strokeWidth: 1 }
  const c = lineColor(i)
  const isActive = c === C.orange || c === C.green
  return { x: LX, y: lineY(i), width: LW, height: LH, fill: c === C.cyan ? '#e0f2fe' : c, cornerRadius: 6,
    stroke: c === C.cyan ? '#7dd3fc' : c === C.orange ? '#d97706' : '#22c55e', strokeWidth: isActive ? 2 : 1.5,
    opacity: lines[i].kind === 'blank' ? 0 : 1 }
}
function lineTextCfg(i: number) {
  const c = lineColor(i)
  if (lines[i].kind === 'blank') return { x: LX, y: lineY(i) - 14, width: LW, text: '────── 分隔线 ──────', fontSize: 9, fontFamily: 'monospace', fill: C.muted, align: 'center' }
  const dark = c === C.cyan
  return { x: LX, y: lineY(i), width: LW, height: LH, text: lines[i].text, fontSize: 12, fontFamily: 'monospace',
    fontStyle: c === C.cyan ? 'normal' : 'bold', fill: dark ? '#0369a1' : '#ffffff', align: 'center', verticalAlign: 'middle' }
}

const PX = 360, PW = 324, PT = 34
const panelCfg = { x: PX, y: PT, width: PW, height: 276, fill: '#f8fafc', cornerRadius: 10, stroke: '#0891b2', strokeWidth: 1.5 }
const panelTitleCfg = { x: PX + 12, y: PT + 8, text: 'http.Request 对象（逐步生成）', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f172a' }
function fieldCfg(label: string, idx: number) {
  const y = PT + 40 + idx * 36
  return { x: PX + 12, y, text: label, fontSize: 11, fontFamily: 'monospace', fill: C.muted, width: PW - 24 }
}
function fieldValCfg(value: string, idx: number, em = false) {
  const y = PT + 54 + idx * 36
  return { x: PX + 12, y, text: value, fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: em ? '#b45309' : '#0891b2', width: PW - 24 }
}
const hintCfg = { x: PX + 12, y: PT + 120, width: PW - 24, text: '👆 先点左侧按钮，逐行解析报文', fontSize: 12, fontFamily: 'monospace', fill: C.muted, align: 'center' }

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(200); busy.value = false }
}

function doParseReq() {
  act('解析请求行——Method=GET, URL.Path=/users/42, Query: page=2', async () => {
    hl.value = [0]; await d(550)
    step.value = 0; hl.value = []; status.value = '✅ 请求行 → Method / URL / Query / Proto'
    await d(500)
  })
}
function doParseHdr() {
  act('解析 Header——Host + Content-Type 进入 Header map', async () => {
    hl.value = [1, 2]; await d(550)
    step.value = 1; hl.value = []; status.value = '✅ Header → r.Header.Get()'
    await d(500)
  })
}
function doParseBody() {
  act('解析 Body——空行后是请求体，JSON 反序列化', async () => {
    hl.value = [3, 4]; await d(550)
    step.value = 2; hl.value = []; status.value = '✅ Body → json.NewDecoder(r.Body).Decode(&v)'
    await d(500)
  })
}
function doReset() { busy.value = false; step.value = -1; hl.value = []; status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) { W.value = box.value.clientWidth }
  ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
  ro.observe(box.value!)
})
onUnmounted(() => ro?.disconnect())

const _ = reactive // 保留 vue 响应式 API 引用

const reqCode = `func handler(w http.ResponseWriter, r *http.Request) {
    // 1. Method——请求方法
    switch r.Method {
    case http.MethodGet:
        fmt.Println("GET 请求")
    case http.MethodPost:
        fmt.Println("POST 请求")
    }

    // 2. URL——路径 + Query
    path := r.URL.Path            // /users/42
    raw := r.URL.RawQuery         // page=2&size=10
    q := r.URL.Query()            // url.Values{"page":["2"],"size":["10"]}
    page := q.Get("page")         // "2"
    size := q.Get("size")         // "10"

    // 3. Header——map，可多值
    host := r.Header.Get("Host")         // "localhost:8080"
    ctype := r.Header.Get("Content-Type") // "application/json"

    // 4. 路径参数（Go 1.22+，ServeMux pattern 用 {id}）
    id := r.PathValue("id")              // "42"

    // 5. 客户端信息
    ip := r.RemoteAddr                   // "127.0.0.1:54321"
}
// 假设请求: POST /users/42?page=2&size=10
// 输出:
// POST 请求
// path=/users/42 page=2 size=10 id=42
// Host: localhost:8080`

const queryHeaderCode = `func paramsHandler(w http.ResponseWriter, r *http.Request) {
    // Query 参数：?page=2&size=10&tag=a&tag=b
    q := r.URL.Query()
    page := q.Get("page")      // "2"（不存在返回空串）
    size := q.Get("size")      // "10"
    tags := q["tag"]           // []string{"a","b"}——同一 key 多值
    if page == "" { page = "1" } // Get 拿不到时手动给默认值

    // Header 参数
    auth := r.Header.Get("Authorization")  // "Bearer xxx"
    contentType := r.Header.Get("Content-Type")

    fmt.Fprintf(w, "page=%s size=%s tags=%v auth=%s", page, size, tags, auth)
    // 输出: page=2 size=10 tags=[a b] auth=Bearer xxx
}`

const bodyCode = `type CreateUserReq struct {
    Name  string ` + "`json:\"name\"`" + `
    Email string ` + "`json:\"email\"`" + `
    Age   int    ` + "`json:\"age\"`" + `
}

func createUser(w http.ResponseWriter, r *http.Request) {
    // 1. 流式 JSON 解码（推荐，直接进结构体）
    var req CreateUserReq
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "invalid json: "+err.Error(), http.StatusBadRequest)
        return
    }
    // 解码后: req.Name="Alice" req.Email="a@b.com" req.Age=30

    // 2. 若还要再读一次 Body：io.ReadAll + 重置回可读
    body, _ := io.ReadAll(r.Body)
    r.Body = io.NopCloser(bytes.NewReader(body))

    // 3. 显式关闭（虽服务端会自动关，但约定要养成）
    defer r.Body.Close()
}

// 表单读取：
//   r.ParseForm()                    // 解析 query + body 到 r.Form
//   username := r.FormValue("name")  // 取表单字段

// 文件上传：
//   file, header, err := r.FormFile("avatar") // header.Filename 是原文件名`

const respCode = `// 统一 JSON 响应封装——保证所有接口格式一致
func writeJSON(w http.ResponseWriter, status int, data any) {
    // 顺序 1：Header
    w.Header().Set("Content-Type", "application/json; charset=utf-8")
    // 顺序 2：状态码
    w.WriteHeader(status)
    // 顺序 3：Body（流式编码，自动换行）
    json.NewEncoder(w).Encode(data)
}

func getUser(w http.ResponseWriter, r *http.Request) {
    user := map[string]any{"id": 42, "name": "Alice"}
    writeJSON(w, http.StatusOK, user)
    // 响应:
    // HTTP/1.1 200 OK
    // Content-Type: application/json; charset=utf-8
    // {"id":42,"name":"Alice"}
}

// 错误场景：
//   http.Error(w, "user not found", http.StatusNotFound)   // 404 纯文本
//   writeJSON(w, 400, map[string]string{"error": "bad request"}) // 400 JSON`

const limitCode = `func uploadHandler(w http.ResponseWriter, r *http.Request) {
    // 限制 Body 最大 1MB——防超大请求拖垮内存
    r.Body = http.MaxBytesReader(w, r.Body, 1<<20)

    var data map[string]any
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil {
        // 超限时 err 是 *http.MaxBytesError
        var maxErr *http.MaxBytesError
        if errors.As(err, &maxErr) {
            http.Error(w, "body too large: "+maxErr.Error(), http.StatusRequestEntityTooLarge)
            return // 413 Payload Too Large
        }
        http.Error(w, "invalid json", http.StatusBadRequest)
        return
    }
    fmt.Fprintf(w, "got %d fields", len(data))
}`

const fullCode = `package main

import (
    "encoding/json"
    "net/http"
)

type APIResponse struct {
    Code int    ` + "`json:\"code\"`" + `
    Data any    ` + "`json:\"data\"`" + `
    Msg  string ` + "`json:\"msg\"`" + `
}

func writeJSON(w http.ResponseWriter, status int, v APIResponse) {
    w.Header().Set("Content-Type", "application/json; charset=utf-8")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(v)
}

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("GET /api/users/{id}", func(w http.ResponseWriter, r *http.Request) {
        id := r.PathValue("id")
        writeJSON(w, 200, APIResponse{0, map[string]string{"id": id, "name": "Alice"}, "ok"})
    })

    mux.HandleFunc("POST /api/users", func(w http.ResponseWriter, r *http.Request) {
        defer r.Body.Close()
        var body map[string]any
        if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
            writeJSON(w, 400, APIResponse{400, nil, "invalid json"})
            return
        }
        writeJSON(w, 201, APIResponse{0, body, "created"})
    })

    http.ListenAndServe(":8080", mux)
}
// $ curl localhost:8080/api/users/42
// 输出: {"code":0,"data":{"id":"42","name":"Alice"},"msg":"ok"}
// $ curl -X POST localhost:8080/api/users -d '{"name":"Bob"}'
// 输出: {"code":0,"data":{"name":"Bob"},"msg":"created"}`
</script>
