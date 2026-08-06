<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🤝 JavaScript Promise 深度解析</h1>
          <p class="text-sm text-slate-500 mt-1">异步编程的现代基石 — 从回调地狱到链式调用，掌握 Promise 的全部核心概念</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/front/CoreSkills/JavaScript/ES/Promise.vue" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">ES6+</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是 Promise -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是 Promise？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Promise 是 JavaScript 中处理<strong>异步操作</strong>的标准方案。它代表一个异步操作的<strong>最终完成（或失败）及其结果值</strong>。Promise 解决了传统回调模式的两大痛点：<strong>回调地狱（Callback Hell）</strong>和<strong>控制反转（Inversion of Control）</strong>。
        </p>

        <h3 class="text-sm font-semibold text-slate-700 mb-3">Promise 的三种状态</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="border border-amber-200 rounded-xl p-4 bg-amber-50/60">
            <div class="text-2xl mb-2">⏳</div>
            <h4 class="font-semibold text-amber-800 text-sm">Pending（待定）</h4>
            <p class="text-xs text-amber-700 mt-1 leading-relaxed">初始状态。操作尚未完成，结果未知。Promise 创建后立即处于此状态。</p>
          </div>
          <div class="border border-emerald-200 rounded-xl p-4 bg-emerald-50/60">
            <div class="text-2xl mb-2">✅</div>
            <h4 class="font-semibold text-emerald-800 text-sm">Fulfilled（已兑现）</h4>
            <p class="text-xs text-emerald-700 mt-1 leading-relaxed">操作成功完成。<code class="bg-emerald-100 px-1 rounded text-xs">resolve(value)</code> 被调用后进入此状态。<strong>不可逆</strong>。</p>
          </div>
          <div class="border border-red-200 rounded-xl p-4 bg-red-50/60">
            <div class="text-2xl mb-2">❌</div>
            <h4 class="font-semibold text-red-800 text-sm">Rejected（已拒绝）</h4>
            <p class="text-xs text-red-700 mt-1 leading-relaxed">操作失败。<code class="bg-red-100 px-1 rounded text-xs">reject(error)</code> 被调用后进入此状态。<strong>不可逆</strong>。</p>
          </div>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键约束：</strong>Promise 的状态<strong>只能从 pending 变为 fulfilled 或 rejected</strong>，且一旦改变就<strong>不可逆转</strong>（settled）。多次调用 resolve/reject 只有第一次生效。</p>
        </aside>
      </section>

      <!-- 2. 基本使用 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Promise 基本使用
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-2">创建 Promise</h3>
            <Code language="js" :code="createCode" title="创建 Promise" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-2">使用 Promise</h3>
            <Code language="js" :code="useCode" title="使用 Promise" />
          </div>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Promise 就像你在餐厅点餐拿到的<strong>取餐号（叫号器）</strong>——你拿到的是一个"未来会完成"的承诺，而不是食物本身。你可以提前安排"拿到食物后做什么"（<code class="bg-purple-100 px-1 rounded text-xs">.then()</code>），也可以安排"叫号失败怎么办"（<code class="bg-purple-100 px-1 rounded text-xs">.catch()</code>）。</p>
        </aside>
      </section>

      <!-- 3. 链式调用 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          Promise 链式调用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.then()</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.catch()</code> 都返回<strong>新的 Promise</strong>，这是链式调用的关键。每个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.then()</code> 都在前一个 Promise 的基础上创建一个新的 Promise，形成处理管道。
        </p>

        <Code language="js" :code="chainCode" title="链式调用" />

        <div class="overflow-x-auto mt-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">回调返回值</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">新 Promise 的行为</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">普通值</td><td class="px-4 py-2 border border-slate-200">新 Promise 以该值 fulfilled</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">另一个 Promise</td><td class="px-4 py-2 border border-slate-200">新 Promise 跟随该 Promise 的状态</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">抛出异常</td><td class="px-4 py-2 border border-slate-200">新 Promise 以该异常 rejected</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">无返回值 (undefined)</td><td class="px-4 py-2 border border-slate-200">新 Promise 以 undefined fulfilled</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. 静态方法 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          Promise 静态方法
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border border-slate-200 rounded-xl p-4" v-for="m in staticMethods" :key="m.name">
            <div class="flex items-center gap-2 mb-2">
              <code class="bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded text-xs font-mono font-bold">Promise.{{ m.name }}</code>
              <code class="text-xs text-slate-400">{{ m.sig }}</code>
            </div>
            <p class="text-xs text-slate-600 mb-2 leading-relaxed">{{ m.desc }}</p>
            <Code language="js" :code="m.code" />
          </div>
        </div>
      </section>

      <!-- 5. 微任务队列 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          微任务队列（Microtask Queue）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Promise 的回调<strong>不会立即执行</strong>，而是被放入<strong>微任务队列（microtask queue）</strong>。微任务在当前宏任务（macrotask）执行完毕后、下一个宏任务开始前，一次性清空。
        </p>

        <Code language="js" :code="microtaskCode" title="微任务 vs 宏任务" />

        <div class="bg-slate-50 rounded-xl p-4 mt-4">
          <h3 class="text-sm font-semibold text-slate-700 mb-2">执行顺序</h3>
          <ol class="list-decimal list-inside space-y-1 text-sm text-slate-600 leading-relaxed">
            <li>同步代码（调用栈）</li>
            <li><strong>微任务（microtask）</strong>：Promise.then/catch/finally、queueMicrotask、MutationObserver</li>
            <li>宏任务（macrotask）：setTimeout、setInterval、I/O、UI 渲染</li>
          </ol>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          微任务就像 Vue 的 <code class="bg-purple-100 px-1 rounded text-xs">nextTick</code>——在当前"一轮"更新结束后、浏览器重新渲染前执行。Promise 的回调总是在当前同步代码完成后的"第一时机"执行，比 setTimeout 快。</p>
        </aside>
      </section>

      <!-- 6. 最佳实践 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          最佳实践
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span>总是添加 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.catch()</code> 处理错误——未捕获的 Promise rejection 会导致 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">unhandledrejection</code> 事件</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span>用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Promise.all()</code> 并行执行独立操作，用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Promise.allSettled()</code> 获取全部结果</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span>避免不必要的 Promise 嵌套，用 async/await 简化代码</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.finally()</code> 用于清理逻辑（关闭 loading、清理定时器等），不依赖 Promise 结果</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span>避免在循环中创建 Promise 链——用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">async/await</code> 或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">reduce</code> 实现顺序执行</span></li>
        </ul>
      </section>

      <!-- 7. Promise 生命周期动画演示 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎮</span>
          Promise 生命周期动画演示
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          下面展示了 Promise 内部的核心机制：<strong>回调队列</strong> + <strong>状态转换</strong>。点击按钮逐步操作，观察 Promise 的完整生命周期。
        </p>

        <!-- 控制按钮 -->
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <button @click="animNewPromise" :disabled="animating"
            class="px-3 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 disabled:opacity-40 transition-colors">🆕 new Promise</button>
          <button @click="animAddThen" :disabled="animating || !promiseCreated || promiseSettled"
            class="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-40 transition-colors">📥 .then(cb)</button>
          <button @click="animResolve" :disabled="animating || !promiseCreated || promiseSettled"
            class="px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 disabled:opacity-40 transition-colors">✅ resolve(42)</button>
          <button @click="animReject" :disabled="animating || !promiseCreated || promiseSettled"
            class="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-40 transition-colors">❌ reject(err)</button>
          <button @click="animReset" :disabled="animating"
            class="px-3 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-40 transition-colors">🔄 重置</button>
        </div>

        <!-- Canvas -->
        <div ref="canvasContainer" class="bg-slate-900 rounded-xl overflow-hidden" style="height: 380px"></div>

        <!-- 日志 -->
        <div class="mt-4 bg-slate-50 rounded-xl p-4 max-h-32 overflow-y-auto font-mono text-xs text-slate-600 leading-relaxed">
          <div v-for="(log, i) in logs" :key="i" class="flex gap-2">
            <span class="text-slate-400 shrink-0">{{ log.time }}</span>
            <span :class="log.color">{{ log.msg }}</span>
          </div>
          <div v-if="logs.length === 0" class="text-slate-400">操作日志将显示在这里...</div>
        </div>
      </section>

      <!-- 8. 适用场景 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          适用场景
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border border-slate-200 rounded-xl p-4" v-for="sc in scenarios" :key="sc.icon">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xl">{{ sc.icon }}</span>
              <h3 class="font-semibold text-slate-800 text-sm">{{ sc.title }}</h3>
            </div>
            <Code language="js" :code="sc.code" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Konva from 'konva'
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "什么是Promise" },
  { id: "sec-2", name: "基本使用" },
  { id: "sec-3", name: "链式调用" },
  { id: "sec-4", name: "静态方法" },
  { id: "sec-5", name: "微任务队列" },
  { id: "sec-6", name: "最佳实践" },
  { id: "sec-7", name: "🎮 动画演示" },
  { id: "sec-8", name: "适用场景" },
]

// ============ 动画相关 ============
const canvasContainer = ref<HTMLDivElement>()
const animating = ref(false)
const promiseCreated = ref(false)
const promiseSettled = ref(false)
const logs = ref<{ time: string; msg: string; color: string }[]>([])

function addLog(msg: string, color = 'text-slate-300') {
  const now = new Date()
  const time = now.toLocaleTimeString('zh-CN', { hour12: false })
  logs.value.push({ time, msg, color })
}

let stage: Konva.Stage
let layer: Konva.Layer

// 画布尺寸
const W = 800; const H = 380

// 布局常量
const PROMISE_X = 60; const PROMISE_Y = 60
const PROMISE_W = 200; const PROMISE_H = 120
const QUEUE_X = 340; const QUEUE_Y = 60
const QUEUE_W = 300; const SLOT_H = 36; const SLOT_GAP = 6
const ARROW_X = 280

// 颜色
const C_BG = '#1e293b'
const C_PENDING = '#f59e0b'
const C_FULFILLED = '#10b981'
const C_REJECTED = '#ef4444'
const C_CALLBACK = '#6366f1'
const C_ARROW = '#64748b'
const C_TEXT = '#e2e8f0'

// Konva 节点引用
let promiseGroup: Konva.Group
let promiseStateRect: Konva.Rect
let promiseStateText: Konva.Text
let promiseValueText: Konva.Text
let arrowLine: Konva.Arrow
let queueBox: Konva.Rect
let queueLabel: Konva.Text
let callbackSlots: Konva.Group[] = []  // 回调槽位
let callbackCount = 0

function initKonva() {
  stage = new Konva.Stage({ container: canvasContainer.value!, width: W, height: H })
  layer = new Konva.Layer()
  stage.add(layer)

  // 背景
  layer.add(new Konva.Rect({ x: 0, y: 0, width: W, height: H, fill: C_BG, listening: false }))

  // === Promise Box ===
  promiseGroup = new Konva.Group({})
  layer.add(promiseGroup)

  // Promise 标题
  const pTitle = new Konva.Text({ x: PROMISE_X + 10, y: PROMISE_Y - 22, text: 'Promise 对象', fontSize: 13, fontFamily: 'sans-serif', fill: '#94a3b8' })
  promiseGroup.add(pTitle)

  // Promise 主体
  promiseGroup.add(new Konva.Rect({ x: PROMISE_X, y: PROMISE_Y, width: PROMISE_W, height: PROMISE_H, stroke: C_PENDING, strokeWidth: 2, cornerRadius: 10, fill: 'rgba(245,158,11,0.1)', dash: [4, 3] }))

  // 状态 label
  promiseGroup.add(new Konva.Text({ x: PROMISE_X + 15, y: PROMISE_Y + 15, text: '状态:', fontSize: 13, fontFamily: 'sans-serif', fill: '#94a3b8' }))
  promiseStateText = new Konva.Text({ x: PROMISE_X + 60, y: PROMISE_Y + 13, text: 'Pending', fontSize: 15, fontFamily: 'monospace', fill: C_PENDING, fontStyle: 'bold' })
  promiseGroup.add(promiseStateText)

  // State 色块
  promiseStateRect = new Konva.Rect({ x: PROMISE_X + 15, y: PROMISE_Y + 42, width: PROMISE_W - 30, height: 6, fill: C_PENDING, cornerRadius: 3 })
  promiseGroup.add(promiseStateRect)

  // value label
  promiseGroup.add(new Konva.Text({ x: PROMISE_X + 15, y: PROMISE_Y + 62, text: 'value:', fontSize: 13, fontFamily: 'sans-serif', fill: '#94a3b8' }))
  promiseValueText = new Konva.Text({ x: PROMISE_X + 62, y: PROMISE_Y + 60, text: 'undefined', fontSize: 15, fontFamily: 'monospace', fill: '#64748b' })
  promiseGroup.add(promiseValueText)

  // === 箭头 ===
  arrowLine = new Konva.Arrow({
    points: [PROMISE_X + PROMISE_W + 5, PROMISE_Y + PROMISE_H / 2, ARROW_X - 5, PROMISE_Y + 45],
    pointerLength: 10, pointerWidth: 8, fill: C_ARROW, stroke: C_ARROW, strokeWidth: 2,
  })
  layer.add(arrowLine)

  // 箭头上方文字
  layer.add(new Konva.Text({ x: ARROW_X - 60, y: PROMISE_Y + 5, text: 'resolve()\n触发回调', fontSize: 11, fontFamily: 'sans-serif', fill: '#64748b', align: 'center' }))

  // === 回调队列 ===
  queueLabel = new Konva.Text({ x: QUEUE_X + 10, y: QUEUE_Y - 22, text: '回调队列 (0 个)', fontSize: 13, fontFamily: 'sans-serif', fill: '#94a3b8' })

  queueBox = new Konva.Rect({
    x: QUEUE_X, y: QUEUE_Y, width: QUEUE_W, height: 200,
    stroke: C_CALLBACK, strokeWidth: 2, cornerRadius: 10,
    fill: 'rgba(99,102,241,0.08)', dash: [4, 3],
  })
  layer.add(queueBox)
  layer.add(queueLabel)

  // 槽位占位符
  for (let i = 0; i < 5; i++) {
    const g = new Konva.Group({ visible: false })
    const slotY = QUEUE_Y + 10 + i * (SLOT_H + SLOT_GAP)
    g.add(new Konva.Rect({ x: QUEUE_X + 10, y: slotY, width: QUEUE_W - 20, height: SLOT_H, fill: 'rgba(99,102,241,0.2)', stroke: C_CALLBACK, strokeWidth: 1, cornerRadius: 6 }))
    g.add(new Konva.Text({ x: QUEUE_X + 22, y: slotY + 8, text: '', fontSize: 13, fontFamily: 'monospace', fill: C_TEXT }))
    callbackSlots.push(g)
    layer.add(g)
  }

  layer.batchDraw()
}

// --- 动画操作 ---

function animNewPromise() {
  if (animating.value) return
  promiseCreated.value = true
  promiseSettled.value = false
  callbackCount = 0
  addLog('new Promise((resolve, reject) => {...})  创建 Promise，状态 = Pending', 'text-cyan-300')

  // 重置 UI
  promiseStateText.text('Pending')
  promiseStateText.fill(C_PENDING)
  promiseStateRect.fill(C_PENDING)
  promiseValueText.text('undefined')
  promiseValueText.fill('#64748b')
  queueLabel.text('回调队列 (0 个)')
  callbackSlots.forEach(g => g.visible(false))
  promiseGroup.findOne('Rect')?.stroke(C_PENDING)
  promiseGroup.findOne('Rect')?.fill('rgba(245,158,11,0.1)')

  layer.batchDraw()
}

function animAddThen() {
  if (animating.value || !promiseCreated.value || promiseSettled.value) return
  if (callbackCount >= 5) { addLog('⚠️ 回调队列已满（最多5个演示）', 'text-amber-400'); return }

  const names = ['A', 'B', 'C', 'D', 'E']
  addLog(`.then(callback_${names[callbackCount]})  注册回调到队列`, 'text-blue-300')

  const slot = callbackSlots[callbackCount]
  const slotY = QUEUE_Y + 10 + callbackCount * (SLOT_H + SLOT_GAP)
  const text = slot.findOne('Text') as Konva.Text
  text.text(`→ callback_${names[callbackCount]}(value)`)
  slot.visible(true)
  // 入场动画
  slot.opacity(0)
  slot.y(slotY - 15)
  new Konva.Tween({ node: slot, opacity: 1, y: slotY, duration: 0.3, easing: Konva.Easings.EaseOut }).play()

  callbackCount++
  queueLabel.text(`回调队列 (${callbackCount} 个)`)
  layer.batchDraw()
}

async function animResolve() {
  if (animating.value || !promiseCreated.value || promiseSettled.value) return
  animating.value = true

  addLog('resolve(42)  调用！Promise 进入 Fulfilled 状态', 'text-emerald-300')

  // 1. 状态切换动画：pending → fulfilled
  promiseStateText.text('Fulfilled')
  promiseStateText.fill(C_FULFILLED)
  promiseValueText.text('42')
  promiseValueText.fill(C_FULFILLED)
  promiseGroup.findOne('Rect')?.stroke(C_FULFILLED)
  promiseGroup.findOne('Rect')?.fill('rgba(16,185,129,0.1)')
  new Konva.Tween({ node: promiseStateRect, fill: C_FULFILLED, duration: 0.4, easing: Konva.Easings.EaseOut }).play()
  layer.batchDraw()

  await sleep(200)

  // 2. 逐个执行回调（动画展示）
  for (let i = callbackCount - 1; i >= 0; i--) {
    const slot = callbackSlots[i]
    const text = slot.findOne('Text') as Konva.Text
    const names = ['A', 'B', 'C', 'D', 'E']
    const prevText = text.text()
    addLog(`  执行 callback_${names[i]}  收到 value=42 → 已完成`, 'text-indigo-300')

    // 执行动画：变绿 + 右移
    const rect = slot.findOne('Rect') as Konva.Rect
    rect.fill('rgba(16,185,129,0.4)')
    text.text(`✓ callback_${names[i]}(42) done`)
    layer.batchDraw()

    await sleep(500)

    // 淡出移除
    await new Promise<void>(r => new Konva.Tween({ node: slot, opacity: 0, x: 40, duration: 0.3, easing: Konva.Easings.EaseIn, onFinish: r }).play())
    slot.visible(false)
    slot.opacity(1)
    slot.x(0)
    text.text(prevText)
    rect.fill('rgba(99,102,241,0.2)')
  }

  callbackCount = 0
  queueLabel.text('回调队列 (0 个)')
  promiseSettled.value = true
  layer.batchDraw()

  addLog('✅ 所有回调执行完毕，队列已清空', 'text-emerald-300')
  animating.value = false
}

async function animReject() {
  if (animating.value || !promiseCreated.value || promiseSettled.value) return
  animating.value = true

  addLog('reject("Network Error")  调用！Promise 进入 Rejected 状态', 'text-red-300')

  // 状态切换
  promiseStateText.text('Rejected')
  promiseStateText.fill(C_REJECTED)
  promiseValueText.text('"Network Error"')
  promiseValueText.fill(C_REJECTED)
  promiseGroup.findOne('Rect')?.stroke(C_REJECTED)
  promiseGroup.findOne('Rect')?.fill('rgba(239,68,68,0.1)')
  new Konva.Tween({ node: promiseStateRect, fill: C_REJECTED, duration: 0.4, easing: Konva.Easings.EaseOut }).play()
  layer.batchDraw()

  await sleep(300)

  // .then 注册的回调不会被触发（reject 走 .catch 路径）
  for (let i = callbackCount - 1; i >= 0; i--) {
    const slot = callbackSlots[i]
    const rect = slot.findOne('Rect') as Konva.Rect
    const text = slot.findOne('Text') as Konva.Text
    rect.fill('rgba(239,68,68,0.3)')
    text.text(text.text() + ' (跳过)')
    layer.batchDraw()
    await sleep(400)
    slot.visible(false)
    slot.opacity(1)
    rect.fill('rgba(99,102,241,0.2)')
  }

  callbackCount = 0
  queueLabel.text('回调队列 (0 个)')
  promiseSettled.value = true
  layer.batchDraw()

  addLog('❌ .then 回调被跳过（只走 .catch 路径）。队列清空', 'text-red-300')
  animating.value = false
}

function animReset() {
  if (animating.value) return
  promiseCreated.value = false
  promiseSettled.value = false
  callbackCount = 0
  logs.value = []
  addLog('🔄 重置 — 所有状态回到初始', 'text-slate-400')

  promiseStateText.text('Pending')
  promiseStateText.fill(C_PENDING)
  promiseStateRect.fill(C_PENDING)
  promiseValueText.text('undefined')
  promiseValueText.fill('#64748b')
  queueLabel.text('回调队列 (0 个)')
  promiseGroup.findOne('Rect')?.stroke(C_PENDING)
  promiseGroup.findOne('Rect')?.fill('rgba(245,158,11,0.1)')
  callbackSlots.forEach(g => g.visible(false))
  layer.batchDraw()
}

// ============ 初始化 ============
onMounted(async () => {
  await nextTick()
  initKonva()
  addLog('🟢 就绪。点击按钮观察 Promise 的生命周期', 'text-slate-400')
})

onUnmounted(() => stage?.destroy())

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

// ============ 代码示例 ============
const createCode = `// Promise 构造函数接收 executor
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const ok = Math.random() > 0.3
    if (ok) resolve('成功!')
    else    reject(new Error('失败!'))
  }, 1000)
})
// 此时 promise 处于 Pending 状态`

const useCode = `promise
  .then(result => {
    console.log('成功:', result)     // resolve 后执行
    return result.toUpperCase()     // 返回新值 → 链式传递
  })
  .catch(error => {
    console.error('失败:', error)    // reject 后执行
  })
  .finally(() => {
    console.log('完成')             // 无论如何都执行（不接收参数）
  })`

const chainCode = `// 链式调用：每个 .then 返回新 Promise
fetch('/api/user/123')                   // Promise<Response>
  .then(res => res.json())              // Promise<User>
  .then(user => fetch('/api/posts/' + user.id))  // Promise<Response>
  .then(res => res.json())              // Promise<Post[]>
  .then(posts => console.log(posts))    // Promise<void>
  .catch(err => console.error('请求链中任意一步失败都会到这里', err))`

const microtaskCode = `console.log('1. 同步')

setTimeout(() => console.log('4. 宏任务'), 0)

Promise.resolve().then(() => {
  console.log('3. 微任务 (Promise)')
})

console.log('2. 同步')

// 输出顺序: 1 → 2 → 3 → 4
// 微任务总是在当前宏任务末尾执行，早于下一个宏任务`

const staticMethods = [
  { name: 'resolve', sig: '(value)', desc: '创建已 fulfilled 的 Promise', code: `Promise.resolve(42).then(v => console.log(v)) // 42` },
  { name: 'reject', sig: '(reason)', desc: '创建已 rejected 的 Promise', code: `Promise.reject(new Error('fail')).catch(e => console.error(e))` },
  { name: 'all', sig: '(iterable)', desc: '全部成功 → 结果数组；任一失败 → 立即 reject', code: `Promise.all([fetch('/a'), fetch('/b')])
  .then(([a, b]) => ...)` },
  { name: 'allSettled', sig: '(iterable)', desc: '等待全部完成，无论成败，获取所有结果', code: `const results = await Promise.allSettled(tasks)
// [{status:'fulfilled',value:...}, {status:'rejected',reason:...}]` },
  { name: 'race', sig: '(iterable)', desc: '返回第一个 settled 的 Promise（无论成败）', code: `Promise.race([timeout(5000), fetch('/api')])
// 超时控制：5 秒没响应就 reject` },
  { name: 'any', sig: '(iterable)', desc: '返回第一个 fulfilled 的；全部失败 → AggregateError', code: `Promise.any([fetch(s1), fetch(s2), fetch(s3)])
// 主备切换：任意一个服务可用即可` },
]

const scenarios = [
  { icon: '🌐', title: 'API 请求', code: `fetch('/api/users/' + userId)
  .then(res => res.json())
  .then(user => updateUI(user))
  .catch(err => showError(err))
  .finally(() => hideSpinner())` },
  { icon: '⏱️', title: '延时/超时控制', code: `function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// 超时赛跑
Promise.race([fetch('/api'), delay(5000)])
  .then(handleResponse)` },
  { icon: '📁', title: '文件读取', code: `const fs = require('fs').promises
fs.readFile('data.json', 'utf8')
  .then(JSON.parse)
  .then(data => process(data))
  .catch(() => ({}))  // 默认值` },
  { icon: '🔄', title: '顺序异步流程', code: `[task1, task2, task3].reduce(
  (chain, task) => chain.then(task),
  Promise.resolve()
)
// 每个 task 在前一个完成后执行
// 等价于: await task1(); await task2(); await task3()` },
]
</script>
