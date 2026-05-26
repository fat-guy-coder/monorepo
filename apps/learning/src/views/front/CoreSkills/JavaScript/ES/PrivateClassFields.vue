<template>
  <div class="private-container">
    <!-- 头部标题区 -->
    <header class="private-header">
      <div class="header-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div class="header-text">
        <h1 class="title">类私有属性</h1>
        <p class="subtitle">ES2022 Class Private Fields — 真正的硬封装</p>
      </div>
    </header>

    <!-- 简介卡片 -->
    <section class="card intro-card">
      <h2 class="card-title">
        <span class="card-title-icon">🔒</span>
        什么是类私有属性？
      </h2>
      <p class="card-desc">
        类私有属性（Class Private Fields）是 ES2022 引入的<strong>运行时强私有</strong>成员。
        通过在属性或方法名前添加 <code class="inline-code">#</code> 前缀，就能将其限制在<strong>类体内部</strong>访问，外部完全无法触及。
      </p>
      <div class="highlight-box">
        <span class="highlight-label">核心优势</span>
        与 TypeScript 的 <code class="inline-code">private</code> 关键字不同，<code class="inline-code">#</code>
        提供的是<strong>真正的运行时隔离</strong>，编译后依然无法从外部突破，安全性更高。
      </div>
    </section>

    <!-- 语法卡片 -->
    <section class="card syntax-card">
      <h2 class="card-title">
        <span class="card-title-icon">✏️</span>
        基本语法
      </h2>
      <div class="code-block">
        <pre><code><span class="token-comment">// 声明私有属性</span>
<span class="token-keyword">class</span> <span class="token-class">User</span> {
  <span class="token-private">#name</span>;          <span class="token-comment">// 私有实例属性</span>
  <span class="token-keyword">static</span> <span class="token-private">#count</span> = 0; <span class="token-comment">// 静态私有属性</span>

  <span class="token-keyword">constructor</span>(<span class="token-param">name</span>) {
    <span class="token-keyword">this</span>.<span class="token-private">#name</span> = name;
    <span class="token-keyword">User</span>.<span class="token-private">#count</span>++;
  }

  <span class="token-comment">// 私有方法</span>
  <span class="token-private">#format</span>() {
    <span class="token-keyword">return</span> <span class="token-string">`[User: </span><span class="token-interpolation">${this.#name}</span><span class="token-string">]`</span>;
  }

  <span class="token-comment">// 通过公共方法暴露私有数据</span>
  <span class="token-method">getInfo</span>() {
    <span class="token-keyword">return</span> <span class="token-keyword">this</span>.<span class="token-private">#format</span>();
  }
}

<span class="token-keyword">const</span> u = <span class="token-keyword">new</span> <span class="token-class">User</span>(<span class="token-string">'Alice'</span>);
<span class="token-comment">// u.#name;   ❌ 语法错误</span>
<span class="token-comment">// u.#format(); ❌ 外部不可见</span>
console.<span class="token-method">log</span>(u.<span class="token-method">getInfo</span>()); <span class="token-comment">// ✅ [User: Alice]</span></code></pre>
      </div>
      <p class="card-note">
        <code class="inline-code">#</code>
        是名称的一部分，因此无法通过<strong>方括号动态访问</strong>或<strong>在子类中覆盖</strong>，每个类都有自己独立的私有作用域。
      </p>
    </section>

    <!-- 核心特性卡片 -->
    <section class="card features-card">
      <h2 class="card-title">
        <span class="card-title-icon">⚙️</span>
        支持的成员类型
      </h2>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-badge badge-field">字段</div>
          <code class="feature-name">#instanceField</code>
          <p class="feature-desc">实例私有属性，必须在类体顶部声明，或通过赋值自动声明（strict 模式推荐显式声明）。</p>
        </div>
        <div class="feature-item">
          <div class="feature-badge badge-static">静态</div>
          <code class="feature-name">static #field</code>
          <p class="feature-desc">静态私有属性，属于类本身，在类的外部同样完全不可访问。</p>
        </div>
        <div class="feature-item">
          <div class="feature-badge badge-method">方法</div>
          <code class="feature-name">#method() {}</code>
          <p class="feature-desc">私有方法，只能在类内部被调用，外部和子类均无法获取或覆盖。</p>
        </div>
        <div class="feature-item">
          <div class="feature-badge badge-accessor">存取器</div>
          <code class="feature-name">get #prop() {}</code>
          <p class="feature-desc">私有 getter/setter，提供对私有数据的内部控制逻辑，但入口依然是私有的。</p>
        </div>
      </div>
    </section>

    <!-- 使用场景卡片 -->
    <section class="card usage-card">
      <h2 class="card-title">
        <span class="card-title-icon">💼</span>
        典型使用场景
      </h2>
      <ul class="usage-list">
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>封装内部状态</strong>
            <p>将敏感数据（如密码哈希、内部计数器）彻底隐藏，仅通过受控方法暴露必要的操作。</p>
          </div>
        </li>
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>避免属性名冲突</strong>
            <p><code class="inline-code">#</code> 字段不会与子类或混入（Mixin）中的同名公共属性冲突，每个类的私有空间完全独立。</p>
          </div>
        </li>
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>实现高安全性的框架 API</strong>
            <p>框架或库的核心模块可将实现细节标记为私有，防止用户意外依赖内部 API，保证未来重构自由。</p>
          </div>
        </li>
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>替代 WeakMap 方案</strong>
            <p>过去为了模拟私有属性，常使用 WeakMap + 闭包，语法繁琐且有性能开销；<code class="inline-code">#</code> 提供了原生且更高效的选择。</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- 代码示例卡片（带标签切换） -->
    <section class="card example-card">
      <h2 class="card-title">
        <span class="card-title-icon">🧪</span>
        进阶代码示例
      </h2>
      <div class="example-tabs">
        <div v-for="tab in examples" :key="tab.label" class="example-tab"
          :class="{ active: activeExample === tab.label }" @click="activeExample = tab.label">
          {{ tab.label }}
        </div>
      </div>
      <div class="code-block large-code">
        <pre><code>{{ currentExample.code }}</code></pre>
      </div>
    </section>

    <!-- 注意事项卡片 -->
    <footer class="card warning-card">
      <h2 class="card-title">
        <span class="card-title-icon">⚠️</span>
        注意事项与 TS 对比
      </h2>
      <div class="warning-list">
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>TypeScript 的 <code class="inline-code">private</code> 仅在编译期检查，运行时依然可被访问；<code
              class="inline-code">#</code> 是 <strong>运行时的强私有</strong>。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>不能通过 <code class="inline-code">this['#name']</code> 或 <code class="inline-code">Proxy</code>
            捕获私有字段，引擎会抛出 <strong>TypeError</strong>。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>私有字段无法在子类中直接访问，除非父类提供了暴露它们的内部方法。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>目前 <code class="inline-code">#</code> 私有字段无法与 <code class="inline-code">JSON.stringify</code> 或 <code
              class="inline-code">Object.keys</code> 等序列化方法配合，需手动处理。</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 当前选中的代码示例标签
const activeExample = ref<string>('计数器')

// 代码示例数据
interface ExampleItem {
  label: string
  code: string
}

const examples: ExampleItem[] = [
  {
    label: '计数器',
    code: `// 🔢 安全的计数器 —— 内部计数不可篡改
class Counter {
  #value = 0;

  increment() {
    return ++this.#value;
  }

  decrement() {
    if (this.#value <= 0) return 0;
    return --this.#value;
  }

  get current() {
    return this.#value;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
console.log(counter.current); // 2
// counter.#value = 100; // ❌ SyntaxError`
  },
  {
    label: '请求封装',
    code: `// 🌐 API 请求封装 —— 隐藏 token 与内部校验逻辑
class ApiClient {
  #token = '';

  constructor(token: string) {
    this.#token = token;
  }

  #validateResponse(response: Response) {
    if (!response.ok) {
      throw new Error(\`请求失败: \${response.status}\`);
    }
    return response.json();
  }

  async fetchUser(id: string) {
    const res = await fetch(\`/api/users/\${id}\`, {
      headers: { Authorization: \`Bearer \${this.#token}\` }
    });
    return this.#validateResponse(res);
  }
}

// 外部只能调用 fetchUser，无法访问 #token 和 #validateResponse`
  },
  {
    label: '静态工厂',
    code: `// 🏭 静态工厂 + 私有构造函数技巧
class Database {
  static #instance: Database | null = null;
  #connected = false;

  // 公共静态方法创建单例
  static connect(uri: string) {
    if (!Database.#instance) {
      const db = new Database();
      db.#connectInternal(uri);
      Database.#instance = db;
    }
    return Database.#instance;
  }

  #connectInternal(uri: string) {
    // 模拟连接逻辑
    this.#connected = true;
    console.log(\`已连接到 \${uri}\`);
  }

  get status() {
    return this.#connected ? '已连接' : '未连接';
  }
}

const db = Database.connect('mongodb://localhost');
console.log(db.status); // 已连接
// Database.#instance; // ❌ 不可访问`
  },
  {
    label: 'Mixin 安全',
    code: `// 🧬 使用私有字段避免 Mixin 冲突
const TimestampMixin = (Base: any) => class extends Base {
  #createdAt = Date.now();

  getCreatedAt() {
    return this.#createdAt;
  }
};

const LogMixin = (Base: any) => class extends Base {
  #logLevel = 'info';

  log(message: string) {
    if (this.#logLevel === 'debug') {
      console.debug(message);
    }
  }
};

class MyService extends LogMixin(TimestampMixin(Object)) {}

const s = new MyService();
s.log('服务启动');
console.log(s.getCreatedAt());
// 两个 Mixin 的 #createdAt 和 #logLevel 完全隔离，互不干扰`
  }
]

// 当前展示的示例
const currentExample = computed<ExampleItem>(() => {
  return examples.find((e) => e.label === activeExample.value) ?? examples[0]
})
</script>

<style lang="less" scoped>
// ========== 变量定义 ==========
@bg-primary: #fafbfc;
@bg-card: #ffffff;
@text-primary: #1a1a2e;
@text-secondary: #5a6070;
@text-muted: #8b919e;
@accent: #e55c5c;
@accent-light: #fdf2f2;
@accent-glow: rgba(229, 92, 92, 0.08);
@border: #e8ecf1;
@border-light: #f0f2f5;
@shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03);
@shadow-md: 0 4px 16px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.03);
@radius-lg: 16px;
@radius-md: 12px;
@radius-sm: 8px;
@transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

// ========== 全局容器 ==========
.private-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  color: @text-primary;
  line-height: 1.7;
  background: @bg-primary;
  min-height: 100vh;
}

// ========== 头部 ==========
.private-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 36px;
  padding: 28px 32px;
  background: @bg-card;
  border-radius: @radius-lg;
  box-shadow: @shadow-md;
  border: 1px solid @border-light;

  .header-icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @accent-light;
    border-radius: @radius-md;
    color: @accent;
    flex-shrink: 0;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  .header-text {
    .title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, @accent 0%, #d44f4f 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      margin: 4px 0 0;
      font-size: 0.95rem;
      color: @text-secondary;
      font-weight: 400;
    }
  }
}

// ========== 卡片通用 ==========
.card {
  background: @bg-card;
  border-radius: @radius-lg;
  padding: 28px 30px;
  margin-bottom: 20px;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: box-shadow @transition;

  &:hover {
    box-shadow: @shadow-md;
  }
}

.card-title {
  font-size: 1.15rem;
  font-weight: 650;
  margin: 0 0 16px;
  color: @text-primary;
  display: flex;
  align-items: center;
  gap: 10px;

  .card-title-icon {
    font-size: 1.3rem;
    line-height: 1;
  }
}

.card-desc {
  margin: 0 0 14px;
  color: @text-secondary;
  font-size: 0.95rem;
}

.card-note {
  margin: 12px 0 0;
  font-size: 0.88rem;
  color: @text-muted;
}

// ========== 行内代码 ==========
.inline-code {
  background: #f4f5f8;
  color: #c64b4b;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.9em;
  font-weight: 500;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
}

// ========== 高亮提示框 ==========
.highlight-box {
  background: @accent-light;
  border-left: 3px solid @accent;
  padding: 12px 16px;
  border-radius: @radius-sm;
  font-size: 0.9rem;
  color: @text-primary;
  line-height: 1.6;

  .highlight-label {
    display: inline-block;
    background: @accent;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 20px;
    margin-right: 8px;
    vertical-align: middle;
  }
}

// ========== 代码块 ==========
.code-block {
  background: #1e1e2e;
  border-radius: @radius-md;
  padding: 18px 20px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  font-size: 0.88rem;
  line-height: 1.75;

  pre {
    margin: 0;
  }

  code {
    color: #cdd6f4;
  }

  .token-comment {
    color: #6c7086;
  }

  .token-keyword {
    color: #cba6f7;
  }

  .token-class {
    color: #f9e2af;
  }

  .token-private {
    color: #f38ba8;
    font-weight: 600;
  }

  .token-method {
    color: #a6e3a1;
  }

  .token-string {
    color: #a6e3a1;
  }

  .token-interpolation {
    color: #fab387;
  }

  .token-param {
    color: #fab387;
  }

  &.large-code {
    min-height: 150px;
    max-height: 320px;
    overflow-y: auto;
  }
}

// ========== 特性网格 ==========
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  background: #fafbfc;
  border-radius: @radius-md;
  padding: 18px 20px;
  border: 1px solid @border-light;
  transition: border-color @transition;

  &:hover {
    border-color: @accent;
  }

  .feature-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 12px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.03em;

    &.badge-field {
      background: #eef1fe;
      color: #4f6ef7;
    }

    &.badge-static {
      background: #fef7e6;
      color: #b45f06;
    }

    &.badge-method {
      background: #e6f7e6;
      color: #2e7d32;
    }

    &.badge-accessor {
      background: #fce4ec;
      color: #c62828;
    }
  }

  .feature-name {
    display: block;
    font-weight: 650;
    font-size: 0.95rem;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    color: @text-primary;
    margin-bottom: 6px;
  }

  .feature-desc {
    margin: 0;
    font-size: 0.86rem;
    color: @text-secondary;
    line-height: 1.6;
  }
}

// ========== 使用场景列表 ==========
.usage-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.usage-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 16px;
  background: #fafbfc;
  border-radius: @radius-sm;
  border: 1px solid @border-light;
  transition: border-color @transition;

  &:hover {
    border-color: @accent;
  }

  .usage-marker {
    width: 8px;
    height: 8px;
    background: @accent;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px;
  }

  strong {
    display: block;
    font-size: 0.93rem;
    color: @text-primary;
    margin-bottom: 2px;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: @text-secondary;
  }
}

// ========== 示例标签切换 ==========
.example-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.example-tab {
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  background: #f4f5f8;
  color: @text-secondary;
  transition: all @transition;
  user-select: none;
  border: 1px solid transparent;

  &:hover {
    background: @accent-light;
    color: @accent;
  }

  &.active {
    background: @accent;
    color: #fff;
    box-shadow: 0 2px 8px rgba(229, 92, 92, 0.3);
  }
}

// ========== 注意事项 ==========
.warning-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.warning-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 0.9rem;
  color: @text-secondary;
  line-height: 1.6;
  padding: 10px 14px;
  background: #fff8f0;
  border-radius: @radius-sm;
  border: 1px solid #f5d8a8;

  .warning-dot {
    width: 6px;
    height: 6px;
    background: #d97706;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px;
  }
}

.warning-card {
  border-left: 3px solid #f0b040;
}

// ========== 滚动条美化 ==========
.code-block.large-code::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.code-block.large-code::-webkit-scrollbar-track {
  background: transparent;
}

.code-block.large-code::-webkit-scrollbar-thumb {
  background: #3b3b52;
  border-radius: 10px;
}

// ========== 全局 ==========
* {
  box-sizing: border-box;
}
</style>
