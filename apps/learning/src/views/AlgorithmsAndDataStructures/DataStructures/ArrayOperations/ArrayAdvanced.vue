<template>
  <div class="advanced-array-algorithms">
    <header class="header">
      <h1>JavaScript 数组进阶算法</h1>
      <div class="filter-controls">
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜索算法..." class="search-input" />
          <i class="icon search-icon">🔍</i>
        </div>
        <div class="category-filters">
          <button v-for="type in types" :key="type" :class="['category-btn', { active: activeType === type }]"
            @click="toggleCategory(type)">
            {{ type }}
          </button>
        </div>
      </div>
    </header>

    <ScrollNav :list="menuList" scroll-to="start" />

    <div class="algorithms-container">
      <div v-for="algorithm in filteredAlgorithms" :key="algorithm.id" :id="algorithm.id"
        :class="['algorithm-card', algorithm.category]">
        <div class="card-header">
          <div class="algorithm-icon">{{ algorithm.icon }}</div>
          <div class="algorithm-title">
            <h2>{{ algorithm.title }}</h2>
            <div class="complexity">
              <span>时间复杂度: {{ algorithm.timeComplexity }}</span>
              <span>空间复杂度: {{ algorithm.spaceComplexity }}</span>
            </div>
          </div>
        </div>

        <div class="algorithm-description">
          <p>{{ algorithm.description }}</p>
        </div>

        <div class="algorithm-steps">
          <ul>
            <li v-for="step in algorithm.steps" :key="step">{{ step }}</li>
          </ul>
        </div>

        <div class="algorithm-code">
          <pre><code>{{ algorithm.code }}</code></pre>
        </div>
      </div>
    </div>

    <div class="empty-state" v-if="filteredAlgorithms.length === 0">
      <i class="icon">🔍</i>
      <h3>未找到匹配的算法</h3>
      <p>请尝试其他搜索关键词或类别</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ScrollNav from 'components/Nav/ScrollNav.vue'

// 定义算法数据类型
interface Algorithm {
  id: string
  title: string
  type: string
  description: string
  icon: string
  category: string
  timeComplexity: string
  spaceComplexity: string
  code: string
  steps: string[]
}

// 算法数据
const algorithms = ref<Algorithm[]>([])

//目录数据
const menuList = computed(() => {
  return algorithms.value.map((item) => {
    return {
      name: `${item.title}(${item.type})`,
      id: item.id,
    }
  })
})

onMounted(async () => {
  const { default: data } = await import('../JSON/ArrayAdvance.json')
  algorithms.value = data
})

// 搜索和过滤状态
const searchQuery = ref('')
const activeType = ref('all')

const types = computed(() => {
  const uniqueTypes = new Set(algorithms.value.map((a) => a.type))
  return ['all', ...Array.from(uniqueTypes)]
})

// 过滤算法
const filteredAlgorithms = computed(() => {
  return algorithms.value.filter((algorithm) => {
    // 搜索匹配
    const matchesSearch =
      algorithm.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      algorithm.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    // 类别匹配
    const matchesCategory = activeType.value === 'all' || algorithm.type === activeType.value

    return matchesSearch && matchesCategory
  })
})

// 切换类别
const toggleCategory = (category: string) => {
  activeType.value = category
}
</script>

<style lang="less" scoped>
.advanced-array-algorithms {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #4a6cf7 0%, #6a11cb 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(106, 17, 203, 0.15);

    h1 {
      font-weight: 700;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-top: 0;
    }

    .filter-controls {
      max-width: 800px;
      margin: 2rem auto 0;

      .search-box {
        position: relative;
        margin-bottom: 1.5rem;

        .search-input {
          width: 100%;
          padding: 0.8rem 1.5rem 0.8rem 3rem;
          border: none;
          border-radius: 30px;
          font-size: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            box-shadow: 0 6px 15px rgba(106, 17, 203, 0.2);
          }
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
        }
      }

      .category-filters {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;

        .category-btn {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;

          &:hover {
            background: rgba(255, 255, 255, 0.25);
          }

          &.active {
            background: white;
            color: #6a11cb;
            font-weight: 500;
          }
        }
      }
    }
  }

  .algorithms-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .algorithm-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    &.advanced {
      border-top: 4px solid #4a6cf7;
    }

    .card-header {
      display: flex;
      align-items: center;
      padding: 1.5rem 1.5rem 1rem;
      background: #f8f9fa;
      border-bottom: 1px solid #eaeaea;

      .algorithm-icon {
        font-size: 2rem;
        margin-right: 1rem;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eef2ff;
        border-radius: 50%;
      }

      .algorithm-title {
        flex: 1;

        h2 {
          margin: 0 0 0.5rem;
          font-size: 1.4rem;
          color: #2c3e50;
        }

        .complexity {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #666;
        }
      }
    }

    .algorithm-description {
      padding: 1.2rem 1.5rem;
      border-bottom: 1px solid #f0f0f0;

      p {
        margin: 0;
        color: #555;
        line-height: 1.7;
      }
    }

    .algorithm-steps {
      padding: 1.2rem 1.5rem;
      border-bottom: 1px solid #f0f0f0;

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    }

    .algorithm-code {
      pre {
        margin: 0;
        padding: 1.2rem;
        background: #2d3748;
        color: #e2e8f0;
        overflow-x: auto;
        font-family: 'Fira Code', 'SFMono-Regular', Consolas, monospace;
        font-size: 0.9rem;
        line-height: 1.5;

        code {
          display: block;
          white-space: pre;
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #a0aec0;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: #2d3748;
    }

    p {
      margin: 0;
      color: #718096;
      font-size: 1.1rem;
    }
  }
}

@media (max-width: 600px) {
  .advanced-array-algorithms {
    padding: 1rem;

    .header {
      padding: 1.5rem 1rem;

      h1 {
        font-size: 2rem;
      }

      .filter-controls {
        .category-filters {
          flex-wrap: wrap;

          .category-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
          }
        }
      }
    }
  }
}
</style>
