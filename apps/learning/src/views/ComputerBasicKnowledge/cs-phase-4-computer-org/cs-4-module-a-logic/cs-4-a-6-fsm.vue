<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">有限状态机（FSM）</h1><p class="text-sm text-slate-500 mt-1">Moore/Mealy 机——CPU 控制器的数学模型</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-a-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🤖</span>FSM = 状态 + 转换规则</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>FSM ≈ <strong>switch-case + 状态变量</strong>。你在代码里写的状态机（如 Promise 的 pending→fulfilled→rejected）就是 FSM。CPU 的控制单元是一个<strong>巨大的 FSM</strong>——当前状态决定下一步做什么。</p></aside>
        <p class="text-slate-600 leading-relaxed">FSM 由三要素组成：<strong>状态寄存器</strong>（存当前状态）、<strong>下一状态逻辑</strong>（组合电路，计算下一状态）、<strong>输出逻辑</strong>（根据状态产生控制信号）。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>Moore 机 vs Mealy 机</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">Moore 机</th><th class="px-4 py-2 border font-semibold text-slate-700">Mealy 机</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-medium">输出取决于</td><td class="px-4 py-2 border"><strong>仅当前状态</strong></td><td class="px-4 py-2 border">当前状态 <strong>+ 当前输入</strong></td></tr>
              <tr><td class="px-4 py-2 border font-medium">输出时机</td><td class="px-4 py-2 border">时钟沿后（同步）</td><td class="px-4 py-2 border">输入变化时立即（异步）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">状态数</td><td class="px-4 py-2 border">较多（每个输出组合需要独立状态）</td><td class="px-4 py-2 border"><strong>较少</strong>（同一状态可有不同输出）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">稳定性</td><td class="px-4 py-2 border text-emerald-600">高——输出仅在时钟沿变化</td><td class="px-4 py-2 border">低——输入毛刺直接影响输出</td></tr>
              <tr><td class="px-4 py-2 border font-medium">CPU 用途</td><td class="px-4 py-2 border">简单控制器、状态指示</td><td class="px-4 py-2 border"><strong>CPU 主控制器</strong>（少状态，多输出）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 实际 CPU：</strong>大多数 CPU 控制器用 <strong>Mealy 机</strong>——同样的"执行"状态，根据 opcode 产生不同的 ALU 控制信号。这样状态数少，电路面积小。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>CPU 控制器的 FSM 实例</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">简化版 CPU 的指令执行状态机（5 级流水线的控制逻辑）：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">状态</th><th class="px-4 py-2 border font-semibold text-slate-700">操作</th><th class="px-4 py-2 border font-semibold text-slate-700">下一状态</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border">FETCH</td><td class="px-4 py-2 border">PC→地址总线，读内存，IR←[MEM]</td><td class="px-4 py-2 border">DECODE</td></tr><tr><td class="px-4 py-2 border">DECODE</td><td class="px-4 py-2 border">译码 opcode，读寄存器文件</td><td class="px-4 py-2 border">EXECUTE</td></tr><tr><td class="px-4 py-2 border">EXECUTE</td><td class="px-4 py-2 border">ALU 运算，计算地址</td><td class="px-4 py-2 border">MEM（如果是访存指令）/ WRITEBACK</td></tr><tr><td class="px-4 py-2 border">MEM</td><td class="px-4 py-2 border">读/写数据内存</td><td class="px-4 py-2 border">WRITEBACK</td></tr><tr><td class="px-4 py-2 border">WRITEBACK</td><td class="px-4 py-2 border">结果写回寄存器文件</td><td class="px-4 py-2 border">FETCH</td></tr></tbody></table></div>
        <p class="text-slate-600 text-sm">每个状态对应一组<strong>控制信号</strong>（如 ALUOp、MemRead、RegWrite）。FSM 的输出就是这些信号的 0/1 值。这就是 <strong>CPU 控制单元的本质——一个 FSM</strong>。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>FSM = 状态寄存器 + 下一状态逻辑 + 输出逻辑</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>Moore：输出仅取决于状态（稳定，状态多）。Mealy：输出取决于状态+输入（灵活，状态少）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>CPU 控制单元 = Mealy FSM</strong>——5 状态（FETCH→DECODE→EXECUTE→MEM→WRITEBACK）+ 指令译码控制信号</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-5-register-counter" class="text-slate-500 hover:text-amber-600 flex items-center gap-1">← 上一节：寄存器与计数器</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-b-number/cs-4-b-1-integer" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：整数表示 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"FSM概述"},{id:"sec-2",name:"Moore vs Mealy"},{id:"sec-3",name:"CPU控制器FSM"},{id:"sec-4",name:"小结"}]
</script>
