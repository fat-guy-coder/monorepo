<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⏰ Timer 与 Ticker</h1><p class="text-sm text-slate-500 mt-1">Timer ≈ setTimeout · Ticker ≈ setInterval · 都是 channel 驱动的定时器</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-4-timer-ticker.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Timer（一次）vs Ticker（周期）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Timer 和 Ticker 底层共用同一个<strong>四叉堆（最小堆）</strong>——Go runtime 在每次调度循环检查堆顶的定时器是否到期。
          区别在于：Timer 到期后<strong>只触发一次</strong>，Ticker 到期后<strong>自动重置、周期触发</strong>。两者都通过 channel 通知。
        </p>

        <figure class="mb-4">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="tt-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">时间轴（单位：秒）</text>

            <!-- 时间轴刻度 -->
            <line x1="60" y1="46" x2="700" y2="46" stroke="#94a3b8" stroke-width="1.5" />
            <text x="60" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">0</text>
            <text x="188" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">0.5</text>
            <text x="316" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="444" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1.5</text>
            <text x="572" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">2</text>
            <line x1="60" y1="40" x2="60" y2="52" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="188" y1="40" x2="188" y2="52" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="316" y1="40" x2="316" y2="52" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="444" y1="40" x2="444" y2="52" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="572" y1="40" x2="572" y2="52" stroke="#94a3b8" stroke-width="1.5" />

            <!-- Timer：只触发一次 -->
            <text x="16" y="86" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">Timer（NewTimer(2s)）：到期触发一次，之后停止</text>
            <line x1="60" y1="110" x2="572" y2="110" stroke="#e2e8f0" stroke-width="20" stroke-linecap="round" />
            <line x1="60" y1="110" x2="572" y2="110" stroke="#cbd5e1" stroke-width="2" />
            <circle cx="572" cy="110" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="572" y="110" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">✓</text>
            <text x="572" y="140" text-anchor="middle" font-size="11" font-family="monospace" fill="#15803d">触发一次 ←timer.C</text>

            <!-- Ticker：周期触发 -->
            <text x="16" y="176" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">Ticker（NewTicker(0.5s)）：每 0.5s 触发一次，自动重置</text>
            <line x1="60" y1="200" x2="700" y2="200" stroke="#e2e8f0" stroke-width="20" stroke-linecap="round" />
            <line x1="60" y1="200" x2="700" y2="200" stroke="#cbd5e1" stroke-width="2" />
            <circle cx="188" cy="200" r="12" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="188" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">✓</text>
            <circle cx="316" cy="200" r="12" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="316" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">✓</text>
            <circle cx="444" cy="200" r="12" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="444" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">✓</text>
            <circle cx="572" cy="200" r="12" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="572" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">✓</text>
            <text x="636" y="200" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0891b2">...每 0.5s</text>

            <text x="16" y="244" font-size="11" font-family="monospace" fill="#0891b2">底层：四叉堆（最小堆）——runtime 每次调度检查堆顶到期，到期后 Timer 移除、Ticker 重置</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Timer 到期触发一次（绿 ✓），Ticker 每 0.5s 周期触发（蓝 ✓）——底层都是四叉堆，区别在到期后是否自动重置</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Timer — 延时一次</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.NewTimer(d)</code> 创建一个在 d 时间后往 C channel 发送当前时间的定时器。底层是一个<strong>最小堆</strong>（四叉堆），Go runtime 的调度器在每个调度循环中检查堆顶 timer 是否到期。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>Timer ≈ <strong>setTimeout</strong>——延时后触发一次。关键区别：Go 返回 <strong>channel</strong> 而非回调函数，需要配合 <code class="bg-purple-100 px-1 rounded text-xs font-mono"><-timer.C</code> 或 select 使用。</p></aside>
        <div class="mb-4"><Code language="go" :code="timerCode" title="timer.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Ticker — 周期性触发</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.NewTicker(d)</code> 每 d 时间往 C channel 发送一次。和 Timer 共用同一套底层堆——只是每次到期后自动 Reset。</p>
        <div class="mb-4"><Code language="go" :code="tickerCode" title="ticker.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Ticker 不 Stop 就永远不会被 GC！</strong>即使没有任何 goroutine 读它的 channel，runtime 仍然持有对 Ticker 的引用——定时器堆里的条目不会释放。必须 <code class="bg-amber-100 px-1 rounded text-xs font-mono">defer ticker.Stop()</code>。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>time.After 的陷阱 — 为什么循环中会内存泄漏？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.After(d)</code> 本质是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">NewTimer(d).C</code>——它创建了一个 Timer 但只返回 channel。问题是：<strong>在 Timer 到期之前，它不会被 GC</strong>。循环中每次迭代创建一个新的 After → 旧的还没到期 → 堆上攒了几百个 Timer → 内存泄漏。</p>
        <div class="mb-4"><Code language="go" :code="afterCode" title="after_vs_newtimer.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 速记：</strong>一次性超时用 time.After；循环中必须用 NewTimer+Reset 复用。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Stop 与 Reset 的正确姿势</h2>
        <div class="mb-4"><Code language="go" :code="stopResetCode" title="stop_reset.go" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：Timer 与 Ticker 的时间线
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「开始」后时间指针沿时间轴前进——<strong>Ticker</strong> 每 0.5s 触发一次（蓝色 ✓），<strong>Timer</strong> 只在 2s 触发一次（绿色 ✓）。
          观察两者的触发频率差异。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">⏱️ 时间: {{ tLabel }}</span>
          <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">🔵 Ticker 触发: {{ tickCount }} 次</span>
          <span class="bg-green-50 text-green-700 px-2 py-1 rounded-full">🟢 Timer 触发: {{ timerFired ? 1 : 0 }} 次</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doStart" :disabled="busy || running" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 开始</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 时间轴 -->
              <v-line :config="{points:[BX, TIMER_Y, W-20, TIMER_Y], stroke:'#cbd5e1', strokeWidth:2}" />
              <v-line :config="{points:[BX, TICKER_Y, W-20, TICKER_Y], stroke:'#cbd5e1', strokeWidth:2}" />
              <!-- 刻度标记 -->
              <v-line v-for="t in ticks" :key="'tk'+t" :config="{points:[t, TIMER_Y-5, t, TIMER_Y+5], stroke:'#94a3b8', strokeWidth:1.5}" />
              <!-- 时间指针 -->
              <v-line :config="cursorCfg" />
              <!-- Timer 触发点 -->
              <v-circle v-if="timerFired" :config="timerCfg" />
              <!-- Ticker 触发点 -->
              <v-circle v-for="(t,i) in tickPoints" :key="'tp'+i" :config="tickCfg(t)" />
              <!-- 标签 -->
              <v-text :config="{x:10, y:TIMER_Y-28, text:'Timer (2s 触发一次)', fontSize:11, fontFamily:'monospace', fontStyle:'bold', fill:'#15803d'}" />
              <v-text :config="{x:10, y:TICKER_Y-28, text:'Ticker (每 0.5s 触发)', fontSize:11, fontFamily:'monospace', fontStyle:'bold', fill:'#0369a1'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Timer ≈ setTimeout</strong>（一次），<strong>Ticker ≈ setInterval</strong>（周期），都通过 channel 通知</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>底层：四叉堆</strong> + runtime 调度循环检查到期定时器</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>time.After 循环中泄漏！</strong>改用 NewTimer + Reset 复用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Stop 返回 false 时 <strong>必须排空 channel</strong>（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs"><-t.C</code>），否则 Reset 后立即触发</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Ticker 不 Stop = 永不 GC</strong>——defer ticker.Stop()</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Select</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Mutex →</RouterLink></nav></footer>
  </div></template>

<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'; const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"Timer"},{id:"sec-2",name:"Ticker"},{id:"sec-3",name:"After 陷阱"},{id:"sec-4",name:"Stop/Reset"},{id:"sec-viz",name:"🎬 动画演示"},{id:"sec-5",name:"小结"}]

// ===== 🎬 Timer/Ticker 时间线动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', blue:'#3b82f6', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(160), W = ref(700)
const BX = 40, TIMER_Y = 55, TICKER_Y = 110
const box = ref<HTMLDivElement>()
const busy = ref(false), running = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const cursor = ref(BX)                 // 时间指针位置
const tickCount = ref(0)               // ticker 触发次数
const timerFired = ref(false)          // timer 是否触发
const tickPoints = reactive<number[]>([])  // ticker 触发点的 x 坐标
const elapsed = ref(0)                 // 已过时间（秒）

const tLabel = computed(() => elapsed.value.toFixed(1) + 's')
const ticks = computed(() => {
  // 每 0.5s 一个刻度，共 5 个
  const step = (W.value - BX - 20) / 4
  return [BX, BX + step, BX + step * 2, BX + step * 3, BX + step * 4]
})
const cursorCfg = computed(() => ({ points: [cursor.value, TIMER_Y - 20, cursor.value, TICKER_Y + 20], stroke: '#f59e0b', strokeWidth: 3 }))
const timerCfg = { x: W.value - 20, y: TIMER_Y, radius: 12, fill: C.green, stroke: '#22c55e', strokeWidth: 2 }
const tickCfg = (x: number) => ({ x, y: TICKER_Y, radius: 9, fill: C.blue, stroke: '#2563eb', strokeWidth: 2 })

function init() {
  cursor.value = BX; tickCount.value = 0; timerFired.value = false; tickPoints.length = 0; elapsed.value = 0; running.value = false; status.value = ''
}

async function doStart() {
  if (running.value || busy.value) return
  running.value = true; busy.value = true
  status.value = '时间流动...'
  const total = 2000           // 总时长 2s
  const steps = 20             // 20 步
  const stepMs = total / steps
  const axisLen = W.value - 20 - BX

  for (let i = 0; i <= steps; i++) {
    elapsed.value = (i / steps) * 2
    cursor.value = BX + (i / steps) * axisLen
    // Ticker：每 0.5s 触发（i 对应 0.5s 的整数倍）
    const t = (i / steps) * 2
    if (i > 0 && Math.abs(t - Math.round(t * 2) / 2) < 0.001 && Math.round(t * 2) % 2 === 0 && t < 2) {
      // 每 0.5s：0.5, 1.0, 1.5
      tickCount.value++
      tickPoints.push(cursor.value)
      status.value = `Ticker 触发 #${tickCount.value}`
      await d(150)
    }
    await d(stepMs)
  }
  // 结束：Timer 触发
  timerFired.value = true
  status.value = 'Timer 触发（2s）'
  await d(500)
  running.value = false; busy.value = false; status.value = ''
}

function doReset() { busy.value = false; init() }

let ro: ResizeObserver | null = null
onMounted(() => {
  init()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const timerCode = `// Timer — 延时后 C channel 收到当前时间
timer := time.NewTimer(2 * time.Second)
<-timer.C                         // 阻塞 2 秒
fmt.Println("2 秒后执行")          // 输出: 2 秒后执行

// 提前 Stop 阻止触发
if !timer.Stop() {
    <-timer.C                     // 已触发→排空 channel（否则 Reset 立即可读）
}
timer.Reset(5 * time.Second)      // 重新计时 5 秒

// AfterFunc — 延时后执行回调（不阻塞，在独立 goroutine 中执行）
time.AfterFunc(1*time.Second, func() {
    fmt.Println("1 秒后异步执行")  // 输出: 1 秒后异步执行
})`
const tickerCode = `// Ticker — 每 d 时间 C channel 收到一次
ticker := time.NewTicker(500 * time.Millisecond)
defer ticker.Stop()               // ⚠️ 不 Stop 永不 GC

done := make(chan struct{})
go func() { time.Sleep(2*time.Second); close(done) }()

loop:
for {
    select {
    case t := <-ticker.C:
        fmt.Println("tick at", t.Format("15:04:05"))
    case <-done:
        break loop
    }
}
// 输出: tick at 15:04:05.000  15:04:05.500  15:04:06.000  15:04:06.500`
const afterCode = `// ❌ 循环中用 time.After——每次迭代创建新 Timer！
for {
    select {
    case <-ch: handle()
    case <-time.After(5*time.Second):  // 旧的 After 在 5s 到期前不 GC！
        fmt.Println("timeout")         // 循环 1000 次 = 堆上 1000 个 Timer
    }
}

// ✅ 正确：NewTimer + Reset 复用
timeout := time.NewTimer(5 * time.Second)
defer timeout.Stop()
for {
    timeout.Reset(5 * time.Second)     // 复用同一个 Timer
    select {
    case <-ch: handle()
    case <-timeout.C: fmt.Println("timeout")
    }
}`
const stopResetCode = `// ⚠️ Stop 的正确用法：必须排空 channel
func resetTimer(t *time.Timer, d time.Duration) {
    if !t.Stop() {
        select { case <-t.C: default: }  // 非阻塞排空——Timer 已触发时 C 中有值
    }
    t.Reset(d)
}

// 同理 Ticker 的 Reset（Go 1.23+ 才支持，之前需 Stop+New）
// Go 1.23+: ticker.Reset(d)
// Go < 1.23: ticker.Stop(); ticker = time.NewTicker(d)`
</script>
