<template>
  <div class="mutation-observer-container">
    <header>
      <h1>MutationObserver API</h1>
      <p>监听 DOM 变化的强大工具</p>
    </header>

    <div class="content-wrapper">
      <section class="concept-section">
        <h2><i class="icon icon-lightbulb"></i> 概念</h2>
        <p>
          MutationObserver 是一个内置对象，它提供了一种监视 DOM 树变化的能力。当被监视的 DOM 发生更改时，它会执行指定的回调函数。
        </p>
        <p>
          与旧的 Mutation Events 相比，MutationObserver 更高效、更强大，并且不会阻塞浏览器渲染进程。
        </p>
      </section>

      <section class="usage-section">
        <h2><i class="icon icon-code"></i> 使用方法</h2>
        <div class="code-block">
          <pre><code class="language-typescript">// 创建 MutationObserver 实例
const observer = new MutationObserver((mutations: MutationRecord[]) => {
  mutations.forEach(mutation => {
    console.log('DOM 发生变化:', mutation.type);
    // 处理不同类型的变更
    switch(mutation.type) {
      case 'childList':
        console.log('子节点变更:', mutation.addedNodes, mutation.removedNodes);
        break;
      case 'attributes':
        console.log('属性变更:', mutation.attributeName, mutation.oldValue);
        break;
      case 'characterData':
        console.log('文本内容变更:', mutation.target.textContent);
        break;
    }
  });
});

// 配置观察选项
const config: MutationObserverInit = {
  attributes: true,        // 观察属性变化
  childList: true,         // 观察直接子节点变化
  subtree: true,           // 观察所有后代节点
  attributeOldValue: true, // 记录旧属性值
  characterData: true,     // 观察文本内容变化
  characterDataOldValue: true // 记录旧文本值
};

// 开始观察目标节点
const targetNode = document.getElementById('target');
if (targetNode) {
  observer.observe(targetNode, config);
}

// 停止观察
// observer.disconnect();</code></pre>
        </div>
      </section>

      <section class="example-section">
        <h2><i class="icon icon-experiment"></i> 实时示例</h2>
        <div class="demo-area">
          <div class="demo-controls">
            <button @click="addChild">添加子元素</button>
            <button @click="removeChild">移除子元素</button>
            <button @click="changeColor">更改颜色</button>
            <button @click="changeText">更改文本</button>
            <button @click="resetDemo">重置</button>
          </div>

          <div ref="targetElement" class="target-element" :style="{ color: textColor }">
            {{ elementText }}
            <div v-for="(item, index) in childItems" :key="index" class="child-element">
              子元素 {{ index + 1 }}
            </div>
          </div>

          <div class="console">
            <div class="console-header">
              <span>MutationObserver 日志</span>
              <button @click="clearLogs">清空日志</button>
            </div>
            <div class="console-content">
              <div v-for="(log, index) in logs" :key="index" class="log-entry">
                <span class="timestamp">[{{ log.timestamp }}]</span>
                <span :class="log.type">{{ log.message }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="scenarios-section">
        <h2><i class="icon icon-appstore"></i> 使用场景</h2>
        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="card-icon">
              <i class="icon icon-dynamic"></i>
            </div>
            <h3>动态内容加载</h3>
            <p>监控无限滚动、懒加载或动态添加的内容，触发后续操作</p>
          </div>

          <div class="scenario-card">
            <div class="card-icon">
              <i class="icon icon-plugin"></i>
            </div>
            <h3>第三方插件集成</h3>
            <p>当页面中存在不可控的第三方内容变化时进行响应</p>
          </div>

          <div class="scenario-card">
            <div class="card-icon">
              <i class="icon icon-form"></i>
            </div>
            <h3>表单动态验证</h3>
            <p>监控表单结构变化，自动应用验证规则</p>
          </div>

          <div class="scenario-card">
            <div class="card-icon">
              <i class="icon icon-resize"></i>
            </div>
            <h3>元素尺寸变化</h3>
            <p>结合 ResizeObserver 监控元素尺寸和 DOM 变化</p>
          </div>

          <div class="scenario-card">
            <div class="card-icon">
              <i class="icon icon-accessibility"></i>
            </div>
            <h3>无障碍支持</h3>
            <p>检测 DOM 变化，确保动态内容满足无障碍要求</p>
          </div>

          <div class="scenario-card">
            <div class="card-icon">
              <i class="icon icon-debug"></i>
            </div>
            <h3>调试工具</h3>
            <p>开发工具中监控 DOM 变化，帮助调试复杂应用</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 示例状态
const targetElement = ref<HTMLElement | null>(null);
const textColor = ref('#333');
const elementText = ref('可观察的目标元素');
const childItems = ref<string[]>([]);
const logs = ref<{ timestamp: string, message: string, type: string }[]>([]);

// MutationObserver 实例
let observer: MutationObserver | null = null;

// 添加日志
const addLog = (message: string, type = 'info') => {
  const now = new Date();
  const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  logs.value.push({ timestamp, message, type });
};

// 初始化 MutationObserver
const initObserver = () => {
  if (!targetElement.value) return;

  // 清除现有的观察器
  if (observer) {
    observer.disconnect();
  }

  // 创建新的 MutationObserver
  observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      switch (mutation.type) {
        case 'childList':
          if (mutation.addedNodes.length) {
            addLog(`添加了 ${mutation.addedNodes.length} 个子元素`, 'child-add');
          }
          if (mutation.removedNodes.length) {
            addLog(`移除了 ${mutation.removedNodes.length} 个子元素`, 'child-remove');
          }
          break;
        case 'attributes':
          if (mutation.attributeName === 'style') {
            addLog(`样式发生变化: ${mutation.oldValue} → 新样式`, 'attribute-change');
          }
          break;
        case 'characterData':
          addLog(`文本内容变化: ${mutation.oldValue} → ${mutation.target.textContent}`, 'text-change');
          break;
      }
    });
  });

  // 配置观察选项
  const config: MutationObserverInit = {
    attributes: true,
    attributeOldValue: true,
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
  };

  // 开始观察
  observer.observe(targetElement.value, config);
  addLog('MutationObserver 已启动，开始观察目标元素', 'info');
};

// 示例操作方法
const addChild = () => {
  childItems.value.push(`item-${Date.now()}`);
  addLog('用户操作: 添加子元素', 'user-action');
};

const removeChild = () => {
  if (childItems.value.length) {
    childItems.value.pop();
    addLog('用户操作: 移除子元素', 'user-action');
  }
};

const changeColor = () => {
  const colors = ['#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#F39C12'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  textColor.value = randomColor;
  addLog(`用户操作: 更改文本颜色为 ${randomColor}`, 'user-action');
};

const changeText = () => {
  const texts = [
    'DOM 发生变化!',
    'MutationObserver 正在工作',
    '观察到文本变化',
    '尝试添加/删除子元素',
    '更改样式属性'
  ];
  elementText.value = texts[Math.floor(Math.random() * texts.length)];
  addLog('用户操作: 更改元素文本', 'user-action');
};

const resetDemo = () => {
  childItems.value = [];
  textColor.value = '#333';
  elementText.value = '可观察的目标元素';
  addLog('用户操作: 重置演示', 'user-action');
};

const clearLogs = () => {
  logs.value = [];
};

// 生命周期钩子
onMounted(() => {
  initObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@danger-color: #e74c3c;
@warning-color: #f39c12;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@border-color: #eaeaea;
@card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
@info-color: #3498db;
@success-color: #2ecc71;

.mutation-observer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid @border-color;

    h1 {
      font-size: 2.5rem;
      color: @primary-color;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      color: lighten(@text-color, 20%);
    }
  }

  .content-wrapper {
    background-color: @light-bg;
    border-radius: 8px;
    padding: 25px;
    box-shadow: @card-shadow;
  }

  section {
    margin-bottom: 40px;

    h2 {
      display: flex;
      align-items: center;
      font-size: 1.8rem;
      color: @primary-color;
      padding-bottom: 10px;
      border-bottom: 2px solid lighten(@primary-color, 40%);
      margin-bottom: 20px;

      .icon {
        margin-right: 10px;
        font-size: 1.5rem;
      }
    }
  }

  .code-block {
    background-color: #f5f7fa;
    border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
    margin: 20px 0;
    border: 1px solid @border-color;

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      code {
        color: #2c3e50;
      }
    }
  }

  .demo-area {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: @card-shadow;

    .demo-controls {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;

      button {
        background-color: @primary-color;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken(@primary-color, 10%);
        }

        &:nth-child(2) {
          background-color: @danger-color;

          &:hover {
            background-color: darken(@danger-color, 10%);
          }
        }

        &:nth-child(3) {
          background-color: @warning-color;

          &:hover {
            background-color: darken(@warning-color, 10%);
          }
        }

        &:nth-child(4) {
          background-color: @secondary-color;

          &:hover {
            background-color: darken(@secondary-color, 10%);
          }
        }
      }
    }

    .target-element {
      background-color: lighten(@primary-color, 45%);
      border: 2px dashed @primary-color;
      border-radius: 6px;
      padding: 25px;
      min-height: 120px;
      margin-bottom: 20px;
      transition: all 0.3s ease;
      font-size: 1.2rem;

      .child-element {
        background-color: lighten(@secondary-color, 40%);
        border: 1px solid @secondary-color;
        border-radius: 4px;
        padding: 8px 15px;
        margin-top: 10px;
        font-size: 0.9rem;
      }
    }

    .console {
      background-color: #2c3e50;
      border-radius: 6px;
      overflow: hidden;
      color: #ecf0f1;

      .console-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        background-color: darken(#2c3e50, 5%);
        border-bottom: 1px solid lighten(#2c3e50, 10%);

        button {
          background-color: @danger-color;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 0.8rem;
          cursor: pointer;

          &:hover {
            background-color: darken(@danger-color, 10%);
          }
        }
      }

      .console-content {
        height: 200px;
        overflow-y: auto;
        padding: 10px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;

        .log-entry {
          padding: 5px 0;
          border-bottom: 1px solid lighten(#2c3e50, 15%);

          .timestamp {
            color: #95a5a6;
            margin-right: 10px;
          }

          .info {
            color: @info-color;
          }

          .user-action {
            color: @warning-color;
          }

          .child-add {
            color: @success-color;
          }

          .child-remove {
            color: @danger-color;
          }

          .attribute-change {
            color: #9b59b6;
          }

          .text-change {
            color: #1abc9c;
          }
        }
      }
    }
  }

  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .scenario-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: @card-shadow;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      }

      .card-icon {
        width: 50px;
        height: 50px;
        background-color: lighten(@primary-color, 40%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;

        .icon {
          font-size: 1.8rem;
          color: @primary-color;
        }
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: @text-color;
      }

      p {
        color: lighten(@text-color, 20%);
        font-size: 0.95rem;
      }
    }
  }

  // 图标样式
  .icon {
    font-style: normal;

    &.icon-lightbulb:before {
      content: "💡";
    }

    &.icon-code:before {
      content: "{}";
      font-weight: bold;
    }

    &.icon-experiment:before {
      content: "🧪";
    }

    &.icon-appstore:before {
      content: "📱";
    }

    &.icon-dynamic:before {
      content: "🔄";
    }

    &.icon-plugin:before {
      content: "🔌";
    }

    &.icon-form:before {
      content: "📝";
    }

    &.icon-resize:before {
      content: "📏";
    }

    &.icon-accessibility:before {
      content: "♿";
    }

    &.icon-debug:before {
      content: "🐞";
    }
  }
}

@media (max-width: 768px) {
  .mutation-observer-container {
    padding: 15px;

    header h1 {
      font-size: 2rem;
    }

    .scenarios-grid {
      grid-template-columns: 1fr;
    }

    .demo-controls {
      flex-direction: column;

      button {
        width: 100%;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
