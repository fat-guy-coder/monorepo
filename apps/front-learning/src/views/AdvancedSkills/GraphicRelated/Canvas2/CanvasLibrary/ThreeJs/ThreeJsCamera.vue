<template>
  <div class="camera-container">
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">Three.js 相机(Camera)</h1>
        <p class="subtitle">三维场景的观察视角</p>
        <div class="header-badge">核心概念</div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="section-card">
          <h2 class="section-title">
            <span class="icon">📷</span>
            什么是相机？
          </h2>
          <div class="section-content">
            <p>在Three.js中，<strong>相机(Camera)</strong>定义了三维场景的观察视角和投影方式，决定了用户能看到什么以及如何看到。</p>
            <div class="info-box">
              <div class="info-icon">💡</div>
              <div class="info-content">
                <p>相机就像是三维世界的"眼睛"，控制着场景的可见范围和透视效果。</p>
              </div>
            </div>
            <div class="code-block">
              <div class="code-header">
                <span class="code-language">JavaScript</span>
                <button class="copy-btn" @click="copyCode">复制代码</button>
              </div>
              <pre><code>// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 设置相机位置
camera.position.set(0, 0, 5);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="types-section">
        <h2 class="section-title">
          <span class="icon">🔧</span>
          相机类型
        </h2>
        <div class="types-grid">
          <div class="type-card type-card--perspective">
            <div class="type-header">
              <h3 class="type-title">透视相机</h3>
              <div class="type-badge">PerspectiveCamera</div>
            </div>
            <div class="type-content">
              <p class="type-description">模拟人眼视角，远处的物体看起来更小，具有真实的透视效果。</p>
              <div class="type-features">
                <span class="feature-tag">自然透视</span>
                <span class="feature-tag">真实感</span>
                <span class="feature-tag">常用</span>
              </div>
              <div class="type-params">
                <h4>主要参数：</h4>
                <ul>
                  <li><code>fov</code> - 视野角度</li>
                  <li><code>aspect</code> - 宽高比</li>
                  <li><code>near</code> - 近平面</li>
                  <li><code>far</code> - 远平面</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="type-card type-card--orthographic">
            <div class="type-header">
              <h3 class="type-title">正交相机</h3>
              <div class="type-badge">OrthographicCamera</div>
            </div>
            <div class="type-content">
              <p class="type-description">保持物体大小不变，无论距离远近，常用于2.5D游戏和工程制图。</p>
              <div class="type-features">
                <span class="feature-tag">无透视</span>
                <span class="feature-tag">等比例</span>
                <span class="feature-tag">技术图</span>
              </div>
              <div class="type-params">
                <h4>主要参数：</h4>
                <ul>
                  <li><code>left</code> - 左平面</li>
                  <li><code>right</code> - 右平面</li>
                  <li><code>top</code> - 上平面</li>
                  <li><code>bottom</code> - 下平面</li>
                  <li><code>near</code> - 近平面</li>
                  <li><code>far</code> - 远平面</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="parameters-section">
        <div class="section-card">
          <h2 class="section-title">
            <span class="icon">⚙️</span>
            相机参数详解
          </h2>

          <div class="parameter-group">
            <h3 class="parameter-group-title">透视相机参数</h3>
            <div class="parameters-table-container">
              <table class="parameters-table">
                <thead>
                  <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>描述</th>
                    <th>默认值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>fov</code></td>
                    <td>Number</td>
                    <td>相机视野角度（垂直方向），单位是度</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td><code>aspect</code></td>
                    <td>Number</td>
                    <td>渲染画面的宽高比，通常设为窗口宽高比</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td><code>near</code></td>
                    <td>Number</td>
                    <td>近裁剪面，比这个距离近的物体不会被渲染</td>
                    <td>0.1</td>
                  </tr>
                  <tr>
                    <td><code>far</code></td>
                    <td>Number</td>
                    <td>远裁剪面，比这个距离远的物体不会被渲染</td>
                    <td>2000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="parameter-group">
            <h3 class="parameter-group-title">正交相机参数</h3>
            <div class="parameters-table-container">
              <table class="parameters-table">
                <thead>
                  <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>描述</th>
                    <th>默认值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>left</code></td>
                    <td>Number</td>
                    <td>左裁剪面</td>
                    <td>-1</td>
                  </tr>
                  <tr>
                    <td><code>right</code></td>
                    <td>Number</td>
                    <td>右裁剪面</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td><code>top</code></td>
                    <td>Number</td>
                    <td>上裁剪面</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td><code>bottom</code></td>
                    <td>Number</td>
                    <td>下裁剪面</td>
                    <td>-1</td>
                  </tr>
                  <tr>
                    <td><code>near</code></td>
                    <td>Number</td>
                    <td>近裁剪面</td>
                    <td>0.1</td>
                  </tr>
                  <tr>
                    <td><code>far</code></td>
                    <td>Number</td>
                    <td>远裁剪面</td>
                    <td>2000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section class="examples-section">
        <h2 class="section-title">
          <span class="icon">💻</span>
          使用示例
        </h2>
        <div class="examples-grid">
          <div class="example-card">
            <div class="example-header">
              <h3 class="example-title">基础透视相机</h3>
              <div class="example-badge">常用</div>
            </div>
            <div class="example-content">
              <pre class="example-code"><code>// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 设置相机位置
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);</code></pre>
            </div>
          </div>

          <div class="example-card">
            <div class="example-header">
              <h3 class="example-title">正交相机设置</h3>
              <div class="example-badge">2.5D游戏</div>
            </div>
            <div class="example-content">
              <pre class="example-code"><code>// 创建正交相机
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  -10 * aspect, // left
  10 * aspect,  // right
  10,           // top
  -10,          // bottom
  0.1,          // near
  1000          // far
);

// 设置相机位置和朝向
camera.position.set(0, 10, 0);
camera.lookAt(0, 0, 0);</code></pre>
            </div>
          </div>

          <div class="example-card">
            <div class="example-header">
              <h3 class="example-title">相机动画</h3>
              <div class="example-badge">动态效果</div>
            </div>
            <div class="example-content">
              <pre class="example-code"><code>function animateCamera() {
  requestAnimationFrame(animateCamera);

  // 相机绕Y轴旋转
  camera.position.x = Math.sin(Date.now() * 0.001) * 5;
  camera.position.z = Math.cos(Date.now() * 0.001) * 5;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animateCamera();</code></pre>
            </div>
          </div>

          <div class="example-card">
            <div class="example-header">
              <h3 class="example-title">窗口大小适配</h3>
              <div class="example-badge">响应式</div>
            </div>
            <div class="example-content">
              <pre class="example-code"><code>function onWindowResize() {
  // 更新相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // 更新渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <div class="section-card">
          <h2 class="section-title">
            <span class="icon">📊</span>
            相机类型对比
          </h2>
          <div class="comparison-table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>透视相机</th>
                  <th>正交相机</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>透视效果</strong></td>
                  <td><span class="checkmark">✅</span> 有透视，远处物体变小</td>
                  <td><span class="cross">❌</span> 无透视，保持物体大小</td>
                </tr>
                <tr>
                  <td><strong>使用场景</strong></td>
                  <td>3D游戏、虚拟现实、真实感渲染</td>
                  <td>2.5D游戏、工程制图、UI界面</td>
                </tr>
                <tr>
                  <td><strong>参数设置</strong></td>
                  <td>fov, aspect, near, far</td>
                  <td>left, right, top, bottom, near, far</td>
                </tr>
                <tr>
                  <td><strong>性能影响</strong></td>
                  <td>中等</td>
                  <td>较低</td>
                </tr>
                <tr>
                  <td><strong>学习曲线</strong></td>
                  <td>较易理解</td>
                  <td>需要理解正交投影概念</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="best-practices-section">
        <h2 class="section-title">
          <span class="icon">🌟</span>
          最佳实践
        </h2>
        <div class="practices-grid">
          <div class="practice-item">
            <div class="practice-icon">🎯</div>
            <div class="practice-content">
              <h3>合理设置裁剪面</h3>
              <p>near值不要设置太小，far值不要设置太大，以优化渲染性能。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">📐</div>
            <div class="practice-content">
              <h3>保持正确的宽高比</h3>
              <p>相机aspect应与渲染器宽高比一致，避免图像拉伸。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">🔄</div>
            <div class="practice-content">
              <h3>响应窗口变化</h3>
              <p>监听resize事件，及时更新相机和渲染器参数。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">👁️</div>
            <div class="practice-content">
              <h3>使用lookAt方法</h3>
              <p>使用camera.lookAt()方法可以方便地让相机看向特定点。</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-content">
        <p class="footer-text">Three.js 相机是控制三维场景观察视角的核心组件，理解不同类型的相机及其参数对于创建沉浸式的3D体验至关重要。</p>
        <div class="footer-links">
          <a href="#" class="footer-link">官方文档</a>
          <a href="#" class="footer-link">示例代码</a>
          <a href="#" class="footer-link">API参考</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 复制代码功能
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(`// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);`)
    alert('代码已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style lang="less" scoped>
.camera-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #2d3748;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  padding: 3rem 0 2rem;
  margin-bottom: 2rem;

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

.section-content {
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

.code-block {
  background: #2d3748;
  border-radius: 12px;
  overflow: hidden;
  margin: 1.5rem 0;
  border: 1px solid #4a5568;

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    background: #4a5568;
    border-bottom: 1px solid #718096;
  }

  .code-language {
    color: #cbd5e0;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .copy-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;
  }

  code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #e2e8f0;
  }
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.type-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.8);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  &--perspective {
    border-top: 4px solid #667eea;
  }

  &--orthographic {
    border-top: 4px solid #f093fb;
  }

  .type-header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .type-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
  }

  .type-badge {
    background: #667eea;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .type-content {
    padding: 1.5rem;
  }

  .type-description {
    color: #4a5568;
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }

  .type-features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .feature-tag {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    padding: 0.375rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .type-params {
    h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #718096;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 0.25rem 0;
      color: #4a5568;
      font-size: 0.9rem;

      code {
        background: #f7fafc;
        padding: 0.125rem 0.375rem;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.8rem;
        color: #2d3748;
        border: 1px solid #e2e8f0;
      }
    }
  }
}

.parameter-group {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  .parameter-group-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
    border-left: 4px solid #667eea;
  }
}

.parameters-table-container,
.comparison-table-container {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.parameters-table,
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;

  th, td {
    padding: 1rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #f7fafc;
    font-weight: 600;
    color: #2d3748;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  td {
    color: #4a5568;
    font-size: 0.9rem;

    code {
      background: #f7fafc;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: #2d3748;
      border: 1px solid #e2e8f0;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.comparison-table {
  td {
    &:nth-child(2), &:nth-child(3) {
      text-align: center;
    }
  }

  .checkmark, .cross {
    font-size: 1.25rem;
  }
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .example-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .example-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }

  .example-badge {
    background: #48bb78;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .example-content {
    padding: 0;
  }

  .example-code {
    margin: 0;
    padding: 1.5rem;
    background: #2d3748;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
      color: #e2e8f0;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.practice-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .practice-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .practice-content {
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #718096;
      margin: 0;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }
}

.page-footer {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);

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
  .camera-container {
    padding: 0 1rem;
  }

  .page-header .title {
    font-size: 2.25rem;
  }

  .types-grid,
  .examples-grid {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1.5rem;
  }

  .parameters-table,
  .comparison-table {
    font-size: 0.8rem;

    th, td {
      padding: 0.75rem 0.5rem;
    }
  }

  .practices-grid {
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
