<template>
  <div class="globalthis-container">
    <!-- 标题区域 -->
    <section class="header-section">
      <h1 class="title">globalThis</h1>
      <div class="subtitle">JavaScript 的全局对象标准化访问方式</div>
      <div class="quick-facts">
        <div class="fact-card">
          <div class="fact-icon">📅</div>
          <div class="fact-content">
            <div class="fact-value">ES2020</div>
            <div class="fact-label">ECMAScript版本</div>
          </div>
        </div>
        <div class="fact-card">
          <div class="fact-icon">🔄</div>
          <div class="fact-content">
            <div class="fact-value">跨环境</div>
            <div class="fact-label">运行环境兼容</div>
          </div>
        </div>
        <div class="fact-card">
          <div class="fact-icon">🔍</div>
          <div class="fact-content">
            <div class="fact-value">全局访问</div>
            <div class="fact-label">主要用途</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容目录 -->
    <section class="toc-section">
      <h2 class="section-title">📑 内容目录</h2>
      <div class="toc-grid">
        <div
          v-for="(item, index) in tocItems"
          :key="index"
          class="toc-item"
          @click="scrollToSection(item.id)"
        >
          <div class="toc-number">{{ index + 1 }}</div>
          <div class="toc-text">{{ item.text }}</div>
        </div>
      </div>
    </section>

    <!-- 基本概念 -->
    <section id="basic-concept" class="content-section">
      <h2 class="section-title">1. 基本概念</h2>
      <div class="concept-grid">
        <div class="concept-card">
          <div class="concept-icon">🌐</div>
          <div class="concept-content">
            <h3>什么是 globalThis？</h3>
            <p>
              <code>globalThis</code> 是 JavaScript 中访问全局对象的标准化方式，它提供了一个统一的属性来获取当前环境下的全局对象。
            </p>
            <p>
              在 ES2020 之前，不同 JavaScript 环境（浏览器、Node.js、Web Worker 等）访问全局对象的方式各不相同。
            </p>
          </div>
        </div>
        <div class="concept-card">
          <div class="concept-icon">🎯</div>
          <div class="concept-content">
            <h3>为什么需要 globalThis？</h3>
            <p>
              解决不同环境下全局对象访问方式不一致的问题：
            </p>
            <ul>
              <li>浏览器: <code>window</code></li>
              <li>Node.js: <code>global</code></li>
              <li>Web Worker: <code>self</code></li>
            </ul>
            <p>
              <code>globalThis</code> 提供了统一的访问方式，使代码可以跨环境运行。
            </p>
          </div>
        </div>
      </div>

      <div class="code-example">
        <h3>全局对象在不同环境中的表现</h3>
        <pre><code>// 浏览器中
console.log(globalThis === window); // true

// Node.js中
console.log(globalThis === global); // true

// Web Worker中
console.log(globalThis === self); // true</code></pre>
      </div>
    </section>

    <!-- 使用示例 -->
    <section id="usage-examples" class="content-section">
      <h2 class="section-title">2. 使用示例</h2>

      <div class="example-grid">
        <div class="example-card">
          <div class="example-header">
            <div class="example-icon">1️⃣</div>
            <h3>基本用法</h3>
          </div>
          <div class="example-content">
            <pre><code>// 定义全局变量
globalThis.myGlobalVar = 'Hello, globalThis!';

// 在任何地方访问
console.log(myGlobalVar); // 'Hello, globalThis!'
console.log(globalThis.myGlobalVar); // 'Hello, globalThis!'</code></pre>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="example-icon">2️⃣</div>
            <h3>跨环境兼容</h3>
          </div>
          <div class="example-content">
            <pre><code>// 旧方式 - 需要环境检测
const getGlobal = () => {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('无法找到全局对象');
};

// 新方式 - 直接使用 globalThis
const globalObj = globalThis;</code></pre>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="example-icon">3️⃣</div>
            <h3>添加全局方法</h3>
          </div>
          <div class="example-content">
            <pre><code>// 添加全局工具方法
globalThis.formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// 在任何模块中使用
console.log(globalThis.formatDate('2023-01-01'));</code></pre>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="example-icon">4️⃣</div>
            <h3>全局配置</h3>
          </div>
          <div class="example-content">
            <pre><code>// 设置全局配置
globalThis.appConfig = {
  apiBaseUrl: 'https://api.example.com',
  debugMode: false,
  version: '1.0.0'
};

// 在应用任何地方访问配置
if (globalThis.appConfig.debugMode) {
  console.log('Debug mode is enabled');
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 适用场景 -->
    <section id="use-cases" class="content-section">
      <h2 class="section-title">3. 适用场景</h2>

      <div class="use-cases-grid">
        <div class="use-case-card">
          <div class="case-icon">📦</div>
          <div class="case-content">
            <h3>跨环境库开发</h3>
            <p>开发需要在多种 JavaScript 环境中运行的库时，使用 <code>globalThis</code> 可以确保正确访问全局对象。</p>
            <ul>
              <li>浏览器扩展</li>
              <li>通用工具库</li>
              <li>跨平台SDK</li>
            </ul>
          </div>
        </div>

        <div class="use-case-card">
          <div class="case-icon">🔌</div>
          <div class="case-content">
            <h3>插件系统</h3>
            <p>允许插件向全局环境注册功能或覆盖默认行为。</p>
            <pre><code>// 插件注册全局方法
globalThis.myPlugin = {
  init: () => { /* 初始化逻辑 */ },
  version: '1.0.0'
};</code></pre>
          </div>
        </div>

        <div class="use-case-card">
          <div class="case-icon">⚙️</div>
          <div class="case-content">
            <h3>全局配置管理</h3>
            <p>在应用启动时设置全局配置，在整个应用中共享。</p>
            <pre><code>// 设置全局配置
globalThis.config = {
  apiEndpoint: 'https://api.example.com',
  theme: 'dark'
};

// 在任何组件/模块中访问
const endpoint = globalThis.config.apiEndpoint;</code></pre>
          </div>
        </div>

        <div class="use-case-card">
          <div class="case-icon">🧪</div>
          <div class="case-content">
            <h3>测试工具</h3>
            <p>在测试环境中模拟全局对象或注入测试工具。</p>
            <pre><code>// 测试设置
beforeEach(() => {
  globalThis.mockStorage = {
    getItem: jest.fn(),
    setItem: jest.fn()
  };
});</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section id="considerations" class="content-section">
      <h2 class="section-title">4. 注意事项</h2>

      <div class="considerations-grid">
        <div class="consideration-card warning">
          <div class="consideration-icon">⚠️</div>
          <div class="consideration-content">
            <h3>全局命名污染</h3>
            <p>过度使用全局变量会导致命名冲突和难以维护的代码。</p>
            <p>建议：</p>
            <ul>
              <li>为全局变量添加命名前缀</li>
              <li>使用命名空间对象</li>
              <li>尽量减少全局变量的使用</li>
            </ul>
          </div>
        </div>

        <div class="consideration-card warning">
          <div class="consideration-icon">🔄</div>
          <div class="consideration-content">
            <h3>浏览器兼容性</h3>
            <p>虽然现代浏览器都支持 <code>globalThis</code>，但在旧环境中可能需要 polyfill。</p>
            <pre><code>// 简单的 polyfill
if (typeof globalThis === 'undefined') {
  window.globalThis = window;
}</code></pre>
          </div>
        </div>

        <div class="consideration-card warning">
          <div class="consideration-icon">🔒</div>
          <div class="consideration-content">
            <h3>安全考虑</h3>
            <p>修改全局对象可能会影响其他代码的行为，特别是在共享环境中。</p>
            <p>建议：</p>
            <ul>
              <li>避免覆盖原生全局属性</li>
              <li>使用 <code>Object.defineProperty</code> 设置不可枚举属性</li>
              <li>考虑使用冻结对象防止意外修改</li>
            </ul>
          </div>
        </div>

        <div class="consideration-card warning">
          <div class="consideration-icon">📦</div>
          <div class="consideration-content">
            <h3>模块系统影响</h3>
            <p>在模块系统中（如 ES modules），顶级变量默认不是全局的。</p>
            <p>使用 <code>globalThis</code> 可以显式地创建全局变量。</p>
            <pre><code>// 在模块中
const localVar = 'local'; // 不是全局的
globalThis.globalVar = 'global'; // 全局的</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section id="best-practices" class="content-section">
      <h2 class="section-title">5. 最佳实践</h2>

      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-number">1</div>
          <div class="practice-content">
            <h3>使用命名空间</h3>
            <p>将全局变量组织到命名空间对象中，减少污染。</p>
            <pre><code>// 不推荐
globalThis.userPrefs = {...};

// 推荐
globalThis.MyApp = globalThis.MyApp || {};
globalThis.MyApp.userPrefs = {...};</code></pre>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">2</div>
          <div class="practice-content">
            <h3>添加类型定义</h3>
            <p>在 TypeScript 中为全局变量添加类型声明。</p>
            <pre><code>// global.d.ts
declare global {
  interface GlobalThis {
    myGlobalVar: string;
    appConfig: {
      apiUrl: string;
      debug: boolean;
    };
  }
}</code></pre>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">3</div>
          <div class="practice-content">
            <h3>谨慎修改</h3>
            <p>避免修改现有的全局对象属性，可能导致难以调试的问题。</p>
            <pre><code>// 不推荐 - 覆盖原生方法
globalThis.console.log = () => {};

// 推荐 - 添加新功能而不修改现有
globalThis.customLogger = {
  log: (msg) => console.log(`[CUSTOM] ${msg}`)
};</code></pre>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">4</div>
          <div class="practice-content">
            <h3>环境检测</h3>
            <p>在需要特定环境功能时，仍然需要检测环境。</p>
            <pre><code>// 检查浏览器环境
if (typeof globalThis.document !== 'undefined') {
  // 浏览器特有逻辑
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="summary-section">
      <h2 class="section-title">🎯 总结</h2>

      <div class="summary-content">
        <div class="key-point">
          <div class="point-icon">🌐</div>
          <div class="point-text">
            <code>globalThis</code> 提供了<strong>跨环境</strong>访问全局对象的标准化方式
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">⚡</div>
          <div class="point-text">
            解决了浏览器(<code>window</code>)、Node.js(<code>global</code>)、Worker(<code>self</code>)之间的不一致问题
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">🛠️</div>
          <div class="point-text">
            适用于<strong>跨环境库</strong>、<strong>全局配置</strong>和<strong>插件系统</strong>等场景
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">⚠️</div>
          <div class="point-text">
            使用时需注意<strong>命名污染</strong>、<strong>兼容性</strong>和<strong>安全性</strong>
          </div>
        </div>
      </div>

      <div class="quote-box">
        <div class="quote-icon">💬</div>
        <div class="quote-content">
          "globalThis 是 JavaScript 生态系统迈向更加标准化和一致性的重要一步，它简化了跨环境代码的编写和维护。"
          <div class="quote-author">- JavaScript 标准委员会成员</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tocItems = ref([
  { id: 'basic-concept', text: '基本概念' },
  { id: 'usage-examples', text: '使用示例' },
  { id: 'use-cases', text: '适用场景' },
  { id: 'considerations', text: '注意事项' },
  { id: 'best-practices', text: '最佳实践' }
]);

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="less" scoped>
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@warning-color: #d19a66;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@code-bg: #f6f8ff;

.globalthis-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, @light-bg, transparent);
  border-radius: 16px;

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-light;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
}

.quick-facts {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;

  .fact-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: @card-shadow;
    min-width: 180px;

    .fact-icon {
      font-size: 1.8rem;
    }

    .fact-content {
      .fact-value {
        font-weight: 700;
        font-size: 1.2rem;
        color: @primary-color;
      }

      .fact-label {
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }
}

.toc-section {
  margin-bottom: 2rem;

  .toc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;

    .toc-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: @light-bg;
      padding: 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid @primary-color;

      &:hover {
        background: rgba(74, 108, 247, 0.1);
        transform: translateX(5px);
      }

      .toc-number {
        width: 28px;
        height: 28px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        flex-shrink: 0;
      }
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.7rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: darken(@primary-color, 10%);
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .concept-card {
    display: flex;
    gap: 1rem;
    background: @light-bg;
    padding: 1.5rem;
    border-radius: 12px;

    .concept-icon {
      width: 50px;
      height: 50px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .concept-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
      }

      p {
        margin: 0.5rem 0;
        line-height: 1.6;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0.75rem 0;

        li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.25rem;

          &::before {
            content: "•";
            color: @primary-color;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }

      code {
        font-family: 'Fira Code', monospace;
        background: rgba(0, 0, 0, 0.05);
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
      }
    }
  }
}

.code-example {
  margin-bottom: 2rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  pre {
    background: @code-bg;
    border-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;
    margin: 0;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .example-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;

    .example-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;

      .example-icon {
        font-size: 1.5rem;
      }

      h3 {
        margin: 0;
        font-size: 1.2rem;
      }
    }

    .example-content {
      pre {
        background: @code-bg;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .use-case-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;

    .case-icon {
      font-size: 2rem;
      color: @primary-color;
      margin-bottom: 1rem;
    }

    .case-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
      }

      p {
        margin: 0.5rem 0;
        line-height: 1.6;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0.75rem 0;

        li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.25rem;

          &::before {
            content: "•";
            color: @primary-color;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }

      pre {
        background: @code-bg;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0.75rem 0;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
        }
      }
    }
  }
}

.considerations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .consideration-card {
    display: flex;
    gap: 1rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;

    &.warning {
      border-left: 4px solid @warning-color;
    }

    .consideration-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
      color: @warning-color;
    }

    .consideration-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0.5rem 0;
        line-height: 1.6;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0.75rem 0;

        li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.25rem;

          &::before {
            content: "•";
            color: @warning-color;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }

      pre {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 6px;
        padding: 0.75rem;
        overflow-x: auto;
        margin: 0.5rem 0;
        font-size: 0.85rem;
      }
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;

  .practice-card {
    display: flex;
    gap: 1.5rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;

    .practice-number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .practice-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
      }

      p {
        margin: 0.5rem 0;
        line-height: 1.6;
      }

      pre {
        background: @code-bg;
        border-radius: 6px;
        padding: 0.75rem;
        overflow-x: auto;
        margin: 0.5rem 0;
        font-size: 0.85rem;
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #f0f9ff, #f8f9ff);
  border-radius: 16px;
  padding: 2rem;

  .summary-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .key-point {
      display: flex;
      gap: 1rem;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      align-items: center;

      .point-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
      }

      .point-text {
        strong {
          color: @primary-color;
        }

        code {
          font-family: 'Fira Code', monospace;
          background: @code-bg;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
        }
      }
    }
  }

  .quote-box {
    display: flex;
    gap: 1.5rem;
    background: white;
    border-left: 4px solid @accent-color;
    border-radius: 0 12px 12px 0;
    padding: 1.5rem;

    .quote-icon {
      font-size: 2rem;
      color: @accent-color;
      flex-shrink: 0;
    }

    .quote-content {
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.7;

      .quote-author {
        margin-top: 1rem;
        font-weight: 500;
        text-align: right;
        color: @text-light;
      }
    }
  }
}

@media (max-width: 768px) {
  .globalthis-container {
    padding: 1rem;
  }

  .header-section {
    padding: 1.5rem 1rem;

    .title {
      font-size: 2rem !important;
    }
  }

  .quick-facts {
    gap: 1rem;

    .fact-card {
      flex: 1;
      min-width: 140px;
      padding: 1rem;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .concept-grid, .example-grid, .use-cases-grid,
  .considerations-grid, .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
