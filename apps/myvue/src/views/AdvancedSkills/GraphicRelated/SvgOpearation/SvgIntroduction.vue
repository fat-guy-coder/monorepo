<template>
  <div class="svg-container">
    <header>
      <h1>SVG 可缩放矢量图形</h1>
      <p>基于XML的2D矢量图形格式，用于描述静态和动态图形</p>
      <div class="header-subtitle">
        <span class="tag">矢量图形</span>
        <span class="tag">XML</span>
        <span class="tag">响应式</span>
        <span class="tag">W3C标准</span>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="main-content">
        <section class="intro-section">
          <h2><span class="icon">🎨</span> 什么是SVG？</h2>
          <div class="card">
            <p><strong>SVG (Scalable Vector Graphics)</strong> 是一种基于XML的矢量图像格式，由W3C制定标准。与基于像素的位图不同，SVG使用数学公式描述图形，使其可以无限缩放而不失真。</p>

            <div class="features">
              <div class="feature">
                <div class="feature-icon">📐</div>
                <div>
                  <h3>矢量格式</h3>
                  <p>使用数学公式描述图形，而非像素网格</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔍</div>
                <div>
                  <h3>无限缩放</h3>
                  <p>任意放大缩小都不会损失图像质量</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">📝</div>
                <div>
                  <h3>文本格式</h3>
                  <p>基于XML的纯文本格式，可直接编辑</p>
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
              <h3>分辨率无关</h3>
              <p>在任何分辨率下都能保持清晰，适合各种屏幕和打印介质</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🔧</div>
              <h3>可编程性</h3>
              <p>可通过CSS和JavaScript进行样式控制和交互操作</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">📏</div>
              <h3>精确控制</h3>
              <p>提供精确的坐标系统和图形定位能力</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🔍</div>
              <h3>可访问性</h3>
              <p>支持文本描述，对屏幕阅读器和搜索引擎友好</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🔄</div>
              <h3>动画支持</h3>
              <p>内置SMIL动画支持，也可使用CSS和JavaScript动画</p>
            </div>
            <div class="characteristic-card">
              <div class="char-icon">🌐</div>
              <h3>广泛支持</h3>
              <p>所有现代浏览器都原生支持SVG，无需插件</p>
            </div>
          </div>
        </section>

        <section class="performance-section">
          <h2><span class="icon">⚡</span> 性能分析</h2>
          <div class="card">
            <div class="performance-comparison">
              <div class="comparison-header">
                <h3>SVG 与其他图形技术对比</h3>
              </div>
              <div class="comparison-table">
                <div class="table-row header">
                  <div>技术</div>
                  <div>图形类型</div>
                  <div>性能特点</div>
                  <div>文件大小</div>
                  <div>适用场景</div>
                </div>
                <div class="table-row highlight">
                  <div>SVG</div>
                  <div>矢量图形</div>
                  <div>DOM元素多时较慢</div>
                  <div>简单图形小，复杂图形大</div>
                  <div>图标、图表、可缩放图形</div>
                </div>
                <div class="table-row">
                  <div>Canvas</div>
                  <div>位图</div>
                  <div>高帧率简单图形</div>
                  <div>与分辨率相关</div>
                  <div>动态图形、游戏、数据可视化</div>
                </div>
                <div class="table-row">
                  <div>CSS图形</div>
                  <div>基本形状</div>
                  <div>GPU加速，性能好</div>
                  <div>极小(代码)</div>
                  <div>简单形状、UI元素</div>
                </div>
                <div class="table-row">
                  <div>WebGL</div>
                  <div>3D图形</div>
                  <div>极高帧率3D图形</div>
                  <div>中到大</div>
                  <div>3D游戏、复杂可视化</div>
                </div>
              </div>
            </div>

            <div class="performance-tips">
              <h3>SVG性能优化技巧</h3>
              <div class="tips-grid">
                <div class="tip">
                  <div class="tip-icon">1</div>
                  <div>
                    <h4>简化路径</h4>
                    <p>使用工具简化路径数据，减少节点数量</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">2</div>
                  <div>
                    <h4>使用CSS样式</h4>
                    <p>避免内联样式，使用CSS类统一管理样式</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">3</div>
                  <div>
                    <h4>减少DOM元素</h4>
                    <p>合并多个路径，使用symbol和use元素复用图形</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">4</div>
                  <div>
                    <h4>适当使用滤镜</h4>
                    <p>滤镜效果消耗性能，仅在必要时使用</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">5</div>
                  <div>
                    <h4>优化动画</h4>
                    <p>使用CSS变换而非SMIL动画，优先使用transform</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">6</div>
                  <div>
                    <h4>预渲染复杂图形</h4>
                    <p>对静态复杂图形使用canvas预渲染</p>
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
                  <div class="bar-label">基础形状</div>
                  <div class="bar-container">
                    <div class="bar-fill easy" style="width: 30%"></div>
                  </div>
                  <div class="bar-value">简单</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">路径绘制</div>
                  <div class="bar-container">
                    <div class="bar-fill medium" style="width: 60%"></div>
                  </div>
                  <div class="bar-value">中等</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">滤镜效果</div>
                  <div class="bar-container">
                    <div class="bar-fill hard" style="width: 70%"></div>
                  </div>
                  <div class="bar-value">困难</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">SMIL动画</div>
                  <div class="bar-container">
                    <div class="bar-fill medium" style="width: 50%"></div>
                  </div>
                  <div class="bar-value">中等</div>
                </div>
                <div class="chart-bar">
                  <div class="bar-label">JavaScript交互</div>
                  <div class="bar-container">
                    <div class="bar-fill medium" style="width: 55%"></div>
                  </div>
                  <div class="bar-value">中等</div>
                </div>
              </div>

              <div class="learning-path">
                <h3>学习路径建议</h3>
                <div class="path-steps">
                  <div class="path-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>基础形状元素</h4>
                      <p>学习rect, circle, ellipse, line, polygon等基本形状</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>路径(path)元素</h4>
                      <p>掌握路径命令(M, L, H, V, C, S, Q, T, A, Z)的使用</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>文本和样式</h4>
                      <p>学习text元素和CSS样式应用</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h4>渐变和图案</h4>
                      <p>掌握linearGradient, radialGradient和pattern的使用</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                      <h4>滤镜效果</h4>
                      <p>学习feGaussianBlur, feColorMatrix等滤镜效果</p>
                    </div>
                  </div>
                  <div class="path-step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                      <h4>动画与交互</h4>
                      <p>掌握SMIL动画和JavaScript交互技术</p>
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
              <div class="scenario-icon">📱</div>
              <div>
                <h3>响应式图标</h3>
                <p>适应不同屏幕尺寸的图标和界面元素</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">📊</div>
              <div>
                <h3>数据可视化</h3>
                <p>图表、图形和数据展示，特别是需要缩放的情况</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🎨</div>
              <div>
                <h3>Logo和品牌元素</h3>
                <p>需要保持清晰度的品牌标识和图形元素</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🗺️</div>
              <div>
                <h3>地图和示意图</h3>
                <p>交互式地图、流程图和技术示意图</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">✏️</div>
              <div>
                <h3>插图艺术</h3>
                <p>高质量的矢量插图和艺术作品</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🔍</div>
              <div>
                <h3>高分辨率显示</h3>
                <p>Retina屏幕和其他高DPI设备的图形显示</p>
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
                  <li>无限缩放不失真，适合各种分辨率设备</li>
                  <li>文件体积通常较小，特别是简单图形</li>
                  <li>可通过CSS和JavaScript完全控制样式和交互</li>
                  <li>对搜索引擎友好，支持文本索引</li>
                  <li>良好的可访问性支持，屏幕阅读器可读取</li>
                  <li>动画支持丰富，可通过多种方式实现</li>
                </ul>
              </div>
              <div class="cons">
                <h3>缺点</h3>
                <ul>
                  <li>复杂图形DOM元素多，性能可能受影响</li>
                  <li>不适合照片等复杂位图内容</li>
                  <li>学习曲线较陡，特别是路径语法</li>
                  <li>某些旧浏览器支持有限</li>
                  <li>滤镜效果性能消耗较大</li>
                  <li>与Canvas相比，实时渲染性能较低</li>
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
              <p>MDN Web Docs - SVG</p>
            </div>
            <div class="resource">
              <h3>推荐书籍</h3>
              <p>《SVG精髓》第二版</p>
            </div>
            <div class="resource">
              <h3>在线教程</h3>
              <p>W3Schools SVG教程</p>
            </div>
            <div class="resource">
              <h3>设计工具</h3>
              <p>Adobe Illustrator, Inkscape, Figma</p>
            </div>
          </div>
        </section>

        <section class="alternatives-section">
          <h2><span class="icon">🔄</span> 替代方案</h2>
          <div class="card">
            <div class="alternative">
              <h3>Canvas</h3>
              <p>适合动态图形、游戏和像素级操作</p>
            </div>
            <div class="alternative">
              <h3>CSS图形</h3>
              <p>适合简单形状、UI元素和动画效果</p>
            </div>
            <div class="alternative">
              <h3>WebGL</h3>
              <p>适合高性能3D图形和复杂可视化</p>
            </div>
            <div class="alternative">
              <h3>位图格式</h3>
              <p>如PNG、JPEG，适合照片和复杂图像</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="svg-examples">
      <h2><span class="icon">🔍</span> SVG示例</h2>
      <div class="examples-grid">
        <div class="example-card">
          <div class="example-svg">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="#3498db" />
              <text x="50" y="55" text-anchor="middle" fill="white" font-size="16">基本形状</text>
            </svg>
          </div>
          <div class="example-desc">
            <h3>基本形状</h3>
            <p>使用circle元素创建圆形</p>
          </div>
        </div>
        <div class="example-card">
          <div class="example-svg">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <path d="M10 80 Q 40 10, 90 80" stroke="#2ecc71" stroke-width="3" fill="none" />
              <text x="50" y="30" text-anchor="middle" fill="#2c3e50" font-size="12">贝塞尔曲线</text>
            </svg>
          </div>
          <div class="example-desc">
            <h3>路径绘制</h3>
            <p>使用path元素创建贝塞尔曲线</p>
          </div>
        </div>
        <div class="example-card">
          <div class="example-svg">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#e74c3c" />
                <stop offset="100%" stop-color="#3498db" />
              </linearGradient>
              <rect x="10" y="10" width="80" height="80" fill="url(#grad1)" />
              <text x="50" y="55" text-anchor="middle" fill="white" font-size="12">渐变填充</text>
            </svg>
          </div>
          <div class="example-desc">
            <h3>渐变效果</h3>
            <p>使用linearGradient创建渐变填充</p>
          </div>
        </div>
        <div class="example-card">
          <div class="example-svg">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
              <circle cx="50" cy="50" r="30" fill="#9b59b6" filter="url(#blur)" />
              <text x="50" y="55" text-anchor="middle" fill="white" font-size="12">滤镜效果</text>
            </svg>
          </div>
          <div class="example-desc">
            <h3>滤镜效果</h3>
            <p>使用feGaussianBlur创建模糊效果</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>SVG是Web平台强大的矢量图形技术，为响应式设计和高质量图形提供了完美解决方案</p>
      <div class="footer-links">
        <span>矢量图形</span> •
        <span>响应式设计</span> •
        <span>数据可视化</span> •
        <span>Web标准</span>
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

.svg-container {
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
            color: white;
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

  .svg-examples {
    margin-top: 30px;

    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .example-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px var(--shadow);
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-5px);
        }

        .example-svg {
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f8f9fa;
        }

        .example-desc {
          padding: 15px;

          h3 {
            font-size: 1.1rem;
            margin: 0 0 8px 0;
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
