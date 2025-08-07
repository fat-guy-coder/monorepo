<template>
  <div class="observer-pattern-container">
    <!-- 标题区域 -->
    <section class="header-section">
      <h1 class="title">观察者模式</h1>
      <div class="subtitle">对象间的一对多依赖关系设计</div>
      <div class="header-stats">
        <div class="stat-card">
          <div class="stat-icon">🔗</div>
          <div class="stat-value">松耦合</div>
          <div class="stat-label">核心优势</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔄</div>
          <div class="stat-value">自动更新</div>
          <div class="stat-label">关键特性</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">事件驱动</div>
          <div class="stat-label">设计范式</div>
        </div>
      </div>
    </section>

    <!-- 模式介绍 -->
    <section class="content-section">
      <h2 class="section-title">📚 观察者模式介绍</h2>

      <div class="pattern-intro">
        <div class="intro-card">
          <div class="intro-icon">👁️</div>
          <div class="intro-content">
            <h3>什么是观察者模式？</h3>
            <p>
              <strong>观察者模式</strong>是一种行为设计模式，它定义了对象之间的一对多依赖关系，
              当一个对象（称为主题）的状态发生改变时，所有依赖于它的对象（称为观察者）都会自动收到通知并更新。
            </p>
          </div>
        </div>

        <div class="intro-card">
          <div class="intro-icon">🎯</div>
          <div class="intro-content">
            <h3>核心思想</h3>
            <p>
              观察者模式的核心在于<strong>解耦主题和观察者</strong>，让它们可以独立变化，
              主题不需要知道具体有哪些观察者，只需维护一个观察者列表并通知它们即可。
            </p>
          </div>
        </div>

        <div class="intro-card">
          <div class="intro-icon">⚙️</div>
          <div class="intro-content">
            <h3>模式结构</h3>
            <div class="structure-diagram">
              <div class="subject">
                <div class="component-name">Subject</div>
                <div class="component-desc">主题/被观察者</div>
              </div>
              <div class="arrow">→</div>
              <div class="observer">
                <div class="component-name">Observer</div>
                <div class="component-desc">观察者接口</div>
              </div>
              <div class="observers">
                <div class="concrete-observer">
                  <div class="component-name">ConcreteObserverA</div>
                </div>
                <div class="concrete-observer">
                  <div class="component-name">ConcreteObserverB</div>
                </div>
                <div class="concrete-observer">
                  <div class="component-name">ConcreteObserverC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pattern-benefits">
        <h3>观察者模式的优势</h3>
        <ul>
          <li><strong>松耦合</strong>：主题和观察者之间是松耦合的，可以独立扩展</li>
          <li><strong>广播通信</strong>：主题可以一次通知多个观察者</li>
          <li><strong>动态关系</strong>：可以在运行时动态添加或移除观察者</li>
          <li><strong>开闭原则</strong>：新增观察者无需修改主题代码</li>
        </ul>
      </div>
    </section>

    <!-- 实现思路 -->
    <section class="content-section">
      <h2 class="section-title">🧠 观察者模式实现思路</h2>

      <div class="implementation-steps">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3>定义主题(Subject)接口</h3>
          <p>声明注册、移除和通知观察者的方法</p>
          <div class="code-snippet">
            <pre><code>interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}</code></pre>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <h3>定义观察者(Observer)接口</h3>
          <p>声明更新方法，主题状态变化时调用</p>
          <div class="code-snippet">
            <pre><code>interface Observer {
  update(data: any): void;
}</code></pre>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <h3>实现具体主题</h3>
          <p>管理观察者列表，状态变化时通知观察者</p>
          <div class="code-snippet">
            <pre><code>class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: any;

  registerObserver(observer: Observer) {
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
}</code></pre>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">4</div>
          <h3>实现具体观察者</h3>
          <p>实现更新方法，定义收到通知后的行为</p>
          <div class="code-snippet">
            <pre><code>class ConcreteObserver implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(data: any) {
    console.log(`${this.name} 收到更新: ${data}`);
    // 执行具体更新逻辑
  }
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="content-section">
      <h2 class="section-title">💻 完整代码示例</h2>

      <div class="code-example">
        <div class="code-tabs">
          <div
            v-for="(tab, index) in codeTabs"
            :key="index"
            :class="['code-tab', { active: activeCodeTab === index }]"
            @click="activeCodeTab = index"
          >
            {{ tab.title }}
          </div>
        </div>

        <div class="code-content">
          <div v-if="activeCodeTab === 0" class="typescript-code">
            <pre><code>// 观察者接口
interface Observer {
  update(data: any): void;
}

// 主题接口
interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

// 具体主题实现
class NewsPublisher implements Subject {
  private observers: Observer[] = [];
  private latestNews: string = "";

  // 注册观察者
  registerObserver(observer: Observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  // 移除观察者
  removeObserver(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  // 通知所有观察者
  notifyObservers() {
    this.observers.forEach(observer =>
      observer.update(this.latestNews)
    );
  }

  // 发布新闻
  publishNews(news: string) {
    this.latestNews = news;
    console.log(`新闻发布: ${news}`);
    this.notifyObservers();
  }
}

// 具体观察者 - 手机客户端
class MobileClient implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(news: string) {
    console.log(`[${this.name}手机客户端] 收到新闻推送: ${news}`);
  }
}

// 具体观察者 - 网站订阅
class WebsiteSubscriber implements Observer {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  update(news: string) {
    console.log(`[网站订阅 ${this.url}] 更新新闻头条: ${news}`);
  }
}

// 使用示例
const newsPublisher = new NewsPublisher();

const mobileUser1 = new MobileClient("用户A");
const mobileUser2 = new MobileClient("用户B");
const website = new WebsiteSubscriber("www.example.com");

// 注册观察者
newsPublisher.registerObserver(mobileUser1);
newsPublisher.registerObserver(mobileUser2);
newsPublisher.registerObserver(website);

// 发布新闻
newsPublisher.publishNews("Vue 3.4 正式发布！");
newsPublisher.publishNews("TypeScript 5.5 新特性预览");

// 移除一个观察者
newsPublisher.removeObserver(mobileUser2);

// 再次发布新闻
newsPublisher.publishNews("观察者模式在前端框架中的应用");</code></pre>
          </div>

          <div v-if="activeCodeTab === 1" class="execution-result">
            <h3>代码执行结果</h3>
            <div class="result-output">
              <div class="output-line">新闻发布: Vue 3.4 正式发布！</div>
              <div class="output-line">[用户A手机客户端] 收到新闻推送: Vue 3.4 正式发布！</div>
              <div class="output-line">[用户B手机客户端] 收到新闻推送: Vue 3.4 正式发布！</div>
              <div class="output-line">[网站订阅 www.example.com] 更新新闻头条: Vue 3.4 正式发布！</div>
              <div class="output-line">新闻发布: TypeScript 5.5 新特性预览</div>
              <div class="output-line">[用户A手机客户端] 收到新闻推送: TypeScript 5.5 新特性预览</div>
              <div class="output-line">[用户B手机客户端] 收到新闻推送: TypeScript 5.5 新特性预览</div>
              <div class="output-line">[网站订阅 www.example.com] 更新新闻头条: TypeScript 5.5 新特性预览</div>
              <div class="output-line">新闻发布: 观察者模式在前端框架中的应用</div>
              <div class="output-line">[用户A手机客户端] 收到新闻推送: 观察者模式在前端框架中的应用</div>
              <div class="output-line">[网站订阅 www.example.com] 更新新闻头条: 观察者模式在前端框架中的应用</div>
            </div>
          </div>

          <div v-if="activeCodeTab === 2" class="sequence-diagram">
            <h3>观察者模式时序图</h3>
            <div class="sequence-container">
              <div class="participants">
                <div class="participant">客户端</div>
                <div class="participant">主题</div>
                <div class="participant">观察者A</div>
                <div class="participant">观察者B</div>
              </div>

              <div class="sequence-lines">
                <div class="sequence">
                  <div class="message">registerObserver(observerA)</div>
                  <div class="arrow">→</div>
                </div>
                <div class="sequence">
                  <div class="message">registerObserver(observerB)</div>
                  <div class="arrow">→</div>
                </div>
                <div class="sequence">
                  <div class="message">setState(newState)</div>
                  <div class="arrow">→</div>
                </div>
                <div class="sequence">
                  <div class="message">notifyObservers()</div>
                  <div class="arrow">→</div>
                </div>
                <div class="sequence">
                  <div class="message"></div>
                  <div class="arrow">↓</div>
                  <div class="message">update(newState)</div>
                </div>
                <div class="sequence">
                  <div class="message"></div>
                  <div class="arrow">↓</div>
                  <div class="message">update(newState)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实际应用 -->
    <section class="content-section">
      <h2 class="section-title">🚀 实际应用场景</h2>

      <div class="application-grid">
        <div class="app-card">
          <div class="app-icon">🖥️</div>
          <h3>前端框架响应式系统</h3>
          <p>Vue/React中的响应式数据更新机制</p>
          <div class="app-details">
            <div class="detail-item">
              <div class="detail-label">主题</div>
              <div class="detail-value">响应式数据</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">观察者</div>
              <div class="detail-value">组件渲染函数</div>
            </div>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">📡</div>
          <h3>事件处理系统</h3>
          <p>DOM事件监听与分发机制</p>
          <div class="app-details">
            <div class="detail-item">
              <div class="detail-label">主题</div>
              <div class="detail-value">DOM元素</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">观察者</div>
              <div class="detail-value">事件监听器</div>
            </div>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">📱</div>
          <h3>状态管理</h3>
          <p>Redux/Vuex中的状态变更通知</p>
          <div class="app-details">
            <div class="detail-item">
              <div class="detail-label">主题</div>
              <div class="detail-value">Store状态</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">观察者</div>
              <div class="detail-value">组件订阅者</div>
            </div>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">📧</div>
          <h3>消息发布/订阅</h3>
          <p>系统间解耦的消息通信机制</p>
          <div class="app-details">
            <div class="detail-item">
              <div class="detail-label">主题</div>
              <div class="detail-value">消息通道</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">观察者</div>
              <div class="detail-value">订阅服务</div>
            </div>
          </div>
        </div>
      </div>

      <div class="framework-comparison">
        <h3>前端框架中的观察者模式实现</h3>
        <div class="comparison-table">
          <div class="table-row header">
            <div class="cell">框架</div>
            <div class="cell">主题实现</div>
            <div class="cell">观察者实现</div>
            <div class="cell">特点</div>
          </div>
          <div class="table-row">
            <div class="cell">Vue</div>
            <div class="cell">响应式对象(Reactive)</div>
            <div class="cell">渲染函数/计算属性</div>
            <div class="cell">自动依赖收集，细粒度更新</div>
          </div>
          <div class="table-row">
            <div class="cell">React</div>
            <div class="cell">状态(useState)</div>
            <div class="cell">组件函数</div>
            <div class="cell">批量更新，虚拟DOM重渲染</div>
          </div>
          <div class="table-row">
            <div class="cell">Angular</div>
            <div class="cell">变更检测器(ChangeDetector)</div>
            <div class="cell">组件视图</div>
            <div class="cell">Zone.js触发，分层检测策略</div>
          </div>
          <div class="table-row">
            <div class="cell">RxJS</div>
            <div class="cell">Observable</div>
            <div class="cell">Observer/Subscriber</div>
            <div class="cell">函数式响应编程，强大操作符</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="content-section">
      <h2 class="section-title">🏆 最佳实践与注意事项</h2>

      <div class="best-practices">
        <div class="practice-card">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>使用场景</h3>
            <ul>
              <li>当一个对象的改变需要同时改变其他对象时</li>
              <li>当系统有多个部分需要根据某个状态变化更新时</li>
              <li>当对象需要通知其他对象，但不需要知道这些对象是谁时</li>
            </ul>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">⚠️</div>
          <div class="practice-content">
            <h3>注意事项</h3>
            <ul>
              <li>避免观察者执行时间过长，影响通知效率</li>
              <li>注意内存泄漏，及时移除不需要的观察者</li>
              <li>注意通知顺序，观察者之间不应有依赖关系</li>
              <li>避免循环通知，导致无限循环</li>
            </ul>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🚀</div>
          <div class="practice-content">
            <h3>优化技巧</h3>
            <ul>
              <li>使用弱引用避免内存泄漏</li>
              <li>采用异步通知机制避免阻塞</li>
              <li>使用事件总线简化复杂关系</li>
              <li>考虑使用发布/订阅模式(Pub/Sub)进行解耦</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pattern-variants">
        <h3>观察者模式的变体</h3>
        <div class="variant-cards">
          <div class="variant-card">
            <h4>发布/订阅模式</h4>
            <p>通过中间的事件通道解耦发布者和订阅者</p>
            <div class="variant-diff">
              <div class="diff-item">
                <div class="diff-label">观察者模式</div>
                <div class="diff-value">主题直接维护观察者列表</div>
              </div>
              <div class="diff-item">
                <div class="diff-label">发布/订阅</div>
                <div class="diff-value">通过消息代理解耦</div>
              </div>
            </div>
          </div>

          <div class="variant-card">
            <h4>事件总线</h4>
            <p>全局事件中心，允许多对多通信</p>
            <div class="variant-diff">
              <div class="diff-item">
                <div class="diff-label">观察者模式</div>
                <div class="diff-value">一对多关系</div>
              </div>
              <div class="diff-item">
                <div class="diff-label">事件总线</div>
                <div class="diff-value">多对多关系</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="content-section summary-section">
      <h2 class="section-title">🎯 总结</h2>

      <div class="summary-content">
        <div class="key-point">
          <div class="point-icon">🔑</div>
          <div class="point-text">
            观察者模式是<strong>解耦</strong>主题和观察者的有效手段，是实现<strong>松耦合设计</strong>的关键模式之一
          </div>
        </div>

        <div class="key-point">
          <div class="point-icon">🔄</div>
          <div class="point-text">
            通过定义主题和观察者之间的<strong>一对多依赖关系</strong>，实现状态变化的自动广播通知
          </div>
        </div>

        <div class="key-point">
          <div class="point-icon">🚀</div>
          <div class="point-text">
            在现代前端框架中广泛运用，是响应式编程和状态管理的<strong>基础构建块</strong>
          </div>
        </div>

        <div class="key-point">
          <div class="point-icon">🧩</div>
          <div class="point-text">
            合理使用观察者模式可以创建<strong>灵活、可扩展</strong>的系统架构，但要注意避免常见陷阱
          </div>
        </div>
      </div>

      <div class="quote-box">
        <div class="quote-icon">💬</div>
        <div class="quote-content">
          "观察者模式是解耦系统各部分的强大工具，它允许对象之间保持松散的耦合关系，
          同时确保状态变化时所有依赖部分都能得到通知和更新。"
          <div class="quote-author">- 《设计模式：可复用面向对象软件的基础》</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const codeTabs = ref([
  { title: "TypeScript 实现" },
  { title: "执行结果" },
  { title: "时序图" }
]);

const activeCodeTab = ref(0);
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@code-bg: #f6f8ff;

// 基础样式
.observer-pattern-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @light-bg, transparent);
  border-radius: 16px;

  .title {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.3rem;
    color: @text-light;
    margin-bottom: 2rem;
    font-weight: 400;
  }
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;

  .stat-card {
    background: white;
    padding: 1.5rem 1rem;
    border-radius: 12px;
    box-shadow: @card-shadow;
    min-width: 140px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .stat-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  background: @light-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: darken(@primary-color, 10%);
  }
}

.pattern-intro {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .intro-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    .intro-icon {
      font-size: 2rem;
      color: @primary-color;
      flex-shrink: 0;
    }

    .intro-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
      }

      p {
        margin: 0;
        line-height: 1.7;
      }
    }
  }
}

.structure-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  .subject, .observer {
    background: white;
    border: 2px solid @primary-color;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    width: 180px;
    position: relative;

    .component-name {
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .component-desc {
      font-size: 0.9rem;
      color: @text-light;
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: @text-light;
  }

  .observers {
    display: flex;
    gap: 1rem;

    .concrete-observer {
      background: white;
      border: 2px solid @accent-color;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: center;
      width: 140px;

      .component-name {
        font-weight: 600;
        font-size: 0.9rem;
      }
    }
  }
}

.pattern-benefits {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.75rem;
      position: relative;
      padding-left: 1.25rem;

      &::before {
        content: "•";
        color: @primary-color;
        font-weight: bold;
        position: absolute;
        left: 0;
      }

      strong {
        color: @primary-color;
      }
    }
  }
}

.implementation-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .step-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    position: relative;

    .step-number {
      position: absolute;
      top: -15px;
      left: 20px;
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
    }

    h3 {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    p {
      margin: 0 0 1rem;
      color: @text-light;
    }
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2c3e50;
    }
  }
}

.code-example {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  .code-tabs {
    display: flex;
    background: @light-bg;
    border-bottom: 1px solid @border-color;

    .code-tab {
      padding: 1rem 1.5rem;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;

      &.active {
        border-bottom: 3px solid @primary-color;
        background: white;
        color: @primary-color;
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .code-content {
    padding: 2rem;

    .typescript-code {
      pre {
        background: @code-bg;
        padding: 1.5rem;
        border-radius: 8px;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #2c3e50;
        }
      }
    }

    .execution-result {
      h3 {
        margin-top: 0;
      }

      .result-output {
        background: @code-bg;
        border-radius: 8px;
        padding: 1.5rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.95rem;

        .output-line {
          padding: 0.25rem 0;
        }
      }
    }

    .sequence-diagram {
      h3 {
        margin-top: 0;
      }

      .sequence-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .participants {
          display: flex;
          justify-content: space-around;
          margin-bottom: 1rem;

          .participant {
            padding: 0.5rem 1rem;
            background: white;
            border: 1px solid @border-color;
            border-radius: 4px;
            text-align: center;
            font-weight: 500;
          }
        }

        .sequence-lines {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;

          .sequence {
            display: flex;
            align-items: center;

            .message {
              flex: 1;
              text-align: right;
              padding-right: 1rem;
              font-size: 0.9rem;
            }

            .arrow {
              font-size: 1.5rem;
              color: @text-light;
              width: 40px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .app-card {
    background: white;
    padding: 1.75rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: all 0.3s ease;
    border-top: 3px solid @primary-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .app-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @text-color;
    }

    p {
      margin: 0 0 1rem;
      color: @text-light;
      font-size: 0.98rem;
    }

    .app-details {
      background: @light-bg;
      border-radius: 8px;
      padding: 0.75rem;

      .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;

        .detail-label {
          font-weight: 600;
        }

        .detail-value {
          color: @primary-color;
        }
      }
    }
  }
}

.framework-comparison {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .comparison-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;

    .table-row {
      display: table-row;

      &.header {
        background: @light-bg;
        font-weight: 700;
      }

      .cell {
        display: table-cell;
        padding: 1rem;
        border: 1px solid @border-color;
        text-align: center;
      }
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .practice-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    .practice-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    .practice-content {
      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 1.25rem;

          &::before {
            content: "•";
            color: @primary-color;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}

.pattern-variants {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .variant-cards {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;

    .variant-card {
      flex: 1;
      min-width: 300px;
      background: @light-bg;
      border-radius: 12px;
      padding: 1.5rem;

      h4 {
        margin-top: 0;
        color: @primary-color;
      }

      p {
        margin-top: 0;
        margin-bottom: 1.5rem;
      }

      .variant-diff {
        background: white;
        border-radius: 8px;
        padding: 1rem;

        .diff-item {
          display: flex;
          margin-bottom: 0.75rem;

          .diff-label {
            font-weight: 600;
            width: 120px;
          }

          .diff-value {
            flex: 1;
          }
        }
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #e6f7ff, #f0f9ff);

  .summary-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    .key-point {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      .point-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .point-text {
        strong {
          color: @primary-color;
        }
      }
    }
  }

  .quote-box {
    background: white;
    border-left: 4px solid @accent-color;
    border-radius: 0 12px 12px 0;
    padding: 1.5rem;
    display: flex;
    gap: 1.25rem;

    .quote-icon {
      font-size: 2rem;
      color: @accent-color;
      flex-shrink: 0;
    }

    .quote-content {
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.6;

      .quote-author {
        margin-top: 1rem;
        font-weight: 500;
        text-align: right;
        color: @text-light;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .observer-pattern-container {
    padding: 1rem;
  }

  .title {
    font-size: 2.25rem !important;
  }

  .subtitle {
    font-size: 1.1rem !important;
  }

  .header-stats {
    gap: 1rem;

    .stat-card {
      flex: 1;
      min-width: 120px;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .pattern-intro, .implementation-steps, .application-grid,
  .best-practices, .summary-content {
    grid-template-columns: 1fr;
  }

  .sequence-container {
    .participants {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }

  .variant-cards {
    flex-direction: column;
  }

  .comparison-table {
    overflow-x: auto;

    .table-row {
      min-width: 600px;
    }
  }
}
</style>
