<template>
  <div class="canvas-container">
    <header class="header">
      <h1>HTML5 Canvas 技术基础介绍</h1>
      <p>创建动态图形和交互式视觉效果的强大工具</p>
    </header>

    <div class="content">
      <div class="intro-section">
        <div class="intro-card">
          <h2>什么是 Canvas?</h2>
          <p>Canvas 是 HTML5 提供的一个绘图 API，允许通过 JavaScript 在网页上动态渲染图形、动画和交互式视觉效果。</p>
          <div class="canvas-key-features">
            <div class="feature">基于像素的绘图</div>
            <div class="feature">高性能图形渲染</div>
            <div class="feature">无DOM元素的轻量级绘图</div>
          </div>
        </div>
      </div>

      <div class="grid-section">
        <div class="api-section">
          <h2>Canvas 核心 API</h2>
          <div class="api-category">
            <h3>基础设置</h3>
            <div class="api-card">
              <div class="api-name">getContext('2d')</div>
              <div class="api-desc">获取2D渲染上下文，所有绘图操作的基础</div>
            </div>
          </div>

          <div class="api-category">
            <h3>绘制形状</h3>
            <div class="api-card">
              <div class="api-name">fillRect(x, y, w, h)</div>
              <div class="api-desc">绘制填充矩形</div>
            </div>
            <div class="api-card">
              <div class="api-name">strokeRect(x, y, w, h)</div>
              <div class="api-desc">绘制矩形边框</div>
            </div>
            <div class="api-card">
              <div class="api-name">arc(x, y, r, sAngle, eAngle)</div>
              <div class="api-desc">绘制圆弧/圆形</div>
            </div>
            <div class="api-card">
              <div class="api-name">lineTo(x, y)</div>
              <div class="api-desc">绘制路径到指定点</div>
            </div>
          </div>

          <div class="api-category">
            <h3>样式控制</h3>
            <div class="api-card">
              <div class="api-name">fillStyle</div>
              <div class="api-desc">设置填充颜色/渐变/图案</div>
            </div>
            <div class="api-card">
              <div class="api-name">strokeStyle</div>
              <div class="api-desc">设置描边颜色/渐变/图案</div>
            </div>
            <div class="api-card">
              <div class="api-name">lineWidth</div>
              <div class="api-desc">设置线条宽度</div>
            </div>
            <div class="api-card">
              <div class="api-name">createLinearGradient()</div>
              <div class="api-desc">创建线性渐变</div>
            </div>
          </div>

          <div class="api-category">
            <h3>文本操作</h3>
            <div class="api-card">
              <div class="api-name">fillText(text, x, y)</div>
              <div class="api-desc">绘制填充文本</div>
            </div>
            <div class="api-card">
              <div class="api-name">strokeText(text, x, y)</div>
              <div class="api-desc">绘制文本轮廓</div>
            </div>
            <div class="api-card">
              <div class="api-name">font</div>
              <div class="api-desc">设置文本字体样式</div>
            </div>
          </div>

          <div class="api-category">
            <h3>图像操作</h3>
            <div class="api-card">
              <div class="api-name">drawImage(img, x, y)</div>
              <div class="api-desc">绘制图像到画布</div>
            </div>
            <div class="api-card">
              <div class="api-name">getImageData()</div>
              <div class="api-desc">获取像素数据</div>
            </div>
            <div class="api-card">
              <div class="api-name">putImageData()</div>
              <div class="api-desc">放置像素数据</div>
            </div>
          </div>
        </div>

        <div class="example-section">
          <h2>Canvas 示例</h2>
          <div class="canvas-box">
            <canvas ref="canvas" width="500" height="400"></canvas>
          </div>
          <div class="controls">
            <div class="control-group">
              <label>绘图类型:</label>
              <Select v-model="drawType">
                <option value="shapes">基本形状</option>
                <option value="gradient">渐变效果</option>
                <option value="text">文本效果</option>
                <option value="image">图像操作</option>
              </select>
            </div>
            <div class="control-group">
              <button @click="drawCanvas">重新绘制</button>
              <button @click="clearCanvas">清除画布</button>
            </div>
          </div>
        </div>
      </div>

      <div class="use-cases-section">
        <h2>Canvas 使用场景</h2>
        <div class="cases-grid">
          <div class="case-card">
            <div class="icon">📊</div>
            <h3>数据可视化</h3>
            <p>创建交互式图表、仪表盘和数据图形</p>
          </div>
          <div class="case-card">
            <div class="icon">🎮</div>
            <h3>游戏开发</h3>
            <p>构建2D网页游戏和互动动画</p>
          </div>
          <div class="case-card">
            <div class="icon">🖼️</div>
            <h3>图像处理</h3>
            <p>实现滤镜、特效和图像编辑功能</p>
          </div>
          <div class="case-card">
            <div class="icon">✏️</div>
            <h3>绘图应用</h3>
            <p>开发在线绘图和白板工具</p>
          </div>
          <div class="case-card">
            <div class="icon">🎨</div>
            <h3>创意动画</h3>
            <p>制作粒子效果、动态背景和艺术创作</p>
          </div>
          <div class="case-card">
            <div class="icon">📱</div>
            <h3>移动端UI</h3>
            <p>构建高性能的自定义UI组件</p>
          </div>
        </div>
      </div>

      <div class="performance-section">
        <h2>Canvas 最佳实践</h2>
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-number">1</div>
            <div class="tip-content">
              <h3>离屏Canvas</h3>
              <p>对于复杂图形，先在离屏Canvas上绘制，再复制到主Canvas</p>
            </div>
          </div>
          <div class="tip-card">
            <div class="tip-number">2</div>
            <div class="tip-content">
              <h3>避免频繁重绘</h3>
              <p>只重绘发生变化的部分，而不是整个画布</p>
            </div>
          </div>
          <div class="tip-card">
            <div class="tip-number">3</div>
            <div class="tip-content">
              <h3>使用路径批处理</h3>
              <p>使用beginPath()和closePath()批量绘制路径</p>
            </div>
          </div>
          <div class="tip-card">
            <div class="tip-number">4</div>
            <div class="tip-content">
              <h3>硬件加速</h3>
              <p>使用transform代替位置操作，利用GPU加速</p>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2>Canvas vs SVG</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Canvas</th>
                <th>SVG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>渲染方式</td>
                <td>基于像素（位图）</td>
                <td>基于矢量</td>
              </tr>
              <tr>
                <td>DOM元素</td>
                <td>单个元素，无子元素</td>
                <td>多个元素，可单独操作</td>
              </tr>
              <tr>
                <td>性能</td>
                <td>大数据量时性能更好</td>
                <td>复杂图形时性能更好</td>
              </tr>
              <tr>
                <td>事件处理</td>
                <td>需手动实现</td>
                <td>原生支持</td>
              </tr>
              <tr>
                <td>缩放能力</td>
                <td>缩放会失真</td>
                <td>无限缩放不失真</td>
              </tr>
              <tr>
                <td>适用场景</td>
                <td>游戏、图像处理、动态效果</td>
                <td>图标、地图、可缩放图形</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Canvas引用
const canvas = ref<HTMLCanvasElement | null>(null);
const drawType = ref<'shapes' | 'gradient' | 'text' | 'image'>('shapes');

// 初始化Canvas
onMounted(() => {
  drawCanvas();
});

// 绘制Canvas内容
function drawCanvas() {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  // 清除画布
  clearCanvas();

  switch (drawType.value) {
    case 'shapes':
      drawShapes(ctx);
      break;
    case 'gradient':
      drawGradients(ctx);
      break;
    case 'text':
      drawText(ctx);
      break;
    case 'image':
      drawImage(ctx);
      break;
  }
}

// 绘制基本形状
function drawShapes(ctx: CanvasRenderingContext2D) {
  // 绘制矩形
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(50, 50, 100, 80);

  // 绘制圆形
  ctx.beginPath();
  ctx.arc(250, 100, 50, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.fill();

  // 绘制三角形
  ctx.beginPath();
  ctx.moveTo(150, 250);
  ctx.lineTo(250, 250);
  ctx.lineTo(200, 180);
  ctx.closePath();
  ctx.fillStyle = '#10b981';
  ctx.fill();

  // 绘制线条
  ctx.beginPath();
  ctx.moveTo(300, 200);
  ctx.lineTo(400, 300);
  ctx.lineTo(350, 350);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.stroke();
}

// 绘制渐变效果
function drawGradients(ctx: CanvasRenderingContext2D) {
  // 线性渐变
  const linearGradient = ctx.createLinearGradient(50, 50, 200, 50);
  linearGradient.addColorStop(0, '#4f46e5');
  linearGradient.addColorStop(1, '#8b5cf6');
  ctx.fillStyle = linearGradient;
  ctx.fillRect(50, 50, 150, 100);

  // 径向渐变
  const radialGradient = ctx.createRadialGradient(300, 150, 10, 300, 150, 70);
  radialGradient.addColorStop(0, '#ef4444');
  radialGradient.addColorStop(1, '#f97316');
  ctx.fillStyle = radialGradient;
  ctx.beginPath();
  ctx.arc(300, 150, 70, 0, Math.PI * 2);
  ctx.fill();

  // 图案渐变
  ctx.fillStyle = '#10b981';
  ctx.fillRect(50, 200, 400, 150);

  for (let i = 0; i < 400; i += 20) {
    for (let j = 200; j < 350; j += 20) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
      ctx.fillRect(i, j, 15, 15);
    }
  }
}

// 绘制文本效果
function drawText(ctx: CanvasRenderingContext2D) {
  // 填充文本
  ctx.font = 'bold 36px Arial';
  ctx.fillStyle = '#4f46e5';
  ctx.fillText('Canvas 文本', 50, 100);

  // 描边文本
  ctx.font = 'italic 32px "Segoe UI"';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.strokeText('描边效果', 50, 180);

  // 文本阴影
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#10b981';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.fillText('带阴影的文本', 50, 260);

  // 重置阴影
  ctx.shadowColor = 'transparent';

  // 文本渐变
  const gradient = ctx.createLinearGradient(50, 300, 400, 300);
  gradient.addColorStop(0, '#8b5cf6');
  gradient.addColorStop(1, '#ec4899');
  ctx.fillStyle = gradient;
  ctx.font = 'bold 36px Arial';
  ctx.fillText('渐变文本效果', 50, 350);
}

// 绘制图像操作
function drawImage(ctx: CanvasRenderingContext2D) {
  // 创建图像
  const img = new Image();
  img.src = 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=Canvas+Image';

  img.onload = () => {
    // 绘制原始图像
    ctx.drawImage(img, 50, 50, 150, 100);

    // 绘制裁剪后的图像
    ctx.drawImage(img, 50, 50, 100, 100, 220, 50, 150, 150);

    // 绘制带边框的图像
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 180, 150, 100);
    ctx.drawImage(img, 50, 180, 150, 100);

    // 图像滤镜效果
    const imageData = ctx.getImageData(220, 180, 150, 100);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // 灰度效果
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;         // R
      data[i + 1] = avg;     // G
      data[i + 2] = avg;     // B
    }

    ctx.putImageData(imageData, 220, 180);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.strokeRect(220, 180, 150, 100);
  };
}

// 清除画布
function clearCanvas() {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
}
</script>

<style lang="less" scoped>
.canvas-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-top: 0;
  }
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.intro-section {
  margin-bottom: 2.5rem;
}

.intro-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;

  h2 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    color: #1e40af;
  }

  p {
    max-width: 800px;
    margin: 0 auto 1.5rem;
    font-size: 1.1rem;
  }
}

.canvas-key-features {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .feature {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 0.8rem 1.5rem;
    font-weight: 600;
    color: #4f46e5;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
}

.grid-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.api-section {
  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.api-category {
  margin-bottom: 1.8rem;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4f46e5;
    padding-left: 0.5rem;
    border-left: 4px solid #4f46e5;
  }
}

.api-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  border-left: 4px solid #8b5cf6;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }

  .api-name {
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 0.5rem;
    font-family: 'Fira Code', monospace;
  }

  .api-desc {
    color: #4b5563;
    font-size: 0.95rem;
  }
}

.example-section {
  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.canvas-box {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  canvas {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
}

.controls {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1.2rem;
}

.control-group {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  label {
    font-weight: 500;
    min-width: 100px;
  }

  select,
  button {
    padding: 0.7rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 1rem;
  }

  select {
    flex: 1;
  }

  button {
    background: #4f46e5;
    color: white;
    border: none;
    margin-right: 1rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #4338ca;
    }

    &:last-child {
      background: #ef4444;

      &:hover {
        background: #dc2626;
      }
    }
  }
}

.use-cases-section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.case-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border-top: 3px solid #4f46e5;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0 0 0.8rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.5;
    font-size: 0.95rem;
  }
}

.performance-section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  display: flex;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }

  .tip-number {
    width: 40px;
    height: 40px;
    background: #4f46e5;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 1.2rem;
    flex-shrink: 0;
  }

  .tip-content {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #475569;
      font-size: 0.95rem;
    }
  }
}

.comparison-section {
  h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.comparison-table {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #4f46e5;
    color: white;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  tr:hover {
    background-color: #f1f5f9;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }

  .controls {
    padding: 1rem;
  }

  .control-group {
    flex-direction: column;
    align-items: flex-start;

    select,
    button {
      width: 100%;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
