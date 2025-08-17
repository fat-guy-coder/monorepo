<template>
  <div class="bucket-algorithms-container">
    <div class="header">
      <h1><i class="fas fa-database"></i> 桶相关算法基础介绍</h1>
      <p class="subtitle">探索桶排序、计数排序、基数排序及其应用</p>
    </div>

    <div class="intro-card">
      <div class="intro-icon">
        <i class="fas fa-fill-drip"></i>
      </div>
      <div class="intro-content">
        <h3>什么是桶相关算法？</h3>
        <p>桶相关算法是一类基于"分桶"思想的排序和数据处理技术，将元素分配到不同的桶中，然后分别处理每个桶。这类算法通常具有线性时间复杂度，适用于特定类型的数据分布。</p>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="fas fa-sort-amount-down-alt"></i> 桶排序 (Bucket Sort)</h2>
        <p>将元素分配到有限数量的桶中，然后分别对每个桶进行排序</p>
      </div>

      <div class="algorithm-card">
        <div class="algorithm-visual">
          <div class="visual-title">桶排序可视化过程</div>
          <div class="buckets-container">
            <div class="bucket" v-for="(bucket, index) in bucketSortBuckets" :key="index">
              <div class="bucket-label">桶 {{ index + 1 }}</div>
              <div class="bucket-items">
                <div class="item" v-for="(item, i) in bucket" :key="i">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="algorithm-details">
          <h3>算法介绍</h3>
          <p>桶排序假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（可能使用其他排序算法或递归方式）。最后将各个桶中的数据有序合并。</p>

          <h3>算法思路</h3>
          <ol>
            <li>创建 n 个空桶</li>
            <li>遍历原始数组，将每个元素放入对应的桶中</li>
            <li>对每个非空桶中的元素进行排序</li>
            <li>按顺序遍历所有桶，将元素放回原始数组</li>
          </ol>

          <h3>时间复杂度</h3>
          <div class="complexity">
            <span class="badge best">最好: O(n)</span>
            <span class="badge avg">平均: O(n+k)</span>
            <span class="badge worst">最坏: O(n²)</span>
          </div>

          <h3>使用场景</h3>
          <ul>
            <li>输入数据均匀分布在固定范围内</li>
            <li>处理浮点数排序</li>
            <li>外部排序（数据量大于内存容量）</li>
          </ul>
        </div>
      </div>

      <div class="code-section">
        <pre><code class="typescript">// 桶排序算法实现
function bucketSort(arr: number[], bucketSize = 5): number[] {
  if (arr.length === 0) return arr;

  // 1. 确定数据范围
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    else if (arr[i] > max) max = arr[i];
  }

  // 2. 初始化桶
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets: number[][] = new Array(bucketCount);
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  // 3. 将数据分配到各个桶中
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
    buckets[bucketIndex].push(arr[i]);
  }

  // 4. 对每个桶进行排序，并合并结果
  const sortedArr: number[] = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i].length > 0) {
      // 使用插入排序对每个桶排序
      insertionSort(buckets[i]);
      sortedArr.push(...buckets[i]);
    }
  }

  return sortedArr;
}

// 插入排序（用于桶内排序）
function insertionSort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}</code></pre>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="fas fa-sort-numeric-down-alt"></i> 计数排序 (Counting Sort)</h2>
        <p>统计每个元素的出现次数，然后重建有序序列</p>
      </div>

      <div class="algorithm-card">
        <div class="algorithm-visual">
          <div class="visual-title">计数排序可视化过程</div>
          <div class="counting-visual">
            <div class="original-array">
              <div class="array-label">原始数组</div>
              <div class="array-items">
                <div v-for="(item, i) in countingSortOriginal" :key="i" class="item">
                  {{ item }}
                </div>
              </div>
            </div>

            <div class="counting-array">
              <div class="array-label">计数数组</div>
              <div class="counting-bars">
                <div v-for="(count, i) in countingSortCounts" :key="i" class="counting-bar-container">
                  <div class="index-label">{{ i }}</div>
                  <div class="counting-bar" :style="{ height: count * 20 + 'px' }">
                    {{ count > 0 ? count : '' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="algorithm-details">
          <h3>算法介绍</h3>
          <p>计数排序通过统计每个元素出现的次数，然后计算每个元素在输出序列中的位置，最后将元素放入正确位置。它不是基于比较的排序算法，时间复杂度为线性。</p>

          <h3>算法思路</h3>
          <ol>
            <li>找出待排序数组中的最大值</li>
            <li>创建计数数组，长度为max+1</li>
            <li>遍历原始数组，统计每个元素出现的次数</li>
            <li>将计数数组转化为前缀和数组</li>
            <li>反向遍历原始数组，根据计数数组确定元素位置</li>
          </ol>

          <h3>时间复杂度</h3>
          <div class="complexity">
            <span class="badge best">O(n+k)</span>
            <span class="badge">空间复杂度: O(n+k)</span>
          </div>

          <h3>使用场景</h3>
          <ul>
            <li>数据范围不大（k较小）</li>
            <li>整数排序</li>
            <li>作为基数排序的子过程</li>
          </ul>
        </div>
      </div>

      <div class="code-section">
        <pre><code class="typescript">// 计数排序算法实现
function countingSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  // 1. 找到数组中的最大值
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }

  // 2. 初始化计数数组
  const countArr = new Array(max + 1).fill(0);

  // 3. 统计每个元素出现的次数
  for (let i = 0; i < arr.length; i++) {
    countArr[arr[i]]++;
  }

  // 4. 将计数数组转换为前缀和数组
  for (let i = 1; i <= max; i++) {
    countArr[i] += countArr[i - 1];
  }

  // 5. 创建结果数组
  const result = new Array(arr.length);

  // 6. 反向遍历原始数组，将元素放入正确位置
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const pos = countArr[num] - 1;
    result[pos] = num;
    countArr[num]--;
  }

  return result;
}</code></pre>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="fas fa-sort-amount-down"></i> 基数排序 (Radix Sort)</h2>
        <p>按照每个数字的位进行排序，从最低位到最高位</p>
      </div>

      <div class="algorithm-card">
        <div class="algorithm-visual">
          <div class="visual-title">基数排序可视化过程</div>
          <div class="radix-steps">
            <div v-for="(step, index) in radixSortSteps" :key="index" class="radix-step">
              <div class="step-header">第 {{ index + 1 }} 轮 ({{ step.digit }}位)</div>
              <div class="buckets-container">
                <div v-for="(bucket, bIndex) in step.buckets" :key="bIndex" class="bucket">
                  <div class="bucket-label">{{ bIndex }}</div>
                  <div class="bucket-items">
                    <div v-for="(item, i) in bucket" :key="i" class="item">{{ item }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="algorithm-details">
          <h3>算法介绍</h3>
          <p>基数排序是一种非比较型整数排序算法，它将整数按位数切割成不同的数字，然后按每个位数分别比较排序。通常使用计数排序作为基础的稳定排序算法。</p>

          <h3>算法思路</h3>
          <ol>
            <li>获取数组中最大元素的位数</li>
            <li>从最低有效位（个位）开始</li>
            <li>根据当前位数字将元素分配到桶中</li>
            <li>从0到9的桶中顺序收集元素</li>
            <li>重复步骤2-4，直到最高位</li>
          </ol>

          <h3>时间复杂度</h3>
          <div class="complexity">
            <span class="badge best">O(d*(n+k))</span>
            <span>(d为最大位数，k为基数)</span>
          </div>

          <h3>使用场景</h3>
          <ul>
            <li>整数排序（特别是大整数）</li>
            <li>数字字符串排序</li>
            <li>日期排序（年、月、日）</li>
          </ul>
        </div>
      </div>

      <div class="code-section">
        <pre><code class="typescript">// 基数排序算法实现
function radixSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  // 1. 获取最大数的位数
  const max = Math.max(...arr);
  const maxDigit = String(max).length;

  // 2. 从个位开始，按每一位进行排序
  for (let digit = 0; digit < maxDigit; digit++) {
    // 3. 创建10个桶（0-9）
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    // 4. 根据当前位数字分配到桶中
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      const digitValue = Math.floor(num / Math.pow(10, digit)) % 10;
      buckets[digitValue].push(num);
    }

    // 5. 从桶中收集元素
    arr = buckets.flat();
  }

  return arr;
}

// 优化的基数排序（使用计数排序）
function radixSortWithCounting(arr: number[]): number[] {
  const max = Math.max(...arr);
  const maxDigit = String(max).length;
  let mod = 10;
  let dev = 1;

  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    // 使用计数排序对每位排序
    const counter: number[][] = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      const bucket = Math.floor(arr[j] % mod / dev);
      counter[bucket].push(arr[j]);
    }

    // 合并数组
    let pos = 0;
    for (let j = 0; j < counter.length; j++) {
      for (let k = 0; k < counter[j].length; k++) {
        arr[pos++] = counter[j][k];
      }
    }
  }

  return arr;
}</code></pre>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="fas fa-lightbulb"></i> 桶算法应用场景</h2>
      </div>

      <div class="applications">
        <div class="app-card">
          <div class="app-icon">
            <i class="fas fa-chart-bar"></i>
          </div>
          <h3>数据统计</h3>
          <p>使用桶进行数据分桶统计，制作直方图</p>
        </div>

        <div class="app-card">
          <div class="app-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>近似搜索</h3>
          <p>通过桶分组快速查找近似值</p>
        </div>

        <div class="app-card">
          <div class="app-icon">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <h3>金融分析</h3>
          <p>分组计算价格区间交易量</p>
        </div>

        <div class="app-card">
          <div class="app-icon">
            <i class="fas fa-image"></i>
          </div>
          <h3>图像处理</h3>
          <p>图像直方图均衡化使用桶算法</p>
        </div>
      </div>

      <div class="advanced-topics">
        <h3><i class="fas fa-gem"></i> 高级应用：最大间距问题</h3>
        <div class="problem">
          <p><strong>问题描述：</strong> 给定一个无序数组，求排序后相邻元素的最大差值</p>
          <p><strong>桶算法解法：</strong></p>
          <ol>
            <li>计算数组最小值和最大值</li>
            <li>创建 n 个桶，每个桶宽度为 (max-min)/n</li>
            <li>将元素分配到桶中</li>
            <li>最大间距出现在相邻非空桶之间或桶内</li>
            <li>只需比较相邻非空桶的最小值与前一桶最大值</li>
          </ol>
          <p><strong>时间复杂度：</strong> O(n) &nbsp;&nbsp; <strong>空间复杂度：</strong> O(n)</p>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2><i class="fas fa-balance-scale"></i> 桶相关算法对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>算法</th>
              <th>时间复杂度</th>
              <th>空间复杂度</th>
              <th>稳定性</th>
              <th>适用数据类型</th>
              <th>数据分布要求</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>桶排序</td>
              <td>O(n+k)</td>
              <td>O(n+k)</td>
              <td>稳定</td>
              <td>浮点数、整数</td>
              <td>均匀分布</td>
            </tr>
            <tr>
              <td>计数排序</td>
              <td>O(n+k)</td>
              <td>O(n+k)</td>
              <td>稳定</td>
              <td>整数</td>
              <td>范围小</td>
            </tr>
            <tr>
              <td>基数排序</td>
              <td>O(d*(n+k))</td>
              <td>O(n+k)</td>
              <td>稳定</td>
              <td>整数、字符串</td>
              <td>位数固定</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer">
      <div class="key-points">
        <h3><i class="fas fa-key"></i> 桶算法关键点</h3>
        <ul>
          <li>桶算法通常具有线性时间复杂度</li>
          <li>适用于特定数据分布的场景</li>
          <li>计数排序是桶排序的特殊形式</li>
          <li>基数排序使用桶排序作为子过程</li>
          <li>桶的数量和大小是算法效率的关键</li>
        </ul>
      </div>
      <div class="resources">
        <h3><i class="fas fa-book"></i> 学习资源</h3>
        <ul>
          <li>《算法导论》第8章 - 线性时间排序</li>
          <li>LeetCode 桶算法专题练习</li>
          <li>可视化算法学习网站</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 桶排序可视化数据
const bucketSortBuckets = ref([
  [0.12, 0.23, 0.42],
  [0.56, 0.67, 0.78],
  [0.89, 0.95]
]);

// 计数排序可视化数据
const countingSortOriginal = ref([4, 2, 2, 8, 3, 3, 1]);
const countingSortCounts = ref([0, 1, 2, 2, 1, 0, 0, 0, 1]);

// 基数排序可视化数据
const radixSortSteps = ref([
  {
    digit: "个位",
    buckets: [
      [70, 40],
      [21, 51],
      [12, 42],
      [73],
      [64],
      [35],
      [56],
      [97],
      [88],
      [19]
    ]
  },
  {
    digit: "十位",
    buckets: [
      [12, 19],
      [21],
      [35],
      [40, 42],
      [51, 56],
      [64],
      [70, 73],
      [88],
      [97]
    ]
  }
]);
</script>

<style lang="less" scoped>



// 颜色定义
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #f72585;
@success-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #2b2d42;
@text-secondary: #8d99ae;

// 标签颜色
@best-color: #2ecc71;
@avg-color: #3498db;
@worst-color: #e74c3c;
@complexity-color: #9b59b6;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bucket-algorithms-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  background-color: @light-bg;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 30px 0;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    i {
      font-size: 2rem;
      color: @secondary-color;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    font-weight: 400;
  }
}

.intro-card {
  display: flex;
  background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.1));
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 40px;
  border-left: 4px solid @primary-color;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);

  .intro-icon {
    width: 70px;
    height: 70px;
    background: rgba(67, 97, 238, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: @primary-color;
    margin-right: 25px;
    flex-shrink: 0;
  }

  .intro-content {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: @text-color;
    }

    p {
      font-size: 1.05rem;
      line-height: 1.7;
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-header {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid rgba(67, 97, 238, 0.15);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      color: @text-color;
      display: flex;
      align-items: center;
      gap: 15px;

      i {
        color: @primary-color;
        font-size: 1.5rem;
      }
    }

    p {
      color: @text-secondary;
      padding-left: 45px;
      font-size: 1.05rem;
    }
  }
}

.algorithm-card {
  display: flex;
  gap: 30px;
  margin-bottom: 35px;

  .algorithm-visual {
    flex: 1;
    background: rgba(67, 97, 238, 0.03);
    border-radius: 10px;
    padding: 20px;
    border: 1px solid rgba(67, 97, 238, 0.1);

    .visual-title {
      font-weight: 600;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border-color;
      color: @primary-color;
      font-size: 1.1rem;
    }
  }

  .algorithm-details {
    flex: 1;

    h3 {
      font-size: 1.3rem;
      margin: 20px 0 12px;
      color: @text-color;
      padding-bottom: 8px;
      border-bottom: 1px solid @border-color;
    }

    ol,
    ul {
      padding-left: 25px;
      margin: 15px 0;

      li {
        margin-bottom: 8px;
        line-height: 1.6;
      }
    }
  }
}

.buckets-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;

  .bucket {
    min-width: 120px;
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);

    .bucket-label {
      background: rgba(67, 97, 238, 0.1);
      text-align: center;
      padding: 8px;
      font-weight: 600;
      color: @primary-color;
      border-bottom: 1px solid @border-color;
    }

    .bucket-items {
      padding: 10px;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      justify-content: center;

      .item {
        background: rgba(67, 97, 238, 0.08);
        padding: 8px 12px;
        border-radius: 5px;
        font-weight: 500;
        font-size: 0.95rem;
      }
    }
  }
}

.complexity {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 15px 0;

  .badge {
    padding: 6px 14px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 0.9rem;

    &.best {
      background: rgba(@best-color, 0.15);
      color: darken(@best-color, 20%);
    }

    &.avg {
      background: rgba(@avg-color, 0.15);
      color: darken(@avg-color, 20%);
    }

    &.worst {
      background: rgba(@worst-color, 0.15);
      color: darken(@worst-color, 15%);
    }
  }
}

.code-section {
  background: #2c3e50;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  pre {
    margin: 0;
    padding: 25px;
    overflow-x: auto;

    code {
      color: #ecf0f1;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.counting-visual {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .original-array,
  .counting-array {
    .array-label {
      font-weight: 500;
      margin-bottom: 12px;
      color: @text-secondary;
    }
  }

  .array-items {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;

    .item {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(67, 97, 238, 0.15);
      border-radius: 8px;
      font-weight: 600;
      border: 1px solid rgba(67, 97, 238, 0.3);
    }
  }

  .counting-bars {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 15px 0;

    .counting-bar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .index-label {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .counting-bar {
      width: 35px;
      background: rgba(76, 201, 240, 0.7);
      border-radius: 5px 5px 0 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 5px 0;
      font-weight: 600;
      color: white;
      transition: height 0.5s ease;
    }
  }
}

.radix-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .radix-step {
    .step-header {
      font-weight: 500;
      margin-bottom: 12px;
      color: @primary-color;
      padding-bottom: 5px;
      border-bottom: 1px solid @border-color;
    }
  }
}

.applications {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;

  .app-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.09);
    }

    .app-icon {
      width: 70px;
      height: 70px;
      margin: 0 auto 20px;
      background: rgba(67, 97, 238, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: @primary-color;
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: 10px;
      color: @text-color;
    }

    p {
      font-size: 0.95rem;
      color: @text-secondary;
    }
  }
}

.advanced-topics {
  background: rgba(249, 245, 255, 0.6);
  border-radius: 12px;
  padding: 25px;
  margin: 35px 0;
  border-left: 4px solid @accent-color;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: @text-color;
    display: flex;
    align-items: center;
    gap: 12px;

    i {
      color: @accent-color;
    }
  }

  .problem {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);

    p {
      margin: 15px 0;
      line-height: 1.7;
    }

    ol {
      margin-left: 25px;

      li {
        margin-bottom: 10px;
      }
    }
  }
}

.comparison-section {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  margin: 40px 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: @text-color;
    display: flex;
    align-items: center;
    gap: 15px;

    i {
      color: @primary-color;
    }
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

    th,
    td {
      padding: 16px 20px;
      text-align: center;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;
        font-size: 1.05rem;
      }
    }

    tbody {
      tr {
        &:nth-child(even) {
          background: rgba(67, 97, 238, 0.04);
        }

        &:hover {
          background: rgba(67, 97, 238, 0.08);
        }

        td {
          border-bottom: 1px solid @border-color;
          font-weight: 500;

          &:first-child {
            font-weight: 600;
            color: @primary-color;
          }
        }
      }
    }
  }
}

.footer {
  display: flex;
  gap: 40px;
  margin-top: 40px;
  padding: 30px 0;
  border-top: 1px solid @border-color;

  .key-points,
  .resources {
    flex: 1;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 20px;
      color: @text-color;
      display: flex;
      align-items: center;
      gap: 12px;

      i {
        color: @primary-color;
      }
    }

    ul {
      list-style-type: none;

      li {
        padding: 12px 0;
        border-bottom: 1px dashed @border-color;
        display: flex;
        align-items: flex-start;
        gap: 10px;

        &:before {
          content: "•";
          color: @primary-color;
          font-weight: bold;
          font-size: 1.2rem;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 900px) {
  .algorithm-card {
    flex-direction: column;
  }

  .footer {
    flex-direction: column;
    gap: 30px;
  }
}

@media (max-width: 600px) {
  .header h1 {
    font-size: 2rem;
  }

  .intro-card {
    flex-direction: column;
    text-align: center;

    .intro-icon {
      margin: 0 auto 20px;
    }
  }

  .section {
    padding: 20px;
  }
}
</style>
