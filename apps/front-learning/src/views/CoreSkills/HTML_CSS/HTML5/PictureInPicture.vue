<template>
  <div class="pip-container">
    <div class="header">
      <div class="title-container">
        <h1>Document Picture-in-Picture (Doc PiP)</h1>
        <p class="subtitle">HTML5多任务处理新特性</p>
      </div>
      <div class="pip-icon">📑</div>
    </div>

    <div class="content">
      <!-- 概念部分 -->
      <div class="section concept">
        <div class="section-header">
          <div class="section-icon">🔍</div>
          <h2>概念解析</h2>
        </div>
        <div class="section-content">
          <p>Document Picture-in-Picture (Doc PiP) 是 HTML5
            的新特性，它允许开发者将<strong>整个文档或部分HTML元素</strong>置于浮动窗口中，该窗口始终位于其他应用窗口之上。</p>

          <div class="feature-highlight">
            <div class="highlight-item">
              <div class="highlight-icon">🚀</div>
              <p>不同于传统的视频画中画(PiP)，Doc PiP支持<strong>任意HTML内容</strong></p>
            </div>
            <div class="highlight-item">
              <div class="highlight-icon">🚀</div>
              <p>浮动窗口独立于主页面，具有<strong>自己的JavaScript上下文</strong></p>
            </div>
            <div class="highlight-item">
              <div class="highlight-icon">🚀</div>
              <p>用户可以在浏览其他内容时保持浮动窗口可见</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 作用部分 -->
      <div class="section purpose">
        <div class="section-header">
          <div class="section-icon">🎯</div>
          <h2>核心作用</h2>
        </div>
        <div class="section-content">
          <div class="purpose-grid">
            <div class="purpose-card">
              <div class="purpose-icon">📱</div>
              <h3>多任务处理</h3>
              <p>允许用户同时查看多个内容源，提升工作效率</p>
            </div>
            <div class="purpose-card">
              <div class="purpose-icon">🔔</div>
              <h3>实时监控</h3>
              <p>保持关键信息（如通知、数据仪表盘）始终可见</p>
            </div>
            <div class="purpose-card">
              <div class="purpose-icon">📊</div>
              <h3>上下文保持</h3>
              <p>在浏览其他内容时保留参考信息（如文档、表格）</p>
            </div>
            <div class="purpose-card">
              <div class="purpose-icon">🎮</div>
              <h3>增强体验</h3>
              <p>为游戏、实时协作等场景提供新的交互方式</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 代码示例部分 -->
      <div class="section code-example">
        <div class="section-header">
          <div class="section-icon">💻</div>
          <h2>代码实现</h2>
        </div>
        <div class="section-content">
          <div class="code-block">
            <div class="code-header">
              <div class="code-title">开启Doc PiP窗口</div>
              <div class="code-lang">JavaScript</div>
            </div>
            <pre><code>// 请求打开PiP窗口
async function openPipWindow(contentElement) {
  // 检查浏览器支持
  if (!('documentPictureInPicture' in window)) {
    alert('您的浏览器不支持Document PiP功能');
    return;
  }

  try {
    // 打开PiP窗口
    const pipWindow = await documentPictureInPicture.requestWindow({
      width: 400,
      height: 300
    });

    // 复制样式
    [...document.styleSheets].forEach(styleSheet => {
      pipWindow.document.adoptedStyleSheets = [
        ...pipWindow.document.adoptedStyleSheets,
        styleSheet
      ];
    });

    // 添加内容
    pipWindow.document.body.appendChild(contentElement.cloneNode(true));

    // 窗口关闭事件处理
    pipWindow.addEventListener('unload', event => {
      console.log('PiP window closed');
    });

    return pipWindow;
  } catch (error) {
    console.error('Error opening PiP window:', error);
  }
}

// 使用示例
const elementToShow = document.getElementById('pip-content');
openPipWindow(elementToShow);</code></pre>
          </div>

          <div class="code-block">
            <div class="code-header">
              <div class="code-title">Vue组件实现</div>
              <div class="code-lang">Vue + TypeScript</div>
            </div>
            <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;div ref="pipContent" class="pip-content"&gt;
      &lt;!-- 要显示在PiP中的内容 --&gt;
      &lt;h3&gt;实时股票数据&lt;/h3&gt;
      &lt;StockTicker :stock="currentStock" /&gt;
    &lt;/div&gt;
    &lt;button @click="openPip"&gt;开启PiP窗口&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue';
import StockTicker from './StockTicker.vue';

const pipContent = ref&lt;HTMLElement | null&gt;(null);
const pipWindow = ref&lt;Window | null&gt;(null);
const currentStock = ref(getStockData());

async function openPip() {
  if (!pipContent.value) return;

  try {
    // 打开PiP窗口
    pipWindow.value = await documentPictureInPicture.requestWindow({
      width: 320,
      height: 240
    });

    // 添加内容
    pipWindow.value.document.body.appendChild(pipContent.value.cloneNode(true));

    // 处理关闭事件
    pipWindow.value.addEventListener('unload', () => {
      pipWindow.value = null;
    });
  } catch (err) {
    console.error('PiP error:', err);
  }
}

// 更新股票数据
setInterval(() => {
  currentStock.value = getStockData();
  // 如果PiP窗口存在，更新其数据
  if (pipWindow.value) {
    // 更新逻辑...
  }
}, 5000);
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- 应用场景 -->
      <div class="section scenarios">
        <div class="section-header">
          <div class="section-icon">📍</div>
          <h2>应用场景</h2>
        </div>
        <div class="section-content">
          <div class="scenario-cards">
            <div class="scenario-card scenario-card-blue">
              <div class="scenario-icon">📈</div>
              <h3>金融交易</h3>
              <p>实时监控股票行情或加密货币价格</p>
              <div class="scenario-code">pipWindow.document.querySelector('.stock-price')</div>
            </div>
            <div class="scenario-card scenario-card-purple">
              <div class="scenario-icon">💬</div>
              <h3>实时通讯</h3>
              <p>保持聊天窗口在浏览内容时可见</p>
              <div class="scenario-code">elementToClone = chatContainer</div>
            </div>
            <div class="scenario-card scenario-card-green">
              <div class="scenario-icon">📚</div>
              <h3>学习研究</h3>
              <p>参考文档或教程保持在屏幕上</p>
              <div class="scenario-code">cloneNode(documentFragment)</div>
            </div>
            <div class="scenario-card scenario-card-orange">
              <div class="scenario-icon">🎮</div>
              <h3>游戏辅助</h3>
              <p>显示游戏指南或实时策略</p>
              <div class="scenario-code">pipWindow.requestAnimationFrame()</div>
            </div>
            <div class="scenario-card scenario-card-red">
              <div class="scenario-icon">🎥</div>
              <h3>视频制作</h3>
              <p>预览输出同时编辑时间线</p>
              <div class="scenario-code">transferControlToProxy()</div>
            </div>
            <div class="scenario-card scenario-card-teal">
              <div class="scenario-icon">🧪</div>
              <h3>实验监控</h3>
              <p>实时显示传感器数据或仪表盘</p>
              <div class="scenario-code">WebSocket + PiP</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优点部分 -->
      <div class="section advantages">
        <div class="section-header">
          <div class="section-icon">✅</div>
          <h2>核心优点</h2>
        </div>
        <div class="section-content">
          <div class="advantages-container">
            <div class="advantage">
              <h3><span class="advantage-icon">🚀</span> 提升用户体验</h3>
              <p>用户无需切换标签页或窗口即可查看重要信息，减少了上下文切换成本，提高了多任务处理效率。</p>
            </div>
            <div class="advantage">
              <h3><span class="advantage-icon">🔗</span> 灵活的DOM操作</h3>
              <p>支持任意HTML内容，不仅仅是视频元素，包括交互式组件、实时数据可视化等复杂内容。</p>
            </div>
            <div class="advantage">
              <h3><span class="advantage-icon">⚡</span> 独立的执行上下文</h3>
              <p>PiP窗口拥有自己的JavaScript上下文，不会干扰主页面，同时可以通过API与主页面通信。</p>
            </div>
            <div class="advantage">
              <h3><span class="advantage-icon">📱</span> 响应式设计友好</h3>
              <p>开发者可以控制PiP窗口尺寸，并确保内容适应不同大小的浮动窗口。</p>
            </div>
            <div class="advantage">
              <h3><span class="advantage-icon">🛡️</span> 增强的隐私控制</h3>
              <p>PiP窗口不会访问主页面的数据，除非明确传递，提供更好的隐私隔离。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 兼容性部分 -->
      <div class="section compatibility">
        <div class="section-header">
          <div class="section-icon">🌐</div>
          <h2>浏览器兼容性</h2>
        </div>
        <div class="section-content">
          <div class="browser-support">
            <div class="browser">
              <div class="browser-icon">🦊</div>
              <div class="browser-name">Chrome</div>
              <div class="browser-version">108+</div>
              <div class="support-status supported">✅ 支持</div>
            </div>
            <div class="browser">
              <div class="browser-icon">🦁</div>
              <div class="browser-name">Edge</div>
              <div class="browser-version">108+</div>
              <div class="support-status supported">✅ 支持</div>
            </div>
            <div class="browser">
              <div class="browser-icon">🦊</div>
              <div class="browser-name">Firefox</div>
              <div class="browser-version">-</div>
              <div class="support-status planned">🟡 开发中</div>
            </div>
            <div class="browser">
              <div class="browser-icon">🦁</div>
              <div class="browser-name">Safari</div>
              <div class="browser-version">-</div>
              <div class="support-status not-supported">❌ 不支持</div>
            </div>
          </div>
          <div class="compatibility-tip">
            <p>注意：使用前需检测API可用性，建议提供回退方案或功能降级。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Document Picture-in-Picture API | 增强的多任务Web体验</p>
      <p> Web技术演进手册 | 版本 1.0.0</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加Doc PiP演示逻辑
import { ref } from 'vue';

// 示例状态管理
const isPipSupported = ref(
  typeof window !== 'undefined' && 'documentPictureInPicture' in window
);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9ff;
@card-bg: #ffffff;
@border-color: #e6e9f0;
@text-color: #2b2d42;
@light-text: #8d99ae;
@code-bg: #f6f8ff;
@code-border: #e0e5ff;
@blue-gradient: linear-gradient(135deg, @primary-color, @secondary-color);

.pip-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  line-height: 1.6;
}

.header {
  background: @blue-gradient;
  color: white;
  border-radius: 0 0 20px 20px;
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 20px rgba(67, 97, 238, 0.15);

  .title-container {
    max-width: 80%;
  }

  h1 {
    margin: 0;
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.85;
    margin-top: 0.5rem;
    font-weight: 300;
  }

  .pip-icon {
    font-size: 4rem;
    opacity: 0.9;
    animation: float 3s ease-in-out infinite;
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  margin-bottom: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 1.5rem;
    background: rgba(@primary-color, 0.05);
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 1.5rem;
      color: @primary-color;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: @text-color;
    }
  }

  .section-content {
    padding: 1.5rem;
  }
}

// 概念部分
.concept {
  .feature-highlight {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;
    margin-top: 1.5rem;

    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;
      padding: 1rem;
      background: rgba(@accent-color, 0.05);
      border-radius: 12px;
      border-left: 3px solid @accent-color;

      .highlight-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
        margin-top: 0.2rem;
      }

      p {
        margin: 0;
        line-height: 1.5;
      }
    }
  }
}

// 作用部分
.purpose {
  .purpose-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;

    .purpose-card {
      background: rgba(@primary-color, 0.03);
      border: 1px solid @border-color;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(67, 97, 238, 0.1);
      }

      .purpose-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: @primary-color;
      }

      h3 {
        margin: 0 0 0.8rem;
        font-size: 1.2rem;
        color: @text-color;
      }

      p {
        margin: 0;
        color: @light-text;
        font-size: 0.95rem;
      }
    }
  }
}

// 代码示例部分
.code-example {
  .code-block {
    background: @code-bg;
    border: 1px solid @code-border;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1.5rem;

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 1.2rem;
      background: rgba(@primary-color, 0.06);
      border-bottom: 1px solid @code-border;

      .code-title {
        font-weight: 600;
        font-size: 1.1rem;
        color: @text-color;
      }

      .code-lang {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
      }
    }

    pre {
      margin: 0;
      padding: 1.2rem;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
        color: #2a2a5e;
      }
    }
  }
}

// 应用场景
.scenarios {
  .scenario-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;

    .scenario-card {
      border-radius: 12px;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
      }

      .scenario-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 1rem;
        color: @light-text;
        font-size: 0.95rem;
        min-height: 3.5rem;
      }

      .scenario-code {
        background: rgba(255, 255, 255, 0.3);
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        padding: 0.5rem;
        border-radius: 6px;
        margin-top: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .scenario-card-blue {
      background: rgba(67, 97, 238, 0.06);
      border: 1px solid rgba(67, 97, 238, 0.15);

      &::before {
        background: @primary-color;
      }
    }

    .scenario-card-purple {
      background: rgba(155, 93, 229, 0.06);
      border: 1px solid rgba(155, 93, 229, 0.15);

      &::before {
        background: #9b5de5;
      }
    }

    .scenario-card-green {
      background: rgba(56, 176, 0, 0.06);
      border: 1px solid rgba(56, 176, 0, 0.15);

      &::before {
        background: #38b000;
      }
    }

    .scenario-card-orange {
      background: rgba(255, 138, 0, 0.06);
      border: 1px solid rgba(255, 138, 0, 0.15);

      &::before {
        background: #ff8a00;
      }
    }

    .scenario-card-red {
      background: rgba(239, 68, 68, 0.06);
      border: 1px solid rgba(239, 68, 68, 0.15);

      &::before {
        background: #ef4444;
      }
    }

    .scenario-card-teal {
      background: rgba(0, 180, 216, 0.06);
      border: 1px solid rgba(0, 180, 216, 0.15);

      &::before {
        background: #00b4d8;
      }
    }
  }
}

// 优点部分
.advantages {
  .advantages-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .advantage {
      background: rgba(76, 201, 240, 0.05);
      border-radius: 12px;
      padding: 1.5rem;
      border-left: 3px solid @accent-color;

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .advantage-icon {
          background: rgba(@accent-color, 0.2);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }

      p {
        margin: 0;
        color: @text-color;
        line-height: 1.6;
      }
    }
  }
}

// 兼容性部分
.compatibility {
  .browser-support {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;

    .browser {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: @card-bg;
      border-radius: 12px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);

      .browser-icon {
        font-size: 1.8rem;
      }

      .browser-name {
        flex: 1;
        font-weight: 500;
      }

      .browser-version {
        width: 50px;
        text-align: center;
      }

      .support-status {
        padding: 0.25rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
      }

      .supported {
        background: rgba(56, 176, 0, 0.1);
        color: #38b000;
      }

      .planned {
        background: rgba(255, 138, 0, 0.1);
        color: #ff8a00;
      }

      .not-supported {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
    }
  }

  .compatibility-tip {
    background: rgba(255, 138, 0, 0.06);
    border-left: 3px solid #ff8a00;
    padding: 1rem;
    border-radius: 8px;

    p {
      margin: 0;
      color: @text-color;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: @light-text;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p {
    margin: 0.3rem 0;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;

    .title-container {
      max-width: 100%;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section-header h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .code-block pre {
    padding: 1rem 0.8rem;
    font-size: 0.8rem;
  }

  .scenario-card {
    padding: 1.2rem !important;
  }
}
</style>
