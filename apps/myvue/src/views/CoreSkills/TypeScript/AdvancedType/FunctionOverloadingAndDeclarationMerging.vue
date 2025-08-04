<template>
  <div class="types-doc">
    <h1 class="title">TypeScript 函数重载与声明合并</h1>

    <section class="section">
      <h2 class="section-title">1. 函数重载 (Function Overloads)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>函数重载允许一个函数接受不同数量或类型的参数，并根据不同的参数类型返回不同的结果类型。TypeScript 的函数重载需要在实现前提供多个函数类型声明。</p>

        <div class="notice-box info">
          <strong>特点：</strong>函数重载只在类型检查阶段有效，不会影响运行时行为
        </div>

        <h3 class="sub-title">基本语法</h3>
        <pre class="code-block">// 重载签名
function func(param1: Type1): ReturnType1;
function func(param1: Type1, param2: Type2): ReturnType2;

// 实现签名（必须兼容所有重载签名）
function func(param1: any, param2?: any): any {
  // 实现逻辑
}</pre>

        <h3 class="sub-title">示例代码</h3>
        <pre class="code-block">// 1. 不同参数数量
function createDate(timestamp: number): Date;
function createDate(year: number, month: number, day: number): Date;
function createDate(one: number, two?: number, three?: number): Date {
  if (two !== undefined && three !== undefined) {
    return new Date(one, two, three);
  } else {
    return new Date(one);
  }
}

// 2. 不同参数类型
function reverse(value: string): string;
function reverse(value: number): number;
function reverse(value: string | number): string | number {
  if (typeof value === "string") {
    return value.split("").reverse().join("");
  } else {
    return Number(value.toString().split("").reverse().join(""));
  }
}

// 3. 不同返回类型
function parseInput(input: string): string[];
function parseInput(input: number): number[];
function parseInput(input: string | number): string[] | number[] {
  if (typeof input === "string") {
    return input.split(",");
  } else {
    return input.toString().split("").map(Number);
  }
}</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>API 请求函数</h4>
            <p>处理不同参数组合的请求</p>
            <pre class="small-code">function request(url: string): Promise&lt;Response&gt;;
function request(options: RequestOptions): Promise&lt;Response&gt;;
function request(param: string | RequestOptions) {
  // 实现...
}</pre>
          </div>
          <div class="scenario-card">
            <h4>工具函数</h4>
            <p>处理多种输入类型的工具</p>
            <pre class="small-code">function format(data: Date): string;
function format(data: number, pattern: string): string;
function format(data: any, pattern?: string) {
  // 实现...
}</pre>
          </div>
          <div class="scenario-card">
            <h4>DOM 操作</h4>
            <p>根据选择器返回不同元素类型</p>
            <pre class="small-code">function query(selector: "#main"): HTMLElement | null;
function query(selector: ".btn"): NodeListOf&lt;HTMLButtonElement&gt;;
function query(selector: string) {
  // 实现...
}</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 声明合并 (Declaration Merging)</h2>
      <div class="content">
        <h3 class="sub-title">基本概念</h3>
        <p>声明合并是指 TypeScript 编译器将多个同名的声明合并为一个定义。这适用于接口、命名空间、函数和枚举。</p>

        <div class="notice-box info">
          <strong>合并规则：</strong>不同类型的声明有不同的合并规则，并非所有声明都能合并
        </div>

        <h3 class="sub-title">合并类型</h3>
        <div class="merge-types-grid">
          <div class="type-card">
            <h4>接口合并</h4>
            <p>相同名称的接口会自动合并</p>
            <pre class="small-code">interface User {
  name: string;
}

interface User {
  age: number;
}

// 合并为 { name: string; age: number }</pre>
          </div>
          <div class="type-card">
            <h4>命名空间合并</h4>
            <p>相同名称的命名空间会合并</p>
            <pre class="small-code">namespace Utils {
  export function log() {}
}

namespace Utils {
  export function warn() {}
}

// 合并后包含 log 和 warn 方法</pre>
          </div>
          <div class="type-card">
            <h4>函数合并</h4>
            <p>函数重载本质是函数声明合并</p>
            <pre class="small-code">function greet(name: string): string;
function greet(age: number): string;
function greet(param: any) {}</pre>
          </div>
          <div class="type-card">
            <h4>枚举合并</h4>
            <p>相同名称的枚举会合并</p>
            <pre class="small-code">enum Direction {
  Up = 1
}

enum Direction {
  Down = 2
}

// 合并为 { Up:1, Down:2 }</pre>
          </div>
        </div>

        <h3 class="sub-title">高级合并</h3>
        <pre class="code-block">// 1. 接口与命名空间合并
interface Person {
  name: string;
}

namespace Person {
  export function create(name: string): Person {
    return { name };
  }
}

// 2. 类与接口合并
class Student {
  name!: string;
}

interface Student {
  age: number;
}

// 3. 命名空间与函数合并
function Logger() {}
namespace Logger {
  export let level = "info";
}

// 4. 命名空间与枚举合并
enum Color {
  Red = "red"
}

namespace Color {
  export function hex(color: Color) {
    switch(color) {
      case Color.Red: return "#ff0000";
    }
  }
}</pre>

        <h3 class="sub-title">使用场景</h3>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h4>扩展第三方类型</h4>
            <p>为已有类型添加新属性</p>
            <pre class="small-code">// 扩展 window 对象
interface Window {
  myApp: any;
}</pre>
          </div>
          <div class="scenario-card">
            <h4>插件系统</h4>
            <p>为核心类添加静态方法</p>
            <pre class="small-code">class Core {}
namespace Core {
  export function plugin() {}
}</pre>
          </div>
          <div class="scenario-card">
            <h4>枚举增强</h4>
            <p>为枚举添加实用方法</p>
            <pre class="small-code">enum UserRole {
  Admin,
  User
}

namespace UserRole {
  export function isAdmin(role: UserRole) {
    return role === UserRole.Admin;
  }
}</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 最佳实践</h2>
      <div class="content">
        <div class="best-practice-grid">
          <div class="practice-card">
            <h4>函数重载最佳实践</h4>
            <ul>
              <li>从最具体到最宽泛排列重载签名</li>
              <li>保持实现签名兼容所有重载</li>
              <li>避免过多的重载（通常不超过5个）</li>
              <li>为复杂重载添加注释说明</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>声明合并最佳实践</h4>
            <ul>
              <li>谨慎使用接口合并，避免分散定义</li>
              <li>优先使用模块而非命名空间</li>
              <li>为扩展的全局声明添加明显标记</li>
              <li>避免过度使用合并导致代码难以理解</li>
            </ul>
          </div>
        </div>

        <div class="notice-box warning">
          <h4>注意事项</h4>
          <ul>
            <li>类型别名不能合并（与接口的主要区别）</li>
            <li>合并的属性类型必须兼容</li>
            <li>过度使用声明合并可能导致代码难以维护</li>
            <li>某些合并模式在现代TypeScript中可能不推荐</li>
          </ul>
        </div>

        <h3 class="sub-title">实用技巧</h3>
        <pre class="code-block">// 1. 使用联合类型替代部分重载
function format(input: string | number): string {
  return input.toString();
}

// 2. 使用泛型约束替代部分重载
function identity&lt;T extends string | number&gt;(arg: T): T {
  return arg;
}

// 3. 模块扩展替代部分声明合并
// user.ts
export interface User { name: string }

// user-extend.ts
declare module "./user" {
  export interface User { age: number }
}</pre>
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

  .merge-types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;

    .type-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #eee;

      h4 {
        margin-top: 0;
        color: #2c3e50;
        font-size: 0.95em;
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

    .merge-types-grid,
    .scenario-grid,
    .best-practice-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>