<template>
  <div class="optimization-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1>Vue3 性能优化指南</h1>
      <p class="subtitle">提升应用性能的核心技巧与实践</p>
    </header>

    <!-- 搜索和过滤 -->
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="搜索优化技巧..." class="search-input">
      <div class="filter-tags">
        <span v-for="tag in tags" :key="tag" :class="{ active: activeTag === tag }" @click="toggleTag(tag)" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- 优化技巧列表 -->
    <div class="optimization-list">
      <!-- 响应式优化 -->
      <section class="category">
        <h2 class="category-title">响应式系统优化</h2>
        <div class="technique-grid">
          <OptimizationTechnique v-for="tech in filteredTechniques('响应式')" :key="tech.title" :technique="tech" />
        </div>
      </section>

      <!-- 编译优化 -->
      <section class="category">
        <h2 class="category-title">编译优化</h2>
        <div class="technique-grid">
          <OptimizationTechnique v-for="tech in filteredTechniques('编译')" :key="tech.title" :technique="tech" />
        </div>
      </section>

      <!-- 组件优化 -->
      <section class="category">
        <h2 class="category-title">组件优化</h2>
        <div class="technique-grid">
          <OptimizationTechnique v-for="tech in filteredTechniques('组件')" :key="tech.title" :technique="tech" />
        </div>
      </section>

      <!-- 渲染优化 -->
      <section class="category">
        <h2 class="category-title">渲染优化</h2>
        <div class="technique-grid">
          <OptimizationTechnique v-for="tech in filteredTechniques('渲染')" :key="tech.title" :technique="tech" />
        </div>
      </section>

      <!-- 打包优化 -->
      <section class="category">
        <h2 class="category-title">打包优化</h2>
        <div class="technique-grid">
          <OptimizationTechnique v-for="tech in filteredTechniques('打包')" :key="tech.title" :technique="tech" />
        </div>
      </section>
    </div>

    <!-- 性能对比 -->
    <div class="performance-comparison">
      <h2>Vue2 vs Vue3 性能对比</h2>
      <div class="charts">
        <div class="chart">
          <h3>更新速度 (操作/秒)</h3>
          <div class="chart-bars">
            <div class="bar-container">
              <div class="bar-label">Vue2</div>
              <div class="bar" style="height: 70%; background: #e74c3c;"></div>
              <div class="bar-value">12,000</div>
            </div>
            <div class="bar-container">
              <div class="bar-label">Vue3</div>
              <div class="bar" style="height: 100%; background: #2ecc71;"></div>
              <div class="bar-value">18,000</div>
            </div>
          </div>
        </div>
        <div class="chart">
          <h3>内存占用 (MB)</h3>
          <div class="chart-bars">
            <div class="bar-container">
              <div class="bar-label">Vue2</div>
              <div class="bar" style="height: 100%; background: #e74c3c;"></div>
              <div class="bar-value">3.2</div>
            </div>
            <div class="bar-container">
              <div class="bar-label">Vue3</div>
              <div class="bar" style="height: 75%; background: #2ecc71;"></div>
              <div class="bar-value">2.4</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Vue3 性能优化指南 © {{ new Date().getFullYear() }}</p>
      <p>共收录 {{ techniques.length }} 个优化技巧 | 最后更新: 2023-10-15</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import OptimizationTechnique from '../Components/OptimizationTechnique.vue';

// 搜索查询和活动标签
const searchQuery = ref('');
const activeTag = ref('全部');
const tags = ref(['全部', '响应式', '编译', '组件', '渲染', '打包']);

// 优化技巧数据
const techniques = ref([
  // 响应式优化
  {
    title: '使用 ref 代替 reactive',
    category: '响应式',
    reason: 'ref 更适合基本类型，避免不必要的对象包装',
    code: `// 推荐
const count = ref(0);

// 不推荐
const state = reactive({ count: 0 });`,
    vue2Comparison: 'Vue2 使用 data 对象',
    impact: '减少响应式对象开销'
  },
  {
    title: '合理使用 shallowRef',
    category: '响应式',
    reason: '避免深层响应式转换带来的性能开销',
    code: `const largeObject = shallowRef({ ... });
// 只跟踪 .value 变化，不深度转换`,
    vue2Comparison: 'Vue2 无直接替代',
    impact: '减少大型对象的响应式开销'
  },
  {
    title: '避免不必要的响应式',
    category: '响应式',
    reason: '非响应式数据无需使用 ref/reactive',
    code: `// 静态数据，不需要响应式
const PI = 3.14;`,
    vue2Comparison: 'Vue2 中所有 data 都是响应式',
    impact: '减少响应式系统负担'
  },
  {
    title: '使用 computed 缓存',
    category: '响应式',
    reason: '避免重复计算相同值',
    code: `const fullName = computed(() => {
  return firstName.value + ' ' + lastName.value;
});`,
    vue2Comparison: 'Vue2 同样可用',
    impact: '减少重复计算'
  },

  // 编译优化
  {
    title: '静态节点提升',
    category: '编译',
    reason: '避免重复创建不变节点',
    code: `<template>
  <div>
    <!-- 静态节点会被提升 -->
    <h1>Static Title</h1>
    <p>{{ dynamicContent }}</p>
  </div>
</template>`,
    vue2Comparison: 'Vue2 每次重新创建所有节点',
    impact: '减少 VNode 创建开销'
  },
  {
    title: 'Patch Flags 优化',
    category: '编译',
    reason: '标记动态内容，减少 diff 范围',
    code: `// Vue3 生成的代码包含 patchFlag
createElementVNode("div", {
  class: _normalizeClass({ active: isActive })
}, null, 2 /* CLASS */)`,
    vue2Comparison: 'Vue2 无此优化',
    impact: '减少 diff 算法复杂度'
  },
  {
    title: '事件缓存',
    category: '编译',
    reason: '避免重复创建事件处理函数',
    code: `<!-- 内联函数会被缓存 -->
<button @click="count++">Increment</button>`,
    vue2Comparison: 'Vue2 每次重新创建事件处理函数',
    impact: '减少函数创建开销'
  },

  // 组件优化
  {
    title: '组件懒加载',
    category: '组件',
    reason: '减少初始包大小',
    code: `const AsyncComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
);`,
    vue2Comparison: 'Vue2 使用 () => import()',
    impact: '加快首屏加载速度'
  },
  {
    title: '使用 v-once',
    category: '组件',
    reason: '标记静态内容，避免不必要的更新',
    code: `<template>
  <div v-once>
    <h1>Static Content</h1>
  </div>
</template>`,
    vue2Comparison: 'Vue2 同样可用',
    impact: '减少更新开销'
  },
  {
    title: '避免深层组件嵌套',
    category: '组件',
    reason: '减少渲染上下文开销',
    code: `// 扁平化组件结构
<Parent>
  <ChildA />
  <ChildB />
</Parent>`,
    vue2Comparison: '同样适用',
    impact: '减少渲染层级开销'
  },
  {
    title: '使用 Teleport',
    category: '组件',
    reason: '优化 DOM 结构，避免布局混乱',
    code: `<template>
  <teleport to="body">
    <Modal />
  </teleport>
</template>`,
    vue2Comparison: 'Vue2 无此功能',
    impact: '优化渲染性能'
  },

  // 渲染优化
  {
    title: 'v-for 使用 key',
    category: '渲染',
    reason: '帮助 Vue 识别节点，减少 DOM 操作',
    code: `<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>`,
    vue2Comparison: 'Vue2 同样要求',
    impact: '减少不必要的 DOM 操作'
  },
  {
    title: '避免 v-if 和 v-for 同时使用',
    category: '渲染',
    reason: 'v-for 优先级更高，导致不必要的计算',
    code: `<!-- 不推荐 -->
<div v-for="item in items" v-if="item.active">
  {{ item.name }}
</div>

<!-- 推荐 -->
<div v-for="item in activeItems">
  {{ item.name }}
</div>`,
    vue2Comparison: 'Vue2 同样问题',
    impact: '减少不必要的循环计算'
  },
  {
    title: '使用虚拟滚动',
    category: '渲染',
    reason: '仅渲染可见区域内容',
    code: `<VirtualScroller
  :items="largeList"
  item-height="50"
>
  <template #item="{ item }">
    <div>{{ item.name }}</div>
  </template>
</VirtualScroller>`,
    vue2Comparison: '需要第三方库',
    impact: '大幅减少大列表渲染开销'
  },

  // 打包优化
  {
    title: 'Tree Shaking',
    category: '打包',
    reason: '移除未使用代码',
    code: `// 按需导入
import { ref, computed } from 'vue';`,
    vue2Comparison: 'Vue2 默认全量导入',
    impact: '减少包体积'
  },
  {
    title: '代码分割',
    category: '打包',
    reason: '拆分代码，按需加载',
    code: `// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  }
}`,
    vue2Comparison: '同样适用',
    impact: '优化首屏加载'
  },
  {
    title: '使用 Vite 替代 Webpack',
    category: '打包',
    reason: '基于 ES 模块的极速构建',
    code: `# 使用 Vite
npm create vite@latest`,
    vue2Comparison: 'Vue2 通常使用 Webpack',
    impact: '显著提升开发构建速度'
  }
]);

// 过滤技巧
const filteredTechniques = computed(() => {
  return (category: string) => {
    return techniques.value.filter(tech => {
      // 检查标签
      const tagMatch = activeTag.value === '全部' ||
        tech.category.includes(activeTag.value) ||
        activeTag.value === '全部';

      // 检查搜索查询
      const searchMatch = !searchQuery.value ||
        tech.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        tech.reason.toLowerCase().includes(searchQuery.value.toLowerCase());

      return tagMatch && searchMatch && tech.category === category;
    });
  };
});

// 切换标签
const toggleTag = (tag: string) => {
  activeTag.value = tag;
};
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #eaeaea;
@tag-bg: #e0f7ff;
@dark-tag-bg: darken(@tag-bg, 5%);

.optimization-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: darken(@primary-color, 10%);
  }

  .subtitle {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
  }
}

.controls {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .search-input {
    padding: 12px 15px;
    border: 2px solid @primary-color;
    border-radius: 30px;
    font-size: 1rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      box-shadow: 0 0 0 3px fade(@primary-color, 30%);
    }
  }
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  .tag {
    padding: 8px 15px;
    background-color: @tag-bg;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: @dark-tag-bg;
    }

    &.active {
      background-color: @primary-color;
      color: white;
      font-weight: 600;
    }
  }
}

.category {
  margin-bottom: 40px;

  .category-title {
    font-size: 1.6rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 30%);
    color: darken(@primary-color, 15%);
  }
}

.technique-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.performance-comparison {
  margin: 50px 0;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: darken(@primary-color, 10%);
  }
}

.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.chart {
  background: @light-bg;
  border-radius: 8px;
  padding: 20px;

  h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
    color: lighten(@text-color, 20%);
  }
}

.chart-bars {
  display: flex;
  justify-content: center;
  gap: 40px;
  height: 200px;
  align-items: flex-end;
}

.bar-container {
  text-align: center;
  width: 80px;

  .bar-label {
    margin-bottom: 10px;
    font-weight: 600;
  }

  .bar {
    width: 60px;
    border-radius: 4px 4px 0 0;
    transition: height 1s ease;
    margin: 0 auto;
  }

  .bar-value {
    margin-top: 10px;
    font-weight: bold;
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 40px;
  border-top: 1px solid @border-color;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;

  p {
    margin: 5px 0;
  }
}

@media (max-width: 768px) {
  .technique-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .category .category-title {
    font-size: 1.4rem;
  }

  .charts {
    grid-template-columns: 1fr;
  }
}
</style>