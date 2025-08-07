<template>
  <div class="queue-algorithms-container">
    <div class="header">
      <h1>队列算法基础介绍</h1>
      <p class="subtitle">先进先出(FIFO)数据结构的关键算法与应用</p>
    </div>

    <div class="navigation">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="activeSection = section.id"
        :class="{ active: activeSection === section.id }"
      >
        {{ section.title }}
      </button>
    </div>

    <div class="content">
      <!-- 基本操作 -->
      <section v-if="activeSection === 'basic'" class="algorithm-section">
        <h2><i class="fas fa-cogs"></i> 队列基本操作</h2>
        <div class="algorithm-card">
          <div class="algorithm-header">
            <h3>队列基本操作实现思路</h3>
          </div>
          <div class="algorithm-body">
            <p>队列的基本操作包括：</p>
            <ul class="algorithm-list">
              <li><span class="highlight">入队(enqueue)</span> - 在队尾添加元素</li>
              <li><span class="highlight">出队(dequeue)</span> - 从队首移除元素</li>
              <li><span class="highlight">查看队首(peek)</span> - 获取但不移除队首元素</li>
              <li><span class="highlight">检查空状态(isEmpty)</span> - 判断队列是否为空</li>
              <li><span class="highlight">获取大小(size)</span> - 返回队列中元素的数量</li>
            </ul>
            <div class="visualization">
              <div class="queue-visual">
                <div class="queue-label">Front</div>
                <div class="queue-items">
                  <div v-for="(item, index) in demoQueue" :key="index" class="queue-item">
                    {{ item }}
                  </div>
                </div>
                <div class="queue-label">Rear</div>
              </div>
              <div class="queue-controls">
                <button @click="enqueueDemo">入队</button>
                <button @click="dequeueDemo">出队</button>
                <button @click="resetQueue">重置</button>
              </div>
            </div>
          </div>
          <div class="algorithm-code">
            <pre><code class="typescript">class Queue&lt;T&gt; {
  private items: T[] = [];

  // 入队操作
  enqueue(element: T): void {
    this.items.push(element);
  }

  // 出队操作
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // 查看队首元素
  peek(): T | undefined {
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
}</code></pre>
          </div>
        </div>
      </section>

      <!-- BFS -->
      <section v-if="activeSection === 'bfs'" class="algorithm-section">
        <h2><i class="fas fa-project-diagram"></i> 广度优先搜索(BFS)</h2>
        <div class="algorithm-card">
          <div class="algorithm-header">
            <h3>BFS算法思路</h3>
          </div>
          <div class="algorithm-body">
            <p>广度优先搜索(BFS)是一种重要的图遍历算法，使用队列实现：</p>
            <ul class="algorithm-list">
              <li><span class="highlight">从起始节点开始</span>，将其标记为已访问并入队</li>
              <li><span class="highlight">当队列不为空时</span>，执行以下操作：</li>
              <li>1. 出队一个节点并访问</li>
              <li>2. 将该节点的所有未访问邻居节点入队并标记为已访问</li>
              <li><span class="highlight">重复上述过程</span>直到队列为空</li>
            </ul>
            <div class="bfs-visual">
              <div class="graph">
                <div
                  v-for="node in graphNodes"
                  :key="node.id"
                  :class="['node', node.state]"
                  @click="startBFS(Number(node.id))"
                >
                  {{ node.id }}
                </div>
                <div class="edges">
                  <div class="edge" style="top: 25%; left: 25%"></div>
                  <div class="edge" style="top: 25%; left: 45%"></div>
                  <div class="edge" style="top: 25%; left: 65%"></div>
                  <div class="edge" style="top: 55%; left: 35%; transform: rotate(45deg)"></div>
                  <div class="edge" style="top: 55%; left: 55%; transform: rotate(-45deg)"></div>
                </div>
              </div>
              <div class="bfs-controls">
                <button @click="startBFS(0)">从节点A开始BFS</button>
                <button @click="resetBFS">重置</button>
              </div>
            </div>
          </div>
          <div class="algorithm-code">
            <pre><code class="typescript">function bfs(graph: Map&lt;number, number[]&gt;, start: number): number[] {
  const visited: number[] = [];
  const queue = new Queue&lt;number&gt;();

  visited.push(start);
  queue.enqueue(start);

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue();
    if (vertex === undefined) continue;

    const neighbors = graph.get(vertex) || [];
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.enqueue(neighbor);
      }
    }
  }

  return visited;
}

// 使用示例
const graph = new Map&lt;number, number[]&gt;();
graph.set(0, [1, 2]);       // A -> B, C
graph.set(1, [0, 3, 4]);    // B -> A, D, E
graph.set(2, [0, 4]);       // C -> A, E
graph.set(3, [1]);          // D -> B
graph.set(4, [1, 2]);       // E -> B, C

const traversalOrder = bfs(graph, 0);
// 结果: [0, 1, 2, 3, 4]</code></pre>
          </div>
        </div>
      </section>

      <!-- 循环队列 -->
      <section v-if="activeSection === 'circular'" class="algorithm-section">
        <h2><i class="fas fa-sync-alt"></i> 循环队列实现</h2>
        <div class="algorithm-card">
          <div class="algorithm-header">
            <h3>循环队列实现思路</h3>
          </div>
          <div class="algorithm-body">
            <p>循环队列解决数组实现队列的空间浪费问题：</p>
            <ul class="algorithm-list">
              <li><span class="highlight">使用固定大小的数组</span>存储队列元素</li>
              <li>
                维护<span class="highlight">front</span>和<span class="highlight">rear</span>指针
              </li>
              <li>当指针到达数组末尾时，<span class="highlight">重置为0</span>形成循环</li>
              <li>判断队列满的条件：<code>(rear + 1) % size === front</code></li>
              <li>判断队列空的条件：<code>front === rear</code></li>
            </ul>
            <div class="circular-queue">
              <div class="queue-container">
                <div class="indicator front">Front</div>
                <div class="indicator rear">Rear</div>
                <div class="slots">
                  <div
                    v-for="(item, index) in circularItems"
                    :key="index"
                    :class="['slot', { active: item !== null }]"
                  >
                    <span v-if="item !== null">{{ item }}</span>
                    <div class="index">{{ index }}</div>
                  </div>
                </div>
              </div>
              <div class="circular-controls">
                <button @click="circularEnqueue">入队</button>
                <button @click="circularDequeue">出队</button>
              </div>
            </div>
          </div>
          <div class="algorithm-code">
            <pre><code class="typescript">class CircularQueue&lt;T&gt; {
  private items: (T | null)[];
  private front: number;
  private rear: number;
  private capacity: number;

  constructor(size: number) {
    this.capacity = size + 1; // 额外预留一个空间区分空和满
    this.items = Array(this.capacity).fill(null);
    this.front = 0;
    this.rear = 0;
  }

  // 入队操作
  enqueue(element: T): boolean {
    if (this.isFull()) return false;

    this.items[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    return true;
  }

  // 出队操作
  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const element = this.items[this.front];
    this.items[this.front] = null;
    this.front = (this.front + 1) % this.capacity;
    return element;
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.front === this.rear;
  }

  // 检查队列是否已满
  isFull(): boolean {
    return (this.rear + 1) % this.capacity === this.front;
  }

  // 查看队首元素
  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.items[this.front];
  }

  // 获取队列大小
  size(): number {
    return (this.rear - this.front + this.capacity) % this.capacity;
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 优先队列 -->
      <section v-if="activeSection === 'priority'" class="algorithm-section">
        <h2><i class="fas fa-sort-amount-up"></i> 优先队列实现</h2>
        <div class="algorithm-card">
          <div class="algorithm-header">
            <h3>基于堆的优先队列</h3>
          </div>
          <div class="algorithm-body">
            <p>优先队列中每个元素都有优先级，优先级高的元素先出队：</p>
            <ul class="algorithm-list">
              <li>通常使用<span class="highlight">二叉堆</span>（最小堆或最大堆）实现</li>
              <li><span class="highlight">入队操作</span>：将元素插入堆底，然后上浮到合适位置</li>
              <li>
                <span class="highlight">出队操作</span>：移除堆顶元素，将堆底元素移到堆顶，然后下沉
              </li>
              <li><span class="highlight">查看队首</span>：返回堆顶元素（优先级最高）</li>
            </ul>
            <div class="priority-queue">
              <div class="heap-representation">
                <div class="heap-level">
                  <div class="heap-node priority-high">8</div>
                </div>
                <div class="heap-level">
                  <div class="heap-node priority-medium">5</div>
                  <div class="heap-node priority-medium">7</div>
                </div>
                <div class="heap-level">
                  <div class="heap-node priority-low">2</div>
                  <div class="heap-node priority-low">3</div>
                  <div class="heap-node priority-low">4</div>
                  <div class="heap-node priority-low">6</div>
                </div>
              </div>
              <div class="priority-explanation">
                <p>最大堆示例：数值越大，优先级越高</p>
                <p><strong>出队顺序</strong>: 8 → 7 → 6 → 5 → 4 → 3 → 2</p>
              </div>
            </div>
          </div>
          <div class="algorithm-code">
            <pre><code class="typescript">// 基于最小堆的优先队列实现
class PriorityQueue {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  // 入队操作
  enqueue(value: number): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  // 出队操作（移除优先级最高的元素）
  dequeue(): number | null {
    if (this.heap.length === 0) return null;

    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end as number;
      this.sinkDown(0);
    }

    return min;
  }

  // 查看队首元素
  peek(): number | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // 获取队列大小
  size(): number {
    return this.heap.length;
  }

  // 上浮操作
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element >= parent) break;
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  // 下沉操作
  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swapIndex = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild < element) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if ((swapIndex === null && rightChild < element) ||
            (swapIndex !== null && rightChild < (leftChild as number))) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;

      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <section v-if="activeSection === 'applications'" class="algorithm-section">
        <h2><i class="fas fa-laptop-code"></i> 队列算法应用场景</h2>
        <div class="application-cards">
          <div class="app-card">
            <div class="app-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <h3>任务调度</h3>
            <p>操作系统使用队列管理进程调度，确保CPU资源的公平分配</p>
          </div>
          <div class="app-card">
            <div class="app-icon">
              <i class="fas fa-network-wired"></i>
            </div>
            <h3>消息队列</h3>
            <p>分布式系统中异步通信和解耦服务组件</p>
          </div>
          <div class="app-card">
            <div class="app-icon">
              <i class="fas fa-print"></i>
            </div>
            <h3>打印队列</h3>
            <p>管理多任务打印请求，按顺序处理文档</p>
          </div>
          <div class="app-card">
            <div class="app-icon">
              <i class="fas fa-bread-slice"></i>
            </div>
            <h3>缓冲系统</h3>
            <p>处理数据流速度不一致的系统，如视频流缓冲</p>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>队列是计算机科学中基础且强大的数据结构，理解其算法原理对解决实际问题至关重要</p>
      <div class="features">
        <span><i class="fas fa-check"></i> 高效操作</span>
        <span><i class="fas fa-check"></i> 简单易用</span>
        <span><i class="fas fa-check"></i> 广泛应用</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航部分
const sections = ref([
  { id: 'basic', title: '基本操作' },
  { id: 'bfs', title: 'BFS算法' },
  { id: 'circular', title: '循环队列' },
  { id: 'priority', title: '优先队列' },
  { id: 'applications', title: '应用场景' },
])
const activeSection = ref('basic')

// 队列基本操作演示
const demoQueue = ref([5, 8, 3, 2])
const enqueueDemo = () => {
  const newValue = Math.floor(Math.random() * 100) + 1
  demoQueue.value.push(newValue)
}
const dequeueDemo = () => {
  if (demoQueue.value.length > 0) {
    demoQueue.value.shift()
  }
}
const resetQueue = () => {
  demoQueue.value = [5, 8, 3, 2]
}

// BFS演示
const graphNodes = ref([
  { id: 'A', state: 'unvisited' },
  { id: 'B', state: 'unvisited' },
  { id: 'C', state: 'unvisited' },
  { id: 'D', state: 'unvisited' },
  { id: 'E', state: 'unvisited' },
])

const startBFS = (startIndex: number) => {
  // 重置所有节点状态
  graphNodes.value.forEach((node) => (node.state = 'unvisited'))

  // 模拟BFS遍历过程
  const visitNode = (index: number, delay: number) => {
    setTimeout(() => {
      graphNodes.value[index].state = 'visited'
    }, delay * 800)
  }

  // 模拟BFS的顺序
  visitNode(0, 0) // A
  visitNode(1, 1) // B
  visitNode(2, 2) // C
  visitNode(3, 3) // D
  visitNode(4, 4) // E
}

const resetBFS = () => {
  graphNodes.value.forEach((node) => (node.state = 'unvisited'))
}

// 循环队列演示
const circularItems = ref(Array(6).fill(null))
circularItems.value[0] = 10
circularItems.value[1] = 20
circularItems.value[2] = 30

const circularEnqueue = () => {
  const emptyIndex = circularItems.value.indexOf(null)
  if (emptyIndex !== -1) {
    circularItems.value[emptyIndex] = Math.floor(Math.random() * 90) + 10
  }
}

const circularDequeue = () => {
  const firstNonEmptyIndex = circularItems.value.findIndex((item) => item !== null)
  if (firstNonEmptyIndex !== -1) {
    circularItems.value[firstNonEmptyIndex] = null
  }
}
</script>

<style lang="less" scoped>



// 颜色定义
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #2c3e50;
@text-light: #7f8c8d;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.queue-algorithms-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: @light-bg;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 30px 0;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-light;
  }
}

.navigation {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background-color: lighten(@primary-color, 35%);
    color: @primary-color;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: lighten(@primary-color, 25%);
    }

    &.active {
      background-color: @primary-color;
      color: white;
      box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
    }
  }
}

.algorithm-section {
  margin-bottom: 40px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: @primary-color;
    display: flex;
    align-items: center;

    i {
      margin-right: 12px;
      background: rgba(52, 152, 219, 0.1);
      width: 46px;
      height: 46px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
}

.algorithm-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.algorithm-header {
  background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 10%));
  padding: 15px 25px;

  h3 {
    color: white;
    font-size: 1.3rem;
    margin: 0;
  }
}

.algorithm-body {
  padding: 25px;

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.algorithm-list {
  list-style: none;
  padding: 15px 0;

  li {
    padding: 10px 0;
    border-bottom: 1px solid @border-color;
    position: relative;
    padding-left: 25px;

    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: @primary-color;
      font-size: 1.5rem;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .highlight {
    font-weight: 500;
    background: linear-gradient(transparent 75%, rgba(46, 204, 113, 0.2) 75%);
    padding: 0 2px;
  }
}

.algorithm-code {
  background: #2c3e50;
  border-radius: 0 0 12px 12px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 25px;
    overflow-x: auto;

    code {
      color: #ecf0f1;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.visualization {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
}

.queue-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  .queue-label {
    background: rgba(52, 152, 219, 0.15);
    padding: 8px 15px;
    border-radius: 6px;
    font-weight: 500;
    color: @primary-color;
  }

  .queue-items {
    display: flex;
    margin: 0 15px;
  }

  .queue-item {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    margin: 0 5px;
    border: 2px solid @primary-color;
    border-radius: 8px;
    font-size: 1.8rem;
    font-weight: 700;
    color: @primary-color;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

    &:first-child {
      background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 15%));
      color: white;
      transform: scale(1.05);
    }
  }
}

.queue-controls {
  display: flex;
  justify-content: center;
  gap: 15px;

  button {
    padding: 10px 25px;
    border: none;
    border-radius: 6px;
    background: @primary-color;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: darken(@primary-color, 10%);
      transform: translateY(-2px);
    }
  }
}

.bfs-visual {
  display: flex;
  flex-direction: column;
  align-items: center;

  .graph {
    position: relative;
    width: 400px;
    height: 300px;
    margin: 30px 0;

    .node {
      position: absolute;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: @primary-color;
      color: white;
      font-weight: 700;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      &.unvisited {
        background: @primary-color;
      }

      &.visited {
        background: @secondary-color;
        transform: scale(1.1);
      }

      &:nth-child(1) {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &:nth-child(2) {
        top: 100px;
        left: 25%;
      }

      &:nth-child(3) {
        top: 100px;
        left: 75%;
      }

      &:nth-child(4) {
        top: 200px;
        left: 10%;
      }

      &:nth-child(5) {
        top: 200px;
        left: 40%;
      }
    }

    .edges {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;

      .edge {
        position: absolute;
        width: 100px;
        height: 2px;
        background: #7f8c8d;
        transform-origin: 0 0;
      }
    }
  }
}

.circular-queue {
  display: flex;
  flex-direction: column;
  align-items: center;

  .queue-container {
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 30px 0;

    .indicator {
      position: absolute;
      padding: 5px 10px;
      background: rgba(231, 76, 60, 0.1);
      border-radius: 4px;
      color: @accent-color;
      font-size: 0.9rem;
      font-weight: 500;

      &.front {
        top: -30px;
        left: 50px;
      }

      &.rear {
        top: -30px;
        right: 50px;
      }
    }

    .slots {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .slot {
        width: 70px;
        height: 70px;
        margin: 10px;
        border: 2px solid #ddd;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        background: white;
        transition: all 0.3s ease;

        &.active {
          border-color: @secondary-color;
          box-shadow: 0 4px 8px rgba(46, 204, 113, 0.2);

          span {
            font-size: 1.5rem;
            font-weight: 700;
            color: @secondary-color;
          }
        }

        .index {
          position: absolute;
          bottom: 5px;
          font-size: 0.8rem;
          color: @text-light;
        }
      }
    }
  }
}

.priority-queue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: 30px 0;

  .heap-representation {
    display: flex;
    flex-direction: column;
    align-items: center;

    .heap-level {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .heap-node {
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-weight: 700;
      font-size: 1.5rem;
      margin: 0 15px;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      &.priority-high {
        background: @accent-color;
        transform: scale(1.2);
      }

      &.priority-medium {
        background: darken(@primary-color, 10%);
      }

      &.priority-low {
        background: lighten(@primary-color, 15%);
      }
    }
  }

  .priority-explanation {
    max-width: 300px;

    p {
      margin-bottom: 15px;
    }
  }
}

.application-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .app-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-10px);
    }

    .app-icon {
      width: 70px;
      height: 70px;
      margin: 0 auto 15px;
      background: rgba(52, 152, 219, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: @primary-color;
    }

    h3 {
      margin: 15px 0;
      color: @text-color;
    }

    p {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px;
  margin-top: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto 20px;
    line-height: 1.7;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;

    span {
      display: flex;
      align-items: center;
      color: @text-color;
      font-weight: 500;

      i {
        color: @secondary-color;
        margin-right: 8px;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    h1 {
      font-size: 2rem;
    }
  }

  .algorithm-card {
    margin-bottom: 15px;
  }

  .queue-item {
    width: 50px !important;
    height: 50px !important;
    font-size: 1.4rem !important;
  }

  .graph {
    transform: scale(0.8);
  }

  .circular-queue .slot {
    width: 50px !important;
    height: 50px !important;
    margin: 5px !important;
  }
}

@media (max-width: 480px) {
  .navigation {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 10px;
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .algorithm-section h2 {
    font-size: 1.5rem;
  }

  .queue-items {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
