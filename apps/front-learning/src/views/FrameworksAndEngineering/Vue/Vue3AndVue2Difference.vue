<template>
  <div class="vue-comparison">
    <header class="header">
      <h1>Vue2 与 Vue3 核心区别</h1>
      <p>基本解析两大版本的核心差异与升级亮点</p>
    </header>

    <div class="content">
      <div class="version-cards">
        <div class="version-card vue2">
          <div class="version-header">
            <div class="version-icon">2.x</div>
            <h2>Vue2</h2>
            <div class="version-year">2016-2023</div>
          </div>
          <div class="version-features">
            <div class="feature">Options API</div>
            <div class="feature">Flow 类型系统</div>
            <div class="feature">Object.defineProperty</div>
            <div class="feature">全量 DOM Diff</div>
          </div>
        </div>

        <div class="version-card vue3">
          <div class="version-header">
            <div class="version-icon">3.x</div>
            <h2>Vue3</h2>
            <div class="version-year">2020-至今</div>
          </div>
          <div class="version-features">
            <div class="feature">Composition API</div>
            <div class="feature">TypeScript 重构</div>
            <div class="feature">Proxy 响应式</div>
            <div class="feature">优化的 DOM Diff</div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2>底层实现差异</h2>
        <div class="comparison-grid">
          <div class="comparison-card">
            <h3>响应式系统</h3>
            <div class="comparison-details">
              <div class="vue2-detail">
                <h4>Vue2</h4>
                <p>基于 Object.defineProperty</p>
                <ul>
                  <li>无法检测对象属性的添加/删除</li>
                  <li>数组变异方法需要重写</li>
                  <li>需要递归遍历所有属性</li>
                </ul>
              </div>
              <div class="vue3-detail">
                <h4>Vue3</h4>
                <p>基于 Proxy 的响应式系统</p>
                <ul>
                  <li>支持动态添加/删除属性</li>
                  <li>原生支持数组变化检测</li>
                  <li>惰性代理，性能更好</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="comparison-card">
            <h3>虚拟 DOM 优化</h3>
            <div class="comparison-details">
              <div class="vue2-detail">
                <h4>Vue2</h4>
                <p>全量 Diff 算法</p>
                <ul>
                  <li>组件树全量比较</li>
                  <li>静态节点无优化</li>
                  <li>性能与模板大小线性相关</li>
                </ul>
              </div>
              <div class="vue3-detail">
                <h4>Vue3</h4>
                <p>编译时优化 + PatchFlag</p>
                <ul>
                  <li>静态提升 (HoistStatic)</li>
                  <li>PatchFlag 标记动态节点</li>
                  <li>树结构拍平 (Tree Flattening)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dom-diff-section">
        <h2>DOM-Diff 算法优化</h2>
        <div class="diff-explanation">
          <div class="diff-optimization">
            <h3>PatchFlag - 动态节点标记</h3>
            <div class="code-block">
              <pre><code>&lt;div&gt;
  &lt;span&gt;静态文本&lt;/span&gt;
  &lt;span :class="dynamicClass"&gt;{ dynamicText }&lt;/span&gt;
&lt;/div&gt;</code></pre>
            </div>
            <div class="diff-visual">
              <div class="vnode">
                <div class="vnode-header">VNode</div>
                <div class="vnode-props">
                  <div>patchFlag: 9 <span class="flag-desc">(TEXT + CLASS)</span></div>
                  <div>dynamicProps: ["class"]</div>
                </div>
              </div>
            </div>
            <p>Vue3 在编译阶段标记动态节点类型，Diff 时只需检查带标记的节点</p>
          </div>

          <div class="diff-optimization">
            <h3>树结构拍平 (Tree Flattening)</h3>
            <div class="tree-comparison">
              <div class="tree">
                <h4>Vue2 树结构</h4>
                <div class="node root">Root</div>
                <div class="children">
                  <div class="node">Static</div>
                  <div class="node">Static</div>
                  <div class="node dynamic">Dynamic</div>
                  <div class="node">Static</div>
                  <div class="node dynamic">Dynamic</div>
                </div>
              </div>
              <div class="arrow">→</div>
              <div class="tree">
                <h4>Vue3 拍平结构</h4>
                <div class="flat-nodes">
                  <div class="node dynamic">Dynamic</div>
                  <div class="node dynamic">Dynamic</div>
                </div>
              </div>
            </div>
            <p>Vue3 将动态节点提取到数组，跳过静态节点比较</p>
          </div>
        </div>
      </div>

      <div class="usage-section">
        <h2>使用方式对比</h2>
        <div class="api-comparison">
          <div class="api-card options-api">
            <h3>Options API (Vue2)</h3>
            <div class="code-block">
              <pre><code>export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    double() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('组件已挂载')
  }
}</code></pre>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>结构清晰，易于理解</li>
                  <li>适合简单组件</li>
                  <li>对新手友好</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>逻辑分散在不同选项</li>
                  <li>大型组件难以维护</li>
                  <li>代码复用困难</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="api-card composition-api">
            <h3>Composition API (Vue3)</h3>
            <div class="code-block">
              <pre><code>import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    onMounted(() => {
      console.log('组件已挂载')
    })

    return { count, double, increment }
  }
}</code></pre>
            </div>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>逻辑关注点集中</li>
                  <li>更好的代码组织</li>
                  <li>强大的代码复用能力</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>学习曲线较陡</li>
                  <li>需要理解响应式原理</li>
                  <li>小型组件可能过度复杂</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ecosystem-section">
        <h2>生态系统对比</h2>
        <div class="ecosystem-grid">
          <div class="ecosystem-card">
            <h3>官方工具</h3>
            <div class="tools">
              <div class="tool vue2">
                <div>Vue CLI</div>
                <div class="status">维护中</div>
              </div>
              <div class="tool vue3">
                <div>Vite</div>
                <div class="status">推荐</div>
              </div>
            </div>
          </div>

          <div class="ecosystem-card">
            <h3>状态管理</h3>
            <div class="tools">
              <div class="tool vue2">
                <div>Vuex 3</div>
                <div class="status">兼容</div>
              </div>
              <div class="tool vue3">
                <div>Vuex 4/Pinia</div>
                <div class="status">推荐</div>
              </div>
            </div>
          </div>

          <div class="ecosystem-card">
            <h3>路由</h3>
            <div class="tools">
              <div class="tool vue2">
                <div>Vue Router 3</div>
                <div class="status">兼容</div>
              </div>
              <div class="tool vue3">
                <div>Vue Router 4</div>
                <div class="status">推荐</div>
              </div>
            </div>
          </div>

          <div class="ecosystem-card">
            <h3>TypeScript</h3>
            <div class="tools">
              <div class="tool vue2">
                <div>支持有限</div>
                <div class="status">需额外配置</div>
              </div>
              <div class="tool vue3">
                <div>原生支持</div>
                <div class="status">完善类型系统</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="upgrade-section">
        <h2>升级建议</h2>
        <div class="upgrade-cards">
          <div class="upgrade-card">
            <h3>新项目</h3>
            <p>直接使用 Vue3 + Vite + Pinia + Vue Router 4</p>
            <div class="icon">🚀</div>
          </div>
          <div class="upgrade-card">
            <h3>中型项目</h3>
            <p>逐步迁移，使用 Vue3 兼容层</p>
            <div class="icon">🔄</div>
          </div>
          <div class="upgrade-card">
            <h3>大型项目</h3>
            <p>评估迁移成本，分模块迁移</p>
            <div class="icon">🧩</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 这里可以添加交互逻辑（如果需要）
</script>

<style lang="less" scoped>
.vue-comparison {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-top: 0;
  }
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
}

.version-cards {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.version-card {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &.vue2 {
    border-top: 4px solid #42b983;
  }

  &.vue3 {
    border-top: 4px solid #41b883;
  }
}

.version-header {
  padding: 1.5rem;
  text-align: center;
  color: white;
  position: relative;

  .vue2 & {
    background: linear-gradient(135deg, #42b983, #35495e);
  }

  .vue3 & {
    background: linear-gradient(135deg, #41b883, #34495e);
  }
}

.version-icon {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  .vue2 & {
    color: #42b983;
    border: 3px solid #42b983;
  }

  .vue3 & {
    color: #41b883;
    border: 3px solid #41b883;
  }
}

.version-features {
  padding: 1.5rem;

  .feature {
    padding: 0.8rem 1rem;
    margin-bottom: 0.8rem;
    border-radius: 8px;
    font-weight: 500;

    .vue2 & {
      background: #f0f9f4;
      border-left: 4px solid #42b983;
    }

    .vue3 & {
      background: #f0f9f4;
      border-left: 4px solid #41b883;
    }
  }
}

.comparison-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #34495e;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #4f46e5;
    text-align: center;
    font-size: 1.4rem;
  }
}

.comparison-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.vue2-detail,
.vue3-detail {
  padding: 1.2rem;
  border-radius: 8px;

  h4 {
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed #e2e8f0;
  }
}

.vue2-detail {
  background: #f0f9f4;
  border-left: 3px solid #42b983;
}

.vue3-detail {
  background: #f0f9f4;
  border-left: 3px solid #41b883;
}

.dom-diff-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #34495e;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.diff-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.diff-optimization {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: #4f46e5;
    font-size: 1.3rem;
  }
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 1.2rem;
  margin: 1.2rem 0;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.diff-visual {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.vnode {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  width: 240px;

  .vnode-header {
    background: #4f46e5;
    color: white;
    padding: 0.8rem;
    font-weight: 500;
    text-align: center;
  }

  .vnode-props {
    padding: 1rem;
    background: white;

    div {
      padding: 0.5rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
  }
}

.flag-desc {
  color: #4f46e5;
  font-size: 0.8rem;
}

.tree-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
}

.tree {
  text-align: center;

  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4b5563;
  }
}

.node {
  padding: 0.8rem;
  margin: 0.5rem auto;
  border-radius: 6px;
  width: 120px;

  &.root {
    background: #4f46e5;
    color: white;
    font-weight: 500;
  }

  &.static {
    background: #e2e8f0;
    color: #4b5563;
  }

  &.dynamic {
    background: #ff6b6b;
    color: white;
    font-weight: 500;
  }
}

.children {
  margin-top: 1rem;
}

.flat-nodes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.arrow {
  font-size: 2rem;
  color: #94a3b8;
}

.usage-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #34495e;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.api-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.api-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    text-align: center;
    color: #4f46e5;
    font-size: 1.4rem;
  }

  &.options-api {
    border-top: 3px solid #42b983;
  }

  &.composition-api {
    border-top: 3px solid #41b883;
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;

  .pros,
  .cons {
    padding: 1rem;
    border-radius: 8px;

    h4 {
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed #e2e8f0;
    }
  }

  .pros {
    background: #f0fdf4;
    border-left: 3px solid #22c55e;
  }

  .cons {
    background: #fef2f2;
    border-left: 3px solid #ef4444;
  }
}

.ecosystem-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #34495e;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.ecosystem-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    text-align: center;
    color: #4f46e5;
  }
}

.tools {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.2rem;
}

.tool {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;

  .vue2 & {
    background: #f0f9f4;
    border: 1px solid #42b983;
  }

  .vue3 & {
    background: #f0f9f4;
    border: 1px solid #41b883;
  }
}

.status {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  display: inline-block;
  margin-top: 0.5rem;

  .vue2 & {
    background: #e2e8f0;
    color: #4b5563;
  }

  .vue3 & {
    background: #4f46e5;
    color: white;
  }
}

.upgrade-section {
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #34495e;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.upgrade-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.upgrade-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-top: 0;
    color: #4f46e5;
  }

  p {
    margin-bottom: 1.5rem;
  }

  .icon {
    font-size: 3rem;
    margin-top: 1rem;
  }

  &:nth-child(1) {
    border-top: 4px solid #22c55e;
  }

  &:nth-child(2) {
    border-top: 4px solid #f59e0b;
  }

  &:nth-child(3) {
    border-top: 4px solid #6366f1;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 2rem;
  }
}
</style>
