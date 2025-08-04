<template>
  <div class="vertex-shader-container">
    <!-- 标题和概述部分 -->
    <header>
      <h1>WebGL 顶点着色器基础介绍</h1>
      <p class="overview">
        顶点着色器是WebGL渲染管线的第一个可编程阶段，负责处理顶点数据并确定顶点在屏幕上的最终位置。
        它是构建复杂3D图形的基石，也是实现几何变换和顶点动画的关键组件。
      </p>
    </header>

    <!-- 主要内容 -->
    <div class="content-wrapper">
      <!-- 左侧导航 -->
      <nav class="navigation">
        <div v-for="(item, index) in navItems" :key="index" :class="{ active: activeSection === index }"
          @click="activeSection = index">
          {{ item.title }}
        </div>
      </nav>

      <!-- 右侧内容 -->
      <div class="content">
        <!-- 基础概念部分 -->
        <section v-show="activeSection === 0">
          <h2>顶点着色器基础概念</h2>

          <div class="card">
            <h3>什么是顶点着色器？</h3>
            <p>
              顶点着色器是WebGL渲染管线中的第一个可编程阶段，负责处理每个顶点的属性数据。
              它接收顶点坐标、颜色、纹理坐标等属性作为输入，并输出每个顶点在裁剪空间中的位置。
            </p>

            <div class="illustration">
              <div class="pipeline">
                <div class="stage">顶点数据</div>
                <div class="arrow">→</div>
                <div class="stage highlight">顶点着色器</div>
                <div class="arrow">→</div>
                <div class="stage">图元装配</div>
                <div class="arrow">→</div>
                <div class="stage">光栅化</div>
                <div class="arrow">→</div>
                <div class="stage">片段着色器</div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>顶点着色器的核心功能</h3>
            <div class="features-grid">
              <div class="feature">
                <div class="icon">📍</div>
                <h4>顶点变换</h4>
                <p>将模型坐标变换到裁剪空间坐标</p>
              </div>
              <div class="feature">
                <div class="icon">🎨</div>
                <h4>顶点属性计算</h4>
                <p>计算每个顶点的颜色、纹理坐标等</p>
              </div>
              <div class="feature">
                <div class="icon">🌀</div>
                <h4>几何变形</h4>
                <p>实现顶点动画和形状变换</p>
              </div>
              <div class="feature">
                <div class="icon">📐</div>
                <h4>光照计算</h4>
                <p>为顶点计算光照效果（Gouraud着色）</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>顶点着色器输入/输出</h3>
            <div class="io-table">
              <table>
                <thead>
                  <tr>
                    <th>类型</th>
                    <th>变量</th>
                    <th>描述</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="3">输入</td>
                    <td>attribute</td>
                    <td>顶点属性（位置、颜色、法线等）</td>
                    <td>attribute vec3 aPosition;</td>
                  </tr>
                  <tr>
                    <td>uniform</td>
                    <td>全局常量（矩阵、时间等）</td>
                    <td>uniform mat4 uModelViewMatrix;</td>
                  </tr>
                  <tr>
                    <td>varying</td>
                    <td>传递给片段着色器的变量</td>
                    <td>varying vec4 vColor;</td>
                  </tr>
                  <tr>
                    <td>输出</td>
                    <td>gl_Position</td>
                    <td>顶点在裁剪空间的位置</td>
                    <td>gl_Position = projection * position;</td>
                  </tr>
                  <tr>
                    <td>输出</td>
                    <td>gl_PointSize</td>
                    <td>点精灵的大小（可选）</td>
                    <td>gl_PointSize = 10.0;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 代码实现部分 -->
        <section v-show="activeSection === 1">
          <h2>顶点着色器代码实现</h2>

          <div class="card">
            <h3>基础顶点着色器示例</h3>
            <div class="code-sample">
              <pre><code>// 顶点属性：位置
attribute vec3 aPosition;

// 统一变量：模型视图投影矩阵
uniform mat4 uModelViewProjectionMatrix;

void main() {
  // 将顶点位置乘以模型视图投影矩阵
  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);

  // 设置点精灵大小（可选）
  gl_PointSize = 5.0;
}</code></pre>
            </div>

            <div class="explanation">
              <h4>代码解析：</h4>
              <ul>
                <li><strong>attribute</strong>：声明顶点属性，每个顶点有独立的值</li>
                <li><strong>uniform</strong>：声明全局统一变量，所有顶点共享相同的值</li>
                <li><strong>gl_Position</strong>：必须赋值的输出变量，表示顶点在裁剪空间的位置</li>
                <li><strong>gl_PointSize</strong>：可选的输出变量，定义点精灵的大小</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <h3>传递数据给片段着色器</h3>
            <div class="code-sample">
              <pre><code>// 顶点属性
attribute vec3 aPosition;
attribute vec3 aColor;

// 统一变量
uniform mat4 uModelViewProjectionMatrix;

// 传递给片段着色器的变量
varying vec3 vColor;

void main() {
  // 计算裁剪空间位置
  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);

  // 传递顶点颜色给片段着色器
  vColor = aColor;
}</code></pre>
            </div>

            <div class="explanation">
              <h4>varying 变量：</h4>
              <ul>
                <li>用于从顶点着色器向片段着色器传递数据</li>
                <li>在顶点着色器中赋值，在片段着色器中读取</li>
                <li>在光栅化过程中会被插值处理</li>
                <li>名称必须在顶点和片段着色器中保持一致</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <h3>顶点动画示例</h3>
            <div class="code-sample">
              <pre><code>attribute vec3 aPosition;
attribute float aOffset; // 每个顶点的偏移量

uniform mat4 uModelViewProjectionMatrix;
uniform float uTime; // 时间统一变量

varying vec3 vPosition;

void main() {
  // 基于时间计算正弦波偏移
  float wave = sin(uTime + aOffset * 3.0) * 0.2;

  // 创建新位置
  vec3 newPosition = aPosition;
  newPosition.y += wave;

  // 计算裁剪空间位置
  gl_Position = uModelViewProjectionMatrix * vec4(newPosition, 1.0);

  // 传递位置给片段着色器
  vPosition = newPosition;
}</code></pre>
            </div>

            <div class="explanation">
              <h4>顶点动画技术：</h4>
              <ul>
                <li>使用时间统一变量(uTime)驱动动画</li>
                <li>通过数学函数(如sin, cos)计算顶点偏移</li>
                <li>每个顶点可以使用不同的偏移量(aOffset)</li>
                <li>常用于创建波浪、旗帜飘动等效果</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 应用示例部分 -->
        <section v-show="activeSection === 2">
          <h2>顶点着色器应用示例</h2>

          <div class="card">
            <h3>顶点变换可视化</h3>
            <div class="visualization-container">
              <div class="controls">
                <div class="control-group">
                  <label>变换类型:</label>
                  <select v-model="transformType">
                    <option value="translation">平移</option>
                    <option value="rotation">旋转</option>
                    <option value="scale">缩放</option>
                    <option value="wave">波浪效果</option>
                  </select>
                </div>

                <div class="control-group" v-if="transformType === 'translation'">
                  <label>X轴平移: {{ translation.x.toFixed(2) }}</label>
                  <input type="range" v-model="translation.x" min="-1" max="1" step="0.01">
                </div>

                <div class="control-group" v-if="transformType === 'rotation'">
                  <label>旋转角度: {{ rotationAngle }}°</label>
                  <input type="range" v-model="rotationAngle" min="0" max="360">
                </div>

                <div class="control-group" v-if="transformType === 'scale'">
                  <label>缩放比例: {{ scaleFactor.toFixed(2) }}</label>
                  <input type="range" v-model="scaleFactor" min="0.1" max="2" step="0.01">
                </div>

                <div class="control-group" v-if="transformType === 'wave'">
                  <label>波浪频率: {{ waveFrequency.toFixed(2) }}</label>
                  <input type="range" v-model="waveFrequency" min="0.5" max="5" step="0.1">
                </div>
              </div>

              <div class="canvas-container">
                <canvas ref="webglCanvas"></canvas>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>顶点着色器在3D渲染中的作用</h3>
            <div class="role-grid">
              <div class="role">
                <div class="icon">🧩</div>
                <h4>模型变换</h4>
                <p>将模型从本地坐标空间转换到世界坐标空间</p>
              </div>
              <div class="role">
                <div class="icon">👁️</div>
                <h4>视图变换</h4>
                <p>根据相机位置调整顶点位置</p>
              </div>
              <div class="role">
                <div class="icon">📷</div>
                <h4>投影变换</h4>
                <p>将3D顶点投影到2D裁剪空间</p>
              </div>
              <div class="role">
                <div class="icon">🎭</div>
                <h4>蒙皮动画</h4>
                <p>实现骨骼动画中的顶点变换</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <footer>
      <p>顶点着色器是WebGL渲染管线的核心组件，掌握其工作原理和编程技巧是创建高性能WebGL应用的关键。</p>
      <div class="footer-links">
        <a href="https://webglfundamentals.org" target="_blank">WebGL基础教程</a>
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API" target="_blank">MDN WebGL文档</a>
        <a href="https://thebookofshaders.com" target="_blank">着色器之书</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

// 导航状态
const activeSection = ref(0);
const navItems = ref([
  { title: '基础概念' },
  { title: '代码实现' },
  { title: '应用示例' }
]);

// 变换控制
const transformType = ref('translation');
const translation = ref({ x: 0, y: 0, z: 0 });
const rotationAngle = ref(0);
const scaleFactor = ref(1);
const waveFrequency = ref(2);

// WebGL相关引用
const webglCanvas = ref<HTMLCanvasElement | null>(null);
let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
let animationFrameId: number | null = null;

// 顶点数据
const vertices = new Float32Array([
  // 前面
  -0.5, -0.5, 0.5,
  0.5, -0.5, 0.5,
  0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5,

  // 后面
  -0.5, -0.5, -0.5,
  0.5, -0.5, -0.5,
  0.5, 0.5, -0.5,
  -0.5, 0.5, -0.5,

  // 左面
  -0.5, -0.5, -0.5,
  -0.5, -0.5, 0.5,
  -0.5, 0.5, 0.5,
  -0.5, 0.5, -0.5,

  // 右面
  0.5, -0.5, -0.5,
  0.5, -0.5, 0.5,
  0.5, 0.5, 0.5,
  0.5, 0.5, -0.5,

  // 顶面
  -0.5, 0.5, -0.5,
  0.5, 0.5, -0.5,
  0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5,

  // 底面
  -0.5, -0.5, -0.5,
  0.5, -0.5, -0.5,
  0.5, -0.5, 0.5,
  -0.5, -0.5, 0.5
]);

// 索引数据
const indices = new Uint16Array([
  0, 1, 2, 0, 2, 3,    // 前面
  4, 5, 6, 4, 6, 7,    // 后面
  8, 9, 10, 8, 10, 11,  // 左面
  12, 13, 14, 12, 14, 15,   // 右面
  16, 17, 18, 16, 18, 19,   // 顶面
  20, 21, 22, 20, 22, 23    // 底面
]);

// 初始化WebGL
const initWebGL = () => {
  if (!webglCanvas.value) return;

  // 获取WebGL上下文
  gl = webglCanvas.value.getContext('webgl');
  if (!gl) {
    alert('您的浏览器不支持WebGL');
    return;
  }

  // 设置视口大小
  const canvas = webglCanvas.value;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);

  // 创建着色器程序
  program = createShaderProgram(gl);
  if (!program) return;

  // 设置顶点缓冲区
  setupVertexBuffer(gl, program);

  // 开始渲染循环
  render();
};

// 创建着色器程序
const createShaderProgram = (gl: WebGLRenderingContext): WebGLProgram | null => {
  // 顶点着色器源码
  const vsSource = `
    attribute vec3 aPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform float uTime;
    uniform float uWaveFrequency;
    uniform vec3 uTranslation;
    uniform float uRotationAngle;
    uniform float uScale;
    uniform int uTransformType;

    void main() {
      vec3 position = aPosition;

      // 应用缩放
      if (uTransformType == 2) {
        position *= uScale;
      }

      // 应用平移
      if (uTransformType == 0) {
        position += uTranslation;
      }

      // 应用旋转
      if (uTransformType == 1) {
        float angle = radians(uRotationAngle);
        mat3 rotationMatrix = mat3(
          cos(angle), 0.0, sin(angle),
          0.0, 1.0, 0.0,
          -sin(angle), 0.0, cos(angle)
        );
        position = rotationMatrix * position;
      }

      // 应用波浪效果
      if (uTransformType == 3) {
        float wave = sin(uTime + position.x * uWaveFrequency) * 0.1;
        position.y += wave;
      }

      // 计算最终位置
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(position, 1.0);
    }
  `;

  // 片段着色器源码
  const fsSource = `
    precision mediump float;

    void main() {
      // 简单的颜色
      gl_FragColor = vec4(0.2, 0.6, 0.9, 1.0);
    }
  `;

  // 编译着色器
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) return null;

  // 创建程序并链接
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('无法初始化着色器程序: ' + gl.getProgramInfoLog(program));
    return null;
  }

  gl.useProgram(program);
  return program;
};

// 编译着色器
const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('着色器编译错误: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

// 设置顶点缓冲区
const setupVertexBuffer = (
  gl: WebGLRenderingContext,
  program: WebGLProgram
) => {
  // 创建顶点缓冲区
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 获取位置属性位置并启用
  const positionLocation = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  // 创建索引缓冲区
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
};

// 渲染循环
const render = () => {
  if (!gl || !program || !webglCanvas.value) return;

  // 清除画布
  gl.clearColor(0.95, 0.95, 0.98, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 启用深度测试
  gl.enable(gl.DEPTH_TEST);

  // 设置投影矩阵
  const projectionMatrix = new Float32Array(16);
  const aspect = webglCanvas.value.clientWidth / webglCanvas.value.clientHeight;
  const fieldOfView = Math.PI / 4; // 45度
  const zNear = 0.1;
  const zFar = 100.0;

  // 透视投影矩阵
  const f = 1.0 / Math.tan(fieldOfView / 2);
  projectionMatrix[0] = f / aspect;
  projectionMatrix[5] = f;
  projectionMatrix[10] = -(zFar + zNear) / (zFar - zNear);
  projectionMatrix[11] = -1;
  projectionMatrix[14] = -(2 * zFar * zNear) / (zFar - zNear);

  // 设置模型视图矩阵
  const modelViewMatrix = new Float32Array(16);
  // 单位矩阵
  for (let i = 0; i < 16; i++) modelViewMatrix[i] = i % 5 === 0 ? 1 : 0;

  // 移动相机位置
  modelViewMatrix[14] = -3.0; // 在z轴负方向移动

  // 获取统一变量位置
  const projectionLocation = gl.getUniformLocation(program, 'uProjectionMatrix');
  const modelViewLocation = gl.getUniformLocation(program, 'uModelViewMatrix');
  const timeLocation = gl.getUniformLocation(program, 'uTime');
  const waveLocation = gl.getUniformLocation(program, 'uWaveFrequency');
  const translationLocation = gl.getUniformLocation(program, 'uTranslation');
  const rotationLocation = gl.getUniformLocation(program, 'uRotationAngle');
  const scaleLocation = gl.getUniformLocation(program, 'uScale');
  const transformLocation = gl.getUniformLocation(program, 'uTransformType');

  // 设置统一变量值
  gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);
  gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);
  gl.uniform1f(timeLocation, performance.now() / 1000);
  gl.uniform1f(waveLocation, waveFrequency.value);
  gl.uniform3f(
    translationLocation,
    translation.value.x,
    translation.value.y,
    translation.value.z
  );
  gl.uniform1f(rotationLocation, rotationAngle.value);
  gl.uniform1f(scaleLocation, scaleFactor.value);

  // 设置变换类型
  const transformTypeMap: Record<string, number> = {
    'translation': 0,
    'rotation': 1,
    'scale': 2,
    'wave': 3
  };
  gl.uniform1i(transformLocation, transformTypeMap[transformType.value]);

  // 绘制图形
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  // 继续动画循环
  animationFrameId = requestAnimationFrame(render);
};

// 组件挂载时初始化WebGL
onMounted(() => {
  initWebGL();

  // 监听窗口大小变化
  window.addEventListener('resize', initWebGL);
});

// 组件卸载时清理资源
onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('resize', initWebGL);
});

// 监听变换类型变化
watch(transformType, () => {
  // 重置参数
  translation.value = { x: 0, y: 0, z: 0 };
  rotationAngle.value = 0;
  scaleFactor.value = 1;
  waveFrequency.value = 2;
});
</script>

<style scoped lang="less">
@primary-color: #5e35b1;
@secondary-color: #7e57c2;
@accent-color: #d1c4e9;
@background-color: #f9f9f9;
@card-color: #ffffff;
@text-color: #333333;
@border-color: #e0e0e0;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.vertex-shader-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      color: @primary-color;
      margin-bottom: 15px;
      font-size: 2.5rem;
    }

    .overview {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: lighten(@accent-color, 15%);
      border-radius: 12px;
      font-size: 1.1rem;
    }
  }

  .content-wrapper {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .navigation {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      flex: none;
    }

    div {
      padding: 15px 20px;
      background: #f0f2f5;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: #e0e0ff;
        transform: translateX(5px);

        @media (max-width: 768px) {
          transform: translateY(-3px);
        }
      }

      &.active {
        background: @primary-color;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .content {
    flex: 1;

    section {
      margin-bottom: 30px;

      h2 {
        color: @primary-color;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid @border-color;
      }
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      h3 {
        color: darken(@primary-color, 10%);
        margin-bottom: 20px;
        font-size: 1.4rem;
      }

      h4 {
        color: @primary-color;
        margin: 15px 0 10px;
      }

      p {
        margin-bottom: 15px;
        line-height: 1.7;
      }

      ul {
        padding-left: 25px;
        margin-bottom: 20px;

        li {
          margin-bottom: 10px;
          line-height: 1.6;
        }
      }
    }

    .illustration {
      margin: 20px 0;

      .pipeline {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding: 20px;
        background: #f5f7ff;
        border-radius: 8px;

        .stage {
          padding: 12px 20px;
          background: #e0e0ff;
          border-radius: 6px;
          font-weight: 500;

          &.highlight {
            background: @primary-color;
            color: white;
            font-weight: bold;
          }
        }

        .arrow {
          color: #777;
          font-weight: bold;
        }
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;

      .feature {
        background: #f5f7ff;
        border-radius: 8px;
        padding: 20px;
        text-align: center;

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h4 {
          margin-bottom: 10px;
          color: @primary-color;
        }
      }
    }

    .io-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;

        th,
        td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        th {
          background-color: @primary-color;
          color: white;
          font-weight: bold;
        }

        tr:nth-child(even) {
          background-color: #f5f7ff;
        }
      }
    }

    .code-sample {
      background: #2d2d2d;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      overflow-x: auto;

      pre {
        margin: 0;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.5;

          .comment {
            color: #75715e;
          }

          .keyword {
            color: #f92672;
          }

          .function {
            color: #66d9ef;
          }

          .string {
            color: #a6e22e;
          }

          .number {
            color: #ae81ff;
          }
        }
      }
    }

    .explanation {
      background: #e9f5f1;
      border-radius: 8px;
      padding: 20px;
    }

    .visualization-container {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .controls {
        background: #f5f7ff;
        border-radius: 8px;
        padding: 20px;

        .control-group {
          margin-bottom: 15px;

          label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
          }

          select,
          input {
            width: 100%;
            padding: 10px;
            border: 1px solid @border-color;
            border-radius: 6px;
            background: white;
          }
        }
      }

      .canvas-container {
        width: 100%;
        height: 400px;
        background: #2d2d2d;
        border-radius: 8px;
        overflow: hidden;

        canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }

    .role-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;

      .role {
        background: #f5f7ff;
        border-radius: 8px;
        padding: 20px;
        text-align: center;

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h4 {
          margin-bottom: 10px;
          color: @primary-color;
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    padding: 25px;
    background-color: lighten(@accent-color, 10%);
    border-radius: 12px;
    text-align: center;
    font-size: 1.1rem;
    border-top: 2px solid @border-color;

    p {
      margin-bottom: 15px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .vertex-shader-container {
    padding: 15px;

    header h1 {
      font-size: 2rem;
    }
  }
}
</style>
