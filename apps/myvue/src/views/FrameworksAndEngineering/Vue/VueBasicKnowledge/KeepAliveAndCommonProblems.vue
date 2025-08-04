<template>
  <div class="keep-alive-container">
    <header class="header">
      <h1>Vue Keep-Alive 组件深度解析</h1>
      <p>掌握组件缓存技术与常见问题解决方案</p>
    </header>

    <div class="content-wrapper">
      <!-- 第一部分：介绍 -->
      <section class="section">
        <h2 class="section-title">什么是 Keep-Alive？</h2>
        <div class="section-content">
          <div class="intro">
            <div class="intro-text">
              <p>
                <code>keep-alive</code> 是 Vue 内置的一个抽象组件，用于保留组件状态或避免重新渲染。
              </p>
              <p>它通过缓存不活跃的组件实例，在组件切换时避免重复创建和销毁，从而提升应用性能。</p>
            </div>
            <div class="states-diagram">
              <div class="state active">激活状态</div>
              <div class="arrow">⇋</div>
              <div class="state cached">
                <div>缓存状态</div>
                <div class="sub">(Keep-Alive)</div>
              </div>
              <div class="arrow">→</div>
              <div class="state inactive">销毁状态</div>
            </div>
          </div>

          <div class="benefits">
            <h3>使用 Keep-Alive 的优点</h3>
            <div class="benefits-grid">
              <div class="benefit-card">
                <div class="icon performance"></div>
                <h4>性能优化</h4>
                <p>避免组件重复渲染，减少 DOM 操作</p>
              </div>
              <div class="benefit-card">
                <div class="icon state"></div>
                <h4>状态保持</h4>
                <p>保留组件状态和用户交互痕迹</p>
              </div>
              <div class="benefit-card">
                <div class="icon experience"></div>
                <h4>用户体验</h4>
                <p>组件切换更流畅，保留滚动位置</p>
              </div>
              <div class="benefit-card">
                <div class="icon resource"></div>
                <h4>资源节约</h4>
                <p>减少不必要的网络请求和数据加载</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第二部分：基础用法 -->
      <section class="section">
        <h2 class="section-title">Keep-Alive 基础用法</h2>
        <div class="section-content">
          <div class="usage">
            <div class="code-example">
              <h3>基本语法</h3>
              <pre><code class="language-html">&lt;!-- 基本使用 --&gt;
&lt;keep-alive&gt;
  &lt;component :is="currentComponent"&gt;&lt;/component&gt;
&lt;/keep-alive&gt;

&lt;!-- 结合 Vue Router --&gt;
&lt;router-view v-slot="{ Component }"&gt;
  &lt;keep-alive&gt;
    &lt;component :is="Component" /&gt;
  &lt;/keep-alive&gt;
&lt;/router-view&gt;</code></pre>
            </div>

            <div class="props-config">
              <h3>配置属性</h3>
              <div class="props-grid">
                <div class="prop">
                  <h4>include</h4>
                  <p>指定需要缓存的组件名称</p>
                  <pre><code>&lt;keep-alive :include="['Home', 'Profile']"&gt;</code></pre>
                </div>
                <div class="prop">
                  <h4>exclude</h4>
                  <p>指定不需要缓存的组件</p>
                  <pre><code>&lt;keep-alive :exclude="['Login', 'Register']"&gt;</code></pre>
                </div>
                <div class="prop">
                  <h4>max</h4>
                  <p>最大缓存组件实例数</p>
                  <pre><code>&lt;keep-alive :max="5"&gt;</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第三部分：生命周期 -->
      <section class="section">
        <h2 class="section-title">Keep-Alive 生命周期</h2>
        <div class="section-content">
          <div class="lifecycle">
            <div class="lifecycle-chart">
              <div class="phase">
                <div class="phase-title creation">初始创建</div>
                <div class="hooks">
                  <div class="hook">setup()</div>
                  <div class="hook">onBeforeMount()</div>
                  <div class="hook">onMounted()</div>
                </div>
              </div>

              <div class="arrow-down">↓</div>

              <div class="phase">
                <div class="phase-title active">激活状态</div>
                <div class="hooks">
                  <div class="hook">onActivated()</div>
                </div>
              </div>

              <div class="arrow-down">↓</div>

              <div class="phase">
                <div class="phase-title deactive">离开缓存</div>
                <div class="hooks">
                  <div class="hook">onDeactivated()</div>
                </div>
              </div>

              <div class="arrow-down">↓</div>

              <div class="phase">
                <div class="phase-title destroy">最终销毁</div>
                <div class="hooks">
                  <div class="hook">onBeforeUnmount()</div>
                  <div class="hook">onUnmounted()</div>
                </div>
              </div>
            </div>

            <div class="hook-details">
              <h3>特殊生命周期钩子</h3>
              <div class="hook-card">
                <h4>onActivated()</h4>
                <p>被 keep-alive 缓存的组件激活时调用</p>
                <pre><code class="language-ts">import { onActivated } from 'vue'

onActivated(() => {
  // 恢复滚动位置
  window.scrollTo(0, savedScrollPosition)

  // 刷新数据
  fetchData()
})</code></pre>
              </div>

              <div class="hook-card">
                <h4>onDeactivated()</h4>
                <p>被 keep-alive 缓存的组件失活时调用</p>
                <pre><code class="language-ts">import { onDeactivated } from 'vue'

onDeactivated(() => {
  // 保存滚动位置
  savedScrollPosition = window.scrollY

  // 暂停定时器
  clearInterval(timerId)
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第四部分：常见问题 -->
      <section class="section">
        <h2 class="section-title">Keep-Alive 常见问题与解决方案</h2>
        <div class="section-content">
          <div class="issues">
            <div class="issue">
              <div class="issue-number">1</div>
              <div class="issue-content">
                <h3>缓存组件不更新</h3>
                <p class="problem">问题：使用 keep-alive 后，组件返回时数据未更新</p>
                <div class="solution">
                  <p><strong>解决方案：</strong></p>
                  <pre><code class="language-ts">// 在 onActivated 钩子中刷新数据
onActivated(() => {
  fetchData()
})

// 使用 watch 监听路由变化
watch(() => route.params.id, (newId) => {
  if (isActive.value) fetchData()
})</code></pre>
                </div>
              </div>
            </div>

            <div class="issue">
              <div class="issue-number">2</div>
              <div class="issue-content">
                <h3>滚动位置不恢复</h3>
                <p class="problem">问题：返回缓存页面时滚动位置丢失</p>
                <div class="solution">
                  <p><strong>解决方案：</strong></p>
                  <pre><code class="language-ts">let savedScrollPosition = 0

onDeactivated(() => {
  savedScrollPosition = window.scrollY
})

onActivated(() => {
  window.scrollTo(0, savedScrollPosition)
})</code></pre>
                </div>
              </div>
            </div>

            <div class="issue">
              <div class="issue-number">3</div>
              <div class="issue-content">
                <h3>内存泄漏问题</h3>
                <p class="problem">问题：缓存过多组件导致内存占用过高</p>
                <div class="solution">
                  <p><strong>解决方案：</strong></p>
                  <ul>
                    <li>设置 <code>:max="5"</code> 限制最大缓存数</li>
                    <li>
                      在 <code>onDeactivated</code> 中清理资源：
                      <pre><code>onDeactivated(() => {
  clearInterval(timerId)
  cancelPendingRequests()
})</code></pre>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="issue">
              <div class="issue-number">4</div>
              <div class="issue-content">
                <h3>动态组件缓存失效</h3>
                <p class="problem">问题：动态切换组件时缓存不生效</p>
                <div class="solution">
                  <p><strong>解决方案：</strong> 确保组件有唯一的 key</p>
                  <pre><code class="language-html">&lt;keep-alive&gt;
  &lt;component
    :is="currentComponent"
    :key="currentComponent + route.params.id"&gt;
  &lt;/component&gt;
&lt;/keep-alive&gt;</code></pre>
                </div>
              </div>
            </div>

            <div class="issue">
              <div class="issue-number">5</div>
              <div class="issue-content">
                <h3>特定组件不被缓存</h3>
                <p class="problem">问题：需要某些组件完全不被缓存</p>
                <div class="solution">
                  <p><strong>解决方案：</strong> 使用 exclude 属性或路由守卫</p>
                  <pre><code class="language-html">&lt;!-- 使用 exclude 属性 --&gt;
&lt;keep-alive :exclude="['LoginPage', 'RegisterPage']"&gt;
  &lt;router-view /&gt;
&lt;/keep-alive&gt;

&lt;!-- 使用路由元信息 --&gt;
const router = createRouter({
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { keepAlive: true }
    },
    {
      path: '/login',
      component: Login,
      meta: { keepAlive: false }
    }
  ]
})</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第五部分：最佳实践 -->
      <section class="section">
        <h2 class="section-title">Keep-Alive 最佳实践</h2>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice">
              <div class="check-icon">✓</div>
              <div>
                <h3>合理使用 include/exclude</h3>
                <p>只缓存需要保持状态的组件，避免缓存大型组件或数据频繁变化的组件</p>
              </div>
            </div>

            <div class="practice">
              <div class="check-icon">✓</div>
              <div>
                <h3>设置 max 限制</h3>
                <p>避免缓存过多组件导致内存占用过高，建议设置最大缓存数</p>
              </div>
            </div>

            <div class="practice">
              <div class="check-icon">✓</div>
              <div>
                <h3>正确管理资源</h3>
                <p>在 onDeactivated 中清理定时器、事件监听器和未完成请求</p>
              </div>
            </div>

            <div class="practice">
              <div class="check-icon">✓</div>
              <div>
                <h3>结合路由元信息</h3>
                <p>使用路由 meta 字段动态控制缓存策略</p>
              </div>
            </div>

            <div class="practice">
              <div class="check-icon">✓</div>
              <div>
                <h3>手动控制缓存</h3>
                <p>通过 v-if 动态控制是否需要缓存</p>
                <pre><code class="language-html">&lt;keep-alive&gt;
  &lt;router-view v-if="route.meta.keepAlive" /&gt;
&lt;/keep-alive&gt;
&lt;router-view v-if="!route.meta.keepAlive" /&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>
        Keep-Alive 是 Vue
        性能优化的重要工具，合理使用可以显著提升用户体验。掌握其工作原理和常见问题解决方案，能帮助您构建更高效的应用。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要太多逻辑，主要是展示信息
</script>

<style lang="less" scoped>
@primary-color: #42b983;
@secondary-color: #35495e;
@background-color: #f8f9fa;
@border-color: #e0e0e0;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@code-bg: #f5f7fa;
@error-color: #e74c3c;
@warning-color: #f39c12;
@success-color: #2ecc71;
@info-color: #3498db;

.keep-alive-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.header {
  text-align: center;
  padding: 35px 0;
  border-bottom: 1px solid @border-color;
  margin-bottom: 30px;
  background: linear-gradient(to right, #f4fbf7, #f5f8ff);

  h1 {
    color: @primary-color;
    margin: 0;
    font-size: 2.4rem;
  }

  p {
    color: @light-text;
    font-size: 1.2rem;
    margin-top: 12px;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.section {
  background: @background-color;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
}

.section-title {
  color: @primary-color;
  border-bottom: 2px solid lighten(@primary-color, 25%);
  padding-bottom: 12px;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 1.6rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 50px;
    height: 3px;
    background: @primary-color;
    border-radius: 3px;
  }
}

.section-content {
  line-height: 1.6;
  color: @text-color;

  p {
    margin: 15px 0;
    color: @light-text;
  }
}

.intro {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .intro-text {
    flex: 1;
    padding-right: 20px;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
    }

    code {
      background: rgba(@primary-color, 0.1);
      color: darken(@primary-color, 10%);
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
  }
}

.states-diagram {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }

  .state {
    padding: 20px 15px;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    min-width: 120px;

    &.active {
      background: lighten(@success-color, 42%);
      color: darken(@success-color, 15%);
      border: 2px solid lighten(@success-color, 25%);
    }

    &.cached {
      background: lighten(@primary-color, 45%);
      color: darken(@primary-color, 15%);
      border: 2px solid lighten(@primary-color, 25%);

      .sub {
        font-size: 0.9rem;
        margin-top: 5px;
        font-weight: normal;
      }
    }

    &.inactive {
      background: lighten(@light-text, 45%);
      color: darken(@light-text, 15%);
      border: 2px solid lighten(@light-text, 30%);
    }
  }

  .arrow {
    font-weight: bold;
    color: @light-text;
    font-size: 1.5rem;
  }
}

.benefits {
  margin-top: 30px;

  h3 {
    margin-bottom: 20px;
    color: @secondary-color;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.benefit-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }

  .icon {
    width: 70px;
    height: 70px;
    margin: 0 auto 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.performance {
      background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    }
    &.state {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    }
    &.experience {
      background: linear-gradient(135deg, #fff8e1, #ffecb3);
    }
    &.resource {
      background: linear-gradient(135deg, #fbe9e7, #ffccbc);
    }

    &::before {
      content: '';
      width: 35px;
      height: 35px;
      background: currentColor;
      border-radius: 8px;
    }
  }

  h4 {
    margin: 0 0 10px 0;
    color: @text-color;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
}

.usage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-example {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

.props-config {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

.props-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-top: 10px;
}

.prop {
  padding: 15px;
  border: 1px solid @border-color;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px 0;
    color: @primary-color;
  }

  p {
    margin: 8px 0;
    font-size: 0.95rem;
  }
}

.lifecycle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.lifecycle-chart {
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.phase {
  background: @background-color;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .phase-title {
    font-weight: bold;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid @border-color;

    &.creation {
      color: @info-color;
    }
    &.active {
      color: @success-color;
    }
    &.deactive {
      color: @warning-color;
    }
    &.destroy {
      color: @error-color;
    }
  }

  .hooks {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .hook {
    background: white;
    padding: 10px 15px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
}

.arrow-down {
  text-align: center;
  margin: 10px 0;
  font-size: 1.5rem;
  color: @light-text;
}

.hook-details {
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

.hook-card {
  margin-top: 20px;
  padding: 15px;
  border-left: 4px solid @primary-color;
  background: lighten(@primary-color, 47%);
  border-radius: 0 8px 8px 0;

  h4 {
    margin: 0 0 8px 0;
    color: @primary-color;
  }
}

.issues {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.issue {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @warning-color;

  .issue-number {
    width: 36px;
    height: 36px;
    background: @warning-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 3px;
  }

  .problem {
    color: @error-color;
    font-weight: 500;
    margin: 10px 0;
    padding-left: 8px;
    border-left: 3px solid @error-color;
  }

  .solution {
    background: lighten(@success-color, 50%);
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;

    pre {
      margin: 10px 0 0;
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.practice {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @success-color;

  .check-icon {
    width: 36px;
    height: 36px;
    background: @success-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 3px;
  }

  h3 {
    margin: 0 0 10px 0;
    color: @text-color;
  }

  pre {
    margin: 10px 0 0;
  }
}

.footer {
  text-align: center;
  padding: 30px 0 15px;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1.1rem;
}

// 代码块样式
pre {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #2d333b;
  margin: 15px 0;

  code {
    font-family: inherit;
  }
}

pre.language-html,
pre.language-ts {
  position: relative;

  &::before {
    position: absolute;
    top: 5px;
    right: 10px;
    color: @light-text;
    font-size: 0.75rem;
    font-family: sans-serif;
  }
}

pre.language-html::before {
  content: 'HTML';
}

pre.language-ts::before {
  content: 'TypeScript';
}
</style>
