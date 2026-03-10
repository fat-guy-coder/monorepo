<template>
  <div class="divide-conquer-container">
    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1>分治算法基础介绍</h1>
        <p class="subtitle">分解 · 解决 · 合并 - 高效解决问题的经典范式</p>
      </div>
    </header>

    <!-- 算法介绍 -->
    <section class="intro">
      <div class="intro-card">
        <h2>分治算法核心思想</h2>
        <div class="steps">
          <div class="step">
            <div class="step-icon">1</div>
            <h3>分解（Divide）</h3>
            <p>将原问题分解为若干个规模较小的子问题</p>
          </div>
          <div class="step">
            <div class="step-icon">2</div>
            <h3>解决（Conquer）</h3>
            <p>递归地解决各个子问题</p>
          </div>
          <div class="step">
            <div class="step-icon">3</div>
            <h3>合并（Combine）</h3>
            <p>将子问题的解合并为原问题的解</p>
          </div>
        </div>
        <div class="complexity">
          <h3>时间复杂度</h3>
          <p>分治算法的时间复杂度通常遵循主定理：</p>
          <pre>T(n) = aT(n/b) + f(n)</pre>
          <p>其中 a ≥ 1, b > 1, f(n) 是分解和合并步骤的时间</p>
        </div>
      </div>
    </section>

    <!-- 算法应用 -->
    <main class="applications">
      <!-- 归并排序 -->
      <section class="algorithm-card">
        <div class="algorithm-header">
          <div class="algorithm-icon">📊</div>
          <h2>归并排序</h2>
          <div class="time-complexity">O(n log n)</div>
        </div>
        <div class="algorithm-content">
          <div class="problem">
            <h3>问题描述</h3>
            <p>将无序数组排序为升序序列</p>
          </div>
          <div class="solution">
            <h3>解题思路</h3>
            <ol>
              <li>将数组分成两半</li>
              <li>递归地对左右子数组排序</li>
              <li>合并两个有序子数组</li>
            </ol>
          </div>
          <div class="code">
            <h3>代码实现</h3>
            <pre>function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}</pre>
          </div>
        </div>
      </section>

      <!-- 快速排序 -->
      <section class="algorithm-card">
        <div class="algorithm-header">
          <div class="algorithm-icon">⚡</div>
          <h2>快速排序</h2>
          <div class="time-complexity">O(n log n)</div>
        </div>
        <div class="algorithm-content">
          <div class="problem">
            <h3>问题描述</h3>
            <p>高效地对数组进行原地排序</p>
          </div>
          <div class="solution">
            <h3>解题思路</h3>
            <ol>
              <li>选择基准元素（pivot）</li>
              <li>分区：小于基准的放左边，大于基准的放右边</li>
              <li>递归地对左右子数组排序</li>
            </ol>
          </div>
          <div class="code">
            <h3>代码实现</h3>
            <pre>function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}</pre>
          </div>
        </div>
      </section>

      <!-- 二分查找 -->
      <section class="algorithm-card">
        <div class="algorithm-header">
          <div class="algorithm-icon">🔍</div>
          <h2>二分查找</h2>
          <div class="time-complexity">O(log n)</div>
        </div>
        <div class="algorithm-content">
          <div class="problem">
            <h3>问题描述</h3>
            <p>在有序数组中高效查找目标元素</p>
          </div>
          <div class="solution">
            <h3>解题思路</h3>
            <ol>
              <li>确定数组中间元素</li>
              <li>若中间元素等于目标值，返回索引</li>
              <li>若目标值小于中间元素，在左半部递归查找</li>
              <li>若目标值大于中间元素，在右半部递归查找</li>
            </ol>
          </div>
          <div class="code">
            <h3>代码实现</h3>
            <pre>function binarySearch(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) return mid;

  if (arr[mid] > target) {
    return binarySearch(arr, target, low, mid - 1);
  } else {
    return binarySearch(arr, target, mid + 1, high);
  }
}</pre>
          </div>
        </div>
      </section>

      <!-- 最大子数组问题 -->
      <section class="algorithm-card">
        <div class="algorithm-header">
          <div class="algorithm-icon">📈</div>
          <h2>最大子数组和</h2>
          <div class="time-complexity">O(n log n)</div>
        </div>
        <div class="algorithm-content">
          <div class="problem">
            <h3>问题描述</h3>
            <p>寻找具有最大和的连续子数组</p>
          </div>
          <div class="solution">
            <h3>解题思路</h3>
            <ol>
              <li>将数组分成左右两半</li>
              <li>递归求解左右子数组的最大子数组和</li>
              <li>计算跨越中点的最大子数组和</li>
              <li>返回三者中的最大值</li>
            </ol>
          </div>
          <div class="code">
            <h3>代码实现</h3>
            <pre>function maxSubarraySum(arr, low = 0, high = arr.length - 1) {
  if (low === high) return arr[low];

  const mid = Math.floor((low + high) / 2);

  const leftMax = maxSubarraySum(arr, low, mid);
  const rightMax = maxSubarraySum(arr, mid + 1, high);
  const crossMax = maxCrossingSum(arr, low, mid, high);

  return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSum(arr, low, mid, high) {
  let leftSum = -Infinity;
  let sum = 0;

  for (let i = mid; i >= low; i--) {
    sum += arr[i];
    if (sum > leftSum) leftSum = sum;
  }

  let rightSum = -Infinity;
  sum = 0;

  for (let i = mid + 1; i <= high; i++) {
    sum += arr[i];
    if (sum > rightSum) rightSum = sum;
  }

  return leftSum + rightSum;
}</pre>
          </div>
        </div>
      </section>

      <!-- 汉诺塔问题 -->
      <section class="algorithm-card">
        <div class="algorithm-header">
          <div class="algorithm-icon">🗼</div>
          <h2>汉诺塔问题</h2>
          <div class="time-complexity">O(2ⁿ)</div>
        </div>
        <div class="algorithm-content">
          <div class="problem">
            <h3>问题描述</h3>
            <p>将n个盘子从A柱移动到C柱，每次移动一个盘子，且大盘子不能放在小盘子上面</p>
          </div>
          <div class="solution">
            <h3>解题思路</h3>
            <ol>
              <li>将n-1个盘子从A移到B（辅助柱）</li>
              <li>将第n个盘子从A移到C</li>
              <li>将n-1个盘子从B移到C</li>
            </ol>
          </div>
          <div class="code">
            <h3>代码实现</h3>
            <pre>function hanoi(n, from, to, aux) {
  if (n === 1) {
    console.log(`Move disk 1 from ${from} to ${to}`);
    return;
  }

  hanoi(n - 1, from, aux, to);
  console.log(`Move disk ${n} from ${from} to ${to}`);
  hanoi(n - 1, aux, to, from);
}

// 示例：移动3个盘子
hanoi(3, 'A', 'C', 'B');</pre>
          </div>
        </div>
      </section>

      <!-- 最近点对问题 -->
      <section class="algorithm-card">
        <div class="algorithm-header">
          <div class="algorithm-icon">📍</div>
          <h2>最近点对问题</h2>
          <div class="time-complexity">O(n log n)</div>
        </div>
        <div class="algorithm-content">
          <div class="problem">
            <h3>问题描述</h3>
            <p>在二维平面上找到距离最近的两个点</p>
          </div>
          <div class="solution">
            <h3>解题思路</h3>
            <ol>
              <li>按x坐标排序所有点</li>
              <li>将点集分成左右两半</li>
              <li>递归求解左右两半的最近点对</li>
              <li>在分割线附近区域寻找更近的点对</li>
              <li>返回最小距离</li>
            </ol>
          </div>
          <div class="code">
            <h3>代码实现</h3>
            <pre>function closestPair(points) {
  if (points.length <= 3) {
    return bruteForceClosest(points);
  }

  points.sort((a, b) => a.x - b.x);
  const mid = Math.floor(points.length / 2);
  const midPoint = points[mid];

  const leftPair = closestPair(points.slice(0, mid));
  const rightPair = closestPair(points.slice(mid));

  let minDistance = Math.min(
    distance(leftPair[0], leftPair[1]),
    distance(rightPair[0], rightPair[1])
  );

  const strip = [];
  for (let i = 0; i < points.length; i++) {
    if (Math.abs(points[i].x - midPoint.x) < minDistance) {
      strip.push(points[i]);
    }
  }

  return min(minDistance, stripClosest(strip, minDistance));
}

function stripClosest(strip, d) {
  strip.sort((a, b) => a.y - b.y);
  let minDist = d;

  for (let i = 0; i < strip.length; i++) {
    for (let j = i + 1; j < strip.length && (strip[j].y - strip[i].y) < minDist; j++) {
      const dist = distance(strip[i], strip[j]);
      if (dist < minDist) minDist = dist;
    }
  }

  return minDist;
}</pre>
          </div>
        </div>
      </section>

      <!-- 更多问题 -->
      <section class="more-problems">
        <h2>更多分治算法问题</h2>
        <div class="problem-list">
          <div class="problem-item">
            <div class="problem-icon">🧮</div>
            <h3>大整数乘法</h3>
            <p>Karatsuba算法将大数乘法从O(n²)优化到O(n^log₂³)</p>
          </div>
          <div class="problem-item">
            <div class="problem-icon">⛰️</div>
            <h3>山脉数组查找峰值</h3>
            <p>在先增后减的数组中查找峰值元素</p>
          </div>
          <div class="problem-item">
            <div class="problem-icon">🎯</div>
            <h3>多数元素问题</h3>
            <p>在数组中找到出现次数超过n/2的元素</p>
          </div>
          <div class="problem-item">
            <div class="problem-icon">🌳</div>
            <h3>线段树构建</h3>
            <p>用于高效解决区间查询问题</p>
          </div>
          <div class="problem-item">
            <div class="problem-icon">🔢</div>
            <h3>逆序对计数</h3>
            <p>计算数组中逆序对的数量</p>
          </div>
          <div class="problem-item">
            <div class="problem-icon">🧩</div>
            <h3>棋盘覆盖问题</h3>
            <p>使用L形骨牌覆盖特殊棋盘</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>分治算法总结  | 递归是解决问题的艺术，分治是高效解决问题的科学</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里不需要响应式数据，仅用于展示
</script>

<style lang="less" scoped>
.divide-conquer-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  background: #f8f9ff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #4a86e8, #2c5cc5);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.intro {
  margin-bottom: 30px;

  .intro-card {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    h2 {
      text-align: center;
      color: #2c5cc5;
      margin-top: 0;
      margin-bottom: 25px;
    }
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .step {
      background: #f0f5ff;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .step-icon {
        width: 40px;
        height: 40px;
        background: #4a86e8;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 0 auto 15px;
      }

      h3 {
        color: #2c5cc5;
        margin-top: 0;
        margin-bottom: 10px;
      }
    }
  }

  .complexity {
    background: #f0f5ff;
    border-radius: 8px;
    padding: 20px;

    h3 {
      color: #2c5cc5;
      margin-top: 0;
      margin-bottom: 15px;
    }

    pre {
      background: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 0.9rem;
    }
  }
}

.applications {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.algorithm-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}

.algorithm-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: #e3edff;
  border-bottom: 1px solid #d0d9e4;

  .algorithm-icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    font-size: 1.4rem;
    margin: 0;
    flex: 1;
    color: #2c3e50;
  }

  .time-complexity {
    background: #4a86e8;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.algorithm-content {
  padding: 20px;

  .problem,
  .solution,
  .code {
    margin-bottom: 20px;

    h3 {
      color: #2c5cc5;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.1rem;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  ol {
    padding-left: 20px;
    margin: 0;

    li {
      padding: 6px 0;
      font-size: 0.95rem;
      color: #4a5568;
    }
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
  }
}

.more-problems {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  grid-column: 1 / -1;

  h2 {
    text-align: center;
    color: #2c5cc5;
    margin-top: 0;
    margin-bottom: 25px;
  }
}

.problem-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;

  .problem-item {
    background: #f0f5ff;
    border-radius: 8px;
    padding: 20px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }

    .problem-icon {
      font-size: 2rem;
      margin-bottom: 15px;
      text-align: center;
    }

    h3 {
      color: #2c5cc5;
      margin-top: 0;
      margin-bottom: 10px;
      text-align: center;
    }

    p {
      margin: 0;
      color: #4a5568;
      font-size: 0.9rem;
      text-align: center;
    }
  }
}

.footer {
  text-align: center;
  padding: 20px;
  color: #718096;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .applications {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 1.8rem;
  }
}
</style>
