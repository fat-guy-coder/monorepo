<template>
  <div class="string-algorithms-container">
    <div class="header">
      <h1>JavaScript 字符串算法合集</h1>
      <p class="subtitle">常见字符串处理问题与高效解决方案</p>
    </div>

    <ScrollNav :list="navList" scroll-to="start"  show-back-to-top/>

    <div class="types-container">
      <div
        class="type-tag"
        @click="selectType('全部')"
        :class="{ active: activeType.length === 0 }"
      >
        全部
      </div>
      <div
        v-for="(type, typeIndex) in types"
        :key="typeIndex"
        class="type-tag"
        @click="selectType(type)"
        :class="{ active: activeType.includes(type) }"
      >
        {{ type }}
      </div>
    </div>

    <div class="algorithms-grid">
      <div
        v-for="(algorithm, index) in filteredAlgorithms"
        :key="index"
        class="algorithm-card"
        :class="{ expanded: expandedCard === index }"
        :id="algorithm.id"
      >
        <h2 class="card-header">{{ algorithm.title }}</h2>
        <div class="card-difficulty">
          {{ algorithm.difficulty }}
        </div>

        <div class="card-content">
          <div class="type-section">
            <h3>类型</h3>
            <div v-for="(type, typeIndex) in algorithm.type" :key="typeIndex" class="type-tag">
              {{ type }}
            </div>
          </div>

          <div class="problem-statement">
            <h3>问题描述</h3>
            <p>{{ algorithm.problem }}</p>
          </div>

          <div class="principle-section">
            <h3>实现原理</h3>
            <p>{{ algorithm.principle }}</p>
          </div>

          <div class="solution-section">
            <h3>实现思路</h3>
            <ul>
              <li v-for="(step, stepIndex) in algorithm.approach" :key="stepIndex">{{ step }}</li>
            </ul>
          </div>

          <div class="complexity-section">
            <h3>时间复杂度:{{ algorithm.complexity }}</h3>
            <h3>空间复杂度:{{ algorithm.spaceComplexity }}</h3>
          </div>

          <div class="code-section">
            <h3>JavaScript 实现</h3>
            <pre><code>{{ algorithm.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ScrollNav from '@/components/ScrollNav.vue'

// 当前展开的卡片索引
const expandedCard = ref(0)

interface Algorithm {
  title: string
  id: string
  problem: string
  approach: string[]
  code: string
  input: string
  inputPlaceholder: string
  result: string
  complexity: string
  spaceComplexity: string
  type: string[]
  principle: string
  difficulty: string
}

const types = [
  '遍历',
  '匹配',
  '子串',
  '回文',
  '动态规划',
  '数学',
  '边界条件处理',
  '转换',
  '统计',
  '哈希表',
  '栈',
  '前缀',
  '剪枝',
  '滑动窗口',
]

const activeType = ref<string[]>([])

// 算法数据
const algorithms = ref<Algorithm[]>([])

const filteredAlgorithms = computed(() => {
  return algorithms.value.filter((item) => {
    return activeType.value.every((type) => item.type.includes(type))
  })
})

const navList = computed(() => {
  return algorithms.value.map((item) => {
    return {
      name: item.title,
      id: item.id,
    }
  })
})

const selectType = (type: string) => {
  if (type === '全部') {
    activeType.value = []
    return
  }
  if (activeType.value.includes(type)) {
    activeType.value = activeType.value.filter((t) => t !== type)
  } else {
    activeType.value.push(type)
  }
}

onMounted(async () => {
  const res = await import('../../../../JSON/StringAdvancedAlgorithm.json')
  algorithms.value = res.default as Algorithm[]
})
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@success-color: #4ade80;
@warning-color: #facc15;
@danger-color: #f87171;
@light-bg: #f8fafc;
@card-bg: #ffffff;
@text-color: #334155;
@border-color: #e2e8f0;
@code-bg: #2d3748;
@shadow:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);

.string-algorithms-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: @text-color;
  background-color: @light-bg;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.types-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.type-tag {
  background: rgb(209, 209, 209);
  color: @primary-color;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: @primary-color;
    color: white;
  }

  &.active {
    background: @primary-color;
    color: white;
  }
}
.algorithms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.algorithm-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: @shadow;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;

  .card-difficulty {
    position: absolute;
    top: 10px;
    right: 10px;
    background: @primary-color;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
  }

  &.expanded {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-4px);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, lighten(@primary-color, 5%), lighten(@secondary-color, 5%));
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .card-icon {
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
  }
}

.card-content {
  padding: 24px;
}

.type-section {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: @secondary-color;
  }

  .type-tag {
    background: @primary-color;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
  }
}

.problem-statement,
.solution-section,
.code-section,
.demo-section,
.principle-section {
  margin-bottom: 24px;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: @secondary-color;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid @border-color;
  }
}

.problem-statement p {
  line-height: 1.7;
  color: lighten(@text-color, 10%);
}

.solution-section ul {
  padding-left: 20px;
  margin-top: 8px;

  li {
    margin-bottom: 10px;
    line-height: 1.5;
    position: relative;
    padding-left: 20px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 8px;
      height: 8px;
      background: @primary-color;
      border-radius: 50%;
    }
  }
}

.code-section pre {
  background: @code-bg;
  border-radius: 8px;
  padding: 18px;
  overflow-x: auto;
  color: #e2e8f0;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;

  code {
    display: block;
  }
}

.demo-controls {
  display: flex;
  margin-bottom: 12px;

  input {
    flex-grow: 1;
    padding: 10px 14px;
    border: 1px solid @border-color;
    border-radius: 6px 0 0 6px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: @primary-color;
      box-shadow: 0 0 0 3px fade(@primary-color, 20%);
    }
  }

  button {
    background: @primary-color;
    color: white;
    border: none;
    border-radius: 0 6px 6px 0;
    padding: 0 20px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: darken(@primary-color, 8%);
    }
  }
}

.demo-result {
  padding: 12px 16px;
  background: lighten(@success-color, 40%);
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 1rem;
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    h1 {
      font-size: 2rem;
    }
  }

  .algorithms-grid {
    grid-template-columns: 1fr;
  }

  .card-header h2 {
    font-size: 1.1rem;
  }

  .card-content {
    padding: 18px;
  }
}
</style>
