<template>
  <div class="signals-container">
    <header>
      <h1>前端 Signals 响应式系统</h1>
      <p>现代化前端框架中的下一代响应式状态管理方案</p>
      <div class="header-subtitle">
        <span class="tag">响应式编程</span>
        <span class="tag">状态管理</span>
        <span class="tag">性能优化</span>
        <span class="tag">框架设计</span>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="main-content">
        <section class="intro-section">
          <h2><span class="icon">🚀</span> 什么是 Signals？</h2>
          <div class="card">
            <p>
              <strong>Signals</strong>
              是一种细粒度的响应式状态管理原语，它通过自动跟踪依赖关系和高效更新机制，为现代前端应用提供了高性能的状态管理解决方案。
            </p>

            <div class="features">
              <div class="feature">
                <div class="feature-icon">⚡</div>
                <div>
                  <h3>细粒度响应式</h3>
                  <p>只更新真正发生变化的部分，避免不必要的渲染</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">📊</div>
                <div>
                  <h3>自动依赖追踪</h3>
                  <p>自动收集和跟踪依赖关系，无需手动声明</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <div>
                  <h3>高效更新机制</h3>
                  <p>使用编译时优化和运行时策略确保高性能</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="characteristics-section">
          <h2><span class="icon">🌟</span> 核心特点</h2>
          <div class="characteristics-grid">
            <div class="characteristic-card">
              <div class="char-icon">🎯</div>
              <h3>细粒度更新</h3>
              <p>只更新依赖特定状态变化的组件，而不是整棵树重新渲染</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">📝</div>
              <h3>无虚拟DOM开销</h3>
              <p>直接操作DOM，避免虚拟DOM的diff和patch过程</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🚀</div>
              <h3>卓越性能</h3>
              <p>在复杂应用中提供接近原生的性能表现</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🧠</div>
              <h3>自动依赖追踪</h3>
              <p>运行时自动收集依赖，无需手动声明依赖数组</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🔧</div>
              <h3>编译时优化</h3>
              <p>结合编译技术进行静态分析和优化</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">💾</div>
              <h3>内存高效</h3>
              <p>最小化内存使用，避免不必要的闭包和引用</p>
            </div>
          </div>
        </section>

        <section class="implementation-section">
          <h2><span class="icon">⚙️</span> 实现原理</h2>
          <div class="card">
            <div class="implementation-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>信号创建</h3>
                  <p>使用 <code>createSignal()</code> 创建响应式值，返回getter和setter函数</p>
                  <pre>const [count, setCount] = createSignal(0);</pre>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>依赖追踪</h3>
                  <p>在effect或memo中访问信号时自动建立依赖关系</p>
                  <pre>
createEffect(() => {
  console.log("Count:", count());
});</pre
                  >
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>更新传播</h3>
                  <p>信号变化时通知所有依赖项，触发重新执行</p>
                  <pre>setCount(5); // 触发effect重新运行</pre>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>批量更新</h3>
                  <p>使用事务或批量处理机制优化多次更新</p>
                  <pre>
batch(() => {
  setCount(1);
  setName("John");
}); // 只触发一次更新</pre
                  >
                </div>
              </div>
            </div>

            <div class="code-comparison">
              <h3>与传统响应式系统对比</h3>
              <div class="comparison-tabs">
                <div
                  v-for="(tab, index) in comparisonTabs"
                  :key="index"
                  :class="['tab', { active: activeComparisonTab === index }]"
                  @click="activeComparisonTab = index"
                >
                  {{ tab }}
                </div>
              </div>

              <div class="comparison-content">
                <div v-if="activeComparisonTab === 0" class="comparison-example">
                  <h4>Signals 实现</h4>
                  <pre>
// 创建信号
const [count, setCount] = createSignal(0);
const [name, setName] = createSignal("John");

// 自动依赖追踪
createEffect(() => {
  console.log(`${name()} has ${count()} items`);
});

// 更新信号
setCount(5); // 只触发相关effect</pre
                  >
                </div>

                <div v-if="activeComparisonTab === 1" class="comparison-example">
                  <h4>传统响应式实现</h4>
                  <pre>
// 定义响应式对象
const state = reactive({
  count: 0,
  name: "John"
});

// 需要手动声明依赖
watchEffect(() => {
  console.log(`${state.name} has ${state.count} items`);
});

// 更新状态
state.count = 5; // 可能触发不必要的检查</pre
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="frameworks-section">
          <h2><span class="icon">🔧</span> 框架实现</h2>
          <div class="card">
            <div class="frameworks-grid">
              <div class="framework">
                <div class="framework-logo">⚡</div>
                <div class="framework-info">
                  <h3>SolidJS</h3>
                  <p>完全基于Signals构建，提供最纯粹的Signals体验</p>
                  <div class="framework-features">
                    <span>编译时优化</span>
                    <span>无虚拟DOM</span>
                    <span>接近原生性能</span>
                  </div>
                </div>
              </div>
              <div class="framework">
                <div class="framework-logo">🅰️</div>
                <div class="framework-info">
                  <h3>Angular Signals</h3>
                  <p>Angular 16+ 引入的响应式原语，与Zone.js协同工作</p>
                  <div class="framework-features">
                    <span>渐进式采用</span>
                    <span>与Zone.js集成</span>
                    <span>向后兼容</span>
                  </div>
                </div>
              </div>
              <div class="framework">
                <div class="framework-logo">🔍</div>
                <div class="framework-info">
                  <h3>Preact Signals</h3>
                  <p>Preact的响应式扩展，提供细粒度状态管理</p>
                  <div class="framework-features">
                    <span>轻量级</span>
                    <span>与Preact无缝集成</span>
                    <span>可选使用</span>
                  </div>
                </div>
              </div>
              <div class="framework">
                <div class="framework-logo">⚛️</div>
                <div class="framework-info">
                  <h3>React Forget</h3>
                  <p>React的编译器优化，自动生成类似Signals的代码</p>
                  <div class="framework-features">
                    <span>编译时优化</span>
                    <span>无需API变更</span>
                    <span>自动依赖追踪</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="sidebar">
        <section class="pros-cons-section">
          <h2><span class="icon">⚖️</span> 优缺点分析</h2>
          <div class="card">
            <div class="pros-cons">
              <div class="pros">
                <h3>优点</h3>
                <ul>
                  <li>卓越的性能表现，特别是复杂应用场景</li>
                  <li>细粒度更新，避免不必要的渲染</li>
                  <li>自动依赖追踪，减少手动维护成本</li>
                  <li>内存使用高效，减少资源消耗</li>
                  <li>更好的开发者体验，代码更简洁</li>
                  <li>编译时优化潜力大</li>
                </ul>
              </div>
              <div class="cons">
                <h3>挑战</h3>
                <ul>
                  <li>概念较新，学习曲线存在</li>
                  <li>生态系统相对年轻</li>
                  <li>调试工具和支持不如传统方案成熟</li>
                  <li>需要编译器支持以获得最佳性能</li>
                  <li>与传统响应式系统思维模式不同</li>
                  <li>可能产生更细粒度的更新流需要管理</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="usage-section">
          <h2><span class="icon">💡</span> 使用场景</h2>
          <div class="card">
            <div class="usage">
              <div class="usage-icon">📊</div>
              <div>
                <h3>数据密集型应用</h3>
                <p>需要处理大量数据且更新频繁的应用</p>
              </div>
            </div>
            <div class="usage">
              <div class="usage-icon">🎮</div>
              <div>
                <h3>高性能UI</h3>
                <p>对性能要求极高的用户界面和动画</p>
              </div>
            </div>
            <div class="usage">
              <div class="usage-icon">🔢</div>
              <div>
                <h3>实时数据处理</h3>
                <p>需要实时更新和显示数据的场景</p>
              </div>
            </div>
            <div class="usage">
              <div class="usage-icon">📱</div>
              <div>
                <h3>移动端应用</h3>
                <p>资源受限环境下的高性能应用</p>
              </div>
            </div>
            <div class="usage">
              <div class="usage-icon">🧪</div>
              <div>
                <h3>复杂状态逻辑</h3>
                <p>具有复杂状态依赖关系的应用</p>
              </div>
            </div>
          </div>
        </section>

        <section class="concepts-section">
          <h2><span class="icon">📚</span> 核心概念</h2>
          <div class="card">
            <div class="concept">
              <h3>Signal</h3>
              <p>响应式值容器，包含当前值和更新函数</p>
            </div>
            <div class="concept">
              <h3>Effect</h3>
              <p>副作用函数，自动追踪其内部使用的信号</p>
            </div>
            <div class="concept">
              <h3>Memo</h3>
              <p>派生信号，基于其他信号计算得到的缓存值</p>
            </div>
            <div class="concept">
              <h3>Batch</h3>
              <p>批量更新操作，优化多次状态变更的性能</p>
            </div>
            <div class="concept">
              <h3>Computed</h3>
              <p>计算属性，根据其他信号自动计算的值</p>
            </div>
          </div>
        </section>

        <section class="resources-section">
          <h2><span class="icon">🔗</span> 学习资源</h2>
          <div class="card">
            <div class="resource">
              <h3>官方文档</h3>
              <p>SolidJS文档 - Signals章节</p>
            </div>
            <div class="resource">
              <h3>技术文章</h3>
              <p>"Introducing Angular Signals"官方博客</p>
            </div>
            <div class="resource">
              <h3>视频教程</h3>
              <p>YouTube上的Signals原理和实战教程</p>
            </div>
            <div class="resource">
              <h3>实践项目</h3>
              <p>使用Signals构建TodoMVC或数据看板</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="performance-section">
      <h2><span class="icon">📈</span> 性能对比</h2>
      <div class="card">
        <div class="performance-chart">
          <div class="chart-bars">
            <div class="chart-bar" v-for="(item, index) in performanceData" :key="index">
              <div class="bar-label">{{ item.framework }}</div>
              <div class="bar-container">
                <div
                  class="bar-fill"
                  :style="{ width: item.value + '%', backgroundColor: item.color }"
                ></div>
              </div>
              <div class="bar-value">{{ item.value }}%</div>
            </div>
          </div>
          <div class="chart-legend">
            <p>基于JS Framework Benchmark的性能测试结果（数值越高性能越好）</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>Signals代表了前端响应式系统的发展方向，为构建高性能应用提供了新的解决方案</p>
      <div class="footer-links">
        <span>响应式编程</span> • <span>状态管理</span> • <span>性能优化</span> •
        <span>前端架构</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const activeComparisonTab = ref(0)
const comparisonTabs = ['Signals 示例', '传统响应式示例']

// 性能数据
const performanceData = ref([
  { framework: 'SolidJS (Signals)', value: 98, color: '#3498db' },
  { framework: 'Vanilla JS', value: 100, color: '#2ecc71' },
  { framework: 'Preact (Signals)', value: 92, color: '#3498db' },
  { framework: 'Vue 3', value: 85, color: '#f39c12' },
  { framework: 'React 18', value: 75, color: '#f39c12' },
  { framework: 'Angular 16', value: 70, color: '#f39c12' },
])
</script>

<style scoped lang="less">
:root {
  --primary: #3498db;
  --primary-light: #e1f0fa;
  --secondary: #2ecc71;
  --accent: #e74c3c;
  --light: #f8f9fa;
  --dark: #2c3e50;
  --gray: #7f8c8d;
  --light-gray: #ecf0f1;
  --border: #bdc3c7;
  --shadow: rgba(0, 0, 0, 0.08);
}

.signals-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #333;
  min-height: 100vh;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(52, 152, 219, 0.15);

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      color: var(--gray);
      max-width: 800px;
      margin: 0 auto 20px;
      line-height: 1.6;
    }

    .header-subtitle {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;

      .tag {
        background: rgba(255, 255, 255, 0.8);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.95rem;
        color: var(--primary);
        font-weight: 500;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(52, 152, 219, 0.2);
      }
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 25px;
    margin-bottom: 40px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  h2 {
    font-size: 1.6rem;
    color: var(--dark);
    margin-top: 0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 10px;
      font-size: 1.4rem;
    }
  }

  .card {
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 18px var(--shadow);
    padding: 25px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-3px);
    }
  }

  .intro-section {
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 25px;

      .feature {
        display: flex;
        gap: 15px;
        padding: 18px;
        background: var(--primary-light);
        border-radius: 12px;
        border-left: 4px solid var(--primary);

        .feature-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        h3 {
          font-size: 1.2rem;
          margin: 0 0 8px 0;
          color: var(--dark);
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--gray);
          line-height: 1.5;
        }
      }
    }
  }

  .characteristics-section {
    .characteristics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .characteristic-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 12px var(--shadow);
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-5px);
        }

        .char-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.2rem;
          margin: 0 0 10px 0;
          color: var(--dark);
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--gray);
          line-height: 1.5;
        }
      }
    }
  }

  .implementation-section {
    .implementation-steps {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;

      .step {
        display: flex;
        gap: 18px;
        position: relative;
        padding-left: 15px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--primary), #3498db00);
        }

        &:last-child::before {
          height: 40px;
        }

        .step-number {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          margin-top: 5px;
        }

        .step-content {
          h3 {
            font-size: 1.2rem;
            margin: 0 0 8px 0;
            color: var(--dark);
          }

          p {
            margin: 0 0 15px 0;
            font-size: 1rem;
            color: var(--gray);
            line-height: 1.6;
          }

          pre {
            background: #2c3e50;
            color: #f1f2f6;
            border-radius: 8px;
            padding: 15px;
            font-size: 0.9rem;
            overflow-x: auto;
            margin-top: 10px;
          }
        }
      }
    }

    .code-comparison {
      h3 {
        font-size: 1.3rem;
        margin: 0 0 20px 0;
        color: var(--dark);
      }

      .comparison-tabs {
        display: flex;
        gap: 5px;
        margin-bottom: 20px;
        background: var(--light-gray);
        border-radius: 10px;
        padding: 5px;

        .tab {
          flex: 1;
          text-align: center;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;

          &:hover {
            background: rgba(52, 152, 219, 0.1);
          }

          &.active {
            background: rgba(232, 246, 255, 0.1);
          }
        }
      }

      .comparison-content {
        .comparison-example {
          h4 {
            font-size: 1.1rem;
            margin: 0 0 15px 0;
            color: var(--dark);
          }

          pre {
            background: #2c3e50;
            color: #f1f2f6;
            border-radius: 10px;
            padding: 20px;
            font-size: 0.95rem;
            overflow-x: auto;
            line-height: 1.5;
            margin: 0;
          }
        }
      }
    }
  }

  .frameworks-section {
    .frameworks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .framework {
        display: flex;
        gap: 15px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 12px;
        border-left: 4px solid var(--primary);

        .framework-logo {
          font-size: 2rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .framework-info {
          h3 {
            font-size: 1.2rem;
            margin: 0 0 8px 0;
            color: var(--dark);
          }

          p {
            margin: 0 0 12px 0;
            font-size: 0.95rem;
            color: var(--gray);
            line-height: 1.5;
          }

          .framework-features {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            span {
              background: rgba(52, 152, 219, 0.1);
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 0.8rem;
              color: var(--primary);
            }
          }
        }
      }
    }
  }

  .pros-cons-section {
    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }

      .pros,
      .cons {
        h3 {
          font-size: 1.2rem;
          margin: 0 0 15px 0;
          color: var(--dark);
          display: flex;
          align-items: center;

          &::before {
            content: '';
            width: 20px;
            height: 20px;
            margin-right: 10px;
            border-radius: 50%;
          }
        }

        ul {
          padding-left: 20px;
          margin: 0;

          li {
            margin-bottom: 10px;
            font-size: 0.95rem;
            line-height: 1.5;
            position: relative;

            &::before {
              content: '•';
              color: var(--primary);
              font-weight: bold;
              display: inline-block;
              width: 1em;
              margin-left: -1em;
            }
          }
        }
      }

      .pros h3::before {
        background: #2ecc71;
      }

      .cons h3::before {
        background: #e74c3c;
      }

      .cons ul li::before {
        color: #e74c3c;
      }
    }
  }

  .usage-section {
    .usage {
      display: flex;
      gap: 15px;
      padding: 15px;
      border-bottom: 1px solid var(--light-gray);

      &:last-child {
        border-bottom: none;
      }

      .usage-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        background: #e1f0fa;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3 {
        margin: 0 0 5px 0;
        font-size: 1.1rem;
        color: var(--dark);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--gray);
        line-height: 1.5;
      }
    }
  }

  .concepts-section {
    .concept {
      padding: 15px;
      border-bottom: 1px solid var(--light-gray);

      &:last-child {
        border-bottom: none;
      }

      h3 {
        font-size: 1.1rem;
        margin: 0 0 5px 0;
        color: var(--dark);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--gray);
        line-height: 1.5;
      }
    }
  }

  .resources-section {
    .resource {
      padding: 15px;
      border-bottom: 1px solid var(--light-gray);

      &:last-child {
        border-bottom: none;
      }

      h3 {
        font-size: 1.1rem;
        margin: 0 0 5px 0;
        color: var(--dark);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--gray);
        line-height: 1.5;
      }
    }
  }

  .performance-section {
    .performance-chart {
      .chart-bars {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 20px;

        .chart-bar {
          display: flex;
          align-items: center;

          .bar-label {
            width: 180px;
            font-size: 0.95rem;
            color: var(--dark);
            font-weight: 500;
          }

          .bar-container {
            flex: 1;
            height: 20px;
            background: #eef2f7;
            border-radius: 10px;
            overflow: hidden;
            margin: 0 15px;

            .bar-fill {
              height: 100%;
              border-radius: 10px;
              transition: width 1s ease-in-out;
            }
          }

          .bar-value {
            width: 50px;
            text-align: right;
            font-size: 0.9rem;
            color: var(--gray);
            font-weight: 500;
          }
        }
      }

      .chart-legend {
        p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--gray);
          text-align: center;
          font-style: italic;
        }
      }
    }
  }

  footer {
    text-align: center;
    padding: 30px 20px;
    margin-top: 40px;
    color: var(--gray);
    font-size: 1rem;
    border-top: 1px solid var(--border);

    p {
      max-width: 700px;
      margin: 0 auto 15px;
      line-height: 1.6;
    }

    .footer-links {
      font-size: 0.95rem;
      color: var(--primary);

      span {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
