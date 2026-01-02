<template>
  <div class="semantic-container">
    <h1 class="main-title">HTML5 语义化标签</h1>
    <h3>
      <p>HTML5 语义化标签是指那些具有明确意义的标签，它们不仅仅是为了结构化文档，更是为了增强内容的可读性和可访问性。这些标签帮助搜索引擎和辅助技术更好地理解网页内容，从而提升用户体验和SEO效果。</p>
      <p>使用语义化标签可以使代码更清晰，便于维护，同时也有助于提高网页的可访问性，使得不同的用户群体（如使用屏幕阅读器的用户）能够更好地理解页面结构和内容。</p>
    </h3>

    <!-- 语义化标签可视化展示 -->
    <section class="semantic-visualization">
      <h2>HTML5语义化标签布局示例</h2>
      <div class="layout-container">
        <header class="demo-header">
          <h1>header</h1>
          <nav class="demo-nav">
            <ul>
              <li><a href="#">nav</a></li>
              <li><a href="#">首页</a></li>
              <li><a href="#">关于</a></li>
              <li><a href="#">服务</a></li>
              <li><a href="#">联系</a></li>
            </ul>
          </nav>
        </header>

        <main class="demo-main">
          <article class="demo-article">
            <h2>article</h2>
            <section class="demo-section">
              <h3>section 第一节</h3>
              <p>这是第一节的内容...</p>
            </section>
            <section class="demo-section">
              <h3>section 第二节</h3>
              <p>这是第二节的内容...</p>
            </section>
          </article>

          <aside class="demo-aside">
            <h3>aside</h3>
            <ul>
              <li>相关链接1</li>
              <li>相关链接2</li>
            </ul>
          </aside>
        </main>

        <footer class="demo-footer">
          <p>&copy;footer 2024 示例网站. 保留所有权利.</p>
          <time datetime="2025-03-08">time 2025年3月8日</time>
        </footer>
      </div>
    </section>

    <div class="grid-container">
      <div v-for="(tag, index) in semanticTags" :key="index" class="tag-card" :class="{ active: activeIndex === index }"
        @mouseenter="activeIndex = index" @mouseleave="activeIndex = -1">
        <div class="tag-header">
          <span class="tag-name">&lt;{{ tag.name }}&gt;</span>
          <span class="tag-version">HTML5</span>
        </div>

        <div class="tag-body">
          <div class="description">
            <h3>📌 主要作用</h3>
            <p>{{ tag.description }}</p>
          </div>

          <div class="usage">
            <h3>💻 典型用法</h3>
            <pre class="code-example">{{ tag.example }}</pre>
          </div>

          <div class="best-practice">
            <h3>🎯 最佳实践</h3>
            <ul>
              <li v-for="(tip, tIndex) in tag.tips" :key="tIndex">{{ tip }}</li>
            </ul>
          </div>
        </div>

        <div class="tag-footer">
          <span class="accessibility" v-if="tag.accessibility">♿ 提升可访问性</span>
          <span class="seo" v-if="tag.seo">🔍 SEO友好</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref(-1)

const semanticTags = [
  {
    name: 'header',
    description: '定义文档或区块的头部区域',
    example: `<header>
  <h1>网站标题</h1>
  <nav>...</nav>
</header>`,
    tips: ['通常包含logo和主导航', '不要与head元素混淆', '可在同一页面多次使用'],
    accessibility: true,
    seo: true,
  },
  {
    name: 'nav',
    description: '定义导航链接集合',
    example: `<nav>
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>`,
    tips: ['用于主要导航链接', '侧边栏导航也应使用', '不需要包裹所有链接'],
    seo: true,
  },
  {
    name: 'article',
    description: '表示独立的自包含内容',
    example: `<article>
  <h2>文章标题</h2>
  <p>文章内容...</p>
</article>`,
    tips: ['适用于博客文章/新闻内容', '可以嵌套使用', '应有独立标题'],
    accessibility: true,
    seo: true,
  },
  {
    name: 'section',
    description: '定义文档中的主题性内容分组',
    example: `<section>
  <h2>章节标题</h2>
  <p>章节内容...</p>
</section>`,
    tips: ['应有明确的标题', '不要用作样式容器', '与div语义区分'],
  },
  {
    name: 'aside',
    description: '定义与主内容相关的附属信息',
    example: `<aside>
  <h3>相关链接</h3>
  <ul>...</ul>
</aside>`,
    tips: ['适合侧边栏内容', '可包含广告/引用', '保持内容相关性'],
  },
  {
    name: 'footer',
    description: '定义文档或区块的页脚',
    example: `<footer>
  <p> 公司名称</p>
  <address>联系方式</address>
</footer>`,
    tips: ['通常包含版权信息', '可包含相关链接', '可在多个区块使用'],
  },
  {
    name: 'figure',
    description: '包裹独立内容（如图像/图表）',
    example: `<figure>
  <img src="chart.jpg" alt="数据图表">
  <figcaption>图1: 年度销售数据</figcaption>
</figure>`,
    tips: ['必须与figcaption配合', '适合图像/代码/表格', '增强内容可移植性'],
    accessibility: true,
  },
  {
    name: 'time',
    description: '定义机器可读的时间/日期',
    example: `<time datetime="2023-08-20">2023年8月20日</time>`,
    tips: ['datetime属性必须符合ISO格式', '适合活动时间/发布日期', '提升搜索引擎理解'],
    seo: true,
  },
]
</script>

<style scoped>
pre,
p {
  color: rgb(0, 0, 0);
}

.semantic-container {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.main-title {
  text-align: center;
  color: #2c3e50;
  font-size: 2.4rem;
  margin-bottom: 3rem;
  letter-spacing: -0.5px;
}

.grid-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.tag-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.tag-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.tag-card.active {
  border: 2px solid #3498db;
}

.tag-header {
  background: #3498db;
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-name {
  color: white;
  font-family: 'Fira Code', monospace;
  font-size: 1.4rem;
  font-weight: 500;
}

.tag-version {
  background: rgba(255, 255, 255, 0.15);
  color: #e0f7ff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.tag-body {
  padding: 1.5rem;
}

h3 {
  color: #2c3e50;
  margin: 1.5rem 0 1rem;
  font-size: 1.1rem;
  position: relative;
  padding-left: 1.2rem;
}

h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 60%;
  background: #3498db;
  border-radius: 2px;
}

.code-example {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
}

ul {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

li {
  margin: 0.8rem 0;
  line-height: 1.6;
  color: #4a5568;
  position: relative;
}

li::before {
  content: '•';
  color: #3498db;
  margin-right: 0.5rem;
}

.tag-footer {
  padding: 1rem;
  background: #f8fafb;
  border-top: 1px solid #eee;
  display: flex;
  gap: 1rem;
}

.accessibility {
  color: #27ae60;
  font-weight: 500;
}

.seo {
  color: #e67e22;
  font-weight: 500;
}

.semantic-visualization {
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.semantic-visualization h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.layout-container {
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.demo-header {
  background: #4a90e2;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
}

.demo-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.demo-nav {
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
}

.demo-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.demo-nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.demo-main {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 2rem;
  padding: 2rem;
}

.demo-article {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
}

.demo-section {
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.demo-aside {
  background: #f1f3f5;
  padding: 1.5rem;
  border-radius: 6px;
}

.demo-aside ul {
  list-style: none;
  padding: 0;
}

.demo-aside li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.demo-footer {
  background: #343a40;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;

  p {
    color: #fff;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-main {
    grid-template-columns: 1fr;
  }

  .demo-nav ul {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
