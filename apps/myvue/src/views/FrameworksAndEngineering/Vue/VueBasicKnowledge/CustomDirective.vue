<template>
  <div class="custom-directives-container">
    <!-- 标题和概述部分 -->
    <header>
      <h1>Vue 自定义指令基础介绍</h1>
      <p class="overview">
        自定义指令是 Vue 强大的功能之一，允许开发者直接操作 DOM 元素。它们提供了一种封装 DOM 操作的方式，
        可以在组件中重用这些操作逻辑，特别适合处理底层 DOM 交互。
      </p>
    </header>

    <!-- 主要内容 -->
    <div class="content-wrapper">
      <!-- 左侧导航 -->
      <nav class="navigation">
        <div v-for="(item, index) in navItems" :key="index" :class="{ active: activeSection === index }"
          @click="activeSection = index">
          {{ item.title }}
        </div>
      </nav>

      <!-- 右侧内容 -->
      <div class="content">
        <!-- 概念部分 -->
        <section v-show="activeSection === 0">
          <h2>自定义指令概念</h2>

          <div class="card">
            <h3>什么是自定义指令？</h3>
            <p>
              自定义指令是 Vue 提供的一种机制，允许开发者注册自己的指令来扩展 Vue 的功能。
              它们主要用于需要对普通 DOM 元素进行底层操作的场景。
            </p>

            <div class="comparison">
              <div class="comparison-item">
                <h4>内置指令</h4>
                <ul>
                  <li>v-model - 双向数据绑定</li>
                  <li>v-show - 条件显示</li>
                  <li>v-if/v-else - 条件渲染</li>
                  <li>v-for - 列表渲染</li>
                  <li>v-on - 事件监听</li>
                  <li>v-bind - 属性绑定</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>自定义指令</h4>
                <ul>
                  <li>v-focus - 自动聚焦</li>
                  <li>v-debounce - 防抖处理</li>
                  <li>v-click-outside - 点击外部</li>
                  <li>v-permission - 权限控制</li>
                  <li>v-draggable - 拖拽功能</li>
                  <li>v-copy - 复制文本</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>为什么需要自定义指令？</h3>
            <div class="benefits-grid">
              <div class="benefit">
                <div class="icon">🔄</div>
                <h4>代码复用</h4>
                <p>封装 DOM 操作逻辑，避免重复代码</p>
              </div>
              <div class="benefit">
                <div class="icon">📦</div>
                <h4>功能封装</h4>
                <p>将复杂 DOM 操作封装为简单指令</p>
              </div>
              <div class="benefit">
                <div class="icon">⚙️</div>
                <h4>底层操作</h4>
                <p>直接操作 DOM 元素，处理 Vue 难以处理的情况</p>
              </div>
              <div class="benefit">
                <div class="icon">🧩</div>
                <h4>组件解耦</h4>
                <p>将与组件无关的 DOM 逻辑分离</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>指令生命周期钩子</h3>
            <div class="hooks-table">
              <table>
                <thead>
                  <tr>
                    <th>钩子函数</th>
                    <th>调用时机</th>
                    <th>参数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>created</td>
                    <td>在绑定元素的 attribute 或事件监听器被应用之前调用</td>
                    <td>el, binding, vnode, prevVnode</td>
                  </tr>
                  <tr>
                    <td>beforeMount</td>
                    <td>在元素被插入到 DOM 前调用</td>
                    <td>el, binding, vnode</td>
                  </tr>
                  <tr>
                    <td>mounted</td>
                    <td>在绑定元素的父组件及他自己的所有子节点都挂载完成后调用</td>
                    <td>el, binding, vnode</td>
                  </tr>
                  <tr>
                    <td>beforeUpdate</td>
                    <td>在包含组件的 VNode 更新之前调用</td>
                    <td>el, binding, vnode, prevVnode</td>
                  </tr>
                  <tr>
                    <td>updated</td>
                    <td>在包含组件的 VNode 及其子组件的 VNode 更新后调用</td>
                    <td>el, binding, vnode, prevVnode</td>
                  </tr>
                  <tr>
                    <td>beforeUnmount</td>
                    <td>在绑定元素的父组件卸载之前调用</td>
                    <td>el, binding, vnode</td>
                  </tr>
                  <tr>
                    <td>unmounted</td>
                    <td>在绑定元素的父组件卸载之后调用</td>
                    <td>el, binding, vnode</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 使用部分 -->
        <section v-show="activeSection === 1">
          <h2>自定义指令使用</h2>

          <div class="card">
            <h3>全局注册指令</h3>
            <div class="code-sample">
              <pre><code>// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 注册全局指令 v-focus
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')</code></pre>
            </div>

            <div class="explanation">
              <h4>特点：</h4>
              <ul>
                <li>在应用的所有组件中可用</li>
                <li>适合频繁使用的指令</li>
                <li>在应用创建时注册</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <h3>局部注册指令</h3>
            <div class="code-sample">
              <pre><code>&lt;script setup lang="ts"&gt;
// 在组件内注册指令
const vFocus = {
  mounted(el: HTMLElement) {
    el.focus()
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;input v-focus placeholder="自动聚焦" /&gt;
&lt;/template&gt;</code></pre>
            </div>

            <div class="explanation">
              <h4>特点：</h4>
              <ul>
                <li>仅在当前组件中可用</li>
                <li>适合特定组件使用的指令</li>
                <li>使用命名约定：vNameOfDirective</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <h3>指令参数基础介绍</h3>
            <div class="directive-params">
              <div class="param-card">
                <h4>el</h4>
                <p>指令绑定到的 DOM 元素，可以直接操作</p>
              </div>
              <div class="param-card">
                <h4>binding</h4>
                <p>包含指令信息的对象：
                <ul>
                  <li>value - 传递给指令的值</li>
                  <li>oldValue - 之前的值</li>
                  <li>arg - 指令参数</li>
                  <li>modifiers - 修饰符对象</li>
                  <li>instance - 组件实例</li>
                </ul>
                </p>
              </div>
              <div class="param-card">
                <h4>vnode</h4>
                <p>代表绑定元素的底层 VNode</p>
              </div>
              <div class="param-card">
                <h4>prevNode</h4>
                <p>之前的渲染中代表指令所绑定元素的 VNode</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 常用指令部分 -->
        <section v-show="activeSection === 2">
          <h2>常用自定义指令</h2>

          <div class="card">
            <h3>v-focus - 自动聚焦</h3>
            <div class="directive-demo">
              <div class="code-sample">
                <pre><code>// 注册指令
app.directive('focus', {
  mounted(el) {
    el.focus()
  },
  updated(el) {
    if (el.dataset.focus === 'true') {
      el.focus()
    }
  }
})

// 使用
&lt;input v-focus data-focus="true" /&gt;</code></pre>
              </div>
              <div class="demo">
                <input v-focus placeholder="自动聚焦输入框" class="demo-input" />
              </div>
            </div>
          </div>

          <div class="card">
            <h3>v-debounce - 防抖处理</h3>
            <div class="directive-demo">
              <div class="code-sample">
                <pre><code>app.directive('debounce', {
  mounted(el, binding) {
    let delay = binding.value || 500
    let timer: ReturnType&lt;typeof setTimeout&gt;

    el.addEventListener('input', () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        binding.instance[binding.arg] = el.value
      }, delay)
    })
  }
})

// 使用
&lt;input v-debounce:searchText="500" /&gt;</code></pre>
              </div>
              <div class="demo">
                <input v-model="searchTerm" v-debounce="500" placeholder="输入时500ms防抖" class="demo-input" />
                <div class="debounce-result">输入内容: {{ searchTerm }}</div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>v-click-outside - 点击外部</h3>
            <div class="directive-demo">
              <div class="code-sample">
                <pre><code>app.directive('click-outside', {
  mounted(el, binding) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
})

// 使用
&lt;div v-click-outside="closeDropdown"&gt;
  &lt;button @click="toggleDropdown"&gt;打开菜单&lt;/button&gt;
  &lt;div v-if="dropdownOpen"&gt;菜单内容&lt;/div&gt;
&lt;/div&gt;</code></pre>
              </div>
              <div class="demo">
                <div class="dropdown-container">
                  <button @click="dropdownOpen = !dropdownOpen" class="demo-button">
                    {{ dropdownOpen ? '关闭菜单' : '打开菜单' }}
                  </button>
                  <div v-if="dropdownOpen" class="dropdown-menu" v-click-outside="closeDropdown">
                    <div class="dropdown-item">菜单项 1</div>
                    <div class="dropdown-item">菜单项 2</div>
                    <div class="dropdown-item">菜单项 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>v-permission - 权限控制</h3>
            <div class="directive-demo">
              <div class="code-sample">
                <pre><code>app.directive('permission', {
  mounted(el, binding) {
    const { value } = binding
    const permissions = ['admin', 'editor'] // 用户权限

    if (value && !permissions.includes(value)) {
      el.parentNode?.removeChild(el)
    }
  }
})

// 使用
&lt;button v-permission="'admin'"&gt;管理员按钮&lt;/button&gt;</code></pre>
              </div>
              <div class="demo">
                <div class="permission-demo">
                  <button v-permission="'admin'" class="demo-button">管理员按钮</button>
                  <p class="permission-note">当前用户权限: editor (仅显示具有 editor 权限的按钮)</p>
                  <button v-permission="'editor'" class="demo-button">编辑者按钮</button>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>v-copy - 复制文本</h3>
            <div class="directive-demo">
              <div class="code-sample">
                <pre><code>app.directive('copy', {
  mounted(el, binding) {
    el.copyHandler = () => {
      const text = binding.value || el.innerText
      navigator.clipboard.writeText(text)
        .then(() => {
          alert('复制成功: ' + text)
        })
        .catch(err => {
          console.error('复制失败:', err)
        })
    }
    el.addEventListener('click', el.copyHandler)
  },
  unmounted(el) {
    el.removeEventListener('click', el.copyHandler)
  }
})

// 使用
&lt;button v-copy="'要复制的文本'"&gt;复制&lt;/button&gt;</code></pre>
              </div>
              <div class="demo">
                <button v-copy="'https://github.com/vuejs/core'" class="demo-button">
                  复制 Vue GitHub 链接
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <footer>
      <p>自定义指令是 Vue 强大的扩展机制，合理使用可以极大提高代码复用性和可维护性。</p>
      <div class="footer-links">
        <a href="https://vuejs.org/guide/reusability/custom-directives.html" target="_blank">
          Vue 官方文档
        </a>
        <a href="https://github.com/vuejs/awesome-vue#custom-directives" target="_blank">
          更多指令示例
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航状态
const activeSection = ref(0);
const navItems = ref([
  { title: '基本概念' },
  { title: '使用方法' },
  { title: '常用指令' }
]);

// 演示状态
const searchTerm = ref('');
const dropdownOpen = ref(false);

// v-focus 指令
const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
};

// v-debounce 指令
const vDebounce = {
  mounted(el: HTMLElement, binding: any) {
    const delay = binding.value || 500;
    let timer: ReturnType<typeof setTimeout>;

    el.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // 实际应用中这里会触发事件或更新状态
        console.log('防抖后输入:', (el as HTMLInputElement).value);
      }, delay);
    });
  }
};

// v-click-outside 指令
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    (el as any).clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    document.addEventListener('click', (el as any).clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).clickOutsideEvent);
  }
};

// v-permission 指令
const vPermission = {
  mounted(el: HTMLElement, binding: any) {
    const permissions = ['editor']; // 模拟当前用户权限
    if (binding.value && !permissions.includes(binding.value)) {
      el.style.display = 'none';
    }
  }
};

// v-copy 指令
const vCopy = {
  mounted(el: HTMLElement, binding: any) {
    el.addEventListener('click', () => {
      const text = binding.value || el.innerText;
      navigator.clipboard.writeText(text)
        .then(() => {
          alert(`复制成功: ${text}`);
        })
        .catch(err => {
          console.error('复制失败:', err);
          alert('复制失败，请手动复制');
        });
    });
  }
};

// 关闭下拉菜单
const closeDropdown = () => {
  dropdownOpen.value = false;
};
</script>

<style scoped lang="less">
@primary-color: #42b983;
@secondary-color: #35495e;
@accent-color: #e7f4ee;
@background-color: #f9f9f9;
@card-color: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.custom-directives-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid @border-color;

    h1 {
      color: @secondary-color;
      margin-bottom: 15px;
      font-size: 2.5rem;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: @primary-color;
        border-radius: 2px;
      }
    }

    .overview {
      max-width: 800px;
      margin: 20px auto 0;
      font-size: 1.1rem;
      color: lighten(@text-color, 20%);
    }
  }

  .content-wrapper {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .navigation {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      flex: none;
    }

    div {
      padding: 15px 20px;
      background: #f0f7f3;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      color: @secondary-color;

      &:hover {
        background: darken(#f0f7f3, 5%);
        transform: translateX(5px);

        @media (max-width: 768px) {
          transform: translateY(-3px);
        }
      }

      &.active {
        background: @primary-color;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .content {
    flex: 1;

    section {
      margin-bottom: 30px;

      h2 {
        color: @secondary-color;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid @border-color;
      }
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid @border-color;

      h3 {
        color: @secondary-color;
        margin-bottom: 20px;
        font-size: 1.4rem;
      }

      h4 {
        color: @primary-color;
        margin: 15px 0 10px;
      }

      p {
        margin-bottom: 15px;
        line-height: 1.7;
        color: lighten(@text-color, 15%);
      }

      ul {
        padding-left: 25px;
        margin-bottom: 20px;

        li {
          margin-bottom: 10px;
          line-height: 1.6;
        }
      }
    }

    .comparison {
      display: flex;
      gap: 30px;
      margin-top: 20px;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      .comparison-item {
        flex: 1;
        background: #f8fcf9;
        border-radius: 8px;
        padding: 20px;
        border: 1px solid @border-color;

        h4 {
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid @border-color;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 8px;
            padding: 8px 0;
            border-bottom: 1px dashed @border-color;
          }
        }
      }
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;

      .benefit {
        background: #f8fcf9;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        border: 1px solid @border-color;

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h4 {
          margin-bottom: 10px;
          color: @primary-color;
        }
      }
    }

    .hooks-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;

        th,
        td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        th {
          background-color: @primary-color;
          color: white;
          font-weight: bold;
        }

        tr:nth-child(even) {
          background-color: #f8fcf9;
        }

        tr:hover {
          background-color: darken(#f8fcf9, 2%);
        }
      }
    }

    .code-sample {
      background: @code-bg;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      overflow-x: auto;

      pre {
        margin: 0;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.5;

          .comment {
            color: #75715e;
          }

          .keyword {
            color: #f92672;
          }

          .function {
            color: #66d9ef;
          }

          .string {
            color: #a6e22e;
          }

          .number {
            color: #ae81ff;
          }
        }
      }
    }

    .explanation {
      background: #f0f7f3;
      border-radius: 8px;
      padding: 20px;
      margin-top: 15px;

      h4 {
        margin-top: 0;
        margin-bottom: 10px;
      }
    }

    .directive-params {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;

      .param-card {
        background: #f8fcf9;
        border-radius: 8px;
        padding: 20px;
        border: 1px solid @border-color;

        h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: @primary-color;
        }

        ul {
          padding-left: 20px;
          margin-top: 10px;

          li {
            margin-bottom: 5px;
            font-size: 0.9rem;
          }
        }
      }
    }

    .directive-demo {
      display: flex;
      gap: 30px;
      margin-top: 20px;

      @media (max-width: 900px) {
        flex-direction: column;
      }

      .code-sample {
        flex: 1;
      }

      .demo {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        background: #f0f7f3;
        border-radius: 8px;
        padding: 20px;
        border: 1px solid @border-color;

        .demo-input {
          padding: 10px 15px;
          border: 1px solid @border-color;
          border-radius: 6px;
          width: 100%;
          max-width: 300px;
          font-size: 1rem;

          &:focus {
            outline: none;
            border-color: @primary-color;
            box-shadow: 0 0 0 2px fade(@primary-color, 20%);
          }
        }

        .debounce-result {
          margin-top: 15px;
          font-size: 0.9rem;
          color: @primary-color;
          font-weight: 500;
        }

        .dropdown-container {
          position: relative;
          width: 100%;
          max-width: 300px;
          text-align: center;
        }

        .demo-button {
          padding: 10px 20px;
          background: @primary-color;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;

          &:hover {
            background: darken(@primary-color, 10%);
          }
        }

        .dropdown-menu {
          position: absolute;
          top: 45px;
          left: 0;
          width: 100%;
          background: white;
          border: 1px solid @border-color;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          overflow: hidden;
        }

        .dropdown-item {
          padding: 12px 15px;
          border-bottom: 1px solid @border-color;
          cursor: pointer;
          transition: background 0.2s;

          &:last-child {
            border-bottom: none;
          }

          &:hover {
            background: #f0f7f3;
          }
        }

        .permission-demo {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
          width: 100%;
        }

        .permission-note {
          font-size: 0.9rem;
          color: #666;
          text-align: center;
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    padding: 25px;
    background-color: #f0f7f3;
    border-radius: 12px;
    text-align: center;
    font-size: 1.1rem;
    border-top: 2px solid @border-color;

    p {
      margin-bottom: 15px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .custom-directives-container {
    padding: 15px;

    header h1 {
      font-size: 2rem;
    }
  }
}
</style>
