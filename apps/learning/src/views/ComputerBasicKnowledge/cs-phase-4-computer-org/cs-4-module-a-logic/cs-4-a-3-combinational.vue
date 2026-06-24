<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">组合逻辑电路</h1><p class="text-sm text-slate-500 mt-1">加法器 · 译码器 · 多路复用器——从逻辑门到 ALU 的基石</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-a-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🧮</span>什么是组合逻辑</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>组合逻辑 ≈ <strong>纯函数（Pure Function）</strong>——输出只取决于当前输入，无状态、无记忆、无时钟。就像 <code class="bg-purple-100 px-1 rounded text-xs font-mono">function add(a,b) => a+b</code>——同样的输入永远得到同样的输出。CPU 的 ALU 就是由大规模组合逻辑构成的。</p></aside>
        <p class="text-slate-600 leading-relaxed">组合逻辑电路是<strong>无记忆</strong>的——当前输出仅由当前输入决定。与之对应的<strong>时序逻辑</strong>（下一节）有状态和时钟。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>加法器——CPU 计算的核心</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">CPU 的 ALU 中最基础的操作就是<strong>加法</strong>。减法用补码变加法，乘法是多次加法，除法是多次减法——<strong>一切算术都建立在加法器之上</strong>。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">半加器（Half Adder）</h3>
        <p class="text-slate-600 text-sm mb-2">两个 1 位二进制数相加，产生<strong>和（Sum）</strong>和<strong>进位（Carry）</strong>。<strong>不处理来自低位的进位</strong>（所以叫"半"）。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">A</th><th class="px-4 py-2 border font-semibold text-slate-700">B</th><th class="px-4 py-2 border font-semibold text-slate-700">Sum (A XOR B)</th><th class="px-4 py-2 border font-semibold text-slate-700">Carry (A AND B)</th></tr></thead>
            <tbody class="text-slate-600 font-mono text-xs text-center"><tr><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">0</td></tr><tr><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td></tr><tr><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td></tr><tr><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td></tr></tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm mb-2">Sum = A XOR B（1个XOR门），Carry = A AND B（1个AND门）。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-2">全加器（Full Adder）</h3>
        <p class="text-slate-600 text-sm mb-2">三个输入：A、B、<strong>低位进位 C<sub>in</sub></strong>。两个输出：Sum、C<sub>out</sub>。把 N 个全加器<strong>串联</strong>（C<sub>out</sub> 连到下一级的 C<sub>in</sub>）就得到 N 位加法器。</p>
        <p class="text-slate-600 text-sm mb-3">Sum = A ⊕ B ⊕ C<sub>in</sub>（2个XOR）。C<sub>out</sub> = (A·B) + (C<sub>in</sub>·(A⊕B))（多数表决：至少两个 1 才进位）。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-2">行波进位加法器（Ripple Carry）的问题</h3>
        <p class="text-slate-600 text-sm mb-3">串联全加器的问题：进位必须<strong>逐级传播</strong>——第 32 位要等前 31 位的进位算完。64 位加法器需要约 64 个门延迟。<strong>这是 CPU 的关键路径！</strong></p>

        <h3 class="text-base font-semibold text-slate-700 mb-2">超前进位加法器（Carry Lookahead Adder, CLA）</h3>
        <p class="text-slate-600 text-sm mb-3"><strong>解决思路：</strong>不逐级等进位，而是<strong>同时计算所有进位</strong>。定义两个信号：<strong>生成 G<sub>i</sub> = A<sub>i</sub>·B<sub>i</sub></strong>（该位产生进位）和 <strong>传播 P<sub>i</sub> = A<sub>i</sub>⊕B<sub>i</sub></strong>（该位传递进位）。则：C<sub>1</sub>=G<sub>0</sub>+P<sub>0</sub>·C<sub>0</sub>，C<sub>2</sub>=G<sub>1</sub>+P<sub>1</sub>·G<sub>0</sub>+P<sub>1</sub>·P<sub>0</sub>·C<sub>0</sub>... 所有进位<strong>在约 log₂(N) 级门延迟内并行算出</strong>。现代 CPU 用分级 CLA（4 位一组，组内 CLA，组间行波或再 CLA）。</p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 实际应用：</strong>现代 CPU 的 64 位加法器用<strong>Kogge-Stone</strong>或<strong>Brent-Kung</strong>前缀树——log₂N 级延迟。5GHz 下约 3-4 个周期完成一次 64 位加法（含取指/写回开销）。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>译码器（Decoder）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">n 位输入 → 2ⁿ 位输出，<strong>恰好一位为 1</strong>（其余为 0）。用于 CPU 的<strong>指令译码</strong>和<strong>内存地址译码</strong>。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">输入 (2位)</th><th class="px-4 py-2 border font-semibold text-slate-700">输出 (4位)</th><th class="px-4 py-2 border font-semibold text-slate-700">CPU 用途</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border">00</td><td class="px-4 py-2 border">0001</td><td class="px-4 py-2 border">选择寄存器 R0</td></tr><tr><td class="px-4 py-2 border">01</td><td class="px-4 py-2 border">0010</td><td class="px-4 py-2 border">选择寄存器 R1</td></tr><tr><td class="px-4 py-2 border">10</td><td class="px-4 py-2 border">0100</td><td class="px-4 py-2 border">选择寄存器 R2</td></tr><tr><td class="px-4 py-2 border">11</td><td class="px-4 py-2 border">1000</td><td class="px-4 py-2 border">选择寄存器 R3</td></tr></tbody></table></div>
        <p class="text-slate-600 text-sm">x86 指令译码器中有一个巨大的译码器：<strong>4 位 opcode → 16 条"激活线"</strong>，每条对应一种指令类型。这就是为什么 x86 的 opcode 最初设计成 4 位字段。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>多路复用器（Multiplexer / MUX）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>从多个输入中选择一个输出。</strong>k 条选择线 → 2ᵏ 个输入端。≈ 代码中的 <code class="bg-slate-100 text-amber-700 px-1 rounded text-xs font-mono">switch(select) case 0: out=A; case 1: out=B;</code>。</p>
        <p class="text-slate-600 text-sm mb-3">CPU 中 MUX 无处不在：寄存器文件选择（读哪个寄存器）、ALU 操作数选择（来自寄存器还是立即数）、PC 下一地址选择（顺序/跳转/中断）、写回数据选择（ALU 结果还是内存加载）。</p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 MUX 是 CPU 数据通路的"路由器"——</strong>每个时钟周期，无数 MUX 在并行工作，决定数据流向。CPU 设计的大部分工作就是<strong>安排 MUX 和控制信号</strong>。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>组合逻辑 = 纯函数——无状态、无时钟、无记忆</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>全加器串联 → 行波进位</strong>（慢），<strong>超前进位 CLA → 前缀树</strong>（快，logN 延迟）</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>译码器：n→2ⁿ 一对一选择，用于指令译码和地址解码</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>MUX = CPU 的数据路由器</strong>——选择信号决定数据流向，是数据通路的核心</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-2-gates" class="text-slate-500 hover:text-amber-600 flex items-center gap-1">← 上一节：基本逻辑门</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-4-sequential" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：时序逻辑电路 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"什么是组合逻辑"},{id:"sec-2",name:"加法器"},{id:"sec-3",name:"译码器"},{id:"sec-4",name:"多路复用器"},{id:"sec-5",name:"小结"}]
</script>
