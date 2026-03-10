<template>
  <div class="seo-container">
    <!-- 页面标题 -->
    <h1 class="main-title">
      <span class="icon">📌</span>
      HTML Meta与Title
    </h1>

    <!-- 主体内容 -->
    <div class="content-wrapper">
      <!-- Title部分 -->
      <section class="card-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🏷️</span>
            Title标签
          </h2>
          <div class="title-preview">当前标题: {{ currentTitle }}</div>
        </div>

        <div class="demo-box">
          <div class="code-sample">
            <pre><code>&lt;title&gt;{{ currentTitle }}&lt;/title&gt;</code></pre>
          </div>
          <div class="control-group">
            <input v-model="customTitle" @input="updateTitle" placeholder="输入新标题" class="title-input">
            <button @click="resetTitle" class="reset-btn">
              重置默认标题
            </button>
          </div>
        </div>

        <div class="description">
          <h3>作用说明：</h3>
          <ul>
            <li>▶️ 定义浏览器工具栏显示的标题</li>
            <li>▶️ 搜索引擎结果中的显示标题</li>
            <li>▶️ 书签保存时的默认名称</li>
            <li>▶️ 单页应用(SAP)中需要动态更新</li>
          </ul>
        </div>
      </section>

      <!-- Meta标签部分 -->
      <section class="card-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🔖</span>
            Meta标签
          </h2>
          <h3>Meta标签是HTML文档中提供元数据的标签,用于描述网页的各种属性和信息,如字符编码、视口设置、页面描述等,对SEO优化和移动端适配有重要作用。</h3>
          <div class="meta-types">常用类型：charset, viewport, description, keywords, OG</div>
        </div>

        <div class="meta-grid">
          <div v-for="(meta, index) in metaTags" :key="index" class="meta-card" :class="meta.type">
            <h3 class="meta-name">
              {{ meta.name }}
              <span class="meta-type-tag">{{ meta.type }}</span>
            </h3>
            <div class="meta-content">
              <code>{{ meta.content }}</code>
            </div>
            <div class="meta-description">
              {{ meta.description }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';

// Title控制逻辑
const defaultTitle = '前端开发指南 | 技术文档';
const customTitle = ref('');
const currentTitle = ref(defaultTitle);

const updateTitle = () => {
  currentTitle.value = customTitle.value || defaultTitle;
  document.title = currentTitle.value;
};

const resetTitle = () => {
  customTitle.value = '';
  updateTitle();
};

// Meta标签数据
interface MetaTag {
  type: string;
  name?: string;
  content: string;
  description: string;
}

const metaTags = ref<MetaTag[]>([
  {
    type: 'charset',
    content: '<meta charset="UTF-8">',
    description: '定义文档字符编码，必须放在最前'
  },
  {
    type: 'viewport',
    content: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    description: '移动端适配关键标签，控制视口尺寸与缩放'
  },
  {
    type: 'description',
    content: '<meta name="description" content="专业前端开发技术文档">',
    description: '搜索引擎结果中的页面描述（约150字符）'
  },
  {
    type: 'keywords',
    content: '<meta name="keywords" content="前端,开发,Vue,TypeScript">',
    description: '搜索引擎关键词（已逐渐弱化）'
  },
  {
    type: 'og',
    content: '<meta property="og:title" content="社交分享标题">',
    description: 'Open Graph协议，社交媒体分享优化'
  },
  {
    type: 'http-equiv',
    content: '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
    description: '兼容性设置，强制使用最新渲染模式'
  }
]);

// 初始化设置
onMounted(() => {
  document.title = defaultTitle;
});
</script>

<style lang="less" scoped>
.seo-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.main-title {
  font-size: 2.25rem;
  color: #111827;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  gap: 1rem;
  padding: 0;
  background: none;
  box-shadow: none;
}

.content-wrapper {
  display: grid;
  gap: 2rem;
}

.card-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.section-header {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #111827;
  font-weight: 600;
  margin: 0;
}

.section-header h3 {
  font-weight: 400;
  font-size: 1rem;
  color: #6b7280;
  margin: 0.5rem 0 0;
}

.title-preview,
.meta-types {
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.demo-box {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid #e5e7eb;
}

.code-sample pre {
  background: #f3f4f6;
  color: #1f2937;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.code-sample pre code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.control-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.title-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.title-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.reset-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: #dc2626;
}

.description {
  margin-top: 1.5rem;
  padding: 0;
  background: none;
}

.description h3 {
  color: #111827;
  margin-bottom: 0.8rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.description ul {
  list-style: none;
  padding-left: 0;
  color: #374151;
}

.description ul li {
  padding: 0.4rem 0;
}

.description ul li::before {
  content: '▶️';
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.meta-card {
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  transition: none;
}

.meta-card:hover {
  transform: none;
}

.meta-card .meta-name {
  font-size: 1.1rem;
  color: #111827;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

.meta-type-tag {
  font-size: 0.8rem;
  background: #e0e7ff;
  color: #4338ca;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.meta-content {
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.meta-content code {
  color: #1f2937;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
}

.meta-description {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
}
</style>
