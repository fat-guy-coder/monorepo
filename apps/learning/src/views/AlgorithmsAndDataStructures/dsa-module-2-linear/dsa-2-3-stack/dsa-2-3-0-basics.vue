<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">📚 栈基础：LIFO 与基本操作</h1>
          <p class="text-sm text-slate-500 mt-1">后进先出——像一叠盘子，最后放上去的最先拿下来</p></div>
        <div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-3-0</span></div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是栈 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>什么是栈？—— LIFO 数据结构</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          栈（Stack）是一种<strong>后进先出（LIFO: Last In, First Out）</strong>的线性数据结构。只能在一端（栈顶）进行插入和删除操作。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>📌 核心特性：</strong></p>
          <ul class="space-y-1 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一端操作</strong>——只在栈顶（top）进行 push/pop，栈底不可直接访问</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LIFO 顺序</strong>——最后入栈的元素最先出栈，像一叠盘子</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>受限访问</strong>——只能看到栈顶元素（peek），不能随机访问中间元素</span></li>
          </ul>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          浏览器<strong>后退按钮</strong>就是栈——每次访问新页面 push 到历史栈，点后退 = pop 当前页面回到上一页。<br/>
          JS <strong>调用栈（Call Stack）</strong>——函数调用 push 栈帧，return 时 pop，栈溢出就是「Maximum call stack size exceeded」。</p>
        </aside>
      </section>

      <!-- 内存存储 -->
      <section id="sec-mem" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💾</span>栈在内存中怎么存？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          栈的<strong>逻辑结构</strong>和<strong>物理存储</strong>可以不同。取决于底层实现：
        </p>
        <h3 class="text-md font-semibold text-slate-700 mb-2">数组实现 — 连续内存 + top 指针</h3>
        <p class="text-slate-600 text-sm mb-3">
          底层是一个固定大小的数组，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">top</code> 指针（索引）标记栈顶位置。push 时 top 上移写入，pop 时 top 下移（不需要真正"删除"，覆盖即可）。
        </p>
        <div class="mb-3"><Code language="text" :code="stkMemCode" title="栈的内存布局（数组实现）" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-2">JS 中的两层"栈"</h3>
        <ul class="space-y-1 text-slate-600 text-sm mb-3">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>调用栈（Call Stack）</strong>— V8 引擎的真实栈，在 C++ 层面分配。每个函数调用压入一个栈帧（含参数、局部变量、返回地址），大小约 1MB。递归过深 → Stack Overflow</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据栈（Data Stack）</strong>— 用 JS 数组模拟的栈，存储在<strong>堆</strong>上。push/pop 操作在 js 层，无容量上限（直到 OOM）</span></li>
        </ul>
        <h3 class="text-md font-semibold text-slate-700 mb-2">链表实现 — 分散节点</h3>
        <p class="text-slate-600 text-sm">每个节点独立分配在堆上，top 指针指向栈顶节点。prev 指针形成链。空间开销：每个节点多一个指针（8 字节）+ 对象头。</p>
        <div class="overflow-x-auto mt-3">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">实现</th><th class="px-4 py-2 border font-semibold">内存</th><th class="px-4 py-2 border font-semibold">push</th><th class="px-4 py-2 border font-semibold">缓存</th><th class="px-4 py-2 border font-semibold">适用</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">数组</td><td class="px-4 py-2 border">连续</td><td class="px-4 py-2 border">均摊 O(1)</td><td class="px-4 py-2 border text-emerald-600">✅ 好</td><td class="px-4 py-2 border">通用，JS 默认</td></tr>
              <tr><td class="px-4 py-2 border">链表</td><td class="px-4 py-2 border">分散</td><td class="px-4 py-2 border">严格 O(1)</td><td class="px-4 py-2 border text-amber-600">❌ 差</td><td class="px-4 py-2 border">需严格 O(1) 无扩容</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 基本操作 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>栈的基本操作（全部 O(1)）</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">方法</th><th class="px-4 py-2 border font-semibold">说明</th><th class="px-4 py-2 border font-semibold">复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">入栈</td><td class="px-4 py-2 border font-mono text-cyan-600">push(item)</td><td class="px-4 py-2 border">将元素放到栈顶</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">出栈</td><td class="px-4 py-2 border font-mono text-red-600">pop()</td><td class="px-4 py-2 border">移除并返回栈顶元素</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">查看栈顶</td><td class="px-4 py-2 border font-mono text-amber-600">peek()</td><td class="px-4 py-2 border">返回栈顶元素但不移除</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">判空</td><td class="px-4 py-2 border font-mono">isEmpty()</td><td class="px-4 py-2 border">栈是否为空</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">大小</td><td class="px-4 py-2 border font-mono">size()</td><td class="px-4 py-2 border">栈中元素个数</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="stackImplCode" title="stack_implementation.ts" /></div>
      </section>

      <!-- 3. 实现方式 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>栈的两种实现：数组 vs 链表</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">维度</th><th class="px-4 py-2 border font-semibold">数组实现</th><th class="px-4 py-2 border font-semibold">链表实现</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">push</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)（头插法）</td></tr>
              <tr><td class="px-4 py-2 border">pop</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">空间</td><td class="px-4 py-2 border">有容量上限（需扩容）</td><td class="px-4 py-2 border">动态分配，无上限</td></tr>
              <tr><td class="px-4 py-2 border">缓存</td><td class="px-4 py-2 border text-emerald-600">✅ 连续内存，缓存友好</td><td class="px-4 py-2 border text-amber-600">❌ 节点分散，缓存不友好</td></tr>
              <tr><td class="px-4 py-2 border">JS 用法</td><td class="px-4 py-2 border font-mono">arr.push() / arr.pop()</td><td class="px-4 py-2 border">需手动实现 ListNode</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm">JS 中直接用数组的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">push()</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">pop()</code> 就是栈，简单高效。</p>
      </section>

      <!-- 4. 经典应用 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>栈的经典应用场景</h2>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>函数调用栈</strong>— JS 引擎用栈管理函数调用，递归过深 → Stack Overflow</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>括号匹配</strong>— 左括号入栈，右括号与栈顶匹配（LeetCode #20）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>撤销/重做（Undo/Redo）</strong>— 操作历史用两个栈实现</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>表达式求值</strong>— 中缀转后缀、计算器实现（下一节详细讲）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DFS 深度优先搜索</strong>— 用栈代替递归遍历树/图</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单调栈</strong>— 找下一个更大/更小元素（下一节详细讲）</span></li>
        </ul>
      </section>

      <!-- 🎬 动画 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：栈的 Push / Pop</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">LIFO：后进先出。新元素<strong>从上方推入</strong>，出栈<strong>从上方弹出</strong>。底部元素必须等上面全弹出后才能访问。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 深度: {{ sb.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ sbStatus }}</span>
          <span class="text-slate-400 ml-auto">⏱️ Push O(1) · Pop O(1) · Peek O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="sbPush" :disabled="sbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">Push</button>
          <button @mousedown="sbPop" :disabled="sbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">Pop</button>
          <button @mousedown="sbPeek" :disabled="sbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm disabled:opacity-40">Peek</button>
          <button @mousedown="sbReset" :disabled="sbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border active:scale-95 transition-all duration-150 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="sbBox" class="w-full relative" :style="{height:sbH+'px'}">
          <v-stage :config="{width:sbW,height:sbH}">
            <v-layer>
              <v-rect v-for="b in sb" :key="b.id" :config="sbR(b)" />
              <v-text v-for="b in sb" :key="'t'+b.id" :config="sbT(b)" />
              <v-text v-if="!sb.length" :config="{x:sbW/2-40,y:90,text:'栈为空',fontSize:14,fill:'#94a3b8',align:'center'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>栈 = LIFO</strong>——后进先出，只在一端（栈顶）操作</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>push / pop / peek 全部 O(1)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>JS 中数组就是栈：</strong><code>arr.push()</code> 入栈，<code>arr.pop()</code> 出栈</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>典型应用：括号匹配、撤销重做、函数调用栈、DFS、单调栈</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-algorithms/dsa-2-2-7-merge" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：链表合并与排序</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-1-mono-stack" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：单调栈 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const navList=[{id:"sec-1",name:"什么是栈"},{id:"sec-mem",name:"💾 内存存储"},{id:"sec-2",name:"基本操作"},{id:"sec-3",name:"数组 vs 链表"},{id:"sec-4",name:"经典应用"},{id:"sec-viz",name:"🎬 动画演示"},{id:"sec-6",name:"小结"}]

const stkMemCode = `// 数组实现的栈（连续内存）
// 容量=5, top=3（指向栈顶下一个空位）
//
// 内存地址:  0x1000  0x1004  0x1008  0x100C  0x1010
//           ┌──────┬──────┬──────┬──────┬──────┐
//           │  5   │  3   │  8   │  -   │  -   │
//           └──────┴──────┴──────┴──────┴──────┘
//                          ↑ top=3
// push(2): top=3 处写入 2, top → 4
// pop():   top→3, 返回 data[3]=8（不擦除，下次 push 覆盖）
// peek():  data[top-1] = data[2] = 8
//
// ✅ 关键：pop 不需要删除元素，只需 top--，下次 push 会覆盖
// ⚠️ 扩容时需 O(n) 复制整个数组

// 链表实现的栈（分散内存）
//  堆      节点
// 0xA000  [8 | 0xB000]──→ [3 | 0xC000]──→ [5 | null]
//          ↑ top
// push(2): new node [2 | 0xA000], top → new node
// pop():   return top.val(8), top → top.next(0xB000)
// 每个节点额外 8 字节指针 + 对象头`

// ===== 🎬 栈动画 =====
const sC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b'}
const sbW=ref(700),sbH=ref(320),sbId=ref(10),sbBusy=ref(false),sbStatus=ref('')
interface SX {id:number;val:number;color:string;s:number}
const sb=reactive<SX[]>([])
const sbBox=ref<HTMLDivElement>()
const dd=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function sbInit(vals:number[]=[5,3,8]){sb.length=0;vals.forEach((v,i)=>sb.push({id:i+1,val:v,color:sC.cyan,s:1}))}
async function sbAct(msg:string,fn:()=>Promise<void>){if(sbBusy.value)return;sbBusy.value=true;sbStatus.value=msg;try{await fn()}catch(_){};await dd(250);sbBusy.value=false;sbStatus.value=''}
function sbR(b:SX){const bw=140,bh=34,x=sbW.value/2-bw/2,y=200-(sb.indexOf(b)+1)*40;return{x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,fill:b.color,cornerRadius:6,stroke:'#64748b',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:3}}
function sbT(b:SX){const bw=140,bh=34,x=sbW.value/2-bw/2,y=200-(sb.indexOf(b)+1)*40;return{x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,text:String(b.val),fontSize:15,fontFamily:'monospace',fontStyle:'bold',fill:'#1e293b',align:'center',verticalAlign:'middle'}}
function sbPush(){sbAct('Push  O(1)',async()=>{const v=~~(Math.random()*90+10);const nb:SX={id:sbId.value++,val:v,color:sC.green,s:0};sb.push(nb);await dd(60);nb.s=1;await dd(400);nb.color=sC.cyan})}
function sbPop(){if(!sb.length)return;sbAct('Pop  O(1)',async()=>{const t=sb[sb.length-1];t.color=sC.red;await dd(400);t.s=0;await dd(300);sb.pop()})}
function sbPeek(){if(!sb.length)return;sbAct('Peek  O(1)',async()=>{sb[sb.length-1].color=sC.orange;await dd(600);sb[sb.length-1].color=sC.cyan})}
function sbReset(){sbBusy.value=false;sbInit()}
let sbRO:ResizeObserver|null=null
onMounted(()=>{sbInit();if(sbBox.value){sbW.value=sbBox.value.clientWidth;sbRO=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200)sbW.value=Math.max(300,w)});sbRO.observe(sbBox.value)}})
onUnmounted(()=>sbRO?.disconnect())

const stackImplCode=`// ===== 数组实现栈（JS 最简单的方式）=====
class ArrayStack<T> {
    private data: T[] = []
    push(item: T): void { this.data.push(item) }      // O(1) 均摊
    pop(): T | undefined { return this.data.pop() }    // O(1)
    peek(): T | undefined { return this.data[this.data.length - 1] } // O(1)
    get size(): number { return this.data.length }
    isEmpty(): boolean { return this.data.length === 0 }
}

// ===== 链表实现栈（头插法，O(1) 无扩容）=====
class ListNode<T> { constructor(public val: T, public next: ListNode<T> | null = null) {} }

class LinkedStack<T> {
    private top: ListNode<T> | null = null
    private _size = 0

    push(item: T): void {
        this.top = new ListNode(item, this.top)  // 新节点指向上一个顶点
        this._size++
    }
    pop(): T | undefined {
        if (!this.top) return undefined
        const val = this.top.val
        this.top = this.top.next  // 顶点下移
        this._size--
        return val
    }
    peek(): T | undefined { return this.top?.val }
    get size(): number { return this._size }
    isEmpty(): boolean { return this.top === null }
}
// 执行过程示例:
// push(3): top→[3]
// push(5): top→[5]→[3]
// push(8): top→[8]→[5]→[3]
// pop():   top→[5]→[3]  返回 8`
</script>
