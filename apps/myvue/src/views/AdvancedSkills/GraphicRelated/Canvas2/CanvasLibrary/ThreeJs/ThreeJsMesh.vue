<template>
  <div class="mesh-container">
    <header class="page-header">
      <h1 class="title">Three.js 网格(Mesh)</h1>
      <p class="subtitle">三维场景中的基本构建单元</p>
    </header>

    <main class="content">
      <section class="intro-section">
        <h2 class="section-title">什么是网格？</h2>
        <div class="section-content">
          <p>在Three.js中，<strong>网格(Mesh)</strong>是三维场景中最基本的可视化对象，它代表了三维空间中的一个实体。</p>
          <p>网格由两部分组成：</p>
          <ul class="feature-list">
            <li><strong>几何体(Geometry)</strong> - 定义物体的形状</li>
            <li><strong>材质(Material)</strong> - 定义物体的外观</li>
          </ul>
          <div class="code-block">
            <pre><code>// 创建一个基本的网格
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);</code></pre>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <h2 class="section-title">网格的作用</h2>
        <div class="cards-grid">
          <div class="card">
            <div class="card-icon">🎯</div>
            <h3 class="card-title">可视化实体</h3>
            <p class="card-description">网格是将几何体和材质结合起来的容器，是三维场景中可见的实体。</p>
          </div>
          <div class="card">
            <div class="card-icon">🔄</div>
            <h3 class="card-title">变换操作</h3>
            <p class="card-description">通过网格可以进行位置、旋转和缩放等变换操作，控制物体在三维空间中的状态。</p>
          </div>
          <div class="card">
            <div class="card-icon">🎨</div>
            <h3 class="card-title">外观控制</h3>
            <p class="card-description">通过材质属性控制网格的外观，包括颜色、纹理、透明度等视觉效果。</p>
          </div>
          <div class="card">
            <div class="card-icon">⚡</div>
            <h3 class="card-title">性能优化</h3>
            <p class="card-description">网格支持实例化，可以高效渲染大量相似物体，提升应用性能。</p>
          </div>
        </div>
      </section>

      <section class="parameters-section">
        <h2 class="section-title">网格参数详解</h2>
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
                <td><code>geometry</code></td>
                <td>Geometry/BufferGeometry</td>
                <td>定义网格形状的几何体</td>
                <td>必需</td>
              </tr>
              <tr>
                <td><code>material</code></td>
                <td>Material</td>
                <td>定义网格外观的材质</td>
                <td>必需</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="subsection-title">继承自Object3D的属性</h3>
        <div class="parameters-table-container">
          <table class="parameters-table">
            <thead>
              <tr>
                <th>属性</th>
                <th>类型</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>position</code></td>
                <td>Vector3</td>
                <td>网格在三维空间中的位置</td>
              </tr>
              <tr>
                <td><code>rotation</code></td>
                <td>Euler</td>
                <td>网格的旋转角度</td>
              </tr>
              <tr>
                <td><code>scale</code></td>
                <td>Vector3</td>
                <td>网格的缩放比例</td>
              </tr>
              <tr>
                <td><code>visible</code></td>
                <td>Boolean</td>
                <td>控制网格是否可见</td>
              </tr>
              <tr>
                <td><code>castShadow</code></td>
                <td>Boolean</td>
                <td>网格是否投射阴影</td>
              </tr>
              <tr>
                <td><code>receiveShadow</code></td>
                <td>Boolean</td>
                <td>网格是否接收阴影</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="example-section">
        <h2 class="section-title">使用示例</h2>
        <div class="example-content">
          <div class="code-example">
            <h3 class="example-title">创建彩色立方体</h3>
            <pre><code>// 创建立方体几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建基础材质
const material = new THREE.MeshBasicMaterial({
  color: 0x3498db,
  wireframe: false
});

// 创建网格对象
const cube = new THREE.Mesh(geometry, material);

// 设置网格位置
cube.position.set(0, 0, 0);

// 添加到场景
scene.add(cube);</code></pre>
          </div>

          <div class="code-example">
            <h3 class="example-title">创建带纹理的球体</h3>
            <pre><code>// 创建球体几何体
const geometry = new THREE.SphereGeometry(1, 32, 32);

// 加载纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/earth.jpg');

// 创建标准材质
const material = new THREE.MeshStandardMaterial({
  map: texture,
  roughness: 0.7,
  metalness: 0.2
});

// 创建网格对象
const sphere = new THREE.Mesh(geometry, material);

// 设置网格位置和旋转
sphere.position.set(3, 0, 0);
sphere.rotation.y = Math.PI / 4;

// 添加到场景
scene.add(sphere);</code></pre>
          </div>
        </div>
      </section>

      <section class="tips-section">
        <h2 class="section-title">最佳实践与提示</h2>
        <div class="tips-content">
          <div class="tip-item">
            <h3 class="tip-title">几何体复用</h3>
            <p>当需要创建多个相同形状的网格时，可以复用同一个几何体对象，节省内存。</p>
          </div>
          <div class="tip-item">
            <h3 class="tip-title">材质管理</h3>
            <p>对于需要频繁更新材质的网格，考虑使用Material.clone()创建材质副本。</p>
          </div>
          <div class="tip-item">
            <h3 class="tip-title">性能优化</h3>
            <p>使用BufferGeometry代替Geometry可以获得更好的性能，特别是在处理大量顶点时。</p>
          </div>
          <div class="tip-item">
            <h3 class="tip-title">内存管理</h3>
            <p>当不再需要网格时，记得调用dispose()方法释放几何体和材质占用的内存。</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <p>Three.js 网格(Mesh)是构建3D场景的基础，理解其原理和使用方法对于创建复杂的三维应用至关重要。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>
.mesh-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
  display: inline-block;
}

.subsection-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #34495e;
  margin: 2rem 0 1rem;
}

.section-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  p {
    margin-bottom: 1rem;
  }
}

.feature-list {
  margin: 1.5rem 0;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
  }
}

.code-block {
  background: #2d3748;
  border-radius: 6px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;

  pre {
    margin: 0;
    color: #e2e8f0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  code {
    font-family: inherit;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.75rem;
  }

  .card-description {
    color: #5a6c7d;
    line-height: 1.5;
  }
}

.parameters-table-container {
  overflow-x: auto;
  margin: 1.5rem 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.parameters-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.875rem 1rem;
    text-align: left;
    border-bottom: 1px solid #eaeaea;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }

  td {
    color: #4a5568;

    code {
      background: #edf2f7;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.85rem;
      color: #2d3748;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.example-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.code-example {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .example-title {
    background: #3498db;
    color: white;
    padding: 0.75rem 1.25rem;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  pre {
    margin: 0;
    padding: 1.25rem;
    background: #2d3748;
    color: #e2e8f0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;
  }
}

.tips-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.tip-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-left: 4px solid #3498db;

  .tip-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.75rem;
  }

  p {
    color: #5a6c7d;
    line-height: 1.5;
    margin: 0;
  }
}

.page-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaeaea;
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
}

// 响应式设计
@media (max-width: 768px) {
  .mesh-container {
    padding: 1rem;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .cards-grid,
  .example-content,
  .tips-content {
    grid-template-columns: 1fr;
  }

  .parameters-table {
    font-size: 0.9rem;

    th, td {
      padding: 0.75rem 0.5rem;
    }
  }
}
</style>
