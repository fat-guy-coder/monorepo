<template>
  <div class="gc-guide">
    <header>
      <h1>浏览器垃圾回收机制</h1>
      <p>深入理解V8引擎的内存管理算法</p>
    </header>

    <main>
      <!-- 概念介绍 -->
      <section class="concept">
        <h2>垃圾回收基础概念</h2>
        <div class="content">
          <div class="definition">
            <p><strong>垃圾回收 (Garbage Collection)</strong> 是一种自动内存管理机制，用于检测和回收不再被程序使用的内存空间。</p>
            <div class="key-points">
              <div class="point">
                <div class="icon">🔄</div>
                <div>
                  <h3>内存生命周期</h3>
                  <p>分配内存 → 使用内存 → 释放内存</p>
                </div>
              </div>
              <div class="point">
                <div class="icon">🎯</div>
                <div>
                  <h3>回收目标</h3>
                  <p>识别并回收不可达对象占用的内存</p>
                </div>
              </div>
              <div class="point">
                <div class="icon">⏱️</div>
                <div>
                  <h3>执行时机</h3>
                  <p>内存不足时或周期性执行</p>
                </div>
              </div>
            </div>
          </div>

          <div class="memory-diagram">
            <h3>内存结构示意图</h3>
            <div class="diagram-container">
              <div class="memory-heap">
                <div class="heap-label">堆内存</div>
                <div class="generations">
                  <div class="generation new-space">
                    <div class="gen-label">新生代</div>
                    <div class="objects">
                      <div v-for="i in 12" :key="'n' + i" class="object" :class="{
                        'active': i <= 8,
                        'inactive': i > 8
                      }"></div>
                    </div>
                  </div>
                  <div class="generation old-space">
                    <div class="gen-label">老生代</div>
                    <div class="objects">
                      <div v-for="i in 24" :key="'o' + i" class="object" :class="{
                        'active': i <= 18,
                        'inactive': i > 18
                      }"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="memory-stack">
                <div class="stack-label">调用栈</div>
                <div class="stack-frames">
                  <div class="frame">frame4</div>
                  <div class="frame">frame3</div>
                  <div class="frame">frame2</div>
                  <div class="frame">frame1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见算法 -->
      <section class="algorithms">
        <h2>常见垃圾回收算法</h2>
        <div class="algorithms-grid">
          <div class="algorithm">
            <h3>1. 引用计数法</h3>
            <div class="algorithm-desc">
              <p>跟踪每个对象被引用的次数，当引用数为0时立即回收</p>
              <div class="reference-example">
                <div class="ref-object">obj1 <span class="count">(2)</span></div>
                <div class="ref-links">
                  <div class="link"></div>
                  <div class="link"></div>
                </div>
                <div class="ref-vars">
                  <div class="var">varA</div>
                  <div class="var">varB</div>
                </div>
              </div>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>立即回收内存</li>
                  <li>执行时间可预测</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li>无法处理循环引用</li>
                  <li>频繁更新计数器开销大</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="algorithm">
            <h3>2. 标记清除法</h3>
            <div class="algorithm-desc">
              <p>从根对象出发，标记所有可达对象，清除未标记对象</p>
              <div class="mark-sweep-process">
                <div class="process-step">
                  <div class="step-label">标记前</div>
                  <div class="objects">
                    <div class="object root">R</div>
                    <div class="object">A</div>
                    <div class="object">B</div>
                    <div class="object">C</div>
                  </div>
                </div>
                <div class="process-step">
                  <div class="step-label">标记后</div>
                  <div class="objects">
                    <div class="object root marked">R</div>
                    <div class="object marked">A</div>
                    <div class="object">B</div>
                    <div class="object marked">C</div>
                  </div>
                </div>
                <div class="process-step">
                  <div class="step-label">清除后</div>
                  <div class="objects">
                    <div class="object root">R</div>
                    <div class="object">A</div>
                    <div class="object gc">B</div>
                    <div class="object">C</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>解决循环引用问题</li>
                  <li>实现相对简单</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li>内存碎片化</li>
                  <li>暂停时间较长</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- V8垃圾回收 -->
      <section class="v8-gc">
        <h2>V8引擎垃圾回收算法</h2>
        <div class="v8-strategy">
          <h3>分代垃圾回收策略</h3>
          <div class="generation-collection">
            <div class="gen-section new-gen">
              <h4>新生代回收 (Scavenge算法)</h4>
              <div class="scavenge-process">
                <div class="memory-layout">
                  <div class="semispace from-space">
                    <div class="space-label">From 空间</div>
                    <div class="objects">
                      <div class="object active">A</div>
                      <div class="object active">B</div>
                      <div class="object">C</div>
                      <div class="object active">D</div>
                    </div>
                  </div>
                  <div class="semispace to-space">
                    <div class="space-label">To 空间</div>
                    <div class="objects"></div>
                  </div>
                </div>
                <div class="arrow">⇒</div>
                <div class="memory-layout">
                  <div class="semispace from-space">
                    <div class="space-label">From 空间</div>
                    <div class="objects"></div>
                  </div>
                  <div class="semispace to-space">
                    <div class="space-label">To 空间</div>
                    <div class="objects">
                      <div class="object active">A</div>
                      <div class="object active">B</div>
                      <div class="object active">D</div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="process-desc">复制活跃对象到To空间 ⇒ 清空From空间 ⇒ 交换From和To空间</p>
            </div>

            <div class="gen-section old-gen">
              <h4>老生代回收 (标记-清除与标记-整理)</h4>
              <div class="mark-process">
                <div class="process-step">
                  <div class="step-label">标记阶段</div>
                  <div class="old-objects">
                    <div class="object root">R</div>
                    <div class="object marked">A</div>
                    <div class="object">B</div>
                    <div class="object marked">C</div>
                    <div class="object marked">D</div>
                  </div>
                </div>
                <div class="process-step">
                  <div class="step-label">清除阶段</div>
                  <div class="old-objects">
                    <div class="object root">R</div>
                    <div class="object">A</div>
                    <div class="object gc">B</div>
                    <div class="object">C</div>
                    <div class="object">D</div>
                  </div>
                </div>
                <div class="process-step">
                  <div class="step-label">整理阶段</div>
                  <div class="old-objects">
                    <div class="object root">R</div>
                    <div class="object">A</div>
                    <div class="object">C</div>
                    <div class="object">D</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="v8-optimizations">
          <h3>V8优化策略</h3>
          <div class="optimizations-grid">
            <div class="optimization">
              <h4>增量标记 (Incremental Marking)</h4>
              <p>将标记过程分解为多个小步骤，穿插在JavaScript执行中</p>
              <div class="timeline">
                <div class="js-exec">JS</div>
                <div class="marking">标记</div>
                <div class="js-exec">JS</div>
                <div class="marking">标记</div>
                <div class="js-exec">JS</div>
                <div class="sweeping">清除</div>
              </div>
            </div>
            <div class="optimization">
              <h4>惰性清理 (Lazy Sweeping)</h4>
              <p>延迟清理过程，在内存分配时按需清理</p>
              <div class="timeline">
                <div class="sweeping">部分清理</div>
                <div class="js-exec">分配内存</div>
                <div class="sweeping">部分清理</div>
                <div class="js-exec">分配内存</div>
                <div class="sweeping">部分清理</div>
              </div>
            </div>
            <div class="optimization">
              <h4>并发标记 (Concurrent Marking)</h4>
              <p>在后台线程执行标记，不阻塞主线程</p>
              <div class="concurrent">
                <div class="main-thread">
                  <div class="js-exec">JS执行</div>
                  <div class="js-exec">JS执行</div>
                  <div class="js-exec">JS执行</div>
                </div>
                <div class="worker-thread">
                  <div class="marking">标记</div>
                  <div class="marking">标记</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 内存管理建议 -->
      <section class="best-practices">
        <h2>内存管理最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="icon">🚫</div>
            <h3>避免全局变量</h3>
            <p>全局变量会一直存在直到页面关闭</p>
            <pre><code>// 避免
window.data = {...};

// 推荐
function process() {
  const data = {...};
  // 使用data
}</code></pre>
          </div>

          <div class="practice">
            <div class="icon">⏱️</div>
            <h3>及时清除定时器</h3>
            <p>未清除的定时器会阻止相关对象被回收</p>
            <pre><code>const timer = setInterval(...);

// 使用后清除
clearInterval(timer);</code></pre>
          </div>

          <div class="practice">
            <div class="icon">🧹</div>
            <h3>清理事件监听器</h3>
            <p>移除不再需要的DOM事件监听器</p>
            <pre><code>element.addEventListener('click', handler);

// 元素移除前
element.removeEventListener('click', handler);</code></pre>
          </div>

          <div class="practice">
            <div class="icon">📦</div>
            <h3>使用对象池</h3>
            <p>复用对象减少垃圾回收压力</p>
            <pre><code>// 创建对象池
const pool = [];

// 获取对象
const obj = pool.length ?
  pool.pop() : createNewObject();

// 归还对象
pool.push(obj);</code></pre>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p> 浏览器垃圾回收机制基本介绍 | 使用Vue3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加一些交互逻辑（如果需要）
</script>

<style lang="less" scoped>
@primary: #4361ee;
@secondary: #3a0ca3;
@accent: #4cc9f0;
@green: #2ec4b6;
@red: #e71d36;
@light: #f8f9fa;
@dark: #212529;

// 基础样式
.gc-guide {
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

    .key-points {
      display: grid;
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

  .memory-diagram {
    h3 {
      margin-top: 0;
      color: @secondary;
    }

    .diagram-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .memory-heap {
      border: 2px solid #dee2e6;
      border-radius: 8px;
      padding: 1rem;

      .heap-label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: @primary;
      }
    }

    .generations {
      display: flex;
      gap: 1rem;
    }

    .generation {
      flex: 1;
      padding: 0.5rem;
      border-radius: 6px;

      &.new-space {
        background: lighten(@green, 40%);
        border: 1px solid @green;
      }

      &.old-space {
        background: lighten(@accent, 30%);
        border: 1px solid @accent;
      }

      .gen-label {
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
    }

    .objects {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.3rem;

      .object {
        height: 20px;
        border-radius: 3px;
        background: #dee2e6;

        &.active {
          background: @green;
        }

        &.inactive {
          background: @red;
          opacity: 0.5;
        }
      }
    }

    .memory-stack {
      border: 2px solid #dee2e6;
      border-radius: 8px;
      padding: 1rem;

      .stack-label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: @primary;
      }

      .stack-frames {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .frame {
        padding: 0.5rem;
        background: #e9ecef;
        border-radius: 4px;
        text-align: center;
      }
    }
  }
}

// 算法部分
.algorithms {
  .algorithms-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .algorithm {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      color: @secondary;
      margin-top: 0;
    }
  }

  .reference-example {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;

    .ref-object {
      padding: 0.8rem 1.5rem;
      background: @green;
      color: white;
      border-radius: 4px;
      font-weight: bold;
      position: relative;

      .count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: @red;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
    }

    .ref-links {
      margin: 0.5rem 0;

      .link {
        width: 2px;
        height: 30px;
        background: @primary;
        margin: 0 auto;

        &:last-child {
          height: 20px;
        }
      }
    }

    .ref-vars {
      display: flex;
      gap: 2rem;

      .var {
        padding: 0.5rem 1rem;
        background: #e9ecef;
        border-radius: 4px;
      }
    }
  }

  .mark-sweep-process {
    display: flex;
    justify-content: space-around;
    margin: 1.5rem 0;

    .process-step {
      text-align: center;

      .step-label {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        color: lighten(@dark, 20%);
      }
    }

    .objects {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .object {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e9ecef;
        border-radius: 4px;
        font-weight: bold;

        &.root {
          background: @primary;
          color: white;
        }

        &.marked {
          background: @green;
          color: white;
        }

        &.gc {
          background: @red;
          color: white;
          opacity: 0.6;
        }
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1.5rem;

    h4 {
      margin-top: 0;
      font-size: 1rem;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0.5rem 0 0;

      li {
        margin-bottom: 0.3rem;
        font-size: 0.9rem;
      }
    }

    .pros {
      border-left: 3px solid @green;
      padding-left: 0.5rem;
    }

    .cons {
      border-left: 3px solid @red;
      padding-left: 0.5rem;
    }
  }
}

// V8垃圾回收部分
.v8-gc {
  .v8-strategy {
    margin-bottom: 2rem;

    h3 {
      color: @secondary;
    }
  }

  .generation-collection {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .gen-section {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    h4 {
      margin-top: 0;
      color: @primary;
    }
  }

  .scavenge-process {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin: 1.5rem 0;

    .arrow {
      font-size: 1.5rem;
      color: @primary;
    }
  }

  .memory-layout {
    display: flex;
    gap: 1rem;
  }

  .semispace {
    flex: 1;
    padding: 1rem;
    border: 2px dashed #adb5bd;
    border-radius: 6px;

    .space-label {
      font-weight: 500;
      margin-bottom: 0.5rem;
      text-align: center;
    }
  }

  .objects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    .object {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e9ecef;
      border-radius: 4px;
      font-weight: bold;

      &.active {
        background: @green;
        color: white;
      }
    }
  }

  .process-desc {
    text-align: center;
    font-style: italic;
    color: lighten(@dark, 20%);
    margin: 1rem 0 0;
  }

  .mark-process {
    display: flex;
    justify-content: space-around;
    margin: 1.5rem 0;

    .process-step {
      text-align: center;

      .step-label {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        color: lighten(@dark, 20%);
      }
    }

    .old-objects {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;

      .object {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e9ecef;
        border-radius: 4px;
        font-weight: bold;

        &.root {
          background: @primary;
          color: white;
        }

        &.marked {
          background: @green;
          color: white;
        }

        &.gc {
          background: @red;
          color: white;
          opacity: 0.6;
        }
      }
    }
  }

  .v8-optimizations {
    h3 {
      color: @secondary;
    }

    .optimizations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .optimization {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;

      h4 {
        margin-top: 0;
        color: @primary;
      }
    }

    .timeline {
      display: flex;
      margin-top: 1rem;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;

      &>div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 500;
      }

      .js-exec {
        background: @primary;
      }

      .marking {
        background: @green;
      }

      .sweeping {
        background: @accent;
      }
    }

    .concurrent {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;

      .main-thread,
      .worker-thread {
        height: 40px;
        display: flex;
        border-radius: 4px;
        overflow: hidden;

        &>div {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
        }
      }

      .main-thread>div {
        background: @primary;
      }

      .worker-thread>div {
        background: @green;
      }
    }
  }
}

// 最佳实践
.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }

    .icon {
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
