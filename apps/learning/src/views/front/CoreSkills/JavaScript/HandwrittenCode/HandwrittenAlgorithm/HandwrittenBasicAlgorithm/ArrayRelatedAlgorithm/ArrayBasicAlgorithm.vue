<template>
  <div class="array-algorithms-container">
    <!-- 标题区域 -->
    <header class="header-section">
      <h1 class="title">数组基本算法</h1>
    </header>

    <ScrollNav :list="filteredAlgorithms" :keyMap="{ title: 'title' }" />

    <div class="search-section">
      <Input type="text" v-model:value="search" allow-clear @change="handleSearch" placeholder="搜索算法" />
    </div>

    <!-- 算法导航 -->
    <section class="algorithm-nav">
      <div v-for="(category, index) in categories" :key="index"
        :class="['nav-item', { active: activeCategory === category.id }]" @click="handleCategoryClick(category.id)">
        <div class="category-icon">{{ category.icon }}</div>
        <div class="category-name">{{ category.name }}</div>
      </div>
    </section>

    <!-- 算法列表 -->
    <section class="algorithm-list">
      <div v-for="(algo, index) in filteredAlgorithms" :key="index" :id="algo.id" class="algorithm-card">
        <div class="card-header">
          <div class="algo-icon">{{ algo.icon }}</div>
          <div class="algo-title">
            <h3>
              {{ algo.title }}
            </h3>
            <h4>
              难度
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= algo.difficulty }">
                ★
              </span>
            </h4>
            <div class="algo-desc">{{ algo.description }}</div>
          </div>
          <div class="complexity">
            <div class="time">时间: {{ algo.timeComplexity }}</div>
            <div class="space">空间: {{ algo.spaceComplexity }}</div>
          </div>
        </div>

        <div class="thinking-section">
          <div class="thinking">
            <h4>思路:{{ algo.thinking }}</h4>
          </div>
          <div class="steps" v-if="algo.steps && algo.steps.length > 0">
            <h4>步骤</h4>
            <ul>
              <li v-for="(item, index) in algo.steps" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="card-content">
          <div class="implementation">
            <h4>实现代码</h4>
            <pre><code>{{ algo.code }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="summary-section">
      <h2 class="section-title">数组算法总结</h2>
      <div class="summary-content">
        <div class="summary-item">
          <h3>取值</h3>
          <ul>
            <li>多利用reduce方法和变量存储</li>
            <li>普通for循环也可以</li>
          </ul>
        </div>
        <div class="summary-item">
          <h3>集合操作</h3>
          <ul>
            <li>多利用set去重</li>
            <li>再利用filter过滤</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Input } from 'components'
import ScrollNav from 'components/Nav/ScrollNav.vue'
import { debounce } from '@/function/common'

// 算法分类
const categories = ref([
  { id: 'all', name: '全部算法', icon: '📚' },
  { id: 'getValue', name: '取值', icon: '🔢' },
  { id: 'traversal', name: '遍历', icon: '🔄' },
  { id: 'search', name: '查找', icon: '🔍' },
  { id: 'math', name: '数学', icon: '🔢' },
  { id: 'set', name: '集合操作', icon: '🧮' },
  { id: 'group', name: '分组', icon: '👥' },
  { id: 'count', name: '统计', icon: '📊' },
  { id: 'transform', name: '变换', icon: '🔀' },
  { id: 'creation', name: '生成', icon: '🎨' },
])

const activeCategory = ref('all')

interface Algorithm {
  id: string
  title: string
  description: string
  difficulty: number
  icon: string
  category: string
  timeComplexity: string
  spaceComplexity: string
  code: string
  thinking: string
  steps: string[]
}

// 算法数据
const algorithms = ref<Algorithm[]>([])
const search = ref('')

onMounted(async () => {
  const res = await import('@/views/CoreSkills/JavaScript/JSON/ArrayBasicAlgorithm.json')
  algorithms.value = res.default as unknown as Algorithm[]
})

// 过滤算法
const filteredAlgorithms = computed(() => {
  if (activeCategory.value === 'all' && !search.value) return algorithms.value
  if (activeCategory.value === 'all' && search.value) {
    return algorithms.value.filter((algo) =>
      algo.title.toLowerCase().includes(search.value.toLowerCase()),
    )
  }
  return algorithms.value.filter(
    (algo) =>
      algo.category === activeCategory.value &&
      algo.title.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const handleCategoryClick = (id: string) => {
  activeCategory.value = id
  if (id === 'all') {
    search.value = ''
  }
}

const handleSearch = debounce(() => {
  activeCategory.value = filteredAlgorithms.value?.[0]?.category || 'all'
}, 500)
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

.search-section {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  width: 30rem;
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

      .category-icon,
      .category-name {
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
  grid-template-columns: repeat(2, 1fr);
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

      .star {
        font-size: 1.2rem;
        margin-left: 0.5rem;

        &.filled {
          color: @secondary-color;
        }
      }

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
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid @border-color;

      .time,
      .space {
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

    .implementation,
    .demo {
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

  .thinking-section {
    padding: 1.5rem;
    padding-bottom: 0;

    .steps {
      display: flex;
      gap: 1rem;

      ul {
        list-style: none;
        flex: 1;
        padding: 0;
        margin: 0;
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

  .array-container,
  .result-array,
  .flat-array {
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
