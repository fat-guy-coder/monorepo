<template>
  <div class="queue-container">
    <div class="header">
      <div class="title-container">
        <h1>数据结构：队列(Queue)</h1>
        <div class="subtitle">先进先出(FIFO)的数据结构</div>
      </div>
      <div class="animation-container">
        <div class="queue-visualization">
          <div class="queue-label">Front</div>
          <transition-group name="queue" tag="div" class="queue-items">
            <div v-for="item in queueItems" :key="item.id" class="queue-item" :class="item.type">
              <div class="item-value">{{ item.value }}</div>
            </div>
          </transition-group>
          <div class="queue-label">Rear</div>
        </div>
        <div class="queue-controls">
          <button @click="enqueueItem" :disabled="queueItems.length >= maxQueueSize">Enqueue</button>
          <button @click="dequeueItem" :disabled="queueItems.length <= 0">Dequeue</button>
          <button @click="clearQueue">Clear</button>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <div class="section">
        <h2><i class="icon fas fa-book"></i> 队列概念</h2>
        <div class="concept-card">
          <div class="concept-icon">
            <i class="fas fa-sort-amount-down-alt"></i>
          </div>
          <p><strong>队列(Queue)</strong>是一种先进先出(FIFO, First-In-First-Out)的线性数据结构。</p>
          <p>队列只允许在表的前端(front)进行删除操作，在表的后端(rear)进行插入操作。</p>
        </div>
        <div class="properties">
          <h3>基本特性：</h3>
          <ul>
            <li><i class="fas fa-arrow-right"></i> 元素按照先进先出的顺序处理</li>
            <li><i class="fas fa-arrow-right"></i> 插入操作称为入队(enqueue)</li>
            <li><i class="fas fa-arrow-right"></i> 删除操作称为出队(dequeue)</li>
            <li><i class="fas fa-arrow-right"></i> 查看队首元素称为peek</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h2><i class="icon fas fa-project-diagram"></i> 队列类型</h2>
        <div class="cards">
          <div class="type-card">
            <div class="card-header">
              <i class="fas fa-align-justify"></i>
              <h3>普通队列</h3>
            </div>
            <p>最基本的队列形式，按照先进先出原则操作。</p>
          </div>
          <div class="type-card">
            <div class="card-header">
              <i class="fas fa-retweet"></i>
              <h3>循环队列</h3>
            </div>
            <p>首尾相连的队列，更有效地利用内存空间。</p>
          </div>
          <div class="type-card">
            <div class="card-header">
              <i class="fas fa-exchange-alt"></i>
              <h3>双端队列(Deque)</h3>
            </div>
            <p>允许在两端进行插入和删除操作的队列。</p>
          </div>
          <div class="type-card">
            <div class="card-header">
              <i class="fas fa-sort-amount-up"></i>
              <h3>优先队列</h3>
            </div>
            <p>元素被赋予优先级，优先处理高优先级元素。</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2><i class="icon fas fa-laptop-code"></i> 队列应用</h2>
        <div class="applications">
          <div class="app-card">
            <div class="app-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <h3>任务调度</h3>
            <p>操作系统使用队列管理进程调度，确保公平性</p>
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
              <i class="fas fa-search"></i>
            </div>
            <h3>BFS算法</h3>
            <p>广度优先搜索使用队列管理待访问节点</p>
          </div>
          <div class="app-card">
            <div class="app-icon">
              <i class="fas fa-print"></i>
            </div>
            <h3>打印队列</h3>
            <p>管理多任务打印请求，按顺序处理</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2><i class="icon fas fa-code"></i> 队列算法</h2>
        <div class="algorithm">
          <h3>队列基本操作</h3>
          <pre><code class="typescript">class Queue&lt;T&gt; {
  private items: T[] = [];

  // 入队
  enqueue(element: T): void {
    this.items.push(element);
  }

  // 出队
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // 查看队首
  peek(): T | undefined {
    return this.items[0];
  }

  // 检查是否为空
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
        <div class="algorithm">
          <h3>广度优先搜索(BFS)示例</h3>
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
}</code></pre>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>队列是一种基本且强大的数据结构，理解队列有助于解决各种实际问题</p>
      <div class="features">
        <span><i class="fas fa-check-circle"></i> 简单易用</span>
        <span><i class="fas fa-check-circle"></i> 高效操作</span>
        <span><i class="fas fa-check-circle"></i> 广泛应用</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface QueueItem {
  id: number;
  value: number;
  type: string;
}

const maxQueueSize = 8;
let itemCounter = 0;

const queueItems = ref<QueueItem[]>([]);

const generateRandomValue = () => Math.floor(Math.random() * 900) + 100;
const getRandomType = () => {
  const types = ['primary', 'secondary', 'success', 'warning', 'danger'];
  return types[Math.floor(Math.random() * types.length)];
};

const enqueueItem = () => {
  if (queueItems.value.length < maxQueueSize) {
    itemCounter++;
    queueItems.value.push({
      id: itemCounter,
      value: generateRandomValue(),
      type: getRandomType()
    });
  }
};

const dequeueItem = () => {
  if (queueItems.value.length > 0) {
    queueItems.value.shift();
  }
};

const clearQueue = () => {
  queueItems.value = [];
};
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

.queue-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  .title-container {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }
}

.animation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;

  .queue-visualization {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    .queue-label {
      background: rgba(255, 255, 255, 0.2);
      padding: 10px 15px;
      border-radius: 6px;
      font-weight: 500;
    }

    .queue-items {
      display: flex;
      flex: 1;
      min-height: 120px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      margin: 0 15px;
    }

    .queue-item {
      flex: 0 0 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      margin: 0 5px;
      border-radius: 8px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      .item-value {
        font-size: 1.5rem;
        font-weight: 700;
      }

      &.primary {
        background: #3498db;
        color: white;
      }

      &.secondary {
        background: #2ecc71;
        color: white;
      }

      &.success {
        background: #27ae60;
        color: white;
      }

      &.warning {
        background: #f39c12;
        color: white;
      }

      &.danger {
        background: #e74c3c;
        color: white;
      }
    }
  }

  .queue-controls {
    display: flex;
    gap: 15px;

    button {
      padding: 10px 25px;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.section {
  background: @card-bg;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: @primary-color;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 12px;
      background: rgba(52, 152, 219, 0.1);
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
}

.concept-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid @primary-color;
  display: flex;
  align-items: flex-start;

  .concept-icon {
    background: rgba(52, 152, 219, 0.1);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-right: 15px;
    font-size: 1.5rem;
    color: @primary-color;
  }

  p {
    margin: 5px 0;
  }
}

.properties {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid @secondary-color;

  h3 {
    margin-bottom: 12px;
    color: @text-color;
  }

  ul {
    list-style: none;

    li {
      padding: 10px 0;
      border-bottom: 1px solid @border-color;
      display: flex;
      align-items: center;

      i {
        margin-right: 10px;
        color: @secondary-color;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}

.type-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid @border-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-bottom: 1px solid @border-color;

    i {
      font-size: 1.4rem;
      margin-right: 10px;
      color: @primary-color;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0;
    }
  }

  p {
    padding: 15px;
    margin: 0;
    font-size: 0.95rem;
    color: @text-light;
  }
}

.applications {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}

.app-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid @border-color;

  &:hover {
    transform: translateY(-5px);
  }

  .app-icon {
    width: 70px;
    height: 70px;
    background: rgba(46, 204, 113, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 1.8rem;
    color: @secondary-color;
  }

  h3 {
    margin: 10px 0;
    color: @text-color;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @text-light;
  }
}

.algorithm {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;

  h3 {
    background: rgba(52, 152, 219, 0.1);
    padding: 12px 20px;
    margin: 0;
    font-size: 1.1rem;
    color: @text-color;
  }

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;
    background: #2c3e50;

    code {
      color: #ecf0f1;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.footer {
  background: @card-bg;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    font-weight: 500;
    color: @text-color;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;

    span {
      display: flex;
      align-items: center;
      color: @text-light;

      i {
        color: @secondary-color;
        margin-right: 8px;
      }
    }
  }
}

// 队列动画效果
.queue-enter-active,
.queue-leave-active {
  transition: all 0.5s ease;
}

.queue-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.queue-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.queue-move {
  transition: transform 0.5s ease;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .header {
    padding: 20px;
  }

  .queue-visualization {
    flex-direction: column;

    .queue-label {
      margin: 10px 0;
    }

    .queue-items {
      width: 100%;
      margin: 10px 0;
      min-height: 90px;
    }
  }

  .cards,
  .applications {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header {
    h1 {
      font-size: 1.8rem;
    }
  }

  .queue-item {
    flex: 0 0 60px !important;
    height: 60px !important;

    .item-value {
      font-size: 1.2rem !important;
    }
  }

  .queue-controls {
    flex-wrap: wrap;

    button {
      flex: 1;
    }
  }
}
</style>
