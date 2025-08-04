<template>
  <div class="broadcast-channel-container">
    <header class="header">
      <h1>BroadcastChannel API 指南</h1>
      <p class="subtitle">跨浏览器上下文通信的现代解决方案</p>
    </header>

    <div class="content-wrapper">
      <!-- 基本概念 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">📡</span> 什么是 BroadcastChannel？
          </h2>
          <p class="section-description">理解 BroadcastChannel 的核心概念</p>
        </div>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🔗</div>
            <h3>定义</h3>
            <p>BroadcastChannel API 允许同源的不同浏览器上下文（如标签页、iframe 或 worker）之间进行简单高效的通信。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>工作原理</h3>
            <div class="communication-flow">
              <div class="sender">发送方</div>
              <div class="arrow">→</div>
              <div class="channel">BroadcastChannel</div>
              <div class="arrow">→</div>
              <div class="receiver">接收方</div>
              <div class="receiver">接收方</div>
              <div class="receiver">接收方</div>
            </div>
            <p>所有连接到同一通道名的上下文都会接收到通过该通道发送的消息。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">⚡</div>
            <h3>主要特性</h3>
            <ul>
              <li>同源策略：仅限相同协议、域名和端口</li>
              <li>简单易用：无需复杂配置</li>
              <li>轻量级：专为消息传递设计</li>
              <li>高效：使用结构化克隆算法</li>
              <li>自动管理：通道关闭时自动清理</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 核心功能 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🛠️</span> 核心功能与使用
          </h2>
          <p class="section-description">BroadcastChannel API 的基本操作</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-header">
              <div class="feature-icon">1</div>
              <h3>创建通道</h3>
            </div>
            <div class="feature-content">
              <p>使用相同的通道名创建 BroadcastChannel 实例</p>
              <div class="code-block">
                <pre><code>// 创建 BroadcastChannel 实例
const channel = new BroadcastChannel('my_channel');</code></pre>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <div class="feature-icon">2</div>
              <h3>发送消息</h3>
            </div>
            <div class="feature-content">
              <p>使用 postMessage 方法向通道发送消息</p>
              <div class="code-block">
                <pre><code>// 发送消息到通道
channel.postMessage({
  type: 'notification',
  content: '新消息到达！',
  timestamp: Date.now()
});</code></pre>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <div class="feature-icon">3</div>
              <h3>接收消息</h3>
            </div>
            <div class="feature-content">
              <p>监听 message 事件处理接收到的消息</p>
              <div class="code-block">
                <pre><code>// 监听通道消息
channel.onmessage = (event) => {
  console.log('收到消息:', event.data);
};

// 或者使用 addEventListener
channel.addEventListener('message', (event) => {
  handleMessage(event.data);
});</code></pre>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <div class="feature-icon">4</div>
              <h3>关闭通道</h3>
            </div>
            <div class="feature-content">
              <p>不再需要时关闭通道释放资源</p>
              <div class="code-block">
                <pre><code>// 关闭通道
channel.close();

// 监听通道关闭事件
channel.onmessageerror = (event) => {
  console.log('通道错误:', event);
};</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vue3 示例 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">💻</span> Vue3 完整示例
          </h2>
          <p class="section-description">在 Vue3 应用中使用 BroadcastChannel</p>
        </div>

        <div class="vue-example">
          <div class="example-description">
            <p>实现一个跨标签页的实时通知系统：</p>
            <ol>
              <li>创建 BroadcastChannel 实例</li>
              <li>发送消息到所有打开的应用实例</li>
              <li>接收并显示通知消息</li>
            </ol>
          </div>

          <div class="code-block">
            <pre><code>&lt;template&gt;
  &lt;div class="broadcast-demo"&gt;
    &lt;h3&gt;BroadcastChannel 演示 (标签页   &#123;&#123; tabId &#125;&#125;)&lt;/h3&gt;

    &lt;div class="controls"&gt;
      &lt;input v-model="message" placeholder="输入通知内容" /&gt;
      &lt;button @click="sendNotification"&gt;发送通知&lt;/button&gt;
      &lt;button @click="closeChannel"&gt;关闭通道&lt;/button&gt;
    &lt;/div&gt;

    &lt;div class="notifications"&gt;
      &lt;h4&gt;接收到的通知：&lt;/h4&gt;
      &lt;div v-for="(note, index) in notifications" :key="index" class="notification"&gt;
        &lt;div class="notification-header"&gt;
          &lt;span class="tab"&gt;标签页 &#123;&#123;  note.sender &#125;&#125;&lt;/span&gt;
          &lt;span class="time"&gt;&#123;&#123; formatTime(note.timestamp) &#125;&#125;&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="notification-content"&gt;&#123;&#123; note.content &#125;&#125;&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 随机标签页ID
const tabId = ref(Math.floor(Math.random() * 1000));
const message = ref('');
const notifications = ref&lt;Array&lt;{
  sender: number;
  content: string;
  timestamp: number
}>&gt;([]);

// 创建 BroadcastChannel
const channelName = 'notification_channel';
const channel = ref&lt;BroadcastChannel | null&gt;(null);

onMounted(() => {
  // 初始化通道
  channel.value = new BroadcastChannel(channelName);

  // 设置消息处理器
  channel.value.onmessage = (event) => {
    const data = event.data;
    if (data.type === 'notification') {
      notifications.value.push({
        sender: data.sender,
        content: data.content,
        timestamp: data.timestamp
      });
    }
  };

  // 通道错误处理
  channel.value.onmessageerror = (event) => {
    console.error('通道错误:', event);
  };
});

onBeforeUnmount(() => {
  // 关闭通道
  if (channel.value) {
    channel.value.close();
  }
});

// 发送通知
function sendNotification() {
  if (channel.value && message.value.trim()) {
    channel.value.postMessage({
      type: 'notification',
      sender: tabId.value,
      content: message.value,
      timestamp: Date.now()
    });
    message.value = '';
  }
}

// 关闭通道
function closeChannel() {
  if (channel.value) {
    channel.value.close();
    channel.value = null;
    notifications.value.push({
      sender: 0,
      content: '通道已关闭',
      timestamp: Date.now()
    });
  }
}

// 格式化时间
function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString();
}
&lt;/script&gt;

&lt;style scoped&gt;
.broadcast-demo {
  max-width: 600px;
  margin: 0 auto;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.controls input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.notifications {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
}

.notification {
  margin-bottom: 15px;
  padding: 10px;
  border-left: 4px solid #4361ee;
  background: white;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #666;
}

.notification-content {
  font-size: 1.1rem;
}
&lt;/style&gt;</code></pre>
          </div>

          <div class="demo-preview">
            <div class="preview-tabs">
              <div class="tab" :class="{ active: activeTab === 1 }" @click="activeTab = 1">标签页 1</div>
              <div class="tab" :class="{ active: activeTab === 2 }" @click="activeTab = 2">标签页 2</div>
              <div class="tab" :class="{ active: activeTab === 3 }" @click="activeTab = 3">标签页 3</div>
            </div>

            <div class="preview-content">
              <div v-if="activeTab === 1" class="tab-content">
                <div class="notification">
                  <div class="notification-header">
                    <span class="tab">标签页 2</span>
                    <span class="time">10:25:36</span>
                  </div>
                  <div class="notification-content">有新订单到达！</div>
                </div>
                <div class="notification">
                  <div class="notification-header">
                    <span class="tab">标签页 3</span>
                    <span class="time">10:26:15</span>
                  </div>
                  <div class="notification-content">用户已更新个人信息</div>
                </div>
                <div class="input-area">
                  <input type="text" placeholder="输入通知内容..." v-model="demoMessage" />
                  <button @click="sendDemoNotification(1)">发送</button>
                </div>
              </div>

              <div v-if="activeTab === 2" class="tab-content">
                <div class="notification">
                  <div class="notification-header">
                    <span class="tab">标签页 1</span>
                    <span class="time">10:25:42</span>
                  </div>
                  <div class="notification-content">库存量低于安全阈值</div>
                </div>
                <div class="input-area">
                  <input type="text" placeholder="输入通知内容..." v-model="demoMessage" />
                  <button @click="sendDemoNotification(2)">发送</button>
                </div>
              </div>

              <div v-if="activeTab === 3" class="tab-content">
                <div class="notification">
                  <div class="notification-header">
                    <span class="tab">标签页 1</span>
                    <span class="time">10:26:02</span>
                  </div>
                  <div class="notification-content">系统将在15分钟后维护</div>
                </div>
                <div class="input-area">
                  <input type="text" placeholder="输入通知内容..." v-model="demoMessage" />
                  <button @click="sendDemoNotification(3)">发送</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🚀</span> BroadcastChannel 使用场景
          </h2>
          <p class="section-description">适合使用 BroadcastChannel 的应用场景</p>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-icon">🔔</div>
            <h3>跨标签页通知</h3>
            <p>在一个标签页中操作，通知其他标签页更新状态</p>
            <ul>
              <li>用户登录/登出状态同步</li>
              <li>实时数据更新通知</li>
              <li>系统维护提醒</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>状态同步</h3>
            <p>保持多个打开实例的状态一致性</p>
            <ul>
              <li>购物车内容同步</li>
              <li>主题偏好设置更新</li>
              <li>多标签页表单状态同步</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>实时数据更新</h3>
            <p>在多个客户端间共享实时数据</p>
            <ul>
              <li>股票行情更新</li>
              <li>实时协作编辑</li>
              <li>多人游戏状态同步</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>资源优化</h3>
            <p>避免重复操作和资源浪费</p>
            <ul>
              <li>共享 WebSocket 连接状态</li>
              <li>集中处理后台任务</li>
              <li>避免重复数据请求</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">⚠️</span> 注意事项
          </h2>
          <p class="section-description">使用 BroadcastChannel 时的重要考量</p>
        </div>

        <div class="considerations">
          <div class="consideration-item">
            <div class="consideration-icon">🌐</div>
            <div class="consideration-content">
              <h3>浏览器兼容性</h3>
              <p>BroadcastChannel 在现代浏览器中得到良好支持：</p>
              <ul>
                <li>Chrome: 54+</li>
                <li>Firefox: 38+</li>
                <li>Safari: 15.4+</li>
                <li>Edge: 79+</li>
                <li>Opera: 41+</li>
                <li>Internet Explorer: 不支持</li>
              </ul>
              <p>对于不支持的浏览器，可以使用 localStorage 事件或 SharedWorker 作为回退方案。</p>
            </div>
          </div>

          <div class="consideration-item">
            <div class="consideration-icon">🔒</div>
            <div class="consideration-content">
              <h3>安全与隐私</h3>
              <ul>
                <li>仅限同源上下文通信</li>
                <li>消息内容对用户不可见</li>
                <li>避免传输敏感信息</li>
                <li>使用 HTTPS 确保传输安全</li>
              </ul>
            </div>
          </div>

          <div class="consideration-item">
            <div class="consideration-icon">⚙️</div>
            <div class="consideration-content">
              <h3>最佳实践</h3>
              <ul>
                <li>使用有意义的通道名称</li>
                <li>定义清晰的消息协议</li>
                <li>在页面卸载时关闭通道</li>
                <li>添加错误处理逻辑</li>
                <li>避免发送大型对象</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 与其他技术对比 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🆚</span> 与其他通信方式对比
          </h2>
          <p class="section-description">BroadcastChannel 的替代方案比较</p>
        </div>

        <div class="comparison-table">
          <div class="table-header">
            <div>通信方式</div>
            <div>跨上下文</div>
            <div>复杂度</div>
            <div>实时性</div>
            <div>数据大小</div>
          </div>
          <div class="table-row">
            <div>BroadcastChannel</div>
            <div>✅</div>
            <div>简单</div>
            <div>高</div>
            <div>中等</div>
          </div>
          <div class="table-row">
            <div>localStorage 事件</div>
            <div>✅</div>
            <div>中等</div>
            <div>中等</div>
            <div>小</div>
          </div>
          <div class="table-row">
            <div>SharedWorker</div>
            <div>✅</div>
            <div>复杂</div>
            <div>高</div>
            <div>大</div>
          </div>
          <div class="table-row">
            <div>WebSockets</div>
            <div>✅</div>
            <div>复杂</div>
            <div>高</div>
            <div>大</div>
          </div>
          <div class="table-row">
            <div>window.postMessage</div>
            <div>✅</div>
            <div>中等</div>
            <div>高</div>
            <div>中等</div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="key-points">
        <h3>BroadcastChannel 核心要点：</h3>
        <ul>
          <li>专为同源跨上下文通信设计</li>
          <li>简单易用的消息传递 API</li>
          <li>适合中小型数据传递</li>
          <li>自动处理连接和断开</li>
          <li>比 localStorage 事件更高效</li>
        </ul>
      </div>
      <div class="footer-links">
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel" target="_blank">MDN 文档</a>
        <a href="https://web.dev/broadcastchannel/" target="_blank">Web.dev 指南</a>
        <a href="https://caniuse.com/broadcastchannel" target="_blank">浏览器兼容性</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 演示预览状态
const activeTab = ref(1);
const demoMessage = ref('');

// 发送演示通知
function sendDemoNotification(tabId: number) {
  if (!demoMessage.value.trim()) {
    demoMessage.value = `来自标签页 ${tabId} 的通知`;
  }

  // 模拟发送通知效果
  setTimeout(() => {
    demoMessage.value = '';
  }, 500);
}
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --success-color: #2ec4b6;
  --warning-color: #ff9f1c;
  --danger-color: #e71d36;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-light: #e9ecef;
  --gray-medium: #adb5bd;
  --border-radius: 10px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.broadcast-channel-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: var(--dark-color);
  line-height: 1.6;
  background-color: #fff;
}

.header {
  text-align: center;
  padding: 50px 20px 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: var(--border-radius);
  margin: 20px 0 30px;
  box-shadow: var(--box-shadow);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: #000;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 300;
  }
}

.section {
  margin-bottom: 40px;
  background: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
}

.section-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray-light);
}

.section-title {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--secondary-color);

  .icon {
    font-size: 1.5em;
  }
}

.section-description {
  font-size: 1.1rem;
  color: var(--gray-medium);
  margin-top: 5px;
}

// 概念部分
.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    border-color: var(--primary-color);
  }

  .concept-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p,
  ul {
    color: #495057;
    font-size: 0.95rem;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.communication-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;

  .sender,
  .receiver,
  .channel {
    padding: 10px 15px;
    border-radius: 8px;
    font-weight: 500;
  }

  .sender {
    background: var(--primary-color);
    color: white;
  }

  .channel {
    background: var(--success-color);
    color: white;
  }

  .receiver {
    background: var(--accent-color);
    color: var(--dark-color);
  }

  .arrow {
    color: var(--gray-medium);
    font-weight: bold;
  }
}

// 功能部分
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feature-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: var(--primary-light);
  border-bottom: 1px solid var(--gray-light);

  .feature-icon {
    width: 36px;
    height: 36px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0;
    color: var(--secondary-color);
  }
}

.feature-content {
  padding: 15px;

  p {
    margin-bottom: 15px;
    color: #495057;
  }
}

.code-block {
  background: #f5f7ff;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 15px;
  border: 1px solid var(--gray-light);

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.5;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: var(--secondary-color);
    }
  }
}

// Vue 示例部分
.vue-example {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.example-description {
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 20px;

  p {
    margin-bottom: 15px;
    font-weight: 500;
  }

  ol {
    padding-left: 25px;

    li {
      margin-bottom: 10px;
    }
  }
}

.demo-preview {
  background: var(--light-color);
  border-radius: var(--border-radius);
  overflow: hidden;

  .preview-tabs {
    display: flex;
    background: var(--primary-light);
    border-bottom: 1px solid var(--gray-light);

    .tab {
      padding: 12px 20px;
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background: rgba(67, 97, 238, 0.1);
      }

      &.active {
        background: var(--primary-color);
        // color: white;
        font-weight: 500;
      }
    }
  }

  .preview-content {
    padding: 20px;
  }
}

.tab-content {
  .notification {
    margin-bottom: 15px;
    padding: 10px;
    border-left: 4px solid var(--primary-color);
    background: white;
    border-radius: 4px;
  }

  .notification-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: #666;
  }

  .notification-content {
    font-size: 1.1rem;
  }

  .input-area {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid var(--gray-light);
      border-radius: var(--border-radius);
    }

    button {
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      padding: 0 20px;
      cursor: pointer;
    }
  }
}

// 使用场景部分
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.scenario-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .scenario-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p {
    text-align: center;
    margin-bottom: 15px;
    color: #495057;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
}

// 注意事项部分
.considerations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.consideration-item {
  display: flex;
  gap: 15px;
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 20px;

  .consideration-icon {
    font-size: 1.8rem;
    min-width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--secondary-color);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
}

// 对比表格
.comparison-table {
  display: grid;
  grid-template-columns: 1fr repeat(4, 0.7fr);
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 20px;
}

.table-header,
.table-row {
  display: contents;

  >div {
    padding: 12px 15px;
    border-bottom: 1px solid var(--gray-light);
  }
}

.table-header {
  >div {
    background: var(--primary-light);
    font-weight: 600;
    text-align: center;
  }
}

.table-row {
  >div {
    padding: 10px 15px;
    text-align: center;

    &:first-child {
      text-align: left;
      font-weight: 500;
    }

    &:nth-child(2) {
      color: var(--success-color);
      font-weight: bold;
    }
  }

  &:nth-child(even)>div {
    background: var(--light-color);
  }

  &:last-child>div {
    border-bottom: none;
  }
}

// 页脚
.footer {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--gray-light);

  .key-points {
    background: var(--primary-light);
    border-radius: var(--border-radius);
    padding: 25px;
    margin-bottom: 25px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        font-weight: 500;
      }
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
      padding: 8px 15px;
      border-radius: 30px;
      border: 1px solid var(--primary-color);

      &:hover {
        background: var(--primary-color);
        color: white;
        text-decoration: none;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px;
  }

  .comparison-table {
    grid-template-columns: 1fr;

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
