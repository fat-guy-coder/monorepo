<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">📚 队列基础：FIFO 与基本操作</h1>
          <p class="text-sm text-slate-500 mt-1">先进先出——像排队，先来的人先被服务</p></div>
        <div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-4-0</span></div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>什么是队列？—— FIFO 数据结构</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          队列（Queue）是一种<strong>先进先出（FIFO: First In, First Out）</strong>的线性数据结构。元素从<strong>队尾（rear）</strong>进入，从<strong>队头（front）</strong>离开。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>📌 核心特性：</strong></p>
          <ul class="space-y-1 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两端操作</strong>——队尾入（enqueue），队头出（dequeue），中间不可访问</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>FIFO 顺序</strong>——先入队的元素先出队，保持时间顺序</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>公平性</strong>——队列天然保证处理顺序，没有插队机制</span></li>
          </ul>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          JS <strong>事件循环的任务队列（Task Queue）</strong>——点击事件、setTimeout 回调按顺序排队执行。<br/>
          <strong>消息队列（Message Queue）</strong>——Web Worker 通信、postMessage 按 FIFO 处理。<br/>
          <strong>打印队列</strong>——先提交的文档先打印，后来的排队等待。</p>
        </aside>
      </section>

      <!-- 内存存储 -->
      <section id="sec-mem" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💾</span>队列在内存中怎么存？</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">队列三种底层实现，内存布局完全不同。</p>
        <h3 class="text-md font-semibold text-slate-700 mb-2">链表实现 — 分散节点 + front/rear 双指针</h3>
        <p class="text-slate-600 text-sm mb-3">每个节点独立堆分配。front 指向队头（出队端），rear 指向队尾（入队端）。enqueue 在 rear 后追加，dequeue 从 front 移除。</p>
        <div class="mb-3"><Code language="text" :code="qMemCode" title="队列的内存布局" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-2">循环数组 — 连续内存 + 模运算绕回</h3>
        <p class="text-slate-600 text-sm mb-2">固定大小的数组，front 和 rear 指针在数组上<strong>循环移动</strong>（模 capacity）。到达数组末尾后绕回开头。</p>
        <h3 class="text-md font-semibold text-slate-700 mb-2">JS 数组（不推荐）— shift() 是 O(n)</h3>
        <p class="text-slate-600 text-sm mb-3"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">arr.shift()</code> 删除第一个元素后，<strong>所有剩余元素必须前移一位</strong>，导致 O(n)。这就是为什么不能用 JS 数组做高性能队列。</p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 面试考点：</strong>"用两个栈实现队列"（LeetCode #232）— 一个栈负责入队，另一个栈负责出队。当出队栈为空时，把入队栈所有元素弹到出队栈（颠倒顺序），均摊 O(1)。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>队列的基本操作（全部 O(1)）</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">方法</th><th class="px-4 py-2 border font-semibold">说明</th><th class="px-4 py-2 border font-semibold">复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">入队</td><td class="px-4 py-2 border font-mono text-cyan-600">enqueue(item)</td><td class="px-4 py-2 border">将元素放入队尾</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">出队</td><td class="px-4 py-2 border font-mono text-red-600">dequeue()</td><td class="px-4 py-2 border">移除并返回队头元素</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">查看队头</td><td class="px-4 py-2 border font-mono text-amber-600">front()</td><td class="px-4 py-2 border">返回队头但不移除</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">判空</td><td class="px-4 py-2 border font-mono">isEmpty()</td><td class="px-4 py-2 border">队列是否为空</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">大小</td><td class="px-4 py-2 border font-mono">size()</td><td class="px-4 py-2 border">队列中元素个数</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="queueImplCode" title="queue_implementation.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ JS 注意：</strong><code>arr.shift()</code> 虽然是"从头部移除"，但它是 <strong>O(n)</strong>！因为所有剩余元素都要前移。不要用数组 shift 模拟队列——用链表或循环队列实现真正的 O(1) 出队。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>队列的三种实现</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">实现方式</th><th class="px-4 py-2 border font-semibold">Enqueue</th><th class="px-4 py-2 border font-semibold">Dequeue</th><th class="px-4 py-2 border font-semibold">空间</th><th class="px-4 py-2 border font-semibold">适用场景</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">数组（不推荐）</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) push</td><td class="px-4 py-2 border font-mono text-red-600">O(n) shift</td><td class="px-4 py-2 border">动态</td><td class="px-4 py-2 border">仅用于 tiny 数据</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">链表</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) 尾插</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) 头删</td><td class="px-4 py-2 border">动态</td><td class="px-4 py-2 border">通用场景</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">循环数组</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border">固定容量</td><td class="px-4 py-2 border">高性能、内存受限</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>队列的经典应用 & 变体预览</h2>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>BFS 广度优先搜索</strong>— 树的层序遍历、图的最短路径</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>任务调度</strong>— 打印队列、消息队列、请求排队</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>滑动窗口</strong>— 维护最近 N 个元素（结合单调队列）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>双端队列（Deque）</strong>— 两端都可出入（下一节）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单调队列</strong>— 滑动窗口最值（下一节）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>循环队列</strong>— 固定缓存区（下一节）</span></li>
        </ul>
      </section>

      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：队列的 Enqueue / Dequeue</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">FIFO：先进先出。Enqueue <strong>从右侧追加</strong>，Dequeue <strong>从左侧移除</strong>。先入队的元素在左边等待最久。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ qb.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ qbStatus }}</span>
          <span class="text-slate-400 ml-auto">⏱️ Enqueue O(1) · Dequeue O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="qbEnq" :disabled="qbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">Enqueue →</button>
          <button @mousedown="qbDeq" :disabled="qbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">← Dequeue</button>
          <button @mousedown="qbFront" :disabled="qbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm disabled:opacity-40">Front</button>
          <button @mousedown="qbReset" :disabled="qbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="qbBox" class="w-full relative" :style="{height:qbH+'px'}">
          <v-stage :config="{width:qbW,height:qbH}">
            <v-layer>
              <v-rect v-for="b in qb" :key="b.id" :config="qbR(b)" />
              <v-text v-for="b in qb" :key="'t'+b.id" :config="qbT(b)" />
              <v-text v-if="!qb.length" :config="{x:qbW/2-60,y:60,text:'队列为空',fontSize:14,fill:'#94a3b8',align:'center'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>队列 = FIFO</strong>——先进先出，队尾入队头出</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>enqueue / dequeue / front 全部 O(1)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>JS 不要用 shift() 做队列</strong>——O(n) 太慢，用链表或循环数组</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>典型应用：BFS、任务调度、滑动窗口、消息队列</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-3-dfs-stack" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：DFS 栈实现</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-4-queue/dsa-2-4-1-deque" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：双端队列 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const navList=[{id:"sec-1",name:"什么是队列"},{id:"sec-mem",name:"💾 内存存储"},{id:"sec-2",name:"基本操作"},{id:"sec-3",name:"三种实现"},{id:"sec-4",name:"经典应用"},{id:"sec-viz",name:"🎬 动画演示"},{id:"sec-6",name:"小结"}]

const qMemCode = `// 链表队列（分散内存）
//  front                    rear
//   ↓                        ↓
//  [5|0x3400]→[3|0x1A00]→[8|null]
//  enqueue(2):
//    new node [2|null], rear.next → [2], rear → [2]
//  dequeue():
//    return front.val(5), front → front.next(0x3400)
//  每个节点额外 ~20 字节（指针 + 对象头）

// 循环数组队列（连续内存，容量=5）
//  [5][3][8][-][-]
//   ↑front  ↑rear(指向下一个空位)
//  enqueue(2): data[rear]=2, rear=(rear+1)%5
//  [5][3][8][2][-]
//       ↑front ↑rear
//  dequeue(): 返回 data[front]=5, front=(front+1)%5
//  [-][3][8][2][-]
//      ↑front ↑rear
//  ⚠️ 空满判定：rear==front 为 空；(rear+1)%cap==front 为 满（预留一格）

// JS arr.shift() 为什么是 O(n)？
// [5,3,8] → shift() → 5 返回，[3,8] 但 3 和 8 必须前移到索引 0,1
// 底层 V8 会对所有后续元素进行 memmove → O(n)`

const qC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b'}
const qbW=ref(700),qbH=ref(200),qbId=ref(10),qbBusy=ref(false),qbStatus=ref('')
interface QX {id:number;val:number;color:string;s:number}
const qb=reactive<QX[]>([])
const qbBox=ref<HTMLDivElement>()
const d9=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function qbInit(vals:number[]=[5,3,8]){qb.length=0;vals.forEach((v,i)=>qb.push({id:i+1,val:v,color:qC.cyan,s:1}))}
async function qbAct(msg:string,fn:()=>Promise<void>){if(qbBusy.value)return;qbBusy.value=true;qbStatus.value=msg;try{await fn()}catch(_){};await d9(250);qbBusy.value=false;qbStatus.value=''}
function qbR(b:QX){const bw=64,bh=36,x=60+qb.indexOf(b)*80,y=90;return{x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,fill:b.color,cornerRadius:6,stroke:'#64748b',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:3}}
function qbT(b:QX){const bw=64,bh=36,x=60+qb.indexOf(b)*80,y=90;return{x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,text:String(b.val),fontSize:14,fontFamily:'monospace',fontStyle:'bold',fill:qC.text,align:'center',verticalAlign:'middle'}}
function qbEnq(){qbAct('Enqueue  O(1)',async()=>{const v=~~(Math.random()*90+10);const nb:QX={id:qbId.value++,val:v,color:qC.green,s:0};qb.push(nb);await d9(60);nb.s=1;await d9(400);nb.color=qC.cyan})}
function qbDeq(){if(!qb.length)return;qbAct('Dequeue  O(1)',async()=>{qb[0].color=qC.red;await d9(400);qb[0].s=0;await d9(300);qb.shift()})}
function qbFront(){if(!qb.length)return;qbAct('Front  O(1)',async()=>{qb[0].color=qC.orange;await d9(600);qb[0].color=qC.cyan})}
function qbReset(){qbBusy.value=false;qbInit()}
let qbRO:ResizeObserver|null=null
onMounted(()=>{qbInit();if(qbBox.value){qbW.value=qbBox.value.clientWidth;qbRO=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200)qbW.value=Math.max(300,w)});qbRO.observe(qbBox.value)}})
onUnmounted(()=>qbRO?.disconnect())

const queueImplCode=`// ===== 链表实现队列（推荐）=====
class QNode<T> { constructor(public val: T, public next: QNode<T> | null = null) {} }

class LinkedQueue<T> {
    private head: QNode<T> | null = null  // 队头（出队这端）
    private tail: QNode<T> | null = null  // 队尾（入队这端）
    private _size = 0

    enqueue(item: T): void {               // O(1)
        const node = new QNode(item)
        if (!this.tail) { this.head = this.tail = node }
        else { this.tail.next = node; this.tail = node }
        this._size++
    }
    dequeue(): T | undefined {             // O(1)
        if (!this.head) return undefined
        const val = this.head.val
        this.head = this.head.next
        if (!this.head) this.tail = null
        this._size--
        return val
    }
    front(): T | undefined { return this.head?.val }
    get size(): number { return this._size }
    isEmpty(): boolean { return this.head === null }
}

// 执行过程示例:
// enqueue(5): head→[5]←tail
// enqueue(3): head→[5]→[3]←tail
// enqueue(8): head→[5]→[3]→[8]←tail
// dequeue():  head→[3]→[8]←tail   返回 5`
</script>
