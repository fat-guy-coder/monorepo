<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">CORS 与限流</h1>
          <p class="text-sm text-slate-500 mt-1">跨域处理 · 令牌桶限流——API 安全标配</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-12-cors-rate-limit.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-12</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：CORS 预检放行 + 令牌桶限流
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          本章两个独立却又经常一起出场的安全机制。<strong>CORS</strong> 解决「谁能跨域访问我的 API」（浏览器同源策略的例外通道）；
          <strong>限流</strong>解决「谁来访问都行，但每秒最多放进来多少」（防刷/防崩溃）。前者靠响应头放行，后者靠令牌桶放行。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="cl-a-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="360" y="22" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">CORS 预检流程：OPTIONS 探路 → 放行头 → 真实请求</text>

            <rect x="40" y="70" width="150" height="160" rx="10" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5" />
            <text x="115" y="96" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0f766e">🌐 浏览器（前端）</text>
            <text x="115" y="130" text-anchor="middle" font-size="10" font-family="monospace" fill="#475569">http://localhost:5173</text>
            <text x="115" y="150" text-anchor="middle" font-size="10" font-family="monospace" fill="#0f766e">Origin: localhost:5173</text>
            <text x="115" y="170" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">请求方</text>

            <rect x="530" y="70" width="150" height="160" rx="10" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.5" />
            <text x="605" y="96" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0e7490">🖥️ 服务器（Gin）</text>
            <text x="605" y="130" text-anchor="middle" font-size="10" font-family="monospace" fill="#0e7490">localhost:8080</text>
            <text x="605" y="150" text-anchor="middle" font-size="10" font-family="monospace" fill="#155e75">Access-Control-Allow-*</text>
            <text x="605" y="170" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">放行方</text>

            <line x1="190" y1="100" x2="530" y2="100" stroke="#f59e0b" stroke-width="2" marker-end="url(#cl-a-arr)" />
            <text x="360" y="90" text-anchor="middle" font-size="10" font-family="monospace" fill="#b45309">① 预检 OPTIONS /api/menus（带 Origin）</text>

            <line x1="530" y1="140" x2="190" y2="140" stroke="#4ade80" stroke-width="2" marker-end="url(#cl-a-arr)" />
            <text x="360" y="160" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d">② 允许：Access-Control-Allow-Origin 等头</text>

            <line x1="190" y1="190" x2="530" y2="190" stroke="#06b6d4" stroke-width="2" marker-end="url(#cl-a-arr)" />
            <text x="360" y="182" text-anchor="middle" font-size="10" font-family="monospace" fill="#0e7490">③ 真实请求 GET /api/menus?tree=true</text>

            <line x1="530" y1="218" x2="190" y2="218" stroke="#06b6d4" stroke-width="2" marker-end="url(#cl-a-arr)" />
            <text x="360" y="235" text-anchor="middle" font-size="10" font-family="monospace" fill="#0e7490">④ 响应 200 + data</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：CORS 预检流程——非同源请求先发 OPTIONS 探路，服务器用 Access-Control-Allow-* 声明放行规则，通过后才发真实请求</figcaption>
        </figure>

        <figure>
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="cl-b-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="360" y="22" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">令牌桶算法：匀速补令牌，请求来消费，桶满溢出 / 桶空拒绝</text>

            <rect x="40" y="48" width="120" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="100" y="70" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">⏱ 令牌生成器</text>
            <line x1="160" y1="68" x2="520" y2="68" stroke="#f59e0b" stroke-width="2" marker-end="url(#cl-b-arr)" />
            <text x="340" y="58" text-anchor="middle" font-size="10" font-family="monospace" fill="#b45309">每秒补 r 个令牌（匀速）</text>

            <rect x="40" y="180" width="120" height="40" rx="8" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.5" />
            <text x="100" y="202" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#0e7490">➡️ 请求</text>
            <line x1="160" y1="200" x2="520" y2="200" stroke="#06b6d4" stroke-width="2" marker-end="url(#cl-b-arr)" />
            <text x="340" y="218" text-anchor="middle" font-size="10" font-family="monospace" fill="#0e7490">每个请求消耗 1 个令牌</text>

            <rect x="520" y="50" width="150" height="180" rx="10" fill="#f0fdfa" stroke="#14b8a6" stroke-width="2" />
            <text x="595" y="72" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#0f766e">🪣 令牌桶</text>
            <text x="595" y="88" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">容量 N = 5</text>
            <circle cx="545" cy="205" r="12" fill="#4ade80" />
            <circle cx="605" cy="205" r="12" fill="#4ade80" />
            <circle cx="545" cy="160" r="12" fill="#4ade80" />
            <circle cx="605" cy="160" r="12" fill="#4ade80" />
            <circle cx="545" cy="115" r="12" fill="#4ade80" />

            <line x1="670" y1="80" x2="695" y2="30" stroke="#ef4444" stroke-width="2" marker-end="url(#cl-b-arr)" />
            <text x="605" y="38" text-anchor="middle" font-size="10" font-family="monospace" fill="#dc2626">桶满 → 溢出丢弃</text>
            <text x="605" y="255" text-anchor="middle" font-size="10" font-family="monospace" fill="#dc2626">桶空 → 拒绝 429</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：令牌桶算法——生成器匀速补令牌，请求消费令牌；桶空拒绝（429），桶满溢出。兼具「限速」与「短暂突发」能力</figcaption>
        </figure>
      </section>

      <!-- 1. CORS 与同源策略 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          CORS 与同源策略
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          <strong>同源策略</strong>是浏览器的安全基石：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http://localhost:5173</code> 的页面，
          默认只能向「同协议 + 同域名 + 同端口」的地址发请求。前端跑在 5173、Go 后端跑在 8080——端口不同 = <strong>跨域</strong>，直接被拦。
          而 <strong>CORS（跨域资源共享）</strong>就是浏览器官方开的一条「受控通道」：<strong>服务器</strong>在响应头里声明
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Access-Control-Allow-Origin</code>，
          浏览器看到「哦，它允许我访问」，才把响应交给页面。
        </p>
        <ul class="space-y-3 mb-4 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>拦截方是浏览器，不是服务器</strong>——请求其实发出去了，只是浏览器不把响应交给 JS。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>curl / Postman 没这回事</strong>——它们不执行同源策略，所以接口报 CORS 错时先用 curl 确认是接口本身的问题还是跨域问题。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>控制权在服务端</strong>——前端改不了，只能后端在响应头里「授权」。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>CORS ≈ <strong>访客登记制度</strong>。同源 = 自家员工直接进；跨域 = 访客要先到前台（OPTIONS 预检）报备「我是谁（Origin）」，前台查白名单后给张通行证（Allow-Origin），访客才能去见人。你写前端请求时如果踩 CORS 错，第一反应是<strong>找后端要响应头</strong>，不是在前端里硬改。</p>
        </aside>
      </section>

      <!-- 2. 简单 vs 预检请求 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          简单请求 vs 预检请求
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          跨域请求分两类。<strong>简单请求</strong>（GET/POST/HEAD，Content-Type 是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">application/x-www-form-urlencoded</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">multipart/form-data</code> 或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">text/plain</code>，且不带自定义头）不会触发预检，直接发，靠响应头放行。
          <strong>一旦带了 Authorization 头、或 Content-Type 用 application/json、或用了 PUT/DELETE</strong>，就变成「非简单」，浏览器会<strong>先发一个 OPTIONS 预检请求</strong>探路。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比项</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">简单请求</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">预检请求（非简单）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">方法</td><td class="px-4 py-2 border">GET / POST / HEAD</td><td class="px-4 py-2 border">PUT / DELETE / PATCH 等</td></tr>
              <tr><td class="px-4 py-2 border">Content-Type</td><td class="px-4 py-2 border">表单类 / text/plain</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded text-xs">application/json</code> 等</td></tr>
              <tr><td class="px-4 py-2 border">自定义头</td><td class="px-4 py-2 border">不能带（如 Authorization）</td><td class="px-4 py-2 border">可带</td></tr>
              <tr><td class="px-4 py-2 border">预检</td><td class="px-4 py-2 border">无，直接发真实请求</td><td class="px-4 py-2 border">先 OPTIONS，通过再发真实请求</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-md font-semibold text-slate-700 mb-3">GET/POST 带上 JSON 后为什么就变预检了？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          因为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">application/json</code> 不是表单类 MIME，浏览器认为它「危险」；同理 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Authorization</code> 头带的是敏感凭证。预检就是浏览器替前端问一句：
          「服务器，我用 PUT + JSON + Authorization 访问你，你允许吗？」服务器若返回正确的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Access-Control-Allow-*</code>，预检通过，才发真请求。
        </p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>线上经常看到「OPTIONS 请求报 404 / 405 / 500」——因为<strong>路由没有处理 OPTIONS 方法</strong>，或中间件把 OPTIONS 当普通请求拦了。后端一定要对预检请求提前返回 204，且<strong>不进鉴权</strong>（预检不带业务凭证，只带 Origin）。</p>
        </aside>
      </section>

      <!-- 3. CORS 响应头清单 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          CORS 响应头清单
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          全部授权都靠这几个响应头。理解了它们，cors 中间件那几行配置就不神秘了：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">响应头</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Access-Control-Allow-Origin</td><td class="px-4 py-2 border">允许哪个源访问（可写具体源，或 <code class="bg-slate-100 px-1 rounded text-xs">*</code>；带凭证时不能用 <code class="bg-slate-100 px-1 rounded text-xs">*</code>）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Access-Control-Allow-Methods</td><td class="px-4 py-2 border">允许哪些方法：GET, POST, PUT, DELETE, OPTIONS</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Access-Control-Allow-Headers</td><td class="px-4 py-2 border">允许哪些请求头：Origin, Content-Type, Authorization</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Access-Control-Allow-Credentials</td><td class="px-4 py-2 border">是否允许携带 Cookie/凭证（<code class="bg-slate-100 px-1 rounded text-xs">true</code>）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Access-Control-Max-Age</td><td class="px-4 py-2 border">预检结果缓存多少秒，减少重复 OPTIONS</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="corsManualCode" title="cors_manual.go" /></div>
        <div class="mb-4"><Code language="go" :code="corsGinCode" title="cors_gin.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>① 生产环境 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs">Allow-Origin</code> 写<strong>具体源</strong>而非 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs">*</code>（配合凭证时浏览器强制要求）；② 记得把 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs">OPTIONS</code> 加进 Allow-Methods；③ 用 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs">MaxAge</code> 缓存预检，别让每个请求都多飞一次 OPTIONS。</p>
        </aside>
      </section>

      <!-- 4. 限流算法对比 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          常见限流算法对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          限流的目标：<strong>让请求速率稳定在阈值内</strong>，保护后端不被突刺打垮。四大经典算法各有取舍：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">算法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">思路</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优点</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">缺点</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">固定窗口计数器</td><td class="px-4 py-2 border">每秒计数，超过 N 拒绝，到点清零</td><td class="px-4 py-2 border">实现最简单</td><td class="px-4 py-2 border">窗口边界可被打双倍（59s+0s）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">滑动窗口</td><td class="px-4 py-2 border">记录每毫秒请求数，滚动统计近 1 秒</td><td class="px-4 py-2 border">平滑，边界不穿洞</td><td class="px-4 py-2 border">要存时间戳列表，占内存</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">令牌桶</td><td class="px-4 py-2 border">匀速补令牌，请求消费；桶空拒绝</td><td class="px-4 py-2 border">允许<strong>短暂突发</strong>（借桶里存量）</td><td class="px-4 py-2 border">突发量大时仍可能超阈</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">漏桶</td><td class="px-4 py-2 border">请求进队列，匀速出队处理</td><td class="px-4 py-2 border">绝对匀速，适合削峰</td><td class="px-4 py-2 border">处理不过来就积压/丢弃，无突发能力</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-md font-semibold text-slate-700 mb-3">为什么 Go 项目默认选令牌桶？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          因为它<strong>既能限速又能容忍突发</strong>：桶里的存量令牌允许用户瞬间发 20 个请求（比如刷新页面一次要并行拉好几个接口），同时每秒只补充固定数量，整体速率又被锁住。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">golang.org/x/time/rate</code> 是官方扩展包里的成熟实现，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rate.NewLimiter(r, b)</code> 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">r</code> 是每秒补充数、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">b</code> 是桶容量（突发上限）。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>令牌桶 ≈ <strong>每分钟限 30 次点击的按钮</strong>——你手快连点 5 下（突发）都能过，但后面得等「配额」恢复。对应到前端就是<strong>请求失败 429 后做指数退避重试</strong>，而不是立刻疯狂重放。</p>
        </aside>
      </section>

      <!-- 5. 令牌桶实现 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          令牌桶限流中间件实现
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          生产姿势：<strong>每个 IP 一个 limiter</strong>，请求进来先取令牌，取不到返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">429 Too Many Requests</code> 并中断链路。核心就三行：LoadOrStore 建限流器 → Allow 取令牌 → 满了 429。
        </p>
        <div class="mb-4"><Code language="go" :code="rateLimitGinCode" title="rate_limit.go" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3">手写一个迷你令牌桶，把算法跑明白</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          别在生产手写（标准库更好），但理解内部结构很重要：<strong>一个带缓冲的 channel 就是桶</strong>，Ticker 定时往里放令牌，满了就丢（溢出），请求从 channel 取令牌取不到就拒绝。
        </p>
        <div class="mb-4"><Code language="go" :code="rateLimitManualCode" title="token_bucket.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 1：</strong>per-IP 用 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs">sync.Map</code> 会<strong>无限增长</strong>——每个新 IP 都往里加。生产要对 key 做清理或换 Redis 限流（<code class="bg-amber-100 text-amber-700 px-1 rounded text-xs">INCR + EXPIRE</code>）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 2：</strong>简单实现只按 IP 限，但<strong>爬虫/攻击者会换 IP</strong>。真实系统常叠加：IP 限 + 用户限（登录态）+ 全局限，多维度配合。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>429 响应里带 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs">Retry-After</code> 头告诉客户端几秒后重试；登录/支付等敏感接口单独用更严的限流器；限流器放在<strong>网关或最外层中间件</strong>，别让业务逻辑处理被限流的流量。</p>
        </aside>
      </section>

      <!-- 6. 真实场景 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          真实场景：前端跨域联调
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          学习网站前端（5173）调后端（8080）的完整链路，正好把 CORS + 鉴权 + 限流串起来：
        </p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">浏览器发起 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">GET http://localhost:8080/api/menus?tree=true</code>，带 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Origin: localhost:5173</code></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">Go 后端 CORS 中间件匹配 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">AllowOrigins</code>，响应带上 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Access-Control-Allow-Origin: http://localhost:5173</code></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600">若带 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Authorization: Bearer xxx</code>（JWT 登录态），会先触发一次 OPTIONS 预检，后端返回 204 + 放行头</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600">限流中间件按 IP 取令牌——正常浏览 10 req/s 够用；若被脚本刷，同一 IP 超速则返回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">429</code></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600">前端 axios 捕获 429，指数退避后重试；捕获 401 则调 refresh 换新 token 再重放</div>
          </li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这套链路 ≈ <strong>前端封装好的 request.ts</strong>：拦截器统一加 token（对应 Authorization）、统一处理 401/429（对应 refresh + 退避重试）、config 里 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">withCredentials: true</code>（对应 Allow-Credentials 带 Cookie）。后端给的这些响应头，前端全靠浏览器自动处理。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：令牌桶限流
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          右侧是容量 5 的令牌桶。「添加请求」让请求从左飞到桶边消费令牌；「补充令牌」让令牌从顶部匀速落进桶里（桶满则溢出）；
          想看完整剧本点「自动演示」：请求消耗 → 补令牌 → 补到满 → 溢出 → 耗尽后拒绝。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">🪣 令牌: {{ tokens }}/{{ cap }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">✅ 通过: {{ passed }}</span>
          <span class="bg-red-50 text-red-700 px-2 py-1 rounded-full">❌ 拒绝: {{ rejected }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⚠️ 溢出: {{ overflowed }}</span>
          <span class="bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-mono">⏱️ {{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doAddReq" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">➡️ 添加请求</button>
          <button @mousedown="doRefill" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⏫ 补充令牌</button>
          <button @mousedown="doOverflow" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🪣 桶满溢出演示</button>
          <button @mousedown="doAuto" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⏩ 自动演示</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 标题 -->
              <v-text :config="titleCfg" />
              <!-- 令牌桶 -->
              <v-rect :config="bucketCfg" />
              <v-rect :config="bucketInnerCfg" />
              <v-text :config="bucketLabelCfg" />
              <!-- 令牌（绿圆） -->
              <v-circle v-for="(t, i) in tokenPos" :key="i" :config="t" />
              <!-- 补充中的令牌（顶部飞行） -->
              <v-circle v-if="fly.active" :config="flyCfg" />
              <!-- 请求 -->
              <v-rect v-if="req.active" :config="reqBoxCfg" />
              <v-text v-if="req.active" :config="reqTextCfg" />
              <!-- 底部状态 -->
              <v-text :config="resultCfg" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>CORS</strong> 是浏览器同源策略的受控例外：服务器用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Access-Control-Allow-Origin/Methods/Headers</code> 声明放行</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>带 JSON / Authorization / PUT / DELETE 会触发 <strong>OPTIONS 预检</strong>，后端要处理 OPTIONS 返回 204 且不进鉴权</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>四大限流算法：计数器（简单有边界漏洞）、滑动窗口（平滑耗内存）、令牌桶（限速+容忍突发）、漏桶（绝对匀速）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Go 生产用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">golang.org/x/time/rate</code>，per-IP 一个 limiter，取不到令牌返回 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">429</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>令牌桶本质 = 带缓冲 channel 当桶 + Ticker 匀速放令牌 + 取不到就拒绝</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>真实链路：CORS 放行跨域 → JWT 鉴权 → 限流防刷，三者层层叠在路由最外层</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-11-jwt-auth" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：JWT 鉴权</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-13-websocket" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：WebSocket →</RouterLink>
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
  { id: "sec-1", name: "CORS 与同源策略" },
  { id: "sec-2", name: "简单 vs 预检请求" },
  { id: "sec-3", name: "CORS 响应头清单" },
  { id: "sec-4", name: "限流算法对比" },
  { id: "sec-5", name: "令牌桶实现" },
  { id: "sec-6", name: "真实场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 令牌桶限流动画 =====
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', slate: '#94a3b8', text: '#1e293b', muted: '#64748b' }
const H = ref(360), W = ref(700)
const busy = ref(false)
const cap = 5
const tokens = ref(3)
const passed = ref(0), rejected = ref(0), overflowed = ref(0)
const status = ref('')
const box = ref<HTMLDivElement>()
const req = reactive({ active: false, x: 20, y: 150, color: C.cyan })
const fly = reactive({ active: false, x: 0, y: -30 })

const BX = 470, BY = 70, BW = 170, BH = 200
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const tokenPos = computed(() => {
  const list: { x: number; y: number; radius: number; fill: string }[] = []
  for (let i = 0; i < tokens.value; i++) {
    const col = i % 2, row = Math.floor(i / 2)
    list.push({ x: BX + 40 + col * 60, y: BY + BH - 30 - row * 40, radius: 13, fill: C.green })
  }
  return list
})

const titleCfg = computed(() => ({
  x: 20, y: 12, width: W.value - 40, text: '🪣 令牌桶：' + tokens.value + '/' + cap + ' 令牌  容量 ' + cap,
  fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text, align: 'center',
}))

const bucketCfg = { x: BX, y: BY, width: BW, height: BH, cornerRadius: 10, fill: '#f0fdfa', stroke: '#14b8a6', strokeWidth: 2 }
const bucketInnerCfg = { x: BX + 12, y: BY + 12, width: BW - 24, height: BH - 24, cornerRadius: 6, fill: 'rgba(20,184,166,0.08)', stroke: 'rgba(20,184,166,0.4)', strokeWidth: 1, dash: [4, 4] }
const bucketLabelCfg = computed(() => ({
  x: BX, y: BY - 24, width: BW, text: '🪣 令牌桶',
  fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f766e', align: 'center',
}))

const flyCfg = computed(() => ({ x: fly.x, y: fly.y, radius: 13, fill: C.green, shadowColor: 'black', shadowBlur: 4, shadowOpacity: 0.2 }))

const reqBoxCfg = computed(() => ({ x: req.x, y: req.y, width: 56, height: 32, cornerRadius: 6, fill: req.color, stroke: req.color, shadowColor: 'black', shadowBlur: 6, shadowOpacity: 0.25 }))
const reqTextCfg = computed(() => ({ x: req.x, y: req.y, width: 56, height: 32, text: '请求', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }))

const resultCfg = computed(() => {
  let text = '提示：依次点按钮——请求消耗令牌 / 补充令牌 / 桶满溢出 / 桶空拒绝'
  let fill = C.muted
  if (status.value === '通过') { text = '✅ 有令牌 → 请求通过，令牌 -1'; fill = '#15803d' }
  else if (status.value === '拒绝') { text = '❌ 桶空 → 请求被拒（HTTP 429 Too Many Requests）'; fill = '#dc2626' }
  else if (status.value === '补满') { text = '✅ 令牌 +1（生成器每秒匀速补充）'; fill = '#15803d' }
  else if (status.value === '溢出') { text = '⚠️ 桶已满 → 新令牌溢出丢弃（最多攒 ' + cap + ' 个）'; fill = '#b45309' }
  return { x: 20, y: H.value - 30, width: W.value - 40, text, fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill, align: 'center' }
})

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true
  try { await fn() } catch (_) {}
  finally { await d(150); busy.value = false }
}

async function moveReq(target: number) {
  const step = target > req.x ? 5 : -5
  while (Math.abs(req.x - target) > 5) { req.x += step; await d(12) }
  req.x = target
}

async function moveFly(targetY: number) {
  const step = targetY > fly.y ? 4 : -4
  while (Math.abs(fly.y - targetY) > 4) { fly.y += step; await d(12) }
  fly.y = targetY
}

async function runReq() {
  req.active = true
  req.x = 20
  req.color = C.cyan
  req.y = 150
  status.value = ''
  await moveReq(BX + 10)
  if (tokens.value > 0) {
    tokens.value--
    passed.value++
    req.color = C.green
    status.value = '通过'
    await d(300)
    await moveReq(W.value + 80)
  } else {
    rejected.value++
    req.color = C.red
    status.value = '拒绝'
    await d(300)
    await moveReq(20)
  }
  req.active = false
}

async function runRefill() {
  fly.active = true
  fly.x = BX + BW / 2 - 13
  fly.y = -30
  await moveFly(BY + 6)
  if (tokens.value < cap) {
    tokens.value++
    status.value = '补满'
    await moveFly(BY + BH / 2)
  } else {
    overflowed.value++
    status.value = '溢出'
    await moveFly(H.value + 30)
  }
  fly.active = false
}

async function runOverflow() {
  tokens.value = cap
  status.value = '溢出'
  fly.active = true
  fly.x = BX + BW / 2 - 13
  fly.y = -30
  await moveFly(H.value + 30)
  overflowed.value++
  fly.active = false
}

async function runAuto() {
  await runReq()                 // 消耗 1 → 桶剩 2
  await runRefill()              // 补 1 → 3
  await runRefill()              // 补 1 → 4
  await runRefill()              // 补 1 → 5 满
  await runOverflow()            // 再补 → 溢出
  while (tokens.value > 0) await runReq()   // 把 5 个全耗光
  await runReq()                 // 桶空 → 拒绝
  status.value = '溢出'
}

function doAddReq() { act('添加请求', runReq) }
function doRefill() { act('补充令牌', runRefill) }
function doOverflow() { act('桶满溢出', runOverflow) }
function doAuto() { act('自动演示', runAuto) }

function doReset() {
  busy.value = false
  tokens.value = 3
  passed.value = 0
  rejected.value = 0
  overflowed.value = 0
  status.value = ''
  req.active = false
  req.x = 20
  req.color = C.cyan
  fly.active = false
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

const corsManualCode = `// 手写 CORS 中间件——搞清每个头的作用
func CORS() gin.HandlerFunc {
    return func(c *gin.Context) {
        // 允许哪个源跨域访问
        c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
        // 允许哪些方法
        c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        // 允许哪些请求头（含 Authorization 才能带 token）
        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
        // 允许携带 Cookie（与 Allow-Origin 具体源配合使用）
        c.Header("Access-Control-Allow-Credentials", "true")
        // 预检结果缓存 12 小时（秒）
        c.Header("Access-Control-Max-Age", "43200")

        // 预检请求直接 204 返回，不进后续中间件/鉴权
        if c.Request.Method == http.MethodOptions {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }
        c.Next()
    }
}`

const corsGinCode = `import "github.com/gin-contrib/cors"

func main() {
    r := gin.Default()
    // 生产更稳的做法：动态校验 Origin 是否在白名单
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        AllowCredentials: true,               // 允许带 Cookie
        MaxAge:           12 * time.Hour,     // 预检缓存 12 小时
    }))
    r.GET("/api/menus", getMenus)   // 前端跨域直接可调
}`

const rateLimitGinCode = `import "golang.org/x/time/rate"
import "sync"

// per-IP 令牌桶限流中间件
func RateLimit(r rate.Limit, b int) gin.HandlerFunc {
    limiters := sync.Map{} // key: ip, value: *rate.Limiter
    return func(c *gin.Context) {
        ip := c.ClientIP()
        // 首次遇到该 IP 就建一个 limiter，否则复用
        lim, _ := limiters.LoadOrStore(ip, rate.NewLimiter(r, b))
        if !lim.(*rate.Limiter).Allow() { // 取令牌失败 = 超速
            c.Header("Retry-After", "1")
            c.JSON(http.StatusTooManyRequests, gin.H{"error": "too many requests"})
            c.Abort()
            return
        }
        c.Next()
    }
}

// r.Use(RateLimit(rate.Limit(10), 20))
//   → 每秒稳定 10 个请求，允许短时突发到 20`

const rateLimitManualCode = `// 手写迷你令牌桶：channel 是桶，Ticker 匀速放令牌
type TokenBucket struct {
    tokens chan struct{} // 缓冲长度 = 容量 N
    stop   chan struct{}
}

func NewTokenBucket(n, r int) *TokenBucket {
    tb := &TokenBucket{
        tokens: make(chan struct{}, n),
        stop:   make(chan struct{}),
    }
    for i := 0; i < n; i++ { tb.tokens <- struct{}{} } // 初始装满

    go func() { // 生成器：每秒补 r 个
        tick := time.NewTicker(time.Second / time.Duration(r))
        defer tick.Stop()
        for {
            select {
            case <-tick.C:
                select {
                case tb.tokens <- struct{}{}: // 桶没满，放入
                default:                      // 桶满 → 溢出丢弃
                }
            case <-tb.stop:
                return
            }
        }
    }()
    return tb
}

// 每个请求消费 1 个令牌；取不到 = 桶空 → 拒绝
func (tb *TokenBucket) Allow() bool {
    select {
    case <-tb.tokens:
        return true
    default:
        return false
    }
}`</script>
