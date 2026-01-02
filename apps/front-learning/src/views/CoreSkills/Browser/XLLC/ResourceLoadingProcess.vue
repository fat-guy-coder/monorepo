<template>
  <div class="resource-loading-container">
    <header class="loading-header">
      <h1>前端渲染资源加载过程</h1>
      <p class="subtitle">从HTML解析到资源加载的完整流程剖析</p>
    </header>

    <div class="loading-process">
      <div class="process-bar">
        <div class="process-step" :class="{ active: activeStep >= 1 }">
          <div class="step-icon">📄</div>
          <div class="step-label">HTML解析</div>
        </div>
        <div class="process-step" :class="{ active: activeStep >= 2 }">
          <div class="step-icon">🎨</div>
          <div class="step-label">CSS加载</div>
        </div>
        <div class="process-step" :class="{ active: activeStep >= 3 }">
          <div class="step-icon">🖼️</div>
          <div class="step-label">图片加载</div>
        </div>
        <div class="process-step" :class="{ active: activeStep >= 4 }">
          <div class="step-icon">🧩</div>
          <div class="step-label">JS执行</div>
        </div>
        <div class="process-step" :class="{ active: activeStep >= 5 }">
          <div class="step-icon">🔤</div>
          <div class="step-label">字体加载</div>
        </div>
        <div class="process-step" :class="{ active: activeStep >= 6 }">
          <div class="step-icon">✨</div>
          <div class="step-label">渲染完成</div>
        </div>
      </div>
    </div>

    <div class="loading-content">
      <!-- HTML加载部分 -->
      <section class="resource-section html-section">
        <div class="resource-header">
          <h2><span class="resource-icon">📄</span> HTML 加载</h2>
          <div class="resource-subheader">页面渲染的基础骨架</div>
        </div>

        <div class="resource-details">
          <div class="loading-sequence">
            <h3>加载顺序与方式</h3>
            <ul>
              <li>浏览器接收到HTML文档后立即开始解析</li>
              <li>从上到下顺序解析文档结构</li>
              <li>遇到外部资源时并行发起请求</li>
              <li>HTML解析会阻塞渲染树构建</li>
            </ul>
          </div>

          <div class="loading-methods">
            <h3>关键特性</h3>
            <div class="method-cards">
              <div class="method-card">
                <div class="method-icon">⚡</div>
                <div class="method-title">流式解析</div>
                <div class="method-desc">浏览器在接收到部分HTML后立即开始解析</div>
              </div>
              <div class="method-card">
                <div class="method-icon">⏳</div>
                <div class="method-title">阻塞渲染</div>
                <div class="method-desc">HTML解析会阻塞渲染树构建</div>
              </div>
              <div class="method-card">
                <div class="method-icon">🔗</div>
                <div class="method-title">资源预扫描</div>
                <div class="method-desc">预加载扫描器提前发现资源</div>
              </div>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>减小HTML文件体积（压缩、删除注释）</li>
              <li>减少DOM节点数量</li>
              <li>关键CSS内联在&lt;head&gt;中</li>
              <li>异步加载非关键资源</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CSS加载部分 -->
      <section class="resource-section css-section">
        <div class="resource-header">
          <h2><span class="resource-icon">🎨</span> CSS 加载</h2>
          <div class="resource-subheader">页面样式与布局的核心</div>
        </div>

        <div class="resource-details">
          <div class="loading-sequence">
            <h3>加载顺序与方式</h3>
            <ul>
              <li>同步加载：默认阻塞渲染</li>
              <li>CSSOM构建：解析CSS规则创建CSS对象模型</li>
              <li>渲染阻塞：CSS加载会阻塞页面渲染</li>
              <li>渲染树构建：DOM + CSSOM = 渲染树</li>
            </ul>
          </div>

          <div class="loading-methods">
            <h3>加载方式示例</h3>
            <div class="code-examples">
              <div class="code-block">
                <h4>阻塞渲染 (默认)</h4>
                <pre><code>&lt;link href="styles.css" rel="stylesheet"&gt;</code></pre>
              </div>
              <div class="code-block">
                <h4>媒体查询</h4>
                <pre><code>&lt;link href="print.css"
  rel="stylesheet"
  media="print"&gt;</code></pre>
              </div>
              <div class="code-block">
                <h4>异步加载</h4>
                <pre><code>&lt;link href="async.css"
  rel="stylesheet"
  media="print"
  onload="this.media='all'"&gt;</code></pre>
              </div>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>关键CSS内联到HTML中</li>
              <li>使用媒体查询避免阻塞</li>
              <li>压缩CSS文件</li>
              <li>减少CSS选择器复杂度</li>
              <li>使用CSS变量减少重复</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 图片加载部分 -->
      <section class="resource-section image-section">
        <div class="resource-header">
          <h2><span class="resource-icon">🖼️</span> 图片加载</h2>
          <div class="resource-subheader">视觉内容的主要载体</div>
        </div>

        <div class="resource-details">
          <div class="loading-sequence">
            <h3>加载顺序与方式</h3>
            <ul>
              <li>异步加载：不阻塞页面渲染</li>
              <li>按需加载：出现在视口时才开始加载</li>
              <li>解码延迟：图片下载后需要解码</li>
              <li>渲染影响：可能导致布局偏移</li>
            </ul>
          </div>

          <div class="loading-methods">
            <h3>加载方式示例</h3>
            <div class="code-examples">
              <div class="code-block">
                <h4>普通加载</h4>
                <pre><code>&lt;img src="image.jpg"
  alt="示例图片"&gt;</code></pre>
              </div>
              <div class="code-block">
                <h4>响应式图片</h4>
                <pre><code>&lt;img src="small.jpg"
  srcset="medium.jpg 1000w,
          large.jpg 2000w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         1000px"&gt;</code></pre>
              </div>
              <div class="code-block">
                <h4>懒加载</h4>
                <pre><code>&lt;img src="placeholder.jpg"
  data-src="image.jpg"
  loading="lazy"&gt;</code></pre>
              </div>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>使用懒加载（loading="lazy"）</li>
              <li>选择合适的图片格式（WebP, AVIF）</li>
              <li>使用响应式图片（srcset）</li>
              <li>设置明确的宽高尺寸</li>
              <li>使用CDN加速图片分发</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- JavaScript加载部分 -->
      <section class="resource-section js-section">
        <div class="resource-header">
          <h2><span class="resource-icon">🧩</span> JavaScript 加载</h2>
          <div class="resource-subheader">页面交互与动态功能</div>
        </div>

        <div class="resource-details">
          <div class="loading-sequence">
            <h3>加载顺序与方式</h3>
            <ul>
              <li>阻塞解析：默认阻塞HTML解析</li>
              <li>执行顺序：按文档顺序同步执行</li>
              <li>依赖管理：模块间的依赖关系</li>
              <li>事件驱动：DOMContentLoaded和load事件</li>
            </ul>
          </div>

          <div class="loading-methods">
            <h3>加载方式示例</h3>
            <div class="code-examples">
              <div class="code-block">
                <h4>阻塞加载 (默认)</h4>
                <pre><code>&lt;script src="app.js"&gt;&lt;/script&gt;</code></pre>
              </div>
              <div class="code-block">
                <h4>异步加载</h4>
                <pre><code>&lt;script src="async.js"
  async&gt;&lt;/script&gt;</code></pre>
              </div>
              <div class="code-block">
                <h4>延迟加载</h4>
                <pre><code>&lt;script src="deferred.js"
  defer&gt;&lt;/script&gt;</code></pre>
              </div>
              <div class="code-block">
                <h4>模块加载</h4>
                <pre><code>&lt;script type="module"
  src="module.js"&gt;&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>使用异步(async)或延迟(defer)加载</li>
              <li>代码分割（Code Splitting）</li>
              <li>Tree Shaking移除未使用代码</li>
              <li>压缩和混淆JavaScript代码</li>
              <li>使用浏览器缓存</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 字体加载部分 -->
      <section class="resource-section font-section">
        <div class="resource-header">
          <h2><span class="resource-icon">🔤</span> 字体加载</h2>
          <div class="resource-subheader">文本渲染的核心资源</div>
        </div>

        <div class="resource-details">
          <div class="loading-sequence">
            <h3>加载顺序与方式</h3>
            <ul>
              <li>异步加载：不影响页面渲染</li>
              <li>FOIT问题：字体加载期间空白显示</li>
              <li>FOUT问题：回退字体切换闪烁</li>
              <li>字体渲染：下载后替换文本</li>
            </ul>
          </div>

          <div class="loading-methods">
            <h3>加载方式示例</h3>
            <div class="code-examples">
              <div class="code-block">
                <h4>基本加载</h4>
                <pre><code>@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
}</code></pre>
              </div>
              <div class="code-block">
                <h4>字体显示控制</h4>
                <pre><code>@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}</code></pre>
              </div>
              <div class="code-block">
                <h4>预加载</h4>
                <pre><code>&lt;link rel="preload"
  href="font.woff2"
  as="font"
  type="font/woff2"
  crossorigin&gt;</code></pre>
              </div>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>使用font-display: swap避免空白文本</li>
              <li>预加载关键字体资源</li>
              <li>使用WOFF2格式（压缩率更高）</li>
              <li>限制字体文件数量和大小</li>
              <li>使用本地回退字体栈</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="loading-timeline">
      <h2>资源加载时间线</h2>
      <div class="timeline-container">
        <div class="timeline">
          <div class="timeline-event" v-for="(event, index) in timelineEvents" :key="index"
            :style="{ left: event.position + '%' }">
            <div class="event-time">{{ event.time }}ms</div>
            <div class="event-icon">{{ event.icon }}</div>
            <div class="event-label">{{ event.label }}</div>
          </div>
        </div>
      </div>

      <div class="timeline-legend">
        <div class="legend-item" v-for="(type, index) in resourceTypes" :key="index">
          <div class="legend-icon">{{ type.icon }}</div>
          <div class="legend-label">{{ type.name }}</div>
        </div>
      </div>
    </div>

    <footer class="loading-footer">
      <div class="performance-summary">
        <div class="metric">
          <div class="metric-value">{{ totalResources }}</div>
          <div class="metric-label">资源总数</div>
        </div>
        <div class="metric">
          <div class="metric-value">{{ totalSize }} KB</div>
          <div class="metric-label">资源大小</div>
        </div>
        <div class="metric">
          <div class="metric-value">{{ loadTime }} ms</div>
          <div class="metric-label">加载时间</div>
        </div>
      </div>

      <div class="best-practices">
        <h3>前端资源加载最佳实践</h3>
        <ol>
          <li>最小化关键资源数量</li>
          <li>使用Preload预加载关键资源</li>
          <li>延迟加载非关键资源</li>
          <li>优化资源加载顺序（CSS优先，JS延迟）</li>
          <li>使用浏览器缓存策略</li>
          <li>压缩所有文本资源（HTML/CSS/JS）</li>
          <li>使用现代图片格式（WebP/AVIF）</li>
          <li>实现懒加载和代码分割</li>
        </ol>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const activeStep = ref(0);
const totalResources = ref(24);
const totalSize = ref(1540);
const loadTime = ref(1860);

const timelineEvents = ref([
  { time: 0, icon: '📄', label: 'HTML开始加载', position: 0 },
  { time: 120, icon: '🎨', label: 'CSS加载开始', position: 10 },
  { time: 180, icon: '🧩', label: 'JS同步加载', position: 15 },
  { time: 250, icon: '🖼️', label: '首屏图片加载', position: 20 },
  { time: 420, icon: '📄', label: 'DOMContentLoaded', position: 35 },
  { time: 580, icon: '🔤', label: '字体加载完成', position: 45 },
  { time: 860, icon: '🧩', label: 'JS执行完成', position: 60 },
  { time: 1120, icon: '🖼️', label: '非首屏图片加载', position: 75 },
  { time: 1540, icon: '✨', label: '页面完全加载', position: 90 }
]);

const resourceTypes = ref([
  { icon: '📄', name: 'HTML' },
  { icon: '🎨', name: 'CSS' },
  { icon: '🧩', name: 'JavaScript' },
  { icon: '🖼️', name: '图片' },
  { icon: '🔤', name: '字体' }
]);

// 模拟加载过程动画
onMounted(() => {
  let step = 0;
  const interval = setInterval(() => {
    step++;
    activeStep.value = step;
    if (step >= 6) {
      clearInterval(interval);
    }
  }, 800);
});
</script>

<style scoped lang="less">
@primary-color: #3498db;
@css-color: #9b59b6;
@image-color: #e74c3c;
@js-color: #f39c12;
@font-color: #2ecc71;
@background-dark: #2c3e50;
@background-light: #ecf0f1;
@text-light: #fff;
@text-dark: #34495e;
@border-radius: 8px;
@box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

.resource-loading-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-dark;
  background-color: #fafbfc;
  line-height: 1.6;
}

.loading-header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #1a5276, @primary-color);
  color: @text-light;
  border-radius: @border-radius;
  margin-bottom: 30px;
  box-shadow: @box-shadow;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.85;
    font-weight: 300;
  }
}

.loading-process {
  background: white;
  border-radius: @border-radius;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: @box-shadow;

  .process-bar {
    display: flex;
    justify-content: space-between;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      height: 4px;
      background: #eee;
      z-index: 1;
    }
  }

  .process-step {
    position: relative;
    text-align: center;
    z-index: 2;
    opacity: 0.6;
    transition: all 0.5s ease;

    &.active {
      opacity: 1;

      .step-icon {
        transform: scale(1.2);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
      }
    }

    .step-icon {
      width: 80px;
      height: 80px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      margin: 0 auto 15px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .step-label {
      font-weight: 600;
      font-size: 1.1rem;
    }
  }
}

.resource-section {
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  margin-bottom: 30px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  &.html-section .resource-header {
    background: linear-gradient(to right, @primary-color, lighten(@primary-color, 10%));
  }

  &.css-section .resource-header {
    background: linear-gradient(to right, @css-color, lighten(@css-color, 10%));
  }

  &.image-section .resource-header {
    background: linear-gradient(to right, @image-color, lighten(@image-color, 10%));
  }

  &.js-section .resource-header {
    background: linear-gradient(to right, @js-color, lighten(@js-color, 10%));
  }

  &.font-section .resource-header {
    background: linear-gradient(to right, @font-color, lighten(@font-color, 10%));
  }

  .resource-header {
    padding: 25px 30px;
    color: white;

    h2 {
      margin: 0;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .resource-icon {
      font-size: 2rem;
    }

    .resource-subheader {
      font-size: 1.1rem;
      opacity: 0.9;
      margin-top: 8px;
    }
  }
}

.resource-details {
  padding: 25px 30px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  h3 {
    color: @background-dark;
    margin-top: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
    font-size: 1.3rem;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 12px;
      position: relative;

      &::before {
        content: '•';
        color: @primary-color;
        font-weight: bold;
        position: absolute;
        left: -15px;
      }
    }
  }
}

.loading-methods {
  .method-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }

  .method-card {
    background: @background-light;
    border-radius: @border-radius;
    padding: 20px;
    text-align: center;

    .method-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .method-title {
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 1.1rem;
    }

    .method-desc {
      font-size: 0.9rem;
      color: #666;
    }
  }

  .code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }

  .code-block {
    background: #f8f9fa;
    border-radius: @border-radius;
    overflow: hidden;

    h4 {
      background: #e9ecef;
      margin: 0;
      padding: 12px 15px;
      font-size: 1rem;
    }

    pre {
      margin: 0;
      padding: 15px;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.optimization {
  background: #e3f2fd;
  border-radius: @border-radius;
  padding: 20px;
  margin-top: 20px;

  ul li::before {
    color: @primary-color;
  }
}

.loading-timeline {
  background: white;
  border-radius: @border-radius;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: @box-shadow;

  h2 {
    text-align: center;
    color: @background-dark;
    margin-top: 0;
    margin-bottom: 30px;
  }
}

.timeline-container {
  background: #f8f9fa;
  border-radius: @border-radius;
  padding: 30px 20px;
}

.timeline {
  height: 120px;
  background: linear-gradient(to right, #e0f7fa, #b2ebf2, #80deea, #4dd0e1, #26c6da, #00bcd4);
  border-radius: 60px;
  position: relative;
  margin: 30px 0;
}

.timeline-event {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  min-width: 100px;

  .event-time {
    font-size: 0.9rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
  }

  .event-icon {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin: 0 auto 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .event-label {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
  }
}

.timeline-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;

    .legend-icon {
      width: 36px;
      height: 36px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .legend-label {
      font-weight: 500;
    }
  }
}

.loading-footer {
  background: white;
  border-radius: @border-radius;
  padding: 30px;
  box-shadow: @box-shadow;
}

.performance-summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;

  .metric {
    text-align: center;

    .metric-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: @primary-color;
    }

    .metric-label {
      font-size: 1.1rem;
      color: #7f8c8d;
    }
  }
}

.best-practices {
  background: #e8f5e9;
  border-radius: @border-radius;
  padding: 30px;

  h3 {
    text-align: center;
    color: #2e7d32;
    margin-top: 0;
    margin-bottom: 20px;
  }

  ol {
    padding-left: 25px;

    li {
      margin-bottom: 15px;
      padding-left: 10px;
      position: relative;
      font-size: 1.1rem;
      line-height: 1.6;

      &::before {
        content: counter(list-item);
        position: absolute;
        left: -25px;
        top: 0;
        width: 20px;
        height: 20px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 768px) {
  .loading-header h1 {
    font-size: 1.8rem;
  }

  .process-step {
    .step-icon {
      width: 60px;
      height: 60px;
      font-size: 1.8rem;
    }

    .step-label {
      font-size: 0.9rem;
    }
  }

  .resource-details {
    padding: 20px;
  }

  .performance-summary {
    flex-direction: column;
    gap: 20px;
  }
}
</style>