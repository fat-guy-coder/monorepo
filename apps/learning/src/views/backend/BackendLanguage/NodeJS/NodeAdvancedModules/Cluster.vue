<template>
  <div class="cluster-container">
    <header class="header">
      <h1><node-icon /> Node.js Cluster模块深度解析</h1>
      <p class="subtitle">利用多核CPU优势，提升Node.js应用性能</p>
    </header>

    <div class="content">
      <section class="section intro">
        <div class="section-header">
          <h2><code-icon /> 什么是Cluster模块？</h2>
        </div>
        <div class="section-content">
          <p>
            <strong>Cluster模块</strong>是Node.js的核心模块，允许开发者轻松创建子进程（工作进程），这些子进程共享同一个服务器端口。它使单个Node.js实例能够充分利用多核CPU系统的能力，通过创建多个工作进程来处理负载。
          </p>
          <div class="architecture">
            <div class="master">
              <div class="node">主进程</div>
              <div class="port">监听端口：3000</div>
            </div>
            <div class="workers">
              <div v-for="i in 4" :key="i" class="worker">
                <div class="node">工作进程 {{ i }}</div>
                <div class="cpu">CPU核心 {{ i }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section purpose">
        <div class="section-header">
          <h2><why-icon /> Cluster模块的作用与价值</h2>
        </div>
        <div class="section-content">
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="icon performance"></div>
              <h3>性能提升</h3>
              <p>通过多进程充分利用多核CPU，显著提高应用程序吞吐量</p>
            </div>
            <div class="benefit-card">
              <div class="icon reliability"></div>
              <h3>可靠性增强</h3>
              <p>工作进程崩溃不会影响整个应用，主进程可重启工作进程</p>
            </div>
            <div class="benefit-card">
              <div class="icon zero-downtime"></div>
              <h3>零停机部署</h3>
              <p>支持优雅重启，逐个替换工作进程实现无缝更新</p>
            </div>
            <div class="benefit-card">
              <div class="icon balance"></div>
              <h3>负载均衡</h3>
              <p>主进程自动分配连接给工作进程（默认为轮询方式）</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section apis">
        <div class="section-header">
          <h2><api-icon /> 核心API基本介绍</h2>
        </div>
        <div class="section-content">
          <div class="api-grid">
            <div class="api-card" v-for="api in apis" :key="api.name">
              <h3 class="api-name">{{ api.name }}</h3>
              <div class="api-description">{{ api.description }}</div>
              <div class="api-example" v-if="api.example">
                <pre>{{ api.example }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section use-cases">
        <div class="section-header">
          <h2><scenario-icon /> 使用场景分析</h2>
        </div>
        <div class="section-content">
          <div class="scenario-card" v-for="(scenario, index) in scenarios" :key="index">
            <div class="scenario-header">
              <div class="scenario-icon" :class="`icon-${index + 1}`"></div>
              <h3>{{ scenario.title }}</h3>
            </div>
            <p>{{ scenario.description }}</p>
            <div class="scenario-details">
              <strong>最佳实践：</strong>{{ scenario.bestPractice }}
            </div>
          </div>
        </div>
      </section>

      <section class="section summary">
        <div class="section-header">
          <h2><summary-icon /> 总结</h2>
        </div>
        <div class="section-content">
          <p class="highlight">
            Cluster模块是Node.js应对高并发场景的利器，通过多进程架构充分利用现代多核CPU资源。它能显著提升应用的吞吐量和可靠性，是实现高性能Node.js服务的核心解决方案。
          </p>
          <div class="pros-cons">
            <div class="pros">
              <h3>优势</h3>
              <ul>
                <li>原生支持，无需额外依赖</li>
                <li>易于集成到现有应用</li>
                <li>自动负载均衡</li>
                <li>工作进程隔离提高稳定性</li>
              </ul>
            </div>
            <div class="cons">
              <h3>注意事项</h3>
              <ul>
                <li>不适合I/O密集型操作</li>
                <li>进程间通信开销</li>
                <li>不能共享内存状态</li>
                <li>需要处理会话持久化</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

// 图标组件
const NodeIcon = { render: () => h('span', { class: 'icon node' }, '⬢') };
const CodeIcon = { render: () => h('span', { class: 'icon code' }, '{}') };
const WhyIcon = { render: () => h('span', { class: 'icon why' }, '?') };
const ApiIcon = { render: () => h('span', { class: 'icon api' }, 'ƒ') };
const ScenarioIcon = { render: () => h('span', { class: 'icon scenario' }, '✧') };
const SummaryIcon = { render: () => h('span', { class: 'icon summary' }, '✓') };

const apis = ref([
  {
    name: 'cluster.fork()',
    description: '创建新的工作进程，可以在主进程中多次调用以创建多个工作进程。',
    example: `if (cluster.isPrimary) {\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n}`
  },
  {
    name: 'cluster.isPrimary / cluster.isMaster',
    description: '判断当前进程是否为主进程（Node.js 16+ 使用isPrimary，旧版本使用isMaster）。',
    example: `if (cluster.isPrimary) {\n  // 主进程代码\n} else {\n  // 工作进程代码\n}`
  },
  {
    name: 'cluster.workers',
    description: '包含所有活动工作进程的哈希表，通过进程ID索引。',
    example: `cluster.on('exit', (worker) => {\n  delete cluster.workers[worker.id];\n});`
  },
  {
    name: 'cluster.on(\'exit\')',
    description: '当任何工作进程退出时触发的事件监听器。',
    example: `cluster.on('exit', (worker, code, signal) => {\n  console.log(\`工作进程 \${worker.process.pid} 已退出\`);\n  // 可以在此处重启工作进程\n});`
  },
  {
    name: 'cluster.on(\'online\')',
    description: '当新工作进程启动并准备好接收消息时触发。',
    example: `cluster.on('online', (worker) => {\n  console.log(\`工作进程 \${worker.process.pid} 已上线\`);\n});`
  },
  {
    name: 'worker.process',
    description: '工作进程对应的ChildProcess对象。',
    example: `worker.process.pid // 获取工作进程的PID`
  }
]);

const scenarios = ref([
  {
    title: '高并发Web服务器',
    description: '当你的Node.js应用需要处理大量并发请求时，使用Cluster模式可以充分利用多核CPU资源，显著提升吞吐量。',
    bestPractice: '根据CPU核心数创建工作进程，避免创建过多导致上下文切换开销。'
  },
  {
    title: '提高应用稳定性',
    description: '通过Cluster模式，当某个工作进程崩溃时，不会影响其他工作进程，主进程可以立即重启新的工作进程。',
    bestPractice: '在exit事件中添加重启逻辑，同时设置最大重启次数防止无限循环。'
  },
  {
    title: '零停机部署/更新',
    description: 'Cluster模式支持优雅重启，可以逐个替换工作进程而不中断服务。',
    bestPractice: '向工作进程发送关闭信号，等待当前请求完成后再关闭，然后启动新的工作进程。'
  },
  {
    title: 'CPU密集型任务',
    description: '对于需要大量CPU计算的任务，Cluster模式可以将任务分配到多个进程并行处理。',
    bestPractice: '注意进程间通信开销，对于大量数据应考虑共享内存或流式处理。'
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@dark-bg: #2c3e50;
@border-color: #e0e0e0;
@success-color: #2ecc71;
@warning-color: #f39c12;

.cluster-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f4 100%);
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(to right, @secondary-color, @primary-color);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  h1 {
    margin: 0;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-top: 10px;
  }
}

.section {
  background: white;
  border-radius: 8px;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.section-header {
  background: @secondary-color;
  color: white;
  padding: 15px 25px;

  h2 {
    margin: 0;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.section-content {
  padding: 25px;

  p {
    line-height: 1.7;
    font-size: 1.05rem;
  }
}

.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-weight: bold;

  &.node {
    background: #3498db;
  }

  &.code {
    background: #9b59b6;
  }

  &.why {
    background: #e67e22;
  }

  &.api {
    background: #27ae60;
  }

  &.scenario {
    background: #d35400;
  }

  &.summary {
    background: #16a085;
  }
}

// 架构图样式
.architecture {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px 0;
  flex-wrap: wrap;

  .master,
  .worker {
    background: @light-bg;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;
    min-width: 200px;

    .node {
      font-weight: bold;
      color: @primary-color;
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    .port,
    .cpu {
      font-size: 0.9rem;
      color: #666;
    }
  }

  .master {
    background: linear-gradient(to bottom, #e0f7ff, #b3e6ff);
    border-color: @primary-color;

    .node {
      color: @secondary-color;
    }
  }

  .workers {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .worker {
    background: linear-gradient(to bottom, #e8f5e9, #c8e6c9);
    border-color: @success-color;
  }
}

// 优点网格样式
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.benefit-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid @border-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-color: @primary-color;
  }

  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
    border-radius: 12px;
    font-size: 24px;

    &.performance {
      background: linear-gradient(135deg, #3498db, #2980b9);
    }

    &.reliability {
      background: linear-gradient(135deg, #2ecc71, #27ae60);
    }

    &.zero-downtime {
      background: linear-gradient(135deg, #9b59b6, #8e44ad);
    }

    &.balance {
      background: linear-gradient(135deg, #e67e22, #d35400);
    }
  }

  h3 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
  }
}

// API网格样式
.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.api-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid @primary-color;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border-left-width: 6px;
  }

  .api-name {
    color: @primary-color;
    margin-top: 0;
    font-size: 1.2rem;
  }

  .api-description {
    margin: 10px 0;
    color: #555;
  }

  .api-example {
    background: #2c3e50;
    color: #f8f8f2;
    border-radius: 6px;
    padding: 15px;
    margin-top: 15px;
    font-size: 0.9rem;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Fira Code', monospace;
    }
  }
}

// 使用场景样式
.scenario-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    border-color: @primary-color;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.1);
  }

  .scenario-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;

    h3 {
      margin: 0;
      color: @secondary-color;
    }
  }

  .scenario-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;

    &.icon-1 {
      background: @primary-color;
    }

    &.icon-2 {
      background: @success-color;
    }

    &.icon-3 {
      background: @warning-color;
    }

    &.icon-4 {
      background: #9b59b6;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
    color: #444;
  }

  .scenario-details {
    background: #edf2f7;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.95rem;
    border-left: 3px solid darken(#edf2f7, 20%);
  }
}

// 总结部分样式
.summary {
  .highlight {
    background: rgba(52, 152, 219, 0.1);
    padding: 20px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    border-left: 4px solid @primary-color;
    line-height: 1.8;
  }

  .pros-cons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;

    .pros,
    .cons {
      padding: 20px;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 2px solid;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 10px;
          line-height: 1.6;
        }
      }
    }

    .pros {
      background: rgba(46, 204, 113, 0.08);
      border: 1px solid rgba(46, 204, 113, 0.3);

      h3 {
        color: @success-color;
        border-color: @success-color;
      }
    }

    .cons {
      background: rgba(231, 76, 60, 0.08);
      border: 1px solid rgba(231, 76, 60, 0.3);

      h3 {
        color: @accent-color;
        border-color: @accent-color;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .architecture {
    flex-direction: column;
    align-items: center;
  }
}
</style>
