<template>
  <div class="events-guide">
    <header class="guide-header">
      <div class="header-content">
        <h1>⚡ Node.js Events 事件模块</h1>
        <p>深入理解Node.js事件驱动架构的核心</p>
      </div>
      <div class="node-logo">
        <div class="logo-circle">E</div>
        <div class="logo-text">EventEmitter</div>
      </div>
    </header>

    <div class="content-container">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="section-icon">🔍</div>
          <h2>Events 模块简介</h2>
        </div>
        <div class="intro-content">
          <p>
            Node.js 的 <code>events</code> 模块提供了实现事件驱动编程的基础。核心是 <code>EventEmitter</code> 类，
            它允许对象发布/订阅事件，是 Node.js 异步事件驱动架构的基石。
          </p>
          <div class="event-loop">
            <div class="loop-diagram">
              <div class="loop-item">事件触发</div>
              <div class="arrow">➡️</div>
              <div class="loop-item">事件循环</div>
              <div class="arrow">➡️</div>
              <div class="loop-item">监听器执行</div>
              <div class="arrow">➡️</div>
              <div class="loop-item">回调完成</div>
            </div>
            <div class="loop-description">
              <p>Node.js 的事件循环机制驱动着整个异步操作流程</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心概念 -->
      <section class="concepts-section">
        <div class="section-header">
          <div class="section-icon">🧩</div>
          <h2>核心概念</h2>
        </div>

        <div class="concepts-grid">
          <div class="concept-card">
            <div class="concept-icon">📢</div>
            <h3>EventEmitter 类</h3>
            <p>所有能触发事件的对象都是 EventEmitter 类的实例</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">👂</div>
            <h3>事件监听器</h3>
            <p>绑定到事件的回调函数，在事件触发时执行</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🔥</div>
            <h3>事件触发</h3>
            <p>通过 emit() 方法触发事件并执行所有监听器</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>异步事件</h3>
            <p>事件监听器按注册顺序同步执行，但可包含异步操作</p>
          </div>
        </div>
      </section>

      <!-- 核心方法 -->
      <section class="methods-section">
        <div class="section-header">
          <div class="section-icon">⚙️</div>
          <h2>核心方法</h2>
        </div>

        <div class="methods-tabs">
          <button v-for="(tab, index) in tabs" :key="index" :class="['tab-button', { active: activeTab === index }]"
            @click="activeTab = index">
            {{ tab }}
          </button>
        </div>

        <!-- 事件监听 -->
        <div v-show="activeTab === 0" class="methods-content">
          <div class="method-card">
            <div class="method-header">
              <h3>emitter.on(eventName, listener)</h3>
              <div class="method-type">基本</div>
            </div>
            <p>添加事件监听器到监听器数组的末尾</p>
            <div class="code-block">
              <pre><code>const EventEmitter = require('events');
const emitter = new EventEmitter();

// 监听 'event' 事件
emitter.on('event', () => {
  console.log('事件触发!');
});

// 触发事件
emitter.emit('event');  // 输出: 事件触发!</code></pre>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <h3>emitter.once(eventName, listener)</h3>
              <div class="method-type">单次</div>
            </div>
            <p>添加单次监听器，监听器最多只会触发一次</p>
            <div class="code-block">
              <pre><code>emitter.once('single', () => {
  console.log('只触发一次');
});

emitter.emit('single'); // 输出: 只触发一次
emitter.emit('single'); // 没有输出</code></pre>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <h3>emitter.prependListener(eventName, listener)</h3>
              <div class="method-type">优先级</div>
            </div>
            <p>添加事件监听器到监听器数组的开头</p>
            <div class="code-block">
              <pre><code>emitter.on('order', () => console.log('第二个'));
emitter.prependListener('order', () => console.log('第一个'));

emitter.emit('order');
// 输出:
// 第一个
// 第二个</code></pre>
            </div>
          </div>
        </div>

        <!-- 事件触发 -->
        <div v-show="activeTab === 1" class="methods-content">
          <div class="method-card">
            <div class="method-header">
              <h3>emitter.emit(eventName[, ...args])</h3>
              <div class="method-type">触发</div>
            </div>
            <p>触发指定事件，按注册顺序同步调用每个监听器</p>
            <div class="code-block">
              <pre><code>emitter.on('data', (a, b) => {
  console.log(`参数: ${a}, ${b}`);
});

emitter.emit('data', 1, 'two');
// 输出: 参数: 1, two</code></pre>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <h3>emitter.eventNames()</h3>
              <div class="method-type">信息</div>
            </div>
            <p>返回已注册监听器的事件名数组</p>
            <div class="code-block">
              <pre><code>emitter.on('start', () => {});
emitter.on('end', () => {});

console.log(emitter.eventNames());
// 输出: [ 'start', 'end' ]</code></pre>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <h3>emitter.listenerCount(eventName)</h3>
              <div class="method-type">信息</div>
            </div>
            <p>返回指定事件的监听器数量</p>
            <div class="code-block">
              <pre><code>emitter.on('log', () => {});
emitter.on('log', () => {});

console.log(emitter.listenerCount('log'));
// 输出: 2</code></pre>
            </div>
          </div>
        </div>

        <!-- 事件管理 -->
        <div v-show="activeTab === 2" class="methods-content">
          <div class="method-card">
            <div class="method-header">
              <h3>emitter.off(eventName, listener)</h3>
              <div class="method-type">移除</div>
            </div>
            <p>从指定事件中移除特定的监听器</p>
            <div class="code-block">
              <pre><code>const listener = () => console.log('将被移除');

emitter.on('test', listener);
emitter.off('test', listener);

emitter.emit('test'); // 没有输出</code></pre>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <h3>emitter.removeAllListeners([eventName])</h3>
              <div class="method-type">移除</div>
            </div>
            <p>移除所有或指定事件的监听器</p>
            <div class="code-block">
              <pre><code>emitter.on('event1', () => {});
emitter.on('event2', () => {});

// 移除所有监听器
emitter.removeAllListeners();

// 或仅移除特定事件
emitter.removeAllListeners('event1');</code></pre>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <h3>emitter.setMaxListeners(n)</h3>
              <div class="method-type">配置</div>
            </div>
            <p>设置单个事件的最大监听器数量（默认10）</p>
            <div class="code-block">
              <pre><code>// 避免内存泄漏警告
emitter.setMaxListeners(20);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenarios-section">
        <div class="section-header">
          <div class="section-icon">💡</div>
          <h2>使用场景</h2>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>HTTP服务器</h3>
            <p>处理请求、响应和错误事件</p>
            <pre class="code-snippet">server.on('request', handleRequest);</pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">📦</div>
            <h3>流操作</h3>
            <p>监听数据流事件（data, end, error）</p>
            <pre class="code-snippet">stream.on('data', processChunk);</pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">⏱️</div>
            <h3>定时任务</h3>
            <p>创建自定义定时器事件系统</p>
            <pre class="code-snippet">timer.on('tick', updateDisplay);</pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <h3>插件系统</h3>
            <p>通过事件钩子实现可扩展架构</p>
            <pre class="code-snippet">app.on('pluginInit', initPlugin);</pre>
          </div>
        </div>
      </section>

      <!-- 高级用法 -->
      <section class="advanced-section">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h2>高级用法</h2>
        </div>

        <div class="advanced-content">
          <div class="advanced-card">
            <h3>错误处理</h3>
            <p>EventEmitter 实例在发生错误时会触发 'error' 事件</p>
            <div class="code-block">
              <pre><code>emitter.on('error', (err) => {
  console.error('发生错误:', err.message);
});

// 触发错误事件
emitter.emit('error', new Error('示例错误'));</code></pre>
            </div>
          </div>

          <div class="advanced-card">
            <h3>继承 EventEmitter</h3>
            <p>创建自定义类并继承 EventEmitter 功能</p>
            <div class="code-block">
              <pre><code>const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    // 自定义逻辑
  }

  doSomething() {
    // 执行操作...
    this.emit('done');
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('done', () => {
  console.log('操作完成');
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="section-icon">✅</div>
          <h2>最佳实践</h2>
        </div>

        <div class="practices-list">
          <div class="practice-item">
            <div class="practice-icon">⚠️</div>
            <div>
              <h3>始终处理 'error' 事件</h3>
              <p>未处理的 'error' 事件会导致 Node.js 进程崩溃</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">📏</div>
            <div>
              <h3>避免内存泄漏</h3>
              <p>及时移除不再需要的监听器，尤其是在长时间运行的应用中</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">🔄</div>
            <div>
              <h3>使用 once() 替代 on()</h3>
              <p>对于只需要触发一次的事件，使用 once() 可自动清理监听器</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">📚</div>
            <div>
              <h3>异步事件顺序</h3>
              <p>事件监听器同步执行，但可以在监听器内部执行异步操作</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="guide-footer">
        <div class="footer-content">
          <h3>深入学习资源</h3>
          <div class="resources">
            <a href="https://nodejs.org/api/events.html" target="_blank">Node.js 官方文档</a>
            <a href="https://github.com/nodejs/node/blob/master/lib/events.js" target="_blank">Events 模块源码</a>
            <a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/" target="_blank">事件循环指南</a>
          </div>
        </div>
        <div class="footer-note">
          <p>掌握事件驱动编程是成为Node.js专家的关键一步，祝你编码愉快！🚀</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ['事件监听', '事件触发', '事件管理'];
const activeTab = ref(0);
</script>

<style lang="less" scoped>


.events-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #2d3748;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6eeff 100%);
  min-height: 100vh;

  * {
    box-sizing: border-box;
  }
}

.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(120deg, #4c1d95 0%, #7e22ce 100%);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
  color: white;

  .header-content {
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    p {
      font-size: 1.2rem;
      color: #e9d5ff;
      margin-top: 0;
    }
  }
}

.node-logo {
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo-circle {
    width: 80px;
    height: 80px;
    background: #8b5cf6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  .logo-text {
    margin-top: 0.8rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: #e9d5ff;
  }
}

.content-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(120deg, #f5f3ff 0%, #ede9fe 100%);
  border-bottom: 2px solid #ddd6fe;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #7e22ce;
  }

  .section-icon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    background: #8b5cf6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}

.intro-section {
  .intro-content {
    padding: 2rem;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4b5563;
      margin-bottom: 2rem;

      code {
        background: #ede9fe;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        color: #7e22ce;
        font-family: 'Fira Code', monospace;
      }
    }
  }
}

.event-loop {
  background: #f5f3ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid #ddd6fe;

  .loop-diagram {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;

    .loop-item {
      background: #8b5cf6;
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
    }

    .arrow {
      font-size: 1.5rem;
      color: #7e22ce;
    }
  }

  .loop-description {
    text-align: center;

    p {
      margin: 0;
      color: #7e22ce;
      font-weight: 500;
    }
  }
}

.concepts-section {
  .concepts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: #8b5cf6;
  }

  h3 {
    color: #7e22ce;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }
}

.methods-section {
  .methods-tabs {
    display: flex;
    padding: 1rem 2rem;
    background: #f5f3ff;
    border-bottom: 1px solid #ddd6fe;
  }

  .tab-button {
    padding: 0.8rem 1.5rem;
    background: transparent;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    border-radius: 8px;
    margin-right: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      background: #ede9fe;
      color: #7e22ce;
    }

    &.active {
      background: #8b5cf6;
      color: white;
      box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
    }
  }
}

.methods-content {
  padding: 1.5rem 2rem;
}

.method-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #8b5cf6;

  .method-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #7e22ce;
      font-family: 'Fira Code', monospace;
    }
  }

  .method-type {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    background: #ede9fe;
    color: #7e22ce;
  }

  p {
    color: #4b5563;
    margin-bottom: 1.2rem;
    line-height: 1.6;
  }
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

  pre {
    margin: 0;
  }

  code {
    display: block;
  }
}

.scenarios-section {
  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }
}

.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.15);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: #8b5cf6;
  }

  h3 {
    color: #7e22ce;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin: 0 0 1rem;
    line-height: 1.6;
  }

  .code-snippet {
    background: #f5f3ff;
    padding: 0.6rem;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: #7e22ce;
    margin: 0;
    text-align: center;
  }
}

.advanced-section {
  .advanced-content {
    padding: 1.5rem 2rem;
  }
}

.advanced-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #ddd6fe;

  h3 {
    color: #7e22ce;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  p {
    color: #4b5563;
    margin-bottom: 1.2rem;
    line-height: 1.6;
  }
}

.best-practices {
  .practices-list {
    padding: 1.5rem 2rem;
  }
}

.practice-item {
  display: flex;
  padding: 1.5rem;
  background: #f5f3ff;
  border-radius: 10px;
  margin-bottom: 1rem;
  border-left: 4px solid #8b5cf6;
  align-items: center;

  .practice-icon {
    font-size: 1.5rem;
    margin-right: 1.5rem;
    color: #8b5cf6;
    flex-shrink: 0;
  }

  h3 {
    color: #7e22ce;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4b5563;
    margin: 0;
    line-height: 1.6;
  }
}

.guide-footer {
  background: linear-gradient(120deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 16px 16px;

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #e0f2fe;
    }
  }

  .resources {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    a {
      color: #c4b5fd;
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      border: 2px solid #334155;
      transition: all 0.3s ease;

      &:hover {
        background: #8b5cf6;
        color: white;
        border-color: #8b5cf6;
      }
    }
  }

  .footer-note {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid #334155;
    max-width: 800px;
    margin: 0 auto;

    p {
      font-size: 1.1rem;
      color: #c4b5fd;
      font-weight: 500;
    }
  }
}

@media (max-width: 768px) {
  .events-guide {
    padding: 1rem;
  }

  .guide-header {
    flex-direction: column;
    text-align: center;

    .node-logo {
      margin-top: 1.5rem;
    }
  }

  .section-header {
    padding: 1rem;
  }

  .concepts-grid,
  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .methods-tabs {
    flex-wrap: wrap;
  }

  .tab-button {
    margin-bottom: 0.5rem;
  }

  .event-loop .loop-diagram {
    flex-direction: column;

    .loop-item {
      margin-bottom: 1rem;
    }

    .arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
