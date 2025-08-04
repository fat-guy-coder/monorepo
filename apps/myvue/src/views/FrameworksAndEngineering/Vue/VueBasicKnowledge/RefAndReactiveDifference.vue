<template>
  <div class="ref-reactive-container">
    <header class="header">
      <h1>Vue3 <span class="ref-text">ref</span> vs <span class="reactive-text">reactive</span></h1>
      <p class="subtitle">响应式 API 核心概念基础介绍与最佳实践</p>
    </header>

    <div class="content">
      <section class="card intro">
        <div class="intro-content">
          <div class="intro-text">
            <h2>响应式编程核心</h2>
            <p>Vue3 的 Composition API 引入了 <code>ref</code> 和 <code>reactive</code> 作为创建响应式数据的主要方式。理解它们的区别对于编写高效、可维护的 Vue
              应用至关重要。</p>

            <div class="core-concepts">
              <div class="concept ref-concept">
                <div class="icon">📌</div>
                <h3>ref</h3>
                <p>用于创建<strong>基本类型</strong>和<strong>对象引用</strong>的响应式包装器</p>
              </div>
              <div class="concept reactive-concept">
                <div class="icon">🔄</div>
                <h3>reactive</h3>
                <p>用于创建<strong>对象</strong>和<strong>数组</strong>的深层响应式代理</p>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="reactivity-flow">
              <div class="data-source">数据源</div>
              <div class="arrow">→</div>
              <div class="reactivity-wrapper">
                <div class="wrapper-type">ref/reactive</div>
                <div class="wrapper-desc">响应式包装</div>
              </div>
              <div class="arrow">→</div>
              <div class="vue-component">Vue组件</div>
              <div class="arrow">→</div>
              <div class="dom-update">DOM更新</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card usage">
        <h2>基础用法对比</h2>
        <div class="usage-comparison">
          <div class="ref-usage">
            <h3>ref 使用方式</h3>
            <pre class="code-block">import { ref } from 'vue';

// 基本类型
const count = ref(0);

// 对象类型
const user = ref({
  name: '张三',
  age: 30
});

// 访问值
console.log(count.value); // 0

// 修改值
count.value = 1;
user.value.age = 31;</pre>

            <div class="usage-points">
              <div class="point">
                <div class="point-icon">❗</div>
                <p>访问/修改时需要 <code>.value</code></p>
              </div>
              <div class="point">
                <div class="point-icon">🔄</div>
                <p>模板中自动解包，无需 <code>.value</code></p>
              </div>
              <div class="point">
                <div class="point-icon">📦</div>
                <p>可以包装任何值类型</p>
              </div>
            </div>
          </div>

          <div class="reactive-usage">
            <h3>reactive 使用方式</h3>
            <pre class="code-block">import { reactive } from 'vue';

// 只能用于对象类型
const state = reactive({
  count: 0,
  user: {
    name: '李四',
    age: 25
  }
});

// 直接访问属性
console.log(state.count); // 0

// 直接修改属性
state.count = 1;
state.user.age = 26;</pre>

            <div class="usage-points">
              <div class="point">
                <div class="point-icon">❗</div>
                <p>只能用于<strong>对象</strong>类型</p>
              </div>
              <div class="point">
                <div class="point-icon">🔍</div>
                <p>深层响应式，嵌套对象也是响应式的</p>
              </div>
              <div class="point">
                <div class="point-icon">⚠️</div>
                <p>解构会失去响应性</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card principles">
        <h2>实现原理对比</h2>
        <div class="principles-content">
          <div class="principle-diagram">
            <div class="ref-principle">
              <div class="title">ref 实现原理</div>
              <div class="diagram">
                <div class="ref-wrapper">
                  <div class="label">Ref 对象</div>
                  <div class="value-box">
                    <div class="property">value: </div>
                    <div class="actual-value">原始值/对象</div>
                  </div>
                </div>
                <div class="getter-setter">
                  <div class="getter">get value()</div>
                  <div class="setter">set value()</div>
                </div>
                <div class="track-trigger">
                  <div class="track">track()</div>
                  <div class="trigger">trigger()</div>
                </div>
              </div>
              <p class="principle-desc">通过 getter/setter 拦截 <code>.value</code> 操作，实现依赖收集和触发更新</p>
            </div>

            <div class="vs">VS</div>

            <div class="reactive-principle">
              <div class="title">reactive 实现原理</div>
              <div class="diagram">
                <div class="proxy-wrapper">
                  <div class="label">Proxy 对象</div>
                  <div class="original-object">原始对象</div>
                </div>
                <div class="proxy-handlers">
                  <div class="handler">get()</div>
                  <div class="handler">set()</div>
                  <div class="handler">deleteProperty()</div>
                </div>
                <div class="track-trigger">
                  <div class="track">track()</div>
                  <div class="trigger">trigger()</div>
                </div>
              </div>
              <p class="principle-desc">使用 ES6 Proxy 代理整个对象，拦截所有属性操作</p>
            </div>
          </div>

          <div class="technical-diff">
            <h3>技术实现差异</h3>
            <div class="diff-table">
              <div class="diff-header">
                <div class="header-item">特性</div>
                <div class="header-item">ref</div>
                <div class="header-item">reactive</div>
              </div>
              <div class="diff-row">
                <div class="diff-property">实现方式</div>
                <div class="diff-value">Getter/Setter</div>
                <div class="diff-value">Proxy</div>
              </div>
              <div class="diff-row">
                <div class="diff-property">支持类型</div>
                <div class="diff-value">所有类型</div>
                <div class="diff-value">对象/数组/Map/Set</div>
              </div>
              <div class="diff-row">
                <div class="diff-property">深层响应</div>
                <div class="diff-value">对象属性自动转换</div>
                <div class="diff-value">默认深度响应</div>
              </div>
              <div class="diff-row">
                <div class="diff-property">TS类型支持</div>
                <div class="diff-value">Ref&lt;T&gt;</div>
                <div class="diff-value">需使用泛型</div>
              </div>
              <div class="diff-row">
                <div class="diff-property">解构响应性</div>
                <div class="diff-value">保留（使用.value）</div>
                <div class="diff-value">丢失（需使用toRefs）</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card scenarios">
        <h2>使用场景指南</h2>
        <div class="scenarios-content">
          <div class="ref-scenarios">
            <h3>✅ 使用 ref 的场景</h3>
            <div class="scenario-card">
              <div class="scenario-icon">🔢</div>
              <h4>基本类型值</h4>
              <p>字符串、数字、布尔值等</p>
              <pre class="code-block">const count = ref(0);
const message = ref('Hello');</pre>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">📌</div>
              <h4>DOM 元素引用</h4>
              <p>结合模板 ref 使用</p>
              <pre class="code-block">const inputRef = ref(null);

&lt;input ref="inputRef" /&gt;</pre>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <h4>组件状态切换</h4>
              <p>控制可见性、激活状态等</p>
              <pre class="code-block">const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}</pre>
            </div>
          </div>

          <div class="reactive-scenarios">
            <h3>✅ 使用 reactive 的场景</h3>
            <div class="scenario-card">
              <div class="scenario-icon">🧾</div>
              <h4>复杂表单状态</h4>
              <p>包含多个字段的表单对象</p>
              <pre class="code-block">const form = reactive({
  name: '',
  email: '',
  address: {
    city: '',
    zip: ''
  }
});</pre>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🛒</div>
              <h4>购物车/复杂对象</h4>
              <p>多层嵌套的数据结构</p>
              <pre class="code-block">const cart = reactive({
  items: [],
  total: 0,
  discount: 0
});</pre>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h4>全局状态管理</h4>
              <p>替代 Vuex 的轻量级方案</p>
              <pre class="code-block">const store = reactive({
  user: null,
  settings: {},
  theme: 'light'
});

// 在组件中直接使用 store.user</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="card best-practices">
        <h2>最佳实践与常见问题</h2>
        <div class="practices-content">
          <div class="practices">
            <div class="practice">
              <div class="practice-icon">1️⃣</div>
              <h3>组合使用</h3>
              <p>在 reactive 对象中使用 ref：</p>
              <pre class="code-block">const state = reactive({
  count: ref(0),
  user: ref({ name: '张三' })
});

// 访问
console.log(state.count.value); // 需要 .value</pre>
            </div>
            <div class="practice">
              <div class="practice-icon">2️⃣</div>
              <h3>解构响应性</h3>
              <p>使用 <code>toRefs</code> 保持响应性：</p>
              <pre class="code-block">import { reactive, toRefs } from 'vue';

const state = reactive({ count: 0, name: '张三' });
const { count, name } = toRefs(state);

// 现在 count 和 name 都是 ref
count.value++; // 会更新原始状态</pre>
            </div>
            <div class="practice">
              <div class="practice-icon">3️⃣</div>
              <h3>类型推导</h3>
              <p>使用 TypeScript 增强类型安全：</p>
              <pre class="code-block">interface User {
  id: number;
  name: string;
}

// ref 类型
const user = ref&lt;User&gt;({ id: 1, name: '张三' });

// reactive 类型
const state = reactive&lt;{
  loading: boolean;
  data: User[]
}>({
  loading: false,
  data: []
});</pre>
            </div>
          </div>

          <div class="common-issues">
            <h3>⚠️ 常见问题与解决方案</h3>
            <div class="issue">
              <div class="issue-icon">❌</div>
              <p><strong>问题：</strong> reactive 对象解构后失去响应性</p>
              <p><strong>解决：</strong> 使用 <code>toRefs</code> 转换为 ref 集合</p>
            </div>
            <div class="issue">
              <div class="issue-icon">❌</div>
              <p><strong>问题：</strong> 忘记 ref 的 .value 访问</p>
              <p><strong>解决：</strong> 使用 Volar 扩展获得自动补全和提示</p>
            </div>
            <div class="issue">
              <div class="issue-icon">❌</div>
              <p><strong>问题：</strong> 重新赋值 reactive 对象失去响应性</p>
              <p><strong>解决：</strong> 避免整个对象替换，修改属性或使用 Object.assign</p>
            </div>
            <div class="issue">
              <div class="issue-icon">❌</div>
              <p><strong>问题：</strong> 在模板中使用 ref 的 .value</p>
              <p><strong>解决：</strong> 模板中会自动解包，无需 .value</p>
            </div>
          </div>
        </div>
      </section>

      <section class="card summary">
        <h2>总结与选择指南</h2>
        <div class="summary-content">
          <div class="decision-tree">
            <h3>选择流程图</h3>
            <div class="tree">
              <div class="node start">开始</div>
              <div class="arrow">↓</div>
              <div class="node question">处理基本类型？</div>
              <div class="branch">
                <div class="branch-yes">是 → 使用 ref</div>
                <div class="branch-no">否</div>
              </div>
              <div class="arrow">↓</div>
              <div class="node question">需要整个对象响应？</div>
              <div class="branch">
                <div class="branch-yes">是 → 使用 reactive</div>
                <div class="branch-no">否 → 使用 ref</div>
              </div>
              <div class="arrow">↓</div>
              <div class="node question">需要解构使用？</div>
              <div class="branch">
                <div class="branch-yes">是 → 使用 ref + toRefs</div>
                <div class="branch-no">否 → 直接使用</div>
              </div>
            </div>
          </div>

          <div class="key-takeaways">
            <h3>核心要点总结</h3>
            <ul>
              <li><strong>ref</strong> - 通用响应式引用，适用于所有数据类型</li>
              <li><strong>reactive</strong> - 对象代理，适用于复杂数据结构</li>
              <li>模板中 ref 自动解包，无需 <code>.value</code></li>
              <li>reactive 解构会失去响应性，使用 <code>toRefs</code> 解决</li>
              <li>两者底层都使用 Vue 的响应式系统，但实现方式不同</li>
              <li>大型项目推荐统一使用 ref 保持一致性</li>
            </ul>

            <div class="final-tip">
              <div class="tip-icon">💡</div>
              <p>在 Vue 3.3+ 中，可以使用 <code>reactivity transform</code> 语法糖，让 ref 使用更简洁</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Vue3 响应式编程 | Composition API 核心概念</p>
      <div class="links">
        <a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html" target="_blank">官方文档</a>
        <a href="https://vuejs.org/api/reactivity-core.html" target="_blank">API 参考</a>
        <a href="https://github.com/vuejs/core" target="_blank">GitHub 仓库</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 示例响应式数据
const activeTab = ref('usage');

onMounted(() => {
  console.log('ref 与 reactive 对比组件已挂载');
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.ref-reactive-container {
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

    .ref-text {
      color: #3b82f6;
    }

    .reactive-text {
      color: #8b5cf6;
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

      code {
        background: #e2e8f0;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
      }
    }

    .core-concepts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 30px;

      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }

      .concept {
        background: white;
        border-radius: 10px;
        padding: 25px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        border-top: 4px solid;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        p {
          color: #64748b;
          margin-bottom: 0;

          strong {
            color: #1e293b;
          }
        }
      }

      .ref-concept {
        border-top-color: #3b82f6;

        h3 {
          color: #3b82f6;
        }
      }

      .reactive-concept {
        border-top-color: #8b5cf6;

        h3 {
          color: #8b5cf6;
        }
      }
    }
  }

  .intro-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .reactivity-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 30px 20px;

    &>div {
      padding: 15px 25px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
    }

    .data-source {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .reactivity-wrapper {
      background: #ede9fe;
      color: #7c3aed;
    }

    .vue-component {
      background: #dcfce7;
      color: #166534;
    }

    .dom-update {
      background: #ffedd5;
      color: #9a3412;
    }

    .arrow {
      font-size: 1.5rem;
      color: #94a3b8;
    }
  }
}

.usage {
  .usage-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .ref-usage,
  .reactive-usage {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      position: relative;
      padding-left: 30px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 3px;
        border-radius: 2px;
      }
    }
  }

  .ref-usage {
    border-top: 4px solid #3b82f6;

    h3 {
      color: #3b82f6;

      &::before {
        background: #3b82f6;
      }
    }
  }

  .reactive-usage {
    border-top: 4px solid #8b5cf6;

    h3 {
      color: #8b5cf6;

      &::before {
        background: #8b5cf6;
      }
    }
  }

  .usage-points {
    margin-top: 20px;

    .point {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 6px;

      .point-icon {
        font-size: 1.2rem;
      }

      p {
        color: #475569;

        code {
          background: #e2e8f0;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
        }
      }
    }
  }
}

.principles {
  .principles-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .principle-diagram {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 30px;
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;

      .vs {
        margin: 20px 0;
        text-align: center;
      }
    }

    .ref-principle,
    .reactive-principle {
      background: #f8fafc;
      border-radius: 10px;
      padding: 25px;
      border: 1px solid #e2e8f0;
    }

    .ref-principle {
      border-top: 4px solid #3b82f6;
    }

    .reactive-principle {
      border-top: 4px solid #8b5cf6;
    }

    .title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
    }

    .vs {
      font-weight: bold;
      color: #64748b;
      font-size: 1.5rem;
    }

    .diagram {
      background: white;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e2e8f0;
      position: relative;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &>div {
        margin: 10px 0;
      }
    }

    .ref-wrapper,
    .proxy-wrapper {
      background: #f1f5f9;
      padding: 15px;
      border-radius: 6px;
      border: 1px dashed #cbd5e1;
    }

    .getter-setter,
    .proxy-handlers {
      display: flex;
      justify-content: space-around;
      margin: 15px 0;

      &>div {
        background: #e0f2fe;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
      }
    }

    .track-trigger {
      display: flex;
      justify-content: space-around;

      &>div {
        background: #dcfce7;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
      }
    }

    .principle-desc {
      margin-top: 20px;
      text-align: center;
      color: #64748b;
      font-style: italic;
    }
  }

  .technical-diff {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }

  .diff-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .diff-header,
    .diff-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .diff-header {
      background: #f1f5f9;
      font-weight: 600;
      border-bottom: 1px solid #e2e8f0;
    }

    .diff-row {
      &:nth-child(even) {
        background: #f8fafc;
      }

      &:hover {
        background: #f0f7ff;
      }
    }

    .header-item,
    .diff-property,
    .diff-value {
      padding: 15px;
    }

    .diff-property {
      font-weight: 500;
      color: #1e293b;
    }

    .diff-value {
      color: #475569;
    }
  }
}

.scenarios {
  .scenarios-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .ref-scenarios,
  .reactive-scenarios {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      padding-left: 30px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 3px;
        border-radius: 2px;
      }
    }
  }

  .ref-scenarios {
    h3 {
      color: #3b82f6;

      &::before {
        background: #3b82f6;
      }
    }
  }

  .reactive-scenarios {
    h3 {
      color: #8b5cf6;

      &::before {
        background: #8b5cf6;
      }
    }
  }

  .scenario-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    .scenario-icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #1e293b;
    }

    p {
      color: #64748b;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
  }
}

.best-practices {
  .practices-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .practices {
    .practice {
      background: white;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 20px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      }

      .practice-icon {
        font-size: 1.5rem;
        margin-bottom: 10px;
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
  }

  .common-issues {
    background: #fffbeb;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #fde68a;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #b45309;
      position: relative;
      padding-left: 30px;

      &::before {
        content: '⚠️';
        position: absolute;
        left: 0;
      }
    }

    .issue {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #fde68a;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .issue-icon {
        font-size: 1.5rem;
        color: #f59e0b;
      }

      p {
        color: #78350f;

        strong {
          color: #b45309;
        }
      }
    }
  }
}

.summary {
  .summary-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .decision-tree {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #dbeafe;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
      text-align: center;
    }

    .tree {
      display: flex;
      flex-direction: column;
      align-items: center;

      .node {
        background: white;
        border-radius: 8px;
        padding: 15px 30px;
        margin: 10px 0;
        border: 2px solid;
        font-weight: 600;
        text-align: center;
        min-width: 200px;
      }

      .start {
        border-color: #10b981;
        background: #dcfce7;
      }

      .question {
        border-color: #3b82f6;
        background: #dbeafe;
      }

      .arrow {
        font-size: 1.5rem;
        color: #94a3b8;
      }

      .branch {
        display: flex;
        gap: 20px;
        margin: 10px 0;

        &>div {
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
        }

        .branch-yes {
          background: #dcfce7;
          color: #166534;
        }

        .branch-no {
          background: #fee2e2;
          color: #b91c1c;
        }
      }
    }
  }

  .key-takeaways {
    background: #f0fdf4;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #bbf7d0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }

    ul {
      list-style: none;
      margin-bottom: 20px;

      li {
        margin-bottom: 12px;
        padding-left: 30px;
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 15px;
          color: #10b981;
          font-weight: bold;
        }

        strong {
          color: #1d4ed8;
        }
      }
    }

    .final-tip {
      background: white;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      gap: 15px;
      align-items: center;
      border-left: 4px solid #10b981;

      .tip-icon {
        font-size: 1.8rem;
        color: #10b981;
      }

      p {
        color: #475569;
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
}
</style>
