<template>
  <div class="threejs-learning-container">
    <header class="page-header">
      <h1 class="title">Three.js 学习路线</h1>
      <p class="subtitle">从零开始掌握3D Web开发</p>
    </header>

    <main class="content">
      <!-- 学习概览 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">学习概览</h2>
          <div class="card-content">
            <div class="overview-grid">
              <div class="overview-item">
                <div class="overview-icon">🎯</div>
                <div class="overview-text">
                  <h3>学习目标</h3>
                  <p>掌握Three.js核心概念，能够独立开发3D Web应用</p>
                </div>
              </div>
              <div class="overview-item">
                <div class="overview-icon">⏱️</div>
                <div class="overview-text">
                  <h3>预计时长</h3>
                  <p>2-3个月（根据学习强度调整）</p>
                </div>
              </div>
              <div class="overview-item">
                <div class="overview-icon">📚</div>
                <div class="overview-text">
                  <h3>前置知识</h3>
                  <p>HTML、CSS、JavaScript基础</p>
                </div>
              </div>
              <div class="overview-item">
                <div class="overview-icon">🎨</div>
                <div class="overview-text">
                  <h3>适用领域</h3>
                  <p>数据可视化、游戏开发、产品展示等</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习路线 -->
      <section class="roadmap-section">
        <div class="card">
          <h2 class="card-title">详细学习路线</h2>
          <div class="card-content">
            <div class="timeline">
              <!-- 阶段1 -->
              <div class="timeline-item">
                <div class="timeline-marker">
                  <div class="marker-circle">1</div>
                </div>
                <div class="timeline-content">
                  <div class="phase-header">
                    <h3 class="phase-title">基础入门阶段 (1-2周)</h3>
                    <span class="phase-duration">初学者</span>
                  </div>
                  <div class="phase-content">
                    <div class="learning-points">
                      <div class="point-item">
                        <span class="point-icon">📖</span>
                        <div class="point-content">
                          <h4>Three.js 核心概念</h4>
                          <ul>
                            <li>场景(Scene)、相机(Camera)、渲染器(Renderer)</li>
                            <li>几何体(Geometry)与材质(Material)</li>
                            <li>网格(Mesh)与物体(Object3D)</li>
                            <li>光源(Light)类型与使用</li>
                          </ul>
                        </div>
                      </div>
                      <div class="point-item">
                        <span class="point-icon">⚡</span>
                        <div class="point-content">
                          <h4>第一个3D场景</h4>
                          <ul>
                            <li>搭建基础Three.js项目结构</li>
                            <li>创建立方体、球体等基本几何体</li>
                            <li>添加环境光和点光源</li>
                            <li>实现相机控制和基础动画</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="practice-project">
                      <h5>实践项目：旋转立方体场景</h5>
                      <p>创建一个包含多个几何体的场景，实现旋转动画和基础交互</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 阶段2 -->
              <div class="timeline-item">
                <div class="timeline-marker">
                  <div class="marker-circle">2</div>
                </div>
                <div class="timeline-content">
                  <div class="phase-header">
                    <h3 class="phase-title">核心掌握阶段 (2-3周)</h3>
                    <span class="phase-duration">进阶</span>
                  </div>
                  <div class="phase-content">
                    <div class="learning-points">
                      <div class="point-item">
                        <span class="point-icon">🎨</span>
                        <div class="point-content">
                          <h4>材质与纹理</h4>
                          <ul>
                            <li>基础材质：MeshBasicMaterial、MeshPhongMaterial</li>
                            <li>高级材质：MeshStandardMaterial、MeshPhysicalMaterial</li>
                            <li>纹理映射：颜色贴图、法线贴图、粗糙度贴图</li>
                            <li>环境贴图与HDR</li>
                          </ul>
                        </div>
                      </div>
                      <div class="point-item">
                        <span class="point-icon">🔄</span>
                        <div class="point-content">
                          <h4>动画与交互</h4>
                          <ul>
                            <li>使用requestAnimationFrame实现动画</li>
                            <li>GSAP动画库集成</li>
                            <li>射线检测(Raycaster)与物体选择</li>
                            <li>相机动画与过渡</li>
                          </ul>
                        </div>
                      </div>
                      <div class="point-item">
                        <span class="point-icon">📦</span>
                        <div class="point-content">
                          <h4>模型加载</h4>
                          <ul>
                            <li>GLTF/GLB格式模型加载</li>
                            <li>OBJ、FBX格式支持</li>
                            <li>模型优化与压缩</li>
                            <li>动画混合器(AnimationMixer)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="practice-project">
                      <h5>实践项目：3D产品展示器</h5>
                      <p>加载外部3D模型，实现产品旋转、缩放、材质切换等交互功能</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 阶段3 -->
              <div class="timeline-item">
                <div class="timeline-marker">
                  <div class="marker-circle">3</div>
                </div>
                <div class="timeline-content">
                  <div class="phase-header">
                    <h3 class="phase-title">高级特性阶段 (3-4周)</h3>
                    <span class="phase-duration">高级</span>
                  </div>
                  <div class="phase-content">
                    <div class="learning-points">
                      <div class="point-item">
                        <span class="point-icon">✨</span>
                        <div class="point-content">
                          <h4>着色器与自定义材质</h4>
                          <ul>
                            <li>GLSL基础语法</li>
                            <li>顶点着色器(Vertex Shader)与片元着色器(Fragment Shader)</li>
                            <li>ShaderMaterial自定义材质</li>
                            <li>后处理效果(Post-processing)</li>
                          </ul>
                        </div>
                      </div>
                      <div class="point-item">
                        <span class="point-icon">🌍</span>
                        <div class="point-content">
                          <h4>性能优化</h4>
                          <ul>
                            <li>几何体合并(Geometry Merging)</li>
                            <li>LOD(Level of Detail)技术</li>
                            <li>视锥裁剪(Frustum Culling)</li>
                            <li>实例化渲染(Instanced Rendering)</li>
                          </ul>
                        </div>
                      </div>
                      <div class="point-item">
                        <span class="point-icon">🔊</span>
                        <div class="point-content">
                          <h4>物理与声音</h4>
                          <ul>
                            <li>Cannon.js物理引擎集成</li>
                            <li>Ammo.js物理引擎使用</li>
                            <li>3D空间音效</li>
                            <li>碰撞检测与响应</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="practice-project">
                      <h5>实践项目：交互式3D游戏场景</h5>
                      <p>创建包含物理效果、自定义着色器、音效的完整3D交互场景</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 阶段4 -->
              <div class="timeline-item">
                <div class="timeline-marker">
                  <div class="marker-circle">4</div>
                </div>
                <div class="timeline-content">
                  <div class="phase-header">
                    <h3 class="phase-title">专业应用阶段 (持续学习)</h3>
                    <span class="phase-duration">专家</span>
                  </div>
                  <div class="phase-content">
                    <div class="learning-points">
                      <div class="point-item">
                        <span class="point-icon">🚀</span>
                        <div class="point-content">
                          <h4>框架集成</h4>
                          <ul>
                            <li>React Three Fiber生态系统</li>
                            <li>Vue与Three.js结合</li>
                            <li>Angular集成方案</li>
                            <li>Next.js服务端渲染</li>
                          </ul>
                        </div>
                      </div>
                      <div class="point-item">
                        <span class="point-icon">📊</span>
                        <div class="point-content">
                          <h4>数据可视化</h4>
                          <ul>
                            <li>3D图表与图形</li>
                            <li>大尺度数据渲染优化</li>
                            <li>实时数据流可视化</li>
                            <li>VR/AR数据展示</li>
                          </ul>
                        </div>
                      </div>
                      <div class="point-item">
                        <span class="point-icon">🕶️</span>
                        <div class="point-content">
                          <h4>XR技术</h4>
                          <ul>
                            <li>WebVR与WebXR基础</li>
                            <li>VR控制器交互</li>
                            <li>AR标记识别</li>
                            <li>空间定位与追踪</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="practice-project">
                      <h5>终极项目：完整的3D Web应用</h5>
                      <p>结合所学技术，开发一个包含复杂交互、优化性能、框架集成的生产级应用</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 资源推荐 -->
      <section class="resources-section">
        <div class="card">
          <h2 class="card-title">学习资源推荐</h2>
          <div class="card-content">
            <div class="resources-grid">
              <div class="resource-category">
                <h3>官方资源</h3>
                <ul class="resource-list">
                  <li>
                    <a href="https://threejs.org/docs/" target="_blank" class="resource-link">
                      <span class="resource-icon">📚</span>
                      Three.js官方文档
                    </a>
                  </li>
                  <li>
                    <a href="https://threejs.org/examples/" target="_blank" class="resource-link">
                      <span class="resource-icon">🔍</span>
                      官方示例
                    </a>
                  </li>
                </ul>
              </div>
              <div class="resource-category">
                <h3>学习平台</h3>
                <ul class="resource-list">
                  <li>
                    <span class="resource-icon">🎓</span>
                    Three.js Journey课程
                  </li>
                  <li>
                    <span class="resource-icon">📺</span>
                    YouTube教程频道
                  </li>
                </ul>
              </div>
              <div class="resource-category">
                <h3>工具资源</h3>
                <ul class="resource-list">
                  <li>
                    <span class="resource-icon">🛠️</span>
                    Blender 3D建模
                  </li>
                  <li>
                    <span class="resource-icon">🎨</span>
                    Substance Painter纹理制作
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习建议 -->
      <section class="tips-section">
        <div class="card">
          <h2 class="card-title">学习建议</h2>
          <div class="card-content">
            <div class="tips-grid">
              <div class="tip-item">
                <div class="tip-icon">💡</div>
                <div class="tip-content">
                  <h4>循序渐进</h4>
                  <p>不要急于求成，每个阶段都要扎实掌握后再进入下一阶段</p>
                </div>
              </div>
              <div class="tip-item">
                <div class="tip-icon">🔨</div>
                <div class="tip-content">
                  <h4>多动手实践</h4>
                  <p>理论结合实践，每个知识点都要通过代码验证</p>
                </div>
              </div>
              <div class="tip-item">
                <div class="tip-icon">👥</div>
                <div class="tip-content">
                  <h4>参与社区</h4>
                  <p>加入Three.js社区，学习他人经验，解决遇到的问题</p>
                </div>
              </div>
              <div class="tip-item">
                <div class="tip-icon">🎯</div>
                <div class="tip-content">
                  <h4>项目驱动</h4>
                  <p>以实际项目为目标，有针对性地学习相关技术</p>
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
.threejs-learning-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%);
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

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.overview-item {
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

  .overview-icon {
    font-size: 2rem;
    margin-right: 16px;
  }

  .overview-text {
    h3 {
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

.timeline {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #667eea, #764ba2);
  }
}

.timeline-item {
  display: flex;
  margin-bottom: 40px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-marker {
  width: 60px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.marker-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.timeline-content {
  flex: 1;
  margin-left: 20px;
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;

  .phase-title {
    margin: 0;
    color: #2c3e50;
    font-size: 1.3rem;
  }

  .phase-duration {
    background: #e9ecef;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
  }
}

.learning-points {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.point-item {
  display: flex;
  align-items: flex-start;

  .point-icon {
    font-size: 1.5rem;
    margin-right: 16px;
    margin-top: 4px;
  }

  .point-content {
    flex: 1;

    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin-bottom: 4px;
        color: #555;
        font-size: 0.95rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.practice-project {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  border-left: 4px solid #667eea;

  h5 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.resource-category {
  h3 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.resource-link {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateX(4px);
  }

  .resource-icon {
    margin-right: 12px;
    font-size: 1.2rem;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
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

// 响应式设计
@media (max-width: 768px) {
  .threejs-learning-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .timeline {
    &::before {
      left: 20px;
    }
  }

  .timeline-marker {
    width: 40px;
  }

  .marker-circle {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .timeline-content {
    margin-left: 16px;
  }

  .phase-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .overview-grid,
  .resources-grid,
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
