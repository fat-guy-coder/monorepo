<template>
  <div class="babel-plugins-container">
    <header class="header">
      <h1>Babel 插件介绍</h1>
      <p class="subtitle">现代化 JavaScript 开发的必备工具</p>
      <div class="babel-logo">Babel</div>
    </header>

    <section class="intro-section">
      <div class="intro-content">
        <h2>什么是 Babel 插件？</h2>
        <p>
          Babel 插件是 Babel 编译器的重要组成部分，它们允许开发者扩展 Babel
          的功能，实现代码转换、语法支持、优化等功能。插件在编译过程中对
          AST（抽象语法树）进行操作，是现代化 JavaScript 开发的必备工具。
        </p>

        <div class="babel-process">
          <div class="process-step">
            <div class="step-number">1</div>
            <h3>源码输入</h3>
            <p>ES6+ / JSX / TypeScript</p>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">2</div>
            <h3>解析</h3>
            <p>生成 AST</p>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">3</div>
            <h3>转换</h3>
            <p>插件操作 AST</p>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">4</div>
            <h3>生成</h3>
            <p>ES5 代码输出</p>
          </div>
        </div>
      </div>
    </section>

    <section class="plugins-section">
      <h2 class="section-title">
        <span class="icon">🧩</span>
        核心插件介绍
      </h2>

      <div class="plugins-grid">
        <!-- 插件 1 -->
        <div class="plugin-card">
          <div class="plugin-header">
            <h3>@babel/plugin-transform-arrow-functions</h3>
            <span class="plugin-tag">转换</span>
          </div>
          <div class="plugin-content">
            <h4>作用</h4>
            <p>将 ES6 箭头函数转换为普通函数，解决 this 作用域问题。</p>

            <h4>原理</h4>
            <p>识别 AST 中的箭头函数节点，将其转换为函数表达式，并保留 this 绑定。</p>

            <div class="code-comparison">
              <div>
                <h5>转换前</h5>
                <pre><code class="language-javascript">const sum = (a, b) => a + b;</code></pre>
              </div>
              <div>
                <h5>转换后</h5>
                <pre><code class="language-javascript">const sum = function(a, b) {
  return a + b;
};</code></pre>
              </div>
            </div>

            <h4>适用场景</h4>
            <ul>
              <li>需要兼容不支持箭头函数的浏览器（如 IE）</li>
              <li>解决箭头函数中的 this 作用域问题</li>
            </ul>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>解决 this 绑定问题</li>
                  <li>提高浏览器兼容性</li>
                  <li>配置简单</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>增加代码体积</li>
                  <li>丢失箭头函数简洁性</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 插件 2 -->
        <div class="plugin-card">
          <div class="plugin-header">
            <h3>@babel/plugin-proposal-class-properties</h3>
            <span class="plugin-tag">语法</span>
          </div>
          <div class="plugin-content">
            <h4>作用</h4>
            <p>支持类属性语法提案，允许直接在类中定义属性。</p>

            <h4>原理</h4>
            <p>将类属性转换为构造函数内的赋值语句。</p>

            <div class="code-comparison">
              <div>
                <h5>转换前</h5>
                <pre><code class="language-javascript">class Counter {
  count = 0;

  increment = () => {
    this.count++;
  }
}</code></pre>
              </div>
              <div>
                <h5>转换后</h5>
                <pre><code class="language-javascript">class Counter {
  constructor() {
    this.count = 0;
    this.increment = () => {
      this.count++;
    };
  }
}</code></pre>
              </div>
            </div>

            <h4>适用场景</h4>
            <ul>
              <li>React 类组件中使用类属性</li>
              <li>简化类初始化的代码</li>
              <li>使用类字段语法提案的项目</li>
            </ul>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>简化类定义</li>
                  <li>解决类方法 this 绑定问题</li>
                  <li>提高代码可读性</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要额外的运行时支持</li>
                  <li>非标准语法（提案阶段）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 插件 3 -->
        <div class="plugin-card">
          <div class="plugin-header">
            <h3>babel-plugin-import</h3>
            <span class="plugin-tag">优化</span>
          </div>
          <div class="plugin-content">
            <h4>作用</h4>
            <p>实现组件库的按需加载，减少打包体积。</p>

            <h4>原理</h4>
            <p>将全局导入语句转换为按需导入的路径。</p>

            <div class="code-comparison">
              <div>
                <h5>转换前</h5>
                <pre><code class="language-javascript">import { Button, Input } from 'antd';</code></pre>
              </div>
              <div>
                <h5>转换后</h5>
                <pre><code class="language-javascript">import Button from 'antd/lib/button';
import Input from 'antd/lib/input';</code></pre>
              </div>
            </div>

            <h4>适用场景</h4>
            <ul>
              <li>使用 Ant Design、Element UI 等大型组件库</li>
              <li>需要优化项目打包体积</li>
              <li>减少应用启动时间</li>
            </ul>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>大幅减少打包体积</li>
                  <li>配置简单</li>
                  <li>支持主流组件库</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要针对不同库进行配置</li>
                  <li>可能增加构建时间</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 插件 4 -->
        <div class="plugin-card">
          <div class="plugin-header">
            <h3>@babel/plugin-transform-runtime</h3>
            <span class="plugin-tag">工具</span>
          </div>
          <div class="plugin-content">
            <h4>作用</h4>
            <p>复用 Babel 注入的 helper 代码，减少代码冗余。</p>

            <h4>原理</h4>
            <p>将内联的 helper 函数替换为从 @babel/runtime 模块导入。</p>

            <div class="code-comparison">
              <div>
                <h5>转换前</h5>
                <pre><code class="language-javascript">class Person {}
// 生成内联的_classCallCheck函数</code></pre>
              </div>
              <div>
                <h5>转换后</h5>
                <pre><code class="language-javascript">import _classCallCheck from '@babel/runtime/helpers/classCallCheck';

class Person {
  constructor() {
    _classCallCheck(this, Person);
  }
}</code></pre>
              </div>
            </div>

            <h4>适用场景</h4>
            <ul>
              <li>开发库和组件</li>
              <li>需要减小最终打包体积</li>
              <li>避免污染全局作用域</li>
            </ul>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>减少代码重复</li>
                  <li>避免全局污染</li>
                  <li>优化打包体积</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>增加外部依赖</li>
                  <li>增加模块导入的开销</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 插件 5 -->
        <div class="plugin-card">
          <div class="plugin-header">
            <h3>babel-plugin-lodash</h3>
            <span class="plugin-tag">优化</span>
          </div>
          <div class="plugin-content">
            <h4>作用</h4>
            <p>优化 Lodash 使用，实现按需加载和简化链式调用。</p>

            <h4>原理</h4>
            <p>转换 _.chain 语法，并将全局导入转换为模块化导入。</p>

            <div class="code-comparison">
              <div>
                <h5>转换前</h5>
                <pre><code class="language-javascript">import _ from 'lodash';

_.chain([1, 2, 3])
  .map(x => x * 2)
  .filter(x => x > 2)
  .value();</code></pre>
              </div>
              <div>
                <h5>转换后</h5>
                <pre><code class="language-javascript">import map from 'lodash/map';
import filter from 'lodash/filter';

filter(map([1, 2, 3], x => x * 2), x => x > 2);</code></pre>
              </div>
            </div>

            <h4>适用场景</h4>
            <ul>
              <li>使用 Lodash 的工具库</li>
              <li>需要优化 Lodash 的打包体积</li>
              <li>简化 Lodash 的链式调用</li>
            </ul>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>显著减小 Lodash 体积</li>
                  <li>优化链式调用性能</li>
                  <li>支持 Tree Shaking</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>仅适用于 Lodash</li>
                  <li>改变原有编码风格</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 插件 6 -->
        <div class="plugin-card">
          <div class="plugin-header">
            <h3>@babel/plugin-syntax-dynamic-import</h3>
            <span class="plugin-tag">语法</span>
          </div>
          <div class="plugin-content">
            <h4>作用</h4>
            <p>支持动态导入语法，实现代码分割。</p>

            <h4>原理</h4>
            <p>解析动态导入语法，转换为 Webpack 等打包工具可识别的代码分割点。</p>

            <div class="code-comparison">
              <div>
                <h5>转换前</h5>
                <pre><code class="language-javascript">const module = await import('./module.js');</code></pre>
              </div>
              <div>
                <h5>转换后</h5>
                <pre><code class="language-javascript">const module = Promise.resolve()
  .then(() => require('./module.js'));</code></pre>
              </div>
            </div>

            <h4>适用场景</h4>
            <ul>
              <li>实现路由级代码分割</li>
              <li>按需加载大型模块</li>
              <li>优化应用启动性能</li>
            </ul>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>支持原生动态导入语法</li>
                  <li>实现代码分割</li>
                  <li>提高应用加载速度</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要打包工具配合</li>
                  <li>增加异步加载复杂度</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="best-practices">
      <h2 class="section-title">
        <span class="icon">📝</span>
        最佳实践
      </h2>

      <div class="practices-grid">
        <div class="practice-card">
          <h3>插件选择策略</h3>
          <ul>
            <li>按需引入插件，避免加载不必要的转换</li>
            <li>使用 @babel/preset-env 自动管理插件</li>
            <li>生产环境移除调试类插件</li>
          </ul>
        </div>

        <div class="practice-card">
          <h3>性能优化</h3>
          <ul>
            <li>禁用 sourceMap 可提高构建速度</li>
            <li>使用 cacheDirectory 缓存 Babel 结果</li>
            <li>限制 node_modules 的转换范围</li>
          </ul>
        </div>

        <div class="practice-card">
          <h3>配置示例</h3>
          <pre><code class="language-javascript">// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: '> 0.25%, not dead',
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }]
  ],
  cacheDirectory: true
};</code></pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>
        Babel 插件是现代 JavaScript 开发不可或缺的工具，合理使用可以大幅提升开发效率和代码质量。
      </p>
      <div class="links">
        <a href="https://babeljs.io/docs/en/plugins" target="_blank" class="link-button"
          >官方插件列表</a
        >
        <a href="https://github.com/topics/babel-plugin" target="_blank" class="link-button"
          >社区插件</a
        >
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
.babel-plugins-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    sans-serif;
  color: #1a1a1a;
  line-height: 1.6;
  background: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #f5da55;
      margin-bottom: 0.5rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.25rem;
      color: #64748b;
      font-weight: 400;
      margin-bottom: 1.5rem;
    }

    .babel-logo {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background-color: #323330;
      color: #f5da55;
      font-family: 'Fira Code', monospace;
      font-weight: 700;
      font-size: 1.5rem;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .intro-section {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.8rem;
      color: #323330;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #334155;
      margin-bottom: 1.5rem;
    }

    .babel-process {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .process-step {
        flex: 1;
        text-align: center;
        padding: 1.5rem;
        background: #f5f7fa;
        border-radius: 8px;
        position: relative;
        transition:
          transform 0.3s,
          box-shadow 0.3s;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: #f5da55;
          color: #323330;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }

        h3 {
          font-size: 1.3rem;
          color: #323330;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: #64748b;
        }
      }

      .process-arrow {
        font-size: 1.5rem;
        color: #94a3b8;
        padding: 0 1rem;

        @media (max-width: 768px) {
          padding: 1rem 0;
          transform: rotate(90deg);
        }
      }
    }
  }

  .section-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #323330;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;

    .icon {
      margin-right: 0.75rem;
      font-size: 1.5rem;
    }
  }

  .plugins-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .plugin-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .plugin-header {
      background: linear-gradient(135deg, #323330 0%, #1a1a1a 100%);
      color: white;
      padding: 1.2rem 1.5rem;
      position: relative;

      h3 {
        font-size: 1.25rem;
        margin: 0;
        font-weight: 600;
        color: #f5da55;
      }

      .plugin-tag {
        position: absolute;
        top: -10px;
        right: 15px;
        background: #f5da55;
        color: #323330;
        padding: 0.2rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
      }
    }

    .plugin-content {
      padding: 1.5rem;

      h4 {
        font-size: 1.1rem;
        color: #323330;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #f5da55;
          border-radius: 50%;
        }
      }

      p {
        color: #475569;
        margin-bottom: 1rem;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0.75rem 0;

        li {
          margin-bottom: 0.5rem;
          color: #475569;
        }
      }

      .code-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1.5rem 0;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        > div {
          background: #f8fafc;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #e2e8f0;

          h5 {
            margin: 0;
            padding: 0.6rem 1rem;
            background: #e2e8f0;
            font-size: 0.9rem;
            font-weight: 600;
            color: #475569;
          }

          pre {
            margin: 0;
            padding: 1rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            overflow-x: auto;

            code {
              display: block;
              color: #334155;
            }
          }
        }
      }

      .pros-cons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1.5rem;

        @media (max-width: 480px) {
          grid-template-columns: 1fr;
        }

        > div {
          padding: 1rem;
          border-radius: 6px;

          h4 {
            margin-top: 0;
          }
        }

        .pros {
          background: rgba(101, 163, 13, 0.1);
          border-left: 4px solid #65a30d;
        }

        .cons {
          background: rgba(220, 38, 38, 0.1);
          border-left: 4px solid #dc2626;
        }
      }
    }
  }

  .best-practices {
    margin-bottom: 3rem;

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .practice-card {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-3px);
      }

      h3 {
        font-size: 1.2rem;
        color: #323330;
        margin-top: 0;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e2e8f0;
      }

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.5rem;
          color: #475569;
        }
      }

      pre {
        background: #f8fafc;
        padding: 1rem;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        margin: 0;

        code {
          color: #334155;
        }
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    p {
      color: #475569;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }

    .links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .link-button {
      display: inline-block;
      padding: 0.8rem 1.8rem;
      background: #323330;
      color: #f5da55;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      transition:
        background 0.3s,
        transform 0.3s;

      &:hover {
        background: #1a1a1a;
        transform: translateY(-2px);
      }
    }
  }
}
</style>
