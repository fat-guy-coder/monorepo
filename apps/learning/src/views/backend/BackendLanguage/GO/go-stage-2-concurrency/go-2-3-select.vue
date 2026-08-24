<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔀 Select 多路复用</h1><p class="text-sm text-slate-500 mt-1">同时等待多个 channel 操作 — Go 的 I/O 多路复用器，一切并发控制的基石</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-3-select.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：select 同时监听多个 channel
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个 goroutine 通过 select 同时阻塞在<strong>多个 channel 的 case</strong>上。哪个 channel 先就绪，就执行对应的 case 分支。
          多个 case 同时就绪时<strong>伪随机选一个</strong>（防止饥饿）；全阻塞时如果有 default 就执行 default（非阻塞）。
        </p>

        <figure class="mb-4">
          <svg viewBox="0 0 720 280" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sel-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 中心 goroutine（select 块） -->
            <rect x="40" y="80" width="180" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="130" y="110" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">goroutine G</text>
            <text x="130" y="135" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#b45309">select {</text>
            <text x="130" y="155" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#b45309">  case <-ch1 ...</text>
            <text x="130" y="175" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#b45309">  case <-ch2 ...</text>
            <text x="130" y="195" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#b45309">}</text>

            <!-- 三个 channel -->
            <!-- ch1（就绪，绿色） -->
            <rect x="380" y="40" width="130" height="56" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="445" y="68" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">ch1（有数据）</text>
            <!-- ch2（阻塞，灰色） -->
            <rect x="380" y="112" width="130" height="56" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="445" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#64748b">ch2（空）</text>
            <!-- ch3（阻塞，灰色） -->
            <rect x="380" y="184" width="130" height="56" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="445" y="212" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#64748b">ch3（空）</text>

            <!-- 连线：goroutine → 三个 channel（case 监听） -->
            <line x1="220" y1="110" x2="380" y2="68" stroke="#94a3b8" stroke-width="2" marker-end="url(#sel-arr)" />
            <line x1="220" y1="140" x2="380" y2="140" stroke="#94a3b8" stroke-width="2" marker-end="url(#sel-arr)" />
            <line x1="220" y1="170" x2="380" y2="212" stroke="#94a3b8" stroke-width="2" marker-end="url(#sel-arr)" />

            <!-- 选中 ch1 的高亮箭头 -->
            <line x1="445" y1="40" x2="445" y2="10" stroke="#4ade80" stroke-width="3" />
            <rect x="380" y="4" width="130" height="24" rx="4" fill="#4ade80" />
            <text x="445" y="16" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">✅ 选中执行</text>

            <!-- default 分支（底部虚线框） -->
            <rect x="380" y="250" width="130" height="24" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <text x="445" y="262" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">default（可选）</text>
            <line x1="130" y1="200" x2="130" y2="262" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
            <line x1="130" y1="262" x2="380" y2="262" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#sel-arr)" />

            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">select 多路复用——G 同时监听 ch1/ch2/ch3，ch1 先就绪 → 执行 ch1 的 case</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：select 结构——一个 goroutine 同时阻塞在多个 channel case 上，哪个先就绪执行哪个（绿色高亮），全阻塞时可走 default</figcaption>
        </figure>
      </section>

      <!-- 1. 是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>select 到底是什么？用来干嘛？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">select 是 Go 的<strong>多路复用（multiplexing）</strong>语句——一个 goroutine 可以同时等待多个 channel 操作，<strong>哪个先就绪就先执行哪个</strong>。它类似于 Unix 的 <strong>select/epoll</strong> 系统调用——同时监听多个文件描述符。在 Go 里，"文件描述符"变成了 channel。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>select ≈ <strong>Promise.race()</strong>——哪个先完成用哪个。≈ Unix <strong>select/epoll</strong> 系统调用。≈ Node.js 的 <strong>await</strong> 同时等多个 Promise。<br/><strong>default 分支</strong> ≈ <strong>非阻塞 I/O</strong>——有数据就处理，没有就干别的。</p></aside>

        <div class="mb-4"><Code language="go" :code="basicCode" title="select_basic.go" /></div>
      </section>

      <!-- 2. 底层原理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>底层原理：runtime.selectgo() 做了什么？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">每个 select 语句在编译时被转换为对 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">runtime.selectgo()</code> 的调用。这个函数是理解 select 行为的关键。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>锁定所有 channel</strong> — selectgo 用一个<strong>统一的加锁顺序</strong>（按 channel 地址排序）锁住所有涉及的 channel，防止死锁。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>遍历所有 case</strong> — 检查每个 channel 是否可以立即操作（发送/接收）。如果有就绪的 → <strong>伪随机选一个</strong>（用 fastrand()），执行操作。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>全部阻塞 + 无 default</strong> — 把当前 goroutine 加入<strong>所有 case channel 的等待队列</strong>（sendq 或 recvq），然后调用 gopark() 挂起 G。当任意一个 channel 就绪→G 被唤醒→从其他 channel 的等待队列中移除。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>有 default</strong> — 所有 case 都阻塞时<strong>立即执行 default</strong>，不挂起 G。这就是非阻塞操作的本质。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>解锁所有 channel</strong> — 操作完成，释放锁。</div></li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 为什么多个 case 就绪时随机选？</strong>如果总是优先选第一个 case，就可能出现<strong>饥饿</strong>——某个 case 的条件一直满足，其他 case 永远轮不到。伪随机保证了公平性。</p></aside>
      </section>

      <!-- 3. 七大实战模式 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>七大实战模式</h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">① 超时控制（最常用）</h3>
        <div class="mb-4"><Code language="go" :code="timeoutCode" title="select_timeout.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">② 非阻塞操作（default）</h3>
        <div class="mb-4"><Code language="go" :code="defaultCode" title="select_default.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">③ 退出信号（done channel）</h3>
        <div class="mb-4"><Code language="go" :code="doneCode" title="select_done.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">④ for-select 循环（持续监听）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">服务端程序的标准骨架。注意它<strong>没有「间隔」和「步长」</strong>——进入 select 后 goroutine 直接挂起（不占 CPU），每次迭代 = 一次事件到达，间隔完全由生产方决定。是<strong>事件驱动</strong>，不是轮询：有事就处理、没事就睡、取消了就撤。</p>
        <div class="mb-4"><Code language="go" :code="forSelectCode" title="for_select.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">⑤ Ticker 定时任务</h3>
        <div class="mb-4"><Code language="go" :code="tickerCode" title="select_ticker.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">⑥ send 和 recv 混合（双向 select）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">select 的 case 不仅可以是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-ch</code>（接收），也可以是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ch <- v</code>（发送）。在同一个 select 中混合收发。</p>
        <div class="mb-4"><Code language="go" :code="sendRecvCode" title="select_send_recv.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">⑦ nil chan 动态禁用 case</h3>
        <div class="mb-4"><Code language="go" :code="nilChanCode" title="select_nil.go" /></div>
      </section>

      <!-- 4. 执行规则 + 陷阱 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>执行规则速记 + 常见陷阱</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 class="font-semibold text-blue-700 mb-2">📐 五大执行规则</h4>
            <ol class="space-y-1 text-sm text-blue-700">
              <li>1. 所有 channel 表达式<strong>先求值一次</strong></li>
              <li>2. 多个 case 就绪 → <strong>伪随机选一个</strong></li>
              <li>3. 全阻塞 + 无 default → select <strong>阻塞</strong></li>
              <li>4. 有 default → 全阻塞时<strong>走 default</strong></li>
              <li>5. nil chan → 对应 case <strong>永不选中</strong></li>
            </ol>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-2">⚠️ 常见陷阱</h4>
            <ul class="space-y-1 text-sm text-amber-700">
              <li>· <strong>for-select 里没有退出条件</strong> → goroutine 泄漏</li>
              <li>· select {} (空 select) → <strong>永久阻塞</strong>整个 goroutine</li>
              <li>· <strong>time.After 在循环中泄漏</strong>（每次创建新 Timer 不释放）</li>
              <li>· break 只跳出 select，不跳出外层 for → 用 <strong>标签 break</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：select 随机选中就绪的 channel
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「随机就绪」让 1~3 个 channel 随机变为就绪，再点「执行 select」——select 会从就绪的 case 中<strong>随机选一个</strong>执行。
          观察多次执行后，就绪的多个 channel 被选中的次数是否均匀（体现伪随机公平性）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📡 就绪: {{ readyCount }} 个</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🎯 累计选中: ch1={{ hit[0] }} ch2={{ hit[1] }} ch3={{ hit[2] }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doRandomReady" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">随机就绪</button>
          <button @mousedown="doSelect" :disabled="busy || readyCount === 0" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">执行 select</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="(ch,i) in channels" :key="'ch'+i" :config="chRectCfg(i)" />
              <v-text v-for="(ch,i) in channels" :key="'cht'+i" :config="chTextCfg(i)" />
              <v-text v-if="selected >= 0" :config="selectedCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>select 底层调用 runtime.selectgo()——<strong>统一加锁→遍历→阻塞或执行→解锁</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>七大模式：</strong>超时/default/退出/for-select/ticker/收发混合/nil chan 禁用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>for + select 是 Go 中<strong>最核心的并发循环模式</strong>——几乎所有 server 都在用</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-2-channels" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：Channel</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-4-timer-ticker" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Timer/Ticker →</RouterLink></nav></footer>
  </div></template>

<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'; const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"是什么"},{id:"sec-2",name:"底层原理 selectgo"},{id:"sec-3",name:"七大实战模式"},{id:"sec-4",name:"规则 + 陷阱"},{id:"sec-viz",name:"🎬 动画演示"},{id:"sec-5",name:"小结"}]

// ===== 🎬 select 多路复用动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(170), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface Ch { name: string; ready: boolean; color: string }
const channels = reactive<Ch[]>([
  { name: 'ch1', ready: false, color: C.ghost },
  { name: 'ch2', ready: false, color: C.ghost },
  { name: 'ch3', ready: false, color: C.ghost },
])
const hit = reactive([0, 0, 0])
const selected = ref(-1)

const readyCount = computed(() => channels.filter(c => c.ready).length)
const CHW = 140, CHH = 56, CHGAP = 30, CHY = 40

function chX(i: number) { const total = channels.length * CHW + (channels.length - 1) * CHGAP; return (W.value - total) / 2 + i * (CHW + CHGAP) }
function chRectCfg(i: number) {
  const c = channels[i]
  const isSel = selected.value === i
  return { x: chX(i), y: CHY, width: CHW, height: CHH, cornerRadius: 8,
    fill: isSel ? C.green : (c.ready ? C.cyan : C.ghost),
    stroke: isSel ? '#22c55e' : (c.ready ? '#0891b2' : '#94a3b8'), strokeWidth: isSel ? 3 : 1.5 }
}
function chTextCfg(i: number) {
  const c = channels[i]
  return { x: chX(i), y: CHY + 10, width: CHW, text: c.name, fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: (c.ready || selected.value === i) ? '#0f172a' : C.muted, align: 'center' }
}
const selectedCfg = computed(() => ({
  x: chX(selected.value), y: CHY + CHH + 10, width: CHW, text: '✅ 选中', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#15803d', align: 'center',
}))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doRandomReady() {
  act('随机就绪', async () => {
    channels.forEach(c => { c.ready = Math.random() > 0.5; c.color = c.ready ? C.cyan : C.ghost })
    selected.value = -1
    status.value = `${readyCount.value} 个 channel 就绪`
    await d(500)
  })
}

function doSelect() {
  act('执行 select  O(1)', async () => {
    const readyIdx = channels.map((c, i) => c.ready ? i : -1).filter(i => i >= 0)
    if (!readyIdx.length) return
    const pick = readyIdx[Math.floor(Math.random() * readyIdx.length)]
    selected.value = -1
    await d(200)
    selected.value = pick
    hit[pick]++
    status.value = `select 选中 ${channels[pick].name}`
    await d(600)
    channels[pick].ready = false
    channels[pick].color = C.ghost
    selected.value = -1
  })
}

function doReset() { busy.value = false; channels.forEach(c => { c.ready = false; c.color = C.ghost }); hit[0]=hit[1]=hit[2]=0; selected.value = -1; status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const basicCode = `ch1 := make(chan string); ch2 := make(chan string)
go func() { time.Sleep(10*time.Millisecond); ch1 <- "one" }()
go func() { time.Sleep(20*time.Millisecond); ch2 <- "two" }()
select {
case msg := <-ch1: fmt.Println(msg)  // 输出: one
case msg := <-ch2: fmt.Println(msg)
}

// 多个就绪时随机选
a := make(chan string, 1); a <- "A"
b := make(chan string, 1); b <- "B"
for i := 0; i < 3; i++ {
    select {
    case m := <-a: fmt.Println("picked:", m)  // A/B/A（随机）
    case m := <-b: fmt.Println("picked:", m)
    }
}`
const timeoutCode = `// 超时控制——每个 HTTP 请求、DB 查询都会用
select {
case res := <-doWork():
    fmt.Println("结果:", res)
case <-time.After(3 * time.Second):
    fmt.Println("请求超时！")
    return fmt.Errorf("timeout")
}

// ⚠️ 循环中不要直接用 time.After——每次都分配新 Timer
// 应该用 time.NewTimer + Reset 复用`
const defaultCode = `// 非阻塞读取——有数据就读，没有就干别的
select {
case v := <-ch:
    fmt.Println("received", v)
default:
    fmt.Println("channel empty, do other work")
}

// 非阻塞发送
select {
case ch <- 42:
    fmt.Println("sent")
default:
    fmt.Println("channel full, drop")
}`
const doneCode = `// ③ 退出信号模式——所有长时间运行的 goroutine 必备
func worker(ctx context.Context, jobs <-chan Job) {
    for {
        select {
        case job, ok := <-jobs:
            if !ok { return }
            process(job)
        case <-ctx.Done():
            fmt.Println("收到取消信号，退出")
            return
        }
    }
}`
const forSelectCode = `// ④ for-select 循环——Go 服务端程序的标准骨架
func server(requests <-chan Request, shutdown <-chan struct{}) {
    for {
        select {          // 挂起等待：无事件时 goroutine 休眠，不占 CPU
        case req := <-requests:
            handle(req)           // 有请求就处理，处理完回到 select 继续挂起
        case <-shutdown:
            fmt.Println("优雅关闭中...")
            return                // 关闭信号一到就退出
        }
    }
}
// 没有"间隔/步长"：每次迭代 = 一次事件到达，间隔由生产方决定。
// 有数据→立刻处理；没数据→睡在 select 上；信号→退出。纯事件驱动。`
const tickerCode = `// ⑤ select + Ticker——定时任务
ticker := time.NewTicker(5 * time.Second)
defer ticker.Stop()
for {
    select {
    case <-ticker.C:
        cleanupExpiredSessions()  // 每 5 秒清理过期会话
    case <-done:
        return
    }
}`
const sendRecvCode = `// ⑥ send 和 recv 混合——限流 + 背压
// 生产者：有消费者在等就生产，否则跳过
func produce(ch chan<- int, value int) bool {
    select {
    case ch <- value:  // send case
        return true
    default:
        return false    // channel 满了，丢弃
    }
}

// 消费者：优先处理控制消息
select {
case data := <-dataCh:          // recv case
    handleData(data)
case ch <- result:              // send case
    // 成功发送结果
case <-ctx.Done():              // recv case
    return
}`
const nilChanCode = `// ⑦ nil chan——动态禁用 case
// 场景：轮询两个数据源，但某个时间段内不想接收来自 B 的数据
var sourceB <-chan Data = nil  // 初始禁用
// 条件满足时启用
if enableSourceB {
    sourceB = dataChannelB
}
for {
    select {
    case data := <-sourceA:
        handle(data)
    case data := <-sourceB:  // sourceB 为 nil 时永远不会被选中
        handle(data)
    }
}`
</script>
