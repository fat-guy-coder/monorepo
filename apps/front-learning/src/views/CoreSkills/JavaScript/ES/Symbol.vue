<template>
  <div class="symbol-guide">
    <header class="guide-header">
      <h1 class="title">JavaScript Symbol 基本指南</h1>
      <div class="decorative-line"></div>
    </header>

    <div class="content-wrapper">
      <!-- 定义章节 -->
      <section class="definition-section card">
        <h2 class="section-title gradient-text">📌 Symbol定义</h2>
        <div class="section-content">
          <p class="highlight-text">ES6引入的第七种原始数据类型，表示独一无二的值</p>
          <pre class="code-block">const sym = Symbol('description');</pre>
        </div>
      </section>
      <!-- 方法和属性 -->
      <section class="methods-section card">
        <h2 class="section-title gradient-text">🔧 Symbol的方法和属性</h2>
        <div class="methods-content">
          <h3>常用方法</h3>
          <ul>
            <li>
              <strong>Symbol.for(key)</strong>:
              返回一个已注册的Symbol，如果没有则创建一个新的Symbol。
            </li>
            <li><strong>Symbol.keyFor(sym)</strong>: 返回一个已注册Symbol的key。</li>
            <li>Symbol.match(str, regex): 返回一个默认的匹配器。</li>
            <li>Symbol.replace(str, regex): 返回一个默认的替换器。</li>
            <li>Symbol.search(str, regex): 返回一个默认的搜索器。</li>
            <li>Symbol.species: 返回一个默认的构造器。</li>
            <li>Symbol.split(str, regex): 返回一个默认的分割器。</li>
          </ul>
          <h3>内置属性</h3>
          <ul>
            <li><strong>Symbol.length</strong>: 返回Symbol的描述字符串长度。</li>
            <li><strong>Symbol.iterator</strong>: 返回一个默认迭代器。</li>
            <li><strong>Symbol.asyncIterator</strong>: 返回一个异步迭代器。</li>
            <li>Symbol.toStringTag: 定义对象的默认字符串描述。</li>
          </ul>
        </div>
      </section>

      <!-- Well-known Symbols -->
      <section class="well-known-section card">
        <h2 class="section-title gradient-text">🌟 Well-known Symbols</h2>
        <div class="well-known-content">
          <p class="intro">JavaScript内置了一些特殊的Symbol值,称为Well-known Symbols。这些Symbol用于暴露JavaScript语言内部的行为。</p>

          <div class="symbol-grid">
            <div class="symbol-item">
              <h3>Symbol.iterator</h3>
              <p>定义对象的默认迭代器,使对象可以被for...of循环遍历</p>
              <pre class="code-example">const myArray = [1, 2, 3];
// Array默认实现了Symbol.iterator
for (const item of myArray) {
  console.log(item);
}</pre>
            </div>

            <div class="symbol-item">
              <h3>Symbol.toPrimitive</h3>
              <p>定义对象被转换为原始值时的行为</p>
              <pre class="code-example">const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 42;
    if (hint === 'string') return 'hello';
    return true;
  }
};</pre>
            </div>

            <div class="symbol-item">
              <h3>Symbol.toStringTag</h3>
              <p>自定义对象的toString()方法返回值</p>
              <pre class="code-example">class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}
console.log(Object.prototype.toString.call(new MyClass()));
// [object MyClass]</pre>
            </div>

            <div class="symbol-item">
              <h3>Symbol.hasInstance</h3>
              <p>自定义instanceof操作符的行为</p>
              <pre class="code-example">class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}</pre>
            </div>
          </div>

          <div class="note-box">
            <p>这些Well-known Symbols让开发者能够自定义JavaScript中一些基础操作的行为,使语言更加灵活和可扩展。</p>
          </div>
        </div>
      </section>

      <!-- 核心特性 -->
      <section class="features-section card">
        <h2 class="section-title gradient-text">✨ 核心特性</h2>
        <ul class="feature-list">
          <li v-for="(feature, index) in features" :key="index" class="feature-item">
            <div class="icon-box">🔑</div>
            <div class="feature-content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
              <pre v-if="feature.example" class="example-code">{{ feature.example }}</pre>
            </div>
          </li>
        </ul>
      </section>

      <!-- 使用示例 -->
      <section class="usage-section card">
        <h2 class="section-title gradient-text">💡 使用场景</h2>
        <div class="usage-grid">
          <div v-for="(usage, index) in useCases" :key="index" class="usage-card">
            <div class="usage-header">
              <span class="scenario-icon">🚀</span>
              <h3>{{ usage.scenario }}</h3>
            </div>
            <pre class="code-example">{{ usage.example }}</pre>
            <p class="usage-desc">{{ usage.description }}</p>
          </div>
        </div>
      </section>

      <!-- 前端应用场景 -->
      <section class="frontend-section card">
        <h2 class="section-title gradient-text">🎯 前端应用场景</h2>
        <div class="frontend-content">
          <div class="scenario-grid">
            <div class="scenario-card">
              <h3>🔒 私有属性模拟</h3>
              <p>在类中使用Symbol作为属性键,可以避免属性被意外访问或修改</p>
              <pre class="code-example">const privateField = Symbol('private');
class MyClass {
  constructor() {
    this[privateField] = 'secret';
  }
}</pre>
            </div>

            <div class="scenario-card">
              <h3>🎨 React组件标识</h3>
              <p>用Symbol定义组件的displayName或其他元数据,确保唯一性</p>
              <pre class="code-example">const ComponentType = Symbol('MyComponent');
class MyComponent extends React.Component {
  static [Symbol.for('type')] = ComponentType;
}</pre>
            </div>

            <div class="scenario-card">
              <h3>🔄 Vue响应式系统</h3>
              <p>在Vue内部实现中使用Symbol标记响应式对象和依赖收集</p>
              <pre class="code-example">const IS_REACTIVE = Symbol('isReactive');
const obj = {
  [IS_REACTIVE]: true,
  // ...其他响应式属性
}</pre>
            </div>

            <div class="scenario-card">
              <h3>🎮 状态管理</h3>
              <p>在Vuex/Redux等状态管理中使用Symbol作为action类型</p>
              <pre class="code-example">const UPDATE_USER = Symbol('UPDATE_USER');
store.dispatch({
  type: UPDATE_USER,
  payload: userData
});</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="notice-section card">
        <h2 class="section-title gradient-text">⚠️ 注意事项</h2>
        <div class="notice-content">
          <div v-for="(notice, index) in notices" :key="index" class="notice-item">
            <span class="warning-icon">❗</span>
            <p>{{ notice }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: '唯一性',
    description: '相同描述的Symbol值不相等',
    example: 'Symbol("id") === Symbol("id") // false',
  },
  {
    title: '不可枚举',
    description: '默认不在for...in/Object.keys()中出现',
    example: 'Object.keys({[sym]: 123}) // []',
  },
  {
    title: '全局注册表',
    description: '使用Symbol.for()创建全局共享Symbol',
    example: 'Symbol.for("key") === Symbol.for("key") // true',
  },
]

const useCases = [
  {
    scenario: '唯一属性键',
    example: `const USER_ID = Symbol('id');
const obj = {
  [USER_ID]: '123456'
};`,
    description: '避免属性名冲突的最佳实践',
  },
  {
    scenario: '元编程',
    example: `const obj = {
  [Symbol.toPrimitive](hint) {
    // 自定义类型转换逻辑
  }
};`,
    description: '通过Well-known Symbols修改对象行为',
  },
  {
    scenario: '私有属性',
    example: `const _counter = Symbol('counter');
class MyClass {
  constructor() {
    this[_counter] = 0;
  }
}`,
    description: '模拟类私有成员（非真正私有）',
  },
  {
    scenario: '状态管理',
    example: `const UPDATE_USER = Symbol('UPDATE_USER');
store.dispatch({
  type: UPDATE_USER,
  payload: userData
});`,
    description: '在Vuex/Redux等状态管理中使用Symbol作为action类型',
  },

]

const notices = [
  'Symbol值不能与其他类型进行运算',
  '转换为字符串时需显式调用toString()',
  'JSON.stringify()会忽略Symbol属性键',
  'Object.getOwnPropertySymbols()可获取对象Symbol属性',
]
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@secondary-color: #42b983;
@accent-color: #ff6b6b;
@code-bg: #f8f9fa;

h3,
li,
pre,
p {
  color: #000;
}

.symbol-guide {
  max-width: 1200px;
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

.feature-list {
  display: grid;
  gap: 1.5rem;

  .feature-item {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    .icon-box {
      font-size: 1.5rem;
      padding: 1rem;
      background: white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  .usage-card {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;

    .usage-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .scenario-icon {
        font-size: 1.8rem;
      }
    }
  }
}

.notice-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  background: #fff9f9;
  border-left: 4px solid @accent-color;
  border-radius: 4px;

  .warning-icon {
    color: @accent-color;
    font-size: 1.2rem;
  }
}

.highlight-text {
  color: @secondary-color;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 1rem 0;
}
</style>
