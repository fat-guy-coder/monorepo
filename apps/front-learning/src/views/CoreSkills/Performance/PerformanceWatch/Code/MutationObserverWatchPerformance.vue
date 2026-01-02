<template>
  <div class="mutation-observer-container">
    <!-- 头部区域 -->
    <header class="header-section">
      <div class="header-content">
        <h1>MutationObserver 性能监控</h1>
        <p class="subtitle">实时监控DOM变化，优化页面性能</p>
      </div>
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-value">{{ mutationCount }}</div>
          <div class="stat-label">DOM变动</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ formatTime(observationTime) }}</div>
          <div class="stat-label">监控时长</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ nodesAffected }}</div>
          <div class="stat-label">影响节点</div>
        </div>
      </div>
    </header>

    <div class="main-content">
      <!-- 左侧导航 -->
      <nav class="navigation">
        <ul>
          <li v-for="section in sections" :key="section.id" :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)">
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <!-- 右侧内容 -->
      <div class="content-section">
        <!-- MutationObserver概述 -->
        <section id="overview" class="content-card">
          <h2><span class="icon">🔍</span> MutationObserver 概述</h2>
          <div class="card-content">
            <p>MutationObserver 是一种Web API，提供了监视DOM树变化的能力。当DOM发生变化时，它会异步执行回调函数，提供变更的详细信息。</p>

            <div class="key-points">
              <div class="point">
                <div class="point-icon">⚡</div>
                <div>
                  <h3>异步执行</h3>
                  <p>变化通知是批量异步处理的，避免频繁回调影响性能</p>
                </div>
              </div>
              <div class="point">
                <div class="point-icon">🎯</div>
                <div>
                  <h3>精准监控</h3>
                  <p>可以指定观察特定节点及其子节点的变化</p>
                </div>
              </div>
              <div class="point">
                <div class="point-icon">📊</div>
                <div>
                  <h3>详细报告</h3>
                  <p>提供变动类型、目标节点等详细信息</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 监听思路 -->
        <section id="approach" class="content-card">
          <h2><span class="icon">🧠</span> MutationObserver 监听思路</h2>
          <div class="card-content">
            <div class="approach-step">
              <div class="step-number">1</div>
              <h3>创建观察者实例</h3>
              <p>初始化MutationObserver对象，传递回调函数处理变化</p>
              <pre class="code-block">const observer = new MutationObserver(callback);</pre>
            </div>

            <div class="approach-step">
              <div class="step-number">2</div>
              <h3>配置观察选项</h3>
              <p>设置需要监控的变化类型和范围</p>
              <pre class="code-block">const config = {
  attributes: true,     // 监控属性变化
  childList: true,      // 监控子节点变化
  subtree: true,        // 监控所有后代节点
  characterData: true,  // 监控文本节点变化
  attributeFilter: ['class', 'style'], // 只监控特定属性
  attributeOldValue: true, // 记录旧值
  characterDataOldValue: true
};</pre>
            </div>

            <div class="approach-step">
              <div class="step-number">3</div>
              <h3>开始观察目标节点</h3>
              <p>将观察者附加到需要监控的DOM节点</p>
              <pre class="code-block">const targetNode = document.getElementById('app');
observer.observe(targetNode, config);</pre>
            </div>

            <div class="approach-step">
              <div class="step-number">4</div>
              <h3>处理DOM变化</h3>
              <p>在回调函数中分析MutationRecord对象集合</p>
              <pre class="code-block">function callback(mutationsList) {
  for (const mutation of mutationsList) {
    switch(mutation.type) {
      case 'childList':
        console.log('节点添加/移除:', mutation);
        break;
      case 'attributes':
        console.log('属性变更:', mutation.attributeName);
        break;
      case 'characterData':
        console.log('文本内容变更');
        break;
    }
  }
}</pre>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section id="use-cases" class="content-card">
          <h2><span class="icon">💡</span> MutationObserver 使用场景</h2>
          <div class="use-cases-grid">
            <div class="use-case">
              <div class="case-icon">📈</div>
              <h3>性能监控</h3>
              <p>追踪DOM变化频率和规模，识别性能瓶颈</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🛠️</div>
              <h3>第三方脚本监控</h3>
              <p>检测第三方库/插件对DOM的修改</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🎨</div>
              <h3>样式变动追踪</h3>
              <p>监控特定元素样式的动态变化</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🔄</div>
              <h3>无限滚动优化</h3>
              <p>检测内容区域变化自动加载更多内容</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🧩</div>
              <h3>自定义元素生命周期</h3>
              <p>实现Web Components的connectedCallback/disconnectedCallback</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🔔</div>
              <h3>变更通知系统</h3>
              <p>DOM变化时通知其他系统组件更新状态</p>
            </div>
          </div>
        </section>

        <!-- 实际应用 -->
        <section id="implementation" class="content-card">
          <h2><span class="icon">🚀</span> Vue 3 实际应用</h2>
          <div class="card-content">
            <div class="implementation-example">
              <h3>监控组件DOM变化</h3>
              <pre class="code-block">import { onMounted, onUnmounted, ref } from 'vue';

export default {
  setup() {
    const mutationCount = ref(0);
    const observer = ref&lt;MutationObserver | null&gt;(null);

    onMounted(() => {
      const targetNode = document.getElementById('observable-component');

      observer.value = new MutationObserver((mutations) => {
        mutationCount.value += mutations.length;
        console.log('DOM变化:', mutations);
      });

      observer.value.observe(targetNode, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    });

    onUnmounted(() => {
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    return { mutationCount };
  }
}</pre>
            </div>

            <div class="implementation-example">
              <h3>性能分析示例</h3>
              <pre class="code-block">function analyzePerformance(mutationsList) {
  const report = {
    totalMutations: mutationsList.length,
    attributeChanges: 0,
    nodeAdditions: 0,
    nodeRemovals: 0,
    textChanges: 0,
    affectedElements: new Set()
  };

  mutationsList.forEach(mutation => {
    switch (mutation.type) {
      case 'attributes':
        report.attributeChanges++;
        report.affectedElements.add(mutation.target);
        break;
      case 'childList':
        report.nodeAdditions += mutation.addedNodes.length;
        report.nodeRemovals += mutation.removedNodes.length;
        report.affectedElements.add(mutation.target);
        break;
      case 'characterData':
        report.textChanges++;
        report.affectedElements.add(mutation.target);
        break;
    }
  });

  report.uniqueAffectedElements = report.affectedElements.size;

  // 发送性能报告到监控系统
  sendPerformanceReport(report);
}</pre>
            </div>
          </div>
        </section>

        <!-- 注意事项 -->
        <section id="best-practices" class="content-card">
          <h2><span class="icon">⚠️</span> 注意事项与最佳实践</h2>
          <div class="practices-grid">
            <div class="practice">
              <h3>性能优化</h3>
              <ul>
                <li>尽量避免监听整个document.body</li>
                <li>使用attributeFilter限制监控的属性</li>
                <li>在不需要时及时断开观察(disconnect())</li>
                <li>减少回调中的复杂操作</li>
              </ul>
            </div>
            <div class="practice">
              <h3>配置策略</h3>
              <ul>
                <li>优先使用childList监控节点变化</li>
                <li>明确设置subtree: true监控后代节点</li>
                <li>避免同时监控所有属性</li>
                <li>谨慎使用attributeOldValue和characterDataOldValue</li>
              </ul>
            </div>
            <div class="practice">
              <h3>浏览器兼容性</h3>
              <ul>
                <li>IE11及以上支持</li>
                <li>移动端主流浏览器全面支持</li>
                <li>注意旧版本Edge的兼容问题</li>
                <li>使用polyfill兼容旧浏览器</li>
              </ul>
            </div>
            <div class="practice">
              <h3>替代方案</h3>
              <ul>
                <li>ResizeObserver - 监听元素尺寸变化</li>
                <li>IntersectionObserver - 监听元素可见性</li>
                <li>PerformanceObserver - 监控性能指标</li>
                <li>requestAnimationFrame - 动画相关监控</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 实时监控面板 -->
    <div class="monitor-panel">
      <div class="panel-header">
        <h3><span class="icon">📋</span> 实时监控面板</h3>
        <div class="controls">
          <button @click="toggleMonitoring" :class="{ 'active': isMonitoring }">
            {{ isMonitoring ? '停止监控' : '开始监控' }}
          </button>
          <button @click="clearLogs">清空日志</button>
        </div>
      </div>
      <div class="logs-container">
        <div v-for="(log, index) in mutationLogs" :key="index" class="log-entry" :class="log.type">
          <div class="log-timestamp">{{ formatTime(log.timestamp) }}</div>
          <div class="log-content">
            <span class="log-type">{{ formatType(log.type) }}</span>
            <span class="log-details">{{ log.message }}</span>
          </div>
          <div class="log-target" v-if="log.target">目标: {{ log.target }}</div>
        </div>
        <div v-if="mutationLogs.length === 0" class="empty-logs">
          监控已启动，DOM变化将显示在这里...
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';

// 状态管理
const isMonitoring = ref(false);
const mutationCount = ref(0);
const nodesAffected = ref(0);
const observationTime = ref(0);
const mutationLogs = reactive<any[]>([]);
const activeSection = ref('overview');

// 监控计时器
let startTime = 0;
let timer: number | null = null;

// 页面章节
const sections = [
  { id: 'overview', title: '概述' },
  { id: 'approach', title: '监听思路' },
  { id: 'use-cases', title: '使用场景' },
  { id: 'implementation', title: '实际应用' },
  { id: 'best-practices', title: '注意事项' }
];

// MutationObserver实例
let observer: MutationObserver | null = null;

// 开始/停止监控
const toggleMonitoring = () => {
  isMonitoring.value = !isMonitoring.value;

  if (isMonitoring.value) {
    startMonitoring();
  } else {
    stopMonitoring();
  }
};

// 开始监控
const startMonitoring = () => {
  // 重置状态
  mutationCount.value = 0;
  nodesAffected.value = 0;
  observationTime.value = 0;
  mutationLogs.splice(0, mutationLogs.length);
  startTime = Date.now();

  // 启动计时器
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    observationTime.value = Date.now() - startTime;
  }, 1000);

  // 初始化MutationObserver
  const targetNode = document.querySelector('.content-section') as Node;

  if (!targetNode) return;

  observer = new MutationObserver((mutations) => {
    mutationCount.value += mutations.length;

    mutations.forEach(mutation => {
      const logEntry = {
        timestamp: Date.now(),
        type: mutation.type,
        target: (mutation.target as HTMLElement).tagName?.toLowerCase() || '未知节点',
        message: ''
      };

      const affectedNodes = new Set();

      switch (mutation.type) {
        case 'attributes':
          logEntry.message = `属性 ${mutation.attributeName} 发生变化`;
          affectedNodes.add(mutation.target);
          break;
        case 'childList':
          const added = mutation.addedNodes.length;
          const removed = mutation.removedNodes.length;
          logEntry.message = `子节点变化: ${added > 0 ? `添加 ${added} 个` : ''}${removed > 0 ? ` 移除 ${removed} 个` : ''}`;
          affectedNodes.add(mutation.target);
          break;
        case 'characterData':
          logEntry.message = '文本内容更新';
          affectedNodes.add(mutation.target);
          break;
      }

      mutationLogs.unshift(logEntry);
      nodesAffected.value += affectedNodes.size;

      // 限制日志数量
      if (mutationLogs.length > 50) {
        mutationLogs.pop();
      }
    });
  });

  // 配置观察选项
  const config = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class', 'style'],
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
  };

  // 开始观察
  observer.observe(targetNode, config);
};

// 停止监控
const stopMonitoring = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

// 清空日志
const clearLogs = () => {
  mutationLogs.splice(0, mutationLogs.length);
};

// 格式化时间
const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (minutes > 0) {
    return `${minutes}分${secs}秒`;
  }
  return `${secs}秒`;
};

// 格式化日志类型
const formatType = (type: string) => {
  const types: Record<string, string> = {
    'attributes': '属性变更',
    'childList': '节点变动',
    'characterData': '内容更新'
  };
  return types[type] || type;
};

// 滚动到指定部分
const scrollToSection = (sectionId: string) => {
  activeSection.value = sectionId;
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 组件生命周期
onMounted(() => {
  // 默认开始监控
  setTimeout(() => {
    isMonitoring.value = true;
    startMonitoring();
  }, 1000);
});

onUnmounted(() => {
  stopMonitoring();
});
</script>

<style lang="less" scoped>


:root {
  --primary: #4361ee;
  --primary-light: #eef2ff;
  --primary-dark: #3a0ca3;
  --secondary: #4895ef;
  --text-dark: #1e293b;
  --text-light: #64748b;
  --border: #e2e8f0;
  --card-bg: #ffffff;
  --bg-light: #f8fafc;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.mutation-observer-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: var(--bg-light);
  color: var(--text-dark);
  min-height: 100vh;
  padding: 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;

  .header-content {
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--primary-dark);
    }

    .subtitle {
      font-size: 1.1rem;
      color: var(--text-light);
    }
  }

  .stats-container {
    display: flex;
    gap: 1.5rem;
    background: var(--card-bg);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    height: fit-content;

    .stat-item {
      text-align: center;
      min-width: 100px;

      .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: var(--text-light);
      }
    }
  }
}

.main-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
}

.navigation {
  flex: 0 0 220px;
  background: var(--card-bg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  height: fit-content;
  position: sticky;
  top: 1.5rem;

  ul {
    list-style: none;

    li {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 1px solid var(--border);
      font-weight: 500;
      color: var(--text-light);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        color: var(--primary);
        background: var(--primary-light);
      }

      &.active {
        background: var(--primary-light);
        color: var(--primary);
        font-weight: 600;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: var(--primary);
        }
      }
    }
  }
}

.content-section {
  flex: 1;

  .content-card {
    background: var(--card-bg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;

    h2 {
      padding: 1.25rem 1.5rem;
      background: var(--primary-light);
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--primary-dark);

      .icon {
        font-size: 1.4rem;
      }
    }

    .card-content {
      padding: 1.5rem;
    }
  }
}

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .point {
    display: flex;
    gap: 1rem;
    background: var(--bg-light);
    border-radius: var(--radius-sm);
    padding: 1.25rem;

    .point-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    h3 {
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
      color: var(--primary);
    }

    p {
      color: var(--text-light);
      line-height: 1.6;
    }
  }
}

.approach-step {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px dashed var(--border);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: var(--text-dark);
  }

  p {
    color: var(--text-light);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .use-case {
    background: var(--bg-light);
    border-radius: var(--radius-sm);
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    .case-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
      color: var(--primary);
    }

    p {
      color: var(--text-light);
      line-height: 1.5;
    }
  }
}

.implementation-example {
  background: var(--bg-light);
  border-radius: var(--radius-sm);
  padding: 1.25rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--primary);
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .practice {
    background: var(--bg-light);
    border-radius: var(--radius-sm);
    padding: 1.5rem;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &::before {
        content: '•';
        color: var(--primary);
      }
    }

    ul {
      list-style: none;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.7rem;
        position: relative;
        line-height: 1.5;
        color: var(--text-light);

        &::before {
          content: '—';
          position: absolute;
          left: -1.5rem;
          color: var(--primary-light);
        }
      }
    }
  }
}

.code-block {
  display: block;
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: var(--radius-sm);
  padding: 1.25rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 1rem 0;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.monitor-panel {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: var(--primary);
    color: white;

    h3 {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .controls {
      display: flex;
      gap: 0.75rem;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.3s;

        &:hover {
          opacity: 0.9;
        }

        &.active {
          background: var(--danger);
          color: white;
        }

        &:first-child {
          background: var(--success);
          color: white;
        }

        &:last-child {
          background: var(--warning);
          color: white;
        }
      }
    }
  }

  .logs-container {
    max-height: 300px;
    overflow-y: auto;
    padding: 0;

    .log-entry {
      padding: 0.9rem 1.25rem;
      border-bottom: 1px solid var(--border);

      &.attributes {
        border-left: 4px solid var(--info);
      }

      &.childList {
        border-left: 4px solid var(--success);
      }

      &.characterData {
        border-left: 4px solid var(--warning);
      }

      .log-timestamp {
        font-size: 0.8rem;
        color: var(--text-light);
        margin-bottom: 0.3rem;
      }

      .log-content {
        display: flex;
        gap: 0.75rem;
        align-items: center;

        .log-type {
          background: var(--primary-light);
          color: var(--primary);
          font-size: 0.8rem;
          padding: 0.25rem 0.7rem;
          border-radius: 20px;
          font-weight: 600;
        }

        .log-details {
          flex: 1;
        }
      }

      .log-target {
        font-size: 0.85rem;
        color: var(--text-light);
        margin-top: 0.3rem;
        font-style: italic;
      }
    }

    .empty-logs {
      padding: 2rem;
      text-align: center;
      color: var(--text-light);
      font-style: italic;
    }
  }
}

// 滚动条美化
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-light);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-light);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;

    .stats-container {
      width: 100%;
      justify-content: space-around;
    }
  }

  .monitor-panel .panel-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;

    .controls {
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>
