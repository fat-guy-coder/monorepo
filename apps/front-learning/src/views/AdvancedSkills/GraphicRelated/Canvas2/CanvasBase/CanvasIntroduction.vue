<template>
  <div class="canvas-container">
    <header>
      <h1>HTML5 Canvas 技术详解</h1>
      <p>现代Web图形渲染的核心技术</p>
      <div class="header-subtitle">
        <span class="tag">2D图形</span>
        <span class="tag">动画</span>
        <span class="tag">数据可视化</span>
        <span class="tag">游戏开发</span>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="main-content">
        <section class="intro-section">
          <h2><span class="icon">🎨</span> 什么是Canvas？</h2>
          <div class="card">
            <p>HTML5 <strong>Canvas</strong> 是一个使用JavaScript绘制图形的HTML元素，它提供了一个位图区域，允许开发者通过脚本动态渲染图形、图表、动画和其他视觉内容。</p>

            <div class="features">
              <div class="feature">
                <div class="feature-icon">🖥️</div>
                <div>
                  <h3>核心特性</h3>
                  <p>基于像素的即时模式图形API，无内置场景图</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">⚡</div>
                <div>
                  <h3>渲染方式</h3>
                  <p>通过JavaScript API直接操作像素，实现高性能渲染</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔧</div>
                <div>
                  <h3>开发模式</h3>
                  <p>命令式编程，开发者完全控制绘制过程和渲染逻辑</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="characteristics-section">
          <h2><span class="icon">📊</span> 核心特点</h2>
          <div class="characteristics-grid">
            <div class="characteristic-card">
              <div class="char-icon">🎯</div>
              <h3>即时模式图形</h3>
              <p>无保留模式图形系统的场景图，每帧完全重绘，提供最大灵活性</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">📝</div>
              <h3>程序化绘制</h3>
              <p>通过JavaScript API完全控制每个绘制操作和像素</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🚀</div>
              <h3>高性能渲染</h3>
              <p>直接操作位图缓冲区，接近原生性能的图形渲染</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🎮</div>
              <h3>丰富的API</h3>
              <p>提供路径、形状、文本、图像、变换和合成等完整绘图功能</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">📱</div>
              <h3>跨平台兼容</h3>
              <p>所有现代浏览器均支持，包括移动设备浏览器</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🔄</div>
              <h3>动画支持</h3>
              <p>与requestAnimationFrame完美配合，实现流畅动画效果</p>
            </div>
          </div>
        </section>

        <section class="performance-section">
          <h2><span class="icon">⚡</span> 性能分析</h2>
          <div class="card">
            <div class="performance-comparison">
              <div class="comparison-header">
                <h3>Canvas 与其他图形技术对比</h3>
              </div>
              <div class="comparison-table">
                <div class="table-row header">
                  <div>技术</div>
                  <div>渲染模式</div>
                  <div>性能特点</div>
                  <div>内存使用</div>
                  <div>适用场景</div>
                </div>
                <div class="table-row highlight">
                  <div>Canvas 2D</div>
                  <div>即时模式</div>
                  <div>高帧率简单图形</div>
                  <div>低到中</div>
                  <div>动态图形、游戏、数据可视化</div>
                </div>
                <div class="table-row">
                  <div>SVG</div>
                  <div>保留模式</div>
                  <div>静态复杂图形</div>
                  <div>高</div>
                  <div>图标、图表、可缩放图形</div>
                </div>
                <div class="table-row">
                  <div>WebGL</div>
                  <div>即时模式</div>
                  <div>极高帧率3D图形</div>
                  <div>中到高</div>
                  <div>3D游戏、复杂可视化</div>
                </div>
                <div class="table-row">
                  <div>CSS动画</div>
                  <div>保留模式</div>
                  <div>UI元素动画</div>
                  <div>低</div>
                  <div>页面过渡、UI效果</div>
                </div>
              </div>
            </div>

            <div class="performance-tips">
              <h3>性能优化技巧</h3>
              <div class="tips-grid">
                <div class="tip">
                  <div class="tip-icon">1</div>
                  <div>
                    <h4>离屏渲染</h4>
                    <p>使用离屏Canvas预渲染静态内容，减少每帧绘制操作</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">2</div>
                  <div>
                    <h4>避免浮点坐标</h4>
                    <p>使用整数坐标避免子像素渲染，提高绘制性能</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">3</div>
                  <div>
                    <h4>分层渲染</h4>
                    <p>使用多个Canvas元素分层，分别更新动态和静态内容</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">4</div>
                  <div>
                    <h4>减少状态变化</h4>
                    <p>批量相同样式绘制操作，减少上下文状态切换</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">5</div>
                  <div>
                    <h4>合理使用clearRect</h4>
                    <p>只清除需要更新的区域，而非整个画布</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">6</div>
                  <div>
                    <h4>避免频繁重绘</h4>
                    <p>使用脏矩形技术，只重绘发生变化的部分</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="difficulty-section">
          <h2><span class="icon">📚</span> 学习难度</h2>
          <div class="card">
            <div class="difficulty-content">
              <div class="difficulty-chart">
                <div class="chart-bar">
                  <div class="bar-label">基础绘图</div>
                  <div class="bar-container">
                    <div class="bar-fill easy" style="width: 70%"></div>
                  </div>
                  <div class="bar-value">简单</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">动画制作</div>
                  <div class="bar-container">
                    <div class="bar-fill medium" style="width: 50%"></div>
                  </div>
                  <div class="bar-value">中等</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">交互处理</div>
                  <div class="bar-container">
                    <div class="bar-fill medium" style="width: 60%"></div>
                  </div>
                  <div class="bar-value">中等</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">性能优化</div>
                  <div class="bar-container">
                    <div class="bar-fill hard" style="width: 80%"></div>
                  </div>
                  <div class="bar-value">困难</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">游戏开发</div>
                  <div class="bar-container">
                    <div class="bar-fill hard" style="width: 85%"></div>
                  </div>
                  <div class="bar-value">困难</div>
                </div>
              </div>

              <div class="learning-path">
                <h3>学习路径建议</h3>
                <div class="path-steps">
                  <div class="path-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>基础绘图API</h4>
                      <p>学习绘制形状、路径、文本和图像的基本方法</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>样式与颜色</h4>
                      <p>掌握填充、描边、渐变和阴影等样式设置</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>变换与合成</h4>
                      <p>学习平移、旋转、缩放和图像合成技术</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h4>动画基础</h4>
                      <p>掌握requestAnimationFrame和基本动画循环</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                      <h4>交互处理</h4>
                      <p>实现鼠标和触摸事件处理，创建交互式图形</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                      <h4>高级主题</h4>
                      <p>学习性能优化、游戏开发和复杂可视化技术</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="sidebar">
        <section class="scenarios-section">
          <h2><span class="icon">🌐</span> 适用场景</h2>
          <div class="card">
            <div class="scenario">
              <div class="scenario-icon">📈</div>
              <div>
                <h3>数据可视化</h3>
                <p>动态图表、实时数据仪表盘、复杂统计图形</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🎮</div>
              <div>
                <h3>游戏开发</h3>
                <p>2D游戏、休闲游戏、互动动画、游戏UI元素</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">✏️</div>
              <div>
                <h3>图形编辑器</h3>
                <p>绘图应用、图像处理工具、设计软件</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">📊</div>
              <div>
                <h3>交互式媒体</h3>
                <p>教育应用、交互式广告、产品演示</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🖼️</div>
              <div>
                <h3>图像处理</h3>
                <p>滤镜应用、图像合成、像素操作</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🔍</div>
              <div>
                <h3>模拟与建模</h3>
                <p>物理模拟、流程图、网络拓扑图</p>
              </div>
            </div>
          </div>
        </section>

        <section class="pros-cons-section">
          <h2><span class="icon">⚖️</span> 优缺点分析</h2>
          <div class="card">
            <div class="pros-cons">
              <div class="pros">
                <h3>优点</h3>
                <ul>
                  <li>高性能图形渲染，适合动态内容</li>
                  <li>像素级控制，实现复杂视觉效果</li>
                  <li>跨平台兼容性，支持所有现代浏览器</li>
                  <li>灵活的动画支持，流畅的用户体验</li>
                  <li>丰富的API，满足各种绘图需求</li>
                  <li>无需插件，纯Web技术实现</li>
                </ul>
              </div>
              <div class="cons">
                <h3>缺点</h3>
                <ul>
                  <li>无内置场景图，需要手动管理绘制状态</li>
                  <li>SEO不友好，内容对搜索引擎不可见</li>
                  <li>无障碍访问支持有限</li>
                  <li>内存使用可能较高，特别是大画布</li>
                  <li>学习曲线较陡峭，高级应用复杂</li>
                  <li>文本渲染质量不如CSS和SVG</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="resources-section">
          <h2><span class="icon">🔗</span> 学习资源</h2>
          <div class="card">
            <div class="resource">
              <h3>官方文档</h3>
              <p>MDN Web Docs - Canvas API</p>
            </div>
            <div class="resource">
              <h3>推荐书籍</h3>
              <p>《HTML5 Canvas核心技术》</p>
            </div>
            <div class="resource">
              <h3>在线教程</h3>
              <p>W3Schools Canvas教程</p>
            </div>
            <div class="resource">
              <h3>实践项目</h3>
              <p>创建简单游戏或数据可视化应用</p>
            </div>
          </div>
        </section>

        <section class="alternatives-section">
          <h2><span class="icon">🔄</span> 替代方案</h2>
          <div class="card">
            <div class="alternative">
              <h3>SVG</h3>
              <p>适合静态矢量图形、图标和可缩放界面元素</p>
            </div>
            <div class="alternative">
              <h3>WebGL</h3>
              <p>适合高性能3D图形和复杂视觉效果</p>
            </div>
            <div class="alternative">
              <h3>CSS动画</h3>
              <p>适合UI元素动画和简单过渡效果</p>
            </div>
            <div class="alternative">
              <h3>第三方库</h3>
              <p>如Fabric.js、Paper.js、Konva.js等简化Canvas开发</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <footer>
      <p>Canvas是Web平台强大的图形渲染技术，为开发者提供了丰富的创意可能性</p>
      <div class="footer-links">
        <span>HTML5</span> •
        <span>图形编程</span> •
        <span>Web开发</span> •
        <span>数据可视化</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 这里可以添加一些响应式数据或方法
const activeTab = ref(0);
</script>

<style scoped lang="less">

:root {
  --primary: #3498db;
  --primary-light: #e1f0fa;
  --secondary: #2ecc71;
  --accent: #e74c3c;
  --light: #f8f9fa;
  --dark: #2c3e50;
  --gray: #7f8c8d;
  --light-gray: #ecf0f1;
  --border: #bdc3c7;
  --shadow: rgba(0, 0, 0, 0.08);
}

.canvas-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #333;
  min-height: 100vh;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(52, 152, 219, 0.15);

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      color: var(--gray);
      max-width: 800px;
      margin: 0 auto 20px;
      line-height: 1.6;
    }

    .header-subtitle {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;

      .tag {
        background: rgba(255, 255, 255, 0.8);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.95rem;
        color: var(--primary);
        font-weight: 500;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(52, 152, 219, 0.2);
      }
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 25px;
    margin-bottom: 40px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  h2 {
    font-size: 1.6rem;
    color: var(--dark);
    margin-top: 0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 10px;
      font-size: 1.4rem;
    }
  }

  .card {
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 18px var(--shadow);
    padding: 25px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-3px);
    }
  }

  .intro-section {
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 25px;

      .feature {
        display: flex;
        gap: 15px;
        padding: 18px;
        background: var(--primary-light);
        border-radius: 12px;
        border-left: 4px solid var(--primary);

        .feature-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        h3 {
          font-size: 1.2rem;
          margin: 0 0 8px 0;
          color: var(--dark);
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--gray);
          line-height: 1.5;
        }
      }
    }
  }

  .characteristics-section {
    .characteristics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .characteristic-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 12px var(--shadow);
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-5px);
        }

        .char-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.2rem;
          margin: 0 0 10px 0;
          color: var(--dark);
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--gray);
          line-height: 1.5;
        }
      }
    }
  }

  .performance-section {
    .performance-comparison {
      margin-bottom: 30px;

      .comparison-header {
        margin-bottom: 20px;

        h3 {
          font-size: 1.3rem;
          margin: 0;
          color: var(--dark);
        }
      }

      .comparison-table {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr;
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;

        .table-row {
          display: contents;

          &.header > div {
            background: var(--primary);
            color: rgb(8, 0, 0);
            font-weight: 600;
            padding: 15px;
            text-align: center;
          }

          &.highlight > div {
            background: #e1f0fa;
            font-weight: 500;
          }

          > div {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border);
            background: white;
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .performance-tips {
      h3 {
        font-size: 1.3rem;
        margin: 0 0 20px 0;
        color: var(--dark);
      }

      .tips-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;

        .tip {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 3px solid var(--primary);

          .tip-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
          }

          h4 {
            font-size: 1.1rem;
            margin: 0 0 5px 0;
            color: var(--dark);
          }

          p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--gray);
            line-height: 1.5;
          }
        }
      }
    }
  }

  .difficulty-section {
    .difficulty-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .difficulty-chart {
      .chart-bar {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .bar-label {
          width: 100px;
          font-size: 0.95rem;
          color: var(--dark);
          font-weight: 500;
        }

        .bar-container {
          flex: 1;
          height: 20px;
          background: #eef2f7;
          border-radius: 10px;
          overflow: hidden;
          margin: 0 15px;

          .bar-fill {
            height: 100%;
            border-radius: 10px;

            &.easy {
              background: #2ecc71;
            }

            &.medium {
              background: #f39c12;
            }

            &.hard {
              background: #e74c3c;
            }
          }
        }

        .bar-value {
          width: 60px;
          text-align: right;
          font-size: 0.9rem;
          color: var(--gray);
        }
      }
    }

    .learning-path {
      .path-steps {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .path-step {
          display: flex;
          gap: 15px;
          position: relative;
          padding-left: 15px;

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, var(--primary), #3498db00);
          }

          &:last-child::before {
            height: 30px;
          }

          .step-number {
            flex-shrink: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1rem;
            margin-top: 5px;
          }

          .step-content {
            h4 {
              font-size: 1.1rem;
              margin: 0 0 5px 0;
              color: var(--dark);
            }

            p {
              margin: 0;
              font-size: 0.9rem;
              color: var(--gray);
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .scenarios-section {
    .scenario {
      display: flex;
      gap: 15px;
      padding: 15px;
      border-bottom: 1px solid var(--light-gray);

      &:last-child {
        border-bottom: none;
      }

      .scenario-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        background: #e1f0fa;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3 {
        margin: 0 0 5px 0;
        font-size: 1.1rem;
        color: var(--dark);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--gray);
        line-height: 1.5;
      }
    }
  }

  .pros-cons-section {
    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }

      .pros, .cons {
        h3 {
          font-size: 1.2rem;
          margin: 0 0 15px 0;
          color: var(--dark);
          display: flex;
          align-items: center;

          &::before {
            content: "";
            width: 20px;
            height: 20px;
            margin-right: 10px;
            border-radius: 50%;
          }
        }

        ul {
          padding-left: 20px;
          margin: 0;

          li {
            margin-bottom: 10px;
            font-size: 0.95rem;
            line-height: 1.5;
            position: relative;

            &::before {
              content: "•";
              color: var(--primary);
              font-weight: bold;
              display: inline-block;
              width: 1em;
              margin-left: -1em;
            }
          }
        }
      }

      .pros h3::before {
        background: #2ecc71;
      }

      .cons h3::before {
        background: #e74c3c;
      }

      .cons ul li::before {
        color: #e74c3c;
      }
    }
  }

  .resources-section, .alternatives-section {
    .resource, .alternative {
      padding: 15px;
      border-bottom: 1px solid var(--light-gray);

      &:last-child {
        border-bottom: none;
      }

      h3 {
        font-size: 1.1rem;
        margin: 0 0 5px 0;
        color: var(--dark);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--gray);
        line-height: 1.5;
      }
    }
  }

  footer {
    text-align: center;
    padding: 30px 20px;
    margin-top: 40px;
    color: var(--gray);
    font-size: 1rem;
    border-top: 1px solid var(--border);

    p {
      max-width: 700px;
      margin: 0 auto 15px;
      line-height: 1.6;
    }

    .footer-links {
      font-size: 0.95rem;
      color: var(--primary);

      span {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
