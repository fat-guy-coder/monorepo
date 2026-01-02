<template>
  <div class="lazyload-container">
    <!-- 标题部分 -->
    <h1 class="main-title">HTML5 Lazy Loading 基本介绍</h1>

    <!-- 核心概念卡片 -->
    <div class="concept-cards">
      <div class="concept-card definition">
        <h2>📖 定义解析</h2>
        <p>
          Lazy Loading（懒加载）是一种延迟加载非关键资源的<span class="highlight">性能优化技术</span>，通过<span
            class="highlight">按需加载</span>的方式提升页面加载速度。
        </p>
        <div class="native-example">
          <code>&lt;img src="image.jpg" loading="lazy" alt="示例"&gt;</code>
        </div>
      </div>

      <div class="concept-card comparison">
        <h2>🆚 技术对比</h2>
        <div class="comparison-grid">
          <div class="comparison-item">
            <h3>原生Lazy Loading</h3>
            <ul>
              <li>✅ 零依赖</li>
              <li>✅ 简单易用</li>
              <li>⚠️ 兼容性要求</li>
            </ul>
          </div>
          <div class="comparison-item">
            <h3>JavaScript实现</h3>
            <ul>
              <li>✅ 高度可控</li>
              <li>✅ 兼容性好</li>
              <li>⚠️ 需要额外代码</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 实时演示区域 -->
    <div class="demo-section">
      <h2>🎮 实时演示</h2>
      <div class="demo-container">
        <div v-for="(img, index) in images" :key="index" class="lazy-image" :class="{ loaded: img.loaded }">
          <img :src="img.url" :alt="`示例图片 ${index + 1}`" loading="lazy" @load="handleImageLoad(index)" />
          <div v-if="!img.loaded" class="loading-indicator">
            <div class="loader"></div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术细节 -->
    <div class="detail-sections">
      <div class="detail-card advantages">
        <h3>✅ 核心优势</h3>
        <ul>
          <li>减少初始页面加载时间（提升30%-50%）</li>
          <li>降低带宽消耗（节省移动端流量）</li>
          <li>提升CLS（Cumulative Layout Shift）分数</li>
          <li>优化SEO表现（页面速度指标）</li>
        </ul>
      </div>

      <div class="detail-card use-cases">
        <h3>🎯 适用场景</h3>
        <ul>
          <li>长页面图片流（社交媒体）</li>
          <li>电商产品列表页</li>
          <li>图片密集型网站（摄影作品集）</li>
          <li>首屏外内容（需要滚动查看）</li>
        </ul>
      </div>

      <div class="detail-card implementation">
        <h3>💻 实现方案</h3>
        <div class="code-tabs">
          <div class="code-tab">
            <h4>原生实现</h4>
            <pre><code>&lt;img
  src="placeholder.jpg"
  data-src="real-image.jpg"
  loading="lazy"
  alt="示例"
&gt;</code></pre>
          </div>
          <div class="code-tab">
            <h4>Vue组件实现</h4>
            <pre><code>// LazyImage.vue
&lt;template&gt;
  &lt;img
    :src="placeholder"
    :data-src="realSrc"
    @load="handleLoad"
    ref="imgRef"
  &gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { onMounted, ref } from 'vue'
const props = defineProps({
  realSrc: String,
  placeholder: { type: String, default: 'data:image/png...' }
})

const imgRef = ref&lt;HTMLImageElement&gt;()
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      imgRef.value!.src = props.realSrc
      observer.disconnect()
    }
  })
})

onMounted(() => observer.observe(imgRef.value!))
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 注意事项 -->
    <div class="notice-section">
      <div class="notice-card warning">
        <h3>⚠️ 注意事项</h3>
        <ul>
          <li>Chrome 77+ / Firefox 75+ 原生支持</li>
          <li>需设置图片尺寸防止布局偏移</li>
          <li>移动端需调整加载阈值</li>
          <li>SEO优化需配合noscript方案</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface LazyImage {
  url: string
  loaded: boolean
}

const images = ref<LazyImage[]>(
  Array.from({ length: 12 }, (_, i) => ({
    url: `https://picsum.photos/300/200?random=${i + 1}`,
    loaded: false,
  })),
)

const handleImageLoad = (index: number) => {
  images.value[index].loaded = true
}
</script>

<style scoped>
h2 {
  color: #fff;
}

h3,
h4,
li,
p,
span {
  color: rgba(0, 0, 0, 1);
}

.lazyload-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', system-ui;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  position: relative;
}

.main-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  margin: 1rem auto;
}

.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.concept-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.native-example {
  background: #2c3e50;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.native-example code {
  color: white;
  font-family: Monaco, monospace;
}

.demo-section {
  margin: 3rem 0;
}

.demo-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.lazy-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
  background: #ecf0f1;
  transition: transform 0.3s ease;
}

.lazy-image:hover {
  transform: translateY(-5px) scale(1.2);
}

.lazy-image img {
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lazy-image.loaded img {
  opacity: 1;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #7f8c8d;
}

.loader {
  width: 30px;
  height: 30px;
  border: 3px solid #3498db;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.detail-sections {
  display: grid;
  gap: 2rem;
}

.detail-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.code-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.code-tab pre {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.notice-section {
  margin-top: 2rem;
}

.notice-card {
  padding: 1.5rem;
  border-radius: 12px;
}

.warning {
  background: #fdecea;
  border-left: 4px solid #e74c3c;
}

.highlight {
  color: #e67e22;
  font-weight: 600;
}

ul {
  list-style: none;
  padding-left: 1.5rem;
}

li {
  position: relative;
  margin-bottom: 0.8rem;
  padding-left: 1.5em;
}

li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3498db;
}
</style>
