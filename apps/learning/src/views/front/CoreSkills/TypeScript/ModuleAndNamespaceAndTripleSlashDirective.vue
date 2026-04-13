<template>
  <div class="typescript-features">
    <!-- 顶部标题区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>TypeScript 模块系统</h1>
        <div class="hero-subtitle">
          <span>模块化开发的最佳实践与高级特性</span>
        </div>
        <div class="version-badge">TypeScript 5.0+</div>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">📦</div>
          <h3>模块系统</h3>
          <p>ES模块与CommonJS</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🗂️</div>
          <h3>命名空间</h3>
          <p>逻辑分组与避免污染</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔗</div>
          <h3>三斜线指令</h3>
          <p>依赖管理与声明合并</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 模块系统 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">📦</span>
          <span>模块系统</span>
        </h2>
        <div class="section-content">
          <div class="concept-intro">
            <p>
              TypeScript支持两种模块系统：<strong>ES模块</strong>（ECMAScript标准）和<strong>CommonJS</strong>（Node.js默认）。
              模块是TypeScript组织代码的主要方式，每个文件都是一个独立的模块，通过<code>import</code>和<code>export</code>进行交互。
            </p>
          </div>

          <div class="feature-columns">
            <div class="feature-column">
              <h3>ES模块语法</h3>
              <div class="code-block">
                <h4>导出声明</h4>
                <pre><code>// 具名导出
export const PI = 3.14;
export function calculate() { /*...*/ }

// 默认导出
export default class Calculator { /*...*/ }</code></pre>
              </div>

              <div class="code-block">
                <h4>导入声明</h4>
                <pre><code>// 导入具名导出
import { PI, calculate } from './math';

// 导入默认导出
import Calculator from './Calculator';

// 全部导入为命名空间
import * as math from './math';</code></pre>
              </div>
            </div>

            <div class="feature-column">
              <h3>CommonJS语法</h3>
              <div class="code-block">
                <h4>导出声明</h4>
                <pre><code>// 导出对象
exports.PI = 3.14;
exports.calculate = function() { /*...*/ };

// 替换整个exports
module.exports = class Calculator { /*...*/ };</code></pre>
              </div>

              <div class="code-block">
                <h4>导入声明</h4>
                <pre><code>// 导入整个模块
const math = require('./math');

// 解构导入
const { PI } = require('./math');

// 导入默认导出
const Calculator = require('./Calculator');</code></pre>
              </div>
            </div>
          </div>

          <div class="use-case-section">
            <h3>使用场景与最佳实践</h3>
            <div class="use-case-grid">
              <div class="use-case-card">
                <div class="use-case-icon">🌐</div>
                <h4>前端项目</h4>
                <p>使用ES模块语法，配合webpack/vite等打包工具</p>
                <div class="recommendation">
                  <span>✅ 推荐</span>
                  <code>"module": "ESNext"</code>
                </div>
              </div>

              <div class="use-case-card">
                <div class="use-case-icon">🖥️</div>
                <h4>Node.js后端</h4>
                <p>根据Node版本选择，新项目建议ES模块</p>
                <div class="recommendation">
                  <span>⚠️ 注意</span>
                  <code>"type": "module"</code>
                </div>
              </div>

              <div class="use-case-card">
                <div class="use-case-icon">🔀</div>
                <h4>混合使用</h4>
                <p>通过配置allowImportingTsExtensions实现互操作</p>
                <div class="recommendation">
                  <span>🔧 配置</span>
                  <code>allowSyntheticDefaultImports: true</code>
                </div>
              </div>
            </div>
          </div>

          <div class="advanced-section">
            <h3>高级模块特性</h3>
            <div class="advanced-features">
              <div class="advanced-card">
                <h4>动态导入</h4>
                <pre><code>// 按需加载模块
const module = await import('./path/to/module');</code></pre>
                <p>运行时决定加载哪些模块，常用于代码分割</p>
              </div>

              <div class="advanced-card">
                <h4>类型导出</h4>
                <pre><code>// 导出类型
export type { User } from './types';

// 导入仅用于类型
import type { User } from './types';</code></pre>
                <p>明确区分运行时和类型导入，优化编译输出</p>
              </div>

              <div class="advanced-card">
                <h4>路径别名</h4>
                <pre><code>// tsconfig.json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}

// 使用别名
import module from '@/lib/module';</code></pre>
                <p>简化导入路径，避免相对路径混乱</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 命名空间 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">🗂️</span>
          <span>命名空间</span>
        </h2>
        <div class="section-content">
          <div class="concept-intro">
            <p>
              <strong>命名空间</strong>（Namespace）是TypeScript早期用于组织代码的方式，通过<code>namespace</code>关键字创建逻辑分组，
              避免全局作用域污染。在现代TypeScript中，模块已取代了大部分命名空间的使用场景，但在某些情况下仍然有用。
            </p>
          </div>

          <div class="namespace-features">
            <div class="namespace-column">
              <h3>基本语法</h3>
              <div class="code-block">
                <h4>定义命名空间</h4>
                <pre><code>namespace Utilities {
  export function log(message: string) {
    console.log(message);
  }

  export namespace Http {
    export function get(url: string) { /*...*/ }
  }
}</code></pre>
              </div>

              <div class="code-block">
                <h4>使用命名空间</h4>
                <pre><code>// 使用命名空间成员
Utilities.log('Hello');
Utilities.Http.get('https://example.com');

// 通过别名简化
import Http = Utilities.Http;
Http.get('https://example.com');</code></pre>
              </div>
            </div>

            <div class="namespace-column">
              <h3>高级特性</h3>
              <div class="code-block">
                <h4>多文件命名空间</h4>
                <pre><code>// validation.ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

// letters.ts
/// &lt;reference path="validation.ts" />
namespace Validation {
  export class LettersOnlyValidator
    implements StringValidator { /*...*/ }
}</code></pre>
                <p class="note">使用三斜线指令合并多个文件的命名空间</p>
              </div>

              <div class="code-block">
                <h4>模块与命名空间混合</h4>
                <pre><code>// shapes.ts
export namespace Shapes {
  export class Triangle { /*...*/ }
  export class Square { /*...*/ }
}

// 使用
import { Shapes } from './shapes';
new Shapes.Triangle();</code></pre>
                <p class="note">模块中的命名空间，不推荐但有时有用</p>
              </div>
            </div>
          </div>

          <div class="namespace-usage">
            <h3>使用场景</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <div class="usage-icon">🏗️</div>
                <h4>遗留代码迁移</h4>
                <p>将旧版全局脚本逐步迁移到模块系统</p>
                <div class="recommendation">
                  <span>🔄 过渡方案</span>
                </div>
              </div>

              <div class="usage-card">
                <div class="usage-icon">🧩</div>
                <h4>类型声明文件</h4>
                <p>在.d.ts文件中组织复杂类型定义</p>
                <div class="recommendation">
                  <span>✅ 推荐</span>
                </div>
              </div>

              <div class="usage-card">
                <div class="usage-icon">⚠️</div>
                <h4>现代项目</h4>
                <p>新项目应优先使用模块而非命名空间</p>
                <div class="recommendation">
                  <span>🚫 避免</span>
                </div>
              </div>
            </div>

            <div class="migration-tip">
              <div class="tip-icon">💡</div>
              <p>
                现代TypeScript项目应优先使用模块(<code>import/export</code>)而非命名空间。
                命名空间主要用于声明文件(.d.ts)和遗留代码维护。模块提供了更好的封装性、树摇优化和静态分析能力。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 三斜线指令 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">🔗</span>
          <span>三斜线指令</span>
        </h2>
        <div class="section-content">
          <div class="concept-intro">
            <p>
              <strong>三斜线指令</strong>（Triple-Slash Directives）是包含单个XML标签的单行注释，用于声明文件间的依赖关系。
              这些指令在编译过程中会被处理，主要用于类型声明文件(.d.ts)中。
            </p>
          </div>

          <div class="directive-types">
            <h3>主要指令类型</h3>
            <div class="directive-grid">
              <div class="directive-card">
                <div class="directive-header">
                  <h4>/// &lt;reference types="..." /&gt;</h4>
                  <div class="directive-icon">📦</div>
                </div>
                <p>声明对另一个类型声明包的依赖</p>
                <pre><code>/// &lt;reference types="node" /&gt;

// 现在可以使用Node.js类型
const url: URL = new URL('...');</code></pre>
                <div class="use-case">
                  <span>使用场景：</span>
                  <p>引入DefinitelyTyped类型定义(@types)</p>
                </div>
              </div>

              <div class="directive-card">
                <div class="directive-header">
                  <h4>/// &lt;reference path="..." /&gt;</h4>
                  <div class="directive-icon">🛠️</div>
                </div>
                <p>声明对另一个文件的依赖</p>
                <pre><code>/// &lt;reference path="../models/user.d.ts" /&gt;

// 现在可以使用User类型
const user: User = { ... };</code></pre>
                <div class="use-case">
                  <span>使用场景：</span>
                  <p>组织项目内的类型声明文件</p>
                </div>
              </div>

              <div class="directive-card">
                <div class="directive-header">
                  <h4>/// &lt;amd-module /&gt;</h4>
                  <div class="directive-icon">⚙️</div>
                </div>
                <p>为AMD模块指定名称</p>
                <pre><code>/// &lt;amd-module name="MyModule" /&gt;
export class MyClass { ... }</code></pre>
                <div class="use-case">
                  <span>使用场景：</span>
                  <p>配置AMD模块加载器使用的模块名</p>
                </div>
              </div>
            </div>
          </div>

          <div class="modern-alternatives">
            <h3>现代替代方案</h3>
            <div class="alternatives-grid">
              <div class="alternative-card">
                <div class="alternative-icon">🔄</div>
                <h4>types字段</h4>
                <p>在tsconfig.json中配置全局类型</p>
                <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "types": ["node", "jest"]
  }
}</code></pre>
              </div>

              <div class="alternative-card">
                <div class="alternative-icon">📁</div>
                <h4>模块导入</h4>
                <p>使用ES模块导入类型定义</p>
                <pre><code>// 替代三斜线指令
import { User } from '../models/user';</code></pre>
              </div>
            </div>

            <div class="migration-tip">
              <div class="tip-icon">ℹ️</div>
              <p>
                在现代TypeScript项目中，大多数三斜线指令的功能已被<code>import</code>语句和<code>tsconfig.json</code>配置取代。
                三斜线指令主要保留用于声明文件(.d.ts)和特殊场景。新代码应优先使用模块导入语法。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="content-section summary-section">
        <h2 class="section-title">
          <span class="title-icon">✅</span>
          <span>总结与最佳实践</span>
        </h2>
        <div class="section-content">
          <div class="best-practices">
            <h3>技术选型指南</h3>
            <div class="practice-grid">
              <div class="practice-card">
                <div class="practice-number">1</div>
                <p><strong>新项目</strong>：始终使用ES模块(<code>import/export</code>)组织代码</p>
              </div>
              <div class="practice-card">
                <div class="practice-number">2</div>
                <p><strong>类型定义</strong>：在.d.ts文件中合理使用命名空间和三斜线指令</p>
              </div>
              <div class="practice-number">3</div>
              <p><strong>依赖管理</strong>：优先使用<code>tsconfig.json</code>的<code>types</code>字段而非三斜线指令</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">4</div>
              <p><strong>代码拆分</strong>：使用动态导入(<code>import()</code>)实现按需加载</p>
            </div>
          </div>
        </div>

        <div class="evolution-timeline">
          <h3>技术演进路线</h3>
          <div class="timeline-steps">
            <div class="step">
              <div class="step-icon">1️⃣</div>
              <div class="step-content">
                <h4>全局脚本</h4>
                <p>IIFE和全局命名空间</p>
              </div>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <div class="step-icon">2️⃣</div>
              <div class="step-content">
                <h4>命名空间</h4>
                <p>TypeScript命名空间+三斜线指令</p>
              </div>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <div class="step-icon">3️⃣</div>
              <div class="step-content">
                <h4>模块系统</h4>
                <p>ES模块/CommonJS标准</p>
              </div>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <div class="step-icon">🚀</div>
              <div class="step-content">
                <h4>现代实践</h4>
                <p>ES模块+类型导入+动态导入</p>
              </div>
            </div>
          </div>
        </div>

        <div class="final-note">
          <p>
            TypeScript的模块系统经历了从命名空间到标准模块的演进过程。<strong>现代项目应优先使用ES模块语法</strong>，
            只在类型声明文件等特定场景使用命名空间和三斜线指令。合理利用这些特性可以构建出结构清晰、易于维护的大型项目。
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置与组件相关的逻辑代码
// 例如演示模块导入的实际示例
import { ref } from 'vue';

// 演示模块导入
const moduleInfo = ref({
  esModule: true,
  namespaceUsage: 'legacy code',
  tripleSlash: 'type definitions'
});
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

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.typescript-features {
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

.use-case-section {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.use-case-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
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

  .recommendation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85rem;
    padding-top: 10px;
    border-top: 1px dashed @border-color;

    span {
      font-weight: 600;

      &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 6px;
      }

      &:first-child::before {
        background: @success-color;
      }
    }

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      background: #edf2f7;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
}

.advanced-section {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.advanced-features {
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

.namespace-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.namespace-column {
  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: @dark-color;
    padding-bottom: 10px;
    border-bottom: 2px solid @border-color;
  }
}

.note {
  font-size: 0.85rem;
  color: #718096;
  margin-top: 10px;
  font-style: italic;
}

.namespace-usage {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.usage-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .usage-icon {
    font-size: 2rem;
    margin-bottom: 15px;
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

  .recommendation {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    padding-top: 10px;
    border-top: 1px dashed @border-color;

    span {
      &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 6px;
      }

      &:first-child::before {
        background: @warning-color;
      }
    }
  }
}

.migration-tip {
  display: flex;
  gap: 15px;
  background: #f0f9ff;
  padding: 20px;
  border-radius: @radius;
  border-left: 4px solid @primary-color;
  margin-top: 30px;

  .tip-icon {
    font-size: 1.8rem;
    color: @primary-color;
  }

  p {
    margin-bottom: 0;
    font-size: 1rem;
    color: #2d3748;
  }
}

.directive-types {
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.directive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.directive-card {
  background: white;
  border-radius: @radius;
  overflow: hidden;
  box-shadow: @shadow;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  .directive-header {
    padding: 15px 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, @primary-color, @secondary-color);

    h4 {
      font-size: 1.1rem;
      margin: 0;
    }

    .directive-icon {
      font-size: 2rem;
    }
  }

  p {
    padding: 15px 20px;
    margin: 0;
    font-size: 1rem;
    color: #4a5568;
    border-bottom: 1px solid @border-color;
  }

  pre {
    background: #f8fafc;
    color: #2d3748;
    padding: 15px;
    margin: 0;
    font-size: 0.85rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }

  .use-case {
    padding: 15px;
    background: #f8fafc;
    border-top: 1px solid @border-color;

    span {
      font-weight: 600;
      color: @dark-color;
    }

    p {
      padding: 5px 0 0;
      border: none;
      font-size: 0.9rem;
    }
  }
}

.modern-alternatives {
  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.alternative-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .alternative-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary-color;
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
}

.summary-section {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);

  .section-title {
    border-bottom-color: @primary-color;
  }
}

.best-practices {
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.practice-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;
  display: flex;
  align-items: flex-start;
  gap: 15px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .practice-number {
    background: @primary-color;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
  }

  p {
    margin-bottom: 0;
    font-size: 1.05rem;

    strong {
      color: @dark-color;
    }
  }
}

.evolution-timeline {
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.timeline-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.step {
  background: white;
  border-radius: @radius;
  padding: 15px;
  border: 1px solid @border-color;
  min-width: 150px;
  text-align: center;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .step-icon {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .step-content {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 5px;
      color: @dark-color;
    }

    p {
      font-size: 0.9rem;
      color: #718096;
      margin-bottom: 0;
    }
  }
}

.step-arrow {
  font-size: 1.5rem;
  color: @primary-color;
  padding: 0 10px;
  opacity: 0.7;
}

.final-note {
  background: #f0f9ff;
  padding: 25px;
  border-radius: @radius;
  border-left: 4px solid @primary-color;
  margin-top: 30px;

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
  .namespace-features {
    grid-template-columns: 1fr;
  }

  .advanced-features,
  .directive-grid,
  .alternatives-grid,
  .practice-grid {
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

  .timeline-steps {
    flex-direction: column;
    align-items: stretch;

    .step-arrow {
      transform: rotate(90deg);
      padding: 10px 0;
      text-align: center;
    }
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
.use-case-card,
.advanced-card,
.usage-card,
.directive-card,
.alternative-card,
.practice-card,
.step {
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
  .typescript-features {
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
  .use-case-card,
  .advanced-card,
  .usage-card,
  .directive-card,
  .alternative-card,
  .practice-card,
  .step {
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