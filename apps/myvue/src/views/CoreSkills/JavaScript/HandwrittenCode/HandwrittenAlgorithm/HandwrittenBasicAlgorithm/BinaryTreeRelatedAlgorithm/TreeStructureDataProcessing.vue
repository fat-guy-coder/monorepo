<template>
  <div class="tree-methods-container">
    <header class="header">
      <h1>树形数据处理方法</h1>
      <p>高效处理树形结构数据的算法与技术</p>
    </header>

    <div class="category" v-for="category in categorizedMethods" :key="category.name">
      <h2 class="category-title">{{ category.name }}</h2>
      <div class="methods-grid">
        <div v-for="method in category.methods" :key="method.id" class="method-card">
          <div class="card-header">
            <span class="method-id">#{{ method.id }}</span>
            <h3 class="method-title">{{ method.title }}</h3>
            <div class="method-tags">
              <span v-for="tag in method.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="method-description">{{ method.description }}</div>
          <div class="complexity" v-if="method.complexity">
            时间复杂度: <code>{{ method.complexity }}</code>
          </div>
          <div class="code">
            <code-block :code="method.code" language="ts" hiddenToolbar />
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">
        <div class="legend-color dfs"></div>
        <span>DFS相关算法</span>
      </div>
      <div class="legend-item">
        <div class="legend-color bfs"></div>
        <span>BFS相关算法</span>
      </div>
      <div class="legend-item">
        <div class="legend-color conversion"></div>
        <span>转换算法</span>
      </div>
      <div class="legend-item">
        <div class="legend-color comparison"></div>
        <span>树对比算法</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

interface TreeMethod {
  id: number
  title: string
  description: string
  tags: string[]
  category: string
  complexity?: string
  codeExample?: boolean
  code: string
}

const treeMethods = ref<TreeMethod[]>([])

onMounted(async() => {
  const res = await import('@/views/CoreSkills/JavaScript/JSON/treeMethods.json')
  const data = res.default
  treeMethods.value = data
})

const categorizedMethods = computed(() => [
  {
    name: '遍历方法',
    methods: treeMethods.value.filter((m) => m.category === '遍历方法'),
  },
  {
    name: '查找方法',
    methods: treeMethods.value.filter((m) => m.category === '查找方法'),
  },
  {
    name: '转换方法',
    methods: treeMethods.value.filter((m) => m.category === '转换方法'),
  },
  {
    name: '对比方法',
    methods: treeMethods.value.filter((m) => m.category === '对比方法'),
  },
])
</script>

<style scoped lang="less">
.tree-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    letter-spacing: -0.015em;
  }

  p {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-top: 0.5rem;
    font-weight: 400;
  }
}

.category {
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 1rem;
  }
}

.category-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #3498db;
  border-bottom: 2px solid #e0e7ff;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 60px;
    height: 4px;
    background: #3498db;
    border-radius: 2px;
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
}

.method-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border-left: 4px solid #3498db;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(52, 152, 219, 0.15);

    &::before {
      opacity: 0.05;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #3498db;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  // 不同类别的边框颜色
  .card-header .method-tags .tag {
    &.dfs {
      background: rgba(155, 89, 182, 0.1);
      color: #9b59b6;
    }
    &.bfs {
      background: rgba(46, 204, 113, 0.1);
      color: #2ecc71;
    }
    &.conversion {
      background: rgba(241, 196, 15, 0.1);
      color: #f1c40f;
    }
    &.comparison {
      background: rgba(231, 76, 60, 0.1);
      color: #e74c3c;
    }
  }
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
}

.method-id {
  font-size: 0.9rem;
  font-weight: 700;
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  margin-right: 0.75rem;
}

.method-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
  flex: 1;
}

.method-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;

  .tag {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }
}

.method-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.25rem;
}

.complexity {
  font-size: 0.85rem;
  background: rgba(236, 240, 241, 0.7);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 500;

  code {
    background: rgba(255, 255, 255, 0.7);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    color: #e74c3c;
  }
}

.code-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #3498db;
  font-weight: 500;

  svg {
    width: 18px;
    height: 18px;
  }
}

.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;

    &.dfs {
      background: #9b59b6;
    }
    &.bfs {
      background: #2ecc71;
    }
    &.conversion {
      background: #f1c40f;
    }
    &.comparison {
      background: #e74c3c;
    }
  }
}

@media (max-width: 768px) {
  .methods-grid {
    grid-template-columns: 1fr;
  }

  .legend {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }
}
</style>
