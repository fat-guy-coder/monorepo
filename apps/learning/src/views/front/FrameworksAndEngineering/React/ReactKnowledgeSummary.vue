<template>
  <div class="react-knowledge-container">
    <header class="header">
      <div class="logo">
        <span class="react-logo">⚛︎</span>
        <h1>React面试核心知识点</h1>
      </div>
      <p class="subtitle">全面涵盖React高频面试考点，提升面试竞争力</p>
    </header>

    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="搜索知识点..." class="search-input">
      <span class="search-count">显示 {{ filteredItems.length }}/{{ knowledgeItems.length }} 个知识点</span>
    </div>

    <main class="knowledge-grid">
      <Spin tip="Loading..." :spinning="loading">
      </Spin>
      <template v-if="!loading">
        <!-- React基础 -->
        <knowledge-section title="React基础核心" icon="📚"
          :items="filteredItems.filter(item => item.category === 'fundamentals')" />

        <!-- Hooks系统 -->
        <knowledge-section title="Hooks系统" icon="🎣" :items="filteredItems.filter(item => item.category === 'hooks')" />

        <!-- 组件设计 -->
        <knowledge-section title="组件设计" icon="🧩"
          :items="filteredItems.filter(item => item.category === 'components')" />

        <!-- 状态管理 -->
        <knowledge-section title="状态管理" icon="🔄" :items="filteredItems.filter(item => item.category === 'state')" />

        <!-- 性能优化 -->
        <knowledge-section title="性能优化" icon="⚡"
          :items="filteredItems.filter(item => item.category === 'performance')" />

        <!-- 路由管理 -->
        <knowledge-section title="路由管理" icon="🧭" :items="filteredItems.filter(item => item.category === 'routing')" />

        <!-- 高级特性 -->
        <knowledge-section title="高级特性" icon="🚀" :items="filteredItems.filter(item => item.category === 'advanced')" />

        <!-- 渲染机制 -->
        <knowledge-section title="渲染机制" icon="🔍"
          :items="filteredItems.filter(item => item.category === 'rendering')" />

        <!-- 测试与调试 -->
        <knowledge-section title="测试与调试" icon="🐞" :items="filteredItems.filter(item => item.category === 'testing')" />

      </template>
    </main>

    <footer class="footer">
      <p>React面试知识点总结 · {{ currentYear }}</p>
      <div class="resources">
        <span>官方文档：</span>
        <a href="https://reactjs.org/docs/getting-started.html" target="_blank">React Docs</a>
        <a href="https://beta.reactjs.org/" target="_blank">React Beta Docs</a>
        <a href="https://github.com/facebook/react" target="_blank">React Source</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Spin } from 'components';
import KnowledgeSection from './Components/KnowledgeSection.vue';

interface KnowledgeItem {
  id: number;
  title: string;
  description: string;
  category: string;
  importance: number; // 1-5 (5为最重要)
  keywords: string[];
}

const loading = ref(true);
const knowledgeItems = ref<KnowledgeItem[]>([]);

onMounted(async () => {
  const response = await import('../JSON/knowledgeItems.json');
  knowledgeItems.value = response.default as KnowledgeItem[];
  loading.value = false;
});




const searchQuery = ref('');

// 计算过滤后的知识点
const filteredItems = computed(() => {
  if (!searchQuery.value) return knowledgeItems.value;

  const query = searchQuery.value.toLowerCase();
  return knowledgeItems.value.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.keywords.some(kw => kw.toLowerCase().includes(query))
  );
});

// 当前年份
const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="less" scoped>
@primary: #61dafb;
@secondary: #282c34;
@text-primary: #2d3748;
@text-secondary: #718096;
@border: #e2e8f0;
@background: #f8fafc;
@card-bg: #ffffff;
@success: #48bb78;
@error: #e53e3e;

.react-knowledge-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-primary;
  background-color: @background;
  line-height: 1.5;
}

.header {
  text-align: center;
  margin: 20px 0 30px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .react-logo {
      font-size: 3rem;
      color: @primary;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-secondary;
    margin-top: 10px;
  }
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: @card-bg;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .search-input {
    flex-grow: 1;
    padding: 10px 15px;
    border: 1px solid @border;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: @primary;
      box-shadow: 0 0 0 3px fade(@primary, 20%);
    }
  }

  .search-count {
    font-size: 0.9rem;
    color: @text-secondary;
    margin-left: 20px;
    white-space: nowrap;
  }
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.loading-spin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

}


.footer {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid @border;
  color: @text-secondary;
  font-size: 0.9rem;

  .resources {
    margin-top: 10px;

    a {
      color: @primary;
      text-decoration: none;
      margin: 0 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .knowledge-grid {
    grid-template-columns: 1fr;
  }

  .search-bar {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;

    .search-count {
      margin-left: 0;
      text-align: right;
    }
  }

  .header {
    .logo {
      flex-direction: column;
      gap: 5px;

      h1 {
        font-size: 1.8rem;
      }
    }
  }
}
</style>
