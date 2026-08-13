<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 字典树 Trie：高效字符串检索</h1>
          <p class="text-sm text-slate-500 mt-1">用树存储字符串——插入/查找/前缀匹配都在 O(L) 内完成</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-5-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：字典树 Trie
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Trie 是一棵<strong>多叉树</strong>，每个节点存一个<strong>字符</strong>，从根到某个节点的路径拼起来就是一个<strong>字符串前缀</strong>。
          被标记为 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">isEnd</code> 的节点代表一个完整单词的结束。下面这棵 Trie 存了三个单词：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">cat</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">car</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">do</code>。
          注意 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ca</code> 是共享的前缀——这正是 Trie 节省空间的关键。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 350" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="tr-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <!-- 边 -->
            <line x1="360" y1="68" x2="200" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
            <line x1="360" y1="68" x2="520" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
            <line x1="200" y1="160" x2="200" y2="212" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
            <line x1="200" y1="252" x2="130" y2="290" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
            <line x1="200" y1="252" x2="270" y2="290" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
            <line x1="520" y1="160" x2="520" y2="212" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />

            <!-- root -->
            <circle cx="360" cy="48" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="360" y="48" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">root</text>

            <!-- 内部节点（cyan） -->
            <circle cx="200" cy="140" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="200" y="140" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">c</text>
            <circle cx="200" cy="232" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="200" y="232" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">a</text>
            <circle cx="520" cy="140" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="520" y="140" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">d</text>

            <!-- 单词结束节点（green + end 标记） -->
            <circle cx="130" cy="310" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="130" y="310" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">t</text>
            <text x="130" y="338" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">end</text>
            <circle cx="270" cy="310" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="270" y="310" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">r</text>
            <text x="270" y="338" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">end</text>
            <circle cx="520" cy="232" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="520" y="232" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">o</text>
            <text x="520" y="260" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">end</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Trie 结构 —— 节点存字符，路径 = 单词，绿色节点 = 单词结束（cat / car / do）</figcaption>
        </figure>

        <!-- 操作示意图：前缀匹配 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：前缀匹配 "ca" —— 沿路径走到底，收集所有 isEnd 子孙</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">① 沿前缀 "ca" 走到节点 a</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="pf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="160" y1="52" x2="100" y2="102" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#pf-arr)" />
              <line x1="100" y1="122" x2="100" y2="158" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#pf-arr)" />
              <circle cx="160" cy="40" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="160" y="40" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">root</text>
              <circle cx="100" cy="110" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="100" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">c</text>
              <circle cx="100" cy="170" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="100" y="170" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">a</text>
              <text x="190" y="170" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">走到 a ✓</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">② 收集 a 的 isEnd 子孙 → [cat, car]</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="pf2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="100" y1="70" x2="70" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#pf2-arr)" />
              <line x1="100" y1="70" x2="130" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#pf2-arr)" />
              <circle cx="100" cy="52" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="100" y="52" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">a</text>
              <circle cx="70" cy="138" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="70" y="138" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">t</text>
              <circle cx="130" cy="138" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="130" y="138" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">r</text>
              <text x="16" y="185" font-size="12" font-family="monospace" fill="#16a34a">匹配结果: ["cat", "car"]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">前缀匹配 = 走到节点后 DFS 收集所有单词</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 什么是 Trie -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是 Trie？为什么要用它？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>Trie</strong>（读作 "try"，也称「字典树」「前缀树」「单词查找树」）是一种专门为<strong>字符串集合</strong>设计的树形结构。
          它把每个字符串拆成一个个字符，沿着树的边逐字符存储。名字来自 "re<strong>trie</strong>val"（检索）。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          普通的字符串查找怎么做？如果用一个数组存 <code>["cat","car","do","dog",...]</code>，判断一个单词是否存在需要<strong>逐个比较</strong>，
          时间复杂度 <strong>O(n·L)</strong>（n 个单词 × 平均长度 L）。如果单词数量巨大（比如字典里有 10 万词），每次查找都很慢。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Trie 的查找复杂度只和<strong>目标字符串的长度 L 有关</strong>，与字典里有多少词<strong>完全无关</strong>——因为每个字符沿一条边跳一步，
          走 L 步就到了。这就是 <strong>O(L)</strong> 的查找，比哈希表在理论上更稳定（哈希表虽然也是 O(L) 但受冲突影响）。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Trie 就像 URL 的<strong>路径路由</strong>。比如 React Router 的嵌套路由 <code>/users/:id/posts</code>，浏览器按 <code>/users</code> → <code>/:id</code> → <code>/posts</code> 逐段匹配。<br/>
          又像<strong>文件系统目录树</strong>：<code>/home/user/docs</code> 每一级是一个目录，共享前缀的路径共享父目录。<br/>
          更像<strong>搜索框的自动补全</strong>（autocomplete）——你输入 "ca"，它立刻列出 "cat / car / catamaran..."，这背后通常就是一棵 Trie。
          </p>
        </aside>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>Trie 的核心特征：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>节点存字符</strong>，不存整个字符串——字符串是"沿路径读出来的"</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>共享前缀</strong>——"cat" 和 "car" 共享 "ca" 两个节点，省空间</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>isEnd 标记</strong>区分"前缀"和"完整单词"——"ca" 是前缀但不是单词</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span><strong>根节点为空</strong>——根不存字符，所有单词从根的孩子开始</span></li>
          </ol>
        </div>
      </section>

      <!-- 2. 节点与插入 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          节点结构 与 插入操作
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个 Trie 节点需要两样东西：<strong>孩子映射</strong>（字符 → 子节点）和 <strong>isEnd 标记</strong>（是否单词结束）。
          孩子可以用 <code>Map&lt;string, Node&gt;</code>（通用）或 <code>数组[26]</code>（仅小写字母，更快）。
        </p>
        <div class="mb-4"><Code language="ts" :code="insertCode" title="trie_insert.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>插入 "cat" 的执行流程：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>从根出发，看字符 <code>'c'</code>：没有这个孩子 → 新建节点 c</li>
          <li>在 c 下看 <code>'a'</code>：没有 → 新建节点 a</li>
          <li>在 a 下看 <code>'t'</code>：没有 → 新建节点 t</li>
          <li>走到 t，把 <code>isEnd = true</code> —— 单词 "cat" 完成</li>
        </ol>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">再插入 <strong>"car"</strong>：前两步 <code>'c'</code>、<code>'a'</code> 已存在，<strong>直接复用</strong>，只在 a 下新建 <code>'r'</code> 并标记结束。这就是「共享前缀」。</p>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>用 <code>Map</code> 存孩子最灵活（支持任意字符集、Unicode）；如果确定只有小写字母 a-z，用 <code>Array(26)</code> 省去哈希开销，索引 <code>charCodeAt(0) - 97</code> 直接定位。</p>
        </aside>
      </section>

      <!-- 3. 查找与前缀匹配 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          查找 与 前缀匹配
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          查找一个完整单词（<code>search</code>）和判断是否有某个前缀（<code>startsWith</code>）几乎一样，唯一区别是最后一步：
          <strong>search 要求节点 isEnd=true</strong>，而 startsWith 只要路径能走完就行。
        </p>
        <div class="mb-4"><Code language="ts" :code="searchCode" title="trie_search.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最容易犯的错：</strong>把「前缀存在」当成「单词存在」。<br/>
          在存了 <code>["cat"]</code> 的 Trie 里，<code>startsWith("ca")</code> 是 <code>true</code>（路径走得通），
          但 <code>search("ca")</code> 必须是 <code>false</code>（节点 a 的 isEnd 是 false）。<br/>
          面试题 <code>#208 Implement Trie</code> 就专门考这个区分。
          </p>
        </aside>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">完整实现：把三件套组装起来</h3>
        <div class="mb-4"><Code language="ts" :code="fullCode" title="trie_full.ts" /></div>
      </section>

      <!-- 4. 复杂度与对比 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          复杂度分析 与 Trie vs 哈希表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          设单词平均长度为 L，集合中有 n 个单词。Trie 的插入、查找、删除都是 <strong>O(L)</strong>，与 n 无关。
          空间方面，最坏情况是所有单词都不共享前缀，节点总数达到 <strong>O(n·L)</strong>（比哈希表大），但实际中前缀共享能大幅压缩。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">Trie</th><th class="px-4 py-2 border border-slate-200 font-semibold">哈希表 (HashSet)</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">查找/插入/删除</td><td class="px-4 py-2 border font-mono text-emerald-600">O(L)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(L) 均摊</td></tr>
              <tr><td class="px-4 py-2 border">前缀匹配 / 自动补全</td><td class="px-4 py-2 border font-mono text-emerald-600">✅ O(L + 结果数)</td><td class="px-4 py-2 border font-mono text-red-600">❌ 需要遍历全表 O(n)</td></tr>
              <tr><td class="px-4 py-2 border">字典序遍历</td><td class="px-4 py-2 border font-mono text-emerald-600">✅ 天然有序（DFS）</td><td class="px-4 py-2 border font-mono text-red-600">❌ 无序</td></tr>
              <tr><td class="px-4 py-2 border">空间占用</td><td class="px-4 py-2 border font-mono text-amber-600">O(n·L) 较大</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n·L) 较小</td></tr>
              <tr><td class="px-4 py-2 border">哈希冲突</td><td class="px-4 py-2 border font-mono text-emerald-600">无</td><td class="px-4 py-2 border font-mono text-amber-600">有（退化 O(n)）</td></tr>
              <tr><td class="px-4 py-2 border">典型应用</td><td class="px-4 py-2 border">自动补全、拼写检查、IP 路由</td><td class="px-4 py-2 border">去重、缓存、快速存在性判断</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>选 Trie 还是哈希表，取决于你的核心操作。<br/>
          如果只需要「这个单词在不在」，哈希表更省空间。<br/>
          如果需要「列出所有以某个前缀开头的词」「按字典序枚举」「最长公共前缀」，Trie 是唯一优雅的解。
          </p>
        </aside>
      </section>

      <!-- 5. 应用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          应用场景
        </h2>
        <div class="mb-4"><Code language="ts" :code="appCode" title="trie_applications.ts" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>搜索引擎/输入法自动补全</strong>——输入 "hel"，返回 "hello / help / helm"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>拼写检查与纠错</strong>——快速判断一个词是否在词典里，或找编辑距离相近的词</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>IP 路由最长前缀匹配</strong>——路由器按二进制前缀查 Trie（也叫 Radix/Patricia 树）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>词频统计</strong>——在 isEnd 节点上挂一个 count 计数器即可</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>与或异或极值（二进制 Trie）</strong>——数字拆成二进制位存 Trie，可求最大异或对（#421）</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          IDE 里的<strong>代码补全</strong>（输入 <code>getUser</code> 自动补 <code>getUserById</code>）、
          VSCode 的 <strong>IntelliSense</strong>、浏览器<strong>地址栏历史联想</strong>，都是「前缀匹配」的应用。
          它们的底层可能是更优化的 Radix 树或 FST（有限状态转换器），但思想一脉相承：<strong>按字符逐级共享前缀</strong>。
          </p>
        </aside>
      </section>

      <!-- 6. 常见陷阱 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见陷阱与优化
        </h2>
        <div class="mb-4"><Code language="ts" :code="pitfallCode" title="trie_pitfalls.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱清单：</strong><br/>
          ① <strong>忘记 isEnd</strong>——search 误把前缀当单词（最高频错误）。<br/>
          ② <strong>删除不处理 isEnd</strong>——只删节点却不清 isEnd，导致 ghost 单词。<br/>
          ③ <strong>Map 用对象做 key</strong>——字符要用 <code>string</code>，不能用对象，否则 Map 失效。<br/>
          ④ <strong>空间爆炸</strong>——节点数 = O(总字符数)，海量数据用压缩 Trie（Radix Tree）或 DAWG 优化。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 优化方向：</strong><br/>
          ① <strong>压缩 Trie（Radix Tree）</strong>——把无分支的单链合并成一个节点存整段字符串。<br/>
          ② <strong>双数组 Trie（Double-Array）</strong>——用两个数组模拟指针，省内存、CPU 缓存友好。<br/>
          ③ <strong>二进制 Trie</strong>——存数字的 bit 位，用于异或最值、名次查询。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：逐字符插入 与 前缀查询
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「插入下一个词」逐字符插入 <code>cat / car / do</code>。已存在的字符（橙）直接复用，新字符（绿）新建节点，单词结束节点变绿加 <code>end</code>。再试试「前缀查询」。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📚 已存单词: [{{ wordList.join(', ') }}]</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doInsertNext" :disabled="busy || wordIdx >= words.length"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">▶ 插入下一个词</button>
          <input v-model="prefixInp" type="text" placeholder="前缀，如 ca" maxlength="6"
            class="w-28 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-shadow" />
          <button @mousedown="doQuery" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 前缀查询</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="(e,i) in tEdges" :key="'e'+i" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="'c'+n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="nodeTextCfg(n)" />
              <v-circle v-for="n in tNodes.filter(x => x.isEnd)" :key="'end'+n.id" :config="endRingCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Trie = 多叉树</strong>，节点存字符，从根到节点的路径拼成字符串</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>共享前缀</strong>是核心优势——相同前缀的单词共享同一段路径</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>isEnd 标记</strong>区分「完整单词」和「仅是前缀」，这是 search 与 startsWith 的唯一差别</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入/查找/前缀匹配都是 O(L)</strong>，与字典大小 n 无关</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>vs 哈希表：</strong>哈希表查单个词更省空间，Trie 在前缀匹配/字典序/自动补全上碾压</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用：</strong>自动补全、拼写检查、IP 路由、词频统计、二进制异或 Trie</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-4-btree/dsa-4-4-3-lsm" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：LSM-Tree</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-2-segment" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：线段树 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ===== 🎬 Trie 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(340), W = ref(700), R = 22, LEVEL_H = 78, TOP = 48
interface TN { id:number; char:string; parent:number|null; children:Record<string,number>; depth:number; order:number; isEnd:boolean; x:number; y:number; color:string; s:number }
const tNodes = reactive<TN[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const words = ['cat', 'car', 'do']
const wordIdx = ref(0)
const wordList = reactive<string[]>([])
const prefixInp = ref('ca')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

function find(id:number) { return tNodes.find(n => n.id === id)! }
function rootId() { return 0 }

function relayout() {
  let order = 0
  const slot = Math.max(58, (W.value - 70) / (tNodes.length || 1))
  function dfs(id:number, depth:number) {
    const n = find(id)
    n.depth = depth; n.order = order++
    n.x = 42 + n.order * slot
    n.y = TOP + depth * LEVEL_H
    for (const ch of Object.keys(n.children).sort()) dfs(n.children[ch], depth + 1)
  }
  dfs(rootId(), 0)
}
function rebuildEdges() {
  tEdges.length = 0
  for (const n of tNodes) {
    for (const ch of Object.keys(n.children)) tEdges.push({ a: n.id, b: n.children[ch] })
  }
}
function edgeCfg(e:{a:number;b:number}) {
  const a = find(e.a), b = find(e.b)
  return { points: [a.x, a.y + R, b.x, b.y - R], stroke: C.muted, strokeWidth: 2 }
}
function circleCfg(n:TN) {
  const s = n.s ?? 1
  return { x: n.x, y: n.y, radius: R * s, fill: n.color, stroke: n.isEnd ? '#22c55e' : '#64748b', strokeWidth: n.isEnd ? 2.5 : 1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function nodeTextCfg(n:TN) {
  const s = n.s ?? 1
  const txt = n.char === '' ? 'root' : n.char
  return { x: n.x - R, y: n.y - R, width: R*2, height: R*2, text: txt, fontSize: n.char === '' ? 11 : 16, fontFamily:'monospace', fontStyle:'bold', fill: n.isEnd ? C.text : '#fff', align:'center', verticalAlign:'middle', scale:{x:s, y:s} }
}
function endRingCfg(n:TN) {
  return { x: n.x, y: n.y + R + 11, radius: 3, fill: C.green, stroke: '#22c55e', strokeWidth: 1 }
}

function resetTrie() {
  tNodes.length = 0; tEdges.length = 0; wordList.length = 0
  tNodes.push({ id: rootId(), char:'', parent:null, children:{}, depth:0, order:0, isEnd:false, x:0, y:0, color:C.ghost, s:1 })
  relayout()
}
async function insertWord(word:string) {
  let cur = rootId()
  for (const ch of word) {
    const node = find(cur)
    const kid = node.children[ch]
    if (kid != null) {
      const kn = find(kid)
      kn.color = C.orange; status.value = `字符 '${ch}' 已存在 → 复用`; await d(380)
      kn.color = C.cyan; cur = kid
    } else {
      const id = nid.value++
      const nn: TN = { id, char: ch, parent: cur, children:{}, depth:0, order:0, isEnd:false, x:0, y:0, color:C.green, s:0 }
      node.children[ch] = id
      tNodes.push(nn); rebuildEdges(); relayout()
      status.value = `新建节点 '${ch}'`; await d(80)
      nn.s = 1; relayout(); await d(450)
      nn.color = C.cyan; cur = id
    }
  }
  const last = find(cur)
  last.isEnd = true; last.color = C.green
  status.value = `单词 "${word}" 完成 ✓`; await d(500)
}
async function doInsertNext() {
  if (busy.value || wordIdx.value >= words.length) return
  busy.value = true
  try {
    const w = words[wordIdx.value]
    status.value = `插入 "${w}"...`
    await insertWord(w)
    wordList.push(w); wordIdx.value++
  } finally {
    await d(250); busy.value = false; status.value = wordIdx.value >= words.length ? '✅ 三个单词全部插入完成' : ''
  }
}
async function doQuery() {
  if (busy.value) return
  const prefix = prefixInp.value.trim().toLowerCase()
  if (!prefix) { status.value = '请输入前缀'; return }
  busy.value = true
  try {
    let cur = rootId()
    for (const ch of prefix) {
      const node = find(cur)
      const kid = node.children[ch]
      if (kid == null) { status.value = `前缀 "${prefix}" 不存在`; return }
      const kn = find(kid)
      kn.color = C.orange; status.value = `沿 '${ch}' 前进`; await d(350)
      kn.color = C.cyan; cur = kid
    }
    const matched: string[] = []
    function collect(id:number, path:string) {
      const n = find(id)
      if (n.isEnd) matched.push(path)
      for (const ch of Object.keys(n.children).sort()) collect(n.children[ch], path + ch)
    }
    collect(cur, prefix)
    status.value = matched.length ? `前缀 "${prefix}" 匹配: [${matched.join(', ')}]` : `"${prefix}" 是前缀但不是单词`
  } finally {
    await d(250); busy.value = false
  }
}
function doReset() {
  wordIdx.value = 0; status.value = ''; resetTrie()
}

let ro: ResizeObserver|null = null
onMounted(() => {
  resetTrie()
  if (box.value) { W.value = box.value.clientWidth; relayout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) { W.value = w; relayout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "什么是 Trie" },
  { id: "sec-2", name: "节点与插入" },
  { id: "sec-3", name: "查找与前缀匹配" },
  { id: "sec-4", name: "复杂度与对比" },
  { id: "sec-5", name: "应用场景" },
  { id: "sec-6", name: "常见陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const insertCode = `// ===== Trie 节点结构 =====
class TrieNode {
    children: Map<string, TrieNode>   // 字符 → 子节点
    isEnd: boolean                     // 是否是一个完整单词的结尾

    constructor() {
        this.children = new Map()
        this.isEnd = false
    }
}

class Trie {
    root: TrieNode = new TrieNode()

    // ===== 插入单词 =====
    insert(word: string): void {
        let node = this.root
        for (const ch of word) {
            // 没有这个字符的孩子 → 新建
            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode())
            }
            node = node.children.get(ch)!   // 沿边下走
        }
        node.isEnd = true                   // ★ 标记单词结束
    }
}

// 手动模拟：依次插入 cat / car / do
// insert("cat"): root -c-> c -a-> a -t-> t(end)
// insert("car"): root -c-> c -a-> a -r-> r(end)   ← 复用 c、a
// insert("do"):  root -d-> d -o-> o(end)
//
// 最终树:
//        root
//       /    \\
//      c      d
//      |      |
//      a      o(end)
//     / \\
//  t(end) r(end)`

const searchCode = `class Trie {
    // ... 省略 insert，见上文

    // ===== 查找完整单词 =====
    search(word: string): boolean {
        let node = this.root
        for (const ch of word) {
            if (!node.children.has(ch)) return false  // 字符断链 → 不存在
            node = node.children.get(ch)!
        }
        return node.isEnd   // ★ 走到最后，还必须是单词结尾
    }

    // ===== 判断是否有某个前缀 =====
    startsWith(prefix: string): boolean {
        let node = this.root
        for (const ch of prefix) {
            if (!node.children.has(ch)) return false
            node = node.children.get(ch)!
        }
        return true          // 路径走通就行，不要求 isEnd
    }
}

// 使用示例（树中已存 cat / car / do）
const t = new Trie()
t.insert('cat'); t.insert('car'); t.insert('do')

console.log(t.search('cat'))        // true
console.log(t.search('ca'))         // false  ← 是前缀但不是单词
console.log(t.startsWith('ca'))     // true   ← 前缀存在
console.log(t.search('c'))          // false
console.log(t.startsWith('do'))     // true
console.log(t.search('dog'))        // false  ← d 有孩子，但 o 下没有 g`

const fullCode = `// ===== LeetCode 208: Implement Trie (Prefix Tree) =====
class TrieNode {
    children: Map<string, TrieNode>
    isEnd: boolean
    constructor() {
        this.children = new Map()
        this.isEnd = false
    }
}

class Trie {
    private root = new TrieNode()

    insert(word: string): void {
        let node = this.root
        for (const ch of word) {
            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode())
            }
            node = node.children.get(ch)!
        }
        node.isEnd = true
    }

    search(word: string): boolean {
        let node = this.root
        for (const ch of word) {
            if (!node.children.has(ch)) return false
            node = node.children.get(ch)!
        }
        return node.isEnd
    }

    startsWith(prefix: string): boolean {
        let node = this.root
        for (const ch of prefix) {
            if (!node.children.has(ch)) return false
            node = node.children.get(ch)!
        }
        return true
    }
}

// ===== 变体：数组版（仅小写字母 a-z，更快）=====
class TrieArray {
    private root = new Array(26)  // 用数组下标代替 Map
    // 技巧：用 isEnd 分开存，或包装成 { next, isEnd }
    insert(word: string): void {
        let node = this.root
        for (const ch of word) {
            const idx = ch.charCodeAt(0) - 97   // 'a' → 0
            if (!node[idx]) node[idx] = new Array(26)
            node = node[idx]
        }
        node[26] = true  // 用第 27 位存 isEnd 标记
    }
}
// 数组版优点：O(1) 直接定位孩子，无哈希开销
// 数组版缺点：每节点固定 26 槽，短单词多时空间浪费`

const appCode = `// ===== 应用 1：自动补全（前缀联想）=====
function autocomplete(trie: Trie, prefix: string): string[] {
    const result: string[] = []
    // 1) 先走到前缀的末端节点
    let node = trie.root
    for (const ch of prefix) {
        if (!node.children.has(ch)) return result
        node = node.children.get(ch)!
    }
    // 2) DFS 收集该节点下所有 isEnd 单词
    function dfs(n: TrieNode, path: string) {
        if (n.isEnd) result.push(path)
        for (const [ch, child] of n.children) {
            dfs(child, path + ch)
        }
    }
    dfs(node, prefix)
    return result
}
// autocomplete(t, 'ca') → ['car', 'cat']（按 Map 插入序）

// ===== 应用 2：词频统计（节点挂计数器）=====
class WordCounter {
    count: Map<string, number> = new Map()
    // 插入时在每个经过节点 +1，查询前缀词频就是前缀末端节点的计数值
    // 这种「在节点上存聚合信息」的思想，线段树也会用到
}

// ===== 应用 3：最长公共前缀（#14）=====
function longestCommonPrefix(words: string[]): string {
    const t = new Trie()
    words.forEach(w => t.insert(w))
    let node = t.root, prefix = ''
    // 只要当前节点只有一个孩子且不是结尾，就继续往下走
    while (node.children.size === 1 && !node.isEnd) {
        const [ch, child] = [...node.children.entries()][0]
        prefix += ch
        node = child
    }
    return prefix
}
// 本质：LCP = 从根一路走到第一个「分叉或结尾」的路径`

const pitfallCode = `// ===== 陷阱 1：search 与 startsWith 混淆 =====
const t = new Trie()
t.insert('app')
t.search('app')        // true
t.search('ap')         // false —— ap 只是前缀
t.startsWith('ap')     // true

// ===== 陷阱 2：删除只删 isEnd 不删节点 → ghost 单词 =====
// 错误做法：
//   node.isEnd = false   // 只是"取消"单词，节点还在，无伤大雅
// 但如果题目要求彻底删除，需要回溯删除无用的链（后序删除）

// 正确删除（递归版）：
function deleteWord(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
        if (!node.isEnd) return false
        node.isEnd = false
        return node.children.size === 0  // 叶子可删
    }
    const ch = word[depth]
    const child = node.children.get(ch)
    if (!child) return false
    const shouldDelete = deleteWord(child, word, depth + 1)
    if (shouldDelete) node.children.delete(ch)
    return node.children.size === 0 && !node.isEnd
}

// ===== 陷阱 3：字符 key 用了对象 =====
// node.children.set({ch:'a'}, child)  // ❌ 每次都是新对象，永远 get 不到
// node.children.set('a', child)       // ✅ 用基本类型 string

// ===== 陷阱 4：递归收集太深爆栈 =====
// Trie 深度 = 最长单词长度 L。L 通常不会太大（几十），
// 但极端情况下（超长字符串）递归 DFS 收集会爆栈，可改用显式栈迭代。
// 前端注意：浏览器调用栈约 1 万层，L > 1 万 时会 RangeError。`
</script>
