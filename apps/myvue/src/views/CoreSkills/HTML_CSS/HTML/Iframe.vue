<template>
  <div class="iframe-guide-container">
    <header class="header">
      <h1>iframe 参考指南</h1>
      <p class="subtitle">嵌入外部内容的强大工具 - 安全使用指南</p>
    </header>

    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="{ active: activeTab === tab.id }">
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <!-- 基础介绍 -->
      <section v-show="activeTab === 'intro'" class="section">
        <h2>iframe 是什么？</h2>
        <p>
          <strong>iframe</strong>（内联框架）是HTML元素，允许在当前文档中嵌入另一个HTML文档。
          它创建了一个嵌套的浏览上下文，可以独立加载和渲染内容。
        </p>

        <div class="info-card">
          <h3>关键特性</h3>
          <ul>
            <li>在页面中创建独立的浏览上下文</li>
            <li>可以嵌入来自相同或不同域的内容</li>
            <li>支持与父文档的有限交互</li>
            <li>提供沙盒环境隔离嵌入内容</li>
          </ul>
        </div>

        <div class="code-block">
          <pre><code>&lt;iframe
  src="https://example.com"
  title="示例框架"
  width="600"
  height="400"
&gt;&lt;/iframe&gt;</code></pre>
        </div>
      </section>

      <!-- 基本用法 -->
      <section v-show="activeTab === 'usage'" class="section">
        <h2>iframe 基本用法</h2>

        <div class="columns">
          <div class="column">
            <h3>核心属性</h3>
            <table class="attribute-table">
              <thead>
                <tr>
                  <th>属性</th>
                  <th>描述</th>
                  <th>示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>src</code></td>
                  <td>指定嵌入文档的URL</td>
                  <td><code>src="page.html"</code></td>
                </tr>
                <tr>
                  <td><code>width</code></td>
                  <td>设置iframe宽度</td>
                  <td><code>width="800"</code></td>
                </tr>
                <tr>
                  <td><code>height</code></td>
                  <td>设置iframe高度</td>
                  <td><code>height="600"</code></td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td>提供可访问性描述</td>
                  <td><code>title="地图视图"</code></td>
                </tr>
                <tr>
                  <td><code>name</code></td>
                  <td>指定框架名称用于定位</td>
                  <td><code>name="contentFrame"</code></td>
                </tr>
                <tr>
                  <td><code>sandbox</code></td>
                  <td>启用安全沙盒限制</td>
                  <td><code>sandbox="allow-same-origin"</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="column">
            <h3>响应式iframe</h3>
            <p>使用CSS实现响应式iframe：</p>
            <div class="code-block">
              <pre><code>.responsive-iframe {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  height: 0;
  overflow: hidden;
}

.responsive-iframe iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}</code></pre>
            </div>

            <div class="demo-container">
              <div class="responsive-iframe">
                <!-- <iframe src="https://www.bilibili.com/video/BV113411p7BT/" title="blibli" frameborder="0"
                  allow="autoplay;"></iframe> -->
              </div>
              <p class="demo-label">响应式视频嵌入示例</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 通信机制 -->
      <section v-show="activeTab === 'communication'" class="section">
        <h2>iframe 通信机制</h2>

        <div class="info-card warning">
          <h3>同源策略限制</h3>
          <p>浏览器安全策略限制不同源页面之间的直接DOM访问。</p>
          <p>跨域通信需要使用 <code>window.postMessage()</code> API。</p>
        </div>

        <div class="columns">
          <div class="column">
            <h3>父页面 → 子iframe</h3>
            <div class="code-block">
              <pre><code>// 父页面发送消息
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage(
  { type: 'messageFromParent', data: 'Hello iframe!' },
  'https://iframe-domain.com'
);</code></pre>
            </div>

            <div class="code-block">
              <pre><code>// 子iframe接收消息
window.addEventListener('message', (event) => {
  // 验证消息来源
  if (event.origin !== 'https://parent-domain.com') return;

  if (event.data.type === 'messageFromParent') {
    console.log('收到父页面消息:', event.data.data);
  }
});</code></pre>
            </div>
          </div>

          <div class="column">
            <h3>子iframe → 父页面</h3>
            <div class="code-block">
              <pre><code>// 子iframe发送消息
window.parent.postMessage(
  { type: 'messageFromIframe', data: 'Hello parent!' },
  'https://parent-domain.com'
);</code></pre>
            </div>

            <div class="code-block">
              <pre><code>// 父页面接收消息
window.addEventListener('message', (event) => {
  // 验证消息来源
  if (event.origin !== 'https://iframe-domain.com') return;

  if (event.data.type === 'messageFromIframe') {
    console.log('收到iframe消息:', event.data.data);
  }
});</code></pre>
            </div>
          </div>
        </div>

        <div class="communication-demo">
          <h3>通信演示</h3>
          <div class="demo-container">
            <div class="demo-frame">
              <iframe ref="demoIframe" src="/iframe-demo.html" title="通信演示" class="demo-iframe"></iframe>
            </div>

            <div class="demo-controls">
              <button @click="sendToIframe" class="demo-btn">
                发送消息到iframe
              </button>
              <button @click="requestFromIframe" class="demo-btn">
                请求iframe数据
              </button>
              <button @click="changeIframeColor" class="demo-btn">
                改变iframe背景
              </button>
            </div>

            <div class="message-log">
              <h4>消息日志</h4>
              <div class="log-content">
                <div v-for="(message, index) in messageLog" :key="index" :class="['log-entry', message.sender]">
                  {{ message.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section v-show="activeTab === 'scenarios'" class="section">
        <h2>iframe 使用场景</h2>

        <div class="use-cases">
          <div class="use-case">
            <div class="icon">📊</div>
            <h3>第三方内容嵌入</h3>
            <p>嵌入外部服务如YouTube视频、Google地图、社交媒体插件等。</p>
          </div>

          <div class="use-case">
            <div class="icon">🛡️</div>
            <h3>沙盒隔离</h3>
            <p>安全地运行不受信任的代码或用户生成的内容。</p>
          </div>

          <div class="use-case">
            <div class="icon">📝</div>
            <h3>表单与支付</h3>
            <p>嵌入支付网关表单以保持PCI DSS合规性。</p>
          </div>

          <div class="use-case">
            <div class="icon">🧪</div>
            <h3>微前端架构</h3>
            <p>在大型应用中将不同团队开发的模块集成在一起。</p>
          </div>

          <div class="use-case">
            <div class="icon">📦</div>
            <h3>遗留系统集成</h3>
            <p>将旧系统嵌入到新应用中，逐步进行现代化改造。</p>
          </div>

          <div class="use-case">
            <div class="icon">📊</div>
            <h3>数据分析工具</h3>
            <p>嵌入第三方分析仪表板而不影响主应用。</p>
          </div>
        </div>

        <div class="comparison">
          <h3>iframe与其他嵌入方式对比</h3>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>技术</th>
                <th>优点</th>
                <th>缺点</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>iframe</strong></td>
                <td>完全隔离、安全、跨域支持</td>
                <td>通信复杂、性能开销</td>
                <td>嵌入第三方内容、微前端</td>
              </tr>
              <tr>
                <td>Web Components</td>
                <td>原生支持、性能好</td>
                <td>浏览器兼容性、样式隔离有限</td>
                <td>可重用UI组件</td>
              </tr>
              <tr>
                <td>AJAX + DOM</td>
                <td>无缝集成、完全控制</td>
                <td>同源限制、XSS风险</td>
                <td>同源内容加载</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 安全与防护 -->
      <section v-show="activeTab === 'security'" class="section">
        <h2>iframe 安全与防护</h2>

        <div class="info-card danger">
          <h3>主要安全风险</h3>
          <ul>
            <li><strong>点击劫持 (Clickjacking)</strong> - 恶意网站通过透明iframe覆盖诱导用户点击</li>
            <li><strong>XSS攻击</strong> - 通过恶意iframe内容执行跨站脚本</li>
            <li><strong>CSRF攻击</strong> - 利用用户会话执行非授权操作</li>
            <li><strong>钓鱼攻击</strong> - 伪造可信网站获取用户凭证</li>
          </ul>
        </div>

        <h3>防护措施</h3>
        <div class="security-measures">
          <div class="measure">
            <h4>1. 沙盒属性 (sandbox)</h4>
            <p>限制iframe的权限：</p>
            <div class="code-block">
              <pre><code>&lt;iframe sandbox="allow-scripts allow-same-origin"&gt;&lt;/iframe&gt;</code></pre>
            </div>
            <p>常用权限：<br>
              <code>allow-forms</code>,
              <code>allow-scripts</code>,
              <code>allow-same-origin</code>,
              <code>allow-popups</code>
            </p>
          </div>

          <div class="measure">
            <h4>2. X-Frame-Options 响应头</h4>
            <p>防止页面被嵌入到iframe中：</p>
            <div class="code-block">
              <pre><code># 完全禁止嵌入
X-Frame-Options: DENY

# 仅允许同源嵌入
X-Frame-Options: SAMEORIGIN

# 允许特定来源嵌入
X-Frame-Options: ALLOW-FROM https://trusted-domain.com</code></pre>
            </div>
          </div>

          <div class="measure">
            <h4>3. Content Security Policy (CSP)</h4>
            <p>控制允许嵌入的源：</p>
            <div class="code-block">
              <pre><code>Content-Security-Policy: frame-src 'self' https://trusted-domain.com;</code></pre>
            </div>
            <p>阻止所有iframe嵌入：<br>
              <code>Content-Security-Policy: frame-src 'none';</code>
            </p>
          </div>

          <div class="measure">
            <h4>4. 安全的跨域通信</h4>
            <p>使用postMessage时始终验证来源：</p>
            <div class="code-block">
              <pre><code>window.addEventListener('message', (event) => {
  // 验证消息来源
  const trustedOrigins = ['https://trusted-domain.com'];
  if (!trustedOrigins.includes(event.origin)) return;

  // 处理消息...
});</code></pre>
            </div>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>尽可能使用同源iframe</li>
            <li>使用sandbox属性限制权限</li>
            <li>设置X-Frame-Options保护你的页面</li>
            <li>实现CSP策略控制嵌入源</li>
            <li>永远不要嵌入不可信的内容</li>
            <li>在postMessage中严格验证消息来源</li>
            <li>避免使用iframe加载敏感内容</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>iframe参考指南 &copy; {{ new Date().getFullYear() }} | 使用iframe时请始终考虑安全影响</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 标签页状态
const activeTab = ref('intro');

// 标签页配置
const tabs = [
  { id: 'intro', label: '简介' },
  { id: 'usage', label: '基本用法' },
  { id: 'communication', label: '通信机制' },
  { id: 'scenarios', label: '使用场景' },
  { id: 'security', label: '安全与防护' }
];

// 通信演示相关
const demoIframe = ref<HTMLIFrameElement | null>(null);
const messageLog = ref<{ text: string; sender: string }[]>([]);

// 发送消息到iframe
const sendToIframe = () => {
  if (!demoIframe.value?.contentWindow) return;

  const message = {
    type: 'messageFromParent',
    data: 'Hello from parent! Current time: ' + new Date().toLocaleTimeString()
  };

  // 实际应用中应指定目标源
  demoIframe.value.contentWindow.postMessage(message, '*');

  addLog('Parent: 发送消息到iframe');
};

// 请求iframe数据
const requestFromIframe = () => {
  if (!demoIframe.value?.contentWindow) return;

  const message = {
    type: 'requestData',
    data: 'Please send some data'
  };

  demoIframe.value.contentWindow.postMessage(message, '*');

  addLog('Parent: 请求iframe数据');
};

// 改变iframe背景颜色
const changeIframeColor = () => {
  if (!demoIframe.value?.contentWindow) return;

  const colors = ['#f0f8ff', '#fff0f5', '#f0fff0', '#fff8dc'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const message = {
    type: 'changeBackground',
    color: randomColor
  };

  demoIframe.value.contentWindow.postMessage(message, '*');

  addLog(`Parent: 设置iframe背景为 ${randomColor}`);
};

// 处理来自iframe的消息
const handleMessage = (event: MessageEvent) => {
  // 在生产环境中应验证event.origin
  if (event.data && event.data.type === 'messageFromIframe') {
    addLog(`iframe: ${event.data.data}`, 'iframe');
  } else if (event.data && event.data.type === 'responseData') {
    addLog(`iframe: 发送响应数据 - ${event.data.data}`, 'iframe');
  }
};

// 添加日志
const addLog = (text: string, sender: 'parent' | 'iframe' = 'parent') => {
  messageLog.value.push({ text, sender });
  // 保持日志长度
  if (messageLog.value.length > 10) {
    messageLog.value.shift();
  }
};

// 设置事件监听
onMounted(() => {
  window.addEventListener('message', handleMessage);
});

// 清理事件监听
onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<style lang="less" scoped>
.iframe-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9fafb;
  color: #111827;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 0;
  background: none;
  border-radius: 0;
  color: inherit;
  box-shadow: none;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: normal;
  text-shadow: none;
}

.subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 0;
  opacity: 1;
  color: #6b7280;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tabs button {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: none;
}

.tabs button:hover {
  background: #f3f4f6;
  transform: none;
}

.tabs button.active {
  background: #3b82f6;
  color: white;
  box-shadow: none;
  border-color: #3b82f6;
}

.content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: none;
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.section h2 {
  color: #111827;
  font-size: 1.75rem;
  margin-top: 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
}

.info-card {
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left-width: 4px;
  border-style: solid;
}

.info-card h3 {
  margin-top: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.info-card ul {
  padding-left: 20px;
  margin-bottom: 0;
}

.info-card ul li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.info-card.warning {
  background-color: #fffbeb;
  border-color: #f59e0b;
  color: #b45309;
}

.info-card.warning h3 {
  color: #92400e;
}

.info-card.danger {
  background-color: #fef2f2;
  border-color: #ef4444;
  color: #b91c1c;
}

.info-card.danger h3 {
  color: #991b1b;
}

.info-card {
  background-color: #eff6ff;
  border-color: #3b82f6;
  color: #1e40af;
}

.info-card h3 {
  color: #1e3a8a;
}

.code-block {
  background: #f3f4f6;
  border-radius: 6px;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #1f2937;
}

.columns {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .columns {
    flex-direction: column;
  }
}

.column {
  flex: 1;
}

.attribute-table,
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.attribute-table th,
.comparison-table th {
  background: #f3f4f6;
  color: #111827;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
}

.attribute-table td,
.comparison-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.attribute-table td:first-child {
  font-weight: 500;
}

.attribute-table tr:last-child td,
.comparison-table tr:last-child td {
  border-bottom: none;
}

.attribute-table tr:nth-child(even) td {
  background: #f9fafb;
}

.demo-container {
  margin: 2rem 0;
}

.demo-container .demo-label {
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
  color: #6b7280;
}

.responsive-iframe {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e5e7eb;
}

.responsive-iframe iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.communication-demo {
  margin-top: 2rem;
}

.communication-demo .demo-frame {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: none;
}

.communication-demo .demo-iframe {
  width: 100%;
  height: 250px;
  border: none;
  background: #fff;
}

.communication-demo .demo-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.communication-demo .demo-btn {
  padding: 0.6rem 1.2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.communication-demo .demo-btn:hover {
  transform: none;
  box-shadow: none;
  background: #2563eb;
}

.communication-demo .message-log {
  background: #f3f4f6;
  border-radius: 8px;
  padding: 1rem;
  color: #1f2937;
}

.communication-demo .message-log h4 {
  margin-top: 0;
  color: #111827;
}

.communication-demo .log-content {
  height: 120px;
  overflow-y: auto;
  background: #fff;
  border-radius: 6px;
  padding: 0.5rem;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  border: 1px solid #e5e7eb;
}

.communication-demo .log-entry {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.communication-demo .log-entry.parent {
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid #3b82f6;
}

.communication-demo .log-entry.iframe {
  background: rgba(100, 116, 139, 0.1);
  border-left: 3px solid #64748b;
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.use-case {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: none;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

.use-case:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-color: #3b82f6;
}

.use-case .icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.use-case h3 {
  margin-top: 0;
  color: #111827;
}

.use-case p {
  color: #374151;
  line-height: 1.6;
}

.comparison-table td,
.comparison-table strong {
  color: #111827;
}

.security-measures {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.measure {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.measure h4 {
  margin-top: 0;
  color: #111827;
}

.measure p {
  margin: 1rem 0;
}

.best-practices {
  background: #eff6ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  border-left: 4px solid #3b82f6;
}

.best-practices h3 {
  margin-top: 0;
  color: #1e3a8a;
}

.best-practices ul {
  padding-left: 20px;
  margin-bottom: 0;
}

.best-practices ul li {
  margin-bottom: 12px;
  line-height: 1.6;
  position: relative;
  padding-left: 20px;
}

.best-practices ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #22c55e;
  font-weight: bold;
}

.footer {
  text-align: center;
  padding: 2rem 0 0 0;
  margin-top: 2rem;
  color: #6b7280;
  font-size: 0.9rem;
  border-top: 1px solid #e5e7eb;
}
</style>
