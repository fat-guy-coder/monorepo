<template>
  <div class="bundler-comparison">
    <header class="comparison-header">
      <div class="title-container">
        <div class="logo-group">
          <div class="webpack-logo"></div>
          <div class="vs-text">VS</div>
          <div class="vite-logo"></div>
        </div>
        <h1>Webpack 与 Vite 对比</h1>
        <p class="subtitle">现代前端构建工具深度解析与选择指南</p>
      </div>
    </header>

    <main class="comparison-content">
      <section class="overview-section">
        <div class="overview-card">
          <h2>工具概述</h2>
          <div class="overview-grid">
            <div class="tool-card webpack">
              <h3>Webpack</h3>
              <div class="tool-meta">
                <div class="meta-item">
                  <span class="meta-label">诞生时间</span>
                  <span class="meta-value">2012年</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">核心思想</span>
                  <span class="meta-value">一切皆模块</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">最新版本</span>
                  <span class="meta-value">v5.x</span>
                </div>
              </div>
              <p class="tool-desc">
                JavaScript 应用的静态模块打包器，通过依赖图分析将所有模块打包成少量 bundle 文件
              </p>
            </div>

            <div class="tool-card vite">
              <h3>Vite</h3>
              <div class="tool-meta">
                <div class="meta-item">
                  <span class="meta-label">诞生时间</span>
                  <span class="meta-value">2020年</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">核心思想</span>
                  <span class="meta-value">原生ESM按需编译</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">最新版本</span>
                  <span class="meta-value">v4.x</span>
                </div>
              </div>
              <p class="tool-desc">
                下一代前端开发与构建工具，利用浏览器原生ES模块支持实现极速开发体验
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="architecture-section">
        <div class="section-header">
          <h2>架构与工作原理</h2>
          <p>底层实现原理的根本差异决定了两种工具的不同特性</p>
        </div>

        <div class="architecture-comparison">
          <div class="architecture-card">
            <h3>Webpack 工作流程</h3>
            <div class="architecture-diagram webpack">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>入口起点</h4>
                  <p>从配置的入口文件开始</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>依赖解析</h4>
                  <p>递归构建依赖关系图</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>Loader处理</h4>
                  <p>使用Loader转换非JS模块</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>插件优化</h4>
                  <p>应用插件进行优化处理</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">5</div>
                <div class="step-content">
                  <h4>打包输出</h4>
                  <p>生成打包后的bundle文件</p>
                </div>
              </div>
            </div>

            <div class="architecture-detail">
              <h4>核心特点：</h4>
              <ul>
                <li>先打包，后运行</li>
                <li>基于依赖图的静态打包机制</li>
                <li>开发环境使用Webpack Dev Server</li>
                <li>打包过程需要完整处理所有模块</li>
                <li>支持各种loader和plugin扩展</li>
              </ul>
            </div>
          </div>

          <div class="architecture-card">
            <h3>Vite 工作流程</h3>
            <div class="architecture-diagram vite">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>启动服务器</h4>
                  <p>快速启动开发服务器</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>按需编译</h4>
                  <p>浏览器请求时编译模块</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>ESM处理</h4>
                  <p>原生ES模块加载依赖</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>热更新</h4>
                  <p>快速HMR无需重新打包</p>
                </div>
              </div>

              <div class="arrow">➔</div>

              <div class="step">
                <div class="step-icon">5</div>
                <div class="step-content">
                  <h4>生产打包</h4>
                  <p>Rollup进行生产构建</p>
                </div>
              </div>
            </div>

            <div class="architecture-detail">
              <h4>核心特点：</h4>
              <ul>
                <li>先运行，后(按需)打包</li>
                <li>基于浏览器原生ES模块</li>
                <li>按需编译，无需打包整个应用</li>
                <li>开发服务器启动极快</li>
                <li>生产环境使用Rollup打包</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="performance-section">
        <div class="section-header">
          <h2>性能对比</h2>
          <p>启动速度、热更新与构建效率的实际表现</p>
        </div>

        <div class="performance-chart">
          <div class="chart-header">
            <div class="chart-title">开发环境启动时间对比 (项目规模)</div>
            <div class="chart-legend">
              <div class="legend-item webpack">
                <span class="legend-color"></span>
                <span>Webpack</span>
              </div>
              <div class="legend-item vite">
                <span class="legend-color"></span>
                <span>Vite</span>
              </div>
            </div>
          </div>

          <div class="chart-bars">
            <div class="chart-row">
              <div class="row-label">小型项目</div>
              <div class="bar-container">
                <div class="bar webpack" :style="{ width: '70%' }">3.2s</div>
                <div class="bar vite" :style="{ width: '20%' }">0.3s</div>
              </div>
            </div>

            <div class="chart-row">
              <div class="row-label">中型项目</div>
              <div class="bar-container">
                <div class="bar webpack" :style="{ width: '100%' }">12.5s</div>
                <div class="bar vite" :style="{ width: '25%' }">0.8s</div>
              </div>
            </div>

            <div class="chart-row">
              <div class="row-label">大型项目</div>
              <div class="bar-container">
                <div class="bar webpack" :style="{ width: '100%' }">35.8s</div>
                <div class="bar vite" :style="{ width: '30%' }">1.5s</div>
              </div>
            </div>
          </div>
        </div>

        <div class="performance-features">
          <div class="feature-card">
            <h3>热更新速度</h3>
            <div class="feature-content">
              <div class="feature-detail webpack">
                <h4>Webpack</h4>
                <p>需要重建部分模块树，更新时间与修改模块数量有关</p>
                <div class="speed-indicator">
                  <div class="speed-bar slow"></div>
                  <span>较慢</span>
                </div>
              </div>

              <div class="feature-detail vite">
                <h4>Vite</h4>
                <p>仅精确更新修改的模块，几乎不受项目规模影响</p>
                <div class="speed-indicator">
                  <div class="speed-bar fast"></div>
                  <span>极快</span>
                </div>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <h3>生产构建</h3>
            <div class="feature-content">
              <div class="feature-detail webpack">
                <h4>Webpack</h4>
                <p>成熟的打包优化，支持复杂配置和代码分割</p>
                <div class="speed-indicator">
                  <div class="speed-bar medium"></div>
                  <span>中等</span>
                </div>
              </div>

              <div class="feature-detail vite">
                <h4>Vite</h4>
                <p>使用Rollup打包，输出更小体积的代码</p>
                <div class="speed-indicator">
                  <div class="speed-bar fast"></div>
                  <span>快速</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="feature-section">
        <div class="section-header">
          <h2>功能特性对比</h2>
          <p>核心功能支持与开发体验差异</p>
        </div>

        <div class="feature-table">
          <div class="table-row header">
            <div class="table-cell">功能特性</div>
            <div class="table-cell">Webpack</div>
            <div class="table-cell">Vite</div>
            <div class="table-cell">对比说明</div>
          </div>

          <div class="table-row">
            <div class="table-cell">开发服务器启动</div>
            <div class="table-cell"><span class="status warn">慢</span></div>
            <div class="table-cell"><span class="status success">极快</span></div>
            <div class="table-cell">Vite利用浏览器ESM，无需打包</div>
          </div>

          <div class="table-row">
            <div class="table-cell">热模块替换(HMR)</div>
            <div class="table-cell"><span class="status success">支持</span></div>
            <div class="table-cell"><span class="status success">支持</span></div>
            <div class="table-cell">Vite的HMR性能更好，更新更快</div>
          </div>

          <div class="table-row">
            <div class="table-cell">TypeScript支持</div>
            <div class="table-cell"><span class="status success">支持</span></div>
            <div class="table-cell"><span class="status success">支持</span></div>
            <div class="table-cell">Vite使用esbuild转译TS，速度更快</div>
          </div>

          <div class="table-row">
            <div class="table-cell">CSS处理</div>
            <div class="table-cell"><span class="status success">完善</span></div>
            <div class="table-cell"><span class="status success">完善</span></div>
            <div class="table-cell">两者都支持CSS模块、预处理器等</div>
          </div>

          <div class="table-row">
            <div class="table-cell">代码分割</div>
            <div class="table-cell"><span class="status success">强大</span></div>
            <div class="table-cell"><span class="status success">支持</span></div>
            <div class="table-cell">Webpack功能更全面，Vite基于Rollup</div>
          </div>

          <div class="table-row">
            <div class="table-cell">配置复杂度</div>
            <div class="table-cell"><span class="status error">高</span></div>
            <div class="table-cell"><span class="status success">低</span></div>
            <div class="table-cell">Vite开箱即用，配置更简单</div>
          </div>

          <div class="table-row">
            <div class="table-cell">插件系统</div>
            <div class="table-cell"><span class="status success">丰富</span></div>
            <div class="table-cell"><span class="status warn">成长中</span></div>
            <div class="table-cell">Webpack插件生态更成熟</div>
          </div>
        </div>
      </section>

      <section class="ecosystem-section">
        <div class="section-header">
          <h2>生态系统</h2>
          <p>插件、社区与学习资源的成熟度对比</p>
        </div>

        <div class="ecosystem-cards">
          <div class="ecosystem-card webpack">
            <h3>Webpack 生态系统</h3>
            <div class="ecosystem-detail">
              <div class="ecosystem-metric">
                <div class="metric-value">10,000+</div>
                <div class="metric-label">npm插件包</div>
              </div>
              <div class="ecosystem-metric">
                <div class="metric-value">高</div>
                <div class="metric-label">企业采用率</div>
              </div>
              <div class="ecosystem-metric">
                <div class="metric-value">丰富</div>
                <div class="metric-label">学习资源</div>
              </div>
            </div>

            <div class="ecosystem-pros-cons">
              <h4>优势</h4>
              <ul>
                <li>极其成熟的插件生态系统</li>
                <li>社区支持强大，解决方案丰富</li>
                <li>大量生产环境验证案例</li>
                <li>完善的文档和教程资源</li>
              </ul>

              <h4>劣势</h4>
              <ul>
                <li>学习曲线陡峭，配置复杂</li>
                <li>对新特性的支持较慢</li>
                <li>开发体验不如现代工具</li>
              </ul>
            </div>
          </div>

          <div class="ecosystem-card vite">
            <h3>Vite 生态系统</h3>
            <div class="ecosystem-detail">
              <div class="ecosystem-metric">
                <div class="metric-value">300+</div>
                <div class="metric-label">官方插件</div>
              </div>
              <div class="ecosystem-metric">
                <div class="metric-value">快速增长</div>
                <div class="metric-label">社区活跃度</div>
              </div>
              <div class="ecosystem-metric">
                <div class="metric-value">中等</div>
                <div class="metric-label">学习资源</div>
              </div>
            </div>

            <div class="ecosystem-pros-cons">
              <h4>优势</h4>
              <ul>
                <li>开发体验极佳，速度快</li>
                <li>配置简单，开箱即用</li>
                <li>现代化架构，面向未来</li>
                <li>官方框架支持完善</li>
              </ul>

              <h4>劣势</h4>
              <ul>
                <li>插件生态不如Webpack成熟</li>
                <li>旧浏览器支持需要额外配置</li>
                <li>大型项目生产优化仍在完善</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="decision-section">
        <div class="section-header">
          <h2>如何选择？</h2>
          <p>根据项目需求选择最合适的构建工具</p>
        </div>

        <div class="decision-cards">
          <div class="decision-card webpack">
            <h3>选择 Webpack 当：</h3>
            <ul>
              <li>项目需要支持老旧浏览器</li>
              <li>需要复杂构建流程和自定义优化</li>
              <li>项目依赖特定Webpack插件</li>
              <li>大型企业级应用，稳定性优先</li>
              <li>需要微前端架构支持</li>
            </ul>
          </div>

          <div class="decision-card vite">
            <h3>选择 Vite 当：</h3>
            <ul>
              <li>追求极致开发体验和速度</li>
              <li>现代浏览器项目（支持ESM）</li>
              <li>新项目启动，无需考虑旧插件</li>
              <li>使用Vue、React或Svelte框架</li>
              <li>中小型项目，快速迭代</li>
            </ul>
          </div>

          <div class="decision-card hybrid">
            <h3>混合使用场景</h3>
            <ul>
              <li>大型项目开发环境用Vite，生产用Webpack</li>
              <li>微前端中子应用使用Vite，主应用使用Webpack</li>
              <li>逐步迁移策略：新模块使用Vite，旧模块保留Webpack</li>
            </ul>
          </div>
        </div>

        <div class="conclusion">
          <h3>总结建议</h3>
          <p>
            对于新项目，特别是使用现代前端框架的项目，Vite提供了更优秀的开发体验。
            对于现有大型项目或需要支持旧浏览器的项目，Webpack仍是更稳妥的选择。
            随着Vite生态的成熟，它正迅速成为现代前端开发的首选工具。
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
@webpack-color: #8dd6f9;
/* Webpack 主题色 */
@vite-color: #646cff;
/* Vite 主题色 */
@hybrid-color: #9b59b6;
/* 混合方案色 */
@dark-bg: #2b3a42;
@light-bg: #f5f7fa;
@border-color: #e1e5eb;
@text-color: #2c3e50;
@success-color: #27ae60;
@warning-color: #f39c12;
@error-color: #e74c3c;

.bundler-comparison {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background: linear-gradient(135deg, #f8fbff 0%, #edf5ff 100%);
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.04);
}

.comparison-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(to right, @dark-bg, lighten(@webpack-color, 10%));
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  .title-container {
    max-width: 800px;
    margin: 0 auto;

    h1 {
      margin: 20px 0 10px;
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.85;
      font-weight: 300;
    }
  }

  .logo-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-top: 20px;
  }

  .webpack-logo,
  .vite-logo {
    width: 100px;
    height: 100px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .webpack-logo {
    background: linear-gradient(135deg, @webpack-color, darken(@webpack-color, 20%));
    color: @dark-bg;

    &::after {
      content: 'W';
    }
  }

  .vite-logo {
    background: linear-gradient(135deg, @vite-color, darken(@vite-color, 15%));
    color: white;

    &::after {
      content: 'V';
    }
  }

  .vs-text {
    font-size: 1.8rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7);
  }
}

.section-header {
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  p {
    font-size: 1.1rem;
    color: #666;
  }
}

.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
}

// 工具概述卡片
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.tool-card {
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &.webpack {
    background: linear-gradient(135deg, lighten(@webpack-color, 30%), #ffffff);
    border: 1px solid @webpack-color;

    h3 {
      color: darken(@webpack-color, 30%);
    }
  }

  &.vite {
    background: linear-gradient(135deg, lighten(@vite-color, 40%), #ffffff);
    border: 1px solid @vite-color;

    h3 {
      color: darken(@vite-color, 15%);
    }
  }
}

.tool-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;

  .meta-item {
    background: rgba(255, 255, 255, 0.7);
    padding: 12px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
  }

  .meta-label {
    font-weight: 600;
    color: #555;
  }

  .meta-value {
    font-weight: 700;
  }
}

.tool-desc {
  font-size: 1.1rem;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.5);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 0;
}

// 架构对比部分
.architecture-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
}

.architecture-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid @border-color;
  }
}

.architecture-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  padding: 20px;
  border-radius: 10px;

  &.webpack {
    background: rgba(141, 214, 249, 0.1);
  }

  &.vite {
    background: rgba(100, 108, 255, 0.08);
  }

  .step {
    text-align: center;
    min-width: 120px;

    .step-icon {
      width: 40px;
      height: 40px;
      background: @dark-bg;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0 auto 10px;
    }

    .step-content {
      h4 {
        margin: 0 0 5px;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: #666;
      }
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: #888;
    align-self: center;
  }
}

.architecture-detail {
  background: @light-bg;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin-top: 0;
    color: #444;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 0;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}

// 性能对比图表
.performance-chart {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .chart-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
}

.chart-legend {
  display: flex;
  gap: 20px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;

    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }

    &.webpack .legend-color {
      background: @webpack-color;
    }

    &.vite .legend-color {
      background: @vite-color;
    }
  }
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.chart-row {
  display: flex;
  align-items: center;

  .row-label {
    width: 120px;
    font-weight: 600;
  }

  .bar-container {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
  }
}

.bar {
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  font-weight: 600;
  color: white;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &.webpack {
    background: linear-gradient(90deg, darken(@webpack-color, 10%), @webpack-color);
  }

  &.vite {
    background: linear-gradient(90deg, darken(@vite-color, 10%), @vite-color);
    margin-left: 10px;
  }
}

.performance-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.4rem;
    color: #2c3e50;
    text-align: center;
  }
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.feature-detail {
  padding: 15px;
  border-radius: 8px;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  p {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 15px;
  }

  &.webpack {
    background: rgba(141, 214, 249, 0.1);
    border: 1px solid rgba(141, 214, 249, 0.3);

    h4 {
      color: darken(@webpack-color, 30%);
    }
  }

  &.vite {
    background: rgba(100, 108, 255, 0.08);
    border: 1px solid rgba(100, 108, 255, 0.2);

    h4 {
      color: darken(@vite-color, 15%);
    }
  }
}

.speed-indicator {
  display: flex;
  align-items: center;
  gap: 10px;

  .speed-bar {
    height: 8px;
    border-radius: 4px;

    &.slow {
      width: 100px;
      background: linear-gradient(90deg, @error-color, darken(@error-color, 10%));
    }

    &.medium {
      width: 60px;
      background: linear-gradient(90deg, @warning-color, darken(@warning-color, 10%));
    }

    &.fast {
      width: 30px;
      background: linear-gradient(90deg, @success-color, darken(@success-color, 10%));
    }
  }
}

// 功能对比表格
.feature-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 2fr;
  border-bottom: 1px solid @border-color;

  &.header {
    background: @dark-bg;
    color: white;
    font-weight: bold;
  }

  &:last-child {
    border-bottom: none;
  }
}

.table-cell {
  padding: 16px 20px;
  display: flex;
  align-items: center;

  .status {
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 0.9rem;

    &.success {
      background: rgba(@success-color, 0.15);
      color: darken(@success-color, 15%);
    }

    &.warn {
      background: rgba(@warning-color, 0.15);
      color: darken(@warning-color, 15%);
    }

    &.error {
      background: rgba(@error-color, 0.15);
      color: darken(@error-color, 15%);
    }
  }
}

// 生态系统部分
.ecosystem-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
}

.ecosystem-card {
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid @border-color;
    font-size: 1.5rem;
  }

  &.webpack {
    background: linear-gradient(135deg, lighten(@webpack-color, 35%), #ffffff);
    border: 1px solid @webpack-color;
  }

  &.vite {
    background: linear-gradient(135deg, lighten(@vite-color, 40%), #ffffff);
    border: 1px solid @vite-color;
  }
}

.ecosystem-detail {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.ecosystem-metric {
  background: rgba(255, 255, 255, 0.7);
  padding: 15px;

  .metric-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: @dark-bg;
  }

  .metric-label {
    font-size: 0.9rem;
    color: #666;
  }
}

// 续上生态系统样式部分
.ecosystem-pros-cons {
  h4 {
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 1.1rem;
    padding-bottom: 5px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);

    &:first-child {
      margin-top: 0;
    }
  }

  ul {
    padding-left: 20px;
    margin-bottom: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
      padding-left: 5px;

      &::marker {
        color: #555;
      }
    }
  }
}

// 决策部分样式
.decision-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.decision-card {
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  ul {
    padding-left: 20px;
    margin-bottom: 0;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 28px;
      line-height: 1.5;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        top: 0;
        font-size: 24px;
        color: #555;
      }
    }
  }

  &.webpack {
    background: linear-gradient(135deg, lighten(@webpack-color, 33%), #ffffff);
    border: 1px solid @webpack-color;

    h3 {
      color: darken(@webpack-color, 30%);
    }
  }

  &.vite {
    background: linear-gradient(135deg, lighten(@vite-color, 38%), #ffffff);
    border: 1px solid @vite-color;

    h3 {
      color: darken(@vite-color, 15%);
    }
  }

  &.hybrid {
    background: linear-gradient(135deg, lighten(@hybrid-color, 40%), #ffffff);
    border: 1px solid @hybrid-color;
    grid-column: 1 / -1;

    h3 {
      color: darken(@hybrid-color, 20%);
    }
  }
}

.conclusion {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.6rem;
    color: @dark-bg;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;

    &:first-of-type {
      margin-top: 0;
    }
  }
}

// 响应式设计
@media (max-width: 1100px) {

  .architecture-comparison,
  .ecosystem-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .title-container {
    h1 {
      font-size: 2rem !important;
    }

    .subtitle {
      font-size: 1rem !important;
    }
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .performance-features {
    grid-template-columns: 1fr;
  }

  .logo-group {
    gap: 20px !important;

    .webpack-logo,
    .vite-logo {
      width: 70px !important;
      height: 70px !important;
      font-size: 1.8rem !important;
    }
  }
}

@media (max-width: 576px) {
  .feature-content {
    grid-template-columns: 1fr !important;
    gap: 15px !important;
  }

  .chart-row .row-label {
    width: 100px;
    font-size: 0.9rem;
  }

  .table-row {
    grid-template-columns: 1fr;
    padding: 10px 0;

    &.header {
      display: none;
    }

    .table-cell {
      padding: 10px 15px;
      border-bottom: 1px solid #eee;

      &:first-child {
        background: #f8f9fa;
        font-weight: bold;
      }
    }
  }

  .architecture-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 5px 0;
    }
  }

  .ecosystem-detail {
    grid-template-columns: repeat(2, 1fr);
  }
}

// 动画效果
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

section {
  animation: fadeIn 0.5s ease-out forwards;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  &:nth-child(4) {
    animation-delay: 0.4s;
  }

  &:nth-child(5) {
    animation-delay: 0.5s;
  }

  &:nth-child(6) {
    animation-delay: 0.6s;
  }
}

// 打印优化
@media print {
  .bundler-comparison {
    box-shadow: none;
    padding: 0;
  }

  .comparison-header {
    background: white !important;
    color: black !important;
    padding: 10px 0 !important;

    .subtitle {
      color: #666 !important;
    }
  }

  .tool-card,
  .architecture-card,
  .performance-chart,
  .feature-card,
  .ecosystem-card,
  .decision-card,
  .conclusion {
    box-shadow: none;
    border: 1px solid #ddd !important;
    page-break-inside: avoid;
  }
}
</style>
