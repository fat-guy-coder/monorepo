<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">整数表示</h1><p class="text-sm text-slate-500 mt-1">原码 · 反码 · 补码——CPU 如何用 0/1 表示正负数</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-b-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🔢</span>三种表示法</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>你在代码里写 <code class="bg-purple-100 px-1 rounded text-xs font-mono">int x = -5</code>，CPU 存的是 <code class="bg-purple-100 px-1 rounded text-xs font-mono">0xFFFFFFFB</code>（32位补码）。补码让 <strong>加法器直接算减法</strong>——不需要单独的减法电路。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">表示法</th><th class="px-4 py-2 border font-semibold text-slate-700">+5 (8位)</th><th class="px-4 py-2 border font-semibold text-slate-700">-5 (8位)</th><th class="px-4 py-2 border font-semibold text-slate-700">问题</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border font-semibold">原码</td><td class="px-4 py-2 border">00000101</td><td class="px-4 py-2 border">10000101</td><td class="px-4 py-2 border">两个 0（+0=00000000, -0=10000000），加减法需不同电路</td></tr><tr><td class="px-4 py-2 border font-semibold">反码</td><td class="px-4 py-2 border">00000101</td><td class="px-4 py-2 border">11111010</td><td class="px-4 py-2 border">仍有 ±0，进位需回绕（end-around carry）</td></tr><tr><td class="px-4 py-2 border font-semibold text-emerald-700">补码</td><td class="px-4 py-2 border text-emerald-700">00000101</td><td class="px-4 py-2 border text-emerald-700">11111011</td><td class="px-4 py-2 border text-emerald-700">✅ 唯一 0，加减法用同一电路。所有现代 CPU 使用</td></tr></tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>补码 = 现代 CPU 的唯一选择</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>补码的核心优势：减法 = 加法。</strong>A - B = A + (-B)<sub>补码</sub> = A + (~B + 1)。同一个加法器同时做加法和减法。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">快速求补码</h3>
        <p class="text-slate-600 text-sm mb-3"><strong>"取反加一"：</strong>-X = (~X) + 1。例：5 = 00000101 → 取反 = 11111010 → +1 = 11111011 = -5。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">补码的范围（N 位）</h3>
        <p class="text-slate-600 text-sm mb-3">有符号：-2<sup>N-1</sup> ~ 2<sup>N-1</sup>-1。8位=-128~127，32位≈-21亿~21亿。无符号：0 ~ 2<sup>N</sup>-1。</p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 最小负数的绝对值比最大正数大 1：</strong>8 位补码 -128 没有对应的 +128（因为 128 > 127 溢出）。<code class="bg-amber-100 px-1 rounded text-xs font-mono">abs(-128)</code> 在 C 中是<strong>未定义行为</strong>。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>溢出（Overflow）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">当运算结果超出 N 位补码的表示范围时溢出。</p>
        <div class="space-y-2 text-slate-600 text-sm mb-3"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>正溢出：</strong>正+正→负。01111111 + 00000001 = 10000000（127+1=-128）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>负溢出：</strong>负+负→正。10000000 + 11111111 = 01111111（-128+(-1)=127）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>检测：</strong>如果两个加数符号相同，但和的符号不同 → 溢出。硬件用<strong>最高位进位 ⊕ 次高位进位</strong>检测</span></li></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 CPU 的溢出标志（OF）：</strong>x86 在加法后设置 OF 标志位。高级语言（C/Go/Rust）<strong>默认不检查溢出</strong>——这是无数安全漏洞的来源。Rust 在 debug 模式检查溢出，release 模式用 wrapping 语义。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>补码 = 现代 CPU 唯一整数表示</strong>——减法 = 加法，零唯一</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>求补码：取反 + 1</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>溢出：符号相同时结果符号不同 → OF=1。硬件用进位异或检测</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-6-fsm" class="text-slate-500 hover:text-amber-600 flex items-center gap-1">← 上一节：有限状态机</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-b-number/cs-4-b-2-float" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：IEEE 754 浮点数 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"三种表示法"},{id:"sec-2",name:"补码详解"},{id:"sec-3",name:"溢出"},{id:"sec-4",name:"小结"}]
</script>
