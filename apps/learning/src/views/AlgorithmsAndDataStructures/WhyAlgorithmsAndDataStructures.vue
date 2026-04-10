<template>
  <div class="dsa-container">
    <header class="hero-section">
      <div class="hero-content">
        <h1>数据结构和算法：编程基石</h1>
        <p>掌握编程的核心思维，提升问题解决能力</p>
        <p>数据结构和算法是编程的核心，是编程的基础，是编程的灵魂。</p>
        <p><b>其实高薪的程序员，都是算法和数据结构的高手。其他的都是记忆的知识(随时可查询)</b></p>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-value">90%</div>
            <div class="stat-label">大厂面试必考</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">10X</div>
            <div class="stat-label">性能提升潜力</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">100+</div>
            <div class="stat-label">核心概念</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="algorithm-visual">
          <div class="algo-node" v-for="(node, index) in visualNodes" :key="index"
               :style="{
                 top: node.top + 'px',
                 left: node.left + 'px',
                 width: node.size + 'px',
                 height: node.size + 'px',
                 background: node.color,
                 animationDelay: (index * 0.1) + 's'
               }">
            <span>{{ node.label }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="why-learn">
      <h2 class="section-title">为什么需要学习数据结构和算法？</h2>
      <div class="reasons-grid">
        <div class="reason-card">
          <div class="reason-icon">🚀</div>
          <h3>性能优化</h3>
          <p>选择合适的数据结构和算法可以使程序运行速度提高几个数量级</p>
        </div>
        <div class="reason-card">
          <div class="reason-icon">💡</div>
          <h3>问题解决能力</h3>
          <p>培养抽象思维和分解复杂问题的能力，提升编程直觉</p>
        </div>
        <div class="reason-card">
          <div class="reason-icon">👨‍💻</div>
          <h3>面试必备</h3>
          <p>90%的技术面试都会考查数据结构和算法知识</p>
        </div>
        <div class="reason-card">
          <div class="reason-icon">🌉</div>
          <h3>技术基础</h3>
          <p>理解计算机科学的底层原理，掌握编程语言背后的核心概念</p>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 数据结构部分 -->
      <div class="data-structures">
        <div class="section-header">
          <h2>核心数据结构</h2>
          <p>高效组织和管理数据的方式</p>
        </div>

        <div class="ds-category">
          <h3>线性结构</h3>
          <div class="ds-grid">
            <div class="ds-card" v-for="ds in linearStructures" :key="ds.name">
              <div class="ds-icon" :style="{background: ds.color}">{{ ds.icon }}</div>
              <div class="ds-info">
                <h4>{{ ds.name }}</h4>
                <p>{{ ds.description }}</p>
                <div class="ds-props">
                  <span v-for="(prop, idx) in ds.properties" :key="idx">{{ prop }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ds-category">
          <h3>非线性结构</h3>
          <div class="ds-grid">
            <div class="ds-card" v-for="ds in nonLinearStructures" :key="ds.name">
              <div class="ds-icon" :style="{background: ds.color}">{{ ds.icon }}</div>
              <div class="ds-info">
                <h4>{{ ds.name }}</h4>
                <p>{{ ds.description }}</p>
                <div class="ds-props">
                  <span v-for="(prop, idx) in ds.properties" :key="idx">{{ prop }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 算法部分 -->
      <div class="algorithms">
        <div class="section-header">
          <h2>经典算法</h2>
          <p>解决问题的有效方法</p>
        </div>

        <div class="algo-tabs">
          <button v-for="tab in algoTabs" :key="tab.id"
                  :class="{active: activeAlgoTab === tab.id}"
                  @click="activeAlgoTab = tab.id">
            {{ tab.label }}
          </button>
        </div>

        <div class="algo-grid">
          <div class="algo-card" v-for="algo in filteredAlgorithms" :key="algo.name">
            <div class="algo-header">
              <h4>{{ algo.name }}</h4>
              <div class="algo-complexity">
                复杂度: {{ algo.complexity }}
              </div>
            </div>
            <div class="algo-description">
              <p>{{ algo.description }}</p>
            </div>
            <div class="algo-use-cases">
              <strong>应用场景:</strong>
              <span v-for="(useCase, idx) in algo.useCases" :key="idx">{{ useCase }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="benefits">
      <h2 class="section-title">学习数据结构和算法的好处</h2>
      <div class="benefits-content">
        <div class="benefits-list">
          <div class="benefit-item" v-for="(benefit, index) in benefits" :key="index">
            <div class="benefit-index">{{ index + 1 }}</div>
            <div>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
          </div>
        </div>
        <div class="benefits-visual">
          <div class="skills-radar">
            <div class="radar-axis" v-for="(axis, idx) in radarAxes" :key="idx"
                 :style="{transform: `rotate(${idx * 60}deg)`}"></div>
            <div class="radar-labels">
              <div v-for="(label, idx) in radarLabels" :key="idx"
                   :style="{transform: `translate(-50%, -50%) rotate(${-idx * 60}deg)`, left: label.x + '%', top: label.y + '%'}">
                {{ label.text }}
              </div>
            </div>
            <div class="radar-fill" :style="{clipPath: radarPath}"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="learning-path">
      <h2 class="section-title">如何学习数据结构和算法</h2>
      <div class="path-steps">
        <div class="path-card" v-for="(step, index) in learningPath" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <div class="step-tips">
              <span v-for="(tip, idx) in step.tips" :key="idx">{{ tip }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="dsa-footer">
      <div class="footer-content">
        <div class="inspiration-quote">
          "数据结构是程序的骨架，算法是程序的灵魂"
        </div>
        <div class="action-call">
          <button class="start-learning-btn" @click="goToByName">开始学习之旅</button>
        </div>
      </div>
      <div class="footer-note">
         数据结构和算法学习指南 | 编程核心能力培养
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 算法可视化节点
const visualNodes = ref([
  { top: 40, left: 150, size: 80, color: 'rgba(79, 70, 229, 0.8)', label: '数组' },
  { top: 160, left: 50, size: 70, color: 'rgba(139, 92, 246, 0.8)', label: '链表' },
  { top: 160, left: 250, size: 70, color: 'rgba(99, 102, 241, 0.8)', label: '栈' },
  { top: 280, left: 150, size: 90, color: 'rgba(59, 130, 246, 0.8)', label: '树' },
  { top: 220, left: 300, size: 60, color: 'rgba(14, 165, 233, 0.8)', label: '图' },
  { top: 100, left: 320, size: 65, color: 'rgba(16, 185, 129, 0.8)', label: '哈希' },
]);

const emit = defineEmits(['goToByRouteName'])

function goToByName() {
  emit('goToByRouteName', 'DataStructuresIntroduction')
}

// 算法分类标签
const algoTabs = ref([
  { id: 'all', label: '全部' },
  { id: 'sort', label: '排序算法' },
  { id: 'search', label: '搜索算法' },
  { id: 'graph', label: '图算法' },
  { id: 'dynamic', label: '动态规划' },
]);

const activeAlgoTab = ref('all');

// 线性数据结构
const linearStructures = ref([
  {
    name: "数组",
    icon: "📊",
    color: "#a5b4fc",
    description: "连续内存空间存储相同类型元素",
    properties: ["随机访问 O(1)", "插入删除 O(n)", "大小固定"]
  },
  {
    name: "链表",
    icon: "⛓️",
    color: "#c7d2fe",
    description: "通过指针连接的节点序列，节点存储数据和指向下一个节点的指针",
    properties: ["动态大小", "插入删除 O(1)", "顺序访问"]
  },
  {
    name: "栈",
    icon: "📚",
    color: "#ddd6fe",
    description: "后进先出(LIFO)的数据结构，仅在一端(栈顶)进行操作",
    properties: ["push/pop O(1)", "函数调用", "括号匹配"]
  },
  {
    name: "队列",
    icon: "🚶‍♂️🚶‍♀️",
    color: "#fbcfe8",
    description: "先进先出(FIFO)的数据结构，在一端(rear)添加，另一端(front)删除",
    properties: ["enqueue/dequeue O(1)", "任务调度", "BFS"]
  }
]);

// 非线性数据结构
const nonLinearStructures = ref([
  {
    name: "树",
    icon: "🌳",
    color: "#bbf7d0",
    description: "分层数据结构，具有根节点和子节点，用于表示层次关系",
    properties: ["层级结构", "搜索高效", "多种变体"]
  },
  {
    name: "二叉树",
    icon: "🔢",
    color: "#86efac",
    description: "每个节点最多有两个子节点的树结构",
    properties: ["O(log n) 操作", "BST/AVL", "遍历算法"]
  },
  {
    name: "图",
    icon: "📈",
    color: "#a5f3fc",
    description: "由顶点和边组成的网络结构，表示实体间关系",
    properties: ["复杂关系", "多种表示法", "路径搜索"]
  },
  {
    name: "哈希表",
    icon: "🔑",
    color: "#fde68a",
    description: "通过哈希函数将键映射到存储位置的数据结构",
    properties: ["平均 O(1) 访问", "键值对存储", "冲突处理"]
  }
]);

// 算法数据
const algorithms = ref([
  {
    name: "快速排序",
    category: "sort",
    complexity: "O(n log n)",
    description: "分治策略，选择一个基准元素将数组分成左右两部分",
    useCases: ["大规模数据排序", "内存受限场景", "通用排序"]
  },
  {
    name: "二分查找",
    category: "search",
    complexity: "O(log n)",
    description: "在有序数组中高效查找目标元素，每次比较将搜索范围减半",
    useCases: ["有序数据查找", "数据库索引", "数值计算"]
  },
  {
    name: "广度优先搜索(BFS)",
    category: "graph",
    complexity: "O(V+E)",
    description: "从根节点开始逐层遍历图结构，使用队列辅助实现",
    useCases: ["最短路径(未加权)", "社交网络", "网络爬虫"]
  },
  {
    name: "深度优先搜索(DFS)",
    category: "graph",
    complexity: "O(V+E)",
    description: "沿着树的深度遍历节点，尽可能深地搜索分支",
    useCases: ["拓扑排序", "连通分量", "迷宫求解"]
  },
  {
    name: "Dijkstra算法",
    category: "graph",
    complexity: "O(V^2)",
    description: "求解单源最短路径，适用于带权有向图和无向图",
    useCases: ["路由算法", "地图导航", "网络优化"]
  },
  {
    name: "动态规划",
    category: "dynamic",
    complexity: "问题相关",
    description: "将复杂问题分解为重叠子问题，存储子问题解避免重复计算",
    useCases: ["背包问题", "最长公共子序列", "编辑距离"]
  },
  {
    name: "归并排序",
    category: "sort",
    complexity: "O(n log n)",
    description: "分治算法，将数组分成两半排序后合并结果",
    useCases: ["外部排序", "链表排序", "稳定排序"]
  },
  {
    name: "二叉树遍历",
    category: "graph",
    complexity: "O(n)",
    description: "前序、中序、后序遍历二叉树节点的方法",
    useCases: ["表达式树", "文件系统", "数据库索引"]
  }
]);

// 过滤算法
const filteredAlgorithms = computed(() => {
  if (activeAlgoTab.value === 'all') return algorithms.value;
  return algorithms.value.filter(algo => algo.category === activeAlgoTab.value);
});

// 雷达图数据
const radarAxes = ref([
  { text: "问题分析", x: 50, y: 10 },
  { text: "抽象思维", x: 85, y: 25 },
  { text: "编码能力", x: 85, y: 75 },
  { text: "性能优化", x: 50, y: 90 },
  { text: "调试能力", x: 15, y: 75 },
  { text: "系统设计", x: 15, y: 25 }
]);

// 学习好处
const benefits = ref([
  {
    title: "编写高效代码",
    description: "理解不同算法的时间、空间复杂度，选择最优解决方案"
  },
  {
    title: "提升问题解决能力",
    description: "学会抽象问题、设计算法和优化解决方案"
  },
  {
    title: "理解系统设计",
    description: "数据库、操作系统等系统软件都基于核心数据结构"
  },
  {
    title: "增强技术洞察力",
    description: "理解新技术背后的原理，更快学习和掌握"
  },
  {
    title: "提升职业竞争力",
    description: "通过顶尖科技公司的技术面试必备技能"
  },
  {
    title: "编写可维护代码",
    description: "构建清晰、结构良好的软件系统"
  }
]);

// 雷达图数据
const radarLabels = ref([
  { text: "问题分析", x: 50, y: 10 },
  { text: "抽象思维", x: 85, y: 25 },
  { text: "编码能力", x: 85, y: 75 },
  { text: "性能优化", x: 50, y: 90 },
  { text: "调试能力", x: 15, y: 75 },
  { text: "系统设计", x: 15, y: 25 }
]);

// 雷达图路径
const radarPath = "polygon(50% 10%, 85% 25%, 85% 75%, 50% 90%, 15% 75%, 15% 25%)";

// 学习路径
const learningPath = ref([
  {
    title: "掌握基础知识",
    description: "理解时间复杂度和空间复杂度的概念，掌握基础数据结构",
    tips: ["Big O表示法", "数组和链表", "栈和队列"]
  },
  {
    title: "学习核心算法",
    description: "掌握排序、搜索等基础算法，理解递归和分治思想",
    tips: ["快速排序", "二分查找", "递归原理"]
  },
  {
    title: "探索高级结构",
    description: "学习树、图等非线性结构及相关算法",
    tips: ["二叉树遍历", "图搜索算法", "哈希表原理"]
  },
  {
    title: "解决实际问题",
    description: "在LeetCode等平台练习，将知识应用于实际问题",
    tips: ["每日一题", "参与竞赛", "复盘解法"]
  },
  {
    title: "深入算法思想",
    description: "学习动态规划、贪心算法等高级算法范式",
    tips: ["状态转移方程", "最优子结构", "记忆化搜索"]
  },
  {
    title: "系统设计应用",
    description: "理解数据结构在系统设计中的应用和实践",
    tips: ["数据库索引", "缓存策略", "分布式算法"]
  }
]);
</script>

<style lang="less" scoped>
.dsa-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
}

.hero-section {
  display: flex;
  gap: 2rem;
  padding: 3rem 1rem;
  margin-bottom: 3rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  .hero-content {
    flex: 1;
    padding: 1rem;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin: 0 0 1rem;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      line-height: 1.2;
    }

    p {
      font-size: 1.4rem;
      color: #4a5568;
      margin: 0 0 2rem;
      max-width: 600px;
    }
  }

  .hero-visual {
    flex: 1;
    min-height: 350px;
    position: relative;
  }
}

.hero-stats {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  .stat-item {
    text-align: center;
    background: white;
    padding: 1.2rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .stat-value {
      font-size: 2.2rem;
      font-weight: 800;
      color: #4f46e5;
    }

    .stat-label {
      font-size: 0.95rem;
      color: #4a5568;
    }
  }
}

.algorithm-visual {
  position: relative;
  width: 100%;
  height: 350px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #cbd5e1;

  .algo-node {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    animation: float 4s ease-in-out infinite;
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    text-align: center;
    transition: all 0.4s ease;

    &:hover {
      transform: scale(1.1);
      z-index: 10;
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    }
  }
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 3rem 0 2rem;
  color: #1e293b;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 5px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 3px;
    margin: 0.8rem auto;
  }
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  max-width: 1200px;
  margin: 0 auto 3rem;

  .reason-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 10px 25px rgba(79, 70, 229, 0.1);
    }

    .reason-icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    h3 {
      font-size: 1.6rem;
      margin: 0 0 1rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      font-size: 1.05rem;
      color: #475569;
      line-height: 1.6;
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.section-header {
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    margin: 0 0 0.5rem;
    color: #1e293b;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
  }
}

.ds-category {
  margin-bottom: 2.5rem;

  h3 {
    font-size: 1.5rem;
    color: #4f46e5;
    margin: 0 0 1.5rem;
    padding-left: 0.5rem;
    border-left: 4px solid #818cf8;
  }
}

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.ds-card {
  display: flex;
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15);
  }

  .ds-icon {
    flex: 0 0 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
  }

  .ds-info {
    padding: 1.2rem;
    flex: 1;

    h4 {
      margin: 0 0 0.5rem;
      font-size: 1.3rem;
      color: #1e293b;
    }

    p {
      margin: 0 0 1rem;
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.5;
    }
  }
}

.ds-props {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background: #eef2ff;
    color: #4f46e5;
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
  }
}

.algo-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;

  button {
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 30px;
    background: #e2e8f0;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: #4f46e5;
      color: white;
      box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
    }

    &:not(.active):hover {
      background: #c7d2fe;
    }
  }
}

.algo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.algo-card {
  background: white;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15);
  }

  .algo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #f1f5f9;

    h4 {
      margin: 0;
      font-size: 1.3rem;
      color: #1e293b;
    }

    .algo-complexity {
      background: #e0f2fe;
      color: #0ea5e9;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }

  .algo-description {
    margin-bottom: 1.2rem;

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.6;
    }
  }

  .algo-use-cases {
    strong {
      display: block;
      margin-bottom: 0.5rem;
      color: #4f46e5;
    }

    span {
      display: inline-block;
      background: #f1f5f9;
      padding: 0.3rem 0.7rem;
      border-radius: 6px;
      font-size: 0.85rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      color: #475569;
    }
  }
}

.benefits {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  .benefits-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
}

.benefits-list {
  .benefit-item {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1.2rem;
    border-radius: 12px;
    transition: background 0.3s;

    &:hover {
      background: #f8fafc;
    }

    .benefit-index {
      flex: 0 0 50px;
      height: 50px;
      background: #4f46e5;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.3rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      font-size: 1rem;
      color: #475569;
      line-height: 1.6;
    }
  }
}

.benefits-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.skills-radar {
  position: relative;
  width: 300px;
  height: 300px;
  background: #f8fafc;
  border-radius: 50%;
  border: 1px solid #e2e8f0;

  .radar-axis {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    background: #e2e8f0;
    transform-origin: top center;
  }

  .radar-labels {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    div {
      position: absolute;
      font-size: 0.9rem;
      font-weight: 600;
      color: #4f46e5;
      transform-origin: center center;
      white-space: nowrap;
    }
  }

  .radar-fill {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(79, 70, 229, 0.15);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
}

.learning-path {
  margin-bottom: 3rem;
}

.path-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;

  .path-card {
    display: flex;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(79, 70, 229, 0.15);
    }

    .step-number {
      flex: 0 0 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 800;
      background: #4f46e5;
      color: white;
    }

    .step-content {
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.8rem;
        font-size: 1.4rem;
        color: #1e293b;
      }

      p {
        margin: 0 0 1.2rem;
        font-size: 1rem;
        color: #475569;
        line-height: 1.6;
      }
    }
  }
}

.step-tips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background: #eef2ff;
    color: #4f46e5;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.9rem;
  }
}

.dsa-footer {
  background: #1e293b;
  color: white;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 2rem;

  .footer-content {
    padding: 3rem 2rem;
    text-align: center;
  }

  .inspiration-quote {
    font-size: 1.8rem;
    font-style: italic;
    margin-bottom: 2rem;
    color: #e2e8f0;
  }

  .action-call {
    margin-top: 2rem;

    .start-learning-btn {
      padding: 1rem 3rem;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #6366f1;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
      }
    }
  }

  .footer-note {
    text-align: center;
    padding: 1.2rem;
    background: rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
    color: #cbd5e1;
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    padding: 2rem 1rem;

    .hero-content {
      text-align: center;

      h1 {
        font-size: 2.2rem;
      }

      p {
        font-size: 1.2rem;
      }
    }

    .hero-stats {
      justify-content: center;
    }
  }

  .algorithm-visual {
    height: 280px;
  }
}
</style>
