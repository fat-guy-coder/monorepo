<template>
  <div class="types-doc">
    <h1 class="title">TypeScript 类型断言与类型索引与确定赋值断言</h1>

    <section class="section">
      <h2 class="section-title">1. 类型断言 (Type Assertion)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>类型断言是告诉编译器"相信我，我知道这个值的类型"的方式。它类似于其他语言中的类型转换，但不进行特殊的数据检查或解构。</p>

        <div class="notice-box info">
          <strong>注意：</strong>类型断言纯粹是编译时的语法，不会影响运行时的行为
        </div>

        <h3 class="sub-title">两种语法形式</h3>
        <div class="syntax-grid">
          <div class="syntax-card">
            <h4>尖括号语法</h4>
            <pre class="code-block">let someValue: any = "this is a string";
let strLength: number = (&lt;string&gt;someValue).length;</pre>
            <p>在 JSX 中不可用</p>
          </div>
          <div class="syntax-card">
            <h4>as 语法</h4>
            <pre class="code-block">let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;</pre>
            <p>推荐使用，兼容 JSX</p>
          </div>
        </div>

        <h3 class="sub-title">示例代码</h3>
        <pre class="code-block">// 1. 处理 any 类型
const unknownObj: any = { x: 10 };
const x = (unknownObj as { x: number }).x;

// 2. 处理联合类型
function formatInput(input: string | number) {
  const str = input as string; // 谨慎使用，可能不安全
  return str.trim();
}

// 3. 处理 DOM 元素
const myCanvas = document.getElementById("my_canvas") as HTMLCanvasElement;
const ctx = myCanvas.getContext("2d");

// 4. 非空断言 (!)
type User = { name?: string };
function printUserName(user: User) {
  console.log(user.name!.toUpperCase()); // 确保 name 存在
}

// 5. 双重断言 (as any as T)
const str = "hello";
const num = str as any as number; // 不推荐，除非必要</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>DOM 操作</h4>
            <p>获取特定类型的 DOM 元素</p>
            <pre class="small-code">const input = document.getElementById('email')
  as HTMLInputElement;</pre>
          </div>
          <div class="scenario-card">
            <h4>API 响应处理</h4>
            <p>处理已知结构的响应数据</p>
            <pre class="small-code">const response = await fetch('/api')
  as ApiResponse;</pre>
          </div>
          <div class="scenario-card">
            <h4>单元测试</h4>
            <p>模拟部分实现的对象</p>
            <pre class="small-code">const mockService = {
  getData: jest.fn()
} as unknown as DataService;</pre>
          </div>
        </div>

        <h3 class="sub-title">安全注意事项</h3>
        <div class="notice-box warning">
          <ul>
            <li>避免过度使用类型断言，这会使类型系统失去意义</li>
            <li>优先考虑类型守卫和更精确的类型定义</li>
            <li>双重断言 (<code>as any as T</code>) 应该非常谨慎使用</li>
            <li>非空断言 (<code>!</code>) 可能导致运行时错误</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 类型索引 (Index Types)(keyof 类型运算符)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>类型索引允许我们使用动态属性名称访问类型，通过 <code>keyof</code> 和索引类型查询实现灵活的类型操作。</p>

        <h3 class="sub-title">核心概念</h3>
        <div class="concept-grid">
          <div class="concept-card">
            <h4>keyof 操作符</h4>
            <p>获取类型的所有键的联合类型</p>
            <pre class="small-code">interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person;
// "name" | "age"</pre>
          </div>
          <div class="concept-card">
            <h4>T[K] 索引访问</h4>
            <p>获取类型特定属性的类型</p>
            <pre class="small-code">type NameType = Person["name"];
// string

type ValueTypes = Person[keyof Person];
// string | number</pre>
          </div>
        </div>

        <h3 class="sub-title">示例代码</h3>
        <pre class="code-block">// 1. 动态属性访问
function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "Alice", age: 30 };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age");  // number

// 2. 映射类型
type Readonly&lt;T&gt; = {
  readonly [P in keyof T]: T[P];
};

type Partial&lt;T&gt; = {
  [P in keyof T]?: T[P];
};

// 3. 条件类型与索引
type NonFunctionKeys&lt;T&gt; = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type PersonNonFunctionKeys = NonFunctionKeys&lt;Person&gt;;
// "name" | "age"

// 4. 复杂索引签名
interface Dictionary&lt;T&gt; {
  [key: string]: T;
}

const dict: Dictionary&lt;number&gt; = {
  count: 123,
  total: 456
};</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>类型安全的对象操作</h4>
            <p>创建通用的属性访问函数</p>
            <pre class="small-code">function pluck&lt;T, K extends keyof T&gt;(
  items: T[],
  key: K
): T[K][] {
  return items.map(item => item[key]);
}</pre>
          </div>
          <div class="scenario-card">
            <h4>高级工具类型</h4>
            <p>构建复杂的类型工具</p>
            <pre class="small-code">type Pick&lt;T, K extends keyof T&gt; = {
  [P in K]: T[P];
};

type Omit&lt;T, K extends keyof any&gt; =
  Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;;</pre>
          </div>
          <div class="scenario-card">
            <h4>动态表单处理</h4>
            <p>处理动态生成的表单字段</p>
            <pre class="small-code">type FormFields = {
  username: string;
  password: string;
  remember: boolean;
};

function validate&lt;K extends keyof FormFields&gt;(
  field: K,
  value: FormFields[K]
): boolean {
  // 字段特定验证逻辑
}</pre>
          </div>
        </div>

        <h3 class="sub-title">高级模式</h3>
        <div class="advanced-grid">
          <div class="advanced-card">
            <h4>递归索引类型</h4>
            <pre class="small-code">type DeepReadonly&lt;T&gt; = {
  readonly [P in keyof T]:
    T[P] extends object ?
      DeepReadonly&lt;T[P]&gt; :
      T[P];
};</pre>
          </div>
          <div class="advanced-card">
            <h4>条件索引签名</h4>
            <pre class="small-code">type FilterProperties&lt;T, U&gt; = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 确定赋值断言 (Definite Assignment Assertion)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>
          在 TypeScript 中，类的实例属性如果没有在声明时或构造函数中初始化，会报错。<br>
          确定赋值断言（<code>!</code>）用于告诉编译器：“我保证这个属性会被赋值”，即使 TypeScript 检查不到赋值路径。
        </p>
        <div class="notice-box warning">
          <strong>注意：</strong>确定赋值断言只影响类型检查，不会影响运行时行为。使用时需确保属性确实会被赋值，否则可能导致运行时错误。
        </div>

        <h3 class="sub-title">语法形式</h3>
        <div class="syntax-grid">
          <div class="syntax-card">
            <h4>属性声明加 <code>!</code></h4>
            <pre class="code-block">class Person {
  name!: string; // 告诉 TypeScript: name 一定会被赋值
}</pre>
            <p>适用于类属性、全局变量等</p>
          </div>
        </div>

        <h3 class="sub-title">示例代码</h3>
        <pre class="code-block">// 1. 类属性未在构造函数中初始化
class User {
  id!: number;
  name!: string;

  initialize(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const u = new User();
u.initialize(1, "Alice");
console.log(u.id, u.name); // 1 "Alice"

// 2. 结合依赖注入场景
class Service {
  repository!: Repository; // 由外部注入
  // ...
}</pre>

        <h3 class="sub-title">常见应用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>依赖注入</h4>
            <p>属性由框架或外部代码赋值</p>
            <pre class="small-code">class Controller {
  service!: Service; // 由依赖注入容器赋值
}</pre>
          </div>
          <div class="scenario-card">
            <h4>延迟初始化</h4>
            <p>属性在构造函数外部初始化</p>
            <pre class="small-code">class LazyLoader {
  data!: string;
  load() {
    this.data = "已加载";
  }
}</pre>
          </div>
          <div class="scenario-card">
            <h4>Vue 组件属性</h4>
            <p>如 <code>ref</code> 或 <code>props</code> 在 <code>setup</code> 中赋值</p>
            <pre class="small-code">import { ref } from "vue";
let el!: HTMLElement;
onMounted(() =&gt; {
  el = document.getElementById("app")!;
});</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. typeof 类型运算符</h2>
      <div class="content">
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>typeof 运算符</th>
                <th>应用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>作用</td>
                <td>获取变量或表达式的类型</td>
                <td>类型复用、推断变量类型</td>
              </tr>
              <tr>
                <td>语法</td>
                <td><code>typeof 变量名</code></td>
                <td>定义变量类型与已有变量一致</td>
              </tr>
              <tr>
                <td>常见用途</td>
                <td>类型安全、减少重复定义</td>
                <td>函数参数、工具类型等</td>
              </tr>
              <tr>
                <td>限制</td>
                <td>只能用于已声明的变量或属性</td>
                <td>不能直接用于类型字面量</td>
              </tr>
              <tr>
                <td>运行时影响</td>
                <td>无，仅在类型系统中生效</td>
                <td>无</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="sub-title">用法示例</h3>
        <pre class="code-block">// 基本用法
const person = {
  name: "Tom",
  age: 18
};

type Person = typeof person;
// 等价于：{ name: string; age: number }

// 用于函数参数类型
function printPerson(p: typeof person) {
  console.log(p.name, p.age);
}

// 结合类型索引
type NameType = typeof person["name"]; // string
</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">5. <code>in</code> 操作符</h2>
      <div class="content">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>对比项</th>
                <th><code>in</code> 操作符</th>
                <th>常见用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>作用</td>
                <td>检查属性是否存在于对象或类型中</td>
                <td>类型守卫、类型映射</td>
              </tr>
              <tr>
                <td>语法</td>
                <td><code>属性名 in 对象</code></td>
                <td>判断对象是否有某属性</td>
              </tr>
              <tr>
                <td>常见用途</td>
                <td>类型缩小、类型保护</td>
                <td>映射类型遍历属性</td>
              </tr>
              <tr>
                <td>限制</td>
                <td>只能用于对象类型或联合类型</td>
                <td>不能用于基本类型</td>
              </tr>
              <tr>
                <td>运行时影响</td>
                <td>有，实际判断属性是否存在</td>
                <td>类型系统和运行时均可用</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="sub-title">用法示例</h3>
        <pre class="code-block">// 基本用法
const person = {
  name: "Tom",
  age: 18
};

console.log("name" in person); // true

// 用于类型守卫
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow();
  } else {
    // 这里 TypeScript 会自动缩小为 Dog
    animal.bark();
  }
}

// 用于映射类型
type Keys = "a" | "b" | "c";
type Flags = {
  [K in Keys]: boolean
};
// 等价于：{ a: boolean; b: boolean; c: boolean }
</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">6. 最佳实践</h2>
      <div class="content">
        <div class="best-practice-grid">
          <div class="practice-card">
            <h4>类型断言最佳实践</h4>
            <ul>
              <li>优先使用 <code>as</code> 语法而非尖括号语法</li>
              <li>尽量缩小断言范围，避免对整个对象断言</li>
              <li>为复杂的断言添加注释说明原因</li>
              <li>考虑使用类型守卫替代断言</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>类型索引最佳实践</h4>
            <ul>
              <li>使用 <code>keyof</code> 约束泛型参数</li>
              <li>利用映射类型减少重复代码</li>
              <li>为复杂索引类型添加类型别名</li>
              <li>结合条件类型创建高级工具类型</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>确定赋值断言最佳实践</h4>
            <ul>
              <li>优先使用 <code>!</code> 断言</li>
              <li>避免在类型字面量中使用 <code>!</code></li>
              <li>结合类型索引使用 <code>!</code> 获取更精确的类型</li>
              <li>为 <code>!</code> 添加注释说明原因</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>in 最佳实践</h4>
            <ul>
              <li>优先使用 <code>in</code> 操作符</li>
              <li>避免在类型字面量中使用 <code>in</code></li>
              <li>结合类型索引使用 <code>in</code> 获取更精确的类型</li>
              <li>为 <code>in</code> 添加注释说明原因</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>typeof 最佳实践</h4>
            <ul>
              <li>优先使用 <code>typeof</code> 获取变量类型</li>
              <li>避免在类型字面量中使用 <code>typeof</code></li>
              <li>结合类型索引使用 <code>typeof</code> 获取更精确的类型</li>
              <li>为 <code>typeof</code> 添加注释说明原因</li>
            </ul>
          </div>
        </div>

        <div class="notice-box success">
          <h4>实用技巧</h4>
          <ul>
            <li>使用 <code>const assertions</code> 替代部分类型断言场景</li>
            <li>利用 <code>satisfies</code> 操作符(TypeScript 4.9+)进行安全类型匹配</li>
            <li>组合 <code>keyof</code> 和 <code>typeof</code> 获取运行时值的类型信息</li>
            <li>使用 <code>template literal types</code> 增强索引类型表达能力</li>
          </ul>
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

    &.success {
      background-color: #ebfbee;
      border-color: #40c057;
    }

    ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
    }
  }

  .syntax-grid,
  .concept-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;

    .syntax-card,
    .concept-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #eee;

      h4 {
        margin-top: 0;
        color: #2c3e50;
      }
    }
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

  .advanced-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 15px;
    margin-top: 20px;

    .advanced-card {
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

  .best-practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;

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

    .syntax-grid,
    .concept-grid,
    .scenario-grid,
    .advanced-grid,
    .best-practice-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>