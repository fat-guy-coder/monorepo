<template>
  <div class="types-doc">
    <h1 class="title">TypeScript 映射类型与条件类型</h1>

    <section class="section">
      <h2 class="section-title">1. 映射类型 (Mapped Types)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>映射类型是一种基于旧类型创建新类型的通用方式，它通过遍历现有类型的属性并应用转换规则来生成新类型。</p>

        <div class="notice-box info">
          <strong>核心思想：</strong>使用 <code>in</code> 操作符遍历键名，然后基于这些键名和原始类型创建新类型
        </div>

        <h3 class="sub-title">基本语法</h3>
        <pre class="code-block">type MappedType&lt;T&gt; = {
  [P in keyof T]: NewType;
};</pre>

        <h3 class="sub-title">内置映射类型</h3>
        <div class="builtin-types-grid">
          <div class="type-card">
            <h4>Readonly&lt;T&gt;</h4>
            <p>使所有属性变为只读</p>
            <pre class="small-code">type ReadonlyPerson = Readonly&lt;Person&gt;;
// { readonly name: string; readonly age: number }</pre>
          </div>
          <div class="type-card">
            <h4>Partial&lt;T&gt;</h4>
            <p>使所有属性变为可选</p>
            <pre class="small-code">type PartialPerson = Partial&lt;Person&gt;;
// { name?: string; age?: number }</pre>
          </div>
          <div class="type-card">
            <h4>Required&lt;T&gt;</h4>
            <p>使所有属性变为必需</p>
            <pre class="small-code">type RequiredPerson = Required&lt;PartialPerson&gt;;
// { name: string; age: number }</pre>
          </div>
          <div class="type-card">
            <h4>Pick&lt;T, K&gt;</h4>
            <p>选择部分属性</p>
            <pre class="small-code">type NameOnly = Pick&lt;Person, 'name'&gt;;
// { name: string }</pre>
          </div>
        </div>

        <h3 class="sub-title">自定义映射类型示例</h3>
        <pre class="code-block">// 1. 基本映射
type Nullable&lt;T&gt; = {
  [P in keyof T]: T[P] | null;
};

// 2. 修改属性修饰符
type Getters&lt;T&gt; = {
  [P in keyof T as `get${Capitalize&lt;string & P&gt;}`]: () => T[P];
};

// 3. 过滤属性
type MethodsOnly&lt;T&gt; = {
  [P in keyof T as T[P] extends Function ? P : never]: T[P];
};

// 4. 键名重映射 (TypeScript 4.1+)
type EventConfig&lt;T&gt; = {
  [P in keyof T as `on${Capitalize&lt;string & P&gt;}Change`]: (value: T[P]) => void;
};

// 5. 复杂映射
type Proxy&lt;T&gt; = {
  get(): T;
  set(value: T): void;
};

type Proxify&lt;T&gt; = {
  [P in keyof T]: Proxy&lt;T[P]&gt;;
};</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>API 响应处理</h4>
            <p>转换请求和响应类型</p>
            <pre class="small-code">type ApiResponse&lt;T&gt; = {
  data: T;
  error?: string;
};

type UserResponse = ApiResponse&lt;{
  id: number;
  name: string;
}&gt;;</pre>
          </div>
          <div class="scenario-card">
            <h4>表单处理</h4>
            <p>生成表单值和错误类型</p>
            <pre class="small-code">type FormModel&lt;T&gt; = {
  values: T;
  errors: { [K in keyof T]?: string };
};</pre>
          </div>
          <div class="scenario-card">
            <h4>状态管理</h4>
            <p>创建不可变状态类型</p>
            <pre class="small-code">type Immutable&lt;T&gt; = {
  readonly [P in keyof T]: Immutable&lt;T[P]&gt;;
};</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 条件类型 (Conditional Types)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>条件类型允许我们根据类型关系选择不同的类型，形式为 <code>T extends U ? X : Y</code>，类似于三元表达式。</p>

        <div class="notice-box info">
          <strong>分布式条件类型：</strong>当检查的类型是联合类型时，条件类型会自动分布到每个成员类型上
        </div>

        <h3 class="sub-title">基本语法</h3>
        <pre class="code-block">type ConditionalType&lt;T&gt; = T extends U ? X : Y;</pre>

        <h3 class="sub-title">内置条件类型</h3>
        <div class="builtin-types-grid">
          <div class="type-card">
            <h4>Exclude&lt;T, U&gt;</h4>
            <p>从T中排除可分配给U的类型</p>
            <pre class="small-code">type T = Exclude&lt;1 | 2 | 3, 1 | 2&gt;; // 3</pre>
          </div>
          <div class="type-card">
            <h4>Extract&lt;T, U&gt;</h4>
            <p>从T中提取可分配给U的类型</p>
            <pre class="small-code">type T = Extract&lt;1 | 2 | 3, 1 | 4&gt;; // 1</pre>
          </div>
          <div class="type-card">
            <h4>NonNullable&lt;T&gt;</h4>
            <p>从T中排除null和undefined</p>
            <pre class="small-code">type T = NonNullable&lt;string | null&gt;; // string</pre>
          </div>
          <div class="type-card">
            <h4>ReturnType&lt;T&gt;</h4>
            <p>获取函数返回类型</p>
            <pre class="small-code">type T = ReturnType&lt;() => number&gt;; // number</pre>
          </div>
        </div>

        <h3 class="sub-title">条件类型示例</h3>
        <pre class="code-block">// 1. 基本条件类型
type IsString&lt;T&gt; = T extends string ? true : false;
type A = IsString&lt;'hello'&gt;; // true
type B = IsString&lt;123&gt;;     // false

// 2. 分布式条件类型
type ToArray&lt;T&gt; = T extends any ? T[] : never;
type StrOrNumArray = ToArray&lt;string | number>; // string[] | number[]

// 3. 类型推断 (infer)
type UnpackPromise&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : T;
type Num = UnpackPromise&lt;Promise&lt;number&gt;&gt;; // number

// 4. 递归条件类型
type DeepReadonly&lt;T&gt; = T extends object
  ? { readonly [P in keyof T]: DeepReadonly&lt;T[P]&gt; }
  : T;

// 5. 复杂条件判断
type Flatten&lt;T&gt; = T extends any[]
  ? T[number]
  : T extends object
    ? T[keyof T]
    : T;</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>API 响应处理</h4>
            <p>处理不同版本的API响应</p>
            <pre class="small-code">type ApiResponse&lt;T, Version extends 1 | 2&gt; =
  Version extends 1 ? { data: T } : { result: T };</pre>
          </div>
          <div class="scenario-card">
            <h4>组件Props</h4>
            <p>根据条件调整属性</p>
            <pre class="small-code">type ButtonProps&lt;T extends 'primary' | 'secondary'&gt; =
  T extends 'primary'
    ? { bold: boolean }
    : { italic: boolean };</pre>
          </div>
          <div class="scenario-card">
            <h4>类型工具</h4>
            <p>创建高级类型工具</p>
            <pre class="small-code">type FunctionKeys&lt;T&gt; = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 映射类型与条件类型的结合</h2>
      <div class="content">
        <h3 class="sub-title">结合使用示例</h3>
        <pre class="code-block">// 1. 条件映射
type ConditionalMap&lt;T&gt; = {
  [K in keyof T]: T[K] extends string ? number : T[K];
};

// 2. 过滤出函数属性
type FunctionProperties&lt;T&gt; = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

// 3. 根据条件修改属性
type StringToNumber&lt;T&gt; = {
  [K in keyof T]: T[K] extends string ? number : T[K];
};

// 4. 复杂组合
type ResponsiveProp&lt;T&gt; = T | T[] | { [key: string]: T };
type ResponsiveProps&lt;T&gt; = {
  [K in keyof T]: ResponsiveProp&lt;T[K]&gt;;
};

// 5. 递归映射与条件
type DeepPartial&lt;T&gt; = {
  [P in keyof T]?: T[P] extends object ? DeepPartial&lt;T[P]&gt; : T[P];
};</pre>

        <h3 class="sub-title">实用工具类型</h3>
        <div class="utility-grid">
          <div class="utility-card">
            <h4>OptionalByType</h4>
            <p>根据类型使属性可选</p>
            <pre class="small-code">type OptionalByType&lt;T, U&gt; = {
  [K in keyof T as T[K] extends U ? K : never]?: T[K];
} & {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};</pre>
          </div>
          <div class="utility-card">
            <h4>ValueOf</h4>
            <p>获取对象值的联合类型</p>
            <pre class="small-code">type ValueOf&lt;T&gt; = T[keyof T];</pre>
          </div>
          <div class="utility-card">
            <h4>ArgsType</h4>
            <p>获取函数参数类型</p>
            <pre class="small-code">type ArgsType&lt;T&gt; =
  T extends (...args: infer A) => any ? A : never;</pre>
          </div>
        </div>

        <h3 class="sub-title">复杂示例</h3>
        <pre class="code-block">// 1. 创建事件发射器类型
type EventMap = {
  click: { x: number; y: number };
  change: string;
};

type EventHandlers&lt;T&gt; = {
  [K in keyof T as `on${Capitalize&lt;string & K&gt;}`]: (
    arg: T[K]
  ) => void;
};

type MyEventHandlers = EventHandlers&lt;EventMap&gt;;
// {
//   onClick: (arg: { x: number; y: number }) => void;
//   onChange: (arg: string) => void;
// }

// 2. Redux reducer 类型
type Action&lt;T extends string, P&gt; = {
  type: T;
  payload: P;
};

type ActionCreator&lt;T extends string, P&gt; = (
  payload: P
) => Action&lt;T, P&gt;;

type ActionCreators&lt;T&gt; = {
  [K in keyof T]: T[K] extends undefined
    ? () => Action&lt;string & K, undefined&gt;
    : ActionCreator&lt;string & K, T[K]&gt;;
};</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. 最佳实践</h2>
      <div class="content">
        <div class="best-practice-grid">
          <div class="practice-card">
            <h4>映射类型最佳实践</h4>
            <ul>
              <li>优先使用内置映射类型(Readonly, Partial等)</li>
              <li>为复杂映射创建有意义的类型别名</li>
              <li>利用键名重映射(TypeScript 4.1+)简化代码</li>
              <li>注意递归深度的性能影响</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>条件类型最佳实践</h4>
            <ul>
              <li>利用分布式特性处理联合类型</li>
              <li>使用<code>infer</code>进行类型提取</li>
              <li>避免过度复杂的嵌套条件类型</li>
              <li>为复杂条件添加注释说明</li>
            </ul>
          </div>
        </div>

        <div class="notice-box success">
          <h4>实用技巧</h4>
          <ul>
            <li>组合使用<code>keyof</code>, <code>typeof</code>和条件类型</li>
            <li>使用<code>as</code>进行键名重映射过滤属性</li>
            <li>利用模板字面量类型转换键名</li>
            <li>结合泛型创建灵活的类型工具</li>
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

    &.success {
      background-color: #ebfbee;
      border-color: #40c057;
    }

    ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
    }
  }

  .builtin-types-grid,
  .utility-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin: 20px 0;

    .type-card,
    .utility-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #eee;

      h4 {
        margin-top: 0;
        color: #2c3e50;
        font-size: 0.95em;
      }

      p {
        color: #7f8c8d;
        font-size: 0.85em;
        margin: 8px 0;
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

    .builtin-types-grid,
    .utility-grid,
    .scenario-grid,
    .best-practice-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>