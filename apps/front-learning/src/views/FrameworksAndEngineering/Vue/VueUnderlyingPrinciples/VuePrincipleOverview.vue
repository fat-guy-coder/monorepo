<template>
  <div class="vue-principle-container">
    <header class="header">
      <h1>Vue.js 核心原理剖析</h1>
      <p class="subtitle">从数据变化到视图更新的完整流程解析</p>
    </header>

    <div class="content-wrapper">
      <!-- Vue整体架构 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🏗️</span> Vue 整体架构
          </h2>
          <p class="section-description">Vue.js 的核心模块及其协作关系</p>
        </div>

        <div class="architecture-diagram">
          <div class="layer">
            <div class="layer-title">模板层</div>
            <div class="module">Template</div>
          </div>
          <div class="arrow">↓</div>
          <div class="layer">
            <div class="layer-title">编译层</div>
            <div class="module">Compiler</div>
          </div>
          <div class="arrow">↓</div>
          <div class="layer">
            <div class="layer-title">运行时</div>
            <div class="module-group">
              <div class="module">Reactivity</div>
              <div class="module">Virtual DOM</div>
              <div class="module">Renderer</div>
            </div>
          </div>
        </div>

        <div class="architecture-explanation">
          <div class="explanation-card">
            <h3>模板层</h3>
            <p>开发者编写的模板代码，可以是单文件组件(SFC)中的template，也可以是JSX</p>
          </div>
          <div class="explanation-card">
            <h3>编译层</h3>
            <p>将模板编译为渲染函数，包括模板解析、优化和代码生成</p>
          </div>
          <div class="explanation-card">
            <h3>运行时</h3>
            <p>包含响应式系统、虚拟DOM和渲染器，负责驱动应用运行</p>
          </div>
        </div>
      </section>

      <!-- 核心流程 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🔄</span> 数据更新到视图的完整流程
          </h2>
          <p class="section-description">从数据变化到DOM更新的全链路分析</p>
        </div>

        <div class="process-flow">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>数据响应式</h3>
              <p>使用 Proxy 拦截对象操作，创建响应式数据</p>
              <div class="code-block">
                <pre><code>const state = reactive({ count: 0 });

// Proxy 拦截
const proxy = new Proxy(target, {
  get(target, key) {
    track(target, key); // 依赖收集
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    Reflect.set(target, key, value);
    trigger(target, key); // 触发更新
    return true;
  }
});</code></pre>
              </div>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>依赖收集</h3>
              <p>在渲染过程中，建立数据与组件的依赖关系</p>
              <div class="dependency-diagram">
                <div class="data">响应式数据</div>
                <div class="arrow">→</div>
                <div class="dep">Dep</div>
                <div class="arrow">→</div>
                <div class="watcher">Watcher (组件更新函数)</div>
              </div>
              <p>每个响应式属性对应一个 Dep 实例，存储所有依赖它的 Watcher</p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>触发更新</h3>
              <p>当数据变化时，通知所有依赖的 Watcher 进行更新</p>
              <div class="code-block">
                <pre><code>function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => {
      // 调度执行更新
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    });
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>虚拟DOM生成</h3>
              <p>执行渲染函数，生成新的虚拟DOM树</p>
              <div class="code-block">
                <pre><code>// 编译后的渲染函数
function render() {
  return h('div', { class: 'container' }, [
    h('h1', this.title),
    h('p', this.content),
    h('button', { onClick: this.increment }, `Count: ${this.count}`)
  ]);
}</code></pre>
              </div>
              <p>虚拟DOM是轻量级的JS对象，描述真实DOM结构</p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>Diff算法对比</h3>
              <p>比较新旧虚拟DOM树，找出最小变更集</p>
              <div class="diff-diagram">
                <div class="vdom old">
                  <div class="node">div (id:app)</div>
                  <div class="node">h1 (title)</div>
                  <div class="node">p (content)</div>
                </div>
                <div class="arrow">→</div>
                <div class="vdom new">
                  <div class="node same">div (id:app)</div>
                  <div class="node same">h1 (title)</div>
                  <div class="node changed">p (updated content)</div>
                </div>
              </div>
              <p>Diff算法优化：同层比较、key优化、组件复用</p>
            </div>
          </div>

          <div class="process-step">
            <div class="step-number">6</div>
            <div class="step-content">
              <h3>Patch更新</h3>
              <p>将变更应用到真实DOM上</p>
              <div class="code-block">
                <pre><code>function patch(oldVNode, newVNode) {
  if (sameVNode(oldVNode, newVNode)) {
    // 比较并更新子节点
    patchVNode(oldVNode, newVNode);
  } else {
    // 替换整个节点
    const parent = oldVNode.elm.parentNode;
    const elm = createElm(newVNode);
    parent.insertBefore(elm, oldVNode.elm);
    parent.removeChild(oldVNode.elm);
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 响应式系统基础介绍 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">⚡</span> 响应式系统基础介绍
          </h2>
          <p class="section-description">Vue3 基于 Proxy 的响应式原理</p>
        </div>

        <div class="reactivity-system">
          <div class="reactivity-card">
            <h3>核心数据结构</h3>
            <div class="data-structures">
              <div class="structure">
                <h4>TargetMap</h4>
                <pre>WeakMap&lt;target, DepsMap&gt;</pre>
                <p>存储所有响应式对象及其依赖映射</p>
              </div>
              <div class="structure">
                <h4>DepsMap</h4>
                <pre>Map&lt;key, Dep&gt;</pre>
                <p>存储对象属性及其依赖集合</p>
              </div>
              <div class="structure">
                <h4>Dep</h4>
                <pre>Set&lt;ReactiveEffect&gt;</pre>
                <p>存储依赖该属性的所有副作用</p>
              </div>
            </div>
          </div>

          <div class="reactivity-card">
            <h3>副作用 (Effect)</h3>
            <p>Vue3 使用 ReactiveEffect 类管理副作用</p>
            <div class="code-block">
              <pre><code>class ReactiveEffect {
  constructor(fn, scheduler) {
    this.fn = fn; // 副作用函数
    this.scheduler = scheduler; // 调度函数
  }

  run() {
    activeEffect = this;
    try {
      return this.fn();
    } finally {
      activeEffect = null;
    }
  }
}

function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  return _effect;
}</code></pre>
            </div>
          </div>

          <div class="reactivity-card">
            <h3>依赖收集与触发</h3>
            <div class="track-trigger-flow">
              <div class="step">1. 渲染组件</div>
              <div class="arrow">→</div>
              <div class="step">2. 执行渲染函数</div>
              <div class="arrow">→</div>
              <div class="step">3. 访问响应式数据 (触发get)</div>
              <div class="arrow">→</div>
              <div class="step">4. track收集依赖</div>
              <div class="arrow">↓</div>
              <div class="step">5. 数据变更 (触发set)</div>
              <div class="arrow">→</div>
              <div class="step">6. trigger通知更新</div>
              <div class="arrow">→</div>
              <div class="step">7. 重新执行副作用</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 虚拟DOM与渲染器 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🌲</span> 虚拟DOM与渲染器
          </h2>
          <p class="section-description">高效更新视图的核心机制</p>
        </div>

        <div class="vdom-renderer">
          <div class="vdom-card">
            <h3>虚拟DOM结构</h3>
            <div class="code-block">
              <pre><code>interface VNode {
  type: string | Component; // 标签名或组件
  props: Record&lt;string, any&gt;; // 属性
  children: VNode[] | string; // 子节点
  el: HTMLElement | null; // 对应的真实DOM
  key: string | number | symbol; // 优化标识
  // ...其他内部属性
}</code></pre>
            </div>
            <p>虚拟DOM是轻量级的JS对象，描述真实DOM结构</p>
          </div>

          <div class="vdom-card">
            <h3>Diff算法优化策略</h3>
            <ul class="diff-strategies">
              <li>
                <strong>同层比较</strong>
                <p>只比较同一层级节点，不跨级比较</p>
              </li>
              <li>
                <strong>Key优化</strong>
                <p>通过key识别节点身份，复用相同节点</p>
              </li>
              <li>
                <strong>组件复用</strong>
                <p>相同类型的组件复用实例</p>
              </li>
              <li>
                <strong>双端比较</strong>
                <p>同时从新旧列表两端开始比较</p>
              </li>
            </ul>
          </div>

          <div class="vdom-card">
            <h3>Patch过程</h3>
            <div class="patch-process">
              <div class="step">
                <div class="step-title">创建节点</div>
                <p>createElm(vnode)</p>
              </div>
              <div class="step">
                <div class="step-title">更新节点</div>
                <p>patchVnode(oldVnode, newVnode)</p>
              </div>
              <div class="step">
                <div class="step-title">删除节点</div>
                <p>removeVnodes(parent, oldCh, startIdx, endIdx)</p>
              </div>
              <div class="step">
                <div class="step-title">插入节点</div>
                <p>insertBefore(parent, newCh, refCh)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 编译器原理 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🔧</span> 编译器原理
          </h2>
          <p class="section-description">从模板到渲染函数的转换过程</p>
        </div>

        <div class="compiler-process">
          <div class="compiler-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>解析 (Parse)</h3>
              <p>将模板字符串转换为抽象语法树 (AST)</p>
              <div class="code-comparison">
                <div class="code-original">
                  <h4>模板代码</h4>
                  <pre><code>&lt;div id="app"&gt;
  &lt;h1&gt;&#123;&#123; title &#125;&#125;&lt;/h1&gt;
  &lt;button @click="increment"&gt;Click me&lt;/button&gt;
&lt;/div&gt;</code></pre>
                </div>
                <div class="code-ast">
                  <h4>AST 结构</h4>
                  <pre><code>{
  type: 'element',
  tag: 'div',
  attrs: [{ name: 'id', value: 'app' }],
  children: [
    { type: 'element', tag: 'h1', children: [...] },
    { type: 'element', tag: 'button', events: [...] }
  ]
}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="compiler-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>优化 (Optimize)</h3>
              <p>标记静态节点和静态根节点</p>
              <div class="optimization-benefits">
                <ul>
                  <li>跳过静态节点的Diff比较</li>
                  <li>减少不必要的重渲染</li>
                  <li>提升运行时性能</li>
                </ul>
              </div>
              <div class="code-block">
                <pre><code>function markStatic(node) {
  node.static = isStatic(node);
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      markStatic(node.children[i]);
    }
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="compiler-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>代码生成 (Codegen)</h3>
              <p>将AST转换为可执行的渲染函数</p>
              <div class="code-comparison">
                <div class="code-ast">
                  <h4>AST</h4>
                  <pre><code>{
  type: 'element',
  tag: 'div',
  children: [
    { type: 'text', expression: '_s(title)' }
  ]
}</code></pre>
                </div>
                <div class="code-result">
                  <h4>渲染函数</h4>
                  <pre><code>function render() {
  return h('div', [createTextVNode(_s(title))]);
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">✅</span> 总结与核心思想
          </h2>
          <p class="section-description">Vue.js 的设计哲学与优势</p>
        </div>

        <div class="summary-cards">
          <div class="summary-card">
            <div class="summary-icon">📊</div>
            <h3>数据驱动</h3>
            <p>通过数据变化自动更新视图，开发者只需关注数据状态</p>
          </div>

          <div class="summary-card">
            <div class="summary-icon">⚡</div>
            <h3>高效更新</h3>
            <p>虚拟DOM + 精细的Diff算法 = 最小化DOM操作</p>
          </div>

          <div class="summary-card">
            <div class="summary-icon">🧩</div>
            <h3>组件化</h3>
            <p>高内聚、低耦合的组件系统，支持复用和组合</p>
          </div>

          <div class="summary-card">
            <div class="summary-icon">🎯</div>
            <h3>渐进式框架</h3>
            <p>可根据需求逐步采用不同功能，灵活适应各种场景</p>
          </div>
        </div>

        <div class="performance-tips">
          <h3>性能优化要点</h3>
          <ul>
            <li>合理使用 key 属性，帮助 Diff 算法识别节点</li>
            <li>避免大型响应式对象，使用 shallowRef/shallowReactive</li>
            <li>合理拆分组件，利用组件级更新</li>
            <li>使用 v-once 标记静态内容</li>
            <li>对于大数据列表使用虚拟滚动</li>
            <li>合理使用计算属性和缓存</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="key-points">
        <h3>Vue 核心原理关键点：</h3>
        <ul>
          <li>响应式系统通过 Proxy 实现数据拦截</li>
          <li>依赖收集建立数据与组件的联系</li>
          <li>异步更新队列优化多次数据变更</li>
          <li>虚拟DOM作为真实DOM的轻量级表示</li>
          <li>Diff算法计算最小变更集</li>
          <li>Patch过程高效更新真实DOM</li>
        </ul>
      </div>
      <div class="footer-links">
        <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank">Vue 响应式原理</a>
        <a href="https://vuejs.org/guide/extras/rendering-mechanism.html" target="_blank">渲染机制</a>
        <a href="https://github.com/vuejs/core" target="_blank">Vue 源码</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --success-color: #2ec4b6;
  --warning-color: #ff9f1c;
  --danger-color: #e71d36;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-light: #e9ecef;
  --gray-medium: #adb5bd;
  --border-radius: 10px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.vue-principle-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: var(--dark-color);
  line-height: 1.6;
  background-color: #fff;
}

.header {
  text-align: center;
  padding: 50px 20px 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: var(--border-radius);
  margin: 20px 0 30px;
  box-shadow: var(--box-shadow);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: #000;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 300;
  }
}

.section {
  margin-bottom: 40px;
  background: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
}

.section-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray-light);
}

.section-title {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--secondary-color);

  .icon {
    font-size: 1.5em;
  }
}

.section-description {
  font-size: 1.1rem;
  color: var(--gray-medium);
  margin-top: 5px;
}

// 架构图
.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
  padding: 20px;
  background: var(--light-color);
  border-radius: var(--border-radius);
}

.layer {
  text-align: center;
  width: 100%;

  .layer-title {
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--primary-color);
  }
}

.module {
  background: white;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 15px;
  margin: 5px 0;
}

.module-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;

  .module {
    flex: 1;
    min-width: 150px;
    max-width: 250px;
  }
}

.arrow {
  font-size: 1.5rem;
  color: var(--primary-color);
  font-weight: bold;
  margin: 10px 0;
}

.architecture-explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.explanation-card {
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 20px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--secondary-color);
  }
}

// 流程步骤
.process-flow {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.process-step {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: var(--primary-color);
  }
}

.step-number {
  min-width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 5px;
}

.step-content {
  flex: 1;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }
}

.code-block {
  background: #f5f7ff;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin: 15px 0;
  border: 1px solid var(--gray-light);

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.5;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: var(--secondary-color);
    }
  }
}

.dependency-diagram,
.diff-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px 0;
  padding: 15px;
  background: var(--light-color);
  border-radius: var(--border-radius);

  .data,
  .dep,
  .watcher,
  .vdom {
    padding: 10px 15px;
    border-radius: 4px;
    font-weight: 500;
  }

  .data {
    background: var(--primary-color);
    color: white;
  }

  .dep {
    background: var(--success-color);
    color: white;
  }

  .watcher {
    background: var(--warning-color);
    color: var(--dark-color);
  }

  .vdom {
    background: white;
    border: 1px solid var(--gray-light);
    min-width: 150px;
    text-align: center;

    .node {
      padding: 8px;
      margin: 5px;
      border-radius: 4px;
      font-size: 0.9rem;
      background: var(--light-color);

      &.same {
        border-left: 3px solid var(--success-color);
      }

      &.changed {
        border-left: 3px solid var(--warning-color);
      }
    }
  }
}

// 响应式系统
.reactivity-system {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.reactivity-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 20px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--gray-light);
  }
}

.data-structures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;

  .structure {
    background: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;

    h4 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: var(--primary-color);
    }

    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.8rem;
      margin-bottom: 10px;
    }
  }
}

.track-trigger-flow {
  display: grid;
  grid-template-columns: repeat(7, auto);
  gap: 5px;
  margin-top: 15px;
  text-align: center;

  .step {
    padding: 10px;
    background: var(--light-color);
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    font-weight: bold;
  }
}

// 虚拟DOM部分
.vdom-renderer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.vdom-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 20px;
}

.diff-strategies {
  li {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--gray-light);

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    strong {
      color: var(--primary-color);
    }

    p {
      font-size: 0.95rem;
      color: #495057;
      margin-top: 5px;
    }
  }
}

.patch-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  .step {
    background: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;
    text-align: center;

    .step-title {
      font-weight: 600;
      margin-bottom: 5px;
      color: var(--primary-color);
    }

    p {
      font-size: 0.9rem;
      color: #666;
    }
  }
}

// 编译器部分
.compiler-process {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.compiler-step {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: var(--light-color);
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 15px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .code-original,
  .code-ast,
  .code-result {
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    border: 1px solid var(--gray-light);

    h4 {
      padding: 10px 15px;
      background: var(--primary-light);
      border-bottom: 1px solid var(--gray-light);
      font-size: 0.95rem;
    }

    pre {
      padding: 15px;
      overflow-x: auto;
      margin: 0;
      font-size: 0.85rem;
      line-height: 1.5;

      code {
        font-family: 'Fira Code', 'Consolas', monospace;
      }
    }
  }
}

.optimization-benefits {
  background: white;
  border-radius: var(--border-radius);
  padding: 15px;
  margin: 15px 0;
  border: 1px solid var(--gray-light);

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
}

// 总结部分
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.summary-card {
  text-align: center;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-color: var(--primary-color);
  }

  .summary-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--secondary-color);
  }
}

.performance-tips {
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 25px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
    text-align: center;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 10px;
      font-weight: 500;
    }
  }
}

// 页脚
.footer {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--gray-light);

  .key-points {
    background: var(--primary-light);
    border-radius: var(--border-radius);
    padding: 25px;
    margin-bottom: 25px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        font-weight: 500;
      }
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
      padding: 8px 15px;
      border-radius: 30px;
      border: 1px solid var(--primary-color);

      &:hover {
        background: var(--primary-color);
        color: white;
        text-decoration: none;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px;
  }

  .process-step,
  .compiler-step {
    flex-direction: column;
  }

  .track-trigger-flow {
    grid-template-columns: 1fr;

    .arrow {
      display: none;
    }
  }
}
</style>
