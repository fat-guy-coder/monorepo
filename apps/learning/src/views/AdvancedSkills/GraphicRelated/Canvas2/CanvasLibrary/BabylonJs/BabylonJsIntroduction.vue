<template>
  <div class="babylonjs-intro">
    <header class="page-header">
      <div class="header-content">
        <h1>Babylon.js</h1>
        <p class="subtitle">强大、美观且易用的Web 3D引擎</p>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-number">100K+</span>
            <span class="stat-label">开发者</span>
          </div>
          <div class="stat">
            <span class="stat-number">10K+</span>
            <span class="stat-label">项目</span>
          </div>
          <div class="stat">
            <span class="stat-number">100%</span>
            <span class="stat-label">开源</span>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="intro-grid">
          <div class="intro-text">
            <h2>什么是 Babylon.js？</h2>
            <p>Babylon.js 是一个基于WebGL的完整JavaScript框架，用于在浏览器和Web应用程序中构建3D游戏和体验。它由微软团队开发和维护，提供了强大而直观的API。</p>
            <div class="feature-highlights">
              <span class="feature-tag">⚡ 高性能</span>
              <span class="feature-tag">🎨 美观易用</span>
              <span class="feature-tag">📱 跨平台</span>
              <span class="feature-tag">🔧 功能丰富</span>
            </div>
          </div>
          <div class="code-preview">
            <pre><code>// 创建基础场景
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// 创建相机
const camera = new BABYLON.ArcRotateCamera(
  "camera", -Math.PI/2, Math.PI/2, 5,
  BABYLON.Vector3.Zero(), scene
);

// 创建光源
const light = new BABYLON.HemisphericLight(
  "light", new BABYLON.Vector3(1, 1, 0), scene
);

// 创建立方体
const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

// 渲染循环
engine.runRenderLoop(() => {
  scene.render();
});</code></pre>
          </div>
        </div>
      </section>

      <section class="features-section">
        <h2 class="section-title">核心特性</h2>
        <div class="features-grid">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
            :class="{ highlighted: highlightedFeature === feature.id }"
            @mouseenter="highlightedFeature = feature.id"
            @mouseleave="highlightedFeature = null"
          >
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <ul class="feature-details" v-if="feature.details">
              <li v-for="detail in feature.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="workflow-section">
        <h2 class="section-title">开发工作流程</h2>
        <div class="workflow-steps">
          <div
            v-for="(step, index) in workflowSteps"
            :key="step.id"
            class="workflow-step"
            :style="{ '--step-order': index }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-code" v-if="step.code">
                <pre><code>{{ step.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="ecosystem-section">
        <h2 class="section-title">生态系统</h2>
        <div class="ecosystem-cards">
          <div
            v-for="tool in ecosystemTools"
            :key="tool.id"
            class="ecosystem-card"
            :class="{ active: activeTool === tool.id }"
            @click="activeTool = tool.id"
          >
            <div class="tool-header">
              <h3>{{ tool.name }}</h3>
              <span class="tool-type">{{ tool.type }}</span>
            </div>
            <p class="tool-description">{{ tool.description }}</p>
            <div class="tool-features">
              <span v-for="feat in tool.features" :key="feat" class="tool-feature">{{ feat }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="getting-started">
        <h2 class="section-title">快速开始</h2>
        <div class="start-options">
          <div class="option-card">
            <h3>CDN引入</h3>
            <div class="code-block">
              <pre><code>&lt;script src="https://cdn.babylonjs.com/babylon.js"&gt;&lt;/script&gt;</code></pre>
            </div>
            <p>最简单的方式，直接在HTML中引入</p>
          </div>
          <div class="option-card">
            <h3>NPM安装</h3>
            <div class="code-block">
              <pre><code>npm install babylonjs</code></pre>
            </div>
            <p>适用于现代前端项目</p>
          </div>
          <div class="option-card">
            <h3>Playground</h3>
            <div class="code-block">
              <pre><code>https://playground.babylonjs.com</code></pre>
            </div>
            <p>在线编辑和测试代码</p>
          </div>
        </div>
      </section>

      <section class="resources-section">
        <h2 class="section-title">学习资源</h2>
        <div class="resources-grid">
          <a
            v-for="resource in learningResources"
            :key="resource.id"
            :href="resource.url"
            target="_blank"
            class="resource-card"
          >
            <div class="resource-icon">{{ resource.icon }}</div>
            <h3>{{ resource.title }}</h3>
            <p>{{ resource.description }}</p>
            <span class="resource-link">访问资源 →</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>Babylon.js</h3>
          <p>开源的Web 3D引擎，让每个人都能创建令人惊叹的3D体验</p>
        </div>
        <div class="footer-links">
          <a href="https://www.babylonjs.com" target="_blank">官方网站</a>
          <a href="https://doc.babylonjs.com" target="_blank">文档</a>
          <a href="https://github.com/BabylonJS/Babylon.js" target="_blank">GitHub</a>
          <a href="https://forum.babylonjs.com" target="_blank">社区论坛</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const highlightedFeature = ref<string | null>(null)
const activeTool = ref('sandbox')

// 核心特性数据
const features = ref([
  {
    id: 'rendering',
    icon: '🎨',
    title: '高级渲染',
    description: '基于物理的渲染(PBR)、后期处理效果、实时阴影等',
    details: [
      '基于物理的材质系统',
      'HDR渲染和图像效果',
      '实时阴影和光照'
    ]
  },
  {
    id: 'animation',
    icon: '✨',
    title: '动画系统',
    description: '强大的骨骼动画、变形动画和粒子系统',
    details: [
      '骨骼和蒙皮动画',
      '粒子系统和特效',
      '动画混合和状态机'
    ]
  },
  {
    id: 'physics',
    icon: '⚡',
    title: '物理引擎',
    description: '集成Cannon.js和Ammo.js物理引擎',
    details: [
      '刚体动力学',
      '碰撞检测',
      '约束和关节'
    ]
  },
  {
    id: 'audio',
    icon: '🎵',
    title: '空间音频',
    description: '3D空间音频支持，创造沉浸式体验',
    details: [
      '3D音频定位',
      '音频分析',
      '多声道支持'
    ]
  },
  {
    id: 'vr',
    icon: '🥽',
    title: 'VR/AR支持',
    description: '完整的虚拟现实和增强现实支持',
    details: [
      'WebVR/WebXR兼容',
      '控制器支持',
      '手势识别'
    ]
  },
  {
    id: 'tools',
    icon: '🔧',
    title: '开发工具',
    description: '丰富的调试工具和编辑器集成',
    details: [
      '场景调试器',
      '性能分析器',
      'Blender和3ds Max导出'
    ]
  }
])

// 工作流程数据
const workflowSteps = ref([
  {
    id: 'setup',
    title: '环境设置',
    description: '安装Babylon.js并创建基础项目结构',
    code: 'npm install babylonjs @babylonjs/core'
  },
  {
    id: 'scene',
    title: '创建场景',
    description: '初始化引擎、场景、相机和光源',
    code: `const engine = new Engine(canvas);
const scene = new Scene(engine);
const camera = new ArcRotateCamera();`
  },
  {
    id: 'meshes',
    title: '添加网格',
    description: '创建和配置3D对象、材质和纹理',
    code: `const sphere = MeshBuilder.CreateSphere();
const material = new StandardMaterial();
sphere.material = material;`
  },
  {
    id: 'animation',
    title: '添加动画',
    description: '创建动画、物理效果和交互',
    code: `scene.registerBeforeRender(() => {
  sphere.rotation.y += 0.01;
});`
  },
  {
    id: 'optimize',
    title: '优化发布',
    description: '性能优化、打包和部署',
    code: 'engine.runRenderLoop(() => scene.render());'
  }
])

// 生态系统工具
const ecosystemTools = ref([
  {
    id: 'sandbox',
    name: 'Babylon.js Sandbox',
    type: '在线工具',
    description: '在线3D模型查看器和测试环境',
    features: ['模型预览', '材质测试', '性能分析']
  },
  {
    id: 'editor',
    name: 'Babylon.js Editor',
    type: '桌面应用',
    description: '可视化场景编辑器，无需编写代码',
    features: ['可视化编辑', '实时预览', '项目导出']
  },
  {
    id: 'viewer',
    name: 'Babylon.js Viewer',
    type: '嵌入组件',
    description: '在网页中嵌入3D模型的标准化方式',
    features: ['模型嵌入', '响应式设计', '配置丰富']
  },
  {
    id: 'gui',
    name: 'GUI编辑器',
    type: 'UI工具',
    description: '创建复杂的用户界面和交互控制',
    features: ['UI组件', '事件处理', '主题定制']
  }
])

// 学习资源
const learningResources = ref([
  {
    id: 'docs',
    icon: '📚',
    title: '官方文档',
    description: '完整的API参考和教程',
    url: 'https://doc.babylonjs.com'
  },
  {
    id: 'playground',
    icon: '⚡',
    title: 'Playground',
    description: '在线代码编辑和实时预览',
    url: 'https://playground.babylonjs.com'
  },
  {
    id: 'forum',
    icon: '💬',
    title: '社区论坛',
    description: '获取帮助和分享经验',
    url: 'https://forum.babylonjs.com'
  },
  {
    id: 'examples',
    icon: '🎮',
    title: '示例项目',
    description: '完整的示例和演示',
    url: 'https://www.babylonjs.com/demos/'
  }
])
</script>

<style lang="less" scoped>
.babylonjs-intro {
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.4rem;
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
        font-size: 2.5rem;
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
  margin-bottom: 4rem;
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
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
    background: linear-gradient(135deg, #667eea, #764ba2);
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
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      color: #4a5568;
    }
  }

  .feature-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    .feature-tag {
      background: linear-gradient(135deg, #667eea, #764ba2);
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

// 特性区域样式
.features-section {
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover, &.highlighted {
      background: white;
      border-color: #667eea;
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      margin-bottom: 1rem;
    }

    .feature-details {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5rem 0;
        color: #667eea;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #48bb78;
          font-weight: bold;
        }
      }
    }
  }
}

// 工作流程样式
.workflow-section {
  .workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 40px;
      width: 3px;
      background: linear-gradient(to bottom, #667eea, #764ba2);
      z-index: 1;
    }
  }

  .workflow-step {
    display: flex;
    gap: 2rem;
    position: relative;
    z-index: 2;
    animation: fadeInUp 0.6s ease calc(var(--step-order) * 0.1s) both;

    .step-number {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .step-content {
      flex: 1;
      background: #f8fafc;
      border-radius: 12px;
      padding: 1.5rem;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        color: #2d3748;
      }

      p {
        color: #4a5568;
        margin-bottom: 1rem;
      }

      .step-code {
        background: #1a1b26;
        border-radius: 8px;
        overflow: hidden;

        pre {
          margin: 0;
          padding: 1rem;
        }

        code {
          color: #c0caf5;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
        }
      }
    }
  }
}

// 生态系统样式
.ecosystem-section {
  .ecosystem-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .ecosystem-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover, &.active {
      background: white;
      border-color: #667eea;
      transform: translateY(-3px);
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.15);
    }

    .tool-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;

      h3 {
        font-size: 1.2rem;
        color: #2d3748;
        margin: 0;
      }

      .tool-type {
        background: #667eea;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .tool-description {
      color: #4a5568;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .tool-features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tool-feature {
        background: #edf2f7;
        color: #4a5568;
        padding: 0.25rem 0.75rem;
        border-radius: 10px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }
}

// 快速开始样式
.getting-started {
  .start-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .option-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    .code-block {
      background: #1a1b26;
      border-radius: 8px;
      margin-bottom: 1rem;
      overflow: hidden;

      pre {
        margin: 0;
        padding: 1rem;
        overflow-x: auto;
      }

      code {
        color: #c0caf5;
        font-family: 'Fira Code', monospace;
      }
    }

    p {
      color: #4a5568;
      margin: 0;
    }
  }
}

// 资源区域样式
.resources-section {
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .resource-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 2rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    display: block;

    &:hover {
      background: white;
      border-color: #667eea;
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
      text-decoration: none;
      color: inherit;
    }

    .resource-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .resource-link {
      color: #667eea;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    &:hover .resource-link {
      color: #764ba2;
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
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
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
    padding: 2rem 1.5rem;
  }

  .header-stats {
    gap: 1.5rem !important;

    .stat-number {
      font-size: 1.8rem !important;
    }
  }

  .features-grid,
  .ecosystem-cards,
  .resources-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
