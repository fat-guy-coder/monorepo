<template>
  <div class="materials-container">
    <header class="page-header">
      <h1 class="title">Three.js 材质详解</h1>
      <p class="subtitle">探索3D渲染的核心 - 材质系统</p>
    </header>

    <main class="content">
      <!-- 材质概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">材质概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                材质(Material)是定义物体外观的核心组件，它决定了物体如何与光线交互，包括颜色、纹理、透明度、反射等视觉特性。
              </p>
              <div class="material-basics">
                <h3>材质基础概念</h3>
                <div class="concept-grid">
                  <div class="concept-item">
                    <div class="concept-icon">🎨</div>
                    <div class="concept-text">
                      <h4>颜色与纹理</h4>
                      <p>定义物体表面的基本颜色和图案</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">💡</div>
                    <div class="concept-text">
                      <h4>光照反应</h4>
                      <p>控制材质对光照的反射和吸收</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">⚡</div>
                    <div class="concept-text">
                      <h4>性能影响</h4>
                      <p>不同材质的计算复杂度和性能要求</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础材质 -->
      <section class="basic-materials-section">
        <div class="card">
          <h2 class="card-title">基础材质类型</h2>
          <div class="card-content">
            <div class="materials-grid">
              <!-- MeshBasicMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">MeshBasicMaterial</h3>
                  <span class="material-tag basic">基础</span>
                </div>
                <div class="material-content">
                  <div class="material-preview basic-preview">
                    <div class="preview-cube"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>不受光照影响</li>
                      <li>性能最佳</li>
                      <li>支持颜色、贴图</li>
                      <li>不支持阴影</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>不需要光照效果的简单物体、UI元素、线框显示</p>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: false,
  transparent: true,
  opacity: 0.8
})</code></pre>
                  </div>
                </div>
              </div>

              <!-- MeshLambertMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">MeshLambertMaterial</h3>
                  <span class="material-tag standard">标准</span>
                </div>
                <div class="material-content">
                  <div class="material-preview lambert-preview">
                    <div class="preview-cube"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>朗伯反射模型</li>
                      <li>受光照影响</li>
                      <li>性能较好</li>
                      <li>非光泽表面</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>哑光表面、纸张、布料等非反光材质</p>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.MeshLambertMaterial({
  color: 0xffffff,
  emissive: 0x000000
})</code></pre>
                  </div>
                </div>
              </div>

              <!-- MeshPhongMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">MeshPhongMaterial</h3>
                  <span class="material-tag standard">标准</span>
                </div>
                <div class="material-content">
                  <div class="material-preview phong-preview">
                    <div class="preview-cube"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>冯氏光照模型</li>
                      <li>支持镜面高光</li>
                      <li>光泽表面效果</li>
                      <li>计算成本中等</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>塑料、陶瓷、有光泽的材质</p>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0x111111,
  shininess: 30
})</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PBR材质 -->
      <section class="pbr-materials-section">
        <div class="card">
          <h2 class="card-title">PBR材质 (基于物理的渲染)</h2>
          <div class="card-content">
            <div class="pbr-intro">
              <p>PBR材质模拟真实世界的光照物理特性，提供更真实的渲染效果。</p>
            </div>
            <div class="materials-grid">
              <!-- MeshStandardMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">MeshStandardMaterial</h3>
                  <span class="material-tag pbr">PBR</span>
                </div>
                <div class="material-content">
                  <div class="material-preview standard-preview">
                    <div class="preview-cube"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>基于物理的渲染</li>
                      <li>金属度/粗糙度工作流</li>
                      <li>环境光遮蔽</li>
                      <li>计算成本较高</li>
                    </ul>
                    <h4>核心属性</h4>
                    <div class="property-grid">
                      <div class="property-item">
                        <span class="property-name">metalness</span>
                        <span class="property-desc">金属度</span>
                      </div>
                      <div class="property-item">
                        <span class="property-name">roughness</span>
                        <span class="property-desc">粗糙度</span>
                      </div>
                      <div class="property-item">
                        <span class="property-name">envMap</span>
                        <span class="property-desc">环境贴图</span>
                      </div>
                    </div>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.8,
  roughness: 0.2,
  envMap: environmentMap
})</code></pre>
                  </div>
                </div>
              </div>

              <!-- MeshPhysicalMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">MeshPhysicalMaterial</h3>
                  <span class="material-tag advanced">高级PBR</span>
                </div>
                <div class="material-content">
                  <div class="material-preview physical-preview">
                    <div class="preview-cube"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>StandardMaterial的扩展</li>
                      <li>支持清漆层</li>
                      <li>透射和厚度</li>
                      <li>更高级的光照效果</li>
                    </ul>
                    <h4>高级属性</h4>
                    <div class="property-grid">
                      <div class="property-item">
                        <span class="property-name">clearcoat</span>
                        <span class="property-desc">清漆强度</span>
                      </div>
                      <div class="property-item">
                        <span class="property-name">transmission</span>
                        <span class="property-desc">透射率</span>
                      </div>
                      <div class="property-item">
                        <span class="property-name">sheen</span>
                        <span class="property-desc">光泽度</span>
                      </div>
                    </div>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.5,
  roughness: 0.3,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1
})</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 特殊材质 -->
      <section class="special-materials-section">
        <div class="card">
          <h2 class="card-title">特殊用途材质</h2>
          <div class="card-content">
            <div class="materials-grid">
              <!-- ShaderMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">ShaderMaterial</h3>
                  <span class="material-tag custom">自定义</span>
                </div>
                <div class="material-content">
                  <div class="material-preview shader-preview">
                    <div class="preview-cube"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>完全自定义着色器</li>
                      <li>最大灵活性</li>
                      <li>需要GLSL知识</li>
                      <li>性能优化潜力大</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>自定义视觉效果、特殊材质、后处理</p>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.ShaderMaterial({
  vertexShader: vertexShaderCode,
  fragmentShader: fragmentShaderCode,
  uniforms: {
    time: { value: 0.0 }
  }
})</code></pre>
                  </div>
                </div>
              </div>

              <!-- PointsMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">PointsMaterial</h3>
                  <span class="material-tag special">特殊</span>
                </div>
                <div class="material-content">
                  <div class="material-preview points-preview">
                    <div class="preview-points"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>专为点云设计</li>
                      <li>支持点大小</li>
                      <li>可设置颜色</li>
                      <li>性能高效</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>粒子系统、点云数据、星空效果</p>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  sizeAttenuation: true
})</code></pre>
                  </div>
                </div>
              </div>

              <!-- LineBasicMaterial -->
              <div class="material-card">
                <div class="material-header">
                  <h3 class="material-name">LineBasicMaterial</h3>
                  <span class="material-tag special">特殊</span>
                </div>
                <div class="material-content">
                  <div class="material-preview line-preview">
                    <div class="preview-line"></div>
                  </div>
                  <div class="material-info">
                    <h4>特性</h4>
                    <ul>
                      <li>线条渲染</li>
                      <li>不受光照影响</li>
                      <li>可设置线宽</li>
                      <li>简单高效</li>
                    </ul>
                    <h4>使用场景</h4>
                    <p>线框、路径、轮廓线</p>
                  </div>
                  <div class="material-code">
                    <pre><code>new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 2
})</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 材质属性详解 -->
      <section class="properties-section">
        <div class="card">
          <h2 class="card-title">材质属性详解</h2>
          <div class="card-content">
            <div class="properties-grid">
              <div class="property-group">
                <h3>基础属性</h3>
                <div class="property-list">
                  <div class="property-detail">
                    <h4>color</h4>
                    <p>材质的基础颜色，使用THREE.Color表示</p>
                    <code>material.color = new THREE.Color(0xff0000)</code>
                  </div>
                  <div class="property-detail">
                    <h4>map</h4>
                    <p>颜色贴图，用于在材质表面显示纹理</p>
                    <code>material.map = textureLoader.load('texture.jpg')</code>
                  </div>
                  <div class="property-detail">
                    <h4>transparent & opacity</h4>
                    <p>控制材质的透明度</p>
                    <code>material.transparent = true; material.opacity = 0.5</code>
                  </div>
                </div>
              </div>

              <div class="property-group">
                <h3>PBR属性</h3>
                <div class="property-list">
                  <div class="property-detail">
                    <h4>metalness & roughness</h4>
                    <p>金属度和粗糙度，控制材质的光泽特性</p>
                    <code>material.metalness = 0.8; material.roughness = 0.2</code>
                  </div>
                  <div class="property-detail">
                    <h4>normalMap</h4>
                    <p>法线贴图，用于模拟表面细节</p>
                    <code>material.normalMap = normalTexture</code>
                  </div>
                  <div class="property-detail">
                    <h4>aoMap</h4>
                    <p>环境光遮蔽贴图，增强阴影细节</p>
                    <code>material.aoMap = aoTexture</code>
                  </div>
                </div>
              </div>

              <div class="property-group">
                <h3>高级属性</h3>
                <div class="property-list">
                  <div class="property-detail">
                    <h4>envMap</h4>
                    <p>环境贴图，用于反射和折射效果</p>
                    <code>material.envMap = environmentMap</code>
                  </div>
                  <div class="property-detail">
                    <h4>displacementMap</h4>
                    <p>位移贴图，真正改变几何体顶点位置</p>
                    <code>material.displacementMap = displacementTexture</code>
                  </div>
                  <div class="property-detail">
                    <h4>emissive</h4>
                    <p>自发光颜色，使材质看起来在发光</p>
                    <code>material.emissive = new THREE.Color(0x00ff00)</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能考虑 -->
      <section class="performance-section">
        <div class="card">
          <h2 class="card-title">性能优化建议</h2>
          <div class="card-content">
            <div class="performance-tips">
              <div class="tip-card">
                <div class="tip-icon">🚀</div>
                <div class="tip-content">
                  <h4>材质复用</h4>
                  <p>尽可能重用材质实例，避免创建过多相同材质</p>
                </div>
              </div>
              <div class="tip-card">
                <div class="tip-icon">📉</div>
                <div class="tip-content">
                  <h4>选择合适的材质</h4>
                  <p>根据需求选择复杂度合适的材质，避免过度使用PBR材质</p>
                </div>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🖼️</div>
                <div class="tip-content">
                  <h4>纹理优化</h4>
                  <p>使用合适分辨率的纹理，考虑纹理压缩和缓存</p>
                </div>
              </div>
              <div class="tip-card">
                <div class="tip-icon">⚡</div>
                <div class="tip-content">
                  <h4>着色器优化</h4>
                  <p>自定义着色器时注意性能，避免复杂计算</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加响应式数据或方法
</script>

<style lang="less" scoped>
.materials-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf7 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px 0;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0;
    font-weight: 300;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e9ecef;
  }
}

.overview-content {
  .intro-text {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 24px;
    text-align: center;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.concept-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .concept-icon {
    font-size: 2rem;
    margin-right: 16px;
  }

  .concept-text {
    h4 {
      margin: 0 0 4px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.material-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.material-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .material-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .material-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.basic {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.standard {
      background: #e8f5e8;
      color: #2e7d32;
    }

    &.pbr {
      background: #fff3e0;
      color: #f57c00;
    }

    &.advanced {
      background: #fce4ec;
      color: #c2185b;
    }

    &.custom {
      background: #e8eaf6;
      color: #3f51b5;
    }

    &.special {
      background: #e0f2f1;
      color: #00695c;
    }
  }
}

.material-content {
  padding: 20px;
}

.material-preview {
  height: 120px;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .preview-cube, .preview-points, .preview-line {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }
}

// 不同材质的预览样式
.basic-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .preview-cube {
    background: #4CAF50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.lambert-preview {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

  .preview-cube {
    background: #FF9800;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

.phong-preview {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

  .preview-cube {
    background: #2196F3;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
}

.standard-preview {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

  .preview-cube {
    background: linear-gradient(135deg, #8B4513, #DEB887);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

.physical-preview {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);

  .preview-cube {
    background: linear-gradient(135deg, #1a237e, #5c6bc0);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.5);
  }
}

.shader-preview {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

  .preview-cube {
    background: conic-gradient(from 0deg, #ff0080, #ff8c00, #40e0d0, #ff0080);
    animation: rotate 3s linear infinite;
  }
}

.points-preview {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);

  .preview-points {
    background:
      radial-gradient(circle at 20% 30%, #ff0000 2px, transparent 3px),
      radial-gradient(circle at 50% 70%, #00ff00 2px, transparent 3px),
      radial-gradient(circle at 80% 40%, #0000ff 2px, transparent 3px);
  }
}

.line-preview {
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);

  .preview-line {
    background: none;
    border: 3px solid #ff5722;
    border-radius: 0;
    transform: rotate(45deg);
  }
}

.material-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  ul {
    margin: 0 0 12px 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
      color: #555;
      font-size: 0.9rem;
    }
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.property-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 8px;
}

.property-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 4px;

  .property-name {
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    color: #d63384;
  }

  .property-desc {
    font-size: 0.8rem;
    color: #666;
  }
}

.material-code {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.pbr-intro {
  text-align: center;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;

  p {
    margin: 0;
    color: #555;
    font-size: 1rem;
  }
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.property-group {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
    padding-bottom: 8px;
    border-bottom: 2px solid #e9ecef;
  }
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.property-detail {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 1rem;
  }

  p {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 0.9rem;
  }

  code {
    display: block;
    background: #2d3748;
    color: #e2e8f0;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
  }
}

.performance-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tip-card {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .tip-icon {
    font-size: 1.5rem;
    margin-right: 16px;
  }

  .tip-content {
    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

// 动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .materials-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .materials-grid {
    grid-template-columns: 1fr;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }

  .performance-tips {
    grid-template-columns: 1fr;
  }

  .concept-grid {
    grid-template-columns: 1fr;
  }
}
</style>
