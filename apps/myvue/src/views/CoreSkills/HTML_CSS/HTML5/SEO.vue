<template>
  <div class="seo-guide-container">
    <header class="guide-header">
      <h1>SEO优化指南</h1>
      <p>提升网站在搜索引擎中的可见性</p>
    </header>

    <main class="guide-content">
      <!-- Title 部分 -->
      <section class="seo-section">
        <div class="section-header">
          <h2>1. 页面标题（Title）</h2>
          <span class="best-practice">最佳实践</span>
        </div>
        <div class="content-card">
          <div class="example-preview">
            <div class="search-engine-preview">
              <div class="fake-browser-bar"></div>
              <div class="title-preview">{{ titleExample }}</div>
              <div class="url-preview">https://example.com/seo-guide</div>
            </div>
            <div class="code-example">
              <code>&lt;title&gt;{{ titleExample }}&lt;/title&gt;</code>
            </div>
          </div>
          <div class="input-group">
            <input v-model="customTitle" placeholder="输入自定义标题" />
            <button @click="updateTitle">更新标题</button>
          </div>
          <ul class="tip-list">
            <li>✅ 保持标题长度在50-60个字符之间</li>
            <li>✅ 包含主要关键词</li>
            <li>❌ 避免堆砌关键词</li>
            <li>❌ 不要使用默认标题</li>
          </ul>
        </div>
      </section>

      <!-- Meta 描述部分 -->
      <section class="seo-section">
        <div class="section-header">
          <h2>2. Meta描述</h2>
          <span class="best-practice">最佳实践</span>
        </div>
        <div class="content-card">
          <div class="search-engine-preview">
            <div class="description-preview">
              {{ metaDescription }}
            </div>
          </div>
          <div class="code-example">
            <pre>&lt;meta name="description" content="{{ metaDescription }}"&gt;</pre>
          </div>
          <ul class="tip-list">
            <li>✅ 保持描述在150-160个字符之间</li>
            <li>✅ 包含主要关键词</li>
            <li>❌ 避免重复内容</li>
            <li>❌ 不要使用默认描述</li>
          </ul>
        </div>
      </section>

      <!-- 语义化标签部分 -->
      <section class="seo-section">
        <div class="section-header">
          <h2>3. 语义化HTML标签</h2>
          <span class="best-practice">技术规范</span>
        </div>
        <div class="content-card">
          <div class="semantic-example">
            <div class="code-comparison">
              <div class="good-example">
                <h3>✅ 正确示例</h3>
                <pre><code>{{ goodSemanticHTML }}</code></pre>
              </div>
              <div class="bad-example">
                <h3>❌ 错误示例</h3>
                <pre><code>{{ badSemanticHTML }}</code></pre>
              </div>
            </div>
          </div>

          <div class="semantic-benefits">
            <h3>推荐使用的语义标签：</h3>
            <div class="tag-grid">
              <div v-for="tag in semanticTags" :key="tag" class="tag-item">&lt;{{ tag }}&gt;</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <aside class="additional-tips">
      <h3>📌 其他SEO建议：</h3>
      <ul>
        <li>使用规范的URL结构</li>
        <li>优化图片alt属性</li>
        <li>实现移动端友好设计</li>
        <li>建立合理的内部链接</li>
        <li>使用结构化数据标记</li>
      </ul>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SEOGuide',
  setup() {
    const titleExample = ref('SEO优化指南 - 网站标题最佳实践 | 技术文档')
    const customTitle = ref('')
    const metaDescription = ref(
      '了解如何通过优化标题标签、元描述和语义化HTML标签来提升网站在搜索引擎中的排名。本指南包含实用示例和最佳实践建议。',
    )

    const semanticTags = ref([
      'header',
      'nav',
      'main',
      'article',
      'section',
      'aside',
      'footer',
      'time',
      'figure',
      'figcaption',
      'mark',
      'address',
    ])

    const goodSemanticHTML = `
<article>
  <header>
    <h1>文章标题</h1>
    <time datetime="2023-03-15">2023年3月15日</time>
  </header>
  <section>
    <p>文章正文内容...</p>
    <figure>
      <img src="image.jpg" alt="描述性文本">
      <figcaption>图片说明文字</figcaption>
    </figure>
  </section>
</article>
    `.trim()

    const badSemanticHTML = `
<div id="header">
  <div class="title">文章标题</div>
</div>
<div class="content">
  <div class="text">文章正文内容...</div>
  <div class="image-box">
    <img src="image.jpg">
    <div class="caption">图片说明文字</div>
  </div>
</div>
    `.trim()

    const updateTitle = () => {
      if (customTitle.value) {
        titleExample.value = `${customTitle.value} | 技术文档`
      }
    }

    return {
      titleExample,
      customTitle,
      metaDescription,
      semanticTags,
      goodSemanticHTML,
      badSemanticHTML,
      updateTitle,
    }
  },
})
</script>

<style scoped>
.seo-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #2c3e50, #42b983);
  color: white;
  border-radius: 12px;
}

.guide-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.seo-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.best-practice {
  background: #42b983;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9em;
}

.content-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.search-engine-preview {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background: #f8f9fa;
}

.fake-browser-bar {
  height: 12px;
  background: #e0e0e0;
  border-radius: 8px 8px 0 0;
}

.title-preview {
  color: #1a0dab;
  font-size: 1.1em;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.url-preview {
  color: #006621;
  font-size: 0.9em;
  padding: 0.5rem 1rem;
}

.description-preview {
  color: #545454;
  line-height: 1.4;
  padding: 1rem;
}

.input-group {
  margin: 1.5rem 0;
  display: flex;
  gap: 1rem;
}

input,
textarea {
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #33a06f;
}

.code-example {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Courier New', monospace;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.good-example {
  border: 2px solid #42b983;
  border-radius: 8px;
  padding: 1rem;
}

.bad-example {
  border: 2px solid #e74c3c;
  border-radius: 8px;
  padding: 1rem;
}

.tag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.tag-item {
  background: #f8f9fa;
  padding: 0.5rem;
  text-align: center;
  border-radius: 6px;
  font-family: monospace;
}

.additional-tips {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 3rem;
}

.char-counter {
  text-align: right;
  color: #666;
  font-size: 0.9em;
}

.tip-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.tip-list li {
  padding: 0.8rem;
  border-radius: 6px;
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }

  .tip-list {
    grid-template-columns: 1fr;
  }

  .input-group {
    flex-direction: column;
  }
}
</style>
