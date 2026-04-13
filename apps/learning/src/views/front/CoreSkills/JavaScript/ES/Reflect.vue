<template>
  <div class="reflect-docs">
    <header class="docs-header">
      <h1>JavaScript Reflect 基本指南</h1>
      <p class="subtitle">ES6 对象操作的现代化 API</p>
    </header>

    <Nav class="toc" position="top-right" :list="sections" />

    <div class="content-wrapper">
      <!-- 基础介绍 -->
      <section id="overview" class="method-card">
        <h2>🔍 Reflect 概述</h2>
        <div class="info-box">
          <h3>什么是 Reflect？</h3>
          <p>
            Reflect 是 ES6 引入的一个新的全局对象，它提供了拦截 JavaScript 操作的方法。这些方法与
            Proxy 处理器的方法相同，但 Reflect 是静态方法，不是构造函数。
          </p>

          <h3>设计目的</h3>
          <ol>
            <li>
              <strong>语言内部方法的统一化：</strong>将 Object 对象的一些明显属于语言内部的方法（如
              Object.defineProperty）放到 Reflect 对象上
            </li>
            <li><strong>更合理的返回值：</strong>修改某些 Object 方法的返回结果，让操作更可预测</li>
            <li><strong>函数式编程：</strong>让对象操作变成函数式调用，而不是命令式</li>
            <li><strong>与 Proxy 配合：</strong>为 Proxy 提供默认行为</li>
          </ol>
        </div>
      </section>

      <!-- 核心方法 -->
      <section id="methods" class="method-card">
        <h2>🎯 核心方法介绍</h2>

        <div class="method-item">
          <h3>1. Reflect.get(target, propertyKey[, receiver])</h3>
          <p class="method-desc">获取对象属性的值，类似于 target[propertyKey]</p>
          <CodeBlock :code="reflectGetExample" language="js" />
          <div class="use-case">
            <h4>💡 使用场景</h4>
            <ul>
              <li>需要处理访问器上下文时</li>
              <li>与 Proxy 配合使用时</li>
              <li>需要函数式调用而非属性访问时</li>
            </ul>
          </div>
        </div>

        <div class="method-item">
          <h3>2. Reflect.set(target, propertyKey, value[, receiver])</h3>
          <p class="method-desc">设置对象属性的值，返回布尔值表示是否成功</p>
          <CodeBlock :code="reflectSetExample" language="js" />
          <div class="use-case warning">
            <h4>⚠️ 重要区别</h4>
            <p>与直接赋值不同，Reflect.set 返回布尔值，可以知道操作是否成功</p>
          </div>
        </div>

        <div class="method-item">
          <h3>3. Reflect.has(target, propertyKey)</h3>
          <p class="method-desc">检查对象是否包含某个属性，相当于 in 操作符</p>
          <CodeBlock :code="reflectHasExample" language="js" />
        </div>

        <div class="method-item">
          <h3>4. Reflect.deleteProperty(target, propertyKey)</h3>
          <p class="method-desc">删除对象属性，相当于 delete 操作符</p>
          <CodeBlock :code="reflectDeleteExample" language="js" />
        </div>

        <div class="method-item">
          <h3>5. Reflect.defineProperty(target, propertyKey, attributes)</h3>
          <p class="method-desc">定义对象属性，返回布尔值表示是否成功</p>
          <CodeBlock :code="reflectDefineExample" language="js" />
        </div>

        <div class="method-item">
          <h3>6. Reflect.getOwnPropertyDescriptor(target, propertyKey)</h3>
          <p class="method-desc">获取对象属性的描述符</p>
          <CodeBlock :code="reflectGetDescriptorExample" language="js" />
        </div>

        <div class="method-item">
          <h3>7. Reflect.getPrototypeOf(target)</h3>
          <p class="method-desc">获取对象的原型</p>
          <CodeBlock :code="reflectGetPrototypeExample" language="js" />
        </div>

        <div class="method-item">
          <h3>8. Reflect.setPrototypeOf(target, prototype)</h3>
          <p class="method-desc">设置对象的原型</p>
          <CodeBlock :code="reflectSetPrototypeExample" language="js" />
        </div>

        <div class="method-item">
          <h3>9. Reflect.isExtensible(target)</h3>
          <p class="method-desc">判断对象是否可扩展</p>
          <CodeBlock :code="reflectIsExtensibleExample" language="js" />
        </div>

        <div class="method-item">
          <h3>10. Reflect.preventExtensions(target)</h3>
          <p class="method-desc">让对象不可扩展</p>
          <CodeBlock :code="reflectPreventExtensionsExample" language="js" />
        </div>

        <div class="method-item">
          <h3>11. Reflect.ownKeys(target)</h3>
          <p class="method-desc">返回对象的所有属性键（包括 Symbol）</p>
          <CodeBlock :code="reflectOwnKeysExample" language="js" />
        </div>

        <div class="method-item">
          <h3>12. Reflect.apply(target, thisArgument, argumentsList)</h3>
          <p class="method-desc">调用函数，并指定 this 值和参数列表</p>
          <CodeBlock :code="reflectApplyExample" language="js" />
        </div>

        <div class="method-item">
          <h3>13. Reflect.construct(target, argumentsList[, newTarget])</h3>
          <p class="method-desc">使用指定的参数列表调用构造函数</p>
          <CodeBlock :code="reflectConstructExample" language="js" />
        </div>
      </section>

      <!-- 解决的问题 -->
      <section id="problems-solved" class="method-card highlight">
        <h2>🔧 Reflect 解决了什么问题？</h2>
        <div class="problems-grid">
          <div class="problem-item">
            <h3>1. 错误处理更优雅</h3>
            <CodeBlock :code="errorHandlingExample" language="js" />
            <p>传统方式需要 try-catch，Reflect 返回布尔值</p>
          </div>

          <div class="problem-item">
            <h3>2. 函数式编程风格</h3>
            <CodeBlock :code="functionalStyleExample" language="js" />
            <p>所有操作都是函数调用，更符合函数式编程</p>
          </div>

          <div class="problem-item">
            <h3>3. 与 Proxy 完美配合</h3>
            <CodeBlock :code="proxyPerfectExample" language="js" />
            <p>为 Proxy 提供默认行为，避免重复代码</p>
          </div>

          <div class="problem-item">
            <h3>4. 更可预测的返回值</h3>
            <CodeBlock :code="predictableReturnExample" language="js" />
            <p>所有方法都有明确的返回值类型</p>
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section id="use-cases" class="method-card">
        <h2>🎯 适用场景</h2>
        <div class="use-cases-grid">
          <div class="use-case-item">
            <h3>1. 元编程</h3>
            <p>当你需要动态操作对象结构时</p>
            <CodeBlock :code="metaprogrammingExample" language="js" />
          </div>

          <div class="use-case-item">
            <h3>2. 库开发</h3>
            <p>开发通用库时，需要更安全的对象操作</p>
            <CodeBlock :code="libraryDevelopmentExample" language="js" />
          </div>

          <div class="use-case-item">
            <h3>3. 调试和监控</h3>
            <p>需要监控对象操作时</p>
            <CodeBlock :code="debuggingExample" language="js" />
          </div>

          <div class="use-case-item">
            <h3>4. 数据验证</h3>
            <p>需要验证对象操作是否成功时</p>
            <CodeBlock :code="validationExample" language="js" />
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section id="best-practices" class="method-card highlight">
        <h2>🌟 最佳实践</h2>
        <div class="practice-grid">
          <div class="practice-item">
            <h3>与 Proxy 配合使用</h3>
            <CodeBlock :code="proxyExample" language="js" />
            <p>使用 Reflect 提供默认行为，避免重复实现</p>
          </div>

          <div class="practice-item">
            <h3>错误处理模式</h3>
            <CodeBlock :code="errorHandlingPatternExample" language="js" />
            <p>利用返回值进行错误处理，而不是 try-catch</p>
          </div>

          <div class="practice-item">
            <h3>函数式编程</h3>
            <CodeBlock :code="functionalProgrammingExample" language="js" />
            <p>所有操作都是函数调用，便于组合</p>
          </div>

          <div class="practice-item">
            <h3>类型安全</h3>
            <CodeBlock :code="typeSafetyExample" language="js" />
            <p>在 TypeScript 中提供更好的类型推断</p>
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
                <th>Reflect 方式</th>
                <th>优势</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>属性读取</td>
                <td><code>obj.prop</code></td>
                <td><code>Reflect.get(obj, 'prop')</code></td>
                <td>支持 receiver 绑定</td>
              </tr>
              <tr>
                <td>属性设置</td>
                <td><code>obj.prop = value</code></td>
                <td><code>Reflect.set(obj, 'prop', value)</code></td>
                <td>返回操作结果</td>
              </tr>
              <tr>
                <td>属性检查</td>
                <td><code>prop in obj</code></td>
                <td><code>Reflect.has(obj, 'prop')</code></td>
                <td>函数式调用</td>
              </tr>
              <tr>
                <td>属性删除</td>
                <td><code>delete obj.prop</code></td>
                <td><code>Reflect.deleteProperty(obj, 'prop')</code></td>
                <td>返回操作结果</td>
              </tr>
              <tr>
                <td>属性定义</td>
                <td><code>Object.defineProperty(obj, prop, desc)</code></td>
                <td><code>Reflect.defineProperty(obj, prop, desc)</code></td>
                <td>返回布尔值</td>
              </tr>
              <tr>
                <td>原型获取</td>
                <td><code>Object.getPrototypeOf(obj)</code></td>
                <td><code>Reflect.getPrototypeOf(obj)</code></td>
                <td>更简洁</td>
              </tr>
              <tr>
                <td>函数调用</td>
                <td><code>func.apply(thisArg, args)</code></td>
                <td><code>Reflect.apply(func, thisArg, args)</code></td>
                <td>更直观</td>
              </tr>
              <tr>
                <td>构造函数</td>
                <td><code>new Constructor(...args)</code></td>
                <td><code>Reflect.construct(Constructor, args)</code></td>
                <td>动态构造</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 性能考虑 -->
      <section id="performance" class="method-card">
        <h2>⚡ 性能考虑</h2>
        <div class="performance-info">
          <div class="perf-item">
            <h3>性能影响</h3>
            <ul>
              <li>Reflect 方法比直接操作稍慢，但差异很小</li>
              <li>在大多数场景下，可读性和维护性比性能更重要</li>
              <li>与 Proxy 配合使用时，性能开销主要来自 Proxy</li>
            </ul>
          </div>
          <div class="perf-item">
            <h3>何时使用</h3>
            <ul>
              <li>需要错误处理时优先使用 Reflect</li>
              <li>与 Proxy 配合时使用 Reflect</li>
              <li>需要函数式编程风格时使用 Reflect</li>
              <li>简单属性访问时，直接操作更简洁</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '../Components/CodeBlock.vue'
import Nav from 'components/Nav/ScrollNav.vue'

const sections = [
  { id: 'overview', name: '概述' },
  { id: 'methods', name: '核心方法' },
  { id: 'problems-solved', name: '解决的问题' },
  { id: 'use-cases', name: '适用场景' },
  { id: 'best-practices', name: '最佳实践' },
  { id: 'comparison', name: '方法对比' },
  { id: 'performance', name: '性能考虑' },
]

const reflectGetExample = `
// 基本用法
const obj = { x: 1, y: 2 };
console.log(Reflect.get(obj, 'x')); // 1

// 处理访问器
const user = {
  _name: 'John',
  get name() {
    return this._name;
  }
};
const receiver = { _name: 'Alice' };
console.log(Reflect.get(user, 'name', receiver)); // 'Alice'

// 数组访问
const arr = [1, 2, 3];
console.log(Reflect.get(arr, '1')); // 2
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
console.log(obj.fixed); // '不可变'

// 数组设置
const arr = [1, 2, 3];
Reflect.set(arr, '1', 99);
console.log(arr); // [1, 99, 3]
`.trim()

const reflectHasExample = `
const obj = { x: 1, y: 2 };
const sym = Symbol('symbol');

obj[sym] = 'symbol value';

console.log(Reflect.has(obj, 'x')); // true
console.log(Reflect.has(obj, 'z')); // false
console.log(Reflect.has(obj, sym)); // true

// 继承属性
const parent = { inherited: 'value' };
const child = Object.create(parent);
console.log(Reflect.has(child, 'inherited')); // true
`.trim()

const reflectDeleteExample = `
const obj = { x: 1, y: 2, z: 3 };

// 成功删除
console.log(Reflect.deleteProperty(obj, 'x')); // true
console.log('x' in obj); // false

// 删除不存在的属性
console.log(Reflect.deleteProperty(obj, 'nonexistent')); // true

// 删除不可配置的属性
Object.defineProperty(obj, 'configurable', {
  value: 'test',
  configurable: false
});
console.log(Reflect.deleteProperty(obj, 'configurable')); // false
`.trim()

const reflectDefineExample = `
const obj = {};

// 成功定义
console.log(Reflect.defineProperty(obj, 'prop', {
  value: 123,
  writable: true,
  enumerable: true,
  configurable: true
})); // true

// 重复定义相同属性
console.log(Reflect.defineProperty(obj, 'prop', {
  value: 456
})); // true

// 定义不可配置属性后再次修改
Object.defineProperty(obj, 'fixed', {
  value: 'original',
  configurable: false
});

console.log(Reflect.defineProperty(obj, 'fixed', {
  value: 'new value'
})); // false
`.trim()

const reflectGetDescriptorExample = `
const obj = { x: 1 };

// 普通属性
console.log(Reflect.getOwnPropertyDescriptor(obj, 'x'));
// { value: 1, writable: true, enumerable: true, configurable: true }

// 访问器属性
Object.defineProperty(obj, 'y', {
  get() { return this.x * 2; },
  enumerable: true,
  configurable: true
});

console.log(Reflect.getOwnPropertyDescriptor(obj, 'y'));
// { get: [Function: get], set: undefined, enumerable: true, configurable: true }

// 不存在的属性
console.log(Reflect.getOwnPropertyDescriptor(obj, 'z')); // undefined
`.trim()

const reflectGetPrototypeExample = `
const parent = { inherited: 'value' };
const child = Object.create(parent);

console.log(Reflect.getPrototypeOf(child) === parent); // true
console.log(Reflect.getPrototypeOf(parent) === Object.prototype); // true
console.log(Reflect.getPrototypeOf(Object.prototype)); // null
`.trim()

const reflectSetPrototypeExample = `
const obj = { x: 1 };
const newProto = { y: 2 };

// 成功设置原型
console.log(Reflect.setPrototypeOf(obj, newProto)); // true
console.log(Reflect.getPrototypeOf(obj) === newProto); // true

// 设置为 null
console.log(Reflect.setPrototypeOf(obj, null)); // true
console.log(Reflect.getPrototypeOf(obj)); // null

// 设置为不可扩展的对象
const sealed = Object.seal({});
console.log(Reflect.setPrototypeOf(sealed, {})); // false
`.trim()

const reflectIsExtensibleExample = `
const obj = { x: 1 };

console.log(Reflect.isExtensible(obj)); // true

// 阻止扩展
Reflect.preventExtensions(obj);
console.log(Reflect.isExtensible(obj)); // false

// 密封对象
const sealed = Object.seal({});
console.log(Reflect.isExtensible(sealed)); // false

// 冻结对象
const frozen = Object.freeze({});
console.log(Reflect.isExtensible(frozen)); // false
`.trim()

const reflectPreventExtensionsExample = `
const obj = { x: 1 };

console.log(Reflect.isExtensible(obj)); // true
console.log(Reflect.preventExtensions(obj)); // true
console.log(Reflect.isExtensible(obj)); // false

// 尝试添加新属性
obj.y = 2; // 在严格模式下会抛出错误
console.log(obj.y); // undefined (非严格模式)
`.trim()

const reflectOwnKeysExample = `
const obj = {
  x: 1,
  y: 2,
  [Symbol('symbol')]: 'symbol value'
};

console.log(Reflect.ownKeys(obj));
// ['x', 'y', Symbol(symbol)]

// 继承的属性不会包含
const parent = { inherited: 'value' };
const child = Object.create(parent);
child.own = 'own value';

console.log(Reflect.ownKeys(child)); // ['own']
`.trim()

const reflectApplyExample = `
function greet(name, age) {
  return \`Hello, I'm \${name} and I'm \${age} years old\`;
}

const args = ['Alice', 25];
const thisArg = { prefix: 'Greeting: ' };

// 传统方式
console.log(greet.apply(thisArg, args));

// Reflect 方式
console.log(Reflect.apply(greet, thisArg, args));

// 动态调用
const funcName = 'greet';
const func = this[funcName];
if (typeof func === 'function') {
  console.log(Reflect.apply(func, thisArg, args));
}
`.trim()

const reflectConstructExample = `
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return \`I'm \${this.name}, \${this.age} years old\`;
  }
}

// 传统方式
const person1 = new Person('Alice', 25);

// Reflect 方式
const person2 = Reflect.construct(Person, ['Bob', 30]);

console.log(person1.introduce()); // "I'm Alice, 25 years old"
console.log(person2.introduce()); // "I'm Bob, 30 years old"

// 动态构造
const className = 'Person';
const ClassConstructor = this[className];
if (typeof ClassConstructor === 'function') {
  const instance = Reflect.construct(ClassConstructor, ['Charlie', 35]);
  console.log(instance.introduce());
}
`.trim()

const errorHandlingExample = `
// 传统方式 - 需要 try-catch
try {
  Object.defineProperty(obj, prop, descriptor);
  console.log('成功');
} catch (e) {
  console.log('失败:', e.message);
}

// Reflect 方式 - 返回布尔值
if (Reflect.defineProperty(obj, prop, descriptor)) {
  console.log('成功');
} else {
  console.log('失败');
}
`.trim()

const functionalStyleExample = `
// 传统方式 - 混合了操作符和函数
const value = obj.prop;
obj.prop = newValue;
delete obj.prop;
const hasProp = 'prop' in obj;

// Reflect 方式 - 全部是函数调用
const value = Reflect.get(obj, 'prop');
const success = Reflect.set(obj, 'prop', newValue);
const deleted = Reflect.deleteProperty(obj, 'prop');
const hasProp = Reflect.has(obj, 'prop');
`.trim()

const proxyPerfectExample = `
const handler = {
  get(target, prop, receiver) {
    console.log(\`访问属性: \${prop}\`);
    // 使用 Reflect 提供默认行为
    return Reflect.get(target, prop, receiver);
  },

  set(target, prop, value, receiver) {
    console.log(\`设置属性: \${prop} = \${value}\`);
    // 使用 Reflect 提供默认行为
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxy = new Proxy({ a: 1, b: 2 }, handler);
proxy.a; // 输出: "访问属性: a"
proxy.c = 3; // 输出: "设置属性: c = 3"
`.trim()

const predictableReturnExample = `
// Object 方法可能抛出错误
try {
  Object.defineProperty(obj, prop, invalidDescriptor);
} catch (e) {
  // 处理错误
}

// Reflect 方法总是返回可预测的值
const success = Reflect.defineProperty(obj, prop, invalidDescriptor);
if (!success) {
  // 处理失败情况
}

// 所有 Reflect 方法都有明确的返回类型
Reflect.get(obj, prop); // 返回属性值或 undefined
Reflect.set(obj, prop, value); // 返回 boolean
Reflect.has(obj, prop); // 返回 boolean
Reflect.deleteProperty(obj, prop); // 返回 boolean
`.trim()

const metaprogrammingExample = `
// 动态属性操作
function createDynamicObject(properties) {
  const obj = {};

  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === 'function') {
      // 动态定义方法
      Reflect.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      // 动态设置属性
      Reflect.set(obj, key, value);
    }
  }

  return obj;
}

const dynamicObj = createDynamicObject({
  name: 'Dynamic Object',
  greet() { return \`Hello, I'm \${this.name}\`; },
  age: 25
});

console.log(dynamicObj.greet()); // "Hello, I'm Dynamic Object"
`.trim()

const libraryDevelopmentExample = `
// 安全的属性访问库
class SafeObject {
  constructor(obj) {
    this.target = obj;
  }

  get(prop, defaultValue = undefined) {
    if (Reflect.has(this.target, prop)) {
      return Reflect.get(this.target, prop);
    }
    return defaultValue;
  }

  set(prop, value) {
    return Reflect.set(this.target, prop, value);
  }

  has(prop) {
    return Reflect.has(this.target, prop);
  }

  delete(prop) {
    return Reflect.deleteProperty(this.target, prop);
  }
}

const safeObj = new SafeObject({ x: 1, y: 2 });
console.log(safeObj.get('x')); // 1
console.log(safeObj.get('z', 'default')); // 'default'
`.trim()

const debuggingExample = `
// 对象操作监控
function createMonitoredObject(obj) {
  const handler = {
    get(target, prop, receiver) {
      console.log(\`[GET] 访问属性: \${prop}\`);
      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
      console.log(\`[SET] 设置属性: \${prop} = \${value}\`);
      return Reflect.set(target, prop, value, receiver);
    },

    deleteProperty(target, prop) {
      console.log(\`[DELETE] 删除属性: \${prop}\`);
      return Reflect.deleteProperty(target, prop);
    }
  };

  return new Proxy(obj, handler);
}

const monitored = createMonitoredObject({ x: 1 });
monitored.x; // [GET] 访问属性: x
monitored.y = 2; // [SET] 设置属性: y = 2
delete monitored.x; // [DELETE] 删除属性: x
`.trim()

const validationExample = `
// 数据验证器
class Validator {
  static validateObject(obj, schema) {
    const errors = [];

    for (const [key, rules] of Object.entries(schema)) {
      const value = Reflect.get(obj, key);

      if (!Reflect.has(obj, key) && rules.required) {
        errors.push(\`缺少必需属性: \${key}\`);
        continue;
      }

      if (Reflect.has(obj, key)) {
        if (rules.type && typeof value !== rules.type) {
          errors.push(\`属性 \${key} 类型错误，期望 \${rules.type}，实际 \${typeof value}\`);
        }

        if (rules.validator && !rules.validator(value)) {
          errors.push(\`属性 \${key} 验证失败\`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

const schema = {
  name: { required: true, type: 'string' },
  age: { required: true, type: 'number', validator: (val) => val >= 0 }
};

const data = { name: 'Alice', age: -5 };
const result = Validator.validateObject(data, schema);
console.log(result);
// { isValid: false, errors: ['属性 age 验证失败'] }
`.trim()

const proxyExample = `
const handler = {
  get(target, prop, receiver) {
    console.log(\`访问属性: \${prop}\`);
    return Reflect.get(...arguments);
  },

  set(target, prop, value, receiver) {
    console.log(\`设置属性: \${prop} = \${value}\`);
    return Reflect.set(...arguments);
  },

  deleteProperty(target, prop) {
    console.log(\`删除属性: \${prop}\`);
    return Reflect.deleteProperty(...arguments);
  }
};

const proxy = new Proxy({ a: 1 }, handler);
proxy.a; // 输出: "访问属性: a"
proxy.b = 2; // 输出: "设置属性: b = 2"
delete proxy.a; // 输出: "删除属性: a"
`.trim()

const errorHandlingPatternExample = `
// 安全的属性操作
function safePropertyOperation(obj, operation, ...args) {
  try {
    const result = Reflect[operation](obj, ...args);

    if (typeof result === 'boolean' && !result) {
      console.warn(\`操作失败: \${operation}\`);
      return false;
    }

    return result;
  } catch (error) {
    console.error(\`操作异常: \${operation}\`, error);
    return false;
  }
}

const obj = {};
Object.defineProperty(obj, 'readonly', {
  value: 'original',
  writable: false
});

// 安全设置
const setResult = safePropertyOperation(obj, 'set', 'readonly', 'new value');
console.log(setResult); // false

// 安全删除
const deleteResult = safePropertyOperation(obj, 'deleteProperty', 'readonly');
console.log(deleteResult); // false
`.trim()

const functionalProgrammingExample = `
// 函数式对象操作
const objectOps = {
  get: (obj, prop) => Reflect.get(obj, prop),
  set: (obj, prop, value) => Reflect.set(obj, prop, value),
  has: (obj, prop) => Reflect.has(obj, prop),
  delete: (obj, prop) => Reflect.deleteProperty(obj, prop),
  keys: (obj) => Reflect.ownKeys(obj)
};

// 链式操作
const obj = { x: 1, y: 2 };
const operations = [
  () => objectOps.set(obj, 'z', 3),
  () => objectOps.get(obj, 'x'),
  () => objectOps.has(obj, 'y'),
  () => objectOps.keys(obj)
];

const results = operations.map(op => op());
console.log(results); // [true, 1, true, ['x', 'y', 'z']]
`.trim()

const typeSafetyExample = `
// TypeScript 中的类型安全
interface User {
  name: string;
  age: number;
}

function createUser(data: Partial<User>): User {
  const user = {} as User;

  // 类型安全的属性设置
  if (typeof data.name === 'string') {
    Reflect.set(user, 'name', data.name);
  }

  if (typeof data.age === 'number') {
    Reflect.set(user, 'age', data.age);
  }

  return user;
}

// 类型检查
function validateUser(user: any): user is User {
  return (
    Reflect.has(user, 'name') && typeof Reflect.get(user, 'name') === 'string' &&
    Reflect.has(user, 'age') && typeof Reflect.get(user, 'age') === 'number'
  );
}

const user = createUser({ name: 'Alice', age: 25 });
console.log(validateUser(user)); // true
`.trim()
</script>

<style scoped lang="less">
.reflect-docs {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  line-height: 1.5;
  color: #2c3e50;
  background: #f8f9fa;
  min-height: 100vh;
}

.docs-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 8px;
  color: white;
  box-shadow: 0 2px 10px rgba(79, 70, 229, 0.2);

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: white;
  }

  .subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 400;
  }
}

.content-wrapper {
  display: grid;
  gap: 1rem;
}

.method-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &.highlight {
    border: 2px solid #4f46e5;
    background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  }

  h2 {
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  h3 {
    color: #374151;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
  }

  h4 {
    color: #6b7280;
    font-size: 1rem;
    font-weight: 500;
    margin: 0.75rem 0 0.25rem 0;
  }
}

.info-box {
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  padding: 1rem;
  border-radius: 6px;
  border-left: 3px solid #4f46e5;
  margin-bottom: 1rem;

  h3 {
    color: #1f2937;
    margin-top: 0;
    font-size: 1.1rem;
  }

  ol,
  ul {
    margin: 0.75rem 0;
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.25rem;
      line-height: 1.5;
      font-size: 0.95rem;
    }
  }
}

.method-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;

  &:last-child {
    margin-bottom: 0;
  }

  .method-desc {
    color: #6b7280;
    font-style: italic;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background: #f3f4f6;
    border-radius: 4px;
    font-size: 0.9rem;
  }
}

.use-case {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 0.75rem;
  border-radius: 6px;
  margin: 0.75rem 0;
  border-left: 3px solid #f59e0b;

  &.warning {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    border-left-color: #ef4444;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
  }
}

.problems-grid,
.use-cases-grid,
.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.problem-item,
.use-case-item,
.practice-item {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  h3 {
    color: #1f2937;
    margin-top: 0;
    font-size: 1.1rem;
  }

  p {
    color: #6b7280;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
  }
}

.comparison-table {
  overflow-x: auto;
  margin-top: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    font-size: 0.85rem;

    th,
    td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      font-weight: 600;
      position: sticky;
      top: 0;
      font-size: 0.8rem;
    }

    tr {
      transition: background-color 0.2s ease;

      &:hover {
        background: #f8faff;
      }

      &:nth-child(even) {
        background: #f9fafb;
      }
    }

    code {
      background: #f1f5f9;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.8rem;
    }
  }
}

.performance-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;

  .perf-item {
    background: white;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    h3 {
      color: #1f2937;
      margin-top: 0;
      font-size: 1.1rem;
    }

    ul {
      margin: 0.5rem 0;
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.25rem;
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .reflect-docs {
    padding: 0.75rem;
  }

  .docs-header {
    padding: 1rem;

    h1 {
      font-size: 1.75rem;
    }
  }

  .method-card {
    padding: 1rem;
  }

  .problems-grid,
  .use-cases-grid,
  .practice-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 0.75rem;

    th,
    td {
      padding: 0.5rem 0.75rem;
    }
  }
}

// 代码块样式优化
:deep(.code-block) {
  margin: 0.75rem 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
}

// 导航样式
.toc {
  position: sticky;
  z-index: 10;
  margin-bottom: 1.5rem;
  width: 200px;
}

// 紧凑的间距
p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

// 更好的视觉层次
strong {
  color: #1f2937;
  font-weight: 600;
}

// 代码高亮
code {
  background: #f1f5f9;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  color: #dc2626;
}
</style>
