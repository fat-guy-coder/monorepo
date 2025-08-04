<template>
  <div class="weak-collection-guide">
    <!-- 导航区 -->
    <nav class="guide-nav">
      <h1>🗺️ ES Weak Collections指南</h1>
      <div class="nav-links">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
          class="nav-link">
          {{ section.title }}
        </a>
      </div>
    </nav>

    <!-- 详细介绍 -->
    <section id="weak-app" class="content-section">
      <h2>📖 ES 弱引用应用</h2>
      <p>弱引用（WeakRef）是一种特殊的引用类型，它允许你持有对对象的引用，但不会阻止该对象被垃圾回收。以下是一些弱引用的应用场景：</p>
      <ul>
        <li><strong>缓存机制：</strong>可以用来缓存大型对象，避免内存泄漏。</li>
        <li><strong>事件监听：</strong>在某些情况下，可以使用弱引用来避免内存泄漏，确保对象在不再需要时被回收。</li>
        <li><strong>数据绑定：</strong>在框架中，弱引用可以帮助管理数据绑定，确保不再使用的对象能够被回收。</li>
      </ul>
      <p>使用弱引用时，需要注意对象的生命周期，确保在使用前检查对象是否仍然存在。</p>
    </section>

    <!-- 内容区 -->
    <main class="guide-content">
      <!-- 核心概念 -->
      <section id="concept" class="content-section">
        <h2>💡 核心概念</h2>
        <div class="concept-grid">
          <div class="concept-card" v-for="item in concepts" :key="item.title">
            <div class="concept-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 使用对比 -->
      <section id="compare" class="content-section">
        <h2>⚖️ 特性对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>WeakMap</th>
                <th>WeakSet</th>
                <th>WeakRef</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonData" :key="row.label">
                <td>{{ row.label }}</td>
                <td :class="{ yes: row.weakmap }">✔️</td>
                <td :class="{ yes: row.weakset }">✔️</td>
                <td :class="{ yes: row.weakref }">✔️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 使用示例 -->
      <section id="usage" class="content-section">
        <h2>🛠️ 使用示例</h2>
        <div class="code-examples">
          <div class="example-card">
            <h3>WeakMap 示例</h3>
            <pre><code class="language-ts">// 私有数据存储
const privateData = new WeakMap&lt;object, { count: number }&gt;();

class Counter {
  constructor() {
    privateData.set(this, { count: 0 });
  }

  increment() {
    const data = privateData.get(this)!;
    data.count++;
  }

  get count() {
    return privateData.get(this)!.count;
  }
}</code></pre>
          </div>

          <div class="example-card">
            <h3>WeakRef 示例</h3>
            <pre><code class="language-ts">// 缓存大型对象
let cache: WeakRef&lt;LargeObject&gt; | null = null;

function getLargeObject() {
  let obj = cache?.deref();
  if (!obj) {
    obj = new LargeObject();
    cache = new WeakRef(obj);
  }
  return obj;
}</code></pre>
          </div>
        </div>
      </section>

      <!-- WeakRef 业务场景介绍 -->
      <section id="scenarios" class="content-section">
        <h2>💡 业务场景举例：WeakRef 的实际应用</h2>
        <div class="scenario-list">
          <div class="scenario-card">
            <h3>1. 大型对象缓存（如图片、数据模型）</h3>
            <p>
              在前端应用中，某些大型对象（如图片、音频、复杂数据模型）加载和创建成本较高。通过 <code>WeakRef</code> 缓存这些对象，可以在内存充足时复用，内存紧张时让垃圾回收自动释放，避免内存泄漏。
            </p>
            <pre><code class="language-ts">// 图片缓存示例
let imageCache: WeakRef&lt;HTMLImageElement&gt; | null = null;

function getImage() {
  let img = imageCache?.deref();
  if (!img) {
    img = new window.Image();
    img.src = 'large.jpg';
    imageCache = new WeakRef(img);
  }
  return img;
}</code></pre>
          </div>
          <div class="scenario-card">
            <h3>2. 编辑器/画布中的临时对象管理</h3>
            <p>
              在富文本编辑器、画布绘图等场景中，可能会频繁创建和销毁临时对象（如选区、浮动工具栏等）。使用 <code>WeakRef</code> 可以让这些对象在不再被引用时自动回收，提升性能和内存利用率。
            </p>
          </div>
          <div class="scenario-card">
            <h3>3. 事件监听与回调弱引用</h3>
            <p>
              某些框架或库需要为对象注册事件监听或回调，但又不希望这些引用阻止对象被回收。通过 <code>WeakRef</code> 持有回调目标，可以避免内存泄漏。
            </p>
            <pre><code class="language-ts">// 伪代码：弱引用回调
class ListenerHolder {
  private ref: WeakRef&lt;object&gt;;
  constructor(obj: object) {
    this.ref = new WeakRef(obj);
  }
  notify() {
    const target = this.ref.deref();
    if (target) {
      // 目标对象还存在，执行回调
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section id="notice" class="content-section">
        <h2>⚠️ 注意事项</h2>
        <div class="notice-grid">
          <div class="notice-card" v-for="(note, index) in notices" :key="index">
            <div class="notice-header">{{ note.icon }} {{ note.title }}</div>
            <p>{{ note.content }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sections = ref([
  { id: 'concept', title: '核心概念' },
  { id: 'compare', title: '特性对比' },
  { id: 'usage', title: '使用示例' },
  { id: 'notice', title: '注意事项' }
]);

const concepts = ref([
  {
    icon: '🗺️',
    title: '弱引用',
    desc: '不影响垃圾回收机制，不阻止内存回收'
  },
  {
    icon: '🧩',
    title: '不可枚举',
    desc: '没有迭代方法，无法获取所有键/值'
  },
  {
    icon: '🎯',
    title: '对象专属',
    desc: '只能使用对象作为键（WeakMap）或元素（WeakSet）'
  }
]);

const comparisonData = ref([
  { label: '允许原始值', weakmap: false, weakset: false, weakref: false },
  { label: '自动内存回收', weakmap: true, weakset: true, weakref: true },
  { label: '可迭代', weakmap: false, weakset: false, weakref: false },
  { label: '大小可获取', weakmap: false, weakset: false, weakref: false }
]);

const notices = ref([
  {
    icon: '🚫',
    title: '不可遍历',
    content: '没有size属性，不能使用forEach等迭代方法'
  },
  {
    icon: '💡',
    title: '内存管理',
    content: '适合存储临时数据，依赖GC行为，不适合精确控制'
  },
  {
    icon: '🌐',
    title: '浏览器支持',
    content: 'WeakRef需要较新的运行时环境（Node 14+, 现代浏览器）'
  },
  {
    icon: '⏳',
    title: '生命周期',
    content: '被引用对象可能在任意时刻被回收，使用前需检查存在性'
  }
]);

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
</script>

<style scoped lang="less">
.weak-collection-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.guide-nav {
  background: linear-gradient(135deg, #2c3e50, #4a627a);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 1.5rem;
    font-size: 2rem;
    text-align: center;
  }

  .nav-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  scroll-margin-top: 1rem;

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    border-left: 4px solid #4a627a;
    padding-left: 1rem;
    margin: 2rem 0;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  .concept-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
}

.comparison-table {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: center;
      border: 1px solid #eee;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
    }

    .yes {
      color: #27ae60;
      font-weight: bold;
    }
  }
}

.code-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;

  h3 {
    margin: 0;
    padding: 1rem;
    background: #e9ecef;
    font-size: 1.1rem;
  }

  pre {
    margin: 0;
    padding: 1rem;
    font-size: 0.9rem;
    overflow-x: auto;
  }
}

.notice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.notice-card {
  background: #fff5f5;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #ff6b6b;

  .notice-header {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #ff6b6b;
  }

  p {
    margin: 0;
    color: #666;
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .weak-collection-guide {
    padding: 1rem;
  }

  .guide-nav .nav-links {
    flex-direction: column;
  }

  .example-card {
    margin-bottom: 1.5rem;
  }
}

pre code {
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
  color: #2c3e50;
}
</style>
