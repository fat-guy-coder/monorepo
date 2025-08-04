<template>
  <div class="vitest-container">
    <header>
      <h1>Vitest - 下一代前端测试框架</h1>
      <p>基于 Vite 的极速测试解决方案</p>
    </header>

    <div class="content-wrapper">
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h2>为什么选择 Vitest？</h2>
            <p>Vitest 是一个基于 Vite 的测试框架，专为现代前端项目设计。它结合了 Jest 的强大功能和 Vite 的极速开发体验，提供开箱即用的测试解决方案。</p>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <div class="feature-content">
                  <h3>超快速度</h3>
                  <p>利用 Vite 的即时热更新和智能缓存，测试速度提升 10 倍以上</p>
                </div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🔄</div>
                <div class="feature-content">
                  <h3>即时反馈</h3>
                  <p>开发模式下实时运行测试，代码修改后立即显示结果</p>
                </div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🔌</div>
                <div class="feature-content">
                  <h3>无缝集成</h3>
                  <p>完美支持 Vite 生态系统，无需额外配置</p>
                </div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🧩</div>
                <div class="feature-content">
                  <h3>兼容 Jest</h3>
                  <p>支持 Jest 的 API 和插件，轻松迁移现有测试</p>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-image">
            <div class="vitest-logo">Vitest</div>
            <div class="speed-comparison">
              <div class="comparison-bar vitest-bar">
                <span>Vitest: 0.8s</span>
              </div>
              <div class="comparison-bar jest-bar">
                <span>Jest: 8.2s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs-section">
        <div class="tabs-header">
          <div v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab.title }}
          </div>
        </div>

        <div class="tabs-content">
          <div v-show="activeTab === 0" class="tab-pane">
            <h2>安装与配置</h2>
            <div class="installation-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>创建 Vite 项目</h3>
                  <pre><code>npm create vite@latest my-project -- --template vue-ts</code></pre>
                  <p>或使用你现有的 Vite 项目</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>安装 Vitest</h3>
                  <pre><code>npm install -D vitest</code></pre>
                  <p>或使用 yarn/pnpm:</p>
                  <pre><code>yarn add -D vitest</code></pre>
                  <pre><code>pnpm add -D vitest</code></pre>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>配置 Vitest</h3>
                  <p>在 <code>vite.config.ts</code> 中添加测试配置：</p>
                  <pre><code>/// &lt;reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // 用于组件测试
    coverage: {
      provider: 'c8' // 或 'istanbul'
    }
  }
})</code></pre>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>添加测试脚本</h3>
                  <p>在 <code>package.json</code> 中添加：</p>
                  <pre><code>{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage"
  }
}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 1" class="tab-pane">
            <h2>核心 API</h2>
            <div class="api-grid">
              <div class="api-card">
                <div class="api-header">test / it</div>
                <div class="api-content">
                  <p>定义单个测试用例</p>
                  <pre><code>test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">describe</div>
                <div class="api-content">
                  <p>将多个相关测试组合在一起</p>
                  <pre><code>describe('math operations', () => {
  test('addition', () => { /* ... */ });
  test('subtraction', () => { /* ... */ });
});</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">expect</div>
                <div class="api-content">
                  <p>创建断言，配合匹配器使用</p>
                  <pre><code>expect(result).toBe(5);
expect(array).toContain('value');
expect(response).toEqual({ success: true });</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">vi.fn()</div>
                <div class="api-content">
                  <p>创建模拟函数</p>
                  <pre><code>const mockFn = vi.fn();
mockFn('arg');
expect(mockFn).toHaveBeenCalledWith('arg');</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">vi.mock()</div>
                <div class="api-content">
                  <p>模拟模块</p>
                  <pre><code>vi.mock('axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: {} }))
}));</code></pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">vi.spyOn()</div>
                <div class="api-content">
                  <p>监视对象方法</p>
                  <pre><code>const obj = { method: () => 'original' };
const spy = vi.spyOn(obj, 'method');
obj.method();
expect(spy).toHaveBeenCalled();</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 2" class="tab-pane">
            <h2>使用场景</h2>
            <div class="scenarios-grid">
              <div class="scenario-card">
                <div class="scenario-icon">🧪</div>
                <div class="scenario-content">
                  <h3>单元测试</h3>
                  <p>测试独立的函数或模块</p>
                  <pre><code>// math.ts
export function sum(a: number, b: number) {
  return a + b;
}

// math.test.ts
import { sum } from './math';
import { test, expect } from 'vitest';

test('adds numbers', () => {
  expect(sum(1, 2)).toBe(3);
});</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🧩</div>
                <div class="scenario-content">
                  <h3>组件测试</h3>
                  <p>使用 Vue Test Utils 测试组件</p>
                  <pre><code>import { mount } from '@vue/test-utils';
import Counter from './Counter.vue';
import { test, expect } from 'vitest';

test('increments counter', async () => {
  const wrapper = mount(Counter);
  await wrapper.find('button').trigger('click');
  expect(wrapper.text()).toContain('Count: 1');
});</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">📸</div>
                <div class="scenario-content">
                  <h3>快照测试</h3>
                  <p>捕获组件渲染结果</p>
                  <pre><code>import { render } from '@testing-library/vue';
import Button from './Button.vue';
import { test, expect } from 'vitest';

test('renders correctly', () => {
  const { html } = render(Button, {
    props: { label: 'Submit' }
  });
  expect(html()).toMatchSnapshot();
});</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🔄</div>
                <div class="scenario-content">
                  <h3>异步测试</h3>
                  <p>测试异步代码和定时器</p>
                  <pre><code>test('fetches data', async () => {
  const data = await fetchData();
  expect(data).toEqual({ success: true });
});

test('timers', () => {
  vi.useFakeTimers();
  const callback = vi.fn();
  setTimeout(callback, 1000);
  vi.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalled();
});</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 3" class="tab-pane">
            <h2>Vitest vs Jest</h2>
            <div class="comparison-grid">
              <div class="comparison-card">
                <div class="comparison-header">性能</div>
                <div class="comparison-content">
                  <div class="metric">
                    <div class="metric-label">Vitest</div>
                    <div class="metric-bar vitest-bar" style="width: 95%">0.8s</div>
                  </div>
                  <div class="metric">
                    <div class="metric-label">Jest</div>
                    <div class="metric-bar jest-bar" style="width: 35%">8.2s</div>
                  </div>
                  <p>Vitest 利用 Vite 的即时编译和智能缓存，测试速度比 Jest 快 10 倍以上</p>
                </div>
              </div>

              <div class="comparison-card">
                <div class="comparison-header">配置</div>
                <div class="comparison-content">
                  <div class="config-section">
                    <h3>Vitest</h3>
                    <pre><code>// vite.config.ts
test: {
  environment: 'jsdom',
  coverage: {
    provider: 'c8'
  }
}</code></pre>
                  </div>
                  <div class="config-section">
                    <h3>Jest</h3>
                    <pre><code>// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '&lt;rootDir&gt;/src/$1'
  }
};</code></pre>
                  </div>
                  <p>Vitest 与 Vite 共享配置，大大简化了设置过程</p>
                </div>
              </div>

              <div class="comparison-card">
                <div class="comparison-header">生态系统</div>
                <div class="comparison-content">
                  <div class="ecosystem-section">
                    <h3>Vitest 优势</h3>
                    <ul>
                      <li>原生支持 TypeScript 和 ES 模块</li>
                      <li>开箱即用的 Vite 插件支持</li>
                      <li>与 Vite 开发服务器无缝集成</li>
                      <li>支持 Vue、React、Svelte 等框架</li>
                    </ul>
                  </div>
                  <div class="ecosystem-section">
                    <h3>Jest 优势</h3>
                    <ul>
                      <li>更成熟的生态系统</li>
                      <li>更丰富的插件和扩展</li>
                      <li>更大的社区支持</li>
                      <li>更广泛的文档资源</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="workflow-section">
        <h2>Vitest 工作流程</h2>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-icon">1</div>
            <div class="step-content">
              <h3>编写测试</h3>
              <p>创建 *.test.ts 或 *.spec.ts 文件</p>
            </div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">2</div>
            <div class="step-content">
              <h3>运行测试</h3>
              <p>执行 vitest 命令启动测试</p>
            </div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">3</div>
            <div class="step-content">
              <h3>即时反馈</h3>
              <p>Vitest 实时监控文件变化并重新运行相关测试</p>
            </div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">4</div>
            <div class="step-content">
              <h3>调试与优化</h3>
              <p>使用浏览器开发者工具调试测试用例</p>
            </div>
          </div>
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
  { title: '与 Jest 对比' }
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.vitest-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
  color: #1e293b;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 100, 0.05);

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.1rem;
      color: #64748b;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.hero-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .hero-content {
    display: flex;
    gap: 2.5rem;

    @media (max-width: 900px) {
      flex-direction: column;
    }

    .hero-text {
      flex: 1;

      h2 {
        font-size: 1.8rem;
        color: #1e293b;
        margin-top: 0;
        margin-bottom: 1.5rem;
      }

      p {
        color: #475569;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
      }
    }

    .hero-image {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .vitest-logo {
        font-size: 3.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 2rem;
      }

      .speed-comparison {
        width: 100%;
        max-width: 400px;

        .comparison-bar {
          height: 40px;
          border-radius: 8px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          color: white;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            z-index: -1;
          }

          &.vitest-bar {
            background: linear-gradient(90deg, #6366f1, #8b5cf6);

            &::before {
              width: 95%;
              background: linear-gradient(90deg, #4f46e5, #7c3aed);
            }
          }

          &.jest-bar {
            background: linear-gradient(90deg, #f97316, #ec4899);

            &::before {
              width: 35%;
              background: linear-gradient(90deg, #ea580c, #db2777);
            }
          }
        }
      }
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .feature-card {
      display: flex;
      gap: 1rem;
      background: #f1f5f9;
      border-radius: 10px;
      padding: 1.2rem;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
        border-color: #c7d2fe;
      }

      .feature-icon {
        font-size: 2rem;
        flex-shrink: 0;
      }

      .feature-content {
        h3 {
          margin: 0 0 0.5rem;
          color: #1e293b;
        }

        p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
        }
      }
    }
  }
}

.tabs-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  .tabs-header {
    display: flex;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;

    .tab-item {
      flex: 1;
      padding: 1.2rem;
      text-align: center;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        background: #f1f5f9;
      }

      &.active {
        color: #6366f1;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #6366f1;
        }
      }
    }
  }

  .tabs-content {
    padding: 2rem;

    h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f1f5f9;
    }
  }
}

.installation-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .step {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }

    .step-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: #e0e7ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #6366f1;
      font-size: 1.2rem;
    }

    .step-content {
      flex: 1;

      h3 {
        margin: 0 0 0.8rem;
        color: #1e293b;
      }

      pre {
        background: #f1f5f9;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;
        margin-bottom: 0.8rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #4338ca;
        }
      }

      p {
        margin: 0.5rem 0;
        color: #64748b;
      }
    }
  }
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .api-card {
    background: #f8fafc;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
    }

    .api-header {
      background: #e0e7ff;
      padding: 0.8rem 1rem;
      font-weight: 600;
      color: #4338ca;
      font-size: 1.1rem;
      border-bottom: 1px solid #c7d2fe;
    }

    .api-content {
      padding: 1.2rem;

      p {
        margin: 0 0 0.8rem;
        color: #475569;
      }

      pre {
        background: #f1f5f9;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        font-size: 0.85rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #4338ca;
        }
      }
    }
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .scenario-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    .scenario-icon {
      font-size: 2rem;
      text-align: center;
      padding: 1.2rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .scenario-content {
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.8rem;
        color: #1e293b;
      }

      p {
        margin: 0 0 1rem;
        color: #64748b;
      }

      pre {
        background: #f1f5f9;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        font-size: 0.8rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #4338ca;
        }
      }
    }
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .comparison-card {
    background: #f8fafc;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e2e8f0;

    .comparison-header {
      background: #e0e7ff;
      padding: 0.8rem 1rem;
      font-weight: 600;
      color: #4338ca;
      font-size: 1.1rem;
      text-align: center;
    }

    .comparison-content {
      padding: 1.5rem;

      .metric {
        margin-bottom: 1.5rem;

        .metric-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #475569;
        }

        .metric-bar {
          height: 30px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          color: white;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

          &.vitest-bar {
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
          }

          &.jest-bar {
            background: linear-gradient(90deg, #f97316, #ec4899);
          }
        }
      }

      p {
        color: #475569;
        margin: 1rem 0;
      }

      .config-section {
        margin-bottom: 1.5rem;

        h3 {
          margin: 0 0 0.8rem;
          color: #1e293b;
          font-size: 1.1rem;
        }

        pre {
          background: #f1f5f9;
          border-radius: 6px;
          padding: 0.8rem;
          overflow-x: auto;
          font-size: 0.8rem;

          code {
            font-family: 'JetBrains Mono', monospace;
            color: #4338ca;
          }
        }
      }

      .ecosystem-section {
        margin-bottom: 1.5rem;

        h3 {
          margin: 0 0 0.8rem;
          color: #1e293b;
          font-size: 1.1rem;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0.8rem 0;

          li {
            margin-bottom: 0.5rem;
            color: #475569;
          }
        }
      }
    }
  }
}

.workflow-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .workflow-steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
      min-width: 180px;

      .step-icon {
        width: 50px;
        height: 50px;
        background: #e0e7ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: #6366f1;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .step-content {
        h3 {
          margin: 0 0 0.5rem;
          color: #1e293b;
        }

        p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
        }
      }
    }

    .arrow {
      color: #94a3b8;
      font-weight: 700;
      padding: 0 1rem;

      @media (max-width: 768px) {
        transform: rotate(90deg);
      }
    }
  }
}

@media (max-width: 768px) {
  .vitest-container {
    padding: 1.5rem;
  }

  .hero-content {
    flex-direction: column;
  }
}
</style>
