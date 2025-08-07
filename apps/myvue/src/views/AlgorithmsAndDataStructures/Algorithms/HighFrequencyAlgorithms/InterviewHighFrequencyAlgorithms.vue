<template>
  <div class="algorithm-container">
    <header class="header">
      <h1>面试<span class="highlight">高频算法</span>指南</h1>
      <p class="subtitle">掌握这些核心算法，提升面试成功率</p>
    </header>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">92%</div>
        <div class="stat-label">大厂面试涉及率</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">85%</div>
        <div class="stat-label">算法题命中率</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">76%</div>
        <div class="stat-label">面试通过率提升</div>
      </div>
    </div>

    <div class="content">
      <div class="algorithms">
        <!-- 数组和字符串类算法 -->
        <section class="category">
          <h2 class="category-title">
            <i class="icon fas fa-list-ol"></i> 数组与字符串
          </h2>

          <div class="algorithm-card" v-for="algo in algorithmMap?.array.algorithms" :key="algo.title">
            <div class="algorithm-header">
              <h3>{{ algo.title }}</h3>
              <span class="difficulty" :class="algo.difficulty">{{ algo.difficulty }}</span>
            </div>

            <div class="algorithm-content">
              <div class="description">
                <p><strong>问题描述：</strong>{{ algo.description }}</p>
                <p><strong>解题思路：</strong>{{ algo.thought }}</p>
                <p><strong>时间复杂度：</strong>{{ algo.complexity }}</p>
              </div>

              <div class="code-sample">
                <pre><code>{{ algo.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 链表类算法 -->
        <section class="category">
          <h2 class="category-title">
            <i class="icon fas fa-link"></i> 链表
          </h2>

          <div class="algorithm-card" v-for="algo in algorithmMap?.linkedList.algorithms" :key="algo.title">
            <div class="algorithm-header">
              <h3>{{ algo.title }}</h3>
              <span class="difficulty" :class="algo.difficulty">{{ algo.difficulty }}</span>
            </div>

            <div class="algorithm-content">
              <div class="description">
                <p><strong>问题描述：</strong>{{ algo.description }}</p>
                <p><strong>解题思路：</strong>{{ algo.thought }}</p>
                <p><strong>时间复杂度：</strong>{{ algo.complexity }}</p>
              </div>

              <div class="code-sample">
                <pre><code>{{ algo.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 树与图类算法 -->
        <section class="category">
          <h2 class="category-title">
            <i class="icon fas fa-tree"></i> 树与图
          </h2>

          <div class="algorithm-card" v-for="algo in algorithmMap?.tree.algorithms" :key="algo.title">
            <div class="algorithm-header">
              <h3>{{ algo.title }}</h3>
              <span class="difficulty" :class="algo.difficulty">{{ algo.difficulty }}</span>
            </div>

            <div class="algorithm-content">
              <div class="description">
                <p><strong>问题描述：</strong>{{ algo.description }}</p>
                <p><strong>解题思路：</strong>{{ algo.thought }}</p>
                <p><strong>时间复杂度：</strong>{{ algo.complexity }}</p>
              </div>

              <div class="code-sample">
                <pre><code>{{ algo.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 动态规划类算法 -->
        <section class="category">
          <h2 class="category-title">
            <i class="icon fas fa-chart-line"></i> 动态规划
          </h2>

          <div class="algorithm-card" v-for="algo in algorithmMap?.dynamicProgramming.algorithms" :key="algo.title">
            <div class="algorithm-header">
              <h3>{{ algo.title }}</h3>
              <span class="difficulty" :class="algo.difficulty">{{ algo.difficulty }}</span>
            </div>

            <div class="algorithm-content">
              <div class="description">
                <p><strong>问题描述：</strong>{{ algo.description }}</p>
                <p><strong>解题思路：</strong>{{ algo.thought }}</p>
                <p><strong>时间复杂度：</strong>{{ algo.complexity }}</p>
              </div>

              <div class="code-sample">
                <pre><code>{{ algo.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 其他重要算法 -->
        <section class="category">
          <h2 class="category-title">
            <i class="icon fas fa-shapes"></i> 其他重要算法
          </h2>

          <div class="algorithm-card" v-for="algo in algorithmMap?.other.algorithms" :key="algo.title">
            <div class="algorithm-header">
              <h3>{{ algo.title }}</h3>
              <span class="difficulty" :class="algo.difficulty">{{ algo.difficulty }}</span>
            </div>

            <div class="algorithm-content">
              <div class="description">
                <p><strong>问题描述：</strong>{{ algo.description }}</p>
                <p><strong>解题思路：</strong>{{ algo.thought }}</p>
                <p><strong>时间复杂度：</strong>{{ algo.complexity }}</p>
              </div>

              <div class="code-sample">
                <pre><code>{{ algo.code }}</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="sidebar">
        <div class="tip-box">
          <h3><i class="fas fa-lightbulb"></i> 面试技巧</h3>
          <ul>
            <li>先理清思路再写代码</li>
            <li>考虑边界条件和特殊情况</li>
            <li>主动分析时间/空间复杂度</li>
            <li>尝试优化解法（如从O(n²)到O(n)）</li>
            <li>与面试官保持沟通</li>
          </ul>
        </div>

        <div class="tip-box">
          <h3><i class="fas fa-star"></i> 高频考点</h3>
          <ul>
            <li>双指针技巧</li>
            <li>滑动窗口算法</li>
            <li>深度优先搜索</li>
            <li>广度优先搜索</li>
            <li>回溯算法</li>
            <li>分治思想</li>
          </ul>
        </div>

        <div class="tip-box">
          <h3><i class="fas fa-book"></i> 学习资源</h3>
          <ul>
            <li>《剑指Offer》</li>
            <li>LeetCode热门题目</li>
            <li>《算法导论》核心章节</li>
            <li>《编程珠玑》</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2023 面试算法指南 | 数据来源于Top 10科技公司面试题库分析</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';


interface Algorithm {
  title: string;
  difficulty: string;
  description: string;
  thought: string;
  complexity: string;
  code: string;
}

interface Item {
  name: string;
  algorithms: Algorithm[];
}

interface Data {
  array: Item;
  linkedList: Item;
  tree: Item;
  dynamicProgramming: Item;
  other: Item;
  [key: string]: Item;
}


const algorithmMap = ref<null | Data>(null);


onMounted(async () => {
  const { default: data } = await import('./JSON/Algorithms.json')
  algorithmMap.value = data as unknown as Data;
});

</script>

<style lang="less" scoped>



.algorithm-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .stat-card {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: #3498db;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        color: #7f8c8d;
        font-size: 0.9rem;
      }
    }
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .category {
    margin-bottom: 2.5rem;

    .category-title {
      font-size: 1.6rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eef2f7;
      color: #2c3e50;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.8rem;
        color: #3498db;
      }
    }
  }

  .algorithm-card {
    background: white;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    .algorithm-header {
      padding: 1.2rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #eef2f7;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 1.3rem;
        margin: 0;
        color: #2c3e50;
      }

      .difficulty {
        font-size: 0.85rem;
        font-weight: 600;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;

        &.easy {
          background: rgba(46, 204, 113, 0.15);
          color: #27ae60;
        }

        &.medium {
          background: rgba(241, 196, 15, 0.15);
          color: #f39c12;
        }

        &.hard {
          background: rgba(231, 76, 60, 0.15);
          color: #c0392b;
        }
      }
    }

    .algorithm-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      padding: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .description {
        p {
          margin-bottom: 1rem;
          line-height: 1.6;
          color: #4a5568;

          strong {
            color: #2c3e50;
          }
        }
      }

      .code-sample {
        background: #2c3e50;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;

        pre {
          margin: 0;

          code {
            font-family: 'Fira Code', monospace;
            color: #e0e0e0;
            font-size: 0.9rem;
            line-height: 1.5;

            .hljs-keyword {
              color: #ff9a76;
            }

            .hljs-built_in {
              color: #82aaff;
            }

            .hljs-string {
              color: #c3e88d;
            }

            .hljs-number {
              color: #f78c6c;
            }

            .hljs-function {
              color: #82aaff;
            }
          }
        }
      }
    }
  }

  .sidebar {
    @media (max-width: 900px) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .tip-box {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 1rem;
        color: #2c3e50;
        display: flex;
        align-items: center;

        i {
          margin-right: 0.7rem;
          color: #3498db;
        }
      }

      ul {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.8rem;
          color: #4a5568;
          line-height: 1.5;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@media (max-width: 768px) {
  .algorithm-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
