<template>
  <div class="vuex-container">
    <header class="header">
      <h1 class="title">Vuex 状态管理库介绍</h1>
      <div class="subtitle">集中式状态管理解决方案</div>
    </header>

    <div class="content-grid">
      <!-- 左侧内容区域 -->
      <main class="main-content">
        <section class="section">
          <h2 class="section-title">Vuex 的作用</h2>
          <p class="paragraph">
            Vuex 是 Vue.js 应用程序的<span class="highlight">状态管理模式 + 库</span
            >。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
          </p>
          <div class="illustration">
            <div class="vuex-flow">
              <div class="component">组件</div>
              <div class="arrow">Dispatch</div>
              <div class="action">Actions</div>
              <div class="arrow">Commit</div>
              <div class="mutation">Mutations</div>
              <div class="arrow">Mutate</div>
              <div class="state">State</div>
              <div class="arrow">Render</div>
              <div class="component">组件</div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">核心概念</h2>
          <div class="concepts-grid">
            <div class="concept-card state">
              <h3>State</h3>
              <p>单一状态树，存储应用的所有状态数据</p>
              <pre>const state = { count: 0 }</pre>
            </div>
            <div class="concept-card getters">
              <h3>Getters</h3>
              <p>从 state 派生的计算属性</p>
              <pre>
getters: {
  doubleCount: state => state.count * 2
}</pre
              >
            </div>
            <div class="concept-card mutations">
              <h3>Mutations</h3>
              <p>唯一更改 state 的方法（同步）</p>
              <pre>
mutations: {
  increment(state, payload) {
    state.count += payload.amount
  }
}</pre
              >
            </div>
            <div class="concept-card actions">
              <h3>Actions</h3>
              <p>提交 mutations，可包含异步操作</p>
              <pre>
actions: {
  incrementAsync({ commit }, payload) {
    setTimeout(() => {
      commit('increment', payload)
    }, 1000', payload)
    }, 1000)
  }
}</pre
              >
            </div>
            <div class="concept-card modules">
              <h3>Modules</h3>
              <p>将 store 分割成模块，每个模块拥有自己的 state、mutations 等</p>
              <pre>
const moduleA = {
  state: { ... },
  mutations: { ... }
}</pre
              >
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">基本使用</h2>
          <div class="usage-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>安装 Vuex</h3>
                <pre>npm install vuex@next --save</pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>创建 Store</h3>
                <pre>
// store/index.ts
import { createStore } from 'vuex'

export default createStore({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 1000)
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
})</pre
                >
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>在组件中使用</h3>
                <pre>
// Component.vue
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const increment = () => store.commit('increment')
    const incrementAsync = () => store.dispatch('incrementAsync')
    const double = computed(() => store.getters.doubleCount)

    return {
      count: computed(() => store.state.count),
      double,
      increment,
      incrementAsync
    }
  }
}</pre
                >
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- 右侧信息区域 -->
      <aside class="sidebar">
        <section class="section">
          <h2 class="section-title">适用场景</h2>
          <ul class="scenario-list">
            <li>中大型单页应用（SPA）</li>
            <li>多个组件共享状态的场景</li>
            <li>需要跟踪状态变化的复杂应用</li>
            <li>需要缓存或持久化状态的场景</li>
            <li>需要实现撤销/重做功能</li>
            <li>跨组件通信复杂的情况</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="section-title">优点</h2>
          <ul class="pros-list">
            <li>集中管理状态，易于维护</li>
            <li>状态变化可预测，方便调试</li>
            <li>内置时间旅行调试功能</li>
            <li>模块化设计，支持大型项目</li>
            <li>与 Vue Devtools 深度集成</li>
            <li>提供严格的代码组织规范</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="section-title">缺点</h2>
          <ul class="cons-list">
            <li>增加项目复杂度，小型项目可能过度设计</li>
            <li>需要编写较多样板代码</li>
            <li>学习曲线相对陡峭</li>
            <li>可能使简单组件变得臃肿</li>
            <li>TypeScript 支持需要额外配置</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="section-title">替代方案</h2>
          <div class="alternatives">
            <div class="alt">
              <h3>Pinia</h3>
              <p>Vue 官方推荐的新状态管理库，更轻量，TypeScript 支持更好</p>
            </div>
            <div class="alt">
              <h3>Composition API</h3>
              <p>对于简单场景，使用 reactive/ref + provide/inject 即可</p>
            </div>
            <div class="alt">
              <h3>Event Bus</h3>
              <p>小型项目可使用 mitt 等事件总线库</p>
            </div>
          </div>
        </section>
      </aside>
    </div>

    <footer class="footer">
      <p>
        Vuex 是 Vue 生态中强大的状态管理解决方案，适用于中大型项目。对于新项目，可以考虑使用 Pinia
        作为更现代的替代方案。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 这里可以添加一些响应式数据或逻辑
const vuexInfo = {
  version: '4.x',
  githubStars: '28k+',
  lastRelease: '2022-11-08',
}

const vuexStats = computed(() => {
  return `Vuex ${vuexInfo.version} | GitHub Stars: ${vuexInfo.githubStars} | Last Release: ${vuexInfo.lastRelease}`
})
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #42b983;
@secondary-color: #35495e;
@accent-color: #ff6b6b;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

// 基础样式
.vuex-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @secondary-color;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, #64c3a6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-light;
    font-weight: 400;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.section {
  margin-bottom: 2.5rem;
  background: @light-bg;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: @secondary-color;
  }
}

.paragraph {
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.highlight {
  background-color: rgba(66, 185, 131, 0.15);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 500;
  color: darken(@primary-color, 10%);
}

// 核心概念网格
.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  padding: 1.25rem;
  border-radius: 8px;
  background: white;
  box-shadow: @card-shadow;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  h3 {
    margin-top: 0;
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  p {
    color: @text-light;
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  pre {
    background: @light-bg;
    padding: 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    overflow-x: auto;
    margin: 0;
  }

  // 为不同概念添加颜色标识
  &.state {
    border-top: 4px solid #42b983;
    h3 {
      color: #42b983;
    }
  }
  &.getters {
    border-top: 4px solid #3498db;
    h3 {
      color: #3498db;
    }
  }
  &.mutations {
    border-top: 4px solid #9b59b6;
    h3 {
      color: #9b59b6;
    }
  }
  &.actions {
    border-top: 4px solid #e67e22;
    h3 {
      color: #e67e22;
    }
  }
  &.modules {
    border-top: 4px solid #1abc9c;
    h3 {
      color: #1abc9c;
    }
  }
}

// 使用步骤样式
.usage-steps {
  .step {
    display: flex;
    margin-bottom: 2rem;
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 24px;
      top: 50px;
      bottom: -2rem;
      width: 2px;
      background: @border-color;
    }

    .step-number {
      width: 48px;
      height: 48px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 600;
      flex-shrink: 0;
      margin-right: 1.5rem;
      position: relative;
      z-index: 1;
    }

    .step-content {
      flex: 1;

      h3 {
        margin-top: 0.5rem;
        margin-bottom: 0.75rem;
        color: @secondary-color;
      }

      pre {
        background: @light-bg;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        overflow-x: auto;
        margin: 0;
      }
    }
  }
}

// 侧边栏样式
.sidebar {
  .section {
    margin-bottom: 1.5rem;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.75rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: @primary-color;
        font-weight: bold;
      }
    }
  }

  .scenario-list li::before {
    color: #3498db;
  }
  .pros-list li::before {
    color: #2ecc71;
  }
  .cons-list li::before {
    color: #e74c3c;
  }

  .alternatives {
    .alt {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: @card-shadow;

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }
}

// Vuex 流程图
.illustration {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: @card-shadow;

  .vuex-flow {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    > div {
      padding: 0.75rem 1.25rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
    }

    .component {
      background: rgba(66, 185, 131, 0.15);
      color: darken(@primary-color, 15%);
      border: 1px solid rgba(66, 185, 131, 0.3);
    }

    .action {
      background: rgba(230, 126, 34, 0.15);
      color: darken(#e67e22, 15%);
      border: 1px solid rgba(230, 126, 34, 0.3);
    }

    .mutation {
      background: rgba(155, 89, 182, 0.15);
      color: darken(#9b59b6, 15%);
      border: 1px solid rgba(155, 89, 182, 0.3);
    }

    .state {
      background: rgba(52, 152, 219, 0.15);
      color: darken(#3498db, 15%);
      border: 1px solid rgba(52, 152, 219, 0.3);
    }

    .arrow {
      color: @text-light;
      font-size: 0.9rem;
      position: relative;

      &::after {
        content: '→';
        margin-left: 0.5rem;
      }
    }
  }
}

.footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;
  text-align: center;
  color: @text-light;
  font-size: 0.95rem;
}

// 响应式设计
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .vuex-flow {
    flex-direction: column;

    .arrow::after {
      content: '↓' !important;
      margin: 0.5rem 0;
      display: block;
    }
  }
}

@media (max-width: 768px) {
  .vuex-container {
    padding: 1rem;
  }

  .header .title {
    font-size: 2rem;
  }

  .concepts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
