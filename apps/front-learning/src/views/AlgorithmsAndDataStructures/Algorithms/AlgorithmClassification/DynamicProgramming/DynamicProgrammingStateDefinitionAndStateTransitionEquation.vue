<template>
  <div class="dp-container">
    <header class="header">
      <h1>动态规划核心概念解析</h1>
      <p class="subtitle">状态定义与状态转移方程基础介绍</p>
    </header>

    <div class="content">
      <section class="concept-section">
        <h2>什么是动态规划？</h2>
        <p class="concept-text">
          动态规划(Dynamic Programming)是一种解决复杂问题的方法，它将问题分解为相互重叠的子问题，
          通过保存子问题的解避免重复计算，从而提升算法效率。
        </p>
        <div class="dp-process">
          <div class="step">
            <div class="step-icon">1</div>
            <h3>状态定义</h3>
            <p>确定问题的状态表示</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">2</div>
            <h3>转移方程</h3>
            <p>建立状态间的关系</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">3</div>
            <h3>边界条件</h3>
            <p>确定初始状态</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">4</div>
            <h3>求解目标</h3>
            <p>明确最终目标状态</p>
          </div>
        </div>
      </section>

      <div class="columns">
        <div class="column">
          <section class="concept-card">
            <div class="card-header">
              <h2>状态定义 (State Definition)</h2>
            </div>
            <div class="card-content">
              <p>状态定义是动态规划的核心，它描述了问题在某一阶段的"状态"。</p>
              <ul>
                <li><strong>关键属性</strong>：状态应包含足够信息描述问题当前状况</li>
                <li><strong>维度选择</strong>：决定状态的维度（一维、二维或多维）</li>
                <li><strong>状态表示</strong>：通常用 dp[i] 或 dp[i][j] 表示状态</li>
                <li><strong>状态空间</strong>：所有可能状态的集合，决定算法复杂度</li>
              </ul>
              <div class="principle">
                <h3>状态设计原则</h3>
                <p>1. 最优子结构：问题的最优解包含子问题的最优解</p>
                <p>2. 无后效性：当前状态只与之前状态有关，与后续无关</p>
              </div>
            </div>
          </section>
        </div>

        <div class="column">
          <section class="concept-card">
            <div class="card-header">

              <h2>状态转移方程 (State Transition Equation)</h2>
            </div>
            <div class="card-content">
              <p>状态转移方程定义了状态之间的转化关系，是动态规划算法的核心逻辑。</p>
              <ul>
                <li><strong>数学表达式</strong>：描述如何从已知状态推导出新状态</li>
                <li><strong>递推关系</strong>：当前状态通常依赖于前面状态的值</li>
                <li><strong>决策过程</strong>：包含对不同决策的选择（如max/min）</li>
                <li><strong>时间复杂度</strong>：转移方程复杂度决定整体算法效率</li>
              </ul>
              <div class="principle">
                <h3>转移方程形式</h3>
                <p>dp[i] = F(dp[i-1], dp[i-2], ... , 决策)</p>
                <p>dp[i][j] = G(dp[i-1][j], dp[i][j-1], ... , 决策)</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="example-section">
        <h2>经典问题实例解析</h2>

        <div class="example">
          <div class="example-header">
            <h3>斐波那契数列 (Fibonacci Sequence)</h3>
            <div class="tag">一维DP</div>
          </div>
          <div class="example-content">
            <div class="code-block">
              <div class="code-header">状态定义</div>
              <pre>// dp[i] 表示第 i 个斐波那契数
const dp: number[] = [];</pre>
            </div>
            <div class="code-block">
              <div class="code-header">状态转移方程</div>
              <pre>dp[i] = dp[i-1] + dp[i-2];</pre>
            </div>
            <div class="code-block full">
              <div class="code-header">完整代码实现</div>
              <pre>function fibonacci(n: number): number {
  // 边界条件
  if (n <= 1) return n;

  // 初始化状态数组
  const dp = new Array(n + 1).fill(0);

  // 基础状态
  dp[0] = 0;
  dp[1] = 1;

  // 状态转移过程
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];  // 状态转移方程
  }

  return dp[n];
}</pre>
            </div>
            <div class="visualization">
              <div class="dp-table">
                <div class="dp-cell" v-for="i in 8" :key="'fib-' + i" :class="{ 'base-state': i <= 2 }">
                  <div class="index">dp[{{ i - 1 }}]</div>
                  <div class="value">{{ fibValues[i - 1] }}</div>
                  <div class="arrows" v-if="i > 2">
                    <div class="arrow-left"></div>
                    <div class="arrow-left" style="margin-left:15px"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="example">
          <div class="example-header">
            <h3>0-1背包问题 (Knapsack Problem)</h3>
            <div class="tag">二维DP</div>
          </div>
          <div class="example-content">
            <div class="code-block">
              <div class="code-header">状态定义</div>
              <pre>// dp[i][j] 表示前 i 个物品在容量 j 时的最大价值
const dp: number[][] = [];</pre>
            </div>
            <div class="code-block">
              <div class="code-header">状态转移方程</div>
              <pre>dp[i][j] = Math.max(
  // 不选当前物品
  dp[i-1][j],
  // 选择当前物品
  dp[i-1][j - weight[i]] + value[i]
);</pre>
            </div>
            <div class="code-block full">
              <div class="code-header">完整代码实现</div>
              <pre>function knapsack(
  weights: number[],
  values: number[],
  capacity: number
): number {
  const n = weights.length;
  // 初始化二维状态数组
  const dp = Array.from({ length: n + 1 },
             () => new Array(capacity + 1).fill(0));

  // 动态规划过程
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (j < weights[i - 1]) {
        // 当前背包容量不足，无法装入
        dp[i][j] = dp[i - 1][j];
      } else {
        // 状态转移方程 - 选择最优解
        dp[i][j] = Math.max(
          dp[i - 1][j], // 不选当前物品
          dp[i - 1][j - weights[i - 1]] + values[i - 1] // 选择当前物品
        );
      }
    }
  }

  return dp[n][capacity];
}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>动态规划技巧总结：明确状态 → 定义转移方程 → 设置边界 → 选择存储结构 → 确定计算顺序</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 斐波那契数列计算值
const fibValues = ref([0, 1, 1, 2, 3, 5, 8, 13]);

</script>

<style lang="less" scoped>



.dp-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  background: linear-gradient(135deg, #f9fafe 0%, #f0f4ff 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 128, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2e3a8c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #2e3a8c 0%, #4f5bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 400;
  }
}

.content {
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.concept-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    color: #2e3a8c;
    margin-bottom: 1.5rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #4f5bd5 0%, #2e3a8c 100%);
      border-radius: 4px;
    }
  }

  .concept-text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    max-width: 800px;
  }
}

.dp-process {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
  background: #f3f7ff;
  border-radius: 12px;
  padding: 1.5rem;

  .step {
    text-align: center;
    flex: 1;
    padding: 1rem;

    .step-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
      border-radius: 50%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 auto 1rem;
    }

    h3 {
      font-size: 1.2rem;
      color: #2e3a8c;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6b7280;
      font-size: 0.95rem;
    }
  }

  .arrow {
    font-size: 1.8rem;
    color: #a5b4fc;
    margin: 0 -15px;
  }
}

.columns {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}

.column {
  flex: 1;
}

.concept-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(99, 102, 241, 0.1);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e7ff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(99, 102, 241, 0.15);
  }

  .card-header {
    background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
    padding: 1.5rem;
    display: flex;
    align-items: center;

    h2 {
      color: white;
      font-size: 1.6rem;
      margin-left: 1rem;
      flex: 1;
    }
  }

  .icon-bg {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  .state-icon {
    color: #a5b4fc;
  }

  .equation-icon {
    color: #c7d2fe;
  }
}

.card-content {
  padding: 1.8rem;

  p {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 1.5rem 0;

    li {
      padding: 0.6rem 0;
      padding-left: 1.8rem;
      position: relative;
      color: #4b5563;
      border-bottom: 1px solid #eef2ff;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        top: 0.5rem;
        color: #4f5bd5;
        font-size: 1.5rem;
      }

      strong {
        color: #2e3a8c;
      }
    }
  }

  .principle {
    background: #f0f5ff;
    border-left: 4px solid #4f5bd5;
    padding: 1.2rem;
    border-radius: 0 8px 8px 0;
    margin-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
      color: #2e3a8c;
      margin-bottom: 0.8rem;
    }

    p {
      margin: 0.5rem 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

.example-section {
  margin-top: 3rem;

  h2 {
    font-size: 1.8rem;
    color: #2e3a8c;
    margin-bottom: 2rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #4f5bd5 0%, #2e3a8c 100%);
      border-radius: 4px;
    }
  }
}

.example {
  margin-bottom: 3rem;
  border: 1px solid #e0e7ff;
  border-radius: 12px;
  overflow: hidden;

  .example-header {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
    padding: 1.2rem 1.8rem;

    h3 {
      font-size: 1.4rem;
      color: #2e3a8c;
      margin: 0;
      flex: 1;
    }

    .tag {
      background: #4f5bd5;
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }
}

.example-content {
  padding: 1.8rem;

  .code-block {
    margin-bottom: 1.5rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;

    &.full {
      margin-top: 2rem;
    }

    .code-header {
      background: #e0e7ff;
      color: #2e3a8c;
      padding: 0.6rem 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      font-size: 0.95rem;
      border-bottom: 1px solid #c7d2fe;
    }

    pre {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      padding: 1.2rem;
      margin: 0;
      overflow-x: auto;
      background: #f8fafc;
      color: #1e293b;
      line-height: 1.6;
    }
  }
}

.visualization {
  margin-top: 1.5rem;
  background: #f0f5ff;
  border-radius: 8px;
  padding: 1.5rem;

  .dp-table {
    display: flex;
    justify-content: center;
    gap: 1.2rem;

    .dp-cell {
      width: 80px;
      height: 80px;
      border: 2px solid #c7d2fe;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: white;
      position: relative;
      box-shadow: 0 4px 6px rgba(99, 102, 241, 0.1);

      .index {
        font-size: 0.8rem;
        color: #4f5bd5;
        font-weight: 500;
      }

      .value {
        font-size: 1.4rem;
        font-weight: 700;
        color: #2e3a8c;
      }

      &.base-state {
        background: #e0e7ff;
        border-color: #4f5bd5;
      }

      .arrows {
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);

        .arrow-left {
          width: 20px;
          height: 20px;
          border-top: 2px solid #4f5bd5;
          border-left: 2px solid #4f5bd5;
          transform: rotate(45deg);
        }
      }
    }
  }
}

.footer {
  margin-top: 3rem;
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border-radius: 12px;
  font-weight: 500;
  color: #2e3a8c;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .columns {
    flex-direction: column;
    gap: 2rem;
  }

  .dp-process {
    flex-direction: column;
    gap: 2rem;

    .arrow {
      transform: rotate(90deg);
      margin: -10px 0;
    }
  }

  .visualization .dp-table {
    flex-wrap: wrap;
  }
}
</style>
