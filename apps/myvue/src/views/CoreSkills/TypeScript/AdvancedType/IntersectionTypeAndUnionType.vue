<template>
  <div class="types-doc">
    <h1 class="title">TypeScript 联合类型与交叉类型</h1>

    <section class="section">
      <h2 class="section-title">1. 联合类型 (Union Types)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>联合类型使用 <code>|</code> 操作符表示一个值可以是几种类型之一。这是 TypeScript 类型系统的核心特性之一，提供了极大的灵活性。</p>

        <h3 class="sub-title">示例代码</h3>
        <pre class="code-block">// 基础联合类型
type ID = string | number;

function printId(id: ID) {
  // 类型收窄 (Type Narrowing)
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// 字面量联合类型
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
  console.log(`Moving ${direction}`);
}

// 复杂对象联合
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; sideLength: number };
type Shape = Circle | Square;

function getArea(shape: Shape): number {
  // 可辨识联合 (Discriminated Union)
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>API 响应处理</h4>
            <p>处理可能成功或失败的 API 响应</p>
            <pre class="small-code">type ApiResponse =
  { status: "success"; data: User } |
  { status: "error"; message: string };</pre>
          </div>
          <div class="scenario-card">
            <h4>组件 Props</h4>
            <p>接受多种类型的属性值</p>
            <pre class="small-code">type ButtonProps = {
  size: "small" | "medium" | "large";
  theme?: "primary" | "secondary";
};</pre>
          </div>
          <div class="scenario-card">
            <h4>状态管理</h4>
            <p>表示应用的不同状态</p>
            <pre class="small-code">type AppState =
  { state: "loading" } |
  { state: "ready"; data: Data[] } |
  { state: "error"; error: Error };</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 交叉类型 (Intersection Types)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>交叉类型使用 <code>&</code> 操作符表示一个值必须同时满足多个类型的条件。它可以将多个类型合并为一个类型。</p>

        <h3 class="sub-title">示例代码</h3>
        <pre class="code-block">// 基本交叉类型
interface Person {
  name: string;
  age: number;
}

interface Employee {
  company: string;
  position: string;
}

type EmployeePerson = Person & Employee;

const john: EmployeePerson = {
  name: "John",
  age: 30,
  company: "Tech Corp",
  position: "Developer"
};

// 与泛型结合
function merge&lt;T, U&gt;(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge(
  { name: "Alice" },
  { age: 25 }
); // { name: string; age: number }

// 与联合类型结合
type A = { a: string };
type B = { b: number };
type C = { c: boolean };

type All = (A | B) & C; // 必须满足 C，同时满足 A 或 B

const obj1: All = { a: "test", c: true };
const obj2: All = { b: 123, c: false };</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>混入 (Mixin) 模式</h4>
            <p>组合多个类的功能</p>
            <pre class="small-code">class Disposable {
  dispose() { /*...*/ }
}

class Activatable {
  activate() { /*...*/ }
}

type SmartObject = Disposable & Activatable;</pre>
          </div>
          <div class="scenario-card">
            <h4>组合组件 Props</h4>
            <p>扩展基础组件属性</p>
            <pre class="small-code">type BaseProps = {
  className?: string;
  style?: React.CSSProperties;
};

type ButtonProps = BaseProps & {
  onClick: () => void;
  children: React.ReactNode;
};</pre>
          </div>
          <div class="scenario-card">
            <h4>高阶组件</h4>
            <p>增强组件功能</p>
            <pre class="small-code">function withLoading&lt;T&gt;(Component: React.ComponentType&lt;T&gt;) {
  return (props: T & { isLoading: boolean }) => {
    // ...
  };
}</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 联合类型 vs 交叉类型</h2>
      <div class="content">
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>联合类型 (|)</th>
                <th>交叉类型 (&)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>含义</td>
                <td>可以是其中任意一个类型</td>
                <td>必须同时满足所有类型</td>
              </tr>
              <tr>
                <td>常见用途</td>
                <td>处理多种可能的输入类型</td>
                <td>组合或扩展现有类型</td>
              </tr>
              <tr>
                <td>类型收窄</td>
                <td>需要类型守卫区分</td>
                <td>自动获得所有属性</td>
              </tr>
              <tr>
                <td>与函数</td>
                <td>参数类型更灵活</td>
                <td>返回类型更严格</td>
              </tr>
              <tr>
                <td>与对象</td>
                <td>只能访问共有成员</td>
                <td>可以访问所有成员</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="sub-title">组合使用示例</h3>
        <pre class="code-block">// 组合使用示例
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// 联合类型表示不同的数据形态
type ArtResponse = ArtworksData | ArtistsData;

// 交叉类型确保错误处理机制
type ArtApiResponse = ArtResponse & ErrorHandling;

// 使用示例
const handleResponse = (response: ArtApiResponse) => {
  if (!response.success) {
    console.error(response.error?.message);
    return;
  }

  if ("artworks" in response) {
    console.log(response.artworks);
  } else {
    console.log(response.artists);
  }
};</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. 类型收窄 (Type Narrowing)</h2>
      <div class="content">
        <p>处理联合类型时，TypeScript 需要确定当前是哪种具体类型，这个过程称为类型收窄。</p>

        <div class="narrowing-grid">
          <div class="narrowing-card">
            <h4>typeof 类型守卫</h4>
            <pre class="small-code">function padLeft(value: string | number) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.padStart(10);
}</pre>
          </div>
          <div class="narrowing-card">
            <h4>instanceof 检查</h4>
            <pre class="small-code">class Bird { fly() {} }
class Fish { swim() {} }

function move(pet: Bird | Fish) {
  if (pet instanceof Bird) {
    pet.fly();
  } else {
    pet.swim();
  }
}</pre>
          </div>
          <div class="narrowing-card">
            <h4>in 操作符</h4>
            <pre class="small-code">type Dog = { bark(): void };
type Cat = { meow(): void };

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}</pre>
          </div>
          <div class="narrowing-card">
            <h4>自定义类型谓词</h4>
            <pre class="small-code">function isFish(pet: Fish | Bird):
  pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function getSmallPet(): Fish | Bird {
  return Math.random() > 0.5
    ? new Fish()
    : new Bird();
}

const pet = getSmallPet();
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// 这里可以添加一些演示逻辑（如果需要）
</script>

<style lang="less" scoped>
.types-doc {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;

  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #eee;
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
    }

    .sub-title {
      color: #2c3e50;
      margin: 20px 0 10px;
    }

    .content {
      color: #555;
    }
  }

  .code-block {
    background: #f5f7fa;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    margin: 15px 0;
    border-left: 4px solid #3498db;
    font-size: 0.9em;
    line-height: 1.5;
  }

  .small-code {
    background: #f5f7fa;
    padding: 8px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.8em;
    margin: 5px 0;
  }

  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .scenario-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #3498db;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      h4 {
        margin-top: 0;
        color: #2c3e50;
        font-size: 1em;
      }

      p {
        color: #7f8c8d;
        font-size: 0.85em;
        margin: 8px 0;
      }
    }
  }

  .comparison-table {
    margin: 20px 0;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #3498db;
        color: white;
        font-weight: bold;
      }

      tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      tr:hover {
        background-color: #f1f1f1;
      }
    }
  }

  .narrowing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
    margin-top: 20px;

    .narrowing-card {
      padding: 12px;
      background: #f0f7ff;
      border-radius: 6px;
      border: 1px solid #d0e3ff;

      h4 {
        margin-top: 0;
        color: #2980b9;
        font-size: 0.9em;
      }
    }
  }

  code {
    background: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
    color: #c7254e;
  }
}

@media (max-width: 768px) {
  .types-doc {
    padding: 10px;

    .section {
      padding: 15px;
    }

    .scenario-grid,
    .narrowing-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>