<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔌 WebSocket</h1>
          <p class="text-sm text-slate-500 mt-1">实时双向通信——聊天、游戏、通知推送的底层协议</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-13-websocket.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-13</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：从 HTTP 升级到全双工连接
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          WebSocket 不是凭空出现的连接，而是<strong>基于 HTTP 的升级握手</strong>：先发一个带
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Upgrade: websocket</code> 的普通 HTTP 请求，
          服务端回 <strong>101 Switching Protocols</strong>，随后这条 TCP 连接被"改造"成全双工通道——
          此后两边<strong>随时</strong>都能互发<strong>数据帧</strong>，不再受"请求-响应"配对约束。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ws-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="ws-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              <marker id="ws-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" /></marker>
            </defs>

            <!-- 客户端 / 服务端盒子 -->
            <rect x="20" y="56" width="140" height="130" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="90" y="84" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0369a1">客户端</text>
            <text x="90" y="106" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0369a1">浏览器 / Go client</text>
            <text x="90" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">发起握手</text>
            <text x="90" y="166" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">读/写数据帧</text>

            <rect x="560" y="56" width="140" height="130" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="630" y="84" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#b91c1c">服务端</text>
            <text x="630" y="106" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#b91c1c">Go + gorilla/websocket</text>
            <text x="630" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">Upgrader.Upgrade()</text>
            <text x="630" y="166" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">ReadPump / WritePump</text>

            <!-- ① 升级请求 -->
            <line x1="160" y1="86" x2="556" y2="86" stroke="#94a3b8" stroke-width="2" marker-end="url(#ws-arr)" />
            <text x="358" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#1e293b">① HTTP 升级请求</text>
            <text x="358" y="102" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">GET /ws HTTP/1.1 · Connection: Upgrade</text>
            <text x="358" y="116" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">Upgrade: websocket · Sec-WebSocket-Key: abc…</text>

            <!-- ② 101 响应 -->
            <line x1="556" y1="134" x2="164" y2="134" stroke="#4ade80" stroke-width="2" marker-end="url(#ws-green)" />
            <text x="358" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">② 101 Switching Protocols</text>
            <text x="358" y="164" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">Sec-WebSocket-Accept: xyz…（由 Key 计算出的签名）</text>

            <!-- ③ 全双工 -->
            <text x="358" y="196" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0891b2">③ 全双工连接建立——双方随时互发数据帧</text>

            <!-- 双向帧 -->
            <line x1="160" y1="224" x2="556" y2="224" stroke="#4ade80" stroke-width="2.5" marker-end="url(#ws-green)" />
            <text x="358" y="212" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">Text 帧："你好"</text>
            <line x1="556" y1="248" x2="160" y2="248" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#ws-orange)" />
            <text x="358" y="262" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">Text 帧："欢迎" · Ping/Pong 心跳帧</text>

            <!-- 帧结构 -->
            <text x="20" y="288" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">数据帧结构（RFC 6455）——前两个字节是头部，后面是载荷：</text>
            <rect x="20" y="298" width="64" height="26" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="52" y="311" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#fff">FIN 1bit</text>
            <rect x="88" y="298" width="110" height="26" rx="4" fill="#0ea5e9" stroke="#0891b2" stroke-width="1" />
            <text x="143" y="311" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#fff">opcode 4bit</text>
            <rect x="202" y="298" width="140" height="26" rx="4" fill="#0369a1" stroke="#0891b2" stroke-width="1" />
            <text x="272" y="311" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#fff">MASK + Len 7bit</text>
            <rect x="346" y="298" width="120" height="26" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="1" />
            <text x="406" y="311" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#fff">Mask-Key 4B</text>
            <rect x="470" y="298" width="230" height="26" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="585" y="311" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0f172a">Payload 载荷</text>

            <text x="20" y="344" font-size="10" font-family="monospace" fill="#64748b">opcode: 0x1=Text · 0x2=Binary · 0x8=Close · 0x9=Ping · 0xA=Pong  |  客户端→服务端必须带 Masking Key（4 字节）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：WebSocket 生命周期——① 客户端用普通 HTTP 头申请升级 → ② 服务端回 101 → ③ 全双工通道建立，此后双方按帧结构互发 Text/Binary/Ping/Pong 帧</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么需要 WebSocket -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要 WebSocket — HTTP 的"单向困境"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          HTTP 是<strong>请求-响应模型</strong>：只能由<strong>客户端先开口</strong>，服务端被动应答。
          可聊天、游戏、股票行情这类场景是<strong>服务端要主动推数据</strong>——服务端没法"喊"客户端。
          于是早期只能<strong>轮询（Polling）</strong>：客户端每隔几秒问一次"有新消息吗？"，多数时候是白问，浪费带宽还延迟高。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方案</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方向</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">实时性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">开销</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">短轮询</td><td class="px-4 py-2 border border-slate-200">单向</td><td class="px-4 py-2 border border-slate-200">差（秒级延迟）</td><td class="px-4 py-2 border border-slate-200">高（每次都要 HTTP 头）</td><td class="px-4 py-2 border border-slate-200">低频状态查询</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">长轮询</td><td class="px-4 py-2 border border-slate-200">单向</td><td class="px-4 py-2 border border-slate-200">中（有消息才返回）</td><td class="px-4 py-2 border border-slate-200">中（连接悬挂，代理超时坑多）</td><td class="px-4 py-2 border border-slate-200">兼容老浏览器</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>WebSocket</strong></td><td class="px-4 py-2 border border-slate-200"><strong>全双工</strong></td><td class="px-4 py-2 border border-slate-200"><strong>即时（毫秒级）</strong></td><td class="px-4 py-2 border border-slate-200"><strong>低（一条 TCP，帧头仅 2 字节起）</strong></td><td class="px-4 py-2 border border-slate-200">聊天/游戏/推送</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">SSE (EventSource)</td><td class="px-4 py-2 border border-slate-200">单向（服务端→客户端）</td><td class="px-4 py-2 border border-slate-200">即时</td><td class="px-4 py-2 border border-slate-200">低（基于 HTTP）</td><td class="px-4 py-2 border border-slate-200">纯推送场景</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          浏览器里的 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">new WebSocket('ws://...')</code> 就是这条全双工通道的客户端；
          <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">ws.onmessage</code> 对应 Go 侧的 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">ReadMessage()</code>，
          <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">ws.send()</code> 对应 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">WriteMessage()</code>。
          Node 侧的 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">ws</code> 库 / Socket.IO 的服务端就是 Go 这边 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">gorilla/websocket</code> 的同款角色。<br/>
          SSE（<code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">EventSource</code>）只支持服务端推、客户端不能回，WebSocket 是真正的双向。
          </p>
        </aside>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>全双工</strong>——一条连接，两边都能随时发，不再有"先请求后响应"的约束。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>低开销</strong>——升级完成后没有 HTTP 头，数据帧头只有 2~14 字节，心跳用 2 字节的 Ping/Pong。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>省端口</strong>——WebSocket 默认走 80/443 端口，可穿过绝大多数防火墙和代理（升级时浏览器自动带上 Origin 头做鉴权）。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="bash" :code="wsWire" title="升级握手时的原始 HTTP 报文（抓包视角）" /></div>
      </section>

      <!-- 2. 升级握手 + gorilla/websocket -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          升级握手 — Upgrade 与 gorilla/websocket 基本用法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          握手发生在普通 HTTP 之上，由 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">websocket.Upgrader</code> 完成。
          服务端调用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Upgrade(w, r, nil)</code> 时，库会：
          校验握手头（Key、Version）→ 计算 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Sec-WebSocket-Accept</code> →
          写入 <strong>101 Switching Protocols</strong> 响应 → 返回一个 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">*websocket.Conn</code>。
          从此 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">w</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">r</code> 就"退役"了，你只用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">conn</code>。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>客户端发升级请求</strong>：带 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Upgrade: websocket</code> + 随机 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Sec-WebSocket-Key</code>（16 字节 base64）。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>服务端校验并响应 101</strong>：把 Key 拼上固定 GUID <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">258EAFA5-E914-47DA-95CA-C5AB0DC85B11</code> 做 SHA-1，base64 后回填 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Sec-WebSocket-Accept</code>，状态码 <strong>101</strong>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>客户端校验 Accept</strong>：两边都用同一套算法验算，证明"确实是对方在回话"（防止有人冒充端口）。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="upgradeCode" title="ws_upgrade.go — 标准库 + gorilla 升级" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ CheckOrigin 别乱开：</strong>生产环境一定要校验 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">Origin</code>（只允许自家域名），
          否则任何网页都能 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">fetch</code>/<code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">new WebSocket</code> 连你的服务，这就是 <strong>跨站 WebSocket 劫持</strong>（CSWSH）。开发环境图省事才 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">return true</code>。</p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Gin 里的写法（同理，把 c.Writer/c.Request 传进去）</h3>
        <div class="mb-4"><Code language="go" :code="ginCode" title="ws_gin.go — echo 版聊天" /></div>
      </section>

      <!-- 3. 数据帧 + ReadMessage/WriteMessage -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          数据帧与 ReadMessage / WriteMessage
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          建立连接后，所有数据都封装成<strong>帧（Frame）</strong>。帧的前两字节固定是头部：
          <strong>FIN</strong>（1 bit，是否最后一帧）、<strong>opcode</strong>（4 bit，帧类型）、
          <strong>MASK + 长度</strong>（第 2 字节）。gorilla 库把帧细节全部藏起来，
          你只跟 <strong>消息</strong> 打交道：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">ReadMessage()</code> 返回
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">(messageType, payload, err)</code>，
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">WriteMessage(messageType, data)</code> 负责打包发出。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">opcode 常量</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">值</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">websocket.TextMessage</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">0x1</td><td class="px-4 py-2 border border-slate-200">文本消息（UTF-8）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">websocket.BinaryMessage</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">0x2</td><td class="px-4 py-2 border border-slate-200">二进制消息（图片/protobuf）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">websocket.CloseMessage</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">0x8</td><td class="px-4 py-2 border border-slate-200">关闭连接（带状态码）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">websocket.PingMessage</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">0x9</td><td class="px-4 py-2 border border-slate-200">心跳探测</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">websocket.PongMessage</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">0xA</td><td class="px-4 py-2 border border-slate-200">心跳应答</td></tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4"><Code language="go" :code="readWriteCode" title="ws_readwrite.go — 区分文本/二进制 + 超时" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：不设读超时会卡死。</strong>客户端断网时 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">ReadMessage()</code> 可能永远阻塞。
          必须配合 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">SetReadDeadline</code> + <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">SetPongHandler</code> 心跳机制（见第 6 节）。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：并发写同一连接会数据错乱。</strong>WebSocket 帧没有"消息边界锁"，
          两个 goroutine 同时 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">WriteMessage</code> 会把帧头和数据交叉串起来。
          规则：<strong>同一连接同一时刻只允许一个 goroutine 写</strong>——这也是第 4 节 writePump 存在的原因。</p>
        </aside>
      </section>

      <!-- 4. readPump/writePump -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          readPump / writePump 双协程模式
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          聊天室要<strong>同时干两件事</strong>：不停读客户端消息，还要把别人发来的消息写回给客户端。
          如果在一个 goroutine 里又读又写，读会阻塞写、写会阻塞读。标准解法是<strong>双协程</strong>：
          <strong>readPump</strong> 负责读消息 + 维护心跳，<strong>writePump</strong> 负责消费一个写队列（channel），
          把要发的消息一条条写出去。读写各占一个 goroutine，互不阻塞，且保证<strong>只有 writePump 一个 goroutine 写连接</strong>。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>读方向</strong>：readPump 里循环 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">conn.ReadMessage()</code>，把消息转交给业务层（如 hub 广播）。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>写方向</strong>：writePump 里 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for msg := range c.send</code> 从 channel 取消息写出去，写空 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">close(c.send)</code> 退出。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>退出协同</strong>：读出错 → 关闭连接 → writePump 的写失败自动退出 → goroutine 全部收尾，无泄漏。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="pumpCode" title="ws_pump.go — gorilla 官方推荐的双协程写法" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>readPump ≈ 一个常驻的 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">ws.onmessage = fn</code> 监听器；
          writePump ≈ 一个任务队列 + <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">setInterval(flushQueue)</code> 的发送器。
          用 channel 当队列、用 goroutine 当消费者——这正是 <strong>goroutine + channel</strong>（阶段 2 学的）在生产里的典型应用。</p>
        </aside>
      </section>

      <!-- 5. hub 广播 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          多客户端广播 — Hub 结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个聊天室有<strong>成百上千个连接</strong>。每个连接就是一个 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Client{conn, send}</code>。
          谁把 A 的消息转给 B、C、D？需要一个中央角色：<strong>Hub</strong>。Hub 用三个 channel 收命令：
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">register</code>（新连接加入）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">unregister</code>（连接退出）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">broadcast</code>（群发消息）。
          Hub 自己是一个<strong>单 goroutine 事件循环</strong>——所有对 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">clients</code> map 的修改都只在这个 goroutine 里发生，天然无锁。
        </p>

        <div class="mb-4"><Code language="go" :code="hubCode" title="ws_hub.go — 中央 Hub 事件循环" /></div>
        <div class="mb-4"><Code language="go" :code="hubClientCode" title="ws_hub_client.go — 连接注册进 Hub 并启动双协程" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：Hub 是"单写者"模型。</strong>广播时往每个 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">client.send</code> channel 写一个值，
          真正写连接的仍是每个 client 自己的 writePump——多写者问题就被 channel 化解成"每个连接一个写者"。发送到满的 channel 时用 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">select default</code> 丢弃慢客户端，防止一个乌龟拖垮整个广播循环。</p>
        </aside>
      </section>

      <!-- 6. 心跳与关闭 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          心跳（ping/pong）与连接关闭处理
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          TCP 是"虚连接"——一端拔网线，另一端要很久才发现。所以服务端要主动<strong>探活</strong>：
          定时发 <strong>Ping</strong> 帧，客户端回 <strong>Pong</strong> 帧。gorilla 里这样配：
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">SetPongHandler</code> 收到 Pong 就刷新读超时，
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">SetReadDeadline</code> 设一个"超过 N 秒没收到任何帧就超时"，写方用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">WriteControl(PingMessage, ...)</code> 周期发 Ping。
          超时后 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">ReadMessage()</code> 返回错误，readPump 顺势清理连接。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>读超时设宽松点</strong>：如 60s 没收到任何帧判死；Pong 能刷新这个计时。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>发 Ping 的节奏</strong>：每 30s 或 45s 发一次（读超时的一半以内），给慢网络留足往返时间。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>优雅关闭</strong>：服务端下线前向所有客户端发 <strong>Close</strong> 帧（带 1001 Going Away），客户端收到后主动 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">conn.Close()</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>最后兜底</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">defer conn.Close()</code> 保证任何 return 路径都释放底层 TCP 资源。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="heartbeatCode" title="ws_heartbeat.go — 心跳 + 优雅关闭" /></div>
      </section>

      <!-- 7. 对比与常见问题 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          gorilla vs nhooyr/websocket + 常见问题
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 社区两大主流库：<strong>gorilla/websocket</strong>（最流行、教程最多）和
          <strong>nhooyr.io/websocket</strong>（较新，API 更简洁，内置 context 取消，官方推荐度在上升）。
          自 Go 1.22 起标准库新增 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">net/http</code> 的实验性
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">websocket</code> 包，但生产仍以第三方库为主。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">gorilla/websocket</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">nhooyr.io/websocket</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">API 风格</td><td class="px-4 py-2 border border-slate-200">经典：Upgrade / ReadMessage / WriteMessage</td><td class="px-4 py-2 border border-slate-200">Context 优先：Accept / Read / Write</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">取消/超时</td><td class="px-4 py-2 border border-slate-200">手动 SetReadDeadline</td><td class="px-4 py-2 border border-slate-200">context.WithTimeout 直接可用</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">文档/生态</td><td class="px-4 py-2 border border-slate-200">最多示例、最多踩坑记录</td><td class="px-4 py-2 border border-slate-200">较新，示例偏少</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">适用</td><td class="px-4 py-2 border border-slate-200"><strong>教程友好，首选学习</strong></td><td class="px-4 py-2 border border-slate-200">新项目尝鲜、喜欢 context 风格</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">面试/实战高频问题</h3>
        <div class="space-y-3 text-slate-600 text-sm mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: 为什么 WebSocket 能解决服务端推送？</strong>
            <p class="mt-1">HTTP 是半双工（请求-响应），服务端无法主动开口；WebSocket 升级后变成全双工，两端对等，谁都能随时发帧。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: 100 个连接 100 个 goroutine，会爆吗？</strong>
            <p class="mt-1">不会——每个 goroutine 才 2KB 栈，一万个连接也就几十 MB。这正是"连接多 + goroutine 多"的天作之合，Node 一个连接一个回调也能抗，但 Go 更省。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: 反向代理（Nginx）支持 WebSocket 吗？</strong>
            <p class="mt-1">要开 <code class="bg-slate-50 text-cyan-700 px-1 rounded text-xs font-mono">Upgrade</code> 头透传，并调大代理的超时（默认 60s 会掐断长连接）。配置好再上线。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: 为什么客户端→服务端必须带 Masking Key？</strong>
            <p class="mt-1">协议规定。早年浏览器发起的请求可被恶意脚本用伪造帧污染代理缓存（缓存投毒），掩码让中间设备无法预测帧内容。服务端→客户端不用掩码，所以服务端帧更省 4 字节。</p>
          </div>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 生产级 checklist：</strong>① CheckOrigin 白名单；② readPump/writePump 双协程 + 单写者；③ 心跳兜底断连；④ SetReadLimit 限制单帧大小防内存炸弹；⑤ 用 context 或 hub 统一管理退出；⑥ 监控连接数（metric），异常飙升要告警。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：全双工消息流
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          连接已建立。点按钮发送消息：<strong>绿色帧</strong>是客户端 → 服务端，<strong>橙色帧</strong>是服务端 → 客户端。
          注意两边<strong>互不等待</strong>——这就是全双工，而不是一来一回的请求-响应。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📤 发送: {{ sent }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📥 送达: {{ delivered }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '空闲——连接已建立' }}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="send('你好', 0)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">📤 发送: 你好</button>
          <button @click="send('ping', 0)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">📤 发送: ping</button>
          <button @click="send('欢迎新用户', 1)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">📣 服务端广播</button>
          <button @click="autoChat" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">💬 模拟对话 ×6</button>
          <button @click="resetViz" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>

        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 客户端端点 -->
              <v-rect :config="clientBoxCfg" />
              <v-text :config="clientTitleCfg" />
              <v-text :config="clientSubCfg" />
              <!-- 服务端端点 -->
              <v-rect :config="serverBoxCfg" />
              <v-text :config="serverTitleCfg" />
              <v-text :config="serverSubCfg" />
              <!-- 已建立的连接虚线 -->
              <v-line :config="connLineCfg" />

              <!-- 在途消息帧（飞行的箭头 + 文字标签） -->
              <template v-for="m in msgs" :key="m.id">
                <v-arrow :config="msgArrowCfg(m)" />
                <v-text :config="msgLabelCfg(m)" />
              </template>
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>WebSocket = <strong>HTTP 升级握手（101）</strong> + 全双工数据帧流，解决服务端主动推送</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>握手靠 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">websocket.Upgrader.Upgrade()</code>，握手后只操作 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">*websocket.Conn</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>帧结构：FIN + opcode（Text/Binary/Close/Ping/Pong）+ 长度 + 载荷，客户端帧必须带掩码</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>readPump / writePump 双协程</strong>：读一个、写一个，保证同一连接单写者</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Hub</strong> 事件循环管理多个连接：register/unregister/broadcast 三个 channel，天然无锁</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>心跳</strong>（Ping/Pong + SetReadDeadline）识别"假死"连接，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">defer conn.Close()</code> 兜底释放</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>生产注意：CheckOrigin 白名单、SetReadLimit、监控连接数、Nginx 透传 Upgrade 头</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-12-cors-rate-limit" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：CORS/限流</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-14-graceful-shutdown" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：优雅关停 →</RouterLink>
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
  { id: "sec-1", name: "为什么需要 WebSocket" },
  { id: "sec-2", name: "升级握手" },
  { id: "sec-3", name: "数据帧与读写" },
  { id: "sec-4", name: "readPump/writePump" },
  { id: "sec-5", name: "Hub 广播" },
  { id: "sec-6", name: "心跳与关闭" },
  { id: "sec-7", name: "库对比与常见问题" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 WebSocket 全双工动画 =====
const C = { cyan: '#06b6d4', green: '#4ade80', orange: '#f59e0b', red: '#ef4444', text: '#1e293b', muted: '#64748b', ghost: '#e2e8f0' }
const H = ref(250), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const sent = ref(0), delivered = ref(0)
const nid = ref(100)
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface WsMsg { id: number; text: string; dir: 0 | 1; p: number; lane: number; color: string; hold: number }
const msgs = reactive<WsMsg[]>([])
let timer: number | null = null

function ensureTimer() { if (timer == null) timer = window.setInterval(tick, 40) }
function stopTimer() { if (timer != null) { clearInterval(timer); timer = null } }
function tick() {
  let active = false
  const done: number[] = []
  msgs.forEach(m => {
    if (m.p < 1) { m.p = Math.min(1, m.p + 0.03); active = true }
    else if (m.hold > 0) { m.hold--; active = true }
    else { delivered.value++; done.push(m.id) }
  })
  if (done.length) for (let i = msgs.length - 1; i >= 0; i--) { if (done.includes(msgs[i].id)) msgs.splice(i, 1) }
  if (!active) stopTimer()
}

function send(text: string, dir: 0 | 1) {
  if (busy.value) return
  msgs.push({ id: nid.value++, text, dir, p: 0, lane: msgs.length % 4, color: dir === 0 ? C.green : C.orange, hold: 18 })
  sent.value++
  status.value = dir === 0 ? `客户端 → 服务端: "${text}"` : `服务端 → 客户端: "${text}"`
  ensureTimer()
}

async function autoChat() {
  if (busy.value) return
  busy.value = true
  const script: [string, 0 | 1][] = [['你好', 0], ['你好！', 1], ['ping', 0], ['pong', 1], ['看到消息了', 0], ['已广播给所有人', 1]]
  for (const [t, dir] of script) { send(t, dir); await d(700) }
  busy.value = false
}

function resetViz() { stopTimer(); msgs.length = 0; sent.value = 0; delivered.value = 0; status.value = '' }

const clientBoxCfg = computed(() => ({ x: 20, y: 24, width: 110, height: H.value - 48, fill: '#e0f2fe', cornerRadius: 10, stroke: '#0ea5e9', strokeWidth: 1.5 }))
const clientTitleCfg = computed(() => ({ x: 20, y: 40, width: 110, text: '客户端', fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0369a1', align: 'center' }))
const clientSubCfg = computed(() => ({ x: 20, y: 58, width: 110, text: 'Client\nReadMessage\nWriteMessage', fontSize: 10, fontFamily: 'monospace', fill: '#64748b', align: 'center' }))
const serverBoxCfg = computed(() => ({ x: W.value - 130, y: 24, width: 110, height: H.value - 48, fill: '#fef2f2', cornerRadius: 10, stroke: '#ef4444', strokeWidth: 1.5 }))
const serverTitleCfg = computed(() => ({ x: W.value - 130, y: 40, width: 110, text: '服务端', fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: '#b91c1c', align: 'center' }))
const serverSubCfg = computed(() => ({ x: W.value - 130, y: 58, width: 110, text: 'Go Server\nreadPump\nwritePump', fontSize: 10, fontFamily: 'monospace', fill: '#64748b', align: 'center' }))
const connLineCfg = computed(() => ({ points: [130, H.value / 2, W.value - 130, H.value / 2], stroke: '#94a3b8', strokeWidth: 1, dash: [6, 6] }))

function msgXY(m: WsMsg) {
  const y = 70 + m.lane * 42
  const sx = m.dir === 0 ? 145 : W.value - 145
  const ex = m.dir === 0 ? W.value - 145 : 145
  const x = sx + (ex - sx) * m.p
  return { x, y, sx, ex }
}
function msgArrowCfg(m: WsMsg) {
  const { x, y } = msgXY(m)
  return { points: [x - 16, y, x + 16, y], fill: m.color, stroke: m.color, strokeWidth: 3, pointerLength: 9, pointerWidth: 7, lineCap: 'round' }
}
function msgLabelCfg(m: WsMsg) {
  const { x, y } = msgXY(m)
  const half = m.p > 0.5 ? 'right' : 'left'
  return { x: half === 'left' ? x - 14 : x + 14, y: y - 16, text: m.text, fontSize: 12, fontFamily: 'monospace', fill: m.color, align: half === 'left' ? 'right' : 'left' }
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) { }
  finally { await d(200); busy.value = false }
}

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => { ro?.disconnect(); stopTimer() })

// ===== 代码示例 =====
const wsWire = `# ① 客户端发起的升级请求（普通 HTTP，多加三个头）
GET /ws HTTP/1.1
Host: example.com
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==   # 16 字节随机值 base64
Sec-WebSocket-Version: 13

# ② 服务端响应（状态码 101 = 协议切换）
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
# Accept = base64( SHA1( Key + 258EAFA5-E914-47DA-95CA-C5AB0DC85B11 ) )

# ③ 之后：双方直接互发帧（抓包会看到 opcode 0x1 / 0x9 / 0xA ...）`

const upgradeCode = `// ws_upgrade.go — 标准库 http + gorilla/websocket
package main

import (
    "log"
    "net/http"
    "github.com/gorilla/websocket"
)

// Upgrader 负责把 HTTP 请求升级成 WebSocket 连接
var upgrader = websocket.Upgrader{
    // 生产环境必须校验 Origin（只允许自家域名）
    // 这里仅作演示才放行所有来源
    CheckOrigin: func(r *http.Request) bool { return true },
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
    // 校验握手头、回 101、返回 *websocket.Conn
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println("upgrade failed:", err)
        return
    }
    defer conn.Close()   // 兜底释放 TCP 资源

    for {
        // 读一帧：返回 (消息类型, 载荷, 错误)
        msgType, msg, err := conn.ReadMessage()
        if err != nil {
            log.Println("read error:", err)
            break      // 客户端断开或读超时
        }
        log.Printf("收到 type=%d: %s", msgType, msg)

        // 回写一帧（echo）
        if err := conn.WriteMessage(msgType, msg); err != nil {
            log.Println("write error:", err)
            break
        }
    }
}

func main() {
    http.HandleFunc("/ws", wsHandler)
    log.Println("listening :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
// 输出:
// 收到 type=1: 你好
// 收到 type=1: hello
// ...`

const ginCode = `// ws_gin.go — Gin 路由里升级 WebSocket
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ws", func(c *gin.Context) {
        conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
        if err != nil { return }
        defer conn.Close()

        // 把每条消息广播给所有客户端（接入 Hub 后）
        for {
            mt, msg, err := conn.ReadMessage()
            if err != nil { break }
            // 回显给发送者，或交给 hub.broadcast 群发
            if err := conn.WriteMessage(mt, msg); err != nil { break }
        }
    })
    r.Run(":8080")
}`

const readWriteCode = `// ws_readwrite.go — 区分文本/二进制 + 读写超时 + 单帧大小限制
const (
    writeWait  = 10 * time.Second // 写超时
    readLimit  = 64 * 1024        // 单帧最大 64KB，防内存炸弹
)

func handleConn(conn *websocket.Conn) {
    defer conn.Close()

    // 限制单帧大小（超了 ReadMessage 直接报错）
    conn.SetReadLimit(readLimit)

    for {
        // 读超时兜底：60s 内没收到任何帧就出错（配合心跳刷新）
        conn.SetReadDeadline(time.Now().Add(60 * time.Second))

        msgType, msg, err := conn.ReadMessage()
        if err != nil {
            // *websocket.CloseError 可读具体关闭码
            if ce, ok := err.(*websocket.CloseError); ok {
                log.Printf("客户端关闭, code=%d text=%s", ce.Code, ce.Text)
            } else {
                log.Println("read error:", err)
            }
            return
        }

        switch msgType {
        case websocket.TextMessage:
            log.Printf("文本: %s", msg)
        case websocket.BinaryMessage:
            log.Printf("二进制, %d 字节", len(msg))
        }

        // 写也要设超时，防止写阻塞卡死
        conn.SetWriteDeadline(time.Now().Add(writeWait))
        if err := conn.WriteMessage(msgType, msg); err != nil {
            return
        }
    }
}
// 输出: 文本: hello
// 输出: 二进制, 2048 字节`

const pumpCode = `// ws_pump.go — gorilla 官方推荐：readPump + writePump 双协程
type Client struct {
    conn *websocket.Conn
    send chan []byte   // writePump 消费的写队列
}

const (
    writeWait  = 10 * time.Second
    pongWait   = 60 * time.Second
    pingPeriod = (pongWait * 9) / 10  // 54s 发一次 ping
)

// readPump：一个 goroutine，只负责读
func (c *Client) readPump() {
    defer c.conn.Close()
    c.conn.SetReadLimit(512)
    c.conn.SetReadDeadline(time.Now().Add(pongWait))
    c.conn.SetPongHandler(func(string) error {
        // 收到 pong 就刷新读超时
        c.conn.SetReadDeadline(time.Now().Add(pongWait))
        return nil
    })
    for {
        _, _, err := c.conn.ReadMessage()
        if err != nil {
            return  // 读失败 = 连接失效，退出后 defer 关闭
        }
        // 业务处理（广播/转发）...
    }
}

// writePump：另一个 goroutine，唯一写连接的人
func (c *Client) writePump() {
    ticker := time.NewTicker(pingPeriod)
    defer func() {
        ticker.Stop()
        c.conn.Close()
    }()
    for {
        select {
        case msg, ok := <-c.send:
            c.conn.SetWriteDeadline(time.Now().Add(writeWait))
            if !ok {   // channel 被 close → 关闭连接
                c.conn.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }
            if err := c.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
                return
            }
        case <-ticker.C:
            // 周期发 ping，检测客户端是否还活着
            c.conn.SetWriteDeadline(time.Now().Add(writeWait))
            if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
                return
            }
        }
    }
}
// 启动：go c.readPump(); go c.writePump()
// 关闭：close(c.send) 即可让 writePump 优雅退出`

const hubCode = `// ws_hub.go — 中央 Hub：单 goroutine 事件循环，天然无锁
type Hub struct {
    clients    map[*Client]bool  // 当前在线连接
    register   chan *Client      // 新连接加入
    unregister chan *Client      // 连接退出
    broadcast  chan []byte       // 要群发的消息
}

func NewHub() *Hub {
    return &Hub{
        clients:    make(map[*Client]bool),
        register:   make(chan *Client),
        unregister: make(chan *Client),
        broadcast:  make(chan []byte),
    }
}

// run 在一个 goroutine 里循环消费三个 channel——
// 所有对 clients map 的读写都发生在这里，不需要加锁
func (h *Hub) run() {
    for {
        select {
        case c := <-h.register:
            h.clients[c] = true
            log.Printf("连接 +1, 当前 %d", len(h.clients))
        case c := <-h.unregister:
            if _, ok := h.clients[c]; ok {
                delete(h.clients, c)
                close(c.send)          // 通知 writePump 退出
                log.Printf("连接 -1, 当前 %d", len(h.clients))
            }
        case msg := <-h.broadcast:
            // 群发：给每个客户端写队列投递一份
            for c := range h.clients {
                select {
                case c.send <- msg:
                    // 已入队，writePump 负责写出
                default:
                    // 队列满 = 慢客户端，直接断开，别拖累广播
                    delete(h.clients, c)
                    close(c.send)
                }
            }
        }
    }
}
// 输出: 连接 +1, 当前 1
// 输出: 连接 +1, 当前 2
// 输出: 连接 -1, 当前 1`

const hubClientCode = `// ws_hub_client.go — 把每个连接注册进 Hub 并启动双协程
func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil { return }

    // 每个连接一个 Client + 一个写队列
    client := &Client{conn: conn, send: make(chan []byte, 64)}
    hub.register <- client     // 注册（阻塞直到 Hub 消费）

    go client.writePump()      // 启动写协程
    go client.readPump(hub)    // 启动读协程
}

// readPump 里收到消息 → 交给 hub 广播，而不是自己回显
func (c *Client) readPump(hub *Hub) {
    defer func() {
        hub.unregister <- c    // 退出时注销
        c.conn.Close()
    }()
    for {
        _, msg, err := c.conn.ReadMessage()
        if err != nil { return }
        hub.broadcast <- msg   // 群发给所有在线客户端
    }
}
// 这样 A 发一句，B/C/D 全都能实时收到——聊天室的核心套路`

const heartbeatCode = `// ws_heartbeat.go — 心跳探活 + 服务端优雅关闭
func (s *ChatServer) broadcastPing() {
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()
    for {
        select {
        case <-ticker.C:
            // 向所有客户端发 Ping 帧
            for c := range s.hub.clients {
                c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
                if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
                    s.hub.unregister <- c  // 写失败就注销
                }
            }
        case <-s.ctx.Done():
            // 收到停机信号：向所有客户端发 Close 帧(1001)，再退
            for c := range s.hub.clients {
                c.conn.WriteControl(websocket.CloseMessage,
                    websocket.FormatCloseMessage(websocket.CloseGoingAway, "server shutting down"),
                    time.Now().Add(5*time.Second))
            }
            return
        }
    }
}

// 客户端读侧配合：收到 Close 帧 → 主动断开
//   _, _, err := conn.ReadMessage()
//   if websocket.IsCloseError(err, websocket.CloseGoingAway, websocket.CloseNormalClosure) {
//       log.Println("服务端正常关闭")
//       return
//   }
// 输出: 服务端正常关闭`
</script>
