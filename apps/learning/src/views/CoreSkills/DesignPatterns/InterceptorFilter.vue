<template>
  <div class="intercepting-filter-container">
    <header class="pattern-header">
      <div class="header-content">
        <h1>拦截过滤器模式</h1>
        <p class="subtitle">在请求处理前后执行预处理和后处理的强大设计模式</p>
        <div class="pattern-tags">
          <span class="tag">预处理</span>
          <span class="tag">过滤器链</span>
          <span class="tag">请求拦截</span>
          <span class="tag">响应处理</span>
        </div>
      </div>
      <div class="pattern-icon">⚡</div>
    </header>

    <div class="content-navigation">
      <div v-for="(item, index) in navItems" :key="index" class="nav-item" :class="{ active: activeNav === item.id }"
        @click="activeNav = item.id">
        <div class="nav-icon">{{ item.icon }}</div>
        <div class="nav-text">{{ item.title }}</div>
      </div>
    </div>

    <div class="content-section">
      <!-- 概念部分 -->
      <section v-if="activeNav === 'concept'" class="concept-section">
        <div class="pattern-definition">
          <h2>拦截过滤器模式概念</h2>
          <div class="definition-card">
            <p>
              <strong>拦截过滤器模式(Intercepting Filter Pattern)</strong>是一种结构设计模式，
              用于在请求处理之前或之后执行预处理和后处理操作。它允许开发人员通过可插拔的过滤器链来处理请求，
              而无需修改核心业务逻辑。
            </p>
            <div class="analogy">
              <h3>现实世界类比</h3>
              <div class="analogy-content">
                <div class="analogy-icon">🛂</div>
                <p>
                  想象机场的安检流程：旅客（请求）在登机（处理）前需要经过多个检查点（过滤器）：
                  证件检查、行李扫描、身体安检等。每个检查点独立工作，可随时添加或移除，而不影响其他环节。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="pattern-structure">
          <h2>模式结构</h2>
          <div class="structure-diagram">
            <div class="component">
              <div class="component-header">过滤器(Filter)</div>
              <div class="component-body">执行特定任务的独立组件</div>
            </div>
            <div class="arrow">→</div>
            <div class="component">
              <div class="component-header">过滤器链(Filter Chain)</div>
              <div class="component-body">管理过滤器的有序集合</div>
            </div>
            <div class="arrow">→</div>
            <div class="component">
              <div class="component-header">过滤器管理器(Filter Manager)</div>
              <div class="component-body">创建过滤器链并配置执行顺序</div>
            </div>
            <div class="arrow">→</div>
            <div class="component">
              <div class="component-header">目标(Target)</div>
              <div class="component-body">实际处理请求的业务对象</div>
            </div>
          </div>
        </div>

        <div class="execution-flow">
          <h2>执行流程</h2>
          <div class="flow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>客户端发送请求</h4>
                <p>客户端向过滤器管理器发起请求</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>预处理过滤器</h4>
                <p>过滤器链按顺序执行预处理操作</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>目标处理</h4>
                <p>请求被传递到目标对象进行处理</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>后处理过滤器</h4>
                <p>过滤器链按顺序执行后处理操作</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h4>返回响应</h4>
                <p>处理后的响应返回给客户端</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 示例代码部分 -->
      <section v-if="activeNav === 'code'" class="code-section">
        <h2>拦截过滤器模式实现</h2>

        <div class="code-tabs">
          <div v-for="(tab, index) in codeTabs" :key="index" class="code-tab"
            :class="{ active: activeCodeTab === tab.id }" @click="activeCodeTab = tab.id">
            {{ tab.title }}
          </div>
        </div>

        <div class="code-content">
          <!-- 接口定义 -->
          <div v-if="activeCodeTab === 'interface'" class="code-example">
            <pre><code>// 过滤器接口
interface Filter {
  execute(request: string): void;
}

// 过滤器链接口
interface FilterChain {
  addFilter(filter: Filter): void;
  execute(request: string): void;
}

// 目标接口
interface Target {
  execute(request: string): void;
}</code></pre>
          </div>

          <!-- 具体过滤器 -->
          <div v-if="activeCodeTab === 'filters'" class="code-example">
            <pre><code>// 认证过滤器
class AuthenticationFilter implements Filter {
  execute(request: string): void {
    console.log(`Authenticating request: ${request}`);
    // 实际认证逻辑...
  }
}

// 日志记录过滤器
class LoggingFilter implements Filter {
  execute(request: string): void {
    console.log(`Logging request: ${request}`);
    // 实际日志记录逻辑...
  }
}

// 数据验证过滤器
class ValidationFilter implements Filter {
  execute(request: string): void {
    console.log(`Validating request: ${request}`);
    // 实际验证逻辑...
  }
}

// 响应压缩过滤器
class CompressionFilter implements Filter {
  execute(request: string): void {
    console.log(`Compressing response for: ${request}`);
    // 实际压缩逻辑...
  }
}</code></pre>
          </div>

          <!-- 过滤器链 -->
          <div v-if="activeCodeTab === 'chain'" class="code-example">
            <pre><code>// 过滤器链实现
class AppFilterChain implements FilterChain {
  private filters: Filter[] = [];
  private target: Target;

  constructor(target: Target) {
    this.target = target;
  }

  addFilter(filter: Filter): void {
    this.filters.push(filter);
  }

  execute(request: string): void {
    // 执行预处理过滤器
    for (const filter of this.filters) {
      filter.execute(request);
    }

    // 执行目标处理
    this.target.execute(request);

    // 执行后处理过滤器
    for (const filter of this.filters.reverse()) {
      filter.execute(request);
    }
  }
}

// 目标实现
class AppTarget implements Target {
  execute(request: string): void {
    console.log(`Processing request: ${request}`);
    // 实际业务逻辑...
  }
}</code></pre>
          </div>

          <!-- 客户端使用 -->
          <div v-if="activeCodeTab === 'client'" class="code-example">
            <pre><code>// 客户端使用
const target = new AppTarget();
const filterChain = new AppFilterChain(target);

// 添加过滤器
filterChain.addFilter(new AuthenticationFilter());
filterChain.addFilter(new LoggingFilter());
filterChain.addFilter(new ValidationFilter());
filterChain.addFilter(new CompressionFilter());

// 执行请求
filterChain.execute("GET /api/data");

// 输出:
// Authenticating request: GET /api/data
// Logging request: GET /api/data
// Validating request: GET /api/data
// Processing request: GET /api/data
// Compressing response for: GET /api/data
// Validating request: GET /api/data
// Logging request: GET /api/data
// Authenticating request: GET /api/data</code></pre>
          </div>
        </div>

        <div class="code-explanation">
          <h3>代码说明</h3>
          <ul>
            <li>
              <strong>过滤器(Filter)</strong>: 独立的处理单元，每个过滤器负责单一职责（如认证、日志记录）
            </li>
            <li>
              <strong>过滤器链(FilterChain)</strong>: 管理过滤器的执行顺序，可动态添加或移除过滤器
            </li>
            <li>
              <strong>目标(Target)</strong>: 核心业务逻辑处理器，在过滤器执行前后被调用
            </li>
            <li>
              <strong>执行流程</strong>: 请求依次通过预处理过滤器 → 目标处理 → 后处理过滤器
            </li>
          </ul>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section v-if="activeNav === 'scenarios'" class="scenarios-section">
        <h2>拦截过滤器模式使用场景</h2>

        <div class="scenario-cards">
          <div class="scenario-card">
            <div class="scenario-icon">🌐</div>
            <h3>Web应用程序</h3>
            <p>处理HTTP请求的认证、日志记录、输入验证等</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔒</div>
            <h3>安全系统</h3>
            <p>实现多层次安全检查（IP过滤、权限验证等）</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>数据处理管道</h3>
            <p>数据清洗、转换和验证的多阶段处理</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>移动应用中间件</h3>
            <p>API请求的通用处理（缓存、错误处理等）</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧪</div>
            <h3>测试框架</h3>
            <p>测试用例的前置条件设置和后置清理</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🛡️</div>
            <h3>防欺诈系统</h3>
            <p>多级风险检查（行为分析、黑名单验证等）</p>
          </div>
        </div>

        <div class="framework-implementations">
          <h3>框架中的实现</h3>
          <div class="framework-grid">
            <div class="framework">
              <div class="framework-logo">Spring</div>
              <div class="framework-name">Spring Security Filters</div>
              <p>Servlet过滤器链处理HTTP请求安全</p>
            </div>
            <div class="framework">
              <div class="framework-logo">Express</div>
              <div class="framework-name">Express Middleware</div>
              <p>中间件链处理请求和响应</p>
            </div>
            <div class="framework">
              <div class="framework-logo">ASP.NET</div>
              <div class="framework-name">Action Filters</div>
              <p>控制器动作的预处理和后处理</p>
            </div>
            <div class="framework">
              <div class="framework-logo">JAX-RS</div>
              <div class="framework-name">Container Filters</div>
              <p>JAX-RS应用的请求/响应拦截器</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点部分 -->
      <section v-if="activeNav === 'pros-cons'" class="pros-cons-section">
        <h2>拦截过滤器模式优缺点</h2>

        <div class="comparison">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>关注点分离</strong>
                  <p>每个过滤器只处理单一职责，提高代码可维护性</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>灵活性和可扩展性</strong>
                  <p>可动态添加、移除或重新排序过滤器</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>可重用性</strong>
                  <p>过滤器可在不同应用中复用</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>集中管理</strong>
                  <p>统一管理横切关注点（日志、安全等）</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>非侵入式设计</strong>
                  <p>核心业务逻辑不受过滤器影响</p>
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
                  <strong>性能开销</strong>
                  <p>每个请求经过多个过滤器可能增加延迟</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>调试复杂性</strong>
                  <p>请求经过多个过滤器增加调试难度</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>过度设计风险</strong>
                  <p>简单应用中使用可能增加不必要的复杂性</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>依赖顺序</strong>
                  <p>过滤器执行顺序可能影响结果</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>错误处理挑战</strong>
                  <p>需要统一处理过滤器链中的异常</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice">
              <div class="practice-icon">📏</div>
              <h4>保持过滤器简单</h4>
              <p>每个过滤器应只负责单一功能</p>
            </div>
            <div class="practice">
              <div class="practice-icon">⏱️</div>
              <h4>性能优化</h4>
              <p>避免在过滤器中执行耗时操作</p>
            </div>
            <div class="practice">
              <div class="practice-icon">🧪</div>
              <h4>单元测试</h4>
              <p>为每个过滤器编写独立的单元测试</p>
            </div>
            <div class="practice">
              <div class="practice-icon">📝</div>
              <h4>文档化</h4>
              <p>明确记录过滤器的功能和执行顺序</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="pattern-footer">
      <p>拦截过滤器模式是处理横切关注点的强大工具，特别适用于需要灵活处理流程的应用场景</p>
      <div class="footer-links">
        <a href="#">模式详细文档</a>
        <a href="#">Spring框架实现</a>
        <a href="#">Express中间件指南</a>
        <a href="#">设计模式参考</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'concept', title: '概念', icon: '📚' },
  { id: 'code', title: '示例代码', icon: '💻' },
  { id: 'scenarios', title: '使用场景', icon: '📍' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' }
]);

// 当前激活的导航项
const activeNav = ref('concept');

// 代码标签页
const codeTabs = ref([
  { id: 'interface', title: '接口定义' },
  { id: 'filters', title: '具体过滤器' },
  { id: 'chain', title: '过滤器链' },
  { id: 'client', title: '客户端使用' }
]);

// 当前激活的代码标签页
const activeCodeTab = ref('interface');
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@dark-bg: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@success-color: #2ecc71;
@warning-color: #f39c12;
@error-color: #e74c3c;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.intercepting-filter-container {
  font-family: 'Roboto', 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  .pattern-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, @dark-bg, lighten(@dark-bg, 10%));
    color: white;
    padding: 30px 40px;
    border-radius: 15px;
    margin-bottom: 30px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);

    .header-content {
      h1 {
        font-size: 2.8rem;
        margin-bottom: 10px;
        letter-spacing: 0.5px;
      }

      .subtitle {
        font-size: 1.4rem;
        opacity: 0.9;
        margin-bottom: 20px;
        max-width: 700px;
      }

      .pattern-tags {
        display: flex;
        gap: 12px;

        .tag {
          background: fade(white, 15%);
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.95rem;
          font-weight: 500;
        }
      }
    }

    .pattern-icon {
      font-size: 5rem;
      opacity: 0.9;
    }
  }

  .content-navigation {
    display: flex;
    justify-content: space-between;
    background: @card-bg;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;
    padding: 15px;

    .nav-item {
      flex: 1;
      text-align: center;
      padding: 15px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: fade(@primary-color, 10%);
      }

      &.active {
        background: fade(@primary-color, 15%);
        box-shadow: 0 4px 8px fade(@primary-color, 20%);

        .nav-icon {
          transform: scale(1.2);
          color: @primary-color;
        }

        .nav-text {
          color: @primary-color;
          font-weight: 500;
        }
      }

      .nav-icon {
        font-size: 2rem;
        margin-bottom: 8px;
        transition: all 0.3s ease;
      }

      .nav-text {
        font-size: 1.05rem;
        font-weight: 400;
      }
    }
  }

  .content-section {
    background: @card-bg;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 30px;
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      color: @dark-bg;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid @border-color;
    }

    // 概念部分样式
    .concept-section {
      .pattern-definition {
        margin-bottom: 40px;

        .definition-card {
          background: @light-bg;
          padding: 25px;
          border-radius: 10px;
          line-height: 1.7;
          font-size: 1.1rem;

          p {
            margin-bottom: 20px;
          }
        }

        .analogy {
          background: fade(@accent-color, 8%);
          border-radius: 10px;
          padding: 20px;
          margin-top: 25px;
          border-left: 4px solid @accent-color;

          h3 {
            color: @accent-color;
            margin-bottom: 15px;
            font-size: 1.3rem;
          }

          .analogy-content {
            display: flex;
            gap: 20px;
            align-items: center;

            .analogy-icon {
              font-size: 2.5rem;
              flex-shrink: 0;
            }

            p {
              line-height: 1.8;
            }
          }
        }
      }

      .pattern-structure {
        margin-bottom: 40px;

        .structure-diagram {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 20px;

          .component {
            flex: 1;
            min-width: 200px;
            background: fade(@primary-color, 10%);
            border: 1px solid fade(@primary-color, 30%);
            border-radius: 8px;
            padding: 20px;
            text-align: center;

            .component-header {
              font-weight: bold;
              margin-bottom: 10px;
              color: @primary-color;
              font-size: 1.2rem;
            }

            .component-body {
              font-size: 1rem;
              color: lighten(@text-color, 20%);
            }
          }

          .arrow {
            font-size: 1.8rem;
            color: @primary-color;
            padding: 0 10px;
            flex-shrink: 0;
          }
        }
      }

      .execution-flow {
        .flow-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;

          .step {
            display: flex;
            gap: 15px;
            background: @light-bg;
            border-radius: 12px;
            padding: 20px;
            align-items: flex-start;
            border-left: 4px solid @primary-color;

            .step-number {
              width: 32px;
              height: 32px;
              background: @primary-color;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              flex-shrink: 0;
              margin-top: 3px;
            }

            .step-content {
              flex: 1;

              h4 {
                font-size: 1.2rem;
                margin-bottom: 8px;
                color: @dark-bg;
              }

              p {
                color: lighten(@text-color, 15%);
              }
            }
          }
        }
      }
    }

    // 代码示例部分样式
    .code-section {
      .code-tabs {
        display: flex;
        background: @dark-bg;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        margin-bottom: -1px;

        .code-tab {
          padding: 15px 25px;
          color: #aaa;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;

          &:hover {
            color: white;
            background: lighten(@dark-bg, 10%);
          }

          &.active {
            color: white;
            background: @primary-color;
          }
        }
      }

      .code-content {
        background: #2d2d2d;
        color: #f8f8f2;
        border-radius: 0 0 8px 8px;
        padding: 20px;
        overflow-x: auto;

        .code-example {
          pre {
            margin: 0;
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 0.95rem;
            line-height: 1.5;

            code {
              display: block;

              // 简单的语法高亮
              .comment {
                color: #6a9955;
              }

              .keyword {
                color: #c586c0;
              }

              .class {
                color: #4ec9b0;
              }

              .function {
                color: #dcdcaa;
              }

              .string {
                color: #ce9178;
              }
            }
          }
        }
      }

      .code-explanation {
        margin-top: 30px;
        background: fade(@primary-color, 8%);
        border-radius: 10px;
        padding: 25px;
        border-left: 4px solid @primary-color;

        h3 {
          margin-bottom: 15px;
          color: @primary-color;
        }

        ul {
          list-style: none;

          li {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid fade(@border-color, 30%);

            strong {
              color: @primary-color;
              display: inline-block;
              margin-bottom: 5px;
            }
          }
        }
      }
    }

    // 使用场景部分样式
    .scenarios-section {
      .scenario-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
        margin-bottom: 40px;

        .scenario-card {
          background: @light-bg;
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          transition: transform 0.3s ease;
          border-top: 4px solid @primary-color;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .scenario-icon {
            font-size: 3rem;
            margin-bottom: 15px;
          }

          h3 {
            font-size: 1.3rem;
            margin-bottom: 12px;
            color: @dark-bg;
          }

          p {
            color: lighten(@text-color, 20%);
            line-height: 1.6;
          }
        }
      }

      .framework-implementations {
        .framework-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;

          .framework {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            border-top: 4px solid @secondary-color;

            .framework-logo {
              font-size: 2rem;
              font-weight: bold;
              margin-bottom: 15px;
              color: @primary-color;
            }

            .framework-name {
              font-size: 1.2rem;
              margin-bottom: 10px;
              color: @dark-bg;
            }

            p {
              color: lighten(@text-color, 20%);
              line-height: 1.6;
            }
          }
        }
      }
    }

    // 优缺点部分样式
    .pros-cons-section {
      .comparison {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 30px;
        margin-bottom: 40px;

        .pros,
        .cons {
          padding: 20px;
          border-radius: 12px;
        }

        .pros {
          background: fade(@success-color, 10%);
          border-left: 4px solid @success-color;
        }

        .cons {
          background: fade(@warning-color, 10%);
          border-left: 4px solid @warning-color;
        }

        h3 {
          font-size: 1.4rem;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid fade(@border-color, 50%);
        }

        ul {
          list-style: none;

          li {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid fade(@border-color, 30%);

            .icon {
              font-size: 1.5rem;
              flex-shrink: 0;
              margin-top: 3px;
            }

            div {
              flex: 1;

              strong {
                display: block;
                margin-bottom: 5px;
                font-size: 1.1rem;
              }

              p {
                color: lighten(@text-color, 20%);
                line-height: 1.6;
              }
            }
          }
        }
      }

      .best-practices {
        .practices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;

          .practice {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            border-top: 4px solid @accent-color;

            .practice-icon {
              font-size: 2.5rem;
              margin-bottom: 15px;
            }

            h4 {
              font-size: 1.2rem;
              margin-bottom: 10px;
              color: @dark-bg;
            }

            p {
              color: lighten(@text-color, 20%);
              line-height: 1.6;
            }
          }
        }
      }
    }
  }

  .pattern-footer {
    text-align: center;
    padding: 30px;
    background: @light-bg;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    p {
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: @dark-bg;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 25px;
      flex-wrap: wrap;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: darken(@primary-color, 15%);
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .pattern-header {
    flex-direction: column;
    text-align: center;
    padding: 20px !important;

    .header-content {
      margin-bottom: 20px;
    }
  }

  .content-navigation {
    flex-wrap: wrap;

    .nav-item {
      flex: 1 0 120px;
      margin-bottom: 10px;
    }
  }

  .structure-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      padding: 15px 0 !important;
    }
  }
}
</style>
