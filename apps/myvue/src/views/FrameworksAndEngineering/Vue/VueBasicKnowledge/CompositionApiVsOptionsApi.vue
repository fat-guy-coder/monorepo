<template>
  <div class="api-comparison-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>Composition API vs Options API</h1>
        <div class="logo">
          <div class="logo-circle">Vue</div>
        </div>
      </div>
      <p class="subtitle">Vue 3 中两种代码组织方式的深度对比</p>
    </header>

    <div class="content">
      <div class="overview">
        <div class="card">
          <div class="overview-grid">
            <div class="text-content">
              <h2>两种 API 设计理念</h2>
              <p>Vue 3 提供了两种组织组件代码的方式：传统的 Options API 和新的 Composition API。两者各有优势，适用于不同的场景。</p>

              <div class="key-points">
                <div class="point">
                  <div class="point-icon bg-blue">
                    <i class="icon icon-options"></i>
                  </div>
                  <div>
                    <h3>Options API</h3>
                    <p>基于选项的对象结构，分离不同功能逻辑</p>
                  </div>
                </div>
                <div class="point">
                  <div class="point-icon bg-green">
                    <i class="icon icon-composition"></i>
                  </div>
                  <div>
                    <h3>Composition API</h3>
                    <p>基于函数的组合方式，聚合相关功能逻辑</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="visualization">
              <div class="api-comparison">
                <div class="options-api">
                  <div class="section">data()</div>
                  <div class="section">methods</div>
                  <div class="section">computed</div>
                  <div class="section">watch</div>
                  <div class="section">lifecycle</div>
                </div>
                <div class="vs">VS</div>
                <div class="composition-api">
                  <div class="feature">ref()</div>
                  <div class="feature">reactive()</div>
                  <div class="feature">computed()</div>
                  <div class="feature">watch()</div>
                  <div class="feature">onMounted()</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2 class="section-title">
          <i class="icon icon-diff"></i>
          <span>核心差异对比</span>
        </h2>

        <div class="comparison-grid">
          <div class="comparison-card">
            <div class="comparison-header bg-blue">
              <h3>Options API</h3>
            </div>
            <div class="comparison-body">
              <div class="pros-cons">
                <div class="pros">
                  <h4>优势</h4>
                  <ul>
                    <li>结构清晰，按选项组织代码</li>
                    <li>学习曲线平缓，适合 Vue 2 开发者</li>
                    <li>内置关注点分离（数据、方法、生命周期）</li>
                    <li>this 上下文提供直接访问</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>劣势</h4>
                  <ul>
                    <li>逻辑关注点分散在不同选项中</li>
                    <li>大型组件中代码可读性降低</li>
                    <li>类型推断支持有限</li>
                    <li>逻辑复用相对困难（mixins）</li>
                  </ul>
                </div>
              </div>
              <div class="code-example">
                <h4>Options API 示例</h4>
                <pre><code>export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Component mounted')
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="comparison-card">
            <div class="comparison-header bg-green">
              <h3>Composition API</h3>
            </div>
            <div class="comparison-body">
              <div class="pros-cons">
                <div class="pros">
                  <h4>优势</h4>
                  <ul>
                    <li>更好的逻辑组织和复用</li>
                    <li>更灵活的函数式代码结构</li>
                    <li>优秀的 TypeScript 支持</li>
                    <li>按功能而非选项组织代码</li>
                    <li>更小的生产包体积</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>劣势</h4>
                  <ul>
                    <li>学习曲线较陡峭</li>
                    <li>需要理解响应式原理</li>
                    <li>this 上下文缺失</li>
                    <li>小型简单组件中可能过度设计</li>
                  </ul>
                </div>
              </div>
              <div class="code-example">
                <h4>Composition API 示例</h4>
                <pre><code>import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const message = ref('Hello')

    const doubleCount = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    onMounted(() => {
      console.log('Component mounted')
    })

    return {
      count,
      message,
      doubleCount,
      increment
    }
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="feature-comparison">
        <h2 class="section-title">
          <i class="icon icon-feature"></i>
          <span>特性对比</span>
        </h2>

        <div class="card">
          <div class="feature-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>Options API</th>
                  <th>Composition API</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>代码组织</td>
                  <td>按选项类型分组</td>
                  <td>按逻辑功能分组</td>
                  <td>Composition API 更适合复杂逻辑</td>
                </tr>
                <tr>
                  <td>逻辑复用</td>
                  <td>Mixins/作用域插槽</td>
                  <td>Composable 函数</td>
                  <td>Composition API 复用更清晰</td>
                </tr>
                <tr>
                  <td>TypeScript 支持</td>
                  <td>有限支持</td>
                  <td>全面支持</td>
                  <td>Composition API 类型推断更完善</td>
                </tr>
                <tr>
                  <td>学习曲线</td>
                  <td>平缓</td>
                  <td>较陡峭</td>
                  <td>Options API 更易上手</td>
                </tr>
                <tr>
                  <td>响应式变量</td>
                  <td>data() 返回对象</td>
                  <td>ref()/reactive()</td>
                  <td>Composition API 更显式声明</td>
                </tr>
                <tr>
                  <td>生命周期</td>
                  <td>选项钩子 (mounted)</td>
                  <td>函数钩子 (onMounted)</td>
                  <td>Composition API 更灵活</td>
                </tr>
                <tr>
                  <td>代码复用</td>
                  <td>受限</td>
                  <td>高度灵活</td>
                  <td>Composition API 更适合可复用逻辑</td>
                </tr>
                <tr>
                  <td>代码压缩</td>
                  <td>选项名不可压缩</td>
                  <td>所有名称可压缩</td>
                  <td>Composition API 包体积更小</td>
                </tr>
                <tr>
                  <td>上下文访问</td>
                  <td>this 访问所有属性</td>
                  <td>无 this，需显式暴露</td>
                  <td>Options API 访问更直接</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="use-cases">
        <h2 class="section-title">
          <i class="icon icon-scenario"></i>
          <span>使用场景建议</span>
        </h2>

        <div class="case-cards">
          <div class="case-card">
            <div class="case-icon bg-blue">
              <i class="icon icon-simple"></i>
            </div>
            <h3>Options API 适用场景</h3>
            <ul>
              <li>简单展示型组件</li>
              <li>从 Vue 2 迁移的项目</li>
              <li>不需要复杂逻辑复用</li>
              <li>快速原型开发</li>
              <li>团队熟悉 Vue 2 开发模式</li>
            </ul>
          </div>

          <div class="case-card">
            <div class="case-icon bg-green">
              <i class="icon icon-complex"></i>
            </div>
            <h3>Composition API 适用场景</h3>
            <ul>
              <li>大型复杂组件</li>
              <li>需要高度逻辑复用的项目</li>
              <li>使用 TypeScript 的项目</li>
              <li>需要更好代码组织的应用</li>
              <li>需要优化包体积的应用</li>
            </ul>
          </div>

          <div class="case-card">
            <div class="case-icon bg-purple">
              <i class="icon icon-mix"></i>
            </div>
            <h3>混合使用策略</h3>
            <ul>
              <li>在同一个项目中混合使用两种 API</li>
              <li>新组件使用 Composition API</li>
              <li>旧组件逐步迁移</li>
              <li>简单组件用 Options，复杂组件用 Composition</li>
              <li>根据团队熟悉度选择</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="migration-example">
        <h2 class="section-title">
          <i class="icon icon-migrate"></i>
          <span>迁移示例</span>
        </h2>

        <div class="card">
          <div class="example-tabs">
            <div class="tabs">
              <button :class="{ active: activeTab === 'options' }" @click="activeTab = 'options'">
                Options API
              </button>
              <button :class="{ active: activeTab === 'composition' }" @click="activeTab = 'composition'">
                Composition API
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 'options'" class="code-example">
                <pre><code>export default {
  data() {
    return {
      count: 0,
      searchQuery: '',
      results: [],
      loading: false
    }
  },

  computed: {
    filteredResults() {
      return this.results.filter(item =>
        item.name.includes(this.searchQuery)
      )
    },

    resultsCount() {
      return this.filteredResults.length
    }
  },

  methods: {
    async fetchData() {
      this.loading = true
      try {
        const response = await fetch('/api/data')
        this.results = await response.json()
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },

    increment() {
      this.count++
    }
  },

  mounted() {
    this.fetchData()
  },

  watch: {
    searchQuery(newVal) {
      if (newVal.length > 2) {
        this.fetchData()
      }
    }
  }
}</code></pre>
              </div>

              <div v-if="activeTab === 'composition'" class="code-example">
                <pre><code>import { ref, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    // 数据状态
    const count = ref(0)
    const searchQuery = ref('')
    const results = ref([])
    const loading = ref(false)

    // 计算属性
    const filteredResults = computed(() => {
      return results.value.filter(item =>
        item.name.includes(searchQuery.value)
      )
    })

    const resultsCount = computed(() =>
      filteredResults.value.length
    )

    // 方法
    async function fetchData() {
      loading.value = true
      try {
        const response = await fetch('/api/data')
        results.value = await response.json()
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        loading.value = false
      }
    }

    function increment() {
      count.value++
    }

    // 生命周期钩子
    onMounted(() => {
      fetchData()
    })

    // 侦听器
    watch(searchQuery, (newVal) => {
      if (newVal.length > 2) {
        fetchData()
      }
    })

    // 暴露给模板
    return {
      count,
      searchQuery,
      results,
      loading,
      filteredResults,
      resultsCount,
      increment
    }
  }
}</code></pre>
              </div>
            </div>

            <div class="comparison-analysis">
              <h3>对比分析</h3>
              <p>在 Composition API 示例中：</p>
              <ul>
                <li>相关逻辑（数据、计算、方法）被组织在一起</li>
                <li>逻辑关注点更集中（搜索功能相关代码在一起）</li>
                <li>更容易提取可复用逻辑（如 fetchData 可提取为 composable）</li>
                <li>类型推断更完善，适合 TypeScript</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="summary">
        <h2 class="section-title">
          <i class="icon icon-summary"></i>
          <span>总结与建议</span>
        </h2>

        <div class="card">
          <div class="summary-content">
            <div class="recommendation">
              <h3>选择建议</h3>
              <div class="recommendation-grid">
                <div class="recommendation-item">
                  <div class="icon-badge bg-blue">
                    <i class="icon icon-options"></i>
                  </div>
                  <h4>使用 Options API 当：</h4>
                  <ul>
                    <li>构建简单应用或组件</li>
                    <li>团队熟悉 Vue 2</li>
                    <li>不需要复杂逻辑复用</li>
                    <li>快速开发原型</li>
                  </ul>
                </div>
                <div class="recommendation-item">
                  <div class="icon-badge bg-green">
                    <i class="icon icon-composition"></i>
                  </div>
                  <h4>使用 Composition API 当：</h4>
                  <ul>
                    <li>构建大型复杂应用</li>
                    <li>需要更好的 TypeScript 支持</li>
                    <li>需要高度逻辑复用</li>
                    <li>追求更好的长期可维护性</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="final-thoughts">
              <h3>最后建议</h3>
              <p>Composition API 不是 Options API 的替代品，而是补充。Vue 3 完全支持两种风格，您可以根据具体场景选择最合适的方式，甚至在同一个项目中混合使用。</p>
              <p>对于新项目，特别是中大型应用，推荐使用 Composition API 以获得更好的可维护性和可扩展性。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Vue Composition API vs Options API | 选择适合您项目的代码组织方式</p>
      <div class="links">
        <a href="https://vuejs.org/guide/introduction.html#api-styles" target="_blank">
          <i class="icon icon-doc"></i> 官方文档
        </a>
        <a href="https://github.com/vuejs/core" target="_blank">
          <i class="icon icon-github"></i> GitHub 仓库
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('options');
</script>

<style lang="less" scoped>



// 基础变量
@primary-color: #42b883; // Vue 绿色
@secondary-color: #35495e; // Vue 深蓝色
@background-light: #f8f9fa;
@text-primary: #2c3e50;
@text-secondary: #5a6d82;
@border-color: #e8e8e8;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #42b883;
@warning-color: #ff6b6b;
@info-color: #3498db;

// 颜色变量
@blue: #3498db;
@green: #42b883;
@purple: #9b59b6;

// 布局和基础样式
.api-comparison-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-primary;
  background-color: #fff;
  line-height: 1.6;
  padding-bottom: 40px;
}

.header {
  text-align: center;
  padding: 50px 0 30px;
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: @text-primary;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-circle {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    font-weight: 400;
    margin-top: 15px;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
}

// 概览部分
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.text-content {
  h2 {
    font-size: 1.8rem;
    color: @text-primary;
    margin-top: 0;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 25px;
    line-height: 1.7;
    color: @text-secondary;
  }
}

.key-points {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 30px;
}

.point {
  display: flex;
  gap: 15px;
  align-items: center;

  .point-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    flex-shrink: 0;

    &.bg-blue {
      background: @blue;
    }

    &.bg-green {
      background: @green;
    }
  }

  h3 {
    font-size: 1.3rem;
    margin: 0 0 8px;
    color: @text-primary;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.visualization {
  display: flex;
  align-items: center;
  justify-content: center;
}

.api-comparison {
  display: flex;
  align-items: center;
  gap: 30px;
  background: #f9fbfd;
  border-radius: 12px;
  padding: 30px;
  border: 1px dashed #d0e3ff;
}

.options-api,
.composition-api {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 150px;
}

.section,
.feature {
  background: white;
  border: 1px solid @border-color;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  font-weight: 500;
}

.section {
  background: fade(@blue, 10%);
  border-color: fade(@blue, 30%);
}

.feature {
  background: fade(@green, 10%);
  border-color: fade(@green, 30%);
}

.vs {
  font-weight: bold;
  color: @text-secondary;
  padding: 0 10px;
}

// 对比部分
.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: @text-primary;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 2px;
  }

  .icon {
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;
}

.comparison-header {
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 1.4rem;

  &.bg-blue {
    background: @blue;
  }

  &.bg-green {
    background: @green;
  }
}

.comparison-body {
  padding: 25px;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  h4 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 15px;
    position: relative;
    padding-left: 15px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 16px;
      border-radius: 3px;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
}

.pros {
  h4::before {
    background: @success-color;
  }
}

.cons {
  h4::before {
    background: @warning-color;
  }
}

.code-example {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  border: 1px solid @border-color;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: @text-primary;
  }

  pre {
    margin: 0;
    font-size: 0.9rem;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: #2c3e50;
      line-height: 1.5;
    }
  }
}

// 特性对比表
.feature-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background: fade(@primary-color, 8%);
    color: @primary-color;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: #f8f9fa;
  }

  tr:hover td {
    background: fade(@primary-color, 4%);
  }
}

// 使用场景
.case-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.case-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.case-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px auto 20px;
  color: white;
  font-size: 1.8rem;

  &.bg-blue {
    background: @blue;
  }

  &.bg-green {
    background: @green;
  }

  &.bg-purple {
    background: @purple;
  }
}

.case-card h3 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  padding: 0 20px;
  color: @text-primary;
}

.case-card ul {
  padding: 0 30px 30px;
  margin: 0;

  li {
    margin-bottom: 12px;
    line-height: 1.6;
  }
}

// 迁移示例
.example-tabs {
  .tabs {
    display: flex;
    border-bottom: 1px solid @border-color;
    margin-bottom: 20px;

    button {
      padding: 12px 25px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      position: relative;

      &.active {
        color: @primary-color;

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: @primary-color;
          border-radius: 3px 3px 0 0;
        }
      }
    }
  }
}

.tab-content {
  min-height: 400px;
}

.comparison-analysis {
  margin-top: 30px;
  padding: 20px;
  background: fade(@info-color, 10%);
  border-left: 4px solid @info-color;
  border-radius: 0 8px 8px 0;

  h3 {
    margin-top: 0;
    color: darken(@info-color, 15%);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
}

// 总结部分
.summary-content {
  .recommendation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }
}

.recommendation-item {
  text-align: center;
  padding: 25px;
  border: 1px solid @border-color;
  border-radius: 12px;

  .icon-badge {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: white;
    font-size: 1.8rem;

    &.bg-blue {
      background: @blue;
    }

    &.bg-green {
      background: @green;
    }
  }

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @text-primary;
  }

  ul {
    padding-left: 20px;
    text-align: left;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
}

.final-thoughts {
  background: #f9fbfd;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid @border-color;

  p {
    line-height: 1.8;
  }
}

// 页脚
.footer {
  text-align: center;
  padding: 40px 0 20px;
  margin-top: 50px;
  border-top: 1px solid @border-color;
  color: @text-secondary;

  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        color: darken(@primary-color, 10%);
        transform: translateY(-2px);
      }

      .icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 0 20px;

    h1 {
      font-size: 2rem;
    }
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .api-comparison {
    flex-direction: column;
    gap: 15px;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .card {
    padding: 20px;
  }

  .recommendation-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
