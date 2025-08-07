<template>
  <div class="pub-sub-container">
    <header class="header">
      <h1>发布订阅模式实现</h1>
      <p>深入理解事件驱动架构的核心设计模式</p>
    </header>

    <div class="content">
      <!-- 概念介绍部分 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>发布订阅模式介绍</h2>
        </div>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>什么是发布订阅模式？</h3>
            <p>发布订阅模式是一种消息范式，消息的发送者（发布者）不会直接将消息发送给特定的接收者（订阅者），而是通过消息通道广播消息，订阅者接收感兴趣的消息。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">⚙️</div>
            <h3>核心组件</h3>
            <ul>
              <li><strong>发布者(Publisher)</strong>：事件触发者</li>
              <li><strong>订阅者(Subscriber)</strong>：事件监听者</li>
              <li><strong>事件通道(Event Channel)</strong>：管理事件和订阅关系</li>
              <li><strong>事件(Event)</strong>：带有类型和数据的消息</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="concept-icon">💡</div>
            <h3>主要优势</h3>
            <ul>
              <li>组件间解耦</li>
              <li>异步通信能力</li>
              <li>一对多消息广播</li>
              <li>动态添加/移除订阅者</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🌐</div>
            <h3>应用场景</h3>
            <ul>
              <li>Vue Event Bus</li>
              <li>Node.js EventEmitter</li>
              <li>消息队列系统</li>
              <li>前端框架状态管理</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 实现思路部分 -->
      <section class="implementation-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>实现思路</h2>
        </div>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>创建事件中心</h3>
              <p>构建一个事件通道(Event Channel)作为消息中介</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>订阅事件</h3>
              <p>订阅者注册回调函数到特定事件类型</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>发布事件</h3>
              <p>发布者触发事件，事件中心通知所有订阅者</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>取消订阅</h3>
              <p>订阅者不再接收事件时移除回调函数</p>
            </div>
          </div>
        </div>

        <div class="structure-diagram">
          <h3>架构示意图</h3>
          <div class="diagram">
            <div class="publisher">
              <div>发布者</div>
              <div class="publish-btn" @click="publishEvent">发布事件</div>
            </div>

            <div class="event-channel">
              <div class="channel-header">事件通道</div>
              <div class="events-list">
                <div v-for="(event, index) in eventLog" :key="index" class="event-item">
                  {{ event }}
                </div>
              </div>
            </div>

            <div class="subscribers">
              <div class="subscriber" v-for="(sub, index) in subscribers" :key="index">
                <div>订阅者 {{ index + 1 }}</div>
                <div class="messages">
                  <div v-for="(msg, i) in sub.messages" :key="i" class="message">
                    {{ msg }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码实现部分 -->
      <section class="code-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>代码实现</h2>
        </div>

        <div class="code-implementation">
          <div class="code-tabs">
            <button
              v-for="tab in codeTabs"
              :key="tab.id"
              :class="{ active: activeCodeTab === tab.id }"
              @click="activeCodeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="code-content">
            <div v-if="activeCodeTab === 'typescript'" class="ts-code">
              <h3>TypeScript 实现</h3>
              <pre><code>class EventBus {
  private events: Record&lt;string, Function[]&gt; = {};

  // 订阅事件
  subscribe(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // 返回取消订阅函数
    return () => {
      this.unsubscribe(eventName, callback);
    };
  }

  // 发布事件
  publish(eventName: string, ...args: any[]) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach(callback => {
        callback(...args);
      });
    }
  }

  // 取消订阅
  unsubscribe(eventName: string, callback: Function) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      this.events[eventName] = callbacks.filter(cb => cb !== callback);
    }
  }

  // 一次性订阅
  once(eventName: string, callback: Function) {
    const onceWrapper = (...args: any[]) => {
      callback(...args);
      this.unsubscribe(eventName, onceWrapper);
    };
    this.subscribe(eventName, onceWrapper);
  }
}

// 创建全局事件总线
export const eventBus = new EventBus();</code></pre>
            </div>

            <div v-if="activeCodeTab === 'vue'" class="vue-code">
              <h3>在 Vue 中使用</h3>
              <pre><code>// 组件A - 发布事件
import { eventBus } from './eventBus';

export default {
  setup() {
    const handleClick = () => {
      // 发布 'message' 事件
      eventBus.publish('message', 'Hello from Component A!');
    };

    return { handleClick };
  }
}

// 组件B - 订阅事件
import { onMounted, onUnmounted } from 'vue';
import { eventBus } from './eventBus';

export default {
  setup() {
    const messages = ref&lt;string[]&gt;([]);

    const messageHandler = (msg: string) => {
      messages.value.push(msg);
    };

    onMounted(() => {
      // 订阅 'message' 事件
      eventBus.subscribe('message', messageHandler);
    });

    onUnmounted(() => {
      // 组件卸载时取消订阅
      eventBus.unsubscribe('message', messageHandler);
    });

    return { messages };
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 实际演示部分 -->
      <section class="demo-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>实际演示</h2>
        </div>

        <div class="demo-container">
          <div class="demo-controls">
            <button class="publish-btn" @click="publishMessage">
              发布消息事件
            </button>
            <button class="publish-btn" @click="publishAlert">
              发布警告事件
            </button>
            <button class="subscribe-btn" @click="addSubscriber">
              添加订阅者
            </button>
          </div>

          <div class="subscribers-demo">
            <div
              v-for="(sub, index) in demoSubscribers"
              :key="sub.id"
              class="subscriber-card"
            >
              <div class="subscriber-header">
                订阅者 #{{ index + 1 }}
                <button class="unsubscribe-btn" @click="removeSubscriber(sub.id)">
                  取消订阅
                </button>
              </div>
              <div class="messages-container">
                <div
                  v-for="(msg, i) in sub.messages"
                  :key="i"
                  class="message"
                  :class="{'message-warning': msg.type === 'warning'}"
                >
                  {{ msg.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 简单的事件总线实现
class EventBus {
  private events: Record<string, Function[]> = {};

  subscribe(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // 返回取消订阅函数
    return () => {
      this.unsubscribe(eventName, callback);
    };
  }

  publish(eventName: string, ...args: any[]) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach(callback => {
        callback(...args);
      });
    }
  }

  unsubscribe(eventName: string, callback: Function) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      this.events[eventName] = callbacks.filter(cb => cb !== callback);
    }
  }
}

const subscribers = ref<Array<{
  id: number;
  messages: Array<{type: string; text: string}>;
}>>([]);

// 创建全局事件总线实例
const eventBus = new EventBus();

// 代码标签页
const codeTabs = [
  { id: 'typescript', label: 'TypeScript实现' },
  { id: 'vue', label: 'Vue中使用' }
];
const activeCodeTab = ref('typescript');

// 演示数据
const demoSubscribers = ref<Array<{
  id: number;
  messages: Array<{type: string; text: string}>;
}>>([]);

const eventLog = ref<string[]>([]);
const subscriberId = ref(1);

// 添加订阅者
const addSubscriber = () => {
  const id = subscriberId.value++;
  const messages: Array<{type: string; text: string}> = [];

  // 订阅消息事件
  const unsubscribeMessage = eventBus.subscribe('message', (text: string) => {
    messages.push({ type: 'info', text });
  });

  // 订阅警告事件
  const unsubscribeWarning = eventBus.subscribe('warning', (text: string) => {
    messages.push({ type: 'warning', text });
  });

  demoSubscribers.value.push({
    id,
    messages
  });

  eventLog.value.push(`订阅者 #${id} 已注册`);
};

// 移除订阅者
const removeSubscriber = (id: number) => {
  demoSubscribers.value = demoSubscribers.value.filter(sub => sub.id !== id);
  eventLog.value.push(`订阅者 #${id} 已取消订阅`);
};

// 发布消息事件
const publishMessage = () => {
  const text = `消息事件 ${new Date().toLocaleTimeString()}`;
  eventBus.publish('message', text);
  eventLog.value.push(`发布消息: ${text}`);
};

// 发布警告事件
const publishAlert = () => {
  const text = `警告事件 ${new Date().toLocaleTimeString()}`;
  eventBus.publish('warning', text);
  eventLog.value.push(`发布警告: ${text}`);
};

// 发布示例事件
const publishEvent = () => {
  publishMessage();
};

// 初始添加两个订阅者
onMounted(() => {
  addSubscriber();
  addSubscriber();
});
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4895ef;
@info-color: #4cc9f0;
@warning-color: #ff9e00;
@success-color: #06d6a0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;

.pub-sub-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: linear-gradient(120deg, @primary-color, @secondary-color);
  border-radius: 16px;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid @primary-color;

  .icon {
    font-size: 2rem;
    background: @primary-color;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.5rem;
}

.concept-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  h3 {
    color: @secondary-color;
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  ul {
    padding-left: 1.2rem;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.implementation-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.step {
  display: flex;
  background: @card-bg;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  .step-number {
    width: 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1.2rem;
    flex-shrink: 0;
  }

  .step-content {
    h3 {
      color: @secondary-color;
      margin-bottom: 0.8rem;
      font-size: 1.3rem;
    }
  }
}

.structure-diagram {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  margin-top: 2rem;

  h3 {
    text-align: center;
    color: @secondary-color;
    margin-bottom: 1.5rem;
  }
}

.diagram {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 1.5rem;
  min-height: 400px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.publisher, .event-channel, .subscribers {
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.publisher {
  background: fade(@info-color, 10%);
  border: 2px solid @info-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .publish-btn {
    background: @info-color;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken(@info-color, 10%);
      transform: translateY(-2px);
    }
  }
}

.event-channel {
  background: fade(@primary-color, 10%);
  border: 2px solid @primary-color;

  .channel-header {
    text-align: center;
    font-weight: bold;
    color: @primary-color;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }
}

.events-list {
  height: 330px;
  overflow-y: auto;

  .event-item {
    background: white;
    border-radius: 6px;
    padding: 0.8rem;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
}

.subscribers {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  overflow-y: auto;
}

.subscriber {
  background: fade(@success-color, 10%);
  border: 2px solid @success-color;
  border-radius: 10px;
  padding: 1rem;

  .messages {
    margin-top: 1rem;
    height: 120px;
    overflow-y: auto;

    .message {
      background: white;
      border-radius: 6px;
      padding: 0.6rem;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
    }
  }
}

.code-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  button {
    padding: 0.8rem 1.5rem;
    background: @light-bg;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: lighten(@primary-color, 40%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
    }
  }
}

.code-content {
  background: #2b2d42;
  border-radius: 12px;
  overflow: hidden;

  h3 {
    color: white;
    padding: 1rem 1.5rem;
    background: #34374c;
    margin: 0;
    font-size: 1.2rem;
  }
}

pre {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #f8f9fa;
  }
}

.demo-container {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
}

.demo-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  .publish-btn {
    background: @primary-color;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken(@primary-color, 10%);
      transform: translateY(-2px);
    }
  }

  .subscribe-btn {
    background: @success-color;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken(@success-color, 10%);
      transform: translateY(-2px);
    }
  }
}

.subscribers-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.subscriber-card {
  background: @light-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .subscriber-header {
    background: @primary-color;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .unsubscribe-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.messages-container {
  padding: 1rem;
  height: 200px;
  overflow-y: auto;

  .message {
    background: white;
    border-radius: 8px;
    padding: 0.8rem;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &.message-warning {
      border-left: 4px solid @warning-color;
      background: fade(@warning-color, 10%);
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .diagram {
    grid-template-columns: 1fr;

    .publisher, .event-channel, .subscribers {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
