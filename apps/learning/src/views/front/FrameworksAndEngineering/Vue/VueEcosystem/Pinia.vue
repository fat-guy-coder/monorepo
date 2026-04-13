<template>
  <div class="pinia-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="logo-wrapper">
        <PiniaLogo />
      </div>
      <h1>Pinia状态管理库</h1>
      <p>Vue.js的下一代状态管理解决方案</p>
      <p><a href="https://pinia.vuejs.org/zh" target="_blank">Pinia官方文档</a></p>
      <div class="features">
        <span v-for="feature in features" :key="feature" class="feature-badge">
          {{ feature }}
        </span>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 什么是Pinia -->
      <div class="section">
        <div class="section-header">
          <div class="icon">🧠</div>
          <h2>什么是Pinia？</h2>
        </div>
        <div class="section-content">
          <p>
            Pinia是Vue.js官方推荐的状态管理库，取代了之前的Vuex。它是轻量级、直观且类型安全的，
            提供了更好的TypeScript支持，简化了状态管理的复杂性。
          </p>
          <div class="definition-card">
            <div class="definition-icon">💡</div>
            <p>
              <strong>Pinia的核心概念</strong>：通过定义store来管理全局状态，每个store是一个独立的模块，
              包含state、getters和actions，提供响应式、模块化的状态管理方案。
            </p>
          </div>
        </div>
      </div>

      <!-- 核心特性 -->
      <div class="section">
        <div class="section-header">
          <div class="icon">⭐</div>
          <h2>核心特性</h2>
        </div>
        <div class="features-grid">
          <div v-for="item in coreFeatures" :key="item.title" class="feature-card">
            <div class="feature-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- 基本使用 -->
      <div class="section">
        <div class="section-header">
          <div class="icon">🛠️</div>
          <h2>基本使用</h2>
        </div>
        <div class="section-content">
          <h3>1. 安装Pinia</h3>
          <div class="code-block">
            <pre><code>npm install pinia</code></pre>
          </div>

          <h3>2. 创建Store</h3>
          <div class="code-block">
            <pre><code>// stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  // 状态定义
  state: () => ({
    count: 0,
    name: 'My Counter'
  }),

  // 计算属性
  getters: {
    doubleCount: (state) => state.count * 2
  },

  // 操作方法
  actions: {
    increment() {
      this.count++;
    },
    reset() {
      this.count = 0;
    }
  }
});</code></pre>
          </div>

          <h3>3. 在组件中使用</h3>
          <div class="code-block">
            <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;{ counter.name }&lt;/h1&gt;
    &lt;p&gt;Count: { counter.count }&lt;/p&gt;
    &lt;p&gt;Double: { counter.doubleCount }&lt;/p&gt;
    &lt;button @click="counter.increment"&gt;Increment&lt;/button&gt;
    &lt;button @click="counter.reset"&gt;Reset&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="section">
        <div class="section-header">
          <div class="icon">📱</div>
          <h2>使用场景</h2>
        </div>
        <div class="use-cases">
          <div class="use-case-card" v-for="(useCase, index) in useCases" :key="index">
            <div class="index">{{ index + 1 }}</div>
            <div>
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 对比Vuex -->
      <div class="section">
        <div class="section-header">
          <div class="icon">🆚</div>
          <h2>Pinia vs Vuex</h2>
        </div>
        <div class="comparison">
          <div class="comparison-header">
            <div></div>
            <div class="pinia-col">Pinia</div>
            <div class="vuex-col">Vuex</div>
          </div>
          <div class="comparison-row" v-for="(item, index) in comparisonTable" :key="index">
            <div class="comparison-title">{{ item.title }}</div>
            <div class="pinia-col">{{ item.pinia }}</div>
            <div class="vuex-col">{{ item.vuex }}</div>
          </div>
        </div>
      </div>

      <!-- 总结 -->
      <div class="section summary">
        <div class="section-header">
          <div class="icon">🏁</div>
          <h2>总结</h2>
        </div>
        <div class="summary-content">
          <p>
            Pinia是Vue状态管理的未来，提供了更简洁、更直观的API，更好的TypeScript支持，
            以及更小的包体积。它摒弃了Vuex中复杂的mutation概念，使状态管理更加直接。
          </p>
          <div class="recommendation">
            <div class="tip-icon">💎</div>
            <p>
              <strong>何时选择Pinia</strong>：新项目首选Pinia，大型项目从Vuex迁移也非常容易。
              Pinia的API设计更符合Vue3的Composition API理念，让状态管理更加自然和高效。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PiniaLogo } from './pinina.tsx';

// Pinia特性列表
const features = ref([
  '轻量级', 'DevTools支持', '模块化', 'TypeScript', 'Composition API'
]);

// 核心特性
const coreFeatures = ref([
  {
    icon: '📦',
    title: '模块化状态存储',
    description: '每个Store都是独立模块，易于组织和管理状态'
  },
  {
    icon: '🔄',
    title: '响应式状态',
    description: '状态自动响应式更新，视图自动同步'
  },
  {
    icon: '🧩',
    title: '组合式API',
    description: '完美支持Vue3的Composition API'
  },
  {
    icon: '🧪',
    title: 'DevTools集成',
    description: '内置Vue DevTools支持，方便调试'
  },
  {
    icon: '🧮',
    title: '类型安全',
    description: '一流的TypeScript支持，提供完整类型推断'
  },
  {
    icon: '📐',
    title: '轻量高效',
    description: '1KB大小，零依赖，性能卓越'
  }
]);

// 使用场景
const useCases = ref([
  {
    title: '用户认证状态',
    description: '管理用户登录状态、token和权限信息'
  },
  {
    title: '购物车系统',
    description: '存储商品、价格和购物车状态'
  },
  {
    title: '主题切换',
    description: '全局管理应用主题和UI偏好'
  },
  {
    title: '多步骤表单',
    description: '在复杂表单流程中保持数据状态'
  },
  {
    title: '实时数据同步',
    description: '管理WebSocket连接和实时数据'
  },
  {
    title: '全局配置',
    description: '存储应用的全局设置和配置选项'
  }
]);

// 对比表
const comparisonTable = ref([
  {
    title: 'API复杂度',
    pinia: '简洁直观',
    vuex: '相对复杂'
  },
  {
    title: 'TypeScript支持',
    pinia: '一流支持',
    vuex: '插件支持'
  },
  {
    title: '模块定义',
    pinia: '多个store',
    vuex: '单一store'
  },
  {
    title: '包体积',
    pinia: '约1KB',
    vuex: '约10KB'
  },
  {
    title: 'Mutation',
    pinia: '不需要',
    vuex: '必须使用'
  },
  {
    title: '学习曲线',
    pinia: '平缓',
    vuex: '较陡峭'
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #ffd02c;
@primary-dark: #333;
@secondary-color: #4fc08d;
@background-light: #f8f9fa;
@text-dark: #2c3e50;
@text-light: #7f8c8d;
@border-radius: 10px;
@box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

.pinia-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: @text-dark;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 2rem 0 3rem;
  position: relative;

  .logo-wrapper {
    margin: 0 auto 1rem;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    box-shadow: @box-shadow;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: @primary-dark;
  }

  p {
    font-size: 1.25rem;
    color: @text-light;
    margin-bottom: 1.5rem;
  }

  .features {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.8rem;
    max-width: 600px;
    margin: 0 auto;

    .feature-badge {
      padding: 0.5rem 1rem;
      border-radius: 50px;
      background: lighten(@primary-color, 35%);
      color: darken(@primary-color, 30%);
      font-size: 0.9rem;
      font-weight: 600;
      border: 1px solid fadeout(@primary-color, 40%);
      transition: @transition;

      &:hover {
        transform: translateY(-2px);
        background: lighten(@primary-color, 30%);
      }
    }
  }
}

.section {
  margin-bottom: 2.5rem;
  background: white;
  border-radius: @border-radius;
  overflow: hidden;
  box-shadow: @box-shadow;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.5rem 1.75rem;
    background: linear-gradient(to right, @primary-color, lighten(@primary-color, 15%));
    border-bottom: 1px solid darken(@primary-color, 5%);

    .icon {
      font-size: 1.75rem;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      justify-content: center;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: @primary-dark;
    }
  }

  .section-content {
    padding: 2rem;

    .definition-card {
      display: flex;
      background: lighten(@primary-color, 40%);
      border-radius: @border-radius;
      padding: 1.5rem;
      margin-top: 1.5rem;
      border-left: 4px solid @primary-color;

      .definition-icon {
        font-size: 2rem;
        margin-right: 1rem;
        color: @primary-dark;
      }

      p {
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.7;

        strong {
          color: @primary-dark;
        }
      }
    }
  }

  h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: @secondary-color;
    font-size: 1.3rem;
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: @secondary-color;
      border-radius: 50%;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .feature-card {
    background: @background-light;
    border-radius: @border-radius;
    padding: 1.5rem;
    border: 1px solid #eee;
    transition: @transition;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      font-size: 1.2rem;
      color: @primary-dark;
    }

    p {
      margin: 0;
      color: @text-light;
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
}

.code-block {
  background: #2d2d2d;
  border-radius: @border-radius;
  padding: 1.25rem;
  margin: 1.25rem 0;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;

  .use-case-card {
    display: flex;
    background: white;
    border-radius: @border-radius;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: @transition;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .index {
      width: 45px;
      min-width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      background: @primary-color;
      color: @primary-dark;
    }

    div {
      padding: 1.25rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      color: @primary-dark;
    }

    p {
      margin: 0;
      color: @text-light;
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
}

.comparison {
  border-radius: @border-radius;
  overflow: hidden;
  border: 1px solid #eaeaea;

  .comparison-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    background: @background-light;
    font-weight: 700;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eaeaea;

    .pinia-col {
      color: @primary-dark;
      text-align: center;
    }

    .vuex-col {
      color: #42b883;
      text-align: center;
    }
  }

  .comparison-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f5f5f5;

    &:nth-child(even) {
      background: #fcfcfc;
    }

    &:last-child {
      border-bottom: none;
    }

    .comparison-title {
      font-weight: 500;
    }

    .pinia-col,
    .vuex-col {
      text-align: center;
      font-weight: 500;
    }

    .pinia-col {
      color: @primary-dark;
    }

    .vuex-col {
      color: #42b883;
    }
  }
}

.summary {
  .recommendation {
    display: flex;
    align-items: flex-start;
    background: lighten(@secondary-color, 45%);
    border-radius: @border-radius;
    padding: 1.5rem;
    margin-top: 1.5rem;
    border-left: 4px solid @secondary-color;

    .tip-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
      color: @secondary-color;
    }

    p {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.7;

      strong {
        color: @secondary-color;
      }
    }
  }
}

@media (max-width: 768px) {
  .pinia-container {
    padding: 1rem;
  }

  .header {
    padding: 1rem 0 2rem;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .section {
    .section-header {
      padding: 1rem;

      .icon {
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
      }

      h2 {
        font-size: 1.3rem;
      }
    }

    .section-content {
      padding: 1.5rem;
    }
  }
}
</style>