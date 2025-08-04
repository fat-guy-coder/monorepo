<template>
  <div class="custom-hooks-container">
    <header class="header">
      <div class="logo-container">
        <svg class="vue-logo" viewBox="0 0 261.76 226.69">
          <path fill="#41b883" d="M161.096.001l-30.224 52.35L100.647.002H-.005L130.872 226.69 261.749 0z" />
          <path fill="#34495e" d="M100.647.002L52.346 87.267 30.55 52.35 0 87.27l130.86 139.42L261.74 87.27 222.9 0z" />
        </svg>
        <h1>Vue 自定义 Hooks 基本介绍</h1>
      </div>
      <p class="subtitle">提升代码复用性与组件逻辑组织能力</p>
    </header>

    <div class="content-wrapper">
      <nav class="sidebar">
        <ul>
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 概念部分 -->
        <section v-show="activeSection === 'concept'" class="section">
          <h2><i class="icon-info"></i>自定义 Hooks 概念</h2>
          <div class="card">
            <div class="concept-box">
              <div class="concept-item">
                <div class="concept-icon">🔄</div>
                <h3>什么是自定义 Hooks？</h3>
                <p>自定义 Hooks 是 Vue 3 组合式 API 的一种高级用法，允许您将组件逻辑提取到可重用的函数中。</p>
              </div>
              <div class="concept-item">
                <div class="concept-icon">🧩</div>
                <h3>与 Mixins 的区别</h3>
                <p>相比 Mixins，自定义 Hooks 具有更清晰的代码组织和类型支持，避免了命名冲突和隐式依赖问题。</p>
              </div>
              <div class="concept-item">
                <div class="concept-icon">💡</div>
                <h3>核心思想</h3>
                <p>基于组合式 API 的函数封装，使组件逻辑可组合、可复用、可测试。</p>
              </div>
            </div>

            <div class="highlight-box">
              <h3>基本结构</h3>
              <div class="code-block">
                <pre><code>// useCounter.ts - 一个简单的计数器 Hook
import { ref } from 'vue';

export default function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initialValue;

  return {
    count,
    increment,
    decrement,
    reset
  };
}</code></pre>
              </div>
            </div>

            <div class="features">
              <div class="feature">
                <div class="feature-icon">📦</div>
                <h4>封装逻辑</h4>
                <p>将相关逻辑组织在单一函数中</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <h4>复用代码</h4>
                <p>在多个组件间共享逻辑</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🧪</div>
                <h4>独立测试</h4>
                <p>可独立于组件进行测试</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🧩</div>
                <h4>组合能力</h4>
                <p>多个 Hooks 可组合使用</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用方法部分 -->
        <section v-show="activeSection === 'usage'" class="section">
          <h2><i class="icon-code"></i>使用方法</h2>
          <div class="card">
            <h3>在组件中使用自定义 Hooks</h3>
            <div class="usage-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>创建 Hook 文件</h4>
                  <p>在项目中创建 <code>src/hooks</code> 目录存放自定义 Hooks</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>定义 Hook 函数</h4>
                  <p>使用组合式 API 编写可复用逻辑</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>在组件中导入</h4>
                  <p>在组件 <code>setup()</code> 中导入并使用 Hook</p>
                </div>
              </div>
            </div>

            <div class="code-comparison">
              <div class="code-example">
                <h4>自定义 Hook 文件</h4>
                <div class="code-block">
                  <pre><code>// useWindowSize.ts
import { ref, onMounted, onUnmounted } from 'vue';

export default function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => window.addEventListener('resize', update));
  onUnmounted(() => window.removeEventListener('resize', update));

  return { width, height };
}</code></pre>
                </div>
              </div>

              <div class="code-example">
                <h4>在组件中使用</h4>
                <div class="code-block">
                  <pre><code>// Component.vue
&lt;script setup lang="ts"&gt;
import useWindowSize from '@/hooks/useWindowSize';

const { width, height } = useWindowSize();
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;窗口宽度: &#123;&#123; width &#125;&#125;px&lt;/p&gt;
    &lt;p&gt;窗口高度: &#123;&#123; height &#125;&#125;px&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
                </div>
              </div>
            </div>

            <div class="tip-box">
              <div class="tip-icon">💡</div>
              <div>
                <strong>最佳实践：</strong>
                <p>使用 TypeScript 为自定义 Hook 提供类型定义，增强代码提示和类型安全</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用场景部分 -->
        <section v-show="activeSection === 'scenarios'" class="section">
          <h2><i class="icon-apps"></i>使用场景</h2>
          <div class="card">
            <div class="use-cases">
              <div class="use-case">
                <div class="case-icon">🌐</div>
                <h3>API 数据获取</h3>
                <p>封装数据请求逻辑，处理加载状态、错误处理等</p>
                <div class="case-code">
                  <code>useFetch</code>
                  <code>useApi</code>
                </div>
              </div>
              <div class="use-case">
                <div class="case-icon">🖥️</div>
                <h3>浏览器交互</h3>
                <p>处理窗口大小、滚动位置、设备检测等</p>
                <div class="case-code">
                  <code>useWindowSize</code>
                  <code>useScroll</code>
                </div>
              </div>
              <div class="use-case">
                <div class="case-icon">⏱️</div>
                <h3>定时器与动画</h3>
                <p>管理 setInterval/setTimeout，动画帧请求</p>
                <div class="case-code">
                  <code>useInterval</code>
                  <code>useAnimation</code>
                </div>
              </div>
              <div class="use-case">
                <div class="case-icon">📱</div>
                <h3>表单处理</h3>
                <p>管理表单状态、验证、提交逻辑</p>
                <div class="case-code">
                  <code>useForm</code>
                  <code>useField</code>
                </div>
              </div>
            </div>

            <h3>实际应用示例</h3>
            <div class="real-world-example">
              <div class="example-desc">
                <h4>数据获取 Hook</h4>
                <p>封装了数据请求的全过程，包括加载状态、错误处理和缓存机制</p>
              </div>
              <div class="code-block">
                <pre><code>// useFetch.ts
import { ref } from 'vue';

export default function useFetch&lt;T&gt;(url: string) {
  const data = ref&lt;T | null&gt;(null);
  const loading = ref(true);
  const error = ref&lt;Error | null&gt;(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, loading, error, refetch: fetchData };
}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 优缺点部分 -->
        <section v-show="activeSection === 'pros-cons'" class="section">
          <h2><i class="icon-balance"></i>优缺点分析</h2>
          <div class="card">
            <div class="pros-cons">
              <div class="pros">
                <h3>优点</h3>
                <ul>
                  <li>
                    <div class="icon">✅</div>
                    <div>
                      <strong>逻辑复用</strong>
                      <p>减少重复代码，提高代码复用率</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">✅</div>
                    <div>
                      <strong>关注点分离</strong>
                      <p>使组件更专注于视图渲染</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">✅</div>
                    <div>
                      <strong>类型安全</strong>
                      <p>TypeScript 提供良好的类型支持</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">✅</div>
                    <div>
                      <strong>可测试性</strong>
                      <p>逻辑可独立于组件进行测试</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">✅</div>
                    <div>
                      <strong>组合能力</strong>
                      <p>多个 Hooks 可组合形成更复杂逻辑</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="cons">
                <h3>缺点</h3>
                <ul>
                  <li>
                    <div class="icon">⚠️</div>
                    <div>
                      <strong>学习曲线</strong>
                      <p>需要理解组合式 API 和响应式原理</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">⚠️</div>
                    <div>
                      <strong>过度抽象</strong>
                      <p>简单逻辑过度封装反而增加复杂度</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">⚠️</div>
                    <div>
                      <strong>调试难度</strong>
                      <p>逻辑分散在不同文件可能增加调试难度</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">⚠️</div>
                    <div>
                      <strong>命名约定</strong>
                      <p>需要团队统一命名规范（如 useXxx）</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon">⚠️</div>
                    <div>
                      <strong>依赖管理</strong>
                      <p>需要谨慎管理 Hook 间的依赖关系</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="recommendation">
              <h3>使用建议</h3>
              <div class="recommend-grid">
                <div class="recommend-item">
                  <div class="recommend-icon">📌</div>
                  <p>从简单逻辑开始，逐步提取自定义 Hook</p>
                </div>
                <div class="recommend-item">
                  <div class="recommend-icon">📌</div>
                  <p>保持 Hook 功能单一，避免过于复杂</p>
                </div>
                <div class="recommend-item">
                  <div class="recommend-icon">📌</div>
                  <p>为 Hook 提供清晰的文档和类型定义</p>
                </div>
                <div class="recommend-item">
                  <div class="recommend-icon">📌</div>
                  <p>在团队中建立统一的 Hook 规范</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>© 2023 Vue 自定义 Hooks 指南 | 使用 Vue3 组合式 API 实现</p>
      <p>Vue.js 是 Evan You 的注册商标</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'concept', title: '概念解析' },
  { id: 'usage', title: '使用方法' },
  { id: 'scenarios', title: '使用场景' },
  { id: 'pros-cons', title: '优缺点' }
]);

// 当前活动部分
const activeSection = ref('concept');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #42b883;
@primary-dark: #2c774b;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@accent-color: #35495e;
@success-color: #42b883;
@warning-color: #f59e0b;
@error-color: #ff6b6b;

// 混合
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition {
  transition: all 0.3s ease;
}

// 全局样式
.custom-hooks-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: @background;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding: 0;
  margin: 0;
}

.header {
  background: linear-gradient(135deg, darken(@primary-color, 10%), @primary-color);
  color: white;
  text-align: center;
  padding: 2.5rem 1rem;
  margin-bottom: 2rem;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 300;
  }
}

.vue-logo {
  width: 70px;
  height: 60px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 220px;
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem 0;
  .box-shadow;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    .transition;

    &:hover {
      background-color: lighten(@primary-color, 50%);
    }

    &.active {
      background-color: lighten(@primary-color, 45%);
      border-left: 4px solid @primary-color;
      font-weight: 600;
      color: @primary-dark;
    }
  }
}

.main-content {
  flex: 1;
}

.section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.75rem;
    color: @primary-dark;
    margin-top: 0;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    i {
      font-size: 1.5rem;
    }
  }
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .box-shadow;

  h3 {
    color: @accent-color;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
  }

  h4 {
    color: @primary-dark;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: @text-secondary;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: @text-secondary;
    }
  }
}

.concept-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .concept-item {
    background: lighten(@primary-color, 50%);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    .box-shadow;

    .concept-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      color: @primary-dark;
    }
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  .feature {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    .box-shadow;
    .transition;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
    }

    &-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
      color: @primary-color;
    }
  }
}

.code-block {
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;

  pre {
    margin: 0;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    color: #2f363d;
  }
}

.highlight-box {
  background: lighten(@primary-color, 50%);
  border-left: 4px solid @primary-color;
  border-radius: 0 8px 8px 0;
  padding: 1.5rem;
  margin: 2rem 0;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;

  .step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    &-number {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
}

.code-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.tip-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: lighten(@warning-color, 45%);
  border-left: 4px solid @warning-color;
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
  margin-top: 2rem;

  .tip-icon {
    font-size: 1.8rem;
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .use-case {
    background: white;
    border-radius: 10px;
    padding: 1.75rem 1.5rem;
    text-align: center;
    .box-shadow;
    .transition;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }

    .case-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    .case-code {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;

      code {
        background: lighten(@primary-color, 50%);
        color: @primary-dark;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }
  }
}

.real-world-example {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    .box-shadow;

    h3 {
      text-align: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid @border-color;
      margin-top: 0;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid @border-color;

      &:last-child {
        border-bottom: none;
      }

      .icon {
        font-size: 1.5rem;
        min-width: 30px;
      }
    }
  }
}

.recommendation {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;

  .recommend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .recommend-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: lighten(@primary-color, 50%);
    border-radius: 8px;
    padding: 1.25rem;

    .recommend-icon {
      font-size: 1.5rem;
      color: @primary-color;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background: @card-bg;
  color: @text-secondary;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式设计
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 0 1rem;
  }

  .sidebar {
    flex: none;
    width: 100%;
  }

  .header h1 {
    font-size: 2rem;
  }

  .code-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
