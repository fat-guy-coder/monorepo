<template>
  <div class="complexity-guide">
    <header>
      <h1>算法复杂度分析</h1>
      <p>理解程序性能的关键指标</p>
    </header>

    <main>
      <!-- 复杂度基础 -->
      <section class="complexity-basics">
        <h2>复杂度基础概念</h2>
        <div class="content">
          <div class="definition">
            <p><strong>算法复杂度</strong> 衡量算法在输入规模增长时所需资源（时间或空间）的增长趋势。</p>
            <div class="types">
              <div class="type">
                <div class="icon">⏱️</div>
                <h3>时间复杂度</h3>
                <p>执行算法所需的计算操作数量</p>
              </div>
              <div class="type">
                <div class="icon">💾</div>
                <h3>空间复杂度</h3>
                <p>执行算法所需的内存空间</p>
              </div>
            </div>
          </div>

          <div class="big-o">
            <h3>大O表示法 (Big O Notation)</h3>
            <div class="notation">
              <div class="symbol">O( )</div>
              <div class="explanation">
                <p>描述算法复杂度的渐进上界，忽略常数因子和低阶项</p>
                <div class="example">
                  <p>例如：<code>3n² + 2n + 1</code> 表示为 <code>O(n²)</code></p>
                </div>
              </div>
            </div>
            <div class="key-points">
              <div class="point">
                <div class="check">✓</div>
                <p>关注最坏情况下的性能</p>
              </div>
              <div class="point">
                <div class="check">✓</div>
                <p>描述输入规模增长时的趋势</p>
              </div>
              <div class="point">
                <div class="check">✓</div>
                <p>提供算法性能的理论分析框架</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 时间复杂度 -->
      <section class="time-complexity">
        <h2>时间复杂度等级</h2>
        <div class="complexity-levels">
          <div class="level">
            <h3>O(1) - 常数时间</h3>
            <p>操作时间不随输入规模变化</p>
            <div class="visual">
              <div class="chart">
                <div class="line constant"></div>
              </div>
            </div>
            <pre><code>// 数组访问
function getFirst(arr: number[]) {
  return arr[0]; // O(1)
}</code></pre>
          </div>

          <div class="level">
            <h3>O(log n) - 对数时间</h3>
            <p>操作时间随输入规模对数增长</p>
            <div class="visual">
              <div class="chart">
                <div class="line logarithmic"></div>
              </div>
            </div>
            <pre><code>// 二分查找
function binarySearch(arr: number[], target: number) {
  let low = 0, high = arr.length - 1;
  while (low <= high) { // O(log n)
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}</code></pre>
          </div>

          <div class="level">
            <h3>O(n) - 线性时间</h3>
            <p>操作时间与输入规模成正比</p>
            <div class="visual">
              <div class="chart">
                <div class="line linear"></div>
              </div>
            </div>
            <pre><code>// 遍历数组
function findMax(arr: number[]) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) { // O(n)
    if (arr[i] > max) max = arr[i];
  }
  return max;
}</code></pre>
          </div>

          <div class="level">
            <h3>O(n log n) - 线性对数时间</h3>
            <p>常见于高效排序算法</p>
            <div class="visual">
              <div class="chart">
                <div class="line linearithmic"></div>
              </div>
            </div>
            <pre><code>// 快速排序
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [], right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  // O(n log n) 平均情况
  return [...quickSort(left), pivot, ...quickSort(right)];
}</code></pre>
          </div>

          <div class="level">
            <h3>O(n²) - 平方时间</h3>
            <p>操作时间与输入规模平方成正比</p>
            <div class="visual">
              <div class="chart">
                <div class="line quadratic"></div>
              </div>
            </div>
            <pre><code>// 冒泡排序
function bubbleSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) { // O(n²)
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}</code></pre>
          </div>

          <div class="level">
            <h3>O(2ⁿ) - 指数时间</h3>
            <p>操作时间随输入规模指数增长</p>
            <div class="visual">
              <div class="chart">
                <div class="line exponential"></div>
              </div>
            </div>
            <pre><code>// 斐波那契数列（递归实现）
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // O(2ⁿ)
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 空间复杂度 -->
      <section class="space-complexity">
        <h2>空间复杂度分析</h2>
        <div class="space-levels">
          <div class="level">
            <h3>O(1) - 常数空间</h3>
            <p>算法使用固定大小的内存空间</p>
            <pre><code>// 变量数量固定
function sum(a: number, b: number) {
  return a + b; // O(1) 空间
}</code></pre>
          </div>

          <div class="level">
            <h3>O(n) - 线性空间</h3>
            <p>算法空间使用与输入规模成正比</p>
            <pre><code>// 创建新数组
function copyArray(arr: number[]) {
  const newArr = []; // O(n) 空间
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}</code></pre>
          </div>

          <div class="level">
            <h3>O(n²) - 平方空间</h3>
            <p>算法空间使用与输入规模平方成正比</p>
            <pre><code>// 创建二维数组
function createMatrix(n: number) {
  const matrix = []; // O(n²) 空间
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = i * j;
    }
  }
  return matrix;
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 复杂度计算 -->
      <section class="complexity-calculation">
        <h2>复杂度计算规则</h2>
        <div class="rules">
          <div class="rule">
            <h3>1. 顺序结构</h3>
            <p>时间复杂度相加，取最高阶项</p>
            <pre><code>// O(n) + O(n²) = O(n²)
function example(arr: number[]) {
  for (let i = 0; i < arr.length; i++) { // O(n)
    console.log(arr[i]);
  }

  for (let i = 0; i < arr.length; i++) { // O(n²)
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}</code></pre>
          </div>

          <div class="rule">
            <h3>2. 循环结构</h3>
            <p>循环次数乘以循环体复杂度</p>
            <pre><code>// 外层循环 O(n), 内层循环 O(n) → O(n²)
function nestedLoops(n: number) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 操作
    }
  }
}</code></pre>
          </div>

          <div class="rule">
            <h3>3. 条件语句</h3>
            <p>取各分支中复杂度最高的</p>
            <pre><code>// 分支1 O(1), 分支2 O(n) → O(n)
function conditional(arr: number[], flag: boolean) {
  if (flag) {
    return arr[0]; // O(1)
  } else {
    for (let i = 0; i < arr.length; i++) { // O(n)
      // 操作
    }
  }
}</code></pre>
          </div>

          <div class="rule">
            <h3>4. 递归算法</h3>
            <p>分析递归深度和每层操作数</p>
            <pre><code>// 二分递归 O(2^depth) = O(2^log₂n) = O(n)
function recursive(n: number): number {
  if (n <= 1) return 1;
  return recursive(n - 1) + recursive(n - 1);
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 复杂度比较 -->
      <section class="complexity-comparison">
        <h2>复杂度比较</h2>
        <div class="comparison-content">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>复杂度</th>
                  <th>n=10</th>
                  <th>n=100</th>
                  <th>n=1000</th>
                  <th>适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>O(1)</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>数学运算，简单查询</td>
                </tr>
                <tr>
                  <td>O(log n)</td>
                  <td>3.32</td>
                  <td>6.64</td>
                  <td>9.97</td>
                  <td>二分查找，平衡树操作</td>
                </tr>
                <tr>
                  <td>O(n)</td>
                  <td>10</td>
                  <td>100</td>
                  <td>1000</td>
                  <td>简单遍历，线性搜索</td>
                </tr>
                <tr>
                  <td>O(n log n)</td>
                  <td>33.2</td>
                  <td>664</td>
                  <td>9970</td>
                  <td>高效排序算法</td>
                </tr>
                <tr>
                  <td>O(n²)</td>
                  <td>100</td>
                  <td>10,000</td>
                  <td>1,000,000</td>
                  <td>简单排序，嵌套循环</td>
                </tr>
                <tr>
                  <td>O(2ⁿ)</td>
                  <td>1,024</td>
                  <td>1.26e+30</td>
                  <td>1.07e+301</td>
                  <td>穷举搜索，暴力破解</td>
                </tr>
                <tr>
                  <td>O(n!)</td>
                  <td>3,628,800</td>
                  <td>9.33e+157</td>
                  <td>4.02e+2567</td>
                  <td>旅行商问题，全排列</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="complexity-chart">
            <div class="chart-container">
              <div class="chart-lines">
                <div class="line constant" :style="{ width: '5%' }">O(1)</div>
                <div class="line logarithmic" :style="{ width: '15%' }">O(log n)</div>
                <div class="line linear" :style="{ width: '30%' }">O(n)</div>
                <div class="line linearithmic" :style="{ width: '45%' }">O(n log n)</div>
                <div class="line quadratic" :style="{ width: '65%' }">O(n²)</div>
                <div class="line exponential" :style="{ width: '95%' }">O(2ⁿ)</div>
              </div>
              <div class="chart-axis">
                <div>低</div>
                <div>输入规模 (n)</div>
                <div>高</div>
              </div>
            </div>
            <div class="chart-legend">
              <div v-for="(type, index) in complexityTypes" :key="index" class="legend-item">
                <div class="color-box" :class="type.class"></div>
                <div class="label">{{ type.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 复杂度优化 -->
      <section class="optimization">
        <h2>复杂度优化策略</h2>
        <div class="strategies">
          <div class="strategy">
            <div class="number">1</div>
            <h3>选择合适的数据结构</h3>
            <p>使用哈希表(O(1))替代数组搜索(O(n))</p>
          </div>
          <div class="strategy">
            <div class="number">2</div>
            <h3>减少嵌套循环</h3>
            <p>将O(n²)算法优化为O(n log n)或O(n)</p>
          </div>
          <div class="strategy">
            <div class="number">3</div>
            <h3>使用分治策略</h3>
            <p>将问题分解为更小的子问题解决</p>
          </div>
          <div class="strategy">
            <div class="number">4</div>
            <h3>空间换时间</h3>
            <p>使用额外空间存储中间结果</p>
          </div>
          <div class="strategy">
            <div class="number">5</div>
            <h3>避免重复计算</h3>
            <p>使用缓存存储已计算结果</p>
          </div>
          <div class="strategy">
            <div class="number">6</div>
            <h3>剪枝优化</h3>
            <p>在搜索算法中提前终止无效分支</p>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2023 算法复杂度基础介绍 | 使用Vue3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 复杂度类型数据
const complexityTypes = [
  { class: "constant", label: "O(1) 常数" },
  { class: "logarithmic", label: "O(log n) 对数" },
  { class: "linear", label: "O(n) 线性" },
  { class: "linearithmic", label: "O(n log n) 线性对数" },
  { class: "quadratic", label: "O(n²) 平方" },
  { class: "exponential", label: "O(2ⁿ) 指数" }
];
</script>

<style lang="less" scoped>
@primary: #4361ee;
@secondary: #3a0ca3;
@accent: #4cc9f0;
@constant: #2ec4b6;
@logarithmic: #38b000;
@linear: #ffd166;
@linearithmic: #ff9e00;
@quadratic: #ff6b6b;
@exponential: #ef476f;
@light: #f8f9fa;
@dark: #212529;

// 基础样式
.complexity-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: @dark;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: @secondary;
      background: linear-gradient(135deg, @secondary, @primary);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: lighten(@dark, 20%);
      font-size: 1.1rem;
    }
  }

  section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid @accent;
      color: @secondary;
    }
  }
}

// 基础概念部分
.complexity-basics {
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;

    .type {
      text-align: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid @primary;

      .icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0.5rem 0;
        color: @secondary;
      }
    }
  }

  .big-o {
    .notation {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;

      .symbol {
        font-size: 3rem;
        font-weight: bold;
        color: @primary;
      }
    }

    .example {
      background: #f1f3f5;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-family: 'Fira Code', monospace;

      code {
        background: #e9ecef;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
      }
    }

    .key-points {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;

      .point {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        .check {
          width: 24px;
          height: 24px;
          background: @primary;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      }
    }
  }
}

// 时间复杂度部分
.time-complexity {
  .complexity-levels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .level {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    border-top: 4px solid @primary;

    h3 {
      margin-top: 0;
      color: @secondary;
    }

    .visual {
      height: 100px;
      margin: 1rem 0;

      .chart {
        width: 100%;
        height: 100%;
        position: relative;

        .line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: @primary;
        }

        .constant {
          width: 100%;
          background: @constant;
        }

        .logarithmic {
          width: 80%;
          background: @logarithmic;
        }

        .linear {
          width: 60%;
          background: @linear;
        }

        .linearithmic {
          width: 40%;
          background: @linearithmic;
        }

        .quadratic {
          width: 20%;
          background: @quadratic;
        }

        .exponential {
          width: 5%;
          background: @exponential;
        }
      }
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;
      margin-top: 1rem;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

// 空间复杂度部分
.space-complexity {
  .space-levels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .level {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;

      h3 {
        margin-top: 0;
        color: @secondary;
      }

      pre {
        background: #2d3748;
        border-radius: 6px;
        padding: 1rem;
        overflow: auto;
        margin-top: 1rem;

        code {
          font-family: 'Fira Code', monospace;
          color: #cbd5e0;
          font-size: 0.85rem;
          line-height: 1.4;
        }
      }
    }
  }
}

// 复杂度计算部分
.complexity-calculation {
  .rules {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .rule {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;

      h3 {
        margin-top: 0;
        color: @secondary;
      }

      pre {
        background: #2d3748;
        border-radius: 6px;
        padding: 1rem;
        overflow: auto;
        margin-top: 1rem;

        code {
          font-family: 'Fira Code', monospace;
          color: #cbd5e0;
          font-size: 0.85rem;
          line-height: 1.4;
        }
      }
    }
  }
}

// 复杂度比较部分
.complexity-comparison {
  .comparison-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .table-container {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid #e9ecef;
      }

      th {
        background: #f8f9fa;
        font-weight: 600;
      }

      tbody tr:nth-child(odd) {
        background-color: #f8f9fa;
      }

      tbody tr:hover {
        background-color: #e9ecef;
      }

      td:first-child {
        font-weight: 500;
        text-align: left;
      }
    }
  }

  .complexity-chart {
    .chart-container {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }

    .chart-lines {
      height: 200px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .line {
        height: 3px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: -5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: inherit;
        }

        &.constant { background: @constant; }
        &.logarithmic { background: @logarithmic; }
        &.linear { background: @linear; }
        &.linearithmic { background: @linearithmic; }
        &.quadratic { background: @quadratic; }
        &.exponential { background: @exponential; }
      }
    }

    .chart-axis {
      display: flex;
      justify-content: space-between;
      padding-top: 0.5rem;
      border-top: 1px solid #dee2e6;
      font-size: 0.9rem;
      color: #6c757d;
    }

    .chart-legend {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .color-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;

          &.constant { background: @constant; }
          &.logarithmic { background: @logarithmic; }
          &.linear { background: @linear; }
          &.linearithmic { background: @linearithmic; }
          &.quadratic { background: @quadratic; }
          &.exponential { background: @exponential; }
        }

        .label {
          font-size: 0.9rem;
        }
      }
    }
  }
}

// 优化策略部分
.optimization {
  .strategies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .strategy {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    .number {
      width: 36px;
      height: 36px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      font-size: 1.1rem;
    }

    h3 {
      margin: 0 0 0.5rem;
      color: @secondary;
    }
  }
}

// 页脚
footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: lighten(@dark, 30%);
  font-size: 0.9rem;
  border-top: 1px solid #e9ecef;
}
</style>
