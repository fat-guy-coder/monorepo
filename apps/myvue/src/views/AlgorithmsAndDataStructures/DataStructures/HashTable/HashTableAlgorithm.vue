<template>
  <div class="hash-algorithms">
    <header class="page-header">
      <div class="header-content">
        <h1>哈希表算法</h1>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-number">O(1)</span>
            <span class="stat-label">平均复杂度</span>
          </div>
          <div class="stat">
            <span class="stat-number">10+</span>
            <span class="stat-label">核心算法</span>
          </div>
          <div class="stat">
            <span class="stat-number">∞</span>
            <span class="stat-label">应用场景</span>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="intro-content">
          <h2>什么是哈希表？</h2>
          <p>哈希表（Hash Table）是一种通过键（Key）直接访问值（Value）的数据结构。它使用哈希函数将键映射到数组中的特定位置，从而实现快速的数据访问。</p>
          <div class="hash-visualization">
            <div class="hash-process">
              <div class="process-step">
                <div class="step-icon">🔑</div>
                <div class="step-text">键(Key)</div>
              </div>
              <div class="process-arrow">→</div>
              <div class="process-step">
                <div class="step-icon">⚙️</div>
                <div class="step-text">哈希函数</div>
              </div>
              <div class="process-arrow">→</div>
              <div class="process-step">
                <div class="step-icon">📊</div>
                <div class="step-text">哈希值</div>
              </div>
              <div class="process-arrow">→</div>
              <div class="process-step">
                <div class="step-icon">🗂️</div>
                <div class="step-text">数组索引</div>
              </div>
              <div class="process-arrow">→</div>
              <div class="process-step">
                <div class="step-icon">💾</div>
                <div class="step-text">存储值</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="basics-section">
        <h2 class="section-title">哈希表基础</h2>
        <div class="basics-grid">
          <div class="basic-card">
            <h3>哈希函数</h3>
            <p>将任意长度的输入转换为固定长度的输出</p>
            <div class="code-example">
              <pre><code>function hash(key: string, size: number): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
  }
  return Math.abs(hash) % size;
}</code></pre>
            </div>
          </div>
          <div class="basic-card">
            <h3>冲突解决</h3>
            <p>处理不同键映射到同一位置的情况</p>
            <ul>
              <li>链地址法（Separate Chaining）</li>
              <li>开放地址法（Open Addressing）</li>
              <li>线性探测（Linear Probing）</li>
              <li>二次探测（Quadratic Probing）</li>
            </ul>
          </div>
          <div class="basic-card">
            <h3>时间复杂度</h3>
            <div class="complexity-table">
              <div class="complexity-row">
                <span class="operation">插入</span>
                <span class="time best">O(1)</span>
              </div>
              <div class="complexity-row">
                <span class="operation">查找</span>
                <span class="time best">O(1)</span>
              </div>
              <div class="complexity-row">
                <span class="operation">删除</span>
                <span class="time best">O(1)</span>
              </div>
              <div class="complexity-row">
                <span class="operation">最坏情况</span>
                <span class="time worst">O(n)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="algorithms-section">
        <h2 class="section-title">核心算法详解</h2>

        <div class="algorithm-tabs">
          <button
            v-for="tab in algorithmTabs"
            :key="tab.id"
            class="algorithm-tab"
            :class="{ active: activeAlgorithm === tab.id }"
            @click="activeAlgorithm = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            {{ tab.title }}
          </button>
        </div>

        <div class="algorithm-content">
          <div
            v-for="algorithm in algorithms"
            :key="algorithm.id"
            v-show="activeAlgorithm === algorithm.id"
            class="algorithm-detail"
          >
            <div class="algorithm-header">
              <h3>{{ algorithm.name }}</h3>
              <div class="algorithm-meta">
                <span class="meta-tag difficulty" :class="algorithm.difficulty">
                  {{ algorithm.difficulty }}
                </span>
                <span class="meta-tag time">⏱️ {{ algorithm.time }}</span>
                <span class="meta-tag space">💾 {{ algorithm.space }}</span>
              </div>
            </div>

            <div class="algorithm-body">
              <div class="problem-statement">
                <h4>问题描述</h4>
                <p>{{ algorithm.problem }}</p>
              </div>

              <div class="solution-approach">
                <h4>解决思路</h4>
                <p>{{ algorithm.approach }}</p>
                <ul v-if="algorithm.steps">
                  <li v-for="step in algorithm.steps" :key="step">{{ step }}</li>
                </ul>
              </div>

              <div class="code-implementation">
                <h4>代码实现</h4>
                <div class="code-tabs">
                  <button
                    v-for="lang in algorithm.implementations"
                    :key="lang.language"
                    class="code-tab"
                    :class="{ active: activeLanguage === lang.language }"
                    @click="activeLanguage = lang.language"
                  >
                    {{ lang.language }}
                  </button>
                </div>
                <div class="code-display">
                  <pre v-for="lang in algorithm.implementations"
                       :key="lang.language"
                       v-show="activeLanguage === lang.language"><code>{{ lang.code }}</code></pre>
                </div>
              </div>

              <div class="algorithm-analysis">
                <h4>复杂度分析</h4>
                <div class="analysis-grid">
                  <div class="analysis-card">
                    <h5>时间复杂度</h5>
                    <p>{{ algorithm.complexity.time }}</p>
                  </div>
                  <div class="analysis-card">
                    <h5>空间复杂度</h5>
                    <p>{{ algorithm.complexity.space }}</p>
                  </div>
                  <div class="analysis-card">
                    <h5>应用场景</h5>
                    <ul>
                      <li v-for="scenario in algorithm.complexity.scenarios" :key="scenario">
                        {{ scenario }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="example-demo" v-if="algorithm.example">
                <h4>示例演示</h4>
                <div class="example-content">
                  <p><strong>输入:</strong> {{ algorithm.example.input }}</p>
                  <p><strong>输出:</strong> {{ algorithm.example.output }}</p>
                  <div class="demo-visualization" v-if="algorithm.example.visualization">
                    <div class="visualization-content">
                      {{ algorithm.example.visualization }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hash-functions-section">
        <h2 class="section-title">常见哈希函数</h2>
        <div class="hash-functions-grid">
          <div
            v-for="func in hashFunctions"
            :key="func.name"
            class="hash-function-card"
          >
            <div class="func-header">
              <h3>{{ func.name }}</h3>
              <span class="func-type">{{ func.type }}</span>
            </div>
            <p class="func-desc">{{ func.description }}</p>
            <div class="func-code">
              <pre><code>{{ func.code }}</code></pre>
            </div>
            <div class="func-properties">
              <div class="property">
                <strong>分布性:</strong> {{ func.properties.distribution }}
              </div>
              <div class="property">
                <strong>碰撞率:</strong> {{ func.properties.collision }}
              </div>
              <div class="property">
                <strong>性能:</strong> {{ func.properties.performance }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="collision-resolution-section">
        <h2 class="section-title">冲突解决策略</h2>
        <div class="collision-methods">
          <div
            v-for="method in collisionMethods"
            :key="method.name"
            class="collision-method"
          >
            <div class="method-header">
              <h3>{{ method.name }}</h3>
              <span class="method-efficiency" :class="method.efficiency">
                {{ method.efficiency }}
              </span>
            </div>
            <p class="method-desc">{{ method.description }}</p>
            <div class="method-visualization">
              <div class="visual-demo">
                <div class="hash-table">
                  <div
                    v-for="slot in method.visualization"
                    :key="slot.index"
                    class="hash-slot"
                    :class="{ collision: slot.collision }"
                  >
                    <div class="slot-index">{{ slot.index }}</div>
                    <div class="slot-content">
                      <span v-for="item in slot.items" :key="item" class="slot-item">
                        {{ item }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="method-pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li v-for="pro in method.pros" :key="pro">{{ pro }}</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li v-for="con in method.cons" :key="con">{{ con }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="applications-section">
        <h2 class="section-title">实际应用场景</h2>
        <div class="applications-grid">
          <div
            v-for="app in applications"
            :key="app.name"
            class="application-card"
          >
            <div class="app-icon">{{ app.icon }}</div>
            <h3>{{ app.name }}</h3>
            <p>{{ app.description }}</p>
            <div class="app-example">
              <strong>示例:</strong> {{ app.example }}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>哈希表算法精讲</h3>
          <p>掌握核心算法，提升编程能力 · 理论与实践结合</p>
        </div>
        <div class="footer-links">
          <a href="https://leetcode.com/tag/hash-table/" target="_blank">LeetCode 哈希表</a>
          <a href="https://en.wikipedia.org/wiki/Hash_table" target="_blank">Wikipedia</a>
          <a href="https://visualgo.net/en/hashtable" target="_blank">可视化学习</a>
          <a href="https://github.com/topics/hash-table" target="_blank">GitHub 项目</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const activeAlgorithm = ref('two-sum')
const activeLanguage = ref('TypeScript')

// 算法标签页
const algorithmTabs = ref([
  { id: 'two-sum', title: '两数之和', icon: '🔢' },
  { id: 'anagram', title: '字母异位词', icon: '🔤' },
  { id: 'subarray', title: '子数组问题', icon: '📊' },
  { id: 'duplicate', title: '重复元素', icon: '🔍' },
  { id: 'lru', title: 'LRU缓存', icon: '💾' }
])

// 算法数据
const algorithms = ref([
  {
    id: 'two-sum',
    name: '两数之和',
    difficulty: '简单',
    time: 'O(n)',
    space: 'O(n)',
    problem: '给定一个整数数组 nums 和一个目标值 target，在数组中找出和为目标值的两个整数，并返回它们的数组下标。',
    approach: '使用哈希表存储每个数字及其索引，对于每个数字，检查 target - num 是否在哈希表中。',
    steps: [
      '创建一个空的哈希表',
      '遍历数组中的每个元素',
      '对于当前元素 num，计算 complement = target - num',
      '检查 complement 是否在哈希表中',
      '如果存在，返回两个索引',
      '否则将当前元素和索引存入哈希表'
    ],
    implementations: [
      {
        language: 'TypeScript',
        code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}`
      },
      {
        language: 'Python',
        code: `def two_sum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`
      }
    ],
    complexity: {
      time: 'O(n) - 只需要遍历数组一次',
      space: 'O(n) - 最坏情况下需要存储所有元素',
      scenarios: [
        '数组元素查找',
        '配对问题',
        '目标值匹配'
      ]
    },
    example: {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      visualization: '哈希表: {2:0} → 找到7时，检查9-7=2在表中 → 返回[0,1]'
    }
  },
  {
    id: 'anagram',
    name: '有效的字母异位词',
    difficulty: '简单',
    time: 'O(n)',
    space: 'O(1)',
    problem: '给定两个字符串 s 和 t，判断 t 是否是 s 的字母异位词（包含相同的字母，但排列顺序不同）。',
    approach: '使用哈希表统计每个字符的出现次数，比较两个字符串的字符频率。',
    steps: [
      '如果两个字符串长度不同，直接返回 false',
      '创建一个长度为26的数组作为哈希表',
      '遍历第一个字符串，增加字符计数',
      '遍历第二个字符串，减少字符计数',
      '检查所有字符计数是否为零'
    ],
    implementations: [
      {
        language: 'TypeScript',
        code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counter = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    counter[s.charCodeAt(i) - 97]++;
    counter[t.charCodeAt(i) - 97]--;
  }

  return counter.every(count => count === 0);
}`
      },
      {
        language: 'Python',
        code: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    counter = [0] * 26

    for i in range(len(s)):
        counter[ord(s[i]) - ord('a')] += 1
        counter[ord(t[i]) - ord('a')] -= 1

    return all(count == 0 for count in counter)`
      }
    ],
    complexity: {
      time: 'O(n) - 需要遍历两个字符串',
      space: 'O(1) - 固定大小的计数数组',
      scenarios: [
        '字符串相似性判断',
        '字符频率统计',
        '密码学应用'
      ]
    },
    example: {
      input: 's = "anagram", t = "nagaram"',
      output: 'true',
      visualization: '字符计数: a:3, n:1, g:1, r:1, m:1 → 两个字符串计数相同'
    }
  },
  {
    id: 'subarray',
    name: '和为K的子数组',
    difficulty: '中等',
    time: 'O(n)',
    space: 'O(n)',
    problem: '给定一个整数数组和一个整数 k，找到该数组中和为 k 的连续子数组的个数。',
    approach: '使用前缀和和哈希表，记录每个前缀和出现的次数，通过计算当前前缀和与目标值的差值来找到子数组。',
    steps: [
      '初始化哈希表，存储前缀和及其出现次数',
      '设置初始前缀和为0，出现次数为1',
      '遍历数组，计算当前前缀和',
      '检查 prefixSum - k 是否在哈希表中',
      '更新结果计数',
      '更新当前前缀和的出现次数'
    ],
    implementations: [
      {
        language: 'TypeScript',
        code: `function subarraySum(nums: number[], k: number): number {
  const prefixSumMap = new Map<number, number>();
  prefixSumMap.set(0, 1);

  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;

    if (prefixSumMap.has(prefixSum - k)) {
      count += prefixSumMap.get(prefixSum - k)!;
    }

    prefixSumMap.set(prefixSum, (prefixSumMap.get(prefixSum) || 0) + 1);
  }

  return count;
}`
      }
    ],
    complexity: {
      time: 'O(n) - 单次遍历数组',
      space: 'O(n) - 存储前缀和映射',
      scenarios: [
        '子数组和统计',
        '连续区间问题',
        '数据分析'
      ]
    },
    example: {
      input: 'nums = [1,1,1], k = 2',
      output: '2',
      visualization: '前缀和: [0,1,2,3] → 找到2-2=0和3-2=1 → 子数组[1,1]和[1,1]'
    }
  },
  {
    id: 'duplicate',
    name: '存在重复元素',
    difficulty: '简单',
    time: 'O(n)',
    space: 'O(n)',
    problem: '给定一个整数数组，判断是否存在重复元素。',
    approach: '使用哈希集合存储已访问的元素，遇到重复元素时返回 true。',
    steps: [
      '创建一个空的哈希集合',
      '遍历数组中的每个元素',
      '如果元素已在集合中，返回 true',
      '否则将元素添加到集合中',
      '遍历结束返回 false'
    ],
    implementations: [
      {
        language: 'TypeScript',
        code: `function containsDuplicate(nums: number[]): boolean {
  const set = new Set<number>();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }

  return false;
}`
      }
    ],
    complexity: {
      time: 'O(n) - 需要遍历整个数组',
      space: 'O(n) - 最坏情况下存储所有元素',
      scenarios: [
        '重复数据检测',
        '数据去重',
        '唯一性验证'
      ]
    },
    example: {
      input: 'nums = [1,2,3,1]',
      output: 'true',
      visualization: '集合: {1} → {1,2} → {1,2,3} → 遇到1已在集合中 → 返回true'
    }
  },
  {
    id: 'lru',
    name: 'LRU缓存机制',
    difficulty: '中等',
    time: 'O(1)',
    space: 'O(capacity)',
    problem: '设计和实现一个 LRU (最近最少使用) 缓存机制，支持获取数据 get 和写入数据 put 。',
    approach: '使用哈希表 + 双向链表，哈希表提供O(1)的访问，双向链表维护访问顺序。',
    steps: [
      '定义双向链表节点类',
      '使用哈希表存储键到节点的映射',
      '维护虚拟头尾节点简化操作',
      'get操作：移动节点到头部',
      'put操作：更新或新增节点，维护容量'
    ],
    implementations: [
      {
        language: 'TypeScript',
        code: `class LRUCache {
  private capacity: number;
  private cache: Map<number, DLLNode>;
  private head: DLLNode;
  private tail: DLLNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new DLLNode(0, 0);
    this.tail = new DLLNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key)!;
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToHead(node);
    } else {
      const newNode = new DLLNode(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);

      if (this.cache.size > this.capacity) {
        const tail = this.removeTail();
        this.cache.delete(tail.key);
      }
    }
  }

  private addToHead(node: DLLNode): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: DLLNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToHead(node: DLLNode): void {
    this.removeNode(node);
    this.addToHead(node);
  }

  private removeTail(): DLLNode {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }
}

class DLLNode {
  key: number;
  value: number;
  prev: DLLNode | null;
  next: DLLNode | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}`
      }
    ],
    complexity: {
      time: 'O(1) - 哈希表和链表操作都是常数时间',
      space: 'O(capacity) - 存储容量大小的节点',
      scenarios: [
        '缓存系统',
        '页面置换',
        '资源管理'
      ]
    },
    example: {
      input: 'capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)',
      output: '1, -1',
      visualization: '缓存: {1:1} → {1:1,2:2} → 访问1 → {2:2,1:1} → 添加3 → {1:1,3:3}'
    }
  }
])

// 哈希函数数据
const hashFunctions = ref([
  {
    name: '除法哈希法',
    type: '简单哈希',
    description: '使用取模运算将键映射到数组索引，简单高效。',
    code: `function divisionHash(key: number, size: number): number {
  return key % size;
}`,
    properties: {
      distribution: '良好',
      collision: '中等',
      performance: '优秀'
    }
  },
  {
    name: '乘法哈希法',
    type: '均匀分布',
    description: '利用乘法和小数部分来获得更好的分布特性。',
    code: `function multiplicationHash(key: number, size: number): number {
  const A = 0.6180339887; // 黄金比例
  return Math.floor(size * ((key * A) % 1));
}`,
    properties: {
      distribution: '优秀',
      collision: '低',
      performance: '良好'
    }
  },
  {
    name: 'DJB2哈希',
    type: '字符串哈希',
    description: '经典的字符串哈希函数，具有良好的分布特性。',
    code: `function djb2Hash(str: string, size: number): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return Math.abs(hash) % size;
}`,
    properties: {
      distribution: '优秀',
      collision: '很低',
      performance: '良好'
    }
  }
])

// 冲突解决方法
const collisionMethods = ref([
  {
    name: '链地址法',
    efficiency: '高效',
    description: '每个哈希桶使用链表存储冲突的元素，简单可靠。',
    visualization: [
      { index: 0, items: ['A'], collision: false },
      { index: 1, items: ['B', 'C'], collision: true },
      { index: 2, items: [], collision: false },
      { index: 3, items: ['D'], collision: false }
    ],
    pros: [
      '实现简单',
      '处理冲突能力强',
      '负载因子可以较高'
    ],
    cons: [
      '需要额外的指针空间',
      '缓存不友好',
      '小对象开销大'
    ]
  },
  {
    name: '线性探测',
    efficiency: '中等',
    description: '发生冲突时，线性查找下一个可用的空槽。',
    visualization: [
      { index: 0, items: ['A'], collision: false },
      { index: 1, items: ['B'], collision: false },
      { index: 2, items: ['C'], collision: true },
      { index: 3, items: [], collision: false }
    ],
    pros: [
      '缓存友好',
      '不需要额外存储',
      '实现简单'
    ],
    cons: [
      '容易产生聚集',
      '删除操作复杂',
      '负载因子要求低'
    ]
  },
  {
    name: '二次探测',
    efficiency: '良好',
    description: '使用二次函数计算下一个探测位置，减少聚集现象。',
    visualization: [
      { index: 0, items: ['A'], collision: false },
      { index: 1, items: ['B'], collision: false },
      { index: 2, items: [], collision: false },
      { index: 3, items: ['C'], collision: true }
    ],
    pros: [
      '减少聚集现象',
      '实现相对简单',
      '性能较好'
    ],
    cons: [
      '可能无法找到空槽',
      '删除操作复杂',
      '计算稍复杂'
    ]
  }
])

// 应用场景
const applications = ref([
  {
    name: '数据库索引',
    icon: '🗄️',
    description: '哈希表用于快速定位数据库记录，提高查询效率。',
    example: 'MySQL的HASH索引类型'
  },
  {
    name: '缓存系统',
    icon: '⚡',
    description: '使用哈希表实现缓存，提供快速的数据访问。',
    example: 'Redis、Memcached等内存数据库'
  },
  {
    name: '编译器符号表',
    icon: '🔧',
    description: '存储变量名和函数名，用于快速查找和验证。',
    example: 'JavaScript引擎的变量查找'
  },
  {
    name: '密码学',
    icon: '🔐',
    description: '哈希函数用于数据完整性验证和数字签名。',
    example: 'SHA-256、MD5等哈希算法'
  },
  {
    name: '集合操作',
    icon: '📚',
    description: '实现Set数据结构，提供快速的成员检查。',
    example: 'JavaScript的Set对象'
  },
  {
    name: '路由表',
    icon: '🌐',
    description: '网络设备使用哈希表快速路由数据包。',
    example: '路由器MAC地址表'
  }
])
</script>

<style lang="less" scoped>
.hash-algorithms {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #2d3748;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,50 1000,100 0,100"/></svg>') no-repeat;
    background-size: cover;
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .header-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    .stat {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #2d3748;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border-radius: 2px;
  }
}

// 介绍区域样式
.intro-section {
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2d3748;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.7;
  }

  .hash-visualization {
    margin-top: 2rem;
  }

  .hash-process {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .process-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    min-width: 100px;

    .step-icon {
      font-size: 2rem;
    }

    .step-text {
      font-weight: 600;
      color: #4a5568;
    }
  }

  .process-arrow {
    font-size: 1.5rem;
    color: #8b5cf6;
    font-weight: bold;
  }
}

// 基础知识样式
.basics-section {
  .basics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .basic-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid #8b5cf6;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    ul {
      color: #4a5568;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .code-example {
    background: #1a1b26;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 1rem;

    pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;
    }

    code {
      color: #c0caf5;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }

  .complexity-table {
    .complexity-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      border-bottom: 1px solid #e2e8f0;

      &:last-child {
        border-bottom: none;
      }

      .operation {
        font-weight: 500;
        color: #2d3748;
      }

      .time {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 600;

        &.best {
          background: #d1fae5;
          color: #065f46;
        }

        &.worst {
          background: #fee2e2;
          color: #991b1b;
        }
      }
    }
  }
}

// 算法区域样式
.algorithms-section {
  .algorithm-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .algorithm-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: #4a5568;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: white;
      border-color: #8b5cf6;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      color: white;
      border-color: #8b5cf6;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    }

    .tab-icon {
      font-size: 1.2rem;
    }
  }

  .algorithm-content {
    min-height: 600px;
  }

  .algorithm-detail {
    animation: fadeIn 0.3s ease;
  }

  .algorithm-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;

    h3 {
      font-size: 1.8rem;
      color: #2d3748;
      margin: 0;
    }

    .algorithm-meta {
      display: flex;
      gap: 1rem;
    }

    .meta-tag {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;

      &.difficulty {
        &.简单 {
          background: #d1fae5;
          color: #065f46;
        }
        &.中等 {
          background: #fef3c7;
          color: #92400e;
        }
      }

      &.time, &.space {
        background: #e0e7ff;
        color: #3730a3;
      }
    }
  }

  .algorithm-body {
    > div {
      margin-bottom: 2rem;
    }

    h4 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
  }

  .problem-statement, .solution-approach {
    p {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    ul {
      color: #4a5568;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }

  .code-implementation {
    .code-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .code-tab {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      color: #4a5568;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: white;
        border-color: #8b5cf6;
      }

      &.active {
        background: #8b5cf6;
        color: white;
        border-color: #8b5cf6;
      }
    }

    .code-display {
      background: #1a1b26;
      border-radius: 8px;
      overflow: hidden;

      pre {
        margin: 0;
        padding: 1.5rem;
        overflow-x: auto;
      }

      code {
        color: #c0caf5;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }

  .algorithm-analysis {
    .analysis-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .analysis-card {
      background: #f8fafc;
      border-radius: 8px;
      padding: 1.5rem;

      h5 {
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
        color: #2d3748;
      }

      p {
        color: #4a5568;
        margin: 0;
        line-height: 1.5;
      }

      ul {
        color: #4a5568;
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
      }
    }
  }

  .example-demo {
    .example-content {
      p {
        color: #4a5568;
        margin-bottom: 1rem;
      }

      .demo-visualization {
        background: #f8fafc;
        border-radius: 8px;
        padding: 1.5rem;
        margin-top: 1rem;

        .visualization-content {
          color: #4a5568;
          font-family: 'Fira Code', monospace;
          line-height: 1.5;
        }
      }
    }
  }
}

// 哈希函数样式
.hash-functions-section {
  .hash-functions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .hash-function-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: #8b5cf6;
    }

    .func-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;

      h3 {
        margin: 0;
        color: #2d3748;
        font-size: 1.3rem;
      }

      .func-type {
        background: #e0e7ff;
        color: #3730a3;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .func-desc {
      color: #4a5568;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .func-code {
      background: #1a1b26;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 1rem;

      pre {
        margin: 0;
        padding: 1.5rem;
        overflow-x: auto;
      }

      code {
        color: #c0caf5;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }

    .func-properties {
      .property {
        margin-bottom: 0.5rem;
        color: #4a5568;

        strong {
          color: #2d3748;
        }
      }
    }
  }
}

// 冲突解决样式
.collision-resolution-section {
  .collision-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .collision-method {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #e2e8f0;

    .method-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;

      h3 {
        margin: 0;
        color: #2d3748;
        font-size: 1.3rem;
      }

      .method-efficiency {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;

        &.高效 {
          background: #d1fae5;
          color: #065f46;
        }
        &.良好 {
          background: #fef3c7;
          color: #92400e;
        }
        &.中等 {
          background: #fee2e2;
          color: #991b1b;
        }
      }
    }

    .method-desc {
      color: #4a5568;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .method-visualization {
      margin-bottom: 1.5rem;
    }

    .visual-demo {
      .hash-table {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
      }

      .hash-slot {
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 6px;
        padding: 0.75rem;
        text-align: center;
        min-height: 60px;

        &.collision {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .slot-index {
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .slot-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .slot-item {
          background: #8b5cf6;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }
      }
    }

    .method-pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      .pros, .cons {
        h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: #2d3748;
        }

        ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #4a5568;

          li {
            margin-bottom: 0.5rem;
            line-height: 1.4;
          }
        }
      }

      .pros h4 {
        color: #065f46;
      }

      .cons h4 {
        color: #991b1b;
      }
    }
  }
}

// 应用场景样式
.applications-section {
  .applications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .application-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border-color: #8b5cf6;
    }

    .app-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .app-example {
      background: white;
      padding: 0.75rem;
      border-radius: 8px;
      border-left: 4px solid #8b5cf6;
      color: #4a5568;
      font-size: 0.9rem;

      strong {
        color: #2d3748;
      }
    }
  }
}

// 页脚样式
.page-footer {
  background: #2d3748;
  color: white;
  padding: 3rem 2rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .footer-info {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #cbd5e0;
      line-height: 1.6;
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      color: #cbd5e0;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;

      &:hover {
        color: #fff;
      }
    }
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .content {
    padding: 1rem;
  }

  section {
    padding: 1.5rem;
  }

  .header-stats {
    gap: 1.5rem !important;

    .stat-number {
      font-size: 1.8rem !important;
    }
  }

  .hash-process {
    flex-direction: column;
  }

  .process-arrow {
    transform: rotate(90deg);
  }

  .algorithm-header {
    flex-direction: column;
    gap: 1rem;
  }

  .algorithm-meta {
    flex-wrap: wrap;
  }

  .method-pros-cons {
    grid-template-columns: 1fr !important;
  }

  .visual-demo .hash-table {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
