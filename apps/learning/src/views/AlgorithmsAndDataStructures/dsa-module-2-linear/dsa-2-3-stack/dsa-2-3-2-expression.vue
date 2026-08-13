<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧮 表达式求值：中缀/后缀/前缀转换</h1>
          <p class="text-sm text-slate-500 mt-1">编译器/计算器的核心——栈在表达式处理中的应用</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-3-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：中缀 → 后缀 → 求值
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          表达式求值分两步：先用 <strong>Shunting-yard</strong> 把中缀 <code>3 + 4 × 2</code> 转成无括号的后缀 <code>3 4 2 × +</code>（运算符后置），再<strong>一个数字栈</strong>单遍扫描求值——数字入栈，遇运算符弹两个算一个压回。
        </p>

        <!-- 结构图：中缀转后缀 -->
        <figure class="mb-6">
          <svg viewBox="0 0 560 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="28" font-size="12" font-family="monospace" fill="#64748b">中缀 infix：运算符在操作数中间，需括号/优先级</text>
            <!-- 中缀行 -->
            <rect x="40" y="44" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="66" y="64" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="104" y="44" width="52" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="130" y="64" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">+</text>
            <rect x="168" y="44" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="194" y="64" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="232" y="44" width="52" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="258" y="64" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">×</text>
            <rect x="296" y="44" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="322" y="64" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <!-- 转换箭头 -->
            <line x1="280" y1="96" x2="280" y2="128" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-a)" />
            <text x="296" y="116" font-size="11" font-family="monospace" fill="#64748b">Shunting-yard 转后缀</text>
            <!-- 后缀行 -->
            <text x="16" y="168" font-size="12" font-family="monospace" fill="#64748b">后缀 postfix：运算符后置，无括号无优先级</text>
            <rect x="40" y="176" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="66" y="196" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="104" y="176" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="130" y="196" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="168" y="176" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="194" y="196" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="232" y="176" width="52" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="258" y="196" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">×</text>
            <rect x="296" y="176" width="52" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="322" y="196" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">+</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：中缀转后缀——橙框为运算符，高优先级 × 先落到操作数后，+ 最后</figcaption>
        </figure>

        <!-- 操作示意图：后缀求值 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：后缀求值 —— 数字入栈，遇 × 弹两个算一个压回</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">读到 ×（弹出栈顶 4、2）</p>
            <svg viewBox="0 0 220 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M 60 60 L 60 180 L 160 180 L 160 60" fill="none" stroke="#94a3b8" stroke-width="2" />
              <rect x="70" y="136" width="80" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="110" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="70" y="98" width="80" height="36" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
              <text x="110" y="116" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="70" y="60" width="80" height="36" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
              <text x="110" y="78" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="110" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#f59e0b">token: ×</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">4 × 2 = 8 压回（新栈顶 = 8）</p>
            <svg viewBox="0 0 220 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M 60 60 L 60 180 L 160 180 L 160 60" fill="none" stroke="#94a3b8" stroke-width="2" />
              <rect x="70" y="136" width="80" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="110" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="70" y="98" width="80" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="110" y="116" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="110" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#16a34a">4 × 2 = 8</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">弹出 4、2 计算 8 压回，继续读下一个 token +</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 三种表达式 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          三种表达式：为什么需要后缀表达式？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          表达式有三种书写形式：<strong>中缀（infix）</strong>、<strong>后缀（postfix / RPN）</strong>、<strong>前缀（prefix / Polish notation）</strong>。
          人类习惯中缀（3 + 4 × 2），但计算机更喜欢后缀（3 4 2 × +）——它不需要括号，也不需要优先级规则，只需一个栈就能求值。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold">示例</th><th class="px-4 py-2 border border-slate-200 font-semibold">特点</th><th class="px-4 py-2 border border-slate-200 font-semibold">求值难度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border"><strong>中缀 (Infix)</strong></td><td class="px-4 py-2 border font-mono">3 + 4 × 2</td><td class="px-4 py-2 border">运算符在操作数中间，需括号和优先级</td><td class="px-4 py-2 border text-red-600">最难（需同时处理优先级、括号、结合性）</td></tr>
              <tr><td class="px-4 py-2 border"><strong>后缀 (Postfix / RPN)</strong></td><td class="px-4 py-2 border font-mono">3 4 2 × +</td><td class="px-4 py-2 border">运算符在操作数之后，<strong>无括号无优先级</strong></td><td class="px-4 py-2 border text-emerald-600">最简单（O(n) 单遍扫描）</td></tr>
              <tr><td class="px-4 py-2 border"><strong>前缀 (Prefix / Polish)</strong></td><td class="px-4 py-2 border font-mono">+ 3 × 4 2</td><td class="px-4 py-2 border">运算符在操作数之前，无括号无优先级</td><td class="px-4 py-2 border text-amber-600">中等（从右往左扫描）</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          后缀表达式就像 <strong>JSON 序列化</strong>——把有嵌套结构（括号）和优先级规则的东西转换成扁平的、可直接顺序处理的形式。
          JS 引擎解析 <code>3 + 4 * 2</code> 时内部也会做类似的"转后缀"操作来生成 AST（抽象语法树）。
          Babel、ESLint 等工具解析代码也是先 tokenize 再按优先级构建树——本质一样。
          </p>
        </aside>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>运算符优先级表（中缀转后缀必须知道）：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">优先级</th><th class="px-4 py-2 border border-slate-200 font-semibold">运算符</th><th class="px-4 py-2 border border-slate-200 font-semibold">结合性</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">1 (最低)</td><td class="px-4 py-2 border font-mono">+, -</td><td class="px-4 py-2 border">左结合</td><td class="px-4 py-2 border">加减</td></tr>
              <tr><td class="px-4 py-2 border">2</td><td class="px-4 py-2 border font-mono">*, /</td><td class="px-4 py-2 border">左结合</td><td class="px-4 py-2 border">乘除</td></tr>
              <tr><td class="px-4 py-2 border">3</td><td class="px-4 py-2 border font-mono">^（幂）</td><td class="px-4 py-2 border text-amber-600"><strong>右结合</strong></td><td class="px-4 py-2 border">2^3^2 = 2^(3^2)，不是 (2^3)^2</td></tr>
              <tr><td class="px-4 py-2 border">4 (最高)</td><td class="px-4 py-2 border font-mono">( )</td><td class="px-4 py-2 border">—</td><td class="px-4 py-2 border">括号改变优先级</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 核心思想：</strong><br/>
          整个表达式求值领域只有两件事：<br/>
          ① <strong>中缀转后缀</strong>（Shunting-yard 算法）—— 用运算符栈处理优先级，把人类表达式变成计算机表达式<br/>
          ② <strong>后缀求值</strong> —— 用操作数栈计算结果，遇到数字就压栈，遇到运算符就弹出两个操作数计算后压回去<br/>
          分开处理的好处是<strong>关注点分离</strong>——转换只关心语法，求值只关心计算。
          </p>
        </aside>
      </section>

      <!-- 2. Valid Parentheses -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          有效括号（#20）—— 栈的最基本应用
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Valid Parentheses（#20）</strong> 是每个程序员都应该会的题。用栈匹配括号，"最近未匹配的左括号必须与当前右括号配对"——这就是 LIFO 最自然的场景。
        </p>

        <div class="mb-4"><Code language="ts" :code="validParenCode" title="valid_parentheses.ts" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          用 Map 存储括号配对关系比 switch/if-else 清晰得多。遇到左括号 push 对应的右括号，遇到右括号 pop 比较——<strong>代码极简且不易出错</strong>。
          </p>
        </aside>
      </section>

      <!-- 3. Infix to Postfix -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          中缀转后缀：Shunting-yard 算法详解
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Shunting-yard 算法</strong>（调车场算法，由 Dijkstra 发明）是中缀转后缀的标准方法。
          核心思想：用一个<strong>运算符栈</strong>暂存运算符，按优先级决定何时弹出。
        </p>

        <div class="mb-4"><Code language="ts" :code="infixToPostfixCode" title="infix_to_postfix.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>算法规则总结（四句话记住）：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>遇到数字</strong> → 直接输出</li>
          <li><strong>遇到左括号</strong> → 直接入栈</li>
          <li><strong>遇到右括号</strong> → 弹出栈顶输出，直到遇到左括号（左括号也弹出但不输出）</li>
          <li><strong>遇到运算符</strong> → 把栈中 <strong>优先级 ≥ 当前运算符</strong> 的运算符全部弹出并输出；然后将当前运算符入栈</li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键细节：</strong><br/>
          ① 第4步中，栈顶运算符优先级 <strong>≥</strong>（大于等于）当前运算符才弹出。这是左结合性的体现——同优先级的运算符从左往右算，所以左边（栈中）的先输出。<br/>
          ② 幂运算 ^ 是右结合，所以遇到 ^ 时只弹出比它<strong>严格高</strong>的运算符，同优先级的 ^ 不弹——留在栈里。<br/>
          ③ 左括号在栈中的优先级视为"最低"，这样任何运算符都能入栈；但它不会被弹出（除非遇到右括号）。
          </p>
        </aside>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>手动追踪 A + B * C - D：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">Token</th><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">输出</th><th class="px-4 py-2 border border-slate-200 font-semibold">栈</th></tr></thead>
            <tbody class="text-slate-600 text-xs font-mono">
              <tr><td class="px-4 py-2 border">A</td><td class="px-4 py-2 border">数字→输出</td><td class="px-4 py-2 border">A</td><td class="px-4 py-2 border">[]</td></tr>
              <tr><td class="px-4 py-2 border">+</td><td class="px-4 py-2 border">栈空→入栈</td><td class="px-4 py-2 border">A</td><td class="px-4 py-2 border">[+]</td></tr>
              <tr><td class="px-4 py-2 border">B</td><td class="px-4 py-2 border">数字→输出</td><td class="px-4 py-2 border">A B</td><td class="px-4 py-2 border">[+]</td></tr>
              <tr><td class="px-4 py-2 border">*</td><td class="px-4 py-2 border">*优先级(2) &gt; +(1)→入栈</td><td class="px-4 py-2 border">A B</td><td class="px-4 py-2 border">[+, *]</td></tr>
              <tr><td class="px-4 py-2 border">C</td><td class="px-4 py-2 border">数字→输出</td><td class="px-4 py-2 border">A B C</td><td class="px-4 py-2 border">[+, *]</td></tr>
              <tr><td class="px-4 py-2 border">-</td><td class="px-4 py-2 border">-优先级(1) ≤ *(2)→弹*; ≤ +(1)→弹+; 然后入-</td><td class="px-4 py-2 border">A B C * +</td><td class="px-4 py-2 border">[-]</td></tr>
              <tr><td class="px-4 py-2 border">D</td><td class="px-4 py-2 border">数字→输出</td><td class="px-4 py-2 border">A B C * + D</td><td class="px-4 py-2 border">[-]</td></tr>
              <tr><td class="px-4 py-2 border">(结束)</td><td class="px-4 py-2 border">弹空栈</td><td class="px-4 py-2 border">A B C * + D -</td><td class="px-4 py-2 border">[]</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. Evaluate RPN + Basic Calculator -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          后缀求值（#150）+ 基础计算器（#224 / #227 / #772）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          后缀表达式求值是最简单的部分——一个数字栈就够了。而 LeetCode 的基础计算器系列要求<strong>直接求值中缀表达式</strong>，需要同时维护数字栈和运算符栈。
        </p>

        <div class="mb-4"><Code language="ts" :code="evalCode" title="evaluate_expression.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>基础计算器系列对比：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">运算符</th><th class="px-4 py-2 border border-slate-200 font-semibold">括号</th><th class="px-4 py-2 border border-slate-200 font-semibold">空格</th><th class="px-4 py-2 border border-slate-200 font-semibold">负数</th><th class="px-4 py-2 border border-slate-200 font-semibold">核心策略</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">#224</td><td class="px-4 py-2 border">+, -</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">✅（一元负号）</td><td class="px-4 py-2 border">栈存符号 + 括号内独立计算</td></tr>
              <tr><td class="px-4 py-2 border font-mono">#227</td><td class="px-4 py-2 border">+, -, *, /</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border">先算 * / 暂存结果，最后求和</td></tr>
              <tr><td class="px-4 py-2 border font-mono">#772</td><td class="px-4 py-2 border">+, -, *, /</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">通用：两个栈（数字+运算符）递归处理括号</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 5. Longest Valid Parentheses -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          最长有效括号（#32）—— 栈存索引的巧用
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Longest Valid Parentheses（#32）</strong> 是括号匹配的升级版——不是判断是否有效，而是找最长的有效括号子串。
          可以用栈、也可以用 DP、甚至可以用双指针。这里展示最直观的<strong>栈存索引</strong>法。
        </p>

        <div class="mb-4"><Code language="ts" :code="longestParenCode" title="longest_valid_parentheses.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 三种解法比较：</strong><br/>
          ① <strong>栈法 O(n)/O(n)</strong>：栈底始终存"最后一个不匹配的右括号索引"，遇到匹配就计算当前索引 - 栈顶<br/>
          ② <strong>DP法 O(n)/O(n)</strong>：dp[i] 表示以 s[i] 结尾的最长有效括号长度<br/>
          ③ <strong>双指针 O(n)/O(1)</strong>：从左往右 + 从右往左各扫一次，用 left/right 计数器<br/>
          面试中栈法和双指针法都是满分答案——双指针法 O(1) 空间更亮眼。
          </p>
        </aside>
      </section>

      <!-- 6. Decode String -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          字符串解码（#394）+ 栈的"上下文保存"模式
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Decode String（#394）</strong> 展示了栈的另一种用法：<strong>遇到嵌套结构时保存当前上下文，进入内层处理，退出时恢复并拼接</strong>。
          这种模式在解析嵌套 JSON、HTML/XML tokenizer、模板引擎中非常常见。
        </p>

        <div class="mb-4"><Code language="ts" :code="decodeCode" title="decode_string.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          字符串解码中的"保存上下文 → 进入嵌套 → 恢复上下文"模式，就像 <strong>React 组件的嵌套渲染</strong>：
          父组件把 props/状态保存在栈里，进入子组件渲染，子组件完成后恢复父组件的上下文继续。
          也像 <strong>浏览器解析 HTML 的 tokenizer</strong>——遇到 <code>&lt;div&gt;</code> 就保存当前状态，进入子节点解析，遇到 <code>&lt;/div&gt;</code> 就弹出恢复。
          </p>
        </aside>

        <div class="mb-4"><Code language="ts" :code="decodeTraceCode" title="decode_trace.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：后缀表达式求值（RPN）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">表达式 <strong>4 13 5 / +</strong>（即 (4 + 13/5)）。<strong>数字入栈，运算符弹出两个操作数计算后压回</strong>。橙=当前 token，灰=已处理。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 栈深度: {{ evStack.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ evStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500 ml-auto">⏱️ O(n) 单遍扫描</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="evStep" :disabled="evBusy || evDone" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">{{ evDone ? '✅ 求值完成' : '▶ 下一步' }}</button>
          <button @mousedown="evReset" :disabled="evBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="evBox" class="w-full relative" :style="{height:evH+'px'}">
          <v-stage :config="{width:evW, height:evH}">
            <v-layer>
              <v-text :config="{x:20,y:8,text:'输入 tokens:',fontSize:11,fontFamily:'monospace',fill:evC.muted,fontStyle:'bold'}" />
              <v-rect v-for="(tk,i) in evTokens" :key="'tr'+i" :config="evTokRect(i)" />
              <v-text v-for="(tk,i) in evTokens" :key="'tt'+i" :config="evTokText(i)" />
              <v-text :config="{x:evW/2-70,y:120,text:'操作数栈:',fontSize:11,fontFamily:'monospace',fill:evC.muted,fontStyle:'bold'}" />
              <v-rect v-for="b in evStack" :key="b.id" :config="evR(b)" />
              <v-text v-for="b in evStack" :key="'t'+b.id" :config="evT(b)" />
              <v-text v-if="!evStack.length" :config="{x:evW/2-40,y:200,text:'栈为空',fontSize:14,fill:evC.muted,align:'center'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>后缀表达式 = 栈的最佳拍档</strong>——不需要括号和优先级，一个栈就搞定求值</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Shunting-yard 算法</strong>：运算符栈 + 优先级比较 = 中缀转后缀</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>#20 有效括号</strong> = 栈的最基础应用（LIFO 完美匹配括号的嵌套结构）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>#32 最长有效括号</strong> = 栈底放"哨兵索引"追踪有效区间起点的巧思</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>#224/#227/#772 基础计算器</strong> = 栈处理运算符优先级问题的实战</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>#394 字符串解码</strong> = "保存上下文 → 嵌套处理 → 恢复拼接" 的通用模式</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心认知：</strong>栈 = 后进先出 = 天然处理"嵌套/递归/回溯"结构</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-1-mono-stack" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：单调栈</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-3-dfs-stack" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：DFS 栈实现 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "三种表达式" },
  { id: "sec-2", name: "有效括号 #20" },
  { id: "sec-3", name: "中缀转后缀" },
  { id: "sec-4", name: "后缀求值 & 计算器" },
  { id: "sec-5", name: "最长有效括号 #32" },
  { id: "sec-6", name: "字符串解码 #394" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 后缀求值动画 =====
const evC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8'}
const evW=ref(700), evH=ref(320)
interface EVBar { id:number; val:number; color:string; s:number }
const evStack=reactive<EVBar[]>([])
const evTokens=['4','13','5','/','+']
const evIdx=ref(0), evDone=ref(false), evBusy=ref(false), evStatus=ref(''), evId=ref(10)
const evBox=ref<HTMLDivElement>()
const d5=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function evTokRect(i:number){ const isCur=i===evIdx.value, isDone=i<evIdx.value; return {x:20+i*54, y:30, width:44, height:32, fill:isCur?evC.orange:isDone?evC.muted:evC.cyan, cornerRadius:6, stroke:'#64748b', strokeWidth:1, opacity:isDone?0.4:1} }
function evTokText(i:number){ const isCur=i===evIdx.value, isDone=i<evIdx.value; return {x:20+i*54, y:30, width:44, height:32, text:evTokens[i], fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:isCur?'#fff':isDone?evC.muted:evC.text, align:'center', verticalAlign:'middle'} }
function evR(b:any){ const bw=140,bh=34,x=evW.value/2-bw/2,y=270-(evStack.indexOf(b)+1)*40; const s=b.s??1; return {x:x+(bw*(1-s))/2, y:y+(bh*(1-s))/2, width:bw*s, height:bh*s, fill:b.color, cornerRadius:6, stroke:'#64748b', strokeWidth:1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:3} }
function evT(b:any){ const bw=140,bh=34,x=evW.value/2-bw/2,y=270-(evStack.indexOf(b)+1)*40; const s=b.s??1; return {x:x+(bw*(1-s))/2, y:y+(bh*(1-s))/2, width:bw*s, height:bh*s, text:String(b.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:evC.text, align:'center', verticalAlign:'middle'} }
function evCompute(a:number,b:number,op:string){ if(op==='+')return a+b; if(op==='-')return a-b; if(op==='*')return a*b; return Math.trunc(a/b) }
async function evStep(){
  if(evBusy.value||evDone.value)return; evBusy.value=true
  const tok=evTokens[evIdx.value]
  if(/^\d+$/.test(tok)){
    evStatus.value=`读到数字 ${tok} → 入栈`
    const nb:EVBar={id:evId.value++,val:Number(tok),color:evC.green,s:0}; evStack.push(nb)
    await d5(60); nb.s=1; await d5(400); nb.color=evC.cyan
  } else {
    evStatus.value=`运算符 ${tok} → 弹出两个操作数`
    const b=evStack[evStack.length-1], a=evStack[evStack.length-2]
    b.color=evC.red; a.color=evC.red; await d5(400)
    b.s=0; a.s=0; await d5(300)
    const res=evCompute(a.val,b.val,tok)
    evStack.splice(evStack.length-2,2)
    const nb:EVBar={id:evId.value++,val:res,color:evC.green,s:0}; evStack.push(nb)
    await d5(60); nb.s=1; await d5(400); nb.color=evC.cyan
    evStatus.value=`${a.val} ${tok} ${b.val} = ${res}`
  }
  evIdx.value++
  if(evIdx.value>=evTokens.length){ evDone.value=true; evStatus.value=`✅ 结果 = ${evStack[evStack.length-1]?.val}` }
  evBusy.value=false
}
function evReset(){ evBusy.value=false; evStack.length=0; evIdx.value=0; evDone.value=false; evStatus.value='' }
let roEV:ResizeObserver|null=null
onMounted(()=>{ if(evBox.value){ evW.value=evBox.value.clientWidth; roEV=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200) evW.value=Math.max(300,w)}); roEV.observe(evBox.value) }})
onUnmounted(()=>roEV?.disconnect())

const validParenCode = `// ===== LeetCode 20: Valid Parentheses =====
// 输入 "()[]{}" → true,  "(]" → false,  "([)]" → false

function isValid(s: string): boolean {
    const map = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
    ])
    const stack: string[] = []

    for (const ch of s) {
        if (map.has(ch)) {
            // 左括号 → 入栈对应的右括号（技巧：存期望的闭合符）
            stack.push(map.get(ch)!)
        } else {
            // 右括号 → 必须和栈顶匹配
            if (stack.length === 0 || stack.pop() !== ch) return false
        }
    }
    return stack.length === 0  // 所有左括号都已匹配
}

// 技巧说明：栈里存"期望的右括号"而非"左括号本身"
// 遇到 '(' → push ')'  遇到 '[' → push ']'
// 遇到 '}' → pop 出来必须是 '}'，否则 false
// 好处：右括号比较时不需要查 Map，直接 === 比较，更简洁

// ===== 传统写法（存左括号）=====
function isValidAlt(s: string): boolean {
    const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
    const stack: string[] = []
    for (const ch of s) {
        if (ch in pairs) {
            if (stack.pop() !== pairs[ch]) return false
        } else {
            stack.push(ch)
        }
    }
    return stack.length === 0
}`

const infixToPostfixCode = `// ===== Shunting-yard: 中缀 → 后缀 =====
// 只支持 + - * / ( ) 和数字

function infixToPostfix(expression: string): string {
    const precedence: Record<string, number> = {
        '+': 1, '-': 1,
        '*': 2, '/': 2,
    }
    const output: string[] = []
    const opStack: string[] = []

    // Tokenize：把表达式拆成 token 数组
    const tokens = expression.match(/\d+|[+\\-*/()]/g) || []

    for (const token of tokens) {
        if (/\\d+/.test(token)) {
            // 规则1: 数字直接输出
            output.push(token)
        } else if (token === '(') {
            // 规则2: 左括号直接入栈
            opStack.push(token)
        } else if (token === ')') {
            // 规则3: 右括号 → 弹栈输出直到遇到左括号
            while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
                output.push(opStack.pop()!)
            }
            opStack.pop()  // 弹出左括号（不输出）
        } else {
            // 规则4: 运算符 → 弹出所有优先级 >= 当前运算符的栈顶运算符
            while (
                opStack.length > 0 &&
                opStack[opStack.length - 1] !== '(' &&
                precedence[opStack[opStack.length - 1]] >= precedence[token]
            ) {
                output.push(opStack.pop()!)
            }
            opStack.push(token)
        }
    }

    // 表达式读完 → 弹出栈中剩余所有运算符
    while (opStack.length > 0) {
        output.push(opStack.pop()!)
    }

    return output.join(' ')
}

// 示例: "3 + 4 * 2 / (1 - 5)" → "3 4 2 * 1 5 - / +"
// 示例: "A + B * C - D"     → "A B C * + D -"

// ===== 处理右结合运算符（幂运算 ^）=====
function infixToPostfixWithPower(expr: string): string {
    const precedence: Record<string, number> = {
        '+': 1, '-': 1, '*': 2, '/': 2, '^': 3
    }
    const isRightAssoc: Record<string, boolean> = { '^': true }

    const output: string[] = []
    const stack: string[] = []
    const tokens = expr.match(/\d+|[+\\-*/^()]/g) || []

    for (const token of tokens) {
        if (/\\d+/.test(token)) {
            output.push(token)
        } else if (token === '(') {
            stack.push(token)
        } else if (token === ')') {
            while (stack[stack.length - 1] !== '(') output.push(stack.pop()!)
            stack.pop()
        } else {
            // 右结合仅弹出严格更高优先级的
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                const top = stack[stack.length - 1]
                if (isRightAssoc[token]
                    ? precedence[top] > precedence[token]   // 右结合: >
                    : precedence[top] >= precedence[token]  // 左结合: >=
                ) {
                    output.push(stack.pop()!)
                } else {
                    break
                }
            }
            stack.push(token)
        }
    }
    while (stack.length > 0) output.push(stack.pop()!)
    return output.join(' ')
}
// 示例: "2 ^ 3 ^ 2" → "2 3 2 ^ ^"（后缀中先算 3^2，再算 2^(3^2)）`

const evalCode = `// ===== LeetCode 150: Evaluate Reverse Polish Notation =====
// 输入: ["2","1","+","3","*"]  →  ((2+1)*3) = 9
// 输入: ["4","13","5","/","+"] →  (4+(13/5)) = 6
// 注意: 除法和减法不满足交换律，操作数顺序很重要！

function evalRPN(tokens: string[]): number {
    const stack: number[] = []

    for (const token of tokens) {
        if (token === '+') {
            stack.push(stack.pop()! + stack.pop()!)
        } else if (token === '-') {
            const b = stack.pop()!
            const a = stack.pop()!
            stack.push(a - b)          // 注意顺序：a - b
        } else if (token === '*') {
            stack.push(stack.pop()! * stack.pop()!)
        } else if (token === '/') {
            const b = stack.pop()!
            const a = stack.pop()!
            stack.push(Math.trunc(a / b))  // 向零取整（不是 floor）
        } else {
            stack.push(Number(token))
        }
    }
    return stack[0]
}
// 时间 O(n)  空间 O(n)
// 手动模拟 ["4","13","5","/","+"]:
// 4  → stack=[4]
// 13 → stack=[4,13]
// 5  → stack=[4,13,5]
// /  → pop 5, pop 13 → Math.trunc(13/5)=2 → stack=[4,2]
// +  → pop 2, pop 4  → 6 → stack=[6] → 返回6 ✓

// ===== LeetCode 227: Basic Calculator II（无括号，有 +-*/）=====
function calculate(s: string): number {
    const stack: number[] = []
    let num = 0
    let sign = '+'  // 前一个运算符

    for (let i = 0; i < s.length; i++) {
        const ch = s[i]

        if (ch >= '0' && ch <= '9') {
            num = num * 10 + (ch.charCodeAt(0) - 48)  // 累积数字
        }

        // 遇到运算符或到末尾 → 处理前一个运算符
        if ((ch < '0' || ch > '9') && ch !== ' ' || i === s.length - 1) {
            if (sign === '+') stack.push(num)
            else if (sign === '-') stack.push(-num)
            else if (sign === '*') stack.push(stack.pop()! * num)
            else if (sign === '/') stack.push(Math.trunc(stack.pop()! / num))

            sign = ch   // 记录新运算符
            num = 0
        }
    }
    // 栈中全是加数和减数，直接求和
    return stack.reduce((sum, v) => sum + v, 0)
}
// 时间 O(n)  空间 O(n)
// 核心思想：遇到 * 或 / 时立即和前一个数计算并入栈；
//           遇到 + 或 - 时先压栈（带符号），最后统一求和。
// 这相当于隐式地将表达式转成了"后缀"：乘除先算，加减后算。

// ===== LeetCode 224: Basic Calculator（有括号和 +-，无 */）=====
function calculateWithParens(s: string): number {
    const stack: number[] = []
    let result = 0
    let num = 0
    let sign = 1  // 1=正, -1=负

    for (let i = 0; i < s.length; i++) {
        const ch = s[i]

        if (ch >= '0' && ch <= '9') {
            num = num * 10 + (ch.charCodeAt(0) - 48)
        } else if (ch === '+') {
            result += sign * num
            sign = 1
            num = 0
        } else if (ch === '-') {
            result += sign * num
            sign = -1
            num = 0
        } else if (ch === '(') {
            // 保存当前结果和符号，进入括号内独立计算
            stack.push(result)
            stack.push(sign)
            result = 0
            sign = 1
        } else if (ch === ')') {
            result += sign * num
            num = 0
            // 恢复外部上下文
            result *= stack.pop()!   // 栈顶是外部的符号
            result += stack.pop()!   // 再弹是外部的累计结果
        }
    }
    return result + sign * num
}
// 时间 O(n)  空间 O(n)
// 关键: 遇到 '(' 时将 result 和 sign 压栈（保存上下文）
//       遇到 ')' 时将括号内计算好的 result 与外部拼接（恢复上下文）`

const longestParenCode = `// ===== LeetCode 32: Longest Valid Parentheses =====
// 输入: ")()())" → 4  (子串 "()()" 长4)
// 输入: "(()"   → 2  (子串 "()"  长2)

// ===== 解法1: 栈法（最直观）=====
function longestValidParentheses(s: string): number {
    const stack: number[] = [-1]  // ★ 栈底预存 -1 作为"最后一个不匹配位置"
    let maxLen = 0

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i)
        } else {
            stack.pop()  // 尝试匹配
            if (stack.length === 0) {
                // 栈空了 → 当前 ')' 没有匹配的 '(' → 它是新的"断点"
                stack.push(i)
            } else {
                // 栈非空 → 有匹配 → 当前有效长度 = i - 栈顶
                maxLen = Math.max(maxLen, i - stack[stack.length - 1])
            }
        }
    }
    return maxLen
}

// 手动模拟: s = ")()())"
// 初始: stack=[-1], maxLen=0
// i=0 ')': pop(-1) → 栈空 → push(0), stack=[0]
// i=1 '(': stack=[0,1]
// i=2 ')': pop(1) → 栈非空 → len=2-0=2, maxLen=2, stack=[0]
// i=3 '(': stack=[0,3]
// i=4 ')': pop(3) → 栈非空 → len=4-0=4, maxLen=4, stack=[0]
// i=5 ')': pop(0) → 栈空 → push(5), stack=[5]
// 最终 maxLen=4 ✓

// ===== 解法2: 双指针 O(n)/O(1) — 空间最优！=====
function longestValidParentheses2(s: string): number {
    let left = 0, right = 0, maxLen = 0

    // 从左往右扫描
    for (const ch of s) {
        if (ch === '(') left++
        else right++

        if (left === right) {
            maxLen = Math.max(maxLen, 2 * right)
        } else if (right > left) {
            left = right = 0  // 无效，重置
        }
    }

    // 从右往左扫描（处理 "(()" 这种情况）
    left = right = 0
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '(') left++
        else right++

        if (left === right) {
            maxLen = Math.max(maxLen, 2 * left)
        } else if (left > right) {
            left = right = 0
        }
    }
    return maxLen
}
// 为什么需要双向扫描？
// 单向扫描: "(()" → 从左往右: left=2,right=1 → 永不等 → 得0(错误)
//          从右往左: left=0,right=0 → i=2 ')':right=1 → i=1 '(':left=1,left=right → maxLen=2 ✓`

const decodeCode = `// ===== LeetCode 394: Decode String =====
// 输入: "3[a]2[bc]"    → "aaabcbc"
// 输入: "3[a2[c]]"     → "accaccacc"
// 输入: "2[abc]3[cd]ef" → "abcabccdcdcdef"

function decodeString(s: string): string {
    const countStack: number[] = []    // 存重复次数
    const strStack: string[] = []      // 存外部字符串上下文
    let currentStr = ''
    let currentNum = 0

    for (const ch of s) {
        if (ch >= '0' && ch <= '9') {
            currentNum = currentNum * 10 + (ch.charCodeAt(0) - 48)
        } else if (ch === '[') {
            // 进入嵌套 → 保存当前上下文
            countStack.push(currentNum)
            strStack.push(currentStr)
            currentNum = 0
            currentStr = ''
        } else if (ch === ']') {
            // 退出嵌套 → 恢复外部字符串，拼接重复后的内容
            const repeat = countStack.pop()!
            const outerStr = strStack.pop()!
            currentStr = outerStr + currentStr.repeat(repeat)
        } else {
            currentStr += ch
        }
    }
    return currentStr
}
// 时间 O(n)  空间 O(n)（嵌套深度）
//
// 核心模式（口诀）：
// 遇到 '[' → 保存 currentNum 和 currentStr 入栈，重置
// 遇到 ']' → 弹出 repeat 和 outerStr，拼接 outerStr + currentStr * repeat
//
// 这跟 Basic Calculator #224 的括号处理一模一样：
// 进入 '(' 前保存当前 result 和 sign，退出 ')' 时恢复拼接`

const decodeTraceCode = `// ===== 手动追踪 "3[a2[c]]" =====
// 初始: currentStr='', currentNum=0, stack=[]
//
// ch='3': currentNum = 3
// ch='[': push num(3), push str('')
//         reset: currentNum=0, currentStr=''
//         countStack=[3], strStack=['']
//
// ch='a': currentStr = 'a'
// ch='2': currentNum = 2
// ch='[': push num(2), push str('a')
//         reset: currentNum=0, currentStr=''
//         countStack=[3,2], strStack=['', 'a']
//
// ch='c': currentStr = 'c'
// ch=']': pop repeat=2, pop outer='a'
//         currentStr = 'a' + 'c'.repeat(2) = 'acc'
//         countStack=[3], strStack=['']
//
// ch=']': pop repeat=3, pop outer=''
//         currentStr = '' + 'acc'.repeat(3) = 'accaccacc'
// 最终: "accaccacc" ✓`
</script>
