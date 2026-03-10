<template>
  <div class="binary-search-container">
    <!-- 头部介绍区域 -->
    <div class="header">
      <div class="header-content">
        <h1>二分查找算法</h1>
        <p>高效搜索有序数据的经典方法</p>
        <div class="visualization">
          <div class="visual-header">
            <div class="search-box">
              <input v-model="searchValue" type="number" placeholder="输入搜索值" min="0" max="100">
              <button @click="startSearch">{{ isSearching ? '重置' : '开始搜索' }}</button>
            </div>
            <div class="complexity">
              <div class="complexity-item">
                <div class="complexity-icon">⏱️</div>
                <div>时间复杂度: O(log n)</div>
              </div>
              <div class="complexity-item">
                <div class="complexity-icon">💾</div>
                <div>空间复杂度: O(1)</div>
              </div>
            </div>
          </div>

          <div class="array-visualization">
            <div v-for="(item, index) in array" :key="index" class="array-item" :class="{
              'low': index === low && isSearching,
              'high': index === high && isSearching,
              'mid': index === mid && isSearching,
              'found': index === foundIndex && !isSearching && foundIndex !== -1,
              'visited': visitedIndices.includes(index)
            }">
              <div class="array-value">{{ item }}</div>
              <div class="array-index">{{ index }}</div>

              <div v-if="index === low && isSearching" class="pointer low-pointer">
                <div class="pointer-label">low</div>
              </div>

              <div v-if="index === high && isSearching" class="pointer high-pointer">
                <div class="pointer-label">high</div>
              </div>

              <div v-if="index === mid && isSearching" class="pointer mid-pointer">
                <div class="pointer-label">mid</div>
              </div>
            </div>
          </div>

          <div class="search-status">
            <div v-if="isSearching" class="search-steps">
              <div v-for="(step, idx) in searchSteps" :key="idx" class="step">
                <div class="step-icon">🚩</div>
                <div>{{ step }}</div>
              </div>
            </div>

            <div v-else-if="foundIndex !== -1" class="search-result success">
              <div class="result-icon">✅</div>
              <div>找到元素 {{ searchValue }} 在位置 {{ foundIndex }}</div>
            </div>

            <div v-else-if="searchValue !== ''" class="search-result error">
              <div class="result-icon">❌</div>
              <div>未找到元素 {{ searchValue }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 二分查找概念 -->
    <div class="section concepts">
      <div class="section-header">
        <div class="icon">📝</div>
        <h2>二分查找基本概念</h2>
      </div>
      <div class="content">
        <div class="concept-grid">
          <div class="concept-card">
            <div class="card-icon">🔍</div>
            <h3>什么是二分查找？</h3>
            <p>二分查找是一种在<strong>有序数组</strong>中查找特定元素的搜索算法。搜索过程从数组的中间元素开始：</p>
            <ul>
              <li>如果中间元素正好是目标值，则搜索完成</li>
              <li>如果目标值小于中间元素，则在数组左半部分继续搜索</li>
              <li>如果目标值大于中间元素，则在数组右半部分继续搜索</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon">📊</div>
            <h3>算法步骤</h3>
            <ol>
              <li>初始化左指针 <code>low = 0</code></li>
              <li>初始化右指针 <code>high = n-1</code> (n为数组长度)</li>
              <li>当 <code>low ≤ high</code> 时执行循环：
                <ul>
                  <li>计算中间位置 <code>mid = (low + high) >> 1</code></li>
                  <li>比较 <code>arr[mid]</code> 与目标值</li>
                  <li>如果 <code>arr[mid] == target</code>，返回 <code>mid</code></li>
                  <li>如果 <code>arr[mid] > target</code>，设置 <code>high = mid - 1</code></li>
                  <li>如果 <code>arr[mid] < target</code>，设置 <code>low = mid + 1</code></li>
                </ul>
              </li>
              <li>如果未找到，返回 -1</li>
            </ol>
          </div>

          <div class="concept-card">
            <div class="card-icon">⚡</div>
            <h3>为什么高效？</h3>
            <p>二分查找之所以高效，是因为每次迭代都将搜索范围缩小一半：</p>
            <div class="search-steps">
              <div>数组大小: <span class="highlight">n</span></div>
              <div>第一步后: <span class="highlight">n/2</span></div>
              <div>第二步后: <span class="highlight">n/4</span></div>
              <div>... ...</div>
              <div>第k步后: <span class="highlight">n/2ᵏ</span></div>
            </div>
            <p>最坏情况下，需要执行 <strong>log₂(n)</strong> 次操作</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="section use-cases">
      <div class="section-header">
        <div class="icon">🚀</div>
        <h2>二分查找使用场景</h2>
      </div>
      <div class="content">
        <div class="use-case-grid">
          <div class="use-case">
            <div class="icon-wrapper">
              <div class="case-icon">✅</div>
            </div>
            <h3>适用条件</h3>
            <ul>
              <li>数据结构必须是有序的</li>
              <li>数据量较大（效率优势明显）</li>
              <li>数据结构支持随机访问（如数组）</li>
              <li>查找操作远多于插入/删除操作</li>
            </ul>
          </div>

          <div class="use-case">
            <div class="icon-wrapper">
              <div class="case-icon">❌</div>
            </div>
            <h3>不适用场景</h3>
            <ul>
              <li>无序数据（需先排序）</li>
              <li>链表等不支持随机访问的数据结构</li>
              <li>数据量小（顺序查找可能更简单）</li>
              <li>查找频率低且数据频繁变动</li>
            </ul>
          </div>

          <div class="use-case">
            <div class="icon-wrapper">
              <div class="case-icon">💡</div>
            </div>
            <h3>经典应用场景</h3>
            <ul>
              <li>有序数组查找</li>
              <li>求平方根（精度控制）</li>
              <li>在旋转有序数组中搜索</li>
              <li>寻找峰值元素</li>
              <li>二分答案（在可行解中查找最优解）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 算法实现 -->
    <div class="section implementations">
      <div class="section-header">
        <div class="icon">💻</div>
        <h2>二分查找算法实现</h2>
      </div>
      <div class="content">
        <div class="implementation-tabs">
          <div class="tab-buttons">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 0" class="iteration-code">
              <h3>迭代实现</h3>
              <div class="code-block">
                <pre>function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // 防止整数溢出
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === target) {
      return mid; // 找到目标值
    } else if (arr[mid] > target) {
      high = mid - 1; // 在左半部分查找
    } else {
      low = mid + 1; // 在右半部分查找
    }
  }

  return -1; // 未找到
}</pre>
              </div>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">👍</div>
                  <div>空间效率高（O(1)额外空间）</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">⚡</div>
                  <div>性能好，无函数调用开销</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">📝</div>
                  <div>实现简单直观</div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 1" class="recursion-code">
              <h3>递归实现</h3>
              <div class="code-block">
                <pre>function binarySearchRecursive(
  arr,
  target,
  low = 0,
  high = arr.length - 1
) {
  // 递归终止条件
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) {
    return mid; // 找到目标值
  } else if (arr[mid] > target) {
    // 在左半部分递归查找
    return binarySearchRecursive(arr, target, low, mid - 1);
  } else {
    // 在右半部分递归查找
    return binarySearchRecursive(arr, target, mid + 1, high);
  }
}</pre>
              </div>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">🧠</div>
                  <div>递归思想清晰，接近算法描述</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">⚠️</div>
                  <div>空间复杂度O(log n)（递归栈）</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">📏</div>
                  <div>需要注意递归深度限制</div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 2" class="library-code">
              <h3>JavaScript内置方法</h3>
              <div class="code-block">
                <pre>// 使用Array.prototype.indexOf（顺序查找）
arr.indexOf(target); // O(n)

// 二分查找需要手动实现
// 但有近似二分查找的方法：

// 1. 使用findIndex（顺序查找）
arr.findIndex(x => x === target); // O(n)

// 2. 使用Set（哈希查找）
const set = new Set(arr);
set.has(target); // O(1)但不保证顺序

// JavaScript没有内置二分查找方法
// 但可以使用TypedArray的一些方法：
// (仅适用于数值排序数组)

// 使用Int32Array.prototype.indexOf
const typedArray = new Int32Array(arr);
typedArray.indexOf(target); // 优化过但可能不是二分</pre>
              </div>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">ℹ️</div>
                  <div>JavaScript没有内置的二分查找方法</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">💡</div>
                  <div>手动实现二分查找优于内置顺序搜索</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">📊</div>
                  <div>大数据集性能：二分 > 哈希 > 顺序</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相关算法题 -->
    <div class="section problems">
      <div class="section-header">
        <div class="icon">🧩</div>
        <h2>二分查找经典问题</h2>
      </div>
      <div class="content">
        <div class="problem-grid">
          <div class="problem-card">
            <div class="problem-header">
              <div class="problem-icon">🔄</div>
              <h3>1. 旋转排序数组搜索</h3>
            </div>
            <p>在旋转后的有序数组中搜索目标值（如 <code>[4,5,6,7,0,1,2]</code> 中查找 <code>0</code>）</p>
            <div class="solution">
              <div class="solution-header">解决方案：</div>
              <pre>function search(nums, target) {
  let low = 0, high = nums.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (nums[mid] === target) return mid;

    // 左半部分有序
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target < nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    // 右半部分有序
    else {
      if (nums[mid] < target && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
}</pre>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <div class="problem-icon">🏔️</div>
              <h3>2. 寻找峰值元素</h3>
            </div>
            <p>在数组中查找峰值元素（大于相邻元素的元素）</p>
            <div class="solution">
              <div class="solution-header">解决方案：</div>
              <pre>function findPeakElement(nums) {
  let low = 0, high = nums.length - 1;

  while (low < high) {
    const mid = (low + high) >> 1;

    if (nums[mid] > nums[mid + 1]) {
      // 峰值在左侧
      high = mid;
    } else {
      // 峰值在右侧
      low = mid + 1;
    }
  }

  return low;
}</pre>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <div class="problem-icon">🎯</div>
              <h3>3. 查找目标值的范围</h3>
            </div>
            <p>在有序数组中查找目标值的起始和结束位置（如 <code>[5,7,7,8,8,10]</code> 中查找 <code>8</code> 返回 <code>[3,4]</code>）</p>
            <div class="solution">
              <div class="solution-header">解决方案：</div>
              <pre>function searchRange(nums, target) {
  function findBound(isFirst) {
    let low = 0, high = nums.length;
    let bound = -1;

    while (low < high) {
      const mid = (low + high) >> 1;

      if (nums[mid] > target || (isFirst && nums[mid] === target)) {
        high = mid;
      } else {
        low = mid + 1;
      }

      if (nums[mid] === target) bound = mid;
    }

    return bound;
  }

  const left = findBound(true);
  if (left === -1) return [-1, -1];

  const right = findBound(false);
  return [left, right];
}</pre>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <div class="problem-icon">📚</div>
              <h3>4. 书籍分配问题</h3>
            </div>
            <p>将n本书分给m个学生，每人分配连续的书，最小化最大分配页数</p>
            <div class="solution">
              <div class="solution-header">解决方案：</div>
              <pre>function allocateBooks(pages, students) {
  if (students > pages.length) return -1;

  let low = Math.max(...pages);
  let high = pages.reduce((sum, page) => sum + page, 0);

  while (low < high) {
    const mid = (low + high) >> 1;
    if (canAllocate(pages, students, mid)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

function canAllocate(pages, students, maxPages) {
  let count = 1, current = 0;

  for (const page of pages) {
    if (current + page > maxPages) {
      count++;
      current = page;
      if (count > students) return false;
    } else {
      current += page;
    }
  }

  return true;
}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="section summary">
      <div class="section-header">
        <div class="icon">💎</div>
        <h2>二分查找总结</h2>
      </div>
      <div class="content">
        <div class="summary-grid">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>极高的搜索效率（O(log n)时间）</li>
              <li>空间复杂度低（O(1)额外空间）</li>
              <li>适用于大型数据集</li>
              <li>思想可扩展到许多变种问题</li>
              <li>实现相对简单</li>
            </ul>
          </div>

          <div class="cons">
            <h3>注意事项</h3>
            <ul>
              <li>要求数据预先排序（维护成本）</li>
              <li>仅适用于支持随机访问的数据结构</li>
              <li>边界条件处理需谨慎</li>
              <li>整数溢出问题需处理</li>
              <li>递归实现有栈溢出风险</li>
            </ul>
          </div>
        </div>

        <div class="key-insight">
          <div class="lightbulb">💡</div>
          <p>
            <strong>二分查找核心思想：</strong> 通过每次将搜索区间减半的方式，快速缩小搜索范围。<br>
            <strong>适用场景：</strong> 有序数据查找、分治策略、二分答案等问题。<br>
            <strong>掌握关键：</strong> 理解循环不变量（区间的定义保持不变）。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 生成有序数组
const sortedArray = Array.from({ length: 20 }, (_, i) => i * 5);
const array = ref([...sortedArray]);

// 搜索相关状态
const searchValue = ref('');
const isSearching = ref(false);
const foundIndex = ref(-1);
const searchSteps = ref<string[]>([]);
const visitedIndices = ref<number[]>([]);

// 指针位置
const low = ref(0);
const high = ref(array.value.length - 1);
const mid = ref(0);

// 标签页
const tabs = ref([
  { title: '迭代实现' },
  { title: '递归实现' },
  { title: '内置方法' }
]);
const activeTab = ref(0);

// 开始二分查找
const startSearch = () => {
  if (isSearching.value) {
    resetSearch();
    return;
  }

  if (!searchValue.value) return;

  const target = parseInt(searchValue.value);
  if (isNaN(target)) return;

  isSearching.value = true;
  foundIndex.value = -1;
  searchSteps.value = [];
  visitedIndices.value = [];

  low.value = 0;
  high.value = array.value.length - 1;

  // 模拟二分查找
  performSearch(target);
};

// 执行搜索
const performSearch = (target: number) => {
  if (low.value > high.value) {
    searchSteps.value.push('搜索结束，未找到元素');
    setTimeout(() => {
      isSearching.value = false;
      foundIndex.value = -1;
    }, 1000);
    return;
  }

  mid.value = Math.floor((low.value + high.value) / 2);
  visitedIndices.value.push(mid.value);

  const midValue = array.value[mid.value];

  setTimeout(() => {
    if (midValue === target) {
      searchSteps.value.push(`arr[${mid.value}] = ${midValue} 等于目标值 ${target}`);
      setTimeout(() => {
        isSearching.value = false;
        foundIndex.value = mid.value;
      }, 1000);
    } else if (midValue > target) {
      searchSteps.value.push(`arr[${mid.value}] = ${midValue} > ${target}，向左半部分查找`);
      high.value = mid.value - 1;
      performSearch(target);
    } else {
      searchSteps.value.push(`arr[${mid.value}] = ${midValue} < ${target}，向右半部分查找`);
      low.value = mid.value + 1;
      performSearch(target);
    }
  }, 1000);
};

// 重置搜索
const resetSearch = () => {
  isSearching.value = false;
  foundIndex.value = -1;
  searchSteps.value = [];
  visitedIndices.value = [];
  low.value = 0;
  high.value = array.value.length - 1;
  mid.value = 0;
  array.value = [...sortedArray];
};

onMounted(() => {
  resetSearch();
});
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@indigo-700: #3a0ca3;
@indigo-500: #4361ee;
@indigo-300: #4895ef;
@indigo-100: #4cc9f0;
@green-500: #2dc653;
@amber-500: #ffaa00;
@red-500: #f72585;
@violet-500: #7209b7;
@background-light: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-radius: 12px;
@box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -4px rgba(0, 0, 0, 0.1);

.binary-search-container {
  max-width: 1200px;
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
    background: linear-gradient(135deg, lighten(@indigo-500, 35%), @indigo-100);
    border-radius: @border-radius;
    box-shadow: @box-shadow;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, darken(@indigo-500, 10%), @indigo-700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.3rem;
      color: @indigo-700;
      margin-bottom: 1.5rem;
    }
  }

  .visualization {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: @border-radius;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

    .visual-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      .search-box {
        display: flex;
        gap: 1rem;

        input {
          padding: 0.8rem 1.2rem;
          border: 2px solid @indigo-300;
          border-radius: 8px;
          font-size: 1.1rem;
          min-width: 200px;

          &:focus {
            outline: none;
            border-color: @indigo-500;
            box-shadow: 0 0 0 3px fade(@indigo-500, 30%);
          }
        }

        button {
          padding: 0.8rem 1.5rem;
          background: @indigo-500;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: @indigo-700;
            transform: translateY(-2px);
          }
        }
      }

      .complexity {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .complexity-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;

          .complexity-icon {
            font-size: 1.2rem;
          }
        }
      }
    }

    .array-visualization {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      min-height: 140px;

      .array-item {
        position: relative;
        width: 70px;
        height: 90px;
        background: #e9ecef;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 1;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .array-value {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .array-index {
          font-size: 0.9rem;
          color: @text-light;
        }

        // 指针样式
        .pointer {
          position: absolute;
          z-index: 2;
          font-size: 1.2rem;
          font-weight: 700;

          .pointer-label {
            position: absolute;
            white-space: nowrap;
            font-size: 0.9rem;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-weight: 600;
          }
        }

        .low-pointer {
          bottom: -35px;
          color: @green-500;

          .pointer-label {
            background: @green-500;
            color: white;
            bottom: -35px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .high-pointer {
          bottom: -35px;
          color: @red-500;

          .pointer-label {
            background: @red-500;
            color: white;
            bottom: -35px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .mid-pointer {
          top: -35px;
          color: @amber-500;

          .pointer-label {
            background: @amber-500;
            color: white;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        // 状态样式
        &.low {
          background: lighten(@green-500, 40%);
          border: 2px solid @green-500;
        }

        &.high {
          background: lighten(@red-500, 40%);
          border: 2px solid @red-500;
        }

        &.mid {
          background: lighten(@amber-500, 40%);
          border: 2px solid @amber-500;
          transform: scale(1.08);
        }

        &.visited {
          background: lighten(@indigo-300, 35%);
          border: 1px solid @indigo-300;
        }

        &.found {
          background: lighten(@green-500, 35%);
          border: 2px solid @green-500;
          transform: scale(1.1);
          animation: pulse 1.5s infinite;
        }
      }
    }

    .search-status {
      min-height: 120px;
      background: @indigo-100;
      border-radius: @border-radius;
      padding: 1.2rem;

      .search-steps {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;

        .step {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: white;
          padding: 0.8rem;
          border-radius: 8px;
          border-left: 4px solid @indigo-500;
          animation: fadeIn 0.5s ease;

          .step-icon {
            font-size: 1.2rem;
          }
        }
      }

      .search-result {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-size: 1.3rem;
        font-weight: 600;
        padding: 1.5rem;

        &.success {
          color: @green-500;
          background: lighten(@green-500, 45%);
          border-radius: @border-radius;
        }

        &.error {
          color: @red-500;
          background: lighten(@red-500, 45%);
          border-radius: @border-radius;
        }

        .result-icon {
          font-size: 1.8rem;
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
  border: 1px solid @indigo-300;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.75rem;
    background: linear-gradient(135deg, @indigo-500, darken(@indigo-500, 10%));

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

  &.concepts {
    .concept-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .concept-card {
        background: lighten(@indigo-100, 10%);
        border-radius: @border-radius;
        padding: 1.75rem;
        border-top: 3px solid @indigo-500;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1.25rem;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: @indigo-700;
        }

        p {
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        ul,
        ol {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.5rem;
            position: relative;

            &::before {
              content: "•";
              position: absolute;
              left: -1.2rem;
              color: @indigo-500;
              font-weight: bold;
            }
          }
        }

        ol {
          li {
            counter-increment: step-counter;

            &::before {
              content: counter(step-counter) ".";
              font-weight: bold;
              position: absolute;
              left: -1.5rem;
            }
          }
        }

        .search-steps {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem 0;
          border: 1px solid @indigo-300;

          .highlight {
            font-weight: 700;
            color: @indigo-700;
          }
        }
      }
    }
  }

  &.use-cases {
    .use-case-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.75rem;

      .use-case {
        background: lighten(@indigo-100, 8%);
        border-radius: @border-radius;
        padding: 1.75rem;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .icon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;

          .case-icon {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: @indigo-700;
        }

        p {
          font-weight: 500;
          margin-bottom: 0.75rem;
        }
      }

      // ...之前的样式代码保持不变...

      // 算法实现部分
      .implementations {
        .implementation-tabs {
          .tab-buttons {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;

            button {
              padding: 0.75rem 1.5rem;
              background: white;
              border: 2px solid @indigo-300;
              border-radius: 8px;
              font-weight: 600;
              color: @text-dark;
              cursor: pointer;
              transition: all 0.3s ease;

              &:hover {
                background: @indigo-100;
              }

              &.active {
                background: @indigo-500;
                color: white;
                border-color: @indigo-500;
              }
            }
          }

          .tab-content {
            h3 {
              color: @indigo-700;
              margin-top: 0;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid @indigo-300;
            }

            .code-block {
              background: #011627;
              color: #d6deeb;
              border-radius: @border-radius;
              padding: 1.5rem;
              margin: 1.5rem 0;
              overflow-x: auto;
              font-family: 'Fira Code', monospace;
              font-size: 0.95rem;
              line-height: 1.6;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

              pre {
                margin: 0;
              }
            }

            .features {
              display: flex;
              flex-wrap: wrap;
              gap: 1rem;
              margin-top: 1.5rem;

              .feature {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                background: lighten(@indigo-100, 8%);
                padding: 0.8rem 1.2rem;
                border-radius: 8px;
                font-weight: 500;

                .feature-icon {
                  font-size: 1.3rem;
                }
              }
            }
          }
        }
      }

      // 问题部分
      .problems {
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.75rem;

          .problem-card {
            background: lighten(@indigo-100, 8%);
            border-radius: @border-radius;
            padding: 1.75rem;
            transition: all 0.3s ease;
            border-top: 3px solid @violet-500;
            position: relative;
            overflow: hidden;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 20px -10px rgba(0, 0, 0, 0.1);
            }

            .problem-header {
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 1rem;

              .problem-icon {
                font-size: 1.8rem;
                background: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }

              h3 {
                margin: 0;
                color: @violet-500;
              }
            }

            p {
              font-weight: 500;
              margin-bottom: 1.25rem;
            }

            .solution {
              background: rgba(255, 255, 255, 0.9);
              border-radius: 8px;
              padding: 1.25rem;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

              .solution-header {
                font-weight: 700;
                color: @indigo-700;
                margin-bottom: 0.8rem;
              }

              pre {
                background: #011627;
                color: #d6deeb;
                border-radius: 8px;
                padding: 1rem;
                overflow-x: auto;
                font-family: 'Fira Code', monospace;
                font-size: 0.85rem;
                line-height: 1.5;
              }
            }
          }
        }
      }

      // 总结部分
      .summary {
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;

          .pros,
          .cons {
            background: white;
            border-radius: @border-radius;
            padding: 1.75rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

            h3 {
              margin-top: 0;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid @indigo-300;
              color: @indigo-700;
            }

            ul {
              padding-left: 1.25rem;

              li {
                margin-bottom: 0.8rem;
                position: relative;
                padding-left: 1.5rem;

                &::before {
                  position: absolute;
                  left: 0;
                  top: 0.2rem;
                }
              }
            }
          }

          .pros {
            ul li::before {
              content: "✓";
              color: @green-500;
              font-weight: bold;
            }
          }

          .cons {
            ul li::before {
              content: "⚠️";
            }
          }
        }

        .key-insight {
          display: flex;
          gap: 1.5rem;
          background: linear-gradient(135deg, @indigo-100, lighten(@indigo-500, 40%));
          border-radius: @border-radius;
          padding: 2rem;
          align-items: center;

          .lightbulb {
            font-size: 3rem;
            flex-shrink: 0;
          }

          p {
            margin: 0;
            font-size: 1.15rem;
            font-weight: 500;

            strong {
              color: @indigo-700;
            }
          }
        }
      }

      // 动画定义
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(45, 198, 83, 0.4);
        }

        70% {
          box-shadow: 0 0 0 12px rgba(45, 198, 83, 0);
        }

        100% {
          box-shadow: 0 0 0 0 rgba(45, 198, 83, 0);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      // 响应式调整
      @media (max-width: 768px) {
        .header .visual-header {
          flex-direction: column;
          gap: 1.5rem;
          align-items: stretch;

          .search-box {
            justify-content: center;
          }

          .complexity {
            flex-direction: row;
            justify-content: center;
            gap: 1.5rem;
          }
        }

        .array-visualization {
          gap: 0.5rem;

          .array-item {
            width: 50px;
            height: 80px;

            .array-value {
              font-size: 1.2rem;
            }
          }
        }

        .problem-grid {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 480px) {
        .implementation-tabs .tab-buttons {
          flex-direction: column;
        }
      }
    }
  }
}
</style>