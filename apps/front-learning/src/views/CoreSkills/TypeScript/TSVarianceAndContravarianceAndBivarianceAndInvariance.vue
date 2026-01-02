<template>
  <div class="variance-container">
    <header class="header">
      <div class="header-content">
        <h1 class="title">TypeScript 类型变异基础介绍</h1>
        <p class="subtitle">深入理解协变、逆变、双变与抗变</p>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-value">4</div>
            <div class="stat-label">核心概念</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">100%</div>
            <div class="stat-label">类型安全</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">★</div>
            <div class="stat-label">高级特性</div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 类型系统基础 -->
      <section class="section intro-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>类型系统基础</h2>
        </div>

        <div class="intro-content">
          <div class="intro-text">
            <p>类型变异（Variance）描述了在类型系统中，当存在继承关系时，更复杂的类型（如泛型、函数类型）如何保持类型兼容性。</p>

            <div class="key-concepts">
              <div class="concept-card">
                <div class="concept-icon">A</div>
                <h3>子类型关系</h3>
                <p>如果类型S是类型T的子类型（S ⊆ T），则S可以安全地用在期望T的任何地方</p>
              </div>

              <div class="concept-card">
                <div class="concept-icon">B</div>
                <h3>类型兼容性</h3>
                <p>TypeScript使用结构化类型系统（鸭子类型），关注形状而非声明</p>
              </div>
            </div>

            <div class="example-hierarchy">
              <h3>基本类型层次示例</h3>
              <div class="hierarchy-tree">
                <div class="hierarchy-node">Animal</div>
                <div class="hierarchy-arrow">↓</div>
                <div class="hierarchy-node">Dog</div>
                <div class="hierarchy-arrow">↓</div>
                <div class="hierarchy-node">GoldenRetriever</div>
              </div>
              <p class="hierarchy-note">Dog ⊆ Animal, GoldenRetriever ⊆ Dog</p>
            </div>
          </div>

          <div class="type-relations">
            <h3>类型变异关系</h3>
            <div class="relations-grid">
              <div class="relation-card">
                <div class="relation-icon covariant">+</div>
                <h4>协变</h4>
                <p>保持子类型方向</p>
              </div>

              <div class="relation-card">
                <div class="relation-icon contravariant">-</div>
                <h4>逆变</h4>
                <p>反转子类型方向</p>
              </div>

              <div class="relation-card">
                <div class="relation-icon bivariant">±</div>
                <h4>双变</h4>
                <p>双向兼容</p>
              </div>

              <div class="relation-card">
                <div class="relation-icon invariant">!</div>
                <h4>抗变</h4>
                <p>严格相同类型</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 协变 -->
      <section class="section covariant-section">
        <div class="section-header">
          <div class="section-icon">📈</div>
          <h2>协变 (Covariance)</h2>
          <p class="section-subtitle">保持子类型方向：如果 A ⊆ B，则 F&lt;A&gt; ⊆ F&lt;B&gt;</p>
        </div>

        <div class="variance-content">
          <div class="explanation">
            <h3>概念解释</h3>
            <p>协变是最直观的变异方式，它保持子类型关系的方向。如果类型A是类型B的子类型，则F&lt;A&gt;也是F&lt;B&gt;的子类型。</p>
            <p>在TypeScript中，数组、Promise和只读属性都是协变的。</p>

            <div class="analogy">
              <h4>现实类比</h4>
              <p>想象一个水果篮子：</p>
              <ul>
                <li>苹果篮子 ⊆ 水果篮子</li>
                <li>橙子篮子 ⊆ 水果篮子</li>
              </ul>
              <p>因为苹果和橙子都是水果，所以装苹果的篮子可以当作水果篮子使用</p>
            </div>
          </div>

          <div class="code-examples">
            <h3>代码示例</h3>
            <div class="example-card">
              <h4>数组协变</h4>
              <div class="code-block">
                <pre><code>class Animal { name!: string }
class Dog extends Animal { bark() {} }

// 协变：Dog[] 可以赋值给 Animal[]
let animals: Animal[] = [];
let dogs: Dog[] = [new Dog()];

animals = dogs; // ✅ 允许 - 协变

// 可以安全地添加Animal到数组中
animals.push(new Animal());</code></pre>
              </div>
              <p class="example-note">注意：虽然类型系统允许，但添加Animal到Dog数组中可能在运行时出错</p>
            </div>

            <div class="example-card">
              <h4>Promise协变</h4>
              <div class="code-block">
                <pre><code>function getAnimal(): Promise&lt;Animal> {
  return Promise.resolve(new Animal());
}

function getDog(): Promise&lt;Dog> {
  return Promise.resolve(new Dog());
}

// Promise&lt;Dog&gt; 可以赋值给 Promise&lt;Animal&gt;
let animalPromise: Promise&lt;Animal> = getDog(); // ✅ 协变</code></pre>
              </div>
            </div>
          </div>

          <div class="use-cases">
            <h3>使用场景</h3>
            <ul>
              <li>读取集合中的元素（只读操作）</li>
              <li>返回值的类型（函数返回类型是协变的）</li>
              <li>React组件的props类型</li>
              <li>状态管理中的只读状态</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 逆变 -->
      <section class="section contravariant-section">
        <div class="section-header">
          <div class="section-icon">📉</div>
          <h2>逆变 (Contravariance)</h2>
          <p class="section-subtitle">反转子类型方向：如果 A ⊆ B，则 F&lt;B&gt; ⊆ F&lt;A&gt;</p>
        </div>

        <div class="variance-content">
          <div class="explanation">
            <h3>概念解释</h3>
            <p>逆变反转了子类型关系的方向。如果A是B的子类型，则F&lt;B&gt;是F&lt;A&gt;的子类型。</p>
            <p>在TypeScript中，函数参数类型是逆变的（在strictFunctionTypes启用时）。</p>

            <div class="analogy">
              <h4>现实类比</h4>
              <p>想象一个动物喂食器：</p>
              <ul>
                <li>狗喂食器 ⊆ 动物喂食器</li>
              </ul>
              <p>因为狗喂食器可以喂狗（一种动物），但动物喂食器不一定能安全喂狗（可能喂其他动物）</p>
            </div>
          </div>

          <div class="code-examples">
            <h3>代码示例</h3>
            <div class="example-card">
              <h4>函数参数逆变</h4>
              <div class="code-block">
                <pre><code>class Animal { name!: string }
class Dog extends Animal { bark() {} }

type AnimalHandler = (animal: Animal) => void;
type DogHandler = (dog: Dog) => void;

let animalHandler: AnimalHandler = (animal) => console.log(animal.name);
let dogHandler: DogHandler = (dog) => dog.bark();

// 逆变：AnimalHandler 可以赋值给 DogHandler
dogHandler = animalHandler; // ✅ 允许 - 逆变

// 但反过来不安全
// animalHandler = dogHandler; // ❌ 错误 - 违反类型安全</code></pre>
              </div>
              <p class="example-note">在strictFunctionTypes启用时，函数参数是逆变的</p>
            </div>

            <div class="example-card">
              <h4>事件处理逆变</h4>
              <div class="code-block">
                <pre><code>interface Event { timestamp: number }
interface MouseEvent extends Event { x: number; y: number }

type EventHandler&lt;E extends Event&gt; = (event: E) => void;

// 逆变：EventHandler&lt;Event&gt; ⊆ EventHandler&lt;MouseEvent&gt;
let mouseHandler: EventHandler&lt;MouseEvent&gt; = (e) => console.log(e.x, e.y);
let generalHandler: EventHandler&lt;Event&gt; = (e) => console.log(e.timestamp);

// 安全赋值：因为可以处理所有事件的处理器也可以处理鼠标事件
mouseHandler = generalHandler; // ✅ 逆变</code></pre>
              </div>
            </div>
          </div>

          <div class="use-cases">
            <h3>使用场景</h3>
            <ul>
              <li>函数参数类型</li>
              <li>事件处理器</li>
              <li>比较函数（如Array.sort）</li>
              <li>回调函数参数</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 双变 -->
      <section class="section bivariant-section">
        <div class="section-header">
          <div class="section-icon">🔄</div>
          <h2>双变 (Bivariance)</h2>
          <p class="section-subtitle">双向兼容：同时允许协变和逆变</p>
        </div>

        <div class="variance-content">
          <div class="explanation">
            <h3>概念解释</h3>
            <p>双变是TypeScript在strictFunctionTypes禁用时的默认行为，允许函数参数同时协变和逆变。</p>
            <p>这提供了更大的灵活性，但牺牲了类型安全性。</p>

            <div class="analogy">
              <h4>现实类比</h4>
              <p>想象一个万能适配器：</p>
              <ul>
                <li>既可以把苹果当水果使用（协变）</li>
                <li>也可以把水果当苹果使用（逆变）</li>
              </ul>
              <p>虽然灵活，但可能不安全（把橙子当苹果使用）</p>
            </div>
          </div>

          <div class="code-examples">
            <h3>代码示例</h3>
            <div class="example-card">
              <h4>方法参数双变</h4>
              <div class="code-block">
                <pre><code>class Animal { name!: string }
class Dog extends Animal { bark() {} }

class Shelter {
  // 方法参数默认是双变的
  adopt(animal: Animal) {
    console.log(`Adopted ${animal.name}`);
  }
}

class DogShelter extends Shelter {
  // 重写方法，参数更具体
  adopt(dog: Dog) { // ✅ 允许 - 双变
    console.log(`Adopted dog ${dog.name}`);
    dog.bark();
  }
}

// 使用
const animalShelter: Shelter = new DogShelter();
animalShelter.adopt(new Animal()); // 运行时可能出错！</code></pre>
              </div>
              <p class="example-note">在strictFunctionTypes禁用时，方法参数是双变的</p>
            </div>

            <div class="example-card">
              <h4>数组方法双变</h4>
              <div class="code-block">
                <pre><code>class Animal {}
class Dog extends Animal {}

// Array.forEach回调是双变的
const animals: Animal[] = [new Animal(), new Dog()];
const dogs: Dog[] = [new Dog()];

// 协变方向
animals.forEach((animal: Animal) => {}); // ✅

// 逆变方向（不安全！）
dogs.forEach((dog: Dog) => dog.bark());
animals.forEach((dog: Dog) => dog.bark()); // ❌ 运行时错误</code></pre>
              </div>
            </div>
          </div>

          <div class="use-cases">
            <h3>使用场景与风险</h3>
            <ul>
              <li>与JavaScript互操作</li>
              <li>遗留代码兼容</li>
              <li>DOM事件处理</li>
              <li class="warning">风险：可能引入运行时错误</li>
              <li class="tip">建议：启用strictFunctionTypes提高安全性</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 抗变 -->
      <section class="section invariant-section">
        <div class="section-header">
          <div class="section-icon">⛔</div>
          <h2>抗变 (Invariance)</h2>
          <p class="section-subtitle">严格类型要求：必须完全相同</p>
        </div>

        <div class="variance-content">
          <div class="explanation">
            <h3>概念解释</h3>
            <p>抗变是最严格的变异方式，要求类型必须完全相同，不接受任何子类型或超类型。</p>
            <p>在TypeScript中，可变数据通常需要抗变以保证类型安全。</p>

            <div class="analogy">
              <h4>现实类比</h4>
              <p>想象一个血液输送系统：</p>
              <ul>
                <li>O型血只能输给O型血患者</li>
                <li>A型血只能输给A型血患者</li>
              </ul>
              <p>任何变异都可能导致生命危险</p>
            </div>
          </div>

          <div class="code-examples">
            <h3>代码示例</h3>
            <div class="example-card">
              <h4>可变数组抗变</h4>
              <div class="code-block">
                <pre><code>class Animal {}
class Dog extends Animal {}

// 可变数组是抗变的
let animals: Animal[] = [];
let dogs: Dog[] = [new Dog()];

// 协变赋值
// animals = dogs; // ❌ 错误 - 抗变禁止

// 逆变赋值
// dogs = animals; // ❌ 错误 - 抗变禁止

// 只有相同类型允许
let moreDogs: Dog[] = dogs; // ✅</code></pre>
              </div>
              <p class="example-note">TypeScript中可变数组实际上是协变的，但应该视为抗变以保证安全</p>
            </div>

            <div class="example-card">
              <h4>泛型约束抗变</h4>
              <div class="code-block">
                <pre><code>class Box&lt;T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }

  setValue(newValue: T) {
    this.value = newValue;
  }
}

const animalBox = new Box(new Animal());
const dogBox = new Box(new Dog());

// 抗变：不允许互相赋值
// animalBox = dogBox; // ❌ 类型不兼容
// dogBox = animalBox; // ❌ 类型不兼容</code></pre>
              </div>
              <p class="example-note">对于可变泛型类型，TypeScript默认是抗变的</p>
            </div>
          </div>

          <div class="use-cases">
            <h3>使用场景</h3>
            <ul>
              <li>可变数据存储</li>
              <li>读写集合（如Array）</li>
              <li>数据库实体</li>
              <li>状态管理中的可写存储</li>
              <li>需要精确类型匹配的场景</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 总结对比 -->
      <section class="section comparison-section">
        <div class="section-header">
          <div class="section-icon">📊</div>
          <h2>类型变异对比总结</h2>
          <p class="section-subtitle">四种类型变异的特性与应用场景</p>
        </div>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>变异类型</th>
                <th>关系</th>
                <th>安全级别</th>
                <th>TypeScript示例</th>
                <th>使用建议</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>协变</strong></td>
                <td>A ⊆ B ⇒ F&lt;A&gt; ⊆ F&lt;B&gt;</td>
                <td>高（只读操作）</td>
                <td>数组读取、Promise、返回类型</td>
                <td>推荐用于只读数据</td>
              </tr>
              <tr>
                <td><strong>逆变</strong></td>
                <td>A ⊆ B ⇒ F&lt;B&gt; ⊆ F&lt;A&gt;</td>
                <td>高（函数参数）</td>
                <td>函数参数、事件处理</td>
                <td>推荐用于函数参数</td>
              </tr>
              <tr>
                <td><strong>双变</strong></td>
                <td>双向兼容</td>
                <td>低（可能不安全）</td>
                <td>方法参数（默认）</td>
                <td>避免使用，启用strictFunctionTypes</td>
              </tr>
              <tr>
                <td><strong>抗变</strong></td>
                <td>必须完全相等</td>
                <td>非常高</td>
                <td>可变数据、精确匹配</td>
                <td>推荐用于可变数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>启用<code>strictFunctionTypes</code>以获得安全的逆变行为</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>对只读数据使用协变</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>对函数参数使用逆变</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">✓</div>
              <p>对可变数据使用抗变</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">⚠</div>
              <p>避免依赖双变行为</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">🔍</div>
              <p>使用<code>Readonly&lt;T&gt;</code>明确协变意图</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>TypeScript 高级类型系统 | 类型变异基础介绍 | Vue 3 技术演示</p>
      <p>理解类型变异有助于构建更安全、更健壮的类型系统</p>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>


.variance-container {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to bottom, #f7f9fc, #eef2f7);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
}

.header {
  text-align: center;
  padding: 50px 20px;
  margin-bottom: 30px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;

  .header-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .title {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 15px;
    background: linear-gradient(45deg, #4361ee, #3a0ca3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #555;
    max-width: 600px;
    margin: 0 auto 25px;
  }
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.stat-card {
  background: #f0f7ff;
  padding: 15px 25px;
  border-radius: 12px;
  min-width: 120px;
  text-align: center;
  border: 1px solid #d0e2ff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    color: #4361ee;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f4f8;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #2b2d42;
    margin: 0;
  }

  .section-icon {
    font-size: 2.5rem;
    margin-right: 20px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f7ff;
    border-radius: 16px;
    color: #4361ee;
  }

  .section-subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-left: 80px;
    margin-top: 5px;
  }
}

.intro-content {
  display: flex;
  gap: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.intro-text {
  flex: 1;

  p {
    font-size: 1.1rem;
    color: #444;
    margin-bottom: 20px;
    line-height: 1.8;
  }
}

.key-concepts {
  display: flex;
  gap: 20px;
  margin: 25px 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.concept-card {
  flex: 1;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .concept-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e0f0ff;
    border-radius: 50%;
    margin-bottom: 15px;
    font-weight: 700;
    color: #4361ee;
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.3rem;
    color: #2b2d42;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    color: #555;
  }
}

.example-hierarchy {
  margin-top: 30px;

  h3 {
    font-size: 1.2rem;
    color: #4361ee;
    margin-bottom: 10px;
  }
}

.hierarchy-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
}

.hierarchy-node {
  width: 200px;
  background: #f0f7ff;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  border: 2px solid #d0e2ff;
  font-family: 'JetBrains Mono', monospace;
  color: #333;
}

.hierarchy-arrow {
  font-size: 1.5rem;
  color: #4361ee;
}

.hierarchy-note {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  text-align: center;
}

.type-relations {
  flex: 1;

  h3 {
    font-size: 1.4rem;
    color: #2b2d42;
    margin-bottom: 20px;
  }
}

.relations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.relation-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .relation-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    border-radius: 50%;
    font-size: 1.8rem;
    font-weight: 700;
  }

  .covariant {
    background: #e0f7fa;
    color: #00b4d8;
    border: 2px solid #90e0ef;
  }

  .contravariant {
    background: #ffeef0;
    color: #e63946;
    border: 2px solid #ffafcc;
  }

  .bivariant {
    background: #fff9e6;
    color: #ff9e00;
    border: 2px solid #ffd166;
  }

  .invariant {
    background: #f0f0ff;
    color: #5e60ce;
    border: 2px solid #cbc0d3;
  }

  h4 {
    font-size: 1.2rem;
    color: #2b2d42;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.95rem;
    color: #555;
  }
}

.variance-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.explanation {
  p {
    font-size: 1.1rem;
    color: #444;
    margin-bottom: 15px;
    line-height: 1.8;
  }
}

.analogy {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  border-left: 4px solid #4361ee;

  h4 {
    font-size: 1.2rem;
    color: #4361ee;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    font-size: 1rem;
  }

  ul {
    padding-left: 20px;
    margin: 10px 0;

    li {
      color: #555;
      margin-bottom: 8px;
    }
  }
}

.code-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
}

.example-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  h4 {
    font-size: 1.2rem;
    color: #2b2d42;
    margin-bottom: 15px;
  }
}

.code-block {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #333;

  pre {
    margin: 0;
  }

  code {
    display: block;
    color: #333;
  }
}

.example-note {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  padding: 10px;
  border-radius: 6px;
  background: #f0f4f8;
}

.use-cases {
  ul {
    padding-left: 20px;

    li {
      color: #444;
      margin-bottom: 12px;
      font-size: 1.1rem;
      position: relative;
      padding-left: 25px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #4361ee;
        font-size: 1.5rem;
        line-height: 1;
      }
    }

    .warning {
      color: #e63946;

      &::before {
        color: #e63946;
      }
    }

    .tip {
      color: #00b4d8;

      &::before {
        color: #00b4d8;
      }
    }
  }
}

.comparison-table {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  overflow-x: auto;
  margin-bottom: 30px;
  border: 1px solid #e2e8f0;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;

    th,
    td {
      padding: 15px 20px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #f0f7ff;
      color: #4361ee;
      font-weight: 600;
      font-size: 1.1rem;
    }

    td {
      color: #444;
    }

    tr:hover {
      background: #f0f4f8;
    }
  }
}

.best-practices {
  h3 {
    font-size: 1.5rem;
    color: #2b2d42;
    margin-bottom: 20px;
    text-align: center;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.practice-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .practice-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e0f0ff;
    border-radius: 8px;
    margin-right: 15px;
    font-weight: bold;
    font-size: 1.2rem;
    color: #4361ee;
    flex-shrink: 0;
  }

  p {
    color: #444;
    line-height: 1.6;

    code {
      background: #e0f0ff;
      padding: 2px 6px;
      border-radius: 4px;
      color: #4361ee;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 25px;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #eaeaea;
  max-width: 1200px;
  margin: 50px auto 0;
}

@media (max-width: 768px) {
  .header .title {
    font-size: 2.5rem;
  }

  .header {
    padding: 30px 15px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;

    .section-subtitle {
      margin-left: 0;
      margin-top: 10px;
    }
  }

  .code-examples {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header .title {
    font-size: 2rem;
  }

  .stat-card {
    min-width: 100px;
    padding: 10px 15px;

    .stat-value {
      font-size: 1.8rem;
    }
  }
}
</style>
