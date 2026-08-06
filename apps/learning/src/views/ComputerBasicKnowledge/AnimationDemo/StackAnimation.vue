<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📚 栈 Stack — push/pop 动画演示</h1>
          <p class="text-sm text-slate-500 mt-1">LIFO（后进先出）— 像一摞盘子，只能从顶部放入和取出</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/ComputerBasicKnowledge/AnimationDemo/StackAnimation.vue" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Konva 动画</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <!-- 动画演示区 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎮</span>
          交互演示
        </h2>

        <!-- 控制栏 -->
        <div class="flex items-center gap-3 mb-4 flex-wrap">
          <input
            v-model="inputValue"
            @keyup.enter="push"
            placeholder="输入值（如 42）"
            class="px-3 py-2 border border-slate-300 rounded-lg text-sm w-36 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
          <button @click="push" :disabled="animating || !inputValue"
            class="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            ⬇️ Push
          </button>
          <button @click="pop" :disabled="animating || stack.length === 0"
            class="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            ⬆️ Pop
          </button>
          <button @click="doPeek" :disabled="animating || stack.length === 0"
            class="px-3 py-2 border border-amber-300 text-amber-700 rounded-lg text-sm hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            👀 Peek
          </button>
          <button @click="resetAll" :disabled="animating"
            class="px-3 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            🔄 重置
          </button>
          <span v-if="message" class="text-sm font-mono px-3 py-1 rounded-full border"
            :class="messageType === 'pop' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'">
            {{ message }}
          </span>
        </div>

        <!-- Canvas 容器 -->
        <div ref="canvasContainer" class="bg-slate-900 rounded-xl overflow-hidden flex justify-center" style="min-height: 400px"></div>

        <!-- 状态 -->
        <div class="flex gap-4 mt-4 text-sm text-slate-500">
          <span>栈深度: <strong class="text-slate-700">{{ stack.length }}</strong></span>
          <span>栈顶: <strong class="text-slate-700 font-mono">{{ stack.length > 0 ? stack[stack.length - 1] : '(空)' }}</strong></span>
          <span>栈底: <strong class="text-slate-700 font-mono">{{ stack.length > 0 ? stack[0] : '(空)' }}</strong></span>
        </div>
      </section>

      <!-- 代码展示 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💻</span>
          对应代码
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-600 mb-2">Go</h3>
            <Code language="go" :code="goCode" title="stack.go" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-600 mb-2">TypeScript</h3>
            <Code language="ts" :code="tsCode" title="stack.ts" />
          </div>
        </div>
      </section>

      <!-- 知识点 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📖</span>
          关于栈
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">⏱️ 时间复杂度</h3>
            <table class="w-full text-sm">
              <tr><td class="py-1 text-slate-500">Push</td><td class="py-1 font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="py-1 text-slate-500">Pop</td><td class="py-1 font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="py-1 text-slate-500">Peek</td><td class="py-1 font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="py-1 text-slate-500">Search</td><td class="py-1 font-mono text-amber-600">O(n)</td></tr>
            </table>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">🎯 典型应用</h3>
            <ul class="space-y-1 text-sm text-slate-600">
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>函数调用栈 (Call Stack)</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>撤销/重做 (Undo/Redo)</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>括号匹配检查</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>深度优先搜索 (DFS)</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>表达式求值</span></li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">📐 LIFO 原则</h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              <strong>L</strong>ast <strong>I</strong>n, <strong>F</strong>irst <strong>O</strong>ut<br/>最后进去的最先出来。就像一摞盘子——只能动最上面那个。
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Konva from 'konva'
import { Code, EditorLink } from 'components'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

// ---- 常量 ----
const W = 600; const H = 400
const STACK_X = 210; const STACK_W = 180
const ITEM_H = 40; const GAP = 4
const STACK_TOP = 55; const STACK_BOTTOM = 350
const ITEM_X = STACK_X + 5; const ITEM_W = STACK_W - 10
const COLORS = ['#22d3ee','#2dd4bf','#34d399','#a3e635','#facc15','#fb923c','#f87171','#e879f9','#818cf8','#38bdf8']

// ---- Vue 状态 ----
const stack = ref<number[]>([])
const inputValue = ref('')
const animating = ref(false)
const message = ref('')
const messageType = ref<'pop' | 'peek'>('pop')
const canvasContainer = ref<HTMLDivElement>()

// ---- Konva 对象 ----
let stage: Konva.Stage
let layer: Konva.Layer
let boxRect: Konva.Rect
let topLabel: Konva.Text
let bottomLabel: Konva.Text
// 栈元素的 Konva Group
let itemGroups: Konva.Group[] = []

function itemY(index: number) {
  return STACK_BOTTOM - (index + 1) * (ITEM_H + GAP)
}

// 创建单个栈元素的 Group（rect + text）
function createItemGroup(value: number, index: number): Konva.Group {
  const y = itemY(index)
  const color = COLORS[index % COLORS.length]
  const g = new Konva.Group({ x: 0, y: 0 })

  const rect = new Konva.Rect({
    x: ITEM_X, y, width: ITEM_W, height: ITEM_H,
    fill: color, stroke: 'rgba(0,0,0,0.15)', strokeWidth: 1,
    cornerRadius: 6,
    shadowColor: 'rgba(0,0,0,0.5)', shadowBlur: 8, shadowOffsetY: 3,
  })
  const text = new Konva.Text({
    x: ITEM_X, y: y + 9, width: ITEM_W,
    text: String(value), fontSize: 18, fontFamily: 'monospace',
    fill: '#0f172a', align: 'center',
  })
  g.add(rect)
  g.add(text)
  return g
}

// 全量重绘（重置时用）
function redrawAll() {
  // 清除旧元素
  itemGroups.forEach(g => g.destroy())
  itemGroups = []
  // 重建
  stack.value.forEach((v, i) => {
    const g = createItemGroup(v, i)
    itemGroups.push(g)
    layer.add(g)
  })
  layer.batchDraw()
}

// ---- 初始化 Konva ----
onMounted(async () => {
  await nextTick()
  if (!canvasContainer.value) return

  stage = new Konva.Stage({
    container: canvasContainer.value,
    width: W, height: H,
  })
  layer = new Konva.Layer()
  stage.add(layer)

  // 栈容器虚线框
  boxRect = new Konva.Rect({
    x: STACK_X, y: STACK_TOP, width: STACK_W, height: STACK_BOTTOM - STACK_TOP,
    stroke: '#64748b', strokeWidth: 2.5,
    cornerRadius: [0, 0, 8, 8],
    fill: 'rgba(30,41,59,0.5)',
    dash: [6, 4],
    listening: false,
  })
  layer.add(boxRect)

  // 标签
  topLabel = new Konva.Text({ x: STACK_X + STACK_W + 12, y: STACK_TOP - 5, text: '← 栈顶 Top', fontSize: 14, fontFamily: 'sans-serif', fill: '#f472b6', listening: false })
  bottomLabel = new Konva.Text({ x: STACK_X + STACK_W + 12, y: STACK_BOTTOM - 22, text: '← 栈底 Bottom', fontSize: 14, fontFamily: 'sans-serif', fill: '#94a3b8', listening: false })
  layer.add(topLabel)
  layer.add(bottomLabel)

  // 初始数据
  ;[10, 20, 30].forEach((v, i) => {
    stack.value.push(v)
    const g = createItemGroup(v, i)
    itemGroups.push(g)
    layer.add(g)
  })
  layer.batchDraw()
})

onUnmounted(() => {
  stage?.destroy()
})

// ---- Push 动画 ----
async function push() {
  const val = parseInt(inputValue.value)
  if (isNaN(val) || animating.value) return
  animating.value = true
  message.value = ''
  inputValue.value = ''

  const idx = stack.value.length
  stack.value.push(val)

  // 创建新元素，初始位置在栈顶上方（画布外）
  const g = createItemGroup(val, idx)
  const rect = g.findOne('Rect') as Konva.Rect
  const text = g.findOne('Text') as Konva.Text
  const startY = STACK_TOP - ITEM_H - 15
  rect.y(startY)
  text.y(startY + 9)
  rect.fill('#fbbf24') // 入栈高亮色
  layer.add(g)
  itemGroups.push(g)
  layer.batchDraw()

  // 动画：滑入栈中
  const targetY = itemY(idx)
  await tween(rect, { y: targetY, duration: 0.4 })
  text.y(targetY + 9)
  layer.batchDraw()

  // 恢复颜色
  await sleep(150)
  rect.fill(COLORS[idx % COLORS.length])
  layer.batchDraw()

  animating.value = false
}

// ---- Pop 动画 ----
async function pop() {
  if (stack.value.length === 0 || animating.value) return
  animating.value = true
  message.value = ''

  const topIdx = stack.value.length - 1
  const g = itemGroups[topIdx]
  const rect = g.findOne('Rect') as Konva.Rect
  const text = g.findOne('Text') as Konva.Text

  // 动画：向上飞出 + 缩小 + 变红 + 淡出
  rect.fill('#ef4444')
  layer.batchDraw()
  await tween(rect, { y: STACK_TOP - ITEM_H - 20, scaleX: 0.3, scaleY: 0.3, opacity: 0, duration: 0.35 })
  text.y(rect.y() + 9)
  text.opacity(0)

  // 移除
  const val = stack.value.pop()!
  g.destroy()
  itemGroups.splice(topIdx, 1)
  message.value = `Pop → ${val}`
  messageType.value = 'pop'
  layer.batchDraw()

  animating.value = false
}

// ---- Peek ----
function doPeek() {
  if (animating.value || stack.value.length === 0) return
  const val = stack.value[stack.value.length - 1]
  message.value = `Peek → ${val}（栈顶元素）`
  messageType.value = 'peek'

  const g = itemGroups[stack.value.length - 1]
  const rect = g.findOne('Rect') as Konva.Rect
  const orig = rect.fill()
  rect.fill('#fbbf24')
  layer.batchDraw()
  setTimeout(() => {
    rect.fill(orig)
    layer.batchDraw()
  }, 400)
}

function resetAll() {
  if (animating.value) return
  stack.value = []
  message.value = ''
  redrawAll()
}

// Konva Tween 封装
function tween(node: Konva.Shape, props: Record<string, number>) {
  return new Promise<void>(resolve => {
    new Konva.Tween({
      node,
      ...props,
      easing: Konva.Easings.EaseInOut,
      onFinish: resolve,
    }).play()
  })
}
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

// ---- 代码示例 ----
const goCode = `package main

import "fmt"

type Stack struct {
    items []int
}

func (s *Stack) Push(v int) {
    s.items = append(s.items, v)
}

func (s *Stack) Pop() (int, bool) {
    if len(s.items) == 0 {
        return 0, false
    }
    v := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return v, true
}

func (s *Stack) Peek() (int, bool) {
    if len(s.items) == 0 {
        return 0, false
    }
    return s.items[len(s.items)-1], true
}

func main() {
    s := Stack{}
    s.Push(10)  // [10]
    s.Push(20)  // [10, 20]
    s.Push(30)  // [10, 20, 30]
    v, _ := s.Pop()  // 30, [10, 20]
    fmt.Println(v)   // 输出: 30
}`

const tsCode = `class Stack<T> {
  private items: T[] = []

  push(v: T): void {
    this.items.push(v)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  get size(): number {
    return this.items.length
  }
}

const stack = new Stack<number>()
stack.push(10)  // [10]
stack.push(20)  // [10, 20]
stack.push(30)  // [10, 20, 30]
console.log(stack.pop())  // 30
console.log(stack.peek()) // 20`
</script>
