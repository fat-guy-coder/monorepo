<template>
  <div class="singleton-container">
    <!-- 标题区域 -->
    <section class="header-section">
      <h1 class="title">单例模式</h1>
      <div class="subtitle">确保一个类只有一个实例</div>
      <div class="pattern-stats">
        <div class="stat-card">
          <div class="stat-icon">🔒</div>
          <div class="stat-value">全局唯一</div>
          <div class="stat-label">核心特性</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔄</div>
          <div class="stat-value">延迟初始化</div>
          <div class="stat-label">常见实现</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🌐</div>
          <div class="stat-value">全局访问</div>
          <div class="stat-label">主要用途</div>
        </div>
      </div>
    </section>

    <!-- 模式介绍 -->
    <section class="content-section">
      <h2 class="section-title">📚 单例模式介绍</h2>

      <div class="pattern-intro">
        <div class="intro-card">
          <div class="intro-icon">🎯</div>
          <div class="intro-content">
            <h3>什么是单例模式？</h3>
            <p>
              <strong>单例模式</strong>是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点来访问该实例。
            </p>
            <p>
              单例模式常用于管理共享资源，如数据库连接、配置管理、日志记录器等需要全局唯一实例的场景。
            </p>
          </div>
        </div>

        <div class="intro-card">
          <div class="intro-icon">⚙️</div>
          <div class="intro-content">
            <h3>模式结构</h3>
            <div class="structure-diagram">
              <div class="singleton-class">
                <div class="class-name">Singleton</div>
                <div class="class-items">
                  <div class="static-field">- static instance: Singleton</div>
                  <div class="private-constructor">- constructor()</div>
                  <div class="static-method">+ static getInstance(): Singleton</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="intro-card">
          <div class="intro-icon">✅</div>
          <div class="intro-content">
            <h3>适用场景</h3>
            <ul>
              <li>当类只能有一个实例且客户端需要从众所周知的访问点访问它时</li>
              <li>当唯一实例应该通过子类化可扩展，且客户端无需修改代码就能使用扩展后的实例时</li>
              <li>当需要严格控制全局变量时</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pattern-benefits">
        <h3>单例模式的优势</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">💾</div>
            <div class="benefit-text">
              <strong>内存优化</strong>：避免重复创建相同对象，节省内存
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔗</div>
            <div class="benefit-text">
              <strong>资源共享</strong>：提供全局访问点，便于共享资源管理
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔄</div>
            <div class="benefit-text">
              <strong>一致状态</strong>：确保所有代码使用同一实例，保持状态一致
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">⚡</div>
            <div class="benefit-text">
              <strong>性能提升</strong>：减少对象创建和销毁的开销
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实现思路 -->
    <section class="content-section">
      <h2 class="section-title">🧠 单例模式实现思路</h2>

      <div class="implementation-steps">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3>私有化构造函数</h3>
          <p>防止外部通过new操作符创建实例</p>
          <div class="code-snippet">
            <pre><code>private constructor() {}</code></pre>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <h3>创建静态私有实例</h3>
          <p>保存类的唯一实例</p>
          <div class="code-snippet">
            <pre><code>private static instance: Singleton;</code></pre>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <h3>提供静态访问方法</h3>
          <p>控制实例的创建和访问</p>
          <div class="code-snippet">
            <pre><code>public static getInstance(): Singleton {
  if (!Singleton.instance) {
    Singleton.instance = new Singleton();
  }
  return Singleton.instance;
}</code></pre>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">4</div>
          <h3>线程安全考虑</h3>
          <p>多线程环境下确保只创建一个实例</p>
          <div class="code-snippet">
            <pre><code>// 使用立即执行函数初始化
private static instance = new Singleton();

// 或使用锁机制
private static lock = new Lock();</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="content-section">
      <h2 class="section-title">💻 完整代码示例</h2>

      <div class="code-tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-item', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.label }}
        </div>
      </div>

      <div class="code-content">
        <div v-if="activeTab === 0" class="typescript-code">
          <pre><code>class Singleton {
  // 静态私有实例
  private static instance: Singleton;

  // 私有构造函数防止外部实例化
  private constructor() {
    console.log('Singleton instance created');
  }

  // 静态方法获取唯一实例
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  // 实例方法
  public someBusinessLogic(): void {
    console.log('Executing business logic');
  }
}

// 使用示例
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

console.log('Is s1 === s2?', s1 === s2); // true
s1.someBusinessLogic();</code></pre>
        </div>

        <div v-if="activeTab === 1" class="execution-result">
          <h3>代码执行结果</h3>
          <div class="result-output">
            <div class="output-line">Singleton instance created</div>
            <div class="output-line">Is s1 === s2? true</div>
            <div class="output-line">Executing business logic</div>
          </div>
        </div>

        <div v-if="activeTab === 2" class="sequence-diagram">
          <h3>单例模式时序图</h3>
          <div class="sequence-container">
            <div class="participants">
              <div class="participant">客户端</div>
              <div class="participant">Singleton</div>
            </div>

            <div class="sequence-lines">
              <div class="sequence">
                <div class="message">getInstance()</div>
                <div class="arrow">→</div>
              </div>
              <div class="sequence">
                <div class="message">instance存在?</div>
                <div class="arrow">→</div>
              </div>
              <div class="sequence">
                <div class="message"></div>
                <div class="arrow">↓</div>
                <div class="message">new Singleton()</div>
              </div>
              <div class="sequence">
                <div class="message"></div>
                <div class="arrow">↓</div>
                <div class="message">返回instance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实际应用 -->
    <section class="content-section">
      <h2 class="section-title">🚀 实际应用场景</h2>

      <div class="application-grid">
        <div class="app-card">
          <div class="app-icon">🛢️</div>
          <h3>数据库连接池</h3>
          <p>管理数据库连接，避免重复创建连接</p>
          <div class="app-code">
            <pre><code>class DatabasePool {
  private static instance: DatabasePool;
  private connections: Connection[] = [];

  private constructor() {}

  public static getInstance() {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool();
    }
    return DatabasePool.instance;
  }
}</code></pre>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">⚙️</div>
          <h3>配置管理器</h3>
          <p>全局共享配置信息，避免重复读取</p>
          <div class="app-code">
            <pre><code>class ConfigManager {
  private static instance: ConfigManager;
  private config: Record&lt;string, any&gt; = {};

  private constructor() {
    this.loadConfig();
  }

  public static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
}</code></pre>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">📝</div>
          <h3>日志记录器</h3>
          <p>统一管理日志输出，确保日志顺序</p>
          <div class="app-code">
            <pre><code>class Logger {
  private static instance: Logger;
  private logFile: string;

  private constructor() {
    this.logFile = 'app.log';
  }

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
}</code></pre>
          </div>
        </div>

        <div class="app-card">
          <div class="app-icon">🎮</div>
          <h3>游戏管理器</h3>
          <p>管理游戏状态、分数等全局信息</p>
          <div class="app-code">
            <pre><code>class GameManager {
  private static instance: GameManager;
  private score: number = 0;

  private constructor() {}

  public static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 变体与进阶 -->
    <section class="content-section">
      <h2 class="section-title">🔧 单例模式变体</h2>

      <div class="variants-grid">
        <div class="variant-card">
          <h3>饿汉式单例</h3>
          <p>类加载时就初始化实例</p>
          <div class="variant-code">
            <pre><code>class EagerSingleton {
  private static instance = new EagerSingleton();

  private constructor() {}

  public static getInstance() {
    return EagerSingleton.instance;
  }
}</code></pre>
          </div>
          <div class="variant-pros-cons">
            <div class="pros">
              <strong>优点</strong>：线程安全，实现简单
            </div>
            <div class="cons">
              <strong>缺点</strong>：可能造成资源浪费
            </div>
          </div>
        </div>

        <div class="variant-card">
          <h3>懒汉式单例</h3>
          <p>第一次调用时初始化实例</p>
          <div class="variant-code">
            <pre><code>class LazySingleton {
  private static instance: LazySingleton;

  private constructor() {}

  public static getInstance() {
    if (!LazySingleton.instance) {
      LazySingleton.instance = new LazySingleton();
    }
    return LazySingleton.instance;
  }
}</code></pre>
          </div>
          <div class="variant-pros-cons">
            <div class="pros">
              <strong>优点</strong>：延迟加载，节省资源
            </div>
            <div class="cons">
              <strong>缺点</strong>：多线程需额外处理
            </div>
          </div>
        </div>

        <div class="variant-card">
          <h3>线程安全单例</h3>
          <p>使用双重检查锁定</p>
          <div class="variant-code">
            <pre><code>class ThreadSafeSingleton {
  private static instance: ThreadSafeSingleton;
  private static lock = new Lock();

  private constructor() {}

  public static getInstance() {
    if (!ThreadSafeSingleton.instance) {
      ThreadSafeSingleton.lock.acquire();
      if (!ThreadSafeSingleton.instance) {
        ThreadSafeSingleton.instance = new ThreadSafeSingleton();
      }
      ThreadSafeSingleton.lock.release();
    }
    return ThreadSafeSingleton.instance;
  }
}</code></pre>
          </div>
          <div class="variant-pros-cons">
            <div class="pros">
              <strong>优点</strong>：线程安全，性能较好
            </div>
            <div class="cons">
              <strong>缺点</strong>：实现较复杂
            </div>
          </div>
        </div>

        <div class="variant-card">
          <h3>TypeScript特有实现</h3>
          <p>利用命名空间和私有构造函数</p>
          <div class="variant-code">
            <pre><code>namespace Singleton {
  class _Singleton {
    constructor() {}
  }

  export const instance = new _Singleton();
}

// 使用
Singleton.instance;</code></pre>
          </div>
          <div class="variant-pros-cons">
            <div class="pros">
              <strong>优点</strong>：简洁，类型安全
            </div>
            <div class="cons">
              <strong>缺点</strong>：非传统OOP实现
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="content-section">
      <h2 class="section-title">⚠️ 注意事项</h2>

      <div class="considerations">
        <div class="consideration-card">
          <div class="consideration-icon">🚫</div>
          <div class="consideration-content">
            <h3>单例模式的缺点</h3>
            <ul>
              <li>违反单一职责原则（既管理实例创建又处理业务逻辑）</li>
              <li>可能导致代码耦合度高，难以测试</li>
              <li>在多线程环境中需要特殊处理</li>
              <li>可能隐藏过多依赖关系</li>
            </ul>
          </div>
        </div>

        <div class="consideration-card">
          <div class="consideration-icon">💡</div>
          <div class="consideration-content">
            <h3>替代方案</h3>
            <ul>
              <li>依赖注入：通过容器管理对象生命周期</li>
              <li>静态工具类：对于无状态操作</li>
              <li>服务定位器模式：更灵活的全局访问</li>
              <li>模块模式（JavaScript/TypeScript特有）</li>
            </ul>
          </div>
        </div>

        <div class="consideration-card">
          <div class="consideration-icon">🔍</div>
          <div class="consideration-content">
            <h3>最佳实践</h3>
            <ul>
              <li>仅对真正需要全局唯一实例的类使用单例</li>
              <li>考虑使用依赖注入框架管理单例</li>
              <li>确保单例是线程安全的</li>
              <li>避免在单例中保存过多状态</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="content-section summary-section">
      <h2 class="section-title">🎯 总结</h2>

      <div class="summary-content">
        <div class="key-point">
          <div class="point-icon">🔑</div>
          <div class="point-text">
            <strong>单例模式</strong>确保一个类只有一个实例，并提供全局访问点
          </div>
        </div>

        <div class="key-point">
          <div class="point-icon">⚡</div>
          <div class="point-text">
            通过<strong>私有构造函数</strong>、<strong>静态实例变量</strong>和<strong>静态访问方法</strong>实现
          </div>
        </div>

        <div class="key-point">
          <div class="point-icon">🚀</div>
          <div class="point-text">
            适用于<strong>资源共享</strong>场景，如配置管理、日志记录、数据库连接等
          </div>
        </div>

        <div class="key-point">
          <div class="point-icon">🧠</div>
          <div class="point-text">
            注意<strong>多线程安全</strong>和<strong>过度使用</strong>的问题
          </div>
        </div>
      </div>

      <div class="quote-box">
        <div class="quote-icon">💬</div>
        <div class="quote-content">
          "单例模式是最简单但也是最容易被滥用的设计模式之一。正确使用它可以简化资源管理，滥用它则会导致代码难以测试和维护。"
          <div class="quote-author">- 《设计模式：可复用面向对象软件的基础》</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref([
  { label: 'TypeScript实现' },
  { label: '执行结果' },
  { label: '时序图' }
]);

const activeTab = ref(0);
</script>

<style lang="less" scoped>
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@code-bg: #f6f8ff;

.singleton-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @light-bg, transparent);
  border-radius: 16px;

  .title {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.3rem;
    color: @text-light;
    margin-bottom: 2rem;
    font-weight: 400;
  }
}

.pattern-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;

  .stat-card {
    background: white;
    padding: 1.5rem 1rem;
    border-radius: 12px;
    box-shadow: @card-shadow;
    min-width: 140px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .stat-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  background: @light-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: darken(@primary-color, 10%);
  }
}

.pattern-intro {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .intro-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    .intro-icon {
      font-size: 2rem;
      color: @primary-color;
      flex-shrink: 0;
    }

    .intro-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
      }

      p {
        margin: 0;
        line-height: 1.7;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.25rem;

          &::before {
            content: "•";
            color: @primary-color;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}

.structure-diagram {
  .singleton-class {
    background: white;
    border: 2px solid @primary-color;
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Fira Code', monospace;

    .class-name {
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: @primary-color;
    }

    .class-items {
      font-size: 0.9rem;
      line-height: 1.7;

      .static-field {
        color: @secondary-color;
      }

      .private-constructor {
        color: #e45649;
      }

      .static-method {
        color: @accent-color;
      }
    }
  }
}

.pattern-benefits {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .benefit-card {
      display: flex;
      gap: 1rem;
      align-items: center;
      padding: 1rem;
      background: @light-bg;
      border-radius: 8px;
      border-left: 3px solid @primary-color;

      .benefit-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
      }

      .benefit-text {
        strong {
          color: @primary-color;
        }
      }
    }
  }
}

.implementation-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .step-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    position: relative;

    .step-number {
      position: absolute;
      top: -15px;
      left: 20px;
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
    }

    h3 {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    p {
      margin: 0 0 1rem;
      color: @text-light;
    }
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2c3e50;
    }
  }
}

.code-tabs {
  display: flex;
  background: @light-bg;
  border-bottom: 1px solid @border-color;
  margin-bottom: 1.5rem;
  border-radius: 8px 8px 0 0;
  overflow: hidden;

  .tab-item {
    padding: 1rem 1.5rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
    border-bottom: 3px solid transparent;

    &.active {
      border-bottom: 3px solid @primary-color;
      background: white;
      color: @primary-color;
    }

    &:hover:not(.active) {
      background: rgba(255, 255, 255, 0.7);
    }
  }
}

.code-content {
  background: white;
  border-radius: 0 0 8px 8px;
  padding: 1.5rem;

  .typescript-code {
    pre {
      background: @code-bg;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.95rem;
        line-height: 1.5;
        color: #2c3e50;
      }
    }
  }

  .execution-result {
    h3 {
      margin-top: 0;
    }

    .result-output {
      background: @code-bg;
      border-radius: 8px;
      padding: 1.5rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;

      .output-line {
        padding: 0.25rem 0;
      }
    }
  }

  .sequence-diagram {
    h3 {
      margin-top: 0;
    }

    .sequence-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .participants {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;

        .participant {
          padding: 0.5rem 1rem;
          background: white;
          border: 1px solid @border-color;
          border-radius: 4px;
          text-align: center;
          font-weight: 500;
        }
      }

      .sequence-lines {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .sequence {
          display: flex;
          align-items: center;

          .message {
            flex: 1;
            text-align: right;
            padding-right: 1rem;
            font-size: 0.9rem;
          }

          .arrow {
            font-size: 1.5rem;
            color: @text-light;
            width: 40px;
            text-align: center;
          }
        }
      }
    }
  }
}

.application-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  .app-card {
    background: white;
    padding: 1.75rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: all 0.3s ease;
    border-top: 3px solid @primary-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .app-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @text-color;
    }

    p {
      margin: 0 0 1rem;
      color: @text-light;
      font-size: 0.98rem;
    }

    .app-code {
      background: @code-bg;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: left;
      font-size: 0.85rem;

      pre {
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
        }
      }
    }
  }
}

.variants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  .variant-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;

    h3 {
      margin-top: 0;
      color: @primary-color;
      margin-bottom: 1rem;
    }

    p {
      margin: 0 0 1rem;
      color: @text-light;
      font-size: 0.95rem;
    }

    .variant-code {
      background: @code-bg;
      border-radius: 8px;
      padding: 0.75rem;
      margin-bottom: 1rem;
      font-size: 0.85rem;

      pre {
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
        }
      }
    }

    .variant-pros-cons {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;

      .pros, .cons {
        flex: 1;
        padding: 0.5rem;
        border-radius: 6px;
      }

      .pros {
        background: lighten(@accent-color, 45%);
        border-left: 3px solid @accent-color;
      }

      .cons {
        background: lighten(#e45649, 40%);
        border-left: 3px solid #e45649;
      }

      strong {
        display: block;
        margin-bottom: 0.25rem;
      }
    }
  }
}

.considerations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .consideration-card {
    display: flex;
    gap: 1rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    align-items: flex-start;

    .consideration-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .consideration-content {
      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 1.25rem;

          &::before {
            content: "•";
            color: @primary-color;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #e6f7ff, #f0f9ff);

  .summary-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    .key-point {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      .point-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .point-text {
        strong {
          color: @primary-color;
        }
      }
    }
  }

  .quote-box {
    background: white;
    border-left: 4px solid @accent-color;
    border-radius: 0 12px 12px 0;
    padding: 1.5rem;
    display: flex;
    gap: 1.25rem;

    .quote-icon {
      font-size: 2rem;
      color: @accent-color;
      flex-shrink: 0;
    }

    .quote-content {
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.6;

      .quote-author {
        margin-top: 1rem;
        font-weight: 500;
        text-align: right;
        color: @text-light;
      }
    }
  }
}

@media (max-width: 768px) {
  .singleton-container {
    padding: 1rem;
  }

  .title {
    font-size: 2.25rem !important;
  }

  .subtitle {
    font-size: 1.1rem !important;
  }

  .pattern-stats {
    gap: 1rem;

    .stat-card {
      flex: 1;
      min-width: 120px;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .pattern-intro, .implementation-steps, .application-grid,
  .variants-grid, .considerations, .summary-content {
    grid-template-columns: 1fr;
  }

  .sequence-container {
    .participants {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
}
</style>
