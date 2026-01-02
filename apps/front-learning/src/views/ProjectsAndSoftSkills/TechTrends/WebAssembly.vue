<template>
  <div class="wasm-container">
    <div class="header">
      <h1><i class="icon icon-wasm"></i> WebAssembly 技术基本介绍</h1>
      <p>下一代Web高性能计算解决方案 <a href="https://developer.mozilla.org/zh-CN/docs/WebAssembly/Guides/Concepts"
          target="_blank">MDN</a></p>
    </div>

    <div class="content-grid">
      <!-- 介绍部分 -->
      <div class="section-card intro-card">
        <div class="card-header">
          <i class="icon icon-info"></i>
          <h2>WebAssembly 介绍</h2>
        </div>
        <div class="card-content">
          <div class="info-box">
            <div class="info-item">
              <div class="icon-box">
                <i class="icon icon-binary"></i>
              </div>
              <div>
                <h3>二进制指令格式</h3>
                <p>Wasm是一种低级的类汇编语言，具有紧凑的二进制格式</p>
              </div>
            </div>

            <div class="info-item">
              <div class="icon-box">
                <i class="icon icon-speed"></i>
              </div>
              <div>
                <h3>接近原生性能</h3>
                <p>执行速度比JavaScript快，接近原生代码性能</p>
              </div>
            </div>

            <div class="info-item">
              <div class="icon-box">
                <i class="icon icon-sandbox"></i>
              </div>
              <div>
                <h3>安全沙箱环境</h3>
                <p>在内存安全的沙箱环境中运行，防止恶意行为</p>
              </div>
            </div>
          </div>

          <div class="wasm-timeline">
            <div class="timeline-item">
              <div class="timeline-year">2015</div>
              <div class="timeline-content">WebAssembly项目启动</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2017</div>
              <div class="timeline-content">四大浏览器完成初步实现</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2019</div>
              <div class="timeline-content">成为W3C官方标准</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2022</div>
              <div class="timeline-content">线程和SIMD支持成为标准</div>
            </div>
          </div>

          <div class="comparison-chart">
            <div class="chart-row">
              <div class="chart-label">JavaScript</div>
              <div class="chart-bar js-bar" style="width: 70%">
                <div class="bar-value">70%</div>
              </div>
            </div>
            <div class="chart-row">
              <div class="chart-label">WebAssembly</div>
              <div class="chart-bar wasm-bar" style="width: 95%">
                <div class="bar-value">95%</div>
              </div>
            </div>
            <div class="chart-row">
              <div class="chart-label">原生代码(C++)</div>
              <div class="chart-bar native-bar" style="width: 100%">
                <div class="bar-value">100%</div>
              </div>
            </div>
            <div class="chart-note">基于典型计算密集型任务的相对性能</div>
          </div>
        </div>
      </div>

      <!-- 如何使用 -->
      <div class="section-card">
        <div class="card-header">
          <i class="icon icon-code"></i>
          <h2>如何使用 WebAssembly</h2>
        </div>
        <div class="card-content">
          <h3 class="subtitle">基本工作流程</h3>
          <div class="process-steps">
            <div class="step">
              <div class="step-icon">1</div>
              <div class="step-content">
                <h4>编写源代码</h4>
                <p>使用C/C++/Rust等语言编写程序</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">2</div>
              <div class="step-content">
                <h4>编译为Wasm</h4>
                <p>使用Emscripten或Rust编译器生成.wasm文件</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">3</div>
              <div class="step-content">
                <h4>加载到浏览器</h4>
                <p>使用JavaScript API加载和实例化Wasm模块</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">4</div>
              <div class="step-content">
                <h4>与JS交互</h4>
                <p>通过导入/导出函数与JavaScript通信</p>
              </div>
            </div>
          </div>

          <h3 class="subtitle">代码示例</h3>
          <div class="code-tabs">
            <div class="tab-header">
              <div :class="['tab-item', { active: activeTab === 'c' }]" @click="activeTab = 'c'">
                C 代码
              </div>
              <div :class="['tab-item', { active: activeTab === 'rust' }]" @click="activeTab = 'rust'">
                Rust 代码
              </div>
              <div :class="['tab-item', { active: activeTab === 'js' }]" @click="activeTab = 'js'">
                JS 加载代码
              </div>
            </div>
            <div class="tab-content">
              <pre v-if="activeTab === 'c'"><code>// 使用C编写斐波那契函数
#include &lt;emscripten.h&gt;

EMSCRIPTEN_KEEPALIVE
int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}</code></pre>
              <pre v-if="activeTab === 'rust'"><code>// 使用Rust编写斐波那契函数
#[no_mangle]
pub extern "C" fn fibonacci(n: i32) -> i32 {
  match n {
    0 => 0,
    1 => 1,
    _ => fibonacci(n - 1) + fibonacci(n - 2)
  }
}</code></pre>
              <pre v-if="activeTab === 'js'"><code>// 在JavaScript中加载和使用Wasm
async function loadWasm() {
  const response = await fetch('fibonacci.wasm');
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);

  // 调用Wasm函数
  const result = instance.exports.fibonacci(10);
  console.log('Fibonacci(10) =', result);
}

loadWasm();</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="section-card">
        <div class="card-header">
          <i class="icon icon-apps"></i>
          <h2>使用场景</h2>
        </div>
        <div class="card-content">
          <div class="use-cases">
            <div class="use-case">
              <div class="case-icon">
                <i class="icon icon-game"></i>
              </div>
              <h3>游戏开发</h3>
              <p>高性能游戏引擎和物理模拟</p>
            </div>
            <div class="use-case">
              <div class="case-icon">
                <i class="icon icon-video"></i>
              </div>
              <h3>音视频处理</h3>
              <p>实时音视频编解码和处理</p>
            </div>
            <div class="use-case">
              <div class="case-icon">
                <i class="icon icon-ai"></i>
              </div>
              <h3>AI与机器学习</h3>
              <p>浏览器内运行机器学习模型</p>
            </div>
            <div class="use-case">
              <div class="case-icon">
                <i class="icon icon-cad"></i>
              </div>
              <h3>CAD应用程序</h3>
              <p>复杂的3D建模和渲染</p>
            </div>
            <div class="use-case">
              <div class="case-icon">
                <i class="icon icon-crypto"></i>
              </div>
              <h3>加密计算</h3>
              <p>高性能加密解密操作</p>
            </div>
            <div class="use-case">
              <div class="case-icon">
                <i class="icon icon-science"></i>
              </div>
              <h3>科学计算</h3>
              <p>复杂数学计算和模拟</p>
            </div>
          </div>

          <div class="case-studies">
            <h3 class="subtitle">成功案例</h3>
            <div class="study">
              <div class="company-logo">A</div>
              <div>
                <h4>AutoCAD Web</h4>
                <p>使用WebAssembly将桌面级CAD应用带入浏览器，性能提升3-4倍</p>
              </div>
            </div>
            <div class="study">
              <div class="company-logo">F</div>
              <div>
                <h4>Figma</h4>
                <p>核心编辑器使用Wasm，实现复杂设计工具的Web化</p>
              </div>
            </div>
            <div class="study">
              <div class="company-logo">P</div>
              <div>
                <h4>Photoshop Web</h4>
                <p>图像处理核心使用Wasm，接近桌面版性能</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优缺点 -->
      <div class="section-card">
        <div class="card-header">
          <i class="icon icon-pros-cons"></i>
          <h2>优点与缺点</h2>
        </div>
        <div class="card-content">
          <div class="pros-cons-grid">
            <div class="pros">
              <h3><i class="icon icon-check"></i> 优势</h3>
              <ul>
                <li>
                  <i class="icon icon-speed"></i>
                  <div>
                    <strong>高性能</strong>
                    <p>执行速度接近原生代码，比JavaScript快2-10倍</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-language"></i>
                  <div>
                    <strong>多语言支持</strong>
                    <p>支持C/C++/Rust/Zig等语言，复用现有代码库</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-security"></i>
                  <div>
                    <strong>内存安全</strong>
                    <p>线性内存模型和沙箱环境提供安全保障</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-size"></i>
                  <div>
                    <strong>紧凑格式</strong>
                    <p>二进制格式比文本JavaScript更小，加载更快</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-parallel"></i>
                  <div>
                    <strong>并行计算</strong>
                    <p>支持多线程和SIMD指令，充分利用CPU能力</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="cons">
              <h3><i class="icon icon-warning"></i> 挑战</h3>
              <ul>
                <li>
                  <i class="icon icon-dom"></i>
                  <div>
                    <strong>DOM访问限制</strong>
                    <p>不能直接操作DOM，需通过JavaScript代理</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-debug"></i>
                  <div>
                    <strong>调试困难</strong>
                    <p>调试工具不如JavaScript成熟，需要源映射</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-gc"></i>
                  <div>
                    <strong>垃圾回收</strong>
                    <p>需要手动管理内存，或通过JavaScript交互</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-startup"></i>
                  <div>
                    <strong>启动延迟</strong>
                    <p>大型模块编译和实例化可能造成延迟</p>
                  </div>
                </li>
                <li>
                  <i class="icon icon-learning"></i>
                  <div>
                    <strong>学习曲线</strong>
                    <p>需要理解低级概念和编译工具链</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="recommendation">
            <h3><i class="icon icon-lightbulb"></i> 使用建议</h3>
            <p>WebAssembly最适合计算密集型任务：</p>
            <ul>
              <li>当JavaScript性能成为瓶颈时</li>
              <li>需要重用C++/Rust编写的现有库</li>
              <li>需要确保一致的性能表现</li>
              <li>处理大量数据或复杂计算</li>
              <li>需要沙箱隔离的安全敏感应用</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 生态系统 -->
      <div class="section-card">
        <div class="card-header">
          <i class="icon icon-ecosystem"></i>
          <h2>生态系统</h2>
        </div>
        <div class="card-content">
          <h3 class="subtitle">工具链</h3>
          <div class="tools">
            <div class="tool">
              <div class="tool-icon">E</div>
              <div>
                <h4>Emscripten</h4>
                <p>C/C++到Wasm的完整编译工具链</p>
              </div>
            </div>
            <div class="tool">
              <div class="tool-icon">R</div>
              <div>
                <h4>Rust WASM</h4>
                <p>Rust官方Wasm支持，提供wasm-bindgen等工具</p>
              </div>
            </div>
            <div class="tool">
              <div class="tool-icon">A</div>
              <div>
                <h4>AssemblyScript</h4>
                <p>TypeScript语法编译到Wasm</p>
              </div>
            </div>
          </div>

          <h3 class="subtitle">运行时环境</h3>
          <div class="runtimes">
            <div class="runtime">
              <i class="icon icon-browser"></i>
              <span>浏览器</span>
            </div>
            <div class="runtime">
              <i class="icon icon-node"></i>
              <span>Node.js</span>
            </div>
            <div class="runtime">
              <i class="icon icon-server"></i>
              <span>Serverless</span>
            </div>
            <div class="runtime">
              <i class="icon icon-edge"></i>
              <span>边缘计算</span>
            </div>
            <div class="runtime">
              <i class="icon icon-blockchain"></i>
              <span>区块链</span>
            </div>
          </div>

          <h3 class="subtitle">框架支持</h3>
          <div class="frameworks">
            <div class="framework">
              <div class="framework-logo">R</div>
              <div>React</div>
            </div>
            <div class="framework">
              <div class="framework-logo">V</div>
              <div>Vue.js</div>
            </div>
            <div class="framework">
              <div class="framework-logo">A</div>
              <div>Angular</div>
            </div>
            <div class="framework">
              <div class="framework-logo">S</div>
              <div>Svelte</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>WebAssembly是W3C官方标准 | 了解更多:
        <a href="https://webassembly.org" target="_blank">webassembly.org</a> |
        <a href="https://developer.mozilla.org/zh-CN/docs/WebAssembly" target="_blank">MDN文档</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('c');
</script>

<style lang="less" scoped>
@primary-color: #654ff0;
@secondary-color: #6a11cb;
@text-color: #2d3748;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@success-color: #4cc9f0;
@warning-color: #f72585;
@muted-color: #718096;

.wasm-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: @text-color;
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, @primary-color 0%, @secondary-color 100%);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      color: white;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    p {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.85);
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 1.8rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .section-card {
    background: @card-bg;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.intro-card {
      grid-column: 1 / -1;
    }
  }

  .card-header {
    background: linear-gradient(135deg, @primary-color 0%, lighten(@primary-color, 5%) 100%);
    padding: 1.2rem 1.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
  }

  .card-content {
    padding: 1.8rem;

    .subtitle {
      font-size: 1.3rem;
      color: @primary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @border-color;
    }
  }

  .info-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .info-item {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;

    .icon-box {
      width: 50px;
      height: 50px;
      background: lighten(@primary-color, 45%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0;
      color: @muted-color;
      line-height: 1.6;
    }
  }

  .wasm-timeline {
    margin: 2rem 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 30px;
      width: 4px;
      background: @primary-color;
      border-radius: 2px;
    }
  }

  .timeline-item {
    display: flex;
    margin-bottom: 1.5rem;
    position: relative;
    padding-left: 60px;

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: '';
      position: absolute;
      left: 26px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: @card-bg;
      border: 4px solid @primary-color;
      z-index: 1;
    }
  }

  .timeline-year {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    text-align: center;
    font-weight: bold;
    color: @primary-color;
    background: @card-bg;
    padding: 0.3rem;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .timeline-content {
    background: lighten(@primary-color, 48%);
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    border-left: 3px solid @primary-color;
  }

  .comparison-chart {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid @border-color;
    margin-top: 1.5rem;
  }

  .chart-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .chart-label {
    width: 150px;
    font-weight: 500;
  }

  .chart-bar {
    height: 30px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;

    .bar-value {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
    }
  }

  .js-bar {
    background: linear-gradient(90deg, #f0db4f, #f0b23f);
  }

  .wasm-bar {
    background: linear-gradient(90deg, #654ff0, #4169e1);
  }

  .native-bar {
    background: linear-gradient(90deg, #4cc9f0, #3a86ff);
  }

  .chart-note {
    text-align: center;
    font-size: 0.9rem;
    color: @muted-color;
    margin-top: 1rem;
  }

  .process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2rem;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .step-icon {
    width: 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
  }

  .step-content {
    h4 {
      margin-top: 0;
      margin-bottom: 0.4rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0;
      color: @muted-color;
      font-size: 0.9rem;
    }
  }

  .code-tabs {
    border: 1px solid @border-color;
    border-radius: 12px;
    overflow: hidden;
  }

  .tab-header {
    display: flex;
    background: lighten(@primary-color, 45%);
    border-bottom: 1px solid @border-color;
  }

  .tab-item {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    color: @muted-color;
    transition: all 0.2s ease;

    &.active {
      background: @card-bg;
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
    }

    &:hover:not(.active) {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  .tab-content {
    background: @card-bg;
    padding: 1.5rem;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: darken(@primary-color, 15%);
    }

    code {
      display: block;
      white-space: pre-wrap;
    }
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .use-case {
    text-align: center;
    padding: 1.2rem;
    background: lighten(@primary-color, 50%);
    border-radius: 12px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    }

    .case-icon {
      width: 60px;
      height: 60px;
      background: @card-bg;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.8rem;
      color: @primary-color;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0;
      color: @muted-color;
      font-size: 0.9rem;
    }
  }

  .case-studies {
    background: lighten(@primary-color, 53%);
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid @primary-color;
  }

  .study {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.2rem;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }

    .company-logo {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }

    h4 {
      margin: 0 0 0.3rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0;
      color: @muted-color;
      font-size: 0.9rem;
    }
  }

  .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid @border-color;

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0;
      margin-bottom: 1.2rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }
  }

  .pros {
    border-top: 4px solid @success-color;
  }

  .cons {
    border-top: 4px solid @warning-color;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      gap: 0.8rem;
      margin-bottom: 1rem;
      align-items: flex-start;

      &:last-child {
        margin-bottom: 0;
      }

      i {
        color: @primary-color;
        font-size: 1.2rem;
        margin-top: 0.2rem;
      }

      strong {
        display: block;
        margin-bottom: 0.2rem;
        color: darken(@text-color, 10%);
      }

      p {
        margin: 0;
        color: @muted-color;
        font-size: 0.9rem;
      }
    }
  }

  .recommendation {
    background: lighten(@success-color, 35%);
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid @success-color;

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0;
    }

    p {
      margin-top: 0;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
        list-style-type: disc;
        color: @muted-color;
      }
    }
  }

  .tools,
  .runtimes,
  .frameworks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .tool,
  .runtime,
  .framework {
    background: lighten(@primary-color, 50%);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }

  .tool-icon,
  .framework-logo {
    width: 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .runtime {
    flex-direction: column;
    text-align: center;

    i {
      font-size: 2rem;
      color: @primary-color;
    }
  }

  .footer {
    text-align: center;
    color: @muted-color;
    font-size: 0.9rem;
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid @border-color;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  // 图标样式
  .icon {
    font-size: 1.6rem;

    &-wasm:before {
      content: "🖥️";
    }

    &-info:before {
      content: "ℹ️";
    }

    &-binary:before {
      content: "🔢";
    }

    &-speed:before {
      content: "⚡";
    }

    &-sandbox:before {
      content: "📦";
    }

    &-code:before {
      content: "💻";
    }

    &-apps:before {
      content: "🚀";
    }

    &-pros-cons:before {
      content: "⚖️";
    }

    &-ecosystem:before {
      content: "🌐";
    }

    &-game:before {
      content: "🎮";
    }

    &-video:before {
      content: "🎬";
    }

    &-ai:before {
      content: "🤖";
    }

    &-cad:before {
      content: "📐";
    }

    &-crypto:before {
      content: "🔒";
    }

    &-science:before {
      content: "🔬";
    }

    &-check:before {
      content: "✅";
    }

    &-warning:before {
      content: "⚠️";
    }

    &-lightbulb:before {
      content: "💡";
    }

    &-dom:before {
      content: "🌳";
    }

    &-debug:before {
      content: "🐞";
    }

    &-gc:before {
      content: "🧹";
    }

    &-startup:before {
      content: "⏱️";
    }

    &-learning:before {
      content: "📚";
    }

    &-browser:before {
      content: "🌐";
    }

    &-node:before {
      content: "⬢";
    }

    &-server:before {
      content: "📡";
    }

    &-edge:before {
      content: "⏩";
    }

    &-blockchain:before {
      content: "🔗";
    }

    &-security:before {
      content: "🛡️";
    }

    &-language:before {
      content: "🌍";
    }

    &-size:before {
      content: "📦";
    }

    &-parallel:before {
      content: "🧵";
    }
  }
}
</style>
