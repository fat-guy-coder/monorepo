<template>
  <div class="linked-list-container">
    <header class="header">
      <h1>链表相关算法</h1>
      <p class="subtitle">常用算法原理与实现思路介绍</p>
    </header>

    <ScrollNav :list="list" show-back-to-top />

    <div class="search-box">
      <input type="text" v-model="searchTerm" placeholder="搜索链表算法..." class="search-input" />
      <button class="search-btn">
        <i class="icon-search"></i>
      </button>
    </div>

    <div class="stats-bar">
      <span
        class="stat-value"
        :class="{ active: activeType.includes('all') }"
        @click="filterAlgorithms('all')"
        >全部</span
      >
      <span
        class="stat-value"
        :class="{ active: activeType.includes(type) }"
        v-for="type in typeList"
        :key="type"
        @click="filterAlgorithms(type)"
        >{{ type }}</span
      >
    </div>

    <div class="algorithm-list">
      <div
        v-for="(algo, index) in filteredAlgorithms"
        :key="algo.id"
        :id="algo.id"
        class="algorithm-card"
        :class="{ featured: index < 3 }"
      >
        <div class="card-header">
          <div class="algorithm-rank">{{ index + 1 }}</div>
          <h2 class="algorithm-title">{{ algo.title }}</h2>
          <div class="difficulty" :class="algo.difficulty">
            {{ algo.difficulty }}
          </div>
        </div>

        <div class="algorithm-description">
          <p>{{ algo.description }}</p>
          <div class="algorithm-tags">
            <span v-for="type in algo.type" :key="type" class="tag">
              {{ type }}
            </span>
          </div>
        </div>

        <div class="algorithm-details">
          <div class="detail-item">
            <span class="detail-label">时间复杂度:</span>
            <span class="detail-value">{{ algo.timeComplexity }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">空间复杂度:</span>
            <span class="detail-value">{{ algo.spaceComplexity }}</span>
          </div>
        </div>

        <div class="algorithm-idea">
          <span class="detail-label">核心思路:</span>
          <span class="detail-value">{{ algo.coreIdea }}</span>
        </div>

        <div class="algorithm-code">
          <pre>{{ algo.codeSnippet }}</pre>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>链表算法总结 © 2023 | 前端开发与算法学习</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ScrollNav from '@/components/ScrollNav.vue'

interface Algorithm {
  id: string
  title: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  coreIdea: string
  codeSnippet: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: string[]
}

type Type =
  | '转换'
  | '反转'
  | '遍历'
  | '归并'
  | '分治'
  | '哈希表'
  | '快慢指针'
  | '双(三)指针'
  | '检测'
  | '删除'
  | '插入'
  | '分割'
  | '拷贝'
  | '查找'
  | '去重'
  | '数学运算'
  | '重排'
  | '合并'
  | '区间操作'
  | '环'
  | '递归'

const searchTerm = ref('')

const typeList = ref<Type[]>([
  '快慢指针',
  '双(三)指针',
  '转换',
  '反转',
  '环',
  '遍历',
  '归并',
  '分治',
  '哈希表',
  '检测',
  '删除',
  '插入',
  '分割',
  '拷贝',
  '查找',
  '去重',
  '数学运算',
  '重排',
  '合并',
  '区间操作',
  '递归',
])

const algorithms = ref<Algorithm[]>([])

const list = computed<{ name: string; id: string }[]>(() => {
  return algorithms.value.map((algo) => {
    return {
      name: algo.title,
      id: algo.id,
    }
  })
})

onMounted(async () => {
  const res = await import('../JSON/LinkedListAlgorithmList.json')
  algorithms.value = res.default as Algorithm[]
})

const filteredAlgorithms = computed(() => {
  if (!searchTerm.value && activeType.value.includes('all')) return algorithms.value
  const term = searchTerm.value.toLowerCase()
  return algorithms.value.filter(
    (algo) =>
      (algo.title.toLowerCase().includes(term) ||
        algo.description.toLowerCase().includes(term) ||
        algo.type.some((tag) => tag.toLowerCase().includes(term))) &&
      activeType.value.some((t) => algo.type.includes(t)),
  )
})

const activeType = ref<(Type | 'all')[]>(['all'])

const filterAlgorithms = (type: Type | 'all') => {
  if (type === 'all') {
    activeType.value = ['all']
  } else {
    if (activeType.value.includes(type)) {
      activeType.value = activeType.value.filter((t) => t !== type)
      if (activeType.value.length === 0) {
        activeType.value = ['all']
      }
    } else {
      activeType.value = [...activeType.value, type].filter((t) => t !== 'all')
    }
  }
}
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.linked-list-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @secondary-color;
    margin: 0;
    font-size: 2.5rem;
  }

  .subtitle {
    color: @text-light;
    font-size: 1.1rem;
    margin-top: 10px;
  }
}

.search-box {
  display: flex;
  margin-bottom: 25px;
  max-width: 600px;
  margin: 0 auto 30px;

  .search-input {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid @primary-color;
    border-radius: 30px 0 0 30px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: @secondary-color;
    }
  }

  .search-btn {
    padding: 12px 25px;
    background: @primary-color;
    color: white;
    border: none;
    border-radius: 0 30px 30px 0;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: darken(@primary-color, 10%);
    }

    .icon-search {
      font-size: 18px;
    }
  }
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;

  .stat-value {
    text-align: center;
    padding: 15px 25px;
    background: @card-bg;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    &:hover {
      background: @primary-color;
      color: white;
    }
    &.active {
      background: @primary-color;
      color: white;
    }
  }
}

.algorithm-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.algorithm-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border-left: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  &.featured {
    position: relative;
    overflow: hidden;

    &::before {
      content: '常考';
      position: absolute;
      top: 15px;
      right: -30px;
      background: @accent-color;
      color: white;
      padding: 3px 35px;
      font-size: 0.8rem;
      transform: rotate(45deg);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .algorithm-rank {
    background: @primary-color;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }

  .algorithm-title {
    margin: 0;
    font-size: 1.6rem;
    color: @text-color;
    flex: 1;
  }

  .difficulty {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;

    &.easy {
      background: fade(@success-color, 15%);
      color: darken(@success-color, 15%);
    }

    &.medium {
      background: fade(@warning-color, 15%);
      color: darken(@warning-color, 15%);
    }

    &.hard {
      background: fade(@danger-color, 15%);
      color: darken(@danger-color, 15%);
    }
  }
}

.algorithm-description {
  color: @text-light;
  line-height: 1.6;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid @border-color;
}

.algorithm-idea {
  .detail-label {
    font-weight: 600;
    color: @text-color;
    margin-right: 8px;
    min-width: 90px;
  }
  margin-bottom: 20px;
}

.algorithm-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;

  .detail-item {
    display: flex;
    align-items: center;

    .detail-label {
      font-weight: 600;
      color: @text-color;
      margin-right: 8px;
      min-width: 90px;
    }

    .detail-value {
      color: @text-light;
    }
  }
}

.algorithm-code {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    margin: 0;
  }
}

.algorithm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .tag {
    background: fade(@primary-color, 10%);
    color: @primary-color;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px 0;
  color: @text-lighter;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

@media (max-width: 768px) {
  .stats-bar {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .algorithm-details {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;

    .algorithm-rank {
      margin-bottom: 10px;
    }

    .difficulty {
      margin-top: 10px;
    }
  }
}
</style>
