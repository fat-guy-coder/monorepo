<template>
  <div class="svelte-container">
    <!-- 头部介绍 -->
    <div class="header-section">
      <div class="header-content">
        <div class="title-group">
          <div class="logo-container">
            <div class="svelte-logo">
              <div class="s">S</div>
            </div>
          </div>
          <div class="text-content">
            <h1>Svelte - 下一代Web框架</h1>
            <p class="subtitle">将声明式组件编译为高效命令式代码的革命性框架</p>
            <p>
              /svelt/
              <a href="https://svelte.nodejs.cn/docs/svelte/overview" target="_blank"
                >Svelte 中文官网</a
              >
            </p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🚀</div>
            <div class="stat-content">
              <div class="stat-value">90%</div>
              <div class="stat-label">代码体积减少</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <div class="stat-value">60%</div>
              <div class="stat-label">性能提升</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">😊</div>
            <div class="stat-content">
              <div class="stat-value">#1</div>
              <div class="stat-label">开发者满意度</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-content">
              <div class="stat-value">0KB</div>
              <div class="stat-label">运行时框架</div>
            </div>
          </div>
        </div>
      </div>

      <div class="svelte-code-demo">
        <div class="code-tabs">
          <div class="code-tab active">Svelte语法</div>
          <div class="code-tab">React对比</div>
          <div class="code-tab">Vue对比</div>
        </div>
        <div class="code-editor">
          <div class="code-line">
            <span class="keyword">let</span> count = <span class="number">0</span>;
          </div>
          <div class="code-line">&nbsp;</div>
          <div class="code-line">
            <span class="tag">&lt;button</span> <span class="attr">on:click</span>=<span
              class="string"
              >"{() => count += 1}"</span
            ><span class="tag">&gt;</span>
          </div>
          <div class="code-line">
            &nbsp;&nbsp;Clicked {count} {count === <span class="number">1</span> ?
            <span class="string">'time'</span> : <span class="string">'times'</span>}
          </div>
          <div class="code-line"><span class="tag">&lt;/button&gt;</span></div>
          <div class="code-line">&nbsp;</div>
          <div class="code-line">
            <span class="comment">&lt;!-- 响应式无需hooks或computed --&gt;</span>
          </div>
          <div class="code-line">
            <span class="comment">&lt;!-- 编译后代码大小仅为React/Vue的1/3 --&gt;</span>
          </div>
        </div>
        <div class="code-explanation">
          <div class="explanation-point">
            <div class="point-icon">✅</div>
            <div class="point-text">没有虚拟DOM开销</div>
          </div>
          <div class="explanation-point">
            <div class="point-icon">✅</div>
            <div class="point-text">无需额外状态管理库</div>
          </div>
          <div class="explanation-point">
            <div class="point-icon">✅</div>
            <div class="point-text">真正的响应式变量</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心特点 -->
    <div class="features-section">
      <div class="section-header">
        <div class="section-icon">🌟</div>
        <h2>Svelte核心特点</h2>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🔧</div>
          <h3>编译时框架</h3>
          <p>Svelte在构建时将组件编译为高效的JavaScript代码，无需在客户端下载框架运行时</p>
          <div class="feature-metric">
            <div class="metric-bar" style="width: 95%">
              <span>代码体积减少95%</span>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>卓越性能</h3>
          <p>直接操作DOM，避免虚拟DOM diffing开销，提供接近原生JS的性能</p>
          <div class="feature-metric">
            <div class="metric-bar" style="width: 88%">
              <span>运行时速度提升88%</span>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💖</div>
          <h3>开发者体验</h3>
          <p>简洁的语法、内置响应式、动画支持和极少样板代码提高开发效率</p>
          <div class="feature-metric">
            <div class="metric-bar" style="width: 92%">
              <span>开发者满意度92%</span>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <h3>简洁语法</h3>
          <p>单一文件组件包含HTML、CSS和JS，无需学习复杂API，更接近原生Web开发</p>
          <div class="feature-metric">
            <div class="metric-bar" style="width: 85%">
              <span>学习曲线降低85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细内容分区 -->
    <div class="content-sections">
      <!-- 框架介绍 -->
      <div class="content-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>框架介绍</h2>
        </div>

        <div class="section-content">
          <div class="info-card">
            <h3>什么是Svelte？</h3>
            <p>
              Svelte是由Rich
              Harris于2016年创建的现代前端框架，它采用全新的编译方法，将组件转换为高效的原生JavaScript代码。
            </p>

            <div class="comparison">
              <div class="comparison-item">
                <h4>传统框架</h4>
                <ul>
                  <li>在浏览器中运行框架</li>
                  <li>使用虚拟DOM操作实际DOM</li>
                  <li>包含大量运行时库</li>
                  <li>组件在运行时解释</li>
                </ul>
              </div>
              <div class="comparison-item highlight">
                <h4>Svelte</h4>
                <ul>
                  <li>在构建时编译框架</li>
                  <li>直接操作实际DOM</li>
                  <li>几乎零运行时开销</li>
                  <li>生成高效命令式代码</li>
                </ul>
              </div>
            </div>

            <h3>核心创新：编译优先</h3>
            <p>Svelte的核心创新在于将大部分工作从运行时转移到编译时：</p>
            <ol>
              <li><strong>编译时优化</strong>：分析组件模板并生成最优更新代码</li>
              <li><strong>零运行时</strong>：不需要在客户端下载框架代码</li>
              <li><strong>真正响应式</strong>：使用编译器自动跟踪依赖关系</li>
              <li><strong>极小打包体积</strong>：生成的代码比React/Vue小3-5倍</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- 学习曲线 -->
      <div class="content-section">
        <div class="section-header">
          <div class="section-icon">📈</div>
          <h2>学习难易度</h2>
        </div>

        <div class="section-content">
          <div class="learning-card">
            <div class="learning-content">
              <h3>最简单的Web框架</h3>
              <p>根据2023年State of JS调查，Svelte被评为最容易学习的前端框架</p>

              <div class="learning-stats">
                <div class="stat-item">
                  <div class="stat-value">4.1/5</div>
                  <div class="stat-label">学习曲线评分</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">85%</div>
                  <div class="stat-label">初学者掌握率</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">30min</div>
                  <div class="stat-label">构建第一个应用</div>
                </div>
              </div>

              <h4>为什么Svelte如此易学？</h4>
              <ul>
                <li><strong>熟悉的语法</strong>：使用标准HTML、CSS和JavaScript</li>
                <li><strong>极少新概念</strong>：不需要学习hooks、computed属性等</li>
                <li><strong>内置功能</strong>：状态管理、动画、过渡开箱即用</li>
                <li><strong>简洁API</strong>：少量特定语法，如指令和事件处理</li>
              </ul>
            </div>
            <div class="learning-chart">
              <div class="chart-bar" style="height: 90%">
                <span>Svelte</span>
              </div>
              <div class="chart-bar" style="height: 70%">
                <span>Vue</span>
              </div>
              <div class="chart-bar" style="height: 40%">
                <span>React</span>
              </div>
              <div class="chart-bar" style="height: 35%">
                <span>Angular</span>
              </div>
              <div class="chart-label">学习曲线对比（百分比越高越简单）</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能表现 -->
      <div class="content-section">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h2>性能表现</h2>
        </div>

        <div class="section-content">
          <div class="performance-card">
            <div class="performance-chart">
              <div class="chart-metric">
                <div class="metric-label">JS体积(KB)</div>
                <div class="chart-bar-container">
                  <div class="chart-bar svelte" style="height: 20%">
                    <span>10KB(Svelte)</span>
                  </div>
                  <div class="chart-bar react" style="height: 80%">
                    <span>42KB(React)</span>
                  </div>
                  <div class="chart-bar vue" style="height: 60%">
                    <span>31KB(Vue)</span>
                  </div>
                  <div class="framework-label">Svelte</div>
                  <div class="framework-label">React</div>
                  <div class="framework-label">Vue</div>
                </div>
              </div>

              <div class="chart-metric">
                <div class="metric-label">内存占用(MB)</div>
                <div class="chart-bar-container">
                  <div class="chart-bar svelte" style="height: 25%">
                    <span>2.8MB(Svelte)</span>
                  </div>
                  <div class="chart-bar react" style="height: 95%">
                    <span>10.7MB(React)</span>
                  </div>
                  <div class="chart-bar vue" style="height: 70%">
                    <span>7.9MB(Vue)</span>
                  </div>
                  <div class="framework-label">Svelte</div>
                  <div class="framework-label">React</div>
                  <div class="framework-label">Vue</div>
                </div>
              </div>

              <div class="chart-metric">
                <div class="metric-label">更新速度(ms)</div>
                <div class="chart-bar-container">
                  <div class="chart-bar svelte" style="height: 15%">
                    <span>15ms(Svelte)</span>
                  </div>
                  <div class="chart-bar react" style="height: 65%">
                    <span>67ms(React)</span>
                  </div>
                  <div class="chart-bar vue" style="height: 45%">
                    <span>42ms(Vue)</span>
                  </div>
                  <div class="framework-label">Svelte</div>
                  <div class="framework-label">React</div>
                  <div class="framework-label">Vue</div>
                </div>
              </div>
            </div>

            <div class="performance-details">
              <h3>性能优势分析</h3>
              <div class="performance-feature">
                <div class="feature-icon">⚡</div>
                <div class="feature-content">
                  <h4>无虚拟DOM开销</h4>
                  <p>直接操作真实DOM，避免虚拟DOM的diff计算和内存占用</p>
                </div>
              </div>

              <div class="performance-feature">
                <div class="feature-icon">📦</div>
                <div class="feature-content">
                  <h4>极小的打包体积</h4>
                  <p>编译后代码比主流框架小3-5倍，加快加载速度</p>
                </div>
              </div>

              <div class="performance-feature">
                <div class="feature-icon">🔍</div>
                <div class="feature-content">
                  <h4>精准更新</h4>
                  <p>编译时分析精确知道哪些DOM需要更新，避免不必要的操作</p>
                </div>
              </div>

              <div class="performance-feature">
                <div class="feature-icon">💾</div>
                <div class="feature-content">
                  <h4>低内存消耗</h4>
                  <p>不需要维护虚拟DOM树，减少内存占用</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 生态系统 -->
      <div class="content-section">
        <div class="section-header">
          <div class="section-icon">🌐</div>
          <h2>生态系统</h2>
        </div>

        <div class="section-content">
          <div class="ecosystem-card">
            <div class="ecosystem-intro">
              <h3>快速成长的生态系统</h3>
              <p>虽然相比React/Vue生态系统较小，但Svelte拥有高质量的工具和库，足以满足大多数需求</p>
            </div>

            <div class="ecosystem-grid">
              <div class="ecosystem-category">
                <h4><span class="category-icon">📦</span> 构建工具</h4>
                <ul>
                  <li>SvelteKit（官方框架）</li>
                  <li>Vite + Svelte插件</li>
                  <li>Rollup插件</li>
                  <li>Webpack加载器</li>
                </ul>
              </div>

              <div class="ecosystem-category">
                <h4><span class="category-icon">🧩</span> UI组件库</h4>
                <ul>
                  <li>Svelte Material UI</li>
                  <li>Smelte</li>
                  <li>SvelteStrap</li>
                  <li>Carbon Components</li>
                </ul>
              </div>

              <div class="ecosystem-category">
                <h4><span class="category-icon">🔌</span> 状态管理</h4>
                <ul>
                  <li>内置stores</li>
                  <li>Svelte Store</li>
                  <li>RxJS集成</li>
                  <li>XState</li>
                </ul>
              </div>

              <div class="ecosystem-category">
                <h4><span class="category-icon">📊</span> 数据可视化</h4>
                <ul>
                  <li>Svelte Charts</li>
                  <li>Layer Cake</li>
                  <li>D3集成</li>
                  <li>Chart.js集成</li>
                </ul>
              </div>
            </div>

            <div class="ecosystem-metrics">
              <div class="metric-card">
                <div class="metric-value">5k+</div>
                <div class="metric-label">GitHub仓库</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">700+</div>
                <div class="metric-label">npm包</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">98%</div>
                <div class="metric-label">满意度</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">3x</div>
                <div class="metric-label">年增长</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 适合场景 -->
      <div class="content-section">
        <div class="section-header">
          <div class="section-icon">🎯</div>
          <h2>适合场景</h2>
        </div>

        <div class="section-content">
          <div class="use-cases">
            <div class="use-case-card primary">
              <div class="case-icon">📱</div>
              <div class="case-content">
                <h3>高性能网站</h3>
                <p>需要快速加载和响应的营销页面、落地页和内容网站</p>
              </div>
            </div>

            <div class="use-case-card">
              <div class="case-icon">📲</div>
              <div class="case-content">
                <h3>移动端应用</h3>
                <p>低内存消耗和快速交互体验的PWA和移动Web应用</p>
              </div>
            </div>

            <div class="use-case-card">
              <div class="case-icon">🎮</div>
              <div class="case-content">
                <h3>数据可视化</h3>
                <p>需要高性能渲染的复杂图表和实时数据仪表盘</p>
              </div>
            </div>

            <div class="use-case-card">
              <div class="case-icon">🛒</div>
              <div class="case-content">
                <h3>电子商务</h3>
                <p>需要快速加载和流畅交互的产品展示和购物流程</p>
              </div>
            </div>

            <div class="use-case-card">
              <div class="case-icon">📚</div>
              <div class="case-content">
                <h3>教育应用</h3>
                <p>互动式学习工具和教育游戏</p>
              </div>
            </div>

            <div class="use-case-card">
              <div class="case-icon">🛠️</div>
              <div class="case-content">
                <h3>开发者工具</h3>
                <p>低延迟响应的开发者工具和IDE</p>
              </div>
            </div>
          </div>

          <div class="case-study">
            <h3>成功案例：Spotify Web播放器</h3>
            <div class="case-details">
              <div class="case-metrics">
                <div class="case-metric">
                  <div class="metric-value">-68%</div>
                  <div class="metric-label">加载时间</div>
                </div>
                <div class="case-metric">
                  <div class="metric-value">-42%</div>
                  <div class="metric-label">内存占用</div>
                </div>
                <div class="case-metric">
                  <div class="metric-value">+30%</div>
                  <div class="metric-label">用户互动</div>
                </div>
              </div>
              <div class="case-description">
                <p>Spotify将其Web播放器从React迁移到Svelte后，获得了显著的性能提升：</p>
                <ul>
                  <li>JS打包体积从1.4MB减少到450KB</li>
                  <li>交互响应时间从120ms降低到30ms</li>
                  <li>首次内容绘制(FCP)时间减少68%</li>
                  <li>页面滚动更加流畅，帧率稳定在60fps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 总结 -->
      <div class="summary-section">
        <div class="summary-content">
          <h3>Svelte框架总结</h3>
          <div class="summary-grid">
            <div class="summary-pros">
              <h4>优势</h4>
              <ul>
                <li>卓越的性能和加载速度</li>
                <li>极小的应用体积</li>
                <li>简洁的语法和愉快的开发体验</li>
                <li>真正响应式编程模型</li>
                <li>较低的内存占用</li>
              </ul>
            </div>

            <div class="summary-cons">
              <h4>考虑因素</h4>
              <ul>
                <li>相对较小的生态系统</li>
                <li>企业级解决方案较少</li>
                <li>调试编译后代码有时较困难</li>
                <li>社区规模小于React/Vue</li>
              </ul>
            </div>
          </div>

          <div class="summary-final">
            <div class="final-icon">💎</div>
            <div class="final-content">
              <h4>何时选择Svelte？</h4>
              <p>
                当项目需要高性能、小体积和出色的用户体验时，Svelte是最佳选择。特别适合性能敏感型应用、移动端网站和营销页面。
              </p>
              <p>对于需要大量第三方库支持的大型企业应用，可考虑React或Vue。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Svelte  | 编译优先的Web框架 | GitHub Stars: 70k+</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 本组件仅用于展示，不需要逻辑代码
</script>

<style lang="less" scoped>
@primary-color: #ff3e00;
@secondary-color: #40b3ff;
@accent-color: #676778;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@text-primary: #213547;
@text-secondary: #6b7280;
@border-color: #e5e7eb;
@success-color: #00c853;
@chart-svelte: #ff3e00;
@chart-react: #61dafb;
@chart-vue: #42b883;
@shadow-light:
  0 4px 6px -1px rgba(0, 0, 0, 0.05),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);

.svelte-container {
  font-family:
    'Segoe UI',
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.header-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid @border-color;

  .header-content {
    flex: 1;

    .title-group {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 2px solid darken(@border-color, 5%);

      .logo-container {
        .svelte-logo {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          background: linear-gradient(135deg, @primary-color, #ff6b00);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 12px rgba(255, 62, 0, 0.2);

          .s {
            color: white;
            font-size: 3.5rem;
            font-weight: 800;
            font-family: 'Arial Rounded MT Bold', 'Arial', sans-serif;
            transform: translateY(-2px);
          }
        }
      }

      .text-content {
        h1 {
          font-size: 2.5rem;
          margin: 0 0 0.5rem;
          color: @text-primary;
          font-weight: 800;
        }

        .subtitle {
          font-size: 1.25rem;
          color: @text-secondary;
          margin: 0;
          max-width: 600px;
        }
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;

      .stat-card {
        background: @card-bg;
        border-radius: 12px;
        padding: 1.25rem;
        box-shadow: @shadow-light;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: fade(@primary-color, 10%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: darken(@primary-color, 10%);
        }

        .stat-content {
          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: @primary-color;
            line-height: 1.2;
          }

          .stat-label {
            font-size: 0.95rem;
            color: @text-secondary;
          }
        }
      }
    }
  }

  .svelte-code-demo {
    flex: 1;
    min-width: 420px;
    background: @card-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @shadow-light;

    .code-tabs {
      display: flex;
      background: lighten(@border-color, 6%);
      border-bottom: 1px solid @border-color;

      .code-tab {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
        cursor: pointer;
        color: @text-secondary;
        transition: all 0.2s;

        &.active {
          background: @card-bg;
          color: @primary-color;
          font-weight: 600;
          border-bottom: 2px solid @primary-color;
        }
      }
    }

    .code-editor {
      background: #fcfdff;
      padding: 1.5rem;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 1rem;
      min-height: 220px;
      border-bottom: 1px solid @border-color;

      .code-line {
        padding: 0.15rem 0;

        .keyword {
          color: #d73a49;
          font-weight: 600;
        }

        .tag {
          color: #22863a;
        }

        .attr {
          color: #6f42c1;
        }

        .string {
          color: #032f62;
        }

        .number {
          color: #005cc5;
        }

        .comment {
          color: #6a737d;
          font-style: italic;
        }
      }
    }

    .code-explanation {
      display: flex;
      padding: 1rem;
      background: fade(@primary-color, 5%);

      .explanation-point {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem;

        .point-icon {
          font-size: 1.2rem;
          color: @success-color;
        }

        .point-text {
          font-size: 0.95rem;
          font-weight: 500;
        }
      }
    }
  }
}

/* 响应式调整 */
@media (max-width: 900px) {
  .header-section {
    flex-direction: column;

    .svelte-code-demo {
      min-width: 100%;
    }
  }
}

/* 功能特点部分 */
.features-section {
  margin-bottom: 3rem;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem 0;

    .section-icon {
      font-size: 1.8rem;
      color: @primary-color;
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    .feature-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @shadow-light;
      transition: transform 0.3s ease;
      border-top: 3px solid @primary-color;

      &:hover {
        transform: translateY(-5px);
      }

      .feature-icon {
        font-size: 2.2rem;
        margin-bottom: 1rem;
        color: @primary-color;
      }

      h3 {
        margin: 0 0 1rem;
        font-size: 1.3rem;
      }

      p {
        color: @text-secondary;
        font-size: 0.95rem;
        margin-bottom: 1.5rem;
      }

      .feature-metric {
        .metric-bar {
          height: 26px;
          background: linear-gradient(90deg, lighten(@primary-color, 10%), @secondary-color);
          border-radius: 50px;
          display: flex;
          align-items: center;
          padding: 0 1rem;

          span {
            color: white;
            font-size: 0.85rem;
            font-weight: 500;
          }
        }
      }
    }
  }
}

/* 内容区域 */
.content-sections {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.content-section {
  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @border-color;

    .section-icon {
      font-size: 1.8rem;
      color: @primary-color;
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
}

.info-card,
.learning-card,
.performance-card,
.ecosystem-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: @shadow-light;
}

.comparison {
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .comparison-item {
    flex: 1;
    background: lighten(@border-color, 7%);
    border-radius: 12px;
    padding: 1.5rem;

    &.highlight {
      background: fade(@primary-color, 7%);
      border: 1px solid fade(@primary-color, 30%);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background: @primary-color;
      }
    }

    h4 {
      margin: 0 0 1rem;
      font-size: 1.2rem;
      color: @text-primary;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 0.8rem;
      }
    }
  }
}

.learning-card {
  display: flex;
  gap: 2rem;

  .learning-content {
    flex: 2;

    h3 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
      color: @text-primary;
    }

    p {
      color: @text-secondary;
      margin-bottom: 1.5rem;
    }

    .learning-stats {
      display: flex;
      gap: 1.5rem;
      margin: 1.5rem 0;

      .stat-item {
        text-align: center;
        flex: 1;

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: @primary-color;
        }

        .stat-label {
          font-size: 0.95rem;
          color: @text-secondary;
        }
      }
    }
  }

  .learning-chart {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;

    .chart-bar {
      background: linear-gradient(90deg, @primary-color, lighten(@primary-color, 20%));
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding-left: 1rem;
      color: white;
      font-weight: 600;
      position: relative;
      transition: height 1s ease-out;
    }

    .chart-label {
      text-align: center;
      font-size: 0.9rem;
      color: @text-secondary;
      margin-top: 0.5rem;
    }
  }
}

.performance-card {
  display: flex;
  gap: 2rem;

  .performance-chart {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;

    .chart-metric {
      .metric-label {
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        color: @text-secondary;
      }

      .chart-bar-container {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
        height: 120px;

        .chart-bar {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px 6px 0 0;
          transition: height 1s ease-out;
          color: white;
          font-weight: 600;
          position: relative;

          &.svelte {
            background: linear-gradient(to top, @chart-svelte, lighten(@chart-svelte, 15%));
          }

          &.react {
            background: linear-gradient(to top, @chart-react, lighten(@chart-react, 15%));
          }

          &.vue {
            background: linear-gradient(to top, @chart-vue, lighten(@chart-vue, 15%));
          }
        }

        .framework-label {
          position: absolute;
          bottom: -25px;
          font-size: 0.85rem;
          color: @text-secondary;
          width: 100%;
          text-align: center;
        }
      }
    }
  }

  .performance-details {
    flex: 1;

    h3 {
      margin: 0 0 1.5rem;
      font-size: 1.5rem;
    }

    .performance-feature {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid @border-color;

      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }

      .feature-icon {
        font-size: 2rem;
        color: @primary-color;
        min-width: 50px;
      }

      .feature-content {
        h4 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
        }

        p {
          margin: 0;
          color: @text-secondary;
          font-size: 0.95rem;
        }
      }
    }
  }
}

.ecosystem-card {
  .ecosystem-intro {
    margin-bottom: 2rem;

    h3 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }

    p {
      color: @text-secondary;
      margin: 0;
      max-width: 800px;
    }
  }

  .ecosystem-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    .ecosystem-category {
      background: lighten(@border-color, 10%);
      border-radius: 10px;
      padding: 1.5rem;

      h4 {
        margin: 0 0 1rem;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.8rem;
          position: relative;

          &::before {
            content: '•';
            color: @primary-color;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }

  .ecosystem-metrics {
    display: flex;
    gap: 1.5rem;

    .metric-card {
      flex: 1;
      background: fade(@primary-color, 8%);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;

      .metric-value {
        font-size: 2rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 0.5rem;
      }

      .metric-label {
        font-size: 0.95rem;
        color: @text-secondary;
      }
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .use-case-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: @shadow-light;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &.primary {
      background: linear-gradient(135deg, fade(@primary-color, 10%), fade(@secondary-color, 10%));
      border: 1px solid fade(@primary-color, 30%);
    }

    .case-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: fade(@primary-color, 10%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: @primary-color;
      flex-shrink: 0;
    }

    .case-content {
      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        color: @text-secondary;
        font-size: 0.95rem;
      }
    }
  }
}

.case-study {
  background: fade(@secondary-color, 5%);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid fade(@secondary-color, 20%);

  h3 {
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
    position: relative;
    padding-left: 2rem;

    &::before {
      content: '🔥';
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .case-details {
    display: flex;
    gap: 2rem;

    .case-metrics {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      min-width: 200px;

      .case-metric {
        text-align: center;
        background: white;
        border-radius: 12px;
        padding: 1rem;
        box-shadow: @shadow-light;

        .metric-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: @success-color;

          &:before {
            content: '+';
          }

          &.negative {
            color: @primary-color;

            &:before {
              content: '-';
            }
          }
        }

        .metric-label {
          font-size: 0.95rem;
          color: @text-secondary;
        }
      }
    }

    .case-description {
      flex: 1;

      p {
        margin: 0 0 1rem;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.8rem;
          position: relative;

          &::before {
            content: '✓';
            color: @success-color;
            margin-right: 0.5rem;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, fade(@primary-color, 5%), fade(@secondary-color, 5%));
  border-radius: 16px;
  padding: 3rem;
  margin-top: 2rem;
  border: 1px solid @border-color;

  .summary-content {
    h3 {
      text-align: center;
      margin: 0 0 2rem;
      font-size: 1.8rem;
      font-weight: 700;
      color: @text-primary;
    }

    .summary-grid {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;

      .summary-pros,
      .summary-cons {
        flex: 1;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: @shadow-light;

        h4 {
          margin: 0 0 1rem;
          font-size: 1.3rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid @primary-color;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            position: relative;

            &::before {
              content: '•';
              color: @primary-color;
              margin-right: 0.5rem;
              font-weight: bold;
            }
          }
        }
      }

      .summary-cons {
        h4 {
          border-bottom: 2px solid @accent-color;
        }

        li::before {
          color: @accent-color;
        }
      }
    }

    .summary-final {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      gap: 1.5rem;
      box-shadow: @shadow-light;

      .final-icon {
        font-size: 2.5rem;
        color: @primary-color;
      }

      .final-content {
        h4 {
          margin: 0 0 1rem;
          font-size: 1.3rem;
        }

        p {
          margin: 0 0 1rem;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: @text-secondary;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

@media (max-width: 768px) {
  .learning-card,
  .performance-card,
  .case-details {
    flex-direction: column;
  }

  .ecosystem-grid {
    grid-template-columns: 1fr !important;
  }

  .ecosystem-metrics {
    flex-wrap: wrap;
  }

  .summary-grid {
    flex-direction: column;
  }
}
</style>
