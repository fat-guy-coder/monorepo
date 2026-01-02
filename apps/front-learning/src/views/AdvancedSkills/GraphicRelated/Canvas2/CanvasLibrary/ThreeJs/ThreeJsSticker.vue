<template>
  <div class="textures-container">
    <header class="page-header">
      <h1 class="title">Three.js 贴图系统</h1>
      <p class="subtitle">掌握3D材质表现的核心技术</p>
    </header>

    <main class="content">
      <!-- 概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">贴图概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                贴图(Texture)是Three.js中用于定义物体表面视觉特性的核心组件，通过将2D图像映射到3D几何体上来创建丰富的视觉效果。
              </p>
              <div class="texture-basics">
                <h3>贴图基础概念</h3>
                <div class="concept-grid">
                  <div class="concept-item">
                    <div class="concept-icon">🖼️</div>
                    <div class="concept-text">
                      <h4>UV映射</h4>
                      <p>2D图像到3D表面的投影机制</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">🎛️</div>
                    <div class="concept-text">
                      <h4>纹理坐标</h4>
                      <p>定义图像在几何体上的对应关系</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">🔄</div>
                    <div class="concept-text">
                      <h4>环绕模式</h4>
                      <p>控制贴图在边界外的重复方式</p>
                    </div>
                  </div>
                  <div class="concept-item">
                    <div class="concept-icon">📐</div>
                    <div class="concept-text">
                      <h4>过滤模式</h4>
                      <p>控制贴图的缩放和采样方式</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础贴图 -->
      <section class="basic-textures-section">
        <div class="card">
          <h2 class="card-title">基础贴图类型</h2>
          <div class="card-content">
            <div class="textures-grid">
              <!-- 颜色贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">颜色贴图 (map)</h3>
                  <span class="texture-tag basic">基础</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview color-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>定义物体表面的基础颜色和图案，是最常用的贴图类型</p>
                    <h4>特性</h4>
                    <ul>
                      <li>定义表面颜色和图案</li>
                      <li>支持各种图像格式</li>
                      <li>可控制重复和偏移</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load('textures/color.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap
});</code></pre>
                  </div>
                </div>
              </div>

              <!-- 法线贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">法线贴图 (normalMap)</h3>
                  <span class="texture-tag advanced">高级</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview normal-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>模拟表面细节而不增加几何复杂度，通过改变表面法线方向创建凹凸效果</p>
                    <h4>特性</h4>
                    <ul>
                      <li>模拟表面凹凸细节</li>
                      <li>不增加顶点数量</li>
                      <li>需要切线空间数据</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>const normalMap = textureLoader.load('textures/normal.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap
});</code></pre>
                  </div>
                </div>
              </div>

              <!-- 粗糙度贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">粗糙度贴图 (roughnessMap)</h3>
                  <span class="texture-tag pbr">PBR</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview roughness-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>控制表面不同区域的粗糙程度，影响光线的散射和反射</p>
                    <h4>特性</h4>
                    <ul>
                      <li>定义表面粗糙度变化</li>
                      <li>灰度图（黑色光滑，白色粗糙）</li>
                      <li>PBR工作流核心</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>const roughnessMap = textureLoader.load('textures/roughness.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  roughnessMap: roughnessMap,
  roughness: 1.0  // 作为乘数
});</code></pre>
                  </div>
                </div>
              </div>

              <!-- 金属度贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">金属度贴图 (metalnessMap)</h3>
                  <span class="texture-tag pbr">PBR</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview metalness-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>定义表面不同区域的金属特性，控制反射和吸收光线的方式</p>
                    <h4>特性</h4>
                    <ul>
                      <li>定义金属和非金属区域</li>
                      <li>灰度图（黑色非金属，白色金属）</li>
                      <li>影响反射和漫反射比例</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>const metalnessMap = textureLoader.load('textures/metalness.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  metalnessMap: metalnessMap,
  metalness: 1.0  // 作为乘数
});</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级贴图 -->
      <section class="advanced-textures-section">
        <div class="card">
          <h2 class="card-title">高级贴图类型</h2>
          <div class="card-content">
            <div class="textures-grid">
              <!-- 环境光遮蔽贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">环境光遮蔽贴图 (aoMap)</h3>
                  <span class="texture-tag advanced">高级</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview ao-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>模拟环境光在表面凹陷区域的遮蔽效果，增强阴影细节和深度感</p>
                    <h4>特性</h4>
                    <ul>
                      <li>增强几何体细节感知</li>
                      <li>灰度图（黑色完全遮蔽，白色无遮蔽）</li>
                      <li>需要第二组UV坐标</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>const aoMap = textureLoader.load('textures/ao.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  aoMap: aoMap
});

// 需要设置第二组UV
geometry.setAttribute('uv2', new THREE.BufferAttribute(uvs, 2));</code></pre>
                  </div>
                </div>
              </div>

              <!-- 位移贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">位移贴图 (displacementMap)</h3>
                  <span class="texture-tag advanced">高级</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview displacement-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>真正改变几何体顶点位置，创建真实的表面凹凸，性能开销较大</p>
                    <h4>特性</h4>
                    <ul>
                      <li>真正改变几何形状</li>
                      <li>需要高细分几何体</li>
                      <li>性能开销较大</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>const displacementMap = textureLoader.load('textures/displacement.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  displacementMap: displacementMap,
  displacementScale: 0.1  // 位移强度
});

// 需要足够细分的几何体
const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);</code></pre>
                  </div>
                </div>
              </div>

              <!-- 环境贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">环境贴图 (envMap)</h3>
                  <span class="texture-tag pbr">PBR</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview env-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>模拟物体对环境反射，创建金属、玻璃等反射材质的关键</p>
                    <h4>特性</h4>
                    <ul>
                      <li>模拟环境反射</li>
                      <li>支持立方体贴图和等距矩形贴图</li>
                      <li>需要HDR贴图获得最佳效果</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>// 立方体贴图方式
const envMap = new THREE.CubeTextureLoader()
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

// 等距矩形贴图方式
const envMap = new THREE.TextureLoader().load('environment.hdr');
envMap.mapping = THREE.EquirectangularReflectionMapping;

const material = new THREE.MeshStandardMaterial({
  envMap: envMap,
  metalness: 0.8,
  roughness: 0.2
});</code></pre>
                  </div>
                </div>
              </div>

              <!-- 发光贴图 -->
              <div class="texture-card">
                <div class="texture-header">
                  <h3 class="texture-name">发光贴图 (emissiveMap)</h3>
                  <span class="texture-tag special">特殊</span>
                </div>
                <div class="texture-content">
                  <div class="texture-preview emissive-preview">
                    <div class="preview-object"></div>
                  </div>
                  <div class="texture-info">
                    <h4>描述</h4>
                    <p>使表面特定区域看起来在发光，不受光照影响，常用于创建自发光效果</p>
                    <h4>特性</h4>
                    <ul>
                      <li>创建自发光效果</li>
                      <li>不受场景光照影响</li>
                      <li>可控制发光颜色和强度</li>
                    </ul>
                  </div>
                  <div class="texture-code">
                    <pre><code>const emissiveMap = textureLoader.load('textures/emissive.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  emissiveMap: emissiveMap,
  emissive: new THREE.Color(0x00ff00),  // 发光颜色
  emissiveIntensity: 1.0  // 发光强度
});</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 贴图加载与管理 -->
      <section class="loading-section">
        <div class="card">
          <h2 class="card-title">贴图加载与管理</h2>
          <div class="card-content">
            <div class="loading-content">
              <div class="loading-methods">
                <h3>加载方法</h3>
                <div class="method-grid">
                  <div class="method-item">
                    <h4>TextureLoader</h4>
                    <p>基础贴图加载器，支持常见格式</p>
                    <div class="code-block">
                      <pre><code>const loader = new THREE.TextureLoader();
const texture = loader.load('image.jpg',
  (texture) => {
    // 加载完成回调
  },
  (progress) => {
    // 进度回调
  },
  (error) => {
    // 错误回调
  }
);</code></pre>
                    </div>
                  </div>
                  <div class="method-item">
                    <h4>CubeTextureLoader</h4>
                    <p>立方体贴图加载器，用于环境贴图</p>
                    <div class="code-block">
                      <pre><code>const cubeLoader = new THREE.CubeTextureLoader();
const envMap = cubeLoader.load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
]);</code></pre>
                    </div>
                  </div>
                  <div class="method-item">
                    <h4>HDR贴图加载</h4>
                    <p>使用RGBELoader加载HDR环境贴图</p>
                    <div class="code-block">
                      <pre><code>import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const hdrLoader = new RGBELoader();
hdrLoader.load('environment.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div class="texture-properties">
                <h3>贴图属性配置</h3>
                <div class="properties-grid">
                  <div class="property-item">
                    <h4>环绕模式 (Wrapping)</h4>
                    <div class="code-block">
                      <pre><code>// 重复模式
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 2);  // 重复2次

// 镜像重复
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

// 边缘钳制
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;</code></pre>
                    </div>
                  </div>
                  <div class="property-item">
                    <h4>过滤模式 (Filtering)</h4>
                    <div class="code-block">
                      <pre><code>// 放大过滤
texture.magFilter = THREE.LinearFilter;  // 平滑
texture.magFilter = THREE.NearestFilter; // 像素化

// 缩小过滤
texture.minFilter = THREE.LinearMipmapLinearFilter; // 高质量
texture.minFilter = THREE.NearestMipmapNearestFilter; // 性能优先

// 各向异性过滤
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();</code></pre>
                    </div>
                  </div>
                  <div class="property-item">
                    <h4>其他属性</h4>
                    <div class="code-block">
                      <pre><code>// 偏移和旋转
texture.offset.set(0.5, 0.5);  // 偏移50%
texture.rotation = Math.PI / 4; // 旋转45度
texture.center.set(0.5, 0.5);   // 旋转中心

// 编码和色彩空间
texture.encoding = THREE.sRGBEncoding;
texture.colorSpace = THREE.SRGBColorSpace;</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能优化 -->
      <section class="performance-section">
        <div class="card">
          <h2 class="card-title">性能优化策略</h2>
          <div class="card-content">
            <div class="performance-tips">
              <div class="tip-grid">
                <div class="tip-item">
                  <div class="tip-icon">📏</div>
                  <div class="tip-content">
                    <h4>合适的分辨率</h4>
                    <p>根据物体在屏幕中的大小选择合适分辨率的贴图，避免过度使用高分辨率贴图</p>
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon">🧩</div>
                  <div class="tip-content">
                    <h4>纹理图集</h4>
                    <p>将多个小贴图合并到一张大贴图中，减少纹理切换开销</p>
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon">🗜️</div>
                  <div class="tip-content">
                    <h4>压缩格式</h4>
                    <p>使用KTX2、Basis Universal等压缩格式减少内存占用和加载时间</p>
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon">🔄</div>
                  <div class="tip-content">
                    <h4>贴图复用</h4>
                    <p>在不同物体间复用相同的贴图实例，减少GPU内存占用</p>
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon">🎯</div>
                  <div class="tip-content">
                    <h4>Mipmap优化</h4>
                    <p>合理使用mipmap和适当的过滤模式平衡质量和性能</p>
                  </div>
                </div>
                <div class="tip-item">
                  <div class="tip-icon">⚡</div>
                  <div class="tip-content">
                    <h4>渐进加载</h4>
                    <p>对大型贴图使用渐进式加载，优先加载低分辨率版本</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 完整示例 -->
      <section class="example-section">
        <div class="card">
          <h2 class="card-title">完整材质示例</h2>
          <div class="card-content">
            <div class="example-content">
              <div class="code-example">
                <h3>完整的PBR材质配置</h3>
                <pre><code>// 创建纹理加载器
const textureLoader = new THREE.TextureLoader();

// 加载所有贴图
const colorMap = textureLoader.load('textures/material_basecolor.jpg');
const normalMap = textureLoader.load('textures/material_normal.jpg');
const roughnessMap = textureLoader.load('textures/material_roughness.jpg');
const metalnessMap = textureLoader.load('textures/material_metalness.jpg');
const aoMap = textureLoader.load('textures/material_ao.jpg');

// 配置贴图属性
colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
colorMap.repeat.set(2, 2);

normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
normalMap.repeat.set(2, 2);

// 创建PBR材质
const material = new THREE.MeshStandardMaterial({
  map: colorMap,           // 颜色贴图
  normalMap: normalMap,    // 法线贴图
  roughnessMap: roughnessMap, // 粗糙度贴图
  metalnessMap: metalnessMap, // 金属度贴图
  aoMap: aoMap,            // 环境光遮蔽贴图

  // 基础属性
  roughness: 0.8,          // 整体粗糙度
  metalness: 0.2,          // 整体金属度

  // 其他设置
  transparent: true,
  opacity: 1.0
});

// 设置第二组UV用于aoMap
geometry.setAttribute('uv2', new THREE.BufferAttribute(uvs, 2));

// 应用材质到网格
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);</code></pre>
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
.textures-container {
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

.textures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.texture-card {
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

.texture-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .texture-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .texture-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.basic {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.advanced {
      background: #fff3e0;
      color: #f57c00;
    }

    &.pbr {
      background: #e8f5e8;
      color: #2e7d32;
    }

    &.special {
      background: #fce4ec;
      color: #c2185b;
    }
  }
}

.texture-content {
  padding: 20px;
}

.texture-preview {
  height: 120px;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .preview-object {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

// 不同贴图的预览样式
.color-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .preview-object {
    background:
      linear-gradient(45deg, #ff6b6b 25%, transparent 25%),
      linear-gradient(-45deg, #4ecdc4 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ff6b6b 75%),
      linear-gradient(-45deg, transparent 75%, #4ecdc4 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }
}

.normal-preview {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

  .preview-object {
    background:
      radial-gradient(circle at 30% 30%, #8e44ad, #3498db),
      radial-gradient(circle at 70% 70%, #e74c3c, #f39c12);
    background-blend-mode: overlay;
    filter: brightness(1.2) contrast(1.1);
  }
}

.roughness-preview {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

  .preview-object {
    background:
      linear-gradient(45deg,
        rgba(255,255,255,0.8) 0%,
        rgba(200,200,200,0.6) 50%,
        rgba(100,100,100,0.4) 100%);
    border: 2px solid rgba(255,255,255,0.3);
  }
}

.metalness-preview {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

  .preview-object {
    background:
      linear-gradient(135deg,
        #c0c0c0 0%,
        #a0a0a0 25%,
        #808080 50%,
        #606060 75%,
        #404040 100%);
    box-shadow:
      inset 0 2px 4px rgba(255,255,255,0.5),
      inset 0 -2px 4px rgba(0,0,0,0.5);
  }
}

.ao-preview {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);

  .preview-object {
    background:
      radial-gradient(circle at 20% 20%, rgba(0,0,0,0.8) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0,0,0,0.6) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 50%),
      #8b4513;
  }
}

.displacement-preview {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

  .preview-object {
    background:
      radial-gradient(circle at 30% 30%, #795548 0%, transparent 70%),
      radial-gradient(circle at 70% 70%, #5d4037 0%, transparent 70%);
    transform: perspective(500px) rotateX(15deg) rotateY(15deg);
    box-shadow:
      0 8px 16px rgba(0,0,0,0.3),
      inset 0 2px 4px rgba(255,255,255,0.2);
  }
}

.env-preview {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);

  .preview-object {
    background:
      conic-gradient(from 0deg, #ff0080, #ff8c00, #40e0d0, #ff0080);
    animation: rotate 3s linear infinite;
    box-shadow:
      0 0 20px rgba(255,255,255,0.5),
      inset 0 0 20px rgba(255,255,255,0.3);
  }
}

.emissive-preview {
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);

  .preview-object {
    background:
      radial-gradient(circle at 30% 30%, #00ff00 0%, transparent 70%),
      radial-gradient(circle at 70% 70%, #ff0000 0%, transparent 70%);
    box-shadow:
      0 0 30px rgba(0, 255, 0, 0.5),
      0 0 60px rgba(255, 0, 0, 0.3);
    animation: pulse 2s ease-in-out infinite alternate;
  }
}

.texture-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
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
}

.texture-code {
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

.loading-content {
  .loading-methods {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }
  }
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.method-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.code-block {
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

.texture-properties {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.property-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
}

.performance-tips {
  .tip-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
}

.tip-item {
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

.example-content {
  .code-example {
    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
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

@keyframes pulse {
  from {
    box-shadow:
      0 0 20px rgba(0, 255, 0, 0.5),
      0 0 40px rgba(255, 0, 0, 0.3);
  }
  to {
    box-shadow:
      0 0 40px rgba(0, 255, 0, 0.8),
      0 0 80px rgba(255, 0, 0, 0.5);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .textures-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .textures-grid {
    grid-template-columns: 1fr;
  }

  .concept-grid,
  .method-grid,
  .properties-grid,
  .tip-grid {
    grid-template-columns: 1fr;
  }
}
</style>
