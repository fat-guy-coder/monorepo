<template>
  <div class="animation-optimization">
    <!-- 顶部标题区域 -->
    <div class="hero-section">
      <h1 class="main-title">requestAnimationFrame动画优化</h1>
      <p class="subtitle">利用浏览器渲染机制实现流畅动画效果</p>
      <div class="performance-badge">
        <div class="badge-item">
          <div class="badge-value">60FPS</div>
          <div class="badge-label">目标帧率</div>
        </div>
        <div class="badge-item">
          <div class="badge-value">100%</div>
          <div class="badge-label">设备兼容</div>
        </div>
        <div class="badge-item">
          <div class="badge-value">10×</div>
          <div class="badge-label">性能提升</div>
        </div>
      </div>
    </div>

    <!-- 动画对比演示 -->
    <div class="demo-section">
      <h2 class="section-title"><span class="highlight">动画效果对比</span></h2>
      <div class="comparison-container">
        <div class="demo-panel">
          <h3>使用 setTimeout</h3>
          <div class="animate-box" :style="{ left: timeoutPos + 'px' }"></div>
          <div class="fps-counter">FPS: {{ timeoutFPS.toFixed(1) }}</div>
          <div class="performance-meter">
            <div class="cpu-usage" :style="{ width: timeoutCPU + '%' }">
              CPU: {{ timeoutCPU.toFixed(1) }}%
            </div>
          </div>
          <button @click="runTimeoutAnimation" class="action-button">运行动画</button>
        </div>

        <div class="demo-panel">
          <h3>使用 requestAnimationFrame</h3>
          <div class="animate-box raf" :style="{ left: rafPos + 'px' }"></div>
          <div class="fps-counter">FPS: {{ rafFPS.toFixed(1) }}</div>
          <div class="performance-meter">
            <div class="cpu-usage raf-cpu" :style="{ width: rafCPU + '%' }">
              CPU: {{ rafCPU.toFixed(1) }}%
            </div>
          </div>
          <button @click="runRafAnimation" class="action-button raf-button">运行动画</button>
        </div>
      </div>
    </div>

    <!-- 核心原理 -->
    <div class="principles-section">
      <h2 class="section-title"><span class="highlight">核心原理</span></h2>

      <div class="principle-grid">
        <div class="principle-card">
          <div class="card-icon">⏱️</div>
          <h3>与刷新率同步</h3>
          <p>requestAnimationFrame在每次屏幕刷新前执行，确保动画与设备刷新率（通常60Hz）同步</p>
        </div>

        <div class="principle-card">
          <div class="card-icon">🔋</div>
          <h3>智能节能</h3>
          <p>当页面不可见或最小化时，自动暂停动画，减少CPU、GPU和电池消耗</p>
        </div>

        <div class="principle-card">
          <div class="card-icon">📊</div>
          <h3>批处理机制</h3>
          <p>浏览器能够优化并批量处理动画，减少不必要的样式计算和布局</p>
        </div>
      </div>

      <div class="render-cycle">
        <div class="cycle-diagram">
          <div class="cycle-step">JS执行</div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step">样式计算</div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step">布局</div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step">绘制</div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step">合成</div>
        </div>
        <div class="raf-marker">requestAnimationFrame在此执行</div>
      </div>
    </div>

    <!-- 代码示例 -->
    <div class="code-section">
      <h2 class="section-title"><span class="highlight">代码实现</span></h2>

      <div class="code-comparison">
        <div class="code-block">
          <h3>setTimeout实现（不推荐）</h3>
          <pre><code>// 不稳定且低效的动画
function animateWithTimeout() {
  element.style.left = (parseInt(element.style.left) + 5) + 'px';

  if (parseInt(element.style.left) < 300) {
    setTimeout(animateWithTimeout, 16.7); // 尝试匹配60fps
  }
}

// 启动动画
setTimeout(animateWithTimeout, 16.7);</code></pre>
          <div class="code-problems">
            <div class="problem">❌ 时间间隔不精确</div>
            <div class="problem">❌ 页面不可见时仍执行</div>
            <div class="problem">❌ 可能导致过度渲染</div>
          </div>
        </div>

        <div class="code-block raf">
          <h3>requestAnimationFrame实现（推荐）</h3>
          <pre><code>// 流畅高效的动画
function animateWithRAF(timestamp) {
  // 计算基于时间的动画进度
  const progress = (timestamp - startTime) / 2000;

  // 更新元素位置（线性动画）
  element.style.transform = `translateX(${progress * 300}px)`;

  // 继续动画直到完成
  if (progress < 1) {
    requestId = requestAnimationFrame(animateWithRAF);
  }
}

// 启动动画
const startTime = performance.now();
let requestId = requestAnimationFrame(animateWithRAF);

// 取消动画
// cancelAnimationFrame(requestId);</code></pre>
          <div class="code-benefits">
            <div class="benefit">✅ 与刷新率完美同步</div>
            <div class="benefit">✅ 后台自动暂停</div>
            <div class="benefit">✅ 更精确的时间控制</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="use-cases">
      <h2 class="section-title"><span class="highlight">最佳使用场景</span></h2>

      <div class="scenario-list">
        <div class="scenario">
          <div class="scenario-icon">🎮</div>
          <div class="scenario-content">
            <h3>复杂交互动画</h3>
            <p>拖拽、滑动、缩放等需要精确控制的UI交互</p>
          </div>
        </div>

        <div class="scenario">
          <div class="scenario-icon">📈</div>
          <div class="scenario-content">
            <h3>数据可视化</h3>
            <p>动态图表、实时数据流展示等可视化效果</p>
          </div>
        </div>

        <div class="scenario">
          <div class="scenario-icon">🎥</div>
          <div class="scenario-content">
            <h3>Canvas/WebGL动画</h3>
            <p>游戏、3D模型等高性能图形渲染</p>
          </div>
        </div>

        <div class="scenario">
          <div class="scenario-icon">🔄</div>
          <div class="scenario-content">
            <h3>页面过渡效果</h3>
            <p>自定义页面切换、元素入场/出场动画</p>
          </div>
        </div>
      </div>

      <div class="optimization-tips">
        <h3>高级优化技巧</h3>
        <ul>
          <li>在RAF回调中修改DOM，避免布局抖动</li>
          <li>配合CSS <code>transform</code>和<code>opacity</code>属性实现硬件加速</li>
          <li>使用<code>performance.now()</code>实现时间驱动动画</li>
          <li>避免在RAF中执行昂贵操作，保持回调轻量</li>
        </ul>
      </div>
    </div>

    <!-- 浏览器支持 -->
    <div class="browser-support">
      <h2 class="section-title"><span class="highlight">浏览器兼容性</span></h2>
      <div class="compatibility-chart">
        <div class="browser">
          <div class="browser-icon chrome"></div>
          <div class="browser-name">Chrome</div>
          <div class="support">✅ 20+</div>
        </div>
        <div class="browser">
          <div class="browser-icon firefox"></div>
          <div class="browser-name">Firefox</div>
          <div class="support">✅ 11+</div>
        </div>
        <div class="browser">
          <div class="browser-icon safari"></div>
          <div class="browser-name">Safari</div>
          <div class="support">✅ 6.1+</div>
        </div>
        <div class="browser">
          <div class="browser-icon edge"></div>
          <div class="browser-name">Edge</div>
          <div class="support">✅ 12+</div>
        </div>
        <div class="browser">
          <div class="browser-icon ie"></div>
          <div class="browser-name">IE</div>
          <div class="support">✅ 10+</div>
        </div>
      </div>
      <div class="polyfill-note">
        对于旧版浏览器，可以使用<a href="#">raf-polyfill</a>实现兼容
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

// setTimeout动画相关状态
const timeoutPos = ref(0);
const timeoutFPS = ref(0);
const timeoutCPU = ref(0);
let timeoutStartTime = 0;
let timeoutFrames = 0;
let timeoutInterval: number | null = null;
let timeoutLastFrameTime = 0;

// RAF动画相关状态
const rafPos = ref(0);
const rafFPS = ref(0);
const rafCPU = ref(0);
let rafStartTime = 0;
let rafFrames = 0;
let rafId: number | null = null;
let rafLastFrameTime = 0;

// 运行setTimeout动画
const runTimeoutAnimation = () => {
  resetAnimations();

  timeoutPos.value = 0;
  timeoutFPS.value = 0;
  timeoutCPU.value = 0;
  timeoutStartTime = performance.now();
  timeoutFrames = 0;
  timeoutLastFrameTime = timeoutStartTime;

  if (timeoutInterval) {
    clearInterval(timeoutInterval);
  }

  timeoutInterval = window.setInterval(() => {
    timeoutFrames++;
    const now = performance.now();
    const elapsed = now - timeoutLastFrameTime;

    // 计算FPS
    if (elapsed > 0) {
      timeoutFPS.value = 1000 / elapsed;
    }

    timeoutLastFrameTime = now;

    // 更新位置
    timeoutPos.value += 300 / 120; // 120帧内完成动画

    // 计算模拟CPU使用率
    timeoutCPU.value = 30 + Math.random() * 30;

    // 结束条件
    if (timeoutPos.value >= 300) {
      clearInterval(timeoutInterval!);
      timeoutInterval = null;
    }
  }, 16); // 约60fps
};

// 运行requestAnimationFrame动画
const runRafAnimation = () => {
  resetAnimations();

  rafPos.value = 0;
  rafFPS.value = 0;
  rafCPU.value = 0;
  rafStartTime = performance.now();
  rafFrames = 0;
  rafLastFrameTime = rafStartTime;

  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  const animate = (timestamp: number) => {
    rafFrames++;
    const elapsed = timestamp - rafLastFrameTime;

    // 计算FPS
    if (elapsed > 0) {
      rafFPS.value = 1000 / elapsed;
    }

    rafLastFrameTime = timestamp;

    // 基于时间而非帧数的动画进度
    const progress = Math.min(1, (timestamp - rafStartTime) / 2000);
    rafPos.value = progress * 300;

    // 计算模拟CPU使用率
    rafCPU.value = 10 + Math.random() * 15;

    // 继续动画直到完成
    if (progress < 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
    }
  };

  rafId = requestAnimationFrame(animate);
};

// 重置动画状态
const resetAnimations = () => {
  if (timeoutInterval) {
    clearInterval(timeoutInterval);
    timeoutInterval = null;
  }

  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  timeoutFPS.value = 0;
  rafFPS.value = 0;
  timeoutCPU.value = 0;
  rafCPU.value = 0;
};

// 组件卸载时清理
onUnmounted(() => {
  resetAnimations();
});
</script>

<style scoped lang="less">


:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3f37c9;
  --accent: #4cc9f0;
  --success: #3aafa9;
  --warning: #f72585;
  --dark: #2b2d42;
  --light: #f8f9fa;
  --card-bg: #ffffff;
  --border: #e9ecef;
  --code-bg: #1e293b;
  --radius: 12px;
  --shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.animation-optimization {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

.hero-section {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  border-radius: var(--radius);
  margin-bottom: 40px;

  .main-title {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.85;
    max-width: 600px;
    margin: 0 auto 25px;
  }
}

.performance-badge {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;

  .badge-item {
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--radius);
    padding: 18px 30px;
    min-width: 140px;
    backdrop-filter: blur(4px);
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.25);
    }

    .badge-value {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .badge-label {
      font-size: 1rem;
      opacity: 0.85;
    }
  }
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin: 40px 0 30px;
  color: var(--dark);

  .highlight {
    padding: 0 15px 5px;
    background: linear-gradient(to top, rgba(67, 97, 238, 0.2), transparent 70%);
    border-bottom: 3px solid var(--primary);
    border-radius: 3px;
  }
}

.demo-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 30px;
}

.comparison-container {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.demo-panel {
  background: #f8fafc;
  border-radius: var(--radius);
  padding: 25px;
  min-width: 300px;
  border: 1px solid var(--border);
  flex: 1;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: var(--dark);
  }
}

.animate-box {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #f72585, #b5179e);
  border-radius: 8px;
  position: relative;
  margin-bottom: 25px;
  transition: left 0.1s linear;
  box-shadow: 0 4px 10px rgba(247, 37, 133, 0.3);

  &.raf {
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  }
}

.fps-counter {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark);
}

.performance-meter {
  width: 100%;
  height: 30px;
  background: #e2e8f0;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;

  .cpu-usage {
    height: 100%;
    background: linear-gradient(to right, #f72585, #b5179e);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    min-width: 80px;
    transition: width 0.5s ease;

    &.raf-cpu {
      background: linear-gradient(to right, #4361ee, #3a0ca3);
    }
  }
}

.action-button {
  background: white;
  color: var(--dark);
  border: 2px solid var(--border);
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.raf-button {
    border-color: var(--primary);
    color: var(--primary);

    &:hover {
      background: var(--primary);
      color: white;
    }
  }
}

.principles-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 30px;
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.principle-card {
  background: #f8fafc;
  border-radius: var(--radius);
  padding: 25px;
  text-align: center;
  border: 1px solid var(--border);

  .card-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: var(--dark);
  }

  p {
    color: #4a5568;
  }
}

.render-cycle {
  background: #f1f5f9;
  border-radius: var(--radius);
  padding: 25px;
  text-align: center;

  .cycle-diagram {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;

    .cycle-step {
      background: var(--primary);
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
    }

    .cycle-arrow {
      font-size: 1.5rem;
      color: var(--dark);
    }
  }

  .raf-marker {
    font-weight: 600;
    color: var(--primary);
    margin-top: 10px;
    position: relative;
    display: inline-block;

    &::before {
      content: '↑';
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.5rem;
      color: var(--primary);
    }
  }
}

.code-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 30px;
}

.code-comparison {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

.code-block {
  flex: 1;
  min-width: 300px;
  background: #f8fafc;
  border-radius: var(--radius);
  padding: 20px;
  border-left: 4px solid #f72585;

  &.raf {
    border-left-color: var(--primary);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--dark);
  }

  pre {
    background: var(--code-bg);
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;


    code {
      font-family: 'Fira Code', monospace;
      color: #000;
      font-size: 0.95rem;
      line-height: 1.5;

      .token.keyword {
        color: #ff6b6b;
      }

      .token.string {
        color: #a3e635;
      }

      .token.function {
        color: #4cc9f0;
      }
    }
  }
}

.code-problems,
.code-benefits {
  margin-top: 15px;

  .problem,
  .benefit {
    padding: 10px 15px;
    margin-bottom: 8px;
    border-radius: 6px;
    font-weight: 500;
  }
}

.code-problems {
  .problem {
    background: #fff0f3;
    color: #f72585;
    border-left: 3px solid #f72585;
  }
}

.code-benefits {
  .benefit {
    background: #f0f7ff;
    color: var(--primary);
    border-left: 3px solid var(--primary);
  }
}

.use-cases {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 30px;
}

.scenario-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.scenario {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  padding: 20px;
  background: #f8fafc;
  border-radius: var(--radius);
  border: 1px solid var(--border);

  .scenario-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .scenario-content {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: var(--dark);
    }

    p {
      color: #4a5568;
    }
  }
}

.optimization-tips {
  background: #e6f7ff;
  border-radius: var(--radius);
  padding: 25px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--primary);
    text-align: center;
  }

  ul {
    list-style: none;
    max-width: 700px;
    margin: 0 auto;

    li {
      padding: 10px 15px;
      margin-bottom: 10px;
      background: white;
      border-radius: 8px;
      position: relative;
      padding-left: 50px;

      &::before {
        content: '✓';
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 28px;
        height: 28px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      code {
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }
  }
}

.browser-support {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 30px;
}

.compatibility-chart {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0;
}

.browser {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  padding: 15px;
  background: #f8fafc;
  border-radius: var(--radius);

  .browser-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;

    &.chrome {
      background: conic-gradient(from -45deg,
          #ea4335 25%,
          #4285f4 0 50%,
          #34a853 0 75%,
          #fbbc05 0);
    }

    &.firefox {
      background: linear-gradient(to bottom, #ff9500, #ff2600);
    }

    &.safari {
      background: linear-gradient(to bottom, #1e88e5, #0d47a1);
    }

    &.edge {
      background: linear-gradient(to bottom, #0078d7, #00a1f1);
    }

    &.ie {
      background: linear-gradient(to bottom, #00bcf2, #0072c6);
    }
  }

  .browser-name {
    font-weight: 600;
    margin-bottom: 5px;
  }

  .support {
    color: var(--success);
    font-weight: 500;
  }
}

.polyfill-note {
  text-align: center;
  color: #4a5568;
  margin-top: 15px;

  a {
    color: var(--primary);
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.resources-section {
  background: linear-gradient(135deg, #3a0ca3, #4361ee);
  border-radius: var(--radius);
  padding: 40px;
  text-align: center;
  color: white;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 25px;
  }
}

.resources {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

.resource-link {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }
}

.action-button {
  background: white;
  color: var(--primary);
  border: none;
  padding: 14px 35px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 30px 15px;

    .main-title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .performance-badge {
    flex-wrap: wrap;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .comparison-container {
    flex-direction: column;
    align-items: center;
  }

  .demo-panel {
    width: 100%;
  }

  .render-cycle {
    .cycle-diagram {
      flex-direction: column;
      align-items: center;

      .cycle-arrow {
        transform: rotate(90deg);
        margin: 5px 0;
      }
    }
  }
}
</style>
