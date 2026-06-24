<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">基本逻辑门</h1><p class="text-sm text-slate-500 mt-1">CMOS NAND/NOR 晶体管级实现——从布尔代数到硅片的桥梁</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-a-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🔌</span>从布尔代数到晶体管</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>逻辑门 ≈ <strong>CPU 的"原子指令"</strong>——就像 AND/OR/NOT 是你的编程语言里的逻辑运算符，<strong>它们被做成了晶体管电路</strong>。理解 NAND 为什么最重要 ≈ 理解为什么汇编里只有几个基本指令。</p></aside>
        <p class="text-slate-600 leading-relaxed">布尔代数定义了逻辑，但<strong>晶体管</strong>让它变成物理现实。现代 CPU 使用 <strong>CMOS（互补金属氧化物半导体）</strong> 工艺——用 NMOS 和 PMOS 两种互补的晶体管构建逻辑门，功耗极低。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>MOSFET 开关模型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">把 MOSFET 理解为一个<strong>电压控制的开关</strong>：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">类型</th><th class="px-4 py-2 border font-semibold text-slate-700">Gate=1 (高电压)</th><th class="px-4 py-2 border font-semibold text-slate-700">Gate=0 (低电压)</th><th class="px-4 py-2 border font-semibold text-slate-700">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">NMOS</td><td class="px-4 py-2 border text-emerald-600">导通（开关闭合）</td><td class="px-4 py-2 border text-red-600">截止（开关断开）</td><td class="px-4 py-2 border">拉低到 GND（传 0）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">PMOS</td><td class="px-4 py-2 border text-red-600">截止（开关断开）</td><td class="px-4 py-2 border text-emerald-600">导通（开关闭合）</td><td class="px-4 py-2 border">拉高到 VDD（传 1）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm mb-3"><strong>NMOS 传 0 好，PMOS 传 1 好。</strong>CMOS 的核心思想就是把两者组合——用 PMOS 拉高、用 NMOS 拉低，确保<strong>任何时刻只有一个导通</strong>（零静态功耗）。</p>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>三大基本门电路</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">NOT（反相器）— 1 个 PMOS + 1 个 NMOS</h3>
        <p class="text-slate-600 text-sm mb-3">输入 A=1 → NMOS 导通 → 输出拉到 GND=0。输入 A=0 → PMOS 导通 → 输出拉到 VDD=1。<strong>2 个晶体管实现取反。</strong></p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">NAND（与非）— 2 个 PMOS 并联 + 2 个 NMOS 串联</h3>
        <p class="text-slate-600 text-sm mb-3">PMOS 并联：任一输入为 0 就拉高。NMOS 串联：两个输入都为 1 才拉低。输出 = NOT(A AND B)。<strong>4 个晶体管。</strong></p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">NOR（或非）— 2 个 PMOS 串联 + 2 个 NMOS 并联</h3>
        <p class="text-slate-600 text-sm mb-3">PMOS 串联：两个输入都为 0 才拉高。NMOS 并联：任一输入为 1 就拉低。输出 = NOT(A OR B)。<strong>4 个晶体管。</strong></p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4"><p class="text-sm text-emerald-800"><strong>✅ 为什么 NAND/NOR 比 AND/OR 更基础：</strong>AND = NAND + NOT，需要 6 个晶体管（4+2）。NAND 只需要 4 个。所以实际电路中<strong>优先用 NAND/NOR</strong>，只在必要时才加反相器。整个 CPU 可以只用 NAND 门构建——这就是 <strong>NAND 的功能完备性</strong>。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>使用 NAND 构建一切</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">目标门</th><th class="px-4 py-2 border font-semibold text-slate-700">用 NAND 实现</th><th class="px-4 py-2 border font-semibold text-slate-700">NAND 数量</th></tr></thead>
            <tbody class="text-slate-600 font-mono text-xs">
              <tr><td class="px-4 py-2 border">NOT</td><td class="px-4 py-2 border">NAND(A, A)</td><td class="px-4 py-2 border">1</td></tr>
              <tr><td class="px-4 py-2 border">AND</td><td class="px-4 py-2 border">NOT(NAND(A, B)) = NAND(NAND(A,B), NAND(A,B))</td><td class="px-4 py-2 border">2</td></tr>
              <tr><td class="px-4 py-2 border">OR</td><td class="px-4 py-2 border">NAND(NOT(A), NOT(B))</td><td class="px-4 py-2 border">3</td></tr>
              <tr><td class="px-4 py-2 border">NOR</td><td class="px-4 py-2 border">NOT(OR) = NAND实现OR后再接NOT</td><td class="px-4 py-2 border">4</td></tr>
              <tr><td class="px-4 py-2 border">XOR</td><td class="px-4 py-2 border">NAND(NAND(A,NAND(A,B)), NAND(B,NAND(A,B)))</td><td class="px-4 py-2 border">4</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>传播延迟与扇出</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">逻辑门不是瞬间完成的——每个门有 <strong>传播延迟（Propagation Delay）</strong>，通常在<strong>皮秒（ps）级</strong>。这个延迟决定了 CPU 的最高时钟频率。</p>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>传播延迟 t<sub>pd</sub>：</strong>输入变化到输出稳定的时间。CMOS NAND ≈ 10-20ps（7nm 工艺）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>扇出（Fan-out）：</strong>一个门能驱动多少个后续门。超过扇出限制 → 信号质量下降/延迟增加</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>关键路径：</strong>电路中<strong>最长的门延迟链</strong>决定了最高时钟频率。这就是为什么 CPU 设计要不断优化关键路径</span></li></ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-3"><p class="text-sm text-amber-800"><strong>⚠️ 实际数字：</strong>现代 5nm CPU 一个 NAND 门的延迟约 <strong>5-8 皮秒</strong>。一个时钟周期（5GHz = 200ps）能容纳约 <strong>20-30 级逻辑门</strong>。这就是 CPU 流水线深度的物理上限。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>CMOS = NMOS（传 0）+ PMOS（传 1）互补工作，零静态功耗</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>NAND/NOR 各需 <strong>4 个晶体管</strong>；NOT 只需 2 个</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>只用 NAND 就能造出整个 CPU</strong>——功能完备性</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>传播延迟决定时钟频率上限；关键路径优化是 CPU 设计的核心</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-1-bool" class="text-slate-500 hover:text-amber-600 flex items-center gap-1">← 上一节：布尔代数</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-3-combinational" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：组合逻辑电路 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"MOSFET开关"},{id:"sec-3",name:"三大基本门"},{id:"sec-4",name:"NAND构建一切"},{id:"sec-5",name:"延迟与扇出"},{id:"sec-6",name:"小结"}]
</script>
