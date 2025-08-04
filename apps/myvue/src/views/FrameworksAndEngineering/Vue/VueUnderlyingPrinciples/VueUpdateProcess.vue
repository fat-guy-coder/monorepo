<template>
  <div class="update-process-container">
    <div class="header">
      <h1>Vue 更新流程基础介绍</h1>
      <p class="subtitle">从数据变更到视图更新的完整过程</p>
      <div class="version-badge">Vue 3.0+</div>
    </div>

    <div class="content-wrapper">
      <!-- 概述 -->
      <section class="card overview-card">
        <div class="section-header">
          <h2><i class="icon icon-overview"></i> Vue 更新流程概述</h2>
        </div>
        <div class="overview-content">
          <p>
            Vue 的更新流程是一个高效、异步的 DOM 更新机制，确保在数据变化时以最小代价更新视图。
            整个过程可以分为 <strong>响应式数据变更</strong>、<strong>依赖触发</strong>、
            <strong>虚拟 DOM 重新渲染</strong> 和 <strong>DOM 更新</strong> 四个主要阶段。
          </p>
          <div class="process-flow">
            <div class="flow-item">
              <div class="flow-icon">1</div>
              <div class="flow-label">数据变更</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-item">
              <div class="flow-icon">2</div>
              <div class="flow-label">依赖触发</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-item">
              <div class="flow-icon">3</div>
              <div class="flow-label">虚拟 DOM 渲染</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-item">
              <div class="flow-icon">4</div>
              <div class="flow-label">DOM 更新</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 完整流程 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-process"></i> 完整更新流程</h2>
        </div>
        <div class="process-steps">
          <div class="step" v-for="(step, index) in processSteps" :key="index">
            <div class="step-header">
              <div class="step-number">{{ index + 1 }}</div>
              <h3>{{ step.title }}</h3>
            </div>
            <div class="step-content">
              <p>{{ step.description }}</p>
              <div v-if="step.code" class="code-block-container">
                <pre class="code-block">{{ step.code }}</pre>
              </div>
              <div v-if="step.diagram" class="step-diagram">
                <div class="diagram-content" v-html="step.diagram"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 异步更新机制 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-async"></i> 异步更新机制</h2>
        </div>
        <div class="async-content">
          <div class="async-explanation">
            <p>
              Vue 使用<strong>异步更新队列</strong>优化性能，将多次数据变更合并为一次更新。
              更新过程使用 <code>nextTick</code> 方法，内部根据环境选择最优的异步策略：
            </p>
            <ul>
              <li><strong>Promise.then</strong> (现代浏览器)</li>
              <li><strong>MutationObserver</strong> (备用方案)</li>
              <li><strong>setImmediate</strong> (IE10+)</li>
              <li><strong>setTimeout</strong> (降级方案)</li>
            </ul>
            <pre class="code-block">// 更新队列伪代码
let queue = [];
let waiting = false;

function queueWatcher(watcher) {
  // 去重
  if (!queue.includes(watcher)) {
    queue.push(watcher);
  }

  if (!waiting) {
    waiting = true;
    nextTick(flushSchedulerQueue);
  }
}

function flushSchedulerQueue() {
  // 排序确保正确更新顺序
  queue.sort((a, b) => a.id - b.id);

  // 执行更新
  for (const watcher of queue) {
    watcher.run();
  }

  // 重置
  queue = [];
  waiting = false;
}</pre>
          </div>
          <div class="async-visual">
            <div class="visual-title">异步更新过程</div>
            <div class="timeline">
              <div class="event">
                <div class="event-time">t0</div>
                <div class="event-dot"></div>
                <div class="event-label">数据变更1</div>
              </div>
              <div class="event">
                <div class="event-time">t1</div>
                <div class="event-dot"></div>
                <div class="event-label">数据变更2</div>
              </div>
              <div class="event">
                <div class="event-time">t2</div>
                <div class="event-dot"></div>
                <div class="event-label">数据变更3</div>
              </div>
              <div class="update-barrier">
                <div class="barrier-line"></div>
                <div class="barrier-label">nextTick</div>
              </div>
              <div class="event major">
                <div class="event-time">t3</div>
                <div class="event-dot"></div>
                <div class="event-label">合并更新</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 虚拟DOM Diff算法 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-diff"></i> 虚拟DOM Diff算法</h2>
        </div>
        <div class="diff-content">
          <div class="diff-explanation">
            <p>Vue 使用高效的 Diff 算法比较新旧虚拟 DOM，最小化 DOM 操作：</p>
            <ul>
              <li><strong>同级比较</strong>：只比较同一层级的节点</li>
              <li><strong>Key 优化</strong>：使用 key 标识节点身份</li>
              <li><strong>双端比较</strong>：从两端向中间比较</li>
              <li><strong>就地复用</strong>：尽可能复用相同节点</li>
            </ul>
          </div>
          <div class="diff-example">
            <div class="vdom-comparison">
              <div class="vdom old">
                <div class="vdom-title">旧虚拟DOM</div>
                <div class="vdom-node root">
                  <div class="node-label">div (id:app)</div>
                  <div class="children">
                    <div class="vdom-node">
                      <div class="node-label">h1</div>
                      <div class="node-content">Hello Vue</div>
                    </div>
                    <div class="vdom-node">
                      <div class="node-label">ul</div>
                      <div class="children">
                        <div class="vdom-node" v-for="i in 3" :key="i">
                          <div class="node-label">li (key={{ i }})</div>
                          <div class="node-content">Item {{ i }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="vdom-arrow">→</div>

              <div class="vdom new">
                <div class="vdom-title">新虚拟DOM</div>
                <div class="vdom-node root">
                  <div class="node-label">div (id:app)</div>
                  <div class="children">
                    <div class="vdom-node">
                      <div class="node-label">h1</div>
                      <div class="node-content">Hello Vue3</div>
                    </div>
                    <div class="vdom-node">
                      <div class="node-label">ul</div>
                      <div class="children">
                        <div class="vdom-node" v-for="i in 4" :key="i">
                          <div class="node-label">li (key={{ i }})</div>
                          <div class="node-content">Item {{ i }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="diff-result">
              <div class="result-title">Diff 结果：</div>
              <ul>
                <li>更新 h1 文本内容</li>
                <li>添加新的 li 元素 (key=4)</li>
                <li>复用其他 li 元素</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 更新优化策略 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-optimization"></i> Vue 更新优化策略</h2>
        </div>
        <div class="optimization-grid">
          <div class="strategy">
            <div class="strategy-icon">⚡</div>
            <h3>异步更新队列</h3>
            <p>合并多个数据变更，减少不必要的渲染</p>
          </div>
          <div class="strategy">
            <div class="strategy-icon">🔑</div>
            <h3>Key 优化</h3>
            <p>使用 key 帮助识别节点，提高复用率</p>
          </div>
          <div class="strategy">
            <div class="strategy-icon">🧩</div>
            <h3>组件级更新</h3>
            <p>只更新数据变化的组件</p>
          </div>
          <div class="strategy">
            <div class="strategy-icon">🧠</div>
            <h3>智能 Diff 算法</h3>
            <p>最小化 DOM 操作，提高性能</p>
          </div>
          <div class="strategy">
            <div class="strategy-icon">📦</div>
            <h3>静态提升</h3>
            <p>编译时标记静态节点，跳过更新</p>
          </div>
          <div class="strategy">
            <div class="strategy-icon">🔄</div>
            <h3>缓存事件处理</h3>
            <p>避免不必要的事件处理函数重建</p>
          </div>
        </div>
      </section>

      <!-- 更新钩子函数 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-hooks"></i> 更新生命周期钩子</h2>
        </div>
        <div class="hooks-timeline">
          <div class="timeline-item" v-for="(hook, index) in lifecycleHooks" :key="index">
            <div class="hook-name">{{ hook.name }}</div>
            <div class="hook-description">{{ hook.description }}</div>
            <div class="hook-timing">更新阶段 {{ index + 1 }}</div>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>© 2023 Vue.js 核心机制 | 更新流程是 Vue 响应式系统的核心</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';

// 更新流程步骤
const processSteps = ref([
  {
    title: "响应式数据变更",
    description: "当组件中的响应式数据（如通过 ref 或 reactive 创建的数据）发生变化时，触发 setter 拦截器。",
    code: `const count = ref(0);

// 数据变更触发更新
count.value = 1;`,
    diagram: `<div class="diagram-box">
  <div class="data-change">count: 0 → 1</div>
  <div class="arrow-down">↓</div>
  <div class="reactive-proxy">Proxy setter 拦截</div>
</div>`
  },
  {
    title: "触发依赖更新",
    description: "数据变更触发依赖该数据的 Watcher 更新。每个组件实例对应一个渲染 Watcher，负责组件的重新渲染。",
    code: `// 伪代码 - 触发依赖更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(watcher => {
      // 将 watcher 加入更新队列
      queueWatcher(watcher);
    });
  }
}`,
    diagram: `<div class="dependency-diagram">
  <div class="dep-target">数据对象</div>
  <div class="arrow-down">↓</div>
  <div class="dep-list">
    <div>Watcher (组件1)</div>
    <div>Watcher (组件2)</div>
    <div>Watcher (计算属性)</div>
  </div>
</div>`
  },
  {
    title: "虚拟 DOM 重新渲染",
    description: "Watcher 执行更新函数，重新运行组件的渲染函数生成新的虚拟 DOM 树。",
    code: `// 伪代码 - 渲染函数执行
updateComponent = () => {
  // 执行渲染函数生成 VNode
  const vnode = render.call(instance);

  // 对比新旧 VNode
  patch(prevVNode, vnode);
}`,
    diagram: `<div class="vdom-diagram">
  <div class="vdom-old">旧虚拟DOM</div>
  <div class="vdom-arrow">→</div>
  <div class="render-process">执行 render 函数</div>
  <div class="vdom-arrow">→</div>
  <div class="vdom-new">新虚拟DOM</div>
</div>`
  },
  {
    title: "Diff 算法对比",
    description: "将新生成的虚拟 DOM 与旧的虚拟 DOM 进行对比，找出差异（Diff 算法）。",
    code: `// 伪代码 - Diff 算法简化版
function patch(oldVNode, newVNode) {
  // 节点类型不同，直接替换
  if (oldVNode.tag !== newVNode.tag) {
    replaceNode(oldVNode, newVNode);
    return;
  }

  // 相同节点，更新属性
  updateProps(oldVNode, newVNode);

  // 对比子节点
  patchChildren(oldVNode, newVNode);
}`,
    diagram: `<div class="diff-diagram">
  <div class="diff-item same">相同节点</div>
  <div class="diff-item update">需要更新</div>
  <div class="diff-item remove">移除节点</div>
  <div class="diff-item add">新增节点</div>
</div>`
  },
  {
    title: "DOM 更新",
    description: "根据 Diff 结果，执行具体的 DOM 操作（创建、更新、删除节点），更新真实 DOM。",
    code: `// 伪代码 - DOM 更新
function patchChildren(oldVNode, newVNode) {
  // 更新子节点
  for (let i = 0; i < newChildren.length; i++) {
    // 对比新旧子节点
    patch(oldChildren[i], newChildren[i]);
  }

  // 移除多余节点
  for (let i = newChildren.length; i < oldChildren.length; i++) {
    removeNode(oldChildren[i].el);
  }
}`,
    diagram: `<div class="dom-diagram">
  <div class="dom-node">div</div>
  <div class="children">
    <div class="dom-node update">h1 (更新文本)</div>
    <div class="dom-node">ul</div>
    <div class="children">
      <div class="dom-node same">li (复用)</div>
      <div class="dom-node same">li (复用)</div>
      <div class="dom-node add">li (新增)</div>
    </div>
  </div>
</div>`
  },
  {
    title: "完成更新",
    description: "更新完成后，触发 updated 生命周期钩子，此时 DOM 已经更新完成。",
    code: `// 组件选项
export default {
  updated() {
    // DOM 已更新完成
    console.log('组件已更新');
  }
}`,
    diagram: `<div class="completed-diagram">
  <div class="check-icon">✓</div>
  <div>DOM 更新完成</div>
</div>`
  }
]);

// 生命周期钩子
const lifecycleHooks = ref([
  {
    name: "beforeUpdate",
    description: "数据变化后，虚拟 DOM 重新渲染和打补丁之前调用"
  },
  {
    name: "render",
    description: "执行渲染函数生成虚拟 DOM"
  },
  {
    name: "updated",
    description: "虚拟 DOM 重新渲染和打补丁后调用，此时 DOM 已更新"
  },
  {
    name: "nextTick",
    description: "DOM 更新完成后执行，用于获取更新后的 DOM"
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9ff;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e9ecef;
@update-color: #4361ee;

.update-process-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 0;
    position: relative;

    h1 {
      color: @secondary-color;
      font-size: 2.8rem;
      margin-bottom: 10px;
      background: linear-gradient(135deg, @update-color, @accent-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.3rem;
      color: lighten(@text-color, 20%);
      max-width: 700px;
      margin: 0 auto 15px;
    }

    .version-badge {
      display: inline-block;
      background: linear-gradient(135deg, @update-color, lighten(@update-color, 15%));
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }

  .content-wrapper {
    display: grid;
    gap: 25px;
  }

  .card {
    background: @card-bg;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
  }

  .section-header {
    padding: 18px 25px;
    background: linear-gradient(135deg, @update-color, @accent-color);
    color: white;

    h2 {
      margin: 0;
      font-size: 1.4rem;
      display: flex;
      align-items: center;

      .icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 12px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .icon-overview::after {
        width: 18px;
        height: 18px;
        border: 2px solid white;
        border-radius: 4px;
      }

      .icon-process::after {
        width: 18px;
        height: 18px;
        background:
          linear-gradient(to right, white 33%, transparent 33%, transparent 66%, white 66%),
          linear-gradient(to bottom, white 33%, transparent 33%, transparent 66%, white 66%);
      }

      .icon-async::after {
        width: 18px;
        height: 18px;
        background: white;
        clip-path: polygon(0 40%, 40% 40%, 40% 0, 60% 0, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0 60%);
      }

      .icon-diff::after {
        width: 18px;
        height: 18px;
        background: white;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%, 50% 100%, 50% 0, 100% 50%, 0 50%);
      }

      .icon-optimization::after {
        width: 18px;
        height: 18px;
        background: white;
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
      }

      .icon-hooks::after {
        width: 18px;
        height: 18px;
        background: white;
        clip-path: polygon(0 0, 100% 0, 100% 20%, 50% 35%, 0 20%);
      }
    }
  }

  .overview-card {
    .overview-content {
      padding: 25px;

      p {
        font-size: 1.1rem;
        margin-bottom: 25px;
      }
    }

    .process-flow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
      }

      .flow-item {
        flex: 1;
        min-width: 180px;
        text-align: center;
        padding: 15px;
        background: lighten(@update-color, 45%);
        border-radius: 8px;
        position: relative;

        .flow-icon {
          width: 36px;
          height: 36px;
          background: @update-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin: 0 auto 10px;
        }

        .flow-label {
          font-weight: 600;
          color: @secondary-color;
        }
      }

      .flow-arrow {
        font-size: 1.8rem;
        font-weight: bold;
        color: @update-color;
        padding: 0 10px;

        @media (max-width: 768px) {
          transform: rotate(90deg);
          padding: 10px 0;
        }
      }
    }
  }

  .process-steps {
    padding: 25px;

    .step {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .step-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, @update-color, @accent-color);
          color: white;
          border-radius: 50%;
          font-weight: bold;
          font-size: 1.2rem;
          margin-right: 15px;
          flex-shrink: 0;
        }

        h3 {
          margin: 0;
          color: @secondary-color;
        }
      }

      .step-content {
        p {
          margin: 0 0 15px 0;
          color: lighten(@text-color, 20%);
        }

        .step-diagram {
          margin: 15px 0;
          padding: 15px;
          background: lighten(@update-color, 50%);
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;

          .diagram-box {
            text-align: center;

            .data-change {
              background: lighten(@update-color, 40%);
              padding: 10px;
              border-radius: 6px;
              font-weight: 500;
            }

            .arrow-down {
              font-size: 1.5rem;
              margin: 10px 0;
            }

            .reactive-proxy {
              background: lighten(@accent-color, 35%);
              padding: 10px;
              border-radius: 6px;
              font-weight: 500;
            }
          }
        }
      }
    }

    .code-block-container {
      margin: 15px 0;
    }

    .code-block {
      background: lighten(@update-color, 48%);
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: darken(@update-color, 25%);
      border-left: 4px solid @update-color;
    }
  }

  .async-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .async-explanation {
      p {
        margin-top: 0;
      }

      ul {
        padding-left: 20px;
        margin: 15px 0;

        li {
          margin-bottom: 8px;
        }
      }
    }

    .async-visual {
      .visual-title {
        font-weight: 600;
        margin-bottom: 15px;
        color: @secondary-color;
      }

      .timeline {
        position: relative;
        padding: 20px 0 40px;

        &::before {
          content: "";
          position: absolute;
          left: 50px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: @update-color;
        }

        .event {
          position: relative;
          margin-bottom: 30px;
          padding-left: 70px;

          .event-time {
            position: absolute;
            left: 20px;
            top: 0;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
          }

          .event-dot {
            position: absolute;
            left: 46px;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 10px;
            background: @update-color;
            border-radius: 50%;
            z-index: 2;
          }

          .event-label {
            background: lighten(@update-color, 45%);
            padding: 8px 12px;
            border-radius: 6px;
            display: inline-block;
          }

          &.major {
            .event-dot {
              width: 14px;
              height: 14px;
              background: @accent-color;
            }

            .event-label {
              background: lighten(@accent-color, 35%);
              font-weight: 500;
            }
          }
        }

        .update-barrier {
          position: relative;
          padding-left: 70px;
          margin: 40px 0;

          .barrier-line {
            height: 2px;
            background: @accent-color;
            position: relative;

            &::before {
              content: "";
              position: absolute;
              top: -5px;
              left: 0;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 8px 10px 8px;
              border-color: transparent transparent @accent-color transparent;
            }
          }

          .barrier-label {
            position: absolute;
            top: -30px;
            left: 70px;
            background: @accent-color;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.85rem;
          }
        }
      }
    }
  }

  .diff-content {
    padding: 25px;

    .diff-explanation {
      margin-bottom: 20px;

      p {
        margin-top: 0;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 10px;
        }
      }
    }

    .diff-example {
      .vdom-comparison {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 20px;

        .vdom {
          flex: 1;
          border: 1px solid lighten(@update-color, 30%);
          border-radius: 8px;
          overflow: hidden;

          .vdom-title {
            background: lighten(@update-color, 40%);
            padding: 8px;
            text-align: center;
            font-weight: 500;
          }

          .vdom-node {
            padding: 10px;

            &.root {
              background: lighten(@update-color, 45%);
            }

            .node-label {
              font-weight: 500;
              font-size: 0.95rem;
              margin-bottom: 5px;
            }

            .node-content {
              font-size: 0.9rem;
              color: lighten(@text-color, 20%);
            }

            .children {
              padding-left: 20px;
              margin-top: 10px;
              border-left: 1px dashed lighten(@update-color, 30%);
            }
          }
        }

        .vdom-arrow {
          font-size: 2rem;
          padding-top: 30px;
          color: @update-color;
        }
      }

      .diff-result {
        background: lighten(@accent-color, 45%);
        padding: 15px;
        border-radius: 8px;
        border-left: 4px solid @accent-color;

        .result-title {
          font-weight: 500;
          margin-bottom: 10px;
          color: @secondary-color;
        }
      }
    }
  }

  .optimization-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 25px;

    .strategy {
      text-align: center;
      padding: 20px;
      background: lighten(@update-color, 48%);
      border-radius: 10px;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-5px);
      }

      .strategy-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        margin: 0 0 10px 0;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: lighten(@text-color, 20%);
        font-size: 0.95rem;
      }
    }
  }

  .hooks-timeline {
    padding: 25px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 20px;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, @update-color, @accent-color);
      border-radius: 2px;
    }

    .timeline-item {
      position: relative;
      padding: 20px 20px 20px 60px;
      margin-bottom: 20px;
      background: lighten(@update-color, 50%);
      border-radius: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      &::before {
        content: "";
        position: absolute;
        left: 16px;
        top: 24px;
        width: 12px;
        height: 12px;
        background: @update-color;
        border-radius: 50%;
        z-index: 2;
      }

      .hook-name {
        font-weight: 600;
        font-size: 1.1rem;
        color: @secondary-color;
        margin-bottom: 5px;
      }

      .hook-description {
        color: lighten(@text-color, 20%);
        margin-bottom: 8px;
      }

      .hook-timing {
        display: inline-block;
        background: lighten(@accent-color, 35%);
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 0.85rem;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    padding: 25px 0;
    color: lighten(@text-color, 30%);
    font-size: 0.9rem;
    border-top: 1px solid @border-color;
  }
}
</style>
