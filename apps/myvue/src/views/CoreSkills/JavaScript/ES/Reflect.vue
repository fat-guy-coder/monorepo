<template>
  <div class="reflect-docs">
    <header class="docs-header">
      <h1>JavaScript Reflect 基本指南</h1>
    </header>
    <Nav class="toc" :list="sections" />

    <div class="content-wrapper">
      <!-- 基础介绍 -->
      <section id="overview" class="method-card">
        <h2>🔍 Reflect 概述</h2>
        <div class="info-box">
          <p>Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个</p>
          <ol>
            <li>
              将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法
            </li>
            <li>修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name,
              desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false</li>
          </ol>
        </div>
      </section>

      <!-- 核心方法 -->
      <section id="methods" class="method-card">
        <h2>🎯 核心方法</h2>

        <div class="method-item">
          <h3>1. Reflect.get(target, propertyKey[, receiver])</h3>
          <CodeBlock :code="reflectGetExample" language="js" />
          <div class="use-case">
            <h4>使用场景</h4>
            <ul>
              <li>替代 <code>target[property]</code> 的读取操作</li>
              <li>需要处理访问器上下文时</li>
            </ul>
          </div>
        </div>

        <div class="method-item">
          <h3>2. Reflect.set(target, propertyKey, value[, receiver])</h3>
          <CodeBlock :code="reflectSetExample" language="js" />
          <div class="use-case warning">
            <h4>⚠️ 注意事项</h4>
            <p>与直接赋值不同，返回布尔值表示操作是否成功</p>
          </div>
        </div>

        <!-- 其他方法示例... -->
      </section>

      <!-- 最佳实践 -->
      <section id="best-practices" class="method-card highlight">
        <h2>🌟 最佳实践</h2>
        <div class="practice-grid">
          <div class="practice-item">
            <h3>与 Proxy 配合使用</h3>
            <CodeBlock :code="proxyExample" language="js" />
          </div>

          <div class="practice-item">
            <h3>替代 Object 方法</h3>
            <CodeBlock :code="objectComparison" language="js" />
          </div>
        </div>
      </section>

      <!-- 对比表格 -->
      <section id="comparison" class="method-card">
        <h2>🆚 与传统方法对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>操作</th>
                <th>传统方式</th>
                <th>Reflect方式</th>
                <th>优势</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>属性读取</td>
                <td><code>obj.prop</code></td>
                <td><code>Reflect.get(obj, 'prop')</code></td>
                <td>支持receiver绑定</td>
              </tr>
              <!-- 更多对比行... -->
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '../Components/CodeBlock.vue'
import Nav from '@/components/ScrollNav.vue'

const sections = [
  { id: 'overview', name: '概述' },
  { id: 'methods', name: '核心方法' },
  { id: 'best-practices', name: '最佳实践' },
  { id: 'comparison', name: '方法对比' },
]

const reflectGetExample = `
const obj = { x: 1, y: 2 };
// 传统方式
console.log(obj.x); // 1

// Reflect方式
console.log(Reflect.get(obj, 'y')); // 2

// 处理访问器
const user = {
  _name: 'John',
  get name() {
    return this._name
  }
};
const receiver = { _name: 'Alice' };
console.log(Reflect.get(user, 'name', receiver)); // 'Alice'
`.trim()

const reflectSetExample = `
const target = {};
// 成功设置
console.log(Reflect.set(target, 'prop', 123)); // true
console.log(target.prop); // 123

// 设置不可写属性
const obj = {};
Object.defineProperty(obj, 'fixed', {
  value: '不可变',
  writable: false
});
console.log(Reflect.set(obj, 'fixed', '新值')); // false
`.trim()

const proxyExample = `
const handler = {
  get(target, prop, receiver) {
    console.log(\`访问属性: \${prop}\`);
    return Reflect.get(...arguments);
  }
};

const proxy = new Proxy({ a: 1 }, handler);
proxy.a; // 输出: "访问属性: a"
`.trim()

const objectComparison = `
// 旧方式
try {
  Object.defineProperty(obj, prop, descriptor);
} catch (e) {
  // 处理错误
}

// Reflect方式
if (Reflect.defineProperty(obj, prop, descriptor)) {
  // 成功逻辑
} else {
  // 失败处理
}
`.trim()
</script>

<style scoped>
.catalogue {
  color: #fff;
}

.reflect-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
}

.docs-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 3px solid #647eff;
}

ul {
  list-style: none;
}

h1 {
  color: #213547;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.method-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.method-card:hover {
  transform: translateY(-3px);
}

.highlight {
  border: 2px solid #647eff;
  background: #f8faff;
}

.info-box {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #647eff;
}

.use-case {
  background: #fff9db;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}

.warning {
  background: #ffe3e3;
  border-left: 4px solid #ff6b6b;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.comparison-table {
  overflow-x: auto;
  margin-top: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #647eff;
  color: white;
}

tr:hover {
  background: #f8fafc;
}

@media (max-width: 768px) {
  .reflect-docs {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .method-card {
    padding: 1.5rem;
  }
}
</style>
