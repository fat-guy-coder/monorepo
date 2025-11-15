<template>
  <div class="threejs-basics">
    <header class="header">
      <h1 class="title">Three.js 基础三要素</h1>
      <p class="subtitle">构建3D世界的核心组件</p>
    </header>

    <div class="content">
      <div class="cards-container">
        <div class="card" v-for="element in elements" :key="element.id" :class="`card-${element.id}`">
          <div class="card-header">
            <div class="card-icon">{{ element.icon }}</div>
            <h2 class="card-title">{{ element.title }}</h2>
          </div>
          <div class="card-content">
            <p class="card-description">{{ element.description }}</p>

            <div class="properties">
              <h3 class="properties-title">主要属性</h3>
              <ul class="properties-list">
                <li v-for="property in element.properties" :key="property">
                  <span class="property-bullet">•</span>
                  {{ property }}
                </li>
              </ul>
            </div>

            <div class="methods" v-if="element.methods">
              <h3 class="methods-title">常用方法</h3>
              <div class="code-block">
                <pre><code>{{ element.methods }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="workflow">
        <h2 class="workflow-title">三要素工作流程</h2>
        <div class="workflow-steps">
          <div class="step" v-for="step in workflowSteps" :key="step.step">
            <div class="step-number">{{ step.step }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ThreeElement {
  id: string
  icon: string
  title: string
  description: string
  properties: string[]
  methods?: string
}

interface WorkflowStep {
  step: string
  title: string
  description: string
}

const elements = ref<ThreeElement[]>([
  {
    id: 'scene',
    icon: '🌍',
    title: '场景 (Scene)',
    description: '场景是Three.js中所有3D对象的容器，类似于一个虚拟的3D空间舞台。所有的网格、灯光、相机等对象都需要添加到场景中才能被渲染。',
    properties: [
      '背景设置 (background)',
      '雾效 (fog)',
      '环境光 (environment)',
      '子对象管理 (children)',
      '自动更新 (autoUpdate)'
    ],
    methods: `// 创建场景
const scene = new THREE.Scene();

// 设置背景颜色
scene.background = new THREE.Color(0x87CEEB);

// 添加网格到场景
scene.add(mesh);

// 添加灯光到场景
scene.add(light);`
  },
  {
    id: 'camera',
    icon: '📷',
    title: '相机 (Camera)',
    description: '相机定义了观察3D场景的视角，决定了哪些内容会被渲染到屏幕上。透视相机模拟人眼视角，是最常用的相机类型。',
    properties: [
      '视野角度 (fov)',
      '宽高比 (aspect)',
      '近裁剪面 (near)',
      '远裁剪面 (far)',
      '位置坐标 (position)'
    ],
    methods: `// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
);

// 设置相机位置
camera.position.set(0, 0, 5);

// 看向场景中心
camera.lookAt(0, 0, 0);`
  },
  {
    id: 'renderer',
    icon: '🎨',
    title: '渲染器 (Renderer)',
    description: '渲染器负责将3D场景通过相机视角渲染到2D屏幕上。WebGLRenderer是最常用的渲染器，它使用WebGL技术进行硬件加速渲染。',
    properties: [
      '画布元素 (domElement)',
      '像素比率 (pixelRatio)',
      '尺寸设置 (setSize)',
      '抗锯齿 (antialias)',
      '阴影映射 (shadowMap)'
    ],
    methods: `// 创建WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启抗锯齿
});

// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

// 设置像素比率
renderer.setPixelRatio(window.devicePixelRatio);

// 启用阴影
renderer.shadowMap.enabled = true;

// 渲染场景
renderer.render(scene, camera);`
  }
])

const workflowSteps = ref<WorkflowStep[]>([
  {
    step: '1',
    title: '创建场景',
    description: '初始化一个场景对象作为所有3D元素的容器'
  },
  {
    step: '2',
    title: '设置相机',
    description: '配置相机参数和位置，确定观察视角'
  },
  {
    step: '3',
    title: '添加对象',
    description: '将网格、灯光等3D对象添加到场景中'
  },
  {
    step: '4',
    title: '配置渲染器',
    description: '创建渲染器并设置画布尺寸和渲染参数'
  },
  {
    step: '5',
    title: '渲染循环',
    description: '在动画循环中持续渲染场景，实现动态效果'
  }
])
</script>

<style lang="less" scoped>
.threejs-basics {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;

    .title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin: 0;
      font-weight: 300;
    }
  }

  .content {
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;

      .card {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow:
          0 4px 20px rgba(0, 0, 0, 0.08),
          0 2px 8px rgba(0, 0, 0, 0.04);
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
          transform: translateY(-8px);
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.08);
        }

        &-scene {
          border-top: 4px solid #e74c3c;
        }

        &-camera {
          border-top: 4px solid #3498db;
        }

        &-renderer {
          border-top: 4px solid #2ecc71;
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #ecf0f1;

          .card-icon {
            font-size: 2.5rem;
            margin-right: 1rem;
          }

          .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2c3e50;
            margin: 0;
          }
        }

        .card-content {
          .card-description {
            color: #5a6c7d;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            line-height: 1.7;
          }

          .properties {
            margin-bottom: 1.5rem;

            .properties-title {
              font-size: 1.1rem;
              font-weight: 600;
              color: #34495e;
              margin-bottom: 0.8rem;
              display: flex;
              align-items: center;

              &::before {
                content: '';
                width: 4px;
                height: 16px;
                background: #3498db;
                margin-right: 0.5rem;
                border-radius: 2px;
              }
            }

            .properties-list {
              list-style: none;
              padding: 0;
              margin: 0;

              li {
                padding: 0.4rem 0;
                color: #5a6c7d;
                display: flex;
                align-items: flex-start;

                .property-bullet {
                  color: #3498db;
                  margin-right: 0.5rem;
                  font-weight: bold;
                }
              }
            }
          }

          .methods {
            .methods-title {
              font-size: 1.1rem;
              font-weight: 600;
              color: #34495e;
              margin-bottom: 0.8rem;
              display: flex;
              align-items: center;

              &::before {
                content: '';
                width: 4px;
                height: 16px;
                background: #2ecc71;
                margin-right: 0.5rem;
                border-radius: 2px;
              }
            }

            .code-block {
              background: #2c3e50;
              border-radius: 8px;
              padding: 1.2rem;
              overflow-x: auto;

              pre {
                margin: 0;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 0.9rem;
                line-height: 1.4;
              }

              code {
                color: #ecf0f1;
              }
            }
          }
        }
      }
    }

    .workflow {
      background: white;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.08),
        0 2px 8px rgba(0, 0, 0, 0.04);

      .workflow-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #2c3e50;
        text-align: center;
        margin-bottom: 2.5rem;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }
      }

      .workflow-steps {
        display: grid;
        gap: 1.5rem;

        .step {
          display: flex;
          align-items: flex-start;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
          border-left: 4px solid #3498db;

          &:hover {
            background: #edf2f7;
            transform: translateX(8px);
          }

          .step-number {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin-right: 1.2rem;
            flex-shrink: 0;
            font-size: 1.1rem;
          }

          .step-content {
            h3 {
              font-size: 1.2rem;
              font-weight: 600;
              color: #2c3e50;
              margin: 0 0 0.5rem 0;
            }

            p {
              color: #5a6c7d;
              margin: 0;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .threejs-basics {
    padding: 1rem;

    .header {
      margin-bottom: 2rem;
      padding: 1rem 0;

      .title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }

    .content {
      .cards-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;

        .card {
          padding: 1.5rem;
        }
      }

      .workflow {
        padding: 1.5rem;

        .workflow-steps {
          .step {
            padding: 1.2rem;

            .step-number {
              width: 2rem;
              height: 2rem;
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}
</style>
