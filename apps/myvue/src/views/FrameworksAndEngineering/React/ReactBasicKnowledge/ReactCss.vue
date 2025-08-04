<template>
  <div class="react-css-container">
    <header class="react-css-header">
      <h1>React CSS 方案基本介绍</h1>
      <p class="subtitle">探索 React 应用中的样式管理最佳实践</p>
      <div class="css-approaches">
        <div class="approach" v-for="(approach, index) in cssApproaches" :key="index">
          <div class="approach-icon">{{ approach.icon }}</div>
          <div class="approach-name">{{ approach.name }}</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📚</span>
          为什么需要多种 CSS 方案？
        </h2>
        <div class="intro">
          <p>在 React 生态系统中，有多种 CSS 解决方案可供选择，每种方案都有其独特的优势和适用场景。选择合适的 CSS 方案可以帮助开发者：</p>

          <div class="benefits">
            <div class="benefit">
              <div class="icon">🧩</div>
              <h3>组件化样式</h3>
              <p>将样式与组件紧密结合</p>
            </div>
            <div class="benefit">
              <div class="icon">🎨</div>
              <h3>样式隔离</h3>
              <p>避免全局样式冲突</p>
            </div>
            <div class="benefit">
              <div class="icon">🚀</div>
              <h3>开发效率</h3>
              <p>提高样式编写和维护效率</p>
            </div>
            <div class="benefit">
              <div class="icon">📱</div>
              <h3>响应式设计</h3>
              <p>轻松实现多设备适配</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💅</span>
          CSS-in-JS 方案
        </h2>
        <div class="css-in-js">
          <div class="library">
            <div class="library-header">
              <div class="logo styled">SC</div>
              <div class="library-info">
                <h3>Styled Components</h3>
                <div class="install">npm install styled-components</div>
              </div>
            </div>
            <div class="library-content">
              <h4>使用方式</h4>
              <pre class="code-block">import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? '#3498db' : 'white'};
  color: ${props => props.primary ? 'white' : '#3498db'};
  font-size: 1em;
  padding: 0.5em 1em;
  border: 2px solid #3498db;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// 使用组件
&lt;Button primary&gt;主要按钮&lt;/Button&gt;
&lt;Button&gt;次要按钮&lt;/Button&gt;</pre>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>真正的组件化样式</li>
                    <li>支持主题和动态样式</li>
                    <li>自动处理供应商前缀</li>
                    <li>优秀的开发体验</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>运行时性能开销</li>
                    <li>增加包体积</li>
                    <li>学习曲线较陡</li>
                    <li>调试困难</li>
                  </ul>
                </div>
              </div>

              <div class="use-case">
                <h5>适用场景</h5>
                <p>需要高度动态样式的应用、组件库开发、主题切换功能</p>
              </div>
            </div>
          </div>

          <div class="library">
            <div class="library-header">
              <div class="logo emotion">E</div>
              <div class="library-info">
                <h3>Emotion</h3>
                <div class="install">npm install @emotion/react</div>
              </div>
            </div>
            <div class="library-content">
              <h4>使用方式</h4>
              <pre class="code-block">import { css } from '@emotion/react'

const style = css`
  background: #2ecc71;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }
`

// 使用样式
&lt;button css={style}&gt;Emotion 按钮&lt;/button&gt;</pre>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>高性能</li>
                    <li>灵活的 API</li>
                    <li>支持 SSR</li>
                    <li>与框架无关</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>API 较复杂</li>
                    <li>文档相对较少</li>
                    <li>需要配置 TypeScript</li>
                  </ul>
                </div>
              </div>

              <div class="use-case">
                <h5>适用场景</h5>
                <p>需要高性能 CSS-in-JS 的应用、SSR 项目、大型应用</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🧱</span>
          模块化 CSS 方案
        </h2>
        <div class="modular-css">
          <div class="approach">
            <div class="approach-header">
              <h3>CSS Modules</h3>
              <div class="icon">📦</div>
            </div>
            <div class="approach-content">
              <p>CSS Modules 允许在 JavaScript 中导入 CSS 文件，并将类名转换为唯一的哈希值，避免类名冲突。</p>

              <h4>使用方式</h4>
              <div class="code-examples">
                <div class="code-example">
                  <h5>Button.module.css</h5>
                  <pre class="code-block">.button {
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

.button:hover {
  opacity: 0.9;
}</pre>
                </div>
                <div class="code-example">
                  <h5>Button.jsx</h5>
                  <pre class="code-block">import styles from './Button.module.css';

function Button() {
  return (
    &lt;button className={styles.button}&gt;
      模块化按钮
    &lt;/button&gt;
  );
}</pre>
                </div>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>真正的局部作用域</li>
                    <li>使用标准 CSS 语法</li>
                    <li>零运行时开销</li>
                    <li>易于迁移现有项目</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>无法使用 JavaScript 变量</li>
                    <li>动态样式能力有限</li>
                    <li>需要构建工具支持</li>
                  </ul>
                </div>
              </div>

              <div class="use-case">
                <h5>适用场景</h5>
                <p>传统 CSS 项目迁移到 React、团队熟悉标准 CSS、需要零运行时开销的项目</p>
              </div>
            </div>
          </div>

          <div class="approach">
            <div class="approach-header">
              <h3>Sass/SCSS</h3>
              <div class="icon">🎨</div>
            </div>
            <div class="approach-content">
              <p>Sass 是 CSS 的预处理器，提供了变量、嵌套、混合等高级功能，可以与 CSS Modules 结合使用。</p>

              <h4>使用方式</h4>
              <div class="code-examples">
                <div class="code-example">
                  <h5>Button.module.scss</h5>
                  <pre class="code-block">$primary-color: #3498db;

.button {
  background: $primary-color;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }

  &--large {
    padding: 15px 30px;
    font-size: 18px;
  }
}</pre>
                </div>
                <div class="code-example">
                  <h5>Button.jsx</h5>
                  <pre class="code-block">import styles from './Button.module.scss';

function Button({ large }) {
  return (
    &lt;button className={`${styles.button} ${large ? styles['button--large'] : ''}`}&gt;
      Sass 按钮
    &lt;/button&gt;
  );
}</pre>
                </div>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>强大的预处理功能</li>
                    <li>丰富的社区支持</li>
                    <li>提高 CSS 可维护性</li>
                    <li>与 CSS Modules 兼容</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>需要编译步骤</li>
                    <li>学习 Sass 语法</li>
                    <li>无法在运行时修改变量</li>
                  </ul>
                </div>
              </div>

              <div class="use-case">
                <h5>适用场景</h5>
                <p>大型项目、需要高级 CSS 功能的场景、团队熟悉 Sass 的工作流</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚡</span>
          实用型 CSS 方案
        </h2>
        <div class="utility-css">
          <div class="approach">
            <div class="approach-header">
              <h3>Tailwind CSS</h3>
              <div class="icon">🛠️</div>
            </div>
            <div class="approach-content">
              <p>Tailwind CSS 是一个功能类优先的 CSS 框架，通过组合实用类来构建设计。</p>

              <h4>使用方式</h4>
              <pre class="code-block">import React from 'react';

function Button({ primary, children }) {
  const baseClasses = "py-2 px-4 rounded font-medium focus:outline-none";
  const colorClasses = primary
    ? "bg-blue-500 hover:bg-blue-600 text-white"
    : "bg-white hover:bg-gray-100 text-blue-500 border border-blue-500";

  return (
    &lt;button className={`${baseClasses} ${colorClasses}`}&gt;
      {children}
    &lt;/button&gt;
  );
}</pre>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>快速原型设计</li>
                    <li>一致的设计系统</li>
                    <li>极小的 CSS 体积</li>
                    <li>无需命名类</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>学习曲线陡峭</li>
                    <li>HTML 类名冗长</li>
                    <li>设计决策受限</li>
                  </ul>
                </div>
              </div>

              <div class="use-case">
                <h5>适用场景</h5>
                <p>需要快速开发的项目、设计系统、希望减少 CSS 体积的应用</p>
              </div>
            </div>
          </div>

          <div class="approach">
            <div class="approach-header">
              <h3>内联样式</h3>
              <div class="icon">📝</div>
            </div>
            <div class="approach-content">
              <p>直接在 JSX 元素上使用 style 属性定义样式。</p>

              <h4>使用方式</h4>
              <pre class="code-block">function Button({ primary, children }) {
  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: primary ? '#3498db' : 'white',
    color: primary ? 'white' : '#3498db',
    border: primary ? 'none' : '2px solid #3498db',
  };

  return (
    &lt;button
      style={buttonStyle}
      onMouseEnter={(e) => e.target.style.opacity = '0.9'}
      onMouseLeave={(e) => e.target.style.opacity = '1'}
    &gt;
      {children}
    &lt;/button&gt;
  );
}</pre>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>简单直接</li>
                    <li>无需额外依赖</li>
                    <li>完美支持动态样式</li>
                    <li>作用域隔离</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>不支持伪类和媒体查询</li>
                    <li>难以维护复杂样式</li>
                    <li>性能不如 CSS 类</li>
                    <li>无法复用样式</li>
                  </ul>
                </div>
              </div>

              <div class="use-case">
                <h5>适用场景</h5>
                <p>简单的动态样式、原型设计、小型组件</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📊</span>
          方案选择指南
        </h2>
        <div class="selection-guide">
          <div class="criteria">
            <h3>选择标准</h3>
            <div class="criterion">
              <div class="icon">🏢</div>
              <div class="content">
                <h4>项目规模</h4>
                <p>小型项目适合内联样式或 Tailwind，大型项目适合 CSS Modules 或 CSS-in-JS</p>
              </div>
            </div>
            <div class="criterion">
              <div class="icon">🔄</div>
              <div class="content">
                <h4>动态样式需求</h4>
                <p>高度动态样式选择 CSS-in-JS，静态样式选择 CSS Modules</p>
              </div>
            </div>
            <div class="criterion">
              <div class="icon">⚙️</div>
              <div class="content">
                <h4>团队熟悉度</h4>
                <p>选择团队熟悉的方案可提高开发效率</p>
              </div>
            </div>
            <div class="criterion">
              <div class="icon">🚀</div>
              <div class="content">
                <h4>性能要求</h4>
                <p>高性能场景避免 CSS-in-JS 运行时开销</p>
              </div>
            </div>
          </div>

          <div class="decision-tree">
            <h3>决策流程图</h3>
            <div class="tree">
              <div class="node">项目需要高度动态样式？</div>
              <div class="branch">
                <div class="yes">是 → 使用 CSS-in-JS (Styled Components/Emotion)</div>
                <div class="no">否 → 项目需要设计系统一致性？</div>
              </div>
              <div class="branch">
                <div class="no-space"></div>
                <div class="yes">是 → 使用 Tailwind CSS</div>
                <div class="no">否 → 团队熟悉预处理语言？</div>
              </div>
              <div class="branch">
                <div class="no-space"></div>
                <div class="no-space"></div>
                <div class="yes">是 → 使用 Sass/SCSS + CSS Modules</div>
                <div class="no">否 → 使用原生 CSS Modules</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🆚</span>
          方案对比总结
        </h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>方案</th>
                <th>学习曲线</th>
                <th>动态样式</th>
                <th>性能</th>
                <th>维护性</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Styled Components</strong></td>
                <td>中等</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>中等</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>动态主题、组件库</td>
              </tr>
              <tr>
                <td><strong>Emotion</strong></td>
                <td>较高</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>高</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>高性能需求、SSR</td>
              </tr>
              <tr>
                <td><strong>CSS Modules</strong></td>
                <td>低</td>
                <td>⭐️⭐️</td>
                <td>高</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>传统项目迁移、大型应用</td>
              </tr>
              <tr>
                <td><strong>Sass/SCSS</strong></td>
                <td>中等</td>
                <td>⭐️⭐️</td>
                <td>高</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>大型项目、复杂样式</td>
              </tr>
              <tr>
                <td><strong>Tailwind CSS</strong></td>
                <td>较高</td>
                <td>⭐️⭐️⭐️</td>
                <td>高</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>快速开发、设计系统</td>
              </tr>
              <tr>
                <td><strong>内联样式</strong></td>
                <td>低</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>低</td>
                <td>⭐️⭐️</td>
                <td>简单动态样式、原型</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <footer class="react-css-footer">
      <p>选择适合的 CSS 方案是 React 项目成功的关键因素之一</p>
      <div class="conclusion">根据项目需求、团队技能和性能要求，选择最合适的样式解决方案</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// CSS 方案数据
const cssApproaches = [
  { name: 'CSS-in-JS', icon: '💅' },
  { name: 'CSS Modules', icon: '🧱' },
  { name: 'Sass/SCSS', icon: '🎨' },
  { name: 'Tailwind CSS', icon: '⚡' },
  { name: '内联样式', icon: '📝' },
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@styled-components: #db7093;
@emotion: #654ea3;
@sass: #c69;
@tailwind: #38b2ac;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.react-css-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.react-css-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    max-width: 600px;
    margin: 0 auto 30px;
  }
}

.css-approaches {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;

  .approach {
    background: white;
    border-radius: 8px;
    padding: 15px 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    .approach-icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    .approach-name {
      font-weight: 600;
      color: @text-color;
    }
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: @text-color;
  font-weight: 600;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

// 介绍部分
.intro {
  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.8;
  }
}

.benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .benefit {
    text-align: center;
    padding: 20px;
    background: #eaf7ff;
    border-radius: 8px;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

// CSS-in-JS 部分
.css-in-js {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.library {
  background: #f9fbfd;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eaeaea;

  .library-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f0f7ff;

    .logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: white;
      font-size: 1.5rem;
      margin-right: 20px;
      flex-shrink: 0;

      &.styled {
        background: @styled-components;
      }

      &.emotion {
        background: @emotion;
      }
    }

    .library-info {
      flex: 1;

      h3 {
        font-size: 1.5rem;
        margin-bottom: 5px;
        color: @text-color;
      }

      .install {
        font-family: 'Fira Code', monospace;
        background: #eaf7ff;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.9rem;
        display: inline-block;
      }
    }
  }

  .library-content {
    padding: 20px;

    h4 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @text-color;
    }
  }
}

// 代码块
.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  border: 1px solid #e1e4e8;
}

// 优缺点
.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;

  .pros,
  .cons {
    padding: 15px;
    border-radius: 8px;

    h5 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      &:before {
        content: '•';
        margin-right: 8px;
        font-size: 1.5rem;
      }
    }

    ul {
      list-style-type: none;

      li {
        padding: 5px 0;
        position: relative;
        padding-left: 20px;

        &:before {
          content: '◦';
          position: absolute;
          left: 0;
        }
      }
    }
  }

  .pros {
    background: #e8f5e9;

    h5:before {
      color: @secondary-color;
    }
  }

  .cons {
    background: #ffebee;

    h5:before {
      color: #e74c3c;
    }
  }
}

.use-case {
  background: #e3f2fd;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;

  h5 {
    font-size: 1.1rem;
    margin-bottom: 8px;
    color: @primary-color;
  }

  p {
    color: @light-text;
  }
}

// 模块化 CSS
.modular-css {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.approach {
  background: #f9fbfd;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eaeaea;

  .approach-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f0f7ff;

    h3 {
      font-size: 1.5rem;
      margin-right: 15px;
      color: @text-color;
    }

    .icon {
      font-size: 2rem;
    }
  }
}

.code-examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 15px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 实用型 CSS
.utility-css {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .approach {
    height: 100%;
  }
}

// 方案选择指南
.selection-guide {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.criteria {
  .criterion {
    display: flex;
    gap: 15px;
    padding: 15px;
    margin-bottom: 15px;
    background: #f0f7ff;
    border-radius: 8px;

    .icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 5px;
      color: @text-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

.decision-tree {
  background: #f9fbfd;
  border-radius: 8px;
  padding: 20px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  .tree {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .node {
      background: @primary-color;
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }

    .branch {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-left: 30px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -20px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #eaeaea;
      }
    }

    .yes,
    .no {
      padding: 8px 15px;
      border-radius: 20px;
      font-weight: 500;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -20px;
        top: 50%;
        width: 20px;
        height: 2px;
        background: #eaeaea;
      }
    }

    .yes {
      background: @secondary-color;
      color: white;
    }

    .no {
      background: #f0f7ff;
    }

    .no-space {
      height: 15px;
    }
  }
}

// 对比表格
.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
    }

    th {
      background: #eaf7ff;
      color: @primary-color;
      font-weight: 600;
      position: sticky;
      top: 0;
    }

    tr:hover {
      background: #f9fbfd;
    }

    td {

      &:nth-child(3),
      &:nth-child(4) {
        text-align: center;
      }
    }
  }
}

.react-css-footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1rem;

  .conclusion {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: @primary-color;
    max-width: 800px;
    margin: 20px auto 0;
    padding: 15px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .react-css-header h1 {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .code-examples {
    grid-template-columns: 1fr;
  }
}
</style>
