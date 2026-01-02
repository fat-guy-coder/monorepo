<template>
  <div class="pdf-preview-container">
    <header class="header">
      <h1><i class="icon-pdf"></i> PDF 预览实现方案基本介绍</h1>
      <p>探索多种在前端实现PDF预览的方法，选择最适合您项目的方案</p>
    </header>

    <main class="main-content">
      <div class="method-tabs">
        <button v-for="(method, index) in methods" :key="index" :class="{ active: activeMethod === method.id }"
          @click="activeMethod = method.id">
          <i :class="method.icon"></i> {{ method.title }}
        </button>
      </div>

      <!-- 原生方式 -->
      <section v-show="activeMethod === 'native'" class="method-section">
        <div class="method-header">
          <h2><i class="icon-browser"></i> 浏览器原生方式</h2>
          <div class="method-tag">简单快速</div>
        </div>

        <div class="method-content">
          <div class="method-desc">
            <p>使用浏览器内置的PDF渲染能力，通过<code>&lt;embed&gt;</code>、<code>&lt;object&gt;</code>或<code>&lt;iframe&gt;</code>标签实现。
            </p>
          </div>

          <div class="code-block">
            <h3>实现代码</h3>
            <pre><code>&lt;!-- 使用 iframe --&gt;
&lt;iframe
  :src="pdfUrl"
  width="100%"
  height="600px"
  frameborder="0"
&gt;&lt;/iframe&gt;

&lt;!-- 使用 embed --&gt;
&lt;embed
  :src="pdfUrl"
  type="application/pdf"
  width="100%"
  height="600px"
&gt;

&lt;!-- 使用 object --&gt;
&lt;object
  :data="pdfUrl"
  type="application/pdf"
  width="100%"
  height="600px"
&gt;
  &lt;p&gt;您的浏览器不支持PDF预览，请&lt;a :href="pdfUrl"&gt;下载&lt;/a&gt;&lt;/p&gt;
&lt;/object&gt;</code></pre>
          </div>

          <div class="comparison">
            <div class="pros">
              <h3><i class="icon-check"></i> 优点</h3>
              <ul>
                <li>实现简单，无需额外依赖</li>
                <li>浏览器原生支持，兼容性好</li>
                <li>性能开销小</li>
                <li>支持浏览器默认的PDF操作功能</li>
              </ul>
            </div>

            <div class="cons">
              <h3><i class="icon-warning"></i> 缺点</h3>
              <ul>
                <li>界面样式不可定制</li>
                <li>不同浏览器渲染效果不一致</li>
                <li>无法深度集成到应用中</li>
                <li>移动端体验不佳</li>
              </ul>
            </div>
          </div>

          <div class="use-case">
            <h3><i class="icon-scenario"></i> 适用场景</h3>
            <ul>
              <li>需要快速实现的简单预览需求</li>
              <li>对UI定制要求不高的项目</li>
              <li>内网环境或对安全性要求不高的场景</li>
              <li>兼容老旧浏览器的项目</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- PDF.js 方式 -->
      <section v-show="activeMethod === 'pdfjs'" class="method-section">
        <div class="method-header">
          <h2><i class="icon-pdfjs"></i> PDF.js 方案</h2>
          <div class="method-tag">灵活强大</div>
        </div>

        <div class="method-content">
          <div class="method-desc">
            <p>Mozilla开源的PDF渲染库，提供高度定制化的PDF渲染能力。</p>
          </div>

          <div class="code-block">
            <h3>实现代码</h3>
            <pre><code>import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

// 设置worker路径
GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

// 加载PDF文档
const loadingTask = getDocument(pdfUrl);
loadingTask.promise.then(pdf => {
  // 获取第一页
  pdf.getPage(1).then(page => {
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    // 准备canvas渲染
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // 渲染页面
    const renderContext = { canvasContext: context, viewport };
    page.render(renderContext);
  });
});</code></pre>
          </div>

          <div class="comparison">
            <div class="pros">
              <h3><i class="icon-check"></i> 优点</h3>
              <ul>
                <li>高度可定制化的渲染界面</li>
                <li>支持文本选择、搜索、标注等高级功能</li>
                <li>跨浏览器一致体验</li>
                <li>支持加密PDF</li>
                <li>活跃的开源社区支持</li>
              </ul>
            </div>

            <div class="cons">
              <h3><i class="icon-warning"></i> 缺点</h3>
              <ul>
                <li>实现复杂度较高</li>
                <li>需要额外的依赖库</li>
                <li>首次加载速度较慢</li>
                <li>大文件内存占用较高</li>
              </ul>
            </div>
          </div>

          <div class="use-case">
            <h3><i class="icon-scenario"></i> 适用场景</h3>
            <ul>
              <li>需要定制化PDF查看器的项目</li>
              <li>需要文本选择、搜索功能的场景</li>
              <li>需要标注、注释功能的文档系统</li>
              <li>对浏览器兼容性要求高的应用</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 云服务方式 -->
      <section v-show="activeMethod === 'cloud'" class="method-section">
        <div class="method-header">
          <h2><i class="icon-cloud"></i> 云服务方案</h2>
          <div class="method-tag">便捷高效</div>
        </div>

        <div class="method-content">
          <div class="method-desc">
            <p>使用第三方云服务（如Google Docs Viewer）实现PDF预览。</p>
          </div>

          <div class="code-block">
            <h3>实现代码</h3>
            <pre><code>&lt;!-- 使用Google Docs Viewer --&gt;
&lt;iframe
  src="https://docs.google.com/gview?url=YOUR_PDF_URL&embedded=true"
  width="100%"
  height="600px"
  frameborder="0"
&gt;
&lt;/iframe&gt;

&lt;!-- 使用Microsoft Office Online --&gt;
&lt;iframe
  src="https://view.officeapps.live.com/op/embed.aspx?src=YOUR_PDF_URL"
  width="100%"
  height="600px"
  frameborder="0"
&gt;
&lt;/iframe&gt;</code></pre>
          </div>

          <div class="comparison">
            <div class="pros">
              <h3><i class="icon-check"></i> 优点</h3>
              <ul>
                <li>实现极其简单</li>
                <li>无需前端处理PDF渲染</li>
                <li>跨平台一致体验</li>
                <li>支持大文件处理</li>
                <li>免费方案可用</li>
              </ul>
            </div>

            <div class="cons">
              <h3><i class="icon-warning"></i> 缺点</h3>
              <ul>
                <li>依赖第三方服务稳定性</li>
                <li>存在隐私和安全风险</li>
                <li>无法自定义UI</li>
                <li>需要公开访问的PDF URL</li>
                <li>加载速度依赖外部服务</li>
              </ul>
            </div>
          </div>

          <div class="use-case">
            <h3><i class="icon-scenario"></i> 适用场景</h3>
            <ul>
              <li>快速原型开发</li>
              <li>公开文档的预览</li>
              <li>对UI定制要求不高的场景</li>
              <li>无复杂交互需求的项目</li>
              <li>资源受限的前端环境</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 综合对比 -->
      <section class="comparison-section">
        <h2><i class="icon-compare"></i> 方案综合对比</h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>对比维度</th>
                <th>原生方式</th>
                <th>PDF.js</th>
                <th>云服务</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>实现复杂度</td>
                <td>
                  <div class="rating easy">简单</div>
                </td>
                <td>
                  <div class="rating hard">复杂</div>
                </td>
                <td>
                  <div class="rating easy">简单</div>
                </td>
              </tr>
              <tr>
                <td>定制能力</td>
                <td>
                  <div class="rating low">低</div>
                </td>
                <td>
                  <div class="rating high">高</div>
                </td>
                <td>
                  <div class="rating low">低</div>
                </td>
              </tr>
              <tr>
                <td>加载性能</td>
                <td>
                  <div class="rating high">高</div>
                </td>
                <td>
                  <div class="rating medium">中</div>
                </td>
                <td>
                  <div class="rating medium">中</div>
                </td>
              </tr>
              <tr>
                <td>内存占用</td>
                <td>
                  <div class="rating low">低</div>
                </td>
                <td>
                  <div class="rating high">高</div>
                </td>
                <td>
                  <div class="rating low">低</div>
                </td>
              </tr>
              <tr>
                <td>安全性</td>
                <td>
                  <div class="rating high">高</div>
                </td>
                <td>
                  <div class="rating high">高</div>
                </td>
                <td>
                  <div class="rating low">低</div>
                </td>
              </tr>
              <tr>
                <td>推荐场景</td>
                <td>简单预览</td>
                <td>企业级应用</td>
                <td>公开文档</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="recommendation">
          <h3><i class="icon-tip"></i> 方案选择建议</h3>
          <div class="recommend-cards">
            <div class="card">
              <div class="card-icon">
                <i class="icon-browser"></i>
              </div>
              <h4>选择原生方式当：</h4>
              <ul>
                <li>需要快速实现预览功能</li>
                <li>项目时间/资源有限</li>
                <li>不需要定制化功能</li>
              </ul>
            </div>

            <div class="card">
              <div class="card-icon">
                <i class="icon-pdfjs"></i>
              </div>
              <h4>选择PDF.js当：</h4>
              <ul>
                <li>需要高度定制化界面</li>
                <li>需要文本选择/搜索功能</li>
                <li>需要处理加密PDF</li>
              </ul>
            </div>

            <div class="card">
              <div class="card-icon">
                <i class="icon-cloud"></i>
              </div>
              <h4>选择云服务当：</h4>
              <ul>
                <li>处理公开文档</li>
                <li>前端资源受限</li>
                <li>需要快速原型验证</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> 前端开发技术文档 | PDF预览实现方案</p>
      <p>根据项目需求和安全要求选择合适的PDF预览方案</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// PDF预览方法
const methods = ref([
  { id: 'native', title: '原生方式', icon: 'icon-browser' },
  { id: 'pdfjs', title: 'PDF.js方案', icon: 'icon-pdfjs' },
  { id: 'cloud', title: '云服务方案', icon: 'icon-cloud' }
]);

const activeMethod = ref('native');
</script>

<style lang="less" scoped>


:root {
  --primary-color: #e74c3c;
  --secondary-color: #2c3e50;
  --accent-color: #3498db;
  --success-color: #2ecc71;
  --light-bg: #f8f9fa;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

.pdf-preview-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, var(--secondary-color), #1a2530);
  color: white;
  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.main-content {
  padding: 2rem;
  flex: 1;
}

.method-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  button {
    flex: 1;
    min-width: 180px;
    padding: 1rem;
    background: var(--light-bg);
    border: 1px solid #e0e0e0;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      border-color: var(--accent-color);
      color: var(--accent-color);
    }

    &.active {
      background: var(--primary-color);
      color: rgb(235, 129, 129);
      border-color: var(--primary-color);
    }
  }
}

.method-section {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
  overflow: hidden;
}

.method-header {
  background: linear-gradient(90deg, #2c3e50, #4a6491);
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.method-tag {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.3rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.method-content {
  padding: 1.5rem;
}

.method-desc {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;

  p {
    font-size: 1.05rem;
    line-height: 1.7;
  }
}

.code-block {
  background: #f8f9fa;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  h3 {
    color: var(--secondary-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  pre {
    background: #2c3e50;
    color: #ecf0f1;
    border-radius: 6px;
    padding: 1.2rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      font-family: inherit;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: var(--light-bg);
  border-radius: var(--border-radius);
  padding: 1.2rem;

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
}

.pros {
  border-left: 4px solid var(--success-color);
}

.cons {
  border-left: 4px solid #f39c12;
}

.use-case {
  background: #e3f2fd;
  border-radius: var(--border-radius);
  padding: 1.2rem;

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
}

.comparison-section {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;
  margin-top: 2rem;

  h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
  }
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: center;
      border: 1px solid #eaeaea;
    }

    th {
      background: var(--light-bg);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f9f9f9;
    }
  }
}

.rating {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-weight: 500;

  &.easy {
    background: #e8f5e9;
    color: #2e7d32;
  }

  &.medium {
    background: #fff8e1;
    color: #f57f17;
  }

  &.hard {
    background: #ffebee;
    color: #c62828;
  }

  &.low {
    background: #e8f5e9;
    color: #2e7d32;
  }

  &.high {
    background: #ffebee;
    color: #c62828;
  }
}

.recommendation {
  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    color: var(--secondary-color);
  }
}

.recommend-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }

  h4 {
    color: var(--secondary-color);
    margin: 1rem 0;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.6rem;
      line-height: 1.5;
    }
  }
}

.card-icon {
  background: var(--primary-color);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
}

.footer {
  background: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;

  p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 图标样式 */
[class^="icon-"] {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

.icon-pdf::before {
  content: "picture_as_pdf";
}

.icon-browser::before {
  content: "public";
}

.icon-pdfjs::before {
  content: "code";
}

.icon-cloud::before {
  content: "cloud";
}

.icon-check::before {
  content: "check_circle";
}

.icon-warning::before {
  content: "warning";
}

.icon-scenario::before {
  content: "scatter_plot";
}

.icon-compare::before {
  content: "compare";
}

.icon-tip::before {
  content: "lightbulb";
}
</style>
