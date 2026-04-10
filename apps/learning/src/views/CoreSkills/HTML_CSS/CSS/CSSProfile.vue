<template>
  <div class="css-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🎨 CSS 基本指南</h1>
      <div class="header-brush"></div>
      <p class="description">CSS（层叠样式表）是一种用于描述网页文档的呈现方式的样式表语言。它允许开发者控制网页的布局、颜色、字体等视觉效果，从而提升用户体验和界面美观。</p>
    </header>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 核心作用 -->
      <section class="section purpose">
        <h2 class="section-title">💡 CSS 核心作用</h2>
        <div class="purpose-grid">
          <div class="purpose-card">
            <div class="card-icon">🖌️</div>
            <h3>视觉呈现</h3>
            <ul>
              <li>控制元素颜色、字体</li>
              <li>定义布局与间距</li>
              <li>创建动画效果</li>
            </ul>
          </div>
          <div class="purpose-card">
            <div class="card-icon">📱</div>
            <h3>响应式设计</h3>
            <ul>
              <li>媒体查询适配不同设备</li>
              <li>流式布局实现弹性界面</li>
              <li>视口单位自动缩放</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section rules">
        <h2 class="section-title">🌟 CSS 规则</h2>
        <div class="img-container">
          <img :src="img" loading="lazy" alt="加载失败" />
        </div>
        <p>摘自MDN</p>
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference" target="_blank">MDN CSS参考</a>
      </section>

      <!-- 核心特性 -->
      <section class="section features">
        <h2 class="section-title">🌟 CSS 核心特性</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>层叠性</h3>
            <pre class="code-block"><code>/* 最终生效color: #e74c3c */
.text {
  color: #3498db;
  color: #e74c3c;
}</code></pre>
          </div>
          <div class="feature-card">
            <h3>继承性</h3>
            <pre class="code-block"><code>.parent {
  font-size: 16px;
  /* 子元素自动继承字体大小 */
}</code></pre>
          </div>
          <div class="feature-card">
            <h3>优先级</h3>
            <pre class="code-block"><code>!important > 行内样式 >
ID选择器 > 类选择器 > 元素选择器</code></pre>
          </div>
        </div>
      </section>

      <!-- CSS 继承性基础介绍 -->
      <section class="section inheritance">
        <h2 class="section-title">🔄 CSS 继承性基础介绍</h2>
        <div class="inheritance-grid">
          <div class="inheritance-card">
            <h3>可继承属性</h3>
            <ul class="property-list">
              <li>
                <strong>字体相关</strong>
                <ul>
                  <li>font-family</li>
                  <li>font-size</li>
                  <li>font-weight</li>
                  <li>font-style</li>
                </ul>
              </li>
              <li>
                <strong>文本相关</strong>
                <ul>
                  <li>color</li>
                  <li>text-align</li>
                  <li>text-indent</li>
                  <li>line-height</li>
                </ul>
              </li>
              <li>
                <strong>其他</strong>
                <ul>
                  <li>visibility</li>
                  <li>cursor</li>
                  <li>letter-spacing</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="inheritance-card">
            <h3>不可继承属性</h3>
            <ul class="property-list">
              <li>
                <strong>盒模型相关</strong>
                <ul>
                  <li>width/height</li>
                  <li>margin/padding</li>
                  <li>border</li>
                </ul>
              </li>
              <li>
                <strong>定位相关</strong>
                <ul>
                  <li>position</li>
                  <li>top/right/bottom/left</li>
                  <li>z-index</li>
                </ul>
              </li>
              <li>
                <strong>布局相关</strong>
                <ul>
                  <li>display</li>
                  <li>float</li>
                  <li>flex</li>
                  <li>grid</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 选择器权重 -->
      <section class="section specificity">
        <h2 class="section-title">⚖️ CSS 选择器权重</h2>
        <div class="specificity-content">
          <div class="specificity-table">
            <table>
              <thead>
                <tr>
                  <th>权重等级</th>
                  <th>选择器类型</th>
                  <th>权重值</th>
                  <th>示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1️⃣ 最高</td>
                  <td>!important</td>
                  <td>∞</td>
                  <td><code>color: red !important;</code></td>
                </tr>
                <tr>
                  <td>2️⃣ 次高</td>
                  <td>内联样式</td>
                  <td>1000</td>
                  <td><code>style="color: red"</code></td>
                </tr>
                <tr>
                  <td>3️⃣</td>
                  <td>ID选择器</td>
                  <td>100</td>
                  <td><code>#header</code></td>
                </tr>
                <tr>
                  <td>4️⃣</td>
                  <td>类/伪类/属性选择器</td>
                  <td>10</td>
                  <td><code>.btn</code>, <code>:hover</code>, <code>[type="text"]</code></td>
                </tr>
                <tr>
                  <td>5️⃣</td>
                  <td>元素/伪元素选择器</td>
                  <td>1</td>
                  <td><code>div</code>, <code>::before</code></td>
                </tr>
                <tr>
                  <td>6️⃣ 最低</td>
                  <td>通配符</td>
                  <td>0</td>
                  <td><code>*</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="specificity-notes">
            <h3>📝 重要说明</h3>
            <ul>
              <li>权重值从高到低排序，高权重会覆盖低权重</li>
              <li>同权重时，后面的样式会覆盖前面的样式</li>
              <li>!important 应该谨慎使用，会破坏样式的可维护性</li>
              <li>组合选择器的权重值需要叠加计算</li>
            </ul>

            <div class="example-box">
              <h4>🌰 权重计算示例</h4>
              <pre><code>#nav .list li a:hover  /* 权重值: 100 + 10 + 1 + 1 + 10 = 122 */
.header .nav ul li    /* 权重值: 10 + 10 + 1 + 1 = 22 */
div > p              /* 权重值: 1 + 1 = 2 */</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 加载方式 -->
      <section class="section loading">
        <h2 class="section-title">📦 CSS 加载方式</h2>
        <div class="loading-grid">
          <div class="method-card">
            <div class="method-header">
              <span class="icon">1️⃣</span>
              <h3>行内样式</h3>
            </div>
            <pre class="code-block"><code>&lt;div style="color: red;"&gt;</code></pre>
            <p class="warning">⚠️ 慎用，难以维护</p>
          </div>

          <div class="method-card">
            <div class="method-header">
              <span class="icon">2️⃣</span>
              <h3>外部样式表</h3>
            </div>
            <pre class="code-block"><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>
          </div>

          <div class="method-card">
            <div class="method-header">
              <span class="icon">2️⃣</span>
              <h3>@import</h3>
            </div>
            <pre class="code-block"><code>@import('../.../../ssss.css')"</code></pre>
          </div>
        </div>
      </section>

      <!-- link vs @import -->
      <section class="section link-import">
        <h2 class="section-title">🔄 link与@import的区别</h2>
        <div class="compare-grid">
          <div class="compare-card">
            <h3>link标签</h3>
            <div class="pros">
              <h4>优点:</h4>
              <ul>
                <li>并行下载,不会阻塞页面加载</li>
                <li>浏览器支持度好</li>
                <li>可以通过JS动态修改</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点:</h4>
              <ul>
                <li>HTML标签,不能写在CSS文件中</li>
                <li>无法控制CSS加载顺序</li>
              </ul>
            </div>
          </div>

          <div class="compare-card">
            <h3>@import</h3>
            <div class="pros">
              <h4>优点:</h4>
              <ul>
                <li>可以在CSS文件中引入其他CSS</li>
                <li>可以控制CSS加载顺序</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点:</h4>
              <ul>
                <li>@import引入的CSS将在页面加载完毕后被加载</li>
                <li>串行加载,会阻塞页面渲染</li>
                <li>不支持老版本浏览器</li>
                <li>无法通过JS动态控制</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section notices">
        <h2 class="section-title">⚠️ 重要注意事项</h2>
        <div class="notice-grid">
          <div class="notice-card">
            <div class="notice-icon">🚫</div>
            <h3>选择器复杂度</h3>
            <p>避免超过3层嵌套，保持选择器简洁</p>
          </div>
          <div class="notice-card">
            <div class="notice-icon">⚡</div>
            <h3>性能优化</h3>
            <p>减少重排重绘，使用will-change</p>
          </div>
          <div class="notice-card">
            <div class="notice-icon">🌍</div>
            <h3>浏览器前缀</h3>
            <pre class="code-block"><code>-webkit- (Chrome/Safari)
-moz- (Firefox)
-ms- (IE)</code></pre>
          </div>
        </div>
      </section>
    </main>

    <!-- 最佳实践 -->
    <footer class="doc-footer">
      <div class="best-practice">
        <h3>🏆 最佳实践建议</h3>
        <div class="practice-list">
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>使用CSS变量维护设计系统</p>
          </div>
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>优先使用Flex/Grid布局</p>
          </div>
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>遵循BEM命名规范</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import img from '@/assets/image/css/css-rule.jpg'
</script>

<style lang="less" scoped>
.css-doc {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  color: #111827;
}

.doc-header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  color: #111827;
  font-size: 2.2rem;
  margin: 1rem 0;
  font-weight: 700;
  text-shadow: none;
}

.header-brush {
  display: none;
}

.description {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #4b5563;
}

.doc-content .section {
  margin-bottom: 2rem;
}

.section-title {
  color: #111827;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
}

.purpose-grid,
.feature-grid,
.loading-grid,
.notice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.purpose-card,
.feature-card,
.method-card,
.notice-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  transition: none;
}

.purpose-card:hover,
.feature-card:hover,
.method-card:hover,
.notice-card:hover {
  transform: none;
}

.card-icon,
.notice-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.method-header .icon {
  font-size: 1.2rem;
}

.warning {
  color: #b91c1c;
  margin-top: 1rem;
}

.code-block {
  background: #1f2937;
  color: #e5e7eb;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.doc-footer {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.best-practice .practice-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.practice-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.practice-item .icon {
  font-size: 1.2rem;
  color: #2563eb;
}

.img-container {
  width: 100%;
}

.img-container img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.inheritance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.inheritance-card {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.property-list ul {
  padding-left: 1.2rem;
}

.specificity-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.specificity-table table {
  width: 100%;
  border-collapse: collapse;
}

.specificity-table th,
.specificity-table td {
  border: 1px solid #e5e7eb;
  padding: 0.8rem;
  text-align: left;
}

.specificity-table th {
  background: #f3f4f6;
}

.specificity-notes ul {
  padding-left: 1.5rem;
}

.example-box {
  margin-top: 1rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.compare-card {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

@media (max-width: 768px) {
  .css-doc {
    padding: 1rem;
    margin: 1rem;
  }
}
</style>
