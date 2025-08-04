<template>
  <div class="graph-algorithms">
    <!-- 标题和概述部分 -->
    <header>
      <h1>图相关算法基础介绍</h1>
      <div class="graph-visualization">
        <div class="graph">
          <div class="node" style="top: 30px; left: 50%;">A</div>
          <div class="node" style="top: 120px; left: 30%;">B</div>
          <div class="node" style="top: 120px; left: 70%;">C</div>
          <div class="node" style="top: 210px; left: 20%;">D</div>
          <div class="node" style="top: 210px; left: 50%;">E</div>
          <div class="node" style="top: 210px; left: 80%;">F</div>

          <!-- 边 -->
          <svg class="edges" width="100%" height="240">
            <line x1="50%" y1="50" x2="30%" y2="120" class="edge"></line>
            <line x1="50%" y1="50" x2="70%" y2="120" class="edge"></line>
            <line x1="30%" y1="120" x2="20%" y2="210" class="edge"></line>
            <line x1="30%" y1="120" x2="50%" y2="210" class="edge"></line>
            <line x1="70%" y1="120" x2="50%" y2="210" class="edge"></line>
            <line x1="70%" y1="120" x2="80%" y2="210" class="edge"></line>
            <line x1="20%" y1="210" x2="80%" y2="210" class="edge weighted" data-weight="8"></line>
            <line x1="50%" y1="210" x2="80%" y2="210" class="edge"></line>
          </svg>
        </div>
      </div>
      <p class="overview">
        图算法是解决图结构问题的核心方法，广泛应用于网络路由、社交分析、物流优化等领域。掌握这些算法对于解决复杂系统问题至关重要。
      </p>
    </header>

    <!-- 算法导航 -->
    <nav class="algorithm-nav">
      <button v-for="(algo, index) in algorithms" :key="index" :class="{ active: activeAlgorithm === index }"
        @click="activeAlgorithm = index">
        {{ algo.name }}
      </button>
    </nav>

    <!-- 算法详情 -->
    <div class="algorithm-details">
      <!-- BFS -->
      <div v-show="activeAlgorithm === 0" class="algorithm-card">
        <div class="card-header">
          <h2>广度优先搜索 (BFS)</h2>
          <div class="algorithm-tags">
            <span class="tag traversal">遍历</span>
            <span class="tag unweighted">未加权图</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>广度优先搜索是一种图遍历算法，从起始节点开始，逐层访问所有相邻节点。它使用队列数据结构来管理访问顺序。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>将起始节点放入队列并标记为已访问</li>
                <li>从队列中取出一个节点</li>
                <li>访问该节点的所有未访问邻接节点，将其标记为已访问并加入队列</li>
                <li>重复步骤2-3直到队列为空</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>社交网络中的好友推荐（寻找N度好友）</li>
                <li>网络爬虫的页面抓取策略</li>
                <li>查找两点间的最短路径（未加权图）</li>
                <li>连通分量检测</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>function bfs(graph: Graph, start: Node): void {
  const queue: Node[] = [start];
  const visited = new Set&lt;Node&gt;([start]);

  while (queue.length > 0) {
    const node = queue.shift()!;
    console.log(node); // 处理当前节点

    for (const neighbor of graph.getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- DFS -->
      <div v-show="activeAlgorithm === 1" class="algorithm-card">
        <div class="card-header">
          <h2>深度优先搜索 (DFS)</h2>
          <div class="algorithm-tags">
            <span class="tag traversal">遍历</span>
            <span class="tag recursion">递归/栈</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>深度优先搜索从起始节点开始，沿着路径尽可能深入访问节点，直到没有未访问的邻居，然后回溯继续探索。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>从起始节点开始访问</li>
                <li>递归访问当前节点的第一个未访问邻接节点</li>
                <li>当没有未访问的邻接节点时回溯</li>
                <li>重复直到所有节点都被访问</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>拓扑排序（有向无环图）</li>
                <li>检测图中的环</li>
                <li>解决迷宫问题</li>
                <li>连通分量检测</li>
                <li>路径查找</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>// 递归实现
function dfsRecursive(
  graph: Graph,
  node: Node,
  visited: Set&lt;Node&gt; = new Set()
): void {
  visited.add(node);
  console.log(node); // 处理当前节点

  for (const neighbor of graph.getNeighbors(node)) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
}

// 迭代实现
function dfsIterative(graph: Graph, start: Node): void {
  const stack: Node[] = [start];
  const visited = new Set&lt;Node&gt;([start]);

  while (stack.length > 0) {
    const node = stack.pop()!;
    console.log(node); // 处理当前节点

    for (const neighbor of graph.getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
      }
    }
  }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Dijkstra -->
      <div v-show="activeAlgorithm === 2" class="algorithm-card">
        <div class="card-header">
          <h2>Dijkstra 最短路径算法</h2>
          <div class="algorithm-tags">
            <span class="tag shortest-path">最短路径</span>
            <span class="tag weighted">加权图</span>
            <span class="tag non-negative">非负权重</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>Dijkstra算法用于在带非负权重的图中查找从单个源点到所有其他节点的最短路径。它使用贪心策略逐步扩展最短路径树。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>初始化距离数组，源点距离为0，其他为无穷大</li>
                <li>创建优先队列（最小堆），加入所有节点</li>
                <li>从队列中取出距离最小的节点</li>
                <li>更新该节点所有邻居的距离（如果找到更短路径）</li>
                <li>重复步骤3-4直到队列为空</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>地图导航系统（如Google Maps）</li>
                <li>网络路由协议（OSPF）</li>
                <li>交通路线规划</li>
                <li>电信网络设计</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>function dijkstra(graph: WeightedGraph, start: Node): Map&lt;Node, number&gt; {
  // 初始化距离映射
  const distances = new Map&lt;Node, number&gt;();
  graph.nodes.forEach(node => distances.set(node, Infinity));
  distances.set(start, 0);

  // 使用优先队列（最小堆）
  const priorityQueue = new PriorityQueue&lt;[Node, number]&gt;(
    (a, b) => a[1] - b[1]
  );
  priorityQueue.enqueue([start, 0]);

  while (!priorityQueue.isEmpty()) {
    const [currentNode] = priorityQueue.dequeue()!;

    for (const [neighbor, weight] of graph.getWeightedNeighbors(currentNode)) {
      const newDistance = distances.get(currentNode)! + weight;

      if (newDistance < distances.get(neighbor)!) {
        distances.set(neighbor, newDistance);
        priorityQueue.enqueue([neighbor, newDistance]);
      }
    }
  }

  return distances;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Bellman-Ford -->
      <div v-show="activeAlgorithm === 3" class="algorithm-card">
        <div class="card-header">
          <h2>Bellman-Ford 算法</h2>
          <div class="algorithm-tags">
            <span class="tag shortest-path">最短路径</span>
            <span class="tag weighted">加权图</span>
            <span class="tag negative-weights">负权重</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>Bellman-Ford算法用于计算带负权重的图中从单个源点到所有其他节点的最短路径。它能够检测负权重环。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>初始化距离数组，源点距离为0，其他为无穷大</li>
                <li>对每条边进行松弛操作（V-1次）</li>
                <li>再次检查所有边，如果还能松弛则存在负权重环</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>金融系统中的套利检测</li>
                <li>网络路由协议（RIP）</li>
                <li>带负权重的路径规划</li>
                <li>经济学中的成本优化</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>function bellmanFord(
  graph: WeightedGraph,
  start: Node
): { distances: Map&lt;Node, number&gt;, hasNegativeCycle: boolean } {
  // 初始化距离映射
  const distances = new Map&lt;Node, number&gt;();
  graph.nodes.forEach(node => distances.set(node, Infinity));
  distances.set(start, 0);

  // 进行V-1轮松弛操作
  for (let i = 0; i < graph.nodes.size - 1; i++) {
    for (const [u, v, weight] of graph.edges) {
      const newDistance = distances.get(u)! + weight;
      if (newDistance < distances.get(v)!) {
        distances.set(v, newDistance);
      }
    }
  }

  // 检查负权重环
  let hasNegativeCycle = false;
  for (const [u, v, weight] of graph.edges) {
    if (distances.get(u)! + weight < distances.get(v)!) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { distances, hasNegativeCycle };
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Floyd-Warshall -->
      <div v-show="activeAlgorithm === 4" class="algorithm-card">
        <div class="card-header">
          <h2>Floyd-Warshall 算法</h2>
          <div class="algorithm-tags">
            <span class="tag shortest-path">所有节点对最短路径</span>
            <span class="tag weighted">加权图</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>Floyd-Warshall算法用于计算图中所有节点对之间的最短路径。它使用动态规划方法，适用于稠密图。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>初始化距离矩阵（直接连接的权重）</li>
                <li>考虑每个节点作为中间节点</li>
                <li>对于每对节点(i, j)，检查是否通过中间节点k有更短路径</li>
                <li>更新距离矩阵</li>
                <li>重复直到考虑所有中间节点</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>社交网络中的最短关系链</li>
                <li>交通网络的中心性分析</li>
                <li>网络路由中的路径计算</li>
                <li>图的直径计算</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>function floydWarshall(graph: WeightedGraph): number[][] {
  const n = graph.nodes.size;
  const dist: number[][] = Array(n).fill(null).map(() => Array(n).fill(Infinity));

  // 初始化距离矩阵
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  for (const [u, v, weight] of graph.edges) {
    dist[u.id][v.id] = weight;
  }

  // 动态规划更新
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Prim -->
      <div v-show="activeAlgorithm === 5" class="algorithm-card">
        <div class="card-header">
          <h2>Prim 最小生成树算法</h2>
          <div class="algorithm-tags">
            <span class="tag mst">最小生成树</span>
            <span class="tag weighted">加权图</span>
            <span class="tag greedy">贪心算法</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>Prim算法用于在连通加权无向图中查找最小生成树（MST）。它从一个节点开始，逐步扩展树直到覆盖所有节点。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>选择任意节点作为起始点</li>
                <li>维护一个优先队列（最小堆），存储连接树和非树节点的边</li>
                <li>取出权重最小的边，将其加入生成树</li>
                <li>将新节点的边加入优先队列</li>
                <li>重复直到覆盖所有节点</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>网络设计（最小成本连接所有节点）</li>
                <li>电路板布线</li>
                <li>聚类分析</li>
                <li>近似算法（如旅行商问题）</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>function prim(graph: WeightedGraph): Edge[] {
  if (graph.nodes.size === 0) return [];

  const mst: Edge[] = [];
  const visited = new Set&lt;Node&gt;();
  const startNode = graph.nodes.values().next().value;
  visited.add(startNode);

  // 优先队列存储边 (weight, from, to)
  const priorityQueue = new PriorityQueue&lt;[number, Node, Node]&gt;(
    (a, b) => a[0] - b[0]
  );

  // 添加起始节点的边
  for (const [neighbor, weight] of graph.getWeightedNeighbors(startNode)) {
    priorityQueue.enqueue([weight, startNode, neighbor]);
  }

  while (visited.size < graph.nodes.size && !priorityQueue.isEmpty()) {
    const [weight, from, to] = priorityQueue.dequeue()!;

    if (visited.has(to)) continue;

    // 添加边到最小生成树
    visited.add(to);
    mst.push({ from, to, weight });

    // 添加新节点的边
    for (const [neighbor, weight] of graph.getWeightedNeighbors(to)) {
      if (!visited.has(neighbor)) {
        priorityQueue.enqueue([weight, to, neighbor]);
      }
    }
  }

  return mst;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Kruskal -->
      <div v-show="activeAlgorithm === 6" class="algorithm-card">
        <div class="card-header">
          <h2>Kruskal 最小生成树算法</h2>
          <div class="algorithm-tags">
            <span class="tag mst">最小生成树</span>
            <span class="tag weighted">加权图</span>
            <span class="tag union-find">并查集</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>Kruskal算法用于在连通加权无向图中查找最小生成树（MST）。它按权重排序所有边，然后逐步添加不形成环的边。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>将所有边按权重升序排序</li>
                <li>初始化并查集数据结构</li>
                <li>遍历每条边（从小到大）</li>
                <li>如果边连接的两个节点不在同一集合，则加入生成树并合并集合</li>
                <li>重复直到生成树有V-1条边</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>网络设计（与Prim类似）</li>
                <li>图像分割</li>
                <li>聚类分析</li>
                <li>地理信息系统（GIS）</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>function kruskal(graph: WeightedGraph): Edge[] {
  const mst: Edge[] = [];
  const edges = [...graph.edges].sort((a, b) => a.weight - b.weight);
  const unionFind = new UnionFind(graph.nodes);

  for (const edge of edges) {
    if (unionFind.find(edge.from) !== unionFind.find(edge.to)) {
      mst.push(edge);
      unionFind.union(edge.from, edge.to);

      // 当生成树有V-1条边时停止
      if (mst.length === graph.nodes.size - 1) break;
    }
  }

  return mst;
}

// 并查集实现
class UnionFind {
  private parent: Map&lt;Node, Node&gt;;
  private rank: Map&lt;Node, number&gt;;

  constructor(nodes: Set&lt;Node&gt;) {
    this.parent = new Map();
    this.rank = new Map();

    for (const node of nodes) {
      this.parent.set(node, node);
      this.rank.set(node, 0);
    }
  }

  find(node: Node): Node {
    if (this.parent.get(node) !== node) {
      this.parent.set(node, this.find(this.parent.get(node)!));
    }
    return this.parent.get(node)!;
  }

  union(node1: Node, node2: Node): void {
    const root1 = this.find(node1);
    const root2 = this.find(node2);

    if (root1 === root2) return;

    const rank1 = this.rank.get(root1)!;
    const rank2 = this.rank.get(root2)!;

    if (rank1 < rank2) {
      this.parent.set(root1, root2);
    } else if (rank1 > rank2) {
      this.parent.set(root2, root1);
    } else {
      this.parent.set(root2, root1);
      this.rank.set(root1, rank1 + 1);
    }
  }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Topological Sort -->
      <div v-show="activeAlgorithm === 7" class="algorithm-card">
        <div class="card-header">
          <h2>拓扑排序</h2>
          <div class="algorithm-tags">
            <span class="tag dag">有向无环图</span>
            <span class="tag ordering">排序</span>
          </div>
        </div>

        <div class="card-content">
          <div class="algorithm-info">
            <div class="info-section">
              <h3>算法介绍</h3>
              <p>拓扑排序用于有向无环图（DAG），对节点进行线性排序，使得对于每条有向边(u, v)，u在排序中都出现在v之前。</p>
            </div>

            <div class="info-section">
              <h3>算法思路</h3>
              <ol>
                <li>计算每个节点的入度</li>
                <li>将入度为0的节点加入队列</li>
                <li>从队列中取出节点并加入排序结果</li>
                <li>减少该节点所有邻居的入度</li>
                <li>如果邻居入度变为0，加入队列</li>
                <li>重复直到队列为空</li>
              </ol>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li>任务调度（如Makefile、任务依赖）</li>
                <li>课程安排（先修课程）</li>
                <li>软件包依赖管理</li>
                <li>数据流处理</li>
              </ul>
            </div>
          </div>

          <div class="code-sample">
            <h3>代码实现</h3>
            <pre><code>function topologicalSort(graph: DirectedGraph): Node[] {
  // 计算入度
  const inDegree = new Map&lt;Node, number&gt;();
  graph.nodes.forEach(node => inDegree.set(node, 0));

  for (const edge of graph.edges) {
    inDegree.set(edge.to, inDegree.get(edge.to)! + 1);
  }

  // 入度为0的节点入队
  const queue: Node[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const result: Node[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    for (const neighbor of graph.getNeighbors(node)) {
      // 减少邻居的入度
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);

      // 如果入度变为0，加入队列
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 检查是否有环
  if (result.length !== graph.nodes.size) {
    throw new Error("图中有环，无法进行拓扑排序");
  }

  return result;
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 算法比较表 -->
    <section class="algorithm-comparison">
      <h2>图算法性能比较</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>算法</th>
              <th>时间复杂度</th>
              <th>空间复杂度</th>
              <th>图类型</th>
              <th>主要应用</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>广度优先搜索 (BFS)</td>
              <td>O(V + E)</td>
              <td>O(V)</td>
              <td>无向/有向</td>
              <td>最短路径（未加权）</td>
            </tr>
            <tr>
              <td>深度优先搜索 (DFS)</td>
              <td>O(V + E)</td>
              <td>O(V)</td>
              <td>无向/有向</td>
              <td>拓扑排序、环检测</td>
            </tr>
            <tr>
              <td>Dijkstra</td>
              <td>O((V + E) log V)</td>
              <td>O(V)</td>
              <td>加权（非负）</td>
              <td>单源最短路径</td>
            </tr>
            <tr>
              <td>Bellman-Ford</td>
              <td>O(VE)</td>
              <td>O(V)</td>
              <td>加权（可负）</td>
              <td>单源最短路径（带负权）</td>
            </tr>
            <tr>
              <td>Floyd-Warshall</td>
              <td>O(V³)</td>
              <td>O(V²)</td>
              <td>加权</td>
              <td>所有节点对最短路径</td>
            </tr>
            <tr>
              <td>Prim</td>
              <td>O(E log V)</td>
              <td>O(V)</td>
              <td>加权无向</td>
              <td>最小生成树</td>
            </tr>
            <tr>
              <td>Kruskal</td>
              <td>O(E log E)</td>
              <td>O(V)</td>
              <td>加权无向</td>
              <td>最小生成树</td>
            </tr>
            <tr>
              <td>拓扑排序</td>
              <td>O(V + E)</td>
              <td>O(V)</td>
              <td>有向无环图</td>
              <td>任务调度</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <footer>
      <p>图算法是解决复杂网络问题的核心工具，掌握这些算法对于开发高效系统至关重要。根据具体问题选择合适的算法可以大大提高系统性能。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 当前激活的算法
const activeAlgorithm = ref(0);

// 算法列表
const algorithms = ref([
  { name: 'BFS' },
  { name: 'DFS' },
  { name: 'Dijkstra' },
  { name: 'Bellman-Ford' },
  { name: 'Floyd-Warshall' },
  { name: 'Prim' },
  { name: 'Kruskal' },
  { name: '拓扑排序' }
]);
</script>

<style scoped lang="less">
@primary-color: #1a6fb0;
@secondary-color: #4a9de3;
@accent-color: #e8f4ff;
@background-color: #f9f9f9;
@card-color: #ffffff;
@text-color: #333333;
@border-color: #e0e0e0;
@success-color: #2ecc71;
@warning-color: #f39c12;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.graph-algorithms {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      color: @primary-color;
      margin-bottom: 25px;
      font-size: 2.5rem;
      position: relative;
      padding-bottom: 15px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 4px;
        background: linear-gradient(90deg, @primary-color, @secondary-color);
        border-radius: 2px;
      }
    }

    .overview {
      max-width: 800px;
      margin: 25px auto;
      padding: 20px;
      background-color: @accent-color;
      border-radius: 12px;
      font-size: 1.1rem;
      text-align: center;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    }
  }

  .graph-visualization {
    display: flex;
    justify-content: center;
    margin: 30px 0;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .graph {
      position: relative;
      width: 100%;
      height: 240px;

      .node {
        position: absolute;
        background-color: @secondary-color;
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        z-index: 10;
      }

      .edges {
        position: absolute;
        top: 0;
        left: 0;

        .edge {
          stroke: #777;
          stroke-width: 2;
          stroke-linecap: round;
          marker-end: none;

          &.weighted {
            stroke-dasharray: 5, 5;
          }
        }
      }
    }
  }

  .algorithm-nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 30px 0;

    button {
      padding: 12px 24px;
      background-color: #e0edf8;
      border: none;
      border-radius: 30px;
      color: @primary-color;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: #c5e1fa;
        transform: translateY(-2px);
      }

      &.active {
        background-color: @primary-color;
        color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
  }

  .algorithm-details {
    margin: 30px 0;
  }

  .algorithm-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    margin-bottom: 30px;

    .card-header {
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      padding: 25px;
      color: white;

      h2 {
        margin-bottom: 10px;
        font-size: 1.8rem;
      }

      .algorithm-tags {
        display: flex;
        gap: 10px;
        margin-top: 15px;

        .tag {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.2);

          &.traversal {
            background: rgba(46, 204, 113, 0.3);
          }

          &.unweighted {
            background: rgba(52, 152, 219, 0.3);
          }

          &.recursion {
            background: rgba(155, 89, 182, 0.3);
          }

          &.shortest-path {
            background: rgba(231, 76, 60, 0.3);
          }

          &.weighted {
            background: rgba(241, 196, 15, 0.3);
          }

          &.non-negative {
            background: rgba(39, 174, 96, 0.3);
          }

          &.negative-weights {
            background: rgba(142, 68, 173, 0.3);
          }

          &.mst {
            background: rgba(230, 126, 34, 0.3);
          }

          &.greedy {
            background: rgba(41, 128, 185, 0.3);
          }

          &.union-find {
            background: rgba(211, 84, 0, 0.3);
          }

          &.dag {
            background: rgba(44, 62, 80, 0.3);
          }

          &.ordering {
            background: rgba(127, 140, 141, 0.3);
          }
        }
      }
    }

    .card-content {
      display: flex;
      flex-wrap: wrap;
      padding: 25px;

      .algorithm-info {
        flex: 1;
        min-width: 300px;
        padding-right: 30px;

        .info-section {
          margin-bottom: 25px;

          h3 {
            color: @primary-color;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid @border-color;
            font-size: 1.3rem;
          }

          p {
            margin-bottom: 15px;
            line-height: 1.7;
          }

          ol,
          ul {
            padding-left: 25px;

            li {
              margin-bottom: 10px;
              line-height: 1.6;
            }
          }
        }
      }

      .code-sample {
        flex: 1;
        min-width: 300px;

        h3 {
          color: @primary-color;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        pre {
          background: #2d2d2d;
          border-radius: 10px;
          padding: 20px;
          overflow-x: auto;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

          code {
            color: #f8f8f2;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.95rem;
            line-height: 1.5;

            .comment {
              color: #75715e;
            }

            .keyword {
              color: #f92672;
            }

            .function {
              color: #66d9ef;
            }

            .string {
              color: #a6e22e;
            }

            .number {
              color: #ae81ff;
            }
          }
        }
      }
    }
  }

  .algorithm-comparison {
    margin: 50px 0 30px;

    h2 {
      color: @primary-color;
      text-align: center;
      margin-bottom: 25px;
      font-size: 1.8rem;
    }

    .comparison-table {
      background: white;
      border-radius: 15px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 15px 20px;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        th {
          background-color: @primary-color;
          color: white;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background-color: fade(@accent-color, 30%);
        }

        tr:hover {
          background-color: fade(@accent-color, 40%);
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    padding: 25px;
    background-color: @accent-color;
    border-radius: 12px;
    text-align: center;
    font-size: 1.1rem;
    border-top: 2px solid @border-color;
    color: darken(@primary-color, 15%);
  }
}

@media (max-width: 900px) {
  .algorithm-card .card-content {
    flex-direction: column;

    .algorithm-info {
      padding-right: 0;
      margin-bottom: 30px;
    }
  }
}

@media (max-width: 768px) {
  .graph-algorithms {
    padding: 15px;

    header h1 {
      font-size: 2rem;
    }

    .graph-visualization {
      padding: 10px;

      .graph {
        height: 200px;

        .node {
          width: 40px;
          height: 40px;
          font-size: 1rem;
        }
      }
    }

    .algorithm-nav button {
      padding: 10px 18px;
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .algorithm-comparison {
    overflow-x: auto;

    .comparison-table {
      min-width: 600px;
    }
  }
}
</style>
