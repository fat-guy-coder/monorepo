<template>
  <div class="pattern-container">
    <header class="header">
      <h1>发布订阅 vs 观察者模式</h1>
      <p class="subtitle">两种常用事件处理模式的深度对比</p>
    </header>

    <div class="content">
      <section class="card intro">
        <div class="intro-content">
          <div class="intro-text">
            <h2>事件驱动模式的核心概念</h2>
            <p>在软件设计中，发布订阅模式和观察者模式都用于实现对象间的事件通信，但它们在实现方式和应用场景上有着本质区别。</p>
            <div class="key-points">
              <div class="point">
                <div class="point-icon">🔄</div>
                <h3>观察者模式</h3>
                <p>直接的对象间通信，观察者直接订阅目标对象</p>
              </div>
              <div class="point">
                <div class="point-icon">📡</div>
                <h3>发布订阅模式</h3>
                <p>通过事件中心间接通信，发布者和订阅者解耦</p>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="pattern-diagram">
              <div class="observer-diagram">
                <div class="subject">Subject</div>
                <div class="observers">
                  <div class="observer">Observer 1</div>
                  <div class="observer">Observer 2</div>
                  <div class="observer">Observer 3</div>
                </div>
                <div class="connections">
                  <div class="connection"></div>
                  <div class="connection"></div>
                  <div class="connection"></div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="pubsub-diagram">
                <div class="publisher">Publisher</div>
                <div class="event-bus">Event Bus</div>
                <div class="subscribers">
                  <div class="subscriber">Subscriber 1</div>
                  <div class="subscriber">Subscriber 2</div>
                  <div class="subscriber">Subscriber 3</div>
                </div>
                <div class="pub-connections">
                  <div class="pub-connection"></div>
                  <div class="sub-connection"></div>
                  <div class="sub-connection"></div>
                  <div class="sub-connection"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card observer-pattern">
        <h2>观察者模式 (Observer Pattern)</h2>
        <div class="pattern-content">
          <div class="pattern-desc">
            <h3>核心概念</h3>
            <p>观察者模式定义了一种一对多的依赖关系，当一个对象（Subject）的状态发生改变时，所有依赖它的对象（Observers）都会得到通知并自动更新。</p>

            <h3>关键特征</h3>
            <ul>
              <li>Subject 维护一个观察者列表</li>
              <li>观察者直接订阅/取消订阅 Subject</li>
              <li>Subject 状态变化时直接通知所有观察者</li>
              <li>观察者和 Subject 之间存在直接依赖关系</li>
            </ul>

            <h3>典型应用场景</h3>
            <div class="scenarios">
              <div class="scenario">GUI事件处理</div>
              <div class="scenario">实时数据监控</div>
              <div class="scenario">MVC架构中的模型-视图更新</div>
            </div>
          </div>
          <div class="pattern-code">
            <h3>代码实现</h3>
            <pre class="code-block">// 主题接口
interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

// 观察者接口
interface Observer {
  update(data: any): void;
}

// 具体主题
class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: any;

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers() {
    this.observers.forEach(observer =>
      observer.update(this.state)
    );
  }

  setState(state: any) {
    this.state = state;
    this.notifyObservers();
  }
}

// 具体观察者
class ConcreteObserver implements Observer {
  update(data: any) {
    console.log('收到更新:', data);
  }
}</pre>
          </div>
        </div>
      </section>

      <section class="card pubsub-pattern">
        <h2>发布订阅模式 (Pub/Sub Pattern)</h2>
        <div class="pattern-content">
          <div class="pattern-desc">
            <h3>核心概念</h3>
            <p>发布订阅模式使用一个事件通道（Event Bus）作为中介，发布者（Publisher）触发事件，订阅者（Subscriber）监听特定事件。两者不直接通信。</p>

            <h3>关键特征</h3>
            <ul>
              <li>通过事件中心解耦发布者和订阅者</li>
              <li>订阅者监听特定事件类型</li>
              <li>发布者触发事件时不关心订阅者</li>
              <li>支持多对多通信关系</li>
            </ul>

            <h3>典型应用场景</h3>
            <div class="scenarios">
              <div class="scenario">消息队列系统</div>
              <div class="scenario">事件总线实现</div>
              <div class="scenario">跨组件通信</div>
              <div class="scenario">微服务间通信</div>
            </div>
          </div>
          <div class="pattern-code">
            <h3>代码实现</h3>
            <pre class="code-block">// 事件中心
class EventBus {
  private events: { [key: string]: Function[] } = {};

  // 订阅事件
  subscribe(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 取消订阅
  unsubscribe(event: string, callback: Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        cb => cb !== callback
      );
    }
  }

  // 发布事件
  publish(event: string, data?: any) {
    if (this.events[event]) {
      this.events[event].forEach(callback =>
        callback(data)
      );
    }
  }
}

// 使用示例
const bus = new EventBus();

// 订阅者
bus.subscribe('message', (data: string) => {
  console.log('收到消息:', data);
});

// 发布者
bus.publish('message', 'Hello Pub/Sub!');</pre>
          </div>
        </div>
      </section>

      <section class="card comparison">
        <h2>核心区别对比</h2>
        <div class="comparison-content">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>对比维度</th>
                  <th>观察者模式</th>
                  <th>发布订阅模式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>耦合度</td>
                  <td>高（直接依赖）</td>
                  <td>低（通过事件中心解耦）</td>
                </tr>
                <tr>
                  <td>通信方式</td>
                  <td>直接通知</td>
                  <td>间接通过事件通道</td>
                </tr>
                <tr>
                  <td>关系类型</td>
                  <td>一对多</td>
                  <td>多对多</td>
                </tr>
                <tr>
                  <td>实现复杂度</td>
                  <td>简单</td>
                  <td>较复杂（需要事件中心）</td>
                </tr>
                <tr>
                  <td>灵活性</td>
                  <td>较低（紧密绑定）</td>
                  <td>高（动态订阅/发布）</td>
                </tr>
                <tr>
                  <td>典型应用</td>
                  <td>GUI事件、状态监控</td>
                  <td>消息系统、事件总线</td>
                </tr>
                <tr>
                  <td>性能</td>
                  <td>高效（直接调用）</td>
                  <td>稍低（中间层开销）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="relationship-diagram">
            <h3>关系图</h3>
            <div class="diagram-content">
              <div class="observer-relation">
                <div class="subject-node">Subject</div>
                <div class="observer-node">Observer 1</div>
                <div class="observer-node">Observer 2</div>
                <div class="observer-node">Observer 3</div>
                <div class="connection-line"></div>
                <div class="connection-line"></div>
                <div class="connection-line"></div>
              </div>
              <div class="vs">vs</div>
              <div class="pubsub-relation">
                <div class="publisher-node">Publisher</div>
                <div class="eventbus-node">Event Bus</div>
                <div class="subscriber-node">Subscriber 1</div>
                <div class="subscriber-node">Subscriber 2</div>
                <div class="pub-connection"></div>
                <div class="sub-connection"></div>
                <div class="sub-connection"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card conclusion">
        <h2>如何选择？</h2>
        <div class="conclusion-content">
          <div class="choice">
            <h3>✅ 选择观察者模式当：</h3>
            <ul>
              <li>对象间关系简单直接，一对多关系明确</li>
              <li>需要高效直接的事件通知机制</li>
              <li>不需要复杂的中间层管理</li>
              <li>组件生命周期紧密关联</li>
            </ul>
          </div>

          <div class="choice">
            <h3>✅ 选择发布订阅模式当：</h3>
            <ul>
              <li>系统需要解耦，避免直接依赖</li>
              <li>需要多对多的事件通信关系</li>
              <li>需要动态添加/移除订阅者</li>
              <li>跨模块/跨系统通信</li>
              <li>需要中间件进行事件过滤或处理</li>
            </ul>
          </div>
        </div>

        <div class="hybrid-approach">
          <h3>实际应用中的混合模式</h3>
          <p>在实际开发中，两种模式经常结合使用：</p>
          <pre class="code-block">// Vue3中的Event Bus实现
import mitt from 'mitt';

// 创建事件中心
const emitter = mitt();

// 组件A - 发布事件
emitter.emit('user-login', { user: 'admin' });

// 组件B - 订阅事件
emitter.on('user-login', (user) => {
  console.log('用户登录:', user);
});

// 组件C - 取消订阅
onUnmounted(() => {
  emitter.off('user-login');
});</pre>
          <p>现代前端框架（如Vue、React）中的状态管理库（Vuex、Redux）通常结合了两种模式的优点。</p>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>设计模式 | 提升代码可维护性与扩展性</p>
      <div class="links">
        <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式参考</a>
        <a href="https://github.com/developit/mitt" target="_blank">Mitt 事件库</a>
        <a href="https://rxjs.dev/" target="_blank">RxJS 响应式编程</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 示例响应式数据
const activePattern = ref('observer');

onMounted(() => {
  console.log('模式对比组件已挂载');
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.pattern-container {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #334155;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
    color: #1e293b;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e2e8f0;
    color: #1e293b;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: #3b82f6;
    }
  }
}

.intro {
  .intro-content {
    display: flex;
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .intro-text {
    flex: 1;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
      color: #475569;
    }

    .key-points {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;

      .point {
        background: #f0f7ff;
        padding: 25px 20px;
        border-radius: 10px;
        text-align: center;
        border: 1px solid #dbeafe;
        transition: all 0.3s ease;

        &:hover {
          background: #dbeafe;
          transform: translateY(-5px);
        }

        .point-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #3b82f6;
        }

        p {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 0;
        }
      }
    }
  }

  .intro-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .pattern-diagram {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;

    .observer-diagram,
    .pubsub-diagram {
      position: relative;
      height: 200px;
      background: #f8fafc;
      border-radius: 10px;
      padding: 15px;
      border: 1px solid #e2e8f0;
    }

    .divider {
      text-align: center;
      font-weight: bold;
      color: #64748b;
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background: #e2e8f0;
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }
    }

    .subject {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #3b82f6;
      color: white;
      padding: 15px 30px;
      border-radius: 8px;
      font-weight: 600;
    }

    .observers {
      position: absolute;
      bottom: 20px;
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 0 20px;
    }

    .observer {
      background: #8b5cf6;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    .connections {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 40px;
    }

    .connection {
      width: 3px;
      height: 80px;
      background: #94a3b8;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: -6px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid #94a3b8;
      }
    }

    .publisher {
      position: absolute;
      top: 20px;
      left: 20%;
      background: #3b82f6;
      color: white;
      padding: 15px 30px;
      border-radius: 8px;
      font-weight: 600;
    }

    .event-bus {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #8b5cf6;
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-weight: 600;
      width: 150px;
      text-align: center;
    }

    .subscribers {
      position: absolute;
      bottom: 20px;
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 0 20px;
    }

    .subscriber {
      background: #ec4899;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    .pub-connections {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .pub-connection {
      position: absolute;
      top: 60px;
      left: 20%;
      width: 30%;
      height: 3px;
      background: #94a3b8;

      &::after {
        content: '';
        position: absolute;
        right: -8px;
        top: -6px;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 10px solid #94a3b8;
      }
    }

    .sub-connection {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20%;
      height: 3px;
      background: #94a3b8;

      &:nth-child(2) {
        transform: rotate(30deg);
        transform-origin: left;
      }

      &:nth-child(3) {
        transform: rotate(-30deg);
        transform-origin: left;
      }

      &:nth-child(4) {
        transform: rotate(0);
        transform-origin: left;
      }

      &::after {
        content: '';
        position: absolute;
        right: -8px;
        top: -6px;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 10px solid #94a3b8;
      }
    }
  }
}

.observer-pattern,
.pubsub-pattern {
  .pattern-content {
    display: flex;
    gap: 30px;

    @media (max-width: 900px) {
      flex-direction: column;
    }
  }

  .pattern-desc {
    flex: 1;

    h3 {
      font-size: 1.4rem;
      margin: 20px 0 15px;
      color: #1e293b;
      position: relative;
      padding-left: 15px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #3b82f6;
      }
    }

    ul {
      padding-left: 25px;
      margin-bottom: 25px;

      li {
        margin-bottom: 10px;
        line-height: 1.7;
      }
    }
  }

  .scenarios {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 15px;

    .scenario {
      background: #dbeafe;
      color: #1d4ed8;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }

  .pattern-code {
    flex: 1;
    min-width: 300px;
  }
}

.pubsub-pattern {
  .scenarios .scenario {
    background: #ede9fe;
    color: #7c3aed;
  }
}

.comparison {
  .comparison-content {
    display: flex;
    gap: 30px;

    @media (max-width: 900px) {
      flex-direction: column;
    }
  }

  .comparison-table {
    flex: 1;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 25px;

      th,
      td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      th {
        background: #f1f5f9;
        font-weight: 600;
        color: #1e293b;
        position: sticky;
        top: 0;
      }

      tr:hover {
        background: #f8fafc;
      }

      tr:nth-child(even) {
        background: #f8fafc;
      }
    }
  }

  .relationship-diagram {
    flex: 1;
    min-width: 300px;

    .diagram-content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 20px;

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 40px;
      }
    }

    .observer-relation,
    .pubsub-relation {
      position: relative;
      width: 180px;
      height: 250px;
    }

    .subject-node,
    .publisher-node {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #3b82f6;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
      width: 100px;
    }

    .eventbus-node {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #8b5cf6;
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
      width: 90px;
    }

    .observer-node,
    .subscriber-node {
      position: absolute;
      background: #8b5cf6;
      color: white;
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 0.9rem;
      width: 100px;
      text-align: center;
    }

    .observer-node:nth-child(2) {
      top: 120px;
      left: 0;
    }

    .observer-node:nth-child(3) {
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
    }

    .observer-node:nth-child(4) {
      top: 120px;
      right: 0;
    }

    .subscriber-node:nth-child(3) {
      top: 150px;
      left: 0;
    }

    .subscriber-node:nth-child(4) {
      top: 150px;
      right: 0;
    }

    .connection-line {
      position: absolute;
      top: 70px;
      left: 50px;
      width: 3px;
      height: 70px;
      background: #94a3b8;

      &:nth-child(5) {
        left: 50%;
        transform: translateX(-50%);
      }

      &:nth-child(6) {
        left: auto;
        right: 50px;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: -6px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid #94a3b8;
      }
    }

    .pub-connection {
      position: absolute;
      top: 60px;
      left: 45px;
      width: 80px;
      height: 3px;
      background: #94a3b8;

      &::after {
        content: '';
        position: absolute;
        right: -8px;
        top: -6px;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 10px solid #94a3b8;
      }
    }

    .sub-connection {
      position: absolute;
      top: 120px;
      left: 45px;
      width: 80px;
      height: 3px;
      background: #94a3b8;

      &:nth-child(6) {
        left: auto;
        right: 45px;
      }

      &::after {
        content: '';
        position: absolute;
        right: -8px;
        top: -6px;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 10px solid #94a3b8;
      }
    }

    .vs {
      font-weight: bold;
      color: #64748b;
      font-size: 1.2rem;
    }
  }
}

.conclusion {
  .conclusion-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
  }

  .choice {
    background: #f8fafc;
    padding: 25px;
    border-radius: 10px;
    border-left: 4px solid #3b82f6;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #1e293b;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        line-height: 1.6;
      }
    }
  }

  .hybrid-approach {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    margin-top: 20px;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: #1e293b;
    }

    p {
      margin-bottom: 15px;
      color: #475569;
    }
  }
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 15px 0;
  line-height: 1.5;
  border: 1px solid #334155;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px 8px 0 0;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #e2e8f0;
  color: #64748b;

  .links {
    margin-top: 15px;

    a {
      color: #3b82f6;
      text-decoration: none;
      margin: 0 15px;
      font-weight: 500;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 2px;
        background: #3b82f6;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }
}
</style>
