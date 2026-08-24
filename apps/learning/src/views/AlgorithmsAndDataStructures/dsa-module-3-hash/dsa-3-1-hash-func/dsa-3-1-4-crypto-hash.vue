<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔐 密码学哈希：MD5/SHA 系列与完整性校验</h1>
          <p class="text-sm text-slate-500 mt-1">单向 · 抗碰撞 · 定长 —— 哈希家族的「安全派」</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-1-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：哈希家族谱系 + MD5 处理流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          前面几篇讲的<strong>表散列</strong>（取模、乘法、多项式）是为「查找」服务的；而<strong>密码学哈希</strong>是另一个物种——
          它要为「安全」服务：把任意长度的输入压成一个<strong>固定长度的指纹</strong>，且这个指纹<strong>不可逆、不可伪造</strong>。
          下面第一张图展示两大分支的谱系，第二张图拆解 MD5 的 Merkle–Damgård 处理流水线。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 760 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="fh-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 根节点 -->
            <rect x="300" y="24" width="160" height="42" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="380" y="42" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">哈希函数</text>
            <text x="380" y="58" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">Hash Function</text>

            <!-- 两大分支连线 -->
            <line x1="380" y1="66" x2="145" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />
            <line x1="380" y1="66" x2="615" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />

            <!-- 左：表散列 -->
            <rect x="70" y="104" width="150" height="42" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="145" y="122" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">表散列</text>
            <text x="145" y="138" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">查找定位用</text>
            <line x1="145" y1="146" x2="99" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />
            <line x1="145" y1="146" x2="265" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />

            <!-- 左叶：取模/乘法 -->
            <rect x="24" y="196" width="150" height="48" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="99" y="214" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#334155">取模 / 乘法</text>
            <text x="99" y="230" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">输出小 · 要均匀</text>
            <!-- 左叶：多项式哈希 -->
            <rect x="190" y="196" width="150" height="48" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="265" y="214" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#334155">多项式哈希</text>
            <text x="265" y="230" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">滚动窗口 O(1)</text>

            <!-- 右：密码学哈希 -->
            <rect x="540" y="104" width="150" height="42" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="615" y="122" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">密码学哈希</text>
            <text x="615" y="138" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">摘要 / 安全</text>
            <line x1="615" y1="146" x2="400" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />
            <line x1="615" y1="146" x2="496" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />
            <line x1="615" y1="146" x2="592" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />
            <line x1="615" y1="146" x2="688" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#fh-arr)" />

            <!-- 右叶：MD5（红） -->
            <rect x="356" y="196" width="88" height="48" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="400" y="214" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">MD5</text>
            <text x="400" y="230" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#dc2626">128bit · 已攻破</text>
            <!-- 右叶：SHA-1（橙） -->
            <rect x="452" y="196" width="88" height="48" rx="8" fill="#ffedd5" stroke="#f59e0b" stroke-width="1.5" />
            <text x="496" y="214" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">SHA-1</text>
            <text x="496" y="230" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706">160bit · 已攻破</text>
            <!-- 右叶：SHA-2（绿） -->
            <rect x="548" y="196" width="88" height="48" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="592" y="214" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#166534">SHA-2</text>
            <text x="592" y="230" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">256/384/512 · 安全</text>
            <!-- 右叶：SHA-3（绿） -->
            <rect x="644" y="196" width="88" height="48" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="688" y="214" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#166534">SHA-3</text>
            <text x="688" y="230" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">224-512 · 安全</text>

            <!-- 图例 -->
            <rect x="24" y="262" width="10" height="10" rx="2" fill="#fee2e2" stroke="#ef4444" />
            <text x="40" y="267" font-size="10" font-family="monospace" fill="#64748b">已攻破</text>
            <rect x="110" y="262" width="10" height="10" rx="2" fill="#ffedd5" stroke="#f59e0b" />
            <text x="126" y="267" font-size="10" font-family="monospace" fill="#64748b">已过时</text>
            <rect x="196" y="262" width="10" height="10" rx="2" fill="#dcfce7" stroke="#22c55e" />
            <text x="212" y="267" font-size="10" font-family="monospace" fill="#64748b">安全</text>
            <rect x="282" y="262" width="10" height="10" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="3 2" />
            <text x="298" y="267" font-size="10" font-family="monospace" fill="#64748b">查找用途（无安全要求）</text>

            <text x="24" y="292" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">表散列追求「均匀 + 快」；密码哈希追求「单向 + 抗碰撞」—— 同叫哈希，目标完全不同</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：哈希家族谱系 —— 左侧表散列用于查找，右侧密码学哈希用于安全，标注输出长度与安全状态</figcaption>
        </figure>

        <!-- MD5 处理流程 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">MD5 处理流程：填充 → 分块 → 链式压缩 → 128bit 摘要</h3>
        <figure>
          <svg viewBox="0 0 720 214" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="md-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 第 1 行：抽象流水线 -->
            <rect x="12" y="16" width="92" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="58" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">输入消息 M</text>
            <line x1="104" y1="36" x2="128" y2="36" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="132" y="16" width="100" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="182" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">填充 + 位长</text>
            <line x1="232" y1="36" x2="256" y2="36" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="260" y="16" width="92" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="306" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">512bit 分块</text>
            <line x1="352" y1="36" x2="376" y2="36" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="380" y="16" width="96" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="428" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">压缩函数 f</text>
            <line x1="476" y1="36" x2="500" y2="36" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="504" y="16" width="104" height="40" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="556" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">128bit 摘要</text>

            <!-- 第 2 行：MD 链式迭代 -->
            <text x="12" y="104" font-size="11" font-family="monospace" fill="#64748b">Merkle–Damgård 链式迭代：前一块的输出 H[i] 作为下一块的输入，H[0] = 固定 IV</text>
            <rect x="12" y="112" width="48" height="40" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="36" y="132" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">IV</text>
            <line x1="60" y1="132" x2="84" y2="132" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="88" y="112" width="64" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="120" y="132" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B1</text>
            <line x1="152" y1="132" x2="176" y2="132" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="180" y="112" width="64" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="212" y="132" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B2</text>
            <line x1="244" y1="132" x2="268" y2="132" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="272" y="112" width="64" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="304" y="132" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B3</text>
            <line x1="336" y1="132" x2="360" y2="132" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="364" y="112" width="64" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="396" y="132" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B4</text>
            <line x1="428" y1="132" x2="452" y2="132" stroke="#94a3b8" stroke-width="2" marker-end="url(#md-arr)" />
            <rect x="456" y="112" width="92" height="40" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="502" y="132" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">摘要 H4</text>

            <text x="120" y="166" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">512bit</text>
            <text x="212" y="166" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">512bit</text>
            <text x="304" y="166" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">512bit</text>
            <text x="396" y="166" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">512bit</text>

            <text x="12" y="198" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">H[i] = f(H[i-1], B[i])　压缩函数 4 轮 64 步，每步改一个 32bit 寄存器 → 128bit 中间状态</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：MD5 处理流程 —— 填充保证任意长度可分块，Merkle–Damgård 结构让每块都被前一块的中间状态「搅拌」</figcaption>
        </figure>
      </section>

      <!-- sec-1 两类哈希 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          两类哈希：目标完全不同
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          表散列和密码哈希都叫「哈希」，但它们是<strong>两个物种</strong>。表散列要的是<strong>均匀 + 快 + 输出小</strong>，
          碰撞了可以用链地址法、开放寻址去解决；密码哈希要的是<strong>单向 + 抗碰撞 + 定长</strong>，
          <strong>碰撞一次就等于被攻破</strong>——没有「解决」的余地。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">表散列（查找用）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">密码学哈希（安全用）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">输出</td><td class="px-4 py-2 border">尽量小的整数（bucket 下标）</td><td class="px-4 py-2 border">定长摘要（128/160/256 bit）</td></tr>
              <tr><td class="px-4 py-2 border">核心目标</td><td class="px-4 py-2 border">分布均匀、尽量少碰撞、快</td><td class="px-4 py-2 border">单向、抗碰撞、雪崩效应</td></tr>
              <tr><td class="px-4 py-2 border">碰撞态度</td><td class="px-4 py-2 border">允许，用链式/开放寻址解决</td><td class="px-4 py-2 border">绝不允许，碰撞 = 被攻破</td></tr>
              <tr><td class="px-4 py-2 border">速度</td><td class="px-4 py-2 border">越快越好</td><td class="px-4 py-2 border">安全场景故意「慢」（防暴力）</td></tr>
              <tr><td class="px-4 py-2 border">代表</td><td class="px-4 py-2 border">取模/乘法/多项式哈希</td><td class="px-4 py-2 border">MD5 / SHA-1 / SHA-2 / SHA-3</td></tr>
              <tr><td class="px-4 py-2 border">典型用途</td><td class="px-4 py-2 border">哈希表、布隆过滤器、去重</td><td class="px-4 py-2 border">完整性校验、密码、签名、区块链</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="webCryptoCode" title="one_way_hash.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          表散列就像 React 的 <code>key</code>——只要把组件「分到正确的桶里」就行，碰撞只是渲染顺序问题；<br/>
          密码哈希就像 CDN 的 <strong>Subresource Integrity</strong>（<code>&lt;script integrity="sha256-…"&gt;</code>）——它必须「证明内容没被换过」，出了错就是安全事件，没有重试的余地。<br/>
          两者同名，使命天差地别。</p>
        </aside>
      </section>

      <!-- sec-2 MD5 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          MD5：128bit 与 Merkle–Damgård 结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          MD5（Message-Digest 5）由 Ron Rivest 于 1991 年设计，输出 <strong>128 bit</strong>（32 个 hex 字符）。
          它是典型的 <strong>Merkle–Damgård 结构</strong>：把消息切成 512 bit 分块，逐块喂给压缩函数迭代。
        </p>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600 text-sm"><strong>填充 Padding</strong>：消息末尾补「1」，再补「0」直到长度 ≡ 448 (mod 512)，最后 64 bit 写入原始消息长度——保证任意长度都能切成整块，且长度信息参与运算。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600 text-sm"><strong>分块</strong>：把填充后的消息切成 N 个 512 bit 分块 B1…BN。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600 text-sm"><strong>链式压缩</strong>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">H[i] = f(H[i-1], B[i])</code>，H[0] 是固定 IV（4 个 32bit 常量）。压缩函数 f 做 <strong>4 轮、每轮 16 步、共 64 步</strong>，每步用非线性函数 F/G/H/I + 32bit 循环左移 + 常量加法。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600 text-sm"><strong>输出</strong>：最终 H[N] 的 4 个 32bit 状态拼接成 128 bit 摘要。</div>
          </li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="md5ProcessCode" title="merkle_damgard_skeleton.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>MD5 的安全时间线：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>1996</strong> — Hans Dobbertin 发现压缩函数的密码学弱点，MD5 开始走下坡路</span></li>
            <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>2004</strong> — 王小云团队给出真正的 <strong>MD5 碰撞</strong>（两个不同的消息共享同一摘要），128bit 理论碰撞界 2^64 被攻破</span></li>
            <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>2012</strong> — Flame 恶意软件利用伪造的 MD5 证书签名进行传播</span></li>
          </ul>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 安全警示：</strong><br/>
          1. <strong>不要用 MD5 做任何安全相关的事</strong>——密码、数字签名、证书都不行，攻击者可以构造碰撞绕过校验。<br/>
          2. MD5 如今只用于<strong>非安全场景的一致性校验</strong>：确认文件没下载损坏、做缓存 key、ETag 等（防恶意篡改要用 SHA-256）。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          前端构建工具生成的 <code>app.9e107d9d.js</code> 这种「内容哈希文件名」就是 MD5/SHA-256 的用法——它只负责<strong>缓存一致性</strong>（内容变了名字就变，浏览器自然刷新缓存），并不负责防攻击者篡改。<br/>
          当资源被攻击者控制时，内容哈希文件名一样能骗过浏览器——所以「校验」和「防篡改」要分清。</p>
        </aside>
      </section>

      <!-- sec-3 SHA 家族 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          SHA 家族：从 SHA-1 到 SHA-3
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          SHA（Secure Hash Algorithm）是 NIST 标准化的哈希家族，三代的内部结构完全不同：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>SHA-1（160bit）</strong>—— 1995 年 NSA 设计，2017 年 Google + 荷兰 CWI 的 <strong>SHAttered</strong> 攻击给出两个不同 PDF 的碰撞，成本约 11 万美元。Git 早期用 SHA-1，现已逐步迁移到 SHA-256。</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>SHA-2（SHA-256/384/512）</strong>—— 仍是 MD 结构但安全得多，是当下最广泛使用的哈希：TLS 证书、HTTPS、Git、<strong>比特币双重 SHA-256 挖矿</strong>、npm/浏览器 SRI。</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>SHA-3（Keccak）</strong>—— 2015 年 NIST 标准（FIPS 202），用全新的<strong>海绵结构</strong>（absorb 吸收 + squeeze 挤压），输出长度可调（224~512bit），作为 SHA-2 的「备胎」以防万一。</span></li>
        </ul>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">算法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">输出</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内部结构</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">安全状态</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型用途</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">MD5</td><td class="px-4 py-2 border">128 bit</td><td class="px-4 py-2 border">Merkle–Damgård</td><td class="px-4 py-2 border font-mono text-red-600">已攻破 (2004)</td><td class="px-4 py-2 border">非安全一致性校验</td></tr>
              <tr><td class="px-4 py-2 border font-mono">SHA-1</td><td class="px-4 py-2 border">160 bit</td><td class="px-4 py-2 border">Merkle–Damgård</td><td class="px-4 py-2 border font-mono text-amber-600">已攻破 (2017)</td><td class="px-4 py-2 border">历史兼容</td></tr>
              <tr><td class="px-4 py-2 border font-mono">SHA-256</td><td class="px-4 py-2 border">256 bit</td><td class="px-4 py-2 border">Merkle–Damgård</td><td class="px-4 py-2 border font-mono text-emerald-600">安全</td><td class="px-4 py-2 border">TLS / 比特币 / Git / SRI</td></tr>
              <tr><td class="px-4 py-2 border font-mono">SHA-3 (Keccak)</td><td class="px-4 py-2 border">224~512 bit</td><td class="px-4 py-2 border">海绵结构</td><td class="px-4 py-2 border font-mono text-emerald-600">安全</td><td class="px-4 py-2 border">新一代标准备选</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">SHA-3 (Keccak)：海绵结构吸收 + 挤压</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          与前几代完全不同的内部结构：一个固定宽度的状态（速率 r + 容量 c），
          <strong>吸收</strong>阶段逐块把输入 XOR 进 r 区并整体置换 f，
          <strong>挤压</strong>阶段每次置换吐出一段 r 位输出，拼起来就是任意长度的摘要。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 700 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 吸收阶段 -->
            <text x="20" y="20" font-size="11" font-family="monospace" font-weight="bold" fill="#0891b2">吸收 Absorb：输入逐块 XOR 进速率区 r，每轮整体置换 f</text>

            <!-- 输入块 -->
            <rect x="74" y="34" width="48" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="98" y="49" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">M1</text>
            <rect x="222" y="34" width="48" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="246" y="49" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">M2</text>
            <rect x="356" y="34" width="84" height="30" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="398" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">尾块+填充+长度</text>

            <!-- M → XOR 连线 -->
            <line x1="98" y1="64" x2="98" y2="124" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sp-arr)" />
            <line x1="246" y1="64" x2="246" y2="124" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sp-arr)" />
            <line x1="398" y1="64" x2="398" y2="124" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sp-arr)" />

            <!-- XOR 圆圈 -->
            <circle cx="98" cy="138" r="11" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
            <text x="98" y="138" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#334155">⊕</text>
            <circle cx="246" cy="138" r="11" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
            <text x="246" y="138" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#334155">⊕</text>
            <circle cx="398" cy="138" r="11" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
            <text x="398" y="138" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#334155">⊕</text>

            <!-- 状态链：初始 →⊕→ f → state1 →⊕→ f → state2 →⊕→ f → 吸收完成 -->
            <rect x="16" y="150" width="56" height="56" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="44" y="168" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#334155">r|c</text>
            <text x="44" y="186" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">初始 0</text>

            <rect x="116" y="150" width="32" height="56" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="132" y="178" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#6d28d9">f</text>

            <rect x="168" y="150" width="56" height="56" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="196" y="176" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">r|c</text>
            <text x="196" y="194" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">state1</text>

            <rect x="268" y="150" width="32" height="56" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="284" y="178" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#6d28d9">f</text>

            <rect x="320" y="150" width="56" height="56" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="348" y="176" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">r|c</text>
            <text x="348" y="194" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">state2</text>

            <rect x="420" y="150" width="32" height="56" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="436" y="178" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#6d28d9">f</text>

            <rect x="472" y="150" width="80" height="56" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="512" y="176" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#166534">吸收完成</text>
            <text x="512" y="194" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">进入挤压</text>

            <!-- 吸收箭头（y=178） -->
            <line x1="72" y1="178" x2="87" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="109" y1="178" x2="116" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="148" y1="178" x2="168" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="224" y1="178" x2="235" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="257" y1="178" x2="268" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="300" y1="178" x2="320" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="376" y1="178" x2="387" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="409" y1="178" x2="420" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="452" y1="178" x2="472" y2="178" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />

            <!-- 挤压阶段 -->
            <text x="20" y="226" font-size="11" font-family="monospace" font-weight="bold" fill="#0891b2">挤压 Squeeze：反复置换 f，每次吐出速率区 r 的输出，拼接成任意长度摘要</text>
            <rect x="20" y="240" width="32" height="50" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="36" y="265" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#6d28d9">f</text>
            <rect x="76" y="240" width="150" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="151" y="257" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#166534">吐出 r 位 = Z1</text>
            <text x="151" y="273" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">第一段输出</text>
            <rect x="250" y="240" width="32" height="50" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="266" y="265" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#6d28d9">f</text>
            <rect x="306" y="240" width="150" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="381" y="257" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#166534">吐出 r 位 = Z2</text>
            <text x="381" y="273" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">第二段输出</text>
            <rect x="492" y="240" width="140" height="50" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="562" y="257" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">摘要 z = Z1‖Z2‖…</text>
            <text x="562" y="273" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#fff7ed">任意长度定长拼接</text>

            <!-- 挤压箭头（y=265） -->
            <line x1="52" y1="265" x2="76" y2="265" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="226" y1="265" x2="250" y2="265" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="282" y1="265" x2="306" y2="265" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />
            <line x1="456" y1="265" x2="492" y2="265" stroke="#94a3b8" stroke-width="2" marker-end="url(#sp-arr)" />

            <text x="20" y="292" font-size="10" font-family="monospace" fill="#64748b">容量区 c 不直接接触输入 → 天然免疫长度扩展攻击；摘要长度可在 r 粒度上任取（224~512bit）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 3：SHA-3 海绵结构 —— 吸收阶段输入逐块搅进状态，挤压阶段按需吐出 r 位拼成摘要</figcaption>
        </figure>
        <div class="mb-4"><Code language="ts" :code="sha256Code" title="proof_of_work.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>安全场景统一用 <strong>SHA-256</strong>（或 SHA-512/384）；需要可变长度或想「未来可迁移」时用 SHA-3。MD5/SHA-1 一律视为退役。</p>
        </aside>
      </section>

      <!-- sec-4 三大性质 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          密码哈希的三大性质：单向 · 抗碰撞 · 雪崩
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          密码哈希之所以「安全」，靠的是三个硬性质。任何一条被破坏，算法就该退役了。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-1">🔒 单向性</p>
            <p class="text-xs text-slate-600 leading-relaxed">给定摘要 y，求原像 x 在计算上不可行（穷举 2^n）。像<strong>碎纸机</strong>——信息只能前进，不能回头。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-1">💥 抗碰撞</p>
            <p class="text-xs text-slate-600 leading-relaxed">找不到 x≠y 且 h(x)=h(y)。生日攻击给出下限 2^(n/2)——128bit 理论上也要 2^64 次才可能碰上，这就是 MD5 被攻破的根本原因。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-1">🌊 雪崩效应</p>
            <p class="text-xs text-slate-600 leading-relaxed">输入改 1 bit，输出约一半 bit 变化、毫无规律。攻击者无法「微调原文来微调摘要」，只能穷举碰运气。</p>
          </div>
        </div>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">定长输出：|h(M)| 恒定，与 |M| 无关</p>
          <p class="text-xs text-cyan-600 text-center">1 字节的文件和 100GB 的电影，SHA-256 输出都是 256 bit —— 这是它能当「指纹」的前提</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="avalancheCode" title="avalanche_effect.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          单向性就像 Vue 的 <code>computed</code> 缓存——你能从响应式依赖算出值，却没法从缓存值反推是哪个依赖变了；<br/>
          雪崩效应就像代码<strong>混淆器</strong>——改一行源码，整个混淆产物面目全非，让人无法「按图索骥」。</p>
        </aside>
      </section>

      <!-- sec-5 应用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          应用场景：完整性校验 / 密码存储 / 数字签名 / Merkle 树
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">① 文件 / 下载完整性校验</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          下载安装包、依赖、镜像时，发布方给出内容的 SHA-256，你本地算一遍对比——
          对不上就说明<strong>传输损坏或被替换</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="checksumCode" title="file_checksum.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">② 密码存储：加盐 + 慢哈希</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          直接哈希密码是灾难：相同密码 → 相同摘要，查表（彩虹表）秒破；快哈希一天能暴力试几十亿次。
          正确姿势是<strong>每个用户随机加盐 salt</strong>（同密码哈希完全不同）+ <strong>慢哈希</strong>（bcrypt/scrypt/argon2 故意慢到毫秒级）。
        </p>
        <div class="mb-4"><Code language="ts" :code="passwordCode" title="salted_password.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">③ 数字签名：先哈希再加密</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          公钥加密很慢，不可能对整份文档加密。标准做法是<strong>先哈希成定长摘要，再对摘要做签名</strong>——
          摘要足够代表整份内容，定长又让签名运算可控。证书、HTTPS、代码签名都走这条路。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">④ Merkle 树：区块链 / 版本控制的哈希聚合</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          把 N 条数据的哈希作为叶子，两两拼接再哈希向上聚合，得到唯一的 <strong>Merkle root</strong>。
          任何叶子变了根就变；而轻节点只需 root + 一条「兄弟路径」就能证明某条数据在树里——区块链 SPV、Git 的 commit 树都靠它。
        </p>
        <div class="mb-4"><Code language="ts" :code="merkleCode" title="merkle_tree.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">⑤ HMAC：哈希 + 共享密钥 = 消息认证</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          前面 ①~④ 都是「没有密钥的哈希」——任何人都能算。HMAC（Hash-based Message Authentication Code）
          在哈希里混入<strong>共享密钥</strong>，让「算得出标签」成为一种<strong>身份证明</strong>：
          只有持有密钥的人能签名/验签。JWT、TLS 握手、云厂商接口鉴权都靠它。
        </p>
        <figure class="mb-3">
          <svg viewBox="0 0 700 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="hm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 内层哈希 -->
            <text x="20" y="22" font-size="11" font-family="monospace" fill="#64748b">内层：内摘要 = SHA-256( (K⊕ipad) ‖ 消息 M )</text>
            <rect x="20" y="34" width="120" height="40" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="80" y="46" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#334155">K ⊕ ipad</text>
            <text x="80" y="60" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">ipad=0x36 填满块</text>
            <text x="150" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#94a3b8">‖</text>
            <rect x="166" y="34" width="100" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="216" y="54" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">消息 M</text>
            <line x1="266" y1="54" x2="286" y2="54" stroke="#94a3b8" stroke-width="2" marker-end="url(#hm-arr)" />
            <rect x="290" y="34" width="100" height="40" rx="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="340" y="54" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#6d28d9">SHA-256</text>
            <line x1="390" y1="54" x2="410" y2="54" stroke="#94a3b8" stroke-width="2" marker-end="url(#hm-arr)" />
            <rect x="414" y="34" width="90" height="40" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="459" y="54" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#334155">内摘要</text>

            <!-- 外层哈希 -->
            <text x="20" y="118" font-size="11" font-family="monospace" fill="#64748b">外层：最终标签 = SHA-256( (K⊕opad) ‖ 内摘要 )</text>
            <rect x="20" y="130" width="120" height="40" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="80" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#334155">K ⊕ opad</text>
            <text x="80" y="156" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">opad=0x5c 填满块</text>
            <text x="150" y="150" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#94a3b8">‖</text>
            <rect x="166" y="130" width="90" height="40" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="211" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#334155">内摘要</text>
            <line x1="256" y1="150" x2="286" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#hm-arr)" />
            <rect x="290" y="130" width="100" height="40" rx="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5" />
            <text x="340" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#6d28d9">SHA-256</text>
            <line x1="390" y1="150" x2="410" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#hm-arr)" />
            <rect x="414" y="130" width="120" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="474" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#166534">HMAC 标签</text>

            <!-- 虚线提示：外层用内摘要做输入 -->
            <line x1="340" y1="74" x2="459" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#hm-arr)" />
            <text x="356" y="96" font-size="10" font-family="monospace" fill="#64748b">把内摘要接上 opad 再哈希</text>

            <text x="20" y="194" font-size="10" font-family="monospace" fill="#64748b">密钥从未以明文进消息 → 攻击者没有密钥就伪造不了标签；两次包裹又堵死了长度扩展攻击</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 4：HMAC 两次哈希 —— 密钥分两路包裹，最终标签既证明内容完整、又证明对方持有密钥</figcaption>
        </figure>
        <div class="mb-4"><Code language="ts" :code="hmacCode" title="hmac_auth.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 安全决策清单：</strong><br/>
          1. <strong>MD5 / SHA-1 → 任何安全场景都不用</strong>（密码、签名、证书、防篡改校验）。<br/>
          2. 完整性校验 → <strong>SHA-256</strong>（对不上就说明被改动/损坏）。<br/>
          3. 密码存储 → <strong>bcrypt / scrypt / argon2id</strong>（加盐 + 慢哈希），绝对不要自研。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话选型：</strong>「防损坏」用 MD5 图省事也可以，但「防篡改/防碰撞」一律 SHA-256；「存密码」交给 bcrypt/argon2——<strong>慢，就是密码哈希的最大优点</strong>。</p>
        </aside>
      </section>

      <!-- sec-6 攻击与对策 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🔓</span>
          攻击与对策：生日攻击 · 长度扩展攻击 · HMAC
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前面的性质讲「哈希该有多强」，这一节讲「敌人怎么打、我们怎么防」。
          理解这两场攻击，才能真正明白 MD5/SHA-1 为何退役、HMAC 为何存在、比特币为何双重哈希。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">① 生日攻击：为什么 128bit 摘要不够安全</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          找两个不同的 x、y 使 h(x)=h(y)（碰撞），比找一个给定摘要的原像容易得多——
          因为碰撞是「两两配对」的问题：N 个哈希里约有 N²/2 对，随便挑一对就能撞上。
          生日悖论给出结论：<strong>碰撞难度只有 2^(n/2)，不是 2^n</strong>。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-xs font-semibold text-slate-700 mb-2">📐 数学直觉：难度 = 2^(n/2)</p>
            <p class="text-xs text-slate-600 leading-relaxed font-mono">
              MD5　  128 bit → 2^64 次（2004 王小云团队突破）<br/>
              SHA-1　160 bit → 2^80 次（2017 SHAttered 突破）<br/>
              SHA-256 256 bit → 2^128 次（当今不可行）
            </p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p class="text-xs font-semibold text-amber-700 mb-2">🛡️ 结论</p>
            <p class="text-xs text-amber-800 leading-relaxed">
              「抗碰撞」要求的摘要下限是 <strong>256 bit</strong>（对应 128 bit 抗碰撞强度）。
              这正是 MD5(128)/SHA-1(160) 在安全场景必须退役，而 SHA-256/512、SHA-3 才是现代选择的原因。
            </p>
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">② 长度扩展攻击：MD 结构的软肋 → 催生 HMAC 与双重哈希</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          基于 MD 结构的 MD5/SHA-1/SHA-2 有个隐蔽问题：已知 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">H(K‖M)</code>，
          即使不知道密钥 K，攻击者也能算出 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">H(K‖M‖填充‖追加内容)</code>——
          因为输出的 H 就是下一块的「初始状态」。若系统拿 <code>H(K‖M)</code> 当认证标签，攻击者就能在你签过名的消息后面<strong>追加内容</strong>并伪造出合法标签。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对策</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">思路</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">代表</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border"><strong>HMAC</strong></td><td class="px-4 py-2 border">密钥分两次（ipad/opad）包裹，不做前缀拼接，杜绝追加</td><td class="px-4 py-2 border">JWT / TLS / API 签名</td></tr>
              <tr><td class="px-4 py-2 border"><strong>双重哈希</strong></td><td class="px-4 py-2 border">hash(hash(x))，外层哈希让内层摘要不再「可续写」</td><td class="px-4 py-2 border">比特币 sha256(sha256(区块头))</td></tr>
              <tr><td class="px-4 py-2 border"><strong>海绵结构</strong></td><td class="px-4 py-2 border">容量区 c 对攻击者不可见，天然免疫长度扩展</td><td class="px-4 py-2 border">SHA-3 (Keccak)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          长度扩展攻击就像「在别人签好名的合同复印件后面补一行」——签名没被伪造，合同内容却被改了。<br/>
          HMAC 则像「把合同装进只有双方知道密码的信封再签名」——你没法在不拆信封的情况下改动里面的内容。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：雪崩效应 + 定长摘要挤出
        </h2>

        <!-- ---- 动画 1：雪崩效应 ---- -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">① 雪崩效应：改 1 个字符，SHA-256 摘要面目全非</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          两段输入几乎相同（只把末尾的 <code>g</code> 改成 <code>G</code>），观察它们的 SHA-256 摘要逐位对比——
          64 位 hex 中绝大多数都不同。这就是密码哈希「不可预测」的来源。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 摘要: SHA-256 · 64 hex</span>
          <span :class="['px-2 py-1 rounded-full font-mono', modified ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500']">🔴 不同位: {{ diffCount }} / 64</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 逐位对比 O(n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="doModify" :disabled="busy || modified"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">✏️ 修改一个字符 (g→G)</button>
          <button @click="doRevert" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ 复原</button>
          <span class="text-xs text-slate-500 ml-auto bg-slate-100 px-2 py-1 rounded-full font-mono min-w-[60px] text-center">{{ status1 }}</span>
        </div>
        <div ref="box1" class="w-full relative" :style="{height: H1+'px'}">
          <v-stage :config="{width: W, height: H1}">
            <v-layer>
              <v-text :config="{ x: 16, y: 14, text: '输入 A: ' + (modified ? MSG_B : MSG_A), fontSize: 11, fontFamily: 'monospace', fill: C.muted }" />
              <v-text :config="{ x: 16, y: 34, text: 'SHA-256(A) =', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted }" />
              <v-text :config="{ x: 16, y: 50, text: SHA_A, fontSize: hexFs, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text }" />
              <v-text :config="{ x: 16, y: 82, text: '输入 B: ' + (modified ? MSG_B : MSG_A), fontSize: 11, fontFamily: 'monospace', fill: modified ? C.orange : C.muted }" />
              <v-text :config="{ x: 16, y: 102, text: 'SHA-256(B) =', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted }" />
              <v-text :config="{ x: 16, y: 118, text: rowBhex, fontSize: hexFs, fontFamily: 'monospace', fontStyle: 'bold', fill: modified ? C.red : C.text }" />
              <v-text :config="{ x: 16, y: 162, text: diffNote, fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: diffCount > 0 ? C.red : C.green }" />
              <!-- 扫描光标 -->
              <v-rect v-if="scanStep > 0 && scanStep <= SHA_A.length" :config="{ x: xPos(scanStep - 1) - 1.5, y: 46, width: hexCw + 3, height: 78, fill: C.orange, opacity: 0.16, cornerRadius: 3 }" />
              <!-- 不同位红点 -->
              <v-circle v-for="i in visibleDiffs" :key="'dot' + i" :config="{ x: xPos(i) + hexCw / 2, y: 140, radius: 2.5, fill: C.red }" />
            </v-layer>
          </v-stage>
        </div>

        <!-- ---- 动画 2：定长摘要挤出 ---- -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-6">② 定长摘要：同一输入，不同算法长度不同但各自固定</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          对同一段 43 字符的输入，分别跑 MD5 / SHA-1 / SHA-256，观察摘要被<strong>逐个挤出</strong>——无论输入多长，
          输出长度总是固定：128 bit = 32 hex、160 bit = 40 hex、256 bit = 64 hex。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 输出: {{ algos[curAlgo].bits }} bit = {{ algos[curAlgo].hex.length }} hex</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 输入 43 字符（任意长度）→ 定长输出</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button v-for="k in algoKeys" :key="k" @click="doExtrude(k)" :disabled="busy"
            :class="[algoBtnCls[k], 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                     'active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">{{ algos[k].label }}</button>
          <button @click="doExtrudeReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
          <span class="text-xs text-slate-500 ml-auto bg-slate-100 px-2 py-1 rounded-full font-mono min-w-[60px] text-center">{{ status2 }}</span>
        </div>
        <div ref="box2" class="w-full relative" :style="{height: H2+'px'}">
          <v-stage :config="{width: W, height: H2}">
            <v-layer>
              <v-text :config="{ x: 16, y: 14, text: '输入消息（43 字符，任意长度）: ' + MSG_A, fontSize: 11, fontFamily: 'monospace', fill: C.muted }" />
              <v-text :config="{ x: 16, y: 36, text: algos[curAlgo].label + ' 摘要（定长输出）:', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text }" />
              <v-text v-for="(ch, i) in extrudeHex" :key="'hex' + curAlgo + i" :config="exCfg(i, ch)" />
              <v-text :config="{ x: 16, y: 104, text: '输入任意长度 → 输出恒定 ' + algos[curAlgo].bits + ' bit = ' + algos[curAlgo].hex.length + ' 个 hex 字符', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: C.green }" />
              <v-text :config="{ x: 16, y: 128, text: '改 1 个字符 → 摘要整体翻新（见上方雪崩效应）', fontSize: 11, fontFamily: 'monospace', fill: C.muted }" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- sec-6 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两类哈希是不同物种</strong>：表散列要「均匀+快+输出小」，密码哈希要「单向+抗碰撞+定长」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>MD5</strong>：128bit，Merkle–Damgård 结构（填充→分块→4 轮压缩），2004 年被碰撞攻破，只用于非安全校验</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SHA 家族</strong>：SHA-1(160bit, 已攻破) → SHA-2(256bit, 主流) → SHA-3(Keccak, 海绵结构)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三大性质</strong>：单向性、抗碰撞、雪崩效应——任何一条失效算法即退役</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用</strong>：完整性校验用 SHA-256；密码存储用加盐 + bcrypt/argon2 慢哈希；签名先哈希再加密；区块链用 Merkle 树聚合</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>铁律</strong>：MD5/SHA-1 绝不用于安全场景，<strong>慢就是密码哈希的优点</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SHA-3</strong>：海绵结构（吸收 + 挤压），容量区不可见 → 天然免疫长度扩展</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两场攻击</strong>：生日攻击 → 摘要需 ≥256bit；长度扩展攻击 → 催生 HMAC 与比特币双重哈希</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-3-string-hash" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：字符串哈希</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-2-collision/dsa-3-2-1-chaining" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：冲突处理 · 链地址法 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H1 = ref(190), H2 = ref(150), W = ref(700)
const busy = ref(false)
const status1 = ref(''), status2 = ref('')
const box1 = ref<HTMLDivElement>(), box2 = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

// ---- ① 雪崩效应：SHA-256 摘要逐位对比 ----
const MSG_A = 'The quick brown fox jumps over the lazy dog'
const MSG_B = 'The quick brown fox jumps over the lazy doG'   // 只改 g → G
const SHA_A = 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592'
const SHA_B = 'caa7ba01dcc2d625c26af46b9bbab56c066689192a7517f6b49f8ee3fe0cdbda'

const modified = ref(false)
const scanStep = ref(0)
const diffs = reactive<number[]>([])
const diffCount = computed(() => diffs.length)
const rowBhex = computed(() => modified.value ? SHA_B : SHA_A)
const visibleDiffs = computed(() => diffs.filter(i => i < scanStep.value))
const hexFs = ref(12), hexCw = ref(7.44)
const diffNote = computed(() =>
  modified.value
    ? `只改了 1 个字符（g→G）→ 摘要 ${diffCount.value}/64 位 hex 不同（雪崩效应）`
    : '两段输入完全相同 → 摘要逐位一致（确定性）'
)
function xPos(i: number) { return 16 + i * hexCw.value }
function layoutHex() {
  hexFs.value = Math.max(10, Math.min(13, (W.value - 32) / SHA_A.length / 0.62))
  hexCw.value = hexFs.value * 0.62
}
function initHex() { modified.value = false; scanStep.value = 0; diffs.length = 0; layoutHex() }

async function doModify() {
  act(status1, '雪崩效应扫描中…', async () => {
    modified.value = true
    scanStep.value = 0
    diffs.length = 0
    for (let i = 0; i < SHA_A.length; i++) {
      scanStep.value = i + 1
      if (SHA_A[i] !== SHA_B[i]) diffs.push(i)
      await d(32)
    }
    status1.value = `改动完成：${diffCount.value} / 64 位 hex 不同`
  })
}
function doRevert() { initHex(); status1.value = '' }

// ---- ② 定长摘要挤出 ----
const algos = {
  md5:    { label: 'MD5',    bits: 128, hex: '9e107d9d372bb6826bd81d3542a419d6' },
  sha1:   { label: 'SHA-1',  bits: 160, hex: '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12' },
  sha256: { label: 'SHA-256', bits: 256, hex: 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592' },
}
type AlgoKey = keyof typeof algos
const algoKeys = Object.keys(algos) as AlgoKey[]
const algoBtnCls: Record<AlgoKey, string> = {
  md5:    'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm',
  sha1:   'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm',
  sha256: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm',
}
const curAlgo = ref<AlgoKey>('sha256')
const revealed = ref(0)
const extrudeHex = computed(() => algos[curAlgo.value].hex)
const exFs = ref(12), exCw = ref(7.44)
function exCfg(i: number, ch: string) {
  const on = i < revealed.value
  return {
    x: 16 + i * exCw.value, y: 60, width: exCw.value + 2, height: 18,
    text: ch, fontSize: exFs.value, fontFamily: 'monospace', fontStyle: 'bold',
    fill: on ? C.cyan : C.ghost, opacity: on ? 1 : 0.45, align: 'center', verticalAlign: 'middle',
  }
}
function layoutEx() {
  exFs.value = Math.max(10, Math.min(13, (W.value - 32) / extrudeHex.value.length / 0.62))
  exCw.value = exFs.value * 0.62
}
function initEx() { curAlgo.value = 'sha256'; revealed.value = 0; layoutEx() }

async function doExtrude(k: AlgoKey) {
  act(status2, `计算 ${algos[k].label}…`, async () => {
    curAlgo.value = k
    revealed.value = 0
    layoutEx()
    for (let i = 0; i < algos[k].hex.length; i++) {
      revealed.value = i + 1
      await d(48)
    }
    status2.value = `${algos[k].label}: ${algos[k].hex.length} hex = ${algos[k].bits} bit（定长）`
  })
}
function doExtrudeReset() { initEx(); status2.value = '' }

// ---- 通用工具 ----
async function act(sr: { value: string }, msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; sr.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; sr.value = '' }
}

let ro1: ResizeObserver | null = null, ro2: ResizeObserver | null = null
onMounted(() => {
  initHex(); initEx()
  if (box1.value) {
    W.value = box1.value.clientWidth; layoutHex()
    ro1 = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layoutHex() } })
    ro1.observe(box1.value)
  }
  if (box2.value) {
    W.value = box2.value.clientWidth; layoutEx()
    ro2 = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layoutEx() } })
    ro2.observe(box2.value)
  }
})
onUnmounted(() => { ro1?.disconnect(); ro2?.disconnect() })

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "两类哈希" },
  { id: "sec-2", name: "MD5 与 MD 结构" },
  { id: "sec-3", name: "SHA 家族" },
  { id: "sec-4", name: "三大性质" },
  { id: "sec-5", name: "应用场景" },
  { id: "sec-6", name: "🔓 攻击与对策" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 代码示例 =====
const webCryptoCode = `// ─── 浏览器 Web Crypto / Node crypto：内置的一行式哈希 ───
// 同一输入永远得到同一摘要；反向（从摘要还原输入）计算上不可行

import { createHash } from 'node:crypto'

const digest = createHash('sha256').update('hello').digest('hex')
console.log(digest)
// 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
// ↑ 64 个 hex 字符 = 256 bit，定长

// 换一个字母：
const d2 = createHash('sha256').update('hellp').digest('hex')
console.log(d2)
// 685078…（几乎每一个字符都变了 —— 雪崩效应）

// 浏览器侧（HTTPS / localhost 可用，Promise 风格）：
// const buf = await crypto.subtle.digest('SHA-256',
//   new TextEncoder().encode('hello'))
// const hex = [...new Uint8Array(buf)]
//   .map(b => b.toString(16).padStart(2, '0')).join('')

// 关键认知：
// 1. 摘要长度与输入长度无关：'hello' 和整本书都是 64 hex
// 2. 摘要不可逆：给定 2cf24dba…，无法算回 'hello'（除非穷举 2^256）
// 3. 相同输入 → 相同输出（确定性），这是校验的基础`

const md5ProcessCode = `// ─── MD5 的 Merkle–Damgård 骨架（概念版，非完整实现）───
// 目标：把任意长度消息压成固定 128 bit
// 流程：填充 → 分块 → 链式压缩 → 摘要

const M = 'abc'                     // 假设的输入消息
const BLOCK = 512                    // 每块 512 bit
const OUT = 128                      // 输出 128 bit

// 1) 填充（Padding）：补到 512 的倍数
//    规则：末尾补 1 个 '1'，再补 '0'，最后 64 bit 记原始消息长度
//    'abc' (24 bit) → 补到 512 bit：
//      'abc' + '1' + 488 个 '0' + 原长 24（64 bit）
function pad(msg: Uint8Array): Uint8Array {
  // ...长度对齐：len + 1 + k ≡ 448 (mod 512)，最后 8 字节写长度
  return msg
}

// 2) 分块：切成 N 个 512 bit 块
const blocks: Uint8Array[] = [/* 每块 64 字节 */]

// 3) 压缩函数 f：MD5 有 4 轮、每轮 16 步，共 64 步
//    每步做一次非线性运算 + 32bit 循环左移 + 加常量
function f(h: number[], block: Uint8Array): number[] {
  // 4 轮非线性函数：
  //   F(x,y,z) = (x & y) | (~x & z)    第 1 轮
  //   G(x,y,z) = (x & z) | (y & ~z)    第 2 轮
  //   H(x,y,z) = x ^ y ^ z             第 3 轮
  //   I(x,y,z) = y ^ (x | ~z)          第 4 轮
  // 每轮 16 步，共 64 步，每步改写一个 32bit 寄存器
  return h
}

// 4) MD 迭代：H[i] = f(H[i-1], B[i])，H[0] 是固定 IV
let H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]  // IV
for (const b of blocks) H = f(H, b)

// 5) 输出：4 个 32bit 状态拼接 = 128 bit = 32 hex
console.log(H.map(x => x.toString(16).padStart(8, '0')).join(''))`

const sha256Code = `// ─── SHA-256 的杀手应用：工作量证明 (Proof of Work) ───
import { createHash } from 'node:crypto'

// 比特币挖矿 = 找一个 nonce，使 sha256(sha256(区块头 + nonce))
// 的前导 0 达到难度要求。双重 SHA-256（防长度扩展攻击）

function mine(header: string, difficulty = 4): { nonce: number; hash: string } {
  const prefix = '0'.repeat(difficulty)
  for (let nonce = 0; ; nonce++) {
    const h = createHash('sha256')
      .update(createHash('sha256').update(header + nonce).digest())
      .digest('hex')
    if (h.startsWith(prefix)) return { nonce, hash: h }
  }
}

const { nonce, hash } = mine('block#1 data...')
console.log(\`nonce=\${nonce}, hash=\${hash}\`)
// 输出前 4 位是 0 的哈希。验证者只需重算一次 O(1)，
// 而矿工平均要试 16^4 = 65536 次 ——「易验证、难求解」
// 这正是哈希单向性的商业价值`

const checksumCode = `// ─── 文件/下载完整性校验 ───
// 场景：下载一个安装包/依赖，如何确认它没被篡改或传输损坏？
// 方案：发布方给出文件内容的 SHA-256（checksum），下载后本地算一遍对比

import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

function sha256File(path: string): string {
  const buf = readFileSync(path)          // 读整个文件
  return createHash('sha256').update(buf).digest('hex')
}

const local = sha256File('installer.bin')
const official = 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592'
console.log(local === official ? '✅ 文件完好' : '❌ 文件被篡改或下载不完整')

// 为什么用 SHA-256 而不是 MD5？
// MD5/SHA-1 已被碰撞攻破：攻击者可以构造「内容不同但摘要相同」的文件，
// 把恶意文件伪装成官方文件通过校验 —— 完整性校验也要防恶意篡改。

// 实际下载页里常见的写法（Debian/Ubuntu/Node.js 官方都提供）：
//   sha256sum ubuntu.iso
//   <sha256 值>  ubuntu.iso`

const passwordCode = `// ─── 密码存储：为什么「直接哈希密码」是错的 ───
import { createHash, randomBytes, pbkdf2Sync } from 'node:crypto'

// ❌ 反模式 1：直接存明文 —— 数据库一旦泄露，所有账号直接暴露

// ❌ 反模式 2：直接哈希（MD5/SHA-256）
// 1) 查表攻击：同样的密码 → 同样的哈希，用彩虹表秒破
//    md5('password123') 的哈希在公开彩虹表里早就有
// 2) 快哈希一天能算几十亿次，暴力破解太容易
function badHash(pw: string) {
  return createHash('md5').update(pw).digest('hex')   // 千万别这么干
}

// ✅ 正确做法：每个用户随机加盐 + 慢哈希
// 1. salt：每个用户一个随机值，使相同密码的哈希完全不同
// 2. 慢哈希：PBKDF2/bcrypt/scrypt/argon2 故意慢（ms 级），让暴力破解无利可图
function goodHash(pw: string): { salt: string; hash: string } {
  const salt = randomBytes(16).toString('hex')        // 随机盐
  const hash = pbkdf2Sync(pw, salt, 100_000, 32, 'sha256').toString('hex')
  return { salt, hash }                                // 数据库同时存 salt + hash
}

// 校验：用存储的 salt 重算，与存储的 hash 比对
function verify(pw: string, salt: string, hash: string): boolean {
  const h = pbkdf2Sync(pw, salt, 100_000, 32, 'sha256').toString('hex')
  return h === hash
}

// 现代标准：argon2id（内存+CPU 双消耗，抗 GPU）> scrypt > bcrypt > PBKDF2`

const avalancheCode = `// ─── 雪崩效应：改 1 个字符，摘要面目全非 ───
import { createHash } from 'node:crypto'

const a = 'The quick brown fox jumps over the lazy dog'
const b = 'The quick brown fox jumps over the lazy doG'   // 只改 g → G

const ha = createHash('sha256').update(a).digest('hex')
const hb = createHash('sha256').update(b).digest('hex')

console.log('A:', ha)
console.log('B:', hb)

// 数一数有多少位不同：
let diff = 0
for (let i = 0; i < ha.length; i++) if (ha[i] !== hb[i]) diff++
console.log(\`不同位数: \${diff} / \${ha.length} hex\`)
// 不同位数: 60 / 64 hex —— 只改 1 个字符，近 94% 的位都变了！

// 为什么重要？
// 攻击者无法通过「微调原文」来微调摘要——想伪造摘要只能穷举碰运气，
// 这就堵死了「构造碰撞」之外的所有捷径，保证哈希不可预测。`

const merkleCode = `// ─── Merkle 树：区块链/版本控制的哈希聚合 ───
// 叶子 = 每条数据的哈希，父节点 = 左右子哈希拼接后再哈希
// 根 = Merkle root：只要任何一个叶子变了，根就变

import { createHash } from 'node:crypto'

const sha = (s: string) => createHash('sha256').update(s).digest('hex')

// 4 笔交易
const tx = ['tx1', 'tx2', 'tx3', 'tx4']
const leaves = tx.map(sha)                       // 叶子：各交易哈希

// 自底向上合并：哈希(左||右)
const h01 = sha(leaves[0] + leaves[1])
const h23 = sha(leaves[2] + leaves[3])
const root = sha(h01 + h23)                      // Merkle root

console.log('root:', root)
// 任何一笔交易被篡改 → 对应叶子变 → 一路向上 → root 变
// 因此只需存一个 root，就能校验整棵树的完整性

// 轻节点验证（SPV）：只存 root + 一条「兄弟路径」
// 想证明 tx2 在树里，给出 leaves[1] 和 h01、h23 三个值即可，
// 不必下载全部交易 —— 这就是区块链轻钱包的原理
// 对比：Git 的 commit 也把整棵树哈希进 commit hash（内容寻址）`

const hmacCode = `// ─── HMAC：哈希 + 共享密钥 = 消息认证码 ───
// 场景：两个系统共享密钥 K，A 给 B 发消息，B 要同时确认
//   1) 消息没被篡改   2) 确实来自 A（而非第三方）
// 纯哈希做不到（任何人都能算）；HMAC = 带密钥的哈希

import { createHmac } from 'node:crypto'

const KEY = 'shared-secret-123'
const msg = '转账 100 元给 Alice'

// 签名：密钥参与哈希 → 得到认证标签
const tag = createHmac('sha256', KEY).update(msg).digest('hex')

// 验证：接收方用同一 KEY 重算，一致才接受
const ok = createHmac('sha256', KEY).update(msg).digest('hex') === tag
console.log(ok ? '✅ 消息完整且来自持有密钥的一方' : '❌ 被篡改或伪造')

// HMAC 内部（两次哈希，杜绝长度扩展攻击）：
//   ipad = 0x36 填满块长；opad = 0x5c 填满块长
//   内 = SHA256( (K⊕ipad) ‖ M )        ← 密钥不以明文前缀出现
//   外 = SHA256( (K⊕opad) ‖ 内 )       ← 最终标签
// 两层包裹后，攻击者既没有密钥、又无法对已签名消息做长度扩展

// 真实用途：JWT (HS256)、API 请求签名、TLS 握手、云厂商接口鉴权`
</script>
