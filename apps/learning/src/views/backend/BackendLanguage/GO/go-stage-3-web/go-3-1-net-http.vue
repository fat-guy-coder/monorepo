<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌐 net/http 标准库</h1>
          <p class="text-sm text-slate-500 mt-1">Go 的 HTTP 服务器——不用框架，标准库就够了</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-1-net-http.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：HTTP 请求处理完整链路
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个 HTTP 请求从<strong>客户端发出</strong>到<strong>拿到响应</strong>，要穿过 net/http 的 5 个环节：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">net.Listen</code>（监听端口）→
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.Server</code>（接收连接 + 解析报文）→
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ServeMux</code>（路由匹配）→
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Handler.ServeHTTP</code>（执行业务逻辑）→
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ResponseWriter</code>（写响应返回）。<strong>响应逆流返回</strong>。
        </p>

        <figure class="mb-2">
          <svg viewBox="0 0 720 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="nf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="nf-resp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
              </marker>
            </defs>

            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">请求链路：客户端 → 监听 → Server → ServeMux → Handler → ResponseWriter</text>

            <!-- 客户端 -->
            <rect x="40" y="44" width="130" height="46" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="105" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">客户端</text>
            <text x="105" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">curl / 浏览器</text>

            <!-- 请求下行箭头 -->
            <line x1="105" y1="90" x2="80" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <text x="60" y="116" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">请求<tspan x="60" y="128">Request</tspan></text>

            <!-- 主流程 5 个环节 -->
            <rect x="20" y="150" width="120" height="78" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="80" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">net.Listen</text>
            <text x="80" y="200" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">监听 :8080</text>

            <rect x="158" y="150" width="120" height="78" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="218" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">http.Server</text>
            <text x="218" y="200" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">Accept + 解析</text>

            <rect x="296" y="150" width="120" height="78" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="356" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">ServeMux</text>
            <text x="356" y="200" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">路由匹配</text>

            <rect x="434" y="150" width="120" height="78" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="494" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">Handler</text>
            <text x="494" y="200" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">ServeHTTP 业务</text>

            <rect x="572" y="150" width="120" height="78" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="632" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">ResponseWriter</text>
            <text x="632" y="200" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#b45309">写响应返回</text>

            <!-- 环节间箭头 -->
            <line x1="140" y1="189" x2="158" y2="189" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="278" y1="189" x2="296" y2="189" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="416" y1="189" x2="434" y2="189" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="554" y1="189" x2="572" y2="189" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />

            <!-- 响应回流 -->
            <polyline points="632,150 632,102 172,102 172,92" fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#nf-resp)" />
            <text x="402" y="96" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">响应 Response 逆流返回</text>

            <!-- 职责标注 -->
            <text x="80" y="248" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">创建 TCP 监听器<tspan x="80" y="260">等待连接</tspan></text>
            <text x="218" y="248" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">接受连接<tspan x="218" y="260">读请求行/Header/Body</tspan></text>
            <text x="356" y="248" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">按 pattern<tspan x="356" y="260">找最匹配的 Handler</tspan></text>
            <text x="494" y="248" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">执行你的<tspan x="494" y="260">业务代码</tspan></text>
            <text x="632" y="248" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">写状态码 /<tspan x="632" y="260">Header / Body</tspan></text>

            <text x="16" y="300" font-size="11" font-family="monospace" fill="#0891b2">每个请求由独立 goroutine 处理 · ServeMux 与 Handler 是标准接口，可嵌套、可替换</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：net/http 服务器处理请求的完整链路——5 个环节各司其职，响应逆流返回客户端</figcaption>
        </figure>

        <!-- 操作示意图：两段式生命周期 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">两段式生命周期：先注册路由，再匹配分发</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">操作前 · 启动时：http.HandleFunc 把 pattern→handler 写入 ServeMux 路由表</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="nfo1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              </defs>
              <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">http.HandleFunc("/hello", helloHandler)</text>
              <line x1="170" y1="30" x2="170" y2="50" stroke="#4ade80" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#nfo1-arr)" />
              <rect x="80" y="56" width="180" height="72" rx="6" fill="#f8fafc" stroke="#0891b2" stroke-width="1.5" />
              <text x="170" y="68" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0891b2">ServeMux 路由表</text>
              <text x="96" y="88" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">/ping → pingHandler</text>
              <rect x="88" y="98" width="164" height="20" rx="4" fill="#dcfce7" stroke="#4ade80" stroke-width="1.5" />
              <text x="96" y="108" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#15803d">/hello → helloHandler ✓ 新注册</text>
              <text x="170" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">服务器启动前：所有 pattern → handler 先登记进路由表</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">注册只是「登记」，请求还没进来——此时服务器可以处于未启动状态</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">操作后 · 请求时：GET /hello 到达，ServeMux 匹配命中 → 调用 handler</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="nfo2-req" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
                <marker id="nfo2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              </defs>
              <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">GET /hello HTTP/1.1</text>
              <line x1="170" y1="30" x2="170" y2="48" stroke="#94a3b8" stroke-width="2" marker-end="url(#nfo2-req)" />
              <rect x="80" y="54" width="180" height="72" rx="6" fill="#f8fafc" stroke="#0891b2" stroke-width="1.5" />
              <text x="170" y="66" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0891b2">ServeMux 路由表</text>
              <text x="96" y="86" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">/ping → pingHandler</text>
              <rect x="88" y="96" width="164" height="20" rx="4" fill="#dcfce7" stroke="#4ade80" stroke-width="1.5" />
              <text x="96" y="106" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#15803d">/hello → helloHandler ✓ 命中</text>
              <line x1="170" y1="126" x2="170" y2="140" stroke="#4ade80" stroke-width="2" marker-end="url(#nfo2-arr)" />
              <rect x="80" y="146" width="180" height="30" rx="6" fill="#dcfce7" stroke="#4ade80" stroke-width="1.5" />
              <text x="170" y="161" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#15803d">helloHandler() 执行业务 → 写响应</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">匹配成功后才进入 Handler 执行业务，响应沿原路逆流返回客户端</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. Hello World -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Hello World——最小的 HTTP 服务器
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 启动一个 HTTP 服务器只需两行核心代码：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.HandleFunc</code> 注册路由，
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.ListenAndServe(":8080", nil)</code> 监听端口。
          不需要 Nginx、不需要安装任何第三方框架——标准库自带生产级 HTTP 服务器。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Go 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">net/http</code> ≈ <strong>Node.js 的 http 模块 + Express 的路由</strong>——标准库自带生产级 HTTP 服务器，不需要 Nginx 反向代理。<code class="bg-purple-100 px-1 rounded text-xs font-mono">http.HandleFunc</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">app.get()</code>，<code class="bg-purple-100 px-1 rounded text-xs font-mono">w.Write</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">res.send()</code>。<br/>
          最大差异：Node 的 http 是「回调 + 事件」，Go 的 net/http 是「每个请求一个 goroutine + 同步写法」——写起来像同步代码，内部却自动并发。
          </p>
        </aside>

        <div class="mb-4"><Code language="go" :code="helloCode" title="hello_http.go" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>注册路由：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">http.HandleFunc("/", fn)</code> 把路径 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"/"</code> 和函数绑定。"/" 是兜底模式，匹配所有未被更精确 pattern 覆盖的请求。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>写响应：</strong>Handler 里通过 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">w</code>（ResponseWriter）写回内容。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fmt.Fprintf(w, ...)</code> 就是往响应里写字符串。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>启动：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ListenAndServe(":8080", nil)</code> 是<strong>阻塞调用</strong>——它启动监听并一直服务，直到出错或进程退出。第二个参数 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">nil</code> 表示用全局默认路由器 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">DefaultServeMux</code>。</div>
          </li>
        </ol>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">r.URL.Path[1:]</code> 是去掉开头的 "/" 后的路径——<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">/world</code> 变成 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">world</code>。用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">curl localhost:8080/world</code> 测试。</p>
        </aside>
      </section>

      <!-- 2. Handler 接口 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Handler 接口——Go HTTP 的核心抽象
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          整个 net/http 建立在<strong>一个接口</strong>之上：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.Handler</code>，它只有一个方法
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ServeHTTP(ResponseWriter, *Request)</code>。
          路由器是 Handler、你的业务代码是 Handler、中间件还是 Handler——<strong>所有东西都是 Handler</strong>，这是理解整个 Go Web 生态的钥匙。
        </p>

        <div class="mb-4"><Code language="go" :code="handlerCode" title="handler_interface.go" /></div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-4">三种实现方式对比</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方式</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">写法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">http.HandlerFunc(fn)</td><td class="px-4 py-2 border">把普通函数强转成 Handler</td><td class="px-4 py-2 border">最常见——注册一个函数路由</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">自定义 struct 实现 ServeHTTP</td><td class="px-4 py-2 border">类型上实现接口方法</td><td class="px-4 py-2 border">需要携带状态/依赖的 Handler</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">http.ServeMux</td><td class="px-4 py-2 border">ServeMux 自身也是 Handler</td><td class="px-4 py-2 border">路由器——把请求再分发到子 Handler</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ Handler 接口的威力：</strong>因为所有东西都是 Handler，你可以像搭积木一样<strong>嵌套 Handler</strong>——日志 Handler 包裹 认证 Handler 包裹 业务 Handler。<code class="bg-slate-100 px-1 rounded text-xs font-mono">func(http.Handler) http.Handler</code> 就是 Go 中间件的本质（下一节 go-3-4 详解）。</p>
        </aside>
      </section>

      <!-- 3. ResponseWriter 三方法 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          ResponseWriter——写响应的三个方法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.ResponseWriter</code> 是接口，Handler 通过它把响应写回客户端。它只有 3 个方法，但<strong>顺序必须正确</strong>：
        </p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Header()</code>：</strong>返回响应头 map（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">http.Header</code>），用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Set(key, value)</code> 设置。必须在写 Body 之前设置才生效。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">WriteHeader(code)</code>：</strong>写状态码（如 200、404、500）。<strong>只在第一次调用生效</strong>，之后调用被忽略。不调用则默认 200。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Write(data)</code>：</strong>写 Body 字节。可调用多次（内容拼接）。首次 Write 会<strong>隐式触发</strong> WriteHeader(200)——所以想写非 200 状态码，必须先调 WriteHeader。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="respWriterCode" title="response_writer.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>顺序错误是新手最容易踩的坑。<code class="bg-slate-100 px-1 rounded text-xs font-mono">Write([]byte(...))</code> 之后再调 <code class="bg-slate-100 px-1 rounded text-xs font-mono">WriteHeader(404)</code>，状态码<strong>不会变成 404</strong>——响应已经以 200 发出去了。先 Header，再 WriteHeader，最后 Write。</p>
        </aside>
      </section>

      <!-- 4. ServeMux -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          ServeMux——Go 标准路由器
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.ServeMux</code> 是 Go 的官方路由器。Go 1.22+ 大幅增强：支持<strong>方法匹配</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"GET /x"</code>）和<strong>路径参数</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">{id}</code>）。
          小项目完全不需要 Gin——标准库就够了。
        </p>
        <div class="mb-4"><Code language="go" :code="muxCode" title="servemux.go" /></div>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed">
          pattern 语法核心：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">"METHOD /path/{wildcard}"</code>。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">{id}</code> 匹配<strong>单段路径</strong>（不含 "/"），用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">r.PathValue("id")</code> 取值。
          pattern 不带方法时匹配<strong>所有方法</strong>。更完整的匹配规则（优先级、405/404、通配符）在 go-3-3 详解。
        </p>
      </section>

      <!-- 5. http.Server 生产配置 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          http.Server——生产级配置
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.ListenAndServe</code> 是快速原型——它背后也是创建一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.Server{Addr: addr}</code>，但没有超时、没有 Header 上限。
          生产环境直接构造 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.Server</code> 结构体，<strong>显式配置所有超时</strong>，防止慢连接拖垮服务器。
        </p>
        <div class="mb-4"><Code language="go" :code="serverCode" title="production_server.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">字段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">防的攻击</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">ReadTimeout</td><td class="px-4 py-2 border">读完整请求（含 Body）超时</td><td class="px-4 py-2 border">Slow Body / 读取超时</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">ReadHeaderTimeout</td><td class="px-4 py-2 border">只读请求头超时</td><td class="px-4 py-2 border">Slowloris（慢头攻击）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">WriteTimeout</td><td class="px-4 py-2 border">写响应超时</td><td class="px-4 py-2 border">慢响应客户端</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">IdleTimeout</td><td class="px-4 py-2 border">keep-alive 空闲连接超时</td><td class="px-4 py-2 border">闲置连接占资源</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">MaxHeaderBytes</td><td class="px-4 py-2 border">请求头最大字节数</td><td class="px-4 py-2 border">超大 Header 攻击</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>永远用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">log.Fatal(srv.ListenAndServe())</code> 包住监听——<code class="bg-slate-100 px-1 rounded text-xs font-mono">ListenAndServe</code> 出错时返回 error（如端口被占用），不处理的话 main 函数直接返回、进程「悄悄退出」。加 <code class="bg-slate-100 px-1 rounded text-xs font-mono">ReadHeaderTimeout</code> 抵御 Slowloris 攻击，这是生产最容易被忽略的一项。</p>
        </aside>
      </section>

      <!-- 6. 请求生命周期 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          请求生命周期——7 步拆解
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          理解「一次请求在 net/http 内部发生了什么」，是写高性能 Web 服务的基础。从客户端发起 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">GET /hello</code> 开始：
        </p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>建立连接：</strong>客户端发起 TCP 连接（三次握手）。这是 OS 层面的连接，Go 还没参与。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>Accept：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">net.Listen</code> 创建的监听器收到连接，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">http.Server</code> 的 accept 循环取出它。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>并发处理：</strong>Server 为这个连接启动一个<strong>goroutine</strong>，读取并解析请求行、Header、Body，组装成 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*http.Request</code>。这是 Go 高并发的根源——每个请求互不阻塞。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>调用 Handler：</strong>Server 调用配置的 Handler 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ServeHTTP(w, r)</code>。如果你传的是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">nil</code>，则用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">DefaultServeMux</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>路由匹配：</strong>ServeMux 按「最长匹配 + 精确优先」规则找出最匹配的 pattern，把请求转发给对应的子 Handler。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
            <div class="text-slate-600"><strong>执行业务：</strong>你的 Handler 函数读取 Request、通过 ResponseWriter 写入响应（Header → 状态码 → Body）。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">7</span>
            <div class="text-slate-600"><strong>返回 + 复用：</strong>Server 把缓冲的响应刷新回客户端。若请求头声明 keep-alive，连接不关闭，等待下一个请求复用（省去重复握手）。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="lifecycleCode" title="lifecycle.go" /></div>
      </section>

      <!-- 7. 常见坑 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          常见坑——至少记住这 4 个
        </h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：Write 之后 WriteHeader 不生效。</strong><br/>先 <code class="bg-slate-100 px-1 rounded text-xs font-mono">w.Write(...)</code> 再 <code class="bg-slate-100 px-1 rounded text-xs font-mono">w.WriteHeader(404)</code>——状态码仍是 200（首次 Write 已隐式发送 200）。正确的顺序永远是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Header() → WriteHeader() → Write()</code>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：ListenAndServe 的 error 被忽略 → 服务器悄悄退出。</strong><br/>端口被占用时 <code class="bg-slate-100 px-1 rounded text-xs font-mono">ListenAndServe</code> 返回 error，如果不处理，main 直接返回、进程退出，看起来像「启动失败」。必须 <code class="bg-slate-100 px-1 rounded text-xs font-mono">log.Fatal(http.ListenAndServe(...))</code>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：全局共享状态并发不安全。</strong><br/>每个请求一个 goroutine，多个请求<strong>同时</strong>读写同一个 map/变量会造成 data race。共享状态必须用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code>、<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Map</code> 或原子操作保护。用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go run -race</code> 检测。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：HandleFunc pattern 重复注册会 panic。</strong><br/>对<strong>同一个 pattern</strong> 调用两次 <code class="bg-slate-100 px-1 rounded text-xs font-mono">http.HandleFunc</code>（或注册冲突的 pattern，如先注册 <code class="bg-slate-100 px-1 rounded text-xs font-mono">"/"</code> 再注册 <code class="bg-slate-100 px-1 rounded text-xs font-mono">"/"</code>）会直接 panic。生产项目用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">http.NewServeMux()</code> 避免污染全局 DefaultServeMux。</p>
          </aside>
        </div>
      </section>

      <!-- 8. 最佳实践与对比 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          最佳实践与方案对比
        </h2>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">ListenAndServe vs http.Server</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">ListenAndServe</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">http.Server</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">超时配置</td><td class="px-4 py-2 border">无（全部默认）</td><td class="px-4 py-2 border">Read/Write/Idle/Header 全可配</td></tr>
              <tr><td class="px-4 py-2 border">TLS</td><td class="px-4 py-2 border">只能 ListenAndServeTLS（证书文件）</td><td class="px-4 py-2 border">TLSConfig 精细控制，支持优雅关闭</td></tr>
              <tr><td class="px-4 py-2 border">优雅关闭</td><td class="px-4 py-2 border">不支持</td><td class="px-4 py-2 border">srv.Shutdown(ctx)</td></tr>
              <tr><td class="px-4 py-2 border">Header 上限</td><td class="px-4 py-2 border">默认 1MB</td><td class="px-4 py-2 border">MaxHeaderBytes 自定义</td></tr>
              <tr><td class="px-4 py-2 border">适用</td><td class="px-4 py-2 border">学习 / 原型 / 工具</td><td class="px-4 py-2 border">生产 API 服务</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-2">net/http vs Gin vs Express</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">net/http (Go)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Gin</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Express (Node)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">依赖</td><td class="px-4 py-2 border">标准库，零依赖</td><td class="px-4 py-2 border">第三方库</td><td class="px-4 py-2 border">第三方库</td></tr>
              <tr><td class="px-4 py-2 border">并发模型</td><td class="px-4 py-2 border">每请求一个 goroutine（多核并行）</td><td class="px-4 py-2 border">同 net/http</td><td class="px-4 py-2 border">单线程事件循环</td></tr>
              <tr><td class="px-4 py-2 border">路由</td><td class="px-4 py-2 border">1.22+ 方法/通配符</td><td class="px-4 py-2 border">更丰富的通配符/分组</td><td class="px-4 py-2 border">正则式路由</td></tr>
              <tr><td class="px-4 py-2 border">中间件</td><td class="px-4 py-2 border">函数式嵌套</td><td class="px-4 py-2 border">内置丰富中间件</td><td class="px-4 py-2 border">内置 + 生态丰富</td></tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">http.NewServeMux()</code> 而非全局 DefaultServeMux，避免注册冲突和测试污染</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>生产必配 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ReadHeaderTimeout</code>，防 Slowloris</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>优雅关闭用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">srv.Shutdown(ctx)</code>，等存量请求处理完再退出</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Handler 里避免启动无界 goroutine——请求结束 goroutine 就失去生命周期控制</span></li>
        </ul>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：HTTP 请求生命周期
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          按顺序点按钮，观察一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">GET /hello</code> 请求如何穿过 5 个环节：
          <strong>请求进入 → 路由匹配 → Handler 处理 → 写响应 → 返回客户端</strong>。橙色圆点代表请求所处位置，绿色 = 已完成环节。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 环节: {{ step === 5 ? '完成 ✅' : step < 0 ? '待命' : (step + 1) + ' / 5' }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 全链路 5 环节 · 每环节 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doStart" :disabled="busy || step !== -1" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">① 请求进入</button>
          <button @mousedown="doRoute" :disabled="busy || step !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">② 路由匹配</button>
          <button @mousedown="doHandle" :disabled="busy || step !== 1" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">③ Handler 处理</button>
          <button @mousedown="doWrite" :disabled="busy || step !== 2" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">④ 写响应</button>
          <button @mousedown="doReturn" :disabled="busy || step !== 3" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⑤ 返回客户端</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 客户端标记 -->
              <v-circle v-if="step === -1 || step === 5" :config="clientCfg" />
              <v-text :config="clientLabelCfg" />
              <!-- 5 个环节节点 -->
              <v-rect v-for="(s, i) in steps" :key="'node'+i" :config="nodeRectCfg(i)" />
              <v-text v-for="(s, i) in steps" :key="'nname'+i" :config="nodeNameCfg(i)" />
              <v-text v-for="(s, i) in steps" :key="'nsub'+i" :config="nodeSubCfg(i)" />
              <!-- 环节间箭头 -->
              <v-arrow v-for="i in 4" :key="'arr'+i" :config="arrowCfg(i-1)" />
              <!-- 请求圆点 -->
              <v-circle v-if="step >= 0" :config="ballCfg" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Handler 接口 = Go HTTP 的全部</strong>——一个方法 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ServeHTTP(ResponseWriter, *Request)</code>，所有东西都是 Handler</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>ResponseWriter 三方法顺序：<strong>Header() → WriteHeader() → Write()</strong>，顺序错 Header 失效、状态码被忽略</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Go 1.22+ ServeMux 支持方法匹配和路径参数（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">GET /users/{id}</code>）——小项目不需要 Gin</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>生产环境用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">http.Server</code> 配置超时 + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">log.Fatal</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Shutdown</code> 优雅关闭</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>每个请求一个 goroutine，注意共享状态并发安全</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-13-goroutine-leak" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：goroutine 泄漏</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-2-request-response" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：请求与响应 →</RouterLink>
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
  { id: "sec-1", name: "Hello World 服务器" },
  { id: "sec-2", name: "Handler 接口" },
  { id: "sec-3", name: "ResponseWriter 三方法" },
  { id: "sec-4", name: "ServeMux 路由" },
  { id: "sec-5", name: "生产级 http.Server" },
  { id: "sec-6", name: "请求生命周期 7 步" },
  { id: "sec-7", name: "常见坑" },
  { id: "sec-8", name: "最佳实践与对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-9", name: "小结" },
]

// ===== 🎬 HTTP 请求生命周期动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(240), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const steps = [
  { name: '① 请求进入', sub: 'Request 到达 :8080' },
  { name: '② 路由匹配', sub: 'ServeMux 找最匹配 pattern' },
  { name: '③ Handler 处理', sub: 'ServeHTTP 执行业务' },
  { name: '④ 写响应', sub: 'ResponseWriter 写出' },
  { name: '⑤ 返回客户端', sub: 'Response 回到浏览器' },
]
const step = ref(-1)   // -1 待命 · 0..4 当前环节 · 5 完成
const NW = 118, NH = 74, NG = 12, NY = 60
const sx = ref(20)

function layout() {
  const total = steps.length * NW + (steps.length - 1) * NG
  sx.value = Math.max(6, (W.value - total) / 2)
}

function nodeX(i: number) { return sx.value + i * (NW + NG) }

function nodeFill(i: number) {
  if (step.value === 5) return C.green
  if (i < step.value) return C.green
  if (i === step.value) return C.orange
  return C.cyan
}

function nodeRectCfg(i: number) {
  return { x: nodeX(i), y: NY, width: NW, height: NH, fill: nodeFill(i), cornerRadius: 8,
    stroke: step.value === i ? '#d97706' : '#0891b2', strokeWidth: step.value === i ? 2.5 : 1.5,
    shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 4, shadowOffsetY: 2 }
}
function nodeNameCfg(i: number) {
  return { x: nodeX(i), y: NY + 14, width: NW, text: steps[i].name, fontSize: 13, fontFamily: 'monospace',
    fontStyle: 'bold', fill: step.value === 5 || step.value === i ? '#ffffff' : '#0f172a', align: 'center' }
}
function nodeSubCfg(i: number) {
  return { x: nodeX(i), y: NY + 38, width: NW, text: steps[i].sub, fontSize: 10, fontFamily: 'monospace',
    fill: step.value === 5 || step.value === i ? '#fefce8' : '#64748b', align: 'center' }
}
function arrowCfg(i: number) {
  const x1 = nodeX(i) + NW, x2 = nodeX(i + 1)
  return { points: [x1, NY + NH / 2, x2, NY + NH / 2], stroke: '#94a3b8', strokeWidth: 2, pointerLength: 8, pointerWidth: 6, fill: '#94a3b8' }
}

const clientX = computed(() => sx.value - 44)
const clientCfg = computed(() => ({ x: clientX.value, y: NY + NH / 2, radius: 14, fill: C.ghost,
  stroke: '#94a3b8', strokeWidth: 1.5, dash: [4, 3] }))
const clientLabelCfg = computed(() => ({ x: clientX.value - 30, y: NY + NH / 2 + 22, width: 60, text: 'CLIENT',
  fontSize: 9, fontFamily: 'monospace', fill: C.muted, align: 'center' }))

const ballCfg = computed(() => {
  const cx = step.value === 5 ? clientX.value : nodeX(step.value) + NW / 2
  return { x: cx, y: NY + NH / 2, radius: 9, fill: C.orange,
    stroke: '#d97706', strokeWidth: 2, shadowColor: 'rgba(245,158,11,.5)', shadowBlur: 8, shadowOffsetY: 2 }
})

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(200); busy.value = false }
}

function doStart() {
  act('① 请求进入——GET /hello 到达监听端口，Accept 连接', async () => { step.value = 0; await d(500) })
}
function doRoute() {
  act('② 路由匹配——ServeMux 命中 pattern "/hello"', async () => { step.value = 1; await d(500) })
}
function doHandle() {
  act('③ Handler 处理——ServeHTTP 执行你的业务代码', async () => { step.value = 2; await d(500) })
}
function doWrite() {
  act('④ 写响应——ResponseWriter 写入 Header + Body', async () => { step.value = 3; await d(500) })
}
function doReturn() {
  act('⑤ 返回客户端——响应逆流返回，连接 keep-alive', async () => {
    step.value = 4; await d(450)
    step.value = 5; status.value = '✅ 请求完成——响应已回到浏览器'
    await d(600)
  })
}
function doReset() { busy.value = false; step.value = -1; status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  layout()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const helloCode = `package main

import (
    "fmt"
    "net/http"
)

func main() {
    // 注册路由："/" 是兜底 pattern，匹配所有未被更精确 pattern 覆盖的请求
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
    })

    // 阻塞监听 8080 端口，处理请求直到进程退出
    // 第二个参数 nil → 使用默认路由器 DefaultServeMux
    http.ListenAndServe(":8080", nil)
}

// 启动后：
// $ curl localhost:8080/world
// 输出: Hello, world!
// $ curl localhost:8080/go
// 输出: Hello, go!`

const handlerCode = `// Handler 接口——整个 net/http 的基石，只有一个方法
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}

// 方式一：自定义 struct 实现 Handler（可携带状态/依赖）
type myHandler struct {
    greeting string
}

func (h myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, h.greeting)
}
// 注册：http.Handle("/custom", myHandler{greeting: "hi"})
// 访问 /custom → 输出: hi

// 方式二：http.HandlerFunc——把普通函数"强转"成 Handler
func greeting(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "hello from func")
}
// 下面两种写法完全等价：
//   http.Handle("/a", http.HandlerFunc(greeting))
//   http.HandleFunc("/a", greeting)   // HandleFunc 是语法糖
// 访问 /a → 输出: hello from func`

const respWriterCode = `func handler(w http.ResponseWriter, r *http.Request) {
    // 顺序 1：设置 Header（必须先于 WriteHeader/Write，否则不生效）
    w.Header().Set("Content-Type", "text/html; charset=utf-8")
    w.Header().Set("X-Server", "go-net-http")

    // 顺序 2：写状态码（默认 200；只在第一次调用生效，之后被忽略）
    w.WriteHeader(http.StatusOK) // 200

    // 顺序 3：写 Body（可以写多次，内容会拼接）
    w.Write([]byte("<h1>Hello</h1>"))
    w.Write([]byte("<p>Go</p>"))
}
// 响应结果（HTTP/1.1 200 OK）：
//   Content-Type: text/html; charset=utf-8
//   X-Server: go-net-http
//   <h1>Hello</h1><p>Go</p>`

const muxCode = `func main() {
    // 显式创建自己的路由器，避免污染全局 DefaultServeMux
    mux := http.NewServeMux()

    // Go 1.22+：方法 + 路径参数 {id}（匹配单段路径）
    mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
        id := r.PathValue("id") // 从 URL 中提取 {id} 的值
        fmt.Fprintf(w, "get user %s", id)
    })

    mux.HandleFunc("POST /users", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusCreated) // 201
        fmt.Fprintln(w, "user created")
    })

    // "/" 兜底：所有没被更精确 pattern 匹配的请求走这里
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        http.NotFound(w, r)
    })

    http.ListenAndServe(":8080", mux)
}
// $ curl localhost:8080/users/42          → get user 42
// $ curl -X POST localhost:8080/users     → user created
// $ curl localhost:8080/xxx               → 404 page not found`

const serverCode = `import (
    "crypto/tls"
    "log"
    "net/http"
    "time"
)

srv := &http.Server{
    Addr:    ":8080",
    Handler: mux,
    // 读完整请求（含 Body）超时 5s——防慢 Body 攻击
    ReadTimeout:  5 * time.Second,
    // 只读请求头超时 2s——防 Slowloris 慢头攻击
    ReadHeaderTimeout: 2 * time.Second,
    // 写响应超时 10s
    WriteTimeout: 10 * time.Second,
    // keep-alive 空闲连接超时 120s——超时后自动关闭释放资源
    IdleTimeout:  120 * time.Second,
    // 请求头最大 1MB——防超大 Header
    MaxHeaderBytes: 1 << 20,
    // 强制最低 TLS 1.2
    TLSConfig: &tls.Config{MinVersion: tls.VersionTLS12},
}

// ListenAndServe 出错（如端口被占用）时返回 error，log.Fatal 打印并退出
log.Fatal(srv.ListenAndServe())
// 优雅关闭（配合信号处理）：
//   srv.Shutdown(context.Background()) // 等存量请求处理完再退出`

const lifecycleCode = `package main

import (
    "fmt"
    "net/http"
    "time"
)

// 一个完整的业务 Handler——体现生命周期第 6 步
func apiHandler(w http.ResponseWriter, r *http.Request) {
    start := time.Now() // 第 6 步开始时打点

    w.Header().Set("Content-Type", "text/plain")
    fmt.Fprintf(w, "method=%s path=%s", r.Method, r.URL.Path)

    // 生命周期第 6 步结束，第 7 步 Server 自动把响应刷新回客户端
    elapsed := time.Since(start)
    _ = elapsed // 实际项目这里写日志
}
// 输出: method=GET path=/api/hello

// 每个请求独立 goroutine（生命周期第 3 步）——验证并发：
// 同时开 3 个终端 curl，每个请求都在各自的 goroutine 里并行处理，
// 谁先写完谁先返回，互不阻塞。`

const _ = reactive // 保留依赖引用，避免未使用告警
</script>
