<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Cookie 与 Session</h1>
          <p class="text-sm text-slate-500 mt-1">Set-Cookie · 会话管理 · 安全配置</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-10-cookie-session.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-10</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Cookie 属性解剖 + Session 会话流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一句话理解：<strong>Cookie 是浏览器里的小纸条（存标识），Session 是服务器里的档案柜（存数据）</strong>。
          服务器把「纸条」通过 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Set-Cookie</code> 发给浏览器，
          浏览器每次请求自动把纸条带回来，服务器凭纸条上的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">session_id</code> 打开档案柜、取回用户数据。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ck-a-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <text x="360" y="24" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">Cookie 属性解剖：每个属性控制「纸条」的一种行为</text>

            <!-- 中央 Cookie 头 -->
            <rect x="240" y="80" width="240" height="150" rx="10" fill="#fef9c3" stroke="#f59e0b" stroke-width="2" />
            <text x="360" y="104" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">🍪 Set-Cookie 响应头</text>
            <text x="360" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">session_id=abc123</text>
            <text x="360" y="148" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">Path=/; Max-Age=3600</text>
            <text x="360" y="168" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">HttpOnly; Secure</text>
            <text x="360" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">SameSite=Lax</text>
            <text x="360" y="216" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#a16207">浏览器会自动存储并在下次请求回传</text>

            <!-- 左列属性 -->
            <rect x="16" y="50" width="170" height="52" rx="8" fill="#dcfce7" stroke="#4ade80" stroke-width="1.5" />
            <text x="101" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">Name=Value</text>
            <text x="101" y="90" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#166534">名称与值（如 session_id=abc123）</text>

            <rect x="16" y="130" width="170" height="52" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5" />
            <text x="101" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0e7490">Path</text>
            <text x="101" y="170" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#155e75">作用路径——哪些 URL 会带上它</text>

            <rect x="16" y="210" width="170" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="101" y="230" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">MaxAge</text>
            <text x="101" y="250" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#92400e">存活秒数——过期后自动删除</text>

            <!-- 右列属性 -->
            <rect x="534" y="50" width="170" height="52" rx="8" fill="#dbeafe" stroke="#60a5fa" stroke-width="1.5" />
            <text x="619" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#1d4ed8">HttpOnly</text>
            <text x="619" y="90" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#1e40af">JS 读不到 → 防 XSS 偷取</text>

            <rect x="534" y="130" width="170" height="52" rx="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="619" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#6d28d9">Secure</text>
            <text x="619" y="170" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#5b21b6">仅 HTTPS 传输——防中间人截获</text>

            <rect x="534" y="210" width="170" height="52" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="619" y="230" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">SameSite</text>
            <text x="619" y="250" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#991b1b">跨站时是否携带 → 防 CSRF</text>

            <line x1="186" y1="76" x2="238" y2="98" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ck-a-arr)" />
            <line x1="186" y1="156" x2="238" y2="140" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ck-a-arr)" />
            <line x1="186" y1="236" x2="238" y2="190" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ck-a-arr)" />
            <line x1="534" y1="76" x2="482" y2="98" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ck-a-arr)" />
            <line x1="534" y1="156" x2="482" y2="140" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ck-a-arr)" />
            <line x1="534" y1="236" x2="482" y2="190" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ck-a-arr)" />
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Cookie 的六个核心属性——Name/Value 是内容，Path/MaxAge 控制作用范围与寿命，HttpOnly/Secure/SameSite 是安全三件套</figcaption>
        </figure>

        <figure>
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ck-b-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 浏览器 -->
            <rect x="20" y="50" width="200" height="180" rx="10" fill="#e0f2fe" stroke="#06b6d4" stroke-width="2" />
            <text x="120" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0e7490">🌐 浏览器</text>
            <text x="120" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#155e75">（自动管理 Cookie）</text>
            <rect x="40" y="118" width="160" height="42" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="120" y="139" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">初始：无 Cookie</text>
            <rect x="40" y="172" width="160" height="42" rx="6" fill="#dcfce7" stroke="#4ade80" stroke-width="1.5" />
            <text x="120" y="193" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#15803d">🍪 session_id=abc123</text>

            <!-- 服务器 -->
            <rect x="500" y="40" width="200" height="200" rx="10" fill="#f1f5f9" stroke="#64748b" stroke-width="2" />
            <text x="600" y="66" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#334155">🖥️ 服务器</text>
            <text x="600" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#475569">session 存储（内存 map）</text>
            <rect x="520" y="104" width="160" height="54" rx="6" fill="#dcfce7" stroke="#4ade80" stroke-width="1.5" />
            <text x="600" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#15803d">sid: abc123</text>
            <text x="600" y="144" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#15803d">→ {uid: 42}</text>
            <rect x="520" y="172" width="160" height="48" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="600" y="196" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#b45309">Set-Cookie: session_id=abc123</text>

            <!-- 三次交互 -->
            <line x1="220" y1="70" x2="498" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#ck-b-arr)" />
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">① 请求1（无 Cookie）</text>
            <line x1="500" y1="130" x2="222" y2="130" stroke="#4ade80" stroke-width="2" marker-end="url(#ck-b-arr)" />
            <text x="360" y="120" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">② 响应 Set-Cookie: session_id=abc123</text>
            <line x1="220" y1="190" x2="498" y2="190" stroke="#06b6d4" stroke-width="2" marker-end="url(#ck-b-arr)" />
            <text x="360" y="180" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0e7490">③ 请求2（自动带 Cookie）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：Session 会话流程——第一次请求无 Cookie，服务器创建 session 并回发 session_id，第二次请求浏览器自动携带 Cookie，服务器凭 id 查到数据</figcaption>
        </figure>
      </section>

      <!-- 1. HTTP 无状态与会话需求 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          HTTP 为什么无状态，我们为什么需要「会话」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          HTTP 协议本身<strong>无状态（Stateless）</strong>：服务器处理完一个请求就「失忆」了，不记得你是谁、买过什么。
          但业务需要状态——购物车、登录态、浏览历史。于是有了两个分工：
          <strong>Cookie</strong> 负责让浏览器<strong>记住标识</strong>，<strong>Session</strong> 负责让服务器<strong>记住数据</strong>。
          两者搭配，才凑出一个「有状态的 Web 应用」。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          HTTP 无状态 ≈ <strong>每次请求都像新打开一个匿名页面</strong>，服务器认不出你。
          Cookie ≈ <strong>浏览器自动帮你带上的会员卡</strong>（每次访问都出示）；Session ≈ <strong>会员卡背后对应前台的一份档案</strong>。
          前端里你会把用户信息存在 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">localStorage</code> 并在 axios 拦截器里带上
          <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">Authorization</code>——原理一模一样：<strong>客户端持凭证，服务端凭凭证认人</strong>。
          </p>
        </aside>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2 text-sm">🍪 Cookie —— 浏览器端的小纸条</h4>
            <ul class="space-y-1 text-slate-600 text-xs">
              <li>▸ 由服务器通过 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Set-Cookie</code> 下发</li>
              <li>▸ 浏览器自动存储、自动随请求回传</li>
              <li>▸ 大小限制约 <strong>4KB</strong>，只存「标识」不存「数据」</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2 text-sm">🗄️ Session —— 服务器端的档案柜</h4>
            <ul class="space-y-1 text-slate-600 text-xs">
              <li>▸ 数据存在服务器（内存 / Redis / 数据库）</li>
              <li>▸ 客户端只拿到一个随机 <code class="bg-slate-100 px-1 rounded text-xs font-mono">session_id</code></li>
              <li>▸ 服务器靠 id 查档案，可存任意大小数据</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 2. Cookie 详解 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Cookie 详解 — 属性的每一刀都砍向一种风险
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Cookie 由服务器通过响应头 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Set-Cookie</code> 下发，
          浏览器收到后存入自己的「Cookie 罐」，之后<strong>只要符合 Path/Domain/SameSite 条件就自动带上</strong>。
          默认的裸 Cookie 很危险——所以每个属性都对应一类攻击。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">属性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">默认值 / 风险</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">Name=Value</td><td class="px-4 py-2 border">键值对，如 session_id=abc123</td><td class="px-4 py-2 border">必填；Value 会被 URL 编码</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Path</td><td class="px-4 py-2 border">哪些路径会携带该 Cookie</td><td class="px-4 py-2 border">默认当前路径；设 / 全站携带</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Domain</td><td class="px-4 py-2 border">哪些域名携带（含子域）</td><td class="px-4 py-2 border">不设则只发给当前主机</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">MaxAge / Expires</td><td class="px-4 py-2 border">存活时间</td><td class="px-4 py-2 border">不设 = 会话级，关浏览器就没了</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">HttpOnly</td><td class="px-4 py-2 border">禁止 JS 读取（document.cookie）</td><td class="px-4 py-2 border"><strong>默认 false → XSS 可偷</strong></td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Secure</td><td class="px-4 py-2 border">仅 HTTPS 传输</td><td class="px-4 py-2 border"><strong>默认 false → 明文 HTTP 可被截获</strong></td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">SameSite</td><td class="px-4 py-2 border">跨站请求是否携带</td><td class="px-4 py-2 border">Lax/Strict/None；不设易被 CSRF 利用</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">下发（Set-Cookie）与读取</h3>
        <div class="mb-4"><Code language="go" :code="cookieSetCode" title="set_cookie.go" /></div>
        <div class="mb-4"><Code language="go" :code="cookieReadCode" title="read_cookie.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 1：</strong>Cookie 容量约 <strong>4KB</strong>，且每次请求都会原样携带——往 Cookie 里塞用户信息、购物车清单，会让每个请求都变肥，还会撑爆浏览器。Cookie 只放「凭证」，数据放服务端（Session/JWT payload 的 id 即可）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 2：</strong><code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">MaxAge</code>（存活秒数）和 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">Expires</code>（具体过期时刻）是不同的字段，<strong>老浏览器只认 Expires</strong>。Go 的 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">http.Cookie</code> 会自动把 MaxAge 转成 Expires，但要避免两边不一致。</p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>只要涉及登录态，<code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">HttpOnly: true</code>、<code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">Secure: true</code>、<code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">SameSite: Lax</code> 三件套一起上，Cookie 里永远只放随机 id 而不放明文用户信息。</p>
        </aside>
      </section>

      <!-- 3. Session 原理与实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          Session 原理与内存实现
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Session 的精髓是<strong>「数据在服务端、凭证在客户端」</strong>。用户登录后，服务器把
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{"uid": 42}</code> 存进内存 map，
          生成一个几乎不可能猜中的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">session_id</code>，
          把这个 id 塞进 Cookie 发给浏览器。下一次请求，浏览器自动带回 id，服务器查 map 就知道「你是 42 号用户」。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">会话建立的完整流程（5 步）</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>首次请求</strong>——浏览器发出请求，<strong>没有携带任何 Cookie</strong>，服务器无从识别</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>创建 Session</strong>——服务器在内存 map 里写入 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sid → {uid:42}</code>，生成随机 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">session_id</code></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>回发 Set-Cookie</strong>——响应头带 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Set-Cookie: session_id=abc123</code>，浏览器自动存储</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>后续请求自动携带</strong>——浏览器每次请求自动带上 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Cookie: session_id=abc123</code></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>查 Session</strong>——服务器用 id 查 map，取回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">{uid:42}</code>，识别身份</div>
          </li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-3">内存实现：map + sync.Mutex</h3>
        <div class="mb-4"><Code language="go" :code="sessionStoreCode" title="session_store.go" /></div>
        <div class="mb-4"><Code language="go" :code="sessionMiddlewareCode" title="session_middleware.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 1：</strong>内存 map 存 Session 有两大致命伤——<strong>服务器重启全部丢失</strong>（用户集体掉线）；<strong>多实例部署无法共享</strong>（请求打到 A 实例建的 session，B 实例查不到）。生产环境用 <strong>Redis</strong>（见后续数据库/缓存阶段）或 JWT 无状态方案。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 2：</strong>map 在并发读写时直接 panic（fatal error: concurrent map writes）。Session 存储必须加锁（如 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">sync.Mutex</code>）或用并发安全的容器，否则高并发下一崩崩一片。</p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Cookie vs Session vs JWT</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Cookie（裸用）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Session</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">JWT</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">数据存哪</td><td class="px-4 py-2 border">浏览器</td><td class="px-4 py-2 border">服务器</td><td class="px-4 py-2 border">token 本身（无状态）</td></tr>
              <tr><td class="px-4 py-2 border">是否可篡改</td><td class="px-4 py-2 border">可（需签名）</td><td class="px-4 py-2 border">不可（只存随机 id）</td><td class="px-4 py-2 border">不可（HMAC 签名）</td></tr>
              <tr><td class="px-4 py-2 border">扩容</td><td class="px-4 py-2 border">天然</td><td class="px-4 py-2 border">需共享存储（Redis）</td><td class="px-4 py-2 border">天然（无共享状态）</td></tr>
              <tr><td class="px-4 py-2 border">主动注销</td><td class="px-4 py-2 border">删 Cookie</td><td class="px-4 py-2 border">删 Session（立即生效）</td><td class="px-4 py-2 border">难（token 有效期内都在）</td></tr>
              <tr><td class="px-4 py-2 border">适用</td><td class="px-4 py-2 border">小标识</td><td class="px-4 py-2 border">传统 Web（服务端渲染）</td><td class="px-4 py-2 border">前后端分离 / 微服务</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. 安全配置 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          安全配置 — 三件套防三类攻击
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Cookie 安全的核心就三句话：<strong>HttpOnly 防 XSS 偷、Secure 防中间人截、SameSite 防 CSRF 冒用</strong>。
        </p>
        <ul class="space-y-3 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>HttpOnly</strong>：JS 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">document.cookie</code> 读不到它。即使网站被注入 XSS 脚本，攻击者也偷不走会话凭证</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Secure</strong>：只在 HTTPS 连接上发送。避免 Cookie 在明文 WiFi 里被抓包裸奔</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SameSite=Lax/Strict</strong>：限制第三方网站发起的请求携带本 Cookie，从源头削弱 CSRF（跨站请求伪造）</span></li>
        </ul>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>① 所有 Cookie 一律三件套；② Cookie 里只存随机 session_id，绝不存密码/手机号等敏感信息；③ 给 session 设合理的 MaxAge 并配套服务端过期清理；④ 重要操作（改密、支付）再叠加一次性 CSRF Token 校验。</p>
        </aside>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          前端的 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">localStorage</code> 没有 HttpOnly 概念——任何 XSS 都能 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">localStorage.getItem('token')</code>。
          这也是为什么社区建议把 JWT 放进 <strong>HttpOnly Cookie</strong> 而不是 localStorage：等于借用 Cookie 的 XSS 防线。
          而 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">SameSite</code> 之于 CSRF，就像前端给接口加 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">XSRF-TOKEN</code> 请求头——都是「不让别的网站冒用你的身份」。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：Session 建立流程
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          按顺序点步骤按钮（或「自动演示」），观察浏览器与服务器如何通过 Cookie + Session 完成「认人」：
          第一次请求没有 Cookie → 服务器创建 Session 并 Set-Cookie → 浏览器存储 → 第二次请求自动带 Cookie → 服务器查到数据。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 Cookie: {{ hasCookie ? '1' : '0' }}/1</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 Session: {{ hasSession ? '1' : '0' }}/1</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ stepLabel }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 步骤 {{ step }}/5 · 每次查找 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doStep(1)" :disabled="busy || step !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">① 无 Cookie 请求</button>
          <button @mousedown="doStep(2)" :disabled="busy || step !== 1" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">② 创建 Session</button>
          <button @mousedown="doStep(3)" :disabled="busy || step !== 2" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">③ Set-Cookie</button>
          <button @mousedown="doStep(4)" :disabled="busy || step !== 3" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">④ 带 Cookie 请求</button>
          <button @mousedown="doStep(5)" :disabled="busy || step !== 4" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⑤ 查 Session</button>
          <button @mousedown="doAuto" :disabled="busy || step !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⏩ 自动演示全部</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 浏览器 -->
              <v-rect :config="browserCfg" />
              <v-text :config="browserTitleCfg" />
              <v-rect :config="cookieCardCfg" />
              <v-text :config="cookieTextCfg" />
              <!-- 服务器 -->
              <v-rect :config="serverCfg" />
              <v-text :config="serverTitleCfg" />
              <v-rect :config="sessionCardCfg" />
              <v-text :config="sessionTextCfg" />
              <!-- 请求连线与飞行的圆点 -->
              <v-line :config="lineCfg" />
              <v-arrow v-if="reqDir !== 'none'" :config="reqArrowCfg" />
              <v-circle :config="dotCfg" />
              <!-- 步骤标签 -->
              <v-text :config="stepCfg" />
              <v-text :config="arrowLabelCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 5. 小结 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Cookie = 浏览器端凭证</strong>（服务器 Set-Cookie 下发，浏览器自动回传），<strong>Session = 服务器端数据</strong>（按 session_id 查档案）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>安全三件套：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">HttpOnly</code> 防 XSS、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Secure</code> 防截获、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">SameSite</code> 防 CSRF</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>内存 Session 用 <strong>map + sync.Mutex</strong> 保证并发安全，但重启丢、多实例不共享 → 生产用 Redis</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Session 可主动注销（删 map），JWT 难注销但天然无状态可扩容</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Cookie 只放凭证、不放敏感数据（4KB 上限 + 每次请求都带）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-9-restful-api" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：RESTful API</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-11-jwt-auth" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：JWT 鉴权 →</RouterLink>
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
  { id: "sec-1", name: "HTTP 无状态与会话需求" },
  { id: "sec-2", name: "Cookie 详解" },
  { id: "sec-3", name: "Session 原理与实现" },
  { id: "sec-4", name: "安全配置" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-5", name: "小结" },
]

// ===== 🎬 Session 建立流程动画 =====
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', orange: '#f59e0b', text: '#1e293b', muted: '#64748b', ghost: '#e2e8f0' }
const H = ref(330), W = ref(700)
const BX = 30, BY = 60, BW = 170, BH = 120       // 浏览器区域
const SX = 500, SY = 50, SW = 180, SH = 150      // 服务器区域
const LY = 130                                   // 连线高度
const busy = ref(false), status = ref('')
const step = ref(0)
const hasCookie = ref(false), hasSession = ref(false), found = ref(false)
const reqDir = ref<'none' | 'b2s' | 's2b'>('none')
const travel = ref(0)
const dotColor = ref(C.muted)
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const stepTexts = [
  '初始状态：浏览器无 Cookie，服务器无 Session',
  '① 浏览器发起请求1——没有携带任何 Cookie',
  '② 服务器创建 Session：sid=abc123 → {uid:42}',
  '③ 响应携带 Set-Cookie，浏览器存储 Cookie',
  '④ 请求2——浏览器自动携带 Cookie: session_id=abc123',
  '⑤ 服务器按 session_id 查到数据，识别用户',
]
const stepLabel = computed(() => stepTexts[step.value])

const browserCfg = computed(() => ({
  x: BX, y: BY, width: BW, height: BH, fill: step.value >= 1 ? '#e0f2fe' : '#f1f5f9',
  cornerRadius: 10, stroke: step.value >= 1 ? '#06b6d4' : '#94a3b8', strokeWidth: 2,
}))
const browserTitleCfg = computed(() => ({
  x: BX, y: BY + 12, width: BW, text: '🌐 浏览器', fontSize: 13, fontFamily: 'monospace',
  fontStyle: 'bold', fill: '#0e7490', align: 'center',
}))
const cookieCardCfg = computed(() => ({
  x: BX + 8, y: BY + 60, width: BW - 16, height: 46,
  fill: step.value === 4 ? '#fef3c7' : (hasCookie.value ? '#dcfce7' : '#f8fafc'),
  cornerRadius: 8, stroke: step.value === 4 ? '#f59e0b' : (hasCookie.value ? '#4ade80' : '#94a3b8'),
  strokeWidth: 1.5, strokeScaleEnabled: false,
}))
const cookieTextCfg = computed(() => ({
  x: BX + 8, y: BY + 60, width: BW - 16, height: 46, text: hasCookie.value ? '🍪 session_id = abc123' : '🍪 Cookie: （无）',
  fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: hasCookie.value ? '#15803d' : C.muted,
  align: 'center', verticalAlign: 'middle',
}))

const serverCfg = computed(() => ({
  x: SX, y: SY, width: SW, height: SH, fill: step.value >= 2 ? '#ecfdf5' : '#f1f5f9',
  cornerRadius: 10, stroke: step.value >= 2 ? '#4ade80' : '#94a3b8', strokeWidth: 2,
}))
const serverTitleCfg = computed(() => ({
  x: SX, y: SY + 12, width: SW, text: '🖥️ 服务器', fontSize: 13, fontFamily: 'monospace',
  fontStyle: 'bold', fill: '#334155', align: 'center',
}))
const sessionCardCfg = computed(() => ({
  x: SX + 10, y: SY + 70, width: SW - 20, height: 62,
  fill: found.value ? '#bbf7d0' : (hasSession.value ? '#dcfce7' : '#f8fafc'),
  cornerRadius: 8, stroke: found.value ? '#22c55e' : (hasSession.value ? '#4ade80' : '#94a3b8'), strokeWidth: 1.5,
}))
const sessionTextCfg = computed(() => ({
  x: SX + 10, y: SY + 70, width: SW - 20, height: 62, text: hasSession.value ? 'sid: abc123 → {uid: 42}' : 'session 存储: （空）',
  fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: hasSession.value ? '#15803d' : C.muted,
  align: 'center', verticalAlign: 'middle',
}))

const lineCfg = { points: [BX + BW, LY, SX, LY], stroke: '#cbd5e1', strokeWidth: 2, dash: [6, 4] }
const reqArrowCfg = computed(() => {
  if (reqDir.value === 'b2s') return { points: [BX + BW, LY, SX, LY], fill: dotColor.value, stroke: dotColor.value, strokeWidth: 2, pointerLength: 10, pointerWidth: 8 }
  if (reqDir.value === 's2b') return { points: [SX, LY, BX + BW, LY], fill: dotColor.value, stroke: dotColor.value, strokeWidth: 2, pointerLength: 10, pointerWidth: 8 }
  return { points: [BX + BW, LY, SX, LY], fill: 'transparent', stroke: 'transparent', strokeWidth: 0 }
})
const dotCfg = computed(() => ({
  x: dotX.value, y: LY, radius: 7, fill: dotColor.value,
  shadowColor: dotColor.value, shadowBlur: 8,
}))
const dotX = computed(() => {
  const span = SX - BX - BW
  if (reqDir.value === 'b2s') return BX + BW + span * travel.value
  if (reqDir.value === 's2b') return SX - span * travel.value
  return (BX + BW + SX) / 2
})
const stepCfg = computed(() => ({
  x: 20, y: 14, width: W.value - 40, text: '📨 ' + stepLabel.value,
  fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text, align: 'center',
}))
const arrowLabelCfg = computed(() => {
  const text = reqDir.value === 'b2s'
    ? (step.value === 1 ? 'GET /login（无 Cookie）' : 'GET /profile（Cookie: session_id=abc123）')
    : (reqDir.value === 's2b' ? 'Set-Cookie: session_id=abc123' : '')
  return { x: 20, y: 258, width: W.value - 40, text: '🪵 ' + (text || (step.value === 0 ? '点击步骤按钮开始演示' : status.value || '')),
    fontSize: 12, fontFamily: 'monospace', fill: C.muted, align: 'center' }
})

async function fly(dir: 'b2s' | 's2b', color: string) {
  reqDir.value = dir
  dotColor.value = color
  for (let i = 1; i <= 12; i++) { travel.value = i / 12; await d(45) }
  travel.value = 0
}

async function runStep(n: number) {
  if (n === 1) {
    await fly('b2s', C.muted)
  } else if (n === 2) {
    hasSession.value = true
  } else if (n === 3) {
    await fly('s2b', C.green)
    hasCookie.value = true
  } else if (n === 4) {
    await fly('b2s', C.orange)
  } else if (n === 5) {
    found.value = true
  }
  step.value = n
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function doStep(n: number) {
  if (step.value !== n - 1) return
  await act(stepTexts[n], () => runStep(n))
}

async function doAuto() {
  if (step.value !== 0) return
  await act('自动演示 Session 建立流程', async () => {
    for (let n = 1; n <= 5; n++) await runStep(n)
  })
}

function doReset() {
  busy.value = false
  step.value = 0; hasCookie.value = false; hasSession.value = false; found.value = false
  reqDir.value = 'none'; travel.value = 0; status.value = ''
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

const cookieSetCode = `package main

import (
    "net/http"
)

// 服务器下发 Cookie：本质就是写一个 Set-Cookie 响应头
func loginHandler(w http.ResponseWriter, r *http.Request) {
    cookie := &http.Cookie{
        Name:     "session_id",
        Value:    "abc123",
        Path:     "/",                        // 全站都能带
        MaxAge:   3600,                       // 存活 3600 秒 = 1 小时
        HttpOnly: true,                       // JS 读不到 → 防 XSS 偷
        Secure:   true,                       // 仅 HTTPS → 防中间人截
        SameSite: http.SameSiteLaxMode,       // 防 CSRF
    }
    http.SetCookie(w, cookie)
    // 产生的响应头:
    //   Set-Cookie: session_id=abc123; Path=/; Max-Age=3600;
    //               HttpOnly; Secure; SameSite=Lax
}`

const cookieReadCode = `// 读取请求携带的 Cookie
func profileHandler(w http.ResponseWriter, r *http.Request) {
    // 单个读取：没有则返回 http.ErrNoCookie
    c, err := r.Cookie("session_id")
    if err == http.ErrNoCookie {
        http.Error(w, "未登录", http.StatusUnauthorized) // 401
        return
    }
    fmt.Fprintf(w, "session_id = %s\\n", c.Value)

    // 读取全部：r.Cookies() 返回 []*http.Cookie
    for _, ck := range r.Cookies() {
        fmt.Printf("收到 Cookie: %s = %s\\n", ck.Name, ck.Value)
    }
}

// Gin 写法更简洁:
//   c.SetCookie("token", value, 3600, "/", "", true, true)
//   token, _ := c.Cookie("token")`

const sessionStoreCode = `// 内存版 Session 存储——map + sync.Mutex 保证并发安全
type SessionStore struct {
    mu   sync.Mutex
    data map[string]map[string]any // session_id → 字段
}

func NewSessionStore() *SessionStore {
    return &SessionStore{data: make(map[string]map[string]any)}
}

// Create 生成新 session，返回随机 id
func (s *SessionStore) Create() string {
    id := fmt.Sprintf("%x", time.Now().UnixNano())
    s.mu.Lock()
    defer s.mu.Unlock()
    s.data[id] = make(map[string]any)
    return id
}

func (s *SessionStore) Set(id, key string, val any) {
    s.mu.Lock()
    defer s.mu.Unlock()
    if m, ok := s.data[id]; ok {
        m[key] = val
    }
}

func (s *SessionStore) Get(id, key string) (any, bool) {
    s.mu.Lock()
    defer s.mu.Unlock()
    v, ok := s.data[id][key]
    return v, ok
}
// 使用:
//   store := NewSessionStore()
//   sid := store.Create()
//   store.Set(sid, "uid", 42)
//   http.SetCookie(w, &http.Cookie{Name: "session_id", Value: sid, HttpOnly: true, ...})`

const sessionMiddlewareCode = `// Session 中间件：识别每次请求的登录用户
func AuthSession(store *SessionStore) gin.HandlerFunc {
    return func(c *gin.Context) {
        ck, err := c.Cookie("session_id")
        if err != nil { // 没带 Cookie → 未登录
            c.JSON(401, gin.H{"error": "unauthorized"})
            c.Abort()
            return
        }
        uid, ok := store.Get(ck.Value, "uid")
        if !ok { // session 不存在或已过期
            c.JSON(401, gin.H{"error": "session 失效"})
            c.Abort()
            return
        }
        c.Set("uid", uid) // 注入上下文，handler 里 c.Get("uid")
        c.Next()
    }
}`</script>
