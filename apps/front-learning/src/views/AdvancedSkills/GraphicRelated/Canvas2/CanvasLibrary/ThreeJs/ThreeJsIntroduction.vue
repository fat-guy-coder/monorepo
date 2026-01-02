<template>
  <div class="threejs-container">
    <header class="header">
      <div class="title-section">
        <div class="logo">
          <div class="cube">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
          </div>
        </div>
        <div>
          <h1>Three.js <span class="highlight">三维可视化</span> 库</h1>
          <p class="subtitle">在浏览器中创建和展示3D内容的JavaScript库</p>
          <p><a href="http://www.webgl3d.cn/" target="_blank">threejs官网</a></p>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <h2 class="section-title"><i class="icon fas fa-info-circle"></i> Three.js 简介</h2>
        <div class="intro-content">
          <div class="intro-text">
            <p>Three.js 是一个开源的 JavaScript 库，用于在浏览器中创建和展示3D图形内容。它封装了 WebGL 的底层复杂性，提供了直观的 API，让开发者能够轻松创建复杂的三维场景。</p>
            <div class="feature-cards">
              <div class="feature-card">
                <i class="fas fa-cube"></i>
                <h3>跨平台</h3>
                <p>支持所有现代浏览器和移动设备</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-bolt"></i>
                <h3>高性能</h3>
                <p>利用WebGL实现硬件加速渲染</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-code"></i>
                <h3>易用性</h3>
                <p>简化3D编程的复杂概念</p>
              </div>
            </div>
          </div>
          <div class="usage-stats">
            <div class="stat-item">
              <div class="stat-value">2M+</div>
              <div class="stat-label">周下载量 (npm)</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">85K+</div>
              <div class="stat-label">GitHub Stars</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">1K+</div>
              <div class="stat-label">示例项目</div>
            </div>
          </div>
        </div>
      </section>

      <section class="core-concepts">
        <h2 class="section-title"><i class="icon fas fa-cubes"></i> 核心概念</h2>
        <div class="concepts-grid">
          <div class="concept-card">
            <div class="concept-icon bg-blue">
              <i class="fas fa-globe"></i>
            </div>
            <h3>场景 (Scene)</h3>
            <p>3D对象的容器，所有对象、灯光和相机都放置在其中</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon bg-green">
              <i class="fas fa-camera"></i>
            </div>
            <h3>相机 (Camera)</h3>
            <p>定义用户查看场景的视角，最常用的是透视相机(PerspectiveCamera)</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon bg-purple">
              <i class="fas fa-paint-roller"></i>
            </div>
            <h3>渲染器 (Renderer)</h3>
            <p>将场景和相机结合，在画布上绘制3D场景</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon bg-orange">
              <i class="fas fa-shapes"></i>
            </div>
            <h3>几何体 (Geometry)</h3>
            <p>定义3D物体的形状，如立方体、球体、圆柱体等</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon bg-red">
              <i class="fas fa-fill-drip"></i>
            </div>
            <h3>材质 (Material)</h3>
            <p>定义物体的外观特性，如颜色、纹理、反光度等</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon bg-teal">
              <i class="fas fa-cube"></i>
            </div>
            <h3>网格 (Mesh)</h3>
            <p>几何体和材质的结合，构成可渲染的3D对象</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon bg-pink">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h3>灯光 (Light)</h3>
            <p>照亮场景，如环境光、点光源、聚光灯等</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon bg-yellow">
              <i class="fas fa-sync-alt"></i>
            </div>
            <h3>动画循环</h3>
            <p>使用requestAnimationFrame实现流畅的动画效果</p>
          </div>
        </div>
      </section>

      <section class="getting-started">
        <h2 class="section-title"><i class="icon fas fa-rocket"></i> 快速入门</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装Three.js</h3>
              <p>使用npm或yarn安装：</p>
              <pre><code>npm install three</code></pre>
              <p>或者通过CDN引入：</p>
              <pre><code>&lt;script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"&gt;&lt;/script&gt;</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建基本场景</h3>
              <p>创建场景、相机和渲染器：</p>
              <pre><code>import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机（透视相机）
const camera = new THREE.PerspectiveCamera(
  75, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>添加3D对象</h3>
              <p>创建立方体并添加到场景：</p>
              <pre><code>// 创建立方体几何体
const geometry = new THREE.BoxGeometry();

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

// 创建网格（几何体+材质）
const cube = new THREE.Mesh(geometry, material);

// 添加到场景
scene.add(cube);

// 设置相机位置
camera.position.z = 5;</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>实现动画循环</h3>
              <p>使用requestAnimationFrame创建动画：</p>
              <pre><code>function animate() {
  requestAnimationFrame(animate);

  // 旋转立方体
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 渲染场景
  renderer.render(scene, camera);
}

animate();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="examples">
        <h2 class="section-title"><i class="icon fas fa-laptop-code"></i> 应用实例</h2>
        <div class="example-cards">
          <div class="example-card">
            <div class="example-preview preview-1"></div>
            <div class="example-content">
              <h3>3D数据可视化</h3>
              <p>创建交互式3D图表展示复杂数据关系</p>
              <ul>
                <li>三维柱状图</li>
                <li>网络拓扑图</li>
                <li>地理空间数据</li>
              </ul>
            </div>
          </div>
          <div class="example-card">
            <div class="example-preview preview-2"></div>
            <div class="example-content">
              <h3>产品展示</h3>
              <p>360°查看产品的交互式展示</p>
              <ul>
                <li>电子商务产品预览</li>
                <li>汽车配置器</li>
                <li>家具展示</li>
              </ul>
            </div>
          </div>
          <div class="example-card">
            <div class="example-preview preview-3"></div>
            <div class="example-content">
              <h3>游戏开发</h3>
              <p>创建基于浏览器的3D游戏</p>
              <ul>
                <li>第一人称射击游戏</li>
                <li>益智游戏</li>
                <li>模拟游戏</li>
              </ul>
            </div>
          </div>
          <div class="example-card">
            <div class="example-preview preview-4"></div>
            <div class="example-content">
              <h3>建筑可视化</h3>
              <p>建筑和室内设计的交互式展示</p>
              <ul>
                <li>虚拟看房</li>
                <li>装修预览</li>
                <li>城市规划</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="resources">
        <h2 class="section-title"><i class="icon fas fa-book"></i> 学习资源</h2>
        <div class="resource-cards">
          <a href="https://threejs.org/" target="_blank" class="resource-card">
            <i class="fas fa-globe"></i>
            <h3>官方文档</h3>
            <p>全面的API参考和示例</p>
          </a>
          <a href="https://threejs-journey.com/" target="_blank" class="resource-card">
            <i class="fas fa-graduation-cap"></i>
            <h3>Three.js Journey</h3>
            <p>最受欢迎的付费课程</p>
          </a>
          <a href="https://github.com/mrdoob/three.js/" target="_blank" class="resource-card">
            <i class="fab fa-github"></i>
            <h3>GitHub仓库</h3>
            <p>源代码和问题追踪</p>
          </a>
          <a href="https://discourse.threejs.org/" target="_blank" class="resource-card">
            <i class="fas fa-comments"></i>
            <h3>社区论坛</h3>
            <p>提问和分享知识</p>
          </a>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Three.js 是开源的WebGL库，由Ricardo Cabello (Mr.doob) 创建</p>
      <p> Three.js 学习指南 | Vue组件示例</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
// 不需要太多逻辑，主要是展示静态内容
</script>

<style lang="less" scoped>



.threejs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);

  .header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eaeaea;

    .title-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .logo {
        .cube {
          width: 80px;
          height: 80px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(25deg) rotateY(-25deg);
          animation: rotateCube 10s infinite linear;

          .face {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid #3498db;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #3498db;
            background: rgba(52, 152, 219, 0.1);
            box-shadow: inset 0 0 20px rgba(52, 152, 219, 0.2);
          }

          .front {
            transform: translateZ(40px);
          }

          .back {
            transform: translateZ(-40px) rotateY(180deg);
          }

          .right {
            transform: translateX(40px) rotateY(90deg);
          }

          .left {
            transform: translateX(-40px) rotateY(-90deg);
          }

          .top {
            transform: translateY(-40px) rotateX(90deg);
          }

          .bottom {
            transform: translateY(40px) rotateX(-90deg);
          }
        }
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: #2c3e50;
        font-weight: 700;

        .highlight {
          color: #3498db;
          background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
          padding: 0.2rem 0.8rem;
          border-radius: 8px;
        }
      }

      .subtitle {
        font-size: 1.2rem;
        color: #7f8c8d;
      }
    }
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #eef2f7;
    color: #2c3e50;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 0.8rem;
      color: #3498db;
    }
  }

  .intro-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

    .intro-content {
      display: flex;
      gap: 2rem;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    .intro-text {
      flex: 3;
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4a5568;

      p {
        margin-bottom: 1.5rem;
      }
    }

    .feature-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;

      .feature-card {
        padding: 1.5rem;
        background: #f8fafc;
        border-radius: 10px;
        text-align: center;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        i {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        p {
          color: #718096;
          font-size: 0.9rem;
        }
      }
    }

    .usage-stats {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .stat-item {
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        padding: 1.5rem;
        border-radius: 10px;
        text-align: center;

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }
      }
    }
  }

  .core-concepts {
    margin-bottom: 3rem;

    .concepts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .concept-card {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        .concept-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          color: white;

          &.bg-blue {
            background: linear-gradient(135deg, #3498db, #2c3e50);
          }

          &.bg-green {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
          }

          &.bg-purple {
            background: linear-gradient(135deg, #9b59b6, #8e44ad);
          }

          &.bg-orange {
            background: linear-gradient(135deg, #e67e22, #d35400);
          }

          &.bg-red {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
          }

          &.bg-teal {
            background: linear-gradient(135deg, #1abc9c, #16a085);
          }

          &.bg-pink {
            background: linear-gradient(135deg, #e84393, #fd79a8);
          }

          &.bg-yellow {
            background: linear-gradient(135deg, #f1c40f, #f39c12);
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #718096;
          line-height: 1.6;
          font-size: 0.95rem;
        }
      }
    }
  }

  .getting-started {
    margin-bottom: 3rem;

    .steps {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .step {
        display: flex;
        gap: 1.5rem;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .step-number {
          min-width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3498db, #2c3e50);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .step-content {
          flex: 1;

          h3 {
            font-size: 1.4rem;
            margin-bottom: 1rem;
            color: #2c3e50;
          }

          pre {
            background: #2c3e50;
            border-radius: 8px;
            padding: 1.2rem;
            overflow-x: auto;
            margin-top: 1rem;

            code {
              font-family: 'Fira Code', monospace;
              color: #e0e0e0;
              font-size: 0.9rem;
              line-height: 1.5;

              .hljs-keyword {
                color: #ff9a76;
              }

              .hljs-built_in {
                color: #82aaff;
              }

              .hljs-string {
                color: #c3e88d;
              }
            }
          }
        }
      }
    }
  }

  .examples {
    margin-bottom: 3rem;

    .example-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;

      .example-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-8px);
        }

        .example-preview {
          height: 180px;
          background-size: cover;
          background-position: center;

          &.preview-1 {
            background: linear-gradient(135deg, #6a11cb, #2575fc);
          }

          &.preview-2 {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
          }

          &.preview-3 {
            background: linear-gradient(135deg, #11998e, #38ef7d);
          }

          &.preview-4 {
            background: linear-gradient(135deg, #f46b45, #eea849);
          }
        }

        .example-content {
          padding: 1.5rem;

          h3 {
            font-size: 1.3rem;
            margin-bottom: 1rem;
            color: #2c3e50;
          }

          p {
            color: #718096;
            margin-bottom: 1rem;
            line-height: 1.6;
          }

          ul {
            padding-left: 1.2rem;
            margin-top: 1rem;

            li {
              margin-bottom: 0.5rem;
              color: #4a5568;
              position: relative;

              &::before {
                content: "•";
                color: #3498db;
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
              }
            }
          }
        }
      }
    }
  }

  .resources {
    margin-bottom: 3rem;

    .resource-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .resource-card {
        background: white;
        border-radius: 12px;
        padding: 2rem 1.5rem;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
        text-decoration: none;
        color: inherit;
        display: block;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        i {
          font-size: 2.5rem;
          color: #3498db;
          margin-bottom: 1.5rem;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #718096;
          line-height: 1.6;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@keyframes rotateCube {
  0% {
    transform: rotateX(25deg) rotateY(0deg);
  }

  100% {
    transform: rotateX(25deg) rotateY(360deg);
  }
}

@media (max-width: 768px) {
  .threejs-container {
    padding: 1rem;

    .header {
      .title-section {
        flex-direction: column;
        text-align: center;

        .logo {
          margin-bottom: 1rem;
        }
      }
    }

    .intro-section {
      padding: 1.5rem;
    }

    .step {
      flex-direction: column;
    }
  }
}
</style>
