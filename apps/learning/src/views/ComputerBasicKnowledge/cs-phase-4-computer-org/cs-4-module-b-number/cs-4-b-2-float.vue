<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">IEEE 754 浮点数</h1><p class="text-sm text-slate-500 mt-1">为什么 0.1+0.2≠0.3——浮点数的存储、精度与陷阱</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-b-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🔢</span>科学计数法的二进制版</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>IEEE 754 ≈ <strong>二进制的科学计数法</strong>。就像 1.5×10³ = 1500，浮点数存的是 <strong>尾数×2<sup>指数</sup></strong>。这就是 <code class="bg-purple-100 px-1 rounded text-xs font-mono">0.1+0.2=0.30000000000000004</code> 的根源——0.1 在二进制中是<strong>无限循环小数</strong>。</p></aside>
        <p class="text-slate-600 leading-relaxed">IEEE 754 定义了三部分：<strong>符号 S</strong>（1位）、<strong>指数 E</strong>（8/11位，偏移存储）、<strong>尾数 M</strong>（23/52位，隐含前导1）。值 = (-1)<sup>S</sup> × (1.M) × 2<sup>E-bias</sup>。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>单精度 (float32) vs 双精度 (float64)</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">float32</th><th class="px-4 py-2 border font-semibold text-slate-700">float64</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">总位数</td><td class="px-4 py-2 border font-mono text-xs">32</td><td class="px-4 py-2 border font-mono text-xs">64</td></tr><tr><td class="px-4 py-2 border">符号</td><td class="px-4 py-2 border">1 位</td><td class="px-4 py-2 border">1 位</td></tr><tr><td class="px-4 py-2 border">指数（偏移）</td><td class="px-4 py-2 border">8 位（bias=127）</td><td class="px-4 py-2 border">11 位（bias=1023）</td></tr><tr><td class="px-4 py-2 border">尾数</td><td class="px-4 py-2 border">23 位（~7 位十进制精度）</td><td class="px-4 py-2 border">52 位（~16 位十进制精度）</td></tr><tr><td class="px-4 py-2 border">范围</td><td class="px-4 py-2 border">±3.4×10³⁸</td><td class="px-4 py-2 border">±1.8×10³⁰⁸</td></tr><tr><td class="px-4 py-2 border">代码</td><td class="px-4 py-2 border font-mono text-xs">C float / Go float32 / JS 无</td><td class="px-4 py-2 border font-mono text-xs">C double / Go float64 / <strong>JS Number</strong></td></tr></tbody></table></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>0.1 + 0.2 ≠ 0.3 的根源</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">0.1（十进制）= 0.000110011001100...（二进制，0011 无限循环）。float64 只能存 52 位尾数——后面的被<strong>截断</strong>。所以 0.1 在计算机里是<strong>近似值</strong>。两个近似值相加 ≈ 0.30000000000000004。</p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 永远不要用 == 比较浮点数！</strong>用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">|a-b| &lt; epsilon</code> 判断相等。金融计算用定点（decimal）或整数（存分而不是元）。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>特殊值</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">值</th><th class="px-4 py-2 border font-semibold text-slate-700">E</th><th class="px-4 py-2 border font-semibold text-slate-700">M</th><th class="px-4 py-2 border font-semibold text-slate-700">含义</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border">±0</td><td class="px-4 py-2 border">全0</td><td class="px-4 py-2 border">全0</td><td class="px-4 py-2 border">有 +0 和 -0（1/+0=∞，1/-0=-∞）</td></tr><tr><td class="px-4 py-2 border">±∞</td><td class="px-4 py-2 border">全1</td><td class="px-4 py-2 border">全0</td><td class="px-4 py-2 border">溢出结果。1/0=∞，log(0)=-∞</td></tr><tr><td class="px-4 py-2 border">NaN</td><td class="px-4 py-2 border">全1</td><td class="px-4 py-2 border">≠0</td><td class="px-4 py-2 border">未定义操作。0/0、∞-∞、sqrt(-1)</td></tr><tr><td class="px-4 py-2 border">非规格化数</td><td class="px-4 py-2 border">全0</td><td class="px-4 py-2 border">≠0</td><td class="px-4 py-2 border">极小数（接近 0），前导1 变为 0，精度降低但防止下溢</td></tr></tbody></table></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>IEEE 754 = (-1)<sup>S</sup>×(1.M)×2<sup>E-bias</sup>。符号+指数+尾数三段式</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>0.1+0.2≠0.3</strong>——十进制小数转二进制可能无限循环</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>float32 ≈ 7 位精度，float64 ≈ 16 位。JS Number = float64</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>NaN ≠ NaN（唯一不等于自身的值）。用 isNaN() 判断</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-b-number/cs-4-b-1-integer" class="text-slate-500 hover:text-amber-600 flex items-center gap-1">← 上一节：整数表示</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-b-number/cs-4-b-3-alu" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：ALU 设计 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"float32/64"},{id:"sec-3",name:"0.1+0.2陷阱"},{id:"sec-4",name:"特殊值"},{id:"sec-5",name:"小结"}]
</script>
