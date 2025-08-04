// MapDocument.vue

<template>
  <div class="map-doc-container">
    <!-- 标题部分 -->
    <header class="doc-header">
      <h1 class="title">📚 Set Map 基本指南</h1>
      <p class="subtitle">键值对集合的现代化解决方案</p>
    </header>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 概述 -->
      <section class="section overview">
        <h2 class="section-title">🌟 概述</h2>
        <div class="content-box">
          <p>Map是ES6引入的键值对集合类型，相比Object具备以下优势：</p>
          <ul class="feature-list">
            <li>🔑 键可以是任意数据类型</li>
            <li>📏 内置size属性获取元素数量</li>
            <li>🔄 保持插入顺序迭代</li>
            <li>⚡ 更优的增删查改性能</li>
          </ul>
        </div>
      </section>


      <!-- 基础用法 -->
      <section class="section basic-usage">
        <h2 class="section-title">🔨 基础用法</h2>
        <div class="code-example">
          <pre class="code-block"><code>// 初始化Map
const map = new Map();

// 添加元素
map.set('age', 25);
map.set(42, 'The Answer');

// 获取值
console.log(map.get('age')); // 25

// 检查存在
console.log(map.has(42));    // true

// 删除元素
map.delete('age');

// 清空Map
map.clear();</code></pre>
        </div>
      </section>

      <!-- 常用方法 -->
      <section class="section methods">
        <h2 class="section-title">🛠️ 常用方法</h2>
        <div class="method-grid">
          <div class="method-card">
            <h3>map.set(key, value)</h3>
            <p>添加/更新键值对，返回Map本身</p>
          </div>
          <div class="method-card">
            <h3>map.get(key)</h3>
            <p>获取对应键的值，不存在返回undefined</p>
          </div>
          <div class="method-card">
            <h3>map.has(key)</h3>
            <p>判断是否存在指定键</p>
          </div>
          <div class="method-card">
            <h3>map.delete(key)</h3>
            <p>删除指定键及其对应值</p>
          </div>
        </div>
      </section>

      <!-- 对比表格 -->
      <section class="section comparison">
        <h2 class="section-title">🆚 与Object对比</h2>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>特性</th>
              <th>Map</th>
              <th>Object</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>键类型</td>
              <td>任意值</td>
              <td>String/Symbol</td>
            </tr>
            <tr>
              <td>顺序性</td>
              <td>插入顺序</td>
              <td>无序</td>
            </tr>
            <tr>
              <td>Size获取</td>
              <td>map.size</td>
              <td>手动计算</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <!-- 遍历Map的方法 -->
    <section class="section traversal">
      <h2 class="section-title">🔍 遍历Map的方法</h2>
      <div class="content-box">
        <p>Map提供了多种遍历方法，以下是常用的几种：</p>
        <ul class="traversal-list">
          <li>
            <strong>map.forEach(callback)</strong>
            <p>对Map中的每个元素执行一次提供的函数，顺序与插入顺序一致。</p>
            <pre class="code-example"><code>
  map.forEach((value, key) => {
    console.log(key, value);
  });</code></pre>
          </li>
          <li>
            <strong>map.keys()</strong>
            <p>返回一个包含Map中所有键的迭代器。</p>
            <pre class="code-example"><code>
  for (const key of map.keys()) {
    console.log(key);
  }</code></pre>
          </li>
          <li>
            <strong>map.values()</strong>
            <p>返回一个包含Map中所有值的迭代器。</p>
            <pre class="code-example"><code>
  for (const value of map.values()) {
    console.log(value);
  }</code></pre>
          </li>
          <li>
            <strong>map.entries()</strong>
            <p>返回一个包含Map中所有键值对的迭代器。</p>
            <pre class="code-example"><code>
  for (const [key, value] of map.entries()) {
    console.log(key, value);
  }</code></pre>
          </li>
        </ul>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="section usage-scenarios">
      <h2 class="section-title">💡 Map使用场景</h2>
      <div class="usage-list">
        <div class="usage-item">
          <h3>频率统计</h3>
          <p>使用Map可以轻松统计元素出现的频率，例如在数组中统计每个元素的出现次数。</p>
          <pre class="code-block"><code>
  const array = ['apple', 'banana', 'apple', 'orange', 'banana', 'banana'];
  const frequencyMap = new Map();

  array.forEach(item => {
    frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
  });

  console.log(frequencyMap); // Map(3) { 'apple' => 2, 'banana' => 3, 'orange' => 1 }
        </code></pre>
        </div>
        <div class="usage-item">
          <h3>缓存机制</h3>
          <p>Map可以用作缓存存储，避免重复计算。例如，存储函数的计算结果以提高性能。</p>
          <pre class="code-block"><code>
  const cache = new Map();

  function expensiveCalculation(num) {
    if (cache.has(num)) {
    return cache.get(num); // 从缓存中获取结果
    }
    const result = num * num; // 假设这是一个耗时的计算
    cache.set(num, result); // 存储结果到缓存
    return result;
  }

  console.log(expensiveCalculation(5)); // 25
  console.log(expensiveCalculation(5)); // 直接从缓存获取
        </code></pre>
        </div>
        <div class="usage-item">
          <h3>数据关联</h3>
          <p>Map可以用于将键值对关联起来，例如将用户ID与用户对象关联。</p>
          <pre class="code-block"><code>
  const userMap = new Map();
  userMap.set(1, { name: 'Alice', age: 30 });
  userMap.set(2, { name: 'Bob', age: 25 });

  console.log(userMap.get(1)); // { name: 'Alice', age: 30 }
        </code></pre>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <footer class="doc-footer">
      <div class="notice">
        <h3>💡 注意事项</h3>
        <ul>
          <li>使用对象作为键时，需保持对象引用</li>
          <li>NaN可以作为Map的键</li>
          <li>优先使用forEach或for...of进行迭代</li>
        </ul>
      </div>
    </footer>
  </div>
  <div class="set-guide">
    <header class="guide-header">
      <h1 class="title">Set 基本指南</h1>
      <div class="decorative-line"></div>
    </header>

    <div class="content-wrapper">
      <!-- 定义章节 -->
      <section class="definition-section card">
        <h2 class="section-title gradient-text">📚 Set定义</h2>
        <div class="section-content">
          <p class="highlight-text">允许存储任何类型唯一值的集合，具有快速查找能力</p>
          <pre class="code-block">const set = new Set([1, 2, 3]);</pre>
        </div>
        <div class="notice">
          <p>注意：但是存入的是对象时，会以对象的内存地址作为判断依据，所以即使内容相同，也会被认为是不同的对象。</p>
        </div>
      </section>

      <!-- 核心特性 -->
      <section class="features-section card">
        <h2 class="section-title gradient-text">✨ 核心特性</h2>
        <div class="features-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-icon" :style="{ backgroundColor: feature.color }">
              {{ feature.icon }}
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <pre v-if="feature.example" class="example-code">{{ feature.example }}</pre>
          </div>
        </div>
      </section>

      <!-- 常用方法 -->
      <section class="methods-section card">
        <h2 class="section-title gradient-text">🔧 常用方法</h2>
        <div class="methods-grid">
          <div v-for="(method, index) in methods" :key="index" class="method-card">
            <div class="method-header">
              <span class="method-icon">{{ method.icon }}</span>
              <code class="method-name">{{ method.name }}</code>
            </div>
            <p class="method-desc">{{ method.description }}</p>
            <pre class="code-example">{{ method.example }}</pre>
          </div>
        </div>
      </section>

      <!-- 遍历Set的方法 -->
      <section class="section traversal-set card">
        <h2 class="section-title">🔍 遍历Set的方法</h2>
        <div class="content-box">
          <p>Set提供了多种遍历方法，以下是常用的几种：</p>
          <ul class="traversal-list">
            <li>
              <strong>set.forEach(callback)</strong>
              <p>对Set中的每个元素执行一次提供的函数，顺序与插入顺序一致。</p>
              <pre class="code-example"><code>
      set.forEach(value => {
        console.log(value);
      });</code></pre>
            </li>
            <li>
              <strong>set.values()</strong>
              <p>返回一个包含Set中所有值的迭代器。</p>
              <pre class="code-example"><code>
      for (const value of set.values()) {
        console.log(value);
      }</code></pre>
            </li>
            <li>
              <strong>set.keys()</strong>
              <p>与set.values()相同，返回一个包含Set中所有值的迭代器。</p>
              <pre class="code-example"><code>
      for (const key of set.keys()) {
        console.log(key);
      }</code></pre>
            </li>
            <li>
              <strong>set.entries()</strong>
              <p>返回一个包含Set中所有键值对的迭代器，键和值相同。</p>
              <pre class="code-example"><code>
      for (const entry of set.entries()) {
        console.log(entry);
      }</code></pre>
            </li>
          </ul>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="usage-section card">
        <h2 class="section-title gradient-text">💡 使用场景</h2>
        <div class="usage-stack">
          <div v-for="(usage, index) in useCases" :key="index" class="usage-item">
            <div class="usage-index">#{{ index + 1 }}</div>
            <div class="usage-content">
              <h3>{{ usage.scenario }}</h3>
              <pre class="code-example">{{ usage.example }}</pre>
              <p class="usage-desc">{{ usage.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Feature {
  title: string
  description: string
  icon: string
  color: string
  example?: string
}

interface Method {
  name: string
  description: string
  example: string
  icon: string
}

interface UseCase {
  scenario: string
  example: string
  description: string
}



const features: Feature[] = [
  {
    title: '值唯一性',
    description: '自动去重，使用SameValueZero算法比较',
    icon: '🔑',
    color: '#ff6b6b',
    example: 'new Set([1, 1, 2]).size // 2',
  },
  {
    title: '任意类型',
    description: '可以存储对象、函数等任意类型值',
    icon: '🎁',
    color: '#69b1ff',
    example: 'const set = new Set([{}, {}])',
  },
  {
    title: '有序迭代',
    description: '按插入顺序迭代，支持for...of遍历',
    icon: '🔄',
    color: '#42b983',
    example: 'for (const item of set) { ... }',
  },
]

const methods: Method[] = [
  {
    name: 'add(value)',
    description: '添加新元素，返回Set本身',
    example: 'set.add(4).add(5);',
    icon: '➕',
  },
  {
    name: 'has(value)',
    description: '检查值是否存在，返回布尔值',
    example: 'set.has(2); // true',
    icon: '🔍',
  },
  {
    name: 'delete(value)',
    description: '删除指定值，返回是否删除成功',
    example: 'set.delete(3); // true',
    icon: '🗑️',
  },
  {
    name: 'clear()',
    description: '清空所有元素',
    example: 'set.clear();',
    icon: '🧹',
  },
]

const useCases: UseCase[] = [
  {
    scenario: '数组去重',
    example: `const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]`,
    description: '最简洁的数组去重方案',
  },
  {
    scenario: '集合运算',
    example: `// 并集
new Set([...setA, ...setB]);
// 交集
new Set([...setA].filter(x => setB.has(x)));`,
    description: '实现数学集合操作',
  },
  {
    scenario: 'DOM元素追踪',
    example: `const clickedElements = new Set();
element.addEventListener('click', () => {
  clickedElements.add(element);
});`,
    description: '跟踪已交互的页面元素',
  },

  {
    scenario: '唯一值存储',
    example: `const uniqueValues = new Set([1, 2, 2, 3]); // Set(3) { 1, 2, 3 }`,
    description: '确保集合中的值是唯一的，避免重复。',
  },
  {
    scenario: '快速查找',
    example: `const set = new Set(['apple', 'banana', 'orange']);
    console.log(set.has('banana')); // true`,
    description: 'Set提供快速的查找能力，适合需要频繁检查存在性的场景。',
  },

]
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;500&family=Roboto:wght@300;500;700&display=swap');

@primary-color: #2c3e50;
@secondary-color: #42b983;
@accent-color: #ff6b6b;
@code-bg: #f8f9fa;

.notice {
  color: #ff6b6b;
}

li,
p,
td,
pre,
h3 {
  color: #000;
}

.code-block {
  color: #000;
}

.map-doc-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 2rem;

    .title {
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
      text-decoration: underline;
      text-decoration-color: #3498db;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.2rem;
    }
  }

  .doc-content {
    .section {
      margin-bottom: 2.5rem;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      .section-title {
        color: #3498db;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #eee;
      }

      .code-example {
        background: #2c3e50;
        border-radius: 6px;
        padding: 1rem;
        overflow-x: auto;

        .code-block {
          color: #000;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }
      }

      .method-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;

        .method-card {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 6px;
          transition: transform 0.2s;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          }

          h3 {
            color: #e74c3c;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
          }

          p {
            color: #7f8c8d;
            font-size: 0.9rem;
          }
        }
      }

      .comparison-table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #3498db;
          color: white;
        }

        tr:nth-child(even) {
          background: #f8f9fa;
        }
      }
    }
  }

  .doc-footer {
    margin-top: 2rem;
    padding: 1rem;
    background: #fff3cd;
    border-radius: 8px;
    border-left: 4px solid #ffc107;

    .notice {
      h3 {
        color: #d39e00;
        margin-bottom: 0.8rem;
      }

      ul {
        list-style-type: '👉 ';
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .map-doc-container {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .method-grid {
      grid-template-columns: 1fr !important;
    }
  }
}

.set-guide {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.8rem;
    color: @primary-color;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }

  .decorative-line {
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, @secondary-color, @accent-color);
    margin: 0 auto;
    border-radius: 2px;
  }
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
}

.gradient-text {
  background: linear-gradient(45deg, @secondary-color, @accent-color);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  .feature-card {
    padding: 1.5rem;
    text-align: center;
    border-radius: 8px;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 1rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .method-card {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;

    .method-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .method-icon {
        font-size: 1.5rem;
      }

      .method-name {
        color: @secondary-color;
        font-weight: 600;
      }
    }
  }
}

.usage-stack {
  display: grid;
  gap: 1.5rem;

  .usage-item {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;

    .usage-index {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
      background: @secondary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}

.code-block,
.code-example {
  background: @code-bg;
  padding: 1.2rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 1rem 0;
  border: 1px solid #eee;
}

.highlight-text {
  color: @secondary-color;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 1rem 0;
}
</style>
