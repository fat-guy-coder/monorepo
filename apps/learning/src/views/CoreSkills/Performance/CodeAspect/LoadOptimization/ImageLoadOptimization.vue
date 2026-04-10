<template>
  <div class="image-optimization-guide">
    <h2 class="guide-title">🖼️ 图片加载性能优化方案</h2>

    <section class="optimization-method">
      <h3 class="method-title">🔮 预加载 (Preload)</h3>
      <div class="method-content">
        <div class="method-desc">
          <p>提前加载关键图片资源，减少用户交互时的等待时间。</p>
          <ul class="usage-scenarios">
            <li>首屏重要图片</li>
            <li>轮播图下一张图片</li>
            <li>鼠标悬停时触发的图片</li>
          </ul>
        </div>
        <pre class="code-block"><code>// 方式1：使用link标签预加载
&lt;link rel="preload" href="hero-image.webp" as="image" /&gt;

// 方式2：JS动态预加载
const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}

// 使用示例
onMounted(() => {
  preloadImages(['banner.jpg', 'product-1.webp'])
})</code></pre>
      </div>
    </section>

    <section class="optimization-method">
      <h3 class="method-title">😴 懒加载 (Lazy Load)</h3>
      <div class="method-content">
        <div class="method-desc">
          <p>延迟加载非关键图片，当图片进入视口时再加载。</p>
          <ul class="usage-scenarios">
            <li>长页面中的非首屏图片</li>
            <li>图片较多的相册页面</li>
            <li>电商商品列表页</li>
          </ul>
        </div>
        <pre class="code-block"><code>// 方式1：使用原生loading属性
&lt;img
  src="placeholder.jpg"
  data-src="real-image.webp"
  loading="lazy"
  @load="handleLazyLoad"
/&gt;

// 方式2：IntersectionObserver API
const setupLazyLoad = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src || ''
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('[data-src]').forEach(img => {
    observer.observe(img)
  })
}</code></pre>
      </div>
    </section>

    <section class="optimization-method">
      <h3 class="method-title">🔄 滚动加载 (Infinite Scroll)</h3>
      <div class="method-content">
        <div class="method-desc">
          <p>动态加载图片数据，随着用户滚动逐步请求和渲染图片。</p>
          <ul class="usage-scenarios">
            <li>无限滚动的社交媒体</li>
            <li>分页加载的图片库</li>
            <li>瀑布流布局</li>
          </ul>
        </div>
        <pre class="code-block"><code>// 结合IntersectionObserver实现
const loadMoreImages = () => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // 触发加载更多
      fetch('/api/images?page=' + page.value)
        .then(res => res.json())
        .then(data => {
          images.value.push(...data)
          page.value++
        })
    }
  })

  // 观察底部触发元素
  observer.observe(document.querySelector('.load-more-trigger')!)
}

// 组件模板中
&lt;div class="image-grid"&gt;
  &lt;img v-for="img in images" :src="img.url" :key="img.id" /&gt;
&lt;/div&gt;
&lt;div class="load-more-trigger"&gt;&lt;/div&gt;</code></pre>
      </div>
    </section>

    <section class="optimization-method">
      <h3 class="method-title">🖼️ 图片格式选择</h3>
      <div class="method-content">
        <div class="method-desc">
          <p>根据使用场景选择合适的图片格式，平衡质量和性能。</p>
          <div class="format-table">
            <div class="format-row header">
              <div class="format-cell">格式</div>
              <div class="format-cell">适用场景</div>
              <div class="format-cell">特点</div>
            </div>
            <div class="format-row">
              <div class="format-cell">WebP</div>
              <div class="format-cell">通用场景</div>
              <div class="format-cell">高压缩率，支持透明</div>
            </div>
            <div class="format-row">
              <div class="format-cell">AVIF</div>
              <div class="format-cell">高质量需求</div>
              <div class="format-cell">最新格式，极致压缩</div>
            </div>
            <div class="format-row">
              <div class="format-cell">JPEG</div>
              <div class="format-cell">照片类</div>
              <div class="format-cell">有损压缩，兼容性好</div>
            </div>
            <div class="format-row">
              <div class="format-cell">SVG</div>
              <div class="format-cell">图标/矢量图</div>
              <div class="format-cell">无损缩放，体积小</div>
            </div>
          </div>
        </div>
        <pre class="code-block"><code>// 图片格式自适应组件
&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif"&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="Fallback"&gt;
&lt;/picture&gt;

// 动态质量调整（适用于CDN）
const getOptimizedImageUrl = (url: string, width: number, quality = 80) => {
  return `${url}?w=${width}&q=${quality}&fm=webp`
}</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 图片懒加载类型定义
interface LazyImageProps {
  src: string
  placeholder?: string
  threshold?: number
}

// 图片格式类型
type ImageFormat = 'webp' | 'avif' | 'jpeg' | 'png' | 'svg'
</script>

<style lang="less" scoped>
.image-optimization-guide {
  max-width: 950px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.guide-title {
  text-align: center;
  color: #4a5568;
  margin-bottom: 2.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #6b46c1, #805ad5);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
}

.optimization-method {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #9f7aea;

  &:last-child {
    margin-bottom: 0;
  }
}

.method-title {
  color: #6b46c1;
  margin-top: 0;
  margin-bottom: 1.2rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.method-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.method-desc {
  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.usage-scenarios {
  padding-left: 1.2rem;

  li {
    margin-bottom: 0.6rem;
    color: #4a5568;
    position: relative;

    &::before {
      content: '•';
      color: #9f7aea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
}

.code-block {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  border: 1px solid #e2e8f0;

  code {
    color: #4a5568;
    white-space: pre;
  }
}

.format-table {
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  margin: 1rem 0;
}

.format-row {
  display: contents;

  &.header {
    font-weight: 600;
    background: #f0f4f8;
  }
}

.format-cell {
  padding: 0.8rem 1rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;

  &:nth-child(1) {
    font-weight: 500;
    color: #6b46c1;
  }
}
</style>