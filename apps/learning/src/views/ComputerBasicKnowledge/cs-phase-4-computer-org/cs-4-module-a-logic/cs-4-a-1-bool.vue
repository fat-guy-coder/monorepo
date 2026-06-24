<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">布尔代数</h1><p class="text-sm text-slate-500 mt-1">与或非 · 真值表 · 卡诺图化简——计算机逻辑的数学基础</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-a-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>布尔代数 ≈ <strong>条件判断的数学形式</strong>。你写的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">if (a && !b) || c</code> 就是在做布尔运算。理解布尔代数 = 理解 CPU 为什么能用晶体管做 AND/OR/NOT —— 这是<strong>从代码到硅片的桥梁</strong>。</p></aside>
        <p class="text-slate-600 leading-relaxed">布尔代数（Boolean Algebra）由 George Boole 于 1854 年提出，用 <strong>0 和 1</strong> 两个值表达逻辑关系。它是数字电路的理论基础——CPU 里的每个逻辑门都在做布尔运算。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>三种基本运算</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">任何复杂逻辑都可以用 <strong>AND、OR、NOT</strong> 三种基本运算组合出来。这叫做<strong>功能完备性</strong>（Functional Completeness）。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">运算</th><th class="px-4 py-2 border font-semibold text-slate-700">符号</th><th class="px-4 py-2 border font-semibold text-slate-700">代码类比</th><th class="px-4 py-2 border font-semibold text-slate-700">真值表</th><th class="px-4 py-2 border font-semibold text-slate-700">电路符号</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">AND（与）</td><td class="px-4 py-2 border font-mono text-xs">A · B</td><td class="px-4 py-2 border font-mono text-xs">a && b</td><td class="px-4 py-2 border font-mono text-xs">0·0=0, 0·1=0, 1·0=0, 1·1=1</td><td class="px-4 py-2 border">D 形门</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">OR（或）</td><td class="px-4 py-2 border font-mono text-xs">A + B</td><td class="px-4 py-2 border font-mono text-xs">a || b</td><td class="px-4 py-2 border font-mono text-xs">0+0=0, 0+1=1, 1+0=1, 1+1=1</td><td class="px-4 py-2 border">弧形门</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">NOT（非）</td><td class="px-4 py-2 border font-mono text-xs">Ā 或 A'</td><td class="px-4 py-2 border font-mono text-xs">!a</td><td class="px-4 py-2 border font-mono text-xs">0'=1, 1'=0</td><td class="px-4 py-2 border">三角形+圆圈</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm mb-3"><strong>关键洞察：</strong>只用 NAND 门（与非）就能实现<strong>所有</strong>其他逻辑门。这就是为什么实际 CPU 里大量使用 NAND——工艺简单、成本低。</p>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>真值表（Truth Table）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">真值表是布尔表达式最直观的表达方式——列出<strong>所有可能的输入组合</strong>，对应每种组合的输出值。n 个输入 → 2ⁿ 行。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">A</th><th class="px-4 py-2 border font-semibold text-slate-700">B</th><th class="px-4 py-2 border font-semibold text-slate-700">A AND B</th><th class="px-4 py-2 border font-semibold text-slate-700">A OR B</th><th class="px-4 py-2 border font-semibold text-slate-700">A XOR B</th><th class="px-4 py-2 border font-semibold text-slate-700">NOT A</th></tr></thead>
            <tbody class="text-slate-600 font-mono text-xs text-center">
              <tr><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td></tr>
              <tr><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td></tr>
              <tr><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td></tr>
              <tr><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm">真值表 → 电路 的转化是<strong>自动的</strong>——给定任意真值表，都能用积之和（SOP）或和之积（POS）方法转化为逻辑电路。这是数字电路设计的核心流程。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>布尔代数定律</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">这些定律用于<strong>简化布尔表达式</strong>——减少逻辑门数量，降低电路延迟和功耗。对应代码中的<strong>条件优化</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">定律</th><th class="px-4 py-2 border font-semibold text-slate-700">表达式</th><th class="px-4 py-2 border font-semibold text-slate-700">代码等效</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">交换律</td><td class="px-4 py-2 border font-mono text-xs">A+B = B+A · A·B = B·A</td><td class="px-4 py-2 border font-mono text-xs">a||b === b||a</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">结合律</td><td class="px-4 py-2 border font-mono text-xs">(A+B)+C = A+(B+C)</td><td class="px-4 py-2 border font-mono text-xs">(a||b)||c === a||(b||c)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">分配律</td><td class="px-4 py-2 border font-mono text-xs">A·(B+C) = A·B + A·C</td><td class="px-4 py-2 border font-mono text-xs">a&&(b||c) === (a&&b)||(a&&c)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">德摩根律</td><td class="px-4 py-2 border font-mono text-xs">(A+B)' = A'·B' · (A·B)' = A'+B'</td><td class="px-4 py-2 border font-mono text-xs">!(a||b) === !a && !b</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">幂等律</td><td class="px-4 py-2 border font-mono text-xs">A+A = A · A·A = A</td><td class="px-4 py-2 border font-mono text-xs">a||a === a</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">互补律</td><td class="px-4 py-2 border font-mono text-xs">A + A' = 1 · A · A' = 0</td><td class="px-4 py-2 border font-mono text-xs">a || !a === true</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 德摩根律是最常用的：</strong>它让你把 AND 转成 OR（或反过来），在电路设计中可以<strong>统一用 NAND 门实现所有逻辑</strong>。实际 CPU 设计大量使用这一定律做门级优化。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>卡诺图（Karnaugh Map）简化</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">真值表可以直接转化为电路，但会产生<strong>冗余门</strong>。卡诺图是一种<strong>可视化</strong>的布尔表达式简化工具——通过圈相邻的 1 来找最简表达式。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">2 变量卡诺图</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse max-w-xs"><thead><tr class="bg-slate-100"><th class="px-4 py-2 border"></th><th class="px-4 py-2 border font-semibold">B=0</th><th class="px-4 py-2 border font-semibold">B=1</th></tr></thead>
            <tbody class="text-slate-600 text-center font-mono text-xs"><tr><td class="px-4 py-2 border font-semibold">A=0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td></tr><tr><td class="px-4 py-2 border font-semibold">A=1</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td></tr></tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm mb-3">上图：A=0,B=1 和 A=1,B=1 都是 1 → 圈起来 → 简化结果为 <strong>B</strong>（与 A 无关！）。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">圈 1 规则</h3>
        <ul class="space-y-1 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>圈 2ⁿ 个相邻的 1（2、4、8...）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>圈尽量大（越大越简化）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>每个 1 至少被圈一次</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>边缘是连通的（卡诺图是环面 torus）</span></li></ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>卡诺图适合 ≤4 变量。超过 4 个变量时用 <strong>Quine-McCluskey 算法</strong>（编程实现），现代 EDA 工具用更高效的启发式算法。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>布尔代数 = <strong>0/1 的逻辑运算系统</strong>，三种基本运算 AND/OR/NOT</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>真值表 → SOP → 逻辑电路，这是数字电路设计的标准流程</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>德摩根律</strong>是电路优化的核心——统一用 NAND 门实现所有逻辑</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>卡诺图是 ≤4 变量的可视化简化工具；更多变量用 QM 算法</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-1-bool" class="text-slate-300 cursor-default">← 上一节：已是第一篇</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-2-gates" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：基本逻辑门 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"三种基本运算"},{id:"sec-3",name:"真值表"},{id:"sec-4",name:"布尔定律"},{id:"sec-5",name:"卡诺图"},{id:"sec-6",name:"小结"}]
</script>
