<template>
  <div class="stream-container">
    <header class="header">
      <h1>JavaScript 流处理介绍</h1>
      <p>深入理解 ReadableStream 和 WritableStream 的强大功能</p>
    </header>

    <div class="content-grid">
      <!-- 概念部分 -->
      <section class="card concept">
        <div class="section-header">
          <div class="icon">🌊</div>
          <h2>流处理概念</h2>
        </div>
        <div class="content">
          <div class="stream-types">
            <div class="stream-type">
              <div class="stream-icon">📥</div>
              <h3>ReadableStream</h3>
              <p>表示可读取的数据流，用于处理来自文件、网络或其他来源的连续数据块</p>
            </div>
            <div class="stream-type">
              <div class="stream-icon">📤</div>
              <h3>WritableStream</h3>
              <p>表示可写入的数据流，用于将数据块写入文件、网络或其他目的地</p>
            </div>
          </div>

          <div class="analogy">
            <h3>流处理类比</h3>
            <div class="analogy-grid">
              <div class="analogy-item">
                <div class="analogy-icon">🚰</div>
                <div class="analogy-content">
                  <h4>水管系统</h4>
                  <p>数据像水流一样在管道中流动</p>
                </div>
              </div>
              <div class="analogy-item">
                <div class="analogy-icon">📦</div>
                <div class="analogy-content">
                  <h4>传送带</h4>
                  <p>数据块在传送带上逐步处理</p>
                </div>
              </div>
              <div class="analogy-item">
                <div class="analogy-icon">⏱️</div>
                <div class="analogy-content">
                  <h4>实时处理</h4>
                  <p>数据到达时立即处理，无需等待全部加载</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心作用 -->
      <section class="card purpose">
        <div class="section-header">
          <div class="icon">🎯</div>
          <h2>核心作用</h2>
        </div>
        <div class="content">
          <div class="purpose-grid">
            <div class="purpose-item">
              <div class="purpose-icon">⚡</div>
              <h3>高效内存管理</h3>
              <p>处理大文件无需加载到内存</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">🔄</div>
              <h3>实时数据处理</h3>
              <p>数据到达时立即处理</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">🔗</div>
              <h3>流式管道连接</h3>
              <p>连接多个处理步骤</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">⏱️</div>
              <h3>响应性提升</h3>
              <p>避免UI阻塞，提高用户体验</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础用法 -->
      <section class="card basic-usage">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>基础用法</h2>
        </div>
        <div class="content">
          <div class="usage-grid">
            <div class="usage-card">
              <h3>创建 ReadableStream</h3>
              <pre><code>const readableStream = new ReadableStream({
  start(controller) {
    // 初始化流
    controller.enqueue('数据块1');
    controller.enqueue('数据块2');
    controller.close(); // 结束流
  },
  pull(controller) {
    // 消费者请求数据时调用
  },
  cancel() {
    // 流被取消时清理
  }
});</code></pre>
            </div>

            <div class="usage-card">
              <h3>创建 WritableStream</h3>
              <pre><code>const writableStream = new WritableStream({
  write(chunk) {
    // 处理写入的数据块
    console.log('写入:', chunk);
  },
  close() {
    // 流关闭时执行
    console.log('写入完成');
  },
  abort(err) {
    // 发生错误时执行
    console.error('写入错误:', err);
  }
});</code></pre>
            </div>

            <div class="usage-card">
              <h3>读取流数据</h3>
              <pre><code>const reader = readableStream.getReader();
async function processStream() {
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log('读取:', value);
  }
  reader.releaseLock();
}
processStream();</code></pre>
            </div>

            <div class="usage-card">
              <h3>写入流数据</h3>
              <pre><code>const writer = writableStream.getWriter();
async function writeData() {
  await writer.write('数据块A');
  await writer.write('数据块B');
  await writer.close(); // 完成写入
}
writeData();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 管道连接 -->
      <section class="card pipe">
        <div class="section-header">
          <div class="icon">🔗</div>
          <h2>管道连接</h2>
        </div>
        <div class="content">
          <div class="pipe-explanation">
            <p>使用 <code>pipeThrough()</code> 和 <code>pipeTo()</code> 方法连接流处理管道</p>

            <div class="pipe-visual">
              <div class="pipe-stage">ReadableStream</div>
              <div class="pipe-arrow">→</div>
              <div class="pipe-stage">TransformStream</div>
              <div class="pipe-arrow">→</div>
              <div class="pipe-stage">WritableStream</div>
            </div>
          </div>

          <div class="pipe-examples">
            <div class="pipe-example">
              <h3>简单管道连接</h3>
              <pre><code>// 创建转换流（如文本大写转换）
const transformStream = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

// 连接管道
readableStream
  .pipeThrough(transformStream)
  .pipeTo(writableStream);</code></pre>
            </div>

            <div class="pipe-example">
              <h3>复杂管道处理</h3>
              <pre><code>// 获取数据流
fetch('https://api.example.com/data')
  .then(response => response.body)
  // 解压缩
  .pipeThrough(new DecompressionStream('gzip'))
  // 转换为JSON
  .pipeThrough(transformToJSON())
  // 过滤数据
  .pipeThrough(filterData())
  // 写入文件
  .pipeTo(fileWritableStream);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 底层原理 -->
      <section class="card mechanism">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>底层原理</h2>
        </div>
        <div class="content">
          <div class="mechanism-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>背压机制</h3>
                <p>当消费者处理速度慢于生产者时，流会自动暂停数据生产，防止内存溢出</p>
                <div class="backpressure">
                  <div class="producer">生产者</div>
                  <div class="buffer">缓冲区</div>
                  <div class="consumer">消费者</div>
                  <div class="signal">背压信号</div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>队列模型</h3>
                <p>数据块在内部队列中存储，按照先进先出原则处理</p>
                <div class="queue-visual">
                  <div class="queue-item">块1</div>
                  <div class="queue-item">块2</div>
                  <div class="queue-item">块3</div>
                  <div class="queue-item">块4</div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>控制器API</h3>
                <p>通过控制器对象管理流状态：</p>
                <ul>
                  <li><code>controller.enqueue()</code> - 添加数据到队列</li>
                  <li><code>controller.close()</code> - 关闭流</li>
                  <li><code>controller.error()</code> - 报告错误</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card scenarios">
        <div class="section-header">
          <div class="icon">📋</div>
          <h2>使用场景</h2>
        </div>
        <div class="content">
          <div class="scenario-grid">
            <div class="scenario">
              <div class="scenario-icon">1</div>
              <h3>大文件处理</h3>
              <p>逐块读取和处理大文件，避免内存溢出</p>
              <pre><code>const fileStream = file.stream();
const processedStream = fileStream.pipeThrough(processChunk);
await processedStream.pipeTo(writable);</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">2</div>
              <h3>实时视频流</h3>
              <p>处理来自摄像头的实时视频帧</p>
              <pre><code>const videoStream = camera.captureStream();
videoStream
  .pipeThrough(processFrame)
  .pipeTo(recorder);</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">3</div>
              <h3>数据流转换</h3>
              <p>在数据流传输过程中进行转换</p>
              <pre><code>fetch(url)
  .then(res => res.body)
  .pipeThrough(transformStream)
  .pipeTo(writable);</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">4</div>
              <h3>实时日志</h3>
              <p>将服务器日志实时传输到客户端</p>
              <pre><code>// 服务器端
const logStream = new ReadableStream({...});
// 客户端
logStream.pipeTo(clientWritable);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="card pros-cons">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>优缺点对比</h2>
        </div>
        <div class="content">
          <div class="comparison">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li><span class="highlight">高效内存使用</span> - 处理大文件无需完整加载</li>
                <li><span class="highlight">实时处理能力</span> - 数据到达时立即处理</li>
                <li><span class="highlight">组合性强</span> - 易于创建处理管道</li>
                <li><span class="highlight">标准化API</span> - 浏览器原生支持</li>
                <li><span class="highlight">背压控制</span> - 自动防止数据过载</li>
              </ul>
            </div>

            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li><span class="highlight">学习曲线陡峭</span> - 概念较复杂</li>
                <li><span class="highlight">错误处理复杂</span> - 需要处理多个错误点</li>
                <li><span class="highlight">调试困难</span> - 流状态难以跟踪</li>
                <li><span class="highlight">浏览器兼容性</span> - 旧浏览器不支持</li>
                <li><span class="highlight">取消机制复杂</span> - 需要手动实现取消逻辑</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="summary">
        <h3>关键要点</h3>
        <p>
          ReadableStream 和 WritableStream
          提供了处理大型或实时数据的高效机制。通过流式处理，可以显著减少内存占用，提高应用响应性，并构建复杂的数据处理管道。
        </p>
      </div>
      <div class="copyright">JavaScript 流处理 API | 现代 Web 开发的核心技术</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑为空，仅用于展示
</script>

<style lang="less" scoped>
.stream-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 32px;
  padding: 28px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.4rem;
    margin: 0 0 12px;
    color: #1e40af;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #4b5563;
    margin: 0;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .icon {
    font-size: 1.8rem;
    margin-right: 16px;
    color: #3b82f6;
  }

  h2 {
    font-size: 1.6rem;
    margin: 0;
    color: #1e40af;
    border-bottom: 2px solid #dbeafe;
    padding-bottom: 8px;
  }
}

/* 概念部分样式 */
.concept {
  .stream-types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .stream-type {
    background: #f0f9ff;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid #dbeafe;

    .stream-icon {
      font-size: 2.5rem;
      margin-bottom: 16px;
      color: #3b82f6;
    }

    h3 {
      font-size: 1.3rem;
      margin: 0 0 12px;
      color: #1e40af;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }

  .analogy {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .analogy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .analogy-item {
      display: flex;
      align-items: center;
      background: #f8fafc;
      border-radius: 12px;
      padding: 16px;
      border: 1px solid #e2e8f0;

      .analogy-icon {
        font-size: 1.8rem;
        margin-right: 16px;
        color: #3b82f6;
        min-width: 40px;
      }

      h4 {
        margin: 0 0 6px;
        font-size: 1.1rem;
        color: #1e40af;
      }

      p {
        margin: 0;
        color: #4b5563;
        font-size: 0.9rem;
      }
    }
  }
}

/* 作用部分样式 */
.purpose {
  .purpose-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .purpose-item {
    background: #f0fdf4;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid #bbf7d0;

    .purpose-icon {
      font-size: 2rem;
      margin-bottom: 12px;
      color: #10b981;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 8px;
      color: #065f46;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 基础用法样式 */
.basic-usage {
  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .usage-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
  }
}

/* 管道连接样式 */
.pipe {
  .pipe-explanation {
    margin-bottom: 24px;

    p {
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
  }

  .pipe-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    flex-wrap: wrap;

    .pipe-stage {
      background: #dbeafe;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 500;
      margin: 0 10px;
      min-width: 160px;
      text-align: center;
    }

    .pipe-arrow {
      font-size: 1.5rem;
      color: #93c5fd;
      font-weight: bold;
    }
  }

  .pipe-examples {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pipe-example {
    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
    }
  }
}

/* 底层原理样式 */
.mechanism {
  .mechanism-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .step {
    display: flex;
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    .step-number {
      width: 36px;
      height: 36px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 16px;
      flex-shrink: 0;
    }

    .step-content {
      h3 {
        font-size: 1.3rem;
        margin: 0 0 12px;
        color: #1e40af;
      }

      p {
        margin: 0 0 16px;
        color: #4b5563;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 8px;
          color: #4b5563;
        }
      }
    }

    .backpressure {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 8px;
      text-align: center;
      margin-top: 16px;

      div {
        padding: 8px;
        background: #f0f9ff;
        border-radius: 8px;
        font-size: 0.9rem;
      }

      .signal {
        grid-column: span 4;
        background: #fee2e2;
      }
    }

    .queue-visual {
      display: flex;
      gap: 8px;
      margin-top: 16px;

      .queue-item {
        flex: 1;
        background: #dbeafe;
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
      }
    }
  }
}

/* 使用场景样式 */
.scenarios {
  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .scenario {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    position: relative;

    .scenario-icon {
      position: absolute;
      top: -12px;
      left: -12px;
      width: 30px;
      height: 30px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 12px;
      color: #1e40af;
    }

    p {
      margin: 0 0 16px;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 优缺点样式 */
.pros-cons {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
    }

    ul {
      padding-left: 20px;
      margin: 0;
    }

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 10px;
    }

    .highlight {
      font-weight: 600;
      color: #1e40af;
      display: inline-block;
      margin-right: 4px;
    }
  }

  .pros {
    h3 {
      color: #065f46;
      border-color: #bbf7d0;
    }

    .highlight {
      color: #065f46;
    }
  }

  .cons {
    h3 {
      color: #b91c1c;
      border-color: #fecaca;
    }

    .highlight {
      color: #b91c1c;
    }
  }
}

/* 代码块通用样式 */
pre {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 16px;

  code {
    color: #cbd5e1;
  }
}

/* 页脚样式 */
.footer {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  text-align: center;

  .summary {
    max-width: 800px;
    margin: 0 auto 20px;

    h3 {
      font-size: 1.4rem;
      margin: 0 0 16px;
      color: #2563eb;
    }

    p {
      font-size: 1.1rem;
      color: #4b5563;
      margin: 0;
      line-height: 1.7;
    }
  }

  .copyright {
    font-size: 0.95rem;
    color: #64748b;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
  }
}
</style>
