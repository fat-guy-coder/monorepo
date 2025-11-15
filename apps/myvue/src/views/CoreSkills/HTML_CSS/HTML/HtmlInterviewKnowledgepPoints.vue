<template>
  <div class="html-interview-knowledge">
    <header class="page-header">
      <h1 class="title">HTML面试知识点大全</h1>
      <p class="subtitle">前端开发必备HTML核心知识点整理</p>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="category in categories"
            :key="category.id"
            :class="{ active: activeCategory === category.id }"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
            <span class="count">{{ getCategoryCount(category.id) }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 高频考点 -->
        <section   v-if="activeCategory === 'high-frequency'" class="knowledge-section">
          <h2>高频考点</h2>
          <div class="knowledge-list">
            <div v-for="item in data?.highFrequency" :key="item.id" class="knowledge-item">
              <h3><a @click="goToByRouteName(item.route)">{{ item.title }}</a></h3>
              <h3 class="knowledge-item-meta">
                <span
                  >重要性：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }"
                    >★</span
                  ></span
                >
                <span
                  >使用频率：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.frequency }"
                    >★</span
                  ></span
                >
              </h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 语义化标签 -->
        <section v-if="activeCategory === 'semantic'" class="knowledge-section">
          <h2>语义化标签</h2>
          <div class="knowledge-list">
            <div v-for="item in data?.semantic" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <h3 class="knowledge-item-meta">
                <span
                  >重要性：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }"
                    >★</span
                  ></span
                >
                <span
                  >使用频率：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.frequency }"
                    >★</span
                  ></span
                >
              </h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 表单与输入 -->
        <section v-if="activeCategory === 'form'" class="knowledge-section">
          <h2>表单与输入</h2>
          <div class="knowledge-list">
            <div v-for="item in data?.form" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <h3 class="knowledge-item-meta">
                <span
                  >重要性：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }"
                    >★</span
                  ></span
                >
                <span
                  >使用频率：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.frequency }"
                    >★</span
                  ></span
                >
              </h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 媒体元素 -->
        <section v-if="activeCategory === 'media'" class="knowledge-section">
          <h2>媒体元素</h2>
          <div class="knowledge-list">
            <div v-for="item in data?.media" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <h3 class="knowledge-item-meta">
                <span
                  >重要性：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }"
                    >★</span
                  ></span
                >
                <span
                  >使用频率：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.frequency }"
                    >★</span
                  ></span
                >
              </h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 性能优化 -->
        <section v-if="activeCategory === 'performance'" class="knowledge-section">
          <h2>性能优化</h2>
          <div class="knowledge-list">
            <div v-for="item in data?.performance" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <h3 class="knowledge-item-meta">
                <span
                  >重要性：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }"
                    >★</span
                  ></span
                >
                <span
                  >使用频率：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.frequency }"
                    >★</span
                  ></span
                >
              </h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 存储相关 -->
        <section v-if="activeCategory === 'storage'" class="knowledge-section">
          <h2>存储相关</h2>
          <div class="knowledge-list">
            <div v-for="item in data?.storage" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <h3 class="knowledge-item-meta">
                <span
                  >重要性：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }"
                    >★</span
                  ></span
                >
                <span
                  >使用频率：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.frequency }"
                    >★</span
                  ></span
                >
              </h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 其他重要知识点 -->
        <section v-if="activeCategory === 'other'" class="knowledge-section">
          <h2>其他重要知识点</h2>
          <div class="knowledge-list">
            <div v-for="item in data?.other" :key="item.id" class="knowledge-item">
              <h3>{{ item.title }}</h3>
              <h3 class="knowledge-item-meta">
                <span
                  >重要性：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }"
                    >★</span
                  ></span
                >
                <span
                  >使用频率：
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.frequency }"
                    >★</span
                  ></span
                >
              </h3>
              <p>{{ item.content }}</p>
              <div class="example" v-if="item.example">
                <strong>示例：</strong>
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>HTML知识点总结 - 持续更新</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 响应式数据
const activeCategory = ref('high-frequency')

// 分类数据
const categories = [
  { id: 'high-frequency', name: '高频考点' },
  { id: 'semantic', name: '语义化标签' },
  { id: 'form', name: '表单与输入' },
  { id: 'media', name: '媒体元素' },
  { id: 'performance', name: '性能优化' },
  { id: 'storage', name: '存储相关' },
  { id: 'other', name: '其他重要知识点' },
]

interface KnowledgeItem {
  id: number
  title: string
  content: string
  example: string
  importance: number
  frequency: number
  route: string
}

const data = ref<{
  highFrequency: KnowledgeItem[]
  semantic: KnowledgeItem[]
  form: KnowledgeItem[]
  media: KnowledgeItem[]
  performance: KnowledgeItem[]
  storage: KnowledgeItem[]
  other: KnowledgeItem[]
}>()

onMounted(async () => {
  const list = await import('./JSON/HtmlKnowledgepPoints.json')
  data.value = list.default as any
})

// 计算每个分类的项目数量
const getCategoryCount = (categoryId: string) => {
  const counts: { [key: string]: number } = {
    'high-frequency': data.value?.highFrequency?.length || 0,
    semantic: data.value?.semantic?.length || 0,
    form: data.value?.form?.length || 0,
    media: data.value?.media?.length || 0,
    performance: data.value?.performance?.length || 0,
    storage: data.value?.storage?.length || 0,
    other: data.value?.other?.length || 0,
  }
  return counts[categoryId] || 0
}

const emit = defineEmits(['goToByRouteName'])

const goToByRouteName = (route: string) => {
  emit('goToByRouteName', route)
}
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #4a6fa5;
@warning-color: #FF9800;
@primary-light: #6b8cbc;
@primary-dark: #3a5680;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@card-bg: #fdfdfd;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

// 基础样式
.html-interview-knowledge {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    sans-serif;
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
  padding: 2rem 1rem;
  text-align: center;
  margin-bottom: 2rem;

  .title {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
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
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 1rem 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

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

      .count {
        background: @primary-color;
        color: white;
        border-radius: 12px;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 880px;
}

// 知识点区块
.knowledge-section {
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }
}

// 知识点列表
.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// 知识点项
.knowledge-item {
  padding: 1.5rem;
  background: @card-bg;
  border-radius: 8px;
  box-shadow: @shadow;
  border-left: 4px solid @primary-color;

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    margin-bottom: 1rem;
    color: @text-color;
  }

  .knowledge-item-meta {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .example {
    margin-top: 1rem;

    strong {
      display: block;
      margin-bottom: 0.5rem;
      color: @text-light;
    }

    pre {
      background: @sidebar-bg;
      border-radius: 4px;
      padding: 1rem;
      overflow-x: auto;
      margin: 0;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.9rem;
        color: @text-color;
      }
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;
  font-size: 0.9rem;
}

// 响应式设计
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
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

  .page-header {
    padding: 1.5rem 1rem;

    .title {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .knowledge-item {
    padding: 1rem;
  }
}

.filled {
  color: @warning-color;
}

</style>
