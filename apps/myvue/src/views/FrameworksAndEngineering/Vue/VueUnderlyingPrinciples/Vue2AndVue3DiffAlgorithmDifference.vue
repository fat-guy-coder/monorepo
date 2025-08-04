<template>
  <div class="diff-improvement-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-bolt"></i> Vue3 Diff算法性能提升</h1>
      <p class="subtitle">探索Vue3如何通过创新优化超越Vue2的渲染性能</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <!-- 概述卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-chart-line"></i>
          <h2>性能提升概述</h2>
        </div>
        <div class="card-content">
          <div class="performance-summary">
            <div class="stats">
              <div class="stat">
                <div class="stat-value">2-5x</div>
                <div class="stat-label">渲染速度提升</div>
              </div>
              <div class="stat">
                <div class="stat-value">60%</div>
                <div class="stat-label">内存占用减少</div>
              </div>
              <div class="stat">
                <div class="stat-value">90%</div>
                <div class="stat-label">不必要的操作减少</div>
              </div>
            </div>

            <div class="comparison-chart">
              <div class="chart-bars">
                <div class="chart-bar vue2" :style="{ height: '70%' }">
                  <div class="bar-label">Vue2</div>
                  <div class="bar-value">100%</div>
                </div>
                <div class="chart-bar vue3" :style="{ height: '30%' }">
                  <div class="bar-label">Vue3</div>
                  <div class="bar-value">30%</div>
                </div>
              </div>
              <div class="chart-title">Diff操作量对比</div>
            </div>
          </div>

          <div class="key-improvements">
            <h3>Vue3 Diff算法核心改进：</h3>
            <div class="improvement-grid">
              <div class="improvement">
                <div class="icon">
                  <i class="fas fa-arrow-up"></i>
                </div>
                <h4>静态提升</h4>
                <p>静态节点被提升，避免重复Diff</p>
              </div>
              <div class="improvement">
                <div class="icon">
                  <i class="fas fa-flag"></i>
                </div>
                <h4>补丁标志</h4>
                <p>标记动态节点，精准更新</p>
              </div>
              <div class="improvement">
                <div class="icon">
                  <i class="fas fa-th"></i>
                </div>
                <h4>块树优化</h4>
                <p>树结构优化，减少遍历深度</p>
              </div>
              <div class="improvement">
                <div class="icon">
                  <i class="fas fa-bezier-curve"></i>
                </div>
                <h4>最长递增子序列</h4>
                <p>高效处理列表变动</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 静态提升 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-arrow-up"></i>
          <h2>静态提升（Static Hoisting）</h2>
        </div>
        <div class="card-content">
          <div class="visual-comparison">
            <div class="vue2-approach">
              <h3><i class="fab fa-vuejs vue2-icon"></i> Vue2 处理静态节点</h3>
              <div class="node-tree">
                <div class="node static">静态节点</div>
                <div class="node">动态节点</div>
                <div class="node static">静态节点</div>
                <div class="node">动态节点</div>
              </div>
              <div class="process">
                <div class="step">每次渲染都进行Diff</div>
                <div class="step">重复创建/销毁</div>
                <div class="step">资源浪费</div>
              </div>
            </div>

            <div class="arrow">
              <i class="fas fa-long-arrow-alt-right"></i>
            </div>

            <div class="vue3-approach">
              <h3><i class="fab fa-vuejs vue3-icon"></i> Vue3 静态提升</h3>
              <div class="node-tree">
                <div class="static-container">
                  <div class="node static">静态节点</div>
                  <div class="node static">静态节点</div>
                </div>
                <div class="dynamic-container">
                  <div class="node">动态节点</div>
                  <div class="node">动态节点</div>
                </div>
              </div>
              <div class="process">
                <div class="step">编译时提取静态节点</div>
                <div class="step">跳过Diff过程</div>
                <div class="step">直接复用实例</div>
              </div>
            </div>
          </div>

          <div class="code-comparison">
            <div class="code-example">
              <h4>Vue2 模板：</h4>
              <pre class="code-block"><code>&lt;div&gt;
  &lt;div&gt;静态标题&lt;/div&gt; &lt;!-- 每次重新渲染 --&gt;
  &lt;div&gt;&#123;&#123; dynamicContent &#125;&#125;&lt;/div&gt;
&lt;/div&gt;</code></pre>
            </div>

            <div class="code-example">
              <h4>Vue3 模板：</h4>
              <pre class="code-block"><code>&lt;div&gt;
  &lt;!-- 被提升的静态节点 --&gt;
  &lt;div&gt;静态标题&lt;/div&gt;

  &lt;div&gt;&#123;&#123; dynamicContent &#125;&#125;&lt;/div&gt;
&lt;/div&gt;</code></pre>
            </div>
          </div>

          <div class="performance-impact">
            <h4>性能影响：</h4>
            <div class="impact-stats">
              <div class="impact">
                <div class="impact-value">60-90%</div>
                <div class="impact-label">静态节点Diff跳过</div>
              </div>
              <div class="impact">
                <div class="impact-value">40%</div>
                <div class="impact-label">内存占用减少</div>
              </div>
              <div class="impact">
                <div class="impact-value">2x</div>
                <div class="impact-label">渲染速度提升</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 补丁标志 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-flag"></i>
          <h2>补丁标志（Patch Flags）</h2>
        </div>
        <div class="card-content">
          <div class="explanation">
            <p>Vue3 在编译阶段为每个动态节点添加补丁标志，精确标识需要更新的内容类型。</p>
            <div class="flags-grid">
              <div class="flag">
                <div class="flag-number">1</div>
                <div class="flag-desc">文本变化</div>
              </div>
              <div class="flag">
                <div class="flag-number">2</div>
                <div class="flag-desc">class变化</div>
              </div>
              <div class="flag">
                <div class="flag-number">4</div>
                <div class="flag-desc">style变化</div>
              </div>
              <div class="flag">
                <div class="flag-number">8</div>
                <div class="flag-desc">props变化</div>
              </div>
              <div class="flag">
                <div class="flag-number">16</div>
                <div class="flag-desc">完整props变化</div>
              </div>
            </div>
          </div>

          <div class="visual-example">
            <div class="node">
              <div class="node-header">节点 (div)</div>
              <div class="node-props">
                <div>PatchFlag: <span class="flag-value">9</span> (TEXT + PROPS)</div>
                <div>动态属性: class, id</div>
              </div>
            </div>
            <div class="diff-process">
              <div class="step">1. 检查PatchFlag</div>
              <div class="step">2. 仅更新class和id</div>
              <div class="step">3. 跳过其他属性检查</div>
            </div>
          </div>

          <div class="code-demo">
            <h4>实际编译结果：</h4>
            <pre class="code-block"><code>import { createVNode as _createVNode } from "vue"

export function render(_ctx, _cache) {
  return _createVNode("div", {
    class: _ctx.dynamicClass,
    id: _ctx.dynamicId
  }, null, 8 /* PROPS */, ["class", "id"])
}</code></pre>
          </div>

          <div class="benefits">
            <h4>性能优势：</h4>
            <ul>
              <li>减少属性遍历次数</li>
              <li>避免不必要的DOM操作</li>
              <li>更精确的更新机制</li>
              <li>平均减少70%的属性比较操作</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 块树优化 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-th"></i>
          <h2>块树优化（Block Tree）</h2>
        </div>
        <div class="card-content">
          <div class="concept">
            <p>Vue3 引入"块"概念，将模板划分为动态和静态区块，优化Diff过程。</p>
            <div class="block-visual">
              <div class="block">
                <div class="block-header">根块</div>
                <div class="static-nodes">
                  <div class="node">静态节点</div>
                  <div class="node">静态节点</div>
                </div>
                <div class="dynamic-block">
                  <div class="block-header">动态块</div>
                  <div class="node">动态节点</div>
                  <div class="node">动态节点</div>
                </div>
              </div>
            </div>
          </div>

          <div class="comparison">
            <div class="vue2-diff">
              <h4>Vue2 Diff过程：</h4>
              <div class="process">
                <div class="step">遍历整个虚拟DOM树</div>
                <div class="step">比较每个节点的属性和子节点</div>
                <div class="step">时间复杂度: O(n)</div>
              </div>
            </div>

            <div class="vue3-diff">
              <h4>Vue3 Block Tree Diff：</h4>
              <div class="process">
                <div class="step">跳过静态块</div>
                <div class="step">仅比较动态块内的节点</div>
                <div class="step">时间复杂度: O(动态节点数量)</div>
              </div>
            </div>
          </div>

          <div class="performance-data">
            <h4>性能对比：</h4>
            <div class="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>节点类型</th>
                    <th>Vue2 Diff操作</th>
                    <th>Vue3 Diff操作</th>
                    <th>减少比例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>静态节点</td>
                    <td>100%</td>
                    <td>0%</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>条件分支节点</td>
                    <td>100%</td>
                    <td>仅变动分支</td>
                    <td>50-80%</td>
                  </tr>
                  <tr>
                    <td>列表节点</td>
                    <td>100%</td>
                    <td>仅动态部分</td>
                    <td>60-90%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 最长递增子序列 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-bezier-curve"></i>
          <h2>最长递增子序列（LIS）优化</h2>
        </div>
        <div class="card-content">
          <div class="explanation">
            <p>Vue3 在列表更新时使用最长递增子序列算法，最大化节点复用，减少DOM操作。</p>
            <div class="algorithm">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">标记新旧列表中的相同节点</div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">构建索引映射关系</div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">计算最长递增子序列</div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">仅移动非LIS节点</div>
              </div>
            </div>
          </div>

          <div class="visual-demo">
            <div class="sequence">
              <h4>列表更新示例：</h4>
              <div class="old-list">
                <div class="item" v-for="item in oldItems" :key="item.id" :class="item.status">
                  {{ item.value }}
                </div>
              </div>
              <div class="arrow">
                <i class="fas fa-arrow-down"></i>
              </div>
              <div class="new-list">
                <div class="item" v-for="item in newItems" :key="item.id" :class="item.status">
                  {{ item.value }}
                </div>
              </div>
            </div>

            <div class="lis-info">
              <div class="lis-result">
                <h5>最长递增子序列:</h5>
                <div class="lis-items">
                  <div class="lis-item" v-for="id in lis" :key="id">
                    {{ id }}
                  </div>
                </div>
              </div>
              <div class="movement">
                <h5>节点移动操作:</h5>
                <div class="move" v-for="move in moves" :key="move.id">
                  移动 {{ move.id }} 到位置 {{ move.to }}
                </div>
              </div>
            </div>
          </div>

          <div class="performance-benefits">
            <h4>性能提升：</h4>
            <div class="benefit-cards">
              <div class="benefit-card">
                <div class="benefit-value">O(n log n)</div>
                <div class="benefit-label">时间复杂度</div>
                <div class="benefit-desc">相比Vue2的O(n²)显著优化</div>
              </div>
              <div class="benefit-card">
                <div class="benefit-value">70-90%</div>
                <div class="benefit-label">DOM操作减少</div>
                <div class="benefit-desc">最大化节点复用率</div>
              </div>
              <div class="benefit-card">
                <div class="benefit-value">2-5x</div>
                <div class="benefit-label">列表渲染加速</div>
                <div class="benefit-desc">大型列表性能显著提升</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结对比 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-trophy"></i>
          <h2>Vue3 vs Vue2 Diff算法总结</h2>
        </div>
        <div class="card-content">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>优化点</th>
                  <th>Vue2</th>
                  <th>Vue3</th>
                  <th>性能提升</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>静态节点处理</td>
                  <td>每次重新Diff</td>
                  <td>编译时提升，跳过Diff</td>
                  <td>减少60-90%操作</td>
                </tr>
                <tr>
                  <td>动态节点更新</td>
                  <td>全属性比较</td>
                  <td>补丁标志精准更新</td>
                  <td>减少70%属性检查</td>
                </tr>
                <tr>
                  <td>树结构遍历</td>
                  <td>完整树遍历</td>
                  <td>块树局部更新</td>
                  <td>减少50%+遍历</td>
                </tr>
                <tr>
                  <td>列表更新算法</td>
                  <td>双端比较(O(n²))</td>
                  <td>LIS算法(O(n log n))</td>
                  <td>大型列表快5x+</td>
                </tr>
                <tr>
                  <td>内存占用</td>
                  <td>高</td>
                  <td>低</td>
                  <td>减少40%内存</td>
                </tr>
                <tr>
                  <td>编译优化</td>
                  <td>有限</td>
                  <td>深度优化</td>
                  <td>运行时负担减少</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="conclusion">
            <h3>总结：</h3>
            <p>Vue3的Diff算法通过编译时优化（静态提升、补丁标志）和运行时优化（块树、LIS算法），实现了全方位的性能提升：</p>
            <ul>
              <li>渲染速度提升2-5倍</li>
              <li>内存占用减少40%</li>
              <li>DOM操作减少90%</li>
              <li>大型应用响应性显著改善</li>
              <li>更流畅的用户体验</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Vue3 Diff算法性能优化基础介绍 | 基于Vue3和TypeScript实现 | 前端性能优化实践</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 最长递增子序列示例数据
const oldItems = ref([
  { id: 1, value: 'A', status: 'moved' },
  { id: 2, value: 'B', status: 'stable' },
  { id: 3, value: 'C', status: 'stable' },
  { id: 4, value: 'D', status: 'moved' },
]);

const newItems = ref([
  { id: 4, value: 'D', status: 'moved' },
  { id: 2, value: 'B', status: 'stable' },
  { id: 3, value: 'C', status: 'stable' },
  { id: 1, value: 'A', status: 'moved' },
]);

const lis = ref([2, 3]); // 最长递增子序列索引
const moves = ref([
  { id: 4, to: 0 },
  { id: 1, to: 3 }
]);
</script>

<style lang="less" scoped>
@primary: #4361ee;
@primary-light: #4895ef;
@secondary: #3f37c9;
@warning: #ff0000;
@success: #4cc9f0;
@vue2-color: #42b983;
@vue3-color: #41b883;
@text: #2b2d42;
@text-light: #8d99ae;
@background: #f8f9fa;
@card-bg: #ffffff;
@border: #e9ecef;
@shadow: rgba(149, 157, 165, 0.1);

.diff-improvement-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: @background;
  color: @text;
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary, @secondary);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px @shadow;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .subtitle {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px @shadow;
  border: 1px solid @border;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(149, 157, 165, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @primary;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.6rem;
      margin: 0;
    }

    i {
      font-size: 1.5rem;
    }
  }
}

.performance-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 25px;

  .stats {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    min-width: 300px;

    .stat {
      background: rgba(@primary, 0.05);
      border-radius: 8px;
      padding: 20px;
      text-align: center;

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: @primary;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }

  .comparison-chart {
    flex: 1;
    min-width: 300px;

    .chart-bars {
      display: flex;
      align-items: flex-end;
      gap: 40px;
      height: 200px;
      border-bottom: 2px solid @border;
      padding: 0 20px 20px;
      justify-content: center;

      .chart-bar {
        width: 80px;
        position: relative;
        transition: height 1s ease;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.vue2 {
          background: linear-gradient(to top, @vue2-color, lighten(@vue2-color, 20%));
        }

        &.vue3 {
          background: linear-gradient(to top, @vue3-color, lighten(@vue3-color, 20%));
        }

        .bar-label {
          position: absolute;
          top: -30px;
          font-weight: 600;
          width: 100%;
          text-align: center;
        }

        .bar-value {
          position: absolute;
          bottom: -30px;
          font-weight: 600;
          width: 100%;
          text-align: center;
        }
      }
    }

    .chart-title {
      text-align: center;
      margin-top: 15px;
      font-weight: 600;
      color: @text;
    }
  }
}

.key-improvements {
  margin-top: 30px;

  h3 {
    color: @primary;
    margin-bottom: 20px;
  }

  .improvement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .improvement {
      text-align: center;
      padding: 20px;
      background: rgba(@primary, 0.05);
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .icon {
        width: 60px;
        height: 60px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        font-size: 1.5rem;
      }

      h4 {
        margin: 0 0 10px 0;
        color: @text;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }
}

.visual-comparison {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 20px 0;
  justify-content: center;

  .vue2-approach,
  .vue3-approach {
    flex: 1;
    min-width: 300px;

    h3 {
      text-align: center;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .vue2-icon {
      color: @vue2-color;
    }

    .vue3-icon {
      color: @vue3-color;
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: @text-light;
  }

  .node-tree {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;
    padding: 20px;

    .static-container,
    .dynamic-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .node {
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;

    &.static {
      background: rgba(@success, 0.2);
      border: 1px dashed @success;
    }

    &.dynamic {
      background: rgba(@primary, 0.2);
      border: 1px dashed @primary;
    }
  }

  .process {
    margin-top: 20px;

    .step {
      padding: 10px;
      border-left: 3px solid @primary;
      background: rgba(@primary, 0.05);
      margin-bottom: 8px;
      border-radius: 0 4px 4px 0;
    }
  }
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 30px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .code-example {
    h4 {
      margin: 0 0 10px 0;
      color: @text;
    }
  }
}

.performance-impact {
  margin-top: 25px;

  .impact-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;

    .impact {
      background: rgba(@primary, 0.05);
      border-radius: 8px;
      padding: 15px;
      text-align: center;

      .impact-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary;
      }

      .impact-label {
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }
}

.explanation {
  margin-bottom: 25px;

  .flags-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-top: 20px;

    .flag {
      text-align: center;
      padding: 15px;
      background: rgba(@primary, 0.05);
      border-radius: 8px;

      .flag-number {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary;
        margin-bottom: 5px;
      }
    }
  }
}

.visual-example {
  display: flex;
  gap: 30px;
  margin: 30px 0;
  flex-wrap: wrap;

  .node {
    flex: 1;
    min-width: 250px;
    border: 1px solid @border;
    border-radius: 8px;
    overflow: hidden;

    .node-header {
      background: @primary;
      color: white;
      padding: 10px;
      font-weight: 600;
      text-align: center;
    }

    .node-props {
      padding: 15px;

      .flag-value {
        display: inline-block;
        background: @primary;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        text-align: center;
        line-height: 25px;
        font-weight: 600;
      }
    }
  }

  .diff-process {
    flex: 1;
    min-width: 250px;

    .step {
      padding: 12px 15px;
      margin-bottom: 10px;
      background: rgba(@success, 0.1);
      border-left: 3px solid @success;
      border-radius: 0 4px 4px 0;
    }
  }
}

.code-demo {
  margin: 25px 0;
}

.benefits {
  margin-top: 20px;

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 20px;

      &::before {
        content: "✓";
        color: @success;
        position: absolute;
        left: 0;
        font-weight: bold;
      }
    }
  }
}

.concept {
  margin-bottom: 25px;

  .block-visual {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .block {
      border: 2px solid @primary;
      border-radius: 8px;
      padding: 20px;
      max-width: 400px;

      .block-header {
        background: @primary;
        color: white;
        padding: 8px;
        text-align: center;
        border-radius: 4px;
        margin-bottom: 15px;
        font-weight: 600;
      }

      .static-nodes,
      .dynamic-block {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 15px;
      }

      .dynamic-block {
        border: 1px dashed @primary;
        border-radius: 8px;
        padding: 15px;
      }
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 30px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .vue2-diff,
  .vue3-diff {
    border-radius: 8px;
    padding: 20px;

    h4 {
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  .vue2-diff {
    background: rgba(@vue2-color, 0.05);
    border: 1px solid rgba(@vue2-color, 0.3);
  }

  .vue3-diff {
    background: rgba(@vue3-color, 0.05);
    border: 1px solid rgba(@vue3-color, 0.3);
  }

  .process {
    .step {
      margin-bottom: 10px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 4px;
    }
  }
}

.performance-data {
  margin-top: 30px;

  .performance-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 12px 15px;
        border: 1px solid @border;
        text-align: left;
      }

      th {
        background: rgba(@primary, 0.1);
        color: @primary;
        font-weight: 600;
      }

      tr:nth-child(even) {
        background: rgba(@primary, 0.03);
      }
    }
  }
}

.visual-demo {
  margin: 30px 0;

  .sequence {
    text-align: center;

    .old-list,
    .new-list {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
      flex-wrap: wrap;

      .item {
        padding: 12px 20px;
        border-radius: 30px;
        background: rgba(@primary, 0.1);
        font-weight: 500;

        &.stable {
          background: rgba(@success, 0.2);
        }

        &.moved {
          background: rgba(@warning, 0.2);
        }
      }
    }

    .arrow {
      font-size: 1.5rem;
      color: @text-light;
    }
  }

  .lis-info {
    display: flex;
    gap: 30px;
    margin-top: 25px;
    flex-wrap: wrap;

    .lis-result,
    .movement {
      flex: 1;
      min-width: 250px;
      background: rgba(@primary, 0.05);
      border-radius: 8px;
      padding: 15px;

      h5 {
        margin-top: 0;
        color: @primary;
      }
    }

    .lis-items {
      display: flex;
      gap: 10px;

      .lis-item {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: @primary;
        color: white;
        border-radius: 50%;
        font-weight: 600;
      }
    }

    .move {
      padding: 8px;
      margin-bottom: 8px;
      background: rgba(@warning, 0.1);
      border-radius: 4px;
    }
  }
}

.performance-benefits {
  margin-top: 30px;

  .benefit-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .benefit-card {
      background: rgba(@primary, 0.05);
      border-radius: 8px;
      padding: 20px;
      text-align: center;

      .benefit-value {
        font-size: 2rem;
        font-weight: 700;
        color: @primary;
        margin-bottom: 10px;
      }

      .benefit-label {
        font-weight: 600;
        margin-bottom: 5px;
      }

      .benefit-desc {
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 30px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      border: 1px solid @border;
    }

    th {
      background: rgba(@primary, 0.1);
      color: @primary;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: rgba(@primary, 0.03);
    }
  }
}

.conclusion {
  background: rgba(@success, 0.05);
  border-left: 4px solid @success;
  border-radius: 0 8px 8px 0;
  padding: 20px;

  h3 {
    margin-top: 0;
    color: @success;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 20px;

      &::before {
        content: "•";
        color: @success;
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }
}

.code-block {
  background: #2b2d42;
  color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 15px 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-light;
  font-size: 0.9rem;
  border-top: 1px solid @border;
}
</style>
