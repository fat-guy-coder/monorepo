<template>
  <div class="dependency-collection-container">
    <div class="header">
      <h1>Vue 依赖收集机制</h1>
      <p class="subtitle">响应式系统的核心原理</p>
      <div class="version-badge">Vue 3.0+</div>
    </div>

    <div class="content-wrapper">
      <!-- 概念介绍 -->
      <section class="card concept-card">
        <div class="section-header">
          <h2><i class="icon icon-concept"></i> 什么是依赖收集？</h2>
        </div>
        <div class="concept-content">
          <p>
            依赖收集是 Vue 响应式系统的核心机制，它自动追踪数据依赖关系，在数据变化时精准更新相关组件。
          </p>
          <div class="collection-flow">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>组件渲染</h3>
                <p>组件渲染过程中访问响应式数据</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>依赖收集</h3>
                <p>记录数据与组件的依赖关系</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>数据变更</h3>
                <p>响应式数据发生变化</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>触发更新</h3>
                <p>通知依赖该数据的组件重新渲染</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心概念 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-core"></i> 依赖收集核心概念</h2>
        </div>
        <div class="core-concepts">
          <div class="concept">
            <div class="concept-icon">🎯</div>
            <div>
              <h3>响应式对象 (Reactive Object)</h3>
              <p>通过 reactive() 或 ref() 创建的可追踪对象</p>
            </div>
          </div>
          <div class="concept">
            <div class="concept-icon">📌</div>
            <div>
              <h3>依赖 (Dependency)</h3>
              <p>使用响应式数据的组件、计算属性或侦听器</p>
            </div>
          </div>
          <div class="concept">
            <div class="concept-icon">📦</div>
            <div>
              <h3>依赖收集器 (Dep)</h3>
              <p>存储所有依赖的容器，每个响应式属性对应一个 Dep</p>
            </div>
          </div>
          <div class="concept">
            <div class="concept-icon">👀</div>
            <div>
              <h3>观察者 (Watcher)</h3>
              <p>代表一个依赖项，负责执行更新操作</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现思路 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-implementation"></i> 依赖收集实现思路</h2>
        </div>
        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>创建响应式对象</h3>
              <p>使用 Proxy 拦截对象属性的访问和修改</p>
              <pre class="code-block">function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // 收集依赖
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      // 触发更新
      trigger(target, key);
      return true;
    }
  });
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>依赖收集 (track)</h3>
              <p>在属性被访问时，将当前 Watcher 添加到 Dep 中</p>
              <pre class="code-block">// 当前正在计算的 Watcher
let activeWatcher = null;

function track(target, key) {
  if (!activeWatcher) return;

  // 获取该属性的依赖集合
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  // 添加当前 Watcher 到依赖集合
  dep.add(activeWatcher);
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>触发更新 (trigger)</h3>
              <p>在属性被修改时，通知所有依赖该属性的 Watcher</p>
              <pre class="code-block">function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    // 通知所有 Watcher 更新
    dep.forEach(watcher => watcher.update());
  }
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>创建 Watcher</h3>
              <p>Watcher 负责执行更新操作并管理依赖</p>
              <pre class="code-block">class Watcher {
  constructor(updateFn) {
    this.updateFn = updateFn;
    // 设置当前 Watcher 为 active
    this.run();
  }

  run() {
    activeWatcher = this;
    this.updateFn();
    activeWatcher = null;
  }

  update() {
    this.run();
  }
}

// 使用示例
const state = reactive({ count: 0 });
new Watcher(() => {
  console.log(`Count: ${state.count}`);
});</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 数据结构 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-structure"></i> 依赖收集数据结构</h2>
        </div>
        <div class="data-structure">
          <pre class="code-block">// 整个依赖系统的数据结构
const targetMap = new WeakMap();

/*
targetMap 结构:
{
  [响应式对象]: {
    [属性名]: [Watcher1, Watcher2, ...]
  }
}

示例:
const state = reactive({
  count: 0,
  message: 'Hello'
});

targetMap 结构:
state (对象) → {
  'count': [Watcher1, Watcher2],
  'message': [Watcher2]
}
*/</pre>

          <div class="visualization">
            <div class="target-map">
              <div class="title">targetMap (WeakMap)</div>
              <div class="object-node">
                <div class="node-header">state 对象</div>
                <div class="properties">
                  <div class="property">
                    <div class="key">count</div>
                    <div class="deps">
                      <div class="watcher">Watcher1</div>
                      <div class="watcher">Watcher2</div>
                    </div>
                  </div>
                  <div class="property">
                    <div class="key">message</div>
                    <div class="deps">
                      <div class="watcher">Watcher2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vue3 中的实际应用 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-vue"></i> Vue3 中的依赖收集</h2>
        </div>
        <div class="vue-examples">
          <div class="example">
            <h3>组件渲染中的依赖收集</h3>
            <pre class="code-block">&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt; &#123;&#123; user.name &#125;&#125;&lt;/p&gt;
    &lt;p&gt;&#123;&#123; user.age &#125;&#125;&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { reactive } from 'vue';

const user = reactive({
  name: 'John',
  age: 30
});
&lt;/script&gt;</pre>
            <p>当组件渲染时，会自动收集 user.name 和 user.age 的依赖</p>
          </div>

          <div class="example">
            <h3>计算属性中的依赖收集</h3>
            <pre class="code-block">import { reactive, computed } from 'vue';

const state = reactive({
  firstName: 'John',
  lastName: 'Doe'
});

const fullName = computed(() => {
  // 收集 state.firstName 和 state.lastName 的依赖
  return `${state.firstName} ${state.lastName}`;
});</pre>
            <p>计算属性自动追踪其内部依赖，并在依赖变化时重新计算</p>
          </div>

          <div class="example">
            <h3>侦听器中的依赖收集</h3>
            <pre class="code-block">import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newVal, oldVal) => {
  // 自动追踪 count 的依赖
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});</pre>
            <p>侦听器自动追踪其侦听源的变化</p>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <div class="comparison-section">
        <section class="card pros-card">
          <div class="section-header">
            <h2><i class="icon icon-pros"></i> 依赖收集的优点</h2>
          </div>
          <ul class="pros-list">
            <li v-for="(pro, index) in pros" :key="index" class="pro-item">
              <div class="pro-icon">✓</div>
              <div class="pro-content">
                <strong>{{ pro.title }}</strong>
                <p>{{ pro.description }}</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="card cons-card">
          <div class="section-header">
            <h2><i class="icon icon-cons"></i> 依赖收集的挑战</h2>
          </div>
          <ul class="cons-list">
            <li v-for="(con, index) in cons" :key="index" class="con-item">
              <div class="con-icon">⚠️</div>
              <div class="con-content">
                <strong>{{ con.title }}</strong>
                <p>{{ con.description }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <div class="footer">
      <p> Vue.js 响应式系统 | 依赖收集是 Vue 高效更新的核心机制</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 依赖收集的优点
const pros = ref([
  {
    title: "精准更新",
    description: "只更新依赖变更数据的组件"
  },
  {
    title: "自动化管理",
    description: "无需手动声明依赖关系"
  },
  {
    title: "高效性能",
    description: "避免不必要的组件渲染"
  },
  {
    title: "细粒度控制",
    description: "精确到每个属性的依赖追踪"
  },
  {
    title: "简化开发",
    description: "开发者无需关注更新机制"
  },
  {
    title: "内存优化",
    description: "使用 WeakMap 避免内存泄漏"
  }
]);

// 依赖收集的挑战
const cons = ref([
  {
    title: "初始化开销",
    description: "首次渲染需要建立依赖关系"
  },
  {
    title: "调试复杂度",
    description: "依赖关系链在大型应用中较难追踪"
  },
  {
    title: "循环依赖",
    description: "不当使用可能导致无限更新循环"
  },
  {
    title: "响应式限制",
    description: "某些数据结构无法完全响应化"
  },
  {
    title: "内存占用",
    description: "存储依赖关系需要额外内存"
  },
  {
    title: "理解成本",
    description: "新手需要时间理解内部机制"
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
@pros-color: #4cc9f0;
@cons-color: #f72585;
@dep-color: #4361ee;

.dependency-collection-container {
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
      background: linear-gradient(135deg, @dep-color, @accent-color);
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
      background: linear-gradient(135deg, @dep-color, lighten(@dep-color, 15%));
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
    background: linear-gradient(135deg, @dep-color, @accent-color);
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

      .icon-concept::after {
        width: 18px;
        height: 18px;
        border: 2px solid white;
        border-radius: 4px;
      }

      .icon-core::after {
        width: 18px;
        height: 18px;
        background: white;
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      }

      .icon-implementation::after {
        width: 18px;
        height: 18px;
        background:
          linear-gradient(to right, white 33%, transparent 33%, transparent 66%, white 66%),
          linear-gradient(to bottom, white 33%, transparent 33%, transparent 66%, white 66%);
      }

      .icon-structure::after {
        width: 18px;
        height: 18px;
        background: white;
        clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
      }

      .icon-vue::after {
        width: 16px;
        height: 16px;
        background: white;
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      }

      .icon-pros::after {
        width: 16px;
        height: 16px;
        background: white;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      }

      .icon-cons::after {
        width: 16px;
        height: 2px;
        background: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);

        &::before {
          content: "";
          position: absolute;
          width: 16px;
          height: 2px;
          background: white;
          transform: rotate(90deg);
        }
      }
    }
  }

  .concept-card {
    .concept-content {
      padding: 25px;

      p {
        font-size: 1.1rem;
        margin-bottom: 25px;
      }
    }

    .collection-flow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
      }

      .flow-step {
        flex: 1;
        min-width: 180px;
        text-align: center;
        padding: 15px;
        background: lighten(@dep-color, 45%);
        border-radius: 8px;
        position: relative;

        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: @dep-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .step-content {
          padding-top: 10px;

          h3 {
            margin: 0 0 8px 0;
            color: @secondary-color;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: lighten(@text-color, 20%);
          }
        }
      }

      .flow-arrow {
        font-size: 1.8rem;
        font-weight: bold;
        color: @dep-color;
        padding: 0 10px;

        @media (max-width: 768px) {
          transform: rotate(90deg);
          padding: 10px 0;
        }
      }
    }
  }

  .core-concepts {
    padding: 25px;
    display: grid;
    gap: 20px;

    .concept {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 15px;
      background: lighten(@dep-color, 48%);
      border-radius: 8px;
      border-left: 4px solid @dep-color;

      .concept-icon {
        font-size: 1.8rem;
        line-height: 1;
      }

      h3 {
        margin: 0 0 8px 0;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: lighten(@text-color, 20%);
        font-size: 0.95rem;
      }
    }
  }

  .implementation-steps {
    padding: 25px;

    .step {
      display: flex;
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, @dep-color, @accent-color);
        color: white;
        border-radius: 50%;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 20px;
        flex-shrink: 0;
      }

      .step-content {
        flex: 1;

        h3 {
          margin: 0 0 12px 0;
          color: @secondary-color;
        }

        p {
          margin: 0 0 15px 0;
          color: lighten(@text-color, 20%);
        }
      }
    }

    .code-block {
      background: lighten(@dep-color, 48%);
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: darken(@dep-color, 25%);
      border-left: 4px solid @dep-color;
    }
  }

  .data-structure {
    padding: 25px;

    .code-block {
      background: lighten(@dep-color, 48%);
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: darken(@dep-color, 25%);
      border-left: 4px solid @dep-color;
      margin-bottom: 25px;
    }

    .visualization {
      background: lighten(@dep-color, 50%);
      border-radius: 8px;
      padding: 20px;
      border: 1px solid lighten(@dep-color, 40%);

      .target-map {
        font-family: 'Fira Code', monospace;

        .title {
          font-weight: bold;
          margin-bottom: 15px;
          color: @secondary-color;
          text-align: center;
        }

        .object-node {
          border: 2px solid @dep-color;
          border-radius: 8px;
          overflow: hidden;

          .node-header {
            background: @dep-color;
            color: white;
            padding: 10px;
            font-weight: 500;
          }

          .properties {
            padding: 15px;
            background: white;

            .property {
              margin-bottom: 15px;

              &:last-child {
                margin-bottom: 0;
              }

              .key {
                font-weight: bold;
                margin-bottom: 8px;
                color: @secondary-color;
              }

              .deps {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-left: 15px;

                .watcher {
                  background: lighten(@accent-color, 35%);
                  padding: 5px 10px;
                  border-radius: 4px;
                  font-size: 0.9rem;
                }
              }
            }
          }
        }
      }
    }
  }

  .vue-examples {
    padding: 25px;
    display: grid;
    gap: 30px;

    .example {
      h3 {
        margin: 0 0 15px 0;
        color: @secondary-color;
        padding-left: 10px;
        border-left: 4px solid @dep-color;
      }

      p {
        margin: 15px 0 0 0;
        color: lighten(@text-color, 20%);
        font-size: 0.95rem;
      }
    }

    .code-block {
      background: lighten(@dep-color, 48%);
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: darken(@dep-color, 25%);
      border-left: 4px solid @dep-color;
    }
  }

  .comparison-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros-card {
      .section-header {
        background: linear-gradient(135deg, @pros-color, darken(@pros-color, 15%));
      }
    }

    .cons-card {
      .section-header {
        background: linear-gradient(135deg, @cons-color, darken(@cons-color, 15%));
      }
    }
  }

  .pros-list,
  .cons-list {
    padding: 20px 0;

    .pro-item,
    .con-item {
      display: flex;
      padding: 15px 25px;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }

    .pro-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: lighten(@pros-color, 30%);
      color: darken(@pros-color, 30%);
      border-radius: 50%;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .con-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: lighten(@cons-color, 30%);
      color: darken(@cons-color, 30%);
      border-radius: 50%;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .pro-content,
    .con-content {
      strong {
        display: block;
        margin-bottom: 5px;
        color: @text-color;
      }

      p {
        margin: 0;
        color: lighten(@text-color, 15%);
        font-size: 0.95rem;
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
