<template>
  <div class="cleanup-container">
    <header class="header">
      <h1>JavaScript 资源清理指南</h1>
      <p>避免内存泄漏，提升应用性能</p>
    </header>

    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-value">70%</div>
        <div class="stat-label">内存泄漏由未清理资源引起</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">12+</div>
        <div class="stat-label">需要清理的资源类型</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">40%</div>
        <div class="stat-label">性能问题可由此解决</div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">⚠️</div>
        <h2>为什么需要清理资源？</h2>
      </div>

      <div class="leak-demonstration">
        <div class="leak-causes">
          <h3>未清理资源的后果</h3>
          <ul>
            <li><span class="badge high">内存泄漏</span> 应用内存使用持续增长</li>
            <li><span class="badge medium">性能下降</span> 垃圾回收频繁运行</li>
            <li><span class="badge high">响应变慢</span> 界面卡顿，交互延迟</li>
            <li><span class="badge critical">应用崩溃</span> 内存耗尽导致页面崩溃</li>
            <li><span class="badge medium">电池消耗</span> 移动设备电池快速耗尽</li>
          </ul>
        </div>

        <div class="leak-visual">
          <div class="memory-chart">
            <div class="chart">
              <div class="line leak-line"></div>
              <div class="line normal-line"></div>
            </div>
            <div class="chart-labels">
              <div class="label">内存使用</div>
              <div class="legend">
                <span class="leak-legend"></span> 未清理资源
                <span class="normal-legend"></span> 正常应用
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="resource-section">
      <div class="section-header">
        <div class="icon">🧹</div>
        <h2>需要清理的资源类型</h2>
      </div>

      <div class="resource-grid">
        <div
          v-for="(resource, index) in resources"
          :key="index"
          class="resource-card"
          :class="resource.type"
        >
          <div class="resource-header">
            <div class="resource-icon">{{ resource.icon }}</div>
            <h3>{{ resource.title }}</h3>
          </div>
          <div class="resource-content">
            <p>{{ resource.description }}</p>

            <div class="cleanup-methods">
              <h4>清理方法：</h4>
              <ul>
                <li v-for="(method, methodIndex) in resource.methods" :key="methodIndex">
                  {{ method }}
                </li>
              </ul>
            </div>

            <div class="code-example">
              <pre><code>{{ resource.codeExample }}</code></pre>
            </div>

            <div class="best-practice">
              <h4>最佳实践：</h4>
              <p>{{ resource.bestPractice }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="framework-section">
      <div class="section-header">
        <div class="icon">⚛️</div>
        <h2>框架中的资源清理</h2>
      </div>

      <div class="framework-tabs">
        <div
          v-for="(framework, index) in frameworks"
          :key="index"
          class="tab"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ framework.name }}
        </div>
      </div>

      <div class="framework-content">
        <div v-for="(framework, index) in frameworks" :key="index" v-show="activeTab === index">
          <h3>{{ framework.name }} 清理模式</h3>
          <p>{{ framework.description }}</p>

          <div class="framework-code">
            <pre><code>{{ framework.codeExample }}</code></pre>
          </div>

          <div class="framework-practices">
            <h4>最佳实践：</h4>
            <ul>
              <li v-for="(practice, pIndex) in framework.practices" :key="pIndex">
                {{ practice }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="tool-section">
      <div class="section-header">
        <div class="icon">🔍</div>
        <h2>检测工具与技术</h2>
      </div>

      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-icon">🧪</div>
          <h3>Chrome DevTools</h3>
          <ul>
            <li>内存快照对比</li>
            <li>分配时间线分析</li>
            <li>堆快照检查</li>
          </ul>
        </div>
        <div class="tool-card">
          <div class="tool-icon">📊</div>
          <h3>性能监控</h3>
          <ul>
            <li>Performance Observer API</li>
            <li>内存使用监控</li>
            <li>垃圾回收跟踪</li>
          </ul>
        </div>
        <div class="tool-card">
          <div class="tool-icon">⚙️</div>
          <h3>代码检查工具</h3>
          <ul>
            <li>ESLint 内存泄漏规则</li>
            <li>静态代码分析</li>
            <li>自动化测试检测</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="checklist-section">
      <div class="section-header">
        <div class="icon">✅</div>
        <h2>资源清理清单</h2>
      </div>

      <div class="checklist">
        <div v-for="(item, index) in checklist" :key="index" class="checklist-item">
          <input type="checkbox" :id="'check-' + index" />
          <label :for="'check-' + index">{{ item }}</label>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>JavaScript 资源清理最佳实践 | 提升应用性能与稳定性</p>
      <p> 前端性能优化指南</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const resources = ref([
  {
    type: 'event',
    icon: '🎧',
    title: '事件监听器',
    description: 'DOM 元素上的事件监听器在元素移除后仍可能保留引用',
    methods: [
      '在元素移除前使用 removeEventListener()',
      '使用事件委托减少监听器数量',
      '使用 AbortController 批量管理监听器',
    ],
    codeExample: `// 添加事件监听器
const button = document.getElementById('btn');
const handler = () => console.log('Clicked!');
button.addEventListener('click', handler);

// 清理事件监听器
button.removeEventListener('click', handler);

// 使用 AbortController
const controller = new AbortController();
button.addEventListener('click', handler, {
  signal: controller.signal
});
// 清理所有关联监听器
controller.abort();`,
    bestPractice: '在组件卸载/元素移除时清理所有事件监听器',
  },
  {
    type: 'timer',
    icon: '⏱️',
    title: '定时器',
    description: 'setTimeout 和 setInterval 会持续运行直到被清除',
    methods: [
      '使用 clearTimeout() 和 clearInterval()',
      '在组件卸载时清理所有定时器',
      '封装自动清理的定时器钩子',
    ],
    codeExample: `// 设置定时器
const timerId = setInterval(() => {
  console.log('Running...');
}, 1000);

// 清理定时器
clearInterval(timerId);

// React 示例
useEffect(() => {
  const timerId = setInterval(/*...*/);

  return () => clearInterval(timerId); // 清理函数
}, []);`,
    bestPractice: '为每个定时器保存引用并在不再需要时清理',
  },
  {
    type: 'animation',
    icon: '🎬',
    title: 'RequestAnimationFrame',
    description: '动画循环会持续运行直到取消',
    methods: ['使用 cancelAnimationFrame()', '在组件卸载时取消动画循环', '在动画不可见时暂停'],
    codeExample: `let animationId;

function animate() {
  // 动画逻辑
  animationId = requestAnimationFrame(animate);
}

// 启动动画
animate();

// 取消动画
cancelAnimationFrame(animationId);`,
    bestPractice: '在组件卸载或页面隐藏时取消所有动画帧',
  },
  {
    type: 'observer',
    icon: '👀',
    title: 'IntersectionObserver',
    description: '观察器会持续观察元素直到断开连接',
    methods: [
      '使用 disconnect() 方法',
      '在组件卸载时断开连接',
      '使用 unobserve() 停止观察特定元素',
    ],
    codeExample: `const observer = new IntersectionObserver(entries => {
  // 处理交集变化
});

observer.observe(element);

// 清理观察器
observer.disconnect();
// 或停止观察特定元素
observer.unobserve(element);`,
    bestPractice: '在观察的元素被移除时断开观察器连接',
  },
  {
    type: 'observer',
    icon: '🔄',
    title: 'MutationObserver',
    description: '监视 DOM 变化的观察器需要手动断开',
    methods: ['使用 disconnect() 方法', '在组件卸载时断开连接', '只在必要时观察'],
    codeExample: `const observer = new MutationObserver(mutations => {
  // 处理DOM变化
});

observer.observe(target, { attributes: true });

// 清理观察器
observer.disconnect();`,
    bestPractice: '避免长时间运行 MutationObserver，在不需要时断开',
  },
  {
    type: 'observer',
    icon: '📏',
    title: 'ResizeObserver',
    description: '监视元素尺寸变化的观察器',
    methods: [
      '使用 disconnect() 方法',
      '在组件卸载时断开连接',
      '使用 unobserve() 停止观察特定元素',
    ],
    codeExample: `const resizeObserver = new ResizeObserver(entries => {
  // 处理尺寸变化
});

resizeObserver.observe(element);

// 清理观察器
resizeObserver.disconnect();`,
    bestPractice: '在元素移除或组件卸载时断开观察器',
  },
  {
    type: 'connection',
    icon: '📡',
    title: 'WebSocket 连接',
    description: 'WebSocket 连接会持续占用资源直到关闭',
    methods: ['使用 close() 方法', '在页面卸载前关闭连接', '实现重连机制而非创建新连接'],
    codeExample: `const socket = new WebSocket('wss://example.com');

// 处理消息
socket.addEventListener('message', event => {
  console.log('Message:', event.data);
});

// 关闭连接
socket.close();

// 添加关闭事件
window.addEventListener('beforeunload', () => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
});`,
    bestPractice: '在页面卸载或组件销毁时关闭 WebSocket 连接',
  },
  {
    type: 'closure',
    icon: '📦',
    title: '闭包引用',
    description: '闭包可能无意中保留对大对象的引用',
    methods: [
      '避免在闭包中引用大对象',
      '在不再需要时手动解除引用 (obj = null)',
      '使用模块模式限制作用域',
    ],
    codeExample: `function createClosure() {
  const largeData = new Array(1000000).fill('data');
  let count = 0;

  // 闭包引用 largeData
  return function() {
    console.log(count++);
    // 即使不再需要 largeData，它仍然被保留
  };
}

// 解决方案
function optimizedClosure() {
  let count = 0;
  const largeData = new Array(1000000).fill('data');

  // 使用数据后释放
  processData(largeData);
  largeData = null; // 释放引用

  return function() {
    console.log(count++);
  };
}`,
    bestPractice: '谨慎处理闭包中的变量引用，及时释放不再需要的大对象',
  },
  {
    type: 'dom',
    icon: '🏷️',
    title: 'DOM 元素引用',
    description: '对已移除 DOM 元素的引用会阻止其被垃圾回收',
    methods: [
      '在移除元素后解除引用 (elementRef = null)',
      '使用 WeakMap/WeakSet 存储 DOM 引用',
      '避免在全局对象中存储 DOM 元素',
    ],
    codeExample: `// 存储DOM引用
const domRefs = {
  button: document.getElementById('btn'),
  container: document.getElementById('container')
};

// 移除容器元素
document.body.removeChild(domRefs.container);

// 即使从DOM移除，JS仍持有引用
// 解决方案：解除引用
domRefs.container = null;`,
    bestPractice: '在元素从 DOM 移除后，及时清除对其的 JavaScript 引用',
  },
  {
    type: 'media',
    icon: '🎥',
    title: '媒体资源',
    description: '视频、音频元素会持续占用内存直到释放',
    methods: ['设置 src 为空字符串释放资源', '调用 load() 方法重置', '移除元素前暂停并断开源'],
    codeExample: `const video = document.getElementById('myVideo');

// 清理视频资源
video.pause();
video.src = '';
video.load();

// 移除事件监听器
video.removeEventListener('timeupdate', handler);`,
    bestPractice: '在媒体元素不再需要时，彻底释放其资源',
  },
  {
    type: 'library',
    icon: '📚',
    title: '第三方库实例',
    description: '图表、地图等库创建的实例需要手动销毁',
    methods: ['查阅文档了解销毁方法', '在组件卸载时调用销毁方法', '使用库提供的清理钩子'],
    codeExample: `// 创建图表实例
const chart = new Chart(ctx, config);

// 清理图表
chart.destroy();

// Vue 示例
onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
  }
});`,
    bestPractice: '对每个第三方库实例，在不再需要时调用其销毁方法',
  },
  {
    type: 'worker',
    icon: '👷',
    title: 'Web Workers',
    description: 'Worker 线程会持续运行直到终止',
    methods: ['使用 worker.terminate()', '在组件卸载时终止 Worker', '使用 Worker 池管理'],
    codeExample: `const worker = new Worker('worker.js');

// 向Worker发送消息
worker.postMessage(data);

// 终止Worker
worker.terminate();

// React 示例
useEffect(() => {
  const worker = new Worker('worker.js');

  return () => worker.terminate(); // 清理函数
}, []);`,
    bestPractice: '在 Worker 不再需要时及时终止，避免资源浪费',
  },
])

const frameworks = ref([
  {
    name: 'Vue 3',
    description: '使用 Composition API 的清理机制',
    codeExample: `import { onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    let timerId;
    const button = ref(null);

    const clickHandler = () => {
      console.log('Button clicked');
    };

    onMounted(() => {
      // 添加事件监听器
      button.value.addEventListener('click', clickHandler);

      // 设置定时器
      timerId = setInterval(() => {
        console.log('Timer running');
      }, 1000);
    });

    onBeforeUnmount(() => {
      // 清理事件监听器
      button.value.removeEventListener('click', clickHandler);

      // 清理定时器
      clearInterval(timerId);
    });

    return { button };
  }
}`,
    practices: [
      '使用 onBeforeUnmount 生命周期钩子',
      '使用 ref 存储需要清理的资源引用',
      '对于自定义组合函数，返回清理函数',
      '使用 watchEffect 的清理回调',
      '在路由守卫中清理全局资源',
    ],
  },
  {
    name: 'React',
    description: '使用 useEffect 的清理函数机制',
    codeExample: `import React, { useEffect, useRef } from 'react';

function MyComponent() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const clickHandler = () => {
      console.log('Button clicked');
    };

    // 添加事件监听器
    button.addEventListener('click', clickHandler);

    const timerId = setInterval(() => {
      console.log('Timer running');
    }, 1000);

    // 清理函数
    return () => {
      // 移除事件监听器
      button.removeEventListener('click', clickHandler);

      // 清理定时器
      clearInterval(timerId);
    };
  }, []);

  return <button ref={buttonRef}>Click Me</button>;
}`,
    practices: [
      '始终从 useEffect 返回清理函数',
      '使用 useRef 存储 DOM 引用',
      '使用自定义 Hook 封装资源清理',
      '使用 AbortController 取消 fetch 请求',
      '在卸载前清理所有订阅和监听器',
    ],
  },
  {
    name: 'Angular',
    description: '使用 ngOnDestroy 生命周期钩子',
    codeExample: `import { Component, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: '<button #myButton>Click Me</button>'
})
export class MyComponent implements OnDestroy {
  private timerId: any;
  private clickHandler: () => void;

  constructor(private elementRef: ElementRef) {
    this.clickHandler = () => {
      console.log('Button clicked');
    };

    const button = this.elementRef.nativeElement.querySelector('button');
    button.addEventListener('click', this.clickHandler);

    this.timerId = setInterval(() => {
      console.log('Timer running');
    }, 1000);
  }

  ngOnDestroy() {
    // 清理事件监听器
    const button = this.elementRef.nativeElement.querySelector('button');
    button.removeEventListener('click', this.clickHandler);

    // 清理定时器
    clearInterval(this.timerId);
  }
}`,
    practices: [
      '实现 ngOnDestroy 接口',
      '使用 RxJS takeUntil 操作符自动取消订阅',
      '使用 @HostListener 管理事件监听器',
      '在服务中提供资源清理方法',
      '使用 Angular 的 Renderer2 安全操作 DOM',
    ],
  },
])

const checklist = ref([
  '所有事件监听器已移除',
  '所有定时器已清除',
  '所有动画帧已取消',
  '所有观察器已断开连接',
  '所有 WebSocket 连接已关闭',
  '所有 Worker 线程已终止',
  '所有第三方库实例已销毁',
  '所有媒体资源已释放',
  '所有闭包中的大对象引用已释放',
  '所有分离的 DOM 引用已清除',
  '所有全局资源已清理',
  '所有订阅和监听器已取消',
])
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@warning-color: #e74c3c;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@success-color: #27ae60;
@header-gradient: linear-gradient(135deg, @primary-color, #8e44ad);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.cleanup-container {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 50px 20px;
  background: @header-gradient;
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
  }

  p {
    font-size: 1.4rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.stats-bar {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px 15px;
  text-align: center;
  flex: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: @primary-color;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.content-section,
.resource-section,
.framework-section,
.tool-section,
.checklist-section {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid @border-color;

  .icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.9rem;
    color: @text-color;
  }
}

.leak-demonstration {
  display: flex;
  gap: 30px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.leak-causes {
  flex: 1;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: @text-color;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 15px;
      border-bottom: 1px solid @border-color;
      display: flex;
      align-items: center;
      font-size: 1.1rem;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-right: 15px;
  min-width: 80px;
  text-align: center;

  &.high {
    background: lighten(@warning-color, 40%);
    color: darken(@warning-color, 20%);
  }

  &.medium {
    background: lighten(#f39c12, 40%);
    color: darken(#f39c12, 20%);
  }

  &.critical {
    background: lighten(@warning-color, 30%);
    color: white;
  }
}

.leak-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.memory-chart {
  width: 100%;
  max-width: 500px;

  .chart {
    height: 250px;
    position: relative;
    border-bottom: 2px solid @text-color;
    border-left: 2px solid @text-color;
    margin-bottom: 15px;
  }

  .line {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;

    &.leak-line {
      background: @warning-color;
      animation: leakAnimation 8s infinite linear;
    }

    &.normal-line {
      background: @primary-color;
      animation: normalAnimation 8s infinite linear;
      opacity: 0.7;
    }
  }

  .chart-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .legend {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      display: inline-block;
      width: 20px;
      height: 3px;

      &.leak-legend {
        background: @warning-color;
      }

      &.normal-legend {
        background: @primary-color;
      }
    }
  }
}

@keyframes leakAnimation {
  0% {
    height: 0;
  }
  25% {
    height: 60%;
  }
  50% {
    height: 70%;
  }
  75% {
    height: 90%;
  }
  100% {
    height: 100%;
  }
}

@keyframes normalAnimation {
  0% {
    height: 0;
  }
  25% {
    height: 50%;
  }
  50% {
    height: 30%;
  }
  75% {
    height: 60%;
  }
  100% {
    height: 40%;
  }
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.resource-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  border-top: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  &.event {
    border-top-color: #e74c3c;
  }
  &.timer {
    border-top-color: #f39c12;
  }
  &.animation {
    border-top-color: #9b59b6;
  }
  &.observer {
    border-top-color: #1abc9c;
  }
  &.connection {
    border-top-color: #3498db;
  }
  &.closure {
    border-top-color: #2ecc71;
  }
  &.dom {
    border-top-color: #34495e;
  }
  &.media {
    border-top-color: #e67e22;
  }
  &.library {
    border-top-color: #16a085;
  }
  &.worker {
    border-top-color: #8e44ad;
  }
}

.resource-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(52, 152, 219, 0.05);

  .resource-icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-size: 1.5rem;
    color: @text-color;
  }
}

.resource-content {
  padding: 20px;

  p {
    margin-bottom: 15px;
    line-height: 1.7;
    font-size: 1.1rem;
  }
}

.cleanup-methods {
  margin: 20px 0;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: @text-color;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
      line-height: 1.6;

      &::before {
        content: '•';
        position: absolute;
        left: 10px;
        top: 8px;
        color: @primary-color;
        font-weight: 700;
      }
    }
  }
}

.code-example {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 15px 0;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.best-practice {
  background: rgba(39, 174, 96, 0.08);
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: darken(@success-color, 10%);
  }

  p {
    margin: 0;
    font-weight: 500;
  }
}

.framework-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 2px solid @border-color;
}

.tab {
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  background: #f1f1f1;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: #e0e0e0;
  }

  &.active {
    background: @primary-color;
    color: white;
  }
}

.framework-content {
  padding: 20px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.7;
    font-size: 1.1rem;
  }
}

.framework-code {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 20px 0;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.framework-practices {
  margin-top: 25px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: @text-color;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 0;
      padding-left: 30px;
      position: relative;
      line-height: 1.6;
      border-bottom: 1px dashed @border-color;

      &::before {
        content: '✓';
        position: absolute;
        left: 10px;
        top: 10px;
        color: @success-color;
        font-weight: 700;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.tool-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border-top: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .tool-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  ul {
    list-style: none;
    padding: 0;
    text-align: left;

    li {
      padding: 10px 0;
      border-bottom: 1px dashed @border-color;
      padding-left: 30px;
      position: relative;

      &::before {
        content: '→';
        position: absolute;
        left: 10px;
        top: 10px;
        color: @primary-color;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.checklist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.checklist-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
  }

  input[type='checkbox'] {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    accent-color: @success-color;
  }

  label {
    font-size: 1.1rem;
    cursor: pointer;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  color: #7f8c8d;
  font-size: 1rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 8px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .resource-grid {
    grid-template-columns: 1fr;
  }
}
</style>
