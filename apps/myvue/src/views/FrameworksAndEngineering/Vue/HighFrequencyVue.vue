<template>
  <div class="knowledge-container">
    <div class="header">
      <h1>Vue核心面试知识点</h1>
      <p class="subtitle">根据面试频率和社区热度排序（Vue 2 & Vue 3）</p>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">{{ knowledgePoints.length }}</span>
          <span class="stat-label">核心知识点</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">100%</span>
          <span class="stat-label">面试覆盖率</span>
        </div>
      </div>
    </div>

    <ScrollNav
      :list="navList"
    />

    <div class="knowledge-grid">
      <div
        v-for="(point, index) in knowledgePoints"
        :key="point.title"
        :id="point.id"
        class="knowledge-card"
        :class="{
          hot: point.hotness >= 9,
          medium: point.hotness >= 7 && point.hotness < 9,
          new: point.isVue3,
        }"
      >
        <div class="card-header">
          <span class="card-number">#{{ index + 1 }}</span>
          <div class="hotness">
            <span class="hotness-value">{{ point.hotness }}</span>
            <span class="hotness-label">热度</span>
          </div>
          <span v-if="point.isVue3" class="vue3-tag">Vue 3</span>
        </div>
        <h2 class="card-title">{{ point.title }}</h2>
        <div class="card-content">
          <p>{{ point.description }}</p>
          <div v-if="point.keyPoints" class="key-points">
            <div v-for="(kp, kpIndex) in point.keyPoints" :key="kpIndex" class="key-point">
              <span class="key-point-icon">✓</span> {{ kp }}
            </div>
          </div>
        </div>
        <div class="card-footer">
          <span class="interview-frequency">面试频率: {{ getFrequencyText(point.frequency) }}</span>
          <div class="importance">
            <div
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ filled: star <= point.importance }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">
        <div class="legend-color hot"></div>
        <span>高频热点 (热度 ≥ 9)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color medium"></div>
        <span>中频考点 (热度 ≥ 7)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color new"></div>
        <span>Vue 3 新特性</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollNav from '@/components/ScrollNav.vue'
import { computed, onMounted, ref } from 'vue'

interface KnowledgePoint {
  title: string
  id: string
  description: string
  keyPoints?: string[]
  hotness: number // 1-10
  frequency: number // 1-10
  importance: number // 1-5
  isVue3?: boolean
}

const knowledgePoints = ref<KnowledgePoint[]>([])

const navList = computed(() => {
  return knowledgePoints.value.map((item) => {
    return {
      name: item.title,
      id: item.id,
    }
  })
})

onMounted(async () => {
  const res = await import('@/views/FrameworksAndEngineering/JSON/HighFrequencyVue.json')
  knowledgePoints.value = res.default as unknown as KnowledgePoint[]
})

const getFrequencyText = (frequency: number): string => {
  if (frequency >= 9) return '极高'
  if (frequency >= 8) return '高'
  if (frequency >= 7) return '中高'
  if (frequency >= 6) return '中等'
  return '较低'
}
</script>

<style scoped lang="less">
@primary-color: #42b983;
@secondary-color: #35495e;
@hot-color: #ff6b6b;
@medium-color: #4dabf7;
@new-color: #9c27b0;
@light-bg: #f8f9fa;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.knowledge-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
  color: #333;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;

    .stat-item {
      background: @light-bg;
      border-radius: 12px;
      padding: 1rem 1.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: @primary-color;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.knowledge-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: all 0.3s ease;
  border-top: 4px solid #e9ecef;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  &.hot {
    border-top-color: @hot-color;

    .card-number {
      background: @hot-color;
    }
  }

  &.medium {
    border-top-color: @medium-color;

    .card-number {
      background: @medium-color;
    }
  }

  &.new {
    position: relative;
    overflow: hidden;

    &::before {
      content: 'NEW';
      position: absolute;
      top: 10px;
      right: -30px;
      background: @new-color;
      color: white;
      font-size: 0.75rem;
      font-weight: bold;
      padding: 0.25rem 2rem;
      transform: rotate(45deg);
      z-index: 1;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: @light-bg;

  .card-number {
    background: @primary-color;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .hotness {
    display: flex;
    flex-direction: column;
    align-items: center;

    .hotness-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: @secondary-color;
    }

    .hotness-label {
      font-size: 0.75rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .vue3-tag {
    background: @new-color;
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: bold;
  }
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 1rem 1.2rem 0.5rem;
  color: @secondary-color;
}

.card-content {
  padding: 0 1.2rem 1.5rem;
  flex-grow: 1;

  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .key-points {
    margin-top: 1rem;

    .key-point {
      padding: 0.5rem 0;
      border-bottom: 1px dashed #eee;
      display: flex;
      align-items: flex-start;

      &:last-child {
        border-bottom: none;
      }

      .key-point-icon {
        color: @primary-color;
        font-weight: bold;
        margin-right: 0.5rem;
        flex-shrink: 0;
      }
    }
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: @light-bg;
  border-top: 1px solid #eee;

  .interview-frequency {
    font-size: 0.85rem;
    font-weight: 600;
    color: #666;
  }

  .importance {
    display: flex;

    .star {
      width: 16px;
      height: 16px;
      margin-left: 2px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ddd'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");

      &.filled {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFC107'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
      }
    }
  }
}

.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;

  .legend-item {
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 0.5rem;

      &.hot {
        background: @hot-color;
      }

      &.medium {
        background: @medium-color;
      }

      &.new {
        background: @new-color;
      }
    }
  }
}

@media (max-width: 768px) {
  .knowledge-grid {
    grid-template-columns: 1fr;
  }

  .header .stats {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .legend {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
}
</style>
