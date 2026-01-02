<template>
  <div class="keep-alive-container">
    <header class="header">
      <h1>Vue Keep-Alive 原理基础介绍</h1>
      <p>组件缓存与状态保持机制解析</p>
    </header>

    <div class="content">
      <div class="columns">
        <section class="section">
          <h2>核心概念</h2>
          <div class="card">
            <h3>什么是 Keep-Alive?</h3>
            <p>Keep-Alive 是 Vue 内置的抽象组件，用于缓存不活动的组件实例，避免重复渲染，保留组件状态</p>
          </div>
          <div class="card">
            <h3>解决的问题</h3>
            <ul>
              <li>组件切换时的状态丢失问题</li>
              <li>重复渲染导致的性能开销</li>
              <li>复杂组件初始化耗时问题</li>
            </ul>
          </div>
          <div class="card">
            <h3>生命周期变化</h3>
            <div class="lifecycle">
              <div class="phase">
                <h4>初次加载</h4>
                <p>created → mounted → activated</p>
              </div>
              <div class="phase">
                <h4>离开缓存</h4>
                <p>deactivated</p>
              </div>
              <div class="phase">
                <h4>再次激活</h4>
                <p>activated</p>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>实现原理</h2>
          <div class="card">
            <h3>缓存数据结构</h3>
            <p>使用 Map 或 Object 存储缓存实例</p>
            <pre class="inline-code">cache: Map&lt;string, VNode&gt;</pre>
          </div>
          <div class="card">
            <h3>LRU 缓存策略</h3>
            <p>当缓存实例数量超过 max 时，移除最久未使用的实例</p>
            <div class="lru-visual">
              <div v-for="(item, idx) in lruVisual" :key="idx" class="lru-item">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="card">
            <h3>渲染机制</h3>
            <ol>
              <li>在渲染阶段获取子组件 VNode</li>
              <li>检查组件名称是否匹配 include/exclude</li>
              <li>命中缓存时直接返回缓存的 VNode</li>
              <li>未命中则渲染新实例并缓存</li>
            </ol>
          </div>
        </section>
      </div>

      <section class="section">
        <h2>代码实现</h2>
        <div class="code-group">
          <div class="code-block">
            <h3>基本使用</h3>
            <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;button @click="currentTab = 'TabA'"&gt;Tab A&lt;/button&gt;
    &lt;button @click="currentTab = 'TabB'"&gt;Tab B&lt;/button&gt;

    &lt;KeepAlive&gt;
      &lt;component :is="currentTab" /&gt;
    &lt;/KeepAlive&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, shallowRef } from 'vue';
import TabA from './TabA.vue';
import TabB from './TabB.vue';

const currentTab = ref('TabA');
&lt;/script&gt;</code></pre>
          </div>

          <div class="code-block">
            <h3>高级配置</h3>
            <pre><code>&lt;KeepAlive
  :max="5"
  :include="['TabA', 'TabC']"
  :exclude="['TabB']"
&gt;
  &lt;component :is="currentComponent" /&gt;
&lt;/KeepAlive&gt;

// 组件内生命周期钩子
onActivated(() => {
  console.log('组件被激活');
});

onDeactivated(() => {
  console.log('组件被停用');
});</code></pre>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>使用场景</h2>
        <div class="usage-grid">
          <div class="usage-card">
            <div class="icon">📱</div>
            <h3>移动端页面</h3>
            <p>缓存标签页内容，提升切换流畅度</p>
          </div>
          <div class="usage-card">
            <div class="icon">📊</div>
            <h3>数据仪表盘</h3>
            <p>保持图表状态和滚动位置</p>
          </div>
          <div class="usage-card">
            <div class="icon">🔍</div>
            <h3>复杂表单</h3>
            <p>缓存用户已填写内容</p>
          </div>
          <div class="usage-card">
            <div class="icon">🌐</div>
            <h3>SPA 应用</h3>
            <p>优化路由切换性能</p>
          </div>
        </div>
      </section>

      <section class="section demo-section">
        <h2>缓存效果演示</h2>
        <div class="demo-container">
          <div class="tabs">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
              :class="{ active: activeTab === tab.id }">
              {{ tab.name }}
            </button>
          </div>

          <div class="demo-content">
            <KeepAlive :max="3">
              <component :is="activeComponent" :key="activeTab" />
            </KeepAlive>
          </div>

          <div class="cache-info">
            <h3>缓存状态</h3>
            <div class="cache-list">
              <div v-for="(cached, idx) in cachedComponents" :key="idx" class="cache-item">
                {{ cached }}
              </div>
              <div v-if="cachedComponents.length === 0" class="empty-cache">
                暂无缓存组件
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

// 标签页数据
const tabs = ref([
  { id: 'TabA', name: '标签页A' },
  { id: 'TabB', name: '标签页B' },
  { id: 'TabC', name: '标签页C' },
  { id: 'TabD', name: '标签页D' },
]);

const activeTab = ref('TabA');
const activeComponent = computed(() => activeTab.value);

// 缓存的组件列表（模拟）
const cachedComponents = ref<string[]>([]);

// LRU 可视化数据
const lruVisual = ref(['CompA', 'CompB', 'CompC', 'CompD']);

// 模拟缓存状态更新
onMounted(() => {
  setInterval(() => {
    // 随机更新缓存顺序
    if (lruVisual.value.length > 0) {
      const randomIdx = Math.floor(Math.random() * lruVisual.value.length);
      const item = lruVisual.value.splice(randomIdx, 1)[0];
      lruVisual.value.unshift(item);
    }

    // 更新缓存组件列表
    cachedComponents.value = lruVisual.value.slice(0, 3);
  }, 2000);
});
</script>

<style lang="less" scoped>
.keep-alive-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-top: 0;
  }
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p,
  li {
    color: #5a6b7c;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 0.8rem 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
}

.lifecycle {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  .phase {
    flex: 1;
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;

    h4 {
      margin: 0 0 0.5rem;
      color: #0369a1;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
    }
  }
}

.inline-code {
  display: inline-block;
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.lru-visual {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  .lru-item {
    flex: 1;
    background: linear-gradient(135deg, #a5b4fc, #818cf8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-radius: 6px;
    font-weight: bold;
    transition: all 0.5s ease;

    &:first-child {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      transform: scale(1.05);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
}

.code-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;

  h3 {
    margin-top: 0;
    color: #e2e8f0;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.usage-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 10px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0 0 0.8rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.5;
    font-size: 0.95rem;
  }
}

.demo-section {
  background: #f9fafb;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  button {
    padding: 0.75rem 1.5rem;
    background: #e2e8f0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
      background: #cbd5e1;
    }

    &.active {
      background: #4f46e5;
      color: white;
    }
  }
}

.demo-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  min-height: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #4b5563;
}

.cache-info {
  background: #edf2ff;
  border-radius: 8px;
  padding: 1.2rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4f46e5;
  }
}

.cache-list {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.cache-item {
  background: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.empty-cache {
  color: #94a3b8;
  font-style: italic;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }

  .lifecycle {
    flex-direction: column;
  }
}
</style>
