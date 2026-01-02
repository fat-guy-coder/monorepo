<template>
  <div class="type-alias-doc">
    <h1 class="title">TypeScript 类型别名基础介绍</h1>

    <section class="section">
      <h2 class="section-title">1. 基本概念</h2>
      <div class="content">
        <p class="intro-text">
          类型别名（Type Aliases）是 TypeScript 中为类型创建新名称的一种方式。它允许你使用 <code>type</code> 关键字给任何类型命名，使代码更易读和维护。
        </p>

        <div class="notice-box info">
          <strong>特点：</strong>类型别名不会创建新类型，只是为现有类型提供一个新名称
        </div>

        <h3 class="sub-title">基本语法</h3>
        <pre class="code-block">type AliasName = ExistingType;</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">2. 基本用法</h2>
      <div class="content">
        <h3 class="sub-title">简单类型别名</h3>
        <pre class="code-block">// 基本类型
type ID = string | number;

// 对象类型
type User = {
  id: ID;
  name: string;
  age: number;
};

// 函数类型
type Callback = (data: string) => void;</pre>

        <h3 class="sub-title">与接口的对比</h3>
        <div class="comparison-grid">
          <div class="comparison-card">
            <h4>类型别名</h4>
            <ul>
              <li>使用 <code>type</code> 关键字定义</li>
              <li>可以表示任何类型</li>
              <li>不能重复声明</li>
              <li>支持联合、交叉等复杂类型</li>
            </ul>
          </div>
          <div class="comparison-card">
            <h4>接口</h4>
            <ul>
              <li>使用 <code>interface</code> 关键字定义</li>
              <li>主要用于对象类型</li>
              <li>可以重复声明并合并</li>
              <li>支持继承</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. 高级用法</h2>
      <div class="content">
        <h3 class="sub-title">联合类型</h3>
        <pre class="code-block">type Status = 'active' | 'inactive' | 'pending';

type Result&lt;T&gt; =
  | { success: true; data: T }
  | { success: false; error: string };</pre>

        <h3 class="sub-title">交叉类型</h3>
        <pre class="code-block">type Named = { name: string };
type Aged = { age: number };

type Person = Named & Aged;
// { name: string; age: number }</pre>

        <h3 class="sub-title">泛型类型别名</h3>
        <pre class="code-block">type ApiResponse&lt;T&gt; = {
  data: T;
  status: number;
  message?: string;
};

type Paginated&lt;T&gt; = {
  items: T[];
  total: number;
  page: number;
};</pre>

        <h3 class="sub-title">模板字面量类型</h3>
        <pre class="code-block">type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ApiEndpoint = `/api/${string}`;

type EventName = `on${Capitalize&lt;'click' | 'change'&gt;}`;
// "onClick" | "onChange"</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. 实用示例</h2>
      <div class="content">
        <h3 class="sub-title">React 组件 Props</h3>
        <pre class="code-block">type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};</pre>

        <h3 class="sub-title">Redux 状态管理</h3>
        <pre class="code-block">type UserState = {
  data: User | null;
  loading: boolean;
  error: string | null;
};

type AppState = {
  user: UserState;
  posts: Post[];
  settings: Settings;
};</pre>

        <h3 class="sub-title">API 响应处理</h3>
        <pre class="code-block">type ApiResult&lt;T&gt; = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
};

type PaginatedData&lt;T&gt; = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
};</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">5. 最佳实践</h2>
      <div class="content">
        <div class="best-practice-grid">
          <div class="practice-card">
            <h4>命名规范</h4>
            <ul>
              <li>使用 PascalCase 命名类型别名</li>
              <li>描述性名称（避免简单的 <code>Data</code>, <code>Info</code>）</li>
              <li>对于布尔属性，使用 <code>is</code>, <code>has</code> 前缀</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>组织方式</h4>
            <ul>
              <li>将相关类型分组在同一个文件中</li>
              <li>为复杂类型添加注释说明</li>
              <li>优先使用类型别名而非内联类型</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>性能考虑</h4>
            <ul>
              <li>避免过度嵌套的类型别名</li>
              <li>对于大型对象，考虑使用接口</li>
              <li>使用工具类型简化复杂类型</li>
            </ul>
          </div>
        </div>

        <div class="notice-box tip">
          <h4>实用技巧</h4>
          <ul>
            <li>使用 <code>typeof</code> 从值创建类型</li>
            <li>结合 <code>keyof</code> 和 <code>typeof</code> 获取对象键类型</li>
            <li>利用模板字面量类型创建模式匹配类型</li>
            <li>使用条件类型创建灵活的类型工具</li>
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
.type-alias-doc {
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

  .intro-text {
    font-size: 1.1em;
    line-height: 1.8;
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

  .notice-box {
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    border-left: 4px solid;

    &.info {
      background-color: #e7f5fe;
      border-color: #3498db;
    }

    &.tip {
      background-color: #ebfbee;
      border-color: #40c057;
    }

    h4 {
      margin-top: 0;
    }

    ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
    }
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;

    .comparison-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #eee;

      h4 {
        margin-top: 0;
        color: #2c3e50;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }

      ul {
        padding-left: 20px;
      }
    }
  }

  .best-practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  .type-alias-doc {
    padding: 10px;

    .section {
      padding: 15px;
    }

    .comparison-grid,
    .best-practice-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
