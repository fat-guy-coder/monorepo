<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎭 哑节点技巧：统一头节点的处理</h1>
          <p class="text-sm text-slate-500 mt-1">消除 head 特殊判断——链表操作最优雅的技巧</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是哑节点 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是哑节点（Dummy Node）？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>哑节点是一个不存储实际数据的虚拟节点</strong>，通常放在结果链表的头部作为"占位符"。
          它的作用很简单：<strong>让头节点和其他节点享受完全相同的处理逻辑</strong>，无需特判 head 是否为 null 或是否被修改。
        </p>

        <p class="text-slate-600 mb-4 leading-relaxed">
          任何涉及<strong>"构造新链表"</strong>或<strong>"可能修改原链表头部"</strong>的题目，哑节点都是首选技巧。
        </p>

        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
          <h4 class="font-semibold text-slate-700 mb-2">思想对比</h4>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-slate-500 mb-1 font-semibold">❌ 不用哑节点</p>
              <div class="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg overflow-x-auto font-mono">
if (head === null) return null
if (needRemoveHead)
  head = head.next
// 头节点要特判，尾节点也要
// 代码分散，容易漏边界
              </div>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1 font-semibold">✅ 用哑节点</p>
              <div class="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg overflow-x-auto font-mono">
const dummy = new ListNode(0)
dummy.next = head
// 所有节点统一处理，无需特判
return dummy.next
              </div>
            </div>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          哑节点就像 <strong>Vue 的 Transition 组件中的根元素</strong>——它本身不渲染到 DOM，但为子元素提供了统一的包裹逻辑。<br/>
          也像 <strong>React Fragment</strong>：不产生额外的 DOM 节点，但让多个子元素能被统一处理而无需特判第一个/最后一个。
          </p>
        </aside>
      </section>

      <!-- 2. 合并两个有序链表 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          合并两个有序链表（LeetCode 21）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这是哑节点最经典的应用场景。不依赖任何外部数据结构，原地合并两条已排序的链表。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">不使用哑节点的版本 —— 代码冗长</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeMergeNoDummy" title="mergeNoDummy.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">使用哑节点的版本 —— 简洁优雅</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeMergeDummy" title="mergeWithDummy.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 对比总结：</strong><br/>
          不用哑节点：10 行用于初始化 head + 特判第一节点 + 空链表处理。<br/>
          用哑节点：3 行（创建 dummy + 返回 dummy.next），主体循环逻辑完全相同。代码量减少 30%，可读性大幅提升。
          </p>
        </aside>
      </section>

      <!-- 3. 移除链表元素 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          移除链表元素（LeetCode 203）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          删除链表中所有值等于 target 的节点。<strong>头节点也可能被删除</strong>，这是哑节点大显身手的场景。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">不使用哑节点 —— 需要 while 循环处理头节点</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeRemoveNoDummy" title="removeNoDummy.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">使用哑节点 —— 统一处理所有节点</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeRemoveDummy" title="removeWithDummy.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘记处理连续的目标值。</strong><br/>
          如链表 1→2→2→3，要删 2。如果不用哑节点，可能需要 while 循环反复删头。<br/>
          用哑节点后：while(curr.next) 的逻辑天然支持连续删除——删完第一个 2，curr 不动，下一轮继续判断下一个（还是 2），再删。
          </p>
        </aside>
      </section>

      <!-- 4. 两数相加 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          两数相加（LeetCode 2）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          两条链表表示两个<strong>逆序存储</strong>的数字（个位在头节点），返回它们的和也用相同格式的链表表示。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeAddTwo" title="addTwoNumbers.ts" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>执行流程（以 342 + 465 为例）：</strong>
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>l1=2→4→3（表示 342），l2=5→6→4（表示 465），dummy 初始为 0</li>
          <li>第 i=0 位：2+5=7，进位=0，结果链表: dummy→7</li>
          <li>第 i=1 位：4+6=10，进位=1，结果链表: dummy→7→0</li>
          <li>第 i=2 位：3+4+1(carry)=8，进位=0，结果链表: dummy→7→0→8</li>
          <li>返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dummy.next</code> 即 7→0→8（表示 807 = 342+465）</li>
        </ol>
      </section>

      <!-- 5. 深拷贝带随机指针的链表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          深拷贝带随机指针的链表（LeetCode 138）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个节点除了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next</code> 还有一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">random</code> 指针（指向链表中任意节点或 null）。需要深拷贝。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeDeepCopy" title="copyRandomList.ts" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 技巧：HashMap 充当"老节点→新节点"的映射。</strong>这是处理图形拷贝（Graph Clone）的同一套路。第一次遍历创建所有新节点并建立映射，第二次遍历设置指针。Map 确保 O(1) 查找任意老节点对应的新节点。</p>
        </aside>
      </section>

      <!-- 6. 哑节点使用时机总结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          何时使用哑节点？一张表说清楚
        </h2>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">是否需要</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">原因</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">构造新链表</td>
                <td class="px-4 py-2 border border-slate-200">✅ 强烈推荐</td>
                <td class="px-4 py-2 border border-slate-200">新链表初始为空，哑节点避免特判第一个节点</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">可能修改头节点</td>
                <td class="px-4 py-2 border border-slate-200">✅ 推荐</td>
                <td class="px-4 py-2 border border-slate-200">如删除头节点、插入到头部之前</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">合并两条链表</td>
                <td class="px-4 py-2 border border-slate-200">✅ 强烈推荐</td>
                <td class="px-4 py-2 border border-slate-200">典型应用，见 LeetCode 21</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">只在原链表上遍历/查找</td>
                <td class="px-4 py-2 border border-slate-200">❌ 不需要</td>
                <td class="px-4 py-2 border border-slate-200">不改变结构，不需要哑节点</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">反转链表</td>
                <td class="px-4 py-2 border border-slate-200">❌ 不需要</td>
                <td class="px-4 py-2 border border-slate-200">三指针法已足够简洁</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">奇偶链表重排</td>
                <td class="px-4 py-2 border border-slate-200">✅ 有帮助</td>
                <td class="px-4 py-2 border border-slate-200">构造奇链和偶链时避免特判</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 面试金句：</strong> "Whenever you modify the head of a list, use a dummy node." —— 面试官看到你自觉地加 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">dummy = new ListNode(0)</code>，就知道你对边界处理有清醒的认识。这是区分"会用链表"和"理解链表"的分水岭。</p>
        </aside>
      </section>

      <!-- 7. 总结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>哑节点 = 不存数据的虚拟头节点</strong>，让 head 和其他节点享受相同的处理逻辑。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>核心模式：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">dummy.next = head</code>，处理完后 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">return dummy.next</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>完美适用于：合并链表、删除节点、构造新链表、两数相加。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>消除了"头节点为空"和"要修改头节点"两个最常见的边界判断。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>代码量减少 20-30%，可读性大幅提升——对面试尤为重要。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>哑节点和双向链表哨兵节点（上一篇）是同一思想在不同场景的体现。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-2-doubly" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：双向链表与哨兵节点</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-4-lru" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：LRU Cache 实现 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "什么是哑节点" },
  { id: "sec-2", name: "合并两个有序链表" },
  { id: "sec-3", name: "移除链表元素" },
  { id: "sec-4", name: "两数相加" },
  { id: "sec-5", name: "深拷贝随机指针链表" },
  { id: "sec-6", name: "使用时机总结" },
  { id: "sec-7", name: "总结" },
]

const codeMergeNoDummy = `// 不用哑节点：需要特判第一个节点
function mergeTwoLists(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  // 空链表特判
  if (l1 === null) return l2
  if (l2 === null) return l1

  // 先确定 head（取较小的）——这是哑节点消掉的代码
  let head: ListNode<number>
  if (l1.val <= l2.val) {
    head = l1
    l1 = l1.next
  } else {
    head = l2
    l2 = l2.next
  }

  // 主体循环 —— 这部分和哑节点版本相同
  let curr = head
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 ?? l2
  return head
}`

const codeMergeDummy = `// 用哑节点：所有节点统一追加
function mergeTwoLists(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  const dummy = new ListNode(0)       // 哑节点
  let curr: ListNode<number> = dummy  // curr 从 dummy 开始

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 ?? l2               // 接上剩余部分
  return dummy.next                   // 跳过哑节点
}
// 时间复杂度 O(m+n)，空间 O(1)（只需一个哑节点）`

const codeRemoveNoDummy = `// 不用哑节点：需要 while 处理连续的头节点
function removeElements(
  head: ListNode<number> | null,
  val: number
): ListNode<number> | null {
  // ⚠️ 先处理"头节点就是要删的值"（可能是连续多个）
  while (head !== null && head.val === val) {
    head = head.next
  }

  // 再处理中间和尾部
  let curr = head
  while (curr !== null && curr.next !== null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next
    } else {
      curr = curr.next
    }
  }
  return head
}`

const codeRemoveDummy = `// 用哑节点：头节点和中间节点统一处理
function removeElements(
  head: ListNode<number> | null,
  val: number
): ListNode<number> | null {
  const dummy = new ListNode(0)
  dummy.next = head

  let curr: ListNode<number> = dummy
  while (curr.next !== null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next  // 跳过目标节点
      // curr 不动，继续检查新的 curr.next
    } else {
      curr = curr.next             // 安全，前进
    }
  }
  return dummy.next
}
// 关键：curr 从 dummy 开始，检查 curr.next
// 这样即使头节点要删，也是统一通过 curr.next 跳过
// 连续目标值天然支持（curr 不动，下一轮继续检查）`

const codeAddTwo = `// 两数相加：哑节点构造结果链表
function addTwoNumbers(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  const dummy = new ListNode(0)
  let curr = dummy
  let carry = 0

  // 只要还有节点或者还有进位，就继续
  while (l1 !== null || l2 !== null || carry !== 0) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry
    carry = Math.floor(sum / 10)
    curr.next = new ListNode(sum % 10)

    curr = curr.next
    if (l1 !== null) l1 = l1.next
    if (l2 !== null) l2 = l2.next
  }

  return dummy.next
}
// 时间复杂度 O(max(m, n))，空间 O(max(m, n))（结果链表的长度）`

const codeDeepCopy = `class RandomListNode {
  val: number
  next: RandomListNode | null
  random: RandomListNode | null
  constructor(val: number, next?: RandomListNode | null, random?: RandomListNode | null) {
    this.val = val
    this.next = next ?? null
    this.random = random ?? null
  }
}

// 用哑节点 + HashMap 深拷贝
function copyRandomList(
  head: RandomListNode | null
): RandomListNode | null {
  if (head === null) return null

  const map = new Map<RandomListNode, RandomListNode>()

  // 第1遍: 创建所有新节点，建立 old→new 映射
  let curr: RandomListNode | null = head
  while (curr !== null) {
    map.set(curr, new RandomListNode(curr.val))
    curr = curr.next
  }

  // 第2遍: 设置 next 和 random 指针
  curr = head
  while (curr !== null) {
    const copy = map.get(curr)!
    copy.next = curr.next ? map.get(curr.next)! : null
    copy.random = curr.random ? map.get(curr.random)! : null
    curr = curr.next
  }

  return map.get(head)!
}
// 时间 O(n)，空间 O(n)（HashMap 存储 n 个节点映射）`
</script>
