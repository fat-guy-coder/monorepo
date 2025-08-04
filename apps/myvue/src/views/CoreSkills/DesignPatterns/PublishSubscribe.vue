<template>
  <div class="observer-pattern-page">
    <header class="header">
      <h1>发布订阅模式基本介绍</h1>
      <p class="subtitle">解耦系统组件，实现高效事件通信</p>
      <div class="pattern-animation">
        <div class="publisher">发布者</div>
        <div class="event-bus">
          <div class="event">事件总线</div>
          <div class="event-flow">
            <div v-for="n in 5" :key="n" class="event-dot" :style="eventAnimation(n)"></div>
          </div>
        </div>
        <div class="subscribers">
          <div v-for="n in 3" :key="n" class="subscriber" :style="subscriberAnimation(n)">
            订阅者{{ n }}
          </div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 概念解释 -->
      <section class="concept-section card">
        <h2 class="section-title">
          <span class="icon">📚</span> 基本概念
        </h2>
        <div class="definition">
          <p><strong>发布订阅模式</strong>是一种消息传递范式，其中消息的发送者（发布者）不直接将消息发送给特定的接收者（订阅者），而是通过一个中间件（通常称为事件总线或消息代理）来传递消息。</p>
        </div>
        <div class="core-principles">
          <h3>核心原则</h3>
          <ul>
            <li>
              <div class="principle-card">
                <div class="principle-icon">🔌</div>
                <div>
                  <strong>解耦</strong> - 发布者和订阅者不需要知道彼此的存在
                </div>
              </div>
            </li>
            <li>
              <div class="principle-card">
                <div class="principle-icon">🔄</div>
                <div>
                  <strong>异步通信</strong> - 事件可以异步处理
                </div>
              </div>
            </li>
            <li>
              <div class="principle-card">
                <div class="principle-icon">📡</div>
                <div>
                  <strong>一对多传播</strong> - 一个事件可以通知多个订阅者
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- 设计思路 -->
      <section class="design-section card">
        <h2 class="section-title">
          <span class="icon">🧩</span> 设计思路
        </h2>

        <div class="architecture-diagram">
          <div class="diagram-title">发布订阅模式架构图</div>
          <div class="diagram-content">
            <div class="publisher-box">
              <div>发布者</div>
              <div class="publish-action">publish(event, data)</div>
            </div>

            <div class="event-channel">
              <div class="event-bus-core">
                <div class="event-registration">
                  <div class="event-title">事件总线</div>
                  <div class="event-list">
                    <div v-for="(event, index) in events" :key="index" class="event-item">
                      <span class="event-name">{{ event.name }}</span>
                      <span class="subscriber-count">{{ event.subscribers }} 订阅者</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="subscriber-boxes">
              <div class="subscriber-box" v-for="n in 3" :key="n">
                <div>订阅者{{ n }}</div>
                <div class="subscribe-action">subscribe(event, callback)</div>
              </div>
            </div>
          </div>

          <div class="data-flow">
            <div class="arrow publish-arrow">发布事件 →</div>
            <div class="arrow subscribe-arrow">← 订阅事件</div>
          </div>
        </div>

        <div class="implementation-steps">
          <h3>实现步骤</h3>
          <ol>
            <li v-for="(step, index) in implementationSteps" :key="index">
              <div class="step-card">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">
                  <strong>{{ step.title }}</strong> - {{ step.description }}
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases-section card">
        <h2 class="section-title">
          <span class="icon">🚀</span> 使用场景
        </h2>

        <div class="use-cases-grid">
          <div v-for="(useCase, index) in useCases" :key="index" class="use-case-card">
            <div class="use-case-icon">{{ useCase.icon }}</div>
            <div class="use-case-content">
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
              <div class="example">{{ useCase.example }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点分析 -->
      <section class="pros-cons-section card">
        <h2 class="section-title">
          <span class="icon">⚖️</span> 优缺点分析
        </h2>

        <div class="comparison-container">
          <div class="pros-section">
            <h3 class="pros-header">✅ 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index" class="pro">
                <div class="pro-content">{{ pro }}</div>
              </li>
            </ul>
          </div>

          <div class="cons-section">
            <h3 class="cons-header">❌ 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index" class="con">
                <div class="con-content">{{ con }}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 代码示例 -->
      <section class="code-section card">
        <h2 class="section-title">
          <span class="icon">💻</span> 代码实现示例
        </h2>

        <div class="code-example">
          <pre class="code-block">// 简单事件总线实现
class EventBus {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 发布事件
  publish(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }

  // 取消订阅
  unsubscribe(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
}

// 使用示例
const bus = new EventBus();

// 订阅者
bus.subscribe('message', (data) => {
  console.log(`收到消息: ${data}`);
});

// 发布者
bus.publish('message', '你好，发布订阅模式！');</pre>
        </div>
      </section>

      <!-- INSERT_YOUR_CODE -->
      <!-- 发布订阅模式 vs 观察者模式 区别介绍 -->
      <section class="compare-section card">
        <h2 class="section-title">
          <span class="icon">🔍</span> 发布订阅模式 vs 观察者模式
        </h2>
        <div class="compare-content">
          <div class="compare-table">
            <table>
              <thead>
                <tr>
                  <th>对比项</th>
                  <th>发布订阅模式</th>
                  <th>观察者模式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>中介者</td>
                  <td>有独立的事件中心（事件总线）作为中介</td>
                  <td>无中介，主题与观察者直接关联</td>
                </tr>
                <tr>
                  <td>耦合度</td>
                  <td>发布者与订阅者完全解耦</td>
                  <td>主题与观察者之间存在依赖</td>
                </tr>
                <tr>
                  <td>通信方式</td>
                  <td>通过事件名进行广播，订阅者自行选择感兴趣的事件</td>
                  <td>主题主动通知所有注册的观察者</td>
                </tr>
                <tr>
                  <td>应用场景</td>
                  <td>复杂系统、跨模块/跨服务通信</td>
                  <td>对象间一对多依赖、状态同步</td>
                </tr>
                <tr>
                  <td>典型实现</td>
                  <td>EventBus、消息队列、Vue事件机制</td>
                  <td>Vue响应式、DOM事件监听</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="compare-summary">
            <p>
              <strong>总结：</strong>发布订阅模式通过引入事件中心实现了更彻底的解耦，适用于更复杂的场景；而观察者模式结构更简单，适合对象间直接依赖的场景。
            </p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 设计模式基本介绍 | 发布订阅模式是构建松散耦合、可扩展系统的强大工具</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 模拟数据
const events = ref([
  { name: 'user_created', subscribers: 3 },
  { name: 'order_updated', subscribers: 2 },
  { name: 'payment_received', subscribers: 4 },
]);

const implementationSteps = ref([
  { title: '创建事件总线', description: '实现一个集中处理事件注册和分发的中心' },
  { title: '订阅事件', description: '组件向事件总线注册对特定事件的兴趣' },
  { title: '发布事件', description: '当业务动作发生时发布事件到事件总线' },
  { title: '事件分发', description: '事件总线将事件分发给所有订阅该事件的组件' },
]);

const useCases = ref([
  {
    icon: '🌐',
    title: '微服务通信',
    description: '在分布式系统中实现服务间的解耦通信',
    example: '订单服务发布订单创建事件，库存服务和通知服务订阅该事件'
  },
  {
    icon: '🖥️',
    title: '前端组件通信',
    description: '跨组件通信，尤其是非父子关系的组件',
    example: 'Vue Event Bus，React Context + useReducer'
  },
  {
    icon: '📱',
    title: '实时应用',
    description: '需要实时更新的应用如聊天、推送通知',
    example: '消息发布后实时推送给所有在线用户'
  },
  {
    icon: '🔄',
    title: '状态管理',
    description: '状态变化时通知所有依赖组件',
    example: 'Vuex, Redux的核心通信机制'
  },
]);

const pros = ref([
  '组件间高度解耦，增强系统可维护性',
  '支持一对多通信，简化复杂交互场景',
  '发布者和订阅者生命周期可以独立管理',
  '易于扩展，新订阅者无需修改发布者代码',
  '支持异步处理，提高系统响应性能'
]);

const cons = ref([
  '过度使用可能导致事件流难以追踪',
  '调试相对困难，事件触发源不易定位',
  '订阅者执行顺序不可控可能导致竞态条件',
  '不当使用可能造成内存泄漏（未取消订阅）',
  '事件命名冲突可能导致意外行为'
]);

// 动画逻辑
let animationFrame: number;
const eventDots = ref([0, 0, 0, 0, 0]);

onMounted(() => {
  animateEvents();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
});

function animateEvents() {
  eventDots.value = eventDots.value.map((position, index) => {
    return (position + 0.005 + index * 0.001) % 1;
  });
  animationFrame = requestAnimationFrame(animateEvents);
}

function eventAnimation(index: number) {
  const position = eventDots.value[index - 1];
  return {
    left: `${position * 100}%`,
    opacity: `${1 - Math.abs(position - 0.5) * 2}`,
    animationDelay: `${index * 0.2}s`
  };
}

function subscriberAnimation(index: number) {
  return {
    animationDelay: `${index * 0.3}s`
  };
}
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@shadow-color: rgba(0, 0, 0, 0.1);
@success-color: #27ae60;
@warning-color: #f39c12;

.observer-pattern-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @background-color;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.8rem;
    margin: 0;
    color: @primary-color;
    position: relative;
    padding-bottom: 15px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 5px;
      background: linear-gradient(90deg, @primary-color, @secondary-color);
      border-radius: 3px;
    }
  }

  .subtitle {
    font-size: 1.4rem;
    color: lighten(@text-color, 20%);
    margin-top: 15px;
    font-weight: 300;
  }
}

.pattern-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  max-width: 800px;
  height: 200px;
  position: relative;

  .publisher,
  .subscriber,
  .event {
    padding: 15px 25px;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 4px 15px @shadow-color;
    position: relative;
    z-index: 2;
  }

  .publisher {
    background: linear-gradient(135deg, @primary-color, #2980b9);
    color: white;
    animation: pulse 2s infinite;
  }

  .event-bus {
    margin: 0 50px;
    position: relative;

    .event {
      background: linear-gradient(135deg, @secondary-color, #27ae60);
      color: white;
    }

    .event-flow {
      position: absolute;
      top: 60px;
      width: 100%;
      height: 5px;
      background: @border-color;
      border-radius: 5px;
      overflow: hidden;

      .event-dot {
        position: absolute;
        top: -8px;
        width: 20px;
        height: 20px;
        background: @accent-color;
        border-radius: 50%;
        animation: event-flow 3s infinite linear;
      }
    }
  }

  .subscribers {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .subscriber {
      background: linear-gradient(135deg, #9b59b6, #8e44ad);
      color: white;
      animation: bounce 1.5s infinite;
    }
  }
}

.content-container {
  display: grid;
  gap: 30px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, @primary-color, @secondary-color);
  }
}

.section-title {
  font-size: 1.8rem;
  color: @primary-color;
  margin-top: 0;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid lighten(@primary-color, 40%);
  display: flex;
  align-items: center;

  .icon {
    margin-right: 15px;
    font-size: 1.5em;
  }
}

// 概念部分样式
.concept-section {
  .definition {
    background: lighten(@primary-color, 48%);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
    border-left: 4px solid @primary-color;

    p {
      margin: 0;
      line-height: 1.7;
      font-size: 1.1rem;

      strong {
        color: @primary-color;
      }
    }
  }

  .core-principles {
    h3 {
      color: @secondary-color;
      margin-top: 0;
    }

    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .principle-card {
      display: flex;
      align-items: center;
      padding: 15px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .principle-icon {
        font-size: 1.8rem;
        margin-right: 15px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: lighten(@primary-color, 40%);
        border-radius: 50%;
      }
    }
  }
}

// 设计思路部分样式
.design-section {
  .architecture-diagram {
    background: #f8fafc;
    border: 1px solid @border-color;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 30px;
    position: relative;

    .diagram-title {
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      color: @primary-color;
    }

    .diagram-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 200px;
    }

    .publisher-box,
    .subscriber-box {
      background: @card-bg;
      border: 2px solid @primary-color;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      width: 150px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 2;
    }

    .publisher-box {
      background: lighten(@primary-color, 40%);
    }

    .subscriber-boxes {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .subscriber-box {
        background: lighten(#9b59b6, 40%);
        border-color: #9b59b6;
      }
    }

    .event-channel {
      flex: 1;
      margin: 0 20px;
      position: relative;
      z-index: 1;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, lighten(@secondary-color, 40%), lighten(@primary-color, 45%));
        border-radius: 10px;
        z-index: -1;
      }
    }

    .event-bus-core {
      padding: 20px;

      .event-title {
        font-weight: bold;
        color: @secondary-color;
        margin-bottom: 15px;
        text-align: center;
      }
    }

    .event-list {
      .event-item {
        background: white;
        padding: 10px 15px;
        margin-bottom: 10px;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        border-left: 3px solid @primary-color;

        .event-name {
          font-weight: 500;
        }

        .subscriber-count {
          color: @success-color;
          font-weight: bold;
        }
      }
    }

    .data-flow {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;

      .arrow {
        background: @accent-color;
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 0.9rem;
      }
    }
  }

  .implementation-steps {
    ol {
      list-style: none;
      padding: 0;
      counter-reset: step-counter;
    }

    .step-card {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      background: lighten(@primary-color, 48%);
      border-radius: 8px;
      padding: 20px;
      transition: all 0.3s;

      &:hover {
        background: lighten(@primary-color, 44%);
        transform: translateX(5px);
      }
    }

    .step-number {
      background: @primary-color;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 20px;
      flex-shrink: 0;
    }

    .step-content {
      strong {
        color: darken(@primary-color, 10%);
      }
    }
  }
}

// 使用场景部分样式
.use-cases-section {
  .use-cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .use-case-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-7px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
  }

  .use-case-icon {
    font-size: 2.5rem;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
  }

  .use-case-content {
    padding: 20px;
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      color: @primary-color;
    }

    p {
      margin-top: 0;
      color: lighten(@text-color, 15%);
    }

    .example {
      margin-top: 10px;
      padding: 10px;
      background: lighten(@secondary-color, 50%);
      border-radius: 6px;
      font-size: 0.9rem;
      font-style: italic;
    }
  }
}

// 优缺点部分样式
.pros-cons-section {
  .comparison-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros-header,
  .cons-header {
    padding: 15px;
    text-align: center;
    border-radius: 8px 8px 0 0;
    margin: 0;
  }

  .pros-header {
    background: linear-gradient(135deg, @secondary-color, darken(@secondary-color, 10%));
    color: white;
  }

  .cons-header {
    background: linear-gradient(135deg, #e74c3c, darken(#e74c3c, 10%));
    color: white;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .pro,
  .con {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 6px;
    position: relative;
    padding-left: 55px;

    &::before {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.5rem;
    }
  }

  .pro {
    background: lighten(@secondary-color, 50%);
    border-left: 4px solid @secondary-color;

    &::before {
      content: '✓';
      color: @secondary-color;
    }
  }

  .con {
    background: lighten(#e74c3c, 43%);
    border-left: 4px solid #e74c3c;

    &::before {
      content: '✗';
      color: #e74c3c;
    }
  }
}

// 代码示例部分样式
.code-section {
  .code-example {
    background: #2d2d2d;
    border-radius: 8px;
    overflow: hidden;
  }

  .code-block {
    padding: 25px;
    color: #f8f8f2;
    background: #2d2d2d;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    overflow-x: auto;
    margin: 0;

    // 模拟代码高亮
    :first-child {
      color: #f92672; // 类名
    }

    :nth-child(2) {
      color: #a6e22e; // 方法名
    }

    :nth-child(3) {
      color: #fd971f; // 字符串
    }

    :nth-child(4) {
      color: #ae81ff; // 关键字
    }
  }
}

// 页脚样式
.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  color: lighten(@text-color, 30%);
  font-size: 0.95rem;
  border-top: 1px solid @border-color;
}

// 动画定义
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(52, 152, 219, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes event-flow {
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateX(420px);
    opacity: 0;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .pattern-animation {
    flex-direction: column;
    height: auto;
    gap: 40px;

    .event-bus {
      margin: 20px 0;
      width: 100%;

      .event-flow {
        top: 50px;
        width: 100%;
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
  }

  .architecture-diagram {
    .diagram-content {
      flex-direction: column;
      gap: 40px;
    }

    .data-flow {
      flex-direction: column;
      gap: 60px;
      top: 30%;

      .publish-arrow {
        top: 60px;
        left: -50px;
        transform: rotate(90deg);
      }

      .subscribe-arrow {
        top: 230px;
        right: -50px;
        transform: rotate(90deg);
      }
    }
  }
}

.compare-section {
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  background: #f7fafc;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  padding: 2rem 1.5rem;
}

.compare-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.compare-table {
  flex: 2 1 400px;
  overflow-x: auto;
}

.compare-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.compare-table th,
.compare-table td {
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid #e3e8ee;
  text-align: left;
}

.compare-table th {
  background: #42b983;
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
}

.compare-table tr:last-child td {
  border-bottom: none;
}

.compare-summary {
  flex: 1 1 220px;
  background: #e3f6f5;
  border-radius: 8px;
  padding: 1.2rem 1rem;
  color: #2c3e50;
  font-size: 1.05rem;
  box-shadow: 0 1px 4px rgba(66, 185, 131, 0.08);
  margin-top: 0.5rem;
  min-width: 200px;
  max-width: 350px;
}

.compare-summary strong {
  color: #42b983;
}

@media (max-width: 900px) {
  .compare-content {
    flex-direction: column;
    gap: 1.2rem;
  }

  .compare-summary {
    max-width: 100%;
  }
}
</style>
