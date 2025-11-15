<template>
  <div class="other-structures-container">
    <header class="page-header">
      <h1>其他重要数据结构</h1>
      <p class="subtitle">超越基础数据结构的进阶选择</p>
    </header>

    <div class="intro-section">
      <p>除了数组、链表、栈、队列、树、图、哈希表等基础数据结构外，还有许多其他重要的数据结构在特定场景下发挥着关键作用。这些数据结构为解决特定问题提供了高效的解决方案。</p>
    </div>

    <div class="navigation-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['nav-tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <div class="content-area">
      <!-- 跳表 -->
      <section v-if="activeTab === 'skiplist'" class="structure-section">
        <div class="section-header">
          <h2>跳表 (Skip List)</h2>
          <div class="complexity-tag">
            <span>查询: O(log n)</span>
            <span>插入: O(log n)</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>跳表是一种概率性的数据结构，通过在有序链表上添加多级索引来实现快速查找。它结合了链表的灵活性和类似二叉搜索树的查询效率。</p>
            </div>

            <div class="features-list">
              <h3>核心特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">⚡</div>
                  <h4>高效查询</h4>
                  <p>平均时间复杂度为 O(log n)，接近平衡树的性能</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🔄</div>
                  <h4>动态结构</h4>
                  <p>支持高效的插入和删除操作</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>实现简单</h4>
                  <p>相比平衡树更容易实现和维护</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">📊</div>
                  <h4>概率平衡</h4>
                  <p>通过随机化算法维持平衡，无需复杂的旋转操作</p>
                </div>
              </div>
            </div>

            <div class="implementation-example">
              <h3>结构示意</h3>
              <div class="visualization">
                <div class="skip-list-visual">
                  <div class="level level-3">
                    <div class="node header">Head</div>
                    <div class="node">→</div>
                    <div class="node value">30</div>
                    <div class="node">→</div>
                    <div class="node">NULL</div>
                  </div>
                  <div class="level level-2">
                    <div class="node header">Head</div>
                    <div class="node">→</div>
                    <div class="node value">15</div>
                    <div class="node">→</div>
                    <div class="node value">30</div>
                    <div class="node">→</div>
                    <div class="node">NULL</div>
                  </div>
                  <div class="level level-1">
                    <div class="node header">Head</div>
                    <div class="node">→</div>
                    <div class="node value">5</div>
                    <div class="node">→</div>
                    <div class="node value">15</div>
                    <div class="node">→</div>
                    <div class="node value">20</div>
                    <div class="node">→</div>
                    <div class="node value">30</div>
                    <div class="node">→</div>
                    <div class="node">NULL</div>
                  </div>
                  <div class="level level-0">
                    <div class="node header">Head</div>
                    <div class="node">→</div>
                    <div class="node value">5</div>
                    <div class="node">→</div>
                    <div class="node value">10</div>
                    <div class="node">→</div>
                    <div class="node value">15</div>
                    <div class="node">→</div>
                    <div class="node value">20</div>
                    <div class="node">→</div>
                    <div class="node value">25</div>
                    <div class="node">→</div>
                    <div class="node value">30</div>
                    <div class="node">→</div>
                    <div class="node">NULL</div>
                  </div>
                </div>
                <div class="visual-legend">
                  <div class="legend-item">
                    <div class="color-box level-3"></div>
                    <span>Level 3: 最高级索引</span>
                  </div>
                  <div class="legend-item">
                    <div class="color-box level-2"></div>
                    <span>Level 2: 中级索引</span>
                  </div>
                  <div class="legend-item">
                    <div class="color-box level-1"></div>
                    <span>Level 1: 低级索引</span>
                  </div>
                  <div class="legend-item">
                    <div class="color-box level-0"></div>
                    <span>Level 0: 原始链表</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="use-cases">
              <h3>应用场景</h3>
              <div class="use-case-grid">
                <div class="use-case-item">
                  <h4>Redis 有序集合</h4>
                  <p>Redis使用跳表实现有序集合，支持范围查询和排序操作</p>
                </div>
                <div class="use-case-item">
                  <h4>LevelDB</h4>
                  <p>Google的LevelDB使用跳表作为内存中的数据结构</p>
                </div>
                <div class="use-case-item">
                  <h4>并发数据结构</h4>
                  <p>跳表易于实现线程安全版本，适合并发环境</p>
                </div>
                <div class="use-case-item">
                  <h4>替代平衡树</h4>
                  <p>在需要简单实现且性能接近平衡树的场景中使用</p>
                </div>
              </div>
            </div>
          </div>

          <div class="code-content">
            <h3>代码实现</h3>
            <div class="code-block">
              <pre><code>class SkipListNode {
  constructor(public value: number, public level: number) {
    this.forward = new Array(level + 1).fill(null);
  }
  public forward: (SkipListNode | null)[];
}

class SkipList {
  private head: SkipListNode;
  private maxLevel: number;
  private probability: number;
  private level: number;

  constructor(maxLevel: number = 16, probability: number = 0.5) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.head = new SkipListNode(-Infinity, maxLevel);
    this.level = 0;
  }

  private randomLevel(): number {
    let level = 0;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  search(target: number): boolean {
    let current = this.head;

    // 从最高层开始查找
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i]!.value < target) {
        current = current.forward[i]!;
      }
    }

    current = current.forward[0]!;
    return current !== null && current.value === target;
  }

  insert(value: number): void {
    const update: (SkipListNode | null)[] = new Array(this.maxLevel + 1).fill(null);
    let current = this.head;

    // 查找插入位置并记录每层的更新节点
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i]!.value < value) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }

    current = current.forward[0]!;

    // 如果值已存在，不插入
    if (current === null || current.value !== value) {
      const newLevel = this.randomLevel();

      // 如果新节点的层数更高，更新头节点指针
      if (newLevel > this.level) {
        for (let i = this.level + 1; i <= newLevel; i++) {
          update[i] = this.head;
        }
        this.level = newLevel;
      }

      // 创建新节点
      const newNode = new SkipListNode(value, newLevel);

      // 更新每层的指针
      for (let i = 0; i <= newLevel; i++) {
        newNode.forward[i] = update[i]!.forward[i];
        update[i]!.forward[i] = newNode;
      }
    }
  }

  delete(value: number): boolean {
    const update: (SkipListNode | null)[] = new Array(this.maxLevel + 1).fill(null);
    let current = this.head;

    // 查找要删除的节点
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i]!.value < value) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }

    current = current.forward[0]!;

    if (current !== null && current.value === value) {
      // 更新每层的指针
      for (let i = 0; i <= this.level; i++) {
        if (update[i]!.forward[i] !== current) {
          break;
        }
        update[i]!.forward[i] = current.forward[i];
      }

      // 更新跳表的层数
      while (this.level > 0 && this.head.forward[this.level] === null) {
        this.level--;
      }

      return true;
    }

    return false;
  }

  display(): void {
    console.log('Skip List:');
    for (let i = this.level; i >= 0; i--) {
      let output = `Level ${i}: `;
      let current = this.head.forward[i];
      while (current !== null) {
        output += `${current.value} -> `;
        current = current.forward[i];
      }
      output += 'NULL';
      console.log(output);
    }
  }
}

// 使用示例
const skipList = new SkipList();
skipList.insert(3);
skipList.insert(6);
skipList.insert(7);
skipList.insert(9);
skipList.insert(12);
skipList.display();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 布隆过滤器 -->
      <section v-if="activeTab === 'bloom'" class="structure-section">
        <div class="section-header">
          <h2>布隆过滤器 (Bloom Filter)</h2>
          <div class="complexity-tag">
            <span>查询: O(k)</span>
            <span>空间: 高效</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>布隆过滤器是一种概率型数据结构，用于快速判断一个元素是否存在于一个集合中。它通过多个哈希函数和位数组来实现，具有极高的空间效率。</p>
            </div>

            <div class="features-list">
              <h3>核心特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">💾</div>
                  <h4>空间高效</h4>
                  <p>相比哈希表，布隆过滤器使用更少的内存</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">⚡</div>
                  <h4>查询快速</h4>
                  <p>查询时间复杂度为常数 O(k)，k为哈希函数数量</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>概率性</h4>
                  <p>可能存在误报，但不会漏报</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🚫</div>
                  <h4>不支持删除</h4>
                  <p>标准布隆过滤器不支持删除操作</p>
                </div>
              </div>
            </div>

            <div class="implementation-example">
              <h3>工作原理</h3>
              <div class="visualization">
                <div class="bloom-filter-visual">
                  <div class="bit-array">
                    <div v-for="i in 16" :key="i"
                         :class="['bit', { active: bloomBits.includes(i-1) }]">
                      {{ i-1 }}
                    </div>
                  </div>
                  <div class="hash-functions">
                    <div class="hash-function">
                      <span class="hash-label">h1(x)</span>
                      <div class="hash-arrow">↓</div>
                    </div>
                    <div class="hash-function">
                      <span class="hash-label">h2(x)</span>
                      <div class="hash-arrow">↓</div>
                    </div>
                    <div class="hash-function">
                      <span class="hash-label">h3(x)</span>
                      <div class="hash-arrow">↓</div>
                    </div>
                  </div>
                  <div class="input-element">元素 x</div>
                </div>
                <div class="visual-explanation">
                  <p>插入元素时，通过多个哈希函数计算位置，将对应位设为1。查询时检查所有哈希位置是否都为1。</p>
                </div>
              </div>
            </div>

            <div class="use-cases">
              <h3>应用场景</h3>
              <div class="use-case-grid">
                <div class="use-case-item">
                  <h4>缓存击穿保护</h4>
                  <p>防止缓存不存在的数据频繁查询数据库</p>
                </div>
                <div class="use-case-item">
                  <h4>网页爬虫</h4>
                  <p>判断URL是否已经被爬取过</p>
                </div>
                <div class="use-case-item">
                  <h4>垃圾邮件过滤</h4>
                  <p>快速判断邮件地址是否为垃圾邮件发送者</p>
                </div>
                <div class="use-case-item">
                  <h4>分布式系统</h4>
                  <p>减少网络传输，快速判断数据是否存在</p>
                </div>
              </div>
            </div>
          </div>

          <div class="code-content">
            <h3>代码实现</h3>
            <div class="code-block">
              <pre><code>class BloomFilter {
  private size: number;
  private hashCount: number;
  private bitArray: number;

  constructor(size: number = 1024, hashCount: number = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = 0; // 使用位运算模拟位数组
  }

  // 简单的哈希函数（实际应用中应使用更好的哈希函数）
  private hashFunctions(value: string, seed: number): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i) + seed;
      hash |= 0; // 转换为32位整数
    }
    return Math.abs(hash) % this.size;
  }

  add(value: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hashFunctions(value, i);
      this.bitArray |= (1 << position);
    }
  }

  contains(value: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hashFunctions(value, i);
      if ((this.bitArray & (1 << position)) === 0) {
        return false;
      }
    }
    return true;
  }

  // 计算误报率
  falsePositiveRate(insertedCount: number): number {
    const k = this.hashCount;
    const m = this.size;
    const n = insertedCount;
    return Math.pow(1 - Math.exp(-k * n / m), k);
  }
}

// 使用示例
const bloomFilter = new BloomFilter(1000, 3);

// 添加元素
bloomFilter.add("https://example.com/page1");
bloomFilter.add("https://example.com/page2");
bloomFilter.add("https://example.com/page3");

// 检查元素是否存在
console.log(bloomFilter.contains("https://example.com/page1")); // true
console.log(bloomFilter.contains("https://example.com/unknown")); // false (可能)

// 计算误报率
console.log(`误报率: ${bloomFilter.falsePositiveRate(3).toFixed(6)}`);

// 更完整的实现（使用真正的位数组）
class AdvancedBloomFilter {
  private size: number;
  private hashCount: number;
  private bitArray: Uint8Array;

  constructor(size: number = 1024, hashCount: number = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = new Uint8Array(Math.ceil(size / 8));
  }

  private hashFunctions(value: string, seed: number): number {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) + hash + value.charCodeAt(i) + seed;
    }
    return Math.abs(hash) % this.size;
  }

  add(value: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hashFunctions(value, i);
      const byteIndex = Math.floor(position / 8);
      const bitIndex = position % 8;
      this.bitArray[byteIndex] |= (1 << bitIndex);
    }
  }

  contains(value: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hashFunctions(value, i);
      const byteIndex = Math.floor(position / 8);
      const bitIndex = position % 8;
      if ((this.bitArray[byteIndex] & (1 << bitIndex)) === 0) {
        return false;
      }
    }
    return true;
  }

  // 清空布隆过滤器
  clear(): void {
    this.bitArray.fill(0);
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 并查集 -->
      <section v-if="activeTab === 'unionfind'" class="structure-section">
        <div class="section-header">
          <h2>并查集 (Union-Find)</h2>
          <div class="complexity-tag">
            <span>查询: O(α(n))</span>
            <span>近乎常数</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>并查集是一种树型的数据结构，用于处理一些不交集的合并及查询问题。它支持两种操作：查找元素所属集合，以及合并两个集合。</p>
            </div>

            <div class="features-list">
              <h3>核心特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">⚡</div>
                  <h4>高效操作</h4>
                  <p>经过路径压缩和按秩合并优化后，操作近乎常数时间</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🔄</div>
                  <h4>动态连接</h4>
                  <p>支持动态添加和连接元素</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>连通性检测</h4>
                  <p>快速判断两个元素是否属于同一集合</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">💾</div>
                  <h4>空间高效</h4>
                  <p>只需要一个数组来存储父节点信息</p>
                </div>
              </div>
            </div>

            <div class="implementation-example">
              <h3>操作示例</h3>
              <div class="visualization">
                <div class="union-find-visual">
                  <div class="sets-container">
                    <div class="set" v-for="set in unionFindSets" :key="set.id">
                      <div class="set-label">集合 {{ set.id }}</div>
                      <div class="set-elements">
                        <div v-for="element in set.elements"
                             :key="element"
                             class="element">
                          {{ element }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="operations">
                    <button class="op-btn" @click="unionOperation">Union(1,2)</button>
                    <button class="op-btn" @click="findOperation">Find(3)</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="use-cases">
              <h3>应用场景</h3>
              <div class="use-case-grid">
                <div class="use-case-item">
                  <h4>连通分量</h4>
                  <p>计算无向图中的连通分量</p>
                </div>
                <div class="use-case-item">
                  <h4>Kruskal算法</h4>
                  <p>最小生成树算法中检测环</p>
                </div>
                <div class="use-case-item">
                  <h4>网络连接</h4>
                  <p>判断网络中的节点是否连通</p>
                </div>
                <div class="use-case-item">
                  <h4>图像处理</h4>
                  <p>图像分割中的区域合并</p>
                </div>
              </div>
            </div>
          </div>

          <div class="code-content">
            <h3>代码实现</h3>
            <div class="code-block">
              <pre><code>class UnionFind {
  private parent: number[];
  private rank: number[];
  private count: number;

  constructor(size: number) {
    this.parent = new Array(size);
    this.rank = new Array(size).fill(0);
    this.count = size;

    // 初始化，每个元素的父节点都是自己
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  // 查找元素所在集合的根节点（带路径压缩）
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // 路径压缩
    }
    return this.parent[x];
  }

  // 合并两个集合（带按秩合并）
  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      // 按秩合并
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
      this.count--;
    }
  }

  // 判断两个元素是否属于同一集合
  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }

  // 获取集合数量
  getCount(): number {
    return this.count;
  }

  // 获取每个元素所属的集合
  getSets(): Map&lt;number, number[]&gt; {
    const sets = new Map&lt;number, number[]&gt;();

    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      if (!sets.has(root)) {
        sets.set(root, []);
      }
      sets.get(root)!.push(i);
    }

    return sets;
  }
}

// 使用示例：计算连通分量
function countConnectedComponents(n: number, edges: number[][]): number {
  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    uf.union(u, v);
  }

  return uf.getCount();
}

// 使用示例：Kruskal算法
interface Edge {
  from: number;
  to: number;
  weight: number;
}

function kruskalMST(vertices: number, edges: Edge[]): Edge[] {
  // 按权重排序边
  edges.sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind(vertices);
  const mst: Edge[] = [];

  for (const edge of edges) {
    if (!uf.connected(edge.from, edge.to)) {
      uf.union(edge.from, edge.to);
      mst.push(edge);

      // 当生成树有n-1条边时停止
      if (mst.length === vertices - 1) {
        break;
      }
    }
  }

  return mst;
}

// 使用示例
const uf = new UnionFind(5);
console.log('初始集合数量:', uf.getCount()); // 5

uf.union(0, 1);
uf.union(2, 3);
console.log('合并后集合数量:', uf.getCount()); // 3

console.log('0和1是否连通:', uf.connected(0, 1)); // true
console.log('0和2是否连通:', uf.connected(0, 2)); // false

// 获取所有集合
const sets = uf.getSets();
console.log('所有集合:', sets);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 更多数据结构 -->
      <section v-if="activeTab === 'more'" class="structure-section">
        <div class="section-header">
          <h2>其他重要数据结构</h2>
          <div class="complexity-tag">
            <span>各具特色</span>
            <span>专业应用</span>
          </div>
        </div>

        <div class="more-structures-grid">
          <!-- Trie树 -->
          <div class="structure-card">
            <div class="card-header">
              <h3>Trie树 (字典树)</h3>
              <div class="card-tag">字符串处理</div>
            </div>
            <div class="card-content">
              <p>用于高效存储和检索字符串集合的前缀树结构。</p>
              <div class="complexity">
                <span>插入: O(L)</span>
                <span>查询: O(L)</span>
              </div>
              <div class="applications">
                <h4>应用场景：</h4>
                <ul>
                  <li>自动补全系统</li>
                  <li>拼写检查</li>
                  <li>IP路由表</li>
                  <li>搜索引擎</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 线段树 -->
          <div class="structure-card">
            <div class="card-header">
              <h3>线段树</h3>
              <div class="card-tag">区间查询</div>
            </div>
            <div class="card-content">
              <p>用于处理区间查询和区间更新的二叉树结构。</p>
              <div class="complexity">
                <span>构建: O(n)</span>
                <span>查询: O(log n)</span>
              </div>
              <div class="applications">
                <h4>应用场景：</h4>
                <ul>
                  <li>区间求和</li>
                  <li>区间最值</li>
                  <li>区间更新</li>
                  <li>范围统计</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 树状数组 -->
          <div class="structure-card">
            <div class="card-header">
              <h3>树状数组 (Fenwick Tree)</h3>
              <div class="card-tag">前缀和</div>
            </div>
            <div class="card-content">
              <p>用于高效计算前缀和和点更新的数据结构。</p>
              <div class="complexity">
                <span>更新: O(log n)</span>
                <span>查询: O(log n)</span>
              </div>
              <div class="applications">
                <h4>应用场景：</h4>
                <ul>
                  <li>动态前缀和</li>
                  <li>逆序对计数</li>
                  <li>范围查询</li>
                  <li>频率统计</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 环形缓冲区 -->
          <div class="structure-card">
            <div class="card-header">
              <h3>环形缓冲区</h3>
              <div class="card-tag">数据流</div>
            </div>
            <div class="card-content">
              <p>固定大小的缓冲区，循环使用存储空间。</p>
              <div class="complexity">
                <span>插入: O(1)</span>
                <span>删除: O(1)</span>
              </div>
              <div class="applications">
                <h4>应用场景：</h4>
                <ul>
                  <li>数据流处理</li>
                  <li>音频/视频缓冲</li>
                  <li>生产者-消费者模式</li>
                  <li>实时系统</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- B树 -->
          <div class="structure-card">
            <div class="card-header">
              <h3>B树 / B+树</h3>
              <div class="card-tag">磁盘存储</div>
            </div>
            <div class="card-content">
              <p>自平衡的树数据结构，优化磁盘I/O操作。</p>
              <div class="complexity">
                <span>查询: O(log n)</span>
                <span>高度平衡</span>
              </div>
              <div class="applications">
                <h4>应用场景：</h4>
                <ul>
                  <li>数据库索引</li>
                  <li>文件系统</li>
                  <li>大量数据存储</li>
                  <li>外部存储</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 位图 -->
          <div class="structure-card">
            <div class="card-header">
              <h3>位图 (Bitmap)</h3>
              <div class="card-tag">空间优化</div>
            </div>
            <div class="card-content">
              <p>使用位来高效表示布尔值或小整数集合。</p>
              <div class="complexity">
                <span>空间: O(n/8)</span>
                <span>操作: O(1)</span>
              </div>
              <div class="applications">
                <h4>应用场景：</h4>
                <ul>
                  <li>集合表示</li>
                  <li>布隆过滤器</li>
                  <li>内存压缩</li>
                  <li>位级操作</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 对比总结 -->
    <section class="comparison-section">
      <div class="section-header">
        <h2>数据结构对比总结</h2>
      </div>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>数据结构</th>
              <th>时间复杂度</th>
              <th>空间复杂度</th>
              <th>主要优势</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>跳表</strong></td>
              <td>O(log n)</td>
              <td>O(n)</td>
              <td>实现简单，性能接近平衡树</td>
              <td>有序集合，范围查询</td>
            </tr>
            <tr>
              <td><strong>布隆过滤器</strong></td>
              <td>O(k)</td>
              <td>极低</td>
              <td>空间效率极高</td>
              <td>存在性检查，缓存击穿</td>
            </tr>
            <tr>
              <td><strong>并查集</strong></td>
              <td>O(α(n))</td>
              <td>O(n)</td>
              <td>高效的集合合并与查询</td>
              <td>连通性检测，动态连接</td>
            </tr>
            <tr>
              <td><strong>Trie树</strong></td>
              <td>O(L)</td>
              <td>O(AL)</td>
              <td>高效前缀匹配</td>
              <td>字典，自动补全</td>
            </tr>
            <tr>
              <td><strong>线段树</strong></td>
              <td>O(log n)</td>
              <td>O(n)</td>
              <td>高效的区间操作</td>
              <td>范围查询，区间更新</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('skiplist');

const tabs = [
  { id: 'skiplist', label: '跳表', icon: '⛷️' },
  { id: 'bloom', label: '布隆过滤器', icon: '🌸' },
  { id: 'unionfind', label: '并查集', icon: '🔗' },
  { id: 'more', label: '更多结构', icon: '📚' }
];

// 可视化数据
const bloomBits = ref([2, 5, 8, 11, 14]);

const unionFindSets = ref([
  { id: 1, elements: [0, 1] },
  { id: 2, elements: [2, 3] },
  { id: 3, elements: [4] }
]);

const unionOperation = () => {
  // 模拟合并操作
  alert('执行 Union(1,2) 操作');
};

const findOperation = () => {
  // 模拟查找操作
  alert('执行 Find(3) 操作，返回根节点: 2');
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.other-structures-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2c3e50 0%, #64748b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #64748b;
    font-weight: 400;
  }
}

.intro-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.7;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.navigation-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.nav-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background: white;
    border-color: #475569;
    color: #475569;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .tab-icon {
    font-size: 1.4rem;
  }
}

.structure-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-bottom: 1px solid #e2e8f0;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }
}

.complexity-tag {
  display: flex;
  gap: 1rem;

  span {
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #475569;
    border: 1px solid #cbd5e1;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.description-content {
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
}

.concept-box {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #64748b;
  margin-bottom: 2rem;

  p {
    color: #475569;
    line-height: 1.6;
    margin: 0;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.95rem;
  }
}

.visualization {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

// 跳表可视化
.skip-list-visual {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;

  &.level-3 { background: #fef3c7; }
  &.level-2 { background: #d1fae5; }
  &.level-1 { background: #dbeafe; }
  &.level-0 { background: #f3f4f6; }
}

.node {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;

  &.header {
    background: #374151;
    color: white;
    font-weight: 600;
  }

  &.value {
    background: white;
    border: 2px solid #6366f1;
    color: #6366f1;
  }
}

.visual-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;

  &.level-3 { background: #fef3c7; }
  &.level-2 { background: #d1fae5; }
  &.level-1 { background: #dbeafe; }
  &.level-0 { background: #f3f4f6; }
}

// 布隆过滤器可视化
.bloom-filter-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.bit-array {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.bit {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  background: white;

  &.active {
    background: #10b981;
    color: white;
    border-color: #059669;
  }
}

.hash-functions {
  display: flex;
  gap: 2rem;
}

.hash-function {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hash-label {
  font-weight: 600;
  color: #475569;
}

.hash-arrow {
  font-size: 1.2rem;
  color: #6366f1;
}

.input-element {
  padding: 0.8rem 1.5rem;
  background: #6366f1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
}

.visual-explanation {
  margin-top: 1rem;
  padding: 1rem;
  background: #eff6ff;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;

  p {
    margin: 0;
    color: #475569;
    line-height: 1.5;
  }
}

// 并查集可视化
.union-find-visual {
  .sets-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .set {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem;
    min-width: 120px;
  }

  .set-label {
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .set-elements {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .element {
    padding: 0.5rem;
    background: #f1f5f9;
    border-radius: 6px;
    text-align: center;
    font-weight: 500;
  }

  .operations {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .op-btn {
    padding: 0.8rem 1.5rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #4f46e5;
    }
  }
}

.use-cases {
  margin-top: 2rem;
}

.use-case-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.use-case-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.8rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
  }
}

.code-content {
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
}

.code-block {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.5;
    }
  }
}

// 更多数据结构网格
.more-structures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.structure-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #334155;
    margin: 0;
  }
}

.card-tag {
  background: #6366f1;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.card-content {
  padding: 1.5rem;

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.complexity {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  span {
    background: #f1f5f9;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #475569;
  }
}

.applications {
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.8rem;
  }

  ul {
    color: #64748b;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.3rem;
      line-height: 1.4;
    }
  }
}

.comparison-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .section-header {
    background: none;
    padding: 0 0 1.5rem;
    border-bottom: 2px solid #e2e8f0;

    h2 {
      font-size: 2rem;
      color: #1e293b;
    }
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    th, td {
      padding: 1.2rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #475569;
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }

    tr:hover {
      background: #f8fafc;
    }

    td:first-child {
      font-weight: 600;
      color: #475569;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .other-structures-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .content-grid {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .use-case-grid {
    grid-template-columns: 1fr;
  }

  .more-structures-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .comparison-table {
    font-size: 0.9rem;

    th, td {
      padding: 0.8rem 1rem;
    }
  }
}
</style>
