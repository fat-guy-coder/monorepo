<template>
  <div class="devtools-performance">
    <header class="devtools-header">
      <h1>前端性能监控：DevTools 基本介绍</h1>
      <p class="subtitle">掌握浏览器开发者工具的性能分析技巧</p>
      <div class="browser-logos">
        <div class="browser-logo chrome"></div>
        <div class="browser-logo firefox"></div>
        <div class="browser-logo edge"></div>
        <div class="browser-logo safari"></div>
      </div>
    </header>

    <div class="devtools-content">
      <section class="getting-started">
        <h2>开始性能分析</h2>
        <div class="steps-container">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>打开 DevTools</h3>
            <p>Windows/Linux: <code>Ctrl+Shift+I</code> 或 <code>F12</code></p>
            <p>macOS: <code>Cmd+Option+I</code></p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>切换到性能面板</h3>
            <p>选择 "Performance" 或 "性能" 选项卡</p>
            <div class="panel-screenshot"></div>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>配置设置</h3>
            <ul>
              <li>启用屏幕截图</li>
              <li>勾选内存分析</li>
              <li>设置 CPU 节流</li>
            </ul>
          </div>
          <div class="step-card">
            <div class="step-number">4</div>
            <h3>开始录制</h3>
            <p>点击录制按钮或按 <code>Ctrl+E</code>/<code>Cmd+E</code></p>
            <p>执行用户操作后停止录制</p>
          </div>
        </div>
      </section>

      <section class="key-metrics">
        <h2>核心性能指标</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon">📊</div>
            <h3>FPS (帧率)</h3>
            <p>每秒渲染的帧数，目标 ≥ 60 FPS</p>
            <div class="metric-visual">
              <div class="fps-bar"></div>
              <div class="fps-labels">
                <span>0</span>
                <span>30</span>
                <span>60</span>
              </div>
            </div>
            <div class="metric-tip">
              <strong>问题定位：</strong> 红色条表示帧率下降，检查长任务和复杂渲染
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">⚙️</div>
            <h3>CPU 占用率</h3>
            <p>JavaScript 执行和渲染所占 CPU 时间</p>
            <div class="metric-tip">
              <strong>问题定位：</strong> 高 CPU 使用率区域对应时间线上的长任务
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">🧠</div>
            <h3>内存使用</h3>
            <p>JavaScript 堆内存使用情况</p>
            <div class="metric-tip">
              <strong>问题定位：</strong> 持续增长的内存可能表示内存泄漏
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">⏱️</div>
            <h3>加载时间线</h3>
            <p>关键页面加载事件时间点</p>
            <div class="metric-visual timeline">
              <div class="timeline-event" style="left: 10%">DNS</div>
              <div class="timeline-event" style="left: 30%">TCP</div>
              <div class="timeline-event" style="left: 50%">TTFB</div>
              <div class="timeline-event" style="left: 70%">内容</div>
              <div class="timeline-event" style="left: 90%">完成</div>
              <div class="timeline-bar"></div>
            </div>
            <div class="metric-tip">
              <strong>问题定位：</strong> 分析各阶段耗时，优化瓶颈点
            </div>
          </div>
        </div>
      </section>

      <section class="performance-analysis">
        <h2>性能时间线分析</h2>
        <div class="analysis-content">
          <div class="timeline-explanation">
            <h3>解读性能时间线</h3>
            <div class="timeline-key">
              <div class="key-item">
                <div class="key-color scripting"></div>
                <div class="key-label">脚本执行 (黄色)</div>
              </div>
              <div class="key-item">
                <div class="key-color rendering"></div>
                <div class="key-label">渲染 (紫色)</div>
              </div>
              <div class="key-item">
                <div class="key-color painting"></div>
                <div class="key-label">绘制 (绿色)</div>
              </div>
              <div class="key-item">
                <div class="key-color loading"></div>
                <div class="key-label">加载 (蓝色)</div>
              </div>
              <div class="key-item">
                <div class="key-color idle"></div>
                <div class="key-label">空闲 (灰色)</div>
              </div>
            </div>

            <h4>关键分析步骤：</h4>
            <ol>
              <li>识别<strong>长任务</strong>（超过50ms）</li>
              <li>检查<strong>布局抖动</strong>（强制同步布局）</li>
              <li>分析<strong>昂贵渲染</strong>（复杂样式计算）</li>
              <li>查找<strong>内存泄漏</strong>（堆内存持续增长）</li>
              <li>检测<strong>网络瓶颈</strong>（资源加载瀑布图）</li>
            </ol>
          </div>

          <div class="timeline-demo">
            <div class="demo-timeline">
              <div class="timeline-task" style="left: 5%; width: 15%; background-color: #f1c40f;">脚本</div>
              <div class="timeline-task" style="left: 25%; width: 10%; background-color: #9b59b6;">渲染</div>
              <div class="timeline-task" style="left: 40%; width: 12%; background-color: #2ecc71;">绘制</div>
              <div class="timeline-task" style="left: 60%; width: 20%; background-color: #f1c40f;">脚本</div>
              <div class="timeline-task warning" style="left: 85%; width: 10%; background-color: #e74c3c;">长任务</div>
              <div class="timeline-axis">
                <div class="axis-tick">0ms</div>
                <div class="axis-tick">500ms</div>
                <div class="axis-tick">1000ms</div>
              </div>
            </div>
            <div class="demo-details">
              <div class="detail-item">
                <h4>主线程活动</h4>
                <p>长任务阻塞用户交互</p>
              </div>
              <div class="detail-item">
                <h4>事件日志</h4>
                <ul>
                  <li>Click 事件: 120ms</li>
                  <li>Forced reflow: 45ms</li>
                  <li>Function call: 85ms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="memory-analysis">
        <h2>内存分析</h2>
        <div class="memory-content">
          <div class="memory-instructions">
            <h3>内存分析步骤</h3>
            <ol>
              <li>切换到 <strong>Memory</strong> 面板</li>
              <li>选择 <strong>Heap snapshot</strong> 类型</li>
              <li>点击 <strong>Take snapshot</strong> 获取堆快照</li>
              <li>执行操作后再次获取快照</li>
              <li>比较快照查找内存泄漏</li>
            </ol>

            <div class="memory-tips">
              <h4>内存泄漏特征：</h4>
              <ul>
                <li>分离的 DOM 节点</li>
                <li>未清除的定时器和事件监听器</li>
                <li>闭包中保留的大对象</li>
                <li>缓存无限增长</li>
              </ul>
            </div>
          </div>

          <div class="memory-visual">
            <div class="snapshot-comparison">
              <div class="snapshot">
                <h4>快照 #1</h4>
                <div class="heap-size">12.5 MB</div>
                <div class="heap-objects">15,240 对象</div>
              </div>
              <div class="snapshot-diff">+2.3 MB</div>
              <div class="snapshot">
                <h4>快照 #2</h4>
                <div class="heap-size">14.8 MB</div>
                <div class="heap-objects">18,570 对象</div>
              </div>
            </div>

            <div class="leak-details">
              <h4>可疑对象：</h4>
              <div class="leak-item">
                <div class="leak-name">Detached HTMLDivElement</div>
                <div class="leak-count">+24</div>
              </div>
              <div class="leak-item">
                <div class="leak-name">Closure (event)</div>
                <div class="leak-count">+12</div>
              </div>
              <div class="leak-item">
                <div class="leak-name">Array</div>
                <div class="leak-count">+350</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="network-analysis">
        <h2>网络性能分析</h2>
        <div class="network-content">
          <div class="waterfall-chart">
            <div class="waterfall-item" style="width: 10%; background: #3498db;">
              <div class="waterfall-label">HTML</div>
            </div>
            <div class="waterfall-item" style="width: 8%; background: #9b59b6; left: 12%;">
              <div class="waterfall-label">CSS</div>
            </div>
            <div class="waterfall-item" style="width: 15%; background: #2ecc71; left: 22%;">
              <div class="waterfall-label">JS</div>
            </div>
            <div class="waterfall-item" style="width: 5%; background: #e74c3c; left: 39%;">
              <div class="waterfall-label">重定向</div>
            </div>
            <div class="waterfall-item" style="width: 7%; background: #f1c40f; left: 46%;">
              <div class="waterfall-label">Font</div>
            </div>
            <div class="waterfall-item" style="width: 20%; background: #1abc9c; left: 55%;">
              <div class="waterfall-label">图片</div>
            </div>
            <div class="waterfall-axis">
              <div class="axis-tick">0ms</div>
              <div class="axis-tick">500ms</div>
              <div class="axis-tick">1000ms</div>
              <div class="axis-tick">1500ms</div>
            </div>
          </div>

          <div class="network-metrics">
            <div class="metric">
              <h4>关键网络指标</h4>
              <ul>
                <li>请求数量: <strong>24</strong></li>
                <li>传输数据: <strong>1.8 MB</strong></li>
                <li>DOMContentLoaded: <strong>850ms</strong></li>
                <li>Load: <strong>1.4s</strong></li>
              </ul>
            </div>
            <div class="metric">
              <h4>优化建议</h4>
              <ul>
                <li>减少重定向 (1个)</li>
                <li>压缩图片资源 (节省420KB)</li>
                <li>延迟加载非关键JS</li>
                <li>启用HTTP/2</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2>性能优化最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">⚡</div>
            <h3>减少 JavaScript 执行时间</h3>
            <ul>
              <li>分解长任务</li>
              <li>使用 Web Workers</li>
              <li>优化算法复杂度</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🎨</div>
            <h3>优化渲染性能</h3>
            <ul>
              <li>避免布局抖动</li>
              <li>使用 transform/opacity 动画</li>
              <li>减少绘制区域</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📦</div>
            <h3>高效资源加载</h3>
            <ul>
              <li>代码分割</li>
              <li>资源预加载</li>
              <li>压缩和缓存</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🧩</div>
            <h3>内存管理</h3>
            <ul>
              <li>及时清除事件监听器</li>
              <li>避免全局变量</li>
              <li>使用弱引用</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="devtools-footer">
      <p>© 2023 前端性能优化指南 | DevTools 性能分析</p>
      <div class="footer-links">
        <a href="#">Chrome DevTools 文档</a>
        <a href="#">Firefox 性能工具</a>
        <a href="#">Edge 性能分析</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const fpsData = ref([58, 60, 45, 60, 32, 60, 60, 59]);
const memoryData = ref([85, 92, 88, 105, 110, 115, 120, 118]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@warning-color: #f39c12;
@error-color: #e74c3c;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;

.devtools-performance {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.devtools-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @secondary-color, lighten(@secondary-color, 10%));
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
}

.browser-logos {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.browser-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);

  &.chrome {
    background: #4285F4 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fff' d='M24 32a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'/%3E%3Cpath fill='%23fff' d='M42 24c0-9.9-8.1-18-18-18S6 14.1 6 24s8.1 18 18 18 18-8.1 18-18zm-32.6-6.3L24 24l-8.6-6.3zm0 12.6l8.6-6.3-8.6-6.3zm9.2 6.3L24 24l-6.3 8.6zm12.6-6.3L24 24l8.6 6.3zm0-12.6L24 24l8.6-6.3z'/%3E%3C/svg%3E") center no-repeat;
    background-size: 30px;
  }

  &.firefox {
    background: #FF7139 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fff' d='M24 42c9.9 0 18-8.1 18-18S33.9 6 24 6 6 14.1 6 24s8.1 18 18 18zm0-32c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14 6.3-14 14-14z'/%3E%3Cpath fill='%23fff' d='M30 24c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6z'/%3E%3C/svg%3E") center no-repeat;
    background-size: 30px;
  }

  &.edge {
    background: #0078D7 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fff' d='M24 42c9.9 0 18-8.1 18-18S33.9 6 24 6 6 14.1 6 24s8.1 18 18 18zm0-32c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14 6.3-14 14-14z'/%3E%3Cpath fill='%23fff' d='M30 24c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6z'/%3E%3C/svg%3E") center no-repeat;
    background-size: 30px;
  }

  &.safari {
    background: #000 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23fff' d='M24 42c9.9 0 18-8.1 18-18S33.9 6 24 6 6 14.1 6 24s8.1 18 18 18zm0-32c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14 6.3-14 14-14z'/%3E%3Cpath fill='%23fff' d='M30 24c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6z'/%3E%3C/svg%3E") center no-repeat;
    background-size: 30px;
  }
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.step-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .step-number {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background: @accent-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 0 0 0 12px;
  }

  h3 {
    margin-top: 0;
    color: @primary-color;
  }

  p {
    margin: 0.5rem 0;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.panel-screenshot {
  height: 120px;
  background: linear-gradient(45deg, #2c3e50, #4a6491);
  border-radius: 8px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background: #34495e;
    border-radius: 4px;
  }

  &::after {
    content: 'Performance';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    opacity: 0.7;
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .metric-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }

  p {
    color: lighten(@text-color, 20%);
  }
}

.metric-visual {
  margin: 1.5rem 0;

  &.fps-bar {
    height: 20px;
    background: linear-gradient(90deg, @error-color, @warning-color, @accent-color);
    border-radius: 10px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .fps-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: lighten(@text-color, 30%);
    margin-top: 0.5rem;
  }

  &.cpu-chart {
    height: 100px;
    background: @background-light;
    border-radius: 8px;
    position: relative;
  }

  .cpu-usage {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, @accent-color, lighten(@accent-color, 20%));
    border-radius: 0 0 8px 8px;
  }

  &.memory-graph {
    height: 80px;
    background: @background-light;
    border-radius: 8px;
    position: relative;
  }

  .memory-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: repeating-linear-gradient(45deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.3) 10px,
        rgba(255, 255, 255, 0.3) 20px), linear-gradient(to top, @primary-color, lighten(@primary-color, 20%));
    border-radius: 0 0 8px 8px;
  }

  &.timeline {
    height: 40px;
    position: relative;
  }

  .timeline-bar {
    position: absolute;
    top: 20px;
    left: 5%;
    width: 90%;
    height: 6px;
    background: @accent-color;
    border-radius: 3px;
  }

  .timeline-event {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 10px;
      background: @accent-color;
    }
  }
}

.metric-tip {
  background: lighten(@accent-color, 45%);
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;

  strong {
    color: darken(@accent-color, 15%);
  }
}

.analysis-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.timeline-explanation {
  flex: 1;

  .timeline-key {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .key-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .key-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;

    &.scripting {
      background: #f1c40f;
    }

    &.rendering {
      background: #9b59b6;
    }

    &.painting {
      background: #2ecc71;
    }

    &.loading {
      background: #3498db;
    }

    &.idle {
      background: #95a5a6;
    }
  }

  ol {
    padding-left: 1.5rem;

    li {
      margin-bottom: 1rem;
      font-weight: 500;

      strong {
        color: @primary-color;
      }
    }
  }
}

.timeline-demo {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.demo-timeline {
  height: 100px;
  position: relative;
  background: @background-light;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.timeline-task {
  position: absolute;
  top: 30px;
  height: 40px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;

  &.warning {
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
  }
}

.timeline-axis {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 0.8rem;
  color: lighten(@text-color, 30%);
}

.demo-details {
  display: flex;
  gap: 1rem;

  .detail-item {
    flex: 1;
    background: @background-light;
    padding: 1rem;
    border-radius: 8px;

    h4 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0.5rem 0 0;

      li {
        margin-bottom: 0.3rem;
      }
    }
  }
}

.memory-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.memory-instructions {
  flex: 1;

  ol {
    padding-left: 1.5rem;

    li {
      margin-bottom: 1rem;
      font-weight: 500;
    }
  }
}

.memory-tips {
  background: lighten(@warning-color, 45%);
  padding: 1.2rem;
  border-radius: 8px;
  margin-top: 1.5rem;

  h4 {
    margin-top: 0;
    color: darken(@warning-color, 15%);
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.memory-visual {
  flex: 1;
}

.snapshot-comparison {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.snapshot {
  flex: 1;
  background: @background-light;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;

  h4 {
    margin-top: 0;
    color: @primary-color;
  }
}

.heap-size {
  font-size: 1.5rem;
  font-weight: bold;
  color: @secondary-color;
}

.heap-objects {
  font-size: 0.9rem;
  color: lighten(@text-color, 20%);
}

.snapshot-diff {
  background: @error-color;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: bold;
}

.leak-details {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h4 {
    margin-top: 0;
    color: @error-color;
  }
}

.leak-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  .leak-name {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .leak-count {
    background: lighten(@error-color, 40%);
    color: darken(@error-color, 15%);
    padding: 0.1rem 0.5rem;
    border-radius: 10px;
    font-weight: bold;
  }
}

.network-content {
  margin-top: 1.5rem;
}

.waterfall-chart {
  height: 120px;
  position: relative;
  background: @background-light;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.waterfall-item {
  position: absolute;
  top: 30px;
  height: 40px;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.9rem;
}

.waterfall-axis {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 0.8rem;
  color: lighten(@text-color, 30%);
}

.network-metrics {
  display: flex;
  gap: 1.5rem;

  .metric {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h4 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0.5rem 0 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.practice-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .practice-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }

  ul {
    padding-left: 1.2rem;
    text-align: left;

    li {
      margin-bottom: 0.8rem;
    }
  }
}

.devtools-footer {
  text-align: center;
  padding: 2rem 0;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 2rem;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .devtools-header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .steps-container {
    grid-template-columns: 1fr;
  }
}
</style>
