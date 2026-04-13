<template>
  <div class="proxy-pattern-container">
    <header class="header">
      <h1>JavaScript 代理模式实现</h1>
      <p class="subtitle">控制对象访问的高级设计模式</p>
    </header>

    <div class="content-wrapper">
      <div class="pattern-intro">
        <div class="intro-card">
          <div class="card-header">
            <div class="pattern-icon">🛡️</div>
            <h2>代理模式介绍</h2>
          </div>
          <div class="card-content">
            <p>代理模式是一种结构型设计模式，它提供了一个代理对象来控制对另一个对象的访问。代理可以在客户端和目标对象之间充当中间人，用于控制访问、添加额外功能或延迟初始化。</p>

            <div class="key-points">
              <h3>核心概念：</h3>
              <ul>
                <li><strong>目标对象(Subject)</strong> - 定义实际业务逻辑的接口</li>
                <li><strong>真实对象(RealSubject)</strong> - 实现目标对象接口的具体类</li>
                <li><strong>代理对象(Proxy)</strong> - 实现目标对象接口，控制对真实对象的访问</li>
              </ul>
            </div>

            <div class="use-cases">
              <h3>适用场景：</h3>
              <div class="use-case-grid">
                <div class="use-case-card">
                  <div class="icon">🛡️</div>
                  <h4>访问控制</h4>
                  <p>控制对敏感对象的访问权限</p>
                </div>
                <div class="use-case-card">
                  <div class="icon">⏱️</div>
                  <h4>延迟初始化</h4>
                  <p>仅在需要时创建昂贵对象</p>
                </div>
                <div class="use-case-card">
                  <div class="icon">📝</div>
                  <h4>日志记录</h4>
                  <p>记录对象访问和操作日志</p>
                </div>
                <div class="use-case-card">
                  <div class="icon">🔄</div>
                  <h4>缓存代理</h4>
                  <p>缓存结果以提高性能</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="benefits-card">
          <div class="card-header">
            <div class="pattern-icon">✨</div>
            <h2>代理模式优势</h2>
          </div>
          <div class="benefits-list">
            <div class="benefit">
              <div class="icon">✅</div>
              <div>
                <h3>职责分离</h3>
                <p>代理对象处理访问控制等辅助功能，真实对象专注于核心业务逻辑</p>
              </div>
            </div>
            <div class="benefit">
              <div class="icon">✅</div>
              <div>
                <h3>开闭原则</h3>
                <p>无需修改真实对象即可引入新的代理功能</p>
              </div>
            </div>
            <div class="benefit">
              <div class="icon">✅</div>
              <div>
                <h3>资源优化</h3>
                <p>延迟加载和缓存机制可提高应用性能</p>
              </div>
            </div>
            <div class="benefit">
              <div class="icon">✅</div>
              <div>
                <h3>安全性增强</h3>
                <p>代理可提供额外的安全层，控制对敏感对象的访问</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation-section">
        <div class="implementation-card">
          <div class="card-header">
            <div class="pattern-icon">🧠</div>
            <h2>实现思路</h2>
          </div>
          <div class="implementation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>定义目标接口</h3>
                <p>创建抽象接口，声明真实对象和代理对象共有的方法</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>实现真实对象</h3>
                <p>创建实现目标接口的具体类，包含实际业务逻辑</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>创建代理类</h3>
                <p>实现相同的目标接口，包含对真实对象的引用</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>添加代理逻辑</h3>
                <p>在代理方法中实现额外功能（访问控制、缓存等）</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>客户端使用代理</h3>
                <p>客户端通过代理对象而非直接访问真实对象</p>
              </div>
            </div>
          </div>
        </div>

        <div class="code-section">
          <div class="code-tabs">
            <button
              v-for="tab in codeTabs"
              :key="tab.id"
              :class="['tab-button', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              {{ tab.title }}
            </button>
          </div>

          <div class="code-display">
            <div v-if="activeTab === 'basic'" class="code-block">
              <h3>基础代理实现</h3>
              <pre><code>// 目标接口
interface Subject {
  request(): void;
}

// 真实对象
class RealSubject implements Subject {
  request(): void {
    console.log('真实对象处理请求');
  }
}

// 代理对象
class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log('代理: 检查访问权限');
    return true;
  }

  private logAccess(): void {
    console.log('代理: 记录请求时间');
  }
}

// 客户端代码
function clientCode(subject: Subject) {
  subject.request();
}

console.log('直接访问真实对象:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('通过代理访问:');
const proxy = new Proxy(realSubject);
clientCode(proxy);</code></pre>
            </div>

            <div v-if="activeTab === 'virtual'" class="code-block">
              <h3>虚拟代理（延迟加载）</h3>
              <pre><code>// 目标接口
interface ImageLoader {
  display(): void;
}

// 真实对象（高成本）
class HighResImage implements ImageLoader {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(\`加载高分辨率图片: \${this.filename}\`);
  }

  display(): void {
    console.log(\`显示图片: \${this.filename}\`);
  }
}

// 虚拟代理
class ImageProxy implements ImageLoader {
  private filename: string;
  private realImage: HighResImage | null = null;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (this.realImage === null) {
      this.realImage = new HighResImage(this.filename);
    }
    this.realImage.display();
  }
}

// 客户端代码
function renderImage(image: ImageLoader) {
  console.log('开始渲染图片...');
  image.display();
}

// 使用代理，图片只在需要时加载
const imageProxy = new ImageProxy('photo.jpg');
console.log('图片尚未加载到内存');
renderImage(imageProxy); // 此时才加载真实图片</code></pre>
            </div>

            <div v-if="activeTab === 'protection'" class="code-block">
              <h3>保护代理（访问控制）</h3>
              <pre><code>// 数据库查询接口
interface DatabaseQuery {
  executeQuery(query: string): any;
}

// 真实数据库对象
class RealDatabase implements DatabaseQuery {
  executeQuery(query: string): any {
    console.log(\`执行数据库查询: \${query}\`);
    // 实际数据库操作...
    return { results: [] };
  }
}

// 保护代理
class ProtectionProxy implements DatabaseQuery {
  private realDatabase: RealDatabase;
  private userRole: string;

  constructor(realDatabase: RealDatabase, userRole: string) {
    this.realDatabase = realDatabase;
    this.userRole = userRole;
  }

  executeQuery(query: string): any {
    if (this.checkAccess()) {
      return this.realDatabase.executeQuery(query);
    } else {
      throw new Error('访问被拒绝: 权限不足');
    }
  }

  private checkAccess(): boolean {
    // 检查用户权限
    const allowedRoles = ['admin', 'dba'];
    return allowedRoles.includes(this.userRole);
  }
}

// 客户端代码
const realDB = new RealDatabase();

// 管理员访问
const adminProxy = new ProtectionProxy(realDB, 'admin');
console.log('管理员查询:');
adminProxy.executeQuery('SELECT * FROM users');

// 普通用户访问
const userProxy = new ProtectionProxy(realDB, 'user');
console.log('普通用户查询:');
try {
  userProxy.executeQuery('SELECT * FROM users');
} catch (e) {
  console.error(e.message);
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p> JavaScript 设计模式实践 | 代理模式实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const codeTabs = [
  { id: 'basic', title: '基础代理' },
  { id: 'virtual', title: '虚拟代理' },
  { id: 'protection', title: '保护代理' }
];

const activeTab = ref('basic');
</script>

<style lang="less" scoped>

.proxy-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
  color: #2d3748;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  border-radius: 16px;
  background: linear-gradient(120deg, #3b5bdb, #4c6ef5);
  color: white;
  box-shadow: 0 10px 20px rgba(66, 153, 225, 0.15);

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.pattern-intro {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.intro-card, .benefits-card, .implementation-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(120deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid #e2e8f0;

  .pattern-icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
    color: #2d3748;
  }
}

.card-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 20px;
  }
}

.key-points {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4c6ef5;
      margin-right: 10px;
    }
  }

  ul {
    padding-left: 25px;
    margin: 0;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
      padding-left: 8px;

      &::marker {
        color: #4c6ef5;
        font-weight: 600;
      }

      strong {
        color: #3b5bdb;
      }
    }
  }
}

.use-cases {
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px;
    color: #2d3748;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #7950f2;
      margin-right: 10px;
    }
  }
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.use-case-card {
  background: #f1f3f9;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-3px);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #4c6ef5;
  }

  h4 {
    font-size: 1.2rem;
    margin: 0 0 8px 0;
    color: #3b5bdb;
  }

  p {
    font-size: 0.95rem;
    margin: 0;
    color: #495057;
  }
}

.benefits-card {
  .card-content {
    padding: 0;
  }
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
}

.benefit {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;

  .icon {
    font-size: 1.8rem;
    color: #40c057;
    min-width: 40px;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 8px 0;
    color: #2b8a3e;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #495057;
  }
}

.implementation-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.implementation-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 25px;
}

.step {
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #e2e8f0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .step-number {
    width: 40px;
    height: 40px;
    background: #4c6ef5;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .step-content {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 10px 0;
      color: #3b5bdb;
    }

    p {
      font-size: 1.05rem;
      margin: 0;
      color: #495057;
      line-height: 1.6;
    }
  }
}

.code-section {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

.code-tabs {
  display: flex;
  background: #f1f3f9;
  padding: 0 20px;
  border-bottom: 1px solid #e2e8f0;

  .tab-button {
    padding: 15px 25px;
    border: none;
    background: transparent;
    font-weight: 500;
    font-size: 1.05rem;
    cursor: pointer;
    position: relative;
    color: #495057;

    &.active {
      color: #3b5bdb;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background: #4c6ef5;
        border-radius: 3px 3px 0 0;
      }
    }

    &:hover {
      color: #3b5bdb;
    }
  }
}

.code-display {
  padding: 25px;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: #3b5bdb;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e8f0;
  }
}

.code-block {
  pre {
    background: #1e293b;
    color: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    overflow-x: auto;
    font-size: 0.95rem;
    line-height: 1.5;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #718096;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .step {
    gap: 15px;

    .step-number {
      width: 35px;
      height: 35px;
      font-size: 1.1rem;
    }

    .step-content {
      h3 {
        font-size: 1.2rem;
      }
    }
  }

  .code-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;

    .tab-button {
      padding: 12px 20px;
      font-size: 0.95rem;
      white-space: nowrap;
    }
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.8rem;
  }

  .card-header {
    flex-direction: column;
    text-align: center;

    .pattern-icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }

  .use-case-grid {
    grid-template-columns: 1fr;
  }
}
</style>
