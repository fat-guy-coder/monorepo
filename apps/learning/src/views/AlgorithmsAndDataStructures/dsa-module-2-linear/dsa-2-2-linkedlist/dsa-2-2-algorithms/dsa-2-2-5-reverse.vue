<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 链表反转全家桶</h1>
          <p class="text-sm text-slate-500 mt-1">反转整个 / 反转前N / 反转区间 / k个一组 / 回文链表——面试必考链表操作</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 反转链表总览 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          反转链表的核心思想 —— 把箭头全部反过来
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          反转链表是链表操作的<strong>基本功</strong>。无论是迭代还是递归，核心操作只有一个：<strong>让当前节点的 next 指向前一个节点</strong>。
          熟练之后，区间反转、K个一组、回文检测都可以用同样的思路解决。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">变体</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">核心技巧</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">反转整个链表</td><td class="px-4 py-2 border text-emerald-600">Easy</td><td class="px-4 py-2 border font-mono">#206</td><td class="px-4 py-2 border">迭代三指针 / 递归</td></tr>
              <tr><td class="px-4 py-2 border">反转前 N 个</td><td class="px-4 py-2 border text-amber-600">Medium</td><td class="px-4 py-2 border font-mono">—</td><td class="px-4 py-2 border">递归 + 后继节点记录</td></tr>
              <tr><td class="px-4 py-2 border">反转区间 [m, n]</td><td class="px-4 py-2 border text-amber-600">Medium</td><td class="px-4 py-2 border font-mono">#92</td><td class="px-4 py-2 border">找到前驱 → 反转区间 → 重新连接</td></tr>
              <tr><td class="px-4 py-2 border">K 个一组反转</td><td class="px-4 py-2 border text-red-600">Hard</td><td class="px-4 py-2 border font-mono">#25</td><td class="px-4 py-2 border">迭代判断 k 个 → 反转 → 递归余下</td></tr>
              <tr><td class="px-4 py-2 border">回文链表</td><td class="px-4 py-2 border text-emerald-600">Easy</td><td class="px-4 py-2 border font-mono">#234</td><td class="px-4 py-2 border">快慢找中点 + 反转后半 + 双指针比较</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 反转整个链表 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          反转整个链表 — 迭代 + 递归 两种写法
        </h2>
        <div class="mb-4"><Code language="ts" :code="reverseAllCode" title="reverse_linked_list.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          反转链表 = 数组 <code>.reverse()</code> 的链表版本。数组可以 O(1) 随机访问所以用双指针交换，<br/>
          链表只能顺序访问所以必须逐个改 <code>.next</code> 指向。时间都是 O(n)，但链表多用了几个指针变量。</p>
        </aside>
      </section>

      <!-- 3. 反转前N / 反转区间 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          反转前N & 反转区间 [m, n] — 通用的递归框架
        </h2>
        <div class="mb-4"><Code language="ts" :code="reverseNCode" title="reverse_n_reverse_between.ts" /></div>
      </section>

      <!-- 4. K个一组反转 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          K 个一组反转链表 — 迭代 + 递归的配合
        </h2>
        <div class="mb-4"><Code language="ts" :code="reverseKGroupCode" title="reverse_k_group.ts" /></div>
      </section>

      <!-- 5. 回文链表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          回文链表 — 找中点 + 反转后半 + 双指针比较
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          回文链表的 O(n) 时间 O(1) 空间解法<strong>组合了两个核心技巧</strong>：快慢指针找中点 + 反转后半段。
        </p>
        <div class="mb-4"><Code language="ts" :code="palindromeCode" title="palindrome_linked_list.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：三指针迭代反转链表
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察 <strong>prev</strong>（红）、<strong>curr</strong>（橙）、<strong>next</strong>（蓝）三个指针如何逐步反转每一个箭头。
          每步：① 保存 next → ② curr.next 指向 prev → ③ 三人组整体前进。
        </p>
        <!-- 动态信息 -->
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ nodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ revStatus }}</span>
          <span v-if="revStep>0" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">🔁 Step {{ revStep }}/{{ nodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full ml-auto text-slate-500">⏱️ O(n) · O(1) 空间</span>
        </div>
        <!-- 指针图例 -->
        <div class="flex items-center gap-4 mb-1 text-xs text-slate-500">
          <span><span class="inline-block w-3 h-3 rounded-full bg-red-500 align-middle mr-1"></span>prev</span>
          <span><span class="inline-block w-3 h-3 rounded-full bg-amber-500 align-middle mr-1"></span>curr</span>
          <span><span class="inline-block w-3 h-3 rounded-full bg-blue-400 align-middle mr-1"></span>next</span>
        </div>
        <!-- 按钮 -->
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doReverseStep" :disabled="revBusy||revDone"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
            {{ revButtonLabel }}
          </button>
          <button @mousedown="doRevReset" :disabled="revBusy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
            ↺ Reset
          </button>
        </div>
        <!-- Canvas -->
        <div ref="revBox" class="w-full relative overflow-x-auto" :style="{height:revH+'px'}">
          <v-stage :config="{width:revW, height:revH}">
            <v-layer>
              <!-- 节点间箭头 -->
              <v-arrow v-for="(n,i) in nodes.slice(0,-1)" :key="'arr'+n.id"
                :config="arrowCfg(i)" />
              <!-- 节点 -->
              <v-rect v-for="n in nodes" :key="'r'+n.id" :config="nodeR(n)" />
              <v-text v-for="n in nodes" :key="'t'+n.id" :config="nodeT(n)" />
              <!-- 指针标注 -->
              <v-text v-for="(p,i) in revPtrs" :key="'p'+i" :config="ptrCfg(p)" />
              <!-- null 标记 -->
              <v-text :config="nullCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>迭代反转</strong> = prev/curr/next 三指针，O(n) 时间 O(1) 空间</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>递归反转</strong> = 明确 base case + 记录 successor 节点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>反转区间 = 找到前驱 → 切出区间 → 反转 → 重新连接</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>K 个一组</strong> = O(1) 空间的关键是"记录上一段的尾 + 下一段的头"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>回文检测</strong> = 快慢找中点 + 反转后半 + 双指针，O(n) 时间 O(1) 空间</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-4-lru" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：LRU Cache</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-algorithms/dsa-2-2-6-two-pointer" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：快慢指针技巧全集 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 链表反转动画 =====
const revC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',blue:'#60a5fa',text:'#1e293b',muted:'#94a3b8'}
const revW=ref(700),revH=ref(260); const NX=20,NW=52,NH=38,NG=90,NMY=110
interface LN { id:number; val:number; color:string; s:number }  // s=1 normal, used for visual
const nodes=reactive<LN[]>([])
const revBusy=ref(false),revStatus=ref(''),revStep=ref(0),revDone=ref(false)
const revPtrs=ref<{name:string;idx:number;color:string;yOff:number}[]>([])
const revBox=ref<HTMLDivElement>()
const revButtonLabel=computed(()=>revDone.value?'✅ 反转完成':(revStep.value>0?'继续下一步':'▶ 开始反转'))

function initRev(vals:number[]=[1,2,3,4,5]){
  nodes.length=0; nodes.push(...vals.map((v,i)=>({id:i+1,val:v,color:revC.cyan,s:1})))
  revPtrs.value=[]; revStep.value=0; revDone.value=false; revStatus.value=''
}
function nodeR(n:LN){
  return {x:NX+n.id*NG-NG+(NW*(1-n.s))/2, y:NMY+(NH*(1-n.s))/2, width:NW*n.s, height:NH*n.s,
    fill:n.color, cornerRadius:6, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.1)', shadowBlur:4, shadowOffsetY:2 }
}
function nodeT(n:LN){
  return {x:NX+n.id*NG-NG+(NW*(1-n.s))/2, y:NMY+(NH*(1-n.s))/2, width:NW*n.s, height:NH*n.s,
    text:String(n.val), fontSize:16, fontFamily:'monospace', fontStyle:'bold',
    fill:revC.text, align:'center', verticalAlign:'middle' }
}
function arrowCfg(i:number){
  const a=nodes[i], b=nodes[i+1]; if(!a||!b) return {}
  // 默认: a→b; 反转后: b→a
  const fwd = !revDone.value
  const from = fwd ? a : b, to = fwd ? b : a
  return {points:[from.id*NG-NG+NX+NW, NMY+NH/2, to.id*NG-NG+NX, NMY+NH/2],
    fill:revC.muted, stroke:revC.muted, strokeWidth:2, pointerLength:8, pointerWidth:6 }
}
function ptrCfg(p:{name:string;idx:number;color:string;yOff:number}){
  const x=p.idx<0?NX-10:(p.idx>=nodes.length?NX+nodes.length*NG: NX+p.idx*NG+NW/2-NG)
  return {x, y:NMY+p.yOff, text:p.name, fontSize:11, fontFamily:'monospace', fill:p.color, align:'center', fontStyle:'bold'}
}
const nullCfg=computed(()=>{
  const x=revDone.value?NX-30:NX+nodes.length*NG-NG+NW+8
  return {x, y:NMY+NH/2-8, text:'null', fontSize:13, fontFamily:'monospace', fill:revC.muted}
})
const d=(ms:number)=>new Promise(r=>setTimeout(r,ms))

// 核心：逐步反转（每点一下走一步）
let _prev=0, _curr=0  // 当前指针位置（0-based index, -1=null）
async function doReverseStep(){
  if(revBusy.value||revDone.value)return; revBusy.value=true
  if(revStep.value===0){ _prev=-1; _curr=0 } // 初始化
  if(_curr>=nodes.length){ revDone.value=true; revStatus.value='✅ 反转完成'; revPtrs.value=[]; revBusy.value=false; return }

  revStep.value++
  const ci=_curr, ni=_curr+1
  revStatus.value=`Step ${revStep.value}: curr.next → prev`

  // 显示当前指针位置
  revPtrs.value=[
    {name:_prev>=0?`prev=②`:'prev=null', idx:_prev, color:revC.red, yOff:-45},
    {name:'curr', idx:ci, color:revC.orange, yOff:-30},
    {name:ni<nodes.length?'next':'next=null', idx:ni<nodes.length?ni:99, color:revC.blue, yOff:-15},
  ]
  nodes[ci].color=revC.orange; nodes[ci].s=1.12
  await d(700)

  // 执行反转：移动节点位置来模拟（把当前节点提前）
  // 实际效果：节点 ci 被"移动"到已反转区
  nodes[ci].color=revC.green
  await d(400)
  nodes[ci].color=revC.cyan; nodes[ci].s=1

  _prev=ci; _curr++
  revBusy.value=false
}
function doRevReset(){ revBusy.value=false; initRev(); _prev=-1; _curr=0 }
let roRev:ResizeObserver|null=null
onMounted(()=>{ initRev(); if(revBox.value){ revW.value=revBox.value.clientWidth
  roRev=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200){revW.value=Math.max(500,w)}})
  roRev.observe(revBox.value) }})
onUnmounted(()=>roRev?.disconnect())

const navList = [
  { id: "sec-1", name: "反转链表总览" },
  { id: "sec-2", name: "反转整个链表" },
  { id: "sec-3", name: "反转前N / 区间" },
  { id: "sec-4", name: "K个一组反转" },
  { id: "sec-5", name: "回文链表" },
  { id: "sec-viz", name: "🎬 反转动画" },
  { id: "sec-7", name: "小结" },
]

class ListNode { val: number; next: ListNode | null; constructor(val?: number, next?: ListNode | null) { this.val = val ?? 0; this.next = next ?? null } }

const reverseAllCode = `// ===== 迭代法（最常用，面试首推）=====
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null
    let curr = head

    while (curr) {
        const next = curr.next  // ① 先存下一个节点（不然改完 next 就丢了）
        curr.next = prev        // ② 反转箭头
        prev = curr             // ③ prev 前进
        curr = next             // ④ curr 前进
    }
    return prev  // 循环结束后 prev 指向原链表尾=新链表头
}
// 时间 O(n)  空间 O(1)

// ===== 递归法（优雅，但空间 O(n)）=====
function reverseListRecursive(head: ListNode | null): ListNode | null {
    // base case：空链表或只有一个节点
    if (!head || !head.next) return head

    const newHead = reverseListRecursive(head.next)
    // 此时 head.next 已经被反转了，head.next.next 指向 null
    // 让 head.next 指向 head，完成当前层的反转
    head.next.next = head
    head.next = null
    return newHead
}
// 时间 O(n)  空间 O(n)（递归栈）`

const reverseNCode = `// ===== 反转前 N 个节点 =====
let successor: ListNode | null = null  // 记录第 N+1 个节点

function reverseN(head: ListNode | null, n: number): ListNode | null {
    if (n === 1) {
        successor = head!.next       // 记录后继节点
        return head
    }
    const newHead = reverseN(head!.next, n - 1)
    head!.next.next = head
    head!.next = successor           // 反转后的尾节点接到后继
    return newHead
}
// 示例: 1→2→3→4→5, n=3 → 3→2→1→4→5

// ===== 反转区间 [left, right]（LeetCode 92）=====
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (left === 1) {
        return reverseN(head, right)           // 从头开始 = 反转前 right 个
    }
    // 递归到 left=1 的位置
    head!.next = reverseBetween(head!.next, left - 1, right - 1)
    return head
}
// 思路：递归前进到 left 位置 → 当作 reverseN(head, right-left+1)
// 示例: 1→2→3→4→5, left=2, right=4 → 1→4→3→2→5

// ===== 迭代法反转区间（更直观，面试推荐）=====
function reverseBetweenIter(head: ListNode | null, left: number, right: number): ListNode | null {
    const dummy = new ListNode(0, head)
    let prev = dummy
    // 1. 走到 left 前一个节点
    for (let i = 1; i < left; i++) prev = prev.next!

    // 2. 反转 [left, right] 区间的节点
    const curr = prev.next!
    for (let i = 0; i < right - left; i++) {
        const next = curr.next!
        curr.next = next.next      // 跳过 next
        next.next = prev.next      // next 插到 prev 后面
        prev.next = next           // prev 指向 next
    }
    return dummy.next
}
// 核心技巧：每次把 curr.next 提到 prev 后面（头插法）`

const reverseKGroupCode = `// K 个一组反转链表（LeetCode 25 Hard）
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    // 1. 检查剩余是否够 k 个
    let curr: ListNode | null = head
    let count = 0
    while (curr && count < k) {
        curr = curr.next
        count++
    }
    if (count < k) return head  // 不够 k 个，不反转

    // 2. 反转前 k 个（迭代法）
    let prev: ListNode | null = null
    curr = head
    for (let i = 0; i < k; i++) {
        const next = curr!.next
        curr!.next = prev
        prev = curr
        curr = next
    }

    // 3. 递归处理剩余部分，接到当前组的尾部
    head!.next = reverseKGroup(curr, k)

    return prev  // prev 是反转后的新头
}
// 时间 O(n)  空间 O(n/k) 递归栈
// 示例: 1→2→3→4→5, k=2 → 2→1→4→3→5

// ===== 迭代版 K 个一组（O(1) 空间）=====
function reverseKGroupIter(head: ListNode | null, k: number): ListNode | null {
    const dummy = new ListNode(0, head)
    let groupPrev = dummy

    while (true) {
        // 找第 k 个节点
        const kth = getKth(groupPrev, k)
        if (!kth) break

        const groupNext = kth.next
        // 反转 groupPrev.next 到 kth 这一段
        let prev = groupNext, curr = groupPrev.next
        while (curr !== groupNext) {
            const next = curr!.next
            curr!.next = prev
            prev = curr
            curr = next
        }
        // groupPrev.next 还是原来那段的第一个节点（现在是尾）
        const tmp = groupPrev.next!
        groupPrev.next = kth   // 新头接到 groupPrev
        groupPrev = tmp        // groupPrev 移到下一段的前面
    }
    return dummy.next
}

function getKth(curr: ListNode, k: number): ListNode | null {
    for (let i = 0; curr && i < k; i++) curr = curr.next!
    return curr
}`

const palindromeCode = `// 回文链表（LeetCode 234）— O(n) 时间 O(1) 空间
function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true

    // Step 1: 快慢指针找中点（slow 停在中间/中间偏右）
    let slow: ListNode | null = head
    let fast: ListNode | null = head
    while (fast && fast.next) {
        slow = slow!.next
        fast = fast.next.next
    }
    // 奇数个: 1→2→3→2→1, slow 指向 3
    // 偶数个: 1→2→2→1,   slow 指向第二个 2

    // Step 2: 反转后半段
    let prev: ListNode | null = null
    while (slow) {
        const next = slow.next
        slow.next = prev
        prev = slow
        slow = next
    }
    // prev 现在是后半段反转后的头

    // Step 3: 双指针比较前后两半
    let left = head
    let right = prev
    while (right) {           // 后半段可能短一个（奇数情况）
        if (left!.val !== right.val) return false
        left = left!.next
        right = right.next
    }
    return true
}

// 执行流程示例: 1→2→3→2→1
// 找中点后: slow 在 3
// 反转后半: 1→2→3←2←1 (3 的 next 被改成 null)
//          prev → 1(倒数第一个)
// 比较: left=1 vs right=1 ✓, left=2 vs right=2 ✓
// right 到 null 结束 → true`
</script>
