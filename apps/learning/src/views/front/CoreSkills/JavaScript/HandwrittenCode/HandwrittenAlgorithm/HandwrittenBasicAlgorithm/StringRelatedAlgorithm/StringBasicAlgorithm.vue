<template>
  <div class="string-algorithms-container">
    <header class="header">
      <h1>JavaScript 字符串基础算法</h1>
      <p class="subtitle">常用字符串处理算法原理与实现</p>
    </header>
    <ScrollNav :list="algorithms" :key-map="{ title: 'title' }" />
    <div class="search-box">
      <input v-model="searchQuery" type="text" placeholder="搜索算法..." class="search-input" />
      <span class="search-icon">🔍</span>
    </div>
    <div class="type-box">
      <button v-for="type in types" :key="type" class="type-item" :class="type === activeType ? 'active' : ''"
        @click="handleTypeClick(type)">
        {{ type }}
      </button>
    </div>

    <div class="algorithm-grid" v-show="activeType !== '总结'">
      <div v-for="algorithm in filteredAlgorithms" :key="algorithm.id" :id="algorithm.id" class="algorithm-card">
        <div class="card-header">
          <div class="algorithm-icon">{{ algorithm.icon }}</div>
          <h2 class="algorithm-title">{{ algorithm.title }}</h2>
        </div>

        <div class="algorithm-details">
          <div class="algorithm-type">
            <span>类型:</span>
            <span v-for="type in algorithm.type" :key="type" class="algorithm-type-item">
              {{ type }}
            </span>
          </div>
          <div class="algorithm-difficulty">
            <span>难度: {{ algorithm.difficulty }}</span>
          </div>
          <div class="algorithm-description">
            {{ algorithm.description }}
          </div>

          <div class="algorithm-steps">
            <h3>实现思路:</h3>
            <ol>
              <li v-for="(step, index) in algorithm.steps" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>

          <div class="algorithm-code">
            <h3>实现代码:</h3>
            <pre><code>{{ algorithm.code }}</code></pre>
          </div>

          <div class="algorithm-complexity">
            <span class="time">时间复杂度: {{ algorithm.timeComplexity }}</span>
            <span class="space">空间复杂度: {{ algorithm.spaceComplexity }}</span>
          </div>
          <h3 v-if="algorithm.solution">
            其他实现
            <a @click="handleShowMore(algorithm)">{{ algorithm.showMore ? '收起' : '查看' }}</a>
          </h3>
          <div class="other-solution" v-show="algorithm.showMore && algorithm.solution.length > 0">
            <div v-for="solution in algorithm.solution" :key="solution.index" class="other-solution-item">
              <h3>{{ solution.index }}.{{ solution.title }}</h3>
              <p>{{ solution.description }}</p>
              <div class="algorithm-code">
                <pre class="algorithm-code"><code>{{ solution.code }}</code></pre>
              </div>
              <div class="algorithm-complexity">
                <span class="time">时间复杂度: {{ solution.timeComplexity }}</span>
                <span class="space">空间复杂度: {{ solution.spaceComplexity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 字符串算法总结Section -->
    <div class="summary-section">
      <h2 class="summary-title">📚 字符串算法处理手法总结</h2>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-icon">🔍</span>
            <h3>查找类算法</h3>
          </div>
          <div class="summary-content">
            <p><strong>核心思路：</strong>在字符串中定位特定元素或模式</p>
            <ul>
              <li><strong>字符查找：</strong>遍历 + 条件判断</li>
              <li><strong>模式匹配：</strong>双指针、滑动窗口、动态规划</li>
              <li><strong>子串查找：</strong>KMP、Boyer-Moore、Rabin-Karp</li>
              <li><strong>变位词检测：</strong>字符计数 + Map/Set</li>
            </ul>
            <div class="technique-tags">
              <span class="tag">Map</span>
              <span class="tag">Set</span>
              <span class="tag">双指针</span>
              <span class="tag">动态规划</span>
            </div>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-icon">📊</span>
            <h3>统计类算法</h3>
          </div>
          <div class="summary-content">
            <p><strong>核心思路：</strong>统计字符串中元素出现的频率或特征</p>
            <ul>
              <li><strong>字符计数：</strong>Map/Set + 遍历统计</li>
              <li><strong>单词频率：</strong>分词 + Map统计</li>
              <li><strong>回文检测：</strong>双指针 + 字符比较</li>
              <li><strong>括号匹配：</strong>栈 + 配对检查</li>
            </ul>
            <div class="technique-tags">
              <span class="tag">Map</span>
              <span class="tag">Set</span>
              <span class="tag">栈</span>
              <span class="tag">双指针</span>
            </div>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-icon">🔄</span>
            <h3>变换类算法</h3>
          </div>
          <div class="summary-content">
            <p><strong>核心思路：</strong>改变字符串的结构或内容</p>
            <ul>
              <li><strong>字符反转：</strong>数组操作 + join</li>
              <li><strong>大小写转换：</strong>字符映射 + 遍历</li>
              <li><strong>字符串压缩：</strong>计数 + 字符重组</li>
              <li><strong>编码解码：</strong>模式识别 + 字符替换</li>
            </ul>
            <div class="technique-tags">
              <span class="tag">数组操作</span>
              <span class="tag">字符映射</span>
              <span class="tag">计数</span>
              <span class="tag">正则表达式</span>
            </div>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-icon">✂️</span>
            <h3>截取类算法</h3>
          </div>
          <div class="summary-content">
            <p><strong>核心思路：</strong>提取或分割字符串的特定部分</p>
            <ul>
              <li><strong>字符串截断：</strong>长度判断 + slice</li>
              <li><strong>去重处理：</strong>Set + 顺序保持</li>
              <li><strong>单词分割：</strong>正则表达式 + split</li>
              <li><strong>公共前缀：</strong>逐字符比较 + 前缀累积</li>
            </ul>
            <div class="technique-tags">
              <span class="tag">Set</span>
              <span class="tag">slice</span>
              <span class="tag">正则表达式</span>
              <span class="tag">逐字符比较</span>
            </div>
          </div>
        </div>
      </div>

      <div class="common-patterns">
        <h3>🎯 常用处理模式</h3>
        <div class="patterns-grid">
          <div class="pattern-item">
            <h4>Map/Set 模式</h4>
            <p>用于字符计数、去重、快速查找</p>
            <code>const charMap = new Map(); charMap.set(char, count);</code>
          </div>
          <div class="pattern-item">
            <h4>双指针模式</h4>
            <p>用于回文检测、字符串比较</p>
            <code>let left = 0, right = str.length - 1;</code>
          </div>
          <div class="pattern-item">
            <h4>栈模式</h4>
            <p>用于括号匹配、表达式解析</p>
            <code>const stack = []; stack.push(char);</code>
          </div>
          <div class="pattern-item">
            <h4>动态规划</h4>
            <p>用于编辑距离、模式匹配</p>
            <code>const dp = Array(m+1).fill().map(() => Array(n+1).fill(0));</code>
          </div>
        </div>
      </div>

      <div class="complexity-guide">
        <h3>⚡ 复杂度选择指南</h3>
        <div class="complexity-grid">
          <div class="complexity-item">
            <h4>O(n) - 线性时间</h4>
            <p>单次遍历、字符计数、简单变换</p>
          </div>
          <div class="complexity-item">
            <h4>O(n²) - 平方时间</h4>
            <p>嵌套遍历、字符串比较、简单模式匹配</p>
          </div>
          <div class="complexity-item">
            <h4>O(mn) - 动态规划</h4>
            <p>编辑距离、复杂模式匹配</p>
          </div>
          <div class="complexity-item">
            <h4>O(n!) - 排列组合</h4>
            <p>全排列生成、组合问题</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p> JavaScript 算法精选 | 共 {{ filteredAlgorithms.length }} 个算法</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ScrollNav from 'components/Nav/ScrollNav.vue'
// import { EncodeAndDecode } from './demo.ts'

interface Algorithm {
  id: string
  title: string
  description: string
  icon: string
  steps: string[]
  code: string
  timeComplexity: string
  spaceComplexity: string
}

const searchQuery = ref('')

interface Algorithm {
  id: string
  title: string
  description: string
  difficulty: string
  type: string[]
  icon: string
  steps: string[]
  code: string
  timeComplexity: string
  spaceComplexity: string
  solution: {
    index: number
    title: string
    description: string
    code: string
    timeComplexity: string
    spaceComplexity: string
  }[]
  showMore: boolean
}

const handleShowMore = (algorithm: Algorithm) => {
  algorithm.showMore = !algorithm.showMore
}

const algorithms = ref<Algorithm[]>([])

const activeType = ref<string>('全部')

const types = ref<string[]>(['全部', '变换', '统计', '查找', '截取', '总结'])

const handleTypeClick = (type: string) => {
  activeType.value = type
  searchQuery.value = ''
}

onMounted(async () => {
  const res = await import('../../../../JSON/StringBasicAlgorithm.json')
  algorithms.value = res.default as Algorithm[]
})

const filteredAlgorithms = computed(() => {
  if (!searchQuery.value && activeType.value === '全部') return algorithms.value

  const query = searchQuery.value.toLowerCase()
  return algorithms.value.filter(
    (algo) =>
      (algo.title.toLowerCase().includes(query) ||
        algo.description.toLowerCase().includes(query) ||
        algo.steps.some((step: string) => step.toLowerCase().includes(query))) &&
      algo.type.includes(activeType.value),
  )
})
// const encode = new EncodeAndDecode("Generate a single Vue page component file (ts+less+scope+setup) that introduces JS functors and Monad. Provide a detailed introduction to functors and Monad (concepts, functions, examples, how to implement Monad, usage scenarios). Light colored theme, compact and beautiful layout style (put a lot of effort into the style). It's a Vue file, not an HTML file.")
// console.log(encode)
</script>

<style lang="less" scoped>
.string-algorithms-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
  color: #2d3748;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  border-radius: 16px;
  background: linear-gradient(120deg, #4c6ef5, #228be6);
  color: white;
  box-shadow: 0 10px 20px rgba(66, 153, 225, 0.15);

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.type-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;

  .type-item {
    color: #000;
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background-color: #4c6ef5;
      color: white;
    }
  }
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto 40px;

  .search-input {
    width: 100%;
    padding: 16px 20px 16px 50px;
    font-size: 1.1rem;
    border: none;
    border-radius: 50px;
    background: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 5px 20px rgba(66, 153, 225, 0.3);
    }
  }

  .search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #4c6ef5;
  }
}

/* 总结Section样式 */
.summary-section {
  margin-bottom: 50px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

.summary-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #2d3748;
  background: linear-gradient(120deg, #4c6ef5, #228be6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.summary-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

.summary-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .summary-icon {
    font-size: 1.5rem;
    margin-right: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
    color: #2d3748;
  }
}

.summary-content {
  p {
    font-size: 0.95rem;
    color: #4a5568;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 15px;

    li {
      font-size: 0.9rem;
      color: #4a5568;
      margin-bottom: 6px;
      line-height: 1.4;
    }
  }
}

.technique-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  .tag {
    background: linear-gradient(120deg, #4c6ef5, #228be6);
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
  }
}

.common-patterns {
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #2d3748;
    text-align: center;
  }
}

.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.pattern-item {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 18px;
  border-left: 4px solid #4c6ef5;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #2d3748;
  }

  p {
    font-size: 0.9rem;
    color: #4a5568;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  code {
    background: #1e293b;
    color: #f8fafc;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-family: 'Fira Code', monospace;
    display: block;
    overflow-x: auto;
  }
}

.complexity-guide {
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #2d3748;
    text-align: center;
  }
}

.complexity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.complexity-item {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  border: 1px solid #90caf9;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #1565c0;
  }

  p {
    font-size: 0.85rem;
    color: #1976d2;
    line-height: 1.4;
  }
}

.algorithm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.algorithm-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(120deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid #e2e8f0;

  .algorithm-icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  .algorithm-title {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
    color: #2d3748;
  }
}

.algorithm-details {
  padding: 25px;

  .algorithm-type {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;

    .algorithm-type-item {
      margin-right: 10px;
      padding: 5px 10px;
      border-radius: 5px;
    }
  }

  .algorithm-difficulty {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
  }

  .algorithm-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid #edf2f7;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4c6ef5;
      margin-right: 10px;
    }
  }

  .algorithm-steps {
    margin-bottom: 25px;

    ol {
      padding-left: 25px;
      margin: 0;

      li {
        margin-bottom: 12px;
        line-height: 1.5;
        padding-left: 8px;

        &::marker {
          color: #4c6ef5;
          font-weight: 600;
        }
      }
    }
  }

  .algorithm-complexity {
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
    color: #4a5568;
    padding-top: 15px;

    .time::before {
      content: '⏱️ ';
    }

    .space::before {
      content: '💾 ';
    }
  }

  .other-solution {
    .other-solution-item {
      margin-bottom: 20px;
      border-top: 1px dashed #e2e8f0;
    }
  }
}

.algorithm-code {
  pre {
    background: #1e293b;
    color: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    overflow-x: auto;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 25px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #718096;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

@media (max-width: 1100px) {
  .algorithm-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

@media (max-width: 768px) {
  .algorithm-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2.2rem;
  }

  .card-header {
    flex-direction: column;
    text-align: center;

    .algorithm-icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
}

@media (max-width: 480px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .search-box {
    margin-bottom: 30px;
  }

  .algorithm-card {
    border-radius: 12px;
  }

  .algorithm-details {
    padding: 20px 15px;
  }

  .summary-section {
    padding: 20px 15px;
    margin-bottom: 30px;
  }

  .summary-title {
    font-size: 1.6rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .patterns-grid {
    grid-template-columns: 1fr;
  }

  .complexity-grid {
    grid-template-columns: 1fr;
  }

  .summary-card {
    padding: 15px;
  }

  .pattern-item {
    padding: 15px;
  }

  .complexity-item {
    padding: 12px;
  }
}
</style>
