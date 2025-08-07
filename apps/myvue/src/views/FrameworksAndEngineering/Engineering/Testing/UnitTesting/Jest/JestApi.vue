<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Jest 测试框架使用指南</h1>
      <p class="subtitle">JavaScript单元测试的完整解决方案</p>
    </header>

    <main class="main-content">
      <!-- 基本介绍 -->
      <section class="section">
        <h2 class="section-title">什么是Jest？</h2>
        <div class="section-content">
          <p>
            Jest是由Facebook开发的JavaScript测试框架，专注于简单性和易用性。它提供了一套完整的测试解决方案，
            包括断言库、测试运行器、模拟工具和代码覆盖率报告等功能，广泛用于React、Vue等前端项目的单元测试。
          </p>
          <div class="feature-list">
            <div class="feature-item">✅ 零配置，开箱即用</div>
            <div class="feature-item">✅ 内置断言库，无需额外依赖</div>
            <div class="feature-item">✅ 强大的模拟功能</div>
            <div class="feature-item">✅ 快照测试支持</div>
            <div class="feature-item">✅ 内置代码覆盖率报告</div>
            <div class="feature-item">✅ 并行测试执行，速度快</div>
          </div>
        </div>
      </section>

      <!-- 安装与配置 -->
      <section class="section">
        <h2 class="section-title">安装与基本配置</h2>
        <div class="section-content">
          <div class="installation-steps">
            <div class="step">
              <h3>1. 安装Jest</h3>
              <div class="code-example">
                <pre><code># 使用npm
npm install --save-dev jest

# 使用yarn
yarn add --dev jest

# 针对TypeScript项目
npm install --save-dev jest @types/jest ts-jest</code></pre>
              </div>
            </div>

            <div class="step">
              <h3>2. 基本配置</h3>
              <p>创建配置文件jest.config.js：</p>
              <div class="code-example">
                <pre><code>module.exports = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testEnvironment: 'jsdom', // 模拟浏览器环境
  collectCoverage: true,    // 启用代码覆盖率
  coverageDirectory: 'coverage' // 覆盖率报告目录
};</code></pre>
              </div>
            </div>

            <div class="step">
              <h3>3. 添加测试脚本</h3>
              <p>在package.json中添加：</p>
              <div class="code-example">
                <pre><code>"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
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
          <p>Jest测试文件通常放在__tests__目录下，或命名为*.test.js、*.spec.js。</p>

          <div class="example-card">
            <h3>简单测试示例</h3>
            <p>创建math.js文件：</p>
            <div class="code-example">
              <pre><code>// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}</code></pre>
            </div>

            <p>创建对应的测试文件math.test.js：</p>
            <div class="code-example">
              <pre><code>// math.test.js
import { add, multiply } from './math';

// 测试套件
describe('math functions', () => {
  // 单个测试用例
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});</code></pre>
            </div>

            <p>运行测试：</p>
            <div class="code-example">
              <pre><code>npm test</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 常用API -->
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
                <code>test(name, fn, timeout)</code>
                <p>定义单个测试用例，别名it()</p>
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
              <h3>更多断言</h3>
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
                <code>done()</code>
                <p>回调函数，标记异步测试完成</p>
              </div>
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
test('fetch data', async () => {
  const data = await fetchData();
  expect(data).toEqual({ id: 1 });
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
          <p>Jest提供强大的模拟功能，用于隔离测试代码与外部依赖。</p>

          <div class="example-card">
            <h3>模拟函数</h3>
            <div class="code-example">
              <pre><code>// 创建模拟函数
const mockFn = jest.fn();

// 测试函数是否被调用
mockFn();
expect(mockFn).toHaveBeenCalled();

// 测试调用次数
mockFn();
expect(mockFn).toHaveBeenCalledTimes(2);

// 测试调用参数
mockFn('hello');
expect(mockFn).toHaveBeenCalledWith('hello');</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>模拟模块</h3>
            <div class="code-example">
              <pre><code>// 模拟axios模块
jest.mock('axios');
import axios from 'axios';
import { fetchUser } from './api';

test('fetchUser returns user data', async () => {
  // 设置模拟返回值
  axios.get.mockResolvedValue({
    data: { id: 1, name: 'John' }
  });

  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: 'John' });
  expect(axios.get).toHaveBeenCalledWith('/users/1');
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 快照测试 -->
      <section class="section">
        <h2 class="section-title">快照测试</h2>
        <div class="section-content">
          <p>快照测试用于确保UI组件或数据结构不会意外更改，Jest会将结果与存储的快照进行比较。</p>

          <div class="example-card">
            <div class="code-example">
              <pre><code>// 组件快照测试示例
import { render } from '@testing-library/vue';
import Button from './Button.vue';

test('renders button correctly', () => {
  const { container } = render(Button, {
    props: { label: 'Click me' }
  });

  // 创建或比较快照
  expect(container).toMatchSnapshot();
});</code></pre>
            </div>
            <p class="note">
              当组件预期更改时，使用<code>jest --updateSnapshot</code>更新快照。
            </p>
          </div>
        </div>
      </section>

      <!-- 代码覆盖率 -->
      <section class="section">
        <h2 class="section-title">代码覆盖率</h2>
        <div class="section-content">
          <p>Jest内置代码覆盖率报告，可显示测试覆盖的代码比例。</p>
          <div class="code-example">
            <pre><code># 生成覆盖率报告
npm run test:coverage</code></pre>
          </div>
          <p>覆盖率报告将包含：</p>
          <ul class="coverage-list">
            <li><strong>语句覆盖率</strong>：执行了多少百分比的语句</li>
            <li><strong>分支覆盖率</strong>：执行了多少百分比的代码分支</li>
            <li><strong>函数覆盖率</strong>：执行了多少百分比的函数</li>
            <li><strong>行覆盖率</strong>：执行了多少百分比的代码行</li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Jest使用指南 &copy; {{ new Date().getFullYear() }}</p>
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

  .coverage-list {
    padding-left: 25px;
    margin: 15px 0 0 0;

    li {
      margin-bottom: 8px;
      position: relative;

      &::before {
        content: "•";
        color: #6366f1;
        font-weight: bold;
        position: absolute;
        left: -20px;
      }

      strong {
        color: #1e293b;
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
