<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 双向链表与哨兵节点</h1>
          <p class="text-sm text-slate-500 mt-1">前后都能走——Java LinkedList / LRU 的底层结构</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要双向链表 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要双向链表？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          单向链表只有 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next</code>，只能往前走。双向链表新增了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prev</code> 指针，
          让每个节点<strong>同时知道前驱和后继</strong>，从而实现了前后双向遍历。虽然多占了一个指针的内存（64 位系统 8 字节），但换来了巨大的灵活性。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">单链表节点</h4>
            <div class="font-mono text-xs bg-white border border-slate-300 rounded p-2 text-center">
              [prev=无 | data | next=→]
            </div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">双链表节点</h4>
            <div class="font-mono text-xs bg-white border border-slate-300 rounded p-2 text-center">
              [prev=← | data | next=→]
            </div>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          双向链表就像<strong>浏览器的前进/后退历史</strong>——每个页面同时记住"上一页"和"下一页"。<br/>
          单向链表 = 只有"前进"按钮；双向链表 = 前进 + 后退按钮都有。<br/>
          JS 的 WeakMap 也是理解链表"指针"概念的好桥梁：WeakMap 中的 key 像指针一样指向对象，当对象没其他引用时自动被回收——
          正如链表中节点被"断开"后自动 GC。
          </p>
        </aside>
      </section>

      <!-- 2. DoublyListNode 定义 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          DoublyListNode 定义与基本操作
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          双向链表节点多了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prev: DoublyListNode | null</code>。<strong>head 的 prev 和 tail 的 next 都是 null。</strong>
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeNode" title="DoublyListNode.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">双向遍历</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeTraverse" title="traverse.ts" />
        </div>
      </section>

      <!-- 3. 插入与删除 O(1) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          插入与删除 —— 真正的 O(1)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          双向链表的杀手锏：<strong>给定任一节点的引用，可以在 O(1) 时间内在它前面插入或在它后面插入，也可以 O(1) 删除自身。</strong>
          单向链表删除需要前驱（O(n) 查找），双向链表通过 prev 直接就能找到。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">在节点前后插入 O(1)</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeInsert" title="insertBeforeAfter.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">删除指定节点 O(1)</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeRemove" title="removeNode.ts" />
        </div>

        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘记更新相邻节点的指针！</strong><br/>
          插入/删除双向链表节点时，需要改动<strong>4 个指针</strong>（新节点的 prev 和 next + 前驱的 next + 后继的 prev）。少改一个就会产生断链或死循环（如果形成环）。<br/>
          操作顺序建议：<strong>先处理新节点的两个指针，再改前驱的 next，最后改后继的 prev。</strong></p>
        </div>
      </section>

      <!-- 4. 哨兵节点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          哨兵节点 —— 消除边界判断的利器
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          哨兵节点（Sentinel Node）是不存储实际数据的<strong>虚拟节点</strong>，放在链表的头部和/或尾部。
          有了哨兵节点，就<strong>不再需要判断 head 是否为 null 或操作是否在边界</strong>——因为始终存在前驱和后继。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeSentinel" title="sentinel.ts" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          有了虚拟头尾后，插入和删除代码变得极其简洁：
        </p>
        <div class="mb-4">
          <Code language="ts" :code="codeSentinelOps" title="sentinelOps.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 哨兵的好处：</strong><br/>
          • 不再需要检查 head === null 或 tail === null。<br/>
          • 插入/删除逻辑统一——头、尾、中间都一样。<br/>
          • LRU Cache、Java LinkedList、C++ std::list 都使用了这一模式。<br/>
          • 代价极小：只多了 2 个节点（16 字节 x 2 = 32 字节）。
          </p>
        </aside>
      </section>

      <!-- 5. 循环双向链表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          循环双向链表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          循环双向链表中，<strong>head.prev 指向 tail，tail.next 指向 head</strong>，形成一个闭环。这个结构在实现轮询调度（Round-Robin）等场景中非常有用。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeCircular" title="circular.ts" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 实际应用：</strong>Node.js 的 timer 队列和 Linux 内核的任务调度都用到了循环双向链表。因为调度器需要不断循环遍历就绪进程——转完一圈继续下一圈。</p>
        </aside>
      </section>

      <!-- 6. 实现一个 Deque -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          实战：用双向链表实现 Deque（双端队列）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Deque 要求<strong>头部和尾部都能 O(1) 插入/删除</strong>。双向链表天然适合。我们用哨兵节点来简化实现。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeDeque" title="Deque.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">使用示例</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeDequeUsage" title="dequeUsage.ts" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">复杂度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">addFirst</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">头部插入</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">addLast</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">尾部插入</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">removeFirst</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">头部删除</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">removeLast</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">尾部删除</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">peekFirst</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">查看头部</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">peekLast</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">查看尾部</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 7. 总结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>双向链表节点 = <strong>prev + data + next</strong>，每个节点多占 8 字节（一个指针）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>给定节点引用时，<strong>前插/后插/删除都是 O(1)</strong>——这是相对于单向链表的质变。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>哨兵节点（虚拟头尾）</strong>消除边界判断，让所有位置的插入/删除逻辑完全统一。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>循环双向链表中 head.prev = tail, tail.next = head。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>插入/删除需要改<strong>4 个指针</strong>，缺一不可。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Java LinkedList、C++ std::list、LRU Cache 底层都是双向链表 + 哨兵节点。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-1-singly" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：单向链表</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-3-dummy" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：哑节点技巧 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "为什么需要双向链表" },
  { id: "sec-2", name: "节点定义与遍历" },
  { id: "sec-3", name: "插入与删除 O(1)" },
  { id: "sec-4", name: "哨兵节点" },
  { id: "sec-5", name: "循环双向链表" },
  { id: "sec-6", name: "实战：实现 Deque" },
  { id: "sec-7", name: "总结" },
]

const codeNode = `class DoublyListNode<T> {
  val: T
  prev: DoublyListNode<T> | null
  next: DoublyListNode<T> | null

  constructor(
    val: T,
    prev: DoublyListNode<T> | null = null,
    next: DoublyListNode<T> | null = null
  ) {
    this.val = val
    this.prev = prev
    this.next = next
  }
}

// 创建: null <- 1 <-> 2 <-> 3 -> null
const node3 = new DoublyListNode(3)
const node2 = new DoublyListNode(2, null, node3)
node3.prev = node2
const node1 = new DoublyListNode(1, null, node2)
node2.prev = node1
const head = node1

console.log(head.next!.val)            // 2
console.log(head.next!.prev!.val)      // 1（能走回来！）
console.log(head.next!.next!.prev!.val) // 2`

const codeTraverse = `// 正向遍历（和单链表一样）
function forward(head: DoublyListNode<number> | null): void {
  let curr = head
  while (curr !== null) {
    console.log(curr.val)
    curr = curr.next
  }
}

// 反向遍历（从 tail 出发）
function backward(tail: DoublyListNode<number> | null): void {
  let curr = tail
  while (curr !== null) {
    console.log(curr.val)
    curr = curr.prev  // 沿着 prev 往回走
  }
}

// 查找节点 O(n)
function find(
  head: DoublyListNode<number> | null,
  val: number
): DoublyListNode<number> | null {
  let curr = head
  while (curr !== null) {
    if (curr.val === val) return curr
    curr = curr.next
  }
  return null
}`

const codeInsert = `// 在 node 后面插入 newNode O(1)
function insertAfter(
  node: DoublyListNode<number>,
  newNode: DoublyListNode<number>
): void {
  newNode.prev = node
  newNode.next = node.next

  if (node.next !== null) {
    node.next.prev = newNode   // 后继的 prev 指向新节点
  }
  node.next = newNode          // 前驱的 next 指向新节点
}

// 在 node 前面插入 newNode O(1)
function insertBefore(
  node: DoublyListNode<number>,
  newNode: DoublyListNode<number>
): void {
  newNode.next = node
  newNode.prev = node.prev

  if (node.prev !== null) {
    node.prev.next = newNode   // 前驱的 next 指向新节点
  }
  node.prev = newNode          // 后继的 prev 指向新节点
}

// 注意：以上在首尾操作时需要判空 (node.prev !== null 等)
// 使用哨兵节点后可以去掉所有判空（见下一节）`

const codeRemove = `// 删除 node 自身 O(1) —— 单链表做不到！
function removeNode(node: DoublyListNode<number>): void {
  const prev = node.prev
  const next = node.next

  // 跳过 node
  if (prev !== null) {
    prev.next = next
  }
  if (next !== null) {
    next.prev = prev
  }

  // 清除 node 的指针（帮助 GC）
  node.prev = null
  node.next = null
}

// 对比单链表的删除（同样 O(1) 但需要知道前驱）：
// 单链表: prev.next = node.next（需要先 O(n) 找 prev）
// 双链表: node.prev.next = node.next（直接拿到！）`

const codeSentinel = `// 带哨兵的双向链表
class SentinelLinkedList<T> {
  // 虚拟头尾节点（不存数据）
  private head: DoublyListNode<T>
  private tail: DoublyListNode<T>
  private _size: number = 0

  constructor() {
    // 用占位符值创建哨兵，类型安全由使用者保证
    this.head = new DoublyListNode<T>(null as unknown as T)
    this.tail = new DoublyListNode<T>(null as unknown as T)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get size(): number { return this._size }

  get first(): DoublyListNode<T> | null {
    const node = this.head.next
    return node !== this.tail ? node : null
  }

  get last(): DoublyListNode<T> | null {
    const node = this.tail.prev
    return node !== this.head ? node : null
  }
}

// 初始状态:
// head(sentinel) <-> tail(sentinel)
// 插入第一个节点后:
// head(sentinel) <-> node1 <-> tail(sentinel)`

const codeSentinelOps = `// 在链表头部插入 O(1)
addFirst(val: T): void {
  const node = new DoublyListNode(val)
  const next = this.head.next!

  node.prev = this.head
  node.next = next
  this.head.next = node
  next.prev = node

  this._size++
}

// 在链表尾部插入 O(1)
addLast(val: T): void {
  const node = new DoublyListNode(val)
  const prev = this.tail.prev!

  node.next = this.tail
  node.prev = prev
  prev.next = node
  this.tail.prev = node

  this._size++
}

// 删除节点 O(1) —— 不需要任何判空！
remove(node: DoublyListNode<T>): void {
  // 注意：不要删除哨兵节点
  const prev = node.prev!
  const next = node.next!

  prev.next = next
  next.prev = prev

  this._size--
}

// 删除头部 O(1)
removeFirst(): T | null {
  if (this._size === 0) return null
  const node = this.head.next!
  this.remove(node)
  return node.val
}

// 删除尾部 O(1)
removeLast(): T | null {
  if (this._size === 0) return null
  const node = this.tail.prev!
  this.remove(node)
  return node.val
}`

const codeCircular = `// 循环双向链表（无哨兵版本）
class CircularLinkedList<T> {
  head: DoublyListNode<T> | null = null

  append(val: T): void {
    const node = new DoublyListNode(val)
    if (!this.head) {
      this.head = node
      node.next = node   // 自己指向自己
      node.prev = node   // 自己指向自己
    } else {
      const tail = this.head.prev!  // 在循环链表中 head.prev 就是 tail
      node.next = this.head
      node.prev = tail
      tail.next = node
      this.head.prev = node
    }
  }

  traverse(): void {
    if (!this.head) return
    let curr = this.head
    do {
      console.log(curr.val)
      curr = curr.next!
    } while (curr !== this.head)  // 回到起点停止
  }
}

// 结构示意:
// 空: (无)
// 1个: ←→ [1] ←→  (prev和next都指向自己)
// 2个: ←→ [1] ←→ [2] ←→
//      ↑_____________|`

const codeDeque = `class Deque<T> {
  private head: DoublyListNode<T>
  private tail: DoublyListNode<T>
  private _size: number = 0

  constructor() {
    this.head = new DoublyListNode<T>(null as unknown as T)
    this.tail = new DoublyListNode<T>(null as unknown as T)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get size(): number { return this._size }

  isEmpty(): boolean { return this._size === 0 }

  // 头部插入 O(1)
  addFirst(val: T): void {
    const node = new DoublyListNode(val)
    const next = this.head.next!
    node.prev = this.head
    node.next = next
    this.head.next = node
    next.prev = node
    this._size++
  }

  // 尾部插入 O(1)
  addLast(val: T): void {
    const node = new DoublyListNode(val)
    const prev = this.tail.prev!
    node.next = this.tail
    node.prev = prev
    prev.next = node
    this.tail.prev = node
    this._size++
  }

  // 头部删除 O(1)
  removeFirst(): T | null {
    if (this.isEmpty()) return null
    const node = this.head.next!
    node.next!.prev = this.head
    this.head.next = node.next
    this._size--
    return node.val
  }

  // 尾部删除 O(1)
  removeLast(): T | null {
    if (this.isEmpty()) return null
    const node = this.tail.prev!
    node.prev!.next = this.tail
    this.tail.prev = node.prev
    this._size--
    return node.val
  }

  // 查看头部 O(1)
  peekFirst(): T | null {
    if (this.isEmpty()) return null
    return this.head.next!.val
  }

  // 查看尾部 O(1)
  peekLast(): T | null {
    if (this.isEmpty()) return null
    return this.tail.prev!.val
  }
}`

const codeDequeUsage = `const deque = new Deque<number>()

deque.addFirst(2)   // [2]
deque.addFirst(1)   // [1, 2]
deque.addLast(3)    // [1, 2, 3]
deque.addLast(4)    // [1, 2, 3, 4]

console.log(deque.peekFirst())  // 1
console.log(deque.peekLast())   // 4

console.log(deque.removeFirst()) // 1 → [2, 3, 4]
console.log(deque.removeLast())  // 4 → [2, 3]

// Deque 的本质 = 栈 + 队列的结合体
// addFirst + removeFirst = 栈 (push/pop)
// addLast + removeFirst  = 队列 (enqueue/dequeue)
// addFirst + removeLast  = 反向队列`
</script>
