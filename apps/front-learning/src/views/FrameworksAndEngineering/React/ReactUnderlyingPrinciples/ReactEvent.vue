<template>
  <div class="react-events-container">
    <header>
      <div class="header-content">
        <h1>React事件机制基础介绍</h1>
        <p class="subtitle">深入理解React的合成事件系统原理与实现</p>
        <div class="header-badge">
          <span class="badge">合成事件</span>
          <span class="badge">事件委托</span>
          <span class="badge">事件池</span>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <section class="concept-section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-lightbulb"></i>
          </div>
          <h2>核心概念</h2>
        </div>

        <div class="concept-cards">
          <div class="concept-card">
            <h3>什么是合成事件？</h3>
            <p>
              React实现了一套自己的事件系统，称为<strong>合成事件(SyntheticEvent)</strong>。这是对原生DOM事件的一个跨浏览器封装，提供了与原生事件相同的接口，但行为一致且消除了浏览器兼容性问题。
            </p>
            <div class="feature-list">
              <div class="feature-item">
                <i class="feature-icon icon-check"></i>
                <span>跨浏览器一致性</span>
              </div>
              <div class="feature-item">
                <i class="feature-icon icon-check"></i>
                <span>事件委托机制</span>
              </div>
              <div class="feature-item">
                <i class="feature-icon icon-check"></i>
                <span>自动事件池管理</span>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <h3>为什么需要合成事件？</h3>
            <ul class="reason-list">
              <li>
                <div class="reason-icon">1</div>
                <div class="reason-text">解决浏览器兼容性问题，提供统一API</div>
              </li>
              <li>
                <div class="reason-icon">2</div>
                <div class="reason-text">实现高效的事件委托，减少内存占用</div>
              </li>
              <li>
                <div class="reason-icon">3</div>
                <div class="reason-text">提供额外功能（如事件池、冒泡控制）</div>
              </li>
              <li>
                <div class="reason-icon">4</div>
                <div class="reason-text">优化性能，避免频繁创建/销毁事件对象</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-compare"></i>
          </div>
          <h2>与原生DOM事件对比</h2>
        </div>

        <div class="comparison-table">
          <div class="table-header">
            <div class="header-cell">特性</div>
            <div class="header-cell">原生DOM事件</div>
            <div class="header-cell">React合成事件</div>
          </div>
          <div class="table-row">
            <div class="row-cell">事件注册</div>
            <div class="row-cell">addEventListener</div>
            <div class="row-cell">JSX属性(如onClick)</div>
          </div>
          <div class="table-row">
            <div class="row-cell">事件绑定</div>
            <div class="row-cell">直接绑定到元素</div>
            <div class="row-cell">事件委托到document/root</div>
          </div>
          <div class="table-row">
            <div class="row-cell">事件对象</div>
            <div class="row-cell">原生Event对象</div>
            <div class="row-cell">SyntheticEvent对象</div>
          </div>
          <div class="table-row">
            <div class="row-cell">事件池</div>
            <div class="row-cell">无</div>
            <div class="row-cell">有，事件对象会被复用</div>
          </div>
          <div class="table-row">
            <div class="row-cell">事件冒泡</div>
            <div class="row-cell">支持</div>
            <div class="row-cell">支持，但实际在root上处理</div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-gear"></i>
          </div>
          <h2>实现原理</h2>
        </div>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>事件注册</h3>
              <p>React在组件挂载阶段，根据JSX中的事件属性（如onClick）注册事件。但并非直接绑定到元素上，而是在document（v17之前）或root节点（v17+）上注册统一的事件处理函数。</p>
              <div class="code-snippet">
                <pre>// React内部事件注册简化逻辑
function registerEvents(rootElement) {
  const eventTypes = ['click', 'change', ...];
  eventTypes.forEach(type => {
    rootElement.addEventListener(type, dispatchEvent);
  });
}</pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>事件存储</h3>
              <p>React维护一个映射关系，存储组件实例与其事件处理函数的对应关系。当组件挂载时，React会将事件处理函数添加到这个映射中。</p>
              <div class="code-snippet">
                <pre>// React内部事件存储结构
const listenerBank = {
  click: {
    // 以元素ID为键，存储事件处理器
    'element-id-1': [handler1, handler2],
    'element-id-2': [handler3]
  },
  change: {
    // ...
  }
}</pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>事件触发</h3>
              <p>当事件发生时，React会通过事件委托机制捕获事件，创建SyntheticEvent对象，然后根据事件类型和目标元素，从listenerBank中取出对应的事件处理函数执行。</p>
              <div class="code-snippet">
                <pre>function dispatchEvent(event) {
  // 创建合成事件
  const syntheticEvent = createSyntheticEvent(event);

  // 收集事件路径（冒泡路径）
  const path = getEventPath(event.target);

  // 模拟捕获阶段
  for (let i = path.length - 1; i >= 0; i--) {
    const listeners = getListeners(path[i], event.type, 'capture');
    executeListeners(listeners, syntheticEvent);
  }

  // 模拟冒泡阶段
  for (let i = 0; i < path.length; i++) {
    const listeners = getListeners(path[i], event.type, 'bubble');
    executeListeners(listeners, syntheticEvent);
  }
}</pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>事件池机制</h3>
              <p>React使用事件池来复用SyntheticEvent对象。事件处理函数执行后，事件对象的属性会被置空，以便复用。</p>
              <div class="code-snippet">
                <pre>// 事件池管理
const EVENT_POOL_SIZE = 10;
const eventPool = [];

function getPooledEvent(nativeEvent) {
  if (eventPool.length) {
    const event = eventPool.pop();
    event.nativeEvent = nativeEvent;
    // 重置其他属性
    return event;
  }
  return new SyntheticEvent(nativeEvent);
}

function releasePooledEvent(event) {
  event.nativeEvent = null;
  // 清除其他属性
  if (eventPool.length < EVENT_POOL_SIZE) {
    eventPool.push(event);
  }
}</pre>
              </div>
              <div class="warning">
                <i class="icon icon-warning"></i>
                <p>注意：在异步代码中访问事件对象时，需要调用<code>event.persist()</code>来阻止事件对象被回收</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-code"></i>
          </div>
          <h2>使用方式与最佳实践</h2>
        </div>

        <div class="usage-content">
          <div class="usage-card">
            <h3>基本使用</h3>
            <div class="code-block">
              <pre>function Button() {
  // 事件处理函数
  const handleClick = (e: React.MouseEvent) => {
    // e是合成事件
    console.log('Button clicked!', e.currentTarget);

    // 阻止默认行为和冒泡
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    &lt;button onClick={handleClick}&gt;
      Click Me
    &lt;/button&gt;
  );
}</pre>
            </div>
          </div>

          <div class="usage-card">
            <h3>事件池注意事项</h3>
            <div class="code-block">
              <pre>function AsyncComponent() {
  const handleClick = (e: React.MouseEvent) => {
    // 错误：在异步中直接访问事件对象
    // setTimeout(() => console.log(e), 100);

    // 正确：使用event.persist()
    e.persist();
    setTimeout(() => {
      console.log('Event details:', e);
    }, 100);
  };

  return &lt;div onClick={handleClick}&gt;Async Example&lt;/div&gt;;
}</pre>
            </div>
          </div>

          <div class="usage-card">
            <h3>自定义事件</h3>
            <div class="code-block">
              <pre>// 自定义事件组件
class CustomEventComponent extends React.Component {
  componentDidMount() {
    // 创建自定义事件
    const event = new CustomEvent('customEvent', {
      bubbles: true,
      detail: { message: 'Custom event data' }
    });

    // 触发自定义事件
    this.element.dispatchEvent(event);
  }

  render() {
    return (
      &lt;div ref={el => this.element = el}&gt;
        &lt;ChildComponent /&gt;
      &lt;/div&gt;
    );
  }
}

// 监听自定义事件
function ChildComponent() {
  useEffect(() => {
    const handler = (e) => {
      console.log('Custom event:', e.detail);
    };

    document.addEventListener('customEvent', handler);
    return () => document.removeEventListener('customEvent', handler);
  }, []);

  return &lt;div&gt;Child Component&lt;/div&gt;;
}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="faq-section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-question"></i>
          </div>
          <h2>常见问题解答</h2>
        </div>

        <div class="faq-list">
          <div class="faq-item">
            <h3>为什么React事件处理函数中的this需要绑定？</h3>
            <p>在类组件中，事件处理函数默认不会绑定组件实例的this。可以通过以下方式解决：</p>
            <ul>
              <li>构造函数中绑定：<code>this.handleClick = this.handleClick.bind(this)</code></li>
              <li>箭头函数：<code>handleClick = () => { ... }</code></li>
              <li>JSX中绑定：<code>onClick={() => this.handleClick()}</code>（不推荐，可能导致性能问题）</li>
            </ul>
          </div>

          <div class="faq-item">
            <h3>React v17中事件委托的变化</h3>
            <p>在React 17之前，所有事件都委托到document上。从v17开始：</p>
            <ul>
              <li>事件委托到React树的根容器（root container）</li>
              <li>支持多个React版本共存（微前端场景）</li>
              <li>更接近原生DOM事件行为</li>
            </ul>
          </div>

          <div class="faq-item">
            <h3>如何获取原生事件对象？</h3>
            <p>可以通过<code>event.nativeEvent</code>访问原生事件：</p>
            <div class="code-block">
              <pre>const handleClick = (e) => {
  const nativeEvent = e.nativeEvent;
  console.log('Native event:', nativeEvent);
};</pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <div class="summary">
        <h3>React事件机制总结</h3>
        <ul>
          <li>合成事件提供跨浏览器一致性</li>
          <li>基于事件委托实现高效事件处理</li>
          <li>事件池机制优化性能</li>
          <li>事件冒泡/捕获在React树而非DOM树</li>
        </ul>
      </div>
      <div class="footer-links">
        <a href="#">React官方文档</a>
        <a href="#">合成事件源码分析</a>
        <a href="#">事件系统最佳实践</a>
      </div>
      <p class="copyright"> React事件机制基础介绍 | 前端技术专题</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const eventSystems = ref([
  { name: '事件注册', react: 'JSX属性(如onClick)', native: 'addEventListener' },
  { name: '事件绑定', react: '事件委托到document/root', native: '直接绑定到元素' },
  { name: '事件对象', react: 'SyntheticEvent对象', native: '原生Event对象' },
  { name: '事件池', react: '有，事件对象会被复用', native: '无' },
  { name: '事件冒泡', react: '支持，但实际在root上处理', native: '支持' }
]);
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@light-color: #f8f9fa;
@dark-color: #212529;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.react-events-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @dark-color;
  background-color: #ffffff;
  line-height: 1.6;

  header {
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 40px;
    box-shadow: @card-shadow;

    .header-content {
      padding: 40px 30px 30px;
      text-align: center;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        max-width: 800px;
        margin: 0 auto 20px;
      }

      .header-badge {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;

        .badge {
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          backdrop-filter: blur(5px);
        }
      }
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    .icon-box {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;

      .icon {
        width: 30px;
        height: 30px;
        background-color: white;
        mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;

        &.icon-lightbulb {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z'/%3E%3C/svg%3E");
        }

        &.icon-compare {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'/%3E%3C/svg%3E");
        }

        &.icon-gear {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E");
        }

        &.icon-code {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'/%3E%3C/svg%3E");
        }

        &.icon-question {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E");
        }

        &.icon-warning {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'/%3E%3C/svg%3E");
        }

        &.icon-check {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
        }
      }
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
      color: @secondary-color;
    }
  }

  .concept-section {
    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 25px;

      .concept-card {
        background: white;
        border-radius: 12px;
        padding: 25px;
        box-shadow: @card-shadow;
        border-top: 4px solid @accent-color;

        h3 {
          margin-top: 0;
          color: @secondary-color;
          font-size: 1.4rem;
        }

        p {
          line-height: 1.7;
        }
      }

      .feature-list {
        margin-top: 20px;

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .feature-icon {
            width: 24px;
            height: 24px;
            background-color: @success-color;
            border-radius: 50%;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }
        }
      }

      .reason-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;

          .reason-icon {
            min-width: 28px;
            height: 28px;
            background: linear-gradient(135deg, @primary-color, @secondary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            font-size: 0.9rem;
          }

          .reason-text {
            flex: 1;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .comparison-section {
    .comparison-table {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: @card-shadow;

      .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        font-weight: 600;

        .header-cell {
          padding: 18px 20px;
          text-align: center;

          &:first-child {
            text-align: left;
          }
        }
      }

      .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        border-bottom: 1px solid @border-color;

        &:nth-child(even) {
          background-color: #f9fbfd;
        }

        &:last-child {
          border-bottom: none;
        }

        .row-cell {
          padding: 16px 20px;
          text-align: center;

          &:first-child {
            text-align: left;
            font-weight: 600;
            color: @secondary-color;
          }
        }
      }
    }
  }

  .implementation-section {
    .implementation-steps {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;

      .step {
        display: flex;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 24px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, @accent-color, transparent);
          z-index: 0;
        }

        &:last-child::before {
          display: none;
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, @primary-color, @secondary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin-right: 20px;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: @card-shadow;

          h3 {
            margin-top: 0;
            color: @secondary-color;
            font-size: 1.4rem;
          }

          p {
            line-height: 1.7;
            margin-bottom: 20px;
          }
        }
      }
    }

    .code-snippet {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 20px;
      position: relative;

      pre {
        margin: 0;
      }
    }

    .warning {
      display: flex;
      background: #fff8f8;
      border-left: 4px solid @warning-color;
      padding: 15px;
      border-radius: 0 8px 8px 0;

      .icon {
        min-width: 30px;
        height: 30px;
        background-color: @warning-color;
        mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;
        margin-right: 15px;
      }

      p {
        margin: 0;
        line-height: 1.5;

        code {
          background: rgba(255, 159, 28, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          color: #d35400;
        }
      }
    }
  }

  .usage-section {
    .usage-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;

      .usage-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: @card-shadow;

        h3 {
          background: linear-gradient(135deg, @accent-color, lighten(@accent-color, 10%));
          color: white;
          margin: 0;
          padding: 18px 25px;
          font-size: 1.3rem;
        }
      }
    }

    .code-block {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 25px;
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      overflow-x: auto;

      pre {
        margin: 0;
      }
    }
  }

  .faq-section {
    .faq-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;

      .faq-item {
        background: white;
        border-radius: 12px;
        padding: 25px;
        box-shadow: @card-shadow;
        border-left: 4px solid @primary-color;

        h3 {
          margin-top: 0;
          color: @secondary-color;
          font-size: 1.3rem;
        }

        p,
        ul {
          line-height: 1.7;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 8px;
            position: relative;
            padding-left: 15px;

            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 10px;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: @primary-color;
            }
          }
        }

        .code-block {
          background: #f8f9fa;
          border: 1px solid @border-color;
          border-radius: 8px;
          padding: 15px;
          margin-top: 15px;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          overflow-x: auto;

          pre {
            margin: 0;
            color: @secondary-color;
          }
        }
      }
    }
  }

  footer {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid @border-color;

    .summary {
      background: linear-gradient(135deg, fade(@primary-color, 5%), fade(@accent-color, 5%));
      padding: 25px;
      border-radius: 12px;
      margin-bottom: 25px;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        font-size: 1.4rem;
      }

      ul {
        padding-left: 20px;
        columns: 2;
        column-gap: 40px;

        li {
          margin-bottom: 10px;
          break-inside: avoid;
          line-height: 1.6;
        }
      }
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 20px;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .copyright {
      text-align: center;
      color: lighten(@dark-color, 30%);
      font-size: 0.9rem;
      margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
    .concept-cards {
      grid-template-columns: 1fr !important;
    }

    .comparison-table {

      .table-header,
      .table-row {
        grid-template-columns: 1fr 1fr;

        .header-cell:first-child,
        .row-cell:first-child {
          display: none;
        }
      }
    }

    .implementation-steps {
      .step {
        flex-direction: column;

        .step-number {
          margin-bottom: 15px;
        }

        &::before {
          left: 25px;
          top: 50px;
          bottom: -30px;
        }
      }
    }

    .usage-content {
      grid-template-columns: 1fr !important;
    }

    footer .summary ul {
      columns: 1 !important;
    }
  }
}
</style>
