<template>
  <div class="class-reference">
    <!-- 标题区域 -->
    <header class="header">
      <h1>JavaScript Class 基本指南</h1>
      <p class="subtitle">深入解析 JavaScript 类及其核心特性</p>
    </header>

    <!-- 内容导航 -->
    <div class="navigation">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="scrollTo(section.id)"
        class="nav-btn"
      >
        {{ section.title }}
      </button>
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- Class 作用 -->
      <section :id="sections[0].id" class="section-card">
        <div class="section-header">
          <h2>Class 的作用</h2>
          <div class="icon">🎯</div>
        </div>
        <div class="section-content">
          <p>JavaScript 的类是基于原型继承的语法糖，提供了更清晰、更面向对象的语法来创建对象和处理继承。</p>

          <div class="features-grid">
            <div class="feature">
              <h3>封装性</h3>
              <p>将数据和操作数据的方法绑定在一起</p>
            </div>
            <div class="feature">
              <h3>继承性</h3>
              <p>通过继承创建子类，复用父类功能</p>
            </div>
            <div class="feature">
              <h3>多态性</h3>
              <p>子类可以重写父类方法，实现不同行为</p>
            </div>
            <div class="feature">
              <h3>抽象性</h3>
              <p>定义接口而不指定具体实现</p>
            </div>
          </div>

          <div class="comparison">
            <h3>Class 与原型继承对比</h3>
            <div class="code-comparison">
              <div>
                <h4>ES5 原型继承</h4>
                <pre>function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  return `Hello, ${this.name}`;
};

const john = new Person('John');
john.sayHello();</pre>
              </div>
              <div>
                <h4>ES6 Class</h4>
                <pre>class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}`;
  }
}

const john = new Person('John');
john.sayHello();</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 静态属性与方法 -->
      <section :id="sections[1].id" class="section-card">
        <div class="section-header">
          <h2>静态属性与静态方法</h2>
          <div class="icon">⚡</div>
        </div>
        <div class="section-content">
          <p>静态成员属于类本身而不是类的实例，通过 <code>static</code> 关键字定义。</p>

          <h3>静态属性</h3>
          <pre>class MathUtils {
  static PI = 3.14159;
  static version = '1.0';
}

console.log(MathUtils.PI); // 3.14159</pre>

          <h3>静态方法</h3>
          <pre>class MathUtils {
  static sum(a, b) {
    return a + b;
  }

  static average(...nums) {
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }
}

console.log(MathUtils.sum(5, 10)); // 15
console.log(MathUtils.average(1, 2, 3, 4)); // 2.5</pre>

          <div class="important-note">
            <h4>this 指向</h4>
            <p>在静态方法中，<code>this</code> 指向类本身（构造函数），而不是实例。</p>
            <pre>class MyClass {
  static staticMethod() {
    console.log(this === MyClass); // true
  }
}

MyClass.staticMethod();</pre>
          </div>

          <div class="use-case">
            <h3>使用场景</h3>
            <ul>
              <li>工具类函数（如 MathUtils）</li>
              <li>工厂方法</li>
              <li>不需要实例化的辅助方法</li>
              <li>类级别的配置属性</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 原型方法 -->
      <section :id="sections[2].id" class="section-card">
        <div class="section-header">
          <h2>原型方法</h2>
          <div class="icon">🔍</div>
        </div>
        <div class="section-content">
          <p>原型方法定义在类的原型上，由所有实例共享，通过实例调用。</p>

          <pre>class Person {
  constructor(name) {
    this.name = name;
  }

  // 原型方法
  greet() {
    return `Hello, my name is ${this.name}`;
  }

  // 另一个原型方法
  introduce() {
    return `I am ${this.name}`;
  }
}

const alice = new Person('Alice');
console.log(alice.greet()); // Hello, my name is Alice</pre>

          <div class="important-note">
            <h4>this 指向</h4>
            <p>在原型方法中，<code>this</code> 指向调用该方法的实例对象。</p>
            <pre>class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter();
counter.increment(); // 1</pre>
          </div>

          <div class="warning">
            <h4>注意事项</h4>
            <ul>
              <li>避免将原型方法提取为独立函数，否则可能丢失 <code>this</code> 绑定</li>
              <li>在事件处理程序中调用原型方法时，注意 <code>this</code> 可能指向 DOM 元素</li>
              <li>解决方法：使用箭头函数或绑定 <code>this</code></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 静态块 -->
      <section :id="sections[3].id" class="section-card">
        <div class="section-header">
          <h2>静态块</h2>
          <div class="icon">🧩</div>
        </div>
        <div class="section-content">
          <p>静态块（ES2022+）允许在类内部执行静态初始化代码，每个类可以有多个静态块。</p>

          <pre>class Database {
  static connection;
  static config = {
    host: 'localhost',
    port: 5432
  };

  // 静态块
  static {
    console.log('Initializing database connection...');
    this.connection = this.createConnection();
  }

  static createConnection() {
    // 模拟创建连接
    return `Connected to ${this.config.host}:${this.config.port}`;
  }

  // 另一个静态块
  static {
    console.log('Performing additional setup...');
  }
}

console.log(Database.connection); // Connected to localhost:5432</pre>

          <h3>主要用途</h3>
          <ul>
            <li>复杂的静态属性初始化</li>
            <li>执行类加载时的副作用操作</li>
            <li>访问私有静态字段</li>
            <li>设置多个静态属性之间的关系</li>
          </ul>

          <div class="important-note">
            <h4>执行顺序</h4>
            <p>静态块按声明顺序执行，在静态字段初始化之后执行。</p>
          </div>
        </div>
      </section>

      <!-- 继承 -->
      <section :id="sections[4].id" class="section-card">
        <div class="section-header">
          <h2>继承</h2>
          <div class="icon">🧬</div>
        </div>
        <div class="section-content">
          <p>使用 <code>extends</code> 关键字创建子类，继承父类的属性和方法。</p>

          <pre>class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类构造函数
    this.breed = breed;
  }

  // 重写父类方法
  speak() {
    return `${this.name} barks`;
  }

  // 子类特有方法
  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const rex = new Dog('Rex', 'Labrador');
console.log(rex.speak()); // Rex barks
console.log(rex.fetch()); // Rex fetches the ball</pre>

          <h3>注意事项</h3>
          <ul>
            <li>在子类构造函数中，必须先调用 <code>super()</code> 才能使用 <code>this</code></li>
            <li>子类会继承父类的静态方法和属性</li>
            <li>可以使用 <code>super</code> 关键字访问父类方法</li>
            <li>检查继承关系：<code>rex instanceof Dog</code> 和 <code>rex instanceof Animal</code> 都为 true</li>
            <li>可以继承内置类：<code>class CustomArray extends Array</code></li>
          </ul>
        </div>
      </section>

      <!-- super 关键字 -->
      <section :id="sections[5].id" class="section-card">
        <div class="section-header">
          <h2>super 关键字</h2>
          <div class="icon">🔑</div>
        </div>
        <div class="section-content">
          <p><code>super</code> 用于访问和调用父类的构造函数、方法和属性。</p>

          <div class="usage">
            <h3>在构造函数中</h3>
            <pre>class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类构造函数
    this.age = age;
  }
}</pre>
          </div>

          <div class="usage">
            <h3>在原型方法中</h3>
            <pre>class Animal {
  speak() {
    return 'Animal sound';
  }
}

class Dog extends Animal {
  speak() {
    // 调用父类方法
    return super.speak() + ' but specifically: Woof!';
  }
}

const dog = new Dog();
console.log(dog.speak()); // Animal sound but specifically: Woof!</pre>
          </div>

          <div class="usage">
            <h3>在静态方法中</h3>
            <pre>class Parent {
  static staticMethod() {
    return 'Parent static method';
  }
}

class Child extends Parent {
  static staticMethod() {
    return super.staticMethod() + ' - extended in Child';
  }
}

console.log(Child.staticMethod()); // Parent static method - extended in Child</pre>
          </div>

          <div class="important-note">
            <h4>this 指向</h4>
            <ul>
              <li>在构造函数中：<code>super</code> 作为函数调用时指向父类构造函数</li>
              <li>在方法中：<code>super.method()</code> 调用时 <code>this</code> 指向当前实例</li>
              <li>在静态方法中：<code>super.staticMethod()</code> 调用时 <code>this</code> 指向当前类</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 私有属性 -->
      <section :id="sections[6].id" class="section-card">
        <div class="proposal-status">提案中</div>
        <div class="section-header">
          <h2>私有属性</h2>
          <div class="icon">🔒</div>
        </div>
        <div class="section-content">
          <p>ES2022 正式支持私有属性和方法，使用 <code>#</code> 前缀定义。</p>

          <pre>class Counter {
  // 私有属性
  #count = 0;

  // 私有方法
  #increment() {
    this.#count++;
  }

  // 公共方法
  tick() {
    this.#increment();
    return this.#count;
  }

  // 静态私有属性
  static #maxCount = 100;
}

const counter = new Counter();
console.log(counter.tick()); // 1
console.log(counter.tick()); // 2

// 以下访问会报错
// console.log(counter.#count);
// console.log(counter.#increment());
// console.log(Counter.#maxCount);</pre>

          <h3>特点</h3>
          <ul>
            <li>只能在类内部访问</li>
            <li>子类无法继承私有成员</li>
            <li>支持私有静态属性和方法</li>
            <li>提供真正的封装，外部无法访问</li>
            <li>命名冲突：每个类的私有成员是独立的</li>
          </ul>
        </div>
      </section>

      <!-- constructor -->
      <section :id="sections[7].id" class="section-card">
        <div class="section-header">
          <h2>constructor 的作用</h2>
          <div class="icon">🏗️</div>
        </div>
        <div class="section-content">
          <p><code>constructor</code> 方法是类的构造函数，用于创建和初始化类实例。</p>

          <pre>class Person {
  // 构造函数
  constructor(name, age) {
    // 初始化实例属性
    this.name = name;
    this.age = age;

    // 执行其他初始化逻辑
    this.createdAt = new Date();
  }
}

const john = new Person('John', 30);
console.log(john); // Person { name: 'John', age: 30, createdAt: ... }</pre>

          <h3>主要职责</h3>
          <ul>
            <li>初始化实例属性</li>
            <li>执行必要的设置逻辑</li>
            <li>调用父类构造函数（在继承中）</li>
            <li>验证参数</li>
            <li>设置默认值</li>
          </ul>

          <div class="important-note">
            <h4>注意事项</h4>
            <ul>
              <li>每个类只能有一个构造函数</li>
              <li>如果没有显式定义，会使用默认构造函数：<code>constructor() {}</code></li>
              <li>构造函数可以返回其他对象（但不推荐）</li>
              <li>在子类中必须调用 <code>super()</code> 后才能使用 <code>this</code></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Getter/Setter -->
      <section :id="sections[8].id" class="section-card">
        <div class="section-header">
          <h2>Getter 和 Setter</h2>
          <div class="icon">🔄</div>
        </div>
        <div class="section-content">
          <p>Getter 和 Setter 允许定义访问和修改属性时的自定义行为。</p>

          <pre>class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  // Getter
  get radius() {
    console.log('Getting radius');
    return this._radius;
  }

  // Setter
  set radius(value) {
    console.log('Setting radius');
    if (value <= 0) throw new Error('Invalid radius');
    this._radius = value;
  }

  // 计算属性
  get area() {
    return Math.PI * this._radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.radius); // 5 (日志: Getting radius)
circle.radius = 10; // 日志: Setting radius
console.log(circle.area); // 314.159...</pre>

          <h3>使用场景</h3>
          <ul>
            <li>验证赋值</li>
            <li>计算属性</li>
            <li>访问控制</li>
            <li>延迟加载</li>
            <li>记录访问日志</li>
          </ul>

          <div class="warning">
            <h4>注意事项</h4>
            <ul>
              <li>Getter 和 Setter 不是函数，访问时不需要括号</li>
              <li>避免在 Getter 中执行开销大的操作</li>
              <li>Getter 不应有副作用</li>
              <li>使用下划线约定表示内部属性（如 <code>_radius</code>）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 类字段声明 -->
      <section :id="sections[9].id" class="section-card">
        <div class="section-header">
          <h2>类字段声明</h2>
          <div class="icon">📝</div>
        </div>
        <div class="section-content">
          <p>类字段允许直接在类中声明实例属性，无需在构造函数中初始化。</p>

          <pre>class User {
  // 公共字段
  role = 'user';

  // 私有字段
  #email;

  constructor(name, email) {
    this.name = name;
    this.#email = email;
  }

  // 静态公共字段
  static defaultRole = 'guest';

  // 静态私有字段
  static #secretKey = 'abc123';
}

const user = new User('Alice', 'alice@example.com');
console.log(user.role); // user
console.log(User.defaultRole); // guest</pre>

          <h3>字段初始化顺序</h3>
          <ol>
            <li>基类静态字段和静态块</li>
            <li>派生类静态字段和静态块</li>
            <li>基类实例字段</li>
            <li>基类构造函数</li>
            <li>派生类实例字段</li>
            <li>派生类构造函数</li>
          </ol>

          <div class="important-note">
            <h4>与构造函数初始化的区别</h4>
            <table>
              <thead>
                <tr>
                  <th>类字段</th>
                  <th>构造函数初始化</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>在构造函数之前初始化</td>
                  <td>在构造函数中初始化</td>
                </tr>
                <tr>
                  <td>更简洁的语法</td>
                  <td>更灵活，可基于参数</td>
                </tr>
                <tr>
                  <td>支持私有字段语法</td>
                  <td>使用约定（如 _prefix）表示私有</td>
                </tr>
                <tr>
                  <td>自动绑定方法（使用箭头函数）</td>
                  <td>需要手动绑定或使用箭头函数</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 使用场景与优缺点 -->
      <section :id="sections[10].id" class="section-card">
        <div class="section-header">
          <h2>使用场景与优缺点</h2>
          <div class="icon">⚖️</div>
        </div>
        <div class="section-content">
          <h3>Class 的适用场景</h3>
          <ul>
            <li>创建具有相同结构和行为的多个对象</li>
            <li>需要继承和重写功能的场景</li>
            <li>复杂对象建模（如 UI 组件、游戏实体）</li>
            <li>需要封装数据和行为的场景</li>
            <li>大型应用中的组织代码</li>
          </ul>

          <h3>Class 的优点</h3>
          <ul>
            <li>语法更清晰、更接近传统面向对象语言</li>
            <li>内置继承机制简化了代码复用</li>
            <li>支持静态成员和私有成员</li>
            <li>更好的工具支持（类型检查、自动补全）</li>
            <li>更容易理解和维护</li>
          </ul>

          <h3>Class 的缺点</h3>
          <ul>
            <li>仍然是基于原型的语法糖，不是真正的类</li>
            <li>在简单对象创建上不如工厂函数简洁</li>
            <li>this 绑定问题（尤其在回调函数中）</li>
            <li>私有字段语法较新，旧浏览器不支持</li>
            <li>可能被滥用导致过度复杂的类层次结构</li>
          </ul>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>优先使用类字段声明而不是构造函数初始化</li>
              <li>使用私有字段实现真正封装</li>
              <li>避免过深的继承层次（建议不超过 3 层）</li>
              <li>组合优于继承</li>
              <li>使用静态方法创建工厂函数</li>
              <li>在回调函数中使用箭头函数绑定 this</li>
              <li>考虑使用 TypeScript 增强类型安全</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>JavaScript Class 基本指南 | 最后更新: {{ new Date().toLocaleDateString() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义导航部分
const sections = ref([
  { id: 'section-purpose', title: 'Class 作用' },
  { id: 'section-static', title: '静态成员' },
  { id: 'section-prototype', title: '原型方法' },
  { id: 'section-static-block', title: '静态块' },
  { id: 'section-inheritance', title: '继承' },
  { id: 'section-super', title: 'super 关键字' },
  { id: 'section-private', title: '私有属性' },
  { id: 'section-constructor', title: 'constructor' },
  { id: 'section-getter-setter', title: 'Getter/Setter' },
  { id: 'section-class-fields', title: '类字段声明' },
  { id: 'section-scenarios', title: '使用场景与优缺点' }
]);


// 滚动到指定部分
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@info-color: #118ab2;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.class-reference {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  .nav-btn {
    padding: 8px 16px;
    background: fade(@primary-color, 10%);
    color: @primary-color;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover {
      background: fade(@primary-color, 20%);
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  .proposal-status {
      background: @warning-color;
      color: white;
      padding: 4px 8px;
      width: 200px;
      height: 50px;
      z-index: 100;
      position: absolute;
      top: 20px;
      left: 200px;
      border-radius: 10px;
      font-size: 0.75rem;
      transform: rotate(5deg);
    }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
}

.section-header {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .icon {
    font-size: 1.8rem;
  }
}

.section-content {
  padding: 25px;

  h3 {
    color: @secondary-color;
    margin: 20px 0 10px;
    font-size: 1.2rem;
    padding-bottom: 5px;
    border-bottom: 1px solid @border-color;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }

  ul, ol {
    padding-left: 25px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }

  pre {
    background: @light-bg;
    border-radius: 8px;
    padding: 15px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 15px 0;
    border-left: 4px solid @primary-color;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;

  .feature {
    background: fade(@primary-color, 5%);
    border-radius: 8px;
    padding: 15px;
    text-align: center;

    h3 {
      color: @primary-color;
      margin-top: 0;
      border-bottom: none;
    }
  }
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;

  > div {
    background: @light-bg;
    border-radius: 8px;
    padding: 15px;

    h4 {
      color: @primary-color;
      margin-top: 0;
      margin-bottom: 10px;
    }

    pre {
      margin: 0;
      border-left: none;
    }
  }
}

.important-note, .warning, .use-case {
  background: fade(@info-color, 8%);
  border-left: 4px solid @info-color;
  border-radius: 0 8px 8px 0;
  padding: 15px 20px;
  margin: 20px 0;

  h4 {
    color: @info-color;
    margin-top: 0;
  }

  &.warning {
    background: fade(@warning-color, 15%);
    border-left-color: @warning-color;

    h4 {
      color: darken(@warning-color, 30%);
    }
  }
}

.comparison table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background: fade(@primary-color, 10%);
    color: @primary-color;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.footer {
  text-align: center;
  padding: 30px 20px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 40px;
  border-top: 1px solid @border-color;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .section-header h2 {
    font-size: 1.3rem;
  }

  .code-comparison {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px 0;

    h1 {
      font-size: 1.8rem;
    }
  }

  .navigation {
    flex-direction: column;
    align-items: stretch;

    .nav-btn {
      text-align: center;
    }
  }
}
</style>
