<template>
  <div class="jest-container">
    <header>
      <h1>Jest.js 测试框架基本指南</h1>
      <p>JavaScript 最流行的测试框架解析</p>
      <p><a href="https://jestjs.io/zh-Hans/docs/getting-started" target="_blank">Jest 中文文档</a></p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="intro-content">
            <h2>什么是 Jest？</h2>
            <p>Jest 是由 Facebook 开发的 JavaScript 测试框架，专注于简洁性。它提供了零配置的测试体验，支持快速执行测试用例、快照测试、代码覆盖率等功能。</p>
            <div class="features">
              <div class="feature">
                <div class="feature-icon">🚀</div>
                <div class="feature-text">快速并行测试执行</div>
              </div>
              <div class="feature">
                <div class="feature-icon">📸</div>
                <div class="feature-text">强大的快照测试</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🧪</div>
                <div class="feature-text">内置代码覆盖率</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <div class="feature-text">智能监控模式</div>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="jest-logo">Jest</div>
          </div>
        </div>
      </div>

      <div class="tabs">
        <div class="tab-nav">
          <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab.title }}
          </button>
        </div>

        <div class="tab-content">
          <div v-if="activeTab === 0" class="installation">
            <h2>安装与配置</h2>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>安装 Jest</h3>
                  <pre><code>npm install --save-dev jest</code></pre>
                  <p>或使用 yarn:</p>
                  <pre><code>yarn add --dev jest</code></pre>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>创建配置文件</h3>
                  <pre><code>npx jest --init</code></pre>
                  <p>回答配置问题生成 <code>jest.config.js</code> 文件</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>添加测试脚本</h3>
                  <p>在 <code>package.json</code> 中添加：</p>
                  <pre><code>{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 1" class="api-section">
            <h2>核心 API</h2>
            <div class="api-grid">
              <div class="api-card">
                <div class="api-header">describe(name, fn)</div>
                <div class="api-content">
                  <p>将多个相关测试组合在一起</p>
                  <pre><code>describe('math operations', () => {
  // 测试用例
});</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">test(name, fn, timeout)</div>
                <div class="api-content">
                  <p>定义单个测试用例</p>
                  <pre><code>test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">expect(value)</div>
                <div class="api-content">
                  <p>创建断言，配合匹配器使用</p>
                  <pre><code>expect(result).toBe(5);
expect(array).toContain('value');
expect(response).toEqual({ success: true });</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">jest.fn()</div>
                <div class="api-content">
                  <p>创建模拟函数</p>
                  <pre><code>const mockFn = jest.fn();
mockFn('arg');
expect(mockFn).toHaveBeenCalledWith('arg');</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">jest.mock()</div>
                <div class="api-content">
                  <p>模拟模块</p>
                  <pre><code>jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} }))
}));</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">beforeEach(fn)</div>
                <div class="api-content">
                  <p>每个测试前运行的钩子</p>
                  <pre><code>beforeEach(() => {
  initializeDatabase();
});</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 2" class="usage-section">
            <h2>使用场景</h2>
            <div class="scenarios">
              <div class="scenario-card">
                <div class="scenario-icon">🧩</div>
                <div class="scenario-content">
                  <h3>单元测试</h3>
                  <p>测试独立的函数或模块</p>
                  <pre><code>// sum.js
function sum(a, b) {
  return a + b;
}

// sum.test.js
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🧪</div>
                <div class="scenario-content">
                  <h3>组件测试</h3>
                  <p>使用 React Testing Library 测试 UI 组件</p>
                  <pre><code>import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(&lt;Button>Click me&lt;/Button>);
  const button = screen.getByText(/click me/i);
  expect(button).toBeInTheDocument();
});</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">📸</div>
                <div class="scenario-content">
                  <h3>快照测试</h3>
                  <p>捕获组件渲染结果</p>
                  <pre><code>test('renders correctly', () => {
  const { asFragment } = render(&lt;Component />);
  expect(asFragment()).toMatchSnapshot();
});</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🔄</div>
                <div class="scenario-content">
                  <h3>异步测试</h3>
                  <p>测试 Promise、async/await 和回调</p>
                  <pre><code>test('fetches data', async () => {
  await expect(fetchData()).resolves.toBe('data');

  // 或使用 async/await
  const data = await fetchData();
  expect(data).toBe('data');
});</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 3" class="best-practices">
            <h2>最佳实践</h2>
            <div class="practices">
              <div class="practice-card">
                <div class="practice-header">测试命名</div>
                <div class="practice-content">
                  <p>使用描述性的测试名称，遵循 "should...when..." 模式：</p>
                  <pre><code>// 好
test('should return error when input is invalid', () => { ... });

// 不好
test('test input', () => { ... });</code></pre>
                </div>
              </div>

              <div class="practice-card">
                <div class="practice-header">单一职责</div>
                <div class="practice-content">
                  <p>每个测试只关注一个行为：</p>
                  <pre><code>// 好
test('should add two numbers', () => { ... });
test('should handle negative numbers', () => { ... });

// 不好
test('should do everything', () => { ... });</code></pre>
                </div>
              </div>

              <div class="practice-card">
                <div class="practice-header">3A 原则</div>
                <div class="practice-content">
                  <p>遵循 Arrange-Act-Assert 模式：</p>
                  <pre><code>test('should calculate total', () => {
  // Arrange: 设置测试环境
  const cart = new ShoppingCart();
  cart.addItem({ price: 10 });

  // Act: 执行操作
  const total = cart.calculateTotal();

  // Assert: 验证结果
  expect(total).toBe(10);
});</code></pre>
                </div>
              </div>

              <div class="practice-card">
                <div class="practice-header">代码覆盖率</div>
                <div class="practice-content">
                  <p>使用覆盖率报告识别未测试代码：</p>
                  <pre><code>jest --coverage</code></pre>
                  <p>关注关键指标：</p>
                  <ul>
                    <li>Statements: 语句覆盖率</li>
                    <li>Branches: 分支覆盖率</li>
                    <li>Functions: 函数覆盖率</li>
                    <li>Lines: 行覆盖率</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2>Jest 与其他测试框架对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Jest</th>
                <th>Mocha</th>
                <th>Jasmine</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>零配置</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>内置断言库</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>内置 Mock 库</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>快照测试</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>代码覆盖率</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>并行执行</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>监控模式</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { title: '安装与配置' },
  { title: '核心 API' },
  { title: '使用场景' },
  { title: '最佳实践' }
];
</script>

<style lang="less" scoped>


.jest-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f7ff 100%);
  color: #2c3e50;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 100, 0.08);

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(52, 152, 219, 0.2);

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.1rem;
      color: #7f8c8d;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.intro-section {
  margin-bottom: 2.5rem;

  .intro-card {
    display: flex;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .intro-content {
      flex: 1.5;
      padding: 2rem;

      h2 {
        font-size: 1.8rem;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 1.2rem;
      }

      p {
        color: #34495e;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.2rem;

        .feature {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: #f0f7ff;
          border-radius: 8px;
          padding: 0.8rem;
          border: 1px solid #e1ebfa;

          .feature-icon {
            font-size: 1.5rem;
          }

          .feature-text {
            font-weight: 500;
          }
        }
      }
    }

    .intro-image {
      flex: 1;
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      .jest-logo {
        font-size: 4rem;
        font-weight: 800;
        color: white;
        text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

.tabs {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2.5rem;

  .tab-nav {
    display: flex;
    background: #f0f7ff;
    border-bottom: 1px solid #e1ebfa;

    button {
      flex: 1;
      padding: 1.2rem;
      background: none;
      border: none;
      font-size: 1.1rem;
      font-weight: 600;
      color: #5f6368;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        background: #e3f2fd;
      }

      &.active {
        color: #1a73e8;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #1a73e8;
        }
      }
    }
  }

  .tab-content {
    padding: 2rem;

    h2 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f7ff;
    }
  }
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  .step {
    display: flex;
    gap: 1.5rem;

    .step-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: #e3f2fd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #1a73e8;
      font-size: 1.2rem;
    }

    .step-content {
      flex: 1;

      h3 {
        margin: 0 0 0.8rem;
        color: #2c3e50;
      }

      pre {
        background: #f8fbff;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;
        margin-bottom: 0.8rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #1a73e8;
        }
      }
    }
  }
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .api-card {
    background: #f8fbff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e1ebfa;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }

    .api-header {
      background: #e3f2fd;
      padding: 0.8rem 1rem;
      font-weight: 600;
      color: #1a73e8;
      font-size: 1.1rem;
      border-bottom: 1px solid #bbdefb;
    }

    .api-content {
      padding: 1.2rem;

      p {
        margin: 0 0 0.8rem;
        color: #5f6368;
      }

      pre {
        background: #f0f7ff;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        font-size: 0.85rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #1a73e8;
        }
      }
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .scenario-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .scenario-icon {
      font-size: 2rem;
      text-align: center;
      padding: 1.2rem;
      background: #f8fbff;
      border-bottom: 1px solid #e1ebfa;
    }

    .scenario-content {
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.8rem;
        color: #2c3e50;
      }

      p {
        margin: 0 0 1rem;
        color: #5f6368;
      }

      pre {
        background: #f8fbff;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        font-size: 0.8rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #1a73e8;
        }
      }
    }
  }
}

.practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .practice-card {
    background: #f8fbff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e1ebfa;

    .practice-header {
      background: #e3f2fd;
      padding: 0.8rem 1rem;
      font-weight: 600;
      color: #1a73e8;
      font-size: 1.1rem;
      border-bottom: 1px solid #bbdefb;
    }

    .practice-content {
      padding: 1.2rem;

      p {
        margin: 0 0 0.8rem;
        color: #5f6368;
      }

      pre {
        background: #f0f7ff;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        margin-bottom: 0.8rem;
        font-size: 0.85rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #1a73e8;
        }
      }

      ul {
        padding-left: 1.5rem;
        margin: 0.8rem 0;

        li {
          margin-bottom: 0.5rem;
          color: #5f6368;
        }
      }
    }
  }
}

.comparison-section {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;

      th,
      td {
        padding: 1rem;
        text-align: center;
        border: 1px solid #e1ebfa;
      }

      thead {
        background: #f0f7ff;

        th {
          font-weight: 600;
          color: #2c3e50;
        }
      }

      tbody {
        tr:nth-child(even) {
          background: #f8fbff;
        }

        td:first-child {
          text-align: left;
          font-weight: 500;
        }

        td:not(:first-child) {
          font-weight: 600;
        }

        .jest-cell {
          color: #1a73e8;
        }
      }

      .feature-name {
        width: 30%;
      }
    }
  }
}

@media (max-width: 768px) {
  .jest-container {
    padding: 1.5rem;
  }

  .intro-card {
    flex-direction: column;
  }

  .tab-nav {
    flex-wrap: wrap;

    button {
      flex: 1 0 50%;
    }
  }

  .steps .step {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
