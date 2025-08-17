<template>
  <div class="js-reference">
    <!-- 标题区域 -->
    <header class="header">
      <h1>Promise 场景实现</h1>
    </header>

    <ScrollNav :list="knowledgeData" show-child :key-map="{ title: 'title' }" scrollTo="start" />

    <!-- 控制区域 -->
    <div class="controls">
      <div class="search-box">
        <input type="text" v-model="searchTerm" placeholder="搜索知识点..." class="search-input" />
        <span class="search-icon">🔍</span>
      </div>

      <div class="category-filter">
        <button
          v-for="category in categories"
          :key="category"
          @click="toggleCategory(category)"
          :class="{ active: selectedCategories.includes(category) }"
          class="category-btn"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 知识点展示区域 -->
    <div class="knowledge-container">
      <div
        v-for="(category, catIndex) in filteredKnowledge"
        :key="catIndex"
        class="category-section"
        :id="category.id"
      >
        <h2 class="category-title">
          <span
            >{{ category.title }}
            <span :style="{ color: getDifficultyColor(category.difficulty) }"
              >难度:{{ category.difficulty }}</span
            ></span
          >
          <div class="stars">
            <span>重要程度:</span>
            <span v-for="n in 5" :key="n" :class="{ filled: n <= category.important }">★</span>
          </div>
        </h2>
        <h3 class="category-description">{{ category.description }}</h3>
        <div class="knowledge-grid">
          <div v-for="(item, index) in category.children" :key="index" class="knowledge-card">
            <div class="card-header" :id="item.id">
              <h3>{{ item.title }}</h3>
              <span class="difficulty" :style="{ color: getDifficultyColor(item.difficulty) }">{{
                item.difficulty
              }}</span>
              <div class="stars">
                <span>重要程度:</span>
                <span v-for="n in 5" :key="n" :class="{ filled: n <= item.important }">★</span>
              </div>
            </div>
            <p class="description">{{ item.description }}</p>
            <div class="steps">
              <p v-for="(i, index) in item.steps" :key="index">{{ i }}</p>
            </div>
            <div class="tags">
              <p v-for="(i, index) in item.tags" :key="index" class="tag">{{ i }}</p>
            </div>
            <CodeBlock :code="item.code" language="js" lineNumbers />
            <div class="tips" v-if="item.tips">
              <p>提示:{{ item.tips }}</p>
            </div>
            <div class="notice" v-if="item.notice">注意:{{ item.notice }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部信息    -->
    <footer class="footer">
      <p>共 {{ totalItems }} 个知识点 | 最后更新: {{ new Date().toLocaleDateString() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import ScrollNav from '@/components/ScrollNav.vue'

// 知识点类型定义
interface KnowledgeItem {
  title: string
  id: string
  description: string
  important: number
  tags: string[]
  steps: string[]
  difficulty: '简单' | '中等' | '较难'
  tips: string
  code: string
  notice?: string
}

interface KnowledgeCategory {
  title: string
  id: string
  description: string
  difficulty: '简单' | '中等' | '较难'
  important: number
  children: KnowledgeItem[]
}

// 知识点数据
const knowledgeData = ref<KnowledgeCategory[]>([])

onMounted(async () => {
  try {
    const res = await import('../../../JSON/PromiseScenarios.json')
    knowledgeData.value = res.default as unknown as KnowledgeCategory[]
  } catch (error) {
    console.log(error)
  }
})

const getDifficultyColor = (difficulty: '简单' | '中等' | '较难') => {
  if (difficulty === '简单') return '#06d6a0'
  if (difficulty === '中等') return '#ffd166'
  if (difficulty === '较难') return '#ef476f'
  return '#ddd'
}

// 可用分类
const categories = ref<string[]>([
  '全部',
  '并发处理',
  '串行处理',
  '超时处理',
  'promise封装请求',
  'async函数实现',
])

// 选中的分类
const selectedCategories = ref<string>('全部')

// 搜索词
const searchTerm = ref<string>('')

// 切换分类
const toggleCategory = (category: string) => {
  if (category === '全部') {
    selectedCategories.value = '全部'
    searchTerm.value = ''
    return
  }

  if (selectedCategories.value === category) {
    selectedCategories.value = '全部'
    // 如果移除了所有分类，自动选择"全部"
  } else {
    // 移除"全部"如果选择了具体分类
    selectedCategories.value = category
  }
}

// 过滤知识点
const filteredKnowledge = computed(() => {
  return knowledgeData.value
    .filter(
      (category) =>
        selectedCategories.value === '全部' || selectedCategories.value === category.title,
    )
    .map((category) => {
      if (!searchTerm.value) return category

      const filteredItems = category.children.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.value.toLowerCase()),
      )

      return { ...category, children: filteredItems }
    })
    .filter((category) => category.children.length > 0)
})

// 计算总知识点数量
const totalItems = computed(() => {
  return filteredKnowledge.value.reduce((total, category) => total + category.children.length, 0)
})
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@info-color: #118ab2;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.js-reference {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.5;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
    max-width: 700px;
    margin: 0 auto;
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;

  .search-box {
    position: relative;
    flex: 1;
    max-width: 500px;

    .search-input {
      width: 100%;
      padding: 12px 15px 12px 40px;
      border: 1px solid @border-color;
      border-radius: 30px;
      font-size: 1rem;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 2px 8px rgba(67, 97, 238, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }
  }

  .category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;

    .category-btn {
      padding: 8px 16px;
      background: white;
      border: 1px solid @border-color;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;

      &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        background-color: @primary-color;
        color: white;
        border-color: @primary-color;
      }
    }
  }
}

.stars {
  color: #ddd;
  font-size: 0.9rem;
  margin-left: 10px;

  .filled {
    color: @warning-color;
  }
}

.category-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  .category-title {
    color: @secondary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .difficulty {
      color: @warning-color;
    }
  }

  .category-description {
    color: @text-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);
  }
}

.knowledge-card {
  background: @light-bg;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 20px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  border: 1px solid @border-color;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    border-color: fade(@primary-color, 30%);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;

    h3 {
      font-size: 1.2rem;
      color: @secondary-color;
      flex: 1;
    }
  }

  .description {
    color: lighten(@text-color, 15%);
    font-size: 0.9rem;
    margin-bottom: 15px;
    flex: 1;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;

    gap: 6px;

    .tag {
      background: fade(@primary-color, 10%);
      color: @primary-color;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
    }
  }

  .steps {
    color: @primary-color;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

    p {
      margin-bottom: 5px;
    }
  }

  .tips {
    color: @warning-color;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .notice {
    color: #f0f0f0;
    background-color: @error-color;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}

.footer {
  text-align: center;
  padding: 30px 20px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;

    .search-box {
      max-width: 100%;
    }
  }

  .knowledge-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .category-filter {
    justify-content: flex-start;
  }

  .header {
    padding: 10px 0;

    h1 {
      font-size: 1.8rem;
    }
  }
}
</style>
