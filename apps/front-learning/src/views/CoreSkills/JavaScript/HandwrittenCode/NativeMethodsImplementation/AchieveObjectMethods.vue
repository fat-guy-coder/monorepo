<template>
  <div class="object-methods-container">
    <header>
      <h1>JavaScript 对象原生方法手写实现</h1>
      <p>深入理解JavaScript核心对象方法的底层原理</p>
    </header>

    <div class="methods-grid">
      <!-- groupBy -->
      <div class="method-card">
        <h2 class="method-title">groupBy</h2>
        <div class="method-section">
          <h3>实现思路</h3>
          <p>遍历数组元素，使用回调函数生成分组键，将元素分配到对应的分组中</p>
        </div>
        <div class="method-section">
          <h3>手写实现</h3>
          <pre><code>function groupBy&lt;T&gt;(
  array: T[],
  keyFunc: (item: T) => string
): Record&lt;string, T[]&gt; {
  return array.reduce((acc, item) => {
    const key = keyFunc(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {} as Record&lt;string, T[]&gt;);
}</code></pre>
        </div>
        <div class="method-section">
          <h3>使用示例</h3>
          <pre><code>const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

const grouped = groupBy(people, p => p.age.toString());
// 结果:
// {
//   '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   '30': [{ name: 'Bob', age: 30 }]
// }</code></pre>
        </div>
      </div>

      <!-- assign -->
      <div class="method-card">
        <h2 class="method-title">assign</h2>
        <div class="method-section">
          <h3>实现思路</h3>
          <p>遍历所有源对象，复制其可枚举属性到目标对象（浅拷贝）</p>
        </div>
        <div class="method-section">
          <h3>手写实现</h3>
          <pre><code>function assign&lt;T, U&gt;(target: T, source: U): T & U;
function assign&lt;T, U, V&gt;(target: T, source1: U, source2: V): T & U & V;
function assign(target: any, ...sources: any[]): any {
  sources.forEach(source => {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  });
  return target;
}</code></pre>
        </div>
        <div class="method-section">
          <h3>使用示例</h3>
          <pre><code>const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = assign({}, obj1, obj2);
// 结果: { a: 1, b: 2 }</code></pre>
        </div>
      </div>

      <!-- fromEntries -->
      <div class="method-card">
        <h2 class="method-title">fromEntries</h2>
        <div class="method-section">
          <h3>实现思路</h3>
          <p>遍历键值对数组，将每个键值对转换为对象的属性</p>
        </div>
        <div class="method-section">
          <h3>手写实现</h3>
          <pre><code>function fromEntries&lt;V&gt;(
  entries: Iterable&lt;[string, V]&gt;
): Record&lt;string, V&gt; {
  const obj: Record&lt;string, V&gt; = {};
  for (const [key, value] of entries) {
    obj[key] = value;
  }
  return obj;
}</code></pre>
        </div>
        <div class="method-section">
          <h3>使用示例</h3>
          <pre><code>const entries = [
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'New York']
];

const obj = fromEntries(entries);
// 结果: { name: 'Alice', age: 30, city: 'New York' }</code></pre>
        </div>
      </div>

      <!-- entries -->
      <div class="method-card">
        <h2 class="method-title">entries</h2>
        <div class="method-section">
          <h3>实现思路</h3>
          <p>遍历对象的自身可枚举属性，返回键值对数组</p>
        </div>
        <div class="method-section">
          <h3>手写实现</h3>
          <pre><code>function entries&lt;T&gt;(
  obj: Record&lt;string, T&gt;
): [string, T][] {
  const result: [string, T][] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push([key, obj[key]]);
    }
  }
  return result;
}</code></pre>
        </div>
        <div class="method-section">
          <h3>使用示例</h3>
          <pre><code>const person = {
  name: 'Bob',
  age: 25,
  occupation: 'Developer'
};

const entryList = entries(person);
// 结果:
// [['name', 'Bob'], ['age', 25], ['occupation', 'Developer']]</code></pre>
        </div>
      </div>

      <!-- keys -->
      <div class="method-card">
        <h2 class="method-title">keys</h2>
        <div class="method-section">
          <h3>实现思路</h3>
          <p>遍历对象的自身可枚举属性，收集所有键名</p>
        </div>
        <div class="method-section">
          <h3>手写实现</h3>
          <pre><code>function keys(obj: object): string[] {
  const result: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(key);
    }
  }
  return result;
}</code></pre>
        </div>
        <div class="method-section">
          <h3>使用示例</h3>
          <pre><code>const car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2020
};

const carKeys = keys(car);
// 结果: ['make', 'model', 'year']</code></pre>
        </div>
      </div>

      <!-- values -->
      <div class="method-card">
        <h2 class="method-title">values</h2>
        <div class="method-section">
          <h3>实现思路</h3>
          <p>遍历对象的自身可枚举属性，收集所有属性值</p>
        </div>
        <div class="method-section">
          <h3>手写实现</h3>
          <pre><code>function values&lt;T&gt;(obj: Record&lt;string, T&gt;): T[] {
  const result: T[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key]);
    }
  }
  return result;
}</code></pre>
        </div>
        <div class="method-section">
          <h3>使用示例</h3>
          <pre><code>const book = {
  title: 'JavaScript: The Good Parts',
  author: 'Douglas Crockford',
  pages: 172
};

const bookValues = values(book);
// 结果: ['JavaScript: The Good Parts', 'Douglas Crockford', 172]</code></pre>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2>实现要点总结</h2>
      <ul>
        <li>使用 <code>for...in</code> 循环遍历对象属性</li>
        <li>使用 <code>hasOwnProperty</code> 检查自身属性</li>
        <li>利用数组的 <code>reduce</code> 方法进行聚合操作</li>
        <li>注意处理边缘情况（如null/undefined输入）</li>
        <li>为TypeScript添加泛型支持增强类型安全</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里实际实现了这些方法，但在模板中我们只展示代码字符串
// 实际使用时可取消注释

// function groupBy<T>(
//   array: T[],
//   keyFunc: (item: T) => string
// ): Record<string, T[]> {
//   return array.reduce((acc, item) => {
//     const key = keyFunc(item);
//     (acc[key] = acc[key] || []).push(item);
//     return acc;
//   }, {} as Record<string, T[]>);
// }

// function assign(target: any, ...sources: any[]): any {
//   sources.forEach(source => {
//     for (const key in source) {
//       if (Object.prototype.hasOwnProperty.call(source, key)) {
//         target[key] = source[key];
//       }
//     }
//   });
//   return target;
// }

// function fromEntries<V>(
//   entries: Iterable<[string, V]>
// ): Record<string, V> {
//   const obj: Record<string, V> = {};
//   for (const [key, value] of entries) {
//     obj[key] = value;
//   }
//   return obj;
// }

// function entries<T>(obj: Record<string, T>): [string, T][] {
//   const result: [string, T][] = [];
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       result.push([key, obj[key]]);
//     }
//   }
//   return result;
// }

// function keys(obj: object): string[] {
//   const result: string[] = [];
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       result.push(key);
//     }
//   }
//   return result;
// }

// function values<T>(obj: Record<string, T>): T[] {
//   const result: T[] = [];
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       result.push(obj[key]);
//     }
//   }
//   return result;
// }
</script>

<style lang="less" scoped>
.object-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eaeaea;

    h1 {
      font-weight: 600;
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
      color: #1a1a1a;
    }

    p {
      font-size: 1.1rem;
      color: #666;
      margin-top: 0;
    }
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.8rem;
}

.method-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.method-title {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  margin: 0;
  padding: 1.2rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.method-section {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #2c3e50;
    font-weight: 500;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4a6cf7;
      margin-right: 8px;
    }
  }

  p {
    line-height: 1.6;
    color: #4a5568;
    margin: 0.8rem 0;
  }

  pre {
    background: #f8f9fa;
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
    border: 1px solid #edf2f7;

    code {
      font-family: 'Fira Code', 'SFMono-Regular', Consolas, monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2d3748;
    }
  }
}

.conclusion {
  margin-top: 3rem;
  background: white;
  border-radius: 10px;
  padding: 1.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 1.2rem;
    color: #1a1a1a;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #eaeaea;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.7rem;
      line-height: 1.6;

      code {
        background: #f1f5f9;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9rem;
        color: #c53030;
      }
    }
  }
}

@media (max-width: 768px) {
  .methods-grid {
    grid-template-columns: 1fr;
  }

  .object-methods-container {
    padding: 1rem;
  }
}
</style>
