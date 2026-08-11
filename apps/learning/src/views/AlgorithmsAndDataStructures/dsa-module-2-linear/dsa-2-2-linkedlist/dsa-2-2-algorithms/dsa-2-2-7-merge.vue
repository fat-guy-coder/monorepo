<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 链表合并与排序</h1>
          <p class="text-sm text-slate-500 mt-1">合并两个有序链表 / 合并K个有序链表 / 链表排序 / 分隔链表 / 奇偶链表</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 总览 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          链表合并与排序总览
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th><th class="px-4 py-2 border border-slate-200 font-semibold">核心技巧</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">合并两个有序链表</td><td class="px-4 py-2 border font-mono">#21</td><td class="px-4 py-2 border text-emerald-600">Easy</td><td class="px-4 py-2 border">双指针比大小，逐个接上</td></tr>
              <tr><td class="px-4 py-2 border">合并K个有序链表</td><td class="px-4 py-2 border font-mono">#23</td><td class="px-4 py-2 border text-red-600">Hard</td><td class="px-4 py-2 border">最小堆 / 两两归并</td></tr>
              <tr><td class="px-4 py-2 border">链表排序</td><td class="px-4 py-2 border font-mono">#148</td><td class="px-4 py-2 border text-amber-600">Medium</td><td class="px-4 py-2 border">归并排序：找中点 → 递归排序 → 合并</td></tr>
              <tr><td class="px-4 py-2 border">分隔链表</td><td class="px-4 py-2 border font-mono">#86</td><td class="px-4 py-2 border text-amber-600">Medium</td><td class="px-4 py-2 border">双 dummy 头，分两路再合并</td></tr>
              <tr><td class="px-4 py-2 border">奇偶链表</td><td class="px-4 py-2 border font-mono">#328</td><td class="px-4 py-2 border text-amber-600">Medium</td><td class="px-4 py-2 border">奇偶双指针交替前进</td></tr>
              <tr><td class="px-4 py-2 border">链表插入排序</td><td class="px-4 py-2 border font-mono">#147</td><td class="px-4 py-2 border text-amber-600">Medium</td><td class="px-4 py-2 border">维护有序区，每次找插入位置</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 合并两个/合并K个 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          合并两个有序链表 & 合并K个有序链表
        </h2>
        <div class="mb-4"><Code language="ts" :code="mergeCode" title="merge_lists.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 合并K个链表的三种方案对比：</strong><br/>
          ① 逐个合并: O(k·n) — 最慢，但代码最简单<br/>
          ② 两两归并（分治）: O(n log k) — 最优<br/>
          ③ 最小堆: O(n log k) — 也是最优，但需要额外 O(k) 堆空间<br/>
          面试用②或③都行，②不需要额外数据结构。</p>
        </aside>
      </section>

      <!-- 3. 排序链表 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          排序链表 — 归并排序是唯一选择
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          为什么链表排序<strong>不能用快排</strong>？因为链表不能随机访问 pivot。归并排序天然适合链表——链表的<strong>拆分和合并都是 O(1) 改指针</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="sortCode" title="sort_list.ts" /></div>
      </section>

      <!-- 4. 分隔链表 + 奇偶链表 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          分隔链表 & 奇偶链表 & 插入排序
        </h2>
        <div class="mb-4"><Code language="ts" :code="partitionCode" title="partition_odd_even_insertion.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：合并两个有序链表
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          两路各有一个指针，<strong>比较当前节点值</strong>（橙=正在比较），较小的加入结果链（绿=被选中）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 结果长度: {{ mRes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ mStatus }}</span>
          <span v-if="mStep>0" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">🔍 Step {{ mStep }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full ml-auto text-slate-500">⏱️ O(m+n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMergeStep" :disabled="mBusy||mDone"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
            {{ mBtnLabel }}
          </button>
          <button @mousedown="doMReset" :disabled="mBusy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">↺ Reset</button>
        </div>
        <div ref="mBox" class="w-full relative overflow-x-auto" :style="{height:mH+'px'}">
          <v-stage :config="{width:mW, height:mH}">
            <v-layer>
              <!-- List A (top) -->
              <v-text :config="{x:10,y:8,text:'List A:',fontSize:11,fill:mC.muted,fontStyle:'bold'}" />
              <v-rect v-for="n in mA" :key="'ra'+n.id" :config="mR(n)" />
              <v-text v-for="n in mA" :key="'ta'+n.id" :config="mT(n)" />
              <v-arrow v-for="(n,i) in mA.slice(0,-1)" :key="'aa'+n.id" :config="mArrow(n,mA[i+1])" />
              <!-- List B (middle) -->
              <v-text :config="{x:10,y:118,text:'List B:',fontSize:11,fill:mC.muted,fontStyle:'bold'}" />
              <v-rect v-for="n in mB" :key="'rb'+n.id" :config="mR2(n)" />
              <v-text v-for="n in mB" :key="'tb'+n.id" :config="mT2(n)" />
              <v-arrow v-for="(n,i) in mB.slice(0,-1)" :key="'ab'+n.id" :config="mArrow2(n,mB[i+1])" />
              <!-- Merged result (bottom) -->
              <v-text :config="{x:10,y:228,text:'Result:',fontSize:11,fill:mC.green,fontStyle:'bold'}" />
              <v-rect v-for="n in mRes" :key="'rr'+n.id" :config="mR3(n)" />
              <v-text v-for="n in mRes" :key="'tr'+n.id" :config="mT3(n)" />
              <v-arrow v-for="(n,i) in mRes.slice(0,-1)" :key="'ar'+n.id" :config="mArrow3(n,mRes[i+1])" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>合并两个</strong> = dummy 头 + 双指针比较，O(m+n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>合并K个</strong> = 分治归并 O(n log k) 或最小堆 O(n log k)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>链表排序 O(n log n)</strong> = 找中点 → 递归排序 → 合并（归并排序三件套）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分隔链表</strong> = 两个 dummy 头，分别收集大小两组，最后接上</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>奇偶链表</strong> = 双指针交替，odd.next = odd.next.next</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-algorithms/dsa-2-2-6-two-pointer" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：快慢指针全集</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-1-mono-stack" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：单调栈 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 合并动画 =====
const mC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8'}
const mW=ref(700),mH=ref(440),mStep=ref(0),mDone=ref(false),mBusy=ref(false),mStatus=ref('')
interface MN { id:number; val:number; color:string }
const mA=reactive<MN[]>([]),mB=reactive<MN[]>([]),mRes=reactive<MN[]>([])
let _ia=0,_ib=0
const mBox=ref<HTMLDivElement>()
const mBtnLabel=computed(()=>mDone.value?'✅ 合并完成':(mStep.value>0?'继续下一步':'▶ 开始合并'))
const d3=(ms:number)=>new Promise(r=>setTimeout(r,ms))

function nodeBase(n:any, y:number){ return {x:50+n.id*78-78,y,width:50,height:36,fill:n.color,cornerRadius:6,stroke:'#64748b',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:3,shadowOffsetY:1} }
function txtBase(n:any, y:number){ return {x:50+n.id*78-78,y,width:50,height:36,text:String(n.val),fontSize:15,fontFamily:'monospace',fontStyle:'bold',fill:mC.text,align:'center',verticalAlign:'middle'} }
function arrBase(a:any, b:any, y:number){ return {points:[a.id*78-78+50+50,y+18,b.id*78-78+50,y+18],fill:mC.muted,stroke:mC.muted,strokeWidth:2,pointerLength:7,pointerWidth:5} }
function mR(n:any){ return nodeBase(n,48) }; function mT(n:any){ return txtBase(n,48) }
function mArrow(a:any,b:any){ return arrBase(a,b,48) }
function mR2(n:any){ return nodeBase(n,158) }; function mT2(n:any){ return txtBase(n,158) }
function mArrow2(a:any,b:any){ return arrBase(a,b,158) }
function mR3(n:any){ return nodeBase(n,268) }; function mT3(n:any){ return txtBase(n,268) }
function mArrow3(a:any,b:any){ return arrBase(a,b,268) }

function mInit(){ mA.length=0;mB.length=0;mRes.length=0
  [1,3,5,7].forEach((v,i)=>mA.push({id:i+1,val:v,color:mC.cyan}))
  [2,4,6].forEach((v,i)=>mB.push({id:i+1,val:v,color:mC.cyan}))
  _ia=0;_ib=0;mStep.value=0;mDone.value=false;mStatus.value=''
}
async function doMergeStep(){
  if(mBusy.value||mDone.value)return; mBusy.value=true; mStep.value++
  if(_ia>=mA.length){ // A 完了，把 B 剩余全接上
    while(_ib<mB.length){ mRes.push({id:mRes.length+1,val:mB[_ib].val,color:mC.green}); mB[_ib].color=mC.muted; _ib++ }
    mDone.value=true; mStatus.value='✅ 合并完成'; mBusy.value=false; return
  }
  if(_ib>=mB.length){
    while(_ia<mA.length){ mRes.push({id:mRes.length+1,val:mA[_ia].val,color:mC.green}); mA[_ia].color=mC.muted; _ia++ }
    mDone.value=true; mStatus.value='✅ 合并完成'; mBusy.value=false; return
  }
  // 高亮比较
  mA[_ia].color=mC.orange; mB[_ib].color=mC.orange
  mStatus.value=`比较: A[${mA[_ia].val}] vs B[${mB[_ib].val}]`; await d3(500)
  if(mA[_ia].val<=mB[_ib].val){
    mRes.push({id:mRes.length+1,val:mA[_ia].val,color:mC.green}); mA[_ia].color=mC.muted; _ia++
  }else{
    mRes.push({id:mRes.length+1,val:mB[_ib].val,color:mC.green}); mB[_ib].color=mC.muted; _ib++
  }
  mBusy.value=false
}
function doMReset(){ mBusy.value=false; mInit() }
let roM:ResizeObserver|null=null
onMounted(()=>{ mInit(); if(mBox.value){ mW.value=mBox.value.clientWidth
  roM=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200)mW.value=Math.max(500,w)})
  roM.observe(mBox.value) }})
onUnmounted(()=>roM?.disconnect())

const navList = [
  { id: "sec-1", name: "总览" },
  { id: "sec-2", name: "合并两个 & K个" },
  { id: "sec-3", name: "排序链表" },
  { id: "sec-4", name: "分隔 & 奇偶 & 插入排序" },
  { id: "sec-viz", name: "🎬 合并动画" },
  { id: "sec-6", name: "小结" },
]

class ListNode { val: number; next: ListNode | null; constructor(val?: number, next?: ListNode | null) { this.val = val ?? 0; this.next = next ?? null } }

const mergeCode = `// ===== 合并两个有序链表（LeetCode 21）=====
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0)
    let curr = dummy

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            curr.next = l1
            l1 = l1.next
        } else {
            curr.next = l2
            l2 = l2.next
        }
        curr = curr.next
    }
    curr.next = l1 || l2  // 接上剩余部分
    return dummy.next
}
// 时间 O(m+n)  空间 O(1)

// ===== 递归版（更优雅）=====
function mergeTwoListsR(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (!l1) return l2
    if (!l2) return l1
    if (l1.val <= l2.val) {
        l1.next = mergeTwoListsR(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoListsR(l1, l2.next)
        return l2
    }
}

// ===== 合并K个有序链表（LeetCode 23）— 分治归并 =====
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    if (lists.length === 0) return null
    return mergeRange(lists, 0, lists.length - 1)
}

function mergeRange(lists: (ListNode | null)[], lo: number, hi: number): ListNode | null {
    if (lo === hi) return lists[lo]
    const mid = (lo + hi) >> 1
    const left = mergeRange(lists, lo, mid)
    const right = mergeRange(lists, mid + 1, hi)
    return mergeTwoLists(left, right)
}
// 时间 O(N log K)  N=总节点数 K=链表数
// 空间 O(log K) 递归栈

// ===== 最小堆方案（需自定义优先队列）=====
// TS 没有内置堆，面试中可以说思路：
// 1. 将所有链表的头节点放入最小堆
// 2. 每次弹出最小节点，接到结果链表
// 3. 被弹出的节点的 next 入堆
// 时间 O(N log K)  空间 O(K)`

const sortCode = `// ===== 排序链表（LeetCode 148）— 归并排序 =====
function sortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head

    // Step 1: 找中点（偏左，用于拆分）
    let slow: ListNode | null = head
    let fast: ListNode | null = head
    while (fast.next && fast.next.next) {
        slow = slow!.next
        fast = fast.next.next
    }

    // Step 2: 断开链表
    const mid = slow!.next
    slow!.next = null

    // Step 3: 递归排序两边
    const left = sortList(head)
    const right = sortList(mid)

    // Step 4: 合并
    return mergeTwoLists(left, right)
}
// 时间 O(n log n)  空间 O(log n) 递归栈
// 这是链表排序的标准答案——不能用 O(1) 空间因为合并必须递归

// ===== 自底向上归并（O(1) 空间，常数级额外空间）=====
function sortListBottomUp(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head

    // 计算长度
    let len = 0, curr: ListNode | null = head
    while (curr) { len++; curr = curr.next }

    const dummy = new ListNode(0, head)

    // 每轮 size 翻倍
    for (let size = 1; size < len; size <<= 1) {
        let prev = dummy
        let curr: ListNode | null = dummy.next

        while (curr) {
            // 切出第一段 size 个
            const left = curr
            const right = cut(left, size)
            curr = cut(right, size)  // 剩下的节点

            // 合并前两段，接到 prev
            prev.next = mergeTwoLists(left, right)
            while (prev.next) prev = prev.next
        }
    }
    return dummy.next
}

// 切掉前 n 个节点，返回剩下的头
function cut(head: ListNode | null, n: number): ListNode | null {
    let curr = head
    for (let i = 1; curr && i < n; i++) curr = curr.next
    if (!curr) return null
    const next = curr.next
    curr.next = null  // 切断
    return next
}`

const partitionCode = `// ===== 分隔链表（LeetCode 86）— 比 x 小的在前 =====
function partition(head: ListNode | null, x: number): ListNode | null {
    const smallDummy = new ListNode(0)  // 小于 x 的链
    const largeDummy = new ListNode(0)  // 大于等于 x 的链
    let small = smallDummy, large = largeDummy

    let curr = head
    while (curr) {
        if (curr.val < x) {
            small.next = curr
            small = small.next
        } else {
            large.next = curr
            large = large.next
        }
        curr = curr.next
    }
    large.next = null          // 大链尾部必须置 null（防止成环）
    small.next = largeDummy.next  // 两链连接
    return smallDummy.next
}
// 时间 O(n)  空间 O(1)

// ===== 奇偶链表（LeetCode 328）=====
function oddEvenList(head: ListNode | null): ListNode | null {
    if (!head) return null
    let odd = head                     // 奇数索引的尾
    const evenHead = head.next         // 偶数索引的头
    let even = evenHead                // 偶数索引的尾

    while (even && even.next) {
        odd.next = even.next           // 奇数接下一个奇数
        odd = odd.next
        even.next = odd.next           // 偶数接下一个偶数
        even = even.next
    }
    odd.next = evenHead                // 奇数链尾部接偶数链头部
    return head
}
// 示例: 1→2→3→4→5 → 1→3→5→2→4
// 时间 O(n)  空间 O(1)

// ===== 链表插入排序（LeetCode 147）=====
function insertionSortList(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0)  // 有序区的 dummy 头

    let curr: ListNode | null = head
    while (curr) {
        const next = curr.next     // 保存下一个待插入节点

        // 在有序区中找插入位置
        let pos = dummy
        while (pos.next && pos.next.val < curr.val) {
            pos = pos.next
        }
        // 插入 curr 到 pos 后面
        curr.next = pos.next
        pos.next = curr

        curr = next
    }
    return dummy.next
}
// 时间 O(n²)  空间 O(1)
// 注意：链表插入排序的时间也是 O(n²)，但没有数组的批量移动开销`
</script>
