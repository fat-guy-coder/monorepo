<template>
  <div class="webcomponent-guide">
    <header class="guide-header">
      <h1>WebComponent 进阶使用指南</h1>
      <p>掌握WebComponent的高级特性和最佳实践</p>
    </header>

    <div class="guide-content">
      <section class="section">
        <h2 class="section-title">核心概念回顾</h2>
        <div class="section-content">
          <div class="concepts-grid">
            <div class="concept-card">
              <div class="concept-icon">C</div>
              <h3>Custom Elements</h3>
              <p>定义新的HTML元素并扩展已有元素</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">S</div>
              <h3>Shadow DOM</h3>
              <p>封装的DOM树，独立于主文档</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">T</div>
              <h3>HTML Templates</h3>
              <p>可重复使用的标记模板</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">E</div>
              <h3>ES Modules</h3>
              <p>现代JavaScript模块系统</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">与其他组件通信</h2>
        <div class="section-content">
          <div class="communication-grid">
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">📤</div>
                <h3>属性传递</h3>
              </div>
              <div class="code-block">
                <pre>&lt;!-- 设置属性 --&gt;
&lt;user-card name="John" age="30"&gt;&lt;/user-card&gt;

&lt;!-- 监听属性变化 --&gt;
static get observedAttributes() {
  return ['name', 'age'];
}

attributeChangedCallback(name, oldVal, newVal) {
  // 处理属性变化
}</pre>
              </div>
            </div>
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">🔔</div>
                <h3>事件通信</h3>
              </div>
              <div class="code-block">
                <pre>// 组件内部发送事件
const event = new CustomEvent('user-selected', {
  detail: { userId: 123 },
  bubbles: true,
  composed: true
});
this.dispatchEvent(event);

// 外部监听事件
document.querySelector('user-card')
  .addEventListener('user-selected', e => {
    console.log('用户选择:', e.detail.userId);
  });</pre>
              </div>
            </div>
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">📦</div>
                <h3>方法调用</h3>
              </div>
              <div class="code-block">
                <pre>class UserCard extends HTMLElement {
  // 定义公共方法
  updateUser(data) {
    // 更新逻辑
  }
}

// 外部调用方法
const userCard = document.querySelector('user-card');
userCard.updateUser({ name: 'Alice' });</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">动态加载与移除</h2>
        <div class="section-content">
          <div class="dynamic-demo">
            <div class="demo-controls">
              <div class="control-group">
                <button @click="loadComponent">
                  {{ componentLoaded ? '组件已加载' : '加载组件' }}
                </button>
                <button @click="removeComponent" :disabled="!componentLoaded">
                  移除组件
                </button>
              </div>
              <div class="control-group">
                <button @click="loadLazyComponent" :disabled="componentLoaded">
                  延迟加载组件
                </button>
                <button @click="toggleTheme" class="theme-toggle">
                  {{ darkTheme ? '浅色主题' : '深色主题' }}
                </button>
              </div>
            </div>

            <div class="demo-area">
              <div v-if="componentLoaded" class="component-container">
                <div class="placeholder-element" :class="{ dark: darkTheme }">
                  <div class="element-header">
                    <div class="element-icon">⚡</div>
                    <h3>用户卡片组件</h3>
                  </div>
                  <div class="element-body">
                    <div class="user-info">
                      <div class="avatar">U</div>
                      <div class="user-details">
                        <div class="user-name">John Doe</div>
                        <div class="user-email">john.doe@example.com</div>
                      </div>
                    </div>
                    <div class="status">
                      <div class="status-indicator active"></div>
                      <span>在线</span>
                    </div>
                  </div>
                  <div class="element-footer">
                    <button @click="simulateEvent">发送消息</button>
                    <button @click="updateComponent">更新资料</button>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state">
                <div class="empty-icon">📭</div>
                <p>组件未加载</p>
              </div>
            </div>

            <div class="demo-console">
              <div class="console-header">
                <span>事件控制台</span>
                <button @click="clearLogs">清空日志</button>
              </div>
              <div class="console-content">
                <div v-for="(log, index) in eventLogs" :key="index" class="log-entry">
                  <span class="log-time">[{{ log.time }}]</span>
                  <span class="log-message">{{ log.message }}</span>
                </div>
                <div v-if="eventLogs.length === 0" class="empty-log">暂无事件记录</div>
              </div>
            </div>
          </div>

          <div class="code-samples">
            <div class="code-sample">
              <h3>动态加载WebComponent</h3>
              <div class="code-block">
                <pre>// 动态加载WebComponent
function loadWebComponent() {
  // 创建组件元素
  const element = document.createElement('user-card');

  // 设置属性
  element.setAttribute('user-id', '12345');

  // 添加到DOM
  document.getElementById('container').appendChild(element);

  // 添加事件监听
  element.addEventListener('user-action', handleUserAction);
}</pre>
              </div>
            </div>
            <div class="code-sample">
              <h3>移除WebComponent</h3>
              <div class="code-block">
                <pre>// 移除WebComponent
function removeWebComponent() {
  const element = document.querySelector('user-card');

  if (element) {
    // 移除事件监听器
    element.removeEventListener('user-action', handleUserAction);

    // 从DOM中移除
    element.parentNode.removeChild(element);

    // 清除引用
    element = null;
  }
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">内部加载JavaScript</h2>
        <div class="section-content">
          <div class="internal-js">
            <div class="method">
              <h3>1. 内联脚本</h3>
              <div class="code-block">
                <pre>class MyComponent extends HTMLElement {
  constructor() {
    super();

    // 创建Shadow DOM
    this.attachShadow({ mode: 'open' });

    // 添加HTML内容（包含内联脚本）
    this.shadowRoot.innerHTML = `
      &lt;div&gt;
        &lt;button id="btn"&gt;点击我&lt;/button&gt;
        &lt;script&gt;
          document.getElementById('btn').addEventListener('click', () => {
            console.log('按钮被点击!');
          });
        &lt;/script&gt;
      &lt;/div&gt;
    `;
  }
}</pre>
              </div>
            </div>

            <div class="method">
              <h3>2. 外部脚本模块</h3>
              <div class="code-block">
                <pre>// 定义WebComponent
class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // 动态加载外部JS
    this.loadExternalScripts();
  }

  async loadExternalScripts() {
    // 加载外部模块
    const module = await import('./external-module.js');

    // 渲染组件内容
    this.shadowRoot.innerHTML = `
      &lt;div&gt;
        &lt;button id="action-btn"&gt;执行操作&lt;/button&gt;
      &lt;/div&gt;
    `;

    // 使用模块功能
    this.shadowRoot.getElementById('action-btn')
      .addEventListener('click', module.doSomething);
  }
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">生命周期与卸载</h2>
        <div class="section-content">
          <div class="lifecycle-grid">
            <div class="lifecycle-card">
              <div class="lifecycle-phase">1</div>
              <h3>connectedCallback</h3>
              <p>当元素首次被插入文档DOM时调用</p>
              <div class="code-block small">
                <pre>connectedCallback() {
  // 初始化操作
  this.setupEventListeners();
  this.loadData();
}</pre>
              </div>
            </div>
            <div class="lifecycle-card">
              <div class="lifecycle-phase">2</div>
              <h3>attributeChangedCallback</h3>
              <p>当元素的属性被添加、移除或更改时调用</p>
              <div class="code-block small">
                <pre>static get observedAttributes() {
  return ['value', 'disabled'];
}

attributeChangedCallback(name, oldVal, newVal) {
  // 处理属性变化
}</pre>
              </div>
            </div>
            <div class="lifecycle-card">
              <div class="lifecycle-phase">3</div>
              <h3>disconnectedCallback</h3>
              <p>当元素从文档DOM中移除时调用</p>
              <div class="code-block small">
                <pre>disconnectedCallback() {
  // 清理操作
  this.removeEventListeners();
  this.cancelPendingRequests();
  this.cleanupResources();
}</pre>
              </div>
            </div>
            <div class="lifecycle-card">
              <div class="lifecycle-phase">4</div>
              <h3>adoptedCallback</h3>
              <p>当元素被移动到新文档时调用</p>
              <div class="code-block small">
                <pre>adoptedCallback() {
  // 处理文档迁移
  console.log('元素被移动到新文档');
}</pre>
              </div>
            </div>
          </div>

          <div class="unmount-section">
            <h3>正确卸载WebComponent</h3>
            <div class="unmount-steps">
              <div class="step">
                <div class="step-number">1</div>
                <p>移除所有事件监听器</p>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <p>取消未完成的异步操作</p>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <p>清理定时器</p>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <p>释放内存引用</p>
              </div>
              <div class="step">
                <div class="step-number">5</div>
                <p>从DOM中移除元素</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">性能优化策略</h2>
        <div class="section-content">
          <div class="optimization-grid">
            <div class="optimization-card">
              <div class="optimization-icon">🚀</div>
              <h3>延迟加载</h3>
              <p>使用动态导入或Intersection Observer</p>
              <div class="code-block small">
                <pre>// 使用Intersection Observer
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    import('./my-component.js');
    observer.disconnect();
  }
});
observer.observe(document.querySelector('#placeholder'));</pre>
              </div>
            </div>
            <div class="optimization-card">
              <div class="optimization-icon">🧠</div>
              <h3>高效渲染</h3>
              <p>使用requestAnimationFrame批量更新</p>
              <div class="code-block small">
                <pre>let updateScheduled = false;

updateData(data) {
  this.data = data;

  if (!updateScheduled) {
    requestAnimationFrame(() => {
      this.render();
      updateScheduled = false;
    });
    updateScheduled = true;
  }
}</pre>
              </div>
            </div>
            <div class="optimization-card">
              <div class="optimization-icon">🧩</div>
              <h3>模块化设计</h3>
              <p>拆分大型组件为小型可复用组件</p>
              <div class="code-block small">
                <pre>// 主组件
&lt;user-profile&gt;
  &lt;user-avatar&gt;&lt;/user-avatar&gt;
  &lt;user-info&gt;&lt;/user-info&gt;
  &lt;user-actions&gt;&lt;/user-actions&gt;
&lt;/user-profile&gt;</pre>
              </div>
            </div>
            <div class="optimization-card">
              <div class="optimization-icon">📊</div>
              <h3>性能监控</h3>
              <p>使用性能API监控关键操作</p>
              <div class="code-block small">
                <pre>connectedCallback() {
  performance.mark('component-start');

  // 初始化操作

  performance.mark('component-end');
  performance.measure(
    'component-init',
    'component-start',
    'component-end'
  );
}</pre>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>使用Shadow DOM实现样式和DOM封装</li>
              <li>通过<code>&lt;slot&gt;</code>实现内容分发</li>
              <li>使用CSS变量提供主题定制能力</li>
              <li>在disconnectedCallback中清理资源</li>
              <li>避免在attributeChangedCallback中执行重操作</li>
              <li>使用ResizeObserver替代resize事件</li>
              <li>优先使用CSS动画而非JavaScript动画</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="guide-footer">
      <p> WebComponent高级使用指南 | 使用Vue 3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const componentLoaded = ref(false);
const eventLogs = ref<{time: string, message: string}[]>([]);
const darkTheme = ref(false);

const loadComponent = () => {
  componentLoaded.value = true;
  addLog('用户卡片组件已加载');
};

const removeComponent = () => {
  componentLoaded.value = false;
  addLog('用户卡片组件已移除');
};

const loadLazyComponent = () => {
  addLog('开始延迟加载组件...');
  setTimeout(() => {
    componentLoaded.value = true;
    addLog('用户卡片组件延迟加载完成');
  }, 1500);
};

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  addLog(`切换到${darkTheme.value ? '深色' : '浅色'}主题`);
};

const simulateEvent = () => {
  addLog('用户操作: 发送消息事件触发');
};

const updateComponent = () => {
  addLog('用户操作: 更新用户资料');
};

const clearLogs = () => {
  eventLogs.value = [];
};

const addLog = (message: string) => {
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  eventLogs.value.push({
    time: timeString,
    message
  });

  // 保持日志长度不超过15条
  if (eventLogs.value.length > 15) {
    eventLogs.value.shift();
  }
};

// 添加键盘快捷键
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && e.ctrlKey) {
      loadComponent();
    } else if (e.key === 'ArrowDown' && e.ctrlKey) {
      removeComponent();
    }
  });
});
</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --success-color: #4ade80;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --light-color: #f8fafc;
  --dark-color: #1e293b;
  --text-color: #334155;
  --border-color: #e2e8f0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

.dark-theme {
  --light-color: #0f172a;
  --dark-color: #f1f5f9;
  --text-color: #cbd5e1;
  --border-color: #334155;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.webcomponent-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--light-color);
  color: var(--text-color);
  line-height: 1.6;
  min-height: 100vh;
  padding: 0 0 40px;
  transition: var(--transition);
}

.guide-header {
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
  color: white;
  margin-bottom: 30px;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1.3rem;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.guide-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  background: var(--dark-color);
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
}

.section-title {
  background: linear-gradient(90deg, #4f6df5, #3a56e6);
  padding: 18px 30px;
  margin: 0;
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
}

.section-content {
  padding: 30px;
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
}

.concept-card {
  background: var(--light-color);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }

  .concept-icon {
    width: 70px;
    height: 70px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    margin: 0 auto 20px;
  }

  h3 {
    margin: 0 0 15px;
    color: var(--dark-color);
    font-size: 1.3rem;
  }

  p {
    color: var(--text-color);
    margin: 0;
    font-size: 1rem;
  }
}

.communication-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.method-card {
  background: var(--light-color);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);

  .method-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: var(--primary-light);
    border-bottom: 1px solid var(--border-color);

    .method-icon {
      font-size: 28px;
      margin-right: 15px;
      width: 50px;
      height: 50px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: var(--dark-color);
    }
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 0;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  &.small {
    font-size: 0.85rem;
    padding: 15px;
  }
}

.dynamic-demo {
  margin-top: 25px;
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;

  .control-group {
    display: flex;
    gap: 15px;

    button {
      padding: 12px 25px;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: var(--transition);
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        background: #cbd5e0;
        cursor: not-allowed;
        transform: none;
      }

      &.active {
        background: var(--success-color);
      }

      &.theme-toggle {
        background: #6366f1;
      }
    }
  }
}

.demo-area {
  min-height: 220px;
  background: var(--light-color);
  border-radius: 12px;
  border: 1px dashed var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  padding: 20px;
}

.placeholder-element {
  width: 320px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: var(--transition);

  &.dark {
    background: #1e293b;
    color: white;
  }

  .element-header {
    background: var(--primary-color);
    color: white;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;

    .element-icon {
      font-size: 24px;
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
    }
  }

  .element-body {
    padding: 25px 20px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;

      .avatar {
        width: 60px;
        height: 60px;
        background: var(--accent-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
      }

      .user-details {
        flex: 1;

        .user-name {
          font-weight: 600;
          font-size: 1.2rem;
          margin-bottom: 5px;
        }

        .user-email {
          font-size: 0.9rem;
          color: var(--text-color);
        }
      }
    }

    .status {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.95rem;

      .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;

        &.active {
          background: var(--success-color);
          box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.3);
        }
      }
    }
  }

  .element-footer {
    padding: 15px 20px;
    background: var(--primary-light);
    display: flex;
    gap: 10px;

    button {
      flex: 1;
      padding: 10px;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      cursor: pointer;
      transition: var(--transition);
      font-weight: 500;

      &:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      &:first-child {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);

        &:hover {
          background: var(--secondary-color);
        }
      }
    }
  }
}

.empty-state {
  text-align: center;
  color: #94a3b8;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 15px;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
  }
}

.demo-console {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  color: #cbd5e1;

  .console-header {
    background: #0f172a;
    padding: 12px 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #334155;
      color: #cbd5e1;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background: #475569;
      }
    }
  }

  .console-content {
    padding: 15px 20px;
    min-height: 120px;
    max-height: 200px;
    overflow-y: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
}

.log-entry {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 10px;

  &:last-child {
    border-bottom: none;
  }

  .log-time {
    color: #94a3b8;
    flex-shrink: 0;
  }

  .log-message {
    flex: 1;
  }
}

.empty-log {
  color: #64748b;
  text-align: center;
  padding: 30px 0;
  font-style: italic;
}

.code-samples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
  margin-top: 40px;
}

.lifecycle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin: 25px 0;
}

.lifecycle-card {
  background: var(--light-color);
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }

  .lifecycle-phase {
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 20px;
  }

  h3 {
    margin: 0 0 15px;
    color: var(--dark-color);
    font-size: 1.2rem;
  }

  p {
    color: var(--text-color);
    margin: 0 0 15px;
    font-size: 0.95rem;
  }
}

.unmount-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);

  h3 {
    margin-top: 0;
    color: var(--dark-color);
    text-align: center;
    margin-bottom: 25px;
  }
}

.unmount-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;

    .step-number {
      width: 50px;
      height: 50px;
      background: var(--warning-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.3rem;
      margin-bottom: 15px;
    }

    p {
      text-align: center;
      margin: 0;
      font-size: 0.95rem;
      color: var(--text-color);
    }
  }
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 25px 0;
}

.optimization-card {
  background: var(--light-color);
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }

  .optimization-icon {
    font-size: 36px;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 15px;
    color: var(--dark-color);
    font-size: 1.2rem;
  }

  p {
    color: var(--text-color);
    margin: 0 0 15px;
    font-size: 0.95rem;
  }
}

.best-practices {
  margin-top: 40px;
  padding: 25px;
  background: var(--primary-light);
  border-radius: 12px;
  border-left: 4px solid var(--primary-color);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--dark-color);
  }

  ul {
    padding-left: 20px;
    margin-bottom: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;

    li {
      margin-bottom: 10px;
      padding-left: 10px;
      position: relative;

      &::before {
        content: '•';
        color: var(--primary-color);
        position: absolute;
        left: -10px;
      }
    }
  }

  code {
    background: rgba(67, 97, 238, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: var(--primary-color);
  }
}

.guide-footer {
  text-align: center;
  padding: 30px;
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 50px;
}

@media (max-width: 768px) {
  .concepts-grid,
  .communication-grid,
  .lifecycle-grid,
  .optimization-grid,
  .code-samples {
    grid-template-columns: 1fr;
  }

  .guide-header {
    padding: 40px 15px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .demo-controls {
    flex-direction: column;
    gap: 15px;

    .control-group {
      flex-wrap: wrap;
    }
  }

  .unmount-steps {
    flex-direction: column;
    align-items: center;
  }
}
</style>
