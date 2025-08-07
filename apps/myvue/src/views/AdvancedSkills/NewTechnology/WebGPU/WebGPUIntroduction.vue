<template>
  <div class="webgpu-guide">
    <header>
      <h1>WebGPU：下一代Web图形技术</h1>
      <p>解锁高性能图形计算的新标准</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">10-100x</div>
          <div class="stat-label">性能提升</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">2023</div>
          <div class="stat-label">主流浏览器支持</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 概述部分 -->
      <div class="section">
        <h2>📌 WebGPU 概述</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>什么是WebGPU？</h3>
            <p>WebGPU是下一代Web图形API，提供对GPU硬件的底层访问，旨在替代WebGL。它提供了更现代的GPU功能访问方式，支持计算着色器和图形渲染。</p>
          </div>
          <div class="overview-card">
            <h3>为什么需要WebGPU？</h3>
            <ul>
              <li>WebGL基于OpenGL ES 2.0，已无法满足现代GPU需求</li>
              <li>提供更高效的CPU/GPU并行处理能力</li>
              <li>支持现代GPU特性（如计算着色器）</li>
              <li>减少驱动开销，提高性能</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>核心优势</h3>
            <div class="advantages">
              <div class="advantage">高性能</div>
              <div class="advantage">多线程支持</div>
              <div class="advantage">类型安全</div>
              <div class="advantage">跨平台</div>
              <div class="advantage">现代GPU特性</div>
              <div class="advantage">计算能力</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心概念 -->
      <div class="section">
        <h2>🧠 WebGPU 核心概念</h2>
        <div class="concepts-grid">
          <div class="concept-card">
            <h3>适配器 (Adapter)</h3>
            <p>代表物理GPU设备及其能力，用于获取GPU设备实例。</p>
            <pre class="code-block">const adapter = await navigator.gpu.requestAdapter();</pre>
          </div>
          <div class="concept-card">
            <h3>设备 (Device)</h3>
            <p>逻辑GPU设备实例，用于创建资源和处理命令。</p>
            <pre class="code-block">const device = await adapter.requestDevice();</pre>
          </div>
          <div class="concept-card">
            <h3>命令编码器 (CommandEncoder)</h3>
            <p>记录GPU命令序列，最终提交到命令队列执行。</p>
            <pre class="code-block">const encoder = device.createCommandEncoder();</pre>
          </div>
          <div class="concept-card">
            <h3>管线 (Pipeline)</h3>
            <p>定义GPU如何执行工作，包括渲染管线和计算管线。</p>
            <pre class="code-block">const pipeline = device.createComputePipeline({...});</pre>
          </div>
          <div class="concept-card">
            <h3>着色器 (Shader)</h3>
            <p>在GPU上运行的程序，使用WGSL语言编写。</p>
            <pre class="code-block">@compute @workgroup_size(64)
fn main() { /* ... */ }</pre>
          </div>
          <div class="concept-card">
            <h3>绑定组 (BindGroup)</h3>
            <p>将资源（缓冲区、纹理）绑定到着色器。</p>
            <pre class="code-block">const bindGroup = device.createBindGroup({...});</pre>
          </div>
        </div>
      </div>

      <!-- 使用示例 -->
      <div class="section">
        <h2>💻 WebGPU 基础使用</h2>
        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>初始化WebGPU</h3>
              <pre class="code-block">async function initWebGPU() {
  // 检查浏览器支持
  if (!navigator.gpu) throw "WebGPU not supported";

  // 获取适配器和设备
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  // 获取Canvas上下文
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('webgpu');

  // 配置Canvas格式
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({ device, format });

  return { device, context, format };
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建计算着色器</h3>
              <pre class="code-block">const shaderCode = `
@group(0) @binding(0) var&lt;storage, read_write&gt; data: array&lt;f32&gt;;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) id: vec3&lt;u32&gt;) {
  let index = id.x;
  data[index] = data[index] * 2.0;
}`;</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>设置计算管线</h3>
              <pre class="code-block">async function setupComputePipeline(device) {
  // 创建着色器模块
  const shaderModule = device.createShaderModule({
    code: shaderCode
  });

  // 创建计算管线
  const computePipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
      module: shaderModule,
      entryPoint: 'main'
    }
  });

  // 创建数据缓冲区
  const bufferSize = 1024 * Float32Array.BYTES_PER_ELEMENT;
  const outputBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  // 创建绑定组
  const bindGroup = device.createBindGroup({
    layout: computePipeline.getBindGroupLayout(0),
    entries: [{
      binding: 0,
      resource: { buffer: outputBuffer }
    }]
  });

  return { computePipeline, outputBuffer, bindGroup };
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>执行计算任务</h3>
              <pre class="code-block">async function runCompute(device, pipeline, bindGroup) {
  // 创建命令编码器
  const encoder = device.createCommandEncoder();

  // 开始计算通道
  const pass = encoder.beginComputePass();
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.dispatchWorkgroups(16); // 1024元素 / 64工作组大小
  pass.end();

  // 提交命令
  const commandBuffer = encoder.finish();
  device.queue.submit([commandBuffer]);
}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="section">
        <h2>🚀 WebGPU 使用场景</h2>
        <div class="scenarios-grid">
          <div class="scenario-card">
            <h3>高性能图形渲染</h3>
            <ul>
              <li>复杂3D场景渲染</li>
              <li>实时光线追踪</li>
              <li>物理模拟可视化</li>
              <li>高帧率游戏</li>
            </ul>
          </div>
          <div class="scenario-card">
            <h3>GPU计算</h3>
            <ul>
              <li>大规模数据处理</li>
              <li>科学计算模拟</li>
              <li>机器学习推理</li>
              <li>密码学运算</li>
            </ul>
          </div>
          <div class="scenario-card">
            <h3>媒体处理</h3>
            <ul>
              <li>实时视频特效</li>
              <li>图像/视频编码</li>
              <li>实时视频分析</li>
              <li>AR/VR处理</li>
            </ul>
          </div>
          <div class="scenario-card">
            <h3>专业应用</h3>
            <ul>
              <li>CAD/CAE应用</li>
              <li>数据可视化</li>
              <li>医学成像</li>
              <li>地理信息系统</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 与WebGL对比 -->
      <div class="section">
        <h2>🆚 WebGPU vs WebGL</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>WebGPU</th>
                <th>WebGL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>API设计</td>
                <td>现代、显式、低级控制</td>
                <td>传统、隐式、高级抽象</td>
              </tr>
              <tr>
                <td>性能</td>
                <td>接近原生，低开销</td>
                <td>较高开销</td>
              </tr>
              <tr>
                <td>多线程</td>
                <td>原生支持</td>
                <td>有限支持</td>
              </tr>
              <tr>
                <td>计算着色器</td>
                <td>原生支持</td>
                <td>无原生支持</td>
              </tr>
              <tr>
                <td>着色语言</td>
                <td>WGSL（类型安全）</td>
                <td>GLSL</td>
              </tr>
              <tr>
                <td>内存管理</td>
                <td>显式控制</td>
                <td>隐式管理</td>
              </tr>
              <tr>
                <td>浏览器支持</td>
                <td>Chrome 113+, Edge 113+, Firefox Nightly</td>
                <td>广泛支持</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 学习资源 -->
      <div class="section">
        <h2>📚 WebGPU 学习资源</h2>
        <div class="resources-grid">
          <div class="resource-card">
            <h3>官方文档</h3>
            <ul>
              <li>WebGPU W3C规范</li>
              <li>MDN WebGPU文档</li>
              <li>Chrome WebGPU文档</li>
            </ul>
          </div>
          <div class="resource-card">
            <h3>教程与示例</h3>
            <ul>
              <li>WebGPU Fundamentals</li>
              <li>Google WebGPU Samples</li>
              <li>WebGPU.rocks</li>
            </ul>
          </div>
          <div class="resource-card">
            <h3>开发工具</h3>
            <ul>
              <li>WebGPU DevTools (Chrome)</li>
              <li>WGSL语言支持 (VSCode)</li>
              <li>WebGPU Inspector</li>
            </ul>
          </div>
          <div class="resource-card">
            <h3>框架与库</h3>
            <ul>
              <li>Three.js (WebGPU支持)</li>
              <li>Babylon.js (WebGPU后端)</li>
              <li>wgpu (Rust实现)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>WebGPU技术指南 © 2023 | 使用Vue3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 本组件为纯展示型组件，无需响应式数据
</script>

<style lang="less" scoped>


.webgpu-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;

      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 15px 25px;
        min-width: 120px;

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.8rem;
      color: #4361ee;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #4361ee;
        border-radius: 3px;
      }
    }
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;

    .overview-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p,
      ul {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.6;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          position: relative;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .advantages {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;

        .advantage {
          background: #eef2ff;
          color: #4361ee;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }
    }
  }

  .concepts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .concept-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      }

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #475569;
        margin-bottom: 15px;
        line-height: 1.5;
      }
    }
  }

  .usage-steps {
    display: flex;
    flex-direction: column;
    gap: 25px;

    .step {
      display: flex;
      gap: 20px;

      .step-number {
        background: #4361ee;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        flex-shrink: 0;
        margin-top: 5px;
      }

      .step-content {
        flex-grow: 1;

        h3 {
          font-size: 1.3rem;
          color: #3a0ca3;
          margin-top: 0;
          margin-bottom: 15px;
        }
      }
    }
  }

  .scenarios-grid,
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .scenario-card,
    .resource-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      border-top: 3px solid #4361ee;

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          position: relative;
          font-size: 0.95rem;
          color: #475569;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }
    }
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      overflow: hidden;

      th,
      td {
        padding: 16px 20px;
        text-align: left;
        border-bottom: 1px solid #eee;
        font-size: 0.95rem;
      }

      thead {
        background: linear-gradient(to right, #4361ee, #3a0ca3);
        color: white;

        th {
          font-weight: 600;
        }
      }

      tbody {
        tr {
          &:nth-child(even) {
            background-color: #f9f9f9;
          }

          &:hover {
            background-color: #f0f4ff;
          }
        }
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #64748b;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }

  @media (max-width: 768px) {
    header {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }

      .stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }

    .step {
      flex-direction: column;
      gap: 10px;

      .step-number {
        margin-top: 0;
      }
    }
  }
}
</style>
