<template>
  <div class="memory-management-container">
    <header class="header">
      <h1>JavaScript 内存管理深度指南</h1>
      <p>优化内存使用，避免泄漏与浪费</p>
    </header>

    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-value">70%</div>
        <div class="stat-label">应用存在内存泄漏</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">40%</div>
        <div class="stat-label">内存被浪费使用</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">12+</div>
        <div class="stat-label">常见泄漏场景</div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">🧠</div>
        <h2>JavaScript 内存管理基础</h2>
      </div>

      <div class="memory-cycle">
        <div class="cycle-step">
          <div class="step-icon">1</div>
          <h3>内存分配</h3>
          <p>创建变量、函数、对象时分配内存</p>
        </div>
        <div class="cycle-arrow">→</div>
        <div class="cycle-step">
          <div class="step-icon">2</div>
          <h3>内存使用</h3>
          <p>读写已分配的内存</p>
        </div>
        <div class="cycle-arrow">→</div>
        <div class="cycle-step">
          <div class="step-icon">3</div>
          <h3>内存释放</h3>
          <p>垃圾回收机制回收不再使用的内存</p>
        </div>
      </div>

      <div class="gc-mechanism">
        <div class="gc-card">
          <h3>引用计数</h3>
          <p>跟踪每个对象的引用数量，当引用数为0时回收</p>
          <div class="gc-problem"><span class="badge warning">问题</span> 循环引用无法回收</div>
        </div>
        <div class="gc-card">
          <h3>标记清除 (Mark-and-Sweep)</h3>
          <p>从根对象开始标记可达对象，清除未标记对象</p>
          <div class="gc-problem"><span class="badge success">优势</span> 解决循环引用问题</div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">⚠️</div>
        <h2>内存泄漏场景与防治</h2>
      </div>

      <div class="leak-categories">
        <div class="category-card" v-for="(category, index) in leakCategories" :key="index">
          <div class="category-icon">{{ category.icon }}</div>
          <h3>{{ category.title }}</h3>
          <p>{{ category.desc }}</p>
          <div class="count">{{ category.count }} 种场景</div>
        </div>
      </div>

      <div class="leak-scenarios">
        <div class="scenario-card" v-for="(scenario, index) in leakScenarios" :key="index">
          <div class="scenario-header">
            <span class="index">{{ index + 1 }}</span>
            <h3>{{ scenario.title }}</h3>
            <span class="severity" :class="scenario.severity">{{ scenario.severity }}</span>
          </div>
          <div class="scenario-content">
            <div class="description">
              <p>{{ scenario.description }}</p>
              <div class="code-example" v-if="scenario.code">
                <pre><code>{{ scenario.code }}</code></pre>
              </div>
            </div>
            <div class="solution">
              <h4>解决方案：</h4>
              <ul>
                <li v-for="(solution, solIndex) in scenario.solutions" :key="solIndex">
                  {{ solution }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">💸</div>
        <h2>内存浪费场景与优化</h2>
      </div>

      <div class="waste-stats">
        <div class="waste-stat">
          <div class="stat-value">~2MB</div>
          <div class="stat-label">平均未使用图片内存</div>
        </div>
        <div class="waste-stat">
          <div class="stat-value">15-30%</div>
          <div class="stat-label">冗余数据占用</div>
        </div>
        <div class="waste-stat">
          <div class="stat-value">~100ms</div>
          <div class="stat-label">GC暂停时间影响</div>
        </div>
      </div>

      <div class="optimization-techniques">
        <div
          class="technique-card"
          v-for="(technique, index) in optimizationTechniques"
          :key="index"
        >
          <div class="tech-header">
            <div class="tech-icon">{{ technique.icon }}</div>
            <h3>{{ technique.title }}</h3>
          </div>
          <div class="tech-content">
            <p>{{ technique.description }}</p>
            <div class="implementation">
              <h4>实现方式：</h4>
              <ul>
                <li v-for="(method, methodIndex) in technique.methods" :key="methodIndex">
                  {{ method }}
                </li>
              </ul>
            </div>
            <div class="code-example" v-if="technique.code">
              <pre><code>{{ technique.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">🔧</div>
        <h2>内存分析工具与技术</h2>
      </div>

      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-icon">🧪</div>
          <h3>Chrome DevTools</h3>
          <ul>
            <li>Memory 面板快照分析</li>
            <li>Allocation instrumentation 跟踪</li>
            <li>Performance 监控内存趋势</li>
          </ul>
        </div>
        <div class="tool-card">
          <div class="tool-icon">📊</div>
          <h3>Node.js 工具</h3>
          <ul>
            <li>node --inspect 调试</li>
            <li>heapdump 模块</li>
            <li>clinic.js 性能分析</li>
          </ul>
        </div>
        <div class="tool-card">
          <div class="tool-icon">⚙️</div>
          <h3>内存分析技术</h3>
          <ul>
            <li>三快照法（查找泄漏）</li>
            <li>支配树分析</li>
            <li>保留路径追踪</li>
          </ul>
        </div>
      </div>

      <div class="best-practices">
        <h3>内存管理最佳实践</h3>
        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
            <div class="practice-number">{{ index + 1 }}</div>
            <p>{{ practice }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>JavaScript 内存管理深度指南 | 使用 Vue 3 + TypeScript 构建</p>
      <p>© 2023 高性能 Web 应用开发</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 内存泄漏分类
const leakCategories = ref([
  { icon: '🏷️', title: '全局变量', desc: '意外创建的全局变量', count: 3 },
  { icon: '⏰', title: '定时器', desc: '未清理的定时器/回调', count: 4 },
  { icon: '📌', title: '闭包', desc: '不当使用的闭包', count: 3 },
  { icon: '🗑️', title: 'DOM引用', desc: '分离的DOM元素引用', count: 2 },
])

// 内存泄漏场景
const leakScenarios = ref([
  {
    title: '意外的全局变量',
    severity: 'high',
    description: '未使用 var/let/const 声明变量，导致变量挂载到 window 对象',
    code: `function createGlobal() {
  // 意外创建全局变量
  globalVar = '这是一个全局变量';
}`,
    solutions: [
      "始终使用 'use strict' 模式",
      '使用 let/const 声明变量',
      '避免在函数内不声明直接赋值',
    ],
  },
  {
    title: '未清除的定时器',
    severity: 'medium',
    description: 'setInterval 或 setTimeout 未清除，导致回调函数及关联对象无法回收',
    code: `const timer = setInterval(() => {
  // 执行操作
}, 1000);

// 组件卸载时未清除
// 解决方案: 在组件卸载时调用 clearInterval(timer)`,
    solutions: [
      '在组件卸载时清除定时器',
      '使用 requestAnimationFrame 替代 setInterval',
      '封装可自动清除的定时器钩子',
    ],
  },
  {
    title: '闭包引用外部变量',
    severity: 'high',
    description: '闭包长期持有外部大对象的引用，阻止其被垃圾回收',
    code: `function createClosure() {
  const largeData = new Array(1000000).fill('data');

  return function() {
    // 闭包持有 largeData 引用
    console.log('闭包执行');
  };
}`,
    solutions: [
      '避免在闭包中引用大对象',
      '在不再需要时手动解除引用 (largeData = null)',
      '使用模块模式限制作用域',
    ],
  },
  {
    title: '分离的 DOM 元素引用',
    severity: 'medium',
    description: '从 DOM 树移除的元素仍被 JavaScript 引用，无法被回收',
    code: `const elements = {
  button: document.getElementById('button'),
  container: document.getElementById('container')
};

// 从DOM移除但JS仍引用
document.body.removeChild(elements.container);`,
    solutions: [
      '移除元素后解除引用 (elements.container = null)',
      '使用 WeakMap/WeakSet 存储 DOM 引用',
      '避免在全局对象中存储 DOM 元素',
    ],
  },
  {
    title: '事件监听器未移除',
    severity: 'high',
    description: '添加的事件监听器在元素移除后未取消绑定，导致关联对象无法回收',
    code: `function addListener() {
  const button = document.getElementById('btn');
  button.addEventListener('click', handleClick);
}

// 元素移除时未移除监听器`,
    solutions: [
      '在元素移除前移除事件监听器',
      '使用事件委托减少监听器数量',
      '使用 AbortController 管理事件监听',
    ],
  },
  {
    title: '缓存无限增长',
    severity: 'medium',
    description: '缓存未设置大小限制或清理策略，导致内存使用持续增长',
    code: `const cache = {};

function setCache(key, value) {
  cache[key] = value;
  // 无限增长，无清理策略
}`,
    solutions: ['实现 LRU (最近最少使用) 缓存策略', '设置缓存大小限制', '添加过期时间自动清理'],
  },
  {
    title: 'WebSocket 未关闭',
    severity: 'high',
    description: 'WebSocket 连接在页面离开时未正确关闭，导致相关资源泄漏',
    code: `const socket = new WebSocket('ws://example.com');

// 页面离开时未关闭连接`,
    solutions: [
      '在页面卸载前关闭 WebSocket 连接',
      '使用 beforeunload 事件处理清理',
      '实现重连机制而非创建新实例',
    ],
  },
  {
    title: '第三方库资源未释放',
    severity: 'medium',
    description: '图表库、地图库等未正确销毁实例，导致内部资源泄漏',
    code: `const chart = new ChartJS(ctx, config);

// 组件卸载时未销毁
// 解决方案: 在组件卸载时调用 chart.destroy()`,
    solutions: ['查阅库文档了解清理方法', '在组件卸载时调用销毁方法', '使用库提供的清理钩子'],
  },
  {
    title: '未释放的 Workers',
    severity: 'low',
    description: 'Web Workers 在不需要时未终止，继续占用内存和 CPU 资源',
    code: `const worker = new Worker('worker.js');

// 不再需要时未终止`,
    solutions: [
      '在不需要时调用 worker.terminate()',
      '使用 Worker 池管理有限资源',
      '封装自动清理的 Worker 钩子',
    ],
  },
  {
    title: '循环引用',
    severity: 'low',
    description: '现代 GC 可处理大部分循环引用，但某些特殊场景仍可能造成问题',
    code: `function createCircularRef() {
  const objA = {};
  const objB = { ref: objA };
  objA.ref = objB; // 循环引用
}`,
    solutions: [
      '手动断开不再需要的引用 (objA.ref = null)',
      '使用 WeakMap/WeakSet 存储弱引用',
      '避免创建大型对象间的循环引用',
    ],
  },
])

// 内存优化技术
const optimizationTechniques = ref([
  {
    icon: '📦',
    title: '对象池模式',
    description: '重用对象而不是创建新实例，减少内存分配和GC压力',
    methods: ['创建可重用对象池', '从池中获取对象而不是新建', '使用后归还对象到池中'],
    code: `// 对象池实现
class ObjectPool {
  constructor(createFn) {
    this.createFn = createFn;
    this.pool = [];
  }

  get() {
    return this.pool.length ? this.pool.pop() : this.createFn();
  }

  release(obj) {
    // 重置对象状态
    this.pool.push(obj);
  }
}`,
  },
  {
    icon: '🖼️',
    title: '图片资源优化',
    description: '减少图片内存占用，及时释放未使用资源',
    methods: [
      '使用合适的图片格式和尺寸',
      '实现懒加载和按需加载',
      '使用 CSS 代替图片效果',
      "释放不需要的图片资源 (img.src = '')",
    ],
  },
  {
    icon: '📋',
    title: '虚拟列表',
    description: '仅渲染可见区域内容，大幅减少 DOM 节点数量',
    methods: [
      '计算可见区域索引',
      '只渲染可见项',
      '回收不可见项的内存',
      '使用第三方库如 react-virtualized',
    ],
  },
  {
    icon: '🧩',
    title: '数据分片',
    description: '将大数据集分片处理，避免一次性加载全部数据',
    methods: [
      '分批加载和处理数据',
      '使用 Web Workers 处理后台分片',
      '实现增量加载和渲染',
      '使用流式处理大文件',
    ],
    code: `async function processLargeData(data, chunkSize) {
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    await processChunk(chunk);
    // 给GC机会回收内存
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}`,
  },
  {
    icon: '📉',
    title: '数据压缩',
    description: '减少数据在内存中的表示大小',
    methods: [
      '使用 TypedArray 代替普通数组',
      '使用位掩码存储状态',
      '序列化时使用高效格式 (MessagePack, Protobuf)',
      '避免冗余数据存储',
    ],
  },
  {
    icon: '♻️',
    title: '及时解除引用',
    description: '主动释放不再需要的大型对象',
    methods: [
      '使用后设置引用为 null',
      '避免全局缓存大型数据',
      '在闭包中谨慎引用外部变量',
      '使用 WeakRef 和 FinalizationRegistry',
    ],
  },
])

// 最佳实践
const bestPractices = ref([
  "使用 'use strict' 模式防止意外全局变量",
  '始终在组件卸载时清理事件监听器和定时器',
  '使用弱引用 (WeakMap/WeakSet) 存储辅助数据',
  '避免在全局作用域存储大型数据',
  '定期分析应用内存使用情况',
  '使用对象池重用对象减少分配',
  '实现缓存大小限制和过期策略',
  '对大型数据集使用分页或虚拟滚动',
  '使用开发者工具内存快照分析泄漏',
  '在性能关键路径避免内存分配',
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

.memory-management-container {
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

.content-section {
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

.memory-cycle {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
}

.cycle-step {
  background: white;
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  width: 28%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 90%;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .step-icon {
    background: @primary-color;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 15px;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: @primary-color;
  }
}

.cycle-arrow {
  font-size: 2rem;
  color: @primary-color;
  font-weight: 700;

  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
}

.gc-mechanism {
  display: flex;
  gap: 25px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.gc-card {
  flex: 1;
  background: lighten(@light-bg, 1%);
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid @primary-color;

  &:last-child {
    border-left-color: @success-color;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.gc-problem {
  background: rgba(0, 0, 0, 0.03);
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;

  .badge {
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-right: 10px;

    &.warning {
      background: lighten(@warning-color, 40%);
      color: darken(@warning-color, 20%);
    }

    &.success {
      background: lighten(@success-color, 45%);
      color: darken(@success-color, 20%);
    }
  }
}

.leak-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .category-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: @text-color;
  }

  p {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin-bottom: 15px;
  }

  .count {
    background: rgba(52, 152, 219, 0.1);
    color: @primary-color;
    padding: 5px 15px;
    border-radius: 20px;
    display: inline-block;
    font-weight: 600;
  }
}

.leak-scenarios {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border-left: 5px solid @warning-color;

  &.high-severity {
    border-left-color: @warning-color;
  }

  &.medium-severity {
    border-left-color: #f39c12;
  }

  &.low-severity {
    border-left-color: @primary-color;
  }
}

.scenario-header {
  display: flex;
  align-items: center;
  padding: 18px 25px;
  background: rgba(231, 76, 60, 0.05);

  .index {
    background: @warning-color;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-right: 15px;
  }

  h3 {
    font-size: 1.4rem;
    color: @text-color;
    flex: 1;
  }

  .severity {
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9rem;

    &.high {
      background: lighten(@warning-color, 40%);
      color: darken(@warning-color, 20%);
    }

    &.medium {
      background: lighten(#f39c12, 40%);
      color: darken(#f39c12, 20%);
    }

    &.low {
      background: lighten(@primary-color, 40%);
      color: darken(@primary-color, 20%);
    }
  }
}

.scenario-content {
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.description {
  flex: 1;
  padding: 25px;
  border-right: 1px solid @border-color;

  p {
    margin-bottom: 20px;
    line-height: 1.7;
  }
}

.solution {
  flex: 1;
  padding: 25px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 0;
      padding-left: 25px;
      position: relative;
      line-height: 1.6;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 10px;
        color: @success-color;
        font-weight: 700;
      }
    }
  }
}

.code-example {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin-top: 15px;
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

.waste-stats {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

.waste-stat {
  background: white;
  border-radius: 12px;
  padding: 25px 15px;
  text-align: center;
  flex: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 8px;
  }
}

.optimization-techniques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.technique-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border-top: 4px solid @primary-color;
}

.tech-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(52, 152, 219, 0.05);

  .tech-icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-size: 1.4rem;
    color: @text-color;
  }
}

.tech-content {
  padding: 20px;

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.implementation {
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

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.tool-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;

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

.best-practices {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @text-color;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 2px solid @border-color;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.practice-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 15px;
  align-items: flex-start;

  .practice-number {
    background: @primary-color;
    color: white;
    min-width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
  }

  p {
    line-height: 1.6;
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

  .optimization-techniques {
    grid-template-columns: 1fr;
  }

  .scenario-content {
    flex-direction: column;

    .description {
      border-right: none;
      border-bottom: 1px solid @border-color;
    }
  }
}
</style>
