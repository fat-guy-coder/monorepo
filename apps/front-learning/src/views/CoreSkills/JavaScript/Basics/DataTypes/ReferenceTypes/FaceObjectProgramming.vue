<template>
  <div class="oop-container">
    <header class="header">
      <h1>JavaScript 面向对象编程 (OOP)</h1>
      <p class="subtitle">掌握封装、继承、多态三大核心特性</p>
    </header>

    <div class="content-wrapper">
      <!-- 封装部分 -->
      <section class="section encapsulation">
        <div class="section-header">
          <div class="icon">📦</div>
          <h2>封装 (Encapsulation)</h2>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="concept">
              <h3>概念解析</h3>
              <p>封装是将数据和操作数据的方法绑定在一起，形成一个独立的"对象"，同时隐藏内部实现细节，只暴露必要的接口给外部使用。</p>
              <div class="feature-grid">
                <div class="feature-item">
                  <div class="icon">🔒</div>
                  <h4>数据隐藏</h4>
                  <p>使用私有字段保护对象内部状态</p>
                </div>
                <div class="feature-item">
                  <div class="icon">📡</div>
                  <h4>接口暴露</h4>
                  <p>通过公共方法提供可控的访问方式</p>
                </div>
                <div class="feature-item">
                  <div class="icon">🧩</div>
                  <h4>模块化</h4>
                  <p>将功能封装成独立可复用的单元</p>
                </div>
              </div>
            </div>

            <div class="code-example">
              <h3>代码示例</h3>
              <pre class="code-block">class BankAccount {
  // 私有字段（ES2022）
  #balance = 0;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  // 公共方法 - 存款
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }

  // 公共方法 - 取款
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return amount;
    }
    return 0;
  }

  // 公共方法 - 获取余额
  getBalance() {
    return this.#balance;
  }
}

// 使用示例
const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300</pre>
            </div>

            <div class="use-cases">
              <h3>使用场景</h3>
              <ul>
                <li>创建具有内部状态的对象（如用户账户、购物车）</li>
                <li>实现数据验证和保护（如防止非法数据修改）</li>
                <li>构建可重用组件和模块</li>
                <li>隐藏复杂实现细节，提供简单接口</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 继承部分 -->
      <section class="section inheritance">
        <div class="section-header">
          <div class="icon">🧬</div>
          <h2>继承 (Inheritance)</h2>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="concept">
              <h3>概念解析</h3>
              <p>继承允许一个对象（子类）获取另一个对象（父类）的属性和方法，实现代码复用和层次化设计。</p>
              <div class="feature-grid">
                <div class="feature-item">
                  <div class="icon">♻️</div>
                  <h4>代码复用</h4>
                  <p>共享公共属性和方法</p>
                </div>
                <div class="feature-item">
                  <div class="icon">🏗️</div>
                  <h4>层次结构</h4>
                  <p>构建类之间的父子关系</p>
                </div>
                <div class="feature-item">
                  <div class="icon">🔄</div>
                  <h4>方法重写</h4>
                  <p>子类可以覆盖父类方法</p>
                </div>
              </div>
            </div>

            <div class="code-example">
              <h3>代码示例</h3>
              <pre class="code-block">// 父类：动物
class Animal {
  constructor(name) {
    this.name = name;
  }

  // 公共方法
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

// 子类：狗 - 继承自动物
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类构造函数
    this.breed = breed;
  }

  // 重写父类方法
  speak() {
    console.log(`${this.name} barks!`);
  }

  // 子类特有方法
  fetch(item) {
    console.log(`${this.name} fetches the ${item}.`);
  }
}

// 使用示例
const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak();  // "Buddy barks!"
myDog.fetch('ball'); // "Buddy fetches the ball."</pre>
            </div>

            <div class="use-cases">
              <h3>使用场景</h3>
              <ul>
                <li>创建具有共同特征的相似对象（如UI组件）</li>
                <li>扩展现有功能而不修改原始代码</li>
                <li>构建层次化的类结构（如动物→哺乳动物→狗）</li>
                <li>实现多态的基础</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 多态部分 -->
      <section class="section polymorphism">
        <div class="section-header">
          <div class="icon">🎭</div>
          <h2>多态 (Polymorphism)</h2>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="concept">
              <h3>概念解析</h3>
              <p>多态允许不同类的对象对同一消息（方法调用）做出不同的响应，实现"一个接口，多种实现"。</p>
              <div class="feature-grid">
                <div class="feature-item">
                  <div class="icon">🎯</div>
                  <h4>接口统一</h4>
                  <p>不同对象实现相同接口</p>
                </div>
                <div class="feature-item">
                  <div class="icon">🔄</div>
                  <h4>动态行为</h4>
                  <p>运行时确定具体方法实现</p>
                </div>
                <div class="feature-item">
                  <div class="icon">🧩</div>
                  <h4>灵活扩展</h4>
                  <p>添加新类型不影响现有代码</p>
                </div>
              </div>
            </div>

            <div class="code-example">
              <h3>代码示例</h3>
              <pre class="code-block">// 抽象基类（概念）
class Shape {
  area() {
    throw new Error('Method "area" must be implemented');
  }
}

// 具体子类：圆形
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  // 实现基类方法
  area() {
    return Math.PI * this.radius ** 2;
  }
}

// 具体子类：矩形
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  // 实现基类方法
  area() {
    return this.width * this.height;
  }
}

// 使用多态
function printArea(shape) {
  console.log(`Area: ${shape.area().toFixed(2)}`);
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

printArea(circle);    // Area: 78.54
printArea(rectangle); // Area: 24.00</pre>
            </div>

            <div class="use-cases">
              <h3>使用场景</h3>
              <ul>
                <li>处理多种类型对象的统一接口（如各种形状的面积计算）</li>
                <li>插件系统和扩展机制</li>
                <li>策略模式和命令模式实现</li>
                <li>UI组件的事件处理</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结部分 -->
      <section class="section summary">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>OOP 三大特性总结</h2>
        </div>
        <div class="card">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>目的</th>
                  <th>关键实现</th>
                  <th>优势</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>封装</td>
                  <td>隐藏内部实现细节</td>
                  <td>私有字段、公共方法</td>
                  <td>提高安全性，降低耦合</td>
                </tr>
                <tr>
                  <td>继承</td>
                  <td>实现代码复用</td>
                  <td>extends, super</td>
                  <td>减少冗余，建立层次关系</td>
                </tr>
                <tr>
                  <td>多态</td>
                  <td>统一接口不同实现</td>
                  <td>方法重写、接口实现</td>
                  <td>提高灵活性，易于扩展</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="best-practices">
            <h3>最佳实践建议</h3>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="icon">💡</div>
                <h4>组合优于继承</h4>
                <p>优先使用对象组合而不是类继承，避免过深的继承链</p>
              </div>
              <div class="tip-card">
                <div class="icon">🧱</div>
                <h4>单一职责原则</h4>
                <p>每个类应该只有一个改变的理由</p>
              </div>
              <div class="tip-card">
                <div class="icon">🔌</div>
                <h4>面向接口编程</h4>
                <p>依赖抽象而不是具体实现</p>
              </div>
              <div class="tip-card">
                <div class="icon">🧪</div>
                <h4>适度使用</h4>
                <p>在需要管理状态和复杂行为时使用OOP</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>JavaScript OOP 核心概念 | 封装 · 继承 · 多态 | 使用 Vue3(TS + Setup) 实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const accountBalance = ref(1300);
</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --encapsulation-color: #4361ee;
  --inheritance-color: #3a0ca3;
  --polymorphism-color: #7209b7;
  --success-color: #06d6a0;
  --warning-color: #ffd166;
  --light-bg: #f8f9fa;
  --card-bg: #ffffff;
  --text-color: #2b2d42;
  --border-color: #e9ecef;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --border-radius: 12px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.oop-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
  background-color: var(--light-bg);
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--border-radius);
  color: white;
  box-shadow: var(--shadow);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: #000;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.section {
  .section-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;

    .icon {
      font-size: 2rem;
      background: rgba(67, 97, 238, 0.1);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 1.8rem;
      color: var(--text-color);
    }
  }

  &.encapsulation .section-header .icon {
    background: rgba(67, 97, 238, 0.1);
    color: var(--encapsulation-color);
  }

  &.inheritance .section-header .icon {
    background: rgba(58, 12, 163, 0.1);
    color: var(--inheritance-color);
  }

  &.polymorphism .section-header .icon {
    background: rgba(114, 9, 183, 0.1);
    color: var(--polymorphism-color);
  }
}

.card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 25px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
}

.card-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;

    .use-cases {
      grid-column: span 2;
    }
  }
}

.concept,
.code-example,
.use-cases {
  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border-color);
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--primary-color);
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.feature-item {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  .icon {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
}

.code-block {
  background: #f8f9fa;
  color: #2b2d42;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

  pre {
    white-space: pre-wrap;
  }
}

.use-cases {
  ul {
    list-style: none;
    padding-left: 20px;

    li {
      padding: 10px 0;
      position: relative;
      padding-left: 30px;

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 10px;
        width: 22px;
        height: 22px;
        background: var(--success-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 20px 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 15px;
      text-align: left;
    }

    thead {
      background: var(--primary-color);
      color: white;

      th {
        font-weight: 500;
      }
    }

    tbody tr {
      border-bottom: 1px solid var(--border-color);

      &:nth-child(odd) {
        background: rgba(67, 97, 238, 0.03);
      }

      &:hover {
        background: rgba(67, 97, 238, 0.08);
      }
    }
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.tip-card {
  background: linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(58, 12, 163, 0.05));
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    opacity: 0.9;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 25px 0;
  color: #6c757d;
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .card-content {
    grid-template-columns: 1fr;

    .use-cases {
      grid-column: span 1;
    }
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
