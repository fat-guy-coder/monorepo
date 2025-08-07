<template>
  <div class="code-standards-container">
    <header class="header">
      <div class="title-section">
        <h1>Vue3 <span class="highlight">代码规范</span>指南</h1>
        <p class="subtitle">打造可维护、高质量Vue应用的最佳实践</p>
      </div>
      <div class="stats-card">
        <div class="stat-item">
          <div class="stat-value">12+</div>
          <div class="stat-label">核心规范</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">50+</div>
          <div class="stat-label">实用示例</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">100%</div>
          <div class="stat-label">最佳实践</div>
        </div>
      </div>
    </header>

    <div class="toc-section">
      <h2 class="section-title">📚 目录导航</h2>
      <div class="toc-grid">
        <div v-for="(item, index) in tocItems" :key="index" class="toc-item" @click="scrollToSection(item.id)">
          <div class="toc-number">{{ index + 1 }}</div>
          <div class="toc-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="standards-container">
      <!-- 命名规范 -->
      <section id="naming" class="standard-section">
        <div class="section-header">
          <div class="section-icon">🔠</div>
          <h2>命名规范</h2>
        </div>
        <p class="section-desc">一致的命名约定提高代码可读性和可维护性</p>

        <div class="standard-card">
          <h3>组件命名</h3>
          <p class="why-text">为什么：提高可读性，遵循行业标准，便于自动导入</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">// 文件: Button.vue
export default {
  name: 'button' // 与HTML元素冲突
}

// 文件: myComponent.vue // 小写开头，不一致</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">// 文件: BaseButton.vue
export default {
  name: 'BaseButton' // PascalCase，带前缀避免冲突
}

// 文件: UserProfile.vue // PascalCase命名组件文件</pre>
            </div>
          </div>
        </div>

        <div class="standard-card">
          <h3>Props命名</h3>
          <p class="why-text">为什么：保持一致性，遵循HTML属性规范</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">&lt;UserProfile
  :user-name="userName" // 混合命名
  :onClick="handleClick" // 事件处理器命名
/&gt;</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">&lt;UserProfile
  :user-name="userName" // 统一kebab-case
  @click="handleClick" // 事件使用@前缀
/&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 组件结构 -->
      <section id="structure" class="standard-section">
        <div class="section-header">
          <div class="section-icon">🧱</div>
          <h2>组件结构</h2>
        </div>
        <p class="section-desc">一致的组件结构有助于快速定位代码</p>

        <div class="standard-card">
          <h3>组件组织顺序</h3>
          <p class="why-text">为什么：提高可读性，维护一致的开发体验</p>
          <div class="full-example">
            <pre class="code-block">&lt;template&gt;
  &lt;!-- 模板内容 --&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
// 1. 组件选项 (name, inheritAttrs)
defineOptions({
  name: 'StandardComponent',
  inheritAttrs: false
})

// 2. 类型导入与定义
import type { User } from '@/types'

// 3. Props定义
const props = defineProps({
  userId: { type: Number, required: true },
  userData: { type: Object as PropType&lt;User&gt;, default: null }
})

// 4. 事件定义
const emit = defineEmits(['update', 'delete'])

// 5. 响应式状态
const count = ref(0)
const state = reactive({ loading: false, error: null })

// 6. 计算属性
const fullName = computed(() => `${props.userData.firstName} ${props.userData.lastName}`)

// 7. 方法/函数
function increment() {
  count.value++
}

// 8. 生命周期钩子
onMounted(() => {
  fetchUserData()
})

// 9. 监听器
watch(() => props.userId, (newId) => {
  fetchUserData(newId)
})

// 10. 暴露公共方法
defineExpose({ resetForm })
&lt;/script&gt;

&lt;style lang="less" scoped&gt;
/* 组件样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
}
&lt;/style&gt;</pre>
          </div>
        </div>
      </section>

      <!-- 响应式数据 -->
      <section id="reactivity" class="standard-section">
        <div class="section-header">
          <div class="section-icon">📊</div>
          <h2>响应式数据</h2>
        </div>
        <p class="section-desc">合理使用响应式API确保高效渲染</p>

        <div class="standard-card">
          <h3>ref vs reactive</h3>
          <p class="why-text">为什么：正确选择响应式类型可提高代码清晰度</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">// 过度使用reactive
const state = reactive({
  count: 0,
  user: reactive({ name: 'John' }), // 嵌套reactive
  items: reactive([])
})</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">// 合理使用ref和reactive
const count = ref(0) // 原始值使用ref
const user = reactive({ name: 'John' }) // 对象使用reactive
const items = ref([]) // 数组使用ref

// 访问模板中更清晰的count.value</pre>
            </div>
          </div>
        </div>

        <div class="standard-card">
          <h3>解构响应式对象</h3>
          <p class="why-text">为什么：防止失去响应性，保持数据一致性</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">// 直接解构响应式对象
const { name, email } = reactive(user)

// 解构后变量失去响应性
name = 'Alice' // 不会更新原始对象</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">// 使用toRefs保持响应性
const { name, email } = toRefs(user)

// 或使用computed
const userName = computed(() => user.name)

// 在模板中直接访问属性
&#123;&#123; user.name &#125;&#125;</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 模板规范 -->
      <section id="templates" class="standard-section">
        <div class="section-header">
          <div class="section-icon">🖼️</div>
          <h2>模板规范</h2>
        </div>
        <p class="section-desc">清晰、简洁的模板提高可读性和维护性</p>

        <div class="standard-card">
          <h3>指令简写</h3>
          <p class="why-text">为什么：提高效率，遵循Vue最佳实践</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">&lt;div v-bind:class="containerClass"&gt;
  &lt;button v-on:click="handleClick"&gt;
  &#123;&#123; buttonText &#125;&#125;
  &lt;/button&gt;
&lt;/div&gt;</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">&lt;div :class="containerClass"&gt;
  &lt;button @click="handleClick"&gt;
    &#123;&#123; buttonText &#125;&#125;
  &lt;/button&gt;
&lt;/div&gt;</pre>
            </div>
          </div>
        </div>

        <div class="standard-card">
          <h3>多属性元素格式</h3>
          <p class="why-text">为什么：提高可读性，便于版本控制</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">&lt;UserProfile :name="user.name" :email="user.email" :avatar="user.avatar"
  @update="handleUpdate" @delete="handleDelete" class="profile-card"/&gt;</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">&lt;UserProfile
  :name="user.name"
  :email="user.email"
  :avatar="user.avatar"
  @update="handleUpdate"
  @delete="handleDelete"
  class="profile-card"
/&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码风格 -->
      <section id="styling" class="standard-section">
        <div class="section-header">
          <div class="section-icon">🎨</div>
          <h2>代码风格</h2>
        </div>
        <p class="section-desc">一致的代码风格提高团队协作效率</p>

        <div class="standard-card">
          <h3>TypeScript使用</h3>
          <p class="why-text">为什么：提高类型安全，减少运行时错误</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">// 无类型定义
const fetchUser = (id) => {
  // 无法确保id类型
}</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">// 使用TypeScript类型
interface User {
  id: number
  name: string
  email: string
}

const fetchUser = async (id: number): Promise&lt;User&gt; => {
  // 确保id为数字类型
}</pre>
            </div>
          </div>
        </div>

        <div class="standard-card">
          <h3>样式作用域</h3>
          <p class="why-text">为什么：防止样式污染，确保组件样式独立</p>
          <div class="example-container">
            <div class="bad-practice">
              <h4>❌ 不推荐</h4>
              <pre class="code-block">&lt;style&gt;
/* 全局样式 */
.button {
  background: red;
}
&lt;/style&gt;</pre>
            </div>
            <div class="good-practice">
              <h4>✅ 推荐</h4>
              <pre class="code-block">&lt;style lang="less" scoped&gt;
/* 组件作用域样式 */
.container {
  .button {
    background: var(--primary-color);
  }
}
&lt;/style&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section id="best-practices" class="standard-section">
        <div class="section-header">
          <div class="section-icon">🏆</div>
          <h2>最佳实践</h2>
        </div>
        <p class="section-desc">提升应用质量和开发体验的关键实践</p>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">📦</div>
            <h3>组件设计</h3>
            <ul>
              <li>单一职责原则</li>
              <li>合理划分容器/展示组件</li>
              <li>避免组件超过500行</li>
              <li>Prop验证与默认值</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔄</div>
            <h3>状态管理</h3>
            <ul>
              <li>优先使用Props/Events</li>
              <li>需要时使用Pinia</li>
              <li>避免全局状态滥用</li>
              <li>模块化组织Store</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔍</div>
            <h3>性能优化</h3>
            <ul>
              <li>合理使用v-if/v-show</li>
              <li>避免v-for与v-if同用</li>
              <li>组件懒加载</li>
              <li>虚拟滚动大型列表</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📝</div>
            <h3>注释规范</h3>
            <ul>
              <li>公共方法使用JSDoc</li>
              <li>复杂逻辑添加解释</li>
              <li>避免不必要的注释</li>
              <li>TODO注释标记待办</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 工具推荐 -->
      <section id="tools" class="standard-section">
        <div class="section-header">
          <div class="section-icon">🛠️</div>
          <h2>工具推荐</h2>
        </div>
        <p class="section-desc">自动化检查和格式化，确保规范一致性</p>

        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-logo">ESL</div>
            <h3>ESLint</h3>
            <p>JavaScript/TypeScript代码检查</p>
            <ul>
              <li>vue-eslint-parser</li>
              <li>eslint-plugin-vue</li>
              <li>@typescript-eslint</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-logo">PRT</div>
            <h3>Prettier</h3>
            <p>代码自动格式化</p>
            <ul>
              <li>一致的代码风格</li>
              <li>支持多种语言</li>
              <li>与ESLint集成</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-logo">HKY</div>
            <h3>Husky</h3>
            <p>Git钩子管理</p>
            <ul>
              <li>提交前代码检查</li>
              <li>自动格式化</li>
              <li>阻止不规范提交</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <h3>Vue代码规范总结</h3>
        <div class="principles">
          <div class="principle">
            <div class="principle-icon">💡</div>
            <p>一致性 > 个人偏好</p>
          </div>
          <div class="principle">
            <div class="principle-icon">🧠</div>
            <p>可读性 > 简洁性</p>
          </div>
          <div class="principle">
            <div class="principle-icon">🚀</div>
            <p>维护性 > 开发速度</p>
          </div>
        </div>
        <p class="footer-note">遵循规范不是约束，而是团队协作的基础</p>
      </div>
      <div class="footer-actions">
        <button class="print-btn" @click="printGuide">打印规范文档</button>
        <button class="config-btn">生成配置文件</button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tocItems = ref([
  { id: 'naming', title: '命名规范', description: '组件、Props、变量命名规则' },
  { id: 'structure', title: '组件结构', description: '单文件组件组织顺序' },
  { id: 'reactivity', title: '响应式数据', description: 'ref/reactive使用规范' },
  { id: 'templates', title: '模板规范', description: '指令使用与格式化' },
  { id: 'styling', title: '代码风格', description: 'TypeScript与样式指南' },
  { id: 'best-practices', title: '最佳实践', description: '组件设计与性能优化' },
  { id: 'tools', title: '工具推荐', description: '自动化规范检查工具' }
]);

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const printGuide = () => {
  window.print();
};
</script>

<style lang="less" scoped>


:root {
  --primary-color: #42b883;
  --primary-light: #e8f8f2;
  --secondary-color: #35495e;
  --accent-color: #ff7e67;
  --light-bg: #f8f9fa;
  --card-bg: #ffffff;
  --border-color: #eaeaea;
  --text-dark: #2c3e50;
  --text-light: #6c757d;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --bad-example: #ffebee;
  --good-example: #e8f5e9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.code-standards-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text-dark);
  line-height: 1.6;
  background-color: var(--light-bg);
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);

  .title-section {
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--secondary-color);
      margin-bottom: 0.5rem;

      .highlight {
        color: var(--primary-color);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
          border-radius: 2px;
        }
      }
    }

    .subtitle {
      font-size: 1.25rem;
      color: var(--text-light);
      font-weight: 400;
      max-width: 600px;
    }
  }

  .stats-card {
    display: flex;
    gap: 1.5rem;
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);

    .stat-item {
      text-align: center;

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: var(--text-light);
      }
    }
  }
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-light);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background-color: var(--primary-color);
  }
}

.toc-section {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-sm);

  .toc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .toc-item {
      display: flex;
      gap: 1rem;
      padding: 1.25rem;
      border-radius: var(--radius-sm);
      background: var(--light-bg);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;

      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-sm);
        border-color: var(--primary-color);
        background: var(--primary-light);
      }

      .toc-number {
        width: 36px;
        height: 36px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .toc-content {
        h3 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
          color: var(--secondary-color);
        }

        p {
          font-size: 0.9rem;
          color: var(--text-light);
          margin: 0;
        }
      }
    }
  }
}

.standards-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.standard-section {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .section-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      background: var(--primary-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 1.8rem;
      color: var(--secondary-color);
    }
  }

  .section-desc {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 2rem;
    padding-left: 72px;
  }
}

.standard-card {
  margin-bottom: 2.5rem;

  h3 {
    font-size: 1.4rem;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '';
      width: 12px;
      height: 12px;
      background: var(--primary-color);
      border-radius: 50%;
      display: inline-block;
    }
  }

  .why-text {
    background: var(--primary-light);
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
    margin-bottom: 1.25rem;
    font-weight: 500;
    color: var(--primary-color);
    border-left: 3px solid var(--primary-color);
  }
}

.example-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  .bad-practice,
  .good-practice {
    border-radius: var(--radius-sm);
    overflow: hidden;

    h4 {
      padding: 0.75rem 1rem;
      font-size: 1.1rem;
      margin: 0;
    }
  }

  .bad-practice {
    border: 1px solid #ffcdd2;

    h4 {
      background: #ffebee;
      color: #c62828;
    }
  }

  .good-practice {
    border: 1px solid #c8e6c9;

    h4 {
      background: var(--good-example);
      color: #2e7d32;
    }
  }
}

.full-example {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.code-block {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1.25rem;
  margin: 0;
  font-size: 0.9rem;
  font-family: 'JetBrains Mono', monospace;
  overflow-x: auto;
  line-height: 1.5;

  // 语法高亮（简化版）
  .tag {
    color: #e06c75;
  }

  .attr {
    color: #d19a66;
  }

  .str {
    color: #98c379;
  }

  .key {
    color: #61afef;
  }

  .com {
    color: #5c6370;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  .practice-card {
    background: var(--primary-light);
    border-radius: var(--radius-sm);
    padding: 1.75rem 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-sm);
    }

    .practice-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.5rem;
        position: relative;

        &::marker {
          color: var(--primary-color);
        }
      }
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  .tool-card {
    background: var(--card-bg);
    border-radius: var(--radius-sm);
    padding: 1.75rem;
    border: 1px solid var(--border-color);

    .tool-logo {
      width: 60px;
      height: 60px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.25rem;
      margin-bottom: 1.25rem;
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      color: var(--secondary-color);
    }

    p {
      color: var(--text-light);
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    ul {
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.5rem;
        color: var(--text-light);
        font-size: 0.95rem;
      }
    }
  }
}

.footer {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2.5rem;
  margin-top: 3rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  .footer-content {
    flex: 1;
    min-width: 300px;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--secondary-color);
    }

    .principles {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 1.5rem;

      .principle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
        background: var(--light-bg);
        border-radius: 50px;

        .principle-icon {
          font-size: 1.5rem;
        }

        p {
          font-weight: 500;
          margin: 0;
        }
      }
    }

    .footer-note {
      font-style: italic;
      color: var(--text-light);
      font-size: 1.1rem;
      max-width: 600px;
    }
  }

  .footer-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 250px;

    button {
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .print-btn {
      background: var(--primary-color);
      color: white;

      &:hover {
        background: darken(#42b883, 8%);
      }
    }

    .config-btn {
      background: var(--secondary-color);
      color: white;

      &:hover {
        background: lighten(#35495e, 8%);
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .example-container {
    grid-template-columns: 1fr;
  }

  .toc-grid {
    grid-template-columns: 1fr;
  }

  .standard-section {
    padding: 1.5rem;
  }

  .footer {
    flex-direction: column;
  }
}

@media print {

  .header,
  .toc-section,
  .footer-actions {
    display: none;
  }

  .code-standards-container {
    padding: 0;
    background: white;
  }

  .standard-section {
    box-shadow: none;
    border: 1px solid #eee;
    page-break-inside: avoid;
  }
}
</style>
