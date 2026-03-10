<template>
  <div class="ts-class-guide">
    <header class="guide-header">
      <h1 class="title">TypeScript 类(Class)基础解析</h1>
      <p class="subtitle">掌握面向对象编程的核心特性</p>
    </header>

    <div class="content-grid">
      <!-- 基础类定义 -->
      <section class="class-section">
        <h2 class="section-title">🏗️ 基础类定义</h2>
        <div class="feature-card">
          <h3>基本类结构</h3>
          <pre class="code-block"><code>class Person {
  // 属性声明
  name: string
  age: number

  // 构造函数
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  // 方法
  greet() {
    return `Hello, my name is ${this.name}`
  }
}

const person = new Person('Alice', 25)
person.greet() // "Hello, my name is Alice"</code></pre>
        </div>
      </section>

      <!-- 访问修饰符 -->
      <section class="class-section">
        <h2 class="section-title">🔐 访问修饰符</h2>
        <div class="feature-card">
          <h3>public (默认)</h3>
          <pre class="code-block"><code>class Animal {
  public name: string  // public可省略

  constructor(name: string) {
    this.name = name
  }

  public move(distance: number) {
    console.log(`${this.name} moved ${distance}m`)
  }
}</code></pre>
        </div>

        <div class="feature-card">
          <h3>private</h3>
          <pre class="code-block"><code>class BankAccount {
  private balance: number

  constructor(initialBalance: number) {
    this.balance = initialBalance
  }

  deposit(amount: number) {
    this.balance += amount
  }

  // 外部无法直接访问balance
}

const account = new BankAccount(1000)
// account.balance // 错误！</code></pre>
        </div>

        <div class="feature-card">
          <h3>protected</h3>
          <pre class="code-block"><code>class Vehicle {
  protected speed: number

  accelerate() {
    this.speed += 10
  }
}

class Car extends Vehicle {
  turboBoost() {
    this.speed += 50  // 子类可以访问
  }
}

const car = new Car()
// car.speed // 错误！外部不能访问</code></pre>
        </div>
      </section>

      <!-- 高级特性 -->
      <section class="class-section">
        <h2 class="section-title">🚀 高级类特性</h2>
        <div class="feature-card">
          <h3>readonly 属性</h3>
          <pre class="code-block"><code>class Circle {
  readonly PI = 3.14
  readonly radius: number

  constructor(radius: number) {
    this.radius = radius
  }

  get area() {
    return this.PI * this.radius ** 2
  }
}

const circle = new Circle(5)
// circle.radius = 10 // 错误！</code></pre>
        </div>

        <div class="feature-card">
          <h3>getter/setter</h3>
          <pre class="code-block"><code>class Temperature {
  private _celsius = 0

  get celsius() {
    return this._celsius
  }

  set celsius(value: number) {
    if (value &lt; -273.15) {
      throw new Error('温度不能低于绝对零度')
    }
    this._celsius = value
  }

  get fahrenheit() {
    return this._celsius * 1.8 + 32
  }
}

const temp = new Temperature()
temp.celsius = 25 // 调用setter
console.log(temp.fahrenheit) // 77</code></pre>
        </div>

        <div class="feature-card">
          <h3>静态成员</h3>
          <pre class="code-block"><code>class MathHelper {
  static PI = 3.1415926

  static circleArea(radius: number) {
    return this.PI * radius ** 2
  }
}

console.log(MathHelper.PI) // 3.1415926
MathHelper.circleArea(5) // 78.539815</code></pre>
        </div>
      </section>

      <!-- 类与接口 -->
      <section class="class-section">
        <h2 class="section-title">🤝 类与接口</h2>
        <div class="feature-card">
          <h3>实现接口</h3>
          <pre class="code-block"><code>interface ClockInterface {
  currentTime: Date
  setTime(d: Date): void
}

class Clock implements ClockInterface {
  currentTime: Date = new Date()

  setTime(d: Date) {
    this.currentTime = d
  }
}</code></pre>
        </div>

        <div class="feature-card">
          <h3>抽象类</h3>
          <pre class="code-block"><code>abstract class Animal {
  abstract makeSound(): void

  move(): void {
    console.log('roaming the earth...')
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('Woof! Woof!')
  }
}

// const animal = new Animal() // 错误！</code></pre>
        </div>
      </section>
    </div>

    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践</h2>
      <div class="practice-grid">
        <div class="practice-card">
          <h3>Vue组件中的类</h3>
          <pre class="code-block"><code>// 使用类式组件
@Component
class MyComponent extends Vue {
  private count = 0

  increment() {
    this.count++
  }

  get doubleCount() {
    return this.count * 2
  }
}</code></pre>
        </div>

        <div class="practice-card">
          <h3>this类型约束</h3>
          <pre class="code-block"><code>class Box {
  content = ""

  set(value: string): this {
    this.content = value
    return this
  }

  reset() {
    this.content = ""
    return this
  }
}

new Box().set("hello").reset()</code></pre>
        </div>

        <div class="practice-card">
          <h3>私有字段(#语法)</h3>
          <pre class="code-block"><code>class Person {
  #age: number  // 真正的私有字段

  constructor(age: number) {
    this.#age = age
  }

  getAge() {
    return this.#age
  }
}

const p = new Person(30)
// p.#age // 语法错误</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 示例类定义
class ExampleUser {
  private id: number
  public name: string = '123'
  protected email?: string

  constructor(id: number, name?: string) {
    this.id = id
    this.name = name ?? 'default'
  }

  get userId() {
    return `user-${this.id}`
  }
}

// 示例抽象类
abstract class Shape {
  abstract area(): number
  abstract perimeter(): number
}
</script>

<style lang="less" scoped>
.ts-class-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-weight: 800;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
}

.section-title {
  font-size: 1.8rem;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 2px;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.class-section {
  h2 {
    font-size: 1.5rem;
    color: #1e40af;
  }
}

.feature-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.2rem;
  }
}

.code-block {
  background: #1e293b;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #f8fafc;
    line-height: 1.5;
    white-space: pre;
  }
}

.best-practice {
  margin-bottom: 3rem;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  pre {
    margin: 0;
  }
}
</style>
