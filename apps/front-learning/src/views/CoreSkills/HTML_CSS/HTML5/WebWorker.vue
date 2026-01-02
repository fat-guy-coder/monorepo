<template>
  <div class="web-worker-container">
    <header class="header">
      <h1>Web Worker 技术介绍</h1>
      <p>在 Vue 应用中实现多线程处理</p>
    </header>

    <div class="content-wrapper">
      <section class="section">
        <h2 class="section-title">什么是 Web Worker？</h2>
        <div class="section-content">
          <p>
            Web Worker 是浏览器提供的 JavaScript
            多线程解决方案，允许在后台线程中运行脚本，而不会阻塞主线程。
          </p>
          <p>
            它使得开发者可以创建在后台运行的脚本，执行计算密集型任务，同时保持用户界面的响应性。
          </p>
          <div class="illustration">
            <div class="main-thread">
              <div class="thread-label">主线程</div>
              <div class="task">UI 渲染</div>
              <div class="task">事件处理</div>
              <div class="task">用户交互</div>
            </div>
            <div class="worker-threads">
              <div class="worker">
                <div class="thread-label">Worker 1</div>
                <div class="task">复杂计算</div>
              </div>
              <div class="worker">
                <div class="thread-label">Worker 2</div>
                <div class="task">数据处理</div>
              </div>
              <div class="worker">
                <div class="thread-label">Worker 3</div>
                <div class="task">文件解析</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Web Worker 的作用</h2>
        <div class="section-content">
          <ul class="feature-list">
            <li>
              <div class="icon-box">
                <div class="icon performance"></div>
              </div>
              <div>
                <h3>提升性能</h3>
                <p>将耗时任务转移到后台线程，避免阻塞主线程</p>
              </div>
            </li>
            <li>
              <div class="icon-box">
                <div class="icon responsiveness"></div>
              </div>
              <div>
                <h3>增强响应性</h3>
                <p>保持用户界面的流畅交互，避免卡顿</p>
              </div>
            </li>
            <li>
              <div class="icon-box">
                <div class="icon parallel"></div>
              </div>
              <div>
                <h3>并行处理</h3>
                <p>利用多核 CPU 同时执行多个任务</p>
              </div>
            </li>
            <li>
              <div class="icon-box">
                <div class="icon isolation"></div>
              </div>
              <div>
                <h3>隔离环境</h3>
                <p>在独立上下文中运行，避免全局状态污染</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">如何使用 Web Worker</h2>
        <div class="section-content">
          <div class="code-example">
            <div class="code-block">
              <h3>主线程代码 (Vue组件)</h3>
              <pre><code>// 创建Worker
const worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module'
});

// 发送消息给Worker
worker.postMessage({ type: 'CALCULATE', data: largeDataSet });

// 接收Worker消息
worker.onmessage = (event) => {
  const { type, result } = event.data;
  if (type === 'RESULT') {
    // 处理结果
    results.value = result;
  }
};

// 错误处理
worker.onerror = (error) => {
  console.error('Worker error:', error);
};

// 组件卸载时终止Worker
onUnmounted(() => {
  worker.terminate();
});</code></pre>
            </div>
            <div class="code-block">
              <h3>Worker 线程代码 (worker.ts)</h3>
              <pre><code>// 监听主线程消息
self.onmessage = (event) => {
  const { type, data } = event.data;

  if (type === 'CALCULATE') {
    // 执行复杂计算
    const result = performHeavyCalculation(data);

    // 发送结果回主线程
    self.postMessage({
      type: 'RESULT',
      result
    });
  }
};

function performHeavyCalculation(data) {
  // 模拟耗时计算
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    result += complexOperation(data[i]);
  }
  return result;
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Web Worker 的限制</h2>
        <div class="section-content">
          <div class="limitations">
            <div class="limitation">
              <div class="limitation-icon dom"></div>
              <h3>无法访问 DOM</h3>
              <p>Worker 线程不能直接操作 DOM 元素</p>
            </div>
            <div class="limitation">
              <div class="limitation-icon window"></div>
              <h3>无 window 对象</h3>
              <p>Worker 使用 self 代替 window 全局对象</p>
            </div>
            <div class="limitation">
              <div class="limitation-icon communication"></div>
              <h3>通信限制</h3>
              <p>只能通过 postMessage 进行数据通信</p>
            </div>
            <div class="limitation">
              <div class="limitation-icon same-origin"></div>
              <h3>同源策略</h3>
              <p>Worker 脚本必须与主脚本同源</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Web Worker 的支持</h2>
        <div class="section-content">
          <div class="limitations">
            <div class="limitation">
              <div class="limitation-icon dom"></div>
              <h3>支持location和navigator对象</h3>
              <p>Worker 线程可以访问location和navigator对象</p>
            </div>
            <div class="limitation">
              <div class="limitation-icon window"></div>
              <h3>支持webassembly</h3>
              <p>Worker 线程可以访问webassembly</p>
            </div>
            <div class="limitation">
              <div class="limitation-icon communication"></div>
              <h3>支持SharedArrayBuffer</h3>
              <p>Worker 线程可以访问SharedArrayBuffer</p>
            </div>
            <div class="limitation">
              <div class="limitation-icon same-origin"></div>
              <h3>支持引入外部脚本</h3>
              <p>importScripts('script.js')</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Worker 数量限制</h2>
        <div class="section-content">
          <div class="worker-limits">
            <div class="limit-card">
              <div class="number">50+</div>
              <h3>理论最大值</h3>
              <p>现代浏览器通常支持50个以上Worker</p>
            </div>
            <div class="limit-card">
              <div class="number">4-8</div>
              <h3>实际推荐值</h3>
              <p>根据CPU核心数合理设置Worker数量</p>
            </div>
            <div class="limit-card">
              <div class="number">1</div>
              <h3>共享Worker</h3>
              <p>多个页面可共享一个Worker实例</p>
            </div>
          </div>
          <div class="note">
            <p>
              <strong>注意：</strong>
              实际可创建的Worker数量取决于设备性能、内存和浏览器实现。建议根据任务需求动态创建和销毁Worker。
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">适用场景</h2>
        <div class="section-content">
          <div class="use-cases">
            <div class="use-case">
              <div class="case-icon data"></div>
              <h3>大数据处理</h3>
              <p>CSV/JSON解析、数据转换、复杂计算</p>
            </div>
            <div class="use-case">
              <div class="case-icon image"></div>
              <h3>图像/视频处理</h3>
              <p>图片滤镜、视频编码、Canvas操作</p>
            </div>
            <div class="use-case">
              <div class="case-icon ai"></div>
              <h3>AI/机器学习</h3>
              <p>TensorFlow.js模型推理、预测分析</p>
            </div>
            <div class="use-case">
              <div class="case-icon realtime"></div>
              <h3>实时数据处理</h3>
              <p>WebSocket消息处理、实时分析</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">优缺点分析</h2>
        <div class="section-content">
          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li>提升应用性能和响应速度</li>
                <li>充分利用多核CPU的并行能力</li>
                <li>避免复杂计算阻塞UI渲染</li>
                <li>提供隔离的执行环境</li>
                <li>支持长时间运行的后台任务</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li>无法直接访问DOM</li>
                <li>通信开销（数据序列化/反序列化）</li>
                <li>增加内存消耗</li>
                <li>调试相对复杂</li>
                <li>部分API不可用（如localStorage）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Web Worker 是提升前端应用性能的强大工具，合理使用可以显著改善用户体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要太多逻辑，主要是展示信息
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@background-color: #f8f9fa;
@border-color: #e0e0e0;
@text-color: #333;
@light-text: #666;
@code-bg: #f5f7fa;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.web-worker-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.header {
  text-align: center;
  padding: 30px 0;
  border-bottom: 1px solid @border-color;
  margin-bottom: 30px;

  h1 {
    color: @secondary-color;
    margin: 0;
    font-size: 2.2rem;
  }

  p {
    color: @light-text;
    font-size: 1.1rem;
    margin-top: 10px;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.section {
  background: @background-color;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
}

.section-title {
  color: @primary-color;
  border-bottom: 2px solid lighten(@primary-color, 35%);
  padding-bottom: 12px;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.section-content {
  line-height: 1.6;
  color: @light-text;

  p {
    margin: 10px 0;
  }
}

.illustration {
  display: flex;
  margin: 25px 0;
  gap: 20px;

  .main-thread,
  .worker {
    background: white;
    border: 1px solid @border-color;
    border-radius: 6px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .main-thread {
    flex: 1;
    background: lighten(@primary-color, 40%);
  }

  .worker-threads {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .worker {
    background: lighten(@success-color, 40%);
  }

  .thread-label {
    font-weight: bold;
    margin-bottom: 10px;
    color: @secondary-color;
  }

  .task {
    background: white;
    padding: 8px;
    margin: 5px 0;
    border-radius: 4px;
    font-size: 0.9rem;
  }
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;

  li {
    display: flex;
    gap: 15px;
    align-items: flex-start;
    padding: 15px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .icon-box {
    width: 50px;
    height: 50px;
    background: lighten(@primary-color, 40%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 30px;
      height: 30px;
      background: @primary-color;
      border-radius: 4px;

      &.performance {
        background: linear-gradient(135deg, @primary-color, #9b59b6);
      }
      &.responsiveness {
        background: linear-gradient(135deg, @success-color, #3498db);
      }
      &.parallel {
        background: linear-gradient(135deg, #f39c12, #e74c3c);
      }
      &.isolation {
        background: linear-gradient(135deg, #1abc9c, #3498db);
      }
    }
  }

  h3 {
    margin: 0 0 5px 0;
    color: @secondary-color;
  }
}

.code-example {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.code-block {
  background: @code-bg;
  border-radius: 6px;
  overflow: hidden;

  h3 {
    background: darken(@code-bg, 10%);
    margin: 0;
    padding: 12px 15px;
    font-size: 1rem;
    color: @secondary-color;
  }

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2c3e50;
    }
  }
}

.limitations,
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.limitation,
.use-case {
  background: white;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 15px 0 10px;
    color: @secondary-color;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
}

.limitation-icon,
.case-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @background-color;

  &.dom {
    background: linear-gradient(135deg, #e74c3c, #f39c12);
  }
  &.window {
    background: linear-gradient(135deg, #3498db, #9b59b6);
  }
  &.communication {
    background: linear-gradient(135deg, #1abc9c, #2ecc71);
  }
  &.same-origin {
    background: linear-gradient(135deg, #f1c40f, #e67e22);
  }
  &.data {
    background: linear-gradient(135deg, #3498db, #2980b9);
  }
  &.image {
    background: linear-gradient(135deg, #9b59b6, #8e44ad);
  }
  &.ai {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
  }
  &.realtime {
    background: linear-gradient(135deg, #e67e22, #d35400);
  }

  &::before {
    content: '';
    width: 30px;
    height: 30px;
    background: currentColor;
    border-radius: 4px;
  }
}

.worker-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.limit-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  .number {
    font-size: 2rem;
    font-weight: bold;
    color: @primary-color;
    margin-bottom: 10px;
  }

  h3 {
    margin: 10px 0;
    color: @secondary-color;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @light-text;
  }
}

.note {
  background: lighten(@warning-color, 45%);
  border-left: 4px solid @warning-color;
  padding: 15px;
  border-radius: 0 4px 4px 0;

  p {
    margin: 0;
    color: darken(@warning-color, 20%);
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: white;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 2px solid @border-color;
    color: @secondary-color;
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0;
  }

  li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
}

.pros {
  border-top: 4px solid @success-color;

  li::marker {
    color: @success-color;
  }
}

.cons {
  border-top: 4px solid @danger-color;

  li::marker {
    color: @danger-color;
  }
}

.footer {
  text-align: center;
  padding: 25px 0 10px;
  margin-top: 20px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-style: italic;
}
</style>
