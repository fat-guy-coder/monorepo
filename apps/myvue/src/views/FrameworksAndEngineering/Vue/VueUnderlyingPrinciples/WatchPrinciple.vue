<template>
  <div class="watch-principle-container">
    <header class="header">
      <h1>Vue <span class="watch-text">Watch</span> 原理剖析</h1>
      <p class="subtitle">深入理解响应式系统中的依赖追踪与变化侦听</p>
    </header>

    <div class="content">
      <section class="card intro">
        <div class="intro-content">
          <div class="intro-text">
            <h2>什么是 Watch？</h2>
            <p>Vue 的 watch 是一种强大的响应式工具，用于观察和响应 Vue 实例上的数据变化。它允许开发者在数据变化时执行异步操作或复杂逻辑。</p>

            <div class="key-concepts">
              <div class="concept">
                <div class="icon">🔍</div>
                <h3>依赖追踪</h3>
                <p>自动追踪响应式依赖关系</p>
              </div>
              <div class="concept">
                <div class="icon">🔄</div>
                <h3>变化侦听</h3>
                <p>在数据变化时触发回调函数</p>
              </div>
              <div class="concept">
                <div class="icon">⏱️</div>
                <h3>异步处理</h3>
                <p>支持防抖、异步操作等高级用法</p>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="watch-flow">
              <div class="step">数据变化</div>
              <div class="arrow">→</div>
              <div class="step">依赖追踪</div>
              <div class="arrow">→</div>
              <div class="step">触发回调</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card design">
        <h2>Watch 的设计思路</h2>
        <div class="design-content">
          <div class="design-points">
            <div class="point">
              <div class="point-number">1</div>
              <h3>响应式系统集成</h3>
              <p>Watch 与 Vue 的响应式系统深度集成，利用相同的依赖追踪机制</p>
            </div>
            <div class="point">
              <div class="point-number">2</div>
              <h3>惰性求值</h3>
              <p>只在依赖变化时执行回调，避免不必要的计算</p>
            </div>
            <div class="point">
              <div class="point-number">3</div>
              <h3>异步调度</h3>
              <p>回调函数在组件更新前执行，确保正确的执行顺序</p>
            </div>
            <div class="point">
              <div class="point-number">4</div>
              <h3>清理机制</h3>
              <p>自动清理无效的依赖和副作用</p>
            </div>
          </div>

          <div class="reactivity-diagram">
            <h3>响应式系统与 Watch 的关系</h3>
            <div class="diagram">
              <div class="component">Vue 组件</div>
              <div class="arrow-down">↓</div>
              <div class="reactivity">
                <div class="title">响应式系统</div>
                <div class="parts">
                  <div class="part">Getter (收集依赖)</div>
                  <div class="part">Setter (触发更新)</div>
                </div>
              </div>
              <div class="arrow-down">↓</div>
              <div class="dep">
                <div class="title">依赖管理器 (Dep)</div>
                <div class="watchers">
                  <div class="watcher">Watcher 1</div>
                  <div class="watcher">Watcher 2</div>
                </div>
              </div>
              <div class="arrow-down">↓</div>
              <div class="callback">回调执行</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card implementation">
        <h2>Watch 实现原理与伪代码</h2>
        <div class="implementation-content">
          <div class="code-section">
            <h3>核心类：Watcher</h3>
            <pre class="code-block">class Watcher {
  constructor(
    vm: Component,          // Vue 实例
    expOrFn: string | Function, // 监听的表达式或函数
    cb: Function,           // 回调函数
    options?: Object        // 配置选项
  ) {
    this.vm = vm;
    this.cb = cb;
    this.deps = [];         // 依赖列表
    this.newDeps = [];      // 新依赖列表
    this.getter = typeof expOrFn === 'function'
      ? expOrFn
      : parsePath(expOrFn); // 转换为getter函数

    this.value = this.get(); // 初始求值，触发依赖收集
  }

  // 获取当前值并收集依赖
  get() {
    pushTarget(this);       // 设置当前Watcher为活动状态
    const value = this.getter.call(this.vm, this.vm);
    popTarget();            // 恢复上一个Watcher
    this.cleanupDeps();     // 清理旧依赖
    return value;
  }

  // 添加依赖
  addDep(dep: Dep) {
    if (!this.newDeps.includes(dep)) {
      this.newDeps.push(dep);
      dep.addSub(this);     // 将当前Watcher添加到Dep
    }
  }

  // 清理不再需要的依赖
  cleanupDeps() {
    // 移除不再需要的旧依赖
    this.deps.forEach(dep => {
      if (!this.newDeps.includes(dep)) {
        dep.removeSub(this);
      }
    });

    // 更新依赖列表
    [this.deps, this.newDeps] = [this.newDeps, []];
  }

  // 当依赖变化时调用
  update() {
    if (this.lazy) {
      this.dirty = true;    // 惰性求值标记
    } else {
      queueWatcher(this);   // 将Watcher加入更新队列
    }
  }

  // 执行回调
  run() {
    const value = this.get();   // 获取新值
    const oldValue = this.value;
    this.value = value;
    this.cb.call(this.vm, value, oldValue); // 执行回调
  }
}</pre>
          </div>

          <div class="code-section">
            <h3>依赖管理器：Dep</h3>
            <pre class="code-block">class Dep {
  static target: ?Watcher;  // 当前活动的Watcher
  subs: Array&#60;Watcher&#62;;     // 订阅的Watcher列表

  constructor() {
    this.subs = [];
  }

  // 添加Watcher订阅
  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  // 移除Watcher订阅
  removeSub(sub: Watcher) {
    const index = this.subs.indexOf(sub);
    if (index > -1) {
      this.subs.splice(index, 1);
    }
  }

  // 收集依赖
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this); // 当前Watcher添加此Dep
    }
  }

  // 通知所有订阅者更新
  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();     // 触发每个Watcher的更新
    }
  }
}

// 全局管理当前活动的Watcher
const targetStack: Array&#60;Watcher&#62; = [];

function pushTarget(target: ?Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}</pre>
          </div>

          <div class="code-section">
            <h3>响应式属性劫持</h3>
            <pre class="code-block">function defineReactive(
  obj: Object,
  key: string,
  val: any
) {
  const dep = new Dep();    // 为每个属性创建Dep

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = val;
      if (Dep.target) {     // 如果有活动的Watcher
        dep.depend();       // 收集依赖
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();         // 通知所有订阅者
    }
  });
}</pre>
          </div>
        </div>
      </section>

      <section class="card workflow">
        <h2>Watch 工作流程</h2>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-icon">1</div>
            <h3>初始化 Watch</h3>
            <p>创建 Watcher 实例，执行 getter 函数触发依赖收集</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">2</div>
            <h3>依赖收集</h3>
            <p>在 getter 执行过程中，访问的响应式属性会将当前 Watcher 添加到其 Dep 中</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">3</div>
            <h3>属性变更</h3>
            <p>当响应式属性被修改时，触发 setter</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">4</div>
            <h3>通知变更</h3>
            <p>setter 调用 Dep.notify() 通知所有订阅的 Watcher</p>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">5</div>
            <h3>执行回调</h3>
            <p>Watcher 执行 run 方法，调用回调函数并传入新值和旧值</p>
          </div>
        </div>

        <div class="advanced-features">
          <h3>高级特性实现</h3>
          <div class="features">
            <div class="feature">
              <h4>深度监听 (deep: true)</h4>
              <pre class="code-block">// 在Watcher的get方法中
if (this.deep) {
  traverse(value); // 递归访问所有嵌套属性
}

function traverse(val: any) {
  if (isObject(val)) {
    for (const key in val) {
      traverse(val[key]); // 递归访问
    }
  }
}</pre>
            </div>
            <div class="feature">
              <h4>立即执行 (immediate: true)</h4>
              <pre class="code-block">// 在Watcher构造函数中
if (options.immediate) {
  this.cb.call(vm, this.value, undefined);
}</pre>
            </div>
            <div class="feature">
              <h4>异步队列 (flush: 'pre'|'post')</h4>
              <pre class="code-block">// 在Watcher的update方法中
queueWatcher(this); // 加入队列

function queueWatcher(watcher: Watcher) {
  queue.push(watcher);
  nextTick(flushSchedulerQueue); // 下一个tick执行
}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="card use-cases">
        <h2>Watch 使用场景与最佳实践</h2>
        <div class="scenarios">
          <div class="scenario">
            <div class="scenario-icon">📊</div>
            <h3>数据过滤与转换</h3>
            <p>当需要基于其他数据计算派生数据时</p>
            <pre class="code-block">watch(
  () => state.rawData,
  (newData) => {
    state.filteredData = newData.filter(item => item.active);
  },
  { immediate: true }
)</pre>
          </div>

          <div class="scenario">
            <div class="scenario-icon">🔔</div>
            <h3>异步操作</h3>
            <p>执行API请求、异步验证等</p>
            <pre class="code-block">watch(searchQuery, (newQuery) => {
  if (newQuery.length < 3) return;

  fetchResults(newQuery).then(results => {
    searchResults.value = results;
  });
}, { debounce: 300 })</pre>
          </div>

          <div class="scenario">
            <div class="scenario-icon">🔄</div>
            <h3>状态同步</h3>
            <p>在多个组件或状态间保持同步</p>
            <pre class="code-block">watch(
  () => route.params.id,
  (newId) => {
    fetchItem(newId);
  },
  { immediate: true }
)</pre>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践与注意事项</h3>
          <ul>
            <li>优先使用计算属性 (computed) 处理数据转换，仅在有副作用时使用 watch</li>
            <li>对于对象和数组，使用深度监听 (deep: true) 或特定键路径</li>
            <li>使用防抖 (debounce) 处理高频变化的事件</li>
            <li>在组件卸载时，Vue 会自动停止 watch，但自定义清理逻辑仍需手动处理</li>
            <li>避免在 watch 回调中修改正在监听的数据，可能导致无限循环</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Vue Watch 原理 | 深入响应式系统的核心机制</p>
      <div class="links">
        <a href="https://vuejs.org/guide/essentials/watchers.html" target="_blank">官方文档</a>
        <a href="https://github.com/vuejs/core" target="_blank">源码实现</a>
        <a href="https://vueschool.io/articles/vuejs-tutorials/understanding-vue-js-reactivity/"
          target="_blank">深入教程</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

// 示例响应式数据
const count = ref(0);
const showDemo = ref(true);

// 示例 watch
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});

// 示例效果
const increment = () => {
  count.value++;
};

const toggleDemo = () => {
  showDemo.value = !showDemo.value;
};
</script>

<style lang="less" scoped>


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.watch-principle-container {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #334155;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
    color: #1e293b;

    .watch-text {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e2e8f0;
    color: #1e293b;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: #3b82f6;
    }
  }
}

.intro {
  .intro-content {
    display: flex;
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .intro-text {
    flex: 1;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
      color: #475569;
    }

    .key-concepts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 30px;

      .concept {
        text-align: center;
        padding: 25px 15px;
        background: #f0f7ff;
        border-radius: 10px;
        border: 1px solid #dbeafe;
        transition: all 0.3s ease;

        &:hover {
          background: #dbeafe;
          transform: translateY(-5px);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #1e293b;
        }

        p {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 0;
        }
      }
    }
  }

  .intro-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .watch-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 30px 20px;
    max-width: 500px;
    width: 100%;

    .step {
      background: #3b82f6;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      font-weight: 600;
      min-width: 120px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
    }

    .arrow {
      font-size: 1.5rem;
      color: #94a3b8;
      font-weight: bold;
    }
  }
}

.design {
  .design-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .design-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .point {
      background: white;
      border-radius: 10px;
      padding: 25px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      display: flex;
      gap: 15px;
      align-items: flex-start;

      &:hover {
        border-color: #3b82f6;
        box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      }

      .point-number {
        width: 40px;
        height: 40px;
        background: #3b82f6;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: #1e293b;
      }

      p {
        color: #64748b;
        font-size: 0.95rem;
      }
    }
  }

  .reactivity-diagram {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
      text-align: center;
    }
  }

  .diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    &>div {
      width: 100%;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      font-weight: 600;
    }

    .component {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .arrow-down {
      font-size: 1.5rem;
      color: #94a3b8;
    }

    .reactivity {
      background: #ede9fe;
      color: #7c3aed;

      .parts {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 15px;

        .part {
          background: white;
          padding: 10px;
          border-radius: 6px;
          font-size: 0.9rem;
        }
      }
    }

    .dep {
      background: #fce7f3;
      color: #db2777;

      .watchers {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 15px;

        .watcher {
          background: white;
          padding: 10px;
          border-radius: 6px;
          font-size: 0.9rem;
        }
      }
    }

    .callback {
      background: #dcfce7;
      color: #166534;
    }
  }
}

.implementation {
  .implementation-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .code-section {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }
}

.workflow {
  .workflow-steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 30px 0;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .step {
    text-align: center;
    padding: 20px;
    background: #f0f7ff;
    border-radius: 10px;
    min-width: 150px;
    transition: all 0.3s ease;
    border: 1px solid #b4d0ff;

    @media (max-width: 900px) {
      margin-bottom: 20px;
    }

    &:hover {
      background: #d6e7ff;
      transform: translateY(-5px);
    }

    .step-icon {
      width: 40px;
      height: 40px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin: 0 auto 15px;
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #1e293b;
    }

    p {
      font-size: 0.95rem;
      color: #64748b;
    }
  }

  .arrow {
    font-size: 1.8rem;
    color: #94a3b8;
    padding: 0 10px;

    @media (max-width: 900px) {
      transform: rotate(90deg);
      margin: -10px auto;
      padding: 10px 0;
    }
  }

  .advanced-features {
    margin-top: 40px;
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .feature {
      background: white;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e2e8f0;

      h4 {
        font-size: 1.2rem;
        margin-bottom: 15px;
        color: #1e293b;
      }
    }
  }
}

.use-cases {
  .scenarios {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-bottom: 30px;
  }

  .scenario {
    background: white;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      border-color: #3b82f6;
    }

    .scenario-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: #3b82f6;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: #1e293b;
    }

    p {
      color: #64748b;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
  }

  .best-practices {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    border-left: 4px solid #3b82f6;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 15px;
        line-height: 1.7;
        position: relative;
        padding-left: 25px;

        &::before {
          content: '•';
          position: absolute;
          left: 10px;
          color: #3b82f6;
          font-weight: bold;
        }
      }
    }
  }
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 15px 0;
  line-height: 1.5;
  border: 1px solid #334155;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px 8px 0 0;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #e2e8f0;
  color: #64748b;

  .links {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      padding: 5px 10px;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 2px;
        background: #3b82f6;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .workflow-steps {
    .arrow {
      margin: 10px auto;
    }
  }
}
</style>
