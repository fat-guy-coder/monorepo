<template>
  <div class="array-algorithms-container">
    <!-- 标题区域 -->
    <header class="header-section">
      <h1 class="title">数组算法实现大全</h1>
      <div class="subtitle">常见数组操作的高效实现</div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ algorithms.length }}+</div>
          <div class="stat-label">算法实现</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">O(n)</div>
          <div class="stat-label">时间复杂度</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">O(1)</div>
          <div class="stat-label">空间复杂度</div>
        </div>
      </div>
    </header>

    <!-- 算法导航 -->
    <section class="algorithm-nav">
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="['nav-item', { active: activeCategory === category.id }]"
        @click="activeCategory = category.id"
      >
        <div class="category-icon">{{ category.icon }}</div>
        <div class="category-name">{{ category.name }}</div>
      </div>
    </section>

    <!-- 算法列表 -->
    <section class="algorithm-list">
      <div
        v-for="(algo, index) in filteredAlgorithms"
        :key="index"
        class="algorithm-card"
      >
        <div class="card-header">
          <div class="algo-icon">{{ algo.icon }}</div>
          <div class="algo-title">
            <h3>{{ algo.title }}</h3>
            <div class="algo-desc">{{ algo.description }}</div>
          </div>
          <div class="complexity">
            <div class="time">时间: {{ algo.timeComplexity }}</div>
            <div class="space">空间: {{ algo.spaceComplexity }}</div>
          </div>
        </div>

        <div class="card-content">
          <div class="implementation">
            <h4>实现代码</h4>
            <pre><code>{{ algo.code }}</code></pre>
          </div>

          <div class="demo">
            <h4>运行示例</h4>
            <div class="demo-input">
              <span>输入: {{ formatDemoInput(algo.demoInput) }}</span>
              <button @click="runDemo(algo)">运行示例</button>
            </div>
            <div
              v-if="demoResults[algo.id]"
              class="demo-result"
            >
              结果: <span class="result-value">{{ demoResults[algo.id] }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数组操作示意图 -->
    <section class="visualization">
      <h2 class="section-title">数组操作可视化</h2>
      <div class="visual-grid">
        <div class="operation-card">
          <h3>数组交集</h3>
          <div class="array-visual">
            <div class="array-container">
              <div class="array-label">数组A:</div>
              <div class="array-items">
                <div v-for="(num, idx) in [3, 1, 4]" :key="'a'+idx" class="array-item">{{ num }}</div>
              </div>
            </div>
            <div class="array-container">
              <div class="array-label">数组B:</div>
              <div class="array-items">
                <div v-for="(num, idx) in [4, 5, 1]" :key="'b'+idx" class="array-item">{{ num }}</div>
              </div>
            </div>
            <div class="result-array">
              <div class="array-label">交集:</div>
              <div class="array-items">
                <div class="array-item highlight">1</div>
                <div class="array-item highlight">4</div>
              </div>
            </div>
          </div>
        </div>

        <div class="operation-card">
          <h3>数组扁平化</h3>
          <div class="array-visual">
            <div class="array-label">原始数组:</div>
            <div class="nested-array">
              <div class="array-level">
                <div class="array-item">1</div>
                <div class="array-item nested">
                  <div class="array-item">2</div>
                  <div class="array-item">3</div>
                </div>
                <div class="array-item">4</div>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="flat-array">
              <div class="array-label">扁平化:</div>
              <div class="array-items">
                <div v-for="num in [1,2,3,4]" :key="'flat'+num" class="array-item">{{ num }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="operation-card">
          <h3>数组分块</h3>
          <div class="array-visual">
            <div class="array-container">
              <div class="array-label">原始数组:</div>
              <div class="array-items">
                <div v-for="num in [1,2,3,4,5,6]" :key="'chunk'+num" class="array-item">{{ num }}</div>
              </div>
            </div>
            <div class="array-label">分块大小: 2</div>
            <div class="chunked-arrays">
              <div class="chunk">
                <div class="array-item">1</div>
                <div class="array-item">2</div>
              </div>
              <div class="chunk">
                <div class="array-item">3</div>
                <div class="array-item">4</div>
              </div>
              <div class="chunk">
                <div class="array-item">5</div>
                <div class="array-item">6</div>
              </div>
            </div>
          </div>
        </div>

        <div class="operation-card">
          <h3>数组旋转</h3>
          <div class="array-visual">
            <div class="array-container">
              <div class="array-label">原始数组:</div>
              <div class="array-items">
                <div v-for="num in [1,2,3,4,5]" :key="'rotate'+num" class="array-item">{{ num }}</div>
              </div>
            </div>
            <div class="array-label">右旋2位:</div>
            <div class="array-items rotated">
              <div class="array-item">4</div>
              <div class="array-item">5</div>
              <div class="array-item">1</div>
              <div class="array-item">2</div>
              <div class="array-item">3</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能对比 -->
    <section class="performance-section">
      <h2 class="section-title">算法性能对比</h2>
      <div class="performance-table">
        <div class="table-header">
          <div class="cell">算法名称</div>
          <div class="cell">时间复杂度</div>
          <div class="cell">空间复杂度</div>
          <div class="cell">适用场景</div>
        </div>
        <div
          v-for="(algo, index) in performanceData"
          :key="index"
          class="table-row"
        >
          <div class="cell">{{ algo.name }}</div>
          <div class="cell">{{ algo.time }}</div>
          <div class="cell">{{ algo.space }}</div>
          <div class="cell">{{ algo.scenario }}</div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="summary-section">
      <h2 class="section-title">数组算法总结</h2>
      <div class="summary-content">
        <div class="key-point">
          <div class="point-icon">📊</div>
          <div class="point-text">
            <strong>数组操作</strong>是编程基础，掌握高效算法可显著提升代码性能
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">⚡</div>
          <div class="point-text">
            优先选择<strong>时间复杂度低</strong>的算法，特别是处理大数据集时
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">🧠</div>
          <div class="point-text">
            理解不同算法的<strong>适用场景</strong>比死记硬背实现更重要
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">🔍</div>
          <div class="point-text">
            注意算法的<strong>边界情况</strong>处理：空数组、单一元素、大数据量等
          </div>
        </div>
      </div>
      <div class="quote-box">
        "优秀的程序员不在于记住每个算法的实现，而在于理解其原理并能在正确场景应用"
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 算法分类
const categories = ref([
  { id: 'all', name: '全部算法', icon: '📚' },
  { id: 'basic', name: '基础操作', icon: '🔢' },
  { id: 'set', name: '集合操作', icon: '🧮' },
  { id: 'advanced', name: '高级应用', icon: '⚙️' },
  { id: 'utility', name: '工具函数', icon: '🛠️' }
]);

const activeCategory = ref('all');

// 算法数据
const algorithms = ref([
  {
    id: 'max',
    title: '求最大值',
    description: '找出数组中的最大值',
    icon: '⬆️',
    category: 'basic',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `function findMax(arr: number[]): number {
  return arr.reduce((max, current) =>
    current > max ? current : max,
    Number.NEGATIVE_INFINITY
  );
}`,
    demoInput: [3, 7, 2, 9, 5],
    func: (arr: number[]) => Math.max(...arr)
  },
  {
    id: 'min',
    title: '求最小值',
    description: '找出数组中的最小值',
    icon: '⬇️',
    category: 'basic',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `function findMin(arr: number[]): number {
  return arr.reduce((min, current) =>
    current < min ? current : min,
    Number.POSITIVE_INFINITY
  );
}`,
    demoInput: [3, 7, 2, 9, 5],
    func: (arr: number[]) => Math.min(...arr)
  },
  {
    id: 'avg',
    title: '求平均值',
    description: '计算数组元素的平均值',
    icon: '🧮',
    category: 'basic',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `function calculateAverage(arr: number[]): number {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}`,
    demoInput: [10, 20, 30, 40],
    func: (arr: number[]) =>
      (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
  },
  {
    id: 'sum',
    title: '数组求和',
    description: '计算所有元素的总和',
    icon: '➕',
    category: 'basic',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `function arraySum(arr: number[]): number {
  return arr.reduce((sum, current) => sum + current, 0);
}`,
    demoInput: [1, 2, 3, 4, 5],
    func: (arr: number[]) => arr.reduce((a, b) => a + b, 0)
  },
  {
    id: 'product',
    title: '数组求积',
    description: '计算所有元素的乘积',
    icon: '✖️',
    category: 'basic',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `function arrayProduct(arr: number[]): number {
  return arr.reduce((product, current) =>
    product * current, 1
  );
}`,
    demoInput: [2, 3, 4],
    func: (arr: number[]) => arr.reduce((a, b) => a * b, 1)
  },
  {
    id: 'random',
    title: '随机不重复数组',
    description: '生成指定范围的不重复随机数组',
    icon: '🎲',
    category: 'utility',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function generateUniqueRandomArray(
  length: number,
  min = 0,
  max = 100
): number[] {
  const set = new Set<number>();
  while (set.size < length) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(rand);
  }
  return Array.from(set);
}`,
    demoInput: [5, 1, 10],
    func: () => {
      const set = new Set<number>();
      while (set.size < 5) {
        set.add(Math.floor(Math.random() * 10) + 1);
      }
      return Array.from(set).sort((a, b) => a - b);
    }
  },
  {
    id: 'intersection',
    title: '数组交集',
    description: '获取两个数组的交集',
    icon: '∩',
    category: 'set',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(min(n,m))',
    code: `function arrayIntersection(arr1: any[], arr2: any[]): any[] {
  const set = new Set(arr1);
  return arr2.filter(item => set.has(item));
}`,
    demoInput: [[1,2,3,4], [3,4,5,6]],
    func: (arr1: number[], arr2: number[]) =>
      arr1.filter(value => arr2.includes(value))
  },
  {
    id: 'union',
    title: '数组并集',
    description: '获取两个数组的并集',
    icon: '∪',
    category: 'set',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(n+m)',
    code: `function arrayUnion(arr1: any[], arr2: any[]): any[] {
  return [...new Set([...arr1, ...arr2])];
}`,
    demoInput: [[1,2,3], [3,4,5]],
    func: (arr1: number[], arr2: number[]) =>
      [...new Set([...arr1, ...arr2])]
  },
  {
    id: 'difference',
    title: '数组差集',
    description: '获取两个数组的差集(A-B)',
    icon: '−',
    category: 'set',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(n)',
    code: `function arrayDifference(arr1: any[], arr2: any[]): any[] {
  const set = new Set(arr2);
  return arr1.filter(item => !set.has(item));
}`,
    demoInput: [[1,2,3,4], [3,4,5,6]],
    func: (arr1: number[], arr2: number[]) =>
      arr1.filter(value => !arr2.includes(value))
  },
  {
    id: 'symmetric',
    title: '数组对称差',
    description: '获取两个数组的对称差集',
    icon: '∆',
    category: 'set',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(n+m)',
    code: `function symmetricDifference(arr1: any[], arr2: any[]): any[] {
  const diff1 = arrayDifference(arr1, arr2);
  const diff2 = arrayDifference(arr2, arr1);
  return [...diff1, ...diff2];
}`,
    demoInput: [[1,2,3], [2,3,4]],
    func: (arr1: number[], arr2: number[]) => {
      const diff1 = arr1.filter(v => !arr2.includes(v));
      const diff2 = arr2.filter(v => !arr1.includes(v));
      return [...diff1, ...diff2];
    }
  },
  {
    id: 'flatten',
    title: '数组扁平化',
    description: '将多层嵌套数组扁平化为一维数组',
    icon: '📏',
    category: 'advanced',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function flattenArray(arr: any[]): any[] {
  return arr.reduce((flat, item) =>
    flat.concat(Array.isArray(item) ?
      flattenArray(item) : item
    ), []
  );
}`,
    demoInput: [[1, [2, [3, 4], 5]]],
    func: (arr: any[]): any[] => {
      return arr.reduce((flat, item) =>
        flat.concat(Array.isArray(item) ?
          flattenArray(item) : item
        ), []);
    }
  },
  {
    id: 'chunk',
    title: '数组分块',
    description: '将数组分割为指定大小的块',
    icon: '🔢',
    category: 'utility',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function chunkArray(arr: any[], size: number): any[][] {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}`,
    demoInput: [[1,2,3,4,5,6,7], 3],
    func: (arr: number[], size: number) => {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    }
  },
  {
    id: 'rotate',
    title: '数组旋转',
    description: '将数组向右旋转指定位置',
    icon: '🔄',
    category: 'advanced',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function rotateArray(arr: any[], k: number): any[] {
  const rotations = k % arr.length;
  return [
    ...arr.slice(-rotations),
    ...arr.slice(0, arr.length - rotations)
  ];
}`,
    demoInput: [[1,2,3,4,5], 2],
    func: (arr: number[], k: number) => {
      const rotations = k % arr.length;
      return [
        ...arr.slice(-rotations),
        ...arr.slice(0, arr.length - rotations)
      ];
    }
  },
  {
    id: 'frequency',
    title: '元素频率统计',
    description: '统计数组中各元素出现次数',
    icon: '📈',
    category: 'utility',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function frequencyCount(arr: any[]): Record<any, number> {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}`,
    demoInput: [['a', 'b', 'a', 'c', 'b', 'a']],
    func: (arr: string[]) => {
      return arr.reduce((acc: Record<string, number>, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
    }
  },
  {
    id: 'partition',
    title: '数组分区',
    description: '根据条件将数组划分为两部分',
    icon: '⚖️',
    category: 'advanced',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function partitionArray(arr: any[], predicate: (item: any) => boolean): any[][] {
  const trueArr = [];
  const falseArr = [];
  arr.forEach(item =>
    predicate(item) ? trueArr.push(item) : falseArr.push(item)
  );
  return [trueArr, falseArr];
}`,
    demoInput: [[1,2,3,4,5,6], (n: number) => n % 2 === 0],
    func: (arr: number[], predicate: (n: number) => boolean) => {
      const trueArr = arr.filter(predicate);
      const falseArr = arr.filter(n => !predicate(n));
      return [trueArr, falseArr];
    }
  },
  {
    id: 'zip',
    title: '数组zip操作',
    description: '将多个数组合并为一个元组数组',
    icon: '🤐',
    category: 'advanced',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function zipArrays(...arrays: any[][]): any[][] {
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  return Array.from({ length: maxLength }, (_, i) =>
    arrays.map(arr => arr[i])
  );
}`,
    demoInput: [[1,2,3], ['a','b','c'], [true,false,true]],
    func: (...arrays: any[][]) => {
      const maxLength = Math.max(...arrays.map(arr => arr.length));
      return Array.from({ length: maxLength }, (_, i) =>
        arrays.map(arr => arr[i])
      );
    }
  }
]);

// 扁平算法的递归实现
const flattenArray = (arr: any[]): any[] => {
  return arr.reduce((flat: any[], item) =>
    flat.concat(Array.isArray(item) ? flattenArray(item) : item),
    []
  );
};

// 演示结果
const demoResults = ref<Record<string, any>>({});

// 运行演示示例
const runDemo = (algo: any) => {
  let result;

  if (algo.id === 'random') {
    result = algo.func();
  }
  else if (algo.id === 'partition' || algo.id === 'zip') {
    result = algo.func(...algo.demoInput);
  }
  else if (Array.isArray(algo.demoInput[0])) {
    result = algo.func(...algo.demoInput);
  }
  else {
    result = algo.func(algo.demoInput);
  }

  demoResults.value[algo.id] = Array.isArray(result)
    ? `[${result.join(', ')}]`
    : typeof result === 'object'
      ? JSON.stringify(result)
      : result;
};

// 格式化输入显示
const formatDemoInput = (input: any) => {
  if (Array.isArray(input)) {
    if (input.some(item => Array.isArray(item))) {
      return input.map(arr =>
        Array.isArray(arr) ? `[${arr.join(', ')}]` : arr
      ).join(', ');
    }
    return `[${input.join(', ')}]`;
  }
  return input;
};

// 过滤算法
const filteredAlgorithms = computed(() => {
  if (activeCategory.value === 'all') return algorithms.value;
  return algorithms.value.filter(algo =>
    algo.category === activeCategory.value
  );
});

// 性能数据
const performanceData = ref([
  { name: '求和/求积', time: 'O(n)', space: 'O(1)', scenario: '小数据量计算' },
  { name: '最值查找', time: 'O(n)', space: 'O(1)', scenario: '数据统计分析' },
  { name: '集合操作', time: 'O(n+m)', space: 'O(n+m)', scenario: '数据集比较' },
  { name: '扁平化', time: 'O(n)', space: 'O(n)', scenario: '处理嵌套数据结构' },
  { name: '分块', time: 'O(n)', space: 'O(n)', scenario: '分批处理大数据集' },
  { name: '频率统计', time: 'O(n)', space: 'O(k)', scenario: '数据分布分析' }
]);
</script>

<style lang="less" scoped>
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@code-bg: #f6f8ff;

.array-algorithms-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, @light-bg, transparent);
  border-radius: 16px;

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-light;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  .stat-card {
    background: white;
    padding: 1.25rem 1rem;
    border-radius: 12px;
    box-shadow: @card-shadow;
    min-width: 120px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.algorithm-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem 1.5rem;
    border-radius: 12px;
    background: @light-bg;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid @border-color;
    min-width: 120px;

    &:hover {
      background: rgba(74, 108, 247, 0.1);
      border-color: @primary-color;
    }

    &.active {
      background: @primary-color;
      border-color: @primary-color;
      color: white;

      .category-icon, .category-name {
        color: white;
      }
    }

    .category-icon {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    .category-name {
      font-weight: 600;
      font-size: 0.95rem;
    }
  }
}

.algorithm-list {
  display: grid;
  gap: 1.5rem;
}

.algorithm-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: @card-shadow;
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(110, 69, 226, 0.12);
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 1.25rem;
    background: @light-bg;
    border-bottom: 1px solid @border-color;

    .algo-icon {
      font-size: 2.2rem;
      margin-right: 1.25rem;
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(74, 108, 247, 0.1);
      color: @primary-color;
    }

    .algo-title {
      flex: 1;

      h3 {
        margin: 0 0 0.25rem;
        font-size: 1.3rem;
      }

      .algo-desc {
        color: @text-light;
        font-size: 0.95rem;
      }
    }

    .complexity {
      background: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      border: 1px solid @border-color;

      .time, .space {
        white-space: nowrap;
      }
    }
  }

  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .implementation, .demo {
      h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid @border-color;
        color: @text-color;
      }
    }

    .implementation {
      pre {
        background: @code-bg;
        border-radius: 8px;
        padding: 1.25rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          color: @text-color;
        }
      }
    }

    .demo {
      .demo-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: @light-bg;
        border-radius: 8px;

        button {
          background: @primary-color;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;

          &:hover {
            background: darken(@primary-color, 8%);
          }
        }
      }

      .demo-result {
        padding: 1rem;
        background: lighten(@accent-color, 45%);
        border-radius: 8px;
        font-family: 'Fira Code', monospace;

        .result-value {
          font-weight: 600;
          color: darken(@accent-color, 15%);
          margin-left: 0.5rem;
        }
      }
    }
  }
}

.section-title {
  font-size: 1.7rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid @primary-color;
  color: darken(@primary-color, 10%);
}

.visualization {
  margin: 3rem 0;

  .visual-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    .operation-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      border: 1px solid @border-color;

      h3 {
        margin-top: 0;
        color: @primary-color;
        text-align: center;
        margin-bottom: 1.5rem;
      }
    }
  }
}

.array-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .array-container, .result-array, .flat-array {
    width: 100%;

    .array-label {
      font-size: 0.9rem;
      color: @text-light;
      margin-bottom: 0.5rem;
      text-align: center;
      font-weight: 500;
    }
  }

  .array-items {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    .array-item {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: @light-bg;
      border-radius: 6px;
      border: 1px solid @border-color;
      font-weight: 600;

      &.highlight {
        background: lighten(@accent-color, 35%);
        border-color: lighten(@accent-color, 20%);
        color: darken(@accent-color, 20%);
      }
    }
  }

  .nested-array {
    display: flex;
    justify-content: center;

    .array-level {
      display: flex;
      gap: 0.5rem;

      .array-item {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: @light-bg;
        border-radius: 6px;
        border: 1px solid @border-color;
        font-weight: 600;

        &.nested {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem;
          width: auto;
          height: auto;
          background: lighten(@primary-color, 40%);
          border-color: lighten(@primary-color, 30%);
        }
      }
    }
  }

  .chunked-arrays {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;

    .chunk {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      border: 1px dashed @border-color;
      border-radius: 8px;
    }
  }

  .rotated {
    .array-item:nth-child(1),
    .array-item:nth-child(2) {
      background: lighten(@accent-color, 35%);
      border-color: lighten(@accent-color, 20%);
      color: darken(@accent-color, 20%);
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: @text-light;
  }
}

.performance-section {
  margin: 3rem 0;

  .performance-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;

    .table-header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1.5fr;
      background: @primary-color;
      color: white;
      font-weight: 600;

      .cell {
        padding: 1rem;
        text-align: center;
      }
    }

    .table-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1.5fr;
      border-bottom: 1px solid @border-color;

      &:last-child {
        border-bottom: none;
      }

      .cell {
        padding: 0.9rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child {
          font-weight: 500;
        }

        &:nth-child(2) {
          color: darken(@accent-color, 20%);
          font-weight: 600;
        }

        &:nth-child(3) {
          color: darken(@primary-color, 10%);
          font-weight: 600;
        }
      }

      &:nth-child(odd) {
        background: @light-bg;
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #f0f9ff, #f8f9ff);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;

  .summary-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .key-point {
      display: flex;
      gap: 1rem;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: @card-shadow;

      .point-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
      }

      .point-text {
        strong {
          color: @primary-color;
        }
      }
    }
  }

  .quote-box {
    background: white;
    padding: 1.5rem;
    border-left: 4px solid @accent-color;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    color: @text-color;
    font-size: 1.1rem;
    text-align: center;
    margin-top: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
}

@media (max-width: 768px) {
  .array-algorithms-container {
    padding: 1rem;
  }

  .header-section {
    padding: 1.5rem 1rem;

    .title {
      font-size: 2rem !important;
    }
  }

  .stats-grid {
    gap: 1rem;

    .stat-card {
      flex: 1;
      min-width: 100px;
      padding: 1rem 0.5rem;

      .stat-value {
        font-size: 1.5rem;
      }
    }
  }

  .algorithm-card {
    .card-content {
      grid-template-columns: 1fr;
    }

    .card-header {
      flex-direction: column;
      text-align: center;

      .algo-icon {
        margin-right: 0;
        margin-bottom: 1rem;
      }

      .complexity {
        margin-top: 1rem;
      }
    }
  }
}
</style>
