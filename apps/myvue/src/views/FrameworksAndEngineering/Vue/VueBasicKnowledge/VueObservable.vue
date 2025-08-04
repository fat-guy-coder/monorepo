<template>
  <div class="observable-container">
    <div class="header">
      <h1><i class="icon"></i> Vue Observable 基本指南</h1>
      <p class="subtitle">掌握响应式状态管理的基础原理与应用</p>
    </div>

    <div class="quick-summary">
      <div class="summary-card">
        <div class="icon-box reactive">
          <i class="icon">🔄</i>
        </div>
        <h3>响应式核心</h3>
        <p>Vue Observable 是 Vue 响应式系统的底层实现</p>
      </div>
      <div class="summary-card">
        <div class="icon-box scope">
          <i class="icon">📦</i>
        </div>
        <h3>小型状态管理</h3>
        <p>适合组件间共享的轻量状态管理方案</p>
      </div>
      <div class="summary-card">
        <div class="icon-box utility">
          <i class="icon">🧩</i>
        </div>
        <h3>工具函数</h3>
        <p>Vue.observable(object) 创建响应式对象</p>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon">🔍</i> 什么是 Vue Observable？</h2>
      </div>

      <div class="definition">
        <p><strong>Vue.observable()</strong> 是 Vue 提供的一个 API，用于将一个普通 JavaScript 对象转换为响应式对象。它是 Vue 响应式系统的核心实现。</p>

        <div class="core-concept">
          <h3>核心概念：</h3>
          <div class="concept-grid">
            <div class="concept">
              <div class="concept-icon">🔄</div>
              <div>
                <h4>响应式转换</h4>
                <p>将普通对象转为可观察对象</p>
              </div>
            </div>
            <div class="concept">
              <div class="concept-icon">📡</div>
              <div>
                <h4>依赖追踪</h4>
                <p>自动追踪属性访问的依赖关系</p>
              </div>
            </div>
            <div class="concept">
              <div class="concept-icon">🚀</div>
              <div>
                <h4>变更通知</h4>
                <p>属性变更时自动通知所有依赖项</p>
              </div>
            </div>
          </div>
        </div>

        <div class="technical-details">
          <h3>技术实现：</h3>
          <div class="details-grid">
            <div class="detail-card">
              <h4>基于 ES5 Getter/Setter</h4>
              <p>使用 Object.defineProperty 拦截属性访问</p>
            </div>
            <div class="detail-card">
              <h4>发布-订阅模式</h4>
              <p>Watcher 订阅 Dep，Dep 通知变更</p>
            </div>
            <div class="detail-card">
              <h4>递归响应式</h4>
              <p>嵌套对象也会被转换为响应式</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon">💻</i> 如何使用 Vue Observable？</h2>
      </div>

      <div class="usage">
        <div class="basic-usage">
          <h3>基础用法</h3>
          <pre class="code-snippet">// 引入 Vue 的 observable 函数
import { observable } from 'vue';

// 创建响应式对象
const state = observable({
  count: 0,
  message: 'Hello Vue!'
});

// 在组件中使用
export default {
  setup() {
    // 响应式更新视图
    const increment = () => {
      state.count++;
    };

    return {
      state,
      increment
    };
  }
}</pre>
        </div>

        <div class="advanced-usage">
          <h3>高级用法</h3>
          <div class="advanced-grid">
            <div class="usage-card">
              <h4>嵌套对象</h4>
              <pre class="code-snippet">const state = observable({
  user: {
    name: 'Alice',
    profile: {
      age: 30,
      job: 'Developer'
    }
  }
});

// 深层嵌套属性也是响应式的
state.user.profile.age = 31;</pre>
            </div>

            <div class="usage-card">
              <h4>数组处理</h4>
              <pre class="code-snippet">const todos = observable({
  items: ['Task 1', 'Task 2']
});

// 数组变更方法也是响应式的
todos.items.push('Task 3');
todos.items.splice(0, 1);</pre>
            </div>

            <div class="usage-card">
              <h4>跨组件共享</h4>
              <pre class="code-snippet">// store.js
import { observable } from 'vue';

export const store = observable({
  theme: 'light',
  toggleTheme() {
    this.theme = this.theme === 'light'
      ? 'dark' : 'light';
  }
});

// 在任何组件中导入使用
import { store } from './store';</pre>
            </div>

            <div class="usage-card">
              <h4>与 Composition API 结合</h4>
              <pre class="code-snippet">import { observable, watch } from 'vue';

const state = observable({ count: 0 });

watch(() => state.count, (newVal) => {
  console.log(`Count changed to ${newVal}`);
});

// 在组件中使用
export default {
  setup() {
    return { state };
  }
}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon">📌</i> 使用场景与最佳实践</h2>
      </div>

      <div class="use-cases">
        <div class="case">
          <div class="case-header">
            <div class="case-icon">✅</div>
            <h3>小型应用状态管理</h3>
          </div>
          <p>当应用较小不需要引入 Vuex 时，observable 是完美的轻量级替代方案。</p>
          <div class="recommendation">
            <strong>推荐：</strong> 用于管理主题设置、用户偏好、全局通知等简单状态
          </div>
        </div>

        <div class="case">
          <div class="case-header">
            <div class="case-icon">✅</div>
            <h3>跨组件状态共享</h3>
          </div>
          <p>在多个组件间共享状态而无需通过 props 逐层传递。</p>
          <div class="recommendation">
            <strong>推荐：</strong> 共享模态框状态、表单数据、购物车内容等
          </div>
        </div>

        <div class="case">
          <div class="case-header">
            <div class="case-icon">✅</div>
            <h3>组件逻辑复用</h3>
          </div>
          <p>创建可复用的响应式逻辑单元，类似自定义 Hook。</p>
          <div class="recommendation">
            <strong>推荐：</strong> 创建计时器、表单验证、数据过滤等可复用逻辑
          </div>
        </div>

        <div class="case">
          <div class="case-header">
            <div class="case-icon">⚠️</div>
            <h3>不适用场景</h3>
          </div>
          <p>observable 并非适用于所有状态管理需求。</p>
          <div class="recommendation">
            <strong>避免：</strong>
            <ul>
              <li>大型复杂应用状态管理</li>
              <li>需要严格状态变更追踪的场景</li>
              <li>需要时间旅行调试的应用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon">⚖️</i> Observable 与 Vuex 对比</h2>
      </div>

      <div class="comparison">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>Vue Observable</th>
              <th>Vuex</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>复杂度</strong></td>
              <td>简单轻量</td>
              <td>较复杂</td>
            </tr>
            <tr>
              <td><strong>学习曲线</strong></td>
              <td>低</td>
              <td>中高</td>
            </tr>
            <tr>
              <td><strong>适用场景</strong></td>
              <td>小型项目/简单状态</td>
              <td>中大型项目/复杂状态</td>
            </tr>
            <tr>
              <td><strong>DevTools 支持</strong></td>
              <td>有限</td>
              <td>完整支持</td>
            </tr>
            <tr>
              <td><strong>代码量</strong></td>
              <td>极少</td>
              <td>较多</td>
            </tr>
            <tr>
              <td><strong>状态变更追踪</strong></td>
              <td>弱</td>
              <td>强</td>
            </tr>
            <tr>
              <td><strong>模块化</strong></td>
              <td>手动实现</td>
              <td>内置支持</td>
            </tr>
          </tbody>
        </table>

        <div class="decision-guide">
          <h3>选择指南：</h3>
          <div class="guide">
            <div class="guide-item observable">
              <h4>选择 Observable 当：</h4>
              <ul>
                <li>小型应用无需复杂状态管理</li>
                <li>只需要简单共享少量状态</li>
                <li>项目简单希望减少依赖</li>
                <li>快速原型开发</li>
              </ul>
            </div>
            <div class="guide-item vuex">
              <h4>选择 Vuex 当：</h4>
              <ul>
                <li>中大型复杂应用</li>
                <li>需要严格的状态变更追踪</li>
                <li>需要时间旅行调试功能</li>
                <li>需要模块化状态管理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon">📝</i> 最佳实践与注意事项</h2>
      </div>

      <div class="best-practices">
        <div class="practice">
          <div class="practice-icon">1</div>
          <div>
            <h3>模块化组织</h3>
            <p>将相关状态分组到不同文件中保持代码整洁</p>
            <pre class="code-snippet">// store/
├── user.js      // 用户相关状态
├── ui.js        // UI 相关状态
└── cart.js      // 购物车状态</pre>
          </div>
        </div>

        <div class="practice">
          <div class="practice-icon">2</div>
          <div>
            <h3>避免直接修改嵌套属性</h3>
            <p>使用 Object.assign 或扩展运算符确保响应性</p>
            <pre class="code-snippet">// 不推荐  ❌
state.user.profile.age = 31;

// 推荐 ✅
state.user = {
  ...state.user,
  profile: {
    ...state.user.profile,
    age: 31
  }
};</pre>
          </div>
        </div>

        <div class="practice">
          <div class="practice-icon">3</div>
          <div>
            <h3>使用计算值</h3>
            <p>结合 computed 属性派生复杂状态</p>
            <pre class="code-snippet">import { computed } from 'vue';

const state = observable({
  items: ['Apple', 'Banana', 'Orange']
});

// 计算属性
const itemCount = computed(() => state.items.length);</pre>
          </div>
        </div>

        <div class="practice">
          <div class="practice-icon">4</div>
          <div>
            <h3>性能优化</h3>
            <p>避免在大型对象上使用 observable</p>
            <pre class="code-snippet">// 不推荐  ❌ - 大型数据集
const bigData = observable({ ...10,000 records... });

// 推荐 ✅ - 只使需要响应的部分成为响应式
const paginatedData = observable({
  currentPage: 1,
  pageSize: 20,
  items: [] // 只包含当前页数据
});</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="resources">
      <h3>进一步学习资源：</h3>
      <ul>
        <li><a href="https://vuejs.org/api/reactivity-core.html#reactive" target="_blank">Vue 官方响应式 API 文档</a></li>
        <li><a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank">Vue 响应式深入指南</a></li>
        <li><a href="https://github.com/vuejs/vue-next/tree/master/packages/reactivity" target="_blank">Vue 响应式系统源码</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #42b883;
  --primary-light: #e8f5e9;
  --primary-dark: #339e6d;
  --secondary: #35495e;
  --secondary-light: #f5f7fa;
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --border: #e0e0e0;
  --card-bg: #ffffff;
  --background: #f8fafc;
  --success: #4caf50;
  --warning: #ff9800;
  --danger: #e53935;
  --info: #2196f3;
}

.observable-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 25px;
  background-color: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 30px 0 40px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .icon {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      border-radius: 50%;
      font-size: 1.8rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
  }
}

.quick-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  .summary-card {
    background: var(--card-bg);
    border-radius: 14px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    .icon-box {
      width: 70px;
      height: 70px;
      margin: 0 auto 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;

      &.reactive {
        background: rgba(66, 184, 131, 0.1);
        color: var(--primary-dark);
      }

      &.scope {
        background: rgba(53, 73, 94, 0.1);
        color: var(--secondary);
      }

      &.utility {
        background: rgba(33, 150, 243, 0.1);
        color: var(--info);
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 10px;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      font-size: 1rem;
      margin: 0;
    }
  }
}

.section {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 35px;
  margin-bottom: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(var(--primary), 0.1);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 15px;

      .icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--primary), 0.1);
        color: var(--primary-dark);
        border-radius: 50%;
        font-size: 1.2rem;
      }
    }
  }
}

.definition {
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 25px;
    background: rgba(var(--primary), 0.03);
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid var(--primary);
  }

  .core-concept {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    .concept-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .concept {
        display: flex;
        gap: 15px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

        .concept-icon {
          min-width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(var(--primary), 0.1);
          color: var(--primary-dark);
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.4rem;
        }

        h4 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin: 0;
          background: none;
          padding: 0;
          border-left: none;
        }
      }
    }
  }

  .technical-details {
    margin-top: 30px;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .detail-card {
        padding: 20px;
        background: rgba(var(--primary), 0.03);
        border-radius: 12px;
        border-left: 3px solid var(--primary);

        h4 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: var(--primary-dark);
        }

        p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin: 0;
          background: none;
          padding: 0;
          border-left: none;
        }
      }
    }
  }
}

.usage {
  .basic-usage {
    margin-bottom: 35px;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: var(--text-primary);
      padding-left: 10px;
      border-left: 4px solid var(--primary);
    }
  }

  .advanced-usage {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 25px;
      color: var(--text-primary);
      padding-left: 10px;
      border-left: 4px solid var(--primary);
    }

    .advanced-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;

      .usage-card {
        padding: 20px;
        background: rgba(var(--primary), 0.03);
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

        h4 {
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 15px;
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          gap: 10px;

          &::before {
            content: "►";
            color: var(--primary);
          }
        }
      }
    }
  }
}

.code-snippet {
  background: #2d3747;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  margin-bottom: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  .comment {
    color: #a0aec0;
  }

  .keyword {
    color: #63b3ed;
  }

  .function {
    color: #f6e05e;
  }

  .string {
    color: #68d391;
  }
}

.use-cases {
  .case {
    padding: 25px;
    margin-bottom: 20px;
    border-radius: 12px;
    background: var(--card-bg);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border-left: 4px solid var(--primary);

    .case-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;

      .case-icon {
        font-size: 1.5rem;
      }

      h3 {
        font-size: 1.3rem;
        margin: 0;
        color: var(--text-primary);
      }
    }

    p {
      margin: 0 0 15px;
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .recommendation {
      padding: 15px;
      background: rgba(var(--primary), 0.05);
      border-radius: 8px;
      font-size: 0.95rem;

      ul {
        padding-left: 20px;
        margin: 10px 0 0;

        li {
          margin-bottom: 8px;
        }
      }
    }
  }
}

.comparison {
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    overflow: hidden;

    th,
    td {
      padding: 16px 20px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }

    thead {
      background: rgba(var(--primary), 0.1);

      th {
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    tbody {
      tr {
        &:hover {
          background: rgba(var(--primary), 0.03);
        }

        &:last-child td {
          border-bottom: none;
        }
      }
    }
  }

  .decision-guide {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: var(--text-primary);
      padding-left: 10px;
      border-left: 4px solid var(--primary);
    }

    .guide {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;

      .guide-item {
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

        &.observable {
          border-top: 4px solid var(--primary);

          h4 {
            color: var(--primary-dark);
          }
        }

        &.vuex {
          border-top: 4px solid var(--secondary);

          h4 {
            color: var(--secondary);
          }
        }

        h4 {
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 15px;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 12px;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.best-practices {
  .practice {
    display: flex;
    gap: 20px;
    padding: 25px 0;
    border-bottom: 1px solid var(--border);

    &:last-child {
      border-bottom: none;
    }

    .practice-icon {
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(var(--primary), 0.1);
      color: var(--primary-dark);
      border-radius: 50%;
      font-weight: 700;
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 15px;
      color: var(--text-primary);
    }

    p {
      margin: 0 0 15px;
      font-size: 1.05rem;
    }
  }
}

.resources {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 30px;
  margin-top: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--text-primary);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 15px;
      font-size: 1.05rem;

      a {
        color: var(--primary-dark);
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: "🔗";
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .section {
    padding: 25px 20px;
  }

  .quick-summary {
    grid-template-columns: 1fr;
  }

  .concept-grid,
  .details-grid,
  .advanced-grid {
    grid-template-columns: 1fr !important;
  }

  .practice {
    flex-direction: column;
  }
}
</style>
