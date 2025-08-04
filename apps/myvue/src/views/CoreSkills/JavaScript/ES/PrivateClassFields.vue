<template>
  <div class="private-class-doc">
    <header class="doc-header">
      <h1>ES 私有类成员基本指南</h1>

    </header>
    <h3>私有类成员是 ECMAScript 提供的一种封装机制，允许开发者在类中定义私有字段和方法，确保这些成员无法被外部访问或修改。私有成员以 `#` 开头，提供了更强的封装性和数据保护。</h3>

    <main class="doc-content">
      <!-- 核心特性 -->
      <section class="section features">
        <h2>🔍 核心特性</h2>

        <div class="feature-grid">
          <div class="card">
            <h3># 私有字段</h3>
            <pre><code class="language-ts">class Counter {
  #count = 0;  // 私有字段

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}

const counter = new Counter();
counter.#count; // 编译错误</code></pre>
          </div>

          <div class="card">
            <h3># 私有方法</h3>
            <pre><code class="language-ts">class AuthService {
  #validateToken(token: string) {
    // 内部验证逻辑
  }

  login(token: string) {
    this.#validateToken(token);
  }
}

const auth = new AuthService();
auth.#validateToken(); // 编译错误</code></pre>
          </div>

          <div class="card">
            <h3>静态初始化块</h3>
            <pre><code class="language-ts">class Config {
  static #apiKey: string;

  static {
    try {
      this.#apiKey = process.env.API_KEY!;
    } catch {
      this.#apiKey = 'default-key';
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section use-cases">
        <h2>📌 典型应用场景</h2>

        <div class="case-grid">
          <div class="card">
            <h3>内部状态封装</h3>
            <pre><code class="language-ts">class ShoppingCart {
  #items: Product[] = [];

  addItem(item: Product) {
    this.#items.push(item);
  }

  checkout() {
    // 结账逻辑
  }
}</code></pre>
          </div>

          <div class="card">
            <h3>敏感方法保护</h3>
            <pre><code class="language-ts">class Database {
  #connectToServer() {
    // 数据库连接细节
  }

  constructor() {
    this.#connectToServer();
  }
}</code></pre>
          </div>

          <div class="card">
            <h3>复杂初始化</h3>
            <pre><code class="language-ts">class Logger {
  static #instance: Logger;

  static {
    this.#instance = new Logger();
  }

  static getInstance() {
    return this.#instance;
  }
}</code></pre>
          </div>

          <div class="card">
            <h3>缓存管理</h3>
            <pre><code class="language-ts">class CacheManager {
  #cache = new Map();
  #maxSize: number;

  constructor(maxSize: number) {
    this.#maxSize = maxSize;
  }

  set(key: string, value: any) {
    if(this.#cache.size >= this.#maxSize) {
      this.#cleanup();
    }
    this.#cache.set(key, value);
  }

  #cleanup() {
    // 清理过期缓存
  }
}</code></pre>
          </div>

          <div class="card">
            <h3>事件处理</h3>
            <pre><code class="language-ts">class EventEmitter {
  #listeners = new Map();

  #validateEventName(name: string) {
    if(!name) throw new Error('Event name required');
  }

  on(event: string, callback: Function) {
    this.#validateEventName(event);
    if(!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(callback);
  }
}</code></pre>
          </div>

          <div class="card">
            <h3>状态机实现</h3>
            <pre><code class="language-ts">class StateMachine {
  #state: string;
  #transitions = new Map();

  #validateTransition(from: string, to: string) {
    const allowed = this.#transitions.get(from);
    return allowed?.includes(to);
  }

  setState(newState: string) {
    if(this.#validateTransition(this.#state, newState)) {
      this.#state = newState;
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section considerations">
        <h2>⚠️ 重要注意事项</h2>

        <div class="warning-grid">
          <div class="warning">
            <h3>类型检查</h3>
            <pre><code class="language-json">// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true
  }
}</code></pre>
          </div>

          <div class="warning">
            <h3>运行时保护</h3>
            <pre><code class="language-ts">class Test {
  #secret = 42;
}

const test = new Test();
console.log(test['#secret']); // undefined</code></pre>
          </div>

          <div class="warning">
            <h3>继承限制</h3>
            <pre><code class="language-ts">class Parent {
  #privateField = 1;
}

class Child extends Parent {
  // 无法访问父类的 #privateField
}</code></pre>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.language-ts {
  color: #fff;
}

.private-class-doc {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
}

.doc-header {
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 1.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.section {
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #42b883;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.feature-grid,
.case-grid,
.warning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.card {
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
  border-left: 4px solid #42b883;
}

.warning {
  background: #fff5f5;
  border-left: 4px solid #ff6b6b;
  padding: 1.5rem;
}

pre {
  background: #1e1e1e !important;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.example pre {
  margin-top: 1rem;
}

@media (max-width: 768px) {

  .feature-grid,
  .case-grid,
  .warning-grid {
    grid-template-columns: 1fr;
  }
}
</style>
