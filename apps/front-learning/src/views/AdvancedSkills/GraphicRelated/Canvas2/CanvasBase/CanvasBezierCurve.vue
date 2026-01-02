<template>
  <div class="bezier-container">
    <h1>Canvas中的贝塞尔曲线</h1>

    <section class="intro-section">
      <h2>贝塞尔曲线简介</h2>
      <p>贝塞尔曲线是计算机图形学中用于创建平滑曲线的数学工具，由法国工程师皮埃尔·贝塞尔发明。它通过控制点来定义曲线的形状，广泛应用于矢量图形设计、字体设计和动画路径中。</p>

      <div class="curve-types">
        <div class="curve-type">
          <h3>二次贝塞尔曲线</h3>
          <p>由1个起点、1个控制点和1个终点定义</p>
          <p>公式：B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂, t∈[0,1]</p>
        </div>
        <div class="curve-type">
          <h3>三次贝塞尔曲线</h3>
          <p>由1个起点、2个控制点和1个终点定义</p>
          <p>公式：B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃, t∈[0,1]</p>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <div class="canvas-container">
        <h2>二次贝塞尔曲线</h2>
        <canvas ref="quadraticCanvas" width="400" height="300"></canvas>
        <div class="code-sample">
          <pre><code>// 二次贝塞尔曲线绘制代码
ctx.beginPath();
ctx.moveTo(startX, startY);
ctx.quadraticCurveTo(controlX, controlY, endX, endY);
ctx.stroke();</code></pre>
        </div>
      </div>

      <div class="canvas-container">
        <h2>三次贝塞尔曲线</h2>
        <canvas ref="cubicCanvas" width="400" height="300"></canvas>
        <div class="code-sample">
          <pre><code>// 三次贝塞尔曲线绘制代码
ctx.beginPath();
ctx.moveTo(startX, startY);
ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
ctx.stroke();</code></pre>
        </div>
      </div>
    </section>

    <section class="usage-section">
      <h2>Canvas中的贝塞尔曲线应用</h2>
      <ul>
        <li>创建平滑的路径和形状</li>
        <li>设计复杂图形和图标</li>
        <li>实现动画轨迹</li>
        <li>生成波浪效果</li>
        <li>字体轮廓设计</li>
      </ul>

      <div class="complex-example">
        <h3>组合曲线示例</h3>
        <canvas ref="complexCanvas" width="500" height="200"></canvas>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 获取Canvas元素引用
const quadraticCanvas = ref<HTMLCanvasElement | null>(null);
const cubicCanvas = ref<HTMLCanvasElement | null>(null);
const complexCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  // 绘制二次贝塞尔曲线
  if (quadraticCanvas.value) {
    const ctx = quadraticCanvas.value.getContext('2d');
    if (ctx) {
      drawQuadraticCurve(ctx);
    }
  }

  // 绘制三次贝塞尔曲线
  if (cubicCanvas.value) {
    const ctx = cubicCanvas.value.getContext('2d');
    if (ctx) {
      drawCubicCurve(ctx);
    }
  }

  // 绘制组合曲线
  if (complexCanvas.value) {
    const ctx = complexCanvas.value.getContext('2d');
    if (ctx) {
      drawComplexCurves(ctx);
    }
  }
});

// 绘制二次贝塞尔曲线
function drawQuadraticCurve(ctx: CanvasRenderingContext2D) {
  // 清除画布
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 定义点
  const startX = 50, startY = 250;
  const controlX = 200, controlY = 50;
  const endX = 350, endY = 250;

  // 绘制曲线
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(controlX, controlY, endX, endY);
  ctx.strokeStyle = '#3498db';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 绘制点和控制线
  drawPoints(ctx, [
    { x: startX, y: startY, color: '#e74c3c', label: '起点' },
    { x: controlX, y: controlY, color: '#f39c12', label: '控制点' },
    { x: endX, y: endY, color: '#2ecc71', label: '终点' }
  ]);

  // 绘制控制线
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(controlX, controlY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = 'rgba(127, 140, 141, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

// 绘制三次贝塞尔曲线
function drawCubicCurve(ctx: CanvasRenderingContext2D) {
  // 清除画布
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 定义点
  const startX = 50, startY = 250;
  const controlX1 = 150, controlY1 = 50;
  const controlX2 = 250, controlY2 = 50;
  const endX = 350, endY = 250;

  // 绘制曲线
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
  ctx.strokeStyle = '#27ae60';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 绘制点和控制线
  drawPoints(ctx, [
    { x: startX, y: startY, color: '#e74c3c', label: '起点' },
    { x: controlX1, y: controlY1, color: '#f39c12', label: '控制点1' },
    { x: controlX2, y: controlY2, color: '#f39c12', label: '控制点2' },
    { x: endX, y: endY, color: '#2ecc71', label: '终点' }
  ]);

  // 绘制控制线
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(controlX1, controlY1);
  ctx.moveTo(endX, endY);
  ctx.lineTo(controlX2, controlY2);
  ctx.strokeStyle = 'rgba(127, 140, 141, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

// 绘制组合曲线
function drawComplexCurves(ctx: CanvasRenderingContext2D) {
  // 清除画布
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 绘制波浪线
  ctx.beginPath();
  ctx.moveTo(50, 100);

  // 使用多个贝塞尔曲线创建波浪效果
  for (let i = 0; i < 4; i++) {
    const x = 100 + i * 100;
    ctx.bezierCurveTo(
      x - 40, 50,
      x - 10, 150,
      x, 100
    );
  }

  ctx.strokeStyle = '#9b59b6';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 绘制心形
  ctx.beginPath();
  ctx.moveTo(300, 150);
  ctx.bezierCurveTo(300, 120, 260, 100, 260, 130);
  ctx.bezierCurveTo(260, 160, 300, 180, 300, 150);
  ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
  ctx.fill();

  // 绘制标题
  ctx.font = '16px Arial';
  ctx.fillStyle = '#34495e';
  ctx.fillText('波浪线 + 心形 = 贝塞尔曲线组合', 150, 50);
}

// 绘制点和标签
function drawPoints(ctx: CanvasRenderingContext2D, points: { x: number, y: number, color: string, label: string }[]) {
  points.forEach(point => {
    // 绘制点
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = point.color;
    ctx.fill();

    // 绘制标签
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.fillText(point.label, point.x + 10, point.y - 10);
  });
}
</script>

<style lang="less" scoped>
.bezier-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  h1 {
    text-align: center;
    color: #2980b9;
    margin-bottom: 30px;
    font-size: 2.2rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 15px;
  }

  h2 {
    color: #3498db;
    border-left: 4px solid #3498db;
    padding-left: 10px;
    margin: 25px 0 15px;
  }

  h3 {
    color: #2c3e50;
    margin: 15px 0 10px;
  }

  .intro-section {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;

    p {
      line-height: 1.6;
      margin-bottom: 15px;
    }

    .curve-types {
      display: flex;
      gap: 20px;
      margin-top: 20px;

      .curve-type {
        flex: 1;
        background-color: #f0f8ff;
        padding: 15px;
        border-radius: 6px;
        border: 1px solid #d6eaf8;

        p {
          margin: 8px 0;
          font-size: 0.9rem;
        }
      }
    }
  }

  .demo-section {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;

    .canvas-container {
      flex: 1;
      background-color: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

      canvas {
        display: block;
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        margin: 15px auto;
      }

      .code-sample {
        background-color: #f5f7fa;
        padding: 15px;
        border-radius: 6px;
        border-left: 3px solid #3498db;

        pre {
          margin: 0;
          font-size: 0.85rem;

          code {
            color: #2c3e50;
            font-family: 'Fira Code', 'Courier New', monospace;
          }
        }
      }
    }
  }

  .usage-section {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    ul {
      padding-left: 20px;
      margin-bottom: 20px;

      li {
        margin-bottom: 10px;
        padding-left: 10px;
        position: relative;

        &::before {
          content: '•';
          color: #3498db;
          position: absolute;
          left: -15px;
          font-size: 1.2rem;
        }
      }
    }

    .complex-example {
      margin-top: 20px;

      canvas {
        display: block;
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        margin: 15px auto;
      }
    }
  }
}
</style>
