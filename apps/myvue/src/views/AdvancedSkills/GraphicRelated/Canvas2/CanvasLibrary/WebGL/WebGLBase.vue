<template>
  <div class="webgl-intro-container">
    <h1 class="main-title">WebGL技术基础介绍</h1>
    <div class="intro-card">
      <h2 class="section-title">🤔 什么是WebGL?</h2>
      <p class="content-text">
        WebGL(Web Graphics Library)是一种JavaScript API，用于在任何兼容的Web浏览器中呈现交互式2D和3D图形，而无需使用插件。
      </p>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">🔧</div>
          <h3>基于OpenGL ES</h3>
          <p>WebGL基于OpenGL ES 2.0标准，是OpenGL的子集</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>硬件加速</h3>
          <p>利用GPU硬件加速渲染，提高图形处理性能</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌐</div>
          <h3>跨平台</h3>
          <p>支持所有现代浏览器，无需额外插件</p>
        </div>
      </div>
    </div>

    <div class="intro-card">
      <h2 class="section-title">🎓 WebGL核心概念</h2>
      <div class="concept-container">
        <div class="concept-section">
          <h3 class="concept-title">顶点着色器</h3>
          <div class="concept-detail">
            <p>负责处理每个顶点的位置计算</p>
            <ul>
              <li>将顶点位置从模型坐标转换到屏幕坐标</li>
              <li>计算顶点光照、颜色等属性</li>
              <li>每个顶点执行一次</li>
            </ul>
          </div>
        </div>

        <div class="concept-section">
          <h3 class="concept-title">片元着色器</h3>
          <div class="concept-detail">
            <p>负责处理每个像素的颜色计算</p>
            <ul>
              <li>计算最终显示在屏幕上的像素颜色</li>
              <li>可以应用纹理、光照、雾化等效果</li>
              <li>每个像素执行一次</li>
            </ul>
          </div>
        </div>

        <div class="concept-diagram">
          <div class="graphics-pipeline">
            <div class="pipeline-step">顶点数据</div>
            <div class="arrow">→</div>
            <div class="pipeline-step">顶点着色器</div>
            <div class="arrow">→</div>
            <div class="pipeline-step">图元装配</div>
            <div class="arrow">→</div>
            <div class="pipeline-step">光栅化</div>
            <div class="arrow">→</div>
            <div class="pipeline-step">片元着色器</div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-card">
      <h2 class="section-title">💻 WebGL基础示例 - 绘制三角形</h2>
      <div class="demo-container">
        <div class="code-editor">
          <div class="editor-title">代码实现</div>
          <pre class="code-block"><code>// 1. 初始化WebGL上下文
const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl');

// 2. 定义顶点数据
const vertices = new Float32Array([
   0.0,  0.5,   // 顶点1
  -0.5, -0.5,   // 顶点2
   0.5, -0.5    // 顶点3
]);

// 3. 创建顶点着色器
const vsSource = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }`;

// 4. 创建片元着色器
const fsSource = `
  void main() {
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0); // 蓝色
  }`;

// 5. 初始化着色器程序
const program = initShaderProgram(gl, vsSource, fsSource);

// 6. 设置顶点缓冲区
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 7. 绑定顶点属性
const positionAttrib = gl.getAttribLocation(program, 'aPosition');
gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttrib);

// 8. 渲染三角形
gl.clearColor(0.1, 0.1, 0.1, 1.0); // 设置背景色
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);</code></pre>
        </div>

        <div class="canvas-container">
          <div class="canvas-title">渲染结果</div>
          <canvas ref="canvasRef" width="300" height="300"></canvas>
        </div>
      </div>
    </div>

    <div class="usage-card">
      <h2 class="section-title">🚀 WebGL应用场景</h2>
      <div class="usage-grid">
        <div class="usage-item">
          <div class="usage-icon">🎮</div>
          <h3>3D游戏</h3>
          <p>浏览器内高性能3D游戏</p>
        </div>
        <div class="usage-item">
          <div class="usage-icon">🏢</div>
          <h3>数据可视化</h3>
          <p>复杂3D数据图表展示</p>
        </div>
        <div class="usage-item">
          <div class="usage-icon">🖼️</div>
          <h3>艺术创作</h3>
          <p>交互式数字艺术装置</p>
        </div>
        <div class="usage-item">
          <div class="usage-icon">🌍</div>
          <h3>地理信息系统</h3>
          <p>3D地图和地球仪渲染</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const gl = canvas.getContext('webgl');

  if (!gl) {
    console.error('WebGL not supported in this browser');
    return;
  }

  // 顶点数据
  const vertices = new Float32Array([
    0.0, 0.5,   // 顶点1
    -0.5, -0.5,   // 顶点2
    0.5, -0.5    // 顶点3
  ]);

  // 顶点着色器源码
  const vsSource = `
    attribute vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

  // 片元着色器源码
  const fsSource = `
    void main() {
      gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0); // 蓝色
    }`;

  // 初始化着色器程序
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  if (!shaderProgram) {
    console.error('Failed to initialize shader program');
    return;
  }

  // 创建顶点缓冲区
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 获取顶点属性位置并启用
  const positionAttrib = gl.getAttribLocation(shaderProgram, 'aPosition');
  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionAttrib);

  // 设置背景色并清除画布
  gl.clearColor(0.1, 0.1, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, 3);
});

// 初始化着色器程序的工具函数
function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) return null;

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) return null;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  gl.useProgram(shaderProgram);
  return shaderProgram;
}

// 加载着色器的工具函数
function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
</script>

<style lang="less" scoped>


.webgl-intro-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1e293b;
  font-weight: 700;
  background: linear-gradient(90deg, #6366f1, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-title {
  font-size: 1.8rem;
  margin: 1.5rem 0 1rem;
  color: #1e40af;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #dbeafe;
}

.intro-card,
.demo-card,
.usage-card {
  background: white;
  border-radius: 12px;
  padding: 1.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
}

.content-text {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feature-card {
  background: #eff6ff;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  border-left: 4px solid #3b82f6;

  h3 {
    margin: 0.8rem 0;
    font-size: 1.3rem;
    color: #1d4ed8;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.concept-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.concept-section {
  flex: 1;
  min-width: 300px;
  background: #f0f9ff;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #60a5fa;
}

.concept-title {
  font-size: 1.4rem;
  color: #1d4ed8;
  margin-top: 0;
  display: flex;
  align-items: center;

  &::before {
    content: "▶";
    margin-right: 0.5rem;
    color: #3b82f6;
    font-size: 0.8rem;
  }
}

.concept-detail {
  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::before {
        content: "•";
        color: #3b82f6;
        font-weight: bold;
        position: absolute;
        left: -1.2rem;
      }
    }
  }
}

.concept-diagram {
  flex: 2;
  min-width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.graphics-pipeline {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, #e0f2fe, #dbeafe);
  padding: 1.2rem;
  border-radius: 10px;
  width: 100%;
}

.pipeline-step {
  background: #3b82f6;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  text-align: center;
  min-width: 100px;
}

.arrow {
  font-size: 1.5rem;
  color: #1e40af;
}

.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.code-editor {
  flex: 1;
  min-width: 300px;
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
}

.editor-title {
  background: #334155;
  color: #e2e8f0;
  padding: 0.7rem 1rem;
  font-weight: 500;
  font-size: 1.1rem;
}

.code-block {
  margin: 0;
  padding: 1.2rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;

  code {
    color: #cbd5e1;
    display: block;

    .hljs-comment {
      color: #94a3b8;
    }

    .hljs-keyword {
      color: #f472b6;
    }

    .hljs-built_in {
      color: #60a5fa;
    }

    .hljs-string {
      color: #34d399;
    }

    .hljs-number {
      color: #fbbf24;
    }
  }
}

.canvas-container {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.canvas-title {
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: center;
  color: #1e293b;
}

canvas {
  width: 100%;
  height: 280px;
  background: #1e293b;
  border-radius: 6px;
  display: block;
  margin: 0 auto;
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.usage-item {
  text-align: center;
  padding: 1.2rem;
  background: #f0fdfa;
  border-radius: 10px;
  border: 1px solid #ccfbf1;

  h3 {
    margin: 0.7rem 0 0.5rem;
    color: #0f766e;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
}

.usage-icon {
  font-size: 2rem;
  color: #0d9488;
}

@media (max-width: 768px) {

  .concept-diagram,
  .graphics-pipeline {
    min-width: 100%;
  }

  .graphics-pipeline {
    flex-direction: column;

    .pipeline-step {
      margin: 0.5rem 0;
    }

    .arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
