<template>
  <div class="declaration-files-guide">
    <!-- 顶部标题区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>TypeScript 声明文件</h1>
        <div class="hero-subtitle">
          <span>为JavaScript代码提供类型支持</span>
        </div>
        <div class="version-badge">TypeScript 5.0+</div>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>.d.ts 文件</h3>
          <p>纯类型声明文件</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>类型推断</h3>
          <p>增强代码智能感知</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📦</div>
          <h3>模块扩展</h3>
          <p>扩展第三方库类型</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 基础概念 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">📚</span>
          <span>基础概念</span>
        </h2>
        <div class="section-content">
          <div class="concept-intro">
            <p>
              <strong>声明文件（.d.ts）</strong>是TypeScript中用于描述JavaScript代码类型的特殊文件。它们只包含类型信息，不包含具体实现，相当于代码的类型"说明书"。
            </p>
          </div>

          <div class="feature-columns">
            <div class="feature-column">
              <h3>为什么需要声明文件？</h3>
              <ul class="feature-list">
                <li>为纯JavaScript库提供类型支持</li>
                <li>描述第三方库的API接口</li>
                <li>增强代码编辑器的智能提示</li>
                <li>提供编译时的类型检查</li>
                <li>促进团队协作和代码维护</li>
              </ul>

              <div class="code-block">
                <h4>声明文件 vs 普通TS文件</h4>
                <pre><code>// 普通TypeScript文件 (.ts)
export function add(a: number, b: number): number {
  return a + b;
}

// 声明文件 (.d.ts)
declare function add(a: number, b: number): number;</code></pre>
              </div>
            </div>

            <div class="feature-column">
              <h3>声明文件的类型</h3>
              <div class="type-card-grid">
                <div class="type-card">
                  <div class="type-icon">1️⃣</div>
                  <h4>全局声明</h4>
                  <p>不包含import/export，全局可用</p>
                  <pre><code>declare const VERSION: string;</code></pre>
                </div>

                <div class="type-card">
                  <div class="type-icon">2️⃣</div>
                  <h4>模块声明</h4>
                  <p>包含import/export，模块作用域</p>
                  <pre><code>export declare function log(msg: string): void;</code></pre>
                </div>

                <div class="type-card">
                  <div class="type-icon">3️⃣</div>
                  <h4>模块扩展</h4>
                  <p>扩展已有模块的类型</p>
                  <pre><code>declare module 'module-name' {
  export interface Config { ... }
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 创建声明文件 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">🛠️</span>
          <span>创建声明文件</span>
        </h2>
        <div class="section-content">
          <div class="step-by-step">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>识别需要声明的JavaScript代码</h3>
                <p>分析需要类型支持的JS代码，确定要暴露的API接口</p>
                <div class="code-compare">
                  <div class="code-column">
                    <h4>原始JS代码</h4>
                    <pre><code>// utils.js
function formatDate(date) {
  return date.toISOString();
}

const APP_NAME = 'MyApp';</code></pre>
                  </div>
                  <div class="code-column">
                    <h4>对应声明</h4>
                    <pre><code>// utils.d.ts
declare function formatDate(date: Date): string;
declare const APP_NAME: string;</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>选择声明文件类型</h3>
                <p>根据使用场景选择全局声明或模块声明</p>
                <div class="scenario-cards">
                  <div class="scenario-card">
                    <h4>全局库声明</h4>
                    <pre><code>// global.d.ts
declare namespace MyLib {
  function init(config: object): void;
  version: string;
}</code></pre>
                    <p>适用于通过&lt;script&gt;标签引入的库</p>
                  </div>

                  <div class="scenario-card">
                    <h4>模块化声明</h4>
                    <pre><code>// module.d.ts
declare module 'my-module' {
  export function calculate(n: number): number;
  export const PI: number;
}</code></pre>
                    <p>适用于通过import引入的模块</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>编写类型声明</h3>
                <p>使用TypeScript类型语法描述JavaScript代码</p>
                <div class="type-examples">
                  <div class="example-card">
                    <h4>函数声明</h4>
                    <pre><code>// JavaScript
function greet(name, age) { ... }

// 声明文件
declare function greet(name: string, age: number): void;</code></pre>
                  </div>

                  <div class="example-card">
                    <h4>接口声明</h4>
                    <pre><code>// JavaScript
const user = { name: 'John', age: 30 };

// 声明文件
interface User {
  name: string;
  age: number;
}</code></pre>
                  </div>

                  <div class="example-card">
                    <h4>类声明</h4>
                    <pre><code>// JavaScript
class Person { ... }

// 声明文件
declare class Person {
  constructor(name: string);
  getName(): string;
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">💼</span>
          <span>使用场景</span>
        </h2>
        <div class="section-content">
          <div class="use-case-grid">
            <div class="use-case-card">
              <div class="use-case-icon">📦</div>
              <h3>为第三方JS库添加类型</h3>
              <p>当使用纯JavaScript库时，可以为其创建声明文件以获得TypeScript支持</p>
              <div class="code-block">
                <pre><code>// jquery.d.ts
declare module 'jquery' {
  interface JQuery {
    modal(action: string): JQuery;
  }
  function $(ready: () => void): void;
  export = $;
}</code></pre>
              </div>
            </div>

            <div class="use-case-card">
              <div class="use-case-icon">🔄</div>
              <h3>扩展已有类型定义</h3>
              <p>为已有类型添加额外属性或方法</p>
              <div class="code-block">
                <pre><code>// vue-augmentations.d.ts
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $myProperty: string;
    $myMethod(): void;
  }
}</code></pre>
              </div>
            </div>

            <div class="use-case-card">
              <div class="use-case-icon">🌍</div>
              <h3>全局变量声明</h3>
              <p>声明通过script标签引入的全局变量</p>
              <div class="code-block">
                <pre><code>// globals.d.ts
declare const __DEV__: boolean;
declare interface Window {
  MyGlobal: any;
}</code></pre>
              </div>
            </div>
          </div>

          <div class="advanced-usage">
            <h3>高级用法</h3>
            <div class="advanced-grid">
              <div class="advanced-card">
                <h4>条件类型</h4>
                <pre><code>type MyType&lt;T&gt; = T extends string ? T[] : never;

declare function process&lt;T&gt;(input: T): MyType&lt;T&gt;;</code></pre>
                <p>基于类型参数的条件类型声明</p>
              </div>

              <div class="advanced-card">
                <h4>模板字面量类型</h4>
                <pre><code>type EventName&lt;T extends string&gt; = `${T}Changed`;

declare function on&lt;T extends string&gt;(
  event: EventName&lt;T&gt;,
  handler: () => void
): void;</code></pre>
                <p>使用模板字符串创建类型</p>
              </div>

              <div class="advanced-card">
                <h4>声明合并</h4>
                <pre><code>// user.d.ts
interface User {
  name: string;
}

// 扩展接口
interface User {
  age: number;
}

// 最终User类型包含name和age</code></pre>
                <p>合并多个同名的接口声明</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="content-section summary-section">
        <h2 class="section-title">
          <span class="title-icon">✅</span>
          <span>最佳实践</span>
        </h2>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice-card">
              <div class="practice-icon">1️⃣</div>
              <h3>优先使用@types</h3>
              <p>对于流行的第三方库，优先安装@types/xxx包而不是自己编写</p>
              <pre><code>npm install --save-dev @types/lodash</code></pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">2️⃣</div>
              <h3>模块化组织</h3>
              <p>按功能模块组织声明文件，避免一个巨大的global.d.ts</p>
              <pre><code>types/
  ├── jquery.d.ts
  ├── vue.d.ts
  └── custom.d.ts</code></pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">3️⃣</div>
              <h3>精确类型</h3>
              <p>避免过度使用any，尽可能提供精确的类型定义</p>
              <pre><code>// 避免
declare const data: any;

// 推荐
interface Data {
  id: number;
  value: string;
}
declare const data: Data;</code></pre>
            </div>
          </div>

          <div class="final-note">
            <p>
              TypeScript声明文件是连接JavaScript生态与类型系统的桥梁。合理使用声明文件可以显著提升代码质量和开发体验。
              对于新项目，应优先使用TypeScript编写源码；对于现有JavaScript项目或第三方库，声明文件是引入类型安全的最佳方式。
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置与组件相关的逻辑代码
import { ref } from 'vue';

const declarationExamples = ref([
  {
    title: '全局变量',
    code: 'declare const VERSION: string;'
  },
  {
    title: '模块声明',
    code: `declare module 'my-module' {
  export function calculate(n: number): number;
}`
  },
  {
    title: '类型扩展',
    code: `declare module 'vue' {
  interface ComponentCustomProperties {
    $myMethod: () => void;
  }
}`
  }
]);
</script>

<style scoped lang="less">
// 变量定义
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@success-color: #3aafa9;
@warning-color: #f72585;
@dark-color: #2b2d42;
@light-color: #f8f9fa;
@text-color: #2d3748;
@border-color: #e2e8f0;
@card-bg: #ffffff;
@radius: 12px;
@shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

.declaration-files-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

.hero-section {
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  border-radius: @radius;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: @shadow;
  position: relative;
  color: white;
  padding: 40px;

  .hero-content {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
      background: linear-gradient(to right, #ffffff, #e0f7fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
      font-weight: 400;
    }

    .version-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 6px 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: @radius;
  padding: 25px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    opacity: 0.9;
  }
}

.content-container {
  padding: 0 20px;
}

.content-section {
  background: @card-bg;
  border-radius: @radius;
  box-shadow: @shadow;
  padding: 30px;
  margin-bottom: 30px;

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: @dark-color;
    padding-bottom: 15px;
    border-bottom: 2px solid @border-color;

    .title-icon {
      font-size: 1.5rem;
    }
  }
}

.section-content {
  p {
    margin-bottom: 25px;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
  }
}

.concept-intro {
  background: #f8fafc;
  border-radius: @radius;
  padding: 25px;
  margin-bottom: 30px;
  border-left: 4px solid @primary-color;

  p {
    margin-bottom: 0;
    font-size: 1.15rem;
  }
}

.feature-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.feature-column {
  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: @dark-color;
    padding-bottom: 10px;
    border-bottom: 2px solid @border-color;
  }
}

.feature-list {
  list-style: none;
  margin-bottom: 25px;

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    font-size: 1.05rem;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: @success-color;
      font-weight: bold;
    }
  }
}

.code-block {
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid @border-color;

  h4 {
    background: #edf2f7;
    color: @dark-color;
    padding: 10px 15px;
    font-size: 0.95rem;
    font-weight: 600;
  }

  pre {
    padding: 15px;
    margin: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2d3748;
    }
  }
}

.type-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.type-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .type-icon {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: @primary-color;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: @dark-color;
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 15px;
    color: #4a5568;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.step-by-step {
  .step {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;

    .step-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .step-content {
      flex-grow: 1;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 15px;
        color: @dark-color;
      }

      p {
        font-size: 1.05rem;
        margin-bottom: 20px;
      }
    }
  }
}

.code-compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .code-column {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: @dark-color;
    }

    pre {
      background: #f8fafc;
      border-radius: 6px;
      padding: 12px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
      }
    }
  }
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.scenario-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 0;
    color: #4a5568;
  }
}

.type-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.example-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.use-case-card {
  background: white;
  border-radius: @radius;
  padding: 25px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .use-case-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    color: #4a5568;
  }
}

.advanced-usage {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.advanced-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 0;
    color: #4a5568;
  }
}

.summary-section {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);

  .section-title {
    border-bottom-color: @primary-color;
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.practice-card {
  background: white;
  border-radius: @radius;
  padding: 25px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .practice-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    color: #4a5568;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.final-note {
  background: #f0f9ff;
  padding: 25px;
  border-radius: @radius;
  border-left: 4px solid @primary-color;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 0;
    color: @text-color;
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero-section {
    padding: 30px 20px;

    .hero-content {
      h1 {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }
    }
  }

  .feature-columns,
  .step-by-step .step {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .advanced-grid,
  .best-practices {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-section {
    .hero-content {
      h1 {
        font-size: 2rem;
      }
    }
  }

  .content-section {
    padding: 20px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 25px 15px;

    .hero-content {
      h1 {
        font-size: 1.8rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }
    }
  }

  .content-container {
    padding: 0 10px;
  }

  .content-section {
    padding: 15px;

    .section-title {
      font-size: 1.5rem;
    }
  }

  .code-block {
    h4 {
      font-size: 0.9rem;
    }

    pre code {
      font-size: 0.8rem;
    }
  }

  .concept-intro {
    padding: 15px;

    p {
      font-size: 1rem;
    }
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-section {
  animation: fadeIn 0.6s ease-out forwards;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  &:nth-child(4) {
    animation-delay: 0.4s;
  }
}

.feature-card,
.type-card,
.scenario-card,
.example-card,
.use-case-card,
.advanced-card,
.practice-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* 代码高亮增强 */
pre code {
  display: block;
  overflow-x: auto;
  padding: 1em;

  .token {
    &.comment {
      color: #6b7280;
      font-style: italic;
    }

    &.keyword {
      color: #8b5cf6;
      font-weight: bold;
    }

    &.string {
      color: #10b981;
    }

    &.function {
      color: #3b82f6;
    }

    &.punctuation {
      color: #64748b;
    }

    &.operator {
      color: #ef4444;
    }

    &.number {
      color: #f59e0b;
    }
  }
}

/* 打印样式 */
@media print {
  .declaration-files-guide {
    padding: 0;
    background: none;
  }

  .hero-section {
    background: none !important;
    color: black !important;
    padding: 0 !important;

    .hero-content {
      h1 {
        background: none !important;
        -webkit-text-fill-color: black !important;
        color: black !important;
      }
    }

    .feature-grid {
      display: none;
    }
  }

  .feature-card,
  .type-card,
  .scenario-card,
  .example-card,
  .use-case-card,
  .advanced-card,
  .practice-card {
    box-shadow: none !important;
    border: 1px solid #ddd !important;
    page-break-inside: avoid;
  }

  .content-section {
    box-shadow: none;
    page-break-before: auto;
    page-break-after: avoid;
  }

  .code-block {
    page-break-inside: avoid;

    pre {
      white-space: pre-wrap;
    }
  }
}
</style>