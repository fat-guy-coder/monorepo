<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎭 哑节点技巧：统一头节点的处理</h1>
          <p class="text-sm text-slate-500 mt-1">消除 head 特殊判断——链表操作最优雅的技巧</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：哑节点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>dummy 是不存数据的虚拟哨兵节点</strong>（虚线框），它的 <strong>next 才是真正的 head</strong>。有了 dummy，删除头节点也能像删除中间节点一样统一处理。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 560 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="dm-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="28" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">dummy(哨兵) → [data|next] → [data|next] → [data|next] → null</text>
            <text x="16" y="50" font-size="11" font-family="monospace" fill="#94a3b8">dummy 不存数据，dummy.next 才是真正的 head</text>

            <!-- 连线 -->
            <line x1="110" y1="100" x2="166" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-n)" />
            <line x1="240" y1="100" x2="286" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-n)" />
            <line x1="360" y1="100" x2="406" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-n)" />
            <line x1="480" y1="100" x2="506" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-n)" />

            <!-- dummy 哨兵 -->
            <rect x="40" y="70" width="70" height="60" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="75" y="90" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">dummy</text>
            <text x="75" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#94a3b8">(不存数据)</text>

            <!-- 节点 1 -->
            <rect x="170" y="70" width="70" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="205" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">data</text>
            <text x="205" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="205" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>

            <!-- 节点 2 -->
            <rect x="290" y="70" width="70" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="325" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">data</text>
            <text x="325" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <text x="325" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>

            <!-- 节点 3 -->
            <rect x="410" y="70" width="70" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="445" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">data</text>
            <text x="445" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="445" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>

            <!-- null -->
            <text x="516" y="100" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">null</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：哑节点结构——dummy 在前占位，真正数据从 dummy.next 开始</figcaption>
        </figure>

        <!-- 操作示意图：删除头节点（对比有无 dummy） -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：删除头节点 —— 有无 dummy 的对比</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">❌ 无 dummy：需特判 head = head.next</p>
            <svg viewBox="0 0 240 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="dm-nod" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="12" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">head</text>
              <line x1="28" y1="50" x2="52" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-nod)" />
              <line x1="112" y1="50" x2="136" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-nod)" />
              <line x1="196" y1="50" x2="220" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-nod)" />
              <rect x="56" y="25" width="56" height="50" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="84" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="84" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626">被删头</text>
              <rect x="140" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="168" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="228" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">null</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">head 本身被删，要单独写 head = head.next 特判</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">✅ 有 dummy：dummy.next 直接跳过</p>
            <svg viewBox="0 0 300 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="dm-yes" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="84" y1="50" x2="108" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-yes)" />
              <line x1="168" y1="50" x2="192" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-yes)" />
              <line x1="252" y1="50" x2="276" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#dm-yes)" />
              <rect x="28" y="25" width="56" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="56" y="50" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">dummy</text>
              <rect x="112" y="25" width="56" height="50" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="140" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="140" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626">被删头</text>
              <rect x="196" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="224" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="284" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">null</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">dummy.next = dummy.next.next，与删除中间节点同一套代码</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 什么是哑节点 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是哑节点（Dummy Node）？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>哑节点是一个不存储实际数据的虚拟节点</strong>，通常放在结果链表的头部作为"占位符"。
          它的作用很简单：<strong>让头节点和其他节点享受完全相同的处理逻辑</strong>，无需特判 head 是否为 null 或是否被修改。
        </p>

        <p class="text-slate-600 mb-4 leading-relaxed">
          任何涉及<strong>"构造新链表"</strong>或<strong>"可能修改原链表头部"</strong>的题目，哑节点都是首选技巧。
        </p>

        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
          <h4 class="font-semibold text-slate-700 mb-2">思想对比</h4>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-slate-500 mb-1 font-semibold">❌ 不用哑节点</p>
              <div class="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg overflow-x-auto font-mono">
if (head === null) return null
if (needRemoveHead)
  head = head.next
// 头节点要特判，尾节点也要
// 代码分散，容易漏边界
              </div>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1 font-semibold">✅ 用哑节点</p>
              <div class="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg overflow-x-auto font-mono">
const dummy = new ListNode(0)
dummy.next = head
// 所有节点统一处理，无需特判
return dummy.next
              </div>
            </div>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          哑节点就像 <strong>Vue 的 Transition 组件中的根元素</strong>——它本身不渲染到 DOM，但为子元素提供了统一的包裹逻辑。<br/>
          也像 <strong>React Fragment</strong>：不产生额外的 DOM 节点，但让多个子元素能被统一处理而无需特判第一个/最后一个。
          </p>
        </aside>
      </section>

      <!-- 2. 合并两个有序链表 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          合并两个有序链表（LeetCode 21）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这是哑节点最经典的应用场景。不依赖任何外部数据结构，原地合并两条已排序的链表。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">不使用哑节点的版本 —— 代码冗长</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeMergeNoDummy" title="mergeNoDummy.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">使用哑节点的版本 —— 简洁优雅</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeMergeDummy" title="mergeWithDummy.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 对比总结：</strong><br/>
          不用哑节点：10 行用于初始化 head + 特判第一节点 + 空链表处理。<br/>
          用哑节点：3 行（创建 dummy + 返回 dummy.next），主体循环逻辑完全相同。代码量减少 30%，可读性大幅提升。
          </p>
        </aside>
      </section>

      <!-- 3. 移除链表元素 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          移除链表元素（LeetCode 203）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          删除链表中所有值等于 target 的节点。<strong>头节点也可能被删除</strong>，这是哑节点大显身手的场景。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">不使用哑节点 —— 需要 while 循环处理头节点</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeRemoveNoDummy" title="removeNoDummy.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">使用哑节点 —— 统一处理所有节点</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeRemoveDummy" title="removeWithDummy.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘记处理连续的目标值。</strong><br/>
          如链表 1→2→2→3，要删 2。如果不用哑节点，可能需要 while 循环反复删头。<br/>
          用哑节点后：while(curr.next) 的逻辑天然支持连续删除——删完第一个 2，curr 不动，下一轮继续判断下一个（还是 2），再删。
          </p>
        </aside>
      </section>

      <!-- 4. 两数相加 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          两数相加（LeetCode 2）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          两条链表表示两个<strong>逆序存储</strong>的数字（个位在头节点），返回它们的和也用相同格式的链表表示。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeAddTwo" title="addTwoNumbers.ts" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>执行流程（以 342 + 465 为例）：</strong>
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>l1=2→4→3（表示 342），l2=5→6→4（表示 465），dummy 初始为 0</li>
          <li>第 i=0 位：2+5=7，进位=0，结果链表: dummy→7</li>
          <li>第 i=1 位：4+6=10，进位=1，结果链表: dummy→7→0</li>
          <li>第 i=2 位：3+4+1(carry)=8，进位=0，结果链表: dummy→7→0→8</li>
          <li>返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dummy.next</code> 即 7→0→8（表示 807 = 342+465）</li>
        </ol>
      </section>

      <!-- 5. 深拷贝带随机指针的链表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          深拷贝带随机指针的链表（LeetCode 138）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个节点除了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next</code> 还有一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">random</code> 指针（指向链表中任意节点或 null）。需要深拷贝。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeDeepCopy" title="copyRandomList.ts" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 技巧：HashMap 充当"老节点→新节点"的映射。</strong>这是处理图形拷贝（Graph Clone）的同一套路。第一次遍历创建所有新节点并建立映射，第二次遍历设置指针。Map 确保 O(1) 查找任意老节点对应的新节点。</p>
        </aside>
      </section>

      <!-- 6. 哑节点使用时机总结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          何时使用哑节点？一张表说清楚
        </h2>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">是否需要</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">原因</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">构造新链表</td>
                <td class="px-4 py-2 border border-slate-200">✅ 强烈推荐</td>
                <td class="px-4 py-2 border border-slate-200">新链表初始为空，哑节点避免特判第一个节点</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">可能修改头节点</td>
                <td class="px-4 py-2 border border-slate-200">✅ 推荐</td>
                <td class="px-4 py-2 border border-slate-200">如删除头节点、插入到头部之前</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">合并两条链表</td>
                <td class="px-4 py-2 border border-slate-200">✅ 强烈推荐</td>
                <td class="px-4 py-2 border border-slate-200">典型应用，见 LeetCode 21</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">只在原链表上遍历/查找</td>
                <td class="px-4 py-2 border border-slate-200">❌ 不需要</td>
                <td class="px-4 py-2 border border-slate-200">不改变结构，不需要哑节点</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">反转链表</td>
                <td class="px-4 py-2 border border-slate-200">❌ 不需要</td>
                <td class="px-4 py-2 border border-slate-200">三指针法已足够简洁</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">奇偶链表重排</td>
                <td class="px-4 py-2 border border-slate-200">✅ 有帮助</td>
                <td class="px-4 py-2 border border-slate-200">构造奇链和偶链时避免特判</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 面试金句：</strong> "Whenever you modify the head of a list, use a dummy node." —— 面试官看到你自觉地加 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">dummy = new ListNode(0)</code>，就知道你对边界处理有清醒的认识。这是区分"会用链表"和"理解链表"的分水岭。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：哑节点统一头尾处理
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">灰色虚线节点 = <strong>dummy</strong>（不存数据）。删除/头插都从 dummy 出发，<strong>头节点和中段节点逻辑完全一致</strong>，无需特判。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 数据节点: {{ dmNodes.length - 1 }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ dmStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">⏱️ 删除 O(n)·头插 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="dmRemoveVal" :disabled="dmBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">删除 value=2</button>
          <button @mousedown="dmRemoveHead" :disabled="dmBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">删除头部</button>
          <button @mousedown="dmInsertHead" :disabled="dmBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">头插</button>
          <button @mousedown="dmReset" :disabled="dmBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="dmBox" class="w-full relative overflow-x-auto" :style="{height:dmH+'px'}">
          <v-stage :config="{width:dmW, height:dmH}">
            <v-layer>
              <v-arrow v-for="(n,i) in dmNodes.slice(0,-1)" :key="'a'+n.id" :config="dmArrow(i)" />
              <v-rect v-for="n in dmNodes" :key="n.id" :config="dmR(n)" />
              <v-text v-for="n in dmNodes" :key="'t'+n.id" :config="dmT(n)" />
              <v-text :config="{x:dmNodes.length?dmNodes[dmNodes.length-1].x+DMW+12:DMBX, y:DMNY, text:'null', fontSize:13, fill:dmC.muted}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 7. 总结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>哑节点 = 不存数据的虚拟头节点</strong>，让 head 和其他节点享受相同的处理逻辑。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>核心模式：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">dummy.next = head</code>，处理完后 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">return dummy.next</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>完美适用于：合并链表、删除节点、构造新链表、两数相加。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>消除了"头节点为空"和"要修改头节点"两个最常见的边界判断。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>代码量减少 20-30%，可读性大幅提升——对面试尤为重要。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>哑节点和双向链表哨兵节点（上一篇）是同一思想在不同场景的体现。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-2-doubly" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：双向链表与哨兵节点</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-4-lru" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：LRU Cache 实现 →</RouterLink>
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
  { id: "sec-1", name: "什么是哑节点" },
  { id: "sec-2", name: "合并两个有序链表" },
  { id: "sec-3", name: "移除链表元素" },
  { id: "sec-4", name: "两数相加" },
  { id: "sec-5", name: "深拷贝随机指针链表" },
  { id: "sec-6", name: "使用时机总结" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "总结" },
]

// ===== 🎬 哑节点动画 =====
const dmC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',ghost:'#e2e8f0',blue:'#60a5fa'}
const dmW=ref(700), dmH=ref(200)
const DMW=56, DMH2=34, DMGAP=92, DMNY=100, DMBX=24
interface DMNode { id:number; val:number; dummy:boolean; color:string; s:number; x:number }
const dmNodes=reactive<DMNode[]>([])
const dmBusy=ref(false), dmStatus=ref(''), dmNid=ref(10)
const dmBox=ref<HTMLDivElement>()
const d4=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function dmLayout(){ dmNodes.forEach((n,i)=>{ n.x=DMBX+i*DMGAP }) }
function dmInit(){ dmNodes.length=0; dmNodes.push({id:0,val:-1,dummy:true,color:dmC.muted,s:1,x:0}); [1,2,3,2,4].forEach((v,i)=>dmNodes.push({id:i+1,val:v,dummy:false,color:dmC.cyan,s:1,x:0})); dmLayout() }
function dmR(n:any){ const s=n.s??1; return {x:n.x+(DMW*(1-s))/2, y:DMNY+(DMH2*(1-s))/2, width:DMW*s, height:DMH2*s, fill:n.dummy?dmC.ghost:n.color, cornerRadius:6, stroke:n.dummy?'#94a3b8':'#64748b', strokeWidth:1.5, dash:n.dummy?[4,3]:undefined, shadowColor:'rgba(0,0,0,.1)', shadowBlur:4, shadowOffsetY:2} }
function dmT(n:any){ const s=n.s??1; return {x:n.x+(DMW*(1-s))/2, y:DMNY+(DMH2*(1-s))/2, width:DMW*s, height:DMH2*s, text:n.dummy?'dummy':String(n.val), fontSize:n.dummy?12:16, fontFamily:'monospace', fontStyle:n.dummy?'normal':'bold', fill:n.dummy?dmC.muted:dmC.text, align:'center', verticalAlign:'middle'} }
function dmArrow(i:number){ const a=dmNodes[i],b=dmNodes[i+1]; return {points:[a.x+DMW, DMNY, b.x, DMNY], fill:dmC.muted, stroke:dmC.muted, strokeWidth:2, pointerLength:7, pointerWidth:5} }
async function dmAct(msg:string,fn:()=>Promise<void>){ if(dmBusy.value)return; dmBusy.value=true; dmStatus.value=msg; try{await fn()}catch(_){}; await d4(300); dmBusy.value=false; dmStatus.value='' }
function dmRemoveVal(){ dmAct('删除 value=2 — curr 从 dummy 出发', async()=>{ let ci=0; while(ci<dmNodes.length-1){ dmNodes[ci].color=dmC.orange; const ni=ci+1; dmNodes[ni].color=dmC.blue; await d4(280); if(dmNodes[ni].val===2){ dmNodes[ni].color=dmC.red; await d4(220); dmNodes[ni].s=0; dmNodes[ni].color=dmC.ghost; dmLayout(); await d4(220); dmNodes.splice(ni,1); dmLayout() } else { dmNodes[ci].color=dmC.cyan; ci=ni } await d4(150) } dmNodes.forEach(n=>n.color=n.dummy?dmC.muted:dmC.cyan) }) }
function dmRemoveHead(){ if(dmNodes.length<2)return; dmAct('删除头部 — dummy.next 直接跳过', async()=>{ const h=dmNodes[1]; h.color=dmC.red; await d4(300); h.s=0; h.color=dmC.ghost; dmLayout(); await d4(250); dmNodes.splice(1,1); dmLayout() }) }
function dmInsertHead(){ dmAct('头插 — dummy.next 指向新节点', async()=>{ const v=~~(Math.random()*90+10); const nb:DMNode={id:dmNid.value++,val:v,dummy:false,color:dmC.green,s:0,x:0}; dmNodes.splice(1,0,nb); dmLayout(); await d4(60); nb.s=1; dmLayout(); await d4(450); nb.color=dmC.cyan }) }
function dmReset(){ dmBusy.value=false; dmInit() }
let roDM:ResizeObserver|null=null
onMounted(()=>{ dmInit(); if(dmBox.value){ dmW.value=dmBox.value.clientWidth; roDM=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200) dmW.value=Math.max(420,w)}); roDM.observe(dmBox.value) }})
onUnmounted(()=>roDM?.disconnect())

const codeMergeNoDummy = `// 不用哑节点：需要特判第一个节点
function mergeTwoLists(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  // 空链表特判
  if (l1 === null) return l2
  if (l2 === null) return l1

  // 先确定 head（取较小的）——这是哑节点消掉的代码
  let head: ListNode<number>
  if (l1.val <= l2.val) {
    head = l1
    l1 = l1.next
  } else {
    head = l2
    l2 = l2.next
  }

  // 主体循环 —— 这部分和哑节点版本相同
  let curr = head
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 ?? l2
  return head
}`

const codeMergeDummy = `// 用哑节点：所有节点统一追加
function mergeTwoLists(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  const dummy = new ListNode(0)       // 哑节点
  let curr: ListNode<number> = dummy  // curr 从 dummy 开始

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 ?? l2               // 接上剩余部分
  return dummy.next                   // 跳过哑节点
}
// 时间复杂度 O(m+n)，空间 O(1)（只需一个哑节点）`

const codeRemoveNoDummy = `// 不用哑节点：需要 while 处理连续的头节点
function removeElements(
  head: ListNode<number> | null,
  val: number
): ListNode<number> | null {
  // ⚠️ 先处理"头节点就是要删的值"（可能是连续多个）
  while (head !== null && head.val === val) {
    head = head.next
  }

  // 再处理中间和尾部
  let curr = head
  while (curr !== null && curr.next !== null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next
    } else {
      curr = curr.next
    }
  }
  return head
}`

const codeRemoveDummy = `// 用哑节点：头节点和中间节点统一处理
function removeElements(
  head: ListNode<number> | null,
  val: number
): ListNode<number> | null {
  const dummy = new ListNode(0)
  dummy.next = head

  let curr: ListNode<number> = dummy
  while (curr.next !== null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next  // 跳过目标节点
      // curr 不动，继续检查新的 curr.next
    } else {
      curr = curr.next             // 安全，前进
    }
  }
  return dummy.next
}
// 关键：curr 从 dummy 开始，检查 curr.next
// 这样即使头节点要删，也是统一通过 curr.next 跳过
// 连续目标值天然支持（curr 不动，下一轮继续检查）`

const codeAddTwo = `// 两数相加：哑节点构造结果链表
function addTwoNumbers(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  const dummy = new ListNode(0)
  let curr = dummy
  let carry = 0

  // 只要还有节点或者还有进位，就继续
  while (l1 !== null || l2 !== null || carry !== 0) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry
    carry = Math.floor(sum / 10)
    curr.next = new ListNode(sum % 10)

    curr = curr.next
    if (l1 !== null) l1 = l1.next
    if (l2 !== null) l2 = l2.next
  }

  return dummy.next
}
// 时间复杂度 O(max(m, n))，空间 O(max(m, n))（结果链表的长度）`

const codeDeepCopy = `class RandomListNode {
  val: number
  next: RandomListNode | null
  random: RandomListNode | null
  constructor(val: number, next?: RandomListNode | null, random?: RandomListNode | null) {
    this.val = val
    this.next = next ?? null
    this.random = random ?? null
  }
}

// 用哑节点 + HashMap 深拷贝
function copyRandomList(
  head: RandomListNode | null
): RandomListNode | null {
  if (head === null) return null

  const map = new Map<RandomListNode, RandomListNode>()

  // 第1遍: 创建所有新节点，建立 old→new 映射
  let curr: RandomListNode | null = head
  while (curr !== null) {
    map.set(curr, new RandomListNode(curr.val))
    curr = curr.next
  }

  // 第2遍: 设置 next 和 random 指针
  curr = head
  while (curr !== null) {
    const copy = map.get(curr)!
    copy.next = curr.next ? map.get(curr.next)! : null
    copy.random = curr.random ? map.get(curr.random)! : null
    curr = curr.next
  }

  return map.get(head)!
}
// 时间 O(n)，空间 O(n)（HashMap 存储 n 个节点映射）`
</script>
