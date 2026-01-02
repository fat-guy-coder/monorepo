<template>
  <div class="union-find-container">
    <header class="page-header">
      <h1>并查集 (Union-Find)</h1>
      <p class="subtitle">高效的动态连通性数据结构</p>
    </header>

    <div class="intro-section">
      <p>并查集是一种树型的数据结构，用于处理一些不交集合（Disjoint Sets）的合并及查询问题。它支持两种操作：查找元素所属集合，以及合并两个集合。</p>
    </div>

    <div class="content-layout">
      <!-- 左侧内容区域 -->
      <div class="main-content">
        <!-- 结构特点 -->
        <section class="content-section">
          <div class="section-header">
            <h2>结构特点</h2>
            <div class="section-tag">核心概念</div>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🌳</div>
              <h3>树形结构</h3>
              <p>每个集合用一棵树表示，树的根节点代表整个集合，每个节点指向其父节点。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>高效操作</h3>
              <p>经过路径压缩和按秩合并优化后，查找和合并操作的时间复杂度接近常数。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>动态连接</h3>
              <p>支持动态添加元素和连接操作，适合处理动态变化的连通关系。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">💾</div>
              <h3>空间高效</h3>
              <p>只需要一个数组来存储父节点信息，空间复杂度为O(n)。</p>
            </div>
          </div>

          <div class="structure-details">
            <h3>核心概念详解</h3>
            <div class="details-grid">
              <div class="detail-item">
                <h4>父指针表示法</h4>
                <div class="visual-structure">
                  <div class="tree-diagram">
                    <div class="node root">根节点 (0)</div>
                    <div class="node">节点 (1) → 0</div>
                    <div class="node">节点 (2) → 0</div>
                    <div class="node">节点 (3) → 1</div>
                    <div class="node">节点 (4) → 1</div>
                  </div>
                </div>
                <p>每个节点存储指向父节点的指针，根节点指向自己。</p>
              </div>

              <div class="detail-item">
                <h4>两种优化策略</h4>
                <div class="optimization-list">
                  <div class="optimization-item">
                    <h5>路径压缩</h5>
                    <p>在查找过程中，将路径上的所有节点直接连接到根节点， flatten 树结构。</p>
                  </div>
                  <div class="optimization-item">
                    <h5>按秩合并</h5>
                    <p>合并时总是将较矮的树连接到较高的树，保持树的平衡。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 图形演示 -->
        <section class="content-section">
          <div class="section-header">
            <h2>图形演示</h2>
            <div class="section-tag">交互体验</div>
          </div>

          <div class="demo-area">
            <div class="demo-controls">
              <div class="control-group">
                <label>操作类型:</label>
                <Select v-model="demoOperation" @change="resetDemo">
                  <option value="find">查找 (Find)</option>
                  <option value="union">合并 (Union)</option>
                  <option value="pathCompression">路径压缩</option>
                </select>
              </div>
              <div class="control-group">
                <label>参数:</label>
                <input v-model="demoParam1" type="number" placeholder="节点1">
                <input v-if="demoOperation === 'union'" v-model="demoParam2" type="number" placeholder="节点2">
                <button @click="performDemoOperation" class="demo-btn">执行</button>
                <button @click="resetDemo" class="demo-btn secondary">重置</button>
              </div>
            </div>

            <div class="visualization-container">
              <div class="sets-visual">
                <div class="set" v-for="set in currentSets" :key="set.id">
                  <div class="set-header">集合 {{ set.root }}</div>
                  <div class="set-content">
                    <div
                      v-for="node in set.nodes"
                      :key="node"
                      :class="['node', {
                        'active': demoActiveNodes.includes(node),
                        'root': node === set.root
                      }]"
                    >
                      {{ node }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="parent-array">
                <h4>父指针数组</h4>
                <div class="array-visual">
                  <div
                    v-for="(parent, index) in parentArray"
                    :key="index"
                    :class="['array-item', { 'active': demoActiveNodes.includes(index) }]"
                  >
                    <div class="index">{{ index }}</div>
                    <div class="value">→ {{ parent }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="demo-status">
              <div v-if="demoStatus" :class="['status-message', demoStatus.type]">
                {{ demoStatus.message }}
              </div>
            </div>

            <div class="operation-steps">
              <h4>操作步骤</h4>
              <div class="steps">
                <div
                  v-for="(step, index) in operationSteps"
                  :key="index"
                  class="step"
                >
                  {{ step }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section class="content-section">
          <div class="section-header">
            <h2>使用场景</h2>
            <div class="section-tag">实际应用</div>
          </div>

          <div class="scenarios-grid">
            <div class="scenario-card">
              <div class="scenario-icon">🌐</div>
              <h3>连通分量检测</h3>
              <p>在无向图中计算连通分量数量，判断节点是否连通。</p>
              <div class="scenario-code">
                <pre><code>// 计算无向图的连通分量
function countComponents(n, edges) {
  const uf = new UnionFind(n);
  for (const [u, v] of edges) {
    uf.union(u, v);
  }
  return uf.getCount();
}</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <h3>Kruskal算法</h3>
              <p>最小生成树算法中检测环，确保加入的边不会形成环。</p>
              <div class="scenario-code">
                <pre><code>// Kruskal算法核心
if (!uf.connected(u, v)) {
  uf.union(u, v);
  mst.push(edge);
}</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🤖</div>
              <h3>动态连通性</h3>
              <p>社交网络中的好友关系，动态判断用户是否在同一圈子。</p>
              <div class="scenario-code">
                <pre><code>// 动态好友关系
uf.union(user1, user2);
const areFriends = uf.connected(user1, user2);</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🧩</div>
              <h3>图像处理</h3>
              <p>图像分割中的区域合并，将相邻的相似像素点合并。</p>
              <div class="scenario-code">
                <pre><code>// 图像区域合并
if (pixelsSimilar(pixel1, pixel2)) {
  uf.union(pixel1Id, pixel2Id);
}</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 右侧侧边栏 -->
      <div class="sidebar">
        <!-- 优缺点 -->
        <section class="sidebar-section">
          <div class="section-header">
            <h2>优缺点分析</h2>
 <div class="section-tag">权衡</div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h3>优点 ✅</h3>
              <div class="advantage-list">
                <div class="advantage-item">
                  <h4>近乎常数时间</h4>
                  <p>经过优化后，操作时间复杂度为O(α(n))，其中α(n)是反阿克曼函数，增长极其缓慢。</p>
                </div>
                <div class="advantage-item">
                  <h4>实现简单</h4>
                  <p>核心代码只有几十行，容易理解和实现。</p>
                </div>
                <div class="advantage-item">
                  <h4>空间高效</h4>
                  <p>只需要一个大小为n的数组，空间复杂度为O(n)。</p>
                </div>
                <div class="advantage-item">
                  <h4>动态操作</h4>
                  <p>支持动态添加连接关系，适合实时变化的场景。</p>
                </div>
              </div>
            </div>

            <div class="cons">
              <h3>缺点 ❌</h3>
              <div class="disadvantage-list">
                <div class="disadvantage-item">
                  <h4>无法分离</h4>
                  <p>标准并查集不支持分离操作，一旦合并就无法拆分。</p>
                </div>
                <div class="disadvantage-item">
                  <h4>信息有限</h4>
                  <p>只能判断连通性，无法获取具体的连接路径。</p>
                </div>
                <div class="disadvantage-item">
                  <h4>常数因子</h4>
                  <p>虽然渐进复杂度优秀，但实际常数因子可能较大。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 复杂度分析 -->
        <section class="sidebar-section">
          <div class="section-header">
            <h2>复杂度分析</h2>
            <div class="section-tag">性能</div>
          </div>

          <div class="complexity-analysis">
            <div class="complexity-table">
              <div class="complexity-row">
                <div class="op">操作</div>
                <div class="without-opt">未优化</div>
                <div class="with-opt">优化后</div>
              </div>
              <div class="complexity-row">
                <div class="op">查找 (Find)</div>
                <div class="without-opt">O(n)</div>
                <div class="with-opt">O(α(n))</div>
              </div>
              <div class="complexity-row">
                <div class="op">合并 (Union)</div>
                <div class="without-opt">O(n)</div>
                <div class="with-opt">O(α(n))</div>
              </div>
              <div class="complexity-row">
                <div class="op">空间</div>
                <div class="without-opt">O(n)</div>
                <div class="with-opt">O(n)</div>
              </div>
            </div>

            <div class="complexity-notes">
              <h4>关键说明：</h4>
              <ul>
                <li>α(n)是反阿克曼函数，对于所有实际n值，α(n) ≤ 5</li>
                <li>优化包括路径压缩和按秩合并</li>
                <li>在算法竞赛中，并查集通常被认为是常数时间操作</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 相关算法 -->
        <section class="sidebar-section">
          <div class="section-header">
            <h2>相关算法</h2>
            <div class="section-tag">扩展</div>
          </div>

          <div class="related-algorithms">
            <div class="algorithm-item">
              <h4>Kruskal算法</h4>
              <p>使用并查集检测环，构建最小生成树。</p>
            </div>
            <div class="algorithm-item">
              <h4>Tarjan离线LCA</h4>
              <p>使用并查集处理最近公共祖先查询。</p>
            </div>
            <div class="algorithm-item">
              <h4>动态连通性</h4>
              <p>处理动态添加和删除边的连通性问题。</p>
            </div>
            <div class="algorithm-item">
              <h4>带权并查集</h4>
              <p>在并查集中维护节点间的额外信息。</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 代码实现 -->
    <section class="code-section">
      <div class="section-header">
        <h2>代码实现</h2>
        <div class="section-tag">TypeScript</div>
      </div>

      <div class="code-tabs">
        <div class="tab-buttons">
          <button
            v-for="tab in codeTabs"
            :key="tab.id"
            :class="['tab-button', { active: activeCodeTab === tab.id }]"
            @click="activeCodeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="tab-content">
          <!-- 基础实现 -->
          <div v-if="activeCodeTab === 'basic'" class="code-block">
            <h3>基础并查集实现</h3>
            <pre><code>class UnionFind {
  private parent: number[];
  private count: number;

  constructor(n: number) {
    this.parent = new Array(n);
    this.count = n;

    // 初始化，每个元素的父节点都是自己
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  // 查找元素所在集合的根节点
  find(x: number): number {
    while (this.parent[x] !== x) {
      x = this.parent[x];
    }
    return x;
  }

  // 合并两个集合
  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
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
}

// 使用示例
const uf = new UnionFind(5);
console.log('初始集合数量:', uf.getCount()); // 5

uf.union(0, 1);
uf.union(2, 3);
console.log('合并后集合数量:', uf.getCount()); // 3

console.log('0和1是否连通:', uf.connected(0, 1)); // true
console.log('0和2是否连通:', uf.connected(0, 2)); // false</code></pre>
          </div>

          <!-- 优化版本 -->
          <div v-if="activeCodeTab === 'optimized'" class="code-block">
            <h3>优化版本（路径压缩 + 按秩合并）</h3>
            <pre><code>class OptimizedUnionFind {
  private parent: number[];
  private rank: number[];
  private count: number;

  constructor(n: number) {
    this.parent = new Array(n);
    this.rank = new Array(n).fill(0);
    this.count = n;

    // 初始化
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  // 查找（带路径压缩）
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // 路径压缩
    }
    return this.parent[x];
  }

  // 合并（带按秩合并）
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

  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }

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

// 使用示例
const optimizedUF = new OptimizedUnionFind(5);
optimizedUF.union(0, 1);
optimizedUF.union(1, 2);
optimizedUF.union(3, 4);

console.log('集合数量:', optimizedUF.getCount()); // 2
console.log('所有集合:', optimizedUF.getSets());
// 输出: Map { 0 => [0, 1, 2], 3 => [3, 4] }</code></pre>
          </div>

          <!-- 应用示例 -->
          <div v-if="activeCodeTab === 'applications'" class="code-block">
            <h3>应用示例：计算连通分量</h3>
            <pre><code>// 计算无向图中的连通分量数量
function countConnectedComponents(n: number, edges: number[][]): number {
  const uf = new OptimizedUnionFind(n);

  for (const [u, v] of edges) {
    uf.union(u, v);
  }

  return uf.getCount();
}

// 示例使用
const n = 5;
const edges = [[0, 1], [1, 2], [3, 4]];
console.log('连通分量数量:', countConnectedComponents(n, edges)); // 2

// Kruskal算法实现最小生成树
interface Edge {
  from: number;
  to: number;
  weight: number;
}

function kruskalMST(vertices: number, edges: Edge[]): Edge[] {
  // 按权重排序边
  edges.sort((a, b) => a.weight - b.weight);

  const uf = new OptimizedUnionFind(vertices);
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

// 示例使用
const vertices = 4;
const weightedEdges = [
  { from: 0, to: 1, weight: 10 },
  { from: 0, to: 2, weight: 6 },
  { from: 0, to: 3, weight: 5 },
  { from: 1, to: 3, weight: 15 },
  { from: 2, to: 3, weight: 4 }
];

const mst = kruskalMST(vertices, weightedEdges);
console.log('最小生成树边:', mst);</code></pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref,  computed } from 'vue';

// 代码标签页
const activeCodeTab = ref('basic');
const codeTabs = [
  { id: 'basic', label: '基础实现' },
  { id: 'optimized', label: '优化版本' },
  { id: 'applications', label: '应用示例' }
];

// 演示相关状态
const demoOperation = ref('find');
const demoParam1 = ref('1');
const demoParam2 = ref('2');
const demoActiveNodes = ref<number[]>([]);
const demoStatus = ref<{type: string, message: string} | null>(null);
const operationSteps = ref<string[]>([]);

// 初始并查集状态
const parentArray = ref([0, 1, 2, 3, 4]); // 初始每个节点指向自己

// 计算当前集合状态
const currentSets = computed(() => {
  const sets = new Map<number, number[]>();

  for (let i = 0; i < parentArray.value.length; i++) {
    let current = i;

    // 找到根节点
    while (parentArray.value[current] !== current) {
      current = parentArray.value[current];
    }
    const root = current;

    if (!sets.has(root)) {
      sets.set(root, []);
    }
    sets.get(root)!.push(i);
  }

  return Array.from(sets.entries()).map(([root, nodes]) => ({
    id: root,
    root,
    nodes
  }));
});

// 重置演示
const resetDemo = () => {
  parentArray.value = [0, 1, 2, 3, 4];
  demoActiveNodes.value = [];
  demoStatus.value = null;
  operationSteps.value = [];
};

// 执行演示操作
const performDemoOperation = () => {
  const node1 = parseInt(demoParam1.value);
  const node2 = parseInt(demoParam2.value);

  if (isNaN(node1) || node1 < 0 || node1 >= parentArray.value.length) {
    demoStatus.value = {
      type: 'error',
      message: '请输入有效的节点1'
    };
    return;
  }

  demoActiveNodes.value = [];
  operationSteps.value = [];

  switch (demoOperation.value) {
    case 'find':
      performFind(node1);
      break;
    case 'union':
      if (isNaN(node2) || node2 < 0 || node2 >= parentArray.value.length) {
        demoStatus.value = {
          type: 'error',
          message: '请输入有效的节点2'
        };
        return;
      }
      performUnion(node1, node2);
      break;
    case 'pathCompression':
      performPathCompression(node1);
      break;
  }
};

// 执行查找操作
const performFind = (node: number) => {
  operationSteps.value = [
    `开始查找节点 ${node} 的根节点`,
    `当前父节点: ${parentArray.value[node]}`
  ];

  let current = node;
  demoActiveNodes.value.push(current);

  while (parentArray.value[current] !== current) {
    current = parentArray.value[current];
    demoActiveNodes.value.push(current);
    operationSteps.value.push(`移动到父节点: ${current}`);
  }

  operationSteps.value.push(`找到根节点: ${current}`);

  demoStatus.value = {
    type: 'success',
    message: `节点 ${node} 的根节点是 ${current}`
  };
};

// 执行合并操作
const performUnion = (node1: number, node2: number) => {
  operationSteps.value = [
    `开始合并节点 ${node1} 和 ${node2}`,
    `查找节点 ${node1} 的根节点...`
  ];

  // 简化版查找，不包含路径压缩
  let root1 = node1;
  while (parentArray.value[root1] !== root1) {
    root1 = parentArray.value[root1];
  }

  operationSteps.value.push(`节点 ${node1} 的根节点是 ${root1}`);
  operationSteps.value.push(`查找节点 ${node2} 的根节点...`);

  let root2 = node2;
  while (parentArray.value[root2] !== root2) {
    root2 = parentArray.value[root2];
  }

  operationSteps.value.push(`节点 ${node2} 的根节点是 ${root2}`);

  if (root1 === root2) {
    operationSteps.value.push(`两个节点已经在同一集合中，无需合并`);
    demoStatus.value = {
      type: 'info',
      message: `节点 ${node1} 和 ${node2} 已经在同一集合中`
    };
  } else {
    parentArray.value[root1] = root2;
    operationSteps.value.push(`将根节点 ${root1} 连接到根节点 ${root2}`);
    demoStatus.value = {
      type: 'success',
      message: `成功合并节点 ${node1} 和 ${node2}`
    };
  }

  demoActiveNodes.value = [node1, node2, root1, root2];
};

// 执行路径压缩演示
const performPathCompression = (node: number) => {
  operationSteps.value = [
    `对节点 ${node} 执行路径压缩`,
    `查找根节点并压缩路径...`
  ];

  const path = [node];
  let current = node;

  // 先找到根节点
  while (parentArray.value[current] !== current) {
    current = parentArray.value[current];
    path.push(current);
  }
  const root = current;

  operationSteps.value.push(`找到根节点: ${root}`);
  operationSteps.value.push(`路径上的节点: [${path.join(', ')}]`);

  // 路径压缩：将路径上所有节点直接连接到根节点
  for (const pathNode of path) {
    if (pathNode !== root) {
      parentArray.value[pathNode] = root;
      operationSteps.value.push(`将节点 ${pathNode} 直接连接到根节点 ${root}`);
    }
  }

  demoActiveNodes.value = [...path];
  demoStatus.value = {
    type: 'success',
    message: `路径压缩完成，所有节点现在直接连接到根节点 ${root}`
  };
};
</script>

<style lang="less" scoped>
.union-find-container {
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
    background: linear-gradient(135deg, #2c3e50 0%, #6366f1 100%);
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

.content-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.content-section, .sidebar-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .section-tag {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #6366f1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.8rem;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }
}

.structure-details {
  margin-top: 2rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 1.5rem;
  }
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.detail-item {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 1rem;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-top: 1rem;
  }
}

.visual-structure {
  .tree-diagram {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
  }

  .node {
    padding: 0.8rem;
    margin: 0.5rem 0;
    border-radius: 6px;
    background: #f1f5f9;
    font-family: 'Fira Code', monospace;

    &.root {
      background: #dbeafe;
      color: #1e40af;
      font-weight: 600;
    }
  }
}

.optimization-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.optimization-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #10b981;

  h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #047857;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
  }
}

// 演示区域样式
.demo-area {
  .demo-controls {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    .control-group {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      label {
        font-weight: 500;
        color: #475569;
      }

      select, input {
        padding: 0.5rem 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: white;
      }

      .demo-btn {
        padding: 0.5rem 1.5rem;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: #4f46e5;
        }

        &.secondary {
          background: #64748b;

          &:hover {
            background: #475569;
          }
        }
      }
    }
  }
}

.visualization-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.sets-visual {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.set {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .set-header {
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.8rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
}

.set-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.node {
  padding: 0.8rem 1.2rem;
  background: white;
  border: 2px solid #cbd5e1;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &.root {
    background: #dbeafe;
    border-color: #3b82f6;
    color: #1e40af;
  }

  &.active {
    background: #fef3c7;
    border-color: #f59e0b;
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.parent-array {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  h4 {
    font-weight: 600;
    color: #475569;
    margin-bottom: 1rem;
  }
}

.array-visual {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.array-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  background: white;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  transition: all 0.3s ease;

  &.active {
    background: #fef3c7;
    border-color: #f59e0b;
  }

  .index {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.3rem;
  }

  .value {
    font-size: 0.9rem;
    color: #6366f1;
    font-family: 'Fira Code', monospace;
  }
}

.demo-status {
  margin-bottom: 1.5rem;

  .status-message {
    padding: 1rem;
    border-radius: 8px;
    font-weight: 500;

    &.success {
      background: #dcfce7;
      color: #166534;
      border-left: 4px solid #22c55e;
    }

    &.error {
      background: #fef2f2;
      color: #dc2626;
      border-left: 4px solid #ef4444;
    }

    &.info {
      background: #eff6ff;
      color: #1e40af;
      border-left: 4px solid #3b82f6;
    }
  }
}

.operation-steps {
  h4 {
    font-weight: 600;
    color: #475569;
    margin-bottom: 1rem;
  }
}

.steps {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  max-height: 200px;
  overflow-y: auto;
}

.step {
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #6366f1;
  font-size: 0.9rem;
  color: #475569;

  &:last-child {
    margin-bottom: 0;
  }
}

// 使用场景网格
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .scenario-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.8rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

.scenario-code {
  background: #1e293b;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.8rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

// 优缺点样式
.pros-cons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pros, .cons {
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
}

.pros h3 {
  color: #059669;
}

.cons h3 {
  color: #dc2626;
}

.advantage-list, .disadvantage-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.advantage-item, .disadvantage-item {
  background: #f8fafc;
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 4px solid;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
  }
}

.advantage-item {
  border-left-color: #10b981;
}

.disadvantage-item {
  border-left-color: #ef4444;
}

// 复杂度分析
.complexity-analysis {
  .complexity-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }

  .complexity-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid #e2e8f0;

    &:first-child {
      background: #475569;
      color: white;
      font-weight: 600;
    }

    &:last-child {
      border-bottom: none;
    }

    div {
      padding: 1rem;
      text-align: center;
    }

    .op {
      font-weight: 600;
      color: #374151;
      text-align: left;
    }
  }
}

.complexity-notes {
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
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
  }
}

// 相关算法
.related-algorithms {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.algorithm-item {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #6366f1;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    font-size: 0.9rem;
  }
}

// 代码部分
.code-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.code-tabs {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.tab-buttons {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  .tab-button {
    flex: 1;
    padding: 1rem 1.5rem;
    border: none;
    background: transparent;
    color: #64748b;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f1f5f9;
      color: #475569;
    }

    &.active {
      background: white;
      color: #6366f1;
      border-bottom: 2px solid #6366f1;
    }
  }
}

.tab-content {
  padding: 0;
}

.code-block {
  h3 {
    padding: 1.5rem 1.5rem 0.5rem;
    margin: 0;
    font-size: 1.2rem;
    color: #2c3e50;
    font-weight: 600;
  }

  pre {
    margin: 0;
    padding: 1.5rem;
    background: #1e293b;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.5;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .union-find-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .content-layout {
    gap: 1.5rem;
  }

  .content-section, .sidebar-section {
    padding: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .demo-controls {
    flex-direction: column;
    gap: 1rem;

    .control-group {
      width: 100%;
    }
  }

  .visualization-container {
    grid-template-columns: 1fr;
  }

  .array-visual {
    grid-template-columns: repeat(5, 1fr);
  }

  .scenarios-grid {
    grid-template-columns: 1fr;
  }
}
</style>
