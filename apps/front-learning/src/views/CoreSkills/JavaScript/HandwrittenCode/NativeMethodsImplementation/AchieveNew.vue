<template>
  <div class="new-operator-docs">
    <header class="header-section">
      <h1>手写 new 操作符实现</h1>
    </header>

    <h2>
      <p>new 操作符的工作原理</p>
      <p>当使用 new 操作符时，实际上执行了以下步骤：</p>
      <ol>
        <li>创建一个新对象。</li>
        <li>将新对象的原型指向构造函数的原型。</li>
        <li>执行构造函数，并将 this 绑定到新对象。</li>
        <li>返回新对象或构造函数的返回值（如果是对象）。</li>
      </ol>
    </h2>


    <div class="content-container">
      <!-- 实现代码 -->
      <section class="code-section">
        <h2><span class="icon">🔨</span> 手动实现代码</h2>
        <div class="code-container">
          <pre class="code-block"><code class="typescript">/**
 * 手动实现 new 操作符
 * @param Constructor 构造函数
 * @param args 构造函数参数
 * @returns 新对象实例
 */
function myNew&lt;T extends object&gt;(
  Constructor: Function,
  ...args: any[]
): T {
  // 1. 创建新对象，继承构造函数的原型
  const obj = Object.create(Constructor.prototype)

  // 2. 执行构造函数，绑定this到新对象
  const result = Constructor.apply(obj, args)

  // 3. 处理构造函数返回值：
  //    - 如果返回对象则直接返回
  //    - 否则返回新创建的对象
  return (typeof result === 'object' && result !== null) ? result : obj
}

// 使用示例
class Person {
  constructor(public name: string, public age: number) {
    console.log('构造函数执行')
  }

  greet() {
    return `你好，我是${this.name}`
  }
}

// 使用手写的 new 实现
const person = myNew&lt;Person&gt;(Person, '张三', 25)</code></pre>

        </div>
      </section>

      <!-- 原理解析 -->
      <section class="principle-section">
        <h2><span class="icon">🔍</span> 实现原理</h2>
        <div class="principle-grid">
          <div class="principle-card">
            <div class="step-number">1</div>
            <h3>原型继承</h3>
            <p>使用 Object.create 创建新对象，继承构造函数的 prototype 属性</p>
          </div>
          <div class="principle-card">
            <div class="step-number">2</div>
            <h3>绑定上下文</h3>
            <p>调用构造函数，将 this 指向新创建的对象</p>
          </div>
          <div class="principle-card">
            <div class="step-number">3</div>
            <h3>返回值处理</h3>
            <p>优先返回构造函数返回值（当返回对象时），否则返回新对象</p>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="usage-section">
        <h2><span class="icon">🎯</span> 使用场景</h2>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h3>对象实例化</h3>
            <ul>
              <li>创建多个相似配置的对象</li>
              <li>实现类继承机制</li>
              <li>框架中的对象创建控制</li>
            </ul>
          </div>
          <div class="scenario-card">
            <h3>特殊需求</h3>
            <ul>
              <li>自定义对象创建逻辑</li>
              <li>实现对象池模式</li>
              <li>扩展构造函数功能</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


</script>

<style scoped>
.new-operator-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.header-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  border-radius: 1rem;
  color: white;
  margin-bottom: 2rem;
}

.visual-guide {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.instance-card {
  background: white;
  width: 200px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.instance-header {
  font-weight: bold;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.code-container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin: 1rem 0;
}

.code-block {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
}

.demo-box {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

button {
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #2980b9;
}

.instance-count {
  font-weight: bold;
  color: #2c3e50;
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.principle-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: -50px auto 1rem;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
}

@media (max-width: 768px) {
  .visual-guide {
    flex-direction: column;
    align-items: center;
  }

  .instance-card {
    width: 100%;
  }
}
</style>
