<template>
  <div class="orbit-controls-container">
    <header class="page-header">
      <h1 class="title">Three.js 轨道控制器</h1>
      <p class="subtitle">掌握3D场景交互的核心工具</p>
    </header>

    <main class="content">
      <!-- 概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">轨道控制器概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                OrbitControls（轨道控制器）是Three.js中最常用的相机控制器，它允许用户通过鼠标和触摸屏与3D场景进行自然交互。
              </p>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">🔄</div>
                  <div class="feature-text">
                    <h4>旋转控制</h4>
                    <p>围绕目标点旋转相机</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">📏</div>
                  <div class="feature-text">
                    <h4>缩放控制</h4>
                    <p>通过滚轮或手势缩放</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🖱️</div>
                  <div class="feature-text">
                    <h4>平移控制</h4>
                    <p>平移相机位置</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">⚙️</div>
                  <div class="feature-text">
                    <h4>高度可配置</h4>
                    <p>丰富的参数配置选项</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础用法 -->
      <section class="basic-usage-section">
        <div class="card">
          <h2 class="card-title">基础用法</h2>
          <div class="card-content">
            <div class="usage-steps">
              <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>安装依赖</h4>
                  <p>首先需要安装OrbitControls</p>
                  <div class="code-block">
                    <pre><code>npm install three @types/three</code></pre>
                  </div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>引入控制器</h4>
                  <p>在项目中导入OrbitControls</p>
                  <div class="code-block">
                    <pre><code>import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';</code></pre>
                  </div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>初始化控制器</h4>
                  <p>创建控制器实例并绑定到相机和渲染器</p>
                  <div class="code-block">
                    <pre><code>const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果
controls.dampingFactor = 0.05;</code></pre>
                  </div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>在动画循环中更新</h4>
                  <p>确保控制器在每一帧都更新</p>
                  <div class="code-block">
                    <pre><code>function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 只在启用阻尼或自动旋转时需要
  renderer.render(scene, camera);
}
animate();</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心配置 -->
      <section class="configuration-section">
        <div class="card">
          <h2 class="card-title">核心配置参数</h2>
          <div class="card-content">
            <div class="config-grid">
              <div class="config-group">
                <h3>基础配置</h3>
                <div class="config-list">
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">enableDamping</span>
                      <span class="config-type">boolean</span>
                    </div>
                    <p class="config-desc">启用阻尼效果，使相机移动更平滑</p>
                    <div class="config-code">
                      <code>controls.enableDamping = true;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">dampingFactor</span>
                      <span class="config-type">number</span>
                    </div>
                    <p class="config-desc">阻尼系数，值越小阻尼效果越强</p>
                    <div class="config-code">
                      <code>controls.dampingFactor = 0.05;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">autoRotate</span>
                      <span class="config-type">boolean</span>
                    </div>
                    <p class="config-desc">启用自动旋转</p>
                    <div class="config-code">
                      <code>controls.autoRotate = true;</code>
                    </div>
                  </div>
                </div>
              </div>

              <div class="config-group">
                <h3>限制配置</h3>
                <div class="config-list">
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">minDistance</span>
                      <span class="config-type">number</span>
                    </div>
                    <p class="config-desc">相机与目标的最小距离</p>
                    <div class="config-code">
                      <code>controls.minDistance = 5;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">maxDistance</span>
                      <span class="config-type">number</span>
                    </div>
                    <p class="config-desc">相机与目标的最大距离</p>
                    <div class="config-code">
                      <code>controls.maxDistance = 50;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">minPolarAngle</span>
                      <span class="config-type">number</span>
                    </div>
                    <p class="config-desc">最小极角（弧度）</p>
                    <div class="config-code">
                      <code>controls.minPolarAngle = 0;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">maxPolarAngle</span>
                      <span class="config-type">number</span>
                    </div>
                    <p class="config-desc">最大极角（弧度）</p>
                    <div class="config-code">
                      <code>controls.maxPolarAngle = Math.PI;</code>
                    </div>
                  </div>
                </div>
              </div>

              <div class="config-group">
                <h3>交互配置</h3>
                <div class="config-list">
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">enableZoom</span>
                      <span class="config-type">boolean</span>
                    </div>
                    <p class="config-desc">启用缩放功能</p>
                    <div class="config-code">
                      <code>controls.enableZoom = true;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">enableRotate</span>
                      <span class="config-type">boolean</span>
                    </div>
                    <p class="config-desc">启用旋转功能</p>
                    <div class="config-code">
                      <code>controls.enableRotate = true;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">enablePan</span>
                      <span class="config-type">boolean</span>
                    </div>
                    <p class="config-desc">启用平移功能</p>
                    <div class="config-code">
                      <code>controls.enablePan = true;</code>
                    </div>
                  </div>
                  <div class="config-item">
                    <div class="config-header">
                      <span class="config-name">screenSpacePanning</span>
                      <span class="config-type">boolean</span>
                    </div>
                    <p class="config-desc">定义平移行为模式</p>
                    <div class="config-code">
                      <code>controls.screenSpacePanning = true;</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级用法 -->
      <section class="advanced-section">
        <div class="card">
          <h2 class="card-title">高级用法与技巧</h2>
          <div class="card-content">
            <div class="advanced-grid">
              <div class="advanced-item">
                <h3>自定义目标点</h3>
                <div class="advanced-content">
                  <p>设置控制器围绕的目标点</p>
                  <div class="code-block">
                    <pre><code>// 设置目标点为场景中心
controls.target.set(0, 0, 0);

// 或者设置为特定物体的位置
controls.target.copy(object.position);

// 平滑移动到新目标
controls.target.set(x, y, z);
controls.update();</code></pre>
                  </div>
                </div>
              </div>

              <div class="advanced-item">
                <h3>相机位置控制</h3>
                <div class="advanced-content">
                  <p>程序化控制相机位置</p>
                  <div class="code-block">
                    <pre><code>// 设置相机初始位置
camera.position.set(0, 10, 20);
controls.update();

// 保存和恢复相机状态
const cameraState = {
  position: camera.position.clone(),
  target: controls.target.clone()
};

// 恢复状态
camera.position.copy(cameraState.position);
controls.target.copy(cameraState.target);
controls.update();</code></pre>
                  </div>
                </div>
              </div>

              <div class="advanced-item">
                <h3>事件监听</h3>
                <div class="advanced-content">
                  <p>监听控制器状态变化</p>
                  <div class="code-block">
                    <pre><code>// 开始事件
controls.addEventListener('start', () => {
  console.log('Controls interaction started');
});

// 变化事件
controls.addEventListener('change', () => {
  // 每帧变化时触发
  updateUI();
});

// 结束事件
controls.addEventListener('end', () => {
  console.log('Controls interaction ended');
});</code></pre>
                  </div>
                </div>
              </div>

              <div class="advanced-item">
                <h3>性能优化</h3>
                <div class="advanced-content">
                  <p>优化控制器性能的技巧</p>
                  <div class="code-block">
                    <pre><code>// 只在需要时更新
if (controls.enableDamping || controls.autoRotate) {
  controls.update();
}

// 禁用不必要的功能
controls.enableZoom = false;
controls.enablePan = false;

// 在不需要时释放资源
function disposeControls() {
  controls.dispose();
}</code></pre>
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
          <h2 class="card-title">完整示例代码</h2>
          <div class="card-content">
            <div class="example-tabs">
              <div class="tab-buttons">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  :class="['tab-button', { active: activeTab === tab.id }]"
                  @click="activeTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>
              <div class="tab-content">
                <div v-if="activeTab === 'basic'" class="code-example">
                  <h3>基础Three.js场景 + OrbitControls</h3>
                  <pre><code>import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 10);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 添加光源
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// 添加物体
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加网格地面
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  // 更新控制器
  controls.update();

  // 渲染场景
  renderer.render(scene, camera);
}

animate();

// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});</code></pre>
                </div>

                <div v-if="activeTab === 'advanced'" class="code-example">
                  <h3>高级配置示例</h3>
                  <pre><code>// 高级轨道控制器配置
const controls = new OrbitControls(camera, renderer.domElement);

// 平滑阻尼效果
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 自动旋转
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

// 距离限制
controls.minDistance = 5;
controls.maxDistance = 50;

// 角度限制
controls.minPolarAngle = 0; // 弧度
controls.maxPolarAngle = Math.PI; // 弧度
controls.minAzimuthAngle = -Infinity;
controls.maxAzimuthAngle = Infinity;

// 缩放限制
controls.zoomSpeed = 1.0;
controls.minZoom = 0.5;
controls.maxZoom = 2.0;

// 平移限制
controls.panSpeed = 1.0;
controls.keyPanSpeed = 7.0;

// 键盘控制
controls.keys = {
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  BOTTOM: 'ArrowDown'
};

// 鼠标按钮配置
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.PAN
};

// 事件监听
controls.addEventListener('start', function() {
  console.log('Interaction started');
});

controls.addEventListener('change', function() {
  // 更新UI或其他状态
  updateCameraInfo();
});

controls.addEventListener('end', function() {
  console.log('Interaction ended');
});

// 程序化控制
function resetCamera() {
  controls.reset();
}

function setCameraView(position, target) {
  controls.target.copy(target);
  camera.position.copy(position);
  controls.update();
}

// 保存和加载相机状态
function saveCameraState() {
  return {
    position: camera.position.clone(),
    target: controls.target.clone()
  };
}

function loadCameraState(state) {
  camera.position.copy(state.position);
  controls.target.copy(state.target);
  controls.update();
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="faq-section">
        <div class="card">
          <h2 class="card-title">常见问题与解决方案</h2>
          <div class="card-content">
            <div class="faq-list">
              <div class="faq-item">
                <h3>控制器不工作？</h3>
                <div class="faq-answer">
                  <p><strong>可能原因：</strong></p>
                  <ul>
                    <li>忘记调用 <code>controls.update()</code> 在动画循环中</li>
                    <li>相机或渲染器DOM元素未正确设置</li>
                    <li>CSS样式影响了事件监听</li>
                  </ul>
                </div>
              </div>
              <div class="faq-item">
                <h3>阻尼效果不明显？</h3>
                <div class="faq-answer">
                  <p><strong>解决方案：</strong></p>
                  <ul>
                    <li>调整 <code>dampingFactor</code> 值（通常 0.05-0.25）</li>
                    <li>确保启用了 <code>enableDamping</code></li>
                    <li>检查是否在动画循环中调用了 <code>controls.update()</code></li>
                  </ul>
                </div>
              </div>
              <div class="faq-item">
                <h3>相机穿透物体？</h3>
                <div class="faq-answer">
                  <p><strong>解决方案：</strong></p>
                  <ul>
                    <li>设置合适的 <code>minDistance</code></li>
                    <li>调整相机的 <code>near</code> 平面</li>
                    <li>使用碰撞检测限制相机移动</li>
                  </ul>
                </div>
              </div>
              <div class="faq-item">
                <h3>性能问题？</h3>
                <div class="faq-answer">
                  <p><strong>优化建议：</strong></p>
                  <ul>
                    <li>只在启用阻尼或自动旋转时调用 <code>update()</code></li>
                    <li>禁用不需要的控制器功能</li>
                    <li>使用 <code>controls.dispose()</code> 释放资源</li>
                  </ul>
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
import { ref } from 'vue'

const tabs = [
  { id: 'basic', label: '基础示例' },
  { id: 'advanced', label: '高级配置' }
]

const activeTab = ref('basic')
</script>

<style lang="less" scoped>
.orbit-controls-container {
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature-item {
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

  .feature-icon {
    font-size: 2rem;
    margin-right: 16px;
  }

  .feature-text {
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

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    font-weight: 600;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0 0 12px 0;
      color: #666;
    }
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

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.config-group {
  h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 1.2rem;
    padding-bottom: 8px;
    border-bottom: 2px solid #e9ecef;
  }
}

.config-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  .config-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .config-name {
      font-family: 'Monaco', 'Consolas', monospace;
      font-weight: 600;
      color: #2c3e50;
    }

    .config-type {
      font-size: 0.8rem;
      color: #666;
      background: #e9ecef;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }

  .config-desc {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 0.9rem;
  }

  .config-code {
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
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.advanced-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h3 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .advanced-content {
    p {
      margin: 0 0 12px 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.example-tabs {
  .tab-buttons {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;

    .tab-button {
      padding: 10px 20px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;

      &:hover {
        background: #e9ecef;
      }

      &.active {
        background: #667eea;
        color: white;
        border-color: #667eea;
      }
    }
  }

  .tab-content {
    .code-example {
      h3 {
        margin: 0 0 16px 0;
        color: #2c3e50;
        font-size: 1.2rem;
      }
    }
  }
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  h3 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .faq-answer {
    p {
      margin: 0 0 8px 0;
      color: #666;
      font-weight: 600;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin-bottom: 4px;
        color: #666;
        font-size: 0.9rem;

        code {
          background: #e9ecef;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 0.85rem;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .orbit-controls-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .features-grid,
  .config-grid,
  .advanced-grid {
    grid-template-columns: 1fr;
  }

  .step-item {
    flex-direction: column;
    align-items: flex-start;

    .step-number {
      margin-bottom: 12px;
    }
  }

  .tab-buttons {
    flex-direction: column;
  }
}
</style>
