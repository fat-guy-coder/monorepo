<template>
  <div class="memory-management-guide">
    <header>
      <h1>浏览器内存管理指南</h1>
      <p>深入理解内存分配、使用与回收机制</p>
    </header>

    <main>
      <!-- 内存管理概述 -->
      <section class="overview">
        <div class="memory-model">
          <h2>浏览器内存模型</h2>
          <div class="model-diagram">
            <div class="memory-stack">
              <div class="section-header">调用栈 (Stack)</div>
              <div class="stack-content">
                <div class="frame">函数帧3</div>
                <div class="frame">函数帧2</div>
                <div class="frame">函数帧1</div>
                <div class="frame">全局执行上下文</div>
              </div>
              <div class="properties">
                <div class="property">固定大小</div>
                <div class="property">自动分配/释放</div>
                <div class="property">存储基本类型和引用地址</div>
              </div>
            </div>
            <div class="memory-heap">
              <div class="section-header">堆内存 (Heap)</div>
              <div class="heap-content">
                <div class="generation">
                  <div class="gen-label">新生代</div>
                  <div class="objects">
                    <div class="object" v-for="i in 8" :key="'n' + i"></div>
                  </div>
                </div>
                <div class="generation">
                  <div class="gen-label">老生代</div>
                  <div class="objects">
                    <div class="object" v-for="i in 16" :key="'o' + i"></div>
                  </div>
                </div>
              </div>
              <div class="properties">
                <div class="property">动态分配</div>
                <div class="property">存储引用类型</div>
                <div class="property">垃圾回收管理</div>
              </div>
            </div>
          </div>
        </div>

        <div class="memory-lifecycle">
          <h2>内存生命周期</h2>
          <div class="lifecycle-steps">
            <div class="step">
              <div class="step-icon">1</div>
              <h3>分配内存</h3>
              <p>声明变量、创建对象或函数时分配内存</p>
            </div>
            <div class="arrow">→</div>
            <div class="step">
              <div class="step-icon">2</div>
              <h3>使用内存</h3>
              <p>读写内存中的值</p>
            </div>
            <div class="arrow">→</div>
            <div class="step">
              <div class="step-icon">3</div>
              <h3>释放内存</h3>
              <p>垃圾回收器自动回收不再使用的内存</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 内存分配策略 -->
      <section class="allocation">
        <h2>内存分配策略</h2>
        <div class="strategies">
          <div class="strategy">
            <div class="strategy-icon">📦</div>
            <h3>栈内存分配</h3>
            <p>用于存储原始类型和函数调用帧</p>
            <pre><code>function calculate() {
  const a = 5;      // 栈分配
  const b = 10;     // 栈分配
  return a + b;     // 栈操作
}</code></pre>
          </div>

          <div class="strategy">
            <div class="strategy-icon">🗄️</div>
            <h3>堆内存分配</h3>
            <p>用于存储对象、数组等引用类型</p>
            <pre><code>// 堆分配
const user = {
  name: 'Alice',
  age: 30
};

// 堆分配
const scores = [95, 89, 78];</code></pre>
          </div>

          <div class="strategy">
            <div class="strategy-icon">🧠</div>
            <h3>内存池管理</h3>
            <p>高效管理大量小对象</p>
            <pre><code>class ObjectPool {
  constructor(createFn) {
    this.createFn = createFn;
    this.pool = [];
  }

  get() {
    return this.pool.length ?
      this.pool.pop() : this.createFn();
  }

  release(obj) {
    this.pool.push(obj);
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 内存优化技术 -->
      <section class="optimization">
        <h2>内存优化技术</h2>
        <div class="techniques">
          <div class="technique">
            <h3>1. 减少内存分配</h3>
            <ul>
              <li>避免不必要的对象创建</li>
              <li>重用对象而不是创建新实例</li>
              <li>使用基本类型代替对象</li>
            </ul>
            <div class="code-comparison">
              <div>
                <p class="bad">不推荐</p>
                <pre><code>function logName(user) {
  const name = user.name; // 不必要的字符串分配
  console.log(name);
}</code></pre>
              </div>
              <div>
                <p class="good">推荐</p>
                <pre><code>function logName(user) {
  console.log(user.name); // 直接访问属性
}</code></pre>
              </div>
            </div>
          </div>

          <div class="technique">
            <h3>2. 及时释放引用</h3>
            <ul>
              <li>在不再需要时解除对象引用</li>
              <li>避免全局变量长期持有对象</li>
              <li>清理事件监听器和定时器</li>
            </ul>
            <pre><code>// 组件卸载时清理资源
onUnmounted(() => {
  // 清除定时器
  clearInterval(timer);

  // 移除事件监听
  window.removeEventListener('resize', handleResize);

  // 释放大对象引用
  largeData = null;
});</code></pre>
          </div>

          <div class="technique">
            <h3>3. 使用弱引用</h3>
            <ul>
              <li>WeakMap 和 WeakSet 不阻止垃圾回收</li>
              <li>适用于缓存和元数据存储</li>
              <li>避免意外内存泄漏</li>
            </ul>
            <pre><code>// 使用 WeakMap 存储元数据
const metadata = new WeakMap();

function setMetadata(obj, data) {
  metadata.set(obj, data);
  // 当obj不再被引用时，data会自动回收
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 内存分析工具 -->
      <section class="tools">
        <h2>内存分析工具</h2>
        <div class="tool-grid">
          <div class="tool">
            <div class="tool-icon">📊</div>
            <h3>Chrome DevTools</h3>
            <ul>
              <li><strong>Performance 面板</strong>：分析内存使用时间线</li>
              <li><strong>Memory 面板</strong>：拍摄堆快照分析内存分配</li>
              <li><strong>Performance Monitor</strong>：实时监控内存使用</li>
            </ul>
          </div>

          <div class="tool">
            <div class="tool-icon">⚙️</div>
            <h3>内存分析API</h3>
            <pre><code>// 监控内存使用
function monitorMemory() {
  const memory = performance.memory;

  return {
    used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
    total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
    limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
  };
}

// 每5秒记录内存使用
setInterval(() => {
  console.table(monitorMemory());
}, 5000);</code></pre>
          </div>

          <div class="tool">
            <div class="tool-icon">🔍</div>
            <h3>内存分析流程</h3>
            <ol>
              <li>记录初始内存快照</li>
              <li>执行特定操作</li>
              <li>记录操作后内存快照</li>
              <li>比较快照，识别内存增长</li>
              <li>分析保留路径，查找泄漏源</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2>内存管理最佳实践</h2>
        <div class="practices">
          <div class="practice">
            <div class="number">1</div>
            <div>
              <h3>避免全局变量</h3>
              <p>全局变量会一直存在直到页面关闭，可能持有不需要的引用</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">2</div>
            <div>
              <h3>使用对象池</h3>
              <p>对于频繁创建销毁的对象，使用池化技术减少GC压力</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">3</div>
            <div>
              <h3>优化数据结构</h3>
              <p>选择合适的数据结构减少内存占用</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">4</div>
            <div>
              <h3>分批处理大数据</h3>
              <p>避免一次性加载处理大量数据</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">5</div>
            <div>
              <h3>使用Web Workers</h3>
              <p>将内存密集型任务移到独立线程</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">6</div>
            <div>
              <h3>定期性能分析</h3>
              <p>在开发过程中持续监控内存使用</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2023 浏览器内存管理指南 | 使用Vue3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加内存监控逻辑（如果需要）
</script>

<style lang="less" scoped>
@primary: #4361ee;
@secondary: #3a0ca3;
@accent: #4cc9f0;
@stack-color: #ff9e00;
@heap-color: #7209b7;
@light: #f8f9fa;
@dark: #212529;
@good: #2ec4b6;
@bad: #e71d36;

// 基础样式
.memory-management-guide {
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

// 内存模型部分
.overview {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  .memory-model,
  .memory-lifecycle {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
  }
}

.model-diagram {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .memory-stack,
  .memory-heap {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    background: linear-gradient(to right, @primary, @secondary);
    color: white;
    padding: 0.8rem;
    font-weight: 600;
    text-align: center;
  }

  .memory-stack {
    background: lighten(@stack-color, 40%);
    border: 1px solid @stack-color;

    .stack-content {
      padding: 1rem;
    }

    .frame {
      background: lighten(@stack-color, 30%);
      border: 1px solid @stack-color;
      padding: 0.8rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      text-align: center;
      font-weight: 500;
    }
  }

  .memory-heap {
    background: lighten(@heap-color, 55%);
    border: 1px solid @heap-color;

    .heap-content {
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .generation {
      padding: 1rem;
      border-radius: 6px;

      &:first-child {
        background: lighten(@good, 40%);
        border: 1px solid @good;
      }

      &:last-child {
        background: lighten(@accent, 30%);
        border: 1px solid @accent;
      }
    }

    .gen-label {
      font-weight: 600;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .objects {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;

      .object {
        height: 25px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }

  .properties {
    display: flex;
    background: rgba(0, 0, 0, 0.03);
    padding: 0.8rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);

    .property {
      flex: 1;
      text-align: center;
      font-size: 0.9rem;
      padding: 0.3rem;
    }
  }
}

.memory-lifecycle {
  .lifecycle-steps {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: @primary;
      padding: 0 1rem;

      @media (max-width: 767px) {
        transform: rotate(90deg);
        padding: 0;
        margin: -0.5rem 0;
      }
    }
  }

  .step {
    text-align: center;
    flex: 1;

    .step-icon {
      width: 60px;
      height: 60px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: bold;
      margin: 0 auto 1rem;
    }

    h3 {
      color: @secondary;
      margin: 0 0 0.5rem;
    }

    p {
      color: lighten(@dark, 20%);
      margin: 0;
    }
  }
}

// 内存分配策略
.allocation {
  .strategies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .strategy {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;

    .strategy-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      color: @secondary;
      margin: 0.5rem 0;
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
      text-align: left;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

// 内存优化技术
.optimization {
  .techniques {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);

      .technique:last-child {
        grid-column: span 2;
      }
    }
  }

  .technique {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      color: @secondary;
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e9ecef;
    }

    ul {
      padding-left: 1.2rem;
      margin: 1rem 0;

      li {
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: "•";
          color: @primary;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
          line-height: 1;
        }
      }
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }

  .code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;

    .bad,
    .good {
      font-weight: bold;
      margin-bottom: 0.5rem;
      text-align: center;
      padding: 0.3rem;
      border-radius: 4px;
    }

    .bad {
      background: lighten(@bad, 40%);
      color: darken(@bad, 20%);
    }

    .good {
      background: lighten(@good, 40%);
      color: darken(@good, 20%);
    }
  }
}

// 工具部分
.tools {
  .tool-grid {
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
      text-align: center;
    }

    h3 {
      color: @secondary;
      margin-top: 0;
      text-align: center;
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
          color: rgba(255, 255, 255, 0.5);
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

// 最佳实践
.best-practices {
  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid @primary;

    .number {
      width: 36px;
      height: 36px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      font-size: 1.1rem;
    }

    h3 {
      color: @secondary;
      margin: 0 0 0.5rem;
    }

    p {
      color: lighten(@dark, 20%);
      margin: 0;
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
