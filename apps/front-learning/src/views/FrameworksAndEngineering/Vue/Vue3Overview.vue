<template>
  <div class="vue3-intro">
    <header class="page-header">
      <h1 class="title">Vue 3 全面解析</h1>
      <p class="subtitle">下一代渐进式JavaScript框架</p>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="section in sections"
            :key="section.id"
            :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)"
          >
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <section id="overview" class="content-section">
          <h2>Vue 3 概述</h2>
          <p>Vue 3是Vue.js框架的最新主要版本，于2020年9月正式发布。它带来了显著的性能改进、更好的TypeScript支持以及全新的组合式API。</p>

          <div class="feature-grid">
            <div class="feature-card">
              <h3>更小</h3>
              <p>通过Tree-shaking优化，打包体积减少41%</p>
            </div>
            <div class="feature-card">
              <h3>更快</h3>
              <p>基于Proxy的响应式系统，性能提升显著</p>
            </div>
            <div class="feature-card">
              <h3>更强</h3>
              <p>组合式API提供更好的逻辑复用和代码组织</p>
            </div>
          </div>
        </section>

        <section id="features" class="content-section">
          <h2>核心功能</h2>

          <h3>组合式API</h3>
          <p>组合式API是Vue 3最重要的特性之一，它解决了Options API在复杂组件中的代码组织问题。</p>

          <div class="code-example">
            <pre><code>{{ compositionApiExample }}</code></pre>
          </div>

          <h3>响应式系统重构</h3>
          <p>使用ES6 Proxy替代Object.defineProperty，支持更多数据结构，性能更好。</p>

          <h3>更好的TypeScript支持</h3>
          <p>Vue 3完全使用TypeScript重写，提供更好的类型推断和开发体验。</p>

          <h3>Teleport组件</h3>
          <p>允许将子组件渲染到DOM中的任何位置，非常适合模态框、通知等场景。</p>

          <h3>Fragment</h3>
          <p>组件可以包含多个根节点，无需额外的包装元素。</p>

          <h3>Suspense</h3>
          <p>提供更好的异步组件加载体验，可以定义加载状态。</p>
        </section>

        <section id="syntax" class="content-section">
          <h2>新写法与API</h2>

          <h3>setup函数</h3>
          <p>setup是组合式API的入口点，在组件创建之前执行。</p>

          <div class="code-example">
            <pre><code>{{ setupExample }}</code></pre>
          </div>

          <h3>响应式API</h3>
          <ul>
            <li><code>ref</code> - 创建响应式基本类型值</li>
            <li><code>reactive</code> - 创建响应式对象</li>
            <li><code>computed</code> - 创建计算属性</li>
            <li><code>watch</code> - 创建侦听器</li>
          </ul>

          <h3>生命周期钩子</h3>
          <p>Vue 3提供了与Options API对应的组合式API生命周期钩子：</p>

          <div class="lifecycle-grid">
            <div class="lifecycle-item">
              <h4>Options API</h4>
              <ul>
                <li>beforeCreate</li>
                <li>created</li>
                <li>beforeMount</li>
                <li>mounted</li>
                <li>beforeUpdate</li>
                <li>updated</li>
                <li>beforeUnmount</li>
                <li>unmounted</li>
              </ul>
            </div>
            <div class="lifecycle-item">
              <h4>Composition API</h4>
              <ul>
                <li>setup</li>
                <li>onBeforeMount</li>
                <li>onMounted</li>
                <li>onBeforeUpdate</li>
                <li>onUpdated</li>
                <li>onBeforeUnmount</li>
                <li>onUnmounted</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="implementation" class="content-section">
          <h2>底层实现</h2>

          <h3>基于Proxy的响应式系统</h3>
          <p>Vue 3使用ES6 Proxy重构响应式系统，解决了Vue 2中Object.defineProperty的局限性：</p>
          <ul>
            <li>支持数组索引和长度变化检测</li>
            <li>支持Map、Set、WeakMap、WeakSet</li>
            <li>支持动态添加和删除属性</li>
            <li>性能更好，特别是在大型对象上</li>
          </ul>

          <h3>编译器优化</h3>
          <p>Vue 3的编译器进行了多项优化：</p>
          <ul>
            <li><strong>静态树提升</strong> - 将静态节点提升到渲染函数外</li>
            <li><strong>静态属性提升</strong> - 将静态属性提升到渲染函数外</li>
            <li><strong>Patch Flags</strong> - 在虚拟DOM更新时标记动态节点</li>
            <li><strong>Tree-shaking支持</strong> - 未使用的功能不会打包到最终产物中</li>
          </ul>

          <h3>新的虚拟DOM</h3>
          <p>Vue 3重写了虚拟DOM实现，优化了diff算法，减少了不必要的比较和更新。</p>
        </section>

        <section id="performance" class="content-section">
          <h2>性能提升</h2>

          <div class="performance-stats">
            <div class="stat-item">
              <div class="stat-value">41%</div>
              <div class="stat-label">更小的打包体积</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">55%</div>
              <div class="stat-label">更快的渲染速度</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">133%</div>
              <div class="stat-label">更快的更新速度</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">2.5x</div>
              <div class="stat-label">更少的内存使用</div>
            </div>
          </div>

          <h3>Tree-shaking</h3>
          <p>Vue 3的模块化架构支持Tree-shaking，这意味着如果你不使用某些功能（如transition、keep-alive），它们将不会包含在你的最终打包文件中。</p>

          <h3>编译时优化</h3>
          <p>Vue 3编译器在编译时进行更多优化，生成更高效的渲染代码，减少运行时开销。</p>

          <h3>更快的初始化和更新</h3>
          <p>基于Proxy的响应式系统和优化的虚拟DOM diff算法使得初始化和更新性能显著提升。</p>
        </section>

        <section class="conclusion-section">
          <h2>总结</h2>
          <p>Vue 3代表了Vue框架的重要演进，它不仅提供了更好的性能和更小的体积，还通过组合式API解决了复杂应用中的代码组织问题。其优秀的TypeScript支持和新的内置组件（如Teleport和Suspense）进一步增强了开发体验。</p>
          <p>对于新项目，强烈推荐使用Vue 3；对于现有Vue 2项目，Vue团队提供了详细的迁移指南和兼容性构建版本，使迁移过程尽可能平滑。</p>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>Vue 3 - 构建用户界面的渐进式框架</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 响应式数据
const activeSection = ref('overview');

// 代码示例
const compositionApiExample = `
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };

    onMounted(() => {
      console.log('Component mounted');
    });

    return {
      count,
      doubleCount,
      increment
    };
  }
};
`.trim();

const setupExample = `
import { ref, reactive, toRefs } from 'vue';

// 使用setup函数
export default {
  setup(props, context) {
    const state = reactive({
      count: 0,
      name: 'Vue 3'
    });

    const message = ref('Hello');

    const increment = () => {
      state.count++;
    };

    // 使用toRefs保持响应式
    return {
      ...toRefs(state),
      message,
      increment
    };
  }
};
`.trim();

// 章节数据
const sections = [
  { id: 'overview', title: 'Vue 3 概述' },
  { id: 'features', title: '核心功能' },
  { id: 'syntax', title: '新写法与API' },
  { id: 'implementation', title: '底层实现' },
  { id: 'performance', title: '性能提升' }
];

// 滚动到指定章节
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动以更新活动章节
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #42b883;
@primary-dark: #347474;
@text-color: #2c3e50;
@text-light: #6a8bad;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@code-bg: #f6f8fa;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

// 基础样式
.vue3-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @bg-color;
  min-height: 100vh;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, @primary-color 0%, @primary-dark 100%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin: 0;
  }
}

// 内容布局
.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// 导航侧边栏
.nav-sidebar {
  width: 250px;
  flex-shrink: 0;
  margin-right: 2rem;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 0.75rem 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;

      &:hover {
        background-color: lighten(@sidebar-bg, 1%);
        color: @primary-color;
      }

      &.active {
        background-color: white;
        color: @primary-color;
        border-left-color: @primary-color;
        font-weight: 600;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 800px;
}

// 内容区块
.content-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: @shadow;

  h2 {
    font-size: 1.75rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

// 特性网格
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .feature-card {
    padding: 1.5rem;
    background: @sidebar-bg;
    border-radius: 6px;
    text-align: center;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      color: @primary-color;
      margin-top: 0;
      font-size: 1.25rem;
    }

    p {
      margin-bottom: 0;
      color: @text-light;
    }
  }
}

// 代码示例
.code-example {
  margin: 1.5rem 0;

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 1.25rem;
    overflow-x: auto;
    border: 1px solid @border-color;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      color: @text-color;
    }
  }
}

// 生命周期网格
.lifecycle-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;

  .lifecycle-item {
    padding: 1.5rem;
    background: @sidebar-bg;
    border-radius: 6px;

    h4 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      margin-bottom: 0;

      li {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.9rem;
      }
    }
  }
}

// 性能统计
.performance-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .stat-item {
    text-align: center;
    padding: 1.5rem;
    background: @sidebar-bg;
    border-radius: 6px;

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.9rem;
    }
  }
}

// 结论部分
.conclusion-section {
  background: linear-gradient(135deg, @sidebar-bg 0%, #e6f7ff 100%);
  border-left: 4px solid @primary-color;
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;
  font-size: 0.9rem;
}

// 响应式设计
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1.5rem;
    position: static;
  }

  .feature-grid,
  .lifecycle-grid,
  .performance-stats {
    grid-template-columns: 1fr;
  }

  .page-header {
    padding: 2rem 1rem;

    .title {
      font-size: 2rem;
    }
  }
}
</style>
