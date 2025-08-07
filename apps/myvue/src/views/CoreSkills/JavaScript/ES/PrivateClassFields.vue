<template>
  <div class="private-fields-container">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1 class="main-title">🔒 Class 私有字段详解</h1>
      <p class="subtitle">ES2022 私有类成员与封装机制</p>
    </header>

    <!-- 内容主体 -->
    <main class="content-main">
      <!-- 概念介绍 -->
      <section class="concept-section">
        <div class="section-header">
          <h2>📖 概念介绍</h2>
          <div class="title-decoration"></div>
        </div>

        <div class="concept-content">
          <p class="concept-text">
            私有类字段是 ES2022 引入的新特性，使用 <code>#</code> 符号来声明私有成员。
            私有字段提供了真正的封装性，确保这些成员无法在类外部被访问或修改。
          </p>

          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">🔒</div>
              <h3>真正的私有性</h3>
              <p>使用 # 声明的字段在运行时真正私有，无法通过反射或其他方式访问</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">⚡</div>
              <h3>性能优化</h3>
              <p>私有字段在引擎层面得到优化，访问性能更好</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🛡️</div>
              <h3>类型安全</h3>
              <p>TypeScript 提供完整的类型检查和智能提示</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 基本语法 -->
      <section class="syntax-section">
        <div class="section-header">
          <h2>🔧 基本语法</h2>
          <div class="title-decoration"></div>
        </div>

        <div class="syntax-grid">
          <div class="syntax-card">
            <h3>私有字段声明</h3>
            <pre><code>class User {
  #id: number;
  #name: string;
  #email: string;

  constructor(id: number, name: string, email: string) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email
    };
  }
}</code></pre>
          </div>

          <div class="syntax-card">
            <h3>私有方法</h3>
            <pre><code>class BankAccount {
  #balance: number = 0;

  #validateAmount(amount: number): boolean {
    return amount > 0 && Number.isFinite(amount);
  }

  #updateBalance(amount: number) {
    if (this.#validateAmount(amount)) {
      this.#balance += amount;
    }
  }

  deposit(amount: number) {
    this.#updateBalance(amount);
  }

  getBalance(): number {
    return this.#balance;
  }
}</code></pre>
          </div>

          <div class="syntax-card">
            <h3>静态私有字段</h3>
            <pre><code>class Config {
  static #apiKey: string;
  static #baseUrl: string;

  static {
    this.#apiKey = process.env.API_KEY || '';
    this.#baseUrl = process.env.BASE_URL || 'https://api.example.com';
  }

  static getApiKey(): string {
    return this.#apiKey;
  }

  static getBaseUrl(): string {
    return this.#baseUrl;
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 实现场景 -->
      <section class="scenarios-section">
        <div class="section-header">
          <h2>💡 实现场景</h2>
          <div class="title-decoration"></div>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-header">
              <h3>🛒 购物车管理</h3>
              <span class="scenario-tag">状态封装</span>
            </div>
            <pre><code>class ShoppingCart {
  #items: CartItem[] = [];
  #total: number = 0;

  #calculateTotal() {
    this.#total = this.#items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  addItem(item: CartItem) {
    this.#items.push(item);
    this.#calculateTotal();
  }

  removeItem(itemId: string) {
    this.#items = this.#items.filter(item => item.id !== itemId);
    this.#calculateTotal();
  }

  getTotal(): number {
    return this.#total;
  }

  getItems(): CartItem[] {
    return [...this.#items]; // 返回副本
  }
}</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <h3>🔐 认证服务</h3>
              <span class="scenario-tag">安全封装</span>
            </div>
            <pre><code>class AuthService {
  #tokens: Map&lt;string, TokenInfo&gt; = new Map();
  #refreshToken: string | null = null;

  #validateToken(token: string): boolean {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  #generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });
  }

  login(credentials: LoginCredentials): Promise&lt;AuthResult&gt; {
    // 登录逻辑
    const token = this.#generateToken(credentials.userId);
    this.#tokens.set(credentials.userId, { token, expiresAt: Date.now() + 3600000 });
    return Promise.resolve({ token, success: true });
  }

  isAuthenticated(userId: string): boolean {
    const tokenInfo = this.#tokens.get(userId);
    return tokenInfo ? this.#validateToken(tokenInfo.token) : false;
  }
}</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <h3>📊 缓存管理器</h3>
              <span class="scenario-tag">性能优化</span>
            </div>
            <pre><code>class CacheManager {
  #cache: Map&lt;string, CacheEntry&gt; = new Map();
  #maxSize: number;
  #cleanupInterval: NodeJS.Timeout;

  constructor(maxSize: number = 100) {
    this.#maxSize = maxSize;
    this.#cleanupInterval = setInterval(() => {
      this.#cleanup();
    }, 60000); // 每分钟清理一次
  }

  #cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.#cache.entries()) {
      if (entry.expiresAt < now) {
        this.#cache.delete(key);
      }
    }

    // 如果缓存仍然过大，删除最旧的条目
    if (this.#cache.size > this.#maxSize) {
      const entries = Array.from(this.#cache.entries());
      entries.sort((a, b) => a[1].createdAt - b[1].createdAt);

      const toDelete = entries.slice(0, this.#cache.size - this.#maxSize);
      toDelete.forEach(([key]) => this.#cache.delete(key));
    }
  }

  set(key: string, value: any, ttl: number = 300000) {
    this.#cache.set(key, {
      value,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttl
    });
  }

  get(key: string): any | null {
    const entry = this.#cache.get(key);
    if (!entry || entry.expiresAt < Date.now()) {
      this.#cache.delete(key);
      return null;
    }
    return entry.value;
  }
}</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <h3>🎯 状态机</h3>
              <span class="scenario-tag">状态管理</span>
            </div>
            <pre><code>class StateMachine {
  #currentState: string;
  #transitions: Map&lt;string, string[]&gt; = new Map();
  #stateHandlers: Map&lt;string, Function&gt; = new Map();

  constructor(initialState: string) {
    this.#currentState = initialState;
  }

  #validateTransition(from: string, to: string): boolean {
    const allowedTransitions = this.#transitions.get(from);
    return allowedTransitions ? allowedTransitions.includes(to) : false;
  }

  #executeStateHandler(state: string, data?: any) {
    const handler = this.#stateHandlers.get(state);
    if (handler) {
      handler(data);
    }
  }

  addTransition(from: string, to: string) {
    if (!this.#transitions.has(from)) {
      this.#transitions.set(from, []);
    }
    this.#transitions.get(from)!.push(to);
  }

  setStateHandler(state: string, handler: Function) {
    this.#stateHandlers.set(state, handler);
  }

  transitionTo(newState: string, data?: any): boolean {
    if (this.#validateTransition(this.#currentState, newState)) {
      this.#currentState = newState;
      this.#executeStateHandler(newState, data);
      return true;
    }
    return false;
  }

  getCurrentState(): string {
    return this.#currentState;
  }
}</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <h3>📡 事件发射器</h3>
              <span class="scenario-tag">事件管理</span>
            </div>
            <pre><code>class EventEmitter {
  #listeners: Map&lt;string, Function[]&gt; = new Map();
  #maxListeners: number = 10;

  #validateEventName(eventName: string): boolean {
    return typeof eventName === 'string' && eventName.length > 0;
  }

  #warnMaxListenersExceeded(eventName: string) {
    const listeners = this.#listeners.get(eventName) || [];
    if (listeners.length > this.#maxListeners) {
      console.warn(`Max listeners (${this.#maxListeners}) exceeded for event: ${eventName}`);
    }
  }

  on(eventName: string, listener: Function): this {
    if (!this.#validateEventName(eventName)) {
      throw new Error('Invalid event name');
    }

    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, []);
    }

    this.#listeners.get(eventName)!.push(listener);
    this.#warnMaxListenersExceeded(eventName);

    return this;
  }

  emit(eventName: string, ...args: any[]): boolean {
    if (!this.#validateEventName(eventName)) {
      return false;
    }

    const listeners = this.#listeners.get(eventName) || [];
    listeners.forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        console.error(`Error in event listener for ${eventName}:`, error);
      }
    });

    return listeners.length > 0;
  }

  removeListener(eventName: string, listener: Function): this {
    const listeners = this.#listeners.get(eventName);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }
}</code></pre>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <h3>🔄 单例模式</h3>
              <span class="scenario-tag">设计模式</span>
            </div>
            <pre><code>class DatabaseConnection {
  static #instance: DatabaseConnection | null = null;
  #connection: any = null;
  #isConnected: boolean = false;

  private constructor() {
    // 私有构造函数
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection();
    }
    return DatabaseConnection.#instance;
  }

  async #establishConnection(): Promise&lt;void&gt; {
    try {
      this.#connection = await createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      this.#isConnected = true;
    } catch (error) {
      this.#isConnected = false;
      throw error;
    }
  }

  async connect(): Promise&lt;void&gt; {
    if (!this.#isConnected) {
      await this.#establishConnection();
    }
  }

  async query(sql: string, params?: any[]): Promise&lt;any&gt; {
    if (!this.#isConnected) {
      throw new Error('Database not connected');
    }
    return this.#connection.query(sql, params);
  }

  async disconnect(): Promise&lt;void&gt; {
    if (this.#connection) {
      await this.#connection.end();
      this.#connection = null;
      this.#isConnected = false;
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="considerations-section">
        <div class="section-header">
          <h2>⚠️ 注意事项</h2>
          <div class="title-decoration"></div>
        </div>

        <div class="considerations-grid">
          <div class="consideration-card">
            <h3>🔧 TypeScript 配置</h3>
            <p>确保 TypeScript 配置支持私有字段</p>
            <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "strict": true
  }
}</code></pre>
          </div>

          <div class="consideration-card">
            <h3>🚫 访问限制</h3>
            <p>私有字段无法在类外部访问</p>
            <pre><code>class Example {
  #privateField = 'secret';
}

const example = new Example();
console.log(example['#privateField']); // undefined
console.log(example.#privateField);    // 语法错误</code></pre>
          </div>

          <div class="consideration-card">
            <h3>🧬 继承限制</h3>
            <p>子类无法访问父类的私有字段</p>
            <pre><code>class Parent {
  #parentPrivate = 'parent secret';
}

class Child extends Parent {
  #childPrivate = 'child secret';

  showInfo() {
    // console.log(this.#parentPrivate); // 错误
    console.log(this.#childPrivate);     // 正确
  }
}</code></pre>
          </div>

          <div class="consideration-card">
            <h3>🔄 序列化限制</h3>
            <p>私有字段不会被 JSON.stringify 序列化</p>
            <pre><code>class User {
  #password = 'secret123';
  public name = 'John';

  toJSON() {
    return {
      name: this.name
      // #password 不会被包含
    };
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices-section">
        <div class="section-header">
          <h2>✅ 最佳实践</h2>
          <div class="title-decoration"></div>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🎯</div>
            <h3>明确封装意图</h3>
            <p>使用私有字段明确表达哪些成员不应该被外部访问</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔧</div>
            <h3>提供公共接口</h3>
            <p>通过公共方法提供对私有字段的安全访问</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🛡️</div>
            <h3>数据验证</h3>
            <p>在设置私有字段之前进行数据验证</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📝</div>
            <h3>文档化设计</h3>
            <p>在代码注释中说明私有字段的用途和约束</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🧪</div>
            <h3>单元测试</h3>
            <p>通过公共接口测试私有字段的行为</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚡</div>
            <h3>性能考虑</h3>
            <p>私有字段访问性能更好，适合频繁访问的数据</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #2c3e50;
@secondary-color: #3498db;
@accent-color: #e74c3c;
@success-color: #27ae60;
@warning-color: #f39c12;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@text-color: #495057;
@code-bg: #f1f3f4;

.private-fields-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: white;
}

// 页面标题
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, @light-bg 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .main-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #6c757d;
    font-weight: 400;
  }
}

// 内容主体
.content-main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

// 章节通用样式
.section-header {
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .title-decoration {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, @secondary-color, @accent-color);
    margin: 0 auto;
    border-radius: 2px;
  }
}

// 概念部分
.concept-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
}

.concept-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: @text-color;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  code {
    background: @code-bg;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    color: @accent-color;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  text-align: center;
  padding: 1.5rem;
  background: @light-bg;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    color: #6c757d;
    font-size: 0.9rem;
    margin: 0;
  }
}

// 语法部分
.syntax-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
}

.syntax-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.syntax-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @secondary-color;

  h3 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;
    margin: 0;

    code {
      color: @primary-color;
    }
  }
}

// 场景部分
.scenarios-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.scenario-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @success-color;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .scenario-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      color: @primary-color;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0;
    }

    .scenario-tag {
      background: @success-color;
      color: white;
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.8rem;
    line-height: 1.4;
    overflow-x: auto;
    margin: 0;

    code {
      color: @primary-color;
    }
  }
}

// 注意事项部分
.considerations-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
}

.considerations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.consideration-card {
  background: #fff5f5;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @warning-color;

  h3 {
    color: @primary-color;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  p {
    color: #6c757d;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.8rem;
    line-height: 1.4;
    overflow-x: auto;
    margin: 0;

    code {
      color: @primary-color;
    }
  }
}

// 最佳实践部分
.best-practices-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  text-align: center;
  padding: 1.5rem;
  background: @light-bg;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  .practice-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  p {
    color: #6c757d;
    font-size: 0.9rem;
    margin: 0;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .private-fields-container {
    padding: 1rem;
  }

  .page-header .main-title {
    font-size: 2rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .syntax-grid,
  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .concept-grid,
  .considerations-grid,
  .practices-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-header .main-title {
    font-size: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.3rem;
  }
}
</style>
