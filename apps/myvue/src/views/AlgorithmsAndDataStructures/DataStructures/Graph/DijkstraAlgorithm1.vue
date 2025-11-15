<template>
  <div class="dijkstra-container">
    <header class="page-header">
      <h1 class="title">Dijkstra算法详解</h1>
      <p class="subtitle">单源最短路径问题的经典解决方案</p>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="card">
          <h2 class="card-title">算法简介</h2>
          <p class="card-content">
            Dijkstra算法由荷兰计算机科学家艾兹赫尔·戴克斯特拉于1956年提出，是一种用于在加权图中查找单源最短路径的贪心算法。
          </p>
        </div>
      </section>

      <div class="two-column">
        <section class="algorithm-section">
          <div class="card">
            <h2 class="card-title">算法思路</h2>
            <div class="card-content">
              <ol class="step-list">
                <li class="step-item">
                  <span class="step-number">1</span>
                  <div class="step-content">
                    <strong>初始化</strong>
                    <p>设置起始点的距离为0，其他所有点的距离为无穷大</p>
                  </div>
                </li>
                <li class="step-item">
                  <span class="step-number">2</span>
                  <div class="step-content">
                    <strong>选择最近节点</strong>
                    <p>从未处理的节点中选择距离最小的节点</p>
                  </div>
                </li>
                <li class="step-item">
                  <span class="step-number">3</span>
                  <div class="step-content">
                    <strong>更新邻居距离</strong>
                    <p>更新当前节点所有邻居节点的最短距离</p>
                  </div>
                </li>
                <li class="step-item">
                  <span class="step-number">4</span>
                  <div class="step-content">
                    <strong>标记已处理</strong>
                    <p>将当前节点标记为已处理，不再访问</p>
                  </div>
                </li>
                <li class="step-item">
                  <span class="step-number">5</span>
                  <div class="step-content">
                    <strong>重复执行</strong>
                    <p>重复步骤2-4，直到所有节点都被处理</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section class="implementation-section">
          <div class="card">
            <h2 class="card-title">算法实现</h2>
            <div class="card-content">
              <pre class="code-block"><code>function dijkstra(graph: number[][], start: number): number[] {
  const n = graph.length;
  const dist: number[] = new Array(n).fill(Infinity);
  const visited: boolean[] = new Array(n).fill(false);

  dist[start] = 0;

  for (let i = 0; i < n - 1; i++) {
    // 找到未访问的最小距离节点
    let minDist = Infinity;
    let minIndex = -1;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && dist[j] < minDist) {
        minDist = dist[j];
        minIndex = j;
      }
    }

    if (minIndex === -1) break;
    visited[minIndex] = true;

    // 更新邻居距离
    for (let j = 0; j < n; j++) {
      if (!visited[j] &&
          graph[minIndex][j] !== 0 &&
          dist[minIndex] + graph[minIndex][j] < dist[j]) {
        dist[j] = dist[minIndex] + graph[minIndex][j];
      }
    }
  }

  return dist;
}</code></pre>
            </div>
          </div>
        </section>
      </div>

      <section class="application-section">
        <div class="card">
          <h2 class="card-title">适用场景</h2>
          <div class="card-content">
            <div class="scenario-grid">
              <div class="scenario-item">
                <div class="scenario-icon">🗺️</div>
                <h3>路径规划</h3>
                <p>地图导航系统的最短路径计算</p>
              </div>
              <div class="scenario-item">
                <div class="scenario-icon">🌐</div>
                <h3>网络路由</h3>
                <p>计算机网络中的数据包转发路径选择</p>
              </div>
              <div class="scenario-item">
                <div class="scenario-icon">🚚</div>
                <h3>物流配送</h3>
                <p>货物运输的最优路径规划</p>
              </div>
              <div class="scenario-item">
                <div class="scenario-icon">⚡</div>
                <h3>电力网络</h3>
                <p>电网中的最优电力传输路径</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pros-cons-section">
        <div class="card">
          <h2 class="card-title">优缺点分析</h2>
          <div class="card-content">
            <div class="comparison-grid">
              <div class="pros">
                <h3 class="pros-title">优点</h3>
                <ul class="feature-list">
                  <li class="feature-item positive">
                    <span class="feature-icon">✓</span>
                    <div class="feature-content">
                      <strong>效率较高</strong>
                      <p>在稠密图中表现良好，时间复杂度O(V²)</p>
                    </div>
                  </li>
                  <li class="feature-item positive">
                    <span class="feature-icon">✓</span>
                    <div class="feature-content">
                      <strong>结果准确</strong>
                      <p>保证找到单源最短路径</p>
                    </div>
                  </li>
                  <li class="feature-item positive">
                    <span class="feature-icon">✓</span>
                    <div class="feature-content">
                      <strong>实现简单</strong>
                      <p>算法逻辑清晰，易于理解和实现</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="cons">
                <h3 class="cons-title">缺点</h3>
                <ul class="feature-list">
                  <li class="feature-item negative">
                    <span class="feature-icon">✗</span>
                    <div class="feature-content">
                      <strong>负权边限制</strong>
                      <p>不能处理包含负权边的图</p>
                    </div>
                  </li>
                  <li class="feature-item negative">
                    <span class="feature-icon">✗</span>
                    <div class="feature-content">
                      <strong>稀疏图效率</strong>
                      <p>在稀疏图中效率不如其他算法</p>
                    </div>
                  </li>
                  <li class="feature-item negative">
                    <span class="feature-icon">✗</span>
                    <div class="feature-content">
                      <strong>内存消耗</strong>
                      <p>需要存储整个图的邻接矩阵</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加响应式数据或方法，但根据要求主要展示静态内容
</script>

<style lang="less" scoped>
.dijkstra-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px 0;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0;
    font-weight: 300;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e9ecef;
  }

  .card-content {
    color: #555;
  }
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.step-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.step-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  &:last-child {
    margin-bottom: 0;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    font-weight: 600;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    strong {
      display: block;
      font-size: 1.1rem;
      color: #2c3e50;
      margin-bottom: 4px;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.95rem;
    }
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;

  code {
    display: block;
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.scenario-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros, .cons {
  .pros-title, .cons-title {
    font-size: 1.3rem;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid;
  }

  .pros-title {
    color: #27ae60;
    border-bottom-color: #27ae60;
  }

  .cons-title {
    color: #e74c3c;
    border-bottom-color: #e74c3c;
  }
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  &.positive {
    background: rgba(39, 174, 96, 0.1);
    border-left: 4px solid #27ae60;
  }

  &.negative {
    background: rgba(231, 76, 60, 0.1);
    border-left: 4px solid #e74c3c;
  }

  .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
    font-weight: bold;
  }

  .positive .feature-icon {
    background: #27ae60;
    color: white;
  }

  .negative .feature-icon {
    background: #e74c3c;
    color: white;
  }

  .feature-content {
    flex: 1;

    strong {
      display: block;
      color: #2c3e50;
      margin-bottom: 4px;
      font-size: 1.05rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .dijkstra-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .step-item {
    padding: 12px;
  }
}
</style>
