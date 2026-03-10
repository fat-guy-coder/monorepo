<template>
  <div class="href-src-container">
    <header class="header">
      <div class="header-content">
        <h1 class="title">href 与 src 的区别基础介绍</h1>
        <p class="subtitle">理解Web开发中两个核心属性的原理与应用场景</p>
      </div>
    </header>

    <main class="content">
      <div class="comparison-section">
        <div class="comparison-card">
          <div class="attribute-header">
            <div class="icon-box" style="background: linear-gradient(135deg, #43cea2, #185a9d);">
              <i class="icon-link"></i>
            </div>
            <h2>href (Hypertext Reference)</h2>
          </div>

          <div class="definition">
            <h3>定义与用途</h3>
            <p>href属性用于指定链接资源的位置，建立当前文档与目标资源之间的关联关系。</p>
          </div>

          <div class="characteristics">
            <h3>核心特性</h3>
            <ul>
              <li><strong>引用关系</strong>：建立文档与资源的关联</li>
              <li><strong>非阻塞加载</strong>：不会阻止页面渲染</li>
              <li><strong>可导航</strong>：常用于页面跳转</li>
              <li><strong>多用途</strong>：用于CSS、favicon、预加载等</li>
            </ul>
          </div>

          <div class="usage">
            <h3>典型使用场景</h3>
            <div class="code-example">
              <pre><code>&lt;!-- 页面导航 --&gt;
&lt;a <span class="highlight">href</span>="/about.html"&gt;关于我们&lt;/a&gt;

&lt;!-- 样式表引用 --&gt;
&lt;link <span class="highlight">href</span>="styles.css" rel="stylesheet"&gt;

&lt;!-- 网站图标 --&gt;
&lt;link <span class="highlight">href</span>="favicon.ico" rel="icon"&gt;

&lt;!-- 预加载资源 --&gt;
&lt;link <span class="highlight">href</span>="image.webp" rel="preload" as="image"&gt;</code></pre>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="attribute-header">
            <div class="icon-box" style="background: linear-gradient(135deg, #ff7e5f, #feb47b);">
              <i class="icon-script"></i>
            </div>
            <h2>src (Source)</h2>
          </div>

          <div class="definition">
            <h3>定义与用途</h3>
            <p>src属性用于将外部资源嵌入当前文档中，作为文档内容的一部分。</p>
          </div>

          <div class="characteristics">
            <h3>核心特性</h3>
            <ul>
              <li><strong>嵌入内容</strong>：将资源作为文档的一部分</li>
              <li><strong>阻塞加载</strong>：可能影响页面渲染</li>
              <li><strong>可执行</strong>：脚本会被执行，媒体会播放</li>
              <li><strong>单用途</strong>：主要用于脚本、媒体和框架</li>
            </ul>
          </div>

          <div class="usage">
            <h3>典型使用场景</h3>
            <div class="code-example">
              <pre><code>&lt;!-- 嵌入JavaScript --&gt;
&lt;script <span class="highlight">src</span>="app.js"&gt;&lt;/script&gt;

&lt;!-- 嵌入图像 --&gt;
&lt;img <span class="highlight">src</span>="photo.jpg" alt="示例图片"&gt;

&lt;!-- 嵌入视频 --&gt;
&lt;video <span class="highlight">src</span>="movie.mp4" controls&gt;&lt;/video&gt;

&lt;!-- 嵌入iframe --&gt;
&lt;iframe <span class="highlight">src</span>="https://example.com"&gt;&lt;/iframe&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-table">
        <h2 class="section-title">href 与 src 关键区别对比</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>href</th>
                <th>src</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>全称</strong></td>
                <td>Hypertext Reference</td>
                <td>Source</td>
              </tr>
              <tr>
                <td><strong>主要用途</strong></td>
                <td>建立关联关系</td>
                <td>嵌入内容</td>
              </tr>
              <tr>
                <td><strong>加载行为</strong></td>
                <td>非阻塞，异步加载</td>
                <td>阻塞，同步加载</td>
              </tr>
              <tr>
                <td><strong>对文档的影响</strong></td>
                <td>不改变当前文档</td>
                <td>成为文档的一部分</td>
              </tr>
              <tr>
                <td><strong>典型标签</strong></td>
                <td>&lt;a&gt;, &lt;link&gt;, &lt;area&gt;</td>
                <td>&lt;script&gt;, &lt;img&gt;, &lt;iframe&gt;</td>
              </tr>
              <tr>
                <td><strong>浏览器处理</strong></td>
                <td>作为引用处理</td>
                <td>作为内容处理</td>
              </tr>
              <tr>
                <td><strong>执行时机</strong></td>
                <td>点击或需要时</td>
                <td>立即加载并执行</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="technical-details">
        <h2 class="section-title">技术原理与最佳实践</h2>

        <div class="detail-section">
          <div class="detail-card">
            <h3>href 工作原理</h3>
            <div class="process-flow">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">浏览器解析href属性</div>
              </div>
              <div class="connector">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">建立与资源的关联</div>
              </div>
              <div class="connector">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">按需异步加载资源</div>
              </div>
              <div class="connector">→</div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">不中断当前页面渲染</div>
              </div>
            </div>
            <p class="note">注意：CSS文件使用href引用但会阻塞渲染，因为浏览器需要样式信息来正确渲染页面</p>
          </div>

          <div class="detail-card">
            <h3>src 工作原理</h3>
            <div class="process-flow">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">浏览器解析src属性</div>
              </div>
              <div class="connector">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">获取资源内容</div>
              </div>
              <div class="connector">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">暂停HTML解析</div>
              </div>
              <div class="connector">→</div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">执行/渲染资源内容</div>
              </div>
            </div>
            <p class="note">提示：使用async或defer属性可以使脚本异步加载，减少阻塞</p>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践指南</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>使用<code>href</code>进行导航和资源引用（CSS、预加载）</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>使用<code>src</code>嵌入脚本、图像、视频等媒体内容</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">⚠</div>
              <p>避免在<code>&lt;script&gt;</code>标签中使用href - 这是无效的</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">⚠</div>
              <p>不要在<code>&lt;a&gt;</code>标签中使用src - 这也是无效的</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>对于脚本，优先使用<code>async</code>或<code>defer</code>减少阻塞</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>使用<code>rel="preload"</code>提前加载重要资源</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>Web开发核心概念 | href 与 src 基础介绍 | Vue 3 技术演示</p>
      <p>理解这些差异有助于编写更高效、可维护的Web应用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const activeTab = ref('href');
</script>

<style lang="less" scoped>
.href-src-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9fafb;
  color: #111827;
  line-height: 1.6;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #111827;
}

.subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.comparison-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.comparison-card {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.attribute-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.attribute-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.icon-box {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: white;
}

.definition,
.characteristics,
.usage {
  margin-bottom: 1.5rem;
}

.definition h3,
.characteristics h3,
.usage h3 {
  font-size: 1.125rem;
  color: #111827;
  margin-bottom: 0.75rem;
  font-weight: 600;
  border-bottom: none;
  padding-bottom: 0;
}

.definition p,
.characteristics p {
  color: #374151;
  font-size: 1rem;
  line-height: 1.7;
}

.characteristics ul {
  padding-left: 20px;
  list-style-type: disc;
}

.characteristics li {
  margin-bottom: 10px;
  color: #374151;
  font-size: 1rem;
}

.characteristics li strong {
  color: #111827;
  font-weight: 600;
}

.code-example {
  background: #f3f4f6;
  border-radius: 6px;
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
}

.code-example pre {
  margin: 0;
  background: transparent;
  color: #1f2937;
}

.highlight {
  color: #d946ef;
  font-weight: bold;
}

.section-title {
  font-size: 1.75rem;
  text-align: center;
  margin: 3rem 0 1.5rem;
  font-weight: 600;
  color: #111827;
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
}

.comparison-table {
  margin-bottom: 3rem;
}

.comparison-table .table-container {
  background: #fff;
  border-radius: 8px;
  padding: 0;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table th {
  background: #f3f4f6;
  color: #111827;
  font-weight: 600;
}

.comparison-table strong {
  color: #111827;
  font-weight: 600;
}

.technical-details {
  margin-bottom: 3rem;
}

.detail-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.detail-card {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
}

.detail-card h3 {
  font-size: 1.25rem;
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.process-flow {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.5rem;
}

.process-flow .step {
  text-align: center;
  flex: 1;
  padding: 0 0.5rem;
}

.step-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  font-size: 1.2rem;
  color: #1e40af;
  font-weight: 700;
}

.step-content {
  color: #374151;
  font-size: 0.9rem;
}

.connector {
  color: #9ca3af;
  font-size: 1.5rem;
  margin: 0;
  position: relative;
  top: -15px;
}

.note {
  background: #eff6ff;
  padding: 1rem;
  border-radius: 6px;
  color: #1e40af;
  font-size: 0.9rem;
  border-left: 4px solid #3b82f6;
}

.best-practices {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  margin-top: 2rem;
}

.best-practices h3 {
  font-size: 1.25rem;
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.practice-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  border: 1px solid #e5e7eb;
}

.practice-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d1fae5;
  border-radius: 50%;
  margin-right: 1rem;
  color: #065f46;
  font-weight: bold;
  font-size: 1rem;
  flex-shrink: 0;
}

.practice-card p {
  color: #374151;
  margin: 0;
  line-height: 1.6;
}

.practice-card p code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  color: #1f2937;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}

.footer {
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 768px) {

  .comparison-section,
  .detail-section {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 2rem;
  }

  .process-flow {
    flex-direction: column;
    align-items: center;
  }

  .process-flow .connector {
    transform: rotate(90deg);
    margin: 10px 0;
    top: 0;
  }
}
</style>
