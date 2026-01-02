<template>
  <div class="lis-container">
    <header class="header">
      <h1>最长递增子序列 (LIS)</h1>
      <p>算法原理与优化方法基本介绍</p>
    </header>

    <div class="content">
      <div class="columns">
        <section class="section">
          <h2>概念解析</h2>
          <div class="card">
            <h3>什么是LIS?</h3>
            <p>最长递增子序列(Longest Increasing Subsequence)是指在一个序列中找到一个最长的子序列，使得这个子序列中的元素是严格递增的</p>
          </div>
          <div class="card">
            <h3>基本特点</h3>
            <ul>
              <li>子序列元素在原序列中不一定连续</li>
              <li>子序列元素保持原有顺序</li>
              <li>要求严格递增 (即后一元素必须大于前一元素)</li>
            </ul>
          </div>
          <div class="card">
            <h3>示例</h3>
            <div class="sequence-example">
              <p>序列: [3, 4, -1, 0, 6, 2, 3]</p>
              <p>LIS: <span class="highlight">[-1, 0, 2, 3]</span> 长度=4</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>实现思路</h2>
          <div class="card">
            <h3>动态规划解法</h3>
            <p>时间复杂度: O(n²)</p>
            <ol>
              <li>创建dp数组，dp[i]表示以nums[i]结尾的LIS长度</li>
              <li>初始化dp数组所有元素为1</li>
              <li>遍历数组，对于每个元素nums[i]:
                <ul>
                  <li>遍历j从0到i-1</li>
                  <li>如果nums[i] > nums[j]，更新dp[i] = max(dp[i], dp[j] + 1)</li>
                </ul>
              </li>
              <li>dp数组中的最大值即为LIS长度</li>
            </ol>
          </div>
          <div class="card">
            <h3>贪心+二分查找优化</h3>
            <p>时间复杂度: O(n log n)</p>
            <ol>
              <li>创建tails数组存储可能的LIS</li>
              <li>遍历输入序列</li>
              <li>对于每个元素num:
                <ul>
                  <li>如果num大于tails所有元素，添加到tails末尾</li>
                  <li>否则，用num替换tails中第一个≥num的元素</li>
                </ul>
              </li>
              <li>tails的长度即为LIS长度</li>
            </ol>
          </div>
        </section>
      </div>

      <section class="section">
        <h2>代码实现</h2>
        <div class="code-group">
          <div class="code-block">
            <h3>动态规划解法 (O(n²))</h3>
            <pre><code>function lengthOfLIS(nums: number[]): number {
  const dp: number[] = new Array(nums.length).fill(1);
  let maxLen = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}</code></pre>
          </div>

          <div class="code-block">
            <h3>优化解法 (O(n log n))</h3>
            <pre><code>function lengthOfLISOptimal(nums: number[]): number {
  const tails: number[] = [];

  for (const num of nums) {
    // 二分查找插入位置
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}</code></pre>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>使用场景</h2>
        <div class="usage-grid">
          <div class="usage-card">
            <div class="icon">📈</div>
            <h3>股票分析</h3>
            <p>寻找最长的价格上升周期</p>
          </div>
          <div class="usage-card">
            <div class="icon">🧬</div>
            <h3>生物信息学</h3>
            <p>DNA序列比对与分析</p>
          </div>
          <div class="usage-card">
            <div class="icon">📊</div>
            <h3>数据压缩</h3>
            <p>优化数据存储结构</p>
          </div>
          <div class="usage-card">
            <div class="icon">🎮</div>
            <h3>游戏开发</h3>
            <p>路径规划与AI决策</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>算法可视化</h2>
        <div class="visualization">
          <div class="input-area">
            <input v-model="sequenceInput" placeholder="输入序列，如: 3,4,-1,0,6,2,3" @keyup.enter="calculateLIS">
            <button @click="calculateLIS">计算LIS</button>
          </div>

          <div class="result-area" v-if="result">
            <p>序列: [{{ sequenceInput }}]</p>
            <p>LIS长度: <strong>{{ result.length }}</strong></p>
            <p>最长递增子序列:
              <span class="highlight">{{ result.sequence.join(', ') }}</span>
            </p>
          </div>

          <div class="visual-container">
            <div class="sequence-display">
              <div v-for="(num, index) in sequence" :key="index" class="num-box" :class="{
                'active': result && result.indices.includes(index),
                'inactive': result && !result.indices.includes(index)
              }">
                {{ num }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 序列输入
const sequenceInput = ref('3,4,-1,0,6,2,3');
const sequence = ref<number[]>([]);
const result = ref<{ length: number; sequence: number[]; indices: number[] } | null>(null);

// 计算LIS（使用优化方法）
function calculateLIS() {
  try {
    sequence.value = sequenceInput.value
      .split(',')
      .map(s => parseFloat(s.trim()))
      .filter(n => !isNaN(n));

    if (sequence.value.length === 0) {
      result.value = null;
      return;
    }

    const { sequence: lis, indices } = findLIS(sequence.value);
    result.value = {
      length: lis.length,
      sequence: lis,
      indices
    };
  } catch (e) {
    result.value = null;
    console.error('输入格式错误:', e);
  }
}

// 查找LIS并返回序列和索引
function findLIS(nums: number[]): { sequence: number[]; indices: number[] } {
  const tails: number[] = [];
  const prevIndices: number[] = new Array(nums.length).fill(-1);
  const positions: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    // 二分查找
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num);
      positions.push(i);
    } else {
      tails[left] = num;
      positions[left] = i;
    }

    // 记录前驱索引
    if (left > 0) {
      prevIndices[i] = positions[left - 1];
    }
  }

  // 回溯构建LIS序列
  const lis: number[] = [];
  const indices: number[] = [];
  let currentIndex = positions[tails.length - 1];

  while (currentIndex !== -1) {
    lis.unshift(nums[currentIndex]);
    indices.unshift(currentIndex);
    currentIndex = prevIndices[currentIndex];
  }

  return { sequence: lis, indices };
}

// 初始计算
calculateLIS();
</script>

<style lang="less" scoped>
.lis-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-top: 0;
  }
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p,
  li {
    color: #5a6b7c;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 0.8rem 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
}

.sequence-example {
  background: #edf2ff;
  padding: 1rem;
  border-radius: 6px;
  font-family: monospace;

  .highlight {
    font-weight: bold;
    color: #4f46e5;
  }
}

.code-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;

  h3 {
    margin-top: 0;
    color: #e2e8f0;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.usage-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 10px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0 0 0.8rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.5;
    font-size: 0.95rem;
  }
}

.visualization {
  background: #f9fafb;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.input-area {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    }
  }

  button {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;

    &:hover {
      background: #4338ca;
    }
  }
}

.result-area {
  background: #edf2ff;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  p {
    margin: 0.5rem 0;
  }

  .highlight {
    font-weight: bold;
    color: #4f46e5;
    font-size: 1.1rem;
  }
}

.sequence-display {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.num-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.active {
  background: #4f46e5;
  color: white;
  transform: scale(1.1);
}

.inactive {
  background: #e2e8f0;
  color: #64748b;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }

  .code-group {
    grid-template-columns: 1fr;
  }
}
</style>
