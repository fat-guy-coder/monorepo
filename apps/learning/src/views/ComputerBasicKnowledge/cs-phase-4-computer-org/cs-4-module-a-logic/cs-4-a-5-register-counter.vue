<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">寄存器与计数器</h1><p class="text-sm text-slate-500 mt-1">移位寄存器 · 纹波计数器 · 同步计数器——CPU 的存储与计数单元</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-a-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📦</span>寄存器 = N 个 D 触发器</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">寄存器是 CPU 中最基本的存储单元——<strong>一个时钟周期存储一个 N 位值</strong>。PC、IR、通用寄存器（RAX/R0）、流水线寄存器都是寄存器。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>寄存器 ≈ <strong>变量</strong>——每个时钟周期可以被写入新值或保持原值。CPU 的寄存器文件 ≈ 一个<strong>超小型、超高速的数组</strong>（通常 16-32 个 64 位寄存器）。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>移位寄存器（Shift Register）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">每个时钟周期，所有位<strong>左移或右移一位</strong>。串行输入→并行输出（SIPO）或并行输入→串行输出（PISO）。</p>
        <div class="space-y-2 text-slate-600 text-sm mb-3"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>CPU 用途 1：乘法器。</strong>左移 1 位 = ×2，右移 1 位 = ÷2。配合加法器实现乘法（Booth 算法）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>CPU 用途 2：桶形移位器。</strong>单周期移任意位数——ARM 指令集的核心特性（每个指令都带移位）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>I/O：SPI 总线用移位寄存器做串并转换</strong></span></li></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>计数器</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">类型</th><th class="px-4 py-2 border font-semibold text-slate-700">原理</th><th class="px-4 py-2 border font-semibold text-slate-700">速度</th><th class="px-4 py-2 border font-semibold text-slate-700">CPU 用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">纹波计数器</td><td class="px-4 py-2 border">T 触发器串联——前一级输出作为后一级时钟。<strong>进位逐级传播</strong>。</td><td class="px-4 py-2 border">慢（O(N)延迟）</td><td class="px-4 py-2 border">分频器、看门狗定时器</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">同步计数器</td><td class="px-4 py-2 border">所有触发器<strong>共享同一时钟</strong>。用组合逻辑决定下一状态。</td><td class="px-4 py-2 border text-emerald-600">快（O(1)延迟）</td><td class="px-4 py-2 border"><strong>PC（程序计数器）</strong></td></tr>
              <tr><td class="px-4 py-2 border font-semibold">环形计数器</td><td class="px-4 py-2 border">单 1 循环移位（0001→0010→0100→1000→0001）</td><td class="px-4 py-2 border">快</td><td class="px-4 py-2 border">控制器状态机、多相时钟</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 PC（程序计数器）就是一个同步计数器——</strong>每个时钟周期 PC←PC+4（x86）或 PC←PC+1（ARM Thumb），顺序执行时自动递增。跳转指令直接改写 PC 值。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>寄存器 = N 个 D 触发器 + 共享时钟，是 CPU 的<strong>"变量存储"</strong></span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>移位寄存器：左移=×2，配合加法器做乘法</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>PC = 同步计数器</strong>——顺序执行自动递增，跳转直接改写</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-4-sequential" class="text-slate-500 hover:text-amber-600 flex items-center gap-1">← 上一节：时序逻辑电路</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-6-fsm" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：有限状态机 FSM →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"寄存器基础"},{id:"sec-2",name:"移位寄存器"},{id:"sec-3",name:"计数器"},{id:"sec-4",name:"小结"}]
</script>
