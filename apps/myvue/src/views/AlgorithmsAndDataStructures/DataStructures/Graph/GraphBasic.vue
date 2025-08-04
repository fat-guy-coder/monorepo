<template>
  <div class="graph-introduction">
    <!-- 标题和概述部分 -->
    <header>
      <h1>数据结构：图（Graph）</h1>
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
            <line x1="30%" y1="120" x2="20%" y2="210" class="edge directed"></line>
            <line x1="30%" y1="120" x2="50%" y2="210" class="edge"></line>
            <line x1="70%" y1="120" x2="50%" y2="210" class="edge"></line>
            <line x1="70%" y1="120" x2="80%" y2="210" class="edge"></line>
            <line x1="20%" y1="210" x2="80%" y2="210" class="edge weighted" data-weight="8"></line>
            <line x1="50%" y1="210" x2="80%" y2="210" class="edge"></line>
          </svg>

          <!-- 权重标签 -->
          <div class="weight-label" style="top: 185px; left: 50%;">8</div>
        </div>
      </div>
      <p class="overview">
        图是一种非线性的数据结构，由顶点（Vertex）和边（Edge）组成。图可以表示各种复杂关系，如社交网络、交通路线、网络拓扑等。图结构是解决许多现实世界问题的强大工具。
      </p>
    </header>

    <!-- 图的基本概念部分 -->
    <section class="graph-concepts">
      <h2>图的基本概念</h2>
      <div class="concept-cards">
        <div class="concept-card">
          <div class="card-icon">V</div>
          <h3>顶点 (Vertex)</h3>
          <p>图的基本单位，也称为节点。可以表示实体，如城市、人物或网络设备。</p>
        </div>
        <div class="concept-card">
          <div class="card-icon">E</div>
          <h3>边 (Edge)</h3>
          <p>连接两个顶点的线，表示顶点间的关系。边可以是有向或无向的。</p>
        </div>
        <div class="concept-card">
          <div class="card-icon">W</div>
          <h3>权重 (Weight)</h3>
          <p>边可以带有权重，表示连接的成本或距离，如道路长度或网络延迟。</p>
        </div>
        <div class="concept-card">
          <div class="card-icon">D</div>
          <h3>度 (Degree)</h3>
          <p>与顶点相连的边数。在有向图中，分为入度和出度。</p>
        </div>
      </div>
    </section>

    <!-- 图类型介绍部分 -->
    <section class="graph-types">
      <h2>图的类型与特点</h2>
      <div class="type-cards">
        <!-- 无向图 -->
        <div class="type-card" :class="{ expanded: activeCard === 0 }">
          <div class="card-header" @click="toggleCard(0)">
            <h3>无向图 (Undirected Graph)</h3>
            <span class="toggle-icon">{{ activeCard === 0 ? '−' : '+' }}</span>
          </div>
          <div class="card-content">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>边没有方向性，表示双向关系</li>
                  <li>(A, B) 等同于 (B, A)</li>
                  <li>邻接矩阵是对称的</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>表示对称关系（如友谊）更自然</li>
                  <li>算法实现相对简单</li>
                  <li>存储空间更高效（对称矩阵）</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>深度优先搜索 (DFS)</li>
                  <li>广度优先搜索 (BFS)</li>
                  <li>最小生成树 (Prim, Kruskal)</li>
                  <li>连通分量检测</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>社交网络（朋友关系）</li>
                  <li>计算机网络拓扑</li>
                  <li>电力网络</li>
                  <li>分子结构</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 有向图 -->
        <div class="type-card" :class="{ expanded: activeCard === 1 }">
          <div class="card-header" @click="toggleCard(1)">
            <h3>有向图 (Directed Graph)</h3>
            <span class="toggle-icon">{{ activeCard === 1 ? '−' : '+' }}</span>
          </div>
          <div class="card-content">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>边有方向性，表示单向关系</li>
                  <li>(A → B) 不同于 (B → A)</li>
                  <li>顶点有入度和出度之分</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>能准确表示非对称关系</li>
                  <li>更丰富的表达能力</li>
                  <li>适用于建模依赖关系</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>拓扑排序</li>
                  <li>强连通分量 (Kosaraju, Tarjan)</li>
                  <li>最短路径 (Dijkstra, Bellman-Ford)</li>
                  <li>关键路径分析</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>网页链接关系</li>
                  <li>任务调度和依赖管理</li>
                  <li>交通单向道路</li>
                  <li>资金流向分析</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 加权图 -->
        <div class="type-card" :class="{ expanded: activeCard === 2 }">
          <div class="card-header" @click="toggleCard(2)">
            <h3>加权图 (Weighted Graph)</h3>
            <span class="toggle-icon">{{ activeCard === 2 ? '−' : '+' }}</span>
          </div>
          <div class="card-content">
            <div class="properties">
              <div class="property">
                <h4>特点</h4>
                <ul>
                  <li>边带有权重值</li>
                  <li>权重可表示距离、成本、容量等</li>
                  <li>可以是无向或有向的</li>
                </ul>
              </div>
              <div class="property">
                <h4>优点</h4>
                <ul>
                  <li>能建模更复杂的现实场景</li>
                  <li>支持优化问题求解</li>
                  <li>可用于资源分配和路径优化</li>
                </ul>
              </div>
              <div class="property">
                <h4>相关算法</h4>
                <ul>
                  <li>最短路径 (Dijkstra, Floyd-Warshall)</li>
                  <li>最小生成树 (Prim, Kruskal)</li>
                  <li>最大流 (Ford-Fulkerson)</li>
                  <li>旅行商问题 (TSP) 近似算法</li>
                </ul>
              </div>
              <div class="property">
                <h4>使用场景</h4>
                <ul>
                  <li>地图导航系统</li>
                  <li>网络路由优化</li>
                  <li>物流配送规划</li>
                  <li>电路设计</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 特殊图类型 -->
        <div class="type-card" :class="{ expanded: activeCard === 3 }">
          <div class="card-header" @click="toggleCard(3)">
            <h3>特殊图类型</h3>
            <span class="toggle-icon">{{ activeCard === 3 ? '−' : '+' }}</span>
          </div>
          <div class="card-content">
            <div class="special-graphs">
              <div class="special-graph">
                <h4>连通图 (Connected Graph)</h4>
                <ul>
                  <li><strong>特点:</strong> 任意两顶点间都有路径</li>
                  <li><strong>应用:</strong> 网络可靠性分析</li>
                </ul>
              </div>
              <div class="special-graph">
                <h4>完全图 (Complete Graph)</h4>
                <ul>
                  <li><strong>特点:</strong> 每对顶点间都有边连接</li>
                  <li><strong>应用:</strong> 理论模型，锦标赛安排</li>
                </ul>
              </div>
              <div class="special-graph">
                <h4>二分图 (Bipartite Graph)</h4>
                <ul>
                  <li><strong>特点:</strong> 顶点分为两个集合，所有边连接不同集合</li>
                  <li><strong>应用:</strong> 匹配问题，推荐系统</li>
                </ul>
              </div>
              <div class="special-graph">
                <h4>有向无环图 (DAG)</h4>
                <ul>
                  <li><strong>特点:</strong> 有向图中无循环</li>
                  <li><strong>应用:</strong> 任务调度，版本控制系统</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 图的表示方法 -->
    <section class="graph-representations">
      <h2>图的表示方法</h2>
      <div class="representation-cards">
        <div class="rep-card">
          <h3>邻接矩阵 (Adjacency Matrix)</h3>
          <div class="matrix-example">
            <table>
              <tr>
                <th></th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
              </tr>
              <tr>
                <th>A</th>
                <td>0</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <th>B</th>
                <td>1</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th>C</th>
                <td>1</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </table>
          </div>
          <div class="rep-pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>快速判断两顶点是否相邻</li>
                <li>易于实现图算法</li>
                <li>适合稠密图</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>空间复杂度高 O(V²)</li>
                <li>添加/删除顶点成本高</li>
                <li>对稀疏图效率低</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rep-card">
          <h3>邻接表 (Adjacency List)</h3>
          <div class="list-example">
            <div class="list-item">
              <strong>A:</strong> B, C
            </div>
            <div class="list-item">
              <strong>B:</strong> A
            </div>
            <div class="list-item">
              <strong>C:</strong> A
            </div>
          </div>
          <div class="rep-pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>空间效率高 O(V + E)</li>
                <li>易于遍历顶点的邻接点</li>
                <li>适合稀疏图</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>判断两顶点是否相邻较慢</li>
                <li>难以删除顶点</li>
                <li>可能占用非连续内存</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 图算法 -->
    <section class="graph-algorithms">
      <h2>图算法与应用</h2>
      <div class="algorithm-table">
        <table>
          <thead>
            <tr>
              <th>算法</th>
              <th>类型</th>
              <th>时间复杂度</th>
              <th>应用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>深度优先搜索 (DFS)</td>
              <td>遍历</td>
              <td>O(V + E)</td>
              <td>拓扑排序，连通分量，迷宫求解</td>
            </tr>
            <tr>
              <td>广度优先搜索 (BFS)</td>
              <td>遍历</td>
              <td>O(V + E)</td>
              <td>最短路径（未加权），社交网络好友推荐</td>
            </tr>
            <tr>
              <td>Dijkstra 算法</td>
              <td>最短路径</td>
              <td>O(E + V log V)</td>
              <td>地图导航，网络路由</td>
            </tr>
            <tr>
              <td>Bellman-Ford 算法</td>
              <td>最短路径</td>
              <td>O(VE)</td>
              <td>处理负权边，金融套利检测</td>
            </tr>
            <tr>
              <td>Prim / Kruskal 算法</td>
              <td>最小生成树</td>
              <td>O(E log V)</td>
              <td>网络设计，电路板布线</td>
            </tr>
            <tr>
              <td>Ford-Fulkerson 算法</td>
              <td>最大流</td>
              <td>O(E * max_flow)</td>
              <td>网络流量优化，匹配问题</td>
            </tr>
            <tr>
              <td>拓扑排序</td>
              <td>排序</td>
              <td>O(V + E)</td>
              <td>任务调度，课程安排</td>
            </tr>
            <tr>
              <td>Tarjan 算法</td>
              <td>强连通分量</td>
              <td>O(V + E)</td>
              <td>编译器优化，社交网络分析</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <footer>
      <p>图结构是建模复杂关系和网络的强大工具，掌握图论算法对于解决现实世界的优化、路径和网络流问题至关重要。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeCard = ref<number | null>(0);

const toggleCard = (index: number) => {
  if (activeCard.value === index) {
    activeCard.value = null;
  } else {
    activeCard.value = index;
  }
};
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
}

.graph-introduction {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
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
      font-size: 2.2rem;
      position: relative;
      padding-bottom: 15px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 3px;
        background: linear-gradient(90deg, @primary-color, @secondary-color);
        border-radius: 3px;
      }
    }

    .overview {
      max-width: 800px;
      margin: 25px auto;
      padding: 18px;
      background-color: @accent-color;
      border-radius: 10px;
      font-size: 1.1rem;
      text-align: center;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
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

          &.directed {
            marker-end: url(#arrowhead);
          }

          &.weighted {
            stroke-dasharray: 5, 5;
          }
        }
      }

      .weight-label {
        position: absolute;
        background: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: bold;
        border: 1px solid #ddd;
      }
    }
  }

  .graph-concepts {
    margin: 40px 0;

    h2 {
      color: @primary-color;
      text-align: center;
      margin-bottom: 30px;
      font-size: 1.8rem;
    }

    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .concept-card {
      background-color: @card-color;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      }

      .card-icon {
        width: 60px;
        height: 60px;
        background-color: @accent-color;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        font-size: 1.8rem;
        font-weight: bold;
        color: @primary-color;
      }

      h3 {
        color: @primary-color;
        margin-top: 0;
        margin-bottom: 12px;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
      }
    }
  }

  .graph-types {
    margin: 40px 0;

    h2 {
      color: @primary-color;
      text-align: center;
      margin-bottom: 25px;
      font-size: 1.8rem;
    }

    .type-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .type-card {
      background-color: @card-color;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 1px solid @border-color;

      &.expanded {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        transform: translateY(-5px);
      }

      .card-header {
        background-color: @primary-color;
        color: white;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken(@primary-color, 5%);
        }

        h3 {
          margin: 0;
          font-size: 1.3rem;
        }

        .toggle-icon {
          font-size: 1.5rem;
          font-weight: bold;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .card-content {
        padding: 20px;

        .properties {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;

          .property {
            h4 {
              color: @primary-color;
              margin-top: 0;
              margin-bottom: 10px;
              font-size: 1.1rem;
              border-bottom: 1px solid @border-color;
              padding-bottom: 5px;
            }

            ul {
              padding-left: 20px;
              margin: 0;

              li {
                margin-bottom: 8px;
              }
            }
          }
        }

        .special-graphs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;

          .special-graph {
            background: @accent-color;
            padding: 15px;
            border-radius: 8px;

            h4 {
              margin-top: 0;
              margin-bottom: 10px;
              color: darken(@primary-color, 10%);
            }

            ul {
              padding-left: 20px;
              margin: 0;

              li {
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
  }

  .graph-representations {
    margin: 40px 0;

    h2 {
      color: @primary-color;
      text-align: center;
      margin-bottom: 25px;
      font-size: 1.8rem;
    }

    .representation-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;
    }

    .rep-card {
      background-color: @card-color;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      h3 {
        color: @primary-color;
        margin-top: 0;
        margin-bottom: 20px;
        text-align: center;
        font-size: 1.4rem;
      }

      .matrix-example,
      .list-example {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid @border-color;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }

        th {
          background-color: @accent-color;
          font-weight: bold;
        }
      }

      .list-item {
        padding: 8px 0;
        border-bottom: 1px dashed #ddd;

        &:last-child {
          border-bottom: none;
        }
      }

      .rep-pros-cons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;

        .pros,
        .cons {
          padding: 15px;
          border-radius: 8px;

          h4 {
            margin-top: 0;
            margin-bottom: 10px;
          }
        }

        .pros {
          background: rgba(@success-color, 0.1);
          border: 1px solid rgba(@success-color, 0.3);

          h4 {
            color: darken(@success-color, 15%);
          }
        }

        .cons {
          background: rgba(@warning-color, 0.1);
          border: 1px solid rgba(@warning-color, 0.3);

          h4 {
            color: darken(@warning-color, 15%);
          }
        }
      }
    }
  }

  .graph-algorithms {
    margin: 40px 0;

    h2 {
      color: @primary-color;
      text-align: center;
      margin-bottom: 25px;
      font-size: 1.8rem;
    }

    .algorithm-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        th,
        td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        th {
          background-color: @primary-color;
          color: white;
          font-weight: bold;
        }

        tr:nth-child(even) {
          background-color: @accent-color;
        }

        tr:hover {
          background-color: lighten(@accent-color, 2%);
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    padding: 25px;
    background-color: @accent-color;
    border-radius: 10px;
    text-align: center;
    font-size: 1.1rem;
    border-top: 2px solid @border-color;
  }
}

@media (max-width: 768px) {
  .graph-introduction {
    padding: 15px;

    header h1 {
      font-size: 1.8rem;
    }

    .graph-representations .representation-cards {
      grid-template-columns: 1fr;
    }

    .graph-concepts .concept-cards,
    .graph-types .type-cards {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 480px) {
  .graph-introduction {
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

    .graph-representations .rep-card .rep-pros-cons {
      grid-template-columns: 1fr;
    }
  }
}
</style>
