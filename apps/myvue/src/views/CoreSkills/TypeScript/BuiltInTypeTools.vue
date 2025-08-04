<template>
  <div class="utility-types-doc">
    <h1 class="title">TypeScript 内置类型工具</h1>
    <p class="intro">TypeScript 提供了一系列强大的内置工具类型，可以极大地提升类型系统的表达能力。以下是按照使用频率排序的常用工具类型：</p>

    <section class="section">
      <h2 class="section-title">1. 高频使用工具</h2>
      <div class="utility-grid">
        <div class="utility-card">
          <h3 class="utility-name">Partial&lt;T&gt;</h3>
          <p class="utility-desc">将类型 T 的所有属性变为可选</p>
          <pre class="code-block">interface User {
  name: string;
  age: number;
}

type PartialUser = Partial&lt;User&gt;;
// { name?: string; age?: number }</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>表单更新、可选配置对象</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">Required&lt;T&gt;</h3>
          <p class="utility-desc">将类型 T 的所有属性变为必需</p>
          <pre class="code-block">type PartialUser = {
  name?: string;
  age?: number;
};

type RequiredUser = Required&lt;PartialUser&gt;;
// { name: string; age: number }</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>确保完整对象、强制要求配置</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">Readonly&lt;T&gt;</h3>
          <p class="utility-desc">将类型 T 的所有属性变为只读</p>
          <pre class="code-block">type ReadonlyUser = Readonly&lt;User&gt;;
// { readonly name: string; readonly age: number }</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>不可变数据、配置常量</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">Pick&lt;T, K&gt;</h3>
          <p class="utility-desc">从类型 T 中选取部分属性 K</p>
          <pre class="code-block">type UserName = Pick&lt;User, 'name'&gt;;
// { name: string }</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>选择部分属性、视图模型</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">Omit&lt;T, K&gt;</h3>
          <p class="utility-desc">从类型 T 中排除部分属性 K</p>
          <pre class="code-block">type UserWithoutAge = Omit&lt;User, 'age'&gt;;
// { name: string }</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>排除敏感字段、创建子类型</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 中频使用工具</h2>
      <div class="utility-grid">
        <div class="utility-card">
          <h3 class="utility-name">Record&lt;K, T&gt;</h3>
          <p class="utility-desc">构造键类型为 K，值类型为 T 的对象类型</p>
          <pre class="code-block">type UserMap = Record&lt;string, User&gt;;
// { [key: string]: User }</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>字典、映射表、动态对象</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">Exclude&lt;T, U&gt;</h3>
          <p class="utility-desc">从类型 T 中排除可以赋值给 U 的类型</p>
          <pre class="code-block">type T = Exclude&lt;1 | 2 | 3, 1&gt;;
// 2 | 3</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>过滤联合类型、条件类型</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">Extract&lt;T, U&gt;</h3>
          <p class="utility-desc">从类型 T 中提取可以赋值给 U 的类型</p>
          <pre class="code-block">type T = Extract&lt;1 | 2 | 3, 1 | 4&gt;;
// 1</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>提取特定类型、条件类型</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">NonNullable&lt;T&gt;</h3>
          <p class="utility-desc">从类型 T 中排除 null 和 undefined</p>
          <pre class="code-block">type T = NonNullable&lt;string | null&gt;;
// string</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>确保非空值、严格模式</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">ReturnType&lt;T&gt;</h3>
          <p class="utility-desc">获取函数类型 T 的返回值类型</p>
          <pre class="code-block">type T = ReturnType&lt;() => number&gt;;
// number</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>高阶函数、React组件props</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 低频使用工具</h2>
      <div class="utility-grid">
        <div class="utility-card">
          <h3 class="utility-name">Parameters&lt;T&gt;</h3>
          <p class="utility-desc">获取函数类型 T 的参数类型元组</p>
          <pre class="code-block">type T = Parameters&lt;(a: string, b: number) => void&gt;;
// [string, number]</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>高阶函数、函数包装器</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">ConstructorParameters&lt;T&gt;</h3>
          <p class="utility-desc">获取构造函数类型 T 的参数类型元组</p>
          <pre class="code-block">class User {
  constructor(name: string, age: number) {}
}

type T = ConstructorParameters&lt;typeof User&gt;;
// [string, number]</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>工厂函数、类装饰器</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">InstanceType&lt;T&gt;</h3>
          <p class="utility-desc">获取构造函数类型 T 的实例类型</p>
          <pre class="code-block">type T = InstanceType&lt;typeof User&gt;;
// User</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>工厂函数、依赖注入</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">ThisParameterType&lt;T&gt;</h3>
          <p class="utility-desc">获取函数类型 T 的 this 参数类型</p>
          <pre class="code-block">function f(this: { x: number }) {}
type T = ThisParameterType&lt;typeof f&gt;;
// { x: number }</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>高级函数绑定、上下文类型</p>
          </div>
        </div>

        <div class="utility-card">
          <h3 class="utility-name">OmitThisParameter&lt;T&gt;</h3>
          <p class="utility-desc">移除函数类型 T 的 this 参数</p>
          <pre class="code-block">type T = OmitThisParameter&lt;typeof f&gt;;
// () => void</pre>
          <div class="use-case">
            <h4>使用场景</h4>
            <p>函数包装器、上下文无关函数</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. 实用组合技巧</h2>
      <div class="content">
        <h3 class="sub-title">常见组合模式</h3>
        <div class="combo-grid">
          <div class="combo-card">
            <h4>部分属性可选</h4>
            <pre class="small-code">type PartialPick&lt;T, K extends keyof T&gt; =
  Partial&lt;Pick&lt;T, K&gt;&gt; & Omit&lt;T, K&gt;;</pre>
          </div>
          <div class="combo-card">
            <h4>严格属性检查</h4>
            <pre class="small-code">type Strict&lt;T, U extends T&gt; =
  T & Record&lt;Exclude&lt;keyof U, keyof T&gt;, never&gt;;</pre>
          </div>
          <div class="combo-card">
            <h4>函数参数转换</h4>
            <pre class="small-code">type AsyncReturn&lt;T&gt; =
  T extends (...args: infer A) => infer R
    ? (...args: A) => Promise&lt;R&gt;
    : never;</pre>
          </div>
        </div>

        <h3 class="sub-title">最佳实践</h3>
        <div class="best-practice-grid">
          <div class="practice-card">
            <h4>命名规范</h4>
            <ul>
              <li>为复杂工具类型创建有意义的别名</li>
              <li>使用 PascalCase 命名类型</li>
              <li>为泛型参数使用单字母或描述性名称</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>使用建议</h4>
            <ul>
              <li>优先使用内置工具而非手动实现</li>
              <li>避免过度嵌套工具类型</li>
              <li>为复杂类型添加注释说明</li>
            </ul>
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
.utility-types-doc {
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

  .utility-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .utility-card {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .utility-name {
      margin-top: 0;
      color: #2c3e50;
      font-size: 1.2em;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }

    .utility-desc {
      color: #555;
      margin: 10px 0;
      font-size: 0.95em;
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

  .small-code {
    background: #f5f7fa;
    padding: 8px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.8em;
    margin: 5px 0;
  }

  .combo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .combo-card {
    padding: 15px;
    background: #f0f7ff;
    border-radius: 6px;
    border: 1px solid #d0e3ff;

    h4 {
      margin-top: 0;
      color: #2980b9;
      font-size: 0.95em;
    }
  }

  .best-practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
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
}

@media (max-width: 768px) {
  .utility-types-doc {
    padding: 10px;

    .section {
      padding: 15px;
    }

    .utility-grid,
    .combo-grid,
    .best-practice-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>