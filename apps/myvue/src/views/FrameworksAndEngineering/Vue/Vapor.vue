<template>
  <div class="vapor-container">
    <div class="header">
      <h1><span class="vapor-icon">☁️</span> Vue Vapor模式深度解析</h1>
      <p class="subtitle">下一代无虚拟DOM的高性能渲染引擎</p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>极致性能</h3>
        <p>跳过虚拟DOM直接操作原生DOM</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📦</div>
        <h3>轻量高效</h3>
        <p>大幅减少内存占用和CPU开销</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔄</div>
        <h3>渐进式</h3>
        <p>可在现有Vue应用中逐步采用</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3>精细控制</h3>
        <p>针对性能瓶颈组件进行优化</p>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title"><span class="section-icon">❓</span> 什么是Vue Vapor模式？</h2>

      <div class="definition">
        <p><strong>Vue Vapor模式</strong>是Vue 3.4引入的一种全新渲染策略，它通过跳过虚拟DOM的创建和对比过程，直接操作原生DOM来大幅提升性能。</p>

        <div class="core-concept">
          <h3>核心概念：</h3>
          <div class="concept-grid">
            <div class="concept">
              <div class="concept-icon">🚫</div>
              <div>
                <h4>无虚拟DOM</h4>
                <p>直接操作原生DOM元素</p>
              </div>
            </div>
            <div class="concept">
              <div class="concept-icon">🔧</div>
              <div>
                <h4>编译时优化</h4>
                <p>在构建时确定更新策略</p>
              </div>
            </div>
            <div class="concept">
              <div class="concept-icon">🚀</div>
              <div>
                <h4>直接更新</h4>
                <p>仅更新实际变化的DOM节点</p>
              </div>
            </div>
          </div>
        </div>

        <div class="technical-details">
          <h3>传统模式 vs Vapor模式</h3>
          <div class="comparison">
            <div class="approach">
              <h4>传统虚拟DOM流程</h4>
              <div class="steps">
                <div class="step">1. 状态变化</div>
                <div class="step">2. 创建新虚拟DOM树</div>
                <div class="step">3. Diff算法比较新旧树</div>
                <div class="step">4. 计算最小更新操作</div>
                <div class="step">5. 应用到真实DOM</div>
              </div>
              <div class="complexity">中等复杂度 · 内存占用较高</div>
            </div>

            <div class="vapor-arrow">➜</div>

            <div class="approach vapor">
              <h4>Vapor模式</h4>
              <div class="steps">
                <div class="step">1. 状态变化</div>
                <div class="step">2. 编译时生成的更新指令</div>
                <div class="step">3. 直接更新真实DOM</div>
              </div>
              <div class="complexity">低复杂度 · 高性能 · 内存占用低</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title"><span class="section-icon">💻</span> 如何使用Vapor模式？</h2>

      <div class="usage">
        <div class="basic-usage">
          <h3>全局启用Vapor模式</h3>
          <pre class="code-snippet">// main.ts
import { createApp } from 'vue'
import { createVaporApp } from 'vue/vapor'

import App from './App.vue'

// 创建Vapor应用
createVaporApp(App).mount('#app')</pre>
        </div>

        <div class="basic-usage">
          <h3>组件级启用Vapor模式</h3>
          <pre class="code-snippet">// Component.vue
&lt;script setup&gt;
import { vapor } from 'vue/vapor'

// 在组件中启用Vapor模式
vapor()
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 组件内容 --&gt;
  &lt;div&gt;使用Vapor模式渲染&lt;/div&gt;
&lt;/template&gt;</pre>
        </div>

        <div class="advanced-usage">
          <h3>进阶配置</h3>
          <div class="config-grid">
            <div class="config-card">
              <h4>编译选项</h4>
              <pre class="code-snippet">// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      vapor: {
        // 仅对带有vapor属性的组件启用
        enabled: true,
        // 包含特定文件
        include: [/\.vapor\.vue$/]
      }
    })
  ]
})</pre>
            </div>

            <div class="config-card">
              <h4>混合模式</h4>
              <pre class="code-snippet">// 父组件使用虚拟DOM
// 子组件使用Vapor模式
&lt;template&gt;
  &lt;div&gt;
    &lt;VirtualDOMComponent /&gt;
    &lt;VaporComponent vapor /&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title"><span class="section-icon">📊</span> 性能基准测试</h2>

      <div class="performance">
        <div class="metrics">
          <div class="metric">
            <div class="metric-value">2-5x</div>
            <div class="metric-label">渲染速度提升</div>
          </div>
          <div class="metric">
            <div class="metric-value">40-60%</div>
            <div class="metric-label">内存占用减少</div>
          </div>
          <div class="metric">
            <div class="metric-value">10-30%</div>
            <div class="metric-label">包体积减小</div>
          </div>
        </div>

        <div class="benchmark-chart">
          <div class="chart-title">渲染性能对比（毫秒）</div>
          <div class="chart-bars">
            <div class="bar-container">
              <div class="bar virtual" style="height: 180px; background-color: #e74c3c;">
                <div class="bar-value">180ms</div>
              </div>
              <div class="bar-label">虚拟DOM</div>
            </div>
            <div class="bar-container">
              <div class="bar vapor" style="height: 70px; background-color: #42b883;">
                <div class="bar-value">70ms</div>
              </div>
              <div class="bar-label">Vapor模式</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title"><span class="section-icon">🚀</span> Vapor模式使用场景</h2>

      <div class="use-cases">
        <div class="case">
          <div class="case-icon">✅</div>
          <div class="case-content">
            <h3>高性能组件</h3>
            <p>需要频繁更新的UI元素（如实时图表、数据仪表盘）</p>
          </div>
        </div>

        <div class="case">
          <div class="case-icon">✅</div>
          <div class="case-content">
            <h3>大型列表和表格</h3>
            <p>包含大量数据的可滚动列表和复杂表格</p>
          </div>
        </div>

        <div class="case">
          <div class="case-icon">✅</div>
          <div class="case-content">
            <h3>动画密集型应用</h3>
            <p>需要高帧率流畅动画的UI元素</p>
          </div>
        </div>

        <div class="case">
          <div class="case-icon">✅</div>
          <div class="case-content">
            <h3>低端设备优化</h3>
            <p>在移动设备和低性能硬件上提升体验</p>
          </div>
        </div>

        <div class="case">
          <div class="case-icon">⚠️</div>
          <div class="case-content">
            <h3>不适用场景</h3>
            <p>SSR应用、依赖虚拟DOM的库、复杂动态模板</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title"><span class="section-icon">💡</span> Vapor模式的优势</h2>

      <div class="advantages">
        <div class="advantage">
          <h3><span class="advantage-icon">⚡</span> 显著性能提升</h3>
          <p>通过跳过虚拟DOM的创建和diff过程，减少CPU开销和内存占用，提升渲染性能</p>
        </div>

        <div class="advantage">
          <h3><span class="advantage-icon">📉</span> 减少内存占用</h3>
          <p>不再需要存储虚拟DOM树，降低内存消耗，尤其对大型应用效果显著</p>
        </div>

        <div class="advantage">
          <h3><span class="advantage-icon">🔧</span> 编译时优化</h3>
          <p>在构建阶段分析模板结构，生成最优更新路径，减少运行时决策</p>
        </div>

        <div class="advantage">
          <h3><span class="advantage-icon">🔄</span> 渐进式采用</h3>
          <p>可以在现有项目中逐步引入，仅对性能关键组件启用</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title"><span class="section-icon">🚫</span> 注意事项与限制</h2>

      <div class="limitations">
        <div class="limitation">
          <h3>1. 动态模板限制</h3>
          <p>Vapor模式在编译时需要确定模板结构，因此动态组件(<code>&lt;component :is="..."&gt;</code>)和复杂运行时条件渲染可能不被完全支持</p>
        </div>

        <div class="limitation">
          <h3>2. 第三方库兼容性</h3>
          <p>依赖虚拟DOM的库（如某些动画库、过渡效果库）可能需要适配</p>
        </div>

        <div class="limitation">
          <h3>3. SSR支持</h3>
          <p>目前对服务器端渲染的支持有限，不适合完全SSR的应用</p>
        </div>

        <div class="limitation">
          <h3>4. 开发者工具</h3>
          <p>调试工具需要更新以支持Vapor模式的组件树检查</p>
        </div>
      </div>
    </div>

    <div class="section migration">
      <h2 class="section-title"><span class="section-icon">🛠️</span> 迁移到Vapor模式</h2>

      <div class="migration-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>性能分析</h3>
            <p>使用DevTools识别性能瓶颈组件</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>逐步启用</h3>
            <p>先在性能关键组件启用Vapor模式</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>测试验证</h3>
            <p>进行全面的功能测试和性能测试</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>部署监控</h3>
            <p>监控生产环境性能指标</p>
          </div>
        </div>
      </div>

      <div class="resources">
        <h3>进一步学习资源：</h3>
        <ul>
          <li><a href="https://vuejs.org/guide/extras/vapor-mode.html" target="_blank">官方Vapor模式文档</a></li>
          <li><a href="https://github.com/vuejs/core/tree/main/packages/vapor" target="_blank">Vapor模式源码</a></li>
          <li><a href="https://vuejs.org/guide/best-practices/performance.html#vapor-mode" target="_blank">性能最佳实践</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #42b883;
@secondary-color: #35495e;
@text-primary: #2c3e50;
@text-secondary: #7f8c8d;
@border-color: #e0e0e0;
@background-light: #f8fafc;
@card-bg: #ffffff;
@success-color: #42b883;
@warning-color: #ff9800;
@danger-color: #e53935;

.vapor-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 40px 0;
  margin-bottom: 20px;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: @text-primary;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .vapor-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      padding-bottom: 15px;
    }
  }

  .subtitle {
    font-size: 1.4rem;
    color: @text-secondary;
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 50px;

  .feature-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 20px;
      display: inline-block;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 12px;
      color: @text-primary;
    }

    p {
      color: @text-secondary;
      font-size: 0.95rem;
      margin: 0;
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 35px;
  margin-bottom: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 15px;

    .section-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      background: fade(@primary-color, 10%);
      color: @primary-color;
      border-radius: 50%;
      font-size: 1.4rem;
    }
  }
}

.definition {
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 30px;
    background: fade(@primary-color, 3%);
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid @primary-color;
  }

  .core-concept {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: @text-primary;
    }

    .concept-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .concept {
        display: flex;
        gap: 15px;
        padding: 20px;
        background: fade(@primary-color, 3%);
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

        .concept-icon {
          min-width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: fade(@primary-color, 10%);
          color: @primary-color;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.4rem;
        }

        h4 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: @text-primary;
        }

        p {
          font-size: 0.95rem;
          color: @text-secondary;
          margin: 0;
          background: none;
          padding: 0;
          border-left: none;
        }
      }
    }
  }

  .technical-details {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 25px;
      color: @text-primary;
    }

    .comparison {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      align-items: center;
      justify-content: center;

      .approach {
        flex: 1;
        min-width: 300px;
        padding: 25px;
        border-radius: 12px;
        background: #ffffff;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        border-top: 4px solid #e74c3c;

        &.vapor {
          border-top: 4px solid @primary-color;
        }

        h4 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 20px;
          text-align: center;
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;

          .step {
            padding: 15px;
            background: fade(@text-secondary, 5%);
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            position: relative;

            &:not(:last-child)::after {
              content: '';
              position: absolute;
              bottom: -15px;
              left: 50%;
              transform: translateX(-50%);
              width: 2px;
              height: 15px;
              background: @border-color;
            }
          }
        }

        .complexity {
          text-align: center;
          font-weight: 600;
          color: @text-secondary;
          padding: 10px;
          border-radius: 6px;
          background: fade(@text-secondary, 5%);
        }
      }

      .vapor-arrow {
        font-size: 2.5rem;
        color: @text-secondary;
        display: flex;
        align-items: center;
      }
    }
  }
}

.code-snippet {
  background: #2d3747;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-x: auto;
  margin-bottom: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  .comment {
    color: #a0aec0;
  }

  .keyword {
    color: #63b3ed;
  }

  .function {
    color: #f6e05e;
  }

  .string {
    color: #68d391;
  }
}

.usage {

  .basic-usage,
  .advanced-usage {
    margin-bottom: 35px;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: @text-primary;
      padding-left: 10px;
      border-left: 4px solid @primary-color;
    }
  }

  .config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;

    .config-card {
      h4 {
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 15px;
        color: @primary-color;
        padding-left: 8px;
        border-left: 3px solid @primary-color;
      }
    }
  }
}

.performance {
  .metrics {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 40px;
    flex-wrap: wrap;

    .metric {
      text-align: center;
      padding: 20px;
      min-width: 150px;

      .metric-value {
        font-size: 2.2rem;
        font-weight: 800;
        color: @primary-color;
        margin-bottom: 10px;
      }

      .metric-label {
        font-size: 1rem;
        color: @text-secondary;
      }
    }
  }

  .benchmark-chart {
    background: #ffffff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: inset 0 0 0 1px @border-color;

    .chart-title {
      font-weight: 600;
      margin-bottom: 25px;
      text-align: center;
      color: @text-primary;
    }

    .chart-bars {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 40px;
      height: 250px;
      padding: 0 50px;

      .bar-container {
        text-align: center;

        .bar {
          width: 100px;
          border-radius: 8px 8px 0 0;
          position: relative;
          transition: height 1s ease;

          .bar-value {
            position: absolute;
            top: -30px;
            left: 0;
            width: 100%;
            font-weight: 600;
          }

          &.virtual {
            background: linear-gradient(to top, #e74c3c, #e74c3c);
          }

          &.vapor {
            background: linear-gradient(to top, @primary-color, @primary-color);
          }
        }

        .bar-label {
          margin-top: 15px;
          font-weight: 600;
        }
      }
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .case {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: fade(@primary-color, 3%);
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

    .case-icon {
      font-size: 1.6rem;
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: @text-secondary;
    }
  }
}

.advantages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;

  .advantage {
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-left: 4px solid @primary-color;

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;

      .advantage-icon {
        font-size: 1.4rem;
      }
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: @text-secondary;
      line-height: 1.7;
    }
  }
}

.limitations {
  .limitation {
    padding: 20px 0;
    border-bottom: 1px solid @border-color;

    &:last-child {
      border-bottom: none;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 12px;
      color: @text-primary;
    }

    p {
      margin: 0;
      font-size: 1rem;
      color: @text-secondary;
      line-height: 1.7;

      code {
        background: fade(@text-secondary, 8%);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }
  }
}

.migration-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  .step {
    display: flex;
    gap: 15px;

    .step-number {
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      font-weight: 700;
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 8px;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: @text-secondary;
    }
  }
}

.resources {
  border-top: 1px solid @border-color;
  padding-top: 25px;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: @text-primary;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 15px;
      font-size: 1.05rem;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: "🔗";
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .section {
    padding: 25px 20px;
  }

  .concept-grid,
  .config-grid,
  .use-cases,
  .advantages,
  .migration-steps {
    grid-template-columns: 1fr !important;
  }

  .technical-details .comparison {
    flex-direction: column;

    .vapor-arrow {
      transform: rotate(90deg);
      margin: 20px 0;
    }
  }

  .performance .chart-bars {
    gap: 20px;
    padding: 0 10px;

    .bar-container {
      .bar {
        width: 80px;
      }
    }
  }
}
</style>
