<template>
  <div class="scoped-css-container">
    <header>
      <h1>Vue Scoped CSS 技术基本介绍</h1>
      <p>组件级样式隔离的现代解决方案</p>
    </header>

    <div class="content-grid">
      <!-- 介绍部分 -->
      <section class="intro-section">
        <div class="card">
          <div class="section-header">
            <h2><i class="icon-info"></i> 什么是Scoped CSS？</h2>
            <div class="divider"></div>
          </div>

          <div class="intro-content">
            <p>Vue中的Scoped CSS是一种组件级样式隔离机制，通过<code>&lt;style scoped&gt;</code>属性实现。它确保组件的样式只作用于当前组件，不会影响其他组件或全局样式。</p>

            <div class="feature-grid">
              <div class="feature">
                <div class="feature-icon">
                  <i class="icon-isolation"></i>
                </div>
                <h3>样式隔离</h3>
                <p>防止组件样式泄漏到全局</p>
              </div>

              <div class="feature">
                <div class="feature-icon">
                  <i class="icon-component"></i>
                </div>
                <h3>组件封装</h3>
                <p>保持组件的自包含性</p>
              </div>

              <div class="feature">
                <div class="feature-icon">
                  <i class="icon-maintenance"></i>
                </div>
                <h3>简化维护</h3>
                <p>避免样式冲突和命名污染</p>
              </div>

              <div class="feature">
                <div class="feature-icon">
                  <i class="icon-performance"></i>
                </div>
                <h3>性能优化</h3>
                <p>只加载当前组件所需样式</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 原理部分 -->
      <section class="principle-section">
        <div class="card">
          <div class="section-header">
            <h2><i class="icon-principle"></i> Scoped CSS 工作原理</h2>
            <div class="divider"></div>
          </div>

          <div class="principle-steps">
            <div class="step">
              <div class="step-header">
                <div class="step-number">1</div>
                <h3>唯一属性生成</h3>
              </div>
              <p>编译时，Vue为每个组件的根元素添加唯一的<code>data-v-xxxxxx</code>属性</p>
              <div class="step-visual">
                <div class="component-root" data-v-f3f3eg9>
                  &lt;div class="container" data-v-f3f3eg9&gt;
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-header">
                <div class="step-number">2</div>
                <h3>CSS转换</h3>
              </div>
              <p>组件的所有CSS选择器被转换为属性选择器，添加唯一属性后缀</p>
              <div class="code-comparison">
                <div class="code-block">
                  <h4>原始CSS</h4>
                  <pre><code>.container {
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
}</code></pre>
                </div>
                <div class="code-block">
                  <h4>转换后CSS</h4>
                  <pre><code>.container[data-v-f3f3eg9] {
  padding: 1rem;
}

.title[data-v-f3f3eg9] {
  font-size: 1.5rem;
}</code></pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-header">
                <div class="step-number">3</div>
                <h3>DOM应用</h3>
              </div>
              <p>转换后的CSS只作用于具有相同<code>data-v-xxxxxx</code>属性的元素</p>
              <div class="step-visual">
                <div class="scoped-element">
                  <div class="element" data-v-f3f3eg9>
                    <span class="title" data-v-f3f3eg9>标题</span>
                    <p data-v-f3f3eg9>内容...</p>
                  </div>
                  <div class="element" data-v-a1b2c3d>
                    <span class="title" data-v-a1b2c3d>另一个组件</span>
                    <p data-v-a1b2c3d>不受影响的内容</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用示例 -->
      <section class="usage-section">
        <div class="card">
          <div class="section-header">
            <h2><i class="icon-code"></i> 使用示例</h2>
            <div class="divider"></div>
          </div>

          <div class="usage-examples">
            <div class="example">
              <h3>基础用法</h3>
              <div class="code-block">
                <pre><code>&lt;template&gt;
  &lt;div class="card"&gt;
    &lt;h2 class="title"&gt;&#123;&#123; title &#125;&#125;&lt;/h2&gt;
    &lt;p class="content"&gt;&#123;&#123; content &#125;&#125;&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
// 组件逻辑
&lt;/script&gt;

&lt;style scoped&gt;
/* 这些样式只作用于当前组件 */
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.title {
  font-size: 1.5rem;
  color: #2c3e50;
}

.content {
  line-height: 1.6;
  color: #34495e;
}
&lt;/style&gt;</code></pre>
              </div>
            </div>

            <div class="example">
              <h3>深度选择器</h3>
              <div class="explanation">
                <p>使用<code>::v-deep</code>或<code>:deep()</code>穿透scoped限制，影响子组件样式</p>
              </div>
              <div class="code-block">
                <pre><code>&lt;style scoped&gt;
/* 影响子组件中的.title类 */
.card :deep(.title) {
  color: #42b983;
}

/* 旧版语法 */
.card ::v-deep .title {
  color: #42b983;
}
&lt;/style&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="considerations-section">
        <div class="card">
          <div class="section-header">
            <h2><i class="icon-warning"></i> 注意事项与最佳实践</h2>
            <div class="divider"></div>
          </div>

          <div class="considerations-grid">
            <div class="consideration">
              <div class="consideration-icon">
                <i class="icon-global"></i>
              </div>
              <h3>全局样式</h3>
              <p>Scoped CSS不会影响全局样式，使用<code>&lt;style&gt;</code>而非<code>&lt;style scoped&gt;</code>定义全局样式</p>
            </div>

            <div class="consideration">
              <div class="consideration-icon">
                <i class="icon-child"></i>
              </div>
              <h3>子组件样式</h3>
              <p>默认情况下，Scoped CSS不会影响子组件，使用深度选择器有选择地修改子组件样式</p>
            </div>

            <div class="consideration">
              <div class="consideration-icon">
                <i class="icon-performance"></i>
              </div>
              <h3>性能影响</h3>
              <p>Scoped CSS会增加CSS选择器特异性，但现代浏览器优化良好，影响可忽略</p>
            </div>

            <div class="consideration">
              <div class="consideration-icon">
                <i class="icon-specificity"></i>
              </div>
              <h3>特异性问题</h3>
              <p>属性选择器会增加CSS特异性，避免在scoped样式中使用!important</p>
            </div>

            <div class="consideration">
              <div class="consideration-icon">
                <i class="icon-library"></i>
              </div>
              <h3>第三方库</h3>
              <p>使用深度选择器修改第三方组件样式，但应优先使用组件提供的样式定制点</p>
            </div>

            <div class="consideration">
              <div class="consideration-icon">
                <i class="icon-module"></i>
              </div>
              <h3>CSS Modules</h3>
              <p>对于更严格的隔离，考虑使用CSS Modules替代Scoped CSS</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 比较表 -->
      <section class="comparison-section">
        <div class="card">
          <div class="section-header">
            <h2><i class="icon-comparison"></i> Scoped CSS vs CSS Modules</h2>
            <div class="divider"></div>
          </div>

          <div class="comparison-table">
            <div class="table-header">
              <div>特性</div>
              <div>Scoped CSS</div>
              <div>CSS Modules</div>
            </div>

            <div class="table-row">
              <div>实现方式</div>
              <div>属性选择器</div>
              <div>唯一类名</div>
            </div>

            <div class="table-row">
              <div>隔离级别</div>
              <div>组件级</div>
              <div>类名级</div>
            </div>

            <div class="table-row">
              <div>使用方式</div>
              <div>&lt;style scoped&gt;</div>
              <div>&lt;style module&gt;</div>
            </div>

            <div class="table-row">
              <div>模板引用</div>
              <div>直接使用类名</div>
              <div>:class="$style.className"</div>
            </div>

            <div class="table-row">
              <div>动态样式</div>
              <div>支持普通方式</div>
              <div>支持组合/变量</div>
            </div>

            <div class="table-row">
              <div>与预处理器集成</div>
              <div>完美支持</div>
              <div>完美支持</div>
            </div>
          </div>

          <div class="recommendation">
            <h3><i class="icon-tip"></i> 使用建议</h3>
            <p>对于大多数Vue组件，Scoped CSS提供了简单有效的样式隔离方案。当需要更严格的隔离或复杂样式组合时，CSS Modules是更好的选择。</p>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-content">
        <div class="footer-summary">
          <h3>Scoped CSS 总结</h3>
          <p>Vue的Scoped CSS通过属性选择器实现组件级样式隔离，是构建可维护Vue应用的重要工具。它平衡了隔离性和开发体验，是Vue单文件组件生态的核心特性之一。</p>
        </div>

        <div class="footer-links">
          <a href="#">官方文档</a>
          <a href="#">深度选择器指南</a>
          <a href="#">性能优化</a>
          <a href="#">最佳实践</a>
        </div>
      </div>

      <div class="footer-copyright">
        <p>© 2023 Vue技术专家 | Scoped CSS技术指南 v1.3</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑（空，因为这是一个展示型组件）
</script>

<style lang="less" scoped>
/* 这里使用Scoped CSS来演示 */


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@success-color: #42b983;
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
.scoped-css-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @light-bg;
  color: @text-dark;
  line-height: 1.6;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  header {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px 0;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      color: @text-light;
      max-width: 800px;
      margin: 0 auto;
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
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

  .card {
    background: @card-bg;
    .box-shadow();
    .border-radius();
    padding: 30px;
    margin-bottom: 20px;
    border: 1px solid @border-color;
  }

  // 介绍部分
  .intro-section {
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;

      .feature {
        text-align: center;
        padding: 25px 20px;
        background: lighten(@primary-color, 45%);
        .border-radius();
        .transition();

        &:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: @primary-color;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;

          i {
            font-size: 1.8rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        p {
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }
  }

  // 原理部分
  .principle-section {
    .principle-steps {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;

      .step {
        background: lighten(@primary-color, 45%);
        .border-radius();
        padding: 25px;

        .step-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;

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

        .step-visual {
          margin-top: 20px;
          padding: 20px;
          background: white;
          .border-radius();
          font-family: 'Fira Code', monospace;

          .component-root {
            padding: 15px;
            background: @code-bg;
            border-radius: 8px;
            border-left: 3px solid @primary-color;
          }

          .scoped-element {
            display: flex;
            gap: 20px;

            .element {
              flex: 1;
              padding: 15px;
              background: @code-bg;
              border-radius: 8px;
              border: 1px solid @border-color;

              .title {
                font-weight: 600;
                display: block;
                margin-bottom: 10px;
                color: @primary-color;
              }

              &[data-v-f3f3eg9] {
                border-left: 3px solid @success-color;
              }

              &[data-v-a1b2c3d] {
                border-left: 3px solid @warning-color;
              }
            }
          }
        }

        .code-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .code-block {
            h4 {
              font-size: 1rem;
              margin-bottom: 10px;
              color: @text-light;
            }

            pre {
              background: @code-bg;
              padding: 15px;
              border-radius: 8px;
              overflow-x: auto;
              border-left: 3px solid @primary-color;

              code {
                font-family: 'Fira Code', monospace;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }

  // 使用示例部分
  .usage-section {
    .usage-examples {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;

      .example {
        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: @secondary-color;
          padding-bottom: 10px;
          border-bottom: 1px solid @border-color;
        }

        .explanation {
          background: lighten(@success-color, 50%);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          border-left: 3px solid @success-color;
        }

        .code-block {
          pre {
            background: @code-bg;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            border-left: 3px solid @primary-color;

            code {
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  // 注意事项部分
  .considerations-section {
    .considerations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .consideration {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 20px;
        border-top: 3px solid @primary-color;

        .consideration-icon {
          width: 50px;
          height: 50px;
          background: lighten(@primary-color, 40%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;

          i {
            font-size: 1.5rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        p {
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }
  }

  // 比较表部分
  .comparison-section {
    .comparison-table {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      overflow: hidden;
      border: 1px solid @border-color;
      margin-bottom: 30px;

      .table-header,
      .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 15px 20px;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }

      .table-header {
        background: @primary-color;
        color: white;
        font-weight: 600;

        @media (max-width: 768px) {
          display: none;
        }
      }

      .table-row {
        border-bottom: 1px solid @border-color;

        &:last-child {
          border-bottom: none;
        }

        &:nth-child(even) {
          background: @light-bg;
        }

        &>div {
          padding: 12px 15px;
          display: flex;
          align-items: center;

          @media (max-width: 768px) {
            &:before {
              content: attr(data-label);
              font-weight: 600;
              width: 120px;
              display: inline-block;
              color: @primary-color;
            }
          }
        }

        &:nth-child(1)>div:nth-child(1) {
          data-label: "特性";
        }

        &:nth-child(1)>div:nth-child(2) {
          data-label: "Scoped CSS";
        }

        &:nth-child(1)>div:nth-child(3) {
          data-label: "CSS Modules";
        }
      }
    }

    .recommendation {
      background: lighten(@success-color, 50%);
      padding: 20px;
      border-radius: 8px;
      border-left: 3px solid @success-color;

      h3 {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        i {
          margin-right: 10px;
          color: @success-color;
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
  font-family: 'scoped-icons';
  src: url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAf0AAsAAAAADFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFDGNtYXAAAAFoAAAAVAAAAFQXVtGJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAqAAAAKgzQc2C2hlYWQAAARgAAAANgAAADYD5wOzaGhlYQAABJQAAAAkAAAAJAdCA4dobXR4AAAEvAAAABQAAAAUCAQAAGxvY2EAAATQAAAAEAAAABAB4gGcbWF4cAAABOAAAAAgAAAAIAETAChuYW1lAAAE4AAAAXkAAAF5ChzBxXBvc3QAAAY4AAAAIAAAACAAAwAAAAMD7AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAQAAAAEAAAAAAAAAAAAA') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: 'scoped-icons' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-info:before {
  content: "\e900";
}

.icon-principle:before {
  content: "\e901";
}

.icon-isolation:before {
  content: "\e902";
}

.icon-component:before {
  content: "\e903";
}

.icon-maintenance:before {
  content: "\e904";
}

.icon-performance:before {
  content: "\e905";
}

.icon-code:before {
  content: "\e906";
}

.icon-warning:before {
  content: "\e907";
}

.icon-global:before {
  content: "\e908";
}

.icon-child:before {
  content: "\e909";
}

.icon-specificity:before {
  content: "\e90a";
}

.icon-library:before {
  content: "\e90b";
}

.icon-module:before {
  content: "\e90c";
}

.icon-comparison:before {
  content: "\e90d";
}

.icon-tip:before {
  content: "\e90e";
}
</style>
