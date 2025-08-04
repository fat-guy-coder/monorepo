<template>
  <div class="greedy-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="header-content">
        <h1>贪心算法</h1>
        <p>局部最优解通向全局最优解</p>
        <div class="animation-area">
          <div class="coins">
            <div v-for="(coin, index) in coins" :key="index" class="coin" :style="{
              left: `${coin.left}px`,
              top: `${coin.top}px`,
              transform: `scale(${coin.scale})`,
              zIndex: coin.zIndex,
              opacity: coin.active ? 1 : 0.6
            }" @click="selectCoin(index)">
              {{ coin.value }}¢
            </div>
          </div>
          <div class="selection">
            <div class="selected-coins">
              <div v-for="(coin, index) in selectedCoins" :key="index" class="selected-coin">
                {{ coin }}¢
              </div>
            </div>
            <div class="total">
              总额: <span class="total-value">{{ total }}¢</span>
            </div>
            <div class="controls">
              <button @click="reset">重置</button>
              <button @click="solveGreedy">贪心求解</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 概念解释 -->
    <div class="section concept">
      <div class="section-header">
        <div class="icon">🎯</div>
        <h2>什么是贪心算法？</h2>
      </div>
      <div class="content">
        <p>
          <strong>贪心算法(Greedy Algorithm)</strong>是一种在每一步选择中都采取在当前状态下最优的选择，
          从而希望导致结果是全局最优的算法策略。
        </p>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="card-icon">📌</div>
            <h3>核心思想</h3>
            <p>每一步都选择局部最优解，最终达到全局最优</p>
          </div>
          <div class="concept-card">
            <div class="card-icon">🧩</div>
            <h3>关键特性</h3>
            <p>问题具有贪心选择性质和最优子结构</p>
          </div>
          <div class="concept-card">
            <div class="card-icon">⚡</div>
            <h3>优势</h3>
            <p>简单、高效，时间复杂度通常较低</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 算法思路 -->
    <div class="section steps">
      <div class="section-header">
        <div class="icon">🚶</div>
        <h2>贪心算法三步法</h2>
      </div>
      <div class="content">
        <div class="step" v-for="(step, index) in greedySteps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <div v-if="step.example" class="step-example">
              <pre>{{ step.example }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 经典问题 -->
    <div class="section problems">
      <div class="section-header">
        <div class="icon">📚</div>
        <h2>经典贪心算法问题</h2>
      </div>
      <div class="content">
        <div class="problem-cards">
          <div v-for="(problem, index) in greedyProblems" :key="index" class="problem-card">
            <div class="problem-header">
              <div class="problem-icon">{{ problem.icon }}</div>
              <h3>{{ problem.title }}</h3>
            </div>
            <div class="problem-description">
              <p>{{ problem.description }}</p>
            </div>
            <div class="solution">
              <h4>贪心策略</h4>
              <p>{{ problem.strategy }}</p>
              <div class="code-block">
                <pre>{{ problem.code }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="section use-cases">
      <div class="section-header">
        <div class="icon">🔍</div>
        <h2>使用场景</h2>
      </div>
      <div class="content">
        <div class="use-case-list">
          <div v-for="(caseItem, index) in useCases" :key="index" class="use-case-item">
            <div class="case-icon">{{ caseItem.icon }}</div>
            <div class="case-content">
              <h3>{{ caseItem.title }}</h3>
              <p>{{ caseItem.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优缺点 -->
    <div class="section pros-cons">
      <div class="section-header">
        <div class="icon">⚖️</div>
        <h2>优点与局限</h2>
      </div>
      <div class="comparison">
        <div class="pros">
          <h3>优势</h3>
          <ul>
            <li v-for="(pro, index) in advantages" :key="index">
              <div class="check-icon">✅</div>
              {{ pro }}
            </li>
          </ul>
        </div>
        <div class="cons">
          <h3>局限</h3>
          <ul>
            <li v-for="(con, index) in disadvantages" :key="index">
              <div class="cross-icon">❌</div>
              {{ con }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="section summary">
      <div class="section-header">
        <div class="icon">💎</div>
        <h2>总结</h2>
      </div>
      <div class="content">
        <div class="summary-card">
          <p>
            贪心算法是解决<strong>最优化问题</strong>的高效工具，特别适用于具有<strong>贪心选择性质</strong>
            和<strong>最优子结构</strong>的问题。它在每一步都做出当前看来最佳的选择，而不考虑整体情况，
            这种策略在满足特定条件的问题中可以产生最优解。
          </p>
          <p>
            尽管贪心算法不能解决所有问题，但在适合的问题上，它通常比动态规划更简单高效。
            理解何时可以使用贪心策略是算法设计的关键技能之一。
          </p>
          <div class="tip">
            <div class="tip-icon">💡</div>
            <p>使用贪心算法前，务必验证问题是否满足贪心选择性质和最优子结构</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// 硬币找零动画相关状态
const coins = reactive([
  { value: 25, left: 50, top: 100, scale: 1.2, zIndex: 5, active: false },
  { value: 10, left: 120, top: 80, scale: 1.0, zIndex: 4, active: false },
  { value: 5, left: 180, top: 110, scale: 0.9, zIndex: 3, active: false },
  { value: 1, left: 250, top: 70, scale: 0.7, zIndex: 1, active: false },
  { value: 1, left: 280, top: 130, scale: 0.7, zIndex: 1, active: false },
  { value: 5, left: 320, top: 90, scale: 0.9, zIndex: 3, active: false },
  { value: 10, left: 370, top: 120, scale: 1.0, zIndex: 4, active: false },
  { value: 25, left: 430, top: 80, scale: 1.2, zIndex: 5, active: false },
]);

const selectedCoins = ref<number[]>([]);
const total = ref(0);

const selectCoin = (index: number) => {
  coins[index].active = !coins[index].active;

  if (coins[index].active) {
    selectedCoins.value.push(coins[index].value);
    total.value += coins[index].value;
  } else {
    const coinIndex = selectedCoins.value.indexOf(coins[index].value);
    if (coinIndex !== -1) {
      selectedCoins.value.splice(coinIndex, 1);
      total.value -= coins[index].value;
    }
  }
};

const reset = () => {
  coins.forEach(coin => coin.active = false);
  selectedCoins.value = [];
  total.value = 0;
};

const solveGreedy = () => {
  reset();
  const target = 41; // 找一个合适的金额展示贪心解法
  let remaining = target;

  // 按面额从大到小排序
  const sortedCoins = [...coins].sort((a, b) => b.value - a.value);

  sortedCoins.forEach(coin => {
    while (remaining >= coin.value) {
      const coinIndex = coins.findIndex(c =>
        c.value === coin.value && !c.active &&
        !selectedCoins.value.includes(coin.value)
      );

      if (coinIndex !== -1) {
        coins[coinIndex].active = true;
        selectedCoins.value.push(coin.value);
        remaining -= coin.value;
        total.value += coin.value;
      } else {
        break;
      }
    }
  });
};

// 贪心算法步骤
const greedySteps = ref([
  {
    title: '问题分解',
    description: '将问题分解为一系列子问题，每个子问题都需要做出选择',
    example: '找零问题分解为每次选择最大面额的硬币'
  },
  {
    title: '贪心选择',
    description: '每一步选择当前状态下的最优解（局部最优解）',
    example: '每次选择不大于剩余金额的最大面额硬币'
  },
  {
    title: '迭代更新',
    description: '基于当前选择更新问题状态，继续下一步选择',
    example: '更新剩余金额，重复直到问题解决'
  }
]);

// 经典贪心问题
const greedyProblems = ref([
  {
    icon: '💰',
    title: '硬币找零问题',
    description: '用最少数量的硬币凑成指定金额（使用标准面额体系）',
    strategy: '每次选择不超过剩余金额的最大面额硬币',
    code: `function coinChange(coins: number[], amount: number): number[] {
  // 按面额降序排序
  coins.sort((a, b) => b - a);

  const result = [];
  let remaining = amount;

  for (const coin of coins) {
    while (remaining >= coin) {
      result.push(coin);
      remaining -= coin;
    }
  }

  return remaining === 0 ? result : [];
}`
  },
  {
    icon: '⏰',
    title: '区间调度问题',
    description: '选择最多数量的互不重叠的时间区间',
    strategy: '每次选择结束时间最早的区间',
    code: `function intervalScheduling(intervals: [number, number][]): number {
  // 按结束时间升序排序
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }

  return count;
}`
  },
  {
    icon: '📦',
    title: '背包问题（分数）',
    description: '在容量限制下选择物品，最大化总价值（物品可分）',
    strategy: '优先选择单位价值最高的物品',
    code: `function fractionalKnapsack(items: {value: number, weight: number}[], capacity: number): number {
  // 按单位价值降序排序
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

  let totalValue = 0;
  let remaining = capacity;

  for (const item of items) {
    if (remaining >= item.weight) {
      // 取全部物品
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      // 取部分物品
      totalValue += item.value * (remaining / item.weight);
      break;
    }
  }

  return totalValue;
}`
  }
]);

// 使用场景
const useCases = ref([
  {
    icon: '🛒',
    title: '购物优惠',
    description: '满减活动中选择最优组合最大化优惠'
  },
  {
    icon: '🚗',
    title: '路径规划',
    description: 'Dijkstra算法寻找单源最短路径'
  },
  {
    icon: '📶',
    title: '网络传输',
    description: '哈夫曼编码实现数据压缩'
  },
  {
    icon: '🏠',
    title: '任务调度',
    description: '操作系统中的CPU调度算法'
  },
  {
    icon: '🔄',
    title: '内存分配',
    description: '操作系统中的内存管理策略'
  },
  {
    icon: '🗺️',
    title: '近似算法',
    description: 'NP难问题的近似解法'
  }
]);

// 优缺点
const advantages = ref([
  '实现简单，易于理解',
  '运行效率高，时间复杂度低',
  '空间复杂度通常为O(1)',
  '在特定问题上可得到最优解',
  '算法直观，易于调试'
]);

const disadvantages = ref([
  '不能保证全局最优解',
  '应用范围有限',
  '需要证明贪心策略的有效性',
  '对问题分析要求高',
  '局部最优可能偏离全局最优'
]);

// 初始化
onMounted(() => {
  // 初始选择一些硬币
  setTimeout(() => {
    coins[0].active = true;
    coins[3].active = true;
    coins[5].active = true;
    selectedCoins.value = [coins[0].value, coins[3].value, coins[5].value];
    total.value = coins[0].value + coins[3].value + coins[5].value;
  }, 1000);
});
</script>

<style lang="less" scoped>
@primary-color: #f59e0b;
@amber-700: #b45309;
@amber-500: #f59e0b;
@amber-300: #fcd34d;
@amber-100: #fef3c7;
@background-light: #fffbeb;
@text-dark: #1e293b;
@text-light: #64748b;
@border-radius: 12px;
@box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -4px rgba(0, 0, 0, 0.1);

.greedy-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: @text-dark;
  line-height: 1.6;
  background-color: @background-light;
}

.header {
  margin-bottom: 2.5rem;

  .header-content {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, lighten(@amber-500, 35%), @amber-100);
    border-radius: @border-radius;
    box-shadow: @box-shadow;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, darken(@amber-500, 10%), @amber-700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.3rem;
      color: @amber-700;
      margin-bottom: 1.5rem;
    }
  }

  .animation-area {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .coins {
      position: relative;
      height: 200px;
      width: 500px;
      background: white;
      border-radius: @border-radius;
      padding: 1rem;
      overflow: hidden;
      box-shadow: @box-shadow;
      border: 1px solid @amber-300;

      @media (max-width: 768px) {
        width: 100%;
      }

      .coin {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        &:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        &:nth-child(1),
        &:nth-child(8) {
          background: linear-gradient(135deg, #c0c0c0, #808080);
          font-size: 1.1rem;
        }

        &:nth-child(2),
        &:nth-child(7) {
          background: linear-gradient(135deg, #d4af37, #aa8c21);
          font-size: 1rem;
        }

        &:nth-child(3),
        &:nth-child(6) {
          background: linear-gradient(135deg, #b5b5b5, #7a7a7a);
          font-size: 0.95rem;
        }

        &:nth-child(4),
        &:nth-child(5) {
          background: linear-gradient(135deg, #e5e4e2, #b0b0b0);
          font-size: 0.85rem;
        }
      }
    }

    .selection {
      flex: 1;
      background: white;
      border-radius: @border-radius;
      padding: 1.5rem;
      box-shadow: @box-shadow;
      border: 1px solid @amber-300;

      .selected-coins {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        min-height: 100px;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: @amber-100;
        border-radius: @border-radius;

        .selected-coin {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, @amber-500, darken(@amber-500, 10%));
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 0.9rem;
        }
      }

      .total {
        text-align: center;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 1.5rem;

        .total-value {
          color: @amber-700;
          font-size: 1.5rem;
        }
      }

      .controls {
        display: flex;
        justify-content: center;
        gap: 1rem;

        button {
          padding: 0.7rem 1.5rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:first-child {
            background: #e5e7eb;
            color: @text-dark;

            &:hover {
              background: #d1d5db;
            }
          }

          &:last-child {
            background: linear-gradient(to right, @amber-500, darken(@amber-500, 10%));
            color: white;

            &:hover {
              background: linear-gradient(to right, darken(@amber-500, 5%), darken(@amber-500, 15%));
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }
          }
        }
      }
    }
  }
}

.section {
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  margin-bottom: 2.5rem;
  overflow: hidden;
  border: 1px solid @amber-300;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.75rem;
    background: linear-gradient(135deg, @amber-500, darken(@amber-500, 10%));

    .icon {
      font-size: 1.75rem;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      color: white;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      justify-content: center;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
    }
  }

  .content {
    padding: 2rem;
  }

  &.concept {
    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.25rem;
      margin-top: 1.5rem;

      .concept-card {
        background: @amber-100;
        border-radius: @border-radius;
        padding: 1.5rem;
        border-top: 3px solid @amber-500;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: @amber-700;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: @amber-700;
        }

        p {
          margin: 0;
          color: @text-light;
          line-height: 1.6;
        }
      }
    }
  }

  &.steps {
    .step {
      display: flex;
      padding: 1.5rem 0;
      border-bottom: 1px dashed #fde68a;

      &:last-child {
        border-bottom: none;
      }

      .step-number {
        width: 50px;
        height: 50px;
        min-width: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, @amber-500, darken(@amber-500, 10%));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin-right: 1.5rem;
      }

      .step-content {
        h3 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: @amber-700;
        }

        p {
          margin-bottom: 1rem;
          color: @text-dark;
        }

        .step-example {
          background: @amber-100;
          border-radius: 8px;
          padding: 1rem;
          border-left: 3px solid @amber-500;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          color: @text-dark;
        }
      }
    }
  }

  &.problems {
    .problem-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .problem-card {
        background: white;
        border-radius: @border-radius;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        border: 1px solid #fde68a;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .problem-header {
          display: flex;
          align-items: center;
          padding: 1.25rem;
          background: @amber-100;
          border-bottom: 1px solid #fde68a;

          .problem-icon {
            font-size: 1.8rem;
            margin-right: 1rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, @amber-500, darken(@amber-500, 10%));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          h3 {
            margin: 0;
            color: @amber-700;
          }
        }

        .problem-description {
          padding: 1.25rem;
          min-height: 80px;

          p {
            margin: 0;
            color: @text-dark;
          }
        }

        .solution {
          padding: 1.25rem;
          background: #fefce8;
          border-top: 1px solid #fde68a;

          h4 {
            margin-top: 0;
            margin-bottom: 0.75rem;
            color: @amber-700;
          }

          p {
            margin-bottom: 1rem;
            color: @text-dark;
          }

          .code-block {
            background: #2d2d2d;
            border-radius: 8px;
            padding: 1rem;
            overflow-x: auto;

            pre {
              margin: 0;
              color: #f8f8f2;
              font-family: 'Fira Code', monospace;
              font-size: 0.85rem;
              line-height: 1.5;
              white-space: pre-wrap;
            }
          }
        }
      }
    }
  }

  &.use-cases {
    .use-case-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.25rem;

      .use-case-item {
        display: flex;
        align-items: flex-start;
        background: white;
        border-radius: 8px;
        padding: 1.25rem;
        border: 1px solid #fde68a;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .case-icon {
          font-size: 1.75rem;
          margin-right: 1.25rem;
          min-width: 50px;
          text-align: center;
          color: @amber-500;
        }

        .case-content {
          h3 {
            margin: 0 0 0.5rem;
            font-size: 1.2rem;
            color: @amber-700;
          }

          p {
            margin: 0;
            color: @text-light;
            font-size: 1rem;
            line-height: 1.6;
          }
        }
      }
    }
  }

  &.pros-cons {
    .comparison {
      display: flex;
      gap: 1.5rem;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      &>div {
        flex: 1;
        padding: 1.25rem;
        border-radius: 8px;
      }

      .pros {
        background: linear-gradient(135deg, #f0fdf4, #dcfce7);

        h3 {
          color: #15803d;
          margin-top: 0;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #bbf7d0;
        }
      }

      .cons {
        background: linear-gradient(135deg, #fef2f2, #fee2e2);

        h3 {
          color: #b91c1c;
          margin-top: 0;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #fecaca;
        }
      }

      ul {
        padding: 0;
        margin: 0;
        list-style: none;

        li {
          display: flex;
          align-items: flex-start;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);

          .check-icon,
          .cross-icon {
            margin-right: 0.75rem;
            min-width: 24px;
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  &.summary {
    .summary-card {
      background: linear-gradient(135deg, #fffbeb, #fef3c7);
      border-radius: @border-radius;
      padding: 1.75rem;
      border-left: 4px solid @amber-500;

      p {
        font-size: 1.1rem;
        margin-bottom: 1.25rem;
        line-height: 1.7;

        strong {
          color: @amber-700;
          font-weight: 600;
        }
      }

      .tip {
        display: flex;
        align-items: flex-start;
        background: white;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        border: 1px solid #fde68a;

        .tip-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          color: @amber-500;
        }

        p {
          margin: 0;
          font-style: italic;
          color: @amber-700;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .greedy-container {
    padding: 1rem;
  }

  .header {
    .header-content {
      padding: 1.5rem;

      h1 {
        font-size: 2.2rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    .animation-area {
      flex-direction: column;

      .coins {
        width: 100%;
        height: 180px;
      }
    }
  }

  .section .content {
    padding: 1.5rem;
  }
}
</style>