<template>
  <div class="canvas-doc">
    <header class="doc-header">
      <h1>HTML5 Canvas 基本指南</h1>
    </header>

    <h3>
      🎨Canvas 是一个用于绘图的 HTML 元素，允许通过 JavaScript
      动态生成图形和动画。它广泛应用于游戏开发、数据可视化和图像处理等领域。
    </h3>

    <div><Button @click.prevent="goto">跳转进阶指南</Button></div>

    <!-- 使用方法和场景 -->
    <section class="section canvas-introduction">
      <h2>🖼️ Canvas 使用方法与场景</h2>
      <p>
        Canvas 是一个强大的绘图工具，允许开发者通过 JavaScript
        动态生成图形。以下是一些常见的使用方法和场景：
      </p>
      <ul>
        <li><strong>游戏开发：</strong>Canvas 可以用于创建2D和3D游戏，支持实时渲染和动画效果。</li>
        <li><strong>数据可视化：</strong>通过绘制图表和图形，Canvas 可以帮助展示复杂的数据集。</li>
        <li><strong>图像处理：</strong>Canvas 提供了对图像的操作能力，如滤镜、裁剪和合成。</li>
      </ul>
      <h3>优点：</h3>
      <ul>
        <li>高性能：Canvas 直接在浏览器中渲染，性能优于传统的 DOM 操作。</li>
        <li>灵活性：开发者可以自由绘制任意形状和图像，适应多种需求。</li>
        <li>广泛支持：大多数现代浏览器都支持 Canvas，无需额外插件。</li>
      </ul>
      <h3>缺点：</h3>
      <ul>
        <li>复杂性：相较于其他图形库，Canvas 的 API 可能较为复杂，需要一定的学习曲线。</li>
        <li>可访问性：Canvas 内容不易被搜索引擎索引，可能影响 SEO。</li>
        <li>状态管理：Canvas 不维护状态，开发者需要手动管理绘制的内容。</li>
      </ul>
    </section>

    <main class="doc-content">
      <!-- 核心概念 -->
      <section class="section concepts">
        <h2>🎯 核心概念</h2>
        <div class="concept-grid">
          <div class="card">
            <h3>📐 坐标系</h3>
            <p>以画布左上角为原点(0,0)，X轴向右，Y轴向下</p>
            <canvas ref="gridCanvas" class="demo-canvas"></canvas>
          </div>

          <div class="card">
            <h3>🖌️ 渲染上下文</h3>
            <pre><code class="language-ts">const ctx = canvas.getContext('2d')!;
// WebGL上下文
// const gl = canvas.getContext('webgl');</code></pre>
          </div>
        </div>
      </section>

      <!-- 基础绘制 -->
      <section class="section drawing">
        <h2>🖍️ 基础绘制</h2>
        <div class="code-group">
          <div class="code-block">
            <h3>形状绘制</h3>
            <pre><code class="language-ts">// 矩形
ctx.fillStyle = '#42b883';
ctx.fillRect(10, 10, 100, 80);

// 路径
ctx.beginPath();
ctx.arc(150, 50, 30, 0, Math.PI * 2);
ctx.stroke();</code></pre>
          </div>

          <div class="code-block">
            <h3>文本绘制</h3>
            <pre><code class="language-ts">ctx.font = '20px Arial';
ctx.fillStyle = '#333';
ctx.textAlign = 'center';
ctx.fillText('Hello Canvas', 100, 100);</code></pre>
          </div>
        </div>
      </section>

      <!-- 动画实现 -->
      <section class="section animation">
        <h2>🎬 动画实现</h2>
        <div class="animation-example">
          <canvas ref="animCanvas" class="demo-canvas"></canvas>
          <pre><code class="language-ts">function animate() {
  ctx.clearRect(0, 0, width, height);

  // 更新状态
  ball.x += ball.vx;
  ball.y += ball.vy;

  // 边界检测
  if(ball.x > width - size || ball.x &lt; size) ball.vx *= -1;
  if(ball.y > height - size || ball.y &lt;size) ball.vy *= -1;

  // 绘制
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, size, 0, Math.PI*2);
  ctx.fill();

  requestAnimationFrame(animate);
}</code></pre>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section use-cases">
        <h2>📌 典型应用场景</h2>
        <div class="case-grid">
          <div class="card">
            <h3>🎮 游戏开发</h3>
            <ul>
              <li>2D/3D游戏渲染</li>
              <li>物理引擎实现</li>
              <li>碰撞检测</li>
            </ul>
          </div>

          <div class="card">
            <h3>📊 数据可视化</h3>
            <ul>
              <li>动态图表</li>
              <li>流程图</li>
              <li>热力图</li>
            </ul>
          </div>

          <div class="card">
            <h3>🖼️ 图像处理</h3>
            <ul>
              <li>滤镜效果</li>
              <li>像素操作</li>
              <li>图片合成</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section considerations">
        <h2>⚠️ 核心注意事项</h2>
        <div class="warning-grid">
          <div class="warning">
            <h3>性能优化</h3>
            <ul>
              <li>使用离屏Canvas缓存复杂图形</li>
              <li>避免频繁的Canvas状态切换</li>
              <li>使用requestAnimationFrame优化动画</li>
            </ul>
          </div>

          <div class="warning">
            <h3>分辨率适配</h3>
            <pre><code class="language-ts">function resizeCanvas(canvas: HTMLCanvasElement) {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.style.width = `${canvas.offsetWidth}px`;
  canvas.style.height = `${canvas.offsetHeight}px`;
}</code></pre>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goto() {
  router.push({ name: 'Canvas2' })
}

// 坐标系示例
const gridCanvas = ref<HTMLCanvasElement>()
onMounted(() => {
  const ctx = gridCanvas.value?.getContext('2d')
  if (!ctx) return

  ctx.strokeStyle = '#ddd'
  for (let i = 0; i <= 200; i += 20) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 200)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(200, i)
    ctx.stroke()
  }
})

// 动画示例
const animCanvas = ref<HTMLCanvasElement>()
onMounted(() => {
  const canvas = animCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')!
  const width = (canvas.width = 300)
  const height = (canvas.height = 200)

  const ball = {
    x: 50,
    y: 50,
    vx: 2,
    vy: 1.5,
  }
  const size = 10

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // 更新状态
    ball.x += ball.vx
    ball.y += ball.vy

    // 边界检测
    if (ball.x > width - size || ball.x < size) ball.vx *= -1
    if (ball.y > height - size || ball.y < size) ball.vy *= -1

    // 绘制
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, size, 0, Math.PI * 2)
    ctx.fillStyle = '#42b883'
    ctx.fill()

    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<style scoped>
pre {
  color: #fff;
}

.canvas-doc {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
}

.doc-header {
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 1.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.section {
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #42b883;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.concept-grid,
.case-grid,
.warning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.card {
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
  border-left: 4px solid #42b883;
}

.warning {
  background: #fff5f5;
  border-left: 4px solid #ff6b6b;
  padding: 1.5rem;
}

.demo-canvas {
  width: 100%;
  height: 200px;
  border: 1px solid #eee;
  margin: 1rem 0;
}

.code-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

pre {
  background: #1e1e1e !important;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.animation-example {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

@media (max-width: 768px) {
  .concept-grid,
  .case-grid,
  .warning-grid {
    grid-template-columns: 1fr;
  }

  .animation-example {
    grid-template-columns: 1fr;
  }

  .demo-canvas {
    height: 150px;
  }
}
</style>
