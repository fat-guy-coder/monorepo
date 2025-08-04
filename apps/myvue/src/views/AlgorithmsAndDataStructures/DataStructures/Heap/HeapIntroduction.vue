<template>
  <div class="heap-container">
    <header class="header">
      <h1>堆数据结构基本介绍</h1>
      <p>高效管理优先级数据的树形结构</p>
    </header>

    <div class="content">
      <div class="intro">
        <div class="intro-card">
          <h2>什么是堆?</h2>
          <p>堆是一种特殊的完全二叉树数据结构，它满足堆属性：在最大堆中，每个节点的值都大于或等于其子节点的值；在最小堆中，每个节点的值都小于或等于其子节点的值。</p>
          <div class="heap-stats">
            <div class="stat">
              <div class="stat-value">O(1)</div>
              <div class="stat-label">获取堆顶元素</div>
            </div>
            <div class="stat">
              <div class="stat-value">O(log n)</div>
              <div class="stat-label">插入/删除操作</div>
            </div>
            <div class="stat">
              <div class="stat-value">O(n log n)</div>
              <div class="stat-label">堆排序</div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <section class="section">
          <h2>堆的分类</h2>
          <div class="card">
            <div class="heap-type">
              <div class="type-header max-heap">
                <h3>最大堆</h3>
              </div>
              <div class="type-content">
                <p>每个节点的值都大于或等于其子节点的值</p>
                <ul>
                  <li>堆顶元素是整个堆的最大值</li>
                  <li>常用于优先级队列</li>
                  <li>实现堆排序算法</li>
                </ul>
                <div class="heap-visual">
                  <div class="level">
                    <div class="node max">90</div>
                  </div>
                  <div class="level">
                    <div class="node max">80</div>
                    <div class="node max">70</div>
                  </div>
                  <div class="level">
                    <div class="node max">60</div>
                    <div class="node max">50</div>
                    <div class="node max">40</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="heap-type">
              <div class="type-header min-heap">
                <h3>最小堆</h3>
              </div>
              <div class="type-content">
                <p>每个节点的值都小于或等于其子节点的值</p>
                <ul>
                  <li>堆顶元素是整个堆的最小值</li>
                  <li>常用于Dijkstra算法</li>
                  <li>实现定时器调度</li>
                </ul>
                <div class="heap-visual">
                  <div class="level">
                    <div class="node min">10</div>
                  </div>
                  <div class="level">
                    <div class="node min">20</div>
                    <div class="node min">30</div>
                  </div>
                  <div class="level">
                    <div class="node min">40</div>
                    <div class="node min">50</div>
                    <div class="node min">60</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>堆的核心操作</h2>
          <div class="card">
            <h3>插入操作 (上浮)</h3>
            <ol>
              <li>将新元素添加到堆的末尾</li>
              <li>比较新元素与其父节点</li>
              <li>如果违反堆属性，交换新元素与父节点</li>
              <li>重复步骤2-3直到满足堆属性</li>
            </ol>
            <div class="complexity">
              <span>时间复杂度: O(log n)</span>
            </div>
          </div>
          <div class="card">
            <h3>删除堆顶 (下沉)</h3>
            <ol>
              <li>移除堆顶元素</li>
              <li>将堆的最后一个元素移到堆顶</li>
              <li>比较新堆顶与其子节点</li>
              <li>如果违反堆属性，与较大(最大堆)/较小(最小堆)子节点交换</li>
              <li>重复步骤3-4直到满足堆属性</li>
            </ol>
            <div class="complexity">
              <span>时间复杂度: O(log n)</span>
            </div>
          </div>
          <div class="card">
            <h3>建堆操作</h3>
            <ol>
              <li>从最后一个非叶子节点开始</li>
              <li>对每个非叶子节点执行下沉操作</li>
              <li>从右到左，从下到上处理所有非叶子节点</li>
            </ol>
            <div class="complexity">
              <span>时间复杂度: O(n)</span>
            </div>
          </div>
        </section>
      </div>

      <section class="section">
        <h2>复杂度分析</h2>
        <div class="complexity-table">
          <table>
            <thead>
              <tr>
                <th>操作</th>
                <th>时间复杂度</th>
                <th>空间复杂度</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>插入</td>
                <td>O(log n)</td>
                <td>O(1)</td>
                <td>上浮操作，最多调整树高次</td>
              </tr>
              <tr>
                <td>删除堆顶</td>
                <td>O(log n)</td>
                <td>O(1)</td>
                <td>下沉操作，最多调整树高次</td>
              </tr>
              <tr>
                <td>查找堆顶</td>
                <td>O(1)</td>
                <td>O(1)</td>
                <td>直接访问根节点</td>
              </tr>
              <tr>
                <td>建堆</td>
                <td>O(n)</td>
                <td>O(1)</td>
                <td>Floyd算法，高效构建堆</td>
              </tr>
              <tr>
                <td>堆排序</td>
                <td>O(n log n)</td>
                <td>O(1)</td>
                <td>依次删除堆顶元素</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <h2>使用场景</h2>
        <div class="usage-grid">
          <div class="usage-card">
            <div class="icon">⏱️</div>
            <h3>优先级队列</h3>
            <p>任务调度、事件处理</p>
          </div>
          <div class="usage-card">
            <div class="icon">📊</div>
            <h3>堆排序</h3>
            <p>高效的原地排序算法</p>
          </div>
          <div class="usage-card">
            <div class="icon">🗺️</div>
            <h3>图算法</h3>
            <p>Dijkstra最短路径算法</p>
          </div>
          <div class="usage-card">
            <div class="icon">🔍</div>
            <h3>Top K问题</h3>
            <p>从海量数据中找出前K个元素</p>
          </div>
        </div>
      </section>

      <section class="section demo-section">
        <h2>堆操作可视化</h2>
        <div class="demo-container">
          <div class="demo-controls">
            <div class="control-group">
              <label>堆类型:</label>
              <select v-model="heapType">
                <option value="max">最大堆</option>
                <option value="min">最小堆</option>
              </select>
            </div>
            <div class="control-group">
              <input type="number" v-model="newValue" placeholder="输入节点值" @keyup.enter="insertNode">
              <button @click="insertNode">插入节点</button>
            </div>
            <div class="control-group">
              <button @click="removeRoot">删除堆顶</button>
              <button @click="buildRandomHeap">生成随机堆</button>
              <button @click="clearHeap">清空堆</button>
            </div>
          </div>

          <div class="heap-representation">
            <div class="array-representation">
              <h3>数组表示</h3>
              <div class="array-container">
                <div v-for="(value, index) in heapArray" :key="index" class="array-element" :class="{
                  'root': index === 0,
                  'highlight': highlightedIndex === index
                }">
                  {{ value }}
                </div>
              </div>
            </div>

            <div class="tree-representation">
              <h3>树形表示</h3>
              <div class="tree-container">
                <div v-if="heapArray.length === 0" class="empty-heap">
                  堆为空，请插入节点
                </div>
                <div v-else class="tree">
                  <div class="level" v-for="(levelNodes, level) in treeLevels" :key="level">
                    <div v-for="(node, idx) in levelNodes" :key="idx" class="tree-node" :class="[
                      heapType === 'max' ? 'max-node' : 'min-node',
                      { 'highlight': highlightedIndex === node.index }
                    ]">
                      <div class="node-value">{{ node.value }}</div>
                      <div class="node-index">[{{ node.index }}]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="operation-explanation">
            <h3>堆操作说明</h3>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>堆的数组表示</h4>
                  <p>堆通常使用数组存储：</p>
                  <ul>
                    <li>根节点索引: 0</li>
                    <li>左子节点索引: 2 * i + 1</li>
                    <li>右子节点索引: 2 * i + 2</li>
                    <li>父节点索引: Math.floor((i-1)/2)</li>
                  </ul>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>堆的属性</h4>
                  <p>堆的关键属性：</p>
                  <ul>
                    <li>完全二叉树结构</li>
                    <li>堆序性（最大堆/最小堆）</li>
                    <li>高效的插入和删除操作</li>
                    <li>堆顶元素总是最值</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

// 堆数据
const heapType = ref<'max' | 'min'>('max');
const heapArray = ref<number[]>([]);
const newValue = ref<number | null>(null);
const highlightedIndex = ref<number | null>(null);

const obj = {
  name: 'bbb'
}

function getHeapType(obj: Record<string, any>) {
  obj.name = 'aaa'
  obj = new Object()
  return obj
}

getHeapType(obj)

console.log(obj)

// 计算树形结构的层级表示
const treeLevels = computed(() => {
  if (heapArray.value.length === 0) return [];

  const levels = [];
  let currentLevel = 0;
  let levelNodes = [];

  for (let i = 0; i < heapArray.value.length; i++) {
    levelNodes.push({ value: heapArray.value[i], index: i });

    // 检查当前层是否已满 (2^currentLevel)
    if (levelNodes.length === Math.pow(2, currentLevel)) {
      levels.push(levelNodes);
      levelNodes = [];
      currentLevel++;
    }
  }

  // 添加最后一层（可能不满）
  if (levelNodes.length > 0) {
    levels.push(levelNodes);
  }

  return levels;
});

// 插入节点
function insertNode() {
  if (newValue.value === null || isNaN(newValue.value)) return;

  // 添加新元素到数组末尾
  heapArray.value.push(newValue.value);

  // 上浮操作
  let index = heapArray.value.length - 1;
  highlightedIndex.value = index;

  const animateHeapifyUp = () => {
    if (index <= 0) {
      highlightedIndex.value = null;
      return;
    }

    const parentIndex = Math.floor((index - 1) / 2);

    // 检查是否需要交换
    const shouldSwap = heapType.value === 'max'
      ? heapArray.value[index] > heapArray.value[parentIndex]
      : heapArray.value[index] < heapArray.value[parentIndex];

    if (shouldSwap) {
      // 交换元素
      [heapArray.value[parentIndex], heapArray.value[index]] =
        [heapArray.value[index], heapArray.value[parentIndex]];

      // 更新索引并继续
      index = parentIndex;
      highlightedIndex.value = index;
      setTimeout(animateHeapifyUp, 500);
    } else {
      highlightedIndex.value = null;
    }
  };

  setTimeout(animateHeapifyUp, 500);
  newValue.value = null;
}

// 删除堆顶元素
function removeRoot() {
  if (heapArray.value.length === 0) return;

  // 将最后一个元素移到堆顶
  heapArray.value[0] = heapArray.value[heapArray.value.length - 1];
  heapArray.value.pop();

  highlightedIndex.value = 0;

  const animateHeapifyDown = (index: number) => {
    let targetIndex = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    // 检查左子节点
    if (left < heapArray.value.length) {
      const shouldCompareLeft = heapType.value === 'max'
        ? heapArray.value[left] > heapArray.value[targetIndex]
        : heapArray.value[left] < heapArray.value[targetIndex];

      if (shouldCompareLeft) {
        targetIndex = left;
      }
    }

    // 检查右子节点
    if (right < heapArray.value.length) {
      const shouldCompareRight = heapType.value === 'max'
        ? heapArray.value[right] > heapArray.value[targetIndex]
        : heapArray.value[right] < heapArray.value[targetIndex];

      if (shouldCompareRight) {
        targetIndex = right;
      }
    }

    // 如果需要交换
    if (targetIndex !== index) {
      [heapArray.value[index], heapArray.value[targetIndex]] =
        [heapArray.value[targetIndex], heapArray.value[index]];

      highlightedIndex.value = targetIndex;
      setTimeout(() => animateHeapifyDown(targetIndex), 500);
    } else {
      highlightedIndex.value = null;
    }
  };

  setTimeout(() => animateHeapifyDown(0), 500);
}

// 生成随机堆
function buildRandomHeap() {
  const size = Math.floor(Math.random() * 7) + 5; // 5-11个元素
  heapArray.value = [];

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 90) + 10; // 10-99
    heapArray.value.push(value);
  }

  // 建堆操作
  for (let i = Math.floor(heapArray.value.length / 2) - 1; i >= 0; i--) {
    heapifyDown(i);
  }
}

// 堆化（下沉操作）
function heapifyDown(index: number) {
  let targetIndex = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  // 检查左子节点
  if (left < heapArray.value.length) {
    const shouldCompareLeft = heapType.value === 'max'
      ? heapArray.value[left] > heapArray.value[targetIndex]
      : heapArray.value[left] < heapArray.value[targetIndex];

    if (shouldCompareLeft) {
      targetIndex = left;
    }
  }

  // 检查右子节点
  if (right < heapArray.value.length) {
    const shouldCompareRight = heapType.value === 'max'
      ? heapArray.value[right] > heapArray.value[targetIndex]
      : heapArray.value[right] < heapArray.value[targetIndex];

    if (shouldCompareRight) {
      targetIndex = right;
    }
  }

  // 如果需要交换
  if (targetIndex !== index) {
    [heapArray.value[index], heapArray.value[targetIndex]] =
      [heapArray.value[targetIndex], heapArray.value[index]];
    heapifyDown(targetIndex);
  }
}

// 清空堆
function clearHeap() {
  heapArray.value = [];
}

// 初始加载时生成随机堆
onMounted(() => {
  buildRandomHeap();
});
</script>

<style lang="less" scoped>
.heap-container {
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

.intro {
  margin-bottom: 2.5rem;

  .intro-card {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;

    h2 {
      font-size: 1.8rem;
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #1e40af;
    }

    p {
      max-width: 800px;
      margin: 0 auto 2rem;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }
}

.heap-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;

  .stat {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    padding: 1.2rem;
    min-width: 150px;

    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4f46e5;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.95rem;
      color: #4b5563;
    }
  }
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

.heap-type {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .type-header {
    padding: 1rem;
    color: white;
    font-weight: 600;

    &.max-heap {
      background: linear-gradient(to right, #ff6b6b, #ff8e8e);
    }

    &.min-heap {
      background: linear-gradient(to right, #4da6ff, #66b3ff);
    }

    h3 {
      margin: 0;
      text-align: center;
    }
  }

  .type-content {
    padding: 1.2rem;
  }
}

.heap-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;

  .level {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  .node {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &.max {
      background: #ff8e8e;
      color: white;
    }

    &.min {
      background: #66b3ff;
      color: white;
    }
  }
}

.complexity {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #cbd5e1;
  font-weight: 600;
  color: #4f46e5;
}

.complexity-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #4f46e5;
    color: white;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  tr:hover {
    background-color: #f1f5f9;
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

.demo-section {
  background: #f9fafb;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  background: #e0f2fe;
  padding: 1.5rem;
  border-radius: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;

  label {
    font-weight: 500;
  }

  select,
  input {
    padding: 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    }
  }

  input[type="number"] {
    width: 120px;
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

.heap-representation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.array-representation,
.tree-representation {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4f46e5;
    text-align: center;
  }
}

.array-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  min-height: 100px;
}

.array-element {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #e0e7ff;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &.root {
    background: #4f46e5;
    color: white;
    transform: scale(1.1);
  }

  &.highlight {
    background: #ff6b6b;
    color: white;
    animation: pulse 1s infinite;
  }
}

.tree-container {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-heap {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
}

.tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.level {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.tree-node {
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &.max-node {
    background: #ff8e8e;
    color: white;
  }

  &.min-node {
    background: #66b3ff;
    color: white;
  }

  &.highlight {
    background: #ff6b6b;
    transform: scale(1.1);
    animation: pulse 1s infinite;
  }

  .node-value {
    font-size: 1.3rem;
  }

  .node-index {
    font-size: 0.7rem;
    opacity: 0.8;
  }
}

.operation-explanation {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #4f46e5;
    text-align: center;
  }
}

.steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.step {
  display: flex;
  gap: 1rem;
  background: #f1f5f9;
  padding: 1.5rem;
  border-radius: 8px;

  .step-number {
    width: 36px;
    height: 36px;
    background: #4f46e5;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-content {
    h4 {
      margin: 0 0 0.5rem;
      color: #1e40af;
    }

    p,
    ul {
      margin: 0.5rem 0;
      font-size: 0.95rem;
      color: #3f3f46;
    }

    ul {
      padding-left: 1.2rem;
    }
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }

  .demo-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .control-group {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
