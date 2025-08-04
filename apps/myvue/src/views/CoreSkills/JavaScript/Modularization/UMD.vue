<template>
  <div class="umd-container">
    <div class="header">
      <h1>UMD (Universal Module Definition) 详解</h1>
      <p class="subtitle">一种通用的 JavaScript 模块定义规范</p>
      <div class="compatibility-badges">
        <div class="badge">
          <div class="icon">🌐</div>
          <span>浏览器环境</span>
        </div>
        <div class="badge">
          <div class="icon">🖥️</div>
          <span>Node.js 环境</span>
        </div>
        <div class="badge">
          <div class="icon">🔄</div>
          <span>AMD 兼容</span>
        </div>
        <div class="badge">
          <div class="icon">📦</div>
          <span>CommonJS 兼容</span>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 概念解释 -->
      <div class="card concept-card">
        <div class="card-header">
          <div class="icon">📚</div>
          <h2>UMD 概念</h2>
        </div>
        <div class="card-content">
          <p>UMD（Universal Module Definition）是一种通用的 JavaScript 模块定义规范，旨在兼容多种模块系统：</p>

          <div class="definition">
            <h3>核心目标</h3>
            <p>提供一种通用的模块定义方式，使同一份代码可以在多种环境中运行：</p>
            <ul>
              <li>浏览器环境（通过全局变量）</li>
              <li>AMD 模块加载器（如 RequireJS）</li>
              <li>CommonJS 环境（如 Node.js）</li>
              <li>ES 模块（通过转译工具）</li>
            </ul>
          </div>

          <div class="analogy">
            <div class="icon">🔌</div>
            <p>就像是一个"万能适配器"，让你的代码能在任何环境中运行</p>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="card use-cases-card">
        <div class="card-header">
          <div class="icon">💼</div>
          <h2>使用场景</h2>
        </div>
        <div class="card-content">
          <div class="use-case">
            <h3>库开发</h3>
            <p>创建通用 JavaScript 库，支持多种使用方式</p>
            <div class="examples">
              <span>jQuery 插件</span>
              <span>日期处理库</span>
              <span>工具函数集</span>
            </div>
          </div>

          <div class="use-case">
            <h3>多环境部署</h3>
            <p>同一份代码需要在不同环境中运行</p>
            <div class="examples">
              <span>浏览器 + Node.js</span>
              <span>传统网站 + 现代前端框架</span>
            </div>
          </div>

          <div class="use-case">
            <h3>兼容旧系统</h3>
            <p>在遗留系统中使用现代模块</p>
            <div class="examples">
              <span>无模块系统的老网站</span>
              <span>RequireJS 项目</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作原理 -->
    <div class="card workflow-card">
      <div class="card-header">
        <div class="icon">⚙️</div>
        <h2>UMD 工作原理</h2>
      </div>
      <div class="card-content">
        <div class="workflow-diagram">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>环境检测</h3>
              <p>检测当前支持的模块系统</p>
            </div>
          </div>

          <div class="connector">↓</div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>模块注册</h3>
              <p>根据环境选择合适的注册方式</p>
            </div>
          </div>

          <div class="connector">↓</div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>导出模块</h3>
              <p>将模块暴露给当前环境</p>
            </div>
          </div>
        </div>

        <div class="code-sample">
          <h3>UMD 基本结构</h3>
          <pre><code>(function (root, factory) {
  // 检测是否支持 AMD
  if (typeof define === 'function' && define.amd) {
    define(['dependency'], factory);
  }
  // 检测是否支持 CommonJS
  else if (typeof exports === 'object') {
    module.exports = factory(require('dependency'));
  }
  // 浏览器全局环境
  else {
    root.MyLibrary = factory(root.Dependency);
  }
}(this, function (dependency) {
  // 模块功能实现
  return {
    // 导出方法和属性
  };
}));</code></pre>
        </div>
      </div>
    </div>

    <!-- 创建和使用 -->
    <div class="content-grid">
      <!-- 创建 UMD 模块 -->
      <div class="card creation-card">
        <div class="card-header">
          <div class="icon">🛠️</div>
          <h2>创建 UMD 模块</h2>
        </div>
        <div class="card-content">
          <div class="method">
            <h3>手动创建</h3>
            <p>使用上述模式手动编写 UMD 封装</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>完全控制</li>
                  <li>无构建依赖</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>容易出错</li>
                  <li>维护困难</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="method">
            <h3>构建工具</h3>
            <p>使用 Webpack/Rollup 等工具自动生成</p>
            <div class="examples">
              <h4>Webpack 配置示例</h4>
              <pre><code>// webpack.config.js
module.exports = {
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用 UMD 模块 -->
      <div class="card usage-card">
        <div class="card-header">
          <div class="icon">📥</div>
          <h2>使用 UMD 模块</h2>
        </div>
        <div class="card-content">
          <div class="usage-method">
            <h3>浏览器全局使用</h3>
            <pre><code>&lt;script src="path/to/library.js"&gt;&lt;/script&gt;
&lt;script&gt;
  // 通过全局变量访问
  MyLibrary.doSomething();
&lt;/script&gt;</code></pre>
          </div>

          <div class="usage-method">
            <h3>AMD 环境使用</h3>
            <pre><code>require(['my-library'], function(MyLibrary) {
  MyLibrary.doSomething();
});</code></pre>
          </div>

          <div class="usage-method">
            <h3>CommonJS 环境使用</h3>
            <pre><code>const MyLibrary = require('my-library');
MyLibrary.doSomething();</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 优缺点对比 -->
    <div class="card pros-cons-card">
      <div class="card-header">
        <div class="icon">⚖️</div>
        <h2>UMD 优缺点对比</h2>
      </div>
      <div class="card-content">
        <div class="comparison">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>
                <div class="icon">✅</div>
                <div>
                  <h4>通用性强</h4>
                  <p>支持多种环境和模块系统</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <h4>兼容性好</h4>
                  <p>兼容新旧系统，无需额外配置</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <h4>易于分发</h4>
                  <p>单一文件即可在各种环境中使用</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <h4>过渡方案</h4>
                  <p>从传统JS迁移到模块系统的桥梁</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>
                <div class="icon">❌</div>
                <div>
                  <h4>文件体积大</h4>
                  <p>包含兼容代码，比ES模块大20-30%</p>
                </div>
              </li>
              <li>
                <div class="icon">❌</div>
                <div>
                  <h4>性能开销</h4>
                  <p>运行时环境检测有小幅性能影响</p>
                </div>
              </li>
              <li>
                <div class="icon">❌</div>
                <div>
                  <h4>现代性不足</h4>
                  <p>在纯ES模块环境中不是最佳选择</p>
                </div>
              </li>
              <li>
                <div class="icon">❌</div>
                <div>
                  <h4>树摇困难</h4>
                  <p>难以进行有效的代码优化和分割</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="card best-practices-card">
      <div class="card-header">
        <div class="icon">🏆</div>
        <h2>UMD 最佳实践</h2>
      </div>
      <div class="card-content">
        <div class="practices">
          <div class="practice">
            <div class="number">1</div>
            <div class="content">
              <h3>明确命名空间</h3>
              <p>使用唯一且明确的全局变量名，避免冲突</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>依赖声明</h3>
              <p>明确声明外部依赖，确保正确加载</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>压缩代码</h3>
              <p>使用UglifyJS等工具减小文件体积</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>提供类型定义</h3>
              <p>为TypeScript用户提供.d.ts类型文件</p>
            </div>
          </div>
        </div>

        <div class="migration-tip">
          <div class="icon">🔄</div>
          <div class="content">
            <h3>迁移建议</h3>
            <p>对于新项目，优先使用ES模块；对于需要广泛兼容的库，UMD+ES模块同时提供是最佳方案</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="conclusion">
      <h2>UMD 在现代开发中的定位</h2>
      <div class="summary">
        <p>UMD 是 JavaScript 模块化发展历程中的重要一环，为不同模块系统之间提供了兼容方案。</p>
        <p>在 ES 模块成为标准的今天，UMD 仍然是分发通用库的实用选择，特别是需要兼容旧环境的场景。</p>
      </div>
      <div class="recommendation">
        <div class="icon">💡</div>
        <p>对于库作者：同时提供 UMD 和 ES 模块版本</p>
        <p>对于应用开发者：优先使用 ES 模块，必要时使用 UMD</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里不需要复杂的逻辑，主要是展示内容
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.umd-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
}

.compatibility-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  .badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: fade(@primary-color, 10%);
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 500;

    .icon {
      font-size: 1.2rem;
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;

  .icon {
    font-size: 1.8rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
}

.card-content {
  padding: 1.5rem;

  p {
    margin-bottom: 1.5rem;
  }
}

.concept-card {
  .definition {
    background-color: @light-bg;
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .analogy {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(135deg, fade(@accent-color, 10%), fade(@accent-color, 5%));
    border-radius: 8px;
    padding: 1rem;
    border-left: 3px solid @accent-color;

    .icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      font-style: italic;
    }
  }
}

.use-cases-card {
  .use-case {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    .examples {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.8rem;

      span {
        padding: 0.3rem 0.8rem;
        background-color: @light-bg;
        border-radius: 4px;
        font-size: 0.85rem;
      }
    }
  }
}

.workflow-card {
  margin-bottom: 2rem;

  .workflow-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .step {
      display: flex;
      align-items: center;
      background-color: @light-bg;
      border-radius: 8px;
      padding: 1.2rem;
      width: 100%;
      max-width: 500px;

      .step-number {
        width: 36px;
        height: 36px;
        background-color: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        margin-right: 1.5rem;
        flex-shrink: 0;
      }

      .step-content {
        h3 {
          margin: 0 0 0.3rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .connector {
      font-size: 1.5rem;
      color: @text-light;
      height: 30px;
    }
  }

  .code-sample {
    background-color: #2d2d2d;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      margin: 0;
      padding: 0.8rem 1.2rem;
      background-color: #3a3a3a;
      color: #f0f0f0;
      font-size: 1rem;
    }

    pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;

      code {
        color: #f8f8f2;
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
}

.creation-card {
  .method {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;

      .pros,
      .cons {
        padding: 1rem;
        border-radius: 8px;

        h4 {
          margin-top: 0;
        }
      }

      .pros {
        background-color: fade(#2ec4b6, 10%);
        border-left: 3px solid #2ec4b6;
      }

      .cons {
        background-color: fade(#e71d36, 10%);
        border-left: 3px solid #e71d36;
      }
    }

    .examples {
      margin-top: 1rem;

      h4 {
        margin: 0 0 0.5rem;
        color: @text-light;
        font-weight: 500;
      }

      pre {
        background-color: #2d2d2d;
        border-radius: 6px;
        padding: 1rem;
        overflow-x: auto;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.usage-card {
  .usage-method {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    pre {
      background-color: #2d2d2d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;

      code {
        color: #f8f8f2;
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
      }
    }
  }
}

.pros-cons-card {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    h3 {
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @border-color;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1rem;
        align-items: flex-start;

        .icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        h4 {
          margin: 0 0 0.3rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-light;
        }
      }
    }

    .pros li {
      background-color: fade(#2ec4b6, 10%);
    }

    .cons li {
      background-color: fade(#e71d36, 10%);
    }
  }
}

.best-practices-card {
  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .practice {
      display: flex;
      gap: 1rem;
      align-items: flex-start;

      .number {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .content {
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-light;
        }
      }
    }
  }

  .migration-tip {
    display: flex;
    gap: 1rem;
    background: linear-gradient(135deg, fade(@accent-color, 10%), fade(@accent-color, 5%));
    border-radius: 8px;
    padding: 1.2rem;
    border-left: 3px solid @accent-color;

    .icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    h3 {
      margin: 0 0 0.5rem;
    }

    p {
      margin: 0;
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .summary {
    max-width: 800px;
    margin: 0 auto 1.5rem;

    p {
      margin-bottom: 1rem;
      font-size: 1.05rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .recommendation {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    background-color: white;
    border-radius: 30px;
    padding: 0.8rem 1.5rem;
    box-shadow: @card-shadow;
    font-weight: 500;

    .icon {
      font-size: 1.5rem;
      color: @accent-color;
    }

    p {
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .umd-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .workflow-diagram {
    .step {
      max-width: 100% !important;
    }
  }
}
</style>
