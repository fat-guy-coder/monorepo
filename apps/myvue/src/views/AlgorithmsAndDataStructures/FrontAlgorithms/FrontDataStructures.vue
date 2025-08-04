<template>
  <div class="data-structures">
    <div class="header">
      <h1>前端开发者基本数据结构指南</h1>
      <p class="subtitle">这些介绍只是基础中的基础，要想更好的提升，需要学习更多，跳转数据结构篇学习更多</p>
    </div>

    <div class="navigation">
      <div v-for="(structure, index) in dataStructures" :key="structure.id" class="nav-item"
        :class="{ active: activeIndex === index }" @click="activeIndex = index">
        {{ structure.name }}
      </div>
    </div>

    <div class="content-container">
      <div class="structure-detail">
        <div class="structure-header">
          <div class="structure-icon">
            {{ currentStructure.icon }}
          </div>
          <div>
            <h2>{{ currentStructure.name }}</h2>
            <div class="complexity">
              <div class="complexity-item">
                <span>访问</span>
                <div class="complexity-bar" :style="{ width: currentStructure.complexity.access + '%' }"></div>
                <span>{{ complexityLabels[currentStructure.complexity.access] }}</span>
              </div>
              <div class="complexity-item">
                <span>搜索</span>
                <div class="complexity-bar" :style="{ width: currentStructure.complexity.search + '%' }"></div>
                <span>{{ complexityLabels[currentStructure.complexity.search] }}</span>
              </div>
              <div class="complexity-item">
                <span>插入</span>
                <div class="complexity-bar" :style="{ width: currentStructure.complexity.insert + '%' }"></div>
                <span>{{ complexityLabels[currentStructure.complexity.insert] }}</span>
              </div>
              <div class="complexity-item">
                <span>删除</span>
                <div class="complexity-bar" :style="{ width: currentStructure.complexity.delete + '%' }"></div>
                <span>{{ complexityLabels[currentStructure.complexity.delete] }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="definition">
          <h3>概念定义</h3>
          <p>{{ currentStructure.definition }}</p>
        </div>

        <div class="details-grid">
          <div class="detail-card">
            <div class="card-icon">🎯</div>
            <h4>核心作用</h4>
            <ul>
              <li v-for="(purpose, idx) in currentStructure.purposes" :key="idx">{{ purpose }}</li>
            </ul>
          </div>

          <div class="detail-card">
            <div class="card-icon">💡</div>
            <h4>使用场景</h4>
            <ul>
              <li v-for="(scenario, idx) in currentStructure.scenarios" :key="idx">{{ scenario }}</li>
            </ul>
          </div>

          <div class="detail-card">
            <div class="card-icon">🛠️</div>
            <h4>JS实现方式</h4>
            <div class="code-block">
              <pre>{{ currentStructure.implementation }}</pre>
            </div>
          </div>

          <div class="detail-card">
            <div class="card-icon">📚</div>
            <h4>实际应用案例</h4>
            <ul>
              <li v-for="(example, idx) in currentStructure.examples" :key="idx">{{ example }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="visualization">
        <div class="vis-header">
          <h3>结构可视化</h3>
          <div class="vis-actions">
            <button @click="prevVis">←</button>
            <span>{{ currentVisIndex + 1 }}/{{ currentStructure.visualizations.length }}</span>
            <button @click="nextVis">→</button>
          </div>
        </div>
        <div class="vis-content">
          <pre class="ascii-art">{{ currentStructure.visualizations[currentVisIndex] }}</pre>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>掌握这些数据结构是成为高级前端开发者的关键，它们能帮助你解决复杂问题并优化应用性能</p>
      <p>数据结构和算法是编程的核心基础，值得持续学习和实践</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';



const activeIndex = ref(0);
const currentVisIndex = ref(0);

const complexityLabels: Record<number, string> = {
  20: 'O(1)',
  40: 'O(log n)',
  60: 'O(n)',
  80: 'O(n log n)',
  100: 'O(n²)'
};

const nextVis = () => {
  currentVisIndex.value = (currentVisIndex.value + 1) % currentStructure.value.visualizations.length;
};

const prevVis = () => {
  currentVisIndex.value = (currentVisIndex.value - 1 + currentStructure.value.visualizations.length) %
    currentStructure.value.visualizations.length;
};

const dataStructures = [
  {
    id: 'array',
    name: '数组 (Array)',
    icon: '📊',
    definition: '数组是一种线性数据结构，用于在连续内存位置存储相同类型的元素集合。每个元素可以通过索引访问。',
    complexity: {
      access: 20,  // O(1)
      search: 60,  // O(n)
      insert: 100, // O(n)
      delete: 100  // O(n)
    },
    purposes: [
      '存储有序的元素集合',
      '通过索引快速访问元素',
      '实现其他数据结构的基础'
    ],
    scenarios: [
      '需要随机访问元素的场景',
      '存储固定大小的数据集合',
      '作为其他数据结构的基础实现'
    ],
    implementation: `// JavaScript 数组
const fruits = ['苹果', '香蕉', '橙子'];

// 访问元素
console.log(fruits[1]); // 输出: 香蕉

// 添加元素
fruits.push('葡萄');

// 删除元素
fruits.splice(0, 1); // 删除第一个元素`,
    examples: [
      '存储商品列表',
      '管理用户输入数据',
      '实现矩阵和表格数据'
    ],
    visualizations: [
      `索引:  0      1      2      3
值:   [10] -> [20] -> [30] -> [40]
      ↑             ↑
      head          tail`
    ]
  },
  {
    id: 'stack',
    name: '栈 (Stack)',
    icon: '📚',
    definition: '栈是一种后进先出(LIFO)的数据结构，只允许在顶部进行插入(压栈)和删除(弹栈)操作。',
    complexity: {
      access: 100, // O(n)
      search: 100, // O(n)
      insert: 20,  // O(1)
      delete: 20   // O(1)
    },
    purposes: [
      '管理函数调用和递归',
      '实现撤销/重做功能',
      '处理表达式求值和语法解析'
    ],
    scenarios: [
      '浏览器历史记录管理',
      '实现深度优先搜索(DFS)',
      '括号匹配等语法检查'
    ],
    implementation: `// 使用数组实现栈
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    examples: [
      '浏览器后退按钮实现',
      '编辑器的撤销操作',
      '函数调用栈管理'
    ],
    visualizations: [
      `栈操作:
      |   40   |  <- 顶部 (最后添加)
      |--------|
      |   30   |
      |--------|
      |   20   |
      |--------|
      |   10   |  <- 底部 (最先添加)
      ----------`,
      `浏览器历史栈:
      |  page4  | <- 当前页面
      |---------|
      |  page3  |
      |---------|
      |  page2  |
      |---------|
      |  page1  |`
    ]
  },
  {
    id: 'queue',
    name: '队列 (Queue)',
    icon: '🚶‍♂️🚶‍♂️🚶‍♂️',
    definition: '队列是一种先进先出(FIFO)的数据结构，元素从后端添加(入队)，从前端移除(出队)。',
    complexity: {
      access: 100, // O(n)
      search: 100, // O(n)
      insert: 20,  // O(1)
      delete: 20   // O(1)
    },
    purposes: [
      '管理按顺序处理的任务',
      '实现广度优先搜索(BFS)',
      '缓冲区和消息队列实现'
    ],
    scenarios: [
      '打印任务队列管理',
      '消息队列和事件处理',
      'CPU任务调度'
    ],
    implementation: `// 使用数组实现队列
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    examples: [
      'JavaScript事件循环的任务队列',
      'API请求的限流和排队',
      'BFS算法实现'
    ],
    visualizations: [
      `队列结构:
      前端(出队) <-- [10, 20, 30, 40] <-- 后端(入队)
      ↑                   ↑
      head                tail`,
      `任务队列:
      [任务1] -> [任务2] -> [任务3] -> [任务4]
        ↑                         ↑
        next task           new tasks added`
    ]
  },
  {
    id: 'linked-list',
    name: '链表 (Linked List)',
    icon: '⛓️',
    definition: '链表是一种线性数据结构，由节点组成，每个节点包含数据和指向下一个节点的指针。',
    complexity: {
      access: 100, // O(n)
      search: 100, // O(n)
      insert: 20,  // O(1)
      delete: 20   // O(1)
    },
    purposes: [
      '高效地插入和删除元素',
      '实现栈、队列等数据结构',
      '管理动态大小的数据集'
    ],
    scenarios: [
      '需要频繁插入/删除的场景',
      '实现LRU缓存机制',
      '音乐播放器的播放列表'
    ],
    implementation: `// 链表节点
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 链表实现
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // 其他方法: prepend, delete, find...
}`,
    examples: [
      'React Fiber架构中的任务调度',
      '浏览器历史记录管理',
      '区块链中的区块链接'
    ],
    visualizations: [
      `单链表:
      head → [10|•] → [20|•] → [30|•] → null`,
      `双链表:
      null ← [•|10|•] ⇄ [•|20|•] ⇄ [•|30|•] → null
        ↑                           ↑
       head                        tail`
    ]
  },
  {
    id: 'tree',
    name: '树 (Tree)',
    icon: '🌳',
    definition: '树是一种分层数据结构，由节点组成，每个节点有零个或多个子节点，没有环状连接。',
    complexity: {
      access: 100, // O(n)
      search: 40,  // O(log n) 对于平衡树
      insert: 40,  // O(log n)
      delete: 40   // O(log n)
    },
    purposes: [
      '表示分层数据关系',
      '实现快速搜索和检索',
      '组织文件系统结构'
    ],
    scenarios: [
      'DOM树结构',
      '数据库索引实现',
      '组织架构图表示'
    ],
    implementation: `// 二叉树节点
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 二叉树遍历示例
function inOrderTraversal(node) {
  if (node !== null) {
    inOrderTraversal(node.left);
    console.log(node.value);
    inOrderTraversal(node.right);
  }
}`,
    examples: [
      'React/Vue的虚拟DOM',
      '文件系统的目录结构',
      '游戏中的决策树'
    ],
    visualizations: [
      `二叉树:
          A
         / \\
        B   C
       / \\   \\
      D   E   F`,
      `DOM树:
      html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── div
          │   ├── h1
          │   └── p
          └── footer`
    ]
  },
  {
    id: 'graph',
    name: '图 (Graph)',
    icon: '🕸️',
    definition: '图是由顶点和边组成的非线性数据结构，用于表示实体之间的关系。',
    complexity: {
      access: 100, // O(n)
      search: 100, // O(n)
      insert: 20,  // O(1)
      delete: 100  // O(n)
    },
    purposes: [
      '表示网络关系',
      '解决路径查找问题',
      '社交网络分析'
    ],
    scenarios: [
      '社交网络好友关系',
      '地图导航和路径规划',
      '推荐系统关联分析'
    ],
    implementation: `// 图实现 (邻接表)
class Graph {
  constructor() {
    this.vertices = new Map(); // 顶点: 相邻顶点列表
  }

  addVertex(v) {
    this.vertices.set(v, []);
  }

  addEdge(v, w) {
    this.vertices.get(v).push(w);
    this.vertices.get(w).push(v); // 无向图
  }
}`,
    examples: [
      '网页之间的链接关系',
      '交通路线规划',
      '依赖关系管理'
    ],
    visualizations: [
      `无向图:
        A —— B
        |   / \\
        |  /   C
        | /     \\
        D —————— E`,
      `有向图:
        A → B ← C
        ↓ ↗   ↘ ↑
        D ←——— E`
    ]
  },
  {
    id: 'set',
    name: '集合 (Set)',
    icon: '🎯',
    definition: '集合是一种存储唯一值的数据结构，不保证顺序，不允许重复元素。',
    complexity: {
      access: 100, // O(n)
      search: 20,  // O(1) 平均
      insert: 20,  // O(1) 平均
      delete: 20   // O(1) 平均
    },
    purposes: [
      '存储唯一值集合',
      '快速检查元素存在',
      '数学集合运算'
    ],
    scenarios: [
      '用户标签去重',
      '权限检查',
      '数据去重处理'
    ],
    implementation: `// JavaScript Set
const uniqueNumbers = new Set();

// 添加元素
uniqueNumbers.add(1);
uniqueNumbers.add(2);
uniqueNumbers.add(1); // 重复值被忽略

// 检查存在
console.log(uniqueNumbers.has(2)); // true

// 集合运算
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

// 交集
const intersection = new Set([...setA].filter(x => setB.has(x)));`,
    examples: [
      '表单选项去重',
      '用户权限集合',
      '电商SKU属性组合'
    ],
    visualizations: [
      `集合:
      { 1, 5, 7, 9, 12 }`,
      `集合运算:
      A: {1,2,3}
      B: {2,3,4}
      A ∪ B: {1,2,3,4}
      A ∩ B: {2,3}
      A - B: {1}`
    ]
  },
  {
    id: 'map',
    name: '字典/映射 (Map)',
    icon: '🗂️',
    definition: '映射是存储键值对的数据结构，每个键唯一映射到一个值，支持快速查找。',
    complexity: {
      access: 100, // O(n)
      search: 20,  // O(1) 平均
      insert: 20,  // O(1) 平均
      delete: 20   // O(1) 平均
    },
    purposes: [
      '键值对数据存储',
      '快速查找和检索',
      '实现缓存机制'
    ],
    scenarios: [
      '用户ID到用户数据的映射',
      '配置项管理',
      '实现频率计数器'
    ],
    implementation: `// JavaScript Map
const userMap = new Map();

// 添加键值对
userMap.set('user1', { name: 'Alice', age: 30 });
userMap.set('user2', { name: 'Bob', age: 25 });

// 获取值
console.log(userMap.get('user1')); // { name: 'Alice', age: 30 }

// 迭代
for (const [id, user] of userMap) {
  console.log(id, user);
}`,
    examples: [
      'Vue/React的组件状态管理',
      'API响应缓存',
      '国际化字典存储'
    ],
    visualizations: [
      `映射结构:
      key1 → valueA
      key2 → valueB
      key3 → valueC`,
      `缓存示例:
      GET /api/users → 缓存结果
      GET /api/products → 缓存结果`
    ]
  },
  {
    id: 'hash-table',
    name: '哈希表 (Hash Table)',
    icon: '🔍',
    definition: '哈希表通过哈希函数将键映射到存储位置，实现快速的数据访问。',
    complexity: {
      access: 100, // O(n)
      search: 20,  // O(1) 平均
      insert: 20,  // O(1) 平均
      delete: 20   // O(1) 平均
    },
    purposes: [
      '实现快速查找的数据结构',
      '存储键值对数据',
      '数据库索引实现'
    ],
    scenarios: [
      '实现缓存系统',
      '快速查找用户数据',
      '防止重复提交'
    ],
    implementation: `// 简单哈希表实现
class HashTable {
  constructor(size = 32) {
    this.buckets = new Array(size);
    this.size = size;
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const index = this.hash(key);
    this.buckets[index] = value;
  }

  get(key) {
    const index = this.hash(key);
    return this.buckets[index];
  }
}`,
    examples: [
      'JavaScript对象和Map的底层实现',
      '负载均衡的会话管理',
      'URL缩短服务'
    ],
    visualizations: [
      `哈希表示例:
      索引 | 值
      ----------
        0  |  null
        1  |  valueA (key1)
        2  |  valueB (key2)
        3  |  null
        4  |  valueC (key3)`,
      `哈希冲突处理:
      索引 | 值
      ----------
        2  |  [ [key2, valueB], [key9, valueX] ]`
    ]
  },
  {
    id: 'heap',
    name: '堆 (Heap)',
    icon: '💰',
    definition: '堆是一种特殊的树状数据结构，通常实现为优先队列，父节点总是大于或小于子节点。',
    complexity: {
      access: 100, // O(n)
      search: 100, // O(n)
      insert: 40,  // O(log n)
      delete: 40   // O(log n)
    },
    purposes: [
      '实现优先队列',
      '高效的极值访问',
      '堆排序算法'
    ],
    scenarios: [
      '任务调度优先级管理',
      '实现Dijkstra最短路径算法',
      '大数据Top K问题'
    ],
    implementation: `// 最小堆实现 (部分)
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  // 其他方法: bubbleUp, sinkDown...
}`,
    examples: [
      'React的调度器优先级管理',
      '实时数据流的中位数计算',
      '高性能定时器实现'
    ],
    visualizations: [
      `最大堆:
          100
         /   \\
        85    90
       / \\   / \\
      70 60 80 65`,
      `优先队列:
      优先级: 高 [任务1, 任务3]
              中 [任务2, 任务5]
              低 [任务4]`
    ]
  }
];

const currentStructure = computed(() => dataStructures[activeIndex.value]);
</script>

<style lang="less" scoped>
.data-structures {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  background-color: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);

  .header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    h1 {
      font-size: 2.4rem;
      color: #2b6cb0;
      margin-bottom: 0.8rem;
      font-weight: 700;
    }

    p {
      font-size: 1.1rem;
      color: #718096;
      margin-bottom: 0;
    }
  }

  .navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2rem;
    justify-content: center;

    .nav-item {
      padding: 0.8rem 1.5rem;
      background: #ebf8ff;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid #bee3f8;
      color: #2b6cb0;

      &:hover {
        background: #bee3f8;
        transform: translateY(-2px);
      }

      &.active {
        background: #4299e1;
        color: white;
        border-color: #3182ce;
        box-shadow: 0 4px 6px rgba(50, 115, 220, 0.2);
      }
    }
  }

  .content-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .structure-detail {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

    .structure-header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e2e8f0;

      .structure-icon {
        font-size: 3rem;
        margin-right: 1.5rem;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ebf8ff;
        border-radius: 50%;
      }

      h2 {
        font-size: 1.8rem;
        color: #2b6cb0;
        margin: 0 0 1rem 0;
      }
    }

    .complexity {
      .complexity-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.8rem;

        span:first-child {
          width: 60px;
          font-weight: 600;
          color: #4a5568;
        }

        .complexity-bar {
          height: 10px;
          background: linear-gradient(90deg, #a0aec0, #4299e1);
          border-radius: 5px;
          margin: 0 1rem;
          flex-grow: 1;
        }

        span:last-child {
          width: 70px;
          text-align: right;
          font-weight: 600;
          color: #e53e3e;
        }
      }
    }

    .definition {
      margin-bottom: 2rem;

      h3 {
        font-size: 1.3rem;
        color: #2b6cb0;
        margin-bottom: 0.8rem;
      }

      p {
        line-height: 1.7;
        color: #4a5568;
        background: #f7fafc;
        padding: 1.2rem;
        border-radius: 8px;
        border-left: 4px solid #4299e1;
      }
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .detail-card {
        background: #f7fafc;
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
          border-color: #90cdf4;
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        h4 {
          font-size: 1.2rem;
          color: #2b6cb0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #cbd5e0;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            line-height: 1.5;
            color: #4a5568;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        .code-block {
          background: #2d2d2d;
          border-radius: 6px;
          padding: 1rem;
          margin-top: 1rem;
          overflow-x: auto;

          pre {
            color: #f8f8f2;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            margin: 0;
            white-space: pre-wrap;
          }
        }
      }
    }
  }

  .visualization {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    height: fit-content;

    .vis-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.8rem;
      border-bottom: 1px solid #e2e8f0;

      h3 {
        font-size: 1.4rem;
        color: #2b6cb0;
        margin: 0;
      }

      .vis-actions {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        button {
          background: #ebf8ff;
          border: 1px solid #bee3f8;
          border-radius: 4px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background: #bee3f8;
          }
        }

        span {
          font-size: 0.9rem;
          color: #718096;
        }
      }
    }

    .vis-content {
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      .ascii-art {
        font-family: 'Fira Code', monospace;
        font-size: 1rem;
        line-height: 1.6;
        color: #2d3748;
        margin: 0;
        white-space: pre;
        text-align: center;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
    color: #718096;
    font-size: 0.95rem;
    line-height: 1.6;

    p {
      margin-bottom: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .data-structures {
    padding: 1rem;

    .header h1 {
      font-size: 1.8rem;
    }

    .structure-header {
      flex-direction: column;
      text-align: center;

      .structure-icon {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
