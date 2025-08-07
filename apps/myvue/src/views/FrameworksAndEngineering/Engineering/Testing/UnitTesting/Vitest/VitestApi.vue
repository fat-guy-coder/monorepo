<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Vitest 测试框架使用指南</h1>
      <p class="subtitle">基于Vite的极速单元测试解决方案</p>
    </header>

    <main class="main-content">
      <!-- 基本介绍 -->
      <section class="section">
        <h2 class="section-title">什么是Vitest？</h2>
        <div class="section-content">
          <p>
            Vitest是一个基于Vite的单元测试框架，由Vue团队核心成员开发，专为Vite项目设计。
            它提供了与Jest兼容的API，同时利用Vite的极速HMR能力，实现了更快的测试速度和更好的开发体验。
          </p>
          <div class="feature-list">
            <div class="feature-item">⚡️ 基于Vite，启动和热更新速度极快</div>
            <div class="feature-item">🔄 与Jest API高度兼容，易于迁移</div>
            <div class="feature-item">🔧 零配置支持TypeScript、JSX</div>
            <div class="feature-item">📦 内置断言、模拟和覆盖率报告</div>
            <div class="feature-item">🔗 与Vite生态系统无缝集成</div>
            <div class="feature-item">🎭 支持多线程测试，提升执行效率</div>
          </div>
        </div>
      </section>

      <!-- 安装与配置 -->
      <section class="section">
        <h2 class="section-title">安装与基本配置</h2>
        <div class="section-content">
          <div class="installation-steps">
            <div class="step">
              <h3>1. 安装Vitest</h3>
              <div class="code-example">
                <pre><code># 使用npm
npm install --save-dev vitest

# 使用yarn
yarn add --dev vitest

# 使用pnpm
pnpm add -D vitest</code></pre>
              </div>
              <p class="note">对于Vue项目，建议同时安装@vuedx/test-utils或@vue/test-utils</p>
            </div>

            <div class="step">
              <h3>2. 配置Vitest</h3>
              <p>可以在vite.config.ts中添加配置：</p>
              <div class="code-example">
                <pre><code>// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    // 启用类似Jest的全局测试API
    globals: true,
    // 模拟浏览器环境
    environment: 'jsdom',
    // 测试文件匹配模式
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 代码覆盖率配置
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})</code></pre>
              </div>
            </div>

            <div class="step">
              <h3>3. 添加测试脚本</h3>
              <p>在package.json中添加：</p>
              <div class="code-example">
                <pre><code>"scripts": {
  "test": "vitest",
  "test:watch": "vitest watch",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 基本用法 -->
      <section class="section">
        <h2 class="section-title">基本用法</h2>
        <div class="section-content">
          <p>Vitest测试文件通常命名为*.test.ts、*.spec.ts，或放在__tests__目录下。</p>

          <div class="example-card">
            <h3>简单测试示例</h3>
            <p>创建math.ts文件：</p>
            <div class="code-example">
              <pre><code>// math.ts
export function sum(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}</code></pre>
            </div>

            <p>创建对应的测试文件math.test.ts：</p>
            <div class="code-example">
              <pre><code>// math.test.ts
import { sum, multiply } from './math';
import { describe, it, expect } from 'vitest';

// 测试套件
describe('math functions', () => {
  // 单个测试用例
  it('should return sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
  });

  it('should return product of two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(0, 5)).toBe(0);
  });
});</code></pre>
            </div>

            <p>运行测试：</p>
            <div class="code-example">
              <pre><code># 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心API -->
      <section class="section">
        <h2 class="section-title">核心API与断言方法</h2>
        <div class="section-content">
          <div class="api-grid">
            <!-- 测试结构API -->
            <div class="api-card">
              <h3>测试结构</h3>
              <div class="api-item">
                <code>describe(name, fn)</code>
                <p>定义测试套件，用于分组相关测试</p>
              </div>
              <div class="api-item">
                <code>it(name, fn, timeout)</code>
                <p>定义单个测试用例，别名test()</p>
              </div>
              <div class="api-item">
                <code>beforeAll(fn, timeout)</code>
                <p>在所有测试开始前执行一次</p>
              </div>
              <div class="api-item">
                <code>afterAll(fn, timeout)</code>
                <p>在所有测试完成后执行一次</p>
              </div>
              <div class="api-item">
                <code>beforeEach(fn, timeout)</code>
                <p>每个测试用例开始前执行</p>
              </div>
              <div class="api-item">
                <code>afterEach(fn, timeout)</code>
                <p>每个测试用例完成后执行</p>
              </div>
            </div>

            <!-- 常用断言 -->
            <div class="api-card">
              <h3>常用断言</h3>
              <div class="api-item">
                <code>expect(value)</code>
                <p>创建一个断言对象，用于测试值</p>
              </div>
              <div class="api-item">
                <code>toBe(value)</code>
                <p>使用===比较值，适用于基本类型</p>
              </div>
              <div class="api-item">
                <code>toEqual(value)</code>
                <p>递归比较对象的每个属性，适用于对象</p>
              </div>
              <div class="api-item">
                <code>toBeTruthy()</code>
                <p>测试值是否为真（非空、非0等）</p>
              </div>
              <div class="api-item">
                <code>toBeFalsy()</code>
                <p>测试值是否为假（null、0、''等）</p>
              </div>
              <div class="api-item">
                <code>toBeNull()</code>
                <p>测试值是否为null</p>
              </div>
            </div>

            <!-- 更多断言 -->
            <div class="api-card">
              <h3>扩展断言</h3>
              <div class="api-item">
                <code>toBeGreaterThan(number)</code>
                <p>测试值是否大于指定数字</p>
              </div>
              <div class="api-item">
                <code>toBeLessThan(number)</code>
                <p>测试值是否小于指定数字</p>
              </div>
              <div class="api-item">
                <code>toContain(item)</code>
                <p>测试数组是否包含指定元素</p>
              </div>
              <div class="api-item">
                <code>toMatch(regexp)</code>
                <p>测试字符串是否匹配正则表达式</p>
              </div>
              <div class="api-item">
                <code>toThrow(error)</code>
                <p>测试函数是否抛出指定错误</p>
              </div>
              <div class="api-item">
                <code>not</code>
                <p>否定后续断言，如expect(a).not.toBe(b)</p>
              </div>
            </div>

            <!-- 异步测试 -->
            <div class="api-card">
              <h3>异步测试</h3>
              <div class="api-item">
                <code>async/await</code>
                <p>使用异步函数处理异步测试</p>
              </div>
              <div class="api-item">
                <code>resolves</code>
                <p>测试Promise是否成功解析</p>
              </div>
              <div class="api-item">
                <code>rejects</code>
                <p>测试Promise是否拒绝</p>
              </div>
              <div class="code-snippet">
                <code>// 异步测试示例
it('fetches data correctly', async () => {
  const fetchData = () => Promise.resolve({ id: 1 });
  await expect(fetchData()).resolves.toEqual({ id: 1 });
});</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 模拟功能 -->
      <section class="section">
        <h2 class="section-title">模拟功能(Mocking)</h2>
        <div class="section-content">
          <p>Vitest提供强大的模拟功能，支持模拟函数、模块和时间等，语法与Jest类似但性能更好。</p>

          <div class="example-card">
            <h3>模拟函数</h3>
            <div class="code-example">
              <pre><code>import { it, expect, vi } from 'vitest';

it('tests mock functions', () => {
  // 创建模拟函数
  const mockFn = vi.fn((a, b) => a + b);

  // 调用模拟函数
  mockFn(2, 3);

  // 断言函数被调用
  expect(mockFn).toHaveBeenCalled();
  // 断言调用次数
  expect(mockFn).toHaveBeenCalledTimes(1);
  // 断言调用参数
  expect(mockFn).toHaveBeenCalledWith(2, 3);
  // 断言返回值
  expect(mockFn(2, 3)).toBe(5);
});</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>模拟模块</h3>
            <div class="code-example">
              <pre><code>import { it, expect, vi } from 'vitest';
import { getUser } from './api';

// 模拟axios模块
vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}));

import axios from 'axios';

it('fetches user data', async () => {
  // 设置模拟返回值
  axios.get.mockResolvedValue({
    data: { id: 1, name: 'John Doe' }
  });

  const user = await getUser(1);

  expect(axios.get).toHaveBeenCalledWith('/users/1');
  expect(user).toEqual({ id: 1, name: 'John Doe' });
});</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>模拟时间</h3>
            <div class="code-example">
              <pre><code>import { it, expect, vi, beforeEach, afterEach } from 'vitest';

it('tests timer function', () => {
  vi.useFakeTimers();

  const callback = vi.fn();
  setTimeout(callback, 1000);

  // 快进时间
  vi.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalled();

  vi.useRealTimers();
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 快照测试 -->
      <section class="section">
        <h2 class="section-title">快照测试</h2>
        <div class="section-content">
          <p>快照测试用于确保UI组件或数据结构不会意外更改，Vitest会将结果与存储的快照进行比较。</p>

          <div class="example-card">
            <div class="code-example">
              <pre><code>// 组件快照测试示例
import { it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

it('renders button correctly', () => {
  const wrapper = mount(Button, {
    props: { label: 'Click me' }
  });

  // 创建或比较快照
  expect(wrapper.html()).toMatchSnapshot();
});</code></pre>
            </div>
            <p class="note">
              当组件预期更改时，使用<code>vitest run --updateSnapshot</code>更新快照。
            </p>
          </div>
        </div>
      </section>

      <!-- 与Jest的区别 -->
      <section class="section">
        <h2 class="section-title">Vitest与Jest的主要区别</h2>
        <div class="section-content">
          <div class="comparison-table">
            <div class="comparison-item">
              <strong>启动速度</strong>：Vitest基于Vite，启动速度比Jest快2-10倍
            </div>
            <div class="comparison-item">
              <strong>热更新</strong>：Vitest支持测试热更新，修改测试后无需重新启动
            </div>
            <div class="comparison-item">
              <strong>配置</strong>：Vitest可与Vite配置合并，减少配置重复
            </div>
            <div class="comparison-item">
              <strong>类型支持</strong>：原生支持TypeScript，无需额外配置
            </div>
            <div class="comparison-item">
              <strong>生态系统</strong>：Jest生态更成熟，但Vitest正在快速增长
            </div>
            <div class="comparison-item">
              <strong>多线程</strong>：两者都支持，但Vitest的实现更高效
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Vitest使用指南 &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑部分，当前为静态展示
</script>

<style scoped lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  color: #334155;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.7;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;

  .title {
    color: #1e293b;
    margin: 0 0 10px 0;
    font-size: 1.8rem;
  }

  .subtitle {
    color: #64748b;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 400;
  }
}

.main-content {
  .section {
    margin-bottom: 40px;

    .section-title {
      color: #1e293b;
      border-bottom: 2px solid #dbeafe;
      padding-bottom: 8px;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 1.4rem;
    }

    .section-content {
      background-color: #fff;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
  }

  .code-example {
    background-color: #f8fafc;
    border-radius: 6px;
    margin: 15px 0;
    overflow-x: auto;
    border: 1px solid #e2e8f0;

    pre {
      margin: 0;
      padding: 15px;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        color: #0f172a;
      }
    }
  }

  .code-snippet {
    background-color: #f8fafc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    border: 1px solid #e2e8f0;
    overflow-x: auto;
  }

  .feature-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;

    .feature-item {
      background-color: #f0fdf4;
      border: 1px solid #dcfce7;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 0.9rem;
      color: #15803d;
    }
  }

  .installation-steps {
    .step {
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 0;
      }

      h3 {
        margin-top: 0;
        color: #1e293b;
        margin-bottom: 10px;
        font-size: 1.1rem;
      }
    }
  }

  .example-card {
    background-color: #f8fafc;
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e2e8f0;

    h3 {
      margin-top: 0;
      color: #1e293b;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .api-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .api-card {
    background-color: #f8fafc;
    border-radius: 6px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    h3 {
      margin-top: 0;
      color: #1e293b;
      margin-bottom: 15px;
      font-size: 1.1rem;
      padding-bottom: 8px;
      border-bottom: 1px dashed #e2e8f0;
    }

    .api-item {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      code {
        display: block;
        background-color: #eff6ff;
        color: #1e40af;
        padding: 5px 8px;
        border-radius: 3px;
        margin-bottom: 5px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
      }
    }
  }

  .comparison-table {
    margin-top: 15px;

    .comparison-item {
      padding: 12px 15px;
      border-bottom: 1px solid #e2e8f0;

      &:last-child {
        border-bottom: none;
      }

      strong {
        color: #1e293b;
        margin-right: 8px;
      }
    }
  }

  .note {
    color: #64748b;
    font-size: 0.95rem;
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #f1f5f9;
    border-radius: 4px;
  }
}

footer.footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.5rem;
  }
}
</style>
