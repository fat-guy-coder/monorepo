<template>
  <div class="type-predicates-doc">
    <h1 class="title">TypeScript 类型谓词基本介绍</h1>
    <p class="intro">类型谓词（Type Predicates）是 TypeScript 中用于类型收窄的强大工具，允许开发者定义自定义的类型保护函数。</p>

    <section class="section">
      <h2 class="section-title">1. 基本概念</h2>
      <div class="content">
        <p>类型谓词是一种特殊的返回类型注解，格式为 <code>parameterName is Type</code>，它告诉 TypeScript 编译器在函数返回 <code>true</code> 时，参数属于特定类型。
        </p>

        <div class="notice-box info">
          <strong>核心语法：</strong> <code>function isType(value: any): value is Type { ... }</code>
        </div>

        <h3 class="sub-title">基本示例</h3>
        <pre class="code-block">interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal;
}

function handleAnimal(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();  // 类型收窄为 Cat
  } else {
    animal.bark();  // 类型收窄为 Dog
  }
}</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 常见使用模式</h2>
      <div class="pattern-grid">
        <div class="pattern-card">
          <h3 class="pattern-name">1. 区分联合类型</h3>
          <pre class="code-block">type Square = { kind: 'square'; size: number };
type Circle = { kind: 'circle'; radius: number };

function isCircle(shape: Square | Circle):
  shape is Circle {
  return shape.kind === 'circle';
}</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>处理可辨识联合类型（Discriminated Unions）</p>
          </div>
        </div>

        <div class="pattern-card">
          <h3 class="pattern-name">2. 检查复杂类型</h3>
          <pre class="code-block">function isUser(data: any): data is User {
  return data &&
    typeof data.name === 'string' &&
    typeof data.age === 'number';
}</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>验证 API 响应数据、运行时类型检查</p>
          </div>
        </div>

        <div class="pattern-card">
          <h3 class="pattern-name">3. 数组元素过滤</h3>
          <pre class="code-block">function isStringArray(arr: any[]):
  arr is string[] {
  return arr.every(item => typeof item === 'string');
}

const mixed = ['a', 1, 'b'];
if (isStringArray(mixed)) {
  // mixed 被识别为 string[]
}</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>处理混合类型数组、数据清洗</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 高级用法</h2>
      <div class="advanced-grid">
        <div class="advanced-card">
          <h3 class="advanced-name">1. 泛型类型谓词</h3>
          <pre class="code-block">function isOfType&lt;T&gt;(
  value: any,
  key: keyof T
): value is T {
  return value && key in value;
}

interface Product {
  id: string;
  price: number;
}

const item = { id: '1', price: 10 };
if (isOfType&lt;Product&gt;(item, 'price')) {
  // item 被识别为 Product
}</pre>
        </div>

        <div class="advanced-card">
          <h3 class="advanced-name">2. 组合类型守卫</h3>
          <pre class="code-block">function isAdmin(user: User): user is AdminUser {
  return user.role === 'admin';
}

function hasPermission(
  user: User
): user is User & { permissions: string[] } {
  return 'permissions' in user;
}

function handleUser(user: User) {
  if (isAdmin(user) {
    // user is AdminUser
  }
  if (hasPermission(user)) {
    // user is User & { permissions: string[] }
  }
}</pre>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. 最佳实践</h2>
      <div class="best-practice-grid">
        <div class="practice-card">
          <h4>命名规范</h4>
          <ul>
            <li>使用 <code>is</code> 前缀（如 <code>isAdmin</code>）</li>
            <li>对于否定情况使用 <code>isNot</code> 前缀</li>
            <li>保持名称与返回类型一致</li>
          </ul>
        </div>

        <div class="practice-card">
          <h4>实现建议</h4>
          <ul>
            <li>确保类型谓词的逻辑与类型断言一致</li>
            <li>避免复杂的谓词逻辑</li>
            <li>为复杂谓词添加单元测试</li>
          </ul>
        </div>

        <div class="practice-card">
          <h4>性能考虑</h4>
          <ul>
            <li>对于大型对象避免深度检查</li>
            <li>考虑使用标记属性进行快速判断</li>
            <li>缓存重复使用的谓词结果</li>
          </ul>
        </div>
      </div>

      <div class="notice-box warning">
        <h4>注意事项</h4>
        <ul>
          <li>类型谓词不会影响运行时行为</li>
          <li>错误的谓词实现会导致类型系统不准确</li>
          <li>避免在谓词中使用类型断言（as）</li>
          <li>谨慎处理 any 类型的参数</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">5. 常见问题解答</h2>
      <div class="faq-grid">
        <div class="faq-card">
          <h4>类型谓词和类型断言有什么区别？</h4>
          <p>类型谓词是自定义的类型保护，需要实际运行时检查；而类型断言只是告诉编译器"相信我"。</p>
        </div>

        <div class="faq-card">
          <h4>为什么我的类型谓词不起作用？</h4>
          <p>检查函数是否返回 boolean 值，并且确保参数类型与谓词类型兼容。</p>
        </div>

        <div class="faq-card">
          <h4>可以在类方法中使用类型谓词吗？</h4>
          <p>可以，但需要使用 <code>this is Type</code> 形式来收窄 this 类型。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// 演示数据
const examples = {
  basic: `interface Cat { meow(): void; }
interface Dog { bark(): void; }

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal;
}`,

  discriminated: `type Square = { kind: 'square'; size: number };
type Circle = { kind: 'circle'; radius: number };

function isCircle(shape: Square | Circle): shape is Circle {
  return shape.kind === 'circle';
}`,

  generic: `function isOfType<T>(
  value: any,
  key: keyof T
): value is T {
  return value && key in value;
}`
}
</script>

<style lang="less" scoped>
.type-predicates-doc {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;

  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 2px solid #eee;
  }

  .intro {
    text-align: center;
    font-size: 1.1em;
    color: #555;
    margin-bottom: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .section {
    margin-bottom: 40px;
    background: #fff;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .section-title {
      color: #3498db;
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
    }
  }

  .code-block {
    background: #f5f7fa;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    margin: 10px 0;
    font-size: 0.85em;
    line-height: 1.5;
    border-left: 3px solid #3498db;
  }

  .notice-box {
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    border-left: 4px solid;

    &.info {
      background-color: #e7f5fe;
      border-color: #3498db;
    }

    &.warning {
      background-color: #fff3bf;
      border-color: #ffd43b;
    }

    h4 {
      margin-top: 0;
    }

    ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
    }
  }

  .pattern-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .pattern-card {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .pattern-name {
      margin-top: 0;
      color: #2c3e50;
      font-size: 1.1em;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }

    .use-case {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px dashed #ddd;

      h4 {
        margin: 0 0 8px 0;
        font-size: 0.9em;
        color: #3498db;
      }

      p {
        margin: 0;
        font-size: 0.85em;
        color: #666;
      }
    }
  }

  .advanced-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .advanced-card {
    padding: 20px;
    background: #f0f7ff;
    border-radius: 8px;
    border: 1px solid #d0e3ff;

    .advanced-name {
      margin-top: 0;
      color: #2980b9;
    }
  }

  .best-practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .practice-card {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 6px;
    border-top: 4px solid #40c057;

    h4 {
      margin-top: 0;
      color: #2c3e50;
    }

    ul {
      padding-left: 20px;
      margin: 10px 0 0 0;
    }
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .faq-card {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #9b59b6;

    h4 {
      margin-top: 0;
      color: #2c3e50;
      font-size: 1em;
    }

    p {
      margin: 10px 0 0 0;
      color: #555;
      font-size: 0.9em;
    }
  }
}

@media (max-width: 768px) {
  .type-predicates-doc {
    padding: 10px;

    .section {
      padding: 15px;
    }

    .pattern-grid,
    .advanced-grid,
    .best-practice-grid,
    .faq-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
