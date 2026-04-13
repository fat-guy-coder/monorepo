<template>
  <div class="observer-pattern-container">
    <div class="pattern-header">
      <div class="header-content">
        <h1>观察者模式 (Observer Pattern)</h1>
        <p class="subtitle">对象间的一对多依赖关系设计模式</p>
        <div class="pattern-icon">
          <div class="subject-icon">📡</div>
          <div class="connection">
            <div class="connection-line"></div>
            <div class="connection-line"></div>
            <div class="connection-line"></div>
          </div>
          <div class="observer-icon">👁️</div>
        </div>
      </div>
    </div>

    <div class="pattern-tabs">
      <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id"
        class="tab-button">
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.title }}
      </button>
    </div>

    <div class="pattern-content">
      <!-- 概念介绍 -->
      <section v-if="activeTab === 'concept'" class="content-section">
        <div class="concept-card">
          <div class="concept-icon">💡</div>
          <div class="concept-text">
            <h2>观察者模式概念</h2>
            <p>
              <strong>观察者模式</strong>是一种行为设计模式，它定义对象间的一种一对多的依赖关系，
              当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
            </p>
          </div>
        </div>

        <div class="analogy">
          <h3>现实生活中的类比</h3>
          <div class="analogy-content">
            <div class="analogy-example">
              <div class="analogy-icon">📰</div>
              <h4>报纸订阅</h4>
              <p>报社（主题）向订阅者（观察者）发送报纸，当有新报纸出版时，所有订阅者都会收到通知</p>
            </div>
            <div class="analogy-example">
              <div class="analogy-icon">🔔</div>
              <h4>社交媒体通知</h4>
              <p>你关注的人（主题）发布新内容时，所有关注者（观察者）都会收到通知</p>
            </div>
          </div>
        </div>

        <div class="pattern-structure">
          <h3>模式结构</h3>
          <div class="structure-diagram">
            <div class="subject">
              <div class="class-header">Subject</div>
              <div class="class-methods">
                <div>+ attach(observer)</div>
                <div>+ detach(observer)</div>
                <div>+ notify()</div>
              </div>
            </div>

            <div class="observer">
              <div class="class-header">Observer</div>
              <div class="class-methods">
                <div>+ update()</div>
              </div>
            </div>

            <div class="concrete-subject">
              <div class="class-header">ConcreteSubject</div>
              <div class="class-methods">
                <div>+ state</div>
                <div>+ getState()</div>
                <div>+ setState()</div>
              </div>
            </div>

            <div class="concrete-observer">
              <div class="class-header">ConcreteObserver</div>
              <div class="class-methods">
                <div>+ update()</div>
              </div>
            </div>

            <div class="relation-arrow subject-to-observer"></div>
            <div class="relation-arrow concrete-to-subject"></div>
            <div class="relation-arrow concrete-to-observer"></div>
          </div>
        </div>
      </section>

      <!-- 设计思路 -->
      <section v-if="activeTab === 'design'" class="content-section">
        <h2>设计思路与实现</h2>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>定义主题接口</h3>
              <p>创建Subject接口，声明添加、删除和通知观察者的方法</p>
              <div class="code-block">
                <pre><code>interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>定义观察者接口</h3>
              <p>创建Observer接口，声明接收更新的方法</p>
              <div class="code-block">
                <pre><code>interface Observer {
  update(subject: Subject): void;
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>实现具体主题</h3>
              <p>创建具体主题类，维护观察者列表和状态</p>
              <div class="code-block">
                <pre><code>class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: number = 0;

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  setState(state: number): void {
    this.state = state;
    this.notify();
  }

  getState(): number {
    return this.state;
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>实现具体观察者</h3>
              <p>创建具体观察者类，实现更新逻辑</p>
              <div class="code-block">
                <pre><code>class ConcreteObserver implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(subject: Subject): void {
    if (subject instanceof ConcreteSubject) {
      console.log(`观察者${this.name}: 主题状态已更新为 ${subject.getState()}`);
    }
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>使用模式</h3>
              <p>客户端代码创建主题和观察者，并建立订阅关系</p>
              <div class="code-block">
                <pre><code>// 创建主题
const subject = new ConcreteSubject();

// 创建观察者
const observer1 = new ConcreteObserver("A");
const observer2 = new ConcreteObserver("B");

// 订阅主题
subject.attach(observer1);
subject.attach(observer2);

// 更新主题状态
subject.setState(10);
// 输出:
// 观察者A: 主题状态已更新为 10
// 观察者B: 主题状态已更新为 10

// 取消订阅
subject.detach(observer2);

subject.setState(20);
// 输出:
// 观察者A: 主题状态已更新为 20</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section v-if="activeTab === 'usage'" class="content-section">
        <h2>使用场景</h2>

        <div class="usage-scenarios">
          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>GUI 事件处理</h3>
            <p>UI组件作为主题，事件监听器作为观察者</p>
            <div class="example">
              <pre><code>button.addEventListener('click', () => {
  console.log('按钮被点击');
});</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>数据监控系统</h3>
            <p>数据源作为主题，监控面板作为观察者</p>
            <div class="example">
              <pre><code>stockPrice.attach(stockChart);
stockPrice.attach(priceAlert);
stockPrice.setPrice(150.25);</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📡</div>
            <h3>发布-订阅系统</h3>
            <p>消息代理作为主题，订阅者作为观察者</p>
            <div class="example">
              <pre><code>messageBroker.subscribe('news', emailService);
messageBroker.subscribe('news', smsService);
messageBroker.publish('news', '重大新闻...');</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>状态管理</h3>
            <p>应用状态作为主题，UI组件作为观察者</p>
            <div class="example">
              <pre><code>// Vue响应式系统
const state = reactive({ count: 0 });
watchEffect(() => {
  console.log('count变化:', state.count);
});
state.count++;</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🎮</div>
            <h3>游戏开发</h3>
            <p>游戏实体作为主题，AI系统作为观察者</p>
            <div class="example">
              <pre><code>player.attach(achievementSystem);
player.attach(enemyAI);
player.setPosition(newPosition);</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🛒</div>
            <h3>电子商务</h3>
            <p>商品库存作为主题，用户通知作为观察者</p>
            <div class="example">
              <pre><code>product.attach(user1);
product.attach(user2);
product.setInStock(true);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section v-if="activeTab === 'pros-cons'" class="content-section">
        <h2>优点与缺点</h2>

        <div class="pros-cons-container">
          <div class="pros">
            <h3><span class="icon">✅</span> 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">
                <div class="pros-icon">✓</div>
                <div>
                  <strong>{{ pro.title }}</strong>
                  <p>{{ pro.description }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3><span class="icon">⚠️</span> 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">
                <div class="cons-icon">✗</div>
                <div>
                  <strong>{{ con.title }}</strong>
                  <p>{{ con.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="comparison">
          <h3>与其他模式的关系</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>模式</th>
                  <th>关系</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>发布-订阅模式</td>
                  <td>观察者模式的变体，通过消息代理解耦主题和观察者</td>
                </tr>
                <tr>
                  <td>中介者模式</td>
                  <td>中介者模式使用观察者模式进行组件间通信</td>
                </tr>
                <tr>
                  <td>责任链模式</td>
                  <td>观察者模式可以看作是责任链模式的替代方案</td>
                </tr>
                <tr>
                  <td>命令模式</td>
                  <td>命令模式可以作为观察者模式中的观察者</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 实际应用 -->
      <section v-if="activeTab === 'implementation'" class="content-section">
        <h2>在Vue中的实际应用</h2>

        <div class="vue-implementation">
          <div class="vue-example">
            <h3>Vue的响应式系统</h3>
            <p>Vue的响应式系统本质上是观察者模式的实现</p>
            <div class="code-block">
              <pre><code>// Vue 3 Composition API
import { ref, watchEffect } from 'vue';

// 主题 - 响应式数据
const count = ref(0);

// 观察者 - 副作用函数
watchEffect(() => {
  console.log(`计数值: ${count.value}`);
});

// 更新主题状态
count.value = 10;
// 输出: 计数值: 10</code></pre>
            </div>
          </div>

          <div class="vue-example">
            <h3>自定义事件系统</h3>
            <p>Vue组件的事件系统也是观察者模式的应用</p>
            <div class="code-block">
              <pre><code>// 父组件
&lt;template&gt;
  &lt;ChildComponent @custom-event="handleEvent" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
const handleEvent = (data) => {
  console.log('收到事件:', data);
};
&lt;/script&gt;

// 子组件
&lt;script setup&gt;
const emit = defineEmits(['custom-event']);

const triggerEvent = () => {
  emit('custom-event', { message: 'Hello' });
};
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="vue-example">
            <h3>实现自定义观察者模式</h3>
            <p>在Vue应用中实现自定义观察者模式</p>
            <div class="code-block">
              <pre><code>// 主题类
class Subject {
  private observers: Function[] = [];

  attach(observer: Function) {
    this.observers.push(observer);
  }

  detach(observer: Function) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data?: any) {
    this.observers.forEach(observer => observer(data));
  }
}

// 在Vue组件中使用
import { ref, onMounted, onUnmounted } from 'vue';

// 创建主题实例
const notificationSubject = new Subject();

// 组件A - 添加观察者
onMounted(() => {
  notificationSubject.attach(handleNotification);
});

onUnmounted(() => {
  notificationSubject.detach(handleNotification);
});

const handleNotification = (message) => {
  console.log('收到通知:', message);
};

// 组件B - 发送通知
const sendNotification = () => {
  notificationSubject.notify('新消息!');
};</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs: { id: string; title: string; icon: string }[] = [
  { id: 'concept', title: '概念介绍', icon: '📚' },
  { id: 'design', title: '设计思路', icon: '🧩' },
  { id: 'usage', title: '使用场景', icon: '🚀' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' },
  { id: 'implementation', title: '实际应用', icon: '💻' }
];

const activeTab = ref('concept');

const pros = [
  {
    title: "松耦合",
    description: "主题和观察者之间是松耦合的，主题不需要知道观察者的具体实现"
  },
  {
    title: "动态关系",
    description: "可以在运行时动态添加或删除观察者"
  },
  {
    title: "广播通信",
    description: "支持一对多的广播通信，主题状态变化自动通知所有观察者"
  },
  {
    title: "开闭原则",
    description: "可以引入新的观察者而不修改主题代码"
  }
];

const cons = [
  {
    title: "意外更新",
    description: "观察者之间依赖关系不明确，可能导致级联更新"
  },
  {
    title: "性能问题",
    description: "观察者过多时，通知所有观察者可能造成性能问题"
  },
  {
    title: "更新顺序",
    description: "观察者收到通知的顺序可能不确定"
  },
  {
    title: "调试困难",
    description: "间接通信可能导致调试困难"
  }
];
</script>

<style lang="less" scoped>


.observer-pattern-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  color: #2c3e50;
}

.pattern-header {
  background: linear-gradient(135deg, #0d324d 0%, #7f5a83 100%);
  color: white;
  text-align: center;
  padding: 3rem 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
    background-size: cover;
    opacity: 0.2;
  }
}

.header-content {
  position: relative;
  z-index: 1;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 800px;
    margin: 0 auto 1.5rem;
  }
}

.pattern-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;

  .subject-icon,
  .observer-icon {
    font-size: 3.5rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }

  .connection {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .connection-line {
      width: 120px;
      height: 2px;
      background: rgba(255, 255, 255, 0.6);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: -3px;
        right: 0;
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        animation: moveDot 2s infinite linear;
      }

      &:nth-child(1)::after {
        animation-delay: 0s;
      }

      &:nth-child(2)::after {
        animation-delay: 0.4s;
      }

      &:nth-child(3)::after {
        animation-delay: 0.8s;
      }
    }
  }
}

.pattern-tabs {
  display: flex;
  justify-content: center;
  background: #2c3e50;
  padding: 0;
}

.tab-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  padding: 18px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: white;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #3498db;
      border-radius: 4px 4px 0 0;
    }
  }
}

.tab-icon {
  font-size: 1.2rem;
}

.pattern-content {
  padding: 2rem;
}

.content-section {
  animation: fadeIn 0.5s ease;
}

.concept-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  border-left: 5px solid #3498db;

  .concept-icon {
    font-size: 4rem;
    color: #3498db;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.analogy {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
  }
}

.analogy-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.analogy-example {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .analogy-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #3498db;
  }

  h4 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: #2c3e50;
  }

  p {
    font-size: 1rem;
    color: #495057;
  }
}

.pattern-structure {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
  }
}

.structure-diagram {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 4rem;
  position: relative;
  justify-items: center;

  .subject,
  .observer,
  .concrete-subject,
  .concrete-observer {
    width: 220px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    position: relative;
    z-index: 2;
  }

  .subject {
    grid-column: 1;
    grid-row: 1;
  }

  .observer {
    grid-column: 2;
    grid-row: 1;
  }

  .concrete-subject {
    grid-column: 1;
    grid-row: 2;
    border-top: 3px solid #3498db;
  }

  .concrete-observer {
    grid-column: 2;
    grid-row: 2;
    border-top: 3px solid #e74c3c;
  }

  .class-header {
    background: #2c3e50;
    color: white;
    padding: 12px;
    font-weight: bold;
    text-align: center;
  }

  .class-methods {
    padding: 15px;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9rem;

    div {
      margin-bottom: 8px;
    }
  }

  .relation-arrow {
    position: absolute;
    height: 2px;
    background: #95a5a6;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: -5px;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid #95a5a6;
    }
  }

  .subject-to-observer {
    top: 50px;
    left: 50%;
    width: 50%;
    transform: translateY(-50%);
  }

  .concrete-to-subject {
    top: 180px;
    left: 50%;
    width: 50%;
    transform: translate(-100%, -50%);
  }

  .concrete-to-observer {
    top: 180px;
    left: 50%;
    width: 50%;
    transform: translateY(-50%);
  }
}

.implementation-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step {
  display: flex;
  gap: 1.5rem;

  .step-number {
    background: #3498db;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 0.5rem;
  }

  .step-content {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    flex: 1;
    border-left: 3px solid #3498db;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    p {
      margin-bottom: 1rem;
      color: #495057;
    }
  }
}

.code-block {
  background: #2c3e50;
  color: #f8f9fa;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-x: auto;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 1rem;

  pre {
    margin: 0;
  }

  code {
    font-family: inherit;
  }
}

.usage-scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .scenario-icon {
    background: #3498db;
    color: white;
    font-size: 2.5rem;
    padding: 1.5rem;
    text-align: center;
  }

  h3 {
    font-size: 1.4rem;
    padding: 1.2rem 1.5rem 0.5rem;
    color: #2c3e50;
  }

  p {
    padding: 0 1.5rem;
    color: #495057;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .example {
    background: #f8f9fa;
    padding: 1.2rem;
    margin: 0.5rem;
    border-radius: 8px;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9rem;
  }
}

.pros-cons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.pros,
.cons {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      font-size: 1.8rem;
    }
  }
}

.pros {
  border-top: 4px solid #2ecc71;
}

.cons {
  border-top: 4px solid #e74c3c;
}

ul {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: flex-start;

    .pros-icon {
      background: #2ecc71;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 0.2rem;
    }

    .cons-icon {
      background: #e74c3c;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 0.2rem;
    }

    strong {
      display: block;
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
      color: #2c3e50;
    }

    p {
      color: #495057;
      font-size: 0.95rem;
    }
  }
}

.comparison {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    th {
      background: #2c3e50;
      color: white;
      font-weight: 500;
    }

    tr:nth-child(even) {
      background: #f8f9fa;
    }

    tr:hover {
      background: #e9f7fe;
    }
  }
}

.vue-implementation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.vue-example {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    background: #42b983;
    color: white;
    padding: 1.2rem;
    font-size: 1.3rem;
    margin: 0;
  }

  p {
    padding: 1rem 1.5rem;
    color: #495057;
    font-size: 1rem;
    margin-bottom: 0;
    border-bottom: 1px solid #e9ecef;
  }
}

.pattern-footer {
  background: #2c3e50;
  color: white;
  padding: 2rem;
  text-align: center;

  p {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  a {
    color: #74c0fc;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;

    &:hover {
      color: white;
      text-decoration: none;
    }
  }
}
</style>
