<template>
  <div class="greedy-algorithm-container">
    <div class="algorithm-header">
      <h1>贪心算法解析</h1>
      <p class="subtitle">探索局部最优解如何导向全局最优</p>
      <div class="algorithm-icon">📈</div>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>什么是贪心算法？</h2>
        <p><strong>贪心算法(Greedy Algorithm)</strong>是一种在每一步选择中都采取当前状态下最优的选择，从而希望导致结果是全局最优的算法策略。</p>

        <div class="code-example">
          <p class="example-title">🔍 核心思想：</p>
          <pre>最优选择 → 解决子问题 → 组合成最终解</pre>
        </div>

        <div class="characteristics">
          <div class="characteristic-card">
            <div class="icon">✅</div>
            <h3>优点</h3>
            <ul>
              <li>简单高效</li>
              <li>执行速度快</li>
              <li>代码实现简单</li>
            </ul>
          </div>
          <div class="characteristic-card">
            <div class="icon">⚠️</div>
            <h3>缺点</h3>
            <ul>
              <li>不一定得到全局最优解</li>
              <li>需要证明贪心策略正确性</li>
              <li>适用范围有限</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>贪心算法的思想</h2>
        <div class="algorithm-flow">
          <div class="step">
            <div class="step-number">1</div>
            <p>分解问题为子问题</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <p>做出当前最优选择</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <p>不可逆决策</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">4</div>
            <p>组合子问题解</p>
          </div>
        </div>

        <div class="principle">
          <p><strong>关键特征：</strong> 贪心算法一旦做出选择就不改变，后续选择基于前面选择的状态</p>
        </div>
      </div>

      <div class="card">
        <h2>使用场景</h2>
        <div class="use-cases">
          <div class="use-case">
            <div class="case-icon">💰</div>
            <h3>找零问题</h3>
            <p>使用最少硬币数量找零</p>
          </div>
          <div class="use-case">
            <div class="case-icon">📅</div>
            <h3>活动安排</h3>
            <p>安排最多数量的相容活动</p>
          </div>
          <div class="use-case">
            <div class="case-icon">📦</div>
            <h3>背包问题</h3>
            <p>物品可分时的最优解</p>
          </div>
          <div class="use-case">
            <div class="case-icon">🛣️</div>
            <h3>最短路径</h3>
            <p>Dijkstra算法计算单源最短路径</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>算法示例：找零问题</h2>
        <div class="demo-area">
          <div class="input-section">
            <p>总金额: <span class="highlight">{{ totalAmount }}</span> 元</p>
            <p>可用面额: [100, 50, 20, 10, 5, 1]</p>
          </div>

          <div class="coins-container">
            <div v-for="(coin, index) in coins" :key="index" class="coin" :class="{ active: coin.used > 0 }"
              @click="useCoin(coin)">
              <div class="coin-value">{{ coin.value }}元</div>
              <div class="coin-count">{{ coin.used }} ×</div>
            </div>
          </div>

          <button class="reset-btn" @click="resetDemo">重置示例</button>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>算法提示：使用贪心算法前需证明其能得到全局最优解</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 硬币数据
interface Coin {
  value: number;
  used: number;
}

const coins = ref<Coin[]>([
  { value: 100, used: 0 },
  { value: 50, used: 0 },
  { value: 20, used: 0 },
  { value: 10, used: 0 },
  { value: 5, used: 0 },
  { value: 1, used: 0 }
]);

const totalAmount = ref(376);

// 使用贪心算法找零
const useCoinsGreedily = () => {
  let remaining = totalAmount.value;

  // 重置所有硬币使用数量
  coins.value.forEach(coin => coin.used = 0);

  // 贪心策略：从最大面额开始依次使用
  for (const coin of coins.value) {
    while (remaining >= coin.value) {
      coin.used++;
      remaining -= coin.value;
    }
  }
};

// 单个硬币点击演示
const useCoin = (coin: Coin) => {
  if (totalAmount.value >= coin.value) {
    coin.used++;
    totalAmount.value -= coin.value;
  }
};

// 重置演示
const resetDemo = () => {
  totalAmount.value = 376;
  coins.value.forEach(coin => coin.used = 0);
};

// 初始计算
useCoinsGreedily();
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@algorithm-color: #8e44ad;
@success-color: #27ae60;
@danger-color: #e74c3c;
@light-bg: #f8f9fa;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.greedy-algorithm-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

.algorithm-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, @algorithm-color, #6c3483);
  color: white;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    font-weight: 300;
  }

  .algorithm-icon {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 4rem;
    opacity: 0.25;
  }
}

.content-section {
  display: grid;
  gap: 28px;
}

.card {
  background: white;
  border-radius: 14px;
  padding: 30px;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  h2 {
    color: @algorithm-color;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 15px;
    margin-bottom: 25px;
    font-weight: 700;
  }
}

.code-example {
  background-color: #f5f3f7;
  border-left: 5px solid @algorithm-color;
  padding: 20px;
  margin: 25px 0;
  border-radius: 0 10px 10px 0;

  .example-title {
    font-weight: 700;
    margin-bottom: 12px;
    color: @algorithm-color;
    font-size: 1.1rem;
  }

  pre {
    background-color: #2c3e50;
    color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 1.1rem;
    font-weight: 500;
    font-family: 'Courier New', monospace;
  }
}

.characteristics {
  display: flex;
  gap: 20px;
  margin-top: 25px;

  .characteristic-card {
    flex: 1;
    padding: 20px;
    border-radius: 10px;
    background: @light-bg;

    .icon {
      font-size: 2rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @algorithm-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
        line-height: 1.5;
      }
    }

    &:first-child {
      border-top: 4px solid @success-color;
    }

    &:last-child {
      border-top: 4px solid @danger-color;
    }
  }
}

.algorithm-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;

  .step {
    text-align: center;
    flex: 1;

    .step-number {
      width: 42px;
      height: 42px;
      background: @algorithm-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: 700;
      font-size: 1.2rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    p {
      font-size: 1.05rem;
      font-weight: 500;
    }
  }

  .arrow {
    color: #95a5a6;
    font-size: 2rem;
    padding: 0 15px;
    font-weight: bold;
  }
}

.principle {
  background-color: #f4ecf7;
  border: 2px solid @algorithm-color;
  border-radius: 10px;
  padding: 18px;
  margin-top: 25px;
  text-align: center;

  p {
    color: @algorithm-color;
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 22px;
  margin-top: 25px;

  .use-case {
    background: @light-bg;
    padding: 22px;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
    border-top: 4px solid @algorithm-color;

    &:hover {
      background: #f0eaf7;
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    .case-icon {
      font-size: 2.8rem;
      margin-bottom: 18px;
    }

    h3 {
      color: @algorithm-color;
      margin-bottom: 12px;
      font-weight: 700;
    }

    p {
      font-size: 1rem;
      color: #546e7a;
      line-height: 1.5;
    }
  }
}

.demo-area {
  margin-top: 20px;

  .input-section {
    background: #f0eaf7;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 25px;
    text-align: center;

    p {
      font-size: 1.2rem;
      margin: 10px 0;
      font-weight: 500;
    }

    .highlight {
      font-weight: 700;
      color: @algorithm-color;
      font-size: 1.5rem;
    }
  }

  .coins-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 25px;

    .coin {
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
      border: 2px solid #d7bde2;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
        border-color: @algorithm-color;
      }

      &.active {
        background: #e8daef;
        border-color: @algorithm-color;
        box-shadow: 0 5px 15px rgba(142, 68, 173, 0.3);
      }

      .coin-value {
        font-size: 1.2rem;
        font-weight: 700;
        color: @algorithm-color;
      }

      .coin-count {
        font-size: 1.1rem;
        font-weight: 600;
        color: #7d3c98;
        margin-top: 5px;
      }
    }
  }

  .reset-btn {
    display: block;
    margin: 0 auto;
    padding: 12px 30px;
    background: @algorithm-color;
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #7d3c98;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(142, 68, 173, 0.4);
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 25px;
  background: linear-gradient(to right, #e8daef, #f5eef8);
  border-radius: 12px;
  font-weight: 600;
  color: #7d3c98;
  font-size: 1.1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
</style>