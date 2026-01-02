<template>
  <div class="tree-container">
    <header class="header">
      <div class="header-content">
        <h1>树形数据结构解析</h1>
        <p>探索分层数据组织的核心原理与应用</p>

        <div class="tree-visualization">
          <div class="tree-diagram">
            <div class="node root">
              <div class="node-content">根节点</div>
              <div class="children">
                <div class="branch">
                  <div class="node">
                    <div class="node-content">子节点 1</div>
                    <div class="children">
                      <div class="branch">
                        <div class="node leaf">
                          <div class="node-content">叶节点 1.1</div>
                        </div>
                      </div>
                      <div class="branch">
                        <div class="node leaf">
                          <div class="node-content">叶节点 1.2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="branch">
                  <div class="node">
                    <div class="node-content">子节点 2</div>
                    <div class="children">
                      <div class="branch">
                        <div class="node leaf">
                          <div class="node-content">叶节点 2.1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tree-legend">
            <div class="legend-item">
              <div class="legend-node root"></div>
              <span>根节点</span>
            </div>
            <div class="legend-item">
              <div class="legend-node internal"></div>
              <span>内部节点</span>
            </div>
            <div class="legend-item">
              <div class="legend-node leaf"></div>
              <span>叶节点</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-grid">
      <!-- 特性部分 -->
      <div class="card characteristics">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <h2>树结构特性</h2>
        </div>
        <div class="card-content">
          <div class="characteristic-item">
            <div class="char-icon">1</div>
            <div>
              <h3>层级结构</h3>
              <p>树结构具有明确的父子关系，形成自然的层次结构</p>
            </div>
          </div>
          <div class="characteristic-item">
            <div class="char-icon">2</div>
            <div>
              <h3>唯一根节点</h3>
              <p>每棵树有且仅有一个根节点，是树结构的起点</p>
            </div>
          </div>
          <div class="characteristic-item">
            <div class="char-icon">3</div>
            <div>
              <h3>分支连接</h3>
              <p>节点通过边连接，父子节点间有唯一的路径</p>
            </div>
          </div>
          <div class="characteristic-item">
            <div class="char-icon">4</div>
            <div>
              <h3>无环结构</h3>
              <p>树结构中不存在循环路径（无环图）</p>
            </div>
          </div>
          <div class="characteristic-item">
            <div class="char-icon">5</div>
            <div>
              <h3>叶节点</h3>
              <p>没有子节点的节点称为叶节点（叶子）</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 分类部分 -->
      <div class="card categories">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
          </svg>
          <h2>树结构分类</h2>
        </div>
        <div class="tree-category-grid">
          <div class="category-card" v-for="category in treeCategories" :key="category.name">
            <div class="category-icon">{{ category.icon }}</div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <div class="category-examples">
              <span v-for="(example, idx) in category.examples" :key="idx">{{ example }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 应用场景 -->
      <div class="card applications">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
          </svg>
          <h2>应用场景</h2>
        </div>
        <div class="applications-list">
          <div class="app-item" v-for="(app, index) in applications" :key="index">
            <div class="app-icon">
              <div class="icon-bg" :style="{'background': app.color}">
                {{ app.icon }}
              </div>
            </div>
            <div class="app-content">
              <h3>{{ app.title }}</h3>
              <p>{{ app.description }}</p>
              <div class="app-examples">
                <span v-for="(example, idx) in app.examples" :key="idx">{{ example }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优缺点对比 -->
      <div class="card pros-cons">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m16 18 6-6-6-6"></path>
            <path d="m8 6-6 6 6 6"></path>
          </svg>
          <h2>优缺点对比</h2>
        </div>
        <div class="comparison">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li v-for="(pro, index) in advantages" :key="'pro'+index">
                <span class="check-icon">✓</span> {{ pro }}
              </li>
            </ul>
          </div>
          <div class="divider"></div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li v-for="(con, index) in disadvantages" :key="'con'+index">
                <span class="cross-icon">✕</span> {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 树结构分类数据
const treeCategories = ref([
  {
    name: "二叉树",
    icon: "🌳",
    description: "每个节点最多有两个子节点",
    examples: ["二叉搜索树", "AVL树", "红黑树"]
  },
  {
    name: "平衡树",
    icon: "⚖️",
    description: "保持左右子树高度平衡的树结构",
    examples: ["AVL树", "红黑树", "B树"]
  },
  {
    name: "B树家族",
    icon: "🌲",
    description: "用于磁盘存储优化的平衡树",
    examples: ["B树", "B+树", "B*树"]
  },
  {
    name: "堆",
    icon: "📚",
    description: "基于堆属性组织的完全二叉树",
    examples: ["最大堆", "最小堆", "优先队列"]
  },
  {
    name: "前缀树",
    icon: "🔤",
    description: "用于高效字符串检索的树结构",
    examples: ["字典树", "后缀树", "基数树"]
  },
  {
    name: "空间划分树",
    icon: "🗺️",
    description: "用于空间数据组织和查询",
    examples: ["四叉树", "八叉树", "KD树"]
  },
  {
    name: "融合树",
    icon: "🧬",
    description: "结合多种树结构优势的复合树",
    examples: ["树堆", "Treap", "AVL树与红黑树组合"]
  },
  {
    name: "其他树结构",
    icon: "🌿",
    description: "特殊场景应用的树结构",
    examples: ["区间树", "线段树", "斐波那契堆"]
  }
]);

// 应用场景数据
const applications = ref([
  {
    title: "文件系统",
    icon: "📁",
    color: "#93c5fd",
    description: "树结构自然表示文件和目录的层级关系",
    examples: ["NTFS", "ext4", "HFS+", "ZFS"]
  },
  {
    title: "数据库索引",
    icon: "💾",
    color: "#a7f3d0",
    description: "B树家族优化磁盘数据访问效率",
    examples: ["MySQL索引", "PostgreSQL索引", "MongoDB索引"]
  },
  {
    title: "路由算法",
    icon: "📡",
    color: "#fde68a",
    description: "前缀树实现高效的路由表查找",
    examples: ["IP路由", "域名路由", "网络包转发"]
  },
  {
    title: "DOM结构",
    icon: "🌐",
    color: "#fbcfe8",
    description: "浏览器使用树结构表示HTML文档",
    examples: ["HTML解析", "DOM操作", "虚拟DOM"]
  },
  {
    title: "决策算法",
    icon: "🤖",
    color: "#c7d2fe",
    description: "决策树用于机器学习和数据分析",
    examples: ["分类模型", "回归分析", "AI决策系统"]
  },
  {
    title: "游戏开发",
    icon: "🎮",
    color: "#ddd6fe",
    description: "空间划分树优化游戏碰撞检测",
    examples: ["场景管理", "碰撞检测", "物理引擎"]
  }
]);

// 树结构优点
const advantages = ref([
  "高效的分层数据组织和管理",
  "快速搜索和检索（对数时间复杂度）",
  "递归结构简化算法实现",
  "自然表示层次关系和依赖",
  "灵活扩展节点和子树",
  "平衡树确保最佳性能",
  "多种变体适应不同应用场景"
]);

// 树结构缺点
const disadvantages = ref([
  "实现复杂度高于线性结构",
  "平衡操作增加额外开销",
  "内存开销较大（存储指针）",
  "不适合存储线性数据",
  "复杂的删除和旋转操作",
  "递归深度过大可能导致栈溢出",
  "学习和理解曲线较陡峭"
]);
</script>

<style lang="less" scoped>
.tree-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3748;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
}

.header {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(101, 119, 236, 0.08);
  padding: 2.5rem 2rem 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed, #2563eb);
    border-radius: 16px 16px 0 0;
  }

  .header-content {
    text-align: center;
    margin-bottom: 1.5rem;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin: 0 0 0.5rem;
      background: linear-gradient(90deg, #4f46e5, #2563eb);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: -0.015em;
    }

    p {
      font-size: 1.2rem;
      color: #4a5568;
      font-weight: 400;
      margin: 0 0 2.5rem;
    }
  }
}

.tree-visualization {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  margin-top: 2rem;

  .tree-diagram {
    position: relative;
    padding: 2rem 3rem;
    background: #f8fafc;
    border-radius: 16px;
    border: 1px solid #e2e8f0;

    .tree-diagram::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e2e8f0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.15;
      z-index: 0;
    }

    .node {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .node-content {
        background: white;
        border: 2px solid #4f46e5;
        border-radius: 8px;
        padding: 0.8rem 1.5rem;
        font-weight: 600;
        color: #4f46e5;
        box-shadow: 0 4px 6px rgba(79, 70, 229, 0.1);
        position: relative;
        z-index: 2;
        min-width: 100px;
        text-align: center;
        transition: all 0.3s ease;
      }

      &.root .node-content {
        background: #4f46e5;
        color: white;
        font-size: 1.1rem;
      }

      &.leaf .node-content {
        border-color: #10b981;
        color: #10b981;
      }
    }

    .children {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 1rem;
        background: #94a3b8;
      }
    }

    .branch {
      position: relative;
      padding: 0 1.5rem;

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 1.5rem;
        height: 2px;
        background: #94a3b8;
        transform: translateY(-1px);
      }

      &::before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 1rem;
        background: #94a3b8;
      }
    }
  }

  .tree-legend {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    min-width: 200px;

    .legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }

      .legend-node {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        margin-right: 0.8rem;
        border: 2px solid;

        &.root {
          background: #4f46e5;
          border-color: #4f46e5;
        }

        &.internal {
          border-color: #4f46e5;
        }

        &.leaf {
          border-color: #10b981;
        }
      }
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(101, 119, 236, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(101, 119, 236, 0.15);
  }

  .card-header {
    padding: 1.5rem 1.5rem 1rem;
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #f0f4f8, #f8fafc);
    border-bottom: 1px solid #e2e8f0;

    svg {
      margin-right: 0.8rem;
      stroke: #4f46e5;
    }

    h2 {
      margin: 0;
      font-size: 1.6rem;
      font-weight: 700;
      color: #1e293b;
    }
  }
}

.characteristics {
  .card-content {
    padding: 1.5rem;
  }

  .characteristic-item {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 0.8rem;
    background: #f8fafc;
    transition: background 0.3s;

    &:hover {
      background: #f1f5f9;
    }

    .char-icon {
      flex: 0 0 36px;
      height: 36px;
      background: #4f46e5;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-right: 1rem;
      font-size: 1.1rem;
    }

    h3 {
      margin: 0 0 0.3rem;
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.5;
    }
  }
}

.categories {
  .tree-category-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1.5rem;

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
    }
  }

  .category-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.3rem;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      border-color: #c7d2fe;
      background: white;
      box-shadow: 0 5px 15px rgba(99, 102, 241, 0.1);
    }

    .category-icon {
      font-size: 2rem;
      margin-bottom: 0.8rem;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.2rem;
      color: #1e293b;
    }

    p {
      margin: 0 0 1rem;
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.5;
    }

    .category-examples {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      span {
        background: #eef2ff;
        color: #4f46e5;
        font-size: 0.8rem;
        padding: 0.3rem 0.7rem;
        border-radius: 20px;
        font-family: 'Fira Code', monospace;
      }
    }
  }
}

.applications {
  .applications-list {
    padding: 1.5rem;
  }

  .app-item {
    display: flex;
    padding: 1.2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    background: #f8fafc;
    transition: background 0.3s;

    &:hover {
      background: #f1f5f9;
    }

    .app-icon {
      flex: 0 0 60px;
      margin-right: 1.5rem;

      .icon-bg {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
      }
    }

    .app-content {
      flex: 1;

      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.15rem;
        color: #1e293b;
      }

      p {
        margin: 0 0 1rem;
        font-size: 0.95rem;
        color: #475569;
        line-height: 1.5;
      }

      .app-examples {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        span {
          background: #e0e7ff;
          color: #4f46e5;
          font-size: 0.8rem;
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          font-family: 'Fira Code', monospace;
        }
      }
    }
  }
}

.pros-cons {
  grid-column: span 2;

  @media (max-width: 900px) {
    grid-column: span 1;
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      padding: 1.5rem;
    }

    .pros, .cons {
      padding: 1rem;

      h3 {
        margin: 0 0 1rem;
        font-size: 1.3rem;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 0.7rem;
          background-size: contain;
        }
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      li {
        margin-bottom: 0.8rem;
        position: relative;
        line-height: 1.5;
        color: #475569;
        padding-left: 1.8rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .pros {
      h3 {
        color: #10b981;

        &::before {
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'%3E%3C/path%3E%3Cpolyline points='22 4 12 14.01 9 11.01'%3E%3C/polyline%3E%3C/svg%3E");
        }
      }

      .check-icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background: #d1fae5;
        color: #10b981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }

    .cons {
      h3 {
        color: #ef4444;

        &::before {
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='15' y1='9' x2='9' y2='15'%3E%3C/line%3E%3Cline x1='9' y1='9' x2='15' y2='15'%3E%3C/line%3E%3C/svg%3E");
        }
      }

      .cross-icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background: #fee2e2;
        color: #ef4444;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }

    .divider {
      width: 2px;
      background: #e2e8f0;
      margin: 0 2rem;

      @media (max-width: 768px) {
        width: 100%;
        height: 2px;
        margin: 1.5rem 0;
      }
    }
  }
}
</style>
