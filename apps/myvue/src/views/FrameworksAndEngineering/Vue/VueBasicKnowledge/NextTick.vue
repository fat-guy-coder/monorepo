<template>
  <div class="next-tick-container">
    <header class="header">
      <h1><span class="highlight">$nextTick</span> 基础介绍</h1>
      <p>Vue 的异步更新机制与 DOM 操作时机</p>
    </header>

    <div class="content-card">
      <section class="intro-section">
        <div class="icon-box">
          <div class="icon">⏱️</div>
        </div>
        <div class="text-content">
          <h2>什么是 $nextTick？</h2>
          <p>
            <code>$nextTick</code> 是 Vue 提供的一个异步方法，用于在 DOM 更新完成后执行回调函数。
            它确保在数据变化后，当 DOM 更新完成时执行代码，是处理 Vue 异步更新队列的关键工具。
          </p>
        </div>
      </section>
    </div>

    <div class="columns-layout">
      <div class="column">
        <div class="content-card">
          <h2 class="section-title">
            <span class="icon">📌</span> 核心作用
          </h2>

          <div class="feature-item">
            <div class="feature-icon">1</div>
            <div>
              <h3>DOM 更新后操作</h3>
              <p>在数据变化后立即操作更新后的 DOM</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">2</div>
            <div>
              <h3>解决异步更新问题</h3>
              <p>确保在 Vue 完成异步 DOM 更新后执行代码</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">3</div>
            <div>
              <h3>获取最新 DOM 状态</h3>
              <p>访问因数据变化而更新的 DOM 元素</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">4</div>
            <div>
              <h3>避免渲染竞争条件</h3>
              <p>防止在 DOM 更新过程中执行操作</p>
            </div>
          </div>
        </div>

        <div class="content-card">
          <h2 class="section-title">
            <span class="icon">⚙️</span> 实现原理
          </h2>

          <div class="principle-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>异步更新队列</h3>
                <p>Vue 将数据变更放入异步队列，批量更新 DOM</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>微任务优先级</h3>
                <p>默认使用 Promise.then 实现微任务调度</p>
                <div class="code-snippet">
                  <pre>Promise.resolve().then(flushCallbacks)</pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>优雅降级策略</h3>
                <p>在不支持 Promise 的环境中使用降级方案：</p>
                <ul>
                  <li>MutationObserver</li>
                  <li>setImmediate</li>
                  <li>setTimeout</li>
                </ul>
              </div>
            </div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>回调执行时机</h3>
                <p>在下次 DOM 更新循环结束后执行回调</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="content-card">
          <h2 class="section-title">
            <span class="icon">💡</span> 使用场景
          </h2>

          <div class="scenario-tabs">
            <div class="tabs-header">
              <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
                @click="activeTab = index">
                {{ tab.title }}
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 0" class="scenario-detail">
                <h3>获取更新后的 DOM</h3>
                <p>在数据变化后立即访问更新后的 DOM 元素</p>

                <div class="code-block">
                  <pre><code>// 更新数据
this.message = 'Updated!';

// 在 nextTick 中访问 DOM
this.$nextTick(() => {
  const el = document.getElementById('message');
  console.log(el.textContent); // 输出: Updated!
});</code></pre>
                </div>
              </div>

              <div v-if="activeTab === 1" class="scenario-detail">
                <h3>集成第三方 DOM 库</h3>
                <p>在 Vue 更新 DOM 后初始化第三方库</p>

                <div class="code-block">
                  <pre><code>// 显示包含图表的组件
this.showChart = true;

// 在 DOM 更新后初始化图表
this.$nextTick(() => {
  this.initChart(); // 初始化第三方图表库
});</code></pre>
                </div>
              </div>

              <div v-if="activeTab === 2" class="scenario-detail">
                <h3>滚动到最新内容</h3>
                <p>在列表更新后滚动到底部查看最新项</p>

                <div class="code-block">
                  <pre><code>// 添加新消息
this.messages.push(newMessage);

// 滚动到底部
this.$nextTick(() => {
  const container = this.$refs.messageContainer;
  container.scrollTop = container.scrollHeight;
});</code></pre>
                </div>
              </div>

              <div v-if="activeTab === 3" class="scenario-detail">
                <h3>焦点管理</h3>
                <p>在显示输入框后自动聚焦</p>

                <div class="code-block">
                  <pre><code>// 显示输入框
this.showInput = true;

// 在 DOM 更新后聚焦
this.$nextTick(() => {
  this.$refs.inputField.focus();
});</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-card">
      <h2 class="section-title">
        <span class="icon">🧪</span> 实时演示
      </h2>

      <div class="demo-area">
        <div class="demo-controls">
          <button @click="updateMessage">更新消息</button>
          <button @click="toggleList">切换列表</button>
          <button @click="addItem">添加项目</button>
          <button @click="resetDemo">重置演示</button>
        </div>

        <div class="demo-container">
          <div class="demo-panel">
            <div class="demo-title">DOM 状态</div>
            <div class="message-display" ref="messageElement">{{ message }}</div>

            <div v-if="showList" class="item-list">
              <div v-for="(item, index) in items" :key="index" class="list-item">
                {{ item }}
              </div>
            </div>
          </div>

          <div class="console-panel">
            <div class="console-header">
              <span>控制台输出</span>
              <button @click="clearLogs">清空日志</button>
            </div>
            <div class="console-output">
              <div v-for="(log, index) in logs" :key="index" class="log-entry">
                <span class="timestamp">[{{ log.timestamp }}]</span>
                <span :class="log.type">{{ log.message }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="explanation">
          <div class="explanation-item">
            <div class="status-indicator" :class="withoutNextTick ? 'error' : 'success'"></div>
            <div>
              <h3>无 $nextTick 的情况</h3>
              <p>直接访问 DOM 元素可能得到更新前的状态</p>
            </div>
          </div>

          <div class="explanation-item">
            <div class="status-indicator" :class="withNextTick ? 'success' : 'pending'"></div>
            <div>
              <h3>使用 $nextTick 的情况</h3>
              <p>确保在 DOM 更新后访问元素，得到正确状态</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-card summary">
      <h2 class="section-title">
        <span class="icon">✅</span> 最佳实践总结
      </h2>

      <div class="best-practices">
        <div class="practice">
          <div class="checkmark">✓</div>
          <p>在需要操作更新后的 DOM 时使用 <code>$nextTick</code></p>
        </div>

        <div class="practice">
          <div class="checkmark">✓</div>
          <p>与第三方 DOM 库集成时使用</p>
        </div>

        <div class="practice">
          <div class="checkmark">✓</div>
          <p>需要访问计算后的样式或布局时使用</p>
        </div>

        <div class="practice">
          <div class="checkmark">✓</div>
          <p>避免在同一个 tick 内过度使用</p>
        </div>

        <div class="practice">
          <div class="checkmark">✓</div>
          <p>在组合式 API 中使用 <code>nextTick</code> 导入</p>
          <div class="code-snippet">
            <pre>import { nextTick } from 'vue';</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

// 标签页状态
const tabs = ref([
  { title: 'DOM 操作' },
  { title: '第三方库' },
  { title: '滚动位置' },
  { title: '焦点控制' }
]);
const activeTab = ref(0);

// 演示状态
const message = ref('初始消息');
const showList = ref(false);
const items = ref(['项目 1', '项目 2']);
const logs = ref<{ timestamp: string, message: string, type: string }[]>([]);
const messageElement = ref<HTMLElement | null>(null);

// 状态标志
const withoutNextTick = ref(false);
const withNextTick = ref(false);

// 添加日志
const addLog = (message: string, type = 'info') => {
  const now = new Date();
  const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  logs.value.push({ timestamp, message, type });
};

// 更新消息
const updateMessage = () => {
  // 无 nextTick 的情况
  message.value = '更新后的消息';

  if (messageElement.value) {
    const textWithoutNextTick = messageElement.value.textContent;
    addLog(`无 nextTick: DOM 内容为 "${textWithoutNextTick}"`, withoutNextTick.value ? 'error' : 'warning');
    withoutNextTick.value = true;
  }

  // 使用 nextTick 的情况
  nextTick(() => {
    if (messageElement.value) {
      const textWithNextTick = messageElement.value.textContent;
      addLog(`使用 nextTick: DOM 内容为 "${textWithNextTick}"`, 'success');
      withNextTick.value = true;
    }
  });
};

// 切换列表
const toggleList = () => {
  showList.value = !showList.value;
  addLog(`列表状态: ${showList.value ? '显示' : '隐藏'}`, 'info');
};

// 添加项目
const addItem = () => {
  const newItem = `项目 ${items.value.length + 1}`;
  items.value.push(newItem);

  nextTick(() => {
    addLog(`已添加项目: ${newItem}`, 'success');
  });
};

// 重置演示
const resetDemo = () => {
  message.value = '初始消息';
  showList.value = false;
  items.value = ['项目 1', '项目 2'];
  logs.value = [];
  withoutNextTick.value = false;
  withNextTick.value = false;
  addLog('演示已重置', 'info');
};

// 清空日志
const clearLogs = () => {
  logs.value = [];
};

// 初始化
onMounted(() => {
  addLog('组件已挂载，演示准备就绪', 'info');
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@warning-color: #f39c12;
@error-color: #e74c3c;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@border-color: #eaeaea;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-bg: rgba(46, 204, 113, 0.1);
@error-bg: rgba(231, 76, 60, 0.1);
@code-bg: #f5f7fa;

.next-tick-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: @text-color;

    .highlight {
      color: @primary-color;
      background: linear-gradient(120deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
      padding: 0 10px;
      border-radius: 6px;
    }
  }

  p {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
  }
}

.content-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: @primary-color;
  margin-top: 0;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid lighten(@primary-color, 35%);

  .icon {
    margin-right: 12px;
    font-size: 1.4rem;
  }
}

.intro-section {
  display: flex;
  align-items: center;
  gap: 25px;

  .icon-box {
    flex-shrink: 0;

    .icon {
      font-size: 3.5rem;
      background: linear-gradient(135deg, @primary-color, @accent-color);
      color: white;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 16px rgba(52, 152, 219, 0.2);
    }
  }

  .text-content {
    h2 {
      font-size: 1.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      color: @text-color;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: lighten(@text-color, 10%);
    }

    code {
      background: @code-bg;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      color: @accent-color;
      font-weight: 500;
    }
  }
}

.columns-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background: @light-bg;
  transition: all 0.3s ease;

  &:hover {
    background: lighten(@primary-color, 45%);
    transform: translateX(5px);
  }

  .feature-icon {
    width: 36px;
    height: 36px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  h3 {
    margin: 0 0 6px 0;
    font-size: 1.15rem;
    color: @text-color;
  }

  p {
    margin: 0;
    color: lighten(@text-color, 20%);
    font-size: 0.95rem;
  }
}

.principle-steps {
  .step {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .step-number {
      width: 32px;
      height: 32px;
      background: @secondary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 3px;
    }

    .step-content {
      h3 {
        margin: 0 0 8px 0;
        font-size: 1.15rem;
        color: @text-color;
      }

      p {
        margin: 0 0 10px 0;
        color: lighten(@text-color, 15%);
      }

      ul {
        margin: 10px 0;
        padding-left: 20px;

        li {
          margin-bottom: 5px;
        }
      }
    }

    .code-snippet {
      background: @code-bg;
      border-radius: 6px;
      padding: 12px 15px;
      margin-top: 10px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: @accent-color;
      overflow-x: auto;
    }
  }
}

.scenario-tabs {
  .tabs-header {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;

    button {
      background: @light-bg;
      border: none;
      padding: 10px 20px;
      border-radius: 30px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &.active {
        background: @primary-color;
        color: white;
      }
    }
  }

  .scenario-detail {
    h3 {
      margin-top: 0;
      color: @text-color;
      font-size: 1.3rem;
    }

    p {
      color: lighten(@text-color, 15%);
      margin-bottom: 15px;
    }
  }
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  margin: 15px 0;
  border-left: 4px solid @primary-color;

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.5;

    code {
      color: @text-color;
    }
  }
}

.demo-area {
  .demo-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;

    button {
      background: @primary-color;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.95rem;
      transition: background 0.2s;

      &:hover {
        background: darken(@primary-color, 8%);
      }

      &:nth-child(2) {
        background: @accent-color;

        &:hover {
          background: darken(@accent-color, 8%);
        }
      }

      &:nth-child(3) {
        background: @secondary-color;

        &:hover {
          background: darken(@secondary-color, 8%);
        }
      }

      &:last-child {
        background: @text-color;

        &:hover {
          background: lighten(@text-color, 10%);
        }
      }
    }
  }

  .demo-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .demo-panel {
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;

    .demo-title {
      background: @primary-color;
      color: white;
      padding: 12px 15px;
      font-weight: 500;
    }

    .message-display {
      padding: 25px;
      text-align: center;
      font-size: 1.3rem;
      font-weight: 500;
      background: lighten(@primary-color, 45%);
      transition: all 0.3s ease;
    }

    .item-list {
      padding: 15px;
      background: lighten(@secondary-color, 45%);

      .list-item {
        padding: 10px 15px;
        margin-bottom: 8px;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .console-panel {
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .console-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background: @text-color;
      color: white;

      button {
        background: @error-color;
        color: white;
        border: none;
        padding: 5px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;

        &:hover {
          background: darken(@error-color, 8%);
        }
      }
    }

    .console-output {
      flex: 1;
      background: #2c3e50;
      color: #ecf0f1;
      padding: 15px;
      height: 250px;
      overflow-y: auto;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;

      .log-entry {
        padding: 8px 0;
        border-bottom: 1px solid lighten(#2c3e50, 10%);

        .timestamp {
          color: #95a5a6;
          margin-right: 12px;
        }

        .info {
          color: #3498db;
        }

        .warning {
          color: #f39c12;
        }

        .error {
          color: #e74c3c;
        }

        .success {
          color: #2ecc71;
        }
      }
    }
  }
}

.explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .explanation-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-radius: 8px;
    background: @light-bg;

    h3 {
      margin: 0 0 5px 0;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: lighten(@text-color, 15%);
    }

    .status-indicator {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      flex-shrink: 0;

      &.success {
        background: @secondary-color;
      }

      &.error {
        background: @error-color;
      }

      &.pending {
        background: #bdc3c7;
      }
    }
  }
}

.summary {
  .best-practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .practice {
      display: flex;
      gap: 12px;
      padding: 15px;
      background: lighten(@secondary-color, 48%);
      border-radius: 8px;
      border-left: 4px solid @secondary-color;

      .checkmark {
        width: 28px;
        height: 28px;
        background: @secondary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      p {
        margin: 0;
        font-size: 1.05rem;
      }

      .code-snippet {
        margin-top: 10px;
        background: rgba(255, 255, 255, 0.7);
        padding: 10px;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        color: @accent-color;
      }
    }
  }
}
</style>
