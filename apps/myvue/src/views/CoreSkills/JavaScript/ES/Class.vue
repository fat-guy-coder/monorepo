<template>
  <div class="class-container">
    <header class="header">
      <h1>JavaScript 类(Class)</h1>
      <div class="subtitle">ES6 面向对象编程的语法糖</div>
    </header>

    <section class="card introduction">
      <h2>📚 类的介绍</h2>
      <div class="introduction-content">
        <p>
          在 JavaScript
          中，类是创建对象的一种方式。类提供了一种更清晰和简洁的语法来创建构造函数和处理继承。使用类可以更好地组织代码，提高可读性和可维护性。
        </p>
        <h3>类的基本结构</h3>
        <pre><code>class ClassName {
    constructor(parameters) {
    // 构造函数
    }

    methodName() {
    // 方法
    }
  }</code></pre>
        <p>类的定义包括构造函数和方法。构造函数用于初始化对象的属性，而方法则定义了对象的行为。</p>
      </div>
    </section>

    <main class="content">
      <!-- 原理示意图 -->
      <section class="card principle">
        <h2>⚙️ 底层原理</h2>
        <div class="principle-content">
          <div class="prototype-chain">
            <div class="class-box">
              <div class="class-name">Class</div>
              <div class="constructor">constructor</div>
              <div class="methods">
                <div class="method">method1</div>
                <div class="method">method2</div>
              </div>
            </div>
            <div class="arrow">↓ [[Prototype]]</div>
            <div class="instance-box">
              <div class="instance">Instance</div>
              <div class="props">
                <div class="prop">prop1</div>
                <div class="prop">prop2</div>
              </div>
            </div>
          </div>
          <ul class="principle-list">
            <li>▸ 基于原型继承的语法糖</li>
            <li>▸ 类声明不会提升（不同于函数声明）</li>
            <li>▸ 本质仍是构造函数 + 原型对象</li>
            <li>▸ 类方法不可枚举（不同于对象方法）</li>
          </ul>
        </div>
      </section>

      <!-- 基本语法 -->
      <section class="card syntax">
        <h2>📜 基本语法</h2>
        <div class="syntax-grid">
          <div class="syntax-item">
            <h3>1. 类声明</h3>
            <pre><code>class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(\`\${this.name} makes a noise\`);
  }
}

const dog = new Animal('Rex');
dog.speak(); // Rex makes a noise</code></pre>
          </div>

          <div class="syntax-item">
            <h3>2. 类表达式</h3>
            <pre><code>const Person = class {
  constructor(age) {
    this.age = age;
  }

  static createBaby() {
    return new Person(0);
  }
}

const baby = Person.createBaby();
console.log(baby.age); // 0</code></pre>
          </div>
        </div>
      </section>

      <!-- 高级特性 -->
      <section class="card features">
        <h2>🎩 高级特性</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>继承</h3>
            <pre><code>class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类的构造函数
    this.breed = breed;
  }

  bark() {
    super.speak(); // 调用父类的方法
    console.log('Woof!');
  }
}

const dog = new Dog('Rex', 'Labrador');
dog.bark(); // Rex makes a noise
            // Woof!</code></pre>
          </div>

          <div class="feature-card">
            <h3>静态方法</h3>
            <pre><code>class MathUtils {
  static sum(...nums) {
    return nums.reduce((a, b) => a + b);
  }
}

console.log(MathUtils.sum(1, 2, 3)); // 6</code></pre>
          </div>

          <div class="feature-card">
            <h3>静态属性</h3>
            <pre><code>class MathUtils {
  static x;
  static y = 1;
}

console.log(MathUtils.y); // 1</code></pre>
          </div>

          <div class="feature-card">
            <h3>类字段声明(ES2022)</h3>
            <pre><code>class MathUtils {
         y = 1;
}

console.log(new MathUtils().y); // 1</code></pre>
          </div>

          <div class="feature-card">
            <h3>私有字段</h3>
            <pre><code>class User {
  #password;  // 私有字段

  constructor(username, pwd) {
    this.username = username;
    this.#password = pwd;
  }

  validate(pwd) {
    return this.#password === pwd;
  }
}

const user = new User('Alice', 'secret');
console.log(user.validate('secret')); // true</code></pre>
          </div>

          <div class="feature-card">
            <h3>Getter/Setter</h3>
            <pre><code>class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius**2;
  }

  set diameter(value) {
    this.radius = value / 2;
  }
}

const circle = new Circle(10);
console.log(circle.area); // 314.159...
circle.diameter = 20;
console.log(circle.radius); // 10</code></pre>
          </div>
        </div>
      </section>

      <!-- super 关键字 -->
      <section class="card super-keyword">
        <h2>🔑 super 关键字</h2>
        <div class="super-content">
          <p>
            在 JavaScript 中，`super` 关键字用于调用父类的构造函数和方法。它在继承中扮演着重要角色。
          </p>
          <h3>用法</h3>
          <pre class="code-block"><code>class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(\`\${this.name} makes a noise\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类的构造函数
    this.breed = breed;
  }

  bark() {
    super.speak(); // 调用父类的方法
    console.log('Woof!');
  }
}

const dog = new Dog('Rex', 'Labrador');
dog.bark(); // Rex makes a noise
            // Woof!</code></pre>
          <h3>注意事项</h3>
          <ul>
            <li>在派生类的构造函数中，必须在使用 `this` 之前调用 `super()`。</li>
            <li>在静态方法中，`super` 指向父类，而在实例方法中，`super` 指向父类的原型对象。</li>
            <li>调用 `super()` 时，必须传递父类构造函数所需的参数。</li>
          </ul>
        </div>
      </section>

      <!-- Class Static Block -->
      <section class="card static-block">
        <h2>📦 Class Static Block</h2>
        <div class="static-block-content">
          <p>
            Class Static Block 是 ES2022
            引入的特性，允许在类的静态上下文中执行代码。它可以用于初始化静态属性或执行其他静态逻辑。
          </p>
          <h3>用法示例</h3>
          <pre><code>class MyClass {
      static x = 10;
      static y;

      static {
        this.y = this.x * 2; // 在静态块中初始化静态属性
      }
    }

    console.log(MyClass.x); // 10
    console.log(MyClass.y); // 20</code></pre>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card best-practice">
        <h2>✅ 最佳实践</h2>
        <div class="practice-grid">
          <div class="practice do">
            <h3>应该做</h3>
            <ul>
              <li>始终使用 class 语法代替旧式原型继承</li>
              <li>方法间保留空行提高可读性</li>
              <li>优先使用私有字段保护数据 (#field)</li>
              <li>用 static 方法实现工具函数</li>
            </ul>
          </div>

          <div class="practice dont">
            <h3>避免做</h3>
            <ul>
              <li>不要忘记调用 super() 在派生类中</li>
              <li>避免在类中定义箭头函数作为实例方法</li>
              <li>不要直接操作 prototype 属性</li>
              <li>避免过度使用继承（组合优于继承）</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

class father {
  name: string
  #age: number
  static height: number = 180
  constructor(name: string) {
    this.name = name
    this.#age = 18
  }
  speak() {
    console.log(`${this.name} makes a noise`)
  }
  static createBaby() {
    return console.log('baby')
  }
}

class Son extends father {
  constructor(name: string) {
    super(name)
  }
  bark() {
    super.speak()
    console.log('Woof!')
  }

  static sum() {
    super.createBaby()
  }
}
</script>

<style scoped>
/* 新增全局文字颜色设置 */
pre,
h3,
li,
p {
  color: #333;
  /* 设置深灰色 */
}

.super-keyword {
  code {
    color: #fff;
  }
}

/* 调整代码块文字颜色保持对比度 */

.class-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.principle-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.prototype-chain {
  background: #f4f6f8;
  padding: 2rem;
  border-radius: 8px;
}

.class-box,
.instance-box {
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
}

.class-name,
.instance {
  font-weight: bold;
  color: #2c3e50;
}

.constructor {
  color: #e67e22;
  margin: 0.5rem 0;
}

.methods .method {
  color: #2ecc71;
  margin: 0.3rem 0;
}

.props .prop {
  color: #9b59b6;
  margin: 0.3rem 0;
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: #7f8c8d;
  margin: 1rem 0;
}

.principle-list {
  padding-left: 2rem;
  line-height: 1.8;
}

.principle-list li {
  margin: 1rem 0;
  position: relative;
}

.principle-list li::before {
  content: '▸';
  position: absolute;
  left: -1.5rem;
  color: #3498db;
}

.syntax-grid,
.feature-grid,
.practice-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.syntax-item,
.feature-card {
  background: #f8f9fa;
  padding: 1.2rem;
  border-radius: 8px;
}

pre code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.best-practice ul {
  padding-left: 1.5rem;
}

.do {
  border-left: 4px solid #2ecc71;
  padding-left: 1rem;
}

.dont {
  border-left: 4px solid #e74c3c;
  padding-left: 1rem;
}

@media (max-width: 768px) {
  .principle-content {
    grid-template-columns: 1fr;
  }

  .syntax-grid,
  .feature-grid,
  .practice-grid {
    grid-template-columns: 1fr;
  }
}

.code-block {
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
