<template>
  <div class="color-guide">
    <h1 class="main-title">🎨 CSS 颜色系统基本指南</h1>

    <!-- 颜色模型概览 -->
    <section class="color-models">
      <div class="model-grid">
        <div v-for="model in colorModels" :key="model.name" class="model-card"
          :style="{ background: model.background }">
          <h3>{{ model.name }}</h3>
          <p>{{ model.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 颜色格式基础介绍 -->
    <section class="color-section">
      <h2 class="section-title">🌈 颜色表示方法</h2>

      <!-- HEX -->
      <div class="format-card hex">
        <div class="color-preview" style="background: #ff6b6b"></div>
        <div class="format-content">
          <h3>1. 十六进制（HEX）</h3>
          <pre><code>#RRGGBB 或 #RGB</code></pre>
          <div class="detail-grid">
            <div class="pros">
              <span class="tag good">优点</span>
              <ul>
                <li>浏览器广泛支持</li>
                <li>书写简洁</li>
                <li>无透明度</li>
              </ul>
            </div>
            <div class="cons">
              <span class="tag bad">缺点</span>
              <ul>
                <li>不易调整颜色</li>
                <li>不支持透明度</li>
              </ul>
            </div>
            <div class="usage">
              <span class="tag">使用场景</span>
              <p>品牌主色、简单色值</p>
            </div>
            <div>文字介绍</div>
          </div>
        </div>
      </div>

      <!-- RGB -->
      <div class="format-card rgb">
        <div class="color-preview" style="background: rgb(78, 205, 196)"></div>
        <div class="format-content">
          <h3>2. RGB/RGBA</h3>
          <pre><code>rgb(255, 107, 107)
rgba(255, 107, 107, 0.8)</code></pre>
          <div class="detail-grid">
            <!-- 内容结构同上 -->
            <div class="pros">
              <span class="tag good">优点</span>
              <ul>
                <li>支持透明度</li>
                <li>易于调整颜色</li>
                <li>广泛支持</li>
              </ul>
            </div>
            <div class="cons">
              <span class="tag bad">缺点</span>
              <ul>
                <li>书写较长</li>
                <li>不直观</li>
              </ul>
            </div>
            <div class="usage">
              <span class="tag">使用场景</span>
              <p>需要透明度的场景、动态颜色调整</p>
            </div>
          </div>
        </div>
      </div>

      <!-- HSL -->
      <div class="format-card hsl">
        <div class="color-preview" style="background: hsl(204, 70%, 60%)"></div>
        <div class="format-content">
          <h3>3. HSL/HSLA</h3>
          <pre><code>hsl(204, 70%, 60%)
hsla(204, 70%, 60%, 0.8)</code></pre>
          <!-- 内容结构同上 -->
          <div class="detail-grid">
            <div class="pros">
              <span class="tag good">优点</span>
              <ul>
                <li>直观的颜色表示</li>
                <li>支持透明度</li>
                <li>易于调整颜色</li>
              </ul>
            </div>
            <div class="cons">
              <span class="tag bad">缺点</span>
              <ul>
                <li>浏览器支持不如 RGB 广泛</li>
                <li>书写较长</li>
              </ul>
            </div>
            <div class="usage">
              <span class="tag">使用场景</span>
              <p>需要直观颜色调整的场景、设计工具</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 现代颜色空间 -->
      <div class="modern-colors">
        <div class="color-card lab">
          <h4>Lab 颜色</h4>
          <pre><code>lab(62% 28 -38)</code></pre>
          <p class="desc">设备无关的颜色空间</p>
        </div>
        <div class="color-card lch">
          <h4>LCH</h4>
          <pre><code>lch(62% 47 270)</code></pre>
          <p class="desc">人类直觉的颜色表示</p>
        </div>
        <div class="color-card hwb">
          <h4>HWB</h4>
          <pre><code>hwb(204 20% 10%)</code></pre>
          <p class="desc">色相-白度-黑度</p>
        </div>
      </div>
    </section>

    <!-- 颜色函数 -->
    <section class="color-functions">
      <h2 class="section-title">🎨 颜色函数</h2>
      <div class="function-grid">
        <div class="function-card">
          <div class="function-demo" style="background: color-mix(in srgb, #ff6b6b 30%, #4ecdc4 70%)"></div>
          <h3>color-mix()</h3>
          <pre><code>color-mix(in srgb, red 50%, blue 50%)</code></pre>
        </div>
        <!-- 其他颜色函数 -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const colorModels = [
  {
    name: 'RGB',
    desc: '加色模型，屏幕显示',
    background: 'linear-gradient(135deg, rgb(255,0,0), rgb(0,255,0), rgb(0,0,255))',
  },
  {
    name: 'HSL',
    desc: '色相-饱和度-明度',
    background: 'linear-gradient(135deg, hsl(0,100%,50%), hsl(120,100%,50%), hsl(240,100%,50%))',
  },
  {
    name: 'HWB',
    desc: '色相-白度-黑度',
    background: 'linear-gradient(135deg, hwb(0 0% 0%), hwb(120 0% 0%), hwb(240 0% 0%))',
  },
]
</script>

<style scoped>
.color-guide {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  background: #f9fafb;
}

.main-title {
  text-align: center;
  color: #111827;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 700;
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
  -webkit-text-fill-color: unset;
}

.color-models {
  margin: 2rem 0;
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.model-card {
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
  text-shadow: none;
  min-height: auto;
  display: block;
}

.section-title {
  color: #111827;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.format-card {
  background: white;
  border-radius: 8px;
  margin: 1.5rem 0;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: none;
  border: 1px solid #e5e7eb;
  align-items: flex-start;
}

.color-preview {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: none;
  border: 1px solid #e5e7eb;
}

pre {
  background: #f3f4f6;
  color: #1f2937;
  padding: 0.8rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.tag.good {
  background: #dcfce7;
  color: #166534;
}

.tag.bad {
  background: #fee2e2;
  color: #991b1b;
}

.tag.usage {
  background: #e0f2fe;
  color: #0c4a6e;
}

.modern-colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.color-card {
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: none;
  border: 1px solid #e5e7eb;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.function-card {
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e5e7eb;
}

.function-demo {
  height: 100px;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
}
</style>
