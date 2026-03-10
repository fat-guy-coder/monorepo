<template>
  <div class="dp-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="title-container">
        <h1><i class="icon fas fa-project-diagram"></i> JavaScript 动态规划基础介绍</h1>
        <p>掌握核心思想与实现技巧，解决复杂优化问题</p>
      </div>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">O(n)</div>
          <div class="stat-label">时间复杂度</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">O(n)</div>
          <div class="stat-label">空间复杂度</div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 概念解析 -->
      <div class="section">
        <div class="section-header">
          <i class="fas fa-lightbulb"></i>
          <h2>概念解析</h2>
        </div>
        <div class="section-content">
          <p><span class="highlight">动态规划（Dynamic
              Programming）</span>是一种用于解决复杂优化问题的算法设计技术，通过将问题分解为相互重叠的子问题，并存储子问题的解以避免重复计算。</p>

          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-sitemap"></i>
              </div>
              <h3>最优子结构</h3>
              <p>问题的最优解包含其子问题的最优解</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-layer-group"></i>
              </div>
              <h3>重叠子问题</h3>
              <p>问题可以分解为多次重复出现的子问题</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-lock"></i>
              </div>
              <h3>无后效性</h3>
              <p>子问题的解一旦确定，就不会再改变</p>
            </div>
          </div>

          <div class="applications">
            <h3>常见应用场景：</h3>
            <div class="tags">
              <span class="tag">最短路径问题</span>
              <span class="tag">背包问题</span>
              <span class="tag">编辑距离</span>
              <span class="tag">最长公共子序列</span>
              <span class="tag">股票买卖问题</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 算法思路 -->
      <div class="section">
        <div class="section-header">
          <i class="fas fa-cogs"></i>
          <h2>算法思路</h2>
        </div>
        <div class="section-content">
          <p>动态规划算法通常遵循以下步骤：</p>

          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>定义状态</h3>
                <p>确定DP数组及其下标的含义</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>状态转移方程</h3>
                <p>确定状态之间的关系（递推公式）</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>初始化</h3>
                <p>确定初始条件（边界值）</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>确定遍历顺序</h3>
                <p>选择正确的计算顺序</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>推导DP数组</h3>
                <p>验证算法的正确性</p>
              </div>
            </div>
          </div>

          <div class="implementation-types">
            <h3>实现方式：</h3>
            <div class="type-card">
              <div class="type-header">
                <i class="fas fa-arrow-circle-down"></i>
                <h4>自顶向下（记忆化搜索）</h4>
              </div>
              <p>递归 + 备忘录，从原始问题开始向下分解</p>
            </div>
            <div class="type-card">
              <div class="type-header">
                <i class="fas fa-arrow-circle-up"></i>
                <h4>自底向上（迭代）</h4>
              </div>
              <p>使用DP数组迭代计算，从基础子问题开始</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 示例代码 -->
      <div class="section">
        <div class="section-header">
          <i class="fas fa-code"></i>
          <h2>示例代码</h2>
        </div>
        <div class="section-content">
          <div class="tabs">
            <button :class="['tab', { active: activeTab === 'fibonacci' }]" @click="activeTab = 'fibonacci'">
              斐波那契数列
            </button>
            <button :class="['tab', { active: activeTab === 'knapsack' }]" @click="activeTab = 'knapsack'">
              0-1背包问题
            </button>
          </div>

          <div v-if="activeTab === 'fibonacci'" class="code-section">
            <div class="code-block">
              <div class="code-header">
                <div class="code-title">斐波那契数列 - 动态规划解法</div>
                <button class="copy-btn" @click="copyCode(fibonacciCode)">复制代码</button>
              </div>
              <pre><code>{{ fibonacciCode }}</code></pre>
            </div>

            <div class="explanation">
              <h3>斐波那契数列解析</h3>
              <p>斐波那契数列是最经典的动态规划入门问题：</p>
              <p class="formula">F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) (n ≥ 2)</p>

              <div class="dp-table">
                <div class="dp-row">
                  <div class="dp-cell header">i</div>
                  <div v-for="i in 6" :key="'header' + i" class="dp-cell header">{{ i - 1 }}</div>
                </div>
                <div class="dp-row">
                  <div class="dp-cell header">F(i)</div>
                  <div v-for="(val, idx) in fibValues" :key="'val' + idx"
                    :class="['dp-cell', { highlight: idx === 5 }]">
                    {{ val }}
                  </div>
                </div>
              </div>

              <div class="algorithm-steps">
                <h4>动态规划解法步骤：</h4>
                <ol>
                  <li><strong>状态定义</strong>：dp[i] 表示第 i 个斐波那契数</li>
                  <li><strong>状态转移方程</strong>：dp[i] = dp[i-1] + dp[i-2]</li>
                  <li><strong>初始化</strong>：dp[0] = 0, dp[1] = 1</li>
                  <li><strong>计算顺序</strong>：从 i=2 到 i=n 顺序计算</li>
                </ol>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'knapsack'" class="code-section">
            <div class="code-block">
              <div class="code-header">
                <div class="code-title">0-1背包问题 - 动态规划解法</div>
                <button class="copy-btn" @click="copyCode(knapsackCode)">复制代码</button>
              </div>
              <pre><code>{{ knapsackCode }}</code></pre>
            </div>

            <div class="explanation">
              <h3>0-1背包问题解析</h3>
              <p>给定一组物品，每个物品有重量和价值，在不超过背包容量的情况下，最大化总价值</p>

              <div class="knapsack-table">
                <div class="table-header">
                  <div>物品</div>
                  <div>重量</div>
                  <div>价值</div>
                </div>
                <div v-for="(item, index) in knapsackItems" :key="index" class="table-row">
                  <div>{{ index + 1 }}</div>
                  <div>{{ item.weight }} kg</div>
                  <div>${{ item.value }}</div>
                </div>
                <div class="table-footer">
                  背包容量: {{ knapsackCapacity }} kg
                </div>
              </div>

              <div class="algorithm-steps">
                <h4>动态规划解法步骤：</h4>
                <ol>
                  <li><strong>状态定义</strong>：dp[i][w] 表示前i个物品在容量w下的最大价值</li>
                  <li><strong>状态转移方程</strong>：
                    <p>dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i])</p>
                  </li>
                  <li><strong>初始化</strong>：dp[0][w] = 0 (0 ≤ w ≤ W)</li>
                  <li><strong>计算顺序</strong>：逐物品、逐重量遍历</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>动态规划算法基础介绍 | 使用 Vue3 + TypeScript 构建 | </p>
      <div class="actions">
        <button class="action-btn">
          <i class="fas fa-download"></i> 导出PDF
        </button>
        <button class="action-btn">
          <i class="fas fa-share-alt"></i> 分享
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 当前激活的标签页
const activeTab = ref<'fibonacci' | 'knapsack'>('fibonacci');

// 斐波那契数列示例代码
const fibonacciCode = `// 斐波那契数列 - 动态规划解法
function fibonacciDP(n: number): number {
  // 边界情况处理
  if (n <= 1) return n;

  // 1. 定义DP数组：dp[i]表示第i个斐波那契数
  const dp: number[] = new Array(n + 1);

  // 2. 初始化DP数组
  dp[0] = 0;
  dp[1] = 1;

  // 3. 状态转移方程：dp[i] = dp[i-1] + dp[i-2]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  // 4. 返回结果
  return dp[n];
}

// 示例：计算第10个斐波那契数
const result = fibonacciDP(10); // 返回55`;

// 斐波那契数列值
const fibValues = [0, 1, 1, 2, 3, 5];

// 背包问题示例代码
const knapsackCode = `// 0-1背包问题 - 动态规划解法
function knapSack(capacity: number, weights: number[], values: number[]): number {
  const n = weights.length;

  // 1. 创建DP数组：dp[i][w] 表示前i个物品在容量w下的最大价值
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  // 2. 填充DP数组
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      // 当前物品重量小于等于当前容量
      if (weights[i-1] <= w) {
        // 选择放入或不放入当前物品的最大值
        dp[i][w] = Math.max(
          values[i-1] + dp[i-1][w - weights[i-1]],
          dp[i-1][w]
        );
      } else {
        // 当前物品重量大于容量，无法放入
        dp[i][w] = dp[i-1][w];
      }
    }
  }

  // 3. 返回结果
  return dp[n][capacity];
}

// 示例数据
const weights = [2, 3, 4, 5]; // 物品重量
const values = [3, 4, 5, 6];  // 物品价值
const capacity = 8;            // 背包容量

// 计算最大价值
const maxValue = knapSack(capacity, weights, values); // 返回10`;

// 背包问题示例物品
const knapsackItems = [
  { weight: 2, value: 3 },
  { weight: 3, value: 4 },
  { weight: 4, value: 5 },
  { weight: 5, value: 6 }
];
const knapsackCapacity = 8;

// 复制代码到剪贴板
const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      alert('代码已复制到剪贴板！');
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
};
</script>

<style lang="less" scoped>



// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@background-light: #f8fafc;
@text-dark: #2c3e50;
@text-medium: #34495e;
@text-light: #7f8c8d;
@card-shadow: 0 8px 25px rgba(0, 0, 100, 0.06);
@header-gradient: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);

.dp-container {
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  background: @header-gradient;
  color: @text-dark;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, @primary-color, @accent-color, @secondary-color);
  }

  .title-container {
    h1 {
      font-size: 2.4rem;
      margin-bottom: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;

      .icon {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-size: 24px;
      }
    }

    p {
      font-size: 1.2rem;
      color: @text-light;
      max-width: 600px;
    }
  }

  .stats {
    display: flex;
    gap: 15px;

    .stat-card {
      background: @background-light;
      border-radius: 12px;
      padding: 15px 25px;
      text-align: center;
      min-width: 120px;

      .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary-color;
      }

      .stat-label {
        font-size: 1rem;
        color: @text-medium;
      }
    }
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.section {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 100, 0.1);
  }

  .section-header {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    background: @background-light;
    border-bottom: 2px solid #f1f5f9;

    i {
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-size: 18px;
    }

    h2 {
      font-size: 1.6rem;
      color: @text-dark;
      font-weight: 600;
    }
  }

  .section-content {
    padding: 30px;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
      color: @text-medium;
      line-height: 1.8;
    }

    .highlight {
      background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
      padding: 0 5px;
      border-radius: 4px;
      font-weight: 500;
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 30px 0;

  .feature-card {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      border-color: @primary-color;
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.1);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, lighten(@primary-color, 10%), lighten(@secondary-color, 10%));
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 24px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @text-dark;
    }

    p {
      font-size: 1rem;
      color: @text-medium;
      margin: 0;
    }
  }
}

.applications {
  margin-top: 30px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @text-dark;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .tag {
      background: #e1f0fa;
      color: @primary-color;
      padding: 8px 15px;
      border-radius: 30px;
      font-size: 0.95rem;
      font-weight: 500;
    }
  }
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;

  .step {
    display: flex;
    align-items: flex-start;

    .step-number {
      background: @primary-color;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-right: 15px;
    }

    .step-content {
      h3 {
        font-size: 1.2rem;
        margin-bottom: 5px;
        color: @text-dark;
      }

      p {
        font-size: 1rem;
        color: @text-medium;
        margin: 0;
      }
    }
  }
}

.implementation-types {
  margin-top: 30px;

  .type-card {
    background: @background-light;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;

    .type-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      i {
        color: @primary-color;
        font-size: 1.5rem;
        margin-right: 10px;
      }

      h4 {
        font-size: 1.2rem;
        color: @text-dark;
      }
    }

    p {
      font-size: 1rem;
      color: @text-medium;
      margin: 0;
      padding-left: 35px;
    }
  }
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 25px;

  .tab {
    background: none;
    border: none;
    padding: 12px 25px;
    font-size: 1.1rem;
    font-weight: 500;
    color: @text-light;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;

    &.active {
      color: @primary-color;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background: @primary-color;
        border-radius: 3px 3px 0 0;
      }
    }

    &:hover:not(.active) {
      color: darken(@primary-color, 10%);
    }
  }
}

.code-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-block {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: #0f172a;

    .code-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #94a3b8;
    }

    .copy-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #475569;
      color: #94a3b8;
      padding: 8px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  pre {
    padding: 20px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    line-height: 1.6;
    font-size: 1rem;
    color: #e2e8f0;
    margin: 0;

    code {
      display: block;

      // 语法高亮
      .keyword {
        color: #f472b6;
      }

      /* 粉色 */
      .function {
        color: #38b2ac;
      }

      /* 青色 */
      .comment {
        color: #94a3b8;
      }

      /* 灰色 */
      .string {
        color: #a3e635;
      }

      /* 绿色 */
      .number {
        color: #fbbf24;
      }

      /* 黄色 */
    }
  }
}

.explanation {
  background: @background-light;
  border-radius: 12px;
  padding: 25px;

  h3 {
    font-size: 1.4rem;
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e8f0;
  }

  p {
    margin-bottom: 15px;
    color: #475569;
    font-size: 1.1rem;
  }

  .formula {
    font-family: 'Courier New', monospace;
    background: #edf2f7;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
    margin: 20px 0;
  }
}

.dp-table {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin: 25px 0;

  .dp-row {
    display: contents;

    .dp-cell {
      background: @primary-color;
      color: white;
      border-radius: 6px;
      padding: 12px 5px;
      text-align: center;
      font-weight: 500;
      font-size: 1.1rem;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

      &.header {
        background: #2c3e50;
        font-weight: 700;
      }

      &.highlight {
        background: #e74c3c;
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
      }
    }
  }
}

.knapsack-table {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  margin: 25px 0;

  .table-header,
  .table-row,
  .table-footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    padding: 12px 15px;

    div {
      padding: 8px;
    }
  }

  .table-header {
    background: @primary-color;
    color: white;
    font-weight: 600;
  }

  .table-row {
    border-bottom: 1px solid #e2e8f0;

    &:nth-child(odd) {
      background: #f9fbfd;
    }
  }

  .table-footer {
    background: #2c3e50;
    color: white;
    font-weight: 500;
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.algorithm-steps {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 25px;
  border: 1px solid #e2e8f0;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @text-dark;
    padding-bottom: 10px;
    border-bottom: 1px dashed #e2e8f0;
  }

  ol {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      color: @text-medium;
      font-size: 1.1rem;

      strong {
        color: @text-dark;
      }

      p {
        margin: 5px 0 0 20px;
        font-family: 'Courier New', monospace;
        background: #f8fafc;
        padding: 8px 12px;
        border-radius: 6px;
        display: inline-block;
      }
    }
  }
}

.footer {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: @text-light;
    font-size: 1rem;
  }

  .actions {
    display: flex;
    gap: 15px;

    .action-btn {
      background: @background-light;
      border: 1px solid #e2e8f0;
      color: @text-medium;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: @primary-color;
        color: white;
        border-color: @primary-color;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;

    .title-container {
      margin-bottom: 20px;

      h1 {
        justify-content: center;
      }
    }

    .stats {
      width: 100%;
      justify-content: center;
    }
  }

  .footer {
    flex-direction: column;
    gap: 15px;

    .actions {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
