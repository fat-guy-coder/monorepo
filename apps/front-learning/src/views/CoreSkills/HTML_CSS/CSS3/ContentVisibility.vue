<template>
  <div class="main-container">
    <h1 class="title">CSS content-visibility解析</h1>


    <section class="intro-section">
      <h2>什么是 content-visibility?</h2>
      <p>
        content-visibility 是一个强大的 CSS 属性，它允许我们控制元素的渲染时机，从而显著提升页面性能。
        通过跳过屏幕外元素的渲染，它可以大幅减少浏览器的渲染工作量。
      </p>

      <div class="key-points">
        <h3>核心优势:</h3>
        <p>
          当设置 <code>content-visibility: auto</code> 时，浏览器会：
        </p>
        <ul>
          <li>自动跳过视口外元素的渲染</li>
          <li>仅在元素进入视口时才进行渲染</li>
          <li>显著提升页面的初始加载速度</li>
          <li>减少内存占用和 CPU 计算负担</li>
        </ul>
      </div>

      <div class="browser-support">
        <h3>浏览器支持:</h3>
        <p>
          目前主流的 Chrome、Edge 和 Opera 浏览器都已支持此特性。
          在不支持的浏览器中会优雅降级，不会影响页面的正常显示。
        </p>
      </div>
    </section>

    <section class="property-values">
      <h2>content-visibility 属性值基础介绍</h2>

      <div class="value-card">
        <h3>auto</h3>
        <div class="description">
          <p>最常用的属性值,元素在视口外时跳过其内容的渲染,进入视口时才渲染。</p>
          <h4>适用场景:</h4>
          <ul>
            <li>长列表</li>
            <li>图片画廊</li>
            <li>新闻文章列表</li>
            <li>社交媒体信息流</li>
          </ul>
        </div>
      </div>

      <div class="value-card">
        <h3>hidden</h3>
        <div class="description">
          <p>元素及其内容完全不渲染,类似 display: none,但保持元素在文档流中的位置。</p>
          <h4>适用场景:</h4>
          <ul>
            <li>模态框/弹窗</li>
            <li>折叠面板</li>
            <li>标签页内容</li>
            <li>临时隐藏的复杂UI组件</li>
          </ul>
        </div>
      </div>

      <div class="value-card">
        <h3>visible</h3>
        <div class="description">
          <p>默认值,元素正常渲染,不应用任何内容可见性优化。</p>
          <h4>适用场景:</h4>
          <ul>
            <li>页面首屏内容</li>
            <li>关键导航元素</li>
            <li>用户立即需要看到的内容</li>
            <li>需要SEO的重要内容</li>
          </ul>
        </div>
      </div>

      <div class="tips">
        <h3>💡 使用建议</h3>
        <ul>
          <li>对于大型列表或复杂内容,优先使用 auto</li>
          <li>需要频繁切换显示状态时,考虑使用 hidden</li>
          <li>首屏关键内容保持 visible 确保及时渲染</li>
          <li>搭配 contain-intrinsic-size 使用以避免布局抖动</li>
        </ul>
      </div>
    </section>

    <div class="info-card-group">
      <div class="info-card feature">
        <h2>特性说明 💡</h2>
        <ul>
          <li>渲染优化：跳过可视区域外元素的渲染计算</li>
          <li>布局保留：保持滚动条位置准确性</li>
          <li>按需渲染：仅在需要时触发完整渲染</li>
          <li>contain-intrinsic-size 支持：预设尺寸保持布局稳定</li>
        </ul>
      </div>

      <div class="info-card usage">
        <h2>使用指南 🛠️</h2>
        <pre><code>/* 基本用法 */
.container {
  content-visibility: auto;
  contain-intrinsic-size: 300px 1000px;
}

/* 精确控制 */
.lazy-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}</code></pre>
      </div>

      <div class="info-card scenario">
        <h2>适用场景 🌟</h2>
        <ul>
          <li>长列表/表格展示</li>
          <li>折叠内容区域</li>
          <li>分页/标签页内容</li>
          <li>无限滚动页面</li>
          <li>复杂仪表盘</li>
        </ul>
      </div>

      <div class="info-card notice">
        <h2>注意事项 ⚠️</h2>
        <ul>
          <li>避免在关键内容区域过度使用</li>
          <li>注意屏幕阅读器的可访问性</li>
          <li>需要配合 contain-intrinsic-size 保持布局稳定</li>
          <li>可能影响初始加载的渲染性能</li>
          <li>谨慎处理动态尺寸内容</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ContentBlock {
  color: string
  height: number
}

const isEnabled = ref(false)


function toggleContentVisibility() {
  isEnabled.value = !isEnabled.value
}


</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background-color: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

.title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-bottom: 1rem;
}

.title:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #42b983, #3498db);
  border-radius: 2px;
}

.intro-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.intro-section h2 {
  color: #2c3e50;
  margin-top: 0;
  font-size: 1.8em;
  margin-bottom: 1.5rem;
  border-left: 4px solid #42b983;
  padding-left: 1rem;
}

.intro-section p {
  line-height: 1.7;
  color: #444;
  font-size: 1.1em;
}

.key-points,
.browser-support {
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.key-points h3,
.browser-support h3 {
  color: #2c3e50;
  margin-top: 0;
  font-size: 1.3em;
  margin-bottom: 1rem;
}

.key-points ul {
  padding-left: 1.5rem;
  line-height: 1.6;
}

.key-points li {
  margin-bottom: 0.5rem;
  position: relative;
}

.key-points li:before {
  content: "✓";
  color: #42b983;
  font-weight: bold;
  display: inline-block;
  margin-right: 0.5rem;
}

code {
  background: #f0f0f0;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #e74c3c;
}

.property-values {
  margin-bottom: 2rem;
}

.property-values h2 {
  color: #2c3e50;
  font-size: 1.8em;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.8rem;
}

.property-values h2:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #42b983;
  border-radius: 2px;
}

.value-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.value-card h3 {
  background: #42b983;
  color: white;
  margin: 0;
  padding: 1rem;
  font-size: 1.4em;
}

.value-card:nth-child(2) h3 {
  background: #3498db;
}

.value-card:nth-child(3) h3 {
  background: #9b59b6;
}

.description {
  padding: 1.5rem;
}

.description p {
  margin-top: 0;
  line-height: 1.6;
  color: #444;
}

.description h4 {
  color: #2c3e50;
  margin: 1rem 0 0.5rem;
}

.description ul {
  padding-left: 1.2rem;
  margin-bottom: 0;
}

.description li {
  margin-bottom: 0.5rem;
}

.tips {
  background: #fffbeb;
  border-left: 4px solid #f1c40f;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.tips h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1rem;
}

.tips ul {
  padding-left: 1.2rem;
  line-height: 1.6;
}

.tips li {
  margin-bottom: 0.8rem;
}

.info-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.info-card {
  padding: 1.8rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-card h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.4em;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
}

.info-card ul {
  padding-left: 1.2rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 0;
}

.info-card li {
  margin-bottom: 0.8rem;
}

.info-card pre {
  background: #f8f8f8;
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  border-left: 3px solid #3498db;
}

.feature {
  border-left: 4px solid #42b983;
}

.feature:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background: rgba(66, 185, 131, 0.1);
  border-radius: 0 0 0 80px;
}

.usage {
  border-left: 4px solid #3498db;
}

.usage:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 0 0 0 80px;
}

.scenario {
  border-left: 4px solid #9b59b6;
}

.scenario:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background: rgba(155, 89, 182, 0.1);
  border-radius: 0 0 0 80px;
}

.notice {
  border-left: 4px solid #e74c3c;
}

.notice:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 0 0 0 80px;
}

@media (max-width: 768px) {
  .main-container {
    padding: 1.5rem;
  }

  .info-card-group {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .title {
    font-size: 2em;
  }

  .property-values h2,
  .intro-section h2 {
    font-size: 1.6em;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding: 1rem;
  }

  .intro-section,
  .info-card,
  .value-card {
    padding: 1.2rem;
  }

  .title {
    font-size: 1.8em;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.intro-section,
.property-values,
.info-card {
  animation: fadeIn 0.6s ease-out forwards;
}

.property-values {
  animation-delay: 0.2s;
}

.info-card-group {
  animation-delay: 0.4s;
}

.info-card:nth-child(1) {
  animation-delay: 0.4s;
}

.info-card:nth-child(2) {
  animation-delay: 0.5s;
}

.info-card:nth-child(3) {
  animation-delay: 0.6s;
}

.info-card:nth-child(4) {
  animation-delay: 0.7s;
}
</style>
