<template>
  <div class="threejs-textures">
    <header class="page-header">
      <div class="header-content">
        <h1>Three.js 纹理系统</h1>
        <p class="subtitle">为3D世界注入生命与细节</p>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-number">20+</span>
            <span class="stat-label">纹理类型</span>
          </div>
          <div class="stat">
            <span class="stat-number">15+</span>
            <span class="stat-label">映射模式</span>
          </div>
          <div class="stat">
            <span class="stat-number">∞</span>
            <span class="stat-label">创意可能</span>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="intro-grid">
          <div class="intro-text">
            <h2>什么是纹理？</h2>
            <p>在Three.js中，纹理是应用于3D模型表面的图像或数据，用于增加视觉细节和真实感。纹理可以模拟各种表面特性，如颜色、凹凸、反射等。</p>
            <div class="feature-highlights">
              <span class="feature-tag">🖼️ 图像纹理</span>
              <span class="feature-tag">🎛️ 程序纹理</span>
              <span class="feature-tag">🔄 动态纹理</span>
              <span class="feature-tag">⚡ 性能优化</span>
            </div>
          </div>
          <div class="code-preview">
            <pre><code>// 创建基础纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/wood.jpg');

// 应用到材质
const material = new THREE.MeshStandardMaterial({
  map: texture,           // 颜色纹理
  normalMap: normalTexture, // 法线贴图
  roughnessMap: roughTexture // 粗糙度贴图
});

// 纹理设置
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 2);</code></pre>
          </div>
        </div>
      </section>

      <section class="texture-types-section">
        <h2 class="section-title">纹理类型详解</h2>
        <div class="texture-tabs">
          <button
            v-for="tab in textureTabs"
            :key="tab.id"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            {{ tab.title }}
          </button>
        </div>

        <div class="tab-content">
          <div
            v-for="tab in textureTabs"
            :key="tab.id"
            v-show="activeTab === tab.id"
            class="texture-type-detail"
          >
            <div class="detail-header">
              <h3>{{ tab.title }}</h3>
              <p class="type-description">{{ tab.description }}</p>
            </div>

            <div class="detail-content">
              <div class="code-examples">
                <h4>代码示例</h4>
                <div class="code-block">
                  <pre><code>{{ tab.codeExample }}</code></pre>
                </div>
              </div>

              <div class="usage-info">
                <h4>使用场景</h4>
                <ul>
                  <li v-for="usage in tab.usages" :key="usage">{{ usage }}</li>
                </ul>

                <div class="properties" v-if="tab.properties">
                  <h4>关键属性</h4>
                  <div class="props-grid">
                    <div
                      v-for="prop in tab.properties"
                      :key="prop.name"
                      class="prop-card"
                    >
                      <code class="prop-name">{{ prop.name }}</code>
                      <span class="prop-desc">{{ prop.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="texture-mapping-section">
        <h2 class="section-title">纹理映射技术</h2>
        <div class="mapping-grid">
          <div
            v-for="mapping in mappingTechniques"
            :key="mapping.id"
            class="mapping-card"
            :class="{ highlighted: highlightedMapping === mapping.id }"
            @mouseenter="highlightedMapping = mapping.id"
            @mouseleave="highlightedMapping = null"
          >
            <div class="mapping-visual">
              <div class="visual-placeholder">
                <span class="visual-icon">{{ mapping.icon }}</span>
              </div>
            </div>
            <div class="mapping-content">
              <h3>{{ mapping.title }}</h3>
              <p>{{ mapping.description }}</p>
              <div class="mapping-code">
                <pre><code>{{ mapping.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="loading-optimization-section">
        <h2 class="section-title">加载与优化</h2>
        <div class="optimization-grid">
          <div class="loading-methods">
            <h3>纹理加载方法</h3>
            <div class="method-cards">
              <div
                v-for="method in loadingMethods"
                :key="method.id"
                class="method-card"
              >
                <h4>{{ method.title }}</h4>
                <p>{{ method.description }}</p>
                <div class="method-code">
                  <pre><code>{{ method.code }}</code></pre>
                </div>
                <div class="method-pros-cons">
                  <div class="pros">
                    <strong>优点:</strong>
                    <ul>
                      <li v-for="pro in method.pros" :key="pro">{{ pro }}</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <strong>缺点:</strong>
                    <ul>
                      <li v-for="con in method.cons" :key="con">{{ con }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="optimization-tips">
            <h3>性能优化建议</h3>
            <div class="tips-list">
              <div
                v-for="tip in optimizationTips"
                :key="tip.id"
                class="tip-item"
              >
                <div class="tip-icon">{{ tip.icon }}</div>
                <div class="tip-content">
                  <h4>{{ tip.title }}</h4>
                  <p>{{ tip.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="advanced-section">
        <h2 class="section-title">高级纹理技术</h2>
        <div class="advanced-techniques">
          <div
            v-for="tech in advancedTechniques"
            :key="tech.id"
            class="tech-card"
            :class="{ expanded: expandedTech === tech.id }"
            @click="toggleTech(tech.id)"
          >
            <div class="tech-header">
              <h3>{{ tech.title }}</h3>
              <span class="tech-difficulty" :class="tech.difficulty">
                {{ tech.difficulty }}
              </span>
              <span class="expand-icon">{{ expandedTech === tech.id ? '−' : '+' }}</span>
            </div>
            <div class="tech-body">
              <p>{{ tech.description }}</p>
              <div class="tech-example" v-if="tech.example">
                <h4>实现示例</h4>
                <div class="code-block">
                  <pre><code>{{ tech.example }}</code></pre>
                </div>
              </div>
              <div class="tech-use-cases" v-if="tech.useCases">
                <h4>应用场景</h4>
                <ul>
                  <li v-for="useCase in tech.useCases" :key="useCase">{{ useCase }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="resources-section">
        <h2 class="section-title">学习资源与工具</h2>
        <div class="resources-grid">
          <a
            v-for="resource in learningResources"
            :key="resource.id"
            :href="resource.url"
            target="_blank"
            class="resource-card"
          >
            <div class="resource-icon">{{ resource.icon }}</div>
            <div class="resource-content">
              <h3>{{ resource.title }}</h3>
              <p>{{ resource.description }}</p>
            </div>
            <span class="resource-link">访问 →</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>Three.js 纹理系统</h3>
          <p>掌握纹理技术，创造令人惊叹的3D视觉体验</p>
        </div>
        <div class="footer-links">
          <a href="https://threejs.org" target="_blank">Three.js 官网</a>
          <a href="https://threejs.org/docs" target="_blank">官方文档</a>
          <a href="https://github.com/mrdoob/three.js" target="_blank">GitHub</a>
          <a href="https://discourse.threejs.org" target="_blank">社区论坛</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const activeTab = ref('basic')
const highlightedMapping = ref<string | null>(null)
const expandedTech = ref('')

// 纹理类型标签页数据
const textureTabs = ref([
  {
    id: 'basic',
    icon: '🎨',
    title: '基础纹理',
    description: '最基本的纹理类型，用于定义表面颜色和图案',
    codeExample: `// 加载基础纹理
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load('textures/diffuse.jpg');

const material = new THREE.MeshBasicMaterial({
  map: colorMap
});`,
    usages: [
      '物体表面颜色和图案',
      'UI元素和背景',
      '简单的材质表现'
    ],
    properties: [
      { name: 'map', description: '定义材质颜色的纹理' },
      { name: 'wrapS', description: '水平方向的包裹方式' },
      { name: 'wrapT', description: '垂直方向的包裹方式' },
      { name: 'repeat', description: '纹理重复次数' }
    ]
  },
  {
    id: 'normal',
    icon: '🔍',
    title: '法线贴图',
    description: '模拟表面凹凸细节而不增加几何复杂度',
    codeExample: `// 法线贴图
const normalMap = textureLoader.load('textures/normal.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  normalScale: new THREE.Vector2(1, 1)
});`,
    usages: [
      '增加表面细节感',
      '砖墙、石材等粗糙表面',
      '低多边形模型的高细节表现'
    ],
    properties: [
      { name: 'normalMap', description: '法线贴图纹理' },
      { name: 'normalScale', description: '法线强度缩放' }
    ]
  },
  {
    id: 'specular',
    icon: '💎',
    title: '高光贴图',
    description: '控制表面反射和高光强度',
    codeExample: `// 高光贴图
const specularMap = textureLoader.load('textures/specular.jpg');

const material = new THREE.MeshPhongMaterial({
  map: colorMap,
  specularMap: specularMap,
  specular: 0xffffff
});`,
    usages: [
      '金属表面反射控制',
      '湿润或光滑表面',
      '自定义高光区域'
    ],
    properties: [
      { name: 'specularMap', description: '高光贴图纹理' },
      { name: 'specular', description: '高光颜色' }
    ]
  },
  {
    id: 'roughness',
    icon: '🪵',
    title: '粗糙度贴图',
    description: '定义表面粗糙程度，影响光散射',
    codeExample: `// 粗糙度贴图
const roughnessMap = textureLoader.load('textures/roughness.jpg');

const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  roughnessMap: roughnessMap,
  roughness: 0.8
});`,
    usages: [
      'PBR材质系统',
      '不同粗糙度的表面混合',
      '真实的材质表现'
    ],
    properties: [
      { name: 'roughnessMap', description: '粗糙度贴图' },
      { name: 'roughness', description: '基础粗糙度值' }
    ]
  },
  {
    id: 'environment',
    icon: '🌅',
    title: '环境贴图',
    description: '模拟环境反射和折射效果',
    codeExample: `// 环境贴图
const envLoader = new THREE.CubeTextureLoader();
const environmentMap = envLoader.load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
]);

const material = new THREE.MeshStandardMaterial({
  envMap: environmentMap,
  metalness: 1.0,
  roughness: 0.1
});`,
    usages: [
      '金属和玻璃材质',
      '环境反射效果',
      '天空盒和背景'
    ],
    properties: [
      { name: 'envMap', description: '环境贴图' },
      { name: 'refractionRatio', description: '折射率' }
    ]
  }
])

// 映射技术数据
const mappingTechniques = ref([
  {
    id: 'uv',
    icon: '📐',
    title: 'UV映射',
    description: '最基本的纹理映射方式，通过UV坐标将2D纹理映射到3D表面',
    code: `// UV映射
geometry.attributes.uv = new THREE.BufferAttribute(uvArray, 2);`
  },
  {
    id: 'cubemap',
    icon: '🧊',
    title: '立方体贴图',
    description: '使用6张纹理创建环境映射，适合天空盒和反射效果',
    code: `// 立方体贴图
const cubeTexture = new THREE.CubeTextureLoader()
  .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);`
  },
  {
    id: 'equirectangular',
    icon: '🌐',
    title: '等距柱状投影',
    description: '将360度全景图映射到球面，创建沉浸式环境',
    code: `// 等距柱状投影
const texture = new THREE.TextureLoader().load('panorama.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });`
  },
  {
    id: 'projection',
    icon: '📽️',
    title: '投影映射',
    description: '将纹理像投影仪一样投射到场景中的物体上',
    code: `// 投影映射
const projector = new THREE.Projector();
// 设置投影矩阵和纹理`
  }
])

// 加载方法数据
const loadingMethods = ref([
  {
    id: 'textureLoader',
    title: 'TextureLoader',
    description: '最基本的纹理加载器，支持常见的图片格式',
    code: `const loader = new THREE.TextureLoader();
loader.load('texture.jpg', (texture) => {
  material.map = texture;
});`,
    pros: [
      '使用简单',
      '自动管理缓存',
      '支持进度回调'
    ],
    cons: [
      '不支持高级格式',
      '错误处理有限'
    ]
  },
  {
    id: 'cubeTextureLoader',
    title: 'CubeTextureLoader',
    description: '专门用于加载立方体贴图，需要6张图片',
    code: `const loader = new THREE.CubeTextureLoader();
const envMap = loader.load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
]);`,
    pros: [
      '专门为立方体贴图优化',
      '自动排列图片顺序'
    ],
    cons: [
      '需要6张图片',
      '文件体积较大'
    ]
  },
  {
    id: 'loadingManager',
    title: 'LoadingManager',
    description: '管理多个纹理的加载，提供整体进度监控',
    code: `const manager = new THREE.LoadingManager();
manager.onLoad = () => console.log('All textures loaded');

const loader = new THREE.TextureLoader(manager);
loader.load('texture1.jpg');
loader.load('texture2.jpg');`,
    pros: [
      '批量加载管理',
      '进度监控',
      '统一错误处理'
    ],
    cons: [
      '配置稍复杂',
      '需要手动管理'
    ]
  }
])

// 优化建议数据
const optimizationTips = ref([
  {
    id: 'compression',
    icon: '🗜️',
    title: '纹理压缩',
    description: '使用适当的压缩格式如JPEG、WEBP，平衡质量和文件大小'
  },
  {
    id: 'mipmapping',
    icon: '🔍',
    title: 'Mipmapping',
    description: '启用mipmap减少远处纹理的锯齿和性能开销'
  },
  {
    id: 'resolution',
    icon: '📏',
    title: '合理分辨率',
    description: '根据使用场景选择合适的分辨率，避免过度使用高分辨率纹理'
  },
  {
    id: 'atlasing',
    icon: '🧩',
    title: '纹理图集',
    description: '将多个小纹理合并为一个大纹理，减少绘制调用'
  },
  {
    id: 'format',
    icon: '📄',
    title: '合适格式',
    description: '根据需求选择RGB、RGBA等格式，减少内存占用'
  },
  {
    id: 'reuse',
    icon: '🔄',
    title: '纹理复用',
    description: '重复使用相同纹理，利用Three.js的纹理缓存机制'
  }
])

// 高级技术数据
const advancedTechniques = ref([
  {
    id: 'procedural',
    title: '程序化纹理',
    description: '通过算法动态生成纹理，实现无限变化和实时修改',
    difficulty: '中级',
    example: `// 创建Canvas纹理
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
// 绘制程序化图案
context.fillStyle = 'red';
context.fillRect(0, 0, 256, 256);
// 转换为纹理
const texture = new THREE.CanvasTexture(canvas);`,
    useCases: [
      '动态生成的图案',
      '实时数据可视化',
      '游戏中的程序化内容'
    ]
  },
  {
    id: 'video',
    title: '视频纹理',
    description: '将视频作为动态纹理应用到3D表面',
    difficulty: '中级',
    example: `// 视频纹理
const video = document.getElementById('video');
const texture = new THREE.VideoTexture(video);

const material = new THREE.MeshBasicMaterial({
  map: texture
});`,
    useCases: [
      '视频播放器',
      '监控显示',
      '动态广告牌'
    ]
  },
  {
    id: 'renderTarget',
    title: '渲染目标纹理',
    description: '将场景渲染到纹理，用于实现镜子、监控屏幕等效果',
    difficulty: '高级',
    example: `// 渲染目标
const renderTarget = new THREE.WebGLRenderTarget(512, 512);
// 渲染场景到纹理
renderer.setRenderTarget(renderTarget);
renderer.render(scene, camera);
renderer.setRenderTarget(null);
// 使用纹理
material.map = renderTarget.texture;`,
    useCases: [
      '实时反射',
      '安全摄像头',
      '画中画效果'
    ]
  },
  {
    id: 'dataTexture',
    title: '数据纹理',
    description: '从原始数据创建纹理，用于科学可视化和自定义效果',
    difficulty: '高级',
    example: `// 数据纹理
const size = 256;
const data = new Uint8Array(4 * size * size);
// 填充数据...
const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);`,
    useCases: [
      '高度图',
      '热力图',
      '自定义数据可视化'
    ]
  }
])

// 学习资源数据
const learningResources = ref([
  {
    id: 'docs',
    icon: '📚',
    title: 'Three.js 官方文档',
    description: '完整的API参考和纹理相关文档',
    url: 'https://threejs.org/docs'
  },
  {
    id: 'examples',
    icon: '🔬',
    title: '纹理示例',
    description: '官方提供的各种纹理使用示例',
    url: 'https://threejs.org/examples'
  },
  {
    id: 'texture-sources',
    icon: '🖼️',
    title: '纹理资源网站',
    description: '高质量免费纹理下载',
    url: 'https://polyhaven.com'
  },
  {
    id: 'playground',
    icon: '⚡',
    title: '在线编辑器',
    description: '实时编辑和测试Three.js代码',
    url: 'https://threejs.org/editor'
  }
])

// 方法
const toggleTech = (techId: string) => {
  expandedTech.value = expandedTech.value === techId ? '' : techId
}
</script>

<style lang="less" scoped>
.threejs-textures {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

.page-header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,50 1000,100 0,100"/></svg>') no-repeat;
    background-size: cover;
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .header-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    .stat {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #2d3748;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    border-radius: 2px;
  }
}

// 介绍区域样式
.intro-section {
  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .intro-text {
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      color: #4a5568;
      line-height: 1.7;
    }
  }

  .feature-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    .feature-tag {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }

  .code-preview {
    background: #1a1b26;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

    pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;
    }

    code {
      color: #c0caf5;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

// 纹理类型标签页样式
.texture-types-section {
  .texture-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: #4a5568;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: white;
      border-color: #4f46e5;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      border-color: #4f46e5;
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }

    .tab-icon {
      font-size: 1.2rem;
    }
  }

  .tab-content {
    min-height: 400px;
  }

  .texture-type-detail {
    animation: fadeIn 0.3s ease;

    .detail-header {
      text-align: center;
      margin-bottom: 2rem;

      h3 {
        font-size: 1.6rem;
        color: #2d3748;
        margin-bottom: 0.5rem;
      }

      .type-description {
        color: #4a5568;
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }

    .detail-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .code-examples {
      h4 {
        color: #2d3748;
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }
    }

    .code-block {
      background: #1a1b26;
      border-radius: 8px;
      overflow: hidden;

      pre {
        margin: 0;
        padding: 1.5rem;
        overflow-x: auto;
      }

      code {
        color: #c0caf5;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
      }
    }

    .usage-info {
      h4 {
        color: #2d3748;
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }

      ul {
        list-style: none;
        padding: 0;
        margin-bottom: 2rem;

        li {
          padding: 0.5rem 0;
          color: #4a5568;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: '•';
            color: #4f46e5;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }

      .properties {
        h4 {
          margin-bottom: 1rem;
        }

        .props-grid {
          display: grid;
          gap: 1rem;
        }

        .prop-card {
          background: #f8fafc;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid #4f46e5;

          .prop-name {
            background: #4f46e5;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 0.5rem;
          }

          .prop-desc {
            color: #4a5568;
            display: block;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

// 映射技术样式
.texture-mapping-section {
  .mapping-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .mapping-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover, &.highlighted {
      background: white;
      border-color: #4f46e5;
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(79, 70, 229, 0.15);
    }

    .mapping-visual {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      padding: 2rem;
      text-align: center;

      .visual-placeholder {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }

      .visual-icon {
        font-size: 2rem;
        color: white;
      }
    }

    .mapping-content {
      padding: 1.5rem;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.75rem;
        color: #2d3748;
      }

      p {
        color: #4a5568;
        margin-bottom: 1rem;
        line-height: 1.6;
      }

      .mapping-code {
        background: #1a1b26;
        border-radius: 6px;
        overflow: hidden;

        pre {
          margin: 0;
          padding: 1rem;
        }

        code {
          color: #c0caf5;
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
        }
      }
    }
  }
}

// 加载与优化样式
.loading-optimization-section {
  .optimization-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .loading-methods {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      color: #2d3748;
    }

    .method-cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .method-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 1.5rem;
      border-left: 4px solid #4f46e5;

      h4 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: #2d3748;
      }

      p {
        color: #4a5568;
        margin-bottom: 1rem;
      }

      .method-code {
        background: #1a1b26;
        border-radius: 6px;
        margin-bottom: 1rem;
        overflow: hidden;

        pre {
          margin: 0;
          padding: 1rem;
        }

        code {
          color: #c0caf5;
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
        }
      }

      .method-pros-cons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (max-width: 480px) {
          grid-template-columns: 1fr;
        }

        .pros, .cons {
          strong {
            display: block;
            margin-bottom: 0.5rem;
            color: #2d3748;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              padding: 0.25rem 0;
              color: #4a5568;
              position: relative;
              padding-left: 1rem;
              font-size: 0.9rem;

              &::before {
                content: '•';
                position: absolute;
                left: 0;
                color: #4f46e5;
              }
            }
          }
        }

        .pros li::before {
          color: #10b981;
        }

        .cons li::before {
          color: #ef4444;
        }
      }
    }
  }

  .optimization-tips {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      color: #2d3748;
    }

    .tips-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .tip-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      background: #f8fafc;
      border-radius: 8px;
      padding: 1rem;
      transition: all 0.3s ease;

      &:hover {
        background: white;
        transform: translateX(5px);
      }

      .tip-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .tip-content {
        flex: 1;

        h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
          color: #2d3748;
        }

        p {
          color: #4a5568;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }
      }
    }
  }
}

// 高级技术样式
.advanced-section {
  .advanced-techniques {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tech-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      border-color: #4f46e5;
    }

    &.expanded {
      background: white;
      border-color: #4f46e5;
      box-shadow: 0 5px 20px rgba(79, 70, 229, 0.1);

      .tech-body {
        max-height: 1000px;
        opacity: 1;
        padding: 1.5rem;
      }
    }

    .tech-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      background: #f8fafc;

      h3 {
        font-size: 1.2rem;
        color: #2d3748;
        margin: 0;
        flex: 1;
      }

      .tech-difficulty {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-right: 1rem;

        &.中级 {
          background: #fbbf24;
          color: #78350f;
        }

        &.高级 {
          background: #ef4444;
          color: white;
        }
      }

      .expand-icon {
        font-size: 1.2rem;
        font-weight: bold;
        color: #4f46e5;
      }
    }

    .tech-body {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: all 0.3s ease;
      padding: 0 1.5rem;

      p {
        color: #4a5568;
        margin-bottom: 1rem;
        line-height: 1.6;
      }

      .tech-example, .tech-use-cases {
        margin-bottom: 1.5rem;

        h4 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: #2d3748;
        }
      }

      .code-block {
        background: #1a1b26;
        border-radius: 8px;
        overflow: hidden;

        pre {
          margin: 0;
          padding: 1rem;
          overflow-x: auto;
        }

        code {
          color: #c0caf5;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
        }
      }

      .tech-use-cases {
        ul {
          list-style: none;
          padding: 0;

          li {
            padding: 0.5rem 0;
            color: #4a5568;
            position: relative;
            padding-left: 1.5rem;

            &::before {
              content: '→';
              color: #4f46e5;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
          }
        }
      }
    }
  }
}

// 资源区域样式
.resources-section {
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .resource-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 1rem;

    &:hover {
      background: white;
      border-color: #4f46e5;
      transform: translateY(-3px);
      box-shadow: 0 5px 20px rgba(79, 70, 229, 0.15);
      text-decoration: none;
      color: inherit;
    }

    .resource-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .resource-content {
      flex: 1;

      h3 {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: #2d3748;
      }

      p {
        color: #4a5568;
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }

    .resource-link {
      color: #4f46e5;
      font-weight: 600;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    &:hover .resource-link {
      color: #7c3aed;
    }
  }
}

// 页脚样式
.page-footer {
  background: #2d3748;
  color: white;
  padding: 3rem 2rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .footer-info {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #cbd5e0;
      line-height: 1.6;
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      color: #cbd5e0;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;

      &:hover {
        color: #fff;
      }
    }
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .content {
    padding: 1rem;
  }

  section {
    padding: 1.5rem;
  }

  .header-stats {
    gap: 1.5rem !important;

    .stat-number {
      font-size: 1.8rem !important;
    }
  }

  .texture-tabs {
    flex-direction: column;
  }

  .tab-button {
    justify-content: center;
  }
}
</style>
