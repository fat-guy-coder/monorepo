<template>
  <div class="prototype-guide">
    <h1 class="main-title">🔗 JavaScript 原型与原型链介绍</h1>

    <div>

    </div>
    <div class="prototype-description">
      <h2>🔍 原型与原型链简介</h2>
      <h3>
        在JavaScript中，原型是对象的一个重要特性。每个对象都有一个内部属性[[Prototype]]，指向其原型对象。原型链是由多个对象通过原型关系连接而成的链条。当我们访问一个对象的属性或方法时，JavaScript会首先在该对象自身查找，如果未找到，则会沿着原型链向上查找，直到找到该属性或方法或到达链的末端（即null）。
      </h3>
      <h3>
        原型的使用使得方法和属性可以在多个对象之间<b>共享</b>，从而节省内存并提高性能。<b>通过原型，我们可以实现继承，使得子类可以访问父类的方法和属性</b>。这种机制是JavaScript面向对象编程的核心。
      </h3>
    </div>

    <div>
      <img :src="img" loading="lazy" alt="">
    </div>

    <!-- 原型链可视化 -->
    <div class="prototype-chain">
      <div class="chain-item instance">
        <span class="title">实例对象</span>
        <div class="props">
          <div>name: '小明'</div>
          <div class="proto-line">__proto__</div>
        </div>
      </div>

      <div class="chain-arrow">➤</div>

      <div class="chain-item prototype">
        <span class="title">Person.prototype</span>
        <div class="props">
          <div>constructor: Person</div>
          <div>sayHello()</div>
          <div class="proto-line">__proto__</div>
        </div>
      </div>

      <div class="chain-arrow">➤</div>

      <div class="chain-item object">
        <span class="title">Object.prototype</span>
        <div class="props">
          <div>toString()</div>
          <div>hasOwnProperty()</div>
          <div class="proto-line">__proto__</div>
        </div>
      </div>

      <div class="chain-arrow">➤</div>

      <div class="chain-item null">null</div>
    </div>

    <!-- 核心概念 -->
    <div class="concept-grid">
      <div class="concept-card">
        <h2>📌 原型使用方式</h2>
        <pre><code>function Person(name) {
  this.name = name;
}

// 原型方法
Person.prototype.sayHello = function() {
  console.log(`Hello, ${this.name}!`);
};

const person = new Person('小明');
person.sayHello(); // 通过原型链调用</code></pre>
      </div>

      <div class="concept-card">
        <h2>💡 使用场景</h2>
        <ul>
          <li>实现方法复用，节省内存</li>
          <li>创建自定义对象类型</li>
          <li>实现继承机制</li>
          <li>扩展内置对象功能</li>
        </ul>
      </div>
    </div>

    <!-- 继承示例 -->
    <div class="inheritance-example">
      <h2>🧬 原型继承示例</h2>
      <pre><code>function Student(name, major) {
  Person.call(this, name);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log(`${this.name} is studying ${this.major}`);
};</code></pre>
    </div>

    <!-- 注意事项 -->
    <div class="notice-section">
      <h2>⚠️ 注意事项</h2>
      <div class="notices">
        <div class="notice">
          <div class="icon">❌</div>
          <p>不要直接修改内置对象的原型</p>
        </div>
        <div class="notice">
          <div class="icon">📌</div>
          <p>避免创建过长的原型链影响性能</p>
        </div>
        <div class="notice">
          <div class="icon">🔍</div>
          <p>hasOwnProperty 和 in 操作符的区别</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import img from '@/assets/js/prototype-chain.png'
// 示例代码逻辑可根据需要添加
class Person {
  public name: string
  constructor(name: string) {
    this.name = name
  }
  say() { }
}
// const Peter = new Person('Peter')


</script>

<style scoped>
div,
span {
  color: #000;
}

.prototype-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;
}

.main-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea, #4ecdc4);
  /* -webkit-background-clip: text; */
  -webkit-text-fill-color: #fff;
}

.prototype-chain {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 4rem 0;
  position: relative;
}

.chain-item {
  padding: 1.5rem;
  border-radius: 12px;
  min-width: 200px;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease;
}

.chain-item:hover {
  transform: translateY(-5px);
}

.instance {
  background: #ffe082;
  border: 2px solid #ffca28;
}

.prototype {
  background: #c8e6c9;
  border: 2px solid #66bb6a;
}

.object {
  background: #b3e5fc;
  border: 2px solid #29b6f6;
}

.null {
  background: #ef9a9a;
  border: 2px solid #ef5350;
  padding: 1rem 2rem;
}

.chain-arrow {
  font-size: 2rem;
  color: #666;
  animation: arrowPulse 1.5s infinite;
}

@keyframes arrowPulse {

  0%,
  100% {
    opacity: 0.5;
    transform: translateX(0);
  }

  50% {
    opacity: 1;
    transform: translateX(5px);
  }
}

.props {
  margin-top: 1rem;
  text-align: left;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.8rem;
  border-radius: 8px;
}

.proto-line {
  color: #666;
  font-weight: bold;
  margin: 0.5rem 0;
  position: relative;
}

.proto-line::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: currentColor;
}

.concept-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 3rem 0;
}

.concept-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

pre {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
}

.inheritance-example {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.notice-section {
  background: #fff3e0;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 3rem;
}

.notices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.notice {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.notice .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}
</style>
