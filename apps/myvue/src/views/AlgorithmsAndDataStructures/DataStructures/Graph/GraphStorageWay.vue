<template>
  <div class="graph-storage-container">
    <header class="page-header">
      <h1>图的存储结构详解</h1>
      <p class="subtitle">四种经典存储方式对比分析</p>
    </header>

    <div class="intro-section">
      <p>图是一种重要的非线性数据结构，由顶点的有穷非空集合和顶点之间边的集合组成。选择合适的存储结构对图算法的效率至关重要。本文将详细介绍四种经典的图存储方式。</p>
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
      <!-- 邻接矩阵 -->
      <section v-if="activeTab === 'matrix'" class="storage-section">
        <div class="section-header">
          <h2>邻接矩阵</h2>
          <div class="complexity-tag">
            <span>空间: O(V²)</span>
            <span>查询: O(1)</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>使用二维数组表示图中顶点之间的相邻关系。对于具有n个顶点的图，使用n×n的矩阵，其中matrix[i][j]表示顶点i到顶点j的边信息。</p>
            </div>

            <div class="features-list">
              <h3>核心特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">⚡</div>
                  <h4>快速查询</h4>
                  <p>可以在O(1)时间内判断任意两个顶点是否相邻</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">💾</div>
                  <h4>空间效率</h4>
                  <p>空间复杂度为O(V²)，适合稠密图存储</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🔄</div>
                  <h4>对称性</h4>
                  <p>无向图的邻接矩阵是对称矩阵</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>适用场景</h4>
                  <p>稠密图、需要频繁查询边存在性的场景</p>
                </div>
              </div>
            </div>

            <div class="implementation-example">
              <h3>实现示例</h3>
              <div class="example-visualization">
                <div class="graph-display">
                  <div class="vertices">
                    <div v-for="v in matrixExample.vertices" :key="v" class="vertex">
                      V{{ v }}
                    </div>
                  </div>
                  <div class="matrix-table">
                    <div class="matrix-header">
                      <div class="corner-cell"></div>
                      <div v-for="v in matrixExample.vertices" :key="v" class="header-cell">
                        V{{ v }}
                      </div>
                    </div>
                    <div v-for="(row, i) in matrixExample.matrix" :key="i" class="matrix-row">
                      <div class="header-cell">V{{ i }}</div>
                      <div
                        v-for="(cell, j) in row"
                        :key="j"
                        :class="['matrix-cell', { active: cell === 1, diagonal: i === j }]"
                      >
                        {{ cell }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="code-content">
            <h3>代码实现</h3>
            <div class="code-block">
              <pre><code>class AdjacencyMatrix {
  private matrix: number[][];
  private size: number;

  constructor(vertexCount: number) {
    this.size = vertexCount;
    this.matrix = Array(vertexCount)
      .fill(0)
      .map(() => Array(vertexCount).fill(0));
  }

  addEdge(i: number, j: number, weight: number = 1): void {
    if (i >= this.size || j >= this.size) return;
    this.matrix[i][j] = weight;
    // 无向图需要对称设置
    this.matrix[j][i] = weight;
  }

  removeEdge(i: number, j: number): void {
    this.matrix[i][j] = 0;
    this.matrix[j][i] = 0;
  }

  hasEdge(i: number, j: number): boolean {
    return this.matrix[i][j] !== 0;
  }

  getNeighbors(vertex: number): number[] {
    return this.matrix[vertex]
      .map((weight, index) => weight !== 0 ? index : -1)
      .filter(index => index !== -1);
  }

  printMatrix(): void {
    console.log('邻接矩阵:');
    for (let i = 0; i < this.size; i++) {
      console.log(this.matrix[i].join(' '));
    }
  }
}

// 使用示例
const graph = new AdjacencyMatrix(4);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 3);
graph.printMatrix();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 邻接链表 -->
      <section v-if="activeTab === 'list'" class="storage-section">
        <div class="section-header">
          <h2>邻接链表</h2>
          <div class="complexity-tag">
            <span>空间: O(V+E)</span>
            <span>查询: O(degree)</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>为每个顶点维护一个链表，存储所有与该顶点相邻的顶点。通常使用数组或哈希表来存储这些链表。</p>
            </div>

            <div class="features-list">
              <h3>核心特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">💾</div>
                  <h4>空间高效</h4>
                  <p>空间复杂度为O(V+E)，适合稀疏图存储</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🚀</div>
                  <h4>遍历优化</h4>
                  <p>遍历某个顶点的所有邻居非常高效</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">⚡</div>
                  <h4>动态扩展</h4>
                  <p>添加新顶点和边相对容易</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>适用场景</h4>
                  <p>稀疏图、需要频繁遍历邻居的场景</p>
                </div>
              </div>
            </div>

            <div class="implementation-example">
              <h3>实现示例</h3>
              <div class="example-visualization">
                <div class="adjacency-list-visual">
                  <div v-for="(list, vertex) in listExample" :key="vertex" class="list-row">
                    <div class="vertex-label">V{{ vertex }} →</div>
                    <div class="neighbors-list">
                      <span v-for="neighbor in list" :key="neighbor" class="neighbor-item">
                        V{{ neighbor }}
                      </span>
                      <span class="list-end">null</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="code-content">
            <h3>代码实现</h3>
            <div class="code-block">
              <pre><code>class GraphNode {
  constructor(public vertex: number, public next: GraphNode | null = null) {}
}

class AdjacencyList {
  private lists: GraphNode[];
  private size: number;

  constructor(vertexCount: number) {
    this.size = vertexCount;
    this.lists = Array(vertexCount).fill(null);
  }

  addEdge(src: number, dest: number): void {
    // 添加到源顶点的链表头部
    const newNode = new GraphNode(dest, this.lists[src]);
    this.lists[src] = newNode;

    // 无向图需要双向添加
    const reverseNode = new GraphNode(src, this.lists[dest]);
    this.lists[dest] = reverseNode;
  }

  hasEdge(src: number, dest: number): boolean {
    let current = this.lists[src];
    while (current) {
      if (current.vertex === dest) return true;
      current = current.next;
    }
    return false;
  }

  getNeighbors(vertex: number): number[] {
    const neighbors: number[] = [];
    let current = this.lists[vertex];
    while (current) {
      neighbors.push(current.vertex);
      current = current.next;
    }
    return neighbors;
  }

  printList(): void {
    console.log('邻接表:');
    for (let i = 0; i < this.size; i++) {
      let listStr = `V${i}: `;
      let current = this.lists[i];
      while (current) {
        listStr += `V${current.vertex} -> `;
        current = current.next;
      }
      listStr += 'null';
      console.log(listStr);
    }
  }
}

// 使用示例
const listGraph = new AdjacencyList(4);
listGraph.addEdge(0, 1);
listGraph.addEdge(0, 2);
listGraph.addEdge(1, 3);
listGraph.addEdge(2, 3);
listGraph.printList();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 十字链表 -->
      <section v-if="activeTab === 'orthogonal'" class="storage-section">
        <div class="section-header">
          <h2>十字链表</h2>
          <div class="complexity-tag">
            <span>空间: O(V+E)</span>
            <span>查询: O(degree)</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>针对有向图的优化存储结构，结合了邻接表和逆邻接表的优点。每个边节点同时出现在出边链表和入边链表中。</p>
            </div>

            <div class="features-list">
              <h3>核心特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>有向图优化</h4>
                  <p>专门为有向图设计的高效存储结构</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🔄</div>
                  <h4>双向链接</h4>
                  <p>同时维护顶点的出边和入边信息</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">⚡</div>
                  <h4>高效遍历</h4>
                  <p>方便查找顶点的前驱和后继</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">💡</div>
                  <h4>适用场景</h4>
                  <p>有向图、需要频繁查询入边和出边的场景</p>
                </div>
              </div>
            </div>

            <div class="implementation-example">
              <h3>结构示意</h3>
              <div class="example-visualization">
                <div class="orthogonal-visual">
                  <div class="vertex-section">
                    <h4>顶点数组</h4>
                    <div class="vertices">
                      <div v-for="v in orthogonalExample.vertices" :key="v.id" class="vertex-node">
                        <div class="vertex-header">V{{ v.id }}</div>
                        <div class="edge-pointers">
                          <div>出边: {{ v.firstOut }}</div>
                          <div>入边: {{ v.firstIn }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="edge-section">
                    <h4>边节点</h4>
                    <div class="edges">
                      <div v-for="edge in orthogonalExample.edges" :key="edge.id" class="edge-node">
                        <div class="edge-info">
                          <div>尾: V{{ edge.tail }}</div>
                          <div>头: V{{ edge.head }}</div>
                        </div>
                        <div class="edge-pointers">
                          <div>同尾: {{ edge.tlink }}</div>
                          <div>同头: {{ edge.hlink }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="code-content">
            <h3>代码实现</h3>
            <div class="code-block">
              <pre><code>// 边节点定义
class OrthogonalEdge {
  constructor(
    public tail: number,
    public head: number,
    public tlink: OrthogonalEdge | null = null, // 同尾指针
    public hlink: OrthogonalEdge | null = null  // 同头指针
  ) {}
}

// 顶点节点定义
class OrthogonalVertex {
  constructor(
    public data: any,
    public firstIn: OrthogonalEdge | null = null,  // 入边表头指针
    public firstOut: OrthogonalEdge | null = null  // 出边表头指针
  ) {}
}

class OrthogonalList {
  private vertices: OrthogonalVertex[];

  constructor(vertexCount: number) {
    this.vertices = Array(vertexCount)
      .fill(null)
      .map((_, i) => new OrthogonalVertex(`V${i}`));
  }

  addEdge(tail: number, head: number): void {
    const newEdge = new OrthogonalEdge(tail, head);

    // 添加到尾顶点的出边链表
    newEdge.tlink = this.vertices[tail].firstOut;
    this.vertices[tail].firstOut = newEdge;

    // 添加到头顶点的入边链表
    newEdge.hlink = this.vertices[head].firstIn;
    this.vertices[head].firstIn = newEdge;
  }

  // 获取顶点的所有出边（后继）
  getOutEdges(vertex: number): number[] {
    const outEdges: number[] = [];
    let current = this.vertices[vertex].firstOut;
    while (current) {
      outEdges.push(current.head);
      current = current.tlink;
    }
    return outEdges;
  }

  // 获取顶点的所有入边（前驱）
  getInEdges(vertex: number): number[] {
    const inEdges: number[] = [];
    let current = this.vertices[vertex].firstIn;
    while (current) {
      inEdges.push(current.tail);
      current = current.hlink;
    }
    return inEdges;
  }

  printStructure(): void {
    console.log('十字链表结构:');
    for (let i = 0; i < this.vertices.length; i++) {
      console.log(`顶点 V${i}:`);

      let outStr = '出边: ';
      let currentOut = this.vertices[i].firstOut;
      while (currentOut) {
        outStr += `→ V${currentOut.head} `;
        currentOut = currentOut.tlink;
      }
      console.log(outStr);

      let inStr = '入边: ';
      let currentIn = this.vertices[i].firstIn;
      while (currentIn) {
        inStr += `← V${currentIn.tail} `;
        currentIn = currentIn.hlink;
      }
      console.log(inStr);
    }
  }
}

// 使用示例
const orthGraph = new OrthogonalList(4);
orthGraph.addEdge(0, 1);
orthGraph.addEdge(0, 2);
orthGraph.addEdge(1, 3);
orthGraph.addEdge(2, 3);
orthGraph.printStructure();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 邻接多重表 -->
      <section v-if="activeTab === 'multilist'" class="storage-section">
        <div class="section-header">
          <h2>邻接多重表</h2>
          <div class="complexity-tag">
            <span>空间: O(V+E)</span>
            <span>查询: O(degree)</span>
          </div>
        </div>

        <div class="content-grid">
          <div class="description-content">
            <div class="concept-box">
              <h3>基本概念</h3>
              <p>主要用于无向图的存储，每条边只用一个边节点表示，避免邻接表中边被存储两次的问题。</p>
            </div>

            <div class="features-list">
              <h3>核心特性</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">🔄</div>
                  <h4>边共享</h4>
                  <p>每条边只存储一次，节省空间</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <h4>无向图优化</h4>
                  <p>专门为无向图设计的存储结构</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">⚡</div>
                  <h4>删除高效</h4>
                  <p>删除边操作比邻接表更高效</p>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">💡</div>
                  <h4>适用场景</h4>
                  <p>无向图、需要频繁删除边的场景</p>
                </div>
              </div>
            </div>

            <div class="implementation-example">
              <h3>结构示意</h3>
              <div class="example-visualization">
                <div class="multilist-visual">
                  <div class="vertex-section">
                    <h4>顶点数组</h4>
                    <div class="vertices">
                      <div v-for="v in multilistExample.vertices" :key="v.id" class="vertex-node">
                        <div class="vertex-header">V{{ v.id }}</div>
                        <div class="edge-pointer">第一条边: {{ v.firstEdge }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="edge-section">
                    <h4>边节点</h4>
                    <div class="edges">
                      <div v-for="edge in multilistExample.edges" :key="edge.id" class="edge-node">
                        <div class="edge-vertices">
                          <div>顶点: V{{ edge.vertexA }}, V{{ edge.vertexB }}</div>
                        </div>
                        <div class="edge-links">
                          <div>链接A: {{ edge.linkA }}</div>
                          <div>链接B: {{ edge.linkB }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="code-content">
            <h3>代码实现</h3>
            <div class="code-block">
              <pre><code>// 边节点定义
class MultiListEdge {
  constructor(
    public vertexA: number,
    public vertexB: number,
    public linkA: MultiListEdge | null = null, // 链接顶点A的下一条边
    public linkB: MultiListEdge | null = null  // 链接顶点B的下一条边
  ) {}
}

class AdjacencyMultiList {
  private vertices: MultiListEdge[];

  constructor(vertexCount: number) {
    this.vertices = Array(vertexCount).fill(null);
  }

  addEdge(vertexA: number, vertexB: number): void {
    const newEdge = new MultiListEdge(vertexA, vertexB);

    // 链接到顶点A的边链表
    newEdge.linkA = this.vertices[vertexA];
    this.vertices[vertexA] = newEdge;

    // 链接到顶点B的边链表
    newEdge.linkB = this.vertices[vertexB];
    this.vertices[vertexB] = newEdge;
  }

  // 删除边
  removeEdge(vertexA: number, vertexB: number): void {
    // 从顶点A的链表中移除
    let prevA: MultiListEdge | null = null;
    let currentA = this.vertices[vertexA];
    while (currentA) {
      if ((currentA.vertexA === vertexA && currentA.vertexB === vertexB) ||
          (currentA.vertexA === vertexB && currentA.vertexB === vertexA)) {
        if (prevA === null) {
          this.vertices[vertexA] = currentA.linkA;
        } else {
          prevA.linkA = currentA.linkA;
        }
        break;
      }
      prevA = currentA;
      currentA = currentA.linkA;
    }

    // 从顶点B的链表中移除
    let prevB: MultiListEdge | null = null;
    let currentB = this.vertices[vertexB];
    while (currentB) {
      if ((currentB.vertexA === vertexA && currentB.vertexB === vertexB) ||
          (currentB.vertexA === vertexB && currentB.vertexB === vertexA)) {
        if (prevB === null) {
          this.vertices[vertexB] = currentB.linkB;
        } else {
          prevB.linkB = currentB.linkB;
        }
        break;
      }
      prevB = currentB;
      currentB = currentB.linkB;
    }
  }

  getEdges(vertex: number): number[] {
    const edges: number[] = [];
    let current = this.vertices[vertex];
    while (current) {
      const otherVertex = current.vertexA === vertex ? current.vertexB : current.vertexA;
      edges.push(otherVertex);
      current = current.vertexA === vertex ? current.linkA : current.linkB;
    }
    return edges;
  }

  printStructure(): void {
    console.log('邻接多重表结构:');
    for (let i = 0; i < this.vertices.length; i++) {
      let edgeStr = `顶点 V${i} 的边: `;
      let current = this.vertices[i];
      while (current) {
        const otherVertex = current.vertexA === i ? current.vertexB : current.vertexA;
        edgeStr += `(V${i}-V${otherVertex}) → `;
        current = current.vertexA === i ? current.linkA : current.linkB;
      }
      edgeStr += 'null';
      console.log(edgeStr);
    }
  }
}

// 使用示例
const multiGraph = new AdjacencyMultiList(4);
multiGraph.addEdge(0, 1);
multiGraph.addEdge(0, 2);
multiGraph.addEdge(1, 3);
multiGraph.addEdge(2, 3);
multiGraph.printStructure();</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 对比总结 -->
    <section class="comparison-section">
      <div class="section-header">
        <h2>存储方式对比总结</h2>
      </div>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>存储方式</th>
              <th>空间复杂度</th>
              <th>查询边</th>
              <th>添加边</th>
              <th>删除边</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>邻接矩阵</strong></td>
              <td>O(V²)</td>
              <td>O(1)</td>
              <td>O(1)</td>
              <td>O(1)</td>
              <td>稠密图、频繁查询</td>
            </tr>
            <tr>
              <td><strong>邻接链表</strong></td>
              <td>O(V+E)</td>
              <td>O(degree)</td>
              <td>O(1)</td>
              <td>O(degree)</td>
              <td>稀疏图、遍历邻居</td>
            </tr>
            <tr>
              <td><strong>十字链表</strong></td>
              <td>O(V+E)</td>
              <td>O(degree)</td>
              <td>O(1)</td>
              <td>O(degree)</td>
              <td>有向图、双向查询</td>
            </tr>
            <tr>
              <td><strong>邻接多重表</strong></td>
              <td>O(V+E)</td>
              <td>O(degree)</td>
              <td>O(1)</td>
              <td>O(degree)</td>
              <td>无向图、删除操作</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('matrix');

const tabs = [
  { id: 'matrix', label: '邻接矩阵', icon: '📊' },
  { id: 'list', label: '邻接链表', icon: '🔗' },
  { id: 'orthogonal', label: '十字链表', icon: '➕' },
  { id: 'multilist', label: '邻接多重表', icon: '🔄' }
];

// 示例数据
const matrixExample = {
  vertices: [0, 1, 2, 3],
  matrix: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
  ]
};

const listExample = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3],
  3: [1, 2]
};

const orthogonalExample = {
  vertices: [
    { id: 0, firstOut: 1, firstIn: null },
    { id: 1, firstOut: 3, firstIn: 1 },
    { id: 2, firstOut: 3, firstIn: 2 },
    { id: 3, firstOut: null, firstIn: 3 }
  ],
  edges: [
    { id: 1, tail: 0, head: 1, tlink: 2, hlink: null },
    { id: 2, tail: 0, head: 2, tlink: null, hlink: null },
    { id: 3, tail: 1, head: 3, tlink: null, hlink: null }
  ]
};

const multilistExample = {
  vertices: [
    { id: 0, firstEdge: 1 },
    { id: 1, firstEdge: 1 },
    { id: 2, firstEdge: 2 },
    { id: 3, firstEdge: 3 }
  ],
  edges: [
    { id: 1, vertexA: 0, vertexB: 1, linkA: 2, linkB: null },
    { id: 2, vertexA: 0, vertexB: 2, linkA: null, linkB: null },
    { id: 3, vertexA: 1, vertexB: 3, linkA: null, linkB: null }
  ]
};
</script>

<style lang="less" scoped>

.graph-storage-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2c3e50 0%, #6c757d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #6c757d;
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
  color: #495057;
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
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    border-color: #adb5bd;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background: white;
    border-color: #495057;
    color: #495057;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .tab-icon {
    font-size: 1.4rem;
  }
}

.storage-section {
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
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #495057;
    margin: 0;
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
      color: #495057;
      border: 1px solid #dee2e6;
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
    color: #495057;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e9ecef;
  }
}

.concept-box {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #6c757d;
  margin-bottom: 2rem;

  p {
    color: #495057;
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
  border: 1px solid #e9ecef;

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
    line-height: 1.5;
    margin: 0;
    font-size: 0.95rem;
  }
}

.implementation-example {
  margin-top: 2rem;

  .example-visualization {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e9ecef;
  }
}

// 邻接矩阵可视化
.matrix-table {
  display: grid;
  grid-template-columns: auto repeat(4, 1fr);
  gap: 1px;
  background: #dee2e6;
  border: 1px solid #dee2e6;

  .matrix-header, .matrix-row {
    display: contents;
  }

  .header-cell, .matrix-cell {
    background: white;
    padding: 1rem;
    text-align: center;
    font-weight: 500;
  }

  .header-cell {
    background: #e9ecef;
    font-weight: 600;
  }

  .corner-cell {
    background: #e9ecef;
  }

  .matrix-cell.active {
    background: #d1e7dd;
    color: #0f5132;
    font-weight: 600;
  }

  .matrix-cell.diagonal {
    background: #f8d7da;
    color: #721c24;
  }
}

// 邻接表可视化
.adjacency-list-visual {
  .list-row {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-bottom: 1px solid #e9ecef;

    &:last-child {
      border-bottom: none;
    }
  }

  .vertex-label {
    font-weight: 600;
    color: #495057;
    min-width: 60px;
  }

  .neighbors-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .neighbor-item {
    background: #d1e7dd;
    color: #0f5132;
    padding: 0.3rem 0.8rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .list-end {
    color: #6c757d;
    font-style: italic;
  }
}

// 十字链表和多重表可视化
.orthogonal-visual,
.multilist-visual {
  .vertex-section,
  .edge-section {
    margin-bottom: 1.5rem;

    h4 {
      font-size: 1.1rem;
      color: #495057;
      margin-bottom: 1rem;
    }
  }

  .vertices,
  .edges {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .vertex-node,
  .edge-node {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 1rem;

    .vertex-header,
    .edge-vertices {
      font-weight: 600;
      color: #495057;
      margin-bottom: 0.5rem;
    }

    .edge-pointers,
    .edge-links {
      font-size: 0.9rem;
      color: #6c757d;
    }
  }
}

.code-content {
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e9ecef;
  }
}

.code-block {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 1.5rem;
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .section-header {
    background: none;
    padding: 0 0 1.5rem;

    h2 {
      font-size: 2rem;
      color: #495057;
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
      border-bottom: 1px solid #e9ecef;
    }

    th {
      background: #495057;
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }

    tr:hover {
      background: #f8f9fa;
    }

    td:first-child {
      font-weight: 600;
      color: #495057;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .graph-storage-container {
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

    .complexity-tag {
      width: 100%;
      justify-content: flex-start;
    }
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 0.9rem;

    th, td {
      padding: 0.8rem 1rem;
    }
  }
}
</style>
