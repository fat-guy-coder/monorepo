<template>
  <div class="css-knowledge-container">
    <h1 class="main-title">CSS 知识点</h1>
    <p class="update-info">基于最新CSS3标准 |面试高频优先 | 生产环境常用排序</p>
    <Navbar :list="categories" show-child />
    <!-- 知识分类 -->
    <div v-for="category in categories" :key="category.id" class="category-card" :id="category.id">
      <h2 class="category-title">{{ category.name }}</h2>
      <div class="knowledge-list">
        <div v-for="(item, index) in category.children" :key="item.id" class="knowledge-item"
          :class="{ 'high-priority': item.priority === 1 }" :id="item.id">
          <div class="item-header">
            <span class="item-index">{{ index + 1 }}.</span>
            <h3 class="item-title">{{ item.name }}</h3>
            <span class="item-tags">
              <span v-if="item.priority === 1" class="tag interview">面试必考</span>
              <span v-if="item.priority === 2" class="tag important">重要知识</span>
              <span class="tag frequency">使用频率: {{ getFrequencyStar(item.frequency) }}</span>
            </span>
          </div>
          <div class="item-content">
            <p class="item-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Nav/ScrollNav.vue'


// 类型定义
interface KnowledgeItem {
  id: string
  name: string
  description: string
  priority: number // 1-面试必考 2-重要知识
  frequency: number // 使用频率
}

interface KnowledgeCategory {
  id: string
  name: string
  children: KnowledgeItem[]
}

// 知识体系数据
const categories = ref<KnowledgeCategory[]>([])

onMounted(async () => {
  const list = await import('./JSON/CssKnowledgepPoints.json')
  categories.value = list.default as KnowledgeCategory[]
})

// 辅助方法
const getFrequencyStar = (level: number) => {
  return '⭐'.repeat(level) + '☆'.repeat(3 - level)
}
</script>

<style scoped>
.css-knowledge-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.main-title {
  text-align: center;
  color: #2c3e50;
  font-size: 2.8em;
  margin-bottom: 0.5rem;
}

.update-info {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-size: 0.9em;
}

.category-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  padding: 2rem;
}

.category-title {
  color: #2196F3;
  border-bottom: 3px solid #2196F3;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.8em;
}

.knowledge-item {
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  transition: transform 0.2s;
}

.knowledge-item:hover {
  transform: translateX(5px);
}

.high-priority {
  border-left: 4px solid #FF5722;
}

.item-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.item-index {
  font-weight: bold;
  color: #666;
  margin-right: 1rem;
  min-width: 30px;
}

.item-title {
  margin: 0;
  font-size: 1.2em;
  color: #2c3e50;
  flex-grow: 1;
}

.item-tags {
  display: flex;
  gap: 0.8rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8em;
}

.tag.interview {
  background: #FF5722;
  color: white;
}

.tag.important {
  background: #2196F3;
  color: white;
}

.tag.frequency {
  background: #4CAF50;
  color: white;
}

.item-content {
  padding: 1rem;
}

.item-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.code-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
  color: #d4d4d4;
  font-size: 0.9em;
}

pre {
  margin: 0;
}
</style>
