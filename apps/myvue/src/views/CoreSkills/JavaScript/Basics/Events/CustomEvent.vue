<template>
  <div class="custom-events-guide">
    <header class="guide-header">
      <h1>原生JavaScript自定义事件基本指南</h1>
      <p>掌握浏览器原生事件系统的强大功能</p>
      <div class="event-flow">
        <div class="component emitter">事件发射器</div>
        <div class="event-icon">⚡</div>
        <div class="component listener">事件监听器</div>
      </div>
    </header>

    <main class="guide-content">
      <section class="section">
        <h2 class="section-title">什么是自定义事件？</h2>
        <div class="section-content">
          <div class="definition">
            <p>原生JavaScript自定义事件允许开发者创建和触发自己的事件类型，而不仅限于浏览器内置事件（如click、keydown等）。这种机制提供了强大的解耦能力，使组件间通信更加灵活。</p>

            <div class="comparison">
              <div class="comparison-card">
                <h3>浏览器内置事件</h3>
                <ul>
                  <li>由DOM元素触发（click, focus等）</li>
                  <li>与用户交互直接相关</li>
                  <li>事件类型固定</li>
                </ul>
              </div>
              <div class="comparison-card">
                <h3>自定义事件</h3>
                <ul>
                  <li>由开发者定义和触发</li>
                  <li>可携带任意自定义数据</li>
                  <li>实现组件间解耦通信</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="event-architecture">
            <div class="architecture-diagram">
              <div class="node event-target">EventTarget</div>
              <div class="arrow">▼</div>
              <div class="node element">Element</div>
              <div class="node window">Window</div>
              <div class="node document">Document</div>
              <div class="arrow">▼</div>
              <div class="node custom">自定义事件对象</div>
            </div>
            <div class="architecture-caption">
              <p>JavaScript事件系统基于EventTarget接口，所有DOM元素、window和document对象都继承自它，因此都可以触发和监听自定义事件。</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">核心API与方法</h2>
        <div class="section-content">
          <div class="api-grid">
            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">🎯</div>
                <h3>EventTarget</h3>
              </div>
              <p>所有可接收事件的对象的基础接口</p>
            </div>
            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">📢</div>
                <h3>dispatchEvent()</h3>
              </div>
              <p>向指定事件目标派发事件</p>
            </div>
            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">👂</div>
                <h3>addEventListener()</h3>
              </div>
              <p>注册事件监听器</p>
            </div>
            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">✂️</div>
                <h3>removeEventListener()</h3>
              </div>
              <p>移除事件监听器</p>
            </div>
          </div>

          <div class="code-samples">
            <div class="code-sample">
              <h3>创建自定义事件</h3>
              <div class="code-block">
                <pre>// 使用Event构造函数
const event = new Event('build');

// 使用CustomEvent构造函数（可携带数据）
const event = new CustomEvent('build', {
  detail: {
    time: new Date(),
    message: 'Building started!'
  },
  bubbles: true,
  cancelable: true,
  composed: true
});</pre>
              </div>
            </div>

            <div class="code-sample">
              <h3>触发自定义事件</h3>
              <div class="code-block">
                <pre>// 获取DOM元素
const element = document.getElementById('myElement');

// 创建事件
const event = new CustomEvent('archive', {
  detail: { id: 123 }
});

// 派发事件
element.dispatchEvent(event);</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">完整使用示例</h2>
        <div class="section-content">
          <div class="example-container">
            <div class="example-controls">
              <button @click="triggerSimpleEvent">触发简单事件</button>
              <button @click="triggerCustomEvent">触发自定义事件（携带数据）</button>
              <button @click="triggerGlobalEvent">触发全局事件</button>
            </div>

            <div class="event-log">
              <div class="log-header">
                <h3>事件日志</h3>
                <button @click="clearLogs">清空日志</button>
              </div>
              <div class="log-content">
                <div v-for="(log, index) in eventLogs" :key="index" class="log-entry">
                  <span class="log-time">[{{ log.time }}]</span>
                  <span class="log-type">{{ log.type }}</span>
                  <span class="log-message">{{ log.message }}</span>
                  <span v-if="log.data" class="log-data">{{ log.data }}</span>
                </div>
                <div v-if="eventLogs.length === 0" class="empty-log">暂无事件记录</div>
              </div>
            </div>

            <div class="code-example">
              <h3>事件监听与触发代码</h3>
              <div class="code-block">
                <pre>// 监听简单事件
document.addEventListener('simpleEvent', () => {
  console.log('简单事件被触发');
});

// 监听自定义事件
document.addEventListener('customEvent', (e) => {
  console.log('收到自定义事件:', e.detail);
});

// 触发简单事件
const simpleEvent = new Event('simpleEvent');
document.dispatchEvent(simpleEvent);

// 触发自定义事件
const customEvent = new CustomEvent('customEvent', {
  detail: { message: 'Hello from custom event!' }
});
document.dispatchEvent(customEvent);</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">使用场景与最佳实践</h2>
        <div class="section-content">
          <div class="use-cases">
            <div class="use-case">
              <div class="case-icon">🧩</div>
              <h3>UI组件通信</h3>
              <p>解耦相互依赖的UI组件，通过事件进行通信</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🌐</div>
              <h3>跨框架通信</h3>
              <p>在不同框架（Vue、React等）的应用间传递消息</p>
            </div>
            <div class="use-case">
              <div class="case-icon">📦</div>
              <h3>插件系统</h3>
              <p>创建可扩展的插件架构，通过事件钩子扩展功能</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🔄</div>
              <h3>状态同步</h3>
              <p>在应用不同部分之间同步状态变化</p>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>使用<strong>命名前缀</strong>避免事件冲突（如<code>myapp:userUpdated</code>）</li>
              <li>在<code>detail</code>属性中传递数据，保持事件对象规范</li>
              <li>及时移除不需要的事件监听器，避免内存泄漏</li>
              <li>使用<code>CustomEvent</code>代替基本<code>Event</code>以传递数据</li>
              <li>考虑事件冒泡和捕获阶段的需求</li>
              <li>为事件添加清晰的文档说明</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">自定义事件 vs Vue自定义事件</h2>
        <div class="section-content">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>原生自定义事件</th>
                  <th>Vue自定义事件</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>作用范围</td>
                  <td>整个浏览器环境</td>
                  <td>仅限于Vue组件树</td>
                </tr>
                <tr>
                  <td>通信对象</td>
                  <td>任何DOM元素、window、document</td>
                  <td>父子组件之间</td>
                </tr>
                <tr>
                  <td>数据传递</td>
                  <td>通过<code>detail</code>属性</td>
                  <td>直接作为参数传递</td>
                </tr>
                <tr>
                  <td>事件移除</td>
                  <td>需要手动移除监听器</td>
                  <td>组件销毁时自动移除</td>
                </tr>
                <tr>
                  <td>事件冒泡</td>
                  <td>支持完整冒泡机制</td>
                  <td>不冒泡，仅直接监听</td>
                </tr>
                <tr>
                  <td>适用场景</td>
                  <td>跨应用、跨框架通信</td>
                  <td>Vue组件内部通信</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="integration">
            <h3>在Vue中使用原生自定义事件</h3>
            <div class="code-block">
              <pre>&lt;template&gt;
  &lt;div ref="container"&gt;
    &lt;button @click="sendEvent"&gt;发送事件&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref&lt;HTMLElement | null&gt;(null)

// 发送事件
function sendEvent() {
  const event = new CustomEvent('vue:customEvent', {
    detail: { message: '来自Vue组件的事件' }
  })
  container.value?.dispatchEvent(event)
}

// 监听事件
function handleCustomEvent(e: Event) {
  const event = e as CustomEvent
  console.log('收到事件:', event.detail)
}

onMounted(() => {
  container.value?.addEventListener('vue:customEvent', handleCustomEvent)
})

onBeforeUnmount(() => {
  container.value?.removeEventListener('vue:customEvent', handleCustomEvent)
})
&lt;/script&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">高级模式与技巧</h2>
        <div class="section-content">
          <div class="advanced-techniques">
            <div class="technique">
              <h3>事件委托模式</h3>
              <p>在父元素上监听子元素触发的事件，提高性能</p>
              <div class="code-block">
                <pre>// 在父元素上监听
document.getElementById('parent').addEventListener('customEvent', (e) => {
  // 检查事件来源
  if (e.target.matches('.child-element')) {
    console.log('子元素事件:', e.detail);
  }
});</pre>
              </div>
            </div>

            <div class="technique">
              <h3>创建事件总线</h3>
              <p>实现全局事件通信系统</p>
              <div class="code-block">
                <pre>// 创建事件总线
const eventBus = new EventTarget();

// 发送事件
function emitEvent(type, data) {
  const event = new CustomEvent(type, { detail: data });
  eventBus.dispatchEvent(event);
}

// 监听事件
function onEvent(type, callback) {
  eventBus.addEventListener(type, (e) => {
    callback(e.detail);
  });
}

// 使用
onEvent('notification', handleNotification);
emitEvent('notification', { message: 'Hello!' });</pre>
              </div>
            </div>

            <div class="technique">
              <h3>事件优先级系统</h3>
              <p>实现可中断的事件流</p>
              <div class="code-block">
                <pre>// 创建可取消的事件
const event = new CustomEvent('process', {
  detail: { data: '...' },
  cancelable: true
});

// 派发事件
const canceled = !element.dispatchEvent(event);

// 检查是否被取消
if (canceled) {
  console.log('事件被取消');
}

// 监听器中取消事件
element.addEventListener('process', (e) => {
  if (shouldCancel(e.detail)) {
    e.preventDefault();
  }
});</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="guide-footer">
      <div class="footer-content">
        <div class="footer-logo">Native Custom Events</div>
        <div class="footer-links">
          <a href="#" class="footer-link">MDN文档</a>
          <a href="#" class="footer-link">示例代码</a>
          <a href="#" class="footer-link">GitHub仓库</a>
        </div>
        <div class="footer-copyright">
          © 2023 原生JavaScript事件系统指南 | 使用Vue 3实现
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const eventLogs = ref<{
  time: string,
  type: string,
  message: string,
  data?: string
}[]>([]);

// 触发简单事件
const triggerSimpleEvent = () => {
  const event = new Event('simpleEvent');
  document.dispatchEvent(event);
  addLog('simpleEvent', '简单事件已触发');
};

// 触发自定义事件
const triggerCustomEvent = () => {
  const event = new CustomEvent('customEvent', {
    detail: {
      message: '来自自定义事件的数据',
      timestamp: new Date().toISOString()
    }
  });
  document.dispatchEvent(event);
  addLog('customEvent', '自定义事件已触发', JSON.stringify(event.detail, null, 2));
};

// 触发全局事件
const triggerGlobalEvent = () => {
  const event = new CustomEvent('globalEvent', {
    detail: {
      source: '全局事件系统',
      data: Math.random().toString(36).substring(2, 9)
    }
  });
  window.dispatchEvent(event);
  addLog('globalEvent', '全局事件已触发', JSON.stringify(event.detail, null, 2));
};

// 添加日志
const addLog = (type: string, message: string, data?: string) => {
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  eventLogs.value.push({
    time: timeString,
    type,
    message,
    data
  });

  // 保持最多15条日志
  if (eventLogs.value.length > 15) {
    eventLogs.value.shift();
  }
};

// 清空日志
const clearLogs = () => {
  eventLogs.value = [];
};

// 监听事件
onMounted(() => {
  // 监听简单事件
  document.addEventListener('simpleEvent', () => {
    addLog('simpleEvent', '收到简单事件');
  });

  // 监听自定义事件
  document.addEventListener('customEvent', (e) => {
    const event = e as CustomEvent;
    addLog('customEvent', '收到自定义事件', JSON.stringify(event.detail, null, 2));
  });

  // 监听全局事件
  window.addEventListener('globalEvent', (e) => {
    const event = e as CustomEvent;
    addLog('globalEvent', '收到全局事件', JSON.stringify(event.detail, null, 2));
  });
});

// 清理事件监听器（实际项目中需要，这里演示不需要）
onBeforeUnmount(() => {
  document.removeEventListener('simpleEvent', () => {});
  document.removeEventListener('customEvent', () => {});
  window.removeEventListener('globalEvent', () => {});
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
  --error-color: #ef4444;
  --light-color: #f8fafc;
  --dark-color: #1e293b;
  --text-color: #334155;
  --border-color: #e2e8f0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

.custom-events-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--light-color);
  color: var(--text-color);
  line-height: 1.6;
  min-height: 100vh;
  padding: 0 0 40px;
}

.guide-header {
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
  color: white;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;

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

.event-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 40px;

  .component {
    width: 180px;
    height: 120px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 20px;
    text-align: center;
  }

  .event-icon {
    font-size: 40px;
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
}

.guide-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  background: white;
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

.definition {
  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
    line-height: 1.8;
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 30px;

  .comparison-card {
    background: var(--primary-light);
    border-radius: 12px;
    padding: 25px;
    border-left: 4px solid var(--primary-color);

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
        }
      }
    }
  }
}

.event-architecture {
  margin-top: 40px;

  .architecture-diagram {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    gap: 20px;
    justify-items: center;
    margin-bottom: 20px;

    .node {
      width: 140px;
      height: 80px;
      background: white;
      border: 2px solid var(--primary-color);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-weight: 600;
      padding: 10px;
      box-shadow: var(--card-shadow);
    }

    .event-target {
      grid-column: span 4;
      background: var(--primary-light);
    }

    .arrow {
      font-size: 24px;
      color: var(--primary-color);
      grid-column: span 4;
    }

    .custom {
      grid-column: span 4;
      background: #f0f7ff;
      border-color: var(--accent-color);
    }
  }

  .architecture-caption {
    text-align: center;
    font-style: italic;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.api-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  transition: var(--transition);
  box-shadow: var(--card-shadow);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }

  .api-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;

    .api-icon {
      font-size: 28px;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: var(--secondary-color);
    }
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.code-samples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.code-sample {
  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }
}

.code-block {
  background: #1e293b;
  color: #cbd5e1;
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.example-container {
  margin-top: 20px;
}

.example-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;

  button {
    padding: 12px 25px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);
    font-size: 1rem;

    &:hover {
      background: var(--secondary-color);
      transform: translateY(-2px);
    }
  }
}

.event-log {
  background: white;
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
  margin-bottom: 30px;

  .log-header {
    background: linear-gradient(90deg, #4f6df5, #3a56e6);
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      color: white;
      font-size: 1.2rem;
    }

    button {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 15px;
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .log-content {
    padding: 20px;
    max-height: 300px;
    overflow-y: auto;
  }
}

.log-entry {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: 80px 120px 1fr;
  gap: 15px;
  align-items: center;
  font-size: 0.95rem;

  &:last-child {
    border-bottom: none;
  }

  .log-time {
    color: var(--primary-color);
    font-weight: 500;
  }

  .log-type {
    background: var(--primary-light);
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    text-align: center;
  }

  .log-data {
    grid-column: span 3;
    background: #f8fafc;
    padding: 10px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    margin-top: 8px;
    white-space: pre-wrap;
  }
}

.empty-log {
  text-align: center;
  padding: 30px 0;
  color: #94a3b8;
  font-style: italic;
}

.code-example {
  margin-top: 30px;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.use-case {
  text-align: center;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .case-icon {
    font-size: 40px;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  h3 {
    margin: 0 0 10px;
    color: var(--secondary-color);
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.best-practices {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--primary-color);

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 20px;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 0;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 30px;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 40px;
  box-shadow: var(--card-shadow);
  border-radius: 12px;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      background: var(--primary-light);
      color: var(--secondary-color);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    tr:hover {
      background: #f0f7ff;
    }
  }
}

.integration {
  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 15px;
  }
}

.advanced-techniques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.technique {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--card-shadow);

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p {
    margin-bottom: 15px;
    color: var(--text-color);
  }
}

.guide-footer {
  margin-top: 60px;
  padding: 40px 20px 20px;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 15px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 20px;

    .footer-link {
      color: var(--primary-color);
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .guide-header {
    padding: 40px 15px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .comparison {
    grid-template-columns: 1fr;
  }

  .event-flow {
    flex-direction: column;
    gap: 20px;

    .event-icon {
      transform: rotate(90deg);
    }
  }

  .code-samples {
    grid-template-columns: 1fr;
  }

  .example-controls {
    flex-direction: column;
  }
}
</style>
