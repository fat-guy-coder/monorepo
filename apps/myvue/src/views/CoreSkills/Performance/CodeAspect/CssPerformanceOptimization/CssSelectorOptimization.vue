<template>
  <div class="selector-optimization">
    <header class="optimization-header">
      <h1>CSS选择器性能优化</h1>
      <p class="subtitle">提升页面渲染效率的选择器最佳实践</p>
    </header>

    <div class="optimization-content">
      <section class="overview-section">
        <h2>为什么需要优化CSS选择器？</h2>
        <div class="overview-card">
          <p>浏览器渲染页面时，需要匹配CSS选择器来确定元素的样式。<strong>选择器越复杂</strong>，匹配所需的时间就越长。</p>
          <div class="performance-impact">
            <div class="impact-item">
              <div class="impact-icon">⏱️</div>
              <div class="impact-text">减少样式计算时间</div>
            </div>
            <div class="impact-item">
              <div class="impact-icon">⚡</div>
              <div class="impact-text">加快页面渲染速度</div>
            </div>
            <div class="impact-item">
              <div class="impact-icon">📉</div>
              <div class="impact-text">降低回流重绘成本</div>
            </div>
          </div>
        </div>
      </section>

      <section class="principles-section">
        <h2>CSS选择器匹配原理</h2>
        <div class="principle-card">
          <p>浏览器从右向左解析CSS选择器，这种设计影响了选择器性能：</p>
          <div class="matching-process">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">先找到所有匹配最右边选择器的元素</div>
            </div>
            <div class="process-arrow">↓</div>
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">沿DOM树向上查找匹配父选择器</div>
            </div>
            <div class="process-arrow">↓</div>
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">直到匹配整个选择器或失败</div>
            </div>
          </div>
          <div class="example-box">
            <p><strong>示例选择器：</strong> <code>.nav li.active a:hover</code></p>
            <p>浏览器会先找到所有<code>a:hover</code>元素，然后向上检查父元素是否匹配</p>
          </div>
        </div>
      </section>

      <section class="optimization-section">
        <h2>优化策略与实践</h2>
        <div class="strategy-grid">
          <div class="strategy-card">
            <h3>1. 避免过度嵌套</h3>
            <div class="code-comparison">
              <div class="code-bad">
                <h4>不推荐</h4>
                <pre><code>/* 过度嵌套 */
body div#container ul.nav li a {
  color: blue;
}</code></pre>
              </div>
              <div class="code-good">
                <h4>推荐</h4>
                <pre><code>/* 简化选择器 */
.nav-link {
  color: blue;
}</code></pre>
              </div>
            </div>
            <p class="strategy-tip">保持选择器不超过3层嵌套</p>
          </div>

          <div class="strategy-card">
            <h3>2. 减少通用选择器</h3>
            <div class="code-comparison">
              <div class="code-bad">
                <h4>不推荐</h4>
                <pre><code>/* 通用选择器 */
div * {
  margin: 0;
}</code></pre>
              </div>
              <div class="code-good">
                <h4>推荐</h4>
                <pre><code>/* 具体元素 */
div > p,
div > ul {
  margin: 0;
}</code></pre>
              </div>
            </div>
            <p class="strategy-tip">通用选择器会匹配所有元素，性能开销大</p>
          </div>

          <div class="strategy-card">
            <h3>3. 使用类选择器替代标签选择器</h3>
            <div class="code-comparison">
              <div class="code-bad">
                <h4>不推荐</h4>
                <pre><code>/* 标签选择器 */
ul li a {
  color: red;
}</code></pre>
              </div>
              <div class="code-good">
                <h4>推荐</h4>
                <pre><code>/* 类选择器 */
.menu-link {
  color: red;
}</code></pre>
              </div>
            </div>
            <p class="strategy-tip">类选择器匹配速度比标签选择器快10倍</p>
          </div>

          <div class="strategy-card">
            <h3>4. 避免属性选择器</h3>
            <div class="code-comparison">
              <div class="code-bad">
                <h4>不推荐</h4>
                <pre><code>/* 属性选择器 */
input[type="text"] {
  border: 1px solid #ccc;
}</code></pre>
              </div>
              <div class="code-good">
                <h4>推荐</h4>
                <pre><code>/* 类选择器 */
.text-input {
  border: 1px solid #ccc;
}</code></pre>
              </div>
            </div>
            <p class="strategy-tip">属性选择器比类选择器慢3-4倍</p>
          </div>

          <div class="strategy-card">
            <h3>5. 避免后代选择器</h3>
            <div class="code-comparison">
              <div class="code-bad">
                <h4>不推荐</h4>
                <pre><code>/* 后代选择器 */
.header .nav .item {
  padding: 10px;
}</code></pre>
              </div>
              <div class="code-good">
                <h4>推荐</h4>
                <pre><code>/* 直接子选择器 */
.header > .nav > .item {
  padding: 10px;
}</code></pre>
              </div>
            </div>
            <p class="strategy-tip">后代选择器需要检查整个祖先链</p>
          </div>

          <div class="strategy-card">
            <h3>6. 避免伪类选择器</h3>
            <div class="code-comparison">
              <div class="code-bad">
                <h4>不推荐</h4>
                <pre><code>/* 伪类选择器 */
div:first-child {
  margin-top: 0;
}</code></pre>
              </div>
              <div class="code-good">
                <h4>推荐</h4>
                <pre><code>/* 添加类名 */
.first-item {
  margin-top: 0;
}</code></pre>
              </div>
            </div>
            <p class="strategy-tip">伪类选择器会增加样式计算复杂度</p>
          </div>
        </div>
      </section>

      <section class="ranking-section">
        <h2>选择器性能排名</h2>
        <div class="ranking-table">
          <table>
            <thead>
              <tr>
                <th>排名</th>
                <th>选择器类型</th>
                <th>性能</th>
                <th>示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ID选择器</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td><code>#header</code></td>
              </tr>
              <tr>
                <td>2</td>
                <td>类选择器</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td><code>.menu-item</code></td>
              </tr>
              <tr>
                <td>3</td>
                <td>元素选择器</td>
                <td>⭐️⭐️⭐️</td>
                <td><code>div</code></td>
              </tr>
              <tr>
                <td>4</td>
                <td>相邻兄弟选择器</td>
                <td>⭐️⭐️</td>
                <td><code>h1 + p</code></td>
              </tr>
              <tr>
                <td>5</td>
                <td>子选择器</td>
                <td>⭐️⭐️</td>
                <td><code>ul > li</code></td>
              </tr>
              <tr>
                <td>6</td>
                <td>后代选择器</td>
                <td>⭐️</td>
                <td><code>.nav a</code></td>
              </tr>
              <tr>
                <td>7</td>
                <td>属性选择器</td>
                <td>⭐️</td>
                <td><code>[type="text"]</code></td>
              </tr>
              <tr>
                <td>8</td>
                <td>伪类/伪元素</td>
                <td>⭐️</td>
                <td><code>:hover</code>, <code>::before</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="tools-section">
        <h2>优化工具</h2>
        <div class="tools-grid">
          <div class="tool-card">
            <h3>Chrome DevTools</h3>
            <p>使用Performance面板分析样式计算时间</p>
            <div class="tool-steps">
              <p>1. 打开Performance面板</p>
              <p>2. 录制页面加载</p>
              <p>3. 查看"Recalculate Style"耗时</p>
            </div>
          </div>
          <div class="tool-card">
            <h3>CSS Stats</h3>
            <p>分析CSS选择器复杂度</p>
            <div class="tool-steps">
              <p>1. 访问cssstats.com</p>
              <p>2. 输入CSS文件URL</p>
              <p>3. 查看选择器分析报告</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="optimization-footer">
      <p>© 2023 前端性能优化指南 | CSS选择器优化</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 可以添加响应式数据或方法
const selectorExamples = ref([
  { type: 'ID选择器', example: '#header', performance: 5 },
  { type: '类选择器', example: '.menu-item', performance: 4 },
  { type: '元素选择器', example: 'div', performance: 3 },
  { type: '属性选择器', example: '[type="text"]', performance: 1 }
]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@warning-color: #e74c3c;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@code-color: #f8f8f2;

.selector-optimization {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.optimization-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @secondary-color, lighten(@secondary-color, 10%));
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.overview-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
}

.performance-impact {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
}

.impact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: lighten(@accent-color, 45%);
  padding: 1rem 1.5rem;
  border-radius: 8px;

  .impact-icon {
    font-size: 1.5rem;
  }

  .impact-text {
    font-weight: 500;
  }
}

.principle-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
}

.matching-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: @background-light;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  width: 100%;

  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: @accent-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-content {
    font-weight: 500;
  }
}

.process-arrow {
  color: @accent-color;
  font-size: 1.5rem;
  margin-left: 15px;
}

.example-box {
  background: lighten(@primary-color, 45%);
  padding: 1.2rem;
  border-radius: 8px;
  margin-top: 1.5rem;

  p {
    margin: 0.5rem 0;

    strong {
      color: @secondary-color;
    }
  }

  code {
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.strategy-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.3rem;
  }
}

.code-comparison {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;

  >div {
    flex: 1;
  }

  h4 {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
  }
}

.code-bad {
  h4 {
    color: @warning-color;
  }
}

.code-good {
  h4 {
    color: @accent-color;
  }
}

pre {
  margin: 0;
  background: @code-bg;
  color: @code-color;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;

  code {
    display: block;
    line-height: 1.5;
  }
}

.strategy-tip {
  background: lighten(@accent-color, 45%);
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
}

.ranking-table {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @background-light;
      font-weight: 600;
      color: @secondary-color;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) {
      background: lighten(@background-light, 1%);
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tool-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @primary-color;
  }

  p {
    margin: 0.5rem 0;
  }
}

.tool-steps {
  margin-top: 1rem;
  padding-left: 1.2rem;

  p {
    margin: 0.3rem 0;
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: @accent-color;
    }
  }
}

.optimization-footer {
  text-align: center;
  padding: 2rem 0;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .optimization-header {
    padding: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }
  }

  .strategy-grid {
    grid-template-columns: 1fr;
  }

  .code-comparison {
    flex-direction: column;
  }
}
</style>