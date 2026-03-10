<template>
  <div class="types-doc">
    <h1 class="title">TypeScript 索引访问类型与动态扩展对象</h1>

    <section class="section">
      <h2 class="section-title">1. 索引访问类型 (Index Access Types)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>索引访问类型允许我们通过索引操作符 <code>T[K]</code> 来获取类型的特定属性类型，类似于 JavaScript 中的属性访问，但在类型层面操作。</p>

        <div class="notice-box info">
          <strong>核心语法：</strong> <code>T[K]</code> 其中 K 必须是 T 的键名或键名的联合类型
        </div>

        <h3 class="sub-title">基本用法</h3>
        <pre class="code-block">interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    zipCode: string;
  };
}

// 获取单个属性类型
type NameType = Person["name"];  // string
type AgeType = Person["age"];   // number

// 获取嵌套属性类型
type CityType = Person["address"]["city"];  // string

// 使用联合类型获取多个属性类型
type NameOrAge = Person["name" | "age"];  // string | number

// 结合 keyof 获取所有属性类型
type AllValues = Person[keyof Person];  // string | number | { city: string; zipCode: string }</pre>

        <h3 class="sub-title">高级用法</h3>
        <pre class="code-block">// 1. 动态属性访问函数
function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}

// 2. 映射类型中的使用
type Nullable&lt;T&gt; = {
  [K in keyof T]: T[K] | null;
};

// 3. 条件类型中的属性访问
type StringProperties&lt;T&gt; = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];  // 获取所有string类型属性的键名

// 4. 递归访问嵌套类型
type DeepReadonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly&lt;T[K]&gt; : T[K];
};</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>类型安全的数据访问</h4>
            <p>创建通用的属性访问函数</p>
            <pre class="small-code">function pluck&lt;T, K extends keyof T&gt;(
  items: T[],
  key: K
): T[K][] {
  return items.map(item => item[key]);
}</pre>
          </div>
          <div class="scenario-card">
            <h4>表单验证</h4>
            <p>根据属性类型应用不同验证规则</p>
            <pre class="small-code">type Validator&lt;T&gt; = {
  [K in keyof T]: (value: T[K]) => boolean;
};</pre>
          </div>
          <div class="scenario-card">
            <h4>API响应处理</h4>
            <p>提取嵌套数据结构的类型</p>
            <pre class="small-code">type ApiResponse = {
  data: {
    user: {
      id: string;
      profile: {
        name: string;
      };
    };
  };
};

type UserName = ApiResponse["data"]["user"]["profile"]["name"];</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 动态扩展对象</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>TypeScript 提供了几种方式来处理动态扩展的对象，包括索引签名、映射类型和交叉类型等。</p>

        <h3 class="sub-title">索引签名 (Index Signatures)</h3>
        <pre class="code-block">// 1. 字符串索引签名
interface StringDictionary {
  [key: string]: number;
}

const scores: StringDictionary = {
  math: 90,
  english: 85,
  // science: "A"  // 错误，必须是number类型
};

// 2. 数字索引签名
interface NumberDictionary {
  [index: number]: string;
}

const names: NumberDictionary = {
  1: "Alice",
  2: "Bob"
};

// 3. 混合索引签名
interface MixedDictionary {
  [key: string]: any;
  [index: number]: string;
  name: string;  // 必须与索引签名类型兼容
}</pre>

        <h3 class="sub-title">Record 工具类型</h3>
        <pre class="code-block">// 1. 基本用法
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type DayInfo = Record&lt;Weekday, { open: boolean }&gt;;

const schedule: DayInfo = {
  Mon: { open: true },
  Tue: { open: true },
  // ...
};

// 2. 动态键名
type DynamicObject = Record&lt;string, number&gt;;

const stats: DynamicObject = {
  views: 1000,
  clicks: 50
};</pre>

        <h3 class="sub-title">动态扩展模式</h3>
        <pre class="code-block">// 1. 交叉类型扩展
interface Base {
  id: string;
}

type Extended&lt;T&gt; = T & {
  [key: string]: any;
};

const user: Extended&lt;Base&gt; = {
  id: "123",
  name: "Alice",  // 动态添加的属性
  age: 30
};

// 2. 条件扩展
type DynamicExtend&lt;T, K extends string&gt; = T & {
  [P in K]: P extends keyof T ? T[P] : string;
};

type User = DynamicExtend&lt;Base, 'name' | 'age'&gt;;

// 3. 使用泛型约束
function mergeObjects&lt;T, U&gt;(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>配置对象</h4>
            <p>处理具有动态键的配置</p>
            <pre class="small-code">type FeatureFlags = Record&lt;string, boolean&gt;;

const flags: FeatureFlags = {
  darkMode: true,
  newDashboard: false
};</pre>
          </div>
          <div class="scenario-card">
            <h4>国际化</h4>
            <p>多语言键值映射</p>
            <pre class="small-code">type Translations = {
  [lang: string]: {
    [key: string]: string;
  };
};</pre>
          </div>
          <div class="scenario-card">
            <h4>插件系统</h4>
            <p>动态扩展核心对象</p>
            <pre class="small-code">interface Core {
  version: string;
}

type Plugin = {
  install(core: Core & Record&lt;string, any&gt;): void;
};</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 组合应用</h2>
      <div class="content">
        <h3 class="sub-title">索引访问与动态扩展的结合</h3>
        <pre class="code-block">// 1. 动态表单验证
type FormFields = {
  email: string;
  password: string;
  remember: boolean;
};

type Validators = {
  [K in keyof FormFields]: (value: FormFields[K]) => boolean;
};

const validators: Validators = {
  email: (val) => val.includes('@'),
  password: (val) => val.length >= 8,
  remember: (val) => typeof val === 'boolean'
};

// 2. 动态API响应处理
type ApiResponse&lt;T extends Record&lt;string, any&gt;&gt; = {
  data: {
    [K in keyof T]: T[K];
  };
  meta: {
    timestamp: number;
    [key: string]: any;  // 动态元数据
  };
};

// 3. 高级工具类型
type DynamicAccess&lt;T, K extends string&gt; = {
  [P in K]: P extends keyof T ? T[P] : never;
};

type UserAccess = DynamicAccess&lt;User, 'name' | 'age' | 'role'&gt;;</pre>

        <h3 class="sub-title">实际应用示例</h3>
        <div class="example-grid">
          <div class="example-card">
            <h4>状态管理</h4>
            <pre class="small-code">type State = {
  user: {
    name: string;
    preferences: Record&lt;string, any&gt;;
  };
  [module: string]: any;  // 动态模块
};</pre>
          </div>
          <div class="example-card">
            <h4>动态路由</h4>
            <pre class="small-code">type RouteParams = {
  [param: string]: string | number;
};

function createRoute&lt;T extends RouteParams&gt;(
  path: string,
  params: T
) {
  // 实现...
}</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. 最佳实践</h2>
      <div class="content">
        <div class="best-practice-grid">
          <div class="practice-card">
            <h4>索引访问最佳实践</h4>
            <ul>
              <li>优先使用 <code>keyof</code> 约束泛型参数</li>
              <li>为复杂访问路径创建类型别名</li>
              <li>结合条件类型进行安全访问</li>
              <li>避免过度嵌套的索引访问</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>动态扩展最佳实践</h4>
            <ul>
              <li>明确区分已知属性和动态属性</li>
              <li>使用 <code>Record</code> 类型处理纯动态对象</li>
              <li>为动态属性添加合理的类型约束</li>
              <li>考虑使用泛型提高灵活性</li>
            </ul>
          </div>
        </div>

        <div class="notice-box warning">
          <h4>注意事项</h4>
          <ul>
            <li>动态扩展会降低类型安全性，需谨慎使用</li>
            <li>避免滥用 <code>any</code> 类型</li>
            <li>复杂的动态类型可能影响编译性能</li>
            <li>为动态属性添加清晰的文档说明</li>
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

    h4 {
      margin-top: 0;
    }

    ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
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

  .example-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .example-card {
      padding: 15px;
      background: #f0f7ff;
      border-radius: 6px;
      border: 1px solid #d0e3ff;

      h4 {
        margin-top: 0;
        color: #2980b9;
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

    .scenario-grid,
    .example-grid,
    .best-practice-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>