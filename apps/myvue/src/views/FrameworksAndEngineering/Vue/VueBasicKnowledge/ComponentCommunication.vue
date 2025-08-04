<template>
  <div class="component-communication">
    <header class="header">
      <h1>Vue 组件通信方式基础介绍</h1>
      <p class="subtitle">10种高效通信方案，构建灵活组件架构</p>
    </header>

    <main class="content">
      <div class="intro-card">
        <div class="icon">📡</div>
        <div class="intro-content">
          <p>在Vue应用开发中，组件通信是实现功能复用的核心。本指南详细介绍了10种组件通信方式，每种方式包含使用方法、适用场景及优缺点分析。</p>
        </div>
      </div>

      <div class="communication-grid">
        <!-- Props / Emits -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🔁</div>
            <h2>Props / Emits</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// 父组件
&lt;ChildComponent
  :title="parentTitle"
  @update="handleUpdate"
/&gt;

// 子组件
defineProps(['title'])
const emit = defineEmits(['update'])

function sendData() {
  emit('update', newData)
}</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>父子组件间的简单数据传递</li>
                  <li>表单数据双向绑定</li>
                  <li>状态变化通知</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>官方推荐方式</li>
                    <li>类型检查(TypeScript支持)</li>
                    <li>明确的父子关系</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>组件层级深时繁琐</li>
                    <li>兄弟组件通信不便</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- v-model 双向绑定 -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🔄</div>
            <h2>v-model 双向绑定</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// 父组件
&lt;CustomInput v-model="message" /&gt;

// 子组件
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

&lt;input
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
&gt;</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>表单输入组件</li>
                  <li>需要双向绑定的UI控件</li>
                  <li>简化props/emit语法</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>语法简洁</li>
                    <li>符合双向数据流思想</li>
                    <li>支持多个v-model绑定</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>仅适用于父子组件</li>
                    <li>组件需要特定实现</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Provide / Inject -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">💉</div>
            <h2>Provide / Inject</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// 祖先组件
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)

// 后代组件
import { inject } from 'vue'

const theme = inject('theme', 'light') // 默认值</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>跨层级组件通信</li>
                  <li>全局配置(主题/语言)</li>
                  <li>避免props逐层传递</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>解决props逐层传递问题</li>
                    <li>支持响应式数据</li>
                    <li>适用于深度嵌套组件</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>组件关系不明确</li>
                    <li>过度使用导致数据流混乱</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Refs -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🎯</div>
            <h2>Refs</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// 父组件
import { ref } from 'vue'

const childRef = ref(null)

function callChildMethod() {
  childRef.value?.childMethod()
}

&lt;ChildComponent ref="childRef" /&gt;

// 子组件
defineExpose({
  childMethod: () => { /* ... */ }
})</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>调用子组件方法</li>
                  <li>访问子组件DOM</li>
                  <li>集成第三方库</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>直接访问组件实例</li>
                    <li>调用子组件方法</li>
                    <li>操作DOM元素</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>破坏组件封装性</li>
                    <li>增加组件耦合度</li>
                    <li>应谨慎使用</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Event Bus -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">📻</div>
            <h2>Event Bus</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// eventBus.js
import mitt from 'mitt'
export default mitt()

// 发送事件组件
import eventBus from './eventBus'

eventBus.emit('message', data)

// 接收事件组件
import eventBus from './eventBus'

eventBus.on('message', (data) => {
  // 处理数据
})

// 组件卸载时
onUnmounted(() => {
  eventBus.off('message')
})</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>非父子组件通信</li>
                  <li>小型应用全局事件</li>
                  <li>简单场景状态通知</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>任意组件间通信</li>
                    <li>简单轻量</li>
                    <li>无需复杂状态管理</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>事件难以追踪</li>
                    <li>可能导致内存泄漏</li>
                    <li>不适合大型应用</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vuex -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🏪</div>
            <h2>Vuex</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// store.js
import { createStore } from 'vuex'

export default createStore({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++ }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 1000)
    }
  }
})

// 组件中使用
import { useStore } from 'vuex'

const store = useStore()

// 获取状态
const count = computed(() => store.state.count)

// 提交变更
store.commit('increment')

// 分发动作
store.dispatch('incrementAsync')</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>中大型应用状态管理</li>
                  <li>多个组件共享状态</li>
                  <li>需要状态历史追踪</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>集中式状态管理</li>
                    <li>状态变更可预测</li>
                    <li>完善的开发工具支持</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>概念较多学习曲线陡峭</li>
                    <li>小型项目可能过于复杂</li>
                    <li>Vue 3 中推荐使用 Pinia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pinia -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🍍</div>
            <h2>Pinia</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    },
    async incrementAsync() {
      await delay(1000)
      this.increment()
    }
  }
})

// 组件中使用
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// 获取状态
const count = computed(() => counter.count)

// 调用action
counter.increment()</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>Vue 3 应用状态管理</li>
                  <li>需要类型安全的状态</li>
                  <li>模块化状态管理</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>Vue 3 官方推荐</li>
                    <li>更好的TypeScript支持</li>
                    <li>更简洁的API</li>
                    <li>模块化设计</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>相对较新(社区资源较少)</li>
                    <li>迁移成本(Vuex项目)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 全局状态 -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🌐</div>
            <h2>全局状态</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// globalState.js
import { reactive } from 'vue'

export const globalState = reactive({
  user: null,
  theme: 'light',
  setUser(user) {
    this.user = user
  },
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }
})

// 组件中使用
import { globalState } from '@/globalState'

// 读取状态
const theme = computed(() => globalState.theme)

// 修改状态
function toggleTheme() {
  globalState.toggleTheme()
}</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>简单应用的全局状态</li>
                  <li>不需要复杂状态管理的场景</li>
                  <li>快速原型开发</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>简单直接</li>
                    <li>无需额外库</li>
                    <li>快速实现</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>状态变更不可追踪</li>
                    <li>缺乏状态管理规范</li>
                    <li>不适合大型应用</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- $attrs -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🎭</div>
            <h2>非Prop属性($attrs)</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// 父组件
&lt;ChildComponent
  data-tooltip="提示信息"
  class="custom-style"
  @click="handleClick"
/&gt;

// 子组件
&lt;div v-bind="$attrs"&gt;
  &lt;!-- 自动继承非prop属性 --&gt;
&lt;/div&gt;

// 组件中访问
import { useAttrs } from 'vue'

const attrs = useAttrs()
console.log(attrs) // { class: 'custom-style', 'data-tooltip': '提示信息' }</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>高阶组件(HOC)开发</li>
                  <li>透传原生HTML属性</li>
                  <li>封装基础组件库</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>简化属性传递</li>
                    <li>支持属性继承</li>
                    <li>增强组件灵活性</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>属性来源不明确</li>
                    <li>可能造成属性冲突</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 插槽(Slots) -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🧩</div>
            <h2>插槽(Slots)</h2>
          </div>
          <div class="method-content">
            <h3>使用方法</h3>
            <div class="code-example">
              <pre><code>// 父组件
&lt;TemplateComponent&gt;
  &lt;template #header&gt;
    &lt;h1&gt;自定义标题&lt;/h1&gt;
  &lt;/template&gt;

  &lt;template #default="slotProps"&gt;
    &lt;p&gt;&#123;&#123; slotProps.item &#125;&#125;&lt;/p&gt;
  &lt;/template&gt;
&lt;/TemplateComponent&gt;

// 子组件
&lt;div class="container"&gt;
  &lt;slot name="header"&gt;
    &lt;!-- 默认内容 --&gt;
    &lt;h1&gt;默认标题&lt;/h1&gt;
  &lt;/slot&gt;

  &lt;slot :item="item"&gt;&lt;/slot&gt;
&lt;/div&gt;</code></pre>
            </div>
            <div class="details">
              <div class="scenario">
                <h3>适用场景</h3>
                <ul>
                  <li>可复用布局组件</li>
                  <li>内容分发</li>
                  <li>高阶组件(HOC)</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div>
                  <h3>✅ 优点</h3>
                  <ul>
                    <li>强大的内容分发能力</li>
                    <li>提升组件复用性</li>
                    <li>作用域插槽提供数据传递</li>
                  </ul>
                </div>
                <div>
                  <h3>❌ 缺点</h3>
                  <ul>
                    <li>复杂插槽结构可读性降低</li>
                    <li>过度使用可能导致组件职责不清晰</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="summary-section">
        <h2>组件通信方式选择指南</h2>
        <div class="summary-grid">
          <div class="summary-card">
            <h3>父子组件</h3>
            <ul>
              <li>Props / Emits (首选)</li>
              <li>v-model (表单场景)</li>
              <li>Refs (访问子组件)</li>
            </ul>
          </div>
          <div class="summary-card">
            <h3>跨层级组件</h3>
            <ul>
              <li>Provide / Inject</li>
              <li>状态管理(Pinia/Vuex)</li>
              <li>Event Bus (小型应用)</li>
            </ul>
          </div>
          <div class="summary-card">
            <h3>任意组件</h3>
            <ul>
              <li>Pinia (推荐)</li>
              <li>Vuex</li>
              <li>全局状态</li>
            </ul>
          </div>
          <div class="summary-card">
            <h3>特殊场景</h3>
            <ul>
              <li>Slots (内容分发)</li>
              <li>$attrs (属性透传)</li>
              <li>Refs (访问DOM/组件)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>Vue 3 组件通信指南 © 2023 | 基于 Vue 3.3+ 最佳实践</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 这里可以添加组件逻辑（如果需要）
const currentMethod = ref('props-emits');
</script>

<style lang="less" scoped>
.component-communication {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333;
  background: #f8fafc;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, #4f6df5 0%, #3a5bf7 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 5px 25px rgba(79, 109, 245, 0.3);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.intro-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #4f6df5;

  .icon {
    font-size: 3.5rem;
    margin-right: 25px;
    color: #4f6df5;
  }

  .intro-content {
    flex: 1;

    p {
      font-size: 1.15rem;
      line-height: 1.7;
      color: #444;
      margin: 0;
    }
  }
}

.communication-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.method-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
}

.method-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(135deg, #4f6df5 0%, #3a5bf7 100%);
  color: white;

  .method-icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
  }
}

.method-content {
  padding: 25px;

  h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
}

.code-example {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 20px 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-size: 0.92rem;
      line-height: 1.5;

      .comment {
        color: #6272a4;
      }

      .keyword {
        color: #ff79c6;
      }

      .string {
        color: #f1fa8c;
      }

      .type {
        color: #8be9fd;
      }

      .variable {
        color: #50fa7b;
      }

      .property {
        color: #f8f8f2;
      }
    }
  }
}

.details {
  display: flex;
  gap: 25px;
  margin-top: 20px;

  >div {
    flex: 1;
  }

  h3 {
    font-size: 1.15rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-top: 0;
    color: #3a5bf7;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
      color: #555;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  >div {
    padding: 15px;
    border-radius: 8px;
  }

  .pros-cons>div:first-child {
    background: rgba(79, 109, 245, 0.05);
    border-left: 3px solid #4CAF50;
  }

  .pros-cons>div:last-child {
    background: rgba(244, 67, 54, 0.05);
    border-left: 3px solid #F44336;
  }
}

.summary-section {
  margin: 50px 0;

  h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 1.8rem;
  }
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #4f6df5;

  h3 {
    color: #3a5bf7;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 1px dashed #eaecef;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 12px;
      color: #555;
      line-height: 1.6;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .communication-grid {
    grid-template-columns: 1fr;
  }

  .details {
    flex-direction: column;
    gap: 20px;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }

  .header {
    padding: 20px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .intro-card {
    flex-direction: column;
    text-align: center;

    .icon {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .method-header {
    padding: 15px 20px;

    h2 {
      font-size: 1.4rem;
    }
  }

  .code-example {
    padding: 12px;

    pre code {
      font-size: 0.85rem;
    }
  }
}
</style>
