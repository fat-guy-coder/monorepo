<template>
  <div class="memory-leak-guide">
    <header>
      <h1>浏览器内存泄漏分析与预防</h1>
      <p>识别、诊断和解决常见的内存泄漏问题</p>
    </header>

    <main>
      <!-- 概念部分 -->
      <section class="concept">
        <h2>内存泄漏概念</h2>
        <div class="content">
          <div class="definition">
            <p><strong>内存泄漏 (Memory Leak)</strong> 是指应用程序未能正确释放不再使用的内存，导致内存占用持续增加，最终可能引起页面变慢、崩溃或浏览器关闭。</p>
            <div class="memory-demo">
              <div class="memory-graph">
                <div class="graph-container">
                  <div class="memory-usage" :style="{ height: memoryUsage + 'px' }"></div>
                </div>
                <div class="graph-labels">
                  <div v-for="(label, index) in graphLabels" :key="index" class="label">
                    {{ label }}
                  </div>
                </div>
              </div>
              <div class="demo-controls">
                <button @click="startLeak">模拟泄漏</button>
                <button @click="stopLeak">停止泄漏</button>
                <button @click="fixLeak">修复泄漏</button>
              </div>
            </div>
          </div>

          <div class="key-points">
            <div class="point">
              <div class="icon">📈</div>
              <div>
                <h3>内存持续增长</h3>
                <p>内存占用随时间不断增加</p>
              </div>
            </div>
            <div class="point">
              <div class="icon">🐢</div>
              <div>
                <h3>性能下降</h3>
                <p>页面响应变慢，卡顿明显</p>
              </div>
            </div>
            <div class="point">
              <div class="icon">💥</div>
              <div>
                <h3>应用崩溃</h3>
                <p>内存耗尽导致页面崩溃</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见泄漏情况 -->
      <section class="common-leaks">
        <h2>常见内存泄漏情况</h2>
        <div class="leaks-grid">
          <div class="leak">
            <div class="leak-icon">🗑️</div>
            <h3>未清除的定时器</h3>
            <p>setInterval 或 setTimeout 未被清除</p>
            <pre><code>// 泄漏代码
function startProcess() {
  this.timer = setInterval(() => {
    // 处理逻辑
  }, 1000);
}

// 组件销毁时未清除
onUnmounted(() => {
  // 缺少 clearInterval(this.timer)
});</code></pre>
          </div>

          <div class="leak">
            <div class="leak-icon">🔊</div>
            <h3>未移除的事件监听</h3>
            <p>DOM 事件监听器未正确移除</p>
            <pre><code>// 泄漏代码
mounted() {
  window.addEventListener('resize', this.handleResize);
}

// 缺少移除事件监听
beforeUnmount() {
  // 应该移除:
  // window.removeEventListener('resize', this.handleResize);
}</code></pre>
          </div>

          <div class="leak">
            <div class="leak-icon">📦</div>
            <h3>全局变量累积</h3>
            <p>意外创建的全局变量</p>
            <pre><code>// 泄漏代码
function processData() {
  // 意外创建全局变量
  tempData = processLargeData();

  // 应该使用:
  // const tempData = processLargeData();
}

// 全局变量会一直存在直到页面关闭</code></pre>
          </div>

          <div class="leak">
            <div class="leak-icon">🔗</div>
            <h3>闭包引用</h3>
            <p>闭包保留了不需要的引用</p>
            <pre><code>// 泄漏代码
function setup() {
  const largeData = getLargeData();

  return function() {
    // 闭包引用了largeData
    // 即使不再需要也无法释放
    console.log('Operation');
  };
}

const operation = setup();
// largeData 无法被回收</code></pre>
          </div>

          <div class="leak">
            <div class="leak-icon">🖼️</div>
            <h3>脱离DOM的引用</h3>
            <p>保留已移除DOM元素的引用</p>
            <pre><code>// 泄漏代码
const elements = [];
function createElement() {
  const el = document.createElement('div');
  document.body.appendChild(el);
  elements.push(el); // 存储引用

  // 稍后移除元素
  document.body.removeChild(el);

  // elements 仍然保留对DOM元素的引用
}</code></pre>
          </div>

          <div class="leak">
            <div class="leak-icon">♻️</div>
            <h3>未清理的第三方库</h3>
            <p>未正确销毁库实例和资源</p>
            <pre><code>// 泄漏代码
mounted() {
  this.chart = new Chart(this.$refs.canvas, {
    // 图表配置
  });
}

// 缺少清理
beforeUnmount() {
  // 应该调用: this.chart.destroy();
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 检测工具 -->
      <section class="detection-tools">
        <h2>内存泄漏检测工具</h2>
        <div class="tools-grid">
          <div class="tool">
            <div class="tool-icon">👷</div>
            <h3>Chrome DevTools</h3>
            <ul>
              <li><strong>Performance Monitor</strong>：实时监控内存使用</li>
              <li><strong>Memory 面板</strong>：拍摄堆快照分析</li>
              <li><strong>Performance 面板</strong>：记录内存分配时间线</li>
            </ul>
          </div>

          <div class="tool">
            <div class="tool-icon">📊</div>
            <h3>内存分析步骤</h3>
            <ol>
              <li>打开DevTools → Memory面板</li>
              <li>执行可疑操作前拍摄堆快照</li>
              <li>多次执行可疑操作</li>
              <li>再次拍摄堆快照</li>
              <li>比较快照，查找未释放对象</li>
            </ol>
          </div>

          <div class="tool">
            <div class="tool-icon">⚙️</div>
            <h3>性能监控API</h3>
            <pre><code>// 监控内存使用
setInterval(() => {
  const memory = performance.memory;
  console.log(`已用堆: ${formatBytes(memory.usedJSHeapSize)} /
              堆限制: ${formatBytes(memory.jsHeapSizeLimit)}`);
}, 1000);

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 预防措施 -->
      <section class="prevention">
        <h2>预防内存泄漏最佳实践</h2>
        <div class="prevention-grid">
          <div class="practice">
            <div class="number">1</div>
            <h3>及时清理资源</h3>
            <p>在组件卸载时清除定时器、事件监听和异步操作</p>
            <pre><code>// Vue3 Composition API
import { onUnmounted } from 'vue';

setup() {
  const timer = setInterval(() => {}, 1000);

  onUnmounted(() => {
    clearInterval(timer);
  });
}</code></pre>
          </div>

          <div class="practice">
            <div class="number">2</div>
            <h3>使用弱引用</h3>
            <p>使用 WeakMap 和 WeakSet 避免不必要的强引用</p>
            <pre><code>// 使用 WeakMap 避免内存泄漏
const weakMap = new WeakMap();

function associateData(element, data) {
  weakMap.set(element, data);
  // 当element被GC回收时，data也会被回收
}</code></pre>
          </div>

          <div class="practice">
            <div class="number">3</div>
            <h3>避免全局存储</h3>
            <p>使用局部变量代替全局变量，及时释放大对象</p>
            <pre><code>// 处理完成后释放大对象
function processLargeData() {
  const largeData = loadData(); // 大数据

  // 处理数据...

  // 处理完成后释放
  largeData = null;
}</code></pre>
          </div>

          <div class="practice">
            <div class="number">4</div>
            <h3>谨慎使用闭包</h3>
            <p>避免在闭包中保留不再需要的大对象</p>
            <pre><code>// 优化闭包使用
function createProcessor() {
  const config = loadConfig(); // 大对象

  // 只保留需要的数据
  const importantData = config.important;

  return function() {
    // 使用importantData而不是整个config
  };
}</code></pre>
          </div>

          <div class="practice">
            <div class="number">5</div>
            <h3>清理DOM引用</h3>
            <p>移除DOM元素时同时移除相关引用</p>
            <pre><code>const elementRefs = new Set();

function addElement() {
  const el = document.createElement('div');
  document.body.appendChild(el);
  elementRefs.add(el);
}

function removeElement(el) {
  document.body.removeChild(el);
  elementRefs.delete(el); // 移除引用
}</code></pre>
          </div>

          <div class="practice">
            <div class="number">6</div>
            <h3>定期性能检测</h3>
            <p>在开发过程中使用工具定期检查内存使用</p>
            <pre><code>// 在关键生命周期添加检测
onMounted(() => {
  startMemoryTracking();
});

onUnmounted(() => {
  stopMemoryTracking();
  reportMemoryUsage();
});</code></pre>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p> 浏览器内存泄漏防治指南 | 使用Vue3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const memoryUsage = ref(50);
const leakInterval = ref<number | null>(null);
const fixedLeakInterval = ref<number | null>(null);

// 模拟内存泄漏
const startLeak = () => {
  stopLeak(); // 停止现有泄漏模拟
  leakInterval.value = setInterval(() => {
    if (memoryUsage.value < 250) {
      memoryUsage.value += 5;
    }
  }, 300);
};

// 停止泄漏
const stopLeak = () => {
  if (leakInterval.value) {
    clearInterval(leakInterval.value);
    leakInterval.value = null;
  }
};

// 修复泄漏并模拟内存回收
const fixLeak = () => {
  stopLeak();

  // 模拟内存回收
  if (fixedLeakInterval.value) clearInterval(fixedLeakInterval.value);

  fixedLeakInterval.value = setInterval(() => {
    if (memoryUsage.value > 50) {
      memoryUsage.value -= 2;
    } else {
      if (fixedLeakInterval.value) {
        clearInterval(fixedLeakInterval.value);
        fixedLeakInterval.value = null;
      }
    }
  }, 100);
};

// 清理定时器
onUnmounted(() => {
  stopLeak();
  if (fixedLeakInterval.value) {
    clearInterval(fixedLeakInterval.value);
  }
});

// 图表标签
const graphLabels = ['0', '20', '40', '60', '80', '100%'];
</script>

<style lang="less" scoped>
@primary: #4361ee;
@secondary: #3a0ca3;
@accent: #4cc9f0;
@leak-color: #e71d36;
@fix-color: #2ec4b6;
@light: #f8f9fa;
@dark: #212529;

// 基础样式
.memory-leak-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: @dark;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: @secondary;
      background: linear-gradient(135deg, @secondary, @primary);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: lighten(@dark, 20%);
      font-size: 1.1rem;
    }
  }

  section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid @accent;
      color: @secondary;
    }
  }
}

// 概念部分
.concept {
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .definition {
    p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      line-height: 1.7;

      strong {
        color: @primary;
      }
    }
  }

  .memory-demo {
    .memory-graph {
      display: flex;
      margin-bottom: 1.5rem;

      .graph-container {
        width: 60px;
        height: 250px;
        border: 2px solid #e9ecef;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        margin-right: 10px;
      }

      .memory-usage {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, @leak-color, #ff6b6b);
        transition: height 0.5s ease;
      }

      .graph-labels {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        height: 250px;

        .label {
          font-size: 0.8rem;
          color: lighten(@dark, 30%);
        }
      }
    }

    .demo-controls {
      display: flex;
      gap: 1rem;

      button {
        flex: 1;
        padding: 0.7rem;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:first-child {
          background: @leak-color;
          color: white;

          &:hover {
            background: darken(@leak-color, 10%);
          }
        }

        &:nth-child(2) {
          background: #f1f3f5;

          &:hover {
            background: #e9ecef;
          }
        }

        &:last-child {
          background: @fix-color;
          color: white;

          &:hover {
            background: darken(@fix-color, 10%);
          }
        }
      }
    }
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;

    .point {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 3px solid @primary;

      .icon {
        font-size: 1.8rem;
        line-height: 1;
      }

      h3 {
        margin: 0 0 0.3rem;
        color: @secondary;
      }

      p {
        margin: 0;
        color: lighten(@dark, 20%);
      }
    }
  }
}

// 常见泄漏情况
.common-leaks {
  .leaks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .leak {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }

    .leak-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0.5rem 0;
      color: @secondary;
    }

    p {
      color: lighten(@dark, 20%);
      margin-bottom: 1rem;
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

// 检测工具
.detection-tools {
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .tool {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    .tool-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      color: @secondary;
    }

    ul,
    ol {
      padding-left: 1.2rem;
      margin: 0.5rem 0 0;

      li {
        margin-bottom: 0.5rem;
      }
    }

    ol {
      counter-reset: item;
      padding-left: 0;

      li {
        counter-increment: item;
        margin-bottom: 1rem;
        position: relative;
        padding-left: 2rem;

        &::before {
          content: counter(item);
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          background: @primary;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
        }
      }
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;
      margin-top: 1rem;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

// 预防措施
.prevention {
  .prevention-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: @fix-color;
    }

    .number {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 32px;
      height: 32px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1rem;
    }

    h3 {
      margin: 0.5rem 0 1rem;
      color: @secondary;
      padding-right: 40px;
    }

    p {
      color: lighten(@dark, 20%);
      margin-bottom: 1rem;
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

// 页脚
footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: lighten(@dark, 30%);
  font-size: 0.9rem;
  border-top: 1px solid #e9ecef;
}
</style>
