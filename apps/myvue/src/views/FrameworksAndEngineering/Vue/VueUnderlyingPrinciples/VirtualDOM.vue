<template>
  <div class="virtual-dom-container">
    <header class="header">
      <h1>Vue 虚拟 DOM 基本解析</h1>
      <p class="subtitle">理解现代前端框架的核心渲染机制</p>
    </header>

    <div class="content">
      <div class="intro-card">
        <div class="icon-box">💡</div>
        <div class="intro-content">
          <h2>什么是虚拟 DOM？</h2>
          <p>虚拟 DOM (Virtual DOM) 是 Vue、React 等现代前端框架的核心概念。它是一个轻量级的 JavaScript 对象，作为真实 DOM 的抽象表示。当应用状态变化时，框架会先在虚拟 DOM
            上进行操作，然后通过高效的比较算法计算出最小更新操作，最后应用到真实 DOM 上。</p>
        </div>
      </div>

      <div class="core-section">
        <div class="concept-card">
          <div class="concept-header">
            <div class="concept-icon">🧠</div>
            <h3>虚拟 DOM 的核心概念</h3>
          </div>
          <div class="concept-body">
            <ul>
              <li><strong>抽象表示</strong>：虚拟 DOM 是真实 DOM 结构的 JavaScript 对象表示</li>
              <li><strong>轻量级</strong>：操作虚拟 DOM 比操作真实 DOM 更快、更高效（不一定，因为虚拟 DOM 需要创建对象，真实 DOM 不需要）</li>
              <li><strong>Diff 算法</strong>：比较新旧虚拟 DOM 树，找出最小变更集</li>
              <li><strong>批量更新</strong>：将多个 DOM 操作合并为一次更新</li>
              <li><strong>跨平台</strong>：相同的虚拟 DOM 可以渲染到不同平台（Web、Native）</li>
            </ul>
          </div>
        </div>

        <div class="concept-card">
          <div class="concept-header">
            <div class="concept-icon">⚙️</div>
            <h3>虚拟 DOM 工作流程</h3>
          </div>
          <div class="concept-body">
            <div class="workflow">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">数据变更触发重新渲染</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">生成新的虚拟 DOM 树</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">比较新旧虚拟 DOM（Diff）</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">计算最小变更集</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">5</div>
                <div class="step-content">批量更新真实 DOM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation-section">
        <h2>简易虚拟 DOM 实现</h2>
        <div class="implementation-container">
          <div class="code-explanation">
            <p>下面是一个简化版的虚拟 DOM 实现，展示了其核心原理：</p>

            <div class="code-block">
              <pre><code>// 虚拟DOM节点类
class VNode {
  constructor(tag, props, children) {
    this.tag = tag;       // 标签名
    this.props = props;   // 属性对象
    this.children = children; // 子节点数组
  }
}

// 创建虚拟DOM
function createVNode(tag, props, children) {
  return new VNode(tag, props, children);
}

// 将虚拟DOM渲染为真实DOM
function render(vnode) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  const el = document.createElement(vnode.tag);

  // 设置属性
  for (const key in vnode.props) {
    el.setAttribute(key, vnode.props[key]);
  }

  // 渲染子节点
  vnode.children.forEach(child => {
    el.appendChild(render(child));
  });

  return el;
}

// Diff算法简化实现
function diff(oldVNode, newVNode) {
  // 如果节点类型不同，直接替换
  if (oldVNode.tag !== newVNode.tag) {
    return (parent) => {
      parent.replaceChild(render(newVNode), parent.childNodes[0]);
    };
  }

  const patches = [];

  // 比较属性差异
  const propsPatches = diffProps(oldVNode.props, newVNode.props);
  if (propsPatches) {
    patches.push((node) => {
      for (const key in propsPatches) {
        if (propsPatches[key] === null) {
          node.removeAttribute(key);
        } else {
          node.setAttribute(key, propsPatches[key]);
        }
      }
    });
  }

  // 比较子节点差异
  const childrenPatches = diffChildren(oldVNode.children, newVNode.children);
  childrenPatches.forEach((childPatch, index) => {
    if (childPatch) {
      patches.push((node) => {
        childPatch(node.childNodes[index]);
      });
    }
  });

  return (node) => {
    patches.forEach(patch => patch(node));
  };
}

// 应用差异更新
function patch(parent, patches) {
  patches(parent);
}

// 示例使用
const oldVTree = createVNode('div', { id: 'app' }, [
  createVNode('h1', { class: 'title' }, ['Hello World']),
  createVNode('p', {}, ['This is the old content'])
]);

const newVTree = createVNode('div', { id: 'app' }, [
  createVNode('h1', { class: 'title updated' }, ['Hello Vue']),
  createVNode('p', {}, ['This is updated content']),
  createVNode('p', {}, ['New paragraph added'])
]);

// 首次渲染
const app = document.getElementById('app');
app.appendChild(render(oldVTree));

// 数据更新后
setTimeout(() => {
  const patches = diff(oldVTree, newVTree);
  patch(app, patches);
}, 2000);</code></pre>
            </div>
          </div>

          <div class="implementation-details">
            <h3>关键实现细节</h3>
            <ul>
              <li><strong>VNode 类</strong>：表示虚拟 DOM 节点的基本结构</li>
              <li><strong>render 函数</strong>：将虚拟 DOM 转换为真实 DOM</li>
              <li><strong>diff 算法</strong>：比较新旧虚拟 DOM 树的差异</li>
              <li><strong>patch 函数</strong>：将差异应用到真实 DOM</li>
              <li><strong>批量更新</strong>：收集所有变更后一次性更新</li>
            </ul>

            <div class="performance-tip">
              <div class="tip-icon">🚀</div>
              <p>Vue 3 对虚拟 DOM 进行了重大优化，包括静态树提升、补丁标记和基于 Proxy 的响应式系统，使其比 Vue 2 快 2 倍。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2>虚拟 DOM 与真实 DOM 对比</h2>
        <div class="comparison-grid">
          <div class="comparison-header">对比维度</div>
          <div class="comparison-header">真实 DOM</div>
          <div class="comparison-header">虚拟 DOM</div>

          <div class="comparison-row">操作速度</div>
          <div class="negative">快（直接操作 DOM 速度快）</div>
          <div class="positive">慢（要先在内存中操作，然后渲染到 DOM）</div>

          <div class="comparison-row">更新影响</div>
          <div class="negative">高（频繁更新导致重绘回流）（也可以利用fragment来优化）</div>
          <div class="positive">低（批量更新，最小化操作）</div>

          <div class="comparison-row">内存占用</div>
          <div class="positive">低（浏览器原生对象）</div>
          <div class="negative">较高（需要额外存储虚拟树）</div>

          <div class="comparison-row">首次渲染</div>
          <div class="positive">快（直接创建）</div>
          <div class="negative">稍慢（需创建虚拟树）</div>

          <div class="comparison-row">复杂更新</div>
          <div class="negative">性能差（频繁操作）性能好（直接操作dom）</div>
          <div class="positive">性能好（Diff 算法优化）性能差(需要生成更多虚拟节点进行比较)</div>

          <div class="comparison-row">开发体验</div>
          <div class="negative">繁琐（手动管理更新）</div>
          <div class="positive">优秀（声明式编程）</div>

          <div class="comparison-row">跨平台能力</div>
          <div class="negative">仅限浏览器</div>
          <div class="positive">支持多平台（Web、Native）</div>
        </div>
      </div>

      <div class="pros-cons-section">
        <h2>虚拟 DOM 的优势与缺陷</h2>
        <div class="pros-cons-container">
          <div class="pros">
            <div class="section-header">
              <div class="icon">✅</div>
              <h3>优势</h3>
            </div>
            <ul>
              <li><strong>性能优化</strong>：减少不必要的 DOM 操作，避免频繁重绘和回流</li>
              <li><strong>声明式编程</strong>：开发者只需关注数据变化，无需手动操作 DOM</li>
              <li><strong>跨平台渲染</strong>：同一套虚拟 DOM 可渲染到 Web、移动端等不同平台</li>
              <li><strong>复杂更新优化</strong>：通过 Diff 算法智能计算最小更新集</li>
              <li><strong>开发效率提升</strong>：简化 UI 更新逻辑，提高开发效率</li>
            </ul>
          </div>

          <div class="cons">
            <div class="section-header">
              <div class="icon">⚠️</div>
              <h3>缺陷</h3>
            </div>
            <ul>
              <li><strong>内存占用</strong>：需要额外内存存储虚拟 DOM 树</li>
              <li><strong>首次渲染较慢</strong>：需要创建虚拟 DOM 树，然后渲染到真实 DOM</li>
              <li><strong>不适合简单场景</strong>：对于简单静态页面，虚拟 DOM 反而增加开销</li>
              <li><strong>过度依赖 Diff 算法</strong>：算法效率直接影响性能</li>
              <li><strong>学习曲线</strong>：需要理解其工作原理才能高效使用</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="vue3-optimizations">
        <h2>Vue 3 中的虚拟 DOM 优化</h2>
        <div class="optimizations-grid">
          <div class="optimization-card">
            <div class="optimization-icon">🏷️</div>
            <h3>静态树提升</h3>
            <p>检测和提升静态节点，在重新渲染时跳过整个子树</p>
          </div>

          <div class="optimization-card">
            <div class="optimization-icon">📌</div>
            <h3>静态属性提升</h3>
            <p>提升静态属性到渲染函数外部，避免重复创建</p>
          </div>

          <div class="optimization-card">
            <div class="optimization-icon">🎯</div>
            <h3>补丁标记</h3>
            <p>标记动态节点，在 Diff 过程中只检查有标记的部分</p>
          </div>

          <div class="optimization-card">
            <div class="optimization-icon">🧩</div>
            <h3>Fragment 支持</h3>
            <p>支持多根节点组件，减少不必要的包装元素</p>
          </div>

          <div class="optimization-card">
            <div class="optimization-icon">🔧</div>
            <h3>编译器优化</h3>
            <p>在编译阶段进行更多优化，生成更高效的渲染函数</p>
          </div>

          <div class="optimization-card">
            <div class="optimization-icon">⚡</div>
            <h3>基于 Proxy 的响应式</h3>
            <p>更细粒度的依赖追踪，减少不必要的组件重渲染</p>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2>最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🔑</div>
            <h3>合理使用 key</h3>
            <p>为 v-for 列表项提供唯一 key，帮助 Diff 算法识别节点</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🧱</div>
            <h3>避免深层嵌套</h3>
            <p>减少组件嵌套层级，降低 Diff 算法复杂度</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🚫</div>
            <h3>避免不必要的更新</h3>
            <p>使用 v-once 标记静态内容，避免重复渲染</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📦</div>
            <h3>组件拆分</h3>
            <p>将大组件拆分为小组件，减少渲染范围</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📊</div>
            <h3>性能监控</h3>
            <p>使用 Vue Devtools 监控组件渲染性能</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚙️</div>
            <h3>合理使用 v-show</h3>
            <p>频繁切换显示状态时使用 v-show 而非 v-if</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2023 Vue 虚拟 DOM 基础介绍 | 深入理解现代前端框架的核心渲染机制</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 虚拟DOM生命周期示例数据
const lifecycleSteps = ref([
  { step: "数据变更", description: "响应式数据发生变化" },
  { step: "触发更新", description: "组件重新渲染函数被调用" },
  { step: "生成VNode", description: "创建新的虚拟DOM树" },
  { step: "Diff比较", description: "比较新旧虚拟DOM树差异" },
  { step: "计算补丁", description: "计算最小DOM操作集合" },
  { step: "应用更新", description: "将变更应用到真实DOM" }
]);
</script>

<style scoped lang="less">
// 变量定义
@primary-color: #42b883;
@secondary-color: #35495e;
@accent-color: #ff6b6b;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e1e4e8;
@text-color: #2c3e50;
@light-text: #6c757d;
@success-color: #42b883;
@warning-color: #f39c12;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@radius: 10px;

// 基础样式
.virtual-dom-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #42b883, #35495e);
  border-radius: @radius;
  box-shadow: @shadow;
  color: white;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.content {
  padding: 0 20px;
}

.intro-card {
  display: flex;
  align-items: center;
  background: @card-bg;
  border-radius: @radius;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: @shadow;

  .icon-box {
    font-size: 3.5rem;
    margin-right: 30px;
    min-width: 80px;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    color: @secondary-color;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.15rem;
    line-height: 1.8;
  }
}

.core-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 50px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.concept-card {
  background: @card-bg;
  border-radius: @radius;
  overflow: hidden;
  box-shadow: @shadow;
}

.concept-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #42b883, #4fc08d);
  color: white;

  .concept-icon {
    font-size: 2rem;
    margin-right: 15px;
  }

  h3 {
    margin: 0;
    font-size: 1.6rem;
  }
}

.concept-body {
  padding: 25px;

  ul {
    padding-left: 25px;
    margin: 0;

    li {
      margin-bottom: 15px;
      font-size: 1.1rem;
      line-height: 1.7;

      &::marker {
        color: @primary-color;
      }
    }
  }
}

.workflow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.step {
  background: #e3f4ed;
  border-radius: 8px;
  padding: 15px;
  min-width: 150px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: @primary-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin: 0 auto 10px;
  }

  .step-content {
    font-weight: 500;
  }
}

.step-arrow {
  color: @primary-color;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    transform: rotate(90deg);
    margin: 5px 0;
  }
}

.implementation-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.implementation-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-explanation {
  background: @card-bg;
  border-radius: @radius;
  padding: 25px;
  box-shadow: @shadow;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 20px;
  }
}

.code-block {
  background: #2c3e50;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  overflow-x: auto;

  pre {
    margin: 0;
    color: #f8f8f2;
    font-size: 0.95rem;
    line-height: 1.5;
    white-space: pre;
  }
}

.implementation-details {
  background: @card-bg;
  border-radius: @radius;
  padding: 25px;
  box-shadow: @shadow;

  h3 {
    font-size: 1.3rem;
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 20px;
  }

  ul {
    padding-left: 25px;
    margin-bottom: 30px;

    li {
      margin-bottom: 12px;
      font-size: 1.05rem;
      line-height: 1.6;

      &::marker {
        color: @primary-color;
      }
    }
  }
}

.performance-tip {
  background: #e3f4ed;
  border-radius: 8px;
  padding: 20px;
  display: flex;

  .tip-icon {
    font-size: 2rem;
    margin-right: 15px;
    color: @primary-color;
  }

  p {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.7;
  }
}

.comparison-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: @radius;
  overflow: hidden;
  box-shadow: @shadow;

  >div {
    padding: 15px;
    border-bottom: 1px solid @border-color;

    &:nth-child(2n+1) {
      font-weight: 600;
      background: #f0f7f4;
    }
  }
}

.comparison-header {
  background: @primary-color;
  color: white;
  font-weight: bold;
  text-align: center;
}

.comparison-row {
  background: #f8f9fa;
}

.positive {
  background: #e3f4ed !important;
  position: relative;

  &::after {
    content: "✓";
    color: @success-color;
    font-weight: bold;
    position: absolute;
    right: 15px;
  }
}

.negative {
  background: #fdeded !important;
  position: relative;

  &::after {
    content: "⚠";
    color: @accent-color;
    font-weight: bold;
    position: absolute;
    right: 15px;
  }
}

.pros-cons-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.pros-cons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: @card-bg;
  border-radius: @radius;
  padding: 25px;
  box-shadow: @shadow;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
}

.pros {
  border-top: 4px solid @success-color;
}

.cons {
  border-top: 4px solid @accent-color;
}

ul {
  padding-left: 25px;
  margin: 0;

  li {
    margin-bottom: 15px;
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.vue3-optimizations {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.optimizations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.optimization-card {
  background: @card-bg;
  border-radius: @radius;
  padding: 25px;
  box-shadow: @shadow;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .optimization-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin: 0;
  }
}

.best-practices {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.practice-card {
  background: @card-bg;
  border-radius: @radius;
  padding: 25px;
  box-shadow: @shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .practice-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin: 0;
  }
}

.footer {
  text-align: center;
  padding: 30px 20px;
  margin-top: 50px;
  color: @light-text;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;
}

@media (max-width: 768px) {
  .intro-card {
    flex-direction: column;
    text-align: center;

    .icon-box {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .workflow {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
    margin: 5px 0;
  }
}
</style>
