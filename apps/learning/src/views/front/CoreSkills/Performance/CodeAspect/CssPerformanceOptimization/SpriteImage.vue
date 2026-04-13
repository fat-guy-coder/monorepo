<template>
  <div class="sprite-container">
    <div class="sprite-hero">
      <div class="hero-content">
        <h1>前端性能优化：雪碧图技术</h1>
        <p class="subtitle">减少HTTP请求，提升页面加载速度</p>

        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-value">5×</div>
            <div class="stat-label">请求减少倍数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">70%</div>
            <div class="stat-label">加载时间节省</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">30KB+</div>
            <div class="stat-label">文件体积优化</div>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="sprite-demo">
          <div class="sprite-image"></div>
          <div class="sprite-icons">
            <div class="sprite-icon" v-for="(icon, index) in icons" :key="index"
              :style="{ backgroundPosition: icon.position }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">雪碧图原理与优点</h2>

      <div class="principle-cards">
        <div class="card">
          <div class="card-icon">🌐</div>
          <h3>HTTP请求合并</h3>
          <p>将多个小图片合并为一个大图，减少浏览器HTTP请求数量</p>
        </div>

        <div class="card">
          <div class="card-icon">⚡</div>
          <h3>加载速度提升</h3>
          <p>单个大文件加载比多个小文件更快(TCP连接建立时间减少)</p>
        </div>

        <div class="card">
          <div class="card-icon">📦</div>
          <h3>资源体积优化</h3>
          <p>合并后的图片文件体积通常小于所有小图片体积之和</p>
        </div>

        <div class="card">
          <div class="card-icon">🖼️</div>
          <h3>预加载优势</h3>
          <p>一次加载即可缓存所有图标，提高后续页面访问速度</p>
        </div>
      </div>

      <div class="comparison">
        <div class="comparison-method">
          <h3>传统方式：多个图标分开加载</h3>
          <div class="icon-group">
            <div class="separate-icon" v-for="i in 8" :key="i"></div>
          </div>
          <div class="network-requests">
            <div class="request" v-for="i in 8" :key="i"></div>
          </div>
        </div>

        <div class="comparison-method">
          <h3>雪碧图：单个文件加载所有图标</h3>
          <div class="sprite-group">
            <div class="sprite-icon-large"></div>
          </div>
          <div class="network-requests">
            <div class="request"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">雪碧图实现步骤</h2>

      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>准备图标资源</h3>
            <p>收集所有需要合并的小图标，统一尺寸和样式风格</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>生成雪碧图</h3>
            <p>使用工具自动生成雪碧图文件及对应的CSS样式</p>
            <div class="tools">
              <div class="tool">SpriteSmith</div>
              <div class="tool">gulp.spritesmith</div>
              <div class="tool">在线生成器</div>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>编写CSS样式</h3>
            <p>通过background-position定位显示需要的图标</p>
            <div class="code">
              <pre><code>.icon {
  background-image: url(sprite.png);
  background-repeat: no-repeat;
  display: inline-block;
}

.icon-home {
  width: 32px;
  height: 32px;
  background-position: 0 0;
}</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>在HTML中使用</h3>
            <p>添加对应的class即可显示特定图标</p>
            <div class="code">
              <pre><code>&lt;button class="icon icon-home"&gt;&lt;/button&gt;
&lt;div class="icon icon-cart"&gt;&lt;/div&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">雪碧图最佳实践</h2>

      <div class="practice-cards">
        <div class="practice-card">
          <div class="practice-icon">🔍</div>
          <h3>图标分组</h3>
          <p>按功能或页面分组创建多个雪碧图，避免单个文件过大</p>
        </div>

        <div class="practice-card">
          <div class="practice-icon">↔️</div>
          <h3>合理留白</h3>
          <p>图标之间保留足够间距，防止相邻图标被意外显示</p>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🎨</div>
          <h3>样式统一</h3>
          <p>确保所有图标风格一致，尺寸相近</p>
        </div>

        <div class="practice-card">
          <div class="practice-icon">📱</div>
          <h3>响应式适配</h3>
          <p>使用rem或em单位，适配不同分辨率设备</p>
        </div>
      </div>

      <div class="modern-alternatives">
        <h3>现代替代方案</h3>
        <div class="alternatives">
          <div class="alternative">
            <div class="alt-icon">🖼️</div>
            <h4>Icon Fonts</h4>
            <p>矢量字体图标，无限缩放不失真</p>
          </div>
          <div class="alternative">
            <div class="alt-icon">⚡</div>
            <h4>SVG Sprites</h4>
            <p>矢量图标集合，支持多色图标</p>
          </div>
          <div class="alternative">
            <div class="alt-icon">📦</div>
            <h4>HTTP/2</h4>
            <p>多路复用技术减少请求开销</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">雪碧图适用场景</h2>

      <div class="scenario-cards">
        <div class="scenario-card">
          <div class="scenario-icon">📱</div>
          <h3>移动端应用</h3>
          <p>减少移动网络下的请求开销</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">🔢</div>
          <h3>大量小图标</h3>
          <p>导航栏、工具栏等包含多个小图标的场景</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">🖥️</div>
          <h3>传统浏览器支持</h3>
          <p>需要兼容不支持HTTP/2的旧浏览器</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">🚀</div>
          <h3>性能关键路径</h3>
          <p>首屏加载需要大量图标的页面</p>
        </div>
      </div>
    </div>

    <div class="resources">
      <h2>雪碧图生成工具</h2>
      <div class="resource-links">
        <a href="#" class="resource-link">SpriteCow</a>
        <a href="#" class="resource-link">Toptal Sprite Generator</a>
        <a href="#" class="resource-link">CSS Sprites Generator</a>
        <a href="#" class="resource-link">gulp.spritesmith</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 雪碧图中的图标位置
const icons = ref([
  { id: 'home', position: '0 0' },
  { id: 'search', position: '-48px 0' },
  { id: 'cart', position: '-96px 0' },
  { id: 'user', position: '-144px 0' },
  { id: 'settings', position: '0 -48px' },
  { id: 'heart', position: '-48px -48px' },
  { id: 'star', position: '-96px -48px' },
  { id: 'message', position: '-144px -48px' }
]);
</script>

<style scoped lang="less">
@primary: #3498db;
@secondary: #2ecc71;
@accent: #9b59b6;
@dark: #2c3e50;
@light: #ecf0f1;
@text: #34495e;
@light-text: #7f8c8d;
@radius: 12px;
@shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

.sprite-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text;
  line-height: 1.6;
}

.sprite-hero {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  background: linear-gradient(135deg, #1a237e, #5c6bc0);
  border-radius: @radius;
  padding: 40px;
  color: white;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-top: 0;
    margin-bottom: 10px;
    font-weight: 800;
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    margin-bottom: 30px;
  }
}

.hero-content {
  flex: 1;
  min-width: 300px;
}

.hero-visual {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-stats {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: @radius;
  padding: 20px;
  text-align: center;
  min-width: 100px;
  backdrop-filter: blur(5px);
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.25);
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
  }
}

.sprite-demo {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  background: white;
  border-radius: @radius;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.sprite-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f5f5f5" stroke="%23e0e0e0" stroke-width="1"/><path d="M10,10 L190,10 L190,90 L10,90 Z" fill="none" stroke="%23e0e0e0" stroke-dasharray="4,4"/><circle cx="40" cy="30" r="20" fill="%233498db" opacity="0.1"/><circle cx="80" cy="30" r="20" fill="%232ecc71" opacity="0.1"/><circle cx="120" cy="30" r="20" fill="%239b59b6" opacity="0.1"/><circle cx="160" cy="30" r="20" fill="%23f1c40f" opacity="0.1"/><circle cx="40" cy="70" r="20" fill="%23e74c3c" opacity="0.1"/><circle cx="80" cy="70" r="20" fill="%231abc9c" opacity="0.1"/><circle cx="120" cy="70" r="20" fill="%23d35400" opacity="0.1"/><circle cx="160" cy="70" r="20" fill="%2316a085" opacity="0.1"/></svg>');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.sprite-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  place-items: center;
}

.sprite-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><circle cx="40" cy="30" r="20" fill="%233498db"/><circle cx="80" cy="30" r="20" fill="%232ecc71"/><circle cx="120" cy="30" r="20" fill="%239b59b6"/><circle cx="160" cy="30" r="20" fill="%23f1c40f"/><circle cx="40" cy="70" r="20" fill="%23e74c3c"/><circle cx="80" cy="70" r="20" fill="%231abc9c"/><circle cx="120" cy="70" r="20" fill="%23d35400"/><circle cx="160" cy="70" r="20" fill="%2316a085"/></svg>');
  background-repeat: no-repeat;
  background-size: 200px 100px;
  border: 2px solid white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.section {
  background: white;
  border-radius: @radius;
  box-shadow: @shadow;
  padding: 30px;
  margin-bottom: 30px;

  .section-title {
    font-size: 1.8rem;
    color: @primary;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f1f3f4;
  }
}

.principle-cards,
.practice-cards,
.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.card,
.practice-card,
.scenario-card {
  border: 1px solid #e8eaed;
  border-radius: @radius;
  padding: 25px;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: @primary;
  }

  .card-icon,
  .practice-icon,
  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @dark;
  }

  p {
    margin: 0;
    color: @light-text;
  }
}

.comparison {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 40px;
}

.comparison-method {
  flex: 1;
  min-width: 300px;

  h3 {
    color: @dark;
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }
}

.icon-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.separate-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: @primary;
  opacity: 0.7;
}

.sprite-group {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.sprite-icon-large {
  width: 150px;
  height: 80px;
  border-radius: 8px;
  background: repeating-linear-gradient(45deg,
      #f5f5f5,
      #f5f5f5 10px,
      #e0e0e0 10px,
      #e0e0e0 20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      radial-gradient(circle at 25% 30%, #3498db 15%, transparent 15.5%),
      radial-gradient(circle at 50% 30%, #2ecc71 15%, transparent 15.5%),
      radial-gradient(circle at 75% 30%, #9b59b6 15%, transparent 15.5%),
      radial-gradient(circle at 25% 70%, #e74c3c 15%, transparent 15.5%),
      radial-gradient(circle at 50% 70%, #1abc9c 15%, transparent 15.5%),
      radial-gradient(circle at 75% 70%, #d35400 15%, transparent 15.5%);
  }
}

.network-requests {
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.request {
  width: 120px;
  height: 8px;
  background: @primary;
  border-radius: 4px;
  opacity: 0.7;

  &:nth-child(odd) {
    background: @accent;
  }
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.step {
  display: flex;
  gap: 20px;

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: @primary;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .step-content {
    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      color: @dark;
    }

    p {
      margin-bottom: 15px;
      color: @light-text;
    }
  }
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;

  .tool {
    background: #e3f2fd;
    color: @primary;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.code {
  background: #2c3e50;
  color: #ecf0f1;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  code {
    font-family: inherit;
  }
}

.modern-alternatives {
  background: #f9f9f9;
  border-radius: @radius;
  padding: 25px;
  margin-top: 30px;

  h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 25px;
    color: @dark;
    font-size: 1.4rem;
  }
}

.alternatives {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
}

.alternative {
  text-align: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: @radius;
  transition: @transition;

  &:hover {
    border-color: @accent;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .alt-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: @dark;
  }

  p {
    margin: 0;
    color: @light-text;
  }
}

.resources {
  background: linear-gradient(to right, #1a237e, #283593);
  border-radius: @radius;
  padding: 30px;
  text-align: center;
  color: white;

  h2 {
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 1.8rem;
  }
}

.resource-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.resource-link {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: @transition;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }
}

@media (max-width: 768px) {
  .sprite-hero {
    flex-direction: column;
    text-align: center;

    .hero-stats {
      justify-content: center;
    }
  }

  .comparison {
    flex-direction: column;
  }
}
</style>