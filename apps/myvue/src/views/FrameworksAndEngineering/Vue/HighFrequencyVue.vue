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

    <div class="knowledge-grid">
      <div v-for="(point, index) in knowledgePoints" :key="point.title" class="knowledge-card" :class="{
        'hot': point.hotness >= 9,
        'medium': point.hotness >= 7 && point.hotness < 9,
        'new': point.isVue3
      }">
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
            <div v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= point.importance }"></div>
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
import { ref } from 'vue';

interface KnowledgePoint {
  title: string;
  description: string;
  keyPoints?: string[];
  hotness: number; // 1-10
  frequency: number; // 1-10
  importance: number; // 1-5
  isVue3?: boolean;
}

const knowledgePoints = ref<KnowledgePoint[]>([
  {
    title: '响应式原理',
    description: 'Vue的核心特性，理解Object.defineProperty(Vue2)和Proxy(Vue3)的实现差异',
    keyPoints: [
      '数据劫持与依赖收集',
      '发布-订阅模式',
      'Vue3的Proxy优势',
      '数组响应式处理'
    ],
    hotness: 10,
    frequency: 10,
    importance: 5
  },
  {
    title: '组合式API (Composition API)',
    description: 'Vue 3引入的新范式，解决了Options API在复杂组件中的碎片化问题',
    keyPoints: [
      'setup()函数',
      'ref与reactive',
      '生命周期钩子函数',
      '与React Hooks的对比'
    ],
    hotness: 9.8,
    frequency: 9.5,
    importance: 5,
    isVue3: true
  },
  {
    title: '虚拟DOM与Diff算法',
    description: 'Vue高性能渲染的核心，理解其工作原理对性能优化至关重要',
    keyPoints: [
      '虚拟DOM的作用与优势',
      'Diff算法策略（同层比较）',
      'key属性的重要性',
      'Vue3的优化（静态提升等）'
    ],
    hotness: 9.5,
    frequency: 9,
    importance: 5
  },
  {
    title: '组件通信',
    description: '多种组件间通信方式的适用场景与实现原理',
    keyPoints: [
      'Props / Emit',
      'Event Bus',
      'Vuex / Pinia',
      'provide / inject',
      '$attrs / $listeners'
    ],
    hotness: 9.5,
    frequency: 9.5,
    importance: 5
  },
  {
    title: 'Vue Router',
    description: '官方路由管理库，SPA应用的核心',
    keyPoints: [
      '路由模式（hash/history）',
      '导航守卫',
      '路由懒加载',
      '动态路由',
      '路由元信息'
    ],
    hotness: 9.2,
    frequency: 9,
    importance: 5
  },
  {
    title: '状态管理（Vuex/Pinia）',
    description: '复杂应用状态管理的解决方案',
    keyPoints: [
      'Vuex核心概念（State, Getters, Mutations, Actions）',
      'Pinia的优势与使用',
      '模块化管理',
      '状态持久化'
    ],
    hotness: 9.0,
    frequency: 8.5,
    importance: 4
  },
  {
    title: '生命周期',
    description: '理解Vue组件的创建、更新和销毁过程',
    keyPoints: [
      '主要生命周期钩子',
      'Vue2 vs Vue3生命周期',
      'setup中的生命周期',
      '异步请求的合适位置'
    ],
    hotness: 8.8,
    frequency: 9,
    importance: 4
  },
  {
    title: '指令系统',
    description: 'Vue模板语法的核心，包括内置指令和自定义指令',
    keyPoints: [
      '常用指令（v-if, v-for, v-bind, v-on）',
      'v-model原理与自定义',
      '自定义指令',
      '指令钩子函数'
    ],
    hotness: 8.5,
    frequency: 8,
    importance: 4
  },
  {
    title: '计算属性与侦听器',
    description: '响应式系统中的衍生数据和副作用处理',
    keyPoints: [
      'computed vs methods',
      'watch vs watchEffect',
      '深度监听',
      '立即执行'
    ],
    hotness: 8.5,
    frequency: 8.5,
    importance: 4
  },
  {
    title: '插槽（Slots）',
    description: '组件内容分发的强大机制',
    keyPoints: [
      '默认插槽',
      '具名插槽',
      '作用域插槽',
      '渲染作用域'
    ],
    hotness: 8.0,
    frequency: 7.5,
    importance: 3
  },
  {
    title: 'Teleport组件',
    description: 'Vue 3新增的组件，用于将内容渲染到DOM树的其他位置',
    keyPoints: [
      '解决z-index问题',
      '模态框实现',
      '与React Portal的对比'
    ],
    hotness: 7.8,
    frequency: 7,
    importance: 3,
    isVue3: true
  },
  {
    title: '性能优化',
    description: '提升Vue应用性能的关键策略',
    keyPoints: [
      '代码分割',
      '异步组件',
      'keep-alive',
      '虚拟滚动',
      '减少不必要的响应式'
    ],
    hotness: 8.7,
    frequency: 8,
    importance: 4
  },
  {
    title: '过渡与动画',
    description: 'Vue提供的动画系统，用于元素进入/离开的过渡效果',
    keyPoints: [
      'transition组件',
      'CSS过渡类名',
      'JavaScript钩子',
      '列表过渡'
    ],
    hotness: 7.0,
    frequency: 6.5,
    importance: 2
  },
  {
    title: '服务端渲染（SSR）',
    description: '提升首屏性能和SEO的解决方案',
    keyPoints: [
      'Nuxt.js框架',
      'SSR原理',
      '客户端激活（hydration）',
      '数据预取'
    ],
    hotness: 7.5,
    frequency: 6,
    importance: 3
  },
  {
    title: 'TypeScript集成',
    description: 'Vue 3对TypeScript的全面支持',
    keyPoints: [
      '类型推导',
      '组件类型声明',
      'Composition API中的TS',
      'defineComponent'
    ],
    hotness: 8.5,
    frequency: 8,
    importance: 4,
    isVue3: true
  },
  {
    title: '自定义渲染器',
    description: 'Vue 3的底层能力，支持非DOM环境的渲染',
    keyPoints: [
      '渲染器原理',
      '创建自定义渲染器',
      '跨平台应用（小程序、Canvas等）'
    ],
    hotness: 6.5,
    frequency: 5,
    importance: 2,
    isVue3: true
  },
  {
    title: '混入（Mixins）',
    description: 'Vue 2中复用组件逻辑的方式，Vue 3中被Composition API取代',
    keyPoints: [
      '基本使用',
      '合并策略',
      '与Composition API的对比',
      '潜在问题'
    ],
    hotness: 7.0,
    frequency: 6,
    importance: 3
  },
  {
    title: '错误处理',
    description: '捕获和处理Vue应用中的错误',
    keyPoints: [
      '全局错误处理',
      '错误边界（Error Boundaries）',
      '异步错误捕获',
      '渲染函数错误'
    ],
    hotness: 7.2,
    frequency: 6.5,
    importance: 3
  },
  {
    title: '函数式组件',
    description: '无状态、无实例的高性能组件',
    keyPoints: [
      '适用场景',
      '性能优势',
      'Vue 3中的变化'
    ],
    hotness: 6.8,
    frequency: 6,
    importance: 2
  },
  {
    title: 'nextTick原理',
    description: '理解Vue异步更新队列机制',
    keyPoints: [
      '更新批处理',
      '微任务队列',
      '使用场景',
      '与setTimeout对比'
    ],
    hotness: 8.0,
    frequency: 7.5,
    importance: 4
  }
]);

const getFrequencyText = (frequency: number): string => {
  if (frequency >= 9) return '极高';
  if (frequency >= 8) return '高';
  if (frequency >= 7) return '中高';
  if (frequency >= 6) return '中等';
  return '较低';
};
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
