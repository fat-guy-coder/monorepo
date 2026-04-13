<template>
  <div class="raf-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>🎬 requestAnimationFrame</h1>
      <p class="subtitle">浏览器动画渲染的最佳实践</p>
    </header>

    <!-- requestAnimationFrame 介绍 -->
    <section class="raf-introduction">
      <h2 class="section-title">
        <span class="icon">📖</span>
        requestAnimationFrame 介绍
      </h2>
      <p>
        <strong>requestAnimationFrame</strong>
        是一个浏览器提供的API，用于在下次重绘之前执行动画。它可以帮助开发者创建流畅的动画效果，并且能够自动优化性能，避免在后台标签页中消耗不必要的资源。
      </p>
      <p>
        使用 <code>requestAnimationFrame</code> 的主要好处包括：
      </p>
      <ul>
        <li><b>与浏览器的刷新率同步，通常为60fps。</b></li>
        <li><b>在页面不可见时自动暂停动画，节省资源。</b></li>
        <li><b>提供高精度的时间戳，便于计算动画进度。</b></li>
      </ul>
      <p>requestAnimationFrame的缺点：</p>
      <ul>
        <li>
          <b>
            在低性能设备上，requestAnimationFrame的帧率可能低于60fps，导致动画卡顿。
          </b>
        </li>
        <li>
          <b>
            requestAnimationFrame因为是在主线程上执行的，当主线程非常繁忙时，requestAnimationFrame的效果也大打折扣，导致动画卡顿。
          </b>
        </li>
      </ul>
      <p>

        通过使用 <code>requestAnimationFrame</code>，开发者可以确保动画在不同设备和浏览器上的表现一致。
      </p>
      <h3>requestAnimationFrame(callback(timestamp)) 参数</h3>
      <ul>
        <li><strong>callback</strong>: 一个函数，浏览器在下次重绘之前调用该函数。</li>
        <li><strong>timestamp</strong>: 一个 DOMHighResTimeStamp，表示调用时的时间戳。</li>
      </ul>
      <h3>cancelAnimationFrame(animationId)取消动画</h3>
      <pre><code>const animationId = requestAnimationFrame(callback(timestamp));
cancelAnimationFrame(animationId)
      </code></pre>
      <div><b>注意:微任务过长会导致延迟执行requestAnimationFrame</b> </div>
    </section>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 核心特性 -->
      <section class="feature-section">
        <h2 class="section-title">
          <span class="icon">🌟</span>
          核心特性
        </h2>
        <div class="feature-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">{{ feature.icon }}</span>
              <h3>{{ feature.title }}</h3>
            </div>
            <p class="feature-desc">{{ feature.description }}</p>
            <pre class="code-sample">{{ feature.code }}</pre>
          </div>
        </div>
      </section>

      <!-- 使用模式 -->
      <section class="pattern-section">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          标准使用模式
        </h2>
        <div class="pattern-steps">
          <div v-for="(step, index) in usagePatterns" :key="index" class="step-card">
            <div class="step-header">
              <span class="step-number">#{{ index + 1 }}</span>
              <h4>{{ step.title }}</h4>
            </div>
            <pre class="code-sample">{{ step.code }}</pre>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="scenario-section">
        <h2 class="section-title">
          <span class="icon">🎯</span>
          典型应用场景
        </h2>
        <div class="scenario-grid">
          <div v-for="(scene, index) in scenarios" :key="index" class="scene-card">
            <div class="scene-icon">{{ scene.icon }}</div>
            <h4>{{ scene.title }}</h4>
            <ul class="scene-points">
              <li v-for="(point, pIndex) in scene.points" :key="pIndex">{{ point }}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';

interface Feature {
  icon: string;
  title: string;
  description: string;
  code: string;
}

interface UsagePattern {
  title: string;
  code: string;
}

interface Scenario {
  icon: string;
  title: string;
  points: string[];
}

const animationId: number = 0





onMounted(() => {

})

// 核心特性数据
const features = ref<Feature[]>([
  {
    icon: "🔄",
    title: "帧率同步",
    description: "与浏览器刷新率同步(通常60fps)",
    code: `function animate() {
  // 动画逻辑
  requestAnimationFrame(animate);
}`
  },
  {
    icon: "⚡",
    title: "性能优化",
    description: "后台标签页自动暂停执行",
    code: `// 页面不可见时自动暂停
const animationId = requestAnimationFrame(callback);`
  },
  {
    icon: "🎯",
    title: "精确时序",
    description: "接收高精度时间戳参数",
    code: `function animationStep(timestamp) {
  // 使用时间戳计算进度
}`
  }
]);

// 使用模式数据
const usagePatterns = ref<UsagePattern[]>([
  {
    title: "启动动画循环",
    code: `let animationId: number;

function startAnimation() {
  let startTime: number;

  function animate(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    // 动画逻辑
    element.style.transform = \`translateX(\${progress}px)\`;

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);
}`
  },
  {
    title: "停止动画",
    code: `function stopAnimation() {
  cancelAnimationFrame(animationId);
}`
  },
  {
    title: "节流优化",
    code: `let lastTime = 0;
const interval = 1000 / 30; // 30fps

function throttledUpdate(timestamp) {
  if (timestamp - lastTime >= interval) {
    // 更新逻辑
    lastTime = timestamp;
  }
  requestAnimationFrame(throttledUpdate);
}`
  }
]);

// 应用场景数据
const scenarios = ref<Scenario[]>([
  {
    icon: "🎮",
    title: "动画系统",
    points: [
      "CSS动画后备方案",
      "复杂路径动画",
      "物理效果模拟"
    ]
  },
  {
    icon: "📊",
    title: "数据可视化",
    points: [
      "实时图表更新",
      "大数据量渲染",
      "交互式可视化"
    ]
  },
  {
    icon: "🕹️",
    title: "游戏开发",
    points: [
      "游戏主循环",
      "物理引擎更新",
      "逐帧渲染控制"
    ]
  }
]);


onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
</script>

<style lang="less" scoped>
@primary-color: #2196f3;
@text-color: #2c3e50;
@code-bg: #2c3e50;

.raf-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: @text-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: lighten(@text-color, 30%);
      font-size: 1.1rem;
    }
  }

  .feature-section,
  .pattern-section,
  .scenario-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: @text-color;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        font-size: 1.5em;
      }
    }
  }

  .feature-grid,
  .pattern-steps,
  .scenario-grid {
    display: grid;
    gap: 2rem;
  }

  .feature-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .pattern-steps {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .feature-card,
  .step-card,
  .scene-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .feature-header,
    .step-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .feature-icon {
        font-size: 1.8rem;
      }

      .step-number {
        background: @primary-color;
        color: white;
        padding: 0.5rem 0.8rem;
        border-radius: 4px;
      }
    }

    .code-sample {
      background: @code-bg;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      font-family: 'Fira Code', monospace;
      white-space: pre-wrap;
      margin-top: 1rem;
    }
  }

  .scenario-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    .scene-card {
      text-align: center;

      .scene-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .scene-points {
        list-style: none;
        padding-left: 0;

        li {
          padding: 0.3rem 0;
          position: relative;

          &::before {
            content: "•";
            color: @primary-color;
            position: absolute;
            left: -1rem;
          }
        }
      }
    }
  }
}
</style>
