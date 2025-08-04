<template>
  <div class="instanceof-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>手动实现 JavaScript instanceof 操作符</h1>
        <div class="logo">
          <div class="logo-circle">JS</div>
        </div>
      </div>
      <p class="subtitle">深入理解原型链与类型检测机制</p>
    </header>

    <div class="content">
      <div class="overview">
        <div class="card">
          <div class="overview-grid">
            <div class="text-content">
              <h2>instanceof 操作符概述</h2>
              <p><code>instanceof</code> 是 JavaScript 中用于检测对象是否属于特定类的操作符。它通过检查对象的原型链来确定对象是否由特定构造函数创建。</p>

              <div class="features">
                <div class="feature">
                  <div class="feature-icon bg-blue">
                    <i class="icon icon-chain"></i>
                  </div>
                  <div>
                    <h3>原型链检查</h3>
                    <p>沿着对象的原型链向上查找</p>
                  </div>
                </div>
                <div class="feature">
                  <div class="feature-icon bg-green">
                    <i class="icon icon-constructor"></i>
                  </div>
                  <div>
                    <h3>构造函数验证</h3>
                    <p>检查对象是否由特定构造函数创建</p>
                  </div>
                </div>
                <div class="feature">
                  <div class="feature-icon bg-orange">
                    <i class="icon icon-type"></i>
                  </div>
                  <div>
                    <h3>类型检测</h3>
                    <p>确定对象的继承关系</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="visualization">
              <div class="prototype-chain">
                <div class="object">
                  <div>对象实例</div>
                  <div class="property">__proto__</div>
                </div>
                <div class="arrow">↑</div>
                <div class="prototype">
                  <div>构造函数的 prototype</div>
                  <div class="property">constructor</div>
                </div>
                <div class="arrow">↑</div>
                <div class="object-prototype">
                  <div>Object.prototype</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation">
        <h2 class="section-title">
          <i class="icon icon-code"></i>
          <span>手动实现 instanceof</span>
        </h2>

        <div class="card">
          <div class="code-explanation">
            <div class="explanation">
              <h3>实现思路</h3>
              <ol>
                <li>检查右侧是否为有效构造函数（函数类型）</li>
                <li>获取对象的原型（使用 <code>Object.getPrototypeOf</code>）</li>
                <li>获取构造函数的 <code>prototype</code> 属性</li>
                <li>沿着原型链向上查找，直到找到匹配或到达原型链顶端</li>
                <li>如果找到匹配则返回 <code>true</code>，否则返回 <code>false</code></li>
              </ol>

              <div class="edge-cases">
                <h4>边界情况处理</h4>
                <ul>
                  <li>原始类型（非对象）直接返回 <code>false</code></li>
                  <li>右侧不是构造函数时抛出 <code>TypeError</code></li>
                  <li>处理 <code>null</code> 和 <code>undefined</code> 值</li>
                </ul>
              </div>
            </div>

            <div class="code-block">
              <pre><code>/**
 * 手动实现 instanceof 操作符
 * @param {any} instance - 要检测的对象
 * @param {Function} constructor - 目标构造函数
 * @returns {boolean} - 对象是否是该构造函数的实例
 */
function myInstanceof(instance, constructor) {
  // 1. 基本类型直接返回 false
  if (typeof instance !== 'object' || instance === null) {
    return false;
  }

  // 2. 确保右侧是有效的构造函数
  if (typeof constructor !== 'function') {
    throw new TypeError('Right-hand side of instanceof is not callable');
  }

  // 3. 获取对象的原型
  let proto = Object.getPrototypeOf(instance);
  const prototype = constructor.prototype;

  // 4. 沿着原型链向上查找
  while (true) {
    // 4.1 如果到达原型链顶端 (null)
    if (proto === null) {
      return false;
    }

    // 4.2 如果找到匹配的 prototype 对象
    if (proto === prototype) {
      return true;
    }

    // 4.3 继续向上查找
    proto = Object.getPrototypeOf(proto);
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="examples">
        <h2 class="section-title">
          <i class="icon icon-demo"></i>
          <span>使用示例</span>
        </h2>

        <div class="example-grid">
          <div class="example-card">
            <h3>基础示例</h3>
            <div class="code-example">
              <pre><code>class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(myInstanceof(dog, Dog));      // true
console.log(myInstanceof(dog, Animal));   // true
console.log(myInstanceof(dog, Object));   // true

console.log(myInstanceof(dog, Array));    // false
console.log(myInstanceof(dog, Function)); // false</code></pre>
            </div>
            <div class="explanation">
              <p>这个示例展示了基本的继承关系检测。Dog 继承自 Animal，所以 dog 对象既是 Dog 的实例，也是 Animal 的实例。</p>
            </div>
          </div>

          <div class="example-card">
            <h3>边界情况测试</h3>
            <div class="code-example">
              <pre><code>// 测试基本类型
console.log(myInstanceof(123, Number));         // false
console.log(myInstanceof('text', String));      // false
console.log(myInstanceof(true, Boolean));       // false

// 测试 null 和 undefined
console.log(myInstanceof(null, Object));        // false
console.log(myInstanceof(undefined, Object));   // false

// 测试非构造函数
try {
  console.log(myInstanceof({}, {}));            // 抛出 TypeError
} catch (e) {
  console.error(e.message); // Right-hand side of instanceof is not callable
}</code></pre>
            </div>
            <div class="explanation">
              <p>这个示例测试了各种边界情况，包括基本类型、null/undefined 值以及当右侧不是构造函数时的错误处理。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison">
        <h2 class="section-title">
          <i class="icon icon-compare"></i>
          <span>与原生的比较</span>
        </h2>

        <div class="card">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>原生 instanceof</th>
                  <th>手动实现</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>基本类型检测</td>
                  <td>返回 false</td>
                  <td>返回 false</td>
                </tr>
                <tr>
                  <td>原型链查找</td>
                  <td>支持</td>
                  <td>支持</td>
                </tr>
                <tr>
                  <td>边界情况处理</td>
                  <td>内置处理</td>
                  <td>需要手动处理</td>
                </tr>
                <tr>
                  <td>跨框架/窗口对象</td>
                  <td>可能失效</td>
                  <td>可能失效（同原生）</td>
                </tr>
                <tr>
                  <td>Symbol.hasInstance</td>
                  <td>支持</td>
                  <td>不支持</td>
                </tr>
                <tr>
                  <td>性能</td>
                  <td>原生优化</td>
                  <td>手动循环可能稍慢</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="limitations">
            <h3>手动实现的局限性</h3>
            <ul>
              <li>不支持 <code>Symbol.hasInstance</code> 自定义行为</li>
              <li>无法处理代理对象和特殊内置对象</li>
              <li>在不同执行上下文（iframe）中可能表现不同</li>
              <li>性能不如原生实现优化</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="use-cases">
        <h2 class="section-title">
          <i class="icon icon-scenario"></i>
          <span>实际应用场景</span>
        </h2>

        <div class="case-cards">
          <div class="case-card">
            <div class="case-icon bg-purple">
              <i class="icon icon-type-check"></i>
            </div>
            <h3>类型检查</h3>
            <p>在需要根据对象类型执行不同逻辑时使用</p>
            <pre><code>function processData(data) {
  if (myInstanceof(data, Array)) {
    // 处理数组
  } else if (myInstanceof(data, Date)) {
    // 处理日期
  } else if (myInstanceof(data, RegExp)) {
    // 处理正则表达式
  }
}</code></pre>
          </div>

          <div class="case-card">
            <div class="case-icon bg-teal">
              <i class="icon icon-library"></i>
            </div>
            <h3>库/框架开发</h3>
            <p>在开发库时进行参数类型验证</p>
            <pre><code>class MyLibrary {
  constructor(element) {
    if (!myInstanceof(element, HTMLElement)) {
      throw new Error('Invalid element type');
    }
    this.element = element;
  }
}</code></pre>
          </div>

          <div class="case-card">
            <div class="case-icon bg-pink">
              <i class="icon icon-plugin"></i>
            </div>
            <h3>插件系统</h3>
            <p>验证插件是否实现必要接口</p>
            <pre><code>function registerPlugin(plugin) {
  if (myInstanceof(plugin, BasePlugin)) {
    plugins.push(plugin);
  } else {
    console.warn('Invalid plugin interface');
  }
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>JavaScript 原型链与 instanceof 实现 | 深入理解 JavaScript 核心机制</p>
      <div class="links">
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof"
          target="_blank">
          <i class="icon icon-doc"></i> MDN 文档
        </a>
        <a href="https://github.com/getify/You-Dont-Know-JS" target="_blank">
          <i class="icon icon-book"></i> 推荐阅读
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 实现代码（用于实际测试）
function myInstanceof(instance: any, constructor: Function): boolean {
  if (typeof instance !== 'object' || instance === null) {
    return false;
  }

  if (typeof constructor !== 'function') {
    throw new TypeError('Right-hand side of instanceof is not callable');
  }

  let proto = Object.getPrototypeOf(instance);
  const prototype = constructor.prototype;

  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

onMounted(() => {
  // 可以在控制台测试实现
  console.log("手动实现的 instanceof 已可用，尝试调用 myInstanceof(obj, Constructor)");
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

// 基础变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@background-light: #f8f9fa;
@text-primary: #2c3e50;
@text-secondary: #5a6d82;
@border-color: #e8e8e8;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4cc9f0;
@warning-color: #f72585;
@info-color: #4895ef;

// 颜色变量
@blue: #4361ee;
@green: #2ec4b6;
@orange: #ff9f1c;
@purple: #7209b7;
@teal: #06d6a0;
@pink: #ef476f;

// 布局和基础样式
.instanceof-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-primary;
  background-color: #fff;
  line-height: 1.6;
  padding-bottom: 40px;
}

.header {
  text-align: center;
  padding: 50px 0 30px;
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: @text-primary;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-circle {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    font-weight: 400;
    margin-top: 15px;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
}

// 概览部分
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.text-content {
  h2 {
    font-size: 1.8rem;
    color: @text-primary;
    margin-top: 0;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 25px;
    line-height: 1.7;
    color: @text-secondary;
  }
}

.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 30px;
}

.feature {
  display: flex;
  gap: 15px;
  align-items: center;

  .feature-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    flex-shrink: 0;

    &.bg-blue {
      background: @blue;
    }

    &.bg-green {
      background: @green;
    }

    &.bg-orange {
      background: @orange;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 5px;
    color: @text-primary;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.visualization {
  display: flex;
  align-items: center;
  justify-content: center;
}

.prototype-chain {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: #f9fbfd;
  border-radius: 12px;
  padding: 30px;
  border: 1px dashed #d0e3ff;
  width: 100%;
}

.object,
.prototype,
.object-prototype {
  background: white;
  border: 1px solid @border-color;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  .property {
    font-size: 0.9rem;
    color: @primary-color;
    margin-top: 10px;
    font-weight: 500;
  }
}

.arrow {
  font-size: 1.5rem;
  color: @text-secondary;
}

// 实现部分
.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: @text-primary;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 2px;
  }

  .icon {
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
}

.code-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.explanation {
  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: @primary-color;
  }

  ol,
  ul {
    padding-left: 20px;

    li {
      margin-bottom: 12px;
      line-height: 1.6;
    }
  }
}

.edge-cases {
  margin-top: 30px;
  padding: 20px;
  background: lighten(@warning-color, 45%);
  border-left: 4px solid @warning-color;
  border-radius: 0 8px 8px 0;

  h4 {
    margin-top: 0;
    color: darken(@warning-color, 15%);
  }
}

.code-block {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  border: 1px solid @border-color;
  font-size: 0.95rem;

  pre {
    margin: 0;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      line-height: 1.6;
      color: #2c3e50;

      .comment {
        color: #6a737d;
      }
    }
  }
}

// 示例部分
.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
}

.example-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;

  h3 {
    background: #f9fbfd;
    padding: 15px 20px;
    margin: 0;
    border-bottom: 1px solid @border-color;
    color: @primary-color;
  }
}

.code-example {
  padding: 20px;
  background: #f5f7fa;

  pre {
    margin: 0;
    font-size: 0.9rem;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      line-height: 1.5;
      color: #2c3e50;
    }
  }
}

.explanation {
  padding: 20px;
  color: @text-secondary;
  line-height: 1.6;
}

// 比较部分
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background: fade(@primary-color, 8%);
    color: @primary-color;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: #f8f9fa;
  }

  tr:hover td {
    background: fade(@primary-color, 4%);
  }
}

.limitations {
  background: lighten(@warning-color, 45%);
  border-left: 4px solid @warning-color;
  padding: 20px;
  border-radius: 0 8px 8px 0;

  h3 {
    margin-top: 0;
    color: darken(@warning-color, 15%);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
}

// 使用场景部分
.case-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.case-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.case-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 15px;
  color: white;
  font-size: 1.5rem;

  &.bg-purple {
    background: @purple;
  }

  &.bg-teal {
    background: @teal;
  }

  &.bg-pink {
    background: @pink;
  }
}

.case-card h3 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 15px;
  color: @text-primary;
}

.case-card p {
  text-align: center;
  padding: 0 20px;
  color: @text-secondary;
}

.case-card pre {
  background: #f5f7fa;
  border-radius: 8px;
  margin: 20px;
  padding: 15px;
  overflow-x: auto;
  font-size: 0.85rem;

  code {
    font-family: 'Fira Code', 'Consolas', monospace;
    line-height: 1.5;
    color: #2c3e50;
  }
}

// 页脚
.footer {
  text-align: center;
  padding: 40px 0 20px;
  margin-top: 50px;
  border-top: 1px solid @border-color;
  color: @text-secondary;

  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        color: darken(@primary-color, 10%);
        transform: translateY(-2px);
      }

      .icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 0 20px;

    h1 {
      font-size: 2rem;
    }
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .code-explanation {
    grid-template-columns: 1fr;
  }

  .example-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .card {
    padding: 20px;
  }
}
</style>
