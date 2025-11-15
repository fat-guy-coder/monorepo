<template>
  <div class="adjacency-matrix-container">
    <header class="page-header">
      <h1>邻接矩阵详解</h1>
      <p class="subtitle">图论中的基础数据结构</p>
    </header>

    <div class="intro-section">
      <p>邻接矩阵是图论中最基础的数据结构之一，用于表示图中顶点之间的连接关系。它是一个二维矩阵，其中每个元素表示两个顶点之间是否存在边或边的权重。</p>
    </div>

    <div class="content-layout">
      <!-- 左侧内容区域 -->
      <div class="main-content">
        <!-- 特性部分 -->
        <section class="content-section">
          <div class="section-header">
            <h2>邻接矩阵特性</h2>
            <div class="section-tag">基本属性</div>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>空间复杂度</h3>
              <p>O(V²)，其中V是顶点数量。对于稠密图效率较高，但对于稀疏图会浪费大量空间。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>查询效率</h3>
              <p>O(1)时间复杂度检查两个顶点是否相邻，适合频繁查询边存在性的场景。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>存储方式</h3>
              <p>使用二维数组存储，矩阵元素matrix[i][j]表示顶点i到顶点j的边信息。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">🎯</div>
              <h3>适用场景</h3>
              <p>稠密图、需要频繁查询边存在性、图规模不是特别大的情况。</p>
            </div>
          </div>
        </section>

        <!-- 使用场景部分 -->
        <section class="content-section">
          <div class="section-header">
            <h2>使用场景</h2>
            <div class="section-tag">应用领域</div>
          </div>

          <div class="scenarios-container">
            <div class="scenario-item">
              <div class="scenario-header">
                <h3>社交网络分析</h3>
                <span class="scenario-badge">常用</span>
              </div>
              <p>在小型社交网络中，邻接矩阵可以高效表示用户之间的关系（好友/关注）。</p>
              <ul>
                <li>快速查询两个用户是否互相关注</li>
                <li>计算用户的影响力（度中心性）</li>
                <li>检测社交圈子（连通分量）</li>
              </ul>
            </div>

            <div class="scenario-item">
              <div class="scenario-header">
                <h3>路径规划与导航</h3>
                <span class="scenario-badge">高效</span>
              </div>
              <p>在城市道路网络中，邻接矩阵表示交叉路口之间的连接关系和距离。</p>
              <ul>
                <li>Dijkstra算法计算最短路径</li>
                <li>Floyd-Warshall算法计算所有顶点对最短路径</li>
                <li>交通流量分析</li>
              </ul>
            </div>

            <div class="scenario-item">
              <div class="scenario-header">
                <h3>计算机网络</h3>
                <span class="scenario-badge">基础</span>
              </div>
              <p>表示网络拓扑结构，路由器/交换机之间的连接关系。</p>
              <ul>
                <li>网络连通性检测</li>
                <li>路由算法实现</li>
                <li>网络可靠性分析</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <!-- 右侧代码区域 -->
      <div class="code-sidebar">
        <section class="code-section">
          <div class="section-header">
            <h2>代码实现</h2>
            <div class="section-tag">TypeScript</div>
          </div>

          <div class="code-tabs">
            <div class="tab-buttons">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                :class="['tab-button', { active: activeTab === tab.id }]"
                @click="activeTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <!-- 基础实现 -->
              <div v-if="activeTab === 'basic'" class="code-block">
                <h3>邻接矩阵基础实现</h3>
                <pre><code>class AdjacencyMatrix {
  private matrix: number[][];
  private vertexCount: number;
  private isDirected: boolean;

  constructor(vertexCount: number, isDirected: boolean = false) {
    this.vertexCount = vertexCount;
    this.isDirected = isDirected;
    this.matrix = Array(vertexCount)
      .fill(0)
      .map(() => Array(vertexCount).fill(0));
  }

  // 添加边
  addEdge(source: number, destination: number, weight: number = 1): void {
    if (source >= this.vertexCount || destination >= this.vertexCount) {
      throw new Error('顶点索引超出范围');
    }

    this.matrix[source][destination] = weight;

    // 如果是无向图，添加对称边
    if (!this.isDirected) {
      this.matrix[destination][source] = weight;
    }
  }

  // 移除边
  removeEdge(source: number, destination: number): void {
    this.matrix[source][destination] = 0;

    if (!this.isDirected) {
      this.matrix[destination][source] = 0;
    }
  }

  // 检查边是否存在
  hasEdge(source: number, destination: number): boolean {
    return this.matrix[source][destination] !== 0;
  }

  // 获取边的权重
  getEdgeWeight(source: number, destination: number): number {
    return this.matrix[source][destination];
  }

  // 获取邻居顶点
  getNeighbors(vertex: number): number[] {
    const neighbors: number[] = [];
    for (let i = 0; i < this.vertexCount; i++) {
      if (this.matrix[vertex][i] !== 0) {
        neighbors.push(i);
      }
    }
    return neighbors;
  }

  // 打印矩阵
  printMatrix(): void {
    console.log('邻接矩阵:');
    for (let i = 0; i < this.vertexCount; i++) {
      console.log(this.matrix[i].join(' '));
    }
  }
}

// 使用示例
const graph = new AdjacencyMatrix(5, false);
graph.addEdge(0, 1, 1);
graph.addEdge(0, 4, 1);
graph.addEdge(1, 2, 1);
graph.addEdge(1, 3, 1);
graph.addEdge(1, 4, 1);
graph.addEdge(2, 3, 1);
graph.addEdge(3, 4, 1);

console.log('顶点0的邻居:', graph.getNeighbors(0)); // [1, 4]
console.log('边(1,2)存在:', graph.hasEdge(1, 2)); // true
graph.printMatrix();</code></pre>
              </div>

              <!-- 加权图 -->
              <div v-if="activeTab === 'weighted'" class="code-block">
                <h3>加权图邻接矩阵</h3>
                <pre><code>class WeightedAdjacencyMatrix {
  private matrix: (number | null)[][];
  private vertexCount: number;

  constructor(vertexCount: number) {
    this.vertexCount = vertexCount;
    // 使用null表示无边，数字表示权重
    this.matrix = Array(vertexCount)
      .fill(null)
      .map(() => Array(vertexCount).fill(null));
  }

  // 添加带权边
  addWeightedEdge(
    source: number,
    destination: number,
    weight: number
  ): void {
    if (weight <= 0) {
      throw new Error('权重必须为正数');
    }
    this.matrix[source][destination] = weight;
  }

  // 获取最短路径（Dijkstra算法）
  dijkstra(startVertex: number): number[] {
    const distances: number[] = Array(this.vertexCount).fill(Infinity);
    const visited: boolean[] = Array(this.vertexCount).fill(false);

    distances[startVertex] = 0;

    for (let i = 0; i < this.vertexCount - 1; i++) {
      const u = this.minDistanceVertex(distances, visited);
      visited[u] = true;

      for (let v = 0; v < this.vertexCount; v++) {
        const weight = this.matrix[u][v];
        if (!visited[v] &&
            weight !== null &&
            distances[u] !== Infinity &&
            distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
        }
      }
    }

    return distances;
  }

  private minDistanceVertex(
    distances: number[],
    visited: boolean[]
  ): number {
    let min = Infinity;
    let minIndex = -1;

    for (let v = 0; v < this.vertexCount; v++) {
      if (!visited[v] && distances[v] <= min) {
        min = distances[v];
        minIndex = v;
      }
    }

    return minIndex;
  }
}

// 使用示例
const weightedGraph = new WeightedAdjacencyMatrix(4);
weightedGraph.addWeightedEdge(0, 1, 4);
weightedGraph.addWeightedEdge(0, 2, 1);
weightedGraph.addWeightedEdge(2, 1, 2);
weightedGraph.addWeightedEdge(2, 3, 5);
weightedGraph.addWeightedEdge(1, 3, 1);

const distances = weightedGraph.dijkstra(0);
console.log('从顶点0到各顶点的最短距离:', distances);</code></pre>
              </div>

              <!-- 可视化 -->
              <div v-if="activeTab === 'visualization'" class="code-block">
                <h3>邻接矩阵可视化</h3>
                <pre><code>// 可视化邻接矩阵组件
interface GraphVisualizationProps {
  matrix: number[][];
  vertexLabels?: string[];
}

const GraphVisualization: React.FC&lt;GraphVisualizationProps&gt; = ({
  matrix,
  vertexLabels = []
}) => {
  const size = matrix.length;

  // 生成默认顶点标签
  const labels = vertexLabels.length === size
    ? vertexLabels
    : Array(size).fill(0).map((_, i) => `V${i}`);

  return (
    &lt;div className="matrix-visualization"&gt;
      &lt;div className="matrix-grid" &gt;
        {/* 左上角空白 */}
        &lt;div className="corner-cell"&gt;&lt;/div&gt;

        {/* 列标签 */}
        {labels.map((label, i) => (
          &lt;div key={`col-${i}`} className="header-cell"&gt;{label}&lt;/div&gt;
        ))}

        {/* 矩阵内容 */}
        {matrix.map((row, i) => (
          &lt;&gt;
            {/* 行标签 */}
            &lt;div key={`row-label-${i}`} className="header-cell"&gt;
              {labels[i]}
            &lt;/div&gt;

            {/* 矩阵单元格 */}
            {row.map((cell, j) => (
              &lt;div
                key={`cell-${i}-${j}`}
                className={`matrix-cell ${
                  cell !== 0 ? 'active' : 'inactive'
                } ${
                  i === j ? 'self-loop' : ''
                }`}
                title={`${labels[i]} → ${labels[j]}: ${cell}`}
              &gt;
                {cell !== 0 ? cell : '0'}
              &lt;/div&gt;
            ))}
          &lt;/&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// 使用示例
const exampleMatrix = [
  [0, 1, 0, 1],
  [1, 0, 1, 1],
  [0, 1, 0, 1],
  [1, 1, 1, 0]
];

// 在组件中使用
// &lt;GraphVisualization matrix={exampleMatrix} /&gt;</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 对比分析 -->
    <section class="comparison-section">
      <div class="section-header">
        <h2>邻接矩阵 vs 邻接表</h2>
        <div class="section-tag">对比分析</div>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <h3>邻接矩阵</h3>
          <div class="comparison-list">
            <div class="comparison-item positive">
              <span class="icon">✅</span>
              <span>查询边存在性: O(1)</span>
            </div>
            <div class="comparison-item positive">
              <span class="icon">✅</span>
              <span>添加/删除边: O(1)</span>
            </div>
            <div class="comparison-item negative">
              <span class="icon">❌</span>
              <span>空间复杂度: O(V²)</span>
            </div>
            <div class="comparison-item negative">
              <span class="icon">❌</span>
              <span>添加顶点: O(V²)</span>
            </div>
            <div class="comparison-item">
              <span class="icon">📊</span>
              <span>适合稠密图</span>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <h3>邻接表</h3>
          <div class="comparison-list">
            <div class="comparison-item negative">
              <span class="icon">❌</span>
              <span>查询边存在性: O(degree)</span>
            </div>
            <div class="comparison-item positive">
              <span class="icon">✅</span>
              <span>空间复杂度: O(V+E)</span>
            </div>
            <div class="comparison-item positive">
              <span class="icon">✅</span>
              <span>添加顶点: O(1)</span>
            </div>
            <div class="comparison-item">
              <span class="icon">📊</span>
              <span>适合稀疏图</span>
            </div>
            <div class="comparison-item">
              <span class="icon">⚡</span>
              <span>遍历邻居高效</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('basic');

const tabs = [
  { id: 'basic', label: '基础实现' },
  { id: 'weighted', label: '加权图' },
  { id: 'visualization', label: '可视化' }
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.adjacency-matrix-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.intro-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.content-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e8f4f8;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
  }

  .section-tag {
    background: linear-gradient(135deg, #3498db, #2ecc71);
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
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #3498db;

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
    color: #2c3e50;
    margin-bottom: 0.8rem;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }
}

.scenarios-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.scenario-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #2ecc71;

  .scenario-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    .scenario-badge {
      background: #e8f4f8;
      color: #3498db;
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul {
    color: #666;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
}

.code-sidebar {
  .code-section {
    height: fit-content;
    position: sticky;
    top: 2rem;
  }
}

.code-tabs {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.tab-buttons {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;

  .tab-button {
    flex: 1;
    padding: 1rem 1.5rem;
    border: none;
    background: transparent;
    color: #6c757d;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #e9ecef;
      color: #495057;
    }

    &.active {
      background: white;
      color: #3498db;
      border-bottom: 2px solid #3498db;
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
    background: #1e1e1e;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.9rem;
      color: #d4d4d4;
      line-height: 1.5;
    }
  }
}

.comparison-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e8f4f8;
  }
}

.comparison-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparison-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  background: #f8f9fa;

  .icon {
    font-size: 1.2rem;
  }

  &.positive {
    background: #e8f5e8;
    color: #27ae60;
  }

  &.negative {
    background: #fde8e8;
    color: #e74c3c;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .adjacency-matrix-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .content-layout {
    gap: 1.5rem;
  }

  .content-section {
    padding: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tab-buttons {
    flex-direction: column;

    .tab-button {
      text-align: left;
    }
  }
}
</style>
