<template>
  <div class="performance-container">
    <header class="perf-header">
      <h1>前端 Performance API 基础介绍</h1>
      <p class="subtitle">全面掌握浏览器性能监控与分析</p>
      <div class="perf-stats">
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-value">20+</div>
          <div class="stat-label">性能指标</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-value">15+</div>
          <div class="stat-label">API接口</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔍</div>
          <div class="stat-value">100%</div>
          <div class="stat-label">浏览器支持</div>
        </div>
      </div>
    </header>

    <div class="perf-navigation">
      <button v-for="section in sections" :key="section.id" :class="{ active: activeSection === section.id }"
        @click="activeSection = section.id">
        {{ section.title }}
      </button>
    </div>

    <div class="perf-content">
      <!-- 概述部分 -->
      <section v-show="activeSection === 'overview'" class="perf-section">
        <h2>Performance API 概述</h2>
        <div class="perf-intro">
          <p>
            <strong>Performance API</strong> 是一组用于访问浏览器性能指标的接口集合，它提供了：
          </p>
          <ul>
            <li>高精度时间测量</li>
            <li>资源加载性能数据</li>
            <li>页面导航和渲染指标</li>
            <li>用户自定义性能标记</li>
            <li>实时性能监控能力</li>
          </ul>

          <div class="perf-architecture">
            <div class="arch-layer">应用层</div>
            <div class="arch-arrow">↓</div>
            <div class="arch-layer">Performance API</div>
            <div class="arch-arrow">↓</div>
            <div class="arch-layer">浏览器引擎</div>
            <div class="arch-arrow">↓</div>
            <div class="arch-layer">硬件层</div>
          </div>

          <h3>核心优势</h3>
          <div class="advantages-grid">
            <div class="advantage-card">
              <div class="adv-icon">📈</div>
              <h4>高精度</h4>
              <p>提供微秒级时间精度</p>
            </div>
            <div class="advantage-card">
              <div class="adv-icon">🔄</div>
              <h4>全面性</h4>
              <p>覆盖页面生命周期全阶段</p>
            </div>
            <div class="advantage-card">
              <div class="adv-icon">🔧</div>
              <h4>可扩展</h4>
              <p>支持自定义性能标记</p>
            </div>
            <div class="advantage-card">
              <div class="adv-icon">🌐</div>
              <h4>标准化</h4>
              <p>W3C标准，跨浏览器支持</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 时间测量部分 -->
      <section v-show="activeSection === 'timing'" class="perf-section">
        <h2>高精度时间测量</h2>

        <div class="method-card">
          <h3>performance.now()</h3>
          <p>返回从页面开始加载到当前时刻的高精度时间戳（毫秒）</p>

          <div class="code-block">
            <pre><code>// 获取高精度时间戳
const start = performance.now();

// 执行一些操作
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

const end = performance.now();
console.log(`操作耗时: ${(end - start).toFixed(4)} 毫秒`);</code></pre>
          </div>

          <div class="use-case">
            <h4>使用场景</h4>
            <ul>
              <li>测量函数执行时间</li>
              <li>计算动画帧率</li>
              <li>性能基准测试</li>
            </ul>
          </div>
        </div>

        <div class="method-card">
          <h3>performance.timeOrigin</h3>
          <p>返回性能测量开始时的时间戳（Unix毫秒）</p>

          <div class="code-block">
            <pre><code>// 获取时间起点
const timeOrigin = performance.timeOrigin;

// 计算当前时间
const now = performance.now();
const currentTime = new Date(timeOrigin + now);

console.log('性能测量开始时间:', new Date(timeOrigin));
console.log('当前精确时间:', currentTime);</code></pre>
          </div>

          <div class="use-case">
            <h4>使用场景</h4>
            <ul>
              <li>精确时间同步</li>
              <li>性能数据分析</li>
              <li>跨设备时间校准</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 用户计时部分 -->
      <section v-show="activeSection === 'user'" class="perf-section">
        <h2>用户自定义性能标记</h2>

        <div class="method-card">
          <h3>performance.mark()</h3>
          <p>在性能时间线上创建自定义时间戳标记</p>

          <div class="code-block">
            <pre><code>// 创建标记
performance.mark('script-start');

// 执行一些操作
loadData();
renderUI();

// 创建结束标记
performance.mark('script-end');

// 测量两个标记之间的时间
performance.measure('script-runtime', 'script-start', 'script-end');

// 获取测量结果
const measures = performance.getEntriesByName('script-runtime');
console.log(`脚本执行耗时: ${measures[0].duration.toFixed(2)}ms`);</code></pre>
          </div>
        </div>

        <div class="method-card">
          <h3>performance.measure()</h3>
          <p>测量两个标记之间的时间间隔</p>

          <div class="code-block">
            <pre><code>// 测量页面初始化时间
performance.measure('init-time', undefined, 'dom-interactive');

// 获取所有测量结果
performance.getEntriesByType('measure').forEach(entry => {
  console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
});</code></pre>
          </div>

          <div class="use-case">
            <h4>使用场景</h4>
            <ul>
              <li>测量关键业务逻辑执行时间</li>
              <li>监控组件渲染性能</li>
              <li>分析异步操作耗时</li>
              <li>自定义性能指标</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 资源计时部分 -->
      <section v-show="activeSection === 'resource'" class="perf-section">
        <h2>资源加载性能监控</h2>

        <div class="method-card">
          <h3>performance.getEntriesByType('resource')</h3>
          <p>获取所有资源加载的性能数据</p>

          <div class="code-block">
            <pre><code>// 获取所有资源加载性能数据
const resources = performance.getEntriesByType('resource');

// 分析资源加载性能
resources.forEach(resource => {
  console.log(`
    ${resource.name}:
      类型: ${resource.initiatorType}
      DNS查询: ${resource.domainLookupEnd - resource.domainLookupStart}ms
      TCP连接: ${resource.connectEnd - resource.connectStart}ms
      请求响应: ${resource.responseEnd - resource.requestStart}ms
      总耗时: ${resource.duration}ms
  `);
});</code></pre>
          </div>

          <div class="resource-grid">
            <div class="resource-card">
              <div class="res-icon">🖼️</div>
              <h4>图片资源</h4>
              <p>监控图片加载时间</p>
            </div>
            <div class="resource-card">
              <div class="res-icon">📜</div>
              <h4>脚本资源</h4>
              <p>分析JS文件加载</p>
            </div>
            <div class="resource-card">
              <div class="res-icon">🎨</div>
              <h4>样式资源</h4>
              <p>跟踪CSS加载性能</p>
            </div>
            <div class="resource-card">
              <div class="res-icon">🔗</div>
              <h4>API请求</h4>
              <p>监控XHR/Fetch性能</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 导航计时部分 -->
      <section v-show="activeSection === 'navigation'" class="perf-section">
        <h2>页面导航性能监控</h2>

        <div class="method-card">
          <h3>performance.timing</h3>
          <p>提供页面加载全过程的详细时间点</p>

          <div class="timing-diagram">
            <div class="timeline">
              <div class="timeline-event" style="left: 0%;">navigationStart</div>
              <div class="timeline-event" style="left: 20%;">domLoading</div>
              <div class="timeline-event" style="left: 40%;">domInteractive</div>
              <div class="timeline-event" style="left: 60%;">domComplete</div>
              <div class="timeline-event" style="left: 80%;">loadEventEnd</div>
              <div class="timeline-bar"></div>
            </div>
          </div>

          <div class="code-block">
            <pre><code>const timing = performance.timing;

// 计算关键性能指标
const metrics = {
  DNS查询: timing.domainLookupEnd - timing.domainLookupStart,
  TCP连接: timing.connectEnd - timing.connectStart,
  请求响应: timing.responseEnd - timing.requestStart,
  DOM解析: timing.domComplete - timing.domLoading,
  页面完全加载: timing.loadEventEnd - timing.navigationStart
};

console.log('页面加载性能指标:', metrics);</code></pre>
          </div>
        </div>

        <div class="method-card">
          <h3>performance.getEntriesByType('navigation')</h3>
          <p>获取页面导航的性能数据（现代替代方案）</p>

          <div class="code-block">
            <pre><code>// 获取页面导航性能数据
const [navigation] = performance.getEntriesByType('navigation');

console.log(`
  重定向次数: ${navigation.redirectCount}
  页面类型: ${navigation.type}
  卸载前页面时间: ${navigation.unloadEventEnd}ms
  DOM解析时间: ${navigation.domComplete - navigation.domInteractive}ms
`);</code></pre>
          </div>
        </div>
      </section>

      <!-- 性能观察器部分 -->
      <section v-show="activeSection === 'observer'" class="perf-section">
        <h2>实时性能监控</h2>

        <div class="method-card">
          <h3>PerformanceObserver</h3>
          <p>实时监控性能事件，避免轮询</p>

          <div class="code-block">
            <pre><code>// 创建性能观察器
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();

  entries.forEach(entry => {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-paint') {
          console.log(`首次绘制(FP): ${entry.startTime}ms`);
        }
        if (entry.name === 'first-contentful-paint') {
          console.log(`首次内容绘制(FCP): ${entry.startTime}ms`);
        }
        break;
      case 'resource':
        console.log(`资源加载: ${entry.name} (${entry.duration}ms)`);
        break;
      case 'longtask':
        console.warn(`长任务: ${entry.duration}ms`, entry.attribution);
        break;
    }
  });
});

// 监控性能事件
observer.observe({
  entryTypes: ['paint', 'resource', 'longtask']
});</code></pre>
          </div>

          <div class="observer-features">
            <div class="feature">
              <div class="feat-icon">🎯</div>
              <h4>事件驱动</h4>
              <p>只在事件发生时触发</p>
            </div>
            <div class="feature">
              <div class="feat-icon">⚡</div>
              <h4>高效节能</h4>
              <p>避免不必要的轮询</p>
            </div>
            <div class="feature">
              <div class="feat-icon">🔔</div>
              <h4>实时通知</h4>
              <p>立即响应性能事件</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 内存监控部分 -->
      <section v-show="activeSection === 'memory'" class="perf-section">
        <h2>内存使用监控</h2>

        <div class="method-card">
          <h3>performance.memory</h3>
          <p>获取JavaScript内存使用情况（Chrome专属）</p>

          <div class="code-block">
            <pre><code>// 获取内存使用情况
if (performance.memory) {
  const memory = performance.memory;

  setInterval(() => {
    console.log(`
      已使用JS堆: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB
      总JS堆大小: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB
      堆大小限制: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB
    `);
  }, 5000);
}</code></pre>
          </div>

          <div class="memory-visual">
            <div class="memory-bar">
              <div class="memory-used" :style="{ width: memoryUsed }"></div>
            </div>
            <div class="memory-labels">
              <div>已使用: {{ usedMemory }} MB</div>
              <div>总量: {{ totalMemory }} MB</div>
              <div>限制: {{ limitMemory }} MB</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="perf-footer">
      <p>© 2023 前端性能监控指南 | Performance API v2</p>
      <div class="browser-support">
        支持浏览器: Chrome, Firefox, Edge, Safari 11+
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const activeSection = ref('overview');

// 模拟内存数据
const memoryData = ref({
  used: 85,
  total: 180,
  limit: 2048
});

const memoryUsed = computed(() => {
  return `${(memoryData.value.used / memoryData.value.total) * 100}%`;
});

const usedMemory = computed(() => (memoryData.value.used).toFixed(1));
const totalMemory = computed(() => (memoryData.value.total).toFixed(1));
const limitMemory = computed(() => (memoryData.value.limit / 1024).toFixed(1));

const sections = [
  { id: 'overview', title: '概述' },
  { id: 'timing', title: '时间测量' },
  { id: 'user', title: '用户计时' },
  { id: 'resource', title: '资源计时' },
  { id: 'navigation', title: '导航计时' },
  { id: 'observer', title: '性能观察器' },
  { id: 'memory', title: '内存监控' }
];

// 模拟内存使用变化
onMounted(() => {
  setInterval(() => {
    memoryData.value.used = Math.min(
      memoryData.value.total - 10,
      Math.max(50, memoryData.value.used + (Math.random() - 0.5) * 20)
    );
  }, 2000);
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@code-color: #f8f8f2;

.performance-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.perf-header {
  text-align: center;
  margin-bottom: 2rem;
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

.perf-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.15);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    backdrop-filter: blur(5px);
    min-width: 120px;

    .stat-icon {
      font-size: 2rem;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
}

.perf-navigation {
  display: flex;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  button {
    flex: 1;
    min-width: 120px;
    padding: 1rem;
    border: none;
    background: none;
    font-size: 1rem;
    font-weight: 600;
    color: lighten(@text-color, 20%);
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      background: @background-light;
      color: @text-color;
    }

    &.active {
      background: @accent-color;
      color: white;
      box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
    }
  }
}

.perf-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @secondary-color;
    position: relative;
    padding-bottom: 0.8rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: @accent-color;
      border-radius: 3px;
    }
  }
}

.perf-intro {
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 2rem;

    li {
      margin-bottom: 0.8rem;
      font-size: 1.1rem;
    }
  }
}

.perf-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: lighten(@accent-color, 45%);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;

  .arch-layer {
    background: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    width: 100%;
    text-align: center;
  }

  .arch-arrow {
    font-size: 1.5rem;
    color: @accent-color;
  }
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.advantage-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .adv-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h4 {
    margin: 0.5rem 0;
    color: @secondary-color;
  }

  p {
    margin: 0;
    color: lighten(@text-color, 20%);
    font-size: 0.95rem;
  }
}

.method-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.4rem;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
}

.code-block {
  background: @code-bg;
  color: @code-color;
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      .comment {
        color: #75715e;
      }

      .keyword {
        color: #f92672;
      }

      .string {
        color: #a6e22e;
      }

      .function {
        color: #66d9ef;
      }

      .variable {
        color: #fd971f;
      }
    }
  }
}

.use-case {
  background: lighten(@accent-color, 45%);
  padding: 1.2rem;
  border-radius: 8px;
  margin-top: 1.5rem;

  h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: darken(@accent-color, 15%);
  }

  ul {
    padding-left: 1.2rem;
    margin-bottom: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.resource-card {
  background: white;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .res-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    margin: 0.5rem 0;
    color: @secondary-color;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: lighten(@text-color, 20%);
  }
}

.timing-diagram {
  background: @background-light;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.timeline {
  position: relative;
  height: 80px;
  margin: 20px 0;
}

.timeline-bar {
  position: absolute;
  top: 40px;
  left: 5%;
  width: 90%;
  height: 6px;
  background: @primary-color;
  border-radius: 3px;
}

.timeline-event {
  position: absolute;
  top: 20px;
  transform: translateX(-50%);
  width: 160px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 20px;
    background: @accent-color;
  }
}

.observer-features {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;

  .feature {
    text-align: center;

    .feat-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    h4 {
      margin: 0.5rem 0;
      color: @secondary-color;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: lighten(@text-color, 20%);
    }
  }
}

.memory-visual {
  margin-top: 1.5rem;

  .memory-bar {
    height: 30px;
    background: @background-light;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .memory-used {
    height: 100%;
    background: linear-gradient(90deg, #42b983, #3498db);
    border-radius: 15px;
    transition: width 1s ease;
  }

  .memory-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: lighten(@text-color, 20%);
  }
}

.perf-footer {
  text-align: center;
  padding: 1.5rem;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 2rem;

  .browser-support {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: lighten(@text-color, 40%);
  }
}

@media (max-width: 768px) {
  .perf-header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .perf-stats {
    flex-direction: column;
    align-items: center;
  }

  .perf-navigation {
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;

    button {
      min-width: 100px;
    }
  }

  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
