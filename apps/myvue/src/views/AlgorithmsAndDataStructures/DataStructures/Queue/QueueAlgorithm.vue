<template>
  <div class="queue-algorithms-intro">
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">队列算法详解</h1>
        <p class="subtitle">先进先出(FIFO)数据结构及其应用</p>
        <div class="queue-visualization">
          <div class="queue-container">
            <div
              v-for="(item, index) in queueItems"
              :key="index"
              class="queue-item"
              :class="{
                'enqueue-animation': item.animating === 'enqueue',
                'dequeue-animation': item.animating === 'dequeue'
              }"
              :style="{
                '--item-color': item.color,
                'animation-delay': `${index * 0.1}s`
              }"
            >
              <span class="item-value">{{ item.value }}</span>
              <span class="item-index">#{{ index }}</span>
            </div>
          </div>
          <div class="queue-operations">
            <button @click="enqueueItem" class="operation-btn enqueue-btn">
              <span class="btn-icon">+</span>
              入队
            </button>
            <button @click="dequeueItem" class="operation-btn dequeue-btn">
              <span class="btn-icon">-</span>
              出队
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="section in sections"
            :key="section.id"
            :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)"
          >
            <span class="nav-icon">{{ section.icon }}</span>
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 队列基础 -->
        <section id="basic" class="content-section">
          <h2>队列基础</h2>
          <p>队列(Queue)是一种<strong>先进先出(FIFO)</strong>的线性数据结构，只允许在表的前端(front)进行删除操作，在表的后端(rear)进行插入操作。</p>

          <div class="basic-concepts">
            <div class="concept-card">
              <h3>核心操作</h3>
              <div class="operation-list">
                <div class="operation-item">
                  <span class="op-name">enqueue(element)</span>
                  <span class="op-desc">向队列尾部添加元素</span>
                </div>
                <div class="operation-item">
                  <span class="op-name">dequeue()</span>
                  <span class="op-desc">移除队列头部元素</span>
                </div>
                <div class="operation-item">
                  <span class="op-name">front()</span>
                  <span class="op-desc">查看队列头部元素</span>
                </div>
                <div class="operation-item">
                  <span class="op-name">isEmpty()</span>
                  <span class="op-desc">检查队列是否为空</span>
                </div>
              </div>
            </div>

            <div class="concept-card">
              <h3>时间复杂度</h3>
              <div class="complexity-table">
                <div class="complexity-row">
                  <span class="complexity-op">入队(enqueue)</span>
                  <span class="complexity-value">O(1)</span>
                </div>
                <div class="complexity-row">
                  <span class="complexity-op">出队(dequeue)</span>
                  <span class="complexity-value">O(1)</span>
                </div>
                <div class="complexity-row">
                  <span class="complexity-op">查找(search)</span>
                  <span class="complexity-value">O(n)</span>
                </div>
                <div class="complexity-row">
                  <span class="complexity-op">访问(access)</span>
                  <span class="complexity-value">O(n)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="code-implementation">
            <h3>基础队列实现</h3>
            <div class="code-tabs">
              <div class="code-tab" :class="{ active: activeTab === 'typescript' }" @click="activeTab = 'typescript'">
                TypeScript
              </div>
              <div class="code-tab" :class="{ active: activeTab === 'javascript' }" @click="activeTab = 'javascript'">
                JavaScript
              </div>
            </div>
            <div class="code-content">
              <pre v-if="activeTab === 'typescript'"><code>{{ basicQueueTS }}</code></pre>
              <pre v-if="activeTab === 'javascript'"><code>{{ basicQueueJS }}</code></pre>
            </div>
          </div>
        </section>

        <!-- 循环队列 -->
        <section id="circular" class="content-section">
          <h2>循环队列</h2>
          <p>循环队列(Circular Queue)通过重用数组空间来解决普通队列出队后空间浪费的问题，提高了空间利用率。</p>

          <div class="algorithm-demo">
            <h3>循环队列可视化</h3>
            <div class="circular-queue-demo">
              <div class="circular-container">
                <div
                  v-for="(cell, index) in circularQueue"
                  :key="index"
                  class="circular-cell"
                  :class="{
                    'head': index === circularHead,
                    'tail': index === circularTail,
                    'occupied': cell !== null,
                    'empty': cell === null
                  }"
                >
                  <span class="cell-value">{{ cell !== null ? cell : '' }}</span>
                  <span class="cell-index">{{ index }}</span>
                </div>
              </div>
              <div class="circular-controls">
                <button @click="circularEnqueue" class="demo-btn">入队</button>
                <button @click="circularDequeue" class="demo-btn">出队</button>
                <div class="circular-info">
                  <p>头指针: {{ circularHead }}</p>
                  <p>尾指针: {{ circularTail }}</p>
                  <p>队列大小: {{ circularSize }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="algorithm-explanation">
            <h3>实现思路</h3>
            <ul>
              <li>使用固定大小的数组存储元素</li>
              <li>维护头指针(front)和尾指针(rear)</li>
              <li>入队时尾指针前进: <code>rear = (rear + 1) % capacity</code></li>
              <li>出队时头指针前进: <code>front = (front + 1) % capacity</code></li>
              <li>通过指针位置判断队列空/满状态</li>
            </ul>

            <div class="code-example">
              <h4>循环队列实现</h4>
              <pre><code>{{ circularQueueCode }}</code></pre>
            </div>
          </div>
        </section>

        <!-- 优先队列 -->
        <section id="priority" class="content-section">
          <h2>优先队列</h2>
          <p>优先队列(Priority Queue)中每个元素都有优先级，出队时按优先级顺序而不是插入顺序。</p>

          <div class="priority-types">
            <div class="priority-type">
              <h3>最大优先队列</h3>
              <p>优先级高的元素先出队</p>
              <div class="priority-visual max-priority">
                <div class="priority-item" v-for="item in maxPriorityQueue" :key="item.value">
                  <span class="item-value">{{ item.value }}</span>
                  <span class="item-priority">优先级: {{ item.priority }}</span>
                </div>
              </div>
            </div>

            <div class="priority-type">
              <h3>最小优先队列</h3>
              <p>优先级低的元素先出队</p>
              <div class="priority-visual min-priority">
                <div class="priority-item" v-for="item in minPriorityQueue" :key="item.value">
                  <span class="item-value">{{ item.value }}</span>
                  <span class="item-priority">优先级: {{ item.priority }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="implementation-methods">
            <h3>实现方式</h3>
            <div class="method-cards">
              <div class="method-card">
                <h4>数组实现</h4>
                <p>简单但效率较低</p>
                <div class="complexity">
                  <span>入队: O(n)</span>
                  <span>出队: O(1)</span>
                </div>
              </div>
              <div class="method-card">
                <h4>二叉堆实现</h4>
                <p>效率较高，常用实现</p>
                <div class="complexity">
                  <span>入队: O(log n)</span>
                  <span>出队: O(log n)</span>
                </div>
              </div>
              <div class="method-card">
                <h4>平衡二叉搜索树</h4>
                <p>功能强大但复杂</p>
                <div class="complexity">
                  <span>入队: O(log n)</span>
                  <span>出队: O(log n)</span>
                </div>
              </div>
            </div>

            <div class="code-example">
              <h4>基于堆的优先队列实现</h4>
              <pre><code>{{ priorityQueueCode }}</code></pre>
            </div>
          </div>
        </section>

        <!-- 双端队列 -->
        <section id="deque" class="content-section">
          <h2>双端队列(Deque)</h2>
          <p>双端队列(Double Ended Queue)允许在队列的两端进行插入和删除操作，结合了栈和队列的特性。</p>

          <div class="deque-operations">
            <h3>操作类型</h3>
            <div class="operation-grid">
              <div class="op-card front-ops">
                <h4>前端操作</h4>
                <div class="op-list">
                  <div class="op-item">
                    <span class="op-name">addFront(item)</span>
                    <span class="op-desc">在前端添加元素</span>
                  </div>
                  <div class="op-item">
                    <span class="op-name">removeFront()</span>
                    <span class="op-desc">从前端移除元素</span>
                  </div>
                </div>
              </div>

              <div class="op-card back-ops">
                <h4>后端操作</h4>
                <div class="op-list">
                  <div class="op-item">
                    <span class="op-name">addBack(item)</span>
                    <span class="op-desc">在后端添加元素</span>
                  </div>
                  <div class="op-item">
                    <span class="op-name">removeBack()</span>
                    <span class="op-desc">从后端移除元素</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="deque-applications">
            <h3>应用场景</h3>
            <div class="application-list">
              <div class="app-item">
                <h4>撤销操作</h4>
                <p>文本编辑器的撤销/重做功能</p>
              </div>
              <div class="app-item">
                <h4>滑动窗口</h4>
                <p>解决数组/字符串的滑动窗口问题</p>
              </div>
              <div class="app-item">
                <h4>回文检查</h4>
                <p>检查字符串是否为回文</p>
              </div>
            </div>

            <div class="code-example">
              <h4>双端队列实现</h4>
              <pre><code>{{ dequeCode }}</code></pre>
            </div>
          </div>
        </section>

        <!-- 广度优先搜索 -->
        <section id="bfs" class="content-section">
          <h2>广度优先搜索(BFS)</h2>
          <p>广度优先搜索使用队列来按层次遍历图或树结构，确保先访问离起点近的节点。</p>

          <div class="bfs-visualization">
            <h3>BFS遍历过程</h3>
            <div class="graph-container">
              <div class="graph-nodes">
                <div
                  v-for="node in graphNodes"
                  :key="node.id"
                  class="graph-node"
                  :class="{
                    'visited': node.visited,
                    'current': node.current,
                    'queued': node.queued
                  }"
                  :style="{ left: `${node.x}%`, top: `${node.y}%` }"
                >
                  {{ node.label }}
                </div>
              </div>
              <div class="graph-edges">
                <svg class="edges-svg">
                  <line
                    v-for="edge in graphEdges"
                    :key="`${edge.from}-${edge.to}`"
                    :x1="getNodeX(edge.from)"
                    :y1="getNodeY(edge.from)"
                    :x2="getNodeX(edge.to)"
                    :y2="getNodeY(edge.to)"
                    class="graph-edge"
                  />
                </svg>
              </div>
            </div>
            <div class="bfs-queue">
              <h4>BFS队列</h4>
              <div class="queue-visual">
                <div
                  v-for="(nodeId, index) in bfsQueue"
                  :key="index"
                  class="bfs-queue-item"
                >
                  {{ getNodeLabel(nodeId) }}
                </div>
              </div>
              <button @click="nextBfsStep" class="bfs-control">下一步</button>
            </div>
          </div>

          <div class="bfs-algorithm">
            <h3>BFS算法步骤</h3>
            <ol class="algorithm-steps">
              <li>将起始节点加入队列并标记为已访问</li>
              <li>当队列不为空时：</li>
              <li style="margin-left: 1.5rem;">a. 取出队列头部节点</li>
              <li style="margin-left: 1.5rem;">b. 访问该节点</li>
              <li style="margin-left: 1.5rem;">c. 将所有未访问的邻居节点加入队列</li>
              <li style="margin-left: 1.5rem;">d. 标记邻居节点为已访问</li>
            </ol>

            <div class="code-example">
              <h4>BFS算法实现</h4>
              <pre><code>{{ bfsCode }}</code></pre>
            </div>
          </div>
        </section>

        <!-- 实际应用 -->
        <section id="applications" class="content-section">
          <h2>实际应用</h2>

          <div class="application-categories">
            <div class="category-card">
              <h3>操作系统</h3>
              <ul>
                <li>进程调度（就绪队列）</li>
                <li>打印任务管理</li>
                <li>消息传递系统</li>
                <li>I/O缓冲区管理</li>
              </ul>
            </div>

            <div class="category-card">
              <h3>网络通信</h3>
              <ul>
                <li>数据包排队</li>
                <li>请求处理队列</li>
                <li>消息队列系统</li>
                <li>网络流量控制</li>
              </ul>
            </div>

            <div class="category-card">
              <h3>算法设计</h3>
              <ul>
                <li>树的层次遍历</li>
                <li>图的广度优先搜索</li>
                <li>缓存淘汰算法</li>
                <li>任务调度算法</li>
              </ul>
            </div>
          </div>

          <div class="real-world-example">
            <h3>现实世界例子</h3>
            <div class="example-scenarios">
              <div class="scenario">
                <h4>银行排队系统</h4>
                <p>顾客按照到达顺序接受服务，先到先得</p>
                <div class="scenario-visual">
                  <div class="bank-queue">
                    <div class="teller-counter">柜台</div>
                    <div class="customer-line">
                      <div
                        v-for="customer in bankCustomers"
                        :key="customer.id"
                        class="customer"
                        :class="{ serving: customer.serving }"
                      >
                        {{ customer.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="scenario">
                <h4>消息队列系统</h4>
                <p>生产者-消费者模式，解耦系统组件</p>
                <div class="scenario-visual">
                  <div class="message-queue-system">
                    <div class="producer">生产者</div>
                    <div class="message-queue">
                      <div
                        v-for="msg in messages"
                        :key="msg.id"
                        class="message"
                      >
                        {{ msg.content }}
                      </div>
                    </div>
                    <div class="consumer">消费者</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>队列算法 - 计算机科学的基础数据结构</p>
      <p class="footer-note">理解队列及其变种对于算法设计和系统开发至关重要</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 响应式数据
const activeSection = ref('basic');
const activeTab = ref('typescript');
const queueItems = ref<Array<{value: number, color: string, animating?: string}>>([]);
const circularQueue = ref<Array<number | null>>(Array(8).fill(null));
const circularHead = ref(0);
const circularTail = ref(0);
const circularSize = ref(0);
const maxPriorityQueue = ref([
  { value: '紧急任务', priority: 10 },
  { value: '高优先级', priority: 8 },
  { value: '普通任务', priority: 5 },
  { value: '低优先级', priority: 2 }
]);
const minPriorityQueue = ref([
  { value: '任务A', priority: 1 },
  { value: '任务B', priority: 2 },
  { value: '任务C', priority: 3 },
  { value: '任务D', priority: 5 }
]);
const graphNodes = ref([
  { id: 0, label: 'A', x: 20, y: 20, visited: false, current: false, queued: false },
  { id: 1, label: 'B', x: 40, y: 40, visited: false, current: false, queued: false },
  { id: 2, label: 'C', x: 60, y: 20, visited: false, current: false, queued: false },
  { id: 3, label: 'D', x: 20, y: 60, visited: false, current: false, queued: false },
  { id: 4, label: 'E', x: 40, y: 80, visited: false, current: false, queued: false },
  { id: 5, label: 'F', x: 60, y: 60, visited: false, current: false, queued: false },
  { id: 6, label: 'G', x: 80, y: 40, visited: false, current: false, queued: false }
]);
const graphEdges = ref([
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
  { from: 1, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 },
  { from: 3, to: 4 }, { from: 5, to: 6 }
]);
const bfsQueue = ref<number[]>([]);
const bfsStep = ref(0);
const bankCustomers = ref([
  { id: 1, name: '顾客1', serving: true },
  { id: 2, name: '顾客2', serving: false },
  { id: 3, name: '顾客3', serving: false },
  { id: 4, name: '顾客4', serving: false }
]);
const messages = ref([
  { id: 1, content: '消息1' },
  { id: 2, content: '消息2' },
  { id: 3, content: '消息3' }
]);

// 颜色生成器
const colors = ['#4a6fa5', '#50a3a4', '#ff6b6b', '#ffa726', '#66bb6a', '#ab47bc', '#26c6da'];

// 导航章节
const sections = [
  { id: 'basic', title: '队列基础', icon: '📚' },
  { id: 'circular', title: '循环队列', icon: '🔄' },
  { id: 'priority', title: '优先队列', icon: '⭐' },
  { id: 'deque', title: '双端队列', icon: '↔️' },
  { id: 'bfs', title: '广度优先搜索', icon: '🔍' },
  { id: 'applications', title: '实际应用', icon: '💼' }
];

// 代码示例
const basicQueueTS = `
class Queue<T> {
  private items: T[] = [];

  // 入队
  enqueue(element: T): void {
    this.items.push(element);
  }

  // 出队
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // 查看队首元素
  front(): T | undefined {
    return this.items[0];
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取队列大小
  size(): number {
    return this.items.length;
  }

  // 清空队列
  clear(): void {
    this.items = [];
  }
}
`.trim();

const basicQueueJS = `
class Queue {
  constructor() {
    this.items = [];
  }

  // 入队
  enqueue(element) {
    this.items.push(element);
  }

  // 出队
  dequeue() {
    return this.items.shift();
  }

  // 查看队首元素
  front() {
    return this.items[0];
  }

  // 检查队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // 获取队列大小
  size() {
    return this.items.length;
  }

  // 清空队列
  clear() {
    this.items = [];
  }
}
`.trim();

const circularQueueCode = `
class CircularQueue<T> {
  private items: (T | null)[];
  private front: number = 0;
  private rear: number = 0;
  private count: number = 0;

  constructor(capacity: number) {
    this.items = new Array(capacity).fill(null);
  }

  // 入队
  enqueue(element: T): boolean {
    if (this.isFull()) return false;

    this.items[this.rear] = element;
    this.rear = (this.rear + 1) % this.items.length;
    this.count++;
    return true;
  }

  // 出队
  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const element = this.items[this.front];
    this.items[this.front] = null;
    this.front = (this.front + 1) % this.items.length;
    this.count--;
    return element;
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.count === 0;
  }

  // 检查队列是否已满
  isFull(): boolean {
    return this.count === this.items.length;
  }

  // 查看队首元素
  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.items[this.front];
  }

  // 获取队列大小
  size(): number {
    return this.count;
  }
}
`.trim();

const priorityQueueCode = `
class PriorityQueue<T> {
  private heap: { element: T, priority: number }[] = [];

  // 入队
  enqueue(element: T, priority: number): void {
    this.heap.push({ element, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  // 出队（最高优先级）
  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const max = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }

    return max.element;
  }

  // 堆化向上
  private heapifyUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].priority >= this.heap[index].priority) break;

      [this.heap[parent], this.heap[index]] =
        [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  // 堆化向下
  private heapifyDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < length &&
          this.heap[left].priority > this.heap[largest].priority) {
        largest = left;
      }

      if (right < length &&
          this.heap[right].priority > this.heap[largest].priority) {
        largest = right;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] =
        [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // 查看最高优先级元素
  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].element;
  }

  // 获取队列大小
  size(): number {
    return this.heap.length;
  }
}
`.trim();

const dequeCode = `
class Deque<T> {
  private items: T[] = [];

  // 在前端添加元素
  addFront(element: T): void {
    this.items.unshift(element);
  }

  // 在后端添加元素
  addBack(element: T): void {
    this.items.push(element);
  }

  // 从前端移除元素
  removeFront(): T | undefined {
    return this.items.shift();
  }

  // 从后端移除元素
  removeBack(): T | undefined {
    return this.items.pop();
  }

  // 查看前端元素
  peekFront(): T | undefined {
    return this.items[0];
  }

  // 查看后端元素
  peekBack(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // 检查双端队列是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取双端队列大小
  size(): number {
    return this.items.length;
  }

  // 清空双端队列
  clear(): void {
    this.items = [];
  }
}
`.trim();

const bfsCode = `
function bfs(graph: number[][], start: number): number[] {
  const visited: boolean[] = new Array(graph.length).fill(false);
  const queue: number[] = [start];
  const result: number[] = [];

  visited[start] = true;

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// 使用示例
const graph = [
  [1, 2],    // 节点0的邻居
  [0, 3, 4], // 节点1的邻居
  [0, 5],    // 节点2的邻居
  [1],       // 节点3的邻居
  [1, 5],    // 节点4的邻居
  [2, 4]     // 节点5的邻居
];

console.log(bfs(graph, 0)); // [0, 1, 2, 3, 4, 5]
`.trim();

// 队列操作
let itemCounter = 1;
const enqueueItem = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const newItem = {
    value: itemCounter++,
    color,
    animating: 'enqueue'
  };
  queueItems.value.push(newItem);

  setTimeout(() => {
    newItem.animating = undefined;
  }, 500);
};

const dequeueItem = () => {
  if (queueItems.value.length === 0) return;

  const item = queueItems.value[0];
  item.animating = 'dequeue';

  setTimeout(() => {
    queueItems.value.shift();
  }, 500);
};

// 循环队列操作
const circularEnqueue = () => {
  if (circularSize.value >= circularQueue.value.length) return;

  const value = Math.floor(Math.random() * 100) + 1;
  circularQueue.value[circularTail.value] = value;
  circularTail.value = (circularTail.value + 1) % circularQueue.value.length;
  circularSize.value++;
};

const circularDequeue = () => {
  if (circularSize.value === 0) return;

  circularQueue.value[circularHead.value] = null;
  circularHead.value = (circularHead.value + 1) % circularQueue.value.length;
  circularSize.value--;
};

// BFS相关函数
const getNodeX = (nodeId: number) => {
  const node = graphNodes.value.find(n => n.id === nodeId);
  return node ? node.x * 0.8 + 10 : 0;
};

const getNodeY = (nodeId: number) => {
  const node = graphNodes.value.find(n => n.id === nodeId);
  return node ? node.y * 0.8 + 10 : 0;
};

const getNodeLabel = (nodeId: number) => {
  const node = graphNodes.value.find(n => n.id === nodeId);
  return node ? node.label : '';
};

const nextBfsStep = () => {
  if (bfsStep.value === 0) {
    // 初始化BFS
    graphNodes.value[0].current = true;
    graphNodes.value[0].queued = true;
    bfsQueue.value.push(0);
    bfsStep.value++;
  } else if (bfsQueue.value.length > 0) {
    // 处理下一个节点
    const currentNodeId = bfsQueue.value.shift()!;
    const currentNode = graphNodes.value.find(n => n.id === currentNodeId)!;
    currentNode.current = false;
    currentNode.visited = true;

    // 添加邻居节点到队列
    const neighbors = graphEdges.value
      .filter(edge => edge.from === currentNodeId)
      .map(edge => edge.to);

    neighbors.forEach(neighborId => {
      const neighbor = graphNodes.value.find(n => n.id === neighborId)!;
      if (!neighbor.visited && !neighbor.queued) {
        neighbor.queued = true;
        bfsQueue.value.push(neighborId);
      }
    });

    // 设置新的当前节点
    if (bfsQueue.value.length > 0) {
      const nextNodeId = bfsQueue.value[0];
      const nextNode = graphNodes.value.find(n => n.id === nextNodeId)!;
      nextNode.current = true;
    }

    bfsStep.value++;
  }
};

// 滚动到指定章节
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动以更新活动章节
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

// 初始化
onMounted(() => {
  // 初始化队列演示
  for (let i = 0; i < 3; i++) {
    enqueueItem();
  }

  // 初始化BFS
  graphNodes.value[0].queued = true;
  bfsQueue.value.push(0);

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #4a6fa5;
@primary-light: #6b8cbc;
@primary-dark: #3a5680;
@secondary-color: #50a3a4;
@accent-color: #ff6b6b;
@success-color: #66bb6a;
@warning-color: #ffa726;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@card-bg: #fdfdfd;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
@shadow-hover: 0 8px 24px 0 rgba(0, 0, 0, 0.15);

// 基础样式
.queue-algorithms-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @bg-color;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, @primary-color 0%, @primary-dark 100%);
  color: white;
  padding: 3rem 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .header-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.5rem;
    opacity: 0.9;
    margin: 0 0 3rem;
    font-weight: 400;
  }
}

// 队列可视化
.queue-visualization {
  margin-top: 2rem;

  .queue-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    min-height: 80px;

    .queue-item {
      width: 60px;
      height: 60px;
      background: var(--item-color);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      position: relative;
      transition: all 0.3s ease;

      .item-value {
        font-size: 1.2rem;
      }

      .item-index {
        font-size: 0.7rem;
        opacity: 0.8;
        position: absolute;
        bottom: 4px;
      }

      &.enqueue-animation {
        animation: enqueue 0.5s ease;
      }

      &.dequeue-animation {
        animation: dequeue 0.5s ease;
      }
    }
  }

  .queue-operations {
    display: flex;
    justify-content: center;
    gap: 1rem;

    .operation-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;

      &.enqueue-btn {
        background: @success-color;
        color: white;

        &:hover {
          background: darken(@success-color, 10%);
        }
      }

      &.dequeue-btn {
        background: @accent-color;
        color: white;

        &:hover {
          background: darken(@accent-color, 10%);
        }
      }

      .btn-icon {
        font-size: 1.2rem;
      }
    }
  }
}

@keyframes enqueue {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes dequeue {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(50px);
    opacity: 0;
  }
}

// 内容布局
.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem;
}

// 导航侧边栏
.nav-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      &:hover {
        background-color: darken(@sidebar-bg, 2%);
        color: @primary-color;
      }

      &.active {
        background-color: white;
        color: @primary-color;
        border-left-color: @primary-color;
        font-weight: 600;
      }

      .nav-icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 880px;
}

// 内容区块
.content-section {
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: @shadow;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: @shadow-hover;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: @text-color;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::marker {
        color: @primary-color;
      }
    }
  }
}

// 基础概念
.basic-concepts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  .concept-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    .operation-list {
      .operation-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid @border-color;

        &:last-child {
          border-bottom: none;
        }

        .op-name {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-weight: 600;
          color: @primary-color;
        }

        .op-desc {
          color: @text-light;
          font-size: 0.9rem;
        }
      }
    }

    .complexity-table {
      .complexity-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid @border-color;

        &:last-child {
          border-bottom: none;
        }

        .complexity-op {
          color: @text-color;
        }

        .complexity-value {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-weight: 600;
          color: @primary-color;
        }
      }
    }
  }
}

// 代码实现
.code-implementation {
  margin-top: 2.5rem;

  .code-tabs {
    display: flex;
    border-bottom: 1px solid @border-color;
    margin-bottom: 1rem;

    .code-tab {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;

      &:hover {
        color: @primary-color;
      }

      &.active {
        color: @primary-color;
        border-bottom-color: @primary-color;
        font-weight: 600;
      }
    }
  }

  .code-content {
    pre {
      background: @sidebar-bg;
      border-radius: 6px;
      padding: 1.25rem;
      overflow-x: auto;
      border: 1px solid @border-color;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.85rem;
        color: @text-color;
        line-height: 1.5;
      }
    }
  }
}

// 循环队列演示
.algorithm-demo {
  margin: 2rem 0;

  .circular-queue-demo {
    background: @card-bg;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .circular-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      margin-bottom: 1.5rem;

      .circular-cell {
        aspect-ratio: 1;
        border: 2px solid @border-color;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.3s ease;

        &.head {
          border-color: @accent-color;
          box-shadow: 0 0 0 2px @accent-color;
        }

        &.tail {
          border-color: @success-color;
          box-shadow: 0 0 0 2px @success-color;
        }

        &.occupied {
          background: @primary-light;
          color: white;
        }

        &.empty {
          background: @sidebar-bg;
        }

        .cell-value {
          font-weight: 700;
          font-size: 1.1rem;
        }

        .cell-index {
          position: absolute;
          bottom: 4px;
          font-size: 0.7rem;
          opacity: 0.7;
        }
      }
    }

    .circular-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .demo-btn {
        padding: 0.5rem 1rem;
        background: @primary-color;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: @primary-dark;
        }
      }

      .circular-info {
        display: flex;
        gap: 1rem;

        p {
          margin: 0;
          font-size: 0.9rem;
          color: @text-light;
        }
      }
    }
  }
}

.algorithm-explanation {
  margin-top: 2rem;

  ul {
    li {
      code {
        background: @sidebar-bg;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.9rem;
      }
    }
  }

  .code-example {
    margin-top: 1.5rem;
  }
}

// 优先队列
.priority-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  .priority-type {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 1rem;
      color: @text-light;
    }

    .priority-visual {
      .priority-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        margin-bottom: 0.5rem;
        border-radius: 4px;
        transition: all 0.2s ease;

        .item-value {
          font-weight: 600;
        }

        .item-priority {
          font-size: 0.9rem;
          color: @text-light;
        }
      }

      &.max-priority .priority-item {
        background: lighten(@accent-color, 30%);
        border-left: 4px solid @accent-color;
      }

      &.min-priority .priority-item {
        background: lighten(@success-color, 40%);
        border-left: 4px solid @success-color;
      }
    }
  }
}

.implementation-methods {
  margin-top: 2.5rem;

  .method-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;

    .method-card {
      padding: 1.5rem;
      background: @card-bg;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      text-align: center;
      border-top: 3px solid @primary-color;

      h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: @primary-color;
      }

      p {
        margin-bottom: 1rem;
        color: @text-light;
        font-size: 0.9rem;
      }

      .complexity {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        span {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
        }
      }
    }
  }
}

// 双端队列
.deque-operations {
  margin: 2rem 0;

  .operation-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    .op-card {
      padding: 1.5rem;
      background: @card-bg;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      &.front-ops {
        border-top: 3px solid @accent-color;
      }

      &.back-ops {
        border-top: 3px solid @success-color;
      }

      h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        text-align: center;
      }

      .op-list {
        .op-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid @border-color;

          &:last-child {
            border-bottom: none;
          }

          .op-name {
            font-family: 'Fira Code', 'Consolas', monospace;
            font-weight: 600;
            color: @primary-color;
          }

          .op-desc {
            color: @text-light;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

.deque-applications {
  margin-top: 2.5rem;

  .application-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;

    .app-item {
      padding: 1.5rem;
      background: @card-bg;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-left: 4px solid @secondary-color;

      h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: @primary-color;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.9rem;
      }
    }
  }
}

// BFS可视化
.bfs-visualization {
  margin: 2rem 0;

  .graph-container {
    position: relative;
    height: 400px;
    background: @card-bg;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .graph-nodes {
      .graph-node {
        position: absolute;
        width: 40px;
        height: 40px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        z-index: 2;

        &.visited {
          background: @success-color;
        }

        &.current {
          background: @accent-color;
          box-shadow: 0 0 0 3px @accent-color, 0 0 0 6px rgba(255, 107, 107, 0.3);
        }

        &.queued {
          background: @warning-color;
        }
      }
    }

    .graph-edges {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .edges-svg {
        width: 100%;
        height: 100%;
      }

      .graph-edge {
        stroke: @border-color;
        stroke-width: 2;
      }
    }
  }

  .bfs-queue {
    padding: 1.5rem;
    background: @sidebar-bg;
    border-radius: 8px;

    h4 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    .queue-visual {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      min-height: 50px;
      align-items: center;

      .bfs-queue-item {
        padding: 0.5rem 1rem;
        background: @primary-color;
        color: white;
        border-radius: 4px;
        font-weight: 600;
      }
    }

    .bfs-control {
      padding: 0.5rem 1rem;
      background: @primary-color;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: @primary-dark;
      }
    }
  }
}

.bfs-algorithm {
  margin-top: 2.5rem;

  .algorithm-steps {
    li {
      margin-bottom: 0.75rem;
    }
  }
}

// 实际应用
.application-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .category-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    ul {
      padding-left: 1rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
        color: @text-color;
      }
    }
  }
}

.real-world-example {
  margin-top: 2.5rem;

  .example-scenarios {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1.5rem;

    .scenario {
      padding: 1.5rem;
      background: @card-bg;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      h4 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: @primary-color;
      }

      p {
        margin-bottom: 1rem;
        color: @text-light;
      }

      .scenario-visual {
        .bank-queue {
          display: flex;
          align-items: center;
          gap: 1rem;

          .teller-counter {
            padding: 1rem;
            background: @primary-color;
            color: white;
            border-radius: 4px;
            font-weight: 600;
          }

          .customer-line {
            display: flex;
            gap: 0.5rem;

            .customer {
              padding: 0.5rem 1rem;
              background: @secondary-color;
              color: white;
              border-radius: 4px;
              transition: all 0.3s ease;

              &.serving {
                background: @accent-color;
                transform: scale(1.1);
              }
            }
          }
        }

        .message-queue-system {
          display: flex;
          align-items: center;
          gap: 1rem;

          .producer, .consumer {
            padding: 1rem;
            background: @primary-color;
            color: white;
            border-radius: 4px;
            font-weight: 600;
          }

          .message-queue {
            flex: 1;
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.5rem;

            .message {
              padding: 0.5rem 1rem;
              background: @secondary-color;
              color: white;
              border-radius: 4px;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}

// 代码示例通用样式
.code-example {
  margin-top: 1.5rem;

  pre {
    background: @sidebar-bg;
    border-radius: 6px;
    padding: 1.25rem;
    overflow-x: auto;
    border: 1px solid @border-color;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.85rem;
      color: @text-color;
      line-height: 1.5;
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2.5rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;

  p {
    margin: 0.5rem 0;
  }

  .footer-note {
    font-size: 0.9rem;
    opacity: 0.7;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    margin-bottom: 1.5rem;
    position: static;

    .nav-list {
      display: flex;
      overflow-x: auto;

      li {
        flex-shrink: 0;
        border-left: none;
        border-bottom: 3px solid transparent;

        &.active {
          border-left: none;
          border-bottom-color: @primary-color;
        }
      }
    }
  }

  .basic-concepts,
  .priority-types,
  .operation-grid,
  .example-scenarios {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem 3rem;

    .title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .application-categories {
    grid-template-columns: 1fr;
  }

  .method-cards {
    grid-template-columns: 1fr;
  }

  .graph-container {
    height: 300px;
  }
}
</style>
