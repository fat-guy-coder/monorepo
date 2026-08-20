<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">JWT 鉴权</h1>
          <p class="text-sm text-slate-500 mt-1">Access Token + Refresh Token——生产级认证方案</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-11-jwt-auth.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-11</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：JWT 三段结构与签发/验证流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          JWT（JSON Web Token）是<strong>无状态的凭证</strong>：服务器不存 session，把用户信息「签」进 token 本身。
          一个 token 长这样：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiJ9.s2nH7k</code>，
          中间用点分成 <strong>三段</strong>：Header（算法声明）· Payload（数据）· Signature（签名）。签名保证前两段<strong>被改一个字符就作废</strong>。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="jw-a-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <text x="360" y="24" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">JWT = Header . Payload . Signature（三段 base64url，点号连接）</text>

            <!-- 三段解码内容 -->
            <rect x="95" y="40" width="165" height="68" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5" />
            <text x="177" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0e7490">Header（头部）</text>
            <text x="177" y="82" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#155e75">{"alg":"HS256",</text>
            <text x="177" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#155e75">"typ":"JWT"}</text>

            <rect x="280" y="40" width="165" height="68" rx="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="362" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#6d28d9">Payload（数据）</text>
            <text x="362" y="82" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#5b21b6">{"sub":"42",</text>
            <text x="362" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#5b21b6">"exp":1710000000}</text>

            <rect x="465" y="40" width="165" height="68" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="547" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">Signature（签名）</text>
            <text x="547" y="82" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#92400e">HMAC-SHA256(</text>
            <text x="547" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#92400e">header.payload, key)</text>

            <line x1="177" y1="108" x2="177" y2="158" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-a-arr)" />
            <line x1="362" y1="108" x2="362" y2="158" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-a-arr)" />
            <line x1="547" y1="108" x2="547" y2="158" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-a-arr)" />

            <!-- Token 三段 -->
            <rect x="95" y="162" width="165" height="46" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="177" y="185" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">eyJhbGciOiJIUzI1NiJ9</text>
            <text x="263" y="185" text-anchor="middle" dominant-baseline="central" font-size="26" font-family="monospace" font-weight="bold" fill="#94a3b8">.</text>
            <rect x="280" y="162" width="165" height="46" rx="8" fill="#a78bfa" stroke="#7c3aed" stroke-width="1.5" />
            <text x="362" y="185" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">eyJzdWIiOiI0MiJ9</text>
            <text x="448" y="185" text-anchor="middle" dominant-baseline="central" font-size="26" font-family="monospace" font-weight="bold" fill="#94a3b8">.</text>
            <rect x="465" y="162" width="165" height="46" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="547" y="185" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">s2nH7k3+...==</text>

            <text x="177" y="230" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">base64url(header)</text>
            <text x="362" y="230" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">base64url(payload)</text>
            <text x="547" y="230" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">签名结果</text>

            <!-- 底部含义 -->
            <text x="360" y="272" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#475569">Signature = HMAC-SHA256(</text>
            <text x="360" y="292" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0e7490">base64(header) + "." + base64(payload) , secret )</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：JWT 三段结构——第 1 段声明算法，第 2 段放数据，第 3 段用 secret 对「前两段拼接串」做 HMAC 签名</figcaption>
        </figure>

        <figure>
          <svg viewBox="0 0 720 340" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="jw-b-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 左：签发流程 -->
            <text x="180" y="26" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">签发流程（服务器登录时）</text>
            <rect x="60" y="40" width="110" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="115" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">Header</text>
            <rect x="200" y="40" width="110" height="40" rx="8" fill="#a78bfa" stroke="#7c3aed" stroke-width="1.5" />
            <text x="255" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">Payload</text>
            <line x1="115" y1="80" x2="160" y2="108" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-b-arr)" />
            <line x1="255" y1="80" x2="210" y2="108" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-b-arr)" />
            <rect x="85" y="110" width="190" height="50" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5" />
            <text x="180" y="135" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0e7490">base64(Header).base64(Payload)</text>
            <line x1="180" y1="160" x2="180" y2="186" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-b-arr)" />
            <rect x="85" y="188" width="190" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="180" y="213" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">HMAC-SHA256(拼接串, secret)</text>
            <line x1="180" y1="238" x2="180" y2="262" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-b-arr)" />
            <rect x="85" y="264" width="190" height="46" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="180" y="287" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">Token = a.b.c（发给客户端）</text>

            <!-- 右：验证流程 -->
            <text x="540" y="26" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">验证流程（服务器每次请求）</text>
            <rect x="445" y="40" width="190" height="42" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5" />
            <text x="540" y="61" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0e7490">收到 Token a.b.c</text>
            <line x1="540" y1="82" x2="540" y2="100" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-b-arr)" />
            <rect x="445" y="102" width="190" height="42" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" />
            <text x="540" y="123" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#334155">拆成 Header . Payload . Sig</text>
            <line x1="540" y1="144" x2="540" y2="162" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-b-arr)" />
            <rect x="445" y="164" width="190" height="42" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="540" y="185" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">用 secret 重算签名 sig'</text>
            <line x1="540" y1="206" x2="540" y2="224" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#jw-b-arr)" />
            <rect x="445" y="226" width="190" height="42" rx="8" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5" />
            <text x="540" y="247" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#1d4ed8">比对 sig' == Sig ?</text>
            <line x1="505" y1="268" x2="505" y2="292" stroke="#4ade80" stroke-width="2" marker-end="url(#jw-b-arr)" />
            <line x1="575" y1="268" x2="575" y2="292" stroke="#ef4444" stroke-width="2" marker-end="url(#jw-b-arr)" />
            <rect x="460" y="294" width="90" height="34" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="505" y="311" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">✅ 通过</text>
            <rect x="560" y="294" width="90" height="34" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
            <text x="605" y="311" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">❌ 篡改</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：签发（左）与验证（右）——签名必须双方用同一个 secret 计算，客户端没有 secret，改一个字符都过不了比对</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么需要 JWT -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要 JWT — Session 的痛点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          上一节讲了 Session：数据存在服务器，凭证是随机 session_id。这套方案有个尴尬场景——<strong>微服务 / 多实例 / 前后端分离</strong>：
          ① 多实例部署时 session 必须放 Redis，否则 A 实例建的 session B 实例查不到；② App 端没有浏览器，Cookie 机制别扭；
          ③ 服务器要「记住」每个在线用户，压力都在服务端。JWT 的思路反过来：<strong>把该记得的东西签进 token 交给客户端</strong>，
          服务器每次请求只需「验个签名」，零状态、天然可横向扩容。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Session</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">JWT</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">状态存哪</td><td class="px-4 py-2 border">服务器（内存/Redis）</td><td class="px-4 py-2 border">token 本身（无状态）</td></tr>
              <tr><td class="px-4 py-2 border">扩容</td><td class="px-4 py-2 border">要共享存储（Redis）</td><td class="px-4 py-2 border">天然多实例</td></tr>
              <tr><td class="px-4 py-2 border">主动注销</td><td class="px-4 py-2 border">删 session，立即生效</td><td class="px-4 py-2 border">难，过期前都有效（需黑名单）</td></tr>
              <tr><td class="px-4 py-2 border">内容</td><td class="px-4 py-2 border">只存随机 id</td><td class="px-4 py-2 border">payload 含用户信息（可读、可签名）</td></tr>
              <tr><td class="px-4 py-2 border">跨域/App</td><td class="px-4 py-2 border">Cookie 跨域麻烦</td><td class="px-4 py-2 border">放 Authorization 头，随处可用</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">双 Token 模式：Access + Refresh</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          JWT 一旦签发，过期前无法「撤回」。所以生产上不搞「一个长命 token」——而是<strong>双 token</strong>：
          Access Token 短命（15 分钟）负责日常请求，Refresh Token 长命（7~30 天）负责「续命」。
          Access 泄露了损失小（15 分钟作废），Refresh 泄露了就改签新 Access。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700"></th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Access Token</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Refresh Token</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">有效期</td><td class="px-4 py-2 border"><strong>短</strong>（15 分钟）</td><td class="px-4 py-2 border"><strong>长</strong>（7-30 天）</td></tr>
              <tr><td class="px-4 py-2 border">存储位置</td><td class="px-4 py-2 border">内存（变量）</td><td class="px-4 py-2 border">localStorage / HttpOnly Cookie</td></tr>
              <tr><td class="px-4 py-2 border">用途</td><td class="px-4 py-2 border">API 请求认证</td><td class="px-4 py-2 border">重新获取 Access Token</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          JWT ≈ <strong>加密的 session cookie</strong>——服务器不用存 session，token 里就带着你是谁。
          Access Token ≈ <strong>15 分钟有效期的门禁卡</strong>，Refresh Token ≈ <strong>7 天的续期凭证</strong>。
          前端把 token 存 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">localStorage</code>（或 HttpOnly Cookie），axios 拦截器里统一加
          <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">Authorization: Bearer &lt;token&gt;</code>，收到 401 就静默调 refresh 接口换新 token 再重放原请求——这就是「无感续期」。
          </p>
        </aside>
      </section>

      <!-- 2. 三段结构详解 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          JWT 三段结构详解
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          JWT 字符串形如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">xxxxx.yyyyy.zzzzz</code>，三段各司其职：
        </p>
        <ul class="space-y-3 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Header（第 1 段）</strong>：声明签名算法和类型。标准字段 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">alg</code>（HS256/RS256）、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">typ</code>（JWT）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Payload（第 2 段）</strong>：业务数据，即 Claims（声明）。常用：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sub</code> 用户标识、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">exp</code> 过期时间、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">iat</code> 签发时间、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">iss</code> 签发者。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Signature（第 3 段）</strong>：对 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">base64(Header) + "." + base64(Payload)</code> 用 secret 做 HMAC-SHA256，再 base64url。</span></li>
        </ul>

        <div class="mb-4"><Code language="go" :code="jwtManualCode" title="jwt_manual.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 大坑：base64 只是「编码」不是「加密」！</strong>任何人都能把 token 第 2 段 base64 解码出来读明文。<strong>JWT 里绝不能放密码、手机号、身份证号</strong>——只能放 userID 这类非敏感的标识。防篡改靠的是签名，不是藏。</p>
        </aside>
      </section>

      <!-- 3. HS256 签名原理 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          HS256 签名原理 — 为什么改一个字符就作废
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          HS256 = HMAC + SHA-256。核心公式：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">sig = HMAC_SHA256( secret, header.payload )</code>。
          验证时服务器用<strong>同一个 secret</strong> 对「收到的 Header.Payload」重新算一遍签名，再和「收到的第 3 段」比对：
          相等 → 内容没被改过（因为改任何一位，重算的哈希就完全不同）；不相等 → token 被篡改，直接 401。
          <strong>secret 只有服务器知道</strong>，客户端想伪造签名但没有 secret，算不出来——这就是 JWT 防篡改的根本。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">验证流程（4 步）</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>拆三段</strong>——按点号把 token 切成 Header / Payload / Signature</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>重算签名</strong>——用自己手里的 secret 对 header.payload 重新算 HMAC，得到 sig'</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>比对</strong>——sig' 与 Signature 逐位比较（用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">crypto/subtle.ConstantTimeCompare</code> 防时序攻击）</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>查过期</strong>——再检查 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">exp</code> 是否大于当前时间，过期 → 401</div>
          </li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 算法混淆攻击（Algorithm Confusion）：</strong>攻击者把 Header 的 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">alg</code> 改成 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">none</code>（免签名）或从 RS256 换成 HS256，如果你的代码不校验实际算法就放行——等于没有签名。必须用 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">jwt.WithValidMethods([]string{"HS256"})</code> 把算法锁死。</p>
        </aside>
      </section>

      <!-- 4. golang-jwt/v5 签发与解析 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          golang-jwt/v5 签发与解析
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          生产环境用官方维护的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">github.com/golang-jwt/jwt/v5</code>，别手写 HMAC。
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">NewWithClaims</code> 负责「拼三段 + 签名」，
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Parse</code> 负责「拆三段 + 验签名 + 查过期」。
        </p>
        <div class="mb-4"><Code language="go" :code="jwtIssueCode" title="jwt_issue.go" /></div>
        <div class="mb-4"><Code language="go" :code="jwtParseCode" title="jwt_parse.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 1：</strong><code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">exp</code> 的单位是<strong>Unix 秒</strong>（<code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">time.Now().Unix()</code>），不是毫秒——传 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">UnixMilli()</code> 会让 token 瞬间「过期」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑 2：</strong>密钥必须随机且足够长（≥32 字节），<strong>放环境变量</strong>而不是写死在代码里；泄露 = 任何人都能伪造任意用户 token。Git 提交历史里别混入 secret。</p>
        </aside>
      </section>

      <!-- 5. auth 中间件与刷新 token -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          auth 中间件集成 & 刷新 Token 流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          JWT 鉴权在 Go 里的落地姿势：<strong>一个中间件</strong>，挂在受保护路由组上。请求进来 → 取 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Authorization: Bearer xxx</code> → 验证 → 把 userID 注入 context → 放行给 handler。
        </p>

        <div class="mb-4"><Code language="go" :code="jwtMiddlewareCode" title="jwt_middleware.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Access 过期后的刷新流程</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">前端请求带着过期的 Access Token，后端返回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">401</code></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">前端 axios 拦截器捕获 401，调 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">POST /api/auth/refresh</code>，带上 Refresh Token</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600">后端校验 Refresh Token（合法且未过期）→ 签发新的 Access Token 返回</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600">前端用新 token <strong>重放原请求</strong>——用户完全无感</div>
          </li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Go 中间件 ≈ <strong>前端路由守卫 + axios 拦截器</strong>。<code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">router.beforeEach</code> 检查是否有 token 决定是否放行，
          <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">axios.interceptors.request</code> 统一加 <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">Authorization</code> 头，
          <code class="bg-purple-100 text-purple-700 px-1 rounded text-xs font-mono">axios.interceptors.response</code> 捕获 401 后调 refresh 再重放——前后端配合，才能做出「无感续期」。
          </p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>① Access 短命 + Refresh 长命，Refresh 走 /refresh 专用接口；② 敏感操作（改密/支付）要求重新登录而不是用旧 Refresh 续期；③ 注销时把 Refresh 加进服务端黑名单（Redis 存 jti）；④ 用 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">jti</code>（token 唯一 ID）做吊销追踪。</p>
        </aside>
      </section>

      <!-- 6. 安全坑与最佳实践 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          安全坑清单 & 最佳实践
        </h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：base64 明文可读</strong>——token 第 2 段谁都能解，别放密码/手机号/邮箱等敏感数据，放 userID 这种标识就够。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：算法混淆攻击</strong>——必须用 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">WithValidMethods</code> 锁死 HS256，并校验 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">t.Method</code> 类型。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：密钥管理</strong>——secret 短、写死在代码、提交进 Git 都会让整个 JWT 体系形同虚设；用环境变量 + 定期轮换。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：不能主动吊销</strong>——token 过期前一直有效。踢人下线的需求（改密/封号）要么走黑名单（Redis 记 jti），要么改用短 Access + Refresh 旋转。</p>
          </aside>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话经验：</strong>JWT 的「快」换来了「不能撤」——所以<strong>短 Access + 长 Refresh + 必要时的黑名单</strong>，是生产环境最平衡的组合。前端存储优先 HttpOnly Cookie（借 XSS 防线），App 端则存系统安全存储。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：JWT 签发与验证
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          先按顺序完成<strong>签发</strong>（编码 Header/Payload → HMAC 签名 → 拼成 Token），再走<strong>验证</strong>（拆三段 → 重算签名 → 比对 → 通过）。
          每步都有对应按钮，也可以点「自动演示」一口气看完。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 段数: {{ phase >= 4 ? 3 : (phase >= 1 ? 1 : 0) }} 段</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ stepLabel }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 阶段: {{ phase <= 4 ? '签发' : '验证' }} {{ phase }}/8</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doStep(1)" :disabled="busy || phase !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">① 编码 Header</button>
          <button @mousedown="doStep(2)" :disabled="busy || phase !== 1" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">② 编码 Payload</button>
          <button @mousedown="doStep(3)" :disabled="busy || phase !== 2" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">③ HMAC 签名</button>
          <button @mousedown="doStep(4)" :disabled="busy || phase !== 3" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">④ 拼成 Token</button>
          <button @mousedown="doStep(5)" :disabled="busy || phase !== 4" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⑤ 拆三段</button>
          <button @mousedown="doStep(6)" :disabled="busy || phase !== 5" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⑥ 重算签名</button>
          <button @mousedown="doStep(7)" :disabled="busy || phase !== 6" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⑦ 比对签名</button>
          <button @mousedown="doStep(8)" :disabled="busy || phase !== 7" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⑧ 验证通过</button>
          <button @mousedown="doAuto" :disabled="busy || phase !== 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⏩ 自动演示</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 顶部步骤标签 -->
              <v-text :config="stepCfg" />
              <!-- Header 原始与编码 -->
              <v-rect v-if="showHeaderRaw" :config="headerRawCfg" />
              <v-text v-if="showHeaderRaw" :config="headerRawTextCfg" />
              <v-arrow v-if="showHeaderRaw && !showHeaderB64" :config="downArrowCfg(95, 98, 95, 112)" />
              <v-rect v-if="showHeaderB64" :config="headerB64Cfg" />
              <v-text v-if="showHeaderB64" :config="headerB64TextCfg" />
              <!-- Payload 原始与编码 -->
              <v-rect v-if="showPayloadRaw" :config="payloadRawCfg" />
              <v-text v-if="showPayloadRaw" :config="payloadRawTextCfg" />
              <v-arrow v-if="showPayloadRaw && !showPayloadB64" :config="downArrowCfg(260, 98, 260, 112)" />
              <v-rect v-if="showPayloadB64" :config="payloadB64Cfg" />
              <v-text v-if="showPayloadB64" :config="payloadB64TextCfg" />
              <!-- 拼接串 pill -->
              <v-rect v-if="showHeaderB64 && showPayloadB64" :config="joinCfg" />
              <v-text v-if="showHeaderB64 && showPayloadB64" :config="joinTextCfg" />
              <!-- 签名区 -->
              <v-rect v-if="showSig" :config="sigCfg" />
              <v-text v-if="showSig" :config="sigTextCfg" />
              <!-- Token 三段 -->
              <v-rect v-if="showToken" :config="seg1Cfg" />
              <v-text v-if="showToken" :config="seg1TextCfg" />
              <v-text v-if="showToken" :config="dot1Cfg" />
              <v-rect v-if="showToken" :config="seg2Cfg" />
              <v-text v-if="showToken" :config="seg2TextCfg" />
              <v-text v-if="showToken" :config="dot2Cfg" />
              <v-rect v-if="showToken" :config="seg3Cfg" />
              <v-text v-if="showToken" :config="seg3TextCfg" />
              <!-- 验证标注 -->
              <v-text v-if="verifySplit" :config="splitLabelCfg" />
              <v-text v-if="verifyCompare || verifyPass" :config="compareTextCfg" />
              <!-- 底部结果 -->
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>JWT = Header.Payload.Signature</strong>，无状态凭证，服务器零存储、天然扩容</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>HS256</strong>：签名 = HMAC(secret, header.payload)，改任何字符重算都不匹配 → 防篡改</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>签发用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NewWithClaims(...).SignedString(secret)</code>，验证用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">jwt.Parse</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">WithValidMethods</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>中间件从 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Authorization: Bearer xxx</code> 取 token，验证后把 userID 注入 context</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>双 Token</strong>：Access 15 分钟 + Refresh 7~30 天，401 自动刷新重放实现无感续期</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>安全：别放敏感数据（base64 可读）、锁死算法防混淆攻击、密钥进环境变量</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-10-cookie-session" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Cookie/Session</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-12-cors-rate-limit" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：CORS/限流 →</RouterLink>
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
  { id: "sec-1", name: "为什么需要 JWT" },
  { id: "sec-2", name: "三段结构详解" },
  { id: "sec-3", name: "HS256 签名原理" },
  { id: "sec-4", name: "golang-jwt/v5 签发与解析" },
  { id: "sec-5", name: "auth 中间件与刷新 Token" },
  { id: "sec-6", name: "安全坑与最佳实践" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 JWT 签发与验证动画 =====
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', orange: '#f59e0b', purple: '#a78bfa', text: '#1e293b', muted: '#64748b', ghost: '#e2e8f0' }
const H = ref(370), W = ref(700)
const busy = ref(false), status = ref('')
const phase = ref(0)
const showHeaderRaw = ref(false), showHeaderB64 = ref(false)
const showPayloadRaw = ref(false), showPayloadB64 = ref(false)
const showSig = ref(false), showToken = ref(false)
const verifySplit = ref(false), verifyRecompute = ref(false)
const verifyCompare = ref(false), verifyPass = ref(false)
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const phaseTexts = [
  '初始：准备签发 JWT',
  '① 签发：把 Header 做 base64url 编码',
  '② 签发：把 Payload 做 base64url 编码',
  '③ 签发：对拼接串做 HMAC-SHA256 签名',
  '④ 签发：拼成 Token 发给客户端',
  '⑤ 验证：按点号把 Token 拆成三段',
  '⑥ 验证：用 secret 重算签名',
  '⑦ 验证：比对重算值与第 3 段',
  '⑧ 验证：签名一致 → 通过，内容未被篡改',
]
const stepLabel = computed(() => phaseTexts[phase.value])

const stepCfg = computed(() => ({
  x: 20, y: 12, width: W.value - 40, text: '🔐 ' + stepLabel.value,
  fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text, align: 'center',
}))

// Header 区域
const headerRawCfg = { x: 20, y: 50, width: 150, height: 50, fill: '#cffafe', cornerRadius: 8, stroke: '#06b6d4', strokeWidth: 1.5 }
const headerRawTextCfg = { x: 20, y: 50, width: 150, height: 50, text: '{"alg":"HS256",\n"typ":"JWT"}', fontSize: 10, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0e7490', align: 'center', verticalAlign: 'middle' }
const headerB64Cfg = { x: 20, y: 116, width: 150, height: 38, fill: '#06b6d4', cornerRadius: 8, stroke: '#0891b2', strokeWidth: 1.5 }
const headerB64TextCfg = { x: 20, y: 116, width: 150, height: 38, text: 'eyJhbGciOiJIUzI1NiJ9', fontSize: 9, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }
// Payload 区域
const payloadRawCfg = { x: 185, y: 50, width: 150, height: 50, fill: '#ede9fe', cornerRadius: 8, stroke: '#a78bfa', strokeWidth: 1.5 }
const payloadRawTextCfg = { x: 185, y: 50, width: 150, height: 50, text: '{"sub":"42",\n"exp":1710000000}', fontSize: 10, fontFamily: 'monospace', fontStyle: 'bold', fill: '#5b21b6', align: 'center', verticalAlign: 'middle' }
const payloadB64Cfg = { x: 185, y: 116, width: 150, height: 38, fill: '#a78bfa', cornerRadius: 8, stroke: '#7c3aed', strokeWidth: 1.5 }
const payloadB64TextCfg = { x: 185, y: 116, width: 150, height: 38, text: 'eyJzdWIiOiI0MiJ9', fontSize: 9, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }

function downArrowCfg(x1: number, y1: number, x2: number, y2: number) {
  return { points: [x1, y1, x2, y2], fill: '#94a3b8', stroke: '#94a3b8', strokeWidth: 2, pointerLength: 8, pointerWidth: 6 }
}

// 拼接串
const joinCfg = { x: 20, y: 172, width: 315, height: 28, fill: '#f1f5f9', cornerRadius: 14, stroke: '#94a3b8', strokeWidth: 1 }
const joinTextCfg = { x: 20, y: 172, width: 315, height: 28, text: '拼接串 = header_b64 + "." + payload_b64', fontSize: 10, fontFamily: 'monospace', fontStyle: 'bold', fill: '#475569', align: 'center', verticalAlign: 'middle' }
// 签名区
const sigCfg = computed(() => ({
  x: 20, y: 214, width: 315, height: 52, fill: verifyRecompute.value ? '#fde68a' : '#fef3c7', cornerRadius: 8,
  stroke: verifyRecompute.value ? '#d97706' : '#f59e0b', strokeWidth: 2,
}))
const sigTextCfg = computed(() => ({
  x: 20, y: 214, width: 315, height: 52,
  text: (verifyRecompute.value ? '重算签名 = HMAC-SHA256(拼接串, secret)\n→ s2nH7k3+...==' : 'HMAC-SHA256(拼接串, secret)\n→ 算出第 3 段签名'),
  fontSize: 10, fontFamily: 'monospace', fontStyle: 'bold', fill: '#92400e', align: 'center', verticalAlign: 'middle',
}))
// Token 三段
const seg1Cfg = { x: 20, y: 282, width: 96, height: 42, fill: '#06b6d4', cornerRadius: 8, stroke: '#0891b2', strokeWidth: 2 }
const seg1TextCfg = { x: 20, y: 282, width: 96, height: 42, text: 'eyJhbGciOiJIUzI1NiJ9', fontSize: 8, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }
const dot1Cfg = { x: 116, y: 290, width: 14, height: 26, text: '.', fontSize: 26, fontFamily: 'monospace', fontStyle: 'bold', fill: '#94a3b8', align: 'center', verticalAlign: 'middle' }
const seg2Cfg = { x: 130, y: 282, width: 96, height: 42, fill: '#a78bfa', cornerRadius: 8, stroke: '#7c3aed', strokeWidth: 2 }
const seg2TextCfg = { x: 130, y: 282, width: 96, height: 42, text: 'eyJzdWIiOiI0MiJ9', fontSize: 8, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }
const dot2Cfg = { x: 226, y: 290, width: 14, height: 26, text: '.', fontSize: 26, fontFamily: 'monospace', fontStyle: 'bold', fill: '#94a3b8', align: 'center', verticalAlign: 'middle' }
const seg3Cfg = { x: 240, y: 282, width: 96, height: 42, fill: '#f59e0b', cornerRadius: 8, stroke: '#d97706', strokeWidth: 2 }
const seg3TextCfg = { x: 240, y: 282, width: 96, height: 42, text: 's2nH7k3+...==', fontSize: 9, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }
// 拆段标注
const splitLabelCfg = computed(() => ({
  x: 20, y: 330, width: W.value - 40, text: '段1: base64url(Header)    段2: base64url(Payload)    段3: 签名',
  fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center',
}))
const compareTextCfg = computed(() => ({
  x: 20, y: 330, width: W.value - 40,
  text: verifyPass.value ? '比对结果：重算签名 与 第3段 一致 ✅' : '比对中：重算签名 == 第3段 ?',
  fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: verifyPass.value ? '#15803d' : '#b45309', align: 'center',
}))
// 底部结果
const resultCfg = computed(() => {
  let text = '提示：依次点步骤按钮，观察三段 token 如何签发与验证'
  let fill = C.muted
  if (phase.value === 4) { text = '✅ Token 已拼好：Header.Payload.Signature → 发给客户端'; fill = '#15803d' }
  if (phase.value >= 5 && phase.value <= 6) { text = '🔍 服务器收到 token，开始验证：拆段 + 重算签名'; fill = '#b45309' }
  if (phase.value === 7) { text = '🔍 关键一步：重算签名 == token 第3段？'; fill = '#b45309' }
  if (verifyPass.value) { text = '✅ 验证通过！签名一致，Payload 未被篡改——HS256 防篡改的核心'; fill = '#15803d' }
  return { x: 20, y: 348, width: W.value - 40, text, fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill, align: 'center' }
})

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function runStep(n: number) {
  if (n === 1) { showHeaderRaw.value = true; await d(400); showHeaderB64.value = true; await d(300) }
  else if (n === 2) { showPayloadRaw.value = true; await d(400); showPayloadB64.value = true; await d(300) }
  else if (n === 3) { showSig.value = true; await d(500) }
  else if (n === 4) { showToken.value = true; await d(500) }
  else if (n === 5) { verifySplit.value = true; await d(500) }
  else if (n === 6) { verifyRecompute.value = true; await d(500) }
  else if (n === 7) { verifyCompare.value = true; await d(600) }
  else if (n === 8) { verifyPass.value = true; await d(600) }
  phase.value = n
}

async function doStep(n: number) {
  if (phase.value !== n - 1) return
  await act(phaseTexts[n], () => runStep(n))
}

async function doAuto() {
  if (phase.value !== 0) return
  await act('自动演示 JWT 签发与验证', async () => {
    for (let n = 1; n <= 8; n++) await runStep(n)
  })
}

function doReset() {
  busy.value = false
  phase.value = 0
  showHeaderRaw.value = false; showHeaderB64.value = false
  showPayloadRaw.value = false; showPayloadB64.value = false
  showSig.value = false; showToken.value = false
  verifySplit.value = false; verifyRecompute.value = false
  verifyCompare.value = false; verifyPass.value = false
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

const jwtManualCode = `package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/base64"
    "encoding/json"
    "fmt"
)

// 手动拼一个 JWT——看清三段结构怎么来的
func main() {
    header := map[string]any{"alg": "HS256", "typ": "JWT"}
    payload := map[string]any{"sub": "42", "name": "Alice", "exp": 1710000000}
    secret := []byte("my-secret")

    hb, _ := json.Marshal(header)   // {"alg":"HS256","typ":"JWT"}
    pb, _ := json.Marshal(payload)  // {"exp":1710000000,"name":"Alice","sub":"42"}

    // base64url（用 -_ 代替 +/，去掉 = 填充）
    h64 := base64.RawURLEncoding.EncodeToString(hb)
    p64 := base64.RawURLEncoding.EncodeToString(pb)

    // 第 3 段 = HMAC-SHA256( header.payload , secret )
    mac := hmac.New(sha256.New, secret)
    mac.Write([]byte(h64 + "." + p64))
    s64 := base64.RawURLEncoding.EncodeToString(mac.Sum(nil))

    token := h64 + "." + p64 + "." + s64
    fmt.Println("Header  :", string(hb)) // 输出: {"alg":"HS256","typ":"JWT"}
    fmt.Println("Payload :", string(pb)) // 输出: {"exp":1710000000,"name":"Alice","sub":"42"}
    fmt.Println("Token   :", token)      // 输出: eyJhbGciOiJIUzI1NiJ9.eyJ...s2nH7k...`

const jwtIssueCode = `import (
    "time"
    "github.com/golang-jwt/jwt/v5"
)

var secret = []byte("你的密钥-务必放环境变量")

// 签发 Access Token（15 分钟有效）
func GenerateAccessToken(userID string) (string, error) {
    claims := jwt.MapClaims{
        "sub": userID,                                    // 用户标识
        "exp": time.Now().Add(15 * time.Minute).Unix(),   // 过期时间（秒）
        "iat": time.Now().Unix(),                         // 签发时间
    }
    // 自动完成：base64(Header) + base64(Payload) + HMAC 签名 → token 字符串
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(secret)
}`

const jwtParseCode = `// 解析 + 校验签名 + 校验过期
func ParseToken(tokenStr string) (*jwt.MapClaims, error) {
    token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (any, error) {
        // 关键安全点：校验算法类型，防算法混淆攻击
        if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("意外的签名算法: %v", t.Header["alg"])
        }
        return secret, nil
    }, jwt.WithValidMethods([]string{"HS256"})) // 白名单锁死更稳
    if err != nil {
        return nil, err // 签名不对 / 已过期 / 格式错，都返回错误
    }
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        return &claims, nil
    }
    return nil, fmt.Errorf("token 无效")
}`

const jwtMiddlewareCode = `// Gin 鉴权中间件：Authorization: Bearer <token>
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        h := c.GetHeader("Authorization")
        if !strings.HasPrefix(h, "Bearer ") {
            c.JSON(401, gin.H{"error": "缺少 Bearer Token"}); c.Abort(); return
        }
        claims, err := ParseToken(h[7:]) // 去掉 "Bearer " 前缀
        if err != nil {
            c.JSON(401, gin.H{"error": "token 无效或过期"}); c.Abort(); return
        }
        c.Set("userID", (*claims)["sub"]) // 注入上下文，handler 用 c.Get("userID")
        c.Next()
    }
}

// 受保护路由挂在中间件后面
//   api := r.Group("/api", AuthMiddleware())
//   { api.GET("/profile", getProfile) }

// 刷新 Token 概念:
//   客户端拿 Refresh Token 调 /api/auth/refresh →
//   服务器校验 refresh（长 7 天）→ 签发新 Access Token（短 15 分钟）
//   前端 axios 拦截器 401 时自动刷新 + 重放原请求`</script>
