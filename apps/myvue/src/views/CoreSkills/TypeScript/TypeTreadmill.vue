<template>
  <div class="type-gymnastics-container">
    <header class="header">
      <h1>TypeScript 类型体操</h1>
      <p class="subtitle">探索类型系统的极限能力</p>
      <div class="meta-info">
        <span class="meta-item"> <i class="icon icon-difficulty"></i> 高级类型技巧 </span>
        <span class="meta-item"> <i class="icon icon-version"></i> TS 4.1+ </span>
        <span class="meta-item"> <i class="icon icon-app"></i> 实用类型操作 </span>
      </div>
    </header>

    <div class="content-grid">
      <!-- 介绍部分 -->
      <div class="intro-section card">
        <h2 class="section-title"><i class="icon icon-info"></i> 什么是类型体操？</h2>
        <div class="intro-content">
          <p>
            类型体操是指利用TypeScript的类型系统实现复杂的类型操作和转换，就像在类型层面上进行编程。
          </p>

          <div class="features-grid">
            <div class="feature">
              <div class="feature-icon">
                <i class="icon icon-type-safe"></i>
              </div>
              <h3>类型安全</h3>
              <p>在编译时捕获更多错误</p>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <i class="icon icon-flexible"></i>
              </div>
              <h3>灵活性</h3>
              <p>创建可复用的类型工具</p>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <i class="icon icon-intellisense"></i>
              </div>
              <h3>智能提示</h3>
              <p>提升开发者体验</p>
            </div>

            <div class="feature">
              <div class="feature-icon">
                <i class="icon icon-fun"></i>
              </div>
              <h3>挑战乐趣</h3>
              <p>探索类型系统的边界</p>
            </div>
          </div>

          <div class="why-learn">
            <h3><i class="icon icon-question"></i> 为什么要学习类型体操？</h3>
            <ul>
              <li>处理复杂数据结构和API响应类型</li>
              <li>创建更灵活、可复用的类型工具</li>
              <li>提高代码的类型安全性和可维护性</li>
              <li>解决第三方库类型定义不足的问题</li>
              <li>提升对TypeScript类型系统的理解</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 基础类型操作 -->
      <div class="basic-operations card">
        <h2 class="section-title"><i class="icon icon-basic"></i> 基础类型操作</h2>

        <div class="operation">
          <h3>条件类型 (Conditional Types)</h3>
          <div class="operation-content">
            <p>根据条件选择不同类型</p>
            <pre><code>type IsString&lt;T&gt; = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<42>;      // false</code></pre>
          </div>
        </div>

        <div class="operation">
          <h3>映射类型 (Mapped Types)</h3>
          <div class="operation-content">
            <p>基于现有类型创建新类型</p>
            <pre><code>type Readonly&lt;T&gt; = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly&lt;Person&gt;;
// { readonly name: string; readonly age: number; }</code></pre>
          </div>
        </div>

        <div class="operation">
          <h3>类型推断 (Type Inference)</h3>
          <div class="operation-content">
            <p>在条件类型中提取类型</p>
            <pre><code>type GetReturnType&lt;T&gt; =
  T extends (...args: any[]) => infer R ? R : never;

type Fn = () => number;
type R = GetReturnType&lt;Fn&gt;; // number</code></pre>
          </div>
        </div>
      </div>

      <!-- 实用类型体操 -->
      <div class="advanced-gymnastics card">
        <h2 class="section-title"><i class="icon icon-advanced"></i> 实用类型体操</h2>

        <div class="gymnastic">
          <h3>PartialByKeys - 按需可选</h3>
          <div class="gymnastic-content">
            <p>使指定属性变为可选</p>
            <pre><code>type PartialByKeys&lt;T, K extends keyof T&gt; =
  Omit&lt;T, K&gt; & Partial&lt;Pick&lt;T, K&gt;&gt;;

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserWithOptionalEmail = PartialByKeys&lt;User, 'email' | 'age'&gt;;
// { id: number; name: string; email?: string; age?: number; }</code></pre>
          </div>
        </div>

        <div class="gymnastic">
          <h3>DeepReadonly - 深度只读</h3>
          <div class="gymnastic-content">
            <p>递归设置所有属性为只读</p>
            <pre><code>type DeepReadonly&lt;T&gt; = {
  readonly [P in keyof T]:
    T[P] extends object ? DeepReadonly&lt;T[P]&gt; : T[P];
};

interface Company {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyCompany = DeepReadonly&lt;Company&gt;;
// {
//   readonly name: string;
//   readonly address: {
//     readonly street: string;
//     readonly city: string;
//   };
// }</code></pre>
          </div>
        </div>

        <div class="gymnastic">
          <h3>TupleToUnion - 元组转联合</h3>
          <div class="gymnastic-content">
            <p>将元组类型转换为联合类型</p>
            <pre><code>type TupleToUnion&lt;T extends any[]&gt; = T[number];

type Colors = ['red', 'green', 'blue'];
type Color = TupleToUnion&lt;Colors&gt;; // 'red' | 'green' | 'blue'</code></pre>
          </div>
        </div>

        <div class="gymnastic">
          <h3>StringToNumber - 字符串转数字</h3>
          <div class="gymnastic-content">
            <p>将字符串字面量类型转换为数字类型</p>
            <pre><code>type StringToNumber&lt;S extends string&gt; =
  S extends `${infer N extends number}` ? N : never;

type A = StringToNumber<'42'>;   // 42
type B = StringToNumber<'3.14'>; // 3.14</code></pre>
          </div>
        </div>
      </div>

      <!-- 高级体操 -->
      <div class="expert-gymnastics card">
        <h2 class="section-title"><i class="icon icon-expert"></i> 高级类型体操</h2>

        <div class="gymnastic">
          <h3>CurryFunction - 函数柯里化</h3>
          <div class="gymnastic-content">
            <p>为函数类型添加柯里化能力</p>
            <pre><code>type Curry&lt;F&gt; = F extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Rest]
    ? (arg: First) => Curry&lt;(...args: Rest) => R&gt;
    : R
  : never;

// 原始函数类型
type Add = (a: number, b: number, c: number) => number;

// 柯里化后的函数类型
type CurriedAdd = Curry&lt;Add&gt;;
// (arg: number) => (arg: number) => (arg: number) => number</code></pre>
          </div>
        </div>

        <div class="gymnastic">
          <h3>Path - 类型安全路径</h3>
          <div class="gymnastic-content">
            <p>获取对象深层属性的路径</p>
            <pre><code>type Path&lt;T&gt; =
  T extends object
    ? { [K in keyof T]:
        K extends string
          ? T[K] extends object
            ? K | `${K}.${Path&lt;T[K]&gt;}`
            : K
          : never
      }[keyof T]
    : never;

interface User {
  name: string;
  address: {
    street: string;
    zip: number;
  };
  orders: Array<{ id: number; total: number }>;
}

type UserPath = Path&lt;User&gt;;
// "name" | "address" | "orders" |
// "address.street" | "address.zip" |
// "orders.id" | "orders.total"</code></pre>
          </div>
        </div>

        <div class="gymnastic">
          <h3>ParseQueryString - 解析查询字符串</h3>
          <div class="gymnastic-content">
            <p>将查询字符串解析为对象类型</p>
            <pre><code>type ParseQueryString&lt;S extends string&gt; =
  S extends `${infer Param}&${infer Rest}`
    ? MergeParams&lt;ParseParam&lt;Param&gt;, ParseQueryString&lt;Rest&gt;&gt;
    : ParseParam&lt;S&gt;;

type ParseParam&lt;P extends string&gt; =
  P extends `${infer Key}=${infer Value}`
    ? { [K in Key]: Value }
    : {};

type MergeParams&lt;T1, T2&gt; = {
  [K in keyof T1 | keyof T2]:
    K extends keyof T1
      ? K extends keyof T2
        ? T1[K] | T2[K]
        : T1[K]
      : K extends keyof T2
        ? T2[K]
        : never;
};

type Result = ParseQueryString<'name=John&age=30&lang=ts&lang=js'&gt;;
// { name: "John"; age: "30"; lang: "ts" | "js"; }</code></pre>
          </div>
        </div>
      </div>

      <!-- 学习资源 -->
      <div class="resources card">
        <h2 class="section-title"><i class="icon icon-resources"></i> 学习资源</h2>

        <div class="resources-grid">
          <div class="resource">
            <h3><i class="icon icon-book"></i> Type Challenges</h3>
            <p>GitHub上的类型体操题库</p>
            <a href="https://github.com/type-challenges/type-challenges" target="_blank">
              访问仓库
            </a>
          </div>

          <div class="resource">
            <h3><i class="icon icon-docs"></i> TypeScript Deep Dive</h3>
            <p>深入理解TypeScript</p>
            <a href="https://basarat.gitbook.io/typescript/" target="_blank"> 阅读文档 </a>
          </div>

          <div class="resource">
            <h3><i class="icon icon-play"></i> Type-Level TypeScript</h3>
            <p>高级类型技巧课程</p>
            <a href="https://type-level-typescript.com/" target="_blank"> 开始学习 </a>
          </div>

          <div class="resource">
            <h3><i class="icon icon-utility"></i> Utility Types</h3>
            <p>官方工具类型文档</p>
            <a
              href="https://www.typescriptlang.org/docs/handbook/utility-types.html"
              target="_blank"
            >
              查看文档
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion card">
      <h2 class="section-title"><i class="icon icon-summary"></i> 类型体操要点总结</h2>
      <div class="conclusion-content">
        <ul>
          <li>
            掌握<strong>条件类型</strong>、<strong>映射类型</strong>和<strong>类型推断</strong>是基础
          </li>
          <li>使用<strong>递归类型</strong>处理嵌套数据结构</li>
          <li>利用<strong>模板字面量类型</strong>进行字符串操作</li>
          <li>通过<strong>分布式条件类型</strong>处理联合类型</li>
          <li>使用<strong>类型约束</strong>确保类型安全</li>
          <li>练习解决<strong>Type Challenges</strong>提升技能</li>
        </ul>
        <div class="quote">"类型体操是理解TypeScript类型系统深度和灵活性的最佳方式"</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置一些类型体操的实际类型定义
// 但请注意，模板中展示的代码字符串是为了展示
// 实际使用时需要取消注释

// 示例：PartialByKeys 类型实现
// type PartialByKeys<T, K extends keyof T> =
//   Omit<T, K> & Partial<Pick<T, K>>;

// 示例：DeepReadonly 类型实现
// type DeepReadonly<T> = {
//   readonly [P in keyof T]:
//     T[P] extends object ? DeepReadonly<T[P]> : T[P];
// };

// 示例：TupleToUnion 类型实现
// type TupleToUnion<T extends any[]> = T[number];
</script>

<style lang="less" scoped>
.type-gymnastics-container {
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
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #4f6af5 0%, #3aa9f5 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(79, 106, 245, 0.2);

    h1 {
      font-weight: 700;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-top: 0;
    }

    .meta-info {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.2rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.15);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;

        .icon {
          font-size: 1rem;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
    margin-bottom: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .section-title {
    background: #f8f9fa;
    margin: 0;
    padding: 1.2rem 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .icon {
      font-size: 1.2rem;
      color: #4f6af5;
    }
  }

  .intro-section {
    grid-column: 1 / -1;

    .intro-content {
      padding: 1.5rem;

      p {
        font-size: 1.05rem;
        margin-bottom: 1.5rem;
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;

      .feature {
        text-align: center;
        padding: 1.5rem 1rem;
        background: #f0f7ff;
        border-radius: 10px;
        border: 1px solid #dbeafe;

        .feature-icon {
          width: 60px;
          height: 60px;
          background: #4f6af5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;

          .icon {
            color: white;
            font-size: 1.8rem;
          }
        }

        h3 {
          margin: 0 0 0.5rem;
          color: #2c3e50;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 0.95rem;
        }
      }
    }

    .why-learn {
      background: #f9fafb;
      border-radius: 8px;
      padding: 1.5rem;
      border-left: 4px solid #4f6af5;

      h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0;
        font-size: 1.1rem;
        color: #2c3e50;
      }

      ul {
        padding-left: 1.5rem;
        margin: 1rem 0 0;

        li {
          margin-bottom: 0.7rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #4f6af5;
            font-weight: bold;
          }
        }
      }
    }
  }

  .basic-operations,
  .advanced-gymnastics,
  .expert-gymnastics {
    .operation,
    .gymnastic {
      padding: 1.2rem 1.5rem;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
        color: #2c3e50;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4f6af5;
          margin-right: 8px;
        }
      }

      .operation-content,
      .gymnastic-content {
        p {
          color: #555;
          margin: 0.5rem 0 1rem;
        }

        pre {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.2rem;
          overflow-x: auto;
          margin: 0.8rem 0;
          border: 1px solid #eaeaea;

          code {
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            color: #2d3748;

            // 增强代码可读性
            .token {
              &.keyword {
                color: #d73a49;
              }
              &.type {
                color: #6f42c1;
              }
              &.string {
                color: #032f62;
              }
              &.number {
                color: #005cc5;
              }
            }
          }
        }
      }
    }
  }

  .resources {
    .resources-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1.5rem;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .resource {
        padding: 1.2rem;
        background: #f9fafb;
        border-radius: 8px;
        border: 1px solid #eaeaea;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0;
          font-size: 1.1rem;
          color: #2c3e50;
        }

        p {
          color: #666;
          margin: 0.5rem 0;
          font-size: 0.95rem;
        }

        a {
          display: inline-block;
          margin-top: 0.5rem;
          color: #4f6af5;
          text-decoration: none;
          font-weight: 500;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .conclusion {
    grid-column: 1 / -1;

    .conclusion-content {
      padding: 1.5rem;

      ul {
        padding-left: 1.5rem;
        margin: 1rem 0;

        li {
          margin-bottom: 0.8rem;
          font-size: 1.05rem;

          strong {
            color: #4f6af5;
            font-weight: 600;
          }
        }
      }

      .quote {
        margin-top: 1.5rem;
        padding: 1.2rem;
        background: #f0f7ff;
        border-left: 4px solid #4f6af5;
        font-style: italic;
        color: #555;
        border-radius: 0 8px 8px 0;
      }
    }
  }
}

// 图标样式
.icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  &-difficulty::before {
    content: 'speed';
  }
  &-version::before {
    content: 'update';
  }
  &-app::before {
    content: 'widgets';
  }
  &-info::before {
    content: 'info';
  }
  &-basic::before {
    content: 'layers';
  }
  &-advanced::before {
    content: 'mediation';
  }
  &-expert::before {
    content: 'rocket_launch';
  }
  &-resources::before {
    content: 'menu_book';
  }
  &-summary::before {
    content: 'summarize';
  }
  &-type-safe::before {
    content: 'verified_user';
  }
  &-flexible::before {
    content: 'transform';
  }
  &-intellisense::before {
    content: 'auto_awesome';
  }
  &-fun::before {
    content: 'mood';
  }
  &-question::before {
    content: 'help';
  }
  &-book::before {
    content: 'book';
  }
  &-docs::before {
    content: 'description';
  }
  &-play::before {
    content: 'play_circle';
  }
  &-utility::before {
    content: 'build';
  }
}
</style>
