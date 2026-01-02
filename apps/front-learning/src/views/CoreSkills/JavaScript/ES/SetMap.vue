<template>
  <div class="set-map-container">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1 class="main-title">📚 ES6 Set & Map 完整指南</h1>
      <p class="subtitle">现代化的集合数据结构，提升开发效率</p>
    </header>

    <!-- Set 部分 -->
    <section class="data-structure-section">
      <div class="section-header">
        <h2 class="section-title">🔸 Set 集合</h2>
        <div class="title-decoration"></div>
      </div>

      <!-- Set 概念 -->
      <div class="concept-card">
        <h3 class="card-title">📖 概念定义</h3>
        <p class="concept-text">
          Set 是 ES6 引入的一种新的数据结构，它类似于数组，但是成员的值都是唯一的，没有重复的值。
          Set 本身是一个构造函数，用来生成 Set 数据结构。
        </p>
        <div class="code-demo">
          <pre><code>const set = new Set([1, 2, 3, 3, 4, 4]);
console.log(set); // Set(4) {1, 2, 3, 4}</code></pre>
        </div>
      </div>

      <!-- Set 特点 -->
      <div class="features-card">
        <h3 class="card-title">✨ 核心特点</h3>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🔑</div>
            <h4>值唯一性</h4>
            <p>自动去重，使用 SameValueZero 算法比较</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🎯</div>
            <h4>任意类型</h4>
            <p>可以存储对象、函数等任意类型值</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <h4>有序迭代</h4>
            <p>按插入顺序迭代，支持 for...of 遍历</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h4>快速查找</h4>
            <p>O(1) 时间复杂度的查找操作</p>
          </div>
        </div>
      </div>

      <!-- Set API -->
      <div class="api-card">
        <h3 class="card-title">🛠️ API 方法</h3>
        <div class="api-table">
          <div class="api-header">
            <span class="api-method">方法</span>
            <span class="api-desc">描述</span>
            <span class="api-return">返回值</span>
            <span class="api-example">示例</span>
          </div>
          <div class="api-row">
            <code class="api-method">add(value)</code>
            <span class="api-desc">添加新元素</span>
            <span class="api-return">Set</span>
            <code class="api-example">set.add(5)</code>
          </div>
          <div class="api-row">
            <code class="api-method">has(value)</code>
            <span class="api-desc">检查值是否存在</span>
            <span class="api-return">Boolean</span>
            <code class="api-example">set.has(3)</code>
          </div>
          <div class="api-row">
            <code class="api-method">delete(value)</code>
            <span class="api-desc">删除指定值</span>
            <span class="api-return">Boolean</span>
            <code class="api-example">set.delete(2)</code>
          </div>
          <div class="api-row">
            <code class="api-method">clear()</code>
            <span class="api-desc">清空所有元素</span>
            <span class="api-return">undefined</span>
            <code class="api-example">set.clear()</code>
          </div>
          <div class="api-row">
            <code class="api-method">size</code>
            <span class="api-desc">获取元素数量</span>
            <span class="api-return">Number</span>
            <code class="api-example">set.size</code>
          </div>
        </div>
      </div>

      <!-- Set 遍历 -->
      <div class="iteration-card">
        <h3 class="card-title">🔄 遍历方法</h3>
        <div class="iteration-methods">
          <div class="method-item">
            <h4>forEach()</h4>
            <pre><code>set.forEach((value, key, set) => {
  console.log(value);
});</code></pre>
          </div>
          <div class="method-item">
            <h4>for...of</h4>
            <pre><code>for (const value of set) {
  console.log(value);
}</code></pre>
          </div>
          <div class="method-item">
            <h4>values()</h4>
            <pre><code>for (const value of set.values()) {
  console.log(value);
}</code></pre>
          </div>
          <div class="method-item">
            <h4>keys()</h4>
            <pre><code>for (const key of set.keys()) {
  console.log(key); // 与 values() 相同
}</code></pre>
          </div>
        </div>
      </div>

      <!-- INSERT_YOUR_CODE -->
      <!-- Set 底层实现原理 -->
      <div class="iteration-card">
        <h3 class="card-title">🧩 底层实现原理</h3>
        <div class="concept-text">
          <p>
            <strong>Set</strong> 的底层实现通常基于<strong>哈希表（Hash Table）</strong>。每个元素在插入时会通过哈希函数计算出一个唯一的哈希值，然后将其存储到哈希表的对应位置。这样做有以下几个优点：
          </p>
          <ul>
            <li>
              <strong>查找、添加、删除操作的时间复杂度为 O(1)</strong>，即操作速度非常快，不会因为数据量变大而明显变慢。
            </li>
            <li>
              <strong>自动去重</strong>：哈希表的 key 唯一，插入重复元素时会自动覆盖，保证集合中没有重复值。
            </li>
            <li>
              <strong>支持任意类型的值</strong>：Set 可以存储对象、数组等任意类型，底层通过引用地址进行判断。
            </li>
          </ul>
          <p>
            <strong>高效的原因：</strong>哈希表通过哈希函数将元素快速定位到内存中的某个位置，避免了线性遍历，因此无论集合有多少元素，查找和操作的速度都非常快。
          </p>
          <div class="principle-example">
            <strong>简化示意：</strong>
            <pre><code>// 模拟 Set 的底层结构
const table = {};
function add(value) {
  const key = hash(value); // 计算哈希值
  table[key] = value;      // 存储到哈希表
}
function has(value) {
  const key = hash(value);
  return table.hasOwnProperty(key);
}</code></pre>
            <span class="tip">（实际实现更复杂，涉及哈希冲突处理等）</span>
          </div>
        </div>
      </div>

      <!-- Set 优缺点 -->
      <div class="pros-cons-card">
        <h3 class="card-title">⚖️ 优缺点分析</h3>
        <div class="pros-cons-grid">
          <div class="pros">
            <h4>✅ 优点</h4>
            <ul>
              <li>自动去重，无需手动处理</li>
              <li>查找性能优秀 O(1)</li>
              <li>支持任意类型值</li>
              <li>有序迭代</li>
              <li>API 简洁易用</li>
            </ul>
          </div>
          <div class="cons">
            <h4>❌ 缺点</h4>
            <ul>
              <li>不支持索引访问</li>
              <li>无法直接获取随机元素</li>
              <li>对象比较基于引用</li>
              <li>内存占用相对较高</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Set 适用场景 -->
      <div class="scenarios-card">
        <h3 class="card-title">💡 适用场景</h3>
        <div class="scenarios-grid">
          <div class="scenario-item">
            <div class="scenario-icon">🔄</div>
            <h4>数组去重</h4>
            <pre><code>const unique = [...new Set(array)];</code></pre>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">🔍</div>
            <h4>快速查找</h4>
            <pre><code>const cache = new Set();
if (cache.has(key)) { ... }</code></pre>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">📊</div>
            <h4>集合运算</h4>
            <pre><code>// 并集、交集、差集
const union = new Set([...setA, ...setB]);</code></pre>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">🎯</div>
            <h4>状态追踪</h4>
            <pre><code>const visited = new Set();
visited.add(element);</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Map 部分 -->
    <section class="data-structure-section">
      <div class="section-header">
        <h2 class="section-title">🔹 Map 映射</h2>
        <div class="title-decoration"></div>
      </div>

      <!-- Map 概念 -->
      <div class="concept-card">
        <h3 class="card-title">📖 概念定义</h3>
        <p class="concept-text">
          Map 是 ES6 引入的键值对集合，类似于对象，但是键可以是任意类型。
          Map 提供了更强大的键值对管理能力，是 Object 的现代化替代方案。
        </p>
        <div class="code-demo">
          <pre><code>const map = new Map();
map.set('name', 'Alice');
map.set(42, 'The Answer');
map.set({}, 'Object Key');</code></pre>
        </div>
      </div>

      <!-- Map 特点 -->
      <div class="features-card">
        <h3 class="card-title">✨ 核心特点</h3>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🔑</div>
            <h4>任意键类型</h4>
            <p>键可以是对象、函数等任意类型</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📏</div>
            <h4>内置大小</h4>
            <p>通过 size 属性直接获取元素数量</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔄</div>
            <h4>有序迭代</h4>
            <p>按照插入顺序进行迭代</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h4>高性能</h4>
            <p>增删查改操作性能优秀</p>
          </div>
        </div>
      </div>

      <!-- Map API -->
      <div class="api-card">
        <h3 class="card-title">🛠️ API 方法</h3>
        <div class="api-table">
          <div class="api-header">
            <span class="api-method">方法</span>
            <span class="api-desc">描述</span>
            <span class="api-return">返回值</span>
            <span class="api-example">示例</span>
          </div>
          <div class="api-row">
            <code class="api-method">set(key, value)</code>
            <span class="api-desc">设置键值对</span>
            <span class="api-return">Map</span>
            <code class="api-example">map.set('key', 'value')</code>
          </div>
          <div class="api-row">
            <code class="api-method">get(key)</code>
            <span class="api-desc">获取值</span>
            <span class="api-return">Value</span>
            <code class="api-example">map.get('key')</code>
          </div>
          <div class="api-row">
            <code class="api-method">has(key)</code>
            <span class="api-desc">检查键是否存在</span>
            <span class="api-return">Boolean</span>
            <code class="api-example">map.has('key')</code>
          </div>
          <div class="api-row">
            <code class="api-method">delete(key)</code>
            <span class="api-desc">删除键值对</span>
            <span class="api-return">Boolean</span>
            <code class="api-example">map.delete('key')</code>
          </div>
          <div class="api-row">
            <code class="api-method">clear()</code>
            <span class="api-desc">清空所有元素</span>
            <span class="api-return">undefined</span>
            <code class="api-example">map.clear()</code>
          </div>
          <div class="api-row">
            <code class="api-method">size</code>
            <span class="api-desc">获取元素数量</span>
            <span class="api-return">Number</span>
            <code class="api-example">map.size</code>
          </div>
        </div>
      </div>

      <!-- Map 遍历 -->
      <div class="iteration-card">
        <h3 class="card-title">🔄 遍历方法</h3>
        <div class="iteration-methods">
          <div class="method-item">
            <h4>forEach()</h4>
            <pre><code>map.forEach((value, key, map) => {
  console.log(key, value);
});</code></pre>
          </div>
          <div class="method-item">
            <h4>for...of entries()</h4>
            <pre><code>for (const [key, value] of map.entries()) {
  console.log(key, value);
}</code></pre>
          </div>
          <div class="method-item">
            <h4>keys()</h4>
            <pre><code>for (const key of map.keys()) {
  console.log(key);
}</code></pre>
          </div>
          <div class="method-item">
            <h4>values()</h4>
            <pre><code>for (const value of map.values()) {
  console.log(value);
}</code></pre>
          </div>
        </div>
      </div>

      <!-- INSERT_YOUR_CODE -->
      <!-- Map 底层实现原理 -->
      <div class="iteration-card">
        <h3 class="card-title">🧩 底层实现原理</h3>
        <div class="concept-text">
          <p>
            <strong>Map</strong> 的底层实现同样基于<strong>哈希表（Hash Table）</strong>，但与 Set 不同，Map 存储的是<strong>键值对（key-value）</strong>，并且键可以是任意类型（包括对象、函数等）。
          </p>
          <ul>
            <li>
              <strong>高效查找、插入、删除</strong>：通过哈希函数将键映射到内存中的唯一位置，查找、添加、删除操作的时间复杂度为 O(1)。
            </li>
            <li>
              <strong>键的唯一性</strong>：每个键在 Map 中只能出现一次，后插入的同键会覆盖前一个。
            </li>
            <li>
              <strong>有序存储</strong>：Map 保证键值对的迭代顺序与插入顺序一致。
            </li>
            <li>
              <strong>支持任意类型键</strong>：不仅仅是字符串或数字，任何对象都可以作为键。
            </li>
          </ul>
          <p>
            <strong>高性能的原因：</strong>哈希表通过哈希函数将键快速定位，避免了线性遍历，提升了操作效率。实际实现中还会处理哈希冲突（如拉链法、开放寻址法等）。
          </p>
          <div class="principle-example">
            <strong>简化示意：</strong>
            <pre><code>// 模拟 Map 的底层结构
const table = {};
function set(key, value) {
  const hashKey = hash(key); // 计算哈希值
  table[hashKey] = { key, value }; // 存储键值对
}
function get(key) {
  const hashKey = hash(key);
  if (table[hashKey] && table[hashKey].key === key) {
    return table[hashKey].value;
  }
  return undefined;
}</code></pre>
            <span class="tip">（实际实现更复杂，需处理哈希冲突和引用类型键的唯一性）</span>
          </div>
        </div>
      </div>

      <!-- Map 优缺点 -->
      <div class="pros-cons-card">
        <h3 class="card-title">⚖️ 优缺点分析</h3>
        <div class="pros-cons-grid">
          <div class="pros">
            <h4>✅ 优点</h4>
            <ul>
              <li>支持任意类型键</li>
              <li>内置 size 属性</li>
              <li>有序迭代</li>
              <li>高性能操作</li>
              <li>API 统一</li>
            </ul>
          </div>
          <div class="cons">
            <h4>❌ 缺点</h4>
            <ul>
              <li>不支持点语法访问</li>
              <li>JSON 序列化复杂</li>
              <li>对象键比较基于引用</li>
              <li>内存占用较高</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Map 适用场景 -->
      <div class="scenarios-card">
        <h3 class="card-title">💡 适用场景</h3>
        <div class="scenarios-grid">
          <div class="scenario-item">
            <div class="scenario-icon">📊</div>
            <h4>频率统计</h4>
            <pre><code>const freq = new Map();
array.forEach(item => {
  freq.set(item, (freq.get(item) || 0) + 1);
});</code></pre>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">💾</div>
            <h4>缓存机制</h4>
            <pre><code>const cache = new Map();
if (cache.has(key)) {
  return cache.get(key);
}</code></pre>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">🔗</div>
            <h4>数据关联</h4>
            <pre><code>const userMap = new Map();
userMap.set(userId, userData);</code></pre>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">🎯</div>
            <h4>状态管理</h4>
            <pre><code>const state = new Map();
state.set('loading', true);</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 对比表格 -->
    <section class="comparison-section">
      <h2 class="section-title">🆚 Set vs Map vs Object 对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>Set</th>
              <th>Map</th>
              <th>Object</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>键类型</td>
              <td>无键概念</td>
              <td>任意类型</td>
              <td>String/Symbol</td>
            </tr>
            <tr>
              <td>值类型</td>
              <td>任意类型</td>
              <td>任意类型</td>
              <td>任意类型</td>
            </tr>
            <tr>
              <td>大小获取</td>
              <td>set.size</td>
              <td>map.size</td>
              <td>Object.keys().length</td>
            </tr>
            <tr>
              <td>迭代顺序</td>
              <td>插入顺序</td>
              <td>插入顺序</td>
              <td>无序</td>
            </tr>
            <tr>
              <td>性能</td>
              <td>优秀</td>
              <td>优秀</td>
              <td>良好</td>
            </tr>
            <tr>
              <td>JSON 支持</td>
              <td>需转换</td>
              <td>需转换</td>
              <td>原生支持</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="best-practices-section">
      <h2 class="section-title">🎯 最佳实践</h2>
      <div class="practices-grid">
        <div class="practice-item">
          <h3>选择合适的结构</h3>
          <ul>
            <li>需要去重 → 使用 Set</li>
            <li>需要键值对 → 使用 Map</li>
            <li>需要 JSON 序列化 → 使用 Object</li>
          </ul>
        </div>
        <div class="practice-item">
          <h3>性能优化</h3>
          <ul>
            <li>预分配容量避免扩容</li>
            <li>使用 WeakMap/WeakSet 避免内存泄漏</li>
            <li>及时清理不需要的数据</li>
          </ul>
        </div>
        <div class="practice-item">
          <h3>代码可读性</h3>
          <ul>
            <li>使用语义化的变量名</li>
            <li>添加适当的注释</li>
            <li>保持代码结构清晰</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #2c3e50;
@secondary-color: #3498db;
@accent-color: #e74c3c;
@success-color: #27ae60;
@warning-color: #f39c12;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@text-color: #495057;
@code-bg: #f1f3f4;

// 全局样式
* {
  box-sizing: border-box;
}

.set-map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: white;
}

// 页面标题
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, @light-bg 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .main-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #6c757d;
    font-weight: 400;
  }
}

// 数据结构部分
.data-structure-section {
  margin-bottom: 4rem;
}

.section-header {
  margin-bottom: 2rem;
  text-align: center;

  .section-title {
    font-size: 2rem;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .title-decoration {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, @secondary-color, @accent-color);
    margin: 0 auto;
    border-radius: 2px;
  }
}

// 卡片基础样式
.concept-card,
.features-card,
.api-card,
.iteration-card,
.pros-cons-card,
.scenarios-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .card-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @border-color;
  }
}

// 概念卡片
.concept-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: @text-color;
  margin-bottom: 1.5rem;
}

.code-demo {
  background: @code-bg;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @secondary-color;

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: @primary-color;
    overflow-x: auto;
  }
}

// 特性网格
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .feature-item {
    text-align: center;
    padding: 1.5rem;
    background: @light-bg;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-3px);
    }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: @primary-color;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.9rem;
      color: #6c757d;
      margin: 0;
    }
  }
}

// API 表格
.api-table {
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;

  .api-header {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1.5fr;
    background: @primary-color;
    color: white;
    font-weight: 600;
    padding: 1rem;

    span {
      padding: 0.5rem;
    }
  }

  .api-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1.5fr;
    border-bottom: 1px solid @border-color;
    transition: background-color 0.2s ease;

    &:hover {
      background: @light-bg;
    }

    &:last-child {
      border-bottom: none;
    }

    .api-method {
      background: @secondary-color;
      color: white;
      padding: 0.5rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
    }

    .api-desc {
      padding: 0.5rem;
      color: @text-color;
    }

    .api-return {
      padding: 0.5rem;
      color: @accent-color;
      font-weight: 500;
    }

    .api-example {
      padding: 0.5rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      color: @primary-color;
    }
  }
}

// 迭代方法
.iteration-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .method-item {
    background: @light-bg;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid @secondary-color;

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: @primary-color;
      margin-bottom: 1rem;
    }

    pre {
      background: @code-bg;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      line-height: 1.4;
      margin: 0;
      overflow-x: auto;
    }
  }
}

// 优缺点
.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .pros,
  .cons {
    h4 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @border-color;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: @secondary-color;
          font-weight: bold;
        }
      }
    }
  }

  .pros h4 {
    color: @success-color;
  }

  .cons h4 {
    color: @accent-color;
  }
}

// 适用场景
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  .scenario-item {
    background: @light-bg;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-3px);
    }

    .scenario-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: @primary-color;
      margin-bottom: 1rem;
    }

    pre {
      background: @code-bg;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      line-height: 1.4;
      margin: 0;
      text-align: left;
      overflow-x: auto;
    }
  }
}

// 对比表格
.comparison-section {
  margin: 4rem 0;

  .section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 2rem;
  }

  .comparison-table {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid @border-color;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid @border-color;
      }

      th {
        background: @primary-color;
        color: white;
        font-weight: 600;
        font-size: 1rem;
      }

      tr:nth-child(even) {
        background: @light-bg;
      }

      tr:hover {
        background: #e3f2fd;
      }
    }
  }
}

// 最佳实践
.best-practices-section {
  margin: 4rem 0;

  .section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 2rem;
  }

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    .practice-item {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid @border-color;

      h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: @primary-color;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid @border-color;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;

          &::before {
            content: '→';
            position: absolute;
            left: 0;
            color: @secondary-color;
            font-weight: bold;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .set-map-container {
    padding: 1rem;
  }

  .page-header .main-title {
    font-size: 2rem;
  }

  .features-grid,
  .iteration-methods,
  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .pros-cons-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .api-table {
    .api-header,
    .api-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .api-header {
      display: none;
    }

    .api-row {
      border: 1px solid @border-color;
      margin-bottom: 1rem;
      border-radius: 8px;
      padding: 1rem;

      .api-method,
      .api-desc,
      .api-return,
      .api-example {
        padding: 0.25rem 0;
      }
    }
  }
}

@media (max-width: 480px) {
  .page-header .main-title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .card-title {
    font-size: 1.2rem;
  }
}
</style>
