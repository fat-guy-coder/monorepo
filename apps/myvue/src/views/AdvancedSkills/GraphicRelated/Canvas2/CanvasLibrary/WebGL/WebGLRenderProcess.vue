<template>
  <div class="webgl-rendering">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">WebGL 渲染流程</h1>
        <p class="subtitle">深入理解从数据到像素的完整渲染过程</p>
        <div class="header-badge">核心概念</div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="content">
      <!-- 概述部分 -->
      <section class="overview-section">
        <div class="section-card">
          <h2 class="section-title">
            <span class="icon">🎯</span>
            渲染流程概述
          </h2>
          <div class="overview-content">
            <p>WebGL渲染流程是一个将3D数据转换为2D图像的复杂过程，涉及多个阶段的处理。理解这个流程对于优化WebGL应用性能至关重要。</p>
            <div class="info-box">
              <div class="info-icon">💡</div>
              <div class="info-content">
                <p><strong>关键概念：</strong>WebGL基于OpenGL ES 2.0，使用可编程渲染管线，开发者可以编写自定义的着色器来控制渲染过程。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 渲染管线图 -->
      <section class="pipeline-section">
        <h2 class="section-title">
          <span class="icon">📊</span>
          WebGL渲染管线
        </h2>
        <div class="pipeline-container">
          <div class="pipeline-track">
            <!-- 数据准备阶段 -->
            <div class="pipeline-stage" :class="{ active: activeStage === 0 }" @mouseenter="setActiveStage(0)">
              <div class="stage-header">
                <div class="stage-number">01</div>
                <h3 class="stage-title">数据准备</h3>
              </div>
              <div class="stage-content">
                <p>准备顶点数据、缓冲区对象和属性配置</p>
                <ul>
                  <li>顶点位置</li>
                  <li>颜色数据</li>
                  <li>纹理坐标</li>
                  <li>法线向量</li>
                </ul>
              </div>
              <div class="stage-connector"></div>
            </div>

            <!-- 顶点着色器阶段 -->
            <div class="pipeline-stage" :class="{ active: activeStage === 1 }" @mouseenter="setActiveStage(1)">
              <div class="stage-header">
                <div class="stage-number">02</div>
                <h3 class="stage-title">顶点着色器</h3>
              </div>
              <div class="stage-content">
                <p>处理每个顶点，执行坐标变换</p>
                <ul>
                  <li>模型变换</li>
                  <li>视图变换</li>
                  <li>投影变换</li>
                  <li>法线变换</li>
                </ul>
              </div>
              <div class="stage-connector"></div>
            </div>

            <!-- 图元装配 -->
            <div class="pipeline-stage" :class="{ active: activeStage === 2 }" @mouseenter="setActiveStage(2)">
              <div class="stage-header">
                <div class="stage-number">03</div>
                <h3 class="stage-title">图元装配</h3>
              </div>
              <div class="stage-content">
                <p>将顶点组装成几何图元</p>
                <ul>
                  <li>点、线、三角形</li>
                  <li>背面剔除</li>
                  <li>视锥体剔除</li>
                </ul>
              </div>
              <div class="stage-connector"></div>
            </div>

            <!-- 光栅化 -->
            <div class="pipeline-stage" :class="{ active: activeStage === 3 }" @mouseenter="setActiveStage(3)">
              <div class="stage-header">
                <div class="stage-number">04</div>
                <h3 class="stage-title">光栅化</h3>
              </div>
              <div class="stage-content">
                <p>将图元转换为像素片段</p>
                <ul>
                  <li>扫描转换</li>
                  <li>插值计算</li>
                  <li>深度值计算</li>
                </ul>
              </div>
              <div class="stage-connector"></div>
            </div>

            <!-- 片元着色器 -->
            <div class="pipeline-stage" :class="{ active: activeStage === 4 }" @mouseenter="setActiveStage(4)">
              <div class="stage-header">
                <div class="stage-number">05</div>
                <h3 class="stage-title">片元着色器</h3>
              </div>
              <div class="stage-content">
                <p>计算每个片元的最终颜色</p>
                <ul>
                  <li>纹理采样</li>
                  <li>光照计算</li>
                  <li>颜色混合</li>
                </ul>
              </div>
              <div class="stage-connector"></div>
            </div>

            <!-- 逐片元操作 -->
            <div class="pipeline-stage" :class="{ active: activeStage === 5 }" @mouseenter="setActiveStage(5)">
              <div class="stage-header">
                <div class="stage-number">06</div>
                <h3 class="stage-title">逐片元操作</h3>
              </div>
              <div class="stage-content">
                <p>最终处理决定像素颜色</p>
                <ul>
                  <li>深度测试</li>
                  <li>模板测试</li>
                  <li>颜色混合</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 详细阶段说明 -->
      <section class="stages-section">
        <h2 class="section-title">
          <span class="icon">🔍</span>
          详细阶段说明
        </h2>
        <div class="stages-content">
          <!-- 数据准备阶段 -->
          <div class="stage-detail" :class="{ active: activeStage === 0 }">
            <div class="detail-header">
              <h3 class="detail-title">数据准备阶段</h3>
              <div class="detail-badge">基础</div>
            </div>
            <div class="detail-content">
              <p>在这个阶段，我们需要准备所有渲染所需的数据，包括顶点位置、颜色、纹理坐标和法线等信息。</p>

              <div class="code-example">
                <div class="code-header">创建缓冲区示例</div>
                <pre><code>// 创建顶点缓冲区
const vertices = new Float32Array([
  -0.5, -0.5, 0.0,  // 左下角
   0.5, -0.5, 0.0,  // 右下角
   0.0,  0.5, 0.0   // 顶部
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 设置顶点属性指针
gl.vertexAttribPointer(
  positionAttributeLocation, // 属性位置
  3,                         // 每个顶点的分量数
  gl.FLOAT,                  // 数据类型
  false,                     // 是否归一化
  0,                         // 步长
  0                          // 偏移量
);
gl.enableVertexAttribArray(positionAttributeLocation);</code></pre>
              </div>

              <div class="key-points">
                <h4>关键要点：</h4>
                <ul>
                  <li>使用<code>gl.createBuffer()</code>创建缓冲区对象</li>
                  <li>通过<code>gl.bindBuffer()</code>绑定缓冲区</li>
                  <li>使用<code>gl.bufferData()</code>上传数据到GPU</li>
                  <li>使用<code>gl.vertexAttribPointer()</code>配置属性指针</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 顶点着色器阶段 -->
          <div class="stage-detail" :class="{ active: activeStage === 1 }">
            <div class="detail-header">
              <h3 class="detail-title">顶点着色器阶段</h3>
              <div class="detail-badge">核心</div>
            </div>
            <div class="detail-content">
              <p>顶点着色器对每个顶点执行一次，主要负责坐标变换和顶点属性的计算。</p>

              <div class="code-example">
                <div class="code-header">顶点着色器示例</div>
                <pre><code>// 顶点着色器源码
const vertexShaderSource = `
  attribute vec4 a_position;
  attribute vec2 a_texCoord;
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;

  varying vec2 v_texCoord;

  void main() {
    // 应用模型视图和投影变换
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;

    // 传递纹理坐标到片元着色器
    v_texCoord = a_texCoord;
  }
`;</code></pre>
              </div>

              <div class="transform-visual">
                <h4>坐标变换流程：</h4>
                <div class="transform-steps">
                  <div class="transform-step">
                    <span class="step-label">局部坐标</span>
                    <span class="step-arrow">→</span>
                  </div>
                  <div class="transform-step">
                    <span class="step-label">世界坐标</span>
                    <span class="step-arrow">→</span>
                  </div>
                  <div class="transform-step">
                    <span class="step-label">视图坐标</span>
                    <span class="step-arrow">→</span>
                  </div>
                  <div class="transform-step">
                    <span class="step-label">裁剪坐标</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 图元装配阶段 -->
          <div class="stage-detail" :class="{ active: activeStage === 2 }">
            <div class="detail-header">
              <h3 class="detail-title">图元装配阶段</h3>
              <div class="detail-badge">处理</div>
            </div>
            <div class="detail-content">
              <p>在这个阶段，顶点被组装成点、线或三角形等基本图元，并进行裁剪和剔除操作。</p>

              <div class="primitives-grid">
                <div class="primitive-card">
                  <div class="primitive-icon">●</div>
                  <h4>点 (POINTS)</h4>
                  <p>单个顶点，常用于粒子系统</p>
                </div>
                <div class="primitive-card">
                  <div class="primitive-icon">─</div>
                  <h4>线 (LINES)</h4>
                  <p>两个顶点组成的线段</p>
                </div>
                <div class="primitive-card">
                  <div class="primitive-icon">△</div>
                  <h4>三角形 (TRIANGLES)</h4>
                  <p>三个顶点组成的三角形，最常用的图元</p>
                </div>
              </div>

              <div class="culling-info">
                <h4>剔除操作：</h4>
                <ul>
                  <li><strong>背面剔除：</strong>移除背对相机的三角形，提高性能</li>
                  <li><strong>视锥体剔除：</strong>移除相机视野外的图元</li>
                  <li><strong>裁剪：</strong>将超出裁剪空间的图元进行裁剪</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 光栅化阶段 -->
          <div class="stage-detail" :class="{ active: activeStage === 3 }">
            <div class="detail-header">
              <h3 class="detail-title">光栅化阶段</h3>
              <div class="detail-badge">转换</div>
            </div>
            <div class="detail-content">
              <p>光栅化将几何图元转换为像素片段，计算每个片段的位置和插值属性。</p>

              <div class="rasterization-visual">
                <div class="triangle-grid">
                  <div class="grid-container">
                    <div class="triangle-outline"></div>
                    <div class="fragment" v-for="fragment in fragments" :key="fragment.id"
                         :style="fragment.style"></div>
                  </div>
                </div>
                <p class="visual-caption">三角形光栅化过程：几何图元被转换为像素片段</p>
              </div>

              <div class="interpolation-info">
                <h4>插值计算：</h4>
                <p>在光栅化过程中，顶点属性（如颜色、纹理坐标、法线）会在三角形表面进行插值计算，为每个片段生成相应的属性值。</p>
              </div>
            </div>
          </div>

          <!-- 片元着色器阶段 -->
          <div class="stage-detail" :class="{ active: activeStage === 4 }">
            <div class="detail-header">
              <h3 class="detail-title">片元着色器阶段</h3>
              <div class="detail-badge">着色</div>
            </div>
            <div class="detail-content">
              <p>片元着色器对每个片段执行一次，计算最终的颜色值，可以应用纹理、光照和其他视觉效果。</p>

              <div class="code-example">
                <div class="code-header">片元着色器示例</div>
                <pre><code>// 片元着色器源码
const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D u_texture;
  uniform vec3 u_lightDirection;
  uniform vec3 u_lightColor;

  varying vec2 v_texCoord;
  varying vec3 v_normal;

  void main() {
    // 纹理采样
    vec4 textureColor = texture2D(u_texture, v_texCoord);

    // 简单光照计算
    float diffuse = max(dot(v_normal, u_lightDirection), 0.0);
    vec3 lightEffect = u_lightColor * diffuse;

    // 最终颜色计算
    gl_FragColor = vec4(textureColor.rgb * lightEffect, textureColor.a);
  }
`;</code></pre>
              </div>

              <div class="shader-effects">
                <h4>常见着色效果：</h4>
                <div class="effects-grid">
                  <div class="effect-item">
                    <div class="effect-dot" style="background: linear-gradient(45deg, #ff6b6b, #ffa726)"></div>
                    <span>纹理映射</span>
                  </div>
                  <div class="effect-item">
                    <div class="effect-dot" style="background: linear-gradient(45deg, #4ecdc4, #45b7d1)"></div>
                    <span>光照计算</span>
                  </div>
                  <div class="effect-item">
                    <div class="effect-dot" style="background: linear-gradient(45deg, #96ceb4, #ffeaa7)"></div>
                    <span>法线映射</span>
                  </div>
                  <div class="effect-item">
                    <div class="effect-dot" style="background: linear-gradient(45deg, #dda0dd, #98d8c8)"></div>
                    <span>环境光遮蔽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 逐片元操作阶段 -->
          <div class="stage-detail" :class="{ active: activeStage === 5 }">
            <div class="detail-header">
              <h3 class="detail-title">逐片元操作阶段</h3>
              <div class="detail-badge">最终处理</div>
            </div>
            <div class="detail-content">
              <p>这是渲染管线的最后阶段，决定哪些片段最终写入帧缓冲区，并进行混合操作。</p>

              <div class="fragment-operations">
                <div class="operation-card">
                  <h4>深度测试</h4>
                  <p>比较片段的深度值与深度缓冲区中的值，决定是否丢弃该片段</p>
                  <div class="operation-visual">
                    <div class="depth-comparison">
                      <div class="depth-buffer"></div>
                      <div class="depth-fragment"></div>
                    </div>
                  </div>
                </div>

                <div class="operation-card">
                  <h4>模板测试</h4>
                  <p>根据模板缓冲区的值决定是否渲染片段，常用于实现特殊效果</p>
                  <div class="operation-visual">
                    <div class="stencil-pattern"></div>
                  </div>
                </div>

                <div class="operation-card">
                  <h4>颜色混合</h4>
                  <p>将片段颜色与帧缓冲区中的颜色进行混合，实现透明效果</p>
                  <div class="operation-visual">
                    <div class="blending-demo">
                      <div class="bg-color"></div>
                      <div class="fg-color"></div>
                      <div class="blended-color"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="final-output">
                <h4>最终输出：</h4>
                <p>通过所有测试的片段颜色将被写入帧缓冲区，最终显示在屏幕上。</p>
                <div class="code-example">
                  <div class="code-header">绘制调用</div>
                  <pre><code>// 清除颜色和深度缓冲区
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// 启用深度测试
gl.enable(gl.DEPTH_TEST);

// 启用混合（用于透明效果）
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

// 执行绘制
gl.drawArrays(gl.TRIANGLES, 0, vertexCount);</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能优化建议 -->
      <section class="optimization-section">
        <div class="section-card">
          <h2 class="section-title">
            <span class="icon">⚡</span>
            性能优化建议
          </h2>
          <div class="optimization-tips">
            <div class="tip-card">
              <div class="tip-icon">🚀</div>
              <h3>减少状态切换</h3>
              <p>将使用相同着色器和状态的物体一起渲染，减少WebGL状态切换开销。</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">💾</div>
              <h3>使用索引绘制</h3>
              <p>使用<code>gl.drawElements()</code>代替<code>gl.drawArrays()</code>，减少顶点数据重复。</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">📐</div>
              <h3>优化顶点数据</h3>
              <p>使用交错顶点数组，减少缓冲区绑定次数，提高数据访问效率。</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">🎯</div>
              <h3>合理使用剔除</h3>
              <p>启用背面剔除和视锥体剔除，减少不必要的渲染计算。</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页面底部 -->
    <footer class="page-footer">
      <div class="footer-content">
        <p class="footer-text">
          理解WebGL渲染流程是优化3D应用性能的关键。每个阶段都有其特定的优化策略，合理利用这些知识可以显著提升应用性能。
        </p>
        <div class="footer-links">
          <a href="#" class="footer-link">WebGL官方文档</a>
          <a href="#" class="footer-link">OpenGL ES参考</a>
          <a href="#" class="footer-link">着色器编程指南</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 当前激活的阶段
const activeStage = ref(0)

// 设置激活阶段
const setActiveStage = (stage: number) => {
  activeStage.value = stage
}

// 光栅化演示片段
const fragments = ref<Array<{id: number, style: string}>>([])

// 初始化光栅化演示
onMounted(() => {
  // 生成光栅化演示的片段
  const fragmentCount = 50
  for (let i = 0; i < fragmentCount; i++) {
    const left = Math.random() * 80 + 10
    const top = Math.random() * 60 + 20
    const size = Math.random() * 10 + 5
    const opacity = Math.random() * 0.5 + 0.3

    fragments.value.push({
      id: i,
      style: `left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; opacity: ${opacity};`
    })
  }
})
</script>

<style lang="less" scoped>
.webgl-rendering {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #2d3748;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf1 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  padding: 3rem 0 2rem;

  .header-content {
    position: relative;
  }

  .title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #718096;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .header-badge {
    display: inline-block;
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 3rem;
}

.section-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .icon {
    font-size: 1.5rem;
  }
}

.overview-content {
  p {
    margin-bottom: 1.25rem;
    color: #4a5568;
    font-size: 1.05rem;
    line-height: 1.7;
  }
}

.info-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  padding: 1.25rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  margin: 1.5rem 0;

  .info-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .info-content {
    p {
      margin: 0;
      color: #5a67d8;
      font-weight: 500;
    }
  }
}

// 渲染管线样式
.pipeline-container {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
}

.pipeline-track {
  display: flex;
  min-width: 1000px;
  gap: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    z-index: 1;
  }
}

.pipeline-stage {
  flex: 1;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  cursor: pointer;

  &.active {
    transform: translateY(-5px);

    .stage-header {
      background: linear-gradient(135deg, #667eea, #764ba2);

      .stage-number, .stage-title {
        color: white;
      }
    }
  }

  .stage-header {
    background: white;
    border: 2px solid #667eea;
    border-radius: 12px;
    padding: 1.5rem 1rem;
    text-align: center;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
  }

  .stage-number {
    font-size: 0.875rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  .stage-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }

  .stage-content {
    background: #f7fafc;
    border-radius: 8px;
    padding: 1rem;

    p {
      font-size: 0.875rem;
      color: #4a5568;
      margin: 0 0 0.75rem 0;
      font-weight: 500;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      font-size: 0.75rem;
      color: #718096;
      padding: 0.25rem 0;

      &::before {
        content: '•';
        color: #667eea;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }

  .stage-connector {
    position: absolute;
    top: 60px;
    right: -10px;
    width: 20px;
    height: 3px;
    background: #667eea;
    z-index: 3;

    &::after {
      content: '';
      position: absolute;
      right: -5px;
      top: -4px;
      width: 0;
      height: 0;
      border-left: 8px solid #667eea;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
}

// 详细阶段说明
.stages-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stage-detail {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  max-height: 0;
  overflow: hidden;

  &.active {
    max-height: 2000px;
    border-color: #667eea;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: #f7fafc;
    border-radius: 12px 12px 0 0;
  }

  .detail-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }

  .detail-badge {
    background: #667eea;
    color: white;
    padding: 0.375rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .detail-content {
    padding: 1.5rem;

    p {
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
  }
}

.code-example {
  background: #2d3748;
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;

  .code-header {
    background: #4a5568;
    color: #cbd5e0;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  pre {
    margin: 0;
    padding: 1.25rem;
    overflow-x: auto;
  }

  code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    color: #e2e8f0;
  }
}

.key-points {
  background: #f0fff4;
  border-left: 4px solid #48bb78;
  padding: 1rem 1.5rem;
  border-radius: 0 8px 8px 0;

  h4 {
    color: #2f855a;
    margin: 0 0 0.75rem 0;
    font-size: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.375rem 0;
    color: #2d3748;

    code {
      background: #e2e8f0;
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: #2d3748;
    }

    &::before {
      content: '✓';
      color: #48bb78;
      font-weight: bold;
      display: inline-block;
      width: 1.5em;
      margin-left: -1.5em;
    }
  }
}

// 变换可视化
.transform-visual {
  margin: 1.5rem 0;

  h4 {
    color: #4a5568;
    margin-bottom: 1rem;
  }
}

.transform-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
}

.transform-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.step-label {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  min-width: 80px;
}

.step-arrow {
  font-size: 1.5rem;
  color: #a0aec0;
  margin: 0.5rem 0;
}

// 图元网格
.primitives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.primitive-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .primitive-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    color: #667eea;
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 0.875rem;
    color: #718096;
    margin: 0;
  }
}

.culling-info {
  background: #fffaf0;
  border-left: 4px solid #ed8936;
  padding: 1rem 1.5rem;
  border-radius: 0 8px 8px 0;

  h4 {
    color: #dd6b20;
    margin: 0 0 0.75rem 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.375rem 0;
    color: #744210;

    strong {
      color: #dd6b20;
    }
  }
}

// 光栅化可视化
.rasterization-visual {
  margin: 1.5rem 0;

  .triangle-grid {
    background: #f7fafc;
    border-radius: 8px;
    padding: 2rem;
    position: relative;
    height: 200px;
  }

  .grid-container {
    position: relative;
    width: 100%;
    height: 100%;
    background:
      linear-gradient(90deg, #e2e8f0 1px, transparent 1px) 0 0 / 20px 20px,
      linear-gradient(0deg, #e2e8f0 1px, transparent 1px) 0 0 / 20px 20px;
  }

  .triangle-outline {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    background: rgba(102, 126, 234, 0.1);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    border: 2px solid #667eea;
  }

  .fragment {
    position: absolute;
    background: rgba(102, 126, 234, 0.6);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .visual-caption {
    text-align: center;
    color: #718096;
    font-size: 0.875rem;
    margin-top: 0.75rem;
    font-style: italic;
  }
}

.interpolation-info {
  background: #f0f9ff;
  border-left: 4px solid #63b3ed;
  padding: 1rem 1.5rem;
  border-radius: 0 8px 8px 0;

  h4 {
    color: #3182ce;
    margin: 0 0 0.75rem 0;
  }

  p {
    color: #2c5282;
    margin: 0;
  }
}

// 着色效果
.shader-effects {
  margin: 1.5rem 0;

  h4 {
    color: #4a5568;
    margin-bottom: 1rem;
  }
}

.effects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.effect-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .effect-dot {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  span {
    font-size: 0.875rem;
    color: #4a5568;
    font-weight: 500;
  }
}

// 逐片元操作
.fragment-operations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.operation-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;

  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 0.75rem 0;
  }

  p {
    color: #718096;
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.operation-visual {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.depth-comparison {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.depth-buffer, .depth-fragment {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}

.depth-buffer {
  background: linear-gradient(135deg, #a0aec0, #718096);
  position: relative;

  &::after {
    content: '深度值: 0.5';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: #718096;
    white-space: nowrap;
  }
}

.depth-fragment {
  background: linear-gradient(135deg, #667eea, #764ba2);
  position: relative;

  &::after {
    content: '深度值: 0.3';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: #667eea;
    white-space: nowrap;
  }
}

.stencil-pattern {
  width: 80px;
  height: 50px;
  background:
    linear-gradient(45deg, #e2e8f0 25%, transparent 25%),
    linear-gradient(-45deg, #e2e8f0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e2e8f0 75%),
    linear-gradient(-45deg, transparent 75%, #e2e8f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  border: 2px solid #a0aec0;
}

.blending-demo {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .bg-color, .fg-color, .blended-color {
    width: 30px;
    height: 30px;
    border-radius: 4px;
  }

  .bg-color {
    background: #667eea;
  }

  .fg-color {
    background: rgba(237, 137, 54, 0.6);
  }

  .blended-color {
    background: #8b6bc7; // 混合后的颜色
  }

  &::before {
    content: '+';
    color: #718096;
  }

  &::after {
    content: '=';
    color: #718096;
  }
}

.final-output {
  margin-top: 2rem;

  h4 {
    color: #4a5568;
    margin-bottom: 0.75rem;
  }

  p {
    color: #718096;
    margin-bottom: 1.5rem;
  }
}

// 性能优化
.optimization-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .tip-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 0.75rem 0;
  }

  p {
    color: #718096;
    margin: 0;
    line-height: 1.5;
    font-size: 0.9rem;
  }
}

.page-footer {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .footer-content {
    text-align: center;
  }

  .footer-text {
    color: #4a5568;
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
    line-height: 1.7;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .footer-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      color: #5a67d8;
      text-decoration: underline;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .webgl-rendering {
    padding: 0 1rem;
  }

  .page-header .title {
    font-size: 2.25rem;
  }

  .pipeline-track {
    flex-direction: column;
    gap: 1rem;
    min-width: auto;

    &::before {
      display: none;
    }
  }

  .pipeline-stage .stage-connector {
    display: none;
  }

  .primitives-grid,
  .optimization-tips {
    grid-template-columns: 1fr;
  }

  .fragment-operations {
    grid-template-columns: 1fr;
  }

  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
