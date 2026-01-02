<template>
  <div class="lis-algorithm-container">
    <header class="header-section">
      <h1>最长递增子序列 (Longest Increasing Subsequence)</h1>
      <p class="subtitle">高效算法解析与实现</p>
    </header>

    <div class="content-wrapper">
      <div class="algorithm-section">
        <div class="card intro-card">
          <div class="card-header">
            <div class="icon">📚</div>
            <h2>算法介绍</h2>
          </div>
          <div class="card-content">
            <p>
              最长递增子序列(LIS)问题是在一个给定的数字序列中找到一个最长的子序列，使得这个子序列中的元素是严格递增的。
            </p>

            <div class="definition">
              <div class="def-title">形式化定义：</div>
              <div class="def-content">
                给定序列 <span class="math">a<sub>1</sub>, a<sub>2</sub>, ..., a<sub>n</sub></span
                >，<br />
                找到一组下标
                <span class="math"
                  >i<sub>1</sub> &lt; i<sub>2</sub> &lt; ... &lt; i<sub>k</sub></span
                >，<br />
                满足
                <span class="math"
                  >a<sub>i<sub>1</sub></sub> &lt; a<sub>i<sub>2</sub></sub> &lt; ... &lt; a<sub
                    >i<sub>k</sub></sub
                  ></span
                >，<br />
                且 <span class="math">k</span> 的值最大。
              </div>
            </div>

            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">📌</div>
                <h3>应用场景</h3>
                <ul>
                  <li>生物信息学（DNA序列分析）</li>
                  <li>金融分析（股票趋势预测）</li>
                  <li>数据压缩</li>
                  <li>路径规划</li>
                </ul>
              </div>
              <div class="feature-item">
                <div class="feature-icon">⚙️</div>
                <h3>复杂度分析</h3>
                <div class="complexity">
                  <div class="complexity-item">
                    <span class="method">动态规划</span>
                    <span class="time">O(n²)</span>
                    <span class="space">O(n)</span>
                  </div>
                  <div class="complexity-item">
                    <span class="method">贪心+二分</span>
                    <span class="time">O(n log n)</span>
                    <span class="space">O(n)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card dp-card">
          <div class="card-header">
            <div class="icon">🔍</div>
            <h2>方法一：动态规划实现</h2>
          </div>
          <div class="card-content">
            <h3>核心思路</h3>
            <div class="algorithm-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <p>
                    定义状态：<strong>dp[i]</strong> 表示以第 i 个元素结尾的最长递增子序列的长度
                  </p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <p>状态转移：对于每个位置 i，遍历所有 j < i，当 nums[i] > nums[j] 时：</p>
                  <div class="formula">dp[i] = max(dp[i], dp[j] + 1)</div>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <p>寻找最大值：最长递增子序列的长度是所有 dp[i] 中的最大值</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <p>重建序列：通过回溯 dp 数组重建实际的 LIS</p>
                </div>
              </div>
            </div>

            <h3>算法图解</h3>
            <div class="visual-guide">
              <div class="sequence-row">
                <div class="sequence-label">序列:</div>
                <div class="sequence-items">
                  <div class="item">10</div>
                  <div class="item">9</div>
                  <div class="item">2</div>
                  <div class="item">5</div>
                  <div class="item">3</div>
                  <div class="item">7</div>
                  <div class="item">101</div>
                  <div class="item">18</div>
                </div>
              </div>
              <div class="dp-row">
                <div class="dp-label">dp[i]:</div>
                <div class="dp-items">
                  <div class="dp-item">1</div>
                  <div class="dp-item">1</div>
                  <div class="dp-item">1</div>
                  <div class="dp-item">2</div>
                  <div class="dp-item">2</div>
                  <div class="dp-item">3</div>
                  <div class="dp-item">4</div>
                  <div class="dp-item">4</div>
                </div>
              </div>
              <div class="arrow-row">
                <div class="arrow-space"></div>
                <div class="arrows">
                  <div class="arrow-container">
                    <div class="arrow"></div>
                    <div class="arrow-label">j < i</div>
                  </div>
                  <div class="arrow-container">
                    <div class="arrow"></div>
                  </div>
                  <div class="arrow-container">
                    <div class="arrow"></div>
                  </div>
                  <div class="arrow-container">
                    <div class="arrow"></div>
                  </div>
                  <div class="arrow-container">
                    <div class="arrow"></div>
                  </div>
                  <div class="arrow-container">
                    <div class="arrow"></div>
                  </div>
                  <div class="arrow-container">
                    <div class="arrow"></div>
                  </div>
                </div>
              </div>
            </div>

            <h3>TypeScript 实现</h3>
            <pre class="code-block"><code>function longestIncreasingSubsequenceDP(nums: number[]):
  { length: number, sequence: number[] } {

  if (nums.length === 0) return { length: 0, sequence: [] };

  // 初始化dp数组和路径记录
  const dp = new Array(nums.length).fill(1);
  const paths: number[][] = nums.map((_, i) => [i]);

  let maxLength = 1;
  let maxIndex = 0;

  // 动态规划核心
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        paths[i] = [...paths[j], i];
      }
    }
    // 更新最大值
    if (dp[i] > maxLength) {
      maxLength = dp[i];
      maxIndex = i;
    }
  }

  // 重建LIS序列
  const sequence = paths[maxIndex].map(idx => nums[idx]);

  return { length: maxLength, sequence };
}</code></pre>
          </div>
        </div>

        <div class="card greedy-card">
          <div class="card-header">
            <div class="icon">🚀</div>
            <h2>方法二：贪心 + 二分查找</h2>
          </div>
          <div class="card-content">
            <h3>核心思路</h3>
            <div class="algorithm-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <p>
                    维护一个 <strong>tails</strong> 数组，其中 tails[k] 存储长度为 k+1
                    的递增子序列的最小末尾值
                  </p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <p>遍历序列中的每个元素：</p>
                  <ul>
                    <li>如果元素大于所有 tails 中的值，追加到尾部</li>
                    <li>否则在 tails 中二分查找第一个 ≥ x 的位置并替换</li>
                  </ul>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <p>最终 tails 的长度就是 LIS 的长度</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <p>通过额外记录重建实际的 LIS</p>
                </div>
              </div>
            </div>

            <h3>算法图解</h3>
            <div class="greedy-visual">
              <div class="step-vis">
                <div class="step-label">序列: [10, 9, 2, 5, 3, 7, 101, 18]</div>
                <div class="step-row">
                  <div class="step-header">步骤</div>
                  <div class="step-header">tails数组</div>
                  <div class="step-header">操作</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">1. 处理 10</div>
                  <div class="step-cell">[10]</div>
                  <div class="step-cell">添加到末尾</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">2. 处理 9</div>
                  <div class="step-cell">[9]</div>
                  <div class="step-cell">替换10</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">3. 处理 2</div>
                  <div class="step-cell">[2]</div>
                  <div class="step-cell">替换9</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">4. 处理 5</div>
                  <div class="step-cell">[2, 5]</div>
                  <div class="step-cell">添加到末尾</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">5. 处理 3</div>
                  <div class="step-cell">[2, 3]</div>
                  <div class="step-cell">替换5</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">6. 处理 7</div>
                  <div class="step-cell">[2, 3, 7]</div>
                  <div class="step-cell">添加到末尾</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">7. 处理 101</div>
                  <div class="step-cell">[2, 3, 7, 101]</div>
                  <div class="step-cell">添加到末尾</div>
                </div>
                <div class="step-row">
                  <div class="step-cell">8. 处理 18</div>
                  <div class="step-cell">[2, 3, 7, 18]</div>
                  <div class="step-cell">替换101</div>
                </div>
              </div>
              <div class="conclusion">
                <div class="result">最长递增子序列长度: <strong>4</strong></div>
                <div class="result">
                  可能的LIS: <strong>[2, 3, 7, 101]</strong> 或 <strong>[2, 3, 7, 18]</strong>
                </div>
              </div>
            </div>

            <h3>TypeScript 实现</h3>
            <pre
              class="code-block"
            ><code>function longestIncreasingSubsequenceGreedy(nums: number[]):
  { length: number, sequence: number[] } {

  if (nums.length === 0) return { length: 0, sequence: [] };

  const tails: number[] = [];
  // 记录每个元素所在的子序列位置
  const position: number[] = new Array(nums.length);

  for (let i = 0; i < nums.length; i++) {
    let left = 0;
    let right = tails.length;
    const num = nums[i];

    // 二分查找插入位置
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // 记录元素位置
    position[i] = left;

    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  // 重建LIS序列
  let len = tails.length;
  const sequence: number[] = new Array(len);
  for (let i = nums.length - 1; i >= 0; i--) {
    if (position[i] === len - 1) {
      sequence[len - 1] = nums[i];
      len--;
    }
  }

  return { length: tails.length, sequence };
}</code></pre>
          </div>
        </div>

        <div class="card comparison-card">
          <div class="card-header">
            <div class="icon">📊</div>
            <h2>算法比较</h2>
          </div>
          <div class="card-content">
            <div class="comparison-grid">
              <div class="comparison-header"></div>
              <div class="comparison-header">动态规划</div>
              <div class="comparison-header">贪心+二分</div>

              <div class="comparison-row">
                <div class="comparison-label">时间复杂度</div>
                <div class="comparison-value">O(n²)</div>
                <div class="comparison-value">O(n log n)</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-label">空间复杂度</div>
                <div class="comparison-value">O(n)</div>
                <div class="comparison-value">O(n)</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-label">实现难度</div>
                <div class="comparison-value">中等</div>
                <div class="comparison-value">较高</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-label">序列重建</div>
                <div class="comparison-value">支持完整序列</div>
                <div class="comparison-value">需要额外处理</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-label">适用场景</div>
                <div class="comparison-value">n ≤ 10⁴</div>
                <div class="comparison-value">n ≤ 10⁶</div>
              </div>
            </div>

            <div class="recommendation">
              <h3>选择建议：</h3>
              <ul>
                <li>对于较小数据集 (n ≤ 10,000)，动态规划方法是简单有效的选择</li>
                <li>对于大规模数据 (n > 10,000)，贪心+二分查找方法在效率上具有显著优势</li>
                <li>当需要重建完整的最长递增子序列时，动态规划方法更直观</li>
                <li>当序列长度远大于序列中的数值范围时，可考虑进一步优化</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里只需要定义组件的逻辑部分
// 由于是纯展示组件，不需要响应式数据和交互功能
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@dp-color: #8b5cf6;
@greedy-color: #0ea5e9;
@light-bg: #f8fafc;
@card-bg: #ffffff;
@text-color: #334155;
@border-color: #e2e8f0;
@success-color: #10b981;
@info-color: #3b82f6;
@shadow:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
@card-shadow:
  0 1px 3px rgba(0, 0, 0, 0.12),
  0 1px 2px rgba(0, 0, 0, 0.24);

.lis-algorithm-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: @text-color;
  background-color: @light-bg;
  min-height: 100vh;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
    font-weight: 400;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.algorithm-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: @card-shadow;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 18px 24px;
  background: linear-gradient(to right, @primary-color, lighten(@primary-color, 10%));
  color: white;

  .icon {
    font-size: 24px;
    margin-right: 16px;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;
  }
}

.dp-card .card-header {
  background: linear-gradient(to right, @dp-color, lighten(@dp-color, 10%));
}

.greedy-card .card-header {
  background: linear-gradient(to right, @greedy-color, lighten(@greedy-color, 10%));
}

.comparison-card .card-header {
  background: linear-gradient(to right, @success-color, lighten(@success-color, 10%));
}

.card-content {
  padding: 24px;

  h3 {
    font-size: 1.3rem;
    color: @secondary-color;
    margin-top: 16px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 2px solid @border-color;
  }
}

.intro-card {
  .definition {
    background: lighten(@light-bg, 1%);
    border-radius: 8px;
    padding: 16px;
    margin: 24px 0;
    border-left: 4px solid @primary-color;

    .def-title {
      font-weight: 600;
      margin-bottom: 12px;
      color: @primary-color;
    }

    .def-content {
      font-size: 1.1rem;
      line-height: 1.8;

      .math {
        font-style: italic;
        font-weight: 500;
        letter-spacing: 0.5px;
      }
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.feature-item {
  background: lighten(@light-bg, 1%);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid @border-color;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 16px;
    text-align: center;
  }

  h3 {
    font-size: 1.2rem;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 16px;
    text-align: center;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
      position: relative;
      padding-left: 24px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        top: 0;
        color: @primary-color;
        font-size: 1.2rem;
      }
    }
  }
}

.complexity {
  .complexity-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 10px 0;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
    }

    .method {
      font-weight: 500;
    }

    .time {
      font-weight: 600;
      color: @dp-color;
    }

    .space {
      font-weight: 600;
      color: @greedy-color;
    }
  }
}

.algorithm-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
}

.step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.step-number {
  min-width: 36px;
  height: 36px;
  background: @primary-color;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 4px;
}

.step-content {
  p {
    margin: 0 0 12px 0;
    line-height: 1.6;
  }

  ul {
    padding-left: 24px;
    margin: 12px 0;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}

.formula {
  font-family: 'Source Code Pro', monospace;
  background: lighten(@primary-color, 42%);
  padding: 14px 18px;
  border-radius: 8px;
  margin-top: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  border-left: 3px solid @primary-color;
}

.visual-guide {
  background: #f9fafb;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid @border-color;

  .sequence-row,
  .dp-row,
  .arrow-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .sequence-label,
  .dp-label {
    font-weight: 600;
    min-width: 70px;
    color: @primary-color;
  }

  .sequence-items,
  .dp-items {
    display: flex;
    gap: 10px;
  }

  .item,
  .dp-item {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid @primary-color;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: @shadow;
  }

  .dp-item {
    border-color: @dp-color;
    background: lighten(@dp-color, 40%);
    color: darken(@dp-color, 20%);
  }

  .arrow-space {
    min-width: 70px;
  }

  .arrows {
    display: flex;
    gap: 10px;
  }

  .arrow-container {
    position: relative;
    width: 50px;
    height: 30px;
  }

  .arrow {
    position: absolute;
    top: 15px;
    left: 0;
    width: 80%;
    height: 2px;
    background: @text-color;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: -4px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 8px;
      border-color: transparent transparent transparent @text-color;
    }
  }

  .arrow-label {
    position: absolute;
    top: -20px;
    left: 10px;
    font-size: 0.8rem;
    color: @text-color;
  }
}

.greedy-visual {
  background: #f9fafb;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid @border-color;

  .step-vis {
    margin-bottom: 20px;
  }

  .step-label {
    font-weight: 600;
    margin-bottom: 15px;
    color: @greedy-color;
  }

  .step-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
    }

    &:first-child {
      font-weight: 600;
      background: lighten(@greedy-color, 35%);
      border-radius: 6px;
    }
  }

  .step-header {
    font-weight: 600;
    text-align: center;
  }

  .step-cell {
    padding: 6px 12px;
    text-align: center;
  }

  .conclusion {
    background: lighten(@success-color, 45%);
    border-left: 4px solid @success-color;
    border-radius: 6px;
    padding: 16px;
    font-weight: 500;

    .result {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      strong {
        color: darken(@success-color, 20%);
      }
    }
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  color: #e2e8f0;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 16px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  code {
    display: block;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
}

.comparison-header {
  padding: 16px;
  background: @primary-color;
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 1.1rem;

  &:first-child {
    background: lighten(@primary-color, 10%);
  }
}

.comparison-row {
  display: contents;

  & > div {
    padding: 14px 16px;
    border-bottom: 1px solid @border-color;
    display: flex;
    align-items: center;
  }

  &:nth-child(odd) > div {
    background: lighten(@light-bg, 1%);
  }

  &:last-child > div {
    border-bottom: none;
  }
}

.comparison-label {
  font-weight: 500;
  background: lighten(@primary-color, 45%) !important;
}

.comparison-value {
  justify-content: center;
}

.recommendation {
  background: lighten(@info-color, 40%);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid @info-color;

  h3 {
    margin-top: 0;
    color: darken(@info-color, 20%);
    border-bottom: none;
  }

  ul {
    padding-left: 24px;
    margin: 12px 0;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
}

@media (max-width: 768px) {
  .header-section h1 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .visual-guide {
    .sequence-items,
    .dp-items {
      flex-wrap: wrap;
    }
  }

  .greedy-visual .step-row {
    grid-template-columns: 1fr;

    .step-header {
      display: none;
    }
  }

  .comparison-grid {
    grid-template-columns: 1fr;

    .comparison-header {
      display: none;
    }

    .comparison-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid @border-color;

      & > div {
        padding: 12px 16px;
        border-bottom: none;
      }

      & > div:first-child {
        font-weight: 600;
        background: lighten(@primary-color, 45%);
      }
    }
  }
}
</style>
