<template>
  <div class="graph-classification-container">
    <header>
      <h1>图论中的图分类</h1>
      <p>探索不同类型图的特点、应用场景和相关算法</p>
    </header>

    <div class="search-container">
      <input
        v-model="searchQuery"
        placeholder="搜索图分类或算法..."
        type="text"
        class="search-input"
      >
      <div class="filter-tags">
        <span
          v-for="tag in filterTags"
          :key="tag"
          :class="{ active: activeTag === tag }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="graph-types">
      <div
        v-for="graph in filteredGraphs"
        :key="graph.id"
        class="graph-card"
      >
        <div class="card-header">
          <div class="graph-icon" :style="{ backgroundColor: graph.color }">
            {{ graph.icon }}
          </div>
          <div>
            <h2>{{ graph.name }}</h2>
            <div class="graph-tags">
              <span v-for="tag in graph.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <div class="card-content">
          <div class="section">
            <h3><span class="icon">📌</span> 特点</h3>
            <ul>
              <li v-for="(feature, index) in graph.features" :key="index">{{ feature }}</li>
            </ul>
          </div>

          <div class="section">
            <h3><span class="icon">🌐</span> 适用场景</h3>
            <ul>
              <li v-for="(scenario, index) in graph.scenarios" :key="index">{{ scenario }}</li>
            </ul>
          </div>

          <div class="section">
            <h3><span class="icon">⚙️</span> 相关算法</h3>
            <div class="algorithms">
              <div
                v-for="(algorithm, index) in graph.algorithms"
                :key="index"
                class="algorithm"
              >
                <span class="algo-icon">🔍</span>
                <div>
                  <strong>{{ algorithm.name }}</strong>
                  <p>{{ algorithm.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>图论基础 | 数据结构与算法 | 可视化展示</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 搜索和筛选相关
const searchQuery = ref('');
const activeTag = ref('全部');
const filterTags = ['全部', '有向图', '无向图', '加权图', '特殊图', '网络图'];

interface Algorithm {
  name: string;
  description: string;
}

interface GraphType {
  id: number;
  name: string;
  icon: string;
  color: string;
  tags: string[];
  features: string[];
  scenarios: string[];
  algorithms: Algorithm[];
}

// 图分类数据
const graphTypes = ref<GraphType[]>([
  {
    id: 1,
    name: "无向图",
    icon: "⇄",
    color: "#4CAF50",
    tags: ["基础图", "对称关系"],
    features: [
      "边没有方向性",
      "边连接的两个顶点是对称的",
      "邻接矩阵是对称矩阵",
      "度数 = 入度 = 出度"
    ],
    scenarios: [
      "社交网络（朋友关系）",
      "交通网络（双向道路）",
      "分子结构（化学键）",
      "计算机网络（对等连接）"
    ],
    algorithms: [
      {
        name: "深度优先搜索(DFS)",
        description: "用于遍历或搜索图，沿着分支深入探索"
      },
      {
        name: "广度优先搜索(BFS)",
        description: "按层次遍历图，常用于最短路径问题"
      },
      {
        name: "Prim算法",
        description: "用于寻找最小生成树"
      },
      {
        name: "Kruskal算法",
        description: "另一种最小生成树算法，基于边的选择"
      }
    ]
  },
  {
    id: 2,
    name: "有向图",
    icon: "→",
    color: "#2196F3",
    tags: ["方向性", "非对称"],
    features: [
      "边具有方向性（起点→终点）",
      "邻接矩阵通常不对称",
      "顶点有入度和出度之分",
      "可以表示因果关系"
    ],
    scenarios: [
      "网页链接（超链接）",
      "任务依赖关系",
      "有限状态机",
      "交通单行道系统"
    ],
    algorithms: [
      {
        name: "拓扑排序",
        description: "对有向无环图(DAG)进行线性排序"
      },
      {
        name: "Kosaraju算法",
        description: "寻找强连通分量"
      },
      {
        name: "Bellman-Ford算法",
        description: "单源最短路径（可处理负权重）"
      },
      {
        name: "关键路径法(CPM)",
        description: "项目管理中的进度规划算法"
      }
    ]
  },
  {
    id: 3,
    name: "加权图",
    icon: "⚖️",
    color: "#FF9800",
    tags: ["带权重", "度量"],
    features: [
      "每条边关联一个权重值",
      "权重可表示距离、成本、容量等",
      "权重可以是正数、负数或零",
      "通常用于优化问题"
    ],
    scenarios: [
      "地图导航（距离/时间）",
      "网络路由（带宽/延迟）",
      "物流配送（运输成本）",
      "电路设计（电阻/电容）"
    ],
    algorithms: [
      {
        name: "Dijkstra算法",
        description: "单源最短路径（非负权重）"
      },
      {
        name: "Floyd-Warshall算法",
        description: "所有顶点对的最短路径"
      },
      {
        name: "最大流算法",
        description: "如Ford-Fulkerson，解决网络流问题"
      },
      {
        name: "旅行商问题(TSP)",
        description: "寻找最短的遍历所有城市的路径"
      }
    ]
  },
  {
    id: 4,
    name: "二分图",
    icon: "⇆",
    color: "#9C27B0",
    tags: ["二部图", "匹配"],
    features: [
      "顶点分为两个不相交集合",
      "所有边连接两个不同集合的顶点",
      "不存在奇数长度的环",
      "可以用两种颜色着色"
    ],
    scenarios: [
      "匹配问题（求职者与职位）",
      "广告投放（广告与展示位）",
      "婚姻稳定问题",
      "时间表安排（课程与教室）"
    ],
    algorithms: [
      {
        name: "匈牙利算法",
        description: "寻找最大匹配"
      },
      {
        name: "Hopcroft-Karp算法",
        description: "更高效的最大匹配算法"
      },
      {
        name: "二分图检测",
        description: "使用BFS/DFS检查图是否为二分图"
      },
      {
        name: "最小顶点覆盖",
        description: "Konig定理将问题转化为最大匹配"
      }
    ]
  },
  {
    id: 5,
    name: "树",
    icon: "🌲",
    color: "#795548",
    tags: ["无环", "层次结构"],
    features: [
      "连通无环图",
      "任意两顶点间有唯一路径",
      "n个顶点有n-1条边",
      "没有回路"
    ],
    scenarios: [
      "组织结构图",
      "文件系统结构",
      "决策树（机器学习）",
      "语法分析树（编译器）"
    ],
    algorithms: [
      {
        name: "前/中/后序遍历",
        description: "深度优先的树遍历方法"
      },
      {
        name: "层次遍历",
        description: "广度优先的树遍历方法"
      },
      {
        name: "最近公共祖先(LCA)",
        description: "寻找两个节点的最近公共祖先"
      },
      {
        name: "树的重心",
        description: "优化树的分割问题"
      }
    ]
  },
  {
    id: 6,
    name: "有向无环图(DAG)",
    icon: "↘️",
    color: "#E91E63",
    tags: ["无环", "拓扑"],
    features: [
      "有向图中不存在环",
      "可以拓扑排序",
      "表示偏序关系",
      "高效处理依赖关系"
    ],
    scenarios: [
      "任务调度与依赖管理",
      "版本控制系统（如Git）",
      "数据流编程",
      "编译器的中间表示"
    ],
    algorithms: [
      {
        name: "拓扑排序",
        description: "Kahn算法或基于DFS的排序"
      },
      {
        name: "关键路径分析",
        description: "确定项目的最短完成时间"
      },
      {
        name: "最长路径问题",
        description: "在DAG中可高效求解"
      },
      {
        name: "动态规划",
        description: "许多DP问题可建模为DAG"
      }
    ]
  }
]);

// 过滤图分类
const filteredGraphs = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let result = graphTypes.value;

  if (query) {
    result = result.filter(graph =>
      graph.name.toLowerCase().includes(query) ||
      graph.tags.some(tag => tag.toLowerCase().includes(query)) ||
      graph.algorithms.some(algo =>
        algo.name.toLowerCase().includes(query) ||
        algo.description.toLowerCase().includes(query)
      )
    );
  }

  if (activeTag.value !== '全部') {
    result = result.filter(graph =>
      graph.tags.includes(activeTag.value) ||
      graph.name.includes(activeTag.value)
    );
  }

  return result;
});

// 切换标签
const toggleTag = (tag: string) => {
  activeTag.value = activeTag.value === tag ? '全部' : tag;
};
</script>

<style scoped lang="less">

:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --accent: #e74c3c;
  --light: #f8f9fa;
  --dark: #343a40;
  --gray: #6c757d;
  --border: #dee2e6;
  --shadow: rgba(0, 0, 0, 0.08);
}

.graph-classification-container {
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #333;
  min-height: 100vh;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow);

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.1rem;
      color: var(--gray);
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .search-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px var(--shadow);

    .search-input {
      width: 100%;
      padding: 12px 20px;
      font-size: 1rem;
      border: 2px solid var(--border);
      border-radius: 8px;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
      }
    }

    .filter-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;

      span {
        padding: 6px 15px;
        background: #eef7ff;
        border-radius: 20px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid #d1e7ff;

        &:hover {
          background: #d1e7ff;
        }

        &.active {
          background: var(--primary);
          color: white;
          font-weight: 500;
          border-color: var(--primary);
        }
      }
    }
  }

  .graph-types {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
    margin-bottom: 40px;

    .graph-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
      }

      .card-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: linear-gradient(to right, #f8fafc, #f1f8ff);
        border-bottom: 1px solid var(--border);

        .graph-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-right: 15px;
          color: white;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }

        h2 {
          font-size: 1.4rem;
          margin: 0;
          color: #2c3e50;
        }

        .graph-tags {
          display: flex;
          gap: 8px;
          margin-top: 5px;

          span {
            font-size: 0.75rem;
            background: #eef2f7;
            padding: 3px 8px;
            border-radius: 4px;
            color: var(--gray);
          }
        }
      }

      .card-content {
        padding: 20px;

        .section {
          margin-bottom: 20px;

          h3 {
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 12px;
            color: #2c3e50;
            border-bottom: 1px dashed #e2e8f0;
            padding-bottom: 8px;

            .icon {
              margin-right: 8px;
            }
          }

          ul {
            padding-left: 20px;
            margin: 0;

            li {
              margin-bottom: 8px;
              line-height: 1.5;
              font-size: 0.95rem;
              position: relative;

              &::before {
                content: "•";
                color: var(--primary);
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
              }
            }
          }

          .algorithms {
            .algorithm {
              display: flex;
              gap: 12px;
              padding: 12px;
              margin-bottom: 12px;
              background: #f8fafc;
              border-radius: 8px;
              transition: background 0.2s;

              &:hover {
                background: #eef7ff;
              }

              .algo-icon {
                font-size: 1.2rem;
                color: var(--primary);
                margin-top: 2px;
              }

              div {
                flex: 1;

                strong {
                  display: block;
                  font-size: 0.95rem;
                  margin-bottom: 4px;
                  color: #2c3e50;
                }

                p {
                  margin: 0;
                  font-size: 0.85rem;
                  color: var(--gray);
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }
    }
  }

  footer {
    text-align: center;
    padding: 20px;
    color: var(--gray);
    font-size: 0.9rem;
    border-top: 1px solid var(--border);
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .graph-types {
    grid-template-columns: 1fr !important;
  }

  .graph-classification-container {
    padding: 15px;

    header h1 {
      font-size: 1.8rem;
    }
  }
}
</style>
