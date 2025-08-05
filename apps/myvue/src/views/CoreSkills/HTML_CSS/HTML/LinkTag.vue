<template>
  <div class="link-container">
    <header class="header">
      <h1>HTML <span class="highlight">&lt;link&gt;</span> 标签详解</h1>
      <p class="subtitle">掌握网页资源链接的核心技术</p>
    </header>

    <div class="content">
      <!-- 基本介绍部分 -->
      <section class="intro-section">
        <div class="icon-box">
          <i class="fas fa-link"></i>
        </div>
        <div class="intro-content">
          <h2>什么是 &lt;link&gt; 标签？</h2>
          <p>&lt;link&gt; 标签是 HTML 文档头部的重要元素，用于在当前文档和外部资源之间建立联系。它通常位于 &lt;head&gt; 部分，不显示在页面内容中，但对网页功能和性能有重大影响。</p>
        </div>
      </section>

      <!-- 基本语法 -->
      <section class="syntax-section">
        <h2 class="section-title">
          <i class="fas fa-code"></i>
          基本语法
        </h2>
        <pre class="code-block">&lt;link rel="<span class="attr-value">stylesheet</span>" href="<span class="attr-value">styles.css</span>"&gt;</pre>
      </section>

      <!-- 核心属性 -->
      <section class="attributes-section">
        <h2 class="section-title">
          <i class="fas fa-cog"></i>
          核心属性详解
        </h2>

        <div class="attributes-grid">
          <div v-for="(attr, index) in attributes" :key="index" class="attribute-card">
            <h3 class="attr-title">{{ attr.name }}
              <span class="attr-required" v-if="attr.required">*必需</span>
            </h3>
            <p class="attr-description">{{ attr.description }}</p>

            <div class="attr-values" v-if="attr.values">
              <h4>可选值：</h4>
              <ul>
                <li v-for="(value, vIndex) in attr.values" :key="vIndex">
                  <code>{{ value.value }}</code> - {{ value.description }}
                </li>
              </ul>
            </div>

            <div class="attr-example" v-if="attr.example">
              <h4>示例：</h4>
              <pre>{{ attr.example }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenarios-section">
        <h2 class="section-title">
          <i class="fas fa-sitemap"></i>
          主要使用场景
        </h2>

        <div class="scenarios">
          <div v-for="(scenario, index) in scenarios" :key="index" class="scenario-card">
            <div class="scenario-icon">
              <i :class="scenario.icon"></i>
            </div>
            <div class="scenario-content">
              <h3>{{ scenario.title }}</h3>
              <p>{{ scenario.description }}</p>
              <div class="scenario-example">
                <pre>{{ scenario.example }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点分析 -->
      <section class="pros-cons-section">
        <h2 class="section-title">
          <i class="fas fa-balance-scale"></i>
          优缺点分析
        </h2>

        <div class="pros-cons">
          <div class="pros">
            <h3><i class="fas fa-check-circle"></i> 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">{{ pro }}</li>
            </ul>
          </div>

          <div class="cons">
            <h3><i class="fas fa-exclamation-circle"></i> 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">{{ con }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2 class="section-title">
          <i class="fas fa-star"></i>
          最佳实践
        </h2>

        <div class="practices-grid">
          <div v-for="(practice, index) in practices" :key="index" class="practice-card">
            <div class="practice-number">{{ index + 1 }}</div>
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
          </div>
        </div>
      </section>

      <!-- 资源加载顺序 -->
      <section class="loading-section">
        <h2 class="section-title">
          <i class="fas fa-sync-alt"></i>
          资源加载顺序
        </h2>

        <div class="loading-timeline">
          <div class="timeline-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>HTML 解析</h3>
              <p>浏览器开始解析 HTML 文档</p>
            </div>
          </div>

          <div class="timeline-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>遇到 &lt;link&gt; 标签</h3>
              <p>浏览器发现 link 标签请求外部资源</p>
            </div>
          </div>

          <div class="timeline-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>发起资源请求</h3>
              <p>根据 rel 和 href 属性请求资源</p>
            </div>
          </div>

          <div class="timeline-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>资源加载</h3>
              <p>CSS: 阻塞渲染<br>JS: 根据 async/defer 行为不同<br>Preload: 高优先级加载</p>
            </div>
          </div>

          <div class="timeline-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>资源应用</h3>
              <p>CSS: 构建 CSSOM<br>JS: 执行脚本<br>图标: 显示在标签页</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>&lt;link&gt; 标签是连接网页与外部资源的桥梁，合理使用可以显著提升网站性能和用户体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 属性数据
const attributes = ref([
  {
    name: 'rel',
    required: true,
    description: '定义当前文档与链接资源的关系',
    values: [
      { value: 'stylesheet', description: '链接外部CSS样式表' },
      { value: 'icon', description: '链接网站图标（favicon）' },
      { value: 'preload', description: '指示浏览器预加载资源' },
      { value: 'prefetch', description: '指示浏览器在空闲时预取资源' },
      { value: 'dns-prefetch', description: '提前进行DNS解析' },
      { value: 'preconnect', description: '提前建立连接（DNS+TCP+TLS）' },
      { value: 'modulepreload', description: '预加载ES模块' },
      { value: 'alternate', description: '链接到文档的替代版本' }
    ],
    example: '<link rel="stylesheet" href="styles.css">'
  },
  {
    name: 'href',
    required: true,
    description: '指定链接资源的URL路径',
    values: null,
    example: '<link href="https://example.com/styles.css">'
  },
  {
    name: 'as',
    required: false,
    description: '配合preload使用，指定资源类型',
    values: [
      { value: 'script', description: 'JavaScript文件' },
      { value: 'style', description: 'CSS样式表' },
      { value: 'font', description: '字体文件' },
      { value: 'image', description: '图像文件' },
      { value: 'fetch', description: '通过fetch或XHR请求的资源' }
    ],
    example: '<link rel="preload" href="font.woff2" as="font">'
  },
  {
    name: 'type',
    required: false,
    description: '指定链接资源的MIME类型',
    values: [
      { value: 'text/css', description: 'CSS样式表' },
      { value: 'text/javascript', description: 'JavaScript文件' },
      { value: 'image/x-icon', description: 'ICO格式图标' },
      { value: 'image/png', description: 'PNG图像' },
      { value: 'font/woff2', description: 'WOFF2字体' }
    ],
    example: '<link rel="stylesheet" href="styles.css" type="text/css">'
  },
  {
    name: 'media',
    required: false,
    description: '指定资源应用的媒体/设备条件',
    values: [
      { value: 'screen', description: '计算机屏幕' },
      { value: 'print', description: '打印预览模式' },
      { value: '(max-width: 600px)', description: '视口宽度小于600px' },
      { value: '(orientation: portrait)', description: '竖屏模式' }
    ],
    example: '<link rel="stylesheet" href="print.css" media="print">'
  },
  {
    name: 'crossorigin',
    required: false,
    description: '处理跨域请求的CORS设置',
    values: [
      { value: 'anonymous', description: '跨域请求不带凭据' },
      { value: 'use-credentials', description: '跨域请求带凭据' }
    ],
    example: '<link rel="preconnect" href="https://cdn.example.com" crossorigin>'
  }
]);

// 使用场景
const scenarios = ref([
  {
    title: "加载CSS样式表",
    icon: "fas fa-paint-brush",
    description: "最常见的用途，用于链接外部CSS文件，控制网页样式",
    example: '<link rel="stylesheet" href="styles/main.css">'
  },
  {
    title: "网站图标 (Favicon)",
    icon: "fas fa-icons",
    description: "设置显示在浏览器标签页和收藏夹中的网站图标",
    example: '<link rel="icon" href="favicon.ico" type="image/x-icon">'
  },
  {
    title: "资源预加载",
    icon: "fas fa-bolt",
    description: "使用preload提前加载关键资源，加速页面渲染",
    example: '<link rel="preload" href="font.woff2" as="font" crossorigin>'
  },
  {
    title: "DNS预解析",
    icon: "fas fa-globe",
    description: "提前解析第三方资源的域名，减少连接时间",
    example: '<link rel="dns-prefetch" href="https://cdn.example.com">'
  },
  {
    title: "连接预建立",
    icon: "fas fa-handshake",
    description: "提前建立与第三方资源的连接（DNS+TCP+TLS）",
    example: '<link rel="preconnect" href="https://fonts.googleapis.com">'
  },
  {
    title: "替代资源",
    icon: "fas fa-exchange-alt",
    description: "提供文档的替代版本（如打印样式表、RSS源等）",
    example: '<link rel="alternate" type="application/rss+xml" href="feed.xml">'
  }
]);

// 优缺点
const pros = ref([
  "解耦HTML与外部资源，提高代码可维护性",
  "支持并行加载，提高页面加载性能",
  "通过preload/prefetch优化关键资源加载",
  "支持媒体查询，实现响应式资源加载",
  "浏览器缓存机制可减少重复下载"
]);

const cons = ref([
  "CSS加载会阻塞页面渲染（可通过媒体类型优化）",
  "过多链接资源会增加HTTP请求数量",
  "预加载不当可能浪费带宽",
  "浏览器兼容性问题（如preload在旧浏览器不支持）",
  "配置不当可能导致资源加载顺序问题"
]);

// 最佳实践
const practices = ref([
  {
    title: "关键CSS内联",
    description: "首屏关键CSS内联在HTML中，其余CSS通过link加载"
  },
  {
    title: "合理使用preload",
    description: "仅对关键资源使用preload（如首屏字体、关键CSS）"
  },
  {
    title: "添加crossorigin属性",
    description: "对字体等跨域资源添加crossorigin属性"
  },
  {
    title: "使用媒体查询",
    description: "对非关键CSS使用media属性避免渲染阻塞"
  },
  {
    title: "预连接关键域名",
    description: "对关键第三方资源使用preconnect"
  },
  {
    title: "资源压缩与缓存",
    description: "启用gzip/brotli压缩，设置合理缓存策略"
  }
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --primary: #4361ee;
  --primary-light: #eef2ff;
  --secondary: #3a0ca3;
  --success: #2ec4b6;
  --warning: #ff9f1c;
  --danger: #e71d36;
  --dark: #1e1e2c;
  --light: #f8f9fa;
  --gray: #6c757d;
  --border: #dee2e6;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.link-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%);
  color: var(--dark);
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 20px;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  border-radius: 16px;
  box-shadow: var(--shadow);
  color: white;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;

    .highlight {
      color: #ffd166;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.2);
      padding: 0 10px;
      border-radius: 8px;
    }
  }

  .subtitle {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.85);
    max-width: 700px;
    margin: 0 auto;
    font-weight: 500;
  }
}

.content {
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 40px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8rem;
  margin: 40px 0 30px;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary-light);

  i {
    color: var(--primary);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-light);
    border-radius: 50%;
  }
}

.intro-section {
  display: flex;
  align-items: center;
  gap: 30px;
  background: var(--primary-light);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;

  .icon-box {
    width: 100px;
    height: 100px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    flex-shrink: 0;
  }

  .intro-content {
    h2 {
      font-size: 2rem;
      margin-bottom: 15px;
      color: var(--secondary);
    }

    p {
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }
}

.syntax-section {
  background: #2d3748;
  border-radius: 12px;
  padding: 30px;
  margin: 40px 0;

  .code-block {
    background: #1a202c;
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;
    color: #e2e8f0;
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    line-height: 1.8;

    .attr-value {
      color: #63b3ed;
    }
  }
}

.attributes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.attribute-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 25px;
  border-top: 4px solid var(--primary);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
  }

  .attr-title {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 10px;

    .attr-required {
      font-size: 0.8rem;
      background: var(--danger);
      color: white;
      padding: 3px 8px;
      border-radius: 20px;
      font-weight: 500;
    }
  }

  .attr-description {
    margin-bottom: 20px;
    color: var(--dark);
  }

  .attr-values {
    background: #f8fafc;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;

    h4 {
      margin-bottom: 10px;
      color: var(--secondary);
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        line-height: 1.6;

        code {
          background: #e2e8f0;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          color: var(--primary);
        }
      }
    }
  }

  .attr-example {
    pre {
      background: #1a202c;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      overflow-x: auto;
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.scenario-card {
  display: flex;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
  }

  .scenario-icon {
    width: 80px;
    background: var(--primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    flex-shrink: 0;
  }

  .scenario-content {
    padding: 20px;
    flex: 1;

    h3 {
      margin-bottom: 10px;
      color: var(--secondary);
    }

    p {
      margin-bottom: 15px;
      color: var(--gray);
    }

    .scenario-example {
      pre {
        background: #f1f5f9;
        padding: 12px;
        border-radius: 6px;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        overflow-x: auto;
      }
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros, .cons {
    border-radius: 12px;
    padding: 30px;
  }

  .pros {
    background: rgba(46, 196, 182, 0.1);
    border: 1px solid rgba(46, 196, 182, 0.3);

    h3 {
      color: var(--success);
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  }

  .cons {
    background: rgba(231, 29, 54, 0.05);
    border: 1px solid rgba(231, 29, 54, 0.2);

    h3 {
      color: var(--danger);
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  }

  ul {
    list-style-type: none;

    li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: flex-start;

      &:last-child {
        border-bottom: none;
      }

      &::before {
        content: '•';
        color: var(--primary);
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.practice-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
  }

  .practice-number {
    position: absolute;
    top: -15px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  h3 {
    margin-top: 15px;
    margin-bottom: 15px;
    color: var(--secondary);
  }

  p {
    color: var(--gray);
    line-height: 1.7;
  }
}

.loading-timeline {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary);
    z-index: 0;
  }
}

.timeline-step {
  flex: 0 0 20%;
  text-align: center;
  position: relative;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    flex: 0 0 50%;
    margin-bottom: 30px;
  }

  .step-number {
    width: 80px;
    height: 80px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 auto 20px;
    position: relative;
    z-index: 1;
  }

  .step-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: var(--shadow);

    h3 {
      color: var(--primary);
      margin-bottom: 10px;
    }

    p {
      color: var(--gray);
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: var(--gray);
  font-size: 1.1rem;
  font-style: italic;
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .content {
    padding: 20px;
  }

  .intro-section {
    flex-direction: column;
    text-align: center;

    .icon-box {
      margin-bottom: 20px;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
