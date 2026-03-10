<template>
  <div class="css-isolation-container">
    <header>
      <div class="header-content">
        <h1>CSS样式隔离技术</h1>
        <p>解决前端沙箱中的样式冲突问题</p>
        <div class="header-stats">
          <div class="stat">
            <div class="stat-value">5+</div>
            <div class="stat-label">主流方案</div>
          </div>
          <div class="stat">
            <div class="stat-value">99%</div>
            <div class="stat-label">样式冲突避免率</div>
          </div>
          <div class="stat">
            <div class="stat-value">&lt;1ms</div>
            <div class="stat-label">性能开销</div>
          </div>
        </div>
      </div>
      <div class="header-visual">
        <div class="visualization">
          <div class="host-app">
            <div class="app-name">主应用</div>
            <div class="host-styles">
              <div class="style-item">.button { }</div>
              <div class="style-item">.card { }</div>
            </div>
          </div>
          <div class="sandbox">
            <div class="sandbox-name">沙箱环境</div>
            <div class="sandbox-styles">
              <div class="style-item">.button { }</div>
              <div class="style-item">.card { }</div>
            </div>
          </div>
          <div class="isolation-barrier"></div>
        </div>
      </div>
    </header>

    <div class="content-grid">
      <!-- 方案介绍部分 -->
      <section class="solutions-section">
        <div class="section-header">
          <h2><i class="icon-solution"></i> 样式隔离方案</h2>
          <div class="divider"></div>
        </div>

        <div class="solution-cards">
          <div class="solution-card">
            <div class="solution-icon">
              <i class="icon-scope"></i>
            </div>
            <h3>CSS Scoped</h3>
            <p>Vue单文件组件中的scoped属性，自动添加属性选择器</p>
            <div class="solution-details">
              <div class="detail">
                <span class="detail-label">实现方式</span>
                <span class="detail-value">编译时转换</span>
              </div>
              <div class="detail">
                <span class="detail-label">隔离级别</span>
                <span class="detail-value">组件级</span>
              </div>
            </div>
          </div>

          <div class="solution-card">
            <div class="solution-icon">
              <i class="icon-shadow"></i>
            </div>
            <h3>Shadow DOM</h3>
            <p>浏览器原生支持的封装技术，创建隔离的DOM树</p>
            <div class="solution-details">
              <div class="detail">
                <span class="detail-label">实现方式</span>
                <span class="detail-value">浏览器API</span>
              </div>
              <div class="detail">
                <span class="detail-label">隔离级别</span>
                <span class="detail-value">完全隔离</span>
              </div>
            </div>
          </div>

          <div class="solution-card">
            <div class="solution-icon">
              <i class="icon-namespace"></i>
            </div>
            <h3>命名空间</h3>
            <p>使用特定前缀或BEM命名约定避免冲突</p>
            <div class="solution-details">
              <div class="detail">
                <span class="detail-label">实现方式</span>
                <span class="detail-value">人工约定/编译工具</span>
              </div>
              <div class="detail">
                <span class="detail-label">隔离级别</span>
                <span class="detail-value">项目级</span>
              </div>
            </div>
          </div>

          <div class="solution-card">
            <div class="solution-icon">
              <i class="icon-cssinjs"></i>
            </div>
            <h3>CSS-in-JS</h3>
            <p>在JavaScript中编写CSS，生成唯一类名</p>
            <div class="solution-details">
              <div class="detail">
                <span class="detail-label">实现方式</span>
                <span class="detail-value">运行时生成</span>
              </div>
              <div class="detail">
                <span class="detail-label">隔离级别</span>
                <span class="detail-value">组件级</span>
              </div>
            </div>
          </div>

          <div class="solution-card">
            <div class="solution-icon">
              <i class="icon-iframe"></i>
            </div>
            <h3>iframe隔离</h3>
            <p>使用iframe实现完全的样式和DOM隔离</p>
            <div class="solution-details">
              <div class="detail">
                <span class="detail-label">实现方式</span>
                <span class="detail-value">浏览器机制</span>
              </div>
              <div class="detail">
                <span class="detail-label">隔离级别</span>
                <span class="detail-value">完全隔离</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现思路 -->
      <section class="implementation-section">
        <div class="section-header">
          <h2><i class="icon-implementation"></i> 实现思路</h2>
          <div class="divider"></div>
        </div>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>CSS Scoped实现</h3>
            </div>
            <div class="step-content">
              <p>在编译阶段，Vue为每个组件的模板元素添加唯一的<code>data-v-xxxxxx</code>属性，并转换CSS选择器：</p>
              <pre><code>/* 转换前 */
.button {
  background: blue;
}

/* 转换后 */
.button[data-v-f3f3eg9] {
  background: blue;
}</code></pre>
              <div class="step-diagram">
                <div class="component">
                  <div class="component-name">组件A</div>
                  <div class="component-styles">.btn[data-v-a] { }</div>
                </div>
                <div class="component">
                  <div class="component-name">组件B</div>
                  <div class="component-styles">.btn[data-v-b] { }</div>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>Shadow DOM实现</h3>
            </div>
            <div class="step-content">
              <p>创建Shadow Root并附加到宿主元素，内部样式不会影响外部：</p>
              <pre><code>const host = document.getElementById('host');
const shadowRoot = host.attachShadow({ mode: 'open' });

// 添加样式
const style = document.createElement('style');
style.textContent = `
  .button { background: green; }
`;
shadowRoot.appendChild(style);

// 添加内容
const button = document.createElement('button');
button.className = 'button';
button.textContent = 'Shadow Button';
shadowRoot.appendChild(button);</code></pre>
              <div class="step-diagram">
                <div class="shadow-host">
                  <div class="host-name">宿主元素</div>
                  <div class="shadow-root">
                    <div class="root-name">Shadow Root</div>
                    <div class="root-styles">.button { }</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>CSS-in-JS实现</h3>
            </div>
            <div class="step-content">
              <p>运行时生成唯一类名并注入样式：</p>
              <pre><code>// 使用Emotion库示例
import { css } from '@emotion/css';

const buttonStyle = css`
  background: purple;
  color: white;
`;

function MyComponent() {
  return (
    &lt;button className={buttonStyle}&gt;
      CSS-in-JS按钮
    &lt;/button&gt;
  );
}

// 生成的HTML
&lt;button class="css-1d8kcu9"&gt;CSS-in-JS按钮&lt;/button&gt;

// 生成的CSS
.css-1d8kcu9 {
  background: purple;
  color: white;
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases-section">
        <div class="section-header">
          <h2><i class="icon-scenario"></i> 使用场景</h2>
          <div class="divider"></div>
        </div>

        <div class="use-case-cards">
          <div class="use-case-card">
            <div class="use-case-icon">
              <i class="icon-microfrontend"></i>
            </div>
            <h3>微前端架构</h3>
            <p>多个团队独立开发的微应用集成到同一页面</p>
            <div class="recommended-solution">
              <span>推荐方案:</span>
              <div class="solution-tag">Shadow DOM</div>
              <div class="solution-tag">CSS-in-JS</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">
              <i class="icon-plugin"></i>
            </div>
            <h3>插件系统</h3>
            <p>第三方插件集成到主应用</p>
            <div class="recommended-solution">
              <span>推荐方案:</span>
              <div class="solution-tag">Shadow DOM</div>
              <div class="solution-tag">iframe</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">
              <i class="icon-editor"></i>
            </div>
            <h3>富文本编辑器</h3>
            <p>避免编辑器样式影响页面其他部分</p>
            <div class="recommended-solution">
              <span>推荐方案:</span>
              <div class="solution-tag">CSS Scoped</div>
              <div class="solution-tag">命名空间</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">
              <i class="icon-component"></i>
            </div>
            <h3>UI组件库</h3>
            <p>可复用组件在不同项目中保持样式一致</p>
            <div class="recommended-solution">
              <span>推荐方案:</span>
              <div class="solution-tag">CSS-in-JS</div>
              <div class="solution-tag">CSS Scoped</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点对比 -->
      <section class="comparison-section">
        <div class="section-header">
          <h2><i class="icon-comparison"></i> 方案优缺点对比</h2>
          <div class="divider"></div>
        </div>

        <div class="comparison-table">
          <div class="table-header">
            <div>方案</div>
            <div>优点</div>
            <div>缺点</div>
            <div>适用场景</div>
          </div>

          <div class="table-row">
            <div>CSS Scoped</div>
            <div>
              <ul>
                <li>简单易用，Vue内置支持</li>
                <li>零运行时开销</li>
                <li>良好的开发体验</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>不是完全隔离（全局样式仍可影响）</li>
                <li>深度选择器可能破坏封装</li>
                <li>仅限于Vue生态系统</li>
              </ul>
            </div>
            <div>Vue组件开发</div>
          </div>

          <div class="table-row">
            <div>Shadow DOM</div>
            <div>
              <ul>
                <li>浏览器原生支持</li>
                <li>完全样式隔离</li>
                <li>DOM结构封装</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>全局样式无法穿透</li>
                <li>调试相对复杂</li>
                <li>某些CSS特性受限</li>
              </ul>
            </div>
            <div>Web组件、微前端</div>
          </div>

          <div class="table-row">
            <div>CSS-in-JS</div>
            <div>
              <ul>
                <li>动态样式能力</li>
                <li>自动厂商前缀</li>
                <li>主题支持优秀</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>运行时开销</li>
                <li>学习曲线较陡</li>
                <li>SSR支持复杂</li>
              </ul>
            </div>
            <div>React应用、动态UI</div>
          </div>

          <div class="table-row">
            <div>iframe</div>
            <div>
              <ul>
                <li>完全隔离环境</li>
                <li>安全沙箱支持</li>
                <li>多页面应用支持</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>通信复杂</li>
                <li>性能开销大</li>
                <li>布局集成困难</li>
              </ul>
            </div>
            <div>第三方内容嵌入</div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-content">
        <div class="footer-summary">
          <h3>样式隔离最佳实践</h3>
          <p>根据应用场景选择合适方案：微前端优先考虑Shadow DOM，Vue组件使用Scoped CSS，动态应用选择CSS-in-JS。结合多种方案实现深度隔离，如Shadow DOM + CSS-in-JS。</p>
        </div>

        <div class="footer-links">
          <a href="#">CSS隔离指南</a>
          <a href="#">性能优化</a>
          <a href="#">Shadow DOM文档</a>
          <a href="#">案例研究</a>
        </div>
      </div>

      <div class="footer-copyright">
        <p> 前端架构实验室 | CSS样式隔离技术指南 v1.2</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑（空，因为这是一个展示型组件）
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@success-color: #2a9d8f;
@warning-color: #f8961e;
@error-color: #e63946;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@code-bg: #f1f3f5;

// 混合
.box-shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.border-radius {
  border-radius: 10px;
}

.transition {
  transition: all 0.3s ease;
}

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.css-isolation-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @light-bg;
  color: @text-dark;
  line-height: 1.6;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #f0f4ff, #e6f7ff);
    .border-radius();
    .box-shadow();

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .header-content {
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 10px;
      }

      p {
        font-size: 1.2rem;
        color: @text-light;
        margin-bottom: 30px;
      }

      .header-stats {
        display: flex;
        gap: 20px;

        .stat {
          text-align: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.7);
          .border-radius();
          .box-shadow();

          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: @primary-color;
          }

          .stat-label {
            font-size: 0.9rem;
            color: @text-light;
          }
        }
      }
    }

    .header-visual {
      display: flex;
      align-items: center;
      justify-content: center;

      .visualization {
        width: 100%;
        max-width: 400px;
        height: 300px;
        position: relative;
        display: flex;
        flex-direction: column;
        border: 2px solid @border-color;
        .border-radius();
        overflow: hidden;

        .host-app,
        .sandbox {
          flex: 1;
          padding: 20px;
          position: relative;
        }

        .host-app {
          background: lighten(@primary-color, 45%);
          border-bottom: 2px solid @border-color;

          .app-name {
            position: absolute;
            top: 10px;
            left: 10px;
            font-weight: 600;
            color: @primary-color;
          }

          .host-styles {
            margin-top: 30px;

            .style-item {
              padding: 10px;
              background: rgba(255, 255, 255, 0.7);
              margin-bottom: 10px;
              .border-radius();
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
            }
          }
        }

        .sandbox {
          background: lighten(@success-color, 50%);

          .sandbox-name {
            position: absolute;
            top: 10px;
            left: 10px;
            font-weight: 600;
            color: @success-color;
          }

          .sandbox-styles {
            margin-top: 30px;

            .style-item {
              padding: 10px;
              background: rgba(255, 255, 255, 0.7);
              margin-bottom: 10px;
              .border-radius();
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
            }
          }
        }

        .isolation-barrier {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          background: repeating-linear-gradient(45deg,
              @primary-color,
              @primary-color 10px,
              lighten(@primary-color, 30%) 10px,
              lighten(@primary-color, 30%) 20px);
          transform: translateX(-50%);
          z-index: 10;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .section-header {
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: @text-dark;
      display: flex;
      align-items: center;

      i {
        margin-right: 12px;
        font-size: 1.8rem;
        color: @primary-color;
      }
    }

    .divider {
      flex-grow: 1;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, transparent);
      margin-left: 20px;
    }
  }

  // 解决方案部分
  .solutions-section {
    .solution-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;

      .solution-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        border-top: 4px solid @primary-color;
        .transition();

        &:hover {
          transform: translateY(-5px);
        }

        .solution-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: lighten(@primary-color, 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;

          i {
            font-size: 1.8rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: @text-dark;
        }

        p {
          color: @text-light;
          font-size: 0.95rem;
          margin-bottom: 15px;
          min-height: 60px;
        }

        .solution-details {
          .detail {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid @border-color;

            &:last-child {
              border-bottom: none;
            }

            .detail-label {
              font-weight: 500;
            }

            .detail-value {
              color: @primary-color;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  // 实现思路部分
  .implementation-section {
    .implementation-steps {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;

      .step {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        border-left: 4px solid @primary-color;

        .step-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .step-number {
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
            margin-right: 15px;
            flex-shrink: 0;
          }

          h3 {
            font-size: 1.4rem;
            margin: 0;
          }
        }

        .step-content {
          p {
            margin-bottom: 15px;
          }

          pre {
            background: @code-bg;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 20px;
            border-left: 3px solid @primary-color;

            code {
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              color: @text-dark;
              line-height: 1.5;
            }
          }

          .step-diagram {
            background: lighten(@primary-color, 45%);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 20px;

            .component {
              width: 45%;
              padding: 15px;
              background: white;
              border-radius: 8px;
              border: 1px solid @border-color;

              .component-name {
                font-weight: 600;
                color: @primary-color;
                margin-bottom: 10px;
              }

              .component-styles {
                font-family: 'Fira Code', monospace;
                font-size: 0.9rem;
                padding: 10px;
                background: @code-bg;
                border-radius: 4px;
              }
            }

            .shadow-host {
              width: 100%;
              padding: 15px;
              background: white;
              border-radius: 8px;
              border: 1px solid @border-color;
              position: relative;

              .host-name {
                font-weight: 600;
                color: @primary-color;
                margin-bottom: 10px;
              }

              .shadow-root {
                padding: 15px;
                background: lighten(@success-color, 45%);
                border-radius: 8px;
                border: 1px dashed @success-color;

                .root-name {
                  font-weight: 600;
                  color: @success-color;
                  margin-bottom: 10px;
                }

                .root-styles {
                  font-family: 'Fira Code', monospace;
                  font-size: 0.9rem;
                  padding: 10px;
                  background: lighten(@success-color, 50%);
                  border-radius: 4px;
                }
              }
            }
          }
        }
      }
    }
  }

  // 使用场景部分
  .use-cases-section {
    .use-case-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;

      .use-case-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        border-top: 4px solid @primary-color;
        .transition();

        &:hover {
          transform: translateY(-5px);
        }

        .use-case-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: lighten(@primary-color, 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;

          i {
            font-size: 1.8rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }

        p {
          color: @text-light;
          margin-bottom: 20px;
          min-height: 60px;
        }

        .recommended-solution {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px dashed @border-color;

          span {
            font-size: 0.9rem;
            color: @text-light;
          }

          .solution-tag {
            background: lighten(@success-color, 40%);
            color: darken(@success-color, 20%);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
          }
        }
      }
    }
  }

  // 对比表格部分
  .comparison-section {
    .comparison-table {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      overflow: hidden;
      border: 1px solid @border-color;

      .table-header,
      .table-row {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 1fr;
        padding: 15px 20px;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
          padding: 10px;
        }
      }

      .table-header {
        background: @primary-color;
        color: white;
        font-weight: 600;

        @media (max-width: 900px) {
          display: none;
        }
      }

      .table-row {
        border-bottom: 1px solid @border-color;

        &:last-child {
          border-bottom: none;
        }

        &>div {
          padding: 12px 15px;
          display: flex;
          align-items: center;

          @media (max-width: 900px) {
            border-bottom: 1px solid @border-color;
            padding: 10px;

            &:before {
              content: attr(data-label);
              font-weight: 600;
              width: 120px;
              display: inline-block;
              color: @primary-color;
            }
          }
        }

        &:nth-child(odd) {
          background: @light-bg;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 8px;
            position: relative;
            padding-left: 15px;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: 8px;
              width: 6px;
              height: 6px;
              background: @primary-color;
              border-radius: 50%;
            }
          }
        }

        &:nth-child(1)>div:nth-child(1) {
          data-label: "方案";
        }

        &:nth-child(1)>div:nth-child(2) {
          data-label: "优点";
        }

        &:nth-child(1)>div:nth-child(3) {
          data-label: "缺点";
        }

        &:nth-child(1)>div:nth-child(4) {
          data-label: "适用场景";
        }
      }
    }
  }

  // 页脚样式
  footer {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid @border-color;

    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 30px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .footer-summary {
        h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: @primary-color;
        }

        p {
          color: @text-light;
          line-height: 1.7;
        }
      }

      .footer-links {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: center;
        justify-content: flex-end;

        @media (max-width: 768px) {
          justify-content: flex-start;
        }

        a {
          padding: 10px 20px;
          background: lighten(@primary-color, 40%);
          color: @primary-color;
          border-radius: 30px;
          font-weight: 500;
          text-decoration: none;
          .transition();

          &:hover {
            background: @primary-color;
            color: white;
          }
        }
      }
    }

    .footer-copyright {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid @border-color;
      color: @text-light;
      font-size: 0.9rem;
    }
  }
}

// 图标字体
@font-face {
  font-family: 'isolation-icons';
  src: url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAf0AAsAAAAADFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFDGNtYXAAAAFoAAAAVAAAAFQXVtGJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAqAAAAKgzQc2C2hlYWQAAARgAAAANgAAADYD5wOzaGhlYQAABJQAAAAkAAAAJAdCA4dobXR4AAAEvAAAABQAAAAUCAQAAGxvY2EAAATQAAAAEAAAABAB4gGcbWF4cAAABOAAAAAgAAAAIAETAChuYW1lAAAE4AAAAXkAAAF5ChzBxXBvc3QAAAY4AAAAIAAAACAAAwAAAAMD7AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAQAAAAEAAAAAAAAAAAAA') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: 'isolation-icons' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-solution:before {
  content: "\e900";
}

.icon-scope:before {
  content: "\e901";
}

.icon-shadow:before {
  content: "\e902";
}

.icon-namespace:before {
  content: "\e903";
}

.icon-cssinjs:before {
  content: "\e904";
}

.icon-iframe:before {
  content: "\e905";
}

.icon-implementation:before {
  content: "\e906";
}

.icon-scenario:before {
  content: "\e907";
}

.icon-microfrontend:before {
  content: "\e908";
}

.icon-plugin:before {
  content: "\e909";
}

.icon-editor:before {
  content: "\e90a";
}

.icon-component:before {
  content: "\e90b";
}

.icon-comparison:before {
  content: "\e90c";
}
</style>
