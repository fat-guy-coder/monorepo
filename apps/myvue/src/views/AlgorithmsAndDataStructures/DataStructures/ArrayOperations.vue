<template>
  <div class="array-docs">
    <header class="docs-header">
      <h1>数据结构：数组全解</h1>
      <div class="array-visualization">
        <div class="array-container">
          <div v-for="(item, index) in visualArray" :key="index" class="array-item"
            :style="{ backgroundColor: getColor(item) }">
            <span class="index">[{{ index }}]</span>
            <span class="value">{{ item }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 基础定义 -->
      <section class="definition-section">
        <h2><span class="icon">📚</span> 数组定义</h2>
        <div class="definition-card">
          <p>数组是一种<b>线性数据结构</b>，在内存中连续存储，通过索引访问元素</p>
          <div class="meta-info">
            <div class="meta-item">
              <div class="meta-icon">⏱️</div>
              <div>
                <h3>时间复杂度</h3>
                <p>访问: O(1)<br>插入/删除: O(n)<br>搜索: O(n)</p>
              </div>
            </div>
            <div class="meta-item">
              <div class="meta-icon">💾</div>
              <div>
                <h3>空间复杂度</h3>
                <p>O(n)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心操作 -->
      <section class="operations-section">
        <h2><span class="icon">⚡</span> 核心操作</h2>
        <div class="operation-grid">
          <div class="operation-card" v-for="op in operations" :key="op.title" @click="executeOperation(op)">
            <div class="op-icon">{{ op.icon }}</div>
            <h3>{{ op.title }}</h3>
            <code>{{ op.code }}</code>
          </div>
        </div>
      </section>

      <!-- 排序方法 -->
      <section class="sorting-section">
        <h2><span class="icon">🔀</span> 排序算法</h2>
        <div class="algorithm-comparison">
          <div class="algorithm-card" v-for="algo in sortingAlgorithms" :key="algo.name">
            <h3>{{ algo.name }}</h3>
            <div class="complexity">
              <span class="time">时间复杂度: {{ algo.time }}</span>
              <span class="space">空间复杂度: {{ algo.space }}</span>
            </div>
            <pre><code>{{ algo.code }}</code></pre>
            <button @click="runSort(algo)">运行示例</button>
          </div>
        </div>
      </section>

      <!-- 去重方法 -->
      <section class="deduplication-section">
        <h2><span class="icon">✨</span> 数组去重</h2>
        <div class="method-grid">
          <div class="method-card" v-for="method in deduplicateMethods" :key="method.name">
            <div class="method-header">
              <span class="method-name">{{ method.name }}</span>
              <span class="complexity">O({{ method.complexity }})</span>
            </div>
            <pre><code>{{ method.code }}</code></pre>
            <div class="example-result">
              <button @click="runDeduplicate(method)">执行</button>
              <span>结果: {{ method.result }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 可视化数组数据
const visualArray = ref<number[]>([5, 2, 8, 4, 9, 3, 7])
const getColor = (val: number) => `hsl(${val * 40}, 70%, 60%)`

// ... existing code ...
const runSort = (algo: any) => {
  visualArray.value = algo.action()
}
// ... existing code ...

// 基础操作配置
const operations = reactive([
  {
    icon: '➕',
    title: '尾部插入',
    code: 'push(9)',
    action: () => visualArray.value.push(Math.floor(Math.random() * 10))
  },
  {
    icon: '➖',
    title: '尾部删除',
    code: 'pop()',
    action: () => visualArray.value.pop()
  },
  {
    icon: '🔄',
    title: '更新元素',
    code: 'arr[2] = 10',
    action: () => visualArray.value[2] = Math.floor(Math.random() * 10)
  },
  {
    icon: '🔍',
    title: '查找元素',
    code: 'find(8)',
    action: () => alert('索引: ' + visualArray.value.indexOf(8))
  }
])

// 排序算法配置
const sortingAlgorithms = reactive([
  {
    name: '快速排序',
    time: 'O(n log n)',
    space: 'O(log n)',
    code: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}`,
    action: () => visualArray.value = quickSort([...visualArray.value])
  },
  // 其他排序算法...
])

// 去重方法配置
const deduplicateMethods = reactive([
  {
    name: 'Set去重',
    complexity: 'n',
    code: '[...new Set(arr)]',
    result: '',
    action: () => [...new Set(visualArray.value)]
  },
  // 其他去重方法...
])

// 操作方法执行
const executeOperation = (op: any) => {
  op.action()
  visualArray.value = [...visualArray.value]
}

// 快速排序实现
const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr
  const pivot = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i])
    else right.push(arr[i])
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// 运行去重方法
const runDeduplicate = (method: any) => {
  method.result = method.action().join(', ')
}
</script>

<style scoped>
.array-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.docs-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  border-radius: 1rem;
  color: white;
}

.array-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.array-item {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.2s;
}

.array-item:hover {
  transform: translateY(-5px);
}

.index {
  font-size: 0.8em;
  opacity: 0.8;
}

.value {
  font-size: 1.4em;
  font-weight: bold;
}

.definition-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.meta-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.meta-icon {
  font-size: 2rem;
}

.operation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.operation-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.operation-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.op-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.algorithm-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.algorithm-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.method-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .array-item {
    width: 60px;
    height: 60px;
  }
}
</style>
