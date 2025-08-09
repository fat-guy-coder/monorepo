<template>
  <div class="prototype-container">
    <header class="header">
      <h1 class="title">JavaScript 原型与原型链</h1>
      <p class="subtitle">深入理解JavaScript面向对象的核心机制</p>
    </header>

    <div class="content-section">
      <h2 class="section-title">原型的作用</h2>
      <div class="concept-card">
        <p>
        原型是JavaScript中实现
        <b>继承和共享属性</b>
        的重要机制。每个对象都有一个原型，当访问对象的属性时，JavaScript会沿着原型链向上查找，直到找到属性或到达原型链末端。
      </p>
      <p>
        其实就是同种类型数据(子类,父类,祖先类,子对象,父对象,祖先对象)
        <b>共享方法和属性</b>,借此还能<b>降低内存消耗，提高性能</b> 。
      </p>
      <p>原理就是原型都指向 <b>统一指针</b> (原型对象,同类的情况下)</p>
      <p>原型链就是原型对象的链式结构(连起来的原型对象)</p>
    </div>
      </div>

    <div class="content-section">
      <h2 class="section-title">🔍 基本概念</h2>
      <div class="concept-grid">
        <div class="concept-card">
          <h3>原型 (Prototype)</h3>
          <p>每个JavaScript对象都有一个内置属性<code>[[Prototype]]</code>，指向它的原型对象</p>
          <div class="code-example">
            <pre><code>function Person() {}
const person = new Person();
// person.__proto__ === Person.prototype</code></pre>
          </div>
        </div>
        <div class="concept-card">
          <h3>原型链 (Prototype Chain)</h3>
          <p>当访问对象属性时，JavaScript会沿着原型链向上查找，直到找到属性或到达原型链末端</p>
          <div class="code-example">
            <pre><code>person.toString(); // 查找顺序:
// 1. person 对象本身
// 2. Person.prototype
// 3. Object.prototype
// 4. null</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">🛠️ 核心方法</h2>
      <div class="method-grid">
        <div class="method-card">
          <h3>Object.getPrototypeOf()</h3>
          <p>获取对象的原型</p>
          <div class="code-example">
            <pre><code>const proto = Object.getPrototypeOf(obj);
// 等同于 obj.__proto__ (推荐使用标准方法)</code></pre>
          </div>
        </div>
        <div class="method-card">
          <h3>Object.setPrototypeOf()</h3>
          <p>设置对象的原型</p>
          <div class="code-example">
            <pre><code>Object.setPrototypeOf(obj, prototype);
// 修改现有对象的原型</code></pre>
          </div>
        </div>
        <div class="method-card">
          <h3>Object.create()</h3>
          <p>创建具有指定原型的新对象</p>
          <div class="code-example">
            <pre><code>const newObj = Object.create(proto);
// 以proto为原型创建新对象</code></pre>
          </div>
        </div>
        <div class="method-card">
          <h3>instanceof</h3>
          <p>检查构造函数的prototype是否出现在对象的原型链上</p>
          <div class="code-example">
            <pre><code>obj instanceof Constructor;
// 检查obj的原型链是否包含Constructor.prototype</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">原型链</h2>
      <div class="concept-card">
        <p>
        原型链就是 <b>原型对象的链式结构</b> (连起来的原型对象)
      </p>
      <p>
        就是 <b>同种类型数据(子类,父类,祖先类,子对象,父对象,祖先对象)从下(子)到上(祖)连起来的原型对象链</b> 。方便跟着链查找属性。
      </p>
      <p>子会先从子对象找，找不到会从父对象找，父对象找不到会从祖先对象找，祖先对象找不到会从Object.prototype找，Object.prototype找不到会从null找。</p>
    </div>
      </div>

    <div class="content-section">
      <h2 class="section-title">📊 原型链图示（开饶）</h2>
      <div class="diagram">
        <div class="chain">
          <div class="object">son对象</div>
          <div class="arrow">↓ __proto__</div>
          <div class="prototype">Son.prototype</div>
          <div class="arrow">↓ __proto__</div>
          <div class="prototype">Person.prototype</div>
          <div class="arrow"></div>
          <div class="object">person对象</div>
          <div class="arrow">↓ __proto__</div>
          <div class="prototype">Person.prototype</div>
          <div class="arrow">↓ __proto__</div>
          <div class="prototype">Object.prototype</div>
          <div class="arrow">↓ __proto__</div>
          <div class="null">null</div>
        </div>
        <div class="code-example">
          <pre><code>function Person() {}
const person = new Person();

class Son extends Person {
}//等同于Son = Object.create(Person)//虽然实际上不能对类赋值，但是原理是这样的
//将Person作为原型，创建一个新对象，这个新对象Son的__proto__指向Person，所以Son.__proto__ === Person

const son = new Son();
son.__proto__ === Son.prototype //true
Son.__proto__ === Person //true
Son.prototype.__proto__ === Person.prototype //true

// 原型链关系:
person.__proto__ === Person.prototype
Person.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null</code></pre>
        </div>
      </div>
      <div>
        <img :src="imgsrc" alt="加载失败" loading="lazy" />
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">绕过原型链(绕？绕吗？)</h2>
      <div class="concept-card">
        <p>
          原型链的查找机制是 <b>从下到上</b> ，所以如果想要绕过原型链，可以 <b>直接修改原型对象</b> 。
        </p>
        <p>
          但是这样修改了原型对象，会导致所有实例都受到影响，所以需要谨慎使用。
        </p>
        <p>
          所以 <b>不要修改内置对象的原型</b> ，因为这样会影响所有实例。
        </p>
        <p><b>但是你用熟了，了解原理和机制后，这些都不是问题。</b></p>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">constructor属性 <a @click="goToByRouteName('Class')">跳转详细</a> </h2>
      <div class="concept-card">
        <p>每个对象(实例)都有一个constructor属性，指向创建该对象的构造函数。并且类的prototype.constructor指向类本身。</p>
        <p>因为对象(示例)的__proto__指向prototype，所以对象的__proto__.constructor属性指向类本身。</p>
        <p>constructor属性是不可枚举的，所以不能被for...in循环遍历。</p>
        <p>constructor属性是不可修改的，所以不能被修改。</p>
        <p>constructor属性是不可删除的，所以不能被删除。</p>
       <pre>
        <code>//构造函数
function Person() {}
Person.prototype.constructor === Person //true
new Person().__proto__.constructor === Person //true
//类
class Person {}
Person.prototype.constructor === Person //true
new Person().__proto__.constructor === Person //true</code></pre>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">💡 实际应用</h2>
      <div class="application-grid">
        <div class="application-card">
          <h3>原型继承</h3>
          <p>实现对象之间的继承关系</p>
          <div class="code-example">
            <pre><code>function Animal() {}
Animal.prototype.eat = function() {};

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.bark = function() {};</code></pre>
          </div>
        </div>
        <div class="application-card">
          <h3>方法共享</h3>
          <p>所有实例共享原型上的方法，节省内存</p>
          <div class="code-example">
            <pre><code>function Car() {}
Car.prototype.drive = function() {
  console.log('Driving...');
};

const car1 = new Car();
const car2 = new Car();
// car1和car2共享drive方法</code></pre>
          </div>
        </div>
        <div class="application-card">
          <h3>属性遮蔽</h3>
          <p>实例属性会遮蔽原型上的同名属性</p>
          <div class="code-example">
            <pre><code>function Item() {}
Item.prototype.price = 100;

const item = new Item();
item.price = 200; // 遮蔽原型属性
console.log(item.price); // 200</code></pre>
          </div>
        </div>
        <div class="application-card">
          <h3>内置对象扩展</h3>
          <p>谨慎扩展内置对象的原型</p>
          <div class="code-example">
            <pre><code>// 不推荐大规模修改
Array.prototype.last = function() {
  return this[this.length - 1];
};

[1, 2, 3].last(); // 3</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚖️ 优缺点分析</h2>
      <div class="pros-cons">
        <div class="pros">
          <h3>优点</h3>
          <ul>
            <li><strong>内存高效</strong> - 共享原型上的方法和属性</li>
            <li><strong>动态继承</strong> - 可运行时修改原型</li>
            <li><strong>灵活扩展</strong> - 可扩展内置对象功能</li>
            <li><strong>代码复用</strong> - 实现继承和混入模式</li>
          </ul>
        </div>
        <div class="cons">
          <h3>缺点</h3>
          <ul>
            <li><strong>理解成本高</strong> - 概念较抽象</li>
            <li><strong>性能影响</strong> - 长原型链查找较慢</li>
            <li><strong>全局污染</strong> - 修改内置原型有风险</li>
            <li><strong>调试困难</strong> - 原型链关系不易追踪</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="note-grid">
        <div class="note-card">
          <h3>性能考量</h3>
          <p>过长的原型链会影响属性查找性能，尽量保持扁平结构</p>
        </div>
        <div class="note-card">
          <h3>原型修改时机</h3>
          <p>在创建实例前修改原型，已存在实例不会自动更新</p>
        </div>
        <div class="note-card">
          <h3>constructor属性</h3>
          <p>重写prototype时需要手动设置constructor属性</p>
        </div>
        <div class="note-card">
          <h3>现代替代方案</h3>
          <p>ES6 class语法是原型的语法糖，更易理解和使用</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>原型机制是JavaScript面向对象编程的核心，理解它有助于编写更高效的代码</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import imgsrc from '@/assets/js/prototype-chain.png'

const emit = defineEmits(['goToByRouteName']);

const goToByRouteName = (route: string) => {
  emit('goToByRouteName', route);
};

</script>

<style lang="less" scoped>
.prototype-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #2c3e50;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaecef;

  .title {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    background: linear-gradient(90deg, #3498db, #9b59b6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.content-section {
  margin-bottom: 2.5rem;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: #2c3e50;
    border-left: 4px solid #9b59b6;
    padding-left: 0.8rem;
  }
}

.concept-grid,
.method-grid,
.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.concept-card,
.method-card,
.application-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    color: #3498db;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin: 0.5rem 0;
  }
}

.code-example {
  background-color: #f8f9fa;
  padding: 0.8rem;
  border-radius: 4px;
  margin-top: 0.8rem;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.85rem;
      color: #333;
      line-height: 1.4;
    }
  }
}

.diagram {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  margin: 1.5rem 0;

  .chain {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;

    .object,
    .prototype,
    .null {
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      text-align: center;
      font-weight: 500;
    }

    .object {
      background-color: #e3f2fd;
      border: 1px solid #bbdefb;
    }

    .prototype {
      background-color: #f3e5f5;
      border: 1px solid #e1bee7;
    }

    .null {
      background-color: #e0e0e0;
      border: 1px solid #bdbdbd;
    }

    .arrow {
      margin: 0.5rem 0;
      color: #7f8c8d;
      font-weight: bold;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .pros,
  .cons {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaecef;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: #2c3e50;
      border-bottom: 2px solid;
      padding-bottom: 0.5rem;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;

        strong {
          color: #e74c3c;
        }
      }
    }
  }

  .pros h3 {
    border-color: #42b983;
  }

  .cons h3 {
    border-color: #e74c3c;
  }
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.note-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h3 {
    font-size: 1.1rem;
    margin-top: 0;
    color: #3498db;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .prototype-container {
    padding: 1rem;
  }

  .concept-grid,
  .method-grid,
  .application-grid,
  .note-grid {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.8rem;
  }
}
</style>
