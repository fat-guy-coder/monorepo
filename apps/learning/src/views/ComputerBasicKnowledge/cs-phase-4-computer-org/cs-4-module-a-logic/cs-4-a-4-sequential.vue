<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">时序逻辑电路</h1><p class="text-sm text-slate-500 mt-1">触发器 · 时钟信号——让电路"记住"状态</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">组成原理 4-a-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⏱️</span>组合 vs 时序</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong>组合逻辑 ≈ 纯函数（无状态）。时序逻辑 ≈ <strong>有状态的函数（闭包、对象）</strong>——输出取决于输入 <strong>+ 当前状态</strong>。就像 <code class="bg-purple-100 px-1 rounded text-xs font-mono">counter.increment()</code>——结果取决于之前调用了多少次。</p></aside>
        <p class="text-slate-600 leading-relaxed">时序逻辑电路<strong>有记忆</strong>——能存储 0 或 1。这靠<strong>反馈回路</strong>实现（输出连回输入）。所有存储元件（寄存器、SRAM、DRAM）都是时序逻辑。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>时钟信号——心跳</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">时钟是<strong>周期性方波</strong>，协调所有时序元件同步工作。上升沿（0→1）或下降沿（1→0）触发状态更新。</p>
        <ul class="space-y-2 text-slate-600 text-sm mb-3"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>时钟频率 f：</strong>每秒周期数。5GHz = 周期 200ps</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>时钟周期 T = 1/f：</strong>处理器做一次操作的最短时间</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>边沿触发：</strong>绝大多数数字系统在<strong>上升沿</strong>采样和更新——整个芯片在同一个时钟沿"同时"行动</span></li></ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 时钟频率不是"CPU 每秒执行多少条指令"——</strong>那是 IPC × 频率。现代 CPU 的 IPC ≈ 1-5，5GHz CPU 每秒执行约 5-25 亿条指令。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>四种触发器</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">类型</th><th class="px-4 py-2 border font-semibold text-slate-700">功能</th><th class="px-4 py-2 border font-semibold text-slate-700">真值表/行为</th><th class="px-4 py-2 border font-semibold text-slate-700">CPU 用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold font-mono text-xs">SR 锁存器</td><td class="px-4 py-2 border">Set-Reset。两个 NOR 门交叉耦合，S=1 置位→Q=1，R=1 复位→Q=0。S=R=1 禁止。</td><td class="px-4 py-2 border font-mono text-xs">S=0,R=0→保持; S=1,R=0→Q=1; S=0,R=1→Q=0</td><td class="px-4 py-2 border">基本存储单元的原理原型</td></tr>
              <tr><td class="px-4 py-2 border font-semibold font-mono text-xs">D 触发器</td><td class="px-4 py-2 border"><strong>最常用。</strong>时钟沿到来时，D 输入被捕获到 Q 输出。Q<sub>next</sub> = D。</td><td class="px-4 py-2 border font-mono text-xs">CLK↑ → Q=D</td><td class="px-4 py-2 border"><strong>寄存器、PC、流水线寄存器</strong></td></tr>
              <tr><td class="px-4 py-2 border font-semibold font-mono text-xs">JK 触发器</td><td class="px-4 py-2 border">SR 的改进版——J=K=1 时翻转。J=K=0 保持；J=1,K=0→置1；J=0,K=1→置0。</td><td class="px-4 py-2 border font-mono text-xs">J=K=1 → Q翻转</td><td class="px-4 py-2 border">计数器、分频器</td></tr>
              <tr><td class="px-4 py-2 border font-semibold font-mono text-xs">T 触发器</td><td class="px-4 py-2 border">Toggle。T=1 时翻转，T=0 时保持。≈ JK 的 J=K=1 简化版。</td><td class="px-4 py-2 border font-mono text-xs">T=1 → Q翻转</td><td class="px-4 py-2 border">二进制计数器的最低位</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>D 触发器 = 寄存器的基础</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">CPU 中的<strong>所有寄存器</strong>（通用寄存器、PC、IR、流水线寄存器）本质上都是<strong>一组 D 触发器</strong>，每个触发器存 1 位。64 位寄存器 = 64 个 D 触发器，共享同一个时钟。</p>
        <p class="text-slate-600 text-sm mb-3"><strong>建立时间 t<sub>setup</sub>：</strong>时钟沿到来前，D 输入必须<strong>稳定</strong>的时间。违反 → 亚稳态。<strong>保持时间 t<sub>hold</sub>：</strong>时钟沿到来后，D 输入必须<strong>保持</strong>的时间。违反 → 数据损坏。</p>
        <p class="text-slate-600 text-sm">这两个参数决定了 CPU 的<strong>最高时钟频率</strong>——时钟周期必须 > t<sub>setup</sub> + 组合逻辑延迟 + t<sub>hold</sub>。<strong>这就是为什么 5GHz 是硅基芯片的物理极限之一。</strong></p>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>时序逻辑 = 有记忆的电路，靠<strong>反馈回路</strong>存储状态</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>D 触发器是最核心的存储元件</strong>——N 个 D 触发器 = N 位寄存器</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>时钟协调一切——同一时钟沿触发所有寄存器更新</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>t<sub>setup</sub> + t<sub>hold</sub> 限制了 CPU 的最高频率</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-3-combinational" class="text-slate-500 hover:text-amber-600 flex items-center gap-1">← 上一节：组合逻辑电路</RouterLink><RouterLink to="/ComputerBasicKnowledge/cs-phase-4-computer-org/cs-4-module-a-logic/cs-4-a-5-register-counter" class="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">下一节：寄存器与计数器 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"组合vs时序"},{id:"sec-2",name:"时钟信号"},{id:"sec-3",name:"四种触发器"},{id:"sec-4",name:"D触发器=寄存器"},{id:"sec-5",name:"小结"}]
</script>
