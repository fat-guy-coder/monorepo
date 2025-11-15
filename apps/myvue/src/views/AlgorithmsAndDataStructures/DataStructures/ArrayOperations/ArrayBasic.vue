<template>
  <div class="array-container">
    <header>
      <h1>数据结构：数组（Array）</h1>
      <p class="subtitle">计算机科学中最基础的数据结构</p>
    </header>

    <div class="visualization-section">
      <div class="array-visual">
        <div v-for="(item, index) in arrayItems" :key="index" class="array-item" :class="{
          'active': activeIndex === index,
          'highlight': highlightedIndexes.includes(index)
        }" :style="{
            'background-color': itemColors[index % itemColors.length],
            'animation-delay': `${index * 0.05}s`
          }" @click="selectItem(index)">
          <div class="item-value">{{ item }}</div>
          <div class="item-index">{{ index }}</div>
        </div>
      </div>

      <div class="array-controls">
        <div class="control-group">
          <button @click="insertItem" class="control-btn insert-btn">
            <span class="btn-icon">+</span> 插入元素
          </button>
          <button @click="deleteItem" class="control-btn delete-btn">
            <span class="btn-icon">-</span> 删除元素
          </button>
          <button @click="searchItem" class="control-btn search-btn">
            <span class="btn-icon">🔍</span> 查找元素
          </button>
        </div>
        <div class="control-group">
          <button @click="sortArray" class="control-btn sort-btn">
            <span class="btn-icon">⇅</span> 排序数组
          </button>
          <button @click="reverseArray" class="control-btn reverse-btn">
            <span class="btn-icon">↔</span> 反转数组
          </button>
          <button @click="resetArray" class="control-btn reset-btn">
            <span class="btn-icon">↺</span> 重置数组
          </button>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 基本概念部分 -->
      <section class="section">
        <h2>数组的基本概念</h2>

        <div class="concept-card">
          <h3>定义</h3>
          <p>数组是一种<strong>线性数据结构</strong>，用于存储相同类型元素的集合。数组中的元素在内存中<strong>连续存储</strong>，可以通过索引（下标）直接访问。</p>
        </div>

        <div class="concept-card">
          <h3>核心特性</h3>
          <ul>
            <li><strong>固定大小</strong>：大多数编程语言中数组大小在创建时确定</li>
            <li><strong>随机访问</strong>：通过索引可以在O(1)时间内访问任何元素</li>
            <li><strong>同质元素</strong>：所有元素必须是相同数据类型</li>
            <li><strong>内存连续</strong>：元素在内存中连续存储</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>基本操作</h3>
          <table class="operation-table">
            <thead>
              <tr>
                <th>操作</th>
                <th>描述</th>
                <th>时间复杂度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>访问 (Access)</td>
                <td>通过索引获取元素</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>搜索 (Search)</td>
                <td>查找特定元素的位置</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>插入 (Insertion)</td>
                <td>在指定位置添加新元素</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>删除 (Deletion)</td>
                <td>移除指定位置的元素</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>更新 (Update)</td>
                <td>修改指定位置的元素</td>
                <td>O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 数组类型部分 -->
      <section class="section">
        <h2>数组的类型</h2>

        <div class="type-card">
          <h3>一维数组</h3>
          <p>最简单的数组形式，元素线性排列。</p>
          <div class="code-block">
            <pre>// 声明和初始化
int[] numbers = new int[5]; // [0, 0, 0, 0, 0]
String[] names = {"Alice", "Bob", "Charlie"};</pre>
          </div>
        </div>

        <div class="type-card">
          <h3>多维数组</h3>
          <p>数组的数组，常见形式是二维数组（矩阵）。</p>
          <div class="code-block">
            <pre>// 二维数组示例
int[][] matrix = new int[3][3];
matrix[0] = new int[]{1, 2, 3};
matrix[1] = new int[]{4, 5, 6};
matrix[2] = new int[]{7, 8, 9};

// 访问元素
int element = matrix[1][2]; // 6</pre>
          </div>
        </div>

        <div class="type-card">
          <h3>动态数组</h3>
          <p>大小可变的数组（如Java的ArrayList，C++的vector）。</p>
          <div class="code-block">
            <pre>// Java ArrayList
ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("Apple");
list.add("Banana");
list.remove(0); // 删除第一个元素

// JavaScript数组本质是动态数组
let fruits = ["Apple", "Banana"];
fruits.push("Orange");
fruits.pop(); // 删除最后一个元素</pre>
          </div>
        </div>
      </section>

      <!-- 数组应用部分 -->
      <section class="section">
        <h2>数组的应用场景</h2>

        <div class="application-card">
          <div class="app-icon">1</div>
          <div class="app-content">
            <h3>数据存储与处理</h3>
            <p>存储大量同类型数据，进行批量操作。</p>
            <div class="code-block">
              <pre>// 计算数组平均值
function calculateAverage(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, val) => acc + val, 0);
  return sum / nums.length;
}</pre>
            </div>
          </div>
        </div>

        <div class="application-card">
          <div class="app-icon">2</div>
          <div class="app-content">
            <h3>实现其他数据结构</h3>
            <p>栈、队列、堆、哈希表等数据结构的基础。</p>
            <div class="code-block">
              <pre>// 使用数组实现栈
class ArrayStack {
  private items: any[];

  constructor() {
    this.items = [];
  }

  push(element: any): void {
    this.items.push(element);
  }

  pop(): any {
    return this.items.pop();
  }

  peek(): any {
    return this.items[this.items.length - 1];
  }
}</pre>
            </div>
          </div>
        </div>

        <div class="application-card">
          <div class="app-icon">3</div>
          <div class="app-content">
            <h3>图像处理</h3>
            <p>二维数组表示像素矩阵，进行图像操作。</p>
            <div class="code-block">
              <pre>// 图像旋转90度
function rotateImage(matrix: number[][]): void {
  const n = matrix.length;

  // 转置矩阵
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 反转每一行
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      [matrix[i][j], matrix[i][n - 1 - j]] =
        [matrix[i][n - 1 - j], matrix[i][j]];
    }
  }
}</pre>
            </div>
          </div>
        </div>

        <div class="application-card">
          <div class="app-icon">4</div>
          <div class="app-content">
            <h3>算法问题解决</h3>
            <p>多数算法问题使用数组作为主要数据结构。</p>
            <div class="code-block">
              <pre>// 两数之和
function twoSum(nums: number[], target: number): number[] {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 数组算法部分 -->
      <section class="section">
        <h2>数组经典算法</h2>

        <div class="algorithm-card">
          <h3>1. 二分查找</h3>
          <p>在有序数组中高效查找元素的算法。</p>
          <div class="code-block">
            <pre>function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}</pre>
          </div>
        </div>

        <div class="algorithm-card">
          <h3>2. 归并排序</h3>
          <p>分治策略的高效排序算法。</p>
          <div class="code-block">
            <pre>function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}</pre>
          </div>
        </div>

        <div class="algorithm-card">
          <h3>3. 快速排序</h3>
          <p>高效的原地排序算法。</p>
          <div class="code-block">
            <pre>function quickSort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
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

        <div class="algorithm-card">
          <h3>4. 滑动窗口</h3>
          <p>解决数组/字符串子序列问题的技术。</p>
          <div class="code-block">
            <pre>// 最大连续子数组和
function maxSubarraySum(nums: number[], k: number): number {
  if (nums.length < k) return 0;

  let maxSum = 0;
  let currentSum = 0;

  // 计算初始窗口和
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }

  maxSum = currentSum;

  // 滑动窗口
  for (let i = k; i < nums.length; i++) {
    currentSum = currentSum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}</pre>
          </div>
        </div>
      </section>

      <!-- 数组优缺点 -->
      <section class="section">
        <h2>数组的优缺点</h2>

        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li><strong>随机访问高效</strong>：通过索引O(1)时间访问元素</li>
              <li><strong>内存连续</strong>：缓存友好，访问速度快</li>
              <li><strong>简单易用</strong>：几乎所有编程语言都原生支持</li>
              <li><strong>多维支持</strong>：天然支持多维数据结构</li>
            </ul>
          </div>

          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li><strong>固定大小</strong>：静态数组大小不可变（动态数组有额外开销）</li>
              <li><strong>插入/删除低效</strong>：平均O(n)时间复杂度</li>
              <li><strong>内存浪费</strong>：分配过多空间时造成浪费</li>
              <li><strong>类型限制</strong>：只能存储同类型元素</li>
            </ul>
          </div>
        </div>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>数据结构</th>
                <th>访问</th>
                <th>搜索</th>
                <th>插入</th>
                <th>删除</th>
                <th>内存使用</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>数组</td>
                <td>O(1)</td>
                <td>O(n)</td>
                <td>O(n)</td>
                <td>O(n)</td>
                <td>低</td>
              </tr>
              <tr>
                <td>链表</td>
                <td>O(n)</td>
                <td>O(n)</td>
                <td>O(1)</td>
                <td>O(1)</td>
                <td>中</td>
              </tr>
              <tr>
                <td>哈希表</td>
                <td>O(1)</td>
                <td>O(1)</td>
                <td>O(1)</td>
                <td>O(1)</td>
                <td>高</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <footer>
      <p> 数据结构学习指南 | 数组（Array）专题</p>
      <p class="tip">提示：数组是几乎所有高级数据结构的基础，深入理解数组对编程至关重要</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 数组可视化数据
const arrayItems = ref<number[]>([42, 17, 89, 3, 56, 24, 91, 8, 33, 65]);
const activeIndex = ref<number | null>(null);
const highlightedIndexes = ref<number[]>([]);
const itemColors = ref<string[]>([
  '#4a6cf7', '#6b48ff', '#ff6b6b', '#1dd1a1', '#feca57',
  '#ff9ff3', '#54a0ff', '#00d2d3', '#ff9f43', '#5f27cd'
]);

// 数组操作函数
const selectItem = (index: number) => {
  activeIndex.value = index;
};

const insertItem = () => {
  const newItem = Math.floor(Math.random() * 100);
  const insertIndex = activeIndex.value !== null ? activeIndex.value : arrayItems.value.length;
  arrayItems.value.splice(insertIndex, 0, newItem);
  highlightItem(insertIndex);
};

const deleteItem = () => {
  if (activeIndex.value !== null && arrayItems.value.length > 0) {
    arrayItems.value.splice(activeIndex.value, 1);
    if (activeIndex.value >= arrayItems.value.length) {
      activeIndex.value = null;
    }
  }
};

const searchItem = () => {
  if (arrayItems.value.length === 0) return;

  const target = Math.floor(Math.random() * 100);
  highlightedIndexes.value = [];

  // 模拟线性搜索过程
  for (let i = 0; i < arrayItems.value.length; i++) {
    setTimeout(() => {
      highlightedIndexes.value.push(i);
      if (arrayItems.value[i] === target) {
        activeIndex.value = i;
      }
    }, i * 300);
  }
};

const sortArray = () => {
  highlightedIndexes.value = [];
  arrayItems.value.sort((a, b) => a - b);

  // 高亮所有元素表示已排序
  setTimeout(() => {
    highlightedIndexes.value = [...Array(arrayItems.value.length).keys()];
    setTimeout(() => {
      highlightedIndexes.value = [];
    }, 2000);
  }, 300);
};

const reverseArray = () => {
  highlightedIndexes.value = [];
  arrayItems.value.reverse();

  // 高亮所有元素表示已反转
  setTimeout(() => {
    highlightedIndexes.value = [...Array(arrayItems.value.length).keys()];
    setTimeout(() => {
      highlightedIndexes.value = [];
    }, 2000);
  }, 300);
};

const resetArray = () => {
  activeIndex.value = null;
  highlightedIndexes.value = [];
  arrayItems.value = [42, 17, 89, 3, 56, 24, 91, 8, 33, 65];
};

const highlightItem = (index: number) => {
  highlightedIndexes.value = [index];
  setTimeout(() => {
    highlightedIndexes.value = [];
  }, 1500);
};
</script>

<style lang="less" scoped>
.array-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #4a6cf7 0%, #6b48ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #718096;
    font-weight: 400;
  }
}

.visualization-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.array-visual {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
  max-width: 100%;
  overflow-x: auto;
  padding: 10px;
}

.array-item {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  &.active {
    transform: scale(1.1);
    box-shadow: 0 0 0 3px #4a6cf7;
    z-index: 10;
  }

  &.highlight {
    animation: highlight 1.5s ease;
  }

  .item-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }

  .item-index {
    position: absolute;
    bottom: 5px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
  }
}

@keyframes highlight {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(74, 108, 247, 0.7);
  }

  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(74, 108, 247, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(74, 108, 247, 0);
  }
}

.array-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.control-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.control-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .btn-icon {
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

.insert-btn {
  background: linear-gradient(135deg, #4a6cf7 0%, #6b48ff 100%);
  color: white;
}

.delete-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff9ff3 100%);
  color: white;
}

.search-btn {
  background: linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%);
  color: white;
}

.sort-btn {
  background: linear-gradient(135deg, #feca57 0%, #ff9f43 100%);
  color: white;
}

.reverse-btn {
  background: linear-gradient(135deg, #5f27cd 0%, #341f97 100%);
  color: white;
}

.reset-btn {
  background: #e2e8f0;
  color: #4a5568;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  h2 {
    font-size: 1.5rem;
    color: #1a202c;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.concept-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.7rem;
      line-height: 1.5;
      color: #4a5568;
    }
  }
}

.operation-table,
.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #f0f7ff;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.type-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.application-card {
  display: flex;
  gap: 1rem;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  .app-icon {
    flex: 0 0 40px;
    height: 40px;
    background: #4a6cf7;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .app-content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 0.8rem;
    }

    p {
      color: #4a5568;
      line-height: 1.6;
    }
  }
}

.algorithm-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.pros-cons {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;

  .pros,
  .cons {
    flex: 1;
    background: #f8fafc;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 1rem;
      text-align: center;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.7rem;
        line-height: 1.5;
        color: #4a5568;
      }
    }
  }

  .pros {
    border-top: 4px solid #1dd1a1;
  }

  .cons {
    border-top: 4px solid #ff6b6b;
  }
}

.comparison-table {
  overflow-x: auto;
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
  margin-top: 1rem;

  pre {
    margin: 0;
    color: #cbd5e0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.9rem;

  .tip {
    font-style: italic;
    color: #f44336;
    margin-top: 0.5rem;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .array-item {
    width: 70px;
    height: 70px;
    font-size: 0.9rem;
  }

  .control-group {
    flex-direction: column;
  }

  .control-btn {
    width: 100%;
    justify-content: center;
  }

  .pros-cons {
    flex-direction: column;
  }
}
</style>
