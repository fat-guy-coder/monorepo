<template>
  <div class="browser-processes">
    <!-- 头部介绍 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo">🧩</div>
        </div>
        <div class="title-container">
          <h1>浏览器进程与线程基础介绍</h1>
          <p class="subtitle">理解现代浏览器的多进程架构与线程模型</p>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">4+</div>
          <div class="stat-label">核心进程</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">10+</div>
          <div class="stat-label">主要线程</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">∞</div>
          <div class="stat-label">并行任务</div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基本概念 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📚</span> 基本概念</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="concepts">
            <div class="concept-card">
              <div class="concept-header">
                <div class="concept-icon">📦</div>
                <h3>进程 (Process)</h3>
              </div>
              <div class="concept-content">
                <p>操作系统资源分配的基本单位，拥有独立的内存空间和系统资源</p>
                <ul>
                  <li>内存隔离：每个进程有独立的内存空间</li>
                  <li>资源分配：CPU、内存、I/O等资源独立分配</li>
                  <li>稳定性：一个进程崩溃不会影响其他进程</li>
                  <li>通信：进程间通过IPC(进程间通信)机制通信</li>
                </ul>
              </div>
            </div>

            <div class="concept-card">
              <div class="concept-header">
                <div class="concept-icon">🧵</div>
                <h3>线程 (Thread)</h3>
              </div>
              <div class="concept-content">
                <p>CPU调度的基本单位，共享进程的内存空间和资源</p>
                <ul>
                  <li>轻量级：创建和切换开销小于进程</li>
                  <li>共享内存：同一进程内的线程共享内存空间</li>
                  <li>并行执行：多线程可并行执行任务</li>
                  <li>通信：线程间通过共享内存通信</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="architecture">
            <h3>浏览器多进程架构</h3>
            <div class="architecture-diagram">
              <div class="process-layer">
                <div class="process browser">
                  <div class="process-label">浏览器进程</div>
                  <div class="threads">
                    <div class="thread">UI线程</div>
                    <div class="thread">网络线程</div>
                    <div class="thread">存储线程</div>
                  </div>
                </div>
              </div>

              <div class="process-connector">⇅ IPC通信</div>

              <div class="process-layer">
                <div class="process gpu">
                  <div class="process-label">GPU进程</div>
                  <div class="threads">
                    <div class="thread">GPU线程</div>
                  </div>
                </div>

                <div class="process renderer">
                  <div class="process-label">渲染进程</div>
                  <div class="threads">
                    <div class="thread">主线程</div>
                    <div class="thread">合成线程</div>
                    <div class="thread">光栅线程</div>
                  </div>
                </div>

                <div class="process extension">
                  <div class="process-label">扩展进程</div>
                  <div class="threads">
                    <div class="thread">扩展线程</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 浏览器进程 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">⚙️</span> 浏览器核心进程</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="processes">
            <div class="process-card">
              <div class="process-header">
                <div class="process-icon">🌐</div>
                <h3>浏览器进程 (Browser Process)</h3>
              </div>
              <div class="process-content">
                <div class="responsibility">
                  <h4>核心职责</h4>
                  <ul>
                    <li>管理浏览器界面（地址栏、书签、前进/后退按钮）</li>
                    <li>协调其他进程的创建和销毁</li>
                    <li>处理网络请求（通过网络线程）</li>
                    <li>管理文件访问（通过存储线程）</li>
                  </ul>
                </div>

                <div class="threads-detail">
                  <h4>主要线程</h4>
                  <div class="thread-item">
                    <div class="thread-icon">📱</div>
                    <div class="thread-info">
                      <h5>UI线程</h5>
                      <p>绘制浏览器UI元素，处理用户输入</p>
                    </div>
                  </div>

                  <div class="thread-item">
                    <div class="thread-icon">📡</div>
                    <div class="thread-info">
                      <h5>网络线程</h5>
                      <p>处理HTTP请求、WebSocket连接等网络操作</p>
                    </div>
                  </div>

                  <div class="thread-item">
                    <div class="thread-icon">💾</div>
                    <div class="thread-info">
                      <h5>存储线程</h5>
                      <p>管理本地存储（LocalStorage、IndexedDB等）</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="process-card">
              <div class="process-header">
                <div class="process-icon">🖥️</div>
                <h3>渲染进程 (Renderer Process)</h3>
              </div>
              <div class="process-content">
                <div class="responsibility">
                  <h4>核心职责</h4>
                  <ul>
                    <li>负责标签页内的所有内容渲染</li>
                    <li>解析HTML、CSS和JavaScript</li>
                    <li>执行JavaScript代码</li>
                    <li>处理用户交互事件</li>
                  </ul>
                </div>

                <div class="threads-detail">
                  <h4>主要线程</h4>
                  <div class="thread-item">
                    <div class="thread-icon">🧠</div>
                    <div class="thread-info">
                      <h5>主线程 (Main Thread)</h5>
                      <p>执行JavaScript、处理DOM、计算样式和布局</p>
                    </div>
                  </div>

                  <div class="thread-item">
                    <div class="thread-icon">🎨</div>
                    <div class="thread-info">
                      <h5>合成线程 (Compositor Thread)</h5>
                      <p>组合页面图层，处理滚动和动画</p>
                    </div>
                  </div>

                  <div class="thread-item">
                    <div class="thread-icon">🔍</div>
                    <div class="thread-info">
                      <h5>光栅线程 (Raster Thread)</h5>
                      <p>将图层转换为位图，发送给GPU</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="process-card">
              <div class="process-header">
                <div class="process-icon">🎮</div>
                <h3>GPU进程 (GPU Process)</h3>
              </div>
              <div class="process-content">
                <div class="responsibility">
                  <h4>核心职责</h4>
                  <ul>
                    <li>处理GPU相关的任务</li>
                    <li>加速3D CSS和Canvas渲染</li>
                    <li>管理GPU资源</li>
                    <li>隔离GPU操作，提高稳定性</li>
                  </ul>
                </div>

                <div class="threads-detail">
                  <h4>主要线程</h4>
                  <div class="thread-item">
                    <div class="thread-icon">🖌️</div>
                    <div class="thread-info">
                      <h5>GPU线程</h5>
                      <p>执行GPU命令，与GPU硬件交互</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="process-card">
              <div class="process-header">
                <div class="process-icon">🧩</div>
                <h3>其他进程</h3>
              </div>
              <div class="process-content">
                <div class="responsibility">
                  <h4>插件进程 (Plugin Process)</h4>
                  <ul>
                    <li>管理浏览器插件（如Flash、PDF查看器等）</li>
                    <li>隔离插件，防止崩溃影响浏览器</li>
                  </ul>

                  <h4>扩展进程 (Extension Process)</h4>
                  <ul>
                    <li>运行浏览器扩展程序</li>
                    <li>提供沙箱环境，保证安全性</li>
                  </ul>

                  <h4>实用程序进程 (Utility Process)</h4>
                  <ul>
                    <li>运行音频处理、数据解码等任务</li>
                    <li>按需创建，完成任务后销毁</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 线程基础介绍 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🧠</span> 核心线程基础介绍</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="threads-grid">
            <div class="thread-card main-thread">
              <div class="thread-header">
                <h3>主线程 (Main Thread)</h3>
                <div class="thread-icon">🧠</div>
              </div>
              <div class="thread-content">
                <h4>核心职责</h4>
                <ul>
                  <li>解析HTML构建DOM树</li>
                  <li>解析CSS计算样式</li>
                  <li>执行JavaScript代码</li>
                  <li>处理事件（点击、滚动等）</li>
                  <li>计算布局（Layout）</li>
                </ul>

                <h4>性能优化</h4>
                <div class="optimization">
                  <div class="tip">
                    <div class="tip-icon">⏱️</div>
                    <div class="tip-content">避免长任务阻塞主线程（>50ms）</div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">🧩</div>
                    <div class="tip-content">使用Web Workers处理耗时任务</div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">📊</div>
                    <div class="tip-content">优化CSS选择器减少样式计算</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="thread-card compositor-thread">
              <div class="thread-header">
                <h3>合成线程 (Compositor Thread)</h3>
                <div class="thread-icon">🎨</div>
              </div>
              <div class="thread-content">
                <h4>核心职责</h4>
                <ul>
                  <li>将页面分层（Layer）管理</li>
                  <li>处理滚动和动画</li>
                  <li>组合图层形成最终图像</li>
                  <li>与GPU进程通信</li>
                </ul>

                <h4>渲染优化</h4>
                <div class="code-snippet">
                  <pre>/* 使用transform和opacity创建独立图层 */
.animate {
  will-change: transform;
  transform: translateZ(0);
}</pre>
                </div>
              </div>
            </div>

            <div class="thread-card raster-thread">
              <div class="thread-header">
                <h3>光栅线程 (Raster Thread)</h3>
                <div class="thread-icon">🔍</div>
              </div>
              <div class="thread-content">
                <h4>核心职责</h4>
                <ul>
                  <li>将图层分割为图块（Tiles）</li>
                  <li>将图块光栅化为位图</li>
                  <li>处理图片解码</li>
                  <li>管理图像缓存</li>
                </ul>

                <h4>性能影响</h4>
                <p>复杂CSS效果（如阴影、模糊）会增加光栅化时间</p>
              </div>
            </div>

            <div class="thread-card worker-thread">
              <div class="thread-header">
                <h3>工作线程 (Worker Threads)</h3>
                <div class="thread-icon">👷</div>
              </div>
              <div class="thread-content">
                <h4>核心职责</h4>
                <ul>
                  <li>运行Web Workers</li>
                  <li>处理Service Workers</li>
                  <li>执行后台任务</li>
                  <li>避免阻塞主线程</li>
                </ul>

                <h4>使用示例</h4>
                <div class="code-snippet">
                  <pre>// 主线程
const worker = new Worker('worker.js');

// worker.js
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
};</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="thread-lifecycle">
            <h3>线程生命周期与通信</h3>
            <div class="lifecycle-diagram">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>线程创建</h4>
                  <p>浏览器进程根据需求创建线程</p>
                </div>
              </div>

              <div class="step-arrow">➡️</div>

              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>任务执行</h4>
                  <p>线程执行分配的任务</p>
                </div>
              </div>

              <div class="step-arrow">➡️</div>

              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>线程通信</h4>
                  <p>通过消息传递或共享内存通信</p>
                </div>
              </div>

              <div class="step-arrow">➡️</div>

              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>线程销毁</h4>
                  <p>任务完成后释放资源</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能优化 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🚀</span> 性能优化实践</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="optimization-techniques">
            <div class="technique-card">
              <div class="technique-header">
                <h3>优化主线程</h3>
              </div>
              <div class="technique-content">
                <ul>
                  <li><strong>分解长任务：</strong> 使用setTimeout或requestIdleCallback</li>
                  <li><strong>避免强制同步布局：</strong> 批量读取布局属性</li>
                  <li><strong>优化事件处理：</strong> 使用事件委托和防抖节流</li>
                  <li><strong>减少DOM操作：</strong> 使用DocumentFragment批量更新</li>
                </ul>

                <div class="code-snippet">
                  <pre>// 避免强制同步布局
// 错误：读取 -> 修改 -> 读取
const width = element.offsetWidth;
element.style.width = (width + 10) + 'px';
const newWidth = element.offsetWidth;

// 正确：读取 -> 读取 -> 修改
const width = element.offsetWidth;
const newWidth = width + 10;
element.style.width = newWidth + 'px';</pre>
                </div>
              </div>
            </div>

            <div class="technique-card">
              <div class="technique-header">
                <h3>利用多线程</h3>
              </div>
              <div class="technique-content">
                <ul>
                  <li><strong>使用Web Workers：</strong> 处理CPU密集型任务</li>
                  <li><strong>使用Service Workers：</strong> 缓存资源和离线功能</li>
                  <li><strong>使用异步API：</strong> 如fetch、IndexedDB等</li>
                  <li><strong>使用OffscreenCanvas：</strong> 在Worker中处理Canvas</li>
                </ul>

                <div class="code-snippet">
                  <pre>// 使用Web Worker处理图像
const worker = new Worker('image-processor.js');
worker.postMessage(imageData);

// 主线程继续响应用户交互
document.addEventListener('click', handleClick);</pre>
                </div>
              </div>
            </div>

            <div class="technique-card">
              <div class="technique-header">
                <h3>渲染优化</h3>
              </div>
              <div class="technique-content">
                <ul>
                  <li><strong>减少重排重绘：</strong> 使用transform和opacity</li>
                  <li><strong>优化图层：</strong> 使用will-change创建合成层</li>
                  <li><strong>延迟加载：</strong> 图片和组件按需加载</li>
                  <li><strong>简化CSS：</strong> 减少选择器复杂度和嵌套</li>
                </ul>

                <div class="code-snippet">
                  <pre>/* 优化动画性能 */
.animate {
  /* 使用transform代替top/left */
  transform: translateX(100px);

  /* 创建独立图层 */
  will-change: transform;

  /* 使用GPU加速 */
  backface-visibility: hidden;
}</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="dev-tools">
            <h3>开发者工具分析</h3>
            <div class="tools-grid">
              <div class="tool">
                <div class="tool-icon">📊</div>
                <div class="tool-info">
                  <h4>Performance面板</h4>
                  <p>分析主线程活动，识别长任务</p>
                </div>
              </div>

              <div class="tool">
                <div class="tool-icon">🔍</div>
                <div class="tool-info">
                  <h4>Layers面板</h4>
                  <p>可视化页面图层，分析合成性能</p>
                </div>
              </div>

              <div class="tool">
                <div class="tool-icon">⚙️</div>
                <div class="tool-info">
                  <h4>Coverage面板</h4>
                  <p>分析未使用的CSS和JS代码</p>
                </div>
              </div>

              <div class="tool">
                <div class="tool-icon">🧩</div>
                <div class="tool-info">
                  <h4>Performance Insights</h4>
                  <p>获取性能优化建议</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📝</span> 总结</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="conclusion">
            <div class="key-points">
              <h3>核心要点总结</h3>
              <ul>
                <li>🛡️ <strong>进程隔离：</strong> 浏览器使用多进程架构提高稳定性和安全性</li>
                <li>⚡ <strong>并行处理：</strong> 多线程实现任务并行，提高性能</li>
                <li>🧠 <strong>主线程关键：</strong> 主线程负责核心任务，需避免阻塞</li>
                <li>🎨 <strong>渲染流水线：</strong> 主线程 → 合成线程 → 光栅线程 → GPU进程</li>
                <li>👷 <strong>工作线程：</strong> Web Workers用于后台处理，避免阻塞主线程</li>
              </ul>
            </div>

            <div class="future">
              <h3>未来趋势</h3>
              <div class="trends">
                <div class="trend">
                  <div class="trend-icon">🔮</div>
                  <div class="trend-content">
                    <h4>更细粒度的进程</h4>
                    <p>Site Isolation技术为每个站点分配独立进程</p>
                  </div>
                </div>

                <div class="trend">
                  <div class="trend-icon">🚀</div>
                  <div class="trend-content">
                    <h4>WebAssembly多线程</h4>
                    <p>利用多线程并行执行计算密集型任务</p>
                  </div>
                </div>

                <div class="trend">
                  <div class="trend-icon">🤖</div>
                  <div class="trend-content">
                    <h4>GPU加速计算</h4>
                    <p>通过WebGPU实现通用GPU计算</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="https://developers.google.com/web/updates/2018/09/inside-browser-part1" target="_blank">浏览器内部工作原理</a>
          <a href="https://web.dev/rendering-performance/" target="_blank">渲染性能优化</a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" target="_blank">Web Workers文档</a>
        </div>
        <p>© 2023 浏览器架构指南 | 理解进程与线程，构建高性能Web应用</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置组件逻辑（如果有的话）
</script>

<style lang="less" scoped>
@primary: #4a6cf7;
@dark-primary: #3a56d8;
@secondary: #2c3e50;
@accent: #4caf50;
@light-bg: #f8f9fa;
@border: #e1e4e8;
@text: #2c3e50;
@code-bg: #f5f7fa;
@main-thread: #ff6b6b;
@compositor-thread: #48dbfb;
@raster-thread: #1dd1a1;
@worker-thread: #feca57;

.browser-processes {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #4a6cf7 0%, #2c3e50 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  color: white;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🧩';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 6rem;
    opacity: 0.1;
    transform: rotate(25deg);
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    z-index: 2;

    .logo-container {
      margin-right: 20px;

      .logo {
        width: 80px;
        height: 80px;
        background: white;
        color: @dark-primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        box-shadow: 0 5px 15px rgba(74, 108, 247, 0.5);
      }
    }

    .title-container {
      h1 {
        font-size: 2.5rem;
        margin: 0 0 10px 0;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    z-index: 2;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.8;
      }
    }
  }
}

.section {
  margin-bottom: 50px;
  background: @light-bg;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  .section-header {
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
    }

    .divider {
      height: 3px;
      width: 80px;
      background: @primary;
      margin-top: 15px;
      border-radius: 3px;
    }
  }
}

.concepts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .concept-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .concept-icon {
      font-size: 2.5rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 1.6rem;
    }
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.architecture {
  margin-top: 40px;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 30px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 3px;
      background: @primary;
      border-radius: 3px;
    }
  }
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.process-layer {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.process {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  min-width: 200px;
  text-align: center;

  &.browser {
    border-top: 4px solid @primary;
  }

  &.gpu {
    border-top: 4px solid @accent;
  }

  &.renderer {
    border-top: 4px solid @main-thread;
  }

  &.extension {
    border-top: 4px solid @worker-thread;
  }

  .process-label {
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  .threads {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .thread {
      background: @light-bg;
      padding: 8px;
      border-radius: 6px;
      font-size: 0.9rem;
    }
  }
}

.process-connector {
  font-size: 1.5rem;
  padding: 10px 0;
}

.processes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.process-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .process-header {
    padding: 20px;
    display: flex;
    align-items: center;
    background: rgba(@primary, 0.05);

    .process-icon {
      font-size: 2rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
    }
  }

  .process-content {
    padding: 20px;

    .responsibility {
      margin-bottom: 20px;

      h4 {
        margin-top: 0;
        color: @primary;
      }

      ul {
        padding-left: 20px;
      }
    }
  }
}

.threads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.thread-card {
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  &.main-thread {
    border-top: 4px solid @main-thread;
  }

  &.compositor-thread {
    border-top: 4px solid @compositor-thread;
  }

  &.raster-thread {
    border-top: 4px solid @raster-thread;
  }

  &.worker-thread {
    border-top: 4px solid @worker-thread;
  }

  .thread-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      font-size: 1.5rem;
    }

    .thread-icon {
      font-size: 2.5rem;
    }
  }

  ul {
    padding-left: 20px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.thread-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .thread-icon {
    font-size: 1.8rem;
    margin-right: 15px;
    width: 40px;
    height: 40px;
    background: @light-bg;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h5 {
    margin: 0 0 5px 0;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
}

.thread-lifecycle {
  margin-top: 40px;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
}

.lifecycle-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.step {
  background: white;
  border-radius: 12px;
  padding: 20px;
  min-width: 180px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .step-icon {
    width: 40px;
    height: 40px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin: 0 auto 15px;
  }

  h4 {
    margin: 0 0 10px 0;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
}

.step-arrow {
  font-size: 1.5rem;
  color: @primary;
}

.optimization-techniques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.technique-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .technique-header {
    border-bottom: 1px solid @border;
    padding-bottom: 15px;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      color: @primary;
    }
  }

  ul {
    padding-left: 20px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.dev-tools {
  margin-top: 40px;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tool {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .tool-icon {
    font-size: 2rem;
    margin-right: 15px;
  }

  h4 {
    margin: 0 0 5px 0;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
}

.conclusion {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.key-points {
  ul {
    padding-left: 20px;

    li {
      margin-bottom: 15px;
      padding-left: 40px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(@primary, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
  }
}

.future {
  h3 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 25px;
  }
}

.trends {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.trend {
  display: flex;
  align-items: flex-start;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .trend-icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 8px;
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 3px solid @primary;
  overflow-x: auto;

  pre {
    margin: 0;
    line-height: 1.5;
  }
}

.footer {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid @border;

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    a {
      color: @primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin: 0;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;

    .logo-container {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .lifecycle-diagram {
    flex-direction: column;

    .step {
      margin-bottom: 30px;
    }

    .step-arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }
}
</style>
