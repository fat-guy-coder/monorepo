<template>
  <div class="worker-guide">
    <h2 class="guide-title">Web Worker 性能优化方案</h2>

    <section class="section">
      <h3 class="section-title">📌 核心概念</h3>
      <p class="section-content">
        Web Worker 允许在后台线程运行脚本，独立于主线程执行，避免阻塞UI渲染。
        通过消息机制与主线程通信，适合处理CPU密集型任务。
      </p>
    </section>

    <section class="section">
      <h3 class="section-title">🛠️ 基础实现</h3>
      <pre class="code-block"><code>// 1. 创建Worker实例
const worker = new Worker('/path/to/worker.js')

// 2. 主线程发送消息
worker.postMessage({ task: 'calculate', data: payload })

// 3. 接收处理结果
worker.onmessage = (e) => {
  console.log('Result:', e.data)
}

// 4. 错误处理
worker.onerror = (error) => {
  console.error('Worker error:', error)
}

// 5. 组件卸载时终止
onUnmounted(() => worker.terminate())</code></pre>
    </section>

    <div class="columns">
      <section class="section pros">
        <h3 class="section-title">✅ 优势</h3>
        <ul class="feature-list">
          <li><span class="highlight">解放主线程</span> - 避免UI卡顿</li>
          <li><span class="highlight">并行计算</span> - 充分利用多核CPU</li>
          <li><span class="highlight">隔离环境</span> - 不共享作用域更安全</li>
        </ul>
      </section>

      <section class="section cons">
        <h3 class="section-title">❌ 局限</h3>
        <ul class="feature-list">
          <li><span class="highlight">通信成本</span> - 消息序列化开销</li>
          <li><span class="highlight">功能限制</span> - 无法访问DOM/BOM</li>
          <li><span class="highlight">启动延迟</span> - 初始化需要时间</li>
        </ul>
      </section>
    </div>

    <section class="section">
      <h3 class="section-title">💡 典型场景</h3>
      <div class="scenario-grid">
        <div class="scenario-card">
          <div class="scenario-icon">📊</div>
          <h4>大数据处理</h4>
          <p>CSV/JSON解析、数据聚合分析</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🖼️</div>
          <h4>图像处理</h4>
          <p>Canvas像素操作、滤镜应用</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🔢</div>
          <h4>复杂计算</h4>
          <p>加密解密、物理模拟</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">⏱️</div>
          <h4>实时处理</h4>
          <p>音频分析、视频解码</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 类型安全的Worker消息接口
interface WorkerMessage {
  type: string;
  payload?: any;
  error?: string;
}
</script>

<style lang="less" scoped>
.worker-guide {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.guide-title {
  text-align: center;
  color: #4a5568;
  margin-bottom: 2.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: #4299e1;
    margin: 1rem auto 0;
    border-radius: 2px;
  }
}

.section {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &-title {
    color: #4a5568;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &-content {
    line-height: 1.6;
    color: #4a5568;
  }
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros {
  border-top: 4px solid #48bb78;
}

.cons {
  border-top: 4px solid #f56565;
}

.feature-list {
  padding-left: 1.2rem;

  li {
    margin-bottom: 0.8rem;
    line-height: 1.5;
  }
}

.highlight {
  font-weight: 600;
  color: #2b6cb0;
}

.code-block {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 4px solid #4299e1;

  code {
    color: #4a5568;
    white-space: pre;
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
}

.scenario-card {
  background: #f8fafc;
  padding: 1.2rem;
  border-radius: 0.5rem;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  h4 {
    margin: 0.8rem 0 0.4rem;
    color: #2d3748;
  }

  p {
    color: #718096;
    font-size: 0.9rem;
    margin: 0;
  }
}

.scenario-icon {
  font-size: 2rem;
  line-height: 1;
}
</style>