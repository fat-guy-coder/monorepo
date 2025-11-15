<template>
  <div class="bloom-filter-intro">
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">布隆过滤器</h1>
        <p class="subtitle">空间效率极高的概率型数据结构</p>
        <div class="visual-demo">
          <div class="bit-array">
            <div
              v-for="(bit, index) in bitArray"
              :key="index"
              class="bit"
              :class="{ active: bit }"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              {{ bit ? '1' : '0' }}
            </div>
          </div>
          <div class="hash-functions">
            <div class="hash-function" v-for="n in 3" :key="n">
              <span class="hash-label">Hash{{ n }}</span>
              <div class="hash-arrow">→</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="section in sections"
            :key="section.id"
            :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)"
          >
            <span class="nav-icon">{{ section.icon }}</span>
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 概述 -->
        <section id="overview" class="content-section">
          <h2>概述</h2>
          <p>布隆过滤器（Bloom Filter）是1970年由布隆提出的<strong>概率型数据结构</strong>。它实际上是一个很长的二进制向量和一系列随机映射函数，用于判断一个元素是否在一个集合中。</p>

          <div class="feature-cards">
            <div class="feature-card">
              <div class="feature-icon">✓</div>
              <h3>空间效率高</h3>
              <p>相比其他数据结构，布隆过滤器在空间上有巨大优势</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>查询速度快</h3>
              <p>插入和查询操作都是常数时间复杂度 O(k)</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚠️</div>
              <h3>概率型结果</h3>
              <p>可能存在误判，但不会漏判</p>
            </div>
          </div>
        </section>

        <!-- 核心特点 -->
        <section id="features" class="content-section">
          <h2>核心特点</h2>

          <div class="characteristics">
            <div class="characteristic positive">
              <h3>优点</h3>
              <ul>
                <li>
                  <strong>空间效率极高</strong>
                  <p>不需要存储元素本身，只需要存储位信息</p>
                </li>
                <li>
                  <strong>查询时间稳定</strong>
                  <p>查询时间与元素数量无关，始终为 O(k)</p>
                </li>
                <li>
                  <strong>保密性好</strong>
                  <p>不存储原始数据，保护数据隐私</p>
                </li>
                <li>
                  <strong>支持并行操作</strong>
                  <p>多个哈希函数可以并行计算</p>
                </li>
              </ul>
            </div>

            <div class="characteristic negative">
              <h3>局限性</h3>
              <ul>
                <li>
                  <strong>存在误判率</strong>
                  <p>可能将不存在的元素误判为存在</p>
                </li>
                <li>
                  <strong>不支持删除操作</strong>
                  <p>标准的布隆过滤器不支持删除元素</p>
                </li>
                <li>
                  <strong>无法获取元素</strong>
                  <p>只能判断是否存在，无法获取具体元素</p>
                </li>
                <li>
                  <strong>参数调优复杂</strong>
                  <p>需要根据预期数据量调整参数</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="false-positive-demo">
            <h3>误判率演示</h3>
            <div class="false-positive-chart">
              <div class="chart-container">
                <div
                  class="chart-bar"
                  v-for="item in falsePositiveData"
                  :key="item.name"
                  :style="{ height: `${item.value * 2}px` }"
                  :title="`${item.name}: ${(item.value * 100).toFixed(2)}%`"
                >
                  <span class="bar-value">{{ (item.value * 100).toFixed(1) }}%</span>
                  <span class="bar-label">{{ item.name }}</span>
                </div>
              </div>
            </div>
            <p class="chart-note">随着位数组填充率的增加，误判率会相应上升</p>
          </div>
        </section>

        <!-- 工作原理 -->
        <section id="workflow" class="content-section">
          <h2>工作原理</h2>

          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>初始化</h3>
                <p>创建一个长度为 m 的位数组，所有位初始化为 0</p>
                <div class="code-snippet">
                  bitArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>添加元素</h3>
                <p>使用 k 个哈希函数计算元素的哈希值，将对应的位设置为 1</p>
                <div class="code-snippet">
                  // 添加元素 "apple"<br>
                  h1 = hash1("apple") % m → 位置 3<br>
                  h2 = hash2("apple") % m → 位置 7<br>
                  h3 = hash3("apple") % m → 位置 2<br>
                  设置 bitArray[2], bitArray[3], bitArray[7] = 1
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>查询元素</h3>
                <p>使用相同的哈希函数计算位置，如果所有位置都为 1，则元素可能存在</p>
                <div class="code-snippet">
                  // 查询 "apple"<br>
                  检查 bitArray[2], bitArray[3], bitArray[7] 是否都为 1<br>
                  如果都是 1 → "可能存在"<br>
                  如果有 0 → "肯定不存在"
                </div>
              </div>
            </div>
          </div>

          <div class="algorithm-visualization">
            <h3>算法可视化</h3>
            <div class="visual-container">
              <div class="input-section">
                <input
                  v-model="demoInput"
                  placeholder="输入要检查的元素"
                  class="demo-input"
                  @keyup.enter="checkElement"
                >
                <button @click="checkElement" class="demo-button">检查</button>
              </div>

              <div class="visual-result">
                <div class="bit-array-visual">
                  <div
                    v-for="(bit, index) in demoBitArray"
                    :key="index"
                    class="visual-bit"
                    :class="{
                      active: bit,
                      checked: checkedBits.includes(index),
                      'false-positive': isFalsePositive && checkedBits.includes(index)
                    }"
                  >
                    {{ index }}
                  </div>
                </div>

                <div class="result-message" :class="{ 'false-positive': isFalsePositive }">
                  {{ resultMessage }}
                </div>

                <div class="hash-positions" v-if="checkedBits.length > 0">
                  <p>哈希位置: {{ checkedBits.join(', ') }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 适用场景 -->
        <section id="applications" class="content-section">
          <h2>适用场景</h2>

          <div class="application-grid">
            <div class="application-card" v-for="app in applications" :key="app.title">
              <div class="app-icon">{{ app.icon }}</div>
              <h3>{{ app.title }}</h3>
              <p>{{ app.description }}</p>
              <div class="app-example">
                <strong>示例:</strong> {{ app.example }}
              </div>
            </div>
          </div>

          <div class="vs-traditional">
            <h3>与传统数据结构的对比</h3>
            <div class="comparison-table">
              <div class="table-header">
                <div class="table-cell">特性</div>
                <div class="table-cell">布隆过滤器</div>
                <div class="table-cell">哈希表</div>
                <div class="table-cell">二叉树</div>
              </div>

              <div class="table-row" v-for="row in comparisonData" :key="row.property">
                <div class="table-cell property">{{ row.property }}</div>
                <div class="table-cell" :class="getComparisonClass(row.bloom, 'bloom')">
                  {{ row.bloom }}
                </div>
                <div class="table-cell" :class="getComparisonClass(row.hash, 'hash')">
                  {{ row.hash }}
                </div>
                <div class="table-cell" :class="getComparisonClass(row.tree, 'tree')">
                  {{ row.tree }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 算法实现 -->
        <section id="implementation" class="content-section">
          <h2>算法实现</h2>

          <div class="implementation-options">
            <div class="impl-card">
              <h3>参数计算</h3>
              <p>根据预期数据量和可接受的误判率计算最优参数</p>

              <div class="formula">
                <div class="formula-item">
                  <span class="formula-label">位数组大小 m:</span>
                  <code>m = - (n * ln(p)) / (ln(2))²</code>
                </div>
                <div class="formula-item">
                  <span class="formula-label">哈希函数数量 k:</span>
                  <code>k = (m / n) * ln(2)</code>
                </div>
                <div class="formula-item">
                  <span class="formula-label">实际误判率:</span>
                  <code>(1 - e^(-k * n / m))^k</code>
                </div>
              </div>

              <div class="param-calculator">
                <h4>参数计算器</h4>
                <div class="calculator-inputs">
                  <div class="input-group">
                    <label>预期元素数量 (n):</label>
                    <input type="number" v-model.number="expectedElements" min="100" max="10000000">
                  </div>
                  <div class="input-group">
                    <label>可接受误判率 (p):</label>
                    <input type="number" v-model.number="acceptableError" min="0.001" max="0.1" step="0.001">
                  </div>
                </div>
                <div class="calculator-results">
                  <div class="result-item">
                    <span>位数组大小:</span>
                    <strong>{{ calculatedM.toLocaleString() }} bits</strong>
                  </div>
                  <div class="result-item">
                    <span>哈希函数数量:</span>
                    <strong>{{ calculatedK }}</strong>
                  </div>
                  <div class="result-item">
                    <span>内存占用:</span>
                    <strong>{{ (calculatedM / 8 / 1024).toFixed(2) }} KB</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="impl-card">
              <h3>代码示例</h3>
              <p>简单的布隆过滤器 TypeScript 实现</p>

              <div class="code-example">
                <pre><code>{{ bloomFilterCode }}</code></pre>
              </div>
            </div>
          </div>

          <div class="variants">
            <h3>变种和改进</h3>
            <div class="variant-cards">
              <div class="variant-card" v-for="variant in bloomVariants" :key="variant.name">
                <h4>{{ variant.name }}</h4>
                <p>{{ variant.description }}</p>
                <div class="variant-pros-cons">
                  <div class="pros">
                    <strong>优点:</strong> {{ variant.pros }}
                  </div>
                  <div class="cons">
                    <strong>缺点:</strong> {{ variant.cons }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>布隆过滤器 - 空间与时间的精妙权衡</p>
      <p class="footer-note">适用于对空间敏感且能接受一定误判率的场景</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 响应式数据
const activeSection = ref('overview');
const demoInput = ref('');
const demoBitArray = ref(Array(20).fill(0));
const checkedBits = ref<number[]>([]);
const isFalsePositive = ref(false);
const resultMessage = ref('输入元素进行检查');
const expectedElements = ref(10000);
const acceptableError = ref(0.01);

// 位数组动画
const bitArray = ref(Array(12).fill(0));
onMounted(() => {
  // 初始化一些激活的位
  setTimeout(() => {
    [2, 5, 7, 10].forEach(i => {
      bitArray.value[i] = 1;
    });
  }, 500);
});

// 误判率数据
const falsePositiveData = [
  { name: '10%填充', value: 0.008 },
  { name: '25%填充', value: 0.03 },
  { name: '50%填充', value: 0.11 },
  { name: '75%填充', value: 0.28 },
  { name: '90%填充', value: 0.48 }
];

// 导航章节
const sections = [
  { id: 'overview', title: '概述', icon: '🔍' },
  { id: 'features', title: '核心特点', icon: '⭐' },
  { id: 'workflow', title: '工作原理', icon: '⚙️' },
  { id: 'applications', title: '适用场景', icon: '💡' },
  { id: 'implementation', title: '算法实现', icon: '🔧' }
];

// 应用场景
const applications = [
  {
    icon: '🌐',
    title: '网络爬虫',
    description: '避免重复爬取已访问的URL',
    example: 'Google爬虫使用布隆过滤器记录已爬取的URL'
  },
  {
    icon: '💾',
    title: '数据库系统',
    description: '减少不必要的磁盘查询',
    example: 'Cassandra、HBase使用布隆过滤器判断键是否存在'
  },
  {
    icon: '🛡️',
    title: '安全防护',
    description: '检测恶意URL或垃圾邮件',
    example: 'Chrome浏览器使用布隆过滤器检测恶意网站'
  },
  {
    icon: '🔍',
    title: '缓存系统',
    description: '避免缓存穿透问题',
    example: 'Redis布隆过滤器插件用于缓存校验'
  },
  {
    icon: '📱',
    title: '推荐系统',
    description: '快速过滤已展示内容',
    example: '新闻APP过滤已读新闻'
  },
  {
    icon: '🔢',
    title: '分布式系统',
    description: '减少节点间通信',
    example: 'BitTorrent使用布隆过滤器同步peer信息'
  }
];

// 数据结构对比
const comparisonData = [
  { property: '空间效率', bloom: '极高', hash: '中等', tree: '较低' },
  { property: '查询时间', bloom: 'O(k)', hash: 'O(1)', tree: 'O(log n)' },
  { property: '插入时间', bloom: 'O(k)', hash: 'O(1)', tree: 'O(log n)' },
  { property: '删除支持', bloom: '否', hash: '是', tree: '是' },
  { property: '内存占用', bloom: '极小', hash: '中等', tree: '较大' },
  { property: '误判可能', bloom: '是', hash: '否', tree: '否' }
];

// 布隆过滤器变种
const bloomVariants = [
  {
    name: '计数布隆过滤器',
    description: '支持删除操作的改进版本',
    pros: '支持删除操作，功能更完整',
    cons: '空间占用增加，实现更复杂'
  },
  {
    name: '阻塞布隆过滤器',
    description: '减少误判率的变种',
    pros: '误判率更低，性能更好',
    cons: '实现复杂，适用场景有限'
  },
  {
    name: '可扩展布隆过滤器',
    description: '动态调整大小的版本',
    pros: '自动扩容，适应数据量变化',
    cons: '实现复杂，性能有损耗'
  }
];

// 布隆过滤器代码示例
const bloomFilterCode = `
class BloomFilter {
  private size: number;
  private hashCount: number;
  private bitArray: number[];

  constructor(expectedItems: number, falsePositiveRate: number) {
    this.size = Math.ceil(
      - (expectedItems * Math.log(falsePositiveRate)) /
      (Math.log(2) ** 2)
    );
    this.hashCount = Math.ceil(
      (this.size / expectedItems) * Math.log(2)
    );
    this.bitArray = new Array(this.size).fill(0);
  }

  // 添加元素
  add(item: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hash(item, i) % this.size;
      this.bitArray[position] = 1;
    }
  }

  // 检查元素
  mightContain(item: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hash(item, i) % this.size;
      if (this.bitArray[position] === 0) {
        return false; // 肯定不存在
      }
    }
    return true; // 可能存在
  }

  // 简单的哈希函数
  private hash(item: string, seed: number): number {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) - hash + item.charCodeAt(i) + seed;
      hash |= 0; // 转换为32位整数
    }
    return Math.abs(hash);
  }
}
`.trim();

// 计算参数
const calculatedM = computed(() => {
  const n = expectedElements.value;
  const p = acceptableError.value;
  return Math.ceil(- (n * Math.log(p)) / (Math.log(2) ** 2));
});

const calculatedK = computed(() => {
  const n = expectedElements.value;
  const m = calculatedM.value;
  return Math.ceil((m / n) * Math.log(2));
});

// 演示功能
const checkElement = () => {
  if (!demoInput.value.trim()) return;

  // 简单哈希函数模拟
  const hashPositions = [
    (demoInput.value.charCodeAt(0) || 0) % 20,
    (demoInput.value.length * 7) % 20,
    (demoInput.value.split('').reduce((a, b) => a + b.charCodeAt(0), 0) * 13) % 20
  ];

  checkedBits.value = hashPositions;

  // 检查是否所有位都是1（模拟存在情况）
  const allBitsSet = hashPositions.every(pos => demoBitArray.value[pos] === 1);

  // 模拟误判：如果输入包含"test"且不是我们预先设置的，就模拟误判
  if (demoInput.value.includes('test') && !['test1', 'test2', 'test3'].includes(demoInput.value)) {
    isFalsePositive.value = true;
    resultMessage.value = '元素可能存在（误判）';
  } else if (allBitsSet) {
    isFalsePositive.value = false;
    resultMessage.value = '元素可能存在';
  } else {
    isFalsePositive.value = false;
    resultMessage.value = '元素肯定不存在';
  }
};

// 比较表格的样式类
const getComparisonClass = (value: string, type: string) => {
  if (value === '极高' || value === 'O(k)' || value === '极小') return 'best';
  if (value === '是') return 'warning';
  return '';
};

// 滚动到指定章节
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动以更新活动章节
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

// 初始化演示位数组
onMounted(() => {
  // 设置一些初始数据
  ['apple', 'banana', 'cherry'].forEach(item => {
    const positions = [
      (item.charCodeAt(0)) % 20,
      (item.length * 7) % 20,
      (item.split('').reduce((a, b) => a + b.charCodeAt(0), 0) * 13) % 20
    ];
    positions.forEach(pos => {
      demoBitArray.value[pos] = 1;
    });
  });

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #4a6fa5;
@primary-light: #6b8cbc;
@primary-dark: #3a5680;
@secondary-color: #50a3a4;
@accent-color: #ff6b6b;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@card-bg: #fdfdfd;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
@shadow-hover: 0 8px 24px 0 rgba(0, 0, 0, 0.15);

// 基础样式
.bloom-filter-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @bg-color;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, @primary-color 0%, @primary-dark 100%);
  color: white;
  padding: 3rem 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .header-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.5rem;
    opacity: 0.9;
    margin: 0 0 3rem;
    font-weight: 400;
  }
}

// 可视化演示
.visual-demo {
  margin-top: 2rem;

  .bit-array {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;

    .bit {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
      opacity: 0;
      animation: fadeInUp 0.5s ease forwards;

      &.active {
        background: rgba(255, 255, 255, 0.9);
        color: @primary-color;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }

  .hash-functions {
    display: flex;
    justify-content: center;
    gap: 2rem;

    .hash-function {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      opacity: 0.8;

      .hash-label {
        font-weight: 600;
      }

      .hash-arrow {
        font-size: 1.2rem;
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 内容布局
.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem;
}

// 导航侧边栏
.nav-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      &:hover {
        background-color: darken(@sidebar-bg, 2%);
        color: @primary-color;
      }

      &.active {
        background-color: white;
        color: @primary-color;
        border-left-color: @primary-color;
        font-weight: 600;
      }

      .nav-icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 880px;
}

// 内容区块
.content-section {
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: @shadow;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: @shadow-hover;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: @text-color;
  }

  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::marker {
        color: @primary-color;
      }
    }
  }
}

// 特性卡片
.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .feature-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    text-align: center;
    border-top: 3px solid @primary-color;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 0;
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

// 特点对比
.characteristics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  .characteristic {
    padding: 1.5rem;
    border-radius: 8px;

    &.positive {
      background: lighten(@secondary-color, 45%);
      border-left: 4px solid @secondary-color;
    }

    &.negative {
      background: lighten(@accent-color, 40%);
      border-left: 4px solid @accent-color;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    ul {
      padding-left: 0;
      list-style: none;

      li {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: inherit;
          font-size: 1.2rem;
        }

        strong {
          display: block;
          margin-bottom: 0.25rem;
          color: @text-color;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.9rem;
        }
      }
    }
  }
}

// 误判率图表
.false-positive-demo {
  margin-top: 2.5rem;

  .false-positive-chart {
    margin: 1.5rem 0;

    .chart-container {
      display: flex;
      align-items: flex-end;
      height: 200px;
      gap: 1rem;
      padding: 1rem;
      background: @sidebar-bg;
      border-radius: 8px;

      .chart-bar {
        flex: 1;
        background: linear-gradient(to top, @primary-light, @primary-color);
        border-radius: 4px 4px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 0.5rem;
        position: relative;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .bar-value {
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          font-size: 0.9rem;
        }

        .bar-label {
          position: absolute;
          bottom: -1.5rem;
          font-size: 0.8rem;
          color: @text-light;
          font-weight: 600;
        }
      }
    }
  }

  .chart-note {
    text-align: center;
    font-style: italic;
    color: @text-light;
    font-size: 0.9rem;
    margin: 1rem 0 0;
  }
}

// 工作流程步骤
.workflow-steps {
  margin: 2rem 0;

  .step {
    display: flex;
    margin-bottom: 2rem;
    align-items: flex-start;

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
      margin-right: 1.5rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .step-content {
      flex: 1;

      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: @primary-color;
      }

      .code-snippet {
        background: @sidebar-bg;
        border-radius: 6px;
        padding: 1rem;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
        margin-top: 0.75rem;
        border-left: 3px solid @primary-color;
      }
    }
  }
}

// 算法可视化
.algorithm-visualization {
  margin-top: 2.5rem;

  .visual-container {
    background: @card-bg;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .input-section {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;

      .demo-input {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 1px solid @border-color;
        border-radius: 6px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: @primary-color;
          box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.2);
        }
      }

      .demo-button {
        padding: 0.75rem 1.5rem;
        background: @primary-color;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: @primary-dark;
        }
      }
    }

    .visual-result {
      .bit-array-visual {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        justify-content: center;

        .visual-bit {
          width: 40px;
          height: 40px;
          border: 2px solid @border-color;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.3s ease;

          &.active {
            background: @secondary-color;
            color: white;
            border-color: @secondary-color;
          }

          &.checked {
            box-shadow: 0 0 0 3px @primary-color;
          }

          &.false-positive {
            background: @accent-color;
            border-color: @accent-color;
          }
        }
      }

      .result-message {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 600;
        padding: 1rem;
        border-radius: 6px;
        background: @sidebar-bg;
        margin-bottom: 1rem;

        &.false-positive {
          background: lighten(@accent-color, 40%);
          color: darken(@accent-color, 20%);
        }
      }

      .hash-positions {
        text-align: center;
        font-family: 'Fira Code', 'Consolas', monospace;
        color: @text-light;
      }
    }
  }
}

// 应用场景网格
.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .application-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .app-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 1rem;
      color: @text-color;
    }

    .app-example {
      padding: 0.75rem;
      background: @sidebar-bg;
      border-radius: 4px;
      font-size: 0.9rem;
      color: @text-light;
      border-left: 3px solid @secondary-color;
    }
  }
}

// 对比表格
.vs-traditional {
  margin-top: 2.5rem;

  .comparison-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .table-header, .table-row {
      display: table-row;
    }

    .table-cell {
      display: table-cell;
      padding: 1rem;
      border-bottom: 1px solid @border-color;
      vertical-align: middle;

      &:first-child {
        font-weight: 600;
        background: @sidebar-bg;
      }
    }

    .table-header {
      font-weight: 700;
      background: @primary-color;
      color: white;

      .table-cell {
        border-bottom: none;
      }
    }

    .property {
      width: 150px;
    }

    .best {
      color: @secondary-color;
      font-weight: 600;
    }

    .warning {
      color: @accent-color;
      font-weight: 600;
    }
  }
}

// 实现选项
.implementation-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  .impl-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    .formula {
      margin: 1.5rem 0;

      .formula-item {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;

        .formula-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: @text-color;
        }

        code {
          background: @sidebar-bg;
          padding: 0.75rem;
          border-radius: 4px;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.9rem;
          border-left: 3px solid @secondary-color;
        }
      }
    }

    .param-calculator {
      margin-top: 1.5rem;

      h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: @primary-color;
      }

      .calculator-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .input-group {
          display: flex;
          flex-direction: column;

          label {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: @text-color;
          }

          input {
            padding: 0.5rem;
            border: 1px solid @border-color;
            border-radius: 4px;

            &:focus {
              outline: none;
              border-color: @primary-color;
            }
          }
        }
      }

      .calculator-results {
        .result-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px dashed @border-color;

          &:last-child {
            border-bottom: none;
          }

          strong {
            color: @primary-color;
          }
        }
      }
    }

    .code-example {
      margin-top: 1.5rem;

      pre {
        background: @sidebar-bg;
        border-radius: 6px;
        padding: 1.25rem;
        overflow-x: auto;
        border: 1px solid @border-color;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.85rem;
          color: @text-color;
          line-height: 1.5;
        }
      }
    }
  }
}

// 变种卡片
.variants {
  margin-top: 2.5rem;

  .variant-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .variant-card {
      padding: 1.5rem;
      background: @card-bg;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-top: 3px solid @secondary-color;

      h4 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: @primary-color;
      }

      p {
        margin-bottom: 1rem;
        color: @text-color;
      }

      .variant-pros-cons {
        .pros, .cons {
          margin-bottom: 0.75rem;
          font-size: 0.9rem;

          strong {
            color: @text-color;
          }
        }

        .pros {
          color: @secondary-color;
        }

        .cons {
          color: @accent-color;
        }
      }
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2.5rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;

  p {
    margin: 0.5rem 0;
  }

  .footer-note {
    font-size: 0.9rem;
    opacity: 0.7;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    margin-bottom: 1.5rem;
    position: static;

    .nav-list {
      display: flex;
      overflow-x: auto;

      li {
        flex-shrink: 0;
        border-left: none;
        border-bottom: 3px solid transparent;

        &.active {
          border-left: none;
          border-bottom-color: @primary-color;
        }
      }
    }
  }

  .characteristics,
  .implementation-options {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem 3rem;

    .title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .feature-cards,
  .application-grid,
  .variant-cards {
    grid-template-columns: 1fr;
  }

  .calculator-inputs {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    overflow-x: auto;

    .table-cell {
      min-width: 120px;
    }
  }
}
</style>
